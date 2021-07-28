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
import {  DrgPricerRevision } from "../../api-models/index"
import {  DrgPricerRevisionService } from "../../api-services/drg-pricer-revision.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the DrgPricerRevisionMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'drgpricerrevisionmaintenance',
    templateUrl: './drg-pricer-revision-maintenance.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DrgGrouperPricerService
        DrgPricerRevisionService
]

})
export class DrgPricerRevisionMaintenanceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    drgPricerRevisionMaintenanceForm: FormGroup;
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
    drgGrouperPricers: DrgGrouperPricer[];editDrgPricerRevision: boolean;
    drgPricerRevision: DrgPricerRevision;
    drgPricerRevisions: DrgPricerRevision[];
    createDrgPricerRevision() {
        this.formValidation.validateForm();
        if(this.drgPricerRevisionMaintenanceForm.valid) {
            let drgPricerRevision = new DrgPricerRevision();
            drgPricerRevision.drgPricerId = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'drgPricerId');
            drgPricerRevision.version = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'version');
            drgPricerRevision.revisionLevel = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'revisionLevel');
            drgPricerRevision.description = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'description');
            drgPricerRevision.effectiveDate = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'effectiveDate');
            drgPricerRevision.termDate = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'terminationDate');
            this.drgPricerRevisionService.createDrgPricerRevision(drgPricerRevision).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDrgPricerRevision = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDrgPricerRevision(drgPricerId : string) {
        this.formValidation.validateForm();
        if(this.drgPricerRevisionMaintenanceForm.valid) {
            let drgPricerRevision = new DrgPricerRevision();
            drgPricerRevision.drgPricerId = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'drgPricerId');
            drgPricerRevision.version = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'version');
            drgPricerRevision.revisionLevel = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'revisionLevel');
            drgPricerRevision.description = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'description');
            drgPricerRevision.effectiveDate = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'effectiveDate');
            drgPricerRevision.termDate = Form.getValue(this.this.drgPricerRevisionMaintenanceForm, 'terminationDate');
            this.drgPricerRevisionService.updateDrgPricerRevision(drgPricerRevision, drgPricerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDrgPricerRevision = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveDrgPricerRevision() {
        if(this.editDrgPricerRevision) {
            this.updateDrgPricerRevision(this.drgPricerRevision.drgPricerId)
        } else {
            this.createDrgPricerRevision();
        }
    }    deleteDrgPricerRevision(drgPricerId : string) {
        this.drgPricerRevisionService.deleteDrgPricerRevision(drgPricerId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getDrgPricerRevision(drgPricerId : string) {
        this.drgPricerRevisionService.getDrgPricerRevision(drgPricerId).subscribe(drgPricerRevision => {
            this.drgPricerRevision = drgPricerRevision;
            this.drgPricerRevisionMaintenanceForm.patchValue({
                'drgPricerId': this.drgPricerRevision.drgPricerId,
                'version': this.drgPricerRevision.version,
                'revisionLevel': this.drgPricerRevision.revisionLevel,
                'description': this.drgPricerRevision.description,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.drgPricerRevision.effectiveDate),
                'terminationDate': this.dateFormatPipe.defaultDisplayDateFormat(this.drgPricerRevision.termDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDrgPricerRevisions() {
        this.drgPricerRevisionService.getDrgPricerRevisions().subscribe(drgPricerRevisions => {
        this.drgPricerRevisions = drgPricerRevisions;
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
             headerName: "Version Level",
             field: "revisionlevel",
             width: 200         },
         {
             headerName: "Description",
             field: "description",
             width: 200         },
         {
             headerName: "Effective Date",
             field: "effectivedate",
             width: 200         },
         {
             headerName: "Termination Date",
             field: "termdate",
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
     private drgGrouperPricerService: DrgGrouperPricerService, private drgPricerRevisionService: DrgPricerRevisionService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.drgPricerRevisionMaintenanceForm);
         this.createDataGrid();
         this.getDrgGrouperPricersDrgPricerId();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.drgPricerRevisionMaintenanceForm = this.formBuilder.group({
            drgPricerId: ['', {updateOn: 'blur', validators: [] }],
            version: ['', {updateOn: 'blur', validators: [] }],
            revisionLevel: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            terminationDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}