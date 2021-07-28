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
import {  VendorTin } from "../../api-models/index"
import {  VendorTinService } from "../../api-services/vendor-tin.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the VendorTinComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'vendortin',
    templateUrl: './vendor-tin.component.html',

})
export class VendorTinComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorTinForm: FormGroup;
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

editVendorTin: boolean;
    vendorTin: VendorTin;
    vendorTins: VendorTin[];
    if (this.secWin.hasInsertPermission()) {
        createVendorTin() {
            this.formValidation.validateForm();
            if(this.vendorTinForm.valid) {
                let vendorTin = new VendorTin();
                vendorTin.vendor1099Flag = Form.getValue(this.vendorTinForm, 'vendorTin');
                vendorTin.address1 = Form.getValue(this.vendorTinForm, 'address1');
                vendorTin.phone = Form.getValue(this.vendorTinForm, 'phoneNo');
                vendorTin.address2 = Form.getValue(this.vendorTinForm, 'address2001');
                vendorTin.ext = Form.getValue(this.vendorTinForm, 'extNo');
                vendorTin.city = Form.getValue(this.vendorTinForm, 'city');
                vendorTin.state = Form.getValue(this.vendorTinForm, 'state');
                vendorTin.zipcode = Form.getValue(this.vendorTinForm, 'zipCode');
                vendorTin.country = Form.getValue(this.vendorTinForm, 'country001');
                vendorTin.county = Form.getValue(this.vendorTinForm, 'country002');
                vendorTin.contact = Form.getValue(this.vendorTinForm, 'contactName');
                vendorTin.title = Form.getValue(this.vendorTinForm, 'title');
                vendorTin.userDefinedDate = Form.getValue(this.vendorTinForm, 'userDefinedDate');
                this.vendorTinService.createVendorTin(vendorTin).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editVendorTin = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateVendorTin(irsTaxId : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.vendorTinForm.valid) {
            let vendorTin = new VendorTin();
            vendorTin.vendor1099Flag = Form.getValue(this.vendorTinForm, 'vendorTin');
            vendorTin.address1 = Form.getValue(this.vendorTinForm, 'address1');
            vendorTin.phone = Form.getValue(this.vendorTinForm, 'phoneNo');
            vendorTin.address2 = Form.getValue(this.vendorTinForm, 'address2001');
            vendorTin.ext = Form.getValue(this.vendorTinForm, 'extNo');
            vendorTin.city = Form.getValue(this.vendorTinForm, 'city');
            vendorTin.state = Form.getValue(this.vendorTinForm, 'state');
            vendorTin.zipcode = Form.getValue(this.vendorTinForm, 'zipCode');
            vendorTin.country = Form.getValue(this.vendorTinForm, 'country001');
            vendorTin.county = Form.getValue(this.vendorTinForm, 'country002');
            vendorTin.contact = Form.getValue(this.vendorTinForm, 'contactName');
            vendorTin.title = Form.getValue(this.vendorTinForm, 'title');
            vendorTin.userDefinedDate = Form.getValue(this.vendorTinForm, 'userDefinedDate');
            this.vendorTinService.updateVendorTin(vendorTin, irsTaxId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editVendorTin = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveVendorTin() {
        if(this.editVendorTin) {
            this.updateVendorTin(this.vendorTin.irsTaxId)
        } else {
            this.createVendorTin();
        }
    }    deleteVendorTin(irsTaxId : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.vendorTinService.deleteVendorTin(irsTaxId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getVendorTin(irsTaxId : string) {
        this.vendorTinService.getVendorTin(irsTaxId).subscribe(vendorTin => {
            this.vendorTin = vendorTin;
            this.vendorTinForm.patchValue({
                'vendorTin': this.vendorTin.vendor1099Flag,
                'address1': this.vendorTin.address1,
                'phoneNo': this.vendorTin.phone,
                'address2001': this.vendorTin.address2,
                'extNo': this.vendorTin.ext,
                'city': this.vendorTin.city,
                'state': this.vendorTin.state,
                'zipCode': this.vendorTin.zipcode,
                'country001': this.vendorTin.country,
                'country002': this.vendorTin.county,
                'contactName': this.vendorTin.contact,
                'title': this.vendorTin.title,
                'userDefinedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorTin.userDefinedDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getVendorTins() {
        this.vendorTinService.getVendorTins().subscribe(vendorTins => {
        this.vendorTins = vendorTins;
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
     private vendorTinService: VendorTinService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorTinForm);
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
        this.formValidation = new FormValidation(this.vendorTinForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorTinForm = this.formBuilder.group({
            vendorTin: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            address1: ['', {updateOn: 'blur', validators: [] }],
            phoneNo: ['', {updateOn: 'blur', validators: [] }],
            address2001: ['', {updateOn: 'blur', validators: [] }],
            extNo: ['', {updateOn: 'blur', validators: [] }],
            address2002: ['', {updateOn: 'blur', validators: [] }],
            faxNo001: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            faxNo002: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            zipCode: ['', {updateOn: 'blur', validators: [] }],
            vendor1099Flag: ['', {updateOn: 'blur', validators: [] }],
            country001: ['', {updateOn: 'blur', validators: [] }],
            country002: ['', {updateOn: 'blur', validators: [] }],
            wcVndrNo: ['', {updateOn: 'blur', validators: [] }],
            contactName: ['', {updateOn: 'blur', validators: [] }],
            w9: ['', {updateOn: 'blur', validators: [] }],
            title: ['', {updateOn: 'blur', validators: [] }],
            userDefinedDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}