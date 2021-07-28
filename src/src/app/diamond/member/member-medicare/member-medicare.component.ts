/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { Location } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { MemberMasterService } from '../../../api-services/member-master.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { MemberEligHistory, MemberMaster, MessageMasterDtl, SecUser } from '../../../api-models';
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service';
import { Menu, SearchModel } from "../../../shared/models/models";
import { MemberMasterLookup } from "../../../shared/lookup/member-master-lookup";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { MessageMasterDtlService, SecUserService } from '../../../api-services';
import {
    CONSTANTS,
    getMemberMasterShortcutKeys,
    getMemberMedicareShortcutKeys,
    SharedService
} from '../../../shared/services/shared.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecurityService } from "../../../shared/services/security.service";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { MEM_MODULE_ID } from "../../../shared/app-constants";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecWin } from "../../../api-models/security/sec-win.model";
import { MemberEligibilityHistoryComponent } from '../../../diamond/member/member-eligibility-history/member-eligibility-history.component';
import {AliasResponsiblePartyPrivacyComponent} from "../alias-responsible-party-privacy/alias-responsible-party-privacy.component";
import {MemberAddressComponent} from "../member-address/member-address.component";
import {MemberCobVerificationInformationComponent} from "../member-cob-verification-information/member-cob-verification-information.component";
import {MemberWorkingAgedComponent} from "../member-working-aged/member-working-aged.component";
import {MemberBillingComponent} from "../member-billing/member-billing.component";
import {MemberConditionsComponent} from "../member-conditions/member-conditions.component";
import {MemberMasterComponent} from "../member-master/member-master.component";
import {MemberCobHistoryComponent} from "../member-cob-history/member-cob-history.component";
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {HelpComponent} from "../help/help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
// Use the Component directive to define the MemberMedicareComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "membermedicare",
    templateUrl: "./member-medicare.component.html",
})
export class MemberMedicareComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    memberMedicareForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    memberMasters: MemberMaster[];
    memberEligHistories: MemberEligHistory[] = [];
    memberEligHistory: MemberEligHistory;
    seqMemId: any;
    public popUpMessage: PopUpMessage;
    sub: any;
    @Input() showIcon: boolean = false;
    menu: Menu[] = [];
    @Input() winID?: string;
    @ViewChild("popUpMesssage") child: PopUpMessageComponent;
    @Input() SubID?: string;
    @Input() selectedMember?: string;
    memberMaster: MemberMaster;
    memberMasterLength = 0;

    searchStatus: boolean = false;
    keyNames: string = "subscriber_id";
    keyValues: any;

    secWin: SecWinViewModel;
    windowId = 'MEMMC';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    subscriberId: string;
    popupClose: Boolean = false;
    acknowStatus: Boolean = false;
    screenCloseRequest: Boolean = false;
    searchModel = new SearchModel(
        "membermasters/lookup",
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );
    public shortcuts: ShortcutInput[] = [];

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
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
            // onGridReady: () => {
            //     if(this.SubID) {
            //       this.dataGrid001GridOptions.api.showLoadingOverlay();
            //     }
            // }
        };
        this.dataGrid001GridOptions.editType = "fullRow";
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Person No",
                field: "personNumber",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Last",
                field: "lastName",
                width: 150,
            },
            {
                headerName: "First",
                field: "firstName",
                width: 150,
            },
            {
                headerName: "DOB",
                field: "dateOfBirth",
                width: 150,
            },
            {
                headerName: "Gender",
                field: "gender",
                width: 150,
            },
            {
                headerName: "Employee Number",
                field: "employeeNo",
                width: 200,
            },
            {
                headerName: "Citizenship",
                field: "userDefined2",
                width: 200,
            },
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
            // onGridReady: () => {
            //     if(this.SubID) {
            //       this.dataGrid002GridOptions.api.showLoadingOverlay();
            //     }
            //   }
        };
        this.dataGrid002GridOptions.editType = "fullRow";
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Eff Date",
                field: "effectiveDate",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Term Date",
                field: "termDate",
                width: 150,
            },
            {
                headerName: "State",
                field: "statecd",
                width: 150,
            },
            {
                headerName: "Country",
                field: "countycd",
                width: 150,
            },
            {
                headerName: "M",
                field: "medicaid",
                width: 150,
            },
            {
                headerName: "D",
                field: "riderCode11",
                width: 150,
            },
            {
                headerName: "H",
                field: "riderCode12",
                width: 150,
            },
            {
                headerName: "I",
                field: "riderCode13",
                width: 150,
            },
            {
                headerName: "E",
                field: "riderCode14",
                width: 150,
            },
            {
                headerName: "Wa",
                field: "riderCode15",
                width: 150,
            },
            {
                headerName: "W",
                field: "entMcareWelfareFlg",
                width: 150,
            },
            {
                headerName: "P",
                field: "entMcarePipdcgFactor",
                width: 150,
            },
            {
                headerName: "Part A",
                field: "entMcarePartAFlg",
                width: 150,
            },
            {
                headerName: "Part B",
                field: "entMcarePartBFlg",
                width: 150,
            },
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberMasterService: MemberMasterService,
        private toastService: ToastService,
        private memberEligHistoryService: MemberEligHistoryService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private sharedService: SharedService,
        private cdr: ChangeDetectorRef,
    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState() {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberMedicareForm);
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        // setTimeout(() => {
        //     this.dataGrid001GridOptions.api.setRowData([]);
        //     this.dataGrid002GridOptions.api.setRowData([]);
        // });
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.memberMedicareForm.patchValue({
                    'subscriberId': params['id']
                }, {emitEvent : false});
                this.loadGrids();
            }
            // In a real app: dispatch action to load the details here.
        });
        //If opens from popup from other Screen
        if (this.SubID) {
            this.memberMedicareForm.patchValue({
                subscriberId: this.SubID,
            }, {emitEvent: false, onlySelf: false});
            this.loadGrids();
        }
    }

    isSuperUser = false;
    secProgress = true;

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
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New" },
                    { name: "Open" },
                    { name: "Save" },
                    { name: "Close" },
                    { name: "-" },
                    { name: "Main Menu" },
                    { name: "Shortcut Menu" },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit" },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", disabled: true },
                    { name: "Copy", disabled: true },
                    { name: "Paste", disabled: true },
                    { isHorizontal: true },
                    { name: "Next" },
                    { name: "Previous" },
                    { isHorizontal: true },
                    { name: "Lookup" },
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    { name: "Master File" },
                    { name: "Eligibility History" },
                    { name: "Coordination of Benefits" },
                    { name: "Alias/Responsible Party/Privacy" },
                    { name: "Member Address" },
                    { name: "M+ C Information" },
                    { name: "Working Aged" },
                    { name: "Billing Control" },
                    { name: "Conditions" },
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [{ name: "Member Lookup" }],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Tile" },
                    { name: "Layer" },
                    { name: "Cascade" },
                    { name: "Arrange Icons" },
                    { isHorizontal: true },
                    { name: "Show Timestamp" },
                    { name: "Audit Display" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Member Medicare + Choice History" },
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window", shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" },
                ],
            },
        ];
    }


    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Special") {
            // handle File actions
            switch (event.action) {
                case "Member Lookup": {
                    this.openLookupPage();
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
        } else  if (event.menu.menuItem === "Topic") {
            // handle File actions
            this.sharedService.onMemberModuleTopicMenuClick(
                event.action,
                'M+C Information',
                this.activeModal,
                this.memberMaster ? this.memberMedicareForm.get('subscriberId').value : '',
                this.selectedMember ? this.selectedMember : ''
            );
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

    openLookupPage() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.memberMedicareForm.patchValue({
                subscriberId: resp.subscriberId,
                diamondId: resp.diamondId,
            }, {emitEvent: false, onlySelf: false});
            this.subscriberId = resp.subscriberId;
            this.selectedMember = resp.personNumber;
            this.loadGrids();
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberMedicareForm = this.formBuilder.group(
            {
                diamondId: [ { value: '', disabled: true }, { updateOn: 'blur', validators: [] }],
                subscriberId: ["", { updateOn: "blur", validators: [] }],
                medicaid: ['', { validators: [Validators.maxLength(1)] }],
                disabled: ['', { validators: [Validators.maxLength(1)] }],
                hospice: ['', { validators: [Validators.maxLength(1)] }],
                institutional: ['', { validators: [Validators.maxLength(1)] }],
                esrd: ['', { validators: [Validators.maxLength(1)] }],
                aged: ['', { validators: [Validators.maxLength(1)] }],
                welfare: ['', { validators: [Validators.maxLength(1)] }],
                entMcarePipdcgFactor: ['', { validators: [Validators.maxLength(1)] }],
                parta: ['', { validators: [Validators.maxLength(1)] }],
                partb: ['', { validators: [Validators.maxLength(1)] }],
                effDate: ['', { validators: [Validators.required] }],
                enrlDate: ['', { validators: [Validators.required] }],
                termDate: ['', { validators: [Validators.required] }],
                statecd: ['', { validators: [Validators.required] }],
                countycd: ['', { validators: [Validators.required] }],
                geocode: ['', { validators: [Validators.required] }],
                pbp: ['', { validators: [Validators.required] }],
                acknowl: ['', { validators: [Validators.required] }],
                pbpeffdate: ['', { validators: [Validators.required] }],
                providerId: ['', { validators: [Validators.required] }],
                facilityName: ['', { validators: [Validators.required] }],
                admissionDate: ['', { validators: [Validators.required] }],
                addr1: ['', { validators: [Validators.required] }],
                dischargeDate: ['', { validators: [Validators.required] }],
                addr2: ['', { validators: [Validators.required] }],
                city: ['', { validators: [Validators.required] }],
                county: ['', { validators: [Validators.required] }],
                state: ['', { validators: [Validators.required] }],
                zipCode: ['', { validators: [Validators.required] }],
                phoneNumber: ['', { validators: [Validators.required] }],
                certification: ['', { validators: [Validators.required] }],
                def1: ['', { validators: [Validators.required] }],
                def2: ['', { validators: [Validators.required] }],
                date1: ['', { validators: [Validators.required] }],
                date2: ['', { validators: [Validators.required] }],
                medicarePartAEffectDate:['', { validators: [Validators.required] }],
                mcarePartABTermDate:['', { validators: [Validators.required] }],
                medicarePartBEnrollDate:['', { validators: [Validators.required] }],
            },
            { updateOn: "submit", emitEvent: false, onlySelf: false}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onChangeSubscriberId(event: any) {
        this.memberMedicareForm.patchValue({ subscriberId: event.target.value }, {emitEvent: false, onlySelf: false});
        this.loadGrids();
    }

    loadGrids() {
        this.subscriberId = this.memberMedicareForm.get('subscriberId').value;
        this.memberMasterService
            .findByDiamondAndSubscriberId(
                null,
                this.memberMedicareForm.get('subscriberId').value
            )
            .subscribe(
                (memberMasters) => {
                    if (memberMasters && memberMasters.length > 1) {
                        this.memberMasterLength = memberMasters.length - 1;
                    }
                    this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex(key => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
                    this.seqMemId = this.memberMaster.seqMembId;
                    this.dataGrid001GridOptions.api.setRowData(memberMasters);
                    let personNumber = this.memberMaster.personNumber;
                    let seqId = this.memberMedicareForm.get('subscriberId').value;
                    if (seqId !== '') {
                        this.getMemberEligibleHistoryByMemberMasterId(seqId, personNumber);
                        this.dataGrid001GridOptions.api.selectIndex(this.selectedMember ? memberMasters.findIndex(key => key.seqMembId == this.selectedMember) : 0, false, false);
                    }
                }
            );
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(
            (memberMasters) => {
                this.memberMasters = memberMasters;
                this.dataGrid001GridOptions.api.setRowData(this.memberMasters);
            }
        );
    }

    getMemberEligibleHistoryByMemberMasterId(
        subscriberId: any,
        personNumber: any
    ) {
        this.memberEligHistoryService
            .getMemberEligHistory(subscriberId, personNumber)
            .subscribe(
                (memberEligHistories) => {
                    for (let item in memberEligHistories) {
                        memberEligHistories[item].entMcarePipdcgFactor = memberEligHistories[item].entMcarePipdcgFactor === null ? 4 : memberEligHistories[item].entMcarePipdcgFactor;
                        memberEligHistories[item].riderCode10 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(0) : '';
                        memberEligHistories[item].riderCode11 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(1) : '';
                        memberEligHistories[item].riderCode12 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(2) : '';
                        memberEligHistories[item].riderCode13 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(3) : '';
                        memberEligHistories[item].riderCode14 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(4) : '';
                        memberEligHistories[item].riderCode15 = memberEligHistories[item].medicareStatusFlg ? memberEligHistories[item].medicareStatusFlg.trim().charAt(5) : '';
                    }
                    this.memberEligHistory = new MemberEligHistory();
                    if (memberEligHistories && memberEligHistories.length > 0) {
                        this.memberEligHistory = memberEligHistories[0];
                    }
                    this.loadData();
                    if (this.memberEligHistory !== null) {
                        this.memberEligHistories = [];
                        for (let item in memberEligHistories) {
                            let medicaid;
                            let statecd;
                            let countrycd;
                            if(memberEligHistories[item].medicareStatusFlg){
                                medicaid=memberEligHistories[item].medicareStatusFlg.substr(5,1);
                                statecd=memberEligHistories[item].medicareStatusFlg.substr(0,1);
                                countrycd=memberEligHistories[item].medicareStatusFlg.substr(2,3)
                            }else{
                                medicaid="";
                                statecd="";
                                countrycd="";
                            }
                            memberEligHistories[item].statecd=statecd;
                            memberEligHistories[item].countycd=countrycd;
                            memberEligHistories[item].medicaid=medicaid;
                            this.memberEligHistories.push(memberEligHistories[item]);
                        }

                        this.dataGrid002GridOptions.api.setRowData(
                            this.memberEligHistories
                        );
                        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                    } else {
                        this.memberEligHistories = [];
                        this.dataGrid002GridOptions.api.setRowData([]);
                    }
                },
                (error) => {
                    this.dataGrid002GridOptions.api.setRowData([]);
                }
            );
    }

    onSelectionChanged(event: any) {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.searchStatus = true;
            this.keyValues = selectedRows[0].seqSubsId;
        } else {
            this.keyValues = "";
            this.searchStatus = false;
        }
        this.dataGrid002GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.showLoadingOverlay();
        this.getMemberEligibleHistoryByMemberMasterId(
            selectedRows[0].subscriberId,
            selectedRows[0].personNumber
        );
    }

    onLookupFieldChange(event) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupPage();
        }
    }
    pbpAcknowlIndStatus:boolean=false;
    loadData = () => {
        let medicaid;
        let statecd;
        let countrycd;
        if(this.memberEligHistory.medicareStatusFlg){
            medicaid=this.memberEligHistory.medicareStatusFlg.substr(5,1);
            statecd=this.memberEligHistory.medicareStatusFlg.substr(0,1);
            countrycd=this.memberEligHistory.medicareStatusFlg.substr(2,3)
        }else{
            medicaid="";
            statecd="";
            countrycd="";
        }

        this.memberMedicareForm.patchValue({
            medicaid: medicaid,
            disabled: this.memberEligHistory.riderCode11,
            hospice: this.memberEligHistory.riderCode12,
            institutional: this.memberEligHistory.riderCode13,
            esrd: this.memberEligHistory.riderCode14,
            aged: this.memberEligHistory.riderCode15,
            welfare: this.memberEligHistory.entMcareWelfareFlg,
            entMcarePipdcgFactor: this.memberEligHistory.entMcarePipdcgFactor  ? this.memberEligHistory.entMcarePipdcgFactor : 4,
            parta: this.memberEligHistory.entMcarePartAFlg,
            partb: this.memberEligHistory.entMcarePartBFlg,
            effDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.effectiveDate),
            enrlDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.medicarePartBEnrollDate),
            termDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
            statecd: statecd,
            countycd:countrycd,
            geocode: this.memberEligHistory.geocode,
            pbp: this.memberEligHistory.pbp,
            acknowl: this.memberEligHistory.pbpAcknowledgeIndicator,
            pbpeffdate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.pbpEffectiveDate),
            providerId: this.memberEligHistory.facSeqProvId,
            facilityName: this.memberEligHistory.facName,
            admissionDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.facAdmissionDate),
            addr1: this.memberEligHistory.facAddressLine1,
            dischargeDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.facDischargeDate),
            addr2: this.memberEligHistory.facAddressLine2,
            city: this.memberEligHistory.facCity,
            county: this.memberEligHistory.facCounty,
            state: this.memberEligHistory.facState,
            zipCode: this.memberEligHistory.facZipCode,
            phoneNumber: this.memberEligHistory.facPhoneNumber,
            certification: this.memberEligHistory.facMmCertification,
            def1: this.memberEligHistory.mcUserDefined1,
            def2: this.memberEligHistory.mcUserDefined2,
            date1: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcUserDate1),
            date2: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcUserDate2),
            medicarePartAEffectDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.medicarePartAEffectDate),
            mcarePartABTermDate:this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcarePartABTermDate),
            medicarePartBEnrollDate:this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.medicarePartBEnrollDate),
        }, {emitEvent: false});
        this.acknowStatus = this.memberEligHistory.facMmCertification === '1';
        this.pbpAcknowlIndStatus = this.memberEligHistory.pbpAcknowledgeIndicator === '1';
        this.isFormDataModified();
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert('29065: ' + message[0].messageText, 'Member Medicare + Choice History')
            })
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = (message: string, title: string) => {
        try{
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
                    // this.saveMem()
                }
                else if(resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    this.activeModal.close();
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.memberMedicareForm.valueChanges.subscribe(res => {
            this.popupClose = true;
        })
    }
    onSelectedTable2Changed = (event: any) => {
        this.memberEligHistory = this.dataGrid002GridOptions.api.getSelectedRows()[0];
        this.loadData();
    };

    ngAfterViewInit(): void {
        this.shortcuts.push(...getMemberMedicareShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/MEMMC_M_C_History.htm';
    }
}
