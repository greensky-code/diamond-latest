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
import {  LineOfBusinessMaster } from "../../api-models/index"
import {  LineOfBusinessMasterService } from "../../api-services/line-of-business-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the LineOfBusinessComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'lineofbusiness',
    templateUrl: './line-of-business.component.html',

})
export class LineOfBusinessComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    lineOfBusinessForm: FormGroup;
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

editLineOfBusinessMaster: boolean;
    lineOfBusinessMaster: LineOfBusinessMaster;
    linesOfBusinessMaster: LineOfBusinessMaster[];
    if (this.secWin.hasInsertPermission()) {
        createLineOfBusinessMaster() {
            this.formValidation.validateForm();
            if(this.lineOfBusinessForm.valid) {
                let lineOfBusinessMaster = new LineOfBusinessMaster();
                lineOfBusinessMaster.lineOfBusiness = Form.getValue(this.lineOfBusinessForm, 'lineOfBusinessLb');
                lineOfBusinessMaster.name = Form.getValue(this.lineOfBusinessForm, 'name');
                lineOfBusinessMaster.country = Form.getValue(this.lineOfBusinessForm, 'country');
                lineOfBusinessMaster.addressLine1 = Form.getValue(this.lineOfBusinessForm, 'addrLine1');
                lineOfBusinessMaster.zipCode = Form.getValue(this.lineOfBusinessForm, 'zipCode');
                lineOfBusinessMaster.addressLine2 = Form.getValue(this.lineOfBusinessForm, 'addrLine2');
                lineOfBusinessMaster.phoneNumber = Form.getValue(this.lineOfBusinessForm, 'phoneNumber');
                lineOfBusinessMaster.city = Form.getValue(this.lineOfBusinessForm, 'city');
                lineOfBusinessMaster.state = Form.getValue(this.lineOfBusinessForm, 'state');
                lineOfBusinessMaster.faxNumber = Form.getValue(this.lineOfBusinessForm, 'faxNumber');
                lineOfBusinessMaster.pcpRequired = Form.getValue(this.lineOfBusinessForm, 'pcpRequired');
                lineOfBusinessMaster.performAuthClaimMatch = Form.getValue(this.lineOfBusinessForm, 'authclaimsMatch');
                lineOfBusinessMaster.applyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'mcPlanInd');
                lineOfBusinessMaster.useApcEditor = Form.getValue(this.lineOfBusinessForm, 'depEdit');
                lineOfBusinessMaster.allowedGreaterThanBilled = Form.getValue(this.lineOfBusinessForm, 'allowedBilled');
                lineOfBusinessMaster.authClaimMatchDaysBefore = Form.getValue(this.lineOfBusinessForm, 'covprovDaysBefore');
                lineOfBusinessMaster.eobPrintFlag = Form.getValue(this.lineOfBusinessForm, 'cobPrintFlag');
                lineOfBusinessMaster.claimDupRule = Form.getValue(this.lineOfBusinessForm, 'dddRule');
                lineOfBusinessMaster.authClaimMatchDaysAfter = Form.getValue(this.lineOfBusinessForm, 'covprovDaysAfter');
                lineOfBusinessMaster.performAuthWaive = Form.getValue(this.lineOfBusinessForm, 'performAuthWaive');
                lineOfBusinessMaster.waiveMatchOrder = Form.getValue(this.lineOfBusinessForm, 'inclmOrder');
                lineOfBusinessMaster.coveringProvInd = Form.getValue(this.lineOfBusinessForm, 'coveringProv');
                lineOfBusinessMaster.authLevel = Form.getValue(this.lineOfBusinessForm, 'waiveAuthLevel');
                lineOfBusinessMaster.parReasonCode = Form.getValue(this.lineOfBusinessForm, 'parReasonCode');
                lineOfBusinessMaster.nonParReasonCode = Form.getValue(this.lineOfBusinessForm, 'nonParReasonCode');
                lineOfBusinessMaster.useApcPricer = Form.getValue(this.lineOfBusinessForm, 'waiveMatchOrder');
                lineOfBusinessMaster.siteFlg = Form.getValue(this.lineOfBusinessForm, 'siteReq');
                lineOfBusinessMaster.ageFrom = Form.getValue(this.lineOfBusinessForm, 'ageFrom');
                lineOfBusinessMaster.ageThrough = Form.getValue(this.lineOfBusinessForm, 'ageThrough');
                lineOfBusinessMaster.indPcpMaxEnrollLmt = Form.getValue(this.lineOfBusinessForm, 'pcplinbsMxenrollmt');
                lineOfBusinessMaster.seqFailPcp = Form.getValue(this.lineOfBusinessForm, 'defaultPcp');
                lineOfBusinessMaster.idcardReinstDays = Form.getValue(this.lineOfBusinessForm, 'idCardReinstDays');
                lineOfBusinessMaster.indPcpThreshold = Form.getValue(this.lineOfBusinessForm, 'indPcplinbsThreshold');
                lineOfBusinessMaster.familyAffiliation = Form.getValue(this.lineOfBusinessForm, 'familyAffliation');
                lineOfBusinessMaster.calcIntDscnt = Form.getValue(this.lineOfBusinessForm, 'calcDiscIntrpnlty');
                lineOfBusinessMaster.useResetDateFlag = Form.getValue(this.lineOfBusinessForm, 'useResetDate');
                lineOfBusinessMaster.insertDatetime = Form.getValue(this.lineOfBusinessForm, 'intrDetMethod');
                lineOfBusinessMaster.penApplyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'applyUnlceanIndInterest');
                lineOfBusinessMaster.userDefined1 = Form.getValue(this.lineOfBusinessForm, 'userDefined1');
                lineOfBusinessMaster.userDefined2 = Form.getValue(this.lineOfBusinessForm, 'userDefined2');
                lineOfBusinessMaster.userDate1 = Form.getValue(this.lineOfBusinessForm, 'userDate1');
                this.lineOfBusinessMasterService.createLineOfBusinessMaster(lineOfBusinessMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editLineOfBusinessMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateLineOfBusinessMaster(lineOfBusiness : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.lineOfBusinessForm.valid) {
            let lineOfBusinessMaster = new LineOfBusinessMaster();
            lineOfBusinessMaster.lineOfBusiness = Form.getValue(this.lineOfBusinessForm, 'lineOfBusinessLb');
            lineOfBusinessMaster.name = Form.getValue(this.lineOfBusinessForm, 'name');
            lineOfBusinessMaster.country = Form.getValue(this.lineOfBusinessForm, 'country');
            lineOfBusinessMaster.addressLine1 = Form.getValue(this.lineOfBusinessForm, 'addrLine1');
            lineOfBusinessMaster.zipCode = Form.getValue(this.lineOfBusinessForm, 'zipCode');
            lineOfBusinessMaster.addressLine2 = Form.getValue(this.lineOfBusinessForm, 'addrLine2');
            lineOfBusinessMaster.phoneNumber = Form.getValue(this.lineOfBusinessForm, 'phoneNumber');
            lineOfBusinessMaster.city = Form.getValue(this.lineOfBusinessForm, 'city');
            lineOfBusinessMaster.state = Form.getValue(this.lineOfBusinessForm, 'state');
            lineOfBusinessMaster.faxNumber = Form.getValue(this.lineOfBusinessForm, 'faxNumber');
            lineOfBusinessMaster.pcpRequired = Form.getValue(this.lineOfBusinessForm, 'pcpRequired');
            lineOfBusinessMaster.performAuthClaimMatch = Form.getValue(this.lineOfBusinessForm, 'authclaimsMatch');
            lineOfBusinessMaster.applyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'mcPlanInd');
            lineOfBusinessMaster.useApcEditor = Form.getValue(this.lineOfBusinessForm, 'depEdit');
            lineOfBusinessMaster.allowedGreaterThanBilled = Form.getValue(this.lineOfBusinessForm, 'allowedBilled');
            lineOfBusinessMaster.authClaimMatchDaysBefore = Form.getValue(this.lineOfBusinessForm, 'covprovDaysBefore');
            lineOfBusinessMaster.eobPrintFlag = Form.getValue(this.lineOfBusinessForm, 'cobPrintFlag');
            lineOfBusinessMaster.claimDupRule = Form.getValue(this.lineOfBusinessForm, 'dddRule');
            lineOfBusinessMaster.authClaimMatchDaysAfter = Form.getValue(this.lineOfBusinessForm, 'covprovDaysAfter');
            lineOfBusinessMaster.performAuthWaive = Form.getValue(this.lineOfBusinessForm, 'performAuthWaive');
            lineOfBusinessMaster.waiveMatchOrder = Form.getValue(this.lineOfBusinessForm, 'inclmOrder');
            lineOfBusinessMaster.coveringProvInd = Form.getValue(this.lineOfBusinessForm, 'coveringProv');
            lineOfBusinessMaster.authLevel = Form.getValue(this.lineOfBusinessForm, 'waiveAuthLevel');
            lineOfBusinessMaster.parReasonCode = Form.getValue(this.lineOfBusinessForm, 'parReasonCode');
            lineOfBusinessMaster.nonParReasonCode = Form.getValue(this.lineOfBusinessForm, 'nonParReasonCode');
            lineOfBusinessMaster.useApcPricer = Form.getValue(this.lineOfBusinessForm, 'waiveMatchOrder');
            lineOfBusinessMaster.siteFlg = Form.getValue(this.lineOfBusinessForm, 'siteReq');
            lineOfBusinessMaster.ageFrom = Form.getValue(this.lineOfBusinessForm, 'ageFrom');
            lineOfBusinessMaster.ageThrough = Form.getValue(this.lineOfBusinessForm, 'ageThrough');
            lineOfBusinessMaster.indPcpMaxEnrollLmt = Form.getValue(this.lineOfBusinessForm, 'pcplinbsMxenrollmt');
            lineOfBusinessMaster.seqFailPcp = Form.getValue(this.lineOfBusinessForm, 'defaultPcp');
            lineOfBusinessMaster.idcardReinstDays = Form.getValue(this.lineOfBusinessForm, 'idCardReinstDays');
            lineOfBusinessMaster.indPcpThreshold = Form.getValue(this.lineOfBusinessForm, 'indPcplinbsThreshold');
            lineOfBusinessMaster.familyAffiliation = Form.getValue(this.lineOfBusinessForm, 'familyAffliation');
            lineOfBusinessMaster.calcIntDscnt = Form.getValue(this.lineOfBusinessForm, 'calcDiscIntrpnlty');
            lineOfBusinessMaster.useResetDateFlag = Form.getValue(this.lineOfBusinessForm, 'useResetDate');
            lineOfBusinessMaster.insertDatetime = Form.getValue(this.lineOfBusinessForm, 'intrDetMethod');
            lineOfBusinessMaster.penApplyUncleanInd = Form.getValue(this.lineOfBusinessForm, 'applyUnlceanIndInterest');
            lineOfBusinessMaster.userDefined1 = Form.getValue(this.lineOfBusinessForm, 'userDefined1');
            lineOfBusinessMaster.userDefined2 = Form.getValue(this.lineOfBusinessForm, 'userDefined2');
            lineOfBusinessMaster.userDate1 = Form.getValue(this.lineOfBusinessForm, 'userDate1');
            this.lineOfBusinessMasterService.updateLineOfBusinessMaster(lineOfBusinessMaster, lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editLineOfBusinessMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveLineOfBusinessMaster() {
        if(this.editLineOfBusinessMaster) {
            this.updateLineOfBusinessMaster(this.lineOfBusinessMaster.lineOfBusiness)
        } else {
            this.createLineOfBusinessMaster();
        }
    }    deleteLineOfBusinessMaster(lineOfBusiness : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.lineOfBusinessMasterService.deleteLineOfBusinessMaster(lineOfBusiness).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getLineOfBusinessMaster(lineOfBusiness : string) {
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBusiness).subscribe(lineOfBusinessMaster => {
            this.lineOfBusinessMaster = lineOfBusinessMaster;
            this.lineOfBusinessForm.patchValue({
                'lineOfBusinessLb': this.lineOfBusinessMaster.lineOfBusiness,
                'name': this.lineOfBusinessMaster.name,
                'country': this.lineOfBusinessMaster.country,
                'addrLine1': this.lineOfBusinessMaster.addressLine1,
                'zipCode': this.lineOfBusinessMaster.zipCode,
                'addrLine2': this.lineOfBusinessMaster.addressLine2,
                'phoneNumber': this.lineOfBusinessMaster.phoneNumber,
                'city': this.lineOfBusinessMaster.city,
                'state': this.lineOfBusinessMaster.state,
                'faxNumber': this.lineOfBusinessMaster.faxNumber,
                'pcpRequired': this.lineOfBusinessMaster.pcpRequired,
                'authclaimsMatch': this.lineOfBusinessMaster.performAuthClaimMatch,
                'mcPlanInd': this.lineOfBusinessMaster.applyUncleanInd,
                'depEdit': this.lineOfBusinessMaster.useApcEditor,
                'allowedBilled': this.lineOfBusinessMaster.allowedGreaterThanBilled,
                'covprovDaysBefore': this.lineOfBusinessMaster.authClaimMatchDaysBefore,
                'cobPrintFlag': this.lineOfBusinessMaster.eobPrintFlag,
                'dddRule': this.lineOfBusinessMaster.claimDupRule,
                'covprovDaysAfter': this.lineOfBusinessMaster.authClaimMatchDaysAfter,
                'performAuthWaive': this.lineOfBusinessMaster.performAuthWaive,
                'inclmOrder': this.lineOfBusinessMaster.waiveMatchOrder,
                'coveringProv': this.lineOfBusinessMaster.coveringProvInd,
                'waiveAuthLevel': this.lineOfBusinessMaster.authLevel,
                'parReasonCode': this.lineOfBusinessMaster.parReasonCode,
                'nonParReasonCode': this.lineOfBusinessMaster.nonParReasonCode,
                'waiveMatchOrder': this.lineOfBusinessMaster.useApcPricer,
                'siteReq': this.lineOfBusinessMaster.siteFlg,
                'ageFrom': this.lineOfBusinessMaster.ageFrom,
                'ageThrough': this.lineOfBusinessMaster.ageThrough,
                'pcplinbsMxenrollmt': this.lineOfBusinessMaster.indPcpMaxEnrollLmt,
                'defaultPcp': this.lineOfBusinessMaster.seqFailPcp,
                'idCardReinstDays': this.lineOfBusinessMaster.idcardReinstDays,
                'indPcplinbsThreshold': this.lineOfBusinessMaster.indPcpThreshold,
                'familyAffliation': this.lineOfBusinessMaster.familyAffiliation,
                'calcDiscIntrpnlty': this.lineOfBusinessMaster.calcIntDscnt,
                'useResetDate': this.lineOfBusinessMaster.useResetDateFlag,
                'intrDetMethod': this.dateFormatPipe.defaultDisplayDateFormat(this.lineOfBusinessMaster.insertDatetime),
                'applyUnlceanIndInterest': this.lineOfBusinessMaster.penApplyUncleanInd,
                'userDefined1': this.lineOfBusinessMaster.userDefined1,
                'userDefined2': this.lineOfBusinessMaster.userDefined2,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.lineOfBusinessMaster.userDate1),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getLinesOfBusinessMaster() {
        this.lineOfBusinessMasterService.getLinesOfBusinessMaster().subscribe(linesOfBusinessMaster => {
        this.linesOfBusinessMaster = linesOfBusinessMaster;
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
     private lineOfBusinessMasterService: LineOfBusinessMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.lineOfBusinessForm);
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
        this.formValidation = new FormValidation(this.lineOfBusinessForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.lineOfBusinessForm = this.formBuilder.group({
            lineOfBusinessLb: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            country: ['', {updateOn: 'blur', validators: [] }],
            addrLine1: ['', {updateOn: 'blur', validators: [] }],
            zipCode: ['', {updateOn: 'blur', validators: [] }],
            addrLine2: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            faxNumber: ['', {updateOn: 'blur', validators: [] }],
            pcpRequired: ['', {updateOn: 'blur', validators: [] }],
            authclaimsMatch: ['', {updateOn: 'blur', validators: [] }],
            mcPlanInd: ['', {updateOn: 'blur', validators: [] }],
            depEdit: ['', {updateOn: 'blur', validators: [] }],
            allowedBilled: ['', {updateOn: 'blur', validators: [] }],
            primaryPriceSearch: ['', {updateOn: 'blur', validators: [] }],
            covprovDaysBefore: ['', {updateOn: 'blur', validators: [] }],
            cobPrintFlag: ['', {updateOn: 'blur', validators: [] }],
            dddRule: ['', {updateOn: 'blur', validators: [] }],
            claimDupRule: ['', {updateOn: 'blur', validators: [] }],
            covprovDaysAfter: ['', {updateOn: 'blur', validators: [] }],
            performAuthWaive: ['', {updateOn: 'blur', validators: [] }],
            inclmOrder: ['', {updateOn: 'blur', validators: [] }],
            coveringProv: ['', {updateOn: 'blur', validators: [] }],
            waiveAuthLevel: ['', {updateOn: 'blur', validators: [] }],
            parReasonCode: ['', {updateOn: 'blur', validators: [] }],
            nonParReasonCode: ['', {updateOn: 'blur', validators: [] }],
            waiveMatchOrder: ['', {updateOn: 'blur', validators: [] }],
            siteReq: ['', {updateOn: 'blur', validators: [] }],
            cert: ['', {updateOn: 'blur', validators: [] }],
            ageFrom: ['', {updateOn: 'blur', validators: [] }],
            ageThrough: ['', {updateOn: 'blur', validators: [] }],
            pcplinbsMxenrollmt: ['', {updateOn: 'blur', validators: [] }],
            defaultPcp: ['', {updateOn: 'blur', validators: [] }],
            idCardReinstDays: ['', {updateOn: 'blur', validators: [] }],
            indPcplinbsThreshold: ['', {updateOn: 'blur', validators: [] }],
            noAutoPcpFound: ['', {updateOn: 'blur', validators: [] }],
            familyAffliation: ['', {updateOn: 'blur', validators: [] }],
            calcDiscIntrpnlty: ['', {updateOn: 'blur', validators: [] }],
            useResetDate: ['', {updateOn: 'blur', validators: [] }],
            intrDetMethod: ['', {updateOn: 'blur', validators: [] }],
            applyUnlceanIndInterest: ['', {updateOn: 'blur', validators: [] }],
            paySubdep: ['', {updateOn: 'blur', validators: [] }],
            applyUnlceanIndPenalty: ['', {updateOn: 'blur', validators: [] }],
            userDefined1: ['', {updateOn: 'blur', validators: [] }],
            userDefined2: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}