/* Copyright (c) 2021 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit, QueryList, Renderer2,
    ViewChild, ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PmbArCustomerMasterService} from "../../../api-services/pmb-ar-customer-master.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {PmbArCustomerMaster} from "../../../api-models/pmb-ar-customer-master.model";
import {
    CompanyMasterService,
    DddwDtlService,
    GeneralLedgerReferenceService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services'
import {MessageMasterDtl, SecUser} from "../../../api-models";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {Menu, OPERATIONS, SearchModel} from "../../../shared/models/models";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {CustomerMaintenanceLookup} from "../../../shared/lookup/customer-maintenance-lookup";
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {NoteTypeComponent} from '../../../shared/components/note-type/note-type.component';
import {NoteWindowComponent} from '../../support/note-window/note-window.component';
import {HelpComponent} from '../../member/help/help.component';
import {CONSTANTS, getCustomerMaintenanceShortcutKeys} from '../../../shared/services/shared.service';
import {DynamicUserDefinedFieldsComponent} from '../../../shared/components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import {AuditService} from "../../../shared/services/audit.service";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {DatePipe} from "@angular/common";
import {PremiumHelpComponent} from "../premium-help/premium-help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the CustomerMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'customer-maintenance',
    templateUrl: './customer-maintenance.component.html',
    styleUrls: ['./customer-maintenance.component.scss'],
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        PmbArCustomerMasterService,
        DddwDtlService,
        CompanyMasterService,
        GeneralLedgerReferenceService,
        SystemCodesService
    ]
})
export class CustomerMaintenanceComponent implements OnInit, AfterViewInit, OnDestroy {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    customerMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    userTemplateId: string;
    searchCustomerModal = new SearchModel('pmbarcustomermasters/lookup',
        CustomerMaintenanceLookup.CUSTOMER_MAINTENANCE_ALL,
        CustomerMaintenanceLookup.CUSTOMER_MAINTENANCE_DEFAULT,

        [], true
    );
    billTypeMasters: any[];
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'ARCUS';
    private toastService: ToastService;
    private dataLoadedMap = new Map<string, boolean>();
    secColDetails = new Array<SecColDetail>();
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon: boolean = false;
    @Input() winID?: string;
    @Input() vid?: string;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild(DynamicUserDefinedFieldsComponent, { static: false }) userDefinedFields: DynamicUserDefinedFieldsComponent;

    @Input() vendorID?: string;
    public isSuperUser = false;
    public secProgress = true;
    private userId: any;
    public showData: boolean = false;
    private searchStatus: boolean = false;
    public buttonClicked: boolean = false;
    public menu: Menu[] = [];
    editPmbArCustomerMaster: boolean;
    pmbArCustomerMaster: PmbArCustomerMaster;
    pmbArCustomerMasters: PmbArCustomerMaster[];
    public faSearch = faSearch;
    private currentType: string = null;
    private currentId: string = null;
    screenCloseRequest: Boolean = false;
    valueChanged: Boolean = false;
    private createStatus: boolean = false;
    customerId: any;
    customerType: any;
	initLoad: boolean = true;
	dataWindowId: string;
    billTypeEnable: boolean = true;
    billTypeResetValue: any = '';
    premResetValue: any = '';

    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private pmbArCustomerMasterService: PmbArCustomerMasterService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private auditService: AuditService,
        private router: Router,
        public datepipe: DatePipe
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.winID = CONSTANTS.ARCUS_WINDID;
        this.dataWindowId = CONSTANTS.ARCUS_DATA_WINDOWID;
        this.hasPermission();
        this.getBillTypeMasters();
    }
    initializeComponentState() {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.customerMaintenanceForm);
    }

    /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */

    private hasPermission() {

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
                        "You are not Permitted to view Procedure Code Screen",
                        "Procedure Code Permission"
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("MEMBER_MASTER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }
    ngAfterViewInit(): void {
        this.shortcuts.push(...getCustomerMaintenanceShortcutKeys(this));

        this.shortcutsInput.push(...getCustomerMaintenanceShortcutKeys(this));
        this.cdr.detectChanges();


    }
    ngOnDestroy() {
    }

    shortcutsInput: ShortcutInput[] = [];
    @ViewChild('customerId') inputID: ElementRef;
    @ViewChild('type') inputType: ElementRef;

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    validateType(type: string): boolean {
        return type === '1' || type === '2' || type === '3' || type === '4';
    }
    private createPmbArCustomerMaster() {
        this.formValidation.validateForm();
        if (this.customerMaintenanceForm.valid && this.userDefinedFields.userDefinedFieldForm.valid) {
            let customerType = Form.getValue(this.customerMaintenanceForm, 'type');
            if (this.validateType(customerType)) {
                let pmbArCustomerMaster = new PmbArCustomerMaster();
                let customerId = Form.getValue(this.customerMaintenanceForm, 'customerId');
                pmbArCustomerMaster.pmbArCustomerMasterPrimaryKey = { customerId, customerType };
                pmbArCustomerMaster.shortName = Form.getValue(this.customerMaintenanceForm, 'shortName');
                pmbArCustomerMaster.customerName1 = Form.getValue(this.customerMaintenanceForm, 'customerName1');
                pmbArCustomerMaster.customerName2 = Form.getValue(this.customerMaintenanceForm, 'customerName2');
                pmbArCustomerMaster.customerAddrLine1 = Form.getValue(this.customerMaintenanceForm, 'address1');
                pmbArCustomerMaster.customerAddrLine2 = Form.getValue(this.customerMaintenanceForm, 'address2');
                pmbArCustomerMaster.customerCity = Form.getValue(this.customerMaintenanceForm, 'city');
                pmbArCustomerMaster.customerState = Form.getValue(this.customerMaintenanceForm, 'stateprov');
                pmbArCustomerMaster.customerPostalCode = Form.getValue(this.customerMaintenanceForm, 'zippost');

                pmbArCustomerMaster.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
                pmbArCustomerMaster.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;
                this.auditService.setAuditFields(pmbArCustomerMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD)

                this.pmbArCustomerMasterService.createPmbArCustomerMaster(pmbArCustomerMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.showData = true;
                    this.customerMaintenanceForm.get('customerId').disable({emitEvent: false});
                    this.customerMaintenanceForm.get('type').disable({emitEvent: false});
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.valueChanged = false;
                    this.createStatus = true;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                    this.createStatus = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("1087:Customer type must be 1-Group, 2-Individual, 3-Combined or 4-Annual Billing");
                this.createStatus = false;

            }

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            this.createStatus = false;

        }
    }

    private showTimeStamp  () {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Customer Maintenance";
        ref.componentInstance.insertDateTime = this.pmbArCustomerMaster.insertDatetimeDisplay
            ? this.pmbArCustomerMaster.insertDatetimeDisplay : "";

        ref.componentInstance.insertProcess = this.pmbArCustomerMaster.insertProcess;
        ref.componentInstance.insertUser = this.pmbArCustomerMaster.insertUser;
        ref.componentInstance.updateUser = this.pmbArCustomerMaster.updateUser;
        ref.componentInstance.updateDateTime = this.pmbArCustomerMaster.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.pmbArCustomerMaster.updateProcess;

    };

    updatePmbArCustomerMaster(customerType: string, customerId: string) {
        this.formValidation.validateForm();
        if (this.customerMaintenanceForm.valid && this.userDefinedFields.userDefinedFieldForm.valid) {
            let pmbArCustomerMaster = this.pmbArCustomerMaster;
            pmbArCustomerMaster.customerId = Form.getValue(this.customerMaintenanceForm, 'customerId');
            pmbArCustomerMaster.shortName = Form.getValue(this.customerMaintenanceForm, 'shortName');
            pmbArCustomerMaster.customerName1 = Form.getValue(this.customerMaintenanceForm, 'customerName1');
            pmbArCustomerMaster.customerName2 = Form.getValue(this.customerMaintenanceForm, 'customerName2');
            pmbArCustomerMaster.customerAddrLine1 = Form.getValue(this.customerMaintenanceForm, 'address1');
            pmbArCustomerMaster.customerAddrLine2 = Form.getValue(this.customerMaintenanceForm, 'address2');
            pmbArCustomerMaster.customerCity = Form.getValue(this.customerMaintenanceForm, 'city');
            pmbArCustomerMaster.customerState = Form.getValue(this.customerMaintenanceForm, 'stateprov');
            pmbArCustomerMaster.customerPostalCode = Form.getValue(this.customerMaintenanceForm, 'zippost');
            pmbArCustomerMaster.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
            pmbArCustomerMaster.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;

            this.auditService.setAuditFields(pmbArCustomerMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);

            this.pmbArCustomerMasterService.updatePmbArCustomerMaster(pmbArCustomerMaster, customerType, customerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.valueChanged = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }

    }

    savePmbArCustomerMaster() {
        if (this.editPmbArCustomerMaster) {
            this.updatePmbArCustomerMaster(this.currentType, this.currentId)
        } else {
            this.createPmbArCustomerMaster();
        }
        this.userDefinedFields.submit();
    }

    deletePmbArCustomerMaster(customerType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbArCustomerMasterService.deletePmbArCustomerMaster(customerType).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getPmbArCustomerMaster(customerId: string, customerType: string) {
        this.pmbArCustomerMasterService.getPmbArCustomerMaster(customerId, customerType).subscribe(pmbArCustomerMaster => {
            this.pmbArCustomerMaster = pmbArCustomerMaster;
            this.customerMaintenanceForm.patchValue({
                'customerId': this.pmbArCustomerMaster.customerId,
                'shortName': this.pmbArCustomerMaster.shortName,
                'customerName1': this.pmbArCustomerMaster.customerName1,
                'customerName2': this.pmbArCustomerMaster.customerName2,
                'city': this.pmbArCustomerMaster.customerCity,
            });
        });
    }

    getPmbArCustomerMasters() {
        this.pmbArCustomerMasterService.getPmbArCustomerMasters().subscribe(pmbArCustomerMasters => {
            this.pmbArCustomerMasters = pmbArCustomerMasters;
        });
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.customerMaintenanceForm = this.formBuilder.group({
            customerId: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(12)] }],
            type: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)] }],
            srch: ['', { updateOn: 'blur', validators: [] }],
            shortName: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
            customerName1: ['', { updateOn: 'blur', validators: [Validators.maxLength(60)] }],
            customerName2: ['', { updateOn: 'blur', validators: [Validators.maxLength(60)] }],
            address1: ['', { updateOn: 'blur', validators: [Validators.maxLength(40)] }],
            address2: ['', { updateOn: 'blur', validators: [Validators.maxLength(40)] }],
            city: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            stateprov: ['', { updateOn: 'blur', validators: [Validators.maxLength(6)] }],
            zippost: ['', { updateOn: 'blur', validators: [] }],
            premAnalyst: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }],
            billType: ['', { updateOn: 'blur', validators: [Validators.maxLength(15)] }]
        }, { updateOn: 'submit' });
    }

    public resetFormAndGrid() {
        if (this.customerId && this.inputType) {
            this.showData = true;
            this.createStatus = true;
        } else {
            this.showData = true;
            this.createStatus = false;
        }

        this.customerMaintenanceForm.get('customerId').enable({emitEvent: false});
        this.customerMaintenanceForm.get('type').enable({emitEvent: false});
        this.editPmbArCustomerMaster = false;
        this.currentId = null;
        this.customerMaintenanceForm.reset({onlySelf: true},{emitEvent: false});
        this.userDefinedFields.userDefinedFieldForm.reset();

    }

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.customerMaintenanceForm.get('customerId').value) {
                        this.resetFormAndGrid();
                    }
                    break;
                }
                case 'Open': {
                    this.openScreen();
                    break;
                }
                case 'Save': {
                    this.savePmbArCustomerMaster();
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }

                default: {

                    break;
                }
            }
        }
        else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        }

        else if (event.menu.menuItem === 'Notes') {
            // add method to handle Notes actions
        }

        else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Show Timestamp":
                    if (this.customerMaintenanceForm.get('customerId').value && this.customerMaintenanceForm.get('type').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                case 'default': {
                    break;
                }
            }

        }
        else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }



    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                this.popUpNotesMenuClicked(action);
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
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    helpScreen() {
        const modalRef = this.modalService.open(PremiumHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.currentWin = "ARCUS_Accounts_Receivable_Customer_Maintenance.htm";
        modalRef.componentInstance.showIcon = true;
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    popUpNoteTypeMenuClicked(button) {
        let ref = this.modalService.open(NoteTypeComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    popUpNoteWindowMenuClicked(button) {
        let ref = this.modalService.open(NoteWindowComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    // initialize dropdown menu
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' },
                ],
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Member Eligibility History'},
                    {name: '3 Member COB History'},
                    {name: '4 Customer Maintenance'},
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

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel2('customerId');

        } else if (event.key === 'Tab') {
            if (event.target.value === '') {
                let popUpMessage = new PopUpMessage(
                    'popUpMessageName',
                    'Customer Maintenance',
                    '1089: You must enter Customer ID',
                    'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    this.inputID.nativeElement.focus();
                    this.createStatus = false;
                });
            } else {
                this.alertMessage = null;
            }
        }
        this.customerId = event.target.value;
    }

    getBillTypeMasters() {
        this.pmbArCustomerMasterService.getBillTypeMasters().subscribe(billTypeMasters => {
            this.billTypeMasters = billTypeMasters;
        });
    }

    onLookupFieldChange2(event: any, type: string) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel2('type');
        } else if (event.key === 'Tab') {
            if (event.target.value === '') {
                let popUpMessage = new PopUpMessage(
                    'popUpMessageName',
                    'Customer Maintenance',
                    '1087: Customer type must be 1-Group, 2-Individual, 3-Combined or 4-Annual Billing.',
                    'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    this.inputType.nativeElement.focus();
                    this.createStatus = false;
                });
            } else {
                this.customerMaintenanceForm.patchValue({
                    'type': type
                },{emitEvent: false});
                this.findByType(type);
            }
        }
        this.customerType = event.target.value;
    }

    openLookupFieldSearchModel2(field: any) {

        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchCustomerModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: PmbArCustomerMaster) => {
            this.currentId = res.pmbArCustomerMasterPrimaryKey.customerId;
            this.customerMaintenanceForm.patchValue({
                'customerId': res.pmbArCustomerMasterPrimaryKey.customerId,
                'type': res.pmbArCustomerMasterPrimaryKey.customerType
            });
            this.findByType(res.pmbArCustomerMasterPrimaryKey.customerType);
        });

    }
    public onLookupFieldType(event: any, type: string) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.findByType(type);

        }
    }

    private popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes' && !this.createStatus) {
            this.createStatus = true;
            this.showData = true;
        }
        if (button.name == 'no') {
            this.createStatus = false;
            this.customerMaintenanceForm.get('customerId').enable();
            this.showData = false;
        }
    }

    public findByType(customerType: string) {
        this.formValidation.validateForm();
        if (this.customerMaintenanceForm.valid) {
            if (!this.validateType(customerType)) {
                this.messageService.findByMessageId(1087)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "1087: " +
                            message[0].messageText,
                            "Customer Maintenance"
                        );
                    });
            } else {
                let customerId: string
                if (this.customerMaintenanceForm.controls['customerId'].value) {
                    customerId = this.customerMaintenanceForm.controls['customerId'].value;
                    this.currentId = customerId;
                }

                this.currentType = customerType;
                this.pmbArCustomerMasterService.getPmbArCustomerMaster(this.currentId, customerType)
                    .subscribe((pmbArCustomerMaster: PmbArCustomerMaster) => {
                        this.showData = true;
                        this.pmbArCustomerMaster = pmbArCustomerMaster;
                        this.customerMaintenanceForm.get('customerId').disable({emitEvent: false});
                        this.customerMaintenanceForm.get('type').disable({emitEvent: false});
                        this.customerMaintenanceForm.patchValue({
                            'shortName': pmbArCustomerMaster.shortName,
                            'customerName1': pmbArCustomerMaster.customerName1,
                            'customerName2': pmbArCustomerMaster.customerName2,
                            'city': pmbArCustomerMaster.customerCity,
                            'address1': pmbArCustomerMaster.customerAddrLine1,
                            'address2': pmbArCustomerMaster.customerAddrLine2,
                            'stateprov': pmbArCustomerMaster.customerState,
                            'zippost': pmbArCustomerMaster.customerPostalCode
                        }, {emitEvent: false});
                        setTimeout(() => {
                            this.isFormValidateStatus();
                        }, 2000)
                        if (this.billTypeEnable) {
                        this.premResetValue = pmbArCustomerMaster.userDefined1 ? pmbArCustomerMaster.userDefined1 : '';
                        this.billTypeResetValue =  pmbArCustomerMaster.userDefined2 ? pmbArCustomerMaster.userDefined2 : '';
                    } else {
                        setTimeout(() => {
                            this.userDefinedFields.updateUserDefinedValues(pmbArCustomerMaster);
                        }, 100);
                    }
                    this.searchStatus = true;
                    this.editPmbArCustomerMaster = true;
                    this.initLoad = false;
                } , (error: Error) => {
                    let popMsg = new PopUpMessage('groupNotExistPopup', 'Customer Maintenance', "1088: Customer ID " + customerId + " of Customer Type " + customerType + " does not exist. Press Yes to create one.", 'icon');
                    popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                        this.popUpButtonClicked(event);
                    });
                });
            }
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    modalClose() {
        this.screenCloseRequest = true;
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Customer Maintenance')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.savePmbArCustomerMaster()
                }
                else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormValidateStatus() {
        this.customerMaintenanceForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
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

    triggerMenus(value) {
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

    openScreen() {
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Customer Maintenance', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.savePmbArCustomerMaster();
                            setTimeout(() => {
                                this.resetFormAndGrid();
                                this.showData = false;
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.resetFormAndGrid();
                            this.showData = false;
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.resetFormAndGrid();
            this.showData = false;
        }
    }
}
