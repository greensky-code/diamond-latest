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
import {  VendorMaster } from "../../api-models/index"
import {  VendorMasterService } from "../../api-services/vendor-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the VendorMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'vendormaster',
    templateUrl: './vendor-master.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        VendorMasterService
]

})
export class VendorMasterComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorMasterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;

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

editVendorMaster: boolean;
    vendorMaster: VendorMaster;
    vendorMasters: VendorMaster[];
    createVendorMaster() {
        this.formValidation.validateForm();
        if(this.vendorMasterForm.valid) {
            let vendorMaster = new VendorMaster();
            vendorMaster.vendorId = Form.getValue(this.this.vendorMasterForm, 'vendorId');
            vendorMaster.fullName = Form.getValue(this.this.vendorMasterForm, 'fullName');
            vendorMaster.shortName = Form.getValue(this.this.vendorMasterForm, 'shortName');
            vendorMaster.vendorType = Form.getValue(this.this.vendorMasterForm, 'vendorType');
            vendorMaster.irsTaxId = Form.getValue(this.this.vendorMasterForm, 'irsTaxId');
            vendorMaster.nationalProviderId = Form.getValue(this.this.vendorMasterForm, 'nationalProviderId');
            vendorMaster.tradingPartnerId = Form.getValue(this.this.vendorMasterForm, 'tradingPartnerId');
            vendorMaster.holdPaymentFlag = Form.getValue(this.this.vendorMasterForm, 'holdPaymentFlag');
            vendorMaster.paymentDelayDays = Form.getValue(this.this.vendorMasterForm, 'paymentDelayDays');
            vendorMaster.eftInd = Form.getValue(this.this.vendorMasterForm, 'eftIndicator');
            vendorMaster.vendBankAccountNumber = Form.getValue(this.this.vendorMasterForm, 'bankAccountNo');
            vendorMaster.vendBankAccountDescription = Form.getValue(this.this.vendorMasterForm, 'bankAcctDesc');
            vendorMaster.vendAbaRoutingNumber = Form.getValue(this.this.vendorMasterForm, 'abaRoutingNo');
            vendorMaster.vendAccountType = Form.getValue(this.this.vendorMasterForm, 'accountType');
            this.vendorMasterService.createVendorMaster(vendorMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editVendorMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateVendorMaster(seqVendId : number) {
        this.formValidation.validateForm();
        if(this.vendorMasterForm.valid) {
            let vendorMaster = new VendorMaster();
            vendorMaster.vendorId = Form.getValue(this.this.vendorMasterForm, 'vendorId');
            vendorMaster.fullName = Form.getValue(this.this.vendorMasterForm, 'fullName');
            vendorMaster.shortName = Form.getValue(this.this.vendorMasterForm, 'shortName');
            vendorMaster.vendorType = Form.getValue(this.this.vendorMasterForm, 'vendorType');
            vendorMaster.irsTaxId = Form.getValue(this.this.vendorMasterForm, 'irsTaxId');
            vendorMaster.nationalProviderId = Form.getValue(this.this.vendorMasterForm, 'nationalProviderId');
            vendorMaster.tradingPartnerId = Form.getValue(this.this.vendorMasterForm, 'tradingPartnerId');
            vendorMaster.holdPaymentFlag = Form.getValue(this.this.vendorMasterForm, 'holdPaymentFlag');
            vendorMaster.paymentDelayDays = Form.getValue(this.this.vendorMasterForm, 'paymentDelayDays');
            vendorMaster.eftInd = Form.getValue(this.this.vendorMasterForm, 'eftIndicator');
            vendorMaster.vendBankAccountNumber = Form.getValue(this.this.vendorMasterForm, 'bankAccountNo');
            vendorMaster.vendBankAccountDescription = Form.getValue(this.this.vendorMasterForm, 'bankAcctDesc');
            vendorMaster.vendAbaRoutingNumber = Form.getValue(this.this.vendorMasterForm, 'abaRoutingNo');
            vendorMaster.vendAccountType = Form.getValue(this.this.vendorMasterForm, 'accountType');
            this.vendorMasterService.updateVendorMaster(vendorMaster, seqVendId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editVendorMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveVendorMaster() {
        if(this.editVendorMaster) {
            this.updateVendorMaster(this.vendorMaster.seqVendId)
        } else {
            this.createVendorMaster();
        }
    }    deleteVendorMaster(seqVendId : number) {
        this.vendorMasterService.deleteVendorMaster(seqVendId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getVendorMaster(seqVendId : number) {
        this.vendorMasterService.getVendorMaster(seqVendId).subscribe(vendorMaster => {
            this.vendorMaster = vendorMaster;
            this.vendorMasterForm.patchValue({
                'vendorId': this.vendorMaster.vendorId,
                'fullName': this.vendorMaster.fullName,
                'shortName': this.vendorMaster.shortName,
                'vendorType': this.vendorMaster.vendorType,
                'irsTaxId': this.vendorMaster.irsTaxId,
                'nationalProviderId': this.vendorMaster.nationalProviderId,
                'tradingPartnerId': this.vendorMaster.tradingPartnerId,
                'holdPaymentFlag': this.vendorMaster.holdPaymentFlag,
                'paymentDelayDays': this.vendorMaster.paymentDelayDays,
                'eftIndicator': this.vendorMaster.eftInd,
                'bankAccountNo': this.vendorMaster.vendBankAccountNumber,
                'bankAcctDesc': this.vendorMaster.vendBankAccountDescription,
                'abaRoutingNo': this.vendorMaster.vendAbaRoutingNumber,
                'accountType': this.vendorMaster.vendAccountType,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getVendorMasters() {
        this.vendorMasterService.getVendorMasters().subscribe(vendorMasters => {
        this.vendorMasters = vendorMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }



    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
     private vendorMasterService: VendorMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorMasterForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorMasterForm = this.formBuilder.group({
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            fullName: ['', {updateOn: 'blur', validators: [] }],
            shortName: ['', {updateOn: 'blur', validators: [] }],
            vendorType: ['', {updateOn: 'blur', validators: [] }],
            irsTaxId: ['', {updateOn: 'blur', validators: [] }],
            nationalProviderId: ['', {updateOn: 'blur', validators: [] }],
            tradingPartnerId: ['', {updateOn: 'blur', validators: [] }],
            holdPaymentFlag: ['', {updateOn: 'blur', validators: [] }],
            paymentDelayDays: ['', {updateOn: 'blur', validators: [] }],
            eftIndicator: ['', {updateOn: 'blur', validators: [] }],
            bankAccountNo: ['', {updateOn: 'blur', validators: [] }],
            bankAcctDesc: ['', {updateOn: 'blur', validators: [] }],
            abaRoutingNo: ['', {updateOn: 'blur', validators: [] }],
            accountType: ['', {updateOn: 'blur', validators: [] }],
            wcVndrNo: ['', {updateOn: 'blur', validators: [] }],
            surcharge: ['', {updateOn: 'blur', validators: [] }],
            excProvEff: ['', {updateOn: 'blur', validators: [] }],
            excProvTrm: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}