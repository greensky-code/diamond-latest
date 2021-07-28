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
import {  PcpaaJobRequest } from "../../api-models/index"
import {  PcpaaJobRequestService } from "../../api-services/pcpaa-job-request.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the PcpJobSetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pcpjobsetup',
    templateUrl: './pcp-job-setup.component.html',

})
export class PcpJobSetupComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    pcpJobSetupForm: FormGroup;
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

editPcpaaJobRequest: boolean;
    pcpaaJobRequest: PcpaaJobRequest;
    pcpaaJobRequests: PcpaaJobRequest[];
    if (this.secWin.hasInsertPermission()) {
        createPcpaaJobRequest() {
            this.formValidation.validateForm();
            if(this.pcpJobSetupForm.valid) {
                let pcpaaJobRequest = new PcpaaJobRequest();
                pcpaaJobRequest.jobId = Form.getValue(this.pcpJobSetupForm, 'jobId');
                pcpaaJobRequest.requestUser = Form.getValue(this.pcpJobSetupForm, 'requestUser');
                pcpaaJobRequest.requestDate = Form.getValue(this.pcpJobSetupForm, 'requestDate');
                pcpaaJobRequest.insertProcess = Form.getValue(this.pcpJobSetupForm, 'lineOfBusiness');
                pcpaaJobRequest.insertDateFrom = Form.getValue(this.pcpJobSetupForm, 'insertDateFrom');
                pcpaaJobRequest.insertByProcess = Form.getValue(this.pcpJobSetupForm, 'insertProcess');
                pcpaaJobRequest.insertDateThru = Form.getValue(this.pcpJobSetupForm, 'insertDateThru');
                pcpaaJobRequest.status = Form.getValue(this.pcpJobSetupForm, 'status');
                pcpaaJobRequest.comments = Form.getValue(this.pcpJobSetupForm, 'comments');
                this.pcpaaJobRequestService.createPcpaaJobRequest(pcpaaJobRequest).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPcpaaJobRequest = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePcpaaJobRequest(seqPcpjbId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.pcpJobSetupForm.valid) {
            let pcpaaJobRequest = new PcpaaJobRequest();
            pcpaaJobRequest.jobId = Form.getValue(this.pcpJobSetupForm, 'jobId');
            pcpaaJobRequest.requestUser = Form.getValue(this.pcpJobSetupForm, 'requestUser');
            pcpaaJobRequest.requestDate = Form.getValue(this.pcpJobSetupForm, 'requestDate');
            pcpaaJobRequest.insertProcess = Form.getValue(this.pcpJobSetupForm, 'lineOfBusiness');
            pcpaaJobRequest.insertDateFrom = Form.getValue(this.pcpJobSetupForm, 'insertDateFrom');
            pcpaaJobRequest.insertByProcess = Form.getValue(this.pcpJobSetupForm, 'insertProcess');
            pcpaaJobRequest.insertDateThru = Form.getValue(this.pcpJobSetupForm, 'insertDateThru');
            pcpaaJobRequest.status = Form.getValue(this.pcpJobSetupForm, 'status');
            pcpaaJobRequest.comments = Form.getValue(this.pcpJobSetupForm, 'comments');
            this.pcpaaJobRequestService.updatePcpaaJobRequest(pcpaaJobRequest, seqPcpjbId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPcpaaJobRequest = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePcpaaJobRequest() {
        if(this.editPcpaaJobRequest) {
            this.updatePcpaaJobRequest(this.pcpaaJobRequest.seqPcpjbId)
        } else {
            this.createPcpaaJobRequest();
        }
    }    deletePcpaaJobRequest(seqPcpjbId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpaaJobRequestService.deletePcpaaJobRequest(seqPcpjbId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPcpaaJobRequest(seqPcpjbId : number) {
        this.pcpaaJobRequestService.getPcpaaJobRequest(seqPcpjbId).subscribe(pcpaaJobRequest => {
            this.pcpaaJobRequest = pcpaaJobRequest;
            this.pcpJobSetupForm.patchValue({
                'jobId': this.pcpaaJobRequest.jobId,
                'requestUser': this.pcpaaJobRequest.requestUser,
                'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.requestDate),
                'lineOfBusiness': this.pcpaaJobRequest.insertProcess,
                'insertDateFrom': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.insertDateFrom),
                'insertProcess': this.pcpaaJobRequest.insertByProcess,
                'insertDateThru': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.insertDateThru),
                'status': this.pcpaaJobRequest.status,
                'comments': this.pcpaaJobRequest.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPcpaaJobRequests() {
        this.pcpaaJobRequestService.getPcpaaJobRequests().subscribe(pcpaaJobRequests => {
        this.pcpaaJobRequests = pcpaaJobRequests;
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
             headerName: "Request User",
             field: "requestuser",
             width: 200         },
         {
             headerName: "Request Date",
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
     private pcpaaJobRequestService: PcpaaJobRequestService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpJobSetupForm);
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
        this.formValidation = new FormValidation(this.pcpJobSetupForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpJobSetupForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            requestDate: ['', {updateOn: 'blur', validators: [] }],
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            insertDateFrom: ['', {updateOn: 'blur', validators: [] }],
            insertProcess: ['', {updateOn: 'blur', validators: [] }],
            insertDateThru: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup2638: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            radiobuttongroup1008: ['', {updateOn: 'blur', validators: [] }],
            deferred: ['', {updateOn: 'blur', validators: [] }],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}