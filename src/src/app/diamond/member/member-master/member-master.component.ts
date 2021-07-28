import { DatePipe, Location } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupMaster, MemberEligHistory, MemberMaster, MessageMasterDtl, SecUser } from '../../../api-models';
import {
    DddwDtlService,
    DddwHdrService,
    GroupContractService,
    GroupMasterService,
    LineOfBusinessMasterService,
    MessageMasterDtlService,
    PlanMasterService,
    RiderMasterService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service';
import { MemberMasterService } from '../../../api-services/member-master.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, NGBModalOptions } from '../../../shared/config';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { CONSTANTS, getMemberMasterShortcutKeys, SharedService } from '../../../shared/services/shared.service';
import { Menu, OPERATIONS, SearchModel } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberTerminateUnterminateComponent } from '../member-terminate-unterminate/member-terminate-unterminate.component';
import { Form } from '../../../shared/helpers/form.helper';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
// tslint:disable-next-line:max-line-length
import { MemberCobVerificationInformationComponent } from '../member-cob-verification-information/member-cob-verification-information.component';
import { ProviderChangeComponent } from '../provider-change/provider-change.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressRippleComponent } from '../address-ripple/address-ripple.component';
import { DependentVerificationStatusComponent } from '../dependent-verification-status/dependent-verification-status.component';
import { ChangeSubscriberDesignationComponent } from '../change-subscriber-designation/change-subscriber-designation.component';
import { LetterRequestComponent } from '../letter-request/letter-request.component';
import { AddDiamondIdComponent } from '../add-diamond-id/add-diamond-id.component';
import { MemberFamilyViewComponent } from '../member-family-view/member-family-view.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { MemberMasterLookup } from '../../../shared/lookup/member-master-lookup';
import { CountryService } from '../../../api-services/country.service';
import { GroupMasterLookup } from '../../../shared/lookup/group-master-lookup';
import { UserDefinedValidateCodeService } from '../../../api-services/user-defined-validate-code.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { MEM_MODULE_ID } from '../../../shared/app-constants';
import { MemberMasterPlancodeLookup } from '../../../shared/lookup/member-master-plancode-lookup';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { MemberMasterReasconLookup } from '../../../shared/lookup/member-master-reason-lookup';
import { RiderComponent } from '../../support/rider/rider.component';
import { DEFAULT_LANGUAGE, SYSTEM_CODE_MELIGLOC } from '../../../shared/models/constants';
import { IMyDateModel, IMySingleDateModel } from 'angular-mydatepicker';
import { LookupComponent } from '../../../shared/components/lookup/lookup.component';
import { NotesComponent } from '../../../shared/components/notes/notes.component';
import { MemberUserDefinedFieldsComponent } from '../../../shared/components/member-user-defined-fields/member-user-defined-fields.component';
import { MemberMasterDeptLookup } from '../../../shared/lookup/member-master-dept-lookup';
import { LineOfBusinessMaster } from '../../../api-models/line-of-business-master.model';

import { SearchService } from '../../../../app/shared/services/search.service';
import { MemberOtherCoverageService } from '../../../api-services/member-other-coverage.service';
import { AuditService } from '../../../shared/services/audit.service';
import { HelpComponent } from '../help/help.component';
import { AddonMemberMasterControllerComponent } from '../../addon/addon-member-master-controller/addon-member-master-controller.component';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { MemberAddressesComponent } from '../../addon/member-addresses/member-addresses.component';
import { CheckCompanyCodeService } from "../../../api-services/sf-check-company-code.service";
import { MenuBarComponent } from '../../../shared/components/menu-bar/menu-bar.component';
import { MembEligHistRateTypeLookup } from '../../../shared/lookup/memb-elig-hist-ratetype-lookup';
import { IdCardSetupService } from '../../../api-services/id-card-setup.service';
import { IdCardOrder } from '../../../api-models/id-card-order.model';

// Use the Component directive to define the MemberMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
//@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'app-member-master',
    templateUrl: './member-master.component.html',
    styleUrls: ['./member-master.component.scss'],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        GroupMasterService,
        MemberEligHistoryService,
        MemberMasterService,
        DddwHdrService,
        DddwDtlService,
        CountryService,
        UserDefinedValidateCodeService,
        RiderMasterService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
        LineOfBusinessMasterService
    ]
})
export class MemberMasterComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    genders: any[] = [];
    maritalStatuses: any[] = [];
    relationshipCodes: any[] = [];
    languageCodes: any[] = [];
    mcIndicators: any[] = [];
    countries: any[] = [];

    residenceProves: any[] = [];
    workProves: any[] = [];
    payrollProvs: any[] = [];
    taxExempts: any[] = [];
    searchGroupData: any[];

    citizenShip: any;
    subsPerson: any;
    seqSubsId: number;
    sub: any;
    @Input() SubID?: string;
    @Input() selectedMember?: any;
    currentValid: Boolean = false;
    memberMasterLength = 0;
    riderCodes: any[] = [];
    planCodes: any[] = [];
    menuOpened = ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;

    ssnRepeatFlag: Boolean;
    ssnFamilyCheck: Boolean;

    public memberMasterForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    public showMemberMasterField = false;
    public isSubscriberDisabled = false;
    public isDisabledTermRsn = true;
    public isReadonly = false;
    public languageCode: any;
    //    private datePickerModel = datePickerModel;
    private groupId: any;
    private nextSequence: any;
    private editGroupMaster: boolean;
    private groupMaster: GroupMaster;
    private groupMasters: GroupMaster[];
    private editMemberEligHistory: boolean;
    private memberEligHistory: MemberEligHistory;
    private memberEligHistorys: MemberEligHistory[];
    editMemberMaster: boolean;
    private memberMaster: MemberMaster = new MemberMaster();
    private memberMasters: MemberMaster[] = [];
    private subscriberid: any;
    private seqEligHist: any;
    private planpackgeID: any;
    requestId: Boolean = false;
    lookupField: string;
    screenCloseRequest: Boolean = false;
    displayEmirateCode: Boolean = false;
    valueChanged: Boolean = false;
    @Input() designationData: any;
    @Input() showIcon = false;
    @Input() winID?: string;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    @ViewChild('mcInd') public mcInd: ElementRef;
    personNumStatus: Boolean = true;
    searchStatus = false;
    keyNames = 'seq_memb_id';
    keyValues: any;
    termDateStatus: Boolean = false;
    isDisableCanadianTax: Boolean = true;
    cobIndStatus: Boolean = false;
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
    planCodeModel = new SearchModel(
        'membermasters/plancode/lookup',
        MemberMasterPlancodeLookup.PLAN_CODE_ALL,
        MemberMasterPlancodeLookup.PLAN_CODE_DEFAULT,
        []
    );
    deptModel = new SearchModel(
        'membermasters/dept/lookup',
        MemberMasterDeptLookup.DEPT_DEFAULT,
        MemberMasterDeptLookup.DEPT_ALL,
        []
    );
    empStatusModel = new SearchModel(
        'membermasters/empStatus/lookup',
        MemberMasterDeptLookup.DEPT_DEFAULT,
        MemberMasterDeptLookup.DEPT_ALL,
        []
    );
    reasonModel = new SearchModel(
        'membermasters/reason/lookup',
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        [{ 'REASON_CODE_TYPE': 'HD' }]
    );

    rateTypeModel = new SearchModel(
        'membermasters/ratetype/lookup',
        MembEligHistRateTypeLookup.DEFAULT,
        MembEligHistRateTypeLookup.ALL,
        []
    );

    secWin: SecWinViewModel;
    windowId = 'MEMBR';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    planCode: string;
    relCode: string;
    effDate: string;
    riderCode: string;
    groupIdFieldId: any;
    @ViewChild('groupId') groupIdField: any;
    @ViewChild('memberIds') subscriberIdField: any;
    public seqSourceId = -1;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private idCardSetupService: IdCardSetupService,
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        public mask: Mask,
        public datepipe: DatePipe,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private groupMasterService: GroupMasterService,
        private memberEligHistoryService: MemberEligHistoryService,
        private memberMasterService: MemberMasterService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        private dddwDtlService: DddwDtlService,
        private router: Router,
        private route: ActivatedRoute,
        private countryService: CountryService,
        public activeModal: NgbActiveModal,
        private userDefinedValidateCodeService: UserDefinedValidateCodeService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private renderer: Renderer2,
        private location: Location,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private checkCompanyCodeService: CheckCompanyCodeService,
        private planMasterService: PlanMasterService,
        private riderMasterService: RiderMasterService,
        private systemCodesService: SystemCodesService,
        private searchService: SearchService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private memberOtherCoverageService: MemberOtherCoverageService,
        private auditService: AuditService,
        private groupContractService: GroupContractService
    ) { }

    openAddonMemberMaster() {
        if (this.showMemberMasterField) {
            const ref = this.modalService.open(AddonMemberMasterControllerComponent, {
                size: <any>'xl',
                ...NGBModalOptions, windowClass: 'dashboard-modal'
            });
            ref.componentInstance.groupNumber = this.memberMaster.subscriberId;
            ref.componentInstance.subscriberId = this.memberMaster.subscriberId;
            ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
            ref.componentInstance.seqSubsId = this.memberMaster.seqSubsId;
            ref.componentInstance.groupName = this.memberMaster.firstName ? this.memberMaster.firstName : '' + ' ' +
                this.memberMaster.lastName ? this.memberMaster.lastName : '';
        } else {
            this.messageService
                .findByMessageId(13062)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('Select a member first', 'Member Master Address');
                });
        }
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    setSearchResults(groupId: any) {
        if (groupId && this.groupId != groupId) {
            const searchOptionsRider = [{ GROUP_ID: groupId, RECORD_TYPE: 'R' }];
            let searchModelRider = JSON.parse(JSON.stringify(this.planCodeModel));
            searchModelRider.searchOption = searchOptionsRider;
            this.searchService.getSearchResults(searchModelRider).subscribe(resp => {
                this.riderCodes = resp;
            });

            const searchOptionsPlanCode = [{ GROUP_ID: groupId, RECORD_TYPE: 'P' }];
            let searchModelPlanCode = JSON.parse(JSON.stringify(this.planCodeModel));
            searchModelPlanCode.searchOption = searchOptionsPlanCode;
            this.searchService.getSearchResults(searchModelPlanCode).subscribe(resp => {
                this.planCodes = resp;
            });
            this.groupId = groupId;
            this.enableCanadianTaxFields();
        }
    }

    /**
     * Init component state only if user have select win permission
     */
    initializeComponentState() {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberMasterForm);
        this.menuInit();
        this.getGender();
        this.getCitizenshipDropDown();
        this.getMaritalStatus();
        this.getRelationshipCodes();
        this.getCountries();
        this.getMCIndicators();
        this.getResidenceProv();
        this.getWorkProv();
        this.getTaxExempt();
        this.getPayrollProv();
        this.getAllGroupData();
        if (this.SubID) {
            this.memberMasterForm.patchValue({
                subscriberId: this.SubID
            })
            this.selectedMember = null;
            this.getMemberMasterBySubscriberId(this.SubID)
            this.showMemberMasterField = true;
            this.isSubscriberDisabled = true;
            this.editMemberMaster = true;
            this.popUpMessage = null;
            this.currentValid = true;
        }
        // When not come from Functional Screen
        this.sub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.memberMasterForm.patchValue({
                    'subscriberId': params['id']
                }, { emitEvent: false });
                this.findMemberBySubscriberId(params['id']);
            }
            // In a real app: dispatch action to load the details here.
        });
        //when coming from functional screen

        this.languageCode = 'AMERI';
        if (this.secProgress === false) {
            setTimeout(() => this.subscriberIdField.nativeElement.focus(), 100);;
            this.cdr.detectChanges();
        }
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
        this.secColDetailService
            .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.inProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getMemberMasterShortcutKeys(this));
        this.cdr.detectChanges();
        this.planNRiderOnBlurValidations();
    }

    public popUpButtonHandler(button: any) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button);
        }
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.addMemberMaster();
                    break;
                }
                case 'Open': {
                    this.newNOpenConfirmation();
                    break;
                }
                case 'Save': {
                    this.saveChanges();
                    break;
                }
                case 'Close': {
                    this.closeModal();
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
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.sharedService.onMemberModuleTopicMenuClick(
                event.action,
                'Master File',
                this.activeModal,
                this.memberMaster ? this.memberMasterForm.get('subscriberId').value : '',
                this.selectedMember ? this.selectedMember : ''
            );
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            this.handleNotesMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.memberMasterForm.get('subscriberId').value === '') {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    } else {
                        this.showTimeStamp();
                    }
                    break;
                }
                case 'Audit Display': {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.winID);
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, { size: 'lg' });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('30164: ' + message[0].messageText);
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
            if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Eligibility History'
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
                switch (value) {
                    case 'l':
                        this.openLookupFieldSearchModel()
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Add Dependant'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
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

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Open' },
                    { name: 'Save', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() || (this.editMemberMaster && this.secWin.hasUpdatePermission())))) },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu' },
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
                    { name: 'Add Dependant' },
                    { name: 'Terminate/Unterminate' },
                    { name: 'Reinstate' },
                    { name: 'Provider Change' },
                    { name: 'Modify Existing Provider' },
                    { name: 'Address Ripple' },
                    { name: 'Claim Hold Codes' },
                    { name: 'Verify Student/Dependent Status' },
                    { name: 'Subscriber Designation' },
                    { name: 'ID Card Request' },
                    { name: 'Letter Request' },
                    { name: 'D/C Information' },
                    { name: 'View IPA Information' },
                    { name: 'Subscriber ID Change' },
                    { name: 'Modify DID', disabled: true },
                    { name: 'Add Diamond ID' },
                    { name: 'Add New Subscriber to DID', disabled: true },
                    { name: 'View DID Members', disabled: true },
                    // { name: 'Member COB Verification Information' },
                    { name: 'Member User Fields' },
                    { name: 'Medicare Risk Information', disabled: true },
                    { name: 'View Auto Letter History' },
                    { name: 'Member COB Verification information' },
                    { name: 'Modify Privacy Indicator' },
                    { name: 'Rider' },
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
                    { name: '2 Member Master' },
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

    newNOpenConfirmation() {
        if (this.valueChanged) {
            if (!this.editMemberMaster || this.memberMasterForm.dirty) {
                this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Master', '29065: ' + message[0].messageText, 'icon');
                    popUpMessage.buttons = [
                        new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                        new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                        new PopUpMessageButton('Cancel', 'Cancel', '')
                    ];
                    popUpMessage.messageType = MessageType.SUCCESS;
                    let ref = this.sharedService.showDialogBox(popUpMessage);
                    ref.buttonclickEvent.subscribe((event: any) => {
                        if (event.name === 'Yes') {
                            this.saveChanges()
                        } else if (event.name === 'No') {
                            this.isSubscriberDisabled = false;
                            this.memberMasterForm.reset({ emitEvent: false });
                            this.selectedMember = null;
                            this.editMemberMaster = false;
                            this.valueChanged = false;
                            this.showMemberMasterField = false;
                        }
                    });
                });
            } else {
                this.isSubscriberDisabled = false;
                this.memberMasterForm.reset({ emitEvent: false });
                this.selectedMember = null;
                this.editMemberMaster = false;
                this.valueChanged = false;
                this.showMemberMasterField = false;
            }
        } else {
            this.isSubscriberDisabled = false;
            this.memberMasterForm.reset({ emitEvent: false });
            this.selectedMember = null;
            this.editMemberMaster = false;
            this.valueChanged = false;
            this.showMemberMasterField = false;
        }
    }

    public addDependantShortcut() {
        this.currentValid = false;
        this.isReadonly = false;
        const id = this.memberMasterForm.value.subscriberId;
        if (id) {
            this.personNumStatus = false;
            let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_ADD_DEPEND);
            if ((status)) {
                this.addDependant(id)
            } else {
                this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                    this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                });
            }
        } else {
            this.messageService.findByMessageId(14033).subscribe((message: MessageMasterDtl[]) => {
                this.sharedService.showPopUp('subIdMustBeAdded', '14033: ' + message[0].messageText, 'Member', 'OK');
            });
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Terminate/Unterminate': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_TERM_UNTERM);
                if (status) {
                    if (this.searchStatus) {
                        this.terminateUnterminate(true);
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

            case 'Reinstate': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_REINSTATE);
                if (status) {
                    if (this.searchStatus) {
                        this.reinstateMemberEligHistory(true);
                    } else {
                        this.messageService.findByMessageId(14112).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14112: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }


            case 'Provider Change': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_PROV_CHANGE);
                if (status) {
                    if (this.searchStatus) {
                        const ref = this.modalService.open(ProviderChangeComponent, {
                            size: <any>'xl',
                        });
                        ref.componentInstance.showIcon = true;
                    } else {
                        this.messageService.findByMessageId(14114).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14114: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }
            case 'Member Lookup': {
                this.showMemberMasterField = true;
                this.openLookupFieldSearchModel();
                break;
            }
            case 'Add Dependant': {
                this.currentValid = false;
                this.isReadonly = false;
                this.addDependantShortcut()
                break;
            }
            case 'Modify Existing Provider': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_MOD_EXISTPROV);
                if (status) {
                    if (this.searchStatus) {
                        const id = this.memberMasterForm.value.pcpId;
                        if (id && id !== null) {
                            const ref = this.modalService.open(ProviderChangeComponent, {
                                size: <any>'xl',
                            });
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.toastService.showToast('Enter Provider Id', NgbToastType.Danger);
                        }
                    } else {
                        this.messageService.findByMessageId(14115).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14115: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }
            case 'Address Ripple': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_ADDR_RIPPLE);
                if (status) {
                    if (this.searchStatus) {
                        const ref = this.modalService.open(AddressRippleComponent);
                        ref.componentInstance.showIcon = true;
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

            case 'Claim Hold Codes': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_CLM_HOLD_CDS);
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

            case 'Verify Student/Dependent Status': {

                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VFY_STUDSTAT);
                if (status) {
                    if (this.searchStatus) {
                        const ref = this.modalService.open(
                            DependentVerificationStatusComponent
                        );
                        ref.componentInstance.showIcon = true;
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
            case 'Subscriber Designation': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_SUB_DESIG);
                if (status) {
                    if (this.searchStatus) {
                        const id = this.memberMasterForm.value.subscriberId;
                        let memberData = {
                            subscriberId: id,
                            memberMasterForm: this.memberMasterForm,
                        };
                        if (id) {
                            let ref = this.modalService.open(
                                ChangeSubscriberDesignationComponent,
                                { size: <any>'xl' }
                            );
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.memberData = memberData;
                        } else {
                            this.toastService.showToast(
                                'Enter Subscriber Id',
                                NgbToastType.Danger
                            );
                        }

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
            case 'Letter Request': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_LETTER_REQ);
                if (status) {
                    if (this.searchStatus) {
                        const ref = this.modalService.open(LetterRequestComponent);
                        ref.componentInstance.showIcon = true;
                    } else {
                        this.messageService.findByMessageId(14116).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14116: ' + message[0].messageText);
                        });
                    }

                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }

            case 'ID Card Request': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_IDCARD_REQ);
                if (status) {
                    if (this.searchStatus) {
                        this.messageService.findByMessageId(14118).subscribe((message: MessageMasterDtl[]) => {
                            let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Master', '14118: ' + message[0].messageText, 'icon');
                            popUpMessage.buttons = [
                                new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                                new PopUpMessageButton('No', 'No', 'btn btn-primary')
                            ];
                            popUpMessage.messageType = MessageType.SUCCESS;
                            let ref = this.sharedService.showDialogBox(popUpMessage);
                            ref.buttonclickEvent.subscribe((event: any) => {
                                if (event.name === 'Yes') {
                                    if (this.editMemberMaster) {
                                        this.updateMemberMaster(this.memberMaster.seqMembId);
                                    } else {
                                        this.requestId = true;
                                        this.createMemberMaster();
                                    }
                                } else if (event.name === 'No') {
                                    if (this.editMemberMaster) {
                                        this.updateMemberMaster(this.memberMaster.seqMembId);
                                    } else {
                                        this.requestId = false;
                                        this.createMemberMaster();
                                    }
                                }
                            });
                        });
                    } else {
                        this.messageService.findByMessageId(14117).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14117: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }
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
                if (status) {
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

            case 'Member COB Verification information': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_MCOB_VRFINFO);
                if (status) {
                    if (this.searchStatus) {
                        if (this.showMemberMasterField) {
                            if (this.memberMaster && this.memberMaster.seqMembId) {
                                let ref = this.modalService.open(
                                    MemberCobVerificationInformationComponent,
                                    { size: <any>'xl' }
                                );
                                ref.componentInstance.showIcon = true;
                                ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
                                ref.componentInstance['onSubmit'].subscribe((event: boolean) => {
                                    if (event) {
                                        ref.close();
                                    }
                                });
                            }
                        } else {
                            this.toastService.showToast(
                                'Please select/create a member master first.',
                                NgbToastType.Danger
                            );
                        }
                    } else {
                        this.messageService.findByMessageId(14377).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14377: ' + message[0].messageText);
                        });
                    }

                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }

            case 'Subscriber ID Change': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_SUBID_CHANGE);
                if (status) {
                    if (this.searchStatus) {
                        this.toastService.showToast(
                            'This option is not implemented yet',
                            NgbToastType.Danger
                        );
                    } else {
                        this.messageService.findByMessageId(14377).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14377: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }


            case 'View Auto Letter History': {

                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VW_AL_HIST);
                if (status) {
                    if (this.searchStatus) {
                        this.toastService.showToast(
                            'This option is not implemented yet',
                            NgbToastType.Danger
                        );
                    } else {
                        this.messageService.findByMessageId(14377).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14377: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }

            case 'Member User Fields': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VW_AL_HIST);
                if (!this.isSuperUser) {
                    if (this.secWin.hasSelectPermission()) {
                        status = true;
                    }
                }

                if (status) {
                    if (this.searchStatus) {
                        let ref = this.modalService.open(MemberUserDefinedFieldsComponent, {
                            size: 'lg',
                        });
                        ref.componentInstance.winID = CONSTANTS.MEMBER_MASTER_WINID;
                        ref.componentInstance.dataWindowId = CONSTANTS.MEMBER_MASTER_DATA_WINDOWID;
                        ref.componentInstance.memberMaster = this.memberMaster;
                        if (!this.isSuperUser) {
                            ref.componentInstance.hasUpdatePermission = this.secWin.hasUpdatePermission;
                        }else{
                            ref.componentInstance.hasUpdatePermission = true;
                        }
                        
                        ref.componentInstance.onSubmit.subscribe((data: any) => {
                            this.memberMaster = data;
                            ref.dismiss();
                        });

                    } else {
                        this.messageService.findByMessageId(14114).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14114: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }
                break;
            }

            case 'Modify Privacy Indicator': {

                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_MOD_PRIVACYIND);
                if (status) {
                    if (this.searchStatus) {
                        this.toastService.showToast(
                            'This option is not implemented yet',
                            NgbToastType.Danger
                        );
                    } else {
                        this.messageService.findByMessageId(14414).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14414: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });
                }

                break;
            }

            case 'Add Diamond ID': {
                const id = this.memberMasterForm.value.subscriberId;

                let memberData = {
                    memberId: this.memberMaster.seqMembId,
                    member: this.memberMaster,
                };
                if (id) {
                    let ref = this.modalService.open(AddDiamondIdComponent, {
                        size: <any>'xl',
                    });
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.memberData = memberData;
                    ref.componentInstance.diamondId.subscribe((result: any) => {
                        this.memberMasterForm.patchValue({
                            diamondId: result,
                        }, { emitEvent: false });
                    });
                } else {
                    this.toastService.showToast(
                        'Enter Subscriber Id',
                        NgbToastType.Danger
                    );
                }
                break;
            }

            case 'Rider': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_PROV_CHANGE);
                if (status) {
                    if (this.searchStatus) {
                        const ref = this.modalService.open(RiderComponent, {
                            size: <any>'xl',
                        });
                        ref.componentInstance.showIcon = true;
                    } else {
                        this.messageService.findByMessageId(14114).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('14114: ' + message[0].messageText);
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
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    /**
     * Show member master time stamp,
     */
    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Member Master';
        ref.componentInstance.insertDateTime = this.memberMaster.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.memberMaster.insertProcess;
        ref.componentInstance.insertUser = this.memberMaster.insertUser;
        ref.componentInstance.updateUser = this.memberMaster.updateUser;
        ref.componentInstance.updateDateTime = this.memberMaster.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.memberMaster.updateProcess;
    };

    showPopUp(message: string, title: string, button = 'Cancel') {
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

    public showFamily() {
        this.isSubscriberDisabled = true;
        const id = this.memberMasterForm.value.subscriberId;
        let memberData = this.memberMaster ? {
            memberId: this.memberMaster.seqMembId,
            subscriberId: id,
        } : { subscriberId: id };
        if (id) {
            let ref = this.modalService.open(MemberFamilyViewComponent, {
                size: <any>'xl',
            });
            ref.componentInstance.memberData = memberData;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.memberDetails.subscribe((result: any) => {
                this.memberMaster = result;
                this.seqSourceId = this.memberMaster.seqMembId;
                this.selectedMember = result.personNumber;
                this.getMemberMaster();
                this.getMemberEligHistory(this.memberMaster.seqMembId);
                this.editMemberMaster = true;
                this.isReadonly = true;
                this.editMemberEligHistory = true;
                this.showMemberMasterField = true;
            });
        } else {
            this.messageService.findByMessageId(14111).subscribe((message: MessageMasterDtl[]) => {
                this.sharedService.showPopUp('noFamilyRecords', '14111: ' + message[0].messageText, 'Member Master', 'OK');
            });
        }
    }

    public reloadFromOutside(id: any) {
        this.memberMasterForm.patchValue({
            diamondId: id,
        }, { emitEvent: false });
    }

    getGender() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.MEMBER_GENDER,
                CONSTANTS.DW_CREATE_DETAIL_DE
            )
            .subscribe(
                (gender) => {
                    this.genders = gender;
                }
            );
    }

    getMaritalStatus() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.MARITAL_STATUS,
                CONSTANTS.DW_MEMBR_DE
            )
            .subscribe(
                (status) => {
                    this.maritalStatuses = status;
                }
            );
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

    getLanguageCodes() {
        this.dddwDtlService
            .findByColumnNameAndDwname(CONSTANTS.LANGUAGE_CODE, CONSTANTS.DW_LANGM_DE)
            .subscribe(
                (codes) => {
                    this.languageCodes = codes;
                }
            );
    }

    getMCIndicators() {
        this.dddwDtlService
            .findByColumnNameAndDwname(CONSTANTS.MC_INDICATOR, CONSTANTS.DW_MEMBR_DE)
            .subscribe(
                (codes) => {
                    this.mcIndicators = codes;
                }
            );
    }

    getCountries() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_MELIGLOC, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.countries = systemCodes;
            this.countries.sort((a: any, b: any) => {
                if ((a['systemCodeDesc2'] || '').toLowerCase() < (b['systemCodeDesc2'] || '').toLowerCase()) {
                    return -1;
                } else if ((a['systemCodeDesc2'] || '').toLowerCase() > (b['systemCodeDesc2'] || '').toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getCitizenshipDropDown() {
        this.userDefinedValidateCodeService
            .getUserDefinedValidateCode('member_master', 'user_defined_2')
            .subscribe((data) => {
                this.citizenShip = data;
            });
    }

    private getResidenceProv(): void {
        this.dddwDtlService
            .findByColumnNameAndDwname('mc_user_defined_1', CONSTANTS.DW_MELIG_DE)
            .subscribe(
                (codes) => {
                    this.residenceProves = codes;
                }
            );
    }

    private getWorkProv(): void {
        this.dddwDtlService
            .findByColumnNameAndDwname('mc_user_defined_2', CONSTANTS.DW_MELIG_DE)
            .subscribe(
                (codes) => {
                    this.workProves = codes;
                }
            );
    }

    private getPayrollProv(): void {
        this.dddwDtlService
            .findByColumnNameAndDwname('med_risk_user_defined_1', CONSTANTS.DW_MELIG_DE)
            .subscribe(
                (codes) => {
                    this.payrollProvs = codes;
                }
            );
    }

    private getTaxExempt(): void {
        this.dddwDtlService
            .findByColumnNameAndDwname('med_risk_user_defined_2', CONSTANTS.DW_MELIG_DE)
            .subscribe(
                (codes) => {
                    this.taxExempts = codes;
                }
            );
    }

    closeModal() {
        this.screenCloseRequest = true;
        if (this.valueChanged === true && this.memberMasterForm.dirty) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Master', '29065: ' + message[0].messageText, 'icon');
                popUpMessage.buttons = [
                    new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                    new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                    new PopUpMessageButton('Cancel', 'Cancel', '')
                ];
                popUpMessage.messageType = MessageType.SUCCESS;
                let ref = this.sharedService.showDialogBox(popUpMessage);
                ref.buttonclickEvent.subscribe((event: any) => {
                    if (event.name === 'Yes') {
                        this.saveChanges()
                    } else if (event.name === 'No') {
                        this.router.navigateByUrl('/');
                        if (this.screenCloseRequest === true) {
                            this.activeModal.close();
                        }
                    }
                });
            })
        } else {
            this.activeModal.close();
        }
    }

    private popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    private saveGroupMaster() {
        if (this.editGroupMaster) {
            this.updateGroupMaster(this.groupMaster.seqGroupId);
        } else {
            this.createGroupMaster();
        }
    }

    saveMemberMaster() {
        this.messageService.findByMessageId(6128).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('popUpMessageName', 'Member Master', '6128: ' + message[0].messageText, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    // save only if user presses Yes from Model
                    this.saveChanges();
                } else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    this.activeModal.close();
                } // 3rd case: In case of cancel do nothing
            });
        });
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (this.securityService.checkInsertUpdatePermissions(this.editMemberMaster, this.secWin)) {
            if (this.editMemberMaster) {
                this.updateMemberMaster(this.memberMaster.seqMembId);
            } else {
                this.searchStatus = true;
                this.formValidation.validateForm();
                if (this.memberMasterForm.valid && this.validateMemberEligibility()) {
                    let memberMaster = this.memberMaster;
                    /**
                     * set default values
                     */
                    memberMaster.securityCode = '0';
                    memberMaster.seqMembId = this.nextSequence.body.seqMembId;
                    memberMaster.diamondId = this.memberMasterForm.get('diamondId').value;
                    memberMaster.subscriberId = this.memberMasterForm.get('subscriberId').value;
                    memberMaster.seqSubsId = this.seqSubsId;
                    memberMaster.personNumber = this.memberMasterForm.get('personNo').value;
                    memberMaster.dualCoverageFlag = this.memberMasterForm.get('dualCov').value === true ? 'Y' : 'N';
                    memberMaster.mcIndicator = this.getMcIndKeyFromDataValue(this.memberMasterForm.get('mcInd').value);
                    memberMaster.caseManagementSwitch = this.memberMasterForm.get('caseMgmt').value === true ? 'F' : 'N';
                    memberMaster.lastName = this.memberMasterForm.get('lastNm').value;
                    memberMaster.firstName = this.memberMasterForm.get('first').value;
                    const employmentStatusCode = this.memberMasterForm.get('empStat').value;
                    memberMaster.employmentStatusCode = employmentStatusCode ? employmentStatusCode : 'N';
                    memberMaster.contactTitle = this.memberMasterForm.get('salutation').value;
                    memberMaster.dateOfBirth = Form.getDatePickerValue(this.memberMasterForm, 'dob');
                    const gender = this.memberMasterForm.controls['gender'].value;
                    memberMaster.gender = gender ? gender : 'U';
                    memberMaster.maritalStatus = this.memberMasterForm.get('maritalSts').value;
                    memberMaster.addressLine1 = 'R1 Res/Primary';
                    memberMaster.medicareNo = this.memberMasterForm.get('medicare').value;
                    memberMaster.medicaidNo = this.memberMasterForm.get('medicaid').value;
                    memberMaster.userDefined12 = this.memberMasterForm.get('emirateCode').value;
                    memberMaster.socialSecNo = this.memberMasterForm.get('socSec').value;
                    memberMaster.employeeNo = this.memberMasterForm.get('empNo').value;
                    memberMaster.medicalRecNo = this.memberMasterForm.get('medRec').value;
                    memberMaster.seqAltMembId = this.memberMasterForm.get('altMembId').value;
                    memberMaster.planCode = this.memberMasterForm.get('planCode').value;
                    memberMaster.holdReason = this.memberMasterForm.get('reason').value;
                    memberMaster.languageCode = this.memberMasterForm.get('lang').value;
                    memberMaster.middleInitial = this.memberMasterForm.get('mi').value;
                    memberMaster.userDefined2 = this.memberMasterForm.get('citizenship').value;
                    memberMaster.userDefined1 = this.memberMasterForm.get('occupat').value;
                    this.handleSpecialMenu('ID Card Request');
                } else {
                    this.alertMessage = this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.'
                    );
                }
            }
        }
    }

    findMemberBySubscriberId(id: any) {
        this.getMemberMasterBySubscriberId(id);
    }

    addDependant(id: any) {
        let max = 0;
        this.memberMasters.forEach(member => {
            if (parseInt(member.personNumber, 10) > max) {
                max = parseInt(member.personNumber, 10);
            }
        });
        this.memberMasterService.getNextSequence().subscribe(
            (sequence) => {
                this.nextSequence = sequence;
                this.seqSubsId = this.memberMasters[0].seqSubsId;
                this.showMemberMasterField = true;
                this.editMemberMaster = false;
                this.isSubscriberDisabled = true;
                this.memberMasterForm.reset({
                    subscriberId: id,
                    personNo: ('00' + (max + 1)).slice(-2),
                    subsPersonNo: ('00' + this.subsPerson).slice(-2),
                    lastNm: this.memberMaster.lastName,
                    empStat: 'N',
                    addrType: 'R1 Res/Primary',
                    eligSts: 'Y',
                    dynamicText001: 'Eligible',
                    groupId: this.groupId,
                    dynamicText002: this.memberEligHistory.groupShortName,
                    planCode: this.planCode,
                    lob: this.memberEligHistory.lineOfBusiness,
                    textbox002: this.memberEligHistory.riderCode1,
                    textbox003: this.memberEligHistory.riderCode2,
                    textbox004: this.memberEligHistory.riderCode3,
                    textbox005: this.memberEligHistory.riderCode4,
                    textbox006: this.memberEligHistory.riderCode5,
                    textbox007: this.memberEligHistory.riderCode6,
                    textbox008: this.memberEligHistory.riderCode7,
                    textbox009: this.memberEligHistory.riderCode8,
                    textbox010: this.memberEligHistory.riderCode9,
                    textbox011: this.memberEligHistory.riderCode10,
                    textbox012: this.memberEligHistory.riderCode11,
                    textbox013: this.memberEligHistory.riderCode12,
                    textbox014: this.memberEligHistory.riderCode13,
                    textbox015: this.memberEligHistory.riderCode14,
                    textbox016: this.memberEligHistory.riderCode15,
                    textbox017: this.memberEligHistory.riderCode16,
                    textbox018: this.memberEligHistory.riderCode17,
                    textbox019: this.memberEligHistory.riderCode18,
                    textbox020: this.memberEligHistory.riderCode19,
                    textbox021: this.memberEligHistory.riderCode20,
                    dept: this.memberEligHistory.subscDept,
                    privacyOn: true,
                }, { emitEvent: false });
                this.enableCanadianTaxFields();
            });
        this.nextFocus();
    }

    popUpButtonClicked(button: any) {
        if (button.name === 'yes' || button.name === 'ok') {
            this.memberMasterService.getNextSubscriberId('01').subscribe(res => {
                this.memberMasterForm.patchValue(
                    {
                        subscriberId: res.poSSeqSubscriberId
                    }
                )
            })
            this.memberMasterService.getNextSequence().subscribe(
                (sequence) => {
                    this.nextSequence = sequence;
                    this.seqSubsId = this.nextSequence.body.seqMembId;
                    let formattedSubId = ('000000000' + this.nextSequence.body.subscriberId).slice(-9);
                    this.memberMasterForm.patchValue({
                        personNo: '01',
                        subsPersonNo: '01',
                        empStat: 'N',
                        eligSts: 'Y',
                        dynamicText001: 'Eligible',
                        addrType: 'R1 Res/Primary',
                        privacyOn: true
                    }, { emitEvent: false });
                    this.nextFocus();
                    this.currentValid = false;
                }
            );
            this.showMemberMasterField = true;
            this.isSubscriberDisabled = true;
            this.personNumStatus = false;
            this.valueChanged = true;
        }
        if (button.name === 'no') {
            this.showMemberMasterField = false;
        }
        this.popUpMessage = null;
    }

    focusNextElement(event: any, nextEle: string) {
        if (event.key === 'Tab') {
            event.preventDefault();
            const element = this.renderer.selectRootElement(`#${nextEle}`).focus();
            setTimeout(() => element.focus(), 50);
        }
    }

    onSelectCitizenship(event: any) {
        if (event.target.value === 'USA') {
            this.messageService.findByMessageId(90030).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('popUpMessageName', 'Member Master', '90030: ' + 'A SSN number should be entered when Citizen of USA', 'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                popUpMessage.messageType = MessageType.WARNING;
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
            });
        }
    }

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.memberMasterForm.controls[fieldName].patchValue(fieldValue);
    }

    getMemberMasterBySubscriberId(subscriberId: string) {
        this.memberMasterService.findBySubscriberId(subscriberId).subscribe(
            (memberMasters) => {
                if (memberMasters && memberMasters.length > 1) {
                    this.memberMasterLength = memberMasters.length - 1;
                }
                if (memberMasters) {
                    if (!this.selectedMember) {
                        setTimeout(() => {
                            this.showFamily();
                        }, 1000)
                    }
                    this.memberMasters = memberMasters;
                    this.isSubscriberDisabled = true;
                    this.isReadonly = true;
                    this.currentValid = true;
                    this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex((key: MemberMaster) => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
                    this.subsPerson = this.memberMaster ? this.memberMaster.subsPersonNumber : '';
                    this.getMemberMaster();
                    this.getMemberEligHistory(this.memberMaster.seqMembId);
                    this.showMemberMasterField = true;
                    this.editMemberMaster = true;
                    this.popUpMessage = null;

                    this.memberMasterForm.markAsPristine();
                } else {
                    this.showMemberMasterField = false;
                    this.editGroupMaster = false;
                    this.messageService.findByMessageId(14039).subscribe((message: MessageMasterDtl[]) => {
                        let popUpMessage = new PopUpMessage('notExist', 'Member Master', '14039: ' + message[0].messageText, 'icon');
                        popUpMessage.buttons = [
                            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
                        ];
                        let ref = this.sharedService.showDialogBox(popUpMessage);
                        ref.buttonclickEvent.subscribe((event: any) => {
                            this.subscriberid = subscriberId;
                            this.popUpButtonClicked(event);
                        });
                    });
                }
            },
            (error) => {
                this.showMemberMasterField = false;
                this.editGroupMaster = false;
            }
        );
    }

    onChangeEligStatus() {
        this.memberMasterForm.controls['eligSts'].valueChanges.subscribe((eligSts: string) => {
            if (eligSts) {
                this.memberMasterForm.patchValue({
                    dynamicText001: eligSts === 'Y' ? 'Eligible' : 'Suspended'
                })
            }
        });
    }

    onChangeLocation(event: any) {
        if (event.target.value === 'UKR') {
            this.messageService.findByMessageId(90062).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('popUpMessageName', 'Member Master', '90062: ' + message[0].messageText.replace('@1', event.target.value), 'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                popUpMessage.messageType = MessageType.WARNING;
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
            });
            this.displayEmirateCode = false;
        } else if (event.target.value === 'ARE') {
            this.displayEmirateCode = true;
        } else {
            this.displayEmirateCode = false;
        }
        this.enableCanadianTaxFields(event.target.value);
    }

    /**
     * On riderCode Fields Value changes, show error pop up
     */

    onLookupFieldChangeRateType(event: any) {
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
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.memberMasterForm.patchValue({
                rateType: res['SYSTEM_CODE']
            });
            this.memberMasterForm.markAsDirty();
        });
    }

    getMcIndKeyFromDataValue(displayVal: string): string {
        const dataVals = this.mcIndicators.filter(indicator => indicator.dddwDtlPrimaryKey.displayVal === displayVal);
        if (dataVals.length > 0) {
            return dataVals[0].dddwDtlPrimaryKey.dataVal;
        }
        return displayVal;
    }

    private createGroupMaster() {
        this.formValidation.validateForm();
        if (this.memberMasterForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.state = this.memberMasterForm.get('salutation').value;
            groupMaster.addressLine1 = this.memberMasterForm.get('addrType').value;
            groupMaster.levelCode = this.memberMasterForm.get('relCode').value;
            groupMaster.seqGroupId = this.memberMasterForm.get('groupId').value;
            groupMaster.holdReason = this.memberMasterForm.get('reason').value;
            this.auditService.setAuditFields(groupMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.groupMasterService.createGroupMaster(groupMaster).subscribe(
                (response) => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editGroupMaster = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.valueChanged = false;
                    }
                }
            );
            this.activeModal.close()
        } else {
            // tslint:disable-next-line:max-line-length
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    private updateGroupMaster(seqGroupId: number) {
        this.formValidation.validateForm();
        if (this.memberMasterForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.state = this.memberMasterForm.get('salutation').value;
            groupMaster.addressLine1 = this.memberMasterForm.get('addrType').value;
            groupMaster.levelCode = this.memberMasterForm.get('relCode').value;
            groupMaster.seqGroupId = this.memberMasterForm.get('groupId').value;
            groupMaster.holdReason = this.memberMasterForm.get('reason').value;
            this.auditService.setAuditFields(groupMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.groupMasterService.updateGroupMaster(groupMaster, seqGroupId).subscribe(
                (response) => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editGroupMaster = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    openAddons() {
        if (this.memberMaster.subscriberId && this.memberMaster.seqMembId) {
            const ref = this.modalService.open(MemberAddressesComponent,
                { size: <any>'xl', ...NGBModalOptions, windowClass: 'dashboard-modal', });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.activeTab = 1;
            ref.componentInstance.groupNumber = this.memberEligHistory.groupId;
            ref.componentInstance.seqGroupId = this.memberEligHistory.seqGroupId;
            ref.componentInstance.subscriberId = this.memberMaster.subscriberId;
            ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
            ref.componentInstance.seqSubsId = this.memberMaster.seqSubsId;
            ref.componentInstance.groupName = this.memberEligHistory.groupShortName;
        } else {
            this.messageService
                .findByMessageId(13062)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        message[0].messageText,
                        'Group Detail'
                    );
                });
        }
    }

    private deleteGroupMaster(seqGroupId: number) {
        this.groupMasterService.deleteGroupMaster(seqGroupId).subscribe(
            (response) => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    private getGroupMaster(seqGroupId: number) {
        this.groupMasterService.getGroupMaster(seqGroupId).subscribe(
            (groupMaster) => {
                this.groupMaster = groupMaster;
                this.memberMasterForm.patchValue({
                    salutation: this.groupMaster.state,
                    addrType: this.groupMaster.addressLine1,
                    relCode: this.groupMaster.levelCode,
                    groupId: this.groupMaster.seqGroupId,
                    reason: this.groupMaster.holdReason,
                }, { emitEvent: false });
            }
        );
    }

    private getGroupMasters() {
        this.groupMasterService.getGroupMasters().subscribe(
            (groupMasters) => {
                this.groupMasters = groupMasters;
            }
        );
    }

    private planNRiderOnBlurValidations() {
        if (this.memberMasterForm) {
            this.memberMasterForm.controls['planCode'].valueChanges.subscribe(res => {
                this.onPlancodeLookupFieldChange(res, 'planCode', 'P');
                this.enableCanadianTaxFields();
            });
            let riderCodeList = ['textbox002', 'textbox003', 'textbox004', 'textbox005', 'textbox006', 'textbox007',
                'textbox008', 'textbox009', 'textbox010', 'textbox011', 'textbox012', 'textbox013', 'textbox014',
                'textbox015', 'textbox016', 'textbox017', 'textbox018', 'textbox019', 'textbox020', 'textbox021'];
            for (let riderCode of riderCodeList) {
                this.memberMasterForm.controls[riderCode].valueChanges.subscribe(res => {
                    this.onPlancodeLookupFieldChange(res, riderCode, 'R');
                });
            }
        }
    }

    private validateMemberEligibility(): boolean {
        let riderCodeList = ['textbox002', 'textbox003', 'textbox004', 'textbox005', 'textbox006', 'textbox007',
            'textbox008', 'textbox009', 'textbox010', 'textbox011', 'textbox012', 'textbox013', 'textbox014',
            'textbox015', 'textbox016', 'textbox017', 'textbox018', 'textbox019', 'textbox020', 'textbox021'];
        for (let riderCode of riderCodeList) {
            let riderCodeValue = this.memberMasterForm.controls[riderCode].value;
            if (riderCodeValue) {
                let isRiderCodeAvailable = this.riderCodes.find(rider => rider.PLAN_RIDER_CODE === riderCodeValue);
                if (!isRiderCodeAvailable) {
                    this.memberMasterForm.controls[riderCode].reset();
                    this.messageService.findByMessageId(14337).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUps('14337: ' + message[0].messageText.replace('@1', riderCodeValue), 'Member Master', 'OK');
                    });
                    this.renderer.selectRootElement(`#${riderCode}`).focus();
                    return false;
                }
            }
        }

        let planCodeValue = this.memberMasterForm.controls['planCode'].value;
        if (planCodeValue && planCodeValue != 'null') {
            let isPlanCodeValueAvailable = this.planCodes.find(planCode => planCode.PLAN_RIDER_CODE === planCodeValue);
            this.planpackgeID = isPlanCodeValueAvailable.BENEFIT_PACKAGE_ID;
            if (!isPlanCodeValueAvailable) {
                this.messageService.findByMessageId(14239).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUps('14239: ' + message[0].messageText, 'Member Master', 'OK');
                });
                this.renderer.selectRootElement(`#planCode`).focus();
                return false;
            }
        }
        if (!this.memberMaster.userDefined8) {
            this.messageService.findByMessageId(29034).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUps('29032: ' + message[0].messageText.replace('@1', 'user defined field image#'), 'Member Master', 'Ok');
            });
            return false;
        }

        return true;
    }


    private createMemberEligHistory(id: any) {
        this.formValidation.validateForm();
        if (this.memberMasterForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            /**
             * set default values
             */
            memberEligHistory.securityCode = '0';
            memberEligHistory.pecWaived = 'N';
            memberEligHistory.useEftFlg = 'N';
            memberEligHistory.seqEnrollmentRule = 0;
            memberEligHistory.memberEligHistoryPrimaryKey = {
                seqMembId: id,
                seqEligHist: null,
            };
            memberEligHistory.subscriberId = this.memberMasterForm.get('subscriberId').value;
            memberEligHistory.personNumber = this.memberMasterForm.get('personNo').value;
            memberEligHistory.mcUserDefined1 = this.getMcIndKeyFromDataValue(this.memberMasterForm.get('mcInd').value);
            memberEligHistory.effectiveDate = Form.getDatePickerValue(this.memberMasterForm, 'effDate');
            memberEligHistory.termDate = Form.getDatePickerValue(this.memberMasterForm, 'termDate');
            memberEligHistory.termReason = this.memberMasterForm.get('termRsn').value;
            memberEligHistory.dateOfDeath = Form.getDatePickerValue(this.memberMasterForm, 'dateOfDeath');
            memberEligHistory.eligStatus = this.memberMasterForm.get('eligSts').value;
            memberEligHistory.seqGroupId = this.memberMasterForm.get('seqGroupId').value;
            memberEligHistory.planCode = this.memberMasterForm.get('planCode').value;
            memberEligHistory.panelId = this.memberMasterForm.get('panelId').value;
            memberEligHistory.pcpChangeReason = this.memberMasterForm.get('pcpChngRsn').value;
            memberEligHistory.seqProv2Id = this.memberMasterForm.get('prov2').value;
            memberEligHistory.hireDate = Form.getDatePickerValue(this.memberMasterForm, 'hireDate');
            if (Form.getValue(this.memberMasterForm, 'salary')) {
                memberEligHistory.salary = parseFloat(Form.getValue(this.memberMasterForm, 'salary').toString().replace(/\$|,/g, ''));
            } else {
                memberEligHistory.salary = this.memberMasterForm.get('salary').value;
            }
            memberEligHistory.benefitStartDate = Form.getDatePickerValue(this.memberMasterForm, 'benStartDate');
            memberEligHistory.otherStatusFlag = this.memberMasterForm.get('otherSts').value;
            memberEligHistory.pecEndDate = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
            memberEligHistory.mcUserDate1 = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
            memberEligHistory.privacyOn = this.memberMasterForm.get('privacyOn').value === true ? 'Y' : 'N';
            memberEligHistory.riderCode1 = this.memberMasterForm.get('textbox002').value;
            memberEligHistory.riderCode2 = this.memberMasterForm.get('textbox003').value;
            memberEligHistory.riderCode3 = this.memberMasterForm.get('textbox004').value;
            memberEligHistory.riderCode4 = this.memberMasterForm.get('textbox005').value;
            memberEligHistory.riderCode5 = this.memberMasterForm.get('textbox006').value;
            memberEligHistory.riderCode6 = this.memberMasterForm.get('textbox007').value;
            memberEligHistory.riderCode7 = this.memberMasterForm.get('textbox008').value;
            memberEligHistory.riderCode8 = this.memberMasterForm.get('textbox009').value;
            memberEligHistory.riderCode9 = this.memberMasterForm.get('textbox010').value;
            memberEligHistory.riderCode10 = this.memberMasterForm.get('textbox011').value;
            memberEligHistory.riderCode11 = this.memberMasterForm.get('textbox012').value;
            memberEligHistory.riderCode12 = this.memberMasterForm.get('textbox013').value;
            memberEligHistory.riderCode13 = this.memberMasterForm.get('textbox014').value;
            memberEligHistory.riderCode14 = this.memberMasterForm.get('textbox015').value;
            memberEligHistory.riderCode15 = this.memberMasterForm.get('textbox016').value;
            memberEligHistory.riderCode16 = this.memberMasterForm.get('textbox017').value;
            memberEligHistory.riderCode17 = this.memberMasterForm.get('textbox018').value;
            memberEligHistory.riderCode18 = this.memberMasterForm.get('textbox019').value;
            memberEligHistory.riderCode19 = this.memberMasterForm.get('textbox020').value;
            memberEligHistory.riderCode20 = this.memberMasterForm.get('textbox021').value;
            memberEligHistory.relationshipCode = this.memberMasterForm.get('relCode').value;
            memberEligHistory.lineOfBusiness = this.memberMasterForm.get('lob').value;
            memberEligHistory.ipaId = this.memberMasterForm.get('ipa').value;
            memberEligHistory.subscLocation = this.memberMasterForm.get('location').value;
            memberEligHistory.subscDept = this.memberMasterForm.get('dept').value;
            memberEligHistory.reasonCode = this.memberMasterForm.get('reason').value;
            memberEligHistory.csIndicator = this.memberMasterForm.get('csInd').value;
            memberEligHistory.pcpaaOccurred = 'N';
            memberEligHistory.seqSubsId = this.memberMaster.seqSubsId;
            memberEligHistory.medicareStatusFlg = this.memberMasterForm.get('mCareSts').value;
            memberEligHistory.rateType = this.memberMasterForm.get('rateType').value;
            memberEligHistory.userDefined1 = this.memberMasterForm.get('rpt1').value;
            memberEligHistory.userDefined2 = this.memberMasterForm.get('rpt2').value;
            memberEligHistory.userDefined3 = this.memberMasterForm.get('rpt3').value;
            memberEligHistory.mcUserDefined1 = this.memberMasterForm.get('residenceProv').value;
            memberEligHistory.mcUserDefined2 = this.memberMasterForm.get('workProv').value;
            memberEligHistory.medRiskUserDefined1 = this.memberMasterForm.get('payrollProv').value;
            memberEligHistory.medRiskUserDefined2 = this.memberMasterForm.get('taxExempt').value;

            this.auditService.setAuditFields(memberEligHistory, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(
                (response) => {
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                    this.editMemberEligHistory = true;
                    this.editMemberMaster = true;
                    this.isSubscriberDisabled = true;
                    this.getMemberMasterBySubscriberId(this.memberMasterForm.get('subscriberId').value);
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    private updateMemberEligHistory(seqEligHisid: number, seqMembId: number) {

        this.formValidation.validateForm();
        if (this.memberMasterForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.subscriberId = this.memberMasterForm.get('subscriberId').value;
            memberEligHistory.personNumber = this.memberMasterForm.get('personNo').value;
            memberEligHistory.mcUserDefined1 = this.getMcIndKeyFromDataValue(this.memberMasterForm.get('mcInd').value);
            memberEligHistory.effectiveDate = Form.getDatePickerValue(this.memberMasterForm, 'effDate');
            memberEligHistory.termDate = Form.getDatePickerValue(this.memberMasterForm, 'termDate');
            memberEligHistory.termReason = this.memberMasterForm.get('termRsn').value;
            memberEligHistory.dateOfDeath = Form.getDatePickerValue(this.memberMasterForm, 'dateOfDeath');
            memberEligHistory.eligStatus = this.memberMasterForm.get('eligSts').value;
            memberEligHistory.seqGroupId = this.memberMasterForm.get('seqGroupId').value;
            memberEligHistory.planCode = this.memberMasterForm.get('planCode').value;
            memberEligHistory.panelId = this.memberMasterForm.get('panelId').value;
            memberEligHistory.pcpChangeReason = this.memberMasterForm.get('pcpChngRsn').value;
            memberEligHistory.seqProv2Id = this.memberMasterForm.get('prov2').value;
            memberEligHistory.hireDate = Form.getDatePickerValue(this.memberMasterForm, 'hireDate');
            if (Form.getValue(this.memberMasterForm, 'salary')) {
                memberEligHistory.salary = parseFloat(Form.getValue(this.memberMasterForm, 'salary').toString().replace(/\$|,/g, ''));
            } else {
                memberEligHistory.salary = this.memberMasterForm.get('salary').value;
            }
            memberEligHistory.benefitStartDate = Form.getDatePickerValue(this.memberMasterForm, 'benStartDate');
            memberEligHistory.otherStatusFlag = this.memberMasterForm.get('otherSts').value;
            memberEligHistory.pecEndDate = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
            memberEligHistory.mcUserDate1 = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
            memberEligHistory.privacyOn = this.memberMasterForm.get('privacyOn').value === true ? 'Y' : 'N';
            memberEligHistory.riderCode1 = this.memberMasterForm.get('textbox002').value;
            memberEligHistory.riderCode2 = this.memberMasterForm.get('textbox003').value;
            memberEligHistory.riderCode3 = this.memberMasterForm.get('textbox004').value;
            memberEligHistory.riderCode4 = this.memberMasterForm.get('textbox005').value;
            memberEligHistory.riderCode5 = this.memberMasterForm.get('textbox006').value;
            memberEligHistory.riderCode6 = this.memberMasterForm.get('textbox007').value;
            memberEligHistory.riderCode7 = this.memberMasterForm.get('textbox008').value;
            memberEligHistory.riderCode8 = this.memberMasterForm.get('textbox009').value;
            memberEligHistory.riderCode9 = this.memberMasterForm.get('textbox010').value;
            memberEligHistory.riderCode10 = this.memberMasterForm.get('textbox011').value;
            memberEligHistory.riderCode11 = this.memberMasterForm.get('textbox012').value;
            memberEligHistory.riderCode12 = this.memberMasterForm.get('textbox013').value;
            memberEligHistory.riderCode13 = this.memberMasterForm.get('textbox014').value;
            memberEligHistory.riderCode14 = this.memberMasterForm.get('textbox015').value;
            memberEligHistory.riderCode15 = this.memberMasterForm.get('textbox016').value;
            memberEligHistory.riderCode16 = this.memberMasterForm.get('textbox017').value;
            memberEligHistory.riderCode17 = this.memberMasterForm.get('textbox018').value;
            memberEligHistory.riderCode18 = this.memberMasterForm.get('textbox019').value;
            memberEligHistory.riderCode19 = this.memberMasterForm.get('textbox020').value;
            memberEligHistory.riderCode20 = this.memberMasterForm.get('textbox021').value;
            memberEligHistory.relationshipCode = this.memberMasterForm.get('relCode').value;
            memberEligHistory.lineOfBusiness = this.memberMasterForm.get('lob').value;
            memberEligHistory.ipaId = this.memberMasterForm.get('ipa').value;
            memberEligHistory.subscLocation = this.memberMasterForm.get('location').value;
            memberEligHistory.subscDept = this.memberMasterForm.get('dept').value;
            memberEligHistory.reasonCode = this.memberMasterForm.get('reason').value;
            memberEligHistory.csIndicator = this.memberMasterForm.get('csInd').value;
            memberEligHistory.pcpaaOccurred = 'N';
            memberEligHistory.seqSubsId = this.memberMaster.seqSubsId;
            memberEligHistory.rateType = this.memberMasterForm.get('rateType').value;
            memberEligHistory.userDefined1 = this.memberMasterForm.get('rpt1').value;
            memberEligHistory.userDefined2 = this.memberMasterForm.get('rpt2').value;
            memberEligHistory.userDefined3 = this.memberMasterForm.get('rpt3').value;
            memberEligHistory.mcUserDefined1 = this.memberMasterForm.get('residenceProv').value;
            memberEligHistory.mcUserDefined2 = this.memberMasterForm.get('workProv').value;
            memberEligHistory.medRiskUserDefined1 = this.memberMasterForm.get('payrollProv').value;
            memberEligHistory.medRiskUserDefined2 = this.memberMasterForm.get('taxExempt').value;
            this.auditService.setAuditFields(memberEligHistory, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist, seqMembId).subscribe(
                (response) => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editMemberEligHistory = true;
                    this.editMemberMaster = true;
                    this.getMemberMasterBySubscriberId(this.memberMasterForm.get('subscriberId').value);
                    this.valueChanged = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    private deleteMemberEligHistory(seqMembId: number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqMembId).subscribe(
            (response) => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    private getMemberEligHistory(seqMembId: number) {
        this.memberEligHistoryService.getMemberEligHistoryCurrentBySeqMembId(seqMembId).subscribe(
            (memberEligHistory) => {
                if (memberEligHistory) {
                    if (memberEligHistory.subscLocation === 'ARE') {
                        this.displayEmirateCode = true;
                    }
                    this.memberEligHistory = memberEligHistory;
                    this.memberMasterForm.patchValue({
                        subscriberId: this.memberEligHistory.subscriberId,
                        personNo: this.memberEligHistory.personNumber,
                        effDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.effectiveDate),
                        termDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
                        termRsn: this.memberEligHistory.termReason,
                        dateOfDeath: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.dateOfDeath),
                        eligSts: this.memberEligHistory.eligStatus,
                        dynamicText001: this.memberEligHistory.eligStatus === 'Y' ? 'Eligible' : 'Suspended',
                        groupId: this.memberEligHistory.groupId,
                        seqGroupId: this.memberEligHistory.seqGroupId,
                        dynamicText002: this.memberEligHistory.groupShortName,
                        planCode: this.memberEligHistory.planCode,
                        panelId: this.memberEligHistory.panelId,
                        pcpChngRsn: this.memberEligHistory.pcpChangeReason,
                        prov2: this.memberEligHistory.seqProv2Id,
                        hireDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.hireDate),
                        salary: this.memberEligHistory.salary,
                        benStartDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.benefitStartDate),
                        otherSts: this.memberEligHistory.otherStatusFlag,
                        emirateCode: this.memberMaster.userDefined12,
                        pecWaived: this.memberEligHistory.pecWaived === 'Y',
                        pecEndDate: this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.pecEndDate),
                        privacyOn: this.memberEligHistory.privacyOn === 'Y',
                        textbox002: this.memberEligHistory.riderCode1,
                        textbox003: this.memberEligHistory.riderCode2,
                        textbox004: this.memberEligHistory.riderCode3,
                        textbox005: this.memberEligHistory.riderCode4,
                        textbox006: this.memberEligHistory.riderCode5,
                        textbox007: this.memberEligHistory.riderCode6,
                        textbox008: this.memberEligHistory.riderCode7,
                        textbox009: this.memberEligHistory.riderCode8,
                        textbox010: this.memberEligHistory.riderCode9,
                        textbox011: this.memberEligHistory.riderCode10,
                        textbox012: this.memberEligHistory.riderCode11,
                        textbox013: this.memberEligHistory.riderCode12,
                        textbox014: this.memberEligHistory.riderCode13,
                        textbox015: this.memberEligHistory.riderCode14,
                        textbox016: this.memberEligHistory.riderCode15,
                        textbox017: this.memberEligHistory.riderCode16,
                        textbox018: this.memberEligHistory.riderCode17,
                        textbox019: this.memberEligHistory.riderCode18,
                        textbox020: this.memberEligHistory.riderCode19,
                        textbox021: this.memberEligHistory.riderCode20,
                        relCode: this.memberEligHistory.relationshipCode,
                        lob: this.memberEligHistory.lineOfBusiness,
                        ipa: this.memberEligHistory.ipaId,
                        location: this.memberEligHistory.subscLocation,
                        dept: this.memberEligHistory.subscDept,
                        reason: this.memberEligHistory.reasonCode,
                        csInd: this.memberEligHistory.csIndicator,
                        MCareSts: this.memberEligHistory.medicareStatusFlg,
                        rateType: this.memberEligHistory.rateType,
                        rpt1: this.memberEligHistory.userDefined1,
                        rpt2: this.memberEligHistory.userDefined2,
                        rpt3: this.memberEligHistory.userDefined3,
                        residenceProv: this.memberEligHistory.mcUserDefined1,
                        workProv: this.memberEligHistory.mcUserDefined2,
                        payrollProv: this.memberEligHistory.medRiskUserDefined1,
                        taxExempt: this.memberEligHistory.medRiskUserDefined2,
                    }, { emitEvent: false });
                    this.effDate = this.memberEligHistory.effectiveDate;
                    this.relCode = this.memberEligHistory.relationshipCode;
                    this.planCode = this.memberEligHistory.planCode;
                    this.riderCode = this.memberEligHistory.riderCode1 + ',' + this.memberEligHistory.riderCode2;
                    this.seqEligHist = this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist;
                    this.setSearchResults(this.memberEligHistory.groupId);
                } else {
                    this.messageService.findByMessageId(14124).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('14124: ' + message[0].messageText);
                    });
                }
            }
        );
    }

    /**
     * Create Only if user has insert new permission
     * @private
     */
    private createMemberMaster() {
        let groupId = this.memberMasterForm.get('groupId').value;
        let existGroup: any;
        if (groupId) {
            for (let searchGroupData of this.searchGroupData) {
                if (searchGroupData.groupId == groupId) {
                    existGroup = searchGroupData;
                    break;
                }
            }
            if (existGroup) {
                this.memberMasterForm.patchValue({
                    groupId: existGroup.groupId,
                    seqGroupId: existGroup.seqGroupId,
                    dynamicText002: existGroup.shortName,
                }, { emitEvent: false });
            } else if (!existGroup) {
                this.messageService.findByMessageId(80261).subscribe((message: MessageMasterDtl[]) => {
                    this.sharedService.showPopUp('noGroupRecords', '80261: ' + message[0].messageText, 'Member Master', 'OK');
                });
                return;
            }
        }
        this.formValidation.validateForm();
        if (this.memberMasterForm.valid && this.validateMemberEligibility()) {
            let memberMaster = this.memberMaster;
            /**
             * set default values
             */
            memberMaster.securityCode = '0';
            //   memberMaster.cobCoverage = 'N';
            //   memberMaster.primaryDistributionMethod = 'P';

            memberMaster.seqMembId = this.nextSequence.body.seqMembId;
            memberMaster.diamondId = this.memberMasterForm.get('diamondId').value;
            memberMaster.subscriberId = this.memberMasterForm.get('subscriberId').value;
            memberMaster.seqSubsId = this.seqSubsId;
            memberMaster.personNumber = this.memberMasterForm.get('personNo').value;
            memberMaster.dualCoverageFlag = this.memberMasterForm.get('dualCov').value === true ? 'Y' : 'N';
            memberMaster.mcIndicator = this.getMcIndKeyFromDataValue(this.memberMasterForm.get('mcInd').value);
            memberMaster.caseManagementSwitch = this.memberMasterForm.get('caseMgmt').value === true ? 'F' : 'N';
            memberMaster.lastName = this.memberMasterForm.get('lastNm').value;
            memberMaster.firstName = this.memberMasterForm.get('first').value;
            const employmentStatusCode = this.memberMasterForm.get('empStat').value;
            memberMaster.employmentStatusCode = employmentStatusCode ? employmentStatusCode : 'N';
            memberMaster.contactTitle = this.memberMasterForm.get('salutation').value;
            memberMaster.dateOfBirth = Form.getDatePickerValue(this.memberMasterForm, 'dob');
            const gender = this.memberMasterForm.controls['gender'].value;
            memberMaster.gender = gender ? gender : 'U';
            memberMaster.maritalStatus = this.memberMasterForm.get('maritalSts').value;
            memberMaster.addressLine1 = 'R1 Res/Primary';
            memberMaster.medicareNo = this.memberMasterForm.get('medicare').value;
            memberMaster.medicaidNo = this.memberMasterForm.get('medicaid').value;
            memberMaster.userDefined12 = this.memberMasterForm.get('emirateCode').value;
            memberMaster.socialSecNo = this.memberMasterForm.get('socSec').value;
            memberMaster.employeeNo = this.memberMasterForm.get('empNo').value;
            memberMaster.medicalRecNo = this.memberMasterForm.get('medRec').value;
            memberMaster.seqAltMembId = this.memberMasterForm.get('altMembId').value;
            memberMaster.planCode = this.memberMasterForm.get('planCode').value;
            // memberMaster.seqAltMembId = 1;
            memberMaster.holdReason = this.memberMasterForm.get('reason').value;
            memberMaster.languageCode = this.memberMasterForm.get('lang').value;
            memberMaster.middleInitial = this.memberMasterForm.get('mi').value;
            memberMaster.userDefined2 = this.memberMasterForm.get('citizenship').value;
            memberMaster.userDefined1 = this.memberMasterForm.get('occupat').value;

            this.auditService.setAuditFields(memberMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.memberMasterService.createMemberMaster(memberMaster).subscribe(
                (response) => {
                    this.editMemberMaster = false;
                    if (response) {
                        this.memberMaster = response;
                        this.createMemberEligHistory(this.nextSequence.body.seqMembId);
                    }
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    private updateMemberMaster(seqMembId: number) {
        let groupId = this.memberMasterForm.get('groupId').value;
        let existGroup: any;
        if (groupId) {
            for (let searchGroupData of this.searchGroupData) {
                if (searchGroupData.groupId == groupId) {
                    existGroup = searchGroupData;
                    break;
                }
            }
            if (existGroup) {
                this.memberMasterForm.patchValue({
                    groupId: existGroup.groupId,
                    seqGroupId: existGroup.seqGroupId,
                    dynamicText002: existGroup.shortName,
                }, { emitEvent: false });
            } else if (!existGroup) {
                this.messageService.findByMessageId(80261).subscribe((message: MessageMasterDtl[]) => {
                    this.sharedService.showPopUp('noGroupRecords', '80261: ' + message[0].messageText, 'Member Master', 'OK');
                });
                return;
            }
        }
        this.messageService.findByMessageId(90052).subscribe((message: MessageMasterDtl[]) => {
            console.log(message);
        });

        this.formValidation.validateForm();
        if (this.memberMasterForm.valid && this.validateMemberEligibility()) {
            let memberMaster = this.memberMaster;
            memberMaster.diamondId = this.memberMasterForm.get('diamondId').value;
            memberMaster.subscriberId = this.memberMasterForm.get('subscriberId').value;
            memberMaster.personNumber = this.memberMasterForm.get('personNo').value;
            memberMaster.seqSubsId = this.memberMaster.seqSubsId;
            memberMaster.dualCoverageFlag = this.memberMasterForm.get('dualCov').value === true ? 'Y' : 'N';
            memberMaster.mcIndicator = this.getMcIndKeyFromDataValue(this.memberMasterForm.get('mcInd').value);
            memberMaster.dateOfBirth = Form.getDatePickerValue(this.memberMasterForm, 'dob');
            memberMaster.caseManagementSwitch = this.memberMasterForm.get('caseMgmt').value === true ? 'F' : 'N';
            memberMaster.lastName = this.memberMasterForm.get('lastNm').value;
            memberMaster.firstName = this.memberMasterForm.get('first').value;
            memberMaster.employmentStatusCode = this.memberMasterForm.get('empStat').value;
            memberMaster.contactTitle = this.memberMasterForm.get('salutation').value;
            memberMaster.gender = this.memberMasterForm.get('gender').value;
            memberMaster.maritalStatus = this.memberMasterForm.get('maritalSts').value;
            memberMaster.addressLine1 = 'R1 Res/Primary';
            memberMaster.medicareNo = this.memberMasterForm.get('medicare').value;
            memberMaster.medicaidNo = this.memberMasterForm.get('medicaid').value;
            memberMaster.socialSecNo = this.memberMasterForm.get('socSec').value;
            memberMaster.employeeNo = this.memberMasterForm.get('empNo').value;
            memberMaster.medicalRecNo = this.memberMasterForm.get('medRec').value;
            memberMaster.seqAltMembId = this.memberMasterForm.get('altMembId').value;
            memberMaster.holdReason = this.memberMasterForm.get('reason').value;
            memberMaster.languageCode = this.memberMasterForm.get('lang').value;
            memberMaster.middleInitial = this.memberMasterForm.get('mi').value;
            memberMaster.userDefined2 = this.memberMasterForm.get('citizenship').value;
            memberMaster.userDefined1 = this.memberMasterForm.get('occupat').value;
            memberMaster.insertUser = this.memberMaster.insertUser;
            memberMaster.insertProcess = this.memberMaster.insertProcess;
            memberMaster.userDefined12 = this.memberMasterForm.get('emirateCode').value;
            this.auditService.setAuditFields(memberMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(
                (response) => {
                    this.editMemberEligHistory = true;
                    this.updateMemberEligHistory(this.memberEligHistory.seqEligHist, seqMembId);
                    this.editMemberMaster = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    /**
     * Delete Only if user has delete permission
     * @param seqMembId
     * @private
     */
    private deleteMemberMaster(seqMembId: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(
            (response) => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    private getMemberMaster() {
        this.searchStatus = true;
        this.keyValues = this.memberMaster.seqMembId;
        this.memberOtherCoverageService
            .getMemberOtherCoveragesBySeqMembId(this.memberMaster.seqMembId)
            .subscribe(resp => {
                this.cobIndStatus = resp && resp.length > 0;
                this.memberMasterForm.patchValue(
                    {
                        diamondId: this.memberMaster.diamondId,
                        subscriberId: this.memberMaster.subscriberId,
                        personNo: this.memberMaster.personNumber,
                        subsPersonNo: this.memberMaster.subsPersonNumber ? this.memberMaster.subsPersonNumber : this.subsPerson,
                        cobInd: this.cobIndStatus,
                        dob: this.dateFormatPipe.defaultDisplayDateFormat(this.memberMaster.dateOfBirth),
                        dualCov: this.memberMaster.dualCoverageFlag === 'Y',
                        caseMgmt: this.memberMaster.caseManagementSwitch === 'F',
                        lastNm: this.memberMaster.lastName,
                        first: this.memberMaster.firstName,
                        mcInd: this.memberMaster.mcIndicator,
                        empStat: this.memberMaster.employmentStatusCode,
                        salutation: this.memberMaster.contactTitle,
                        gender: this.memberMaster.gender,
                        maritalSts: this.memberMaster.maritalStatus,
                        addrType: 'R1 Res/Primary',
                        medicare: this.memberMaster.medicareNo,
                        medicaid: this.memberMaster.medicaidNo,
                        socSec: this.memberMaster.socialSecNo,
                        empNo: this.memberMaster.employeeNo,
                        medRec: this.memberMaster.medicalRecNo,
                        altMembId: this.memberMaster.seqAltMembId,
                        reason: this.memberMaster.holdReason,
                        lang: this.memberMaster.languageCode,
                        mi: this.memberMaster.middleInitial,
                        citizenship: this.memberMaster.userDefined2,
                        occupat: this.memberMaster.userDefined1,
                        emirateCode: this.memberMaster.userDefined12
                    },
                    { emitEvent: false }
                );
            });

        this.isFormDataModified();
    }

    private getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(
            (memberMasters) => {
                this.memberMasters = memberMasters;
            }
        );
    }

    terminateUnterminate(isTerminate: boolean) {
        const ref = this.modalService.open(
            MemberTerminateUnterminateComponent,
            { size: <any>'xl' }
        );
        ref.componentInstance.showIcon = true;
        ref.componentInstance.seqEligHist = this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist;
        ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
        ref.componentInstance.effectiveDate = this.memberMasterForm.get('effDate').value;
        ref.componentInstance.eligFormTermDate = this.memberMasterForm.get('termDate').value;
        ref.componentInstance.eligFormTermReason = this.memberMasterForm.get('termRsn').value;
        ref.componentInstance.terminateFormData.subscribe((terminateFormData: any) => {
            if (isTerminate && terminateFormData.termDate) {
                this.memberMasterForm.patchValue({
                    termDate: this.dateFormatPipe.defaultDisplayDateFormat(terminateFormData.termDate),
                    termRsn: terminateFormData.termReason
                }, { emitEvent: false });
            } else {
                this.reinstateMemberEligHistory(true);
            }

            let ls_sub_dep_edit_switch = 'Y';

            let lineOfBusiness: LineOfBusinessMaster = null;
            this.lineOfBusinessMasterService.getLineOfBusinessMaster(this.memberEligHistory.lineOfBusiness).subscribe(resp => {
                if (resp && resp.subDepEditSwitch == 'Y') {
                    lineOfBusiness = resp;
                }
                this.getMemberEligHistorys(lineOfBusiness, ls_sub_dep_edit_switch);
            });

            // this.memberEligHistoryService.terminateUnterminateMember(this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist, this.memberMaster.seqMembId, {
            //     termDate: terminateFormData.termDate,
            //     termReason: terminateFormData.termReason
            // }).subscribe(resp => {
            //     this.toastService.showToast('Member status updated successfully', NgbToastType.Success)
            //     this.getMemberEligHistory(this.memberMaster.seqMembId);
            //     this.valueChanged = false;
            // });
        });
    }

    getMemberEligHistorys(lineOfBusiness: LineOfBusinessMaster, ls_sub_dep_edit_switch: string) {
        this.memberEligHistoryService.getMemberEligHistory(this.memberMasterForm.value.subscriberId, this.selectedMember, true)
            .subscribe((memberEligHistories: any) => {
                if (memberEligHistories) {
                    this.memberEligHistorys = memberEligHistories;
                    this.terminateRipple(lineOfBusiness, ls_sub_dep_edit_switch);
                }
            });
    }

    terminateRipple(lineOfBusiness: LineOfBusinessMaster, ls_sub_dep_edit_switch: string) {
        this.memberEligHistoryService.getMemberEligHistoryBySubscriberId(this.memberMaster.subscriberId).subscribe(
            (response) => {
                let memberEligHistorys = response;
                let ls_line_of_business = this.memberEligHistory.lineOfBusiness;
                if (lineOfBusiness) {
                    if (ls_sub_dep_edit_switch = 'Y') {
                        let updated_flag = 'Yes';
                        let termData = '';
                        this.memberMasters.forEach(memberMaster => {
                            if (memberMaster.seqMembId == this.memberMaster.seqMembId) {
                                updated_flag = 'Yes';
                            } else {
                                let ls_dwFind_string = memberMaster.seqMembId;
                                let ll_find_result = memberEligHistorys.find(memElig => memElig.memberEligHistoryPrimaryKey.seqMembId == ls_dwFind_string);
                                if (ll_find_result) {
                                    if (ll_find_result.seqGroupId == this.memberEligHistory.seqGroupId && ll_find_result.planCode == this.memberEligHistory.planCode) {
                                        if ((ll_find_result.termDate > this.memberMasterForm.get('termDate').value ||
                                            ll_find_result.termDate) && ll_find_result.effectiveDate <= this.memberMasterForm.get('effDate').value) {
                                            updated_flag = 'Yes';
                                            let ldec_seq_enrollment_rule_old = ll_find_result.seqEnrollmentRule;
                                            if (ldec_seq_enrollment_rule_old && ldec_seq_enrollment_rule_old != 0) {
                                            }
                                        } else {
                                            updated_flag = 'No';
                                        }
                                    } else {
                                        updated_flag = 'No';
                                    }
                                } else {
                                    updated_flag = 'ERR';
                                }
                            }
                            termData += `\n   ${updated_flag}   ${memberMaster.personNumber}  ${memberMaster.lastName}, ${memberMaster.firstName}`;
                        });
                        if (termData != '') {
                            termData += '.';
                        }
                        this.messageService.findByMessageId(14043).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp('14043: ' + message[0].messageText.replace('@1', termData), 'Member Terminate/Unterminate', 'OK');
                        });
                    }
                } else {
                    this.messageService.findByMessageId(14051).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp('14051: ' + message[0].messageText.replace('@1', ls_line_of_business), 'Member Terminate/Unterminate', 'OK');
                    });
                }
            }
        );
    }

    reinstateMemberEligHistory(isReinitiate: boolean) {
        if (this.memberMasterForm.get('termDate').value !== null && this.memberMasterForm.get('termDate').value !== '' && isReinitiate) {
            const termDate = this.dateFormatPipe.defaultDisplayDateFormat(this.getDatePlusADay(this.memberMasterForm.get('termDate').value.singleDate));
            this.memberMasterForm.get('effDate').setValue(termDate);
            this.memberMasterForm.get('termDate').setValue(null);
            this.memberMasterForm.get('termRsn').setValue(null);

            this.formValidation.validateForm();
            if (this.memberMasterForm.valid && this.validateMemberEligibility()) {
                let memberEligHistory = new MemberEligHistory();
                memberEligHistory.subscriberId = this.memberMasterForm.get('subscriberId').value;
                memberEligHistory.personNumber = this.memberMasterForm.get('personNo').value;
                memberEligHistory.mcUserDefined1 = this.memberMasterForm.get('mcInd').value;
                memberEligHistory.effectiveDate = Form.getDatePickerValue(this.memberMasterForm, 'effDate');
                memberEligHistory.termDate = Form.getDatePickerValue(this.memberMasterForm, 'termDate');
                memberEligHistory.termReason = this.memberMasterForm.get('termRsn').value;
                memberEligHistory.dateOfDeath = Form.getDatePickerValue(this.memberMasterForm, 'dateOfDeath');
                memberEligHistory.eligStatus = this.memberMasterForm.get('eligSts').value;
                memberEligHistory.seqGroupId = this.memberMasterForm.get('seqGroupId').value;
                memberEligHistory.planCode = this.memberMasterForm.get('planCode').value;
                memberEligHistory.panelId = this.memberMasterForm.get('panelId').value;
                memberEligHistory.pcpChangeReason = this.memberMasterForm.get('pcpChngRsn').value;
                memberEligHistory.seqProv2Id = this.memberMasterForm.get('prov2').value;
                memberEligHistory.hireDate = Form.getDatePickerValue(this.memberMasterForm, 'hireDate');
                if (Form.getValue(this.memberMasterForm, 'salary')) {
                    memberEligHistory.salary = parseFloat(Form.getValue(this.memberMasterForm, 'salary').toString().replace(/\$|,/g, ''));
                } else {
                    memberEligHistory.salary = this.memberMasterForm.get('salary').value;
                }
                memberEligHistory.benefitStartDate = Form.getDatePickerValue(this.memberMasterForm, 'benStartDate');
                memberEligHistory.otherStatusFlag = this.memberMasterForm.get('otherSts').value;
                memberEligHistory.pecEndDate = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
                memberEligHistory.mcUserDate1 = Form.getDatePickerValue(this.memberMasterForm, 'pecEndDate');
                memberEligHistory.privacyOn = this.memberMasterForm.get('privacyOn').value === true ? 'Y' : 'N';
                memberEligHistory.riderCode1 = this.memberMasterForm.get('textbox002').value;
                memberEligHistory.riderCode2 = this.memberMasterForm.get('textbox003').value;
                memberEligHistory.riderCode3 = this.memberMasterForm.get('textbox004').value;
                memberEligHistory.riderCode4 = this.memberMasterForm.get('textbox005').value;
                memberEligHistory.riderCode5 = this.memberMasterForm.get('textbox006').value;
                memberEligHistory.riderCode6 = this.memberMasterForm.get('textbox007').value;
                memberEligHistory.riderCode7 = this.memberMasterForm.get('textbox008').value;
                memberEligHistory.riderCode8 = this.memberMasterForm.get('textbox009').value;
                memberEligHistory.riderCode9 = this.memberMasterForm.get('textbox010').value;
                memberEligHistory.riderCode10 = this.memberMasterForm.get('textbox011').value;
                memberEligHistory.riderCode11 = this.memberMasterForm.get('textbox012').value;
                memberEligHistory.riderCode12 = this.memberMasterForm.get('textbox013').value;
                memberEligHistory.riderCode13 = this.memberMasterForm.get('textbox014').value;
                memberEligHistory.riderCode14 = this.memberMasterForm.get('textbox015').value;
                memberEligHistory.riderCode15 = this.memberMasterForm.get('textbox016').value;
                memberEligHistory.riderCode16 = this.memberMasterForm.get('textbox017').value;
                memberEligHistory.riderCode17 = this.memberMasterForm.get('textbox018').value;
                memberEligHistory.riderCode18 = this.memberMasterForm.get('textbox019').value;
                memberEligHistory.riderCode19 = this.memberMasterForm.get('textbox020').value;
                memberEligHistory.riderCode20 = this.memberMasterForm.get('textbox021').value;
                memberEligHistory.relationshipCode = this.memberMasterForm.get('relCode').value;
                memberEligHistory.lineOfBusiness = this.memberMasterForm.get('lob').value;
                memberEligHistory.ipaId = this.memberMasterForm.get('ipa').value;
                memberEligHistory.subscLocation = this.memberMasterForm.get('location').value;
                memberEligHistory.subscDept = this.memberMasterForm.get('dept').value;
                memberEligHistory.reasonCode = this.memberMasterForm.get('reason').value;
                memberEligHistory.csIndicator = this.memberMasterForm.get('csInd').value;
                memberEligHistory.pcpaaOccurred = 'N';
                memberEligHistory.seqSubsId = this.memberMaster.seqMembId;
                // memberEligHistory.medicareStatusFlg = this.memberMasterForm.get('MCareSts').value;
                memberEligHistory.rateType = this.memberMasterForm.get('rateType').value;
                memberEligHistory.userDefined1 = this.memberMasterForm.get('rpt1').value;
                memberEligHistory.userDefined2 = this.memberMasterForm.get('rpt2').value;
                memberEligHistory.userDefined3 = this.memberMasterForm.get('rpt3').value;
                memberEligHistory.mcUserDefined1 = this.memberMasterForm.get('residenceProv').value;
                memberEligHistory.mcUserDefined2 = this.memberMasterForm.get('workProv').value;
                memberEligHistory.medRiskUserDefined1 = this.memberMasterForm.get('payrollProv').value;
                memberEligHistory.medRiskUserDefined2 = this.memberMasterForm.get('taxExempt').value;
                this.auditService.setAuditFields(memberEligHistory, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
                this.memberEligHistoryService.terminateUnterminateMember(this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist,
                    this.memberMaster.seqMembId, this.memberMaster).subscribe((resp: any) => {
                        this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                        this.editMemberEligHistory = true;
                        this.editMemberMaster = true;
                        if (this.screenCloseRequest === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000);
                        }
                        this.valueChanged = false;
                    }
                    );
            } else {
                this.alertMessage = this.alertMessageService.error(
                    'Some required information is missing or incomplete. Please correct your entries and try again.'
                );
            }
        } else {
            this.terminateUnterminate(true);
        }
    }

    getDatePlusADay(jsDate: IMySingleDateModel): Date {
        let processedDate = Form.getDate(jsDate);
        return (processedDate) ? new Date(processedDate.setDate(processedDate.getDate() + 1)) : null;
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberMasterForm = this.formBuilder.group(
            {
                diamondId: [
                    { value: '', disabled: true },
                    { updateOn: 'blur', validators: [Validators.maxLength(12)] },],
                subscriberId: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(12)], },],
                personNo: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(2)], },],
                subsPersonNo: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] }],
                cobInd: ['', { updateOn: 'blur', validators: [] }],
                dualCov: ['', { updateOn: 'blur', validators: [] }],
                caseMgmt: ['', { updateOn: 'blur', validators: [] }],
                mcInd: ['', { updateOn: 'blur', validators: [] }],
                lastNm: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(35)], },],
                first: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] },],
                mi: ['', { updateOn: 'blur', validators: [Validators.maxLength(1)] }],
                empStat: ['', { updateOn: 'blur', validators: [Validators.maxLength(1)] }],
                salutation: ['', { updateOn: 'blur', validators: [Validators.maxLength(5)] }],
                dob: ['', { updateOn: 'blur', validators: [Validators.required] }],
                gender: ['', { updateOn: 'blur', validators: [Validators.required] }],
                maritalSts: ['', { updateOn: 'blur', validators: [] }],
                addrType: ['', { updateOn: 'blur', validators: [Validators.maxLength(55)] }],
                lang: ['', { updateOn: 'blur', validators: [] }],
                occupat: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
                citizenship: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
                medicare: ['', { updateOn: 'blur', validators: [Validators.maxLength(12)] }],
                medicaid: ['', { updateOn: 'blur', validators: [Validators.maxLength(16)] },],
                socSec: ['', { updateOn: 'blur', validators: [Validators.maxLength(9)] },],
                empNo: ['', { updateOn: 'blur', validators: [Validators.maxLength(12)] },],
                medRec: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] },],
                altMembId: ['', { updateOn: 'blur', validators: [] }],
                textbox001: ['', { updateOn: 'blur', validators: [] }],
                effDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
                termDate: ['', { updateOn: 'blur', validators: [] }],
                termRsn: ['', { updateOn: 'blur', validators: [Validators.maxLength(5)] },],
                dateOfDeath: ['', { updateOn: 'blur', validators: [] }],
                eligSts: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)], },],
                dynamicText001: ['', { updateOn: 'blur', validators: [] }],
                relCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
                riders: ['', { updateOn: 'blur', validators: [] }],
                textbox002: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox003: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox004: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox005: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox006: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox007: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox008: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox009: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox010: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                groupId: ['', { updateOn: 'blur', validators: [Validators.required] }],
                seqGroupId: ['', { updateOn: 'blur', validators: [] }],
                planCode: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(10)], },],
                lob: ['', { updateOn: 'blur', validators: [Validators.maxLength(3)] }],
                textbox011: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox012: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox013: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox014: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox015: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox016: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox017: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox018: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox019: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox020: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                textbox021: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                dynamicText002: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
                panelId: ['', { updateOn: 'blur', validators: [Validators.maxLength(3)] },],
                ipa: ['', { updateOn: 'blur', validators: [Validators.maxLength(3)] }],
                pcpId: ['', { updateOn: 'blur', validators: [] }],
                pcpChngRsn: ['', { updateOn: 'blur', validators: [Validators.maxLength(5)] },],
                prov2: ['', { updateOn: 'blur', validators: [] }],
                rpt1: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
                emirateArch: ['', { updateOn: 'blur', validators: [] }],
                dept: ['', { updateOn: 'blur', validators: [Validators.maxLength(20)] },],
                location: ['', { updateOn: 'blur', validators: [Validators.maxLength(20)] },],
                hireDate: ['', { updateOn: 'blur', validators: [] }],
                salary: ['', { updateOn: 'blur', validators: [Validators.maxLength(24)] }],
                mCareSts: ['', { updateOn: 'blur', validators: [Validators.maxLength(11)] },],
                benStartDate: ['', { updateOn: 'blur', validators: [] }],
                otherSts: ['', { updateOn: 'blur', validators: [Validators.maxLength(8)] },],
                emirateCode: ['', { updateOn: 'blur', validators: [] }],
                pecWaived: ['', { updateOn: 'blur', validators: [] }],
                pecEndDate: ['', { updateOn: 'blur', validators: [] }],
                reason: ['', { updateOn: 'blur', validators: [Validators.maxLength(5)] },],
                csInd: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] },],
                rateType: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] },],
                rpt2: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
                rpt3: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
                privacyOn: ['', { updateOn: 'blur', validators: [] }],
                residenceProv: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
                workProv: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
                payrollProv: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
                taxExempt: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            },
            { updateOn: 'submit' }
        );
    }

    private resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onLookupFieldChange(event: any, id: any) {
        if (id && event.key === 'Tab') {
            event.preventDefault();
            this.getMemberMasterBySubscriberId(id);
            this.valueChanged = false;
        } else if (event.key === 'Tab') {
            this.genSubIdAndFillNewMemberForm();
        } else if (event.key === 'F11') {
            this.openAddons();
        }
    }

    genSubIdAndFillNewMemberForm() {
        this.showMemberMasterField = false;
        this.editGroupMaster = false;
        this.messageService.findByMessageId(14039).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('notExist', 'Member Master', '14039: ' + message[0].messageText, 'icon');
            popUpMessage.buttons = [
                new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('no', 'No', 'btn btn-primary'),
            ];
            let ref = this.sharedService.showDialogBox(popUpMessage);
            ref.buttonclickEvent.subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
        });
    }

    onEmpStatusLookupFieldChange(event: any, id: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openEmpStatusLookupFieldSearchModel();
        }
    }

    onChangelastName(event: any, id: any) {
        if (event.key === 'Tab') {
            if (!id) {
                this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('29032: ' + message[0].messageText.replace('@1', 'last_name'), 'Member Master', 'OK');
                });
                const element = this.renderer.selectRootElement('#lastNm');
                setTimeout(() => element.focus(), 50);
            }
        }
    }

    onChangeSocSec(event: any, ssnVal: any) {
        if (event.key === 'Tab') {
            this.ssnRepeatFlag = false;
            this.ssnFamilyCheck = false;
            let len = ssnVal.length;
            let numCheck = new RegExp('^[0-9]*$');
            let firstDigit = parseInt(ssnVal.slice(0, 1));
            let firstThreeDigit = parseInt(ssnVal.slice(0, 3));
            let firstThreeDigitString = ssnVal.slice(0, 3);
            let fourthFifthDigit = parseInt(ssnVal.slice(3, 5));
            let lastFourDigits = parseInt(ssnVal.slice(5, 9));
            let lastThreeDigits = parseInt(ssnVal.slice(6, 9));
            let subscriberId = this.memberMasterForm.get('subscriberId').value;
            let newPersonNum = this.memberMasterForm.get('personNo').value;
            let personNum: string;
            let arrSocSec: string[];
            if (this.memberMasters !== null) {
                this.memberMasters.forEach(element => {
                    if (this.memberMasters[0].socialSecNo !== undefined) {
                        if (element.socialSecNo === ssnVal) {
                            this.ssnFamilyCheck = true;
                            personNum = element.personNumber;
                        }
                    }
                });
            }

            if (ssnVal == null || ssnVal == '') {

                this.focusNextElement(event, 'altMembId');

            } else if (len === 9) {
                if (numCheck.test(ssnVal)) {
                    let arrRepeatSsns: string[] = ['000000000', '111111111', '222222222', '333333333', '444444444', '555555555', '666666666', '777777777', '888888888', '999999999'];
                    for (let index = 0; index < arrRepeatSsns.length; index++) {
                        if (arrRepeatSsns[index].toString() === ssnVal) {
                            this.ssnRepeatFlag = true;
                        }
                    }
                    if (this.ssnRepeatFlag === true) {
                        this.showPopUp('Invalid SSN id ' + ssnVal + ' repeated characters are not valid.'
                            , 'Member Master - SSN Validation', 'OK');
                        this.ssnRepeatFlag = false;
                    } else if (ssnVal === '123456789' || ssnVal === '987654321') {
                        this.showPopUp('Invalid SSN id ' + ssnVal + ' entered'
                            , 'Member Master - SSN Validation', 'OK');
                    } else if (firstDigit === 9) {
                        if (!((firstThreeDigit >= 900) && (firstThreeDigit <= 999))) {
                            this.showPopUp('SSN number does not fall within the ITIN range, The first three characters for an ITIN must & between 900 and 999'
                                , 'Member Master - SSN Validation', 'OK');
                        } else if (!(((fourthFifthDigit >= 70) && (fourthFifthDigit <= 88)) || ((fourthFifthDigit >= 90) && (fourthFifthDigit <= 92)) || ((fourthFifthDigit >= 94) && (fourthFifthDigit <= 99)))) {
                            this.showPopUp('SSN number does not fall within the ITIN range, the 4th & 5th characters cannot be ' + fourthFifthDigit + ' valid are 70-88, 90-92 and 94-99'
                                , 'Member Master - SSN Validation', 'OK');
                        } else if (!((lastFourDigits >= 0) && (lastFourDigits <= 9998))) {
                            this.showPopUp('SSN number does not fall within the ITIN range & last four characters entered ' + lastFourDigits + ' not valid. & valid range 0000 to 9998'
                                , 'Member Master - SSN Validation', 'OK');
                        } else if (this.ssnFamilyCheck === true) {
                            this.showPopUp('SSN cannot be the same for members of the family.'
                                + ' Person "' + personNum + '" and Person "' + newPersonNum + '" defined with same SSN ' + ''
                                , 'Member Master - SSN Validation', 'OK');
                        }
                    } else if (firstDigit !== 9) {
                        if (((firstThreeDigit === 0) || (firstThreeDigit === 666))) {
                            this.showPopUp('SSN cannot start with ' + firstThreeDigitString
                                , 'Member Master - SSN Validation', 'OK');
                        } else if ((fourthFifthDigit == 0)) {
                            this.showPopUp('SSN fourth and fifth character cannot be 00 '
                                , 'Member Master - SSN Validation', 'OK');
                        } else if ((lastFourDigits === 0)) {
                            this.showPopUp('SSN sixth through ninth character cannot be 0000 '
                                , 'Member Master - SSN Validation', 'OK');
                        } else if (this.ssnFamilyCheck === true) {
                            this.showPopUp('SSN cannot be the same for members of the family.'
                                + ' Person "' + personNum + '" and Person "' + newPersonNum + '" defined with same SSN ' + ''
                                , 'Member Master - SSN Validation', 'OK');
                        }
                    }

                } else if (!(numCheck.test(ssnVal))) {
                    this.showPopUp('SSN cannot contain Alpha Characters ' + ssnVal + ' entered'
                        , 'Member Master - SSN Validation', 'OK');
                }
            } else if (len !== 9) {
                if (!(numCheck.test(ssnVal))) {
                    this.showPopUp('SSN cannot contain Alpha Characters ' + ssnVal + ' entered'
                        , 'Member Master - SSN Validation', 'OK');
                } else {
                    this.showPopUp('Field length must be 9 characters invalid length of ' + len + ' characters entered'
                        , 'Member Master - SSN Validation', 'OK');
                }
            }

        }
    }


    private findMemberMasterId(subscriberId: string) {
        this.memberMasterService.findBySubscriberId(subscriberId).subscribe((memberMaster: MemberMaster) => {
            if (memberMaster) {
                this.showMemberMasterField = true;
                this.isSubscriberDisabled = true;
                this.editMemberMaster = true;
                this.popUpMessage = null;
                this.currentValid = true;
                this.searchStatus = true;
            } else {
                this.messageService.findByMessageId(14039).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage('notExist', 'Member Master', '14039: ' + message[0].messageText, 'icon');
                    popUpMessage.buttons = [
                        new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                        new PopUpMessageButton('no', 'No', 'btn btn-primary'),
                    ];
                    let ref = this.sharedService.showDialogBox(popUpMessage);
                    ref.buttonclickEvent.subscribe((event: any) => {
                        if (event.name === 'yes') {
                            this.memberMasterForm.patchValue({
                                'subscriberId': subscriberId,
                                'personNo': '01',
                                'subsPersonNo': '01',
                                'gender': null,
                                'empStat': 'N',
                                'eligSts': 'Y',
                                'dynamicText001': 'Eligible'

                            }, { emitEvent: false });
                            // this.memberMasterForm.get('providerId').disable();
                            this.showMemberMasterField = true;
                            this.isReadonly = false;
                            this.isSubscriberDisabled = true;
                            this.editMemberMaster = false;
                            this.popUpMessage = null;
                            this.currentValid = false;
                        } else {
                            // this.showFields = false;
                        }
                    });
                    this.searchStatus = false;
                });
            }
        }, (error: Error) => {
            this.searchStatus = false;
        });
    }

    planOrRidereLookup(event: any, field: any, type: any) {
        if (event.key === 'F5') {
            let groupId = this.memberMasterForm.get('groupId').value;
            if (groupId != null && groupId) {
                event.preventDefault();
                this.openPlancodeLookupFieldSearchModel(field, type);
            } else {
                this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUps('29032: ' + message[0].messageText.replace('@1', 'group_id'), 'Member Master');
                });
            }
        }
    }

    onPlancodeLookupFieldChange(event: string, field: any, type: any) {
        this.lookupField = field;
        let planOrRiderCodeValue = event;

        if (type === 'P') {
            if (planOrRiderCodeValue && planOrRiderCodeValue != 'null') {
                let isPlanCodeValueAvailable = this.planCodes.find(planCode => planCode.PLAN_RIDER_CODE == planOrRiderCodeValue);
                if (!isPlanCodeValueAvailable) {
                    this.messageService.findByMessageId(14239).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUps('14239: ' + message[0].messageText, 'Member Master', 'OK');
                        this.memberMasterForm.controls[field].reset();
                        let inputText: string = '#' + field;
                        const element = this.renderer.selectRootElement(inputText);
                        element.focus();
                    });
                    return;
                }
            }
        } else if (type === 'R') {
            if (planOrRiderCodeValue && planOrRiderCodeValue != 'null') {
                let isRiderCodeValueAvailable = this.riderCodes.find(riderCode => riderCode.PLAN_RIDER_CODE == planOrRiderCodeValue);
                if (!isRiderCodeValueAvailable) {
                    this.messageService.findByMessageId(14337).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUps('14337: ' + message[0].messageText.replace('@1', planOrRiderCodeValue), 'Member Master', 'OK');
                        this.memberMasterForm.controls[field].reset();
                        let inputText: string = '#' + field;
                        const element = this.renderer.selectRootElement(inputText);
                        element.focus();
                    });
                    return;
                }
            }
        }
    }

    onReasonLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openReasonLookupFieldSearchModel();
        }
    }

    openReasonLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        this.planCodeModel.isMatchAllContracts = true;
        ref.componentInstance.searchModel = this.reasonModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.REASON_CODE) {
                this.memberMasterForm.patchValue({
                    termRsn: res.REASON_CODE,
                })
            }
        });
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.selectedMember = res.personNumber;
            this.getMemberMasterBySubscriberId(res.subscriberId);
            this.showMemberMasterField = true;
            this.isSubscriberDisabled = true;
            this.editMemberMaster = true;
            this.popUpMessage = null;
            this.currentValid = true;
        });
    }

    onAlterMemberLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openAlterMemberLookupFieldSearchModel();
        }
    }

    openAlterMemberLookupFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.memberMasterForm.patchValue({
                    altMembId: res.subscriberId,
                    textbox001: res.personNumber
                });
            }
        });
    }


    openEmpStatusLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.empStatusModel;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.memberMasterForm.patchValue({
                    empStat: res.SYSTEM_CODE,
                });
            }
        });
    }

    onLookupFieldDept = (event: any) => {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldDeptSearchModel();
        } else if (event.key === 'Tab') {
            this.onTabDept(event);
        }
    };

    openLookupFieldDeptSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.deptModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.memberMasterForm.patchValue({
                    dept: res.SYSTEM_CODE,
                });
            }
        });
    }

    openPlancodeLookupFieldSearchModel(value: any, type: any) {
        let groupId = this.memberMasterForm.get('groupId').value;
        let ref = this.modalService.open(SearchboxComponent);
        this.planCodeModel.searchOption = [{ SEQ_GROUP_ID: groupId, RECORD_TYPE: type }];
        this.planCodeModel.isMatchAllContracts = false;
        ref.componentInstance.defaultSearch = [{ index: 1, value: groupId }, { index: 4, value: type }];
        ref.componentInstance.searchModel = this.planCodeModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.PLAN_RIDER_CODE) {
                this.memberMasterForm.get(value).setValue(res.PLAN_RIDER_CODE);
                this.memberMasterForm.get('lob').setValue(res.LINE_OF_BUSINESS, { emitEvent: false });
                this.memberMasterForm.markAsDirty();
            }
        });
    }

    getAllGroupData() {
        this.searchService.getSearchResults(this.groupSearchModel).subscribe(resp => {
            this.searchGroupData = resp;
        });
    }

    onGroupIdKeyup(groupId: any) {
        this.groupIdFieldId = groupId;
    }

    onLookupFieldChangeGroupId(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldGroupIdSearchModel();
        } else if (event.target.value && event.key === 'Tab') {
            this.checkExistingGroupId(event.target.value);
        } else if (!event.target.value && event.key === 'Tab') {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp('29032: ' + message[0].messageText.replace('@1', 'group_id'), 'Member Master', 'OK');
                this.memberMasterForm.controls['groupId'].reset();
                event.target.focus();
                event.target.select();
                this.groupIdFieldId = null;
            });
        }
    }

    checkExistingGroupId(groupId: any): void {
        let existGroup: any;
        if (groupId) {
            for (let searchGroupData of this.searchGroupData) {
                if (searchGroupData.groupId == groupId) {
                    existGroup = searchGroupData;
                }
            }
            if (existGroup) {
                this.groupContractService.findBySeqGroupId(existGroup.seqGroupId).subscribe(
                    (contracts) => {
                        if (contracts) {
                            this.memberMasterForm.patchValue({
                                groupId: existGroup.groupId,
                                seqGroupId: existGroup.seqGroupId,
                                dynamicText002: existGroup.shortName,
                            }, { emitEvent: false });
                            this.setSearchResults(existGroup.groupId);
                        } else {
                            this.messageService.findByMessageId(80264).subscribe((message: MessageMasterDtl[]) => {
                                this.sharedService.showPopUp('noGroupRecords', '80264: ' + message[0].messageText.replace('@1', existGroup.groupId), 'Member Master', 'OK');
                                this.memberMasterForm.controls['groupId'].reset();
                                this.groupIdField.nativeElement.focus();
                                this.groupIdField = null;
                            });
                        }
                    }
                );
            } else {
                this.messageService.findByMessageId(80261).subscribe((message: MessageMasterDtl[]) => {
                    this.sharedService.showPopUp('noGroupRecords', '80261: ' + message[0].messageText, 'Member Master', 'OK');
                    this.memberMasterForm.controls['groupId'].reset();
                    this.groupIdField.nativeElement.focus();
                    this.groupIdField = null;
                });
            }
        }
    }

    nextFocus() {
        const element = this.renderer.selectRootElement('#personNo');
        setTimeout(() => element.focus(), 0);
    }

    /**
     * Generic Search Model
     */
    openLookupFieldGroupIdSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.groupSearchModel;
        ref.componentInstance.showIcon = true;
        if (this.groupIdFieldId != null) {
            ref.componentInstance.typeSearch = { groupId: this.groupIdFieldId, levelCode: '1' };
        } else {
            ref.componentInstance.defaultSearch = [{ index: 2, value: '1' }];
        }
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.groupContractService.findBySeqGroupId(res.seqGroupId).subscribe(
                (contracts) => {
                    if (contracts) {
                        this.memberMasterForm.patchValue({
                            groupId: res.groupId,
                            seqGroupId: res.seqGroupId,
                            dynamicText002: res.shortName,
                        }, { emitEvent: false });
                        this.setSearchResults(res.groupId);
                        this.groupIdFieldId = null;
                    } else {
                        this.messageService.findByMessageId(80264).subscribe((message: MessageMasterDtl[]) => {
                            this.sharedService.showPopUp('noGroupRecords', '80264: ' + message[0].messageText.replace('@1', res.groupId), 'Member Master', 'OK');
                            this.memberMasterForm.controls['groupId'].reset();
                            this.groupIdFieldId = null;
                            this.groupIdField.nativeElement.focus();
                        });
                    }
                }
            );
        });
    }

    addMemberMaster = () => {
        if (this.memberMasterForm.value.subscriberId) {
            if (this.valueChanged) {
                if (!this.editMemberMaster || this.memberMasterForm.dirty) {
                    this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                        let popUpMessage = new PopUpMessage('saveBeforeExit', 'Member Master', '29065: ' + message[0].messageText, 'icon');
                        popUpMessage.buttons = [
                            new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                            new PopUpMessageButton('Cancel', 'Cancel', '')
                        ];
                        popUpMessage.messageType = MessageType.SUCCESS;
                        let ref = this.sharedService.showDialogBox(popUpMessage);
                        ref.buttonclickEvent.subscribe((event: any) => {
                            if (event.name === 'Yes') {
                                this.saveChanges()
                            } else if (event.name === 'No') {
                                this.isSubscriberDisabled = false;
                                this.memberMasterForm.reset({ emitEvent: false });
                                this.selectedMember = null;
                                this.editMemberMaster = false;
                                this.isReadonly = false;
                                this.valueChanged = false;
                                this.showMemberMasterField = false;
                            }
                        });
                    });
                } else {
                    this.isSubscriberDisabled = false;
                    this.memberMasterForm.reset({ emitEvent: false });
                    this.selectedMember = null;
                    this.editMemberMaster = false;
                    this.isReadonly = false;
                    this.valueChanged = false;
                    this.showMemberMasterField = false;
                }
            } else {
                this.memberMasterForm.reset();
                this.memberMasterService.getNextSubscriberId('01').subscribe(res => {
                    this.memberMasterForm.patchValue(
                        {
                            subscriberId: res.poSSeqSubscriberId
                        }
                    )
                })
                this.memberMasterService.getNextSequence().subscribe(
                    (sequence) => {
                        this.nextSequence = sequence;
                        this.seqSubsId = this.nextSequence.body.seqMembId;
                        this.memberMasterForm.patchValue({
                            personNo: '01',
                            subsPersonNo: '01',
                            empStat: 'N',
                            eligSts: 'Y',
                            dynamicText001: 'Eligible',
                            addrType: 'R1 Res/Primary',
                            privacyOn: true
                        }, { emitEvent: false });
                        this.nextFocus();
                        this.currentValid = false;
                    }
                );
                this.showMemberMasterField = true;
                this.isSubscriberDisabled = true;
                this.personNumStatus = false;
                this.valueChanged = true;
                this.isReadonly = false;
            }
        } else {
            this.genSubIdAndFillNewMemberForm();
        }
    };

    showPopUps(message: string, title: string, button = 'Cancel') {
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

    public onTermDateChange(event: any) {
        if (event.target.value.trim()) {
            this.isDisabledTermRsn = false;
            this.focusOnId('#termRsn')
        } else {
            this.isDisabledTermRsn = true;
        }
    };

    public keyDownTermDate(event: any) {
        let dt = event.target.value.trim()
        if (event.key === 'Tab') {
            if (dt.length == 0 || !this.isDate(dt)) {
                event.preventDefault();
                this.focusOnDateOfDeath();
            } else {
                this.isDisabledTermRsn = false
                this.focusOnId('#termRsn')
            }
        }
    }

    public focusOnId(id: string) {
        const element = this.renderer.selectRootElement(id);
        setTimeout(() => element.focus(), 50);
    }


    public focusOnDateOfDeath() {
        setTimeout(() => {
            let field = document.getElementsByName('dateOfDeath');
            if (field) {
                field[0].focus();
            }
        }, 200);
    }

    private isDate(dateStr: string): boolean {
        return !isNaN(new Date(dateStr).getDate());
    }

    isFormDataModified() {
        this.memberMasterForm.valueChanges.subscribe(res => {
            this.valueChanged = true;
        })
    }

    newFormShortcut() {
        this.isSubscriberDisabled = false;
        this.memberMasterForm.reset({ emitEvent: false });
    }

    public handleNotesMenu(action: string) {
        switch (action) {
            case 'Notes': {
                if (this.seqSourceId == -1) {
                    this.messageService.findByMessageId(29005).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp('29005: ' + message[0].messageText, 'Member Master')
                    });
                } else {
                    this.popUpNotesMenuClicked(null);
                }
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, {
            ...NGBModalOptions,
            windowClass: 'dashboard-modal',
            size: <any>'xl',
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }
    onTabDept(event: any) {
        if (event.target.value) {
            let lookup: any = {};
            lookup.isMatch = true;
            lookup.isMatchAllContracts = true;
            lookup.options = [{ 'SYSTEM_CODE_TYPE': 'MELIGDEP', 'SYSTEM_CODE': event.target.value }];

            this.memberMasterService.handleMemberMasterDeptLookup(lookup).subscribe(resp => {
                if (resp) {
                    this.memberMasterForm.patchValue({
                        dept: resp[0].SYSTEM_CODE,
                    });
                } else {
                    event.preventDefault();
                    this.messageService.findByMessageId(14401).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp('14401: ' + message[0].messageText.replace('@1', ''), 'Member Master', 'OK');
                        this.memberMasterForm.controls['dept'].reset();
                        event.target.focus();
                        event.target.select();
                    })
                }
            });
        }
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/MEMBR_Member_Master.htm';
    }

    dobChanged($event: IMyDateModel) {
        let newDate = Date.now() - new Date($event.singleDate.formatted).getTime()
        if (newDate > 3 * 31556952000 && newDate < 89 * 31556952000) {
            this.messageService.findByMessageId(14236).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('overageWarning', 'Member Master', '14236: '
                    + message[0].messageText.replace('@1', '30')
                        .replace('@2', '26').replace('@3', '26'), 'icon');
                popUpMessage.buttons = [
                    new PopUpMessageButton('OK', 'OK', '')
                ];
                popUpMessage.messageType = MessageType.WARNING;
                let ref = this.sharedService.showDialogBox(popUpMessage);
            });
        }
    }

    enableCanadianTaxFields(locationValue?: string) {
        let personNo = this.memberMasterForm.controls['personNo'].value;
        let planCode = this.memberMasterForm.controls['planCode'].value;
        let location = this.memberMasterForm.controls['location'].value;
        let seqGroupId = this.memberMasterForm.controls['seqGroupId'].value;
        let effDate = Form.getDatePickerValue(this.memberMasterForm, 'effDate');
        location = location ? location : locationValue;

        if (personNo && planCode && location && location === 'CAN' && seqGroupId && effDate) {
            this.checkCompanyCodeService.createCheckCompanyCode({
                piNSeqGroupId: seqGroupId,
                piSPlanCode: planCode,
                piDEligEffDate: effDate
            }).subscribe((res: any) => {
                if (res && res.result === 1) {
                    this.memberMasterForm.controls['residenceProv'].enable();
                    this.memberMasterForm.controls['workProv'].enable();
                    this.memberMasterForm.controls['payrollProv'].enable();
                    this.memberMasterForm.controls['taxExempt'].enable();
                } else {
                    this.memberMasterForm.controls['residenceProv'].disable();
                    this.memberMasterForm.controls['workProv'].disable();
                    this.memberMasterForm.controls['payrollProv'].disable();
                    this.memberMasterForm.controls['taxExempt'].disable();
                }
            });
        } else {
            this.memberMasterForm.controls['residenceProv'].disable();
            this.memberMasterForm.controls['workProv'].disable();
            this.memberMasterForm.controls['payrollProv'].disable();
            this.memberMasterForm.controls['taxExempt'].disable();
        }
    }

    private createIdCardOrder() {

        let idCardOrder = new IdCardOrder();
        let format = "yyyy-MM-dd HH:mm:ss";
        idCardOrder.seqEligHist = this.seqEligHist;
        idCardOrder.seqMembId = this.nextSequence.body.seqMembId;
        idCardOrder.printDate = null;
        idCardOrder.printStatus = 'N';
        idCardOrder.orderType = 'A';
        idCardOrder.orderDate = this.datepipe.transform(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), format);
        idCardOrder.seqIdprtId = '';
        idCardOrder.benefitPackageId = this.planpackgeID;
        this.idCardSetupService.createIdCardOrder(idCardOrder).subscribe(
            (response) => {
            }
        );
    }
}
