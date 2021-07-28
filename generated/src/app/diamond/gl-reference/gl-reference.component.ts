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
import {  GeneralLedgerReference } from "../../api-models/index"
import {  GeneralLedgerReferenceService } from "../../api-services/general-ledger-reference.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the GlReferenceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'glreference',
    templateUrl: './gl-reference.component.html',

})
export class GlReferenceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    glReferenceForm: FormGroup;
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

editGeneralLedgerReference: boolean;
    generalLedgerReference: GeneralLedgerReference;
    generalLedgerReferences: GeneralLedgerReference[];
    if (this.secWin.hasInsertPermission()) {
        createGeneralLedgerReference() {
            this.formValidation.validateForm();
            if(this.glReferenceForm.valid) {
                let generalLedgerReference = new GeneralLedgerReference();
                generalLedgerReference.companyCode = Form.getValue(this.glReferenceForm, 'companyCode');
                generalLedgerReference.glRefCode = Form.getValue(this.glReferenceForm, 'glReferenceCode');
                generalLedgerReference.creditGlNumber1 = Form.getValue(this.glReferenceForm, 'creditAccount001');
                generalLedgerReference.creditGlNumber2 = Form.getValue(this.glReferenceForm, 'creditAccount002');
                generalLedgerReference.admFeeExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount001');
                generalLedgerReference.admFeePayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount001');
                generalLedgerReference.advPayPrepaidExpenseAcc = Form.getValue(this.glReferenceForm, 'prepaidExpAc');
                generalLedgerReference.penaltyExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount002');
                generalLedgerReference.advPayPayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount002');
                generalLedgerReference.penaltyPayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount003');
                generalLedgerReference.incentiveExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount003');
                generalLedgerReference.incentivePayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount004');
                generalLedgerReference.userDefined1 = Form.getValue(this.glReferenceForm, 'userDefined1');
                generalLedgerReference.userDefined2 = Form.getValue(this.glReferenceForm, 'userDefined2');
                generalLedgerReference.userDate1 = Form.getValue(this.glReferenceForm, 'userDate1');
                generalLedgerReference.userDate2 = Form.getValue(this.glReferenceForm, 'userDate2');
                this.generalLedgerReferenceService.createGeneralLedgerReference(generalLedgerReference).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editGeneralLedgerReference = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateGeneralLedgerReference(companyCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.glReferenceForm.valid) {
            let generalLedgerReference = new GeneralLedgerReference();
            generalLedgerReference.companyCode = Form.getValue(this.glReferenceForm, 'companyCode');
            generalLedgerReference.glRefCode = Form.getValue(this.glReferenceForm, 'glReferenceCode');
            generalLedgerReference.creditGlNumber1 = Form.getValue(this.glReferenceForm, 'creditAccount001');
            generalLedgerReference.creditGlNumber2 = Form.getValue(this.glReferenceForm, 'creditAccount002');
            generalLedgerReference.admFeeExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount001');
            generalLedgerReference.admFeePayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount001');
            generalLedgerReference.advPayPrepaidExpenseAcc = Form.getValue(this.glReferenceForm, 'prepaidExpAc');
            generalLedgerReference.penaltyExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount002');
            generalLedgerReference.advPayPayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount002');
            generalLedgerReference.penaltyPayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount003');
            generalLedgerReference.incentiveExpenseAcc = Form.getValue(this.glReferenceForm, 'expenseAccount003');
            generalLedgerReference.incentivePayableAcc = Form.getValue(this.glReferenceForm, 'payableAccount004');
            generalLedgerReference.userDefined1 = Form.getValue(this.glReferenceForm, 'userDefined1');
            generalLedgerReference.userDefined2 = Form.getValue(this.glReferenceForm, 'userDefined2');
            generalLedgerReference.userDate1 = Form.getValue(this.glReferenceForm, 'userDate1');
            generalLedgerReference.userDate2 = Form.getValue(this.glReferenceForm, 'userDate2');
            this.generalLedgerReferenceService.updateGeneralLedgerReference(generalLedgerReference, companyCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editGeneralLedgerReference = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveGeneralLedgerReference() {
        if(this.editGeneralLedgerReference) {
            this.updateGeneralLedgerReference(this.generalLedgerReference.companyCode)
        } else {
            this.createGeneralLedgerReference();
        }
    }    deleteGeneralLedgerReference(companyCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.generalLedgerReferenceService.deleteGeneralLedgerReference(companyCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getGeneralLedgerReference(companyCode : string) {
        this.generalLedgerReferenceService.getGeneralLedgerReference(companyCode).subscribe(generalLedgerReference => {
            this.generalLedgerReference = generalLedgerReference;
            this.glReferenceForm.patchValue({
                'companyCode': this.generalLedgerReference.companyCode,
                'glReferenceCode': this.generalLedgerReference.glRefCode,
                'creditAccount001': this.generalLedgerReference.creditGlNumber1,
                'creditAccount002': this.generalLedgerReference.creditGlNumber2,
                'expenseAccount001': this.generalLedgerReference.admFeeExpenseAcc,
                'payableAccount001': this.generalLedgerReference.admFeePayableAcc,
                'prepaidExpAc': this.generalLedgerReference.advPayPrepaidExpenseAcc,
                'expenseAccount002': this.generalLedgerReference.penaltyExpenseAcc,
                'payableAccount002': this.generalLedgerReference.advPayPayableAcc,
                'payableAccount003': this.generalLedgerReference.penaltyPayableAcc,
                'expenseAccount003': this.generalLedgerReference.incentiveExpenseAcc,
                'payableAccount004': this.generalLedgerReference.incentivePayableAcc,
                'userDefined1': this.generalLedgerReference.userDefined1,
                'userDefined2': this.generalLedgerReference.userDefined2,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.generalLedgerReference.userDate1),
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.generalLedgerReference.userDate2),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getGeneralLedgerReferences() {
        this.generalLedgerReferenceService.getGeneralLedgerReferences().subscribe(generalLedgerReferences => {
        this.generalLedgerReferences = generalLedgerReferences;
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
     private generalLedgerReferenceService: GeneralLedgerReferenceService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.glReferenceForm);
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
        this.formValidation = new FormValidation(this.glReferenceForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.glReferenceForm = this.formBuilder.group({
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            glReferenceCode: ['', {updateOn: 'blur', validators: [] }],
            textArea: ['', {updateOn: 'blur', validators: [] }],
            debitAccount001: ['', {updateOn: 'blur', validators: [] }],
            debitAccount002: ['', {updateOn: 'blur', validators: [] }],
            creditAccount001: ['', {updateOn: 'blur', validators: [] }],
            creditAccount002: ['', {updateOn: 'blur', validators: [] }],
            expenseAccount001: ['', {updateOn: 'blur', validators: [] }],
            debitAccount003: ['', {updateOn: 'blur', validators: [] }],
            payableAccount001: ['', {updateOn: 'blur', validators: [] }],
            creditAccount003: ['', {updateOn: 'blur', validators: [] }],
            prepaidExpAc: ['', {updateOn: 'blur', validators: [] }],
            expenseAccount002: ['', {updateOn: 'blur', validators: [] }],
            payableAccount002: ['', {updateOn: 'blur', validators: [] }],
            payableAccount003: ['', {updateOn: 'blur', validators: [] }],
            expenseAccount003: ['', {updateOn: 'blur', validators: [] }],
            expenseAccount004: ['', {updateOn: 'blur', validators: [] }],
            payableAccount004: ['', {updateOn: 'blur', validators: [] }],
            payableAccount005: ['', {updateOn: 'blur', validators: [] }],
            userDefined1: ['', {updateOn: 'blur', validators: [] }],
            userDefined2: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}