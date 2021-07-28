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
import {  PmbCustFinAccts } from "../../api-models/index"
import {  PmbCustFinAcctsService } from "../../api-services/pmb-cust-fin-accts.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

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

})
export class AccountInformationComponent implements OnInit  {

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
    private windowId: string = '';

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

editPmbCustFinAccts: boolean;
    pmbCustFinAccts: PmbCustFinAccts;
    pmbCustFinAcctss: PmbCustFinAccts[];
    if (this.secWin.hasInsertPermission()) {
        createPmbCustFinAccts() {
            this.formValidation.validateForm();
            if(this.accountInformationForm.valid) {
                let pmbCustFinAccts = new PmbCustFinAccts();
                pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
                pmbCustFinAccts.effectiveToDate = Form.getValue(this.accountInformationForm, 'effDate');
                pmbCustFinAccts.ccExpireDate = Form.getValue(this.accountInformationForm, 'expDate');
                pmbCustFinAccts.customerId = Form.getValue(this.accountInformationForm, 'user');
                this.pmbCustFinAcctsService.createPmbCustFinAccts(pmbCustFinAccts).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPmbCustFinAccts = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePmbCustFinAccts(customerType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.accountInformationForm.valid) {
            let pmbCustFinAccts = new PmbCustFinAccts();
            pmbCustFinAccts.acctNo = Form.getValue(this.accountInformationForm, 'accountNo');
            pmbCustFinAccts.effectiveToDate = Form.getValue(this.accountInformationForm, 'effDate');
            pmbCustFinAccts.ccExpireDate = Form.getValue(this.accountInformationForm, 'expDate');
            pmbCustFinAccts.customerId = Form.getValue(this.accountInformationForm, 'user');
            this.pmbCustFinAcctsService.updatePmbCustFinAccts(pmbCustFinAccts, customerType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPmbCustFinAccts = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePmbCustFinAccts() {
        if(this.editPmbCustFinAccts) {
            this.updatePmbCustFinAccts(this.pmbCustFinAccts.customerType)
        } else {
            this.createPmbCustFinAccts();
        }
    }    deletePmbCustFinAccts(customerType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbCustFinAcctsService.deletePmbCustFinAccts(customerType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPmbCustFinAccts(customerType : string) {
        this.pmbCustFinAcctsService.getPmbCustFinAccts(customerType).subscribe(pmbCustFinAccts => {
            this.pmbCustFinAccts = pmbCustFinAccts;
            this.accountInformationForm.patchValue({
                'accountNo': this.pmbCustFinAccts.acctNo,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbCustFinAccts.effectiveToDate),
                'expDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbCustFinAccts.ccExpireDate),
                'user': this.pmbCustFinAccts.customerId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPmbCustFinAcctss() {
        this.pmbCustFinAcctsService.getPmbCustFinAcctss().subscribe(pmbCustFinAcctss => {
        this.pmbCustFinAcctss = pmbCustFinAcctss;
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
             headerName: "Account No",
             field: "acctno",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Type",
             field: "accttype",
             width: 200         },
         {
             headerName: "Routing Number",
             field: "routingno",
             width: 200         },
         {
             headerName: "Eff. Date Exp. Date",
             field: "",
             width: 200         },
         {
             headerName: "Use",
             field: "acctuse",
             width: 200         },
         {
             headerName: "Status",
             field: "acctstatus",
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
     private pmbCustFinAcctsService: PmbCustFinAcctsService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountInformationForm);
         this.createDataGrid();
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
        this.formValidation = new FormValidation(this.accountInformationForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountInformationForm = this.formBuilder.group({
            accountNo: ['', {updateOn: 'blur', validators: [] }],
            effDate: ['', {updateOn: 'blur', validators: [] }],
            type: ['', {updateOn: 'blur', validators: [] }],
            expDate: ['', {updateOn: 'blur', validators: [] }],
            user: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            routingNumber: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}