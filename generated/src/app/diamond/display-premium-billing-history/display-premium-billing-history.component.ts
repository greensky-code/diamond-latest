/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../shared/validators/number.validator';
import { CustomValidators } from '../../shared/validators/custom-validator';
import { Mask } from '../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../shared/config';
import { Form } from '../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  PmbArCustBillHistory } from "../../api-models/index"
import {  PmbArCustBillHistoryService } from "../../api-services/pmb-ar-cust-bill-history.service"
import {  ArCashReceipt } from "../../api-models/index"
import {  ArCashReceiptService } from "../../api-services/ar-cash-receipt.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

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

})
export class DisplayPremiumBillingHistoryComponent implements OnInit  {

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
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes'){
            console.log("button yes has been click!");
        }
        if(button.name == 'no'){
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

editPmbArCustBillHistory: boolean;
    pmbArCustBillHistory: PmbArCustBillHistory;
    pmbArCustBillHistorys: PmbArCustBillHistory[];editArCashReceipt: boolean;
    arCashReceipt: ArCashReceipt;
    arCashReceipts: ArCashReceipt[];
    if (this.secWin.hasInsertPermission()) {
        createPmbArCustBillHistory() {
            this.formValidation.validateForm();
            if(this.displayPremiumBillingHistoryForm.valid) {
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
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPmbArCustBillHistory = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePmbArCustBillHistory(customerType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.displayPremiumBillingHistoryForm.valid) {
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
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPmbArCustBillHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePmbArCustBillHistory() {
        if(this.editPmbArCustBillHistory) {
            this.updatePmbArCustBillHistory(this.pmbArCustBillHistory.customerType)
        } else {
            this.createPmbArCustBillHistory();
        }
    }    deletePmbArCustBillHistory(customerType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbArCustBillHistoryService.deletePmbArCustBillHistory(customerType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPmbArCustBillHistory(customerType : string) {
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
                'annualPremiumIncome': this.pmbArCustBillHistory.annualPremiumIncome,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPmbArCustBillHistorys() {
        this.pmbArCustBillHistoryService.getPmbArCustBillHistorys().subscribe(pmbArCustBillHistorys => {
        this.pmbArCustBillHistorys = pmbArCustBillHistorys;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createArCashReceipt() {
            this.formValidation.validateForm();
            if(this.displayPremiumBillingHistoryForm.valid) {
                let arCashReceipt = new ArCashReceipt();
                arCashReceipt.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
                arCashReceipt.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
                this.arCashReceiptService.createArCashReceipt(arCashReceipt).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editArCashReceipt = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateArCashReceipt(seqCashReceipt : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.displayPremiumBillingHistoryForm.valid) {
            let arCashReceipt = new ArCashReceipt();
            arCashReceipt.customerId = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerId');
            arCashReceipt.customerType = Form.getValue(this.displayPremiumBillingHistoryForm, 'customerType');
            this.arCashReceiptService.updateArCashReceipt(arCashReceipt, seqCashReceipt).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editArCashReceipt = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveArCashReceipt() {
        if(this.editArCashReceipt) {
            this.updateArCashReceipt(this.arCashReceipt.seqCashReceipt)
        } else {
            this.createArCashReceipt();
        }
    }    deleteArCashReceipt(seqCashReceipt : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.arCashReceiptService.deleteArCashReceipt(seqCashReceipt).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getArCashReceipt(seqCashReceipt : number) {
        this.arCashReceiptService.getArCashReceipt(seqCashReceipt).subscribe(arCashReceipt => {
            this.arCashReceipt = arCashReceipt;
            this.displayPremiumBillingHistoryForm.patchValue({
                'customerId': this.arCashReceipt.customerId,
                'customerType': this.arCashReceipt.customerType,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getArCashReceipts() {
        this.arCashReceiptService.getArCashReceipts().subscribe(arCashReceipts => {
        this.arCashReceipts = arCashReceipts;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Invoice No",
             field: "invoiceno",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Invoice Date",
             field: "invoicedate",
             width: 200         },
         {
             headerName: "Amount Billed",
             field: "",
             width: 200         },
         {
             headerName: "Bill From",
             field: "periodbilledfromdate",
             width: 200         },
         {
             headerName: "Bill Through",
             field: "periodbilledthrudate",
             width: 200         },
         {
             headerName: "Balance Fwd",
             field: "balanceforward",
             width: 200         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "Inoice No",
             field: "invoiceno",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Trans No",
             field: "transno",
             width: 200         },
         {
             headerName: "Transaction Date",
             field: "transactiontype",
             width: 200         },
         {
             headerName: "Trans Amt",
             field: "transamt",
             width: 200         },
         {
             headerName: "Batch ID",
             field: "seqcashbatchid",
             width: 200         }
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
     private pmbArCustBillHistoryService: PmbArCustBillHistoryService, private arCashReceiptService: ArCashReceiptService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.displayPremiumBillingHistoryForm);
         this.createDataGrid001();
         this.createDataGrid002();
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

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let useId = null;
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
        this.formValidation = new FormValidation(this.displayPremiumBillingHistoryForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.displayPremiumBillingHistoryForm = this.formBuilder.group({
            customerId: ['', {updateOn: 'blur', validators: [] }],
            customerType: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            balanceForward: ['', {updateOn: 'blur', validators: [] }],
            outstandingBalance: ['', {updateOn: 'blur', validators: [] }],
            paymentAmount: ['', {updateOn: 'blur', validators: [] }],
            billedThroughDate: ['', {updateOn: 'blur', validators: [] }],
            adjustmentAmount: ['', {updateOn: 'blur', validators: [] }],
            paymentDueDate: ['', {updateOn: 'blur', validators: [] }],
            currentBilledAmount: ['', {updateOn: 'blur', validators: [] }],
            annualPremiumIncome: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}