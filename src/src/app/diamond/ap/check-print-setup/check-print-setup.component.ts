/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {CHECK_PRINT_SETUP} from '../../../shared/app-constants';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Menu} from '../../../shared/models/models';
import {Form} from '../../../shared/helpers/form.helper';
import {CompanyMasterService, DddwDtlService, SecUserService} from '../../../api-services';
import {DatePipe} from '@angular/common';
import {CheckPrintSetup} from '../../../api-models/addon/check-print-setup.model';
import {CheckPrintSetupService} from '../../../api-services/addon/check-print-setup.service';
import {
    CONSTANTS,
    getBankAccountShortcuts,
    getCheckPrintSetupShortcutKeys
} from '../../../shared/services/shared.service';
import {ApHelpComponent} from "../ap-help/ap-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";

// Use the Component directive to define the CheckPrintSetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'checkprintsetup',
    templateUrl: './check-print-setup.component.html',
    providers: [
        CheckPrintSetupService,
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe
    ]
})
export class CheckPrintSetupComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    checkPrintSetupForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'CKPRT';
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = CHECK_PRINT_SETUP;
    public menu: Menu[] = [];
    public isSuperUser = false;
    public secProgress = true;
    editCheckPrintSetup: boolean;
    checkPrintSetup: CheckPrintSetup;
    checkPrintSetups: CheckPrintSetup[];
    userTemplateId: string;
    public dataGridGridOptions: GridOptions;

    paybleTypes: any[] = [];
    companyCodes: any[] = [];
    checkModes: any[] = [];
    calcAdminFees: any[] = [];
    actions: any[] = [];
    requestTypes: any[] = [];
    statuses: any[] = [];

    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public shortcuts: ShortcutInput[] = [];
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
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private dddwDtlService: DddwDtlService,
        private companyMasterService: CompanyMasterService,
        private cdr: ChangeDetectorRef,
        private checkPrintSetupService: CheckPrintSetupService) {
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
        this.formValidation = new FormValidation(this.checkPrintSetupForm);
        this.createDataGrid();
        this.menuInit();
        this.getCheckPrintSetups();
        this.getPaybleType();
        this.getCalcAdminFees();
        this.getCheckModes();
        this.getActions();
        this.getStatuses();
        this.getRequestTypes();
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

    createCheckPrintSetup() {
        this.formValidation.validateForm();
        if (this.checkPrintSetupForm.valid) {
            let checkPrintSetup = new CheckPrintSetup();
            checkPrintSetup.requestUser = Form.getValue(this.checkPrintSetupForm, 'requestUser');
            checkPrintSetup.checkDate = Form.getValue(this.checkPrintSetupForm, 'date');
            checkPrintSetup.payableType = Form.getValue(this.checkPrintSetupForm, 'payableType');
            checkPrintSetup.checkAmt = Form.getValue(this.checkPrintSetupForm, 'checkeftMode');
            checkPrintSetup.adminFeeInd = Form.getValue(this.checkPrintSetupForm, 'calcAdminFee');
            checkPrintSetup.companyCode = Form.getValue(this.checkPrintSetupForm, 'companyCode');
            checkPrintSetup.bankAccountCode = Form.getValue(this.checkPrintSetupForm, 'bankAcct');
            checkPrintSetup.minCheckOverride = Form.getValue(this.checkPrintSetupForm, 'minimumOverrise');
            checkPrintSetup.checkNotes = Form.getValue(this.checkPrintSetupForm, 'startCheckNo');
            checkPrintSetup.requestDate = Form.getValue(this.checkPrintSetupForm, 'checkeftDate');
            checkPrintSetup.seqVendId = Form.getValue(this.checkPrintSetupForm, 'vendorId');
            checkPrintSetup.seqVendAddress = Form.getValue(this.checkPrintSetupForm, 'vendorAddr');
            checkPrintSetup.fromPostDate = Form.getValue(this.checkPrintSetupForm, 'fromPostDate');
            checkPrintSetup.thruPostDate = Form.getValue(this.checkPrintSetupForm, 'thryPostDate');
            checkPrintSetup.seqProvId = Form.getValue(this.checkPrintSetupForm, 'providerId');
            checkPrintSetup.fromDueDate = Form.getValue(this.checkPrintSetupForm, 'fromDueDate');
            checkPrintSetup.thruDueDate = Form.getValue(this.checkPrintSetupForm, 'thruDueDate');
            checkPrintSetup.seqMembId = Form.getValue(this.checkPrintSetupForm, 'memberId');
            checkPrintSetup.postMonth = Form.getValue(this.checkPrintSetupForm, 'postMonth');
            checkPrintSetup.comments = Form.getValue(this.checkPrintSetupForm, 'comments');
            checkPrintSetup.daemonRequest = Form.getValue(this.checkPrintSetupForm, 'reprintRequest');
            checkPrintSetup.checkNumber = Form.getValue(this.checkPrintSetupForm, 'checkNotes');
            this.checkPrintSetupService.createCheckPrintSetup(checkPrintSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editCheckPrintSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateCheckPrintSetup(seqCkprtId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.checkPrintSetupForm.valid) {
                let checkPrintSetup = new CheckPrintSetup();
                checkPrintSetup.requestUser = Form.getValue(this.checkPrintSetupForm, 'requestUser');
                checkPrintSetup.checkDate = Form.getValue(this.checkPrintSetupForm, 'date');
                checkPrintSetup.payableType = Form.getValue(this.checkPrintSetupForm, 'payableType');
                checkPrintSetup.checkAmt = Form.getValue(this.checkPrintSetupForm, 'checkeftMode');
                checkPrintSetup.adminFeeInd = Form.getValue(this.checkPrintSetupForm, 'calcAdminFee');
                checkPrintSetup.companyCode = Form.getValue(this.checkPrintSetupForm, 'companyCode');
                checkPrintSetup.bankAccountCode = Form.getValue(this.checkPrintSetupForm, 'bankAcct');
                checkPrintSetup.minCheckOverride = Form.getValue(this.checkPrintSetupForm, 'minimumOverrise');
                checkPrintSetup.checkNotes = Form.getValue(this.checkPrintSetupForm, 'startCheckNo');
                checkPrintSetup.requestDate = Form.getValue(this.checkPrintSetupForm, 'checkeftDate');
                checkPrintSetup.seqVendId = Form.getValue(this.checkPrintSetupForm, 'vendorId');
                checkPrintSetup.seqVendAddress = Form.getValue(this.checkPrintSetupForm, 'vendorAddr');
                checkPrintSetup.fromPostDate = Form.getValue(this.checkPrintSetupForm, 'fromPostDate');
                checkPrintSetup.thruPostDate = Form.getValue(this.checkPrintSetupForm, 'thryPostDate');
                checkPrintSetup.seqProvId = Form.getValue(this.checkPrintSetupForm, 'providerId');
                checkPrintSetup.fromDueDate = Form.getValue(this.checkPrintSetupForm, 'fromDueDate');
                checkPrintSetup.thruDueDate = Form.getValue(this.checkPrintSetupForm, 'thruDueDate');
                checkPrintSetup.seqMembId = Form.getValue(this.checkPrintSetupForm, 'memberId');
                checkPrintSetup.postMonth = Form.getValue(this.checkPrintSetupForm, 'postMonth');
                checkPrintSetup.comments = Form.getValue(this.checkPrintSetupForm, 'comments');
                checkPrintSetup.daemonRequest = Form.getValue(this.checkPrintSetupForm, 'reprintRequest');
                checkPrintSetup.checkNumber = Form.getValue(this.checkPrintSetupForm, 'checkNotes');
                this.checkPrintSetupService.updateCheckPrintSetup(checkPrintSetup, seqCkprtId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editCheckPrintSetup = false;
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

    saveCheckPrintSetup() {
        if (this.editCheckPrintSetup) {
            this.updateCheckPrintSetup(this.checkPrintSetup.seqCkprtId)
        } else {
            this.createCheckPrintSetup();
        }
    }

    deleteCheckPrintSetup(seqCkprtId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.checkPrintSetupService.deleteCheckPrintSetup(seqCkprtId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getCheckPrintSetup(checkPrintSetup: CheckPrintSetup) {
        this.checkPrintSetup = checkPrintSetup;

        const paybleType = this.paybleTypes.find(m => m.dddwDtlPrimaryKey.dataVal === checkPrintSetup.payableType);          // will give you object of dropdown value
        const checkMode = this.checkModes.find(m => m.dddwDtlPrimaryKey.dataVal === checkPrintSetup.autoManualFlag);          // will give you object of dropdown value
        const calcAdminFees = this.checkModes.find(m => m.dddwDtlPrimaryKey.dataVal === checkPrintSetup.adminFeeInd);          // will give you object of dropdown value
        const status = this.statuses.find(m => m.dddwDtlPrimaryKey.dataVal === checkPrintSetup.status);          // will give you object of dropdown value

        this.checkPrintSetupForm.patchValue({
            'jobId': checkPrintSetup.jobId,
            'requestUser': checkPrintSetup.requestUser,
            'date': checkPrintSetup.checkDate,
            'payableType': paybleType ? paybleType.dddwDtlPrimaryKey.displayVal : '',
            'checkeftMode': checkMode ? checkMode.dddwDtlPrimaryKey.displayVal : '',
            'calcAdminFee': calcAdminFees ? calcAdminFees.dddwDtlPrimaryKey.displayVal : '',
            'companyCode': checkPrintSetup.companyCode,
            'bankAcct': checkPrintSetup.bankAccountCode,
            'minimumOverrise': checkPrintSetup.minCheckOverride === 'Y' ? true : false,
            // 'vendorMinimum': checkPrintSetup.vendorMaster.,
            // 'subdepMinimum': checkPrintSetup.s,
            'startCheckNo': checkPrintSetup.checkNumber,
            'checkeftAmt': checkPrintSetup.checkAmt,
            'checkeftDate': checkPrintSetup.checkDate,
            'vendorId': checkPrintSetup.vendorMaster.vendorId,
            'vendorAddr': checkPrintSetup.vendorAddress.addressLine1,
            'fromPostDate': checkPrintSetup.fromPostDate,
            'thryPostDate': checkPrintSetup.thruPostDate,
            'providerId': checkPrintSetup.provMaster.providerId,
            'fromDueDate': checkPrintSetup.fromDueDate,
            'thruDueDate': checkPrintSetup.thruDueDate,
            'memberId': checkPrintSetup.memberMaster.subscriberId,
            'personNo': checkPrintSetup.memberMaster.personNumber,
            'postMonth': checkPrintSetup.postMonth,
            'comments': checkPrintSetup.comments,
            'reprintRequest': checkPrintSetup.daemonRequest,
            'checkNotes': checkPrintSetup.checkNotes,
            'status': status ? status.dddwDtlPrimaryKey.displayVal : ''
        });
        if (this.actions.length) {
            let findElement = this.actions[this.actions.findIndex((element) => element.dddwDtlPrimaryKey.dataVal === checkPrintSetup.action)];
            if (findElement) {
                let value = findElement.dddwDtlPrimaryKey.displayVal.toLowerCase();
                //added .controls to assign value to dynamiclly fields
                this.checkPrintSetupForm.controls[value].setValue(value);
            }
        }
        if (checkPrintSetup.requestType === 'I') {
            this.checkPrintSetupForm.patchValue({immediate001: checkPrintSetup.requestType});
        }
        if (checkPrintSetup.requestType === 'D') {
            this.checkPrintSetupForm.patchValue({deferred001: checkPrintSetup.requestType});
        }
    }

    onRowSelectedGrid(event) {
        if (!event.node.selected) {
            return;
        }
        this.getCheckPrintSetup(event.data);
    }

    getCheckPrintSetups() {
        this.checkPrintSetupService.getCheckPrintSetups().subscribe(checkPrintSetups => {
            this.checkPrintSetups = checkPrintSetups;
            this.dataGridGridOptions.api.setRowData(checkPrintSetups);
            if (checkPrintSetups.length > 0) {
                this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getPaybleType() {
        this.dddwDtlService.findByColumnNameAndDwname('payable_type', 'dw_ckprt_setup_de')
            .subscribe(
                (results) => {
                    this.paybleTypes = results;
                }
            );
    }

    getCompanyCodes() {
        this.companyMasterService.getCompanyMasters()
            .subscribe(
                (results) => {
                    this.companyCodes = results;
                }
            );
    }

    getCheckModes() {
        this.dddwDtlService.findByColumnNameAndDwname('auto_manual_flag', 'dw_ckprt_setup_de')
            .subscribe(
                (results) => {
                    this.checkModes = results;
                }
            );
    }

    getCalcAdminFees() {
        this.dddwDtlService.findByColumnNameAndDwname('admin_fee_ind', 'dw_ckprt_setup_de')
            .subscribe(
                (results) => {
                    this.calcAdminFees = results;
                }
            );
    }

    getActions() {
        this.dddwDtlService.findByColumnNameAndDwname('action', 'dw_ckprt_setup_pick')
            .subscribe(
                (results) => {
                    this.actions = results;
                }
            );
    }

    getRequestTypes() {
        this.dddwDtlService.findByColumnNameAndDwname('request_type', 'dw_ckprt_setup_pick')
            .subscribe(
                (results) => {
                    this.requestTypes = results;
                }
            );
    }

    getStatuses() {
        this.dddwDtlService.findByColumnNameAndDwname('status', 'dw_ckprt_setup_pick')
            .subscribe(
                (results) => {
                    this.statuses = results;
                }
            );
    }


    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Job Id',
                field: 'jobId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Company',
                field: 'companyCode',
                width: 200
            },
            {
                headerName: 'Payable Type',
                field: 'payableType',
                width: 200,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const payableType = params.data.payableType;
                        const payableTypeNew = this.paybleTypes.find(m => m.dddwDtlPrimaryKey.dataVal === payableType);  // will give you object of dropdown value
                        return payableTypeNew ? payableTypeNew.dddwDtlPrimaryKey.displayVal : ''
                    }
                }
            },
            {
                headerName: 'Action',
                field: 'action',
                width: 200,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const action = params.data.action;
                        const actionsNew = this.actions.find(m => m.dddwDtlPrimaryKey.dataVal === action);  // will give you object of dropdown value
                        return actionsNew ? actionsNew.dddwDtlPrimaryKey.displayVal : ''
                    }
                }
            },
            {
                headerName: 'Request Type',
                field: 'requestType',
                width: 200,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const requestType = params.data.requestType;
                        const requestTypeNew = this.requestTypes.find(m => m.dddwDtlPrimaryKey.dataVal === requestType);  // will give you object of dropdown value
                        return requestTypeNew ? requestTypeNew.dddwDtlPrimaryKey.displayVal : ''
                    }
                }
            },
            {
                headerName: 'Status',
                field: 'status',
                width: 200,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const status = params.data.status;
                        const statusesNew = this.statuses.find(m => m.dddwDtlPrimaryKey.dataVal === status);  // will give you object of dropdown value
                        return statusesNew ? statusesNew.dddwDtlPrimaryKey.displayVal : ''
                    }
                }
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
        } else if (event.menu.menuItem === "Help") {
            this.helpScreen();
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
                    {isHorizontal: true},
                    {name: 'Next'},
                    {name: 'Previous'},
                    {name: 'Lookup'},
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
        this.checkPrintSetupForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: []}],
            requestUser: ['', {updateOn: 'blur', validators: []}],
            date: ['', {updateOn: 'blur', validators: []}],
            payableType: ['', {updateOn: 'blur', validators: []}],
            checkeftMode: ['', {updateOn: 'blur', validators: []}],
            calcAdminFee: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            bankAcct: ['', {updateOn: 'blur', validators: []}],
            vendorMinimum: ['', {updateOn: 'blur', validators: []}],
            subdepMinimum: ['', {updateOn: 'blur', validators: []}],
            minimumOverrise: ['', {updateOn: 'blur', validators: []}],
            startCheckNo: ['', {updateOn: 'blur', validators: []}],
            checkeftDate: ['', {updateOn: 'blur', validators: []}],
            checkeftAmt: ['', {updateOn: 'blur', validators: []}],
            vendorId: ['', {updateOn: 'blur', validators: []}],
            vendorAddr: ['', {updateOn: 'blur', validators: []}],
            fromPostDate: ['', {updateOn: 'blur', validators: []}],
            thryPostDate: ['', {updateOn: 'blur', validators: []}],
            providerId: ['', {updateOn: 'blur', validators: []}],
            fromDueDate: ['', {updateOn: 'blur', validators: []}],
            thruDueDate: ['', {updateOn: 'blur', validators: []}],
            memberId: ['', {updateOn: 'blur', validators: []}],
            postMonth: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}],
            calc: ['', {updateOn: 'blur', validators: []}],
            print: ['', {updateOn: 'blur', validators: []}],
            cancel: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}],
            personNo: ['', {updateOn: 'blur', validators: []}],
            immediate001: ['', {updateOn: 'blur', validators: []}],
            deferred001: ['', {updateOn: 'blur', validators: []}],
            radiobuttongroup1407: ['', {updateOn: 'blur', validators: []}],
            reprintRequest: ['', {updateOn: 'blur', validators: []}],
            checkNotes: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCheckPrintSetupShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/CKPRT_Check_Print.htm';
        viewModal.componentInstance.showIcon = true;
    }

}
