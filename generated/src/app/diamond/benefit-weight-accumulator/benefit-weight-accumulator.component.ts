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
import {  BenefitPackageDetail } from "../../api-models/index"
import {  BenefitPackageDetailService } from "../../api-services/benefit-package-detail.service"
import {  BenefitAccumWeight } from "../../api-models/index"
import {  BenefitAccumWeightService } from "../../api-services/benefit-accum-weight.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the BenefitWeightAccumulatorComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'benefitweightaccumulator',
    templateUrl: './benefit-weight-accumulator.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        BenefitPackageDetailService
        BenefitAccumWeightService
]

})
export class BenefitWeightAccumulatorComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitWeightAccumulatorForm: FormGroup;
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

editBenefitPackageDetail: boolean;
    benefitPackageDetail: BenefitPackageDetail;
    benefitPackageDetails: BenefitPackageDetail[];editBenefitAccumWeight: boolean;
    benefitAccumWeight: BenefitAccumWeight;
    benefitAccumWeights: BenefitAccumWeight[];
    createBenefitPackageDetail() {
        this.formValidation.validateForm();
        if(this.benefitWeightAccumulatorForm.valid) {
            let benefitPackageDetail = new BenefitPackageDetail();
            this.benefitPackageDetailService.createBenefitPackageDetail(benefitPackageDetail).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editBenefitPackageDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateBenefitPackageDetail(benefitPackageId : string) {
        this.formValidation.validateForm();
        if(this.benefitWeightAccumulatorForm.valid) {
            let benefitPackageDetail = new BenefitPackageDetail();
            this.benefitPackageDetailService.updateBenefitPackageDetail(benefitPackageDetail, benefitPackageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBenefitPackageDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveBenefitPackageDetail() {
        if(this.editBenefitPackageDetail) {
            this.updateBenefitPackageDetail(this.benefitPackageDetail.benefitPackageId)
        } else {
            this.createBenefitPackageDetail();
        }
    }    deleteBenefitPackageDetail(benefitPackageId : string) {
        this.benefitPackageDetailService.deleteBenefitPackageDetail(benefitPackageId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getBenefitPackageDetail(benefitPackageId : string) {
        this.benefitPackageDetailService.getBenefitPackageDetail(benefitPackageId).subscribe(benefitPackageDetail => {
            this.benefitPackageDetail = benefitPackageDetail;
            this.benefitWeightAccumulatorForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getBenefitPackageDetails() {
        this.benefitPackageDetailService.getBenefitPackageDetails().subscribe(benefitPackageDetails => {
        this.benefitPackageDetails = benefitPackageDetails;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createBenefitAccumWeight() {
        this.formValidation.validateForm();
        if(this.benefitWeightAccumulatorForm.valid) {
            let benefitAccumWeight = new BenefitAccumWeight();
            benefitAccumWeight.accumulatorId = Form.getValue(this.this.benefitWeightAccumulatorForm, 'accumulatorId');
            this.benefitAccumWeightService.createBenefitAccumWeight(benefitAccumWeight).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editBenefitAccumWeight = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateBenefitAccumWeight(accumulatorId : string) {
        this.formValidation.validateForm();
        if(this.benefitWeightAccumulatorForm.valid) {
            let benefitAccumWeight = new BenefitAccumWeight();
            benefitAccumWeight.accumulatorId = Form.getValue(this.this.benefitWeightAccumulatorForm, 'accumulatorId');
            this.benefitAccumWeightService.updateBenefitAccumWeight(benefitAccumWeight, accumulatorId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBenefitAccumWeight = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveBenefitAccumWeight() {
        if(this.editBenefitAccumWeight) {
            this.updateBenefitAccumWeight(this.benefitAccumWeight.accumulatorId)
        } else {
            this.createBenefitAccumWeight();
        }
    }    deleteBenefitAccumWeight(accumulatorId : string) {
        this.benefitAccumWeightService.deleteBenefitAccumWeight(accumulatorId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getBenefitAccumWeight(accumulatorId : string) {
        this.benefitAccumWeightService.getBenefitAccumWeight(accumulatorId).subscribe(benefitAccumWeight => {
            this.benefitAccumWeight = benefitAccumWeight;
            this.benefitWeightAccumulatorForm.patchValue({
                'accumulatorId': this.benefitAccumWeight.accumulatorId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getBenefitAccumWeights() {
        this.benefitAccumWeightService.getBenefitAccumWeights().subscribe(benefitAccumWeights => {
        this.benefitAccumWeights = benefitAccumWeights;
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
             headerName: "Procedure Code From",
             field: "nomoscontfrom",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Procedure Code Thru",
             field: "nomoscontthru",
             width: 200         },
         {
             headerName: "Primary Proc Grouping",
             field: "parprovreq",
             width: 200         },
         {
             headerName: "Second Proc Grouping",
             field: "",
             width: 200         },
         {
             headerName: "Weighted Accum %",
             field: "weightedvalueaccum",
             width: 200         },
         {
             headerName: "Effective Date",
             field: "enddate",
             width: 200         },
         {
             headerName: "Term Date",
             field: "startdate",
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
     private benefitPackageDetailService: BenefitPackageDetailService, private benefitAccumWeightService: BenefitAccumWeightService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.benefitWeightAccumulatorForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.benefitWeightAccumulatorForm = this.formBuilder.group({
            accumulatorId: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}