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
import {  ClmDtlAuthProcLnkHdr } from "../../api-models/index"
import {  ClmDtlAuthProcLnkHdrService } from "../../api-services/clm-dtl-auth-proc-lnk-hdr.service"
import {  ClmDtlAuthProcLnkDtl } from "../../api-models/index"
import {  ClmDtlAuthProcLnkDtlService } from "../../api-services/clm-dtl-auth-proc-lnk-dtl.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ClaimAuthProcLinkComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimauthproclink',
    templateUrl: './claim-auth-proc-link.component.html',

})
export class ClaimAuthProcLinkComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimAuthProcLinkForm: FormGroup;
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

editClmDtlAuthProcLnkHdr: boolean;
    clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr;
    clmDtlAuthProcLnkHdrs: ClmDtlAuthProcLnkHdr[];editClmDtlAuthProcLnkDtl: boolean;
    clmDtlAuthProcLnkDtl: ClmDtlAuthProcLnkDtl;
    clmDtlAuthProcLnkDtls: ClmDtlAuthProcLnkDtl[];
    if (this.secWin.hasInsertPermission()) {
        createClmDtlAuthProcLnkHdr() {
            this.formValidation.validateForm();
            if(this.claimAuthProcLinkForm.valid) {
                let clmDtlAuthProcLnkHdr = new ClmDtlAuthProcLnkHdr();
                clmDtlAuthProcLnkHdr.authType = Form.getValue(this.claimAuthProcLinkForm, 'authType');
                clmDtlAuthProcLnkHdr.effectiveDate = Form.getValue(this.claimAuthProcLinkForm, 'effectiveDate');
                clmDtlAuthProcLnkHdr.termDate = Form.getValue(this.claimAuthProcLinkForm, 'termDate');
                clmDtlAuthProcLnkHdr.description = Form.getValue(this.claimAuthProcLinkForm, 'description');
                clmDtlAuthProcLnkHdr.tieBrkOnPrice = Form.getValue(this.claimAuthProcLinkForm, 'tieBreakerOnAuthPrice');
                clmDtlAuthProcLnkHdr.tieBrkOnProc = Form.getValue(this.claimAuthProcLinkForm, 'tieBreakerOnAuthProc');
                clmDtlAuthProcLnkHdr.mtchOnDtlForInp = Form.getValue(this.claimAuthProcLinkForm, 'matchOnDetailsForInpatient');
                clmDtlAuthProcLnkHdr.exceedAmtReason = Form.getValue(this.claimAuthProcLinkForm, 'actionTbReason');
                this.clmDtlAuthProcLnkHdrService.createClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editClmDtlAuthProcLnkHdr = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateClmDtlAuthProcLnkHdr(seqCdaplHdr : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimAuthProcLinkForm.valid) {
            let clmDtlAuthProcLnkHdr = new ClmDtlAuthProcLnkHdr();
            clmDtlAuthProcLnkHdr.authType = Form.getValue(this.claimAuthProcLinkForm, 'authType');
            clmDtlAuthProcLnkHdr.effectiveDate = Form.getValue(this.claimAuthProcLinkForm, 'effectiveDate');
            clmDtlAuthProcLnkHdr.termDate = Form.getValue(this.claimAuthProcLinkForm, 'termDate');
            clmDtlAuthProcLnkHdr.description = Form.getValue(this.claimAuthProcLinkForm, 'description');
            clmDtlAuthProcLnkHdr.tieBrkOnPrice = Form.getValue(this.claimAuthProcLinkForm, 'tieBreakerOnAuthPrice');
            clmDtlAuthProcLnkHdr.tieBrkOnProc = Form.getValue(this.claimAuthProcLinkForm, 'tieBreakerOnAuthProc');
            clmDtlAuthProcLnkHdr.mtchOnDtlForInp = Form.getValue(this.claimAuthProcLinkForm, 'matchOnDetailsForInpatient');
            clmDtlAuthProcLnkHdr.exceedAmtReason = Form.getValue(this.claimAuthProcLinkForm, 'actionTbReason');
            this.clmDtlAuthProcLnkHdrService.updateClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr, seqCdaplHdr).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClmDtlAuthProcLnkHdr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveClmDtlAuthProcLnkHdr() {
        if(this.editClmDtlAuthProcLnkHdr) {
            this.updateClmDtlAuthProcLnkHdr(this.clmDtlAuthProcLnkHdr.seqCdaplHdr)
        } else {
            this.createClmDtlAuthProcLnkHdr();
        }
    }    deleteClmDtlAuthProcLnkHdr(seqCdaplHdr : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.clmDtlAuthProcLnkHdrService.deleteClmDtlAuthProcLnkHdr(seqCdaplHdr).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getClmDtlAuthProcLnkHdr(seqCdaplHdr : number) {
        this.clmDtlAuthProcLnkHdrService.getClmDtlAuthProcLnkHdr(seqCdaplHdr).subscribe(clmDtlAuthProcLnkHdr => {
            this.clmDtlAuthProcLnkHdr = clmDtlAuthProcLnkHdr;
            this.claimAuthProcLinkForm.patchValue({
                'authType': this.clmDtlAuthProcLnkHdr.authType,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.clmDtlAuthProcLnkHdr.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.clmDtlAuthProcLnkHdr.termDate),
                'description': this.clmDtlAuthProcLnkHdr.description,
                'tieBreakerOnAuthPrice': this.clmDtlAuthProcLnkHdr.tieBrkOnPrice,
                'tieBreakerOnAuthProc': this.clmDtlAuthProcLnkHdr.tieBrkOnProc,
                'matchOnDetailsForInpatient': this.clmDtlAuthProcLnkHdr.mtchOnDtlForInp,
                'actionTbReason': this.clmDtlAuthProcLnkHdr.exceedAmtReason,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClmDtlAuthProcLnkHdrs() {
        this.clmDtlAuthProcLnkHdrService.getClmDtlAuthProcLnkHdrs().subscribe(clmDtlAuthProcLnkHdrs => {
        this.clmDtlAuthProcLnkHdrs = clmDtlAuthProcLnkHdrs;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createClmDtlAuthProcLnkDtl() {
            this.formValidation.validateForm();
            if(this.claimAuthProcLinkForm.valid) {
                let clmDtlAuthProcLnkDtl = new ClmDtlAuthProcLnkDtl();
                clmDtlAuthProcLnkDtl.effectiveDate = Form.getValue(this.claimAuthProcLinkForm, 'effectiveDate');
                clmDtlAuthProcLnkDtl.termDate = Form.getValue(this.claimAuthProcLinkForm, 'termDate');
                this.clmDtlAuthProcLnkDtlService.createClmDtlAuthProcLnkDtl(clmDtlAuthProcLnkDtl).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editClmDtlAuthProcLnkDtl = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateClmDtlAuthProcLnkDtl(seqCdaplDtl : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimAuthProcLinkForm.valid) {
            let clmDtlAuthProcLnkDtl = new ClmDtlAuthProcLnkDtl();
            clmDtlAuthProcLnkDtl.effectiveDate = Form.getValue(this.claimAuthProcLinkForm, 'effectiveDate');
            clmDtlAuthProcLnkDtl.termDate = Form.getValue(this.claimAuthProcLinkForm, 'termDate');
            this.clmDtlAuthProcLnkDtlService.updateClmDtlAuthProcLnkDtl(clmDtlAuthProcLnkDtl, seqCdaplDtl).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClmDtlAuthProcLnkDtl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveClmDtlAuthProcLnkDtl() {
        if(this.editClmDtlAuthProcLnkDtl) {
            this.updateClmDtlAuthProcLnkDtl(this.clmDtlAuthProcLnkDtl.seqCdaplDtl)
        } else {
            this.createClmDtlAuthProcLnkDtl();
        }
    }    deleteClmDtlAuthProcLnkDtl(seqCdaplDtl : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.clmDtlAuthProcLnkDtlService.deleteClmDtlAuthProcLnkDtl(seqCdaplDtl).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getClmDtlAuthProcLnkDtl(seqCdaplDtl : number) {
        this.clmDtlAuthProcLnkDtlService.getClmDtlAuthProcLnkDtl(seqCdaplDtl).subscribe(clmDtlAuthProcLnkDtl => {
            this.clmDtlAuthProcLnkDtl = clmDtlAuthProcLnkDtl;
            this.claimAuthProcLinkForm.patchValue({
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.clmDtlAuthProcLnkDtl.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.clmDtlAuthProcLnkDtl.termDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClmDtlAuthProcLnkDtls() {
        this.clmDtlAuthProcLnkDtlService.getClmDtlAuthProcLnkDtls().subscribe(clmDtlAuthProcLnkDtls => {
        this.clmDtlAuthProcLnkDtls = clmDtlAuthProcLnkDtls;
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
             headerName: "Process Order",
             field: "processingorder",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Range ID",
             field: "authprocrangeid",
             width: 200         },
         {
             headerName: "Incld all Rng rows",
             field: "includeallranges",
             width: 200         },
         {
             headerName: "Rule ID",
             field: "ruleid",
             width: 200         },
         {
             headerName: "Pay Action",
             field: "payaction",
             width: 200         },
         {
             headerName: "Allowed Reason",
             field: "allowedreason",
             width: 200         },
         {
             headerName: "Hld/Dny Reason",
             field: "hlddenyreason",
             width: 200         },
         {
             headerName: "Effective Date",
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
    private modalService: NgbModal,
    private securityService: SecurityService,
     private clmDtlAuthProcLnkHdrService: ClmDtlAuthProcLnkHdrService, private clmDtlAuthProcLnkDtlService: ClmDtlAuthProcLnkDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimAuthProcLinkForm);
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
        this.formValidation = new FormValidation(this.claimAuthProcLinkForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimAuthProcLinkForm = this.formBuilder.group({
            lob: ['', {updateOn: 'blur', validators: [] }],
            authType: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            tieBreakerOnAuthPrice: ['', {updateOn: 'blur', validators: [] }],
            tieBreakerOnAuthProc: ['', {updateOn: 'blur', validators: [] }],
            matchOnDetailsForInpatient: ['', {updateOn: 'blur', validators: [] }],
            action001: ['', {updateOn: 'blur', validators: [] }],
            reason001: ['', {updateOn: 'blur', validators: [] }],
            actionTbReason: ['', {updateOn: 'blur', validators: [] }],
            action002: ['', {updateOn: 'blur', validators: [] }],
            reason002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}