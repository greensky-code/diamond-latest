/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeterminantRulesService, MessageMasterDtlService } from '../../../api-services';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MessageMasterDtl } from '../../../api-models';
import { IMyDateModel, IMySingleDateModel } from 'angular-mydatepicker';
import { Form } from '../../../shared/helpers/form.helper';

// Use the Component directive to define the RuleCopyComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@UntilDestroy({ checkProperties: true })
@Component({

    selector: 'rulecopy',
    templateUrl: './rule-copy.component.html',

})
export class RuleCopyComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() formData;
    @Output() onRuleCopyEmit = new EventEmitter<any>();
    ruleCopyForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    windowId = '';

    isSuperUser = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;


    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        public activeModal: NgbActiveModal,
        private determinantRulesService: DeterminantRulesService,
        private messageService: MessageMasterDtlService,
        private modalService: NgbModal
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
    }


    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.ruleCopyForm);
        this.onRuleIdValueChange()
    }


    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [
            new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    isRuleIdExist = false;

    onRuleIdValueChange() {

        this.ruleCopyForm.controls['ruleId'].valueChanges.subscribe(ruleId => {
            this.isRuleIdExist = false;
            this.getDeterminantRulesById(ruleId);
        });

        this.ruleCopyForm.controls['effectiveDate'].valueChanges.subscribe(effDate => {
            if (this.isRuleIdExist) {
                this.showRuleIdExistMessage();
            }
        })

        if (this.isRuleIdExist) {

        }

    }

    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }


    /**
     * check if ruleId already Exist
     * @param ruleId
     * @param keyword
     */
    getDeterminantRulesById(ruleId: string, keyword = 'ADRUL') {
        this.determinantRulesService.getDeterminantRulesByRuleId(ruleId, keyword).subscribe(determinantRules => {
            if (determinantRules) {
                this.isRuleIdExist = true;
                this.showRuleIdExistMessage();
            }

        });
    }

    ruleIdMesssage: string = null;

    showRuleIdExistMessage() {
        if (this.ruleIdMesssage) {
            this.showPopUp("27239: " + this.ruleIdMesssage, 'Window Error');
            return
        }
        this.messageService.findByMessageId(27239).subscribe((message: MessageMasterDtl[]) => {
            this.ruleIdMesssage = message[0].messageText;
            this.showPopUp("27239: " + this.ruleIdMesssage, 'Window Error')
        });
    }


    onOkButtonClick() {
        if (!(this.ruleCopyForm.value.ruleId)) {
            return
        }
        this.onRuleCopyEmit.emit(this.getFormData());

        this.activeModal.dismiss();
    }


    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

        if (this.isSuperUser) {
            this.initializeComponentState();
            return;
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


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.ruleCopyForm = this.formBuilder.group({
            ruleId: ['', { updateOn: 'blur', validators: [] }],
            effectiveDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: [{ value: '', disabled: true }, { updateOn: 'blur', validators: [] }],
            termReason: [{ value: '', disabled: true }, { updateOn: 'blur', validators: [] }]
        });

        if (this.formData && this.formData.ruleId) {
            this.setFormData(this.formData);
        }
    }

    setFormData(object) {
        this.ruleCopyForm.patchValue({
            'ruleId': object.ruleId,
            'effectiveDate': object.effectiveDate,
            'termDate': object.termDate,
            'termReason': object.termReason,

        })
    }

    getFormData() {
        let benefitCopy = null;
        benefitCopy = {
            'ruleId': this.ruleCopyForm.value.ruleId,
            'effectiveDate': Form.getValue(this.ruleCopyForm, 'effectiveDate'),
            'termDate': Form.getValue(this.ruleCopyForm, 'termDate'),
            'termReason': this.ruleCopyForm.value.termReason,
        }
        return benefitCopy;
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    validateTermDate(event: IMyDateModel) {
        const effD = this.ruleCopyForm.value.effectiveDate;
        if (event.singleDate && effD) {
            let dateEffecDefault = this.getDate(effD.singleDate);
            let termDate = this.getDate(event.singleDate);

            // =====================================        =============================
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.ruleCopyForm.controls['termReason'].enable();
                } else {
                    this.openDateValidationPopupError(true);
                    this.ruleCopyForm.controls['termReason'].disable();
                }
            } else if (!this.isValidDate(termDate)) {
                this.ruleCopyForm.controls['termReason'].disable();
                this.ruleCopyForm.controls['termReason'].setValue(null);
            }
        } else {
            this.ruleCopyForm.controls['termReason'].disable();
            this.ruleCopyForm.controls['termReason'].setValue(null);
        }
    }


    validateEffectiveDate(event: IMyDateModel) {
        const termD = this.ruleCopyForm.value.termDate;
        if (!event) {
            return;
        }
        let dateEffecDefault = this.getDate(event.singleDate);
        if (this.isValidDate(dateEffecDefault)) {
            this.ruleCopyForm.controls['termDate'].enable();
        }
        if (termD) {

            let termDate = this.getDate(termD.singleDate);
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.ruleCopyForm.controls['termReason'].enable();
                    this.ruleCopyForm.controls['termDate'].enable();
                } else {
                    this.openDateValidationPopupError(false);
                    this.ruleCopyForm.controls['termReason'].disable();
                }
            }
        }
    }

    openDateValidationPopupError(isTermDateValidation: boolean) {
        let popMsg

        if (isTermDateValidation) {
            popMsg = new PopUpMessage('Group Contract', 'Error',
                '13027: Termination Date must be greater than Effective Date', 'info', [], MessageType.ERROR);
        } else {
            popMsg = new PopUpMessage('Group Contract', 'Error',
                '13026:Effective Date must be less than Term Date', 'info', [], MessageType.ERROR);
        }
        popMsg.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
