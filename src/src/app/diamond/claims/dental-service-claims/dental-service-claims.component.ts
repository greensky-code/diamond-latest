/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import {MessageMasterDtlService, ProvMasterService, SecUserService} from '../../../api-services';
import { MessageMasterDtl, SecUser } from '../../../api-models';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { NgbToastType } from 'ngb-toast';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePipe } from '@angular/common';
import { UserDefinedValidateCodeService } from '../../../api-services/user-defined-validate-code.service';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import {ClaimBatchInit, Menu, SearchModel} from '../../../shared/models/models';
import { GridOptions } from 'ag-grid-community';
import { DENTAL_SERVICE_CLAIMS_MODULE_ID } from '../../../shared/app-constants';
import { ClaimsBatchInitiationComponent } from '../claims-batch-initiation/claims-batch-initiation.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { DentalClaimHeaderService } from '../../../api-services/claims/dental-claim-header.service';
import { DentalClaimHeader } from '../../../api-models/claims/dental-claim-header.model';
import { DentalServiceClaimsLookup } from '../../../shared/lookup/dental-service-claims-lookup';
import { SvcLookup } from '../../../shared/lookup/dental-service-svc-lookup';
import { ServRsnLookup } from '../../../shared/lookup/dental-service-servrsn-lookup';
import { DxLookup } from '../../../shared/lookup/dental-service-dx-lookup';
import {AuthorizationMasterComponent} from "../../authorization/authorization-master/authorization-master.component";
import {VendorMasterComponent} from "../../vendor/vendor-master/vendor-master.component";
import {AuthWaiveRulesComponent} from "../../authorization/auth-waive-rules/auth-waive-rules.component";
import {MemberCobVerificationInformationComponent} from "../../member/member-cob-verification-information/member-cob-verification-information.component";
import {ClaimHoldRulesComponent} from "../claim-hold-rules/claim-hold-rules.component";
import {MemberCobHistoryComponent} from "../../member/member-cob-history/member-cob-history.component";
import {ClaimDetailAuthProcRuleComponent} from "../claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component";
import {ClaimDisplayComponent} from "../claim-display/claim-display.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {ClaimEvaluationRuleComponent} from "../claim-evaluation-rule/claim-evaluation-rule.component";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {ProviderMasterLookup} from "../../../shared/lookup/provider-master-lookup";
import {ProvAddress} from "../../../api-models/prov-address.model";
import {ProvContractSpecialtyService} from "../../../api-services/prov-contract-specialty.service";
import {ProvAddressService} from "../../../api-services/prov-address.service";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {getCOBHoldDenyShortcutKeys, getDentalServiceClaimsShortcutKeys} from "../../../shared/services/shared.service";

// Use the Component directive to define the DentalServiceClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'dentalserviceclaims',
    templateUrl: './dental-service-claims.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        DentalClaimHeaderService,
        ProvMasterService,
        ProvContractSpecialtyService
    ]

})
export class DentalServiceClaimsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: 'DNCLM';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public showDentalClaimFields: boolean;
    public isDentalClaimIdDisabled = false;
    public dataGridGridOptions: GridOptions;
    editDentalClaimHeader = false;
    memberModuleId = DENTAL_SERVICE_CLAIMS_MODULE_ID;
    dentalClaimHeader: DentalClaimHeader;
    dentalClaimHeaders: DentalClaimHeader[];
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    diamondId: any;
    memberId: any;
    personNumber: any;
    provAddressDropdowns: ProvAddress[] = [];

    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('paySubscriberTemplate') private paySubscriberTemplate: ElementRef;
    @ViewChild('refProvField') private refProvField: ElementRef;
    dentalServiceClaimsForm: FormGroup;
    claimBatchInitData = new ClaimBatchInit();
    paySubModalRef: any;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    private searchModelProvMaster = new SearchModel(
        'provmasters/lookup2',
        ProviderMasterLookup.PROVIDER_MASTER_ALL,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT,
        [],
        true
    );
    shortcuts: ShortcutInput[] = [];

    searchModel = new SearchModel(
        'dentalclaimheaders/lookup',
        DentalServiceClaimsLookup.DENTAL_SERVICE_CLAIMS_DEFAULT,
        DentalServiceClaimsLookup.DENTAL_SERVICE_CLAIMS_ALL,
        []
    );

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private provMasterService: ProvMasterService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        public dentalClaimHeaderService: DentalClaimHeaderService,
        private provContractSpecialtyService: ProvContractSpecialtyService,
        private messageService: MessageMasterDtlService,
        private provAddressService: ProvAddressService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.dentalServiceClaimsForm);
        this.menuInit();

        let ref = this.modalService.open(ClaimsBatchInitiationComponent, {size: 'lg'});
        ref.componentInstance.buttonclickEvent.subscribe(data => {
            this.dentalServiceClaimsForm.patchValue({
                batchNumber: data.batchNumber,
                dateRecv: data.dateReceived
            });
            this.claimBatchInitData.batchNumber = data.batchNumber;
            this.claimBatchInitData.dateReceived = data.dateReceived;
        });

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
        this.secColDetailService.findByTableNameAndUserId('DENTAL_CLAIM_HEADER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.showDentalClaimFields = false;
                    this.isDentalClaimIdDisabled = false;
                    this.dentalServiceClaimsForm.reset();
                    break;
                }
                case 'Open': {
                    this.showDentalClaimFields = false;
                    this.isDentalClaimIdDisabled = false;
                    this.dentalServiceClaimsForm.reset();
                    break;
                }
                case 'Save': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
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
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Header File' },
                    { name: 'Detail File' },
                    { name: 'Patient Liabilities' },
                    { name: 'Other Claim Info' },
                    { name: 'Hold Reasons' }
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Claim Lookup' },
                    { name: 'Submitted Authorization' },
                    { name: 'Pay Subscriber' },
                    { name: 'Pay Dependant', disabled: true },
                    { name: 'Change Default Batch' },
                    { name: 'Edit Vendor Info' },
                    { name: 'Other Amount Info' },
                    {
                        name: 'Authorization Waive/Match',
                        dropdownItems: [
                            {name: 'Manual Waive'},
                            {name: 'Undo Waive'},
                            {name: 'Re-Apply Waive'},
                            {name: 'Re-Apply Match'},
                            {name: 'Re-Apply Match/Waive'}
                        ]
                    },
                    { name: 'View IPA Info' },
                    { name: 'Re-apply Claim Holds' },
                    { name: 'Attach EOB/RA Remarks' },
                    { name: 'Change Header' },
                    { name: 'View COB History' },
                    { name: 'View Claims With Auth Number' },
                    { name: 'Submitted Claim Header Information' },
                    { name: 'View Claim Totals' }
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Shift + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Shift + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Shift + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift + Alt + P'},
                    {name: 'Hold Reason Display', shortcutKey: 'Shift + Alt + H'},
                    {name: 'Audit Display', shortcutKey: 'Shift + Alt + A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Dental Services Claims'},
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
                    'This screen is view only',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLookupFieldSearchModel();
            }
        }
    }

    private handleSpecialMenu(action: string) {
        console.log(action);
        switch (action) {
            case 'Claim Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            case 'Submitted Authorization': {
                const authNo = this.dentalServiceClaimsForm.value.authNo;
                if (authNo) {
                    let ref = this.modalService.open(AuthorizationMasterComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.authNumber = authNo;
                } else {
                    this.showPopUp('Auth Number does not exist', 'Professional Services Claims')
                }

                break;
            }
            case 'Pay Subscriber': {
                this.paySubModalRef = this.modalService.open(this.paySubscriberTemplate, {windowClass: "paySubscriberModel"});

                break;
            }
            case 'Pay Dependent': {

                this.toastService.showToast('This screen is view only', NgbToastType.Danger);

                break;
            }
            case 'Change Default Batch': {
                let ref = this.modalService.open(ClaimsBatchInitiationComponent, {size: 'lg'});
                this.claimBatchInitData = {
                    batchNumber: this.dentalServiceClaimsForm.value.batchNumber?  this.dentalServiceClaimsForm.value.batchNumber: '' ,
                    dateReceived: this.dentalServiceClaimsForm.value.dateRecv ?  this.dentalServiceClaimsForm.value.dateRecv: ''
                }
                ref.componentInstance.claimBatchInitData = this.claimBatchInitData;
                ref.componentInstance.buttonclickEvent.subscribe(data => {
                    this.claimBatchInitData.batchNumber = data.batchNumber;
                    this.claimBatchInitData.dateReceived = data.dateReceived;
                    this.dentalServiceClaimsForm.setValue({
                        'dateRecv': this.claimBatchInitData.dateReceived,
                        'batchNumber': this.claimBatchInitData.batchNumber
                    });
                });

                break;
            }
            case 'Edit Vendor Info': {

                let ref = this.modalService.open(VendorMasterComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;

                this.dentalServiceClaimsForm.controls['vendor'].enable({emitEvent: false});
                ref.componentInstance.vid = this.dentalServiceClaimsForm.value.vendor;
                if (!this.editDentalClaimHeader) {
                    this.dentalServiceClaimsForm.controls['vendor'].disable({emitEvent: false});
                }

                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'Other Amounts Info': {

                this.toastService.showToast('This screen is view only', NgbToastType.Danger);

                break;
            }
            case 'Authorization Waive/Match': {

                let ref = this.modalService.open(AuthWaiveRulesComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.claimtype = 'P';
                break;
            }
            case 'COB Information': {
                let ref = this.modalService.open(MemberCobVerificationInformationComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.seqMembId = this.dentalServiceClaimsForm.value.memberId;

                break;
            }
            case 'Attach EOB/RA Remarks': {

                this.toastService.showToast('This screen is view only', NgbToastType.Danger);

                break;
            }
            case 'Change Header': {

                this.toastService.showToast('This screen is view only', NgbToastType.Danger);

                break;
            }
            case 'View IPA Info': {

                this.toastService.showToast('This screen is view only', NgbToastType.Danger);

                break;
            }
            case 'Re-apply Claim Holds': {
                if (this.dentalServiceClaimsForm.value.vendor) {
                    let ref = this.modalService.open(ClaimHoldRulesComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.vid = this.dentalServiceClaimsForm.value.vendor;
                } else {
                    this.showPopUp('Vendor Id not exists', 'Professional Services Claims')
                }
                break;
            }
            case 'View COB History': {
                this.dentalServiceClaimsForm.controls['memberId'].enable({emitEvent: false});
                const memberId = this.dentalServiceClaimsForm.value.memberId;

                if (!this.editDentalClaimHeader) {
                    this.dentalServiceClaimsForm.controls['memberId'].disable({emitEvent: false});
                }

                if (memberId) {
                    let ref = this.modalService.open(MemberCobHistoryComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.SubID = memberId;
                } else {
                    this.showPopUp('Member Id not exists', 'Professional Services Claims')
                }
                break;
            }
            case 'View Claims with Auth Number': {
                let ref = this.modalService.open(ClaimDetailAuthProcRuleComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'Submitted Claim Information': {
                let ref = this.modalService.open(ClaimDisplayComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'Reset Audit Status': {
                let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'View Claim Totals': {
                let ref = this.modalService.open(ClaimEvaluationRuleComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                break;
            }
            default: {
                this.toastService.showToast(
                    'This screen is view only',
                    NgbToastType.Danger
                );
                break;
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

    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getDentalClaimByClaimNumber(id);
        }
    }

    getDentalClaimByClaimNumber(ruleId: string) {
        let claimNumber = {
            'claimNumber': ruleId,
        };
        this.dentalClaimHeaderService.getDentalClaimByClaimId(claimNumber).subscribe(
            (claim) => {
                if (claim) {
                    this.isDentalClaimIdDisabled = true;
                    this.showDentalClaimFields = true;
                    this.popUpMessage = null;
                    this.dentalClaimHeader = claim;
                    this.getDentalClaim(this.dentalClaimHeader);
                }
            },
            (error) => {
                console.log('error');
                this.showDentalClaimFields = false;
                this.messageService.findByMessageId(7217).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Users', "7217: " + message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.showDentalClaimFields = false;
                            this.isDentalClaimIdDisabled = false;
                            this.dentalServiceClaimsForm.reset();
                        } else if (resp.name === 'No') {
                            this.activeModal.close();
                        }
                    });
                });

            }
        );
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getDentalClaimBySeqClaimId(res.seqClaimId);
            this.isDentalClaimIdDisabled = true;
            this.showDentalClaimFields = true;
            this.popUpMessage = null;
        });
    }

    searchSvcModel = new SearchModel('placesofsvcmaster/lookup',
        SvcLookup.DENTAL_SVC_DEFAULT,
        SvcLookup.DENTAL_SVC_ALL,
        []);

    onF5KeySvc() {
        this.openLookupSvcModel();
    }

    openLookupSvcModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchSvcModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['plcOfSvc'].setValue(res.description);
            this.popUpMessage = null;
        })
    };

    searchServRsnModel = new SearchModel('membermasters/reason/lookup',
        ServRsnLookup.DENTAL_SERVRSN_DEFAULT,
        ServRsnLookup.DENTAL_SERVRSN_ALL,
        []);

        onF5KeyServRsn() {
        this.openLookupServRsnModel();
    }

    openLookupServRsnModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchServRsnModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['servRsn'].setValue(res.DESCRIPTION);
            this.popUpMessage = null;
        })
    };

    searchDxModel = new SearchModel('diagnosiscodemasters/lookup',
        DxLookup.DENTAL_DX_DEFAULT,
        DxLookup.DENTAL_DX_ALL,
        []);

        onF5KeyDx1() {
        this.openLookupDx1Model();
    }

    openLookupDx1Model() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchDxModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['dx1'].setValue(res.diagnosisCode);
            this.dentalServiceClaimsForm.controls['dx1name'].setValue(res.shortDescription);
            this.popUpMessage = null;
        })
    };

    onF5KeyDx2() {
        this.openLookupDx2Model();
    }

    openLookupDx2Model() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchDxModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['dx2'].setValue(res.diagnosisCode);
            this.dentalServiceClaimsForm.controls['dx2name'].setValue(res.shortDescription);
            this.popUpMessage = null;
        })
    };

    onF5KeyDx3() {
        this.openLookupDx3Model();
    }

    openLookupDx3Model() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchDxModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['dx3'].setValue(res.diagnosisCode);
            this.dentalServiceClaimsForm.controls['dx3name'].setValue(res.shortDescription);
            this.popUpMessage = null;
        })
    };

    onF5KeyDx4() {
        this.openLookupDx4Model();
    }

    openLookupDx4Model() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchDxModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.dentalServiceClaimsForm.controls['dx4'].setValue(res.diagnosisCode);
            this.dentalServiceClaimsForm.controls['dx4name'].setValue(res.shortDescription);
            this.popUpMessage = null;
        })
    };



    getDentalClaimBySeqClaimId(seqClaimId: number) {
        this.dentalClaimHeaderService.getDentalClaimHeader(seqClaimId).subscribe(claim => {
            this.dentalClaimHeader = claim
            this.editDentalClaimHeader = true;
            this.getDentalClaim(this.dentalClaimHeader);
        });
    }

    getDentalClaim(dentalClaimHeader: DentalClaimHeader) {
        this.dentalServiceClaimsForm.patchValue({
            'claimNumber': dentalClaimHeader.claimNumber,
            'svcDate': dentalClaimHeader.primarySvcDate,
            'thruDate': dentalClaimHeader.claimThruDate,
            'authNo': dentalClaimHeader.authNumber,
            'textbox001': dentalClaimHeader.secondaryAuth,
            'personNo': dentalClaimHeader.memberMaster.personNumber,
            'lvl': dentalClaimHeader.authLevel,
            'method': dentalClaimHeader.authWaiveMethod,
            'diamondId': dentalClaimHeader.memberMaster.diamondId,
            'memberId': dentalClaimHeader.memberMaster.subscriberId,
            'name': dentalClaimHeader.memberMaster.firstName + ' ' + dentalClaimHeader.memberMaster.lastName,
            'gender': dentalClaimHeader.memberGender,
            'dob': dentalClaimHeader.memberMaster.dateOfBirth,
            'age': dentalClaimHeader.memberAge,
            'ResState': dentalClaimHeader.memberState,
            // 'pcpId': dentalClaimHeader.
            'groupId': dentalClaimHeader.groupMaster.groupId,
            'groupName': dentalClaimHeader.groupMaster.shortName,
            //  'pcpName': dentalClaimHeader.pc
            'state': dentalClaimHeader.groupMaster.state,
            'type': dentalClaimHeader.pcpType,
            'plan': dentalClaimHeader.planCode,
            'ipa': dentalClaimHeader.pcpIpaId,
            'guCategory': dentalClaimHeader.memberMaster.userDefined11,
            'guEffDate': dentalClaimHeader.memberMaster.userDate9,
            'lob': dentalClaimHeader.lineOfBusiness,
            'panel': dentalClaimHeader.panelId,
            'spec': dentalClaimHeader.pcpSpec,
            'refProv': dentalClaimHeader.provMasterSeqRefProvId.providerId,
            'refProvShortname': dentalClaimHeader.provMasterSeqRefProvId.shortName,
            'provShortname': dentalClaimHeader.provMasterSeqProvId.shortName,
            'paySub': dentalClaimHeader.paySubscriber,
            'payDep': dentalClaimHeader.payDependent,
            'refProvSpec': dentalClaimHeader.refProvSpec,
            'provider': dentalClaimHeader.provMasterSeqProvId.providerId,
            'refProvType': dentalClaimHeader.refProvType,
            'RefProvIpa': dentalClaimHeader.refProvIpaId,
            'accNum': dentalClaimHeader.patControlNo,
            'covProv': dentalClaimHeader.covProvFlag,
            'covMthd': dentalClaimHeader.coveringMethod,
            'provAddr': dentalClaimHeader.provAddress.addressLine1,
            'zip': dentalClaimHeader.providerPostalCode,
            'inSvcArea': dentalClaimHeader.inServiceArea,
            'provIpa': dentalClaimHeader.providerIpaId,
            'provSpec': dentalClaimHeader.providerSpec,
            'provType': dentalClaimHeader.providerType,
            'par': dentalClaimHeader.providerParStat,
            'vendor': dentalClaimHeader.vendorMaster.vendorId,
            'vendorAddr': dentalClaimHeader.vendorAddress.addressLine1,
            'vendorShortName': dentalClaimHeader.vendorMaster.shortName,
            // 'dx1name': dentalClaimHeader.
            // 'dx2name': dentalClaimHeader
            // 'dx3name': dentalClaimHeader
            // 'dx4name': dentalClaimHeader
            'auditStatus': dentalClaimHeader.auditStatus,
            //  'holds': dentalClaimHeader.
            'eobInd': dentalClaimHeader.explanationAttached,
            'hdrChgd': dentalClaimHeader.headerChanged,
            'plcOfSvc': dentalClaimHeader.placeOfService,
            'dx1': dentalClaimHeader.diagnosis1,
            'userDef1': dentalClaimHeader.userDefined1,
            'servRsn': dentalClaimHeader.serviceReason,
            'dx2': dentalClaimHeader.diagnosis2,
            'userDef2': dentalClaimHeader.userDefined2,
            'totalBilled': dentalClaimHeader.totalBilledAmt,
            'dx3': dentalClaimHeader.diagnosis3,
            'facilityId': dentalClaimHeader.facilityNumber,
            'dateRecv': dentalClaimHeader.dateReceived,
            'dx4': dentalClaimHeader.diagnosis4,
            'securityCode': dentalClaimHeader.securityCode,
            'batchNumber': dentalClaimHeader.batchNumber,
            'invalidData': dentalClaimHeader.invalidDataInd !== 'N',
            'privacyApplies': dentalClaimHeader.privacyApplies
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidateStatus()
        }, 2000)
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.dentalServiceClaimsForm = this.formBuilder.group({
            claimNumber: ['', { updateOn: 'blur', validators: [] }],
            svcDate: ['', { updateOn: 'blur', validators: [] }],
            thruDate: ['', { updateOn: 'blur', validators: [] }],
            authNo: ['', { updateOn: 'blur', validators: [] }],
            personNo: ['', { updateOn: 'blur', validators: [] }],
            lvl: ['', { updateOn: 'blur', validators: [] }],
            name: ['', { updateOn: 'blur', validators: [] }],
            gender: ['', { updateOn: 'blur', validators: [] }],
            dob: ['', { updateOn: 'blur', validators: [] }],
            age: ['', { updateOn: 'blur', validators: [] }],
            ResState: ['', { updateOn: 'blur', validators: [] }],
            pcpId: ['', { updateOn: 'blur', validators: [] }],
            groupId: ['', { updateOn: 'blur', validators: [] }],
            groupName: ['', { updateOn: 'blur', validators: [] }],
            pcpName: ['', { updateOn: 'blur', validators: [] }],
            state: ['', { updateOn: 'blur', validators: [] }],
            type: ['', { updateOn: 'blur', validators: [] }],
            plan: ['', { updateOn: 'blur', validators: [] }],
            spec: ['', { updateOn: 'blur', validators: [] }],
            ipa: ['', { updateOn: 'blur', validators: [] }],
            guCategory: ['', { updateOn: 'blur', validators: [] }],
            guEffDate: ['', { updateOn: 'blur', validators: [] }],
            lob: ['', { updateOn: 'blur', validators: [] }],
            panel: ['', { updateOn: 'blur', validators: [] }],
            refProvShortname: ['', { updateOn: 'blur', validators: [] }],
            refProvType: ['', { updateOn: 'blur', validators: [] }],
            refProvSpec: ['', { updateOn: 'blur', validators: [] }],
            RefProvIpa: ['', { updateOn: 'blur', validators: [] }],
            provShortname: ['', { updateOn: 'blur', validators: [] }],
            accNum: ['', { updateOn: 'blur', validators: [] }],
            covProv: ['', { updateOn: 'blur', validators: [] }],
            covMthd: ['', { updateOn: 'blur', validators: [] }],
            inSvcArea: ['', { updateOn: 'blur', validators: [] }],
            provIpa: ['', { updateOn: 'blur', validators: [] }],
            provSpec: ['', { updateOn: 'blur', validators: [] }],
            provType: ['', { updateOn: 'blur', validators: [] }],
            vendorShortName: ['', { updateOn: 'blur', validators: [] }],
            dx1name: ['', { updateOn: 'blur', validators: [] }],
            dx2name: ['', { updateOn: 'blur', validators: [] }],
            dx3name: ['', { updateOn: 'blur', validators: [] }],
            dx4name: ['', { updateOn: 'blur', validators: [] }],
            auditStatus: ['', { updateOn: 'blur', validators: [] }],
            holds: ['', { updateOn: 'blur', validators: [] }],
            eobInd: ['', { updateOn: 'blur', validators: [] }],
            hdrChgd: ['', { updateOn: 'blur', validators: [] }],
            clmCode: ['', { updateOn: 'blur', validators: [] }],
            method: ['', { updateOn: 'blur', validators: [] }],
            diamondId: ['', { updateOn: 'blur', validators: [] }],
            memberId: ['', { updateOn: 'blur', validators: [] }],
            textbox002: ['', { updateOn: 'blur', validators: [] }],
            refProv: ['', { updateOn: 'blur', validators: [] }],
            paySub: ['', { updateOn: 'blur', validators: [] }],
            payDep: ['', { updateOn: 'blur', validators: [] }],
            provider: ['', { updateOn: 'blur', validators: [] }],
            provAddr: ['', { updateOn: 'blur', validators: [] }],
            zip: ['', { updateOn: 'blur', validators: [] }],
            par: ['', { updateOn: 'blur', validators: [] }],
            vendor: ['', { updateOn: 'blur', validators: [] }],
            vendorAddr: ['', { updateOn: 'blur', validators: [] }],
            plcOfSvc: ['', { updateOn: 'blur', validators: [] }],
            dx1: ['', { updateOn: 'blur', validators: [] }],
            userDef1: ['', { updateOn: 'blur', validators: [] }],
            servRsn: ['', { updateOn: 'blur', validators: [] }],
            dx2: ['', { updateOn: 'blur', validators: [] }],
            userDef2: ['', { updateOn: 'blur', validators: [] }],
            totalBilled: ['', { updateOn: 'blur', validators: [] }],
            dx3: ['', { updateOn: 'blur', validators: [] }],
            facilityId: ['', { updateOn: 'blur', validators: [] }],
            dateRecv: ['', { updateOn: 'blur', validators: [] }],
            dx4: ['', { updateOn: 'blur', validators: [] }],
            securityCode: ['', { updateOn: 'blur', validators: [] }],
            eobReq: ['', { updateOn: 'blur', validators: [] }],
            batchNumber: ['', { updateOn: 'blur', validators: [] }],
            invalidData: ['', { updateOn: 'blur', validators: [] }],
            textbox001: ['', { updateOn: 'blur', validators: [] }],
            privacyApplies: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    openProMasterSearchModel(event) {
        if (event.key == 'F5') {
            event.preventDefault();

            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.searchModelProvMaster;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {

                this.dentalServiceClaimsForm.patchValue({
                    'refProv': res.PROVIDER_ID,
                })

            });
        } else if (event.key === 'Tab') {
            this.findByProviderId(event.target.value.toUpperCase(), 'refProv');
            this.dentalServiceClaimsForm.patchValue({
                'refProv': event.target.value.toUpperCase()
            });
        }
    }

    private findByProviderId(providerId: string, col: string) {
        this.provMasterService.findByProviderId(providerId).subscribe((res: any) => {

            if (res) {
                if (col === 'provider') {
                    this.dentalServiceClaimsForm.patchValue({
                        provider: res.providerId,
                        provShortName: res.shortName,
                        admProvType: res.providerType,
                        admProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        admProvIpaId: res.ipaId
                    });
                    this.getProviderAddressDropdownValues();

                } else if (col === 'refProv') {
                    this.dentalServiceClaimsForm.patchValue({
                        refProv: res.providerId,
                        attProvShortName: res.shortName,
                        attProvType: res.providerType,
                        attProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        attProvIpaId: res.ipaId
                    });
                }
                this.provContractSpecialtyService.findBySeqProvId(res.seqProvId).subscribe((res1: any) => {
                    if (res1) {
                        if (col === 'provider') {
                            this.dentalServiceClaimsForm.patchValue({
                                admProvSpec: (res1 && res1[0].provContractSpecialtyPrimaryKey) ? res1[0].provContractSpecialtyPrimaryKey.specialtyType : null
                            });
                        }
                    } else if (col === 'refProv') {
                        this.dentalServiceClaimsForm.patchValue({
                            attProvSpec: (res1 && res1[0].provContractSpecialtyPrimaryKey) ? res1[0].provContractSpecialtyPrimaryKey.specialtyType : null
                        });
                    }
                });
            }
        }, (error: Error) => {
            this.dentalServiceClaimsForm.patchValue({
                col: null
            })
        });
    }

    /**
     * getProvider Address DropdownValues
     */
    getProviderAddressDropdownValues() {
        // this.popupClose = true;
        const seqProvId = this.dentalServiceClaimsForm.value.refProv;
        if (!seqProvId) {
            return;
        }
        this.provAddressService.findBySeqProvId(seqProvId).subscribe((values: ProvAddress[]) => {
            this.provAddressDropdowns = values;
        });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getDentalServiceClaimsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/DNCLM_Dental_Services_Claims.htm'
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Dental Service Claims')
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

    isFormValidateStatus = () => {
        this.dentalServiceClaimsForm.valueChanges.subscribe(() => {
            this.isFormDataChangeStatus = true;
        })
    }
}
