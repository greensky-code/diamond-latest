/* Copyright (c) 2021 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOptions } from "ag-grid-community";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { AlertMessage, AlertMessageService } from "../../../shared/components/alert-message";
import { MessageType, PopUpMessage, PopUpMessageButton } from "../../../shared/components/pop-up-message";
import { DatePickerConfig, DatePickerModel } from "../../../shared/config";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { SecurityService } from "../../../shared/services/security.service";
import { ProcGetPricingAccntCodes } from "../../../api-models/addon/proc-get-pricing-accnt-codes.input-model";
import { ProcGetPricingAccntCodesViewModel } from "../../../api-models/addon/proc-get-pricing-accnt-codes.view-model";
import { ProcGetPricingAccntCodesService } from "../../../api-services/addon/proc-get-pricing-accnt-codes.stored-procedure.service";
import { SecUser, SecWin } from "../../../api-models";
import { SecUserService } from "../../../api-services";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { DynamicConfigFormRow, FORM_FIELD_ACTION_TYPES, FormField, FormRow, Option } from "../../../shared/models/models";
import { ProvContractSpecialty } from "../../../api-models/prov-contract-specialty.model";
import {
  ContactConfig,
  ContactFields,
  PricingPartnerDetailFields,
  PricingPartnerDetailsConfig
} from "../addon.constants";
import { NgbToastType } from "ngb-toast";
import { CiebContactService } from '../../../api-services/addon/cieb-contact.service';
import { CiebContactModel } from '../../../api-models/addon/cieb-contacts.model';
import { Form } from '../../../shared/helpers/form.helper';
import { CiebAddonMeConfigService } from '../../../api-services/addon/cieb-addon-me-config.service';
import { ToastService } from "../../../shared/services/toast.service";
import { IMyDateModel, IMySingleDateModel } from "angular-mydatepicker";
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { getAddonCignaLinkContactsShortcuts, getGroupDetailShortcutKeys } from '../../../shared/services/shared.service';
import { CiebContactCode } from '../../../api-models/cieb-contact-code.model';
import { CiebContactCodeService } from '../../../api-services/cieb-contact-code.service';
import {forkJoin} from "rxjs";

// Use the Component directive to define the PricingPartnerDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "adon-contact",
  templateUrl: "./adon-contact.component.html",
})
export class AdonContactComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() showIcon = true;
  @Input() subscriberId; // default value for testing.. TODO need to remove test values
  @Input() groupName: string = "DORIS";
  @Input() seqEntityId: number;
  ciebContactCode: CiebContactCode[] = [];

  addonContactForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId = "CIEBACON";
  public isSuperUser = false;
  public secProgress = true;
  descriptionDropdownOptions = new Array<Option>()

  userTemplateId = null;
  secColDetails = new Array<SecColDetail>();

  shortcuts: ShortcutInput[] = [];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private ciebContactCodeService: CiebContactCodeService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private procGetPricingAccntCodesService: ProcGetPricingAccntCodesService,
    private ciebContactService: CiebContactService,
    public ngbActiveModal: NgbActiveModal,
    private cdr: ChangeDetectorRef
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getAddonCignaLinkContactsShortcuts(this));
    this.cdr.detectChanges();
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

  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.addonContactForm);
    this.createDataGrid();
     this.getProcGetPricingAccntCodes();
    this.getContactDetails();
  }

  getContactDetails() {
    this.ciebContactCodeService.getAllCiebContactCode().subscribe((resp: any) => {
      this.ciebContactCode = resp
      this.ciebContactCode.forEach((ciebContactCode: CiebContactCode, index ) => {
        this.descriptionDropdownOptions.push({ key: ciebContactCode.contactDesc, value: ciebContactCode.contactCode });
      });
      this.pricingPartnerDetailsConfig.map(field => field.name === ContactFields.DESCRIPTION ? field.options = this.descriptionDropdownOptions : '')
    })
    this.ciebContactService.getCiebContactBySeqEntityId(this.seqEntityId).subscribe((resp: any) => {
      this.ciebPricingAccntCodes = resp;
      });

    setTimeout(() => {
      this.populateDynamicForm();
    }, 4000)
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
            "You are not Permitted to view Pricing Partner",
            "Pricing Partner Permission"
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
    // ------------------------------ TODO need to change tableName------------------------------------------
    this.secColDetailService
      .findByTableNameAndUserId("PROFSVC_CLAIM_HEADER", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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

  procGetPricingAccntCodes: ProcGetPricingAccntCodes;
  procGetPricingAccntCode: ProcGetPricingAccntCodes[];
  ProcGetPricingAccntCodesViewModels: ProcGetPricingAccntCodesViewModel[];

  getProcGetPricingAccntCodes() {
    let procGetPricingAccntCodes = new ProcGetPricingAccntCodes();
    procGetPricingAccntCodes.pgroupId = this.subscriberId;
    this.procGetPricingAccntCodesService
      .procGetPricingAccntCodes(procGetPricingAccntCodes.pgroupId)
      .subscribe(
        (procGetPricingAccntCode) => {
          this.ProcGetPricingAccntCodesViewModels = procGetPricingAccntCode;
        },
        (error) => {
          this.alertMessage = this.alertMessageService.error(
            "An Error occurred while retrieving records."
          );
        }
      );
  }

  setProcGetPricingAccntCodes(
    ProcGetPricingAccntCodesViewModel: ProcGetPricingAccntCodesViewModel
  ) {
    this.addonContactForm.patchValue({
      pSeqGroupId: ProcGetPricingAccntCodesViewModel.pSeqGroupId,
      "Add data mapping for:pGroupName":
        ProcGetPricingAccntCodesViewModel.pGroupName,
      "Add data mapping for:pResult": ProcGetPricingAccntCodesViewModel.pResult,
    });
  }

  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Description",
        field: "",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "First Name",
        field: "",
        width: 200,
      },
      {
        headerName: "Last Name",
        field: "",
        width: 200,
      },
      {
        headerName: "Email Address",
        field: "",
        width: 200,
      },
      {
        headerName: "Effective Date",
        field: "",
        width: 200,
      },
      {
        headerName: "Term Date",
        field: "pgroupid",
        width: 200,
      },
    ];
  }

  // -------------------------------------------- Speciality grid
  ciebPricingAccntCodes: CiebContactModel[] = [];
  pricingPartnerDetailsConfig = ContactConfig;
  pricingPartnerDetailsFormState = new Array<DynamicConfigFormRow>();

  resetInlineGrid = false;

  /**
   * form date to grid state
   */
  populateDynamicForm() {
    const values = this.ciebPricingAccntCodes;
    if (!values || values.length < 1) {
      return;
    }
    values.forEach((value: CiebContactModel) => {
      let mockConfig = JSON.parse(
          JSON.stringify(this.pricingPartnerDetailsConfig)
      ); // make a copy of original config
      let formState: FormRow = new FormRow();

      mockConfig.forEach((field, index) => {
        if (field.name === ContactFields.EFFECTIVE_DATE) {
          mockConfig[index].value = value.effDate;
          mockConfig[index].data[0].value = value.phoneExt;
        } else if (field.name === ContactFields.TERM_DATE) {
          mockConfig[index].value = value.termDate;
          mockConfig[index].value = value.termDate;
        } else if (field.name === ContactFields.EMAIL_ADDRESS) {
          mockConfig[index].value = value.emailAddress;
          mockConfig[index].data[0].value = value.phoneNum;
        } else if (field.name === ContactFields.LAST_NAME) {
          mockConfig[index].value = value.lastName;
        } else if (field.name === ContactFields.FIRST_NAME) {
          mockConfig[index].value = value.firstName;
        } else if (field.name === ContactFields.DESCRIPTION) {
          mockConfig[index].value = value.contactCode;
          mockConfig[index].options = this.descriptionDropdownOptions
        } else if (field.name === ContactFields.PHONE_NUMBER) {
          mockConfig[index].value = value.phoneNum;
        } else if (field.name === ContactFields.EXTENSION) {
          mockConfig[index].value = value.phoneExt;
        }
      });

      formState.formFields = mockConfig;
      formState.id = {
        provContractSpecialty: value,
      };
      formState.action = null;
      this.pricingPartnerDetailsFormState.push(formState); // add record
    });

    this.pricingPartnerDetailsConfig = JSON.parse(
      JSON.stringify(this.pricingPartnerDetailsConfig)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    this.pricingPartnerDetailsFormState = JSON.parse(
      JSON.stringify(this.pricingPartnerDetailsFormState)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }

  saveFormByShortcut() {
    document.getElementById("addonContactFormDynamicGrid").click();
  }

  public saveForm($event) {
    this.pricingPartnerDetailsFormState = $event.formState;
    let event = $event.fields;
    let apiValues = new Array<CiebContactModel>();

    const updatedRecords: FormRow[] =
      this.pricingPartnerDetailsFormState.filter(
        (record) =>
          record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
          record.action === FORM_FIELD_ACTION_TYPES.DELETE
      );

    if (updatedRecords.length > 0) {
      updatedRecords.forEach((preStateRecord: FormRow, index) => {
        if (preStateRecord.action) {
          let updatedRecord = event[index];
          const pair = Object.keys(updatedRecord).map((k) => ({
            key: k,
            value: updatedRecord[k],
          }));

          let ciebContactModel: CiebContactModel = preStateRecord.id;

          let apiValue: CiebContactModel = this.populateFormFields(
            ciebContactModel,
            pair,
            preStateRecord.action
          );
          apiValues.push(apiValue);
        }
      });
    }

    this.pricingPartnerDetailsFormState.forEach((record, index) => {
      if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
        let ciebContactModel = new CiebContactModel();

        let newRecord = event[index];
        const pair = Object.keys(event[index]).map((k) => ({
          key: k,
          value: newRecord[k],
        }));
        let apiValue: CiebContactModel = this.populateFormFields(
          ciebContactModel,
          pair,
          FORM_FIELD_ACTION_TYPES.ADD
        );
        apiValues.push(apiValue);
      }
    });

    apiValues.forEach((value) => {
      if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
        value.effDate = Form.getDatePicker(value.effDate.singleDate.date);
        value.termDate = Form.getDatePicker(value.termDate.singleDate.date);
        value.contactCode = value.contactCode ? value.contactCode : "CLC";
        value.seqEntityId = this.seqEntityId;
        let possible = "1234567890";
        const lengthOfCode = 6;
        let id = this.makeRandom(lengthOfCode, possible);
        value.seqContactId = parseInt(id);
        this.ciebContactService
          .createCiebPricingAccntCode(value)
          .subscribe((resp) => {
            this.toastService.showToast(
              "Created successfully.",
              NgbToastType.Success
            );
          });
      } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
        value.effDate = Form.getDatePicker(value.effDate.singleDate.date);
        value.termDate = Form.getDatePicker(value.termDate.singleDate.date);
        value.seqContactId = value.provContractSpecialty.seqContactId;
        value.contactCode = value.contactCode
          ? value.contactCode
          : value.provContractSpecialty.contactCode;
        value.seqEntityId = value.provContractSpecialty.seqEntityId;
        this.ciebContactService
          .updateCiebPricingAccntCode(value, value.seqContactId)
          .subscribe((resp) => {
            this.toastService.showToast(
              "Updated successfully.",
              NgbToastType.Success
            );
          });
      }
    });
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  /**
   * populate fields to models
   * @param event
   * @param action
   */
  populateFormFields(
    ciebContactModel: CiebContactModel,
    event: any,
    action: FORM_FIELD_ACTION_TYPES
  ): CiebContactModel {
    ciebContactModel.description = event[0].value;
    ciebContactModel.contactCode = event[0].value;
    ciebContactModel.firstName = event[1].value;
    ciebContactModel.lastName = event[2].value;
    ciebContactModel.emailAddress = event[3].value;
    ciebContactModel.phoneNum = event[4].value;
    ciebContactModel.effDate = event[5].value;
    ciebContactModel.phoneExt = event[6].value;
    ciebContactModel.termDate = event[7].value;
    ciebContactModel.action = action;
    return ciebContactModel;
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  submitButtonText = "Save Changes";
  showResetButton = "Reset All";
  restoreBtnText = "Reset All";
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.addonContactForm = this.formBuilder.group(
      {
        dynamicText001: ["", { updateOn: "blur", validators: [] }],
        dynamicText002: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  /**
   * Handle Pricing partner form details validations
   */
  formFieldValueChanged($event) {
    let field: FormField = $event.formField;
    console.log(field);

    const index: number = $event.index;
    let form: FormGroup = $event.field;
    let prevState: Array<DynamicConfigFormRow> = $event.prevState;

    if (field.name === ContactFields.TERM_DATE + index) {
      /// -------------------------validate term date
      const termDate = $event.dateEvent;

      let d = termDate?.singleDate?.date;
      if (d) {
        let dateStr1 =
          d.year +
          "-" +
          this.addPrefixZero(d.month) +
          "-" +
          this.addPrefixZero(d.day);
        let dateStr2 = Form.getDatePickerValue(
          form,
          field.compareField + "" + index
        );
        if (dateStr1 && dateStr2) {
          let date1 = new Date(dateStr1);
          let date2 = new Date(dateStr2);
          setTimeout(() => {
            if (date1 < date2) {
              form.controls[field.name].setValue(null);
              this.showPopUp(
                "Term date should be greater than effective date",
                "Contacts"
              );
            }
          }, 200);
        }
      }
    }
  }

  public addPrefixZero(value) {
    return value < 10 ? "0" + value : value;
  }

  public resetAllClick() {

  }
}
