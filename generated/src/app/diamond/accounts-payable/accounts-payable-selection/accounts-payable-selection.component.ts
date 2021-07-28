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
import {  AcctPayUpdateSetup } from "../../api-models/index"
import {  AcctPayUpdateSetupService } from "../../api-services/acct-pay-update-setup.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

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
export class AccountsPayableSelectionComponent implements OnInit  {

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

editAcctPayUpdateSetup: boolean;
    acctPayUpdateSetup: AcctPayUpdateSetup;
    acctPayUpdateSetups: AcctPayUpdateSetup[];
    if (this.secWin.hasInsertPermission()) {
        createAcctPayUpdateSetup() {
            this.formValidation.validateForm();
            if(this.accountsPayableSelectionForm.valid) {
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
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAcctPayUpdateSetup = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAcctPayUpdateSetup(seqApupdId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.accountsPayableSelectionForm.valid) {
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
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAcctPayUpdateSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveAcctPayUpdateSetup() {
        if(this.editAcctPayUpdateSetup) {
            this.updateAcctPayUpdateSetup(this.acctPayUpdateSetup.seqApupdId)
        } else {
            this.createAcctPayUpdateSetup();
        }
    }    deleteAcctPayUpdateSetup(seqApupdId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.acctPayUpdateSetupService.deleteAcctPayUpdateSetup(seqApupdId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAcctPayUpdateSetup(seqApupdId : number) {
        this.acctPayUpdateSetupService.getAcctPayUpdateSetup(seqApupdId).subscribe(acctPayUpdateSetup => {
            this.acctPayUpdateSetup = acctPayUpdateSetup;
            this.accountsPayableSelectionForm.patchValue({
                'requestUser': this.acctPayUpdateSetup.requestUser,
                'date': this.acctPayUpdateSetup.updateUser,
                'payableType': this.acctPayUpdateSetup.payableType,
                'companyCode': this.acctPayUpdateSetup.companyCode,
                'vendorId': this.acctPayUpdateSetup.seqVendId,
                'fromInsertedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.fromEnteredDate),
                'thruInsertedDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruEnteredDate),
                'fromDueDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.fromDueDate),
                'thruInsertedDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruReceivedDate),
                'fromDueDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.thruDueDate),
                'thruDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.acctPayUpdateSetup.requestDate),
                'action': this.acctPayUpdateSetup.action,
                'comments': this.acctPayUpdateSetup.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAcctPayUpdateSetups() {
        this.acctPayUpdateSetupService.getAcctPayUpdateSetups().subscribe(acctPayUpdateSetups => {
        this.acctPayUpdateSetups = acctPayUpdateSetups;
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
             headerName: "Job Id",
             field: "jobid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Company",
             field: "companycode",
             width: 200         },
         {
             headerName: "Payable Type",
             field: "payabletype",
             width: 200         },
         {
             headerName: "Action Type",
             field: "actiontype",
             width: 200         },
         {
             headerName: "Request Type",
             field: "requesttype",
             width: 200         },
         {
             headerName: "Status",
             field: "status",
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
     private acctPayUpdateSetupService: AcctPayUpdateSetupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableSelectionForm);
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
        this.formValidation = new FormValidation(this.accountsPayableSelectionForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountsPayableSelectionForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            date: ['', {updateOn: 'blur', validators: [] }],
            payableType: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            fromInsertedDate: ['', {updateOn: 'blur', validators: [] }],
            thruInsertedDate001: ['', {updateOn: 'blur', validators: [] }],
            fromDueDate001: ['', {updateOn: 'blur', validators: [] }],
            thruInsertedDate002: ['', {updateOn: 'blur', validators: [] }],
            fromDueDate002: ['', {updateOn: 'blur', validators: [] }],
            thruDueDate: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            actionType: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup2776: ['', {updateOn: 'blur', validators: [] }],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}