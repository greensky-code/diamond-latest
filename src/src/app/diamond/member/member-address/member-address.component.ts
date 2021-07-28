/* Copyright (c) 2020 . All Rights Reserved. */

import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
  ViewChild,
  ChangeDetectorRef, Input
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AgGridEvent, GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe, Location } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {
  CONSTANTS,
  getGroupMasterShortcutKeys,
  getMemberAddressShortcutKeys, SharedService
} from '../../../shared/services/shared.service';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import {AddressTypeMaster, MemberAddress, MessageMasterDtl, SecUser, SecWin, SystemCodes} from "../../../api-models"
import { MemberAddressService } from "../../../api-services/member-address.service"
import { MemberMaster } from "../../../api-models"
import { MemberMasterService } from "../../../api-services/member-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { Menu, SearchModel } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { DatePickerConfig } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberWorkingAgedComponent } from '../member-working-aged/member-working-aged.component';
import { MemberEligibilityHistoryComponent } from '../member-eligibility-history/member-eligibility-history.component';
import { MemberConditionsComponent } from '../member-conditions/member-conditions.component';
import { AliasResponsiblePartyPrivacyComponent } from '../alias-responsible-party-privacy/alias-responsible-party-privacy.component';
import { MemberMedicareComponent } from '../member-medicare/member-medicare.component';
import { MemberBillingComponent } from '../member-billing/member-billing.component';
import { MemberTerminateUnterminateComponent } from '../member-terminate-unterminate/member-terminate-unterminate.component';
import { MemberCobVerificationInformationComponent } from '../member-cob-verification-information/member-cob-verification-information.component';
import { ProviderChangeComponent } from '../provider-change/provider-change.component';
import { AddressRippleComponent } from '../address-ripple/address-ripple.component';
import { DependentVerificationStatusComponent } from '../dependent-verification-status/dependent-verification-status.component';
import { ChangeSubscriberDesignationComponent } from '../change-subscriber-designation/change-subscriber-designation.component';
import { LetterRequestComponent } from '../letter-request/letter-request.component';
import { AddDiamondIdComponent } from '../add-diamond-id/add-diamond-id.component';
import { AddressTypeMasterService } from '../../../api-services/address-type-master.service';
import {
  DddwDtlService,
  GeneralLedgerReferenceService,
  MessageMasterDtlService,
  SecUserService,
  SystemCodesService
} from '../../../api-services';
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { MemberMasterLookup } from "../../../shared/lookup/member-master-lookup";
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {HelpComponent} from "../help/help.component";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {GROUP_PANNEL_MODULE_ID} from "../../../shared/app-constants";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {NgxSpinnerService} from "ngx-spinner";

// Use the Component directive to define the MemberAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "memberaddress",
  templateUrl: "./member-address.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    MemberAddressService,
    MemberMasterService,
    AddressTypeMasterService,
    SystemCodesService,
    DddwDtlService,
  ],
})
export class MemberAddressComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  memberAddressForm: FormGroup;
  memberAddressFieldsform: FormGroup;
  formValidation: FormValidation;
  formValidation_field: FormValidation;
  public alertMessage: AlertMessage;
  private displayMessage: any;
  public popUpMessage: PopUpMessage;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;
  public datePickerConfig = DatePickerConfig;
  showAddressform = false;
  @Input() showIcon: boolean = false;
  @Input() subscriberId: string;
  @Input() selectedMember?: string;
  public menu: Menu[] = [];
  public seqMemId: any;
  public addressTypes: SystemCodes[] = [];
  public addressType: any;
  personNo: any;
  Submitted: any;
  benRefCode: any;
  benGender: any;
  sub: any;
  shortcuts: ShortcutInput[] = [];
  public addressTypeOptions: AddressTypeMaster[];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  @ViewChild("fieldForm") form: any;

  secWin: SecWinViewModel;
  windowId = 'MEMBA';
  userTemplateId: string;
  memberModuleId = GROUP_PANNEL_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  isNewRecord = true;

  searchModel = new SearchModel(
    "membermasters/lookup",
    MemberMasterLookup.MEMBER_MASTER_ALL,
    MemberMasterLookup.MEMBER_MASTER_DEFAULT,
    []
  );

  showPopUp(message, title) {
    this.popUpMessage = new PopUpMessage(
      "poUpMessageName",
      title,
      message,
      "icon"
    );
    this.popUpMessage.buttons = [
      new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
      new PopUpMessageButton("no", "No", "btn btn-primary"),
    ];
    this.child.showMesssage();
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == "yes") {
      console.log("button yes has been click!");
    }
    if (button.name == "no") {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getMemberAddressShortcutKeys(this));
    this.cdr.detectChanges();
  }

  onChangeDiamondId($event) {}

  editMemberAddress: boolean;
  memberAddress: MemberAddress[];
  memberAddresses: MemberAddress[];
  editMemberMaster: boolean;
  memberMaster: MemberMaster;
  memberMasters: MemberMaster[];
  memberMasterLength = 0;

  createMemberAddress() {
    this.Submitted = true;
    this.formValidation.validateForm();
    if (this.memberAddressFieldsform.valid) {
      let memberAddress = this.getUpdateFormData(1);

      this.memberAddressService.createMemberAddress(memberAddress).subscribe(
        (response) => {
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          this.editMemberAddress = false;
        }
      );
    } else {
      this.memberAddressFieldsform.markAllAsTouched();
      this.toastService.showToast(
        "Required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }
  checkAddressTypeAlreadyExits(addrType: any) {
    const found = this.memberAddress.some(
      (el) => el.memberAddressPrimaryKey.addressType === addrType
    );
    console.log(found);
    if (found) {
      return true;
    } else {
      return false;
    }
  }
  onAddressTypeChange(event) {
    var value = event.target.value;
    if (this.checkAddressTypeAlreadyExits(value)) {
      let popMsg = new PopUpMessage(
        "AddreessType",
        "Error",
        "9139: Entered Address Type already exits for the member and can not be added",
        "icon"
      );
      popMsg.buttons = [new PopUpMessageButton("ok", "Ok", "btn btn-primary")];
      let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popMsg;
      ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
        this.popUpButtonClicked(event);
      });
    } else {
      this.CheckAddressTypeValue(event.target.value);
    }
  }
  CheckAddressTypeValue(value: any) {
    if (value == "A1" || value == "B1" || value == "M1" || value == "R1") {
      this.memberAddressFieldsform.controls["firstName"].disable();
      this.memberAddressFieldsform.controls["lastName"].disable();
      this.memberAddressFieldsform.controls["benDob"].disable();
      this.memberAddressFieldsform.controls["benGender"].disable();
      this.memberAddressFieldsform.controls["benRefCode"].disable();
    }
    if (value == "A2" || value == "B2" || value == "M2" || value == "R2") {
      this.memberAddressFieldsform.controls["firstName"].enable();
      this.memberAddressFieldsform.controls["lastName"].enable();
      this.memberAddressFieldsform.controls["benDob"].enable();
      this.memberAddressFieldsform.controls["benGender"].enable();
      this.memberAddressFieldsform.controls["benRefCode"].enable();
    }
    if (
      value == "A3" ||
      value == "A4" ||
      value == "A5" ||
      value == "B3" ||
      value == "B4" ||
      value == "M5" ||
      value == "M3" ||
      value == "M4" ||
      value == "M5" ||
      value == "R3"
    ) {
      this.memberAddressFieldsform.controls["benDob"].disable();
      this.memberAddressFieldsform.controls["benGender"].disable();
      this.memberAddressFieldsform.controls["benRefCode"].disable();
    }
  }

  getUpdateFormData(no: any): MemberAddress {
    let memberAddress = new MemberAddress();
    var addrType = Form.getValue(this.memberAddressFieldsform, "addrType");

    memberAddress.memberAddressPrimaryKey = {};
    memberAddress.memberAddressPrimaryKey["seqMembId"] = this.seqMemId;
    memberAddress.memberAddressPrimaryKey["addressType"] = addrType;
    // if(no=2){
    // memberAddress.seqMembId = this.seqMemId;
    // memberAddress.addressType = Form.getValue(this.memberAddressFieldsform, 'addrType');
    // }
    memberAddress.lastName = Form.getValue(
      this.memberAddressFieldsform,
      "lastName"
    );
    memberAddress.firstName = Form.getValue(
      this.memberAddressFieldsform,
      "firstName"
    );
    memberAddress.addressLine1 = Form.getValue(
      this.memberAddressFieldsform,
      "addr1"
    );
    memberAddress.addressLine2 = Form.getValue(
      this.memberAddressFieldsform,
      "addr2"
    );
    memberAddress.city = Form.getValue(this.memberAddressFieldsform, "city");
    memberAddress.state = Form.getValue(this.memberAddressFieldsform, "state");
    memberAddress.country = Form.getValue(
      this.memberAddressFieldsform,
      "country"
    );
    memberAddress.zipCode = Form.getValue(
      this.memberAddressFieldsform,
      "zipCode"
    );
    memberAddress.email = Form.getValue(this.memberAddressFieldsform, "email");
    memberAddress.homePhoneNumber = Form.getValue(
      this.memberAddressFieldsform,
      "homePh"
    );
    memberAddress.mobilePhone = Form.getValue(
      this.memberAddressFieldsform,
      "mobilePh"
    );
    memberAddress.busPhoneNumber = Form.getValue(
      this.memberAddressFieldsform,
      "busPh"
    );
    memberAddress.fax = Form.getValue(this.memberAddressFieldsform, "faxNum");
    memberAddress.beneficiaryRelCode = Form.getValue(
      this.memberAddressFieldsform,
      "benRefCode"
    );
    memberAddress.beneficiaryGender = Form.getValue(
      this.memberAddressFieldsform,
      "benGender"
    );
    memberAddress.beneficiaryDob = Form.getDatePickerValue(
      this.memberAddressFieldsform,
      "benDob"
    );
    memberAddress.memAddrUserDefined1 = Form.getValue(
      this.memberAddressFieldsform,
      "userDefine1"
    );
    memberAddress.memAddrUserDefined2 = Form.getValue(
      this.memberAddressFieldsform,
      "userDefine2"
    );
    memberAddress.memAddrUserDate1 = Form.getDatePickerValue(
      this.memberAddressFieldsform,
      "userDate1"
    );
    memberAddress.memAddrUserDate2 = Form.getDatePickerValue(
      this.memberAddressFieldsform,
      "userDate2"
    );
    return memberAddress;
  }
  popUpButtonClicked(button: PopUpMessageButton) {
    if (button.name == "ok") {
      this.modalService.dismissAll();
    }
  }

  updateMemberAddress(seqMembId: number, addressType: string) {
    this.formValidation.validateForm();
    if (this.memberAddressFieldsform.valid) {
      let memberAddress = this.getUpdateFormData(2);
      this.memberAddressService
        .updateMemberAddress(memberAddress, seqMembId, addressType)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully updated.",
              NgbToastType.Success
            );
            this.editMemberAddress = true;
          }
        );
    } else {
      this.toastService.showToast(
        "Required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  saveMemberAddress() {
    if (this.editMemberAddress) {
      this.updateMemberAddress(this.seqMemId, this.addressType);
    } else {
      this.createMemberAddress();
    }
  }
  createNewAddress() {
    if (!this.editMemberAddress && !this.showAddressform) {
      let popMsg = new PopUpMessage(
        "GroupId",
        "Error",
        "13024: Subscriber Id must be entered to create a new record",
        "icon"
      );
      popMsg.buttons = [new PopUpMessageButton("ok", "Ok", "btn btn-primary")];
      let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popMsg;
      ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
        this.popUpButtonClicked(event);
      });
    } else {
      this.showAddressform = true;
      this.editMemberAddress = false;
      this.memberAddressFieldsform.reset();
      this.editMemberAddress = false;
      this.gotoForm();
    }
  }

  deleteMemberAddress(seqMembId: number) {
    this.memberAddressService.deleteMemberAddress(seqMembId).subscribe(
      (response) => {
        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
      }
    );
  }

  getMemberAddress(seqMembId: number) {
    this.memberAddressService.findBySeqMembId(seqMembId).subscribe(
      (memberAddresses) => {
        this.memberAddress = memberAddresses;
        var memAdd = [];

        memAdd = Array(this.memberAddress);
        var memberAdressData = [];
        memberAdressData = this.memberAddress;
        var personNo = this.personNo;
        var memberAdressDataFinal = memberAddresses.map(function (el) {
          var o = Object.assign({}, el);
          o["personNo"] = personNo;
          return o;
        });
        this.dataGrid002GridOptions.api.setRowData(memberAdressDataFinal);

        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
        //this.GridTwoSelection();
        //this.dataGrid002GridOptions.api.selectAll();
      }
    );
  }
  getAddressType() {
    this.SystemCodesService.getSystemCodesByLangAndtype(
      "ADDRESSTYPE",
      "0"
    ).subscribe(
      (addressTypes) => {
        this.addressTypes = addressTypes;
      }
    );
  }

  GridTwoSelection() {
    this.editMemberAddress = true;
    var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
    this.addressType = selectedRows[0].memberAddressPrimaryKey.addressType;
    this.loadForm();
    this.CheckAddressTypeValue(this.addressType);
    console.log(selectedRows[0].addressLine1);
    this.memberAddressFieldsform.patchValue({
      addrType: selectedRows[0].memberAddressPrimaryKey.addressType,
      lastName: selectedRows[0].lastName,
      firstName: selectedRows[0].firstName,
      addr1: selectedRows[0].addressLine1,
      addr2: selectedRows[0].addressLine2,
      city: selectedRows[0].city,
      state: selectedRows[0].state,
      country: selectedRows[0].country,
      zipCode: selectedRows[0].zipCode,
      emailId: selectedRows[0].email,
      homePh: selectedRows[0].homePhoneNumber,
      mobilePh: selectedRows[0].mobilePhone,
      busPh: selectedRows[0].busPhoneNumber,
      faxNum: selectedRows[0].fax,
      benRefCode: selectedRows[0].beneficiaryRelCode,
      benGender: selectedRows[0].beneficiaryGender,
      benDob: this.dateFormatPipe.defaultDisplayDateFormat(
        selectedRows[0].beneficiaryDob
      ),
      userDef1: selectedRows[0].memAddrUserDefined1,
      userDef2: selectedRows[0].memAddrUserDefined2,
      userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
        selectedRows[0].memAddrUserDate1
      ),
      userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
        selectedRows[0].memAddrUserDate2
      ),
    });
  }

  getMemberAddresses() {
    this.memberAddressService.getMemberAddresses().subscribe(
      (memberAddresses) => {
        this.memberAddresses = memberAddresses;
      }
    );
  }

  createMemberMaster() {
    this.formValidation.validateForm();
    if (this.memberAddressForm.valid) {
      let memberMaster = new MemberMaster();
      memberMaster.seqMembId = this.seqMemId;
      this.memberMasterService.createMemberMaster(memberMaster).subscribe(
        (response) => {
          this.toastService.showToast('Record successfully created', NgbToastType.Success);
          this.editMemberMaster = false;
        }
      );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  gotoForm() {
    let el = this.form.nativeElement;
    console.log(this.form.nativeElement);
    el.scrollIntoView();
  }
  updateMemberMaster(seqMembId: number) {
    this.formValidation.validateForm();
    if (this.memberAddressForm.valid) {
      let memberMaster = new MemberMaster();
      this.memberMasterService
        .updateMemberMaster(memberMaster, seqMembId)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.editMemberMaster = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveMemberMaster() {
    if (this.editMemberMaster) {
      this.updateMemberMaster(this.memberMaster.seqMembId);
    } else {
      this.createMemberMaster();
    }
  }

  deleteMemberMaster(seqMembId: number) {
    this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(
      (response) => {
        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
      }
    );
  }

  getMemberMaster(seqMembId: number) {
    this.memberMasterService.getMemberMaster(seqMembId).subscribe(
      (memberMaster) => {
        this.memberMaster = memberMaster;
        this.memberAddressForm.patchValue({});
      }
    );
  }

  getMemberMasters() {
    this.memberMasterService.getMemberMasters().subscribe(
      (memberMasters) => {
        this.memberMasters = memberMasters;

        this.dataGrid001GridOptions.api.setRowData(memberMasters);
      }
    );
  }

  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;

  dataGrid001GridOptionsExportCsv() {
    var params = {};
    this.dataGrid001gridApi.exportDataAsCsv(params);
  }

  private dataGrid002gridApi: any;
  private dataGrid002gridColumnApi: any;

  dataGrid002GridOptionsExportCsv() {
    var params = {};
    this.dataGrid002gridApi.exportDataAsCsv(params);
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid001GridOptions.editType = "fullRow";
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Person No",
        field: "personNumber",
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Last",
        field: "lastName",
        width: 100,
      },
      {
        headerName: "First",
        field: "firstName",
        width: 100,
      },
      {
        headerName: "DOB",
        field: "dateOfBirth",
        width: 100,
      },
      {
        headerName: "Gender",
        field: "gender",
        width: 150,
      },
      {
        headerName: "Employee Number",
        field: "employeeNo",
        width: 200,
      },
      {
        headerName: "Citizenship",
        field: "city",
        width: 200,
      },
    ];
  }

  createDataGrid002(): void {
    this.dataGrid002GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid002GridOptions.editType = "fullRow";
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: "Person No",
        field: "personNo",
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Add Type",
        field: "memberAddressPrimaryKey.addressType",
        width: 150,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        width: 150,
      },
      {
        headerName: "Address line 1",
        field: "addressLine1",
        width: 200,
      },
      {
        headerName: "City",
        field: "city",
        width: 150,
      },
      {
        headerName: "Country",
        field: "country",
        width: 150,
      },
      {
        headerName: "State",
        field: "state",
        width: 150,
      },
      {
        headerName: "Zip Code",
        field: "zipCode",
        width: 100,
      },
    ];
  }

  onChangeSubscriberId(event: any) {
    this.memberAddressForm.patchValue({ subscriberId: event.target.value });
    this.loadGrids();
  }
  getBenRefCodeDropDown() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "beneficiary_rel_code",
      "dw_memba_de"
    ).subscribe(
      (code) => {
        this.benRefCode = code;
      },
      (error) => {}
    );
  }
  getBenGender() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "beneficiary_gender",
      "dw_memba_de"
    ).subscribe(
      (code) => {
        this.benGender = code;
      },
      (error) => {}
    );
  }

  loadGrids() {
    this.memberMasterService
      .findByDiamondAndSubscriberId(
        null,
        this.memberAddressForm.get("subscriberId").value
      )
      .subscribe(
        (memberMasters) => {
          if (memberMasters && memberMasters.length > 1) {
            this.memberMasterLength = memberMasters.length - 1;
          }
          this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex(key => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
          this.seqMemId = this.memberMaster.seqMembId;
          this.dataGrid001GridOptions.api.setRowData(memberMasters);
          this.personNo = this.memberMaster.personNumber;
          this.getMemberAddress(this.seqMemId);
          this.dataGrid001GridOptions.api.selectIndex(this.selectedMember ? memberMasters.findIndex(key => key.seqMembId == this.selectedMember) : 0, false, false);
        }
      );
  }

  loadForm() {
    this.showAddressform = true;
  }

  // Use constructor injection to inject an instance of a FormBuilder
  @Input() winID?: string;
  searchStatus: boolean = false;
  keyNames: string = "subscriber_id";
  keyValues: any;
  @Input() SubID?: string;

  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public myElement: ElementRef,
    private cdr: ChangeDetectorRef,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private toastService: ToastService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    private SystemCodesService: SystemCodesService,
    private addressTypeService: AddressTypeMasterService,
    private DddwDtlService: DddwDtlService,
    private memberAddressService: MemberAddressService,
    private memberMasterService: MemberMasterService,
    private location: Location,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService,
    private sharedService: SharedService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService,
    private spinner: NgxSpinnerService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  initializeComponentState() {
    this.createForm();
    this.createAddressForm();
    this.getAddressType();
    this.getBenGender();
    this.getBenRefCodeDropDown();
    this.displayMessage = {};
    this.menuInit();
    this.formValidation = new FormValidation(this.memberAddressForm);
    this.formValidation_field = new FormValidation(
        this.memberAddressFieldsform
    );

    this.createDataGrid001();
    this.createDataGrid002();
    setTimeout(() => {
      this.dataGrid001GridOptions.api.setRowData([]);
      this.dataGrid002GridOptions.api.setRowData([]);
    },100);

    this.sub = this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.memberAddressForm.patchValue({
          subscriberId: params["id"],
        });
        this.loadGrids();
        this.location.replaceState("diamond/member/address");
      }
      // In a real app: dispatch action to load the details here.
    });
    //If opens from popup
    setTimeout(() => {
      if(this.SubID){
        this.memberAddressForm.patchValue({
          subscriberId: this.SubID,
        });
        this.loadGrids();
      }
    }, 500);
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
                'You are not Permitted to view Member Address',
                'Member Address Permission'
            );
          }
        }, (error: any) => {
          console.log(error);
          this.messageService.findByMessageId(29055).subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp(
                "29055: " + message[0].messageText,
                "Member Address "
            );
          });
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
    this.secColDetailService.findByTableNameAndUserId('MEMBER_ADDRESS', secUser.userId).subscribe((resp: SecColDetail[]) => {
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
    this.memberAddressForm = this.formBuilder.group(
      {
        diamondId: ["", { updateOn: "blur", validators: [] }],
        subscriberId: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  createAddressForm() {
    this.memberAddressFieldsform = this.formBuilder.group({
      addrType: ["", { updateOn: "blur", validators: [Validators.required] }],
      firstName: ["", { updateOn: "blur" }],
      lastName: ["", { updateOn: "blur" }],
      addr1: ["", { updateOn: "blur", Validators: [Validators.required] }],
      addr2: ["", { updateOn: "blur", Validators: [] }],
      city: ["", { updateOn: "blur", validators: [Validators.required] }],
      state: ["", { updateOn: "blur", validators: [Validators.required] }],
      country: ["", { updateOn: "blur", validators: [] }],
      zipCode: [
        "",
        { updateOn: "blur", validators: [Validators.maxLength(15)] },
      ],
      emailId: ["", { updateOn: "blur", validators: [] }],
      homePh: ["", { updateOn: "blur", validators: [] }],
      mobilePh: ["", { updateOn: "blur", validators: [] }],
      busPh: ["", { updateOn: "blur", validators: [] }],
      faxNum: ["", { updateOn: "blur", validators: [] }],
      benRefCode: ["", { updateOn: "blur", validators: [] }],
      benGender: ["", { updateOn: "blur", validators: [Validators.required] }],
      benDob: ["", { updateOn: "blur", validators: [] }],
      userDef1: ["", { updateOn: "blur", validators: [] }],
      userDef2: ["", { updateOn: "blur", validators: [] }],
      userDate1: ["", { updateOn: "blur", validators: [] }],
      userDate2: ["", { updateOn: "blur", validators: [] }],
    });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onMenuItemClick(event) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewAddress();
          break;
        }
        case "Open": {
          //statements;
          break;
        }
        case "Save": {
          this.saveMemberAddress();
          break;
        }
        case "Close": {
          //this.showMemberMasterField = false;
          //this.memberMasterForm.reset();
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        default: {
          this.toastService.showToast(
            "Action is not valid",
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem === "Edit") {
      // handle Edit-Menu Actions
      // add method to handle Edit actions
    } else if (event.menu.menuItem === "Topic") {
      // handle Topic-Menu Actions
      this.sharedService.onMemberModuleTopicMenuClick(
          event.action,
          'Member Address',
          this.activeModal,
          this.memberMaster ? this.memberAddressForm.get('subscriberId').value : '',
          this.selectedMember ? this.selectedMember : ''
      );
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      this.handleSpecialMenu(event.action);
    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Audit Display": {
          if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
              CONSTANTS.F_AUDIT,
              this.winID
            );
            if (status) {
              let ref = this.modalService.open(AuditDisplayComponent, {
                size: "lg",
              });
              ref.componentInstance.keyNames = this.keyNames;
              ref.componentInstance.keyValues = this.keyValues;
              ref.componentInstance.winID = this.winID;
              ref.componentInstance.showIcon = true;
            } else {
              this.messageService
                .findByMessageId(11073)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.alertMessage = this.alertMessageService.error(
                    "11073: " + message[0].messageText
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  "30164: " + message[0].messageText
                );
              });
          }

          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
       this.helpScreen();
    }
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open" },
          { name: "Save" },
          { name: "Close" },
          { name: "-" },
          { name: "Main Menu" },
          { name: "Shortcut Menu" },
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit" },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", disabled: true },
          { isHorizontal: true },
          { name: "Cut", disabled: true },
          { name: "Copy", disabled: true },
          { name: "Paste", disabled: true },
          { isHorizontal: true },
          { name: "Next" },
          { name: "Previous" },
          { isHorizontal: true },
          { name: "Lookup" },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Master File" },
          { name: "Eligibility History" },
          { name: "Coordination of Benefits" },
          { name: "Alias/Responsible Party/Privacy" },
          { name: "Member Address" },
          { name: "M+C Information" },
          { name: "Working Aged" },
          { name: "Billing Control" },
          { name: "Conditions" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "Member Lookup" }],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Tile" },
          { name: "Layer" },
          { name: "Cascade" },
          { name: "Arrange Icons" },
          { isHorizontal: true },
          { name: "Show Timestamp" },
          { name: "Audit Display" },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Member Address" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window", shortcutKey: 'F1' },
          { isHorizontal: true },
          { name: "Glossary" },
          { name: "Getting Started" },
          { name: "How to use Help" },
          { isHorizontal: true },
          { name: "About Diamond Client/Server" },
        ],
      },
    ];
  }

  private handleSpecialMenu(action: string) {
    switch (action) {
      case "Member Lookup": {
        this.openLookupPage();
        break;
      }
      case "Terminate/Unterminate": {
        const ref = this.modalService.open(
          MemberTerminateUnterminateComponent,
          { size: <any>"xl" }
        );
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Member COB Verification information": {
        // if (this.showMemberMasterField) {
        //     let ref = this.modalService.open(MemberCobVerificationInformationComponent, { size: <any>'xl' });
        //     //TODO : Hard coded member sequence id should be removed
        //     ref.componentInstance.seqMembId = this.memberMaster ? this.memberMaster.seqMembId : 10;
        //     ref.componentInstance["onSubmit"].subscribe((event: boolean) => {
        //         if (event) {
        //             ref.close();
        //         }
        //     });
        // } else {
        //     this.toastService.showToast('Please select/create a member master first.', NgbToastType.Danger);
        // }
        break;
      }
      case "Provider Change": {
        const ref = this.modalService.open(ProviderChangeComponent, {
          size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Modify Existing Provider": {
        const id = this.memberAddressFieldsform.value.pcpId;
        if (id && id !== null) {
          const ref = this.modalService.open(ProviderChangeComponent, {
            size: <any>"xl",
          });
          ref.componentInstance.showIcon = true;
        } else {
          this.toastService.showToast("Enter Provider Id", NgbToastType.Danger);
        }
        break;
      }
      case "Address Ripple": {
        let ref = this.modalService.open(AddressRippleComponent);
        ref.componentInstance.seqMemId = this.seqMemId;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.memberAddress = this.memberAddress;
        ref.componentInstance.emitResponse.subscribe((resp) => {
          this.getMemberAddress(this.seqMemId);
        });
        break;
      }
      case "Verify Student/Dependent Status": {
        const ref = this.modalService.open(
          DependentVerificationStatusComponent
        );
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Subscriber Designation": {
        const ref = this.modalService.open(
          ChangeSubscriberDesignationComponent
        );
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Letter Request": {
        const ref = this.modalService.open(LetterRequestComponent);
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Add Diamond ID": {
        const ref = this.modalService.open(AddDiamondIdComponent);
        ref.componentInstance.showIcon = true;
        break;
      }
      default: {
        this.toastService.showToast(
          "This option is not implemented yet",
          NgbToastType.Danger
        );
        break;
      }
    }
  }

  openLookupPage() {
    let ref = this.modalService.open(LookupComponent);
    ref.componentInstance.showIcon = true;
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      this.memberAddressForm.patchValue({
        subscriberId: resp.subscriberId,
        diamondId: resp.diamondId,
      });
      this.selectedMember = resp.personNumber;
      this.loadGrids();
    });
  }

  onLookupFieldChange(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupPage();
    }
  }

  onChangeMemberMasterGrid() {
    var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    if (selectedRows.length === 1) {
      this.searchStatus = true;
      this.keyValues = selectedRows[0].subscriberId;
    } else {
      this.searchStatus = false;
      this.keyValues = "";
    }
  }

  helpScreen = () => {
      const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.currentWin = '/MEMBA_Member_Address.htm';
  }
}
