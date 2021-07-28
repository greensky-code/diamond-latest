/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/number.validator';
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
import {MessageMasterDtl, RegionMaster, SecWin} from "../../../api-models/index"
import { RegionMasterService } from "../../../api-services/region-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {DddwDtlService, DddwHdrService, MessageMasterDtlService} from '../../../api-services';
import {CONSTANTS, getPlanMasterShortcutKeys, getRegionShortcutKeys} from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { Menu, SearchModel } from '../../../shared/models/models';
import { RegionMasterLookup } from '../../../shared/lookup/region-master-lookup';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {SupportHelpComponent} from "../support-help/support-help.component";


// Use the Component directive to define the RegionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'region',
    templateUrl: './region.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DddwHdrService,
        DddwDtlService,
    ],

})
export class RegionComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    regionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'REGIN';
    public isSuperUser = false;
    public secProgress = true;
    public editRegionMaster: boolean;
    public regionMaster: RegionMaster;
    public regionMasters: RegionMaster[];
    public regionType: string;
    @Input() showIcon: boolean = false;
    public menu: Menu[] = [];
    public regionInfo: boolean = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    regionTypes: any[] = [];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    regionTypeStatus: Boolean = false;
    type: string;
    public shortcuts: ShortcutInput[] = [];
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        public activeModal: NgbActiveModal,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private regionMasterService: RegionMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.getRegionTypeOptions();
        this.formValidation = new FormValidation(this.regionForm);
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New", shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    { name: "Open", shortcutKey: 'Ctrl+O'},
                    { name: "Delete", shortcutKey: 'Ctrl+D', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    { name: "Save", shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    { name: "Close", shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true},
                    { name: "Main Menu..." , shortcutKey: 'F2'},
                    { name: "Shortcut Menu...", shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: 'Alt+F4' },
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
                    { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Diagnosis Code" },
                    { name: '3 Region'}
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
                    this.regionForm.reset();
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

        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            switch (event.action) {
                case "Copy": {
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

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    getRegionTypeOptions() {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId(CONSTANTS.REGION_TYPE, CONSTANTS.DW_REGION_DE, 0)
            .subscribe(
                (codes) => {
                    this.regionTypes = codes;
                }
            );
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            let rType = event.target.value;
            this.regionType = Form.getValue(this.regionForm, 'regionType001');;
            this.getRegionCodeLookUp(this.regionType);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            let rCode = event.target.value;
            let rType = this.regionForm.get("regionType001").value;
            this.getRegionMasterWithCodeAndType(rType, rCode);
        }
    }


    getRegionCodeLookUp(regionType: string) {
        let regionMaster = new RegionMaster();
        let ref = this.modalService.open(SearchboxComponent);
        let regionCodeURL = `regionmasters/lookup/${regionType}`;
        let srcModel = new SearchModel(regionCodeURL, RegionMasterLookup.REGION_MASTER_ALL, RegionMasterLookup.REGION_MASTER_DEFAULT, []);

        ref.componentInstance.searchModel = srcModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                regionMaster = resp;
                regionMaster.regionCode = resp.regionMasterPrimaryKey.regionCode;
                regionMaster.regionType = this.regionType;
                this.setRegionMasterForm(regionMaster);
            }
        });
    }

    selectOption(event: any){
        this.regionInfo = false;
        let optn = event.target.options[event.target.options.selectedIndex];
        this.regionType = optn.innerHTML;
        this.regionForm.reset();
        this.regionForm.get("regionType001").patchValue(optn.value);
    }

    setRegionMasterForm(regionMaster: RegionMaster) {
        this.regionInfo = true;
        this.regionTypes.map(item => {
            if (item['value'] === regionMaster.regionType) {
                this.type = item['key']
            }
        });
        this.regionForm.patchValue({
            'regionType002': this.type,
            'regionCode001': regionMaster.regionCode,
            'regionCode002': regionMaster.regionCode,
            'description': regionMaster.description,
        });
        this.regionForm.get('regionCode001').disable();
        this.regionForm.get('regionType002').disable();
        this.regionForm.get('regionCode002').disable()
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

    createRegionMaster() {
        this.formValidation.validateForm();
        if (this.regionForm.valid) {
            if (this.secWin.hasInsertPermission()) {
                let regionMaster = new RegionMaster();
                regionMaster.regionType = Form.getValue(this.regionForm, 'regionType001');
                regionMaster.regionCode = Form.getValue(this.regionForm, 'regionCode001');
                regionMaster.securityCode = Form.getValue(this.regionForm, 'regionCode002');
                regionMaster.description = Form.getValue(this.regionForm, 'description');
                this.regionMasterService.createRegionMaster(regionMaster).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editRegionMaster = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Not Authorized to perform the Action.");
            }
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateRegionMaster(regionType: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.regionForm.valid) {
                let regionMaster = new RegionMaster();
                regionMaster.regionType = Form.getValue(this.regionForm, 'regionType001');
                regionMaster.regionCode = Form.getValue(this.regionForm, 'regionCode001');
                regionMaster.securityCode = Form.getValue(this.regionForm, 'regionCode002');
                regionMaster.description = Form.getValue(this.regionForm, 'description');
                this.regionMasterService.updateRegionMaster(regionMaster, regionType).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editRegionMaster = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveRegionMaster() {
        if (this.editRegionMaster) {
            this.updateRegionMaster(this.regionMaster.regionType)
        } else {
            this.createRegionMaster();
        }
    }

    deleteRegionMaster(regionType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.regionMasterService.deleteRegionMaster(regionType).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getRegionMasterWithCodeAndType(regionType: string, regionCode: string) {
        this.regionMasterService.getRegionMasterWithTypeAndCode(regionType, regionCode).subscribe(regionMaster => {
            this.regionMaster = regionMaster;
            this.regionMaster.regionCode = regionMaster.regionMasterPrimaryKey.regionCode;
            this.regionMaster.regionType = this.regionType;
            this.setRegionMasterForm(this.regionMaster);
        });
    }

    getRegionMaster(regionType: string) {
        this.regionMasterService.getRegionMaster(regionType).subscribe(regionMaster => {
            this.regionMaster = regionMaster;
            this.setRegionMasterForm(this.regionMaster);
        });
    }

    getRegionMasters() {
        this.regionMasterService.getRegionMasters().subscribe(regionMasters => {
            this.regionMasters = regionMasters;
        });
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
        this.formValidation = new FormValidation(this.regionForm);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.regionForm = this.formBuilder.group({
            regionType001: ['', { updateOn: 'blur', validators: [] }],
            regionCode001: ['', { updateOn: 'blur', validators: [] }],
            regionType002: ['', { updateOn: 'blur', validators: [] }],
            regionCode002: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    changedRegionType = () => {
        this.regionTypeStatus = true;
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getRegionShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/REGIN_Pricing_Regions.htm';
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Region')
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
        this.regionForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
