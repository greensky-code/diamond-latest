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
import {  CheckPrintSetup } from "../../api-models/index"
import {  CheckPrintSetupService } from "../../api-services/check-print-setup.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ManualChecksComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'manualchecks',
    templateUrl: './manual-checks.component.html',

})
export class ManualChecksComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    manualChecksForm: FormGroup;
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

editCheckPrintSetup: boolean;
    checkPrintSetup: CheckPrintSetup;
    checkPrintSetups: CheckPrintSetup[];
    if (this.secWin.hasInsertPermission()) {
        createCheckPrintSetup() {
            this.formValidation.validateForm();
            if(this.manualChecksForm.valid) {
                let checkPrintSetup = new CheckPrintSetup();
                checkPrintSetup.payableType = Form.getValue(this.manualChecksForm, 'payableType');
                checkPrintSetup.companyCode = Form.getValue(this.manualChecksForm, 'companyCode');
                checkPrintSetup.bankAccountCode = Form.getValue(this.manualChecksForm, 'bankAcct');
                checkPrintSetup.requestUser = Form.getValue(this.manualChecksForm, 'reqUser');
                checkPrintSetup.checkNotes = Form.getValue(this.manualChecksForm, 'startCheckNo');
                checkPrintSetup.seqVendId = Form.getValue(this.manualChecksForm, 'vendorId');
                checkPrintSetup.seqVendAddress = Form.getValue(this.manualChecksForm, 'vendorAddress');
                checkPrintSetup.seqClaimId = Form.getValue(this.manualChecksForm, 'claimType');
                checkPrintSetup.seqProvId = Form.getValue(this.manualChecksForm, 'providerId');
                checkPrintSetup.seqMembId = Form.getValue(this.manualChecksForm, 'memberId');
                checkPrintSetup.fromPostDate = Form.getValue(this.manualChecksForm, 'fromPostDate');
                checkPrintSetup.thruPostDate = Form.getValue(this.manualChecksForm, 'thruPostDate');
                checkPrintSetup.fromDueDate = Form.getValue(this.manualChecksForm, 'fromDueDate');
                checkPrintSetup.thruDueDate = Form.getValue(this.manualChecksForm, 'thruDueDate');
                checkPrintSetup.postMonth = Form.getValue(this.manualChecksForm, 'post');
                this.checkPrintSetupService.createCheckPrintSetup(checkPrintSetup).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editCheckPrintSetup = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateCheckPrintSetup(seqCkprtId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.manualChecksForm.valid) {
            let checkPrintSetup = new CheckPrintSetup();
            checkPrintSetup.payableType = Form.getValue(this.manualChecksForm, 'payableType');
            checkPrintSetup.companyCode = Form.getValue(this.manualChecksForm, 'companyCode');
            checkPrintSetup.bankAccountCode = Form.getValue(this.manualChecksForm, 'bankAcct');
            checkPrintSetup.requestUser = Form.getValue(this.manualChecksForm, 'reqUser');
            checkPrintSetup.checkNotes = Form.getValue(this.manualChecksForm, 'startCheckNo');
            checkPrintSetup.seqVendId = Form.getValue(this.manualChecksForm, 'vendorId');
            checkPrintSetup.seqVendAddress = Form.getValue(this.manualChecksForm, 'vendorAddress');
            checkPrintSetup.seqClaimId = Form.getValue(this.manualChecksForm, 'claimType');
            checkPrintSetup.seqProvId = Form.getValue(this.manualChecksForm, 'providerId');
            checkPrintSetup.seqMembId = Form.getValue(this.manualChecksForm, 'memberId');
            checkPrintSetup.fromPostDate = Form.getValue(this.manualChecksForm, 'fromPostDate');
            checkPrintSetup.thruPostDate = Form.getValue(this.manualChecksForm, 'thruPostDate');
            checkPrintSetup.fromDueDate = Form.getValue(this.manualChecksForm, 'fromDueDate');
            checkPrintSetup.thruDueDate = Form.getValue(this.manualChecksForm, 'thruDueDate');
            checkPrintSetup.postMonth = Form.getValue(this.manualChecksForm, 'post');
            this.checkPrintSetupService.updateCheckPrintSetup(checkPrintSetup, seqCkprtId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editCheckPrintSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveCheckPrintSetup() {
        if(this.editCheckPrintSetup) {
            this.updateCheckPrintSetup(this.checkPrintSetup.seqCkprtId)
        } else {
            this.createCheckPrintSetup();
        }
    }    deleteCheckPrintSetup(seqCkprtId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.checkPrintSetupService.deleteCheckPrintSetup(seqCkprtId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getCheckPrintSetup(seqCkprtId : number) {
        this.checkPrintSetupService.getCheckPrintSetup(seqCkprtId).subscribe(checkPrintSetup => {
            this.checkPrintSetup = checkPrintSetup;
            this.manualChecksForm.patchValue({
                'payableType': this.checkPrintSetup.payableType,
                'companyCode': this.checkPrintSetup.companyCode,
                'bankAcct': this.checkPrintSetup.bankAccountCode,
                'reqUser': this.checkPrintSetup.requestUser,
                'startCheckNo': this.checkPrintSetup.checkNotes,
                'vendorId': this.checkPrintSetup.seqVendId,
                'vendorAddress': this.checkPrintSetup.seqVendAddress,
                'claimType': this.checkPrintSetup.seqClaimId,
                'providerId': this.checkPrintSetup.seqProvId,
                'memberId': this.checkPrintSetup.seqMembId,
                'fromPostDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.fromPostDate),
                'thruPostDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.thruPostDate),
                'fromDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.fromDueDate),
                'thruDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.thruDueDate),
                'post': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.postMonth),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getCheckPrintSetups() {
        this.checkPrintSetupService.getCheckPrintSetups().subscribe(checkPrintSetups => {
        this.checkPrintSetups = checkPrintSetups;
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
             headerName: "Job Id",
             field: "jobid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Pass",
             field: "",
             width: 200         },
         {
             headerName: "Company",
             field: "companycode",
             width: 200         },
         {
             headerName: "Request User",
             field: "requestuser",
             width: 200         },
         {
             headerName: "Run Date",
             field: "requestdate",
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
     private checkPrintSetupService: CheckPrintSetupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.manualChecksForm);
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
        this.formValidation = new FormValidation(this.manualChecksForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.manualChecksForm = this.formBuilder.group({
            payableType: ['', {updateOn: 'blur', validators: [] }],
            jobId: ['', {updateOn: 'blur', validators: [] }],
            pass: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            bankAcct: ['', {updateOn: 'blur', validators: [] }],
            reqUser: ['', {updateOn: 'blur', validators: [] }],
            runDate: ['', {updateOn: 'blur', validators: [] }],
            startCheckNo: ['', {updateOn: 'blur', validators: [] }],
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            vendorAddress: ['', {updateOn: 'blur', validators: [] }],
            claimType: ['', {updateOn: 'blur', validators: [] }],
            claimNo: ['', {updateOn: 'blur', validators: [] }],
            providerId: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            fromPostDate: ['', {updateOn: 'blur', validators: [] }],
            thruPostDate: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            fromDueDate: ['', {updateOn: 'blur', validators: [] }],
            thruDueDate: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup2877: ['', {updateOn: 'blur', validators: [] }],
            cancel: ['', {updateOn: 'blur', validators: [] }],
            post: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup3062: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}