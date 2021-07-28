/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {ProvContractPrice} from '../../../api-models/prov-contract-price.model';
import {ProvContractPriceSched} from '../../../api-models/prov-contract-price-sched.model';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {ProvContractPriceService} from '../../../api-services/prov-contract-price.service';
import {ProvContractPriceSchedService} from '../../../api-services/prov-contract-price-sched.service';
import {Form} from '../../../shared/helpers/form.helper';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {DatePipe} from '@angular/common';
import {IncentiveRuleService} from '../../../api-services/incentive-rule.service';
import {ProvContractService} from '../../../api-services/prov-contract.service';
import {ProvContractSpecialtyService} from '../../../api-services/prov-contract-specialty.service';
import {ProvContractTaxonomyService} from '../../../api-services/prov-contract-taxonomy.service';
import {ProvContractVendorService} from '../../../api-services/prov-contract-vendor.service';
import {GroupContactPerson, GroupPanel, MessageMasterDtl, PremiumMaster} from '../../../api-models';
import {
    DddwDtlService,
    DrgGrouperPricerService, DrgPricerRevisionService, MessageMasterDtlService,
    ReasonCodeMasterService,
    RegionMasterService,
    SystemCodesService
} from '../../../api-services';
import {PriceRuleMasterService} from '../../../api-services/price-rule-master.service';
import {ProvContractDetRangeService} from '../../../api-services/prov-contract-det-range.service';
import {
    ContactPersonFieldNames, ProviderContractDetailsPricesValueForm, ProviderContractDetailsPricesValueFormConfig,
    ProviderContractDetailsValue,
    ProviderContractDetailsValueFormConfig
} from '../../../shared/models/constants';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {ProvContractDetRange} from '../../../api-models/prov-contract-det-range.model';
import{DrgInformationComponent} from '../drg-information/drg-information.component';
import {HelpComponent} from '../../member/help/help.component';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {GroupMasterLookup} from '../../../shared/lookup/group-master-lookup';
import {TablesAndColumnsComponent} from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import {ProvContractPriceSchedLookup} from "../../../shared/lookup/prov-contract-price-sched-lookup";
import {ProviderContractsComponent} from "../provider-contracts/provider-contracts.component";

// Use the Component directive to define the ContractPricingDetailsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'contractpricingdetails',
    templateUrl: './contract-pricing-details.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        IncentiveRuleService,
        ProvContractService,
        ProvContractPriceService,
        ProvContractPriceSchedService,
        ProvContractSpecialtyService,
        ProvContractTaxonomyService,
        ProvContractVendorService,
        ReasonCodeMasterService,
        DddwDtlService,
        PriceRuleMasterService,
        RegionMasterService,
        ProvContractDetRangeService,
        MessageMasterDtlService
    ]
})
export class ContractPricingDetailsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    contractPricingDetailsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    seqVendAddrss: any;
    claimType: any;
    seqVendId: any;
    detSearchSeq: any;
    detSearchOrder: any;

    editProvContractPrice: boolean = false;
    provContractPrice: ProvContractPrice;
    provContractPrices: ProvContractPrice[];
    claimRec: any;
    copiedClaimRec: any;
    editProvContractPriceSched: boolean;

    provContractPriceSched: ProvContractPriceSched;
    provContractPriceScheds: ProvContractPriceSched[];
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    public dataGrid004GridOptions: GridOptions;
    private windowId = '';
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;
    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;
    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;
    private dataGrid004gridApi: any;
    private dataGrid004gridColumnApi: any;

    claimTypes: any[];
    operators: any[];
    contractTypes: any[];
    priceRules: any[];
    pricingRegions: any[];
    serviceRegions: any[];
    geoRegions: any[];
    targetRevActions: any[];
    targetRevReasons: any[];

    contractPriceGridRecords: any[] = [];
    ordersState: any = [];
    isOrderResetForm = false;
    ordersStatePriceShed:any=[];
    isOrderResetFormPriceShed=false;
    orderFormConfig = ProviderContractDetailsValueFormConfig;
    orderFormPricesScheduleConfig = ProviderContractDetailsPricesValueFormConfig;
    menu: Menu[] = [];

    /*@Input() seqProvContract = '369338';
    @Input() seqProvVendId = '492123';*/
    priceSchedModel = new SearchModel('provcontractpricescheds/lookup', ProvContractPriceSchedLookup.ALL, ProvContractPriceSchedLookup.DEFAULT, [], false, true);
    @Input() seqProvContract = 255000;
    @Input() seqProvVendId = 265208;
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
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private dddwDtlService: DddwDtlService,
        private priceRuleMasterService: PriceRuleMasterService,
        private regionMasterService: RegionMasterService,
        private securityService: SecurityService,
        private provContractVendorService: ProvContractVendorService,
        private systemCodesService: SystemCodesService,
        private provContractPriceService: ProvContractPriceService,
        private provContractDetRangeService: ProvContractDetRangeService,
        private provContractPriceSchedService: ProvContractPriceSchedService,
        private drgpricerrevision: DrgPricerRevisionService
    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        /*this.initializePermission();*/

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.contractPricingDetailsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.createDataGrid004();
        this.ProvContractVendorProvider();
        this.getClaimType();
        this.getOperators();
        this.getContractTypes();
        this.getPriceRules();
        this.getPricingRegion();
        this.getServiceRegion();
        this.getGeographicRegion();
        this.getTargetRevActions();
        /*this.getReasonCodes();*/
        this.menuInit() ;
        /*this.drgpricerrevision.getRevisionLevelDropDown().subscribe(
            data=>{
                console.log('MyData'+data);
            },error=>console.log(error));*/



    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.contractPricingDetailsForm = this.formBuilder.group({
            claimType: ['', {updateOn: 'blur', validators: [] }],
            order: ['', {updateOn: 'blur', validators: [Validators.required] }],
            searchSequence: ['', {updateOn: 'blur', validators: [Validators.required] }],
            detTable: ['', {updateOn: 'blur', validators: [] }],
            determinant002: ['', {updateOn: 'blur', validators: [] }],
            operator: ['', {updateOn: 'blur', validators: [] }],
            contractType: ['', {updateOn: 'blur', validators: [] }],
            pricingRegion: ['', {updateOn: 'blur', validators: [] }],
            pctAllowed: ['', {updateOn: 'blur', validators: [] }],
            priceRule: ['', {updateOn: 'blur', validators: [] }],
            serviceRegion: ['', {updateOn: 'blur', validators: [] }],
            pctOfBilled: ['', {updateOn: 'blur', validators: [] }],
            geoRegio: ['', {updateOn: 'blur', validators: [] }],
            pctWithhold: ['', {updateOn: 'blur', validators: [] }],
            targetRevCodeEdit: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [] }],
            reason: ['', {updateOn: 'blur', validators: [] }],
            oldClaimType: ['', {updateOn: 'blur', validators: [] }],
            oldOrder: ['', {updateOn: 'blur', validators: [] }],
            oldSearchSequence: ['', {updateOn: 'blur', validators: [] }],
        }, {updateOn: 'submit'});
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

    createProvContractPrice() {
        // if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.contractPricingDetailsForm.valid) {
                let provContractPrice = new ProvContractPrice();
                provContractPrice.provContractPricePrimaryKeyModel = {};
                provContractPrice.provContractPricePrimaryKeyModel.seqVendId = this.seqVendId;
                provContractPrice.provContractPricePrimaryKeyModel.seqVendAddress = this.seqVendAddrss;
                provContractPrice.provContractPricePrimaryKeyModel.seqProvContract = this.seqProvContract;
                provContractPrice.provContractPricePrimaryKeyModel.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
                provContractPrice.provContractPricePrimaryKeyModel.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
                provContractPrice.provContractPricePrimaryKeyModel.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
                provContractPrice.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
                provContractPrice.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
                provContractPrice.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
                provContractPrice.determinantTable = Form.getValue(this.contractPricingDetailsForm, 'detTable');
                provContractPrice.determinant = Form.getValue(this.contractPricingDetailsForm, 'determinant002');
                provContractPrice.operator = Form.getValue(this.contractPricingDetailsForm, 'operator');
                provContractPrice.contractType = Form.getValue(this.contractPricingDetailsForm, 'contractType');
                provContractPrice.pricingRegion = Form.getValue(this.contractPricingDetailsForm, 'pricingRegion');
                provContractPrice.pctAllowed = Form.getValue(this.contractPricingDetailsForm, 'pctAllowed');
                provContractPrice.priceRule1 = Form.getValue(this.contractPricingDetailsForm, 'priceRule');
                provContractPrice.serviceRegion = Form.getValue(this.contractPricingDetailsForm, 'serviceRegion');
                provContractPrice.pctOfBilled = Form.getValue(this.contractPricingDetailsForm, 'pctOfBilled');
                provContractPrice.geographicRegion = Form.getValue(this.contractPricingDetailsForm, 'geoRegio');
                provContractPrice.pctWithhold = Form.getValue(this.contractPricingDetailsForm, 'pctWithhold');
                provContractPrice.targetRevCodeEditFlag = Form.getValue(this.contractPricingDetailsForm, 'targetRevCodeEdit');
                provContractPrice.targetRevCodeEditFlag = (provContractPrice.targetRevCodeEditFlag) ? 'Y' : 'N';
                provContractPrice.targetRevAction = Form.getValue(this.contractPricingDetailsForm, 'action');
                provContractPrice.targetRevReason = Form.getValue(this.contractPricingDetailsForm, 'reason');
                this.provContractPriceService.createProvContractPrice(provContractPrice).subscribe(response => {
                    /*this.alertMessage = this.alertMessageService.info('Record successfully created.');*/
                    this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                    this.editProvContractPrice = true;
                    this.getGrid2Records();
                });

            } else {
                /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');*/
                this.toastService.showToast('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.', NgbToastType.Danger);
            }
        // }
    }

    updateProvContractPrice(claimType: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.contractPricingDetailsForm.valid) {
            let provContractPrice: any = this.provContractPrice;
            console.log(provContractPrice);
            provContractPrice.provContractPricePrimaryKeyModel = provContractPrice.provContractPricePrimaryKey;
            provContractPrice.provContractPricePrimaryKeyModel.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
            provContractPrice.provContractPricePrimaryKeyModel.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
            provContractPrice.provContractPricePrimaryKeyModel.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
            provContractPrice.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
            provContractPrice.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
            provContractPrice.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
            provContractPrice.oldClaimType = Form.getValue(this.contractPricingDetailsForm, 'oldClaimType');
            provContractPrice.oldDetSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'oldOrder');
            provContractPrice.oldDetSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'oldSearchSequence');
            provContractPrice.determinantTable = Form.getValue(this.contractPricingDetailsForm, 'detTable');
            provContractPrice.determinant = Form.getValue(this.contractPricingDetailsForm, 'determinant002');
            provContractPrice.operator = Form.getValue(this.contractPricingDetailsForm, 'operator');
            provContractPrice.contractType = Form.getValue(this.contractPricingDetailsForm, 'contractType');
            provContractPrice.pricingRegion = Form.getValue(this.contractPricingDetailsForm, 'pricingRegion');
            provContractPrice.pctAllowed = Form.getValue(this.contractPricingDetailsForm, 'pctAllowed');
            provContractPrice.priceRule1 = Form.getValue(this.contractPricingDetailsForm, 'priceRule');
            provContractPrice.serviceRegion = Form.getValue(this.contractPricingDetailsForm, 'serviceRegion');
            provContractPrice.pctOfBilled = Form.getValue(this.contractPricingDetailsForm, 'pctOfBilled');
            provContractPrice.geographicRegion = Form.getValue(this.contractPricingDetailsForm, 'geoRegio');
            provContractPrice.pctWithhold = Form.getValue(this.contractPricingDetailsForm, 'pctWithhold');
            provContractPrice.targetRevCodeEditFlag = Form.getValue(this.contractPricingDetailsForm, 'targetRevCodeEdit');
            provContractPrice.targetRevCodeEditFlag = (provContractPrice.targetRevCodeEditFlag) ? 'Y' : 'N';
            provContractPrice.targetRevAction = Form.getValue(this.contractPricingDetailsForm, 'action');
            provContractPrice.targetRevReason = Form.getValue(this.contractPricingDetailsForm, 'reason');
            this.provContractPriceService.updateProvContractPriceDrgInformation(provContractPrice, this.createURLPathParams()).subscribe(response => {
                /*this.alertMessage = this.alertMessageService.info('Record successfully updated.');*/
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.editProvContractPrice = true;
            });
         } else {
            /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');*/
            this.toastService.showToast('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
         }
      /*} else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }*/
    }

    saveProvContractPrice() {
        if (this.editProvContractPrice) {
            this.updateProvContractPrice(this.provContractPrice.claimType)
        } else {
            this.createProvContractPrice();
        }
    }

    deleteProvContractPrice(claimType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractPriceService.deleteProvContractPrice(claimType).subscribe(response => {
                /*this.alertMessage = this.alertMessageService.info('Record successfully deleted.');*/
                this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
            });
       }
    }

    getProvContractPrice(claimType: string) {
        this.provContractPriceService.getProvContractPrice(claimType).subscribe(provContractPrice => {
            this.provContractPrice = provContractPrice;
            this.contractPricingDetailsForm.patchValue({
                'claimType': this.provContractPrice.claimType,
                'order': this.provContractPrice.detSrchOrder,
                'searchSequence': this.provContractPrice.detSrchSequence,
                'detTable': this.provContractPrice.determinantTable,
                'determinant002': this.provContractPrice.determinant,
                'operator': this.provContractPrice.operator,
                'contractType': this.provContractPrice.contractType,
                'pricingRegion': this.provContractPrice.pricingRegion,
                'pctAllowed': this.provContractPrice.pctAllowed,
                'priceRule': this.provContractPrice.priceRule1,
                'serviceRegion': this.provContractPrice.serviceRegion,
                'pctOfBilled': this.provContractPrice.pctOfBilled,
                'geoRegio': this.provContractPrice.geographicRegion,
                'pctWithhold': this.provContractPrice.pctWithhold,
                'targetRevCodeEdit': (this.provContractPrice.targetRevCodeEditFlag == 'Y' ? 'Y' : ''),
                'action': this.provContractPrice.targetRevAction,
                'reason': this.provContractPrice.targetRevReason,
            });
        });
    }

    getProvContractPrices() {
        this.provContractPriceService.getProvContractPrices().subscribe(provContractPrices => {
        this.provContractPrices = provContractPrices;
        });
    }

    createProvContractPriceSched() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.contractPricingDetailsForm.valid) {
                let provContractPriceSched = new ProvContractPriceSched();
                provContractPriceSched.provContractPriceSchedPrimaryKeyModel.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
                provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
                provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
                this.provContractPriceSchedService.createProvContractPriceSched(provContractPriceSched).subscribe(response => {
                    /*this.alertMessage = this.alertMessageService.info('Record successfully created.');*/
                    this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                    this.editProvContractPriceSched = false;
                });

            } else {
                /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');*/
                this.toastService.showToast('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.', NgbToastType.Danger);
            }
        } else {

        }
    }

    updateProvContractPriceSched(claimType: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.contractPricingDetailsForm.valid) {
            let provContractPriceSched = new ProvContractPriceSched();
            provContractPriceSched.provContractPriceSchedPrimaryKeyModel.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
            provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
            provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
            this.provContractPriceSchedService.updateProvContractPriceSched(provContractPriceSched, claimType).subscribe(response => {
                /*this.alertMessage = this.alertMessageService.info('Record successfully updated.');*/
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.editProvContractPriceSched = false;
            });
         } else {
            /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your ' +
                'entries and try again.');*/
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your ' +
                'entries and try again.', NgbToastType.Danger);
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    saveProvContractPriceSched() {
        if (this.editProvContractPriceSched) {
            this.updateProvContractPriceSched(this.provContractPriceSched.provContractPriceSchedPrimaryKeyModel.claimType)
        } else {
            this.createProvContractPriceSched();
        }
    }

    deleteProvContractPriceSched(claimType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractPriceSchedService.deleteProvContractPriceSched(claimType).subscribe(response => {
                /*this.alertMessage = this.alertMessageService.info('Record successfully deleted.');*/
                this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
            });
       }
    }

    getProvContractPriceSched(claimType: string) {
        this.provContractPriceSchedService.getProvContractPriceSched(claimType).subscribe(provContractPriceSched => {
            this.provContractPriceSched = provContractPriceSched;
            this.contractPricingDetailsForm.patchValue({
                'claimType': this.provContractPriceSched.provContractPriceSchedPrimaryKeyModel.claimType,
                'order': this.provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchOrder,
                'searchSequence': this.provContractPriceSched.provContractPriceSchedPrimaryKeyModel.detSrchSequence,
            });
        });
    }

    getProvContractPriceScheds() {
        this.provContractPriceSchedService.getProvContractPriceScheds().subscribe(provContractPriceScheds => {
        this.provContractPriceScheds = provContractPriceScheds;
        });
    }

    dataGrid001GridOptionsExportCsv() {
        const params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        const params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    dataGrid003GridOptionsExportCsv() {
        const params = {};
        this.dataGrid003gridApi.exportDataAsCsv(params);
    }

    dataGrid004GridOptionsExportCsv() {
        const params = {};
        this.dataGrid004gridApi.exportDataAsCsv(params);
    }

    createDataGrid001(): void {
      this.dataGrid001GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: 'Provider',
             field: 'PROVIDER_ID',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Name',
             field: 'FULL_NAME',
             width: 200
         },
         {
             headerName: 'LOB',
             field: 'LINE_OF_BUSINESS',
             width: 200
         },
         {
             headerName: 'IPA Eff Dt.',
             field: 'EFFECTIVE_DATE',
             width: 200
         },
         {
             headerName: 'Vendor',
             field: 'SEQ_VEND_ID',
             width: 200
         },
         {
             headerName: 'Address',
             field: 'SEQ_VEND_ADDRESS',
             width: 200
         }
      ];
    }

    createDataGrid002(): void {
      this.dataGrid002GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: 'Claim Type',
             field: 'CLAIM_TYPE',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Order',
             field: 'DET_SRCH_ORDER',
             width: 200
         },
         {
             headerName: 'Sequence',
             field: 'DET_SRCH_SEQUENCE',
             width: 200
         },
         {
             headerName: 'Det. Table',
             field: 'DETERMINANT_TABLE',
             width: 200
         },
         {
             headerName: 'Determinant',
             field: 'DETERMINANT',
             width: 200
         },
         {
             headerName: 'Operator',
             field: 'OPERATOR',
             width: 200
         }
      ];
    }

    createDataGrid003(): void {
      this.dataGrid003GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid003GridOptions.editType = 'fullRow';
      this.dataGrid003GridOptions.columnDefs = [
         {
             headerName: 'From',
             field: 'detValueFrom',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Through',
             field: 'detValueTo',
             width: 200
         }
      ];
    }

    createDataGrid004(): void {
      this.dataGrid004GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid004GridOptions.editType = 'fullRow';
      this.dataGrid004GridOptions.columnDefs = [
         {
             headerName: 'Order',
             field: 'SCHED_ORDER',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Price sched',
             field: 'DET_SRCH_ORDER',
             width: 200
         },
         {
             headerName: 'Price Sched Pct Allowed',
             field: 'SCHED_PCT_ALLOWED',
             width: 300
         }
      ];
    }



    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
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
        this.formValidation = new FormValidation(this.contractPricingDetailsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
         this.createDataGrid004();
        this.getClaimType();
        this.getOperators();
        this.getContractTypes();
        this.getPriceRules();
        this.getPricingRegion();
        this.getServiceRegion();
        this.getGeographicRegion();
        this.getTargetRevActions();
        /*this.getReasonCodes();*/
    }

    private getClaimType() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', '0').subscribe(ClaimType => {
            this.claimTypes = ClaimType;
        }, error => {});
    }

    getOperators() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('coperator', 'dw_provcpr_de', 0).subscribe((res: any) => {
            this.operators = res;
        });
    }

    getContractTypes() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('ccontract_type', 'dw_provcpr_de', 0).subscribe((res: any) => {
            this.contractTypes = res;
        });
    }

    getPriceRules() {
        this.priceRuleMasterService.getPriceRuleMasters().subscribe((res) => {
            this.priceRules = res;
        });
    }

    getPricingRegion() {
        this.regionMasterService.getRegionMaster('P').subscribe((res) => {
            this.pricingRegions = res;
        });
    }

    getServiceRegion() {
        this.regionMasterService.getRegionMaster('S').subscribe((res) => {
            this.serviceRegions = res;
        });
    }

    getGeographicRegion() {
        this.regionMasterService.getRegionMaster('G').subscribe((res) => {
            this.geoRegions = res;
        });
    }

    getTargetRevActions() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('target_rev_action', 'dw_provcpr_de', 0).subscribe((res: any) => {
            this.targetRevActions = res;
        });
    }

    onActionChange(event) {
        this.getReasonCodes(event.target.value);
    }

    getReasonCodes(codeType) {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType(codeType).subscribe((res) => {
           this.targetRevReasons = res;
        });
    }

    private ProvContractVendorProvider() {
        this.provContractVendorService.findBySeqProvContractAndSeqProvVendId(this.seqProvContract, this.seqProvVendId).subscribe(res => {
            this.dataGrid001GridOptions.api.setRowData(res);
            if (res && res.length > 0) {
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            }
        });
    }

    onProviderGridSelectRow(event) {
        const providers =  event.api.getSelectedRows();
        if (providers && providers.length > 0 && providers[0].SEQ_VEND_ID && providers[0].SEQ_VEND_ADDRESS) {
            this.seqVendId = providers[0].SEQ_VEND_ID;
            this.seqVendAddrss = providers[0].SEQ_VEND_ADDRESS;
            this.getGrid2Records();
        }
    }

    getGrid2Records() {
        this.provContractVendorService.findClaimTypesBySeqVendIdAndSeqVendAddressAndSeqVendContract(this.seqVendId,
            this.seqVendAddrss, this.seqProvContract).subscribe(res => {
            this.dataGrid002GridOptions.api.setRowData(res);
            this.contractPriceGridRecords = res;
            if (res && res.length > 0) {
                this.dataGrid002GridOptions.api.selectIndex(0, false, false);
            }
        });
    }

    onClaimGridSelectRow(event) {
        const claims =  event.api.getSelectedRows();
        if (claims && claims.length > 0) {
            this.contractPricingDetailsForm.patchValue({
                'claimType': claims[0].CLAIM_TYPE,
                'order': claims[0].DET_SRCH_ORDER,
                'searchSequence': claims[0].DET_SRCH_SEQUENCE,
                'detTable': claims[0].DETERMINANT_TABLE,
                'determinant002': claims[0].DETERMINANT,
                'operator': claims[0].OPERATOR,
                'contractType': claims[0].CONTRACT_TYPE,
                'pricingRegion': claims[0].PRICING_REGION,
                'pctAllowed': claims[0].PCT_ALLOWED,
                'priceRule': claims[0].PRICE_RULE_1,
                'serviceRegion': claims[0].SERVICE_REGION,
                'pctOfBilled': claims[0].PCT_OF_BILLED,
                'geoRegio': claims[0].GEOGRAPHIC_REGION,
                'pctWithhold': claims[0].PCT_WITHHOLD,
                'targetRevCodeEdit': claims[0].TARGET_REV_CODE_EDIT_FLAG,
                'action': claims[0].TARGET_REV_ACTION,
                'reason': claims[0].TARGET_REV_REASON,
                'oldClaimType': claims[0].CLAIM_TYPE,
                'oldOrder': claims[0].DET_SRCH_ORDER,
                'oldSearchSequence': claims[0].DET_SRCH_SEQUENCE
            });
            this.claimRec = claims[0];
            this.claimType = claims[0].CLAIM_TYPE;
            this.detSearchOrder = claims[0].DET_SRCH_ORDER;
            this.detSearchSeq = claims[0].DET_SRCH_SEQUENCE;
            this.ordersState = [];
            this.editProvContractPrice = true;
            this.ordersStatePriceShed = [];
            this.getProviderContractPriceByParams(this.createURLPathParams());
            this.getProvContractDetRanges(this.claimRec);
            this.getPriceSchedOrderDetails(this.claimRec);
            this.getProvContractOrderDetails(this.claimRec);
        }
    }

    getProvContractDetRanges(rec) {
        this.provContractDetRangeService.findByDetails(this.detSearchSeq, this.detSearchOrder, this.seqVendAddrss, this.seqVendId,
            this.seqProvContract, this.claimType).subscribe((res: any) => {
            /*this.dataGrid003GridOptions.api.setRowData(res);
            if (res && res.length > 0) {
                this.dataGrid003GridOptions.api.selectIndex(0, false, false);
            }*/
            this.populatePricingValueDynamicForm(res);
        });
    }

    private getProvContractOrderDetails(rec: any) {
        this.provContractVendorService.findProvContractOrdersByDetails(this.detSearchSeq, this.detSearchOrder, this.seqVendAddrss, this.seqVendId,
            this.seqProvContract, this.claimType).subscribe((res: any) => {
                console.log(res);
            /*this.dataGrid003GridOptions.api.setRowData(res);
            if (res && res.length > 0) {
                this.dataGrid003GridOptions.api.selectIndex(0, false, false);
            }*/
        });
    }



     getPriceSchedOrderDetails(rec: any ) {
        this.provContractVendorService.findPriceSchedOrderDetails(this.detSearchSeq, this.detSearchOrder, this.seqVendAddrss, this.seqVendId,
            this.seqProvContract, this.claimType).subscribe((res: any) => {
            console.log('Data is :' + res );
            this.populatePriceShedOrderDynamicForm(res);
        });
    }

    savePriceSchedOrderDetails(event) {
        let priceScheds = new Array<ProvContractPriceSched>();

        event.forEach((record) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            let groupContact: ProvContractPriceSched = this.populateContractPriceSchedField(pair, FORM_FIELD_ACTION_TYPES.ADD);
            priceScheds.push(groupContact);
        });
        if (priceScheds && priceScheds.length > 0) {
            this.provContractPriceSchedService.updateContractPriceSched(priceScheds).subscribe((res: any) => {
                this.toastService.showToast('Price Schedule Updated Successfully', NgbToastType.Success)
            }, error => {
                console.log(error);
                if (error.error instanceof Object) {
                    this.toastService.showToast('Entered value is in invalid type', NgbToastType.Danger)
                } else {
                    this.toastService.showToast(error.error, NgbToastType.Danger)
                }
            })
        }
    }

    private populateContractPriceSchedField(pair: any, action: any) {
        let priceSched = {
            provContractPriceSchedPrimaryKeyModel: {
                claimType: this.claimType,
                detSrchOrder: this.detSearchOrder,
                detSrchSequence: this.detSearchSeq,
                schedOrder: pair[0].value,
                seqProvContract: this.seqProvContract,
                seqVendAddress: this.seqVendAddrss,
                seqVendId: this.seqVendId
            },
            priceSchedule: pair[1].value,
            schedPctAllowed: pair[3].value,
            action: action
        }
        return priceSched;
    }

    private populateContractDetRangeField(pair: any, action: any) {
        let priceDetRange : ProvContractDetRange = {
            provContractDetRangePrimaryKey: {
                claimType: this.claimType,
                detSrchOrder: this.detSearchOrder,
                detSrchSequence: this.detSearchSeq,
                seqProvContract: this.seqProvContract,
                seqVendAddress: this.seqVendAddrss,
                seqVendId: this.seqVendId,
                detRangeSequence: 0
            },
            detValueFrom: pair[0].value,
            detValueTo: pair[1].value,
            action: action
        }
        return priceDetRange;
    }

    saveProvContractOrder(event) {
        let priceDetRanges = new Array<ProvContractDetRange>();
        event.forEach((record) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            let groupContact: ProvContractDetRange = this.populateContractDetRangeField(pair, FORM_FIELD_ACTION_TYPES.ADD);
            priceDetRanges.push(groupContact);
        });
        if (priceDetRanges && priceDetRanges.length > 0) {
            this.provContractDetRangeService.updateContractDetRange(priceDetRanges).subscribe((res: any) => {
                this.toastService.showToast('Price Det Range Updated Successfully', NgbToastType.Success)
            }, error => {
                console.log(error);
                if (error.error instanceof Object) {
                    this.toastService.showToast('Entered value is in invalid type', NgbToastType.Danger)
                } else {
                    this.toastService.showToast(error.error, NgbToastType.Danger)
                }
            })
        }
    }

    populatePricingValueDynamicForm(orders: any[]) {
        console.log(orders);
        if (!orders || orders.length < 1) {
            return;
        }

        orders.forEach((groupContact: any) => {
            let mockConfig = JSON.parse(JSON.stringify(this.orderFormConfig));    // make a copy of original config
            this.orderFormConfig.forEach((field, index) => {
                if (field.name === ProviderContractDetailsValue.FROM) {
                    mockConfig[index].value = groupContact['detValueFrom'];
                } else if (field.name === ProviderContractDetailsValue.THROUGH) {
                    mockConfig[index].value = groupContact['detValueTo'];
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.ordersState.push(formState);          // add record
        })
        this.ordersState = JSON.parse(JSON.stringify(this.ordersState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        console.log(this.ordersState);
    }


    populatePriceShedOrderDynamicForm(orders: any ) {
        if (!orders || orders.length < 1) {
            return;
        }
        let params = this.createURLPathParams();
        orders.forEach((groupContact: any) => {
            let mockConfig = JSON.parse(JSON.stringify(this.orderFormPricesScheduleConfig));    // make a copy of original config
            this.orderFormPricesScheduleConfig.forEach((field, index) => {
                if (field.name === ProviderContractDetailsPricesValueForm.ORDER) {
                    //mockConfig[index].value = groupContact['detValueFrom'];

                    mockConfig[index].value = groupContact['SCHED_ORDER'];
                } else if (field.name === ProviderContractDetailsPricesValueForm.PRICESCHED ) {
                   // mockConfig[index].value = groupContact['detValueTo'];
                    mockConfig[index].value = groupContact['PRICE_SCHEDULE'];
                    this.priceSchedModel.url = `provcontractpricescheds/lookup/${params.detSrchSequence}/${params.detSrchOrder}/${params.seqVendAddress}/${params.seqVendId}/${params.seqProvContract}/${params.claimType}`;
                    mockConfig[index].searchModel = this.priceSchedModel;

                } else if (field.name === ProviderContractDetailsPricesValueForm.PRICESCHEDPCTALD) {
                    mockConfig[index].value = groupContact['SCHED_PCT_ALLOWED'];
                } else if (field.name === ProviderContractDetailsPricesValueForm.DESCRIPTION) {
                    mockConfig[index].value = groupContact['DESCRIPTION'];
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.ordersStatePriceShed.push(formState);          // add record
        })
         this.ordersStatePriceShed = JSON.parse(JSON.stringify(this.ordersStatePriceShed));
        console.log(this.ordersStatePriceShed);

    }


    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey : 'Ctrl+M' }, { name: 'Delete', shortcutKey : 'Ctrl+D' }, { name: 'Save' , shortcutKey : 'Ctrl+S'},
                    { name: 'Close' , shortcutKey : 'Ctrl+F4' },
                    { isHorizontal: true }, { name: 'Main Menu...' , shortcutKey : 'F2'}, { name: 'Shortcut Menu...' , shortcutKey : 'F3' },
                    { isHorizontal: true }, { name: 'Print', disabled: true },
                    { isHorizontal: true }, { name: 'Exit' , shortcutKey : 'Alt+F4'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true ,shortcutKey: 'Ctrl+Z'}, { isHorizontal: true }, {
                    name: 'Cut',
                    disabled: true , shortcutKey: 'Ctrl+X'
                },
                    { name: 'Paste', disabled: true ,shortcutKey: 'Ctrl+V'}, { isHorizontal: true },
                    { name: 'Lookup' ,shortcutKey: 'F5'}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{ name: 'Contract' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'Copy Pricing' , shortcutKey: 'Ctrl+C'}, {
                    name: 'DRG Information' , shortcutKey: 'Ctrl+G'
                }]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes' , disabled : true , shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' , shortcutKey: 'Shift+Alt+T' }, { name: 'Layer', shortcutKey : 'Shift+Alt+L' }, { name: 'Cascade' , shortcutKey : 'Shift+Alt+C'}, { name: 'Arrange Icons', shortcutKey : 'Shift+Alt+I' },
                    { isHorizontal: true }, { name: 'Show Timestamp' , shortcutKey : 'Shift+Alt+S'}, { isHorizontal: true }, { name: '1 Main Menu' }, { name: '2 Provider Contracts' },
                    { name: '3 Contract Pricing Details' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window' , shortcutKey: 'F1'}, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }


    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {

                    this.contractPricingDetailsForm.reset({
                        claimType: '',
                        seqVendId: this.seqVendId,
                        seqVendAddress: this.seqVendAddrss,
                        seqProvContract: this.seqProvContract
                    })
                    this.ordersState = [];
                    this.ordersStatePriceShed = [];
                    this.editProvContractPrice = false;
                    break;
                }
                case 'Delete': {
                    break;
                }
                case 'Save': {
                    this.saveProvContractPrice();
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu...': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
            switch (event.action) {
                case 'Lookup': {
                    console.log(document.activeElement);
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                }
            }
        } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions
            switch (event.action) {
                case 'Contract': {
                    const ref = this.modalService.open(ProviderContractsComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                }
            }
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions

            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {             // handle Help-Menu Actions
            /**
             * Open help modal
             */


        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Notes') {

            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    handleSpecialMenu(action: string ) {
       // const modalRef = this.modalService.open(DrgInformationComponent, { windowClass: 'myCustomModalClass' });
        switch (action) {
            case 'Copy Pricing': {
                this.handleCopyPricing();
                break;
            }
            case 'DRG Information': {
                const ref = this.modalService.open(DrgInformationComponent, { windowClass: 'myCustomModalClass' });
                ref.componentInstance.params = this.createURLPathParams();
            }
        }
    }

    createURLPathParams() {
        return {
            detSrchSequence: this.detSearchSeq,
            detSrchOrder: this.detSearchOrder,
            seqVendAddress: this.seqVendAddrss,
            seqVendId: this.seqVendId,
            seqProvContract: this.seqProvContract,
            claimType: this.claimType
        };
    }


    private getProviderContractPriceByParams(urlPathParams) {
        this.provContractPriceService.getProvContractPriceDrg(urlPathParams).subscribe((res) => {
            this.provContractPrice = res;
        })
    }

    private handleCopyPricing() {
        console.log(this.contractPriceGridRecords);
        console.log(this.claimRec);
        this.copiedClaimRec = this.claimRec;
        console.log(this.copiedClaimRec);
        let copyRec: any = JSON.parse(JSON.stringify(this.claimRec));
        if (copyRec.DET_SRCH_SEQUENCE < 9999) {
            this.provContractPriceService.copySaveProvContractPrice(null, this.createURLPathParams()).subscribe((res: any) => {
                copyRec.DET_SRCH_SEQUENCE = this.getNextDetSearchSequence(copyRec.CLAIM_TYPE, copyRec.DET_SRCH_ORDER);
                this.contractPriceGridRecords.push(copyRec);
                this.dataGrid002GridOptions.api.setRowData(this.contractPriceGridRecords);
                if (this.contractPriceGridRecords && this.contractPriceGridRecords.length > 0) {
                    this.dataGrid002GridOptions.api.selectIndex((this.contractPriceGridRecords.length - 1), false, false);
                }
            });
        } else {
            this.messageService
                .findByMessageId(4041)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        '4041: ' +
                        message[0].messageText,
                        'Provider Contract Pricing Detail'
                    );
                });
        }
    }

    getNextDetSearchSequence(claimType, detSearchOrder) {
        let filteredClaimRecs = this.contractPriceGridRecords.filter((r: any) => (r.CLAIM_TYPE === claimType &&
            r.DET_SRCH_ORDER === detSearchOrder)).map((r: any) => { return r.DET_SRCH_SEQUENCE; });
        return (filteredClaimRecs[filteredClaimRecs.length - 1] + 10);
    }

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
             if (res) {
                 this.contractPricingDetailsForm.patchValue({
                     detTable: res.tableName
                 });
             }
        });
    }

    onLookupFieldDetTable(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel();
        }
    }
}

