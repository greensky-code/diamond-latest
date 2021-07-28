/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, datePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    DrgGrouperPricer,
    DrgMaster,
    DrgPricerRevision,
    DrgWeight, MessageMasterDtl,
    SecUser
} from '../../../api-models/index';
import { DrgGrouperPricerService } from '../../../api-services/drg-grouper-pricer.service';
import { DrgWeightService } from '../../../api-services/drg-weight.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { Menu } from '../../../shared/models/models';
import {
    DrgMasterService,
    DrgPricerRevisionService,
    MessageMasterDtlService,
    SecUserService
} from '../../../api-services';
import { PricingHelpComponent } from '../pricing-help/pricing-help.component';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {MEM_MODULE_ID, PRICING_DRG_CODE_MODULE_ID} from '../../../shared/app-constants';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {
    getDrgGrouperpricerMaintenanceShortcutKeys,
    getDrgWeightMaintenanceShortcutKeys
} from "../../../shared/services/shared.service";
// Use the Component directive to define the DrgWeightsMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'drgweightsmaintenance',
    templateUrl: './drg-weights-maintenance.component.html',

})
export class DrgWeightsMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    drgWeightsMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    editDrgGrouperPricer: boolean;
    showForm = false;
    drgGrouperPricer: DrgGrouperPricer;
    drgGrouperPricers: DrgGrouperPricer[];
    drgVersions: DrgGrouperPricer[];
    revisionDescription: string;
    pricerDescription: string;
    editDrgWeight: boolean;
    drgWeight: DrgWeight;
    drgWeights: DrgWeight[];
    drgMaster: DrgMaster;
    drgPricerRevisions: DrgPricerRevision[];
    selectedPricerRevisions: DrgPricerRevision[];
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    menu: Menu[] = [];
    shortDescription = '';
    @Input() showIcon = false;

    secWin: SecWinViewModel;
    windowId = 'DRGWT';
    userTemplateId: string;
    memberModuleId = PRICING_DRG_CODE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    public shortcuts: ShortcutInput[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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


    createDrgWeight() {
        this.formValidation.validateForm();
        if (this.drgWeightsMaintenanceForm.valid) {
            let drgWeight = new DrgWeight();
            drgWeight.drgCode = Form.getValue(this.drgWeightsMaintenanceForm, 'drgCode');
            drgWeight.drgPricerId = Form.getValue(this.drgWeightsMaintenanceForm, 'drgPricerId');
            drgWeight.version = Form.getValue(this.drgWeightsMaintenanceForm, 'version');
            drgWeight.revisionLevel = Form.getValue(this.drgWeightsMaintenanceForm, 'revisionLevel');
            drgWeight.drgWeight = Form.getValue(this.drgWeightsMaintenanceForm, 'drgWeight');
            drgWeight.userDefined1 = Form.getValue(this.drgWeightsMaintenanceForm, 'userDefined');
            this.drgWeightService.createDrgWeight(drgWeight).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDrgWeight = false;
                this.fetchDrgWeghtByDrgCode(drgWeight.drgCode);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    updateDrgWeight(drgPricerId: string) {
        this.formValidation.validateForm();
        if (this.drgWeightsMaintenanceForm.valid) {
            let drgWeight = new DrgWeight();
            drgWeight.drgCode = Form.getValue(this.drgWeightsMaintenanceForm, 'drgCode');
            drgWeight.drgPricerId = Form.getValue(this.drgWeightsMaintenanceForm, 'drgPricerId');
            drgWeight.version = Form.getValue(this.drgWeightsMaintenanceForm, 'version');
            drgWeight.revisionLevel = Form.getValue(this.drgWeightsMaintenanceForm, 'revisionLevel');
            drgWeight.drgWeight = Form.getValue(this.drgWeightsMaintenanceForm, 'drgWeight');
            drgWeight.userDefined1 = Form.getValue(this.drgWeightsMaintenanceForm, 'userDefined');
            this.drgWeightService.updateDrgWeight(drgWeight, drgPricerId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editDrgWeight = false;
                this.fetchDrgWeghtByDrgCode(drgWeight.drgCode);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    } saveDrgWeight() {
    if (this.securityService.checkInsertUpdatePermissions(this.editDrgGrouperPricer, this.secWin)) {
        if (this.editDrgWeight) {
            let drgPricerId = Form.getValue(this.drgWeightsMaintenanceForm, 'drgPricerId');
            this.updateDrgWeight(drgPricerId)
        } else {
            this.createDrgWeight();
        }
    }
    } deleteDrgWeight(drgPricerId: string) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.drgWeightService.deleteDrgWeight(drgPricerId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    } getDrgWeight(drgPricerId: string) {
        this.drgWeightService.getDrgWeight(drgPricerId).subscribe(drgWeight => {
            this.drgWeight = drgWeight;
            this.drgWeightsMaintenanceForm.patchValue({
                'drgCode': this.drgWeight.drgCode,
                'drgPricerId': this.drgWeight.drgPricerId,
                'version': this.drgWeight.version,
                'revisionLevel': this.drgWeight.revisionLevel,
                'drgWeight': this.drgWeight.drgWeight,
                'userDefined': this.drgWeight.userDefined1,
            });
        });
    } getDrgWeights() {
        this.drgWeightService.getDrgWeights().subscribe(drgWeights => {
            this.drgWeights = drgWeights;
        });
    }    // Populate DRG Pricer ID Dropdown List
    getDrgGrouperPricersDrgPricerId() {
        this.drgGrouperPricerService.getDrgGrouperPricers().subscribe(drgGrouperPricers => {
            this.drgGrouperPricers = drgGrouperPricers;
        });
    }

    getDrgPricerRevisions() {
        this.drgPricerRevisionService.getDrgPricerRevisionsVersion().subscribe(drgPricerRevisions => {
            this.drgPricerRevisions = drgPricerRevisions;
        });
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'DRG Pricer ID',
                field: 'drgGrouperPricer.drgGrouperPricerId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Version',
                field: 'drgGrouperPricer.version',
                width: 200
            },
            {
                headerName: 'Revision Level',
                field: 'drgWeightPrimaryKey.revisionLevel',
                width: 200
            },
            {
                headerName: 'DRG Weight',
                field: 'drgWeight',
                width: 200
            }
        ];

        // this.dataGridGridOptions.api.setRowData([]);

    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastService: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        private drgMasterService: DrgMasterService,
        private drgPricerRevisionService: DrgPricerRevisionService,
        private drgGrouperPricerService: DrgGrouperPricerService,
        private drgWeightService: DrgWeightService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private secUserService: SecUserService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState (){
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.drgWeightsMaintenanceForm);
        this.createDataGrid();
        this.getDrgGrouperPricersDrgPricerId();
        this.menuInit();
        this.getDrgPricerRevisions();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        });
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
            this.userTemplateId = user.dfltTemplate
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
                        'You are not Permitted to view Drg Weights Maintenance',
                        'Drg Weights Maintenance Permission'
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
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('DRG_WEIGHT', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.drgWeightsMaintenanceForm = this.formBuilder.group({
            drgCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
            drgPricerId: ['', { updateOn: 'blur', validators: [Validators.required] }],
            version: ['', { updateOn: 'blur', validators: [Validators.required] }],
            revisionLevel: ['', { updateOn: 'blur', validators: [Validators.required] }],
            drgWeight: ['', { updateOn: 'blur', validators: [Validators.required] }],
            userDefined: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
                dropdownItems: [{ name: 'Undo', disabled: true }, { isHorizontal: true }, { name: 'Cut', disabled: true },
                { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true },
                { name: 'Lookup' }, { name: 'Sort by Sequence', disabled: true }, {
                    name: 'Sort by Panel ID',
                    disabled: true
                }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{ name: 'DRG Codes' }, { name: 'DRG Weights' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'DRG Code Lookup' }]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' }, { name: 'Layer' }, { name: 'Cascade' }, { name: 'Arrange Icons' },
                    { isHorizontal: true }, { name: 'Show Timestamp' }, { name: 'Audit Display' },
                    { isHorizontal: true }, { name: '1 Main Menu' },
                    { name: '2 Group Master' }
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

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.editDrgWeight = false;
                    let drgCode = Form.getValue(this.drgWeightsMaintenanceForm, 'drgCode');
                    this.drgWeightsMaintenanceForm.reset();
                    this.showForm = true;
                    this.drgWeightsMaintenanceForm.patchValue({
                        'drgCode' : drgCode
                    });
                    this.pricerDescription = '';
                    this.revisionDescription = '';
                    break;
                }
                case 'Open': {
                    // this.getDrgMaster(this.drgCodeMaintenanceForm.value.drgCode);
                    break;
                }
                case 'Save': {
                    this.saveDrgWeight();
                    break;
                }
                case 'Close': {
                    this.drgWeightsMaintenanceForm.reset();
                    break;
                }
                case 'Shortcut Menu': {
                    break;
                }
                default: {
                    // this.toastService.showToast('Action is not valid', NgbToastType.Danger);
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

    onLookupFieldChange(event) {
        event.preventDefault();
        const drgCode = event.target.value;
        this.fetchDrgWeghtByDrgCode(drgCode);
    }

    fetchDrgWeghtByDrgCode(drgCode: string) {
        this.getDrgMaster(drgCode);
        this.drgWeightService.findByDrgCode(drgCode).subscribe(drgWeights => {
            this.drgWeights = drgWeights;
            this.dataGridGridOptions.api.setRowData(this.drgWeights);
            if (this.drgWeights && this.drgWeights.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.grid1SelectionChange();
            }
        });
    }
    grid1SelectionChange() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.drgWeight = selectedRows[0];
        this.editDrgWeight = true;
        this.showForm = true;
        this.drgWeightsMaintenanceForm.patchValue({
            'drgPricerId': this.drgWeight.drgGrouperPricer.drgGrouperPricerId,
            'version': this.drgWeight.drgGrouperPricer.version,
            'revisionLevel': this.drgWeight.drgWeightPrimaryKey.revisionLevel,
            'drgWeight': this.drgWeight.drgWeight,
            'userDefined': this.drgWeight.userDefined1,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
        this.drgPricerRevisions.forEach(data => {
            if (this.drgWeight.drgGrouperPricer.drgGrouperPricerId === data.drgPricerId &&
                this.drgWeight.drgGrouperPricer.version === data.version &&
                this.drgWeight.drgWeightPrimaryKey.revisionLevel === data.revisionLevel) {
                this.pricerDescription = data.description;
                this.revisionDescription = data.revisionDescription;
            }
        });
    }

    onDrgPricerIdChange(event) {
        event.preventDefault();
        const pricerId = event.target.value;
        this.drgVersions = this.drgGrouperPricers.filter((data) => data.drgGrouperPricerId === pricerId);
        this.pricerDescription = this.drgVersions[0].description;
    }

    onVersionChange(event) {
        event.preventDefault();
        const version = event.target.value;
        const drgPricerId = Form.getValue(this.drgWeightsMaintenanceForm, 'drgPricerId');
        this.selectedPricerRevisions = this.drgPricerRevisions.filter((data) =>
            data.drgPricerId === drgPricerId && data.version === version);
    }

    onRevisionChange(event) {
        event.preventDefault();
        const revision = event.target.value;
        this.selectedPricerRevisions.forEach(data => {
            if (data.revisionLevel === revision) { this.revisionDescription = data.revisionDescription; }
        });
    }

    getDrgMaster(drgCode: string) {
        this.drgMasterService.getDrgMaster(drgCode).subscribe(drgMaster => {
            this.drgMaster = drgMaster;
            this.shortDescription = this.drgMaster.shortDescription;
        });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getDrgWeightMaintenanceShortcutKeys(this));
        this.cdr.detectChanges();
    }


    helpScreen = () => {
        const modalRef = this.modalService.open(PricingHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'DRGWT_DRG_Weights.htm'
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'DRG Weights Maintenance')
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
                    this.saveDrgWeight();
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
        this.drgWeightsMaintenanceForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
