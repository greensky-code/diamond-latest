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
import {  ReasonCodeMaster } from "../../api-models/index"
import {  ReasonCodeMasterService } from "../../api-services/reason-code-master.service"
import {  CovProvGroupMaster } from "../../api-models/index"
import {  CovProvGroupMasterService } from "../../api-services/cov-prov-group-master.service"
import {  CovProvGroupDetail } from "../../api-models/index"
import {  CovProvGroupDetailService } from "../../api-services/cov-prov-group-detail.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the CoveringProviderGroupsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'coveringprovidergroups',
    templateUrl: './covering-provider-groups.component.html',

})
export class CoveringProviderGroupsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    coveringProviderGroupsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;

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

editReasonCodeMaster: boolean;
    reasonCodeMaster: ReasonCodeMaster;
    reasonCodeMasters: ReasonCodeMaster[];editCovProvGroupMaster: boolean;
    covProvGroupMaster: CovProvGroupMaster;
    covProvGroupMasters: CovProvGroupMaster[];editCovProvGroupDetail: boolean;
    covProvGroupDetail: CovProvGroupDetail;
    covProvGroupDetails: CovProvGroupDetail[];
    if (this.secWin.hasInsertPermission()) {
        createCovProvGroupMaster() {
            this.formValidation.validateForm();
            if(this.coveringProviderGroupsForm.valid) {
                let covProvGroupMaster = new CovProvGroupMaster();
                this.covProvGroupMasterService.createCovProvGroupMaster(covProvGroupMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editCovProvGroupMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateCovProvGroupMaster(seqCovProvGrp : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.coveringProviderGroupsForm.valid) {
            let covProvGroupMaster = new CovProvGroupMaster();
            this.covProvGroupMasterService.updateCovProvGroupMaster(covProvGroupMaster, seqCovProvGrp).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editCovProvGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveCovProvGroupMaster() {
        if(this.editCovProvGroupMaster) {
            this.updateCovProvGroupMaster(this.covProvGroupMaster.seqCovProvGrp)
        } else {
            this.createCovProvGroupMaster();
        }
    }    deleteCovProvGroupMaster(seqCovProvGrp : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.covProvGroupMasterService.deleteCovProvGroupMaster(seqCovProvGrp).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getCovProvGroupMaster(seqCovProvGrp : number) {
        this.covProvGroupMasterService.getCovProvGroupMaster(seqCovProvGrp).subscribe(covProvGroupMaster => {
            this.covProvGroupMaster = covProvGroupMaster;
            this.coveringProviderGroupsForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getCovProvGroupMasters() {
        this.covProvGroupMasterService.getCovProvGroupMasters().subscribe(covProvGroupMasters => {
        this.covProvGroupMasters = covProvGroupMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createCovProvGroupDetail() {
            this.formValidation.validateForm();
            if(this.coveringProviderGroupsForm.valid) {
                let covProvGroupDetail = new CovProvGroupDetail();
                covProvGroupDetail.seqProvId = Form.getValue(this.coveringProviderGroupsForm, 'provId');
                covProvGroupDetail.reimbMethod = Form.getValue(this.coveringProviderGroupsForm, 'reimbMethod');
                covProvGroupDetail.effectiveDate = Form.getValue(this.coveringProviderGroupsForm, 'effectivityDate');
                covProvGroupDetail.termDate = Form.getValue(this.coveringProviderGroupsForm, 'termDate');
                covProvGroupDetail.termReasn = Form.getValue(this.coveringProviderGroupsForm, 'termReason');
                covProvGroupDetail.seqDfltVendId = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendor');
                covProvGroupDetail.userDefined1 = Form.getValue(this.coveringProviderGroupsForm, 'userDef1');
                covProvGroupDetail.seqDfltVendAddress = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendAddr');
                this.covProvGroupDetailService.createCovProvGroupDetail(covProvGroupDetail).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editCovProvGroupDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateCovProvGroupDetail(seqCovProvGrp : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.coveringProviderGroupsForm.valid) {
            let covProvGroupDetail = new CovProvGroupDetail();
            covProvGroupDetail.seqProvId = Form.getValue(this.coveringProviderGroupsForm, 'provId');
            covProvGroupDetail.reimbMethod = Form.getValue(this.coveringProviderGroupsForm, 'reimbMethod');
            covProvGroupDetail.effectiveDate = Form.getValue(this.coveringProviderGroupsForm, 'effectivityDate');
            covProvGroupDetail.termDate = Form.getValue(this.coveringProviderGroupsForm, 'termDate');
            covProvGroupDetail.termReasn = Form.getValue(this.coveringProviderGroupsForm, 'termReason');
            covProvGroupDetail.seqDfltVendId = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendor');
            covProvGroupDetail.userDefined1 = Form.getValue(this.coveringProviderGroupsForm, 'userDef1');
            covProvGroupDetail.seqDfltVendAddress = Form.getValue(this.coveringProviderGroupsForm, 'defaultVendAddr');
            this.covProvGroupDetailService.updateCovProvGroupDetail(covProvGroupDetail, seqCovProvGrp).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editCovProvGroupDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveCovProvGroupDetail() {
        if(this.editCovProvGroupDetail) {
            this.updateCovProvGroupDetail(this.covProvGroupDetail.seqCovProvGrp)
        } else {
            this.createCovProvGroupDetail();
        }
    }    deleteCovProvGroupDetail(seqCovProvGrp : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.covProvGroupDetailService.deleteCovProvGroupDetail(seqCovProvGrp).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getCovProvGroupDetail(seqCovProvGrp : number) {
        this.covProvGroupDetailService.getCovProvGroupDetail(seqCovProvGrp).subscribe(covProvGroupDetail => {
            this.covProvGroupDetail = covProvGroupDetail;
            this.coveringProviderGroupsForm.patchValue({
                'provId': this.covProvGroupDetail.seqProvId,
                'reimbMethod': this.covProvGroupDetail.reimbMethod,
                'effectivityDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.covProvGroupDetail.termDate),
                'termReason': this.covProvGroupDetail.termReasn,
                'defaultVendor': this.covProvGroupDetail.seqDfltVendId,
                'userDef1': this.covProvGroupDetail.userDefined1,
                'defaultVendAddr': this.covProvGroupDetail.seqDfltVendAddress,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getCovProvGroupDetails() {
        this.covProvGroupDetailService.getCovProvGroupDetails().subscribe(covProvGroupDetails => {
        this.covProvGroupDetails = covProvGroupDetails;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }    // Populate Term Reason Dropdown List
    getReasonCodeMastersTermReason() {
        this.reasonCodeMasterService.getReasonCodeMasters().subscribe(reasonCodeMasters => {
        this.reasonCodeMasters = reasonCodeMasters;
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
             headerName: "Cov Prov Group ID",
             field: "covprovgrpid",
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
             headerName: "Prov ID",
             field: "seqprovid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Name",
             field: "",
             width: 200         },
         {
             headerName: "Reimb. Method",
             field: "reimbmethod",
             width: 200         },
         {
             headerName: "Eff Date",
             field: "effectivedate",
             width: 200         },
         {
             headerName: "Term Date",
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
    private secWinService: SecWinService,
     private reasonCodeMasterService: ReasonCodeMasterService, private covProvGroupMasterService: CovProvGroupMasterService, private covProvGroupDetailService: CovProvGroupDetailService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.coveringProviderGroupsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.getReasonCodeMastersTermReason();
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        }, error => {
            this.displaySaveError(error);
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.coveringProviderGroupsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.getReasonCodeMastersTermReason();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.coveringProviderGroupsForm = this.formBuilder.group({
            provId: ['', {updateOn: 'blur', validators: [] }],
            provDescription: ['', {updateOn: 'blur', validators: [] }],
            reimbMethod: ['', {updateOn: 'blur', validators: [] }],
            effectivityDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            termReason: ['', {updateOn: 'blur', validators: [] }],
            defaultVendor: ['', {updateOn: 'blur', validators: [] }],
            userDef1: ['', {updateOn: 'blur', validators: [] }],
            defaultVendAddr: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}