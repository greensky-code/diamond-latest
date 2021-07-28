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
import {  VendorAdvPayRules } from "../../api-models/index"
import {  VendorAdvPayRulesService } from "../../api-services/vendor-adv-pay-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the VendorAdvancePaymentRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'vendoradvancepaymentrules',
    templateUrl: './vendor-advance-payment-rules.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        VendorAdvPayRulesService
]

})
export class VendorAdvancePaymentRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorAdvancePaymentRulesForm: FormGroup;
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

editVendorAdvPayRules: boolean;
    vendorAdvPayRules: VendorAdvPayRules;
    vendorAdvPayRuleses: VendorAdvPayRules[];
    createVendorAdvPayRules() {
        this.formValidation.validateForm();
        if(this.vendorAdvancePaymentRulesForm.valid) {
            let vendorAdvPayRules = new VendorAdvPayRules();
            vendorAdvPayRules.advPayType = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'advancePayType');
            vendorAdvPayRules.zeroPayOption = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'description');
            vendorAdvPayRules.replenish = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'replenish');
            vendorAdvPayRules.offsetBy = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'offsetBy');
            vendorAdvPayRules.accPayType = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'accPayType');
            vendorAdvPayRules.userDefined1 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine1');
            vendorAdvPayRules.userDate1 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate1');
            vendorAdvPayRules.userDefined2 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine2');
            vendorAdvPayRules.userDate2 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate2');
            vendorAdvPayRules.userDefined3 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine3');
            vendorAdvPayRules.userDate3 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate3');
            vendorAdvPayRules.userDefined4 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine4');
            vendorAdvPayRules.userDate4 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate4');
            this.vendorAdvPayRulesService.createVendorAdvPayRules(vendorAdvPayRules).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editVendorAdvPayRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateVendorAdvPayRules(advPayType : string) {
        this.formValidation.validateForm();
        if(this.vendorAdvancePaymentRulesForm.valid) {
            let vendorAdvPayRules = new VendorAdvPayRules();
            vendorAdvPayRules.advPayType = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'advancePayType');
            vendorAdvPayRules.zeroPayOption = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'description');
            vendorAdvPayRules.replenish = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'replenish');
            vendorAdvPayRules.offsetBy = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'offsetBy');
            vendorAdvPayRules.accPayType = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'accPayType');
            vendorAdvPayRules.userDefined1 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine1');
            vendorAdvPayRules.userDate1 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate1');
            vendorAdvPayRules.userDefined2 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine2');
            vendorAdvPayRules.userDate2 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate2');
            vendorAdvPayRules.userDefined3 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine3');
            vendorAdvPayRules.userDate3 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate3');
            vendorAdvPayRules.userDefined4 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDefine4');
            vendorAdvPayRules.userDate4 = Form.getValue(this.this.vendorAdvancePaymentRulesForm, 'userDate4');
            this.vendorAdvPayRulesService.updateVendorAdvPayRules(vendorAdvPayRules, advPayType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editVendorAdvPayRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveVendorAdvPayRules() {
        if(this.editVendorAdvPayRules) {
            this.updateVendorAdvPayRules(this.vendorAdvPayRules.advPayType)
        } else {
            this.createVendorAdvPayRules();
        }
    }    deleteVendorAdvPayRules(advPayType : string) {
        this.vendorAdvPayRulesService.deleteVendorAdvPayRules(advPayType).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getVendorAdvPayRules(advPayType : string) {
        this.vendorAdvPayRulesService.getVendorAdvPayRules(advPayType).subscribe(vendorAdvPayRules => {
            this.vendorAdvPayRules = vendorAdvPayRules;
            this.vendorAdvancePaymentRulesForm.patchValue({
                'advancePayType': this.vendorAdvPayRules.advPayType,
                'description': this.vendorAdvPayRules.zeroPayOption,
                'replenish': this.vendorAdvPayRules.replenish,
                'offsetBy': this.vendorAdvPayRules.offsetBy,
                'accPayType': this.vendorAdvPayRules.accPayType,
                'userDefine1': this.vendorAdvPayRules.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAdvPayRules.userDate1),
                'userDefine2': this.vendorAdvPayRules.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAdvPayRules.userDate2),
                'userDefine3': this.vendorAdvPayRules.userDefined3,
                'userDate3': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAdvPayRules.userDate3),
                'userDefine4': this.vendorAdvPayRules.userDefined4,
                'userDate4': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAdvPayRules.userDate4),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getVendorAdvPayRuleses() {
        this.vendorAdvPayRulesService.getVendorAdvPayRuleses().subscribe(vendorAdvPayRuleses => {
        this.vendorAdvPayRuleses = vendorAdvPayRuleses;
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
     private vendorAdvPayRulesService: VendorAdvPayRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorAdvancePaymentRulesForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorAdvancePaymentRulesForm = this.formBuilder.group({
            advancePayType: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            replenish: ['', {updateOn: 'blur', validators: [] }],
            offsetBy: ['', {updateOn: 'blur', validators: [] }],
            zeroPayOption: ['', {updateOn: 'blur', validators: [] }],
            accPayType: ['', {updateOn: 'blur', validators: [] }],
            userDefine1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDefine2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }],
            userDefine3: ['', {updateOn: 'blur', validators: [] }],
            userDate3: ['', {updateOn: 'blur', validators: [] }],
            userDefine4: ['', {updateOn: 'blur', validators: [] }],
            userDate4: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}