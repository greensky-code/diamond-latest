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
import {  DiagnosisCodeMaster } from "../../api-models/index"
import {  DiagnosisCodeMasterService } from "../../api-services/diagnosis-code-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the DiagnosisCodeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'diagnosiscode',
    templateUrl: './diagnosis-code.component.html',

})
export class DiagnosisCodeComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    diagnosisCodeForm: FormGroup;
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

editDiagnosisCodeMaster: boolean;
    diagnosisCodeMaster: DiagnosisCodeMaster;
    diagnosisCodeMasters: DiagnosisCodeMaster[];
    if (this.secWin.hasInsertPermission()) {
        createDiagnosisCodeMaster() {
            this.formValidation.validateForm();
            if(this.diagnosisCodeForm.valid) {
                let diagnosisCodeMaster = new DiagnosisCodeMaster();
                diagnosisCodeMaster.diagnosisCode = Form.getValue(this.diagnosisCodeForm, 'diagnosisCode');
                diagnosisCodeMaster.shortDescription = Form.getValue(this.diagnosisCodeForm, 'shortDesctription');
                diagnosisCodeMaster.description = Form.getValue(this.diagnosisCodeForm, 'fullDescription');
                diagnosisCodeMaster.effectiveDate = Form.getValue(this.diagnosisCodeForm, 'effectiveDate');
                diagnosisCodeMaster.termDate = Form.getValue(this.diagnosisCodeForm, 'termDate');
                diagnosisCodeMaster.productServiceIdQualifier = Form.getValue(this.diagnosisCodeForm, 'idQualifier');
                diagnosisCodeMaster.dxClass1 = Form.getValue(this.diagnosisCodeForm, 'diagnosisClass1');
                diagnosisCodeMaster.dxClass2 = Form.getValue(this.diagnosisCodeForm, 'class2');
                diagnosisCodeMaster.dxClass3 = Form.getValue(this.diagnosisCodeForm, 'class3');
                diagnosisCodeMaster.fromAge = Form.getValue(this.diagnosisCodeForm, 'fromAge');
                diagnosisCodeMaster.toAge = Form.getValue(this.diagnosisCodeForm, 'toAge');
                diagnosisCodeMaster.patientGender = Form.getValue(this.diagnosisCodeForm, 'gender');
                diagnosisCodeMaster.traumaFlag = Form.getValue(this.diagnosisCodeForm, 'traumaFlag');
                diagnosisCodeMaster.operProcedureFlag = Form.getValue(this.diagnosisCodeForm, 'caseMgmtTborProcedure');
                diagnosisCodeMaster.procedureClass = Form.getValue(this.diagnosisCodeForm, 'procedureClass');
                diagnosisCodeMaster.mdcCode = Form.getValue(this.diagnosisCodeForm, 'mdcCode');
                diagnosisCodeMaster.editFlag = Form.getValue(this.diagnosisCodeForm, 'editFlag');
                diagnosisCodeMaster.drgDefaultBirthweight = Form.getValue(this.diagnosisCodeForm, 'defaultBirthWgt');
                this.diagnosisCodeMasterService.createDiagnosisCodeMaster(diagnosisCodeMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDiagnosisCodeMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateDiagnosisCodeMaster(diagnosisCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.diagnosisCodeForm.valid) {
            let diagnosisCodeMaster = new DiagnosisCodeMaster();
            diagnosisCodeMaster.diagnosisCode = Form.getValue(this.diagnosisCodeForm, 'diagnosisCode');
            diagnosisCodeMaster.shortDescription = Form.getValue(this.diagnosisCodeForm, 'shortDesctription');
            diagnosisCodeMaster.description = Form.getValue(this.diagnosisCodeForm, 'fullDescription');
            diagnosisCodeMaster.effectiveDate = Form.getValue(this.diagnosisCodeForm, 'effectiveDate');
            diagnosisCodeMaster.termDate = Form.getValue(this.diagnosisCodeForm, 'termDate');
            diagnosisCodeMaster.productServiceIdQualifier = Form.getValue(this.diagnosisCodeForm, 'idQualifier');
            diagnosisCodeMaster.dxClass1 = Form.getValue(this.diagnosisCodeForm, 'diagnosisClass1');
            diagnosisCodeMaster.dxClass2 = Form.getValue(this.diagnosisCodeForm, 'class2');
            diagnosisCodeMaster.dxClass3 = Form.getValue(this.diagnosisCodeForm, 'class3');
            diagnosisCodeMaster.fromAge = Form.getValue(this.diagnosisCodeForm, 'fromAge');
            diagnosisCodeMaster.toAge = Form.getValue(this.diagnosisCodeForm, 'toAge');
            diagnosisCodeMaster.patientGender = Form.getValue(this.diagnosisCodeForm, 'gender');
            diagnosisCodeMaster.traumaFlag = Form.getValue(this.diagnosisCodeForm, 'traumaFlag');
            diagnosisCodeMaster.operProcedureFlag = Form.getValue(this.diagnosisCodeForm, 'caseMgmtTborProcedure');
            diagnosisCodeMaster.procedureClass = Form.getValue(this.diagnosisCodeForm, 'procedureClass');
            diagnosisCodeMaster.mdcCode = Form.getValue(this.diagnosisCodeForm, 'mdcCode');
            diagnosisCodeMaster.editFlag = Form.getValue(this.diagnosisCodeForm, 'editFlag');
            diagnosisCodeMaster.drgDefaultBirthweight = Form.getValue(this.diagnosisCodeForm, 'defaultBirthWgt');
            this.diagnosisCodeMasterService.updateDiagnosisCodeMaster(diagnosisCodeMaster, diagnosisCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDiagnosisCodeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveDiagnosisCodeMaster() {
        if(this.editDiagnosisCodeMaster) {
            this.updateDiagnosisCodeMaster(this.diagnosisCodeMaster.diagnosisCode)
        } else {
            this.createDiagnosisCodeMaster();
        }
    }    deleteDiagnosisCodeMaster(diagnosisCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.diagnosisCodeMasterService.deleteDiagnosisCodeMaster(diagnosisCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getDiagnosisCodeMaster(diagnosisCode : string) {
        this.diagnosisCodeMasterService.getDiagnosisCodeMaster(diagnosisCode).subscribe(diagnosisCodeMaster => {
            this.diagnosisCodeMaster = diagnosisCodeMaster;
            this.diagnosisCodeForm.patchValue({
                'diagnosisCode': this.diagnosisCodeMaster.diagnosisCode,
                'shortDesctription': this.diagnosisCodeMaster.shortDescription,
                'fullDescription': this.diagnosisCodeMaster.description,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.diagnosisCodeMaster.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.diagnosisCodeMaster.termDate),
                'idQualifier': this.diagnosisCodeMaster.productServiceIdQualifier,
                'diagnosisClass1': this.diagnosisCodeMaster.dxClass1,
                'class2': this.diagnosisCodeMaster.dxClass2,
                'class3': this.diagnosisCodeMaster.dxClass3,
                'fromAge': this.diagnosisCodeMaster.fromAge,
                'toAge': this.diagnosisCodeMaster.toAge,
                'gender': this.diagnosisCodeMaster.patientGender,
                'traumaFlag': this.diagnosisCodeMaster.traumaFlag,
                'caseMgmtTborProcedure': this.diagnosisCodeMaster.operProcedureFlag,
                'procedureClass': this.diagnosisCodeMaster.procedureClass,
                'mdcCode': this.diagnosisCodeMaster.mdcCode,
                'editFlag': this.diagnosisCodeMaster.editFlag,
                'defaultBirthWgt': this.diagnosisCodeMaster.drgDefaultBirthweight,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDiagnosisCodeMasters() {
        this.diagnosisCodeMasterService.getDiagnosisCodeMasters().subscribe(diagnosisCodeMasters => {
        this.diagnosisCodeMasters = diagnosisCodeMasters;
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
     private diagnosisCodeMasterService: DiagnosisCodeMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.diagnosisCodeForm);
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
        this.formValidation = new FormValidation(this.diagnosisCodeForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.diagnosisCodeForm = this.formBuilder.group({
            diagnosisCode: ['', {updateOn: 'blur', validators: [] }],
            shortDesctription: ['', {updateOn: 'blur', validators: [] }],
            fullDescription: ['', {updateOn: 'blur', validators: [] }],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            idQualifier: ['', {updateOn: 'blur', validators: [] }],
            diagnosisClass1: ['', {updateOn: 'blur', validators: [] }],
            class2: ['', {updateOn: 'blur', validators: [] }],
            class3: ['', {updateOn: 'blur', validators: [] }],
            fromAge: ['', {updateOn: 'blur', validators: [] }],
            toAge: ['', {updateOn: 'blur', validators: [] }],
            gender: ['', {updateOn: 'blur', validators: [] }],
            traumaFlag: ['', {updateOn: 'blur', validators: [] }],
            caseMgmtTborProcedure: ['', {updateOn: 'blur', validators: [] }],
            procedureClass: ['', {updateOn: 'blur', validators: [] }],
            mdcCode: ['', {updateOn: 'blur', validators: [] }],
            editFlag: ['', {updateOn: 'blur', validators: [] }],
            defaultBirthWgt: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}