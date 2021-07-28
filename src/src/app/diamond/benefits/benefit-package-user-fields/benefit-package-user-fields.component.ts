/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { DatePickerConfig } from '../../../shared/config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitPackageMaster } from '../../../api-models';
import { BenefitPackageMasterService } from '../../../api-services';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { DynamicUserDefinedFieldsComponent } from '../../../shared/components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import {OPERATIONS} from "../../../shared/models/models";
import {AuditService} from "../../../shared/services/audit.service";

// Use the Component directive to define the BenefitPackageUserFieldsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'benefitpackageuserfields',
    templateUrl: './benefit-package-user-fields.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        BenefitPackageMasterService
    ]

})
export class BenefitPackageUserFieldsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitPackageUserFieldsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public benefitPackageMaster: BenefitPackageMaster;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    @Input() showIcon: boolean = false;
    @Input() benefitPackageId: string;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    @ViewChild(DynamicUserDefinedFieldsComponent, { static: false }) userDefinedFields: DynamicUserDefinedFieldsComponent;
    @Input() winID?: string = 'BENEF';
    @Input() dataWindowId?: string = 'dw_benef_user_fields_de';
    windowId = 'BENEF';
    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }





    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        public activeModal: NgbActiveModal,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private benefitPackageMasterService: BenefitPackageMasterService,
        private toastService: ToastService,
        private auditService: AuditService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.benefitPackageUserFieldsForm);
        this.getBenefitPackageMasterById(this.benefitPackageId);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.benefitPackageUserFieldsForm = this.formBuilder.group({
            userDefined3: ['', { validators: [] }],
            userDate3: ['', { validators: [] }],
            userDefined4: ['', { validators: [] }],
            userDate4: ['', { validators: [] }],
            userDefined5: ['', { validators: [] }],
            userDate5: ['', { validators: [] }],
            userDefined6: ['', { validators: [] }],
            userDate6: ['', { validators: [] }],
            userDefined7: ['', { validators: [] }],
            userDate7: ['', { validators: [] }],
            userDefined8: ['', { validators: [] }],
            userDate8: ['', { validators: [] }],
            userDefined9: ['', { validators: [] }],
            userDate9: ['', { validators: [] }],
            userDefined10: ['', { validators: [] }],
            userDate10: ['', { validators: [] }],
            userDefined11: ['', { validators: [] }],
            userDate11: ['', { validators: [] }],
            userDefined12: ['', { validators: [] }],
            userDate12: ['', { validators: [] }],
            userDefined13: ['', { validators: [] }],
            userDate13: ['', { validators: [] }],
            userDefined14: ['', { validators: [] }],
            userDate14: ['', { validators: [] }],
            userDefined15: ['', { validators: [] }],
            userDate15: ['', { validators: [] }],
            userDefined16: ['', { validators: [] }],
            userDate16: ['', { validators: [] }],
            userDefined17: ['', { validators: [] }],
            userDate17: ['', { validators: [] }],
            userDefined18: ['', { validators: [] }],
            userDate18: ['', { validators: [] }],
            userDefined19: ['', { validators: [] }],
            userDate19: ['', { validators: [] }],
            userDefined20: ['', { validators: [] }],
            userDate20: ['', { validators: [] }]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private getBenefitPackageMasterById(benefitPackageId: string) {
        this.benefitPackageMasterService.getBenefitPackageMaster(btoa(benefitPackageId)).subscribe(benefitPackageMaster => {
            this.benefitPackageMaster = benefitPackageMaster;
            setTimeout(() => {
                this.userDefinedFields.updateUserDefinedValues(this.benefitPackageMaster);
            }, 100);
        });
    }

    updateBenefitPackageMaster() {
        if (this.userDefinedFields.userDefinedFieldForm.dirty) {
            if (this.userDefinedFields.userDefinedFieldForm.valid) {
                this.benefitPackageMaster.userDefined3 = this.userDefinedFields.userDefinedFieldForm.get('userDefined3').value;
                this.benefitPackageMaster.userDefined4 = this.userDefinedFields.userDefinedFieldForm.get('userDefined4').value;
                this.benefitPackageMaster.userDefined5 = this.userDefinedFields.userDefinedFieldForm.get('userDefined5').value;
                this.benefitPackageMaster.userDefined6 = this.userDefinedFields.userDefinedFieldForm.get('userDefined6').value;
                this.benefitPackageMaster.userDefined7 = this.userDefinedFields.userDefinedFieldForm.get('userDefined7').value;
                this.benefitPackageMaster.userDefined8 = this.userDefinedFields.userDefinedFieldForm.get('userDefined8').value;
                this.benefitPackageMaster.userDefined9 = this.userDefinedFields.userDefinedFieldForm.get('userDefined9').value;
                this.benefitPackageMaster.userDefined10 = this.userDefinedFields.userDefinedFieldForm.get('userDefined10').value;
                this.benefitPackageMaster.userDefined11 = this.userDefinedFields.userDefinedFieldForm.get('userDefined11').value;
                this.benefitPackageMaster.userDefined12 = this.userDefinedFields.userDefinedFieldForm.get('userDefined12').value;
                this.benefitPackageMaster.userDefined13 = this.userDefinedFields.userDefinedFieldForm.get('userDefined13').value;
                this.benefitPackageMaster.userDefined14 = this.userDefinedFields.userDefinedFieldForm.get('userDefined14').value;
                this.benefitPackageMaster.userDefined15 = this.userDefinedFields.userDefinedFieldForm.get('userDefined15').value;
                this.benefitPackageMaster.userDefined16 = this.userDefinedFields.userDefinedFieldForm.get('userDefined16').value;
                this.benefitPackageMaster.userDefined17 = this.userDefinedFields.userDefinedFieldForm.get('userDefined17').value;
                this.benefitPackageMaster.userDefined18 = this.userDefinedFields.userDefinedFieldForm.get('userDefined18').value;
                this.benefitPackageMaster.userDefined19 = this.userDefinedFields.userDefinedFieldForm.get('userDefined19').value;
                this.benefitPackageMaster.userDefined20 = this.userDefinedFields.userDefinedFieldForm.get('userDefined20').value;
                this.benefitPackageMaster.userDate3 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate3');
                this.benefitPackageMaster.userDate4 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate4');
                this.benefitPackageMaster.userDate5 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate5');
                this.benefitPackageMaster.userDate6 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate6');
                this.benefitPackageMaster.userDate7 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate7');
                this.benefitPackageMaster.userDate8 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate8');
                this.benefitPackageMaster.userDate9 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate9');
                this.benefitPackageMaster.userDate10 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate10');
                this.benefitPackageMaster.userDate11 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate11');
                this.benefitPackageMaster.userDate12 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate12');
                this.benefitPackageMaster.userDate13 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate13');
                this.benefitPackageMaster.userDate14 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate14');
                this.benefitPackageMaster.userDate15 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate15');
                this.benefitPackageMaster.userDate16 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate16');
                this.benefitPackageMaster.userDate17 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate17');
                this.benefitPackageMaster.userDate18 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate18');
                this.benefitPackageMaster.userDate19 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate19');
                this.benefitPackageMaster.userDate20 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate20');
                this.auditService.setInsertFields(
                    this.benefitPackageMaster,
                    this.benefitPackageMaster,
                    OPERATIONS.UPDATE
                )
                this.auditService.setAuditFields(this.benefitPackageMaster, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);


                this.benefitPackageMasterService.updateBenefitPackageMaster(this.benefitPackageMaster, btoa(this.benefitPackageId)).subscribe(response => {
                    this.toastService.showToast('Record successfully updated.', NgbToastType.Success)
                    this.activeModal.close();
                    window.scroll(0, 0);
                });
            } else {
                this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
            }
        }else{
            this.activeModal.close();
        }
    }

    close() {
        this.activeModal.close();
    }
}
