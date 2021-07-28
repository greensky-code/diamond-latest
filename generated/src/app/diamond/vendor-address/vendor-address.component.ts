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
import {  VendorAddress } from "../../api-models/index"
import {  VendorAddressService } from "../../api-services/vendor-address.service"
import {  GroupContactPerson } from "../../api-models/index"
import {  GroupContactPersonService } from "../../api-services/group-contact-person.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the VendorAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'vendoraddress',
    templateUrl: './vendor-address.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        VendorAddressService
        GroupContactPersonService
]

})
export class VendorAddressComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorAddressForm: FormGroup;
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

editVendorAddress: boolean;
    vendorAddress: VendorAddress;
    vendorAddresses: VendorAddress[];editGroupContactPerson: boolean;
    groupContactPerson: GroupContactPerson;
    groupContactPersons: GroupContactPerson[];
    createVendorAddress() {
        this.formValidation.validateForm();
        if(this.vendorAddressForm.valid) {
            let vendorAddress = new VendorAddress();
            vendorAddress.name2 = Form.getValue(this.this.vendorAddressForm, 'name2');
            vendorAddress.addressLine2 = Form.getValue(this.this.vendorAddressForm, 'addressLine2');
            vendorAddress.city = Form.getValue(this.this.vendorAddressForm, 'city');
            vendorAddress.country = Form.getValue(this.this.vendorAddressForm, 'country001');
            vendorAddress.state = Form.getValue(this.this.vendorAddressForm, 'state');
            vendorAddress.zipCode = Form.getValue(this.this.vendorAddressForm, 'zipCode');
            vendorAddress.county = Form.getValue(this.this.vendorAddressForm, 'country002');
            vendorAddress.seqVendAddress = Form.getValue(this.this.vendorAddressForm, 'billingOverrideAddress');
            vendorAddress.primaryAddress = Form.getValue(this.this.vendorAddressForm, 'primAddr');
            vendorAddress.userDefined1 = Form.getValue(this.this.vendorAddressForm, 'userDefine1');
            vendorAddress.userDefined2 = Form.getValue(this.this.vendorAddressForm, 'userDefine2');
            vendorAddress.userDate2 = Form.getValue(this.this.vendorAddressForm, 'userDate1');
            vendorAddress.userDefinedDate = Form.getValue(this.this.vendorAddressForm, 'userDate2');
            this.vendorAddressService.createVendorAddress(vendorAddress).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editVendorAddress = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateVendorAddress(seqVendAddress : number) {
        this.formValidation.validateForm();
        if(this.vendorAddressForm.valid) {
            let vendorAddress = new VendorAddress();
            vendorAddress.name2 = Form.getValue(this.this.vendorAddressForm, 'name2');
            vendorAddress.addressLine2 = Form.getValue(this.this.vendorAddressForm, 'addressLine2');
            vendorAddress.city = Form.getValue(this.this.vendorAddressForm, 'city');
            vendorAddress.country = Form.getValue(this.this.vendorAddressForm, 'country001');
            vendorAddress.state = Form.getValue(this.this.vendorAddressForm, 'state');
            vendorAddress.zipCode = Form.getValue(this.this.vendorAddressForm, 'zipCode');
            vendorAddress.county = Form.getValue(this.this.vendorAddressForm, 'country002');
            vendorAddress.seqVendAddress = Form.getValue(this.this.vendorAddressForm, 'billingOverrideAddress');
            vendorAddress.primaryAddress = Form.getValue(this.this.vendorAddressForm, 'primAddr');
            vendorAddress.userDefined1 = Form.getValue(this.this.vendorAddressForm, 'userDefine1');
            vendorAddress.userDefined2 = Form.getValue(this.this.vendorAddressForm, 'userDefine2');
            vendorAddress.userDate2 = Form.getValue(this.this.vendorAddressForm, 'userDate1');
            vendorAddress.userDefinedDate = Form.getValue(this.this.vendorAddressForm, 'userDate2');
            this.vendorAddressService.updateVendorAddress(vendorAddress, seqVendAddress).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editVendorAddress = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveVendorAddress() {
        if(this.editVendorAddress) {
            this.updateVendorAddress(this.vendorAddress.seqVendAddress)
        } else {
            this.createVendorAddress();
        }
    }    deleteVendorAddress(seqVendAddress : number) {
        this.vendorAddressService.deleteVendorAddress(seqVendAddress).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getVendorAddress(seqVendAddress : number) {
        this.vendorAddressService.getVendorAddress(seqVendAddress).subscribe(vendorAddress => {
            this.vendorAddress = vendorAddress;
            this.vendorAddressForm.patchValue({
                'name2': this.vendorAddress.name2,
                'addressLine2': this.vendorAddress.addressLine2,
                'city': this.vendorAddress.city,
                'country001': this.vendorAddress.country,
                'state': this.vendorAddress.state,
                'zipCode': this.vendorAddress.zipCode,
                'country002': this.vendorAddress.county,
                'billingOverrideAddress': this.vendorAddress.seqVendAddress,
                'primAddr': this.vendorAddress.primaryAddress,
                'userDefine1': this.vendorAddress.userDefined1,
                'userDefine2': this.vendorAddress.userDefined2,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAddress.userDate2),
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.vendorAddress.userDefinedDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getVendorAddresses() {
        this.vendorAddressService.getVendorAddresses().subscribe(vendorAddresses => {
        this.vendorAddresses = vendorAddresses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createGroupContactPerson() {
        this.formValidation.validateForm();
        if(this.vendorAddressForm.valid) {
            let groupContactPerson = new GroupContactPerson();
            this.groupContactPersonService.createGroupContactPerson(groupContactPerson).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editGroupContactPerson = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateGroupContactPerson(seqGroupId : number) {
        this.formValidation.validateForm();
        if(this.vendorAddressForm.valid) {
            let groupContactPerson = new GroupContactPerson();
            this.groupContactPersonService.updateGroupContactPerson(groupContactPerson, seqGroupId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editGroupContactPerson = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveGroupContactPerson() {
        if(this.editGroupContactPerson) {
            this.updateGroupContactPerson(this.groupContactPerson.seqGroupId)
        } else {
            this.createGroupContactPerson();
        }
    }    deleteGroupContactPerson(seqGroupId : number) {
        this.groupContactPersonService.deleteGroupContactPerson(seqGroupId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getGroupContactPerson(seqGroupId : number) {
        this.groupContactPersonService.getGroupContactPerson(seqGroupId).subscribe(groupContactPerson => {
            this.groupContactPerson = groupContactPerson;
            this.vendorAddressForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getGroupContactPersons() {
        this.groupContactPersonService.getGroupContactPersons().subscribe(groupContactPersons => {
        this.groupContactPersons = groupContactPersons;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Name 2",
             field: "name2",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Address Line 1",
             field: "addressline1",
             width: 200         },
         {
             headerName: "City",
             field: "city",
             width: 200         },
         {
             headerName: "County",
             field: "county",
             width: 200         },
         {
             headerName: "State",
             field: "state",
             width: 200         },
         {
             headerName: "ZIP Code",
             field: "zipcode",
             width: 200         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "Contact Name",
             field: "contactname",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Title",
             field: "contacttitle",
             width: 200         },
         {
             headerName: "Phone Number",
             field: "phonenumber",
             width: 200         },
         {
             headerName: "Ext No.",
             field: "extension",
             width: 200         },
         {
             headerName: "AL Dist. Meth.",
             field: "primarydistributionmethod",
             width: 200         },
         {
             headerName: "Email ID",
             field: "emailid",
             width: 200         },
         {
             headerName: "Fax Number",
             field: "faxnumber",
             width: 200         }
      ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
     private vendorAddressService: VendorAddressService, private groupContactPersonService: GroupContactPersonService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.vendorAddressForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.vendorAddressForm = this.formBuilder.group({
            name2: ['', {updateOn: 'blur', validators: [] }],
            addressLine2: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            country001: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            zipCode: ['', {updateOn: 'blur', validators: [] }],
            country002: ['', {updateOn: 'blur', validators: [] }],
            billingOverrideAddress: ['', {updateOn: 'blur', validators: [] }],
            primAddr: ['', {updateOn: 'blur', validators: [] }],
            userDefine1: ['', {updateOn: 'blur', validators: [] }],
            userDefine2: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}