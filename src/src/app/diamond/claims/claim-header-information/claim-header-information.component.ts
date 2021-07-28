/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaimSubmittedDataHdr, SecUser, SecWin } from '../../../api-models/index';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { ClaimSubmittedDataHdrService, SecUserService } from '../../../api-services';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';

// Use the Component directive to define the MemberInformationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimheaderinformation',
    templateUrl: './claim-header-information.component.html',

})
export class ClaimHeaderInformationComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() seqClaimId: number;
    memberInformationForm: FormGroup;
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
    editClaimSubmittedDataHdr: boolean;
    claimSubmittedDataHdr: ClaimSubmittedDataHdr;
    claimSubmittedDataHdrs: ClaimSubmittedDataHdr[];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    userTemplateId: string;
    inProgress: boolean;
    secColDetails: any[];

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



    createClaimSubmittedDataHdr() {
        // if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.memberInformationForm.valid) {
                let claimSubmittedDataHdr = new ClaimSubmittedDataHdr();
                claimSubmittedDataHdr.seqClaimId = this.seqClaimId;
                claimSubmittedDataHdr.memDiamondId = Form.getValue(this.memberInformationForm, 'diamondId');
                claimSubmittedDataHdr.memSubscriberId = Form.getValue(this.memberInformationForm, 'memberId');
                claimSubmittedDataHdr.memOtherId = Form.getValue(this.memberInformationForm, 'otherIdNo');
                claimSubmittedDataHdr.memPersonNumber = Form.getValue(this.memberInformationForm, 'personNo');
                claimSubmittedDataHdr.memLastName = Form.getValue(this.memberInformationForm, 'lastName');
                claimSubmittedDataHdr.memFirstName = Form.getValue(this.memberInformationForm, 'firstName');
                claimSubmittedDataHdr.memMiddleName = Form.getValue(this.memberInformationForm, 'middleName');
                claimSubmittedDataHdr.memGender = Form.getValue(this.memberInformationForm, 'gender');
                claimSubmittedDataHdr.memDateOfBirth = Form.getDatePickerValue(this.memberInformationForm, 'dateOfBirth');
                claimSubmittedDataHdr.diagnosis1 = Form.getValue(this.memberInformationForm, 'dx1');
                claimSubmittedDataHdr.diagnosis2 = Form.getValue(this.memberInformationForm, 'dx2');
                claimSubmittedDataHdr.diagnosis3 = Form.getValue(this.memberInformationForm, 'dx3');
                claimSubmittedDataHdr.diagnosis4 = Form.getValue(this.memberInformationForm, 'dx4');
                claimSubmittedDataHdr.placeOfService = Form.getValue(this.memberInformationForm, 'plcOfService');
                this.claimSubmittedDataHdrService.createClaimSubmittedDataHdr(claimSubmittedDataHdr).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editClaimSubmittedDataHdr = true;
                }, error => {
                    this.alertMessage =
                        this.alertMessageService.error(
                            'An Error occurred while creating new record. Please check your entry.');
                });

            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
    }


    updateClaimSubmittedDataHdr(seqClaimId: number) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.memberInformationForm.valid) {
                let claimSubmittedDataHdr = new ClaimSubmittedDataHdr();
                claimSubmittedDataHdr.seqClaimId = this.seqClaimId;
                claimSubmittedDataHdr.memDiamondId = Form.getValue(this.memberInformationForm, 'diamondId');
                claimSubmittedDataHdr.memSubscriberId = Form.getValue(this.memberInformationForm, 'memberId');
                claimSubmittedDataHdr.memOtherId = Form.getValue(this.memberInformationForm, 'otherIdNo');
                claimSubmittedDataHdr.memPersonNumber = Form.getValue(this.memberInformationForm, 'personNo');
                claimSubmittedDataHdr.memLastName = Form.getValue(this.memberInformationForm, 'lastName');
                claimSubmittedDataHdr.memFirstName = Form.getValue(this.memberInformationForm, 'firstName');
                claimSubmittedDataHdr.memMiddleName = Form.getValue(this.memberInformationForm, 'middleName');
                claimSubmittedDataHdr.memGender = Form.getValue(this.memberInformationForm, 'gender');
                claimSubmittedDataHdr.memDateOfBirth = Form.getDatePickerValue(this.memberInformationForm, 'dateOfBirth');
                claimSubmittedDataHdr.diagnosis1 = Form.getValue(this.memberInformationForm, 'dx1');
                claimSubmittedDataHdr.diagnosis2 = Form.getValue(this.memberInformationForm, 'dx2');
                claimSubmittedDataHdr.diagnosis3 = Form.getValue(this.memberInformationForm, 'dx3');
                claimSubmittedDataHdr.diagnosis4 = Form.getValue(this.memberInformationForm, 'dx4');
                claimSubmittedDataHdr.placeOfService = Form.getValue(this.memberInformationForm, 'plcOfService');
                this.claimSubmittedDataHdrService.updateClaimSubmittedDataHdr(claimSubmittedDataHdr, seqClaimId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editClaimSubmittedDataHdr = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        // } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
    } saveClaimSubmittedDataHdr() {
        if (this.editClaimSubmittedDataHdr) {
            this.updateClaimSubmittedDataHdr(this.claimSubmittedDataHdr.seqClaimId)
        } else {
            this.createClaimSubmittedDataHdr();
        }
    } deleteClaimSubmittedDataHdr(seqClaimId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.claimSubmittedDataHdrService.deleteClaimSubmittedDataHdr(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    } getClaimSubmittedDataHdr(seqClaimId: number) {
        this.claimSubmittedDataHdrService.getClaimSubmittedDataHdr(seqClaimId).subscribe(claimSubmittedDataHdr => {
            this.claimSubmittedDataHdr = claimSubmittedDataHdr;
            this.memberInformationForm.patchValue({
                'diamondId': this.claimSubmittedDataHdr.memDiamondId,
                'memberId': this.claimSubmittedDataHdr.memSubscriberId,
                'personNo': this.claimSubmittedDataHdr.memPersonNumber,
                'lastName': this.claimSubmittedDataHdr.memLastName,
                'firstName': this.claimSubmittedDataHdr.memFirstName,
                'middleName': this.claimSubmittedDataHdr.memMiddleName,
                'gender': this.claimSubmittedDataHdr.memGender,
                'dateOfBirth': this.dateFormatPipe.defaultDisplayDateFormat(this.claimSubmittedDataHdr.memDateOfBirth),
                'dx1': this.claimSubmittedDataHdr.diagnosis1,
                'dx2': this.claimSubmittedDataHdr.diagnosis2,
                'dx3': this.claimSubmittedDataHdr.diagnosis3,
                'dx4': this.claimSubmittedDataHdr.diagnosis4,
                'otherIdNo': this.claimSubmittedDataHdr.memOtherId,
                'plcOfService': this.claimSubmittedDataHdr.placeOfService

            });
        }, error => {
            this.editClaimSubmittedDataHdr = false;
            // this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    } getClaimSubmittedDataHdrs() {
        this.claimSubmittedDataHdrService.getClaimSubmittedDataHdrs().subscribe(claimSubmittedDataHdrs => {
            this.claimSubmittedDataHdrs = claimSubmittedDataHdrs;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
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
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private claimSubmittedDataHdrService: ClaimSubmittedDataHdrService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
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

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    /**
    * Get Security Column Details
    */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }


    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
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
        this.formValidation = new FormValidation(this.memberInformationForm);
        if (this.seqClaimId) {
            this.editClaimSubmittedDataHdr = true;
            this.getClaimSubmittedDataHdr(this.seqClaimId);
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberInformationForm = this.formBuilder.group({
            diamondId: ['', { updateOn: 'blur', validators: [] }],
            memberId: ['', { updateOn: 'blur', validators: [] }],
            personNo: ['', { updateOn: 'blur', validators: [] }],
            lastName: ['', { updateOn: 'blur', validators: [] }],
            firstName: ['', { updateOn: 'blur', validators: [] }],
            middleName: ['', { updateOn: 'blur', validators: [] }],
            gender: ['', { updateOn: 'blur', validators: [] }],
            dateOfBirth: ['', { updateOn: 'blur', validators: [] }],
            dx1: ['', { updateOn: 'blur', validators: [] }],
            dx3: ['', { updateOn: 'blur', validators: [] }],
            dx2: ['', { updateOn: 'blur', validators: [] }],
            dx4: ['', { updateOn: 'blur', validators: [] }],
            otherIdNo: ['', { updateOn: 'blur', validators: [] }],
            plcOfService:  ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
