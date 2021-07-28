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
import {  IdCardSetup } from "../../api-models/index"
import {  IdCardSetupService } from "../../api-services/id-card-setup.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the IdCardPrintComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'idcardprint',
    templateUrl: './id-card-print.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        IdCardSetupService
]

})
export class IdCardPrintComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    idCardPrintForm: FormGroup;
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

editIdCardSetup: boolean;
    idCardSetup: IdCardSetup;
    idCardSetups: IdCardSetup[];
    createIdCardSetup() {
        this.formValidation.validateForm();
        if(this.idCardPrintForm.valid) {
            let idCardSetup = new IdCardSetup();
            idCardSetup.jobId = Form.getValue(this.this.idCardPrintForm, 'jobId');
            idCardSetup.requestUser = Form.getValue(this.this.idCardPrintForm, 'requestUser');
            idCardSetup.updateUser = Form.getValue(this.this.idCardPrintForm, 'date');
            idCardSetup.idCardTemplate = Form.getValue(this.this.idCardPrintForm, 'idCardPlate');
            idCardSetup.orderType = Form.getValue(this.this.idCardPrintForm, 'orderType');
            idCardSetup.seqNarrativeId = Form.getValue(this.this.idCardPrintForm, 'narrative');
            idCardSetup.effectiveDateFrom = Form.getValue(this.this.idCardPrintForm, 'effectiveDateFrom');
            idCardSetup.status = Form.getValue(this.this.idCardPrintForm, 'status');
            idCardSetup.reprintRequest = Form.getValue(this.this.idCardPrintForm, 'reprintRequest');
            idCardSetup.comments = Form.getValue(this.this.idCardPrintForm, 'comments');
            this.idCardSetupService.createIdCardSetup(idCardSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editIdCardSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateIdCardSetup(seqIdprtId : number) {
        this.formValidation.validateForm();
        if(this.idCardPrintForm.valid) {
            let idCardSetup = new IdCardSetup();
            idCardSetup.jobId = Form.getValue(this.this.idCardPrintForm, 'jobId');
            idCardSetup.requestUser = Form.getValue(this.this.idCardPrintForm, 'requestUser');
            idCardSetup.updateUser = Form.getValue(this.this.idCardPrintForm, 'date');
            idCardSetup.idCardTemplate = Form.getValue(this.this.idCardPrintForm, 'idCardPlate');
            idCardSetup.orderType = Form.getValue(this.this.idCardPrintForm, 'orderType');
            idCardSetup.seqNarrativeId = Form.getValue(this.this.idCardPrintForm, 'narrative');
            idCardSetup.effectiveDateFrom = Form.getValue(this.this.idCardPrintForm, 'effectiveDateFrom');
            idCardSetup.status = Form.getValue(this.this.idCardPrintForm, 'status');
            idCardSetup.reprintRequest = Form.getValue(this.this.idCardPrintForm, 'reprintRequest');
            idCardSetup.comments = Form.getValue(this.this.idCardPrintForm, 'comments');
            this.idCardSetupService.updateIdCardSetup(idCardSetup, seqIdprtId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editIdCardSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveIdCardSetup() {
        if(this.editIdCardSetup) {
            this.updateIdCardSetup(this.idCardSetup.seqIdprtId)
        } else {
            this.createIdCardSetup();
        }
    }    deleteIdCardSetup(seqIdprtId : number) {
        this.idCardSetupService.deleteIdCardSetup(seqIdprtId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getIdCardSetup(seqIdprtId : number) {
        this.idCardSetupService.getIdCardSetup(seqIdprtId).subscribe(idCardSetup => {
            this.idCardSetup = idCardSetup;
            this.idCardPrintForm.patchValue({
                'jobId': this.idCardSetup.jobId,
                'requestUser': this.idCardSetup.requestUser,
                'date': this.idCardSetup.updateUser,
                'idCardPlate': this.idCardSetup.idCardTemplate,
                'orderType': this.idCardSetup.orderType,
                'narrative': this.idCardSetup.seqNarrativeId,
                'effectiveDateFrom': this.dateFormatPipe.defaultDisplayDateFormat(this.idCardSetup.effectiveDateFrom),
                'status': this.idCardSetup.status,
                'reprintRequest': this.idCardSetup.reprintRequest,
                'comments': this.idCardSetup.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getIdCardSetups() {
        this.idCardSetupService.getIdCardSetups().subscribe(idCardSetups => {
        this.idCardSetups = idCardSetups;
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
             headerName: "Job ID",
             field: "jobid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Action",
             field: "action",
             width: 200         },
         {
             headerName: "Request Type",
             field: "requesttype",
             width: 200         },
         {
             headerName: "Status",
             field: "status",
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
     private idCardSetupService: IdCardSetupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.idCardPrintForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.idCardPrintForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            date: ['', {updateOn: 'blur', validators: [] }],
            idCardPlate: ['', {updateOn: 'blur', validators: [] }],
            orderType: ['', {updateOn: 'blur', validators: [] }],
            narrative: ['', {updateOn: 'blur', validators: [] }],
            effectiveDateFrom: ['', {updateOn: 'blur', validators: [] }],
            group: ['', {updateOn: 'blur', validators: [] }],
            ipa: ['', {updateOn: 'blur', validators: [] }],
            lob: ['', {updateOn: 'blur', validators: [] }],
            planTbPlan: ['', {updateOn: 'blur', validators: [] }],
            panel: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup8091: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup2418: ['', {updateOn: 'blur', validators: [] }],
            reprintRequest: ['', {updateOn: 'blur', validators: [] }],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}