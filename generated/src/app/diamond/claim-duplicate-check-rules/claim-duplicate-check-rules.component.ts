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
import {  ClaimsDuplicateRule } from "../../api-models/index"
import {  ClaimsDuplicateRuleService } from "../../api-services/claims-duplicate-rule.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ClaimDuplicateCheckRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimduplicatecheckrules',
    templateUrl: './claim-duplicate-check-rules.component.html',

})
export class ClaimDuplicateCheckRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimDuplicateCheckRulesForm: FormGroup;
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

editClaimsDuplicateRule: boolean;
    claimsDuplicateRule: ClaimsDuplicateRule;
    claimsDuplicateRules: ClaimsDuplicateRule[];
    if (this.secWin.hasInsertPermission()) {
        createClaimsDuplicateRule() {
            this.formValidation.validateForm();
            if(this.claimDuplicateCheckRulesForm.valid) {
                let claimsDuplicateRule = new ClaimsDuplicateRule();
                claimsDuplicateRule.description = Form.getValue(this.claimDuplicateCheckRulesForm, 'desc');
                claimsDuplicateRule.primDtUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos001');
                claimsDuplicateRule.primDtUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos002');
                claimsDuplicateRule.primDtUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos003');
                claimsDuplicateRule.primDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos001');
                claimsDuplicateRule.primDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos002');
                claimsDuplicateRule.primDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos003');
                claimsDuplicateRule.primDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos001');
                claimsDuplicateRule.primDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos002');
                claimsDuplicateRule.primDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos003');
                claimsDuplicateRule.sameTotBill1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled001');
                claimsDuplicateRule.sameTotBill2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled002');
                claimsDuplicateRule.sameTotBill3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled003');
                claimsDuplicateRule.samePlcServ1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService001');
                claimsDuplicateRule.samePlcServ2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService002');
                claimsDuplicateRule.samePlcServ3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'laceOfService');
                claimsDuplicateRule.specDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos004');
                claimsDuplicateRule.specDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos005');
                claimsDuplicateRule.specDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos006');
                claimsDuplicateRule.sameBillAmt1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount001');
                claimsDuplicateRule.sameBillAmt2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount002');
                claimsDuplicateRule.sameBillAmt3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount003');
                claimsDuplicateRule.sameProcCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode001');
                claimsDuplicateRule.sameProcCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode002');
                claimsDuplicateRule.sameProcCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode003');
                claimsDuplicateRule.sameMedDef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef001');
                claimsDuplicateRule.sameMedDef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef002');
                claimsDuplicateRule.sameMedDef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef003');
                claimsDuplicateRule.sameProcMod1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier001');
                claimsDuplicateRule.sameProcMod2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier002');
                claimsDuplicateRule.action2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action002');
                claimsDuplicateRule.action3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action003');
                claimsDuplicateRule.action1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action004');
                claimsDuplicateRule.reasonCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode001');
                claimsDuplicateRule.reasonCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode002');
                claimsDuplicateRule.reasonCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode003');
                this.claimsDuplicateRuleService.createClaimsDuplicateRule(claimsDuplicateRule).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editClaimsDuplicateRule = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateClaimsDuplicateRule(claimDupRule : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimDuplicateCheckRulesForm.valid) {
            let claimsDuplicateRule = new ClaimsDuplicateRule();
            claimsDuplicateRule.description = Form.getValue(this.claimDuplicateCheckRulesForm, 'desc');
            claimsDuplicateRule.primDtUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos001');
            claimsDuplicateRule.primDtUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos002');
            claimsDuplicateRule.primDtUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos003');
            claimsDuplicateRule.primDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos001');
            claimsDuplicateRule.primDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos002');
            claimsDuplicateRule.primDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos003');
            claimsDuplicateRule.primDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos001');
            claimsDuplicateRule.primDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos002');
            claimsDuplicateRule.primDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos003');
            claimsDuplicateRule.sameTotBill1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled001');
            claimsDuplicateRule.sameTotBill2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled002');
            claimsDuplicateRule.sameTotBill3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled003');
            claimsDuplicateRule.samePlcServ1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService001');
            claimsDuplicateRule.samePlcServ2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService002');
            claimsDuplicateRule.samePlcServ3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'laceOfService');
            claimsDuplicateRule.specDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos004');
            claimsDuplicateRule.specDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos005');
            claimsDuplicateRule.specDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos006');
            claimsDuplicateRule.sameBillAmt1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount001');
            claimsDuplicateRule.sameBillAmt2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount002');
            claimsDuplicateRule.sameBillAmt3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount003');
            claimsDuplicateRule.sameProcCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode001');
            claimsDuplicateRule.sameProcCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode002');
            claimsDuplicateRule.sameProcCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode003');
            claimsDuplicateRule.sameMedDef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef001');
            claimsDuplicateRule.sameMedDef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef002');
            claimsDuplicateRule.sameMedDef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef003');
            claimsDuplicateRule.sameProcMod1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier001');
            claimsDuplicateRule.sameProcMod2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier002');
            claimsDuplicateRule.action2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action002');
            claimsDuplicateRule.action3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action003');
            claimsDuplicateRule.action1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action004');
            claimsDuplicateRule.reasonCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode001');
            claimsDuplicateRule.reasonCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode002');
            claimsDuplicateRule.reasonCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode003');
            this.claimsDuplicateRuleService.updateClaimsDuplicateRule(claimsDuplicateRule, claimDupRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editClaimsDuplicateRule = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveClaimsDuplicateRule() {
        if(this.editClaimsDuplicateRule) {
            this.updateClaimsDuplicateRule(this.claimsDuplicateRule.claimDupRule)
        } else {
            this.createClaimsDuplicateRule();
        }
    }    deleteClaimsDuplicateRule(claimDupRule : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.claimsDuplicateRuleService.deleteClaimsDuplicateRule(claimDupRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getClaimsDuplicateRule(claimDupRule : string) {
        this.claimsDuplicateRuleService.getClaimsDuplicateRule(claimDupRule).subscribe(claimsDuplicateRule => {
            this.claimsDuplicateRule = claimsDuplicateRule;
            this.claimDuplicateCheckRulesForm.patchValue({
                'desc': this.claimsDuplicateRule.description,
                'primaryDos001': this.claimsDuplicateRule.primDtUsed1,
                'primaryDos002': this.claimsDuplicateRule.primDtUsed2,
                'primaryDos003': this.claimsDuplicateRule.primDtUsed3,
                'daysBeforeDos001': this.claimsDuplicateRule.primDtDaysBef1,
                'daysBeforeDos002': this.claimsDuplicateRule.primDtDaysBef2,
                'daysBeforeDos003': this.claimsDuplicateRule.primDtDaysBef3,
                'daysAfterDos001': this.claimsDuplicateRule.primDtDaysAft1,
                'daysAfterDos002': this.claimsDuplicateRule.primDtDaysAft2,
                'daysAfterDos003': this.claimsDuplicateRule.primDtDaysAft3,
                'totalBilled001': this.claimsDuplicateRule.sameTotBill1,
                'totalBilled002': this.claimsDuplicateRule.sameTotBill2,
                'totalBilled003': this.claimsDuplicateRule.sameTotBill3,
                'placeOfService001': this.claimsDuplicateRule.samePlcServ1,
                'placeOfService002': this.claimsDuplicateRule.samePlcServ2,
                'laceOfService': this.claimsDuplicateRule.samePlcServ3,
                'daysAfterDos004': this.claimsDuplicateRule.specDtDaysAft1,
                'daysAfterDos005': this.claimsDuplicateRule.specDtDaysAft2,
                'daysAfterDos006': this.claimsDuplicateRule.specDtDaysAft3,
                'billedAmount001': this.claimsDuplicateRule.sameBillAmt1,
                'billedAmount002': this.claimsDuplicateRule.sameBillAmt2,
                'billedAmount003': this.claimsDuplicateRule.sameBillAmt3,
                'procedureCode001': this.claimsDuplicateRule.sameProcCode1,
                'procedureCode002': this.claimsDuplicateRule.sameProcCode2,
                'procedureCode003': this.claimsDuplicateRule.sameProcCode3,
                'medDef001': this.claimsDuplicateRule.sameMedDef1,
                'medDef002': this.claimsDuplicateRule.sameMedDef2,
                'medDef003': this.claimsDuplicateRule.sameMedDef3,
                'procModifier001': this.claimsDuplicateRule.sameProcMod1,
                'procModifier002': this.claimsDuplicateRule.sameProcMod2,
                'action002': this.claimsDuplicateRule.action2,
                'action003': this.claimsDuplicateRule.action3,
                'action004': this.claimsDuplicateRule.action1,
                'reasonCode001': this.claimsDuplicateRule.reasonCode1,
                'reasonCode002': this.claimsDuplicateRule.reasonCode2,
                'reasonCode003': this.claimsDuplicateRule.reasonCode3,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getClaimsDuplicateRules() {
        this.claimsDuplicateRuleService.getClaimsDuplicateRules().subscribe(claimsDuplicateRules => {
        this.claimsDuplicateRules = claimsDuplicateRules;
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
             headerName: "Dup Rule",
             field: "claimduprule",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Claim Type",
             field: "claimtype",
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
     private claimsDuplicateRuleService: ClaimsDuplicateRuleService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDuplicateCheckRulesForm);
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
        this.formValidation = new FormValidation(this.claimDuplicateCheckRulesForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDuplicateCheckRulesForm = this.formBuilder.group({
            dupRule: ['', {updateOn: 'blur', validators: [] }],
            claimType: ['', {updateOn: 'blur', validators: [] }],
            desc: ['', {updateOn: 'blur', validators: [] }],
            primaryDos001: ['', {updateOn: 'blur', validators: [] }],
            primaryDos002: ['', {updateOn: 'blur', validators: [] }],
            primaryDos003: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos001: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos002: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos003: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos001: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos002: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos003: ['', {updateOn: 'blur', validators: [] }],
            provider001: ['', {updateOn: 'blur', validators: [] }],
            provider002: ['', {updateOn: 'blur', validators: [] }],
            provider003: ['', {updateOn: 'blur', validators: [] }],
            totalBilled001: ['', {updateOn: 'blur', validators: [] }],
            totalBilled002: ['', {updateOn: 'blur', validators: [] }],
            totalBilled003: ['', {updateOn: 'blur', validators: [] }],
            placeOfService001: ['', {updateOn: 'blur', validators: [] }],
            placeOfService002: ['', {updateOn: 'blur', validators: [] }],
            laceOfService: ['', {updateOn: 'blur', validators: [] }],
            detailDos001: ['', {updateOn: 'blur', validators: [] }],
            detailDos002: ['', {updateOn: 'blur', validators: [] }],
            etailDos: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos004: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos005: ['', {updateOn: 'blur', validators: [] }],
            daysBeforeDos006: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos004: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos005: ['', {updateOn: 'blur', validators: [] }],
            daysAfterDos006: ['', {updateOn: 'blur', validators: [] }],
            billedAmount001: ['', {updateOn: 'blur', validators: [] }],
            billedAmount002: ['', {updateOn: 'blur', validators: [] }],
            billedAmount003: ['', {updateOn: 'blur', validators: [] }],
            procedureCode001: ['', {updateOn: 'blur', validators: [] }],
            procedureCode002: ['', {updateOn: 'blur', validators: [] }],
            procedureCode003: ['', {updateOn: 'blur', validators: [] }],
            medDef001: ['', {updateOn: 'blur', validators: [] }],
            medDef002: ['', {updateOn: 'blur', validators: [] }],
            medDef003: ['', {updateOn: 'blur', validators: [] }],
            procModifier001: ['', {updateOn: 'blur', validators: [] }],
            procModifier002: ['', {updateOn: 'blur', validators: [] }],
            action002: ['', {updateOn: 'blur', validators: [] }],
            action003: ['', {updateOn: 'blur', validators: [] }],
            action004: ['', {updateOn: 'blur', validators: [] }],
            reasonCode001: ['', {updateOn: 'blur', validators: [] }],
            reasonCode002: ['', {updateOn: 'blur', validators: [] }],
            reasonCode003: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}