/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from "ag-grid-community";
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {MessageMasterDtl, SecUser, SecWin} from "../../../api-models";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {
    AccountsPayableService,
    DddwDtlService,
    DddwHdrService,
    MessageMasterDtlService,
    SecUserService
} from "../../../api-services";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {ToastService} from "../../../shared/services/toast.service";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {NgbToastType} from "ngb-toast";
import {CONSTANTS, getAccountsPayableVendorDisplayShortcutKeys} from "../../../shared/services/shared.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {Menu, SearchModel} from "../../../shared/models/models";
import {AccountsPayableLookup} from "../../../shared/lookup/accounts-payable-lookup";
import {SelectCustomerComponent} from "../../premium/select-customer/select-customer.component";
import {AccountsPayableVendorDisplayFilterComponent} from "../accounts-payable-vendor-display-filter/accounts-payable-vendor-display-filter.component";
import {AccountsPayableVendorLookupLookup} from "../../../shared/lookup/accounts-payable-vendor-lookup";
import {ApHelpComponent} from "../../ap/ap-help/ap-help.component";

// Use the Component directive to define the AccountsPayableVendorDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountspayablevendordisplay',
    templateUrl: './accounts-payable-vendor-display.component.html',

})
export class AccountsPayableVendorDisplayComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountsPayableVendorDisplayClaimForm: FormGroup;
    accountsPayableVendorDisplayForm: FormGroup;
    accountsPayableVendorDisplayVendorInfoForm: FormGroup;
    accountsPayableApTransDetailForm: FormGroup;

    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'APVDS';
    public isSuperUser = false;
    public secProgress = true;
    menu: Menu[] = [];

    public fileTypes: any[];
    public apTypes: any[];
    public apStatus: any[];
    public selectForPayment: any[];
    public priceOnlyFlag: any[];
    screenID: string;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public claimType: string;

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
    public shortcuts: ShortcutInput[] = [];


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
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private router: Router,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private accountsPayableService: AccountsPayableService,
        private dddwDtlService: DddwDtlService,
        private dddwHdrService: DddwHdrService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
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

    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    userTemplateId: string;


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
                this.disableMenu();
            } else {
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('DENTAL_CLAIM_HEADER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }


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
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableVendorDisplayClaimForm);
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Save"},
                    {name: "Close"},
                    {name: "-"},
                    {name: "Main Menu"},
                    {name: "Shortcut Menu"},
                    {isHorizontal: true},
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
                    {name: "Next"},
                    {name: "Previous"},
                    {isHorizontal: true},
                    {name: "Lookup"},
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    {name: "AP Transaction Information"},
                    {name: "Claim Detail Information"},
                    {name: "Vendor Information"}
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Patient Liabilities", disabled: true},
                    {name: "View Claim/Interest/Penalty/Discount Information", disabled: true},
                    {name: "Claim Audit Detail", disabled: true},
                    {name: "View Administrative Fees Info", disabled: true},
                    {name: "View AP Additional Info", disabled: true},
                    {name: "View Additional G/L Accounts", disabled: true},
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
                    {name: "2 Member Medicare + Choice History"},
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

    searchStatus: boolean = false;
    keyNames: string = "subscriber_id";
    keyValues: any;

    @Input() winID?: string;
    @Input() showIcon: boolean = false;


    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Topic") {
            // handle File actions
            switch (event.action) {
                case "AP Transaction Information": {
                    this.screenID = 'apTransDetail';
                    break;
                }
                case "Claim Detail Information": {
                    this.screenID = 'claimDetail';
                    break;
                }
                case "Vendor Information": {
                    this.screenID = 'vendorInfo';
                    break;
                }

                default: {
                    this.toastService.showToast(
                        "Action is in progress",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Special") {
            // handle File actions
            switch (event.action) {
                case "Transaction ID Lookup": {
                    // this.openLookupPage();
                    break;
                }
                // case "Additional Provider Codes": {
                //     break;
                // }
                // case "Additional Procedure Codes": {
                //     break;
                // }
                // case "Additional Benefit Package Codes": {
                //     break;
                // }
                // case "Additional Medical Definitions": {
                //     break;
                // }
                default: {
                    this.toastService.showToast(
                        "Action is in progress",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
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
            }
        } else if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }

        else {
            // handle Edit-Menu Actions
            this.toastService.showToast("Action is in progress", NgbToastType.Danger);
        }
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.

        this.accountsPayableVendorDisplayForm = this.formBuilder.group({
            vendorId: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});


        this.accountsPayableApTransDetailForm = this.formBuilder.group({
            transactionId: ['', {updateOn: 'blur', validators: []}],
            fileType: ['', {updateOn: 'blur', validators: []}],
            apType: ['', {updateOn: 'blur', validators: []}],
            apStatus: ['', {updateOn: 'blur', validators: []}],
            selectForPayment: ['', {updateOn: 'blur', validators: []}],
            raPrintFlag: ['', {updateOn: 'blur', validators: []}],
            prePriceOnlyFlagapStatus: ['', {updateOn: 'blur', validators: []}],
            prePriceOnlyFlag: ['', {updateOn: 'blur', validators: []}],
            discountWithhold: ['', {updateOn: 'blur', validators: []}],
            penltyAmt: ['', {updateOn: 'blur', validators: []}],
            netAmt: ['', {updateOn: 'blur', validators: []}],
            interestAmt: ['', {updateOn: 'blur', validators: []}],
            discountAmt: ['', {updateOn: 'blur', validators: []}],
            paidNetAmt_2: ['', {updateOn: 'blur', validators: []}],
            shortName_2: ['', {updateOn: 'blur', validators: []}],
            checkDate: ['', {updateOn: 'blur', validators: []}],
            addressLine_1: ['', {updateOn: 'blur', validators: []}],
            dueDate: ['', {updateOn: 'blur', validators: []}],
            bankAccountCode: ['', {updateOn: 'blur', validators: []}],
            postedDate: ['', {updateOn: 'blur', validators: []}],
            checkNumber: ['', {updateOn: 'blur', validators: []}],
            vendor1099Flag_2: ['', {updateOn: 'blur', validators: []}],
            eftTransNumber: ['', {updateOn: 'blur', validators: []}],
            offset: ['', {updateOn: 'blur', validators: []}],
            companyCode_2: ['', {updateOn: 'blur', validators: []}],
            glMonth: ['', {updateOn: 'blur', validators: []}],
            debitGlNo1: ['', {updateOn: 'blur', validators: []}],
            debitGlNo2: ['', {updateOn: 'blur', validators: []}],
            creditGlNo1: ['', {updateOn: 'blur', validators: []}],
            creditGlNo2: ['', {updateOn: 'blur', validators: []}],
            capFundModelId: ['', {updateOn: 'blur', validators: []}],
            capFundSubModelId: ['', {updateOn: 'blur', validators: []}],
            withholdAmt_2: ['', {updateOn: 'blur', validators: []}],
            additionalInfoExists: ['', {updateOn: 'blur', validators: []}],
        }, {updateOn: 'submit'});

        this.accountsPayableVendorDisplayVendorInfoForm = this.formBuilder.group({
            fullName: ['', {updateOn: 'blur', validators: []}],
            shortName: ['', {updateOn: 'blur', validators: []}],
            addressLine1: ['', {updateOn: 'blur', validators: []}],
            addressLine2: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            county: ['', {updateOn: 'blur', validators: []}],
            zipCode: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: []}],
            vendorType: ['', {updateOn: 'blur', validators: []}],
            irsTaxId: ['', {updateOn: 'blur', validators: []}],
            userDefined: ['', {updateOn: 'blur', validators: []}],
            holdPaymentFlag: ['', {updateOn: 'blur', validators: []}],
            vendor1099Flag: ['', {updateOn: 'blur', validators: []}],
            paymentDelayDays: ['', {updateOn: 'blur', validators: []}],
        }, {updateOn: 'submit'});

        this.accountsPayableVendorDisplayClaimForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: []}],
            received: ['', {updateOn: 'blur', validators: []}],
            entered: ['', {updateOn: 'blur', validators: []}],
            daimondId: ['', {updateOn: 'blur', validators: []}],
            member: ['', {updateOn: 'blur', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            lastName: ['', {updateOn: 'blur', validators: []}],
            first: ['', {updateOn: 'blur', validators: []}],
            mi: ['', {updateOn: 'blur', validators: []}],
            providerId: ['', {updateOn: 'blur', validators: []}],
            provName: ['', {updateOn: 'blur', validators: []}],
            type: ['', {updateOn: 'blur', validators: []}],
            specialty: ['', {updateOn: 'blur', validators: []}],
            pcpId: ['', {updateOn: 'blur', validators: []}],
            primaryDate: ['', {updateOn: 'blur', validators: []}],
            serviceReason: ['', {updateOn: 'blur', validators: []}],
            pcpName: ['', {updateOn: 'blur', validators: []}],
            plcOfSvc: ['', {updateOn: 'blur', validators: []}],
            diagnosisCode1: ['', {updateOn: 'blur', validators: []}],
            authorization: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            diagonsisCode2: ['', {updateOn: 'blur', validators: []}],
            lineItem: ['', {updateOn: 'blur', validators: []}],
            ocAllowed: ['', {updateOn: 'blur', validators: []}],
            quantity: ['', {updateOn: 'blur', validators: []}],
            procedureCode: ['', {updateOn: 'blur', validators: []}],
            ocPaid: ['', {updateOn: 'blur', validators: []}],
            ocPaidReason: ['', {updateOn: 'blur', validators: []}],
            dateOfService: ['', {updateOn: 'blur', validators: []}],
            allowedAmt: ['', {updateOn: 'blur', validators: []}],
            allowedReason: ['', {updateOn: 'blur', validators: []}],
            billedAmount: ['', {updateOn: 'blur', validators: []}],
            totalNotCov: ['', {updateOn: 'blur', validators: []}],
            notCoveredReason: ['', {updateOn: 'blur', validators: []}],
            claimStatus: ['', {updateOn: 'blur', validators: []}],
            totalCopay: ['', {updateOn: 'blur', validators: []}],
            copayReason: ['', {updateOn: 'blur', validators: []}],
            processStatus: ['', {updateOn: 'blur', validators: []}],
            totalCoins: ['', {updateOn: 'blur', validators: []}],
            coinsuranceReason: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            totalDeduct: ['', {updateOn: 'blur', validators: []}],
            deductReason: ['', {updateOn: 'blur', validators: []}],
            glReference: ['', {updateOn: 'blur', validators: []}],
            withholdAmt: ['', {updateOn: 'blur', validators: []}],
            adjustReason: ['', {updateOn: 'blur', validators: []}],
            medDefCode: ['', {updateOn: 'blur', validators: []}],
            cobPatlaib: ['', {updateOn: 'blur', validators: []}],
            messages: ['', {updateOn: 'blur', validators: []}],
            postDate: ['', {updateOn: 'blur', validators: []}],
            netAmount: ['', {updateOn: 'blur', validators: []}],
            holds: ['', {updateOn: 'blur', validators: []}],
            paidNetAmt: ['', {updateOn: 'blur', validators: []}],
            adjustMethod: ['', {updateOn: 'blur', validators: []}],
            adminFee: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onLookupFieldChange(event) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openFilterPage();
        }
    }

    openFilterPage() {
        const ref = this.modalService.open(AccountsPayableVendorDisplayFilterComponent, {
            windowClass: 'input-class',
            backdrop: 'static',
            keyboard: false
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.filterData.subscribe((event: any) => {
            console.log(event);
            this.screenID = event.screenID;
            this.claimType = event.claimType;
            this.openLookupPage(event.vendorId);
        });
    }

    searchModelProfessional = new SearchModel(
        'accountspayables/vendor/professional/lookup',
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_ALL,
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_DEFAULT,
        []);

    searchModelInstitutional = new SearchModel(
        'accountspayables/vendor/institutional/lookup',
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_ALL,
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_DEFAULT,
        []);

    searchModelDental = new SearchModel(
        'accountspayables/vendor/dental/lookup',
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_ALL,
        AccountsPayableVendorLookupLookup.ACCOUNTS_PAYABLE_VENDOR_DISPLAY_DEFAULT,
        []);

    openLookupPage(event: any) {
        let ref = this.modalService.open(SearchboxComponent);

        this.searchModelProfessional.searchOption = [{seq_vend_id: event.vendorId,},];
        if (this.claimType == 'P') {
            this.searchModelProfessional.searchOption = [{seq_vend_id: event.vendorId,},];
            this.searchModelProfessional.isMatch = true;
            ref.componentInstance.searchModel = this.searchModelProfessional;
        } else if (this.claimType == 'I') {
            this.searchModelInstitutional.searchOption = [{seq_vend_id: event.vendorId,},];
            this.searchModelInstitutional.isMatch = true;
            ref.componentInstance.searchModel = this.searchModelInstitutional;
        } else if (this.claimType == 'D') {
            this.searchModelDental.searchOption = [{seq_vend_id: event.vendorId,},];
            this.searchModelDental.isMatch = true;
            ref.componentInstance.searchModel = this.searchModelDental;
        }

        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((data: any) => {
            console.log(data);

            this.accountsPayableVendorDisplayClaimForm.patchValue({vendorId: event.vendorId});

            this.accountsPayableService.getApTransDetails(data.SEQ_AP_TRANS).subscribe(data => {
                console.log(data);
                this.updateApTransDetailsValues(data[0])
            });

            if (this.claimType == 'P') {
                this.accountsPayableService.getClaimProfessinal(data.SEQ_AP_TRANS, data.SEQ_CLAIM_ID).subscribe(data => {
                    console.log(data);
                    this.updateClaimDetailValuesProfessional(data[0])
                });
            } else if (this.claimType == 'D') {
                this.accountsPayableService.getClaimDental(data.SEQ_AP_TRANS, data.SEQ_CLAIM_ID).subscribe(data => {
                    console.log(data);
                    this.updateClaimDetailValuesProfessional(data[0])
                });
            } else if (this.claimType == 'I') {
                this.accountsPayableService.getClaimInstitutional(data.SEQ_AP_TRANS).subscribe(data => {
                    console.log(data);
                    this.updateClaimDetailValuesProfessional(data[0])
                });
            }

            this.accountsPayableService.getVendorInfo(data.SEQ_VEND_ID, data.SEQ_VEND_ADDRESS).subscribe(data => {
                console.log(data);
                this.updateVendorInfoValues(data[0])
            });
        });
    }

    updateClaimDetailValuesProfessional(data: any) {
        this.accountsPayableVendorDisplayClaimForm.patchValue({claimNumber: data.CLAIM_NUMBER});
        this.accountsPayableVendorDisplayClaimForm.patchValue({received: data.CLAIM_THRU_DATE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({entered: data.INSERT_DATETIME});
        this.accountsPayableVendorDisplayClaimForm.patchValue({daimondId: data.DIAMOND_ID});
        this.accountsPayableVendorDisplayClaimForm.patchValue({member: data.SUBSCRIBER_ID});
        // this.accountsPayableVendorDisplayForm.patchValue({dynamicText: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({lastName: data.LAST_NAME});
        this.accountsPayableVendorDisplayClaimForm.patchValue({first: data.FIRST_NAME});
        this.accountsPayableVendorDisplayClaimForm.patchValue({mi: data.MIDDLE_INITIAL});
        this.accountsPayableVendorDisplayClaimForm.patchValue({providerId: data.PROVIDER_ID});
        this.accountsPayableVendorDisplayClaimForm.patchValue({provName: data.SHORT_NAME});
        this.accountsPayableVendorDisplayClaimForm.patchValue({type: data.PROVIDER_TYPE});
        // this.accountsPayableVendorDisplayForm.patchValue({specialty: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({pcpId: data.SEQ_PCP_ID});
        this.accountsPayableVendorDisplayClaimForm.patchValue({primaryDate: data.PRIMARY_SVC_DATE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({serviceReason: data.SERVICE_REASON_1});
        // this.accountsPayableVendorDisplayForm.patchValue({pcpName: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({plcOfSvc: data.PLACE_OF_SERVICE_1});
        this.accountsPayableVendorDisplayClaimForm.patchValue({diagnosisCode1: data.DIAGNOSIS_1});
        this.accountsPayableVendorDisplayClaimForm.patchValue({authorization: data.AUTH_NUMBER});
        this.accountsPayableVendorDisplayClaimForm.patchValue({planCode: data.PLAN_CODE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({diagonsisCode2: data.DIAGNOSIS_2});
        this.accountsPayableVendorDisplayClaimForm.patchValue({lineItem: data.LINE_NUMBER});
        this.accountsPayableVendorDisplayClaimForm.patchValue({ocAllowed: data.OC_ALLOWED_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({quantity: data.QUANTITY});
        this.accountsPayableVendorDisplayClaimForm.patchValue({procedureCode: data.PROCEDURE_CODE});
        // this.accountsPayableVendorDisplayForm.patchValue({ocPaid: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({ocPaidReason: data.OTHER_CARRIER_RSN});
        // this.accountsPayableVendorDisplayForm.patchValue({dateOfService: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({allowedAmt: data.ALLOWED_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({allowedReason: data.ALLOWED_REASON});
        this.accountsPayableVendorDisplayClaimForm.patchValue({billedAmount: data.BILLED_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({totalNotCov: data.NOT_COVERED_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({notCoveredReason: data.NOT_COVERED_REASON});
        this.accountsPayableVendorDisplayClaimForm.patchValue({claimStatus: data.CLAIM_STATUS});
        this.accountsPayableVendorDisplayClaimForm.patchValue({totalCopay: data.COPAYMENT_1_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({copayReason: data.COPAY_1_REASON});
        this.accountsPayableVendorDisplayClaimForm.patchValue({processStatus: data.PROCESSING_STATUS});
        // this.accountsPayableVendorDisplayForm.patchValue({totalCoins: data.description});
        // this.accountsPayableVendorDisplayForm.patchValue({coinsuranceReason: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({companyCode: data.COMPANY_CODE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({totalDeduct: data.DEDUCTIBLE_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({deductReason: data.DEDUCTIBLE_REASON});
        this.accountsPayableVendorDisplayClaimForm.patchValue({glReference: data.GL_REF_CODE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({withholdAmt: data.WITHHOLD_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({adjustReason: data.ADJUSTMENT_REASON});
        this.accountsPayableVendorDisplayClaimForm.patchValue({medDefCode: data.MED_DEF_CODE});
        this.accountsPayableVendorDisplayClaimForm.patchValue({cobPatlaib: data.COB_PAT_LIAB_CVRG_AMT});
        // this.accountsPayableVendorDisplayForm.patchValue({messages: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({postDate: data.POST_DATE});
        // this.accountsPayableVendorDisplayForm.patchValue({netAmount: data.PAID_NET_AMT});
        // this.accountsPayableVendorDisplayForm.patchValue({holds: data.description});
        this.accountsPayableVendorDisplayClaimForm.patchValue({paidNetAmt: data.PAID_NET_AMT});
        this.accountsPayableVendorDisplayClaimForm.patchValue({adjustMethod: data.ADJUDICATION_METHOD});
        this.accountsPayableVendorDisplayClaimForm.patchValue({adminFee: data.ADMIN_FEE_EXISTS});
    }

    private updateVendorInfoValues(data: any) {
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({fullName: data.FULL_NAME});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({shortName: data.SHORT_NAME});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({addressLine1: data.ADDRESS_LINE_1});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({addressLine2: data.ADDRESS_LINE_2});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({city: data.CITY});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({state: data.STATE});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({county: data.COUNTY});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({zipCode: data.ZIP_CODE});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({country: data.COUNTRY});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({vendorType: data.VENDOR_TYPE});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({irsTaxId: data.IRS_TAX_ID});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({userDefined: data.USER_DEFINED});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({holdPaymentFlag: data.HOLD_PAYMENT_FLAG});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({vendor1099Flag: data.VENDOR_1099_FLAG});
        this.accountsPayableVendorDisplayVendorInfoForm.patchValue({paymentDelayDays: data.PAYMENT_DELAY_DAYS});
    }

    private updateApTransDetailsValues(data: any) {
        this.accountsPayableApTransDetailForm.patchValue({transactionId: data.SEQ_AP_TRANS});
        this.accountsPayableApTransDetailForm.patchValue({fileType: data.FILE_TYPE});
        this.accountsPayableApTransDetailForm.patchValue({apType: data.AP_TYPE});
        this.accountsPayableApTransDetailForm.patchValue({apStatus: data.AP_STATUS});
        this.accountsPayableApTransDetailForm.patchValue({selectForPayment: data.SELECT_FOR_PAYMENT});
        this.accountsPayableApTransDetailForm.patchValue({raPrintFlag: data.PRINT_FLAG});
        this.accountsPayableApTransDetailForm.patchValue({prePriceOnlyFlag: data.PRE_PRICE_ONLY_FLAG});
        this.accountsPayableApTransDetailForm.patchValue({discountWithhold: data.DISCOUNT_WITHHOLD});
        this.accountsPayableApTransDetailForm.patchValue({penltyAmt: data.PENALTY_AMT});
        this.accountsPayableApTransDetailForm.patchValue({netAmt: data.NEW_AMT});
        this.accountsPayableApTransDetailForm.patchValue({interestAmt: data.INTEREST_AMT});
        this.accountsPayableApTransDetailForm.patchValue({discountAmt: data.DISCOUNT_AMT});
        this.accountsPayableApTransDetailForm.patchValue({paidNetAmt_2: data.PAID_NET_AMT});
        this.accountsPayableApTransDetailForm.patchValue({shortName_2: data.SHORT_NAME});
        this.accountsPayableApTransDetailForm.patchValue({checkDate: data.CHECK_DATE});
        this.accountsPayableApTransDetailForm.patchValue({addressLine_1: data.ADDRESS_LINE_1});
        this.accountsPayableApTransDetailForm.patchValue({dueDate: data.DUE_DATE});
        this.accountsPayableApTransDetailForm.patchValue({bankAccountCode: data.BANK_ACCOUNT_CODE});
        this.accountsPayableApTransDetailForm.patchValue({postedDate: data.POSTED_DATE});
        this.accountsPayableApTransDetailForm.patchValue({checkNumber: data.CHECK_NUMBER});
        this.accountsPayableApTransDetailForm.patchValue({vendor1099Flag_2: data.VENDOR_1099_FLAG});
        this.accountsPayableApTransDetailForm.patchValue({eftTransNumber: data.EFT_TRANS_NUMBER});
        this.accountsPayableApTransDetailForm.patchValue({offset: data.OFFSET_FLAG});
        this.accountsPayableApTransDetailForm.patchValue({companyCode_2: data.COMPANY_CODE});
        this.accountsPayableApTransDetailForm.patchValue({glMonth: data.GL_MONTH});
        this.accountsPayableApTransDetailForm.patchValue({debitGlNo1: data.DEBIT_GL_NUMBER_1});
        this.accountsPayableApTransDetailForm.patchValue({debitGlNo2: data.DEBIT_GL_NUMBER_2});
        this.accountsPayableApTransDetailForm.patchValue({creditGlNo1: data.CREDIT_GL_NUMBER_1});
        this.accountsPayableApTransDetailForm.patchValue({creditGlNo2: data.CREDIT_GL_NUMBER_2});
        this.accountsPayableApTransDetailForm.patchValue({capFundModelId: data.CAP_FUND_MODEL_ID});
        this.accountsPayableApTransDetailForm.patchValue({capFundSubModelId: data.CAP_FUND_SUB_MODEL_ID});
        this.accountsPayableApTransDetailForm.patchValue({withholdAmt_2: data.DISCOUNT_WITHHOLD});
        this.accountsPayableApTransDetailForm.patchValue({additionalInfoExists: data.ADDITIONAL_INFO_EXISTS});
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAccountsPayableVendorDisplayShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/APVDS_Accounts_Payable_for_Vendor_Data_Selection.htm';
        viewModal.componentInstance.showIcon = true;
    }
      disableMenu() {
    if (this.userTemplateId == "UT_VIEW") {
      this.menu[0]["dropdownItems"][0].disabled = true;
      this.menu[0]["dropdownItems"][2].disabled = true;
    }
  }
}
