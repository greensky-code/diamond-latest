/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { MemberEligHistory } from '../../../api-models'
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { DatePickerConfig } from '../../../shared/config';
import { Router } from '@angular/router';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { getProviderChangeShortcutKeys } from '../../../shared/services/shared.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

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
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberEligHistoryService
    ]
})
export class ProviderChangeComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerChangeForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    datePickerConfig = DatePickerConfig;
    editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private router: Router,
        private toastr: ToastService,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private memberEligHistoryService: MemberEligHistoryService,
        private cdr: ChangeDetectorRef) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerChangeForm);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderChangeShortcutKeys(this));
        this.cdr.detectChanges();
    }
    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
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

    createMemberEligHistory() {
        this.formValidation.validateForm();
        if (this.providerChangeForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.effectiveDate = this.providerChangeForm.get('effectiveDate').value;
            memberEligHistory.pbpEffectiveDate = this.providerChangeForm.get('currentEffectiveDate').value;
            memberEligHistory.termDate = this.providerChangeForm.get('termDate').value;
            memberEligHistory.termReason = this.providerChangeForm.get('termReason').value;
            memberEligHistory.pcpChangeReason = this.providerChangeForm.get('pcpChngRsn').value;
            memberEligHistory.panelId = this.providerChangeForm.get('panel').value;
            memberEligHistory.ipaId = this.providerChangeForm.get('ipa').value;
            memberEligHistory.pecWaived = this.providerChangeForm.get('pcpId').value;
            memberEligHistory.siteCode = this.providerChangeForm.get('site').value;
            memberEligHistory.seqProv2Id = this.providerChangeForm.get('prov2').value;
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editMemberEligHistory = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateMemberEligHistory(seqEligHisId: number, seqMembId: number) {
        this.formValidation.validateForm();
        if (this.providerChangeForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.effectiveDate = this.providerChangeForm.get('effectiveDate').value;
            memberEligHistory.pbpEffectiveDate = this.providerChangeForm.get('currentEffectiveDate').value;
            memberEligHistory.termDate = this.providerChangeForm.get('termDate').value;
            memberEligHistory.termReason = this.providerChangeForm.get('termReason').value;
            memberEligHistory.pcpChangeReason = this.providerChangeForm.get('pcpChngRsn').value;
            memberEligHistory.panelId = this.providerChangeForm.get('panel').value;
            memberEligHistory.ipaId = this.providerChangeForm.get('ipa').value;
            memberEligHistory.pecWaived = this.providerChangeForm.get('pcpId').value;
            memberEligHistory.siteCode = this.providerChangeForm.get('site').value;
            memberEligHistory.seqProv2Id = this.providerChangeForm.get('prov2').value;
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHisId, seqMembId).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editMemberEligHistory = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveMemberEligHistory() {
        if (this.editMemberEligHistory) {
            this.updateMemberEligHistory(this.memberEligHistory.seqEligHist, this.memberEligHistory.memberEligHistoryPrimaryKey.seqMembId)
        } else {
            this.createMemberEligHistory();
        }
    }

    deleteMemberEligHistory(seqMembId: number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqMembId).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberEligHistorys() {
        this.memberEligHistoryService.getMemberEligHistorys().subscribe(memberEligHistorys => {
            this.memberEligHistorys = memberEligHistorys;
        });
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerChangeForm = this.formBuilder.group({
            effectiveDate: ['', { updateOn: 'blur', validators: [] }],
            currentEffectiveDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            currentTermDate: ['', { updateOn: 'blur', validators: [] }],
            termReason: ['', { updateOn: 'blur', validators: [] }],
            pcpChngRsn: ['', { updateOn: 'blur', validators: [] }],
            panel: ['', { updateOn: 'blur', validators: [] }],
            currentPanel: ['', { updateOn: 'blur', validators: [] }],
            ipa: ['', { updateOn: 'blur', validators: [] }],
            currentIpa: ['', { updateOn: 'blur', validators: [] }],
            pcpId: ['', { updateOn: 'blur', validators: [] }],
            currentPcpId: ['', { updateOn: 'blur', validators: [] }],
            site: ['', { updateOn: 'blur', validators: [] }],
            currentSite: ['', { updateOn: 'blur', validators: [] }],
            prov2: ['', { updateOn: 'blur', validators: [] }],
            currentProv2: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    goToPageList() {
        this.router.navigate(['/page-list']);
    }

    submit() {
        console.log(this.providerChangeForm.value);

    }
}
