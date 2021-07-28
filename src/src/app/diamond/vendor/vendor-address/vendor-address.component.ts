/* Copyright (c) 2020 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import {
    AccountsPayableService,
    ContactTitleMasterService,
    GroupContactPersonService,
    MessageMasterDtlService,
    SecUserService
} from '../../../api-services';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { DatePickerConfig, datePickerModel } from '../../../shared/config';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { ContactTitleMaster, GroupContactPerson, MessageMasterDtl, SecUser, SecWin } from '../../../api-models';
import { Form } from '../../../shared/helpers/form.helper';
import { VendorAddressService } from '../../../api-services/vendor-address.service';
import { VendorAddress } from '../../../api-models/vendor-address.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel } from '../../../shared/models/models';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { CountryService } from '../../../api-services/country.service';
import { VendorAddressContactFields, VendorAddressContactFormConfig } from '../../../shared/models/constants';
import { VendorAddressContactService } from '../../../api-services/vendor-address-contact.service';
import { VendorAddressContact } from '../../../api-models/vendor-address-contact.model';
import { VendorMasterLookup } from '../../../shared/lookup/vendor-master-lookup';
import { VendorMaster } from '../../../api-models/vendor-master';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { VendorMasterService } from '../../../api-services/vendor-master.service';
import {
    CONSTANTS,
    getVendorAddressShortcutKeys,
    MESSAGE_CONSTANTS,
    SharedService
} from '../../../shared/services/shared.service';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { VendorAdvancePaymentRulesComponent } from '../vendor-advance-payment-rules/vendor-advance-payment-rules.component';
import { ViewCreditBalanceComponent } from '../view-credit-balance/view-credit-Balance.component';
import { VendorAccountNoLookup } from '../../../shared/lookup/vendor-account-no-lookup';

import { ProviderRelationshipComponent } from '../../provider/provider-relationship/provider-relationship.component';
import { ZipCodesService } from '../../../api-services/zip-codes.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {set} from "ag-grid-community/dist/lib/utils/object";

// Use the Component directive to define the VendorAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'vendoraddress',
    templateUrl: './vendor-address.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        VendorAddressService,
        GroupContactPersonService,
        VendorAddressContactService,
        CountryService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
    ],
})
export class VendorAddressComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorAddressForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;

    isFirst = true;
    showIcon = false;
    vendorId: any;
    editVendorAddress: boolean;
    vendorMaster: VendorMaster;
    vendorAddress: VendorAddress;
    vendorAddresses: VendorAddress[];
    hasPrimaryAddress = false;
    titles: ContactTitleMaster[] = [];
    titleOptions = [];
    editGroupContactPerson: boolean;
    groupContactPerson: GroupContactPerson;
    groupContactPersons: GroupContactPerson[];
    vendorAddressContacts: VendorAddressContact[];

    public dataGrid001GridOptions: GridOptions;
    public grid1RowIndex = 0;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    contactsState: Array<FormRow> = [];
    isResetForm = false;
    vendorAddressContactFormConfig = VendorAddressContactFormConfig;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    countries: any[] = [];
    menu: Menu[] = [];
    shortcuts: ShortcutInput[] = [];
    vendorIdStatus: boolean = false;
    isSuperUser = false;
    secProgress = true;
    windowId = 'VENDA';
    searchModel = new SearchModel(
        'vendormasters/lookup',
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );


    accountNoModel = new SearchModel(
        'vendormasters/accountno/lookup',
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_ALL,
        VendorAccountNoLookup.VENDOR_ACCOUNT_NO_DEFAULT,
        []
    );

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @Input() vendorID?: string;

    @Input() seqVendId?: number;
    // Use constructor injection to inject an instance of a FormBuilder

    searchStatus = false;
    userTemplateId: string;
    secWin: SecWinViewModel;

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private modalService: NgbModal,
        private customValidators: CustomValidators,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private vendorAddressService: VendorAddressService,
        private vendorMasterService: VendorMasterService,
        private countryService: CountryService,
        private contactTitleMasterService: ContactTitleMasterService,
        private vendorAddressContactService: VendorAddressContactService,
        private groupContactPersonService: GroupContactPersonService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService,
        private sharedService: SharedService,
        private renderer: Renderer2,
        private zipCodesService: ZipCodesService,
        private accountsPayableService: AccountsPayableService,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private secUserService: SecUserService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }
    initializeComponentState() {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorAddressForm);
        this.findAllCountries();
        this.createDataGrid001();
        this.getContactTitles();
        if (this.vendorID) {
            this.vendorAddressForm.patchValue({
                vendorId: this.vendorID,
            });
            this.vendorId = this.vendorID;
            this.onChangeVendorId(this.vendorID, 2);
        }

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
                        'You are not Permitted to view VENDOR Address',
                        'Vendor Address Permission'
                    );
                }
            },
            (error) => {
                this.initializeComponentState();
            })
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getVendorAddressShortcutKeys(this));
        this.cdr.detectChanges();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorAddressForm = this.formBuilder.group(
            {
                name2: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(40)] },
                ],
                addressLine1: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(40)] },
                ],
                addressLine2: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(40)] },
                ],
                city: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(30)] },
                ],
                county: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(5)] },
                ],
                state: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(6)] },
                ],
                zipCode: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(15)] },
                ],
                country: ['', { updateOn: 'blur', validators: [Validators.required] }],
                billingOverrideAddress: ['', { updateOn: 'blur', validators: [] }],
                primAddr: ['', { updateOn: 'blur', validators: [Validators.required] }],
                userDefine1: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(15)] },
                ],
                userDefine2: [
                    '',
                    { updateOn: 'blur', validators: [Validators.maxLength(15)] },
                ],
                userDate1: ['', { updateOn: 'blur', validators: [] }],
                userDate2: ['', { updateOn: 'blur', validators: [] }],
                seqVendAddress: [null],
                seqVendId: [null],
            },
            { updateOn: 'submit' }
        );
    }

    showPopUp(message: string, title: string) {
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
            new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
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
            this.popupMessageHandler(button);
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
                            key:
                                title.contactTitle +
                                ' ' +
                                (title.description ? title.description : ''),
                            value: title.contactTitle,
                        };
                        this.titleOptions.push(titleObj);
                    }
                }
            });
    }

    createVendorAddress() {
        this.formValidation.validateForm();
        if (this.vendorAddressForm.valid) {
            let vendorAddress = new VendorAddress();
            vendorAddress.seqVendId = this.vendorMaster.seqVendId;
            this.setVendorAddressModel(vendorAddress);
            if (this.hasPrimaryAddress && vendorAddress.primaryAddress === 'Y') {
                this.vendorAddressPrimaryAddressErrorPopup();
            } else {
                this.vendorAddressService.createVendorAddress(vendorAddress).subscribe(
                    (response) => {
                        // this.alertMessage = this.alertMessageService.info('Record successfully created.');
                        this.toastService.showToast(
                            'Record successfully created.',
                            NgbToastType.Success
                        );
                        this.editVendorAddress = false;
                        this.getVendorAddressByVendorId(this.vendorMaster.vendorId);
                        if (this.screenCloseRequest === true) {
                            setTimeout(() => {
                                this.activeModal.close();
                            }, 2000);
                        }
                        this.isFormDataChangeStatus = false;
                    }
                );
            }
        } else {
            this.toastService.showToast(
                'Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.',
                NgbToastType.Danger
            );
        }
    }

    setVendorAddressModel(vendorAddress: VendorAddress) {
        vendorAddress.name2 = Form.getValue(this.vendorAddressForm, 'name2');
        vendorAddress.addressLine1 = Form.getValue(
            this.vendorAddressForm,
            'addressLine1'
        );
        vendorAddress.addressLine2 = Form.getValue(
            this.vendorAddressForm,
            'addressLine2'
        );
        vendorAddress.city = Form.getValue(this.vendorAddressForm, 'city');
        vendorAddress.country = Form.getValue(this.vendorAddressForm, 'country');
        vendorAddress.state = Form.getValue(this.vendorAddressForm, 'state');
        vendorAddress.zipCode = Form.getValue(this.vendorAddressForm, 'zipCode');
        vendorAddress.county = Form.getValue(this.vendorAddressForm, 'county');
        vendorAddress.seqVendAddrBillOvrd = Form.getValue(
            this.vendorAddressForm,
            'billingOverrideAddress'
        );
        vendorAddress.primaryAddress = Form.getValue(
            this.vendorAddressForm,
            'primAddr'
        );
        vendorAddress.userDefined1 = Form.getValue(
            this.vendorAddressForm,
            'userDefine1'
        );
        vendorAddress.userDefined2 = Form.getValue(
            this.vendorAddressForm,
            'userDefine2'
        );
        vendorAddress.userDate2 = Form.getDatePickerValue(
            this.vendorAddressForm,
            'userDate1'
        );
        vendorAddress.userDefinedDate = Form.getDatePickerValue(
            this.vendorAddressForm,
            'userDate2'
        );
    }

    updateVendorAddress(seqVendAddress: number) {
        this.formValidation.validateForm();
        if (this.vendorAddressForm.valid) {
            let vendorAddress = new VendorAddress();
            vendorAddress.seqVendId = this.vendorMaster.seqVendId;
            vendorAddress.seqVendAddress = seqVendAddress;
            this.setVendorAddressModel(vendorAddress);
            if (this.hasPrimaryAddress && vendorAddress.primaryAddress === 'Y') {
                this.vendorAddressPrimaryAddressErrorPopup();
            } else {
                this.vendorAddressService
                    .updateVendorAddress(vendorAddress, seqVendAddress)
                    .subscribe(
                        (response) => {
                            this.toastService.showToast(
                                'Record successfully updated.',
                                NgbToastType.Success
                            );
                            this.editVendorAddress = false;
                            this.getVendorAddressByVendorId(this.vendorMaster.vendorId);
                            if (this.screenCloseRequest === true) {
                                setTimeout(() => {
                                    this.activeModal.close();
                                }, 2000);
                            }
                            this.isFormDataChangeStatus = false;
                        }
                    );
            }
        } else {
            /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                      'Please correct your entries and try again.');*/
            this.toastService.showToast(
                'Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.',
                NgbToastType.Danger
            );
        }
    }

    findAllCountries() {
        this.countryService.getCountrys().subscribe((res) => {
            this.countries = res;
        });
    }

    saveVendorAddress() {
        if (this.editVendorAddress) {
            this.updateVendorAddress(this.vendorAddress.seqVendAddress);
        } else {
            this.createVendorAddress();
        }
    }

    deleteVendorAddress(seqVendAddress: number) {
        this.vendorAddressService.deleteVendorAddress(seqVendAddress).subscribe(
            (response) => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    getVendorAddress(seqVendAddress: number) {
        this.vendorAddressService.getVendorAddress(seqVendAddress).subscribe(
            (vendorAddress) => {
                this.vendorAddress = vendorAddress;
                this.vendorAddressForm.patchValue({
                    name2: this.vendorAddress.name2,
                    addressLine1: this.vendorAddress.addressLine1,
                    addressLine2: this.vendorAddress.addressLine2,
                    city: this.vendorAddress.city,
                    county: this.vendorAddress.county,
                    state: this.vendorAddress.state,
                    zipCode: this.vendorAddress.zipCode,
                    country: this.vendorAddress.country,
                    billingOverrideAddress: this.vendorAddress.seqVendAddrBillOvrd,
                    primAddr: this.vendorAddress.primaryAddress,
                    userDefine1: this.vendorAddress.userDefined1,
                    userDefine2: this.vendorAddress.userDefined2,
                    userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
                        this.vendorAddress.userDate2
                    ),
                    userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
                        this.vendorAddress.userDefinedDate
                    ),
                });
            }
        );
    }

    createGroupContactPerson() {
        this.formValidation.validateForm();
        if (this.vendorAddressForm.valid) {
            let groupContactPerson = new GroupContactPerson();
            this.groupContactPersonService
                .createGroupContactPerson(groupContactPerson)
                .subscribe(
                    (response) => {
                        this.toastService.showToast('Record successfully created', NgbToastType.Success);
                        this.editGroupContactPerson = false;
                    }
                );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.'
            );
        }
    }

    updateGroupContactPerson(seqGroupId: number) {
        this.formValidation.validateForm();
        if (this.vendorAddressForm.valid) {
            let groupContactPerson = new GroupContactPerson();
            this.groupContactPersonService
                .updateGroupContactPerson(groupContactPerson, seqGroupId)
                .subscribe(
                    (response) => {
                        this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                        this.editGroupContactPerson = false;
                    }
                );
        } else {
            this.alertMessage = this.alertMessageService.error(
                'Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.'
            );
        }
    }

    saveGroupContactPerson() {
        if (this.editGroupContactPerson) {
            this.updateGroupContactPerson(
                this.groupContactPerson.groupContactPersonPrimaryKey.seqGroupId
            );
        } else {
            this.createGroupContactPerson();
        }
    }

    deleteGroupContactPerson(seqGroupId: number) {
        this.groupContactPersonService
            .deleteGroupContactPerson(seqGroupId)
            .subscribe(
                (response) => {
                    this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                }
            );
    }

    getGroupContactPerson(seqGroupId: number) {
        this.groupContactPersonService.getGroupContactPerson(seqGroupId).subscribe(
            (groupContactPerson: any) => {
                this.groupContactPerson = groupContactPerson;
                this.vendorAddressForm.patchValue({});
            }
        );
    }

    getGroupContactPersons() {
        this.groupContactPersonService.getGroupContactPersons().subscribe(
            (groupContactPersons) => {
                this.groupContactPersons = groupContactPersons;
            }
        );
    }

    dataGrid001GridOptionsExportCsv() {
        const params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        const params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50,
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Name 2',
                field: 'name2',
                width: 200,
            },
            {
                headerName: 'Address Line 1',
                field: 'addressLine1',
                width: 250,
            },
            {
                headerName: 'City',
                field: 'city',
                width: 200,
            },
            {
                headerName: 'County',
                field: 'county',
                width: 100,
            },
            {
                headerName: 'State',
                field: 'state',
                width: 100,
            },
            {
                headerName: 'ZIP Code',
                field: 'zipCode',
                width: 100,
            },
            {
                headerName: 'Primary Address',
                field: 'primaryAddress',
                width: 200,
            },
        ];
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onChangeVendorId(event: any, check: any) {
        let id: any;
        if (check == 1) {
            id = event.target.value;
        } else {
            id = event;
        }
        this.vendorMaster = null;
        this.vendorId = id;
        this.findVendorMasterByVendorId(this.vendorId);
    }

    findVendorMasterByVendorId(vendorId) {
        this.vendorMasterService.findVendorMasterByVendorId(vendorId).subscribe((res) => {
            if (res.seqVendId) {
                this.seqVendId = res.seqVendId;
                this.vendorMaster = res;
                this.getVendorAddressByVendorId(vendorId);
                this.searchStatus = true;
            } else {
                this.vendorMasterNotFoundPopup();
                this.searchStatus = false;
            }
        }, error => {
            this.vendorMasterNotFoundPopup();
            this.searchStatus = false;
            console.log(error);
        });
    }

    vendorMasterNotFoundPopup() {
        let popMsg = new PopUpMessage(
            'Vendor Id',
            'Error',
            MESSAGE_CONSTANTS.ERROR_28013,
            'icon'
        );
        popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            // this.popUpButtonClicked(event);
        });
    }

    vendorAddressPrimaryAddressErrorPopup() {
        let popMsg = new PopUpMessage(
            'Vendor Address',
            'Primary Address Error',
            MESSAGE_CONSTANTS.ERROR_8021,
            'icon'
        );
        popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            // this.popUpButtonClicked(event);
            this.vendorAddressForm.patchValue({
                'primAddr': 'N'
            });
        });
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    onChangeZipCode(event: any, zip) {
        if (zip && event.key === 'Tab') {
            event.preventDefault();
            this.getZipCodeDetailsByZip(zip);
        }
    }

    onChangeAddressLine2(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            const element = this.renderer.selectRootElement('#zipCode');
            setTimeout(() => element.focus(), 50);
        }
    }

    getZipCodeDetailsByZip(zip: string) {
        this.zipCodesService.getZipCode(zip).subscribe((result) => {
            this.vendorAddressForm.patchValue({
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

    openLookupFieldSearchModel() {
        let vendorMaster = new VendorMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.vendorId = res.vendorId;
                this.findVendorMasterByVendorId(this.vendorId);
            }
        });
    }

    private getVendorAddressByVendorId(vendorId: any) {
        vendorId = vendorId.trim();
        if (vendorId !== '') {
            this.searchStatus = true;
            this.hasPrimaryAddress = false;
            this.vendorAddressService.findByVendorId(vendorId).subscribe((res) => {
                this.searchStatus = false;
                this.vendorAddresses = res;
                if (this.vendorAddresses) {
                    setTimeout(() => {
                        this.dataGrid001GridOptions.api.selectIndex(this.grid1RowIndex, false, false);
                        this.gridOneSelection({ rowIndex: this.grid1RowIndex, data: this.vendorAddresses[this.grid1RowIndex] });
                    }, 500);
                    this.hasPrimaryAddress = this.vendorAddresses.some(value => value.primaryAddress === 'Y');
                }
            }, error => {
                this.searchStatus = false;
                console.log(error);
            });
        } else {
            this.vendorAddresses = [];
            this.searchStatus = false;
        }

    }

    fillFormField(vendorAddress: any) {
        this.vendorIdStatus = true;
        this.vendorAddressForm.patchValue({
            name2: vendorAddress.name2,
            addressLine1: vendorAddress.addressLine1,
            addressLine2: vendorAddress.addressLine2,
            city: vendorAddress.city,
            county: vendorAddress.county,
            state: vendorAddress.state,
            zipCode: vendorAddress.zipCode,
            country: vendorAddress.country,
            billingOverrideAddress: vendorAddress.seqVendAddress,
            seqVendAddress: vendorAddress.seqVendAddress,
            seqVendId: vendorAddress.seqVendId,
            primAddr: vendorAddress.primaryAddress,
            userDefine1: vendorAddress.userDefined1,
            userDefine2: vendorAddress.userDefined2,
            userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
                vendorAddress.userDate2
            ),
            userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
                vendorAddress.userDefinedDate
            ),
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified();
        }, 2000)
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission()))  },
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
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'}
                ]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Master File' },
                    { name: 'Addresses' },
                    { name: 'Adv. Pay Priority' },
                    { name: 'Adv. Pay Account' },
                    { name: 'Vendor Credit' },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Vendor Lookup' },
                    { name: 'Provider Relationships' },
                    { name: 'Adv Pay Rules' },
                    { name: 'Acc Pay Vendor Display' },
                    { name: 'View Credit Balance' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Vendor Address'}
                ]
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
                    {name: 'About Diamond Client/Server'}
                ]
            },
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.vendorAddressForm.reset();
                    this.vendorAddressForm.patchValue({
                        'seqVendId': this.vendorMaster.seqVendId
                    });
                    this.vendorAddressContacts = [];
                    this.isResetForm = true;
                    this.editVendorAddress = false;
                    setTimeout(() => {
                        this.isResetForm = false;
                    }, 2000);
                    break;
                }
                case 'Save': {
                    this.saveVendorAddress();
                    break;
                }
                default: {
                    this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Topic') {
            this.sharedService.onVendorModuleTopicMenuClick(
                event.action,
                'Addresses',
                this.activeModal,
                this.vendorId
            );
        } else if (event.menu.menuItem === 'Special') {             // handle File actions
            switch (event.action) {
                case 'Vendor Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
                case 'View Credit Balance': {
                    this.CheckCreditBalanceAndOpenScreen();
                    break;
                }

                case 'Provider Relationships': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
                        CONSTANTS.F_PROV_RELATION
                    );
                    if (status) {
                        if (this.searchStatus) {
                            let ref = this.modalService.open(ProviderRelationshipComponent);
                            ref.componentInstance.vendorProviderId = this.seqVendId;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService
                                .findByMessageId(28003)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    this.alertMessage = this.alertMessageService.error(
                                        '28003: ' + message[0].messageText
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

                case 'Adv Pay Rules': {

                    let ref = this.modalService.open(VendorAdvancePaymentRulesComponent, { size: 'lg' });
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.toastService.showToast(MESSAGE_CONSTANTS.NOT_IMPLEMENTED, NgbToastType.Danger);
        }
    }

    saveVendorAddressContactPerson(event) {
        let contacts = new Array<VendorAddressContact>();
        console.log(this.contactsState);
        const updatedRecords: FormRow[] = this.contactsState.filter(record => record.action);

        if (updatedRecords.length > 0) {

            this.contactsState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    console.log(updatedRecord);
                    const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                    console.log(pair);
                    let contact: VendorAddressContact = this.populateVendorAddressContactField(pair, preStateRecord.action);
                    contact.seqVendId = this.vendorAddressForm.get('seqVendId').value;
                    contact.seqVendAddress = this.vendorAddressForm.get('seqVendAddress').value;
                    contact.seqVendContact = this.vendorAddressContacts[index].seqVendContact;
                    contacts.push(contact);
                }
            });
        }

        console.log(event);
        const newRecords = event.slice(this.contactsState.length)

        console.log(newRecords);
        newRecords.forEach(record => {
            const pair = Object.keys(record).map(k => ({ key: k, value: record[k] }));

            let contact: VendorAddressContact = this.populateVendorAddressContactField(pair, FORM_FIELD_ACTION_TYPES.ADD);
            contact.seqVendId = this.vendorAddressForm.get('seqVendId').value;
            contact.seqVendAddress = this.vendorAddressForm.get('seqVendAddress').value;
            contacts.push(contact)
        });
        console.log(contacts);
        // ('============================= api records with action update/add ================================');
        // groupContacts     => variable contains all the updated records and new record to add updated by form-inline grid

        if (contacts && contacts.length > 0) {
            this.vendorAddressContactService.addUpdateVendorAddressContact(contacts).subscribe(resp => {
                this.toastService.showToast('Contact updated Successfully', NgbToastType.Success)
            });
        }
    }

    gridOneSelection(event: any) {
        if (event && event.data) {
            this.grid1RowIndex = event.rowIndex;
            this.vendorAddress = event.data;
            this.editVendorAddress = true;
            this.fillFormField(this.vendorAddress);
            this.findAllVendorAddressContact();
        }
    }

    findAllVendorAddressContact() {
        this.vendorAddressContactService
            .findBySeqVendAddress(this.vendorAddress.seqVendAddress)
            .subscribe(
                (res: any) => {
                    this.vendorAddressContacts = res ? res : [];
                    this.contactsState = [];
                    this.populateDynamicForm();
                },
                (error: any) => {
                    this.vendorAddressContacts = [];
                }
            );
    }

    populateDynamicForm() {
        if (this.vendorAddressContacts && this.vendorAddressContacts.length > 0) {
            this.vendorAddressContacts.forEach(
                (vendorAddressContact: VendorAddressContact) => {
                    let mockConfig = JSON.parse(
                        JSON.stringify(this.vendorAddressContactFormConfig)
                    ); // make a copy of original config
                    this.vendorAddressContactFormConfig.forEach((field, index) => {
                        if (field.name === VendorAddressContactFields.CONTACT_NAME) {
                            mockConfig[index].value = vendorAddressContact.contactName;
                        } else if (field.name === VendorAddressContactFields.TITLE) {
                            mockConfig[index].value =
                              vendorAddressContact.contactTitle;
                        } else if (field.name === VendorAddressContactFields.PHONE_NUMBER) {
                            mockConfig[index].value = vendorAddressContact.phoneNumber;
                        } else if (field.name === VendorAddressContactFields.EXT_NO) {
                            mockConfig[index].value = vendorAddressContact.extension;
                        } else if (field.name === VendorAddressContactFields.AL_DIST_METH) {
                            mockConfig[index].value = vendorAddressContact.primaryDistributionMethod;
                        } else if (field.name === VendorAddressContactFields.EMAIL_ID) {
                            mockConfig[index].value = vendorAddressContact.emailId;
                        } else if (field.name === VendorAddressContactFields.FAX_NUMBER) {
                            mockConfig[index].value = vendorAddressContact.faxNumber;
                        }
                    });

                    let formState: FormRow = new FormRow();
                    formState.formFields = mockConfig;
                    this.contactsState.push(formState); // add record
                }
            );
        }
        this.contactsState = JSON.parse(JSON.stringify(this.contactsState));
    }

    popUpButtonClicked(button: PopUpMessageButton) {
    }

    private populateVendorAddressContactField(event, action: any) {
        let groupContact = new VendorAddressContact();

        groupContact.emailId = event[5].value;
        groupContact.faxNumber = event[6].value;
        groupContact.extension = event[3].value;
        groupContact.phoneNumber = event[2].value;
        groupContact.contactTitle = event[1].value;
        groupContact.contactName = event[0].value;
        groupContact.primaryDistributionMethod = event[4].value;
        groupContact.action = action;

        return groupContact;
    }

    CheckCreditBalanceAndOpenScreen() {
        if (!this.seqVendId) {
            this.messageService
                .findByMessageId(29029)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        '29029 : ' + message[0].messageText.replace('@1', 'Vendor Id'),
                        'Vendor'
                    );
                });
            return;
        }
        this.accountsPayableService
            .getCreditBalance(String(this.seqVendId))
            .subscribe((data) => {
                if (data.length > 0) {
                    let ref = this.modalService.open(ViewCreditBalanceComponent);
                    ref.componentInstance.searchModel = this.accountNoModel;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.seq_vend_id = this.seqVendId;
                } else {
                    this.messageService
                        .findByMessageId(30033)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                '30033 : ' + message[0].messageText,
                                'Vendor Credit'
                            );
                        });
                }
            });
    }

    resetAll(editVendorAddress = true) {
        this.alertMessage = this.alertMessageService.close();
        this.vendorAddressForm.reset({ vendorId: this.vendorId });
        this.editVendorAddress = editVendorAddress;
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Vendor Address')
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
                    this.saveVendorAddress()
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
        this.vendorAddressForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
