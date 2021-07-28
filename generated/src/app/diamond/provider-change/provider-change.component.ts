/* Copyright (c) 2020 . All Rights Reserved. */

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
import {  MemberEligHistory } from "../../api-models/index"
import {  MemberEligHistoryService } from "../../api-services/member-elig-history.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the ProviderChangeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'providerchange',
    templateUrl: './provider-change.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberEligHistoryService
]

})
export class ProviderChangeComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerChangeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(){
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes','Yes', 'btn btn-primary'), new PopUpMessageButton('no','No', 'btn btn-primary')];
        this.child.showMesssage()
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

editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];
    createMemberEligHistory() {
        this.formValidation.validateForm();
        if(this.providerChangeForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.effectiveDate = Form.getValue(this.this.providerChangeForm, 'effectiveDate');
            memberEligHistory.pbpEffectiveDate = Form.getValue(this.this.providerChangeForm, 'currentEffectiveDate');
            memberEligHistory.termDate = Form.getValue(this.this.providerChangeForm, 'termDate');
            memberEligHistory.termReason = Form.getValue(this.this.providerChangeForm, 'termReason');
            memberEligHistory.pcpChangeReason = Form.getValue(this.this.providerChangeForm, 'pcpChngRsn');
            memberEligHistory.panelId = Form.getValue(this.this.providerChangeForm, 'panel');
            memberEligHistory.ipaId = Form.getValue(this.this.providerChangeForm, 'ipa');
            memberEligHistory.pecWaived = Form.getValue(this.this.providerChangeForm, 'pcpId');
            memberEligHistory.siteCode = Form.getValue(this.this.providerChangeForm, 'site');
            memberEligHistory.seqProv2Id = Form.getValue(this.this.providerChangeForm, 'prov2');
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberEligHistory(seqEligHist : number) {
        this.formValidation.validateForm();
        if(this.providerChangeForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.effectiveDate = Form.getValue(this.this.providerChangeForm, 'effectiveDate');
            memberEligHistory.pbpEffectiveDate = Form.getValue(this.this.providerChangeForm, 'currentEffectiveDate');
            memberEligHistory.termDate = Form.getValue(this.this.providerChangeForm, 'termDate');
            memberEligHistory.termReason = Form.getValue(this.this.providerChangeForm, 'termReason');
            memberEligHistory.pcpChangeReason = Form.getValue(this.this.providerChangeForm, 'pcpChngRsn');
            memberEligHistory.panelId = Form.getValue(this.this.providerChangeForm, 'panel');
            memberEligHistory.ipaId = Form.getValue(this.this.providerChangeForm, 'ipa');
            memberEligHistory.pecWaived = Form.getValue(this.this.providerChangeForm, 'pcpId');
            memberEligHistory.siteCode = Form.getValue(this.this.providerChangeForm, 'site');
            memberEligHistory.seqProv2Id = Form.getValue(this.this.providerChangeForm, 'prov2');
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHist).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberEligHistory() {
        if(this.editMemberEligHistory) {
            this.updateMemberEligHistory(this.memberEligHistory.seqEligHist)
        } else {
            this.createMemberEligHistory();
        }
    }    deleteMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqEligHist).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.getMemberEligHistory(seqEligHist).subscribe(memberEligHistory => {
            this.memberEligHistory = memberEligHistory;
            this.providerChangeForm.patchValue({
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.effectiveDate),
                'currentEffectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.pbpEffectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
                'termReason': this.memberEligHistory.termReason,
                'pcpChngRsn': this.memberEligHistory.pcpChangeReason,
                'panel': this.memberEligHistory.panelId,
                'ipa': this.memberEligHistory.ipaId,
                'pcpId': this.memberEligHistory.pecWaived,
                'site': this.memberEligHistory.siteCode,
                'prov2': this.memberEligHistory.seqProv2Id,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberEligHistorys() {
        this.memberEligHistoryService.getMemberEligHistorys().subscribe(memberEligHistorys => {
        this.memberEligHistorys = memberEligHistorys;
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
     private memberEligHistoryService: MemberEligHistoryService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerChangeForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerChangeForm = this.formBuilder.group({
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            currentEffectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            currentTermDate: ['', {updateOn: 'blur', validators: [] }],
            termReason: ['', {updateOn: 'blur', validators: [] }],
            pcpChngRsn: ['', {updateOn: 'blur', validators: [] }],
            panel: ['', {updateOn: 'blur', validators: [] }],
            currentPanel: ['', {updateOn: 'blur', validators: [] }],
            ipa: ['', {updateOn: 'blur', validators: [] }],
            currentIpa: ['', {updateOn: 'blur', validators: [] }],
            pcpId: ['', {updateOn: 'blur', validators: [] }],
            currentPcpId: ['', {updateOn: 'blur', validators: [] }],
            site: ['', {updateOn: 'blur', validators: [] }],
            currentSite: ['', {updateOn: 'blur', validators: [] }],
            prov2: ['', {updateOn: 'blur', validators: [] }],
            currentProv2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}