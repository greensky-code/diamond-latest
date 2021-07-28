/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtl, SecUser, SecWin, SystemParameter} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {MessageMasterDtlService, SecUserService, SystemParameterService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Form} from '../../../shared/helpers/form.helper';
import {PARAMETER_MODULE_ID} from '../../../shared/app-constants';
import {Menu} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {getParameterShortcutKeys, getProviderIncentiveRuleShortcutKeys} from '../../../shared/services/shared.service';
import {ShortcutInput} from 'ng-keyboard-shortcuts';

// Use the Component directive to define the ParameterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'parameter',
    templateUrl: './parameter.component.html',
})
export class ParameterComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    parameterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editSystemParameter: boolean;
    systemParameter: SystemParameter;
    systemParameters: SystemParameter[];
    public dataGridGridOptions: GridOptions;
    private windowId = 'PARAM';
    secModuleId = PARAMETER_MODULE_ID;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    public menu: Menu[] = [];
    public selectedRowIndex = null;

    @Input() showIcon?: boolean;
    public shortcuts: ShortcutInput[] = [];
    userTemplateId = '';
    secColDetails = new Array<SecColDetail>();
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private cdr: ChangeDetectorRef,
        private systemParameterService: SystemParameterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        /*this.formValidation = new FormValidation(this.parameterForm);
        this.initializePermission();*/

        this.secProgress = false;
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.parameterForm);
        this.createDataGrid();
        this.getSystemParameters();
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
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createSystemParameter() {
        // if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.parameterForm.valid) {
                let systemParameter = new SystemParameter();
                systemParameter.parameterId = Form.getValue(this.parameterForm, 'parameterId');
                systemParameter.parameter1 = Form.getValue(this.parameterForm, 'parameter1');
                systemParameter.parameter2 = Form.getValue(this.parameterForm, 'parameter2');
                systemParameter.parameter3 = Form.getValue(this.parameterForm, 'parameter3');
                systemParameter.description = Form.getValue(this.parameterForm, 'description');
                this.systemParameterService.createSystemParameter(systemParameter).subscribe(response => {
                    this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                    this.editSystemParameter = true;
                    this.systemParameter = response;
                    this.getSystemParameters();
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        /*} else {

        }*/
    }

    updateSystemParameter(parameterId: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.parameterForm.valid) {
                let systemParameter = new SystemParameter();
                systemParameter.parameterId = Form.getValue(this.parameterForm, 'parameterId');
                systemParameter.parameter1 = Form.getValue(this.parameterForm, 'parameter1');
                systemParameter.parameter2 = Form.getValue(this.parameterForm, 'parameter2');
                systemParameter.parameter3 = Form.getValue(this.parameterForm, 'parameter3');
                systemParameter.description = Form.getValue(this.parameterForm, 'description');
                this.systemParameterService.updateSystemParameter(systemParameter, parameterId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                    this.editSystemParameter = true;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.isFormDataChangeStatus = false;
                    }
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        /*} else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }*/
    }

    saveSystemParameter() {
        if (this.editSystemParameter) {
            this.updateSystemParameter(this.systemParameter.parameterId)
        } else {
            this.createSystemParameter();
        }
    }

    deleteSystemParameter(parameterId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemParameterService.deleteSystemParameter(parameterId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getSystemParameter(parameterId: string) {
        this.systemParameterService.getSystemParameter(parameterId).subscribe(systemParameter => {
            this.systemParameter = systemParameter;
            this.parameterForm.patchValue({
                'parameterId': this.systemParameter.parameterId,
                'parameter1': this.systemParameter.parameter1,
                'parameter2': this.systemParameter.parameter2,
                'parameter3': this.systemParameter.parameter3,
                'description': this.systemParameter.description,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getSystemParameters() {
        this.systemParameterService.getSystemParameters().subscribe(systemParameters => {
            this.systemParameters = systemParameters;
            this.systemParameters = (this.systemParameters && this.systemParameters.length > 0) ? this.systemParameters : [];
            this.dataGridGridOptions.api.setRowData(this.systemParameters);
            if (this.systemParameters && this.systemParameters.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

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
                headerName: 'Parameter ID',
                field: 'parameterId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 500
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

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('SYSTEM_PARAMETER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            }
        );
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.parameterForm = this.formBuilder.group({
            parameterId: ['', {validators: [Validators.required]}],
            parameter1: ['', {validators: [Validators.maxLength(60)]}],
            parameter2: ['', {validators: [Validators.maxLength(60)]}],
            parameter3: ['', {validators: [Validators.maxLength(64)]}],
            description: ['', {validators: [Validators.maxLength(1500)]}]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

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
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.parameterForm);
        this.createDataGrid();
        this.getSystemParameters();
    }


    ngAfterViewInit(): void {
        this.shortcuts.push(...getParameterShortcutKeys(this));
        this.cdr.detectChanges();
    }

    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey : 'Ctrl+M' }, { name: 'Open', shortcutKey : 'Ctrl+O' },
                    { name: 'Delete', shortcutKey : 'Ctrl+D' }, { name: 'Save' , shortcutKey : 'Ctrl+S'},
                    { name: 'Close' , shortcutKey : 'Ctrl+F4' },
                    { isHorizontal: true }, { name: 'Main Menu...' , shortcutKey : 'F2'},
                    { name: 'Shortcut Menu...' , shortcutKey : 'F3' },
                    { isHorizontal: true }, { name: 'Print', disabled: true },
                    { isHorizontal: true }, { name: 'Exit' , shortcutKey : 'Alt+F4'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes' , disabled : true , shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' , shortcutKey: 'Shift+Alt+T' }, { name: 'Layer', shortcutKey : 'Shift+Alt+L' },
                    { name: 'Cascade' , shortcutKey : 'Shift+Alt+C'}, { name: 'Arrange Icons', shortcutKey : 'Shift+Alt+I' },
                    { isHorizontal: true }, { name: 'Show Timestamp' , shortcutKey : 'Shift+Alt+S'}, { name: 'Audit Display' ,
                        shortcutKey : 'Shift+Alt+A'}, { isHorizontal: true }, { name: '1 Main Menu' }, { name: '2 Parameter' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window' , shortcutKey: 'F1'},
                    { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }];
    }

    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.dataGridGridOptions.api.deselectAll();
                    this.systemParameter = null;
                    this.selectedRowIndex = null;
                    this.editSystemParameter = false;
                    this.parameterForm.reset();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveSystemParameter();
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu': {
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
        } else {
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        }
    }

    GridSelectionChange(event: any) {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            this.selectedRowIndex = event.rowIndex;
            this.editSystemParameter = true;
            this.systemParameter = selectedRows[0];
            this.parameterForm.patchValue(this.systemParameter, {emitEvent: false});
            setTimeout(() => {
                this.isFormDataModified();
            }, 2000)
        } else {
            this.editSystemParameter = false;
            this.parameterForm.reset();
        }
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Parameter')
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
                    this.saveSystemParameter()
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
        this.parameterForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
