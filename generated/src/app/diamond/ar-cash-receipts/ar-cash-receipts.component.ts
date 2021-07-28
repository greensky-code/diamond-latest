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
import {  ArCashReceipt } from "../../api-models/index"
import {  ArCashReceiptService } from "../../api-services/ar-cash-receipt.service"
import {  ArCashBatchControl } from "../../api-models/index"
import {  ArCashBatchControlService } from "../../api-services/ar-cash-batch-control.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ArCashReceiptsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'arcashreceipts',
    templateUrl: './ar-cash-receipts.component.html',

})
export class ArCashReceiptsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    arCashReceiptsForm: FormGroup;
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

editArCashReceipt: boolean;
    arCashReceipt: ArCashReceipt;
    arCashReceipts: ArCashReceipt[];editArCashBatchControl: boolean;
    arCashBatchControl: ArCashBatchControl;
    arCashBatchControls: ArCashBatchControl[];
    if (this.secWin.hasInsertPermission()) {
        createArCashReceipt() {
            this.formValidation.validateForm();
            if(this.arCashReceiptsForm.valid) {
                let arCashReceipt = new ArCashReceipt();
                arCashReceipt.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
                arCashReceipt.customerType = Form.getValue(this.arCashReceiptsForm, 'customerType');
                arCashReceipt.customerId = Form.getValue(this.arCashReceiptsForm, 'customerId');
                arCashReceipt.insertDatetime = Form.getValue(this.arCashReceiptsForm, 'transactionDate');
                arCashReceipt.transNo = Form.getValue(this.arCashReceiptsForm, 'transactionNo');
                arCashReceipt.transReceiptDate = Form.getValue(this.arCashReceiptsForm, 'receiveDate');
                arCashReceipt.transDate = Form.getValue(this.arCashReceiptsForm, 'transactionType');
                arCashReceipt.securityCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
                arCashReceipt.glRefCode = Form.getValue(this.arCashReceiptsForm, 'glRefCode');
                arCashReceipt.description = Form.getValue(this.arCashReceiptsForm, 'description');
                arCashReceipt.invoiceNo = Form.getValue(this.arCashReceiptsForm, 'invoiceNo');
                arCashReceipt.updateDatetime = Form.getValue(this.arCashReceiptsForm, 'postDate');
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
        if(this.arCashReceiptsForm.valid) {
            let arCashReceipt = new ArCashReceipt();
            arCashReceipt.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
            arCashReceipt.customerType = Form.getValue(this.arCashReceiptsForm, 'customerType');
            arCashReceipt.customerId = Form.getValue(this.arCashReceiptsForm, 'customerId');
            arCashReceipt.insertDatetime = Form.getValue(this.arCashReceiptsForm, 'transactionDate');
            arCashReceipt.transNo = Form.getValue(this.arCashReceiptsForm, 'transactionNo');
            arCashReceipt.transReceiptDate = Form.getValue(this.arCashReceiptsForm, 'receiveDate');
            arCashReceipt.transDate = Form.getValue(this.arCashReceiptsForm, 'transactionType');
            arCashReceipt.securityCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
            arCashReceipt.glRefCode = Form.getValue(this.arCashReceiptsForm, 'glRefCode');
            arCashReceipt.description = Form.getValue(this.arCashReceiptsForm, 'description');
            arCashReceipt.invoiceNo = Form.getValue(this.arCashReceiptsForm, 'invoiceNo');
            arCashReceipt.updateDatetime = Form.getValue(this.arCashReceiptsForm, 'postDate');
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
            this.arCashReceiptsForm.patchValue({
                'batchId': this.arCashReceipt.seqCashBatchId,
                'customerType': this.arCashReceipt.customerType,
                'customerId': this.arCashReceipt.customerId,
                'transactionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.insertDatetime),
                'transactionNo': this.arCashReceipt.transNo,
                'receiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.transReceiptDate),
                'transactionType': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.transDate),
                'companyCode': this.arCashReceipt.securityCode,
                'glRefCode': this.arCashReceipt.glRefCode,
                'description': this.arCashReceipt.description,
                'invoiceNo': this.arCashReceipt.invoiceNo,
                'postDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.updateDatetime),
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
    if (this.secWin.hasInsertPermission()) {
        createArCashBatchControl() {
            this.formValidation.validateForm();
            if(this.arCashReceiptsForm.valid) {
                let arCashBatchControl = new ArCashBatchControl();
                arCashBatchControl.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
                arCashBatchControl.itemCount = Form.getValue(this.arCashReceiptsForm, 'itemCount');
                arCashBatchControl.batchTotal = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
                arCashBatchControl.batchStatus = Form.getValue(this.arCashReceiptsForm, 'batchStatus');
                arCashBatchControl.insertDatetime = Form.getValue(this.arCashReceiptsForm, 'transactionDate');
                arCashBatchControl.securityCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
                arCashBatchControl.updateDatetime = Form.getValue(this.arCashReceiptsForm, 'postDate');
                this.arCashBatchControlService.createArCashBatchControl(arCashBatchControl).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editArCashBatchControl = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateArCashBatchControl(seqCashBatchId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.arCashReceiptsForm.valid) {
            let arCashBatchControl = new ArCashBatchControl();
            arCashBatchControl.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
            arCashBatchControl.itemCount = Form.getValue(this.arCashReceiptsForm, 'itemCount');
            arCashBatchControl.batchTotal = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
            arCashBatchControl.batchStatus = Form.getValue(this.arCashReceiptsForm, 'batchStatus');
            arCashBatchControl.insertDatetime = Form.getValue(this.arCashReceiptsForm, 'transactionDate');
            arCashBatchControl.securityCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
            arCashBatchControl.updateDatetime = Form.getValue(this.arCashReceiptsForm, 'postDate');
            this.arCashBatchControlService.updateArCashBatchControl(arCashBatchControl, seqCashBatchId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editArCashBatchControl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveArCashBatchControl() {
        if(this.editArCashBatchControl) {
            this.updateArCashBatchControl(this.arCashBatchControl.seqCashBatchId)
        } else {
            this.createArCashBatchControl();
        }
    }    deleteArCashBatchControl(seqCashBatchId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.arCashBatchControlService.deleteArCashBatchControl(seqCashBatchId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getArCashBatchControl(seqCashBatchId : number) {
        this.arCashBatchControlService.getArCashBatchControl(seqCashBatchId).subscribe(arCashBatchControl => {
            this.arCashBatchControl = arCashBatchControl;
            this.arCashReceiptsForm.patchValue({
                'batchId': this.arCashBatchControl.seqCashBatchId,
                'itemCount': this.arCashBatchControl.itemCount,
                'batchTotal': this.arCashBatchControl.batchTotal,
                'batchStatus': this.arCashBatchControl.batchStatus,
                'transactionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashBatchControl.insertDatetime),
                'companyCode': this.arCashBatchControl.securityCode,
                'postDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashBatchControl.updateDatetime),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getArCashBatchControls() {
        this.arCashBatchControlService.getArCashBatchControls().subscribe(arCashBatchControls => {
        this.arCashBatchControls = arCashBatchControls;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {
    };
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
             headerName: "Customer Type",
             field: "customertype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Customer ID",
             field: "customerid",
             width: 200         },
         {
             headerName: "Transaction Number",
             field: "transdate",
             width: 200         },
         {
             headerName: "Transaction Amt",
             field: "transamt",
             width: 200         },
         {
             headerName: "TransactionType",
             field: "transactiontype",
             width: 200         },
         {
             headerName: "Company Code",
             field: "companycode",
             width: 200         },
         {
             headerName: "GL Ref Code",
             field: "glrefcode",
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
     private arCashReceiptService: ArCashReceiptService, private arCashBatchControlService: ArCashBatchControlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arCashReceiptsForm);
         this.createDataGrid();
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
        this.formValidation = new FormValidation(this.arCashReceiptsForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arCashReceiptsForm = this.formBuilder.group({
            batchId: ['', {updateOn: 'blur', validators: [] }],
            itemCount: ['', {updateOn: 'blur', validators: [] }],
            batchTotal: ['', {updateOn: 'blur', validators: [] }],
            batchStatus: ['', {updateOn: 'blur', validators: [] }],
            customerType: ['', {updateOn: 'blur', validators: [] }],
            customerId: ['', {updateOn: 'blur', validators: [] }],
            transactionDate: ['', {updateOn: 'blur', validators: [] }],
            transactionNo: ['', {updateOn: 'blur', validators: [] }],
            receiveDate: ['', {updateOn: 'blur', validators: [] }],
            amount: ['', {updateOn: 'blur', validators: [] }],
            transactionType: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            glRefCode: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            statementStatus: ['', {updateOn: 'blur', validators: [] }],
            invoiceNo: ['', {updateOn: 'blur', validators: [] }],
            postDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}