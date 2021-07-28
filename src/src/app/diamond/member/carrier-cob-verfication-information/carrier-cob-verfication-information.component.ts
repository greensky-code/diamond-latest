/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastType } from 'ngb-toast';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { CarrierCOBVerificationInformation } from '../../../api-models/carrier-cob-verification-information';
import { AlertMessage } from '../../../shared/components/alert-message';
import { PopUpMessage } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { DatePickerConfig } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';


@Component({
    selector: 'app-carrier-cob-verfication-information',
    templateUrl: './carrier-cob-verfication-information.component.html',
    styleUrls: ['./carrier-cob-verfication-information.component.css'],
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
    ]
})
export class CarrierCobVerficationInformationComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public carrierCobVerificationInformationForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;

    @Input() showIcon: boolean = false;
    @Input() carrierCOBVerificationInformation: CarrierCOBVerificationInformation;

    @Output() onSubmit = new EventEmitter<CarrierCOBVerificationInformation>();

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private dateFormatPipe: DateFormatPipe,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.carrierCobVerificationInformationForm);
    }


    public cancel(): void {
        this.onSubmit.next(this.carrierCOBVerificationInformation);
    }
    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        console.log("createForm memberOtherCoverage",this.carrierCOBVerificationInformation);
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.carrierCobVerificationInformationForm = this.formBuilder.group({
            verifOthCarrierDate: ['', { updateOn: 'blur' }],
            verifStatusCode: ['', { updateOn: 'blur' }],
            verifSourceLastName: ['', { updateOn: 'blur' }],
            verifSourceFirstName: ['', { updateOn: 'blur' }],
            verifSourcePhoneNo: ['', { updateOn: 'blur' }],
            comments: ['', { updateOn: 'blur' }]
        }, { updateOn: 'submit' });

        this.carrierCobVerificationInformationForm.patchValue({
            verifOthCarrierDate: this.dateFormatPipe.defaultDisplayDateFormat(this.carrierCOBVerificationInformation.verifOthCarrierDate),
            verifStatusCode: this.carrierCOBVerificationInformation.verifStatusCode,
            verifSourceLastName: this.carrierCOBVerificationInformation.verifSourceLastName,
            verifSourceFirstName: this.carrierCOBVerificationInformation.verifSourceFirstName,
            verifSourcePhoneNo: this.carrierCOBVerificationInformation.verifSourcePhoneNo,
            comments: this.carrierCOBVerificationInformation.comments,
        });
    }

    public submitForm() {
        this.formValidation.validateForm();
        if (this.carrierCobVerificationInformationForm.valid) {
            this.carrierCOBVerificationInformation.verifOthCarrierDate = Form.getDatePickerValue(this.carrierCobVerificationInformationForm, 'verifOthCarrierDate');
            this.carrierCOBVerificationInformation.verifStatusCode = Form.getValue(this.carrierCobVerificationInformationForm, 'verifStatusCode');
            this.carrierCOBVerificationInformation.verifSourceFirstName = Form.getValue(this.carrierCobVerificationInformationForm, 'verifSourceFirstName');
            this.carrierCOBVerificationInformation.verifSourceLastName = Form.getValue(this.carrierCobVerificationInformationForm, 'verifSourceLastName');
            this.carrierCOBVerificationInformation.verifSourcePhoneNo = Form.getValue(this.carrierCobVerificationInformationForm, 'verifSourcePhoneNo');
            this.carrierCOBVerificationInformation.comments = Form.getValue(this.carrierCobVerificationInformationForm, 'comments');
            this.onSubmit.next(this.carrierCOBVerificationInformation);
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }
}
