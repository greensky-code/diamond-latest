/* Copyright (c) 2021 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

// Use the Component directive to define the WindowDescriptionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from 'ag-grid-community';
import {SecUser, SecWin, SecWinDescr} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {MessageMasterDtlService, SecWinDescrService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Menu} from '../../../shared/models/models';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {NgbToastType} from 'ngb-toast';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {getWindowDescriptionShortcutKeys} from "../../../shared/services/shared.service";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {FunctionDescriptionComponent} from "../function-description/function-description.component";
import {SecurityHelpComponent} from "../security-help/security-help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {Router} from "@angular/router";
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'windowdescription',
    templateUrl: './window-description.component.html',
    styleUrls: ['./window-description.component.scss']
})
export class WindowDescriptionComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    windowDescriptionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'SWNDS';
    public isSuperUser = false;
    public secProgress = true;

    editSecWinDescr: boolean;
    secWinDescr: SecWinDescr;
    secWinDescrs: SecWinDescr[];
    windowDescription: any;
    pressedKey: any[] = [];

    @Input() menuActiveIndex;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    public menu: Menu[] = [];

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    menuOpened = "";
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private secWinDescrService: SecWinDescrService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.getSecWinDescrs();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.windowDescriptionForm);
        this.createDataGrid();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getWindowDescriptionShortcutKeys(this));
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

    createSecWinDescr() {
        this.formValidation.validateForm();
        if (this.windowDescriptionForm.valid) {
            let secWinDescr = new SecWinDescr();
            this.secWinDescrService.createSecWinDescr(secWinDescr).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editSecWinDescr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {

        }
        this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }


    updateSecWinDescr(languageId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.windowDescriptionForm.valid) {
                let secWinDescr = new SecWinDescr();
                this.secWinDescrService.updateSecWinDescr(secWinDescr, languageId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editSecWinDescr = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveSecWinDescr() {
        if (this.editSecWinDescr) {
            // this.updateSecWinDescr(this.secWinDescr.languageId)
        } else {
            this.createSecWinDescr();
        }
    }

    deleteSecWinDescr(languageId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.secWinDescrService.deleteSecWinDescr(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getSecWinDescr(languageId: number) {
        this.secWinDescrService.getSecWinDescr(languageId).subscribe(secWinDescr => {
            this.secWinDescr = secWinDescr;
            this.windowDescriptionForm.patchValue({});
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getSecWinDescrs() {
        this.secWinDescrService.getSecWinDescrs().subscribe(secWinDescrs => {
            this.secWinDescrs = secWinDescrs;
            let secWinDescrsVal: any = secWinDescrs;
            secWinDescrsVal.forEach(element => {
                element['winId'] = element ? element['secWinDescrPrimaryKey'] ? element['secWinDescrPrimaryKey']['winId'] : '' : '';
            });
            secWinDescrsVal.sort((a, b) => {
                if (a.secWinDescrPrimaryKey.winId > b.secWinDescrPrimaryKey.winId) {return 1;}
                else if (a.secWinDescrPrimaryKey.winId < b.secWinDescrPrimaryKey.winId) {return -1}
                else {return 0}
            })
            this.dataGridGridOptions.api.setRowData(secWinDescrsVal);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
            this.windowDescriptionForm.patchValue({
                totalCount: this.secWinDescrs.length
            })
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
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
                headerName: "Window",
                field: "winId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                headerClass: "required-field-label"
            },
            {
                headerName: "Short Description",
                field: "sdescr",
                width: 200
            },
            {
                headerName: "Long Description",
                field: "ldescr",
                width: 200
            }
        ];
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
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
            this.showPopUp(error, 'Window Error')
        });
    }

    /**
     * Get Security Column Details
     */
    private getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            return;
        }
        this.dataLoadedMap.set('BATCHSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.batchTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('BATCHSECCOL', false);
            this.batchSecColDetails = resp;
            this.batchSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.dataLoadedMap.set('RECEIPTSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.receiptTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('RECEIPTSECCOL', false);
            this.receiptSecColDetails = resp;
            this.receiptSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createRecord();
                    break;
                }
                case 'Open': {
                    this.openRecord()
                    break;
                }
                case 'Save': {
                    this.saveSecFuncDescr();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Shortcut Menu': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
        } else if (event.menu.menuItem === "Window") {
            switch (event.action) {
                case "Show Timestamp":
                    this.showTimeStamp();
                    break;
                default:
                    break;
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen();
        }
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.windowDescriptionForm);
        this.createDataGrid();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl + N'},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Save', shortcutKey: 'Ctrl + S'},
                    {name: 'Close', shortcutKey: 'Ctrl + F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {name: 'Exit', shortcutKey: 'Alt + F4'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z'},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl + X'},
                    {name: 'Copy', shortcutKey: 'Ctrl + C'},
                    {name: 'Paste', shortcutKey: 'Ctrl + V'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Windows'},
                    {name: 'Functions'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Windows Description'}
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
        switch (action) {
            case "Functions": {
                const ref = this.modalService.open(FunctionDescriptionComponent, {
                    size: <any>"xl",
                });
                ref.componentInstance.showIcon = true;
                this.activeModal.close()
                break;
            }
            case "Windows": {
                const ref = this.modalService.open(WindowDescriptionComponent, {
                    size: <any>"xl",
                });
                ref.componentInstance.showIcon = true;
                this.activeModal.close()
                break;
            }
        }
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.windowDescriptionForm = this.formBuilder.group({
            totalCount: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    helpScreen() {
        const modalRef = this.modalService.open(SecurityHelpComponent, {windowClass: "myCustomModalClass"});
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'SWNDS_Window_Descriptions.htm';
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Window Description";

        ref.componentInstance.insertDateTime = this.windowDescription.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.windowDescription.insertProcess;
        ref.componentInstance.insertUser = this.windowDescription.insertUser;
        ref.componentInstance.updateUser = this.windowDescription.updateUser;
        ref.componentInstance.updateDateTime = this.windowDescription.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.windowDescription.updateProcess;
    };

    selectRow(event) {
        var selectedRow = this.dataGridGridOptions.api.getSelectedRows();
        this.windowDescription = selectedRow[0];
    }

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
                    case 'w':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Windows'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'f':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Functions'
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

    modalClose() {
        this.activeModal.close();
    }

    saveSecFuncDescr() {
        this.toastService.showToast('Action is not implemented', NgbToastType.Danger)
    }

    createRecord() {
        this.toastService.showToast('Action is not implemented', NgbToastType.Danger)
    }

    openRecord() {
        this.toastService.showToast('Action is not implemented', NgbToastType.Danger)
    }
}
