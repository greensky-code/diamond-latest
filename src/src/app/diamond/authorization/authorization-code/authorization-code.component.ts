/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthCode, MessageMasterDtl, SecWin} from '../../../api-models/index'
import {AuthCodeService} from '../../../api-services/auth-code.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecUserService} from '../../../api-services/sec-user.service';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {DddwDtlService, MessageMasterDtlService} from '../../../api-services';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Menu} from '../../../shared/models/models';
import {getAuthCodeShortcutKeys} from '../../../shared/services/shared.service';

// Use the Component directive to define the AuthorizationCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "authorizationcode",
    templateUrl: "./authorization-code.component.html",
    providers: [AuthCodeService, DddwDtlService, MessageMasterDtlService],
})
export class AuthorizationCodeComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationCodeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = "";
    public isSuperUser = false;
    public secProgress = true;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    @Input() showIcon: boolean = false;

    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    searchStatus: boolean;
    CodeType: any;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthCodeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    editAuthCode: boolean;
    authCode: AuthCode;
    authCodeCode: any;
    authCodes: AuthCode[];

    createAuthCode() {
        this.formValidation.validateForm();
        if (this.authorizationCodeForm.valid) {
            let authCode = new AuthCode();
            authCode.authCode = Form.getValue(this.authorizationCodeForm, "authCode");
            authCode.codeType = Form.getValue(this.authorizationCodeForm, "type");
            authCode.description = Form.getValue(
                this.authorizationCodeForm,
                "description"
            );
            authCode.otherInfo = Form.getValue(
                this.authorizationCodeForm,
                "otherInformation"
            );
            this.authCodeService.createAuthCode(authCode).subscribe((response) => {
                    this.toastService.showToast("Record successfully Created.", NgbToastType.Success);
                    this.getcodeType();
                    this.editAuthCode = false;
                    this.isFormDataChangeStatus = false;   // data is saved

                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.isFormDataChangeStatus = false;
                    }
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateAuthCode(authCodeq: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationCodeForm.valid) {
            let authCode = new AuthCode();
            authCode.authCode = Form.getValue(this.authorizationCodeForm, "authCode");
            authCode.codeType = Form.getValue(this.authorizationCodeForm, "type");
            authCode.description = Form.getValue(
                this.authorizationCodeForm,
                "description"
            );
            authCode.otherInfo = Form.getValue(
                this.authorizationCodeForm,
                "otherInformation"
            );
            this.authCodeService.updateAuthCode(authCode, authCodeq).subscribe((response) => {
                    this.toastService.showToast("Record successfully updated.", NgbToastType.Success);
                    this.editAuthCode = false;
                    this.isFormDataChangeStatus = false;   // updated data is saved
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        
                        this.isFormDataChangeStatus = false;
                    }
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveAuthCode() {
        if (this.editAuthCode) {
            this.updateAuthCode(this.authCodeCode);
        } else {
            this.CheckIfAlreadyExist();
        }
    }

    CheckIfAlreadyExist() {
        this.createAuthCode();
    }

    deleteAuthCode(authCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
        } else {
            this.authCodeService.deleteAuthCode(authCode).subscribe(
                (response) => {
                    this.toastService.showToast("Record successfully deleted.", NgbToastType.Success);
                }
            );
        }
    }

    getAuthCode(authCode: string) {
        this.authCodeService.getAuthCode(authCode).subscribe(
            (authCode) => {
                this.authCode = authCode;
                this.authorizationCodeForm.patchValue({});
            }
        );
    }

    getAuthCodes() {
        this.authCodeService.getAuthCodes().subscribe(
            (authCodes) => {
                this.authCodes = authCodes;
                this.editAuthCode = true;
                this.authCodes.sort(function (a, b) {
                    if (a.authCode < b.authCode) {
                        return -1;
                    }
                    if (a.authCode > b.authCode) {
                        return 1;
                    }
                    return 0;
                });
                this.dataGrid001GridOptions.api.setRowData(this.authCodes);
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            }
        );
    }

    OnChangeGrid() {
        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            this.searchStatus = true;
            this.editAuthCode = true;
            this.authCodeCode = selectedRows[0].authCode;
            this.authorizationCodeForm.patchValue({
                authCode: selectedRows[0].authCode,
                type: selectedRows[0].codeType,
                description: selectedRows[0].description,
                otherInformation: selectedRows[0].otherInfo,
            }, {emitEvent: false});
            this.authorizationCodeForm.get("authCode").disable({emitEvent: false});
            this.isFormDataModified()
        } else {
            this.searchStatus = false;
        }
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
        };
        this.dataGrid001GridOptions.editType = "fullRow";
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Auth Code",
                field: "authCode",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Type",
                field: "codeType",
                width: 200,
            },
            {
                headerName: "Description",
                field: "description",
                width: 200,
            },
            {
                headerName: "Other Information",
                field: "otherInfo",
                width: 200,
            },
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
        };
        this.dataGrid002GridOptions.editType = "fullRow";
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Auth Code",
                field: "authCode",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Type",
                field: "codeType",
                width: 200,
            },
            {
                headerName: "Description",
                field: "description",
                width: 200,
            },
            {
                headerName: "Other Information",
                field: "otherInfo",
                width: 200,
            },
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private DddwDtlService: DddwDtlService,
        private router: Router,
        private secUserService: SecUserService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private authCodeService: AuthCodeService,
        private toastService: ToastService,
        private secColDetailService: SecColDetailService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.getcodeType();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationCodeForm);
        this.createDataGrid001();
        this.createDataGrid002();
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    private initializePermission(): void {
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
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("VENDOR_CREDIT", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                } else {
                    this.showPopUp(
                        "You are not Permitted to view MEMBER Master",
                        "Vendor Credit Permission"
                    );
                }
            }
        );
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationCodeForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getAuthCodes();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationCodeForm = this.formBuilder.group(
            {
                authCode: ["", {updateOn: "blur", validators: [Validators.required]}],
                type: ["", {updateOn: "blur", validators: [Validators.required]}],
                description: ["", {updateOn: "blur", validators: []}],
                otherInformation: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getcodeType() {
        this.DddwDtlService.findByColumnNameAndDwname(
            "code_type",
            "dw_authc_de"
        ).subscribe(
            (code) => {
                console.log(code);
                this.CodeType = code;
            }
        );
    }

    createNewAuthCode() {
        this.editAuthCode = false;
        this.dataGrid001GridOptions.api.deselectAll();
        this.resetAll();
        this.authorizationCodeForm.get("authCode").enable();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Save"},
                    {name: "Close"},
                    {name: "-"},
                    {name: "Main Menu..."},
                    {name: "Shortcut Menu..."},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit"},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", disabled: true},
                    {name: "Copy", disabled: true},
                    {name: "Paste", disabled: true},
                    {isHorizontal: true},
                    {name: "Lookup"},
                ],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile"},
                    {name: "Layer"},
                    {name: "Cascade"},
                    {name: "Arrange Icons"},
                    {isHorizontal: true},
                    {name: "Show Timestamp"},
                    {name: "Audit Display"},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Vendor Master"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window"},
                    {isHorizontal: true},
                    {name: "Glossary"},
                    {name: "Getting Started"},
                    {name: "How to use Help"},
                    {isHorizontal: true},
                    {name: "About Diamond Client/Server"},
                ],
            },
        ];
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewAuthCode();
                    break;
                }
                case "Open": {
                    this.resetAll();
                    break;
                }
                case "Save": {
                    this.saveAuthCode();
                    break;
                }
                case "Close": {
                    this.resetAll();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(
                        "Action is not valid",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
            }
        }
    }

    resetAll() {
        this.dataGrid001GridOptions.api.deselectAll();
        this.authorizationCodeForm.reset();
    }

    /**
     * Handle Menu Actions for edit
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case "Lookup": {
                // this.openLookupFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    ShowError(number: any, check: any, value = "1") {
        if (check) {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ":" + message[0].messageText.replace("1@", value),
                        "Authorization Code"
                    );
                });
        } else {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ":" + message[0].messageText,
                        "Authorization Code"
                    );
                });
        }
    }

    modalClose() {
        this.screenCloseRequest = true;
        
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Code')
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
                    this.saveAuthCode()
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
        this.authorizationCodeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });
    }

    checkAuthCode = (event) => {
        const authCode = event.target.value;
        this.authCodeService.getAuthCode(authCode).subscribe(
            (data) => {
                if (data) {
                    this.ShowError(7109, false);
                }
            }
        );
    }
}
