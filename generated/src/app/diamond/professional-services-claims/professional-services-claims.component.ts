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
import {  DentalClaimHeader } from "../../api-models/index"
import {  DentalClaimHeaderService } from "../../api-services/dental-claim-header.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProfessionalServicesClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'professionalservicesclaims',
    templateUrl: './professional-services-claims.component.html',

})
export class ProfessionalServicesClaimsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    professionalServicesClaimsForm: FormGroup;
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

editDentalClaimHeader: boolean;
    dentalClaimHeader: DentalClaimHeader;
    dentalClaimHeaders: DentalClaimHeader[];
    if (this.secWin.hasInsertPermission()) {
        createDentalClaimHeader() {
            this.formValidation.validateForm();
            if(this.professionalServicesClaimsForm.valid) {
                let dentalClaimHeader = new DentalClaimHeader();
                dentalClaimHeader.claimNumber = Form.getValue(this.professionalServicesClaimsForm, 'claimNumber');
                dentalClaimHeader.primarySvcDate = Form.getValue(this.professionalServicesClaimsForm, 'svcDate');
                dentalClaimHeader.claimThruDate = Form.getValue(this.professionalServicesClaimsForm, 'thruDate');
                dentalClaimHeader.authNumber = Form.getValue(this.professionalServicesClaimsForm, 'authNo');
                dentalClaimHeader.seqMcondId = Form.getValue(this.professionalServicesClaimsForm, 'diamondId');
                dentalClaimHeader.memberAge = Form.getValue(this.professionalServicesClaimsForm, 'memberId');
                dentalClaimHeader.refProvPcp = Form.getValue(this.professionalServicesClaimsForm, 'refProv');
                dentalClaimHeader.paySubscriber = Form.getValue(this.professionalServicesClaimsForm, 'payStub');
                dentalClaimHeader.payDependent = Form.getValue(this.professionalServicesClaimsForm, 'payDep');
                dentalClaimHeader.providerIpa = Form.getValue(this.professionalServicesClaimsForm, 'provider');
                dentalClaimHeader.batchNumber = Form.getValue(this.professionalServicesClaimsForm, 'acctNumber');
                dentalClaimHeader.placeOfService = Form.getValue(this.professionalServicesClaimsForm, 'plcOfSvc');
                dentalClaimHeader.serviceReason = Form.getValue(this.professionalServicesClaimsForm, 'svcRsn');
                dentalClaimHeader.diagnosis1 = Form.getValue(this.professionalServicesClaimsForm, 'imageNo');
                dentalClaimHeader.totalBilledAmt = Form.getValue(this.professionalServicesClaimsForm, 'totalBilled');
                dentalClaimHeader.facilityLabIdNo = Form.getValue(this.professionalServicesClaimsForm, 'facilityId');
                dentalClaimHeader.dateReceived = Form.getValue(this.professionalServicesClaimsForm, 'dateRecv');
                dentalClaimHeader.securityCode = Form.getValue(this.professionalServicesClaimsForm, 'securityCode');
                dentalClaimHeader.labNumber = Form.getValue(this.professionalServicesClaimsForm, 'batchNumber');
                dentalClaimHeader.invalidDataInd = Form.getValue(this.professionalServicesClaimsForm, 'invalidData');
                dentalClaimHeader.privacyApplies = Form.getValue(this.professionalServicesClaimsForm, 'privacyApplies');
                dentalClaimHeader.medicaidResubmitCode = Form.getValue(this.professionalServicesClaimsForm, 'clmSubmRsnCode');
                this.dentalClaimHeaderService.createDentalClaimHeader(dentalClaimHeader).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDentalClaimHeader = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateDentalClaimHeader(seqClaimId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.professionalServicesClaimsForm.valid) {
            let dentalClaimHeader = new DentalClaimHeader();
            dentalClaimHeader.claimNumber = Form.getValue(this.professionalServicesClaimsForm, 'claimNumber');
            dentalClaimHeader.primarySvcDate = Form.getValue(this.professionalServicesClaimsForm, 'svcDate');
            dentalClaimHeader.claimThruDate = Form.getValue(this.professionalServicesClaimsForm, 'thruDate');
            dentalClaimHeader.authNumber = Form.getValue(this.professionalServicesClaimsForm, 'authNo');
            dentalClaimHeader.seqMcondId = Form.getValue(this.professionalServicesClaimsForm, 'diamondId');
            dentalClaimHeader.memberAge = Form.getValue(this.professionalServicesClaimsForm, 'memberId');
            dentalClaimHeader.refProvPcp = Form.getValue(this.professionalServicesClaimsForm, 'refProv');
            dentalClaimHeader.paySubscriber = Form.getValue(this.professionalServicesClaimsForm, 'payStub');
            dentalClaimHeader.payDependent = Form.getValue(this.professionalServicesClaimsForm, 'payDep');
            dentalClaimHeader.providerIpa = Form.getValue(this.professionalServicesClaimsForm, 'provider');
            dentalClaimHeader.batchNumber = Form.getValue(this.professionalServicesClaimsForm, 'acctNumber');
            dentalClaimHeader.placeOfService = Form.getValue(this.professionalServicesClaimsForm, 'plcOfSvc');
            dentalClaimHeader.serviceReason = Form.getValue(this.professionalServicesClaimsForm, 'svcRsn');
            dentalClaimHeader.diagnosis1 = Form.getValue(this.professionalServicesClaimsForm, 'imageNo');
            dentalClaimHeader.totalBilledAmt = Form.getValue(this.professionalServicesClaimsForm, 'totalBilled');
            dentalClaimHeader.facilityLabIdNo = Form.getValue(this.professionalServicesClaimsForm, 'facilityId');
            dentalClaimHeader.dateReceived = Form.getValue(this.professionalServicesClaimsForm, 'dateRecv');
            dentalClaimHeader.securityCode = Form.getValue(this.professionalServicesClaimsForm, 'securityCode');
            dentalClaimHeader.labNumber = Form.getValue(this.professionalServicesClaimsForm, 'batchNumber');
            dentalClaimHeader.invalidDataInd = Form.getValue(this.professionalServicesClaimsForm, 'invalidData');
            dentalClaimHeader.privacyApplies = Form.getValue(this.professionalServicesClaimsForm, 'privacyApplies');
            dentalClaimHeader.medicaidResubmitCode = Form.getValue(this.professionalServicesClaimsForm, 'clmSubmRsnCode');
            this.dentalClaimHeaderService.updateDentalClaimHeader(dentalClaimHeader, seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editDentalClaimHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveDentalClaimHeader() {
        if(this.editDentalClaimHeader) {
            this.updateDentalClaimHeader(this.dentalClaimHeader.seqClaimId)
        } else {
            this.createDentalClaimHeader();
        }
    }    deleteDentalClaimHeader(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.dentalClaimHeaderService.deleteDentalClaimHeader(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getDentalClaimHeader(seqClaimId : number) {
        this.dentalClaimHeaderService.getDentalClaimHeader(seqClaimId).subscribe(dentalClaimHeader => {
            this.dentalClaimHeader = dentalClaimHeader;
            this.professionalServicesClaimsForm.patchValue({
                'claimNumber': this.dentalClaimHeader.claimNumber,
                'svcDate': this.dateFormatPipe.defaultDisplayDateFormat(this.dentalClaimHeader.primarySvcDate),
                'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.dentalClaimHeader.claimThruDate),
                'authNo': this.dentalClaimHeader.authNumber,
                'diamondId': this.dentalClaimHeader.seqMcondId,
                'memberId': this.dentalClaimHeader.memberAge,
                'refProv': this.dentalClaimHeader.refProvPcp,
                'payStub': this.dentalClaimHeader.paySubscriber,
                'payDep': this.dentalClaimHeader.payDependent,
                'provider': this.dentalClaimHeader.providerIpa,
                'acctNumber': this.dentalClaimHeader.batchNumber,
                'plcOfSvc': this.dentalClaimHeader.placeOfService,
                'svcRsn': this.dentalClaimHeader.serviceReason,
                'imageNo': this.dentalClaimHeader.diagnosis1,
                'totalBilled': this.dentalClaimHeader.totalBilledAmt,
                'facilityId': this.dentalClaimHeader.facilityLabIdNo,
                'dateRecv': this.dateFormatPipe.defaultDisplayDateFormat(this.dentalClaimHeader.dateReceived),
                'securityCode': this.dentalClaimHeader.securityCode,
                'batchNumber': this.dentalClaimHeader.labNumber,
                'invalidData': this.dentalClaimHeader.invalidDataInd,
                'privacyApplies': this.dentalClaimHeader.privacyApplies,
                'clmSubmRsnCode': this.dentalClaimHeader.medicaidResubmitCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getDentalClaimHeaders() {
        this.dentalClaimHeaderService.getDentalClaimHeaders().subscribe(dentalClaimHeaders => {
        this.dentalClaimHeaders = dentalClaimHeaders;
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
     private dentalClaimHeaderService: DentalClaimHeaderService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.professionalServicesClaimsForm);
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
        this.formValidation = new FormValidation(this.professionalServicesClaimsForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.professionalServicesClaimsForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            svcDate: ['', {updateOn: 'blur', validators: [] }],
            thruDate: ['', {updateOn: 'blur', validators: [] }],
            authNo: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            guCat: ['', {updateOn: 'blur', validators: [] }],
            refProv: ['', {updateOn: 'blur', validators: [] }],
            payStub: ['', {updateOn: 'blur', validators: [] }],
            payDep: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            acctNumber: ['', {updateOn: 'blur', validators: [] }],
            addr001: ['', {updateOn: 'blur', validators: [] }],
            zip: ['', {updateOn: 'blur', validators: [] }],
            par: ['', {updateOn: 'blur', validators: [] }],
            vendor: ['', {updateOn: 'blur', validators: [] }],
            addr002: ['', {updateOn: 'blur', validators: [] }],
            plcOfSvc: ['', {updateOn: 'blur', validators: [] }],
            dx1: ['', {updateOn: 'blur', validators: [] }],
            incrdCntry: ['', {updateOn: 'blur', validators: [] }],
            svcRsn: ['', {updateOn: 'blur', validators: [] }],
            dx2: ['', {updateOn: 'blur', validators: [] }],
            imageNo: ['', {updateOn: 'blur', validators: [] }],
            totalBilled: ['', {updateOn: 'blur', validators: [] }],
            dx3: ['', {updateOn: 'blur', validators: [] }],
            facilityId: ['', {updateOn: 'blur', validators: [] }],
            dateRecv: ['', {updateOn: 'blur', validators: [] }],
            dx4: ['', {updateOn: 'blur', validators: [] }],
            securityCode: ['', {updateOn: 'blur', validators: [] }],
            eobReq: ['', {updateOn: 'blur', validators: [] }],
            batchNumber: ['', {updateOn: 'blur', validators: [] }],
            invalidData: ['', {updateOn: 'blur', validators: [] }],
            privacyApplies: ['', {updateOn: 'blur', validators: [] }],
            clmSubmRsnCode: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}