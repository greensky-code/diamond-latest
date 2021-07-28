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
import {  ClaimBenefitAccum } from "../../api-models/index"
import {  ClaimBenefitAccumService } from "../../api-services/claim-benefit-accum.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the AccumClaimsReportComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accumclaimsreport',
    templateUrl: './accum-claims-report.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ClaimBenefitAccumService
]

})
export class AccumClaimsReportComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accumClaimsReportForm: FormGroup;
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

editClaimBenefitAccum: boolean;
    claimBenefitAccum: ClaimBenefitAccum;
    claimBenefitAccums: ClaimBenefitAccum[];
    createClaimBenefitAccum() {
        this.formValidation.validateForm();
        if(this.accumClaimsReportForm.valid) {
            let claimBenefitAccum = new ClaimBenefitAccum();
            claimBenefitAccum.compareDates = Form.getValue(this.this.accumClaimsReportForm, 'fromDate');
            claimBenefitAccum.admitDate = Form.getValue(this.this.accumClaimsReportForm, 'thruDate');
            this.claimBenefitAccumService.createClaimBenefitAccum(claimBenefitAccum).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editClaimBenefitAccum = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateClaimBenefitAccum(seqAccumId : number) {
        this.formValidation.validateForm();
        if(this.accumClaimsReportForm.valid) {
            let claimBenefitAccum = new ClaimBenefitAccum();
            claimBenefitAccum.compareDates = Form.getValue(this.this.accumClaimsReportForm, 'fromDate');
            claimBenefitAccum.admitDate = Form.getValue(this.this.accumClaimsReportForm, 'thruDate');
            this.claimBenefitAccumService.updateClaimBenefitAccum(claimBenefitAccum, seqAccumId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClaimBenefitAccum = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveClaimBenefitAccum() {
        if(this.editClaimBenefitAccum) {
            this.updateClaimBenefitAccum(this.claimBenefitAccum.seqAccumId)
        } else {
            this.createClaimBenefitAccum();
        }
    }    deleteClaimBenefitAccum(seqAccumId : number) {
        this.claimBenefitAccumService.deleteClaimBenefitAccum(seqAccumId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getClaimBenefitAccum(seqAccumId : number) {
        this.claimBenefitAccumService.getClaimBenefitAccum(seqAccumId).subscribe(claimBenefitAccum => {
            this.claimBenefitAccum = claimBenefitAccum;
            this.accumClaimsReportForm.patchValue({
                'fromDate': this.claimBenefitAccum.compareDates,
                'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.claimBenefitAccum.admitDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClaimBenefitAccums() {
        this.claimBenefitAccumService.getClaimBenefitAccums().subscribe(claimBenefitAccums => {
        this.claimBenefitAccums = claimBenefitAccums;
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
     private claimBenefitAccumService: ClaimBenefitAccumService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accumClaimsReportForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accumClaimsReportForm = this.formBuilder.group({
            fromDate: ['', {updateOn: 'blur', validators: [] }],
            thruDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}