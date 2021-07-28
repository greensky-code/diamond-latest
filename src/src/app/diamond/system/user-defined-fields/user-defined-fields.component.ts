/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit, ViewChild, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDefinedText, SecWin, SecUser, MessageMasterDtl } from "../../../api-models/index"
import { UserDefinedTextService } from "../../../api-services/user-defined-text.service"
import { UserDefinedValdtCodes } from "../../../api-models/index"
import { UserDefinedValdtCodesService } from "../../../api-services/user-defined-valdt-codes.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { NgbToastType } from 'ngb-toast';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { Menu, OPERATIONS } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { MessageType } from '../../../shared/components/confirmation-message';
import { LanguageSelectComponent } from '../../support/language-select/language-select.component';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { getUDTXTShortcutKeys } from '../../../shared/services/shared.service';
import { MessageMasterDtlService } from "../../../api-services";
import { AuditService } from '../../../shared/services/audit.service';
import { UserDefinedValidateCode } from '../../../api-models/user-defined-validate-code';


// Use the Component directive to define the UserDefinedFieldsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'userdefinedfields',
    templateUrl: './user-defined-fields.component.html',
    providers: [UserDefinedTextService, UserDefinedValdtCodesService, LanguageMasterService, AuditService, DatePipe]

})
export class UserDefinedFieldsComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.shortcuts.push(...getUDTXTShortcutKeys(this));
        this.cdr.detectChanges();
    }

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    userDefinedFieldsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'UDTXT';
    public isSuperUser = false;
    public secProgress = true;
    private userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    menu: Menu[];
    ifFormHasChanges: boolean = false;
    ifCodeFormHasChanges: boolean = false;
    @Input() showIcon: boolean = true;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    userDefinedValidateCode: UserDefinedValidateCode;
    isUserDefinedValidateChecked: boolean = false;
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

    editUserDefinedText: boolean;
    userDefinedText: UserDefinedText = new UserDefinedText();
    userDefinedTexts: UserDefinedText[];
    editUserDefinedValdtCodes: boolean = false;
    userDefinedValdtCodes: UserDefinedValdtCodes;
    userDefinedValdtCodeses: UserDefinedValdtCodes[];

    createUserDefinedText() {
        this.formValidation.validateForm();
        if (this.userDefinedFieldsForm.valid) {
            let userDefinedText = new UserDefinedText();
            userDefinedText.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedText.userDefineText = Form.getValue(this.userDefinedFieldsForm, 'userDefinedText');
            userDefinedText.userDefineRequired = Form.getValue(this.userDefinedFieldsForm, 'userDefinedRequired');
            userDefinedText.userDefineValidateFlag = Form.getValue(this.userDefinedFieldsForm, 'userDefinedValidate');
            this.auditService.setAuditFields(UserDefinedText, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.userDefinedTextService.createUserDefinedText(userDefinedText).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editUserDefinedText = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateUserDefinedText() {
        this.formValidation.validateForm();
        if (this.userDefinedFieldsForm.valid) {
            let userDefinedText = new UserDefinedText();
            userDefinedText.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedText.userDefineText = Form.getValue(this.userDefinedFieldsForm, 'userDefinedText');
            userDefinedText.userDefineRequired = Form.getValue(this.userDefinedFieldsForm, 'userDefinedRequired') == true ? 'Y' : 'N';
            userDefinedText.userDefineTextName = Form.getValue(this.userDefinedFieldsForm, 'userDefineTextName'),
                userDefinedText.userDefineName = Form.getValue(this.userDefinedFieldsForm, 'validatedColumnName'),
                userDefinedText.winId = Form.getValue(this.userDefinedFieldsForm, 'winId'),
                userDefinedText.datawindowId = Form.getValue(this.userDefinedFieldsForm, 'datawindowId'),
                userDefinedText.validatedTableName = this.userDefinedText.validatedTableName; //Form.getValue(this.userDefinedFieldsForm, 'validatedTableName'),
            userDefinedText.validatedColumnName = this.userDefinedText.validatedColumnName; //Form.getValue(this.userDefinedFieldsForm, 'validatedColumnName'),

            userDefinedText.userDefineValidateFlag = this.isUserDefinedValidateChecked == true ? 'Y' : 'N',
                userDefinedText.maxLen = Form.getValue(this.userDefinedFieldsForm, 'maxLen');

            let updatedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
            let insertUser = sessionStorage.getItem('user');
            let insertProcess = this.windowId;
            userDefinedText.insertDatetime = updatedDate;
            userDefinedText.updateDatetime = updatedDate;
            userDefinedText.insertUser = insertUser
            userDefinedText.insertProcess = insertProcess;
            userDefinedText.updateUser = insertUser;
            userDefinedText.updateProcess = insertProcess;


            let userDefinedValdtCodes: any = {};
            let userDefinedValdtCodesPrimaryKey: any = {};
            userDefinedValdtCodesPrimaryKey.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedValdtCodesPrimaryKey.validatedColumnName = this.userDefinedText.validatedColumnName;
            userDefinedValdtCodesPrimaryKey.validatedTableName = this.userDefinedText.validatedTableName;
            userDefinedValdtCodesPrimaryKey.userValidCode = Form.getValue(this.userDefinedFieldsForm, 'thruValidCode');
            userDefinedValdtCodes['userDefinedValdtCodesPrimaryKey'] = userDefinedValdtCodesPrimaryKey;
            userDefinedValdtCodes.userValidCodeLongDesc = Form.getValue(this.userDefinedFieldsForm, 'shortDescription');
            userDefinedValdtCodes.userValidCodeShortDesc = Form.getValue(this.userDefinedFieldsForm, 'longDescription');

            this.secProgress = true;
            this.auditService.setAuditFields(userDefinedText, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.userDefinedTextService.updateUserDefinedText(userDefinedText).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editUserDefinedText = false;
                this.secProgress = false;
                this.ifFormHasChanges = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
                this.isFormDataChangeStatus = false;
                if (this.ifFormHasuserDefinedValdtCodes) {
                    this.saveUserDefinedValdtCodes(userDefinedValdtCodes);
                    this.isFormDataChangeStatus = false;
                }
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                this.secProgress = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }
    saveUserDefinedText() {
        this.updateUserDefinedText();
    }

    deleteUserDefinedText(languageId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.userDefinedTextService.deleteUserDefinedText(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getUserDefinedText(languageId: string) {
        this.userDefinedTextService.getUserDefinedText(languageId).subscribe(userDefinedText => {
            this.userDefinedText = userDefinedText;
            this.userDefinedFieldsForm.patchValue({
                'languageId': this.userDefinedText.languageId,
                'userDefinedText': this.userDefinedText.userDefineText,
                'userDefinedRequired': this.userDefinedText.userDefineRequired,
                'userDefinedValidate': this.userDefinedText.userDefineValidateFlag,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getUserDefinedTexts() {
        this.secProgress = true;
        this.userDefinedTextService.getUserDefinedTexts().subscribe(userDefinedTexts => {
            this.userDefinedTexts = userDefinedTexts;
            this.dataGrid001GridOptions.api.setRowData(this.userDefinedTexts);


            this.secProgress = false;

            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        }, error => {
            this.secProgress = false;
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createUserDefinedValdtCodes(userDefinedValdtCodes: any) {
        this.formValidation.validateForm();
        if (this.userDefinedFieldsForm.valid) {
            userDefinedValdtCodes.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedValdtCodes.userValidCode = Form.getValue(this.userDefinedFieldsForm, 'thruValidCode');
            userDefinedValdtCodes.userValidCodeLongDesc = Form.getValue(this.userDefinedFieldsForm, 'longDescription');
            userDefinedValdtCodes.userValidCodeShortDesc = Form.getValue(this.userDefinedFieldsForm, 'shortDescription');
            this.secProgress = true;
            this.auditService.setAuditFields(userDefinedValdtCodes, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.userDefinedValdtCodesService.createUserDefinedValdtCodes(userDefinedValdtCodes).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editUserDefinedValdtCodes = false;
                this.secProgress = false;
            }, error => {
                this.secProgress = false;
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateUserDefinedValdtCodes(userDefinedValdtCodes: any) {
        //if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.userDefinedFieldsForm.valid) {

            // userDefinedValdtCodes.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedValdtCodes.userValidCode = Form.getValue(this.userDefinedFieldsForm, 'thruValidCode');
            userDefinedValdtCodes.userValidCodeLongDesc = Form.getValue(this.userDefinedFieldsForm, 'longDescription');
            userDefinedValdtCodes.userValidCodeShortDesc = Form.getValue(this.userDefinedFieldsForm, 'shortDescription');

            this.secProgress = true;
            this.auditService.setAuditFields(userDefinedValdtCodes, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.userDefinedValdtCodesService.updateUserDefinedValdtCodes(userDefinedValdtCodes).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editUserDefinedValdtCodes = false;
                this.secProgress = false;
            }, error => {
                this.secProgress = false;
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveUserDefinedValdtCodes(userDefinedValdtCodes: any) {
        if (this.editUserDefinedValdtCodes) {
            this.updateUserDefinedValdtCodes(userDefinedValdtCodes)
        } else {
            this.createUserDefinedValdtCodes(userDefinedValdtCodes);
        }
    }

    deleteUserDefinedValdtCodes(languageId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.userDefinedValdtCodesService.deleteUserDefinedValdtCodes(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getUserDefinedValdtCodes(languageId: string) {
        this.userDefinedValdtCodesService.getUserDefinedValdtCodes(languageId).subscribe(userDefinedValdtCodes => {
            this.userDefinedValdtCodes = userDefinedValdtCodes;
            this.userDefinedFieldsForm.patchValue({
                'languageId': this.userDefinedValdtCodes.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getUserDefinedValdtCodeses() {
        this.userDefinedValdtCodesService.getUserDefinedValdtCodeses().subscribe(userDefinedValdtCodeses => {
            this.userDefinedValdtCodeses = userDefinedValdtCodeses;

            this.dataGrid002GridOptions.api.setRowData(this.userDefinedValdtCodeses);

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    getUserDefinedValdtCodesesByFilter(userDefineText: any) {
        this.userDefinedValdtCodesService.getUserDefinedValdtCodesByFilter(0, '', '').subscribe(userDefinedValdtCodeses => {
            this.userDefinedValdtCodeses = userDefinedValdtCodeses;

            this.dataGrid002GridOptions.api.setRowData(this.userDefinedValdtCodeses);

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Win ID",
                field: "userDefinedTextPrimaryKey.winId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Datawindow ID",
                field: "userDefinedTextPrimaryKey.datawindowId",
                width: 200
            },
            {
                headerName: "User Defined Text Name",
                field: "userDefinedTextPrimaryKey.userDefineTextName",
                width: 200
            },
            {
                headerName: "User Defined Text",
                field: "userDefineText",
                width: 200
            },
            {
                headerName: "User Def Req",
                field: "userDefineRequired",
                width: 200
            },
            {
                headerName: "User Def Vld",
                field: "userDefineValidateFlag",
                width: 200
            },
            {
                headerName: "Max Len",
                field: "maxLen",
                width: 200
            }
        ];
    }
    createDataGrid002(): void {
        this.dataGrid002GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "User Valid Code",
                field: "userDefinedValdtCodesPrimaryKey.userValidCode",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Short Descripton",
                field: "userValidCodeShortDesc",
                width: 200
            },
            {
                headerName: "Long Description",
                field: "userValidCodeLongDesc",
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private auditService: AuditService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private userDefinedTextService: UserDefinedTextService,
        private userDefinedValdtCodesService: UserDefinedValdtCodesService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private activeModal: NgbActiveModal,
        private languageMasterService: LanguageMasterService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private datePipe: DatePipe,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER COB History',
                        'MEMBER COB History Permission'
                    );
                }
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_OTHER_COVERAGE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.userDefinedFieldsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getUserDefinedTexts();
        this.menuInit()
        this.userDefinedValidateCode = new UserDefinedValidateCode();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.userDefinedFieldsForm = this.formBuilder.group({
            languageId: ['', { updateOn: 'blur', validators: [] }],
            languageDescription: ['', { updateOn: 'blur', validators: [] }],
            userDefinedText: ['', { updateOn: 'blur', validators: [] }],
            userDefinedRequired: ['', { updateOn: 'blur', validators: [] }],
            userDefinedValidate: ['', { updateOn: 'blur', validators: [] }],
            thruValidCode: ['', { updateOn: 'blur', validators: [] }],
            shortDescription: ['', { updateOn: 'blur', validators: [] }],
            longDescription: ['', { updateOn: 'blur', validators: [] }],
            datawindowId: ['', { updateOn: 'blur', validators: [] }],
            userDefineTextName: ['', { updateOn: 'blur', validators: [] }],
            winId: ['', { updateOn: 'blur', validators: [] }],
            maxLen: ['', { updateOn: 'blur', validators: [] }],
            userDefineName: ['', { updateOn: 'blur', validators: [] }],
            userDefineValidateFlag: ['', { updateOn: 'blur', validators: [] }],
            userDefineTableName: ['', { updateOn: 'blur', validators: [] }],
            userDefineColumnName: ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });

        this.userDefinedFieldsForm.valueChanges.subscribe(valueChange => {
            this.ifFormHasChanges = true;
        })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ifFormHasuserDefinedValdtCodes: boolean = false;
    onRowSelectedGrid001(event: any) {
        if (!event.node.selected) {
            return;
        }

        if (this.dataGrid001GridOptions.api.getSelectedRows().length > 0) {
            this.setFormData(event.data);
            this.userDefinedText = event.data;
            this.editUserDefinedText = true;
            this.dataGrid002GridOptions.api.setRowData(event.data.userDefinedValdtCodesViewModel);
            if (event.data.userDefinedValdtCodesViewModel) {
                if (event.data.userDefinedValdtCodesViewModel.length > 0) {
                    if (this.dataGrid002GridOptions.api.getSelectedRows().length > 0) {
                        this.ifFormHasuserDefinedValdtCodes = true;
                    }else{
                        this.ifFormHasuserDefinedValdtCodes = false;                           
                    }
                } else {
                    this.ifFormHasuserDefinedValdtCodes = false;
                    this.userDefinedFieldsForm.patchValue({
                        'thruValidCode': '',
                        'shortDescription': '',
                        'longDescription': ''
                    });
                }
            }
        }
    }

    onRowSelectedGrid002(event: any) {
        this.userDefinedValidateCode = new UserDefinedValidateCode();
        if (!event.node.selected) {
            this.userDefinedValidateCode = new UserDefinedValidateCode();
            this.editUserDefinedValdtCodes = false;
            this.ifFormHasuserDefinedValdtCodes = false; 
            return;
        }

        if (this.dataGrid002GridOptions.api.getSelectedRows().length > 0) {
            this.userDefinedValidateCode = event.data.userDefinedValdtCodesPrimaryKey
            this.setForm002Data(event.data);
            this.editUserDefinedValdtCodes = true;
            this.ifFormHasuserDefinedValdtCodes = true; 
        }
    }

    isuserDefinedValidateEditable: boolean = true;
    setFormData(userDefinedFields: UserDefinedText) {
        this.userDefinedFieldsForm.patchValue({
            'languageId': userDefinedFields['userDefinedTextPrimaryKey'].languageId,
            'userDefinedText': userDefinedFields.userDefineText, //userDefinedFields['userDefinedTextPrimaryKey'].userDefinedText,
            'userDefinedRequired': userDefinedFields.userDefineRequired === 'Y',
            'userDefinedValidate': userDefinedFields.userDefineValidateFlag == 'Y', //['userDefinedTextPrimaryKey'].columnName,
            'datawindowId': userDefinedFields['userDefinedTextPrimaryKey'].datawindowId,
            'userDefineTextName': userDefinedFields['userDefinedTextPrimaryKey'].userDefineTextName,
            'winId': userDefinedFields['userDefinedTextPrimaryKey'].winId,
            'validatedTableName': userDefinedFields.validatedTableName,
            'validatedColumnName': userDefinedFields.validatedColumnName,
            'userDefineValidateFlag': userDefinedFields.userDefineValidateFlag == 'Y',
            'maxLen': userDefinedFields.maxLen,
        }, { emitEvent: false });

        if (userDefinedFields.userDefineValidateFlag == 'Y') {
            this.isUserDefinedValidateChecked = true;
        } else {
            this.isUserDefinedValidateChecked = false;
        }

        if (!userDefinedFields.validatedTableName && !userDefinedFields.validatedColumnName) {
            this.userDefinedFieldsForm.controls['userDefineValidateFlag'].setValue('N', { emitEvent: false });

        }

        if (userDefinedFields.languageId) {
            let language = this.languages.filter(lang => lang.languageId == userDefinedFields.languageId, { emitEvent: false });
            this.userDefinedFieldsForm.controls['languageId'].setValue(language.langaugeId, { emitEvent: false });
            this.userDefinedFieldsForm.controls['languageDescription'].setValue(language.description, { emitEvent: false });
        }
        else {
            this.userDefinedFieldsForm.controls['languageId'].setValue(0, { emitEvent: false });
            this.userDefinedFieldsForm.controls['languageDescription'].setValue('American', { emitEvent: false });
        }
        this.isFormDataModified();
    }


    onUserDefinedValidateChange(event: any) {
        if (this.userDefinedText.validatedColumnName == null && this.userDefinedText.validatedTableName == null) {
            event.preventDefault();
            event.target.checked = false;
        }
        this.isUserDefinedValidateChecked = event.target.checked;
    }
    setForm002Data(userDefinedvaldtCode: any) {
        this.userDefinedFieldsForm.patchValue({
            'thruValidCode': userDefinedvaldtCode['userDefinedValdtCodesPrimaryKey'].userValidCode,
            'shortDescription': userDefinedvaldtCode.userValidCodeShortDesc, //userDefinedFields['userDefinedTextPrimaryKey'].userDefinedText,
            'longDescription': userDefinedvaldtCode.userValidCodeLongDesc,
        });
        this.isFormDataModified()
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.addNewUserDefinedCode();
                    break;
                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Delete': {
                    this.deleteUserDefinedCode();
                    break;
                }
                case 'Save': {
                    this.saveUserDefinedText();
                    break;
                }
                case 'Close': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
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
            // this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Special') {

            switch (event.action) {
                case 'Language':
                    this.OpenLanguageMenu();
            }

        } else if (event.menu.menuItem === 'Notes') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Window') {
            // handle special-Menu Actions
        }
    }


    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl + N' },
                    { name: 'Open' },
                    { name: 'Delete' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true },
                    { name: 'Copy', disabled: true },
                    { name: 'Paste', disabled: true },
                    { isHorizontal: true }
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Language' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Tile', shortcutKey: 'Ctrl + Alt + T' },
                    { name: 'Layer', shortcutKey: 'Ctrl + Alt + L' },
                    { name: 'Cascade', shortcutKey: 'Ctrl + Alt + C' },
                    { name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S' },
                    { name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A' }, { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 GL Assignment' }]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' },
                ],
            },
        ];
    }

    OpenLanguageMenu() {
        let ref = this.modalService.open(LanguageSelectComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.languageSelected.subscribe(selectedLang => {
            let language = this.languages.filter(lang => lang.languageId == selectedLang);
            this.userDefinedFieldsForm.controls['langaugeId'].setValue(language.langaugeId, { emitEvent: false });
            this.userDefinedFieldsForm.controls['languageDescription'].setValue(language.description, { emitEvent: false });
        })
    }

    languages: any;
    getLanguages = () => {
        this.languageMasterService.getLanguageMasters().subscribe(languages => {
            this.languages = languages;
        })
    };

    addNewUserDefinedCode() {
        this.ifFormHasuserDefinedValdtCodes = true;
        this.ifCodeFormHasChanges = false;
        let userCodes: UserDefinedValdtCodes[] = [];
        let userCode: any = {};
        userCode.userDefinedValdtCodesPrimaryKey = {};
        userCodes.push(userCode);
        this.dataGrid002GridOptions.api.applyTransaction({ 'add': userCodes });
        this.dataGrid002GridOptions.api.selectIndex(this.dataGrid002GridOptions.api.getDisplayedRowCount() - 1, false, false);
        setTimeout(() => {
            this.editUserDefinedValdtCodes = false;
        }, 2000);
    }

    deleteUserDefinedCode() {
        if (this.userDefinedValidateCode.userValidCode) {
            this.messageService
                .findByMessageId(29070)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.deleteFormPopupAlert("29070: " + message[0].messageText, "User Defined Fields");
                });
        } else {
            this.toastService.showToast('To delete User Defined Valdt Code Please select any row.', NgbToastType.Danger);
        }
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'User Defined Fields')
            })
        } else {
            this.activeModal.close();
        }
    };

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
                    this.saveUserDefinedText()
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
        this.userDefinedFieldsForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }


    deleteUserDefinedValidateCode(userDefinedValidateCode: UserDefinedValidateCode) {
        this.userDefinedValdtCodesService.deleteUserDefinedValdateCodes(userDefinedValidateCode).subscribe(response => {
            this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
        }, error => {
            this.toastService.showToast('An Error occurred while deleting record.', NgbToastType.Danger);
        });
    }

    deleteFormPopupAlert = (message: string, title: string) => {
        try {
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'OK') {
                    this.deleteUserDefinedValidateCode(this.userDefinedValidateCode);
                }
                else if (resp.name === 'Cancel') {
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
    
    updateValidateFlag(){
        this.ifFormHasuserDefinedValdtCodes=true;
    }
}
