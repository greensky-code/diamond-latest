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
import {  AccountsPayable } from "../../api-models/index"
import {  AccountsPayableService } from "../../api-services/accounts.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the AccountsPayableComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountspayable',
    templateUrl: './accounts-payable.component.html',

})
export class AccountsPayableComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountsPayableForm: FormGroup;
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

editAccountsPayable: boolean;
    accountsPayable: AccountsPayable;
    accountsPayables: AccountsPayable[];
    if (this.secWin.hasInsertPermission()) {
        createAccountsPayable() {
            this.formValidation.validateForm();
            if(this.accountsPayableForm.valid) {
                let accountsPayable = new AccountsPayable();
                accountsPayable.seqApTrans = Form.getValue(this.accountsPayableForm, 'apTransactionId');
                accountsPayable.apType = Form.getValue(this.accountsPayableForm, 'claimType');
                accountsPayable.fileType = Form.getValue(this.accountsPayableForm, 'apType');
                accountsPayable.apStatus = Form.getValue(this.accountsPayableForm, 'processingStatus');
                accountsPayable.selectForPayment = Form.getValue(this.accountsPayableForm, 'selectForPayment');
                accountsPayable.printFlag = Form.getValue(this.accountsPayableForm, 'raeobPrintFlag');
                accountsPayable.prePriceOnlyFlag = Form.getValue(this.accountsPayableForm, 'prePriceOnlyFlag');
                accountsPayable.discountWithhold = Form.getValue(this.accountsPayableForm, 'discountWithhold');
                accountsPayable.penaltyAmt = Form.getValue(this.accountsPayableForm, 'penaltyAmt');
                accountsPayable.netAmt = Form.getValue(this.accountsPayableForm, 'netAmt');
                accountsPayable.interestAmt = Form.getValue(this.accountsPayableForm, 'interestAmt');
                accountsPayable.discountAmt = Form.getValue(this.accountsPayableForm, 'discountAmt');
                accountsPayable.paidNetAmt = Form.getValue(this.accountsPayableForm, 'paidNetAmt');
                accountsPayable.seqVendId = Form.getValue(this.accountsPayableForm, 'vendorId');
                accountsPayable.checkEftAmount = Form.getValue(this.accountsPayableForm, 'checleftDt');
                accountsPayable.dueDate = Form.getValue(this.accountsPayableForm, 'dueDate');
                accountsPayable.bankAccountCode = Form.getValue(this.accountsPayableForm, 'bankAccountCode');
                accountsPayable.postedDate = Form.getValue(this.accountsPayableForm, 'postedDate');
                accountsPayable.checkNumber = Form.getValue(this.accountsPayableForm, 'checkNumber');
                accountsPayable.vendor1099Flag = Form.getValue(this.accountsPayableForm, 'vendor1099Flag');
                accountsPayable.eftTransNumber = Form.getValue(this.accountsPayableForm, 'eftTransNumber');
                accountsPayable.offsetFlag = Form.getValue(this.accountsPayableForm, 'offset');
                accountsPayable.companyCode = Form.getValue(this.accountsPayableForm, 'companyCode');
                accountsPayable.glMonth = Form.getValue(this.accountsPayableForm, 'glMonth001');
                accountsPayable.debitGlNumber1 = Form.getValue(this.accountsPayableForm, 'debitGlNo1');
                accountsPayable.debitGlNumber2 = Form.getValue(this.accountsPayableForm, 'debitGlNo2');
                accountsPayable.creditGlNumber1 = Form.getValue(this.accountsPayableForm, 'creditGlNo1');
                accountsPayable.creditGlNumber2 = Form.getValue(this.accountsPayableForm, 'creditGlNo2');
                accountsPayable.capFundModelId = Form.getValue(this.accountsPayableForm, 'capFundModelId');
                accountsPayable.capFundSubModelId = Form.getValue(this.accountsPayableForm, 'capFundSubModelId');
                accountsPayable.capFundWithholdAmt = Form.getValue(this.accountsPayableForm, 'withholdAmt');
                this.accountsPayableService.createAccountsPayable(accountsPayable).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAccountsPayable = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAccountsPayable(seqApTrans : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.accountsPayableForm.valid) {
            let accountsPayable = new AccountsPayable();
            accountsPayable.seqApTrans = Form.getValue(this.accountsPayableForm, 'apTransactionId');
            accountsPayable.apType = Form.getValue(this.accountsPayableForm, 'claimType');
            accountsPayable.fileType = Form.getValue(this.accountsPayableForm, 'apType');
            accountsPayable.apStatus = Form.getValue(this.accountsPayableForm, 'processingStatus');
            accountsPayable.selectForPayment = Form.getValue(this.accountsPayableForm, 'selectForPayment');
            accountsPayable.printFlag = Form.getValue(this.accountsPayableForm, 'raeobPrintFlag');
            accountsPayable.prePriceOnlyFlag = Form.getValue(this.accountsPayableForm, 'prePriceOnlyFlag');
            accountsPayable.discountWithhold = Form.getValue(this.accountsPayableForm, 'discountWithhold');
            accountsPayable.penaltyAmt = Form.getValue(this.accountsPayableForm, 'penaltyAmt');
            accountsPayable.netAmt = Form.getValue(this.accountsPayableForm, 'netAmt');
            accountsPayable.interestAmt = Form.getValue(this.accountsPayableForm, 'interestAmt');
            accountsPayable.discountAmt = Form.getValue(this.accountsPayableForm, 'discountAmt');
            accountsPayable.paidNetAmt = Form.getValue(this.accountsPayableForm, 'paidNetAmt');
            accountsPayable.seqVendId = Form.getValue(this.accountsPayableForm, 'vendorId');
            accountsPayable.checkEftAmount = Form.getValue(this.accountsPayableForm, 'checleftDt');
            accountsPayable.dueDate = Form.getValue(this.accountsPayableForm, 'dueDate');
            accountsPayable.bankAccountCode = Form.getValue(this.accountsPayableForm, 'bankAccountCode');
            accountsPayable.postedDate = Form.getValue(this.accountsPayableForm, 'postedDate');
            accountsPayable.checkNumber = Form.getValue(this.accountsPayableForm, 'checkNumber');
            accountsPayable.vendor1099Flag = Form.getValue(this.accountsPayableForm, 'vendor1099Flag');
            accountsPayable.eftTransNumber = Form.getValue(this.accountsPayableForm, 'eftTransNumber');
            accountsPayable.offsetFlag = Form.getValue(this.accountsPayableForm, 'offset');
            accountsPayable.companyCode = Form.getValue(this.accountsPayableForm, 'companyCode');
            accountsPayable.glMonth = Form.getValue(this.accountsPayableForm, 'glMonth001');
            accountsPayable.debitGlNumber1 = Form.getValue(this.accountsPayableForm, 'debitGlNo1');
            accountsPayable.debitGlNumber2 = Form.getValue(this.accountsPayableForm, 'debitGlNo2');
            accountsPayable.creditGlNumber1 = Form.getValue(this.accountsPayableForm, 'creditGlNo1');
            accountsPayable.creditGlNumber2 = Form.getValue(this.accountsPayableForm, 'creditGlNo2');
            accountsPayable.capFundModelId = Form.getValue(this.accountsPayableForm, 'capFundModelId');
            accountsPayable.capFundSubModelId = Form.getValue(this.accountsPayableForm, 'capFundSubModelId');
            accountsPayable.capFundWithholdAmt = Form.getValue(this.accountsPayableForm, 'withholdAmt');
            this.accountsPayableService.updateAccountsPayable(accountsPayable, seqApTrans).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAccountsPayable = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }    saveAccountsPayable() {
        if(this.editAccountsPayable) {
            this.updateAccountsPayable(this.accountsPayable.seqApTrans)
        } else {
            this.createAccountsPayable();
        }
    }    deleteAccountsPayable(seqApTrans : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.accountsPayableService.deleteAccountsPayable(seqApTrans).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAccountsPayable(seqApTrans : number) {
        this.accountsPayableService.getAccountsPayable(seqApTrans).subscribe(accountsPayable => {
            this.accountsPayable = accountsPayable;
            this.accountsPayableForm.patchValue({
                'apTransactionId': this.accountsPayable.seqApTrans,
                'claimType': this.accountsPayable.apType,
                'apType': this.accountsPayable.fileType,
                'processingStatus': this.accountsPayable.apStatus,
                'selectForPayment': this.accountsPayable.selectForPayment,
                'raeobPrintFlag': this.accountsPayable.printFlag,
                'prePriceOnlyFlag': this.accountsPayable.prePriceOnlyFlag,
                'discountWithhold': this.accountsPayable.discountWithhold,
                'penaltyAmt': this.accountsPayable.penaltyAmt,
                'netAmt': this.accountsPayable.netAmt,
                'interestAmt': this.accountsPayable.interestAmt,
                'discountAmt': this.accountsPayable.discountAmt,
                'paidNetAmt': this.accountsPayable.paidNetAmt,
                'vendorId': this.accountsPayable.seqVendId,
                'checleftDt': this.accountsPayable.checkEftAmount,
                'dueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.accountsPayable.dueDate),
                'bankAccountCode': this.accountsPayable.bankAccountCode,
                'postedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.accountsPayable.postedDate),
                'checkNumber': this.accountsPayable.checkNumber,
                'vendor1099Flag': this.accountsPayable.vendor1099Flag,
                'eftTransNumber': this.accountsPayable.eftTransNumber,
                'offset': this.accountsPayable.offsetFlag,
                'companyCode': this.accountsPayable.companyCode,
                'glMonth001': this.dateFormatPipe.defaultDisplayDateFormat(this.accountsPayable.glMonth),
                'debitGlNo1': this.accountsPayable.debitGlNumber1,
                'debitGlNo2': this.accountsPayable.debitGlNumber2,
                'creditGlNo1': this.accountsPayable.creditGlNumber1,
                'creditGlNo2': this.accountsPayable.creditGlNumber2,
                'capFundModelId': this.accountsPayable.capFundModelId,
                'capFundSubModelId': this.accountsPayable.capFundSubModelId,
                'withholdAmt': this.accountsPayable.capFundWithholdAmt,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAccountsPayables() {
        this.accountsPayableService.getAccountsPayables().subscribe(accountsPayables => {
        this.accountsPayables = accountsPayables;
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
     private accountsPayableService: AccountsPayableService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableForm);
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
        this.formValidation = new FormValidation(this.accountsPayableForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountsPayableForm = this.formBuilder.group({
            apTransactionId: ['', {updateOn: 'blur', validators: [] }],
            claimType: ['', {updateOn: 'blur', validators: [] }],
            apType: ['', {updateOn: 'blur', validators: [] }],
            processingStatus: ['', {updateOn: 'blur', validators: [] }],
            selectForPayment: ['', {updateOn: 'blur', validators: [] }],
            raeobPrintFlag: ['', {updateOn: 'blur', validators: [] }],
            prePriceOnlyFlag: ['', {updateOn: 'blur', validators: [] }],
            discountWithhold: ['', {updateOn: 'blur', validators: [] }],
            penaltyAmt: ['', {updateOn: 'blur', validators: [] }],
            netAmt: ['', {updateOn: 'blur', validators: [] }],
            interestAmt: ['', {updateOn: 'blur', validators: [] }],
            discountAmt: ['', {updateOn: 'blur', validators: [] }],
            paidNetAmt: ['', {updateOn: 'blur', validators: [] }],
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            checleftDt: ['', {updateOn: 'blur', validators: [] }],
            addressLine1: ['', {updateOn: 'blur', validators: [] }],
            dueDate: ['', {updateOn: 'blur', validators: [] }],
            bankAccountCode: ['', {updateOn: 'blur', validators: [] }],
            postedDate: ['', {updateOn: 'blur', validators: [] }],
            checkNumber: ['', {updateOn: 'blur', validators: [] }],
            vendor1099Flag: ['', {updateOn: 'blur', validators: [] }],
            eftTransNumber: ['', {updateOn: 'blur', validators: [] }],
            offset: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            glMonth001: ['', {updateOn: 'blur', validators: [] }],
            glMonth002: ['', {updateOn: 'blur', validators: [] }],
            debitGlNo1: ['', {updateOn: 'blur', validators: [] }],
            debitGlNo2: ['', {updateOn: 'blur', validators: [] }],
            creditGlNo1: ['', {updateOn: 'blur', validators: [] }],
            creditGlNo2: ['', {updateOn: 'blur', validators: [] }],
            capFundModelId: ['', {updateOn: 'blur', validators: [] }],
            capFundSubModelId: ['', {updateOn: 'blur', validators: [] }],
            withholdAmt: ['', {updateOn: 'blur', validators: [] }],
            additionalInfoExists: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
