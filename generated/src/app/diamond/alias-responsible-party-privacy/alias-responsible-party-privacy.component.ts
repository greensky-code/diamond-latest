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
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the AliasResponsiblePartyPrivacyComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'aliasresponsiblepartyprivacy',
    templateUrl: './alias-responsible-party-privacy.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
]

})
export class AliasResponsiblePartyPrivacyComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    aliasResponsiblePartyPrivacyForm: FormGroup;
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
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Last",
             field: "",
             width: 200         },
         {
             headerName: "First",
             field: "",
             width: 200         },
         {
             headerName: "DOB",
             field: "",
             width: 200         },
         {
             headerName: "Gender",
             field: "",
             width: 200         },
         {
             headerName: "Employee Number",
             field: "",
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
             headerName: "Contact Source",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Distr Method",
             field: "",
             width: 200         },
         {
             headerName: "Email Id",
             field: "",
             width: 200         },
         {
             headerName: "Fax Number",
             field: "",
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
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.aliasResponsiblePartyPrivacyForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.aliasResponsiblePartyPrivacyForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            subscriberId: ['', {updateOn: 'blur', validators: [] }],
            lastName001: ['', {updateOn: 'blur', validators: [] }],
            first001: ['', {updateOn: 'blur', validators: [] }],
            addr1001: ['', {updateOn: 'blur', validators: [] }],
            addr2001: ['', {updateOn: 'blur', validators: [] }],
            city001: ['', {updateOn: 'blur', validators: [] }],
            state001: ['', {updateOn: 'blur', validators: [] }],
            zipCode001: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber001: ['', {updateOn: 'blur', validators: [] }],
            country001: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            lastName002: ['', {updateOn: 'blur', validators: [] }],
            first002: ['', {updateOn: 'blur', validators: [] }],
            addr1002: ['', {updateOn: 'blur', validators: [] }],
            addr2002: ['', {updateOn: 'blur', validators: [] }],
            city002: ['', {updateOn: 'blur', validators: [] }],
            state002: ['', {updateOn: 'blur', validators: [] }],
            zipCode002: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber002: ['', {updateOn: 'blur', validators: [] }],
            country002: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            lastName003: ['', {updateOn: 'blur', validators: [] }],
            first003: ['', {updateOn: 'blur', validators: [] }],
            addr1003: ['', {updateOn: 'blur', validators: [] }],
            addr2003: ['', {updateOn: 'blur', validators: [] }],
            city003: ['', {updateOn: 'blur', validators: [] }],
            state003: ['', {updateOn: 'blur', validators: [] }],
            zipCode003: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber003: ['', {updateOn: 'blur', validators: [] }],
            country003: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}