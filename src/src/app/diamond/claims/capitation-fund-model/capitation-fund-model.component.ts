/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {Menu} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {CAPITATION_FUND_MODEL_MODULE_ID} from '../../../shared/app-constants';
import {CapFundHdrService} from '../../../api-services/common/cap-fund-hdr.service';
import {DEFAULT_LANGUAGE} from '../../../shared/models/constants';
import {CONSTANTS, getCapitationFundModelShortcutKeys} from '../../../shared/services/shared.service';
import {CapFundDtlService} from '../../../api-services/common/cap-fund-dtl.service';
import {CapFundHdr} from '../../../api-models/common/cap-fund-hdr.model';
import {CapFundDtl} from '../../../api-models/common/cap-fund-dtl.model';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the CapitationFundModelComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'capitationfundmodel',
    templateUrl: './capitation-fund-model.component.html',

})
export class CapitationFundModelComponent implements OnInit, AfterViewInit  {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    capitationFundModelForm: FormGroup;
    capitationFundModelDetailForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: 'CFMOD';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    claimTypes: any[] = [];
    allocationMethods: any[] = [];
    memberModuleId = CAPITATION_FUND_MODEL_MODULE_ID;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    closeStatus: Boolean = false;
    isModalIdReadonly: Boolean = false;
    showSubModelDetails: Boolean = true;
    editCapitationHdr: Boolean;
    editCapitationHdrDetail: Boolean;
    modelId: any;
    subModuleid: any;
    gridSelectionStatus: String = '001';
    popupClose: Boolean = false;
    private cdr: ChangeDetectorRef;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

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
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private capFundHdrService: CapFundHdrService,
        private capFundDtlService: CapFundDtlService,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCapitationFundModelShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.capitationFundModelForm);
        this.createDataGrid();
        this.createDataGrid002();
        this.getAllCapFundHdr();
        this.getClaimTypes();
        this.menuInit();
        this.getAllocationMethods();
    }

    getClaimTypes() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.claimTypes = systemCodes;
        });
    }

    getAllocationMethods() {
        this.dddwDtlService.findByColumnNameAndDwname('allocation_method', 'dw_cfmod_header_de').subscribe(
            (value) => {
                this.allocationMethods = value;
            }
        );
    }

    getAllCapFundHdr() {
        this.capFundHdrService.getCapFundHdrs().subscribe(
            (result) => {
                if (result) {
                    this.dataGridGridOptions.api.setRowData(result);
                    if (result.length > 0) {
                        this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
                    }
                } else {
                    this.toastService.showToast('Capitation Fund Not Found', NgbToastType.Danger);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    changeActionStatus(action: string) {
        this.gridSelectionStatus = action;
    }

    onRowSelectedGrid(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.loadDataGridForm001(event.data);
        this.isModalIdReadonly = true;
        this.modelId = event.data.capFundModelId;

        this.dataGrid002GridOptions.api.setRowData([]);
        this.capFundDtlService.getCapFundDtl(event.data.capFundModelId)
            .subscribe(value => {
                if (value) {
                    this.editCapitationHdrDetail = true;
                    this.dataGrid002GridOptions.api.setRowData(value);
                    this.dataGrid002GridOptions.api.selectIndex(0, false, null);
                } else {
                    this.editCapitationHdrDetail = false;
                }
            });
    }

    onRowSelectedGrid002(event: any) {
        if (!event.node.selected) {
            this.editCapitationHdrDetail = false;
            return;
        }
        this.subModuleid = event.data.capFundDtlPrimaryKey.capFundSubModelId
        this.loadDataGridForm002(event.data);
        this.editCapitationHdrDetail = true;
    }

    loadDataGridForm001(eventData: any) {
        this.capitationFundModelForm.patchValue({
            modelId: eventData.capFundModelId,
            claimType:  eventData.claimType,
            modelDescription:  eventData.capFundModelDesc,
            allocationMethod:  eventData.allocationMethod,
            minAllocation:  eventData.minAllocationPct,
            maxAllocation: eventData.maxAllocationPct
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidateStatus();
        }, 2000)
    }

    loadDataGridForm002(eventData: any) {
        this.capitationFundModelDetailForm.patchValue({
            subModelId002: eventData.capFundDtlPrimaryKey.capFundSubModelId,
            description002:  eventData.capFundModelDesc,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidateStatus()
        }, 2000)
    }

    createDataGrid(): void {
      this.dataGridGridOptions = {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: 'Model Id',
             field: 'capFundModelId',
             width: 300,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Claim Type',
             field: 'claimType',
             width: 300,
             cellRenderer: (params) => {
                 if (params.data !== undefined) {
                     const claimType = this.claimTypes.find(m => m.systemCode === params.data.claimType);
                     return claimType ? claimType.systemCodeDesc2 : ''
                 }
             }
         },
         {
             headerName: 'Model Description',
             field: 'capFundModelDesc',
             width: 300         }
      ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Sub Model Id',
                field: 'capFundDtlPrimaryKey.capFundSubModelId',
                width: 300,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Description',
                field: 'capFundModelDesc',
                width: 300         }
        ];
    }

    createCapitationHdr() {
        this.formValidation.validateForm();
        if (this.capitationFundModelForm.valid) {
            let capFundHdr = new CapFundHdr();
            capFundHdr.capFundModelId = this.capitationFundModelForm.get('modelId').value;
            capFundHdr.claimType = this.capitationFundModelForm.get('claimType').value;
            capFundHdr.capFundModelDesc = this.capitationFundModelForm.get('modelDescription').value;
            capFundHdr.allocationMethod = this.capitationFundModelForm.get('allocationMethod').value;
            capFundHdr.minAllocationPct = this.capitationFundModelForm.get('minAllocation').value;
            capFundHdr.maxAllocationPct = this.capitationFundModelForm.get('maxAllocation').value;
            this.capFundHdrService.createCapFundHdr(capFundHdr).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.getAllCapFundHdr();
                this.showSubModelDetails = true;
               this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateCapitationHdr(modelId: any) {
        this.formValidation.validateForm();
        if (this.capitationFundModelForm.valid) {
            let capFundHdr = new CapFundHdr();
            capFundHdr.capFundModelId = this.capitationFundModelForm.get('modelId').value;
            capFundHdr.claimType = this.capitationFundModelForm.get('claimType').value;
            capFundHdr.capFundModelDesc = this.capitationFundModelForm.get('modelDescription').value;
            capFundHdr.allocationMethod = this.capitationFundModelForm.get('allocationMethod').value;
            capFundHdr.minAllocationPct = this.capitationFundModelForm.get('minAllocation').value;
            capFundHdr.maxAllocationPct = this.capitationFundModelForm.get('maxAllocation').value;
            this.capFundHdrService.updateCapFundHdr(capFundHdr, modelId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.getAllCapFundHdr();
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    createCapitationDtl() {
        this.formValidation.validateForm();
        if (this.capitationFundModelDetailForm.valid) {
            let capFundDtl = new CapFundDtl();
            capFundDtl.capFundDtlPrimaryKey = {
                capFundSubModelId: this.capitationFundModelDetailForm.get('subModelId002').value,
                capFundModelId: this.modelId
            };
            capFundDtl.capFundModelDesc = this.capitationFundModelDetailForm.get('description002').value;
            this.capFundDtlService.createCapFundDtl(capFundDtl).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                // this.editIncentiveRule = true;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.getAllCapFundHdr();
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateCapitationDtl(capFundModelId: string) {
        this.formValidation.validateForm();
        if (this.capitationFundModelDetailForm.valid) {
            let capFundDtl = new CapFundDtl();
            capFundDtl.capFundDtlPrimaryKey = {
                capFundSubModelId: this.capitationFundModelDetailForm.get('subModelId002').value,
                capFundModelId: this.modelId
            };
            capFundDtl.capFundModelDesc = this.capitationFundModelDetailForm.get('description002').value;
            this.capFundDtlService.updateCapFundDtl(capFundDtl, this.subModuleid, capFundModelId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.getAllCapFundHdr();
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveCapitationFundModel() {
        if (this.gridSelectionStatus === '001') {
            if (this.editCapitationHdr) {
                this.updateCapitationHdr(this.modelId);
            } else {
                this.createCapitationHdr();
            }
        }
        if (this.gridSelectionStatus === '002') {
            if (this.editCapitationHdrDetail) {
                this.updateCapitationDtl(this.modelId);
            } else {
                this.createCapitationDtl();
            }
        }
    }

    newFormCreation() {
        if (this.gridSelectionStatus === '001') {
            this.dataGridGridOptions.api.deselectAll();
            this.editCapitationHdr = false;
            this.capitationFundModelForm.reset();
            this.showSubModelDetails = false;
            this.isModalIdReadonly = false;
        } else if (this.gridSelectionStatus === '002') {
            this.editCapitationHdrDetail = false;
            this.dataGrid002GridOptions.api.deselectAll();
            this.showSubModelDetails = true;
            this.resetFormGrid2();
        } else {
            this.dataGridGridOptions.api.deselectAll();
            this.editCapitationHdr = false;
            this.capitationFundModelForm.reset();
            this.showSubModelDetails = false;
            this.isModalIdReadonly = false;
        }
    }

    resetFormGrid2() {
        this.capitationFundModelForm.patchValue({
            'subModelId002': null,
            'description002': null
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Capitation Fund Model')
            });
        } else {
            this.activeModal.close()
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
                    if (this.gridSelectionStatus === '001') {
                        if (this.editCapitationHdr) {
                            this.updateCapitationHdr(this.modelId);
                        } else {
                            this.createCapitationHdr();
                        }
                    }
                } else if (resp.name === 'No') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.capitationFundModelForm = this.formBuilder.group({
            modelId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            claimType: ['', {updateOn: 'blur', validators: [Validators.required] }],
            modelDescription: ['', {updateOn: 'blur', validators: [] }],
            allocationMethod: ['', {updateOn: 'blur', validators: [Validators.required] }],
            minAllocation: ['', {updateOn: 'blur', validators: [Validators.required] }],
            maxAllocation: ['', {updateOn: 'blur', validators: [Validators.required] }]
        }, {updateOn: 'submit'});

        this.capitationFundModelDetailForm = this.formBuilder.group({
            subModelId002: ['', {updateOn: 'blur', validators: [Validators.required] }],
            description002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.newFormCreation();
                    break;

                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                    this.saveCapitationFundModel();
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
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
        }  else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
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
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', disabled: true },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window', shortcutKey: 'F1' },
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

    private handleTopicMenu(action: string) {
        switch (action) {
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
            }
        }
    }


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

    popUpButtonHandler(button) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
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
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('CAPITATION_FUND_MODEL', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CFMOD_Capitation_Special_Fund_Model_F1_MAP.htm'
    };

    isFormValidateStatus = () => {
        this.capitationFundModelForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
