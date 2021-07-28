import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from 'ag-grid-community';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbToastType} from 'ngb-toast';
import {MessageMasterDtl, SecUser, SystemCodeToken} from '../../../api-models';
import {SecFuncDescr} from '../../../api-models/security/sec-func-descr.model';
import {SecFunc} from '../../../api-models/security/sec-func.model';
import {MessageMasterDtlService, SecUserService, SystemCodeTokenService} from '../../../api-services';
import {SecFuncDescrService} from '../../../api-services/security/sec-func-descr.service';
import {SecFuncService} from '../../../api-services/security/sec-func.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {FunctionAccessLookup} from '../../../shared/lookup/function-access-lookup';
import {SecFuncsFieldNames, SecFuncsFormConfig} from '../../../shared/models/constants';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {CONSTANTS, getFunctionAccessShortcutKeys} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {UsersComponent} from '../users/users.component';
import {WindowsAccessComponent} from '../windows-access/windows-access.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {CopyFunctionAccessComponent} from '../copy-function-access/copy-function-access.component';
import {AuditService} from "../../../shared/services/audit.service";
import {Router} from "@angular/router";
import {HelpComponent} from "../../member/help/help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {SecurityHelpComponent} from "../security-help/security-help.component";

@Component({
    selector: 'app-function-access',
    templateUrl: './function-access.component.html',
    styleUrls: ['./function-access.component.css']
})
export class FunctionAccessComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() userId: string

    functionAccessForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'SFUNC';
    public isSuperUser = false;
    public secProgress = true;
    public shortcuts: ShortcutInput[] = [];
    public addNewDataRowConfig: Array<FormRow>;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    secFuncs: SecFunc[] = [];
    secFuncsFormConfig = SecFuncsFormConfig;
    searchStatus = false;
    keyNames = '';
    keyValues: any;
    @Input() winID?: string;

    // Use constructor injection to inject an instance of a FormBuilder
    searchModel = new SearchModel('secusers/lookup', FunctionAccessLookup.FUNCTION_ACCESS_ALL,
        FunctionAccessLookup.FUNCTION_ACCESS_DEFAULT, []);

    secFuncsState: Array<FormRow> = [];
    isResetForm: boolean = false;
    secFuncDescrs: SecFuncDescr[];
    systemCodeToken: SystemCodeToken;
    secUserId: string;
    secUser: SecUser;
    @Input() showIcon: boolean = false;
    public menu: Menu[] = [];
    screenCloseRequested: Boolean = false;
    isFormModifiedStatus: Boolean = false;
    functionAccessData: SecUser;
    openScreenStatus: boolean = false;
    menuOpened = "";
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private secUserService: SecUserService,
        private secFuncService: SecFuncService,
        private systemCodeTokenService: SystemCodeTokenService,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private messageService: MessageMasterDtlService,
        private secFuncDescrService: SecFuncDescrService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private auditService: AuditService,
        private router: Router,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.functionAccessForm);
        this.createDataGrid();
        this.getSecFunsDecr();
        this.menuInit();
        if (this.userId) {
            this.secUserService.getSecUser(this.userId).subscribe((secUser: SecUser) => {
                    this.secUser = secUser;
                    this.getSecFuncByUser(secUser);
                    this.setFunctionAccessValues(secUser);
                },
                (error) => {
                    let popMsg = new PopUpMessage('groupNotExistPopup', 'Users Security', '11090: The User ID entered does not exists. Press yes to create a new User ID.', 'icon');
                });
        }
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


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Function",
                field: "funcid",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Access",
                field: "",
                width: 200
            },
            {
                headerName: "Ins Dt",
                field: "insdt",
                width: 200
            }
        ];
    }



    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.functionAccessForm = this.formBuilder.group({
            userId: ['', {updateOn: 'blur', validators: []}],
            name: ['', {updateOn: 'blur', validators: []}],
            userType: ['', {updateOn: 'blur', validators: []}],
            department: ['', {updateOn: 'blur', validators: []}],
            location: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getFunctionAccessShortcutKeys(this));
        this.cdr.detectChanges();
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    openLookupFieldSearchModel() {
        this.secUser = new SecUser();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.secUser = resp;
                this.setFunctionAccessValues(resp);
                this.getSecFuncByUser(resp);
            }
        });
    }

    setFunctionAccessValues(secUser: SecUser) {
        if (secUser.lname && secUser.fname) {
            this.functionAccessForm.patchValue({
                name: secUser.fname + ' ' + secUser.lname,
            });
        }
        else if (secUser.lname) {
            this.functionAccessForm.patchValue({
                name: secUser.lname,
            });
        }
        else if (secUser.fname) {
            this.functionAccessForm.patchValue({
                name: secUser.fname,
            });
        }
        this.functionAccessForm.get('userId').disable();
        this.functionAccessData = secUser;
        this.functionAccessForm.patchValue({
            'userId': secUser.userId,
            'department': secUser.curUsrDept,
            'location': secUser.usrLocation
        }, {emitEvent: false});
        this.isFormDataModified();
        this.setUserType(secUser.userType);
    }

    setUserType(userType: any) {
        this.systemCodeToken = new SystemCodeToken();
        this.systemCodeTokenService.getSystemCToken(userType).subscribe(
            (systemCodeToken) => {
                this.systemCodeToken = systemCodeToken;
                this.functionAccessForm.patchValue({
                    'userType': this.systemCodeToken.systemCodeDesc1
                }, {emitEvent: false});
            });
    }


    getSecFuncByUser(secUser: SecUser) {
        this.secFuncs = [];
        this.secFuncService.findFuncByUserId(secUser.userId).subscribe(
            (secfunc) => {
                this.secFuncs = secfunc;
                this.secUserId = secUser.userId;
                this.displayDetail(this.secFuncs, secUser.userId);
                this.userId = secUser.userId;
            });
    }


    saveSecFuns(event: any, userId: any) {

        let secFuncs = new Array<SecFunc>();
        const updatedRecords: FormRow[] = this.secFuncsState.filter(record => record.action);
        if (updatedRecords.length > 0) {
            this.secFuncsState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let secFuncsDetail: SecFunc = this.populateSecFunc(pair, preStateRecord.action, userId);
                    secFuncsDetail.userId = preStateRecord.id.userId;
                    secFuncsDetail.action = preStateRecord.action;
                    secFuncsDetail.existingFunctionId = preStateRecord.id.funcId;

                    this.auditService.setAuditFields(secFuncsDetail, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);

                    secFuncs.push(secFuncsDetail);
                    this.isResetForm = false;
                }
            });
        }

        const newRecords = event.slice(this.secFuncsState.length);
        newRecords.forEach((record: { [x: string]: any; }) => {
            const pair = Object.keys(record).map(k => ({key: k, value: record[k]}));
            let secFunc : SecFunc = this.populateSecFunc(pair, FORM_FIELD_ACTION_TYPES.ADD, userId);
            this.auditService.setAuditFields(secFunc, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);

            secFuncs.push(secFunc);
        });

        // Add / Update API Call

        if (secFuncs !== null) {
            if (secFuncs.length > 0) {
                this.secFuncService.addUpdateSecFunsDetail(secFuncs).subscribe(resp => {
                    this.toastService.showToast('Security functions access updated Successfully', NgbToastType.Success)
                    this.secFuncsState = [];
                    setTimeout(() => {
                        if(this.secUser ===  undefined || this.secUser === null) {
                            this.secUser = new SecUser();
                            this.secUser.userId = userId;
                        }
                        this.getSecFuncByUser(this.secUser);
                    }, 500);
                    if (this.openScreenStatus === true) {
                        this.openNewScreen();
                    }
                });
            }
        }
    }

    onAddRow(event: any, userId: any) {
        if (userId === null || userId === undefined || userId === "") {
            this.messageService.findByMessageId(11015).subscribe((message: MessageMasterDtl[]) => {
                this.showPopupAlertWithOkButton("11015: " + message[0].messageText, 'Function Access')
                event.removeRecord(0);
            });
        }
    }

    populateSecFunc(event: any, action: FORM_FIELD_ACTION_TYPES, userId: any) {
        let secFunc = new SecFunc();
        secFunc.funcId = event[0].value;
        secFunc.pExe = event[1].value;
        if (event[2].value !== "") {
            secFunc.insDt = this.getDatePickValue(event[2].value);
        }
        secFunc.userId = userId;
        return secFunc;
    }

    displayDetail(secFuncs: SecFunc[], userId: any) {
        if (secFuncs !== null) {
            secFuncs.forEach((secFuncs: SecFunc) => {
                let mockConfig = JSON.parse(JSON.stringify(this.secFuncsFormConfig));    // make a copy of original config
                this.secFuncsFormConfig.forEach((field, index) => {
                    if (field.name === SecFuncsFieldNames.FUNCID) {
                        mockConfig[index].value = secFuncs.secFuncPrimaryKey.funcId;
                    } else if (field.name === SecFuncsFieldNames.PEXE) {
                        mockConfig[index].value = secFuncs.pexe=='Y'?true: false;
                    } else if (field.name === SecFuncsFieldNames.INSDT) {
                        mockConfig[index].value = secFuncs.insDt;
                    }
                });
                let formState: FormRow = new FormRow();
                formState.formFields = mockConfig;
                formState.id = {
                    funcId: secFuncs.secFuncPrimaryKey.funcId,
                    userId: userId
                };
                this.secFuncsState.push(formState);          // add record
            })
            this.secFuncsState = JSON.parse(JSON.stringify(this.secFuncsState));
        } else {

        }
    }


    saveFunctionAccess() {
        document.getElementById('submitDynamicForm').click();
    }


    getSecFunsDecr() {
        this.secFuncDescrService.getSecFuncDescrs().subscribe(
            (secFuncDescrs) => {
                this.secFuncDescrs = secFuncDescrs;
                if (this.secFuncDescrs !== null) {
                    this.setFunctions(this.secFuncDescrs);
                }
            });
    }

    setFunctions(secFuncDescrs: SecFuncDescr[]) {
        var Options: any = [];
        this.secFuncDescrs.forEach(function (index: any) {
            Options.push({
                key:
                    index.funcId +
                    "       " +
                    index.sdescr,
                value: index.funcId,
            });
        });
        this.secFuncsFormConfig[0].options = Options;
    }

    getDatePickValue(field: any) {
        const date = field.singleDate ? field.singleDate.date : null;
        if (date) {
            return `${date.year}-${date.month}-${date.day}`;
        } else {
            return "";
        }
    }


    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{
                    name: "New", shortcutKey: "Ctrl+M",},
                    { name: "Open", shortcutKey: "Ctrl+O" },
                    {name: "Save", shortcutKey: "Ctrl+S",},
                    { name: "Close", shortcutKey: "Ctrl+F4" },
                    { isHorizontal: true },
                    { name: "Main Menu...", shortcutKey: "F2" },
                    { name: "Shortcut Menu...", shortcutKey: "F3" },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: "Alt+F4" },]
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
                    { name: "Next", shortcutKey: "F8" },
                    { name: "Previous", shortcutKey: "F7" },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Users'},
                    {name: 'Window Access'},
                    {name: 'Function Access'}
                ]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'Copy Function Access', shortcutKey: 'Ctrl+F'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                    { name: "Audit Display", shortcutKey: "Shift+Alt+A" },
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Function Access'},
                ]
            }, {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window", shortcutKey: "F1" },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" }]
            }
        ];
    }


    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewData();
                    break;
                }
                case 'Open': {
                    this.openScreen();
                    break;
                }
                case 'Save': {
                    this.saveFunctionAccess();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
                    break;
                }
                case 'Shortcut Menu': {
                    //const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    //ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            //this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);         // handle Topic-Menu Actions

        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            if (event.action === 'Copy Function Access') {
                if(this.userId !== null && this.userId !== undefined && this.userId !== "") {
                    this.openCopyWindow();
                } else {
                    this.messageService.findByMessageId(11015).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopupAlertWithOkButton("11015: "+ message[0].messageText, 'Function Access')
                    });
                }
            }
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {

                    break;
                }
                case 'Audit Display': {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.winID);
                        if ((status)) {
                            let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        }
                        else {
                            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("30164: " + message[0].messageText);
                        });
                    }

                    break;
                }
                case 'Show Timestamp' : {
                    if (this.functionAccessForm.get('userId').value === '') {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    } else {
                        if (this.secFuncs) {
                            this.showTimeStamp()
                        } else {
                            this.messageService.findByMessageId(21127).subscribe(res => {
                                this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp');
                            })
                        }
                    }
                }
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen();
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Users": {
                const ref = this.modalService.open(UsersComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.userId;
                this.activeModal.close();
                break;
            }
            case "Function Access": {
                const ref = this.modalService.open(FunctionAccessComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.userId;
                this.activeModal.close();
                break;
            }
            case "Window Access": {
                const ref = this.modalService.open(WindowsAccessComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.userId;
                this.activeModal.close();
                break;
            }
        }
    }

    onFieldFocusOut = (event) => {
        if (event === true) {
            this.isFormModifiedStatus = true;
        }
    };

    isFormDataModified = () => {
        this.functionAccessForm.valueChanges.subscribe(() => {
            this.isFormModifiedStatus = true;
        })
    };

    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.isFormModifiedStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.showPopupAlert(message[0].messageText, 'Function Access')
            });
        } else {
            this.activeModal.close();
        }
    };

    public onLookupFieldUserId(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel()
        }
        else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.userIdEmptyPopup();
            } else {
                this.secUserService.getSecUser(event.target.value).subscribe((secUser: SecUser) => {
                    if (secUser) {
                        this.secUser = secUser;
                        this.getSecFuncByUser(secUser);
                        this.setFunctionAccessValues(secUser);
                    } else {
                        this.messageService.findByMessageId(11090).subscribe(res => {
                            this.showPopUp('11090: ' + res[0].messageText, 'Function Access')
                        })
                    }
                });
            }

        }
    }

    showPopupAlertWithOkButton = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.SUCCESS);
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;

    };

    showPopupAlert = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.SUCCESS);
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                this.saveFunctionAccess();
            } else if (resp.name === 'No') {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } // 3rd case: In case of cancel do nothing
        });
    };

    userIdEmptyPopup = () => {
        this.messageService.findByMessageId(11090).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('popUpMessageName', 'Function Access', "11090: " + message[0].messageText, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe(() => {

            });
        });
    };

    createNewData = () => {
        if (this.functionAccessForm.get('userId').value === '') {
            this.createNew();
        }
    };

    createNew = () => {
        this.messageService.findByMessageId(11015).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('popUpMessageName', 'Function Access', "11015: " + message[0].messageText, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe(() => {

            });
        });
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Function Access";
        ref.componentInstance.insertDateTime = this.secFuncs[this.currentRowSelected].insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.secFuncs[this.currentRowSelected].insertProcess;
        ref.componentInstance.insertUser = this.secFuncs[this.currentRowSelected].insertUser;
        ref.componentInstance.updateUser = this.secFuncs[this.currentRowSelected].updateUser;
        ref.componentInstance.updateDateTime = this.secFuncs[this.currentRowSelected].updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.secFuncs[this.currentRowSelected].updateProcess;
    };

    currentRowSelected = 0;
    /**
     *   data
     index;
     field;
     * @param $event
     */
    rowClicked($event) {
        this.currentRowSelected = $event.index;
    }

    openCopyWindow = () => {
        let ref = this.modalService.open(CopyFunctionAccessComponent);
        ref.componentInstance.onRowSelected.subscribe((resp: SecFunc[]) => {
            if (resp != null && resp.length > 0) {
                const rowsToAdd = resp.filter(x => this.secFuncsState.findIndex(z => z.id.funcId == x.secFuncPrimaryKey.funcId) == -1);
                let formRowArr:Array<FormRow>;
                formRowArr = [];
                rowsToAdd.forEach((control) => {
                    let mockConfig = JSON.parse(JSON.stringify(this.secFuncsFormConfig));    // make a copy of original config
                    this.secFuncsFormConfig.forEach((field, index) => {
                        if (field.name === SecFuncsFieldNames.FUNCID) {
                            mockConfig[index].value = control.secFuncPrimaryKey.funcId;
                        } else if (field.name === SecFuncsFieldNames.PEXE) {
                            mockConfig[index].value = control.pexe == 'Y' ? true : false;
                        } else if (field.name === SecFuncsFieldNames.INSDT) {
                            mockConfig[index].value = control.insDt;
                        }
                    });
                    let formState: FormRow = new FormRow();
                    formState.formFields = mockConfig;
                    formState.id = {
                        funcId: resp[0].secFuncPrimaryKey.funcId,
                        userId: this.userId
                    };
                    formRowArr.push(formState);
                });
                this.addNewDataRowConfig = formRowArr;
                this.cdr.detectChanges();
                this.addNewDataRowConfig = [];
            }
        });
    };

    openNewScreen = () => {
        this.functionAccessForm.reset();
        this.functionAccessForm.get('userId').enable();
        this.isResetForm = true;
    }

    openScreen() {
        this.openScreenStatus = true;
        if (this.isFormModifiedStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Function Access', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveFunctionAccess();
                        }

                        else if (resp.name === 'No') {
                            this.openNewScreen()
                        }
                    })
                }
                catch (e) {
                    console.log(e);
                }
            })

        } else {
            this.openNewScreen()
        }
    };

    exitScreen = () => {
        this.messageService.findByMessageId(29062).subscribe(res => {
            let popMsg = new PopUpMessage(
                'poUpMessageName',
                'DIAMOND @ Client/Server System',
                res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
                'icon');
            popMsg.buttons = [
                new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
                new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    triggerMenus(value) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownFile") {
                switch (value) {
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'New'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Open'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Save'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Close'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Exit'
                        }
                        this.onMenuItemClick(obj)
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Users'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Window Access'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'n':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Function Access'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'f':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Copy Function Access'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownWindow") {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Audit Display'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == 'fileDropdownHelp') {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Contents'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Search for Help on...'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'This Window'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Glossary'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Getting Started'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'h':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'How to use Help'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'About Diamond Client/Server'
                        }
                        this.onMenuItemClick(obj);
                        break;
                }
            }
        }
    };

    helpScreen = () => {
        const modalRef = this.modalService.open(SecurityHelpComponent, {windowClass: "myCustomModalClass"});
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'SFUNC_Function_Security.htm';
    };
}
