/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountsPayable, MessageMasterDtl} from "../../../api-models/index"
import {AccountsPayableService} from "../../../api-services/accounts-payable.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {DddwDtlService, MessageMasterDtlService, SecUserService} from "../../../api-services";
import {SecUser, SecWin} from "../../../api-models";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {Menu, SearchModel} from "../../../shared/models/models";
import {ClaimEvaluationRuleLookup} from "../../../shared/lookup/claim-evaluation-rule-lookup";
import {AccountsPayableLookup} from "../../../shared/lookup/accounts-payable-lookup";
import {NgbToastType} from "ngb-toast";
import {CONSTANTS, getAccountsPayableShortcutKeys} from "../../../shared/services/shared.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {ToastService} from "../../../shared/services/toast.service";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {BenefitsHelpComponent} from "../../benefits/benefits-help/benefits-help.component";
import {ApHelpComponent} from "../../ap/ap-help/ap-help.component";

// Use the Component directive to define the AccountsPayableComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountspayable',
    templateUrl: './accounts-payable.component.html',

})
export class AccountsPayableComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountsPayableForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;
    shortcuts: ShortcutInput[] = [];
    menu: Menu[] = [];
    printFlag: any[];

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

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
        private accountsPayableService: AccountsPayableService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private router: Router,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    onLookupFieldChange(event) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupPage();
        }
        else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(6131).subscribe(res => {
                    this.showPopUp('6131: ' + res[0].messageText,'Accounts Payable');
                })
            }
            else {
                event.preventDefault();
                this.openLookupTabFunction(event.target.value)
            }
        }
    }

    searchModel = new SearchModel(
        'accountspayables/lookup',
        AccountsPayableLookup.ACCOUNTS_PAYABLE_ALL,
        AccountsPayableLookup.ACCOUNTS_PAYABLE_DEFAULT,
        []);

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((data: any) => {
            this.formPatchData(data)
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


    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.populateDDW();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableForm);
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
                menuItem: "Special",
                dropdownItems: [
                    {name: "Transaction ID Lookup"},
                    {name: "View AP Additional Info", disabled: true},
                    {name: "View Additional G/L Accounts", disabled: true},
                    {name: "Admin Fee Info", disabled: true},
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
    @Input() showIcon: boolean = true;

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Special") {
            // handle File actions
            switch (event.action) {
                case "Transaction ID Lookup": {
                    this.openLookupPage();
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
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }

        else {
            // handle Edit-Menu Actions
            this.toastService.showToast("Action is in progress", NgbToastType.Danger);
        }
    }

    public fileTypes: any[];
    public apTypes: any[];
    public apStatus: any[];
    public selectForPayment: any[];
    public priceOnlyFlag: any[];


    populateDDW() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_file_type', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.fileTypes = res;
        });
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_ap_type', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.apTypes = res;
        });
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_ap_status', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.apStatus = res;
        });
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_select_for_payment', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.selectForPayment = res;
        });
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_pre_price_only_flag', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.priceOnlyFlag = res;
        });
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
        ('accounts_payable_print_flag', 'dw_acpay_de', 0).subscribe((res: any) => {
            this.printFlag = res;
        });
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountsPayableForm = this.formBuilder.group({
            apTransactionId: ['', {updateOn: 'blur', validators: []}],
            claimType: ['', {updateOn: 'blur', validators: []}],
            apType: ['', {updateOn: 'blur', validators: []}],
            processingStatus: ['', {updateOn: 'blur', validators: []}],
            selectForPayment: ['', {updateOn: 'blur', validators: []}],
            raeobPrintFlag: ['', {updateOn: 'blur', validators: []}],
            prePriceOnlyFlag: ['', {updateOn: 'blur', validators: []}],
            discountWithhold: ['', {updateOn: 'blur', validators: []}],
            penaltyAmt: ['', {updateOn: 'blur', validators: []}],
            netAmt: ['', {updateOn: 'blur', validators: []}],
            interestAmt: ['', {updateOn: 'blur', validators: []}],
            discountAmt: ['', {updateOn: 'blur', validators: []}],
            paidNetAmt: ['', {updateOn: 'blur', validators: []}],
            vendorId: ['', {updateOn: 'blur', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            checleftDt: ['', {updateOn: 'blur', validators: []}],
            addressLine1: ['', {updateOn: 'blur', validators: []}],
            dueDate: ['', {updateOn: 'blur', validators: []}],
            bankAccountCode: ['', {updateOn: 'blur', validators: []}],
            postedDate: ['', {updateOn: 'blur', validators: []}],
            checkNumber: ['', {updateOn: 'blur', validators: []}],
            vendor1099Flag: ['', {updateOn: 'blur', validators: []}],
            eftTransNumber: ['', {updateOn: 'blur', validators: []}],
            offset: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            glMonth001: ['', {updateOn: 'blur', validators: []}],
            glMonth002: ['', {updateOn: 'blur', validators: []}],
            debitGlNo1: ['', {updateOn: 'blur', validators: []}],
            debitGlNo2: ['', {updateOn: 'blur', validators: []}],
            creditGlNo1: ['', {updateOn: 'blur', validators: []}],
            creditGlNo2: ['', {updateOn: 'blur', validators: []}],
            capFundModelId: ['', {updateOn: 'blur', validators: []}],
            capFundSubModelId: ['', {updateOn: 'blur', validators: []}],
            withholdAmt: ['', {updateOn: 'blur', validators: []}],
            additionalInfoExists: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    openLookupTabFunction = (seqApTrans) => {
        this.accountsPayableService.getAccountsPayable(seqApTrans).subscribe((accountsPayable) => {
            this.formPatchData(accountsPayable)
        });
    };

    formPatchData = (data) => {
        let printFlags;
        this.printFlag.map(item => {
            data.printFlag === item.value ?  printFlags = item.key:''
        });

        this.accountsPayableForm.patchValue({apTransactionId: data.seqApTrans});
        this.accountsPayableForm.patchValue({claimType: data.fileType});
        this.accountsPayableForm.patchValue({apType: data.apType});
        this.accountsPayableForm.patchValue({processingStatus: data.apStatus});
        this.accountsPayableForm.patchValue({selectForPayment: data.selectForPayment});
        this.accountsPayableForm.patchValue({raeobPrintFlag: printFlags});
        this.accountsPayableForm.patchValue({prePriceOnlyFlag: data.prePriceOnlyFlag});
        this.accountsPayableForm.patchValue({discountWithhold: data.discountWithhold});
        this.accountsPayableForm.patchValue({penaltyAmt: data.penaltyAmt});
        this.accountsPayableForm.patchValue({netAmt: data.netAmt});
        this.accountsPayableForm.patchValue({interestAmt: data.interestAmt});
        this.accountsPayableForm.patchValue({discountAmt: data.discountAmt});
        this.accountsPayableForm.patchValue({paidNetAmt: data.paidNetAmt});
        this.accountsPayableForm.patchValue({vendorId: data.vendorId});
        this.accountsPayableForm.patchValue({dynamicText: data.shortName});
        this.accountsPayableForm.patchValue({checleftDt: data.checleftDt});
        this.accountsPayableForm.patchValue({addressLine1: data.addressLine1});
        this.accountsPayableForm.patchValue({dueDate: data.dueDate});
        this.accountsPayableForm.patchValue({bankAccountCode: data.bankAccountCode});
        this.accountsPayableForm.patchValue({postedDate: data.postedDate});
        this.accountsPayableForm.patchValue({checkNumber: data.checkNumber});
        this.accountsPayableForm.patchValue({vendor1099Flag: data.vendor1099Flag});
        this.accountsPayableForm.patchValue({eftTransNumber: data.eftTransNumber});
        this.accountsPayableForm.patchValue({offset: data.offsetFlag});
        this.accountsPayableForm.patchValue({companyCode: data.companyCode});
        this.accountsPayableForm.patchValue({glMonth001: data.glMonth});
        this.accountsPayableForm.patchValue({debitGlNo1: data.debitGlNumber1});
        this.accountsPayableForm.patchValue({debitGlNo2: data.debitGlNumber2});
        this.accountsPayableForm.patchValue({creditGlNo1: data.creditGlNumber1});
        this.accountsPayableForm.patchValue({creditGlNo2: data.creditGlNumber2});
        this.accountsPayableForm.patchValue({capFundModelId: data.capFundModelId});
        this.accountsPayableForm.patchValue({capFundSubModelId: data.capFundSubModelId});
        this.accountsPayableForm.patchValue({withholdAmt: data.capFundWithholdAmt});
        this.accountsPayableForm.patchValue({additionalInfoExists: data.description});
        this.accountsPayableForm.get('apTransactionId').disable();
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAccountsPayableShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/ACPAY_Accounts_Payable.htm';
        viewModal.componentInstance.showIcon = true;
    }
}
