/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {
    Country,
    MemberEligHistory,
    MemberMaster,
    MessageMasterDtl,
    ProfsvcClaimHeader,
    ProvMaster,
    ReasonCodeMaster,
    SecUser,
    SecWin,
    SystemCodes,
    VendorAddress,
} from "../../../api-models";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService,} from "../../../shared/components/alert-message";
import {MessageType, PopUpMessage, PopUpMessageButton,} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, DatePickerModel, NGBModalOptions, PopUpIconType,} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {Form} from "../../../shared/helpers/form.helper";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {NgbActiveModal, NgbModal, NgbModalRef,} from "@ng-bootstrap/ng-bootstrap";
import {DentalClaimHeaderService} from "../../../api-services/claims/dental-claim-header.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {ClaimBatchInit, Menu, SearchModel,} from "../../../shared/models/models";
import {ProfessionalClaimServicesLookup} from "../../../shared/lookup/professional-claim-services-lookup";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";
import {CONSTANTS, getProfessionalClaimServicesShortcutKeys,} from "../../../shared/services/shared.service";
import {KeyboardShortcutsComponent, ShortcutInput,} from "ng-keyboard-shortcuts";
import {RequiredValidator} from "../../../shared/validators/required.validator";
import {MemberMasterLookup} from "../../../shared/lookup/member-master-lookup";
import {ProviderMasterLookup} from "../../../shared/lookup/provider-master-lookup";
import {
    DddwDtlService,
    GroupMasterService,
    MessageMasterDtlService,
    ProfsvcClaimHeaderService,
    ProvMasterService,
    SecUserService,
    SystemCodesService,
    VendorAddressService,
} from "../../../api-services";
import {VendorMasterComponent} from "../../vendor/vendor-master/vendor-master.component";
import {MemberCobVerificationInformationComponent} from "../../member/member-cob-verification-information/member-cob-verification-information.component";
import {ClaimHoldRulesComponent} from "../claim-hold-rules/claim-hold-rules.component";
import {MemberCobHistoryComponent} from "../../member/member-cob-history/member-cob-history.component";
import {ClaimDetailAuthProcRuleComponent} from "../claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component";
import {ClaimDisplayComponent} from "../claim-display/claim-display.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {VendorMasterLookup} from "../../../shared/lookup/vendor-master-lookup";
import {ReasonCodeMasterLookup} from "../../../shared/lookup/reason-code-master-lookup";
import {InstitutionalAuthNumberLookup} from "../../../shared/lookup/institutional-auth-number-lookup";
import {InstitutionalPlaceOfServiceLookup} from "../../../shared/lookup/institutional-place-of-service-lookup";
import {DiagnosisMasterLookup} from "../../../shared/lookup/diagnosis-master-lookup";
import {ProvAddressService} from "../../../api-services/prov-address.service";
import {ProvAddress} from "../../../api-models/prov-address.model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {IMyDateModel, IMySingleDateModel} from "angular-mydatepicker";
import {CountryService} from "../../../api-services/country.service";
import {DiagnosisCodeMasterService} from "../../../api-services/diagnosis-code-master.service";
import {InstitutionalServRsnLookup} from "../../../shared/lookup/institutional-serv-rsn-lookup";
import {SearchService} from "../../../shared/services/search.service";
import {VendorMasterService} from "../../../api-services/vendor-master.service";
import {ProvContractSpecialtyService} from "../../../api-services/prov-contract-specialty.service";
import {MemberMasterService} from "../../../api-services/member-master.service";
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {ReasonComponent} from "../../support/reason/reason.component";
import {AuthWaiveRulesComponent} from "../../authorization/auth-waive-rules/auth-waive-rules.component";
import {ClaimsBatchInitiationComponent} from "../claims-batch-initiation/claims-batch-initiation.component";
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DEFAULT_LANGUAGE, SYSTEM_CODE_PARSTATUS,} from "../../../shared/models/constants";
import {InputService} from "../../../shared/services/input.service";
import {ClaimHeaderInformationComponent} from "../claim-header-information/claim-header-information.component";
import {ProviderVendorInformationComponent} from "../provider-vendor-information/provider-vendor-information.component";
import {ProfessionalServicesClaimsOtherComponent} from "../professional-services-claims-other/professional-services-claims-other.component";
import {ProfessionalServicesClaimsDetailComponent} from "../professional-services-claims-detail/professional-services-claims-detail.component";
import {ClaimDisplayTotalsComponent} from "../claim-display-totals/claim-display-totals.component";
import {InstClaimHeaderService} from "../../../api-services/inst-claim-header.service";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {AddonClaimsControllerComponent} from "../../addon/addon-claims-controller/addon-claims-controller.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {NotesComponent} from "../../../shared/components/notes/notes.component";
import {NoteMasterService} from "../../../api-services/notes/note-master.service";
import { ClaimHoldReasonsComponent } from "../claims-hold-reasons/claims-hold-reasons.component";
import {ChooseClaimPaymentMethodComponent} from "../../addon/choose-claim-payment-method/choose-claim-payment-method.component";
import {VendorFirstProviderComponent} from "../../../shared/components/vendorFirst-provider/vendorFirst-provider.component";
// Use the Component directive to define the ProfessionalServicesClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "professional-services-claims",
    templateUrl: "./professional-services-claims.component.html",
    providers: [CurrencyPipe, DatePipe],
})
export class ProfessionalServicesClaimsComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    isChildModalOpen = false;
    professionalServicesClaimsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = "PSCLM";
    public isSuperUser = false;
    public secProgress = true;
    editProfSvcClaim = false;
    hiddenAllFields = true;
    public addressString: string = '';
    public providerParStatus: string='';
    @Input() claimNumber: string
    public nextInputMap = {
        claimNumber: "svcDate",
        svcDate: "thruDate",
        thruDate: "authNo",
        authNo: "textbox001",
        textbox001: "memberId",
        memberId: "personNumber",
        personNumber: "refProv",
        refProv: "vendor",
        provider: "providerAddress",
        acctNumber: "plcOfSvc",
        providerAddress: "providerParStat",
        zip: "provider",
        providerParStat: "acctNumber",
        vendor: "vendorAddress",
        vendorAddress: "zip",
        plcOfSvc: "svcRsn",
        dx1: "eobReq",
        userDef1: "userDef2",
        svcRsn: "totalBilled",
        dx2: "userDef2",
        userDef2: "dateRecv",
        totalBilled: "dx1",
        dx3: "facilityId",
        facilityId: "securityCode",
        securityCode: "batchNumber",
        dateRecv: "facilityId",
        dx4: "eobReq",
        eobReq: "invalidData",
        batchNumber: "invalidData",
        invalidData: "clmSubmRsnCode",
        clmSubmRsnCode: "userDef1",
    };

    getNextInput(inputId: string): void {
        this.inputService.getInput(this.nextInputMap, inputId);
        switch (inputId) {
            case 'dx1' :
                setTimeout(() => {
                    this.renderer.selectRootElement('#dx2').focus()
                }, 500);
                break;
            case 'dx2':
                setTimeout(() => {
                    this.renderer.selectRootElement('#dx3').focus()
                }, 500);
                break;
            case 'dx3':
                setTimeout(() => {
                    this.renderer.selectRootElement('#dx4').focus()
                }, 500);
                break;
            case 'dx4':
                setTimeout(() => {
                    this.renderer.selectRootElement('#eobReq').focus()
                }, 500);
                break;
            default:
                break;
        }
    }

    public previousInputMap = this.inputService.getPreviousInputMap(
        this.nextInputMap
    );

    getPreviousInput(inputId: string): void {
        this.inputService.getInput(this.previousInputMap, inputId);
    }

    notePriorityFlag: boolean = false;
    shortcuts: ShortcutInput[] = [];
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    @ViewChild("paySubscriberTemplate") private paySubscriberTemplate: ElementRef;
    @ViewChild('vendorAddress') private vendorAddressElf: ElementRef;
    @ViewChild("payDependentTemplate") private payDependentTemplate: ElementRef;
    @ViewChild("submittedAuthorizationTemplate")
    private submittedAuthorizationTemplate: ElementRef;
    @ViewChild("refProvField") private refProvField: ElementRef;
    @ViewChild("refSvcRsn") private refSvcRsn: ElementRef;
    @ViewChild("plcOfSvcField") private plcOfSvcField: ElementRef;
    @ViewChild("providerAddress") private providerAddress: ElementRef;
    @ViewChild('vendor') public vendor: ElementRef;
    @ViewChild("par") private par: ElementRef;
    @ViewChild("zipcode") private zipcode: ElementRef;
    @ViewChild("provider") private provider: ElementRef;
    @ViewChild("accNo") private accNo: ElementRef;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;

    searchModel = new SearchModel(
        "instclaimheaders/lookup",
        ProfessionalClaimServicesLookup.PROFESSIONAL_CLAIM_SERVICES_ALL,
        ProfessionalClaimServicesLookup.PROFESSIONAL_CLAIM_SERVICES_DEFAULT,
        [],
        false
    );

    reasonCodeMasterSearchModel = new SearchModel(
        "reasoncodemasters/lookup",
        ReasonCodeMasterLookup.REASON_CODE_MASTER_ALL,
        ReasonCodeMasterLookup.REASON_CODE_MASTER_DEFAULT,
        [],
        false
    );

    authNumberSearchMdel = new SearchModel(
        "instclaimheaders/lookup/authNumber",
        InstitutionalAuthNumberLookup.ALL,
        InstitutionalAuthNumberLookup.DEFAULT,
        [],
        true
    );

    posSearchMdel = new SearchModel(
        "placesofsvcmaster/lookup",
        InstitutionalPlaceOfServiceLookup.ALL,
        InstitutionalPlaceOfServiceLookup.DEFAULT,
        [],
        true
    );

    diagnosisSearchModel = new SearchModel(
        "diagnosiscodemasters/lookup",
        DiagnosisMasterLookup.ALL,
        DiagnosisMasterLookup.DEFAULT,
        [],
        true
    );
    admProvSearchModel = new SearchModel(
        'provmasters/lookup2',
        ProviderMasterLookup.VENDORFIRST_PROVIDER,
        ProviderMasterLookup.VENDORFIRST_PROVIDER,
        [],
        true
    );
    addresses: any[] = [];
    // Audit Details
    keyNames: string = "seq_Claim_Id";
    keyValues: number;
    searchStatus = false;

    claimBatchInitData = new ClaimBatchInit();
    userTemplateId: any = null;
    secColDetails = new Array<SecColDetail>();
    providerType: any;
    providerSpec: any;
    menuOpened = ""
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
        private dentalClaimHeaderService: DentalClaimHeaderService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private profsvcClaimHeaderService: ProfsvcClaimHeaderService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private provAddressService: ProvAddressService,
        private vendorAddressService: VendorAddressService,
        private secUserService: SecUserService,
        private vendorMasterService: VendorMasterService,
        private secColDetailService: SecColDetailService,
        private countryService: CountryService,
        private diagnosisCodeMasterService: DiagnosisCodeMasterService,
        private searchService: SearchService,
        private provContractSpecialtyService: ProvContractSpecialtyService,
        private provMasterService: ProvMasterService,
        private memberMasterService: MemberMasterService,
        private memberEligHistoryService: MemberEligHistoryService,
        private groupMasterService: GroupMasterService,
        private datePipe: DatePipe,
        private currencyPipe: CurrencyPipe,
        private inputService: InputService,
        private renderer: Renderer2,
        private instClaimHeaderService: InstClaimHeaderService,
        private noteMasterService: NoteMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this cl ass in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(
            this.professionalServicesClaimsForm
        );

        this.getParDropdwonValues();
        this.getClaimSubmReasonCodeValues();
        this.getExplanationAttachedRAValues();
        this.getCountries();


        /**
         * Open Claims Batch Popup
         */
        if (!this.claimNumber) {
            let ref = this.modalService.open(ClaimsBatchInitiationComponent, {
                size: "lg",
            });
            ref.componentInstance.buttonclickEvent.subscribe((data: any) => {
                this.claimBatchInitData.batchNumber = data.batchNumber;
                this.claimBatchInitData.dateReceived = data.dateReceived;
            });
        }

        if (this.claimNumber) {
            this.findProfessionalClaimHeader(this.claimNumber)
        }
    }

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }

    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    openWindowMenu() {
        document.getElementById("fileDropdownWindows").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindows"
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
            if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Detail File'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Other Claim Info'
                        }
                        this.onMenuItemClick(obj)
                        break;

                    default:
                        break;
                }
            }
            if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'View Claim Totals'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Pay Subscriber'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            }
            if (this.menuOpened == "fileDropdownWindows") {
                switch (value) {
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Audit Display'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Show TimeStamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            }
            if (this.menuOpened == "fileDropdownHelp") {
                this.helpScreen()
            }
        }
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
    getSecWin(secUserId: string) {
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        "You are not Permitted to view Professional Claim Details",
                        "Detail File Permission"
                    );
                }
            });
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
            .findByTableNameAndUserId("PROFSVC_CLAIM_HEADER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProfessionalClaimServicesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    countries: Country[] = [];

    getCountries() {
        this.systemCodesService
            .findBySystemCodeTypeAndSystemCodeActiveAndLanguageIdState(
                'MELIGLOC',
                'Y',
                0
            ).subscribe(countries => {
            countries.sort((a, b) => {
                if (a['systemCodeDesc1'] < b['systemCodeDesc1'] ) {return -1; }
                if (a['systemCodeDesc1'] > b['systemCodeDesc1'] ) { return 1; }
            });
            let data = [];
            countries.map(item => {
                if (item.systemCodesPrimaryKey.systemCode === 'blank') {
                    return;
                } else {
                    data.push(item)
                }
            });
            this.countries = data;
        });
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    getTerminationdate(): Date {
        const effD = this.professionalServicesClaimsForm.value.termDate;
        return this.getDate(effD.singleDate);
    }

    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf());
    }

    /**
     * open f11 screen
     */
    public getChooseClaimPaymentMethodScreen = () => {
        if (this.profsvcClaimHeader) {
            const ref = this.modalService.open(
                ChooseClaimPaymentMethodComponent, {
                    size: <any>'xl', ...NGBModalOptions,
                    windowClass: 'dashboard-modal',
                });
            ref.componentInstance.instClaimHeader = this.profsvcClaimHeader;
            ref.componentInstance.onFormSubmit.subscribe(resp => {
                if (resp.paymentMethod === 'P') {
                    this.profsvcClaimHeader.payDependent = resp.paymentMethod;
                    return;
                }
                this.profsvcClaimHeader.paySubscriber = resp.paymentMethod;
            });
        }
    }
    validateSvcDate(event: IMyDateModel) {
        const thruDate = this.professionalServicesClaimsForm.value.thruDate;
        let today = new Date();
        if (event.singleDate) {
            let dateReceived = this.getDate(event.singleDate);
            if (dateReceived > today) {
                this.messageService.findByMessageId(70412).subscribe((message) => {
                    this.showPopUp(
                        "70412 : " + message[0].messageText,
                        "Professional Services Claims"
                    );
                    this.professionalServicesClaimsForm.patchValue({
                        thruDate: null,
                    });
                });
            }
        }
        if (event.singleDate && thruDate) {
            let thruDefault = this.getDate(thruDate.singleDate);
            let svcDate = this.getDate(event.singleDate);

            // =====================================        =============================
            if (this.isValidDate(thruDefault) && this.isValidDate(svcDate)) {
                const isValid = thruDefault.getTime() > svcDate.getTime();
                if (!isValid) {
                    this.openDateValidationPopupError(true);
                }
            }
        }
    }

    validateThruDate(event: IMyDateModel) {
        const svcDate = this.professionalServicesClaimsForm.value.svcDate;
        if (event && svcDate) {
            let thruDate = this.getDate(event.singleDate);
            let svcDateDefault = this.getDate(svcDate.singleDate);
            if (this.isValidDate(thruDate) && this.isValidDate(svcDateDefault)) {
                let isValid = svcDateDefault.getTime() < thruDate.getTime();
                if (!isValid) {
                    this.openDateValidationPopupError(false);
                }
            }
        }
    }

    svcDateValidationMessage: any = null;
    thruDateValidationMessage: any = null;

    openDateValidationPopupError(isSvcDate: boolean) {
        let popMsg = null;

        if (isSvcDate) {
            if (!this.svcDateValidationMessage) {
                this.messageService
                    .findByMessageId(70308)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.svcDateValidationMessage = message[0].messageText;

                        popMsg = new PopUpMessage(
                            "Dental Services Claims",
                            "Dental Services Claims",
                            "70308: " + this.svcDateValidationMessage,
                            "info",
                            [],
                            MessageType.ERROR
                        );
                    });
            } else {
                popMsg = new PopUpMessage(
                    "Dental Services Claims",
                    "Dental Services Claims",
                    "70308:" + this.svcDateValidationMessage,
                    "info",
                    [],
                    MessageType.ERROR
                );
            }
        } else {
            // -------------------------------------- Validation msg for Thru Date

            if (!this.thruDateValidationMessage) {
                this.messageService
                    .findByMessageId(7031)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.thruDateValidationMessage = message[0].messageText;

                        popMsg = new PopUpMessage(
                            "Dental Services Claims",
                            "Dental Services Claims",
                            "7031: " + this.thruDateValidationMessage,
                            "info",
                            [],
                            MessageType.ERROR
                        );
                    });
            } else {
                popMsg = new PopUpMessage(
                    "Dental Services Claims",
                    "Dental Services Claims",
                    "7031:" + this.thruDateValidationMessage,
                    "info",
                    [],
                    MessageType.ERROR
                );
            }
        }
        popMsg.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
    }

    updateProfClaimHeader() {
        if (!this.profsvcClaimHeader.claimNumber) {
            return;
        }
        let profsvcClaimHeader = this.getFormData(this.profsvcClaimHeader);
        profsvcClaimHeader = this.makeExtraDataToNull(profsvcClaimHeader);

        profsvcClaimHeader.updateDatetime = this.datePipe.transform(
            new Date(),
            "yyyy-MM-dd HH:mm:ss"
        );
        try {
            profsvcClaimHeader.insertDatetime = this.datePipe.transform(
                new Date(profsvcClaimHeader.insertDatetime),
                "yyyy-MM-dd HH:mm:ss"
            );
        } catch (e) {

        }

        profsvcClaimHeader.updateUser = sessionStorage.getItem("user");
        profsvcClaimHeader.updateProcess = this.windowId;

        this.profsvcClaimHeaderService
            .updateProfsvcClaimHeader(
                profsvcClaimHeader,
                profsvcClaimHeader.seqClaimId
            )
            .subscribe((resp: ProfsvcClaimHeader) => {
                this.profsvcClaimHeader = profsvcClaimHeader;
                this.toastService.showToast("Saved Successfully", NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.popupClose = false;
                this.professionalServicesClaimsForm.get('zip').disable();
            });
    }

    makeExtraDataToNull(prof: ProfsvcClaimHeader) {
        prof.diagnosisCodeMasterDiagnosis1 = null;
        prof.diagnosisCodeMasterDiagnosis2 = null;
        prof.diagnosisCodeMasterDiagnosis3 = null;
        prof.diagnosisCodeMasterDiagnosis4 = null;
        prof.authMaster = null;

        prof.groupMaster = null;

        prof.lineOfBusinessMaster = null;

        prof.memberMaster = null;

        prof.planMaster = null;

        prof.profsvcClaimHdrRemark = null;
        prof.profsvcClaimLenrxes = null;
        prof.profsvcClaimDetails = null;

        prof.provAddressSeqProvAddress = null;
        prof.vendorMaster = null;

        prof.provContract = null;
        prof.provMaster = null;
        prof.provMasterSeqProvId = null;
        return prof;
    }

    createProfClaimHeader() {
        let profsvcClaimHeader: ProfsvcClaimHeader = this.getFormData(
            new ProfsvcClaimHeader(),
            false
        );
        profsvcClaimHeader.insertDatetime = this.datePipe.transform(
            new Date(),
            "yyyy-MM-dd HH:mm:ss"
        );

        profsvcClaimHeader.insertUser = sessionStorage.getItem("user");
        profsvcClaimHeader.insertProcess = this.windowId;

        profsvcClaimHeader.explanationAttached = "N"; // TODO need to confirm, Could not be null
        profsvcClaimHeader.invalidDataInd = "N"; // TODO Could not be null, map on form
        profsvcClaimHeader.inServiceArea = "X"; // TODO  Could not be null, map on form
        profsvcClaimHeader.acceptMedicareAssignFlag = "N"; // TODO  Could not be null, map on form
        profsvcClaimHeader.headerChanged = "X"; // TODO  Could not be null, map on form
        profsvcClaimHeader.primaryOcExists = "N";
        profsvcClaimHeader.payDependent = "N";
        profsvcClaimHeader.privacyApplies = "N";
        profsvcClaimHeader.releaseMedRecsInd = "N";
        profsvcClaimHeader.claimSubmReasonCode = "1";

        this.profsvcClaimHeaderService
            .createProfsvcClaimHeader(profsvcClaimHeader)
            .subscribe((data: ProfsvcClaimHeader) => {
                this.profsvcClaimHeader = profsvcClaimHeader;
                this.editProfSvcClaim = true;
                this.hiddenAllFields = false;
                this.disableDefaultFields();
                this.toastService.showToast("Saved Successfully", NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.popupClose = false;
                this.professionalServicesClaimsForm.get('zip').disable();
            });
    }

    parDropDownvalues: SystemCodes[] = [];

    /**
     * hsd_system_codes.system_code_type = 'PARSTATUS' AND hsd_system_codes.system_code_active = 'Y'
     *get winId dropdowns
     */
    getParDropdwonValues() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(SYSTEM_CODE_PARSTATUS, DEFAULT_LANGUAGE)
            .subscribe((values: SystemCodes[]) => {
                this.parDropDownvalues = values;
            });
    }

    explanationAttachedDropDownValues: any[] = [];
    claimSubmReasonCodeDropDownValues: any[] = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = 'dw_psclm_header_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'explanation_attached' ) and
     ( HSD_DDDW_DTL.LANGUAGE_ID = 0 ) )
     */
    getExplanationAttachedRAValues() {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId(
                "explanation_attached",
                "dw_psclm_header_de",
                0
            )
            .subscribe((values) => {
                this.explanationAttachedDropDownValues = values;
            });
    }

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = 'dw_psclm_header_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'claim_subm_reason_code' ) and
     ( HSD_DDDW_DTL.LANGUAGE_ID = 0 ) )
     */
    getClaimSubmReasonCodeValues() {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId(
                "claim_subm_reason_code",
                "dw_psclm_header_de",
                0
            )
            .subscribe((values) => {
                this.claimSubmReasonCodeDropDownValues = values;
            });
    }

    provAddressDropdowns: ProvAddress[] = [];

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.professionalServicesClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
        setTimeout(() => {
            this.renderer.selectRootElement("#" + fieldName).focus()
        }, 500)
        if (fieldName == 'providerParStat') {
            this.accNo.nativeElement.focus();
        }
    }

    currentVendorAddress: VendorAddress;
    vendorAddress: number;
    seqSubsId: number;

    setVendorAddressFieldValue(fieldName: string, vendorAddress: VendorAddress) {
        this.currentVendorAddress = vendorAddress;
        let fieldValue = vendorAddress.addressLine1
            ? vendorAddress.addressLine1 + " "
            : "";
        fieldValue += vendorAddress.city ? vendorAddress.city : "";

        this.professionalServicesClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
        this.vendorAddressElf.nativeElement.focus();
        this.vendorAddress = vendorAddress.seqVendAddress;
    }

    currentProvAddress: ProvAddress;

    setProvAddressFieldValue(fieldName: string, provAddress: ProvAddress) {
        this.currentProvAddress = provAddress;
        let fieldValue = provAddress.addressLine1 ? provAddress.addressLine1 : "";
        this.professionalServicesClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
    }

    /**
     * getProvider Address DropdownValues
     */
    private getProviderAddressDropdownValues(seqProvId: number): void {
        if (!seqProvId) {
            return;
        }
        this.provAddressService
            .findBySeqProvId(seqProvId)
            .subscribe((values: ProvAddress[]) => {
                this.provAddressDropdowns = values;
                this.onAddressChange(this.profsvcClaimHeader.seqProvAddress);
            });
    }
    /**
     * getProvider Address DropdownValues
     */
    private setParDropdownValue(seqMembId: number,seqGroupId: number,dateOfSvc: string,userDefined1: string,seqProvId: number,seqClaimId: number): void {
        if (!seqMembId || !seqProvId) {
            return;
        }
        this.provContractSpecialtyService
            .getProviderParStatus(seqMembId,seqGroupId,dateOfSvc,userDefined1,seqProvId,seqClaimId)
            .subscribe(par => {
                this.professionalServicesClaimsForm.controls["providerParStat"].patchValue(
                    par
                )

            });
    }
    vendorAddressDropdowns: VendorAddress[] = [];
    /**
     * getProvider Address DropdownValues
     */
    private getVendorAddressDropdownValues(vendId: any): void {
        if (!vendId) {
            return;
        }
        this.vendorAddressService
            .findByVendorId(vendId)
            .subscribe((values: VendorAddress[]) => {
                this.vendorAddressDropdowns = values;
            });
    }

    getClaimTab() {
        const claimNumber = this.professionalServicesClaimsForm.value.claimNumber;
        if (claimNumber) {
            this.findProfessionalClaimHeader(claimNumber);
        } else {
            this.createNewClaimPopup();
        }
    }

    openAuthNumberLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.authNumberSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.professionalServicesClaimsForm.patchValue({
                authNo: res.AUTH_NUMBER,
                textbox001: res.AUTH_SECONDARY_AUTH_NO,
                authLevel: res.AUTH_LEVEL,
            });
        });
    }

    getAuthNumberTab(event: any) {
        this.changeAuthNumber(event.target.value);
    }

    openPlaceOfSerLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.posSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.professionalServicesClaimsForm.patchValue({
                plcOfSvc: res.placeOfSvcCode,
            });
            this.refSvcRsn.nativeElement.focus();
        });
    }

    getPlaceOfServiceTab(event: any) {
        const searchOptions = [{placeOfSvcCode: event.target.value}];
        let searchModel = JSON.parse(JSON.stringify(this.posSearchMdel));
        searchModel.searchOption = searchOptions;
        let plcOfServiceMessage: string;
        const plcOfSvc = event.target.value;
        if (!plcOfSvc) {
            this.messageService
                .findByMessageId(29032)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.plcOfSvcField.nativeElement.focus();
                    this.showPopUp(
                        `29032: ${message[0].messageText.replace(
                            "@1",
                            "place_of_service_1"
                        )}`,
                        "Place of Services."
                    );
                });
            return;
        }

        this.searchService.getSearchResults(searchModel).subscribe(
            (resp) => {
                if (resp == null) {
                    this.plcOfSvcField.nativeElement.focus();
                    this.messageService
                        .findByMessageId(9987)
                        .subscribe((message: MessageMasterDtl[]) => {
                            plcOfServiceMessage = message[0].messageText.replace(
                                "@1",
                                event.target.value
                            );
                            this.showPopUp(
                                `9987: ${plcOfServiceMessage}`,
                                "Place of Services."
                            );
                        });
                    return;
                }
                this.refSvcRsn.nativeElement.focus();
            },
            (error) => {
                this.showPopUp(
                    "Place of Service is not valid",
                    "Professional Services Claims"
                );
            }
        );
    }

    openFacilityIdLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModelProvMaster;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.professionalServicesClaimsForm.patchValue({
                facilityId: res.PROVIDER_ID,
            });
        });
    }

    getFacilityIdTab(event: any) {
        if (event.target.value === '') {
            setTimeout(() => {
                this.renderer.selectRootElement('#securityCode').focus()
            }, 500)
        } else {
            const searchOptions = [{PROVIDER_ID: event.target.value}];
            let searchModel = JSON.parse(JSON.stringify(this.searchModelProvMaster));
            searchModel.searchOption = searchOptions;
            this.searchService.getSearchResults(searchModel).subscribe(
                (resp) => {
                    if (resp == null) {
                        this.messageService.findByMessageId(70339).subscribe(res => {
                            this.showPopUp(
                                "70339: " + res[0].messageText,
                                "Professional Services Claims"
                            );
                        })
                    }
                },
                (error) => {
                    this.messageService.findByMessageId(70339).subscribe(res => {
                        this.showPopUp(
                            "70339: " + res[0].messageText,
                            "Professional Services Claims"
                        );
                    })
                }
            );
        }
    }

    findByDiagnosisCode(value: any, col: any, isDefaultState = false) {

        this.diagnosisCodeMasterService.getDiagnosisCodeMaster(value).subscribe(
            (res) => {
                const descCol = col + "ShortDesc";
                if (!isDefaultState) {
                    if (this.professionalServicesClaimsForm.get('memberGender').value =='M' && res.patientGender !='M') {
                        this.showPopUp(
                            "70338 : Selected Diagnosis Code is not applicable to male patients.",
                            "Professional Services Claims"
                        );
                        return;

                    }
                    if (this.professionalServicesClaimsForm.get('memberGender').value =='F' && res.patientGender !='F') {

                        this.showPopUp(
                            "70336 : Selected Diagnosis Code is not applicable to female patients.",
                            "Professional Services Claims"
                        );
                        return;
                    }

                }
                this.professionalServicesClaimsForm
                    .get(col)
                    .patchValue(res.diagnosisCode, {emitEvent: !isDefaultState});

                this.professionalServicesClaimsForm
                    .get(descCol)
                    .setValue(res.shortDescription, {emitEvent: !isDefaultState});
                setTimeout(() => {
                    this.renderer.selectRootElement('#' + col).focus()
                }, 500)
                if (col === 'dx1' || col === 'dx2' || col === 'dx3' || col === 'dx4') {
                    this.getNextInput(col);
                }
            },
            (error) => {
                this.messageService.findByMessageId(70333).subscribe((messages) => {
                    this.showPopUp(
                        '70333 : ' + messages[0].messageText,
                        'Professional Services Claims'
                    );
                });
                let descCol = col + "ShortDesc";
                this.professionalServicesClaimsForm
                    .get(col)
                    .setValue(null, {emitEvent: !isDefaultState});
                this.professionalServicesClaimsForm
                    .get(descCol)
                    .setValue(null, {emitEvent: !isDefaultState});
            }
        );
    }

    openDiagnosisLookupFieldSearchModel(field: any) {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.diagnosisSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.professionalServicesClaimsForm.controls[field].patchValue(res.diagnosisCode);
            if (this.professionalServicesClaimsForm.get('memberGender').value =='M' && res.patientGender !='M') {
                this.showPopUp(
                    "70338 : Selected Diagnosis Code is not applicable to male patients.",
                    "Professional Services Claims"
                );
                return;

            }
            if (this.professionalServicesClaimsForm.get('memberGender').value =='F' && res.patientGender !='F') {

                this.showPopUp(
                    "70336 : Selected Diagnosis Code is not applicable to female patients.",
                    "Professional Services Claims"
                );
                return;
            }


            if (res) {
                let descCol = field + "ShortDesc";
                this.professionalServicesClaimsForm
                    .get(field)
                    .setValue(res.diagnosisCode);
                this.professionalServicesClaimsForm
                    .get(descCol)
                    .setValue(res.shortDescription);
            }
            this.getNextInput(field);
        });
    }

    getDiagnosisLookupTab(event: any, field: any) {
        if(event.target.value){
            this.findByDiagnosisCode(event.target.value, field);
            this.professionalServicesClaimsForm.patchValue({
                col: event.target.value,
            });
        }
    }

    getBatchNumber(event: any, field: any) {
        this.messageService.findByMessageId(7041).subscribe(res => {
            let popUpMessage = new PopUpMessage(
                "poUpMessageName",
                'DIAMOND @ Client/Server System',
                '7041: ' + res[0].messageText,
                "icon"
            );
            popUpMessage.buttons = [
                new PopUpMessageButton("yes", "Ok", "btn btn-primary"),
            ];
            setTimeout(() => {
                this.renderer.selectRootElement('#batchNumber').focus()
            }, 500)
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.iconType = PopUpIconType.INFO;
            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                if (event.name === "yes") {
                    this.messageService.findByMessageId(70927).subscribe(resp => {
                        let popUpMessage = new PopUpMessage(
                            "poUpMessageName",
                            'DIAMOND @ Client/Server System',
                            '70927: ' + res[0].messageText,
                            "icon"
                        );
                        popUpMessage.buttons = [
                            new PopUpMessageButton("yes", "Ok", "btn btn-primary"),
                        ];
                        let ref = this.modalService.open(PopUpMessageComponent);
                        ref.componentInstance.popupMessage = popUpMessage;
                        ref.componentInstance.iconType = PopUpIconType.INFO;
                        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                            if (event.name === "yes") {
                                this.openProfSvcClaimDetailFile()
                            }
                        })
                    })
                }
            })
        })
    }

    profsvcClaimHeader: ProfsvcClaimHeader;

    findProfessionalClaimHeader(claimNumber: string) {
        this.resetForm({claimNumber: claimNumber});
        this.profsvcClaimHeaderService.findByClaimNumber(claimNumber).subscribe(
            (profsvcClaimHeader: ProfsvcClaimHeader) => {
                if (profsvcClaimHeader) {
                    this.profsvcClaimHeader = profsvcClaimHeader;
                    this.vendorAddress = profsvcClaimHeader.seqVendAddress;
                    this.seqSubsId = profsvcClaimHeader.memberMaster.seqSubsId;
                    this.memberMaster = profsvcClaimHeader.memberMaster;
                    this.professionalServicesClaimsForm.controls["claimNumber"].disable({
                        emitEvent: false,
                    });
                    this.searchStatus = true;
                    this.editProfSvcClaim = true;
                    this.hiddenAllFields = false;
                    this.keyValues = profsvcClaimHeader.seqClaimId;
                    this.patchFormValues(profsvcClaimHeader);
                    this.getPriorityBySourceAndNote();
                    if (profsvcClaimHeader.seqMembId) {
                        this.getMemberMasterBySubscriberId(true);
                    }
                } else {
                    this.createNewClaimPopup();
                }
            },
            (error) => {
                this.createNewClaimPopup();
            }
        );
    }

    popUpButtonClicked(button: any) {
        if (button.name === "yes") {
            const seqClaimId = this.professionalServicesClaimsForm.value.claimNumber;
            if (seqClaimId) {
                this.professionalServicesClaimsForm.controls["claimNumber"].disable();
                this.showPageDetail = true;
                return;
            }
            this.profsvcClaimHeaderService
                .getNextSeqClaimId()
                .subscribe((sequence) => {
                    this.professionalServicesClaimsForm.patchValue({
                        claimNumber: sequence,
                    });
                    this.keyValues = sequence;
                    this.editProfSvcClaim = false;
                    this.hiddenAllFields = false;
                    this.professionalServicesClaimsForm.enable();
                    document.getElementById("svcDate").focus();
                    this.professionalServicesClaimsForm.controls["claimNumber"].disable();
                    this.professionalServicesClaimsForm.controls["providerAddress"].disable();
                    this.professionalServicesClaimsForm.controls["vendorAddress"].disable();
                    this.professionalServicesClaimsForm.controls["dx2"].disable();
                    this.professionalServicesClaimsForm.controls["dx3"].disable();
                    this.professionalServicesClaimsForm.controls["dx4"].disable();
                });
            this.showPageDetail = true;
        } else if (button.name === "no") {
        }
        this.popUpMessage = null;
    }

    showPageDetail = false;

    searchMemberModel = new SearchModel(
        "membermasters/lookup",
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );

    memberMaster: MemberMaster = new MemberMaster();

    onChangPersonNumber(event: any) {
        this.memberMasterService
            .findBySubscriberIdAndPersonNumber(
                this.professionalServicesClaimsForm.value.memberId,
                this.professionalServicesClaimsForm.value.personNumber
            )
            .subscribe((res) => {
                if (res && res.length > 0) {
                    this.memberMaster = res[0];

                    if (this.memberMaster.dateOfBirth) {
                        let today = new Date();
                        let dob = new Date(this.memberMaster.dateOfBirth);
                        let diff = Math.floor(today.getTime() - dob.getTime());
                        let day = 1000 * 60 * 60 * 24;
                        let days = diff / day;
                        let months = days / 31;
                        let years = months / 12;
                        this.professionalServicesClaimsForm.patchValue({
                            memberAge: Math.ceil(years),
                        });
                    } else {
                        this.messageService.findByMessageId(70048).subscribe((messages) => {
                            this.showPopUp(
                                "70048 : " + messages[0].messageText,
                                "Professional Services Claims"
                            );
                        });
                    }
                    this.professionalServicesClaimsForm.patchValue({
                        memberGender: this.memberMaster.gender,
                        guCat: this.memberMaster.userDefined11,
                        guCatEffDate: this.memberMaster.userDefined9,
                        seqMembId: this.memberMaster.seqMembId,
                    });
                } else {
                    this.memberMaster = null;
                    this.professionalServicesClaimsForm.patchValue({
                        memberGender: null,
                        guCat: null,
                        guCatEffDate: null,
                        memberAge: null,
                        seqMembId: null,
                    });
                }
            });

        this.memberEligHistoryService
            .getMemberEligHistory(
                this.professionalServicesClaimsForm.value.memberId,
                this.professionalServicesClaimsForm.value.personNumber
            )
            .subscribe((res: any) => {
                // TODO change any to []

                this.memberEligHistories = res;
                this.memberEligHistory = res[0];
                if (res) {
                    this.professionalServicesClaimsForm.patchValue({
                        lineOfBusiness: this.memberEligHistory.lineOfBusiness,
                        pcpIpaId: this.memberEligHistory.ipaId,
                        panelId: this.memberEligHistory.panelId,
                        planCode: this.memberEligHistory.planCode,
                    });
                    this.groupMasterService
                        .getGroupMaster(this.memberEligHistory.seqGroupId)
                        .subscribe((group) => {
                            if (group) {
                                this.professionalServicesClaimsForm.patchValue({
                                    groupId: group.groupId,
                                    seqGroupId: group.seqGroupId,
                                    groupName: group.shortName,
                                    groupState: group.state,
                                });
                            } else {
                                this.professionalServicesClaimsForm.patchValue({
                                    groupId: null,
                                    seqGroupId: null,
                                    groupName: null,
                                    groupState: null,
                                });
                            }
                        });
                } else {
                    this.professionalServicesClaimsForm.patchValue({
                        lineOfBusiness: null,
                        pcpIpaId: null,
                        panelId: null,
                        planCode: null,
                    });
                }
            });
        const element = this.renderer.selectRootElement("#refProv");
        setTimeout(() => element.focus(), 50);
    }

    memberEligHistories: MemberEligHistory[] = [];
    memberEligHistory: MemberEligHistory;

    openMemberSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchMemberModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: MemberMaster) => {
            this.professionalServicesClaimsForm.patchValue({
                seqMembId: res.seqMembId,
                memberId: res.subscriberId,
                personNumber: res.personNumber,
                diamondId: res.diamondId,
            });

            this.getMemberMasterBySubscriberId();
            this.onChangPersonNumber(null);
        });
    }

    getMemberTab(event: any) {
        this.professionalServicesClaimsForm.patchValue({
            memberId: event.target.value,
        });

        this.getMemberMasterBySubscriberId();
    }

    memberMasters: MemberMaster[] = [];

    private getMemberMasterBySubscriberId(
        setDefaultValue = false,
        isDefaultState = false
    ) {
        const value = this.professionalServicesClaimsForm.value.memberId;
        if (value) {
            this.memberMasterService.findBySubscriberId(value).subscribe(
                (memberMasters) => {
                    this.memberMasters = memberMasters;
                    if (!(memberMasters.length > 0)) {
                        return;
                    }
                    if (setDefaultValue) {
                        this.professionalServicesClaimsForm.controls[
                            "personNumber"
                            ].patchValue(
                            this.profsvcClaimHeader.memberMaster &&
                            this.profsvcClaimHeader.memberMaster.personNumber,
                            {emitEvent: !isDefaultState}
                        );
                        this.memberMaster =
                            this.profsvcClaimHeader.memberMaster &&
                            this.profsvcClaimHeader.memberMaster;

                        return;
                    }
                    this.memberMaster = memberMasters[0];
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        this.refProvField.nativeElement.focus();
    }

    openProMasterSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModelProvMaster;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.professionalServicesClaimsForm.patchValue({
                refProv: res.PROVIDER_ID,
            });
        });
    }

    getProMasterTab(event: any) {
        this.findByProviderId(event.target.value.toUpperCase(), "refProv");
        this.professionalServicesClaimsForm.patchValue({
            refProv: event.target.value.toUpperCase(),
        });
    }

    private searchModelProvMaster = new SearchModel(
        "provmasters/lookup2",
        ProviderMasterLookup.PROVIDER_MASTER_ALL,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT,
        [],
        true
    );
    vendorMasterSearchModel = new SearchModel(
        "vendormasters/lookup",
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );

    openClaimLookup() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.findProfessionalClaimHeader(res.CLAIM_NUMBER);
        });
    }

    openProviderMasterLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModelProvMaster;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.professionalServicesClaimsForm.patchValue({
                    provider: res.PROVIDER_ID,
                });
                this.providerType = res.PROVIDER_TYPE;
                this.providerSpec = res.SPECIALTY_TYPE;
                this.findByProviderId(res.PROVIDER_ID, "provider");
            }
        });
    }

    getProviderMasterTab(event: any) {
        this.findByProviderId(event.target.value.toUpperCase(), "provider");
        this.professionalServicesClaimsForm.patchValue({
            provider: event.target.value.toUpperCase(),
        });
    }

    private findByProviderId(
        providerId: string,
        col: string,
        isDefaultState = false
    ) {

        let sm = JSON.parse(JSON.stringify(this.searchModelProvMaster));
        sm.searchOption = [];
        this.searchService.getSearchResults(sm).subscribe(resp1 => {
            resp1.map((item: any) => {
                if (item.PROVIDER_ID.toString() === providerId) {
                    this.providerType = item.PROVIDER_TYPE;
                    this.providerSpec = item.SPECIALTY_TYPE;
                }
            })
        });

        this.provMasterService.findByProviderId(providerId).subscribe(
            (res: ProvMaster) => {
                if (res) {
                    if (col === "provider") {
                        this.providerAddress.nativeElement.focus();
                        this.professionalServicesClaimsForm.patchValue(
                            {
                                provider: res.providerId,
                                provShortName: res.shortName,
                                admProvType: res.providerType,
                                admProvSpec: res.provSpecialty,
                                admProvIpaId: res.ipaId,
                                admSeqProvId: res.seqProvId,
                                providerType: this.providerType,
                                providerSpec: this.providerSpec
                            },
                            {emitEvent: !isDefaultState}
                        );
                        var SvcDate : string = Form.getDatePickerValue( this.professionalServicesClaimsForm, "svcDate" );
                        this.setParDropdownValue(this.professionalServicesClaimsForm.value.seqMembId,this.professionalServicesClaimsForm.value.seqGroupId,SvcDate,this.professionalServicesClaimsForm.value.userDef1,this.professionalServicesClaimsForm.controls["admSeqProvId"].value,this.professionalServicesClaimsForm.controls["claimNumber"].value);
                        this.getProviderAddressDropdownValues(res.seqProvId);
                    } else if (col === "refProv") {
                        this.professionalServicesClaimsForm.patchValue(
                            {
                                refProv: res.seqProvXrefId,
                                attProvShortName: res.shortName,
                                attProvType: res.providerType,
                                attProvSpec: res.provSpecialty,
                                attProvIpaId: res.ipaId,
                            },
                            {emitEvent: !isDefaultState}
                        );
                    }
                    this.provContractSpecialtyService
                        .findBySeqProvId(res.seqProvId)
                        .subscribe((res1: any) => {
                            if (res1) {
                                if (col === "provider") {
                                    this.professionalServicesClaimsForm.patchValue(
                                        {
                                            admProvSpec:
                                                res1 && res1[0].provContractSpecialtyPrimaryKey
                                                    ? res1[0].provContractSpecialtyPrimaryKey
                                                        .specialtyType
                                                    : null,
                                        },
                                        {emitEvent: !isDefaultState}
                                    );
                                }
                            } else if (col === "refProv") {
                                this.professionalServicesClaimsForm.patchValue(
                                    {
                                        attProvSpec:
                                            res1 && res1[0].provContractSpecialtyPrimaryKey
                                                ? res1[0].provContractSpecialtyPrimaryKey.specialtyType
                                                : null,
                                    },
                                    {emitEvent: !isDefaultState}
                                );
                            }
                        });
                } else {
                    this.messageService
                        .findByMessageId(7193)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "7193: " + message[0].messageText,
                                "Professional Claims",
                                PopUpIconType.CLOSE
                            );
                        });
                }
            },
            (error: Error) => {
                this.professionalServicesClaimsForm.patchValue(
                    {
                        col: null,
                    },
                    {emitEvent: !isDefaultState}
                );
            }
        );
    }


    private findBySeqProviderId(
        providerId: string,
        col: string,
        isDefaultState = false
    ) {

        let sm = JSON.parse(JSON.stringify(this.searchModelProvMaster));
        sm.searchOption = [];
        this.searchService.getSearchResults(sm).subscribe(resp1 => {
            resp1.map((item: any) => {
                if (item.PROVIDER_ID.toString() === providerId) {
                    this.providerType = item.PROVIDER_TYPE;
                    this.providerSpec = item.SPECIALTY_TYPE;
                }
            })
        });

        this.provMasterService.getProvMaster(Number(providerId)).subscribe(
            (res: ProvMaster) => {
                this.vendorAddress = res.seqVendAddress;
                if (res) {
                    if (col === "provider") {
                        this.providerAddress.nativeElement.focus();
                        this.professionalServicesClaimsForm.patchValue(
                            {
                                provider: res.providerId,
                                provShortName: res.shortName,
                                admProvType: res.providerType,
                                admProvSpec: res.provSpecialty,
                                admProvIpaId: res.ipaId,
                                admSeqProvId: res.seqProvId,
                                providerType: this.providerType,
                                providerSpec: this.providerSpec
                            },
                            {emitEvent: !isDefaultState}
                        );

                        this.getProviderAddressDropdownValues(res.seqProvId);
                    } else if (col === "refProv") {
                        this.professionalServicesClaimsForm.patchValue(
                            {
                                refProv: res.seqProvXrefId,
                                attProvShortName: res.shortName,
                                attProvType: res.providerType,
                                attProvSpec: res.provSpecialty,
                                attProvIpaId: res.ipaId,
                            },
                            {emitEvent: !isDefaultState}
                        );
                    }
                    this.provContractSpecialtyService
                        .findBySeqProvId(res.seqProvId)
                        .subscribe((res1: any) => {
                            if (res1) {
                                if (col === "provider") {
                                    this.professionalServicesClaimsForm.patchValue(
                                        {
                                            admProvSpec:
                                                res1 && res1[0].provContractSpecialtyPrimaryKey
                                                    ? res1[0].provContractSpecialtyPrimaryKey
                                                        .specialtyType
                                                    : null,
                                        },
                                        {emitEvent: !isDefaultState}
                                    );
                                }
                            } else if (col === "refProv") {
                                this.professionalServicesClaimsForm.patchValue(
                                    {
                                        attProvSpec:
                                            res1 && res1[0].provContractSpecialtyPrimaryKey
                                                ? res1[0].provContractSpecialtyPrimaryKey.specialtyType
                                                : null,
                                    },
                                    {emitEvent: !isDefaultState}
                                );
                            }
                        });
                } else {
                    this.messageService
                        .findByMessageId(7193)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "7193: " + message[0].messageText,
                                "Professional Claims",
                                PopUpIconType.CLOSE
                            );
                        });
                }
            },
            (error: Error) => {
                this.professionalServicesClaimsForm.patchValue(
                    {
                        col: null,
                    },
                    {emitEvent: !isDefaultState}
                );
            }
        );
    }

    openVendorMasterLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorMasterSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.professionalServicesClaimsForm.patchValue({
                    vendor: res.vendorId,
                    seqVendId: res.seqVendId,
                    vendorAddress: "",
                });
                this.getVendorMasterByVenddorId(res.vendorId);
            }
        });
    }

    getVendorMasterTab(event: any) {
        this.professionalServicesClaimsForm.controls["vendorAddress"].setValue("", {
            emitEvent: false,
        });
        this.getVendorMasterByVenddorId(event.target.value);
    }

    getVendorMasterByVenddorId(vId: string) {
        this.getVendorAddressDropdownValues(vId);
        this.vendorMasterService
            .findVendorMasterByVendorId(vId)
            .subscribe((vendorMaster) => {
                this.professionalServicesClaimsForm.patchValue({
                    seqVendId: vendorMaster.seqVendId,
                });
                if (!vendorMaster.vendorId) {
                    this.messageService
                        .findByMessageId(11011)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                '11011 : ' + message[0].messageText,
                                'Professional Services Claims'
                            );
                        });
                    return;
                }

                this.professionalServicesClaimsForm.patchValue({
                    vendor: vendorMaster.vendorId,
                    vendorName: vendorMaster.shortName,
                    seqVendId: vendorMaster.seqVendId,
                });
            });
    }

    getVendorMasterBySeqVenddorId(seqVendId: number, isDefaultState = false) {
        this.vendorMasterService
            .getVendorMaster(seqVendId)
            .subscribe((vendorMaster) => {
                if (!vendorMaster.vendorId) {
                    return;
                }

                this.getVendorAddressDropdownValues(vendorMaster.vendorId);
                this.professionalServicesClaimsForm.patchValue(
                    {
                        vendor: vendorMaster.vendorId,
                        vendorName: vendorMaster.shortName,
                        seqVendId: vendorMaster.seqVendId,
                    },
                    {emitEvent: !isDefaultState}
                );
            });
    }

    servRsnSearchMdel = new SearchModel(
        "reasoncodemasters/lookup/servRsn",
        InstitutionalServRsnLookup.ALL,
        InstitutionalServRsnLookup.DEFAULT,
        [],
        true
    );

    openReasonCodeMasterLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.reasonCodeMasterSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: ReasonCodeMaster) => {
            if (res != null) {
                this.professionalServicesClaimsForm.patchValue({
                    svcRsn: res.reasonCode,
                });
            }
        });
    }

    getReasonCodeMasterTab(event: any) {
        let inputData = event.target.value;
        console.log(inputData, '=>>>>>>>>')
        if (inputData === '') {
            setTimeout(() => {
                this.renderer.selectRootElement('#totalBilled').focus()
            }, 500)
        } else {
            let res = [{placeOfSvcCode: inputData}];
            let sm = JSON.parse(JSON.stringify(this.servRsnSearchMdel));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(
                (resp) => {
                    if (resp == null) {
                        event.target.focus();
                        this.messageService.findByMessageId(27222).subscribe((message) => {
                            this.showPopUp(
                                '27222 : ' + message[0].messageText.replace('@1', inputData),
                                'Professional Services Claims'
                            );
                            this.professionalServicesClaimsForm.patchValue({
                                svcRsn: null,
                            });
                        });
                    }
                },
                (error) => {
                    event.target.focus();
                    this.messageService.findByMessageId(27222).subscribe((message) => {
                        this.showPopUp(
                            '27222 : ' + message[0].messageText.replace('@1', inputData),
                            'Professional Services Claims'
                        );
                        this.professionalServicesClaimsForm.patchValue({
                            svcRsn: null,
                        });
                    });
                }
            );
        }

    }

    showPopUp(message: string, title: string, iconType = PopUpIconType.INFO) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.iconType = iconType;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: any) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    createNewClaimPopup() {
        let popMsg = new PopUpMessage(
            "ClaimNotExistPopup",
            "Professional Services Claims",
            "7217: Entered Claim ID does not exist. Press yes to create a new Claim.",
            "icon"
        );

        popMsg.buttons = [
            new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("no", "No", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
            size: "lg",
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
    }

    resetForm(defaultData: any = {}) {
        this.professionalServicesClaimsForm.enable({emitEvent: false});
        this.professionalServicesClaimsForm.reset(defaultData);

        this.profsvcClaimHeader = new ProfsvcClaimHeader();
        this.editProfSvcClaim = false;
        this.hiddenAllFields = false;
        this.searchStatus = false;
        this.professionalServicesClaimsForm.patchValue(
            {
                paySub: "N",
                payDep: "N",
                privacyApplies: "N",
                securityCode: 0,
                primarySvcDate: null,
            },
            {emitEvent: false}
        );
        this.setFieldValue("eobReq", "N - NONE");
        this.setFieldValue("clmSubmRsnCode", "1 - Original");
        this.memberMaster = new MemberMaster();
        this.professionalServicesClaimsForm.get('dx2').disable()
        this.professionalServicesClaimsForm.get('dx3').disable()
        this.professionalServicesClaimsForm.get('dx4').disable()
    }


    saveProfClaimHeader() {
        if (this.professionalServicesClaimsForm.invalid) {
            let fieldName = '';
            fieldName = this.getFieldName();
            this.messageService
                .findByMessageId(29029)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        '29029: ' + message[0].messageText.replace('@1', fieldName),
                        'Professional Services Claims'
                    );
                });
            return;
        }
        if (this.editProfSvcClaim) {
            this.updateProfClaimHeader();
        } else {
            this.createProfClaimHeader();
        }
    }

    private getFieldName() {
        let fieldName = '';
        if (!Form.getValue(this.professionalServicesClaimsForm, 'svcDate')) {
            fieldName = 'Svc Date';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'dateRecv')) {
            fieldName = 'Date Recv';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'memberId')) {
            fieldName = 'Member ID';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'memberId')) {
            fieldName = 'Member ID';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'vendor')) {
            fieldName = 'Vendor';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'vendorAddress')) {
            fieldName = 'Addr';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'plcOfSvc')) {
            fieldName = 'Plc Of Svc';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'userDef1')) {
            fieldName = 'Incrd Cntry';
        } else if (!Form.getValue(this.professionalServicesClaimsForm, 'userDef2')) {
            fieldName = 'Image No';
        }
        return fieldName;
    }

    onPaySubscriberValueChange(isPayDependent = false) {
        let payValue: any; // pay value could be paySubscriber or payDependent
        if (!isPayDependent) {
            payValue = this.professionalServicesClaimsForm.value.paySubscriber;
        } else {
            payValue = this.professionalServicesClaimsForm.value.payDependent;
        }

        if (payValue === 'Y' || payValue == true) {
            this.professionalServicesClaimsForm.controls['vendor'].enable({
                emitEvent: false,
            });

            const vendorId = this.professionalServicesClaimsForm.value.vendor;
            if (this.editProfSvcClaim) {
                this.professionalServicesClaimsForm.controls['vendor'].disable();
            }
            const user = sessionStorage.getItem('user');
            const vendorAddress = this.vendorAddressDropdowns.find(
                (addr) => addr.seqVendAddress == this.vendorAddress
            );
            // execute database procedure
            /** ---------------------------------------- PROC Response
             * po_n_err_num: "0"        in case of error, code is negative
             po_n_seq_vend_address: ""
             po_n_seq_vend_id: ""
             po_s_err_msg: "null"
             po_s_short_name: ""
             */
            this.profsvcClaimHeaderService
                .callPaySubscriberProc(
                    vendorId,
                    this.seqSubsId,
                    user,
                    vendorAddress.primaryAddress
                )
                .subscribe(
                    (resp: object) => {
                        let procRespError = resp['po_n_err_num'];

                        if (procRespError.toString() !== '0') {
                            this.showPopUp(
                                `${procRespError.toString()} Error in calling Pay subscriber procedure`,
                                'Professional Services Claims'
                            );
                            return;
                        }

                        this.patchPayValues(isPayDependent, payValue);
                        this.paySubModalRef.close();
                    },
                    (error) => {
                        this.paySubModalRef.close();
                    }
                );
        } else {
            this.patchPayValues(isPayDependent, payValue);
            this.paySubModalRef.close();
        }
    }

    private patchPayValues(isPayDependent: boolean, payValue: any) {
        if (!isPayDependent) {
            // update the pay sub
            this.professionalServicesClaimsForm.patchValue({
                'paySub': payValue
            });
        } else {
            this.professionalServicesClaimsForm.patchValue({
                'payDep': payValue
            });
        }
    }

    patchFormValues(profsvcClaimHeader: ProfsvcClaimHeader) {
        const parFieldValue = this.parDropDownvalues.find(
            (code) => code.systemCode == profsvcClaimHeader.providerParStat
        );
        this.providerParStatus = parFieldValue.systemCode;
        let claimSubmReasonCode = this.claimSubmReasonCodeDropDownValues.find(
            (a) => a.value === profsvcClaimHeader.claimSubmReasonCode
        );
        this.professionalServicesClaimsForm.patchValue(
            {
                claimNumber: profsvcClaimHeader.claimNumber,
                svcDate: this.dateFormatPipe.defaultDisplayDateFormatPlusOneDay(
                    profsvcClaimHeader.primarySvcDate
                ),
                thruDate: this.dateFormatPipe.defaultDisplayDateFormat(
                    profsvcClaimHeader.claimThruDate
                ),
                authNo: profsvcClaimHeader.authNumber,
                secondaryAuth: profsvcClaimHeader.secondaryAuth,
                method: profsvcClaimHeader.authWaiveMethod,
                level: profsvcClaimHeader.authLevel,

                // ------------------------------ Member Info------------------------------
                diamondId:
                    profsvcClaimHeader.memberMaster &&
                    profsvcClaimHeader.memberMaster.diamondId, // --        diamond ID
                memberId:
                    profsvcClaimHeader.memberMaster &&
                    profsvcClaimHeader.memberMaster.subscriberId, // -----------------------------
                seqMembId: profsvcClaimHeader.seqMembId, // -----------------------------
                personNumber: profsvcClaimHeader.memberMaster.personNumber, // -----------------------------

                pcpId: profsvcClaimHeader.seqPcpId,
                pcpType: profsvcClaimHeader.pcpType,
                age: profsvcClaimHeader.memberAge,
                gender: profsvcClaimHeader.memberAge,
                groupId:
                    profsvcClaimHeader.groupMaster &&
                    profsvcClaimHeader.groupMaster.groupId,
                state: profsvcClaimHeader.memberState,
                plan: profsvcClaimHeader.planCode,
                Spec: profsvcClaimHeader.pcpSpec,
                IPA: profsvcClaimHeader.pcpIpaId,
                //  'guCatEffectiveDate': profsvcClaimHeader.memberMaster.as_of_date,                      // TOdo need to confirm
                //  'guCategory': profsvcClaimHeader.memberMaster.,                      // TOdo need to confirm
                LOB: profsvcClaimHeader.lineOfBusiness,
                panel: profsvcClaimHeader.panelId,

                // ---------------------- Provider Information -----------------------------

                admProv: profsvcClaimHeader.seqRefProvId,
                provType: profsvcClaimHeader.providerType,
                paySub: profsvcClaimHeader.paySubscriber,
                payDep: profsvcClaimHeader.payDependent,
                refProvSpec: profsvcClaimHeader.providerSpec,
                refProvIpaID: profsvcClaimHeader.providerIpaId,

                refProv: profsvcClaimHeader.seqRefProvId,
                payStub: profsvcClaimHeader.paySubscriber,
                provider: profsvcClaimHeader.provMasterSeqVendId.providerId,
                acctNumber: profsvcClaimHeader.patControlNo,
                covProv: profsvcClaimHeader.covProvFlag,
                coveringMethod: profsvcClaimHeader.coveringMethod,
                providerAddress: profsvcClaimHeader.seqProvAddress,
                zip: profsvcClaimHeader.providerPostalCode,
                par: profsvcClaimHeader.providerParStat,
                inSvcArea: profsvcClaimHeader.inServiceArea,
                providerType: profsvcClaimHeader.providerType,
                providerSpec: profsvcClaimHeader.providerSpec,
                providerParStat: parFieldValue
                    ? parFieldValue.systemCodeDesc1
                    : profsvcClaimHeader.providerParStat,
                providerParIPA: profsvcClaimHeader.providerIpaId,
                vendor: profsvcClaimHeader.seqVendId, // todo need to confirm
                vendorAddress: profsvcClaimHeader.provMasterSeqProvId.vendorAddress.addressLine1,

                // ------------------------------ Claim Information ------------------------

                plcOfSvc: profsvcClaimHeader.placeOfService1,
                svcRsn: profsvcClaimHeader.serviceReason1,
                imageNo: profsvcClaimHeader.userDefined2,
                totalBilled: Form.getCurrencyInputDisplay(this.currencyPipe, profsvcClaimHeader.totalBilledAmt),
                facilityId: profsvcClaimHeader.facilityLabIdNo,
                dateRecv: this.dateFormatPipe.defaultDisplayDateFormatPlusOneDay(
                    profsvcClaimHeader.dateReceived
                ),
                securityCode: profsvcClaimHeader.securityCode,
                batchNumber: this.claimBatchInitData.batchNumber
                    ? this.claimBatchInitData.batchNumber
                    : profsvcClaimHeader.batchNumber,

                dx1: profsvcClaimHeader.diagnosis1,
                dx2: profsvcClaimHeader.diagnosis2,
                dx3: profsvcClaimHeader.diagnosis3,
                dx4: profsvcClaimHeader.diagnosis4,

                invalidData: profsvcClaimHeader.invalidDataInd == 'Y',
                privacyApplies: profsvcClaimHeader.privacyApplies,

                userDef1: profsvcClaimHeader.userDefined1,
                userDef2: profsvcClaimHeader.userDefined2,
                eobReq: profsvcClaimHeader.explanationAttached,

                memberAge: profsvcClaimHeader.memberAge,
                memberGender: this.profsvcClaimHeader.memberGender,
                planCode: this.profsvcClaimHeader.planCode,

                lineOfBusiness: this.profsvcClaimHeader.lineOfBusiness,
                addr002: this.profsvcClaimHeader.seqVendAddress,
                addr001: this.profsvcClaimHeader.seqProvAddress,

                seqProvId: this.profsvcClaimHeader.seqProvId,

                seqVendId: this.profsvcClaimHeader.seqVendId,
                seqVendAddress: this.profsvcClaimHeader.seqVendAddress,
                seqGroupId: this.profsvcClaimHeader.seqGroupId,
                vendorName: this.profsvcClaimHeader.vendorMaster
                    ? this.profsvcClaimHeader.vendorMaster.shortName
                    : "",
                groupName: this.profsvcClaimHeader.groupMaster
                    ? this.profsvcClaimHeader.groupMaster.shortName
                    : "",
                groupState: this.profsvcClaimHeader.groupMaster
                    ? this.profsvcClaimHeader.groupMaster.state
                    : "",
                // paySubscriber: this.profsvcClaimHeader.paySubscriber,
                clmSubmRsnCode: claimSubmReasonCode ? claimSubmReasonCode.key : this.claimSubmReasonCodeDropDownValues[0].key,
                // set values of Submitted Authorization
                submittedAuthorization: this.profsvcClaimHeader.submittedAuthNumber,
                submittedSecAuthorization: this.profsvcClaimHeader
                    .submittedSecondaryAuth,

                authorization: this.profsvcClaimHeader.authNumber,
                secAuthorization: this.profsvcClaimHeader.secondaryAuth,
            },
            {emitEvent: false}
        );

        setTimeout(() => {
            this.isFormValidateStatus();
        }, 2000)

        if (this.profsvcClaimHeader.seqProvId) {
            this.getProviderAddressDropdownValues(this.profsvcClaimHeader.seqProvId);
        }

        if (this.profsvcClaimHeader.seqVendId) {
            this.getVendorMasterBySeqVenddorId(
                this.profsvcClaimHeader.seqVendId,
                true
            );
        }

        // if (this.profsvcClaimHeader.seqMembId) {
        //   this.getMemberMasterBySubscriberId(true);
        // }
        if (this.profsvcClaimHeader.seqProvId) {
            this.findBySeqProviderId(
                this.profsvcClaimHeader.seqProvId.toString().toUpperCase(),
                "provider",
                true
            );
        }
        if (this.profsvcClaimHeader.seqRefProvId) {
            this.findBySeqProviderId(
                this.profsvcClaimHeader.seqRefProvId.toString().toUpperCase(),
                "refProv",
                true
            );
        }

        if (this.profsvcClaimHeader.diagnosis1) {
            this.findByDiagnosisCode(this.profsvcClaimHeader.diagnosis1, "dx1", true);
        }
        if (this.profsvcClaimHeader.diagnosis2) {
            this.findByDiagnosisCode(this.profsvcClaimHeader.diagnosis2, "dx2", true);
        }
        if (this.profsvcClaimHeader.diagnosis3) {
            this.findByDiagnosisCode(this.profsvcClaimHeader.diagnosis3, "dx3", true);
        }
        if (this.profsvcClaimHeader.diagnosis4) {
            this.findByDiagnosisCode(this.profsvcClaimHeader.diagnosis4, "dx4", true);
        }
        if (this.profsvcClaimHeader.authNumber) {
            this.changeAuthNumber(this.profsvcClaimHeader.authNumber, true);
        }

        this.disableDefaultFields();
    }

    changeAuthNumber(value: any, isDefaultState: any = false) {
        if (!value) {
            return;
        }
        let res = [{AUTH_NUMBER: value}];
        let sm = JSON.parse(JSON.stringify(this.authNumberSearchMdel));
        sm.searchOption = res;
        this.searchService.getSearchResults(sm).subscribe(
            (resp) => {
                if (resp == null) {
                    this.professionalServicesClaimsForm.patchValue(
                        {
                            authNo: null,
                            textbox001: null,
                            authLevel: null,
                        },
                        {emitEvent: !isDefaultState}
                    );
                } else {
                    this.professionalServicesClaimsForm.patchValue(
                        {
                            authNo: resp[0].AUTH_NUMBER,
                            textbox001: resp[0].AUTH_SECONDARY_AUTH_NO,
                            authLevel: resp[0].AUTH_LEVEL,
                        },
                        {emitEvent: !isDefaultState}
                    );
                }

                if (isDefaultState) {
                    this.popupClose = false;
                }
            },
            (error) => {
                this.professionalServicesClaimsForm.patchValue(
                    {
                        authNo: null,
                        textbox001: null,
                        authLevel: null,
                    },
                    {emitEvent: !isDefaultState}
                );
            }
        );
    }

    getFormData(
        profsvcClaimHeader: ProfsvcClaimHeader,
        disableDefaultFields = true
    ): ProfsvcClaimHeader {
        this.professionalServicesClaimsForm.enable();
        profsvcClaimHeader.seqClaimId = this.professionalServicesClaimsForm.value.claimNumber;

        profsvcClaimHeader.primarySvcDate = Form.getDatePickerValue(
            this.professionalServicesClaimsForm,
            "svcDate"
        );

        profsvcClaimHeader.claimThruDate = Form.getDatePickerValue(
            this.professionalServicesClaimsForm,
            "thruDate"
        );
        profsvcClaimHeader.authNumber = this.professionalServicesClaimsForm.value.authNo;
        profsvcClaimHeader.claimNumber = this.professionalServicesClaimsForm.value.claimNumber;
        profsvcClaimHeader.secondaryAuth = this.professionalServicesClaimsForm.value.secondaryAuth;
        profsvcClaimHeader.seqMembId = this.professionalServicesClaimsForm.value.seqMembId;
        profsvcClaimHeader.seqGroupId = this.professionalServicesClaimsForm.value.seqGroupId;
        profsvcClaimHeader.securityCode = this.professionalServicesClaimsForm.value.securityCode;

        // ---------------------- Provider Information -----------------------------
        //  profsvcClaimHeader.seqProvId = this.professionalServicesClaimsForm.value.provider;
        profsvcClaimHeader.seqProvId = this.professionalServicesClaimsForm.value.admSeqProvId; // admSeqProvId managed for provider field
        profsvcClaimHeader.seqVendId = this.professionalServicesClaimsForm.value.seqVendId;
        const provAddress = this.professionalServicesClaimsForm.value.providerAddress;
        profsvcClaimHeader.seqProvAddress =
            this.currentProvAddress && this.currentProvAddress.seqProvAddress
                ? this.currentProvAddress.seqProvAddress
                : provAddress;
        const vendAddress = this.professionalServicesClaimsForm.value.vendorAddress;
        profsvcClaimHeader.seqVendAddress =
            this.currentVendorAddress && this.currentVendorAddress.seqVendId
                ? this.currentVendorAddress.seqVendId
                : vendAddress;
        profsvcClaimHeader.providerPostalCode = this.professionalServicesClaimsForm.value.zip;
        profsvcClaimHeader.providerParStat = this.professionalServicesClaimsForm.value.providerParStat;

        const parValue = this.professionalServicesClaimsForm.value.providerParStat;
        const parFieldValue = this.parDropDownvalues.find(
            (code) => code.systemCodeDesc1 == parValue
        );

        profsvcClaimHeader.providerParStat = parFieldValue
            ? parFieldValue.systemCode
            : parValue;
        profsvcClaimHeader.paySubscriber = this.professionalServicesClaimsForm.value.paySub;
        profsvcClaimHeader.payDependent = this.professionalServicesClaimsForm.value.payDep;

        // --------------------------- Claim Info ---------------------
        profsvcClaimHeader.placeOfService1 = this.professionalServicesClaimsForm.value.plcOfSvc;

        profsvcClaimHeader.serviceReason1 = this.professionalServicesClaimsForm.value.svcRsn;
        profsvcClaimHeader.userDefined2 = this.professionalServicesClaimsForm.value.userDef2;
        profsvcClaimHeader.userDefined1 = this.professionalServicesClaimsForm.value.userDef1;
        profsvcClaimHeader.diagnosis1 = this.professionalServicesClaimsForm.value.dx1;
        profsvcClaimHeader.diagnosis2 = this.professionalServicesClaimsForm.value.dx2;
        profsvcClaimHeader.diagnosis3 = this.professionalServicesClaimsForm.value.dx3;
        profsvcClaimHeader.diagnosis4 = this.professionalServicesClaimsForm.value.dx4;
        profsvcClaimHeader.batchNumber = this.professionalServicesClaimsForm.value.batchNumber;

        profsvcClaimHeader.facilityLabIdNo = this.professionalServicesClaimsForm.value.facilityId;
        profsvcClaimHeader.securityCode = this.professionalServicesClaimsForm.value.securityCode;
        profsvcClaimHeader.totalBilledAmt = this.professionalServicesClaimsForm.value.totalBilled;
        profsvcClaimHeader.dateReceived = Form.getDatePickerValue(
            this.professionalServicesClaimsForm,
            "dateRecv"
        );

        profsvcClaimHeader.explanationAttached = this.professionalServicesClaimsForm.value.eobReq;
        profsvcClaimHeader.paySubscriber = this.professionalServicesClaimsForm.value
            .paySubscriber === 'Y'
            ? "Y"
            : "N";

        profsvcClaimHeader.invalidDataInd = this.professionalServicesClaimsForm
            .value.invalidData
            ? "Y"
            : "N";
        if (disableDefaultFields) {
            this.disableDefaultFields();
        }
        return profsvcClaimHeader;
    }

    disableDefaultFields() {
        this.professionalServicesClaimsForm.controls["svcDate"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["thruDate"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["textbox001"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["diamondId"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["memberId"].disable({
            emitEvent: false,
        });

        this.professionalServicesClaimsForm.controls["state"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["refProv"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["provider"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls['providerAddress'].disable({
            emitEvent: false
        });
        this.professionalServicesClaimsForm.controls["vendor"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls['vendorAddress'].disable({
            emitEvent: false
        });
        if (this.professionalServicesClaimsForm.get('dx4').value === '') {
            this.professionalServicesClaimsForm.controls["dx4"].disable({
                emitEvent: false,
            });
        } else {
            this.professionalServicesClaimsForm.controls["dx4"].enable({
                emitEvent: false,
            });
        }
        if (this.professionalServicesClaimsForm.get('dx3').value === '') {
            this.professionalServicesClaimsForm.controls["dx3"].disable({
                emitEvent: false,
            });
        } else {
            this.professionalServicesClaimsForm.controls["dx3"].enable({
                emitEvent: false,
            });
        }
        if (this.professionalServicesClaimsForm.get('dx2').value === '') {
            this.professionalServicesClaimsForm.controls["dx2"].disable({
                emitEvent: false,
            });
        } else {
            this.professionalServicesClaimsForm.controls["dx2"].enable({
                emitEvent: false,
            });
        }
        this.professionalServicesClaimsForm.controls["securityCode"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["privacyApplies"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls["claimNumber"].disable({
            emitEvent: false,
        });
        this.professionalServicesClaimsForm.controls['zip'].disable({emitEvent: false})
        this.editProfSvcClaim = false;
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.professionalServicesClaimsForm = this.formBuilder.group({
            claimNumber: [
                "",
                {updateOn: "change", validators: [Validators.maxLength(16)]},
            ],
            svcDate: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: [Validators.required]},
            ],
            thruDate: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            authNo: ["", {updateOn: "blur", validators: [Validators.maxLength(9)]}],

            secondaryAuth: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: [Validators.maxLength(3)]},
            ],
            method: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            level: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            diamondId: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            memberId: [
                {value: "", disabled: true},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        Validators.maxLength(12),
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],

            pcpId: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            pcpType: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            age: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            gender: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            plan: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            state: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            Spec: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            IPA: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            LOB: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            Panel: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],

            // ----------------------- Provider Info

            admProv: ["", {updateOn: "blur", validators: []}],
            coveringMethod: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            provType: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            paySub: [
                {value: "N", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            payDep: [
                {value: "N", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            refProvSpec: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            refProvIpaID: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            refProv: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            payStub: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            provider: [
                {value: "", disabled: true},
                {updateOn: "change", validators: []},
            ], // TODO mapping to insCliamProv is missing(removed for test Validators.required)
            acctNumber: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            covProv: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            providerAddress: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            zip: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            inSvcArea: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            providerType: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            providerParStat: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            providerSpec: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            providerParIPA: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            vendor: [
                {value: "", disabled: true},
                {
                    updateOn: "change",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            vendorAddress: [
                {value: "", disabled: true},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],

            textbox001: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            textbox002: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            guCat: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],

            addr001: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            par: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            addr002: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            plcOfSvc: [
                {value: "", disabled: false},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                        Validators.maxLength(5),
                    ],
                },
            ],
            dx1: [
                {value: "", disabled: false},
                {updateOn: "change", validators: [Validators.maxLength(30)]},
            ],
            incrdCntry: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: [Validators.maxLength(15)]},
            ],
            svcRsn: [
                {value: "", disabled: false},
                {updateOn: "change", validators: []},
            ],
            dx2: [
                {value: "", disabled: true},
                {updateOn: "change", validators: [Validators.maxLength(30)]},
            ],
            imageNo: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: [Validators.maxLength(15)]},
            ],
            totalBilled: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            dx3: [
                {value: "", disabled: true},
                {updateOn: "change", validators: [Validators.maxLength(30)]},
            ],
            facilityId: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            dateRecv: [
                {value: "", disabled: false},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            dx4: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: [Validators.maxLength(30)]},
            ],
            securityCode: [
                {value: "0", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            eobReq: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            batchNumber: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            invalidData: [
                {value: "", disabled: false},
                {updateOn: "blur", validators: []},
            ],
            privacyApplies: [
                {value: "N", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            clmSubmRsnCode: [
                {value: "", disabled: true},
                {updateOn: "blur", validators: []},
            ],
            userDef1: [
                {value: "", disabled: true},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                        Validators.maxLength(15),
                    ],
                },
            ],
            userDef2: [
                {value: "", disabled: true},
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                        Validators.maxLength(15),
                    ],
                },
            ],
            dx1ShortDesc: ["", {validators: []}],
            drg: ["", {validators: []}],
            servRsn: ["", {validators: [Validators.maxLength(5)]}],
            dx2ShortDesc: ["", {validators: []}],

            dx3ShortDesc: ["", {validators: []}],
            eobInd: ["", {validators: []}],
            sec: ["", {validators: [Validators.maxLength(1)]}],
            dx4ShortDesc: ["", {validators: []}],
            paperEobReq: ["", {validators: [Validators.maxLength(1)]}],

            provSignOnFile: ["", {validators: []}],
            paySubscriber: ["", {validators: []}],
            memberGender: [""],
            pcpIpaId: [""],
            panelId: [""],
            planCode: [""],
            groupName: [""],
            groupState: [""],
            seqGroupId: [""],
            groupId: [""],
            lineOfBusiness: [""],
            memberAge: [""],
            seqMembId: [""],
            seqProvId: [""],
            seqVendId: [""],
            inServiceArea: [""],
            authLevel: [""],
            vendorName: [""],
            provShortName: [""],
            admProvType: [""],
            admProvSpec: [""],
            admProvIpaId: [""],
            admSeqProvId: [""],
            attProvShortName: [""],
            attProvType: [""],
            attProvSpec: [""],
            attProvIpaId: [""],
            personNumber: [""],
            // controls for Submitted Authorization
            submittedAuthorization: ["", {validators: []}],
            authorization: ["", {validators: []}],
            submittedSecAuthorization: ["", {validators: []}],
            secAuthorization: ["", {validators: []}],
            payDependent: ["", {validators: []}],
        });

        this.setFieldValue("eobReq", "N - NONE");
        this.setFieldValue("clmSubmRsnCode", "1 - Original");
    }

    /**
     * TODO need to find the procedure f_deny_ncsta_claim
     */
    addUserDef1Validation() {
        const profsvcClaimHeader: ProfsvcClaimHeader = this.getFormData(
            new ProfsvcClaimHeader()
        );
        const body = {
            subscriberMemberId: Number(profsvcClaimHeader.seqMembId),
            svcDate: profsvcClaimHeader.primarySvcDate,
        };
        if (!body.subscriberMemberId || !body.svcDate) {
            return;
        }

        this.profsvcClaimHeaderService
            .getUserDef1ValidationResponseByProc(body)
            .subscribe((isCitizenship) => {
                if (profsvcClaimHeader.userDefined1 == isCitizenship) {
                    this.messageService
                        .findByMessageId(11073)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error(
                                "90059: " + message[0].messageText
                            );
                        });
                }
            });
    }

    onAddressChange(event: any, fieldName: any = null) {
        if (fieldName == "personNumber") {
            this.onChangPersonNumber(null);
        }
        if (event) {
            let addressId = event;
            let address = this.provAddressDropdowns.filter(
                (a) => a.seqProvAddress === parseInt(addressId)
            )[0];
            if (address && address.zipCode) {
                this.professionalServicesClaimsForm.patchValue({
                    zip: address.zipCode,
                });
            }
            this.addressString = '';
            this.addressString += (address && address.addressLine1) ? address.addressLine1 + ', ' : '';
            this.addressString += (address && address.addressLine2) ? address.addressLine2 + ', ' : '';
            this.addressString += (address && address.city) ? address.city + ', ' : '';
            this.addressString += (address && address.state) ? address.state + ', ' : '';
            this.addressString += (address && address.country) ? address.country + ' - ' : '';
            this.addressString += (address && address.zipCode) ? address.zipCode : '';
        }


        this.par.nativeElement.focus();
    }

    validateDateReceivedDate(event: any) {
        let today = new Date();
        if (event.singleDate) {
            let dateReceived = this.getDate(event.singleDate);

            if (dateReceived > today) {
                this.messageService.findByMessageId(70475).subscribe((message) => {
                    this.showPopUp(
                        "70475 : " + message[0].messageText,
                        "Professional Services Claims"
                    );
                    this.professionalServicesClaimsForm.patchValue({
                        thruDate: null,
                    });
                });
            }
        }
        // this.inputEvent();
    }

    onVenderAddressChange(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.showPopUp(
                    "34004 : " + 'Remember to F11, F9, F9, F9, F9, F9!!! - 35107',
                    "Vendor First Providers"
                );
            } else {
                if (this.professionalServicesClaimsForm.controls.seqVendId.value) {
                    let searchmodel: SearchModel = this.admProvSearchModel;
                    searchmodel.searchOption = [{'SEQ_VEND_ID': this.professionalServicesClaimsForm.controls.seqVendId.value}]
                    this.openLookupFieldSearchModel('institution', true, searchmodel);
                } else {
                    this.openLookupFieldSearchModel('institution');
                }
            }
        }
    }

    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", shortcutKey: 'Ctrl+M'},
                    {name: "Open", shortcutKey: 'Ctrl+O'},
                    {name: 'Delete', shortcutKey: 'Ctrl+D', disabled: true},
                    {name: "Save", shortcutKey: 'Ctrl+S'},
                    {name: "Close", shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: "Main Menu...", shortcutKey: 'F2'},
                    {name: "Shortcut Menu...", shortcutKey: "F3"},
                    {isHorizontal: true},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit", shortcutKey: 'Alt+F4'},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", shortcutKey: 'Ctrl+x', disabled: true},
                    {name: "Copy", shortcutKey: 'Ctrl+C', disabled: true},
                    {name: "Paste", shortcutKey: 'Ctrl+V', disabled: true},
                    {isHorizontal: true},
                    {name: "Lookup", shortcutKey: 'F5'},
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    {name: "Header File"},
                    {name: "Detail File"},
                    {name: "Patient Liabilities", disabled: true},
                    {name: "Other Claim Info"},
                    {name: "Hold Reasons"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Claim Lookup"},
                    {name: "Submitted Authorization"},
                    {name: "Pay Subscriber"},
                    {name: "Pay Dependent", disabled: true},
                    {name: "Change Default Batch"},
                    {name: "Edit Vendor Info"},
                    {name: "Other Amounts Info", disabled: true},
                    {
                        name: "Authorization Waive/Match",
                        dropdownItems: [
                            {name: "Manual Waive"},
                            {name: "Undo Waive"},
                            {name: "Re-Apply Waive"},
                            {name: "Re-Apply Match"},
                            {name: "Re-Apply Match/Waive"},
                        ],
                    },
                    {name: "COB Information"},
                    {name: "View IPA Info"},
                    {name: "Re-apply Claim Holds"},
                    {name: "Attach EOB/RA Remarks"},
                    {name: "Change Header"},
                    {name: "View COB History"},
                    {name: "View Claims with Auth Number"},
                    {
                        name: "Submitted Claim Information",
                        dropdownItems: [
                            {name: "Claim Header/UB92 Information"},
                            {name: "Provider/Vendor Information"},
                        ],
                    },
                    {name: "Reset Audit Status", disabled: true},
                    {name: "View Claim Totals"},
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: "F4"}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile", shortcutKey: 'Shift+Alt+T'},
                    {name: "Layer", shortcutKey: 'Shift+Alt+L'},
                    {name: "Cascade", shortcutKey: 'Shift+Alt+C'},
                    {name: "Arrange Icons", shortcutKey: 'Shift+Alt+I'},
                    {isHorizontal: true},
                    {name: "Show TimeStamp", shortcutKey: 'Shift+Alt+S'},
                    {name: "Processing Messages", shortcutKey: 'Shift+Alt+P'},
                    {name: 'Hold Reason Display', shortcutKey: 'Shift+Alt+H'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Professional Services Claims"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window", shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: "Glossary"},
                    {name: "Getting Started"},
                    {name: "How to use Help"},
                    {isHorizontal: true},
                    {name: "About Diamond Client/Server"},
                ],
            },
        ];
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.action && event.action === "Claim Header/UB92 Information") {
            if (this.profsvcClaimHeader.claimNumber) {
                let ref = this.modalService.open(ClaimHeaderInformationComponent, {
                    size: "lg",
                });
                ref.componentInstance.seqClaimId = this.profsvcClaimHeader.seqClaimId;
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(7142)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "7142: " + message[0].messageText,
                            "Professional Services Claims"
                        );
                    });
            }
        } else if (event.action && event.action === "Provider/Vendor Information") {
            if (this.profsvcClaimHeader.claimNumber) {
                let ref = this.modalService.open(ProviderVendorInformationComponent, {
                    size: "lg",
                });
                ref.componentInstance.seqClaimId = this.profsvcClaimHeader.seqClaimId;
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(7142)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "7142: " + message[0].messageText,
                            "Professional Services Claims"
                        );
                    });
            }
        }

        if (event.menu.menuItem === "File") {
            // handle File actions

            switch (event.action) {
                case "New": {
                    this.resetForm();
                    break;
                }
                case "Open": {
                    this.openScreen();
                    break;
                }
                case "Save": {
                    this.saveProfClaimHeader();
                    break;
                }
                case "Close": {
                    this.activeModal.dismiss();
                    break;
                }
                case "Main Menu...": {
                    this.activeModal.dismiss();
                    break;
                }
                case "Exit": {
                    this.activeModal.dismiss();
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
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Topic") {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigateByUrl("diamond/functional-groups");
                    break;
                }
                case "Audit Display": {
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

                    break;
                }
                case "Show TimeStamp": {
                    this.showTimeStamp();
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        } else if (event.menu.menuItem == 'Notes') {
            this.openNoteShortCut()
        }
    }

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Professional Services Claims";

        ref.componentInstance.insertDateTime = this.profsvcClaimHeader.insertDatetime;
        ref.componentInstance.insertDateTime = this.profsvcClaimHeader.insertDatetimeDisplay;

        ref.componentInstance.insertProcess = this.profsvcClaimHeader.insertProcess;
        ref.componentInstance.insertUser = this.profsvcClaimHeader.insertUser;
        ref.componentInstance.updateUser = this.profsvcClaimHeader.updateUser;
        ref.componentInstance.updateDateTime = this.profsvcClaimHeader.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.profsvcClaimHeader.updateProcess;
    };

    handleAuthWaiveMenu(action: string) {
        switch (action) {
            case "Re-Apply Waive": {
                let ref = this.modalService.open(AuthWaiveRulesComponent, {
                    size: "lg",
                });
                break;
            }

            default: {
                let ref = this.modalService.open(AuthWaiveRulesComponent, {
                    size: "lg",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.claimType = "P";
                break;
            }
        }
    }

    openProfSvcClaimDetailFile() {
        this.isChildModalOpen = true;
        const ref = this.modalService.open(ProfessionalServicesClaimsDetailComponent, {
            windowClass: "input-class",
            size: "xl",
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.claimNumber = this.profsvcClaimHeader.claimNumber;
        ref.componentInstance.memberMaster = this.memberMaster;
        this.activeModal.close();
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleTopicMenu(action: string) {
        switch (action) {
            case "Header File": {
                break;
            }
            case "Detail File": {
                if (this.professionalServicesClaimsForm.get('claimNumber').value) {
                    this.openProfSvcClaimDetailFile();
                } else {

                }
                break;
            }
            case "Patient Liabilities": {
                this.toastService.showToast(
                    "Screen is in progress",
                    NgbToastType.Danger
                );

                break;
            }
            case "Other Claim Info": {
                this.isChildModalOpen = true;
                const ref = this.modalService.open(
                    ProfessionalServicesClaimsOtherComponent,
                    {
                        windowClass: "input-class",
                        size: "lg",
                        beforeDismiss: () => {
                            this.isChildModalOpen = false;
                            return true;
                        },
                    }
                );
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.claimNumber = this.profsvcClaimHeader.claimNumber;
                break;
            }
            case "Hold Reasons": {
                let ref = this.modalService.open(ClaimHoldReasonsComponent, {size: "lg"});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.claimNumber = this.profsvcClaimHeader.claimNumber;
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }

    paySubModalRef: NgbModalRef;
    payDependentModalRef: NgbModalRef;
    submittedAuthModalRef: NgbModalRef;

    private handleSpecialMenu(action: string) {
        switch (action) {
            case "Claim Lookup": {
                this.openClaimLookup();
                break;
            }
            case "Submitted Authorization": {
                this.submittedAuthModalRef = this.modalService.open(
                    this.submittedAuthorizationTemplate,
                    {windowClass: "paySubscriberModel"}
                );
                break;
            }
            case "Pay Subscriber": {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_CLAIMS_PAY_SUB);
                if (status) {
                    this.paySubModalRef = this.modalService.open(
                        this.paySubscriberTemplate,
                        {windowClass: "paySubscriberModel"}
                    );
                } else {
                    this.messageService.findByMessageId(7210).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('7210: ' + message[0].messageText);
                    });
                }

                break;
            }
            case "Pay Dependent": {
                this.payDependentModalRef = this.modalService.open(
                    this.payDependentModalRef,
                    {windowClass: "paySubscriberModel"}
                );
                break;
            }
            case "Change Default Batch": {
                let ref = this.modalService.open(ClaimsBatchInitiationComponent, {
                    size: "lg",
                });
                this.claimBatchInitData = {
                    batchNumber: this.professionalServicesClaimsForm.value.batchNumber
                        ? this.professionalServicesClaimsForm.value.batchNumber
                        : "",
                    dateReceived: this.professionalServicesClaimsForm.value.dateRecv
                        ? this.professionalServicesClaimsForm.value.dateRecv
                        : "",
                };

                ref.componentInstance.claimBatchInitData = this.claimBatchInitData;
                ref.componentInstance.buttonclickEvent.subscribe((data: any) => {
                    this.claimBatchInitData.batchNumber = data.batchNumber;
                    this.claimBatchInitData.dateReceived = data.dateReceived;

                    this.professionalServicesClaimsForm.patchValue({
                        batchNumber: this.claimBatchInitData.batchNumber,
                        dateRecv: this.claimBatchInitData.dateReceived,
                    });
                });
                break;
            }
            case "Edit Vendor Info": {
                let ref = this.modalService.open(VendorMasterComponent, {size: "lg"});
                ref.componentInstance.showIcon = true;

                this.professionalServicesClaimsForm.controls["vendor"].enable({
                    emitEvent: false,
                });
                ref.componentInstance.vendorID = this.professionalServicesClaimsForm.value.vendor;
                if (!this.editProfSvcClaim) {
                    this.professionalServicesClaimsForm.controls["vendor"].disable({
                        emitEvent: false,
                    });
                }

                ref.componentInstance.winID = this.windowId;

                break;
            }
            case "Other Amounts Info": {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );

                break;
            }
            case "Authorization Waive/Match": {
                break;
            }
            case "COB Information": {
                let ref = this.modalService.open(
                    MemberCobVerificationInformationComponent,
                    {size: "lg"}
                );
                ref.componentInstance.showIcon = true;
                ref.componentInstance.seqMembId = this.professionalServicesClaimsForm.value.memberId;

                break;
            }
            case "Attach EOB/RA Remarks": {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );

                break;
            }
            case "Change Header": {
                this.messageService.findByMessageId(70920).subscribe(res => {
                    this.showPopUp(
                        '70920: ' + res[0].messageText.replace('@1', 'F'),
                        'Professional Services Claims',
                    )
                });
                break;
            }
            case "View IPA Info": {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );

                break;
            }
            case "Re-apply Claim Holds": {
                if (this.professionalServicesClaimsForm.value.vendor) {
                    let ref = this.modalService.open(ClaimHoldRulesComponent, {
                        size: "lg",
                    });
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.vid = this.professionalServicesClaimsForm.value.vendor;
                } else {
                    this.showPopUp(
                        "Vendor Id not exists",
                        "Professional Services Claims"
                    );
                }
                break;
            }
            case "View COB History": {
                this.professionalServicesClaimsForm.controls["memberId"].enable({
                    emitEvent: false,
                });
                const memberId = this.professionalServicesClaimsForm.value.memberId;

                if (!this.editProfSvcClaim) {
                    this.professionalServicesClaimsForm.controls["memberId"].disable({
                        emitEvent: false,
                    });
                }

                if (memberId) {
                    let ref = this.modalService.open(MemberCobHistoryComponent, {
                        size: "lg",
                    });
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.SubID = memberId;
                } else {
                    this.showPopUp(
                        "Member Id not exists",
                        "Professional Services Claims"
                    );
                }
                break;
            }
            case "View Claims with Auth Number": {
                let ref = this.modalService.open(ClaimDetailAuthProcRuleComponent, {
                    size: "lg",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case "Submitted Claim Information": {
                let ref = this.modalService.open(ClaimDisplayComponent, {size: "lg"});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }

            case "Provider/Vendor Information": {
                break;
            }
            case "Reset Audit Status": {
                let ref = this.modalService.open(AuditDisplayComponent, {size: "lg"});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case "View Claim Totals": {
                let ref = this.modalService.open(ClaimDisplayTotalsComponent, {size: "lg"});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.profsvcClaimHeader = this.profsvcClaimHeader;
                break;
            }

            default: {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case "Lookup": {
                this.openClaimLookup();
                break;
            }
            default: {
                this.toastService.showToast(
                    "This option is not implemented yet",
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.popupAlert(
                        message[0].messageText,
                        "Professional Services Claims"
                    );
                });
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage(
                "popUpMessageName",
                title,
                message,
                "icon"
            );
            popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
            popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
            popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === "Yes") {
                    this.saveProfClaimHeader();
                } else if (resp.name === "No") {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    onSubmRsnFieldValueChange(event: any) {
        if (event.key == "Tab") {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#userDef1').focus()
            }, 500)
        }
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, {windowClass: 'myCustomModalClass'});
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/PSCLM_Professional_Services_Claims.htm'
    }

    getDateRecvTab(event: any, field: any) {
        let value = new Date(event.target.value);
        if (!this.isValidDate(value)) {
            this.messageService
                .findByMessageId(29031).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    '29031: ' + message[0].messageText.replace('@1', 'M/d/yyyy'),
                    'Professional Services Claims',
                );
            });
        }
    }

    openClaimsCurrencyConversionAddon()
    {
        if (this.profsvcClaimHeader) {
            const ref = this.modalService.open(AddonClaimsControllerComponent, {
                size: <any>'xl',
                ...NGBModalOptions, windowClass: 'dashboard-modal'
            });
            ref.componentInstance.profsvcClaimHeader = this.profsvcClaimHeader;
            ref.componentInstance.subscriberId = this.profsvcClaimHeader.memberMaster.subscriberId;
            ref.componentInstance.seqMembId = this.profsvcClaimHeader.memberMaster.seqMembId;
            ref.componentInstance.seqSubsId = this.profsvcClaimHeader.memberMaster.seqSubsId;
            ref.componentInstance.personNumber = this.profsvcClaimHeader.memberMaster.personNumber;
            ref.componentInstance.memberName = this.profsvcClaimHeader.memberMaster.firstName + " " + this.profsvcClaimHeader.memberMaster.lastName;
        } else {
            this.messageService.findByMessageId(13062).subscribe((message: MessageMasterDtl[]) => {
                console.log("message", message);
                this.showPopUp('Select a claims first', 'Professional Services Claims');
            });
        }
    }

    openNoteShortCut() {
        if (this.professionalServicesClaimsForm.get('claimNumber').value === '') {
            this.messageService.findByMessageId(29005).subscribe(res => {
                this.showPopUp('29005: ' + res[0].messageText, 'DIAMOND@ Client/Server System')
            })
        } else {
            this.popUpNotesMenuClicked(null);
        }
    };

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.keyValues;
    };

    getPriorityBySourceAndNote() {
        this.noteMasterService.findPriorityBySourceAndNote(this.keyValues, this.windowId).subscribe(flag => {
            this.notePriorityFlag = flag;
        });
    };

    isFormValidateStatus = () => {
        this.professionalServicesClaimsForm.valueChanges.subscribe((data) => {
            this.popupClose = true;
        });
    };

    openScreen = () => {
        if (this.popupClose === true) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    try {
                        if (!message) {
                            return;
                        }
                        let popUpMessage = new PopUpMessage(
                            "popUpMessageName",
                            'Professional Claim Service',
                            message[0].messageText,
                            "icon"
                        );
                        popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
                        popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
                        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
                        let ref = this.modalService.open(PopUpMessageComponent);
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance.popupMessage = popUpMessage;
                        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                            if (resp.name === "Yes") {
                                this.saveProfClaimHeader();
                                setTimeout(() => {
                                    this.openNewScreen()
                                })
                            } else if (resp.name === "No") {
                                this.openNewScreen()
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                });
        } else {
            this.openNewScreen()
        }
    };

    openNewScreen() {
        this.professionalServicesClaimsForm.reset();
        this.hiddenAllFields = true;
        this.professionalServicesClaimsForm.get('claimNumber').enable();
    }

    private openLookupFieldSearchModel(col: string, defaultLoad= true, admProvSearchModel: SearchModel = this.admProvSearchModel) {
        let ref = this.modalService.open(VendorFirstProviderComponent);
        ref.componentInstance.searchModel = admProvSearchModel;
        ref.componentInstance.defaultLoad = defaultLoad;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                if (col === 'admProv') {
                    this.professionalServicesClaimsForm.patchValue({
                        admProv: res.PROVIDER_ID,
                        seqAdmProvId: res.PROVIDER_ID,
                        admProvShortName: res.SHORT_NAME,
                        admProvType: res.PROVIDER_TYPE,
                        admProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        admProvIpaId: res.IPA_ID
                    });
                } else if (col === 'attProv') {
                    this.professionalServicesClaimsForm.patchValue({
                        attProv: res.PROVIDER_ID,
                        seqAttProvId: res.PROVIDER_ID,
                        attProvShortName: res.SHORT_NAME,
                        attProvType: res.PROVIDER_TYPE,
                        attProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        attProvIpaId: res.IPA_ID
                    });
                } else if (col === 'institution') {
                    this.professionalServicesClaimsForm.patchValue({
                        seqProvId: res.SEQ_PROV_ID,
                        provider: res.PROVIDER_ID,
                        providerId: res.PROVIDER_ID,
                        provShortName: res.SHORT_NAME,
                        providerIpaId: res.IPA_ID
                    });
                    this.providerType = res.PROVIDER_TYPE;
                    this.providerSpec = res.SPECIALTY_TYPE;
                    this.getAddresses(res.PROVIDER_ID);
                    var SvcDate : string = Form.getDatePickerValue( this.professionalServicesClaimsForm, "admDate" );
                    this.setParDropdownValue(this.professionalServicesClaimsForm.value.seqMembId,
                        this.professionalServicesClaimsForm.value.seqGroupId,SvcDate,
                        this.professionalServicesClaimsForm.value.incrdCntry,
                        this.professionalServicesClaimsForm.controls["seqProvId"].value,
                        this.professionalServicesClaimsForm.controls["claimNumber"].value);
                }
            }
        });
    }

    private getAddresses(value) {
        this.findByProviderId(value.toUpperCase(), "provider");
    }
}
