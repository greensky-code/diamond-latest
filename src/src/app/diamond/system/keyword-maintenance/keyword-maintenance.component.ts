/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecWinDescr} from '../../../api-models'
import {MessageMasterDtlService, SecWinDescrService} from '../../../api-services'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecUserService} from '../../../api-services';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecWin} from '../../../api-models';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {Menu, SearchModel} from '../../../shared/models/models';
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { LanguageMasterLookUp } from '../../../shared/lookup/language-master-lookup';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {CONSTANTS} from '../../../shared/services/shared.service';
import {ProviderRelationshipComponent} from '../../provider/provider-relationship/provider-relationship.component';
import {VendorAdvancePaymentRulesComponent} from '../../vendor/vendor-advance-payment-rules/vendor-advance-payment-rules.component';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {ToastService} from '../../../shared/services/toast.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';





// Use the Component directive to define the KeywordMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'keywordmaintenance',
    templateUrl: './keyword-maintenance.component.html',

})
export class KeywordMaintenanceComponent implements OnInit  {

    @Input() showIcon: boolean;
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    keywordMaintenanceForm: FormGroup;
    secColDetails = new Array<SecColDetail>();
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    editSecWinDescr: boolean;
    secWinDescr: SecWinDescr;
    secWinDescrs: SecWinDescr [] = [];
    public menu: Menu[] = [];
    searchStatus = false;
    keyNames = '';
    keyValues: any;
    public showKeywordMaintenance: boolean = false;
    private secColDetailService: SecColDetailService;
    userTemplateId: string;
    @Input() winID?: string;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    languageCode001: any;
    isDisabledField = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private secUserService: SecUserService,
        private securityService: SecurityService,
        private secWinDescrService: SecWinDescrService,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService,
        private router: Router,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        public activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.keywordMaintenanceForm);
        this.createDataGrid();
        this.menuInit();
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

    popupMessageHandler(button: PopUpMessageButton) {
        // tslint:disable-next-line:triple-equals
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        // tslint:disable-next-line:triple-equals
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        // tslint:disable-next-line:triple-equals
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createSecWinDescr() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.keywordMaintenanceForm.valid) {
                let secWinDescr = new SecWinDescr();
                secWinDescr.languageId = Form.getValue(this.keywordMaintenanceForm, 'languageCode001');
                this.secWinDescrService.createSecWinDescr(secWinDescr).subscribe(response => {
                    this.secWinDescrs = response ; 
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editSecWinDescr = false;
                }, error => {
                    this.alertMessage = this.alertMessageService
                        .error('An Error occurred while creating new record. Please check your entry.');
                });

            } else {
                this.alertMessage = this.alertMessageService
                    .error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {

        }
    }

    updateSecWinDescr(languageId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.keywordMaintenanceForm.valid) {
            let secWinDescr = new SecWinDescr();
            secWinDescr.languageId = Form.getValue(this.keywordMaintenanceForm, 'languageCode001');
            this.secWinDescrService.updateSecWinDescr(secWinDescr, languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editSecWinDescr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
         } else {
            // tslint:disable-next-line:max-line-length
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    saveSecWinDescr() {
        if (this.editSecWinDescr) {
            this.updateSecWinDescr(this.secWinDescr.languageId)
        } else {
            this.createSecWinDescr();
        }
    }
    deleteSecWinDescr(languageId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.secWinDescrService.deleteSecWinDescr(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
       }
    }
    getSecWinDescr(languageId: number) {
        this.secWinDescrService.getSecWinDescr(languageId).subscribe(secWinDescr => {
            this.secWinDescr = secWinDescr;
            this.keywordMaintenanceForm.patchValue({
                'languageCode001': this.secWinDescr.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }
    getSecWinDescrs() {
        this.secWinDescrService.getSecWinDescrs().subscribe(secWinDescrs => {
        this.secWinDescrs = secWinDescrs;
        this.dataGridGridOptions.api.setRowData(this.secWinDescrs);

            this.keywordMaintenanceForm.patchValue({
                'languageCode001': this.languageCode001,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    dataGridGridOptionsExportCsv() {
        let params = {
    };
      this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
      this.dataGridGridOptions = {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: 'Win ID',
             field: 'secWinDescrPrimaryKey.winId',
             width: 400,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Short Description',
             field: 'sdescr',
             width: 400         }
      ];
    }



    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }
    };

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.keywordMaintenanceForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.keywordMaintenanceForm = this.formBuilder.group({
            languageCode001: ['', {updateOn: 'blur', validators: [] }],
            languageCode002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    keydownLangCode001(event : any){
        if(event.key == 'F5'){
            event.preventDefault();
            this.onF5KeyAuthNumber();
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    searchLanguageMasterModel = new SearchModel('languagemasters/lookup',
    LanguageMasterLookUp.LANGUAGE_MASTER_DEFAULT,
    LanguageMasterLookUp.LANGUAGE_MASTER_DEFAULT_ALL,
        []);

    onF5KeyAuthNumber() {
        this.openLookupAuthNoSearchModel();
    }

    openLookupAuthNoSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchLanguageMasterModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getSecWinDescrs();
            this.languageCode001 = res.languageCode
            this.showKeywordMaintenance = true;
            this.isDisabledField = true;
        })
    };

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true },
                    { name: 'Copy', disabled: true },
                    { name: 'Paste', disabled: true },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Language' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' },
                    { name: 'Layer' },
                    { name: 'Cascade' },
                    { name: 'Arrange Icons' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp' },
                    { name: 'Audit Display' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 Keyword Maintenance' },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
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
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createForm();
                    this.showKeywordMaintenance = false;
                    this.isDisabledField = false;
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
                    this.keywordMaintenanceForm.reset();
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
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
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
            case 'Lookup': {
                this.openLookupAuthNoSearchModel();
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


}
