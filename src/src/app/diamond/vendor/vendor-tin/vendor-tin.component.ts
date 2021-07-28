import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import { ContactTitleMaster } from '../../../../../src/app/api-models';
import { MessageMasterDtl, SecUser, SystemCodes, SystemCodeToken } from '../../../api-models';
import { VendorTin } from '../../../api-models/vendor-tin.model';
import {
    ContactTitleMasterService,
    MessageMasterDtlService,
    SystemCodesService,
    SystemCodeTokenService
} from '../../../api-services';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { VendorTinService } from '../../../api-services/vendor-tin.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { Menu, SearchModel } from '../../../shared/models/models';
import { CONSTANTS, vendorTINScreenShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {
    AngularMyDatePickerDirective,
    AngularMyDatePickerModule,
    IMyDate,
    IMyDateModel,
    IMySingleDateModel
} from 'angular-mydatepicker';
import { ChangeDetectorRef } from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { ProviderAdministrativeFeeRuleLookup } from "../../../shared/lookup/provider-administrative-fee-rule-lookup";
import { VendorTinLookup } from "../../../shared/lookup/vendor-tin-lookup";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { ZipCodesService } from '../../../api-services/zip-codes.service';
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
    selector: "vendor-tin",
    templateUrl: "./vendor-tin.component.html",
    styleUrls: ["./vendor-tin.component.css"],
    providers: [VendorTinService, ToastService],
})
export class VendorTINComponent implements OnInit {
    vendorTINForm: FormGroup;
    formValidation: FormValidation;
    @Input() showIcon: boolean = false;
    @Input() winID?: string;
    public menu: Menu[] = [];
    @Input() vendorID?: string;
    @Output() irsTaxId?: string;
    public showVendorTINFields: boolean = false;
    public alertMessage: AlertMessage;
    public popUpMessage: PopUpMessage;
    showFormFields: boolean = false;
    vendorTIN: VendorTin;
    public faSearch = faSearch;
    addVendonTIN: Boolean;
    editVendonTIN = false;
    @ViewChild('taxEntityName') private taxEntityName: ElementRef;
    public displayMessage: any;
    systemCodes: SystemCodes[];
    titles: ContactTitleMaster[];
    searchStatus: any;
    keyNames: string = "irs_tax_id";
    userId: string;
    userTemplateId: string;
    keyValues: any;
    public datePickerConfig = DatePickerConfig;
    @ViewChild("dp") myDp: AngularMyDatePickerDirective;
    userDefinedDate: IMyDate;
    secWin: SecWinViewModel;
    secColDetails = new Array<SecColDetail>();
    public shortcuts: ShortcutInput[] = [];
    shortcutsInput: ShortcutInput[] = [];
    changesUnsaved: Boolean = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    inProgress = true;
    isReadOnly:boolean=false;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    public isSuperUser = false;
    public secProgress = true;
    private windowId = 'VENTX';
    vendorTinSearchModel =
        new SearchModel('vendortins/lookup',
            VendorTinLookup.VENDOR_TIN_ALL,
            VendorTinLookup.VENDOR_TIN_DEFAULT,
            []);

    constructor(
        private vendorTINService: VendorTinService,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private router: Router,
        private alertMessageService: AlertMessageService,
        private cdr: ChangeDetectorRef,
        private systemCodeTokenService: SystemCodesService,
        private titleMasterService: ContactTitleMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secUserService: SecUserService,
        private zipCodesService: ZipCodesService,
        private renderer: Renderer2,
        private secColDetailService: SecColDetailService,
        private menuService: MenuService
    ) {
    }

    ngOnInit(): void {
        this.initializePermission();
        this.createNewForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorTINForm);
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

        this.initializeComponentState();

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

    initializeComponentState() {

        this.menuInit();
        this.addVendonTIN = false;
        this.systemCodeTokenService
            .getSystemCodesByLangAndtype("VEND_1099_FLAG", "0")
            .subscribe(
                (systemCodes) => {
                    this.systemCodes = systemCodes;
                },
                (error) => {
                    console.log(error);
                }
            );
        this.titleMasterService.getContactTitleMasters().subscribe(
            (titles) => {
                this.titles = titles;
            },
            (error) => {
                console.log(error);
            }
        );
        if (this.vendorID) {
            this.vendorTINForm.patchValue({
                vendorId: this.vendorID,
            });
        }
    }

    createForm() {
        if(this.isSuperUser){
            this.createNewForm();
            this.isReadOnly=false;
        }else{
            if(this.secWin.hasInsertPermission()){
                this.createNewForm();
                this.vendorTINForm.get('irsTaxId').enabled;
                this.isReadOnly=false;
            }else{
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Vendor TIN')
                });
            }
        }
    }

    createNewForm(){
                // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorTINForm = this.formBuilder.group(
            {
                irsTaxId: ["", { updateOn: "blur", validators: [] }],
                entityName: ["", { updateOn: "blur", validators: [] }],
                taxEntityName: ["", { updateOn: "blur", validators: [] }],
                address1: ["", { updateOn: "blur", validators: [] }],
                address2: ["", { updateOn: "blur", validators: [] }],
                city: ["", { updateOn: "blur", validators: [] }],
                state: ["", { updateOn: "blur", validators: [] }],
                county: ["", { updateOn: "blur", validators: [] }],
                country: ["", { updateOn: "blur", validators: [] }],
                zipCode: ["", { updateOn: "blur", validators: [] }],
                phone: ["", { updateOn: "blur", validators: [] }],
                ext: ["", { updateOn: "blur", validators: [] }],
                fax: ["", { updateOn: "blur", validators: [] }],
                vendor1099Flag: ["", { updateOn: "blur", validators: [] }],
                wcVendorNumber: ["", { updateOn: "blur", validators: [] }],
                contact: ["", { updateOn: "blur", validators: [] }],
                title: ["", { updateOn: "blur", validators: [] }],
                w9: ["", { updateOn: "blur", validators: [] }],
                userDefinedDate: [null, { updateOn: "blur", validators: [] }],
            },
            { updateOn: "submit" }
        );
    }

    popUpButtonHandler(button: PopUpMessageButton) {
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S' },
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', shortcutKey: 'Ctrl+X', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Copy', shortcutKey: 'Ctrl+C', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Paste', shortcutKey: 'Ctrl+V' },
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' },
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    { name: "Vendor TIN Lookup" },
                    { name: "List Vendors" },
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
                    { name: "Audit Display", shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Vendor TIN" },
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createForm();
                    this.showVendorTINFields = false;
                    this.addVendonTIN = true;
                    break;
                }
                case "Open": {
                    let irsTaxId: string = Form.getValue(this.vendorTINForm, "irsTaxId");
                    this.getVendorTINByIRSTaxId(irsTaxId);
                    // statements;
                    break;
                }
                case "Save": {
                    this.saveVendorTin();
                    break;
                }
                case "Close": {
                    this.vendorTINForm.reset();
                    this.activeModal.dismiss("File -> Close");
                    break;
                }
                case "Delete": {
                    this.deleteVendorTin();
                    break;
                }
                case "Exit": {
                    this.vendorTINForm.reset();
                    this.activeModal.dismiss("File -> Exit");
                    break;
                }
                case "Shortcut Menu": {
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
        } else if (event.menu.menuItem === "Edit") {
        } // handle Edit-Menu Actions
        else if (event.menu.menuItem === "Topic") {
        } // handle Topic-Menu Actions
        else if (event.menu.menuItem === "Special") {
            switch (event.action) {
                case "List Vendors": {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
                        CONSTANTS.F_LIST_VEND
                    );
                    if (status) {
                        if (this.searchStatus) {
                            this.toastService.showToast(
                                "This option is not implemented yet",
                                NgbToastType.Danger
                            );
                        } else {
                            if (this.vendorTINForm.get('irsTaxId').value ==='') {

                            } else {
                                this.messageService
                                    .findByMessageId(7136)
                                    .subscribe((message: MessageMasterDtl[]) => {
                                        this.alertMessage = this.alertMessageService.error(
                                            "7136: " + message[0].messageText
                                        );
                                    });
                            }
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
                case 'Vendor TIN Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
            }
        } // handle special-Menu Actions
        else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.activeModal.dismiss("File -> Main Menu");
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                    let irsTaxId = Form.getValue(this.vendorTINForm, "irsTaxId");
                    if (irsTaxId != null) {
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
        }
    }

    onLookupFieldChange(event: any) {
        this.irsTaxId = event.target.value;
        if (event.key === "Tab") {
            event.preventDefault();
            let irsTaxId = event.target.value;
            this.getVendorTINByIRSTaxId(irsTaxId);
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }


    }

    getVendorTINByIRSTaxId(irsTaxId: string) {
        if (this.validateIrsTaxId(irsTaxId)) {
            this.vendorTINService.getVendorTin(irsTaxId).subscribe(
                (vendorTIN) => {
                    this.vendorTIN = vendorTIN;
                    this.editVendonTIN = true;
                    this.setVendorTINValues(vendorTIN);
                    this.popUpMessage = null;
                    this.showFormFields = true;
                    this.addVendonTIN = false;
                    this.showVendorTINFields = true;
                },
                (error) => {
                    if (parseInt(error.status) == 404) {
                        this.messageService.findByMessageId(6427).subscribe(res => {
                            this.showPopUpMessage(
                                "memberNotExistPopup",
                                "6427: " + res[0].messageText,
                                false
                            );
                        })

                    }
                }
            );
        }
    }

    showPopUpMessage(
        errorName: string,
        errorMessage: string,
        validationError: boolean
    ) {
        let popMsg = new PopUpMessage(
            errorName,
            "Vendor TRN",
            errorMessage,
            "icon"
        );
        if (validationError) {
            popMsg.buttons = [new PopUpMessageButton("yes", "OK", "btn btn-primary")];
        } else {
            popMsg.buttons = [
                new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
                new PopUpMessageButton("no", "No", "btn btn-primary"),
            ];
        }
        let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event, validationError);
        });
    }

    onChangeZipCode(event: any, zip) {
        if (zip && event.key === 'Tab') {
            event.preventDefault();
            this.getZipCodeDetailsByZip(zip);
        }
    }

    getZipCodeDetailsByZip(zip: string) {
        this.zipCodesService.getZipCode(zip).subscribe((result) => {
            this.vendorTINForm.patchValue({
                city: result.city,
                county: result.county,
                state: result.state,
                zipCode: result.zip
            });
            const element = this.renderer.selectRootElement('#country');
            setTimeout(() => element.focus(), 50);
        }, error => {

            console.log(error);
        });
    }

    setVendorTINValues(vendorTIN: VendorTin) {
        let date: IMyDateModel =
            vendorTIN.userDefinedDate != null
                ? {
                    isRange: false,
                    singleDate: { jsDate: new Date(vendorTIN.userDefinedDate) },
                }
                : null;
        this.userDefinedDate =
            vendorTIN.userDefinedDate != null ? date.singleDate.date : null;
        this.vendorTINForm.patchValue({
            irsTaxId: vendorTIN.irsTaxId,
            entityName: vendorTIN.taxEntityName,
            taxEntityName: vendorTIN.taxEntityName,
            address1: vendorTIN.address1,
            address2: vendorTIN.address2,
            city: vendorTIN.city,
            state: vendorTIN.state,
            county: vendorTIN.county,
            country: vendorTIN.country,
            phone: vendorTIN.phone,
            ext: vendorTIN.ext,
            fax: vendorTIN.fax,
            zipCode: vendorTIN.zipcode,
            vendor1099Flag: vendorTIN.vendor1099Flag ? vendorTIN.vendor1099Flag : 'N',
            wcVendorNumber: vendorTIN.wcVendorNumber,
            contact: vendorTIN.contact,
            title: vendorTIN.title,
            w9: vendorTIN.w9,
            userDefinedDate: date,
        }, { emitEvent: false });
        this.isReadOnly=true;
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
    }

    populateModel() {
        let vendorTin = new VendorTin();
        vendorTin.irsTaxId = Form.getValue(this.vendorTINForm, "irsTaxId");
        vendorTin.taxEntityName = Form.getValue(
            this.vendorTINForm,
            "taxEntityName"
        );
        vendorTin.address1 = Form.getValue(this.vendorTINForm, "address1");
        vendorTin.phone = Form.getValue(this.vendorTINForm, "phone");
        vendorTin.address2 = Form.getValue(this.vendorTINForm, "address2");
        vendorTin.ext = Form.getValue(this.vendorTINForm, "ext");
        vendorTin.city = Form.getValue(this.vendorTINForm, "city");
        vendorTin.fax = Form.getValue(this.vendorTINForm, "fax");
        vendorTin.state = Form.getValue(this.vendorTINForm, "state");
        vendorTin.zipcode = Form.getValue(this.vendorTINForm, "zipCode");
        vendorTin.vendor1099Flag = Form.getValue(
            this.vendorTINForm,
            "vendor1099Flag"
        );
        vendorTin.country = Form.getValue(this.vendorTINForm, "country");
        vendorTin.county = Form.getValue(this.vendorTINForm, "county");
        vendorTin.wcVendorNumber = Form.getValue(
            this.vendorTINForm,
            "wcVendorNumber"
        );
        vendorTin.contact = Form.getValue(this.vendorTINForm, "contact");
        vendorTin.w9 = Form.getValue(this.vendorTINForm, "w9");
        vendorTin.title = Form.getValue(this.vendorTINForm, "title");
        let abc: IMyDateModel = Form.getValue(
            this.vendorTINForm,
            "userDefinedDate"
        );
        vendorTin.userDefinedDate =
            abc.singleDate != null ? abc.singleDate.jsDate : null;
        return vendorTin;
    }

    popUpButtonClicked(button: PopUpMessageButton, validationError: boolean) {
        if (button.name == "yes" && !validationError) {
            let vendorTIN = new VendorTin();
            this.showVendorTINFields = true;
            vendorTIN.irsTaxId = Form.getValue(this.vendorTINForm, "irsTaxId");
            this.setVendorTINValues(vendorTIN);
            this.showFormFields = true;
            this.addVendonTIN = true;
            setTimeout(() => {
                this.taxEntityName.nativeElement.focus();
            }, 1000);
        }
    }

    updateVendorTin() {
        this.formValidation.validateForm();
        if (this.vendorTINForm.valid) {
            let vendorTIN = this.populateModel();
            this.vendorTINService.updateVendorTin(vendorTIN).subscribe(
                () => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.changesUnsaved = false;
                    this.isReadOnly=true;
                    if (this.screenCloseRequest) {
                        setTimeout(() => { this.activeModal.close() }, 2000);
                    }
                    this.isFormDataChangeStatus = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    validateIrsTaxId(irsTaxId: string) {
        if (irsTaxId == null || irsTaxId.length < 9) {
            this.showPopUpMessage(
                "memberNotExistPopup",
                "6222: The IRS Tax ID entered must be 9 digits long",
                true
            );
            return false;
        }
        if (!isNumeric(irsTaxId)) {
            this.showPopUpMessage(
                "memberNotExistPopup",
                "28016: The IRS Tax ID must be an number",
                true
            );
            return false;
        }
        return true;
    }

    saveVendorTin() {
        let irsTaxId: string = Form.getValue(this.vendorTINForm, "irsTaxId");
        if (this.validateIrsTaxId(irsTaxId)) {
            if (this.addVendonTIN) {
                if (this.isSuperUser) {
                    this.createVendorTin();
                } else {
                    if (this.secWin.hasInsertPermission()) {
                        this.createVendorTin();
                    } else {
                        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                            this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Vendor TIN')
                        });
                    }
                }
            } else {
                if (this.isSuperUser) {
                    this.updateVendorTin();
                } else {
                    if (this.secWin.hasUpdatePermission()) {
                        this.updateVendorTin();
                    } else {
                        this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                            this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Plan')
                        });
                    }
                }

            }
        }
    }

    createVendorTin() {
        this.formValidation.validateForm();
        if (this.vendorTINForm.valid) {
            let vendorTIN = this.populateModel();
            this.vendorTINService.createVendorTin(vendorTIN).subscribe(
                () => {
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                    this.addVendonTIN = false;
                    this.changesUnsaved = false;
                    this.isReadOnly=true;
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                    this.isFormDataChangeStatus = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    deleteVendorTin() {
        let irsTaxId: string = Form.getValue(this.vendorTINForm, "irsTaxId");
        if (this.validateIrsTaxId(irsTaxId) && this.secWin.hasDeletePermission()) {
            this.vendorTINService.deleteVendorTin(irsTaxId).subscribe(
                () => {
                    this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                    this.vendorTINForm.reset();
                }
            );
        } else if (this.secWin.hasDeletePermission() == false) {
            this.alertMessage = this.alertMessageService.error(
                "User is not permitted to delete a Vendor TIN record"
            );
        }
    }

    toggleCalendar(): void {
        this.cdr.detectChanges();
        this.myDp.toggleCalendar();
    }

    onDateChanged(event: IMyDateModel) {
        this.changesUnsaved = true;
        this.userDefinedDate = event.singleDate.date;
    }

    private openLookupFieldSearchModel() {
        // let vendorMaster = new VendorMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorTinSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.vendorTINForm.patchValue({
                    irsTaxId: res.IRS_TAX_ID
                });
                this.getVendorTINByIRSTaxId(res.IRS_TAX_ID);
            }
        });
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...vendorTINScreenShortcutKeys(this));
        this.cdr.detectChanges();
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Vendor TIN')
            })
        } else {
            this.activeModal.close();
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
                    this.saveVendorTin()
                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.vendorTINForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('VENDOR_TIN', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    };

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                   // this.initializeComponentState();
                    this.secProgress = false;

                    //Check Menus Privilege Start
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuService.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End


                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view COB Order Liability',
                        'COB Order Liability Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
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
}

