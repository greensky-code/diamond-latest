/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { CiebAddressCommentHistory, CiebAddressOtherInfo, CiebCurrencyCode, SecUser, SecWin } from '../../../api-models';
import { CiebAddressOtherInfoService, CiebCurrencyCodeService, CiebEntityMasterService, SecUserService } from '../../../api-services';
import { CiebAddonMeConfigService } from '../../../api-services/addon/cieb-addon-me-config.service';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { Form } from '../../../shared/helpers/form.helper';
import { DatePipe } from '@angular/common';

// Use the Component directive to define the AddressOtherInfoComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'addressotherinfo',
    templateUrl: './address-other-info.component.html',

})
export class AddressOtherInfoComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    addressOtherInfoForm: FormGroup;
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
    govtIdList: any = [];
    salaryTypes: any = [];
    userTemplateId: string;
    locationCodes: any = [];
    visaTypes: any = [];
    currencies: CiebCurrencyCode[];
    salaryBands: any = [];
    ciebAddressOtherInfo: CiebAddressOtherInfo;
    viewHistoryModalRef: NgbModalRef;
    @ViewChild('viewHistoryTemplate') private viewHistoryTemplate: ElementRef;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @Input() seqEntityId: number;
    complianceFlags = [
        {
            key: 'N/A',
            value: 'Not Applicable'
        },
        {
            key: 'Y',
            value: 'Yes'
        },
        {
            key: 'N',
            value: 'No'
        }
    ];
    comments: CiebAddressCommentHistory[];
    @Input() seqMembId: number;

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
        private ciebAddonMeConfigService: CiebAddonMeConfigService,
        private ciebCurrencyCodeService: CiebCurrencyCodeService,
        private ciebAddressOtherInfoService: CiebAddressOtherInfoService,
        private toastService: ToastService,
        private datePipe: DatePipe,
        private entityMasterService: CiebEntityMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        // this.initializePermission();
        this.initializeComponentState();
        // this.createForm();
        // this.displayMessage = {};
        // this.formValidation = new FormValidation(this.addressOtherInfoForm);
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
            // this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            // this.getSecWin(user.dfltTemplate);
        });
    }
    getSecWin(dfltTemplate: string) {
        throw new Error('Method not implemented.');
    }
    getSecColDetails(user: SecUser) {
        throw new Error('Method not implemented.');
    }

    private initializePermission(): void {
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
        this.formValidation = new FormValidation(this.addressOtherInfoForm);
        this.getFormDropDowns();
        this.getSeqEntityId();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.addressOtherInfoForm = this.formBuilder.group({
            passportNumber: ['', { updateOn: 'blur', validators: [] }],
            passportExpirationDate: ['', { updateOn: 'blur', validators: [] }],
            passportPlaceOfIssuance: ['', { updateOn: 'blur', validators: [] }],
            governmentIdType: ['', { updateOn: 'blur', validators: [] }],
            uaeVisaStartDate: ['', { updateOn: 'blur', validators: [] }],
            govidNumber: ['', { updateOn: 'blur', validators: [] }],
            govIdExpirationDate: ['', { updateOn: 'blur', validators: [] }],
            govidPlaceOfIssunace: ['', { updateOn: 'blur', validators: [] }],
            ksaLocalSponserIdNumber: ['', { updateOn: 'blur', validators: [] }],
            sponserIdType: ['', { updateOn: 'blur', validators: [] }],
            unifiedIdentityNumberUid: ['', { updateOn: 'blur', validators: [] }],
            nationality: ['', { updateOn: 'blur', validators: [] }],
            ksaProfessionCode: ['', { updateOn: 'blur', validators: [] }],
            dubaiSalaryType: ['', { updateOn: 'blur', validators: [] }],
            dubaiResidencyLocationCode: ['', { updateOn: 'blur', validators: [] }],
            dubaiSalaryBand: ['', { updateOn: 'blur', validators: [] }],
            dubaiWorkLocationCode: ['', { updateOn: 'blur', validators: [] }],
            visaType: ['', { updateOn: 'blur', validators: [] }],
            localMobileTelephoneNumber: ['', { updateOn: 'blur', validators: [] }],
            localHomeTelephoneNumber: ['', { updateOn: 'blur', validators: [] }],
            previouseResidencePermit: ['', { updateOn: 'blur', validators: [] }],
            newbornWithoutEntryVisa: ['', { updateOn: 'blur', validators: [] }],
            birthCertificateSubmitted: ['', { updateOn: 'blur', validators: [] }],
            visaSubmitted: ['', { updateOn: 'blur', validators: [] }],
            passportSubmitted: ['', { updateOn: 'blur', validators: [] }],
            emiratesIdCardSubmitted: ['', { updateOn: 'blur', validators: [] }],
            emirateIdApplicationSubmitt: ['', { updateOn: 'blur', validators: [] }],
            entryPermitOrEmploymentVis: ['', { updateOn: 'blur', validators: [] }],
            certificateOfContinuitySubm: ['', { updateOn: 'blur', validators: [] }],
            memberPhotoSubmitted: ['', { updateOn: 'blur', validators: [] }],
            prefferredCustomerCurrency: ['', { updateOn: 'blur', validators: [] }],
            operationLocation: ['', { updateOn: 'blur', validators: [] }],
            accountNumber: ['', { updateOn: 'blur', validators: [] }],
            dentalWaitPeriodInMonths: ['', { updateOn: 'blur', validators: [] }],
            ltdTexableIncome: ['', { updateOn: 'blur', validators: [] }],
            visionWaitPeriodInMonths: ['', { updateOn: 'blur', validators: [] }],
            referanceNumber: ['', { updateOn: 'blur', validators: [] }],
            comments: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getFormDropDowns() {
        this.ciebAddonMeConfigService.findOptionsByCodeType('GOVT-ID').subscribe((data: Object[]) => {
            this.govtIdList = data
        });

        this.ciebAddonMeConfigService.findOptionsByCodeTypeAndCode('DXB', 'SAL_TYPE').subscribe((data: Object[]) => {
            this.salaryTypes = data
        });

        this.ciebAddonMeConfigService.findOptionsByCodeTypeAndCode('DXB', 'SAL_BAND').subscribe((data: Object[]) => {
            this.salaryBands = data
        });

        this.ciebAddonMeConfigService.findOptionsByCodeTypeAndCode('DXB', 'LOC_CODE').subscribe((data: Object[]) => {
            this.locationCodes = data
        });

        this.ciebAddonMeConfigService.findOptionsByCodeType('VISA_TYPE').subscribe((data: Object[]) => {
            this.visaTypes = data
        });
        this.ciebCurrencyCodeService.getCiebCurrencyCodes().subscribe((data: CiebCurrencyCode[]) => {
            this.currencies = data
        });
    }

    getAddressOtherInfo() {
        this.ciebAddressOtherInfoService.getCiebAddressOtherInfo(this.seqEntityId).subscribe(response => {
            this.ciebAddressOtherInfo = response;
            // patch all the values
            this.addressOtherInfoForm.patchValue({
                passportNumber: this.ciebAddressOtherInfo.passportNo,
                passportExpirationDate: this.dateFormatPipe.defaultDisplayDateFormat(this.ciebAddressOtherInfo.passportExpireDate),
                passportPlaceOfIssuance: this.ciebAddressOtherInfo.passportIssuedLocation,
                governmentIdType: this.ciebAddressOtherInfo.governmentIDType,
                uaeVisaStartDate: this.dateFormatPipe.defaultDisplayDateFormat(this.ciebAddressOtherInfo.uaeVisaStartDate),
                govidNumber: this.ciebAddressOtherInfo.governmentID,
                govIdExpirationDate: this.dateFormatPipe.defaultDisplayDateFormat(this.ciebAddressOtherInfo.governmentIDExpireDate),
                govidPlaceOfIssunace: this.ciebAddressOtherInfo.governmentIDIssuedPlace,
                ksaLocalSponserIdNumber: this.ciebAddressOtherInfo.sponsorID,
                sponserIdType: this.ciebAddressOtherInfo.sponsorIDType,
                unifiedIdentityNumberUid: this.ciebAddressOtherInfo.userDefined2,
                nationality: this.ciebAddressOtherInfo.nationality,
                ksaProfessionCode: this.ciebAddressOtherInfo.profession,
                dubaiSalaryType: this.ciebAddressOtherInfo.userDefined6,
                dubaiResidencyLocationCode: this.ciebAddressOtherInfo.userDefined4,
                dubaiSalaryBand: this.ciebAddressOtherInfo.userDefined5,
                dubaiWorkLocationCode: this.ciebAddressOtherInfo.dubaiWorkLocation,
                visaType: this.ciebAddressOtherInfo.userDefined10,
                localMobileTelephoneNumber: this.ciebAddressOtherInfo.userDefined20,
                localHomeTelephoneNumber: this.ciebAddressOtherInfo.userDefined21,
                previouseResidencePermit: this.ciebAddressOtherInfo.userDefined11,
                newbornWithoutEntryVisa: this.ciebAddressOtherInfo.userDefined12,
                birthCertificateSubmitted: this.ciebAddressOtherInfo.userDefined19,
                visaSubmitted: this.ciebAddressOtherInfo.userDefined13,
                passportSubmitted: this.ciebAddressOtherInfo.userDefined14,
                emiratesIdCardSubmitted: this.ciebAddressOtherInfo.userDefined15,
                emirateIdApplicationSubmitt: this.ciebAddressOtherInfo.userDefined16,
                entryPermitOrEmploymentVis: this.ciebAddressOtherInfo.userDefined17,
                certificateOfContinuitySubm: this.ciebAddressOtherInfo.userDefined18,
                memberPhotoSubmitted: this.ciebAddressOtherInfo.userDefined22,
                prefferredCustomerCurrency: this.ciebAddressOtherInfo.preferredCurrency,
                operationLocation: this.ciebAddressOtherInfo.userDefined1,
                accountNumber: this.ciebAddressOtherInfo.userDefined7,
                dentalWaitPeriodInMonths: this.ciebAddressOtherInfo.userDefined8,
                ltdTexableIncome: this.ciebAddressOtherInfo.userDefined23,
                visionWaitPeriodInMonths: this.ciebAddressOtherInfo.userDefined9,
                referanceNumber: this.ciebAddressOtherInfo.userDefined24,
                comments: this.ciebAddressOtherInfo.comments
            });
        });
    }

    saveAddressOtherInfo() {
        this.mapFormValues();
        this.ciebAddressOtherInfoService.createUpdateCiebAddressOtherInfo(this.ciebAddressOtherInfo).subscribe(res => {
            this.toastService.showToast('Record updated successfully.', NgbToastType.Success);
        });
    }


    onViewHistoryClick() {
        this.viewHistoryModalRef = this.modalService.open(
            this.viewHistoryTemplate
        );
    }

    private mapFormValues() {
        this.ciebAddressOtherInfo.passportNo = this.addressOtherInfoForm.get('passportNumber').value;
        this.ciebAddressOtherInfo.passportExpireDate = this.datePipe.transform(Form.getDatePickerValue(this.addressOtherInfoForm, 'passportExpirationDate'), 'MM/dd/yyyy');
        this.ciebAddressOtherInfo.passportIssuedLocation = this.addressOtherInfoForm.get('passportPlaceOfIssuance').value;
        this.ciebAddressOtherInfo.governmentIDType = this.addressOtherInfoForm.get('governmentIdType').value;
        this.ciebAddressOtherInfo.uaeVisaStartDate = this.datePipe.transform(Form.getDatePickerValue(this.addressOtherInfoForm, 'uaeVisaStartDate'), 'MM/dd/yyyy');
        this.ciebAddressOtherInfo.governmentID = this.addressOtherInfoForm.get('govidNumber').value;
        this.ciebAddressOtherInfo.governmentIDExpireDate = this.datePipe.transform(Form.getDatePickerValue(this.addressOtherInfoForm, 'govIdExpirationDate'), 'MM/dd/yyyy');
        this.ciebAddressOtherInfo.governmentIDIssuedPlace = this.addressOtherInfoForm.get('govidPlaceOfIssunace').value;
        this.ciebAddressOtherInfo.sponsorID = this.addressOtherInfoForm.get('ksaLocalSponserIdNumber').value;
        this.ciebAddressOtherInfo.sponsorIDType = this.addressOtherInfoForm.get('sponserIdType').value;
        this.ciebAddressOtherInfo.userDefined2 = this.addressOtherInfoForm.get('unifiedIdentityNumberUid').value;
        this.ciebAddressOtherInfo.nationality = this.addressOtherInfoForm.get('nationality').value;
        this.ciebAddressOtherInfo.profession = this.addressOtherInfoForm.get('ksaProfessionCode').value;
        this.ciebAddressOtherInfo.userDefined6 = this.addressOtherInfoForm.get('dubaiSalaryType').value;
        this.ciebAddressOtherInfo.userDefined4 = this.addressOtherInfoForm.get('dubaiResidencyLocationCode').value;
        this.ciebAddressOtherInfo.userDefined5 = this.addressOtherInfoForm.get('dubaiSalaryBand').value;
        this.ciebAddressOtherInfo.dubaiWorkLocation = this.addressOtherInfoForm.get('dubaiWorkLocationCode').value;
        this.ciebAddressOtherInfo.userDefined10 = this.addressOtherInfoForm.get('visaType').value;
        this.ciebAddressOtherInfo.userDefined20 = this.addressOtherInfoForm.get('localMobileTelephoneNumber').value;
        this.ciebAddressOtherInfo.userDefined21 = this.addressOtherInfoForm.get('localHomeTelephoneNumber').value;
        this.ciebAddressOtherInfo.userDefined11 = this.addressOtherInfoForm.get('previouseResidencePermit').value;
        this.ciebAddressOtherInfo.userDefined12 = this.addressOtherInfoForm.get('newbornWithoutEntryVisa').value;
        this.ciebAddressOtherInfo.userDefined19 = this.addressOtherInfoForm.get('birthCertificateSubmitted').value;
        this.ciebAddressOtherInfo.userDefined13 = this.addressOtherInfoForm.get('visaSubmitted').value;
        this.ciebAddressOtherInfo.userDefined14 = this.addressOtherInfoForm.get('passportSubmitted').value;
        this.ciebAddressOtherInfo.userDefined15 = this.addressOtherInfoForm.get('emiratesIdCardSubmitted').value;
        this.ciebAddressOtherInfo.userDefined16 = this.addressOtherInfoForm.get('emirateIdApplicationSubmitt').value;
        this.ciebAddressOtherInfo.userDefined17 = this.addressOtherInfoForm.get('entryPermitOrEmploymentVis').value;
        this.ciebAddressOtherInfo.userDefined18 = this.addressOtherInfoForm.get('certificateOfContinuitySubm').value;
        this.ciebAddressOtherInfo.userDefined22 = this.addressOtherInfoForm.get('memberPhotoSubmitted').value;
        this.ciebAddressOtherInfo.preferredCurrency = this.addressOtherInfoForm.get('prefferredCustomerCurrency').value;
        this.ciebAddressOtherInfo.userDefined1 = this.addressOtherInfoForm.get('operationLocation').value;
        this.ciebAddressOtherInfo.userDefined7 = this.addressOtherInfoForm.get('accountNumber').value;
        this.ciebAddressOtherInfo.userDefined8 = this.addressOtherInfoForm.get('dentalWaitPeriodInMonths').value;
        this.ciebAddressOtherInfo.userDefined23 = this.addressOtherInfoForm.get('ltdTexableIncome').value;
        this.ciebAddressOtherInfo.userDefined9 = this.addressOtherInfoForm.get('visionWaitPeriodInMonths').value;
        this.ciebAddressOtherInfo.userDefined24 = this.addressOtherInfoForm.get('referanceNumber').value;
        this.ciebAddressOtherInfo.comments = this.addressOtherInfoForm.get('comments').value;
        this.ciebAddressOtherInfo.seqEntityID = this.seqEntityId.toString();

        let userId = null;
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.ciebAddressOtherInfo.userName = userId;
    }

    getCiebAddressCommentHistory() {
        this.ciebAddressOtherInfoService.getCiebAddressCommentHistory(this.seqEntityId).subscribe(res => {
            this.comments = res;
        });
    }

    getSeqEntityId() {
        this.entityMasterService
            .getCiebEntityMasterBySeqMembID(this.seqMembId).subscribe(
                (data) => {
                    this.seqEntityId = data.seqEntityId;
                    this.getAddressOtherInfo();
                    this.getCiebAddressCommentHistory();

                });
    }

}
