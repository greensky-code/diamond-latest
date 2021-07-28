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
import {  AuthClaimMatchRules } from "../../api-models/index"
import {  AuthClaimMatchRulesService } from "../../api-services/auth-claim-match-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the AuthClaimMatchRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authclaimmatchrules',
    templateUrl: './auth-claim-match-rules.component.html',

})
export class AuthClaimMatchRulesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authClaimMatchRulesForm: FormGroup;
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

editAuthClaimMatchRules: boolean;
    authClaimMatchRules: AuthClaimMatchRules;
    authClaimMatchRuleses: AuthClaimMatchRules[];
    if (this.secWin.hasInsertPermission()) {
        createAuthClaimMatchRules() {
            this.formValidation.validateForm();
            if(this.authClaimMatchRulesForm.valid) {
                let authClaimMatchRules = new AuthClaimMatchRules();
                authClaimMatchRules.authPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'authPlaceOfSvc');
                authClaimMatchRules.authStatus = Form.getValue(this.authClaimMatchRulesForm, 'authStatus');
                authClaimMatchRules.authLevel = Form.getValue(this.authClaimMatchRulesForm, 'authLevel');
                authClaimMatchRules.diamondIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'diamondId');
                authClaimMatchRules.diagnosisUsed = Form.getValue(this.authClaimMatchRulesForm, 'diagnosis');
                authClaimMatchRules.matchFirstDigits = Form.getValue(this.authClaimMatchRulesForm, 'matchFirst');
                authClaimMatchRules.authNumberMatch = Form.getValue(this.authClaimMatchRulesForm, 'authNoMatch');
                authClaimMatchRules.claimPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'claimPlaceOfSvc');
                authClaimMatchRules.providerUsed = Form.getValue(this.authClaimMatchRulesForm, 'provider');
                authClaimMatchRules.exactPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'authclaimExactPlaceOfSvc');
                authClaimMatchRules.primarySpecialtyUsed = Form.getValue(this.authClaimMatchRulesForm, 'primarySpecialty');
                authClaimMatchRules.surgeryProcUsed = Form.getValue(this.authClaimMatchRulesForm, 'surgicalProc');
                authClaimMatchRules.vendorIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'vendorId');
                authClaimMatchRules.facilityIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'facultyId');
                authClaimMatchRules.primaryDosUsed = Form.getValue(this.authClaimMatchRulesForm, 'primaryDos');
                authClaimMatchRules.authBeginDaysBefore = Form.getValue(this.authClaimMatchRulesForm, 'authBeginDaysBefore');
                authClaimMatchRules.thruDosUsed = Form.getValue(this.authClaimMatchRulesForm, 'thruDos');
                authClaimMatchRules.authEndDaysAfter = Form.getValue(this.authClaimMatchRulesForm, 'authEndDaysAfter');
                authClaimMatchRules.action = Form.getValue(this.authClaimMatchRulesForm, 'action');
                authClaimMatchRules.reasonCode = Form.getValue(this.authClaimMatchRulesForm, 'reasonCode');
                authClaimMatchRules.applyAuthToClaim = Form.getValue(this.authClaimMatchRulesForm, 'applyAuthToClaim');
                this.authClaimMatchRulesService.createAuthClaimMatchRules(authClaimMatchRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAuthClaimMatchRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAuthClaimMatchRules(lineOfBusiness : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.authClaimMatchRulesForm.valid) {
            let authClaimMatchRules = new AuthClaimMatchRules();
            authClaimMatchRules.authPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'authPlaceOfSvc');
            authClaimMatchRules.authStatus = Form.getValue(this.authClaimMatchRulesForm, 'authStatus');
            authClaimMatchRules.authLevel = Form.getValue(this.authClaimMatchRulesForm, 'authLevel');
            authClaimMatchRules.diamondIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'diamondId');
            authClaimMatchRules.diagnosisUsed = Form.getValue(this.authClaimMatchRulesForm, 'diagnosis');
            authClaimMatchRules.matchFirstDigits = Form.getValue(this.authClaimMatchRulesForm, 'matchFirst');
            authClaimMatchRules.authNumberMatch = Form.getValue(this.authClaimMatchRulesForm, 'authNoMatch');
            authClaimMatchRules.claimPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'claimPlaceOfSvc');
            authClaimMatchRules.providerUsed = Form.getValue(this.authClaimMatchRulesForm, 'provider');
            authClaimMatchRules.exactPlaceServiceUsed = Form.getValue(this.authClaimMatchRulesForm, 'authclaimExactPlaceOfSvc');
            authClaimMatchRules.primarySpecialtyUsed = Form.getValue(this.authClaimMatchRulesForm, 'primarySpecialty');
            authClaimMatchRules.surgeryProcUsed = Form.getValue(this.authClaimMatchRulesForm, 'surgicalProc');
            authClaimMatchRules.vendorIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'vendorId');
            authClaimMatchRules.facilityIdUsed = Form.getValue(this.authClaimMatchRulesForm, 'facultyId');
            authClaimMatchRules.primaryDosUsed = Form.getValue(this.authClaimMatchRulesForm, 'primaryDos');
            authClaimMatchRules.authBeginDaysBefore = Form.getValue(this.authClaimMatchRulesForm, 'authBeginDaysBefore');
            authClaimMatchRules.thruDosUsed = Form.getValue(this.authClaimMatchRulesForm, 'thruDos');
            authClaimMatchRules.authEndDaysAfter = Form.getValue(this.authClaimMatchRulesForm, 'authEndDaysAfter');
            authClaimMatchRules.action = Form.getValue(this.authClaimMatchRulesForm, 'action');
            authClaimMatchRules.reasonCode = Form.getValue(this.authClaimMatchRulesForm, 'reasonCode');
            authClaimMatchRules.applyAuthToClaim = Form.getValue(this.authClaimMatchRulesForm, 'applyAuthToClaim');
            this.authClaimMatchRulesService.updateAuthClaimMatchRules(authClaimMatchRules, lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAuthClaimMatchRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveAuthClaimMatchRules() {
        if(this.editAuthClaimMatchRules) {
            this.updateAuthClaimMatchRules(this.authClaimMatchRules.lineOfBusiness)
        } else {
            this.createAuthClaimMatchRules();
        }
    }    deleteAuthClaimMatchRules(lineOfBusiness : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authClaimMatchRulesService.deleteAuthClaimMatchRules(lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAuthClaimMatchRules(lineOfBusiness : string) {
        this.authClaimMatchRulesService.getAuthClaimMatchRules(lineOfBusiness).subscribe(authClaimMatchRules => {
            this.authClaimMatchRules = authClaimMatchRules;
            this.authClaimMatchRulesForm.patchValue({
                'authPlaceOfSvc': this.authClaimMatchRules.authPlaceServiceUsed,
                'authStatus': this.authClaimMatchRules.authStatus,
                'authLevel': this.authClaimMatchRules.authLevel,
                'diamondId': this.authClaimMatchRules.diamondIdUsed,
                'diagnosis': this.authClaimMatchRules.diagnosisUsed,
                'matchFirst': this.authClaimMatchRules.matchFirstDigits,
                'authNoMatch': this.authClaimMatchRules.authNumberMatch,
                'claimPlaceOfSvc': this.authClaimMatchRules.claimPlaceServiceUsed,
                'provider': this.authClaimMatchRules.providerUsed,
                'authclaimExactPlaceOfSvc': this.authClaimMatchRules.exactPlaceServiceUsed,
                'primarySpecialty': this.authClaimMatchRules.primarySpecialtyUsed,
                'surgicalProc': this.authClaimMatchRules.surgeryProcUsed,
                'vendorId': this.authClaimMatchRules.vendorIdUsed,
                'facultyId': this.authClaimMatchRules.facilityIdUsed,
                'primaryDos': this.authClaimMatchRules.primaryDosUsed,
                'authBeginDaysBefore': this.authClaimMatchRules.authBeginDaysBefore,
                'thruDos': this.authClaimMatchRules.thruDosUsed,
                'authEndDaysAfter': this.authClaimMatchRules.authEndDaysAfter,
                'action': this.authClaimMatchRules.action,
                'reasonCode': this.authClaimMatchRules.reasonCode,
                'applyAuthToClaim': this.authClaimMatchRules.applyAuthToClaim,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAuthClaimMatchRuleses() {
        this.authClaimMatchRulesService.getAuthClaimMatchRuleses().subscribe(authClaimMatchRuleses => {
        this.authClaimMatchRuleses = authClaimMatchRuleses;
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
             headerName: "Line Of Business",
             field: "lineofbusiness",
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
             headerName: "Match Order",
             field: "matchorder",
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
     private authClaimMatchRulesService: AuthClaimMatchRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authClaimMatchRulesForm);
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
        this.formValidation = new FormValidation(this.authClaimMatchRulesForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authClaimMatchRulesForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            authPlaceOfSvc: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            claimType: ['', {updateOn: 'blur', validators: [] }],
            authStatus: ['', {updateOn: 'blur', validators: [Validators.maxLength(2)] }],
            matchOrder: ['', {updateOn: 'blur', validators: [] }],
            authLevel: ['', {updateOn: 'blur', validators: [Validators.maxLength(1)] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            diagnosis: ['', {updateOn: 'blur', validators: [] }],
            matchFirst: ['', {updateOn: 'blur', validators: [] }],
            authNoMatch: ['', {updateOn: 'blur', validators: [] }],
            claimPlaceOfSvc: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            authclaimExactPlaceOfSvc: ['', {updateOn: 'blur', validators: [] }],
            primarySpecialty: ['', {updateOn: 'blur', validators: [] }],
            surgicalProc: ['', {updateOn: 'blur', validators: [] }],
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            facultyId: ['', {updateOn: 'blur', validators: [] }],
            primaryDos: ['', {updateOn: 'blur', validators: [] }],
            authBeginDaysBefore: ['', {updateOn: 'blur', validators: [this.customValidators.number] }],
            thruDos: ['', {updateOn: 'blur', validators: [] }],
            authEndDaysAfter: ['', {updateOn: 'blur', validators: [this.customValidators.number] }],
            action: ['', {updateOn: 'blur', validators: [Validators.maxLength(1)] }],
            reasonCode: ['', {updateOn: 'blur', validators: [Validators.maxLength(5)] }],
            applyAuthToClaim: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}