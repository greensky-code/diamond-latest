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
import {  PreExistRules } from "../../api-models/index"
import {  PreExistRulesService } from "../../api-services/pre-exist-rules.service"
import {  PreExistRuleDtl } from "../../api-models/index"
import {  PreExistRuleDtlService } from "../../api-services/pre-exist-rule-dtl.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the PreExistingConditionRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'preexistingconditionrules',
    templateUrl: './pre-existing-condition-rules.component.html',

})
export class PreExistingConditionRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    preExistingConditionRulesForm: FormGroup;
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

editPreExistRules: boolean;
    preExistRules: PreExistRules;
    preExistRuleses: PreExistRules[];editPreExistRuleDtl: boolean;
    preExistRuleDtl: PreExistRuleDtl;
    preExistRuleDtls: PreExistRuleDtl[];
    if (this.secWin.hasInsertPermission()) {
        createPreExistRules() {
            this.formValidation.validateForm();
            if(this.preExistingConditionRulesForm.valid) {
                let preExistRules = new PreExistRules();
                preExistRules.pecRuleId = Form.getValue(this.preExistingConditionRulesForm, 'pecRuleId');
                preExistRules.effectiveDate = Form.getValue(this.preExistingConditionRulesForm, 'effectiveDate');
                preExistRules.termDate = Form.getValue(this.preExistingConditionRulesForm, 'termDate');
                preExistRules.termReason = Form.getValue(this.preExistingConditionRulesForm, 'termReason');
                preExistRules.description = Form.getValue(this.preExistingConditionRulesForm, 'description');
                this.preExistRulesService.createPreExistRules(preExistRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPreExistRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePreExistRules(seqPecId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.preExistingConditionRulesForm.valid) {
            let preExistRules = new PreExistRules();
            preExistRules.pecRuleId = Form.getValue(this.preExistingConditionRulesForm, 'pecRuleId');
            preExistRules.effectiveDate = Form.getValue(this.preExistingConditionRulesForm, 'effectiveDate');
            preExistRules.termDate = Form.getValue(this.preExistingConditionRulesForm, 'termDate');
            preExistRules.termReason = Form.getValue(this.preExistingConditionRulesForm, 'termReason');
            preExistRules.description = Form.getValue(this.preExistingConditionRulesForm, 'description');
            this.preExistRulesService.updatePreExistRules(preExistRules, seqPecId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPreExistRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePreExistRules() {
        if(this.editPreExistRules) {
            this.updatePreExistRules(this.preExistRules.seqPecId)
        } else {
            this.createPreExistRules();
        }
    }    deletePreExistRules(seqPecId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.preExistRulesService.deletePreExistRules(seqPecId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPreExistRules(seqPecId : number) {
        this.preExistRulesService.getPreExistRules(seqPecId).subscribe(preExistRules => {
            this.preExistRules = preExistRules;
            this.preExistingConditionRulesForm.patchValue({
                'pecRuleId': this.preExistRules.pecRuleId,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.preExistRules.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.preExistRules.termDate),
                'termReason': this.preExistRules.termReason,
                'description': this.preExistRules.description,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPreExistRuleses() {
        this.preExistRulesService.getPreExistRuleses().subscribe(preExistRuleses => {
        this.preExistRuleses = preExistRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createPreExistRuleDtl() {
            this.formValidation.validateForm();
            if(this.preExistingConditionRulesForm.valid) {
                let preExistRuleDtl = new PreExistRuleDtl();
                preExistRuleDtl.effectiveDate = Form.getValue(this.preExistingConditionRulesForm, 'effectiveDate');
                preExistRuleDtl.termDate = Form.getValue(this.preExistingConditionRulesForm, 'termDate');
                this.preExistRuleDtlService.createPreExistRuleDtl(preExistRuleDtl).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPreExistRuleDtl = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePreExistRuleDtl(seqPecDtlId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.preExistingConditionRulesForm.valid) {
            let preExistRuleDtl = new PreExistRuleDtl();
            preExistRuleDtl.effectiveDate = Form.getValue(this.preExistingConditionRulesForm, 'effectiveDate');
            preExistRuleDtl.termDate = Form.getValue(this.preExistingConditionRulesForm, 'termDate');
            this.preExistRuleDtlService.updatePreExistRuleDtl(preExistRuleDtl, seqPecDtlId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPreExistRuleDtl = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePreExistRuleDtl() {
        if(this.editPreExistRuleDtl) {
            this.updatePreExistRuleDtl(this.preExistRuleDtl.seqPecDtlId)
        } else {
            this.createPreExistRuleDtl();
        }
    }    deletePreExistRuleDtl(seqPecDtlId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.preExistRuleDtlService.deletePreExistRuleDtl(seqPecDtlId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPreExistRuleDtl(seqPecDtlId : number) {
        this.preExistRuleDtlService.getPreExistRuleDtl(seqPecDtlId).subscribe(preExistRuleDtl => {
            this.preExistRuleDtl = preExistRuleDtl;
            this.preExistingConditionRulesForm.patchValue({
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.preExistRuleDtl.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.preExistRuleDtl.termDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPreExistRuleDtls() {
        this.preExistRuleDtlService.getPreExistRuleDtls().subscribe(preExistRuleDtls => {
        this.preExistRuleDtls = preExistRuleDtls;
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
             headerName: "Effectivity Date",
             field: "effectivedate",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Term Date",
             field: "termdate",
             width: 200         },
         {
             headerName: "Description",
             field: "description",
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
             headerName: "Diagnosis Type",
             field: "diagnosistype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "From Value",
             field: "fromvalue",
             width: 200         },
         {
             headerName: "Thru Value",
             field: "thruvalue",
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
     private preExistRulesService: PreExistRulesService, private preExistRuleDtlService: PreExistRuleDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.preExistingConditionRulesForm);
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
        this.formValidation = new FormValidation(this.preExistingConditionRulesForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.preExistingConditionRulesForm = this.formBuilder.group({
            pecRuleId: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            termReason: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}