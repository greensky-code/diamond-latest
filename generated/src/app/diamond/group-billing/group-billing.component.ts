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
import {  GroupMaster } from "../../api-models/index"
import {  GroupMasterService } from "../../api-services/group-master.service"
import {  PremiumMaster } from "../../api-models/index"
import {  PremiumMasterService } from "../../api-services/premium-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the GroupBillingComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'groupbilling',
    templateUrl: './group-billing.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        GroupMasterService
        PremiumMasterService
]

})
export class GroupBillingComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    groupBillingForm: FormGroup;
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

editGroupMaster: boolean;
    groupMaster: GroupMaster;
    groupMasters: GroupMaster[];editPremiumMaster: boolean;
    premiumMaster: PremiumMaster;
    premiumMasters: PremiumMaster[];
    createGroupMaster() {
        this.formValidation.validateForm();
        if(this.groupBillingForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.groupId = Form.getValue(this.this.groupBillingForm, 'groupId');
            groupMaster.billingBatch = Form.getValue(this.this.groupBillingForm, 'billTo');
            groupMaster.billingFrequency = Form.getValue(this.this.groupBillingForm, 'frequency');
            groupMaster.billedThroughDate = Form.getValue(this.this.groupBillingForm, 'billedThrough');
            groupMaster.billingCycle = Form.getValue(this.this.groupBillingForm, 'billType');
            groupMaster.gracePeriod = Form.getValue(this.this.groupBillingForm, 'grace');
            groupMaster.paidThroughDate = Form.getValue(this.this.groupBillingForm, 'paidThrough');
            groupMaster.rateFreezeCalc = Form.getValue(this.this.groupBillingForm, 'rateFreezeCalc');
            groupMaster.prorationMethod = Form.getValue(this.this.groupBillingForm, 'proration');
            groupMaster.adultDepAgeParam = Form.getValue(this.this.groupBillingForm, 'adultDepAge');
            groupMaster.noOfRetroMonths = Form.getValue(this.this.groupBillingForm, 'retroMonths');
            groupMaster.commonBillingDate = Form.getValue(this.this.groupBillingForm, 'commonBillingDate');
            groupMaster.invoicePrintFormat = Form.getValue(this.this.groupBillingForm, 'reportPrintFormat');
            groupMaster.useEftFlg = Form.getValue(this.this.groupBillingForm, 'useEft');
            groupMaster.userDate10 = Form.getValue(this.this.groupBillingForm, 'rate1');
            groupMaster.sicCode = Form.getValue(this.this.groupBillingForm, 'adminCompcode');
            groupMaster.userDate12 = Form.getValue(this.this.groupBillingForm, 'rate2');
            groupMaster.userDate3 = Form.getValue(this.this.groupBillingForm, 'rate3');
            groupMaster.billingLevel = Form.getValue(this.this.groupBillingForm, 'adminFeeLevel');
            groupMaster.userDate4 = Form.getValue(this.this.groupBillingForm, 'rate4');
            groupMaster.userDate5 = Form.getValue(this.this.groupBillingForm, 'rate5');
            this.groupMasterService.createGroupMaster(groupMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateGroupMaster(seqGroupId : number) {
        this.formValidation.validateForm();
        if(this.groupBillingForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.groupId = Form.getValue(this.this.groupBillingForm, 'groupId');
            groupMaster.billingBatch = Form.getValue(this.this.groupBillingForm, 'billTo');
            groupMaster.billingFrequency = Form.getValue(this.this.groupBillingForm, 'frequency');
            groupMaster.billedThroughDate = Form.getValue(this.this.groupBillingForm, 'billedThrough');
            groupMaster.billingCycle = Form.getValue(this.this.groupBillingForm, 'billType');
            groupMaster.gracePeriod = Form.getValue(this.this.groupBillingForm, 'grace');
            groupMaster.paidThroughDate = Form.getValue(this.this.groupBillingForm, 'paidThrough');
            groupMaster.rateFreezeCalc = Form.getValue(this.this.groupBillingForm, 'rateFreezeCalc');
            groupMaster.prorationMethod = Form.getValue(this.this.groupBillingForm, 'proration');
            groupMaster.adultDepAgeParam = Form.getValue(this.this.groupBillingForm, 'adultDepAge');
            groupMaster.noOfRetroMonths = Form.getValue(this.this.groupBillingForm, 'retroMonths');
            groupMaster.commonBillingDate = Form.getValue(this.this.groupBillingForm, 'commonBillingDate');
            groupMaster.invoicePrintFormat = Form.getValue(this.this.groupBillingForm, 'reportPrintFormat');
            groupMaster.useEftFlg = Form.getValue(this.this.groupBillingForm, 'useEft');
            groupMaster.userDate10 = Form.getValue(this.this.groupBillingForm, 'rate1');
            groupMaster.sicCode = Form.getValue(this.this.groupBillingForm, 'adminCompcode');
            groupMaster.userDate12 = Form.getValue(this.this.groupBillingForm, 'rate2');
            groupMaster.userDate3 = Form.getValue(this.this.groupBillingForm, 'rate3');
            groupMaster.billingLevel = Form.getValue(this.this.groupBillingForm, 'adminFeeLevel');
            groupMaster.userDate4 = Form.getValue(this.this.groupBillingForm, 'rate4');
            groupMaster.userDate5 = Form.getValue(this.this.groupBillingForm, 'rate5');
            this.groupMasterService.updateGroupMaster(groupMaster, seqGroupId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveGroupMaster() {
        if(this.editGroupMaster) {
            this.updateGroupMaster(this.groupMaster.seqGroupId)
        } else {
            this.createGroupMaster();
        }
    }    deleteGroupMaster(seqGroupId : number) {
        this.groupMasterService.deleteGroupMaster(seqGroupId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getGroupMaster(seqGroupId : number) {
        this.groupMasterService.getGroupMaster(seqGroupId).subscribe(groupMaster => {
            this.groupMaster = groupMaster;
            this.groupBillingForm.patchValue({
                'groupId': this.groupMaster.groupId,
                'billTo': this.groupMaster.billingBatch,
                'frequency': this.groupMaster.billingFrequency,
                'billedThrough': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.billedThroughDate),
                'billType': this.groupMaster.billingCycle,
                'grace': this.groupMaster.gracePeriod,
                'paidThrough': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.paidThroughDate),
                'rateFreezeCalc': this.groupMaster.rateFreezeCalc,
                'proration': this.groupMaster.prorationMethod,
                'adultDepAge': this.groupMaster.adultDepAgeParam,
                'retroMonths': this.groupMaster.noOfRetroMonths,
                'commonBillingDate': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.commonBillingDate),
                'reportPrintFormat': this.groupMaster.invoicePrintFormat,
                'useEft': this.groupMaster.useEftFlg,
                'rate1': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.userDate10),
                'adminCompcode': this.groupMaster.sicCode,
                'rate2': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.userDate12),
                'rate3': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.userDate3),
                'adminFeeLevel': this.groupMaster.billingLevel,
                'rate4': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.userDate4),
                'rate5': this.dateFormatPipe.defaultDisplayDateFormat(this.groupMaster.userDate5),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getGroupMasters() {
        this.groupMasterService.getGroupMasters().subscribe(groupMasters => {
        this.groupMasters = groupMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createPremiumMaster() {
        this.formValidation.validateForm();
        if(this.groupBillingForm.valid) {
            let premiumMaster = new PremiumMaster();
            premiumMaster.matrixDef = Form.getValue(this.this.groupBillingForm, 'maxNoDeps');
            premiumMaster.tieringMethod = Form.getValue(this.this.groupBillingForm, 'tierringMthd');
            premiumMaster.adminFee = Form.getValue(this.this.groupBillingForm, 'adminFee');
            premiumMaster.commissionGlRefCode = Form.getValue(this.this.groupBillingForm, 'adminGlref');
            premiumMaster.commissionMatrixDef = Form.getValue(this.this.groupBillingForm, 'matrixDef');
            premiumMaster.pctOfMatrix = Form.getValue(this.this.groupBillingForm, 'pctOfMatrix');
            this.premiumMasterService.createPremiumMaster(premiumMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editPremiumMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updatePremiumMaster(seqPremId : number) {
        this.formValidation.validateForm();
        if(this.groupBillingForm.valid) {
            let premiumMaster = new PremiumMaster();
            premiumMaster.matrixDef = Form.getValue(this.this.groupBillingForm, 'maxNoDeps');
            premiumMaster.tieringMethod = Form.getValue(this.this.groupBillingForm, 'tierringMthd');
            premiumMaster.adminFee = Form.getValue(this.this.groupBillingForm, 'adminFee');
            premiumMaster.commissionGlRefCode = Form.getValue(this.this.groupBillingForm, 'adminGlref');
            premiumMaster.commissionMatrixDef = Form.getValue(this.this.groupBillingForm, 'matrixDef');
            premiumMaster.pctOfMatrix = Form.getValue(this.this.groupBillingForm, 'pctOfMatrix');
            this.premiumMasterService.updatePremiumMaster(premiumMaster, seqPremId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPremiumMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    savePremiumMaster() {
        if(this.editPremiumMaster) {
            this.updatePremiumMaster(this.premiumMaster.seqPremId)
        } else {
            this.createPremiumMaster();
        }
    }    deletePremiumMaster(seqPremId : number) {
        this.premiumMasterService.deletePremiumMaster(seqPremId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getPremiumMaster(seqPremId : number) {
        this.premiumMasterService.getPremiumMaster(seqPremId).subscribe(premiumMaster => {
            this.premiumMaster = premiumMaster;
            this.groupBillingForm.patchValue({
                'maxNoDeps': this.premiumMaster.matrixDef,
                'tierringMthd': this.premiumMaster.tieringMethod,
                'adminFee': this.premiumMaster.adminFee,
                'adminGlref': this.premiumMaster.commissionGlRefCode,
                'matrixDef': this.premiumMaster.commissionMatrixDef,
                'pctOfMatrix': this.premiumMaster.pctOfMatrix,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPremiumMasters() {
        this.premiumMasterService.getPremiumMasters().subscribe(premiumMasters => {
        this.premiumMasters = premiumMasters;
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
             headerName: "Type",
             field: "recordtype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Plan/Rider Code",
             field: "planridercode",
             width: 200         },
         {
             headerName: "Eff Date",
             field: "effectivedate",
             width: 200         },
         {
             headerName: "End Date",
             field: "enddate",
             width: 200         },
         {
             headerName: "Benefit Package",
             field: "benefitpackageid",
             width: 200         },
         {
             headerName: "LOB",
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
     private groupMasterService: GroupMasterService, private premiumMasterService: PremiumMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupBillingForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupBillingForm = this.formBuilder.group({
            groupId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            billTo: ['', {updateOn: 'blur', validators: [] }],
            frequency: ['', {updateOn: 'blur', validators: [] }],
            billedThrough: ['', {updateOn: 'blur', validators: [] }],
            billType: ['', {updateOn: 'blur', validators: [] }],
            grace: ['', {updateOn: 'blur', validators: [] }],
            paidThrough: ['', {updateOn: 'blur', validators: [] }],
            rateFreezeCalc: ['', {updateOn: 'blur', validators: [] }],
            proration: ['', {updateOn: 'blur', validators: [] }],
            adultDepAge: ['', {updateOn: 'blur', validators: [] }],
            retroMonths: ['', {updateOn: 'blur', validators: [] }],
            commonBillingDate: ['', {updateOn: 'blur', validators: [] }],
            maxNoDeps: ['', {updateOn: 'blur', validators: [] }],
            cycle: ['', {updateOn: 'blur', validators: [] }],
            reportPrintFormat: ['', {updateOn: 'blur', validators: [] }],
            useEft: ['', {updateOn: 'blur', validators: [] }],
            tierringMthd: ['', {updateOn: 'blur', validators: [] }],
            adminFee: ['', {updateOn: 'blur', validators: [] }],
            acrossTheBoard: ['', {updateOn: 'blur', validators: [] }],
            rate1: ['', {updateOn: 'blur', validators: [] }],
            adminCompcode: ['', {updateOn: 'blur', validators: [] }],
            rate2: ['', {updateOn: 'blur', validators: [] }],
            adminGlref: ['', {updateOn: 'blur', validators: [] }],
            rate3: ['', {updateOn: 'blur', validators: [] }],
            adminFeeLevel: ['', {updateOn: 'blur', validators: [] }],
            rate4: ['', {updateOn: 'blur', validators: [] }],
            matrixDef: ['', {updateOn: 'blur', validators: [] }],
            rate5: ['', {updateOn: 'blur', validators: [] }],
            pctOfMatrix: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}