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
import {  ProvCredential } from "../../api-models/index"
import {  ProvCredentialService } from "../../api-services/prov-credential.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProviderCredentialsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'providercredentials',
    templateUrl: './provider-credentials.component.html',

})
export class ProviderCredentialsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerCredentialsForm: FormGroup;
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

editProvCredential: boolean;
    provCredential: ProvCredential;
    provCredentials: ProvCredential[];
    if (this.secWin.hasInsertPermission()) {
        createProvCredential() {
            this.formValidation.validateForm();
            if(this.providerCredentialsForm.valid) {
                let provCredential = new ProvCredential();
                provCredential.seqProvId = Form.getValue(this.providerCredentialsForm, 'providerId');
                provCredential.license1 = Form.getValue(this.providerCredentialsForm, 'license1');
                provCredential.state1 = Form.getValue(this.providerCredentialsForm, 'state1');
                provCredential.deaExpireDate = Form.getValue(this.providerCredentialsForm, 'expirationDate001');
                provCredential.license2 = Form.getValue(this.providerCredentialsForm, 'license2');
                provCredential.state2 = Form.getValue(this.providerCredentialsForm, 'state2');
                provCredential.specialtyBoard1 = Form.getValue(this.providerCredentialsForm, 'spcBoard1');
                provCredential.specialtyBoard2 = Form.getValue(this.providerCredentialsForm, 'spcBoard2');
                provCredential.medicalSchool = Form.getValue(this.providerCredentialsForm, 'medSchool');
                provCredential.internship = Form.getValue(this.providerCredentialsForm, 'internship');
                provCredential.residency = Form.getValue(this.providerCredentialsForm, 'residency');
                provCredential.userDefined1 = Form.getValue(this.providerCredentialsForm, 'userdef1');
                provCredential.userDefined2 = Form.getValue(this.providerCredentialsForm, 'userdef2');
                provCredential.userDefined3 = Form.getValue(this.providerCredentialsForm, 'userdef3');
                provCredential.userDefined4 = Form.getValue(this.providerCredentialsForm, 'userdef4');
                provCredential.userDefined5 = Form.getValue(this.providerCredentialsForm, 'userdef5');
                provCredential.userDefined6 = Form.getValue(this.providerCredentialsForm, 'userdef6');
                provCredential.userDefined7 = Form.getValue(this.providerCredentialsForm, 'userdef7');
                provCredential.userDefined8 = Form.getValue(this.providerCredentialsForm, 'userdef8');
                provCredential.comments = Form.getValue(this.providerCredentialsForm, 'comments');
                provCredential.includeInDir = Form.getValue(this.providerCredentialsForm, 'includeInDirectory');
                provCredential.lastPrintDate = Form.getValue(this.providerCredentialsForm, 'lastPrintDate');
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

    }


    updateProvCredential(seqProvCredential : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerCredentialsForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.seqProvId = Form.getValue(this.providerCredentialsForm, 'providerId');
            provCredential.license1 = Form.getValue(this.providerCredentialsForm, 'license1');
            provCredential.state1 = Form.getValue(this.providerCredentialsForm, 'state1');
            provCredential.deaExpireDate = Form.getValue(this.providerCredentialsForm, 'expirationDate001');
            provCredential.license2 = Form.getValue(this.providerCredentialsForm, 'license2');
            provCredential.state2 = Form.getValue(this.providerCredentialsForm, 'state2');
            provCredential.specialtyBoard1 = Form.getValue(this.providerCredentialsForm, 'spcBoard1');
            provCredential.specialtyBoard2 = Form.getValue(this.providerCredentialsForm, 'spcBoard2');
            provCredential.medicalSchool = Form.getValue(this.providerCredentialsForm, 'medSchool');
            provCredential.internship = Form.getValue(this.providerCredentialsForm, 'internship');
            provCredential.residency = Form.getValue(this.providerCredentialsForm, 'residency');
            provCredential.userDefined1 = Form.getValue(this.providerCredentialsForm, 'userdef1');
            provCredential.userDefined2 = Form.getValue(this.providerCredentialsForm, 'userdef2');
            provCredential.userDefined3 = Form.getValue(this.providerCredentialsForm, 'userdef3');
            provCredential.userDefined4 = Form.getValue(this.providerCredentialsForm, 'userdef4');
            provCredential.userDefined5 = Form.getValue(this.providerCredentialsForm, 'userdef5');
            provCredential.userDefined6 = Form.getValue(this.providerCredentialsForm, 'userdef6');
            provCredential.userDefined7 = Form.getValue(this.providerCredentialsForm, 'userdef7');
            provCredential.userDefined8 = Form.getValue(this.providerCredentialsForm, 'userdef8');
            provCredential.comments = Form.getValue(this.providerCredentialsForm, 'comments');
            provCredential.includeInDir = Form.getValue(this.providerCredentialsForm, 'includeInDirectory');
            provCredential.lastPrintDate = Form.getValue(this.providerCredentialsForm, 'lastPrintDate');
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
            this.providerCredentialsForm.patchValue({
                'providerId': this.provCredential.seqProvId,
                'license1': this.provCredential.license1,
                'state1': this.provCredential.state1,
                'expirationDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.deaExpireDate),
                'license2': this.provCredential.license2,
                'state2': this.provCredential.state2,
                'spcBoard1': this.provCredential.specialtyBoard1,
                'spcBoard2': this.provCredential.specialtyBoard2,
                'medSchool': this.provCredential.medicalSchool,
                'internship': this.provCredential.internship,
                'residency': this.provCredential.residency,
                'userdef1': this.provCredential.userDefined1,
                'userdef2': this.provCredential.userDefined2,
                'userdef3': this.provCredential.userDefined3,
                'userdef4': this.provCredential.userDefined4,
                'userdef5': this.provCredential.userDefined5,
                'userdef6': this.provCredential.userDefined6,
                'userdef7': this.provCredential.userDefined7,
                'userdef8': this.provCredential.userDefined8,
                'comments': this.provCredential.comments,
                'includeInDirectory': this.provCredential.includeInDir,
                'lastPrintDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.lastPrintDate),
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
     private provCredentialService: ProvCredentialService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerCredentialsForm);
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
        this.formValidation = new FormValidation(this.providerCredentialsForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerCredentialsForm = this.formBuilder.group({
            providerId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            license1: ['', {updateOn: 'blur', validators: [] }],
            state1: ['', {updateOn: 'blur', validators: [] }],
            expirationDate001: ['', {updateOn: 'blur', validators: [] }],
            license2: ['', {updateOn: 'blur', validators: [] }],
            state2: ['', {updateOn: 'blur', validators: [] }],
            expirationDate002: ['', {updateOn: 'blur', validators: [] }],
            dea: ['', {updateOn: 'blur', validators: [] }],
            expirationDate003: ['', {updateOn: 'blur', validators: [] }],
            spcBoard1: ['', {updateOn: 'blur', validators: [] }],
            from001: ['', {updateOn: 'blur', validators: [] }],
            to001: ['', {updateOn: 'blur', validators: [] }],
            spcBoard2: ['', {updateOn: 'blur', validators: [] }],
            from002: ['', {updateOn: 'blur', validators: [] }],
            to002: ['', {updateOn: 'blur', validators: [] }],
            medSchool: ['', {updateOn: 'blur', validators: [] }],
            date001: ['', {updateOn: 'blur', validators: [] }],
            internship: ['', {updateOn: 'blur', validators: [] }],
            date002: ['', {updateOn: 'blur', validators: [] }],
            residency: ['', {updateOn: 'blur', validators: [] }],
            date003: ['', {updateOn: 'blur', validators: [] }],
            userdef1: ['', {updateOn: 'blur', validators: [] }],
            userdef2: ['', {updateOn: 'blur', validators: [] }],
            userdef3: ['', {updateOn: 'blur', validators: [] }],
            userdef4: ['', {updateOn: 'blur', validators: [] }],
            userdef5: ['', {updateOn: 'blur', validators: [] }],
            userdef6: ['', {updateOn: 'blur', validators: [] }],
            userdef7: ['', {updateOn: 'blur', validators: [] }],
            userdef8: ['', {updateOn: 'blur', validators: [] }],
            comments: ['', {updateOn: 'blur', validators: [] }],
            includeInDirectory: ['', {updateOn: 'blur', validators: [] }],
            lastPrintDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}