/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {MemberMaster, SecUser} from "../../../api-models"
import { MemberMasterService } from "../../../api-services/member-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { Form } from '../../../shared/helpers/form.helper';
import { DatePickerConfig } from '../../../shared/config';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecUserService} from "../../../api-services";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
// Use the Component directive to define the MemberClaimHoldCodesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'memberclaimholdcodes',
    templateUrl: './member-claim-hold-codes.component.html',
    encapsulation: ViewEncapsulation.None

})
export class MemberClaimHoldCodesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() seqMembId = 24;

    memberClaimHoldCodesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    public datePickerConfig = DatePickerConfig;
    @Input() showIcon: boolean = false;

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
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        private memberMasterService: MemberMasterService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,) {
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
        this.formValidation = new FormValidation(this.memberClaimHoldCodesForm);
        this.getMemberMaster(this.seqMembId);
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view MEMBER Claim Hold Codes', 'Member Claim Hold Codes')
            }
        });
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Claim Hold Codes',
                        'Member Claim Hold Codes Permission'
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

    editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];

    createMemberMaster() {
        this.formValidation.validateForm();
        if (this.memberClaimHoldCodesForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.holdReason = this.memberClaimHoldCodesForm.get('claimHoldCode').value;
            memberMaster.holdDate = this.memberClaimHoldCodesForm.get('claimHoldDate').value;
            this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                this.toastService.showToast('Record successfully added.', NgbToastType.Success)
                this.editMemberMaster = false;
            });

        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)

        }
    }


    updateMemberMaster() {
        if (this.securityService.checkInsertUpdatePermissions(this.editMemberMaster, this.secWin)) {
            this.formValidation.validateForm();
            if (this.memberClaimHoldCodesForm.valid) {
                let memberMaster = this.memberMaster;
                memberMaster.holdReason = this.memberClaimHoldCodesForm.get('claimHoldCode').value;
                memberMaster.holdDate = Form.getDatePickerValue(this.memberClaimHoldCodesForm, 'claimHoldDate');
                this.memberMasterService.updateMemberMaster(memberMaster, this.memberMaster.seqMembId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated.', NgbToastType.Success)

                    this.editMemberMaster = false;
                });
            } else {
                this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
            }
        }
    }

    saveMemberMaster() {
        if (this.securityService.checkInsertUpdatePermissions(this.editMemberMaster, this.secWin)) {
            if (this.editMemberMaster) {
                // this.updateMemberMaster(this.memberMaster.seqMembId)
            } else {
                this.createMemberMaster();
            }
        }
    }

    deleteMemberMaster(seqMembId: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.memberClaimHoldCodesForm.patchValue({
                'claimHoldCode': this.memberMaster.holdReason,
                'claimHoldDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberMaster.holdDate),
            });
        });
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
            this.memberMasters = memberMasters;
        });
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberClaimHoldCodesForm = this.formBuilder.group({
            claimHoldCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
            claimHoldDate: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    Submit() {

    }

}
