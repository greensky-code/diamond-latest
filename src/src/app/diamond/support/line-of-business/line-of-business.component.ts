/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {Country, MessageMasterDtl, SecUser, SecWin, SystemCodes} from '../../../api-models';
import {MEM_MODULE_ID} from '../../../shared/app-constants';
import {SecurityService} from '../../../shared/services/security.service';
import {
    DddwDtlService,
    LineOfBusinessMasterService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {LineOfBusinessMaster} from '../../../api-models/line-of-business-master.model';
import {Form} from '../../../shared/helpers/form.helper';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DynamicConfigFormRow, FormRow, Menu, Option, SearchModel} from '../../../shared/models/models';
import {LineOFBLookup} from '../../../shared/lookup/line-of-business-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {SearchService} from '../../../shared/services/search.service';
import {LinbsContractSearchService} from '../../../api-services/support/linbs-contract-search.service';
import {LinbsContractSearch} from '../../../api-models/support/linbs-contract-search.model';
import {LinbContractSearchesFields, LinbContractSearchesFormConfig} from '../../../shared/models/constants';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {CountryService} from '../../../api-services/country.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {CONSTANTS, getLOBShortcutKeys} from '../../../shared/services/shared.service';
import {SupportHelpComponent} from '../support-help/support-help.component';
import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {TimestampComponent} from '../../../shared/components/timestamp/timestamp.component';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import { PcpaaSupportInfoDetailsComponent } from '../pcpaa-support-info-details/pcpaa-support-info-details.component';
import { PcpAutoAssignComponent } from '../pcp-auto-assign/pcp-auto-assign.component';
import { ClaimInterestCalcRulesComponent } from '../claim-interest-calc.-rules/claim-interest-calc.-rules.component';
import { ClaimDiscountCalcRulesComponent } from '../claim-discount-calc.-rules/claim-discount-calc.-rules.component';
import { PreExistingConditionRulesComponent } from '../pre-existing-condition-rules/pre-existing-condition-rules.component';

// Use the Component directive to define the LineOfBusinessComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'lineofbusiness',
    templateUrl: './line-of-business.component.html',

})
export class LineOfBusinessComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() lineOfBusinessId: string;
    lineOfBusinessForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    description = '';
    menuOpened = ''
    keyValues: number;
    searchStatus = false;
    keyNames: string = "lineOfBusiness";
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    LobSearchModal = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        [],
        false,
        false
    );
    userTemplateId

    memberModuleId = MEM_MODULE_ID;


    linbsContractSearchesFormState = new Array<DynamicConfigFormRow>();
    formConfig = LinbContractSearchesFormConfig;
    resetInlineGrid = false;
    contractTypeValues = [];
    public menu: Menu[] = [];
    displayedDataStatus: Boolean = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private searchService: SearchService,
        private secUserService: SecUserService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private linbsContractSearchService: LinbsContractSearchService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        public activeModal: NgbActiveModal,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private countryService: CountryService,
        private systemCodesService: SystemCodesService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private router: Router) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getLOBShortcutKeys(this));
        this.cdr.detectChanges();
    }


    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
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

    secColDetails = new Array<SecColDetail>();

    resetForm() {
        this.description = '';
        this.resetInlineGrid = true;
        setTimeout(() => {
            this.resetInlineGrid = false;
        }, 20);
        this.lineOfBusinessForm.enable();
        this.lineOfBusinessForm.reset();
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
            .findByTableNameAndUserId('LINE_OF_BUSINESS', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.secProgress = false;

            } else {
                this.showPopUp('You are not Permitted to view MEMBER Master', 'Member Master Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }


    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.menuInit();
        this.getAllDropDownValues();
        this.formValidation = new FormValidation(this.lineOfBusinessForm);
        if (this.lineOfBusinessId) {
            this.getLineOfBusinessMaster(this.lineOfBusinessId);
        }
    }


    lookupLOB(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.LobSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.lineOfBusinessForm.get('lineOfBusinessLb').setValue(res.lineOfBusiness);
                    this.lineOfBusinessForm.get('lineOfBusinessLb').disable();
                    this.getLineOfBusinessMaster(res.lineOfBusiness);
                }
            });
        } else if (event.key === 'Tab') {
            const lob = event.target.value;
            let res = [{'lineOfBusiness': lob}];
            let sm = JSON.parse(JSON.stringify(this.LobSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.lineOfBusinessForm.get('lineOfBusinessLb').setValue(null);
                    return;
                } else {
                    this.lineOfBusinessForm.get('lineOfBusinessLb').disable();
                }
            });
            this.getLineOfBusinessMaster(lob);
        }
    }

    linbsContractSearches: LinbsContractSearch[] = [];
    linbsContractSearch: LinbsContractSearch;

    getLOBSearchContractSearch(lob: string) {
        this.linbsContractSearchService.getLinbsContractSearch(lob).subscribe((linbsContractSearche: LinbsContractSearch[]) => {
            this.linbsContractSearches = linbsContractSearche;
            this.populateVendorDynamicForm();


        });
    }

    countries: Country[] = [];

    getCountries() {
        this.countryService.getCountrys().subscribe((countries: Country[]) => {
            this.countries = countries;
        });
    }

    getAllDropDownValues() {
        this.getContractTypeDropdownValue();

        this.getCountries();
        this.getpricePriorityRuleDropdownValues();
        this.gettargetRevActionDropdownValues();
        this.getContractTypeDropdownValue();
        this.getWaiveMatchOrderDropdownValues();
        this.getpenApplUncleanIndDropdownValues();
        this.getPCPReqDropdownValue();
        this.getInterestDeterminantDropdownValue();
        this.getpaySubDropdownValue();
        this.getInclmSwitchDropdownValue();
        this.getcalcIntDscntDropdownValue();
        this.getunCleanIndDropdownValue();

        this.getAuthLevelDropdownValues();
        this.getFamAffiliationDropdownValues();
        this.getDateOfDeathRuleDropdownValues();
    }

    pcpReqDropdownValues = [];

    /**
     *      ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'pcp_required' ) and
     */
    getPCPReqDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('pcp_required', 'dw_linbs_de').subscribe((values) => {
            this.pcpReqDropdownValues = values;
        });
    }


    unCleanIndDropdownValues = [];

    /**
     *         ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and( HSD_DDDW_HDR.COLUMN_NAME = 'apply_unclean_ind' ) and
     */
    getunCleanIndDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('apply_unclean_ind', 'dw_linbs_de').subscribe((values) => {
            this.unCleanIndDropdownValues = values;
        });
    }


    calcIntDscntDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'calc_int_dscnt' ) and
     */
    getcalcIntDscntDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('calc_int_dscnt', 'dw_linbs_de').subscribe((values) => {
            this.calcIntDscntDropdownValues = values;
        });
    }

    inclmSwitchDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'inclm_switch' ) and
     */
    getInclmSwitchDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('inclm_switch', 'dw_linbs_de').subscribe((values) => {
            this.inclmSwitchDropdownValues = values;
        });
    }

    paySubDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'int_dscnt_pay_sub' ) and
     */
    getpaySubDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('int_dscnt_pay_sub', 'dw_linbs_de', 0).subscribe((values) => {
            this.paySubDropdownValues = values;

        });
    }

    paySubDropddownValues = [];

    /**
     'dw_linbs_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'waive_match_order
     */
    getpaySubDropddownValue() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('int_dscnt_pay_sub', 'dw_linbs_de', 0).subscribe((values) => {
            this.paySubDropdownValues = values;

        });
    }


    interestDeterminantDropdownValues = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'interest_determinant' ) and
     */
    getInterestDeterminantDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('interest_determinant', 'dw_linbs_de').subscribe((values) => {
            this.interestDeterminantDropdownValues = values;
        });
    }


    penApplUncleanIndDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'pen_apply_unclean_ind' ) and
     */
    getpenApplUncleanIndDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('pen_apply_unclean_ind', 'dw_linbs_de').subscribe((values) => {
            this.penApplUncleanIndDropdownValues = values;
        });
    }


    pricePriorityRuleDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'price_priority_rule' ) and
     */
    getpricePriorityRuleDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('price_priority_rule', 'dw_linbs_de').subscribe((values) => {
            this.pricePriorityRuleDropdownValues = values;
        });
    }

    targetRevActionDropdownValues = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'target_rev_action' ) and
     */
    gettargetRevActionDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('target_rev_action', 'dw_linbs_de').subscribe((values) => {
            this.targetRevActionDropdownValues = values;
        });
    }

    waiveMatchOrderDropdownValues = [];

    /**
     //       ( (  HSD_DDDW_HDR.DW_NAME = 'dw_linbs_de'  ) and
     //       ( HSD_DDDW_HDR.COLUMN_NAME = 'waive_match_order' ) and
     */
    getWaiveMatchOrderDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('waive_match_order', 'dw_linbs_de').subscribe((values) => {
            this.waiveMatchOrderDropdownValues = values;
        });
    }

    authLevelDropdownValues: SystemCodes[] = [];

    /**
     * get dropdown values of auth level
     */
    getAuthLevelDropdownValues() {
        this.systemCodesService.findBySystemCodeTypeAndSystemCodeActive('AUTHLEVEL', 'Y').subscribe((values: SystemCodes[]) => {
            this.authLevelDropdownValues = values;
        })
    }

    familyAffiliationDropdownValues: SystemCodes[] = [];

    /**
     * get dropdown values of Family Affiliation
     */
    getFamAffiliationDropdownValues() {
        this.systemCodesService.findBySystemCodeTypeAndSystemCodeActive('FAMAFFILIATION', 'Y').subscribe((values: SystemCodes[]) => {
            this.familyAffiliationDropdownValues = values;
        })
    }

    dateOfDeathRuleDropdownValues: SystemCodes[] = [];

    /**
     * get dropdown values of dateOfDeathRule
     */
    getDateOfDeathRuleDropdownValues() {
        this.systemCodesService.findBySystemCodeTypeAndSystemCodeActive('DODRULE', 'Y').subscribe((values: SystemCodes[]) => {
            this.familyAffiliationDropdownValues = values;
        })
    }

// new drop
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
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    editLineOfBusinessMaster: boolean;
    lineOfBusinessMaster: LineOfBusinessMaster;
    linesOfBusinessMasters: LineOfBusinessMaster[];

    createLineOfBusinessMaster() {
        this.formValidation.validateForm();
        if (this.lineOfBusinessForm.valid) {
            let lineOfBusinessMaster = this.getFormData(new LineOfBusinessMaster());

            this.lineOfBusinessMasterService.createLineOfBusinessMaster(lineOfBusinessMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editLineOfBusinessMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    updateLineOfBusinessMaster(lineOfBusiness: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.lineOfBusinessForm.valid) {
                let lineOfBusinessMaster = this.getFormData(new LineOfBusinessMaster());

                this.lineOfBusinessMasterService.updateLineOfBusinessMaster(lineOfBusinessMaster, lineOfBusiness).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editLineOfBusinessMaster = false;
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

    getFormData(lineOfBusinessMaster: LineOfBusinessMaster) {
        lineOfBusinessMaster.lineOfBusiness = Form.getValue(this.lineOfBusinessForm, 'lineOfBusinessLb');
        lineOfBusinessMaster.name = Form.getValue(this.lineOfBusinessForm, 'name');
        lineOfBusinessMaster.country = Form.getValue(this.lineOfBusinessForm, 'country');
        lineOfBusinessMaster.addressLine1 = Form.getValue(this.lineOfBusinessForm, 'addrLine1');
        lineOfBusinessMaster.zipCode = Form.getValue(this.lineOfBusinessForm, 'zipCode');
        lineOfBusinessMaster.addressLine2 = Form.getValue(this.lineOfBusinessForm, 'addrLine2');
        lineOfBusinessMaster.phoneNumber = Form.getValue(this.lineOfBusinessForm, 'phoneNumber');
        lineOfBusinessMaster.city = Form.getValue(this.lineOfBusinessForm, 'city');
        lineOfBusinessMaster.state = Form.getValue(this.lineOfBusinessForm, 'state');
        lineOfBusinessMaster.faxNumber = Form.getValue(this.lineOfBusinessForm, 'faxNumber');
        lineOfBusinessMaster.pcpRequired = Form.getValue(this.lineOfBusinessForm, 'pcpRequired');
        lineOfBusinessMaster.performAuthClaimMatch = Form.getValue(this.lineOfBusinessForm, 'authclaimsMatch');
        lineOfBusinessMaster.applyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'mcPlanInd');
        lineOfBusinessMaster.useApcEditor = Form.getValue(this.lineOfBusinessForm, 'depEdit');
        lineOfBusinessMaster.allowedGreaterThanBilled = Form.getValue(this.lineOfBusinessForm, 'allowedBilled');
        lineOfBusinessMaster.authClaimMatchDaysBefore = Form.getValue(this.lineOfBusinessForm, 'covprovDaysBefore');
        lineOfBusinessMaster.eobPrintFlag = Form.getValue(this.lineOfBusinessForm, 'cobPrintFlag');
        lineOfBusinessMaster.claimDupRule = Form.getValue(this.lineOfBusinessForm, 'dddRule');
        lineOfBusinessMaster.authClaimMatchDaysAfter = Form.getValue(this.lineOfBusinessForm, 'covprovDaysAfter');
        lineOfBusinessMaster.performAuthWaive = Form.getValue(this.lineOfBusinessForm, 'performAuthWaive');
        lineOfBusinessMaster.waiveMatchOrder = Form.getValue(this.lineOfBusinessForm, 'inclmOrder');
        lineOfBusinessMaster.coveringProvInd = Form.getValue(this.lineOfBusinessForm, 'coveringProv');
        lineOfBusinessMaster.authLevel = Form.getValue(this.lineOfBusinessForm, 'waiveAuthLevel');
        lineOfBusinessMaster.parReasonCode = Form.getValue(this.lineOfBusinessForm, 'parReasonCode');
        lineOfBusinessMaster.nonParReasonCode = Form.getValue(this.lineOfBusinessForm, 'nonParReasonCode');
        lineOfBusinessMaster.useApcPricer = Form.getValue(this.lineOfBusinessForm, 'waiveMatchOrder');
        lineOfBusinessMaster.siteFlg = Form.getValue(this.lineOfBusinessForm, 'siteReq');
        lineOfBusinessMaster.ageFrom = Form.getValue(this.lineOfBusinessForm, 'ageFrom');
        lineOfBusinessMaster.ageThrough = Form.getValue(this.lineOfBusinessForm, 'ageThrough');
        lineOfBusinessMaster.indPcpMaxEnrollLmt = Form.getValue(this.lineOfBusinessForm, 'pcplinbsMxenrollmt');
        lineOfBusinessMaster.seqFailPcp = Form.getValue(this.lineOfBusinessForm, 'defaultPcp');
        lineOfBusinessMaster.idcardReinstDays = Form.getValue(this.lineOfBusinessForm, 'idCardReinstDays');
        lineOfBusinessMaster.indPcpThreshold = Form.getValue(this.lineOfBusinessForm, 'indPcplinbsThreshold');
        lineOfBusinessMaster.familyAffiliation = Form.getValue(this.lineOfBusinessForm, 'familyAffliation');
        lineOfBusinessMaster.calcIntDscnt = Form.getValue(this.lineOfBusinessForm, 'calcDiscIntrpnlty');
        lineOfBusinessMaster.useResetDateFlag = Form.getValue(this.lineOfBusinessForm, 'useResetDate');
        lineOfBusinessMaster.insertDatetime = Form.getValue(this.lineOfBusinessForm, 'intrDetMethod');
        lineOfBusinessMaster.applyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'applyUnlceanIndInterest');
        lineOfBusinessMaster.penApplyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'applyUnlceanIndInterest');
        lineOfBusinessMaster.userDefined1 = Form.getValue(this.lineOfBusinessForm, 'userDefined1');
        lineOfBusinessMaster.userDefined2 = Form.getValue(this.lineOfBusinessForm, 'userDefined2');
        lineOfBusinessMaster.userDate1 = Form.getValue(this.lineOfBusinessForm, 'userDate1');
        lineOfBusinessMaster.userDate2 = Form.getValue(this.lineOfBusinessForm, 'userDate2');

        return lineOfBusinessMaster;
    }

    saveLineOfBusinessMaster() {
        if (this.editLineOfBusinessMaster) {
            this.updateLineOfBusinessMaster(this.lineOfBusinessMaster.lineOfBusiness)
        } else {
            this.createLineOfBusinessMaster();
        }
    }

    deleteLineOfBusinessMaster(lineOfBusiness: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.lineOfBusinessMasterService.deleteLineOfBusinessMaster(lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getLineOfBusinessMaster(lineOfBusiness: string) {
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBusiness).subscribe(lineOfBusinessMaster => {
            this.lineOfBusinessMaster = lineOfBusinessMaster;
            this.displayedDataStatus = true;
            this.resetInlineGrid = true;
            setTimeout(() => {
                this.resetInlineGrid = false;
            }, 10);

            this.setFormData();

            this.getLOBSearchContractSearch(lineOfBusiness);

        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    setFormData() {
        this.description = this.lineOfBusinessMaster.description;
        this.lineOfBusinessForm.patchValue({
            'lineOfBusinessLb': this.lineOfBusinessMaster.lineOfBusiness,
            'textbox003': this.lineOfBusinessMaster.description,
            'name': this.lineOfBusinessMaster.name,
            'country': this.lineOfBusinessMaster.country,
            'addrLine1': this.lineOfBusinessMaster.addressLine1,
            'zipCode': this.lineOfBusinessMaster.zipCode,
            'addrLine2': this.lineOfBusinessMaster.addressLine2,
            'phoneNumber': this.lineOfBusinessMaster.phoneNumber,
            'city': this.lineOfBusinessMaster.city,
            'state': this.lineOfBusinessMaster.state,
            'faxNumber': this.lineOfBusinessMaster.faxNumber,
            'pcpRequired': this.lineOfBusinessMaster.pcpRequired && this.pcpReqDropdownValues ?
                this.pcpReqDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.pcpRequired).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.pcpRequired,


            'authclaimsMatch': this.lineOfBusinessMaster.performAuthClaimMatch == 'Y',
            'mcPlanInd': this.lineOfBusinessMaster.mcIndicator == 'Y',         // TODO changing -----------------        applyUncleanInd,m             useApcEditor
            'depEdit': this.lineOfBusinessMaster.subDepEditSwitch == 'Y', // TODO changing ----------          useApcEditor
            'allowedBilled': this.lineOfBusinessMaster.allowedGreaterThanBilled == 'Y',          // TODO changing ----------          useApcEditor
            'covprovDaysBefore': this.lineOfBusinessMaster.authClaimMatchDaysBefore,
            'cobPrintFlag': this.lineOfBusinessMaster.eobPrintFlag == 'Y',
            'dddRule': this.lineOfBusinessMaster.claimDupRule,
            'covprovDaysAfter': this.lineOfBusinessMaster.authClaimMatchDaysAfter,
            'performAuthWaive': this.lineOfBusinessMaster.performAuthWaive,

            'inclmOrder': this.lineOfBusinessMaster.inclmSwitch && this.inclmSwitchDropdownValues ?
                this.inclmSwitchDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.inclmSwitch).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.inclmSwitch,

            'paySubdep': this.lineOfBusinessMaster.intDscntPaySub && this.paySubDropdownValues ?
                this.paySubDropdownValues.find((option: Option) => option.value == this.lineOfBusinessMaster.intDscntPaySub).key :
                this.lineOfBusinessMaster.intDscntPaySub,


            'primaryPriceSearch': this.lineOfBusinessMaster.pricePriorityRule && this.pricePriorityRuleDropdownValues ?
                this.pricePriorityRuleDropdownValues.find(value => value && value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.pricePriorityRule).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.pricePriorityRule,


            'coveringProv': this.lineOfBusinessMaster.coveringProvInd,
            'waiveAuthLevel': this.lineOfBusinessMaster.authLevel && this.authLevelDropdownValues ?
                this.authLevelDropdownValues.find(value => value && value.systemCodesPrimaryKey.systemCode == this.lineOfBusinessMaster.authLevel).systemCodesPrimaryKey.systemCodeType :
                this.lineOfBusinessMaster.authLevel,
            'parReasonCode': this.lineOfBusinessMaster.parReasonCode,
            'nonParReasonCode': this.lineOfBusinessMaster.nonParReasonCode,
            'waiveMatchOrder': this.lineOfBusinessMaster.waiveMatchOrder && this.waiveMatchOrderDropdownValues ?
                this.waiveMatchOrderDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.waiveMatchOrder).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.waiveMatchOrder,


            'siteReq': this.lineOfBusinessMaster.siteFlg == 'Y',
            'ageFrom': this.lineOfBusinessMaster.ageFrom,
            'ageThrough': this.lineOfBusinessMaster.ageThrough,
            'pcplinbsMxenrollmt': this.lineOfBusinessMaster.indPcpMaxEnrollLmt,
            'defaultPcp': this.lineOfBusinessMaster.seqFailPcp,
            'idCardReinstDays': this.lineOfBusinessMaster.idcardReinstDays,
            'indPcplinbsThreshold': this.lineOfBusinessMaster.indPcpThreshold ? this.lineOfBusinessMaster.indPcpThreshold * 100 + '%' : '',
            'familyAffliation': this.lineOfBusinessMaster.familyAffiliation === 'S' ? 'S-Subscriber' : 'U-User Defined',

            'calcDiscIntrpnlty': this.lineOfBusinessMaster.calcIntDscnt && this.calcIntDscntDropdownValues ?
                this.calcIntDscntDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.calcIntDscnt).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.calcIntDscnt,

            'useResetDate': this.lineOfBusinessMaster.useResetDateFlag == 'Y',

            'intrDetMethod': this.lineOfBusinessMaster.interestDeterminant && this.interestDeterminantDropdownValues ?
                this.interestDeterminantDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.interestDeterminant).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.interestDeterminant,

            'applyUnlceanIndInterest': this.lineOfBusinessMaster.applyUncleanInd && this.unCleanIndDropdownValues ?
                this.unCleanIndDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.applyUncleanInd).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.applyUncleanInd,
            'applyUnlceanIndPenalty': this.lineOfBusinessMaster.penApplyUncleanInd && this.penApplUncleanIndDropdownValues ?
                this.penApplUncleanIndDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.lineOfBusinessMaster.penApplyUncleanInd).dddwDtlPrimaryKey.displayVal :
                this.lineOfBusinessMaster.penApplyUncleanInd,
            'userDefined1': this.lineOfBusinessMaster.userDefined1,
            'userDefined2': this.lineOfBusinessMaster.userDefined2,
            'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.lineOfBusinessMaster.userDate1),
            'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.lineOfBusinessMaster.userDate1),
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified();
        }, 2000)
        this.lineOfBusinessForm.get('waiveMatchOrder').disable();
        this.lineOfBusinessForm.get('ageFrom').disable();
        this.lineOfBusinessForm.get('ageThrough').disable();

        try {
            const familyAff = this.familyAffiliationDropdownValues.find(value => value && value.systemCodesPrimaryKey.systemCode ==
                this.lineOfBusinessMaster.familyAffiliation);
            if (familyAff) {
                this.lineOfBusinessForm.controls['familyAffliation'].setValue(familyAff.systemCodesPrimaryKey.systemCode);
            }
        } catch (e) {
            console.log(e);
        }
    }

    getLinesOfBusinessMaster() {
        this.lineOfBusinessMasterService.getLinesOfBusinessMaster().subscribe((linesOfBusinessMaster: LineOfBusinessMaster[]) => {
            this.linesOfBusinessMasters = linesOfBusinessMaster;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.lineOfBusinessForm = this.formBuilder.group({
            lineOfBusinessLb: ['', {updateOn: 'blur', validators: []}],
            name: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: []}],
            addrLine1: ['', {updateOn: 'blur', validators: []}],
            zipCode: ['', {updateOn: 'blur', validators: []}],
            addrLine2: ['', {updateOn: 'blur', validators: []}],
            phoneNumber: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            faxNumber: ['', {updateOn: 'blur', validators: []}],
            pcpRequired: ['', {updateOn: 'blur', validators: []}],
            authclaimsMatch: ['', {updateOn: 'blur', validators: []}],
            mcPlanInd: ['', {updateOn: 'blur', validators: []}],
            depEdit: ['', {updateOn: 'blur', validators: []}],
            allowedBilled: ['', {updateOn: 'blur', validators: []}],
            primaryPriceSearch: ['', {updateOn: 'blur', validators: []}],
            covprovDaysBefore: ['', {updateOn: 'blur', validators: []}],
            cobPrintFlag: ['', {updateOn: 'blur', validators: []}],
            dddRule: ['', {updateOn: 'blur', validators: []}],
            claimDupRule: ['', {updateOn: 'blur', validators: []}],
            covprovDaysAfter: ['', {updateOn: 'blur', validators: []}],
            performAuthWaive: ['', {updateOn: 'blur', validators: []}],
            inclmOrder: ['', {updateOn: 'blur', validators: []}],
            coveringProv: ['', {updateOn: 'blur', validators: []}],
            waiveAuthLevel: ['', {updateOn: 'blur', validators: []}],
            parReasonCode: ['', {updateOn: 'blur', validators: []}],
            nonParReasonCode: ['', {updateOn: 'blur', validators: []}],
            waiveMatchOrder: ['', {updateOn: 'blur', validators: []}],
            siteReq: ['', {updateOn: 'blur', validators: []}],
            cert: ['', {updateOn: 'blur', validators: []}],
            ageFrom: ['', {updateOn: 'blur', validators: []}],
            ageThrough: ['', {updateOn: 'blur', validators: []}],
            pcplinbsMxenrollmt: ['', {updateOn: 'blur', validators: []}],
            defaultPcp: ['', {updateOn: 'blur', validators: []}],
            idCardReinstDays: ['', {updateOn: 'blur', validators: []}],
            indPcplinbsThreshold: ['', {updateOn: 'blur', validators: []}],
            noAutoPcpFound: ['', {updateOn: 'blur', validators: []}],
            familyAffliation: ['', {updateOn: 'blur', validators: []}],
            calcDiscIntrpnlty: ['', {updateOn: 'blur', validators: []}],
            useResetDate: ['', {updateOn: 'blur', validators: []}],
            intrDetMethod: ['', {updateOn: 'blur', validators: []}],
            applyUnlceanIndInterest: ['', {updateOn: 'blur', validators: []}],
            paySubdep: ['', {updateOn: 'blur', validators: []}],
            applyUnlceanIndPenalty: ['', {updateOn: 'blur', validators: []}],
            userDefined1: ['', {updateOn: 'blur', validators: []}],
            userDefined2: ['', {updateOn: 'blur', validators: []}],
            userDate1: ['', {updateOn: 'blur', validators: []}],
            userDate2: ['', {updateOn: 'blur', validators: []}],
            textbox001: ['', {updateOn: 'blur', validators: []}],
            textbox002: ['', {updateOn: 'blur', validators: []}],
            textbox003: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    /**
     * 'dw_linbs_contract_search_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'contract_search_type' )
     */
    getContractTypeDropdownValue() {
        this.dddwDtlService.findByColumnNameAndDwname('contract_search_type', 'dw_linbs_contract_search_de').subscribe((values) => {
            this.contractTypeValues = values;
        });
    }

    /**
     * form date to grid state
     * @param values
     */
    populateVendorDynamicForm() {
        if (!this.linbsContractSearches || this.linbsContractSearches.length < 1) {
            return;
        }


        this.linbsContractSearches.forEach((value: LinbsContractSearch) => {
            let mockConfig = JSON.parse(JSON.stringify(LinbContractSearchesFormConfig));
            mockConfig.forEach((field, index) => {
                if (field.name === LinbContractSearchesFields.ORDER) {
                    mockConfig[index].value = value.contractSearchOrder;
                } else if (field.name === LinbContractSearchesFields.CONTRACT_SEARCH_TYPE) {
                    mockConfig[index].value = this.contractTypeValues.find(dropdownValue => dropdownValue.dddwDtlPrimaryKey.dataVal ==
                        value.linbsContractSearchPrimaryKey.contractSearchType).dddwDtlPrimaryKey.displayVal;
                }

            });
            let formState: FormRow = new FormRow();
            formState.action = null;
            formState.formFields = mockConfig;
            this.linbsContractSearchesFormState.push(formState);          // add record
        });

        this.linbsContractSearchesFormState = JSON.parse(JSON.stringify(this.linbsContractSearchesFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }


    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl+M'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                    { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                    { name: 'Paste', shortcutKey: 'Ctrl+V' }
                ]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Line Of Business'},
                    {name: 'Auto Letter Setup'},
                    {name: 'PCP Support info Details'},
                    {name: 'PCP Auto Assign'},
                    {name: 'APC Setup'},
                    {name: 'Claims Interest/Penalty Calc Rules'},
                    {name: 'Claim Discount Calculation Rules'},
                    {name: 'Pre Existing Conditions'}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Delete Contract Search'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    { isHorizontal: true },
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Member Master'},
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


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetForm();
                    break;
                }
                case 'Open': {
                    this.openScreen();
                    break;
                }
                case 'Save': {
                    this.saveLineOfBusinessMaster();
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

        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            switch (event.action) {
                case 'PCP Support info Details': {
                    const ref = this.modalService.open(PcpaaSupportInfoDetailsComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.lineOfBusinessId = this.lineOfBusinessForm.get('lineOfBusinessLb').value;
                    break;
                }
                case 'PCP Auto Assign': {
                    const ref = this.modalService.open(PcpAutoAssignComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.lineOfBusinessId = this.lineOfBusinessForm.get('lineOfBusinessLb').value;
                    break;
                }
                case 'Claims Interest/Penalty Calc Rules': {
                    const ref = this.modalService.open(ClaimInterestCalcRulesComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.lineOfBusinessId = this.lineOfBusinessForm.get('lineOfBusinessLb').value;
                    break;
                }
                case 'Claim Discount Calculation Rules': {
                    const ref = this.modalService.open(ClaimDiscountCalcRulesComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.lineOfBusinessId = this.lineOfBusinessForm.get('lineOfBusinessLb').value;
                    break;
                }
                case 'Pre Existing Conditions': {
                    const ref = this.modalService.open(PreExistingConditionRulesComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.lineOfBusinessId = this.lineOfBusinessForm.get('lineOfBusinessLb').value;
                    break;
                }
            }

        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Audit Display': {
                    this.auditDisplay();
                    break;
                }
                case 'Show Timestamp': {
                    if (this.lineOfBusinessForm.get('lineOfBusinessLb').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
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

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/LINBS_Line_of_Business.htm';
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Line of Business')
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
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
    openFileMenu() {
        document.getElementById('fileDropdownFile').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openSpecialMenu() {
        document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownSpecial'
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openWindowMenu() {
        document.getElementById('fileDropdownWindow').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownWindow'
    }
    openHelpMenu() {
        document.getElementById('fileDropdownHelp').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownHelp'
    }

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (value == 'f3') {
                obj = {
                    menu: {
                        menuItem: 'Shortcut Key'
                    },
                    action: 'Shortcut Menu'
                }
                this.onMenuItemClick(obj)
            }
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
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Delete Contract Search'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Line Of Business'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Support info Details'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Auto Assign'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'APC Setup'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'r':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Claims Interest/Penalty Calc Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Claims Discout Calculation Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Pre Existing Conditions'
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
    }

     showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Line of Business';

        ref.componentInstance.insertDateTime = this.lineOfBusinessMaster.insertDatetime;
        ref.componentInstance.insertDateTime = this.lineOfBusinessMaster.insertDatetimeDisplay;

        ref.componentInstance.insertProcess = this.lineOfBusinessMaster.insertProcess;
        ref.componentInstance.insertUser = this.lineOfBusinessMaster.insertUser;
        ref.componentInstance.updateUser = this.lineOfBusinessMaster.updateUser;
        ref.componentInstance.updateDateTime = this.lineOfBusinessMaster.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.lineOfBusinessMaster.updateProcess;
    };

    auditDisplay = () => {
        if (this.searchStatus && this.keyValues) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.windowId
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: "lg",
                });
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(11073)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error(
                            "11073: " + message[0].messageText
                        );
                    });
            }
        } else {
            this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.alertMessage = this.alertMessageService.error(
                        "30164: " + message[0].messageText
                    );
                });
        }

    }

    isFormDataModified() {
        this.lineOfBusinessForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
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

    openScreen() {
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Line of Business', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveLineOfBusinessMaster();
                            setTimeout(() => {
                                this.resetForm();
                                this.displayedDataStatus = false
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.resetForm();
                            this.displayedDataStatus = false
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.resetForm();
            this.displayedDataStatus = false
        }
    }

}
