/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CiebAddressCode,
    CiebChangeReasonCode,
    CiebCountryCode,
    CiebRestrictedReasonCode,
    CiebStreetAddress,
    SecUser,
    SecWin
} from '../../../api-models'
import {
    CiebAddressCodeService,
    CiebChangeReasonCodeService,
    CiebCountryCodeService,
    CiebRestrictedReasonCodeService,
    CiebStreetAddressService,
    SecUserService
} from '../../../api-services';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the AddressPrimaryMailingComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'addressprimarymailing',
    templateUrl: './address-primary-mailing.component.html',

})
export class AddressPrimaryMailingComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    addressPrimaryMailingForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editCiebStreetAddress: boolean;
    ciebStreetAddress: CiebStreetAddress;
    ciebStreetAddresses: CiebStreetAddress[];
    changeReasons: CiebChangeReasonCode[];
    restrictedReasons: CiebRestrictedReasonCode[];
    countryCodes: CiebCountryCode[];
    states: CiebAddressCode[];
    changeReason: string;
    restrictedReason: string;
    countryCode: string;
    state: string;

    private windowId: string = 'CIEBPRO';
    private inProgress: boolean;
    private secColDetails: SecColDetail[];

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastr: ToastService,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private ciebStreetAddressService: CiebStreetAddressService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private ciebChangeReasonCodeService: CiebChangeReasonCodeService,
        private ciebRestrictedReasonCodeService: CiebRestrictedReasonCodeService,
        private ciebCountryCodeService: CiebCountryCodeService,
        private ciebAddressCodeService: CiebAddressCodeService,
        private router: Router,
    ) {
    }

    getChangeReasons() {
        this.ciebChangeReasonCodeService.getCiebChangeReasonCodes().subscribe(changeReasons => {
            this.changeReasons = changeReasons;
            if(changeReasons.length > 0) {
                this.changeReason = changeReasons[0].changeReasonCode;
            }
        });
    }

    getRestrictedReasons() {
        this.ciebRestrictedReasonCodeService.getCiebRestrictedReasonCodes().subscribe(restrictedReasons => {
            this.restrictedReasons = restrictedReasons;
            if(restrictedReasons.length > 0) {
                this.restrictedReason = restrictedReasons[0].restrictedCode;
            }
        });
    }

    getCountryCodes() {
        this.ciebCountryCodeService.getCiebCountryCodes().subscribe(countryCodes => {
            this.countryCodes = countryCodes;
            if(countryCodes.length > 0) {
                this.countryCode = countryCodes[0].countryCode + ' - ' + countryCodes[0].currencyCode;
            }
        });
    }

    getStateCodes() {
        this.ciebAddressCodeService.getCiebAddressCodes().subscribe(addressCodes => {
            this.states = addressCodes;
            if(this.states.length > 0) {
                this.state = addressCodes[0].addressCode;
            }
            console.log()
        });
    }

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
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }


    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }


    createCiebStreetAddress() {
        /*      if (this.hasInsertPermission()) {*/
        this.formValidation.validateForm();
        if (this.addressPrimaryMailingForm.valid) {
            let ciebStreetAddress = new CiebStreetAddress();
            ciebStreetAddress.seqEntityId = Form.getValue(this.addressPrimaryMailingForm, 'entityType');
            ciebStreetAddress.effDate = Form.getValue(this.addressPrimaryMailingForm, 'effectiveDates');
            ciebStreetAddress.termDate = Form.getValue(this.addressPrimaryMailingForm, 'termDate');
            ciebStreetAddress.careof = Form.getValue(this.addressPrimaryMailingForm, 'careOf');
            ciebStreetAddress.addrline1 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine1');
            ciebStreetAddress.changeReasonCode = Form.getValue(this.addressPrimaryMailingForm, 'changeReason');
            ciebStreetAddress.addrline2 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine2');
            ciebStreetAddress.restrictedInd = Form.getValue(this.addressPrimaryMailingForm, 'restrictedReason');
            ciebStreetAddress.addrline3 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine3');
            ciebStreetAddress.countryCode = Form.getValue(this.addressPrimaryMailingForm, 'country');
            ciebStreetAddress.postalCode = Form.getValue(this.addressPrimaryMailingForm, 'postalCode');
            ciebStreetAddress.city = Form.getValue(this.addressPrimaryMailingForm, 'city');
            ciebStreetAddress.state = Form.getValue(this.addressPrimaryMailingForm, 'state');
            ciebStreetAddress.district = Form.getValue(this.addressPrimaryMailingForm, 'distrct');
            ciebStreetAddress.province = Form.getValue(this.addressPrimaryMailingForm, 'province');
            ciebStreetAddress.visitingProvince = Form.getValue(this.addressPrimaryMailingForm, 'visitingProvince');
            this.ciebStreetAddressService.createCiebStreetAddress(ciebStreetAddress).subscribe(response => {
                this.toastr.showToast('Record successfully created.', NgbToastType.Success);
                this.editCiebStreetAddress = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        /*}*/
    }


    updateCiebStreetAddress(seqAddrId: number) {
        /*       if (this.secWin && this.secWin.hasUpdatePermission()) {*/
        this.formValidation.validateForm();
        if (this.addressPrimaryMailingForm.valid) {
            let ciebStreetAddress = new CiebStreetAddress();
            ciebStreetAddress.seqEntityId = Form.getValue(this.addressPrimaryMailingForm, 'entityType');
            ciebStreetAddress.effDate = Form.getValue(this.addressPrimaryMailingForm, 'effectiveDates');
            ciebStreetAddress.termDate = Form.getValue(this.addressPrimaryMailingForm, 'termDate');
            ciebStreetAddress.careof = Form.getValue(this.addressPrimaryMailingForm, 'careOf');
            ciebStreetAddress.addrline1 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine1');
            ciebStreetAddress.changeReasonCode = Form.getValue(this.addressPrimaryMailingForm, 'changeReason');
            ciebStreetAddress.addrline2 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine2');
            ciebStreetAddress.restrictedInd = Form.getValue(this.addressPrimaryMailingForm, 'restrictedReason');
            ciebStreetAddress.addrline3 = Form.getValue(this.addressPrimaryMailingForm, 'addressLine3');
            ciebStreetAddress.countryCode = Form.getValue(this.addressPrimaryMailingForm, 'country');
            ciebStreetAddress.postalCode = Form.getValue(this.addressPrimaryMailingForm, 'postalCode');
            ciebStreetAddress.city = Form.getValue(this.addressPrimaryMailingForm, 'city');
            ciebStreetAddress.state = Form.getValue(this.addressPrimaryMailingForm, 'state');
            ciebStreetAddress.district = Form.getValue(this.addressPrimaryMailingForm, 'distrct');
            ciebStreetAddress.province = Form.getValue(this.addressPrimaryMailingForm, 'province');
            ciebStreetAddress.visitingProvince = Form.getValue(this.addressPrimaryMailingForm, 'visitingProvince');
            this.ciebStreetAddressService.updateCiebStreetAddress(ciebStreetAddress, seqAddrId).subscribe(response => {
                this.toastr.showToast('Record successfully updated.', NgbToastType.Success);
                this.editCiebStreetAddress = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        /*    } else {
                this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
            }*/
    }

    saveCiebStreetAddress() {
        if (this.editCiebStreetAddress) {
            this.updateCiebStreetAddress(this.ciebStreetAddress.seqAddrId)
        } else {
            this.createCiebStreetAddress();
        }
    }

    deleteCiebStreetAddress(seqAddrId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.ciebStreetAddressService.deleteCiebStreetAddress(seqAddrId).subscribe(response => {
                this.toastr.showToast('Record successfully deleted.', NgbToastType.Success);
            });
        }
    }

    getCiebStreetAddress(seqAddrId: number) {
        this.ciebStreetAddressService.getCiebStreetAddress(seqAddrId).subscribe(ciebStreetAddress => {
            this.ciebStreetAddress = ciebStreetAddress;
            this.addressPrimaryMailingForm.patchValue({
                'entityType': this.ciebStreetAddress.seqEntityId,
                'effectiveDates': this.dateFormatPipe.defaultDisplayDateFormat(this.ciebStreetAddress.effDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.ciebStreetAddress.termDate),
                'careOf': this.ciebStreetAddress.careof,
                'addressLine1': this.ciebStreetAddress.addrline1,
                'changeReason': this.ciebStreetAddress.changeReasonCode,
                'addressLine2': this.ciebStreetAddress.addrline2,
                'restrictedReason': this.ciebStreetAddress.restrictedInd,
                'addressLine3': this.ciebStreetAddress.addrline3,
                'country': this.ciebStreetAddress.countryCode,
                'postalCode': this.ciebStreetAddress.postalCode,
                'city': this.ciebStreetAddress.city,
                'state': this.ciebStreetAddress.state,
                'distrct': this.ciebStreetAddress.district,
                'province': this.ciebStreetAddress.province,
                'visitingProvince': this.ciebStreetAddress.visitingProvince,
            });
        });
    }

    getCiebStreetAddresses() {
        this.ciebStreetAddressService.getCiebStreetAddresses().subscribe(ciebStreetAddresses => {
            this.ciebStreetAddresses = ciebStreetAddresses;
        });
    }

// Most initial setup should be done in the ngOnInit() life-cycle hook function
// rather than in the constructor for this class in order to ensure that the
// resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.getChangeReasons();
        this.getRestrictedReasons();
        this.getCountryCodes();
        this.getStateCodes();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addressPrimaryMailingForm);
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('CIEB_STREET_ADDRESS', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            }
        );
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }

        let userId = null;

        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.getSecWin(user.dfltTemplate);
        });
    }

// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.addressPrimaryMailingForm = this.formBuilder.group({
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            dynamicText003: ['', {updateOn: 'blur', validators: []}],
            dynamicText004: ['', {updateOn: 'blur', validators: []}],
            entityType: ['', {updateOn: 'blur', validators: []}],
            effectiveDates: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            careOf: ['', {updateOn: 'blur', validators: []}],
            addressLine1: ['', {updateOn: 'blur', validators: []}],
            changeReason: ['', {updateOn: 'blur', validators: []}],
            addressLine2: ['', {updateOn: 'blur', validators: []}],
            restrictedReason: ['', {updateOn: 'blur', validators: []}],
            addressLine3: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: [Validators.required]}],
            postalCode: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            distrct: ['', {updateOn: 'blur', validators: []}],
            province: ['', {updateOn: 'blur', validators: []}],
            visitingProvince: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId: string;
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
        this.formValidation = new FormValidation(this.addressPrimaryMailingForm);
    }

    resetForm() {
        this.addressPrimaryMailingForm.reset();
    }

    saveForm() {
        this.saveCiebStreetAddress();
    }

    closeForm() {
        if(this.addressPrimaryMailingForm.dirty) {
            this.showFormCloseConfirmation();
        } else {
            this.router.navigateByUrl('/');
        }
    }

    showFormCloseConfirmation() {
        let popUpMessage = new PopUpMessage(
            'Address Primary Mailing',
            'Address Primary Mailing',
            '6128: Data has been modified, press yes to save changes',
            'info',
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                this.saveForm();
            } else if (resp.name === 'No') {
                this.router.navigateByUrl('/');
            } // 3rd case: In case of cancel do nothing
        });
    }
}
