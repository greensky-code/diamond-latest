import {DatePipe, Location} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, datePickerModel, NGBModalOptions} from '../../../shared/config';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {CONSTANTS, getEligibilityHistoryShortcutKeys, SharedService} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {MemberEligHistory, MemberMaster, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {MemberEligHistoryService} from '../../../api-services/member-elig-history.service';
import {Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Form} from '../../../shared/helpers/form.helper';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {GroupMasterLookup} from '../../../shared/lookup/group-master-lookup';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {
    DddwDtlService,
    GroupMasterService,
    MessageMasterDtlService,
    RiderMasterService, SecUserService,
    SystemCodesService
} from '../../../api-services';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {MemberMasterReasconLookup} from "../../../shared/lookup/member-master-reason-lookup";
import {MemberMasterPlancodeLookup} from "../../../shared/lookup/member-master-plancode-lookup";
import {CountryService} from "../../../api-services/country.service";
import {MemberMasterDeptLookup} from "../../../shared/lookup/member-master-dept-lookup";
import {MembEligHistRateTypeLookup} from "../../../shared/lookup/memb-elig-hist-ratetype-lookup";
import {DEFAULT_LANGUAGE, SYSTEM_CODE_MELIGLOC} from "../../../shared/models/constants";
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {SearchService} from '../../../shared/services/search.service';
import {HelpComponent} from "../help/help.component";
import {NotesComponent} from "../../../shared/components/notes/notes.component";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {GROUP_DETAIL_MODULE_ID} from "../../../shared/app-constants";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {NgxSpinnerService} from "ngx-spinner";
import { MenuBarComponent } from '../../../shared/components/menu-bar/menu-bar.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
// Use the Component directive to define the MemberEligibilityHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'membereligibilityhistory',
    templateUrl: './member-eligibility-history.component.html',
    styleUrls: ['./member-eligibility-history.component.scss'],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService,
        MemberEligHistoryService,
        GroupMasterService,
        RiderMasterService
    ],
})
export class MemberEligibilityHistoryComponent
    implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public memberEligibilityHistoryForm: FormGroup;
    public formValidation: FormValidation;
    public memberEligHistoryPersonsGridOptions: GridOptions;
    public memberEligHistoryGridOptions: GridOptions;
    public alertMessage: AlertMessage;
    public datePickerConfig = DatePickerConfig;
    public popUpMessage: PopUpMessage;
    public displayMessage: any;
    menu: Menu[] = [];
    @Input() showIcon: boolean = false;
    memberMasters: MemberMaster[];
    memberMaster: MemberMaster;
    memberMasterLength = 0
    memberEligHistories: MemberEligHistory[];
    selectedMemberMaster: MemberMaster;
    selectedMemberEligHistory: MemberEligHistory;
    termReason: Boolean = true;

    private memberEligHistoryPersonsGridApi: any;
    private memberEligHistoryGridApi: any;
    @Input() winID?: string;
    @ViewChild('effDate') effDateElement: ElementRef;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    public isSubscriberDisabled = false;
    sub: any;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    @Input() SubID?: string;
    @Input() selectedMember?: string;
    groupIdInput: Boolean = true;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    seqGroupId: any;
    groupId: string = '';
    windowId = 'MELIG';
    riderCodes: any[] = [];
    planCodes: any[] = [];
    public seqSourceId: number = -1;

    searchModel = new SearchModel(
        'membermasters/lookup',
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );
    groupSearchModel = new SearchModel(
        'groupmasters/lookup',
        GroupMasterLookup.GROUP_MASTER_ALL,
        GroupMasterLookup.GROUP_MASTER_DEFAULT,
        []
    );

    reasonCodeModel = new SearchModel(
        'membermasters/reason/lookup',
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        []
    );

    deptSearchModel = new SearchModel(
        'membermasters/dept/lookup',
        MemberMasterDeptLookup.DEPT_DEFAULT,
        MemberMasterDeptLookup.DEPT_ALL,
        []
    );

    planCodeModel = new SearchModel(
        'membermasters/plancode/lookup',
        MemberMasterPlancodeLookup.PLAN_CODE_ALL,
        MemberMasterPlancodeLookup.PLAN_CODE_DEFAULT,
        []
    );

    rateTypeModel = new SearchModel(
        'membermasters/ratetype/lookup',
        MembEligHistRateTypeLookup.DEFAULT,
        MembEligHistRateTypeLookup.ALL,
        []
    );

    // Use constructor injection to inject an instance of a FormBuilder
    relationshipCodes: any[] = [];
    countries: any[] = [];
    searchStatus: boolean = false;
    keyNames: string = 'subscriber_id';
    keyValues: any;
    lookupField: string;
    seqMembId: any;
    inputValue: Boolean = false;
    selectedEmirate: Boolean = false;
    valueChanged: Boolean = false;
    selectedRowIndex: number = 0;
    selectedSeqMembId: number = 0;
    editElgStatus = true;

    secWin: SecWinViewModel;
    userTemplateId: string;
    memberModuleId = GROUP_DETAIL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    menuOpened = ""

    constructor(
        private sharedService:SharedService,
        private route: ActivatedRoute,
        public mask: Mask,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private dateFormatPipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private countryService: CountryService,
        private location: Location,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private memberMasterService: MemberMasterService,
        private memberEligHistoryService: MemberEligHistoryService,
        private alertMessageService: AlertMessageService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private groupMasterService: GroupMasterService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private searchService: SearchService,
        private riderMasterService: RiderMasterService,
        private renderer: Renderer2,
        private spinner: NgxSpinnerService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private auditService: AuditService,
    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState() {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberEligibilityHistoryForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.memberEligHistoryPersonsGridOptions.api.setRowData([]);
            this.memberEligHistoryGridOptions.api.setRowData([]);
        });
        this.sub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.memberEligibilityHistoryForm.patchValue({
                    subscriberId: params['id'],
                }, {emitEvent : false});
                this.getMemberMasterByDiamondIdAndSubscriberId();
            }
            // In a real app: dispatch action to load the details here.
        });
        if (this.SubID) {
            this.selectedMember=null;
            this.getMemberMasterByDiamondIdAndSubscriberId();
            this.memberEligibilityHistoryForm.patchValue({
                subscriberId: this.SubID
            })
        }
    }

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
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

    openShortcutKeys() { 
        let obj = {
            menu: {
                menuItem: 'File'
            },
            action: 'Shortcut Menu'
        }
        this.onMenuItemClick(obj)
    }

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            debugger
            if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'm':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Master File'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Coordination of Benefits'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Alias/Responsible Party/Privacy'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Member Address'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'i':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'M+C Information'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'b':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Billing Control'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            }
            if (this.menuOpened == "fileDropdownSpecial") {
                if(value == 'l') {
                    this.openLookupFieldSearchModel()
                }
            }
            if (this.menuOpened == "fileDropdownWindows") {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Audit Display'
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
                        'Member Eligibility History Permission',
                        'You are not Permitted to view Group Detail'
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

    setSearchResults(groupId: any) {
        if (groupId && this.groupId != groupId) {
            const searchOptionsRider = [{GROUP_ID: groupId, RECORD_TYPE: "R"}];
            let searchModelRider = JSON.parse(JSON.stringify(this.planCodeModel));
            searchModelRider.searchOption = searchOptionsRider;
            this.searchService.getSearchResults(searchModelRider).subscribe(resp => {
                this.riderCodes = resp;
            });

            const searchOptionsPlanCode = [{GROUP_ID: groupId, RECORD_TYPE: "P"}];
            let searchModelPlanCode = JSON.parse(JSON.stringify(this.planCodeModel));
            searchModelPlanCode.searchOption = searchOptionsPlanCode;
            this.searchService.getSearchResults(searchModelPlanCode).subscribe(resp => {
                this.planCodes = resp;
            });
            this.groupId = groupId;
        }
    }

    ngAfterViewInit(): void {
        this.getCountries();
        this.getRelationshipCodes();
        this.shortcuts.push(...getEligibilityHistoryShortcutKeys(this));
        this.cdr.detectChanges();
        this.memberEligibilityHistoryForm.valueChanges.subscribe(() => {
            this.popupClose = true;
            this.valueChanged = true;
        });
    }

    public popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button);
        }
    }

    public memberEligHistoryPersonsGridOptionsExportCsv() {
        var params = {};
        this.memberEligHistoryPersonsGridApi.exportDataAsCsv(params);
    }

    public memberEligHistoryGridOptionsExportCsv() {
        var params = {};
        this.memberEligHistoryGridApi.exportDataAsCsv(params);
    }

    private showPopUp(title = 'Pop-up message title', message = 'Pop-up message') {
        this.popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title,
            message,
            'icon'
        );
        this.popUpMessage.buttons = [
            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
        ];
        this.child.showMesssage();
    }

    private popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    private createDataGrid001(): void {
        this.memberEligHistoryPersonsGridOptions = {
            paginationPageSize: 50,
            onGridReady: () => {
                if (this.SubID) {
                    this.memberEligHistoryPersonsGridOptions.api.showLoadingOverlay();
                    this.memberEligibilityHistoryForm.patchValue({
                        subscriberId: this.SubID,
                    }, {emitEvent : false});
                    this.getMemberMasterByDiamondIdAndSubscriberId();
                }
            }
        };
        this.memberEligHistoryPersonsGridOptions.editType = 'fullRow';
        this.memberEligHistoryPersonsGridOptions.columnDefs = [
            {
                headerName: 'Person No',
                field: 'personNumber',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: 'Last',
                field: 'lastName',
                width: 150,
            },
            {
                headerName: 'First',
                field: 'firstName',
                width: 150,
            },
            {
                headerName: 'DOB',
                field: 'dateOfBirth',
                width: 150,
            },
            {
                headerName: 'Gender',
                field: 'gender',
                width: 150,
            },
            {
                headerName: 'Employee Number',
                field: 'employeeNo',
                width: 200,
            },
            {
                headerName: 'Citizenship',
                field: 'userDefined2',
                width: 150,
            },
        ];
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(
            (memberMasters) => {
                this.memberMasters = memberMasters;
                this.memberEligHistoryPersonsGridOptions.api.setRowData(this.memberMasters);
            }
        );
    }

    private createDataGrid002(): void {
        this.memberEligHistoryGridOptions = {
            paginationPageSize: 50,
            onGridReady: () => {
                if(this.SubID) {
                    this.memberEligHistoryGridOptions.api.showLoadingOverlay();
                }
            }
        };
        this.memberEligHistoryGridOptions.editType = 'fullRow';
        this.memberEligHistoryGridOptions.columnDefs = [
            {
                headerName: 'Eff Date',
                field: 'effectiveDate',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: 'Term Date',
                field: 'termDate',
                width: 150,
            },
            {
                headerName: 'EligSts',
                field: 'eligStatus',
                width: 150,
            },
            {
                headerName: 'Group ID',
                field: 'groupId',
                width: 150,
            },
            {
                headerName: 'Plan Code',
                field: 'planCode',
                width: 150,
            },
            {
                headerName: 'Riders',
                field: 'riderCode1',
                width: 150,
                valueGetter: function lineOfBusinessGetter(params:any) {
                    let riders = '';
                    if (params.data.riderCode1) {
                        riders = params.data.riderCode1 + " ";
                    }
                    if (params.data.riderCode2) {
                        riders += params.data.riderCode2 + " ";
                    }
                    if (params.data.riderCode3) {
                        riders += params.data.riderCode3 + " ";
                    }
                    if (params.data.riderCode4) {
                        riders += params.data.riderCode4 + " ";
                    }
                    if (params.data.riderCode5) {
                        riders += params.data.riderCode5 + " ";
                    }
                    if (params.data.riderCode6) {
                        riders += params.data.riderCode6 + " ";
                    }
                    if (params.data.riderCode7) {
                        riders += params.data.riderCode7 + " ";
                    }
                    if (params.data.riderCode8) {
                        riders += params.data.riderCode8 + " ";
                    }
                    if (params.data.riderCode9) {
                        riders += params.data.riderCode9 + " ";
                    }
                    if (params.data.riderCode10) {
                        riders += params.data.riderCode10 + " ";
                    }
                    if (params.data.riderCode11) {
                        riders += params.data.riderCode11 + " ";
                    }
                    if (params.data.riderCode12) {
                        riders += params.data.riderCode12 + " ";
                    }
                    if (params.data.riderCode13) {
                        riders += params.data.riderCode13 + " ";
                    }
                    if (params.data.riderCode14) {
                        riders += params.data.riderCode14 + " ";
                    }
                    if (params.data.riderCode15) {
                        riders += params.data.riderCode15 + " ";
                    }
                    if (params.data.riderCode16) {
                        riders += params.data.riderCode16 + " ";
                    }
                    if (params.data.riderCode17) {
                        riders += params.data.riderCode17 + " ";
                    }
                    if (params.data.riderCode18) {
                        riders += params.data.riderCode18 + " ";
                    }
                    if (params.data.riderCode19) {
                        riders += params.data.riderCode19 + " ";
                    }
                    if (params.data.riderCode20) {
                        riders += params.data.riderCode20
                    }
                    return riders;
                },
            },
        ];
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberEligibilityHistoryForm = this.formBuilder.group({
            diamondId: ['', { validators: [] }],
            subscriberId: [
                '',
                {
                    validators: [
                        Validators.compose([Validators.required, Validators.maxLength(12)]),
                    ],
                },
            ],
            effDate: ['', { validators: [Validators.required] }],
            termDate: ['', { validators: [] }],
            termRsn: ['', { validators: [Validators.maxLength(5)] }],
            dateOfDeath: ['', { validators: [] }],
            eligSts: ['', { validators: [Validators.required] }],
            dynamicText001: ['', { validators: [] }],
            relCode: ['', { validators: [Validators.required] }],
            riderCode1: ['', { validators: [Validators.maxLength(2)] }],
            riderCode2: ['', { validators: [Validators.maxLength(2)] }],
            riderCode3: ['', { validators: [Validators.maxLength(2)] }],
            riderCode4: ['', { validators: [Validators.maxLength(2)] }],
            riderCode5: ['', { validators: [Validators.maxLength(2)] }],
            riderCode6: ['', { validators: [Validators.maxLength(2)] }],
            riderCode7: ['', { validators: [Validators.maxLength(2)] }],
            riderCode8: ['', { validators: [Validators.maxLength(2)] }],
            riderCode9: ['', { validators: [Validators.maxLength(2)] }],
            riderCode10: ['', { validators: [Validators.maxLength(2)] }],
            riderCode11: ['', { validators: [Validators.maxLength(2)] }],
            riderCode12: ['', { validators: [Validators.maxLength(2)] }],
            riderCode13: ['', { validators: [Validators.maxLength(2)] }],
            riderCode14: ['', { validators: [Validators.maxLength(2)] }],
            riderCode15: ['', { validators: [Validators.maxLength(2)] }],
            riderCode16: ['', { validators: [Validators.maxLength(2)] }],
            riderCode17: ['', { validators: [Validators.maxLength(2)] }],
            riderCode18: ['', { validators: [Validators.maxLength(2)] }],
            riderCode19: ['', { validators: [Validators.maxLength(2)] }],
            riderCode20: ['', { validators: [Validators.maxLength(2)] }],
            groupId: ['', { validators: [Validators.required] }],
            planCode: [
                '',
                {
                    validators: [
                        Validators.compose([Validators.required, Validators.maxLength(10)]),
                    ],
                },
            ],
            lob: ['', { validators: [Validators.maxLength(3)] }],
            dynamicText002: ['', { validators: [] }],
            panelId: ['', { validators: [Validators.maxLength(3)] }],
            ipa: ['', { validators: [Validators.maxLength(3)] }],
            pcpId: ['', { validators: [] }],
            pcpChngRsn: ['', { validators: [Validators.maxLength(5)] }],
            prov2: ['', { validators: [] }],
            rpt1: ['', { validators: [Validators.maxLength(15)] }],
            emirateArch: ['', { validators: [] }],
            dept: ['', { validators: [Validators.maxLength(20)] }],
            location: ['', { validators: [Validators.maxLength(20)] }],
            hireDate: ['', { validators: [] }],
            salary: ['', { updateOn: 'blur', validators: [Validators.maxLength(24) ] }],
            mCareSts: ['', { validators: [Validators.maxLength(11)] }],
            benStartDate: ['', { validators: [] }],
            otherSts: ['', { validators: [Validators.maxLength(8)] }],
            emirateCode: ['', {validators : []}],
            pecWaived: ['', { validators: [] }],
            pecEndDate: ['', { validators: [] }],
            reason: ['', { validators: [Validators.maxLength(5)] }],
            csInd: ['', { validators: [Validators.maxLength(2)] }],
            rateType: ['', { validators: [Validators.maxLength(10)] }],
            rpt2: ['', { validators: [Validators.maxLength(30)] }],
            rpt3: ['', { validators: [Validators.maxLength(30)] }],
            privacyOn: ['', { validators: [] }],
            residenceProv: ['', { validators: [Validators.maxLength(30)] }],
            workProv: ['', { validators: [Validators.maxLength(30)] }],
            payrollProv: ['', { validators: [Validators.maxLength(30)] }],
            taxExempt: ['', { validators: [Validators.maxLength(30)] }],
        });
    }

    private resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    createNewForm(){
        this.editElgStatus=false;
        if (this.selectedMemberMaster == null) {
            this.messageService.findByMessageId(14011).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUps("14011: " + message[0].messageText, "Member Eligibility History", "OK");
            });
        } else if (this.memberEligibilityHistoryForm.dirty) {
            this.saveMemberEligibilityHistory('New');
        } else {
            this.selectedMemberEligHistory = null;
            this.memberEligibilityHistoryForm.reset({
                'subscriberId': this.selectedMemberMaster.subscriberId,
                'eligSts': 'Y'
            }, {emitEvent : false});
            this.effDateElement.nativeElement.scrollIntoView();
        }
    }

    saveForm() {
        this.saveMemberEligibilityHistory('Save');
    }

    getControl(name:any) {
        return this.memberEligibilityHistoryForm.get(name);
    }

    getMemberMasterByDiamondIdAndSubscriberId() {
        let subscriberId = this.getControl('subscriberId').value;
        let diamondId = this.getControl('diamondId').value ? this.getControl('diamondId').value : null;
        this.memberMasterService.findByDiamondAndSubscriberId(diamondId, subscriberId).subscribe(
            (memberMasters) => {
                if (memberMasters) {
                    this.memberMasters = memberMasters;
                    if (this.selectedSeqMembId === 0) {
                        this.selectedSeqMembId = memberMasters[0].seqMembId;
                    }
                    if (memberMasters && memberMasters.length > 1) {
                        this.memberMasterLength = memberMasters.length - 1;
                    }
                    this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex((key: any) => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
                    this.seqSourceId = this.selectedSeqMembId;
                    this.memberEligHistoryPersonsGridOptions.api.setRowData(memberMasters);
                    this.memberEligHistoryGridOptions.api.setRowData([]);
                    let index = memberMasters.findIndex((key: any) => key.personNumber == this.selectedMember);
                    index = (index >= 0) ? index : 0;
                    this.memberEligHistoryPersonsGridOptions.api.selectIndex(this.selectedMember ? index : 0, false, false);
                } else {
                    this.memberMasters = null;
                    this.memberMaster = null;
                    this.selectedSeqMembId = 0;
                    this.memberEligHistoryPersonsGridOptions.api.setRowData([]);
                    this.memberEligHistoryGridOptions.api.setRowData([]);
                    this.messageService.findByMessageId(14040).subscribe((message: MessageMasterDtl[]) => {
                        this.sharedService.showPopUp('notExist', '14040: ' + message[0].messageText, 'Member Eligibility History', 'OK');
                    });
                }
            },
            (error) => {
                this.memberMasters = null;
                this.memberMaster = null;
                this.selectedSeqMembId = 0;
                this.memberEligHistoryPersonsGridOptions.api.setRowData([]);
                this.memberEligHistoryGridOptions.api.setRowData([]);
            }
        );
    }

    onChangeMemberMasterGrid(event: any) {
        if (this.memberEligibilityHistoryForm.dirty && this.selectedSeqMembId !== event.api.getSelectedRows()[0].seqMembId) {
            this.messageService.findByMessageId(14400).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('popUpMessageName', 'Member Eligibility History', "14400: " + message[0].messageText, 'icon', [], MessageType.WARNING);
                popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
                popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.buttonclickEvent.subscribe((resp:any) => {
                    if (resp.name === 'OK') {
                        this.valueChanged = false;
                        this.updateMemberEligibilityHistory();
                        this.changeGridRow(event);
                    } else if (resp.name === 'Cancel') {
                        this.memberEligHistoryPersonsGridOptions.api.selectIndex(this.selectedRowIndex, false, false);
                    }
                });
            });
        } else {
            this.changeGridRow(event);
        }
    }

    changeGridRow(event: any) {
        var selectedRows = event.api.getSelectedRows();

        this.memberEligHistoryGridOptions.api.showLoadingOverlay();
        if (selectedRows.length === 1) {
            this.searchStatus = true;
            this.keyValues = selectedRows[0].subscriberId;
            this.selectedSeqMembId = selectedRows[0].seqMembId;
            this.selectedMemberMaster = selectedRows[0];
            this.getMemberEligibleHistoryByMemberMasterId(
                selectedRows[0].subscriberId,
                selectedRows[0].personNumber
            );
        } else {
            this.searchStatus = false;
            this.keyValues = '';
            this.selectedMemberMaster = null;
        }
        this.selectedRowIndex = this.memberMasters.findIndex((row: MemberMaster) => {
            return row.seqMembId == this.selectedSeqMembId;
        });
    }

    getMemberEligibleHistoryByMemberMasterId(subscriberId:any, personNumber:any) {
        this.memberEligHistories = [];
        let data: any = [];
        this.memberEligHistoryService.getMemberEligHistory(subscriberId, personNumber, true)
            .subscribe(
                (memberEligHistories: any) => {
                    if(memberEligHistories) {
                        this.memberEligHistories.push(memberEligHistories);
                        for (let item in this.memberEligHistories[0]) {
                            data.push(this.memberEligHistories[0][item])
                        }
                        let memEligHistoryIndex = 0;
                        let records = this.memberEligHistoryGridOptions.api.getSelectedRows();
                        if (records && records.length > 0) {
                            let rec = records[0];
                            let historyIndex = data.findIndex((d: any) => d.subscriberId === rec.subscriberId &&
                                d.personNumber === rec.personNumber);
                            if (historyIndex >= 0) {
                                memEligHistoryIndex = historyIndex;
                            }
                        }
                        this.memberEligHistoryGridOptions.api.setRowData(data);
                        this.memberEligHistoryGridOptions.api.selectIndex(memEligHistoryIndex, false, false);
                    } else {
                        this.memberEligHistoryGridOptions.api.setRowData([]);
                    }
                },
                (error) => {
                    this.memberEligHistoryGridOptions.api.setRowData([]);
                }
            );
    }

    onChangeMemberEligHistoryGrid() {
        var selectedRows = this.memberEligHistoryGridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            this.selectedMemberEligHistory = selectedRows[0];
            this.convertResultToMemberEligHistory(this.selectedMemberEligHistory);
            this.editElgStatus=true;
        } else {
            this.selectedMemberEligHistory = null;
            this.editElgStatus=false;
        }
    }

    onChangeEligStatus() {
        this.memberEligibilityHistoryForm.controls['eligSts'].valueChanges.subscribe((eligSts: string) => {
            if (eligSts) {
                this.memberEligibilityHistoryForm.patchValue({
                    dynamicText001: eligSts === 'Y' ? 'Eligible' : 'Suspended'
                })
            }
        });
    }

    clearForm(){
        let obj = {
             menu: {
                 menuItem: 'File'
             },
             action: 'Open'
         }
         this.onMenuItemClick(obj)
     }
     
    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event:any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewForm();
                    break;
                }
                case 'Open': {
                    if (this.memberEligibilityHistoryForm.dirty) {
                        this.saveMemberEligibilityHistory('Open');
                    } else {
                        this.memberEligHistoryPersonsGridOptions.api.setRowData([]);
                        this.memberEligHistoryGridOptions.api.setRowData([]);
                        this.isSubscriberDisabled = false;
                        this.selectedMemberMaster = null;
                        this.memberEligibilityHistoryForm.reset({emitEvent : false});
                        this.editElgStatus = false;
                    }
                    break;
                }
                case 'Save': {
                    this.saveMemberEligibilityHistory('Save');
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Exit': {
                    this.modalClose();
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
            // add method to handle Edit actions
            switch (event.action) {
                default:
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
            }
        } else if (event.menu.menuItem === 'Topic') {
            this.sharedService.onMemberModuleTopicMenuClick(
                event.action,
                "Eligibility History",
                this.activeModal,
                this.memberEligibilityHistoryForm.get('subscriberId').value ? this.memberEligibilityHistoryForm.get('subscriberId').value : '',
                this.selectedMemberMaster ? this.selectedMemberMaster.personNumber : ''
            );
        } else if (event.menu.menuItem === 'Special') {
            // handle File actions
            switch (event.action) {
                case 'Member Lookup': {
                    this.openLookupPage();
                    break;
                }

                case 'D/C Information': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DC_INFO);
                    if (status) {
                        if (this.searchStatus) {
                            this.toastService.showToast(
                                'This option is not implemented yet',
                                NgbToastType.Danger
                            );
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('7136: ' + message[0].messageText);
                            });
                        }

                    } else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                        });
                    }
                    break;
                }

                case 'View IPA Information': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VW_IPA_INFO);
                    if (!status) {
                        if (this.searchStatus) {
                            this.toastService.showToast(
                                'This option is not implemented yet',
                                NgbToastType.Danger
                            );
                        } else {
                            this.messageService.findByMessageId(14242).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('14242: ' + message[0].messageText);
                            });
                        }

                    } else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                        });
                    }

                    break;
                }
                default: {
                    this.toastService.showToast(
                        'Action is in progress',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        }  else if (event.menu.menuItem === 'Notes') {
            switch (event.action) {
                case 'Notes': {
                    if (this.seqSourceId == -1) {
                        this.messageService.findByMessageId(29005).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp('29005: ' + message[0].messageText, 'Member Master')
                        });
                    } else {
                        this.popUpNotesMenuClicked();
                    }
                }
            }
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case "Show Timestamp": {
                    this.showTimeStamp();
                    break;
                }
                case 'Audit Display': {

                    let status = this.functionalLevelSecurityService.isFunctionIdExist(
                        CONSTANTS.F_AUDIT,
                        this.winID
                    );
                    if (status) {
                        if (this.searchStatus) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: 'lg',
                            });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;

                        } else {
                            this.messageService
                                .findByMessageId(30164)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    this.alertMessage = this.alertMessageService.error(
                                        '30164: ' + message[0].messageText
                                    );
                                });
                        }
                    } else {
                        this.messageService
                            .findByMessageId(11073)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    '11073: ' + message[0].messageText
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
            this.toastService.showToast('Action is in progress', NgbToastType.Danger);
        }
    }

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Member Eligibility History";
        ref.componentInstance.insertDateTime = this.selectedMemberEligHistory.insertDatetime;
        ref.componentInstance.insertDateTime = this.selectedMemberEligHistory.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.selectedMemberEligHistory.insertProcess;
        ref.componentInstance.insertUser = this.selectedMemberEligHistory.insertUser;
        ref.componentInstance.updateUser = this.selectedMemberEligHistory.updateUser;
        ref.componentInstance.updateDateTime = this.selectedMemberEligHistory.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.selectedMemberEligHistory.updateProcess;
    };

    popUpNotesMenuClicked() {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Open' },
                    { name: 'Save', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() || this.secWin.hasUpdatePermission()))) },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu' },
                    { name: 'Shortcut Menu' },
                    { isHorizontal: true },
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
                    { name: 'Next' },
                    { name: 'Previous' },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Master File' },
                    { name: 'Eligibility History' },
                    { name: 'Coordination of Benefits' },
                    { name: 'Alias/Responsible Party/Privacy' },
                    { name: 'Member Address' },
                    { name: 'M+C Information' },
                    { name: 'Working Aged' },
                    { name: 'Billing Control' },
                    { name: 'Conditions' },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Member Lookup' },
                    { name: 'D/C Information' },
                    // { name: 'View IPA Information' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4' }],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' },
                    { name: 'Layer' },
                    { name: 'Cascade' },
                    { name: 'Arrange Icons' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp' },
                    { name: 'Audit Display' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 Member Eligibility History' },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
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

    openLookupPage() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.showIcon = true;
        this.searchModel.winId = this.windowId;
        this.searchModel.dwName = 'dw_membr_lookup';
        this.searchModel.isMatchAllContracts = true;
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                subscriberId: resp.subscriberId,
                diamondId: resp.diamondId,
            }, {emitEvent : false});
            this.selectedMember = resp.personNumber;
            this.getMemberMasterByDiamondIdAndSubscriberId();
            this.valueChanged=false;
        });
    }

    convertResultToMemberEligHistory(memberElibHistory: MemberEligHistory) {
        this.memberEligibilityHistoryForm.patchValue({
            subscriberId: memberElibHistory.subscriberId,
            effDate: memberElibHistory.effectiveDate
                ? this.dateFormatPipe.defaultDisplayDateFormat(
                    memberElibHistory.effectiveDate
                )
                : null,
            termDate: memberElibHistory.termDate
                ? (
                    this.dateFormatPipe.defaultDisplayDateFormat(
                        memberElibHistory.termDate
                    )
                )
                : null,
            termRsn: memberElibHistory.termReason,
            dateOfDeath: memberElibHistory.dateOfDeath
                ? this.dateFormatPipe.defaultDisplayDateFormat(
                    memberElibHistory.dateOfDeath
                )
                : null,
            eligSts: memberElibHistory.eligStatus,
            dynamicText001: memberElibHistory.eligStatus === 'Y' ? 'Eligible' : 'Suspended',
            relCode: memberElibHistory.relationshipCode,
            riderCode1: memberElibHistory.riderCode1,
            riderCode2: memberElibHistory.riderCode2,
            riderCode3: memberElibHistory.riderCode3,
            riderCode4: memberElibHistory.riderCode4,
            riderCode5: memberElibHistory.riderCode5,
            riderCode6: memberElibHistory.riderCode6,
            riderCode7: memberElibHistory.riderCode7,
            riderCode8: memberElibHistory.riderCode8,
            riderCode9: memberElibHistory.riderCode9,
            riderCode10: memberElibHistory.riderCode10,
            riderCode11: memberElibHistory.riderCode11,
            riderCode12: memberElibHistory.riderCode12,
            riderCode13: memberElibHistory.riderCode13,
            riderCode14: memberElibHistory.riderCode14,
            riderCode15: memberElibHistory.riderCode15,
            riderCode16: memberElibHistory.riderCode16,
            riderCode17: memberElibHistory.riderCode17,
            riderCode18: memberElibHistory.riderCode18,
            riderCode19: memberElibHistory.riderCode19,
            riderCode20: memberElibHistory.riderCode20,
            groupId: memberElibHistory.groupId,
            dynamicText002: memberElibHistory.groupShortName,
            planCode: memberElibHistory.planCode,
            lob: memberElibHistory.lineOfBusiness,
            panelId: memberElibHistory.panelId,
            ipa: memberElibHistory.ipaId,
            pcpId: memberElibHistory.pcpaaOccurred,
            pcpChngRsn: memberElibHistory.pcpChangeReason,
            prov2: memberElibHistory.pcpaaOccurred,
            rpt1: memberElibHistory.userDefined1,
            emirateArch: memberElibHistory.emirateArch,
            dept: memberElibHistory.subscDept,
            location: memberElibHistory.subscLocation,
            hireDate: memberElibHistory.hireDate
                ? this.dateFormatPipe.defaultDisplayDateFormat(
                    memberElibHistory.hireDate
                )
                : null,
            salary: memberElibHistory.salary,
            mCareSts: memberElibHistory.medicareStatusFlg,
            benStartDate: memberElibHistory.benefitStartDate
                ? this.dateFormatPipe.defaultDisplayDateFormat(
                    memberElibHistory.benefitStartDate
                )
                : null,
            otherSts: memberElibHistory.otherStatusFlag,
            pecWaived: memberElibHistory.pecWaived,
            pecEndDate: memberElibHistory.pecEndDate
                ? this.dateFormatPipe.defaultDisplayDateFormat(
                    memberElibHistory.pecEndDate
                )
                : null,
            reason: memberElibHistory.reasonCode,
            csInd: memberElibHistory.csIndicator,
            rateType: memberElibHistory.rateType,
            rpt2: memberElibHistory.userDefined2,
            rpt3: memberElibHistory.userDefined3,
            privacyOn: memberElibHistory.privacyOn,
            residenceProv: memberElibHistory.mcUserDefined1,
            workProv: memberElibHistory.mcUserDefined2,
            payrollProv: memberElibHistory.medRiskUserDefined1,
            taxExempt: memberElibHistory.medRiskUserDefined2,
            emirateCode: this.selectedMemberMaster.userDefined12
        }, {emitEvent : false});

        this.seqGroupId = memberElibHistory.seqGroupId;
        this.isFormDataModified();
        this.termReason = !memberElibHistory.termDate;
        if (memberElibHistory.subscLocation === 'ARE') {
            this.selectedEmirate = true;
        } else {
            this.selectedEmirate = false;
        }
        this.setSearchResults(memberElibHistory.groupId);
    }

    saveMemberEligibilityHistory(actionFrom: string) {
        // this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        //     let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Eligibility History', "29065: " + message[0].messageText, 'icon');
        //     popUpMessage.buttons = [
        //         new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
        //         new PopUpMessageButton('No', 'No', 'btn btn-primary'),
        //         new PopUpMessageButton('Cancel', 'Cancel', '')
        //     ];
        //     popUpMessage.messageType = MessageType.SUCCESS;
        //     let ref = this.sharedService.showDialogBox(popUpMessage);
        //     ref.buttonclickEvent.subscribe((event: any) => {
        //         if (event.name === 'Yes') {
        //             // save only if user presses Yes from Model
        if (this.editElgStatus) {
            this.updateMemberEligibilityHistory();
        } else {
            this.createMemberEligibilityHistory();
        }
        //         } else if (event.name === 'No') {
        //             this.router.navigateByUrl('/');
        //             if (this.closeStatus === true) {
        //                 this.activeModal.close()
        //             }
        //         } // 3rd case: In case of cancel do nothing
        //     });
        // });
    }

    convertFormToEntity() {
        let meh = new MemberEligHistory();
        meh.riderCode20 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode20'
        );
        meh.riderCode19 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode19'
        );
        meh.riderCode18 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode18'
        );
        meh.riderCode17 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode17'
        );
        meh.riderCode16 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode16'
        );
        meh.riderCode15 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode15'
        );
        meh.riderCode14 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode14'
        );
        meh.riderCode13 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode13'
        );
        meh.riderCode12 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode12'
        );
        meh.riderCode11 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode11'
        );
        meh.riderCode10 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode10'
        );
        meh.riderCode9 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode9'
        );
        meh.csIndicator = Form.getValue(this.memberEligibilityHistoryForm, 'csInd');
        meh.mcUserDefined2 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'workProv'
        );
        meh.mcUserDefined1 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'residenceProv'
        );
        meh.medRiskUserDefined2 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'taxExempt'
        );
        meh.medRiskUserDefined1 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'payrollProv'
        );
        meh.dateOfDeath = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'dateOfDeath'
        );
        let privacyOn = Form.getValue(
            this.memberEligibilityHistoryForm,
            'privacyOn'
        );
        if (privacyOn === true) {
            meh.pcpaaOccurred = 'Y';
            meh.privacyOn = 'Y';
        } else {
            meh.pcpaaOccurred = 'N';
            meh.privacyOn = 'N';
        }
        meh.rateType = Form.getValue(this.memberEligibilityHistoryForm, 'rateType');
        meh.userDefined3 = Form.getValue(this.memberEligibilityHistoryForm, 'rpt3');
        meh.userDefined2 = Form.getValue(this.memberEligibilityHistoryForm, 'rpt2');
        meh.benefitStartDate = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'benStartDate'
        );
        meh.subscLocation = Form.getValue(
            this.memberEligibilityHistoryForm,
            'location'
        );
        meh.subscDept = Form.getValue(this.memberEligibilityHistoryForm, 'dept');
        let pecWaived = Form.getValue(
            this.memberEligibilityHistoryForm,
            'pecWaived'
        );
        if (pecWaived === true) {
            meh.pecWaived = 'Y';
        } else {
            meh.pecWaived = 'N';
        }
        meh.reasonCode = Form.getValue(this.memberEligibilityHistoryForm, 'reason');
        meh.pecEndDate = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'pecEndDate'
        );

        let sal = Form.getValue(this.memberEligibilityHistoryForm, 'salary');
        if (sal) {
            meh.salary = sal.toString().replaceAll(',', '').replaceAll('$', '');
        }
        meh.panelId = Form.getValue(this.memberEligibilityHistoryForm, 'panelId');
        meh.ipaId = Form.getValue(this.memberEligibilityHistoryForm, 'ipa');
        // meh.seqProvId = Form.getValue(this.memberEligibilityHistoryForm, 'pcpId');
        meh.pcpChangeReason = Form.getValue(
            this.memberEligibilityHistoryForm,
            'pcpChngRsn'
        );
        // meh.seqProv2Id = Form.getValue(this.memberEligibilityHistoryForm, 'prov2');
        meh.userDefined1 = Form.getValue(this.memberEligibilityHistoryForm, 'rpt1');
        meh.emirateArch = Form.getValue(
            this.memberEligibilityHistoryForm,
            'emirateArch'
        );
        meh.eligStatus = Form.getValue(
            this.memberEligibilityHistoryForm,
            'eligSts'
        );
        meh.hireDate = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'hireDate'
        );
        meh.otherStatusFlag = Form.getValue(
            this.memberEligibilityHistoryForm,
            'otherSts'
        );
        meh.emirateCode = Form.getValue(
            this.memberEligibilityHistoryForm,
            'emirateCode'
        );
        meh.medicareStatusFlg = Form.getValue(
            this.memberEligibilityHistoryForm,
            'mCareSts'
        );
        meh.riderCode8 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode8'
        );
        meh.riderCode7 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode7'
        );
        meh.riderCode6 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode6'
        );
        meh.riderCode5 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode5'
        );
        meh.riderCode4 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode4'
        );
        meh.riderCode3 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode3'
        );
        meh.riderCode2 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode2'
        );
        meh.riderCode1 = Form.getValue(
            this.memberEligibilityHistoryForm,
            'riderCode1'
        );
        meh.lineOfBusiness = Form.getValue(
            this.memberEligibilityHistoryForm,
            'lob'
        );
        meh.planCode = Form.getValue(this.memberEligibilityHistoryForm, 'planCode');
        meh.seqGroupId = this.seqGroupId;
        meh.relationshipCode = Form.getValue(
            this.memberEligibilityHistoryForm,
            'relCode'
        );
        meh.termReason = Form.getValue(
            this.memberEligibilityHistoryForm,
            'termRsn'
        );
        meh.termDate = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'termDate'
        );
        meh.effectiveDate = Form.getDatePickerValue(
            this.memberEligibilityHistoryForm,
            'effDate'
        );
        meh.subscriberId = this.selectedMemberMaster.subscriberId;
        meh.seqSubsId = this.selectedMemberMaster.seqSubsId;
        meh.personNumber = this.selectedMemberMaster.personNumber;
        if (this.selectedMemberMaster) {
            meh.memberEligHistoryPrimaryKey = { seqMembId: null, seqEligHist: null };
            meh.memberEligHistoryPrimaryKey.seqMembId = this.selectedMemberMaster.seqMembId;
            if (this.selectedMemberEligHistory) {
                meh.memberEligHistoryPrimaryKey.seqEligHist = this.selectedMemberEligHistory.memberEligHistoryPrimaryKey.seqEligHist;
                meh.seqEligHist = this.selectedMemberEligHistory.memberEligHistoryPrimaryKey.seqEligHist;
            }
        }
        return meh;
    }

    createMemberEligibilityHistory() {
        let riderCodeList = ["riderCode1","riderCode2","riderCode3","riderCode4","riderCode5","riderCode6","riderCode7",
            "riderCode8","riderCode9","riderCode10","riderCode11","riderCode12","riderCode13","riderCode14",
            "riderCode15","riderCode16","riderCode17","riderCode18","riderCode19","riderCode20"];
        for (let riderCode of riderCodeList) {
            let riderCodeValue = this.memberEligibilityHistoryForm.controls[riderCode].value;
            if (riderCodeValue && riderCodeValue != 'null') {
                let isRiderCodeAvailable = this.riderCodes.find(riderCode => riderCode.PLAN_RIDER_CODE == riderCodeValue);
                if (!isRiderCodeAvailable) {
                    this.messageService.findByMessageId(14337).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUps("14337: " + message[0].messageText.replace("@1", riderCodeValue), "Member Eligibility History","OK");
                    });
                    return;
                }
            }
        }

        let planCodeValue = this.memberEligibilityHistoryForm.controls['planCode'].value;
        if (planCodeValue && planCodeValue != 'null') {
            let isPlanCodeValueAvailable = this.planCodes.find(planCode => planCode.PLAN_RIDER_CODE == planCodeValue);
            if (!isPlanCodeValueAvailable) {
                this.messageService.findByMessageId(14239).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUps("14239: " + message[0].messageText, "Member Eligibility History","OK");
                });
                return;
            }
        }

        this.formValidation.validateForm();
        if (this.memberEligibilityHistoryForm.valid) {
            let memberEligHistory = this.convertFormToEntity();
            this.auditService.setAuditFields(memberEligHistory, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            for (let key in memberEligHistory) { if (!memberEligHistory[key]) { memberEligHistory[key] = null; } }
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory)
                .subscribe(
                    (response) => {
                        this.valueChanged = false;
                        this.toastService.showToast('Record successfully created', NgbToastType.Success);
                        this.getMemberEligibleHistoryByMemberMasterId(
                            this.selectedMemberMaster.subscriberId,
                            this.selectedMemberMaster.personNumber
                        );
                        this.setEmirateCodeValueInGrid(memberEligHistory);
                    }
                );
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000);
            }
            this.popupClose = false;
        } else {
            this.toastService.showToast(
                'Required information is missing or incomplete. Please correct your entries and try again.',
                NgbToastType.Danger
            );
        }
    }

    updateMemberEligibilityHistory() {
        let riderCodeList = ["riderCode1","riderCode2","riderCode3","riderCode4","riderCode5","riderCode6","riderCode7",
            "riderCode8","riderCode9","riderCode10","riderCode11","riderCode12","riderCode13","riderCode14",
            "riderCode15","riderCode16","riderCode17","riderCode18","riderCode19","riderCode20"];
        for (let riderCode of riderCodeList) {
            let riderCodeValue = this.memberEligibilityHistoryForm.controls[riderCode].value;
            if (riderCodeValue && riderCodeValue != 'null') {
                let isRiderCodeAvailable = this.riderCodes.find(riderCode => riderCode.PLAN_RIDER_CODE == riderCodeValue);
                if (!isRiderCodeAvailable) {
                    this.messageService.findByMessageId(14337).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUps("14337: " + message[0].messageText.replace("@1", riderCodeValue), "Member Eligibility History","OK");
                    });
                    return;
                }
            }
        }

        let planCodeValue = this.memberEligibilityHistoryForm.controls['planCode'].value;
        if (planCodeValue && planCodeValue != 'null') {
            let isPlanCodeValueAvailable = this.planCodes.find(planCode => planCode.PLAN_RIDER_CODE == planCodeValue);
            if (!isPlanCodeValueAvailable) {
                this.messageService.findByMessageId(14239).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUps("14239: " + message[0].messageText, "Member Eligibility History","OK");
                });
                return;
            }
        }

        this.formValidation.validateForm();
        if (this.memberEligibilityHistoryForm.valid) {
            let meh = this.convertFormToEntity();
            this.auditService.setAuditFields(meh, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            for (let key in meh) { if (!meh[key]) { meh[key] = null; } }
            this.memberEligHistoryService.updateMemberEligHistory(
                meh,
                meh.memberEligHistoryPrimaryKey.seqEligHist,
                meh.memberEligHistoryPrimaryKey.seqMembId
            ).subscribe((response) => {
                    this.valueChanged = false;
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.getMemberEligibleHistoryByMemberMasterId(
                        this.selectedMemberMaster.subscriberId,
                        this.selectedMemberMaster.personNumber
                    );
                    this.memberEligibilityHistoryForm.markAsPristine();
                    this.setEmirateCodeValueInGrid(meh);
                }, (error) => {
                    this.memberEligHistoryPersonsGridOptions.api.selectIndex(this.selectedRowIndex, false, false);
                }
            );
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close();
                }, 2000)
            }
            this.popupClose = false;
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
            this.memberEligHistoryPersonsGridOptions.api.selectIndex(this.selectedRowIndex, false, false);
        }
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupPage();
            this.valueChanged = false;
        } else if (event.target.value && event.key === 'Tab') {
            event.preventDefault();
            this.selectedSeqMembId = 0;
            this.memberEligibilityHistoryForm.markAsPristine();
            this.getMemberMasterByDiamondIdAndSubscriberId();
            this.valueChanged = false;
        } else if (event.key === 'Tab') {
            this.messageService.findByMessageId(14041).subscribe((message: MessageMasterDtl[]) => {
                this.sharedService.showPopUp('idRequired', '14041: ' + message[0].messageText, 'Member Eligibility History', 'OK');
            });
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                subscriberId: res.subscriberId,
            });
        });
    }

    onLookupFieldChangeGroupId(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldGroupIdSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.groupMasterService.getGroupMasterByGroupId(event.target.value)
                .subscribe(res => {
                    this.seqGroupId = res.seqGroupId;
            });
        }
        this.setSearchResults(event.target.value);
    }

    /**
     * Generic Search Model
     */
    openLookupFieldGroupIdSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.groupSearchModel;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                groupId: res.groupId,
            });
            this.seqGroupId = res.seqGroupId;
            this.groupIdInput = true;
        });
    }

    onLookupFieldPlanCode(event :any, value:any, field:any, type:any) {
        this.lookupField = field;
        if (event.key === 'Tab' && event.target.value) {
            let planCodeValue = event.target.value;
            if (planCodeValue && planCodeValue != 'null') {
                if (type == 'P') {
                    let isPlanCodeValueAvailable = this.planCodes.find(planCode => planCode.PLAN_RIDER_CODE == planCodeValue);
                    if (!isPlanCodeValueAvailable) {
                        this.messageService.findByMessageId(14239).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUps("14239: " + message[0].messageText, "Member Eligibility History","OK");
                            this.memberEligibilityHistoryForm.controls[value].reset();
                            let inputText: string = '#' + value;
                            const element = this.renderer.selectRootElement(inputText);
                            element.focus();
                        });
                        return;
                    }
                } else {
                    let isRiderCodeValueAvailable = this.riderCodes.find(riderCode => riderCode.PLAN_RIDER_CODE == planCodeValue);
                    if (!isRiderCodeValueAvailable) {
                        this.messageService.findByMessageId(14337).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUps("14337: " + message[0].messageText.replace('@1', planCodeValue), "Member Eligibility History","OK");
                            this.memberEligibilityHistoryForm.controls[value].reset();
                            let inputText: string = '#' + value;
                            const element = this.renderer.selectRootElement(inputText);
                            element.focus();
                        });
                        return;
                    }
                }
            }
        } else if (event.key === 'F5') {
            let groupId = this.memberEligibilityHistoryForm.get('groupId').value;
            if (groupId != null && groupId != undefined && groupId) {
                event.preventDefault();
                this.openPlancodeLookupFieldSearchModel(value, type);
            } else {
                this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUps("29032: " + message[0].messageText.replace("@1", 'group_id'), "Vendor Credit");
                });
            }
        }
    }

    openPlancodeLookupFieldSearchModel(value:any, type:any) {
        let groupId = this.memberEligibilityHistoryForm.get('groupId').value;
        let ref = this.modalService.open(SearchboxComponent);
        this.planCodeModel.searchOption = [{ SEQ_GROUP_ID: groupId, RECORD_TYPE: type }];
        this.planCodeModel.isMatchAllContracts = false;
        ref.componentInstance.searchModel = this.planCodeModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.PLAN_RIDER_CODE) {
                this.memberEligibilityHistoryForm.get(value).setValue(res.PLAN_RIDER_CODE);
                this.memberEligibilityHistoryForm.markAsDirty();
            }
        });
    }

    onLookupFieldChangeReasonCode(event:any) {
        if  (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldReasonCodeSearchModel();
        }
    }


    openLookupFieldReasonCodeSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.reasonCodeModel;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                reason: res['REASON_CODE']
            });
            this.popupClose = true;
        })
    }

    onLookupFieldChangeRateType(event:any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldRateTypeModel();
        }
    }

    openLookupFieldRateTypeModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        this.rateTypeModel.isMatchAllContracts = true;
        ref.componentInstance.searchModel = this.rateTypeModel;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                rateType: res['SYSTEM_CODE']
            });
            this.popupClose = true;
        });
    }

    onTermDateChange = (event:any) => {
        this.termReason = !!event.dateRange;
        this.cdr.detectChanges();
    };

    onLookupFieldChangeTermReason(event:any) {
        if  (this.termReason === true && event.key === 'F5') {
            event.preventDefault();
        }
        if  (this.termReason === false && event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldTermReasonModel();
        }
    }

    openLookupFieldTermReasonModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.reasonCodeModel;
        ref.componentInstance.termReason = this.termReason;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                termRsn: res['REASON_CODE']
            });
            this.popupClose = true;
        })
    }

    groupIdValid = (event:any) => {
        if (event.target.value === '') {
            this.groupIdInput = false;
            this.groupIdValidModal();
        }
        else {
            this.groupMasterService.getGroupMasterByGroupId(event.target.value)
                .subscribe(res => {
                    this.seqGroupId = res.seqGroupId;
                });
            this.groupIdInput = true;
        }
    };

    groupIdValidModal = () => {
        this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('popUpMessageName', 'Users', "29032: " + message[0].messageText.replace('@1', 'Group Id'), 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
        });
    };

    showRiderPopUp(message: string, title: string, button = 'Cancel') {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title,
            message,
            'icon'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton(button, button, 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    showPopUps(message: string, title: string, button: string = "Cancel") {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title,
            message,
            'icon'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton(button, button, 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    getRelationshipCodes() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.RELATIONSHIP_CODE,
                CONSTANTS.DW_MELIG_DE
            )
            .subscribe(
                (codes) => {
                    this.relationshipCodes = codes;
                }
            );
    }

    getCountries() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_MELIGLOC, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            systemCodes.sort((a, b) => (a.systemCodeDesc2 > b.systemCodeDesc2) ? 1 : ((b.systemCodeDesc2 > a.systemCodeDesc2) ? -1 : 0));
            this.countries = systemCodes;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }
    onLookupFieldDept = (event:any) => {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldDeptSearchModel();
        }
    };

    openLookupFieldDeptSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.searchModel = this.deptSearchModel;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberEligibilityHistoryForm.patchValue({
                dept: res.SYSTEM_CODE,
            });
            this.groupIdInput = true;
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.valueChanged===true) {
            this.popupAlert();
        } else if (this.valueChanged === true && this.popupClose === true) {
            this.saveMemberEligibilityHistory('Close')
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = () => {
        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Eligibility History', "29065: " + message[0].messageText, 'icon');
            popUpMessage.buttons = [
                new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                new PopUpMessageButton('Cancel', 'Cancel', '')
            ];
            popUpMessage.messageType = MessageType.SUCCESS;
            let ref = this.sharedService.showDialogBox(popUpMessage);
            ref.buttonclickEvent.subscribe((event: any) => {
                if (event.name === 'Yes') {
                    // save only if user presses Yes from Model
                    if (this.editElgStatus) {
                        this.updateMemberEligibilityHistory();
                    } else {
                        this.createMemberEligibilityHistory();
                    }
                } else if (event.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.closeStatus === true) {
                        this.activeModal.close()
                    }
                } // 3rd case: In case of cancel do nothing
            });
        });
    };

    isFormDataModified() {
        this.memberEligibilityHistoryForm.valueChanges.subscribe(res => {
            this.popupClose = true;
        })
    }

    emirateLocation = (event:any) => {
        let systemCode = event.target.value;
        this.selectedEmirate = systemCode === 'ARE';
    };

    private setEmirateCodeValueInGrid(memberEligHistory: MemberEligHistory) {
        let memberMasterIndex = this.memberMasters.findIndex(f => f.seqMembId === memberEligHistory.memberEligHistoryPrimaryKey.seqMembId)
        this.memberMasters[memberMasterIndex].userDefined12 = memberEligHistory.emirateCode;
        this.memberEligHistoryPersonsGridOptions.api.setRowData(this.memberMasters);
        this.memberEligHistoryPersonsGridOptions.api.selectIndex(this.selectedRowIndex, false, false);
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/MELIG_Member_Eligibility.htm';
    }
}
