/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {ArCashReceipt} from '../../../api-models/ar-cash-receipt.model';
import {GridOptions} from 'ag-grid-community';
import {Form} from '../../../shared/helpers/form.helper';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {ArCashReceiptService} from '../../../api-services/ar-cash-receipt.service';
import {PmbArCustBillHistoryService} from '../../../api-services/premium/pmb-ar-cust-bill-history.service';
import {PmbArCustBillHistory} from '../../../api-models/premium/pmb-ar-cust-bill-history.model';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DISPLAY_BILLING_PREMIUM_HISTORY} from '../../../shared/app-constants';
import {Menu} from '../../../shared/models/models';
import {SelectCustomerComponent} from '../select-customer/select-customer.component';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ToastService} from '../../../shared/services/toast.service';
import {CONSTANTS} from '../../../shared/services/shared.service';
import { formatDate, DatePipe, CurrencyPipe } from '@angular/common';

// Use the Component directive to define the DisplayPremiumBillingHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'displaypremiumbillinghistory',
    templateUrl: './display-premium-billing-history.component.html',
    providers: [DatePipe, CurrencyPipe]

})
export class DisplayPremiumBillingHistoryComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    displayPremiumBillingHistoryForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'BLHST';
    public isSuperUser = false;
    public secProgress = true;

    public editPmbArCustBillHistory: boolean;
    public pmbArCustBillHistory: PmbArCustBillHistory;
    public pmbArCustBillHistorys: PmbArCustBillHistory[];
    public editArCashReceipt: boolean;
    public arCashReceipt: ArCashReceipt;
    public arCashReceipts: ArCashReceipt[];

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;

    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    showBillingInformation = false;
    showCashReceptDetails = false;

    selectedCustomerData;
    transactionTypes: any[] = [];
    statementStatuses: any[] = [];

    public memberModuleId = DISPLAY_BILLING_PREMIUM_HISTORY;
    public menu: Menu[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Input() showIcon = false;

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
        private pmbArCustBillHistoryService: PmbArCustBillHistoryService,
        private secColDetailService: SecColDetailService,
        private arCashReceiptService: ArCashReceiptService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private datepipe: DatePipe,
        private messageService: MessageMasterDtlService,
        private currencyPipe:CurrencyPipe) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private openCustomerLookup() {
        const ref = this.modalService.open(SelectCustomerComponent, {windowClass: 'input-class', backdrop: 'static', keyboard: false});
        ref.componentInstance.showIcon = true;
        ref.componentInstance.customerData.subscribe((event: any) => {
            this.selectedCustomerData = event;
            this.loadTopDataFirldValues(event);
            let dateFrom =null;
            let dateTo =null;
            if(event.bilFrom!='' && event.billThrough!=''){
                dateFrom =this.datepipe.transform(event.bilFrom.singleDate.formatted, 'yyyy-MM-dd');
                dateTo = this.datepipe.transform(event.billThrough.singleDate.formatted, 'yyyy-MM-dd');
            }
             this.pmbArCustBillHistoryService.getPmbArCustBillHistorysByCustomerIdAndTypeAndDates(event.customerId, event.customerType, dateFrom,dateTo )
                .subscribe(value => {
                    if (value && value.length > 0) {
                        
                        this.showBillingInformation = true;
                        this.dataGrid001GridOptions.api.setRowData(value);
                        this.dataGrid001GridOptions.api.selectIndex(0, false, null);
                   
                    } else {
                        this.recordNotFountAction();
                    }
                });

         
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.displayPremiumBillingHistoryForm);
        this.menuInit();
        this.openCustomerLookup();
        this.createDataGrid001();
        this.createDataGrid002();
        this.getStatementStatus();
        this.getTransactionType();

        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        }, 100);
    }

    recordNotFountAction() {
        let popUpMessage = new PopUpMessage(
            'Premium',
            'Display Premium Billing History',
            '6403: Record or records did not match filter condition. Press Yes to continue',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                this.openCustomerLookup();
            }
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

    getTransactionType() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.TRANSACTION_TYPE, CONSTANTS.DW_AR_CASH_BILL_HISTORY_DE)
            .subscribe(
                (type) => {
                    this.transactionTypes = type;
                }
            );
    }

    getStatementStatus() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.STATEMENT_STATUS, CONSTANTS.DW_AR_CASH_BILL_HISTORY_DE)
            .subscribe(
                (status) => {
                    this.statementStatuses = status;
                }
            );
    }

    createPmbArCustBillHistory() {
        this.formValidation.validateForm();
        if (this.displayPremiumBillingHistoryForm.valid) {
            let pmbArCustBillHistory = new PmbArCustBillHistory();
            pmbArCustBillHistory.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
            pmbArCustBillHistory.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
            pmbArCustBillHistory.balanceForward = Form.getValue(this.displayPremiumBillingHistoryForm, 'balanceForward');
            pmbArCustBillHistory.newBalance = Form.getValue(this.displayPremiumBillingHistoryForm, 'outstandingBalance');
            pmbArCustBillHistory.totalPaymentAmt = Form.getValue(this.displayPremiumBillingHistoryForm, 'paymentAmount');
            pmbArCustBillHistory.billedStartDate = Form.getValue(this.displayPremiumBillingHistoryForm, 'billedThroughDate');
            pmbArCustBillHistory.totalAdjustmentAmt = Form.getValue(this.displayPremiumBillingHistoryForm, 'adjustmentAmount');
            pmbArCustBillHistory.paymentDueDate = Form.getValue(this.displayPremiumBillingHistoryForm, 'paymentDueDate');
            pmbArCustBillHistory.annualPremiumIncome = Form.getValue(this.displayPremiumBillingHistoryForm, 'annualPremiumIncome');
            this.pmbArCustBillHistoryService.createPmbArCustBillHistory(pmbArCustBillHistory).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editPmbArCustBillHistory = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    updatePmbArCustBillHistory(customerType: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.displayPremiumBillingHistoryForm.valid) {
                let pmbArCustBillHistory = new PmbArCustBillHistory();
                pmbArCustBillHistory.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
                pmbArCustBillHistory.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
                pmbArCustBillHistory.balanceForward = Form.getValue(this.displayPremiumBillingHistoryForm, 'balanceForward');
                pmbArCustBillHistory.newBalance = Form.getValue(this.displayPremiumBillingHistoryForm, 'outstandingBalance');
                pmbArCustBillHistory.totalPaymentAmt = Form.getValue(this.displayPremiumBillingHistoryForm, 'paymentAmount');
                pmbArCustBillHistory.billedStartDate = Form.getValue(this.displayPremiumBillingHistoryForm, 'billedThroughDate');
                pmbArCustBillHistory.totalAdjustmentAmt = Form.getValue(this.displayPremiumBillingHistoryForm, 'adjustmentAmount');
                pmbArCustBillHistory.paymentDueDate = Form.getValue(this.displayPremiumBillingHistoryForm, 'paymentDueDate');
                pmbArCustBillHistory.annualPremiumIncome = Form.getValue(this.displayPremiumBillingHistoryForm, 'annualPremiumIncome');
                this.pmbArCustBillHistoryService.updatePmbArCustBillHistory(pmbArCustBillHistory, customerType).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editPmbArCustBillHistory = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    savePmbArCustBillHistory() {
        if (this.editPmbArCustBillHistory) {
            this.updatePmbArCustBillHistory(this.pmbArCustBillHistory.customerType)
        } else {
            this.createPmbArCustBillHistory();
        }
    }

    deletePmbArCustBillHistory(customerType: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbArCustBillHistoryService.deletePmbArCustBillHistory(customerType).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getPmbArCustBillHistory(customerType: string) {
        this.pmbArCustBillHistoryService.getPmbArCustBillHistory(customerType).subscribe(pmbArCustBillHistory => {
            this.pmbArCustBillHistory = pmbArCustBillHistory;
            this.displayPremiumBillingHistoryForm.patchValue({
                'customerId': this.pmbArCustBillHistory.customerId,
                'customerType': this.pmbArCustBillHistory.customerType,
                'balanceForward': this.pmbArCustBillHistory.balanceForward,
                'outstandingBalance': this.pmbArCustBillHistory.newBalance,
                'paymentAmount': this.pmbArCustBillHistory.totalPaymentAmt,
                'billedThroughDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbArCustBillHistory.billedStartDate),
                'adjustmentAmount': this.pmbArCustBillHistory.totalAdjustmentAmt,
                'paymentDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbArCustBillHistory.paymentDueDate),
                'annualPremiumIncome': this.pmbArCustBillHistory.annualPremiumIncome

            });
        });
    }

    getPmbArCustBillHistorys() {
        this.pmbArCustBillHistoryService.getPmbArCustBillHistorys().subscribe(pmbArCustBillHistorys => {
            this.pmbArCustBillHistorys = pmbArCustBillHistorys;
        });
    }

    createArCashReceipt() {
        this.formValidation.validateForm();
        if (this.displayPremiumBillingHistoryForm.valid) {
            let arCashReceipt = new ArCashReceipt();
            arCashReceipt.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
            arCashReceipt.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
            this.arCashReceiptService.createArCashReceipt(arCashReceipt).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editArCashReceipt = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete.' +
                ' Please correct your entries and try again.');
        }
        

    }

    updateArCashReceipt(seqCashReceipt: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.displayPremiumBillingHistoryForm.valid) {
                let arCashReceipt = new ArCashReceipt();
                arCashReceipt.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
                arCashReceipt.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
                this.arCashReceiptService.updateArCashReceipt(arCashReceipt, seqCashReceipt).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editArCashReceipt = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveArCashReceipt() {
        if (this.editArCashReceipt) {
            this.updateArCashReceipt(this.arCashReceipt.seqCashReceipt)
        } else {
            this.createArCashReceipt();
        }
    }

    deleteArCashReceipt(seqCashReceipt: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.arCashReceiptService.deleteArCashReceipt(seqCashReceipt).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getArCashReceipt(seqCashReceipt: number) {
        this.arCashReceiptService.getArCashReceipt(seqCashReceipt).subscribe(arCashReceipt => {
            this.arCashReceipt = arCashReceipt;
            this.displayPremiumBillingHistoryForm.patchValue({
                'customerId': this.arCashReceipt.customerId,
                'customerType': this.arCashReceipt.customerType,
            });
        });
    }

    getArCashReceipts() {
        this.arCashReceiptService.getArCashReceipts().subscribe(arCashReceipts => {
            this.arCashReceipts = arCashReceipts;
        });
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Invoice No',
                field: 'pmbArCustBillHistoryPrimaryKey.invoiceNo',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Invoice Date',
                field: 'invoiceDate',
                width: 200
            },
            {
                headerName: 'Amount Billed',
                field: 'newChargeAmt',
                width: 200,
                valueGetter: (event)=>{

                   return this.currencyPipe.transform(event.data.newChargeAmt, '$','symbol');
                }
            },
            {
                headerName: 'Bill From',
                field: 'periodBilledFromDate',
                width: 200
            },
            {
                headerName: 'Bill Through',
                field: 'periodBilledThruDate',
                width: 200
            },
            {
                headerName: 'Balance Fwd',
                field: 'balanceForward',
                width: 200,
                valueGetter: (event)=>{

                    return this.currencyPipe.transform(event.data.balanceForward, '$','symbol');
                 }
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Invoice No',
                field: 'invoiceNo',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Trans No',
                field: 'transNo',
                width: 200
            },
            {
                headerName: 'Transaction Date',
                field: 'transDate',
                width: 200
            },
            {
                headerName: 'Trans Amt',
                field: 'transAmt',
                width: 200,
                valueGetter: (event)=>{

                    return this.currencyPipe.transform(event.data.transAmt, '$','symbol');
                 }
            },
            {
                headerName: 'Batch ID',
                field: 'seqCashBatchId',
                width: 200
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
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('PMB_AR_CUST_BILL_HISTORY', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.displayPremiumBillingHistoryForm = this.formBuilder.group({
            customerId: ['', {updateOn: 'blur', validators: []}],
            customerType: ['', {updateOn: 'blur', validators: []}],
            name: ['', {updateOn: 'blur', validators: []}],
            balanceForward: ['', {updateOn: 'blur', validators: []}],
            outstandingBalance: ['', {updateOn: 'blur', validators: []}],
            paymentAmount: ['', {updateOn: 'blur', validators: []}],
            billedThroughDate: ['', {updateOn: 'blur', validators: []}],
            adjustmentAmount: ['', {updateOn: 'blur', validators: []}],
            paymentDueDate: ['', {updateOn: 'blur', validators: []}],
            currentBilledAmount: ['', {updateOn: 'blur', validators: []}],
            annualPremiumIncome: ['', {updateOn: 'blur', validators: []}],

            transNo: ['', {updateOn: 'blur', validators: []}],
            postDate: ['', {updateOn: 'blur', validators: []}],
            transactionType: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            transAmt: ['', {updateOn: 'blur', validators: []}],
            glRefCode: ['', {updateOn: 'blur', validators: []}],
            transReceip: ['', {updateOn: 'blur', validators: []}],
            statementStatus: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}]

        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        
       this.loadBillingHistory(event.data);
       this.dataGrid002GridOptions.api.setRowData([]);
       this.arCashReceiptService.getPmbArCashReceiptByCustomerIdAndType(this.selectedCustomerData.customerId, this.selectedCustomerData.customerType, event.data['pmbArCustBillHistoryPrimaryKey'].invoiceNo)
       .subscribe(value => {
           this.showCashReceptDetails = true;
           this.dataGrid002GridOptions.api.setRowData(value);
           this.dataGrid002GridOptions.api.selectIndex(0, false, null);

       });
        
       
    }

    onRowSelectedGrid002(event) {
        if (!event.node.selected) {
            return;
        }
        this.loadCashReceptHistory(event.data);
    }

    loadTopDataFirldValues(eventData) {
        this.displayPremiumBillingHistoryForm.patchValue({
            'customerId': eventData.customerId,
            'customerType': eventData.customerTypeName,
            'name': eventData.shortname
        });

    }

    loadBillingHistory(eventData: PmbArCustBillHistory) {
        this.displayPremiumBillingHistoryForm.patchValue({
            'balanceForward': eventData.balanceForward,
            'outstandingBalance': eventData.newBalance,
            'paymentAmount': eventData.totalPaymentAmt,
            'billedThroughDate': eventData.periodBilledThruDate,
            'adjustmentAmount': eventData.totalAdjustmentAmt,
            'paymentDueDate': eventData.paymentDueDate,
            'currentBilledAmount': eventData.newChargeAmt,
            'annualPremiumIncome': eventData.annualPremiumIncome
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
    }

    loadCashReceptHistory(eventData: ArCashReceipt) {
        const status = this.statementStatuses.find(m => m.dddwDtlPrimaryKey.dataVal === eventData.statementStatus);          // will give you object of dropdown value
        //const transType = this.transactionTypes.find(m => m.dddwDtlPrimaryKey.dataVal == eventData.transactionType);
        this.displayPremiumBillingHistoryForm.patchValue({
            'transNo': eventData.transNo,
            'postDate': eventData.postDate,
            'transactionType': eventData.transactionType ? eventData.transactionType : '',
            'companyCode': eventData.companyCode,
            'transAmt': eventData.transAmt,
            'glRefCode': eventData.glRefCode,
            'transReceip': eventData.transReceiptDate,
            'statementStatus': status ? status.dddwDtlPrimaryKey.displayVal : '',
            'description': eventData.description
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
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
                    this.openCustomerLookup();
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
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        }
    }
    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'Open' },
                    { name: 'Close' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { name: 'Print', disabled: true },
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
                    { name: 'Next', disabled: true },
                    { name: 'Previous', disabled: true }
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'View Adjustment' },
                    { name: 'View Invoice Details' },
                    { name: 'Group Summary', disabled: true }
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
    private handleTopicMenu(action: string) {
        this.toastService.showToast(
            'This option is not implemented yet',
            NgbToastType.Danger
        );
    }

    private handleSpecialMenu(action: string) {
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

    formatCurrency(event, control)
    {
          let formattedAmount = this.currencyPipe.transform(event, '$','symbol');
      
          control.value= formattedAmount;
        
    }

    formatCurrencyChange(event){
        
        let formattedAmount = this.currencyPipe.transform(event.target.value, '$','symbol');
      
        event.target.value= formattedAmount;
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Display Premium Billing History')
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
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
        this.displayPremiumBillingHistoryForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

}
