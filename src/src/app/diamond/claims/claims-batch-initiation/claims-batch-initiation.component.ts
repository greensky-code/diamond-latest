/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {IMySingleDateModel} from 'angular-mydatepicker';
import {MessageMasterDtlService} from '../../../api-services';
import {MessageMasterDtl} from '../../../api-models';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {ClaimBatchInit} from "../../../shared/models/models";
import {Form} from "../../../shared/helpers/form.helper";

// Use the Component directive to define the ClaimsBatchInitiationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimsbatchinitiation',
    templateUrl: './claims-batch-initiation.component.html',
    styleUrls: ['./claims-batch-initiation.component.scss']

})
export class ClaimsBatchInitiationComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    @Input() showIcon = true;

    @Input() claimBatchInitData = new ClaimBatchInit();
    claimsBatchInitiationForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    @Output() buttonclickEvent = new EventEmitter<any>();
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
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
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimsBatchInitiationForm);

        if (this.claimBatchInitData) {
            this.claimsBatchInitiationForm.setValue({
                'dateReceived': this.claimBatchInitData.dateReceived,
                'batchNumber': this.claimBatchInitData.batchNumber
            });
        }

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimsBatchInitiationForm = this.formBuilder.group({
            batchNumber: ['', [Validators.required]],
            dateReceived: ['', [Validators.required]]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    submit() {
       this.claimBatchInitData.dateReceived =   this.claimsBatchInitiationForm.value.dateReceived;
        this.claimBatchInitData.batchNumber = this.claimsBatchInitiationForm.value.batchNumber;
        const dateReceived = this.claimsBatchInitiationForm.value.dateReceived;
        if (dateReceived) {
            const dateR = this.getDate(dateReceived.singleDate);
            if (new Date().getTime() > dateR.getTime()) {
                this.buttonclickEvent.emit(this.claimBatchInitData);
                this.activeModal.close();
            } else {
                this.messageService.findByMessageId(70475).subscribe((message: MessageMasterDtl[]) => {
                    this.alertMessage = this.alertMessageService.error('70475: ' + message[0].messageText);
                });
                return;
            }
            this.buttonclickEvent.emit(this.claimBatchInitData);
            return;
        }
        this.buttonclickEvent.emit(this.claimBatchInitData);
        this.activeModal.close();
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

}
