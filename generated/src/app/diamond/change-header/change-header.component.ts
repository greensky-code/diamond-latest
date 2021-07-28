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
import {  ProfsvcClaimDetail } from "../../api-models/index"
import {  ProfsvcClaimDetailService } from "../../api-services/profsvc-claim-detail.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ChangeHeaderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'changeheader',
    templateUrl: './change-header.component.html',

})
export class ChangeHeaderComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    changeHeaderForm: FormGroup;
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

editProfsvcClaimDetail: boolean;
    profsvcClaimDetail: ProfsvcClaimDetail;
    profsvcClaimDetails: ProfsvcClaimDetail[];
    if (this.secWin.hasInsertPermission()) {
        createProfsvcClaimDetail() {
            this.formValidation.validateForm();
            if(this.changeHeaderForm.valid) {
                let profsvcClaimDetail = new ProfsvcClaimDetail();
                profsvcClaimDetail.svcToDate = Form.getValue(this.changeHeaderForm, 'svcDate');
                profsvcClaimDetail.postDate = Form.getValue(this.changeHeaderForm, 'thruDate');
                profsvcClaimDetail.seqMembId = Form.getValue(this.changeHeaderForm, 'memberId');
                profsvcClaimDetail.seqProvId = Form.getValue(this.changeHeaderForm, 'provider');
                this.profsvcClaimDetailService.createProfsvcClaimDetail(profsvcClaimDetail).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProfsvcClaimDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProfsvcClaimDetail(seqClaimId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.changeHeaderForm.valid) {
            let profsvcClaimDetail = new ProfsvcClaimDetail();
            profsvcClaimDetail.svcToDate = Form.getValue(this.changeHeaderForm, 'svcDate');
            profsvcClaimDetail.postDate = Form.getValue(this.changeHeaderForm, 'thruDate');
            profsvcClaimDetail.seqMembId = Form.getValue(this.changeHeaderForm, 'memberId');
            profsvcClaimDetail.seqProvId = Form.getValue(this.changeHeaderForm, 'provider');
            this.profsvcClaimDetailService.updateProfsvcClaimDetail(profsvcClaimDetail, seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProfsvcClaimDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProfsvcClaimDetail() {
        if(this.editProfsvcClaimDetail) {
            this.updateProfsvcClaimDetail(this.profsvcClaimDetail.seqClaimId)
        } else {
            this.createProfsvcClaimDetail();
        }
    }    deleteProfsvcClaimDetail(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimDetailService.deleteProfsvcClaimDetail(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProfsvcClaimDetail(seqClaimId : number) {
        this.profsvcClaimDetailService.getProfsvcClaimDetail(seqClaimId).subscribe(profsvcClaimDetail => {
            this.profsvcClaimDetail = profsvcClaimDetail;
            this.changeHeaderForm.patchValue({
                'svcDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimDetail.svcToDate),
                'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimDetail.postDate),
                'memberId': this.profsvcClaimDetail.seqMembId,
                'provider': this.profsvcClaimDetail.seqProvId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProfsvcClaimDetails() {
        this.profsvcClaimDetailService.getProfsvcClaimDetails().subscribe(profsvcClaimDetails => {
        this.profsvcClaimDetails = profsvcClaimDetails;
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
     private profsvcClaimDetailService: ProfsvcClaimDetailService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.changeHeaderForm);
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
        this.formValidation = new FormValidation(this.changeHeaderForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.changeHeaderForm = this.formBuilder.group({
            svcDate: ['', {updateOn: 'blur', validators: [] }],
            thruDate: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            textbox: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            addr001: ['', {updateOn: 'blur', validators: [] }],
            zip: ['', {updateOn: 'blur', validators: [] }],
            vendor: ['', {updateOn: 'blur', validators: [] }],
            addr002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}