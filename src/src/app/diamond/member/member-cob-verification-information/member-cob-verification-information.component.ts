/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

import { AlertMessage } from '../../../shared/components/alert-message'
import { DatePickerConfig } from '../../../shared/config';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { getMemCOBVerifInfoShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { MemberCOBVerificationInformation } from '../../../api-models/member-cob-verification-information.model';
import { Form } from '../../../shared/helpers/form.helper';
import { MemberMasterService } from '../../../api-services/member-master.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecUserService} from "../../../api-services";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecUser} from "../../../api-models";
import {SecWin} from "../../../api-models/security/sec-win.model";

// Use the Component directive to define the MemberCobVerificationInformationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'membercobverificationinformation',
    templateUrl: './member-cob-verification-information.component.html',
    styleUrls: ['./member-cob-verification-information.component.scss'],
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]
})
export class MemberCobVerificationInformationComponent implements OnInit, AfterViewInit {
    @Input() seqMembId: number;

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public memberCobVerificationInformationForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;

    public shortcuts: ShortcutInput[] = [];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Output() onSubmit = new EventEmitter<boolean>();
    @Input() SubID?: string;

    secWin: SecWinViewModel;
    windowId = 'MEMBR';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private memberMasterService: MemberMasterService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState () {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberCobVerificationInformationForm);
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
            this.userTemplateId = user.dfltTemplate
            this.getSecWin(user.dfltTemplate);
        });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Member Cob Verification Information',
                        'Member Cob Verification Information Permission'
                    );
                }
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    ngAfterViewInit(): void {
        this.shortcuts.push(...getMemCOBVerifInfoShortcutKeys(this));
        this.cdr.detectChanges();
    }


    private popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    public popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    public cancel(): void {
        this.onSubmit.next(true);
    }
    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberCobVerificationInformationForm = this.formBuilder.group({
            verificationDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            followupDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            status: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)] }],
            userDefined1: ['', { updateOn: 'blur', validators: [Validators.required] }],
            userDate1: ['', { updateOn: 'blur', validators: [Validators.required] }],
            userDefined2: ['', { updateOn: 'blur', validators: [Validators.required] }],
            userDate2: ['', { updateOn: 'blur', validators: [Validators.required] }]
        }, { updateOn: 'submit' });
    }

    private resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    public submitForm() {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {

            if (this.seqMembId == null) {
                let popMsg = new PopUpMessage('memberNotExistPopup', 'Member Cob Verification Information', '14044: Member Sequence Id not found. Please create/save the Member master data First', 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                    this.popUpMessage = null;
                });
                return;
            }
            this.formValidation.validateForm();
            if (this.memberCobVerificationInformationForm.valid) {
                let verificationInfo = new MemberCOBVerificationInformation();
                verificationInfo.seqMembId = this.seqMembId;
                verificationInfo.verifOthCoverDate = Form.getValue(this.memberCobVerificationInformationForm, 'verificationDate').singleDate.formatted;
                verificationInfo.verifFollowUpDate = Form.getValue(this.memberCobVerificationInformationForm, 'followupDate').singleDate.formatted;
                verificationInfo.depVerifStatus = Form.getValue(this.memberCobVerificationInformationForm, 'status');
                verificationInfo.depVerifUserDefined1 = Form.getValue(this.memberCobVerificationInformationForm, 'userDefined1');
                verificationInfo.depVerifUserDate1 = Form.getValue(this.memberCobVerificationInformationForm, 'userDate1').singleDate.formatted;
                verificationInfo.depVerifUserDefined2 = Form.getValue(this.memberCobVerificationInformationForm, 'userDefined2');
                verificationInfo.depVerifUserDate2 = Form.getValue(this.memberCobVerificationInformationForm, 'userDate2').singleDate.formatted;

                this.memberMasterService.updateMemberCOBVerificationInfo(verificationInfo).subscribe(response => {
                    this.toastService.showToast('Form data saved', NgbToastType.Success);
                    this.onSubmit.next(true);
                });

            } else {
                this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
            }
        }
    }
}
