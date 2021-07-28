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
import {  TradingPartnerMaster } from "../../api-models/index"
import {  TradingPartnerMasterService } from "../../api-services/trading-partner-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the SubmitterMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'submittermaster',
    templateUrl: './submitter-master.component.html',

})
export class SubmitterMasterComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    submitterMasterForm: FormGroup;
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

editTradingPartnerMaster: boolean;
    tradingPartnerMaster: TradingPartnerMaster;
    tradingPartnerMasters: TradingPartnerMaster[];
    if (this.secWin.hasInsertPermission()) {
        createTradingPartnerMaster() {
            this.formValidation.validateForm();
            if(this.submitterMasterForm.valid) {
                let tradingPartnerMaster = new TradingPartnerMaster();
                tradingPartnerMaster.tradingPartnerType = Form.getValue(this.submitterMasterForm, 'tradingPartnerType');
                tradingPartnerMaster.contactName = Form.getValue(this.submitterMasterForm, 'submitterName');
                tradingPartnerMaster.addressLine1 = Form.getValue(this.submitterMasterForm, 'addressLine1');
                tradingPartnerMaster.addressLine2 = Form.getValue(this.submitterMasterForm, 'addressLine2');
                tradingPartnerMaster.city = Form.getValue(this.submitterMasterForm, 'city');
                tradingPartnerMaster.zipCode = Form.getValue(this.submitterMasterForm, 'zipCode');
                tradingPartnerMaster.state = Form.getValue(this.submitterMasterForm, 'state');
                tradingPartnerMaster.country = Form.getValue(this.submitterMasterForm, 'country');
                tradingPartnerMaster.phoneNumber = Form.getValue(this.submitterMasterForm, 'phoneNumber');
                tradingPartnerMaster.faxNumber = Form.getValue(this.submitterMasterForm, 'faxNumber');
                tradingPartnerMaster.userDefined5 = Form.getValue(this.submitterMasterForm, 'userDefined5');
                tradingPartnerMaster.userDefined6 = Form.getValue(this.submitterMasterForm, 'userDefined6');
                tradingPartnerMaster.userDefined7 = Form.getValue(this.submitterMasterForm, 'userDefined7');
                this.tradingPartnerMasterService.createTradingPartnerMaster(tradingPartnerMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editTradingPartnerMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateTradingPartnerMaster(tradingPartnerId : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.submitterMasterForm.valid) {
            let tradingPartnerMaster = new TradingPartnerMaster();
            tradingPartnerMaster.tradingPartnerType = Form.getValue(this.submitterMasterForm, 'tradingPartnerType');
            tradingPartnerMaster.contactName = Form.getValue(this.submitterMasterForm, 'submitterName');
            tradingPartnerMaster.addressLine1 = Form.getValue(this.submitterMasterForm, 'addressLine1');
            tradingPartnerMaster.addressLine2 = Form.getValue(this.submitterMasterForm, 'addressLine2');
            tradingPartnerMaster.city = Form.getValue(this.submitterMasterForm, 'city');
            tradingPartnerMaster.zipCode = Form.getValue(this.submitterMasterForm, 'zipCode');
            tradingPartnerMaster.state = Form.getValue(this.submitterMasterForm, 'state');
            tradingPartnerMaster.country = Form.getValue(this.submitterMasterForm, 'country');
            tradingPartnerMaster.phoneNumber = Form.getValue(this.submitterMasterForm, 'phoneNumber');
            tradingPartnerMaster.faxNumber = Form.getValue(this.submitterMasterForm, 'faxNumber');
            tradingPartnerMaster.userDefined5 = Form.getValue(this.submitterMasterForm, 'userDefined5');
            tradingPartnerMaster.userDefined6 = Form.getValue(this.submitterMasterForm, 'userDefined6');
            tradingPartnerMaster.userDefined7 = Form.getValue(this.submitterMasterForm, 'userDefined7');
            this.tradingPartnerMasterService.updateTradingPartnerMaster(tradingPartnerMaster, tradingPartnerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editTradingPartnerMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveTradingPartnerMaster() {
        if(this.editTradingPartnerMaster) {
            this.updateTradingPartnerMaster(this.tradingPartnerMaster.tradingPartnerId)
        } else {
            this.createTradingPartnerMaster();
        }
    }    deleteTradingPartnerMaster(tradingPartnerId : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.tradingPartnerMasterService.deleteTradingPartnerMaster(tradingPartnerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getTradingPartnerMaster(tradingPartnerId : string) {
        this.tradingPartnerMasterService.getTradingPartnerMaster(tradingPartnerId).subscribe(tradingPartnerMaster => {
            this.tradingPartnerMaster = tradingPartnerMaster;
            this.submitterMasterForm.patchValue({
                'tradingPartnerType': this.tradingPartnerMaster.tradingPartnerType,
                'submitterName': this.tradingPartnerMaster.contactName,
                'addressLine1': this.tradingPartnerMaster.addressLine1,
                'addressLine2': this.tradingPartnerMaster.addressLine2,
                'city': this.tradingPartnerMaster.city,
                'zipCode': this.tradingPartnerMaster.zipCode,
                'state': this.tradingPartnerMaster.state,
                'country': this.tradingPartnerMaster.country,
                'phoneNumber': this.tradingPartnerMaster.phoneNumber,
                'faxNumber': this.tradingPartnerMaster.faxNumber,
                'userDefined5': this.tradingPartnerMaster.userDefined5,
                'userDefined6': this.tradingPartnerMaster.userDefined6,
                'userDefined7': this.tradingPartnerMaster.userDefined7,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getTradingPartnerMasters() {
        this.tradingPartnerMasterService.getTradingPartnerMasters().subscribe(tradingPartnerMasters => {
        this.tradingPartnerMasters = tradingPartnerMasters;
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
     private tradingPartnerMasterService: TradingPartnerMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.submitterMasterForm);
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
        this.formValidation = new FormValidation(this.submitterMasterForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.submitterMasterForm = this.formBuilder.group({
            submitterId: ['', {updateOn: 'blur', validators: [] }],
            tradingPartnerType: ['', {updateOn: 'blur', validators: [] }],
            submitterName: ['', {updateOn: 'blur', validators: [] }],
            addressLine1: ['', {updateOn: 'blur', validators: [] }],
            addressLine2: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            zipCode: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            country: ['', {updateOn: 'blur', validators: [] }],
            contactName: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber: ['', {updateOn: 'blur', validators: [] }],
            title: ['', {updateOn: 'blur', validators: [] }],
            faxNumber: ['', {updateOn: 'blur', validators: [] }],
            computerDailupNo: ['', {updateOn: 'blur', validators: [] }],
            modemMake: ['', {updateOn: 'blur', validators: [] }],
            modemSpeed: ['', {updateOn: 'blur', validators: [] }],
            modemModel: ['', {updateOn: 'blur', validators: [] }],
            externalReference: ['', {updateOn: 'blur', validators: [] }],
            fileLayout: ['', {updateOn: 'blur', validators: [] }],
            userDefined5: ['', {updateOn: 'blur', validators: [] }],
            fileFrequency: ['', {updateOn: 'blur', validators: [] }],
            userDefined6: ['', {updateOn: 'blur', validators: [] }],
            fileType: ['', {updateOn: 'blur', validators: [] }],
            userDefined7: ['', {updateOn: 'blur', validators: [] }],
            mediaType: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}