/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
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
import { ConversionFactorType } from "../../../api-models/conversion-factor-type.model"
import { ConversionFactorTypeService } from "../../../api-services/conversion-factor-type.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import {MessageMasterDtl, SecWin} from '../../../api-models';
import { Menu } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    getClaimDuplicateCheckRulesShortcutKeys,
    getConversionFactorTypeComponent
} from "../../../shared/services/shared.service";
import {MessageMasterDtlService} from "../../../api-services";

// Use the Component directive to define the ConversionFactorTypeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'conversionfactortype',
    templateUrl: './conversion-factor-type.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ConversionFactorTypeService,
    ],

})
export class ConversionFactorTypeComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    conversionFactorTypeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'FACTY';
    public isSuperUser = false;
    public secProgress = true;
    public editConversionFactorType: boolean;
    public conversionFactorType: ConversionFactorType;
    public conversionFactorTypes: ConversionFactorType[];
    @Input() showIcon: boolean = false;
    public menu: Menu[] = [];
    public actionNo: number = 1;
    public shortcuts: ShortcutInput[] = [];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

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

    createConversionFactorType() {
        this.formValidation.validateForm();
        if (this.secWin.hasInsertPermission()) {
            if (this.conversionFactorTypeForm.valid) {
                let conversionFactorType = new ConversionFactorType();
                this.conversionFactorTypeService.createConversionFactorType(conversionFactorType).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editConversionFactorType = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.alertMessage = this.alertMessageService.error("Action Unauthorized");
        }
    }

    updateConversionFactorType(convFactorId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.conversionFactorTypeForm.valid) {
                let conversionFactorType = new ConversionFactorType();
                this.conversionFactorTypeService.updateConversionFactorType(conversionFactorType, convFactorId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editConversionFactorType = false;
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

    saveConversionFactorType() {
        if (this.editConversionFactorType) {
            this.updateConversionFactorType(this.conversionFactorType.convFactorId)
        } else {
            this.createConversionFactorType();
        }
    }

    deleteConversionFactorType(convFactorId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.conversionFactorTypeService.deleteConversionFactorType(convFactorId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getConversionFactorType(convFactorId: string) {
        this.conversionFactorTypeService.getConversionFactorType(convFactorId).subscribe(conversionFactorType => {
            this.setConversionFactorTypeForm(conversionFactorType)
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getConversionFactorTypes() {
        this.conversionFactorTypeService.getConversionFactorTypes().subscribe(conversionFactorTypes => {
            this.conversionFactorTypes = conversionFactorTypes;
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
        let conversionFactorType = new ConversionFactorType();
        var selectedRows = this.dataGridgridApi.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            conversionFactorType = selectedRows[0];
            this.setConversionFactorTypeForm(conversionFactorType);
        } else {
            this.setConversionFactorTypeForm(conversionFactorType);
        }
    }

    setConversionFactorTypeForm(conversionFactorType: ConversionFactorType) {
        this.conversionFactorType = conversionFactorType;
        this.conversionFactorTypeForm.patchValue({
            'convId': this.conversionFactorType.convFactorId,
            'description': this.conversionFactorType.description,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
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
                headerName: "Conv ID",
                field: "convFactorId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Description",
                field: "description",
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private router: Router,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private conversionFactorTypeService: ConversionFactorTypeService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.menuInit()
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.conversionFactorTypeForm);
        this.createDataGrid();
        this.getAllConversionFactorType();
    }

    getAllConversionFactorType() {
        this.conversionFactorTypeService.getConversionFactorTypes().subscribe(cfTypes => {
            this.conversionFactorTypes = cfTypes;
            this.dataGridgridApi.setRowData(this.conversionFactorTypes);
            this.dataGridgridApi.selectIndex(0, false, false);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New" },
                    { name: "Open" },
                    { name: "Delete" },
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
                    { name: "This Window", shortcutKey: 'F1' },
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
                    this.createForm();
                    break;
                }
                case "Open": {
                    // statements;
                    break;
                }
                case "Save": {
                    //this.saveVendorMaster();
                    break;
                }
                case "Close": {
                    this.conversionFactorTypeForm.reset();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions

        }  else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
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
        //this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.conversionFactorTypeForm);
        this.createDataGrid();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.conversionFactorTypeForm = this.formBuilder.group({
            convId: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getConversionFactorTypeComponent(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/FACTY_Conversion_Factor_Types.htm';
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Conversion Factor Type')
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
        this.conversionFactorTypeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}

