/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Country, MessageMasterDtl, SecWin} from '../../../api-models/index';
import {CountryService} from '../../../api-services/country.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu} from '../../../shared/models/models';
import {SecurityService} from '../../../shared/services/security.service';
import {ToastService} from '../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {COUNTRY_MODULE_ID} from '../../../shared/app-constants';
import {SecUser} from '../../../api-models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {CONSTANTS} from '../../../shared/services/shared.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';

// Use the Component directive to define the CountryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'country',
    templateUrl: './country.component.html',
    providers: [
        CountryService
    ]
})
export class CountryComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    countryForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    @Input() winID?: string;
    secWin: SecWinViewModel;
    windowId = COUNTRY_MODULE_ID;
    tableName = 'COUNTRY';
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = COUNTRY_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    public menu: Menu[] = [];
    searchStatus = false;
    keyNames = '';
    keyValues: any;
    rowEvSelectedStatus: Boolean = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

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

    editCountry: boolean;
    country: Country;
    countries: Country[];

    createCountry() {
        this.formValidation.validateForm();
        if (this.countryForm.valid) {
            let country = new Country();
            country.country = Form.getValue(this.countryForm, 'country');
            country.countryCode = Form.getValue(this.countryForm, 'countryCode');
            this.countryService.createCountry(country).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editCountry = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateCountry(countryCode: string) {
        this.formValidation.validateForm();
        if (this.countryForm.valid) {
            let country = new Country();
            country.country = Form.getValue(this.countryForm, 'country');
            country.countryCode = Form.getValue(this.countryForm, 'countryCode');
            this.countryService.updateCountry(country, countryCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editCountry = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveCountry() {
        if (this.editCountry) {
            this.updateCountry(this.country.countryCode)
        } else {
            this.createCountry();
        }
    }

    deleteCountry(countryCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.countryService.deleteCountry(countryCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getCountry(countryCode: string) {
        this.countryService.getCountry(countryCode).subscribe(country => {
            this.country = country;
            this.countryForm.patchValue({
                'country': this.country.country,
                'countryCode': this.country.countryCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getCountries() {
        this.countryService.getCountrys().subscribe(countries => {
            this.countries = countries;
            this.dataGridGridOptions.api.setRowData(this.countries);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Country',
                field: 'country',
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private secColDetailService: SecColDetailService,
        private countryService: CountryService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.countryForm);
        this.createDataGrid();
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

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.disableMenu();
                this.secProgress = false;
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }
    disableMenu(){
          if (this.userTemplateId == "UT_VIEW") {
            this.menu[0]["dropdownItems"][0].disabled = true;
            this.menu[0]["dropdownItems"][2].disabled = true;
          }
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
            .findByTableNameAndUserId(this.tableName, secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.countryForm);
        this.createDataGrid();
        this.getCountries();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.countryForm = this.formBuilder.group({
            country: ['', {updateOn: 'blur', validators: []}],
            countryCode: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    populateForm() {
        if (this.rowEvSelectedStatus) {
            this.countryForm.patchValue({
                'country': this.country.country,
                'countryCode': this.country.country
            });
        } else {
            this.countryForm.patchValue({
                'country': this.country.country,
                'countryCode': this.country.countryCode
            });
        }
    }

    onCountrySelected(event) {
        this.rowEvSelectedStatus = event.rowIndex % 2 === 0;
        if(event && event.data){
            this.country = event.data;
            this.populateForm();
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
              menuItem: 'Windows',
              dropdownItems: [
                  {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                  {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                  {isHorizontal: true},
                  {name: '1 Main Menu'},
                  {name: '2 Country'}
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createForm();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    break;
                }
                case 'Close': {
                    this.countryForm.reset();
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
            this.handleEditMenu(event.action);
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
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

}
