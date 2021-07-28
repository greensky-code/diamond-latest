/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe, Location } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { MemberMaster, MessageMasterDtl, SecUser } from '../../../api-models';
import { CarrierCOBVerificationInformation } from '../../../api-models/carrier-cob-verification-information';
import { MemberOtherCoverage } from '../../../api-models/member-other-coverage';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import {
    DddwDtlService,
    DddwHdrService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import { CarrierMasterService } from '../../../api-services/carrier-master.service';
import { MemberMasterService } from '../../../api-services/member-master.service';
import { MemberOtherCoverageService } from '../../../api-services/member-other-coverage.service';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { MEM_MODULE_ID } from '../../../shared/app-constants';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { LookupComponent } from '../../../shared/components/lookup/lookup.component';
import { MenuBarComponent } from '../../../shared/components/menu-bar/menu-bar.component';
import { NotesComponent } from '../../../shared/components/notes/notes.component';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { TimestampComponent } from "../../../shared/components/timestamp/timestamp.component";
import { DatePickerConfig, datePickerModel, NGBModalOptions } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { MemberMasterLookup } from '../../../shared/lookup/member-master-lookup';
import { ReasonCodeMasterCustomLookup } from '../../../shared/lookup/reason-code-master-lookup';
import { Menu, OPERATIONS, SearchModel } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { AuditService } from "../../../shared/services/audit.service";
import { SecurityService } from '../../../shared/services/security.service';
import { CONSTANTS, getCobHistoryShortcutKeys, SharedService } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { CarrierCobVerficationInformationComponent } from '../carrier-cob-verfication-information/carrier-cob-verfication-information.component';
import { CarrierOtherInfoComponent } from '../carrier-other-info/carrier-other-info.component';
import { HelpComponent } from '../help/help.component';
// Use the Component directive to define the MemberCobHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'membercobhistory',
    templateUrl: './member-cob-history.component.html',
    styleUrls: ['./member-cob-history.component.scss'],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService,
        DddwHdrService,
        DddwDtlService,
        MemberOtherCoverageService,
        SystemCodesService,
        CarrierMasterService,
    ],
})
export class MemberCobHistoryComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    relationshipCodes: any[] = [];
    genders: any[] = [];
    planTypes: any[] = [];
    carrierCodes: any[] = [];
    depDetermRules: any[] = [];
    coverageTypes: any[] = [];
    paymentPolicies: any[] = [];
    types: any[] = [];
    otherFamilyCoverages: any[] = [];
    cobOrders: any[] = [];
    carriers: any[] = [];
    productTypes: any[] = [];
    secDepRules: any[] = [];
    menu: Menu[] = [];
    shortcuts: ShortcutInput[] = [];
    @Input() SubID?: string;
    @Input() selectedMember?: string;

    private rowData001: any;
    private rowData002: any;
    public memberCobHistoryForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    private datePickerModel = datePickerModel;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private memberMasters: any[];
    memberMaster: MemberMaster;
    memberMasterLength = 0;
    private cobHistories: any[];
    editCobHistory: boolean;
    isTermReasonReadOnly = true;
    sub: any;
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon = false;
    @Input() winID?: string;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    dateTypeDdlData: any;
    isNewRecord = false;
    isReadOnly = true;
    pnReadOnly = true;
    statusClick = 1
    searchModel = new SearchModel(
        'membermasters/lookup',
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );

    ReasonCodeMasterSearchModal = new SearchModel(
        'reasoncodemasters/lookupAll',
        ReasonCodeMasterCustomLookup.REASONCODE_MASTER_ALL,
        ReasonCodeMasterCustomLookup.REASONCODE_MASTER_DEFAULT,
        [{'reason_code_type': 'TM'}]
    );
    // Use constructor injection to inject an instance of a FormBuilder

    searchStatus = false;
    keyNames = 'subscriber_id';
    keyValues: any;
    selectedRow: any;

    secWin: SecWinViewModel;
    windowId = 'COBHS';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    menuOpened = ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    public seqSourceId: number = -1;

    constructor(
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private route: ActivatedRoute,
        private router: Router,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private location: Location,
        private toastService: ToastService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private dddwDtlService: DddwDtlService,
        private memberMasterService: MemberMasterService,
        private memberOtherCoverageService: MemberOtherCoverageService,
        private cdr: ChangeDetectorRef,
        private systemCodesService: SystemCodesService,
        private carrierMasterService: CarrierMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private auditService: AuditService,
        private datePipe: DatePipe
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
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

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
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
                    case 'b':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Carrier COB Verification Information'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'View Other Carrier Information'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Determine COB Order'
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

    initializeComponentState() {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberCobHistoryForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        });
        this.getOtherFamilyCoverage();
        this.getCOBOrder();
        this.getDepDetermRule();
        this.getRelationshipCodes();
        this.getGender();
        this.getPlanType();
        this.getCoverageTypes();
        this.getPaymentPolicy();
        this.getProductType();
        this.getSecDepRuleType();
        this.getCarrier();
        this.getCarrierCodes();
        this.onChangeCarrier();
        this.fetchDateTypeDdlData();
        this.sub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.memberCobHistoryForm.patchValue({
                    subscriberId: params['id'],
                });
                this.getMemberMasterBySubscriberId(params['id']);
            }
        });
        if (this.SubID) {
            this.memberCobHistoryForm.patchValue({
                subscriberId: this.SubID,
            });
            this.selectedMember=null;
            this.getMemberMasterBySubscriberId(this.SubID);
        }
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
                        'You are not Permitted to view MEMBER COB History',
                        'MEMBER COB History Permission'
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
        this.secColDetailService.findByTableNameAndUserId('MEMBER_OTHER_COVERAGE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCobHistoryShortcutKeys(this));
        this.cdr.detectChanges();
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", shortcutKey: "Ctrl+M", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())),},
                    { name: "Open", shortcutKey: "Ctrl+O" },
                    { name: "Delete", shortcutKey: "Ctrl+D", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) },
                    {name: "Save", shortcutKey: "Ctrl+S", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())),},
                    { name: "Close", shortcutKey: "Ctrl+F4" },
                    { isHorizontal: true },
                    { name: "Main Menu...", shortcutKey: "F2" },
                    { name: "Shortcut Menu...", shortcutKey: "F3" },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: "Alt+F4" },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                    { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                    { name: "Paste", shortcutKey: "Ctrl+V" },
                    { isHorizontal: true },
                    { name: "Next", shortcutKey: "F8" },
                    { name: "Previous", shortcutKey: "F7" },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Master File'},
                    {name: 'Eligibility History'},
                    {name: 'Coordination of Benefits'},
                    {name: 'Alias/Responsible Party/Privacy'},
                    {name: 'Member Address'},
                    {name: 'M+ C Information'},
                    {name: 'Working Aged'},
                    {name: 'Billing Control'},
                    {name: 'Conditions'},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Member Lookup'},
                    {name: 'ID Card Request', disabled: true},
                    {name: 'Letter Request', disabled: true},
                    {name: 'Carrier COB Verification Information'},
                    {name: 'View Other Carrier Information'},
                    {name: 'Determine COB Order'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 A/R Matrix Determinants" },
                    { name: "3 Group Master" },
                    { name: "4 Member COB History" },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'},
                ],
            },
        ];
    }

    resetAll() {
        this.memberCobHistoryForm.reset();
        this.dataGrid001GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.setRowData([]);
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'Special') {
            // handle File actions
            switch (event.action) {
                case 'Member Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }

                case 'View Other Carrier Information': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VW_OTHCARR);
                    if (status && this.carrierCode) {
                        if (this.searchStatus) {
                            let ref = this.modalService.open(CarrierOtherInfoComponent, {
                                size: 'lg',
                            });
                            ref.componentInstance.carrierCode = this.carrierCode;
                            ref.componentInstance['onSubmit'].subscribe((event: boolean) => {
                                if (event) {
                                    ref.close();
                                }
                            });
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

                case 'Determine COB Order': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DET_COBORDER);
                    if (status) {
                        if (this.searchStatus && this.memberOtherCoverage) {
                            let seqMembId = this.memberOtherCoverage.seqMembId;
                            let seqMembOthCov = this.memberOtherCoverage.seqMembOthCov;
                            let seqSubsId = this.memberOtherCoverage.seqSubsId;
                            this.memberOtherCoverageService.determineCOBOrder(seqMembId, seqSubsId, seqMembOthCov).subscribe((result) => {
                                this.messageService.findByMessageId(14388).subscribe((message: MessageMasterDtl[]) => {
                                    this.showPopUp('14388: ' +message[0].messageText,'Member COB History', "OK");
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


                case 'Carrier COB Verification Information': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_CCOB_VRINFO);
                    if (status && this.carrierCOBVerificationInformation) {
                        if (this.searchStatus) {
                            let ref = this.modalService.open(CarrierCobVerficationInformationComponent, { size: 'lg' });
                            ref.componentInstance.carrierCOBVerificationInformation = this.carrierCOBVerificationInformation;
                            ref.componentInstance['onSubmit'].subscribe((carrierCobVerficationInformationComponent: CarrierCOBVerificationInformation) => {
                                if (carrierCobVerficationInformationComponent) { 
                                    this.carrierCOBVerificationInformation = carrierCobVerficationInformationComponent;
                                    ref.close(); 
                                }
                            });
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


                default: {
                    this.toastService.showToast(
                        'Action is in progress',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case "Show Timestamp":
                    if (this.memberCobHistoryForm.get('subscriberId').value === '') {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    } else {
                        this.showTimeStamp();
                    }
                    break;

                case 'Audit Display': {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(
                            CONSTANTS.F_AUDIT,
                            this.winID
                        );
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: 'lg',
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
                                        '11073: ' + message[0].messageText
                                    );
                                });
                        }
                    } else {
                        this.messageService
                            .findByMessageId(30164)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    '30164: ' + message[0].messageText
                                );
                            });
                    }
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Topic') {
            this.sharedService.onMemberModuleTopicMenuClick(
                event.action,
                'Coordination of Benefits',
                this.activeModal,
                this.memberMaster ? this.memberCobHistoryForm.get('subscriberId').value : '',
                this.selectedMember ? this.selectedMember : ''
            );
            // this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'File') {
            switch (event.action) {
                case 'New':
                    this.carrierCode = null;
                    this.carrierCOBVerificationInformation = null;
                    this.addNewRecord();
                    break;
                case 'Save' :
                    this.saveCOBHistory();
                    break;
                case 'Create' :
                    this.createCOBHistory()
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen()
        } else if (event.menu.menuItem === "Notes") {
            this.handleNotesMenu(event.action);
        } else {
            // handle Edit-Menu Actions
            this.toastService.showToast('Action is in progress', NgbToastType.Danger);
        }
    }

    private showTimeStamp() {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Member COB History";
        ref.componentInstance.insertDateTime = this.memberOtherCoverage.insertDatetimeDisplay
            ? this.memberOtherCoverage.insertDatetimeDisplay : this.memberOtherCoverage.insertDatetime;

        ref.componentInstance.insertProcess = this.memberOtherCoverage.insertProcess;
        ref.componentInstance.insertUser = this.memberOtherCoverage.insertUser;
        ref.componentInstance.updateUser = this.memberOtherCoverage.updateUser;
        ref.componentInstance.updateDateTime = this.memberOtherCoverage.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.memberOtherCoverage.updateProcess;

    };


    public handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                if (this.memberMaster && this.memberMaster.seqMembId) {
                    this.popUpNotesMenuClicked(action);
                } else {
                    this.showErrorPopUp("29005: You must select a record before entering notes.", "Member COB History");
                }
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }

    showPopUp(message: string, title: string, btnTxt:string = "Cancel") {
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
            new PopUpMessageButton('Cancel',btnTxt , 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    showErrorPopUp(message: string, title: string) {
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
            new PopUpMessageButton('OK', 'OK', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button);
        }
    }

    onChangeOtherFamilyCoverage(event: any) {
        if (event.target.value == 'I' || event.target.value == 'E') {
            this.isReadOnly = false
        } else {
            this.isReadOnly = true
        }
    }

    onChangePersonOne(event: any, value: any) {
        if (value) {
            this.pnReadOnly = false;
        } else {
            this.pnReadOnly = true;
        }
    }

    getPlanType() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(CONSTANTS.PLANTYPE, '0')
            .subscribe(
                (codes) => {
                    this.planTypes = codes;
                }
            );
    }

    getProductType() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(CONSTANTS.PRODTYPE, '0')
            .subscribe(
                (codes) => {
                    this.productTypes = codes;
                }
            );
    }

    getSecDepRuleType() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(CONSTANTS.SECDEPRULE, '0')
            .subscribe(
                (codes) => {
                    this.secDepRules = codes;
                }
            );
    }

    getRelationshipCodes() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.RELATIONSHIP_CODE,
                CONSTANTS.DW_COBHS_OTHER_DE
            )
            .subscribe(
                (codes) => {
                    this.relationshipCodes = codes;
                }
            );
    }

    getDepDetermRule() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.DEP_DETERM_RULE_CODE,
                CONSTANTS.DW_COBHS_OTHER_DE
            )
            .subscribe(
                (codes) => {
                    this.depDetermRules = codes;
                }
            );
    }

    getMedicareTypes() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.RELATIONSHIP_CODE,
                CONSTANTS.DW_MELIG_DE
            )
            .subscribe(
                (codes) => {
                    this.types = codes;
                }
            );
    }

    getPaymentPolicy() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(CONSTANTS.COBPYMT, '0')
            .subscribe(
                (codes) => {
                    this.paymentPolicies = codes;
                }
            );
    }

    getCoverageTypes() {
        this.systemCodesService
            .getSystemCodesByLangAndtype(CONSTANTS.COVTYPE, '0')
            .subscribe(
                (codes) => {
                    this.coverageTypes = codes;
                }
            );
    }

    getOtherFamilyCoverage() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.OTHER_FAM_COVERAGE,
                CONSTANTS.DW_COBHS_DE
            )
            .subscribe(
                (codes) => {
                    this.otherFamilyCoverages = codes;
                }
            );
    }

    getCOBOrder() {
        this.dddwDtlService
            .findByColumnNameAndDwname(CONSTANTS.COB_CODE, CONSTANTS.DW_COBHS_DE)
            .subscribe(
                (codes) => {
                    this.cobOrders = codes;
                }
            );
    }

    getCarrier() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.CARRIER_TYPE,
                CONSTANTS.DW_COBHS_PICKLIST
            )
            .subscribe(
                (codes) => {
                    this.carriers = codes;
                }
            );
    }

    getGender() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.CARRIER_SUBS_GENDER,
                CONSTANTS.DW_COBHS_OTHER_DE
            )
            .subscribe(
                (gender) => {
                    this.genders = gender;
                }
            );
    }

    getCarrierCodes() {
        this.carrierMasterService.getCarrierMasters().subscribe(
            (codes) => {
                this.carrierCodes = codes;
            }
        );
    }

    onChangeCarrierDdl(value: any) {
        let carrrierCodeObj = this.carrierCodes.filter(
            (f) => f.carrierCode === value
        );
        this.memberCobHistoryForm.controls['name'].setValue(carrrierCodeObj[0].shortName);
    }

    onChangeCarrier() {
        this.memberCobHistoryForm.controls['carrier'].valueChanges.subscribe(
            (resp) => {
                let carrrierCodeObj = this.carrierCodes.filter(
                    (f) => f.carrierCode === resp
                );
                this.memberCobHistoryForm.patchValue({
                    name: carrrierCodeObj[0].shortName,
                });
            }
        );
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
            onGridReady: () => {
                if (this.SubID) {
                    this.dataGrid001GridOptions.api.showLoadingOverlay();
                }
            }
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
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
                valueGetter: this.getFormatedDate.bind(this)
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

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
            onGridReady: () => {
                if (this.SubID) {
                    this.dataGrid002GridOptions.api.showLoadingOverlay();
                }
            }
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Carrier',
                field: 'carrierCode',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: 'Carrier Type',
                field: 'carriertype',
                width: 150,
                valueGetter: this.getCarrierType.bind(this)
            },
            {
                headerName: 'Coverage Type',
                field: 'coverageTypeCode',
                width: 200,
                valueGetter: this.getCoverageType.bind(this)
            },
            {
                headerName: 'Entitlement',
                field: 'entitlementCode',
                width: 150,
            },
            {
                headerName: 'COB order',
                field: 'cobCode',
                width: 150,
            },
            {
                headerName: 'Eff Date',
                field: 'coverageEffecDate',
                width: 150,
                valueGetter: this.getFormatedDate.bind(this)
            },
            {
                headerName: 'Term Date',
                field: 'termDate',
                width: 150,
                valueGetter: this.getFormatedDate.bind(this)
            },
        ];
    }

    getCarrierType(params: any) {
        let carrierType = this.carriers.find(carrier => carrier.dddwDtlPrimaryKey.dataVal == params.data.carriertype);
        return carrierType ? carrierType.dddwDtlPrimaryKey.displayVal : '';
    }

    getCoverageType(params: any) {
        let coverageType = this.coverageTypes.find(coverageType => coverageType.systemCode == params.data.coverageTypeCode);
        return coverageType ? coverageType.systemCodeDesc1 : '';
    }

    getFormatedDate(params: any) {
        if (params.colDef.field === 'coverageEffecDate') {
            return params.data.coverageEffecDate ? this.datePipe.transform(params.data.coverageEffecDate, 'MM/dd/yyyy') : '';
        } else if (params.colDef.field === 'termDate') {
            return params.data.termDate ? this.datePipe.transform(params.data.termDate, 'MM/dd/yyyy') : '';
        } else if (params.colDef.field === 'dateOfBirth') {
            return params.data.dateOfBirth ? this.datePipe.transform(params.data.dateOfBirth, 'MM/dd/yyyy') : '';
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberCobHistoryForm = this.formBuilder.group(
            {
                diamondId: ['', {updateOn: 'blur', validators: []}],
                subscriberId: ['', {updateOn: 'blur', validators: []}],

                carrier: ['', {updateOn: 'blur', validators: [Validators.required]}],
                name: ['', {updateOn: 'blur', validators: []}],
                entitlement: ['', {updateOn: 'blur', validators: []}],
                workingAged: ['', {updateOn: 'blur', validators: []}],
                coverageEffDate: [
                    '',
                    {updateOn: 'blur', validators: [Validators.required]},
                ],
                termDate: ['', {updateOn: 'blur', validators: []}],
                termReason: ['', {updateOn: 'blur', validators: []}],
                policyNo: ['', {updateOn: 'blur', validators: []}],
                cobOrder: ['', {updateOn: 'blur', validators: [Validators.required]}],
                otherFamilyCoverage: [
                    '',
                    {updateOn: 'blur', validators: [Validators.required]},
                ],
                pn1: ['', {updateOn: 'blur', validators: []}],
                pn2: ['', {updateOn: 'blur', validators: []}],
                pn3: ['', {updateOn: 'blur', validators: []}],
                userDefined1: ['', {updateOn: 'blur', validators: []}],
                usrDat1: ['', {updateOn: 'blur', validators: []}],
                userDefined2: ['', {updateOn: 'blur', validators: []}],
                usrDat2: ['', {updateOn: 'blur', validators: []}],
                coverageType: ['', {updateOn: 'blur', validators: []}],
                productType: ['', {updateOn: 'blur', validators: []}],
                planType: ['', {updateOn: 'blur', validators: []}],
                othCarrierSubId: ['', {updateOn: 'blur', validators: []}],
                relationship: ['', {updateOn: 'blur', validators: []}],
                lastName: ['', {updateOn: 'blur', validators: []}],
                firstName: ['', {updateOn: 'blur', validators: []}],
                gender: ['', {updateOn: 'blur', validators: []}],
                dob: ['', {updateOn: 'blur', validators: []}],
                employerGroup: ['', {updateOn: 'blur', validators: []}],
                diagCode: ['', {updateOn: 'blur', validators: []}],
                caseNo: ['', {updateOn: 'blur', validators: []}],
                paymentPolicy: ['', {updateOn: 'blur', validators: []}],
                depDetermRule: ['', {updateOn: 'blur', validators: []}],
                secDepRule: ['', {updateOn: 'blur', validators: []}],
                preCertReqd: ['', {updateOn: 'blur', validators: []}],
                benefCoord: ['', {updateOn: 'blur', validators: []}],
                date1: ['', {updateOn: 'blur', validators: []}],
                type1: [
                    '',
                    {updateOn: 'blur', validators: [Validators.maxLength(1)]},
                ],
                date2: ['', {updateOn: 'blur', validators: []}],
                type2: [
                    '',
                    {updateOn: 'blur', validators: [Validators.maxLength(1)]},
                ],
                date3: ['', {updateOn: 'blur', validators: []}],
                type3: [
                    '',
                    {updateOn: 'blur', validators: [Validators.maxLength(1)]},
                ],
            },
            {updateOn: 'submit'}
        );
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onLookupFieldChange(event: any, id: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getMemberMasterBySubscriberId(id);
        }
    }

    saveCOBHistory() {
        if (this.securityService.checkInsertUpdatePermissions(this.editCobHistory, this.secWin)) {
            if (this.editCobHistory) {
                this.updateCOBHistory();
            } else {
                this.createCOBHistory();
            }
        }
    }

    onRowSelectedGrid001(event: any) {
        if (event.node && !event.node.selected) {
            this.searchStatus = false;
            this.keyValues = '';
            this.selectedMember = '';
            return;
        }
        this.dataGrid002GridOptions.api.setRowData([]);
        this.rowData001 = this.dataGrid001GridOptions.api.getSelectedRows()[0];
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows) {
            this.searchStatus = true;
            this.keyValues = selectedRows[0].subscriberId;
            this.selectedMember = selectedRows[0].seqMembId;
            this.selectedRow = selectedRows[0];
            this.dataGrid002GridOptions.api.showLoadingOverlay();
            this.getCOBHistoryByMemberId(selectedRows[0].seqMembId);
        }
    }

    onRowSelectedGrid002(event: any) {
        if (event.node && !event.node.selected) {
            return;
        }
        this.rowData002 = this.dataGrid002GridOptions.api.getSelectedRows()[0];
        if (this.isNewRecord) {
            this.editCobHistory = false;
        } else {
            this.editCobHistory = true;
        }

        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows) {
            this.memberOtherCoverage = selectedRows[0];
            this.carrierCOBVerificationInformation =  new CarrierCOBVerificationInformation();
            this.carrierCode = this.memberOtherCoverage.carrierCode ? this.memberOtherCoverage.carrierCode : null;
            this.carrierCOBVerificationInformation.verifOthCarrierDate = this.memberOtherCoverage.verifOthCarrierDate ? this.memberOtherCoverage.verifOthCarrierDate : null;
            this.carrierCOBVerificationInformation.verifStatusCode = this.memberOtherCoverage.verifStatusCode ? this.memberOtherCoverage.verifStatusCode : null;
            this.carrierCOBVerificationInformation.verifSourceFirstName = this.memberOtherCoverage.verifSourceFirstName ? this.memberOtherCoverage.verifSourceFirstName : null;
            this.carrierCOBVerificationInformation.verifSourceLastName = this.memberOtherCoverage.verifSourceLastName ? this.memberOtherCoverage.verifSourceLastName : null;
            this.carrierCOBVerificationInformation.verifSourcePhoneNo = this.memberOtherCoverage.verifSourcePhoneNo ? this.memberOtherCoverage.verifSourcePhoneNo : null;
            this.carrierCOBVerificationInformation.comments = this.memberOtherCoverage.comments ? this.memberOtherCoverage.comments : null;
            this.getCobHistory(selectedRows[0]);
        }

    }

    carrierCode: string;
    carrierCOBVerificationInformation: CarrierCOBVerificationInformation = new CarrierCOBVerificationInformation();
    memberOtherCoverage: MemberOtherCoverage = new MemberOtherCoverage();

    getCOBHistoryByMemberId(seqMembId: any) {
        this.memberOtherCoverageService
            .getMemberOtherCoveragesBySeqMembId(seqMembId)
            .subscribe(
                (result) => {
                    if (result) {
                        this.cobHistories = result;
                        this.popUpMessage = null;
                        this.memberOtherCoverage = result[0];
                        this.dataGrid002GridOptions.api.setRowData(this.cobHistories);
                        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                    } else {
                        this.dataGrid002GridOptions.api.setRowData([]);
                    }
                },
                (error) => {
                    console.log('error');
                }
            );
    }

    getMemberMasterBySubscriberId(subscriberId: any) {
        this.memberMasterService.findBySubscriberId(subscriberId).subscribe(
            (memberMasters) => {
                if (memberMasters && memberMasters.length > 1) {
                    this.memberMasterLength = memberMasters.length - 1;
                }
                if (memberMasters) {
                    this.memberMasters = memberMasters;
                    this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex((key: any) => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
                    this.seqSourceId = this.memberMaster.seqMembId;
                    this.popUpMessage = null;
                    this.dataGrid001GridOptions.api.setRowData(this.memberMasters);
                    this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    saveConfirmPopUp() {
        let popUpMessage = new PopUpMessage(
            'Member COB History',
            'Member COB History',
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
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                this.saveCOBHistory();
            } else if (resp.name === 'No') {
                this.router.navigateByUrl('/');
            } // 3rd case: In case of cancel do nothing
        });
    }

    onSavePopUp() {
        let popUpMessage = new PopUpMessage(
            'Member COB History',
            'Member COB History',
            '14388: COB order Cannot be automatically assigned.',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Ok', ''));

        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                this.saveConfirmPopUp();
            }
        });
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.onRowSelected.subscribe((result: any) => {
            this.memberCobHistoryForm.patchValue({
                subscriberId: result.subscriberId,
                diamondId: result.diamondId,
            });
            this.selectedMember = result.personNumber;
            this.getMemberMasterBySubscriberId(result.subscriberId);
        });
    }

    openLookupReasons() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.searchModel = this.ReasonCodeMasterSearchModal;
        ref.componentInstance.onRowSelected.subscribe((result: any) => {
            debugger;
            this.memberCobHistoryForm.patchValue({
                termReason: result.reasonCode
            });
        });
    }

    getFormData(memberOtherCoverage: MemberOtherCoverage) {
        memberOtherCoverage.memberOtherCoveragePrimaryKey = {
            seqMembId: this.rowData001.seqMembId,
            seqMembOthCov: null,
        };
        memberOtherCoverage.carrierCode = this.memberCobHistoryForm.get(
            'carrier'
        ).value;
        memberOtherCoverage.seqSubsId = this.rowData001.seqSubsId;
        memberOtherCoverage.othCarrierCobFlag = 'N';
        memberOtherCoverage.entitlementCode = this.memberCobHistoryForm.get(
            'entitlement'
        ).value;
        if (this.memberCobHistoryForm.get('workingAged').value) {
            memberOtherCoverage.workingAgedStatus = 'Y';
        } else {
            memberOtherCoverage.workingAgedStatus = 'N';
        }
        memberOtherCoverage.coverageEffecDate = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'coverageEffDate'
        );
        memberOtherCoverage.termDate = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'termDate'
        );
        memberOtherCoverage.termReason = this.memberCobHistoryForm.get(
            'termReason'
        ).value;
        memberOtherCoverage.policyNumber = this.memberCobHistoryForm.get(
            'policyNo'
        ).value;
        memberOtherCoverage.cobCode = this.memberCobHistoryForm.get(
            'cobOrder'
        ).value;
        memberOtherCoverage.otherFamCoverage = this.memberCobHistoryForm.get(
            'otherFamilyCoverage'
        ).value;
        memberOtherCoverage.personNumber1 = this.memberCobHistoryForm.get(
            'pn1'
        ).value;
        memberOtherCoverage.personNumber2 = this.memberCobHistoryForm.get(
            'pn2'
        ).value;
        memberOtherCoverage.personNumber3 = this.memberCobHistoryForm.get(
            'pn3'
        ).value;
        memberOtherCoverage.userDefined1 = this.memberCobHistoryForm.get(
            'userDefined1'
        ).value;
        memberOtherCoverage.userDefined2 = this.memberCobHistoryForm.get(
            'userDefined2'
        ).value;
        memberOtherCoverage.cobhsUserDate1 = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'usrDat1'
        );
        memberOtherCoverage.cobhsUserDate2 = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'usrDat2'
        );
        memberOtherCoverage.coverageTypeCode = this.memberCobHistoryForm.get(
            'coverageType'
        ).value;
        memberOtherCoverage.productType = this.memberCobHistoryForm.get(
            'productType'
        ).value;
        memberOtherCoverage.planTypeCode = this.memberCobHistoryForm.get(
            'planType'
        ).value;
        memberOtherCoverage.othCarrierSubsId = this.memberCobHistoryForm.get(
            'othCarrierSubId'
        ).value;
        memberOtherCoverage.relationshipCode = this.memberCobHistoryForm.get(
            'relationship'
        ).value;
        memberOtherCoverage.othCarrierSubsLastName = this.memberCobHistoryForm.get(
            'lastName'
        ).value;
        memberOtherCoverage.othCarrierSubsFirstName = this.memberCobHistoryForm.get(
            'firstName'
        ).value;
        memberOtherCoverage.othCarrierSubsGender = this.memberCobHistoryForm.get(
            'gender'
        ).value;
        memberOtherCoverage.othCarrierSubsDob = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'dob'
        );
        memberOtherCoverage.employerGroup = this.memberCobHistoryForm.get(
            'employerGroup'
        ).value;
        memberOtherCoverage.diagnosisCode = this.memberCobHistoryForm.get(
            'diagCode'
        ).value;
        memberOtherCoverage.caseNumber = this.memberCobHistoryForm.get(
            'caseNo'
        ).value;
        memberOtherCoverage.paymentPolicyCode = this.memberCobHistoryForm.get(
            'paymentPolicy'
        ).value;
        memberOtherCoverage.depDetermRuleCode = this.memberCobHistoryForm.get(
            'depDetermRule'
        ).value;
        memberOtherCoverage.secDepDetermRuleCode = this.memberCobHistoryForm.get(
            'secDepRule'
        ).value;
        // memberOtherCoverage.preCertReqdFlag = this.memberCobHistoryForm.get('preCertReqd').value;
        if (this.memberCobHistoryForm.get('preCertReqd').value) {
            memberOtherCoverage.preCertReqdFlag = 'Y';
        } else {
            memberOtherCoverage.preCertReqdFlag = 'N';
        }
        memberOtherCoverage.eventDate1 = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'date1'
        );
        memberOtherCoverage.eventDate1TypeCode = this.memberCobHistoryForm.get(
            'type1'
        ).value;
        memberOtherCoverage.eventDate2 = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'date2'
        );
        memberOtherCoverage.eventDate2TypeCode = this.memberCobHistoryForm.get(
            'type2'
        ).value;
        memberOtherCoverage.eventDate3 = Form.getDatePickerValue(
            this.memberCobHistoryForm,
            'date3'
        );
        memberOtherCoverage.eventDate3TypeCode = this.memberCobHistoryForm.get(
            'type3'
        ).value;

        return memberOtherCoverage;
    }

    createCOBHistory() {
        this.formValidation.validateForm();
        if (this.memberCobHistoryForm.valid) {
            const memberOtherCoverage = this.getFormData(new MemberOtherCoverage());
            memberOtherCoverage.verifOthCarrierDate = this.carrierCOBVerificationInformation.verifOthCarrierDate;
            memberOtherCoverage.verifStatusCode =  this.carrierCOBVerificationInformation.verifStatusCode;
            memberOtherCoverage.verifSourceFirstName =  this.carrierCOBVerificationInformation.verifSourceFirstName;
            memberOtherCoverage.verifSourceLastName =  this.carrierCOBVerificationInformation.verifSourceLastName;
            memberOtherCoverage.verifSourcePhoneNo =  this.carrierCOBVerificationInformation.verifSourcePhoneNo;
            memberOtherCoverage.comments =  this.carrierCOBVerificationInformation.comments;
            this.auditService.setAuditFields(memberOtherCoverage, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.memberOtherCoverageService
                .createOtherCoverage(memberOtherCoverage)
                .subscribe(
                    (response) => {
                        this.toastService.showToast('Record successfully created', NgbToastType.Success);
                        this.editCobHistory = false;
                        this.getCOBHistoryByMemberId(this.rowData001.seqMembId);
                        this.createForm();
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.popupClose = false;
                    }
                );

        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    updateCOBHistory() {
        this.formValidation.validateForm();
        if (this.memberCobHistoryForm.valid) {
            let memberOtherCoverage = this.getFormData(new MemberOtherCoverage());
            memberOtherCoverage.verifOthCarrierDate = this.carrierCOBVerificationInformation.verifOthCarrierDate;
            memberOtherCoverage.verifStatusCode =  this.carrierCOBVerificationInformation.verifStatusCode;
            memberOtherCoverage.verifSourceFirstName =  this.carrierCOBVerificationInformation.verifSourceFirstName;
            memberOtherCoverage.verifSourceLastName =  this.carrierCOBVerificationInformation.verifSourceLastName;
            memberOtherCoverage.verifSourcePhoneNo =  this.carrierCOBVerificationInformation.verifSourcePhoneNo;
            memberOtherCoverage.comments =  this.carrierCOBVerificationInformation.comments;
            memberOtherCoverage.seqSubsId = this.rowData001.seqSubsId;
            memberOtherCoverage.insertProcess = this.memberOtherCoverage.insertProcess;
            memberOtherCoverage.insertUser = this.memberOtherCoverage.insertUser;
            this.auditService.setAuditFields(memberOtherCoverage, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.memberOtherCoverageService.updateOtherCoverage(memberOtherCoverage, this.rowData001.seqMembId, this.rowData002.seqMembOthCov)
                .subscribe((response) => {
                        this.toastService.showToast('Record successfully created', NgbToastType.Success);
                        this.editCobHistory = false;
                        this.getCOBHistoryByMemberId(this.rowData001.seqMembId);
                        this.createForm();
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close();
                            }, 2000);
                        }
                        this.popupClose = false;
                    });
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. Please correct your entries and try again.'
            );
        }
    }

    private getCobHistory(result: MemberOtherCoverage) {
        if (result) {
            this.isReadOnly = !(result.otherFamCoverage == 'I' || result.otherFamCoverage == 'E');
            this.memberCobHistoryForm.patchValue({
                subscriberId: this.rowData001.subscriberId,
                carrier: result.carrierCode,
                entitlement: result.entitlementCode,
                workingAged: result.workingAgedStatus === 'Y',
                coverageEffDate: this.dateFormatPipe.defaultDisplayDateFormat(
                    result.coverageEffecDate
                ),
                termDate: this.dateFormatPipe.defaultDisplayDateFormat(result.termDate),
                termReason: result.termReason,
                policyNo: result.policyNumber,
                cobOrder: result.cobCode,
                otherFamilyCoverage: result.otherFamCoverage,
                pn1: result.personNumber1,
                pn2: result.personNumber2,
                pn3: result.personNumber3,
                userDefined1: result.userDefined1,
                usrDat1: this.dateFormatPipe.defaultDisplayDateFormat(
                    result.cobhsUserDate1
                ),
                userDefined2: result.userDefined2,
                usrDat2: this.dateFormatPipe.defaultDisplayDateFormat(
                    result.cobhsUserDate2
                ),
                coverageType: result.coverageTypeCode,
                productType: result.productType,
                planType: result.planTypeCode,
                othCarrierSubId: result.othCarrierSubsId,
                relationship: result.relationshipCode,
                lastName: result.othCarrierSubsLastName,
                firstName: result.othCarrierSubsFirstName,
                gender: result.othCarrierSubsGender,
                dob: this.dateFormatPipe.defaultDisplayDateFormat(
                    result.othCarrierSubsDob
                ),
                employerGroup: result.employerGroup,
                diagCode: result.diagnosisCode,
                caseNo: result.caseNumber,
                paymentPolicy: result.paymentPolicyCode,
                depDetermRule: result.depDetermRuleCode,
                secDepRule: result.secDepDetermRuleCode,
                preCertReqd: result.preCertReqdFlag == 'Y',
                'benefCoord': result.othCarrierCobFlag == 'Y',
                date1: this.dateFormatPipe.defaultDisplayDateFormat(result.eventDate1),
                type1: result.eventDate1TypeCode,
                date2: this.dateFormatPipe.defaultDisplayDateFormat(result.eventDate2),
                type2: result.eventDate2TypeCode,
                date3: this.dateFormatPipe.defaultDisplayDateFormat(result.eventDate3),
                type3: result.eventDate3TypeCode,
            }, {emitEvent: false});
            if (!result.carrierCode) {
                this.memberCobHistoryForm.patchValue({name: ''});
            }
            this.isTermReasonReadOnly = !result.termDate;
            setTimeout(() => {
                this.isFormModifiedStatus();
            }, 500)
        }

    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Member Eligibility History')
            })
        } else {
            this.activeModal.close()
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveCOBHistory()
                } else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    onTermDateChange(event: any) {
        this.isTermReasonReadOnly = false;
    }

    onLookupTermReason(event: any) {
        if (event.key == 'F5') {
            event.preventDefault();
            if (!this.isTermReasonReadOnly) {
                this.openLookupReasons();
            }
        }
    }

    fetchDateTypeDdlData() {

        this.systemCodesService
            .findBySystemCodeTypeAndSystemCodeActiveAndLanguageId('DATETYPE', 'Y', 0)
            .subscribe(res => {
                this.dateTypeDdlData = res;
            });
    }

    addNewRecord() {
        if (this.memberCobHistoryForm.controls['subscriberId'].value) {
            let cobHistories: any[] = [];
            let cobHistory = {};
            cobHistories.push(cobHistory);
            this.isNewRecord = true;
            this.dataGrid002GridOptions.api.applyTransaction({'add': cobHistories});
            this.dataGrid002GridOptions.api.selectIndex(this.dataGrid002GridOptions.api.getDisplayedRowCount() - 1, false, false);
        } else {
            this.secProgress = true;
            this.messageService
                .findByMessageId(14011)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.secProgress = false;
                    this.showPopUp(
                        '14011: ' +
                        message[0].messageText,
                        'Procedure Price'
                    );
                });
        }
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, {windowClass: 'myCustomModalClass'});
        viewModal.componentInstance.currentWin = '/COBHS_Member_COB_History.htm';
    }

    isFormModifiedStatus() {
        this.memberCobHistoryForm.valueChanges.subscribe(() => {
            if (this.statusClick === 1) {
                ++this.statusClick
            } else {
                this.popupClose = true;
            }
        })
    }
}
