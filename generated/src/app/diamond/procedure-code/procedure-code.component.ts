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
import {  ProcedureCodeMaster } from "../../api-models/index"
import {  ProcedureCodeMasterService } from "../../api-services/procedure-code-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProcedureCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'procedurecode',
    templateUrl: './procedure-code.component.html',

})
export class ProcedureCodeComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    procedureCodeForm: FormGroup;
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

editProcedureCodeMaster: boolean;
    procedureCodeMaster: ProcedureCodeMaster;
    procedureCodeMasters: ProcedureCodeMaster[];
    if (this.secWin.hasInsertPermission()) {
        createProcedureCodeMaster() {
            this.formValidation.validateForm();
            if(this.procedureCodeForm.valid) {
                let procedureCodeMaster = new ProcedureCodeMaster();
                procedureCodeMaster.procedureCode = Form.getValue(this.procedureCodeForm, 'procedureCode');
                procedureCodeMaster.shortDescription = Form.getValue(this.procedureCodeForm, 'shortDescription');
                procedureCodeMaster.fullDescription = Form.getValue(this.procedureCodeForm, 'fullDescription');
                procedureCodeMaster.effectiveDate = Form.getValue(this.procedureCodeForm, 'effectiveDate');
                procedureCodeMaster.termDate = Form.getValue(this.procedureCodeForm, 'termDate');
                procedureCodeMaster.productServiceIdQualifier = Form.getValue(this.procedureCodeForm, 'idQualifier');
                procedureCodeMaster.asteriskProcedure = Form.getValue(this.procedureCodeForm, 'asteriskProcedure');
                procedureCodeMaster.targetRevCodeFlg = Form.getValue(this.procedureCodeForm, 'targetRevenueCode');
                procedureCodeMaster.primaryGrouping = Form.getValue(this.procedureCodeForm, 'primaryGrouping');
                procedureCodeMaster.priceIndicatorFlg = Form.getValue(this.procedureCodeForm, 'priceIndicator');
                procedureCodeMaster.userDate1 = Form.getValue(this.procedureCodeForm, 'userDate1');
                procedureCodeMaster.secondaryGrouping = Form.getValue(this.procedureCodeForm, 'secondaryGrouping');
                procedureCodeMaster.toothNumberRequired = Form.getValue(this.procedureCodeForm, 'toothReq');
                procedureCodeMaster.userDefined2 = Form.getValue(this.procedureCodeForm, 'userDefined2');
                procedureCodeMaster.followUpDays = Form.getValue(this.procedureCodeForm, 'followUpDays');
                procedureCodeMaster.surfaceRequired = Form.getValue(this.procedureCodeForm, 'surfaceReq');
                procedureCodeMaster.userDate2 = Form.getValue(this.procedureCodeForm, 'userDate2');
                procedureCodeMaster.codeClass = Form.getValue(this.procedureCodeForm, 'codeClass');
                procedureCodeMaster.archRequired = Form.getValue(this.procedureCodeForm, 'archRequired');
                procedureCodeMaster.allowedReason = Form.getValue(this.procedureCodeForm, 'allowedReason');
                procedureCodeMaster.countAsDays = Form.getValue(this.procedureCodeForm, 'countAsDays');
                procedureCodeMaster.quadrantRequired = Form.getValue(this.procedureCodeForm, 'quadrantReq');
                procedureCodeMaster.fromAge = Form.getValue(this.procedureCodeForm, 'fromAge');
                procedureCodeMaster.holdReason = Form.getValue(this.procedureCodeForm, 'holdReason');
                procedureCodeMaster.oralCavityRequired = Form.getValue(this.procedureCodeForm, 'oralCavReq');
                procedureCodeMaster.toAge = Form.getValue(this.procedureCodeForm, 'toAge');
                procedureCodeMaster.holdDate = Form.getValue(this.procedureCodeForm, 'holdDate');
                procedureCodeMaster.weightedValue = Form.getValue(this.procedureCodeForm, 'weightedVal');
                procedureCodeMaster.patientGender = Form.getValue(this.procedureCodeForm, 'patientGender');
                procedureCodeMaster.instAuthDtlLnk = Form.getValue(this.procedureCodeForm, 'instAuthDetailLink');
                this.procedureCodeMasterService.createProcedureCodeMaster(procedureCodeMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProcedureCodeMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProcedureCodeMaster(procedureCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.procedureCodeForm.valid) {
            let procedureCodeMaster = new ProcedureCodeMaster();
            procedureCodeMaster.procedureCode = Form.getValue(this.procedureCodeForm, 'procedureCode');
            procedureCodeMaster.shortDescription = Form.getValue(this.procedureCodeForm, 'shortDescription');
            procedureCodeMaster.fullDescription = Form.getValue(this.procedureCodeForm, 'fullDescription');
            procedureCodeMaster.effectiveDate = Form.getValue(this.procedureCodeForm, 'effectiveDate');
            procedureCodeMaster.termDate = Form.getValue(this.procedureCodeForm, 'termDate');
            procedureCodeMaster.productServiceIdQualifier = Form.getValue(this.procedureCodeForm, 'idQualifier');
            procedureCodeMaster.asteriskProcedure = Form.getValue(this.procedureCodeForm, 'asteriskProcedure');
            procedureCodeMaster.targetRevCodeFlg = Form.getValue(this.procedureCodeForm, 'targetRevenueCode');
            procedureCodeMaster.primaryGrouping = Form.getValue(this.procedureCodeForm, 'primaryGrouping');
            procedureCodeMaster.priceIndicatorFlg = Form.getValue(this.procedureCodeForm, 'priceIndicator');
            procedureCodeMaster.userDate1 = Form.getValue(this.procedureCodeForm, 'userDate1');
            procedureCodeMaster.secondaryGrouping = Form.getValue(this.procedureCodeForm, 'secondaryGrouping');
            procedureCodeMaster.toothNumberRequired = Form.getValue(this.procedureCodeForm, 'toothReq');
            procedureCodeMaster.userDefined2 = Form.getValue(this.procedureCodeForm, 'userDefined2');
            procedureCodeMaster.followUpDays = Form.getValue(this.procedureCodeForm, 'followUpDays');
            procedureCodeMaster.surfaceRequired = Form.getValue(this.procedureCodeForm, 'surfaceReq');
            procedureCodeMaster.userDate2 = Form.getValue(this.procedureCodeForm, 'userDate2');
            procedureCodeMaster.codeClass = Form.getValue(this.procedureCodeForm, 'codeClass');
            procedureCodeMaster.archRequired = Form.getValue(this.procedureCodeForm, 'archRequired');
            procedureCodeMaster.allowedReason = Form.getValue(this.procedureCodeForm, 'allowedReason');
            procedureCodeMaster.countAsDays = Form.getValue(this.procedureCodeForm, 'countAsDays');
            procedureCodeMaster.quadrantRequired = Form.getValue(this.procedureCodeForm, 'quadrantReq');
            procedureCodeMaster.fromAge = Form.getValue(this.procedureCodeForm, 'fromAge');
            procedureCodeMaster.holdReason = Form.getValue(this.procedureCodeForm, 'holdReason');
            procedureCodeMaster.oralCavityRequired = Form.getValue(this.procedureCodeForm, 'oralCavReq');
            procedureCodeMaster.toAge = Form.getValue(this.procedureCodeForm, 'toAge');
            procedureCodeMaster.holdDate = Form.getValue(this.procedureCodeForm, 'holdDate');
            procedureCodeMaster.weightedValue = Form.getValue(this.procedureCodeForm, 'weightedVal');
            procedureCodeMaster.patientGender = Form.getValue(this.procedureCodeForm, 'patientGender');
            procedureCodeMaster.instAuthDtlLnk = Form.getValue(this.procedureCodeForm, 'instAuthDetailLink');
            this.procedureCodeMasterService.updateProcedureCodeMaster(procedureCodeMaster, procedureCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProcedureCodeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProcedureCodeMaster() {
        if(this.editProcedureCodeMaster) {
            this.updateProcedureCodeMaster(this.procedureCodeMaster.procedureCode)
        } else {
            this.createProcedureCodeMaster();
        }
    }    deleteProcedureCodeMaster(procedureCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.procedureCodeMasterService.deleteProcedureCodeMaster(procedureCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProcedureCodeMaster(procedureCode : string) {
        this.procedureCodeMasterService.getProcedureCodeMaster(procedureCode).subscribe(procedureCodeMaster => {
            this.procedureCodeMaster = procedureCodeMaster;
            this.procedureCodeForm.patchValue({
                'procedureCode': this.procedureCodeMaster.procedureCode,
                'shortDescription': this.procedureCodeMaster.shortDescription,
                'fullDescription': this.procedureCodeMaster.fullDescription,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.procedureCodeMaster.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.procedureCodeMaster.termDate),
                'idQualifier': this.procedureCodeMaster.productServiceIdQualifier,
                'asteriskProcedure': this.procedureCodeMaster.asteriskProcedure,
                'targetRevenueCode': this.procedureCodeMaster.targetRevCodeFlg,
                'primaryGrouping': this.procedureCodeMaster.primaryGrouping,
                'priceIndicator': this.procedureCodeMaster.priceIndicatorFlg,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.procedureCodeMaster.userDate1),
                'secondaryGrouping': this.procedureCodeMaster.secondaryGrouping,
                'toothReq': this.procedureCodeMaster.toothNumberRequired,
                'userDefined2': this.procedureCodeMaster.userDefined2,
                'followUpDays': this.procedureCodeMaster.followUpDays,
                'surfaceReq': this.procedureCodeMaster.surfaceRequired,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.procedureCodeMaster.userDate2),
                'codeClass': this.procedureCodeMaster.codeClass,
                'archRequired': this.procedureCodeMaster.archRequired,
                'allowedReason': this.procedureCodeMaster.allowedReason,
                'countAsDays': this.procedureCodeMaster.countAsDays,
                'quadrantReq': this.procedureCodeMaster.quadrantRequired,
                'fromAge': this.procedureCodeMaster.fromAge,
                'holdReason': this.procedureCodeMaster.holdReason,
                'oralCavReq': this.procedureCodeMaster.oralCavityRequired,
                'toAge': this.procedureCodeMaster.toAge,
                'holdDate': this.dateFormatPipe.defaultDisplayDateFormat(this.procedureCodeMaster.holdDate),
                'weightedVal': this.procedureCodeMaster.weightedValue,
                'patientGender': this.procedureCodeMaster.patientGender,
                'instAuthDetailLink': this.procedureCodeMaster.instAuthDtlLnk,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProcedureCodeMasters() {
        this.procedureCodeMasterService.getProcedureCodeMasters().subscribe(procedureCodeMasters => {
        this.procedureCodeMasters = procedureCodeMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
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
     private procedureCodeMasterService: ProcedureCodeMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.procedureCodeForm);
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
        this.formValidation = new FormValidation(this.procedureCodeForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.procedureCodeForm = this.formBuilder.group({
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            shortDescription: ['', {updateOn: 'blur', validators: [] }],
            fullDescription: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            idQualifier: ['', {updateOn: 'blur', validators: [] }],
            asteriskProcedure: ['', {updateOn: 'blur', validators: [] }],
            targetRevenueCode: ['', {updateOn: 'blur', validators: [] }],
            medMgmtRev: ['', {updateOn: 'blur', validators: [] }],
            primaryGrouping: ['', {updateOn: 'blur', validators: [] }],
            priceIndicator: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            secondaryGrouping: ['', {updateOn: 'blur', validators: [] }],
            toothReq: ['', {updateOn: 'blur', validators: [] }],
            userDefined2: ['', {updateOn: 'blur', validators: [] }],
            followUpDays: ['', {updateOn: 'blur', validators: [] }],
            surfaceReq: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }],
            codeClass: ['', {updateOn: 'blur', validators: [] }],
            archRequired: ['', {updateOn: 'blur', validators: [] }],
            allowedReason: ['', {updateOn: 'blur', validators: [] }],
            countAsDays: ['', {updateOn: 'blur', validators: [] }],
            quadrantReq: ['', {updateOn: 'blur', validators: [] }],
            fromAge: ['', {updateOn: 'blur', validators: [] }],
            holdReason: ['', {updateOn: 'blur', validators: [] }],
            oralCavReq: ['', {updateOn: 'blur', validators: [] }],
            toAge: ['', {updateOn: 'blur', validators: [] }],
            holdDate: ['', {updateOn: 'blur', validators: [] }],
            weightedVal: ['', {updateOn: 'blur', validators: [] }],
            patientGender: ['', {updateOn: 'blur', validators: [] }],
            instAuthDetailLink: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}