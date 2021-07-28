/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import {MemberMaster, SecUser} from '../../../api-models';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {DatePickerConfig} from '../../../shared/config';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecUserService} from "../../../api-services";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";

// Use the Component directive to define the DependentVerificationStatusComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'dependentverificationstatus',
    templateUrl: './dependent-verification-status.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        MemberMasterService
    ]
})
export class DependentVerificationStatusComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    dependentVerificationStatusForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];
    memberMasterId: any = 24;
    datePickerConfig = DatePickerConfig;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    secWin: SecWinViewModel;
    windowId = 'MEMBR';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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

    createMemberMaster() {
        if (this.securityService.checkInsertUpdatePermissions(false, this.secWin)) {

            this.formValidation.validateForm();
            if (this.dependentVerificationStatusForm.valid) {
                let memberMaster = this.memberMaster;
                memberMaster.depVerifStatus = this.dependentVerificationStatusForm.get('dependentStatus').value;
                memberMaster.studentStatusDetail = this.dependentVerificationStatusForm.get('studentStatusDetailCode').value;
                memberMaster.verfiedThruDate = this.dependentVerificationStatusForm.get('verifiedThruDate').value;
                memberMaster.userDefined1 = this.dependentVerificationStatusForm.get('usrDef1').value;
                memberMaster.userDate1 = this.dependentVerificationStatusForm.get('usrDat1').value;
                memberMaster.userDefined2 = this.dependentVerificationStatusForm.get('usrDef2').value;
                memberMaster.userDate2 = this.dependentVerificationStatusForm.get('usrDat2').value;
                this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                    this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                    this.editMemberMaster = false;
                });

            } else {
                this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
            }
        }
    }

    updateMemberMaster(seqMembId : number) {
        this.formValidation.validateForm();
        if (this.dependentVerificationStatusForm.valid) {
            let memberMaster = this.memberMaster;
            memberMaster.depVerifStatus = this.dependentVerificationStatusForm.get('dependentStatus').value;
            memberMaster.studentStatusDetail = this.dependentVerificationStatusForm.get('studentStatusDetailCode').value;
            memberMaster.verfiedThruDate = Form.getDatePickerValue(this.dependentVerificationStatusForm,'verifiedThruDate');
            memberMaster.userDefined1 = this.dependentVerificationStatusForm.get('usrDef1').value;
            memberMaster.userDate1 = Form.getDatePickerValue(this.dependentVerificationStatusForm, 'usrDat1');
            memberMaster.userDefined2 = this.dependentVerificationStatusForm.get('usrDef2').value;
            memberMaster.userDate2 = Form.getDatePickerValue(this.dependentVerificationStatusForm, 'usrDat2');
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(response => {
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.editMemberMaster = false;
            });
         } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
         }
    }

    saveMemberMaster() {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            this.updateMemberMaster(this.memberMaster.seqMembId);
        }
    }

    deleteMemberMaster(seqMembId : number) {
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
        });
    }

    getMemberMaster(seqMembId : number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.dependentVerificationStatusForm.patchValue({
                'dependentStatus': this.memberMaster.depVerifStatus,
                'studentStatusDetailCode': this.memberMaster.studentStatusDetail,
                'verifiedThruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberMaster.verfiedThruDate),
                'usrDef1': this.memberMaster.userDefined1,
                'usrDat1': this.dateFormatPipe.defaultDisplayDateFormat(this.memberMaster.userDate1),
                'usrDef2': this.memberMaster.userDefined2,
                'usrDat2': this.dateFormatPipe.defaultDisplayDateFormat(this.memberMaster.userDate2),
            });
        });
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
        this.memberMasters = memberMasters;
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private router: Router,
        public activeModal: NgbActiveModal,
        private memberMasterService: MemberMasterService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private modalService: NgbModal) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState () {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.dependentVerificationStatusForm);
        this.getMemberMaster(this.memberMasterId);
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
                        'You are not Permitted to view Dependent Verification Status',
                        'Dependent Verification Status Permission'
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

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.dependentVerificationStatusForm = this.formBuilder.group({
            dependentStatus: ['', {validators: [Validators.compose([Validators.maxLength(1)])] }],
            studentStatusDetailCode: ['', {validators: [Validators.compose([Validators.maxLength(1)])] }],
            verifiedThruDate: ['', {validators: [] }],
            usrDef1: ['', {validators: [Validators.compose([Validators.maxLength(30)])] }],
            usrDat1: ['', {validators: [] }],
            usrDef2: ['', {validators: [Validators.compose([Validators.maxLength(30)])] }],
            usrDat2: ['', {validators: [] }]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    goToListPage() {
        this.router.navigate(['page-list']);
    }
}
