/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { MessageMasterDtl, SecWin, SystemCodeToken } from "../../../api-models/index"
import { SystemCodeTokenService } from "../../../api-services/system-code-token.service"
import { SystemCodes } from "../../../api-models/index"
import { SystemCodesService } from "../../../api-services/system-codes.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { Menu } from '../../../shared/models/models';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { MessageMasterDtlService } from '../../../api-services';
import { SystemCodesMaintenanceSpecialComponent } from '../system-codes-maintenance-special/system-codes-maintenance-special.component';

// Use the Component directive to define the SystemCodesMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'system-codes-maintenance',
    templateUrl: './system-codes-maintenance.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        SystemCodesService,
        SystemCodeTokenService,
        LanguageMasterService,
    ],
})
export class SystemCodesMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public systemCodesMaintenanceForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'CODES';
    public isSuperUser = false;
    public secProgress = true;
    public editSystemCodeToken: boolean;
    public systemCodeToken: SystemCodeToken;
    public systemCodeTokens: SystemCodeToken[]; editSystemCodes: boolean;
    public systemCodes: SystemCodes;
    public systemCodeses: SystemCodes[];
    @Input() showIcon: boolean = false;
    public menu: Menu[] = [];
    public actionNo: number = 1;
    public langID: number;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        public activeModal: NgbActiveModal,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private router: Router,
        private toastService: ToastService,
        private languageMasterService: LanguageMasterService,
        private systemCodeTokenService: SystemCodeTokenService,
        private systemCodesService: SystemCodesService) {
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

    createSystemCodeToken() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.systemCodesMaintenanceForm.valid) {
                let systemCodeToken = new SystemCodeToken();
                systemCodeToken.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodeToken.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                systemCodeToken.languageId = Form.getValue(this.systemCodesMaintenanceForm, 'language');
                this.systemCodeTokenService.createSystemCodeToken(systemCodeToken).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSystemCodeToken = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {

        }
    }

    updateSystemCodeToken(systemCode: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.systemCodesMaintenanceForm.valid) {
                let systemCodeToken = new SystemCodeToken();
                systemCodeToken.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodeToken.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                systemCodeToken.languageId = Form.getValue(this.systemCodesMaintenanceForm, 'language');
                this.systemCodeTokenService.updateSystemCodeToken(systemCodeToken, systemCode).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editSystemCodeToken = false;
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

    saveSystemCodeToken() {
        if (this.editSystemCodeToken) {
            this.updateSystemCodeToken(this.systemCodeToken.systemCode)
        } else {
            this.createSystemCodeToken();
        }
    }

    deleteSystemCodeToken(systemCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemCodeTokenService.deleteSystemCodeToken(systemCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getSystemCodeToken(systemCode: string) {
        this.systemCodeTokenService.getSystemCodeToken(systemCode).subscribe(systemCodeToken => {
            this.setSystemCodeTokenForm(systemCodeToken);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    setSystemCodeTokenForm(systemCodeToken: SystemCodeToken) {
        this.systemCodeToken = systemCodeToken;
        this.systemCodesMaintenanceForm.patchValue({
            'systemCodeType': this.systemCodeToken.systemCodeType,
            'systemCode': this.systemCodeToken.systemCode,
            'language': this.systemCodeToken.languageId,
        });
    }

    getSystemCodeTokens() {
        this.systemCodeTokenService.getSystemCodeTokens().subscribe(systemCodeTokens => {
            this.systemCodeTokens = systemCodeTokens;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    createSystemCodes() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.systemCodesMaintenanceForm.valid) {
                let systemCodes = new SystemCodes();
                systemCodes.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodes.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                this.systemCodesService.createSystemCodes(systemCodes).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSystemCodes = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {

        }
    }

    updateSystemCodes(systemCodeType: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.systemCodesMaintenanceForm.valid) {
                let systemCodes = new SystemCodes();
                systemCodes.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodes.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                this.systemCodesService.updateSystemCodes(systemCodes, systemCodeType).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editSystemCodes = false;
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

    saveSystemCodes() {
        if (this.editSystemCodes) {
            this.updateSystemCodes(this.systemCodes.systemCodeType)
        } else {
            this.createSystemCodes();
        }
    }

    deleteSystemCodes(systemCodeType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemCodesService.deleteSystemCodes(systemCodeType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getSystemCodes(systemCodeType: string) {
        this.systemCodesService.getSystemCodes(systemCodeType).subscribe(systemCodes => {
            this.systemCodes = systemCodes;
            this.systemCodesMaintenanceForm.patchValue({
                'systemCodeType': this.systemCodes.systemCodeType,
                'systemCode': this.systemCodes.systemCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getAllSystemCodesesByLangId() {
        this.langID = 0;
        this.systemCodesService.getSystemCodesByLang(this.langID).subscribe(systemCodeses => {
            this.systemCodeses = systemCodeses;
            this.dataGridgridApi.setRowData(this.systemCodeses);
            this.dataGridgridApi.selectIndex(0, false, false);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    onGridReady(eve: any) {
        this.dataGridgridApi = eve.api;
    }

    setActionStatus(actionNo: number) {
        this.actionNo = actionNo;
    }

    grid1SelectionChange() {
        let systemCode = new SystemCodes();
        var selectedRows = this.dataGridgridApi.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            systemCode = selectedRows[0];
            this.setSystemCodeForm(systemCode);
        } else {
            this.setSystemCodeForm(systemCode);
        }
    }

    setSystemCodeForm(systemCode: SystemCodes) {
        this.systemCodes = systemCode;
        this.languageMasterService.getLanguageMasterByLanguageId(this.langID).subscribe(languageMasters => {
            this.systemCodesMaintenanceForm.patchValue({
                'systemCodeType': this.systemCodes.systemCodesPrimaryKey.systemCodeType,
                'systemCode': this.systemCodes.systemCodesPrimaryKey.systemCode,
                'language': languageMasters.description,
                'activated': this.systemCodes.systemCodeActive == 'Y',
                'shortDescription': this.systemCodes.systemCodeDesc1,
                'longDescription': this.systemCodes.systemCodeDesc2,
            });
        });
    }

    dataGridGridOptionsExportCsv() {
        var params = {
        };
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
                headerName: "Sys Code Type",
                field: "systemCodesPrimaryKey.systemCodeType",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Sys Code",
                field: "systemCodesPrimaryKey.systemCode",
                width: 200
            },
            {
                headerName: "Short Description",
                field: "systemCodeDesc1",
                width: 200
            },
            {
                headerName: "Long Description",
                field: "systemCodeDesc2",
                width: 200
            },
            {
                headerName: "Modify",
                field: "systemCodeUpd",
                width: 200
            },
            {
                headerName: "Activated",
                field: "systemCodeActive",
                width: 200,
            }
        ];
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.getAllSystemCodesesByLangId();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.systemCodesMaintenanceForm);
        this.createDataGrid();
        this.menuInit();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New" },
                    { name: "Open" },
                    { name: "Save" },
                    { name: "Close" },
                    { name: "-" },
                    { name: "Main Menu..." },
                    { name: "Shortcut Menu..." },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit" },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", disabled: true },
                    { name: "Copy", disabled: true },
                    { name: "Paste", disabled: true },
                    { isHorizontal: true },
                    { name: "Lookup" },
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    { name: "Language" },
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [
                    { name: "Notes", shortcutKey: 'F4', disabled: true },
                ],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Tile" },
                    { name: "Layer" },
                    { name: "Cascade" },
                    { name: "Arrange Icons" },
                    { isHorizontal: true },
                    { name: "Show Timestamp" },
                    { name: "Audit Display" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Vendor Master" },
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window" },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" },
                ],
            },
        ];
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.resetAll();
                    break;
                }
                case "Open": {
                    this.resetAll();
                    break;
                }
                case "Save": {
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
            //this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
            }
        } else if (event.menu.menuItem === "Special") {
            this.openSpecialPopUp(event.action)
        } else if (event.menu.menuItem === "Notes") {
            this.openSpecialPopUp(event.action)
        }
    }
    openSpecialPopUp(action: any) {
        console.log(this.langID);

        let ref = this.modalService.open(SystemCodesMaintenanceSpecialComponent);
        ref.componentInstance.showIcon = true;
    }

    resetAll() {
        this.systemCodesMaintenanceForm.reset();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    /*hasPermission() {
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
    }*/

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
        this.formValidation = new FormValidation(this.systemCodesMaintenanceForm);
        this.createDataGrid();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.systemCodesMaintenanceForm = this.formBuilder.group({
            systemCodeType: ['', { updateOn: 'blur', validators: [] }],
            systemCode: ['', { updateOn: 'blur', validators: [] }],
            activated: ['', { updateOn: 'blur', validators: [] }],
            language: ['', { updateOn: 'blur', validators: [] }],
            shortDescription: ['', { updateOn: 'blur', validators: [] }],
            longDescription: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
