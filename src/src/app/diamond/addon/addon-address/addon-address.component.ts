import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {
    CiebChangeReasonCode,
    CiebCountryCode,
    CiebEntityCode,
    CiebEntityMaster,
    CiebRestrictedReasonCode,
    CiebStreetAddress,
    GroupMaster,
    SecUser,
    SecWin
} from '../../../api-models';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {
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
import {AddonsValidationsService} from '../../../api-services/addon/addons-validations.service';
import {UntilDestroy} from '@ngneat/until-destroy';
import {CiebFieldValidationsModel} from '../../../api-models/addon/cieb-field-validations.model';
import {CiebStateCodeService} from '../../../api-services/addon/cieb-state-code.service';
import {CiebStateCode} from '../../../api-models/addon/cieb-state-code.model';
import {ZipCodes} from '../../../api-models/zip-codes.model';
import {ZipCodesService} from '../../../api-services/zip-codes.service';
import {CiebEntityMasterService} from '../../../api-services/addon/cieb-entity-master.service';
import { IMyDateModel } from 'angular-mydatepicker';

/**
 * ADDRESS FIELDS
 */
export const enum ADDRESS_FIELDS {
    AddrLine1 = 'AddrLine1',
    AddrLine2 = 'AddrLine2',
    AddrLine3 = 'AddrLine3',
    Postal_Code = 'Postal_Code',
    CareOf = 'CareOf',
    City = 'City',
    State = 'State',
    Middle_Initial = 'Middle_Initial',
    First_Name = 'First_Name',
    Last_Name = 'Last_Name',
    ADDRESSISOFIELDDISTRICT = "District",
    ADDRESSISOFIELDPROVINCE = "Province",
}


@UntilDestroy({checkProperties: true})
@Component({
    selector: "addon-address",
    templateUrl: "./addon-address.component.html",
})
export class AddonAddressComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() groupNumber = "00008A001";
    @Input() seqGroupId: number;
    @Input() groupName = "ARE";
    @Input() entityType: string;
    @Input() seqEntityId: number;

    @Input() seqAddressId: number; // default value for testing

    @Input() addressCode = "BIL";

    seqVendAddr = 1614;
    seqProvAddr = 1001;
    isChangeReasonReadonly:boolean=true;

    cignalinksGroupAddressForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = "ADDON"; // windowId used for Audit purpose, All addons screens have same windowId
    public isSuperUser = false;
    public secProgress = true;
    restrictedReasonVal: string;
    countryVal: string;
    public ADDRESS_FIELDS_Validations = {
        ISOTEMPLATECAREOFREQUIRED: "A CareOf value is required for this country.",
        ISOTEMPLATEADDRESSLINE1REQUIRED: "An AddressLine1 value is required for this country.",
        ISOTEMPLATEADDRESSLINE2REQUIRED: "An AddressLine2 value is required for this country.",
        ISOTEMPLATEADDRESSLINE2VALIDATAION: "An AddressLine2 value is not valid for this country.",
        ISOTEMPLATEADDRESSLINE3VALIDATAION: "An AddressLine3 value is not valid for this country.",
        ISOTEMPLATEADDRESSLINE3REQUIRED: "An AddressLine3 value is required for this country.",
        ISOTEMPLATECITYREQUIRED: "A City is required for this country.",
        ISOTEMPLATESTATEREQUIRED: "A State is required for this country.",
        ISOTEMPLATEPOSTALCODEREQUIRED: "A Postal Code is required for this country.",
        ISOTEMPLATEPROVINCEREQUIRED: "A Province is required for this country.",
        ISOTEMPLATEDISTRICTREQUIRED: "A District is required for this country.",
        ISOTEMPLATECOUNTRYREQUIRED: "A Country selection is required to save this record.",

        ISOTEMPLATECAREOFNOTALLOWED: "This country does not support a CareOf value.",
        ISOTEMPLATEADDRESSLINE1NOTALLOWED: "This country does not support an AddressLine1 value.",
        ISOTEMPLATEADDRESSLINE2NOTALLOWED: "This country does not support an AddressLine2 value.",
        ISOTEMPLATEADDRESSLINE3NOTALLOWED: "This country does not support an AddressLine3 value.",
        ISOTEMPLATECITYNOTALLOWED: "This country does not support a City value.",
        ISOTEMPLATESTATENOTALLOWED: "This country does not support a State value.",
        ISOTEMPLATEPOSTALCODENOTALLOWED: "This country does not support a Postal Code value.",
        ISOTEMPLATEPROVINCENOTALLOWED: "This country does not support a Province value.",
        ISOTEMPLATEDISTRICTNOTALLOWED: "This country does not support a District value.",

        // TD14898
        ISOTEMPLATEADDRESSLINE1VALIDATAION: "This country requires P O BOX for AddressLine 1. Please format the P O BOX as shown in this message",
        // SEiNIT
        ISOTEMPLATEPOSTALCODENOOFDIGITSMES1: "Postal code should have ",
        ISOTEMPLATEPOSTALCODENOOFDIGITSMES2: " digits. ",

        // The following constants match up to the Field_Name column values in the
        //  Cieb_field_validation table.
        ADDRESSISOFIELDFIRSTNAME: "First_Name",
        ADDRESSISOFIELDMIDDLEINITIAL: "Middle_Initial",
        ADDRESSISOFIELDLASTNAME: "Last_Name",
        ADDRESSISOFIELDCAREOF: "CareOf",
        ADDRESSISOFIELDADDRLINE1: "AddrLine1",
        ADDRESSISOFIELDADDRLINE2: "AddrLine2",
        ADDRESSISOFIELDADDRLINE3: "AddrLine3",
        ADDRESSISOFIELDCITY: "City",
        ADDRESSISOFIELDSTATE: "State",
        ADDRESSISOFIELDPOSTALCODE: "Postal_Code",
        ADDRESSISOFIELDDISTRICT: "District",
        ADDRESSISOFIELDPROVINCE: "Province",
        ADDRESSISOFIELDCOUNTRYDESC: "Country_Desc",
        ISOTEMPLATECITYREQUIREDCAYMAN: "This country requires Island Name please enter in the CITY field.",
        ISOTEMPLATECITYREQUIREDCITYNAME: "This country requires City name to be populated with the Country Name",

        INVALID_ZIP_FOR_STATE: "The zip code provided is not valid for selected state.",

    }

    isCareOfRequired = false;
    isAddrLine1Required = false;
    isAddrLine2Required = false;
    isAddrLine3Required = false;
    isCityRequired = false;
    isStateRequired = false;
    isPostalCodeRequired = false;
    iSDistrictRequired = false;
    isProvinceRequired = false;
    isCountRequired = false;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;

    ciebChangeReasonCodes: CiebChangeReasonCode[] = [];
    ciebEntityCodes: CiebEntityCode[] = [];
    ciebRestrictedReasonCodes: CiebRestrictedReasonCode[] = [];
    countryDropdownValues: CiebCountryCode[] = [];
    originalDDlData: CiebCountryCode[] = [];

    ciebAddonMeConfigs: CiebAddonMeConfig[];
    ciebStreetAddress: CiebStreetAddress;
    groupMasters: GroupMaster[];

    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    isEditFormState = false;
    isFormSubmitted = false;
    zipCode: ZipCodes;

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
        private ciebCountryCodeService: CiebCountryCodeService,
        private addonsValidationsService: AddonsValidationsService,
        private ciebStateCodeService: CiebStateCodeService,
        private zipCodesService: ZipCodesService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializeComponentState();
    }

    private initializeComponentState(): void {
        this.entityType = this.entityType ? this.entityType : "Group"; // default entity type

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.cignalinksGroupAddressForm);
        this.getAllGroupsByGroupId();
        this.getDropDownValues();
    }

    ciebStateCodes: CiebStateCode[] = [];

    getDropDownValues() {
        let apis = [
            this.changeReasonCodeService.getCiebChangeReasonCodes(),
            this.ciebEntityCodeService.getCiebEntityCodes(),
            this.ciebRestrictedReasonCodeService.getCiebRestrictedReasonCodes(),
            this.ciebCountryCodeService.getCiebCountryCodes(),
            this.ciebStateCodeService.getCiebStateCodes(),
        ];
        forkJoin(apis).subscribe((data: Array<any>) => {
            this.ciebChangeReasonCodes = data[0];
            this.ciebEntityCodes = data[1];
            this.ciebRestrictedReasonCodes = data[2];
            this.countryDropdownValues = data[3];
            this.originalDDlData =data[3];
            this.ciebStateCodes = data[4];
            this.setCiebEntityType();
            this.getCiebStreetAddress();
        });
        /**
         * set PMA default eff date
         */
        if (this.addressCode === 'PMA') {
            this.cignalinksGroupAddressForm.patchValue({
                effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
            });
        }
    }

    getCiebStreetAddress() {
        if (this.seqAddressId && this.addressCode === 'CLA') {
            this.ciebStreetAddressService
                .getCiebStreetAddress(this.seqAddressId)
                .subscribe(
                    (data: CiebStreetAddress) => {
                        this.ciebStreetAddress = data;
                        var data = data;
                        this.isEditFormState = true;
                        this.setFormData(data);
                        this.disableFields();
                    },
                    (error) => {
                    }
                );
        } else if(this.seqEntityId) {
            this.ciebStreetAddressService.getCiebStreetAddressBySeqEntityIdAndAddrCode(this.seqEntityId, this.addressCode).subscribe((data: CiebStreetAddress[]) => {
                let today = new Date();
                let filtered = data.filter(f => (((f.effDate != null) && (new Date(f.effDate).getTime() < today.getTime())) && ((f.termDate == null) || (new Date(f.termDate).getTime() > today.getTime()))));
                if (filtered.length > 0) {
                    this.ciebStreetAddress = filtered[0]; // filter to check term date and eff date.
                    this.isEditFormState = true;
                    this.setFormData(this.ciebStreetAddress);
                }
            else{
                this.isEditFormState = false;
                this.ciebStreetAddress = new CiebStreetAddress();
                this.setFormData(this.ciebStreetAddress);
                this.disableFields();

            }
                
            });
        }


    }

    disableFields() {

        this.cignalinksGroupAddressForm.get('entityType').disabled;
        this.cignalinksGroupAddressForm.get('effectiveDate').disabled;
        this.cignalinksGroupAddressForm.get('country').disabled;
        this.cignalinksGroupAddressForm.get('careOf').disabled;
        this.cignalinksGroupAddressForm.get('postalCode').disabled;
        this.cignalinksGroupAddressForm.get('addressLine1').disabled;
        this.cignalinksGroupAddressForm.get('city').disabled;
        this.cignalinksGroupAddressForm.get('addressLine2').disabled;
        this.cignalinksGroupAddressForm.get('district').disabled;
        this.cignalinksGroupAddressForm.get('addressLine3').disabled;
        this.cignalinksGroupAddressForm.get('province').disabled;
        this.cignalinksGroupAddressForm.get('restrictedReason').disabled;
        this.cignalinksGroupAddressForm.get('visitingProvince').disabled;
        this.cignalinksGroupAddressForm.get('state').disabled;


    }

    /**
     * get all groups by groupId of same parent
     */
    getAllGroupsByGroupId() {
        this.groupMasterService
            .findAllGroupsByGroupId(this.groupNumber)
            .subscribe((groupMasters: GroupMaster[]) => {
                this.groupMasters = groupMasters;
            });
    }

    /**
     * findBy Cieb AddonMe ConfigBy CodeType
     */
    findByCiebAddonMeConfigByCodeType(codeType: string) {
        this.ciebAddonMeConfigService
            .findByCiebAddonMeConfigByCodeType(codeType)
            .subscribe((ciebAddonMeConfigs: CiebAddonMeConfig[]) => {
                this.ciebAddonMeConfigs = ciebAddonMeConfigs;
            });
    }

    setFieldValue(fieldName: string,fieldValue:string  ) {
       // let fieldValue =event.target.value;
        this.cignalinksGroupAddressForm.controls[fieldName].patchValue(fieldValue);
        if(fieldName=='country')
        {
            this.countryVal= fieldValue;
        }

        if (fieldValue.toString().trim() === '"UNITED STATES"')
            this.isDisplayStateField = true;

    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === "yes") {
            console.log("button yes has been click!");
        }
        if (button.name === "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === "poUpMessageName") {
            this.popupMessageHandler(button);
        }
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    setCiebEntityType() {

        const index = this.ciebEntityCodes.findIndex(
            (item) => item.entityDesc === this.entityType
        );
        if (index > -1) {
            this.cignalinksGroupAddressForm.patchValue({
                entityType: this.ciebEntityCodes[index].entityDesc,
            });
        }
    }

    setFormData(ciebStreetAddress: CiebStreetAddress) {
        const countryIndex = this.countryDropdownValues.findIndex(
            (country) => country.countryCode === ciebStreetAddress.countryCode
        );
        
        const changeReasonIndex = this.ciebChangeReasonCodes.findIndex(
            (code) => code.changeReasonCode === ciebStreetAddress.changeReasonCode
        );
        const restrictedReasonIndex = this.ciebRestrictedReasonCodes.findIndex(
            (code) => code.restrictedCode === ciebStreetAddress.restrictedCode
        );
        const stateInd = this.ciebStateCodes.findIndex(
            (code) => code.stateCode === ciebStreetAddress.state
        );

        /**
         * Set effective date validations for PMA, :: if date is null then set default date to system date
         */
        if (!ciebStreetAddress.effDate) {
            this.cignalinksGroupAddressForm.patchValue({
                effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
            });
        } else {
            this.cignalinksGroupAddressForm.patchValue({
                effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(ciebStreetAddress.effDate),
            });
        }


        this.cignalinksGroupAddressForm.patchValue({

            // country:
            //     countryIndex > -1
            //         ? this.countryDropdownValues[countryIndex].countryDesc
            //         : ciebStreetAddress.countryCode,
            termDate: this.dateFormatPipe.defaultDisplayDateFormat(
                ciebStreetAddress.termDate
            ),
            careOf: ciebStreetAddress.careof,
            postalCode: ciebStreetAddress.postalCode,
            addressLine1: ciebStreetAddress.addrline1,
            renewalDate: ciebStreetAddress.renewalDate,
            city: ciebStreetAddress.city,
            addressLine2: ciebStreetAddress.addrline2,
            district: ciebStreetAddress.district,
            addressLine3: ciebStreetAddress.addrline3,
            province: ciebStreetAddress.province,
            changeReason:
                changeReasonIndex > -1
                    ? this.ciebChangeReasonCodes[changeReasonIndex].changeReasonDesc
                    : "",
            restrictedReason:
                restrictedReasonIndex > -1
                    ? this.ciebRestrictedReasonCodes[restrictedReasonIndex]
                        .restrictedReasonDesc
                    : "",
            visitingProvince: ciebStreetAddress.visitingProvince,
            state:
                stateInd > -1
                    ? this.ciebStateCodes[stateInd].stateDesc
                    : ciebStreetAddress.state,
        });
        this.cignalinksGroupAddressForm.patchValue({country:ciebStreetAddress.countryCode});
        this.countryVal== ciebStreetAddress.countryCode;
        if(ciebStreetAddress.termDate)
            this.isChangeReasonReadonly =false;
    }
    

    isDisplayStateField: boolean;

    /**
     * check form validations
     * @param ciebStreetAddress
     *
     */

    addValidations(val) {
        let value: CiebCountryCode = new CiebCountryCode();
        value.countryCode= this.countryVal;
        if (!value.countryCode) {
            return true; // no validation of country code null;
        }
        this.isDisplayStateField = false;
        this.setFieldValue( "state",""); // reset state field
        this.cignalinksGroupAddressForm.clearValidators();
        this.addonsValidationsService
            .getAddressValidationsByCountryCode(value.countryCode)
            .subscribe((data: CiebFieldValidationsModel[]) => {
                data.forEach((record) => {
                    if (record.fieldName === ADDRESS_FIELDS.AddrLine1) {
                        this.isAddrLine1Required = true;

                    } else if (record.fieldName === ADDRESS_FIELDS.AddrLine2) {
                        this.isAddrLine2Required = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.AddrLine3) {
                        this.isAddrLine3Required = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.Postal_Code) {
                        this.isPostalCodeRequired = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.City) {
                        this.isCityRequired = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.CareOf) {
                        this.isCareOfRequired = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.State) {
                        this.isDisplayStateField = true;
                        this.isStateRequired = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.ADDRESSISOFIELDPROVINCE) {

                        this.isProvinceRequired = true;
                    } else if (record.fieldName === ADDRESS_FIELDS.ADDRESSISOFIELDDISTRICT) {

                        this.iSDistrictRequired = true;
                    }
                });

                if (this.isAddrLine1Required == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.AddrLine1)[0], "addressLine1")];
                    this.addControlValidator("addressLine1", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "addressLine1")];
                    this.addControlValidator("addressLine1", validators);
                }

                if (this.isAddrLine2Required == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.AddrLine2)[0], "addressLine2")];
                    this.addControlValidator("addressLine2", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "addressLine2")];
                    this.addControlValidator("addressLine2", validators);
                }
                if (this.isAddrLine3Required == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.AddrLine3)[0], "addressLine3")];
                    this.addControlValidator("addressLine3", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "addressLine3")];
                    this.addControlValidator("addressLine3", validators);
                }

                if (this.isCareOfRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.CareOf)[0], "careOf")];
                    this.addControlValidator("careOf", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "careOf")];
                    this.addControlValidator("careOf", validators);
                }
                if (this.isCityRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.City)[0], "city")];
                    this.addControlValidator("city", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "city")];
                    this.addControlValidator("city", validators);
                }
                if (this.isStateRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.State)[0], "state")];
                    this.addControlValidator("state", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "state")];
                    this.addControlValidator("state", validators);
                }
                if (this.isPostalCodeRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.Postal_Code)[0], "postalCode")];
                    this.addControlValidator("postalCode", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "postalCode")];
                    this.addControlValidator("postalCode", validators);
                }
                if (this.iSDistrictRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.ADDRESSISOFIELDDISTRICT)[0], "district")];
                    this.addControlValidator("district", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "district")];
                    this.addControlValidator("district", validators);
                }
                if (this.iSDistrictRequired == true) {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(data.filter(f => f.fieldName == ADDRESS_FIELDS.ADDRESSISOFIELDPROVINCE)[0], "province")];
                    this.addControlValidator("province", validators);
                } else {
                    let validators = [RequiredValidator.cannotContainSpace, this.fieldCustomValidator(null, "province")];
                    this.addControlValidator("province", validators);
                }
            });
    }

    addControlValidator(
        controlName: string,
        validators = [Validators.required, RequiredValidator.cannotContainSpace]
    ) {
        this.cignalinksGroupAddressForm.controls[controlName].setValidators(
            validators
        );
        this.cignalinksGroupAddressForm
            .get(controlName)
            .updateValueAndValidity({emitEvent: true});
    }

    getFormData(ciebStreetAddress: CiebStreetAddress): CiebStreetAddress {
        //   ciebStreetAddress.seqEntityId = this.cignalinksGroupAddressForm.value.entityType;   todo need to check mapping for seqEntityId
        const entityTypeDesc = this.cignalinksGroupAddressForm.value.entityType;
        const entityType =
            entityTypeDesc &&
            this.ciebEntityCodes[
                this.ciebEntityCodes.findIndex(
                    (code) => code.entityDesc === entityTypeDesc
                )
                ].entityDesc;
        ciebStreetAddress.effDate = Form.getDatePickerValue(
            this.cignalinksGroupAddressForm,
            "effectiveDate"
        );
        const country = this.cignalinksGroupAddressForm.value.country;
        ciebStreetAddress.countryCode =
            country &&
            this.countryDropdownValues[
                this.countryDropdownValues.findIndex(
                    (code) => code.countryCode === country
                )
                ].countryCode;
        ciebStreetAddress.termDate = Form.getDatePickerValue(
            this.cignalinksGroupAddressForm,
            "termDate"
        );
        ciebStreetAddress.careof = this.cignalinksGroupAddressForm.value.careOf;
        ciebStreetAddress.postalCode =
            this.cignalinksGroupAddressForm.value.postalCode;
        ciebStreetAddress.addrline1 =
            this.cignalinksGroupAddressForm.value.addressLine1;
        ciebStreetAddress.city = this.cignalinksGroupAddressForm.value.city;
        ciebStreetAddress.addrline2 =
            this.cignalinksGroupAddressForm.value.addressLine2;
        ciebStreetAddress.district = this.cignalinksGroupAddressForm.value.district;
        ciebStreetAddress.addrline3 =
            this.cignalinksGroupAddressForm.value.addressLine3;
        ciebStreetAddress.province = this.cignalinksGroupAddressForm.value.province;

        const changeReasonDesc = this.cignalinksGroupAddressForm.value.changeReason;
        ciebStreetAddress.changeReasonCode =
            changeReasonDesc &&
            this.ciebChangeReasonCodes[
                this.ciebChangeReasonCodes.findIndex(
                    (code) => code.changeReasonDesc === changeReasonDesc
                )
                ].changeReasonCode;

        const restrictedReasonDesc =
            this.cignalinksGroupAddressForm.value.restrictedReason;
        ciebStreetAddress.restrictedCode =
            restrictedReasonDesc &&
            this.ciebRestrictedReasonCodes[
                this.ciebRestrictedReasonCodes.findIndex(
                    (code) => code.restrictedReasonDesc === restrictedReasonDesc
                )
                ].restrictedCode;

        ciebStreetAddress.visitingProvince =
            this.cignalinksGroupAddressForm.value.visitingProvince;
        const stateValue = this.cignalinksGroupAddressForm.value.state;

        const stateInd = this.ciebStateCodes.findIndex(
            (code) => code.stateDesc === stateValue
        );
        ciebStreetAddress.state =
            stateInd && stateInd > -1 ? this.ciebStateCodes[stateInd].stateCode : "";

        return ciebStreetAddress;
    }

    createCiebStreetAddress() {
        if (this.cignalinksGroupAddressForm.invalid) {
              return;
        }
        this.isFormSubmitted = false;
        let ciebStreetAddress = this.getFormData(new CiebStreetAddress());
        ciebStreetAddress.insertDatetime = this.datePipe.transform(
            new Date(),
            "dd-MM-yyyy HH:mm:ss"
        );
        ciebStreetAddress.insertUser = sessionStorage.getItem("user");
        ciebStreetAddress.insertProcess = this.windowId;

        ciebStreetAddress.addressCode = this.addressCode;
        ciebStreetAddress.seqEntityId = this.seqEntityId;

        this.ciebStreetAddressService
            .createCiebStreetAddress(ciebStreetAddress)
            .subscribe((resp) => {
                this.toastService.showToast(
                    "Record saved successfully",
                    NgbToastType.Success
                );
            });
    }

    updateCiebStreetAddress() {
        if (this.cignalinksGroupAddressForm.invalid) {
          return;
        }
        this.isFormSubmitted = false;
        let ciebStreetAddress = this.getFormData(this.ciebStreetAddress);
        ciebStreetAddress.addressCode = this.addressCode;
        ciebStreetAddress.updateDatetime = this.datePipe.transform(
            new Date(),
            "dd-MM-yyyy HH:mm:ss"
        );
        try {
            ciebStreetAddress.insertDatetime = this.datePipe.transform(
                new Date(ciebStreetAddress.insertDatetime),
                "dd-MM-yyyy HH:mm:ss"
            );
        } catch (e) {
            console.log(e);
        }

        this.ciebStreetAddressService
            .updateCiebStreetAddress(ciebStreetAddress, ciebStreetAddress.seqAddrId)
            .subscribe((resp) => {
                this.toastService.showToast(
                    "Record saved successfully",
                    NgbToastType.Success
                );
            });
    }

    saveCiebAddress() {
        this.isFormSubmitted = true;
        if (this.isEditFormState) {
            this.updateCiebStreetAddress();
            return;
        }
        this.createCiebStreetAddress();
    }

    resetForm() {
        this.cignalinksGroupAddressForm.reset();
        this.isEditFormState = false;
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        "You are not Permitted to view MEMBER Master",
                        "Member Master Permission"
                    );
                }
            });
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
            .findByTableNameAndUserId("MEMBER_MASTER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.cignalinksGroupAddressForm = this.formBuilder.group({
            dynamicText: ["", {updateOn: "blur", validators: []}],
            partnerName: ["", {updateOn: "blur", validators: []}],
            entityType: [
                "",
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            effectiveDate: [
                "",
                {
                    updateOn: "blur",
                    validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            country: [
                "",
                {
                    updateOn: "blur", validators: [
                        Validators.required,
                        RequiredValidator.cannotContainSpace,
                    ],
                },
            ],
            termDate: ["", {updateOn: "blur", validators: []}],
            renewalDate: ["", {updateOn: "blur", validators: []}],
            careOf: ["", {updateOn: "blur", validators: []}],
            postalCode: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(15)]},
            ],
            addressLine1: [
                "",
                {
                    updateOn: "blur",
                    validators: [Validators.maxLength(60)],
                },
            ],
            city: ["", {updateOn: "blur", validators: [Validators.maxLength(40)]}],
            addressLine2: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(60)]},
            ],
            district: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(21)]},
            ],
            addressLine3: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(60)]},
            ],
            province: ["", {updateOn: "blur", validators: []}],
            changeReason: ["", {updateOn: "blur", validators: []}],
            restrictedReason: ["", {updateOn: "blur", validators: []}],
            visitingProvince: [
                "",
                {updateOn: "blur", validators: [Validators.maxLength(21)]},
            ],
            state: ["", {updateOn: "blur", validators: [Validators.maxLength(21)]}],
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    findDetailByZipCode() {
        this.zipCode = new ZipCodes();
        let zipCode = this.cignalinksGroupAddressForm.controls["postalCode"].value;
        this.zipCodesService.getZipCode(zipCode).subscribe((resp) => {
            if (resp !== null) {
                this.zipCode = resp;
                this.setCityAndStateProvByZipCode(this.zipCode);
            }
        });
    }

    setCityAndStateProvByZipCode(zipCode: ZipCodes) {
        this.cignalinksGroupAddressForm.patchValue({
            city: zipCode.city,
            state: zipCode.state,
            zippost: zipCode.zip,
        });
    }

    fieldCustomValidator(record: CiebFieldValidationsModel, controlName: string): ValidatorFn {
        let control = this.cignalinksGroupAddressForm.controls[controlName];
        if (record) {
            if (record.validationClass) {
                return (control): { [key: string]: boolean } | null => {
                    if (control.value && control.value.toString().indexOf(record.validationClass) < 0) {
                        return {notValid: true};
                    } else
                        return null;
                }
            }
            if (record.requiredInd) {
                return (control): { [key: string]: boolean } | null => {
                    if (record.requiredInd === 'Y' && (!control.value  || control.value.length <= 0)) {
                        return {incorrect: true};
                    } else if (control.value && control.value.length > 0) {
                        return null;
                    } else
                        return null;
                }
            }
        } else {

            return (control): { [key: string]: boolean } | null => {
                if (control.value &&  control.value.length > 0) {
                    return {notrequired: true};
                } else
                    return null;

            }
        }
    }

    setChangeReason(event: IMyDateModel){
        if(event.singleDate.formatted)
            this.isChangeReasonReadonly=false;
        else
            this.isChangeReasonReadonly=true;
    }

    onSearchChange(value:string){
        if(value.length>0)
            this.countryDropdownValues= this.originalDDlData.filter( f=> f.countryDesc.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
        else
            this.countryDropdownValues =this.originalDDlData
    }
}
