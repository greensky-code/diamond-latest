/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';

import {DatePipe, formatCurrency, formatNumber} from '@angular/common';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {
    BenefitPackageDetail,
    BenefitPackageDetailRule,
    BenefitPackageMaster,
    DddwDtl,
    MemberEligHistory,
    MemberEligHistoryCustom,
    MemberMaster,
    MessageMasterDtl,
    PremiumMaster,
    ProcAccumAmtInModel,
    SecUser,
} from '../../../api-models';
// tslint:disable-next-line:max-line-length
import {DisplayBenefitAccumulatorsSelectMemberComponent} from '../display-benefit-accumulators-select-member/display-benefit-accumulators-select-member.component';
import {MemberEligHistoryService} from '../../../api-services/member-elig-history.service';
import {
    BenefitPackageDetailService,
    BenefitPackageMasterService,
    BenefitRuleMaintService,
    DddwDtlService,
    GroupMasterService,
    MessageMasterDtlService,
    PremiumMasterService,
    SecUserService
} from '../../../api-services';
import {ClaimBenefitAccumService} from '../../../api-services/claim-benefit-accum.service';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {ClaimBenefitAccum} from "../../../api-models/claim-benefit-accum.model";
import {DatePickerConfig, datePickerModel} from "../../../shared/config";
import {Menu} from '../../../shared/models/models';
import {Router} from '@angular/router';
import {DefineBenefitValueFiltersComponent} from '../../benefits/define-benefit-value-filters/define-benefit-value-filters.component';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getdisplayBenefitAccumShortcutKeys} from '../../../shared/services/shared.service';
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {DISPLAY_BENEFIT_ACCUMULATOR_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {HelpComponent} from "../help/help.component";


// Use the Component directive to define the DisplayBenefitAccumulatorsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'displaybenefitaccumulators',
    templateUrl: './display-benefit-accumulators.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberEligHistoryService,
        BenefitPackageDetailService,
        BenefitPackageMasterService,
        MemberEligHistoryService,
        ClaimBenefitAccumService,
        GroupMasterService,
        PremiumMasterService,
        DddwDtlService,
        BenefitRuleMaintService
    ]

})
export class DisplayBenefitAccumulatorsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    displayBenefitAccumulatorsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;
    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;
    private memberEligHistory: MemberEligHistory;
    private memberEligHistorys: MemberEligHistoryCustom;
    public shortcuts: ShortcutInput[] = [];

    public menu: Menu[] = [];
    ruleId: any;
    todayDate: any;
    benefitPackageDetails: BenefitPackageDetail[];
    benefitPackageDetailRule: BenefitPackageDetailRule[];
    title = "Display Benefit Accumulators";
    selectedBenefitPackageDetail: BenefitPackageDetail;
    dddwDtls: DddwDtl[] = [];
    dddwDtls1: DddwDtl[] = [];
    MbrFbr: DddwDtl[] = [];
    timeFrame: DddwDtl[] = [];
    Carryover: DddwDtl[] = [];
    CLaimType: DddwDtl[] = [];
    AllGroups: DddwDtl[] = [];
    memberMaster: MemberMaster;
    benefitPackageMaster: BenefitPackageMaster;
    premiumMasters: PremiumMaster[];
    shortNameGroupName: any;
    groupId: any;
    benefitId: any;
    procAccumAmtInModel: ProcAccumAmtInModel[] = [];
    ruleType: any;
    desc: any;
    FileType: any;
    claimBefefitAccums: ClaimBenefitAccum[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    q_seqMembId: any = 0;
    q_seqSubsId: any = 0;
    q_from_date: any;
    q_from_seq_group_id: any = null;
    q_thru_seq_group_id: any = null;
    q_thru_date: any;
    finalData: any;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    secWin: SecWinViewModel;
    windowId = 'DSPBN';
    userTemplateId: string;
    memberModuleId = DISPLAY_BENEFIT_ACCUMULATOR_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;

    popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {

        }
    }

    showPopUp(title: any, message: any) {
        let popMsg = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
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


    dataGrid001GridOptionsExportCsv() {
        let params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        let params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getdisplayBenefitAccumShortcutKeys(this));
        this.cdr.detectChanges();
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Rule ID',
                field: 'benefitRule',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Per Prov',
                field: 'attributeChar11',
                width: 200
            },
            {
                headerName: 'Type',
                field: 'ruleType',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'shortDescription',
                width: 200
            },
            {
                headerName: 'Rule Limit',
                field: 'attributeChar5',
                width: 200
            },
            {
                headerName: 'Accum Amt',
                field: 'accumAmt',
                width: 200
            },
            {
                headerName: 'Remain MT',
                field: 'remainAmt',
                width: 200
            },
            {
                headerName: 'Mbr/Fa,',
                field: 'attributeChar4',
                width: 200
            },
            {
                headerName: 'Start Date',
                field: 'startDate',
                width: 200
            },
            {
                headerName: 'End Date',
                field: 'endDate',
                width: 200
            },
            {
                headerName: 'Time Frame',
                field: 'attributeChar14',
                width: 200
            },
            {
                headerName: 'Carryover',
                field: 'attributeChar1',
                width: 200
            },
            {
                headerName: 'Claim Type',
                field: 'attributeChar2',
                width: 200
            },
            {
                headerName: 'All Groups',
                field: 'attributeChar3',
                width: 200
            },
            {
                headerName: 'Reason Code',
                field: 'attributeChar13',
                width: 200
            },
            {
                headerName: 'Use Qty',
                field: 'use_qty',
                width: 200
            },
            {
                headerName: 'Auth Req',
                field: 'authReq',
                width: 200
            },
            {
                headerName: 'Auth Lvl',
                field: 'authLevel',
                width: 200
            },
            {
                headerName: 'Rider',
                field: 'applyRider',
                width: 200
            },
            {
                headerName: 'Par',
                field: 'applyPar',
                width: 200
            },
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Type',
                field: 'fileType',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Claim Number',
                field: 'seqClaimId',
                width: 200
            },
            {
                headerName: 'Bft Pkg ID',
                field: 'benefitPackageId',
                width: 200
            },
            {
                headerName: 'Date',
                field: 'detailSvcDate',
                width: 200
            },
            {
                headerName: 'Line',
                field: 'lineNumber',
                width: 200
            },
            {
                headerName: 'Subline',
                field: 'subLineCode',
                width: 200
            },
            {
                headerName: 'Quantity',
                field: 'claimQty',
                width: 200
            },
            {
                headerName: 'Amount',
                field: 'claimAmt',
                width: 200
            },
            {
                headerName: 'Weighted Qty',
                field: 'weightedQty',
                width: 200
            },
            {
                headerName: 'Comp. Dt',
                field: 'compareDates',
                width: 200
            }

        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private modalService: NgbModal,
        private memberEligHistoryService: MemberEligHistoryService,
        private benefitPackageDetailService: BenefitPackageDetailService,
        private claimBenefitAccumService: ClaimBenefitAccumService,
        private benefitPackageMasterService: BenefitPackageMasterService,
        private premiumMasterService: PremiumMasterService,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private activeModal: NgbActiveModal,
        private groupMasterService: GroupMasterService,
        private datePipe: DatePipe,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private BenefitRuleMaintService: BenefitRuleMaintService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.selectMember();
    }

    initializeComponentState() {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.displayBenefitAccumulatorsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getBenefitRuleTypes();
        this.getBenefitMBr();
        this.getBenefitClaimType()
        this.getBenefitCarryOver()
        this.getBenefitAllGroups();
        this.getBenefitTimeFrame();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
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
            this.userTemplateId = user.dfltTemplate
            this.getSecWin(user.dfltTemplate);
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
                        'You are not Permitted to view Display Benefit Accumulators',
                        'Display Benefit Accumulators Permission'
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
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_ELIG_HISTORY', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.displayBenefitAccumulatorsForm = this.formBuilder.group({
            subscriberId: ['', {updateOn: 'blur', validators: []}],
            personNo: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            effectiveDate: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            eligStatus: ['', {updateOn: 'blur', validators: []}],
            groupId: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            benefitPackageId: ['', {updateOn: 'blur', validators: []}],
            dynamicText003: ['', {updateOn: 'blur', validators: []}],
            relationshipCode: ['', {updateOn: 'blur', validators: []}],
            dynamicText004: ['', {updateOn: 'blur', validators: []}],
            enefitsAccumulatedAsOf: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    selectMember() {
        let ref = this.modalService.open(DisplayBenefitAccumulatorsSelectMemberComponent);
        ref.componentInstance.onRowSelected.subscribe((memberMaster: MemberMaster) => {
            this.memberMaster = memberMaster;
            this.getMemberEligBySubscriberIdAndPersonNo(memberMaster);
        });
    }

    paitentLiabilities() {

    }

    selectClm() {
        switch (this.FileType) {
            case 'I': {
                this.showPopUp('Error', 'Action Not done yet  ')
                break;
            }
            case 'P': {
                this.showPopUp('Error', 'Action Not done yet  ')
                break;
            }
            case 'D': {
                this.showPopUp('Error', 'Action Not done yet  ')
                break;
            }
            default: {
                this.showPopUp('Error', '14065 No Accumulation Detail is available  ')
                break;
            }
        }
    }

    selectBenefitValueFilters() {
        if (this.ruleId === undefined || this.ruleId === null || this.ruleId === "") {
            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp("Display Benefit Accumulators", "7136: " + message[0].messageText.replace('@1', "Display Benefit Accumulators"));
            });
        } else {
            this.BenefitRuleMaintService.findByBenefitRule(
                this.ruleId
            ).subscribe((BenefitData) => {
                BenefitData = BenefitData.filter(data => data.benefitRuleMaintPrimaryKey.benefitPackageId == this.benefitId)
                if (BenefitData.length > 0) {
                    var rows = null;
                    rows = this.dataGrid001GridOptions.api.getSelectedRows();

                    var tempRow1 = JSON.parse(JSON.stringify(rows));
                    let ref = this.modalService.open(DefineBenefitValueFiltersComponent, {size: <any>'xl'});
                    ref.componentInstance.showIcon = true;
                    var rule = rows[0].benefitRule;
                    var TempRows = null;
                    TempRows = tempRow1;
                    TempRows[0].benefitRule = {};
                    TempRows[0].benefitRule['ruleId'] = rule;
                    TempRows[0].benefitRule['shortDescription'] = TempRows[0].shortDescription;
                    TempRows[0].benefitRule['ruleType'] = TempRows[0].ruleType;


                    ref.componentInstance.benefitPackageDetail = TempRows[0];
                    ref.componentInstance.ruleId = this.ruleId;
                    ref.componentInstance.benefitPackageId = btoa(this.benefitId);
                } else {
                    this.showPopUp('Benefit Value Filters', '32024: No Benefit value filters are defined');
                }
            });
        }
    }

    getMemberEligBySubscriberIdAndPersonNo(memberMaster: MemberMaster) {
        this.q_seqMembId=memberMaster.seqMembId;
        this.q_seqSubsId=memberMaster.seqSubsId;
        this.memberEligHistoryService.getMemberDetails(memberMaster.as_of_date, memberMaster.seqEligHist).subscribe(memberEligHistory => {
            if (memberEligHistory != null && memberEligHistory.length != 0) {
                this.memberEligHistorys = memberEligHistory;
                memberEligHistory[0].riderCode =
                    memberEligHistory[0].riderCode1 +
                    " " +
                    memberEligHistory[0].riderCode2 +
                    " " +
                    memberEligHistory[0].riderCode3 +
                    " " +
                    memberEligHistory[0].riderCode4 +
                    " " +
                    memberEligHistory[0].riderCode5 +
                    " " +
                    memberEligHistory[0].riderCode6 +
                    " " +
                    memberEligHistory[0].riderCode7 +
                    " " +
                    memberEligHistory[0].riderCode8 +
                    " " +
                    memberEligHistory[0].riderCode9 +
                    " " +
                    memberEligHistory[0].riderCode10 +
                    " " +
                    memberEligHistory[0].riderCode11 +
                    " " +
                    memberEligHistory[0].riderCode12 +
                    " " +
                    memberEligHistory[0].riderCode13 +
                    " " +
                    memberEligHistory[0].riderCode14 +
                    " " +
                    memberEligHistory[0].riderCode15 +
                    " " +
                    memberEligHistory[0].riderCode16 +
                    " " +
                    memberEligHistory[0].riderCode17 +
                    " " +
                    memberEligHistory[0].riderCode18 +
                    " " +
                    memberEligHistory[0].riderCode19 +
                    " " +
                    memberEligHistory[0].riderCode20;
                memberEligHistory[0].riderCode = memberEligHistory[0].riderCode
                    .split("null")
                    .join("");
                this.getPremiumMasterBySeqGroupIdAndPlanRiderCode(memberEligHistory[0].seq_group_id, memberEligHistory[0].plan_code);

                let riders = '';
                if (memberEligHistory[0].riderCode1 !== null) {
                    riders = memberEligHistory[0].riderCode1 + " ";
                }
                if (memberEligHistory[0].riderCode2 !== null) {
                    riders += memberEligHistory[0].riderCode2 + " ";
                }
                if (memberEligHistory[0].riderCode3 !== null) {
                    riders += memberEligHistory[0].riderCode3 + " ";
                }
                if (memberEligHistory[0].riderCode4 !== null) {
                    riders += memberEligHistory[0].riderCode4 + " ";
                }
                if (memberEligHistory[0].riderCode5 !== null) {
                    riders += memberEligHistory[0].riderCode5 + " ";
                }
                if (memberEligHistory[0].riderCode6 !== null) {
                    riders += memberEligHistory[0].riderCode6 + " ";
                }
                if (memberEligHistory[0].riderCode7 !== null) {
                    riders += memberEligHistory[0].riderCode7 + " ";
                }
                if (memberEligHistory[0].riderCode8 !== null) {
                    riders += memberEligHistory[0].riderCode8 + " ";
                }
                if (memberEligHistory[0].riderCode9 !== null) {
                    riders += memberEligHistory[0].riderCode9 + " ";
                }
                if (memberEligHistory[0].riderCode10 !== null || memberEligHistory[0].riderCode10 !== undefined) {
                    riders += memberEligHistory[0].riderCode10 ? memberEligHistory[0].riderCode10 :'' + " ";
                }
                if (memberEligHistory[0].riderCode11 !== null || memberEligHistory[0].riderCode11 !== undefined) {
                    riders += memberEligHistory[0].riderCode11 ? memberEligHistory[0].riderCode11 : '' + " ";
                }
                if (memberEligHistory[0].riderCode12 !== null || memberEligHistory[0].riderCode12 !== undefined) {
                    riders += memberEligHistory[0].riderCode12 ? memberEligHistory[0].riderCode12 : '' + " ";
                }
                if (memberEligHistory[0].riderCode13 !== null || memberEligHistory[0].riderCode13 !== undefined) {
                    riders += memberEligHistory[0].riderCode13 ? memberEligHistory[0].riderCode13 : '' + " ";
                }
                if (memberEligHistory[0].riderCode14 !== null || memberEligHistory[0].riderCode14 !== undefined) {
                    riders += memberEligHistory[0].riderCode14 ? memberEligHistory[0].riderCode14 : '' + " ";
                }
                if (memberEligHistory[0].riderCode15 !== null || memberEligHistory[0].riderCode15 !== undefined) {
                    riders += memberEligHistory[0].riderCode15 ? memberEligHistory[0].riderCode15 : '' + " ";
                }
                if (memberEligHistory[0].riderCode16 !== null || memberEligHistory[0].riderCode16 !== undefined) {
                    riders += memberEligHistory[0].riderCode16 ? memberEligHistory[0].riderCode16 : '' + " ";
                }
                if (memberEligHistory[0].riderCode17 !== null || memberEligHistory[0].riderCode17 !== undefined) {
                    riders += memberEligHistory[0].riderCode17 ? memberEligHistory[0].riderCode17 : '' + " ";
                }
                if (memberEligHistory[0].riderCode18 !== null || memberEligHistory[0].riderCode18 !== undefined) {
                    riders += memberEligHistory[0].riderCode18 ? memberEligHistory[0].riderCode18 : '' + " ";
                }
                if (memberEligHistory[0].riderCode19 !== null || memberEligHistory[0].riderCode19 !== undefined) {
                    riders += memberEligHistory[0].riderCode19 ? memberEligHistory[0].riderCode19 : '' + " ";
                }
                if (memberEligHistory[0].riderCode20 !== null || memberEligHistory[0].riderCode20 !== undefined) {
                    riders += memberEligHistory[0].riderCode20 ? memberEligHistory[0].riderCode20 : ''
                }

                this.displayBenefitAccumulatorsForm.patchValue({
                    'subscriberId': memberEligHistory[0].subscriber_id,
                    'personNo': memberEligHistory[0].person_number,
                    'effectiveDate': this.transformDate(memberEligHistory[0].effective_date),
                    'termDate': this.transformDate(memberEligHistory[0].term_date),
                    'eligStatus': memberEligHistory[0].elig_status,
                    'groupId': memberEligHistory[0].group_id,
                    'planCode': memberEligHistory[0].plan_code,
                    'relationshipCode': memberEligHistory[0].relationship_code,
                    'benefitPackageId': memberEligHistory[0].benefit_package_id,
                    'dynamicText004': memberEligHistory[0].riders,
                    'dynamicText003': memberEligHistory[0].short_description,
                    'dynamicText002': memberEligHistory[0].short_name,
                    'dynamicText001': `${memberEligHistory[0].last_name}, ${memberEligHistory[0].first_name}`,
                });
                this.benefitId = memberEligHistory[0].benefit_package_id;
                this.todayDate = this.transformDate(memberMaster.as_of_date);
            } else {
                this.alertMessage = this.alertMessageService.error('No   record.');
            }
        });
    }

    transformDate(date:any) {
        return this.datePipe.transform(date, "MM/dd/yyyy");
    }

    getGroupDetialByGroupId(groupId: any) {
        this.groupMasterService.getGroupMaster(groupId).subscribe(groupMaster => {
            this.groupId = groupMaster.groupId;
            this.shortNameGroupName = groupMaster.shortName;
        });
    }

    getPremiumMasterBySeqGroupIdAndPlanRiderCode(seqGroupId: any, planRiderCode: any) {
        this.premiumMasterService.findBySeqGroupIdAndPlanRiderCode(seqGroupId, planRiderCode).subscribe(premiumMaster => {
            this.premiumMasters = premiumMaster;
            if(this.premiumMasters.length > 0) {
                this.getBenefitPackageMasterByPackageId(btoa(this.premiumMasters[0].benefitPackageId));
            }
        });
    }

    getBenefitPackageMasterByPackageId(packageId: any) {
        this.benefitPackageMasterService.getBenefitPackageMaster(packageId).subscribe(benefitPackageMaster => {
            this.benefitPackageMaster = new BenefitPackageMaster();
            this.benefitPackageMaster = benefitPackageMaster;
            this.getBenefitPackageDetailByPackageId(btoa(this.benefitPackageMaster.benefitPackageId));
        });
    }

    getBenefitPackageDetailByPackageId(benefitPackageId: any) {
        this.dataGrid001GridOptions.api.setRowData([]);
        this.benefitPackageDetailService.getBenefitPackageDetailsRules(atob(benefitPackageId)).subscribe(benefitPackageDetailRule => {
            this.benefitPackageDetailRule = [];
            this.benefitPackageDetailRule = benefitPackageDetailRule;

            if (this.benefitPackageDetailRule.length > 0) {
                for (let i = 0; i < this.benefitPackageDetailRule.length; i++) {
                    this.benefitPackageDetailRule[i].timeFrame = this.benefitPackageDetailRule[i].attributeChar14;
                    this.benefitPackageDetailRule[i].mbrFam = this.benefitPackageDetailRule[i].attributeChar4;
                    this.benefitPackageDetailRule[i].allGroup = this.benefitPackageDetailRule[i].attributeChar3;
                    this.benefitPackageDetailRule[i].rule = this.benefitPackageDetailRule[i].ruleType;
                    this.benefitPackageDetailRule[i].limitType = this.benefitPackageDetailRule[i].attributeChar5;

                    this.setMbrFbr(i, this.benefitPackageDetailRule[i].attributeNum1, this.benefitPackageDetailRule[i].attributeNum2);
                    //Rule Limit
                    this.getRuleLimit(i, this.benefitPackageDetailRule[i].attributeChar5, this.benefitPackageDetailRule[i].ruleType, this.benefitPackageDetailRule[i].attributeNum4, this.benefitPackageDetailRule[i].attributeNum3, this.benefitPackageDetailRule[i].attributeNum2, this.benefitPackageDetailRule[i].attributeNum1);
                    this.getAccumAmt(this.benefitPackageDetailRule[i], i);
                    this.getRuleTypeByRule(this.benefitPackageDetailRule[i].ruleType, i);
                    //MBr Fbr
                    this.getBenefitMbrByColumn(this.benefitPackageDetailRule[i].attributeChar4, i);
                    this.benefitPackageDetailRule[i].carryOver = this.benefitPackageDetailRule[i].attributeChar1;
                    //CarryOver
                    this.getCarryOver(i, this.benefitPackageDetailRule[i].attributeChar1)
                    //UseQty
                    this.getUseQty(i, this.benefitPackageDetailRule[i].ruleType, this.benefitPackageDetailRule[i].attributeNum3);

                    this.getBenefitTimeFrameByColumn(this.benefitPackageDetailRule[i].attributeChar14, i);
                    this.getBenefitCarryByColumn(this.benefitPackageDetailRule[i].attributeChar1, i);
                    this.getBenefitClaimTypeByColumn(this.benefitPackageDetailRule[i].attributeChar2, i);
                    this.getBenefitAllGroupsByColumn(this.benefitPackageDetailRule[i].attributeChar3, i);

                    this.getValues(i);
                }
                this.dataGrid001GridOptions.api.setRowData(this.benefitPackageDetailRule);
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            }
        }, error => {
            this.dataGrid001GridOptions.api.setRowData([]);
        });

    }

    getValues(i: any) {
        this.datePipe.transform(this.benefitPackageDetailRule[i].endDate, 'MM/dd/yyyy');

        this.datePipe.transform(this.benefitPackageDetailRule[i].startDate, 'MM/dd/yyyy');
        this.benefitPackageDetailRule[i].authReq = this.benefitPackageDetailRule[i].authReq.trim();
        //Rider
        if (this.benefitPackageDetailRule[i].applyRider === null) {
            this.benefitPackageDetailRule[i].applyRider = "";
        } else {
            this.benefitPackageDetailRule[i].applyRider = this.benefitPackageDetailRule[i].applyRider.trim();
            if (this.benefitPackageDetailRule[i].applyRider == "S") {
                this.benefitPackageDetailRule[i].applyRider = "Some";
            } else if (this.benefitPackageDetailRule[i].applyRider == "N") {
                this.benefitPackageDetailRule[i].applyRider = "None"
            } else {
                this.benefitPackageDetailRule[i].applyRider = "";
            }
        }
        //Par
        if (this.benefitPackageDetailRule[i].applyPar === null) {
            this.benefitPackageDetailRule[i].applyPar = "";
        } else {
            this.benefitPackageDetailRule[i].applyPar = this.benefitPackageDetailRule[i].applyPar.trim();
            if (this.benefitPackageDetailRule[i].applyPar == "S") {
                this.benefitPackageDetailRule[i].applyPar = "Some";
            } else if (this.benefitPackageDetailRule[i].applyPar == "N") {
                this.benefitPackageDetailRule[i].applyPar = "None"
            } else {
                this.benefitPackageDetailRule[i].applyPar = "";
            }
        }
        //Level
        if (this.benefitPackageDetailRule[i].authLevel === null) {
            this.benefitPackageDetailRule[i].authLevel = "";
        } else {
            this.benefitPackageDetailRule[i].authLevel = this.benefitPackageDetailRule[i].authLevel.trim();
            if (this.benefitPackageDetailRule[i].authLevel == "S") {
                this.benefitPackageDetailRule[i].authLevel = "Some";
            } else if (this.benefitPackageDetailRule[i].authLevel == "N") {
                this.benefitPackageDetailRule[i].authLevel = "None"
            } else {
                this.benefitPackageDetailRule[i].authLevel = "";
            }
        }
    }

    getCarryOver(i: any, ldec_carryover_period: any) {
        if (ldec_carryover_period == null || ldec_carryover_period == 0) {
            this.benefitPackageDetailRule[i].attributeChar1 = "";
        }
    }

    getUseQty(i: any, type: any, ldec_num_3: any) {
        this.benefitPackageDetailRule[i].use_qty = "N";
        if (type == "00" && ldec_num_3 != null) // coinsurance
        {
            //ldec_limit = ldec_num_3
            this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_num_3) + " (qty)"
            this.benefitPackageDetailRule[i].use_qty = "Y";
        }

    }

    setMbrFbr(i: any, idec_num_1: any, idec_num2: any) {
        if (this.benefitPackageDetailRule[i].ruleType == "30") {
            if (idec_num_1 != 0 && idec_num_1 != null) {
                this.benefitPackageDetailRule[i].attributeChar4 = "M";
            } else if (idec_num2 != 0 && idec_num2 != null) {
                this.benefitPackageDetailRule[i].attributeChar4 = "F";
            }
        }


    }

    getAccumAmt(row: any, i: any) {
        var ruleId = row.benefitRule;
        //to get from and thru dates
        // attribiteChar4 for mbr
        //rule for rule_type
        this.prepareDataForQuery(row);
        row.accumAmt = ' ';
        row.remainAmt = ' ';
        if (row.ruleLimit != null && row.ruleLimit != 0) {
            if ((row.attributeChar7 != null && row.attributeChar9 != null) || (row.rule == '20' || row.rule == '80') && row.limitType == 'D') {
                //run sigle query as per legacy  here
                let data = new ProcAccumAmtInModel();
                data.ruleId = row.benefitRule;
                data.ruleType = row.ruleType;
                data.limitType = row.limitType;
                data.childIndivCount = 'Y';
                data.familyMemnber = row.mbrFam;
                data.allGroups = row.allGroup;
                data.seqGroupId = this.memberEligHistorys[0].seq_group_id;
                data.seqProvId = null;
                data.seqMembId = this.memberMaster.seqMembId;
                data.seqSubsId = this.memberMaster.seqSubsId;
                data.relationshipCode = this.memberEligHistorys[0].relationship_code;
                data.reqFromDate = this.q_from_date;
                data.reqThruDate = this.q_thru_date;
                data.detailSvcDate = this.memberMaster.as_of_date;
                data.subLineCode = '*';
                data.attributeChar7 = row.attributeChar7;
                data.renTimeFrame = row.attributeChar9;
                data.renElapsedUnits = row.attributeNum8;
                this.callProcedure(data, row);
            } else {
                var mCondition = false;
                var fCondition = false;
                var aCondition = false;
                var allgroupCondition = false;
                var ruleCondition = false;
                //If else for quries
                if (row.mbrFam == "M") {
                    mCondition = true;
                } else if (row.mbrFam == "F") {
                    fCondition = true;
                } else if (row.mbrFam == "A") {
                    aCondition = true;
                }
                if (row.allGroup == "N") {
                    allgroupCondition = true;
                }
                if ((row.rule == "20" || row.rule == "80") && row.limitType == "D") {
                    ruleCondition = true;
                }
                //run quries depend on above conditions
                if (mCondition && allgroupCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrMGroupNType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);
                    })
                }
                if (fCondition && allgroupCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrFGroupNType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (aCondition && allgroupCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrAGroupNType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqSubsId, this.memberEligHistorys[0].Relationship_code, this.memberEligHistorys[0].seq_group_id).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }

                if (mCondition && allgroupCondition) {
                    this.claimBenefitAccumService.findByIfMbrMGroupN(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId).subscribe(data => {


                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (fCondition && allgroupCondition) {
                    this.claimBenefitAccumService.findByIfMbrFGroupN(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (aCondition && allgroupCondition) {
                    this.claimBenefitAccumService.findByIfMbrAGroupN(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId, this.memberEligHistorys[0].Relationship_code, this.memberEligHistorys[0].seq_group_id).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (mCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrMType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqMembId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (fCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrFType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (aCondition && ruleCondition) {
                    this.claimBenefitAccumService.findByIfMbrAType(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId, this.memberEligHistorys[0].Relationship_code).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (mCondition) {
                    this.claimBenefitAccumService.findByIfMbrM(ruleId, this.q_from_date, this.q_thru_date, this.q_seqMembId).subscribe(data => {
                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (fCondition) {
                    this.claimBenefitAccumService.findByIfMbrF(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
                if (aCondition) {
                    this.claimBenefitAccumService.findByIfMbrA(ruleId, this.q_from_date, this.q_thru_date, this.q_seqSubsId, this.q_seqMembId, this.memberEligHistorys[0].Relationship_code).subscribe(data => {

                        this.finalData = data[0];
                        this.checkFurthertoGetAccumAmtElse(this.finalData, row);

                    })
                }
            }

        }

    }

    checkFurthertoGetAccumAmtElse(data: any, row: any) {
        var ldec_accum_amt = 0;
        var ldec_wgt_qty = 0;
        var ldec_remaining_amt = 0;
        row.accumAmt = null;
        if (data.claim_qty == null) {
            data.claim_qty = 0;
        }
        if (data.weighted_qty == null) {
            data.weighted_qty = 0
        }

        if ((row.rule == "80" || row.rule == "20") && row.limitType == "Q") {
            var claim = data.claim_qty;
            var weight = data.weighted_qty;
            if (claim == null) {
                ldec_accum_amt = 0;
            } else {
                ldec_accum_amt = claim;
            }
            if (weight == null) {
                ldec_wgt_qty = 0;
            } else {
                ldec_accum_amt = weight;
            }
            ldec_accum_amt += ldec_wgt_qty
        } else {
            var claim = data.claim_qty;
            if (claim == null) {
                ldec_accum_amt = 0;
            } else {
                ldec_accum_amt = claim;
            }
        }

        if ((row.rule == "80" || row.rule == "20") && row.limitType == "Q" || row.limitType == "D" || row.limitType == "Y" || row.limitType == "W") {
            row.accumAmt = formatNumber(ldec_accum_amt, "en-US")

        } else {
            row.accumAmt = formatCurrency(ldec_accum_amt, "en-US", "$")
        }
        // calculate & format remaining amt
        ldec_remaining_amt = row.ruleLimit - ldec_accum_amt
        if (ldec_remaining_amt < 0) {
            ldec_remaining_amt = 0
        }

        if ((row.rule == "80" || row.rule == "20") && row.limitType == "Q" || row.limitType == "D" || row.limitType == "Y" || row.limitType == "W") {
            row.remainAmt = formatNumber(ldec_remaining_amt, "en-US")

        } else {
            row.remainAmt = formatCurrency(ldec_remaining_amt, "en-US", "$")
        }


    }

    checkFurthertoGetAccumAmt(data: any, row: any) {

        if ((row.rule == "80" || row.rule == "20") && row.limitType == "Q" || row.limitType == "D" || row.limitType == "Y") {
            var ldec_accum_amt;
            if (data.accumQty == null) {
                ldec_accum_amt = 0;
            } else {
                ldec_accum_amt = data.accumQty;
            }
            row.accumAmt = formatNumber(ldec_accum_amt, "en-US")
        } else if (row.rule == "20" && row.limitType == "W") {
            var ldec_accum_amt;
            if (data.weighted_qty == null) {
                ldec_accum_amt = data.weighted_qty;
            } else {
                ldec_accum_amt = data.weighted_qty;
            }

            row.accumAmt = formatNumber(ldec_accum_amt, "en-US")
        } else {
            var ldec_accum_amt;
            if (data.weighted_qty == null) {
                ldec_accum_amt = data.weighted_qty;
            } else {
                ldec_accum_amt = data.weighted_qty;
            }

            row.accumAmt = formatCurrency(ldec_accum_amt, "en-US", "$")
        }

        // calculate & format remaining amt
        var ldec_remaining_amt = row.ruleLimit - ldec_accum_amt
        if (ldec_remaining_amt < 0) {
            ldec_remaining_amt = 0
        }

        if ((row.rule == "80" || row.rule == "20") && row.limitType == "Q" || row.limitType == "D" || row.limitType == "Y" || row.limitType == "W") {
            row.remainAmt = formatNumber(ldec_remaining_amt, "en-US")

        } else {
            row.remainAmt = formatCurrency(ldec_remaining_amt, "en-US", "$")
        }
    }

    getRuleLimit(i: any, limit: any, type: any, ldec_num_4: any, ldec_num_3: any, ldec_num_2: any, ldec_num_1: any) {
        var ldec_limit = "0";
        if (type == "00") { // coinsurance
            ldec_limit = ldec_num_4
        } else if (type == "10") {
            ldec_limit = ldec_num_2
        } else if (type != "30") {
            ldec_limit = ldec_num_1
        } else if (ldec_num_1 != null && ldec_num_1 != 0) {
            ldec_limit = ldec_num_1
        } else {
            ldec_limit = ldec_num_2
        }

        //
        if (ldec_limit == null || ldec_limit == "0") {
            this.benefitPackageDetailRule[i].attributeChar5 = "No Limit";
            this.benefitPackageDetailRule[i].ruleLimit = null;
        } else {
            if (type == "20" && limit == "Q") {
                this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_limit) + " (qty)"
            } else if (type == "20" && limit == "D") {
                this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_limit) + " (days)"
            } else if (type = "20" && limit == "A") {
                this.benefitPackageDetailRule[i].attributeChar5 = "$" + String(ldec_limit) + "(alwd)"
            } else if (type = "20" && limit == "B") {
                this.benefitPackageDetailRule[i].attributeChar5 = "$" + String(ldec_limit) + "(bld)"
            } else if (type = "20" && limit == "N") {
                this.benefitPackageDetailRule[i].attributeChar5 = "$" + String(ldec_limit) + "(net)"
            } else if (type == "20" && limit == "W") {
                this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_limit) + " (val)"
            } else if (type == "80" && limit == "Q") {
                this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_limit) + " (qty)"
            } else if (type == "80" && limit == "D") {
                this.benefitPackageDetailRule[i].attributeChar5 = String(ldec_limit) + " (days)"
            } else {
                this.benefitPackageDetailRule[i].attributeChar5 = "$" + String(ldec_limit) // dollars
            }
            this.benefitPackageDetailRule[i].ruleLimit = ldec_limit;

        }


    }

    benefitValueFilter() {

    }

    OneBenefitClaimChange() {
        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        this.FileType = selectedRows[0].fileType;
    }

    getBenefitRuleTypes() {
        this.dddwDtlService.findByColumnNameAndDwname('benefit_rule_rule_type', 'dw_accum_dsp_benef').subscribe(dddwDtls => {
            this.dddwDtls1 = [];
            this.dddwDtls1 = dddwDtls;
        });
    }

    getBenefitMbrByColumn(mbr: any, k: any) {
        if (this.MbrFbr.length > 0) {
            for (let i = 0; i < this.MbrFbr.length; i++) {
                if (mbr === this.MbrFbr[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].attributeChar4 = this.MbrFbr[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    getBenefitTimeFrameByColumn(timeFrame: any, k: any) {
        if (this.timeFrame.length > 0) {
            for (let i = 0; i < this.timeFrame.length; i++) {
                if (timeFrame === this.timeFrame[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].attributeChar14 = this.timeFrame[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    getBenefitCarryByColumn(carry: any, k: any) {
        if (this.Carryover.length > 0) {
            for (let i = 0; i < this.Carryover.length; i++) {
                if (carry === this.Carryover[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].attributeChar1 = this.Carryover[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    getBenefitClaimTypeByColumn(CLaimType: any, k: any) {
        if (this.CLaimType.length > 0) {
            for (let i = 0; i < this.CLaimType.length; i++) {
                if (CLaimType === this.CLaimType[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].attributeChar2 = this.CLaimType[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    getBenefitAllGroupsByColumn(AllGroups: any, k: any) {
        if (this.AllGroups.length > 0) {
            for (let i = 0; i < this.AllGroups.length; i++) {
                if (AllGroups === this.AllGroups[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].attributeChar3 = this.AllGroups[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    getBenefitClaimType() {
        this.dddwDtlService.findByColumnNameAndDwname('files', 'dw_dspbn_rules_pick').subscribe(dddwDtls => {
            this.CLaimType = [];
            this.CLaimType = dddwDtls;
        });
    }


    getBenefitAllGroups() {
        this.dddwDtlService.findByColumnNameAndDwname('all_groups', 'dw_dspbn_rules_pick').subscribe(dddwDtls => {
            this.AllGroups = [];
            this.AllGroups = dddwDtls;
        });
    }

    getBenefitMBr() {
        this.dddwDtlService.findByColumnNameAndDwname('mbr_family', 'dw_dspbn_rules_pick').subscribe(dddwDtls => {
            this.MbrFbr = [];
            this.MbrFbr = dddwDtls;
        });
    }

    getBenefitCarryOver() {
        this.dddwDtlService.findByColumnNameAndDwname('carryover_units', 'dw_dspbn_rules_pick').subscribe(dddwDtls => {
            this.Carryover = [];
            this.Carryover = dddwDtls;
        });
    }

    getBenefitTimeFrame() {
        this.dddwDtlService.findByColumnNameAndDwname('time_frame_units', 'dw_dspbn_rules_pick').subscribe(dddwDtls => {
            this.timeFrame = [];
            this.timeFrame = dddwDtls;
        });
    }

    getRuleTypeByRule(ruleType: any, k: any) {
        if (this.dddwDtls1.length > 0) {
            for (let i = 0; i < this.dddwDtls1.length; i++) {
                if (ruleType === this.dddwDtls1[i].dddwDtlPrimaryKey.dataVal) {
                    this.benefitPackageDetailRule[k].ruleType = this.dddwDtls1[i].dddwDtlPrimaryKey.displayVal;
                }
            }
        }
    }

    prepareDataForQuery(row: any) {
        if (row.attributeChar4 == "Mbr") {
            this.q_seqSubsId = 0;
            this.q_seqMembId = this.memberMaster.seqMembId;
        } else {
            this.q_seqMembId = 0;
            this.q_seqSubsId = this.memberMaster.seqSubsId;
        }

        //Case
        switch (row.timeFrame) {

            case 'Y': {  //calender Year
                var d = this.datePipe.transform(this.memberMaster.as_of_date, 'yyyy')
                var li_ccyy = parseInt(this.datePipe.transform(this.memberMaster.as_of_date, 'yyyy')) // century, year
                var li_work = li_ccyy - parseFloat(row.attributeNum6) + 1
                this.q_from_date = this.datePipe.transform(new Date(li_work + '/01/01'), 'yyyy/MM/dd')
                this.q_thru_date = this.datePipe.transform(this.memberMaster.as_of_date, 'yyyy/MM/dd')
                break;
            }
            case 'C': {
                this.memberEligHistoryService.checkIfGroupContract(this.memberMaster.seqMembId.toString(), this.memberMaster.as_of_date).subscribe(data => {
                    if (data.benefit_start_date == null) {
                        this.memberEligHistoryService.findEffectiveAndTermDate(this.memberEligHistorys[0].seq_group_id.toString(), this.memberMaster.as_of_date).subscribe(data => {
                            if (
                              data.length != 0 &&
                              data[0].effective_date == null
                            ) {
                              this.process_message(
                                "14210",
                                this.memberEligHistorys[0].group_id,
                                row.benefitRule
                              );
                              return;
                            }
                            this.q_from_date = data.effective_date
                            if (data.term_date == null) {
                                data.term_date = this.memberMaster.as_of_date;
                            }
                            if (this.compareDates(this.memberMaster.as_of_date, data.term_date)) {
                                this.q_thru_date = data.term_date
                            } else {
                                this.q_thru_date = this.memberMaster.as_of_date;
                            }
                        }, error => {
                            this.gnvo_messaging(14209);
                        });
                    } else {

                        // Strip as_of_date into pieces
                        var li_asof_ccyy = parseInt(this.datePipe.transform(this.memberMaster.as_of_date, 'yyyy')) // century, year
                        var ls_asof_mm = this.datePipe.transform(this.memberMaster.as_of_date, 'MM').toString() // month
                        var ls_asof_dd = this.datePipe.transform(this.memberMaster.as_of_date, 'dd').toString() // day

                        // String benefit start date into pieces
                        var li_bsd_ccyy = parseInt(this.datePipe.transform(data.benefit_start_date, 'yyyy'))  // century, year
                        var ls_bsd_mm = this.datePipe.transform(data.benefit_start_date, 'MM').toString() // month
                        var ls_bsd_dd = this.datePipe.transform(data.benefit_start_date, 'dd').toString() // day

                        // set benefit start date to same year as as_of date
                        var ldt_bsd_start = this.datePipe.transform(new Date(li_asof_ccyy + '/' + ls_asof_mm + '/' + ls_bsd_dd), 'yyyy/MM/dd');

                        // if as of date is less than benefit start date use previous benefit start date
                        if (this.compareDates(data.term_date, this.memberMaster.as_of_date)) {
                            var li_tmp_ccyy = li_asof_ccyy - 1
                            ldt_bsd_start = this.datePipe.transform(new Date(li_tmp_ccyy + '/' + ls_asof_mm + '/' + ls_bsd_dd), 'yyyy/MM/dd');
                        }

                        this.q_from_date = ldt_bsd_start

                        // thru_date = BSD end date or As Of Date (lesser of 2)
                        var ldt_bsd_start_tmp = new Date(ldt_bsd_start);

                        var ldt_bsd_end = ldt_bsd_start_tmp.getDate() + 364;
                        if (this.compareDates(this.memberMaster.as_of_date, ldt_bsd_end)) {
                            this.q_thru_date = ldt_bsd_end;
                        } else {
                            this.q_thru_date = this.memberMaster.as_of_date;
                        }
                    }

                });

                //statements;
                break;
            }
            case 'E': {
                // from_date = As Of Date minus no. of years
                var li_ccyy = parseInt(this.datePipe.transform(this.memberMaster.as_of_date, 'yyyy')) // century, year
                var ls_mm = this.datePipe.transform(this.memberMaster.as_of_date, 'MM').toString() // month
                var ls_dd = this.datePipe.transform(this.memberMaster.as_of_date, 'dd').toString() // day


                li_work = li_ccyy - parseFloat(row.attributeNum6)
                if (this.is_date(new Date(li_work + "-" + ls_mm + "-" + ls_dd))) {
                    ls_dd = ls_dd
                } else {
                    ls_dd = (parseInt(ls_dd) - 1).toString();
                }

                if(isNaN(li_work)){
                    this.q_from_date = 0;
                }else{
                    this.q_from_date = this.datePipe.transform(new Date(li_work + "/" + ls_mm + "/" + ls_dd), "yyyy-MM-dd").toString();
                }

                // thru_date = As Of Date
                this.q_thru_date = this.memberMaster.as_of_date;
                break;
            }
            case "L": {
                this.q_from_date = "1901/01/01";
                this.q_thru_date = this.memberMaster.as_of_date
                break;
            }
            case "D": {
                // from_date = As Of Date minus no. of days (less 1 day)
                // scr 5219 by Ravi Dt : 01/05/1999
                var ldec_work = (parseFloat(row.attributeNum6) - 1) * -1
                var asof = new Date(this.memberMaster.as_of_date);
                asof.setDate(asof.getDate() + ldec_work);
                this.q_from_date = this.datePipe.transform(asof, "yyyy-MM-dd").toString()
                this.q_thru_date = this.memberMaster.as_of_date
                break;

            }
            default: {
                break;
            }
        }

        //Subtract carryover period from requested dates
        if (row.carryOver == "Y") {
            li_ccyy = parseInt(this.datePipe.transform(this.q_from_date, 'yyyy')) // century, year
            var ls_mmdd = this.datePipe.transform(this.q_from_date, 'MM').toString() // month, day
            li_work = li_ccyy - parseFloat(row.attributeNum6) //carry_period
            var d = li_work.toString() + ls_mmdd;
            this.q_from_date = new Date(d);
        } else if (row.carryOver == "D") {
            li_work = parseFloat(row.attributeNum6) * -1
            var tmp = new Date(this.q_from_date);
            tmp.setDate(tmp.getDate() + ldec_work);
            this.q_from_date = this.datePipe.transform(asof, "yyyy-MM-dd").toString()
        }
        this.q_from_seq_group_id = 0
        this.q_thru_seq_group_id = 4294967295
        if (row.allGroups == "N") {
            this.q_from_seq_group_id = this.q_seqMembId
            this.q_thru_seq_group_id = this.q_seqMembId
        }
    }

    is_date(input: any) {
        if (Object.prototype.toString.call(input) === "[object Date]")
            return true;
        return false;
    };

    compareDates(date1: any, date2: any): boolean {
        return this.datePipe.transform(date1, 'MM-yyyy') >
            this.datePipe.transform(date2, 'MM-yyyy');
    }

    getClaimBenefitAccumulators(row: any) {
        let seqSubsId:any;
        seqSubsId=this.memberMaster.seqSubsId;
        //Prepare Query
        this.prepareDataForQuery(row);
        this.claimBenefitAccumService.getBenefitlClaimAccum(this.q_seqMembId,this.q_seqSubsId, row.benefitRule, this.q_from_date, this.q_thru_date, this.q_from_seq_group_id, this.q_thru_seq_group_id).subscribe(claimBefefitAccums => {
            this.claimBefefitAccums = []
            this.dataGrid002GridOptions.api.showLoadingOverlay()

            this.dataGrid002GridOptions.api.setRowData([])
            if (claimBefefitAccums !== null && claimBefefitAccums.length !== 0) {
                this.claimBefefitAccums = claimBefefitAccums;
                this.dataGrid002GridOptions.api.setRowData(this.claimBefefitAccums);
            } else {
                this.dataGrid002GridOptions.api.setRowData([]);
            }
        });

    }

    gnvo_messaging(id: any) {
        if (id == "14209") {
            var msg = "Error while reading Member Eligibility record.  Cannot calculate Accum Total for this Benefit Rule.";
            this.showPopUp(this.title, msg);
        }
    }

    process_message(id: any, one: any, two: any) {
        if (id == "14210") {
            var msg = `Error while reading Group Contract for Group ID ${one}.  Cannot calculate Accum Total for Benefit Rule ${two}.`;
            this.showPopUp(this.title, msg);

        }
    }

    callProcedure(data: ProcAccumAmtInModel, row: any) {
        this.memberEligHistoryService.callProcedure(data).subscribe(data => {

            this.checkFurthertoGetAccumAmt(data, row);
        })
    }

    onChangeBenefitRule() {
        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            this.selectedBenefitPackageDetail = selectedRows[0];

            this.ruleId = selectedRows[0].benefitRule;
            this.ruleType = selectedRows[0].ruleType;
            this.desc = selectedRows[0].shortDescription;
            this.getClaimBenefitAccumulators(selectedRows[0]);
        } else {
            this.selectedBenefitPackageDetail = null;
        }
    }

    resetAll() {
        this.displayBenefitAccumulatorsForm.reset();
        this.dataGrid001GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.setRowData([]);
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    //statements;
                    break;
                }
                case 'Open': {
                    this.resetAll()
                    //statements;
                    break;
                }
                case 'Save': {
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Special') {             // handle File actions
            switch (event.action) {
                case 'Select Member': {
                    this.selectMember();
                    break;
                }
                case 'Benefit Value Filters': {
                    this.selectBenefitValueFilters();
                    break;
                }
                case 'Select claim': {
                    this.selectClm();
                    break;
                }
                case 'Paitent Liabilities': {
                    this.paitentLiabilities();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is in progress', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }

        else {             // handle Edit-Menu Actions
            this.toastService.showToast('Action is in progress', NgbToastType.Danger);
        }
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", disabled: true},
                    {name: "Open"},
                    {name: "Save", disabled: true},
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
                    {name: "Select Member"},
                    {name: "Select claim"},
                    {name: "Benefit Value Filters"},
                    {name: "Paitent Liabilities", disabled: true},
                ],
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
                    {name: "2 Alias/Responsible Party/Privacy"},
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

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.popupAlert();
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = () => {
        try {
            let popUpMessage = new PopUpMessage(
                'Display Benefit Accumulators',
                'Display Benefit Accumulators',
                '6128: Data has been modified, press yes to save changes',
                'info',
                [],
                MessageType.SUCCESS
            );
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.buttonclickEvent.subscribe((resp:any) => {
                if (resp.name === 'Yes') {
                } else if (resp.name === 'No') {
                    this.activeModal.close()
                } // 3rd case: In case of cancel do nothing
            });
        } catch (e) {
            console.log(e);
        }
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/DSPBN_Display_Member_Benefits.htm';
    }
}
