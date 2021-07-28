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
import {  ProvCredential } from "../../api-models/index"
import {  ProvCredentialService } from "../../api-services/prov-credential.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the InsuranceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'insurance',
    templateUrl: './insurance.component.html',

})
export class InsuranceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    insuranceForm: FormGroup;
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

editProvCredential: boolean;
    provCredential: ProvCredential;
    provCredentials: ProvCredential[];
    if (this.secWin.hasInsertPermission()) {
        createProvCredential() {
            this.formValidation.validateForm();
            if(this.insuranceForm.valid) {
                let provCredential = new ProvCredential();
                provCredential.insuranceCarrier1 = Form.getValue(this.insuranceForm, 'carrier1');
                provCredential.insuranceCarrier2 = Form.getValue(this.insuranceForm, 'carrier2');
                provCredential.policyDescr1 = Form.getValue(this.insuranceForm, 'policy1');
                provCredential.policyDescr2 = Form.getValue(this.insuranceForm, 'policy2');
                provCredential.effectiveFrom1 = Form.getValue(this.insuranceForm, 'from1');
                provCredential.effectiveFrom2 = Form.getValue(this.insuranceForm, 'from2');
                provCredential.state1 = Form.getValue(this.insuranceForm, 'to1');
                provCredential.state2 = Form.getValue(this.insuranceForm, 'to2');
                provCredential.claimLimit1 = Form.getValue(this.insuranceForm, 'claimLimit1');
                provCredential.claimLimit2 = Form.getValue(this.insuranceForm, 'claimLimit2');
                provCredential.aggregLimit1 = Form.getValue(this.insuranceForm, 'aggregLimit1');
                provCredential.aggregateLimit2 = Form.getValue(this.insuranceForm, 'aggregLimit2');
                provCredential.license1 = Form.getValue(this.insuranceForm, 'policyDescr1');
                provCredential.license2 = Form.getValue(this.insuranceForm, 'policyDescr2');
                this.provCredentialService.createProvCredential(provCredential).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvCredential = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProvCredential(seqProvCredential : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.insuranceForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.insuranceCarrier1 = Form.getValue(this.insuranceForm, 'carrier1');
            provCredential.insuranceCarrier2 = Form.getValue(this.insuranceForm, 'carrier2');
            provCredential.policyDescr1 = Form.getValue(this.insuranceForm, 'policy1');
            provCredential.policyDescr2 = Form.getValue(this.insuranceForm, 'policy2');
            provCredential.effectiveFrom1 = Form.getValue(this.insuranceForm, 'from1');
            provCredential.effectiveFrom2 = Form.getValue(this.insuranceForm, 'from2');
            provCredential.state1 = Form.getValue(this.insuranceForm, 'to1');
            provCredential.state2 = Form.getValue(this.insuranceForm, 'to2');
            provCredential.claimLimit1 = Form.getValue(this.insuranceForm, 'claimLimit1');
            provCredential.claimLimit2 = Form.getValue(this.insuranceForm, 'claimLimit2');
            provCredential.aggregLimit1 = Form.getValue(this.insuranceForm, 'aggregLimit1');
            provCredential.aggregateLimit2 = Form.getValue(this.insuranceForm, 'aggregLimit2');
            provCredential.license1 = Form.getValue(this.insuranceForm, 'policyDescr1');
            provCredential.license2 = Form.getValue(this.insuranceForm, 'policyDescr2');
            this.provCredentialService.updateProvCredential(provCredential, seqProvCredential).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvCredential = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvCredential() {
        if(this.editProvCredential) {
            this.updateProvCredential(this.provCredential.seqProvCredential)
        } else {
            this.createProvCredential();
        }
    }    deleteProvCredential(seqProvCredential : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provCredentialService.deleteProvCredential(seqProvCredential).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvCredential(seqProvCredential : number) {
        this.provCredentialService.getProvCredential(seqProvCredential).subscribe(provCredential => {
            this.provCredential = provCredential;
            this.insuranceForm.patchValue({
                'carrier1': this.provCredential.insuranceCarrier1,
                'carrier2': this.provCredential.insuranceCarrier2,
                'policy1': this.provCredential.policyDescr1,
                'policy2': this.provCredential.policyDescr2,
                'from1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom1),
                'from2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom2),
                'to1': this.provCredential.state1,
                'to2': this.provCredential.state2,
                'claimLimit1': this.provCredential.claimLimit1,
                'claimLimit2': this.provCredential.claimLimit2,
                'aggregLimit1': this.provCredential.aggregLimit1,
                'aggregLimit2': this.provCredential.aggregateLimit2,
                'policyDescr1': this.provCredential.license1,
                'policyDescr2': this.provCredential.license2,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvCredentials() {
        this.provCredentialService.getProvCredentials().subscribe(provCredentials => {
        this.provCredentials = provCredentials;
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
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
     private provCredentialService: ProvCredentialService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.insuranceForm);
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
        this.formValidation = new FormValidation(this.insuranceForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.insuranceForm = this.formBuilder.group({
            carrier1: ['', {updateOn: 'blur', validators: [] }],
            carrier2: ['', {updateOn: 'blur', validators: [] }],
            policy1: ['', {updateOn: 'blur', validators: [] }],
            policy2: ['', {updateOn: 'blur', validators: [] }],
            from1: ['', {updateOn: 'blur', validators: [] }],
            from2: ['', {updateOn: 'blur', validators: [] }],
            to1: ['', {updateOn: 'blur', validators: [] }],
            to2: ['', {updateOn: 'blur', validators: [] }],
            claimLimit1: ['', {updateOn: 'blur', validators: [] }],
            claimLimit2: ['', {updateOn: 'blur', validators: [] }],
            aggregLimit1: ['', {updateOn: 'blur', validators: [] }],
            aggregLimit2: ['', {updateOn: 'blur', validators: [] }],
            policyDescr1: ['', {updateOn: 'blur', validators: [] }],
            policyDescr2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}