/* Copyright (c) 2020 . All Rights Reserved. */
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {GridOptions} from "ag-grid-community";
import {NumberValidators} from "../../../shared/validators/number.validator";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {DatePipe, Location} from "@angular/common";
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {Form} from "../../../shared/helpers/form.helper";
import {
    AllowIn,
    KeyboardShortcutsComponent,
    ShortcutEventOutput,
    ShortcutInput,
} from "ng-keyboard-shortcuts";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    DddwDtl,
    GeneralLedgerReference,
    MessageMasterDtl,
    SecUser,
    VendorAddress,
    VendorCredit,
    VendorCreditCustom,
} from "../../../api-models/index";
import {VendorCreditService} from "../../../api-services/vendor-credit.service";
import {
    AlertMessage,
    AlertMessageService,
} from "../../../shared/components/alert-message/index";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecUserService} from "../../../api-services/security/sec-user.service";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {
    AccountsPayableService,
    CompanyMasterService,
    DddwDtlService,
    GeneralLedgerReferenceService,
    MessageMasterDtlService,
    VendorAddressService,
} from "../../../api-services";
import {ReasonCodeMasterService} from "../../../api-services/reason-code-master.service";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {
    CONSTANTS,
    getVendoCreditShortcutKeys,
    onVendorModuleTopicMenuClick,
    SharedService,
} from "../../../shared/services/shared.service";
import {Menu, SearchModel} from "../../../shared/models/models";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {VendorMasterLookup} from "../../../shared/lookup/vendor-master-lookup";
import {VendorMaster} from "../../../api-models/vendor-master";
import {MemberMasterReasconLookup} from "../../../shared/lookup/member-master-reason-lookup";
import {VendorAccountNoLookup} from "../../../shared/lookup/vendor-account-no-lookup";
import {VendorCheckNoLookup} from "../../../shared/lookup/vendor-check-no";
import {AdvancePaymentOffsetPriorityComponent} from "../advance-payment-offset-priority/advance-payment-offset-priority.component";
import {VendorAdvancePaymentRulesComponent} from "../vendor-advance-payment-rules/vendor-advance-payment-rules.component";
import {VendorAddressComponent} from "../vendor-address/vendor-address.component";
import {VendorMasterComponent} from "../vendor-master/vendor-master.component";
import {ViewCreditBalanceComponent} from "../view-credit-balance/view-credit-Balance.component";
import {VEND_MODULE_ID} from "../../../shared/app-constants";
import {VendorCreditStatusComponent} from "../vendor-credit-status/vendor-credit-status.component";
import {ApplyVendorCreditComponent} from "../apply-vendor-credit/apply-vendor-credit.component";

// Use the Component directive to define the VendorCreditComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "vendorcredit",
    templateUrl: "./vendor-credit.component.html",
    providers: [
        VendorCreditService,
        GeneralLedgerReferenceService,
        CompanyMasterService,
        ReasonCodeMasterService,
        SecColDetailService,
        SecUserService,
        VendorAddressService,
        DddwDtlService,
        MessageMasterDtlService,
        FunctionalLevelSecurityService,
        DatePipe,
    ],
})
export class VendorCreditComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorCreditForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    applyOffsetTo: DddwDtl[];
    offsetBy: DddwDtl[];
    private windowId: string = "VENCR";
    secColDetails = new Array<SecColDetail>();
    userId: any;
    Address: any;
    inProgress = true;
    userTemplateId: string;
    AddressId: any;
    seqVendId: any;
    glRefcode: any;
    selected_for_pay: any;
    balance_amount: any;
    AdvPayType: any;
    seqVendAddress: any;
    checkEftNumber: any;
    accountNumber: any;
    CreditType: any;
    applyCredit = "N"; //default N
    public shortcuts: ShortcutInput[] = [];
    @ViewChild("buttonDropDown") buttonDropDown: ElementRef;
    @Input() vendorID?: string;
    vendorModuleId = VEND_MODULE_ID;

    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    searchStatus: boolean;
    keyValues: string;
    vendorAddress2: any;
    vendorAddress1: any;
    public menu: Menu[] = [];
    winID: any;
    keyNames: any;
    seqVendCredit: any;
    SeqVendAdvPayAccount: any;
    SeqVendAdvPayAccountDTL: number;
    offsetAmount: boolean;
    offsetToAccNumber: boolean;
    checkNumberError: boolean;
    accountNumberError: boolean;
    errorVendorID: boolean;
    isCreditReason: any;
    isSuperUser = false;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    @Input() showIcon: boolean = false;
    @Input() vid?: string;
    vendorAddressStatus: Boolean = false;

    vendorIdSearchModel = new SearchModel(
        "vendormasters/lookup",
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );

    reasonModel = new SearchModel(
        "membermasters/reason/lookup",
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        [{REASON_CODE_TYPE: "CR"}]
    );

    accountNoModel = new SearchModel(
        "vendormasters/accountno/lookup",
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_ALL,
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_DEFAULT,
        []
    );

    advPayAccNoModel = new SearchModel(
        "vendormasters/accountno/lookup",
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_ALL,
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_DEFAULT,
        []
    );

    checkNoModel = new SearchModel(
        "vendormasters/checkno/lookup",
        VendorCheckNoLookup.VENDOR_CHECK_NO_ALL,
        VendorCheckNoLookup.VENDOR_CHECK_NO_DEFAULT,
        []
    );
    vendorId: any;
    vendorStatus: boolean;

    showPopUp(message: string, title: string) {
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
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    editVendorCredit: boolean;
    vendorCredit: VendorCredit;
    vendorCredits: VendorCredit[];
    vendorCreditsCustom: VendorCreditCustom[];
    vendorCreditsCustomSelected: VendorCreditCustom;

    createVendorCredit() {
        this.formValidation.validateForm();
        if (this.vendorCreditForm.valid) {
            let vendorCredit = new VendorCredit();
            vendorCredit.creditType = "A";
            vendorCredit.seqVendCredit = 9999;
            vendorCredit.seqVendAdvPayAcc = this.SeqVendAdvPayAccount;
            vendorCredit.seqVendAdvPayAccDtl = this.SeqVendAdvPayAccountDTL;
            vendorCredit.seqVendId = this.seqVendId;
            vendorCredit.seqVendAddress = this.seqVendAddress;
            vendorCredit.creditReason = Form.getValue(
                this.vendorCreditForm,
                "creditReason"
            );
            vendorCredit.creditStatus = Form.getValue(
                this.vendorCreditForm,
                "apprStatus"
            );
            vendorCredit.payAccountseqAaccountNumber = Form.getValue(
                this.vendorCreditForm,
                "advPayAccNo"
            );
            vendorCredit.checkEftNumber = Form.getValue(
                this.vendorCreditForm,
                "checkNumber"
            );
            vendorCredit.offsetFromAmt = Form.getValue(
                this.vendorCreditForm,
                "offsetAmt"
            ).replace("$", "");
            vendorCredit.checkEftCompanyCode = Form.getValue(
                this.vendorCreditForm,
                "companyCode001"
            );
            vendorCredit.checkEftGlRefCode = Form.getValue(
                this.vendorCreditForm,
                "glRefCode"
            );
            vendorCredit.applyOffsetTo = Form.getValue(
                this.vendorCreditForm,
                "applyTo"
            );
            vendorCredit.vendorId = Form.getValue(
                this.vendorCreditForm,
                "vendorId002"
            );
            vendorCredit.addressLine1 = Form.getValue(
                this.vendorCreditForm,
                "vendorAddress002"
            );
            vendorCredit.payAccountSeqBaccountNumber = Form.getValue(
                this.vendorCreditForm,
                "accountNo"
            );
            vendorCredit.payAccountSeqBcompanyCode = Form.getValue(
                this.vendorCreditForm,
                "companyCode002"
            );
            vendorCredit.payAccountSeqBglRefCode = Form.getValue(
                this.vendorCreditForm,
                "giRefCode"
            );

            (vendorCredit.applyCredit = this.applyCredit),
                (vendorCredit.userDefined1 = Form.getValue(
                    this.vendorCreditForm,
                    "userDefine1"
                ));
            vendorCredit.userDate1 = Form.getDatePickerValue(
                this.vendorCreditForm,
                "userDate1"
            );
            vendorCredit.userDefined2 = Form.getValue(
                this.vendorCreditForm,
                "userDefine2"
            );
            vendorCredit.userDate2 = Form.getDatePickerValue(
                this.vendorCreditForm,
                "userDate2"
            );
            this.vendorCreditService.createVendorCredit(vendorCredit).subscribe(
                (response) => {
                    this.toastService.showToast(
                        "Record successfully created.",
                        NgbToastType.Success
                    );
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                    this.popupClose = false;
                    this.editVendorCredit = false;
                }
            );
        } else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. " +
                "Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    updateVendorCredit(vendorCreditData: VendorCredit) {
        this.formValidation.validateForm();
        if (this.vendorCreditForm.valid) {
            let vendorCredit = new VendorCredit();
            vendorCredit = this.vendorCreditStatus;
            vendorCredit.seqVendCredit = this.seqVendCredit;
            vendorCredit.creditType = this.CreditType;
            vendorCredit.seqVendAdvPayAcc = this.SeqVendAdvPayAccount;
            vendorCredit.seqVendAdvPayAccDtl = this.SeqVendAdvPayAccountDTL;
            vendorCredit.seqVendId = this.seqVendId;
            vendorCredit.seqVendAddress = this.seqVendAddress;
            // alert(vendorCredit.userDefined1);
            vendorCredit.creditReason = Form.getValue(
                this.vendorCreditForm,
                "creditReason"
            );
            vendorCredit.creditStatus = Form.getValue(
                this.vendorCreditForm,
                "apprStatus"
            );
            vendorCredit.payAccountseqAaccountNumber = Form.getValue(
                this.vendorCreditForm,
                "advPayAccNo"
            );
            vendorCredit.checkEftNumber = Form.getValue(
                this.vendorCreditForm,
                "checkNumber"
            );
            vendorCredit.offsetFromAmt = Form.getValue(
                this.vendorCreditForm,
                "offsetAmt"
            ).replace("$", "");
            vendorCredit.applyOffsetTo = Form.getValue(
                this.vendorCreditForm,
                "applyTo"
            );
            vendorCredit.vendorId = Form.getValue(
                this.vendorCreditForm,
                "vendorId002"
            );
            vendorCredit.addressLine1 = Form.getValue(
                this.vendorCreditForm,
                "vendorAddress002"
            );
            vendorCredit.payAccountSeqBaccountNumber = Form.getValue(
                this.vendorCreditForm,
                "accountNo"
            );
            vendorCredit.applyCredit = this.applyCredit;
            vendorCredit.userDefined1 = Form.getValue(
                this.vendorCreditForm,
                "userDefine1"
            );
            vendorCredit.userDate1 = Form.getDatePickerValue(
                this.vendorCreditForm,
                "userDate1"
            );
            vendorCredit.userDefined2 = Form.getValue(
                this.vendorCreditForm,
                "userDefine2"
            );
            vendorCredit.userDate2 = Form.getDatePickerValue(
                this.vendorCreditForm,
                "userDate2"
            );


            this.vendorCreditService
                .updateVendorCredit(vendorCredit, this.seqVendCredit)
                .subscribe(
                    (response) => {
                        this.toastService.showToast(
                            "Record successfully updated.",
                            NgbToastType.Success
                        );
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.popupClose = false;
                    },
                    (error) => {
                        this.toastService.showToast(
                            "An Error occurred while creating new record. Please check your entry.",
                            NgbToastType.Danger
                        );
                    }
                );
        } else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. " +
                "Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
        // } else {
        //   this.showPopUp(
        //     "You are not permitted to update Vendor Credit ",
        //     "Vendor Credit Permissions"
        //   );
        // }
    }

    saveVendorCredit() {
        if (this.SaveNoError()) {
            if (
                this.securityService.checkInsertUpdatePermissions(
                    this.editVendorCredit,
                    this.secWin
                )
            ) {
                if (this.editVendorCredit) {
                    this.updateVendorCredit(this.seqVendCredit);
                } else {
                    this.createVendorCredit();
                }
            }
        }
    }

    deleteVendorCredit(seqVendCredit: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
        } else {
            this.vendorCreditService.deleteVendorCredit(seqVendCredit).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
                }
            );
        }
    }

    getVendorCredit(seqVendCredit: number) {
        this.vendorCreditService.getVendorCredit(seqVendCredit).subscribe(
            (vendorCredit) => {
                this.vendorCredit = vendorCredit;
                this.vendorCreditForm.patchValue({
                    vendorId001: this.vendorCredit.seqVendId,
                    vendorAddress001: this.vendorCredit.seqVendAddress,
                    creditReason: this.vendorCredit.creditReason,
                    apprStatus: this.vendorCredit.creditStatus,
                    advPayAccNo: this.vendorCredit.seqVendAdvPayAcc,
                    checkNumber: this.vendorCredit.checkEftNumber,
                    selectedForPay: this.vendorCredit.offsetFromAmt,
                    offsetAmt: this.vendorCredit.applyOffsetTo,
                    companyCode001: this.vendorCredit.checkEftCompanyCode,
                    glRefCode: this.vendorCredit.checkEftGlRefCode,
                    applyTo: this.vendorCredit.applyCredit,
                    userDefine1: this.vendorCredit.userDefined1,
                    userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
                        this.vendorCredit.userDate1
                    ),
                    userDefine2: this.vendorCredit.userDefined2,
                    userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
                        this.vendorCredit.userDate2
                    ),
                });
            }
        );
    }

    getVendorCredits() {
        this.vendorCreditService.getVendorCredits().subscribe(
            (vendorCredits) => {
                this.vendorCredits = vendorCredits;
            }
        );
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getVendoCreditShortcutKeys(this));
        this.cdr.detectChanges();
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
        };
        this.dataGridGridOptions.editType = "fullRow";
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Seq No",
                field: "seqVendCredit",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Credit Type",
                field: "creditType",
                width: 200,
            },
            {
                headerName: "Account No",
                field: "payAccountseqAaccountNumber",
                width: 200,
            },
            {
                headerName: "Check No",
                field: "checkEftNumber",
                width: 200,
            },
            {
                headerName: "Check/EFT",
                field: "checkEftDate",
                width: 200,
            },
            {
                headerName: "Check/EFT No",
                field: "checkEftAmount",
                width: 200,
            },
            {
                headerName: "Offset Amt",
                field: "",
                width: 200,
                valueGetter: (data) => {
                    return '$' + Number(data.data.offsetFromAmt).toFixed(2);
                }
            },
            {
                headerName: "Apply To",
                field: "applyOffsetTo",
                width: 200,
            },
            {
                headerName: "Offset To Vendor",
                field: "vendorId",
                width: 200,
            },
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    searchModel = new SearchModel(
        "vendormasters/lookup",
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );

    constructor(
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private location: Location,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe,
        private toastr: ToastService,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private vendorCreditService: VendorCreditService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private toastService: ToastService,
        private DDwdtlService: DddwDtlService,
        private CompanyMasterService: CompanyMasterService,
        private vendorAddressService: VendorAddressService,
        private ReasonCodeMasterService: ReasonCodeMasterService,
        private modalService: NgbModal,
        private router: Router,
        private accountsPayableService: AccountsPayableService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private GeneralLedgerReferenceService: GeneralLedgerReferenceService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.getVendorCredits();
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.inProgress = false;
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

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorCreditForm);
        this.createDataGrid();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
            this.vendorCreditForm.controls["checkNumber"].disable();
        }, 500);
        this.getApplyOffsetTo();

        //For Topic Menu To Populate Automatically
        if (this.vendorID) {
            this.vendorCreditForm.patchValue({
                vendorId001: this.vendorID,
            });
            this.vendorId = this.vendorID;
            this.checkVendorWhenTopic(this.vendorID); //Cal function Depends on screen implementation each screen has different approach used
        }
        //For Topic Menu To Populate Automatically Ends
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorCreditForm = this.formBuilder.group(
            {
                vendorId001: ["", {updateOn: "blur", validators: []}],
                vendorAddress001: ["", {updateOn: "blur", validators: []}],
                creditReason: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                apprStatus: ["", {updateOn: "blur", validators: []}],
                advPayAccNo: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                checkNumber: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                balanceAmt: ["", {updateOn: "blur", validators: []}],
                selectedForPay: ["", {updateOn: "blur", validators: []}],
                offsetAmt: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                companyCode001: ["", {updateOn: "blur", validators: []}],
                glRefCode: ["", {updateOn: "blur", validators: []}],
                applyTo: ["", {updateOn: "blur", validators: [Validators.required]}],
                vendorId002: ["", {updateOn: "blur", validators: []}],
                vendorAddress002: ["", {updateOn: "blur", validators: []}],
                accountNo: [
                    "",
                    {updateOn: "blur", validators: [Validators.required]},
                ],
                companyCode002: ["", {updateOn: "blur", validators: []}],
                giRefCode: ["", {updateOn: "blur", validators: []}],
                userDefine1: ["", {updateOn: "blur", validators: []}],
                userDate1: ["", {updateOn: "blur", validators: []}],
                userDefine2: ["", {updateOn: "blur", validators: []}],
                userDate2: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    // hasPermission() {
    //   let userId = null;

    //   const parsedToken = this.securityService.getCurrentUserToken();
    //   if (parsedToken) {
    //     userId = parsedToken.sub;
    //   }
    //   this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
    //     this.getSecColDetails(user);
    //     this.userTemplateId = user.dfltTemplate;
    //     this.getSecWin(user.dfltTemplate);
    //   });
    // }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("VENDOR_CREDIT", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.inProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                } else {
                    this.showPopUp(
                        "You are not Permitted to view MEMBER Master",
                        "Vendor Credit Permission"
                    );
                }
            }
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    //check Vendor
    // onChangeSubscriberId(event: any) {
    //   this.memberAddressForm.patchValue({ subscriberId: event.target.value });
    //   this.loadGrids();
    // }

    onLookupFieldChange(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === "Tab") {
            event.preventDefault();
            let vendorId = event.target.value;
            this.CheckVendor(vendorId);
            this.vendorCreditForm.get('vendorId001').disable();
        }
    }

    openLookupFieldSearchModel() {
        let vendorMaster = new VendorCredit();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.vendorCreditForm.patchValue({
                    vendorId001: res.vendorId,
                });
                this.vendorCreditForm.get('vendorId001').disable();
                this.CheckVendor(res.vendorId);
            }
        });
    }

    CheckVendor(value: any) {
        this.vendorCreditService.checkCreditVendor(value).subscribe(
            (data) => {
                this.vendorCreditsCustomSelected = null;
                this.dataGridGridOptions.api.setRowData([]);
                if (data.length > 0) {
                    this.seqVendId = data[0].seqVendId;
                    this.vendorId = value;
                    this.getVendorAddress(data[0].seqVendId);
                } else {
                    this.messageService
                        .findByMessageId(28013)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "28013: " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
            },
            (error) => {
            }
        );
    }

    checkVendorWhenTopic(id: any) {
        this.vendorCreditService.checkCreditVendor(id).subscribe(
            (data) => {
                if (data != null) {
                    console.log(data);
                    this.seqVendId = data[0].seqVendId;
                    this.vendorId = id;
                    this.getVendorAddress(data[0].seqVendId);
                } else {
                    this.messageService
                        .findByMessageId(28013)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "28013: " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
            },
            (error) => {
            }
        );
    }

    findByVendorId(vendorId) {
        this.vendorCreditService.checkCreditVendor(vendorId).subscribe(
            (data) => {
                if (data != null) {
                    console.log(data);
                    this.seqVendId = data[0].seqVendId;
                    this.getVendorAddress(data[0].seqVendId);
                } else {
                    this.toastService.showToast(
                        "28013 Entered Vendor id does not exists.",
                        NgbToastType.Danger
                    );
                }
            },
            (error) => {
            }
        );
    }

    onAdvPayChange() {
    }

    createNewVendor() {
        this.ResetFieldsforNew();
        this.dataGridGridOptions.api.deselectAll();
        this.editVendorCredit = false;
        setTimeout(() => {
            this.vendorCreditForm.controls["checkNumber"].disable();
        }, 200);
    }

    ResetFieldsforNew() {
        this.vendorCreditForm.get("creditReason").reset();
        this.vendorCreditForm.get("apprStatus").reset();
        this.vendorCreditForm.get("advPayAccNo").reset();
        this.vendorCreditForm.get("checkNumber").reset();
        this.vendorCreditForm.get("balanceAmt").reset();
        this.vendorCreditForm.get("selectedForPay").reset();
        this.vendorCreditForm.get("offsetAmt").reset();
        this.vendorCreditForm.get("companyCode001").reset();
        this.vendorCreditForm.get("glRefCode").reset();
        this.vendorCreditForm.get("applyTo").reset();
        this.vendorCreditForm.get("vendorId002").reset();
        this.vendorCreditForm.get("vendorAddress002").reset();
        this.vendorCreditForm.get("accountNo").reset();
        this.vendorCreditForm.get("companyCode002").reset();
        this.vendorCreditForm.get("giRefCode").reset();
        this.vendorCreditForm.get("userDefine1").reset();
        this.vendorCreditForm.get("userDate1").reset();
        this.vendorCreditForm.get("userDefine2").reset();
        this.vendorCreditForm.get("userDate2").reset();
    }

    getVendorAddress(id: any) {
        this.vendorAddressService.findBySeqVendId(id).subscribe(
            (data) => {
                this.vendorCreditForm.get("vendorAddress001").reset();
                if (data) {
                    this.Address = data;
                } else {
                    this.Address = data;
                    this.messageService
                        .findByMessageId(28045)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "28045: " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
            },
            (error) => {
                this.messageService
                    .findByMessageId(28045)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp("28045: " + message[0].messageText, "Vendor Credit");
                    });
            }
        );
    }

    onAddressChange(data: any) {
        this.seqVendAddress = data;

        this.vendorCreditService
            .getVendorCredits_(this.seqVendId, data)
            .subscribe((data) => {
                console.log(data);
                this.vendorCreditsCustom = data;
                this.vendorCreditsCustomSelected = null;
                if (this.vendorCreditsCustom.length > 0) {
                    for (let i = 0; i < this.vendorCreditsCustom.length; i++) {
                        this.vendorCreditsCustom[i].applyTo = this.vendorCreditsCustom[
                            i
                            ].applyOffsetTo;
                        this.SetApplyOffsetTo(this.vendorCreditsCustom[i].applyOffsetTo, i);
                        this.vendorCreditsCustom[i].userDate1 = this.datePipe.transform(
                            this.vendorCreditsCustom[i].userDate1,
                            "MM/dd/yyyy"
                        );
                        this.vendorCreditsCustom[i].userDate2 = this.datePipe.transform(
                            this.vendorCreditsCustom[i].userDate2,
                            "MM/dd/yyyy"
                        );
                    }
                }
                this.dataGridGridOptions.api.setRowData(this.vendorCreditsCustom);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            });
    }

    getAdvPayType() {
        this.vendorCreditService.getAdvPayType().subscribe((data) => {
            this.AdvPayType = data;
        });
    }

    getApplyOffsetTo() {
        this.DDwdtlService.findByColumnNameAndDwname(
            "apply_offset_to",
            "dw_vencr_picklist"
        ).subscribe((data) => {
            this.applyOffsetTo = data;
        });
    }

    getOffsetBy() {
        this.DDwdtlService.findByColumnNameAndDwname(
            "offset_by",
            "dw_vadpy_hdr_de"
        ).subscribe((data) => {
            this.offsetBy = data;
        });
    }

    getCheckEftMethod() {
        this.DDwdtlService.findByColumnNameAndDwname(
            "check_eft_method",
            "dw_vadpy_dtl_de"
        ).subscribe((data) => {
            this.offsetBy = data;
        });
    }

    //Validations
    ValidateReasonCode(code: any) {
        this.popupClose = true;
        this.ReasonCodeMasterService.getReasonCodeMasterByReasonType(
            "CR"
        ).subscribe((data) => {
            console.log(data);
            if (data.length > 0) {
                data = data.filter((d) => d.reasonCode == code.target.value);
                if (data.length > 0) {
                    console.log(data);
                    this.isCreditReason = false;
                } else {
                    this.isCreditReason = true;
                    this.errorCreditReason(code.target.value);
                }
            }
        });
    }

    errorCreditReason(value: any) {
        this.messageService
            .findByMessageId(27222)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "27222: " + message[0].messageText.replace("@1", value),
                    "Vendor Credit"
                );
            });
    }

    ValidateAccountNumber(event: any, check: any) {
        this.popupClose = true;
        var id: any;
        if (check == 1) {
            id = event.target.value;
        } else {
            id = event;
        }
        this.vendorCreditService
            .validateAccountNumber(this.seqVendId, this.seqVendAddress, id)
            .subscribe(
                (data) => {
                    if (data.length > 0) {
                        this.accountNumber = id;
                        this.vendorCreditForm.controls["checkNumber"].enable();
                        this.vendorCreditForm.get("checkNumber").reset();
                        this.accountNumberError = false;
                    } else {
                        this.accountNumberError = true;
                        this.errorAccountNumber(id);
                    }
                },
                (error) => {
                    this.toastService.showToast(
                        error.message
                            ? error.message
                            : "An Error occurred Validating, Please try again later",
                        NgbToastType.Danger
                    );
                }
            );
    }

    errorAccountNumber(value: any) {
        this.messageService
            .findByMessageId(28034)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "28034: " + message[0].messageText.replace("@1", value),
                    "Vendor Credit"
                );
            });
    }

    ValidateCheckNumber(event: any, check: any) {
        this.popupClose = true;
        var id: any;
        if (check == 1) {
            id = event.target.value;
        } else {
            id = event;
        }
        this.vendorCreditService
            .validateCheckNumber(
                this.seqVendId,
                this.seqVendAddress,
                this.vendorCreditForm.get("advPayAccNo").value,
                id
            )
            .subscribe(
                (data) => {
                    if (data.length > 0) {
                        this.vendorCreditForm.patchValue({
                            balanceAmt: "$" + data[0].balanceAmount,
                            selectedForPay: "$" + data[0].selectedForPay,
                        });
                        this.SeqVendAdvPayAccountDTL = data[0].seqVendAdvPayAccDtl;
                        this.checkNumberError = false;
                    } else {
                        this.vendorCreditForm.get("balanceAmt").reset();
                        this.vendorCreditForm.get("selectedForPay").reset();
                        this.checkNumberError = true;
                        this.errorCheckNumber(id);
                    }
                },
                (error) => {
                    this.toastService.showToast(
                        error.message
                            ? error.message
                            : "An Error occurred Validating, Please try again later",
                        NgbToastType.Danger
                    );
                }
            );
    }

    ValidateOffsetAmount(event: any) {
        this.popupClose = true;
        var balance = Form.getValue(this.vendorCreditForm, "balanceAmt").replace(
            "$",
            ""
        );
        if (parseInt(event.target.value) <= parseInt(balance) || balance != "") {
            this.offsetAmount = false;

        } else {
            this.offsetAmount = true;
            this.errorOffsetAmount();
        }
    }

    errorOffsetAmount() {
        this.messageService
            .findByMessageId(28039)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp("28039: " + message[0].messageText, "Vendor Credit");
            });
    }

    errorOffsetToNumber(value: any) {
        this.offsetToAccNumber = true;
        this.messageService
            .findByMessageId(28034)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "28034: " + message[0].messageText.replace("@1", value),
                    "Vendor Credit"
                );
            });
    }

    errorCheckNumber(value: any) {
        this.messageService
            .findByMessageId(28036)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "28036: " + message[0].messageText.replace("@1", value),
                    "Vendor Credit"
                );
            });
    }

    validateOffsetToNumber(event: any) {
        this.vendorCreditService
            .validateOffsetToNumber(
                this.seqVendId,
                this.seqVendAddress,
                event.target.value
            )
            .subscribe(
                (data) => {
                    if (data.length > 0) {
                        this.vendorCreditForm.patchValue({
                            companyCode002: data[0].checkEftCompanyCode,
                            giRefCode: data[0].checkEftGlRefCode,
                        });
                        this.SeqVendAdvPayAccount = data[0].seqVendAdvPayAcc;
                        this.offsetToAccNumber = false;
                    } else {
                        this.vendorCreditForm.get("companyCode002").reset();
                        this.vendorCreditForm.get("giRefCode").reset();
                        this.offsetToAccNumber = true;
                        this.errorOffsetToNumber(event.target.value);
                    }
                },
                (error) => {
                    this.toastService.showToast(
                        error.message
                            ? error.message
                            : "An Error occurred Validating, Please try again later",
                        NgbToastType.Danger
                    );
                }
            );
    }

    ValidateCheckEftCompanyCode(event: any) {
        this.CompanyMasterService.getCompanyMaster(event.target.value).subscribe(
            (data) => {
                if (data != null) {
                } else {
                }
            }
        );
    }

    ValidateElfGefRefCode(event: any) {
        this.GeneralLedgerReferenceService.getGeneralLedgerReference(
            event.target.value
        ).subscribe((data) => {
            if (data) {
                data = data.filter((d) => d.glRefCode == this.glRefcode);
            }
        });
    }

    ValidateOffsetaccountNumber() {
    }

    // getVendorAddress(id){
    //   this.vendorCreditService.checkCreditVendorAddress(id).subscribe(
    //     (data) => {
    //       if (data != null) {
    //          console.log(data);
    //          var data1 = data[0].seqVendAdvPayPriority;
    //          data1= data1.replace("[", " ");
    //          data1 = data1.replace("]", " ");
    //          if (data1 == null || data1 == "  ") {
    //          this.AddressId=data;
    //          }
    //       } else {
    //         this.toastService.showToast(
    //           "28045 ",
    //           NgbToastType.Danger
    //         );
    //       }
    //     },
    //     (error) => {}
    //   );
    // }

    //
    onChangeGrid() {
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0]) {
            this.vendorCreditsCustomSelected = selectedRows[0];
            //getting index of row
            this.searchStatus = true;
            this.keyValues = "";
            this.editVendorCredit = true;
            this.SeqVendAdvPayAccount = selectedRows[0].seqVendAdvPayAcc;
            this.SeqVendAdvPayAccountDTL = selectedRows[0].seqVendAdvPayAccDtl;
            this.CreditType = selectedRows[0].creditType;
            this.seqVendCredit = selectedRows[0].seqVendCredit;
            this.populateForm(selectedRows[0]);
        } else {
            this.keyValues = "";
            this.searchStatus = false;
        }
    }

    populateForm(data: any) {
        this.enableOrDisable(data);
        this.vendorCreditForm.patchValue({
            //vendorId001: this.vendorCredit.seqVendId,
            //vendorAddress001: this.vendorCredit.seqVendAddress,
            creditReason: data.creditReason,
            apprStatus: data.creditStatus,
            advPayAccNo: data.payAccountseqAaccountNumber,
            checkNumber: data.checkEftNumber,
            balanceAmt: "$" + Number(data.balanceAmount).toFixed(2),
            selectedForPay: "$" + Number(data.selectedForPay).toFixed(2),
            offsetAmt: '$' + Number(data.offsetFromAmt).toFixed(2),
            companyCode001: data.payAccountseqAcompanyCode,
            glRefCode: data.payAccountseqAglRefCode,
            applyTo: data.applyTo,
            vendorId002: data.vendorId,
            vendorAddress002: this.vendorAddress1,
            accountNo: data.payAccountSeqBaccountNumber,
            companyCode002: data.payAccountSeqBcompanyCode,
            giRefCode: data.payAccountSeqBglRefCode,
            userDefine1: data.userDefined1,
            userDate1: this.dateFormatPipe.defaultDisplayDateFormat(data.userDate1),
            userDefine2: data.userDefined2,
            userDate2: this.dateFormatPipe.defaultDisplayDateFormat(data.userDate2),
        });
        this.SetVendorAddress2(data.addressLine1, 1);
    }

    onchangeApplyTo(event: any) {
        this.popupClose = true;
        this.enableOrDisable(event.target.value);
    }

    enableOrDisable(data: any) {
        if (data == 2) {
            this.vendorCreditForm.controls["vendorId002"].enable();
            this.vendorCreditForm.controls["vendorAddress002"].enable();
            this.vendorCreditForm.controls["accountNo"].enable();
            this.vendorCreditForm.controls["companyCode002"].enable();
            this.vendorCreditForm.controls["giRefCode"].enable();
            this.buttonDropDown.nativeElement.disabled = false;
        } else {
            this.vendorCreditForm.controls["vendorId002"].disable();
            this.vendorCreditForm.controls["vendorAddress002"].disable();

            this.vendorCreditForm.controls["companyCode002"].disable();
            this.vendorCreditForm.controls["giRefCode"].disable();
            //Clearing
            this.vendorCreditForm.get("vendorId002").reset();
            this.vendorCreditForm.get("vendorAddress002").reset();
            this.vendorCreditForm.get("accountNo").reset();
            this.vendorCreditForm.controls["companyCode002"].reset();
            this.vendorCreditForm.controls["giRefCode"].reset();
        }
    }

    changeOfVendorId(event: any) {
        if (
            event.target.value == Form.getValue(this.vendorCreditForm, "vendorId001")
        ) {
            this.errorVendorID = false;
        } else {
            this.errorVendorId();
        }
    }

    errorVendorId() {
        this.errorVendorID = true;
        this.messageService
            .findByMessageId(28049)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp("28049: " + message[0].messageText, "Vendor Credit");
            });
    }

    //Setting Up row data
    SetApplyOffsetTo(data: any, k: any) {
        if (this.applyOffsetTo.length > 0) {
            for (let i = 0; i < this.applyOffsetTo.length; i++) {
                if (data === this.applyOffsetTo[i].dddwDtlPrimaryKey.dataVal) {
                    this.vendorCreditsCustom[k].applyOffsetTo = this.applyOffsetTo[
                        i
                        ].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    SetVendorAddress2(data: any, k: any) {
        if (this.Address.length > 0) {
            for (let i = 0; i < this.Address.length; i++) {
                if (parseInt(data) === this.Address[i].seqVendAddress) {
                    this.vendorAddress2 =
                        (this.Address[i].name2 ? this.Address[i].name2 + ', ':'') +
                        (this.Address[i].addressLine1 ? this.Address[i].addressLine1 + ', ':'') +
                        (this.Address[i].city?this.Address[i].city + ', ':'') +
                        (this.Address[i].state?this.Address[i].state + ', ' : '') +
                        (this.Address[i].zipCode?this.Address[i].zipCode + ', ' : '');
                }
            }
        }
    }

    SetVendorAddress1(data: any, k: any) {
        if (this.Address.length > 0) {
            for (let i = 0; i < this.Address.length; i++) {
                if (parseInt(data) === this.Address[i].seqVendAddress) {
                    this.vendorAddress1 =
                        (this.Address[i].name2 ? this.Address[i].name2 + ', ':'') +
                        (this.Address[i].addressLine1 ? this.Address[i].addressLine1 + ', ':'') +
                        (this.Address[i].city?this.Address[i].city + ', ':'') +
                        (this.Address[i].state?this.Address[i].state + ', ' : '') +
                        (this.Address[i].zipCode?this.Address[i].zipCode + ', ' : '');
                }
            }
        }
    }

    //DropDowns Set
    setVendorAddress2_DROPD(value: any) {
        this.SetVendorAddress2(value, 1);
        this.vendorCreditForm.patchValue({
            vendorAddress002: value,
        });
    }

    setVendorAddress1_DROPD(value: any) {
        this.vendorAddressStatus = true;
        this.SetVendorAddress1(value, 1);
        this.vendorCreditForm.patchValue({
            vendorAddress001: value,
        });
        this.vendorCreditForm.get('vendorAddress001').disable();
        this.onAddressChange(value);
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Save"},
                    {name: "Close"},
                    {name: "-"},
                    {name: "Main Menu..."},
                    {name: "Shortcut Menu..."},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit"},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", disabled: true},
                    {name: "Copy", disabled: true},
                    {name: "Paste", disabled: true},
                    {isHorizontal: true},
                    {name: "Lookup"},
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    {name: "Master File"},
                    {name: "Addresses"},
                    {name: "Adv. Pay Priority"},
                    {name: "Adv. Pay Account"},
                    {name: "Vendor Credit"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Vendor Lookup"},
                    {name: "Provider Relationships"},
                    {name: "Adv Pay Rules"},
                    {name: "Acc Pay Vendor Display "},
                    {name: "Vendor Credit Status"},
                    {name: "Apply Vendor Credit"},
                    {name: "View Credit Balance"},
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile"},
                    {name: "Layer"},
                    {name: "Cascade"},
                    {name: "Arrange Icons"},
                    {isHorizontal: true},
                    {name: "Show Timestamp"},
                    {name: "Audit Display"},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Vendor Master"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window"},
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

    public onMenuItemClick(event: any) {

        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewVendor();
                    break;
                }
                case "Open": {
                    this.vendorCreditForm.reset();
                    break;
                }
                case "Save": {
                    this.saveVendorCredit();
                    break;
                }
                case "Close": {
                    this.vendorCreditForm.reset();
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
            this.sharedService.onVendorModuleTopicMenuClick(
                event.action,
                "Vendor Credit",
                this.activeModal,
                this.vendorId
            );
            //this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(
                            CONSTANTS.F_AUDIT,
                            this.winID
                        );
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: "lg",
                            });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService
                                .findByMessageId(11073)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    this.showPopUp(
                                        "11073: " + message[0].messageText,
                                        "Vendor Credit"
                                    );
                                });
                        }
                    } else {
                        this.messageService
                            .findByMessageId(30164)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp(
                                    "30164: " + message[0].messageText,
                                    "Vendor Credit"
                                );
                            });
                    }

                    break;
                }
            }
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case "Vendor Lookup": {
                this.openLookupFieldSearchModel();
                break;
            }
            case "View Credit Balance": {
                this.CheckCreditBalanceAndOpenScreen();
                break;
            }
            case "Apply Vendor Credit": {
                if (this.vendorId) {
                    this.OpenApplyCredit();
                } else {
                    this.messageService
                        .findByMessageId(28035)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "28035: " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
                break;
            }
            case "Vendor Credit Status": {
                if (this.vendorId) {
                    this.OpenVendorCreditStatus();
                }
                else {
                    this.messageService
                        .findByMessageId(28035)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "28035: " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
                break;
            }

            case "Provider Relationships": {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
                    CONSTANTS.F_PROV_RELATION
                );
                if (status) {
                    if (this.searchStatus) {
                        this.toastService.showToast(
                            "This option is not implemented yet",
                            NgbToastType.Danger
                        );
                    } else {
                        this.messageService
                            .findByMessageId(28003)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    "28003: " + message[0].messageText
                                );
                            });
                    }
                } else {
                    this.messageService
                        .findByMessageId(11073)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error(
                                "11073: " + message[0].messageText
                            );
                        });
                }
                break;
            }
            case "Adv Pay Rules": {
                let ref = this.modalService.open(VendorAdvancePaymentRulesComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.onRowSelected.subscribe((response: any) => {
                });
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

    SaveNoError() {
        if (this.offsetToAccNumber) {
            this.errorOffsetToNumber(
                Form.getValue(this.vendorCreditForm, "accountNo")
            );
            return false;
        }
        if (this.offsetAmount) {
            this.errorOffsetAmount();
            return false;
        }
        if (this.checkNumberError) {
            this.errorCheckNumber(
                Form.getValue(this.vendorCreditForm, "checkNumber")
            );
            return false;
        }
        if (this.accountNumberError) {
            this.errorCheckNumber(
                Form.getValue(this.vendorCreditForm, "advPayAccNo")
            );
            return false;
        }
        if (this.errorVendorID) {
            this.errorVendorId();
            return false;
        }
        if (this.isCreditReason) {
            this.errorCreditReason(
                Form.getValue(this.vendorCreditForm, "creditReason")
            );
            return false;
        }
        return true;
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case "Lookup": {
                // this.openLookupFieldSearchModel();
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

    onCreditReasonKeyDown(event) {
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            this.reasonModel.isMatchAllContracts = false;
            ref.componentInstance.searchModel = this.reasonModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res && res.REASON_CODE) {
                    this.vendorCreditForm.get("creditReason").setValue(res.REASON_CODE);
                }
            });
        }
    }

    vendorCreditStatus: VendorCredit = new VendorCredit();

    OpenVendorCreditStatus() {
        let ref = this.modalService.open(VendorCreditStatusComponent, {
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.vendorCreditCustom = this.vendorCreditsCustomSelected;
        ref.componentInstance.selectedAddress = this.vendorCreditForm.get(
            "vendorAddress001"
        ).value;
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe(
                (vendorCredit: VendorCredit) => {
                    this.vendorCreditStatus = vendorCredit;
                    // this.groupUserFields = groupMaster;
                    //   if (this.router.isActive('/diamond/member/group-master', false) == false) {
                    // this.saveVendorCredit();
                    //  }
                }
            );
        }
    }

    OpenApplyCredit() {
        console.log(this.vendorCreditsCustomSelected["applyCredit"] == "Y");
        if (this.vendorCreditsCustomSelected['applyCredit'] == "Y") {
            let ref = this.modalService.open(ApplyVendorCreditComponent, {
                size: <any>"xl",
            });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.vendorCreditCustom = this.vendorCreditsCustomSelected;
            ref.componentInstance.selectedAddress = this.vendorCreditForm.get(
                "vendorAddress001"
            ).value;
            if (ref.componentInstance.submitForm) {
                ref.componentInstance.submitForm.subscribe(
                    (vendorCredit: VendorCredit) => {
                        this.vendorCreditStatus = vendorCredit;
                        // this.groupUserFields = groupMaster;
                        //   if (this.router.isActive('/diamond/member/group-master', false) == false) {
                        // this.saveVendorCredit();
                        //  }
                    }
                );
            }
        } else {

            this.messageService
                .findByMessageId(28040)
                .subscribe((message: MessageMasterDtl[]) => {

                    this.showPopUp(
                        "28040 : " + message[0].messageText,
                        "Vendor"
                    );
                });
        }
    }

    onAdvPayAccNoKeyDown(event) {
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            this.advPayAccNoModel.searchOption = [
                {SEQ_VEND_ID: this.seqVendId, SEQ_VEND_ADDRESS: this.seqVendAddress},
            ];
            ref.componentInstance.searchModel = this.advPayAccNoModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.vendorCreditForm.get("advPayAccNo").setValue(res.ACCOUNT_NUMBER);
                    this.ValidateAccountNumber(res.ACCOUNT_NUMBER, 2);
                }
            });
        }
    }

    onCheckNumberKeyDown(event) {
        if (event.key === "F5") {
            event.preventDefault();
            let accountNo = this.vendorCreditForm.get("advPayAccNo").value;
            if (accountNo) {
                let ref = this.modalService.open(SearchboxComponent);
                this.checkNoModel.searchOption = [
                    {
                        SEQ_VEND_ID: this.seqVendId,
                        SEQ_VEND_ADDRESS: this.seqVendAddress,
                        ACCOUNT_NUMBER: accountNo,
                    },
                ];
                ref.componentInstance.searchModel = this.checkNoModel;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.defaultLoad = true;
                ref.componentInstance.onRowSelected.subscribe((res: any) => {
                    if (res != null) {
                        this.vendorCreditForm
                            .get("checkNumber")
                            .setValue(res.CHECK_EFT_NUMBER);
                        this.ValidateCheckNumber(res.CHECK_EFT_NUMBER, 2);
                    }
                });
            }
        }
    }

    onVendorIdKeyDown(event) {
        this.popupClose = true;
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            this.vendorIdSearchModel.searchOption = [{SEQ_VEND_ID: this.seqVendId}];
            ref.componentInstance.searchModel = this.vendorIdSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
                }
            });
        }
    }

    onAccountNoKeyDown(event) {
        this.popupClose = true;
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            this.accountNoModel.searchOption = [
                {SEQ_VEND_ID: this.seqVendId, SEQ_VEND_ADDRESS: this.seqVendAddress},
            ];
            ref.componentInstance.searchModel = this.accountNoModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.vendorCreditForm.get("accountNo").setValue(res.ACCOUNT_NUMBER);
                }
            });
        }
    }

    CheckCreditBalanceAndOpenScreen() {
        if (!this.seqVendId) {
            this.messageService
                .findByMessageId(29029)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "29029 : " + message[0].messageText.replace("@1", "Vendor Id"),
                        "Vendor"
                    );
                });
            return;
        }
        this.accountsPayableService
            .getCreditBalance(this.seqVendId)
            .subscribe((data) => {
                if (data.length > 0) {
                    let ref = this.modalService.open(ViewCreditBalanceComponent);
                    ref.componentInstance.searchModel = this.accountNoModel;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.seq_vend_id = this.seqVendId;
                } else {
                    this.messageService
                        .findByMessageId(30033)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                "30033 : " + message[0].messageText,
                                "Vendor Credit"
                            );
                        });
                }
            });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.popupAlert();
        } else {
            this.activeModal.close();
        }
    };

    inputEvent = () => {
        this.popupClose = true;
    };

    popupAlert = () => {
        let popUpMessage = new PopUpMessage(
            'Vendor Master',
            'Vendor Master',
            '6128: Data has been modified, press yes to save changes',
            'info',
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                this.saveVendorCredit();
            } else if (resp.name === 'No') {

                this.activeModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    };
}
