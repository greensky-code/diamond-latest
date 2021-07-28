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
import {  ProfsvcClaimHeader } from "../../api-models/index"
import {  ProfsvcClaimHeaderService } from "../../api-services/profsvc-claim-header.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the AccountsPayableVendorDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'accountspayablevendordisplay',
    templateUrl: './accounts-payable-vendor-display.component.html',

})
export class AccountsPayableVendorDisplayComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    accountsPayableVendorDisplayForm: FormGroup;
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

editProfsvcClaimHeader: boolean;
    profsvcClaimHeader: ProfsvcClaimHeader;
    profsvcClaimHeaders: ProfsvcClaimHeader[];
    if (this.secWin.hasInsertPermission()) {
        createProfsvcClaimHeader() {
            this.formValidation.validateForm();
            if(this.accountsPayableVendorDisplayForm.valid) {
                let profsvcClaimHeader = new ProfsvcClaimHeader();
                profsvcClaimHeader.seqVendId = Form.getValue(this.accountsPayableVendorDisplayForm, 'vendorId');
                profsvcClaimHeader.claimNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'claimNumber');
                profsvcClaimHeader.dateReceived = Form.getValue(this.accountsPayableVendorDisplayForm, 'received');
                profsvcClaimHeader.seqMcondId = Form.getValue(this.accountsPayableVendorDisplayForm, 'daimondId');
                profsvcClaimHeader.memberAge = Form.getValue(this.accountsPayableVendorDisplayForm, 'member');
                profsvcClaimHeader.labNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'lastName');
                profsvcClaimHeader.providerIpa = Form.getValue(this.accountsPayableVendorDisplayForm, 'providerId');
                profsvcClaimHeader.providerPanel = Form.getValue(this.accountsPayableVendorDisplayForm, 'provName');
                profsvcClaimHeader.pcpType = Form.getValue(this.accountsPayableVendorDisplayForm, 'type');
                profsvcClaimHeader.securityCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'specialty');
                profsvcClaimHeader.pcpIpaId = Form.getValue(this.accountsPayableVendorDisplayForm, 'pcpId');
                profsvcClaimHeader.primarySvcDate = Form.getValue(this.accountsPayableVendorDisplayForm, 'primaryDate');
                profsvcClaimHeader.serviceReason1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'serviceReason');
                profsvcClaimHeader.pcpSpec = Form.getValue(this.accountsPayableVendorDisplayForm, 'pcpName');
                profsvcClaimHeader.placeOfService1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'plcOfSvc');
                profsvcClaimHeader.diagnosis1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'diagnosisCode1');
                profsvcClaimHeader.autoAccidentIn = Form.getValue(this.accountsPayableVendorDisplayForm, 'authorization');
                profsvcClaimHeader.planCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'planCode');
                profsvcClaimHeader.diagnosis2 = Form.getValue(this.accountsPayableVendorDisplayForm, 'diagonsisCode2');
                profsvcClaimHeader.insertDatetime = Form.getValue(this.accountsPayableVendorDisplayForm, 'lineItem');
                profsvcClaimHeader.ocCarrierCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'procedureCode');
                profsvcClaimHeader.providerIpaId = Form.getValue(this.accountsPayableVendorDisplayForm, 'ocPaid');
                profsvcClaimHeader.claimSubmReasonCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'ocPaidReason');
                profsvcClaimHeader.placeOfService2 = Form.getValue(this.accountsPayableVendorDisplayForm, 'dateOfService');
                profsvcClaimHeader.totalBilledAmt = Form.getValue(this.accountsPayableVendorDisplayForm, 'allowedAmt');
                profsvcClaimHeader.cobAlwdAmtRsn = Form.getValue(this.accountsPayableVendorDisplayForm, 'allowedReason');
                profsvcClaimHeader.patientPaidAmount = Form.getValue(this.accountsPayableVendorDisplayForm, 'billedAmount');
                profsvcClaimHeader.patControlNo = Form.getValue(this.accountsPayableVendorDisplayForm, 'totalNotCov');
                profsvcClaimHeader.inServiceArea = Form.getValue(this.accountsPayableVendorDisplayForm, 'notCoveredReason');
                profsvcClaimHeader.eligStatus = Form.getValue(this.accountsPayableVendorDisplayForm, 'claimStatus');
                profsvcClaimHeader.providerParStat = Form.getValue(this.accountsPayableVendorDisplayForm, 'processStatus');
                profsvcClaimHeader.otherInsuranceInd = Form.getValue(this.accountsPayableVendorDisplayForm, 'coinsuranceReason');
                profsvcClaimHeader.originalReferenceNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'glReference');
                profsvcClaimHeader.authClass = Form.getValue(this.accountsPayableVendorDisplayForm, 'adjustReason');
                profsvcClaimHeader.medicaidResubmitCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'medDefCode');
                profsvcClaimHeader.onsetTime = Form.getValue(this.accountsPayableVendorDisplayForm, 'postDate');
                profsvcClaimHeader.autoAccidentState = Form.getValue(this.accountsPayableVendorDisplayForm, 'paidNetAmt');
                profsvcClaimHeader.authWaiveMethod = Form.getValue(this.accountsPayableVendorDisplayForm, 'adjustMethod');
                profsvcClaimHeader.admissionDate1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'adminFee');
                this.profsvcClaimHeaderService.createProfsvcClaimHeader(profsvcClaimHeader).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProfsvcClaimHeader = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProfsvcClaimHeader(seqClaimId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.accountsPayableVendorDisplayForm.valid) {
            let profsvcClaimHeader = new ProfsvcClaimHeader();
            profsvcClaimHeader.seqVendId = Form.getValue(this.accountsPayableVendorDisplayForm, 'vendorId');
            profsvcClaimHeader.claimNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'claimNumber');
            profsvcClaimHeader.dateReceived = Form.getValue(this.accountsPayableVendorDisplayForm, 'received');
            profsvcClaimHeader.seqMcondId = Form.getValue(this.accountsPayableVendorDisplayForm, 'daimondId');
            profsvcClaimHeader.memberAge = Form.getValue(this.accountsPayableVendorDisplayForm, 'member');
            profsvcClaimHeader.labNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'lastName');
            profsvcClaimHeader.providerIpa = Form.getValue(this.accountsPayableVendorDisplayForm, 'providerId');
            profsvcClaimHeader.providerPanel = Form.getValue(this.accountsPayableVendorDisplayForm, 'provName');
            profsvcClaimHeader.pcpType = Form.getValue(this.accountsPayableVendorDisplayForm, 'type');
            profsvcClaimHeader.securityCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'specialty');
            profsvcClaimHeader.pcpIpaId = Form.getValue(this.accountsPayableVendorDisplayForm, 'pcpId');
            profsvcClaimHeader.primarySvcDate = Form.getValue(this.accountsPayableVendorDisplayForm, 'primaryDate');
            profsvcClaimHeader.serviceReason1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'serviceReason');
            profsvcClaimHeader.pcpSpec = Form.getValue(this.accountsPayableVendorDisplayForm, 'pcpName');
            profsvcClaimHeader.placeOfService1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'plcOfSvc');
            profsvcClaimHeader.diagnosis1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'diagnosisCode1');
            profsvcClaimHeader.autoAccidentIn = Form.getValue(this.accountsPayableVendorDisplayForm, 'authorization');
            profsvcClaimHeader.planCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'planCode');
            profsvcClaimHeader.diagnosis2 = Form.getValue(this.accountsPayableVendorDisplayForm, 'diagonsisCode2');
            profsvcClaimHeader.insertDatetime = Form.getValue(this.accountsPayableVendorDisplayForm, 'lineItem');
            profsvcClaimHeader.ocCarrierCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'procedureCode');
            profsvcClaimHeader.providerIpaId = Form.getValue(this.accountsPayableVendorDisplayForm, 'ocPaid');
            profsvcClaimHeader.claimSubmReasonCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'ocPaidReason');
            profsvcClaimHeader.placeOfService2 = Form.getValue(this.accountsPayableVendorDisplayForm, 'dateOfService');
            profsvcClaimHeader.totalBilledAmt = Form.getValue(this.accountsPayableVendorDisplayForm, 'allowedAmt');
            profsvcClaimHeader.cobAlwdAmtRsn = Form.getValue(this.accountsPayableVendorDisplayForm, 'allowedReason');
            profsvcClaimHeader.patientPaidAmount = Form.getValue(this.accountsPayableVendorDisplayForm, 'billedAmount');
            profsvcClaimHeader.patControlNo = Form.getValue(this.accountsPayableVendorDisplayForm, 'totalNotCov');
            profsvcClaimHeader.inServiceArea = Form.getValue(this.accountsPayableVendorDisplayForm, 'notCoveredReason');
            profsvcClaimHeader.eligStatus = Form.getValue(this.accountsPayableVendorDisplayForm, 'claimStatus');
            profsvcClaimHeader.providerParStat = Form.getValue(this.accountsPayableVendorDisplayForm, 'processStatus');
            profsvcClaimHeader.otherInsuranceInd = Form.getValue(this.accountsPayableVendorDisplayForm, 'coinsuranceReason');
            profsvcClaimHeader.originalReferenceNumber = Form.getValue(this.accountsPayableVendorDisplayForm, 'glReference');
            profsvcClaimHeader.authClass = Form.getValue(this.accountsPayableVendorDisplayForm, 'adjustReason');
            profsvcClaimHeader.medicaidResubmitCode = Form.getValue(this.accountsPayableVendorDisplayForm, 'medDefCode');
            profsvcClaimHeader.onsetTime = Form.getValue(this.accountsPayableVendorDisplayForm, 'postDate');
            profsvcClaimHeader.autoAccidentState = Form.getValue(this.accountsPayableVendorDisplayForm, 'paidNetAmt');
            profsvcClaimHeader.authWaiveMethod = Form.getValue(this.accountsPayableVendorDisplayForm, 'adjustMethod');
            profsvcClaimHeader.admissionDate1 = Form.getValue(this.accountsPayableVendorDisplayForm, 'adminFee');
            this.profsvcClaimHeaderService.updateProfsvcClaimHeader(profsvcClaimHeader, seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProfsvcClaimHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProfsvcClaimHeader() {
        if(this.editProfsvcClaimHeader) {
            this.updateProfsvcClaimHeader(this.profsvcClaimHeader.seqClaimId)
        } else {
            this.createProfsvcClaimHeader();
        }
    }    deleteProfsvcClaimHeader(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimHeaderService.deleteProfsvcClaimHeader(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProfsvcClaimHeader(seqClaimId : number) {
        this.profsvcClaimHeaderService.getProfsvcClaimHeader(seqClaimId).subscribe(profsvcClaimHeader => {
            this.profsvcClaimHeader = profsvcClaimHeader;
            this.accountsPayableVendorDisplayForm.patchValue({
                'vendorId': this.profsvcClaimHeader.seqVendId,
                'claimNumber': this.profsvcClaimHeader.claimNumber,
                'received': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimHeader.dateReceived),
                'daimondId': this.profsvcClaimHeader.seqMcondId,
                'member': this.profsvcClaimHeader.memberAge,
                'lastName': this.profsvcClaimHeader.labNumber,
                'providerId': this.profsvcClaimHeader.providerIpa,
                'provName': this.profsvcClaimHeader.providerPanel,
                'type': this.profsvcClaimHeader.pcpType,
                'specialty': this.profsvcClaimHeader.securityCode,
                'pcpId': this.profsvcClaimHeader.pcpIpaId,
                'primaryDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimHeader.primarySvcDate),
                'serviceReason': this.profsvcClaimHeader.serviceReason1,
                'pcpName': this.profsvcClaimHeader.pcpSpec,
                'plcOfSvc': this.profsvcClaimHeader.placeOfService1,
                'diagnosisCode1': this.profsvcClaimHeader.diagnosis1,
                'authorization': this.profsvcClaimHeader.autoAccidentIn,
                'planCode': this.profsvcClaimHeader.planCode,
                'diagonsisCode2': this.profsvcClaimHeader.diagnosis2,
                'lineItem': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimHeader.insertDatetime),
                'procedureCode': this.profsvcClaimHeader.ocCarrierCode,
                'ocPaid': this.profsvcClaimHeader.providerIpaId,
                'ocPaidReason': this.profsvcClaimHeader.claimSubmReasonCode,
                'dateOfService': this.profsvcClaimHeader.placeOfService2,
                'allowedAmt': this.profsvcClaimHeader.totalBilledAmt,
                'allowedReason': this.profsvcClaimHeader.cobAlwdAmtRsn,
                'billedAmount': this.profsvcClaimHeader.patientPaidAmount,
                'totalNotCov': this.profsvcClaimHeader.patControlNo,
                'notCoveredReason': this.profsvcClaimHeader.inServiceArea,
                'claimStatus': this.profsvcClaimHeader.eligStatus,
                'processStatus': this.profsvcClaimHeader.providerParStat,
                'coinsuranceReason': this.profsvcClaimHeader.otherInsuranceInd,
                'glReference': this.profsvcClaimHeader.originalReferenceNumber,
                'adjustReason': this.profsvcClaimHeader.authClass,
                'medDefCode': this.profsvcClaimHeader.medicaidResubmitCode,
                'postDate': this.profsvcClaimHeader.onsetTime,
                'paidNetAmt': this.profsvcClaimHeader.autoAccidentState,
                'adjustMethod': this.profsvcClaimHeader.authWaiveMethod,
                'adminFee': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimHeader.admissionDate1),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProfsvcClaimHeaders() {
        this.profsvcClaimHeaderService.getProfsvcClaimHeaders().subscribe(profsvcClaimHeaders => {
        this.profsvcClaimHeaders = profsvcClaimHeaders;
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
     private profsvcClaimHeaderService: ProfsvcClaimHeaderService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.accountsPayableVendorDisplayForm);
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
        this.formValidation = new FormValidation(this.accountsPayableVendorDisplayForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.accountsPayableVendorDisplayForm = this.formBuilder.group({
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            received: ['', {updateOn: 'blur', validators: [] }],
            entered: ['', {updateOn: 'blur', validators: [] }],
            daimondId: ['', {updateOn: 'blur', validators: [] }],
            member: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            lastName: ['', {updateOn: 'blur', validators: [] }],
            first: ['', {updateOn: 'blur', validators: [] }],
            mi: ['', {updateOn: 'blur', validators: [] }],
            providerId: ['', {updateOn: 'blur', validators: [] }],
            provName: ['', {updateOn: 'blur', validators: [] }],
            type: ['', {updateOn: 'blur', validators: [] }],
            specialty: ['', {updateOn: 'blur', validators: [] }],
            pcpId: ['', {updateOn: 'blur', validators: [] }],
            primaryDate: ['', {updateOn: 'blur', validators: [] }],
            serviceReason: ['', {updateOn: 'blur', validators: [] }],
            pcpName: ['', {updateOn: 'blur', validators: [] }],
            plcOfSvc: ['', {updateOn: 'blur', validators: [] }],
            diagnosisCode1: ['', {updateOn: 'blur', validators: [] }],
            authorization: ['', {updateOn: 'blur', validators: [] }],
            planCode: ['', {updateOn: 'blur', validators: [] }],
            diagonsisCode2: ['', {updateOn: 'blur', validators: [] }],
            lineItem: ['', {updateOn: 'blur', validators: [] }],
            ocAllowed: ['', {updateOn: 'blur', validators: [] }],
            quantity: ['', {updateOn: 'blur', validators: [] }],
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            ocPaid: ['', {updateOn: 'blur', validators: [] }],
            ocPaidReason: ['', {updateOn: 'blur', validators: [] }],
            dateOfService: ['', {updateOn: 'blur', validators: [] }],
            allowedAmt: ['', {updateOn: 'blur', validators: [] }],
            allowedReason: ['', {updateOn: 'blur', validators: [] }],
            billedAmount: ['', {updateOn: 'blur', validators: [] }],
            totalNotCov: ['', {updateOn: 'blur', validators: [] }],
            notCoveredReason: ['', {updateOn: 'blur', validators: [] }],
            claimStatus: ['', {updateOn: 'blur', validators: [] }],
            totalCopay: ['', {updateOn: 'blur', validators: [] }],
            copayReason: ['', {updateOn: 'blur', validators: [] }],
            processStatus: ['', {updateOn: 'blur', validators: [] }],
            totalCoins: ['', {updateOn: 'blur', validators: [] }],
            coinsuranceReason: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            totalDeduct: ['', {updateOn: 'blur', validators: [] }],
            deductReason: ['', {updateOn: 'blur', validators: [] }],
            glReference: ['', {updateOn: 'blur', validators: [] }],
            withholdAmt: ['', {updateOn: 'blur', validators: [] }],
            adjustReason: ['', {updateOn: 'blur', validators: [] }],
            medDefCode: ['', {updateOn: 'blur', validators: [] }],
            cobPatlaib: ['', {updateOn: 'blur', validators: [] }],
            messages: ['', {updateOn: 'blur', validators: [] }],
            postDate: ['', {updateOn: 'blur', validators: [] }],
            netAmount: ['', {updateOn: 'blur', validators: [] }],
            holds: ['', {updateOn: 'blur', validators: [] }],
            paidNetAmt: ['', {updateOn: 'blur', validators: [] }],
            adjustMethod: ['', {updateOn: 'blur', validators: [] }],
            adminFee: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}