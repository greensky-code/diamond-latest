/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {ProvContractSpecialty} from '../../../api-models/prov-contract-specialty.model';
import {ProvContract} from '../../../api-models/prov-contract.model';
import {ProvContractTaxonomy} from '../../../api-models/prov-contract-taxonomy.model';

import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Form} from '../../../shared/helpers/form.helper';
import {ProvContractService} from '../../../api-services/prov-contract.service';
import {ProvContractSpecialtyService} from '../../../api-services/prov-contract-specialty.service';
import {ProvContractTaxonomyService} from '../../../api-services/prov-contract-taxonomy.service';
import {GridOptions} from 'ag-grid-community';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecurityService} from '../../../shared/services/security.service';
import {
    DynamicConfigFormRow,
    FORM_FIELD_ACTION_TYPES,
    FormField,
    FormRow,
    Menu,
    Option,
    SearchModel
} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../../diamond/main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProviderMasterLookup} from '../../../shared/lookup/provider-master-lookup';
import {CONSTANTS, getProviderContractsShortcutKeys} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {MEM_MODULE_ID} from '../../../shared/app-constants';
import {RequiredValidator} from '../../../shared/validators/required.validator';
import {
    DddwDtlService,
    MessageMasterDtlService,
    PanelMasterService,
    ReasonCodeMasterService,
    SecUserService,
    SystemCodesService,
    VendorAddressService
} from '../../../api-services';
import {LineOfBusinessMasterService} from '../../../api-services/line-of-business-master.service';
import {LineOfBusinessMaster} from '../../../api-models/line-of-business-master.model';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ProvContractVendorService} from '../../../api-services/prov-contract-vendor.service';
import {ProvContractVendor} from '../../../api-models/prov-contract-vendor.model';
import {
    ProvContractSpecialityFields,
    ProvContractSpecialityFormConfig,
    ProvContractTaxonomyFields,
    ProvContractTaxonomyFormConfig,
    ProvVendorFieldNames,
    ProvVendorFormConfig
} from '../../../shared/models/constants';
import {
    MessageMasterDtl,
    PanelMaster,
    ProvTypeMaster,
    ReasonCodeMaster,
    SecUser,
    SystemCodes,
    VendorAddress,
    VendorMaster
} from '../../../api-models';
import {forkJoin} from 'rxjs';
import {VendorMasterLookup} from '../../../shared/lookup/vendor-master-lookup';
import {Observable} from "rxjs/Rx";
import {VendorMasterService} from "../../../api-services/vendor-master.service";
import {IpaMasterService} from "../../../api-services/ipa-master.service";
import {IpaMaster} from "../../../api-models/ipa-master.model";
import {CapFundDtl} from "../../../api-models/common/cap-fund-dtl.model";
import {CapFundHdr} from "../../../api-models/common/cap-fund-hdr.model";
import {CapFundHdrService} from "../../../api-services/common/cap-fund-hdr.service";
import {CapFundDtlService} from "../../../api-services/common/cap-fund-dtl.service";
import {IMyDateModel, IMySingleDateModel} from "angular-mydatepicker";
import {ProviderMasterComponent} from "../provider-master/provider-master.component";
import {ProviderAddressComponent} from "../provider-address/provider-address.component";
import {ProviderCredentialsComponent} from "../provider-credentials/provider-credentials.component";
import {VendorAddressComponent} from "../../vendor/vendor-address/vendor-address.component";
import {MemberClaimHoldCodesComponent} from "../../claims/member-claim-hold-codes/member-claim-hold-codes.component";
import {DrgInformationComponent} from "../drg-information/drg-information.component";
import {ProviderRelationshipComponent} from "../provider-relationship/provider-relationship.component";
import {ContractPricingDetailsComponent} from "../contract-pricing-details/contract-pricing-details.component";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {ProvTypeMasterService} from "../../../api-services/prov-type-master.service";
import {TaxonomyCodeLookup} from "../../../shared/lookup/taxonomy-code-lookup";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {CovProvGroupMasterService} from "../../../api-services/provider/cov-prov-group-master.service";
import {CovProvGroupMaster} from "../../../api-models/provider/cov-prov-group-master.model";
import {HelpComponent} from "../../member/help/help.component";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";
import {set} from "ag-grid-community/dist/lib/utils/object";

// Use the Component directive to define the ProviderContractsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
export class VendorForm {
    addressLine1: string;
    provContractVendor = new ProvContractVendor();
    vendorId: string;

    constructor(provVendor: ProvContractVendor, vendorId: string, address) {
        this.addressLine1 = address;
        this.provContractVendor = provVendor;
        this.vendorId = vendorId;
    }

}

@UntilDestroy({checkProperties: true})
@Component({
    selector: 'providercontracts',
    templateUrl: './provider-contracts.component.html',

})
export class ProviderContractsComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() providerId?: string;
    @Input() showIcon = true;
    @Input() provSeqId?: number;
    providerContractsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public dataGrid001GridOptions: GridOptions;

    private dataGrid001gridApi: any;


    closeStatus: Boolean = false;

    editProvContract: boolean;
    provContract: ProvContract;
    provContracts: ProvContract[];
    editProvContractSpecialty: boolean;
    provContractSpecialty: ProvContractSpecialty;
    provContractSpecialtys: ProvContractSpecialty[];
    editProvContractTaxonomy: boolean;
    provContractTaxonomy: ProvContractTaxonomy;
    provContractTaxonomys: ProvContractTaxonomy[];
    provContractVendors: ProvContractVendor[];
    provContractVendor: ProvContractVendor;
    windowId = 'PROVC';

    isProgress = true;
    isSuperUser = false;
    userTemplateId = null;

    memberModuleId = MEM_MODULE_ID;
    secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    searchModel =
        new SearchModel('provmasters/lookup2', ProviderMasterLookup.PROVIDER_MASTER_ALL2, ProviderMasterLookup.PROVIDER_MASTER_DEFAULT2, [], true);


    vendorSearchModel = new SearchModel(
        "vendormasters/lookup",
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );

    taxonomySearchModel = new SearchModel(
        "provcontracttaxonomys/lookup",
        TaxonomyCodeLookup.TAXONOMY_CODE_ALL,
        TaxonomyCodeLookup.TAXONOMY_CODE_DEFAULT,
        []
    );
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    // ---------------------------- Dropdowns
    contractTypeDropdownValues = [];
    lineOfBusinessValues: LineOfBusinessMaster[] = [];
    panelMasters: PanelMaster[] = [];
    ipaMasters: IpaMaster[] = [];
    reasonCodeValues: ReasonCodeMaster[] = [];
    capFundHdrs: CapFundHdr[] = [];
    capFundDtls: CapFundDtl[] = [];
    systemCodesValues: SystemCodes[] = [];
    participationFlagValues: SystemCodes[] = [];
    printRADropdownValues = [];
    taxonomyPrimaryValues = [];
    vendorAddressDropdownValues = new Array<VendorAddress>();
    popupClose: Boolean = false;
    secColDetails = new Array<SecColDetail>();
    @ViewChild('provIdElf') mouseEvent: any;
    provId: any;
    shortName: any;

    // ------------------------------     Inline Grids

    provVendorFormConfig = ProvVendorFormConfig;
    //   defaultVendorFormConfig = new Array<FormField>();

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private provContractService: ProvContractService,
        private provContractSpecialtyService: ProvContractSpecialtyService,
        private securityService: SecurityService,
        private modalService: NgbModal,
        private provContractTaxonomyService: ProvContractTaxonomyService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private dddwDtlService: DddwDtlService,
        private lineOfBusinessService: LineOfBusinessMasterService,
        private provContractVendorService: ProvContractVendorService,
        private vendorAddressService: VendorAddressService,
        private vendorMasterService: VendorMasterService,
        private panelMasterService: PanelMasterService,
        private ipaMasterService: IpaMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private capFundDtlService: CapFundDtlService,
        private capFundHdrService: CapFundHdrService,
        private systemCodesService: SystemCodesService,
        private messageService: MessageMasterDtlService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private provTypeMasterService: ProvTypeMasterService,
        private messageMasterDtlService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private covProvGroupMasterService: CovProvGroupMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {

        this.hasPermission();

    }


    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderContractsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
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

    getNextSeqProvContract() {
        this.provContractService.getSeqProvContract().subscribe((seqID) => {
            this.providerContractsForm.controls['providerId'].setValue(seqID);
            this.providerContractsForm.controls['providerId'].disable();
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
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('PROV_CONTRACT', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializeComponentState(): void {

        this.createForm();
        this.disableDefaultFields();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerContractsForm);
        this.createDataGrid001();


        this.menuInit();
        this.isProgress = false;
        this.getAllDropdowns();

         if (this.providerId) {
             setTimeout(() => {
                 this.providerContractsForm.patchValue({
                   providerId: this.providerId,
                 });
             }, 100);

           this.findBySeqProvId(this.providerId);
         }
    }


    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case 'Provider Master Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            case 'Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.provId = res.PROVIDER_ID;
                this.shortName = res.SHORT_NAME;
                this.providerContractsForm.patchValue({
                    'providerId': res.PROVIDER_ID,
                    'dynamicText': res.SHORT_NAME
                });
                this.seqProvId = res.SEQ_PROV_ID;
                this.findBySeqProvId(res.SEQ_PROV_ID);
            }
        })
    }

    getAllDropdowns() {
        this.getContractTypeValues();
        this.getLineOfBusinessValues();
        this.getPrimaryDropDownValues();
        this.getPanelDropdownValues();
        this.getIPAMasterDropdownValues();
        this.getCapFundHdrDropdownValues();
        this.getCapFundHdrSubModelDropdownValues();
        this.getComCOBAllowedDropdownValues();
        this.getReasonCodeValues();
        this.getPrintRAValues();
        this.getParFlagDropdownValues();

        // specialty grid
        this.getPrimarySpecialtyValues();
        this.getSpecialityTypeDropdownFields();
        this.getBoardStatusRAValues();
        this.getDirIncValues();

        // Taxonomy Grid

        this.getTaxonomySpecialtyValues();
    }

    getProvContracts() {
        this.provContractService.getProvContracts().subscribe(provContracts => {
            this.provContracts = provContracts;

            this.dataGrid001GridOptions.api.setRowData(this.provContracts);
        });
    }

    resetInlineGrid = false;
    resetSpecialityGrid = false;
    resetTaxonomyGrid = false;
    searchStatus: boolean;

    providerContractSelected($event) {
        this.resetForm();


        const selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();

        if (selectedRows.length === 1) {
            this.searchStatus = true;
            this.editProvContract = true;
            this.provContract = selectedRows[0];
            this.dataGrid001GridOptions.api.selectIndex($event.rowIndex, null, null);
            this.findContractSpecialityBySeqProvContract(this.provContract.seqProvContract);
            this.findContractTaxonomyBySeqProvContract(this.provContract.seqProvContract);
            this.findContractVendorBySeqProvContract(this.provContract.seqProvContract);

            this.populateProvContractFormValues();
            this.disableDefaultFields();

        } else {
            this.searchStatus = false;
        }
    }

    checkCovProvGroupMasterValidation() {
        const group = this.providerContractsForm.value.covGroup;
        if (!group) return;
        this.covProvGroupMasterService.getCovProvGroupMaster(group).subscribe((res: CovProvGroupMaster)=> {
            if (!res) {
                this.providerContractsForm.controls['covGroup'].setValue('');
                this.showPopUp(`Cov Group with id ${group} does not exist`, 'Provider Contracts')
            }
        })

    }

    getContractTypeValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.CONTRACT_TYPE, CONSTANTS.DW_PROVC_DE).subscribe((values) => {
            this.contractTypeDropdownValues = values;
            const defaultValue = values.length > 0 ? values.find(value => value.dddwDtlPrimaryKey.dataVal === 'S') : null;

            this.providerContractsForm.patchValue({'defContrType': defaultValue.dddwDtlPrimaryKey.dataVal});
        });
    }

    /**
     * print ra dropdowns values
     */
    getPrintRAValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PRINT_REMIT_ADVICE, CONSTANTS.DW_PROVC_DE).subscribe((values) => {
            this.printRADropdownValues = values;
        });
    }

    primarySpecialtyDropDownValues = [];

    /**
     * ."DW_NAME" = 'dw_provc_spec_de'  ) AND
     ( "HSD_DDDW_HDR"."COLUMN_NAME" = 'primary_specialty' )
     */
    getPrimarySpecialtyValues() {
        this.dddwDtlService.findByColumnNameAndDwname('primary_specialty', 'dw_provc_spec_de').subscribe((values) => {
            this.primarySpecialtyDropDownValues = values;


        });
    }

    primaryTaxonomyDropDownValues = [];

    /**
     * ."DW_NAME" = 'dw_provc_spec_de'  ) AND
     ( "HSD_DDDW_HDR"."COLUMN_NAME" = 'primary_specialty' )
     */
    getTaxonomySpecialtyValues() {
        this.dddwDtlService.findByColumnNameAndDwname('primary', 'dw_provc_txnmy_de').subscribe((values) => {
            this.primaryTaxonomyDropDownValues = values;
        });
    }

    /**
     get dir inc values
     */
    getDirIncValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DIRECTORY_INCLUDE, CONSTANTS.DW_PROV_CONTRACT_VEND_DE).subscribe((values) => {
            this.dirIncDropDownValues = values;

        });
    }

    boardStatusDropDownValues = [];

    /**
     ( (  "HSD_DDDW_HDR"."DW_NAME" = 'dw_provc_spec_de'  ) AND
     ( "HSD_DDDW_HDR"."COLUMN_NAME" = 'board_status' ) AND
     ( "HSD_DDDW_DTL"."LANGUAGE_ID" = :language_id ) )
     */
    getBoardStatusRAValues() {
        this.dddwDtlService.findByColumnNameAndDwname('board_status', 'dw_provc_spec_de').subscribe((values) => {
            this.boardStatusDropDownValues = values;

        });
    }

    /**
     * get Line of business dropdown value
     */
    getLineOfBusinessValues() {
        this.lineOfBusinessService.getLinesOfBusinessMaster().subscribe((values: LineOfBusinessMaster[]) => {
            this.lineOfBusinessValues = values;
            const defaultValue = values.length > 0 ? values.find(value => value.lineOfBusiness === 'USA') : null;

            this.providerContractsForm.patchValue({'lineBus': defaultValue.lineOfBusiness});
            //
        });
    }

    /**
     * get Panel dropdown value
     */
    getPanelDropdownValues() {
        this.panelMasterService.getPanelMasters().subscribe((values: PanelMaster[]) => {
            this.panelMasters = values;
        });
    }

    /**
     * get IPA dropdown value
     */
    getIPAMasterDropdownValues() {
        this.ipaMasterService.getIpaMasters().subscribe((values: IpaMaster[]) => {
            this.ipaMasters = values;
        });
    }


    getReasonCodeValues() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('TM').subscribe(resp => {
            this.reasonCodeValues = resp;
        })
    }


    /**
     * get Cap fund hdr dropdown value
     */
    getCapFundHdrDropdownValues() {
        this.capFundHdrService.getCapFundHdrs().subscribe((values: CapFundHdr[]) => {
            this.capFundHdrs = values;
        });
    }

    /**
     * get Cap fund dtl dropdown value
     */
    getCapFundHdrSubModelDropdownValues() {
        this.capFundDtlService.getCapFundDtls().subscribe((values: CapFundDtl[]) => {
            this.capFundDtls = values;
        });
    }

    /**
     * get ComCOB dropdown value
     */
    getComCOBAllowedDropdownValues() {
        this.systemCodesService.getSystemCodesByLangAndtype('COMALLWAMT', '0').subscribe((values: SystemCodes[]) => {
            this.systemCodesValues = values;

            this.systemCodesValues.map(value => value.systemCodeActive == 'Y');
        });
    }

    /**
     * get Par Flag dropdown value
     */
    getParFlagDropdownValues() {
        this.systemCodesService.getSystemCodesByLangAndtype('PARSTATUS', '0').subscribe((values: SystemCodes[]) => {
            this.participationFlagValues = values;

            this.participationFlagValues.map(value => value.systemCodeActive == 'Y');
        });
    }

    provTypeMasters: ProvTypeMaster[] = [];

    getSpecialityTypeDropdownFields() {
        this.provTypeMasterService.getProvTypeMasters().subscribe((provTypeMasters: ProvTypeMaster[]) => {
            this.provTypeMasters = provTypeMasters;

        });
    }


    /**
     * get Line of business dropdown value
     */
    getPrimaryDropDownValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PRIMARY, CONSTANTS.DW_PROVC_TXNMY_DE).subscribe((values) => {
            this.taxonomyPrimaryValues = values;

            // TODO add this value to dynamic grid primary field, of taxonomy grid
        });
    }

    /**
     * find contract speciality
     * @param seqProvContract
     */
    findContractSpecialityBySeqProvContract(seqProvContract: number) {
        this.provContractSpecialtyService.findBySeqProvContract(seqProvContract).subscribe((values: ProvContractSpecialty[]) => {
            this.provContractSpecialtys = values;

            this.populateSpecialityDynamicForm();
        })
    }


    findContractTaxonomyBySeqProvContract(seqProvContract: number) {
        this.provContractTaxonomyService.findBySeqProvContract(seqProvContract).subscribe((values: ProvContractTaxonomy[]) => {
            this.provContractTaxonomys = values;

            this.populateTaxonomyDynamicForm();

        })
    }

    /**
     * find contract Vendor
     * @param seqProvContract
     */
    findContractVendorBySeqProvContract(seqProvContract: number) {
        this.provContractVendorService.findBySeqProvContract(seqProvContract).subscribe((values: ProvContractVendor[]) => {
            this.provContractVendors = values;


            /**
             * Get Dir Inc and Default address dropdown values
             */

            this.getVendorFieldsDropdown();
        })
    }

    /**
     * @param seqVendorId
     */
    getVendorAddressesByVendorID(seqVendorId?: string) {
        if (!seqVendorId) {
            if (!this.providerContractsForm.value.capVendId) {
                return
            }
            seqVendorId = this.providerContractsForm.value.capVendId
        }
        this.vendorAddressService.findBySeqVendId(seqVendorId).subscribe((addresses: VendorAddress[]) => {
            this.vendorAddressDropdownValues = addresses;

        });
    }

    openVendorMasterLookup(event) {
        if (event.key == 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.vendorSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                this.getVendorAddressesByVendorID(res.seqVendId);
                this.providerContractsForm.patchValue({'capVendId': res.seqVendId})
            });
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Contract')
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
                    this.saveProvContract()
                } else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.providerContractsForm.controls[fieldName].patchValue(fieldValue);
    }

    setFieldValue1(fieldName: string, fieldValue: string | number) {
        let parFlag;
        for (let item of this.participationFlagValues) {
            if (fieldValue === item.systemCode) {
                parFlag = item.systemCode
            }
        }
        this.providerContractsForm.controls[fieldName].patchValue(parFlag);
    }

    seqProvId = null;

    onTabClick(event) {
        if (event.key === 'Tab') {
            this.seqProvId = this.providerContractsForm.value.providerId;
            if (this.seqProvId && this.seqProvId !== '') {
                this.findBySeqProvId(this.seqProvId);
            } else {
                this.emptyPopup()
            }
        } else if (event.key == 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }


    getProvContract(seqProvContract: number) {
        this.provContractService.getProvContract(seqProvContract).subscribe(provContract => {
            this.provContract = provContract;

            this.populateProvContractFormValues();
        });
    }

    findBySeqProvId(seqProvId: any) {
        this.seqProvId = seqProvId;
        this.provContractService.findBySeqProviderId(seqProvId).subscribe((provContracts: ProvContract[]) => {
            if (provContracts.length) {
                provContracts.sort((a, b) => {
                    return a.effectiveDate > b.effectiveDate ? 1 : -1
                })
            }
            this.provContracts = provContracts;
            if (provContracts && provContracts.length > 0) {
                this.providerContractsForm.get('providerId').disable();
                this.provContract = provContracts[0];
                this.editProvContract = true;
                this.dataGrid001GridOptions.api.setRowData(provContracts);
                this.dataGrid001GridOptions.api.selectIndex(0, null, null);
                this.provId = this.provContract.provMaster.providerId;
                this.shortName = this.provContract.provMaster.shortName
                this.populateProvContractFormValues();
            } else {
                this.createNewContractPopup();
            }

        });
    }

    createNewContractPopup() {
        let popMsg = new PopUpMessage(
            'ContractNotExistPopup',
            'Provider Contract',
            'Entered Provider Contract does not exists. Press yes to create a new Contract.',
            'icon'
        );
        // tslint:disable-next-line:max-line-length
        popMsg.buttons = [
            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
            size: 'lg',
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
    }

    popUpButtonClicked(button) {
        if (button.name === 'yes') {
            this.resetForm();
            this.getNextSeqProvContract();
        } else if (button.name === 'no') {

        }
        this.popUpMessage = null;
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    validateTermDate(event: IMyDateModel) {
        const effD = this.providerContractsForm.value.effDate;
        if (event.singleDate && effD) {
            let dateEffecDefault = this.getDate(effD.singleDate);
            let termDate = this.getDate(event.singleDate);

            // =====================================        =============================
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.providerContractsForm.controls['termRsn'].enable();
                } else {
                    this.openDateValidationPopupError(true);
                    this.providerContractsForm.controls['termRsn'].disable();
                }
            } else if (!this.isValidDate(termDate)) {
                this.providerContractsForm.controls['termRsn'].disable();
                this.providerContractsForm.controls['termRsn'].setValue(null);
            }
        } else {
            this.providerContractsForm.controls['termRsn'].disable();
            this.providerContractsForm.controls['termRsn'].setValue(null);
        }
    }


    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    validateEffectiveDate(event: IMyDateModel) {
        const termD = this.providerContractsForm.value.termDate;
        if (!event) {
            return;
        }
        let dateEffecDefault = this.getDate(event.singleDate);
        if (this.isValidDate(dateEffecDefault)) {
            this.providerContractsForm.controls['termDate'].enable();
        }
        if (termD) {

            let termDate = this.getDate(termD.singleDate);
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.providerContractsForm.controls['termRsn'].enable();
                    this.providerContractsForm.controls['termDate'].enable();
                } else {
                    this.openDateValidationPopupError(false);
                    this.providerContractsForm.controls['termRsn'].disable();
                }
            }
        }
    }

    openDateValidationPopupError(isTermDateValidation: boolean) {
        let popMsg

        if (isTermDateValidation) {
            popMsg = new PopUpMessage('Group Contract', 'Error',
                '13027: Termination Date must be greater than Effective Date', 'info', [], MessageType.ERROR);
        } else {
            popMsg = new PopUpMessage('Group Contract', 'Error',
                '13026:Effective Date must be less than Term Date', 'info', [], MessageType.ERROR);
        }
        popMsg.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
    }


    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [
            new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {windowClass: 'custom-error'});
        ref.componentInstance.popupMessage = popUpMessage;
    }


    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createProvContract() {
        if (this.secWin && this.secWin.hasUpdatePermission() || this.isSuperUser) {

            this.formValidation.validateForm();
            if (this.providerContractsForm.valid) {
                const provContract = this.getProvContractsData(new ProvContract());

                this.provContractService.createProvContract(provContract).subscribe(response => {
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                    this.editProvContract = false;
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000)
                    }
                    this.popupClose = false;
                });

            }
        } else {
            this.toastService.showToast('User not permitted to create new', NgbToastType.Success);
        }
    }

    getProvContractsData(provContract: ProvContract) {
        this.providerContractsForm.enable();
        provContract.seqProvId = Form.getValue(this.providerContractsForm, 'seqProviderId');
        provContract.contractType = Form.getValue(this.providerContractsForm, 'defContrType');
        provContract.lineOfBusiness = Form.getValue(this.providerContractsForm, 'lineBus');
        provContract.panelId = Form.getValue(this.providerContractsForm, 'panel');
        provContract.ipaId = Form.getValue(this.providerContractsForm, 'ipa');
        provContract.taxId = Form.getValue(this.providerContractsForm, 'fedTaxId');
        provContract.capFundModelId = Form.getValue(this.providerContractsForm, 'capFundModel');

        provContract.capFundSubModelId = Form.getValue(this.providerContractsForm, 'capFundSubModel');
        provContract.effectiveDate = Form.getDatePickerValue(this.providerContractsForm, 'effDate');
        provContract.termDate = Form.getDatePickerValue(this.providerContractsForm, 'termDate');

        provContract.termReason = Form.getValue(this.providerContractsForm, 'termRsn');
        provContract.filingLimitDays = Form.getValue(this.providerContractsForm, 'filingLimitDays');
        provContract.pcpFlag = Form.getValue(this.providerContractsForm, 'pcpFlag') == true ? 'Y' : 'N';
        provContract.acceptNewPatients = Form.getValue(this.providerContractsForm, 'acceptsNewPat') == true ? 'Y' : 'N';
        provContract.printRemitAdvice = Form.getValue(this.providerContractsForm, 'printRa');
        provContract.acceptMedicareAssignFlag = Form.getValue(this.providerContractsForm, 'mcareAssign') == true ? 'Y' : 'N';
        provContract.participationFlag = Form.getValue(this.providerContractsForm, 'parFlag');
        provContract.userDefined1 = Form.getValue(this.providerContractsForm, 'userDef1');
        provContract.userDefined2 = Form.getValue(this.providerContractsForm, 'userDef2');
        provContract.seqVendId = Form.getValue(this.providerContractsForm, 'capVendId');
        provContract.seqVendAddress = Form.getValue(this.providerContractsForm, 'capVendAddr');
        provContract.seqCovProvGrp = Form.getValue(this.providerContractsForm, 'covGroup');
        provContract.pctAllowed = Form.getValue(this.providerContractsForm, 'comCobAllowed');
        provContract.comCobAlwdAmtRsn = Form.getValue(this.providerContractsForm, 'comCobRsn');
        provContract.excludeIncentive = Form.getValue(this.providerContractsForm, 'exclusiveIncentive') == true ? 'Y' : 'N';
        provContract.excludeAdminFee = Form.getValue(this.providerContractsForm, 'excludeAdminFee') == true ? 'Y' : 'N';

        this.disableDefaultFields();
        return provContract;
    }

    disableDefaultFields() {
        // this.providerContractsForm.controls['lineBus'].disable();
        // this.providerContractsForm.controls['panel'].disable();
        // this.providerContractsForm.controls['ipa'].disable({emitEvent: false});
        // this.providerContractsForm.controls['capFundModel'].disable({emitEvent: false});
        // this.providerContractsForm.controls['capFundSubModel'].disable({emitEvent: false});
        // this.providerContractsForm.controls['effDate'].disable();
    }

    updateProvContract(seqProvContract: number) {
        if (this.secWin && this.secWin.hasUpdatePermission() || this.isSuperUser) {
            this.formValidation.validateForm();
            if (this.providerContractsForm.valid) {
                const provContract = this.getProvContractsData(this.provContract);
                provContract.provMaster = null;
                provContract.vendorAddress = null;
                provContract.vendorMaster = null;

                this.provContractService.updateProvContract(provContract, seqProvContract).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editProvContract = false;
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000)
                    }
                    this.popupClose = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }


    saveProvContract() {
        if (this.editProvContract) {
            this.updateProvContract(this.provContract.seqProvContract)
        } else {
            this.createProvContract();
        }
    }

    resetForm() {
        this.providerContractsForm.enable();
        this.providerContractsForm.reset();

        this.provContract = new ProvContract();

        this.resetContractVendorGrid();
    }

    resetContractVendorGrid() {
        this.providerContractsForm.get('providerId').disable();
        this.providerContractsForm.patchValue({
            'providerId': this.provId,
            'dynamicText': this.shortName,
            'defContrType': 'P',
            'acceptsNewPat': true,
            'printRa' : '1'
        });
        this.resetInlineGrid = true;
        this.resetSpecialityGrid = true;
        this.resetTaxonomyGrid = true;

        this.provContractSpecialityFormState = new Array<DynamicConfigFormRow>();
        this.vendorContractFormState = new Array<DynamicConfigFormRow>();
        this.provContractTaxonomyFormState = new Array<DynamicConfigFormRow>();
        setTimeout(() => {
            this.resetInlineGrid = false;
        }, 50);
    }

    disableDefaultContractFields() {
        this.providerContractsForm.controls['termRsn'].disable();
    }

    deleteProvContract(seqProvContract: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractService.deleteProvContract(seqProvContract).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }


    populateProvContractFormValues() {
        let defContrType, parFlag, printRA;
        for (let item of this.contractTypeDropdownValues) {
            if (item.dddwDtlPrimaryKey.dataVal === this.provContract.contractType) {
                defContrType = item.dddwDtlPrimaryKey.dataVal
            }
        }
        for (let item of this.participationFlagValues) {
            if (this.provContract.participationFlag === item.systemCode) {
                parFlag = item.systemCode
            }
        }
        for (let item of this.printRADropdownValues) {
            if (item.dddwDtlPrimaryKey.dataVal === this.provContract.printRemitAdvice) {
                printRA = item.dddwDtlPrimaryKey.dataVal;
            }
        }

        this.providerContractsForm.get('providerId').disable();
        this.providerContractsForm.patchValue({
            'seqProviderId': this.seqProvId,
            'providerId': this.provContract.provMaster.providerId,
            'dynamicText' : this.shortName,
            'defContrType': defContrType,
            'lineBus': this.provContract.lineOfBusiness? this.provContract.lineOfBusiness : 'USA',
            'panel': this.provContract.panelId,
            'ipa': this.provContract.ipaId,
            'fedTaxId': this.provContract.taxId,
            'capFundModel': this.provContract.capFundModelId,
            'capFundSubModel': this.provContract.capFundSubModelId,
            'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provContract.effectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provContract.termDate),
            'termRsn': this.provContract.termReason,
            'filingLimitDays': this.provContract.filingLimitDays,
            'pcpFlag': this.provContract.pcpFlag != 'N',
            'acceptsNewPat': this.provContract.acceptNewPatients != 'N',
            'printRa': printRA,
            'mcareAssign': this.provContract.acceptMedicareAssignFlag != 'N',
            'parFlag': parFlag,
            'userDef1': this.provContract.userDefined1,
            'userDef2': this.provContract.userDefined2,
            'capVendId': this.provContract.seqVendId,
            'capVendAddr': this.provContract.seqVendAddress,
            'covGroup': this.provContract.seqCovProvGrp,
            'comCobAllowed': this.provContract.pctAllowed,
            'comCobRsn': this.provContract.comCobAlwdAmtRsn,
            'exclusiveIncentive': this.provContract.excludeIncentive != 'N',
            'excludeAdminFee': this.provContract.excludeAdminFee != 'N',
        }, {emitEvent: false});
        setTimeout(() => {
            this.formValueChangeStatus()
        }, 2000)
    }


    createProvContractSpecialty() {
        this.formValidation.validateForm();
        if (this.providerContractsForm.valid) {
            let provContractSpecialty = new ProvContractSpecialty();
            this.provContractSpecialtyService.createProvContractSpecialty(provContractSpecialty).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProvContractSpecialty = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateProvContractSpecialty(seqProvId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.providerContractsForm.valid) {
                let provContractSpecialty = new ProvContractSpecialty();
                this.provContractSpecialtyService.updateProvContractSpecialty(provContractSpecialty, seqProvId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editProvContractSpecialty = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveProvContractSpecialty() {
        if (this.editProvContractSpecialty) {
            this.updateProvContractSpecialty(this.provContractSpecialty.provContractSpecialtyPrimaryKey.seqProvId)
        } else {
            this.createProvContractSpecialty();
        }
    }

    deleteProvContractSpecialty(seqProvId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractSpecialtyService.deleteProvContractSpecialty(seqProvId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProvContractSpecialty(seqProvId: number) {
        this.provContractSpecialtyService.getProvContractSpecialty(seqProvId).subscribe(provContractSpecialty => {
            this.provContractSpecialty = provContractSpecialty;
            this.providerContractsForm.patchValue({});
        });
    }

    getProvContractSpecialtys() {
        this.provContractSpecialtyService.getProvContractSpecialtys().subscribe(provContractSpecialtys => {
            this.provContractSpecialtys = provContractSpecialtys;
        });
    }

    createProvContractTaxonomy() {
        this.formValidation.validateForm();
        if (this.providerContractsForm.valid) {
            let provContractTaxonomy = new ProvContractTaxonomy();
            this.provContractTaxonomyService.createProvContractTaxonomy(provContractTaxonomy).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProvContractTaxonomy = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateProvContractTaxonomy(seqProvId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.providerContractsForm.valid) {
                let provContractTaxonomy = new ProvContractTaxonomy();
                this.provContractTaxonomyService.updateProvContractTaxonomy(provContractTaxonomy, seqProvId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editProvContractTaxonomy = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveProvContractTaxonomy() {
        if (this.editProvContractTaxonomy) {
            this.updateProvContractTaxonomy(this.provContractTaxonomy.provContractTaxonomyPrimaryKey.seqProvId)
        } else {
            this.createProvContractTaxonomy();
        }
    }

    deleteProvContractTaxonomy(seqProvId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractTaxonomyService.deleteProvContractTaxonomy(seqProvId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProvContractTaxonomy(seqProvId: number) {
        this.provContractTaxonomyService.getProvContractTaxonomy(seqProvId).subscribe(provContractTaxonomy => {
            this.provContractTaxonomy = provContractTaxonomy;
            this.providerContractsForm.patchValue({});
        });
    }

    getProvContractTaxonomys() {
        this.provContractTaxonomyService.getProvContractTaxonomys().subscribe(provContractTaxonomys => {
            this.provContractTaxonomys = provContractTaxonomys;
        });
    }

    dataGrid001GridOptionsExportCsv() {
        let params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
            defaultColDef: {
                filter: true, sortable: true, floatingFilter: true
            }
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Def Contr Type',
                field: '',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                valueGetter : (data) => {
                    for (let item of this.contractTypeDropdownValues) {
                        if (item.dddwDtlPrimaryKey.dataVal === data.data.contractType) {
                            return item.dddwDtlPrimaryKey.displayVal;
                        }
                    }
                }
            },
            {
                headerName: 'Line Bus',
                field: '',
                width: 200,
                valueGetter : (data) => {
                    return data.data.lineOfBusiness ? data.data.lineOfBusiness : 'USA'
                }
            },
            {
                headerName: 'Panel',
                field: 'panelId',
                width: 200,
            },
            {
                headerName: 'IPA',
                field: 'ipaId',
                width: 200,
            },
            {
                headerName: 'Eff Date',
                field: 'effectiveDate',
                width: 200,
            },
            {
                headerName: 'Term Date',
                field: 'termDate',
                width: 200,
            },
            {
                headerName: 'Term Rsn',
                field: 'termReason',
                width: 200,
            }
        ];
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerContractsForm = this.formBuilder.group({
            providerId: ['', {updateOn: 'change', validators: []}],
            seqProviderId: ['', {updateOn: 'change', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            defContrType: ['', {
                updateOn: 'change',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            lineBus: ['', {updateOn: 'blur', validators: []}],
            panel: ['', {updateOn: 'blur', validators: []}],
            ipa: ['', {updateOn: 'blur', validators: []}],
            fedTaxId: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            capFundModel: ['', {updateOn: 'blur', validators: []}],
            capFundSubModel: ['', {updateOn: 'blur', validators: []}],
            effDate: ['', {
                updateOn: 'blur',
                validators: [RequiredValidator.cannotContainSpace, Validators.required]
            }],
            termDate: [{value: '', disabled: true}, {updateOn: 'blur', validators: []}],
            termRsn: [{value: ''}, {updateOn: 'blur', validators: []}],
            filingLimitDays: ['', {
                updateOn: 'blur',
                validators: [Validators.minLength(0), Validators.maxLength(9999)]
            }],
            pcpFlag: ['', {updateOn: 'blur', validators: []}],
            acceptsNewPat: ['', {updateOn: 'blur', validators: []}],
            printRa: ['', {updateOn: 'blur', validators: []}],
            mcareAssign: ['', {updateOn: 'blur', validators: []}],
            parFlag: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            userDef1: ['', {updateOn: 'blur', validators: []}],
            userDef2: ['', {updateOn: 'blur', validators: []}],
            capVendId: ['', {updateOn: 'blur', validators: []}],
            capVendAddr: ['', {updateOn: 'blur', validators: []}],
            covGroup: ['', {updateOn: 'blur', validators: []}],
            comCobAllowed: ['', {updateOn: 'blur', validators: []}],
            comCobRsn: ['', {updateOn: 'blur', validators: []}],
            exclusiveIncentive: ['', {updateOn: 'blur', validators: []}],
            excludeAdminFee: ['', {updateOn: 'blur', validators: []}],
            textbox001: ['', {updateOn: 'blur', validators: []}],
            textbox002: ['', {updateOn: 'blur', validators: []}],
            textbox003: ['', {updateOn: 'blur', validators: []}],
            textbox004: ['', {updateOn: 'blur', validators: []}]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.editProvContract = false;
                    this.resetForm();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveProvContract();
                    break;
                }
                case 'Close': {

                    this.activeModal.dismiss();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
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
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Audit Display': {

                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.windowId);
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.windowId;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageMasterDtlService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageMasterDtlService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('30164: ' + message[0].messageText);
                        });
                    }

                    break;
                }

            }
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }
    }

    keyNames;
    keyValues;

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleTopicMenu(action: string) {
        const providerId = this.provContract.provMaster.seqProvId;
        switch (action) {
            case 'Master File': {
                const ref = this.modalService.open(ProviderMasterComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.provContract.seqProvId;
                ref.componentInstance.providerMasterForm.patchValue({'providerId': providerId});
                break;
            }
            case 'Addresses': {
                const ref = this.modalService.open(ProviderAddressComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = providerId;

                break;
            }
            case 'Contracts': {
                const ref = this.modalService.open(ProviderContractsComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerContractsForm.patchValue({'providerId': providerId});
                break;
            }
            case 'Credentials': {
                const ref = this.modalService.open(ProviderCredentialsComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.providerId = providerId;
                ref.componentInstance.showIcon = true;
                break;
            }
            case 'Privileges': {
                this.toastService.showToast('Action is in progress', NgbToastType.Danger);

                // const ref = this.modalService.open(ProviderPrivilegesComponent, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }
            case 'Enrollment': {
                this.toastService.showToast('Action is in progress', NgbToastType.Danger);

                // const ref = this.modalService.open(ProviderEnrollmentRuleComponent, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }


    private handleSpecialMenu(action: string) {
        const providerId = this.provContract.provMaster.seqProvId;
        const seqVendorId = this.provContract.provMaster.seqVendId;
        const vendorProviderId = this.provContract.seqVendId; // TODO need to confirm vendorProvId

        const seqProvContract = this.provContractVendor && this.provContractVendor.provContractVendorPrimaryKey.seqProvContract;
        const seqProvVendId = this.provContractVendor && this.provContractVendor.provContractVendorPrimaryKey.seqProvVendId;
        switch (action) {
            case 'Provider Master Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            case 'Vendor Add': {
                const ref = this.modalService.open(VendorAddressComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.seqVendId = seqVendorId;
                break;
            }
            case 'Claim Hold Codes': {
                const ref = this.modalService.open(MemberClaimHoldCodesComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = providerId;

                break;
            }
            case 'Member Threshold': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                // const ref = this.modalService.open(, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }
            case 'Pharmacy': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                // const ref = this.modalService.open(, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }
            case 'Contract Copy': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                // const ref = this.modalService.open(, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }
            case 'Contract Renew': {
                break;
            }
            case 'DRG/APC Information': {
                const ref = this.modalService.open(DrgInformationComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                break;
            }
            case 'Cov Prov Relationships': {
                const ref = this.modalService.open(ProviderRelationshipComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.vendorProviderId = vendorProviderId;
                break;
            }
            case 'Contract Pricing Details': {
                const ref = this.modalService.open(ContractPricingDetailsComponent, {
                    size: <any>'xl',
                });


                ref.componentInstance.showIcon = true;
                ref.componentInstance.seqProvContract = seqProvContract;
                ref.componentInstance.seqProvVendId = seqProvVendId;
                break;
            }
            case 'Auth Costing': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                break;
            }
            case 'View IPA info': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                break;
            }
            case 'Quality Program Eligibility': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                break;
            }

            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }


    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Master File'},
                    {name: 'Addresses'},
                    {name: 'Contracts'},
                    {name: 'Credentials'},
                    {name: 'Privileges'},
                    {name: 'Enrollment'}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Provider Master Lookup', shortcutKey: 'Ctrl + M'},
                    {name: 'Vendor Add', shortcutKey: 'Ctrl + E'},
                    {name: 'Claim Hold Codes', shortcutKey: 'Ctrl + H'},
                    {name: 'Member Threshold', shortcutKey: 'Ctrl + T'},
                    {name: 'Pharmacy', shortcutKey: 'Ctrl + P'},
                    {name: 'Contract Copy', shortcutKey: 'Ctrl + Y'},
                    {name: 'Contract Renew', shortcutKey: 'Ctrl + R'},
                    {name: 'DRG/APC Information', shortcutKey: 'Ctrl + G'},
                    {name: 'Cov Prov Relationships', shortcutKey: 'Ctrl + L'},
                    {name: 'Contract Pricing Details', shortcutKey: 'Ctrl + D'},
                    {name: 'Auth Costing', shortcutKey: 'Ctrl + A'},
                    {name: 'View IPA info', shortcutKey: 'Ctrl + W'},
                    {name: 'Quality Program Eligibility', shortcutKey: 'Ctrl + Q'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Provider contacts'}
                ]
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
                    {name: 'About Diamond Client/Server'}
                ]
            },
        ];
    }

    // ------------------------- inline form grids
    vendorContractFormState = new Array<DynamicConfigFormRow>();

    onContractVendorFieldChange(event) {

        const field: FormGroup = event.field;
        const formField: FormField = event.formField;
        const defaultValue = field.controls[formField.name].value;

        if (!defaultValue) {
            return;
        }
        if (formField.name == (ProvVendorFieldNames.DEFAULT + event.index)) {
            const dirValue = field.controls[ProvVendorFieldNames.DIR_INC + event.index].value;
            // check dir value and default address are valid

            if (dirValue == defaultValue && dirValue != 'Y') {
                field.controls[formField.name].patchValue('Y');
                this.showPopUp('Dir Inc and Default value could not be same', 'Provider Contract Vendor');
            }
        } else {
            this.vendorMasterService.findVendorMasterByVendorId(defaultValue).subscribe((vendorMaster: VendorMaster) => {
                if (!vendorMaster.seqVendId) {
                    this.showPopUp('Entered Vendor Id not exist', 'Provider Contract')

                    return;
                }
                this.addVendorAddressDropdown(event, vendorMaster.seqVendId);

                this.vendorContractFormState[event.index].id = vendorMaster;

            })
        }


    }

    /**
     * On Adding new vendor record get address fields by entered vendorId
     * @param event {field: FormGroup, formField: FromField, index: number}  index used to set value of specific row
     */
    addVendorAddressDropdown(event, seqVendorId) {

        const field: FormGroup = event.field;
        const formField: FormField = event.formField;

        let vendorId = null;
        try {
            vendorId = field.value[formField.name];

            /**
             * check is the vendor id already exist in the state or not, if exist show error, cannot enter data for same vendor id
             */
            const index = this.vendorContractFormState.findIndex(field => field.id && field.id.vendorId == vendorId);

            if (index > -1) {
                this.showPopUp('8465: The Vendor ID and Vendor Address has already been entered!', 'Provider Contracts');
                field.controls[formField.name].patchValue(''); // remove value
                return
            }

        } catch (e) {
            this.showPopUp('Vendor Id is already added', 'Provider Contract Vendor');
        }
        if (vendorId) {
            this.populateVendorAddressToState(seqVendorId, event.index);
        }

    }

    /**
     * add dynamic addresses to dynamic form
     * @param seqVendorId
     * @param index,  update state of specified row
     */
    populateVendorAddressToState(seqVendorId, index) {
        this.vendorAddressService.findBySeqVendId(seqVendorId).subscribe((addresses: VendorAddress[]) => {
            let addressOptions = new Array<Option>();

            addresses && addresses.length > 0 ? addresses.forEach(vendorAddress => {
                addressOptions.push({key: vendorAddress.addressLine1, value: vendorAddress.addressLine1})
            }) : '';
            this.vendorContractFormState[index].formFields.map((field) => field.name == ProvVendorFieldNames.ADDRESS + index ? field.options = addressOptions : '');
        });
    }

    /**
     * Show lookup for vendor
     * @param event
     */
    showVendorLookupModel(event) {
        try {
            this.provContractTaxonomyFormState = event.prevState;
            const field: FormGroup = event.field;

            const formField: FormField = event.formField;

            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.vendorSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {

                /**
                 * check is the vendor id already exist in the state or not, if exist show error, cannot enter data for same vendor id
                 */
                const index = this.vendorContractFormState.findIndex(field => field.id && field.id.vendorId == res.vendorId);

                if (index > -1) {
                    this.showPopUp('8465: The Vendor ID and Vendor Address has already been entered!', 'Provider Contracts');
                    return
                } else {              // ---------------- insert value of vendor-id in input field
                    this.vendorContractFormState[event.index].formFields.map(field => field.name == formField.name ? field.value = res.vendorId : '');
                    this.vendorContractFormState[event.index].id = res;
                    field.controls[formField.name].patchValue(res.vendorId);
                }

                if (this.vendorContractFormState.length < 1) {
                    this.vendorContractFormState = event.prevState;
                }

                this.populateVendorAddressToState(res.seqVendId, event.index);

            })

        } catch (e) {
            console.log(e);
            this.showPopUp('Vendor Id is not valid', 'Provider Contract Vendor');
        }

    }

    getConfigCopy(config): FormField[] {
        return JSON.parse(JSON.stringify(config));
    }

    /**
     * Get each field address dropdown values for vendor contract
     */
    getVendorAddressesDropdowns() {
        const values = this.provContractVendors;
        if (!values || values.length < 1) {
            return;
        }
        let apiArray = [], addressOptionsArray = [];
        values.forEach((value: ProvContractVendor) => {
            apiArray.push(this.vendorAddressService.findBySeqVendId(value.vendorMaster.seqVendId));
        });

        forkJoin(apiArray).subscribe((apiResponses: Array<any>) => {
            apiResponses.forEach((vendorAddresses: VendorAddress[]) => {          // loop over on all api api's response
                // ------------------------------------- got vendor addresses
                let addressOptions = new Array<Option>()

                vendorAddresses.forEach(vendorAddress => {
                    addressOptions.push({key: vendorAddress.addressLine1, value: vendorAddress.addressLine1})
                });
                addressOptionsArray.push(addressOptions);
            });
            this.populateVendorDynamicForm(addressOptionsArray);
        })

    }

    dirIncDropDownValues = [];

    /**
     * Get Dir Inc and Default address dropdown values
     */
    getVendorFieldsDropdown() {
        // const api1 = this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DIRECTORY_INCLUDE, CONSTANTS.DW_PROV_CONTRACT_VEND_DE);
        const api1 = this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.CDEFAULT_VENDOR_ADDR, CONSTANTS.DW_PROV_CONTRACT_VEND_DE);
        forkJoin([api1]).subscribe((apiResponse: Array<any>) => {
            let dirIncludeOptions = new Array<Option>();
            let addressOptions = new Array<Option>();

            this.dirIncDropDownValues.forEach(value => {
                dirIncludeOptions.push({
                    key: value.dddwDtlPrimaryKey.displayVal,
                    value: value.dddwDtlPrimaryKey.dataVal
                });
            });
            apiResponse.forEach((values: any, index) => {
                values.forEach((value) => {
                    // if (index == 0) {
                    //     dirIncludeOptions.push({
                    //         key: value.dddwDtlPrimaryKey.displayVal,
                    //         value: value.dddwDtlPrimaryKey.dataVal
                    //     });
                    //
                    // } else {
                    addressOptions.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    })
                    // }
                })

            });
            this.provVendorFormConfig.map(field => field.name == ProvVendorFieldNames.DIR_INC ? field.options = dirIncludeOptions : '');
            this.provVendorFormConfig.map(field => field.name == ProvVendorFieldNames.DEFAULT ? field.options = addressOptions : '');
            /**
             * Get each field address dropdown values for vendor contract
             */
            this.getVendorAddressesDropdowns();
        })


    }

    /**
     * form date to grid state
     * @param values
     */
    populateVendorDynamicForm(addressOptionsArray = []) {
        const values = this.provContractVendors;
        if (!values || values.length < 1) {
            return;
        }


        values.forEach((value: ProvContractVendor) => {
            let mockConfig = this.getConfigCopy(this.provVendorFormConfig);    // make a copy of original config
            this.provVendorFormConfig.forEach((field, index) => {
                if (field.name === ProvVendorFieldNames.VENDOR) {
                    mockConfig[index].value = value.vendorMaster.vendorId;
                } else if (field.name === ProvVendorFieldNames.ADDRESS) {
                    mockConfig[index].value = value.vendorAddress.addressLine1;
                } else if (field.name === ProvVendorFieldNames.DIR_INC) {
                    mockConfig[index].value = value.directoryInclude;
                } else if (field.name === ProvVendorFieldNames.DEFAULT) {
                    mockConfig[index].value = value.defaultVendorAddr;
                }

            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            formState.action = null;
            formState.id = {
                seqProvContract: value.provContractVendorPrimaryKey.seqProvContract,
                seqProvId: value.provContractVendorPrimaryKey.seqProvId,
                seqProvVendId: value.provContractVendorPrimaryKey.seqProvVendId,
                vendorId: value.vendorMaster.vendorId,
                seqVendAddress: value.seqVendAddress
            };
            this.vendorContractFormState.push(formState);          // add record
        });

        this.vendorContractFormState.map((record: FormRow, index) => {
            record.formFields.map((field) => field.name == ProvVendorFieldNames.ADDRESS ? field.options = addressOptionsArray[index] : '');
        });
        this.addressDropdowns = addressOptionsArray;


        this.provVendorFormConfig = this.getConfigCopy(this.provVendorFormConfig);

        this.vendorContractFormState = JSON.parse(JSON.stringify(this.vendorContractFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }

    addressDropdowns = [];

    /**
     * Vendor New row added
     */
    onContractVendorNewRowAdded($event) {
        this.provVendorFormConfig.map((field, index) => field.name == ProvVendorFieldNames.ADDRESS ? field.options = this.addressDropdowns[0] : '');
        //     this.getConfigCopy(this.provVendorFormConfig);

    }

    /**
     * save Vendor form
     * @param event
     */
    saveProvVendorContractForm(event: any) {

        this.vendorContractFormState = event.formState;
        event = event.fields;


        let apiUpdatedValues = new Array<Observable<any>>();
        let apiNewValues = new Array<Observable<any>>();
        let addedProvContractVendors = new Array<ProvContractVendor>();
        const updatedRecords: FormRow[] = this.vendorContractFormState.filter(record => record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
            record.action === FORM_FIELD_ACTION_TYPES.DELETE);

        let addressUpdatedRecords = new Array<Observable<any>>();            // Address records that need to be update


        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));

                    /**
                     * set VendorAddress Records
                     */
                    let vendorAddress = new VendorAddress();
                    vendorAddress.seqVendAddress = preStateRecord.id.seqVendAddress;


                    let prevVendorState: ProvContractVendor = this.provContractVendors.find(value =>
                        value.provContractVendorPrimaryKey.seqProvId == preStateRecord.id.seqProvId &&
                        value.provContractVendorPrimaryKey.seqProvVendId == preStateRecord.id.seqProvVendId);


                    let apiValue: VendorForm = this.populateProvVendorField(new VendorForm(prevVendorState, null, null), pair, preStateRecord.action);
                    vendorAddress.addressLine1 = apiValue.addressLine1;
                    vendorAddress.seqVendId = prevVendorState.seqVendId;
                    // set updated address observable

                    addressUpdatedRecords.push(this.vendorAddressService.updateAddressLine(vendorAddress, vendorAddress.seqVendAddress));


                    prevVendorState = apiValue.provContractVendor;
                    apiUpdatedValues.push(this.provContractVendorService.updateProvContractVendor(prevVendorState, prevVendorState.provContractVendorPrimaryKey.seqProvVendId));        // updated Contract vendor with update action
                }
            });
        }


        let addressNewRecords = new Array<Observable<any>>();


        this.vendorContractFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
                let vendorAddress = new VendorAddress(), vendorMaster: VendorMaster = record.id;

                let provContractVendor: ProvContractVendor = new ProvContractVendor();

                vendorAddress.seqVendAddress = this.provContract.seqVendAddress;
                vendorAddress.seqVendId = vendorMaster ? vendorMaster.seqVendId : null;
                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({key: k, value: newRecord[k]}));
                let apiValue: VendorForm = this.populateProvVendorField(new VendorForm(provContractVendor, null, null), pair, FORM_FIELD_ACTION_TYPES.ADD);

                // ----------------------------------------------------------- set vendor address values
                vendorAddress.addressLine1 = apiValue.addressLine1;
                vendorAddress.primaryAddress = 'N';
                // ----------------------------------------------------------- set vendor values

                // set provContract vendor static fields
                provContractVendor.defaultVendorAddr = 'Y';
                provContractVendor.insertProcess = 'PROVC';
                provContractVendor.securityCode = '0';
                provContractVendor.seqVendId = vendorMaster.seqVendId;
                try {
                    provContractVendor.provContractVendorPrimaryKey = {
                        seqProvContract: this.provContract.seqProvContract,
                        seqProvVendId: null,
                        seqProvId: this.provContract.provMaster.seqProvId,
                    }
                } catch (e) {
                    console.log(e);
                }


                addressNewRecords.push(this.vendorAddressService.createVendorAddress(vendorAddress));

                addedProvContractVendors.push(apiValue.provContractVendor);
            }
        });


        // --------------------------------- Update Address records


        forkJoin(addressUpdatedRecords).subscribe(resp => {

        }, error => {
            this.showPopUp(error, 'Vendor Addresses')
        });

        forkJoin(apiUpdatedValues).subscribe(resp => {
            this.showPopUp('Provider Contract Vendor records are updated, ', 'Provider Contract');

        }, error => {
            this.showPopUp(error, 'Vendor Addresses')
        });

        if (addressNewRecords.length < 1) {
            return;
        }

        forkJoin(addressNewRecords).subscribe(resp => {

            resp.forEach((addressModel: VendorAddress, index) => {

                addedProvContractVendors[index].seqVendAddress = addressModel.seqVendAddress                                  // update vendor address
                apiNewValues.push(this.provContractVendorService.createProvContractVendor(addedProvContractVendors[index]))

                // ---------------------- Add new Provider Contract Vendor Records
                forkJoin(apiNewValues).subscribe(resp => {
                    this.toastService.showToast('Records updated Successfully', NgbToastType.Success)
                })
            });


            // ------------------------- Save Contract Vendor Records

        }, error => {
            this.showPopUp(error, 'Vendor Addresses')
        })


    }

    /**
     * populate fields to models
     * @param event
     * @param action
     */
    populateProvVendorField(vendorFormData: VendorForm, event: any, action: FORM_FIELD_ACTION_TYPES): VendorForm {


        vendorFormData.vendorId = event[0].value;
        vendorFormData.addressLine1 = event[1].value;


        vendorFormData.provContractVendor.directoryInclude = event[2].value;
        vendorFormData.provContractVendor.defaultVendorAddr = event[3].value;

        vendorFormData.provContractVendor.action = action;

        return vendorFormData;

    }

    // -------------------------------------------- Speciality grid
    provContractSpecialityFormConfig = ProvContractSpecialityFormConfig;
    provContractSpecialityFormState = new Array<DynamicConfigFormRow>();


    /**
     * form date to grid state
     * @param values
     */
    populateSpecialityDynamicForm() {
        const values = this.provContractSpecialtys;
        if (!values || values.length < 1) {
            return;
        }

        // set dynamic grid dropdown values
        this.provContractSpecialityFormConfig.forEach((field: FormField) => {
            field.options = new Array<Option>();

            if (field.name == ProvContractSpecialityFields.SPECIALITY_TYPE) {
                this.provTypeMasters.forEach(type => {
                    field.options.push({key: type.description, value: type.typeOrSpecialty})
                })
            } else if (field.name == ProvContractSpecialityFields.PRIMARY) {
                this.primarySpecialtyDropDownValues.forEach(value => {
                    field.options.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    });
                });
            } else if (field.name == ProvContractSpecialityFields.DIR_INC) {
                this.dirIncDropDownValues.forEach(value => {
                    field.options.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    });
                });
            } else if (field.name == ProvContractSpecialityFields.BOARD_STATUS) {
                this.boardStatusDropDownValues.forEach(value => {
                    field.options.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    });
                });
            }
        });


        values.forEach((value: ProvContractSpecialty) => {
            let mockConfig = this.getConfigCopy(this.provContractSpecialityFormConfig);    // make a copy of original config
            let formState: FormRow = new FormRow();

            mockConfig.forEach((field, index) => {
                if (field.name === ProvContractSpecialityFields.SPECIALITY_TYPE) {
                    mockConfig[index].value = value.provContractSpecialtyPrimaryKey.specialtyType;
                } else if (field.name === ProvContractSpecialityFields.SPECIALITY_DESC) {
                    // TODO need to set it's default value
                    try {
                        const data = this.provTypeMasters.find(type => type.typeOrSpecialty == value.provContractSpecialtyPrimaryKey.specialtyType);
                        mockConfig[index].value = data ? data.typeOrSpecialty : '';
                    } catch (e) {
                        console.log(e);
                    }

                } else if (field.name === ProvContractSpecialityFields.PRIMARY) {
                    //   primary_specialty: If there is an  existing primary_specialty with value "Y" then change it to "N".

                    mockConfig[index].value = value.primarySpecialty == 'Y' ? 'N' : value.primarySpecialty;
                    formState.action = FORM_FIELD_ACTION_TYPES.UPDATE;
                } else if (field.name === ProvContractSpecialityFields.BOARD_STATUS) {
                    mockConfig[index].value = value.boardStatus;
                } else if (field.name === ProvContractSpecialityFields.DIR_INC) {
                    mockConfig[index].value = value.directoryInclude;
                }
            });


            formState.formFields = mockConfig;
            formState.id = {
                provContractSpecialty: value
            };
            formState.action = null;
            this.provContractSpecialityFormState.push(formState);          // add record
        });

        this.provContractSpecialityFormConfig = this.getConfigCopy(this.provContractSpecialityFormConfig);         // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.provContractSpecialityFormState = JSON.parse(JSON.stringify(this.provContractSpecialityFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }


    /**
     * save Vendor form
     * @param event
     */
    saveProvContractSpecialtyForm(event: any) {

        this.provContractSpecialityFormState = event.formState;
        event = event.fields;

        let apiValues = new Array<ProvContractSpecialty>();

        const updatedRecords: FormRow[] = this.provContractSpecialityFormState.filter(record => record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
            record.action === FORM_FIELD_ACTION_TYPES.DELETE);

        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));

                    let provContractSpecialty: ProvContractSpecialty = preStateRecord.id.provContractSpecialty;
                    provContractSpecialty.provContractSpecialtyPrimaryKey.specialtyType = pair[0].value;

                    let apiValue: ProvContractSpecialty = this.populateProvSpecialtyField(provContractSpecialty, pair, preStateRecord.action);
                    apiValues.push(apiValue);
                }
            });
        }


        this.provContractSpecialityFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
                let provContractSpecialty = new ProvContractSpecialty();

                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({key: k, value: newRecord[k]}));
                provContractSpecialty.provContractSpecialtyPrimaryKey = {
                    specialtyType: pair[0].value,
                    seqProvContract: this.provContract.seqProvContract,
                    seqProvId: this.seqProvId
                }
                let apiValue: ProvContractSpecialty = this.populateProvSpecialtyField(provContractSpecialty, pair, FORM_FIELD_ACTION_TYPES.ADD);

            }
        });


        this.provContractSpecialtyService.addProvContractSpecialtyRecords(apiValues).subscribe((resp) => {
            this.toastService.showToast('Speciality record updated', NgbToastType.Success);

        });

        // --------------------------------- Update Address records

    }

    /**
     * populate fields to models
     * @param event
     * @param action
     */
    populateProvSpecialtyField(provContractSpecialty: ProvContractSpecialty, event: any, action: FORM_FIELD_ACTION_TYPES): ProvContractSpecialty {
        provContractSpecialty.primarySpecialty = event[1].value;

        provContractSpecialty.boardStatus = event[2].value;
        provContractSpecialty.directoryInclude = event[3].value;

        provContractSpecialty.action = action;

        return provContractSpecialty;

    }


    // ----------------------------------------- Taxonomy Grid


    // -------------------------------------------- Speciality grid
    provContractTaxonomyFormConfig = ProvContractTaxonomyFormConfig;
    provContractTaxonomyFormState = new Array<DynamicConfigFormRow>();


    /**
     * form date to grid state
     */
    populateTaxonomyDynamicForm() {

        // set dynamic grid dropdown values
        this.provContractTaxonomyFormConfig.forEach((field: FormField) => {
            field.options = new Array<Option>();

            if (field.name == ProvContractTaxonomyFields.TAXONOMY_CODE) {
                // just a lookup
            } else if (field.name == ProvContractTaxonomyFields.PRIMARY) {
                this.primaryTaxonomyDropDownValues.forEach(value => {
                    field.options.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    });
                });
            }
        });

        const values: ProvContractTaxonomy[] = this.provContractTaxonomys;
        if (!values || values.length < 1) {
            this.provContractTaxonomyFormState = JSON.parse(JSON.stringify(this.provContractTaxonomyFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
            return;
        }

        values.forEach((value: ProvContractTaxonomy) => {
            let mockConfig = this.getConfigCopy(this.provContractTaxonomyFormConfig);    // make a copy of original config
            let formState: FormRow = new FormRow();

            mockConfig.forEach((field, index) => {
                if (field.name === ProvContractTaxonomyFields.TAXONOMY_CODE) {
                    mockConfig[index].value = value.provContractTaxonomyPrimaryKey.taxonomyCode;
                } else if (field.name === ProvContractTaxonomyFields.TYPE_DESC) {
                    // TODO need to set it's default value
                    // const data = this.provTypeMasters.find(type => type.typeOrSpecialty == value.);
                    // mockConfig[index].value = data ? data[0].typeOrSpecialty : '';
                } else if (field.name === ProvContractTaxonomyFields.PRIMARY) {
                    mockConfig[index].value = value.primary
                }
            });


            formState.formFields = mockConfig;
            formState.id = {
                provContractTaxonomy: value
            };
            formState.action = null;

            this.provContractTaxonomyFormState.push(formState);          // add record
        });
        this.provContractTaxonomyFormConfig = this.getConfigCopy(this.provContractTaxonomyFormConfig);         // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.provContractTaxonomyFormState = JSON.parse(JSON.stringify(this.provContractTaxonomyFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }


    /**
     * save Taxonomy form
     * @param event
     */
    saveProvContractTaxonomyForm(event: any) {

        this.provContractTaxonomyFormState = event.formState;
        event = event.fields;
        let apiValues = new Array<ProvContractTaxonomy>();

        const updatedRecords: FormRow[] = this.provContractTaxonomyFormState.filter(record => record.action === FORM_FIELD_ACTION_TYPES.UPDATE ||
            record.action === FORM_FIELD_ACTION_TYPES.DELETE);

        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));

                    let provContractTaxonomy: ProvContractTaxonomy
                    if (preStateRecord.id && preStateRecord.id.provContractTaxonomy) {
                        provContractTaxonomy = preStateRecord.id.provContractTaxonomy;
                        provContractTaxonomy.provContractTaxonomyPrimaryKey.taxonomyCode = pair[0].value;   // if prevState data set by backend
                    } else {
                        provContractTaxonomy.provContractTaxonomyPrimaryKey = {
                            seqProvContract: this.provContract.seqProvContract,
                            seqProvId: this.seqProvId,
                            taxonomyCode: pair[0].value
                        }
                    }


                    provContractTaxonomy.primary = pair[1].value;
                    provContractTaxonomy.action = preStateRecord.action;
                    apiValues.push(provContractTaxonomy);
                }
            });
        }


        this.provContractTaxonomyFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
                let provContractTaxonomy = new ProvContractTaxonomy();

                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({key: k, value: newRecord[k]}));

                provContractTaxonomy.provContractTaxonomyPrimaryKey = {
                    seqProvContract: this.provContract.seqProvContract,
                    seqProvId: this.seqProvId,
                    taxonomyCode: pair[0].value
                }
                provContractTaxonomy.action = FORM_FIELD_ACTION_TYPES.ADD


                provContractTaxonomy.primary = pair[1].value;

                apiValues.push(provContractTaxonomy);

            }
        });


        apiValues.forEach((provContractTaxonomy: ProvContractTaxonomy) => {
            if (provContractTaxonomy.action == FORM_FIELD_ACTION_TYPES.ADD) {
                delete provContractTaxonomy.action;
                this.provContractTaxonomyService.createProvContractTaxonomy(provContractTaxonomy).subscribe(data => {
                    this.toastService.showToast('Record added successfully', NgbToastType.Success)
                })
            } else if (provContractTaxonomy.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
                delete provContractTaxonomy.action;

                this.provContractTaxonomyService.updateProvContractTaxonomy(provContractTaxonomy, this.seqProvId).subscribe(data => {
                    this.toastService.showToast('Record updated successfully', NgbToastType.Success)

                })
            }

        });


    }


    /**
     showTaxonomyLookupModel
     * @param event
     */
    showTaxonomyLookupModel(event) {
        try {

            this.provContractTaxonomyFormState = event.prevState;
            const field: FormGroup = event.field;

            const formField: FormField = event.formField;

            let ref = this.modalService.open(SearchboxComponent);
            this.taxonomySearchModel.searchOption = [{'seqProvContract': this.provContract.seqProvContract}]
            this.taxonomySearchModel.isMatch = true;
            ref.componentInstance.searchModel = this.taxonomySearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {

                /**
                 * check is the  id already exist in the state or not, if exist show error, cannot enter data for same  id
                 */


                const index = this.provContractTaxonomyFormState.findIndex(field => field.id && field.id.taxonomyCode.provContractTaxonomyPrimaryKey.taxonomyCode == res);

                if (index > -1) {
                    this.showPopUp(' ID already been entered!', 'Provider Contracts');
                    return
                } else {              // ---------------- insert value of vendor-id in input field
                    this.provContractTaxonomyFormState[event.index].id = res;
                    field.controls[formField.name].patchValue(res.TAXONOMY_CODE);
                }
            })

        } catch (e) {
            console.log(e);
            this.showPopUp(' Id is not valid', 'Provider Contract Taxonomy');
        }

    }

    emptyPopup = () => {
        this.messageService.findByMessageId(8076).subscribe(res => {
            if (!res) {
                return;
            }
            let popUpMessage = new PopUpMessage(
                'poUpMessageName',
                'Provider Contracts',
                '8076: ' + res[0].messageText,
                'icon');
            popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-danger')];
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            this.mouseEvent.nativeElement.focus();
        })
    };

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'PROVC_Provider_Contracts.htm';
    };

    formValueChangeStatus = () => {
        this.providerContractsForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
