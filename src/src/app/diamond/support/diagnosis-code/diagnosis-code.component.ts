/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {DiagnosisCodeMaster} from '../../../api-models/diagnosis-code-master.model';
import {SecurityService} from '../../../shared/services/security.service';
import {DiagnosisCodeMasterService} from '../../../api-services/diagnosis-code-master.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DIAGNOSIS_CODE} from '../../../shared/app-constants';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Form} from '../../../shared/helpers/form.helper';
import {Menu, SearchModel} from '../../../shared/models/models';
import {DiagnosisMasterLookup} from '../../../shared/lookup/diagnosis-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getDiagnosisCodeShortcutKeys} from '../../../shared/services/shared.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {SupportHelpComponent} from "../support-help/support-help.component";

// Use the Component directive to define the DiagnosisCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'diagnosiscode',
    templateUrl: './diagnosis-code.component.html',
    styleUrls: ['diagnosis-code.component.scss']
})
export class DiagnosisCodeComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    diagnosisCodeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editDiagnosisCodeMaster: boolean= false;
    diagnosisCodeMaster: DiagnosisCodeMaster;
    diagnosisCodeMasters: DiagnosisCodeMaster[];
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    @Input() showIcon = false;
    public memberModuleId = DIAGNOSIS_CODE;
    diagnosisSearchModel = new SearchModel(
        'diagnosiscodemasters/lookup',
        DiagnosisMasterLookup.ALL,
        DiagnosisMasterLookup.DEFAULT,
        [],
        true
    );
    public setIdQualifierData:any;

    qualifierList = [];
    patientGenderList = [];
    traumaFlagList = [];
    caseManagementList = [];
    procedureFlagList = [];
    procedureClassList = [];
    editFlagList = [];
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    showFormPanel = false;
    private windowId = 'DIAGN';
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    effectiveDateStatus: Boolean = false;
    fromAgeStatus: Boolean = true;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private toastService: ToastService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private secUserService: SecUserService,
        private securityService: SecurityService,
        private systemCodesService: SystemCodesService,
        private cdr: ChangeDetectorRef,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        private diagnosisCodeMasterService: DiagnosisCodeMasterService) {
    }

    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getDiagnosisCodeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    initializeComponentState(): void {
        this.loadDropdownValues();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.diagnosisCodeForm);
        this.menuInit();
    }

    onLookupFieldChange(event, value) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupDiagnosisCodeFieldSearchModel();
        } else if (value && event.key === 'Tab') {
            event.preventDefault();
            this.searchDiagnosisCode(event.target.value, true);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.messageService.findByMessageId(27010).subscribe(res => {
                let popUpMessage = new PopUpMessage(
                    'Diagnosis Code',
                    'Diagnosis Code',
                    '27010: ' + res[0].messageText,
                    'error',
                    [],
                    MessageType.WARNING
                );
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {})
            })
        }
    }

    openLookupDiagnosisCodeFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.diagnosisSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.diagnosisCodeForm.patchValue({
                    diagnosisCode: res.diagnosisCode
                });
                this.searchDiagnosisCode(res.diagnosisCode);
            }
        });
    }

    searchDiagnosisCode(value, isSearch?: boolean) {
        if (!value || value.length === 0 || value === '' || value.trim() === '') {
            return;
        }
        this.diagnosisCodeMasterService.getDiagnosisCodeMaster(value).subscribe((res) => {
            if (res) {
                this.showFormPanel = true;
                this.diagnosisCodeForm.patchValue({
                    diagnosisCode: res.diagnosisCode
                });
                this.diagnosisCodeForm.controls['diagnosisCode'].disable();
                this.setDiagnosisCodeMaster(res);
            } else {
                this.diagnosisCodeNotAvailableActions(value);
            }

        }, error => {
            console.log(error);
            this.diagnosisCodeNotAvailableActions(value);
        })
    }

    diagnosisCodeNotAvailableActions(value) {
        let popUpMessage = new PopUpMessage(
            'Diagnosis Code',
            'Diagnosis Code',
            '27008: Entered Diagnosis Code does not exist. Press Yes to create a new Diagnosis Code',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            this.diagnosisCodeForm.controls['diagnosisCode'].enable();
            if (resp.name === 'Yes') {
                this.showFormPanel = true;
                this.diagnosisCodeForm.reset();
                this.diagnosisCodeMaster = undefined;
                this.diagnosisCodeForm.patchValue({
                    diagnosisCode: value
                });
            } else if (resp.name === 'No') {
                this.diagnosisCodeForm.reset();
                this.diagnosisCodeMaster = undefined;
                this.diagnosisCodeForm.patchValue({
                    diagnosisCode: ''
                });
                this.showFormPanel = false;
            } // 3rd case: In case of cancel do nothing
        });
    }

    loadDropdownValues() {
        this.loadQualifierDataList();
        this.getGenderPaitent();
        this.getTraumaFlag();
        this.getCaseManagement();
        this.getProcedureFlagList();
        this.getProcedureClassList();
        this.getEditFlagList();
    }

    createDiagnosisCodeMaster() {
        this.formValidation.validateForm();
        if (this.validateAges()) {
            return;
        }
        if (this.validateDates()) {
            return;
        }
        if (this.diagnosisCodeForm.valid) {
            let diagnosisCodeMaster = new DiagnosisCodeMaster();
            diagnosisCodeMaster.diagnosisCode = Form.getValue(this.diagnosisCodeForm, 'diagnosisCode');
            diagnosisCodeMaster.shortDescription = Form.getValue(this.diagnosisCodeForm, 'shortDesctription');
            diagnosisCodeMaster.description = Form.getValue(this.diagnosisCodeForm, 'fullDescription');
            diagnosisCodeMaster.effectiveDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'effectiveDate');
            diagnosisCodeMaster.termDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'termDate');
            diagnosisCodeMaster.productServiceIdQualifier=this.setIdQualifierData;
            diagnosisCodeMaster.dxClass1 = Form.getValue(this.diagnosisCodeForm, 'diagnosisClass1');
            diagnosisCodeMaster.dxClass2 = Form.getValue(this.diagnosisCodeForm, 'class2');
            diagnosisCodeMaster.dxClass3 = Form.getValue(this.diagnosisCodeForm, 'class3');
            diagnosisCodeMaster.fromAge = Form.getValue(this.diagnosisCodeForm, 'fromAge');
            diagnosisCodeMaster.toAge = Form.getValue(this.diagnosisCodeForm, 'toAge');
            diagnosisCodeMaster.patientGender = Form.getValue(this.diagnosisCodeForm, 'gender');
            diagnosisCodeMaster.traumaFlag = Form.getValue(this.diagnosisCodeForm, 'traumaFlag');
            diagnosisCodeMaster.operProcedureFlag = Form.getValue(this.diagnosisCodeForm, 'orProcedure');
            diagnosisCodeMaster.caseManagement = Form.getValue(this.diagnosisCodeForm, 'caseMgmt');
            diagnosisCodeMaster.procedureClass = Form.getValue(this.diagnosisCodeForm, 'procedureClass');
            diagnosisCodeMaster.mdcCode = Form.getValue(this.diagnosisCodeForm, 'mdcCode');
            diagnosisCodeMaster.editFlag = Form.getValue(this.diagnosisCodeForm, 'editFlag');
            diagnosisCodeMaster.drgDefaultBirthweight = Form.getValue(this.diagnosisCodeForm, 'defaultBirthWgt');
            this.diagnosisCodeMasterService.createDiagnosisCodeMaster(diagnosisCodeMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editDiagnosisCodeMaster = true;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete.' +
                ' Please correct your entries and try again.');
        }
    }


    updateDiagnosisCodeMaster() {
        this.formValidation.validateForm();
        if (this.validateAges()) {
            return;
        }
        if (this.validateDates()) {
            return;
        }
        if (this.diagnosisCodeForm.valid) {
            let diagnosisCodeMaster = new DiagnosisCodeMaster();
            diagnosisCodeMaster.diagnosisCode = Form.getValue(this.diagnosisCodeForm, 'diagnosisCode');
            diagnosisCodeMaster.shortDescription = Form.getValue(this.diagnosisCodeForm, 'shortDesctription');
            diagnosisCodeMaster.description = Form.getValue(this.diagnosisCodeForm, 'fullDescription');
            diagnosisCodeMaster.effectiveDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'effectiveDate');
            diagnosisCodeMaster.termDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'termDate');
            diagnosisCodeMaster.productServiceIdQualifier=this.setIdQualifierData;
            diagnosisCodeMaster.dxClass1 = Form.getValue(this.diagnosisCodeForm, 'diagnosisClass1');
            diagnosisCodeMaster.dxClass2 = Form.getValue(this.diagnosisCodeForm, 'class2');
            diagnosisCodeMaster.dxClass3 = Form.getValue(this.diagnosisCodeForm, 'class3');
            diagnosisCodeMaster.fromAge = Form.getValue(this.diagnosisCodeForm, 'fromAge');
            diagnosisCodeMaster.toAge = Form.getValue(this.diagnosisCodeForm, 'toAge');
            diagnosisCodeMaster.patientGender = Form.getValue(this.diagnosisCodeForm, 'gender');
            diagnosisCodeMaster.traumaFlag = Form.getValue(this.diagnosisCodeForm, 'traumaFlag');
            diagnosisCodeMaster.operProcedureFlag = Form.getValue(this.diagnosisCodeForm, 'orProcedure');
            diagnosisCodeMaster.caseManagement = Form.getValue(this.diagnosisCodeForm, 'caseMgmt');
            diagnosisCodeMaster.procedureClass = Form.getValue(this.diagnosisCodeForm, 'procedureClass');
            diagnosisCodeMaster.mdcCode = Form.getValue(this.diagnosisCodeForm, 'mdcCode');
            diagnosisCodeMaster.editFlag = Form.getValue(this.diagnosisCodeForm, 'editFlag');
            diagnosisCodeMaster.drgDefaultBirthweight = Form.getValue(this.diagnosisCodeForm, 'defaultBirthWgt');
            this.diagnosisCodeMasterService.updateDiagnosisCodeMaster(diagnosisCodeMaster, this.diagnosisCodeMaster.diagnosisCode)
                .subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editDiagnosisCodeMaster = true;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                    this.isFormDataChangeStatus = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. ' +
                        'Please check your entry.');
                });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }

    }


    validateDates(): boolean {
        const effectiveDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'effectiveDate');
        const termDate = Form.getDatePickerValue(this.diagnosisCodeForm, 'termDate');

        if (effectiveDate && this.isValidDate(new Date(effectiveDate))
            && termDate && this.isValidDate(new Date(termDate))) {
            if (new Date(effectiveDate).getTime() >= new Date(termDate).getTime()) {
                this.alertMessage = this.alertMessageService.error('Effective date must be earlier than term date.');
                return true;
            }
        }
        return false;
    }

    validateAges(): boolean {
        const fromAge = Form.getValue(this.diagnosisCodeForm, 'fromAge');
        const toAge = Form.getValue(this.diagnosisCodeForm, 'toAge');

        if (fromAge && isNaN(fromAge)) {
            if ((0 < fromAge) && (fromAge < 999)) {
                this.alertMessage = this.alertMessageService.error('From Age values must be between 0 and 999.9');
                return true;
            }
        }

        if (toAge && isNaN(toAge)) {
            if (!fromAge || !isNaN(fromAge)) {
                this.alertMessage = this.alertMessageService.error('From Age cannot be blank if To Age contains a value.');
                return true;
            }
        }

        if (fromAge && isNaN(fromAge) && toAge && isNaN(toAge)) {
            if (fromAge >= toAge) {
                this.alertMessage = this.alertMessageService.error('To Age cannot be less than From Age.');
                return true;
            }
        }
        return false;
    }

    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    saveDiagnosisCodeMaster() {
        if (this.editDiagnosisCodeMaster) {
            this.updateDiagnosisCodeMaster()
        } else {
            this.createDiagnosisCodeMaster();
        }
    }

    deleteDiagnosisCodeMaster(diagnosisCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.diagnosisCodeMasterService.deleteDiagnosisCodeMaster(diagnosisCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    setDiagnosisCodeMaster(diagnosisCodeMaster: DiagnosisCodeMaster) {
        let idQualifier = '';
        this.qualifierList.map(item => {
          if (item.systemCodesPrimaryKey.systemCode === diagnosisCodeMaster.productServiceIdQualifier) {
              return idQualifier =  item.systemCodeDesc1
          }
        });
        this.diagnosisCodeMaster = diagnosisCodeMaster;
        this.diagnosisCodeForm.patchValue({
            'shortDesctription': diagnosisCodeMaster.shortDescription,
            'fullDescription': diagnosisCodeMaster.description,
            'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(diagnosisCodeMaster.effectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(diagnosisCodeMaster.termDate),
            'idQualifier': idQualifier,
            'diagnosisClass1': diagnosisCodeMaster.dxClass1,
            'class2': diagnosisCodeMaster.dxClass2,
            'class3': diagnosisCodeMaster.dxClass3,
            'fromAge': diagnosisCodeMaster.fromAge,
            'toAge': diagnosisCodeMaster.toAge,
            'gender': diagnosisCodeMaster.patientGender,
            'traumaFlag': diagnosisCodeMaster.traumaFlag,
            'caseMgmt': diagnosisCodeMaster.caseManagement,
            'orProcedure': diagnosisCodeMaster.operProcedureFlag,
            'procedureClass': diagnosisCodeMaster.procedureClass ? diagnosisCodeMaster.procedureClass.trim()
                : diagnosisCodeMaster.procedureClass,
            'mdcCode': diagnosisCodeMaster.mdcCode,
            'editFlag': diagnosisCodeMaster.editFlag,
            'defaultBirthWgt': diagnosisCodeMaster.drgDefaultBirthweight,
        });
        if (diagnosisCodeMaster.effectiveDate) {
            this.effectiveDateStatus = true;
        }
        if (diagnosisCodeMaster.fromAge) {
            this.fromAgeStatus = false;
        }
        this.editDiagnosisCodeMaster = true;
        this.setFieldValue('idQualifier',idQualifier);
        this.isFormDataModified();
    }

    getDiagnosisCodeMasters() {
        this.diagnosisCodeMasterService.getDiagnosisCodeMasters().subscribe(diagnosisCodeMasters => {
            this.diagnosisCodeMasters = diagnosisCodeMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.diagnosisCodeForm = this.formBuilder.group({
            diagnosisCode: ['', {updateOn: 'blur', validators: []}],
            shortDesctription: ['', {updateOn: 'blur', validators: []}],
            fullDescription: ['', {updateOn: 'blur', validators: []}],
            effectiveDate: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            idQualifier: ['', {updateOn: 'blur', validators: [Validators.required]}],
            diagnosisClass1: ['', {updateOn: 'blur', validators: []}],
            class2: ['', {updateOn: 'blur', validators: []}],
            class3: ['', {updateOn: 'blur', validators: []}],
            fromAge: ['', {updateOn: 'blur', validators: [Validators.pattern('^[0-9]*$')]}],
            toAge: ['', {updateOn: 'blur', validators: [Validators.pattern('^[0-9]*$')]}],
            gender: ['', {updateOn: 'blur', validators: []}],
            traumaFlag: ['', {updateOn: 'blur', validators: []}],
            caseMgmt: ['', {updateOn: 'blur', validators: []}],
            orProcedure: ['', {updateOn: 'blur', validators: [Validators.required]}],
            procedureClass: ['', {updateOn: 'blur', validators: []}],
            mdcCode: ['', {updateOn: 'blur', validators: []}],
            editFlag: ['', {updateOn: 'blur', validators: []}],
            defaultBirthWgt: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        let userId = null;

        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Authorization Days Visits Update',
                    'Authorization Days Visits Update Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('DIAGNOSIS_CODE_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.inProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });

    }

    saveShortCutAction() {
        let popUpMessage = new PopUpMessage(
            'Diagnosis Code Update',
            'Diagnosis Code Update',
            '6128: Data has been modified, press yes to save changes',
            'info',
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                if (this.diagnosisCodeMaster) {
                    this.updateDiagnosisCodeMaster();
                } else {
                    this.createDiagnosisCodeMaster();
                }
            } else if (resp.name === 'No') {
                this.activeModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    }

    createNewShortCutAction() {
        this.showFormPanel = true;
        this.diagnosisCodeForm.reset();
        this.diagnosisCodeMaster = undefined;
        this.diagnosisCodeForm.controls['diagnosisCode'].enable();
        this.editDiagnosisCodeMaster=false;
    }

    openShortCutAction() {
        this.diagnosisCodeForm.reset();
        this.diagnosisCodeMaster = undefined;
        this.showFormPanel = false;
        this.diagnosisCodeForm.controls['diagnosisCode'].enable();
        this.editDiagnosisCodeMaster=false;
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewShortCutAction();
                    break;
                }
                case 'Open': {
                    this.openShortCutAction();
                    break;
                }
                case 'Save': {
                    this.saveDiagnosisCodeMaster();
                    break;
                }
                case 'Close': {
                    this.activeModal.close();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'Printer Setup': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                default: {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.openLookupDiagnosisCodeFieldSearchModel();
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic Actions
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste'},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Diagnosis Code Lookup'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Diagnosis Code'},
                    {name: '3 Diagnosis Code'}
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'},
                ],
            },
        ];
    }

    private handleTopicMenu(action: string) {
        this.toastService.showToast(
            'This option is not implemented yet',
            NgbToastType.Danger
        );
    }

    private loadQualifierDataList() {
        this.systemCodesService
            .findBySystemCodeTypeAndSystemCodeActiveAndLanguageId('DIAGN_QUAL', 'Y', 0)
            .subscribe((res: any) => {
                res.sort((a, b) => {
                    return a.systemCodesPrimaryKey.systemCode < b.systemCodesPrimaryKey.systemCode ? -1 :
                        (a.systemCodesPrimaryKey.systemCode > b.systemCodesPrimaryKey.systemCode ? 1 : 0);
                });
                this.qualifierList = res;
            });
    }

    private getGenderPaitent() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'patient_gender',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.patientGenderList = data;
        });
    }

    private getTraumaFlag() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'trauma_flag',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.traumaFlagList = data;
        });
    }

    private getCaseManagement() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'case_management',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.caseManagementList = data;
        });
    }

    private getProcedureFlagList() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'oper_procedure_flag',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.procedureFlagList = data;
        });
    }

    private getProcedureClassList() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'procedure_class',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.procedureClassList = data;
        });
    }

    private getEditFlagList() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'edit_flag',
            'dw_diagn_de'
        ).subscribe((data) => {
            this.editFlagList = data;
        });
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Diagnosis Code')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try{
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveDiagnosisCodeMaster()
                }
                else if(resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.diagnosisCodeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/DIAGN_Diagnosis_Codes.htm';
    };

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.diagnosisCodeForm.controls[fieldName].patchValue(
            fieldValue
        );
     let filteredList = this.qualifierList.filter( e => e.systemCodeDesc1 === fieldValue);


    this.setIdQualifierData=filteredList[0].systemCodesPrimaryKey.systemCode;
    }
}
