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
import {  DeterminantValues } from "../../api-models/index"
import {  DeterminantValuesService } from "../../api-services/determinant-values.service"
import {  DeterminantTables } from "../../api-models/index"
import {  DeterminantTablesService } from "../../api-services/determinant-tables.service"
import {  DeterminantRules } from "../../api-models/index"
import {  DeterminantRulesService } from "../../api-services/determinant-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ClaimInterestCalcRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claiminterestcalc.rules',
    templateUrl: './claim-interest-calc.-rules.component.html',

})
export class ClaimInterestCalcRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimInterestCalcRulesForm: FormGroup;
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

editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];editDeterminantRules: boolean;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];
    if (this.secWin.hasInsertPermission()) {
        createDeterminantValues() {
            this.formValidation.validateForm();
            if(this.claimInterestCalcRulesForm.valid) {
                let determinantValues = new DeterminantValues();
                determinantValues.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantValues.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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


    updateDeterminantValues(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimInterestCalcRulesForm.valid) {
            let determinantValues = new DeterminantValues();
            determinantValues.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
            determinantValues.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantValues.insertProcess,
                'interest': this.determinantValues.insertUser,
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
            if(this.claimInterestCalcRulesForm.valid) {
                let determinantTables = new DeterminantTables();
                determinantTables.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantTables.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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


    updateDeterminantTables(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimInterestCalcRulesForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
            determinantTables.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantTables.insertProcess,
                'interest': this.determinantTables.insertUser,
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
    if (this.secWin.hasInsertPermission()) {
        createDeterminantRules() {
            this.formValidation.validateForm();
            if(this.claimInterestCalcRulesForm.valid) {
                let determinantRules = new DeterminantRules();
                determinantRules.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantRules.reasonCode = Form.getValue(this.claimInterestCalcRulesForm, 'reason');
                determinantRules.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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


    updateDeterminantRules(keyword : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimInterestCalcRulesForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
            determinantRules.reasonCode = Form.getValue(this.claimInterestCalcRulesForm, 'reason');
            determinantRules.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
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
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantRules.insertProcess,
                'reason': this.determinantRules.reasonCode,
                'interest': this.determinantRules.insertUser,
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

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
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

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    dataGrid003GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Claim Type",
             field: "filetype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Rule Order",
             field: "seqruleid",
             width: 200         },
         {
             headerName: "Effective Date",
             field: "effectivedate",
             width: 200         },
         {
             headerName: "Term Date",
             field: "determinantdatatype",
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
    createDataGrid003(): void {
      this.dataGrid003GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid003GridOptions.editType = 'fullRow';
      this.dataGrid003GridOptions.columnDefs = [
         {
             headerName: "Operator",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Sec Determinant Table",
             field: "secdeterminanttable",
             width: 200         },
         {
             headerName: "Sec Determinant Column",
             field: "secdeterminantcolumn",
             width: 200         },
         {
             headerName: "From Value",
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
    private modalService: NgbModal,
    private securityService: SecurityService,
     private determinantValuesService: DeterminantValuesService, private determinantTablesService: DeterminantTablesService, private determinantRulesService: DeterminantRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimInterestCalcRulesForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
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
        this.formValidation = new FormValidation(this.claimInterestCalcRulesForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimInterestCalcRulesForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            claim: ['', {updateOn: 'blur', validators: [] }],
            ruleOrder: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            calcMethod: ['', {updateOn: 'blur', validators: [] }],
            pct: ['', {updateOn: 'blur', validators: [] }],
            reason: ['', {updateOn: 'blur', validators: [] }],
            interest: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            penalty: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }],
            textbox004: ['', {updateOn: 'blur', validators: [] }],
            interestFormula: ['', {updateOn: 'blur', validators: [] }],
            minPayableIntrline: ['', {updateOn: 'blur', validators: [] }],
            graceDays001: ['', {updateOn: 'blur', validators: [] }],
            graceDays002: ['', {updateOn: 'blur', validators: [] }],
            minPayableIntrclaimTb: ['', {updateOn: 'blur', validators: [] }],
            mailingDays: ['', {updateOn: 'blur', validators: [] }],
            exclUncleanClaimLine: ['', {updateOn: 'blur', validators: [] }],
            searchSeq: ['', {updateOn: 'blur', validators: [] }],
            determinantTable: ['', {updateOn: 'blur', validators: [] }],
            determinantColumn: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}