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
import {  InstClaimHeader } from "../../api-models/index"
import {  InstClaimHeaderService } from "../../api-services/inst-claim-header.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the InstitutionalClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'institutionalclaims',
    templateUrl: './institutional-claims.component.html',

})
export class InstitutionalClaimsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    institutionalClaimsForm: FormGroup;
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

editInstClaimHeader: boolean;
    instClaimHeader: InstClaimHeader;
    instClaimHeaders: InstClaimHeader[];
    if (this.secWin.hasInsertPermission()) {
        createInstClaimHeader() {
            this.formValidation.validateForm();
            if(this.institutionalClaimsForm.valid) {
                let instClaimHeader = new InstClaimHeader();
                instClaimHeader.claimNumber = Form.getValue(this.institutionalClaimsForm, 'claimNumber');
                instClaimHeader.admissionDate = Form.getValue(this.institutionalClaimsForm, 'admDate');
                instClaimHeader.primarySvcDate = Form.getValue(this.institutionalClaimsForm, 'dischDate');
                instClaimHeader.authNumber = Form.getValue(this.institutionalClaimsForm, 'authNo');
                instClaimHeader.billType = Form.getValue(this.institutionalClaimsForm, 'billType');
                instClaimHeader.conditionCode1 = Form.getValue(this.institutionalClaimsForm, 'continuation');
                instClaimHeader.patientControlNo = Form.getValue(this.institutionalClaimsForm, 'patCtrl');
                instClaimHeader.medicalRecordNo = Form.getValue(this.institutionalClaimsForm, 'medRec');
                instClaimHeader.admitType = Form.getValue(this.institutionalClaimsForm, 'firstAdmitted');
                instClaimHeader.patientStatus = Form.getValue(this.institutionalClaimsForm, 'patStatus');
                instClaimHeader.seqMcondId = Form.getValue(this.institutionalClaimsForm, 'diamondId');
                instClaimHeader.memberAge = Form.getValue(this.institutionalClaimsForm, 'memberId');
                instClaimHeader.admProvSpec = Form.getValue(this.institutionalClaimsForm, 'admProv');
                instClaimHeader.attProvPcp = Form.getValue(this.institutionalClaimsForm, 'attProv');
                instClaimHeader.paySubscriber = Form.getValue(this.institutionalClaimsForm, 'payStub');
                instClaimHeader.medicalRelease = Form.getValue(this.institutionalClaimsForm, 'releaseRec');
                instClaimHeader.assignmentOfBenefits = Form.getValue(this.institutionalClaimsForm, 'assignBfts');
                instClaimHeader.payDependent = Form.getValue(this.institutionalClaimsForm, 'payDep');
                instClaimHeader.placeOfService1 = Form.getValue(this.institutionalClaimsForm, 'plcOfSvc');
                instClaimHeader.drgCode = Form.getValue(this.institutionalClaimsForm, 'drg');
                instClaimHeader.serviceReason1 = Form.getValue(this.institutionalClaimsForm, 'servRsn');
                instClaimHeader.dischargeHour = Form.getValue(this.institutionalClaimsForm, 'imageNo');
                instClaimHeader.totalBilledAmt = Form.getValue(this.institutionalClaimsForm, 'totalBilled');
                instClaimHeader.seqMembId = Form.getValue(this.institutionalClaimsForm, 'eobInd');
                instClaimHeader.pcpSpec = Form.getValue(this.institutionalClaimsForm, 'sec');
                instClaimHeader.dateReceived = Form.getValue(this.institutionalClaimsForm, 'dateRecv');
                instClaimHeader.batchNumber = Form.getValue(this.institutionalClaimsForm, 'batchNumber');
                instClaimHeader.paperEob = Form.getValue(this.institutionalClaimsForm, 'paperEobReq');
                instClaimHeader.privacyApplies = Form.getValue(this.institutionalClaimsForm, 'privacyApplies');
                instClaimHeader.invalidDataInd = Form.getValue(this.institutionalClaimsForm, 'invalidData');
                instClaimHeader.provSignOnFile = Form.getValue(this.institutionalClaimsForm, 'provSignOnFile');
                this.instClaimHeaderService.createInstClaimHeader(instClaimHeader).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editInstClaimHeader = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateInstClaimHeader(seqClaimId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.institutionalClaimsForm.valid) {
            let instClaimHeader = new InstClaimHeader();
            instClaimHeader.claimNumber = Form.getValue(this.institutionalClaimsForm, 'claimNumber');
            instClaimHeader.admissionDate = Form.getValue(this.institutionalClaimsForm, 'admDate');
            instClaimHeader.primarySvcDate = Form.getValue(this.institutionalClaimsForm, 'dischDate');
            instClaimHeader.authNumber = Form.getValue(this.institutionalClaimsForm, 'authNo');
            instClaimHeader.billType = Form.getValue(this.institutionalClaimsForm, 'billType');
            instClaimHeader.conditionCode1 = Form.getValue(this.institutionalClaimsForm, 'continuation');
            instClaimHeader.patientControlNo = Form.getValue(this.institutionalClaimsForm, 'patCtrl');
            instClaimHeader.medicalRecordNo = Form.getValue(this.institutionalClaimsForm, 'medRec');
            instClaimHeader.admitType = Form.getValue(this.institutionalClaimsForm, 'firstAdmitted');
            instClaimHeader.patientStatus = Form.getValue(this.institutionalClaimsForm, 'patStatus');
            instClaimHeader.seqMcondId = Form.getValue(this.institutionalClaimsForm, 'diamondId');
            instClaimHeader.memberAge = Form.getValue(this.institutionalClaimsForm, 'memberId');
            instClaimHeader.admProvSpec = Form.getValue(this.institutionalClaimsForm, 'admProv');
            instClaimHeader.attProvPcp = Form.getValue(this.institutionalClaimsForm, 'attProv');
            instClaimHeader.paySubscriber = Form.getValue(this.institutionalClaimsForm, 'payStub');
            instClaimHeader.medicalRelease = Form.getValue(this.institutionalClaimsForm, 'releaseRec');
            instClaimHeader.assignmentOfBenefits = Form.getValue(this.institutionalClaimsForm, 'assignBfts');
            instClaimHeader.payDependent = Form.getValue(this.institutionalClaimsForm, 'payDep');
            instClaimHeader.placeOfService1 = Form.getValue(this.institutionalClaimsForm, 'plcOfSvc');
            instClaimHeader.drgCode = Form.getValue(this.institutionalClaimsForm, 'drg');
            instClaimHeader.serviceReason1 = Form.getValue(this.institutionalClaimsForm, 'servRsn');
            instClaimHeader.dischargeHour = Form.getValue(this.institutionalClaimsForm, 'imageNo');
            instClaimHeader.totalBilledAmt = Form.getValue(this.institutionalClaimsForm, 'totalBilled');
            instClaimHeader.seqMembId = Form.getValue(this.institutionalClaimsForm, 'eobInd');
            instClaimHeader.pcpSpec = Form.getValue(this.institutionalClaimsForm, 'sec');
            instClaimHeader.dateReceived = Form.getValue(this.institutionalClaimsForm, 'dateRecv');
            instClaimHeader.batchNumber = Form.getValue(this.institutionalClaimsForm, 'batchNumber');
            instClaimHeader.paperEob = Form.getValue(this.institutionalClaimsForm, 'paperEobReq');
            instClaimHeader.privacyApplies = Form.getValue(this.institutionalClaimsForm, 'privacyApplies');
            instClaimHeader.invalidDataInd = Form.getValue(this.institutionalClaimsForm, 'invalidData');
            instClaimHeader.provSignOnFile = Form.getValue(this.institutionalClaimsForm, 'provSignOnFile');
            this.instClaimHeaderService.updateInstClaimHeader(instClaimHeader, seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editInstClaimHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveInstClaimHeader() {
        if(this.editInstClaimHeader) {
            this.updateInstClaimHeader(this.instClaimHeader.seqClaimId)
        } else {
            this.createInstClaimHeader();
        }
    }    deleteInstClaimHeader(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.instClaimHeaderService.deleteInstClaimHeader(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getInstClaimHeader(seqClaimId : number) {
        this.instClaimHeaderService.getInstClaimHeader(seqClaimId).subscribe(instClaimHeader => {
            this.instClaimHeader = instClaimHeader;
            this.institutionalClaimsForm.patchValue({
                'claimNumber': this.instClaimHeader.claimNumber,
                'admDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.admissionDate),
                'dischDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.primarySvcDate),
                'authNo': this.instClaimHeader.authNumber,
                'billType': this.instClaimHeader.billType,
                'continuation': this.instClaimHeader.conditionCode1,
                'patCtrl': this.instClaimHeader.patientControlNo,
                'medRec': this.instClaimHeader.medicalRecordNo,
                'firstAdmitted': this.instClaimHeader.admitType,
                'patStatus': this.instClaimHeader.patientStatus,
                'diamondId': this.instClaimHeader.seqMcondId,
                'memberId': this.instClaimHeader.memberAge,
                'admProv': this.instClaimHeader.admProvSpec,
                'attProv': this.instClaimHeader.attProvPcp,
                'payStub': this.instClaimHeader.paySubscriber,
                'releaseRec': this.instClaimHeader.medicalRelease,
                'assignBfts': this.instClaimHeader.assignmentOfBenefits,
                'payDep': this.instClaimHeader.payDependent,
                'plcOfSvc': this.instClaimHeader.placeOfService1,
                'drg': this.instClaimHeader.drgCode,
                'servRsn': this.instClaimHeader.serviceReason1,
                'imageNo': this.instClaimHeader.dischargeHour,
                'totalBilled': this.instClaimHeader.totalBilledAmt,
                'eobInd': this.instClaimHeader.seqMembId,
                'sec': this.instClaimHeader.pcpSpec,
                'dateRecv': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.dateReceived),
                'batchNumber': this.instClaimHeader.batchNumber,
                'paperEobReq': this.instClaimHeader.paperEob,
                'privacyApplies': this.instClaimHeader.privacyApplies,
                'invalidData': this.instClaimHeader.invalidDataInd,
                'provSignOnFile': this.instClaimHeader.provSignOnFile,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getInstClaimHeaders() {
        this.instClaimHeaderService.getInstClaimHeaders().subscribe(instClaimHeaders => {
        this.instClaimHeaders = instClaimHeaders;
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
     private instClaimHeaderService: InstClaimHeaderService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.institutionalClaimsForm);
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
        this.formValidation = new FormValidation(this.institutionalClaimsForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.institutionalClaimsForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            admDate: ['', {updateOn: 'blur', validators: [] }],
            dischDate: ['', {updateOn: 'blur', validators: [] }],
            authNo: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            billType: ['', {updateOn: 'blur', validators: [] }],
            continuation: ['', {updateOn: 'blur', validators: [] }],
            patCtrl: ['', {updateOn: 'blur', validators: [] }],
            medRec: ['', {updateOn: 'blur', validators: [] }],
            firstAdmitted: ['', {updateOn: 'blur', validators: [] }],
            patStatus: ['', {updateOn: 'blur', validators: [] }],
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            guCat: ['', {updateOn: 'blur', validators: [] }],
            admProv: ['', {updateOn: 'blur', validators: [] }],
            attProv: ['', {updateOn: 'blur', validators: [] }],
            institution: ['', {updateOn: 'blur', validators: [] }],
            addr001: ['', {updateOn: 'blur', validators: [] }],
            zip: ['', {updateOn: 'blur', validators: [] }],
            payStub: ['', {updateOn: 'blur', validators: [] }],
            releaseRec: ['', {updateOn: 'blur', validators: [] }],
            par: ['', {updateOn: 'blur', validators: [] }],
            assignBfts: ['', {updateOn: 'blur', validators: [] }],
            payDep: ['', {updateOn: 'blur', validators: [] }],
            vendor: ['', {updateOn: 'blur', validators: [] }],
            addr002: ['', {updateOn: 'blur', validators: [] }],
            plcOfSvc: ['', {updateOn: 'blur', validators: [] }],
            dx1: ['', {updateOn: 'blur', validators: [] }],
            drg: ['', {updateOn: 'blur', validators: [] }],
            incrdCntry: ['', {updateOn: 'blur', validators: [] }],
            servRsn: ['', {updateOn: 'blur', validators: [] }],
            dx2: ['', {updateOn: 'blur', validators: [] }],
            imageNo: ['', {updateOn: 'blur', validators: [] }],
            totalBilled: ['', {updateOn: 'blur', validators: [] }],
            dx3: ['', {updateOn: 'blur', validators: [] }],
            eobInd: ['', {updateOn: 'blur', validators: [] }],
            sec: ['', {updateOn: 'blur', validators: [] }],
            dateRecv: ['', {updateOn: 'blur', validators: [] }],
            dx4: ['', {updateOn: 'blur', validators: [] }],
            batchNumber: ['', {updateOn: 'blur', validators: [] }],
            paperEobReq: ['', {updateOn: 'blur', validators: [] }],
            privacyApplies: ['', {updateOn: 'blur', validators: [] }],
            invalidData: ['', {updateOn: 'blur', validators: [] }],
            provSignOnFile: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}