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
import {  DeterminantValues } from "../../api-models/index"
import {  DeterminantValuesService } from "../../api-services/determinant-values.service"
import {  DeterminantTables } from "../../api-models/index"
import {  DeterminantTablesService } from "../../api-services/determinant-tables.service"
import {  DeterminantRules } from "../../api-models/index"
import {  DeterminantRulesService } from "../../api-services/determinant-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the CobOrderLiabilityComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'coborderliability',
    templateUrl: './cob-order-liability.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DeterminantValuesService
        DeterminantTablesService
        DeterminantRulesService
]

})
export class CobOrderLiabilityComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    cobOrderLiabilityForm: FormGroup;
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

editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];editDeterminantRules: boolean;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];
    createDeterminantValues() {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantValues = new DeterminantValues();
            this.determinantValuesService.createDeterminantValues(determinantValues).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDeterminantValues = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDeterminantValues(keyword : string) {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantValues = new DeterminantValues();
            this.determinantValuesService.updateDeterminantValues(determinantValues, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantValues = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveDeterminantValues() {
        if(this.editDeterminantValues) {
            this.updateDeterminantValues(this.determinantValues.keyword)
        } else {
            this.createDeterminantValues();
        }
    }    deleteDeterminantValues(keyword : string) {
        this.determinantValuesService.deleteDeterminantValues(keyword).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getDeterminantValues(keyword : string) {
        this.determinantValuesService.getDeterminantValues(keyword).subscribe(determinantValues => {
            this.determinantValues = determinantValues;
            this.cobOrderLiabilityForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantValueses() {
        this.determinantValuesService.getDeterminantValueses().subscribe(determinantValueses => {
        this.determinantValueses = determinantValueses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createDeterminantTables() {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantTables = new DeterminantTables();
            this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDeterminantTables = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDeterminantTables(keyword : string) {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantTables = new DeterminantTables();
            this.determinantTablesService.updateDeterminantTables(determinantTables, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantTables = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveDeterminantTables() {
        if(this.editDeterminantTables) {
            this.updateDeterminantTables(this.determinantTables.keyword)
        } else {
            this.createDeterminantTables();
        }
    }    deleteDeterminantTables(keyword : string) {
        this.determinantTablesService.deleteDeterminantTables(keyword).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getDeterminantTables(keyword : string) {
        this.determinantTablesService.getDeterminantTables(keyword).subscribe(determinantTables => {
            this.determinantTables = determinantTables;
            this.cobOrderLiabilityForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
        this.determinantTableses = determinantTableses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createDeterminantRules() {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantRules = new DeterminantRules();
            this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDeterminantRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDeterminantRules(keyword : string) {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantRules = new DeterminantRules();
            this.determinantRulesService.updateDeterminantRules(determinantRules, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveDeterminantRules() {
        if(this.editDeterminantRules) {
            this.updateDeterminantRules(this.determinantRules.keyword)
        } else {
            this.createDeterminantRules();
        }
    }    deleteDeterminantRules(keyword : string) {
        this.determinantRulesService.deleteDeterminantRules(keyword).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getDeterminantRules(keyword : string) {
        this.determinantRulesService.getDeterminantRules(keyword).subscribe(determinantRules => {
            this.determinantRules = determinantRules;
            this.cobOrderLiabilityForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRuleses().subscribe(determinantRuleses => {
        this.determinantRuleses = determinantRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
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

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    dataGrid003GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Rule Order",
             field: "ruleorder",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Rule ID",
             field: "ruleid",
             width: 200         },
         {
             headerName: "Description",
             field: "description",
             width: 200         },
         {
             headerName: "Action Code",
             field: "actioncode",
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
             headerName: "Search Seq",
             field: "searchsequence",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Determinant Table",
             field: "determinanttable",
             width: 200         },
         {
             headerName: "Determinant Column",
             field: "determinantcolumn",
             width: 200         },
         {
             headerName: "Subs Flag",
             field: "subsind",
             width: 200         }
      ];
    }
    createDataGrid003(): void {
      this.dataGrid003GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid003GridOptions.editType = 'fullRow';
      this.dataGrid003GridOptions.columnDefs = [
         {
             headerName: "Operator",
             field: "operator",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "See Determinant Table",
             field: "secdeterminanttable",
             width: 200         },
         {
             headerName: "See Determinant Column",
             field: "secdeterminantcolumn",
             width: 200         },
         {
             headerName: "From Value",
             field: "",
             width: 200         },
         {
             headerName: "Thru Value",
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
     private determinantValuesService: DeterminantValuesService, private determinantTablesService: DeterminantTablesService, private determinantRulesService: DeterminantRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.cobOrderLiabilityForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.cobOrderLiabilityForm = this.formBuilder.group({
            ruleOrder: ['', {updateOn: 'blur', validators: [] }],
            ruleId: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            actionCode: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}