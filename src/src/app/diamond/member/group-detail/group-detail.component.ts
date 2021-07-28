/* Copyright (c) 2020 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {DatePickerConfig, datePickerModel, NGBModalOptions} from '../../../shared/config';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {CONSTANTS, getGroupDetailShortcutKeys} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Menu, OPERATIONS, SearchModel} from "../../../shared/models/models";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {GroupMasterLookup} from "../../../shared/lookup/group-master-lookup";
import {Router} from "@angular/router";
import {
    BenefitPackageMasterService,
    CompanyMasterService,
    DddwDtlService,
    GeneralLedgerReferenceService,
    GroupMasterService,
    MessageMasterDtlService,
    PlanMasterService,
    PremiumMasterService,
    ReasonCodeMasterService,
    RegionMasterService,
    RiderMasterService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import {
    BenefitPackageMaster,
    CompanyMaster,
    DddwDtl,
    GeneralLedgerReference,
    GroupMaster,
    MessageMasterDtl, PlanMaster,
    PremiumMaster, ReasonCodeMaster,
    RiderMaster,
    SecUser,
    SecWin,
    SystemCodes
} from '../../../api-models';
import {LineOfBusinessMasterService} from '../../../api-services/line-of-business-master.service';
import {LineOfBusinessMaster} from '../../../api-models/line-of-business-master.model';
import {Form} from '../../../shared/helpers/form.helper';
import {PriceRuleMaster} from "../../../api-models/price-rule-master.model";
import {PriceScheduleMaster} from "../../../api-models/price-schedule-master.model";
import {PriceRuleMasterService} from "../../../api-services/price-rule-master.service";
import {PriceScheduleMasterService} from "../../../api-services/price-schedule-master.service";
import {GroupMasterComponent} from '../group-master/group-master.component';
import {GroupBillingComponent} from '../group-billing/group-billing.component';
import {GroupContractComponent} from '../group-contract/group-contract.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {NgxSpinnerService} from "ngx-spinner";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {GROUP_DETAIL_MODULE_ID} from "../../../shared/app-constants";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {AddonControllerComponent} from '../../addon/addon-controller/addon-controller.component';
import {HelpComponent} from "../help/help.component";
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {GroupPanelComponent} from '../group-panel/group-panel.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";
import {MenuService} from '../../../shared/services/menu.service';
import {MenuResponse} from '../../../api-models/menu-response';
import {AuthenticationService} from "../../../api-services/authentication.service";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the GroupDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'groupdetail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.scss'],
    providers: [RiderMasterService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService
    ]
})
export class GroupDetailComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    groupDetailForm: FormGroup;
    groupDetailIdForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    datePickerConfig = DatePickerConfig;
    datePickerModel = datePickerModel;
    groupDetailFormData: any = [];
    priceRules: PriceRuleMaster[] = [];
    priceSchedules: PriceScheduleMaster[] = [];
    dataGridGridOptions: GridOptions;
    dataGridgridApi: any;
    groupMasterExists = false;
    @Input() showIcon: boolean = false;
    @Input() tabComponent: any;
    @Input() currentComponent: any;
    public seqSourceId: number = -1;
    dataGridgridColumnApi: any;
    menu: Menu[] = [];
    GeoRegion: any;
    currentValid: Boolean = true;
    PlanCode: any;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    searchModel = new SearchModel('groupmasters/lookup',
        GroupMasterLookup.GROUP_MASTER_ALL,
        GroupMasterLookup.GROUP_MASTER_DEFAULT,
        []);
    planCode: any;
    riderMasters: RiderMaster[];
    premiumMasters: PremiumMaster[] = [];
    premiumMaster: PremiumMaster;
    companyMasters: CompanyMaster[] = [];
    systemCodes: SystemCodes[] = [];
    systemCodes2: SystemCodes[] = [];
    dddwDtls: DddwDtl[] = [];
    dddwDtls2: DddwDtl[] = [];
    dddwDtls3: DddwDtl[] = [];
    dddwDtls4: DddwDtl[] = [];
    dddwDtls5: DddwDtl[] = [];
    dddwDtls6: DddwDtl[] = [];
    dddwDtls7: DddwDtl[] = [];
    reasonCodes: any[] = [];
    showPlan: Boolean = false;
    benefitPackageMasters: BenefitPackageMaster[] = [];
    lineOfBusinessMasters: LineOfBusinessMaster[] = [];
    // Use constructor injection to inject an instance of a FormBuilder
    @Input() groupId: any;
    seqGroupId: any = null;
    editGroupDetials: any;
    ShortName: any = "";
    idEntered: any;
    showDetForm: boolean;
    seqPremId: any;
    copyGeneralRef: GeneralLedgerReference[] = [];
    generalRef: GeneralLedgerReference[] = [];
    @ViewChild('fieldForm') form: any;
    @ViewChild('rctType') rctTypeElement: ElementRef;

    secWin: SecWinViewModel;
    windowId = 'GRUPD';
    userTemplateId: string;
    memberModuleId = GROUP_DETAIL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;

    searchStatus: boolean = false;
    screenCloseRequested: Boolean = false;
    valuechanged: Boolean = false;
    gLevel: string;
    rcTypeStatus: boolean = false;
    groupMaster: GroupMaster[];

    selectedPlanCode: any = null;
    selectedRiderCode: any = null;
    selectedPbCompCode: any = null;
    selectedPbGlRef: any = null;
    selectedBenefitPkg: any = null;
    selectedLob: any = null;
    selectedGroupReq: any = null;
    filteredPlanCode = new Array<PlanMaster>();
    filteredRiderCode = new Array<RiderMaster>();
    filteredCompanyMasters = new Array<CompanyMaster>();
    filteredGeneralRef = new Array<GeneralLedgerReference>();
    filteredBenefitPkg = new Array<BenefitPackageMaster>();
    filteredLob = new Array<LineOfBusinessMaster>();
    filteredGroupReq = new Array<DddwDtl>()
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private datePipe: DatePipe,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private premiumMasterService: PremiumMasterService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private companyMasterService: CompanyMasterService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private benefitPackageMasterService: BenefitPackageMasterService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private groupMasterService: GroupMasterService,
        private PlanMasterService: PlanMasterService,
        private riderMasterService: RiderMasterService,
        private GeneralLedgerReferenceService: GeneralLedgerReferenceService,
        private priceRuleMasterService: PriceRuleMasterService,
        private priceScheduleMasterService: PriceScheduleMasterService,
        private RegionMasterService: RegionMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private alertMessageService: AlertMessageService,
        private spinner: NgxSpinnerService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private auditService: AuditService,
        private menuService: MenuService,
        private authenticationService: AuthenticationService,
    ) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === 'F6') {
            if (this.gLevel == "1") {
                let ref = this.modalService.open(AddonControllerComponent);
                ref.componentInstance.groupNumber = this.groupId;
                ref.componentInstance.seqGroupId = this.seqGroupId;
                ref.componentInstance.groupName = this.ShortName;
            } else {
                this.messageService
                    .findByMessageId(13062)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(message[0].messageText, "Group Detail");
                    });
            }

        }
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.createDataGrid();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupDetailForm);
        this.hasPermission();
    }
    initializeComponentState() {
        this.showDetForm = false;
        this.menuInit();
        setTimeout(() => {
            this.getGroupTypes();
            this.getCompanyMasters();
            this.getPlanCode();
            this.getRiderMasters();
            //this.getGroupDetails();
            this.getClaimFillingSystemCode();
            this.getBenefitPackageMasters();
            this.getLineOfBusinessMasters();
            this.getProfCOBCalc();
            this.getDependentDeterminationRule();
            this.getDentalCobCalc();
            this.getPaymentPolicy();
            this.getGroupReq();
            this.getExcludeCapitatedClaims();
            this.getReasonCodeMasters();
            this.getExclusionType();
            this.getGeneral();
            this.getPriceRules();
            this.getPriceSchedules();
            this.GetGeoRegion();
            if (!this.groupId) {
            this.dataGridGridOptions.api.setRowData([]);
            }
        }, 1000);
        if (this.groupId) {
            this.groupDetailIdForm.patchValue({
                groupId: this.groupId
            }, { emitEvent: false });
            this.groupDetailForm.patchValue({ seqGroupId: this.groupId }, { emitEvent: false });
            this.getGroupDetialByGroupId(this.groupId);
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

                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuService.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End

                    this.initializeComponentState();
                    this.secProgress = false;
                    //Check Menus Privilege Start


                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Group Detail',
                        'Group Detail Permission'
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
        this.secColDetailService.findByTableNameAndUserId('PREMIUM_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }
    getRiderMasters() {
        this.riderMasterService.getRiderMasters().subscribe(riderMasters => {
            this.riderMasters = riderMasters;
            this.filteredRiderCode = riderMasters;
        });
    }
    ngAfterViewInit(): void {
        this.shortcuts.push(...getGroupDetailShortcutKeys(this));
        this.cdr.detectChanges();
    }
    openAddons() {
        if (this.gLevel == "1") {
            const ref = this.modalService.open(
                AddonControllerComponent,
                {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                }
            );
            ref.componentInstance.showIcon = true;
            ref.componentInstance.activeTab = 1;
            ref.componentInstance.seqGroupId = this.seqGroupId;
            ref.componentInstance.groupNumber = this.groupId;
            ref.componentInstance.groupName = this.ShortName;
        } else {
            this.messageService
                .findByMessageId(13062)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        message[0].messageText,
                        "Group Detail"
                    );
                });
        }
    }
    getPriceRules() {
        this.priceRuleMasterService.getPriceRuleMasters().subscribe(priceRules => {
            this.priceRules = priceRules;
        });
    }
    getPriceSchedules() {
        this.priceScheduleMasterService.getPriceScheduleMasters().subscribe(priceSchedules => {
            this.priceSchedules = priceSchedules;
        });
    }
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl+M', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                { name: 'Open', shortcutKey: 'Ctrl+O' },
                { name: 'Save', shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() || (this.editGroupDetials && this.secWin.hasUpdatePermission())))) },
                { name: 'Close', shortcutKey: 'Ctrl+F4' },
                { isHorizontal: true }, { name: 'Main Menu...', shortcutKey: 'F2' },
                { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                { isHorizontal: true }, { name: 'Print', disabled: true }, { isHorizontal: true }, { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' }, { isHorizontal: true },
                { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                { name: 'Paste', disabled: true, shortcutKey: 'Ctrl+V' }, { isHorizontal: true },
                { name: 'Next', shortcutKey: 'F8' }, { name: 'Previous', shortcutKey: 'F7' }, { isHorizontal: true },
                { name: 'Lookup', shortcutKey: 'F5' }, { name: 'Sort by Sequence', disabled: true }, {
                    name: 'Sort by Panel ID',
                    disabled: true
                }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Master File' }, { name: 'Detail' }, { name: 'Contracts' }, { name: 'Panel' },
                    { name: 'Billing Control' }
                ]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'Group Lookup' }, {
                    name: 'D/C Information'
                }, { name: 'Copy Group Detail' }]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4' }
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' }, {
                        name: 'Audit Display',
                        shortcutKey: 'Shift+Alt+A'
                    }, { isHorizontal: true }, { name: '1 Main Menu' }, { name: '2 Group Detail' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {             // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewGroupDetial();
                    break;
                }
                case "Open": {
                    this.resetAllState();
                    break;
                }
                case "Save": {
                    this.saveGroupDetail(true);
                    break;
                }
                case "Close": {
                    this.modalClose();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Special') {             // handle File actions
            switch (event.action) {
                case 'Group Lookup': {
                    this.openLookupPage();
                    break;
                }

                case 'D/C Information': {
                    this.openDCInformation();
                    break;
                }

                case 'Copy Group Detail': {
                    this.openCopyGroupDetail();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is in progress', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Notes') {
            if (this.seqSourceId == -1) {
                this.messageService.findByMessageId(29005).subscribe(res => {
                    this.showPopUp('29005: '+ res[0].messageText, 'DIAMOND@ Client/Server System')
                })
            } else {
                this.popUpNotesMenuClicked();
            }
            
        }
        else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.groupDetailIdForm.get('groupId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
                case 'Audit Display': {
                    this.toastService.showToast('Action was not implemented', NgbToastType.Danger);
                    break;
                }
                default:
                    break;
            }
        } else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
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

    popUpNotesMenuClicked() {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqGroupId;
    }
    handleCopyGroupDetail() {
        let formVal = this.groupDetailForm.value;
        this.dataGridGridOptions.api.deselectAll();
        setTimeout(() => {
            this.editGroupDetials = false;
            this.valuechanged = true;
            this.premiumMaster = null;
            this.groupDetailForm.patchValue(formVal);
            this.groupDetailForm.patchValue({
                endDate: null
            });
        }, 100);
    }

    public addPrefixZero(value: any) {
        return (value < 10) ? ('0' + value) : value;
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleTopicMenu(action: string) {
        switch (action) {
            case "Master File": {
                let ref = this.modalService.open(GroupMasterComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
                this.activeModal.close();
                break;
            }
            case "Contracts": {
                let ref = this.modalService.open(GroupContractComponent, { size: <any>'xl' });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
                this.activeModal.close();
                break;
            }
            case "Billing Control": {
                let ref = this.modalService.open(GroupBillingComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
                this.activeModal.close();
                break;
            }
            case 'Detail': {
                let ref = this.modalService.open(GroupDetailComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
                this.activeModal.close();
                break;
            }
            case "Panel": {
                let ref = this.modalService.open(GroupPanelComponent);
                ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
                ref.componentInstance.showIcon = true;
                this.activeModal.close();
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                this.activeModal.close();
                break;
            }
        }
    }

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            // TODO got GroupMaster response in `resp` field
            // TODO need to update in form
            /*this.groupMaster = resp;
            this.showGroupField = true;
            this.populateContactPersonGrid();
            this.convertResultToGroupMaster(this.groupMaster);*/
        })
    }

    popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button Yes has been click!');
        }
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

    dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Type',
                field: 'recordType',
                width: 100,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Plan/Rider Code',
                field: 'planRiderCode',
                width: 180
            },
            {
                headerName: 'Eff Date',
                field: 'effectiveDate',
                width: 130
            },
            {
                headerName: 'End Date',
                field: 'endDate',
                width: 130
            },
            {
                headerName: 'Benefit Package',
                field: 'benefitPackageId',
                width: 180
            },
            {
                headerName: 'LOB',
                field: 'lineOfBusiness',
                width: 100
            }
        ];
    }

    get formControls() {
        return this.groupDetailForm.controls;
    }



    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        this.groupDetailIdForm = this.formBuilder.group({
            groupId: ['', { updateOn: 'blur', validators: [] }],
        });
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupDetailForm = this.formBuilder.group({
            groupId: ['', { updateOn: 'blur', validators: [] }],
            dynamicText: ['', { updateOn: 'blur', validators: [] }],
            rctType: ['', { updateOn: 'blur', validators: [Validators.required] }],
            rctTypeCode: [''],
            planrider: ['', { updateOn: 'blur', validators: [Validators.required] }],
            effDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            endDate: ['', { updateOn: 'blur', validators: [] }],
            pbCompcode: ['', { updateOn: 'blur', validators: [Validators.required] }],
            pbGlref: ['', { updateOn: 'blur', validators: [Validators.required] }],
            benefitPkg: ['', { updateOn: 'blur', validators: [Validators.required] }],
            lob: ['', { updateOn: 'blur', validators: [Validators.required] }],
            profCobCalc: ['', { updateOn: 'blur', validators: [] }],
            instCobCalc: ['', { updateOn: 'blur', validators: [] }],
            dependentDeterminationRule: ['', { updateOn: 'blur', validators: [] }],
            dentlCobCalc: ['', { updateOn: 'blur', validators: [] }],
            paymentPolicy: ['', { updateOn: 'blur', validators: [] }],
            excludeCapitatedClaims: ['', { updateOn: 'blur', validators: [] }],
            priceRule1: ['', { updateOn: 'blur', validators: [] }],
            priceSchedule1: ['', { updateOn: 'blur', validators: [] }],
            pctBilled: ['', { updateOn: 'blur', validators: [] }],
            groupReq: ['', { updateOn: 'blur', validators: [Validators.required] }],
            priceSchedule2: ['', { updateOn: 'blur', validators: [] }],
            pctAllwd: ['', { updateOn: 'blur', validators: [] }],
            exclusionType: ['', { updateOn: 'blur', validators: [] }],
            reason: ['', { updateOn: 'blur', validators: [] }],
            exclusionPeriod: ['', { updateOn: 'blur', validators: [] }],
            excludeCapitatedClaimLines: ['', { updateOn: 'blur', validators: [] }],
            specialProcessing: ['', { updateOn: 'blur', validators: [] }],
            applyPcp: ['', { updateOn: 'blur', validators: [] }],
            geographicRegion: ['', { updateOn: 'blur', validators: [] }],
            claimFilingIndicator: ['', { updateOn: 'blur', validators: [Validators.required] }],
            tieringMethod: ['', { validators: [] }],
            adminFee: ['', { validators: [] }],
            acrossTheBoard: ['', { validators: [] }],
            rate1: ['', { validators: [] }],
            adminCompcode: ['', { validators: [] }],
            rate2: ['', { validators: [] }],
            adminGlref: ['', { validators: [] }],
            rate3: ['', { validators: [] }],
            adminFeeLevel: ['', { validators: [] }],
            rate4: ['', { validators: [] }],
            matrixDef: ['', { validators: [] }],
            rate5: ['', { validators: [] }],
            pctOfMatrix: ['', { validators: [] }],
            commissionMatrixDef: ['', { validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onLookupFieldChange(event: any) {
        this.groupMasterExists = false;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            if (event.target.value !== '') {
                this.onChangeGroupId(event)
            } else {
                this.messageService.findByMessageId(13106).subscribe(res => {
                    this.showPopUp('13106: ' + res[0].messageText, 'Group')
                })
            }
        }
    }

    resetAllState() {
        if (this.valuechanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Group Detail', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveGroupDetail();
                            setTimeout(() => {
                                this.resetScreen();
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.resetScreen();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.resetScreen();
        }
    }

    /**
     * Generic Search Model
     */
    createNewGroupDetial() {
        if (this.isSuperUser) {
            this.createGrpDetail();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.createGrpDetail();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Group Detail')
                });
            }
        }
    }


    createGrpDetail() {
        this.showPlan = true;
        if (!this.groupDetailIdForm.controls['groupId'].value) {
            let popMsg = new PopUpMessage('GroupId', 'Error', '13024:A Group Id must be Entered to create a new record', 'icon');
            popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
        } else {
            this.premiumMaster = null;
            this.showDetForm = true;
            this.editGroupDetials = false;
            this.datesCheck();
            this.dataGridGridOptions.api.deselectAll();
            this.groupDetailForm.reset('', { onlySelf: true, emitEvent: false });
            this.selectDefaultOptions();
            setTimeout(() => {
                this.gotoForm();
            }, 200);
        }
        this.rcTypeStatus = true;
    }

    selectDefaultOptions() {
        this.currentValid = false;
        this.selectedRiderCode = null;
        this.selectedPlanCode = null;
        this.groupDetailForm.patchValue({
            'profCobCalc': 'X',
            'instCobCalc': 'X',
            'dependentDeterminationRule': 'N',
            'excludeCapitatedClaims': 'N',
            'paymentPolicy': 'N',
            'excludeCapitatedClaimLines': 'N',
            'rctType': 'P'
        }, { emitEvent: false });
    }
    gotoForm() {
        let el = this.form.nativeElement;
        el.scrollIntoView();
        this.rctTypeElement.nativeElement.focus();
    }
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.groupDetailIdForm.patchValue({
                groupId: res.groupId
            }, { emitEvent: false });
            this.getGroupDetialByGroupId(res.groupId)
        });
    }

    getGroupDetails() {
        this.premiumMasters = [];
        this.premiumMasterService.getPremiumMasters().subscribe(premiumMasters => {
            this.premiumMasters = premiumMasters;
            this.dataGridGridOptions.api.setRowData([]);
            this.dataGridGridOptions.api.setRowData(this.premiumMasters);
        }, error => {
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

    onChangeSubscriberId(event: any) {
        alert(event.target.value);
    }
    onChangeGroupId(event: any) {
        this.groupDetailForm.patchValue({ seqGroupId: event.target.value }, { emitEvent: false })
        this.getGroupDetialByGroupId(event.target.value);
    }

    getGroupDetialByGroupId(groupId: number) {
        this.groupMasterService.getGroupMasterByGroupId(groupId).subscribe((groupMaster: any) => {
            this.groupMaster = groupMaster;
            this.gLevel = groupMaster.levelCode;
            this.seqGroupId = groupMaster.seqGroupId;
            this.seqSourceId = groupMaster.seqGroupId;
            this.ShortName = groupMaster.shortName;
            this.groupId = groupId;
            this.editGroupDetials = true;
            this.groupMasterExists = true;
            this.populateGroupDetailGrid(this.seqGroupId);
        }, error => {
            this.groupMasterExists = false;
            this.editGroupDetials = false;
            this.seqGroupId = null;
            // this.toastService.showToast('Group Id Not Exists', NgbToastType.Danger)

        });
    }
    populateGroupDetailGrid(seqGroupId: number, isLastIndex: any = false) {
        this.premiumMasterService.findByGroupId(seqGroupId).subscribe(groupDetails => {
            this.premiumMasters = groupDetails;
            if (!this.premiumMasters) {
                this.idEntered = true;
            } else {

                this.dataGridGridOptions.api.setRowData(this.premiumMasters);
                if (this.premiumMasters && this.premiumMasters.length > 0) {
                    if (isLastIndex) {
                        let lastIndex = this.premiumMasters.length - 1;
                        this.seqPremId = this.premiumMasters[lastIndex].premiumMasterPrimaryKey.seqPremId;
                        this.dataGridGridOptions.api.selectIndex(lastIndex, false, false);
                    } else {
                        this.seqPremId = this.premiumMasters[0].premiumMasterPrimaryKey.seqPremId;
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                    }
                }
            }
        }, error => {
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

    onChangePbCombCode(value: any) {
        if (value && value !== '') {
            let generalRefs = this.copyGeneralRef.filter(f => f.companyCode === value);
            this.generalRef = generalRefs.sort((a, b) => {
                if (a.generalLedgerReferencePrimaryKey.glRefCode < b.generalLedgerReferencePrimaryKey.glRefCode) { return -1; }
                if (a.generalLedgerReferencePrimaryKey.glRefCode > b.generalLedgerReferencePrimaryKey.glRefCode) { return 1; }
                return 0;
            });
        }
    }

    onSelectionChanged(event: any) {
        this.showDetForm = true;
        this.premiumMaster = new PremiumMaster();
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.premiumMaster = selectedRows[0];
            this.editGroupDetials = true;
            this.seqPremId = selectedRows[0].premiumMasterPrimaryKey.seqPremId;
            this.rcTypeStatus = false;
            this.groupDetailForm.patchValue({
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.premiumMaster.effectiveDate),
                'endDate': this.dateFormatPipe.defaultDisplayDateFormat(this.premiumMaster.endDate),
                'planrider': this.premiumMaster.planRiderCode,
                'benefitPkg': this.premiumMaster.benefitPackageId,
                'lob': this.premiumMaster.lineOfBusiness,
                'pbCompcode': this.premiumMaster.companyCode,
                'claimFilingIndicator': this.premiumMaster.claimFilingIndicator,
                'rctType': this.premiumMaster.recordType,
                'rctTypeCode': this.getPlanCodeByCode(this.premiumMaster.recordType),
                'profCobCalc': this.premiumMaster.cobCalcMethod,
                'instCobCalc': this.premiumMaster.instCobCalcMethod,
                'dependentDeterminationRule': this.premiumMaster.depDetermRuleCode,
                'dentlCobCalc': this.premiumMaster.dentalCobCalcMethod,
                'paymentPolicy': this.premiumMaster.cobPolicyFlag,
                'groupReq': this.premiumMaster.priceOrAdjudicate,
                'excludeCapitatedClaims': this.premiumMaster.cobExcludeCapClaimCode,
                'reason': this.premiumMaster.reasonCode,
                'excludeCapitatedClaimLines': this.premiumMaster.excludeCapClmDtl ? this.premiumMaster.excludeCapClmDtl : 'N',
                'exclusionType': this.premiumMaster.exclusionType,
                'pbGlref': this.premiumMaster.glRefCode,
                'exclusionPeriod': this.premiumMaster.exclusionPeriod,
                'specialProcessing': this.premiumMaster.specPgmProcessCd,
                'pctBilled': this.premiumMaster.pctOfBilled,
                'pctAllwd': this.premiumMaster.pctAllowed,
                'applyPcp': (this.premiumMaster.applyPcp && this.premiumMaster.applyPcp === 'Y') ? 'Y' : null,
                'geographicRegion': this.premiumMaster.geographicRegion,
                'priceRule1': this.premiumMaster.priceRule1,
                'priceSchedule1': this.premiumMaster.priceSchedule1,
                'priceSchedule2': this.premiumMaster.priceSchedule2,
                'commissionMatrixDef': this.premiumMaster.commissionMatrixDef,
                'tieringMethod': this.premiumMaster.tieringMethod ? this.premiumMaster.tieringMethod.trim() : null,
                'adminFee': this.premiumMaster.adminFee,
                'adminGlref': this.premiumMaster.commissionGlRefCode,
                'adminFeeLevel': this.premiumMaster.adFeeLevelCode,
                'matrixDef': this.premiumMaster.matrixDef,
                'adminCompcode': this.premiumMaster.adFeeCompCode,
                'acrossTheBoard': this.premiumMaster.rateCategory == 1,
                'pctOfMatrix': isNaN(this.premiumMaster.pctOfMatrix) ? "" : ((this.premiumMaster.pctOfMatrix * 100.00).toFixed(2) + "%"),
                'rate1': (this.premiumMaster.rate1 && this.premiumMaster.rate1 >= 0) ? Number(this.premiumMaster.rate1).toFixed(2) : null,
                'rate2': (this.premiumMaster.rate2 && this.premiumMaster.rate2 >= 0) ? Number(this.premiumMaster.rate2).toFixed(2) : null,
                'rate3': (this.premiumMaster.rate3 && this.premiumMaster.rate3 >= 0) ? Number(this.premiumMaster.rate3).toFixed(2) : null,
                'rate4': (this.premiumMaster.rate4 && this.premiumMaster.rate4 >= 0) ? Number(this.premiumMaster.rate4).toFixed(2) : null,
                'rate5': (this.premiumMaster.rate5 && this.premiumMaster.rate5 >= 0) ? Number(this.premiumMaster.rate5).toFixed(2) : null,
                'rateUpdatedOn': this.premiumMaster.updateDatetime ? this.datePipe.transform(this.premiumMaster.updateDatetime, 'MM/dd/yyyy') : this.datePipe.transform(this.premiumMaster.insertDatetime, 'MM/dd/yyyy')
            }, { emitEvent: false });
            this.datesCheck();
            if (this.premiumMaster.planRiderCode === 'P') {
                this.filteredPlanCode = this.PlanCode
            } else {
                this.filteredRiderCode = this.riderMasters
            }
            setTimeout(() => {
                this.isFormValidateStatus();
            }, 2000)
            let rctType = Form.getValue(this.groupDetailForm, 'rctType');
            this.showPlan = (rctType === 'P');
            this.onChangePbCombCode(this.premiumMaster.companyCode);
            if (rctType === 'R') {
                this.groupDetailForm.get('exclusionType').disable()
                this.groupDetailForm.get('applyPcp').disable()
                this.groupDetailForm.get('reason').disable()
                this.groupDetailForm.get('exclusionPeriod').disable()
                this.groupDetailForm.get('excludeCapitatedClaimLines').disable();
                this.selectedRiderCode = this.premiumMaster.planRiderCode
            } else {
                this.selectedPlanCode = this.premiumMaster.planRiderCode;
                this.groupDetailForm.get('exclusionType').enable()
                this.groupDetailForm.get('applyPcp').enable()
                this.groupDetailForm.get('reason').enable()
                this.groupDetailForm.get('exclusionPeriod').enable()
                this.groupDetailForm.get('excludeCapitatedClaimLines').enable()
            }
        } else {
            this.premiumMaster = new PremiumMaster();
            this.groupDetailForm.reset();
            this.groupDetailForm.patchValue({
                seqGroupId: this.groupId
            });
            this.rcTypeStatus = true;
            this.selectDefaultOptions();
        }
    }
    saveGroupDetail(isCallListApi: any = false) {
        if (this.editGroupDetials) {
            if (this.isSuperUser) {
                this.updatePremiumMaster(this.seqPremId, this.seqGroupId);
            } else {
                if (this.secWin.hasUpdatePermission()) {
                    this.updatePremiumMaster(this.seqPremId, this.seqGroupId);
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Group Detail')
                    });
                }
            }

        } else {
            if (this.isSuperUser) {
                this.createGroupContract(isCallListApi);
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.createGroupContract(isCallListApi);
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Group Detail')
                    });
                }
            }

        }
    }

    createGroupContract(isCallListApi: any = false) {
        this.formValidation.validateForm();
        let premiumMaster = new PremiumMaster();
        if (this.groupDetailForm.valid) {
            premiumMaster.premiumMasterPrimaryKey = {};
            premiumMaster.premiumMasterPrimaryKey['seqGroupId'] = this.seqGroupId;
            // premiumMaster.premiumMasterPrimaryKey['seqPremId'] = 22;
            premiumMaster.recordType = this.groupDetailForm.get('rctType').value && this.dddwDtls.length > 0 ?
                this.dddwDtls.find(option => option.dddwDtlPrimaryKey.dataVal == this.groupDetailForm.value.rctType).dddwDtlPrimaryKey.dataVal : this.groupDetailForm.value.rctType;
            premiumMaster.planRiderCode = Form.getValue(this.groupDetailForm, 'planrider');
            premiumMaster.effectiveDate = Form.getDatePickerValue(this.groupDetailForm, 'effDate');
            premiumMaster.endDate = Form.getDatePickerValue(this.groupDetailForm, 'endDate');
            premiumMaster.benefitPackageId = Form.getValue(this.groupDetailForm, 'benefitPkg');
            premiumMaster.lineOfBusiness = Form.getValue(this.groupDetailForm, "lob");
            premiumMaster.companyCode = Form.getValue(this.groupDetailForm, 'pbCompcode');
            premiumMaster.glRefCode = Form.getValue(this.groupDetailForm, 'pbGlref'); // Pending
            premiumMaster.claimFilingIndicator = Form.getValue(this.groupDetailForm, 'claimFilingIndicator');
            premiumMaster.cobCalcMethod = Form.getValue(this.groupDetailForm, 'profCobCalc');
            premiumMaster.instCobCalcMethod = Form.getValue(this.groupDetailForm, 'instCobCalc');
            premiumMaster.depDetermRuleCode = Form.getValue(this.groupDetailForm, 'dependentDeterminationRule');
            premiumMaster.dentalCobCalcMethod = Form.getValue(this.groupDetailForm, 'dentlCobCalc');
            premiumMaster.cobPolicyFlag = Form.getValue(this.groupDetailForm, 'paymentPolicy') ? Form.getValue(this.groupDetailForm, 'paymentPolicy') : 'N';
            premiumMaster.priceOrAdjudicate = Form.getValue(this.groupDetailForm, 'groupReq');
            premiumMaster.depDetermRuleCode = Form.getValue(this.groupDetailForm, 'excludeCapitatedClaims');
            premiumMaster.reasonCode = Form.getValue(this.groupDetailForm, 'reason');
            premiumMaster.excludeCapClmDtl = Form.getValue(this.groupDetailForm, 'excludeCapitatedClaimLines') ? Form.getValue(this.groupDetailForm, 'excludeCapitatedClaimLines') : 'N';
            premiumMaster.exclusionType = Form.getValue(this.groupDetailForm, 'exclusionType');
            premiumMaster.exclusionPeriod = Form.getValue(this.groupDetailForm, 'exclusionPeriod');
            premiumMaster.specPgmProcessCd = Form.getValue(this.groupDetailForm, 'specialProcessing');
            premiumMaster.pctOfBilled = Form.getValue(this.groupDetailForm, 'pctBilled');
            premiumMaster.pctAllowed = Form.getValue(this.groupDetailForm, 'pctAllwd');
            premiumMaster.applyPcp = Form.getValue(this.groupDetailForm, 'applyPcp');
            premiumMaster.applyPcp = (premiumMaster.applyPcp && (premiumMaster.applyPcp || premiumMaster.applyPcp === 'true')) ? 'Y' : 'N';
            premiumMaster.geographicRegion = Form.getValue(this.groupDetailForm, 'geographicRegion');
            premiumMaster.priceRule1 = Form.getValue(this.groupDetailForm, 'priceRule1');
            premiumMaster.priceSchedule1 = Form.getValue(this.groupDetailForm, 'priceSchedule1');
            premiumMaster.priceSchedule2 = Form.getValue(this.groupDetailForm, 'priceSchedule2');
            premiumMaster.cobExcludeCapClaimCode = Form.getValue(this.groupDetailForm, 'excludeCapitatedClaims');
            premiumMaster.tieringMethod = Form.getValue(this.groupDetailForm, 'tieringMethod');
            premiumMaster.tieringMethod = (premiumMaster.tieringMethod) ? premiumMaster.tieringMethod : 'N';
            this.auditService.setAuditFields(
                premiumMaster,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.ADD
            );

            let adminFee: any = this.groupDetailForm.get('adminFee').value;
            adminFee = adminFee ? adminFee.toString().replace('$', '') : "";
            let rate1: any = this.groupDetailForm.get('rate1').value;
            rate1 = rate1 ? rate1.toString().replace('$', '').replace(',', '') : "";
            let rate2: any = this.groupDetailForm.get('rate2').value;
            rate2 = rate2 ? rate2.toString().replace('$', '').replace(',', '') : "";
            let rate3: any = this.groupDetailForm.get('rate3').value;
            rate3 = rate3 ? rate3.toString().replace('$', '').replace(',', '') : "";
            let rate4: any = this.groupDetailForm.get('rate4').value;
            rate4 = rate4 ? rate4.toString().replace('$', '').replace(',', '') : "";
            let rate5: any = this.groupDetailForm.get('rate5').value;
            rate5 = rate5 ? rate5.toString().replace('$', '').replace(',', '') : "";

            premiumMaster.adminFee = adminFee;
            premiumMaster.matrixDef = Form.getValue(this.groupDetailForm, 'matrixDef');
            premiumMaster.adFeeCompCode = Form.getValue(this.groupDetailForm, 'adminCompcode');
            premiumMaster.commissionGlRefCode = Form.getValue(this.groupDetailForm, 'adminGlref');
            premiumMaster.adFeeLevelCode = Form.getValue(this.groupDetailForm, 'adminFeeLevel');
            premiumMaster.pctOfMatrix = Form.getValue(this.groupDetailForm, 'pctOfMatrix') ? Form.getValue(this.groupDetailForm, 'pctOfMatrix') : "";
            premiumMaster.rate1 = rate1;
            premiumMaster.rate2 = rate2;
            premiumMaster.rate3 = rate3;
            premiumMaster.rate4 = rate4;
            premiumMaster.rate5 = rate5;
            this.premiumMasterService.createPremiumMaster(premiumMaster).subscribe(response => {
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.getGroupDetialByGroupId(this.groupDetailIdForm.get('groupId').value);
                this.editGroupDetials = true;

                if (isCallListApi) {
                    this.populateGroupDetailGrid(this.seqGroupId, true);
                }
            });

        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }


    updatePremiumMaster(seqPremId: number, seqGroupId: number) {
        this.formValidation.validateForm();
        if (this.groupDetailForm.valid) {
            this.spinner.show();
            let GroupDetail = new PremiumMaster();
            GroupDetail.seqGroupId = this.groupDetailForm.get('groupId').value;

            if (this.groupDetailForm.get('rctType').value) {
                GroupDetail.recordType = this.groupDetailForm.get('rctType').value;
            }
            GroupDetail.planRiderCode = this.groupDetailForm.get('planrider').value;
            GroupDetail.effectiveDate = Form.getDatePickerValue(this.groupDetailForm, 'effDate');
            GroupDetail.endDate = Form.getDatePickerValue(this.groupDetailForm, 'endDate');
            GroupDetail.companyCode = this.groupDetailForm.get('pbCompcode').value;
            GroupDetail.glRefCode = this.groupDetailForm.get('pbGlref').value;
            GroupDetail.benefitPackageId = this.groupDetailForm.get('benefitPkg').value;
            GroupDetail.lineOfBusiness = this.groupDetailForm.get('lob').value;
            GroupDetail.cobCalcMethod = this.groupDetailForm.get('profCobCalc').value;
            GroupDetail.instCobCalcMethod = this.groupDetailForm.get('instCobCalc').value;
            GroupDetail.depDetermRuleCode = this.groupDetailForm.get('dependentDeterminationRule').value;
            GroupDetail.dentalCobCalcMethod = this.groupDetailForm.get('dentlCobCalc').value;
            GroupDetail.cobPolicyFlag = this.groupDetailForm.get('paymentPolicy').value ? this.groupDetailForm.get('paymentPolicy').value : 'N';
            GroupDetail.priceOrAdjudicate = Form.getValue(this.groupDetailForm, 'groupReq');
            GroupDetail.excludeCapClmDtl = this.groupDetailForm.get('excludeCapitatedClaims').value;
            GroupDetail.priceRule1 = this.groupDetailForm.get('priceRule1').value;
            GroupDetail.priceSchedule1 = this.groupDetailForm.get('priceSchedule1').value;
            GroupDetail.pctOfBilled = this.groupDetailForm.get('pctBilled').value;
            // GroupDetail.glRefCode = this.groupDetailForm.get('groupReq').value;
            GroupDetail.priceSchedule2 = this.groupDetailForm.get('priceSchedule2').value;
            GroupDetail.pctAllowed = this.groupDetailForm.get('pctAllwd').value;
            GroupDetail.geographicRegion = this.groupDetailForm.get('geographicRegion').value;
            GroupDetail.exclusionType = this.groupDetailForm.get('exclusionType').value;
            GroupDetail.applyPcp = this.groupDetailForm.get('applyPcp').value;
            GroupDetail.applyPcp = (GroupDetail.applyPcp && (GroupDetail.applyPcp || GroupDetail.applyPcp === 'true')) ? 'Y' : 'N';
            GroupDetail.reasonCode = this.groupDetailForm.get('reason').value;
            GroupDetail.exclusionPeriod = this.groupDetailForm.get('exclusionPeriod').value;
            GroupDetail.cobExcludeCapClaimCode = this.groupDetailForm.get('excludeCapitatedClaims').value ? this.groupDetailForm.get('excludeCapitatedClaims').value : 'N';
            GroupDetail.excludeCapClmDtl = Form.getValue(this.groupDetailForm, 'excludeCapitatedClaimLines') ? Form.getValue(this.groupDetailForm, 'excludeCapitatedClaimLines') : 'N';
            GroupDetail.specPgmProcessCd = this.groupDetailForm.get('specialProcessing').value;
            GroupDetail.claimFilingIndicator = this.groupDetailForm.get('claimFilingIndicator').value;
            GroupDetail.tieringMethod = (this.premiumMaster && this.premiumMaster.tieringMethod) ? this.premiumMaster.tieringMethod : 'N';

            this.auditService.setAuditFields(
                GroupDetail,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.UPDATE
            );

            this.premiumMasterService.updatePremiumMasterGroupDetail(GroupDetail, seqPremId, seqGroupId).subscribe(response => {
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.editGroupDetials = true;
                this.getGroupDetialByGroupId(this.groupId);
                if (this.screenCloseRequested === true) {
                    this.spinner.hide();
                    this.activeModal.close()
                }
                this.valuechanged = false;
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }


    getCompanyMasters() {
        this.companyMasterService.getCompanyMasters().subscribe(companyMasters => {
            companyMasters.sort((a, b) => {
                if (a['companyCode'] < b['companyCode']) { return -1; }
                if (a['companyCode'] > b['companyCode']) { return 1; }
                return 0;
            });
            this.companyMasters = companyMasters;
            this.filteredCompanyMasters = companyMasters;
        });
    }


    getClaimFillingSystemCode() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLM_FILING_IND', '0').subscribe(systemCodes => {
            this.systemCodes = systemCodes;
        });
    }


    getGroupTypes() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.RECORD_TYPE, CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls = dddwDtls;
        });
    }
    datesCheck() {
        this.groupDetailForm.get('endDate').valueChanges.subscribe(value => {
            const effD = this.groupDetailForm.value.effDate;
            if (!effD) {
                return;
            }
            let dateEffecDefault = null;
            if (effD && effD.singleDate) {
                const newDate = effD.singleDate.date.month + '/' + effD.singleDate.date.day + "/" + effD.singleDate.date.year;
                dateEffecDefault = new Date(newDate);
            }

            let termDate = null;
            if (value && value.singleDate) {
                termDate = new Date(value.singleDate.jsDate);
            }
            // =====================================        =============================
            if (dateEffecDefault && termDate) {
                if (dateEffecDefault < termDate) {
                } else {
                    this.openDateValidationPopupError(true);
                }
            }
            this.valuechanged = false;
        });

        this.groupDetailForm.get('effDate').valueChanges.subscribe(value => {
            const termD = this.groupDetailForm.value.endDate;
            if (!termD) {
                return;
            }
            if (value && termD && termD !== '') {
                const termDate = new Date(termD.singleDate.jsDate);
                const effDate = new Date(value.singleDate.jsDate);
                if (value && termDate && ((effDate < termDate))) {
                } else {
                    this.openDateValidationPopupError(false);
                }
            }

        })
    }
    openDateValidationPopupError(isTermDateValidation: boolean) {
        let popMsg

        if (isTermDateValidation) {
            popMsg = new PopUpMessage('Group Contract', 'Group Detail',
                '13027: End Date must be greater than Effective Date', 'info', [], MessageType.ERROR);
            this.groupDetailForm.patchValue({
                endDate: null
            }, { emitEvent: false })

        } else {
            popMsg = new PopUpMessage('Group Contract', 'Group Detail',
                '13026:Effective Date must be less than End Date', 'info', [], MessageType.ERROR);
            this.groupDetailForm.patchValue({
                effDate: null
            }, { emitEvent: false })
        }
        popMsg.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
    }

    getPlanCode() {
        this.PlanMasterService.getPlanMasters().subscribe(planCode => {
            this.PlanCode = planCode;
            this.filteredPlanCode= planCode
        });
    }
    getRecordType(recordType: any) {
        this.dddwDtls.forEach((value, index) => {
            if (value.dddwDtlPrimaryKey.dataVal === recordType) {
                return value.dddwDtlPrimaryKey.dddwDtlPrimaryKey.displayVal
            }
        });
    }

    getBenefitPackageMasters() {
        this.benefitPackageMasterService.getBenefitPackageMasters().subscribe(benefitPackageMasters => {
            benefitPackageMasters.sort((a, b) => {
                if (a['benefitPackageId'] < b['benefitPackageId']) { return -1; }
                if (a['benefitPackageId'] > b['benefitPackageId']) { return 1; }
                return 0;
            });
            this.benefitPackageMasters = benefitPackageMasters;
            this.filteredBenefitPkg = benefitPackageMasters;
        });
    }
    GetGeoRegion() {
        this.RegionMasterService.getRegionMasters().subscribe(geo => {
            this.GeoRegion = geo;
            this.GeoRegion = this.GeoRegion.filter((data: any) => data.regionMasterPrimaryKey.regionType === "G");
        });
    }
    getLineOfBusinessMasters() {
        this.lineOfBusinessMasterService.getLinesOfBusinessMaster().subscribe(lineOfBusinessMasters => {
            this.lineOfBusinessMasters = lineOfBusinessMasters;
            this.filteredLob = lineOfBusinessMasters;
        });
    }

    getProfCOBCalc() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PROF_COB_CALC_COLUMN, CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            dddwDtls.sort((a: any, b: any) => {
                return parseInt(a['dddwDtlPrimaryKey'].displayVal.split('-')[0]) - parseInt(b['dddwDtlPrimaryKey'].displayVal.split('-')[0])
            });
            this.dddwDtls2 = dddwDtls;
        });
    }

    getDependentDeterminationRule() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DEPENDENT_DETERMINATION_COLUMN, CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls3 = dddwDtls;
        });
    }


    getDentalCobCalc() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DNTL_COB_CALC_COLUMN, CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls4 = dddwDtls;
        });
    }



    getPaymentPolicy() {
        this.systemCodesService.getSystemCodesByLangAndtype('COBPYMT', '0').subscribe(systemCodes => {
            this.systemCodes2 = systemCodes;
        });
    }

    getGroupReq() {
        this.dddwDtlService.findByColumnNameAndDwname('price_or_adjudicate', CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls5 = dddwDtls;
            this.filteredGroupReq = dddwDtls;
        });
    }


    getExcludeCapitatedClaims() {
        this.dddwDtlService.findByColumnNameAndDwname('exclude_cap_clm_dtl', CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls6 = dddwDtls;
        });
    }


    getExclusionType() {
        this.dddwDtlService.findByColumnNameAndDwname('exclusion_type', CONSTANTS.DW_NAME).subscribe(dddwDtls => {
            this.dddwDtls7 = dddwDtls;
        });
    }


    getReasonCodeMasters() {
        this.reasonCodeMasterService.getReasonCodeMasters().subscribe(reasonCodes => {
            this.reasonCodes = reasonCodes;
        })
    }
    getGeneral() {
        this.GeneralLedgerReferenceService.getGeneralLedgerReferences().subscribe((led: GeneralLedgerReference[]) => {
            this.copyGeneralRef = led
        });
    }

    onRcdTypeChange(event: any) {
        const rctType = event.target.value;
        this.showPlan = rctType === 'P';
    }
    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.groupDetailForm.controls[fieldName].patchValue(fieldValue);
        this.showPlan = fieldValue === 'Plan';
    }


    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.valuechanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Group Detail')
            })
        }
        else {
            this.activeModal.close();
        }
    };
    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveGroupDetail()
                }
                else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.screenCloseRequested === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {

        }
    };

    changeRectType(event: any) {
        let rcType = event.target.value;
        this.showPlan = rcType === 'P';
        this.groupDetailForm.get('planrider').reset();
    }


    getPlanCodeByCode(planCode: any): any {
        let displayValue;
        if (planCode) {
            this.dddwDtls.forEach(dddwDtls => {
                if (dddwDtls.dddwDtlPrimaryKey.dataVal === planCode) {
                    displayValue = dddwDtls.dddwDtlPrimaryKey.displayVal;
                }
            });
        }
        return displayValue;
    }

    getPlanCodeValueByDisplayVal(displayVal: any): any {
        let dataVal;
        if (displayVal) {
            this.dddwDtls.forEach(dddwDtls => {
                if (dddwDtls.dddwDtlPrimaryKey.displayVal === displayVal) {
                    dataVal = dddwDtls.dddwDtlPrimaryKey.dataVal;
                }
            });
        }
        return dataVal;
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/GRUPD_Group_Detail.htm';
    };

    showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Group Detail";
        ref.componentInstance.insertDateTime = this.premiumMaster['insertDatetimeDisplay'];
        ref.componentInstance.insertProcess = this.premiumMaster['insertProcess'];
        ref.componentInstance.insertUser = this.premiumMaster['insertUser'];
        ref.componentInstance.updateUser = this.premiumMaster['updateUser'];
        ref.componentInstance.updateDateTime = this.premiumMaster['updateDatetimeDisplay'];
        ref.componentInstance.updateProcess = this.premiumMaster['updateProcess'];
    };

    isFormValidateStatus() {
        this.groupDetailForm.valueChanges.subscribe(() => {
            this.valuechanged = true;
        })
    }

    formPopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
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
                    this.authenticationService.logout();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openSpecialMenu() {
        document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownSpecial'
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
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
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Detail'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Contracts'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Master File'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Panel'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'l':
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
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Group Lookup'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'i':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'D/C Information'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Copy Group Detail'
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
    };

    openDCInformation() {
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DC_INFO);
        if (status) {
            this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
            );
        }
        else {
            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
            });
        }
    }

    openCopyGroupDetail() {
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_CPY_GRP_DET);
        if (status) {
            if (this.seqGroupId) {
                this.handleCopyGroupDetail();
            } else {
                this.messageService.findByMessageId(13024).subscribe((message: MessageMasterDtl[]) => {
                    let popMsg = new PopUpMessage('GroupId', 'Group', "13024: " + message[0].messageText, 'icon');
                    popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {

                    });
                })
            }
        }
        else {
            let userId: any = null;
            const parsedToken = this.securityService.getCurrentUserToken();
            if (parsedToken) {
                userId = parsedToken.sub;
            }
            this.messageService.findByMessageId(8072).subscribe((message: MessageMasterDtl[]) => {
                let popMsg = new PopUpMessage('GroupId', 'Group', "8072: " + message[0].messageText.replace('@1', userId), 'icon');
                popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                    new PopUpMessageButton('no', 'No', 'btn btn-primary'),
                    new PopUpMessageButton('cancel', 'Cancel', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {

                });
            });
        }
    };

    openTimeStamp() {
        if (this.groupId) {
            this.showTimeStamp();
        } else {
            this.messageService.findByMessageId(21127).subscribe(res => {
                this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
        }
    };

    resetScreen() {
        this.showDetForm = false;
        this.groupDetailForm.reset();
        this.dataGridGridOptions.api.setRowData([]);
        this.groupDetailIdForm.reset();
        this.ShortName = false;
    }

    handleChangeScreen() {
        let ref = this.modalService.open(this.tabComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupId = this.groupDetailIdForm.value.groupId;
        ref.componentInstance.tabComponent = this.currentComponent;
        this.activeModal.close();
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.ctrlKey) {
            console.log(event.key);
            if (event.key === 'Tab') {
                event.preventDefault();
                this.handleChangeScreen();
            }
        }
    }

    planKeyEvent(event: any) {
        let planCode = event.target.value.toLowerCase();
        if (planCode === '') {
            this.PlanCode = this.filteredPlanCode
        } else {
            this.PlanCode.sort().map((item: any) => {
                if (item.planCode.toLowerCase().startsWith(planCode)) {
                    this.groupDetailForm.patchValue({
                        planrider: item.planCode
                    })
                    this.selectedPlanCode = item.planCode
                }
            })

        }
    }

    riderKeyEvent(event: any) {
        let riderCode = event.target.value.toLowerCase();
        if (riderCode === '') {
            this.riderMasters = this.filteredRiderCode
        } else {
            this.riderMasters.sort((a, b) => a.riderCode > b.riderCode ? -1 : 1).map(item => {
                if (item.riderCode.toLowerCase().startsWith(riderCode)) {
                    this.groupDetailForm.patchValue({
                        planrider: item.riderCode
                    })
                }
            })
            this.riderMasters = this.filteredRiderCode.filter(it => {
                return it.riderCode.toLowerCase().includes(riderCode)
            })
        }
    }

    pbCompCodeKeyEvent(event: any) {
        let value = event.target.value;
        if (value && value !== '') {
            let generalRefs = this.copyGeneralRef.filter(f => f.companyCode === value);
            this.generalRef = generalRefs.sort((a, b) => {
                if (a.generalLedgerReferencePrimaryKey.glRefCode < b.generalLedgerReferencePrimaryKey.glRefCode) { return -1; }
                if (a.generalLedgerReferencePrimaryKey.glRefCode > b.generalLedgerReferencePrimaryKey.glRefCode) { return 1; }
                return 0;
            });
        }
    }

    pbGlRefKeyEvent(event: any) {
        let pbGlRef = event.target.value.toLowerCase();
        if (pbGlRef === '') {
            this.generalRef = this.filteredGeneralRef
        } else {
            this.generalRef.sort((a, b) => a.generalLedgerReferencePrimaryKey.glRefCode > b.generalLedgerReferencePrimaryKey.glRefCode ? -1 : 1).map(item => {
                if (item.generalLedgerReferencePrimaryKey.glRefCode.toLowerCase().startsWith(pbGlRef)) {
                    this.groupDetailForm.patchValue({
                        pbGlref: item.generalLedgerReferencePrimaryKey.glRefCode
                    });
                }
            })
            this.generalRef = this.filteredGeneralRef.filter(it => {
                return it.generalLedgerReferencePrimaryKey.glRefCode.toLowerCase().includes(pbGlRef)
            })
        }
    }

    benefitPkgKeyEvent(event: any) {
        let benefitPkg = event.target.value.toLowerCase();
        if (benefitPkg === '') {
            this.benefitPackageMasters = this.filteredBenefitPkg
        } else {
            this.benefitPackageMasters.sort((a, b) => a.benefitPackageId > b.benefitPackageId ? -1 : 1).map(item => {
                if (item.benefitPackageId.toLowerCase().startsWith(benefitPkg)) {
                    this.groupDetailForm.patchValue({
                        benefitPkg: item.benefitPackageId
                    });
                }
            })
            this.benefitPackageMasters = this.filteredBenefitPkg.filter(it => {
                return it.benefitPackageId.toLowerCase().includes(benefitPkg)
            })
        }
    }

    lobKeyEvent(event: any) {
        let lob = event.target.value.toLowerCase();
        if (lob === '') {
            this.lineOfBusinessMasters = this.filteredLob
        } else {
            this.lineOfBusinessMasters.map(item => {
                if (item.lineOfBusiness.toLowerCase().startsWith(lob)) {
                    this.groupDetailForm.patchValue({
                        lob: item.lineOfBusiness
                    });
                }
            })
            this.lineOfBusinessMasters = this.filteredLob.filter(it => {
                return it.lineOfBusiness.toLowerCase().includes(lob)
            })
        }
    };

    groupReqKeyEvent(event: any) {
        let groupReq = event.target.value.toLowerCase();
        if (groupReq === '') {
            this.dddwDtls5 = this.filteredGroupReq
        } else {
            this.dddwDtls5.map(item => {
                if (item.dddwDtlPrimaryKey.dataVal.toLowerCase().startsWith(groupReq)) {
                    this.groupDetailForm.patchValue({
                        groupReq: item.dddwDtlPrimaryKey.dataVal
                    });
                }
            })
            this.dddwDtls5 = this.filteredGroupReq.filter(it => {
                return it.dddwDtlPrimaryKey.dataVal.toLowerCase().includes(groupReq)
            })
        }
    }
}
