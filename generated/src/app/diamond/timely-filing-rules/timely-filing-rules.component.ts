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
import {  TimelyFilingRules } from "../../api-models/index"
import {  TimelyFilingRulesService } from "../../api-services/timely-filing-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the TimelyFilingRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'timelyfilingrules',
    templateUrl: './timely-filing-rules.component.html',

})
export class TimelyFilingRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    timelyFilingRulesForm: FormGroup;
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

editTimelyFilingRules: boolean;
    timelyFilingRules: TimelyFilingRules;
    timelyFilingRuleses: TimelyFilingRules[];
    if (this.secWin.hasInsertPermission()) {
        createTimelyFilingRules() {
            this.formValidation.validateForm();
            if(this.timelyFilingRulesForm.valid) {
                let timelyFilingRules = new TimelyFilingRules();
                timelyFilingRules.claimType = Form.getValue(this.timelyFilingRulesForm, 'claimType');
                timelyFilingRules.description = Form.getValue(this.timelyFilingRulesForm, 'claimTypeDescription');
                timelyFilingRules.ruleOrder = Form.getValue(this.timelyFilingRulesForm, 'ruleOrder');
                timelyFilingRules.effectiveDate = Form.getValue(this.timelyFilingRulesForm, 'effectiveDate');
                timelyFilingRules.termDate = Form.getValue(this.timelyFilingRulesForm, 'termDate');
                timelyFilingRules.action = Form.getValue(this.timelyFilingRulesForm, 'description');
                timelyFilingRules.insertProcess = Form.getValue(this.timelyFilingRulesForm, 'lineOfBusiness');
                timelyFilingRules.companyCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'companyCode');
                timelyFilingRules.billTypeSelect = Form.getValue(this.timelyFilingRulesForm, 'billType');
                timelyFilingRules.provStatusSelect = Form.getValue(this.timelyFilingRulesForm, 'providerParStatus');
                timelyFilingRules.serviceStateSelect = Form.getValue(this.timelyFilingRulesForm, 'serviceDeliveryState');
                timelyFilingRules.authLevelSelect = Form.getValue(this.timelyFilingRulesForm, 'authorizationLevel');
                timelyFilingRules.revenueCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'revenueCode');
                timelyFilingRules.calcFromDate = Form.getValue(this.timelyFilingRulesForm, 'calcFromDate');
                timelyFilingRules.calcThruDate = Form.getValue(this.timelyFilingRulesForm, 'calcThruDate');
                timelyFilingRules.filingLimitDays = Form.getValue(this.timelyFilingRulesForm, 'filingLimitDays');
                timelyFilingRules.provLimDaysFlag = Form.getValue(this.timelyFilingRulesForm, 'ignoreProvLimitDays');
                timelyFilingRules.applyActionToAllDtlLines = Form.getValue(this.timelyFilingRulesForm, 'applyActionToAllDetailLin');
                timelyFilingRules.reasonCode = Form.getValue(this.timelyFilingRulesForm, 'reasonCode');
                timelyFilingRules.messageToOperator = Form.getValue(this.timelyFilingRulesForm, 'messageToOperator');
                this.timelyFilingRulesService.createTimelyFilingRules(timelyFilingRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editTimelyFilingRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateTimelyFilingRules(seqTfrulId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.timelyFilingRulesForm.valid) {
            let timelyFilingRules = new TimelyFilingRules();
            timelyFilingRules.claimType = Form.getValue(this.timelyFilingRulesForm, 'claimType');
            timelyFilingRules.description = Form.getValue(this.timelyFilingRulesForm, 'claimTypeDescription');
            timelyFilingRules.ruleOrder = Form.getValue(this.timelyFilingRulesForm, 'ruleOrder');
            timelyFilingRules.effectiveDate = Form.getValue(this.timelyFilingRulesForm, 'effectiveDate');
            timelyFilingRules.termDate = Form.getValue(this.timelyFilingRulesForm, 'termDate');
            timelyFilingRules.action = Form.getValue(this.timelyFilingRulesForm, 'description');
            timelyFilingRules.insertProcess = Form.getValue(this.timelyFilingRulesForm, 'lineOfBusiness');
            timelyFilingRules.companyCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'companyCode');
            timelyFilingRules.billTypeSelect = Form.getValue(this.timelyFilingRulesForm, 'billType');
            timelyFilingRules.provStatusSelect = Form.getValue(this.timelyFilingRulesForm, 'providerParStatus');
            timelyFilingRules.serviceStateSelect = Form.getValue(this.timelyFilingRulesForm, 'serviceDeliveryState');
            timelyFilingRules.authLevelSelect = Form.getValue(this.timelyFilingRulesForm, 'authorizationLevel');
            timelyFilingRules.revenueCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'revenueCode');
            timelyFilingRules.calcFromDate = Form.getValue(this.timelyFilingRulesForm, 'calcFromDate');
            timelyFilingRules.calcThruDate = Form.getValue(this.timelyFilingRulesForm, 'calcThruDate');
            timelyFilingRules.filingLimitDays = Form.getValue(this.timelyFilingRulesForm, 'filingLimitDays');
            timelyFilingRules.provLimDaysFlag = Form.getValue(this.timelyFilingRulesForm, 'ignoreProvLimitDays');
            timelyFilingRules.applyActionToAllDtlLines = Form.getValue(this.timelyFilingRulesForm, 'applyActionToAllDetailLin');
            timelyFilingRules.reasonCode = Form.getValue(this.timelyFilingRulesForm, 'reasonCode');
            timelyFilingRules.messageToOperator = Form.getValue(this.timelyFilingRulesForm, 'messageToOperator');
            this.timelyFilingRulesService.updateTimelyFilingRules(timelyFilingRules, seqTfrulId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editTimelyFilingRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveTimelyFilingRules() {
        if(this.editTimelyFilingRules) {
            this.updateTimelyFilingRules(this.timelyFilingRules.seqTfrulId)
        } else {
            this.createTimelyFilingRules();
        }
    }    deleteTimelyFilingRules(seqTfrulId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.timelyFilingRulesService.deleteTimelyFilingRules(seqTfrulId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getTimelyFilingRules(seqTfrulId : number) {
        this.timelyFilingRulesService.getTimelyFilingRules(seqTfrulId).subscribe(timelyFilingRules => {
            this.timelyFilingRules = timelyFilingRules;
            this.timelyFilingRulesForm.patchValue({
                'claimType': this.timelyFilingRules.claimType,
                'claimTypeDescription': this.timelyFilingRules.description,
                'ruleOrder': this.timelyFilingRules.ruleOrder,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.timelyFilingRules.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.timelyFilingRules.termDate),
                'description': this.timelyFilingRules.action,
                'lineOfBusiness': this.timelyFilingRules.insertProcess,
                'companyCode': this.timelyFilingRules.companyCodeSelect,
                'billType': this.timelyFilingRules.billTypeSelect,
                'providerParStatus': this.timelyFilingRules.provStatusSelect,
                'serviceDeliveryState': this.timelyFilingRules.serviceStateSelect,
                'authorizationLevel': this.timelyFilingRules.authLevelSelect,
                'revenueCode': this.timelyFilingRules.revenueCodeSelect,
                'calcFromDate': this.timelyFilingRules.calcFromDate,
                'calcThruDate': this.timelyFilingRules.calcThruDate,
                'filingLimitDays': this.timelyFilingRules.filingLimitDays,
                'ignoreProvLimitDays': this.timelyFilingRules.provLimDaysFlag,
                'applyActionToAllDetailLin': this.timelyFilingRules.applyActionToAllDtlLines,
                'reasonCode': this.timelyFilingRules.reasonCode,
                'messageToOperator': this.timelyFilingRules.messageToOperator,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getTimelyFilingRuleses() {
        this.timelyFilingRulesService.getTimelyFilingRuleses().subscribe(timelyFilingRuleses => {
        this.timelyFilingRuleses = timelyFilingRuleses;
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
             headerName: "Rule Order",
             field: "ruleorder",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Effective Date",
             field: "effectivedate",
             width: 200         },
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
     private timelyFilingRulesService: TimelyFilingRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.timelyFilingRulesForm);
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
        this.formValidation = new FormValidation(this.timelyFilingRulesForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.timelyFilingRulesForm = this.formBuilder.group({
            claimType: ['', {updateOn: 'blur', validators: [] }],
            claimTypeDescription: ['', {updateOn: 'blur', validators: [] }],
            ruleOrder: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            billType: ['', {updateOn: 'blur', validators: [] }],
            providerParStatus: ['', {updateOn: 'blur', validators: [] }],
            serviceDeliveryState: ['', {updateOn: 'blur', validators: [] }],
            authorizationLevel: ['', {updateOn: 'blur', validators: [] }],
            revenueCode: ['', {updateOn: 'blur', validators: [] }],
            calcFromDate: ['', {updateOn: 'blur', validators: [] }],
            calcThruDate: ['', {updateOn: 'blur', validators: [] }],
            filingLimitDays: ['', {updateOn: 'blur', validators: [] }],
            ignoreProvLimitDays: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [] }],
            applyActionToAllDetailLin: ['', {updateOn: 'blur', validators: [] }],
            reasonCode: ['', {updateOn: 'blur', validators: [] }],
            messageToOperator: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}