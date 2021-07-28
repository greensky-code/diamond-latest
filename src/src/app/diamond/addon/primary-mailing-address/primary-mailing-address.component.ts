import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {
    CiebAddressCode,
    CiebChangeReasonCode,
    CiebCountryCode,
    CiebEntityCode,
    CiebRestrictedReasonCode,
    CiebStreetAddress,
    GroupMaster, SecUser, SecWin
} from '../../../api-models';
import {CiebWebCodeDecode} from '../../../api-models/addon/cieb-web-code-decode.model';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {
    CiebAddressCodeService,
    CiebChangeReasonCodeService,
    CiebCountryCodeService,
    CiebRestrictedReasonCodeService,
    CiebStreetAddressService,
    GroupMasterService,
    SecUserService
} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {CiebEntityAddressXrefService} from '../../../api-services/addon/cieb-entity-address-xref.service';
import {CiebWebCodeDecodeService} from '../../../api-services/addon/cieb-web-code-decode.service';
import {CiebAddonMeConfigService} from '../../../api-services/addon/cieb-addon-me-config.service';
import {DatePipe} from '@angular/common';
import {CiebEntityCodeService} from '../../../api-services/addon/cieb-entity-code.service';
import {ToastService} from '../../../shared/services/toast.service';
import {forkJoin} from 'rxjs';
import {CiebAddonMeConfig} from '../../../api-models/addon/cieb-addon-me-config';
import {MEM_MODULE_ID} from '../../../shared/app-constants';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbToastType} from 'ngb-toast';
import {RequiredValidator} from '../../../shared/validators/required.validator';
import { CiebStateCodeService } from '../../../api-services/addon/cieb-state-code.service';
import { CiebStateCode } from '../../../api-models/addon/cieb-state-code.model';

@Component({
    selector: 'primary-mailing-address',
    templateUrl: './primary-mailing-address.component.html',
    providers: [DatePipe]
})
export class PrimayMailingAddressComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() groupNumber = '00008A001';
    @Input() seqGroupId: number;
    @Input() subscriberName = 'ARE';
    // @Input() seqAddressId = 55896; // todo need to make it dynamice
    @Input() addressCode: string

    @Input() groupName: string;
    @Input() entityType = 'Subscriber';
    @Input() seqEntityId: number;
    @Input() subscriberId: number;
    @Input() seqMembId: number;
    @Input() seqSubsId: number;

    @Input() seqAddressId: number;   // default value for testing
    @Input() activeTab = 1;

    seqVendAddr = 1614;
    seqProvAddr = 1001;

    cignalinksPrimaryMailingAddressForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'APADPM';
    public isSuperUser = false;
    public secProgress = true;
    states: CiebStateCode[];
    countryCodes: CiebCountryCode[];
    ciebAddonMeConfigs: CiebAddonMeConfig[];
    ciebStreetAddress: CiebStreetAddress;
    groupMasters: GroupMaster[];
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    isEditFormState = false;
    countryCode: string;
    state: string;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    ciebChangeReasonCodes: CiebChangeReasonCode[] = [];
    ciebEntityCodes: CiebEntityCode[] = [];
    ciebRestrictedReasonCodes: CiebRestrictedReasonCode[] = [];
    countryDropdownValues: CiebWebCodeDecode[] = [];

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private ciebStreetAddressService: CiebStreetAddressService,
        private ciebEntityAddressXrefService: CiebEntityAddressXrefService,
        private ciebWebCodeDecodeService: CiebWebCodeDecodeService,
        private groupMasterService: GroupMasterService,
        private ciebAddonMeConfigService: CiebAddonMeConfigService,
        private datePipe: DatePipe,
        private ciebRestrictedReasonCodeService: CiebRestrictedReasonCodeService,
        private changeReasonCodeService: CiebChangeReasonCodeService,
        private ciebEntityCodeService: CiebEntityCodeService,
        private toastService: ToastService,
        private ciebAddressCodeService: CiebAddressCodeService,
        private ciebCountryCodeService: CiebCountryCodeService,
        private ciebStateCodeService: CiebStateCodeService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializeComponentState();
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.entityType = this.entityType ? this.entityType : 'Subscriber';       // default entity type
        this.addressCode = 'PMA'// code for primary mailing address
        this.seqEntityId = 6605;
        this.createForm();

        this.displayMessage = {};
        this.formValidation = new FormValidation(this.cignalinksPrimaryMailingAddressForm);
        this.getAllGroupsByGroupId();
        this.getDropDownValues();
        this.getStateCodes();
        this.getCountryCodes();

        //  this.getVendorAddressData();    // TODO will be uncommented after PROC declaration issue fixed
        // this.getProvAddressData();
    }

    getDropDownValues() {
        let apis = [this.changeReasonCodeService.getCiebChangeReasonCodes(),
            this.ciebEntityCodeService.getCiebEntityCodes(),
            this.ciebRestrictedReasonCodeService.getCiebRestrictedReasonCodes(),
            this.ciebWebCodeDecodeService.getWebCodesInLnkAndLnkrc()
        ];
        forkJoin(apis).subscribe((data: Array<any>) => {
            this.ciebChangeReasonCodes = data[0];
            this.ciebEntityCodes = data[1];
            this.ciebRestrictedReasonCodes = data[2];
            this.countryDropdownValues = data[3];
            this.setCiebEntityType();
            this.getCiebStreetAddress();
        });
    }

    getCiebStreetAddress() {
        // if (this.seqAddressId) {
            this.ciebStreetAddressService.getCiebStreetAddressBySeqEntityId(this.seqEntityId).subscribe((data: CiebStreetAddress) => {
                this.ciebStreetAddress = data;
                this.isEditFormState = true;
                this.setFormData(data);
            });
        // }
    }

    getVendorAddressData() {
        this.ciebEntityAddressXrefService.getVendorAddressData(this.seqVendAddr).subscribe((data: CiebStreetAddress) => {
            console.log(data);
        });
    }

    procInsUpdStreetAddrTab(ciebStreetAddress: CiebStreetAddress) {
        this.ciebEntityAddressXrefService.procInsUpdStreetAddrTab(ciebStreetAddress).subscribe((data: CiebStreetAddress) => {
            console.log(data);
        });
    }

    getProvAddressData() {

        this.ciebEntityAddressXrefService.getProvAddressData(this.seqProvAddr).subscribe((data: CiebStreetAddress) => {
            console.log(data);
        });
    }

    /**
     * CodeType ('LNK','LNKRC')
     */
    getCiebWebCodeDecode() {
        this.ciebWebCodeDecodeService.getWebCodesInLnkAndLnkrc().subscribe((values: CiebWebCodeDecode[]) => {
            this.countryDropdownValues = values;

        })
    }

    /**
     * get all groups by groupId of same parent
     */
    getAllGroupsByGroupId() {
        this.groupMasterService.findAllGroupsByGroupId(this.groupNumber).subscribe((groupMasters: GroupMaster[]) => {
            this.groupMasters = groupMasters;
            console.log(groupMasters);

        })
    }

    getStateCodes() {
        this.ciebStateCodeService.getCiebStateCodes().subscribe(stateCodes => {
            this.states = stateCodes;
            if (this.states.length > 0) {
                this.state = stateCodes[0].stateCode;
            }
            console.log()
        });
    }

    getCountryCodes() {
        this.ciebCountryCodeService.getCiebCountryCodes().subscribe(countryCodes => {
            this.countryCodes = countryCodes;
            if (countryCodes.length > 0) {
                this.countryCode = countryCodes[0].countryCode ;
            }
        });
    }

    /**
     * findBy Cieb AddonMe ConfigBy CodeType
     */
    findByCiebAddonMeConfigByCodeType(codeType: string) {
        this.ciebAddonMeConfigService.findByCiebAddonMeConfigByCodeType(codeType).subscribe((ciebAddonMeConfigs: CiebAddonMeConfig[]) => {
            this.ciebAddonMeConfigs = ciebAddonMeConfigs;
        })
    }


    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.cignalinksPrimaryMailingAddressForm.controls[fieldName].patchValue(fieldValue);
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

    setCiebEntityType() {
        const index = this.ciebEntityCodes.findIndex(item => item.entityDesc == this.entityType);
        if (index > -1) {
            this.cignalinksPrimaryMailingAddressForm.patchValue({'entityType': this.ciebEntityCodes[index].entityDesc});

        }
    }

    setFormData(ciebStreetAddress: CiebStreetAddress) {
        const countryIndex = this.countryDropdownValues.findIndex(country => country.code == ciebStreetAddress.countryCode);
        const changeReasonIndex = this.ciebChangeReasonCodes.findIndex(code => code.changeReasonCode == ciebStreetAddress.changeReasonCode);
        const restrictedReasonIndex = this.ciebRestrictedReasonCodes.findIndex(code => code.restrictedCode == ciebStreetAddress.restrictedCode);
        this.cignalinksPrimaryMailingAddressForm.patchValue({
            //  'dynamicText': ciebStreetAddress.seqAccountId, // todo fixes
            //    partnerName: ciebStreetAddress.paymentCode, //TODO fixes req
            effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(ciebStreetAddress.effDate),
            country: ciebStreetAddress.countryCode,
            state: ciebStreetAddress.state,
            termDate: this.dateFormatPipe.defaultDisplayDateFormat(ciebStreetAddress.termDate),
            careOf: ciebStreetAddress.careof,
            postalCode: ciebStreetAddress.postalCode,
            addressLine1: ciebStreetAddress.addrline1,
            city: ciebStreetAddress.city,
            addressLine2: ciebStreetAddress.addrline2,
            district: ciebStreetAddress.district,
            addressLine3: ciebStreetAddress.addrline3,
            province: ciebStreetAddress.province,
            changeReason: changeReasonIndex > -1 ? this.ciebChangeReasonCodes[changeReasonIndex].changeReasonDesc : ciebStreetAddress.changeReasonCode,
            restrictedReason: restrictedReasonIndex > -1 ? this.ciebRestrictedReasonCodes[restrictedReasonIndex].restrictedReasonDesc : ciebStreetAddress.restrictedCode,
            visitingProvince: ciebStreetAddress.visitingProvince,
        });
    }

    getFormData(ciebStreetAddress: CiebStreetAddress): CiebStreetAddress {
        //   ciebStreetAddress.seqEntityId = this.cignalinksPrimaryMailingAddressForm.value.entityType;   todo need to check mapping for seqEntityId
        const entityTypeDesc = this.cignalinksPrimaryMailingAddressForm.value.entityType;
        const entityType = entityTypeDesc && this.ciebEntityCodes[this.ciebEntityCodes.findIndex(code => code.entityDesc == entityTypeDesc)].entityDesc;
        ciebStreetAddress.effDate = Form.getDatePickerValue(this.cignalinksPrimaryMailingAddressForm, 'effectiveDate');
        const country = this.cignalinksPrimaryMailingAddressForm.value.country;
        ciebStreetAddress.countryCode = this.cignalinksPrimaryMailingAddressForm.value.country;
        ciebStreetAddress.termDate = Form.getDatePickerValue(this.cignalinksPrimaryMailingAddressForm, 'termDate');
        ciebStreetAddress.careof = this.cignalinksPrimaryMailingAddressForm.value.careOf;
        ciebStreetAddress.postalCode = this.cignalinksPrimaryMailingAddressForm.value.postalCode;
        ciebStreetAddress.addrline1 = this.cignalinksPrimaryMailingAddressForm.value.addressLine1;
        ciebStreetAddress.city = this.cignalinksPrimaryMailingAddressForm.value.city;
        ciebStreetAddress.addrline2 = this.cignalinksPrimaryMailingAddressForm.value.addressLine2;
        ciebStreetAddress.district = this.cignalinksPrimaryMailingAddressForm.value.district;
        ciebStreetAddress.addrline3 = this.cignalinksPrimaryMailingAddressForm.value.addressLine3;
        ciebStreetAddress.province = this.cignalinksPrimaryMailingAddressForm.value.province;
        ciebStreetAddress.state = this.cignalinksPrimaryMailingAddressForm.value.state;

        const changeReasonDesc = this.cignalinksPrimaryMailingAddressForm.value.changeReason;
        ciebStreetAddress.changeReasonCode = changeReasonDesc && this.ciebChangeReasonCodes[this.ciebChangeReasonCodes.findIndex(code => code.changeReasonDesc == changeReasonDesc)].changeReasonCode;

        const restrictedReasonDesc = this.cignalinksPrimaryMailingAddressForm.value.restrictedReason;
        ciebStreetAddress.restrictedCode = restrictedReasonDesc && this.ciebRestrictedReasonCodes[this.ciebRestrictedReasonCodes.findIndex(code => code.restrictedReasonDesc == restrictedReasonDesc)].restrictedCode;

        ciebStreetAddress.visitingProvince = this.cignalinksPrimaryMailingAddressForm.value.visitingProvince;
        return ciebStreetAddress;
    }

    createCiebStreetAddress() {
        if (this.cignalinksPrimaryMailingAddressForm.invalid) {
            this.showPopUp('Form is invalid', 'Address');
            return;
        }

        let ciebStreetAddress = this.getFormData(new CiebStreetAddress());
        ciebStreetAddress.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        ciebStreetAddress.insertUser = sessionStorage.getItem('user');
        ciebStreetAddress.insertProcess = this.windowId;
        ciebStreetAddress.addressCode = this.addressCode
        ciebStreetAddress.seqEntityId = this.seqEntityId

        //   this.procInsUpdStreetAddrTab(ciebStreetAddress);      // TODO will be uncommented when proc issue resolved
        this.ciebStreetAddressService.createCiebStreetAddress(ciebStreetAddress).subscribe(resp => {
            this.toastService.showToast('Record saved successfully', NgbToastType.Success);
        });
    }


    updateCiebStreetAddress() {
        if (this.cignalinksPrimaryMailingAddressForm.invalid) {
            this.showPopUp('Form is invalid', 'Address');
            return;
        }
        let ciebStreetAddress = this.getFormData(this.ciebStreetAddress);
        ciebStreetAddress.addressCode = this.addressCode
        ciebStreetAddress.updateDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        try {
            ciebStreetAddress.insertDatetime = this.datePipe.transform(new Date(ciebStreetAddress.insertDatetime), 'dd-MM-yyyy HH:mm:ss');
        } catch (e) {
            console.log(e);
        }

        this.ciebStreetAddressService.updateCiebStreetAddress(ciebStreetAddress, ciebStreetAddress.seqAddrId).subscribe(resp => {
            this.toastService.showToast('Record saved successfully', NgbToastType.Success);
        });
    }

    saveCiebAddress() {
        if (this.isEditFormState) {
            this.updateCiebStreetAddress();
            return;
        }
        this.createCiebStreetAddress();
    }

    resetForm() {
        this.cignalinksPrimaryMailingAddressForm.reset();
        this.isEditFormState = false;
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
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
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

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.cignalinksPrimaryMailingAddressForm = this.formBuilder.group({
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            partnerName: ['', {updateOn: 'blur', validators: []}],
            entityType: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            effectiveDate: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            country: ['', {updateOn: 'blur', validators: [Validators.maxLength(50)]}],
            state: ['', {updateOn: 'blur', validators: []}],

            termDate: ['', {updateOn: 'blur', validators: []}],
            careOf: ['', {updateOn: 'blur', validators: []}],
            postalCode: ['', {updateOn: 'blur', validators: [Validators.maxLength(15)]}],
            addressLine1: ['', {
                updateOn: 'blur',
                validators: [Validators.maxLength(60), Validators.required, RequiredValidator.cannotContainSpace]
            }],
            city: ['', {updateOn: 'blur', validators: [Validators.maxLength(40)]}],
            addressLine2: ['', {updateOn: 'blur', validators: [Validators.maxLength(60)]}],
            district: ['', {updateOn: 'blur', validators: [Validators.maxLength(21)]}],
            addressLine3: ['', {updateOn: 'blur', validators: [Validators.maxLength(60)]}],
            province: ['', {updateOn: 'blur', validators: []}],
            changeReason: ['', {updateOn: 'blur', validators: []}],
            restrictedReason: ['', {updateOn: 'blur', validators: []}],
            visitingProvince: ['', {updateOn: 'blur', validators: [Validators.maxLength(21)]}]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
