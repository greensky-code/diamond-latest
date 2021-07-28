import { DatePipe } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntilDestroy } from "@ngneat/until-destroy";
import { NgbToastType } from "ngb-toast";
import { forkJoin } from "rxjs";
import {
  CiebChangeReasonCode,
  CiebCountryCode,
  CiebPaymentCode,
  CiebEntityCode,
  CiebEntityMaster,
  CiebRestrictedReasonCode,
  CiebStreetAddress,
  GroupMaster,
  SecUser,
  SecWin,
  CiebProvince,
} from "../../../api-models";
import { CiebAddonMeConfig } from "../../../api-models/addon/cieb-addon-me-config";
import { CiebFieldValidationsModel } from "../../../api-models/addon/cieb-field-validations.model";
import { CiebStateCode } from "../../../api-models/addon/cieb-state-code.model";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { ZipCodes } from "../../../api-models/zip-codes.model";
import {
  CiebChangeReasonCodeService,
  CiebCountryCodeService,
  CiebPaymentCodeService,
  CiebProvinceService,
  CiebRestrictedReasonCodeService,
  CiebStreetAddressService,
  SecUserService,
} from "../../../api-services";
import { AddonsValidationsService } from "../../../api-services/addon/addons-validations.service";
import { CiebAddonMeConfigService } from "../../../api-services/addon/cieb-addon-me-config.service";
import { CiebEntityCodeService } from "../../../api-services/addon/cieb-entity-code.service";
import { CiebEntityMasterService } from "../../../api-services/addon/cieb-entity-master.service";
import { CiebStateCodeService } from "../../../api-services/addon/cieb-state-code.service";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { ZipCodesService } from "../../../api-services/zip-codes.service";
import { MEM_MODULE_ID } from "../../../shared/app-constants";
import { AlertMessage } from "../../../shared/components/alert-message";
import {
  PopUpMessage,
  PopUpMessageButton,
} from "../../../shared/components/pop-up-message";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DatePickerConfig, DatePickerModel } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import { OPERATIONS } from "../../../shared/models/models";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { AuditService } from "../../../shared/services/audit.service";
import { SecurityService } from "../../../shared/services/security.service";
import { ToastService } from "../../../shared/services/toast.service";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { RequiredValidator } from "../../../shared/validators/required.validator";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { AddressBankSearchComponent } from "../address-bank/address-bank-search/address-bank-search.component";

/**
 * ADDRESS FIELDS
 */
export const enum ADDRESS_FIELDS {
  AddrLine1 = "AddrLine1",
  AddrLine2 = "AddrLine2",
  AddrLine3 = "AddrLine3",
  Postal_Code = "Postal_Code",
  CareOf = "CareOf",
  City = "City",
  State = "State",
  payment = "Payment",
  Middle_Initial = "Middle_Initial",
  First_Name = "First_Name",
  Last_Name = "Last_Name",
  ADDRESSISOFIELDDISTRICT = "District",
  ADDRESSISOFIELDPROVINCE = "Province",
}

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "member-master-addon-address",
  templateUrl: "./member-master-addon-address.component.html",
})
export class MemberMasterAddonAddressComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

  @Input() entityType: string;
  @Input() seqEntityId: number;
  @Input() subscriberId: any;
  @Input() seqMembId: any;
  @Input() seqSubsId: any;

  restrictedReasonVal: string;
  countryVal: string;

  @Input() seqAddressId: number; // default value for testing

  @Input() addressCode: string;
  addressCodeStatus: boolean = true;

  memberMasterAddonAddressForm: FormGroup;
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
  private windowId_DB = "ADDON"; // windowId used for Audit purpose, All addons screens have same windowId

  public ADDRESS_FIELDS_Validations = {
    ISOTEMPLATECAREOFREQUIRED: "A CareOf value is required for this country.",
    ISOTEMPLATEADDRESSLINE1REQUIRED:
      "An AddressLine1 value is required for this country.",
    ISOTEMPLATEADDRESSLINE2REQUIRED:
      "An AddressLine2 value is required for this country.",
    ISOTEMPLATEADDRESSLINE3REQUIRED:
      "An AddressLine3 value is required for this country.",
    ISOTEMPLATECITYREQUIRED: "A City is required for this country.",
    ISOTEMPLATESTATEREQUIRED: "A State is required for this country.",
    ISOTEMPLATEPOSTALCODEREQUIRED:
      "A Postal Code is required for this country.",
    ISOTEMPLATEPROVINCEREQUIRED: "A Province is required for this country.",
    ISOTEMPLATEDISTRICTREQUIRED: "A District is required for this country.",
    ISOTEMPLATECOUNTRYREQUIRED:
      "A Country selection is required to save this record.",

    ISOTEMPLATECAREOFNOTALLOWED:
      "This country does not support a CareOf value.",
    ISOTEMPLATEADDRESSLINE1NOTALLOWED:
      "This country does not support an AddressLine1 value.",
    ISOTEMPLATEADDRESSLINE2NOTALLOWED:
      "This country does not support an AddressLine2 value.",
    ISOTEMPLATEADDRESSLINE3NOTALLOWED:
      "This country does not support an AddressLine3 value.",
    ISOTEMPLATECITYNOTALLOWED: "This country does not support a City value.",
    ISOTEMPLATESTATENOTALLOWED: "This country does not support a State value.",
    ISOTEMPLATEPOSTALCODENOTALLOWED:
      "This country does not support a Postal Code value.",
    ISOTEMPLATEPROVINCENOTALLOWED:
      "This country does not support a Province value.",
    ISOTEMPLATEDISTRICTNOTALLOWED:
      "This country does not support a District value.",

    // TD14898
    ISOTEMPLATEADDRESSLINE1VALIDATAION:
      "This country requires P O BOX for AddressLine 1. Please format the P O BOX as shown in this message",
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
    ISOTEMPLATECITYREQUIREDCAYMAN:
      "This country requires Island Name please enter in the CITY field.",
    ISOTEMPLATECITYREQUIREDCITYNAME:
      "This country requires City name to be populated with the Country Name",

    INVALID_ZIP_FOR_STATE:
      "The zip code provided is not valid for selected state.",
  };

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
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;

  ciebChangeReasonCodes: CiebChangeReasonCode[] = [];
  ciebChangeReasonCodesFiltered: CiebChangeReasonCode[] = [];
  ciebEntityCodes: CiebEntityCode[] = [];
  ciebRestrictedReasonCodes: CiebRestrictedReasonCode[] = [];
  ciebRestrictedReasonCodesFiltered : CiebRestrictedReasonCode[] = [];
  countryDropdownValues: CiebCountryCode[] = [];
  countryDropdownValuesFiltered : CiebCountryCode[] = [];
  ciebPaymentCodeCodes: CiebPaymentCode[] = [];
  ciebStateCodes: CiebStateCode[] = [];

  ciebAddonMeConfigs: CiebAddonMeConfig[];
  ciebStreetAddress: CiebStreetAddress;
  groupMasters: GroupMaster[];

  userTemplateId: string;
  memberModuleId = MEM_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  isEditFormState = false;
  isFormSubmitted = false;
  isDisplayStateField: boolean;
  zipCode: ZipCodes;
  ProvinceDropDown: CiebProvince[] = [];
  makeDropDownProvince: boolean = false;
  ProvinceVal: any;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private ciebProvince: CiebProvinceService,
    private auditService: AuditService,
    private formBuilder: FormBuilder,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    public activeModal: NgbActiveModal,
    private ciebStreetAddressService: CiebStreetAddressService,
    private ciebAddonMeConfigService: CiebAddonMeConfigService,
    private datePipe: DatePipe,
    private ciebRestrictedReasonCodeService: CiebRestrictedReasonCodeService,
    private changeReasonCodeService: CiebChangeReasonCodeService,
    private ciebPaymentCodeService: CiebPaymentCodeService,
    private ciebEntityCodeService: CiebEntityCodeService,
    private toastService: ToastService,
    private ciebCountryCodeService: CiebCountryCodeService,
    private addonsValidationsService: AddonsValidationsService,
    private ciebStateCodeService: CiebStateCodeService,
    private ciebEntityMasterService: CiebEntityMasterService,
    private zipCodesService: ZipCodesService,
    private cdr: ChangeDetectorRef,
    public ngbActiveModal: NgbActiveModal
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  private initializeComponentState(): void {
    this.SetWindowIds();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.memberMasterAddonAddressForm);
    this.getCiebStreetAddress();
    this.getVisitProvinceStatus();
  }
  SetWindowIds() {
    if (this.addressCode == "PMA") {
      this.windowId = "AOADPM";
    }
  }

  getCiebStreetAddress() {
    let apis = [
      this.changeReasonCodeService.getCiebChangeReasonCodes(),
      this.ciebEntityCodeService.getCiebEntityCodes(),
      this.ciebPaymentCodeService.getCiebPaymentCodes(),
      this.ciebRestrictedReasonCodeService.getCiebRestrictedReasonCodes(),
      this.ciebCountryCodeService.getCiebCountryCodes(),
      this.ciebStateCodeService.getCiebStateCodes(),
    ];
    forkJoin(apis).subscribe((data: Array<any>) => {
      this.ciebChangeReasonCodes = data[0];
      this.ciebChangeReasonCodesFiltered = data[0];
      this.ciebEntityCodes = data[1];
      this.ciebPaymentCodeCodes = data[2];
      this.ciebRestrictedReasonCodes = data[3];
      this.ciebRestrictedReasonCodesFiltered = data[3];
      this.countryDropdownValues = data[4];
      this.countryDropdownValuesFiltered = data[4];
      this.ciebStateCodes = data[5];
      this.setCiebEntityType();
      this.getCiebStreetAddressBySeqEntityIdAndAddressCode();
    });
  }

  getCiebStreetAddressBySeqEntityIdAndAddressCode() {
    this.memberMasterAddonAddressForm.patchValue({
      effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
    });
    if (this.seqEntityId && this.addressCode) {
      this.ciebStreetAddressService
        .getCiebStreetAddressBySeqEntityIdAndAddressCode(
          this.seqEntityId,
          this.addressCode
        )
        .subscribe((data: CiebStreetAddress) => {
          this.ciebStreetAddress = data;
          if (this.ciebStreetAddress) {
            this.isEditFormState = true;
            this.setFormData(this.ciebStreetAddress);
            this.disableFields();
          } else {
            this.isEditFormState = false;
          }
        });
    } else {
      this.ciebStreetAddress = new CiebStreetAddress();
      this.isEditFormState = false;
    }
  }

  disableFields() {
    this.memberMasterAddonAddressForm.get("payment").disable();
    this.memberMasterAddonAddressForm.get("effectiveDate").disable();
    this.memberMasterAddonAddressForm.get("country").disable();
    this.memberMasterAddonAddressForm.get("careOf").disable();
    this.memberMasterAddonAddressForm.get("postalCode").disable();
    this.memberMasterAddonAddressForm.get("addressLine1").disable();
    this.memberMasterAddonAddressForm.get("city").disable();
    this.memberMasterAddonAddressForm.get("addressLine2").disable();
    this.memberMasterAddonAddressForm.get("district").disable();
    this.memberMasterAddonAddressForm.get("addressLine3").disable();
    this.memberMasterAddonAddressForm.get("province").disable();
    this.memberMasterAddonAddressForm.get("restrictedReason").disable();
    this.memberMasterAddonAddressForm.get("visitingProvince").disable();
    this.memberMasterAddonAddressForm.get("state").disable();
    this.memberMasterAddonAddressForm.get("changeReason").enable();
  }

  setCiebEntityType() {
    const index = this.ciebEntityCodes.findIndex(
      (item) => item.entityCode === "SUB"
    );
    if (index > -1) {
      this.memberMasterAddonAddressForm.patchValue({
        entityType: this.ciebEntityCodes[index].entityDesc,
      });
    }
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

  setFieldValue(
    fieldName: string,
    fieldValue: string | number,
    province: any = null,
    prov = 0
  ) {
    if (fieldName == "country") {
      this.memberMasterAddonAddressForm.controls["province"].patchValue("");
    }
    if (prov == 1) {
      this.GetProvinces(fieldValue, province);
    } else {
      this.memberMasterAddonAddressForm.controls[fieldName].patchValue(
        fieldValue
      );

      this.isDisplayStateField = true;

      if (this.addressCode == "LRA") {
        if (
          fieldName == "country" &&
          (fieldValue.toString().trim() == "AUSTRALIA" ||
            fieldValue.toString().trim() == "BRAZIL" ||
            fieldValue.toString().trim() == "CANADA" ||
            fieldValue.toString().trim() == "ITALY")
        ) {
          var code =
            this.countryDropdownValues[
              this.countryDropdownValues.findIndex(
                (code) => code.countryDesc === fieldValue
              )
            ].countryCode;
          this.GetProvinces(code);
        } else {
          this.makeDropDownProvince = false;
        }
      }
    }
  }
  GetProvinces(code: any, province: any = "") {
    this.ciebProvince.findbyCountryCode(code).subscribe((data) => {
      this.ProvinceDropDown = data;
      this.makeDropDownProvince = true;
      if (province && this.addressCode == "LRA") {
        var desc =
          this.ProvinceDropDown[
            this.ProvinceDropDown.findIndex(
              (code) => code.stateCode === province
            )
          ].stateDesc;
        this.memberMasterAddonAddressForm.controls["province"].patchValue(desc);
      } else {
        this.memberMasterAddonAddressForm.controls["province"].patchValue(
          province
        );
      }
    });
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

  setFormData(ciebStreetAddress: CiebStreetAddress) {
    let countryIndex = -1;
    let provinceIndex = -1;
    if (ciebStreetAddress.countryCode) {
      countryIndex = this.countryDropdownValues.findIndex(
        (country) => country.countryCode === ciebStreetAddress.countryCode
      );
      let country = this.countryDropdownValues.find(
        (country) => country.countryCode === ciebStreetAddress.countryCode
      );
      this.setFieldValue("country", country.countryDesc);
    }
    if (
      ciebStreetAddress.countryCode == "AUS" ||
      ciebStreetAddress.countryCode == "BRA" ||
      ciebStreetAddress.countryCode == "CAN" ||
      (ciebStreetAddress.countryCode == "ITA" && ciebStreetAddress.province)
    ) {
      provinceIndex = 1;
      this.setFieldValue(
        "province",
        ciebStreetAddress.countryCode,
        ciebStreetAddress.province,
        1
      );
    }

    let changeReasonIndex = -1;
    if (ciebStreetAddress.changeReasonCode) {
      changeReasonIndex = this.ciebChangeReasonCodes.findIndex(
        (code) => code.changeReasonCode === ciebStreetAddress.changeReasonCode
      );
    }

    let restrictedReasonIndex = -1;
    if (ciebStreetAddress.restrictedCode) {
      restrictedReasonIndex = this.ciebRestrictedReasonCodes.findIndex(
        (code) => code.restrictedCode === ciebStreetAddress.restrictedCode
      );
    }

    let stateInd = -1;
    if (ciebStreetAddress.state) {
      stateInd = this.ciebStateCodes.findIndex(
        (code) => code.stateCode === ciebStreetAddress.state
      );
    }

    let paymentCodeInd = -1;
    if (ciebStreetAddress.paymentCode) {
      paymentCodeInd = this.ciebPaymentCodeCodes.findIndex(
        (code) => code.paymentCode === ciebStreetAddress.paymentCode
      );
    }
    var Province;
    if (provinceIndex != 1) {
      Province = ciebStreetAddress.province;
    } else {
      Province = this.memberMasterAddonAddressForm.get("province").value;
    }
    this.memberMasterAddonAddressForm.patchValue({
      effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
      country:
        countryIndex > -1
          ? this.countryDropdownValues[countryIndex].countryDesc
          : ciebStreetAddress.countryCode,
      termDate: this.dateFormatPipe.defaultDisplayDateFormat(
        ciebStreetAddress.termDate
      ),
      careOf: ciebStreetAddress.careof,
      postalCode: ciebStreetAddress.postalCode,
      addressLine1: ciebStreetAddress.addrline1,
      city: ciebStreetAddress.city,
      addressLine2: ciebStreetAddress.addrline2,
      district: ciebStreetAddress.district,
      addressLine3: ciebStreetAddress.addrline3,
      province: Province,
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
      state: stateInd > -1 ? this.ciebStateCodes[stateInd].stateDesc : "",
      payment:
        paymentCodeInd > -1
          ? this.ciebPaymentCodeCodes[paymentCodeInd].paymentDesc
          : "",
    });
    this.restrictedReasonVal =
      this.memberMasterAddonAddressForm.get("restrictedReason").value;
    this.countryVal = this.memberMasterAddonAddressForm.get("country").value;
    this.ProvinceVal = this.memberMasterAddonAddressForm.get("province").value;
  }

  /**
   * check form validations
   * @param ciebStreetAddress
   *
   */

  addValidations(value: CiebCountryCode) {
    if (!value.countryCode) {
      return true; // no validation of country code null;
    }
    this.isDisplayStateField = false;
    this.setFieldValue("state", ""); // reset state field
    this.memberMasterAddonAddressForm.clearValidators();
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
          } else if (
            record.fieldName === ADDRESS_FIELDS.ADDRESSISOFIELDPROVINCE
          ) {
            this.isProvinceRequired = true;
          } else if (
            record.fieldName === ADDRESS_FIELDS.ADDRESSISOFIELDDISTRICT
          ) {
            this.iSDistrictRequired = true;
          }
        });

        if (this.isAddrLine1Required == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.AddrLine1)[0],
              "addressLine1"
            ),
          ];
          this.addControlValidator("addressLine1", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "addressLine1"),
          ];
          this.addControlValidator("addressLine1", validators);
        }

        if (this.isAddrLine2Required == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.AddrLine2)[0],
              "addressLine2"
            ),
          ];
          this.addControlValidator("addressLine2", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "addressLine2"),
          ];
          this.addControlValidator("addressLine2", validators);
        }
        if (this.isAddrLine3Required == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.AddrLine3)[0],
              "addressLine3"
            ),
          ];
          this.addControlValidator("addressLine3", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "addressLine3"),
          ];
          this.addControlValidator("addressLine3", validators);
        }

        if (this.isCareOfRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.CareOf)[0],
              "careOf"
            ),
          ];
          this.addControlValidator("careOf", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "careOf"),
          ];
          this.addControlValidator("careOf", validators);
        }
        if (this.isCityRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.City)[0],
              "city"
            ),
          ];
          this.addControlValidator("city", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "city"),
          ];
          this.addControlValidator("city", validators);
        }
        if (this.isStateRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.State)[0],
              "state"
            ),
          ];
          this.addControlValidator("state", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "state"),
          ];
          this.addControlValidator("state", validators);
        }
        if (this.isPostalCodeRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter((f) => f.fieldName == ADDRESS_FIELDS.Postal_Code)[0],
              "postalCode"
            ),
          ];
          this.addControlValidator("postalCode", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "postalCode"),
          ];
          this.addControlValidator("postalCode", validators);
        }
        if (this.iSDistrictRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter(
                (f) => f.fieldName == ADDRESS_FIELDS.ADDRESSISOFIELDDISTRICT
              )[0],
              "district"
            ),
          ];
          this.addControlValidator("district", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "district"),
          ];
          this.addControlValidator("district", validators);
        }
        if (this.iSDistrictRequired == true) {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(
              data.filter(
                (f) => f.fieldName == ADDRESS_FIELDS.ADDRESSISOFIELDPROVINCE
              )[0],
              "province"
            ),
          ];
          this.addControlValidator("province", validators);
        } else {
          let validators = [
            RequiredValidator.cannotContainSpace,
            this.fieldCustomValidator(null, "province"),
          ];
          this.addControlValidator("province", validators);
        }
      });
  }

  addControlValidator(
    controlName: string,
    validators = [Validators.required, RequiredValidator.cannotContainSpace]
  ) {
    this.memberMasterAddonAddressForm.controls[controlName].setValidators(
      validators
    );
    this.memberMasterAddonAddressForm
      .get(controlName)
      .updateValueAndValidity({ emitEvent: true });
  }

  getFormData(ciebStreetAddress: CiebStreetAddress): CiebStreetAddress {
    //   ciebStreetAddress.seqEntityId = this.memberMasterAddonAddressForm.value.entityType;   todo need to check mapping for seqEntityId
    const entityTypeDesc = this.memberMasterAddonAddressForm.value.entityType;
    const entityType =
      entityTypeDesc &&
      this.ciebEntityCodes[
        this.ciebEntityCodes.findIndex(
          (code) => code.entityDesc === entityTypeDesc
        )
      ].entityDesc;
    ciebStreetAddress.effDate = Form.getDatePickerValue(
      this.memberMasterAddonAddressForm,
      "effectiveDate"
    );
    const country = this.memberMasterAddonAddressForm.get("country").value;
    ciebStreetAddress.countryCode =
      country &&
      this.countryDropdownValues[
        this.countryDropdownValues.findIndex(
          (code) => code.countryDesc === country
        )
      ].countryCode;

    ciebStreetAddress.paymentCode = 'CHK'

    ciebStreetAddress.termDate = Form.getDatePickerValue(
      this.memberMasterAddonAddressForm,
      "termDate"
    );
    ciebStreetAddress.careof = this.memberMasterAddonAddressForm.value.careOf;
    ciebStreetAddress.postalCode =
      this.memberMasterAddonAddressForm.value.postalCode;
    ciebStreetAddress.addrline1 =
      this.memberMasterAddonAddressForm.value.addressLine1;
    ciebStreetAddress.city = this.memberMasterAddonAddressForm.value.city;
    ciebStreetAddress.addrline2 =
      this.memberMasterAddonAddressForm.value.addressLine2;
    ciebStreetAddress.district =
      this.memberMasterAddonAddressForm.value.district;
    ciebStreetAddress.addrline3 =
      this.memberMasterAddonAddressForm.value.addressLine3;
    const province = this.memberMasterAddonAddressForm.get("province").value;
    if (this.makeDropDownProvince) {
      ciebStreetAddress.province =
        province &&
        this.ProvinceDropDown[
          this.ProvinceDropDown.findIndex((code) => code.stateDesc === province)
        ].stateCode;
    } else {
      ciebStreetAddress.province =
        this.memberMasterAddonAddressForm.value.province;
    }

    this.memberMasterAddonAddressForm.value.province;

    const changeReasonDesc =
      this.memberMasterAddonAddressForm.value.changeReason;
    ciebStreetAddress.changeReasonCode =
      changeReasonDesc &&
      this.ciebChangeReasonCodes[
        this.ciebChangeReasonCodes.findIndex(
          (code) => code.changeReasonDesc === changeReasonDesc
        )
      ].changeReasonCode;

    const restrictedReasonDesc =
      this.memberMasterAddonAddressForm.get('restrictedReason').value;
    ciebStreetAddress.restrictedCode =
      restrictedReasonDesc &&
      this.ciebRestrictedReasonCodes[
        this.ciebRestrictedReasonCodes.findIndex(
          (code) => code.restrictedReasonDesc === restrictedReasonDesc
        )
      ].restrictedCode;

    ciebStreetAddress.visitingProvince =
      this.memberMasterAddonAddressForm.get('visitingProvince').value;

    const stateValue = this.memberMasterAddonAddressForm.get('state').value;
    ciebStreetAddress.state =
      stateValue &&
      this.ciebStateCodes[
        this.ciebStateCodes.findIndex((code) => code.stateDesc === stateValue)
      ].stateCode;
    return ciebStreetAddress;
  }

  createCiebStreetAddress() {
    // if (this.memberMasterAddonAddressForm.invalid) {
    // 	this.alertMessageService.error('Form is invalid');
    // 	return;
    // }
    this.isFormSubmitted = false;
    let ciebStreetAddress = this.getFormData(new CiebStreetAddress());
    ciebStreetAddress.insertDatetime = null;
    ciebStreetAddress.insertUser = sessionStorage.getItem("user");
    ciebStreetAddress.insertProcess = "ADDON";

    ciebStreetAddress.addressCode = this.addressCode;
    ciebStreetAddress.seqEntityId = this.seqEntityId;

    if (this.seqEntityId) {
      ciebStreetAddress.updateDatetime = null;
      ciebStreetAddress.updateUser = null;
      ciebStreetAddress.updateProcess = null;
      this.ciebStreetAddressService
        .createCiebStreetAddress(ciebStreetAddress)
        .subscribe((resp) => {
          this.toastService.showToast(
            "Record saved successfully",
            NgbToastType.Success
          );
        });
    } else {
      let ciebEntityMaster = new CiebEntityMaster();
      ciebEntityMaster.entityCode = "SUB";
      ciebEntityMaster.seqMembId = this.seqMembId;
      ciebEntityMaster.seqSubsId = this.seqSubsId;
      ciebEntityMaster.insertDatetime = new Date();
      ciebEntityMaster.insertUser = "CIEBADM";
      ciebEntityMaster.insertProcess = "D_MM_TRG";
      ciebEntityMaster.updateDatetime = null;
      ciebEntityMaster.updateUser = null;
      ciebEntityMaster.updateProcess = null;

      this.ciebEntityMasterService
        .createCiebEntityMaster(ciebEntityMaster)
        .subscribe((resp) => {
          ciebEntityMaster = resp;
          ciebStreetAddress.seqEntityId = ciebEntityMaster.seqEntityId;
          this.ciebStreetAddressService
            .createCiebStreetAddress(ciebStreetAddress)
            .subscribe((resp) => {
              this.toastService.showToast(
                "Record saved successfully",
                NgbToastType.Success
              );
            });
        });
    }
  }

  updateCiebStreetAddress() {
    if (this.memberMasterAddonAddressForm.invalid) {
      this.showPopUp("Form is invalid", "Address");
      return;
    }
    this.isFormSubmitted = false;
    let ciebStreetAddress = this.getFormData(this.ciebStreetAddress);
    ciebStreetAddress.addressCode = this.addressCode;
    this.auditService.setAuditFields(
      ciebStreetAddress,
      sessionStorage.getItem("user"),
      this.windowId_DB,
      OPERATIONS.UPDATE
    );
    ciebStreetAddress.updateUser = null;
    ciebStreetAddress.updateProcess = null;

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
    } else {
      this.createCiebStreetAddress();
    }
  }

  resetForm() {
    this.memberMasterAddonAddressForm.reset();
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
    this.memberMasterAddonAddressForm = this.formBuilder.group({
      dynamicText: ["", { updateOn: "blur", validators: [] }],
      partnerName: ["", { updateOn: "blur", validators: [] }],
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
      payment: [
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
          updateOn: "blur",
          validators: [
            Validators.required,
            RequiredValidator.cannotContainSpace,
          ],
        },
      ],
      termDate: ["", { updateOn: "blur", validators: [] }],
      careOf: ["", { updateOn: "blur", validators: [] }],
      postalCode: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(15)] },
      ],
      addressLine1: [
        "",
        {
          updateOn: "blur",
          validators: [Validators.maxLength(60)],
        },
      ],
      city: ["", { updateOn: "blur", validators: [Validators.maxLength(40)] }],
      addressLine2: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(60)] },
      ],
      district: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(21)] },
      ],
      addressLine3: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(60)] },
      ],
      province: ["", { updateOn: "blur", validators: [] }],
      changeReason: ["", { updateOn: "blur", validators: [] }],
      restrictedReason: ["", { updateOn: "blur", validators: [] }],
      visitingProvince: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(21)] },
      ],
      state: ["", { updateOn: "blur", validators: [Validators.maxLength(21)] }],
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  findDetailByZipCode() {
    this.zipCode = new ZipCodes();
    let zipCode =
      this.memberMasterAddonAddressForm.controls["postalCode"].value;
    this.zipCodesService.getZipCode(zipCode).subscribe((resp) => {
      if (resp !== null) {
        this.zipCode = resp;
        this.setCityAndStateProvByZipCode(this.zipCode);
      }
    });
  }

  setCityAndStateProvByZipCode(zipCode: ZipCodes) {
    this.memberMasterAddonAddressForm.patchValue({
      city: zipCode.city,
      state: zipCode.state,
      zippost: zipCode.zip,
    });
  }

  fieldCustomValidator(
    record: CiebFieldValidationsModel,
    controlName: string
  ): ValidatorFn {
    let control = this.memberMasterAddonAddressForm.controls[controlName];
    if (record) {
      if (record.validationClass) {
        return (control): { [key: string]: boolean } | null => {
          if (
            control.value !== undefined &&
            (isNaN(control.value) ||
              control.value.toString().indexOf(record.validationClass) < 0)
          ) {
            return { notValid: true };
          } else {
            return { notValid: false };
          }
        };
      }
      if (record.requiredInd) {
        return (control): { [key: string]: boolean } | null => {
          if (
            record.requiredInd === "Y" &&
            !control.value &&
            control.value.length &&
            control.value.length <= 0
          ) {
            return { incorrect: true };
          } else if (
            control.value &&
            control.value.length &&
            control.value.length > 0
          ) {
            return { notrequired: true };
          } else {
            return { notrequired: false };
          }
        };
      }
    } else {
      return (control): { [key: string]: boolean } | null => {
        if (control.value && control.value.length && control.value.length > 0) {
          return { notrequired: true };
        } else {
          return { notrequired: false };
        }
      };
    }
  }

  getVisitProvinceStatus = () => {
    switch (this.addressCode) {
      case "COR":
        this.addressCodeStatus = false;
        break;
      case "EEA":
        this.addressCodeStatus = false;
        break;
      case "IDC":
        this.addressCodeStatus = false;
        break;
      case "LRA":
        this.addressCodeStatus = false;
        break;
      default:
        this.addressCodeStatus = true;
        break;
    }
    this.cdr.detectChanges();
  };

  /**
   * @description Open Bank Modal Pop
   */
  openBankModalPop(): void {
    let ref = this.modalService.open(AddressBankSearchComponent);
    ref.componentInstance.seqMembId = this.seqMembId;
  }

  changeReasonKeyEvent(event) {
    let reason = event.target.value.toLowerCase();
    if (reason === '') {
      this.ciebChangeReasonCodes = this.ciebChangeReasonCodesFiltered;
    } else {
      this.ciebChangeReasonCodes = this.ciebChangeReasonCodesFiltered.filter(it => {
        return it.changeReasonDesc.toLowerCase().includes(reason)
      })
    }
  }

  restrictedReasonKeyEvent(event) {
    let reason = event.target.value.toLowerCase();
    if (reason === '') {
      this.ciebRestrictedReasonCodes = this.ciebRestrictedReasonCodesFiltered;
    } else {
      this.ciebRestrictedReasonCodes = this.ciebRestrictedReasonCodesFiltered.filter(it => {
        return it.restrictedReasonDesc.toLowerCase().includes(reason)
      })
    }
  }

  countryKeyEvent(event) {
    let countryCode = event.target.value.toLowerCase();
    if (countryCode === '') {
      this.countryDropdownValues = this.countryDropdownValuesFiltered;
    } else {
      this.countryDropdownValues = this.countryDropdownValuesFiltered.filter(it => {
        return it.countryDesc.toLowerCase().includes(countryCode)
      })
    }
  }
}
