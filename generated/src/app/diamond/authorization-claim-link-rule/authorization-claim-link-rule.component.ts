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
import {  AuthClaimLinkRule } from "../../api-models/index"
import {  AuthClaimLinkRuleService } from "../../api-services/auth-claim-link-rule.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the AuthorizationClaimLinkRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationclaimlinkrule',
    templateUrl: './authorization-claim-link-rule.component.html',

})
export class AuthorizationClaimLinkRuleComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationClaimLinkRuleForm: FormGroup;
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

editAuthClaimLinkRule: boolean;
    authClaimLinkRule: AuthClaimLinkRule;
    authClaimLinkRules: AuthClaimLinkRule[];
    if (this.secWin.hasInsertPermission()) {
        createAuthClaimLinkRule() {
            this.formValidation.validateForm();
            if(this.authorizationClaimLinkRuleForm.valid) {
                let authClaimLinkRule = new AuthClaimLinkRule();
                authClaimLinkRule.lineOfBusiness = Form.getValue(this.authorizationClaimLinkRuleForm, 'lineOfBusiness');
                authClaimLinkRule.seqAuthType = Form.getValue(this.authorizationClaimLinkRuleForm, 'authType');
                authClaimLinkRule.authExpiredReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsExpired');
                authClaimLinkRule.authCostExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsExpiredReaso');
                authClaimLinkRule.authClosedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsClosed');
                authClaimLinkRule.authQuantityExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsClosedReason');
                authClaimLinkRule.authNewReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsNewReason');
                authClaimLinkRule.authHeldReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsHeldReason');
                authClaimLinkRule.authDeniedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsDenied');
                authClaimLinkRule.authDateReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsDeniedReason');
                authClaimLinkRule.authCostExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationCostExceeded');
                authClaimLinkRule.authQuantityExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationCostExceededRe');
                this.authClaimLinkRuleService.createAuthClaimLinkRule(authClaimLinkRule).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAuthClaimLinkRule = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAuthClaimLinkRule(lineOfBusiness : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.authorizationClaimLinkRuleForm.valid) {
            let authClaimLinkRule = new AuthClaimLinkRule();
            authClaimLinkRule.lineOfBusiness = Form.getValue(this.authorizationClaimLinkRuleForm, 'lineOfBusiness');
            authClaimLinkRule.seqAuthType = Form.getValue(this.authorizationClaimLinkRuleForm, 'authType');
            authClaimLinkRule.authExpiredReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsExpired');
            authClaimLinkRule.authCostExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsExpiredReaso');
            authClaimLinkRule.authClosedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsClosed');
            authClaimLinkRule.authQuantityExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsClosedReason');
            authClaimLinkRule.authNewReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsNewReason');
            authClaimLinkRule.authHeldReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsHeldReason');
            authClaimLinkRule.authDeniedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsDenied');
            authClaimLinkRule.authDateReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationIsDeniedReason');
            authClaimLinkRule.authCostExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationCostExceeded');
            authClaimLinkRule.authQuantityExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authorizationCostExceededRe');
            this.authClaimLinkRuleService.updateAuthClaimLinkRule(authClaimLinkRule, lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAuthClaimLinkRule = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveAuthClaimLinkRule() {
        if(this.editAuthClaimLinkRule) {
            this.updateAuthClaimLinkRule(this.authClaimLinkRule.lineOfBusiness)
        } else {
            this.createAuthClaimLinkRule();
        }
    }    deleteAuthClaimLinkRule(lineOfBusiness : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authClaimLinkRuleService.deleteAuthClaimLinkRule(lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAuthClaimLinkRule(lineOfBusiness : string) {
        this.authClaimLinkRuleService.getAuthClaimLinkRule(lineOfBusiness).subscribe(authClaimLinkRule => {
            this.authClaimLinkRule = authClaimLinkRule;
            this.authorizationClaimLinkRuleForm.patchValue({
                'lineOfBusiness': this.authClaimLinkRule.lineOfBusiness,
                'authType': this.authClaimLinkRule.seqAuthType,
                'authorizationIsExpired': this.authClaimLinkRule.authExpiredReason,
                'authorizationIsExpiredReaso': this.authClaimLinkRule.authCostExceededReason,
                'authorizationIsClosed': this.authClaimLinkRule.authClosedReason,
                'authorizationIsClosedReason': this.authClaimLinkRule.authQuantityExceededReason,
                'authorizationIsNewReason': this.authClaimLinkRule.authNewReason,
                'authorizationIsHeldReason': this.authClaimLinkRule.authHeldReason,
                'authorizationIsDenied': this.authClaimLinkRule.authDeniedReason,
                'authorizationIsDeniedReason': this.authClaimLinkRule.authDateReason,
                'authorizationCostExceeded': this.authClaimLinkRule.authCostExceededStatus,
                'authorizationCostExceededRe': this.authClaimLinkRule.authQuantityExceededStatus,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAuthClaimLinkRules() {
        this.authClaimLinkRuleService.getAuthClaimLinkRules().subscribe(authClaimLinkRules => {
        this.authClaimLinkRules = authClaimLinkRules;
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
             headerName: "Line of Business",
             field: "lineofbusiness",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Auth Type",
             field: "seqauthtype",
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
     private authClaimLinkRuleService: AuthClaimLinkRuleService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationClaimLinkRuleForm);
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
        this.formValidation = new FormValidation(this.authorizationClaimLinkRuleForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationClaimLinkRuleForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            authType: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsExpired: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsExpiredReaso: ['', {updateOn: 'blur', validators: [] }],
            claimDateOutsdeAuthorizatio001: ['', {updateOn: 'blur', validators: [] }],
            claimDateOutsdeAuthorizatio002: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsClosed: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsClosedReason: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsNew: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsNewReason: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsHeld: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsHeldReason: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsDenied: ['', {updateOn: 'blur', validators: [] }],
            authorizationIsDeniedReason: ['', {updateOn: 'blur', validators: [] }],
            authorizationVisitsdaysExce001: ['', {updateOn: 'blur', validators: [] }],
            authorizationVisitsdaysExce002: ['', {updateOn: 'blur', validators: [] }],
            authorizationCostExceeded: ['', {updateOn: 'blur', validators: [] }],
            authorizationCostExceededRe: ['', {updateOn: 'blur', validators: [] }],
            authorization2NdOpinionExce001: ['', {updateOn: 'blur', validators: [] }],
            authorization2NdOpinionExce002: ['', {updateOn: 'blur', validators: [] }],
            groupOrPlanOnClaimDoesNo001: ['', {updateOn: 'blur', validators: [] }],
            groupOrPlanOnClaimDoesNo002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}