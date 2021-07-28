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
import {  MemberMaster } from "../../api-models/index"
import {  MemberMasterService } from "../../api-services/member-master.service"
import {  MemberAddress } from "../../api-models/index"
import {  MemberAddressService } from "../../api-services/member-address.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the MemberAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'memberaddress',
    templateUrl: './member-address.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
        MemberAddressService
]

})
export class MemberAddressComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    memberAddressForm: FormGroup;
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

editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];editMemberAddress: boolean;
    memberAddress: MemberAddress;
    memberAddresses: MemberAddress[];
    createMemberMaster() {
        this.formValidation.validateForm();
        if(this.memberAddressForm.valid) {
            let memberMaster = new MemberMaster();
            this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberMaster(seqMembId : number) {
        this.formValidation.validateForm();
        if(this.memberAddressForm.valid) {
            let memberMaster = new MemberMaster();
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberMaster() {
        if(this.editMemberMaster) {
            this.updateMemberMaster(this.memberMaster.seqMembId)
        } else {
            this.createMemberMaster();
        }
    }    deleteMemberMaster(seqMembId : number) {
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberMaster(seqMembId : number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.memberAddressForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
        this.memberMasters = memberMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createMemberAddress() {
        this.formValidation.validateForm();
        if(this.memberAddressForm.valid) {
            let memberAddress = new MemberAddress();
            this.memberAddressService.createMemberAddress(memberAddress).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberAddress = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberAddress(seqMembId : number) {
        this.formValidation.validateForm();
        if(this.memberAddressForm.valid) {
            let memberAddress = new MemberAddress();
            this.memberAddressService.updateMemberAddress(memberAddress, seqMembId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberAddress = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberAddress() {
        if(this.editMemberAddress) {
            this.updateMemberAddress(this.memberAddress.seqMembId)
        } else {
            this.createMemberAddress();
        }
    }    deleteMemberAddress(seqMembId : number) {
        this.memberAddressService.deleteMemberAddress(seqMembId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberAddress(seqMembId : number) {
        this.memberAddressService.getMemberAddress(seqMembId).subscribe(memberAddress => {
            this.memberAddress = memberAddress;
            this.memberAddressForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberAddresses() {
        this.memberAddressService.getMemberAddresses().subscribe(memberAddresses => {
        this.memberAddresses = memberAddresses;
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
             headerName: "Person No",
             field: "personnumber",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Last",
             field: "lastname",
             width: 200         },
         {
             headerName: "First",
             field: "firstname",
             width: 200         },
         {
             headerName: "DOB",
             field: "",
             width: 200         },
         {
             headerName: "Gender",
             field: "gender",
             width: 200         },
         {
             headerName: "Employee Number",
             field: "employeeno",
             width: 200         },
         {
             headerName: "Citizenship",
             field: "",
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
             headerName: "Person No",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Add Type",
             field: "addresstype",
             width: 200         },
         {
             headerName: "Last Name",
             field: "lastname",
             width: 200         },
         {
             headerName: "Address line 1",
             field: "addressline1",
             width: 200         },
         {
             headerName: "City",
             field: "city",
             width: 200         },
         {
             headerName: "Country",
             field: "country",
             width: 200         },
         {
             headerName: "State",
             field: "state",
             width: 200         },
         {
             headerName: "Zip Code",
             field: "zipcode",
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
     private memberMasterService: MemberMasterService, private memberAddressService: MemberAddressService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberAddressForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberAddressForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            subscriberId: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}