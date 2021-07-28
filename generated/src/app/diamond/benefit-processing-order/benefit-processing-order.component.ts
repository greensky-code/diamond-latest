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
import {  BenefProcessOrderMaster } from "../../api-models/index"
import {  BenefProcessOrderMasterService } from "../../api-services/benef-process-order-master.service"
import {  BenefProcessOrderDetail } from "../../api-models/index"
import {  BenefProcessOrderDetailService } from "../../api-services/benef-process-order-detail.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the BenefitProcessingOrderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'benefitprocessingorder',
    templateUrl: './benefit-processing-order.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        BenefProcessOrderMasterService
        BenefProcessOrderDetailService
]

})
export class BenefitProcessingOrderComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitProcessingOrderForm: FormGroup;
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

editBenefProcessOrderMaster: boolean;
    benefProcessOrderMaster: BenefProcessOrderMaster;
    benefProcessOrderMasters: BenefProcessOrderMaster[];editBenefProcessOrderDetail: boolean;
    benefProcessOrderDetail: BenefProcessOrderDetail;
    benefProcessOrderDetails: BenefProcessOrderDetail[];
    createBenefProcessOrderMaster() {
        this.formValidation.validateForm();
        if(this.benefitProcessingOrderForm.valid) {
            let benefProcessOrderMaster = new BenefProcessOrderMaster();
            this.benefProcessOrderMasterService.createBenefProcessOrderMaster(benefProcessOrderMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editBenefProcessOrderMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateBenefProcessOrderMaster(seqProcessingOrderId : number) {
        this.formValidation.validateForm();
        if(this.benefitProcessingOrderForm.valid) {
            let benefProcessOrderMaster = new BenefProcessOrderMaster();
            this.benefProcessOrderMasterService.updateBenefProcessOrderMaster(benefProcessOrderMaster, seqProcessingOrderId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBenefProcessOrderMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveBenefProcessOrderMaster() {
        if(this.editBenefProcessOrderMaster) {
            this.updateBenefProcessOrderMaster(this.benefProcessOrderMaster.seqProcessingOrderId)
        } else {
            this.createBenefProcessOrderMaster();
        }
    }    deleteBenefProcessOrderMaster(seqProcessingOrderId : number) {
        this.benefProcessOrderMasterService.deleteBenefProcessOrderMaster(seqProcessingOrderId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getBenefProcessOrderMaster(seqProcessingOrderId : number) {
        this.benefProcessOrderMasterService.getBenefProcessOrderMaster(seqProcessingOrderId).subscribe(benefProcessOrderMaster => {
            this.benefProcessOrderMaster = benefProcessOrderMaster;
            this.benefitProcessingOrderForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getBenefProcessOrderMasters() {
        this.benefProcessOrderMasterService.getBenefProcessOrderMasters().subscribe(benefProcessOrderMasters => {
        this.benefProcessOrderMasters = benefProcessOrderMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createBenefProcessOrderDetail() {
        this.formValidation.validateForm();
        if(this.benefitProcessingOrderForm.valid) {
            let benefProcessOrderDetail = new BenefProcessOrderDetail();
            benefProcessOrderDetail.processingOrder = Form.getValue(this.this.benefitProcessingOrderForm, 'processingOrder');
            this.benefProcessOrderDetailService.createBenefProcessOrderDetail(benefProcessOrderDetail).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editBenefProcessOrderDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateBenefProcessOrderDetail(seqProcessingOrderId : number) {
        this.formValidation.validateForm();
        if(this.benefitProcessingOrderForm.valid) {
            let benefProcessOrderDetail = new BenefProcessOrderDetail();
            benefProcessOrderDetail.processingOrder = Form.getValue(this.this.benefitProcessingOrderForm, 'processingOrder');
            this.benefProcessOrderDetailService.updateBenefProcessOrderDetail(benefProcessOrderDetail, seqProcessingOrderId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBenefProcessOrderDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveBenefProcessOrderDetail() {
        if(this.editBenefProcessOrderDetail) {
            this.updateBenefProcessOrderDetail(this.benefProcessOrderDetail.seqProcessingOrderId)
        } else {
            this.createBenefProcessOrderDetail();
        }
    }    deleteBenefProcessOrderDetail(seqProcessingOrderId : number) {
        this.benefProcessOrderDetailService.deleteBenefProcessOrderDetail(seqProcessingOrderId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getBenefProcessOrderDetail(seqProcessingOrderId : number) {
        this.benefProcessOrderDetailService.getBenefProcessOrderDetail(seqProcessingOrderId).subscribe(benefProcessOrderDetail => {
            this.benefProcessOrderDetail = benefProcessOrderDetail;
            this.benefitProcessingOrderForm.patchValue({
                'processingOrder': this.benefProcessOrderDetail.processingOrder,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getBenefProcessOrderDetails() {
        this.benefProcessOrderDetailService.getBenefProcessOrderDetails().subscribe(benefProcessOrderDetails => {
        this.benefProcessOrderDetails = benefProcessOrderDetails;
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
             headerName: "Processing Order ID",
             field: "processingorderid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description",
             field: "description",
             width: 200         },
         {
             headerName: "Default",
             field: "defaultorder",
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
             headerName: "Benefit Type",
             field: "benefittype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Processing Order",
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
     private benefProcessOrderMasterService: BenefProcessOrderMasterService, private benefProcessOrderDetailService: BenefProcessOrderDetailService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.benefitProcessingOrderForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.benefitProcessingOrderForm = this.formBuilder.group({
            processingOrder: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            default: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}