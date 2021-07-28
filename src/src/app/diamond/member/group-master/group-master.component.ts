/* Copyright (c) 2020 . All Rights Reserved. */

import {DatePipe} from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef, HostListener,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {NgbAccordionConfig, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UntilDestroy} from "@ngneat/until-destroy";
import {GridOptions} from "ag-grid-community";
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbToastType} from "ngb-toast";
import {NgxSpinnerService} from 'ngx-spinner';
import {ContactTitleMaster, GroupContactPerson, GroupMaster, MessageMasterDtl, SecUser} from "../../../api-models";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {ZipCodes} from '../../../api-models/zip-codes';
import {
    ContactTitleMasterService,
    DddwDtlService,
    DddwHdrService,
    GroupContactPersonService,
    GroupMasterService,
    MessageMasterDtlService,
    PremiumMasterService,
    ReasonCodeMasterService,
    SecUserService
} from "../../../api-services";
import {CountryService} from '../../../api-services/country.service';
import {NoteMasterService} from "../../../api-services/notes/note-master.service";
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {ZipCodesService} from '../../../api-services/zip-codes.service';
import {MEM_MODULE_ID} from '../../../shared/app-constants';
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {DynamicFormComponent} from '../../../shared/components/dynamic-form/dynamic-form.component';
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {NoteTypeComponent} from '../../../shared/components/note-type/note-type.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {MessageType, PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {DatePickerConfig, NGBModalOptions} from "../../../shared/config";
import {Form} from "../../../shared/helpers/form.helper";
import {GroupMasterLookup} from "../../../shared/lookup/group-master-lookup";
import {ContactPersonFieldNames, ContactPersonFormConfig} from "../../../shared/models/constants";
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {AuditService} from "../../../shared/services/audit.service";
import {DeactivateComponent} from "../../../shared/services/deactivate-guard.service";
import {SecurityService} from "../../../shared/services/security.service";
import {
    CONSTANTS,
    getGroupMasterSearchShortcut,
    getGroupMasterShortcutKeys
} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {RequiredValidator} from '../../../shared/validators/required.validator';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NoteWindowComponent} from '../../support/note-window/note-window.component';
import {GroupBillingComponent} from '../group-billing/group-billing.component';
import {GroupContractComponent} from '../group-contract/group-contract.component';
import {GroupDetailComponent} from '../group-detail/group-detail.component';
import {GroupPanelComponent} from '../group-panel/group-panel.component';
import {GroupUserFieldsComponent} from "../group-user-fields/group-user-fields.component";
import {HelpComponent} from '../help/help.component';
import {AuthenticationService} from "../../../api-services/authentication.service";

// Use the Component directive to define the GroupMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({checkProperties: true})
@Component({
    selector: "groupmaster",
    templateUrl: "./group-master.component.html",
    styleUrls: ["./group-master.component.scss"],
    providers: [
        DatePipe,
        Mask,
    ],
})
export class GroupMasterComponent
    implements OnInit, DeactivateComponent, AfterViewInit, OnDestroy {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    public windowId: string = "GROUP";
    public seqSourceId: number = -1;
    faSearch = faSearch;
    levels: any[] = [];
    reasonCodes: any[] = [];
    countries: any[] = [];
    groupTypes: any[] = [];
    dueDateRules: any[] = [];

    groupMasterExists = false;
    disabled = false;
    groupMasterForm: FormGroup;
    @ViewChild("contactForm") groupContactPersonsForm: DynamicFormComponent;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public groupContactPerson: GroupContactPerson[];
    private displayMessage: any;
    public popUpMessage: PopUpMessage;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    public showGroupField: boolean;
    public datePickerConfig = DatePickerConfig;
    editGroupMaster: boolean;
    groupMaster: GroupMaster;
    groupMasters: GroupMaster[];
    menu: Menu[] = [];
    inProgress = false;
    // To check if the any field value changed.
    isMasterFormStateChanged = false;
    screenCloseRequested: Boolean = false;
    contactPersonFormConfig = ContactPersonFormConfig;
    contactNumbersValid: boolean = true;

    @Input() tabComponent: any;
    @Input() groupId: boolean = false;
    @Input() showIcon: boolean = false;
    @ViewChild("federalTaxId") federalTaxIdElement: ElementRef;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    menuOpened= ""
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    searchModel = new SearchModel(
        "groupmasters/lookup",
        GroupMasterLookup.GROUP_MASTER_ALL,
        GroupMasterLookup.GROUP_MASTER_DEFAULT,
        []
    );
    isUserGroupFieldOpen: boolean = false;
    isContractOpen: boolean = false;
    isDetailOpen: boolean = false;
    responseStatus: Boolean = true;
    //  To reset PersonContact Form on new Group, change isResetForm = true
    isResetForm = false;
    zipCode: ZipCodes;
    noParentAllowedMessage: MessageMasterDtl[];
    parentMustBe3Message: MessageMasterDtl[];
    parentMustBe2Message: MessageMasterDtl[];
    parentNotFoundMessage: MessageMasterDtl[];
    federalTaxId: any;
    titles: ContactTitleMaster[] = [];
    titleOptions: any[] = [];
    mainForm = CONSTANTS.MAIN_FORM;
    focusDivName: string = null;
    createNewData: Boolean = false;
    groupDetailStatus: Boolean = false;
    statusClick = 1;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private datePipe: DatePipe,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private auditService: AuditService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private groupContactPersonService: GroupContactPersonService,
        private groupMasterService: GroupMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private dddwHdrService: DddwHdrService,
        private dddwDtlService: DddwDtlService,
        private countryService: CountryService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        public config: NgbAccordionConfig,
        private router: Router,
        private renderer: Renderer2,
        private zipCodesService: ZipCodesService,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private spinner: NgxSpinnerService,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private contactTitleMasterService: ContactTitleMasterService,
        private premiumMasterService: PremiumMasterService,
        private noteMasterService: NoteMasterService,
    ) {
        config.closeOthers = true;
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.

    /**
     * On Init only initialize if user has permission, (init by initializeComponentState()   )
     */
    ngOnInit(): void {
        this.hasPermission();
    }

    secWin: SecWinViewModel;
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    isSuperUser = false;
    secProgress = true;
    triggerGroupDetail() {
        if (this.menuBarComponent.first.menuOpen) {
          this.openGroupDetails()
        }
      }
      triggerGroupContract(){
        if (this.menuBarComponent.first.menuOpen) {
          this.openGroupContract()
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.showPopUp(
                        "You are not Permitted to view MEMBER Master",
                        "Member Master Permission"
                    );
                }
            },
            (error) => {
                this.secProgress = false;
                this.createContactPersonGrid();
                this.createForm();
                this.displayMessage = {};
                this.formValidation = new FormValidation(this.groupMasterForm);
                this.menuInit();
                this.getLevels();
                this.getReasonCodeMasters();
                this.getCountries();
                this.getGroupTypes();
                this.getDueDateRules();
                this.getContactTitles();

                if (this.groupId) {
                    this.groupMasterForm.patchValue({
                        groupId: this.groupId
                    });
                    this.getGroupMasterByGroupId();
                }
            })
    }

    /**
     * If user has permission to this page, then start OnInit
     */
    initializeComponentState() {
        this.secProgress = false;
        this.createContactPersonGrid();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupMasterForm);
        this.menuInit();
        this.getLevels();
        this.getReasonCodeMasters();
        this.getCountries();
        this.getGroupTypes();
        this.getDueDateRules();
        this.getContactTitles();
        if (this.groupId) {
            this.groupMasterForm.patchValue({
                groupId: this.groupId,
            });
            this.getGroupMasterByGroupId();
        }
    }

    getContactTitles() {
        this.contactTitleMasterService
            .getContactTitleMasters()
            .subscribe((res: any) => {
                this.titles = res ? res : [];
                if (this.titles && this.titles.length > 0) {
                    for (let i = 0; i < this.titles.length; i++) {
                        const title = this.titles[i];
                        const titleObj = {
                            key: title.contactTitle,
                            value: title.contactTitle,
                        };
                        this.titleOptions.push(titleObj);
                    }
                }
            });
    }

    /**
     * Implement Interface,  On component destroy, To check is data modified and not saved
     */
    canComponentExit(): boolean {
        if (this.isMasterFormStateChanged && this.editGroupMaster) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    return this.saveFormState(message, "Group Master");
                });
        }
        return true;
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getGroupMasterShortcutKeys(this));

        this.shortcutsInput.push(...getGroupMasterSearchShortcut(this));
        this.cdr.detectChanges();
    }

    shortcutsInput: ShortcutInput[] = [];
    @ViewChild("groupMasterInputID") inputID: ElementRef;

    isFormDataModified() {
        this.groupMasterForm.valueChanges.subscribe((res) => {
           if (this.statusClick === 1) {
               ++this.statusClick
           } else {
               this.isMasterFormStateChanged = true;
           }
        });
    }

    onKeyUpChangeFields(event: any) {
        this.isMasterFormStateChanged = true;
    }

    displayContactNumbersInvalidError() {
        this.messageService
            .findByMessageId(30140)
            .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "30140: " +
                    message[0].messageText.replace("@1", "Phone/Fax Number")
                        .replace("@2", "0, 7, 9, 10, 12, 15, 20"),
                    "DIAMOND @ Client/Server System"
                );
            });
    }

    setFormDataModified(event: any) {
        this.isMasterFormStateChanged = true;
    }
    groupContactSelectedRowIndex = -1;

    contactFormRowClick(event: any) {
        this.groupContactSelectedRowIndex = event.index;
    }

    validatePhoneNumbers(number: string): boolean {
        if(!number) {
            return true;
        }
        if (number.length == 0 || number.length == 7 || number.length == 9 || number.length == 10
            || number.length == 12 || number.length == 15 || number.length == 20) {
            return true
        } else {
            return false
        }

    }

    /**
     * Add Parent Field validator, to formGroup
     */
    addParentFieldValidation() {
        //     this.groupMasterForm.controls['groupId'].valueChanges.subscribe(groupId => {
        if (!this.groupMasterForm || !this.groupMasterForm.value.parent) {
            return;
        }
        let level = this.groupMasterForm.value.level;
        if (level) {
            if (level == "3") {
                // In case of Administrator (super user) ....no parent value
                this.groupMasterForm.controls["parent"].setValidators([
                    Validators.maxLength(0),
                ]);
            } else if (level == "2") {
                // In case Super Group, parent should be 00008
                // parent value should be of length 6, and should be 5 numbers and 1 Alphabet
                const pattern = /^\s*-?[0-9]{5,5}$/g;
                this.groupMasterForm.controls["parent"].setValidators([
                    Validators.pattern(pattern),
                ]);
            }
            this.groupMasterForm.get("parent").updateValueAndValidity({emitEvent: true});
        }
    }

    /**
     * On Parent Field Value changes, show error pop up
     */
    checkParentFieldValidation(parent: string): boolean {
        let isInvalid = false;
        // this.addParentFieldValidation();
        let level = this.groupMasterForm.value.level;
        if (parent && parent != "") {
            /** Check entered parent group id is exists or not .. if not then show an error */
            this.groupMasterService.getGroupMasterByGroupId(parent).subscribe(
                (res) => {
                    if (res) {
                        let groupIdOfParent = res.levelCode;
                        if (level == "3") {
                            // In case of Administrator (super user) ....no parent value
                            if (!this.noParentAllowedMessage) {
                                this.messageService.findByMessageId(25115).subscribe((message: MessageMasterDtl[]) => {
                                    this.showPopUp('25115: ' + message[0].messageText, 'Group Master');
                                    this.noParentAllowedMessage = message;
                                    isInvalid = this.invalidParentFocus();
                                });
                            } else {
                                this.showPopUp('25115: ' + this.noParentAllowedMessage[0].messageText, 'Group Master');
                                isInvalid = this.invalidParentFocus();
                            }
                        } else if (level == "2") {
                            if (groupIdOfParent != "3") {
                                if (!this.parentMustBe3Message) {
                                    this.messageService.findByMessageId(25114).subscribe((message: MessageMasterDtl[]) => {
                                        this.showPopUp('25114: ' + message[0].messageText, 'Group Master');
                                        this.parentMustBe3Message = message;
                                        isInvalid = this.invalidParentFocus();
                                    });
                                } else {
                                    this.showPopUp('25114: ' + this.parentMustBe3Message[0].messageText, 'Group Master');
                                    isInvalid = this.invalidParentFocus();
                                }
                            }
                        } else {
                            if (groupIdOfParent != "2") {
                                if (!this.parentMustBe2Message) {
                                    this.messageService.findByMessageId(25113).subscribe((message: MessageMasterDtl[]) => {
                                        this.showPopUp('25113: ' + message[0].messageText, 'Group Master');
                                        this.parentMustBe2Message = message;
                                        isInvalid = this.invalidParentFocus();
                                    });
                                } else {
                                    this.showPopUp('25113: ' + this.parentMustBe2Message[0].messageText, 'Group Master');
                                    isInvalid = this.invalidParentFocus();
                                }
                            }
                        }
                    } else {
                        if (!this.parentNotFoundMessage) {
                            this.messageService.findByMessageId(25112).subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp('25112: ' + message[0].messageText, 'Group Master');
                                this.parentNotFoundMessage = message;
                                isInvalid = this.invalidParentFocus();
                            });
                        } else {
                            this.showPopUp('25112: ' + this.parentNotFoundMessage[0].messageText, 'Group Master');
                            isInvalid = this.invalidParentFocus();
                        }
                    }
                },
                (error) => {
                    if (!this.parentNotFoundMessage) {
                        this.messageService.findByMessageId(25112).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp('25112: ' + message[0].messageText, 'Group Master');
                            this.parentNotFoundMessage = message;
                            return this.invalidParentFocus();
                        });
                    } else {
                        this.showPopUp('25112: ' + this.parentNotFoundMessage[0].messageText, 'Group Master');
                        isInvalid = this.invalidParentFocus();
                    }
                }
            );
        }
        return isInvalid;
    }

    invalidParentFocus(): boolean {
        const element = this.renderer.selectRootElement("#parent");
        this.groupMasterForm.get("parent").setValue(null);
        element.focus();
        return true;
    }

    resetAll() {
        this.groupMasterForm.reset();
        this.groupMasterForm.get('groupId').enable();
        this.inputID.nativeElement.focus();
        this.showGroupField = false;
        this.editGroupMaster = false;
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {
                        name: "New",
                        shortcutKey: 'Ctrl+M',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: "Open", shortcutKey: 'Ctrl+O'},
                    {
                        name: "Save",
                        shortcutKey: 'Ctrl+S',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: "Close", shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: "Main Menu...", shortcutKey: 'F2'},
                    {name: "Shortcut Menu...", shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit", shortcutKey: 'Alt+F4'},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {
                        name: "Cut", shortcutKey: 'Ctrl+X', disabled: true,
                    },
                    {name: "Copy", shortcutKey: 'Ctrl+C', disabled: true},
                    {name: "Paste", shortcutKey: 'Ctrl+V', disabled: true},
                    {isHorizontal: true},
                    {name: "Lookup", shortcutKey: 'F5'}
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    {name: "Master File"},
                    {name: "Detail"},
                    {name: "Contracts"},
                    {name: "Panel"},
                    {name: "Billing Control"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Group Lookup"},
                    {name: "D/C Information", disabled: true,},
                    {name: "Group User Fields"},
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: "F4"}],
            },
            {
                menuItem: "Window",
                dropdownItems: [
                    {name: "Show Timestamp", shortcutKey: 'Shift+Alt+S'},
                    {name: "Audit Display", shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Group Master"},
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

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewFunction();
                    break;
                }
                case "Open": {
                    this.createNewFunction();
                    break;
                }
                case "Save": {
                    this.saveGroupMaster();
                    break;
                }
                case "Close": {
                    this.modalClose()
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(
                        FunctionalGroupShortCutComponent,
                        NGBModalOptions
                    );
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
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
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === "Topic") {
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            switch (event.action) {
                case 'Notes' :
                    this.openNoteShortCut();
                    break;
            }
        }
        else if (event.menu.menuItem === "Help") {
            // handle special-Menu Actions
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        } else if (event.menu.menuItem === "Window") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Show Timestamp": {
                    if (this.groupMasterForm.get('groupId').value) {
                        const status = (this.groupContactSelectedRowIndex > -1);
                        this.showTimeStamp(!status);
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
                case 'Audit Display': {
                    if (this.groupMasterForm.get('groupId').value) {
                        this.toastService.showToast('Action was not implemented', NgbToastType.Danger)
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                }
            }
        } else if (event.menu.menuItem === "Notes") {
            this.handleNotesMenu(event.action);
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {
            case "Group Lookup": {
                this.openLookupPage();
                break;
            }
            case "D/C Information": {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
                    CONSTANTS.F_DC_INFO
                );
                if (status) {
                    this.toastService.showToast(
                        "This option is not implemented yet",
                        NgbToastType.Danger
                    );
                } else {
                    this.messageService
                        .findByMessageId(11073)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error(
                                "11073: " + message[0].messageText
                            );
                        });
                }
                break;
            }

            case "Group User Fields": {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
                    CONSTANTS.F_GRP_USR_FLDS
                );
                if (status) {
                    if (this.isUserGroupFieldOpen) {
                        this.openGroupUserField();
                    } else {
                        this.messageService
                            .findByMessageId(13035)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    "13035: " + message[0].messageText
                                );
                            });
                    }
                } else {
                    this.messageService
                        .findByMessageId(11073)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error(
                                "11073: " + message[0].messageText
                            );
                        });
                }
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Master File": {
                const ref = this.modalService.open(GroupMasterComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupMasterForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Contracts": {
                this.openGroupContract();
                break;
            }
            case "Detail": {
                if (
                    this.groupMaster && (this.groupMaster.levelCode == "3" ||
                    this.groupMaster.levelCode == "2")
                ) {
                    this.showPopUp(
                        "13062: Detail not allowed for non level 1 Group Types",
                        "Error"
                    );
                } else {
                    this.openGroupDetails();
                }
                break;
            }
            case "Billing Control": {
                const ref = this.modalService.open(GroupBillingComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupDetailStatus = this.groupDetailStatus;
                ref.componentInstance.groupMaster = this.groupMaster;
                ref.componentInstance.groupId = this.groupMasterForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Panel": {
                let ref = this.modalService.open(GroupPanelComponent, {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupMaster = this.groupMaster;
                ref.componentInstance.groupId = this.groupMasterForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                if (this.groupMaster && this.groupMaster.seqGroupId) {
                    this.popUpNotesMenuClicked(action);
                } else {
                    this.messageService
                        .findByMessageId(29005)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopupAlert(
                                "29005: " + message[0].messageText,
                                "Group Master"
                            );
                        });
                }
                break;
            }
            case "Note Type": {
                this.popUpNoteTypeMenuClicked(action);
                break;
            }
            case "Note Window": {
                this.popUpNoteWindowMenuClicked(action);
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }

    /**
     * Help Menu actions
     */
    handleHelpMenu() {
        const modalRef = this.modalService.open(HelpComponent, {
            windowClass: "myCustomModalClass",
            ...NGBModalOptions,
        });
        modalRef.componentInstance.currentWin = "GROUP_Group_Master.htm";
    }

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.groupMaster = resp;
            this.showGroupField = true;
            this.resetAll();
            this.groupMasterForm.get('groupId').setValue(this.groupMaster.groupId);
            this.getGroupMasterByGroupId();
        });
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
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

    secWinGridSelectionChange($event: any) {
    }

    popUpButtonClicked(button: any) {
        if (button.name === "yes") {
            this.isUserGroupFieldOpen = true;
            this.responseStatus = true;
            this.createNewGroup();
            this.groupMasterForm.get('groupId').disable();
        }
        if (button.name === "no") {
            this.showGroupField = false;
        }
        this.popUpMessage = null;
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

    popUpNoteTypeMenuClicked(button: any) {
        let ref = this.modalService.open(NoteTypeComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    popUpNoteWindowMenuClicked(button: any) {
        let ref = this.modalService.open(NoteWindowComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    createNewGroup() {
        this.showGroupField = true;
        this.addFormFieldsValidations();
        this.clearGroupMaster();
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "groupNotExistPopup") {
            this.popUpButtonClicked(button);
        }
    }

    groupUserFields: GroupMaster = new GroupMaster();

    openGroupUserField() {
        let ref = this.modalService.open(GroupUserFieldsComponent, {
            size: <any>"xl",
            backdrop: "static",
            keyboard: false,
            ...NGBModalOptions,
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupMaster = this.groupMaster;
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe((groupMaster: GroupMaster) => {
                this.groupUserFields = groupMaster;
                this.groupMaster = groupMaster;
            });
        }
    }

    openGroupContract() {
        let ref = this.modalService.open(GroupContractComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupId = this.groupMasterForm.get('groupId').value;
        this.activeModal.close();
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe((groupMaster: GroupMaster) => {
                if (
                    this.router.isActive("/diamond/member/group-master", false) == false
                ) {
                    this.saveGroupMaster();
                }
            });
        }
    }

    openGroupDetails() {
        let ref = this.modalService.open(GroupDetailComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.currentComponent = GroupDetailComponent;
        ref.componentInstance.tabComponent = GroupMasterComponent;
        ref.componentInstance.groupId = this.groupMasterForm.get('groupId').value;
        this.activeModal.close();
        if (ref.componentInstance.submitForm) {
            ref.componentInstance.submitForm.subscribe((groupMaster: GroupMaster) => {
                if (
                    this.router.isActive("/diamond/member/group-master", false) == false
                ) {
                    this.saveGroupMaster();
                }
            });
        }
    }

    checkGroupUserFieldsValidation(): boolean {
        let status = true;
        let message: PopUpMessage;
        // ----------- user_defined_12... is... situe location
        if ((!this.groupUserFields || !this.groupUserFields.userDefined12 || this.groupUserFields.userDefined12 === "") &&
            (!this.groupMaster || !this.groupMaster.userDefined12)) {
            status = false;
            let ref = this.modalService.open(PopUpMessageComponent, {
                backdrop: false,
                ...NGBModalOptions,
            });
            ref.componentInstance.showIcon = true;
            this.messageService.findByMessageId(29032).subscribe((messageobj: MessageMasterDtl[]) => {
                message = new PopUpMessage(
                    "Situs Location",
                    "c",
                    " 29032: " + messageobj[0].messageText.replace("@1", "Situs Location"),
                    "info",
                    [],
                    MessageType.ERROR,
                    false
                );
                message.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
                message.messageType = MessageType.ERROR;
                message.title = "Situs Location Required";
                message.icon = "info";
                ref.componentInstance.popupMessage = message;
            });
        }
        let isInvalid = this.checkParentFieldValidation(this.groupMasterForm.get('parent').value);
        return status || isInvalid;
    }

    createGroupMaster(groupMaster: GroupMaster) {
        this.formValidation.validateForm();
        let isValidForm = this.checkGroupUserFieldsValidation();
        if (this.groupMasterForm.valid && isValidForm === true) {
            groupMaster = this.getGroupMasterFormData();
            groupMaster.prorationMethod = "T";
            this.spinner.show();
            groupMaster.groupContactPersons = [];

            this.auditService.setAuditFields(groupMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.groupMasterService.createGroupMaster(groupMaster).subscribe(
                (response) => {
                    this.groupMaster = response;
                    this.groupContactPersonsForm.onSubmit();
                    this.editGroupMaster = false;
                    this.groupMasterExists = true;
                    this.inProgress = false;
                    this.isMasterFormStateChanged = false;
                    this.router.navigateByUrl("/");
                    this.spinner.hide();
                    this.toastService.showToast(
                        "Created Record Successfully",
                        NgbToastType.Success
                    );
                    if (this.createNewData) {
                        this.groupMasterForm.reset();
                        this.showGroupField = false;
                        this.focusDivName = this.mainForm;
                    }
                    this.groupMasterExists = true;
                },
                (error) => {
                    /*this.displaySaveError(error);*/
                    this.spinner.hide();
                }
            );
        } else if (this.groupMasterForm.invalid && isValidForm) {
            this.toastService.showToast(
                "Required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    getGroupMasterFormDataForUpdate(groupMaster: GroupMaster): GroupMaster {
        groupMaster.groupId = Form.getValue(this.groupMasterForm, "groupId").toUpperCase();
        groupMaster.seqGroupId = this.groupMaster.seqGroupId;
        groupMaster.levelCode = Form.getValue(this.groupMasterForm, "level");
        groupMaster.parent = Form.getValue(this.groupMasterForm, "parent");
        groupMaster.nationalEmployerId = Form.getValue(
            this.groupMasterForm,
            "nationalEmployerId"
        );
        groupMaster.taxId = Form.getValue(this.groupMasterForm, "federalTaxId");
        groupMaster.groupName1 = Form.getValue(this.groupMasterForm, "name1");
        groupMaster.holdReason = Form.getValue(this.groupMasterForm, "holdRsn");
        groupMaster.holdDate = Form.getDatePickerValue(
            this.groupMasterForm,
            "holdDate"
        );
        groupMaster.userDefined1 = Form.getValue(
            this.groupMasterForm,
            "claimsTeam"
        );
        groupMaster.groupName2 = Form.getValue(this.groupMasterForm, "name2");
        groupMaster.nextOpenStartDt = Form.getDatePickerValue(
            this.groupMasterForm,
            "nextOeStart"
        );
        groupMaster.shortName = Form.getValue(this.groupMasterForm, "shortName");
        groupMaster.nextOpenEndDate = Form.getDatePickerValue(
            this.groupMasterForm,
            "nextOeEnd"
        );
        groupMaster.addressLine1 = Form.getValue(this.groupMasterForm, "address1");
        groupMaster.sicCode = Form.getValue(this.groupMasterForm, "sicCode");
        groupMaster.addressLine2 = Form.getValue(this.groupMasterForm, "address2");
        groupMaster.city = Form.getValue(this.groupMasterForm, "city");
        groupMaster.userDefined2 = Form.getValue(this.groupMasterForm, "wcGroupId");
        groupMaster.groupType = Form.getValue(
            this.groupMasterForm,
            "wcGroupgroupTypeId"
        );
        groupMaster.zipCode = Form.getValue(this.groupMasterForm, "zippost");
        groupMaster.state = this.groupMasterForm.get("state").value;
        groupMaster.groupType = Form.getValue(this.groupMasterForm, "groupType");
        groupMaster.country = Form.getValue(this.groupMasterForm, "country");
        groupMaster.calcDueDateRule = Form.getValue(
            this.groupMasterForm,
            "dueDateRule"
        );
        groupMaster.calcDueDateDays = Form.getValue(
            this.groupMasterForm,
            "calcDays"
        );
        groupMaster.ptdThresholdPct = Form.getValue(
            this.groupMasterForm,
            "ptdThresholdPercent"
        );
        groupMaster.ptdUseReasonCde = Form.getValue(
            this.groupMasterForm,
            "claimHoldReasonCode"
        );
        groupMaster.prorationMethod = "T";
        // TODO: need fix
        groupMaster.updateProcess = this.groupMaster.updateProcess;
        groupMaster.groupContactPersons = this.groupContactPerson;

        return groupMaster;
    }

    getGroupMasterFormData(): GroupMaster {
        let groupMaster = new GroupMaster();
        if (this.groupUserFields) {
            groupMaster = this.groupUserFields;
        }
        groupMaster.groupId = Form.getValue(this.groupMasterForm, "groupId").toUpperCase();
        groupMaster.seqGroupId = this.groupMaster.seqGroupId;
        groupMaster.levelCode = Form.getValue(this.groupMasterForm, "level");
        groupMaster.parent = Form.getValue(this.groupMasterForm, "parent");
        groupMaster.nationalEmployerId = Form.getValue(
            this.groupMasterForm,
            "nationalEmployerId"
        );
        groupMaster.taxId = Form.getValue(this.groupMasterForm, "federalTaxId");
        groupMaster.groupName1 = Form.getValue(this.groupMasterForm, "name1");
        groupMaster.holdReason = Form.getValue(this.groupMasterForm, "holdRsn");
        groupMaster.holdDate = Form.getDatePickerValue(
            this.groupMasterForm,
            "holdDate"
        );
        groupMaster.userDefined1 = Form.getValue(
            this.groupMasterForm,
            "claimsTeam"
        );
        groupMaster.groupName2 = Form.getValue(this.groupMasterForm, "name2");
        groupMaster.nextOpenStartDt = Form.getDatePickerValue(
            this.groupMasterForm,
            "nextOeStart"
        );
        groupMaster.shortName = Form.getValue(this.groupMasterForm, "shortName");
        groupMaster.nextOpenEndDate = Form.getDatePickerValue(
            this.groupMasterForm,
            "nextOeEnd"
        );
        groupMaster.addressLine1 = Form.getValue(this.groupMasterForm, "address1");
        groupMaster.sicCode = Form.getValue(this.groupMasterForm, "sicCode");
        groupMaster.addressLine2 = Form.getValue(this.groupMasterForm, "address2");
        groupMaster.city = Form.getValue(this.groupMasterForm, "city");
        groupMaster.userDefined2 = Form.getValue(this.groupMasterForm, "wcGroupId");
        groupMaster.groupType = Form.getValue(
            this.groupMasterForm,
            "wcGroupgroupTypeId"
        );
        groupMaster.zipCode = Form.getValue(this.groupMasterForm, "zippost");
        groupMaster.state = this.groupMasterForm.get("state").value;
        groupMaster.groupType = Form.getValue(this.groupMasterForm, "groupType");
        groupMaster.country = Form.getValue(this.groupMasterForm, "country");
        groupMaster.calcDueDateRule = Form.getValue(
            this.groupMasterForm,
            "dueDateRule"
        );
        groupMaster.calcDueDateDays = Form.getValue(
            this.groupMasterForm,
            "calcDays"
        );
        groupMaster.ptdThresholdPct = Form.getValue(
            this.groupMasterForm,
            "ptdThresholdPercent"
        );
        groupMaster.ptdUseReasonCde = Form.getValue(
            this.groupMasterForm,
            "claimHoldReasonCode"
        );
        groupMaster.prorationMethod = "T";
        // TODO: need fix
        groupMaster.updateProcess = this.groupMaster.updateProcess;
        groupMaster.groupContactPersons = this.groupContactPerson;

        return groupMaster;
    }

    getGroupMasterFormDataForSearch(grupMaster: any): GroupMaster {
        let groupMaster = new GroupMaster();
        this.groupMaster = grupMaster;
        groupMaster.groupId = this.getValue(this.groupMaster.groupId);
        groupMaster.seqGroupId = this.groupMaster.seqGroupId;
        groupMaster.levelCode = this.getValue(this.groupMaster.levelCode);
        groupMaster.seqParentId = this.getValue(this.groupMaster.seqParentId);
        groupMaster.nationalEmployerId = this.getValue(
            this.groupMaster.nationalEmployerId
        );
        groupMaster.parent = this.groupMaster.parent;
        groupMaster.taxId = this.getValue(this.groupMaster.taxId);
        groupMaster.groupName1 = this.getValue(this.groupMaster.groupName1);
        groupMaster.holdReason = this.getValue(this.groupMaster.holdReason);
        groupMaster.holdDate = this.getValue(this.groupMaster.holdDate);
        groupMaster.userDefined1 = this.getValue(this.groupMaster.userDefined1);
        groupMaster.groupName2 = this.getValue(this.groupMaster.groupName2);
        groupMaster.nextOpenStartDt = this.groupMaster.nextOpenStartDt;
        groupMaster.shortName = this.getValue(this.groupMaster.shortName);
        groupMaster.nextOpenEndDate = this.getValue(
            this.groupMaster.nextOpenEndDate
        );
        groupMaster.addressLine1 = this.getValue(this.groupMaster.addressLine1);
        groupMaster.sicCode = this.getValue(this.groupMaster.sicCode);
        groupMaster.addressLine2 = this.getValue(this.groupMaster.addressLine2);
        groupMaster.city = this.getValue(this.groupMaster.city);
        groupMaster.userDefined2 = this.getValue(this.groupMaster.userDefined2);
        groupMaster.groupType = this.getValue(this.groupMaster.groupType);
        groupMaster.zipCode = this.getValue(this.groupMaster.zipCode);
        groupMaster.groupType = this.getValue(this.groupMaster.groupType);
        groupMaster.country = this.getValue(this.groupMaster.country);
        groupMaster.calcDueDateRule = this.getValue(
            this.groupMaster.calcDueDateRule
        );
        groupMaster.calcDueDateDays = this.getValue(
            this.groupMaster.calcDueDateDays
        );
        groupMaster.ptdThresholdPct = this.getValue(
            this.groupMaster.ptdThresholdPct
        );
        groupMaster.ptdUseReasonCde = this.getValue(
            this.groupMaster.ptdUseReasonCde
        );
        groupMaster.comments = this.getValue(this.groupMaster.comments);
        groupMaster.updateProcess = this.getValue(this.groupMaster.updateProcess);
        groupMaster.prorationMethod = "T";
        // TODO: need fix
        groupMaster.updateProcess = this.groupMaster.updateProcess;
        groupMaster.state = this.groupMasterForm.get("state").value;

        groupMaster.groupContactPersons = this.groupContactPerson;
        return groupMaster;
    }

    getValue(text: any) {
        if (text === null || text === undefined) {
            return "";
        } else {
            return text;
        }
    }

    updateGroupMaster(seqGroupId: number) {
        this.formValidation.validateForm();
        let isValidForm = this.checkGroupUserFieldsValidation();
        if (this.groupMasterForm.valid && isValidForm === true) {
            this.spinner.show();
            this.groupMasterService.getGroupMaster(this.groupMaster.seqGroupId).subscribe((gr) => {
                let groupMaster = this.getGroupMasterFormDataForUpdate(gr);
                this.auditService.setInsertFields(
                    groupMaster,
                    this.groupMaster,
                    OPERATIONS.UPDATE
                )
                this.auditService.setAuditFields(groupMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
                groupMaster.groupContactPersons = [];

                this.groupMasterService
                    .updateGroupMaster(groupMaster, seqGroupId)
                    .subscribe(
                        (response) => {
                            this.groupMaster = groupMaster;
                            this.groupContactPersonsForm.onSubmit();
                            this.inProgress = false;
                            this.spinner.hide();
                            this.toastService.showToast(
                                "Updated Record Successfully",
                                NgbToastType.Success
                            );
                            setTimeout(() => {
                                this.groupMaster.updateDatetimeDisplay = this.datePipe.transform(
                                    new Date(),
                                    "yyyy-MM-dd HH:mm:ss"
                                );
                                try {
                                    this.groupMaster.insertDatetimeDisplay = this.datePipe.transform(
                                        new Date(groupMaster.insertDatetime),
                                        "yyyy-MM-dd HH:mm:ss"
                                    );
                                } catch (e) {
                                    console.log(e);
                                }

                                this.groupMaster.updateUser = sessionStorage.getItem("user");
                                this.groupMaster.updateProcess = this.windowId;
                            }, 500);
                        },
                        (error) => {
                            this.spinner.hide();
                            /*this.displaySaveError(error);*/
                        }
                    );
            })

        } else {
            this.toastService.showToast(
                "Required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    saveGroupMaster() {
        if (
            this.securityService.checkInsertUpdatePermissions(
                this.editGroupMaster,
                this.secWin
            )
        ) {
            this.getParentId(); // get parent ID
        }
    }

    saveForm() {
        if (this.federalTaxId && this.federalTaxId.length !== 9) {
            this.federalPopup(this.federalTaxId.length);
        } else {
            this.groupMaster.groupContactPersons = [];
            if (this.editGroupMaster) {
                this.updateGroupMaster(this.groupMaster.seqGroupId);
            } else {
                this.createGroupMaster(this.groupMaster);
            }
        }
    }

    /**
     *  ------------------------------                       Check parent validations
     */
    getParentId() {
        const parent = Form.getValue(this.groupMasterForm, "parent");
        if (parent && parent.length > 0) {
            this.groupMasterService.getGroupMasterByGroupId(parent).subscribe((groupM) => {
                if (groupM && groupM.groupId) {
                    this.groupMaster.seqParentId = groupM.seqGroupId;
                    this.groupMaster.parent = parent;
                    this.saveForm();
                }
            });
            return;
        } else {
            this.saveForm();
        }
    }

    checkInsertUpdatePermissions(isEditState: any): boolean {
        if (isEditState) {
            if (this.secWin && this.secWin.hasUpdatePermission()) {
                return true;
            } else {
                this.showPopUp(
                    "You are not permitted to update Group Master ",
                    "Group Master Permissions"
                );
                return false;
            }
        } else {
            if (this.secWin && this.secWin.hasInsertPermission()) {
                return true;
            } else {
                this.showPopUp(
                    "You are not permitted to insert new Member Master",
                    "Member Master Permissions"
                );
                return false;
            }
        }
    }

    saveFormState(message: any, title: any): boolean {
        let state = false;
        let popUpMessage = new PopUpMessage(
            "popUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons.push(
            new PopUpMessageButton("Yes", "Yes", "", this.inProgress)
        );
        popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "Yes") {
                // save only if user presses Yes from Model
                this.isMasterFormStateChanged = false;
                this.inProgress = true;
                this.saveGroupMaster();
                ref.close("form closed");
                this.router.navigateByUrl("/");
                return true;
            } else if (resp.name === "No") {
                state = true;
                this.isMasterFormStateChanged = false;
                if (this.screenCloseRequested) {
                    this.activeModal.close();
                }
                if (this.createNewData) {
                    this.groupMasterForm.reset();
                    this.groupMasterForm.controls['groupId'].enable();
                    this.showGroupField = false;
                    this.focusDivName = this.mainForm;
                    this.createNewData = false;
                }
            } else if (resp.name === "Cancel") {
                this.screenCloseRequested = false;
                ref.close("form closed");
            } // 3rd case: In case of cancel do nothing
        });
        return state;
    }

    /**
     * Not Permitted to delete if doesn't have delete permission
     */
    deleteGroupMaster(seqGroupId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
            return;
        }
        this.groupMasterService
            .deleteGroupMaster(seqGroupId)
            .subscribe((response) => {
                this.toastService.showToast(
                    "Record successfully deleted.",
                    NgbToastType.Success
                );
            });
    }

    convertResultToGroupMaster(groupMaster: any) {
        this.groupMaster = groupMaster;
        this.groupMasterForm.patchValue({
            level: this.groupMaster.levelCode
        });
        this.groupMasterForm.patchValue({
            groupId: this.groupMaster.groupId,
            parent: this.groupMaster.parent,
            nationalEmployerId: this.groupMaster.nationalEmployerId,
            federalTaxId: this.groupMaster.taxId,
            name1: this.groupMaster.groupName1,
            holdRsn: this.groupMaster.holdReason,
            holdDate: this.dateFormatPipe.defaultDisplayDateFormat(
                this.groupMaster.holdDate
            ),
            name2: this.groupMaster.groupName2,
            nextOeStart: this.dateFormatPipe.defaultDisplayDateFormat(
                this.groupMaster.nextOpenStartDt
            ),
            shortName: this.groupMaster.shortName,
            nextOeEnd: this.dateFormatPipe.defaultDisplayDateFormat(
                this.groupMaster.nextOpenEndDate
            ),
            address1: this.groupMaster.addressLine1,
            sicCode: this.groupMaster.sicCode,
            claimsTeam: this.groupMaster.userDefined1,
            wcGroupId: this.groupMaster.userDefined2,
            address2: this.groupMaster.addressLine2,
            city: this.groupMaster.city,
            state: this.groupMaster.state,
            groupType: this.groupMaster.groupType,
            zippost: this.groupMaster.zipCode,
            country: this.groupMaster.country,
            dueDateRule: this.groupMaster.calcDueDateRule,
            calcDays: this.groupMaster.calcDueDateDays,
            ptdThresholdPercent: this.groupMaster.ptdThresholdPct,
            claimHoldReasonCode: this.groupMaster.ptdUseReasonCde,
        });
        this.federalTaxId = this.groupMaster.taxId;
    }

    CopyValueToShortName() {
        this.groupMasterForm.patchValue({
            shortName: this.groupMasterForm.value.name1
                .toUpperCase()
                .substring(0, 16)
                .replace(/\s/g, ""),
        });
    }

    clearGroupMaster() {
        let groupId = Form.getValue(this.groupMasterForm, "groupId");
        this.groupMaster = new GroupMaster();
        this.groupMaster.groupId = groupId;
        this.groupMasterForm.reset();
        let defaultGroup =
            this.levels.length > 0
                ? this.levels.find(
                (level) => level.dddwDtlPrimaryKey.displayVal === "Group"
                )
                : null;
        let defaultGroupType =
            this.groupTypes.length > 0
                ? this.groupTypes.find(
                (type) => type.dddwDtlPrimaryKey.displayVal === "Group"
                )
                : null;
        this.groupMasterForm.patchValue({
            groupId: this.groupMaster.groupId,
            level: defaultGroup ? defaultGroup.dddwDtlPrimaryKey.dataVal : null, // set default value of level
            groupType: defaultGroupType
                ? defaultGroupType.dddwDtlPrimaryKey.dataVal
                : null,
        });
        this.isFormDataModified();
    }

    resetDynamicGrid() {
        this.isResetForm = true;
        setTimeout(() => {
            this.isResetForm = false;
        }, 300)
    }

    getGroupMasterByGroupId() {
        this.resetDynamicGrid();
        this.contactsState = new Array<FormRow>();
        const id = this.groupMasterForm.getRawValue().groupId.toUpperCase();
        this.groupMasterService.getGroupMasterByGroupId(id).subscribe(
            (groupMaster) => {
                if (groupMaster) {
                    this.editGroupMaster = true;
                    this.popUpMessage = null;
                    this.showGroupField = true;
                    this.groupMasterExists = true;
                    this.groupMaster = groupMaster;
                    this.groupMaster.parent = groupMaster.parent;
                    this.groupMaster.seqParentId = groupMaster.seqParentId;
                    this.isUserGroupFieldOpen = true;
                    this.isContractOpen = true;
                    this.isDetailOpen = true;
                    this.checkGroupDetail();
                    this.convertResultToGroupMaster(groupMaster);
                    this.addFormFieldsValidations();
                    // to populate person contacts grid set isResetForm = false
                    this.isResetForm = false;
                    this.getGroupContactPersons(groupMaster.seqGroupId);
                    this.isMasterFormStateChanged = false;
                    this.groupMasterForm.get('groupId').disable();
                    this.seqSourceId = this.groupMaster.seqGroupId;
                    this.isFormDataModified();
                } else {
                    if (this.responseStatus) {
                        this.showGroupField = false;
                        this.groupMasterExists = false;
                        this.editGroupMaster = false;
                        this.isUserGroupFieldOpen = false;
                        this.isContractOpen = false;
                        this.isDetailOpen = false;

                        this.messageService.findByMessageId(13167).subscribe(res => {
                            let popMsg = new PopUpMessage(
                                "groupNotExistPopup",
                                "Group Master",
                                "13167: " + res[0].messageText,
                                "icon"
                            );
                            popMsg.buttons = [
                                new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
                                new PopUpMessageButton("no", "No", "btn btn-primary"),
                            ];
                            let ref = this.modalService.open(PopUpMessageComponent, {size: "lg"});
                            ref.componentInstance.popupMessage = popMsg;
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                                this.popUpButtonClicked(event);
                                this.isMasterFormStateChanged = false;
                            });
                            this.responseStatus = false;
                        });

                    }
                }

            }
        );
    }

    addFormFieldsValidations() {
        this.addCalcDateValidation();
        this.addDateValidation();
    }

    addDateValidation(e?: any) {
        if (e && e.target.value !== "") {
            this.groupMasterForm.controls["holdDate"].enable();
            return;
        }

        if (!this.groupMasterForm.value.holdRsn) {
            this.groupMasterForm.controls["holdDate"].disable();
        } else {
            this.groupMasterForm.controls["holdDate"].enable();
            this.groupMasterForm.patchValue({
                holdDate: this.dateFormatPipe.defaultDisplayDateFormat(
                    this.groupMaster.holdDate
                ),
            });
        }
    }

    getGroupMaster(seqGroupId: number) {
        this.groupMasterService.getGroupMaster(seqGroupId).subscribe(
            (groupMaster) => {
                this.getGroupContactPersons(groupMaster.seqGroupId);
                this.editGroupMaster = true;
                this.popUpMessage = null;
                this.showGroupField = true;
                this.convertResultToGroupMaster(groupMaster);
            },
            (error) => {
                this.showGroupField = false;
                this.editGroupMaster = false;
                let popMsg = new PopUpMessage(
                    "groupNotExistPopup",
                    "Group",
                    "13167: Entered group Id does not exists. Press yes to create a new Group.",
                    "icon"
                );
                popMsg.buttons = [
                    new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
                    new PopUpMessageButton("no", "No", "btn btn-primary"),
                ];
                let ref = this.modalService.open(PopUpMessageComponent, {size: "lg"});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                    this.popUpButtonClicked(event);
                });
            }
        );
    }

    getGroupMasters() {
        this.groupMasterService.getGroupMasters().subscribe((groupMasters) => {
            this.groupMasters = groupMasters;
        });
    }

    getLevels() {
        this.dddwDtlService
            .findByColumnNameAndDwname(CONSTANTS.LEVEL_CODE, CONSTANTS.DW_GROUP_DE)
            .subscribe((levels) => {
                this.levels = levels;
                let defaultGroup =
                    this.levels.length > 0
                        ? this.levels.find(
                        (level) => level.dddwDtlPrimaryKey.displayVal === "Group"
                        )
                        : null;

                this.groupMasterForm.patchValue({
                    level: defaultGroup.dddwDtlPrimaryKey.dataVal,
                });
            });
    }

    getGroupTypes() {
        this.dddwDtlService
            .findByColumnNameAndDwname(CONSTANTS.GROUP_TYPE, CONSTANTS.DW_GROUP_DE)
            .subscribe((groupTypes) => {
                this.groupTypes = groupTypes;
                let defaultType =
                    this.groupTypes.length > 0
                        ? this.groupTypes.find(
                        (type) => type.dddwDtlPrimaryKey.displayVal === "Group"
                        )
                        : null;

                this.groupMasterForm.patchValue({
                    groupType: defaultType.dddwDtlPrimaryKey.dataVal,
                });
            });
    }

    getDueDateRules() {
        this.dddwDtlService
            .findByColumnNameAndDwname(
                CONSTANTS.CALC_DUE_DATE_RULES,
                CONSTANTS.DW_GROUP_DE
            )
            .subscribe((dueDateRules) => {
                this.dueDateRules = dueDateRules;
            });
    }

    getReasonCodeMasters() {
        this.reasonCodeMasterService
            .getReasonCodeMasters()
            .subscribe((reasonCodes) => {
                this.reasonCodes = reasonCodes;
            });
    }

    getCountries() {
        this.countryService.getCountrysDropdowns().subscribe((countries) => {
            this.countries = countries;
        });
    }

    addCalcDateValidation(e?: any) {
        if (e && e.target.value !== "B") {
            this.groupMasterForm.controls["calcDays"].enable();
            return;
        }

        if (
            !this.groupMasterForm.value.dueDateRule ||
            this.groupMasterForm.value.dueDateRule === "B"
        ) {
            this.groupMasterForm.controls["calcDays"].disable();
        } else {
            this.groupMasterForm.controls["calcDays"].enable();
        }
    }

    getGroupContactPersons(seqGroupId: number) {
        this.groupContactPersonService
            .getGroupContactPerson(seqGroupId)
            .subscribe((groupContactPerson) => {
                groupContactPerson && groupContactPerson.sort((a,b) => {
                    if (a.groupContactPersonPrimaryKey.seqGroupContact > b.groupContactPersonPrimaryKey.seqGroupContact) {return 1;}
                    if (a.groupContactPersonPrimaryKey.seqGroupContact < b.groupContactPersonPrimaryKey.seqGroupContact) {return -1;}
                    else {return 0;}
                })
                this.groupContactPerson = groupContactPerson;
                this.populateDynamicForm(groupContactPerson);
            });
    }

    contactsState: Array<FormRow> = [];

    populateDynamicForm(groupContacts: GroupContactPerson[]) {
        if (!groupContacts || groupContacts.length < 1) {
            return;
        }

        groupContacts.forEach((groupContact: GroupContactPerson) => {
            let mockConfig = JSON.parse(JSON.stringify(this.contactPersonFormConfig)); // make a copy of original config
            this.contactPersonFormConfig.forEach((field, index) => {
                if (field.name === ContactPersonFieldNames.CONTACT_NAME) {
                    mockConfig[index].value = groupContact.contactName;
                } else if (field.name === ContactPersonFieldNames.TITLE) {
                    field.options = this.titleOptions;
                    mockConfig[index].options = this.titleOptions;
                    mockConfig[index].value = groupContact.contactTitle;
                } else if (field.name === ContactPersonFieldNames.EMAIL_ID) {
                    mockConfig[index].value = groupContact.emailId;
                } else if (field.name === ContactPersonFieldNames.PHONE_EXT) {
                    mockConfig[index].value = groupContact.extension;
                } else if (field.name === ContactPersonFieldNames.PHONE_NUMBER) {
                    mockConfig[index].value = groupContact.phoneNumber ? groupContact.phoneNumber : '';
                } else if (field.name === ContactPersonFieldNames.FAX_NUMBER) {
                    mockConfig[index].value = groupContact.faxNumber ? groupContact.faxNumber : '';
                } else if (field.name === ContactPersonFieldNames.AL_DIST_METH) {
                    mockConfig[index].value = groupContact.primaryDistributionMethod;
                } else {
                    mockConfig[index].value = ''
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            formState.id = {
                seqGroupId: groupContact.groupContactPersonPrimaryKey.seqGroupId,
                id: groupContact.groupContactPersonPrimaryKey.seqGroupContact,
            };
            this.contactsState.push(formState); // add record
        });
        this.contactsState = JSON.parse(JSON.stringify(this.contactsState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createContactPersonGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            defaultColDef: {
                editable: true,
            },
        };
        this.dataGridGridOptions.editType = "fullRow";
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Contact Name",
                field: "contactName",
                width: 150,
                headerClass: "clr-blue",
            },
            {
                headerName: "Title",
                field: "contactTitle",
                width: 150,
            },
            {
                headerName: "Phone Number",
                field: "phoneNumber",
                width: 150,
            },
            {
                headerName: "Ph Ext",
                field: "extension",
                width: 150,
            },
            {
                headerName: "Al Dist.Meth",
                field: "primaryDistributionMethod",
                width: 150,
                headerClass: "clr-blue",
                cellEditor: "agSelectCellEditor",
                cellEditorParams: {
                    values: ["Email", "Fax", "Print"],
                },
            },
            {
                headerName: "Email ID",
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

    openGroupUserFieldForSearch(groupMaster: any) {
        let ref = this.modalService.open(GroupUserFieldsComponent, {
            size: <any>"xl",
            ...NGBModalOptions,
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.groupMaster = this.getGroupMasterFormDataForSearch(
            groupMaster
        );
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupMasterForm = this.formBuilder.group({
            groupId: [
                "",
                {
                    validators: [
                        Validators.compose([Validators.required, Validators.maxLength(10)]),
                    ],
                },
            ],
            level: [
                "",
                {
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            parent: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(10)]},
            ],
            nationalEmployerId: ["", {validators: [Validators.maxLength(9)]}],
            federalTaxId: [
                "",
                {
                    validators: [
                        Validators.compose([
                            Validators.maxLength(9),
                            Validators.minLength(9),
                        ]),
                    ],
                },
            ],
            name1: ["", {validators: [Validators.maxLength(40)]}],
            holdRsn: ["", {validators: [Validators.maxLength(5)]}],
            holdDate: [
                "",
                {
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            name2: ["", {validators: [Validators.maxLength(40)]}],
            nextOeStart: ["", {validators: []}],
            shortName: [
                "",
                {
                    validators: [
                        Validators.required,
                        Validators.maxLength(15),
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            nextOeEnd: ["", {validators: []}],
            address1: ["", {validators: [Validators.maxLength(40)]}],
            sicCode: ["", {validators: [Validators.maxLength(7)]}],
            address2: ["", {validators: [Validators.maxLength(40)]}],
            claimsTeam: ["", {validators: [Validators.maxLength(15)]}],
            city: ["", {validators: [Validators.maxLength(30)]}],
            wcGroupId: ["", {validators: [Validators.maxLength(15)]}],
            state: ["", {validators: [Validators.maxLength(50)]}],
            zippost: ["", {validators: [Validators.maxLength(15)]}],
            groupType: ["", {updateOn: "blur", validators: []}],
            country: ["", {validators: [Validators.maxLength(20)]}],
            dueDateRule: ["", {updateOn: "blur", validators: []}],
            calcDays: ["", {updateOn: "blur", validators: []}],
            ptdThresholdPercent: ["", {updateOn: "blur", validators: []}],
            claimHoldReasonCode: ["", {validators: [Validators.maxLength(5)]}],
            phoneNumberPhExtAlDist: ["", {updateOn: "blur", validators: []}],
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    saveGroupContactPerson(event: any) {
        let validContactNumbers: boolean = true;
        let groupContacts = new Array<GroupContactPerson>();
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
                    let groupContact: GroupContactPerson = this.populateGroupContactField(
                        pair,
                        preStateRecord.action
                    );
                    groupContact.groupContactPersonPrimaryKey.seqGroupContact = preStateRecord.id.id;
                    groupContact.groupContactPersonPrimaryKey.seqGroupId = preStateRecord.id.seqGroupId;
                    if(preStateRecord.action == "delete" ||
                        (this.validatePhoneNumbers(groupContact.phoneNumber)
                            && this.validatePhoneNumbers(groupContact.faxNumber))) {
                        this.auditService.setAuditFields(groupContact, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
                        groupContacts.push(groupContact);
                    } else {
                        validContactNumbers = false;
                    }
                }
            });

        }

        const newRecords = event.slice(this.contactsState.length);
        newRecords.forEach((record: any) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            let groupContact: GroupContactPerson = this.populateGroupContactField(
                pair,
                FORM_FIELD_ACTION_TYPES.ADD
            );

            groupContact.groupContactPersonPrimaryKey = {
                seqGroupId: this.groupMaster.seqGroupId,
            };
            if (this.validatePhoneNumbers(groupContact.phoneNumber) && this.validatePhoneNumbers(groupContact.faxNumber)) {
                this.auditService.setAuditFields(groupContact, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
                groupContacts.push(groupContact);
            } else {
                validContactNumbers = false;
            }

        });
        // ('============================= api records with action update/add ================================');
        // groupContacts     => variable contains all the updated records and new record to add updated by form-inline grid


        if (groupContacts && groupContacts.length > 0 && validContactNumbers) {
            this.groupContactPersonService
                .addUpdateGroupContact(groupContacts)
                .subscribe((resp) => {
                    this.contactsState = [];
                    this.toastService.showToast(
                        "Record successfully updated.",
                        NgbToastType.Success
                    );
                    this.contactsState = [];
                    this.getGroupContactPersons(this.groupMaster.seqGroupId);
                    this.isMasterFormStateChanged = false;
                    if (this.screenCloseRequested) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                });
        } else if(!validContactNumbers) {
            this.displayContactNumbersInvalidError();
        }
    }

    gotoContactGrid() {
        let newRow = {
            emailId: "",
            faxNumber: "",
            extension: "",
            phoneNumber: "",
            primaryDistributionMethod: "",
            contactTitle: "",
            contactName: "",
            groupContactPersonPrimaryKey: {
                seqGroupId: 0,
            },
        };
        this.groupContactPerson.push(newRow);
        this.dataGridGridOptions.api.setRowData(this.groupContactPerson);
    }

    populateGroupContactField(event: any, action: FORM_FIELD_ACTION_TYPES) {
        let groupContact = new GroupContactPerson();

        groupContact.groupContactPersonPrimaryKey = {
            seqGroupId: this.groupMaster.seqGroupId,
        };

        groupContact.emailId = event[this.getIndex("emailId")].value;
        groupContact.faxNumber =
            event[this.getIndex(ContactPersonFieldNames.FAX_NUMBER)].value;
        groupContact.extension =
            event[this.getIndex(ContactPersonFieldNames.PHONE_EXT)].value;
        groupContact.phoneNumber =
            event[this.getIndex(ContactPersonFieldNames.PHONE_NUMBER)].value;
        groupContact.contactTitle =
            event[this.getIndex(ContactPersonFieldNames.TITLE)].value;
        groupContact.contactName =
            event[this.getIndex(ContactPersonFieldNames.CONTACT_NAME)].value;
        groupContact.primaryDistributionMethod =
            event[this.getIndex(ContactPersonFieldNames.AL_DIST_METH)].value;
        groupContact.action = action;

        return groupContact;
    }

    getIndex(fieldId: string): number {
        return this.contactPersonFormConfig.findIndex((x) => x.name === fieldId);
    }

    ngOnDestroy() {
    }

    onParentLookupFieldChange(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openParentLookupSearchModel();
        }
    }

    onLookupFieldChange(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldSearchModel("groupId");
        } else if (event.key === 'Tab') {
            this.groupMasterForm.patchValue({groupId: event.target.value,});
            this.getGroupMasterByGroupId();
        }
    }

    onChangeGroupId(event: any) {

    }

    /**
     * Generic Search Model
     */
    openParentLookupSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.groupMasterForm.patchValue({
                parent: res.groupId,
            });
        });
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel(field: any) {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            // this.groupMasterForm.get(field).setValue(res.groupId);
            this.groupMasterForm.patchValue({
                groupId: res.groupId,
            });
            //this.federalTaxId = res.groupId;
            this.showGroupField = true;            
            this.getGroupMasterByGroupId();
        });
    }

    private displaySaveError(error: string) {
        let ref = this.modalService.open(PopUpMessageComponent, {
            backdrop: false,
        });
        ref.componentInstance.showIcon = true;
        let message: PopUpMessage = new PopUpMessage(
            "Group_master_error",
            "Group Master",
            error
                ? error
                : "An Error occurred while creating new record. Please check your entry.",
            "info",
            [],
            MessageType.ERROR,
            false
        );
        message.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
        ref.componentInstance.popupMessage = message;
    }

    findDetailByZipCode(event: any) {
        this.zipCode = new ZipCodes();
        let zipCode = event.target.value;
        this.zipCodesService.getZipCode(zipCode).subscribe((resp) => {
            if (resp !== null) {
                this.zipCode = resp;
                this.setCityAndStateProvByZipCode(this.zipCode);
            }
        });
    }

    setCityAndStateProvByZipCode(zipCode: ZipCodes) {
        this.groupMasterForm.patchValue({
            city: zipCode.city,
            state: zipCode.state,
            zippost: zipCode.zip,
        });
    }

    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.isMasterFormStateChanged ) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopupAlert(message[0].messageText, 'Group Master');
                });

        } else {
            this.activeModal.close();
        }
    };

    showPopupAlert = (message: string, title: string) => {
        this.saveFormState(message, title);
    };

    federalValidation = (event: any) => {
        this.federalTaxId = event.target.value;
        let valueLength = this.federalTaxId.length;
        if (valueLength > 9) {
            event.preventDefault();
            this.federalPopup(valueLength);
        } else if (valueLength > 0 && valueLength < 9) {
            event.preventDefault();
            this.federalPopup(valueLength);
        } else {
            event.preventDefault();
        }
    };

    federalPopup = (length: any) => {
        let title = "Group - Federal Tax ID";
        let message =
            "Field Length must be 9 Characters, invalid length of " +
            length +
            " characters entered.";
        let popUpMessage = new PopUpMessage(
            "popUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons.push(new PopUpMessageButton("Ok", "Ok", "req"));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = false;
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            this.federalTaxIdElement.nativeElement.focus();
        });
    };

    federalValidationPopup = () => {
        let title = "Group - Federal Tax ID";
        let message =
            'Tax ID cannot contain Alpha Characters, "' +
            this.federalTaxId +
            '" entered.';
        let popUpMessage = new PopUpMessage(
            "popUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons.push(new PopUpMessageButton("Okay", "Okay", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        });
    };

    openNoteShortCut() {
        if (this.seqSourceId == -1) {
            this.messageService.findByMessageId(29005).subscribe(res => {
                this.showPopUp('29005: '+ res[0].messageText, 'DIAMOND@ Client/Server System')
            })
        } else {
            this.popUpNotesMenuClicked(null);
        }
    }

    focus(name: any) {
        this.focusDivName = name;
    }

    fileNewMenu() {
        if (this.isSuperUser) {
            if (this.focusDivName === "contacts-form") {
                this.groupContactPersonsForm.fileNewAddNewRow();
            } else {
                this.createNewData = true;
                if (this.isMasterFormStateChanged) {
                    this.messageService
                        .findByMessageId(29065)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopupAlert(message[0].messageText, "Group Master");
                        });
                }
            }
        }
    }

    private showTimeStamp = (isGroupMaster = true) => {
         let timeStampData = isGroupMaster? this.groupMaster: this.groupContactPerson[this.groupContactSelectedRowIndex];
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Group Master";
        ref.componentInstance.insertDateTime = timeStampData.insertDatetime;
        ref.componentInstance.insertDateTime = timeStampData.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = timeStampData.insertProcess;
        ref.componentInstance.insertUser = timeStampData.insertUser;
        ref.componentInstance.updateUser = timeStampData.updateUser;
        ref.componentInstance.updateDateTime = timeStampData.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = timeStampData.updateProcess;
    };

    checkGroupDetail = () => {
        let seqGroupId = this.groupMaster.seqGroupId;
        this.premiumMasterService.findByGroupId(seqGroupId).subscribe(groupDetails => {
            this.groupDetailStatus = groupDetails && groupDetails.length > 0;
        })
    };

    formatFunction = (num: any) => {
        if(!num.includes('.')) {
            let characters = parseInt(num, 10).toString();
            let output = '';
            for (let offset = characters.length; offset > 0; offset -= 3) {
                output = characters.slice(Math.max(offset - 3, 0), offset) + (output ? '.' + output : '');
            }
            return output;
        }
        return num;
    };

    createNewFunction = () => {
        if (
            this.groupMasterForm.get("groupId").value == null ||
            this.groupMasterForm.get("groupId").value == ""
        ) {
            this.showPopUp(
                "13024 Group Id Must be selected before a new record can be created.",
                "Group"
            );
        } else {
            this.createNewData = true;
            if (this.isMasterFormStateChanged && this.editGroupMaster) {
                this.messageService
                    .findByMessageId(29065)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopupAlert(message[0].messageText, 'Group Master');
                    });
            } else {
                this.resetAll();
            }
        }
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
    };

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
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Group User Fields'
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
                        this.onMenuItemClick(obj);
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
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    handleChangeScreen() {
        if (this.tabComponent === GroupDetailComponent) {
            this.openGroupDetails();
        }
    }

}
