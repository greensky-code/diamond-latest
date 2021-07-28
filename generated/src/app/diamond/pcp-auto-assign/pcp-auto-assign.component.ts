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
import {  PcpAutoAssignHdr } from "../../api-models/index"
import {  PcpAutoAssignHdrService } from "../../api-services/pcp-auto-assign-hdr.service"
import {  PcpAutoAssignDtl } from "../../api-models/index"
import {  PcpAutoAssignDtlService } from "../../api-services/pcp-auto-assign-dtl.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the PcpAutoAssignComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pcpautoassign',
    templateUrl: './pcp-auto-assign.component.html',

})
export class PcpAutoAssignComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    pcpAutoAssignForm: FormGroup;
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

editPcpAutoAssignHdr: boolean;
    pcpAutoAssignHdr: PcpAutoAssignHdr;
    pcpAutoAssignHdrs: PcpAutoAssignHdr[];editPcpAutoAssignDtl: boolean;
    pcpAutoAssignDtl: PcpAutoAssignDtl;
    pcpAutoAssignDtls: PcpAutoAssignDtl[];
    if (this.secWin.hasInsertPermission()) {
        createPcpAutoAssignHdr() {
            this.formValidation.validateForm();
            if(this.pcpAutoAssignForm.valid) {
                let pcpAutoAssignHdr = new PcpAutoAssignHdr();
                pcpAutoAssignHdr.lineOfBusiness = Form.getValue(this.pcpAutoAssignForm, 'lineOfBusiness');
                pcpAutoAssignHdr.eventType = Form.getValue(this.pcpAutoAssignForm, 'event');
                pcpAutoAssignHdr.membReinstThreshold = Form.getValue(this.pcpAutoAssignForm, 'memberReinstated001');
                pcpAutoAssignHdr.diamondIdDays = Form.getValue(this.pcpAutoAssignForm, 'diamondId001');
                pcpAutoAssignHdr.familyAfflFlag = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation001');
                pcpAutoAssignHdr.familyAfflOrder = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation002');
                this.pcpAutoAssignHdrService.createPcpAutoAssignHdr(pcpAutoAssignHdr).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPcpAutoAssignHdr = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignHdr = new PcpAutoAssignHdr();
            pcpAutoAssignHdr.lineOfBusiness = Form.getValue(this.pcpAutoAssignForm, 'lineOfBusiness');
            pcpAutoAssignHdr.eventType = Form.getValue(this.pcpAutoAssignForm, 'event');
            pcpAutoAssignHdr.membReinstThreshold = Form.getValue(this.pcpAutoAssignForm, 'memberReinstated001');
            pcpAutoAssignHdr.diamondIdDays = Form.getValue(this.pcpAutoAssignForm, 'diamondId001');
            pcpAutoAssignHdr.familyAfflFlag = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation001');
            pcpAutoAssignHdr.familyAfflOrder = Form.getValue(this.pcpAutoAssignForm, 'familyAffiliation002');
            this.pcpAutoAssignHdrService.updatePcpAutoAssignHdr(pcpAutoAssignHdr, seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPcpAutoAssignHdr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePcpAutoAssignHdr() {
        if(this.editPcpAutoAssignHdr) {
            this.updatePcpAutoAssignHdr(this.pcpAutoAssignHdr.seqPcpAutoAssgn)
        } else {
            this.createPcpAutoAssignHdr();
        }
    }    deletePcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpAutoAssignHdrService.deletePcpAutoAssignHdr(seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPcpAutoAssignHdr(seqPcpAutoAssgn : number) {
        this.pcpAutoAssignHdrService.getPcpAutoAssignHdr(seqPcpAutoAssgn).subscribe(pcpAutoAssignHdr => {
            this.pcpAutoAssignHdr = pcpAutoAssignHdr;
            this.pcpAutoAssignForm.patchValue({
                'lineOfBusiness': this.pcpAutoAssignHdr.lineOfBusiness,
                'event': this.pcpAutoAssignHdr.eventType,
                'memberReinstated001': this.pcpAutoAssignHdr.membReinstThreshold,
                'diamondId001': this.pcpAutoAssignHdr.diamondIdDays,
                'familyAffiliation001': this.pcpAutoAssignHdr.familyAfflFlag,
                'familyAffiliation002': this.pcpAutoAssignHdr.familyAfflOrder,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPcpAutoAssignHdrs() {
        this.pcpAutoAssignHdrService.getPcpAutoAssignHdrs().subscribe(pcpAutoAssignHdrs => {
        this.pcpAutoAssignHdrs = pcpAutoAssignHdrs;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createPcpAutoAssignDtl() {
            this.formValidation.validateForm();
            if(this.pcpAutoAssignForm.valid) {
                let pcpAutoAssignDtl = new PcpAutoAssignDtl();
                this.pcpAutoAssignDtlService.createPcpAutoAssignDtl(pcpAutoAssignDtl).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPcpAutoAssignDtl = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.pcpAutoAssignForm.valid) {
            let pcpAutoAssignDtl = new PcpAutoAssignDtl();
            this.pcpAutoAssignDtlService.updatePcpAutoAssignDtl(pcpAutoAssignDtl, seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPcpAutoAssignDtl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePcpAutoAssignDtl() {
        if(this.editPcpAutoAssignDtl) {
            this.updatePcpAutoAssignDtl(this.pcpAutoAssignDtl.seqPcpAutoAssgn)
        } else {
            this.createPcpAutoAssignDtl();
        }
    }    deletePcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpAutoAssignDtlService.deletePcpAutoAssignDtl(seqPcpAutoAssgn).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPcpAutoAssignDtl(seqPcpAutoAssgn : number) {
        this.pcpAutoAssignDtlService.getPcpAutoAssignDtl(seqPcpAutoAssgn).subscribe(pcpAutoAssignDtl => {
            this.pcpAutoAssignDtl = pcpAutoAssignDtl;
            this.pcpAutoAssignForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPcpAutoAssignDtls() {
        this.pcpAutoAssignDtlService.getPcpAutoAssignDtls().subscribe(pcpAutoAssignDtls => {
        this.pcpAutoAssignDtls = pcpAutoAssignDtls;
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
             headerName: "Order Days",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         }
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
             headerName: "Rule Type",
             field: "",
             width: 200         },
         {
             headerName: "Rule Descr",
             field: "ruleid",
             width: 200         },
         {
             headerName: "Proc Sequence",
             field: "procsequence",
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
     private pcpAutoAssignHdrService: PcpAutoAssignHdrService, private pcpAutoAssignDtlService: PcpAutoAssignDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpAutoAssignForm);
         this.createDataGrid001();
         this.createDataGrid002();
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
        this.formValidation = new FormValidation(this.pcpAutoAssignForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpAutoAssignForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            event: ['', {updateOn: 'blur', validators: [] }],
            requestedPcp001: ['', {updateOn: 'blur', validators: [] }],
            checkbox001: ['', {updateOn: 'blur', validators: [] }],
            memberReinstated001: ['', {updateOn: 'blur', validators: [] }],
            checkbox002: ['', {updateOn: 'blur', validators: [] }],
            diamondId001: ['', {updateOn: 'blur', validators: [] }],
            checkbox003: ['', {updateOn: 'blur', validators: [] }],
            familyAffiliation001: ['', {updateOn: 'blur', validators: [] }],
            familyAffiliation002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}