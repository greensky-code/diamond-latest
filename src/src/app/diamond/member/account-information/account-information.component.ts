/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { DddwDtlService, PmbCustFinAcctsService, SystemCodesService } from '../../../api-services';
import { GroupMaster, PmbCustFinAccts, SystemCodes } from '../../../api-models';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SharedModule } from '../../../shared/shared.module';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { DEFAULT_LANGUAGE, SYSTEM_CODE_ACCT_INF_TYPE, SYSTEM_CODE_COPAY_LIB } from '../../../shared/models/constants';
import { NgbToastType } from 'ngb-toast';
import { CONSTANTS } from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';

// Use the Component directive to define the AccountInformationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountinformation',
    templateUrl: './account-information.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        PmbCustFinAcctsService
    ],

})
export class AccountInformationComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountInformationForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    editPmbCustFinAccts: boolean;
    pmbCustFinAccts: PmbCustFinAccts;
    pmbCustFinAcctss: PmbCustFinAccts[];
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    secColDetails = new Array<SecColDetail>();
    @Input() showIcon = false;
    @Input() groupMaster: GroupMaster;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    accountTypes: SystemCodes[];
    acctUses: any;
    acctStatuses: any;

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


    createPmbCustFinAccts() {
        // if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.accountInformationForm.valid) {
                let pmbCustFinAccts = new PmbCustFinAccts();
                pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
                pmbCustFinAccts.effectiveToDate = Form.getDatePickerValue(this.accountInformationForm, 'effDate');
                pmbCustFinAccts.ccExpireDate = Form.getDatePickerValue(this.accountInformationForm, 'expDate');
                pmbCustFinAccts.customerId = this.groupMaster.groupId;
                pmbCustFinAccts.customerType = this.groupMaster.groupType;
                pmbCustFinAccts.acctType = Form.getValue(this.accountInformationForm, 'type');
                pmbCustFinAccts.acctUse = Form.getValue(this.accountInformationForm, 'use');
                pmbCustFinAccts.acctStatus = Form.getValue(this.accountInformationForm, 'status');
                pmbCustFinAccts.routingNo = Form.getValue(this.accountInformationForm, 'routingNumber');
                this.pmbCustFinAcctsService.createPmbCustFinAccts(pmbCustFinAccts).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editPmbCustFinAccts = false;
                    this.getPmbCustFinAcctsByCustIdAndType();
                });

            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        // } else {

        // }
    }


    updatePmbCustFinAccts() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.accountInformationForm.valid) {
                let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
                let pmbCustFinAccts = selectedRows[0];
                // pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
                // pmbCustFinAccts.effectiveToDate = Form.getDatePickerValue(this.accountInformationForm, 'effDate');
                // pmbCustFinAccts.ccExpireDate = Form.getDatePickerValue(this.accountInformationForm, 'expDate');
                pmbCustFinAccts.customerId = this.groupMaster.groupId;
                pmbCustFinAccts.customerType = this.groupMaster.groupType;
                pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
                // pmbCustFinAccts.acctUse = Form.getValue(this.accountInformationForm, 'use');
                // pmbCustFinAccts.routingNo = Form.getValue(this.accountInformationForm, 'routingNumber');
                pmbCustFinAccts.acctStatus = Form.getValue(this.accountInformationForm, 'status');
                this.pmbCustFinAcctsService.updatePmbCustFinAccts(pmbCustFinAccts).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                        this.editPmbCustFinAccts = false;
                        this.getPmbCustFinAcctsByCustIdAndType();
                    });
            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        // } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
    } savePmbCustFinAccts() {
        if (this.editPmbCustFinAccts) {
            this.updatePmbCustFinAccts()
        } else {
            this.createPmbCustFinAccts();
        }
    }
    deletePmbCustFinAccts() {

        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        let pmbCustFinAccts = selectedRows[0];
        if (pmbCustFinAccts) {
            pmbCustFinAccts.customerId = this.groupMaster.groupId;
            pmbCustFinAccts.customerType = this.groupMaster.groupType;
            pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
            this.pmbCustFinAcctsService.deletePmbCustFinAccts(pmbCustFinAccts).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
                this.getPmbCustFinAcctsByCustIdAndType();
            });
        }
    }
     getPmbCustFinAccts(customerType: string) {
        this.pmbCustFinAcctsService.getPmbCustFinAccts(customerType).subscribe(pmbCustFinAccts => {
            this.pmbCustFinAccts = pmbCustFinAccts;
            this.accountInformationForm.patchValue({
                'accountNo': this.pmbCustFinAccts.acctNo,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbCustFinAccts.effectiveToDate),
                'expDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbCustFinAccts.ccExpireDate),
                'use': this.pmbCustFinAccts.customerId,
            });
        });
    } getPmbCustFinAcctss() {
        this.pmbCustFinAcctsService.getPmbCustFinAcctss().subscribe(pmbCustFinAcctss => {
            this.pmbCustFinAcctss = pmbCustFinAcctss;
        });
    }


    getPmbCustFinAcctsByCustIdAndType() {
        this.pmbCustFinAcctsService.getPmbCustFinAcctsByCustIdAndType(this.groupMaster.groupId, this.groupMaster.groupType).subscribe(
            pmbCustFinAcctss => {
                this.pmbCustFinAcctss = pmbCustFinAcctss;
                this.updateTextForGridDisplay(this.pmbCustFinAcctss);
                this.dataGridGridOptions.api.setRowData(this.pmbCustFinAcctss);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.gridSelectionChange();
            });
    }
    updateTextForGridDisplay(pmbCustFinAcctss: PmbCustFinAccts[]) {
        pmbCustFinAcctss.forEach(p => {
            let type = this.acctUses.filter(data => data.dddwDtlPrimaryKey.dataVal === p.acctUse);
            p.acctUseTxt = type[0].dddwDtlPrimaryKey.displayVal;
            let status = this.acctStatuses.filter(data => data.dddwDtlPrimaryKey.dataVal === p.acctStatus);
            p.acctStatusTxt = p.acctStatus ? status[0].dddwDtlPrimaryKey.displayVal : null;
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
                headerName: 'Account No',
                field: 'pmbCustFinAcctsPrimaryKey.acctNo',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Type',
                field: 'acctType',
                width: 200
            },
            {
                headerName: 'Routing Number',
                field: 'routingNo',
                width: 200
            },
            {
                headerName: 'Eff. Date',
                field: 'pmbCustFinAcctsPrimaryKey.effectiveFromDate',
                width: 200
            },
            {
                headerName: 'Exp. Date',
                field: 'ccExpireDate',
                width: 200
            },
            {
                headerName: 'Use',
                field: 'acctUseTxt',
                width: 200
            },
            {
                headerName: 'Status',
                field: 'acctStatusTxt',
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private pmbCustFinAcctsService: PmbCustFinAcctsService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        // this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountInformationForm);
        this.createDataGrid();
        this.getAcctUses();
        this.getAcctStatus();
        setTimeout(() => {
            this.getPmbCustFinAcctsByCustIdAndType();
            this.getAccountTypes();
        }, 2000);
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
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountInformationForm);
        this.createDataGrid();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountInformationForm = this.formBuilder.group({
            accountNo: ['', { updateOn: 'blur', validators: [Validators.required] }],
            effDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            type: ['', { updateOn: 'blur', validators: [] }],
            expDate: ['', { updateOn: 'blur', validators: [] }],
            use: ['', { updateOn: 'blur', validators: [Validators.required] }],
            status: ['', { updateOn: 'blur', validators: [] }],
            routingNumber: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    save() {
        this.savePmbCustFinAccts();
    }

    add() {
        this.accountInformationForm.reset();
        this.editPmbCustFinAccts = false;
    }

    close() {
        this.activeModal.dismiss('Cancel click');
    }

    gridSelectionChange() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
          const priorityOrder = selectedRows[0].priorityOrder;
          const advPayType = selectedRows[0].advPayType;
          this.accountInformationForm.patchValue({
            'accountNo': selectedRows[0].pmbCustFinAcctsPrimaryKey.acctNo,
            'effDate': this.dateFormatPipe.defaultDisplayDateFormat(selectedRows[0].pmbCustFinAcctsPrimaryKey.effectiveFromDate),
            'type': selectedRows[0].acctType,
            'expDate': this.dateFormatPipe.defaultDisplayDateFormat(selectedRows[0].ccExpireDate),
            'use': selectedRows[0].acctUse,
            'status': selectedRows[0].acctStatus,
            'routingNumber': selectedRows[0].routingNo
        });
        this.editPmbCustFinAccts = true;
      }
    }

    getAccountTypes() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_ACCT_INF_TYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.accountTypes = systemCodes;
        });
    }

    getAcctUses() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_ACCT_USE, CONSTANTS.DW_CRDR_INFO).subscribe(dueDateRules => {
            this.acctUses = dueDateRules;
        });
    }

    getAcctStatus() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DW_COLUMN_ACCT_STATUS, CONSTANTS.DW_CRDR_INFO).subscribe(dueDateRules => {
            this.acctStatuses = dueDateRules;
        });
    }
    delete() {
        this.deletePmbCustFinAccts();
    }

}
