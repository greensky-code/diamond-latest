/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from "ag-grid-community";

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DddwDtl, MessageMasterDtl, ReasonCodeMaster, VendorAddress} from '../../../api-models';
import { CovProvGroupMaster } from '../../../api-models/provider/cov-prov-group-master.model';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import {
    DddwDtlService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    VendorAddressService
} from '../../../api-services';
import { CovProvGroupMasterService } from '../../../api-services/provider/cov-prov-group-master.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from '../../../shared/helpers/form.helper';
import { CovProvGroupDetailService } from '../../../api-services/provider/cov-prov-group-detail.service';
import { CovProvGroupDetail } from '../../../api-models/provider/cov-prov-group-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecurityService } from '../../../shared/services/security.service';
import { CONSTANTS, getCoveringProviderGroups } from '../../../shared/services/shared.service';
import { AfterViewInit } from '@angular/core';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { ChangeDetectorRef } from '@angular/core';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { Menu, SearchModel } from '../../../shared/models/models';
import { ProviderMasterLookup } from '../../../shared/lookup/provider-master-lookup';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { IMySingleDateModel } from 'angular-mydatepicker';
import {HelpComponent} from "../../member/help/help.component";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";
import {VendorMaster} from "../../../api-models/vendor-master";
import {VendorMasterLookup} from "../../../shared/lookup/vendor-master-lookup";
import {VendorMasterService} from "../../../api-services/vendor-master.service";
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";

// Use the Component directive to define the CoveringProviderGroupsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'coveringprovidergroups',
    templateUrl: './covering-provider-groups.component.html',

})
export class CoveringProviderGroupsComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    @Input() showIcon = true;

    coveringProviderGroupsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    editReasonCodeMaster: boolean;
    reasonCodeMaster: ReasonCodeMaster;
    reasonCodeMasters: ReasonCodeMaster[];
    editCovProvGroupMaster: boolean;
    covProvGroupMaster: CovProvGroupMaster;
    covProvGroupMasters: CovProvGroupMaster[];
    editCovProvGroupDetail: boolean;
    covProvGroupDetail: CovProvGroupDetail;
    covProvGroupDetails: CovProvGroupDetail[];
    tempCovProvGroupDetails: CovProvGroupDetail[];
    dddwDtls: DddwDtl[] = [];
    public menu: Menu[] = [];
    saveStatus: boolean = false;
    seqCovProvGrp:any;
    isReadOnly: boolean = false;
    seqProvId:any;
    termReasnCode:any;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    private searchModel = new SearchModel(
        'provmasters/lookup2',
        ProviderMasterLookup.PROVIDER_MASTER_ALL2,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT2,
        [],
        true
    );

    vendorSearchModel = new SearchModel(
        'vendormasters/lookup',
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );
    vendorAddressStatus: boolean = true;
    vendorAddresses: VendorAddress[];
    @ViewChild('defaultAddr') defaultAddrEl: ElementRef;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private covProvGroupMasterService: CovProvGroupMasterService,
        private covProvGroupDetailService: CovProvGroupDetailService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private vendorMasterService: VendorMasterService,
        private renderer: Renderer2,
        private vendorAddressService: VendorAddressService,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        //this.initializePermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.coveringProviderGroupsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getReimbMethod();
        this.getReasonCodeMastersTermReason();
        this.getCovProvGroupMasters();
        //this.getCovProvGroupDetails();

    }


    private menuInit(): void {
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
                { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true }, { name: 'Next', disabled: false }, { name: 'Previous', disabled: false }, { isHorizontal: true },
                { name: 'Lookup' }]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' }, { name: 'Layer' }, { name: 'Cascade' }, { name: 'Arrange Icons' },
                    { isHorizontal: true }, { name: 'Show Timestamp' }, { name: 'Audit Display' }, { isHorizontal: true },
                    { name: '1 Main Menu' }, { name: '2 Covering Provider Groups' }
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


    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.newFormCretion();
                    break;
                }
                case 'Open': {

                    break;
                }
                case 'Save': {
                    this.saveFormData();
                    break;
                }
                case 'Close': {

                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions

        } else if (event.menu.menuItem === 'Windows') {
            // add method
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Covering Provider Groups')
            })
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = (message: string, title: string) => {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                this.saveFormData();
            } else if (resp.name === 'No') {

                this.activeModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCoveringProviderGroups(this));
        this.cdr.detectChanges();
    }

    saveFormData() {
        if (this.saveStatus) {
            this.createCovProvGroupDetail();
        } else {
            this.updateCovProvGroupDetail(this.covProvGroupDetail.covProvGroupDetailPrimaryKey.seqCovProvGrp);
        }
    }

    newFormCretion() {
        this.saveStatus = true;
        this.coveringProviderGroupsForm.enable();
        this.createForm();
    }


    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();

        }
    }

    private openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.seqProvId=res.SEQ_PROV_ID;
            if (res != null) {
                this.coveringProviderGroupsForm.patchValue({
                    'provId': res.PROVIDER_ID,
                    'provDescription': res.SHORT_NAME
                });



                //this.findByProviderId(res.PROVIDER_ID);
            }
        });
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

    /**
     * get CovProvGroupMasters
     */
    getCovProvGroupMasters() {
        this.covProvGroupMasterService.getCovProvGroupMasters().subscribe(covProvGroupMasters => {
            this.covProvGroupMasters = covProvGroupMasters;
            this.dataGrid001GridOptions.api.setRowData(covProvGroupMasters);
            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        });
    }

    grid1SelectionChange() {
        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.seqCovProvGrp=selectedRows[0].seqCovProvGrp;
            this.getCovProvGroupDetailBySeqCovProvGrp(selectedRows[0].seqCovProvGrp);
        } else {
            this.dataGrid002GridOptions.api.setRowData([]);
        }
    }

    getCovProvGroupDetailBySeqCovProvGrp(seqCovProvGrp: any) {
        this.covProvGroupDetails = [];
        this.covProvGroupDetailService.findBySeqCovProvidervGrp(seqCovProvGrp).subscribe(covProvGroupDetails => {
            this.tempCovProvGroupDetails = [];
            this.tempCovProvGroupDetails = covProvGroupDetails;
            if (this.tempCovProvGroupDetails !== null) {
                if (this.tempCovProvGroupDetails.length > 0) {
                    this.tempCovProvGroupDetails.forEach(covProvGroupDetail => {
                        let reimbMethodValue = this.getReimbMethodValue(covProvGroupDetail.reimbMethod);
                        covProvGroupDetail.reimbMethodValue = reimbMethodValue;
                        this.covProvGroupDetails.push(covProvGroupDetail);
                        this.dataGrid002GridOptions.api.setRowData(this.covProvGroupDetails);
                        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                        this.saveStatus = false;
                    });
                } else {
                    this.dataGrid002GridOptions.api.setRowData([]);
                    this.coveringProviderGroupsForm.enable();
                    this.createForm();
                    this.saveStatus = true;
                }
            } else {
                this.dataGrid002GridOptions.api.setRowData([]);
                this.coveringProviderGroupsForm.enable();
                this.createForm();
                this.saveStatus = true;
            }

        }, error => {
            this.dataGrid002GridOptions.api.setRowData([]);
            this.coveringProviderGroupsForm.enable();
            this.createForm();
            this.saveStatus = true;
        });
    }


    /**
     * get CovProvGroupDetails
     */
    getCovProvGroupDetails() {
        this.covProvGroupDetailService.getCovProvGroupDetails().subscribe(covProvGroupDetails => {
            //this.dataGrid002GridOptions.api.setRowData(covProvGroupDetails);
            this.covProvGroupDetails = covProvGroupDetails;

        });
    }

    getReimbMethodValue(reimbMethod: string): string {
        let displayVal;
        if (this.dddwDtls.length !== null) {
            this.dddwDtls.forEach(dddwDtl => {
                if (dddwDtl.dddwDtlPrimaryKey.dataVal === reimbMethod) {
                    displayVal = dddwDtl.dddwDtlPrimaryKey.displayVal;
                }
            });
        }
        return displayVal;
    }


    onSelectionChange002($event: any) {
        var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.coveringProviderGroupsForm.reset();
            this.covProvGroupDetail = selectedRows[0];
            this.coveringProviderGroupsForm.enable();
            this.coveringProviderGroupsForm.controls['termReason'].disable();
            let vendorId;
            let reasonCode;
            if (this.covProvGroupDetail.vendorMaster) {
                vendorId = this.covProvGroupDetail.vendorMaster.vendorId;
            } else {
                vendorId = "";
            }

            this.isReadOnly = this.covProvGroupDetail.termDate === null;
            if(this.covProvGroupDetail.reasonCodeMaster){
                reasonCode=this.covProvGroupDetail.reasonCodeMaster.reasonCode;
            }else{
                reasonCode="";
            }

            if (vendorId != '') {
                this.vendorAddressStatus = false;
                this.getVendorAddressByVendorId(vendorId)
            } else {
                this.vendorAddressStatus = true;
            }
            this.coveringProviderGroupsForm.patchValue({
                'provId': this.covProvGroupDetail.provMaster.providerId,
                'reimbMethod': this.covProvGroupDetail.reimbMethod,
                'provDescription': this.covProvGroupDetail.provMaster.shortName,
                'effectivityDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.effectiveDate), //this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.termDate), //this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.termDate),
                'termReason': reasonCode,
                'defaultVendor': vendorId,
                'userDef1': this.covProvGroupDetail.userDefined1,
                'userDef2': this.covProvGroupDetail.userDefined2,
                'userDef3': this.covProvGroupDetail.userDefined3,
                'defaultVendAddr': this.covProvGroupDetail.seqDfltVendAddress,
            }, {emitEvent: false});
            setTimeout(() => {
                this.formValueChangedStatus()
            }, 2000)
        } else {
            this.coveringProviderGroupsForm.reset();
        }
        //this.coveringProviderGroupsForm.disable();
    }
    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    selectTermDate(event:any){
        let  date=this.getDate(event.singleDate);
        if (!this.isValidDate(date)){
            this.isReadOnly=true;
        }else{
            this.isReadOnly=false;
            this.coveringProviderGroupsForm.controls['termReason'].enable();
        }

    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: any) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }


    createCovProvGroupMaster() {
        this.formValidation.validateForm();
        if (this.coveringProviderGroupsForm.valid) {
            let covProvGroupMaster = new CovProvGroupMaster();
            this.covProvGroupMasterService.createCovProvGroupMaster(covProvGroupMaster).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editCovProvGroupMaster = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateCovProvGroupMaster(seqCovProvGrp: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.coveringProviderGroupsForm.valid) {
                let covProvGroupMaster = new CovProvGroupMaster();
                this.covProvGroupMasterService.updateCovProvGroupMaster(covProvGroupMaster, seqCovProvGrp).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editCovProvGroupMaster = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveCovProvGroupMaster() {
        if (this.editCovProvGroupMaster) {
            this.updateCovProvGroupMaster(this.covProvGroupMaster.seqCovProvGrp)
        } else {
            this.createCovProvGroupMaster();
        }
    }

    deleteCovProvGroupMaster(seqCovProvGrp: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.covProvGroupMasterService.deleteCovProvGroupMaster(seqCovProvGrp).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getCovProvGroupMaster(seqCovProvGrp: number) {
        this.covProvGroupMasterService.getCovProvGroupMaster(seqCovProvGrp).subscribe(covProvGroupMaster => {
            this.covProvGroupMaster = covProvGroupMaster;
            this.coveringProviderGroupsForm.patchValue({});
        });
    }


    createCovProvGroupDetail() {
        this.formValidation.validateForm();
        if (this.coveringProviderGroupsForm.valid) {
            let covProvGroupDetail = new CovProvGroupDetail();
            covProvGroupDetail.covProvGroupDetailPrimaryKey.seqProvId = this.seqProvId;
            covProvGroupDetail.covProvGroupDetailPrimaryKey.seqCovProvGrp=this.seqCovProvGrp;
            covProvGroupDetail.provMaster.shortName=Form.getValue(this.coveringProviderGroupsForm, 'provDescription');
            covProvGroupDetail.reimbMethod = Form.getValue(this.coveringProviderGroupsForm, 'reimbMethod');
            covProvGroupDetail.effectiveDate =Form.getDatePickerValue(this.coveringProviderGroupsForm, 'effectivityDate');
            covProvGroupDetail.termDate =Form.getDatePickerValue(this.coveringProviderGroupsForm, 'termDate');
            covProvGroupDetail.termReasn = Form.getValue(this.coveringProviderGroupsForm, 'termReason');
            covProvGroupDetail.seqDfltVendId = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendor');
            covProvGroupDetail.userDefined1 = Form.getValue(this.coveringProviderGroupsForm, 'userDef1');
            covProvGroupDetail.userDefined2 = Form.getValue(this.coveringProviderGroupsForm, 'userDef2');
            covProvGroupDetail.userDefined3 = Form.getValue(this.coveringProviderGroupsForm, 'userDef3');
            covProvGroupDetail.seqDfltVendAddress = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendAddr');
            this.covProvGroupDetailService.createCovProvGroupDetail(covProvGroupDetail).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editCovProvGroupDetail = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.popupClose = false;
                this.saveStatus=false;
                this.getCovProvGroupDetailBySeqCovProvGrp(this.seqCovProvGrp);
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    // popupMessageHandler(button: PopUpMessageButton) {
    //     if (button.name == 'yes') {
    //         console.log("button yes has been click!");
    //     }
    //     if (button.name == 'no') {
    //         console.log("button No has been click!");
    //     }
    // }


    updateCovProvGroupDetail(seqCovProvGrp: number) {
        // if (this.secWin && this.secWin.hasUpdatePermission())
        if (true) {
            this.formValidation.validateForm();
            if (this.coveringProviderGroupsForm.valid) {
                let covProvGroupDetail = new CovProvGroupDetail();
                covProvGroupDetail.covProvGroupDetailPrimaryKey.seqProvId = this.covProvGroupDetail.provMaster.seqProvId;
                covProvGroupDetail.provMaster.shortName=Form.getValue(this.coveringProviderGroupsForm, 'provDescription');
                covProvGroupDetail.reimbMethod = Form.getValue(this.coveringProviderGroupsForm, 'reimbMethod');
                covProvGroupDetail.effectiveDate =Form.getDatePickerValue(this.coveringProviderGroupsForm, 'effectivityDate');
                covProvGroupDetail.termDate =Form.getDatePickerValue(this.coveringProviderGroupsForm, 'termDate');
                covProvGroupDetail.termReasn = Form.getValue(this.coveringProviderGroupsForm, 'termReason');
                covProvGroupDetail.seqDfltVendId = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendor');
                covProvGroupDetail.userDefined1 = Form.getValue(this.coveringProviderGroupsForm, 'userDef1');
                covProvGroupDetail.userDefined2 = Form.getValue(this.coveringProviderGroupsForm, 'userDef2');
                covProvGroupDetail.userDefined3 = Form.getValue(this.coveringProviderGroupsForm, 'userDef3');
                covProvGroupDetail.seqDfltVendAddress = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendAddr');
               this.covProvGroupDetailService.updateCovProvGroupDetail(covProvGroupDetail, seqCovProvGrp).subscribe(response => {
                   this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editCovProvGroupDetail = false;
                    this.saveStatus=false;
                   if (this.closeStatus === true) {
                       setTimeout(() => {
                           this.activeModal.close();
                       }, 2000);
                   }
                   this.popupClose = false;
                    this.getCovProvGroupDetailBySeqCovProvGrp(this.seqCovProvGrp);
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }


    saveCovProvGroupDetail() {
        if (this.editCovProvGroupDetail) {
            this.updateCovProvGroupDetail(this.covProvGroupDetail.covProvGroupDetailPrimaryKey.seqCovProvGrp)
        } else {
            this.createCovProvGroupDetail();
        }
    }

    deleteCovProvGroupDetail(seqCovProvGrp: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.covProvGroupDetailService.deleteCovProvGroupDetail(seqCovProvGrp).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }


    getCovProvGroupDetail(seqCovProvGrp: number) {
        this.covProvGroupDetailService.getCovProvGroupDetail(seqCovProvGrp).subscribe(covProvGroupDetail => {
            this.covProvGroupDetail = covProvGroupDetail;
            this.coveringProviderGroupsForm.patchValue({
                'provId': this.covProvGroupDetail.covProvGroupDetailPrimaryKey.seqProvId,
                'reimbMethod': this.covProvGroupDetail.reimbMethod,
                'effectivityDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.termDate),
                'termReason': this.covProvGroupDetail.termReasn,
                'defaultVendor': this.covProvGroupDetail.seqDfltVendId,
                'userDef1': this.covProvGroupDetail.userDefined1,
                'defaultVendAddr': this.covProvGroupDetail.seqDfltVendAddress,
            });
        });
    }

    // Populate Term Reason Dropdown List
    getReasonCodeMastersTermReason() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('TM').subscribe(reasonCodeMasters => {
            this.reasonCodeMasters = reasonCodeMasters;
            this.coveringProviderGroupsForm.controls['termReason'].disable();
        });
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
        this.dataGrid001GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Cov Prov Group ID",
                field: "covProvGrpId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Description",
                field: "shortDescription",
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
                headerName: "Prov ID",
                field: "provMaster.providerId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Name",
                field: "provMaster.shortName",
                width: 200
            },
            {
                headerName: "Reimb. Method",
                field: "reimbMethodValue",
                width: 300
            },
            {
                headerName: "Eff Date",
                field: "effectiveDate",
                width: 200
            },
            {
                headerName: "Term Date",
                field: "termDate",
                width: 200
            }
        ];
    }

    windowId = '';

    private initializePermission(): void {
        let userId = null;
        const parsedToken = this.securityService.getCurrentUserToken();
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
        }, error => {

        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.coveringProviderGroupsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getReasonCodeMastersTermReason();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.coveringProviderGroupsForm = this.formBuilder.group({
            provId: ['', { updateOn: 'blur', validators: [] }],
            provDescription: ['', { updateOn: 'blur', validators: [] }],
            reimbMethod: ['', { updateOn: 'blur', validators: [] }],
            effectivityDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            termReason: ['', { updateOn: 'blur', validators: [] }],
            defaultVendor: ['', { updateOn: 'blur', validators: [] }],
            userDef1: ['', { updateOn: 'blur', validators: [] }],
            userDef2: ['', { updateOn: 'blur', validators: [] }],
            userDef3: ['', { updateOn: 'blur', validators: [] }],
            defaultVendAddr: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    getReimbMethod() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.REIMB_METHOD, CONSTANTS.DW_CVPVG_DE).subscribe(dddwDtls => {
            this.dddwDtls = dddwDtls;
        });
    }

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'CVPVC_Covering_Provider_Group_ID.htm';
    }

    formValueChangedStatus = () => {
        this.coveringProviderGroupsForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    };

    vendorKeyDown = (event) => {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldVendorModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                const element = this.renderer.selectRootElement('#userDef1');
                element.focus();
            } else {
                this.openTabFieldVendor(event.target.value);
            }
        }
    };

    openLookupFieldVendorModel = () => {
        let vendorMaster = new VendorMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.coveringProviderGroupsForm.patchValue({
                    defaultVendor: res.vendorId
                });
                this.getVendorAddressByVendorId(res.vendorId);
                this.vendorAddressStatus = false;
            }
        });
    };

    vendorKeyValueStatus = (event) => {
        this.vendorAddressStatus = event.target.value === '';
    };

    openTabFieldVendor = (vendorId) => {
        this.defaultAddrEl.nativeElement.focus();
        this.vendorMasterService.findVendorMasterByVendorId(vendorId).subscribe((res) => {
            this.coveringProviderGroupsForm.patchValue({
                defaultVendor: res.vendorId
            });
            this.vendorAddressStatus = false;
            this.getVendorAddressByVendorId(vendorId);

        })
    };

    private getVendorAddressByVendorId(vendorId: any) {
        vendorId = vendorId.trim();
        if (vendorId !== '') {
            this.vendorAddresses = [];
            this.vendorAddressService.findByVendorId(vendorId).subscribe((res) => {
                this.vendorAddresses = res;
                this.cdr.detectChanges();
            }, error => {
                console.log(error);
            });
        } else {
            this.messageService.findByMessageId(7539).subscribe(res => {
                this.showPopUp('7539: ' + res[0].messageText, 'Covering Provider Groups')
            })
        }

    }
}
