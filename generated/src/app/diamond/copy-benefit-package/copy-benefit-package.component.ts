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
import {  BenefitPackageMaster } from "../../api-models/index"
import {  BenefitPackageMasterService } from "../../api-services/benefit-package-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the CopyBenefitPackageComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'copybenefitpackage',
    templateUrl: './copy-benefit-package.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        BenefitPackageDetailService
        BenefitPackageMasterService
]

})
export class CopyBenefitPackageComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    copyBenefitPackageForm: FormGroup;
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
    benefitPackageDetails: BenefitPackageDetail[];editBenefitPackageMaster: boolean;
    benefitPackageMaster: BenefitPackageMaster;
    benefitPackageMasters: BenefitPackageMaster[];
    createBenefitPackageDetail() {
        this.formValidation.validateForm();
        if(this.copyBenefitPackageForm.valid) {
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
        if(this.copyBenefitPackageForm.valid) {
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
            this.copyBenefitPackageForm.patchValue({
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
    createBenefitPackageMaster() {
        this.formValidation.validateForm();
        if(this.copyBenefitPackageForm.valid) {
            let benefitPackageMaster = new BenefitPackageMaster();
            this.benefitPackageMasterService.createBenefitPackageMaster(benefitPackageMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editBenefitPackageMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateBenefitPackageMaster(benefitPackageId : string) {
        this.formValidation.validateForm();
        if(this.copyBenefitPackageForm.valid) {
            let benefitPackageMaster = new BenefitPackageMaster();
            this.benefitPackageMasterService.updateBenefitPackageMaster(benefitPackageMaster, benefitPackageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBenefitPackageMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveBenefitPackageMaster() {
        if(this.editBenefitPackageMaster) {
            this.updateBenefitPackageMaster(this.benefitPackageMaster.benefitPackageId)
        } else {
            this.createBenefitPackageMaster();
        }
    }    deleteBenefitPackageMaster(benefitPackageId : string) {
        this.benefitPackageMasterService.deleteBenefitPackageMaster(benefitPackageId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getBenefitPackageMaster(benefitPackageId : string) {
        this.benefitPackageMasterService.getBenefitPackageMaster(benefitPackageId).subscribe(benefitPackageMaster => {
            this.benefitPackageMaster = benefitPackageMaster;
            this.copyBenefitPackageForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getBenefitPackageMasters() {
        this.benefitPackageMasterService.getBenefitPackageMasters().subscribe(benefitPackageMasters => {
        this.benefitPackageMasters = benefitPackageMasters;
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
             headerName: "Benefit Package ID",
             field: "benefitpackageid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description",
             field: "shortdescription",
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
             headerName: "Rule ID",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Type",
             field: "",
             width: 200         },
         {
             headerName: "Description",
             field: "",
             width: 200         },
         {
             headerName: "Proc Order",
             field: "processingorder",
             width: 200         },
         {
             headerName: "Proc Seq",
             field: "parprovreq",
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
     private benefitPackageDetailService: BenefitPackageDetailService, private benefitPackageMasterService: BenefitPackageMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.copyBenefitPackageForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.copyBenefitPackageForm = this.formBuilder.group({
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }],
            selectThePackageAndRulesY: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}