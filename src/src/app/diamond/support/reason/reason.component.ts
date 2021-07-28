/* Copyright (c) 2021 . All Rights Reserved. */
import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, ReasonCodeMaster, SecUser, SecWin} from '../../../api-models'
import {DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService, SecUserService} from '../../../api-services'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {Menu} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {CONSTANTS, getReasonShortcutKeys} from '../../../shared/services/shared.service';
import {PCP_JOB_SET_UP, REASON_MODULE_ID} from '../../../shared/app-constants';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SupportHelpComponent} from "../support-help/support-help.component";
// Use the Component directive to define the ReasonComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'reason',
    templateUrl: './reason.component.html',
})

export class ReasonComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    reasonForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = REASON_MODULE_ID;
    editReasonCodeMaster = true;
    reasonCodeMaster: ReasonCodeMaster;
    reasonCodeMasters: ReasonCodeMaster[];
    public dataGridGridOptions: GridOptions;
    private windowId = 'REASN';
    isDisabledReasonCode = false;
    userTemplateId: string;
    popupClose: Boolean = false;
    public menu: Menu[] = [];
    reasonCodeTypes: any[] = [];
    shortcuts: ShortcutInput[] = [];
    public reasonCodeType: any[] = [];
    @Input() winID?: string;
    @Input() showIcon = false;
    @ViewChild('reasonCode') reasonCodeEle: ElementRef;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    errorReasonCode: boolean;
    descriptionNum: number;
    // Use constructor injection to inject an instance of a FormBuilder

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.

    ngOnInit(): void {
        this.hasPermission();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    private initializeComponentState(): void {
        this.menuInit();
        this.getReasonCodeDropdowns();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.reasonForm);
        this.createDataGrid();
        this.getReasonCodeMasters();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getReasonShortcutKeys(this));
        this.cdr.detectChanges();
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
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getReasonCodeDropdowns() {
        this.dddwDtlService.findByColumnNameAndDwname('reason_code_type', 'dw_reasn_de').subscribe((reasonCodeTypes) => {
            this.reasonCodeType = reasonCodeTypes;
        }, error => {
            console.log(error);
        });
    }

    createReasonCodeMaster() {
        // if (this.secWin.hasInsertPermission()) {


     if (this.errorReasonCode) {
          this.messageService
            .findByMessageId(7109)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "7109: " + message[0].messageText,
                "Reason Master "
              );
            });
            return;
          }
        this.editReasonCodeMaster = false;
        this.formValidation.validateForm();
        if (this.reasonForm.valid) {
            let reasonCodeMaster = new ReasonCodeMaster();
            reasonCodeMaster.reasonCode = Form.getValue(this.reasonForm, 'reasonCode');
            reasonCodeMaster.reasonCodeType = Form.getValue(this.reasonForm, 'reasonCodeType');
            reasonCodeMaster.userDefined1 = Form.getValue(this.reasonForm, 'holdAction');
            reasonCodeMaster.userDefined2 = Form.getValue(this.reasonForm, 'holdAge');
            reasonCodeMaster.userDate1 = Form.getDatePickerValue(this.reasonForm, 'userDate1');
            reasonCodeMaster.userDate2 = Form.getDatePickerValue(this.reasonForm, 'userDate2');
            reasonCodeMaster.autoAuditLocCod = Form.getValue(this.reasonForm, 'autoAudit');
            reasonCodeMaster.uncleanFlag = this.reasonForm.get('uncleanIndicator').value === true ? 'Y' : 'N';
            reasonCodeMaster.description2 = Form.getValue(this.reasonForm, 'longDescription');
            reasonCodeMaster.description = Form.getValue(this.reasonForm, 'shortDescription');
            this.reasonCodeMasterService.createReasonCodeMaster(reasonCodeMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editReasonCodeMaster = true;
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
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {
        // }
    }

    updateReasonCodeMaster(reasonCode: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.reasonForm.valid) {
            let reasonCodeMaster = new ReasonCodeMaster();
            reasonCodeMaster.reasonCode = Form.getValue(this.reasonForm, 'reasonCode');
            reasonCodeMaster.reasonCodeType = Form.getValue(this.reasonForm, 'reasonCodeType');
            reasonCodeMaster.userDefined1 = Form.getValue(this.reasonForm, 'holdAction');
            reasonCodeMaster.userDefined2 = Form.getValue(this.reasonForm, 'holdAge');
            reasonCodeMaster.userDate1 = Form.getDatePickerValue(this.reasonForm, 'userDate1');
            reasonCodeMaster.userDate2 = Form.getDatePickerValue(this.reasonForm, 'userDate2');
            reasonCodeMaster.autoAuditLocCod = Form.getValue(this.reasonForm, 'autoAudit');
            reasonCodeMaster.uncleanFlag = this.reasonForm.get('uncleanIndicator').value === true ? 'Y' : 'N';
            reasonCodeMaster.description2 = Form.getValue(this.reasonForm, 'longDescription');
            reasonCodeMaster.description = Form.getValue(this.reasonForm, 'shortDescription');
            this.reasonCodeMasterService.updateReasonCodeMaster(reasonCodeMaster, reasonCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                // this.editReasonCodeMaster = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveReasonCodeMaster() {
        if (this.editReasonCodeMaster) {
            this.updateReasonCodeMaster(this.reasonCodeMaster.reasonCode)
        } else {
            this.createReasonCodeMaster();
        }
    }

    deleteReasonCodeMaster(reasonCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.reasonCodeMasterService.deleteReasonCodeMaster(reasonCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getReasonCodeMaster(reasonCode: string) {
        this.reasonCodeMasterService.getReasonCodeMaster(reasonCode).subscribe(reasonCodeMaster => {
            this.reasonCodeMaster = reasonCodeMaster;
            this.reasonForm.patchValue({
                'reasonCode': this.reasonCodeMaster.reasonCode,
                'reasonCodeType': this.reasonCodeMaster.reasonCodeType,
                'holdAction': this.reasonCodeMaster.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.reasonCodeMaster.userDate1),
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.reasonCodeMaster.userDate2),
                'autoAudit': this.reasonCodeMaster.autoAuditLocCod,
                'holdAge': this.reasonCodeMaster.userDefined2,
                'uncleanIndicator': this.reasonCodeMaster.uncleanFlag == 'Y',
                'shortDescription': this.reasonCodeMaster.description,
                'longDescription': this.reasonCodeMaster.description2,
            });
            this.descriptionNum = this.reasonCodeMaster.calcDescription.length;
            this.isFormDataModified();

        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getReasonCodeMasters() {
        this.reasonCodeMasterService.getReasonCodeMasters().subscribe(reasonCodeMasters => {
            this.reasonCodeMasters = reasonCodeMasters;
            this.dataGridGridOptions.api.setRowData(this.reasonCodeMasters);
            this.dataGridGridOptions.api.getDisplayedRowAtIndex(0).setSelected(true);
            this.editReasonCodeMaster = true;
            this.isDisabledReasonCode = true;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'column';
        this.dataGridGridOptions.rowSelection = 'single';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Reason',
                field: 'reasonCode',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Reason Code Type',
                field: 'reasonCodeType',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 600
            }
        ];
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.

        this.reasonForm = this.formBuilder.group({
            reasonCode: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(5)]}],
            reasonCodeType: ['', {updateOn: 'blur', validators: [Validators.required]}],
            holdAction: ['', {updateOn: 'blur', validators: []}],
            userDate1: ['', {updateOn: 'blur', validators: []}],
            holdAge: ['', {updateOn: 'blur', validators: []}],
            userDate2: ['', {updateOn: 'blur', validators: []}],
            autoAudit: ['', {updateOn: 'blur', validators: []}],
            uncleanIndicator: ['', {updateOn: 'blur', validators: []}],
            shortDescription: ['', {updateOn: 'blur', validators: [Validators.required]}],
            longDescription: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('REASON_CODE_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    /**
     * Initialize menu
     */

    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New', shortcutKey: "Ctrl+M", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: "Open", shortcutKey: "Ctrl+O" },
                    { name: 'Save', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() || (this.editReasonCodeMaster && this.secWin.hasUpdatePermission())))) },
                    {name: 'Delete', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasDeletePermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                    { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                    { name: "Paste", shortcutKey: "Ctrl+V" },
                    { isHorizontal: true },
                    { name: "Sort by Code"},
                    { name: "Sort by Type"},
                ],
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Reason" },
                ],
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.reasonForm.reset();
                    this.editReasonCodeMaster = false;
                    this.isDisabledReasonCode = false;
                    break;
                }

                case 'Open': {
                    if (this.reasonForm.value.typeOrSpecCode) {
                        this.getReasonCodeMaster(this.reasonForm.value.reasonCode.toUpperCase());
                    }
                    break;
                }

                case 'Save': {
                    if (this.validateInputForSave()) {
                        this.saveReasonCodeMaster();
                    }
                    break;
                }

                case 'Shortcut Menu...': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }

                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }

        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }

        else {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    private validateInputForSave() {
        if (!this.reasonForm.get('reasonCode').value) {
            this.alertMessage = this.alertMessageService.error(
                '29034: reason code is a required field. Enter the something other than blanks.'
            );
            return false;
        }

        if (!this.reasonForm.get('reasonCodeType').value) {
            this.alertMessage = this.alertMessageService.error(
                '29034: Value required for reason_code_type.'
            );
            return false;
        }

        if (!this.reasonForm.get('shortDescription').value) {
            this.alertMessage = this.alertMessageService.error(
                'Short description is a required field.'
            );
            return false;
        }
        return true;
    }

    onRowSelection(event: any) {
        this.editReasonCodeMaster = true;
        this.getReasonCodeMaster(this.dataGridGridOptions.api.getSelectedRows()[0].reasonCode);
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Reason')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try {
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
                    this.saveReasonCodeMaster()
                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.reasonForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

      onChangeReason(event:any){
      if(event.key=='Tab'){
        var bAcc = event.target.value;
       for(var i=0;i<this.reasonCodeMasters.length;i++){
         console.log(this.reasonCodeMasters[i]["reasonCode"]);
        if (this.reasonCodeMasters[i]["reasonCode"] == bAcc) {
          this.messageService
            .findByMessageId(7109)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "7109: " + message[0].messageText,
                "Bank Account "
              );
            });
          event.preventDefault();
          this.errorReasonCode = true;
                      return;
        }
        else{
            this.errorReasonCode = false;
           // return true;
        }
      }

    }
  }


    longDescriptionChanged = (event) => {
        this.descriptionNum = event.target.value.length;
    };

    onChangeReasonCode(event) {
        let code = event.target.value;
        let rCode = this.reasonCodeMasters.filter(f => f.reasonCode === code);
        if (rCode && rCode.length > 0) {
            this.messageService.findByMessageId(7109).subscribe((res: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage(
                    'poUpMessageName',
                    'Reason',
                    '7109: ' + res[0].messageText,
                    'icon'
                );
                popUpMessage.buttons = [
                    new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
                ];
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
            });
            this.reasonForm.patchValue({
                reasonCode: null
            });
            this.reasonCodeEle.nativeElement.focus();
        }
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/REASN_Reason_Codes.htm';
    }
}
