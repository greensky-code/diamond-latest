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
import {  DeterminantRules } from "../../api-models/index"
import {  DeterminantRulesService } from "../../api-services/determinant-rules.service"
import {  DeterminantValues } from "../../api-models/index"
import {  DeterminantValuesService } from "../../api-services/determinant-values.service"
import {  DeterminantTables } from "../../api-models/index"
import {  DeterminantTablesService } from "../../api-services/determinant-tables.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProviderAdminitrativeFeeRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'provideradminitrativefeerule',
    templateUrl: './provider-adminitrative-fee-rule.component.html',

})
export class ProviderAdminitrativeFeeRuleComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerAdminitrativeFeeRuleForm: FormGroup;
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

editDeterminantRules: boolean;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];
    if (this.secWin.hasInsertPermission()) {
        createDeterminantRules() {
            this.formValidation.validateForm();
            if(this.providerAdminitrativeFeeRuleForm.valid) {
                let determinantRules = new DeterminantRules();
                determinantRules.ruleId = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'ruleId');
                determinantRules.description = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'descrition');
                determinantRules.effectiveDate = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'effDate');
                determinantRules.termDate = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'termDate');
                determinantRules.termReason = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'termRsn');
                determinantRules.reasonCode = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'reasonCode');
                determinantRules.userDefined1 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDefined1');
                determinantRules.userDate1 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDate1');
                determinantRules.userDefined2 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDefined2');
                determinantRules.userDate2 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDate2');
                determinantRules.fileType = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'claimType');
                determinantRules.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
                this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDeterminantRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateDeterminantRules(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerAdminitrativeFeeRuleForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.ruleId = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'ruleId');
            determinantRules.description = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'descrition');
            determinantRules.effectiveDate = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'effDate');
            determinantRules.termDate = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'termDate');
            determinantRules.termReason = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'termRsn');
            determinantRules.reasonCode = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'reasonCode');
            determinantRules.userDefined1 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDefined1');
            determinantRules.userDate1 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDate1');
            determinantRules.userDefined2 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDefined2');
            determinantRules.userDate2 = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'userDate2');
            determinantRules.fileType = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'claimType');
            determinantRules.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
            this.determinantRulesService.updateDeterminantRules(determinantRules, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveDeterminantRules() {
        if(this.editDeterminantRules) {
            this.updateDeterminantRules(this.determinantRules.keyword)
        } else {
            this.createDeterminantRules();
        }
    }    deleteDeterminantRules(keyword : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantRulesService.deleteDeterminantRules(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getDeterminantRules(keyword : string) {
        this.determinantRulesService.getDeterminantRules(keyword).subscribe(determinantRules => {
            this.determinantRules = determinantRules;
            this.providerAdminitrativeFeeRuleForm.patchValue({
                'ruleId': this.determinantRules.ruleId,
                'descrition': this.determinantRules.description,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.termDate),
                'termRsn': this.determinantRules.termReason,
                'reasonCode': this.determinantRules.reasonCode,
                'userDefined1': this.determinantRules.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.userDate1),
                'userDefined2': this.determinantRules.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.userDate2),
                'claimType': this.determinantRules.fileType,
                'searchSeq': this.determinantRules.insertUser,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRuleses().subscribe(determinantRuleses => {
        this.determinantRuleses = determinantRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createDeterminantValues() {
            this.formValidation.validateForm();
            if(this.providerAdminitrativeFeeRuleForm.valid) {
                let determinantValues = new DeterminantValues();
                determinantValues.operator = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'percent');
                determinantValues.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
                determinantValues.secDeterminantTable = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'determinantTable');
                determinantValues.secDeterminantColumn = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'determinantColumn');
                this.determinantValuesService.createDeterminantValues(determinantValues).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDeterminantValues = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateDeterminantValues(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerAdminitrativeFeeRuleForm.valid) {
            let determinantValues = new DeterminantValues();
            determinantValues.operator = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'percent');
            determinantValues.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
            determinantValues.secDeterminantTable = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'determinantTable');
            determinantValues.secDeterminantColumn = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'determinantColumn');
            this.determinantValuesService.updateDeterminantValues(determinantValues, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantValues = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveDeterminantValues() {
        if(this.editDeterminantValues) {
            this.updateDeterminantValues(this.determinantValues.keyword)
        } else {
            this.createDeterminantValues();
        }
    }    deleteDeterminantValues(keyword : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantValuesService.deleteDeterminantValues(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getDeterminantValues(keyword : string) {
        this.determinantValuesService.getDeterminantValues(keyword).subscribe(determinantValues => {
            this.determinantValues = determinantValues;
            this.providerAdminitrativeFeeRuleForm.patchValue({
                'percent': this.determinantValues.operator,
                'searchSeq': this.determinantValues.insertUser,
                'determinantTable': this.determinantValues.secDeterminantTable,
                'determinantColumn': this.determinantValues.secDeterminantColumn,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantValueses() {
        this.determinantValuesService.getDeterminantValueses().subscribe(determinantValueses => {
        this.determinantValueses = determinantValueses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createDeterminantTables() {
            this.formValidation.validateForm();
            if(this.providerAdminitrativeFeeRuleForm.valid) {
                let determinantTables = new DeterminantTables();
                determinantTables.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
                this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDeterminantTables = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateDeterminantTables(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerAdminitrativeFeeRuleForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.insertUser = Form.getValue(this.providerAdminitrativeFeeRuleForm, 'searchSeq');
            this.determinantTablesService.updateDeterminantTables(determinantTables, keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDeterminantTables = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveDeterminantTables() {
        if(this.editDeterminantTables) {
            this.updateDeterminantTables(this.determinantTables.keyword)
        } else {
            this.createDeterminantTables();
        }
    }    deleteDeterminantTables(keyword : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantTablesService.deleteDeterminantTables(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getDeterminantTables(keyword : string) {
        this.determinantTablesService.getDeterminantTables(keyword).subscribe(determinantTables => {
            this.determinantTables = determinantTables;
            this.providerAdminitrativeFeeRuleForm.patchValue({
                'searchSeq': this.determinantTables.insertUser,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
        this.determinantTableses = determinantTableses;
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
             headerName: "Search Seq",
             field: "searchsequence",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Determinant Table",
             field: "determinanttable",
             width: 200         },
         {
             headerName: "Determinant Column",
             field: "determinantcolumn",
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
             headerName: "Operator",
             field: "operator",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Form Value",
             field: "",
             width: 200         },
         {
             headerName: "Thru Value",
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
    private secWinService: SecWinService,
     private determinantRulesService: DeterminantRulesService, private determinantValuesService: DeterminantValuesService, private determinantTablesService: DeterminantTablesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerAdminitrativeFeeRuleForm);
         this.createDataGrid001();
         this.createDataGrid002();
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
        this.formValidation = new FormValidation(this.providerAdminitrativeFeeRuleForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerAdminitrativeFeeRuleForm = this.formBuilder.group({
            ruleId: ['', {updateOn: 'blur', validators: [] }],
            descrition: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            effDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            termRsn: ['', {updateOn: 'blur', validators: [] }],
            amount: ['', {updateOn: 'blur', validators: [] }],
            percent: ['', {updateOn: 'blur', validators: [] }],
            applyPctTo: ['', {updateOn: 'blur', validators: [] }],
            reasonCode: ['', {updateOn: 'blur', validators: [] }],
            userDefined1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDefined2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }],
            claimType: ['', {updateOn: 'blur', validators: [] }],
            requireCleanClaim: ['', {updateOn: 'blur', validators: [] }],
            requireCapLine: ['', {updateOn: 'blur', validators: [] }],
            searchSeq: ['', {updateOn: 'blur', validators: [] }],
            determinantTable: ['', {updateOn: 'blur', validators: [] }],
            determinantColumn: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}