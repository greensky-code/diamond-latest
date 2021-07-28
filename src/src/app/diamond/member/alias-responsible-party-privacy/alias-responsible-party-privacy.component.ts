/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren,} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators,} from "@angular/forms";
import {GridOptions} from "ag-grid-community";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {Location} from "@angular/common";
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";

import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {KeyboardShortcutsComponent, ShortcutInput,} from "ng-keyboard-shortcuts";
import {CONSTANTS, getAliasRespPartPrivacyShortcutKeys, SharedService} from "../../../shared/services/shared.service";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {MemberMasterService} from "../../../api-services/member-master.service";
import {MemberMaster, MessageMasterDtl, SecUser} from "../../../api-models";
import {MemberContact} from "../../../api-models/member-contact.model";
import {MemberContactService} from "../../../api-services/member-contact.service";
import {Form} from "../../../shared/helpers/form.helper";
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel,} from "../../../shared/models/models";
import {MemberMasterLookup} from "../../../shared/lookup/member-master-lookup";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {CountryService} from "../../../api-services/country.service";
import {MemberContactFieldNames, MemberContactFormConfig,} from "../../../shared/models/constants";
import {ZipCodes} from "../../../api-models/zip-codes";
import {ZipCodesService} from "../../../api-services/zip-codes.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {MessageMasterDtlService, SecUserService} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {HelpComponent} from "../help/help.component";
import { MenuBarComponent } from "../../../shared/components/menu-bar/menu-bar.component";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NGBModalOptions} from "../../../shared/config";
import {GroupBillingComponent} from "../group-billing/group-billing.component";
import {GroupPanelComponent} from "../group-panel/group-panel.component";
import {MemberMasterComponent} from "../member-master/member-master.component";
import {MemberEligibilityHistoryComponent} from "../member-eligibility-history/member-eligibility-history.component";
import {MemberCobHistoryComponent} from "../member-cob-history/member-cob-history.component";
import {MemberAddressComponent} from "../member-address/member-address.component";
import {MemberWorkingAgedComponent} from "../member-working-aged/member-working-aged.component";
import {MemberBillingComponent} from "../member-billing/member-billing.component";
import {MemberConditionsComponent} from "../member-conditions/member-conditions.component";
import {MemberMedicareComponent} from "../member-medicare/member-medicare.component";

// Use the Component directive to define the AliasResponsiblePartyPrivacyComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "aliasresponsiblepartyprivacy",
    templateUrl: "./alias-responsible-party-privacy.component.html"
})
export class AliasResponsiblePartyPrivacyComponent
    implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    aliasResponsiblePartyPrivacyForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    memberMasters: MemberMaster[];
    memberMaster: MemberMaster;
    MemeberContact: MemberContact[];
    @Input() winID?: string;
    @ViewChild("popUpMesssage") child: PopUpMessageComponent;
    seqMembId: any;
    shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    @Input() showIcon: boolean = false;
    searchModel = new SearchModel(
        "membermasters/lookup",
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );
    sub: any;
    countries: any;
    memberContactFormConfig = MemberContactFormConfig;
    contactsState: Array<FormRow> = [];
    contactSource: any;
    isResetForm = false;
    lookupLoaded: any;
    zipCode: ZipCodes;
    @Input() SubID?: string;
    @Input() selectedMember?: string;
    memberMasterLength = 0;
    inputValue: Boolean = false;
    searchStatus: boolean = false;
    keyNames: string = "seq_memb_id";
    keyValues: any;
    secWin: SecWinViewModel;
    windowId = 'ALIAS';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    closeStatus: Boolean = false;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    private dataGrid001gridApi: any;
    private dataGrid002gridApi: any;
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private sharedService: SharedService,
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        public router: Router,
        private memberMasterService: MemberMasterService,
        private memberMasterContactService: MemberContactService,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        public activeModal: NgbActiveModal,
        public CountryService: CountryService,
        private location: Location,
        private zipCodesService: ZipCodesService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private alertMessageService: AlertMessageService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService
    ) {
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }



    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
     }
     openSpecialMenu(){
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

    triggerMenus(value:any) {
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
                            action:'Eligibility History'
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
                        this.openLookupPage()
                        break;
                    default:
                        break;
                }
            }
            if (this.menuOpened == "fileDropdownWindows") {
                switch (value) {
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

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAliasRespPartPrivacyShortcutKeys(this));
        this.cdr.detectChanges();
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    initializeComponentState() {
        this.createForm();
        this.getCountries();
        this.displayMessage = {};
        this.formValidation = new FormValidation(
            this.aliasResponsiblePartyPrivacyForm
        );
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
        });
        this.sub = this.route.params.subscribe((params) => {
            if (params["id"]) {
                this.aliasResponsiblePartyPrivacyForm.patchValue({
                    subscriberId: params["id"],
                }, {emitEvent: false})
                this.loadGrids();
            }
            // In a real app: dispatch action to load the details here.
        });
        if (this.SubID) {
            this.aliasResponsiblePartyPrivacyForm.patchValue({
                subscriberId: this.SubID
            })
            this.loadGrids()
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
                        'You are not Permitted to view Alias Responsible Party Privacy',
                        'Alias Responsible Party Privacy Permission'
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

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    dataGrid001GridOptionsExportCsv() {
        var params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        var params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    getMemberMasterById(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(
            (memberMaster) => {
                this.memberMaster = memberMaster;
                this.aliasResponsiblePartyPrivacyForm.patchValue({
                    lastName001: this.memberMaster.lastName,
                    first001: this.memberMaster.firstName,
                    addr1001: this.memberMaster.addressLine1,
                    addr2001: this.memberMaster.addressLine2,
                    city001: this.memberMaster.city,
                    state001: this.memberMaster.state,
                    zipCode001: this.memberMaster.zipCode,
                    phoneNumber001: this.memberMaster.akaPhoneNumber,
                    country001: this.memberMaster.country,
                    lastName002: this.memberMaster.respLastName,
                    first002: this.memberMaster.respFirstName,
                    addr1002: this.memberMaster.respAddressLine1,
                    addr2002: this.memberMaster.respAddressLine2,
                    city002: this.memberMaster.respCity,
                    state002: this.memberMaster.respState,
                    zipCode002: this.memberMaster.respZipCode,
                    phoneNumber002: this.memberMaster.respPhoneNumber,
                    country002: this.memberMaster.respCountry,
                    lastName003: this.memberMaster.privLastName,
                    firstName003: this.memberMaster.privFirstName,
                    addr1003: this.memberMaster.privAddressLine1,
                    addr2003: this.memberMaster.privAddressLine2,
                    city003: this.memberMaster.privCity,
                    state003: this.memberMaster.privState,
                    zipCode003: this.memberMaster.privZipCode,
                    phoneNumber003: this.memberMaster.privPhoneNumber,
                    country003: this.memberMaster.privCountry,
                    diamondId: this.memberMaster.diamondId,
                }, {emitEvent : false});
            }
        );
    }

    getMemberContact(seqMembId: any) {
        this.isResetForm = true;
        this.contactsState = new Array<FormRow>();
        this.memberMasterService.getContactSource(seqMembId).subscribe(
            (MemberContacts) => {
                this.populateDynamicForm(MemberContacts);
            }
        );
    }

    findDetailByZipCode(event: any, i: any) {
        this.zipCode = new ZipCodes();
        let zipCode = event.target.value;
        this.zipCodesService.getZipCode(zipCode).subscribe((resp) => {
            if (resp !== null) {
                this.zipCode = resp;
                if (i == 1) {
                    this.setCityAndStateProvByZipCode1(this.zipCode);
                }
                if (i == 2) {
                    this.setCityAndStateProvByZipCode2(this.zipCode);
                }
                if (i == 3) {
                    this.setCityAndStateProvByZipCode3(this.zipCode);
                }
            }
        });
    }

    setCityAndStateProvByZipCode1(zipCode: ZipCodes) {
        this.aliasResponsiblePartyPrivacyForm.patchValue({
            city001: zipCode.city,
            state001: zipCode.state,
            zipCode001: zipCode.zipCode,
        });
    }

    setCityAndStateProvByZipCode2(zipCode: ZipCodes) {
        this.aliasResponsiblePartyPrivacyForm.patchValue({
            city002: zipCode.city,
            state002: zipCode.state,
            zipCode002: zipCode.zipCode,
        });
    }

    setCityAndStateProvByZipCode3(zipCode: ZipCodes) {
        this.aliasResponsiblePartyPrivacyForm.patchValue({
            city003: zipCode.city,
            state003: zipCode.state,
            zipCode003: zipCode.zipCode,
        });
    }

    populateDynamicForm(memberContact: MemberContact[]) {
        this.contactsState = [];
        this.contactsState = JSON.parse(JSON.stringify(this.contactsState));
        // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        memberContact.forEach((memberContact: MemberContact) => {
            let mockConfig = JSON.parse(JSON.stringify(this.memberContactFormConfig)); // make a copy of original config
            this.memberContactFormConfig.forEach((field, index) => {
                if (field.name === MemberContactFieldNames.CONTACT_SOURCE) {
                    mockConfig[index].value = memberContact.contactSource;
                } else if (field.name === MemberContactFieldNames.DISTR_METHOD) {
                    mockConfig[index].value = memberContact.primaryDistributionMethod;
                } else if (field.name === MemberContactFieldNames.EMAIL_ID) {
                    mockConfig[index].value = memberContact.emailId;
                } else if (field.name === MemberContactFieldNames.FAX_NUMBER) {
                    mockConfig[index].value = memberContact.faxNumber;
                }
            });
            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            formState.id = {
                seqMembId: memberContact.seqMembId,
                contactSource: memberContact.contactSource,
            };
            this.contactsState.push(formState); // add record
        });
        this.contactsState = JSON.parse(JSON.stringify(this.contactsState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    saveMemberContact(event: any) {
        let memberContacts = new Array<MemberContact>();
        const updatedRecords: FormRow[] = this.contactsState.filter(
            (record) => record.action
        );

        if (updatedRecords.length > 0) {
            this.contactsState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map((k) => ({
                        key: k,
                        value: updatedRecord[k],
                    }));
                    let memberContact: MemberContact = this.populateMemberContactField(
                        pair,
                        FORM_FIELD_ACTION_TYPES.UPDATE
                    );
                    memberContact.memberContactPrimaryKey.seqMembId = this.seqMembId;
                    memberContact.memberContactPrimaryKey.contactSource = this.MemeberContact[
                        index
                        ].memberContactPrimaryKey.contactSource;
                    memberContacts.push(memberContact);
                }
            });
        }

        const newRecords = event.slice(this.contactsState.length);

        newRecords.forEach((record) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            memberContacts.push(
                this.populateMemberContactField(pair, FORM_FIELD_ACTION_TYPES.ADD)
            );
        });
        // ('============================= api records with action update/add ================================');
        // groupContacts     => variable contains all the updated records and new record to add updated by form-inline grid

        // this.memberMasterContactService.addUpdateGroupContact(groupContacts).subscribe(resp => {
        //     this.toastService.showToast('Contact updated Successfully', NgbToastType.Success)
        // }, error => {
        //     this.toastService.showToast(error, NgbToastType.Danger)
    }

    populateMemberContactField(event: any, action: FORM_FIELD_ACTION_TYPES) {
        let memberContact = new MemberContact();

        memberContact.memberContactPrimaryKey = {
            seqMembId: this.memberMaster.seqMembId,
        };

        memberContact.emailId = event[2].value;
        memberContact.faxNumber = event[3].value;
        memberContact.primaryDistributionMethod = event[1].value;
        memberContact.contactSource = event[0].value;
        memberContact.action = action;

        return memberContact;
    }

    getCountries() {
        this.CountryService.getCountrys().subscribe(
            (countries) => {
                this.countries = countries;
            }
        );
    }

    grid1SelectionChange() {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0]) {
            if (this.inputValue === true) {
                this.popupAlert();
            }

            this.searchStatus = true;
            this.keyValues = selectedRows[0].seq_memb_id;
            this.seqMembId = selectedRows[0].seq_memb_id;
            this.getMemberMasterById(selectedRows[0].seq_memb_id);
            this.getMemberContact(selectedRows[0].seq_memb_id);
        } else {
            this.keyValues = "";
            this.searchStatus = false;
        }
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
            onGridReady: () => {
                if (this.SubID) {
                    this.dataGrid001GridOptions.api.showLoadingOverlay();
                    this.aliasResponsiblePartyPrivacyForm.patchValue({
                        subscriberId: this.SubID,
                    }, {emitEvent: false})
                    this.loadGrids();
                }
            }
        };
        this.dataGrid001GridOptions.editType = "fullRow";
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Person No",
                field: "person_number",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Last",
                field: "last_name",
                width: 150,
            },
            {
                headerName: "First",
                field: "first_name",
                width: 150,
            },
            {
                headerName: "DOB",
                field: "date_of_birth",
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
                width: 150,
            },
            {
                headerName: "Citizenship",
                field: "user_defined_2",
                width: 150,
            },
        ];
    }

    resetAll() {
        this.isResetForm = true;
        this.aliasResponsiblePartyPrivacyForm.reset();
        this.dataGrid001GridOptions.api.setRowData([]);
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
        };
        this.dataGrid002GridOptions.editType = "fullRow";
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Contact Source",
                field: "memberContactPrimaryKey.contactSource",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                headerClass: "clr-blue",
            },
            {
                headerName: "Distr Method",
                field: "primaryDistributionMethod",
                width: 250,
                headerClass: "clr-blue",
            },
            {
                headerName: "Email Id",
                field: "emailId",
                width: 150,
            },
            {
                headerName: "Fax Number",
                field: "faxNumber",
                width: 150,
            },
        ];
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.aliasResponsiblePartyPrivacyForm = this.formBuilder.group(
            {
                diamondId: ["", {updateOn: "blur", validators: []}],
                subscriberId: ["", {updateOn: "blur", validators: []}],
                lastName001: ["", {updateOn: "blur", validators: []}],
                first001: ["", {updateOn: "blur", validators: []}],
                addr1001: ["", {updateOn: "blur", validators: []}],
                addr2001: ["", {updateOn: "blur", validators: []}],
                city001: ["", {updateOn: "blur", validators: []}],
                state001: ["", {updateOn: "blur", validators: []}],
                zipCode001: [
                    "",
                    {updateOn: "blur", validators: [this.ZipCodeValidator()]},
                ],
                phoneNumber001: [
                    "",
                    {
                        updateOn: "blur",
                        validators: [this.PhoneValidator(), Validators.pattern("^[0-9]*$")],
                    },
                ],
                country001: ["", {updateOn: "blur", validators: []}],
                dynamicText001: ["", {updateOn: "blur", validators: []}],
                lastName002: ["", {updateOn: "blur", validators: []}],
                first002: ["", {updateOn: "blur", validators: []}],
                addr1002: ["", {updateOn: "blur", validators: []}],
                addr2002: ["", {updateOn: "blur", validators: []}],
                city002: ["", {updateOn: "blur", validators: []}],
                state002: ["", {updateOn: "blur", validators: []}],
                zipCode002: [
                    "",
                    {updateOn: "blur", validators: [this.ZipCodeValidator()]},
                ],
                phoneNumber002: [
                    "",
                    {
                        updateOn: "blur",
                        validators: [this.PhoneValidator(), Validators.pattern("^[0-9]*$")],
                    },
                ],
                country002: ["", {updateOn: "blur", validators: []}],
                dynamicText002: ["", {updateOn: "blur", validators: []}],
                lastName003: ["", {updateOn: "blur", validators: []}],
                firstName003: ["", {updateOn: "blur", validators: []}],
                addr1003: ["", {updateOn: "blur", validators: []}],
                addr2003: ["", {updateOn: "blur", validators: []}],
                city003: ["", {updateOn: "blur", validators: []}],
                state003: ["", {updateOn: "blur", validators: []}],
                zipCode003: [
                    "",
                    {updateOn: "blur", validators: [this.ZipCodeValidator()]},
                ],
                phoneNumber003: [
                    "",
                    {
                        updateOn: "blur",
                        validators: [this.PhoneValidator(), Validators.pattern("^[0-9]*$")],
                    },
                ],
                country003: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    PhoneValidator() {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value == null) {
                return null;
            }
            if (
                control.value.toString().length == 7 ||
                control.value.toString().length == 10 ||
                control.value.toString().length == 0
            ) {
                return null;
            }
            return {phoneValidator: true};
        };
    }

    ZipCodeValidator() {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (control.value == null) {
                return null;
            }
            if (
                control.value.toString().length == 5 ||
                control.value.toString().length == 9
            ) {
                return null;
            }
            return {phoneValidator: true};
        };
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getMemberMasterFormData(): MemberMaster {
        let MemberMaster1 = new MemberMaster();
        console.log(
            Form.getValue(this.aliasResponsiblePartyPrivacyForm, "firstName003")
        );
        //  MemberMaster1.diamondId = Form.getValue(this.aliasResponsiblePartyPrivacyForm, 'diamondId');
        //MemberMaster1.subscriberId = Form.getValue(this.aliasResponsiblePartyPrivacyForm, 'subscriberId');
        MemberMaster1.akaLastName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "lastName001"
        );
        MemberMaster1.akaFirstName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "first001"
        );
        MemberMaster1.akaAddressLine1 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr1001"
        );
        MemberMaster1.akaAddressLine2 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr2001"
        );
        MemberMaster1.akaCity = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "city001"
        );
        MemberMaster1.akaState = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "state001"
        );
        MemberMaster1.akaZipCode = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "zipCode001"
        );
        MemberMaster1.akaPhoneNumber = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "phoneNumber001"
        );
        MemberMaster1.akaCountry = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "country001"
        );
        // MemberMaster1.dynamicText001 = Form.getValue(this.aliasResponsiblePartyPrivacyForm, 'dynamicText001');
        MemberMaster1.respLastName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "lastName002"
        );
        MemberMaster1.respFirstName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "first002"
        );
        MemberMaster1.respAddressLine1 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr1002"
        );
        MemberMaster1.respAddressLine2 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr2002"
        );
        MemberMaster1.respCity = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "city002"
        );
        MemberMaster1.respState = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "state002"
        );
        MemberMaster1.respZipCode = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "zipCode002"
        );
        MemberMaster1.respPhoneNumber = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "phoneNumber002"
        );
        MemberMaster1.respCountry = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "country002"
        );
        // MemberMaster1.dynamicText002 = Form.getValue(this.aliasResponsiblePartyPrivacyForm, 'dynamicText002');
        MemberMaster1.privLastName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "lastName003"
        );
        MemberMaster1.privFirstName = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "firstName003"
        );
        MemberMaster1.privAddressLine1 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr1003"
        );
        MemberMaster1.privAddressLine2 = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "addr2003"
        );
        MemberMaster1.privCity = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "city003"
        );
        MemberMaster1.privState = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "state003"
        );
        MemberMaster1.privZipCode = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "zipCode003"
        );
        MemberMaster1.privPhoneNumber = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "phoneNumber003"
        );
        MemberMaster1.privCountry = Form.getValue(
            this.aliasResponsiblePartyPrivacyForm,
            "country003"
        );
        MemberMaster1.subscriberId = this.memberMaster.subscriberId;
        MemberMaster1.employmentStatusCode = this.memberMaster.employmentStatusCode;
        MemberMaster1.firstName = this.memberMaster.firstName;
        MemberMaster1.lastName = this.memberMaster.lastName;
        MemberMaster1.seqMembId = this.memberMaster.seqMembId;
        MemberMaster1.seqSubsId = this.memberMaster.seqSubsId;
        MemberMaster1.dualCoverageFlag = this.memberMaster.dualCoverageFlag;
        MemberMaster1.personNumber = this.memberMaster.personNumber;
        // TODO: need fix
        // groupMaster.updateProcess = this.groupMasterForm.get('stateProv').value;
        // 'stateProv': this.groupMaster.updateProcess,
        return MemberMaster1;
    }

    UpdateARPPForm() {
        console.log(
            this.aliasResponsiblePartyPrivacyForm.get("phoneNumber001").errors
        );
        this.formValidation.validateForm();
        if (this.aliasResponsiblePartyPrivacyForm.valid) {
            let memmaster = this.getMemberMasterFormData();
            this.memberMasterService
                .updateMemberMaster(memmaster, this.seqMembId)
                .subscribe(
                    (MemberContacts) => {
                        this.toastService.showToast(
                            "Record successfully updated.",
                            NgbToastType.Success
                        );
                    }
                );
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000)
            }
            this.inputValue = false;
        } else {
            this.toastService.showToast(
                "Required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }

    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    //statements;
                    break;
                }
                case "Open": {
                    this.resetAll();
                    //statements;
                    break;
                }
                case "Save": {
                    this.UpdateARPPForm();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(
                        "Action is not valid",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Topic") {
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === "Special") {
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

    showPopUp(message: string, title: string) {
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    onChangeSubscriberId(event: any) {
        this.aliasResponsiblePartyPrivacyForm.patchValue({
            subscriberId: event.target.value,
        });
        this.loadGrids();
    }

    loadGrids() {
        this.memberMasterService.checkSubId(this.aliasResponsiblePartyPrivacyForm.get("subscriberId").value).subscribe(
            (memberMasters: any[]) => {
                if (memberMasters) {
                    let data1 = memberMasters[0].seq_memb_id;
                    if (data1 == null || data1 == "") {
                        this.messageService.findByMessageId(14040).subscribe((message: MessageMasterDtl[]) => {
                            this.toastService.showToast('14040: ' + message[0].messageText, NgbToastType.Danger);
                        });
                    } else {
                        this.getGridOne(data1);
                    }
                } else {
                    this.messageService.findByMessageId(14040).subscribe((message: MessageMasterDtl[]) => {
                        this.toastService.showToast('14040: ' + message[0].messageText, NgbToastType.Danger);
                    });
                }
            }
        );
    }

    getGridOne(data: any) {
        this.memberMasterService.getAliasResponsiblePart(data).subscribe((memberMasters) => {
            if (memberMasters) {
                if (memberMasters && memberMasters.length > 1) {
                    this.memberMasterLength = memberMasters.length - 1;
                }
                this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex(key => key.person_number == this.selectedMember)] : memberMasters[this.memberMasterLength];
                this.dataGrid001GridOptions.api.setRowData(memberMasters);
                this.dataGrid001GridOptions.api.selectIndex(this.selectedMember ? memberMasters
                    .findIndex(key => key.person_number == this.selectedMember) : 0, false, false);
            } else {
                this.dataGrid001GridOptions.api.setRowData([]);
            }
        }, (error) => {
            this.dataGrid001GridOptions.api.setRowData([]);
        });
    }

    openLookupPage() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.aliasResponsiblePartyPrivacyForm.patchValue({
                subscriberId: resp.subscriberId,
                diamondId: resp.diamondId,
            }, {emitEvent : false});
            this.selectedMember = resp.personNumber;
            this.loadGrids();
        });
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", disabled: true},
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
                    {name: "Master File"},
                    {name: "Eligibility History"},
                    {name: "Coordination of Benefits"},
                    {name: "Alias/Responsible Party/Privacy"},
                    {name: "Member Address"},
                    {name: "M+C Information"},
                    {name: "Working Aged"},
                    {name: "Billing Control"},
                    {name: "Conditions"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [{name: "Member Lookup"}],
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

    onLookupFieldChange(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.inputValue === true) {
            this.popupAlert();
        } else {
            this.activeModal.close();
        }
    };

    inputEvent = () => {
        this.inputValue = true;
    };

    popupAlert = () => {
        return new Promise((resolve, reject) => {
            try {
                let popUpMessage = new PopUpMessage(
                    'Alias Responsible Party Privacy',
                    'Alias Responsible Party Privacy',
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
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    if (resp.name === 'Yes') {
                        this.UpdateARPPForm();
                    } else if (resp.name === 'No') {
                        this.activeModal.close()
                    } // 3rd case: In case of cancel do nothing
                    resolve();
                    this.inputValue = false;
                });
            } catch (e) {
                console.log(e);
                reject();
            }
        });
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/ALIAS_Member_Alias_Responsible_Party.htm';
    };

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Master File": {
                const ref = this.modalService.open(MemberMasterComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Eligibility History": {
                const ref = this.modalService.open(MemberEligibilityHistoryComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Coordination of Benefits": {
                const ref = this.modalService.open(MemberCobHistoryComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Alias/Responsible Party/Privacy": {
                const ref = this.modalService.open(AliasResponsiblePartyPrivacyComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Member Address": {
                const ref = this.modalService.open(MemberAddressComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "M+C Information": {
                const ref = this.modalService.open(MemberMedicareComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Working Aged": {
                const ref = this.modalService.open(MemberWorkingAgedComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Billing Control": {
                const ref = this.modalService.open(MemberBillingComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            case "Conditions": {
                const ref = this.modalService.open(MemberConditionsComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.SubID = this.aliasResponsiblePartyPrivacyForm.get('subscriberId').value;
                this.activeModal.close();
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }
}
