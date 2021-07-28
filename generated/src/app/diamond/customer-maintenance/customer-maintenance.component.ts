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
import {  PmbArCustomerMaster } from "../../api-models/index"
import {  PmbArCustomerMasterService } from "../../api-services/pmb-ar-customer-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the CustomerMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'customermaintenance',
    templateUrl: './customer-maintenance.component.html',

})
export class CustomerMaintenanceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    customerMaintenanceForm: FormGroup;
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

editPmbArCustomerMaster: boolean;
    pmbArCustomerMaster: PmbArCustomerMaster;
    pmbArCustomerMasters: PmbArCustomerMaster[];
    if (this.secWin.hasInsertPermission()) {
        createPmbArCustomerMaster() {
            this.formValidation.validateForm();
            if(this.customerMaintenanceForm.valid) {
                let pmbArCustomerMaster = new PmbArCustomerMaster();
                pmbArCustomerMaster.customerId = Form.getValue(this.customerMaintenanceForm, 'customerId');
                pmbArCustomerMaster.shortName = Form.getValue(this.customerMaintenanceForm, 'shortName');
                pmbArCustomerMaster.customerName1 = Form.getValue(this.customerMaintenanceForm, 'customerName1');
                pmbArCustomerMaster.customerName2 = Form.getValue(this.customerMaintenanceForm, 'customerName2');
                pmbArCustomerMaster.customerCity = Form.getValue(this.customerMaintenanceForm, 'city');
                this.pmbArCustomerMasterService.createPmbArCustomerMaster(pmbArCustomerMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPmbArCustomerMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePmbArCustomerMaster(customerType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.customerMaintenanceForm.valid) {
            let pmbArCustomerMaster = new PmbArCustomerMaster();
            pmbArCustomerMaster.customerId = Form.getValue(this.customerMaintenanceForm, 'customerId');
            pmbArCustomerMaster.shortName = Form.getValue(this.customerMaintenanceForm, 'shortName');
            pmbArCustomerMaster.customerName1 = Form.getValue(this.customerMaintenanceForm, 'customerName1');
            pmbArCustomerMaster.customerName2 = Form.getValue(this.customerMaintenanceForm, 'customerName2');
            pmbArCustomerMaster.customerCity = Form.getValue(this.customerMaintenanceForm, 'city');
            this.pmbArCustomerMasterService.updatePmbArCustomerMaster(pmbArCustomerMaster, customerType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPmbArCustomerMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePmbArCustomerMaster() {
        if(this.editPmbArCustomerMaster) {
            this.updatePmbArCustomerMaster(this.pmbArCustomerMaster.customerType)
        } else {
            this.createPmbArCustomerMaster();
        }
    }    deletePmbArCustomerMaster(customerType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbArCustomerMasterService.deletePmbArCustomerMaster(customerType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPmbArCustomerMaster(customerType : string) {
        this.pmbArCustomerMasterService.getPmbArCustomerMaster(customerType).subscribe(pmbArCustomerMaster => {
            this.pmbArCustomerMaster = pmbArCustomerMaster;
            this.customerMaintenanceForm.patchValue({
                'customerId': this.pmbArCustomerMaster.customerId,
                'shortName': this.pmbArCustomerMaster.shortName,
                'customerName1': this.pmbArCustomerMaster.customerName1,
                'customerName2': this.pmbArCustomerMaster.customerName2,
                'city': this.pmbArCustomerMaster.customerCity,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPmbArCustomerMasters() {
        this.pmbArCustomerMasterService.getPmbArCustomerMasters().subscribe(pmbArCustomerMasters => {
        this.pmbArCustomerMasters = pmbArCustomerMasters;
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
     private pmbArCustomerMasterService: PmbArCustomerMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.customerMaintenanceForm);
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
        this.formValidation = new FormValidation(this.customerMaintenanceForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.customerMaintenanceForm = this.formBuilder.group({
            customerId: ['', {updateOn: 'blur', validators: [] }],
            type: ['', {updateOn: 'blur', validators: [] }],
            shortName: ['', {updateOn: 'blur', validators: [] }],
            customerName1: ['', {updateOn: 'blur', validators: [] }],
            customerName2: ['', {updateOn: 'blur', validators: [] }],
            address1: ['', {updateOn: 'blur', validators: [] }],
            address2: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            stateprov: ['', {updateOn: 'blur', validators: [] }],
            zippost: ['', {updateOn: 'blur', validators: [] }],
            premAnalyst: ['', {updateOn: 'blur', validators: [] }],
            billType: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}