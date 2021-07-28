/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
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
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcctPayUpdateSetup, SecUser, SecWin } from '../../../api-models/index'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { AcctPayUpdateSetupService, DddwDtlService, SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { isThisTypeNode } from 'typescript';
import { Menu } from '../../../shared/models/models';
import {ApHelpComponent} from "../ap-help/ap-help.component";
import {getAccountsPayableSelectionShortcutKeys} from "../../../shared/services/shared.service";

// Use the Component directive to define the AccountsPayableSelectionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountspayableselection',
    templateUrl: './accounts-payable-selection.component.html',

})
export class AccountsPayableSelectionComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountsPayableSelectionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'APSEL';
    public isSuperUser = false;
    public secProgress = true;
    editAcctPayUpdateSetup: boolean;
    acctPayUpdateSetup: AcctPayUpdateSetup;
    acctPayUpdateSetups: AcctPayUpdateSetup[];
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    userTemplateId: string;
    secColDetails: SecColDetail[];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    paybleType: any;
    actionTypes: any;
    statuses: any;
    actions: any;
    public menu: Menu[] = [];
    private dataLoadedMap = new Map<string, boolean>();
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

    createAcctPayUpdateSetup() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.accountsPayableSelectionForm.valid) {
                let acctPayUpdateSetup = new AcctPayUpdateSetup();
                acctPayUpdateSetup.requestUser = Form.getValue(this.accountsPayableSelectionForm, 'requestUser');
                acctPayUpdateSetup.updateUser = Form.getValue(this.accountsPayableSelectionForm, 'date');
                acctPayUpdateSetup.payableType = Form.getValue(this.accountsPayableSelectionForm, 'payableType');
                acctPayUpdateSetup.companyCode = Form.getValue(this.accountsPayableSelectionForm, 'companyCode');
                acctPayUpdateSetup.seqVendId = Form.getValue(this.accountsPayableSelectionForm, 'vendorId');
                acctPayUpdateSetup.fromEnteredDate = Form.getValue(this.accountsPayableSelectionForm, 'fromInsertedDate');
                acctPayUpdateSetup.thruEnteredDate = Form.getValue(this.accountsPayableSelectionForm, 'thruInsertedDate001');
                acctPayUpdateSetup.fromDueDate = Form.getValue(this.accountsPayableSelectionForm, 'fromDueDate001');
                acctPayUpdateSetup.thruReceivedDate = Form.getValue(this.accountsPayableSelectionForm, 'thruInsertedDate002');
                acctPayUpdateSetup.thruDueDate = Form.getValue(this.accountsPayableSelectionForm, 'fromDueDate002');
                acctPayUpdateSetup.requestDate = Form.getValue(this.accountsPayableSelectionForm, 'thruDueDate');
                acctPayUpdateSetup.action = Form.getValue(this.accountsPayableSelectionForm, 'action');
                acctPayUpdateSetup.comments = Form.getValue(this.accountsPayableSelectionForm, 'comments');
                this.acctPayUpdateSetupService.createAcctPayUpdateSetup(acctPayUpdateSetup).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editAcctPayUpdateSetup = false;
                });

            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {

        }
    }


    updateAcctPayUpdateSetup(seqApupdId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.accountsPayableSelectionForm.valid) {
                let acctPayUpdateSetup = new AcctPayUpdateSetup();
                acctPayUpdateSetup.requestUser = Form.getValue(this.accountsPayableSelectionForm, 'requestUser');
                acctPayUpdateSetup.updateUser = Form.getValue(this.accountsPayableSelectionForm, 'date');
                acctPayUpdateSetup.payableType = Form.getValue(this.accountsPayableSelectionForm, 'payableType');
                acctPayUpdateSetup.companyCode = Form.getValue(this.accountsPayableSelectionForm, 'companyCode');
                acctPayUpdateSetup.seqVendId = Form.getValue(this.accountsPayableSelectionForm, 'vendorId');
                acctPayUpdateSetup.fromEnteredDate = Form.getValue(this.accountsPayableSelectionForm, 'fromInsertedDate');
                acctPayUpdateSetup.thruEnteredDate = Form.getValue(this.accountsPayableSelectionForm, 'thruInsertedDate001');
                acctPayUpdateSetup.fromDueDate = Form.getValue(this.accountsPayableSelectionForm, 'fromDueDate001');
                acctPayUpdateSetup.thruReceivedDate = Form.getValue(this.accountsPayableSelectionForm, 'thruInsertedDate002');
                acctPayUpdateSetup.thruDueDate = Form.getValue(this.accountsPayableSelectionForm, 'fromDueDate002');
                acctPayUpdateSetup.requestDate = Form.getValue(this.accountsPayableSelectionForm, 'thruDueDate');
                acctPayUpdateSetup.action = Form.getValue(this.accountsPayableSelectionForm, 'action');
                acctPayUpdateSetup.comments = Form.getValue(this.accountsPayableSelectionForm, 'comments');
                this.acctPayUpdateSetupService.updateAcctPayUpdateSetup(acctPayUpdateSetup, seqApupdId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editAcctPayUpdateSetup = false;
                });
            } else {
                this.alertMessage =
                 this.alertMessageService.error(
                     'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    } saveAcctPayUpdateSetup() {
        if (this.editAcctPayUpdateSetup) {
            this.updateAcctPayUpdateSetup(this.acctPayUpdateSetup.seqApupdId)
        } else {
            this.createAcctPayUpdateSetup();
        }
    } deleteAcctPayUpdateSetup(seqApupdId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.acctPayUpdateSetupService.deleteAcctPayUpdateSetup(seqApupdId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            });
        }
    } getAcctPayUpdateSetup(seqApupdId: number) {
        this.acctPayUpdateSetupService.getAcctPayUpdateSetup(seqApupdId).subscribe(acctPayUpdateSetup => {
            this.acctPayUpdateSetup = acctPayUpdateSetup;
            this.accountsPayableSelectionForm.patchValue({
                'jobId' : this.acctPayUpdateSetup.jobId,
                'requestUser': this.acctPayUpdateSetup.requestUser,
                'date': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.postMonth),
                'payableType': this.acctPayUpdateSetup.payableType,
                'companyCode': this.acctPayUpdateSetup.companyMaster?.companyCode,
                'vendorId': this.acctPayUpdateSetup.vendorMaster?.vendorId,
                'fromInsertedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.fromEnteredDate),
                'thruInsertedDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruEnteredDate),
                'fromDueDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.fromDueDate),
                'thruInsertedDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruReceivedDate),
                'fromDueDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.fromDueDate),
                'thruDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruDueDate),
                'action': this.acctPayUpdateSetup.action,
                'status': this.acctPayUpdateSetup.status,
                'actionType': this.acctPayUpdateSetup.actionType,
                'requestType': this.acctPayUpdateSetup.requestType,
                'comments': this.acctPayUpdateSetup.comments,
            });
        });
    } getAcctPayUpdateSetups() {
        this.acctPayUpdateSetupService.getActiveAcctPayUpdateSetups().subscribe(acctPayUpdateSetups => {
            this.acctPayUpdateSetups = acctPayUpdateSetups;
            this.dataGridGridOptions.api.setRowData(this.acctPayUpdateSetups);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
        });
    }

    gridSelectionChange() {
        let selectedRow = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRow[0]) {
            let seqApupdId = selectedRow[0].seqApupdId;
            this.getAcctPayUpdateSetup(seqApupdId);
        }

    }

    createDataGrid(): void {
        this.dataGridGridOptions =
        {
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
                field: 'companyMaster.companyCode',
                width: 200
            },
            {
                headerName: 'Payable Type',
                field: 'payableType',
                width: 200
            },
            {
                headerName: 'Action Type',
                field: 'actionType',
                width: 200
            },
            {
                headerName: 'Request Type',
                field: 'requestType',
                width: 200
            },
            {
                headerName: 'Status',
                field: 'status',
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
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private dddwDtlService: DddwDtlService,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private acctPayUpdateSetupService: AcctPayUpdateSetupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.dataLoadedMap.set('WINPERMISSION', false);
        this.initializePermission();
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
            // TODO:
            // this.getSecColDetails(user);
            // this.userTemplateId = user.dfltTemplate;
            // this.getSecWin(user.dfltTemplate);
        });
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
            .findByTableNameAndUserId('AUTH_WAIVE_RULES', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
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
                } else {
                    this.showPopUp(
                        'You are not Permitted to view Account Payable Selection',
                        'Account Payable Selection Permission'
                    );
                }
            }
        );
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
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
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableSelectionForm);
        this.createDataGrid();
        this.menuInit();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
            this.getAcctPayUpdateSetups();
            this.getPayableType();
            this.getActionTypes();
            this.getActions();
            this.getStatuses();
        });
        this.dataLoadedMap.set('WINPERMISSION', true);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountsPayableSelectionForm = this.formBuilder.group({
            jobId: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            requestUser: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            date: ['', { updateOn: 'blur', validators: [] }],
            payableType: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            companyCode: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            vendorId: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            fromInsertedDate: ['', { updateOn: 'blur', validators: [] }],
            thruInsertedDate001: ['', { updateOn: 'blur', validators: [] }],
            fromDueDate001: ['', { updateOn: 'blur', validators: [] }],
            thruInsertedDate002: ['', { updateOn: 'blur', validators: [] }],
            fromDueDate002: ['', { updateOn: 'blur', validators: [] }],
            thruDueDate: ['', { updateOn: 'blur', validators: [] }],
            action: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            status: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            actionType: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            radiobuttongroup2776: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            requestType:  [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }],
            comments: [{value: '', disabled: true}, { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getPayableType() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'payable_type',
            'dw_apsel_setup_de'
        ).subscribe(
            (code) => {
                this.paybleType = code;
            }
        );
    }

    getActions() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'action' ,
            'dw_apsel_setup_de'
        ).subscribe(
            (code) => {
                this.actions = code;
            }
        );
    }

    getActionTypes() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'action_type' ,
            'dw_apsel_setup_de'
        ).subscribe(
            (code) => {
                this.actionTypes = code;
            }
        );
    }

    getStatuses() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'status' ,
            'dw_apsel_setup_de'
        ).subscribe(
            (code) => {
                this.statuses = code;
            }
        );
    }

    public get isDataLoaded(): boolean {
        // @ts-ignore
        for (let [key, value] of this.dataLoadedMap) {
            if (!value) {
                return value;
            }
        }
        return true;
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'New from Template'},
                    {name: 'Save As Template'},
                    {name: 'Run Job'},
                    {name: 'Close'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true}, {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true}, {name: 'Paste', disabled: true}, {isHorizontal: true},
                    {name: 'Next'}, {name: 'Previous'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
                    {isHorizontal: true}, {name: 'Show Timestamp'}, {name: 'Processing Messages'}, {isHorizontal: true},
                    {name: '1 Main Menu'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    modalClose() {
        this.activeModal.close();
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAccountsPayableSelectionShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/APSEL_Select_Accounts_Payable_F1_Map.htm';
        viewModal.componentInstance.showIcon = true;
    }

}
