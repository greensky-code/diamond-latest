/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {ZipCodeLookup} from '../../../shared/lookup/zip-code-lookup';
import {ZipCodesService} from '../../../api-services/zip-codes.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {DddwDtlService, MessageMasterDtlService, SystemCodesService} from '../../../api-services';
import {SupportHelpComponent} from '../support-help/support-help.component';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {CONSTANTS, getTimelyFilingRulesShortcutKeys, getZipCodeShortcutKeys} from '../../../shared/services/shared.service';
import {TimestampComponent} from '../../../shared/components/timestamp/timestamp.component';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';

import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {ZipCodes} from '../../../api-models/zip-codes.model';
// Use the Component directive to define the ZipCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'zipcode',
    templateUrl: './zip-code.component.html',

})
export class ZipCodeComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    zipCodeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'ZIPRF';
    public isSuperUser = false;
    public secProgress = true;
    loaderValue = false;
    zipcodeDetail: ZipCodes;
    userTemplateId: string = '';
    secColDetails = new Array<SecColDetail>();
    showCompleteForm: boolean = false;
    ifZipReadOnly: boolean = false;
    updateZip: boolean = false;
    zipCodeQualifierList: any;
    formValueChanged: boolean = false;
    @Input() showIcon: true;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    menu: Menu[] = [];
    menuOpened = ''
    keyValues: number;
    searchStatus = false;
    keyNames: string = "zipCode";
    zipCodeSearchModel = new SearchModel(
        'zipcodes/lookup',
        ZipCodeLookup.ZIP_CODE_ALL,
        ZipCodeLookup.ZIP_CODE_DEFAULT,
        []
    );
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public shortcuts: ShortcutInput[] = [];

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
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
            this.popupMessageHandler(button)
        }
    }


    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private zipCodesService: ZipCodesService,
        private router: Router,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private toastService: ToastService,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        private systemCodesService: SystemCodesService,
        private activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.zipCodeForm);
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.loaderValue = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('BENEFIT_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.loaderValue = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }

    private initializeComponentState(): void {
        this.menuInit();
        this.fetchZipCodeQualifiersddlData();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.zipCodeForm = this.formBuilder.group({
            zipCode: ['', {updateOn: 'blur', validators: [Validators.required]}],
            city: ['', {updateOn: 'blur', validators: [Validators.required]}],
            state: ['', {updateOn: 'blur', validators: [Validators.required]}],
            county: ['', {updateOn: 'blur', validators: []}],
            areaCode: ['', {updateOn: 'blur', validators: []}],
            zipCodeQualifier: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    openF5Lookup() {

        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.zipCodeSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = false;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                console.log(res);
                this.setFormData(res);
                // this.procedurePriceForm.get('procedureCode').setValue(res.procedureCode);
                // this.GetAllFormData(res.procedureCode);
                //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
            }
        });
    }

    onTabLookup(value: string) {
        if (value) {
            this.loaderValue = true;

            this.zipCodesService.getZipCode(value).subscribe((data) => {
                this.loaderValue = false;
                if (data)
                    this.setFormData(data);
                else
                    this.showOptionsPoPUp();

            }, error => {
                this.loaderValue = false;
                this.showOptionsPoPUp();
            });
        } else {
            this.loaderValue = true;
            this.messageService
                .findByMessageId(5524)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.loaderValue = false;
                    this.showPopUp(
                        '27078: ' +
                        message[0].messageText,
                        'Zip Code'
                    );
                });
        }


    }

    showOptionsPoPUp() {
        let popMsg = new PopUpMessage(
            'zipNotExistPopup',
            'Zip Code',
            'Entered Zip Code does not exists. Press yes to create a new Zip Code.',
            'icon'
        );
        // tslint:disable-next-line:max-line-length
        popMsg.buttons = [
            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
            size: 'lg',
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
    }

    popUpButtonClicked(button: any) {
        if (button.name === 'yes') {

            this.ifZipReadOnly = true;
            this.showCompleteForm = true;
        }
        if (button.name === 'no') {
        }
        this.popUpMessage = null;
    }

    openPopUpButtonClicked(button: any) {
        if (button.name === 'yes') {
            this.formValueChanged = false;

            if (this.updateZip)
                this.updateZipCode();
            else
                this.saveZipCode();
        }
        if (button.name === 'no') {
            this.formValueChanged = false;
            this.zipCodeForm.reset();
            this.ifZipReadOnly = false;
            this.showCompleteForm = false;
        }
        this.popUpMessage = null;
    }

    onKeyDown(event) {
        switch (event.key) {

            case 'F5':
                event.preventDefault();
                this.openF5Lookup();
                break;
            case 'Tab':
                event.preventDefault();
                this.onTabLookup(event.target.value);
                break;
        }
    }

    setFormData(data: any) {
        this.zipcodeDetail = data;
        this.showCompleteForm = true;
        this.ifZipReadOnly = true;
        this.updateZip = true;
        this.zipCodeForm.get('zipCode').setValue(data.zip)
        this.zipCodeForm.get('city').setValue(data.city);
        this.zipCodeForm.get('state').setValue(data.state);
        this.zipCodeForm.get('county').setValue(data.county);
        this.zipCodeForm.get('areaCode').setValue(data.areaCode);
        this.zipCodeForm.get('zipCodeQualifier').setValue(data.zipCodeQualifier);
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
    }

    updateZipCode() {
        this.formValueChanged = false;
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.zipCodeForm.valid) {

            let zipcodeDetail: any = {};
            zipcodeDetail.zip = Form.getValue(this.zipCodeForm, 'zipCode');
            zipcodeDetail.city = Form.getValue(this.zipCodeForm, 'city');
            zipcodeDetail.state = Form.getValue(this.zipCodeForm, 'state');
            zipcodeDetail.county = Form.getValue(this.zipCodeForm, 'county');
            zipcodeDetail.areaCode = Form.getValue(this.zipCodeForm, 'areaCode');
            zipcodeDetail.zipCodeQualifier = Form.getValue(this.zipCodeForm, 'zipCodeQualifier');

            this.loaderValue = true;
            this.zipCodesService.updateZipCodes(zipcodeDetail, Form.getValue(this.zipCodeForm, 'zipCode')).subscribe(response => {

                this.updateZip = false;
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                // this.editProcedurePrice = false;
                this.loaderValue = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.updateZip = true;
                this.loaderValue = false;
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.updateZip = true;
            this.loaderValue = false;
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        //     } else {
        //     this.showPopUp('You are not permitted to update Zip Code ', 'Zip Code Permissions');
        //   }
    }

    saveZipCode() {
        this.formValueChanged = false;
        this.formValidation.validateForm();
        if (this.zipCodeForm.valid) {
            let zipcodeDetail: any = {};
            zipcodeDetail.zip = Form.getValue(this.zipCodeForm, 'zipCode');
            zipcodeDetail.city = Form.getValue(this.zipCodeForm, 'city');
            zipcodeDetail.state = Form.getValue(this.zipCodeForm, 'state');
            zipcodeDetail.county = Form.getValue(this.zipCodeForm, 'county');
            zipcodeDetail.areaCode = Form.getValue(this.zipCodeForm, 'areaCode');
            zipcodeDetail.zipCodeQualifier = Form.getValue(this.zipCodeForm, 'zipCodeQualifier');

            this.zipCodesService.createZipCodes(zipcodeDetail).subscribe(response => {
                this.updateZip = false;
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                // this.editProcedurePrice = false;
                this.loaderValue = false;

                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.updateZip = true;
                this.loaderValue = false;
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating record. Please check your entry.');
            });
        } else {
            this.updateZip = true;
            this.loaderValue = false;
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {
                        name: 'New',
                        shortcutKey: 'Ctrl+M',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {
                        name: 'Save',
                        shortcutKey: 'Ctrl+S',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {
                        name: 'Paste',
                        shortcutKey: 'Ctrl+V',
                        disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
                    },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Zip Code Lookup'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Zip Code'},
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
        if (this.formValueChanged) {
            let popMsg = new PopUpMessage(
                'zipChangePopup',
                'Zip Code',
                '29065: Data has been modified. Press Yes to save the changes.',
                'icon'
            );
            // tslint:disable-next-line:max-line-length
            popMsg.buttons = [
                new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('no', 'No', 'btn btn-primary'),
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {
                size: 'lg',
            });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                this.openPopUpButtonClicked(event);
            });

        } else {
            this.zipCodeForm.reset();
            this.ifZipReadOnly = false;
            this.showCompleteForm = false;
        }
    }

    addNewRecord() {
        if (Form.getValue(this.zipCodeForm, 'zipCode')) {
            this.ifZipReadOnly = true;
            this.showCompleteForm = true;
        } else {
            this.showCompleteForm = false;
            this.loaderValue = true;
            this.messageService
                .findByMessageId(5524)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.loaderValue = false;
                    this.showPopUp(
                        '27078: ' +
                        message[0].messageText,
                        'Zip Code'
                    );
                });
        }


    }

    onMenuItemClick(eve) {
        if (eve.menu.menuItem === 'File') {
            // handle File actions
            switch (eve.action) {
                case 'New': {
                    this.createNew();
                    break;
                }
                case 'Open': {
                    this.resetAll();
                    break;
                }
                case 'Save': {
                    this.saveZipCode()
                    break;
                }
                case 'Close': {
                    this.modalClose()
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
                    break;
                }
                case 'Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(
                        FunctionalGroupShortCutComponent
                    );
                    ref.componentInstance.showIcon = true;
                    break;
                }

                default: {
                    // this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (eve.menu.menuItem === 'Edit') {
            if (eve.action == 'Lookup') {
                this.openF5Lookup();
            }
            // handle Edit-Menu Actions
            //   this.handleEditMenu(event.action);
        } else if (eve.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(eve.action);
        } else if (eve.menu.menuItem === 'Window') {
            switch (eve.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.zipCodeForm.get('zipCode').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
            }
        } else if (eve.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'ZIP Code Lookup': {
                this.openF5Lookup();
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


    verifyAreaCode(event) {
        this.formValueChanged = true;
        if (event.target.value) {
            let aCode = event.target.value;
            if (aCode < 100 || aCode > 999) {
                event.preventDefault();
                event.target.select();

                this.showPopUp(
                    '27178: Area Code must be either a 3 digit number from 100 to 999 or be left blank; ',
                    'Zip Code'
                );

            }

        }
    }


    fetchZipCodeQualifiersddlData() {

        this.systemCodesService
            .findBySystemCodeTypeAndSystemCodeActiveAndLanguageId('ZIPCODEQUALFIER', 'Y', 0)
            .subscribe(res => {
                this.zipCodeQualifierList = res;
            });
    }


    inputEvent(event) {
        this.formValueChanged = true;
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getZipCodeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, {windowClass: 'myCustomModalClass'});
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/ZIPRF_Zip_Code_Lookup.htm';
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Zip Code')
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
                    if (this.updateZip)
                        this.updateZipCode();
                    else
                        this.saveZipCode();
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

    openFileMenu() {
        document.getElementById('fileDropdownFile').dispatchEvent(new MouseEvent('click'));
    }
    openSpecialMenu() {
        document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownSpecial'
    }
    openWindowMenu() {
        document.getElementById('fileDropdownWindow').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownWindow'
    }
    openHelpMenu() {
        document.getElementById('fileDropdownHelp').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownHelp'
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
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'z':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'ZIP Code Lookup'
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

    showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Line of Business';

        ref.componentInstance.insertDateTime = this.zipcodeDetail.insertDatetime;
        ref.componentInstance.insertDateTime = this.zipcodeDetail.insertDatetimeDisplay;

        ref.componentInstance.insertProcess = this.zipcodeDetail.insertProcess;
        ref.componentInstance.insertUser = this.zipcodeDetail.insertUser;
        ref.componentInstance.updateUser = this.zipcodeDetail.updateUser;
        ref.componentInstance.updateDateTime = this.zipcodeDetail.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.zipcodeDetail.updateProcess;
    };

    auditDisplay = () => {
        if (this.searchStatus && this.keyValues) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.windowId
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: "lg",
                });
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.windowId;
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
    }

    isFormDataModified() {
        this.zipCodeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

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
                    this.router.navigate(['/'])
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    createNew() {
        this.zipCodeForm.reset();
        this.ifZipReadOnly = false;
    }
}
