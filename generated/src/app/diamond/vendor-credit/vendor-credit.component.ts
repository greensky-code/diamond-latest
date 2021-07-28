/* Copyright (c) 2020 . All Rights Reserved. */

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
import {  VendorCredit } from "../../api-models/index"
import {  VendorCreditService } from "../../api-services/vendor-credit.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the VendorCreditComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'vendorcredit',
    templateUrl: './vendor-credit.component.html',

})
export class VendorCreditComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorCreditForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(){
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes','Yes', 'btn btn-primary'), new PopUpMessageButton('no','No', 'btn btn-primary')];
        this.child.showMesssage()
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

editVendorCredit: boolean;
    vendorCredit: VendorCredit;
    vendorCredits: VendorCredit[];
    if (this.secWin.hasInsertPermission()) {
        createVendorCredit() {
            this.formValidation.validateForm();
            if(this.vendorCreditForm.valid) {
                let vendorCredit = new VendorCredit();
                vendorCredit.seqVendId = Form.getValue(this.vendorCreditForm, 'vendorId001');
                vendorCredit.seqVendAddress = Form.getValue(this.vendorCreditForm, 'vendorAddress001');
                vendorCredit.creditReason = Form.getValue(this.vendorCreditForm, 'creditReason');
                vendorCredit.creditStatus = Form.getValue(this.vendorCreditForm, 'apprStatus');
                vendorCredit.seqVendAdvPayAcc = Form.getValue(this.vendorCreditForm, 'advPayAccNo');
                vendorCredit.checkEftNumber = Form.getValue(this.vendorCreditForm, 'checkNumber');
                vendorCredit.offsetFromAmt = Form.getValue(this.vendorCreditForm, 'selectedForPay');
                vendorCredit.applyOffsetTo = Form.getValue(this.vendorCreditForm, 'offsetAmt');
                vendorCredit.checkEftCompanyCode = Form.getValue(this.vendorCreditForm, 'companyCode001');
                vendorCredit.checkEftGlRefCode = Form.getValue(this.vendorCreditForm, 'glRefCode');
                vendorCredit.applyCredit = Form.getValue(this.vendorCreditForm, 'applyTo');
                vendorCredit.userDefined1 = Form.getValue(this.vendorCreditForm, 'userDefine1');
                vendorCredit.userDate1 = Form.getValue(this.vendorCreditForm, 'userDate1');
                vendorCredit.userDefined2 = Form.getValue(this.vendorCreditForm, 'userDefine2');
                vendorCredit.userDate2 = Form.getValue(this.vendorCreditForm, 'userDate2');
                this.vendorCreditService.createVendorCredit(vendorCredit).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editVendorCredit = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateVendorCredit(seqVendCredit : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.vendorCreditForm.valid) {
            let vendorCredit = new VendorCredit();
            vendorCredit.seqVendId = Form.getValue(this.vendorCreditForm, 'vendorId001');
            vendorCredit.seqVendAddress = Form.getValue(this.vendorCreditForm, 'vendorAddress001');
            vendorCredit.creditReason = Form.getValue(this.vendorCreditForm, 'creditReason');
            vendorCredit.creditStatus = Form.getValue(this.vendorCreditForm, 'apprStatus');
            vendorCredit.seqVendAdvPayAcc = Form.getValue(this.vendorCreditForm, 'advPayAccNo');
            vendorCredit.checkEftNumber = Form.getValue(this.vendorCreditForm, 'checkNumber');
            vendorCredit.offsetFromAmt = Form.getValue(this.vendorCreditForm, 'selectedForPay');
            vendorCredit.applyOffsetTo = Form.getValue(this.vendorCreditForm, 'offsetAmt');
            vendorCredit.checkEftCompanyCode = Form.getValue(this.vendorCreditForm, 'companyCode001');
            vendorCredit.checkEftGlRefCode = Form.getValue(this.vendorCreditForm, 'glRefCode');
            vendorCredit.applyCredit = Form.getValue(this.vendorCreditForm, 'applyTo');
            vendorCredit.userDefined1 = Form.getValue(this.vendorCreditForm, 'userDefine1');
            vendorCredit.userDate1 = Form.getValue(this.vendorCreditForm, 'userDate1');
            vendorCredit.userDefined2 = Form.getValue(this.vendorCreditForm, 'userDefine2');
            vendorCredit.userDate2 = Form.getValue(this.vendorCreditForm, 'userDate2');
            this.vendorCreditService.updateVendorCredit(vendorCredit, seqVendCredit).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editVendorCredit = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveVendorCredit() {
        if(this.editVendorCredit) {
            this.updateVendorCredit(this.vendorCredit.seqVendCredit)
        } else {
            this.createVendorCredit();
        }
    }    deleteVendorCredit(seqVendCredit : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.vendorCreditService.deleteVendorCredit(seqVendCredit).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getVendorCredit(seqVendCredit : number) {
        this.vendorCreditService.getVendorCredit(seqVendCredit).subscribe(vendorCredit => {
            this.vendorCredit = vendorCredit;
            this.vendorCreditForm.patchValue({
                'vendorId001': this.vendorCredit.seqVendId,
                'vendorAddress001': this.vendorCredit.seqVendAddress,
                'creditReason': this.vendorCredit.creditReason,
                'apprStatus': this.vendorCredit.creditStatus,
                'advPayAccNo': this.vendorCredit.seqVendAdvPayAcc,
                'checkNumber': this.vendorCredit.checkEftNumber,
                'selectedForPay': this.vendorCredit.offsetFromAmt,
                'offsetAmt': this.vendorCredit.applyOffsetTo,
                'companyCode001': this.vendorCredit.checkEftCompanyCode,
                'glRefCode': this.vendorCredit.checkEftGlRefCode,
                'applyTo': this.vendorCredit.applyCredit,
                'userDefine1': this.vendorCredit.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorCredit.userDate1),
                'userDefine2': this.vendorCredit.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorCredit.userDate2),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getVendorCredits() {
        this.vendorCreditService.getVendorCredits().subscribe(vendorCredits => {
        this.vendorCredits = vendorCredits;
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
             headerName: "Seq No",
             field: "seqvendid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Credit Type",
             field: "credittype",
             width: 200         },
         {
             headerName: "Account No",
             field: "",
             width: 200         },
         {
             headerName: "Check No",
             field: "checkeftnumber",
             width: 200         },
         {
             headerName: "Check/EFT",
             field: "checkeftdate",
             width: 200         },
         {
             headerName: "Check/EFT No",
             field: "checkeftamount",
             width: 200         },
         {
             headerName: "Offset Amt",
             field: "offsetfromamt",
             width: 200         },
         {
             headerName: "Apply To",
             field: "applycredit",
             width: 200         },
         {
             headerName: "Offset To View",
             field: "applyoffsetto",
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
     private vendorCreditService: VendorCreditService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorCreditForm);
         this.createDataGrid();
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
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
        }, error => {
            this.displaySaveError(error);
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorCreditForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorCreditForm = this.formBuilder.group({
            vendorId001: ['', {updateOn: 'blur', validators: [] }],
            vendorAddress001: ['', {updateOn: 'blur', validators: [] }],
            creditReason: ['', {updateOn: 'blur', validators: [] }],
            apprStatus: ['', {updateOn: 'blur', validators: [] }],
            advPayAccNo: ['', {updateOn: 'blur', validators: [] }],
            checkNumber: ['', {updateOn: 'blur', validators: [] }],
            balanceAmt: ['', {updateOn: 'blur', validators: [] }],
            selectedForPay: ['', {updateOn: 'blur', validators: [] }],
            offsetAmt: ['', {updateOn: 'blur', validators: [] }],
            companyCode001: ['', {updateOn: 'blur', validators: [] }],
            glRefCode: ['', {updateOn: 'blur', validators: [] }],
            applyTo: ['', {updateOn: 'blur', validators: [] }],
            vendorId002: ['', {updateOn: 'blur', validators: [] }],
            vendorAddress002: ['', {updateOn: 'blur', validators: [] }],
            accountNo: ['', {updateOn: 'blur', validators: [] }],
            companyCode002: ['', {updateOn: 'blur', validators: [] }],
            giRefCode: ['', {updateOn: 'blur', validators: [] }],
            userDefine1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDefine2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}