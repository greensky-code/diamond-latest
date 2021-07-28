/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {Form} from '../../../shared/helpers/form.helper';
import {MessageMasterDtl, ProvCredential, ProvMaster, ProvTypeMaster, SecUser} from '../../../api-models';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {MessageMasterDtlService, ProvCredentialService, SecUserService} from '../../../api-services';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {getProviderCredentialsShortcutKeys, MESSAGE_CONSTANTS} from '../../../shared/services/shared.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {UntilDestroy} from '@ngneat/until-destroy';

import {Menu, SearchModel} from '../../../shared/models/models';

import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {HelpComponent} from '../../member/help/help.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {Router} from '@angular/router';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';

import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {PROV_CREDENTIAL_MODULE_ID} from '../../../shared/app-constants';

import {DateRangeValidator} from '../../../shared/validators/date-range.validator';

import {ProviderMasterLookup} from '../../../shared/lookup/provider-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';

import {ProvMasterService} from '../../../api-services/prov-master.service';

import {ProviderMasterComponent} from '../provider-master/provider-master.component';
import {ProviderAddressComponent} from '../provider-address/provider-address.component';
import {ProviderContractsComponent} from '../provider-contracts/provider-contracts.component';
import {InsuranceComponent} from '../insurance/insurance.component';
import {ProvTypeMasterService} from '../../../api-services/prov-type-master.service';
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

// Use the Component directive to define the ProviderCredentialsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({ checkProperties: true })
@Component({

    selector: 'providercredentials',
    templateUrl: './provider-credentials.component.html',
    providers: [
        DateFormatPipe,
        ProvMasterService,
        ProvTypeMasterService
    ]
})
export class ProviderCredentialsComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    providerCredentialsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;

    secWin: SecWinViewModel;
    windowId = PROV_CREDENTIAL_MODULE_ID;
    tableName = "PROV_CREDENTIAL";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = PROV_CREDENTIAL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    menu: Menu[] = [];

    shortName: any = "";
    @Input() providerId?: string;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;

    searchModel = new SearchModel('provmasters/lookup', ProviderMasterLookup.PROVIDER_MASTER_ALL, ProviderMasterLookup.PROVIDER_MASTER_DEFAULT, []);

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @Input() provId?: string;

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    editProvCredential: boolean;
    provCredential: ProvCredential;
    provCredentials: ProvCredential[];
    provMaster: ProvMaster;
    provTypeMasters: ProvTypeMaster[];
    license1Status: Boolean = false;
    license2Status: Boolean = false;
    deaStatus: Boolean = false;
    residencyStatus: Boolean = false;
    internshipStatus: Boolean = false;
    medSchoolStatus: Boolean = false;
    spcSchoolStatus2: Boolean = true;
    spcSchoolStatus1: Boolean = true;

    createProvCredential() {
        this.formValidation.validateForm();
        if (this.providerCredentialsForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.seqProvId = this.provMaster.seqProvId;
            provCredential.provCredentialPrimaryKey.seqProvId = this.provMaster.seqProvId;
            this.setProvCredentialModel(provCredential);
            this.provCredentialService.createProvCredential(provCredential).subscribe(() => {
                this.alertMessage = this.alertMessageService.close();
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProvCredential = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.popupClose = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateProvCredential(seqProvId: number, seqProvCredential: number) {
        this.formValidation.validateForm();
        if (this.providerCredentialsForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.seqProvCredential = seqProvCredential;
            provCredential.seqProvId = seqProvId;
            provCredential.provCredentialPrimaryKey = this.provCredential.provCredentialPrimaryKey;
            this.setProvCredentialModel(provCredential);
            this.provCredentialService.updateProvCredential(provCredential, seqProvId, seqProvCredential).subscribe(() => {
                this.alertMessage = this.alertMessageService.close();
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveProvCredential() {
        this.saveChanges();
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (
            this.securityService.checkInsertUpdatePermissions(
                this.editProvCredential,
                this.secWin
            )
        ) {
            if (this.editProvCredential) {
                this.updateProvCredential(this.provCredential.provCredentialPrimaryKey.seqProvId, this.provCredential.provCredentialPrimaryKey.seqProvCredential);
            } else {
                if(this.provCredentials.length == 0){
                    this.createProvCredential();
                }else{
                    this.alertMessage = this.alertMessageService.error("Only 1 credential per provider can be added.");
                }
            }
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Credentials')
            })
        } else {
            this.activeModal.close();
        }
    };

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
                    this.saveProvCredential()
                }
                else if(resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    deleteProvCredential(seqProvCredential: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            this.toastService.showToast('Not permitted to delete', NgbToastType.Danger);
        } else {
            this.provCredentialService.deleteProvCredential(seqProvCredential).subscribe(() => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProvCredential(seqProvCredential: number) {
        this.provCredentialService.getProvCredential(seqProvCredential).subscribe(provCredential => {
            this.setProvCredentialForm(provCredential);
        });
    }

    getProvCredentials() {
        this.provCredentialService.getProvCredentials().subscribe(provCredentials => {
            this.provCredentials = provCredentials;
        });
    }

    setProvCredentialModel(provCredential: ProvCredential) {
        provCredential.license1 = Form.getValue(this.providerCredentialsForm, 'license1');
        provCredential.state1 = Form.getValue(this.providerCredentialsForm, 'state1');
        provCredential.license2 = Form.getValue(this.providerCredentialsForm, 'license2');
        provCredential.state2 = Form.getValue(this.providerCredentialsForm, 'state2');
        provCredential.deaLicense = Form.getValue(this.providerCredentialsForm, 'dea');
        provCredential.specialtyBoard1 = Form.getValue(this.providerCredentialsForm, 'spcBoard1');
        provCredential.specialtyBoard2 = Form.getValue(this.providerCredentialsForm, 'spcBoard2');
        provCredential.medicalSchool = Form.getValue(this.providerCredentialsForm, 'medSchool');
        provCredential.internship = Form.getValue(this.providerCredentialsForm, 'internship');
        provCredential.residency = Form.getValue(this.providerCredentialsForm, 'residency');
        provCredential.userDefined1 = Form.getValue(this.providerCredentialsForm, 'userdef1');
        provCredential.userDefined2 = Form.getValue(this.providerCredentialsForm, 'userdef2');
        provCredential.userDefined3 = Form.getValue(this.providerCredentialsForm, 'userdef3');
        provCredential.userDefined4 = Form.getValue(this.providerCredentialsForm, 'userdef4');
        provCredential.userDefined5 = Form.getValue(this.providerCredentialsForm, 'userdef5');
        provCredential.userDefined6 = Form.getValue(this.providerCredentialsForm, 'userdef6');
        provCredential.userDefined7 = Form.getValue(this.providerCredentialsForm, 'userdef7');
        provCredential.userDefined8 = Form.getValue(this.providerCredentialsForm, 'userdef8');
        provCredential.comments = Form.getValue(this.providerCredentialsForm, 'comments');
        provCredential.includeInDir = Form.getValue(this.providerCredentialsForm, 'includeInDirectory') ? 1 : 0;
        provCredential.lastPrintDate = Form.getValue(this.providerCredentialsForm, 'lastPrintDate');
        provCredential.license1ExpireDt = Form.getDatePickerValue(this.providerCredentialsForm, 'expirationDate001');
        provCredential.license2ExpireDt = Form.getDatePickerValue(this.providerCredentialsForm, 'expirationDate002');
        provCredential.deaExpireDate = Form.getDatePickerValue(this.providerCredentialsForm, 'expirationDate003');
        provCredential.medSchoolDate = Form.getDatePickerValue(this.providerCredentialsForm, 'date001');
        provCredential.internshipDate = Form.getDatePickerValue(this.providerCredentialsForm, 'date002');
        provCredential.residencyDate = Form.getDatePickerValue(this.providerCredentialsForm, 'date003');
        provCredential.board1FromDate = Form.getDatePickerValue(this.providerCredentialsForm, 'from001');
        provCredential.board1ToDate = Form.getDatePickerValue(this.providerCredentialsForm, 'to001');
        provCredential.board2FromDate = Form.getDatePickerValue(this.providerCredentialsForm, 'from002');
        provCredential.board2ToDate = Form.getDatePickerValue(this.providerCredentialsForm, 'to002');
        if(this.provCredential){
            provCredential.insuranceCarrier1 = this.provCredential.insuranceCarrier1;
            provCredential.insuranceCarrier2 = this.provCredential.insuranceCarrier2;
            provCredential.insurancePolicy1 = this.provCredential.insurancePolicy1;
            provCredential.insurancePolicy2 = this.provCredential.insurancePolicy2;
            provCredential.policyDescr1 = this.provCredential.policyDescr1;
            provCredential.policyDescr2 = this.provCredential.policyDescr2;
            provCredential.effectiveFrom1 = this.provCredential.effectiveFrom1;
            provCredential.effectiveFrom2 = this.provCredential.effectiveFrom2;
            provCredential.effectiveTo1 = this.provCredential.effectiveTo1;
            provCredential.effectiveTo2 = this.provCredential.effectiveTo2;
            provCredential.claimLimit1 = this.provCredential.claimLimit1;
            provCredential.claimLimit2 = this.provCredential.claimLimit2;
            provCredential.aggregLimit1 = this.provCredential.aggregLimit1;
            provCredential.aggregateLimit2 = this.provCredential.aggregateLimit2;
        }
    }

    setProvCredentialForm(provCredential: ProvCredential) {
        this.provCredential = provCredential;
        this.provCredential.provCredentialPrimaryKey.seqProvId = provCredential.provMaster ? provCredential.provMaster.seqProvId : provCredential.provCredentialPrimaryKey.seqProvId;
        this.shortName = provCredential.provMaster ? provCredential.provMaster.shortName : this.shortName;
        this.providerCredentialsForm.patchValue({
            'providerId': this.provCredential.provMaster ? this.provCredential.provMaster.providerId : this.providerId,
            'provCredentialPrimaryKey': this.provCredential.provCredentialPrimaryKey,
            'license1': this.provCredential.license1,
            'state1': this.provCredential.state1,
            'license2': this.provCredential.license2,
            'state2': this.provCredential.state2,
            'dea': this.provCredential.deaLicense,
            'spcBoard1': this.provCredential.specialtyBoard1,
            'spcBoard2': this.provCredential.specialtyBoard2,
            'medSchool': this.provCredential.medicalSchool,
            'internship': this.provCredential.internship,
            'residency': this.provCredential.residency,
            'userdef1': this.provCredential.userDefined1,
            'userdef2': this.provCredential.userDefined2,
            'userdef3': this.provCredential.userDefined3,
            'userdef4': this.provCredential.userDefined4,
            'userdef5': this.provCredential.userDefined5,
            'userdef6': this.provCredential.userDefined6,
            'userdef7': this.provCredential.userDefined7,
            'userdef8': this.provCredential.userDefined8,
            'comments': this.provCredential.comments,
            'includeInDirectory': this.provCredential.includeInDir ? 1 : 0,
            'lastPrintDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.lastPrintDate),
            'expirationDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.license1ExpireDt),
            'expirationDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.license2ExpireDt),
            'expirationDate003': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.deaExpireDate),
            'date001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.medSchoolDate),
            'date002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.internshipDate),
            'date003': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.residencyDate),
            'from001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board1FromDate),
            'to001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board1ToDate),
            'from002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board2FromDate),
            'to002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board2ToDate),
            'carrier1': this.provCredential.insuranceCarrier1,
            'carrier2': this.provCredential.insuranceCarrier2,
            'policy1': this.provCredential.insurancePolicy1,
            'policy2': this.provCredential.insurancePolicy2,
            'from1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom1),
            'from2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom2),
            'to1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo1),
            'to2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo2),
            'claimLimit1': this.provCredential.claimLimit1,
            'claimLimit2': this.provCredential.claimLimit2,
            'aggregLimit1': this.provCredential.aggregLimit1,
            'aggregLimit2': this.provCredential.aggregateLimit2,
            'policyDescr1': this.provCredential.policyDescr1,
            'policyDescr2': this.provCredential.policyDescr2,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidateStatus();
        }, 2000)
        this.providerCredentialsForm.get('providerId').disable();
        this.license1Status = !this.provCredential.license1;
        this.license2Status = !this.provCredential.license2;
        this.deaStatus = !this.provCredential.deaLicense;
        this.spcSchoolStatus1 = !this.provCredential.specialtyBoard1;
        this.spcSchoolStatus2 = !this.provCredential.specialtyBoard2;
        this.medSchoolStatus = !this.provCredential.medicalSchool;
        this.internshipStatus = !this.provCredential.internship;
        this.residencyStatus = !this.provCredential.residency;
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private provMasterService: ProvMasterService,
        private provCredentialService: ProvCredentialService,
        private messageService: MessageMasterDtlService,
        private provTypeMasterService: ProvTypeMasterService
        ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerCredentialsForm);
        this.getProviderTypes();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderCredentialsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
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
                this.initializeComponentState();
                this.secProgress = false;
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId(this.tableName, secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
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

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerCredentialsForm);
        this.menuInit();
        if (this.providerId) {
             this.providerCredentialsForm.patchValue({
               providerId: this.providerId,
             });
            this.setProviderId(this.providerId.toString());
        }
    }



    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerCredentialsForm = this.formBuilder.group({
            providerId: ['', { updateOn: 'blur', validators: [] }],
            shortName: ['', { updateOn: 'blur', validators: [] }],
            license1: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            state1: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] }],
            license2: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            state2: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] }],
            dea: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            spcBoard1: ['', { updateOn: 'blur', validators: [Validators.maxLength(6)] }],
            spcBoard2: ['', { updateOn: 'blur', validators: [Validators.maxLength(6)] }],
            medSchool: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            internship: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            residency: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef1: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef2: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef3: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef4: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef5: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef6: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef7: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            userdef8: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            comments: ['', { updateOn: 'blur', validators: [Validators.maxLength(60)] }],
            includeInDirectory: ['', { updateOn: 'blur', validators: [] }],
            lastPrintDate: ['', { updateOn: 'blur', validators: [] }],
            expirationDate001: ['', { updateOn: 'blur', validators: [] }],
            expirationDate002: ['', { updateOn: 'blur', validators: [] }],
            expirationDate003: ['', { updateOn: 'blur', validators: [] }],
            date001: ['', { updateOn: 'blur', validators: [] }],
            date002: ['', { updateOn: 'blur', validators: [] }],
            date003: ['', { updateOn: 'blur', validators: [] }],
            from001: ['', { updateOn: 'blur', validators: [] }],
            to001: ['', { updateOn: 'blur', validators: [] }],
            from002: ['', { updateOn: 'blur', validators: [] }],
            to002: ['', { updateOn: 'blur', validators: [] }],
            carrier1: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            carrier2: ['', { updateOn: 'blur', validators: [Validators.maxLength(25)] }],
            policy1: ['', { updateOn: 'blur', validators: [Validators.maxLength(20)] }],
            policy2: ['', { updateOn: 'blur', validators: [Validators.maxLength(20)] }],
            from1: ['', { updateOn: 'blur', validators: [] }],
            from2: ['', { updateOn: 'blur', validators: [] }],
            to1: ['', { updateOn: 'blur', validators: [] }],
            to2: ['', { updateOn: 'blur', validators: [] }],
            claimLimit1: ['', { updateOn: 'blur', validators: [] }],
            claimLimit2: ['', { updateOn: 'blur', validators: [] }],
            aggregLimit1: ['', { updateOn: 'blur', validators: [] }],
            aggregLimit2: ['', { updateOn: 'blur', validators: [] }],
            policyDescr1: ['', { updateOn: 'blur', validators: [Validators.maxLength(50)] }],
            policyDescr2: ['', { updateOn: 'blur', validators: [Validators.maxLength(50)] }],
        }, { updateOn: 'blur',
            validators: [
                DateRangeValidator.validate(this.toastService, 'from001', 'to001',
                    'Spc board 1', 'Spc board 1'),
                DateRangeValidator.validate(this.toastService, 'from002', 'to002',
                    'Spc board 2', 'Spc board 2'),
                DateRangeValidator.validate(this.toastService, 'from1', 'to1',
                    'Carrier 1 From 1', 'Carrier 1 To 1'),
                DateRangeValidator.validate(this.toastService, 'from2', 'to2',
                    'Carrier 2 From 2', 'Carrier 2 To 2')
            ]
        });
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New' }, { name: 'Open' }, { name: 'Save' }, { name: 'Close' },
                    { isHorizontal: true }, { name: 'Main Menu...' }, { name: 'Shortcut Menu...' },
                    { isHorizontal: true }, { name: 'Print', disabled: true },
                    { isHorizontal: true }, { name: 'Exit' }]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true }, { isHorizontal: true }, {
                    name: 'Cut',
                    disabled: true
                },
                    { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true },
                    { name: 'Lookup' }, { name: 'Sort by Sequence', disabled: true }, {
                        name: 'Sort by Panel ID',
                        disabled: true
                    }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{ name: 'Master' }, { name: 'Address' }, { name: 'Contracts' },
                    { name: 'Credentials' }, { name: 'Privileges' }, { name: 'Enrollment' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'Provider Master Lookup' }, { name: 'Insurance' }]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4' }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' }, { name: 'Layer' }, { name: 'Cascade' }, { name: 'Arrange Icons' },
                    { isHorizontal: true }, { name: 'Show Timestamp' }, { name: 'Audit Display' }, { isHorizontal: true }, { name: '1 Main Menu' },
                    { name: '2 Provider Credentials' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }

    resetAll(editProvCredential: boolean = true) {
        this.alertMessage = this.alertMessageService.close();
        this.providerCredentialsForm.reset({providerId: this.providerId});
        this.editProvCredential = editProvCredential;
        this.shortName = '';
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.providerId) {
                        this.errorPopup(8011)
                    } else {
                        this.errorPopup(5513)
                    }
                    break;
                }
                case 'Open': {
                    this.resetAll(false);
                    break;
                }
                case 'Save': {
                    this.saveChanges();
                    break;
                }
                case 'Close': {
                    this.resetAll(false);
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {             // handle special-Menu Actions
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Notes') {
            this.handleNotesMenu(event.action);
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {
            case 'Provider Master Lookup': {
                this.openLookupPage();
                break;
            }

            case 'Insurance': {
                this.isChildModalOpen = true;

                const ref = this.modalService.open(InsuranceComponent, {
                    size: <any>'xl',
                    beforeDismiss: () => {
                        this.isChildModalOpen = false;
                        return true;
                    },
                });
                ref.componentInstance.showIcon = true;
                this.setProvCredentialModel(this.provCredential);
                ref.componentInstance.insuranceForm = this.providerCredentialsForm;
                ref.componentInstance.providerId = this.providerId;
                ref.componentInstance.editProvCredential = this.editProvCredential;
                ref.componentInstance.provMaster = this.provMaster;
                ref.componentInstance.provCredential = this.provCredential;
                ref.componentInstance.provCredentials = this.provCredentials;
                ref.result.then((response: any) => {
                    console.log(response);
                    if(response) {
                        this.setProvCredentialForm(response.provCredential);
                    }
                });
                break;
            }

            default: {
                this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                break;
            }
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Master": {
                const ref = this.modalService.open(ProviderMasterComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.providerId;
                break;
            }
            case "Address": {
                const ref = this.modalService.open(ProviderAddressComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.providerId;
                break;
            }
            case "Contracts": {
                const ref = this.modalService.open(ProviderContractsComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.providerId;
                break;
            }
            case "Credentials": {
                break;
            }
            case "Privileges": {
                break;
            }
            case "Enrollment": {
                break;
            }
            default: {
                this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                break;
            }
        }
    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                this.popUpNotesMenuClicked(action);
                break;
            }
            default: {
                this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                break;
            }
        }
    }

    /**
     * Help Menu actions
     * @param action
     */
    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'CREDL_Provider_Credentials.htm';
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    setProviderId(providerId: string) {
        this.providerId = providerId.toUpperCase();
        if(this.providerId) {
            this.providerCredentialsForm.patchValue({'providerId': this.providerId});

            this.provMasterService.findByProviderId(this.providerId).subscribe(provMaster => {
                this.resetAll(false);
                this.provMaster = provMaster;
                if (provMaster) {
                    this.provCredentialService.findByProviderId(this.providerId).subscribe(provCredentials => {
                        this.provCredentials = provCredentials;
                        if (this.provCredentials && this.provCredentials.length > 0) {
                            this.provCredential = this.provCredentials[0]
                            this.setProvCredentialForm(this.provCredential);
                            this.editProvCredential = true;
                        } else {
                            this.provCredentials = [];
                            this.editProvCredential = false;
                            this.alertMessage = this.alertMessageService.error("No provider credentials found, you may add one.");
                        }
                    });
                } else {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
                }
            }, () => {
                this.resetAll(false);
            });
        }else {
            this.resetAll(false);
        }
    }

    onChangeProviderId(event: any) {
        this.setProviderId(event.target.value);
    }

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.setProviderId(resp.PROVIDER_ID);
        })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getProviderTypes() {
        this.provTypeMasterService.getProvTypeMasters().subscribe(provTypeMasters => {
            this.provTypeMasters = provTypeMasters;
        }, error => {
            console.log(`Error getting providerTypes: ${error}`);
        });
    }

    errorPopup = (messageId: number) => {
        this.messageService.findByMessageId(messageId).subscribe(res => {
            let popUpMessage = new PopUpMessage(
                'poUpMessageName',
                'Provider Credentials',
                messageId + ': ' + res[0].messageText,
                'icon');
            popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
        })
    };

    inputOnchangeStatus = (event) => {
       let id = event.srcElement.id;
       switch (id) {
           case 'license1':
               this.license1Status = false;
               break;
           case 'license2':
               this.license2Status = false;
               break;
           case 'dea':
               this.deaStatus = false;
               break;
           case 'spcBoard1':
               this.spcSchoolStatus1 = false;
               break;
           case 'spcBoard2':
               this.spcSchoolStatus2 = false;
               break;
           case 'medSchool':
               this.medSchoolStatus = false;
               break;
           case 'internShip':
               this.internshipStatus = false;
               break;
           case 'residency':
               this.residencyStatus = false;
               break;
       }
    }

    isFormValidateStatus = () => {
        this.providerCredentialsForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
