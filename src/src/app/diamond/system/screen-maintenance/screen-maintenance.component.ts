/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {NavgrpKw, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {ToastService} from '../../../shared/services/toast.service';
import {SCREEN_MAINTENANCE} from '../../../shared/app-constants';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Menu, SearchModel} from '../../../shared/models/models';
import {ObjectToken} from '../../../api-models/system/object-token.model';
import {Form} from '../../../shared/helpers/form.helper';
import {ObjectTokenService} from '../../../api-services/system/object-token.service';
import {SecUserService} from '../../../api-services';
import {DatePipe} from '@angular/common';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ScreenMaintenanceLookup} from '../../../shared/lookup/screen-maintenance-lookup';

// Use the Component directive to define the ScreenMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'screenmaintenance',
    templateUrl: './screen-maintenance.component.html',
    providers: [
        ObjectTokenService,
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,

    ]
})
export class ScreenMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    screenMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = SCREEN_MAINTENANCE;
    public menu: Menu[] = [];
    editObjectToken: boolean;
    objectToken: ObjectToken;
    objectTokens: ObjectToken[];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    searchModel = new SearchModel(
        'objecttokens/lookup',
        ScreenMaintenanceLookup.SCREEN_MAINTENANCE_ALL,
        ScreenMaintenanceLookup.SCREEN_MAINTENANCE_DEFAULT,
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
        private modalService: NgbModal,
        private securityService: SecurityService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private toastService: ToastService,
        private objectTokenService: ObjectTokenService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.screenMaintenanceForm);
        this.createDataGrid();
        this.menuInit();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        }, 100);
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

    onLookupFieldChange(event, keyword) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getObjectTokenByKeyword(keyword);
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getObjectTokenByKeyword(res.KEYWORD);
            this.screenMaintenanceForm.patchValue({
                'keyWord': res.KEYWORD,
                'languageCode': 'AMERI'
            });
            this.popUpMessage = null;
        });
    }

    createObjectToken() {
        this.formValidation.validateForm();
        if (this.screenMaintenanceForm.valid) {
            let objectToken = new ObjectToken();
            objectToken.keyword = Form.getValue(this.screenMaintenanceForm, 'keyWord');
            objectToken.languageId = Form.getValue(this.screenMaintenanceForm, 'languageCodeLbCont');
            this.objectTokenService.createObjectToken(objectToken).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editObjectToken = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateObjectToken(controlType: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.screenMaintenanceForm.valid) {
                let objectToken = new ObjectToken();
                objectToken.keyword = Form.getValue(this.screenMaintenanceForm, 'keyWord');
                objectToken.languageId = Form.getValue(this.screenMaintenanceForm, 'languageCodeLbCont');
                this.objectTokenService.updateObjectToken(objectToken, controlType).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editObjectToken = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveObjectToken() {
        if (this.editObjectToken) {
            this.updateObjectToken(this.objectToken.controlType)
        } else {
            this.createObjectToken();
        }
    }

    deleteObjectToken(controlType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.objectTokenService.deleteObjectToken(controlType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getObjectToken(controlType: string) {
        this.objectTokenService.getObjectToken(controlType).subscribe(objectToken => {
            this.objectToken = objectToken;
            this.screenMaintenanceForm.patchValue({
                'keyWord': this.objectToken.keyword,
                'languageCodeLbCont': this.objectToken.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getObjectTokenByKeyword(keyword: string) {
        this.objectTokenService.getObjectTokenByKeyword(keyword).subscribe(objectTokens => {
            this.objectTokens = objectTokens;
            this.screenMaintenanceForm.patchValue({
                'languageCode': 'AMERI'
            });
            this.dataGridGridOptions.api.setRowData(objectTokens);
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getObjectTokens() {
        this.objectTokenService.getObjectTokens().subscribe(objectTokens => {
            this.objectTokens = objectTokens;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Control Text',
                field: 'controlText',
                width: 400,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Control Type',
                field: 'objectTokenPrimaryKey.controlType',
                width: 250,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const controlType = params.data.objectTokenPrimaryKey.controlType;
                        if (controlType === 'C') {
                            return 'Microhelp'
                        } else if (controlType === 'L') {
                            return 'Literal'
                        } else {
                            return controlType;
                        }
                    }
                }
            },
            {
                headerName: 'Max Length',
                field: 'maxLen',
                width: 250
            }
        ];
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
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Close': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
            // this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Window') {
            // handle special-Menu Actions
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'Open'},
                    {name: 'Save'},
                    {name: 'Close'},
                    {name: '-'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste', disabled: true},
                    {isHorizontal: true}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Audit Trail Maintenance', disabled: true},
                    {name: 'Audit Purge Rule', disabled: true},
                    {name: 'Audit Trail Display', disabled: true},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Ctrl + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Ctrl + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Ctrl + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S'},
                    {name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A'}, {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 GL Assignment'}]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window'},
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

    private handleTopicMenu(action: string) {
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

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.screenMaintenanceForm = this.formBuilder.group({
            keyWord: ['', {updateOn: 'blur', validators: []}],
            languageCode: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
