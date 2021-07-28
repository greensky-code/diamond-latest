/* Copyright (c) 2020 . All Rights Reserved. */

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {PROV_ADDRESS_MODULE_ID} from '../../../shared/app-constants';
import {SecurityService} from '../../../shared/services/security.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {GroupContactPerson, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProvMasterService} from '../../../api-services/prov-master.service';
import {ProvAddress} from '../../../api-models/prov-address.model';
import {Form} from '../../../shared/helpers/form.helper';
import {ProvAddressService} from '../../../api-services/prov-address.service';
import {ProvMaster} from '../../../api-models/prov-master.model';
import {
    CONSTANTS,
    getProviderIncentiveRuleShortcutKeys,
    getProviderAddressShortcutKeys
} from '../../../shared/services/shared.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {Router} from '@angular/router';
import {ProviderAddressProviderMasterLookup} from '../../../shared/lookup/provider-address-provider-master-lookup';
import {ProviderAddressAddressLookup} from '../../../shared/lookup/provider-address-address-lookup';
import {
    ContactPersonFieldNames,
    ProviderAddressContactFields,
    ProviderAddressContactFormConfig
} from '../../../shared/models/constants';
import {ProvAddressContact} from '../../../api-models/prov-address-contact.model';
import {ProvAddressContactService} from '../../../api-models/prov-address-contact.service';
import {ProviderMasterComponent} from '../provider-master/provider-master.component';
import {ProviderContractsComponent} from '../provider-contracts/provider-contracts.component';
import {ProviderCredentialsComponent} from '../provider-credentials/provider-credentials.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {ProvAddressContactPrimaryKeyModel} from '../../../api-models/prov-address-contact-primary-key.model';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {CountryService} from "../../../api-services/country.service";
import { ZipCodesService } from '../../../api-services/zip-codes.service';
import { ZipCodes } from '../../../api-models/zip-codes';
import {HelpComponent} from "../../member/help/help.component";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

// Use the Component directive to define the ProviderAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'provideraddress',
    templateUrl: './provider-address.component.html',
    providers: [
        ProvMasterService,
        ProvAddressService,
    ]

})
export class ProviderAddressComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerAddressForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    provAddressContactsState: Array<FormRow> = [];
    isResetForm = false;
    providerAddressContactFormConfig = ProviderAddressContactFormConfig;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    secWin: SecWinViewModel;
    windowId = 'PROVA';
    userTemplateId: string;
    memberModuleId = PROV_ADDRESS_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    editProviderAddress = false;
    isProviderIdReadOnly = false;
    @Input() winID?: string;
    searchStatus = false;
    keyNames = 'subscriber_id';
    keyValues: any;
    @Input() SubID?: string;
    provAddress: ProvAddress = new ProvAddress();
    seqProvId: any;
    secProgress = true;
    isSuperUser = false;
    @Input() providerId?: string;
    public showFields: Boolean = false;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    pfValidation: Boolean = true;
    countries: any[] = [];
    provAddressRow: any;
    zipCode:ZipCodes;
    statusTrack = 1;
    customTable = {
        'name2' : '',
        'addressLine1' : '',
        'city' : '',
        'county': '',
        'state' : '',
        'zipCode' : '',
    };
    masterSearchModel = new SearchModel(
        'provmasters/lookup',
        ProviderAddressProviderMasterLookup.PROVIDER_MASTER_ALL,
        ProviderAddressProviderMasterLookup.PROVIDER_MASTER_DEFAULT,
        []
    );
    primaryAddrs: any = [{
        'value': 'Y',
        'name': 'Yes'
    }, {
        'value': 'N',
        'name': 'No'
    }];
    addressSearchModel = new SearchModel(
        'provaddresses/lookup',
        ProviderAddressAddressLookup.PROVIDER_ADDRESS_ALL,
        ProviderAddressAddressLookup.PROVIDER_ADDRESS_DEFAULT,
        []
    );

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private modalService: NgbModal,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        public provMasterService: ProvMasterService,
        public provAddressService: ProvAddressService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private provAddContactService: ProvAddressContactService,
        private cdr: ChangeDetectorRef,
        private countryService: CountryService,
        private zipCodesService:ZipCodesService,

    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.getCountries();
        if (this.providerId) {
            this.setProviderId();
        }
    }

    private setProviderId() {
        this.providerAddressForm.patchValue({'providerId': this.providerId});
        this.findByProviderId(this.providerId);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderAddressShortcutKeys(this));
        if (this.providerId) {
            this.setProviderId();
        }

        this.cdr.detectChanges();
    }

    /**
     * Init component state
     * @private
     */
    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerAddressForm);
        this.createDataGrid();
        if (this.providerId) {
            this.findByProviderId(this.providerId);
        }
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        }, 100);
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }


    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Address', 'Provider Address Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('PROV_ADDRESS', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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

    popUpButtonHandler(button) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if(this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Address')
            })
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try{
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
                    this.saveProvAddress()
                }
                else if(resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    // tslint:disable-next-line:member-ordering
    public dataGridGridOptions: GridOptions;
    // tslint:disable-next-line:member-ordering
    private dataGridgridApi: any;
    // tslint:disable-next-line:member-ordering
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        let params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Name 2',
                field: 'name2',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Address Line 1',
                field: 'addressLine1',
                width: 200
            },
            {
                headerName: 'City',
                field: 'city',
                width: 200
            },
            {
                headerName: 'County',
                field: 'county',
                width: 200
            },
            {
                headerName: 'State',
                field: 'state',
                width: 200
            },
            {
                headerName: 'ZIP Code',
                field: 'zipCode',
                width: 200
            },
            {
                headerName: 'Country',
                field: 'country',
                width: 200
            },
            {
                headerName: 'Primary Addr',
                field: 'primaryAddress',
                width: 200,
                valueGetter: (data) => {
                    return data.data.primaryAddress === 'N' ? 'No' : 'Yes';
                }
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerAddressForm = this.formBuilder.group({
            providerId: ['', {updateOn: 'blur', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            site: ['', {updateOn: 'blur', validators: []}],
            cert: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            siteName: ['', {updateOn: 'blur', validators: []}],
            name2: ['', {updateOn: 'blur', validators: []}],
            sundayHours: ['', {updateOn: 'blur', validators: []}],
            addr1: ['', {updateOn: 'blur', validators: []}],
            mondayHours: ['', {updateOn: 'blur', validators: []}],
            addr2: ['', {updateOn: 'blur', validators: []}],
            tuesdayHours: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            wednesdayHours: ['', {updateOn: 'blur', validators: []}],
            county: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            thursdayHours: ['', {updateOn: 'blur', validators: []}],
            zipCode: ['', {updateOn: 'blur', validators: []}],
            fridayHours: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: []}],
            saturdayHours: ['', {updateOn: 'blur', validators: []}],
            primaryAddr: ['', {updateOn: 'blur', validators: []}],
            medGrp: ['', {updateOn: 'blur', validators: []}],
            userDef1: ['', {updateOn: 'blur', validators: []}],
            userdate1: ['', {updateOn: 'blur', validators: []}],
            userDef2: ['', {updateOn: 'blur', validators: []}],
            userdate2: ['', {updateOn: 'blur', validators: []}],
            alDist: ['', {updateOn: 'blur', validators: []}],
            textbox001: ['', {updateOn: 'blur', validators: []}],
            textbox002: ['', {updateOn: 'blur', validators: []}],
            textbox003: ['', {updateOn: 'blur', validators: []}],
            textbox004: ['', {updateOn: 'blur', validators: []}],
            textbox005: ['', {updateOn: 'blur', validators: []}],
            textbox006: ['', {updateOn: 'blur', validators: []}],
            textbox007: ['', {updateOn: 'blur', validators: []}],
            textbox008: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    // tslint:disable-next-line:comment-format
                    //TODO
                    this.createNewOption();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveProvAddress();
                    break;
                }
                case 'Close': {
                    this.isProviderIdReadOnly = true;
                    this.providerAddressForm.reset();
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
            // add method to handle Edit actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
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
        } else if (event.menu.menuItem === 'Notes') {
            // handle notes Actions
            this.handleNotesMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleSpecialMenu(action: string) {
        if (action === 'Provider Master Lookup') {
            this.openSearchModel();
        } else if (action === 'Provider Address Lookup') {
            this.openAddressLookupSearchModel();
        }
    }

    /**
     * Handle Menu Actions for Notes
     * @param action: string
     */
    private handleNotesMenu(action: string) {
        if (action === 'Notes') {
            this.popUpNotesMenuClicked(action);
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        if (action === 'Lookup') {
            this.openAddressLookupSearchModel();
        }
    }

    private handleTopicMenu(action: string) {
        if (action === 'Master File') {
            localStorage.setItem('providerId', this.providerAddressForm.get('providerId').value)
            this.activeModal.close();
            this.modalService.open(ProviderMasterComponent, {
                size: <any>'xl',
            });
        } else if (action === 'Addresses') {
            this.activeModal.close();
            this.modalService.open(ProviderAddressComponent, {
                size: <any>'xl',
            });
        } else if (action === 'Contracts') {
            this.activeModal.close();
            this.modalService.open(ProviderContractsComponent, {
                size: <any>'xl',
            });
        } else if (action === 'Credentials') {
            this.activeModal.close();
            this.modalService.open(ProviderCredentialsComponent, {
                size: <any>'xl',
            });
        } else if (action === 'Privileges') {
            this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
            );
        } else if (action === 'Enrollment') {
            this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
            );
        }
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
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
                    {name: 'Master File'},
                    {name: 'Addresses'},
                    {name: 'Contracts'},
                    {name: 'Credentials'},
                    {name: 'Privileges'},
                    {name: 'Enrollment'},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Provider Master Lookup', shortcutKey: 'Ctrl+M'},
                    {name: 'Provider Address Lookup', shortcutKey: 'Ctrl+A'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Provider Address'}
                ]
            }, {
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

    /**
     * Generic Search Model
     */
    openSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        this.masterSearchModel.isMatchAllContracts = true;
        this.masterSearchModel.winId = this.windowId;
        this.masterSearchModel.dwName = 'dw_provf_lookup';
        ref.componentInstance.searchModel = this.masterSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.providerAddressForm.get('providerId').setValue(res.PROVIDER_ID);
                this.findByProviderId(res.PROVIDER_ID);
                this.editProviderAddress = true;
            }
            this.isProviderIdReadOnly = true;
        });
    }

    openAddressLookupSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.addressSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.providerAddressForm.get('providerId').setValue(res.PROVIDER_ID);
                this.findByProviderId(res.PROVIDER_ID);

            }
            this.isProviderIdReadOnly = true;
        });
    }


    createProvAddress(): ProvAddress {
        let provAddress = new ProvAddress();
        provAddress.seqProvAddress = Form.getValue(this.providerAddressForm, 'seqProvAddress');
        provAddress.siteCode = Form.getValue(this.providerAddressForm, 'site');
        provAddress.userDate1 = Form.getDatePickerValue(this.providerAddressForm, 'userdate1');
        provAddress.userDate2 = Form.getDatePickerValue(this.providerAddressForm, 'userdate2');
        provAddress.userDefined1 = Form.getValue(this.providerAddressForm, 'userdef1');
        provAddress.userDefined2 = Form.getValue(this.providerAddressForm, 'userdef2');
        provAddress.geoResult = Form.getValue(this.providerAddressForm, 'geoResult');
        provAddress.latitude = Form.getValue(this.providerAddressForm, 'latitude');
        provAddress.longitude = Form.getValue(this.providerAddressForm, 'longitude');
        provAddress.country = Form.getValue(this.providerAddressForm, 'country');
        provAddress.primaryAddress = Form.getValue(this.providerAddressForm, 'primaryAddr');
        provAddress.updateProcess = Form.getValue(this.providerAddressForm, 'updateProcess');
        provAddress.updateUser = Form.getValue(this.providerAddressForm, 'updateUser');
        // provAddress.updateDatetime = Form.getValue(this.providerAddressForm, 'updateDatetime');
        provAddress.insertProcess = Form.getValue(this.providerAddressForm, 'insertProcess');
        // provAddress.insertDatetime = Form.getValue(this.providerAddressForm, 'defaultIpaId');
        provAddress.securityCode = Form.getValue(this.providerAddressForm, 'securityCode');
        provAddress.saturdayHours = Form.getValue(this.providerAddressForm, 'saturdayHours');
        provAddress.fridayHours = Form.getValue(this.providerAddressForm, 'fridayHours');
        provAddress.thursdayHours = Form.getValue(this.providerAddressForm, 'thursdayHours');
        provAddress.wednesdayHours = Form.getValue(this.providerAddressForm, 'wednesdayHours');
        provAddress.tuesdayHours = Form.getValue(this.providerAddressForm, 'tuesdayHours');
        provAddress.mondayHours = Form.getValue(this.providerAddressForm, 'mondayHours');
        provAddress.sundayHours = Form.getValue(this.providerAddressForm, 'sundayHours');
        provAddress.medicalGroup = Form.getValue(this.providerAddressForm, 'medGrp');
        provAddress.zipCode = Form.getValue(this.providerAddressForm, 'zipCode');
        provAddress.state = Form.getValue(this.providerAddressForm, 'state');
        provAddress.city = Form.getValue(this.providerAddressForm, 'city');
        provAddress.addressLine1 = Form.getValue(this.providerAddressForm, 'addr1');
        provAddress.addressLine2 = Form.getValue(this.providerAddressForm, 'addr2');
        provAddress.name2 = Form.getValue(this.providerAddressForm, 'name2');
        provAddress.seqProvAddress = Form.getValue(this.providerAddressForm, 'seqProvAddress');
        provAddress.seqProvId = Form.getValue(this.providerAddressForm, 'seqProvId')
        return provAddress;
    }

    public saveProvAddress() {
        if (this.securityService.checkInsertUpdatePermissions(this.editProviderAddress, this.secWin)) {
            if (this.pfValidation === true) {
                if (this.editProviderAddress) {
                    this.updateProvAddress(this.provAddress.seqProvAddress)
                } else {
                    this.save();
                }
            } else {
                let popMsg = new PopUpMessage('Client/Server', 'Error', '30140: Phone/Fax Number must be 0, 7, 9, 10, 12, 15, 20', 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                    if (event.name = "Ok") {
                        this.pfValidation = false
                    }
                });
            }
        }
    }

    private updateProvAddress(seqProvAddress: number) {
        // if (!this.secWin || !this.secWin.hasUpdatePermission()) {
        //     this.showPopUp('You are not permitted to update Provider Address ', 'Provider Address Permissions');
        //     return;
        // }
        this.formValidation.validateForm();
        if (!this.providerAddressForm.valid) {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            return;
        }
        let provAddress = this.createProvAddress();
        provAddress.seqProvId = this.seqProvId;
        provAddress.seqProvAddress = this.provAddress.seqProvAddress;
        this.provAddressService.updateProvAddress(provAddress, seqProvAddress).subscribe(response => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.provAddress = provAddress;
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close();
                }, 2000)
            }
            this.popupClose = false;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
        });
    }

    public save() {
        this.formValidation.validateForm();
        if (!this.providerAddressForm.valid) {
            // tslint:disable-next-line:max-line-length
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            return;
        }
        else {
            let provAddress = new ProvAddress();
            provAddress.name2 = Form.getValue(this.providerAddressForm, 'name2');
            provAddress.addressLine1 = Form.getValue(this.providerAddressForm, 'addr1');
            provAddress.addressLine2 = Form.getValue(this.providerAddressForm, 'addr2');
            provAddress.city = Form.getValue(this.providerAddressForm, 'city');
            provAddress.county = Form.getValue(this.providerAddressForm, 'county');
            provAddress.zipCode = Form.getValue(this.providerAddressForm, 'zipCode');
            provAddress.state = Form.getValue(this.providerAddressForm, 'state');
            provAddress.country = Form.getValue(this.providerAddressForm, 'county');
            provAddress.primaryAddress = Form.getValue(this.providerAddressForm, 'primaryAddress');
            provAddress.medicalGroup = Form.getValue(this.providerAddressForm, 'medicalGroup');
            provAddress.userDefined1 = Form.getValue(this.providerAddressForm, 'userdef1');
            provAddress.userDefined2 = Form.getValue(this.providerAddressForm, 'userdef2');
            provAddress.userDate1 = Form.getDatePickerValue(this.providerAddressForm, 'userdate1');
            provAddress.userDate2 = Form.getDatePickerValue(this.providerAddressForm, 'userdate1');
            provAddress.sundayHours = Form.getValue(this.providerAddressForm, 'sundayHours');
            provAddress.mondayHours = Form.getValue(this.providerAddressForm, 'mondayHours');
            provAddress.tuesdayHours = Form.getValue(this.providerAddressForm, 'tuesdayHours');
            provAddress.wednesdayHours = Form.getValue(this.providerAddressForm, 'wednesdayHours');
            provAddress.thursdayHours = Form.getValue(this.providerAddressForm, 'thursdayHours');
            provAddress.fridayHours = Form.getValue(this.providerAddressForm, 'fridayHours');
            provAddress.saturdayHours = Form.getValue(this.providerAddressForm, 'saturdayHours');
            provAddress.seqProvAddress = this.provAddress.seqProvAddress;
            provAddress.seqProvId = this.seqProvId;
            this.provAddressService.createProvAddress(provAddress).subscribe((response) => {
                this.toastService.showToast(
                    "Record successfully created.",
                    NgbToastType.Success
                );
                this.editProviderAddress = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            })
        }
    }
   changeCountry(event:any){
       this.providerAddressForm.patchValue({
         country: event.target.value,
       });
   }
    public onLookupFieldProvId(event: any, id: string) {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault();
            this.findByProviderId(id);
            this.editProviderAddress = true;
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openSearchModel();
        }
    }

    private findByProviderId(providerId: string) {
        this.providerAddressForm.patchValue({
            'providerId': providerId
        });
        this.provMasterService.findByProviderId(providerId).subscribe((provMaster: ProvMaster) => {
            if(provMaster){
            this.providerAddressForm.patchValue({
                'dynamicText': provMaster.shortName
            });
            this.seqProvId = provMaster.seqProvId;
            // this.getProvAddressContacts(this.seqProvId);
            this.editProviderAddress = true;

            this.loadData(provMaster);


        }
        else
        {
            let popMsg = new PopUpMessage('ProvNotExistPopup', 'Provider Master', '8076: Entered Provider Id does not exists', 'icon');
            popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {

            });
        }
        }, (error: Error) => {
            let popMsg = new PopUpMessage('ProvNotExistPopup', 'Provider Master', '8076: Entered Provider Id does not exists', 'icon');
            popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            });
        });
    }

     currentProvAddContacts= new Array<ProvAddressContact>();

    getProvAddressContacts(seqProvId: number) {
        this.provAddContactService.findBySeqProvId(seqProvId).subscribe((resp: ProvAddressContact[]) => {
            this.populateDynamicForm(resp);
            //to check if there is already a record with primary contact
            this.currentProvAddContacts=resp;

        });

    }

    private loadData(provMaster: ProvMaster) {
        this.provAddressService.findBySeqProvId(provMaster.seqProvId)
            .subscribe(provAddress => {
                this.provAddressRow = provAddress;
                this.dataGridGridOptions.api.setRowData(provAddress);
                this.dataGridGridOptions.api.selectIndex(0, false, true);
            }, (error: Error) => {
                let popMsg = new PopUpMessage('ProvNotExistPopup', 'Provider Master', '13167: Entered Provider Id does not exists. Press yes to create a new Provider ID.', 'icon');
                popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                });
            });
    }

    private patchPorviderMasterDetail(provAddress: ProvAddress): void {
        this.provAddress = provAddress;
        this.providerAddressForm.patchValue({
            'addr1': this.provAddress.addressLine1,
            'addr2': this.provAddress.addressLine2,
            'city': this.provAddress.city,
            'country': this.provAddress.country,
            'name2': this.provAddress.name2,
            'state': this.provAddress.state,
            'primaryAddress': this.provAddress.seqProvAddress,
            'site': this.provAddress.siteCode,
            'userdate2': this.dateFormatPipe.defaultDisplayDateFormat(this.provAddress.userDate2),
            'userdate1': this.dateFormatPipe.defaultDisplayDateFormat(this.provAddress.userDate1),
            'userdef1': this.provAddress.userDefined1,
            'userdef2': this.provAddress.userDefined2,
            'geoResult': this.provAddress.geoResult,
            'latitude': this.provAddress.latitude,
            'longitude': this.provAddress.longitude,
            'primaryAddr': this.provAddress.primaryAddress,
            'securityCode': this.provAddress.securityCode,
            'saturdayHours': this.provAddress.saturdayHours,
            'fridayHours': this.provAddress.fridayHours,
            'thursdayHours': this.provAddress.thursdayHours,
            'wednesdayHours': this.provAddress.wednesdayHours,
            'tuesdayHours': this.provAddress.tuesdayHours,
            'mondayHours': this.provAddress.mondayHours,
            'sundayHours': this.provAddress.sundayHours,
            'medGrp': this.provAddress.medicalGroup,
            'zipCode': this.provAddress.zipCode,
            'seqProvId': this.provAddress.seqProvId,
        }, {emitEvent: false, onlySelf: true});
        setTimeout(() => {
            this.formValueChangeStatus()
        }, 2000)
        this.providerAddressForm.get('providerId').disable();
    }

    onChangeProvAddressGrid() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            this.provAddress = selectedRows[0];
            this.searchStatus = true;
            this.keyValues = selectedRows[0].providerId;
            this.patchPorviderMasterDetail(this.provAddress);
            this.isResetForm= true;
            this.provAddContactService.findBySeqProvAddress(this.provAddress.seqProvAddress).subscribe(contacts =>{
                if(contacts)
                {
                    this.populateDynamicForm(contacts);
                    this.currentProvAddContacts=contacts;
                    this.isResetForm = false;
                }
                else
                {
                    this.isResetForm= true;
                    setTimeout(() => {
                        this.isResetForm = false;
                    }, 3000);
                }

            })
        } else {
            this.searchStatus = false;
            this.keyValues = '';
        }
    }

    populateDynamicForm(provAddressContacts: ProvAddressContact[]) {
        if (!provAddressContacts || provAddressContacts.length < 1) {
            return;
        }

        this.provAddressContactsState =[];
        provAddressContacts.forEach((provContact: ProvAddressContact) => {
            let mockConfig = JSON.parse(JSON.stringify(this.providerAddressContactFormConfig));    // make a copy of original config
            this.providerAddressContactFormConfig.forEach((field, index) => {
                if (field.name === ProviderAddressContactFields.CONTACT_NAME) {
                    mockConfig[index].value = provContact.contactName;
                } else if (field.name === ProviderAddressContactFields.TITLE) {
                    mockConfig[index].value = provContact.contactTitle;
                } else if (field.name === ProviderAddressContactFields.EMAIL_ID) {
                    mockConfig[index].value = provContact.emailId;
                } else if (field.name === ProviderAddressContactFields.EXT_NO) {
                    mockConfig[index].value = provContact.extension;
                } else if (field.name === ProviderAddressContactFields.PHONE_NUMBER) {
                    mockConfig[index].value = provContact.phoneNumber;
                } else if (field.name === ProviderAddressContactFields.FAX_NUMBER) {
                    mockConfig[index].value = provContact.faxNumber;
                } else if (field.name === ProviderAddressContactFields.AL_DIST_METH) {
                    mockConfig[index].value = provContact.primaryDistributionMethod;
                } else if (field.name === ProviderAddressContactFields.PRIM) {
                    mockConfig[index].value = provContact.primaryContact;



                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            formState.id = {
                seqProvId: provContact.provAddressContactPrimaryKey.seqProvId,
                seqProvAddress: provContact.provAddressContactPrimaryKey.seqProvAddress,
                seqProvContact: provContact.provAddressContactPrimaryKey.seqProvContact
            };
            console.log(provContact);
            this.provAddressContactsState.push(formState);          // add record
        });

        this.provAddressContactsState = JSON.parse(JSON.stringify(this.provAddressContactsState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        // setTimeout(() => {
        //     this.formValueChangeStatus();
        // }, 2000)
    }


    populateContactField(event: any, action: FORM_FIELD_ACTION_TYPES): ProvAddressContact {
        let provContact = new ProvAddressContact();
        provContact.emailId = event[7].value;
        provContact.faxNumber = event[4].value;
        provContact.extension = event[3].value;
        provContact.phoneNumber = event[2].value;
        provContact.contactTitle = event[1].value;
        provContact.contactName = event[0].value;
        provContact.primaryContact = event[5].value;
        provContact.primaryDistributionMethod = event[6].value;
        provContact.action = action;
        return provContact;
    }

    saveAddressContactPerson(event: any) {
        let provAddressContacts = new Array<ProvAddressContact>();
        const updatedRecords: FormRow[] = this.provAddressContactsState.filter(record => record.action);
        console.log(this.provAddressContactsState);
        if (updatedRecords.length > 0) {
            this.provAddressContactsState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let provAddressContact: ProvAddressContact = this.populateContactField(pair, preStateRecord.action);
                    if (!provAddressContact.provAddressContactPrimaryKey) {
                        provAddressContact.provAddressContactPrimaryKey = new ProvAddressContactPrimaryKeyModel();
                    }
                    provAddressContact.provAddressContactPrimaryKey["seqProvAddress"] = this.provAddress.seqProvAddress;
                    provAddressContact.provAddressContactPrimaryKey["seqProvId"] = this.seqProvId;
                    provAddressContact.provAddressContactPrimaryKey["seqProvContact"] = preStateRecord.id.seqProvContact;
                    provAddressContacts.push(provAddressContact);
                    //update currentProvAddContacts
                    for(let i=0; i<this.currentProvAddContacts.length; i++){
                        if (this.currentProvAddContacts[i].provAddressContactPrimaryKey.seqProvContact===provAddressContact.provAddressContactPrimaryKey.seqProvContact)
                        this.currentProvAddContacts[i]=provAddressContact
                        }
            }
            });
        }

        const newRecords = event.slice(this.provAddressContactsState.length);

        newRecords.forEach(record => {
            const pair = Object.keys(record).map(k => ({key: k, value: record[k]}));
            let provAddressContact: ProvAddressContact = this.populateContactField(pair, FORM_FIELD_ACTION_TYPES.ADD);

            provAddressContact.provAddressContactPrimaryKey = {
                seqProvAddress: this.provAddress.seqProvAddress,
                seqProvId: this.seqProvId,
                seqProvContact: null
            };
             provAddressContacts.push(provAddressContact)
             if (!(this.currentProvAddContacts[this.currentProvAddContacts.length-1].provAddressContactPrimaryKey.seqProvContact===provAddressContact.provAddressContactPrimaryKey.seqProvContact))
             this.currentProvAddContacts.push(provAddressContact)
             else
             this.currentProvAddContacts[this.currentProvAddContacts.length-1]=provAddressContact
                    console.log(provAddressContacts);

        });

        //Verify that there is only one primary contact in records
        let count =0;
        for(let i=0; i<this.currentProvAddContacts.length; i++){
            if (this.currentProvAddContacts[i].primaryContact==='Y')
            count=count+1
        }
            if (count>1){
                let popMsg = new PopUpMessage('Client/Server', 'Error', 'A provider may have only one primary contact', 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;

            return;
        }
        else{

        // ('============================= api records with action update/add ================================');
        //   => variable contains all the updated records and new record to add updated by form-inline grid

        this.provAddContactService.updateAddressContactPersonRecords(provAddressContacts).subscribe(resp => {

            this.toastService.showToast('Contact updated Successfully', NgbToastType.Success)
            this.provAddContactService.findBySeqProvAddress(this.provAddress.seqProvAddress).subscribe(contacts =>{
            this.currentProvAddContacts=contacts
            })
        })
    }

    }

    getCountries() {
        this.countryService.getCountrys().subscribe(countries => {
            countries.sort((a, b) => {
                if  (a['country'] < b['country']) {return -1;}
                if (a['country'] > b['country']) {return 1;}
                return 0;
            });
            this.countries = countries;
        })
    }

    public createNewOption = () => {
        this.editProviderAddress = false;
        // this.showMemberMasterField = true;
        this.providerAddressForm = this.formBuilder.group({
            site: ['', {updateOn: 'blur', validators: []}],
            cert: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            siteName: ['', {updateOn: 'blur', validators: []}],
            name2: ['', {updateOn: 'blur', validators: []}],
            sundayHours: ['', {updateOn: 'blur', validators: []}],
            addr1: ['', {updateOn: 'blur', validators: []}],
            mondayHours: ['', {updateOn: 'blur', validators: []}],
            addr2: ['', {updateOn: 'blur', validators: []}],
            tuesdayHours: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            wednesdayHours: ['', {updateOn: 'blur', validators: []}],
            county: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            thursdayHours: ['', {updateOn: 'blur', validators: []}],
            zipCode: ['', {updateOn: 'blur', validators: []}],
            fridayHours: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: []}],
            saturdayHours: ['', {updateOn: 'blur', validators: []}],
            primaryAddr: ['', {updateOn: 'blur', validators: []}],
            medGrp: ['', {updateOn: 'blur', validators: []}],
            userDef1: ['', {updateOn: 'blur', validators: []}],
            userdate1: ['', {updateOn: 'blur', validators: []}],
            userDef2: ['', {updateOn: 'blur', validators: []}],
            userdate2: ['', {updateOn: 'blur', validators: []}],
            alDist: ['', {updateOn: 'blur', validators: []}],
            textbox001: ['', {updateOn: 'blur', validators: []}],
            textbox002: ['', {updateOn: 'blur', validators: []}],
            textbox003: ['', {updateOn: 'blur', validators: []}],
            textbox004: ['', {updateOn: 'blur', validators: []}],
            textbox005: ['', {updateOn: 'blur', validators: []}],
            textbox006: ['', {updateOn: 'blur', validators: []}],
            textbox007: ['', {updateOn: 'blur', validators: []}],
            textbox008: ['', {updateOn: 'blur', validators: []}]
        });
        this.showFields = true;
        this.isResetForm = true;
        let data = [];
        for (let item of this.provAddressRow) {
            data.push(item)
        }
        data.push([]);
        this.dataGridGridOptions.api.setRowData(data);
    };

    numberValidation = (value) => {
        this.pfValidation = value;
    };

    name2ToTable = (event) => {
        let name = event.srcElement.id;
        let data = [];
        switch (name) {
            case 'name2' :
                this.customTable.name2 = event.target.value;
                break;
            case 'addr1' :
                this.customTable.addressLine1 = event.target.value;
                break;
            case 'city' :
                this.customTable.city = event.target.value;
                break;
            case 'county' :
                this.customTable.county = event.target.value;
                break;
            case 'state' :
                this.customTable.state = event.target.value;
                break;
            case 'zipCode' :
                this.customTable.zipCode = event.target.value;
                this.findDetailByZipCode(event);
                break;
            default:
                break;
        }

        for (let item of this.provAddressRow) {
            data.push(item);
        }
        data.push(this.customTable);
        this.dataGridGridOptions.api.setRowData(data)
    };

    findDetailByZipCode(event: any) {
        this.zipCode = new ZipCodes();
        let zipCode = event.target.value;
        this.zipCodesService.getZipCode(zipCode).subscribe(resp => {
            if (resp !== null) {
                this.zipCode = resp;
                this.setCityAndStateProvByZipCode(this.zipCode);
            }
        });
    }

    setCityAndStateProvByZipCode(zipCode: ZipCodes) {
        this.providerAddressForm.patchValue({
            'city': zipCode.city,
            'state': zipCode.state,
            'zipCode': zipCode.zip,
            'county': zipCode.county,
        });
    }

    setProviderAddressModel = (provAddress: ProvAddress) => {
        provAddress.name2 = Form.getValue(this.providerAddressForm, 'name2');
        provAddress.addressLine1 = Form.getValue(this.providerAddressForm, 'addr1');
        provAddress.addressLine2 = Form.getValue(this.providerAddressForm, 'addr2');
        provAddress.city = Form.getValue(this.providerAddressForm, 'city');
        provAddress.state = Form.getValue(this.providerAddressForm, 'state');
        provAddress.zipCode = Form.getValue(this.providerAddressForm, 'zipCode');
        provAddress.county  = Form.getValue(this.providerAddressForm, 'county');
        provAddress.medicalGroup = Form.getValue(this.providerAddressForm, 'medGrp');
        provAddress.sundayHours = Form.getValue(this.providerAddressForm, 'sundayHours');
        provAddress.mondayHours = Form.getValue(this.providerAddressForm, 'mondayHours');
        provAddress.tuesdayHours = Form.getValue(this.providerAddressForm, 'tuesdayHours');
        provAddress.wednesdayHours = Form.getValue(this.providerAddressForm, 'wednesdayHours');
        provAddress.thursdayHours = Form.getValue(this.providerAddressForm, 'thursdayHours');
        provAddress.fridayHours = Form.getValue(this.providerAddressForm, 'fridayHours');
        provAddress.saturdayHours = Form.getValue(this.providerAddressForm, 'saturdayHours');
        provAddress.userDefined1 = Form.getValue(this.providerAddressForm, 'userDef1');
        provAddress.securityCode = Form.getValue(this.providerAddressForm, 'securityCode');
        provAddress.insertDatetime = Form.getValue(this.providerAddressForm, 'insertDatetime');
        provAddress.insertUser = Form.getValue(this.providerAddressForm, 'insertUser');
        provAddress.insertProcess = Form.getValue(this.providerAddressForm, 'insertProcess');
        provAddress.updateDatetime = Form.getValue(this.providerAddressForm, 'updateDatetime');
        provAddress.updateUser = Form.getValue(this.providerAddressForm, 'updateUser');
        provAddress.updateProcess = Form.getValue(this.providerAddressForm, 'updateProcess');
        provAddress.primaryAddress = Form.getValue(this.providerAddressForm, 'primaryAddr');
        provAddress.country = Form.getValue(this.providerAddressForm, 'country');
        provAddress.userDefined2 = Form.getValue(this.providerAddressForm, 'userDef2');
        provAddress.userDate1 = Form.getDatePickerValue(this.providerAddressForm, 'userdate1');
        provAddress.userDate2 = Form.getDatePickerValue(this.providerAddressForm, 'userdate2');
    };

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'PROVA_Provider_Addresses.htm';
    }

    formValueChangeStatus = () => {
        this.providerAddressForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
