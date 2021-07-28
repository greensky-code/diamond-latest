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
import {  DrgGrouperPricer } from "../../api-models/index"
import {  DrgGrouperPricerService } from "../../api-services/drg-grouper-pricer.service"
import {  DrgWeight } from "../../api-models/index"
import {  DrgWeightService } from "../../api-services/drg-weight.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the DrgWeightsMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'drgweightsmaintenance',
    templateUrl: './drg-weights-maintenance.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DrgGrouperPricerService
        DrgWeightService
]

})
export class DrgWeightsMaintenanceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    drgWeightsMaintenanceForm: FormGroup;
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

editDrgGrouperPricer: boolean;
    drgGrouperPricer: DrgGrouperPricer;
    drgGrouperPricers: DrgGrouperPricer[];editDrgWeight: boolean;
    drgWeight: DrgWeight;
    drgWeights: DrgWeight[];
    createDrgWeight() {
        this.formValidation.validateForm();
        if(this.drgWeightsMaintenanceForm.valid) {
            let drgWeight = new DrgWeight();
            drgWeight.drgCode = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgCode');
            drgWeight.drgPricerId = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgPricerId');
            drgWeight.version = Form.getValue(this.this.drgWeightsMaintenanceForm, 'version');
            drgWeight.revisionLevel = Form.getValue(this.this.drgWeightsMaintenanceForm, 'revisionLevel');
            drgWeight.drgWeight = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgWeight');
            drgWeight.userDefined1 = Form.getValue(this.this.drgWeightsMaintenanceForm, 'userDefined');
            this.drgWeightService.createDrgWeight(drgWeight).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDrgWeight = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDrgWeight(drgPricerId : string) {
        this.formValidation.validateForm();
        if(this.drgWeightsMaintenanceForm.valid) {
            let drgWeight = new DrgWeight();
            drgWeight.drgCode = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgCode');
            drgWeight.drgPricerId = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgPricerId');
            drgWeight.version = Form.getValue(this.this.drgWeightsMaintenanceForm, 'version');
            drgWeight.revisionLevel = Form.getValue(this.this.drgWeightsMaintenanceForm, 'revisionLevel');
            drgWeight.drgWeight = Form.getValue(this.this.drgWeightsMaintenanceForm, 'drgWeight');
            drgWeight.userDefined1 = Form.getValue(this.this.drgWeightsMaintenanceForm, 'userDefined');
            this.drgWeightService.updateDrgWeight(drgWeight, drgPricerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDrgWeight = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveDrgWeight() {
        if(this.editDrgWeight) {
            this.updateDrgWeight(this.drgWeight.drgPricerId)
        } else {
            this.createDrgWeight();
        }
    }    deleteDrgWeight(drgPricerId : string) {
        this.drgWeightService.deleteDrgWeight(drgPricerId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getDrgWeight(drgPricerId : string) {
        this.drgWeightService.getDrgWeight(drgPricerId).subscribe(drgWeight => {
            this.drgWeight = drgWeight;
            this.drgWeightsMaintenanceForm.patchValue({
                'drgCode': this.drgWeight.drgCode,
                'drgPricerId': this.drgWeight.drgPricerId,
                'version': this.drgWeight.version,
                'revisionLevel': this.drgWeight.revisionLevel,
                'drgWeight': this.drgWeight.drgWeight,
                'userDefined': this.drgWeight.userDefined1,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDrgWeights() {
        this.drgWeightService.getDrgWeights().subscribe(drgWeights => {
        this.drgWeights = drgWeights;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }    // Populate DRG Pricer ID Dropdown List
    getDrgGrouperPricersDrgPricerId() {
        this.drgGrouperPricerService.getDrgGrouperPricers().subscribe(drgGrouperPricers => {
        this.drgGrouperPricers = drgGrouperPricers;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {
    };
      this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
      this.dataGridGridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: "DRG Pricer ID",
             field: "drgpricerid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Version",
             field: "version",
             width: 200         },
         {
             headerName: "Revision Level",
             field: "revisionlevel",
             width: 200         },
         {
             headerName: "DRG Weight",
             field: "drgweight",
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
     private drgGrouperPricerService: DrgGrouperPricerService, private drgWeightService: DrgWeightService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.drgWeightsMaintenanceForm);
         this.createDataGrid();
         this.getDrgGrouperPricersDrgPricerId();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.drgWeightsMaintenanceForm = this.formBuilder.group({
            drgCode: ['', {updateOn: 'blur', validators: [] }],
            drgPricerId: ['', {updateOn: 'blur', validators: [] }],
            version: ['', {updateOn: 'blur', validators: [] }],
            revisionLevel: ['', {updateOn: 'blur', validators: [] }],
            drgWeight: ['', {updateOn: 'blur', validators: [] }],
            userDefined: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}