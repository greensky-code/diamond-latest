/* Copyright (c) 2021 . All Rights Reserved. */

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
import {  PmbSetup } from "../../api-models/index"
import {  PmbSetupService } from "../../api-services/pmb-setup.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the PremiumBillingSetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'premiumbillingsetup',
    templateUrl: './premium-billing-setup.component.html',

})
export class PremiumBillingSetupComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    premiumBillingSetupForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
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

editPmbSetup: boolean;
    pmbSetup: PmbSetup;
    pmbSetups: PmbSetup[];
    if (this.secWin.hasInsertPermission()) {
        createPmbSetup() {
            this.formValidation.validateForm();
            if(this.premiumBillingSetupForm.valid) {
                let pmbSetup = new PmbSetup();
                pmbSetup.jobId = Form.getValue(this.premiumBillingSetupForm, 'jobId');
                pmbSetup.requestUser = Form.getValue(this.premiumBillingSetupForm, 'requestUser');
                pmbSetup.postDate = Form.getValue(this.premiumBillingSetupForm, 'date');
                pmbSetup.billingCycle = Form.getValue(this.premiumBillingSetupForm, 'billingCycle');
                pmbSetup.billThruRequestDate = Form.getValue(this.premiumBillingSetupForm, 'billThruReqDt');
                pmbSetup.billingType = Form.getValue(this.premiumBillingSetupForm, 'billingType');
                pmbSetup.billJobType = Form.getValue(this.premiumBillingSetupForm, 'billJobType');
                pmbSetup.status = Form.getValue(this.premiumBillingSetupForm, 'status');
                pmbSetup.requestType = Form.getValue(this.premiumBillingSetupForm, 'requestTypeCbImmedi');
                pmbSetup.comments = Form.getValue(this.premiumBillingSetupForm, 'comments');
                this.pmbSetupService.createPmbSetup(pmbSetup).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPmbSetup = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePmbSetup(seqGpbilId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.premiumBillingSetupForm.valid) {
            let pmbSetup = new PmbSetup();
            pmbSetup.jobId = Form.getValue(this.premiumBillingSetupForm, 'jobId');
            pmbSetup.requestUser = Form.getValue(this.premiumBillingSetupForm, 'requestUser');
            pmbSetup.postDate = Form.getValue(this.premiumBillingSetupForm, 'date');
            pmbSetup.billingCycle = Form.getValue(this.premiumBillingSetupForm, 'billingCycle');
            pmbSetup.billThruRequestDate = Form.getValue(this.premiumBillingSetupForm, 'billThruReqDt');
            pmbSetup.billingType = Form.getValue(this.premiumBillingSetupForm, 'billingType');
            pmbSetup.billJobType = Form.getValue(this.premiumBillingSetupForm, 'billJobType');
            pmbSetup.status = Form.getValue(this.premiumBillingSetupForm, 'status');
            pmbSetup.requestType = Form.getValue(this.premiumBillingSetupForm, 'requestTypeCbImmedi');
            pmbSetup.comments = Form.getValue(this.premiumBillingSetupForm, 'comments');
            this.pmbSetupService.updatePmbSetup(pmbSetup, seqGpbilId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPmbSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePmbSetup() {
        if(this.editPmbSetup) {
            this.updatePmbSetup(this.pmbSetup.seqGpbilId)
        } else {
            this.createPmbSetup();
        }
    }    deletePmbSetup(seqGpbilId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbSetupService.deletePmbSetup(seqGpbilId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPmbSetup(seqGpbilId : number) {
        this.pmbSetupService.getPmbSetup(seqGpbilId).subscribe(pmbSetup => {
            this.pmbSetup = pmbSetup;
            this.premiumBillingSetupForm.patchValue({
                'jobId': this.pmbSetup.jobId,
                'requestUser': this.pmbSetup.requestUser,
                'date': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbSetup.postDate),
                'billingCycle': this.pmbSetup.billingCycle,
                'billThruReqDt': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbSetup.billThruRequestDate),
                'billingType': this.pmbSetup.billingType,
                'billJobType': this.pmbSetup.billJobType,
                'status': this.pmbSetup.status,
                'requestTypeCbImmedi': this.pmbSetup.requestType,
                'comments': this.pmbSetup.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPmbSetups() {
        this.pmbSetupService.getPmbSetups().subscribe(pmbSetups => {
        this.pmbSetups = pmbSetups;
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
             headerName: "Request Date",
             field: "requestdate",
             width: 200         },
         {
             headerName: "Action",
             field: "action",
             width: 200         },
         {
             headerName: "Cycle",
             field: "billingcycle",
             width: 200         },
         {
             headerName: "Bill Thru Req. Dt.",
             field: "billthrurequestdate",
             width: 200         },
         {
             headerName: "Post Date",
             field: "postdate",
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
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
     private pmbSetupService: PmbSetupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.premiumBillingSetupForm);
         this.createDataGrid();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        let userId = null;
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let useId = null;
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
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.premiumBillingSetupForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.premiumBillingSetupForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            date: ['', {updateOn: 'blur', validators: [] }],
            billingCycle: ['', {updateOn: 'blur', validators: [] }],
            billThruReqDt: ['', {updateOn: 'blur', validators: [] }],
            billingType: ['', {updateOn: 'blur', validators: [] }],
            postMonth: ['', {updateOn: 'blur', validators: [] }],
            billJobType: ['', {updateOn: 'blur', validators: [] }],
            cbCalcul: ['', {updateOn: 'blur', validators: [] }],
            cbP: ['', {updateOn: 'blur', validators: [] }],
            cbCan: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            requestTypeCbImmedi: ['', {updateOn: 'blur', validators: [] }],
            cbDefer: ['', {updateOn: 'blur', validators: [] }],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}