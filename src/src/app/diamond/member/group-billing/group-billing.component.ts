// Use the Component directive to define the GroupBillingComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

import {DatePipe} from "@angular/common";
import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AgGridEvent, GridApi, GridOptions} from "ag-grid-community";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {NgbToastType} from "ngb-toast";
import {
    GeneralLedgerReference,
    GroupMaster,
    MessageMasterDtl,
    PremiumMaster,
    SecUser,
    SystemCodes
} from "../../../api-models";
import {
    CompanyMasterService,
    DddwDtlService,
    GeneralLedgerReferenceService,
    GroupMasterService,
    MessageMasterDtlService,
    PremiumMasterService,
    SecUserService,
    SystemCodesService
} from "../../../api-services";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {MessageType, PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {DatePickerConfig, NGBModalOptions} from "../../../shared/config";
import {Form} from "../../../shared/helpers/form.helper";
import {GroupBilingLookup} from "../../../shared/lookup/group-billing-lookup";
import {GroupMasterLookup} from "../../../shared/lookup/group-master-lookup";
import {Menu, OPERATIONS, SearchModel} from "../../../shared/models/models";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {CONSTANTS, getGroupBillingShortcutKeys, SharedService} from "../../../shared/services/shared.service";
import {ToastService} from "../../../shared/services/toast.service";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {GroupMasterComponent} from '../group-master/group-master.component';
import {GroupDetailComponent} from '../group-detail/group-detail.component';
import {GroupContractComponent} from '../group-contract/group-contract.component';
import {Router} from '@angular/router';
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {GROUP_PANNEL_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {InputComponent} from "../../../shared/components/input/input.component";
import {AccountInformationComponent} from "../account-information/account-information.component";
import {PremiumMatrixHeadersLookup} from "../../../shared/lookup/premium-matrix-headers-lookup";
import {NgxSpinnerService} from "ngx-spinner";
import {PremiumMatrixHeaderService} from "../../../api-services/premium-matrix-header.service";
import {SearchService} from "../../../shared/services/search.service";
import {AuditService} from "../../../shared/services/audit.service";
import {HelpComponent} from "../help/help.component";
import {GroupPanelComponent} from '../group-panel/group-panel.component';
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuthenticationService} from "../../../api-services/authentication.service";
import { NotesComponent } from "../../../shared/components/notes/notes.component";

@Component({

    selector: 'groupbilling',
    templateUrl: './group-billing.component.html',
    styleUrls: ['./group-billing.component.scss'],
    providers: [
        CompanyMasterService,
        CustomValidators,
        DateFormatPipe,
        DatePipe,
        DddwDtlService,
        GroupMasterService,
        Mask,
        PremiumMasterService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
        PremiumMatrixHeaderService,
        SearchService
    ]

})
export class GroupBillingComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public faSearch = faSearch;
    public groupBillingForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public dataGridGridOptions: GridOptions;
    public showGroupField: boolean = false;
    public groupMasterExists = false;
    public levels: any[] = [];
    public frequencies: any[] = [];
    public rateFreezes: any[] = [];
    public prorations: any[] = [];
    public billTypes: any[] = [];
    public recordTypes: any[] = [];
    public tieringMethods: any[] = [];
    public companyMasters: any[] = [];
    public adminGLRefValues: GeneralLedgerReference[] = [];
    public adminFeeLevelValues: SystemCodes[] = [];
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];

    private searchModel = new SearchModel('groupmasters/lookup', GroupBilingLookup.GROUP_BILLING_ALL, GroupMasterLookup.GROUP_MASTER_DEFAULT, []);
    private dataGridgridApi: GridApi;
    private dataGridgridColumnApi: any;
    private groupMasters: GroupMaster[];
    private premiumMaster: PremiumMaster;
    private premiumMasters: PremiumMaster[];

    secWin: SecWinViewModel;
    windowId = 'GRUPB';
    userTemplateId: string;
    memberModuleId = GROUP_PANNEL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    isNewRecord = true;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    public seqSourceId: number = -1;

    MatrixDefSearchModal = new SearchModel(
        'premiummatrixheaders/lookup',
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_HEADERS_BILLING,
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_HEADERS_BILLING,
        []);

    @Input() groupId: any;
    @Input() showIcon: boolean = false;
    @Input() groupDetailStatus : boolean = false;
    @Input() groupMaster: GroupMaster;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    searchStatus: boolean = false;
    disableDC: boolean = true;
    isMatrixDefEnabled: boolean = true;
    menuOpened = ""
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private auditService: AuditService,
        private mask: Mask,
        private router: Router,
        private searchService: SearchService,
        private customValidators: CustomValidators, private companyMasterService: CompanyMasterService,
        private alertMessageService: AlertMessageService, private cdr: ChangeDetectorRef,
        private dddwDtlService: DddwDtlService, private modalService: NgbModal,
        private dateFormatPipe: DateFormatPipe, private toastService: ToastService,
        private groupMasterService: GroupMasterService, private premiumMasterService: PremiumMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private generalLedgerReferenceService: GeneralLedgerReferenceService,
        private systemCodesService: SystemCodesService,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private premiumMatrixHeaderService: PremiumMatrixHeaderService,
        private renderer: Renderer2,
        private sharedService: SharedService,
        private authenticationService: AuthenticationService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState() {
        this.menuInit();
        this.getLevels();
        this.getFrequencies();
        this.getRateFreezes();
        this.getProrations();
        this.getBillTypes();
        this.getRecordTypes();
        this.getTieringMethods();
        this.getCompanyMasters();
        this.getAdminGLRefValues();
        this.getAdminFeeLevelValues();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupBillingForm);
        this.createDataGrid();
        if (this.groupId) {
            this.groupBillingForm.patchValue({
                groupId: this.groupId
            },{emitEvent: false});
            this.getGroupMasterByGroupId(this.groupId);
        }
    }

    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openFileMenu(){
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openHelpMenu(){
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowsMenu(){
        document.getElementById("fileDropdownWindows").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindows"
    }

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownTopic") {
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
                    case 'a':
                         obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Alias/Responsible Party/Privacy'
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
            }
            if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'l':
                        this.openLookupFieldSearchModel()
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Edit Paid Through Date'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'b':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Edit Billed Through Date'
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
                        'You are not Permitted to view Group Billing',
                        'Group Billing Permission'
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
        this.secColDetailService.findByTableNameAndUserId('GROUP_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.secColDetailService.findByTableNameAndUserId('PREMIUM_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails.push(JSON.parse(JSON.stringify(resp))); // make copy of array for changes detection in directive
        });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getGroupBillingShortcutKeys(this));
        this.cdr.detectChanges();
    }

    public getGroupMasterByGroupId(groupId: number): void {
        this.groupMasterService.getBillingGroupMasterByGroupId(groupId).subscribe((groupMaster: any) => {
            if (groupMaster) {
                this.groupMasterExists = true;
                this.popUpMessage = null;
                this.showGroupField = true;
                this.groupMaster = groupMaster;
                this.populatePremiumMasterGrid(groupMaster.seqGroupId);
                this.patchGroupMasterDetail(groupMaster);
                this.searchStatus = true;
            } else {
                this.groupBillingForm.patchValue({
                    adultDepAge:'0.0'
                })
                this.messageService.findByMessageId(13100).subscribe( res => {
                    this.showPopUp('13100: ' + res[0].messageText, 'Group')
                })
            }

        }, error => {
            this.showGroupField = false;
            this.groupMasterExists = false;
            let ref = this.modalService.open(PopUpMessageComponent, {backdrop: false});
            ref.componentInstance.showIcon = true;
            this.messageService.findByMessageId(13034).subscribe(res => {
                let message: PopUpMessage = new PopUpMessage('groupNotExistPopup', 'Group Billing',
                    '13034: ' + res[0].messageText,
                    'info', [], MessageType.ERROR, false);
                      this.groupBillingForm.patchValue({
                    adultDepAge:'0.0'
                })
                message.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                ref.componentInstance.popupMessage = message;
                this.searchStatus = false;
                this.popupClose = false;
            })

        });
    }

    public onLookupFieldChange(event: any): void {
        this.groupMasterExists = false;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'Open': {
                   this.resetAll();
                    break;
                }
                case 'Save': {
                    this.saveGroupMaster();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case "Exit": {
                    this.exitScreen();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            switch (event.action) {
                case 'Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
            }
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
           this.handleSpecialMenu(event.action);// handle special-Menu Actions
        } else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);// handle special-Menu Actions
        } else if (event.menu.menuItem === 'Notes') {
            if (this.seqSourceId == -1) {
                this.messageService.findByMessageId(29005).subscribe(res => {
                    this.showPopUp('29005: '+ res[0].messageText, 'DIAMOND@ Client/Server System')
                })
            } else {
                this.popUpNotesMenuClicked(event.action);// handle special-Menu Actions
            }
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case 'Show Timestamp':
                    if (this.groupBillingForm.get('groupId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                case 'Audit Display':
                    this.toastService.showToast('Action was not implemented', NgbToastType.Danger);
                    break;
                default : {
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
        handleSpecialMenu(action: string) {
         switch (action) {
                case 'Group Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
                case 'Edit Billed Through Date': {

                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_GROUP_BL_THRU);
                    if (status) {
                        if (this.searchStatus) {
                            const ref = this.modalService.open(InputComponent, {windowClass: 'input-class'});
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.passedType = 'date';
                            ref.componentInstance.labelText = 'Billed Through Date';
                            ref.componentInstance.title = 'Edit Billed Through Date';
                            ref.componentInstance.passedValue = this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.billedThroughDate);
                            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                                this.groupMaster.billedThroughDate = this.datePipe.transform(event,"MM/dd/yyyy");
                                this.groupBillingForm.patchValue({
                                    'billedThrough': this.datePipe.transform(event,"MM/dd/yyyy")
                                },{emitEvent: false});
                            })
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
                            });
                        }

                    }
                    else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                        });
                    }

                    break;
                }
                case 'Edit Paid Through Date': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_GROUP_PD_THRU);
                    if (status) {
                        if (this.searchStatus) {
                            const ref = this.modalService.open(InputComponent, {windowClass: 'input-class'});
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.passedType = 'date';
                            ref.componentInstance.labelText = 'Paid Through Date';
                            ref.componentInstance.title = 'Edit Paid Through Date';
                            ref.componentInstance.passedValue = this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.paidThroughDate);
                            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                                this.groupMaster.paidThroughDate = this.datePipe.transform(event,"MM/dd/yyyy");
                                this.groupBillingForm.patchValue({
                                    'paidThrough': this.datePipe.transform(event,"MM/dd/yyyy")
                                },{emitEvent: false});
                            })
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
                            });
                        }
                    }
                    else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                        });
                    }

                    break;
                }

                case 'D/C Information': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DC_INFO);
                    if (status) {
                        if (this.searchStatus) {
                            let ref = this.modalService.open(AccountInformationComponent);
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.groupMaster = this.groupMaster;
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
                            });
                        }
                    }
                    else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                        });
                    }
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
                ref.componentInstance.groupId = this.groupBillingForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Contracts": {
                this.openGroupContract();
                this.activeModal.close();
                break;
            }
            case "Detail": {
                if (this.groupMaster && (this.groupMaster.levelCode == '3' || this.groupMaster.levelCode == '2')) {
                    this.toastService.showToast('13062: Detail not allowed for non level 1 Group Types', NgbToastType.Danger);
                } else {
                    this.openGroupDetails();
                }
                this.activeModal.close();
                break;
            }
            case "Billing Control": {
                let ref = this.modalService.open(GroupBillingComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupBillingForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Panel": {
                let ref = this.modalService.open(GroupPanelComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupBillingForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    popUpNotesMenuClicked(action: string) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }

    openGroupContract() {

        let ref = this.modalService.open(GroupContractComponent, {size: <any>'xl'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupId = this.groupBillingForm.get('groupId').value;
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe((groupMaster: GroupMaster) => {
                if (this.router.isActive('/diamond/member/group-master', false) == false) {
                    this.saveGroupMaster();
                }
            })
        }
    }

    openGroupDetails() {
        let ref = this.modalService.open(GroupDetailComponent, {size: <any>'xl'});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupId = this.groupBillingForm.get('groupId').value;
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe((groupMaster: GroupMaster) => {
                if (this.router.isActive('/diamond/member/group-master', false) == false) {
                    this.saveGroupMaster();
                }
            })
        }
    }

    private openLookupFieldSearchModel(): void {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.groupBillingForm.patchValue({
                groupId: res.groupId
            },{emitEvent: false});
            this.searchStatus = true;
            this.getGroupMasterByGroupId(res.groupId);
        })
    }

    private patchGroupMasterDetail(groupMaster: GroupMaster): void {
        this.premiumMasterService.findByGroupId(groupMaster.seqGroupId).subscribe(res => {
             if (res && res.length) {
                 this.groupBillingForm.get('groupId').disable();
                 this.groupMaster = groupMaster;
                 if (this.groupMaster && this.groupMaster.useEftFlg) {
                     this.enableDCInfo(true);
                 } else {
                     this.enableDCInfo(false);
                 }
                 /*let commonBillingDate: IMyDateModel = this.groupMaster.commonBillingDate ? {
                     isRange: false,
                     singleDate: {jsDate: new Date(this.groupMaster.commonBillingDate)},
                     dateRange: null
                 } : null;*/

                 this.groupBillingForm.patchValue({
                     'groupId': this.groupMaster.groupId,
                     'dynamicText': this.groupMaster.shortName,
                     'billTo': this.groupMaster.groupType,
                     'billType': this.groupMaster.groupType,
                     'frequency': this.groupMaster.billingFrequency,
                     'billedThrough': this.groupMaster.billedThroughDate ? this.datePipe.transform(this.groupMaster.billedThroughDate, 'MM/dd/yyyy') : null,
                     'cycle': this.groupMaster.billingCycle,
                     'grace': this.groupMaster.gracePeriod,
                     'paidThrough': this.groupMaster.paidThroughDate ? this.datePipe.transform(this.groupMaster.paidThroughDate, 'MM/dd/yyyy') : null,
                     'rateFreezeCalc': this.groupMaster.rateFreezeCalc,
                     'proration': this.groupMaster.prorationMethod,
                     'adultDepAge': (this.groupMaster.adultDepAgeParam && this.groupMaster.adultDepAgeParam > 0) ?
                         Number(this.groupMaster.adultDepAgeParam).toFixed(1): '0.0',
                     'retroMonths': this.groupMaster.noOfRetroMonths,
                     'commonBillingDate': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.commonBillingDate),
                     'reportPrintFormat': this.groupMaster.invoicePrintFormat,
                     'useEft': this.groupMaster.useEftFlg == 'Y',
                     'maxNoDeps': this.groupMaster.maxDependentsCharge
                 }, {emitEvent: false});

                 if (this.groupMaster && (this.groupMaster.groupType === '4' || this.groupMaster.billedThroughDate === undefined ||
                     this.groupMaster.billedThroughDate === null ) && (this.groupMaster.rateFreezeCalc === undefined ||
                     this.groupMaster.rateFreezeCalc === null || this.groupMaster.rateFreezeCalc.length === 0) && this.groupMaster.effectiveDate &&
                    !this.groupBillingForm.value.billedThrough) {
                     let effDate = new Date(this.datePipe.transform(this.groupMaster.effectiveDate));
                     effDate.setDate(effDate.getDate() - 1);
                     this.groupBillingForm.patchValue({
                         billedThrough: this.datePipe.transform(effDate, 'MM/dd/yyyy')
                     });
                 }
             } else {
                 this.groupBillingForm.get('groupId').disable();
                 this.groupMaster = groupMaster;
                 if (this.groupMaster && this.groupMaster.useEftFlg) {
                     this.enableDCInfo(true);
                 } else {
                     this.enableDCInfo(false);
                 }

                 /*let commonBillingDate: IMyDateModel = this.groupMaster.commonBillingDate ? {
                     isRange: false,
                     singleDate: {jsDate: new Date(this.groupMaster.commonBillingDate)},
                     dateRange: null
                 } : null;*/

                 this.messageService.findByMessageId(13034).subscribe(res => {
                     let popUpMessage = new PopUpMessage(
                         'popUpMessageName',
                         'Group Billing',
                         '13034: ' + res[0].messageText,
                         'icon');
                     popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Ok', ''));
                     let ref = this.modalService.open(PopUpMessageComponent);
                     ref.componentInstance.showIcon = true;
                     ref.componentInstance.popupMessage = popUpMessage;
                     ref.componentInstance["buttonclickEvent"].subscribe((resp: any) => {
                         this.groupBillingForm.patchValue({
                             'groupId': this.groupMaster.groupId,
                             'dynamicText': this.groupMaster.shortName,
                             'billTo': this.groupMaster.groupType,
                             'billType': this.groupMaster.groupType,
                             'frequency': this.groupMaster.billingFrequency,
                             'billedThrough': this.groupMaster.billedThroughDate,
                             'cycle': this.groupMaster.billingCycle,
                             'grace': this.groupMaster.gracePeriod,
                             'paidThrough': this.groupMaster.paidThroughDate,
                             'rateFreezeCalc': this.groupMaster.rateFreezeCalc,
                             'proration': this.groupMaster.prorationMethod,
                             'adultDepAge': this.groupMaster.adultDepAgeParam ? Number(this.groupMaster.adultDepAgeParam).toFixed(1): '',
                             'retroMonths': this.groupMaster.noOfRetroMonths,
                             'commonBillingDate': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.commonBillingDate),
                             'reportPrintFormat': this.groupMaster.invoicePrintFormat,
                             'useEft': this.groupMaster.useEftFlg === 'Y' ? true : false,
                             'maxNoDeps': this.groupMaster.maxDependentsCharge

                         }, {emitEvent: false});

                         if (this.groupMaster && this.groupMaster.groupType === '4' && (this.groupMaster.rateFreezeCalc === null ||
                             this.groupMaster.rateFreezeCalc.length === 0) && this.groupMaster.effectiveDate) {
                             let effDate = new Date(this.datePipe.transform(this.groupMaster.effectiveDate));
                             effDate.setDate(effDate.getDate() - 1);
                             this.groupBillingForm.patchValue({
                                 billedThrough: this.datePipe.transform(effDate, 'MM/dd/yyyy')
                             });
                         }
                     });
                 })
             }
        });
    }

    public popUpButtonHandler(button: PopUpMessageButton): void {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    private popupMessageHandler(button: PopUpMessageButton): void {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    public saveGroupMaster(): void {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            let rateFreezeCalc: any = Form.getValue(this.groupBillingForm, 'rateFreezeCalc');
            let retroMonths: any = Form.getValue(this.groupBillingForm, 'retroMonths');
            let adultDepAge: any = Form.getValue(this.groupBillingForm, 'adultDepAge');
            let proration: any = Form.getValue(this.groupBillingForm, 'proration');
            let groupType: any = this.groupMaster.groupType;
            let billType: any = this.groupBillingForm.get('billType').value;
            let matrixDef: any = Form.getValue(this.groupBillingForm, 'matrixDef');
            let adminFeeLevel: any = this.groupBillingForm.get('adminFeeLevel').value;
            let pctOfMatrix: any = this.groupBillingForm.get('pctOfMatrix').value? this.groupBillingForm.get('pctOfMatrix').value.replace('%', ''): "";
            if (pctOfMatrix) {
                pctOfMatrix = pctOfMatrix / 100;
                this.groupBillingForm.controls['pctOfMatrix'].setValue(pctOfMatrix);
            }
            this.formValidation.validateForm();
            if(!rateFreezeCalc) {
                this.messageService.findByMessageId(27129).subscribe( res => {
                    this.showPopUp('27129: ' + res[0].messageText, 'Group Billing');
                });
                return;
            }
            if(retroMonths < 0 || retroMonths > 24) {
                this.messageService.findByMessageId(13173).subscribe( res => {
                    this.showPopUp('13173: ' + res[0].messageText, 'Group Billing');
                });
                return;
            }
            if(adultDepAge < 0) {
                this.messageService.findByMessageId(13037).subscribe( res => {
                    this.showPopUp('13037: ' + res[0].messageText, 'Group Billing');
                });
                return;
            }
            if((billType == 2 || billType == 3) && adminFeeLevel != 'S') {
                this.messageService.findByMessageId(13051).subscribe( res => {
                    this.showPopUp('13051: ' + res[0].messageText, 'Group Billing');
                });
                return;
            }
            if(this.isMatrixDefEnabled) {
                if(!matrixDef) {
                    this.messageService.findByMessageId(13047).subscribe( res => {
                        this.showPopUp('13047: ' + res[0].messageText, 'Group Billing');
                    });
                    return;
                }
            }
            if(groupType == 3) {
                if(proration == 1 || proration == 2) {
                    this.messageService.findByMessageId(13039).subscribe( res => {
                        this.showPopUp('13039: ' + res[0].messageText, 'Group Billing');
                    });
                    return;
                }
            } else if(groupType == 4) {
                if(proration == 0 || proration == 3) {
                    this.messageService.findByMessageId(13038).subscribe( res => {
                        this.showPopUp('13038: ' + res[0].messageText, 'Group Billing');
                    });
                    return;
                }
            }

            if(isNaN(pctOfMatrix) || (pctOfMatrix < 0  && pctOfMatrix > 9.9999)) {
                this.messageService.findByMessageId(13049).subscribe( res => {
                    this.showPopUp('13049: ' + res[0].messageText, 'Group Billing');
                });
                return;
            }

            if (this.groupBillingForm.valid) {
                this.groupMaster.groupId = Form.getValue(this.groupBillingForm, 'groupId');
                this.groupMaster.billingBatch = Form.getValue(this.groupBillingForm, 'billTo') ? Form.getValue(this.groupBillingForm, 'billTo').trim() : null;
                this.groupMaster.billingFrequency = Form.getValue(this.groupBillingForm, 'frequency');
                this.groupMaster.billedThroughDate = Form.getFormattedDateFromStrDate(this.groupBillingForm, 'billedThrough');
                this.groupMaster.billingCycle = Form.getValue(this.groupBillingForm, 'cycle');
                this.groupMaster.gracePeriod = Form.getValue(this.groupBillingForm, 'grace');
                this.groupMaster.paidThroughDate = Form.getFormattedDateFromStrDate(this.groupBillingForm, 'paidThrough');
                this.groupMaster.rateFreezeCalc = Form.getValue(this.groupBillingForm, 'rateFreezeCalc');
                this.groupMaster.prorationMethod = Form.getValue(this.groupBillingForm, 'proration');
                this.groupMaster.adultDepAgeParam = Form.getValue(this.groupBillingForm, 'adultDepAge');
                this.groupMaster.noOfRetroMonths = Form.getValue(this.groupBillingForm, 'retroMonths');
                this.groupMaster.invoicePrintFormat = Form.getValue(this.groupBillingForm, 'reportPrintFormat');
                this.groupMaster.useEftFlg = Form.getValue(this.groupBillingForm, 'useEft') ? 'Y' : 'N';
                this.groupMaster.maxDependentsCharge = Form.getValue(this.groupBillingForm, 'maxNoDeps');
                /*let commonBillingDate: IMyDateModel = Form.getValue(this.groupBillingForm, "commonBillingDate");
                this.groupMaster.commonBillingDate = this.datePipe.transform(commonBillingDate.singleDate != null ? commonBillingDate.singleDate.jsDate : null, 'yyyy-MM-dd');*/
                this.groupMaster.commonBillingDate = Form.getDatePickerValue(this.groupBillingForm, 'commonBillingDate');

                this.auditService.setAuditFields(this.groupMaster, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);

                if (this.groupBillingForm.get('tieringMethod').dirty || this.groupBillingForm.get('adminFee').dirty ||
                        this.groupBillingForm.get('adminGlref').dirty || this.groupBillingForm.get('adminFeeLevel').dirty ||
                        this.groupBillingForm.get('matrixDef').dirty || this.groupBillingForm.get('adminCompcode').dirty ||
                        this.groupBillingForm.get('acrossTheBoard').dirty || this.groupBillingForm.get('pctOfMatrix').dirty ||
                        this.groupBillingForm.get('rate1').dirty || this.groupBillingForm.get('rate2').dirty ||
                        this.groupBillingForm.get('rate3').dirty || this.groupBillingForm.get('rate4').dirty ||
                        this.groupBillingForm.get('rate5').dirty || this.groupBillingForm.get('rateUpdatedOn').dirty) {
                    this.messageService.findByMessageId(13178).subscribe((message: MessageMasterDtl[]) => {
                        let popUpMessage = new PopUpMessage('billRateRetro', 'Member Master', '13178: ' + message[0].messageText, 'icon');
                        popUpMessage.buttons = [
                            new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('No', 'No', 'btn btn-primary')
                        ];
                        popUpMessage.messageType = MessageType.SUCCESS;
                        let ref = this.sharedService.showDialogBox(popUpMessage);
                        ref.buttonclickEvent.subscribe((event: any) => {
                            if (event.name === 'Yes') {
                                this.groupMasterService.updateGroupMaster(this.groupMaster, this.groupMaster.seqGroupId).subscribe(response => {
                                    if (!this.isNewRecord) {
                                        this.savePremiumMaster();
                                    }
                                });
                            } else if (event.name === 'No') {
                                this.groupMasterService.updateGroupMaster(this.groupMaster, this.groupMaster.seqGroupId).subscribe(response => {
                                    if (!this.isNewRecord) {
                                        this.savePremiumMaster();
                                    }
                                });
                            }
                        });
                    });
                } else {
                    this.groupMasterService.updateGroupMaster(this.groupMaster, this.groupMaster.seqGroupId).subscribe(response => {
                        this.savePremiumMaster();
                    });
                }
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        }
    }

    public savePremiumMaster(): void {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            this.formValidation.validateForm();
            if (this.groupBillingForm.valid) {
                this.spinner.show();
                let adminFee: any = this.groupBillingForm.get('adminFee').value;
                adminFee = adminFee? adminFee.toString().replace('$',''):"";
                let rate1: any = this.groupBillingForm.get('rate1').value;
                rate1 = rate1? rate1.toString().replace('$','').replace(',',''):"";
                let rate2: any = this.groupBillingForm.get('rate2').value;
                rate2 = rate2 ? rate2.toString().replace('$','').replace(',',''):"";
                let rate3: any = this.groupBillingForm.get('rate3').value;
                rate3 = rate3? rate3.toString().replace('$','').replace(',',''):"";
                let rate4: any = this.groupBillingForm.get('rate4').value;
                rate4 = rate4? rate4.toString().replace('$','').replace(',',''):"";
                let rate5: any = this.groupBillingForm.get('rate5').value;
                rate5 = rate5 ? rate5.toString().replace('$','').replace(',',''):"";

                this.premiumMaster.matrixDef = Form.getValue(this.groupBillingForm, 'matrixDef');
                this.premiumMaster.tieringMethod = Form.getValue(this.groupBillingForm, 'tieringMethod');
                this.premiumMaster.adminFee = adminFee;
                this.premiumMaster.adFeeCompCode = Form.getValue(this.groupBillingForm, 'adminCompcode');
                this.premiumMaster.commissionGlRefCode = Form.getValue(this.groupBillingForm, 'adminGlref');
                this.premiumMaster.adFeeLevelCode = Form.getValue(this.groupBillingForm, 'adminFeeLevel');
                this.premiumMaster.pctOfMatrix = Form.getValue(this.groupBillingForm, 'pctOfMatrix')? Form.getValue(this.groupBillingForm, 'pctOfMatrix'):"";
                this.premiumMaster.rate1 = rate1;
                this.premiumMaster.rate2 = rate2;
                this.premiumMaster.rate3 = rate3;
                this.premiumMaster.rate4 = rate4;
                this.premiumMaster.rate5 = rate5;
                this.premiumMaster.securityCode = 0;
                this.premiumMaster.rateCategory = this.groupBillingForm.get('acrossTheBoard').value == true ? 1: 0;
                this.premiumMaster.rateModifyDate = new Date();
                this.auditService.setAuditFields(
                    this.premiumMaster,
                    sessionStorage.getItem("user"),
                    this.windowId,
                    OPERATIONS.UPDATE
                );

                this.premiumMasterService.updatePremiumMaster(this.premiumMaster, this.premiumMaster.premiumMasterPrimaryKey.seqPremId, this.premiumMaster.premiumMasterPrimaryKey.seqGroupId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.getGroupMasterByGroupId(Form.getValue(this.groupBillingForm, 'groupId'));
                    this.groupBillingForm.markAsUntouched();
                    this.spinner.hide()
                });
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.spinner.hide()
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        }
    }

    private populatePremiumMasterGrid(seqGroupId: number): void {
        this.seqSourceId = seqGroupId;
        this.premiumMasterService.findByGroupId(seqGroupId).subscribe(premiumMasters => {
            this.premiumMasters = premiumMasters;
            if (this.premiumMasters && this.premiumMasters.length > 0) {
                this.dataGridGridOptions.api.setRowData(this.premiumMasters);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            } else {
                this.dataGridGridOptions.api.setRowData([]);
            }
            setTimeout(() =>{
                this.popupClose = false;
            }, 1000);
        });
    }

    private patchPremiumMasterDetail(premiumMaster: PremiumMaster): void {
        this.premiumMaster = premiumMaster;
        this.groupBillingForm.patchValue({
            'commissionMatrixDef': this.premiumMaster.commissionMatrixDef,
            'tieringMethod': this.premiumMaster.tieringMethod ? this.premiumMaster.tieringMethod.trim() : null,
            'adminFee': this.premiumMaster.adminFee,
            'adminGlref': this.premiumMaster.commissionGlRefCode,
            'adminFeeLevel': this.premiumMaster.adFeeLevelCode,
            'matrixDef': this.premiumMaster.matrixDef,
            'adminCompcode': this.premiumMaster.adFeeCompCode,
            'acrossTheBoard': this.premiumMaster.rateCategory == 1,
            'pctOfMatrix': isNaN(this.premiumMaster.pctOfMatrix) ? "":((this.premiumMaster.pctOfMatrix * 100.00).toFixed(2) + "%"),
            'rate1': (this.premiumMaster.rate1 && this.premiumMaster.rate1 >= 0) ? Number(this.premiumMaster.rate1).toFixed(2) : null,
            'rate2': (this.premiumMaster.rate2 && this.premiumMaster.rate2 >= 0) ? Number(this.premiumMaster.rate2).toFixed(2) : null,
            'rate3': (this.premiumMaster.rate3 && this.premiumMaster.rate3 >= 0) ? Number(this.premiumMaster.rate3).toFixed(2) : null,
            'rate4': (this.premiumMaster.rate4 && this.premiumMaster.rate4 >= 0) ? Number(this.premiumMaster.rate4).toFixed(2) : null,
            'rate5': (this.premiumMaster.rate5 && this.premiumMaster.rate5 >= 0) ? Number(this.premiumMaster.rate5).toFixed(2) : null,
            'rateUpdatedOn': this.premiumMaster.updateDatetime ? this.datePipe.transform(this.premiumMaster.updateDatetime, 'MM/dd/yyyy') : this.datePipe.transform(this.premiumMaster.insertDatetime, 'MM/dd/yyyy')

        },{emitEvent: false});
        this.cdr.detectChanges()
        if(this.premiumMaster.recordType === 'P') {
            this.groupBillingForm.get('adminFee').enable();
        } else {
            this.groupBillingForm.get('adminFee').setValue('', {onlySelf: true, emitEvent: false});
            this.groupBillingForm.get('adminFee').disable();
            this.groupBillingForm.get('adminCompcode').disable({onlySelf:true, emitEvent: false});
            this.groupBillingForm.get('adminGlref').disable({onlySelf:true, emitEvent: false});
            this.groupBillingForm.get('adminFeeLevel').disable({onlySelf:true, emitEvent: false});
        }
        this.onChangeTiering();
        this.onChangeAdminFee();
       setTimeout(() => {
           this.isFormDataModified();
       }, 2000)
    }

    onChangeAdminFee() {
        let adminFee: any = this.groupBillingForm.get('adminFee').value;
        if(this.premiumMaster.recordType === 'P') {
            adminFee = adminFee? adminFee.toString().replace('$',''):"";
            if (!adminFee && adminFee == 0) {
                this.groupBillingForm.get('adminCompcode').disable({onlySelf:true, emitEvent: false});
                this.groupBillingForm.get('adminGlref').disable({onlySelf:true, emitEvent: false});
                this.groupBillingForm.get('adminFeeLevel').disable({onlySelf:true, emitEvent: false});
            } else {
                this.groupBillingForm.get('adminCompcode').enable({onlySelf:true, emitEvent: false});
                this.groupBillingForm.get('adminGlref').enable({onlySelf:true, emitEvent: false});
                this.groupBillingForm.get('adminFeeLevel').enable({onlySelf:true, emitEvent: false});
            }
        }
    }

    onClickAcrossTheBoard(event: any) {
        if(event.target.checked) {
            let rateFreezeCalc: any = Form.getValue(this.groupBillingForm, 'rateFreezeCalc');
            if(rateFreezeCalc == 1) {
                this.messageService.findByMessageId(13052).subscribe( res => {
                    this.showPopUp('13052: ' + res[0].messageText, 'Group Billing');
                    event.target.checked = !event.target.checked;
                });
            }
        }
    }

    onChangeAdminFeeLevel() {
        let billType: any = this.groupBillingForm.get('billType').value;
        let adminFeeLevel: any = this.groupBillingForm.get('adminFeeLevel').value;
        if((billType == 2 || billType == 3) && adminFeeLevel != '' && adminFeeLevel != 'S') {
            this.messageService.findByMessageId(13051).subscribe( res => {
                this.showPopUp('13051: ' + res[0].messageText, 'Group Billing');
            });
        }
    }

    onChangeProration() {
        let groupType: any = this.groupMaster.groupType;
        let proration: any = this.groupBillingForm.get('proration').value;
        if(groupType == 3) {
            if(proration == 1 || proration == 2) {
                this.messageService.findByMessageId(13039).subscribe( res => {
                    this.showPopUp('13039: ' + res[0].messageText, 'Group Billing');
                });
            }
        } else if(groupType == 4) {
            if(proration == 0 || proration == 3) {
                this.messageService.findByMessageId(13038).subscribe( res => {
                    this.showPopUp('13038: ' + res[0].messageText, 'Group Billing');
                });
            }
        }
    }

    onChangePctOfMatrix() {
        let pctOfMatrix: any = this.groupBillingForm.get('pctOfMatrix').value;
         if(pctOfMatrix=='100.00%'){
            this.groupBillingForm.controls['pctOfMatrix'].setValue("100.00%");
        }else{
          if (isNaN(pctOfMatrix) || pctOfMatrix < 0 || pctOfMatrix > 9.9999) {
            this.messageService.findByMessageId(13049).subscribe((res) => {
              this.groupBillingForm.controls["pctOfMatrix"].setValue("");
              this.showPopUp("13049: " + res[0].messageText, "Group Billing");
            });
          } else {
            pctOfMatrix = pctOfMatrix * 100.0;
            pctOfMatrix = pctOfMatrix.toFixed(2);
            this.groupBillingForm.controls["pctOfMatrix"].setValue(
              pctOfMatrix + "%"
            );
          }
        }
    }

    onClickPctOfMatrix() {
        let pctOfMatrix: any = this.groupBillingForm.get('pctOfMatrix').value ? this.groupBillingForm.get('pctOfMatrix').value.replace("%",''):"100.00";
        if(isNaN(pctOfMatrix)) {
            this.groupBillingForm.controls['pctOfMatrix'].setValue('');
        } else {
            pctOfMatrix = pctOfMatrix / 100.00;
            this.groupBillingForm.controls['pctOfMatrix'].setValue(pctOfMatrix);
        }

    }

    public onChangeTiering() {
        const tieringMethod: string = this.groupBillingForm.value.tieringMethod ? this.groupBillingForm.value.tieringMethod.trim() : null;
        this.groupBillingForm.get('rate1').enable({onlySelf:true, emitEvent: false});
        this.groupBillingForm.get('rate2').enable({onlySelf:true, emitEvent: false});
        this.groupBillingForm.get('rate3').enable({onlySelf:true, emitEvent: false});
        this.groupBillingForm.get('rate4').enable({onlySelf:true, emitEvent: false});
        this.groupBillingForm.get('rate5').enable({onlySelf:true, emitEvent: false});
        switch (tieringMethod) {
          case "5": {
            this.updateRates(5);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "4": {
            this.updateRates(4);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "3": {
            this.updateRates(3);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "2": {
            this.updateRates(2);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "1": {
            this.updateRates(1);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "C": {
            this.updateRates(1);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "N": {
            this.updateRates(0);
            this.enableMatrixDecAndPctField(false);
            break;
          }
          case "M1": {
            this.updateRates(0);
            this.enableMatrixDecAndPctField(true);
               if(isNaN(this.premiumMaster.pctOfMatrix)){
                  this.groupBillingForm.patchValue({
                    pctOfMatrix: (1.0 * 100.0).toFixed(2) + "%",
                  });
            }
             else{
            this.groupBillingForm.patchValue({
              pctOfMatrix: (this.premiumMaster.pctOfMatrix * 100.0).toFixed(2) + "%",
            });
             }
            break;
          }
          case "M2": {
            this.updateRates(0);
            this.enableMatrixDecAndPctField(true);
            if(isNaN(this.premiumMaster.pctOfMatrix)){
                  this.groupBillingForm.patchValue({
                    pctOfMatrix: (1.0 * 100.0).toFixed(2) + "%",
                  });
            }
             else{
            this.groupBillingForm.patchValue({
              pctOfMatrix: (this.premiumMaster.pctOfMatrix * 100.0).toFixed(2) + "%",
            });
             }

            break;
          }
          default: {
            this.updateRates(0);
            this.enableMatrixDecAndPctField(true);
            break;
          }
        }

    }

    enableMatrixDecAndPctField(enable: boolean) {
        if (enable) {
            this.isMatrixDefEnabled = true;
            this.groupBillingForm.get('matrixDef').enable({onlySelf:true, emitEvent: false});
            this.groupBillingForm.get('pctOfMatrix').enable({onlySelf:true, emitEvent: false});
        } else {
            this.isMatrixDefEnabled = false;
            this.groupBillingForm.get('matrixDef').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('matrixDef').disable({onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('pctOfMatrix').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('pctOfMatrix').disable({onlySelf:true, emitEvent:false});
        }
    }

    private updateRates(level: number): void {
        if (level === 5) {
            this.groupBillingForm.patchValue({
                rate1: this.premiumMaster.rate1.toFixed(2)
            })
        }
        if (level <= 4) {
            this.groupBillingForm.get('rate5').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('rate5').disable({onlySelf:true, emitEvent:false});
        } else {
            this.groupBillingForm.get('rate5').reset(this.groupBillingForm.value.rate5 ?  this.groupBillingForm.value.rate5 : '$.00',{onlySelf:true, emitEvent:false});
        }
        if (level <= 3) {
            this.groupBillingForm.get('rate4').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('rate4').disable({onlySelf:true, emitEvent:false});
        } else {
            this.groupBillingForm.get('rate4').reset(this.groupBillingForm.value.rate4 ? this.groupBillingForm.value.rate4 : '$.00',{onlySelf:true, emitEvent:false});
        }
        if (level <= 2) {
            this.groupBillingForm.get('rate3').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('rate3').disable({onlySelf:true, emitEvent:false});
        } else {
            this.groupBillingForm.get('rate3').reset(this.groupBillingForm.value.rate3 ? this.groupBillingForm.value.rate3 : '$.00',{onlySelf:true, emitEvent:false});
        }
        if (level <= 1) {
            this.groupBillingForm.get('rate2').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('rate2').disable({onlySelf:true, emitEvent:false});
        } else {
            this.groupBillingForm.get('rate2').reset(this.groupBillingForm.value.rate2 ? this.groupBillingForm.value.rate2 : '$.00',{onlySelf:true, emitEvent:false});
        }
        if (level <= 0) {
            this.groupBillingForm.get('rate1').reset(null,{onlySelf:true, emitEvent:false});
            this.groupBillingForm.get('rate1').disable({onlySelf:true, emitEvent:false});
        } else {
            this.groupBillingForm.get('rate1').reset(this.groupBillingForm.value.rate1 ? this.groupBillingForm.value.rate1 : '$.00',{onlySelf:true, emitEvent:false});
        }

    }

    public gridReadyEvent(params: AgGridEvent) {
        this.dataGridgridApi = params.api;
        this.loadGrid(params);
    }

    public onSelectRow($event: any) {
        const premMasters: PremiumMaster[] = $event.api.getSelectedRows();
        this.isNewRecord = true;
        if (premMasters && premMasters.length > 0) {
            this.isNewRecord = false;
            this.patchPremiumMasterDetail(premMasters[0]);
        }
    }

    private loadGrid(agGridEvent?: AgGridEvent) {
        this.dataGridgridApi.setRowData(this.premiumMasters);
    }

    private createDataGrid(): void {
        this.dataGridGridOptions ={
                paginationPageSize: 50,
                rowSelection: 'single'
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Type",
                field: "recordType",
                width: 165,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                valueFormatter: params => {
                    const recordType = this.recordTypes.find(rt => rt.dddwDtlPrimaryKey.dataVal === params.value);
                    if (recordType) {
                        return recordType.dddwDtlPrimaryKey.displayVal;
                    }
                    return params.value;
                }
            },
            {
                headerName: "Plan/Rider Code",
                field: "planRiderCode",
                width: 200
            },
            {
                headerName: "Eff Date",
                field: "effectiveDate",
                width: 169
            },
            {
                headerName: "End Date",
                field: "endDate",
                width: 169
            },
            {
                headerName: "Benefit Package",
                field: "benefitPackageId",
                width: 200
            },
            {
                headerName: "LOB",
                field: "lineOfBusiness",
                width: 160
            }
        ];
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm(): void {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupBillingForm = this.formBuilder.group({
            groupId: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(10)])]}],
            dynamicText: ['', {validators: []}],
            billTo: ['', {validators: [Validators.maxLength(2)]}],
            frequency: ['', {validators: [Validators.maxLength(1)]}],
            billedThrough: ['', {validators: []}],
            billType: ['', {validators: []}],
            grace: ['', {validators: [Validators.maxLength(3)]}],
            paidThrough: ['', {validators: []}],
            rateFreezeCalc: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(1)])]}],
            proration: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(1)])]}],
            adultDepAge: ['', {validators: [Validators.maxLength(4)]}],
            retroMonths: ['', {validators: [Validators.maxLength(2)]}],
            commonBillingDate: ['', {validators: [Validators.required]}],
            maxNoDeps: ['', {validators: []}],
            cycle: ['', {validators: [Validators.maxLength(3)]}],
            reportPrintFormat: ['', {validators: [Validators.maxLength(3)]}],
            useEft: ['false', {validators: []}],
            tieringMethod: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(2)])]}],
            adminFee: ['', {validators: []}],
            acrossTheBoard: ['', {validators: []}],
            rate1: ['', {validators: []}],
            adminCompcode: ['', {validators: []}],
            rate2: ['', {validators: []}],
            adminGlref: ['', {validators: []}],
            rate3: ['', {validators: []}],
            adminFeeLevel: ['', {validators: []}],
            rate4: ['', {validators: []}],
            matrixDef: ['', {validators: []}],
            rate5: ['', {validators: []}],
            pctOfMatrix: ['', {validators: []}],
            rateUpdatedOn: ['', {validators: []}]
        });
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'Open', shortcutKey: 'Ctrl+O'},
                    { name: 'Save', shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() ||  this.secWin.hasUpdatePermission()))) },
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true}, {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z'}, {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C'},
                    {name: 'Paste', disabled: true, shortcutKey: 'Ctrl+V'}, {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'}, {name: 'Previous', shortcutKey: 'F7'}, {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}, {name: 'Sort by Sequence', disabled: true}, {
                        name: 'Sort by Panel ID',
                        disabled: true
                    }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'Master File'}, {name: 'Detail'}, {name: 'Contracts'},
                    {name: 'Panel'}, {name: 'Billing Control'}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'Group Lookup'},
                    {name: 'Edit Billed Through Date'},
                    {name: 'Edit Paid Through Date'},
                    {name: 'D/C Information', disabled: this.disableDC}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', disabled: false, shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [{ name: 'Show Timestamp' , shortcutKey : 'Shift+Alt+S'}, { name: 'Audit Display' ,
                        shortcutKey : 'Shift+Alt+A'}, { isHorizontal: true },{ name: '1 Main Menu' }, { name: '2 Group Billing' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    private getAdminFeeLevelValues(): void {
        this.systemCodesService.findBySystemCodeTypeAndSystemCodeActive('ADMFEELEVEL', 'Y').subscribe(adminFeeLevelValues => {
            this.adminFeeLevelValues = adminFeeLevelValues ? adminFeeLevelValues : [];
        });
    }

    private getLevels(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.LEVEL_CODE, CONSTANTS.DW_GROUP_DE).subscribe(levels => {
            this.levels = levels;
            const defaultGroup = this.levels.length > 0 ? this.levels.find(level => level.dddwDtlPrimaryKey.displayVal === 'Group') : null;
            this.groupBillingForm.patchValue({'billTo': defaultGroup.dddwDtlPrimaryKey.dataVal},{emitEvent: false});
        });
    }

    private getRateFreezes(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.RATE_FREEZE_CALC, CONSTANTS.DW_GRUPB_DE).subscribe(rateFreezes => {
            this.rateFreezes = rateFreezes ? rateFreezes : [];
        });
    }

    private getProrations(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PRORATION_METHOD, CONSTANTS.DW_GRUPB_DE).subscribe(prorations => {
            this.prorations = prorations ? prorations : [];
        });
    }

    private getBillTypes(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.GROUP_TYPE, CONSTANTS.DW_GRUPB_DE).subscribe(billTypes => {
            this.billTypes = billTypes ? billTypes : [];
        });
    }

    private getRecordTypes(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.RECORD_TYPE, CONSTANTS.DW_GRUPD_PICKLIST).subscribe(recordTypes => {
            this.recordTypes = recordTypes ? recordTypes : [];
        });
    }

    private getTieringMethods(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.TIERING_METHOD, CONSTANTS.DW_RATE_DE).subscribe(tieringMethods => {
            this.tieringMethods = tieringMethods ? tieringMethods : [];
        });
    }

    private getCompanyMasters(): void {
        this.companyMasterService.getCompanyMasters().subscribe(companyMasters => {
            this.companyMasters = companyMasters;
        });
    }

    private getAdminGLRefValues(): void {
        this.generalLedgerReferenceService.getGeneralLedgerReferences().subscribe(adminGLRefValues => {
            this.adminGLRefValues = adminGLRefValues ? adminGLRefValues : [];
        });
    }

    private getFrequencies(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.BILLING_FREQUENCY, CONSTANTS.DW_GRUPB_DE).subscribe(frequencies => {
            this.frequencies = frequencies ? frequencies : [];
        });
    }

    private deleteGroupMaster(seqGroupId: number): void {
        if (!(this.secWin.hasDeletePermission())) {
            return;
        }
        this.groupMasterService.deleteGroupMaster(seqGroupId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    private getGroupMasters(): void {
        this.groupMasterService.getGroupMasters().subscribe(groupMasters => {
            this.groupMasters = groupMasters;
        });
    }

    private deletePremiumMaster(seqPremId: number): void {
        if (!(this.secWin.hasDeletePermission())) {
            return;
        }
        this.premiumMasterService.deletePremiumMaster(seqPremId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    private getPremiumMasters(): void {
        this.premiumMasterService.getPremiumMasters().subscribe(premiumMasters => {
            this.premiumMasters = premiumMasters;
        });
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    checkValue(event: any) {
        const checkValue = Form.getValue(this.groupBillingForm, 'useEft');
        this.enableDCInfo(checkValue);
    }

    enableDCInfo(checkValue: boolean) {
        this.menu.forEach(menu => {
            if (menu.menuItem === 'Special') {
                menu.dropdownItems.forEach(dropdown => {
                    if (dropdown.name === 'D/C Information') {
                        dropdown.disabled = !checkValue;
                    }
                });
            }
        })
    }

    lookupMatrixDef(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.MatrixDefSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.groupBillingForm.get("matrixDef").setValue(res.matrixDef, { emitEvent: false });
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'matrixDef': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.MatrixDefSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp) {
                    this.groupBillingForm.get("matrixDef").setValue(resp[0].matrixDef);
                } else {
                    this.groupBillingForm.get("matrixDef").setValue(null);
                    this.messageService.findByMessageId(13049).subscribe(resp => {
                        let popUpMessage = new PopUpMessage('poUpMessageName', 'Group Billing', '13049: ' + resp[0].messageText, 'icon');
                        popUpMessage.buttons = [new PopUpMessageButton('Yes', 'Ok', 'btn btn-primary')];
                        let ref = this.modalService.open(PopUpMessageComponent);
                        ref.componentInstance.popupMessage = popUpMessage;
                        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                            if (resp.name === 'Yes') {
                                const element = this.renderer.selectRootElement('#matrixDef');
                                setTimeout(() => element.focus(), 50);
                            }
                        });
                    })
                }
            }, error => {
                this.groupBillingForm.get("matrixDef").setValue(null);
            });
        }
    };

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Group Billing')
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
            this.spinner.show();
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', '', false));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveGroupMaster()
                }
                else if(resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.closeStatus === true) {
                        this.spinner.hide();
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.groupBillingForm.valueChanges.subscribe(res => {
            this.popupClose = true;
        })
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/GRUPB_Group_Billing_Information.htm';
    }

    onRateClick(event: any, field: any) {
        this.groupBillingForm.get(field).setValue(null);
    }

    onRateChange(event: any, field: any) {
        if (!event.target.value || event.target.value === '' || event.target.value === '$.00') {
            this.groupBillingForm.get(field).setValue('$.00');
        }
    }

    onRateFocus(event: any, field: any) {
        if (event.target.value === '$.00') {
            this.groupBillingForm.get(field).setValue(null);
        }
    }
    resetAll(){
        this.groupBillingForm.reset();
        this.groupBillingForm.get("groupId").enable();
        this.showGroupField=false;
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Group Billing";

        ref.componentInstance.insertDateTime = this.groupMaster.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.groupMaster.insertProcess;
        ref.componentInstance.insertUser = this.groupMaster.insertUser;
        ref.componentInstance.updateUser = this.groupMaster.updateUser;
        ref.componentInstance.updateDateTime = this.groupMaster.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.groupMaster.updateProcess;
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
}
