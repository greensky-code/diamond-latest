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
import {  DeterminantTables } from "../../api-models/index"
import {  DeterminantTablesService } from "../../api-services/determinant-tables.service"
import {  DeterminantRules } from "../../api-models/index"
import {  DeterminantRulesService } from "../../api-services/determinant-rules.service"
import {  DeterminantValues } from "../../api-models/index"
import {  DeterminantValuesService } from "../../api-services/determinant-values.service"
import {  ClaimEvaluationRules } from "../../api-models/index"
import {  ClaimEvaluationRulesService } from "../../api-services/claim-evaluation-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ClaimEvaluationRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimevaluationrule',
    templateUrl: './claim-evaluation-rule.component.html',

})
export class ClaimEvaluationRuleComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimEvaluationRuleForm: FormGroup;
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

editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];editDeterminantRules: boolean;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];editClaimEvaluationRules: boolean;
    claimEvaluationRules: ClaimEvaluationRules;
    claimEvaluationRuleses: ClaimEvaluationRules[];
    if (this.secWin.hasInsertPermission()) {
        createDeterminantTables() {
            this.formValidation.validateForm();
            if(this.claimEvaluationRuleForm.valid) {
                let determinantTables = new DeterminantTables();
                determinantTables.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
        if(this.claimEvaluationRuleForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
            this.claimEvaluationRuleForm.patchValue({
                'procedureCode': this.determinantTables.securityCode,
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
            if(this.claimEvaluationRuleForm.valid) {
                let determinantRules = new DeterminantRules();
                determinantRules.fileType = Form.getValue(this.claimEvaluationRuleForm, 'claimType');
                determinantRules.ruleOrder = Form.getValue(this.claimEvaluationRuleForm, 'ruleOrderId');
                determinantRules.description = Form.getValue(this.claimEvaluationRuleForm, 'description');
                determinantRules.activeFlag = Form.getValue(this.claimEvaluationRuleForm, 'activeRule');
                determinantRules.actionCode = Form.getValue(this.claimEvaluationRuleForm, 'action');
                determinantRules.reasonCode = Form.getValue(this.claimEvaluationRuleForm, 'reasonCode');
                determinantRules.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
        if(this.claimEvaluationRuleForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.fileType = Form.getValue(this.claimEvaluationRuleForm, 'claimType');
            determinantRules.ruleOrder = Form.getValue(this.claimEvaluationRuleForm, 'ruleOrderId');
            determinantRules.description = Form.getValue(this.claimEvaluationRuleForm, 'description');
            determinantRules.activeFlag = Form.getValue(this.claimEvaluationRuleForm, 'activeRule');
            determinantRules.actionCode = Form.getValue(this.claimEvaluationRuleForm, 'action');
            determinantRules.reasonCode = Form.getValue(this.claimEvaluationRuleForm, 'reasonCode');
            determinantRules.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
            this.claimEvaluationRuleForm.patchValue({
                'claimType': this.determinantRules.fileType,
                'ruleOrderId': this.determinantRules.ruleOrder,
                'description': this.determinantRules.description,
                'activeRule': this.determinantRules.activeFlag,
                'action': this.determinantRules.actionCode,
                'reasonCode': this.determinantRules.reasonCode,
                'procedureCode': this.determinantRules.securityCode,
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
            if(this.claimEvaluationRuleForm.valid) {
                let determinantValues = new DeterminantValues();
                determinantValues.operator = Form.getValue(this.claimEvaluationRuleForm, 'messageToOperator');
                determinantValues.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
        if(this.claimEvaluationRuleForm.valid) {
            let determinantValues = new DeterminantValues();
            determinantValues.operator = Form.getValue(this.claimEvaluationRuleForm, 'messageToOperator');
            determinantValues.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
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
            this.claimEvaluationRuleForm.patchValue({
                'messageToOperator': this.determinantValues.operator,
                'procedureCode': this.determinantValues.securityCode,
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
        createClaimEvaluationRules() {
            this.formValidation.validateForm();
            if(this.claimEvaluationRuleForm.valid) {
                let claimEvaluationRules = new ClaimEvaluationRules();
                claimEvaluationRules.timeframe = Form.getValue(this.claimEvaluationRuleForm, 'timeframe');
                claimEvaluationRules.primaryMatch = Form.getValue(this.claimEvaluationRuleForm, 'primary');
                claimEvaluationRules.provider = Form.getValue(this.claimEvaluationRuleForm, 'provider');
                claimEvaluationRules.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
                claimEvaluationRules.benefitPackage = Form.getValue(this.claimEvaluationRuleForm, 'benefitsPackage');
                claimEvaluationRules.medicalDefinitions = Form.getValue(this.claimEvaluationRuleForm, 'medicalDefinitions');
                this.claimEvaluationRulesService.createClaimEvaluationRules(claimEvaluationRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editClaimEvaluationRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateClaimEvaluationRules(seqCerulId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimEvaluationRuleForm.valid) {
            let claimEvaluationRules = new ClaimEvaluationRules();
            claimEvaluationRules.timeframe = Form.getValue(this.claimEvaluationRuleForm, 'timeframe');
            claimEvaluationRules.primaryMatch = Form.getValue(this.claimEvaluationRuleForm, 'primary');
            claimEvaluationRules.provider = Form.getValue(this.claimEvaluationRuleForm, 'provider');
            claimEvaluationRules.securityCode = Form.getValue(this.claimEvaluationRuleForm, 'procedureCode');
            claimEvaluationRules.benefitPackage = Form.getValue(this.claimEvaluationRuleForm, 'benefitsPackage');
            claimEvaluationRules.medicalDefinitions = Form.getValue(this.claimEvaluationRuleForm, 'medicalDefinitions');
            this.claimEvaluationRulesService.updateClaimEvaluationRules(claimEvaluationRules, seqCerulId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClaimEvaluationRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveClaimEvaluationRules() {
        if(this.editClaimEvaluationRules) {
            this.updateClaimEvaluationRules(this.claimEvaluationRules.seqCerulId)
        } else {
            this.createClaimEvaluationRules();
        }
    }    deleteClaimEvaluationRules(seqCerulId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.claimEvaluationRulesService.deleteClaimEvaluationRules(seqCerulId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getClaimEvaluationRules(seqCerulId : number) {
        this.claimEvaluationRulesService.getClaimEvaluationRules(seqCerulId).subscribe(claimEvaluationRules => {
            this.claimEvaluationRules = claimEvaluationRules;
            this.claimEvaluationRuleForm.patchValue({
                'timeframe': this.claimEvaluationRules.timeframe,
                'primary': this.claimEvaluationRules.primaryMatch,
                'provider': this.claimEvaluationRules.provider,
                'procedureCode': this.claimEvaluationRules.securityCode,
                'benefitsPackage': this.claimEvaluationRules.benefitPackage,
                'medicalDefinitions': this.claimEvaluationRules.medicalDefinitions,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClaimEvaluationRuleses() {
        this.claimEvaluationRulesService.getClaimEvaluationRuleses().subscribe(claimEvaluationRuleses => {
        this.claimEvaluationRuleses = claimEvaluationRuleses;
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
             headerName: "Sequence",
             field: "seqruleid",
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
     private determinantTablesService: DeterminantTablesService, private determinantRulesService: DeterminantRulesService, private determinantValuesService: DeterminantValuesService, private claimEvaluationRulesService: ClaimEvaluationRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimEvaluationRuleForm);
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
        this.formValidation = new FormValidation(this.claimEvaluationRuleForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimEvaluationRuleForm = this.formBuilder.group({
            claimType: ['', {updateOn: 'blur', validators: [] }],
            ruleOrderId: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            activeRule: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [] }],
            reasonCode: ['', {updateOn: 'blur', validators: [] }],
            messageToOperator: ['', {updateOn: 'blur', validators: [] }],
            sequence: ['', {updateOn: 'blur', validators: [] }],
            determinantTable: ['', {updateOn: 'blur', validators: [] }],
            determinantColumn: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            timeframe: ['', {updateOn: 'blur', validators: [] }],
            noPeriods: ['', {updateOn: 'blur', validators: [] }],
            primary: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }],
            benefitsPackage: ['', {updateOn: 'blur', validators: [] }],
            dynamicText003: ['', {updateOn: 'blur', validators: [] }],
            medicalDefinitions: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}