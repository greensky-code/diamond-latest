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
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../shared/config';
import { Form } from '../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ClaimBenefitAccum } from "../../api-models"
import {  ClaimBenefitAccumService } from "../../api-services/claim-benefit-accum.service"
import {  BenefitPackageDetail } from "../../api-models"
import {  BenefitPackageDetailService } from "../../api-services"
import {  MemberEligHistory } from "../../api-models"
import {  MemberEligHistoryService } from "../../api-services"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message'

// Use the Component directive to define the BenefitAccumulatorBaseValuesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'benefitaccumulatorbasevalues',
    templateUrl: './benefit-accumulator-base-values.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ClaimBenefitAccumService
        BenefitPackageDetailService
        MemberEligHistoryService
]

})
export class BenefitAccumulatorBaseValuesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitAccumulatorBaseValuesForm: FormGroup;
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

editClaimBenefitAccum: boolean;
    claimBenefitAccum: ClaimBenefitAccum;
    claimBenefitAccums: ClaimBenefitAccum[];editBenefitPackageDetail: boolean;
    benefitPackageDetail: BenefitPackageDetail;
    benefitPackageDetails: BenefitPackageDetail[];editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];
    createClaimBenefitAccum() {
        this.formValidation.validateForm();
        if(this.benefitAccumulatorBaseValuesForm.valid) {
            let claimBenefitAccum = new ClaimBenefitAccum();
            claimBenefitAccum.seqGroupId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'groupId');
            claimBenefitAccum.relationshipCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'relationshipCode');
            this.claimBenefitAccumService.createClaimBenefitAccum(claimBenefitAccum).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editClaimBenefitAccum = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateClaimBenefitAccum(seqAccumId : number) {
        this.formValidation.validateForm();
        if(this.benefitAccumulatorBaseValuesForm.valid) {
            let claimBenefitAccum = new ClaimBenefitAccum();
            claimBenefitAccum.seqGroupId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'groupId');
            claimBenefitAccum.relationshipCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'relationshipCode');
            this.claimBenefitAccumService.updateClaimBenefitAccum(claimBenefitAccum, seqAccumId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClaimBenefitAccum = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveClaimBenefitAccum() {
        if(this.editClaimBenefitAccum) {
            this.updateClaimBenefitAccum(this.claimBenefitAccum.seqAccumId)
        } else {
            this.createClaimBenefitAccum();
        }
    }    deleteClaimBenefitAccum(seqAccumId : number) {
        this.claimBenefitAccumService.deleteClaimBenefitAccum(seqAccumId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getClaimBenefitAccum(seqAccumId : number) {
        this.claimBenefitAccumService.getClaimBenefitAccum(seqAccumId).subscribe(claimBenefitAccum => {
            this.claimBenefitAccum = claimBenefitAccum;
            this.benefitAccumulatorBaseValuesForm.patchValue({
                'groupId': this.claimBenefitAccum.seqGroupId,
                'relationshipCode': this.claimBenefitAccum.relationshipCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClaimBenefitAccums() {
        this.claimBenefitAccumService.getClaimBenefitAccums().subscribe(claimBenefitAccums => {
        this.claimBenefitAccums = claimBenefitAccums;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createBenefitPackageDetail() {
        this.formValidation.validateForm();
        if(this.benefitAccumulatorBaseValuesForm.valid) {
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
        if(this.benefitAccumulatorBaseValuesForm.valid) {
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
            this.benefitAccumulatorBaseValuesForm.patchValue({
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
    createMemberEligHistory() {
        this.formValidation.validateForm();
        if(this.benefitAccumulatorBaseValuesForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.subscriberId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'subscriberId');
            memberEligHistory.personNumber = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'personNo');
            memberEligHistory.effectiveDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'effectiveDate');
            memberEligHistory.termDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'termDate');
            memberEligHistory.eligStatus = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'eligStatus');
            memberEligHistory.seqGroupId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'groupId');
            memberEligHistory.planCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'planCode');
            memberEligHistory.benefitStartDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'benefitPkgId');
            memberEligHistory.relationshipCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'relationshipCode');
            memberEligHistory.riderCode1 = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'riders');
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberEligHistory(seqEligHist : number) {
        this.formValidation.validateForm();
        if(this.benefitAccumulatorBaseValuesForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.subscriberId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'subscriberId');
            memberEligHistory.personNumber = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'personNo');
            memberEligHistory.effectiveDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'effectiveDate');
            memberEligHistory.termDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'termDate');
            memberEligHistory.eligStatus = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'eligStatus');
            memberEligHistory.seqGroupId = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'groupId');
            memberEligHistory.planCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'planCode');
            memberEligHistory.benefitStartDate = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'benefitPkgId');
            memberEligHistory.relationshipCode = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'relationshipCode');
            memberEligHistory.riderCode1 = Form.getValue(this.this.benefitAccumulatorBaseValuesForm, 'riders');
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHist).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberEligHistory() {
        if(this.editMemberEligHistory) {
            this.updateMemberEligHistory(this.memberEligHistory.seqEligHist)
        } else {
            this.createMemberEligHistory();
        }
    }    deleteMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqEligHist).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.getMemberEligHistory(seqEligHist).subscribe(memberEligHistory => {
            this.memberEligHistory = memberEligHistory;
            this.benefitAccumulatorBaseValuesForm.patchValue({
                'subscriberId': this.memberEligHistory.subscriberId,
                'personNo': this.memberEligHistory.personNumber,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
                'eligStatus': this.memberEligHistory.eligStatus,
                'groupId': this.memberEligHistory.seqGroupId,
                'planCode': this.memberEligHistory.planCode,
                'benefitPkgId': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.benefitStartDate),
                'relationshipCode': this.memberEligHistory.relationshipCode,
                'riders': this.memberEligHistory.riderCode1,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberEligHistorys() {
        this.memberEligHistoryService.getMemberEligHistorys().subscribe(memberEligHistorys => {
        this.memberEligHistorys = memberEligHistorys;
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
             headerName: "Rule ID",
             field: "benefitpackageid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description/Rule Limit",
             field: "",
             width: 200         },
         {
             headerName: "Type",
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
             headerName: "Rule ID",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Detail Date",
             field: "detailsvcdate",
             width: 200         },
         {
             headerName: "Base Amt",
             field: "claimamt",
             width: 200         },
         {
             headerName: "Compare Dates",
             field: "comparedates",
             width: 200         },
         {
             headerName: "Seed Rsn",
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
     private claimBenefitAccumService: ClaimBenefitAccumService, private benefitPackageDetailService: BenefitPackageDetailService, private memberEligHistoryService: MemberEligHistoryService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.benefitAccumulatorBaseValuesForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.benefitAccumulatorBaseValuesForm = this.formBuilder.group({
            subscriberId: ['', {updateOn: 'blur', validators: [] }],
            personNo: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            eligStatus: ['', {updateOn: 'blur', validators: [] }],
            groupId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            planCode: ['', {updateOn: 'blur', validators: [] }],
            benefitPkgId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText003: ['', {updateOn: 'blur', validators: [] }],
            relationshipCode: ['', {updateOn: 'blur', validators: [] }],
            riders: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
