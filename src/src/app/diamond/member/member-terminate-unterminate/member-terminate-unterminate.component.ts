/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import {
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {MemberEligHistory, MessageMasterDtl} from "../../../api-models"
import { MemberEligHistoryService } from "../../../api-services/member-elig-history.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePickerConfig } from '../../../shared/config';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import {IMyDateModel, IMySingleDateModel} from "angular-mydatepicker";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {SearchModel} from "../../../shared/models/models";
import {MemberMasterReasconLookup} from "../../../shared/lookup/member-master-reason-lookup";
import {Form} from "../../../shared/helpers/form.helper";
import {MessageMasterDtlService} from "../../../api-services";
import {SearchService} from "../../../shared/services/search.service";

// Use the Component directive to define the MemberTerminateUnterminateComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'memberterminateunterminate',
    templateUrl: './member-terminate-unterminate.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberEligHistoryService,
        SearchService
    ]

})
export class MemberTerminateUnterminateComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() seqEligHist: number;
    @Input() seqMembId: number;
    @Input() effectiveDate: any;
    @Input() eligFormTermDate: any;
    @Input() eligFormTermReason: any;
    @Output() terminateFormData = new EventEmitter<{}>();
    datePickerConfig = DatePickerConfig;
    memberTerminateUnterminateForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    private displayMessage: any;
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild('termReason') termReasonElement: ElementRef;
    @Input() showIcon: boolean = false;
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

    editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];

    reasonModel = new SearchModel(
        'membermasters/reason/lookup',
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        [{ 'REASON_CODE_TYPE': 'TM' }]
    );

    createMemberEligHistory() {
        this.formValidation.validateForm();
        if (this.memberTerminateUnterminateForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editMemberEligHistory = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateMemberEligHistory(seqEligHisId: number, seqMembId: number) {
        this.formValidation.validateForm();
        if (this.memberTerminateUnterminateForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHisId, seqMembId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editMemberEligHistory = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveMemberEligHistory(seqEligHisId: number) {
        if (this.editMemberEligHistory) {
            this.updateMemberEligHistory(seqEligHisId, this.memberEligHistory.memberEligHistoryPrimaryKey.seqMembId)
        } else {
            this.createMemberEligHistory();
        }
    }

    deleteMemberEligHistory(seqMembId: number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqMembId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberEligHistorys() {
        this.memberEligHistoryService.getMemberEligHistorys().subscribe(memberEligHistorys => {
            this.memberEligHistorys = memberEligHistorys;
        });
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    showDateStringMDY(date: Date): string {
        if (date) {
            const dt = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
            return dt;
        }
        return null;
    }

    addPrefixZero(value) {
        return (value < 10) ? ('0' + value) : value;
    }

    isValidDate(date:Date) :boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    onChangeTermDate(event: IMyDateModel) {
        const effD = this.effectiveDate;
        if (event.singleDate && effD) {
            let dateEffecDefault = this.getDate(effD.singleDate);
            let termDate = this.getDate(event.singleDate);
            if (event.singleDate.jsDate == null) {
                this.memberTerminateUnterminateForm.controls['termReason'].disable();
                this.memberTerminateUnterminateForm.controls['termReason'].setValue(null);
            } else if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() <= termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.memberTerminateUnterminateForm.controls['termReason'].enable();
                } else {
                    this.memberTerminateUnterminateForm.controls['termReason'].disable();
                    this.messageService.findByMessageId(14217).subscribe((message: MessageMasterDtl[]) => {
                        this.memberTerminateUnterminateForm.patchValue({
                            termDate: null
                        });
                        this.showPopUp("14217: " + message[0].messageText.replace('@1', this
                            .showDateStringMDY(this.getDate(effD.singleDate))).replace('@2', this
                            .showDateStringMDY(this.getDate(event.singleDate))), "Member Terminate/Unterminate");
                    });
                }
            } else if(!this.isValidDate(termDate)) {
                this.memberTerminateUnterminateForm.controls['termReason'].disable();
                this.memberTerminateUnterminateForm.controls['termReason'].setValue(null);
                this.messageService.findByMessageId(29031).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp("29031: " + message[0].messageText.replace('@1', 'M/dd/yyyy'), "Member Terminate/Unterminate");
                });
            }
        } else {
            this.memberTerminateUnterminateForm.controls['termReason'].disable();
            this.memberTerminateUnterminateForm.controls['termReason'].setValue(null);
        }
    }

    onLookupFieldChange(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openReasonLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            let val = event.target.value;
            let res = [{'REASON_CODE': val}];
            let sm = JSON.parse(JSON.stringify(this.reasonModel));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                console.log(resp);
                if (resp) {
                } else {
                    this.messageService.findByMessageId(27222).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp("27222: " + message[0].messageText.replace('@1', val), "Member Terminate/Unterminate");
                    });
                    this.memberTerminateUnterminateForm.get("termReason").setValue(null);
                    this.termReasonElement.nativeElement.focus();
                }
            }, error => {
                this.messageService.findByMessageId(27222).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp("27222: " + message[0].messageText.replace('@1', val), "Member Terminate/Unterminate");
                });
                this.memberTerminateUnterminateForm.get("termReason").setValue(null);
                this.termReasonElement.nativeElement.focus();
            });
        }
    }

    /**
     * Generic Search Model
     */
    openReasonLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.reasonModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.REASON_CODE) {
                this.memberTerminateUnterminateForm.get('termReason').setValue(res.REASON_CODE, {emitEvent: false});
            }
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private searchService: SearchService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private memberEligHistoryService: MemberEligHistoryService,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberTerminateUnterminateForm);
        this.memberTerminateUnterminateForm.get('termDate').setValue(this.eligFormTermDate, {emitEvent: false});
        this.memberTerminateUnterminateForm.get('termReason').setValue(this.eligFormTermReason, {emitEvent: false});
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberTerminateUnterminateForm = this.formBuilder.group({
            termDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            termReason: ['', { updateOn: 'blur', validators: [Validators.required] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    submitForm(event) {
        event.preventDefault();
        if (!this.memberTerminateUnterminateForm.valid) {
            this.toastService.showToast('Please enter required fields', NgbToastType.Danger);
        } else {
            this.terminateFormData.emit({
                termDate: Form.getDatePickerValue(this.memberTerminateUnterminateForm, 'termDate'),
                termReason: this.memberTerminateUnterminateForm.value.termReason
            });
            this.cancel();
        }
    }

    public cancel() {
        this.activeModal.dismiss();
    }
}
