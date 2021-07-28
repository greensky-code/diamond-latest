/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import {
  PopUpMessage,
  PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {
  DatePickerConfig,
  DatePickerModel,
  NGBModalOptions,
} from "../../../shared/config";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import {
  AlertMessage,
  AlertMessageService,
} from "../../../shared/components/alert-message/index";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { GroupMaster, SecUser, SecWin } from "../../../api-models";
import { SecurityService } from "../../../shared/services/security.service";
import { SecUserService } from "../../../api-services/security/sec-user.service";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import {
  CignaLinkDetailsConfig,
  CignaLinkGroupFields,
} from "../addon.constants";
import {
  DynamicConfigFormRow,
  FormField,
  FormRow,
  Option,
} from "../../../shared/models/models";
import { GridOptions } from "ag-grid-community";
import { CIGNA_LINK_DETAILS } from "../../../shared/app-constants";
import { GroupMasterService } from "../../../api-services";
import { ProcGetGroupAddr } from "../../../api-models/addon/proc-get-group-addr.input-model";
import { ProcGetGroupAddrService } from "../../../api-services/addon/proc-get-group-addr.stored-procedure.service";
import { CignalinkDetailsModel } from "../../../api-models/addon/proc-get-group-addr.view-model";
import { CignalinksContactsComponent } from "../cignalinks-contacts/cignalinks-contacts.component";
import { CignaLinkDetailsService } from "../../../api-services/addon/sp/cigna-link-details.service";
import { ToastService } from "../../../shared/services/toast.service";
import { NgbToastType } from "ngb-toast";
import { CignaLinkCloneModel } from "../../../api-models/addon/cigna-link-clone-model";
import { CignaLinkMaintenanceModel } from "../../../api-models/addon/cigna-link-maintenance-model";
import { finalize } from "rxjs/operators";
import { Form } from "../../../shared/helpers/form.helper";
import { ButtonCellComponent } from "../../../shared/components/button-cell/button-cell.component";
import { Console } from "console";

@Component({
  selector: "cigna-link-details",
  templateUrl: "./cigna-link-details.component.html",
})
export class CignaLinkDetailsComponent implements OnInit {
  @Input() showIcon = true;
  @Input() groupNumber: string;
  @Input() groupName: string;
  @Input() seqGroupId: number;
  @Input() seqAddressId: string;
  @Input() entityType = "Group";

  groupMaster: GroupMaster;

  activeTab = 1;

  cignaLinkDetailsForm: FormGroup | any;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  public isSuperUser = false;
  public secProgress = true;
  public userTemplateId: string;
  public secColDetails = new Array<SecColDetail>();
  public dataGridGridOptions: GridOptions;
  inProgress = true;
  memberModuleId = CIGNA_LINK_DETAILS;
  windowId = "CIEBCLGM";
  dataGridgridApi: any;
  cignaLinkDetailsGroups: CignalinkDetailsModel[] = [];
  cignaLinkDetailsConfig = CignaLinkDetailsConfig;
  cignaLinkDetailsFormState = new Array<DynamicConfigFormRow>();
  resetInlineGrid = false;
  saveInlineGrid = false;
  activeIds: string[] = ['panel-0', 'panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5', 'panel-6', 'panel-7','panel-8', 'panel-9','panel-10'];
  entityId: number;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild("cignLinkDetailsCloneTemplate")
  cignLinkDetailsCloneTemplate: ElementRef;
  @ViewChild("countryCloneTemplate") countryCloneTemplate: ElementRef;
  @ViewChild("cignLinkDetailsViewHistoryTemplate")
  cignLinkDetailsViewHistoryTemplate: ElementRef;

  isInitialDataLoaded = false;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private groupMasterService: GroupMasterService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private procGetGroupAddrService: ProcGetGroupAddrService,
    public ngbActiveModal: NgbActiveModal,
    private cignaLinkDetailsService: CignaLinkDetailsService,
    private toastService: ToastService
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    if (this.groupNumber === undefined) {
      this.groupNumber = "00008A001";
    }

    if (this.groupName === undefined) {
      this.groupName = "DORIS";
    }
    this.hasPermission();
  }

  provIndexDropdownValues = new Array<Option>();
  renewalIndexDropdowns = new Array<Option>();

  initializeComponentState(): void {
    this.getAllGroupsByGroupId();
    this.provIndexDropdownValues.push({ key: "YES", value: "Y" });
    this.provIndexDropdownValues.push({ key: "NO", value: "N" });

    this.renewalIndexDropdowns.push({ key: "YES", value: "Y" });
    this.renewalIndexDropdowns.push({ key: "N/A", value: "" });

    if (this.groupNumber) {
      this.groupMasterService
        .getGroupMasterByGroupId(this.groupNumber)
        .subscribe(
          (groupMaster: GroupMaster) => {
            this.groupMaster = groupMaster;
            this.getGroupAddr();
          },
          (error) => {
            console.log(error);
            this.isInitialDataLoaded = true;
          }
        );
    }
  }

  initForm() {
    this.groupedContacts = Array.from(
      Object.keys(this.groupedContacts),
      (k) => [`${k}`, this.groupedContacts[k]]
    );
    let groups: any = [] = [];
    this.groupedContacts.forEach((data, index: number) => {
      let rows: any = [] = [];
      data[1].forEach((row: any) => {
        let rowObj: any;
        rowObj = this.getRow(row);
        if (rowObj.value) {
          console.log();
          let updateLinkStatus = this.getUpdateLinkStatus(rowObj.value, row.addrCountryFlag);
          rowObj.updateLinkStatus = updateLinkStatus;
          rows.push(rowObj);
        }

      });
      groups.push({ group: data[0], rows });
    });
    this.cignaLinkDetailsForm = groups;
    this.showForm = true;
  }

  getUpdateLinkStatus(obj: any, addrCountryFlag: any) {
    let status: number = 0;
    if (addrCountryFlag) {
      if (addrCountryFlag === "N") {
        status = 2;// To hide update link
      } else {
        if (obj) {
          if ((obj.participationInd) && (obj.effDate)) {
            status = 1; // for enable update link
          } else {
            status = 0; // For disable update link
          }
        }
      }
    } else {
      if (obj) {
        if ((obj.participationInd) && (obj.effDate)) {
          status = 1; // for enable update link
        } else {
          status = 0; // For disable update link
        }
      }
    }
    return status;
  }

  showForm = false;

  // convenience getters for easy access to form fields

  getRow(data: CignalinkDetailsModel) {
    let provinceInd = "No",
      renewalInd = "No",
      contactAdd,
      clonable = false;
    if (data.countryCode == "CAN") {
      provinceInd = "Yes"; // 'Y'
    }

    if ("NEURON" == data.partnerCode && "AE1" == data.noteType) {
      renewalInd = data.AutoRenewFlag == "Y" ? "Yes" : "";
    }
    if (data.addrCountryFlag != "N") {
      contactAdd = "Update";
    }

    if (data.cLink !== 1) {
      clonable = true;
    }

    const effDate = this.dateFormatPipe.defaultDisplayDateFormat(data.effDate);
    const termDate = this.dateFormatPipe.defaultDisplayDateFormat(
      data.termDate
    );
    const renewalDate = this.dateFormatPipe.defaultDisplayDateFormat(
      data.renewalDate
    );

    return this.formBuilder.group({
      participationInd: [
        data.cLink == "1" ? true : false || this.allSelected,
        { updateOn: "blur", validators: [] },
      ],
      provIndex: [provinceInd, { updateOn: "blur", validators: [] }],
      countryName: [data.countryName, { updateOn: "blur", validators: [] }],
      noteType: [data.noteType, { updateOn: "blur", validators: [] }],
      effDate: [effDate, { updateOn: "blur", validators: [] }],
      termDate: [termDate, { updateOn: "blur", validators: [] }],
      renewalDate: [renewalDate, { updateOn: "blur", validators: [] }],
      renewalInd: [renewalInd, { updateOn: "blur", validators: [] }],
      contactOrAdd: ["Update", { updateOn: "blur", validators: [] }],
      cloneCountry: [
        "Clone",
        { disabled: clonable, updateOn: "blur", validators: [] },
      ],
      seqCodeId: [
        data.seqCodeId,
        { disabled: clonable, updateOn: "blur", validators: [] },
      ],
      seqGroupId: [
        data.seqGroupId,
        { disabled: clonable, updateOn: "blur", validators: [] },
      ],
    });
  }

  getFormData(
    formGroup: FormGroup,
    data: CignalinkDetailsModel
  ): CignalinkDetailsModel {
    const participationInd = formGroup.value.participationInd;
    data.cLink = participationInd === true ? 1 : 0;
    data.countryName = formGroup.value.countryName;
    data.noteType = formGroup.value.noteType;
    data.effDate = Form.getDatePickerValue(formGroup, "effDate");
    data.termDate = Form.getDatePickerValue(formGroup, "termDate");
    data.renewalDate = Form.getDatePickerValue(formGroup, "renewalDate");
    data.countryName = formGroup.value.countryName;
    return data;
  }

  onDateChanges(i, $event) {
    // add date field validations
    console.log($event);
  }

  allSelected: boolean = false;

  onChangeSelectAll(event) {
    this.allSelected = !this.allSelected;
    this.activeIds = ['panel-0', 'panel-1', 'panel-2', 'panel-3', 'panel-4', 'panel-5', 'panel-6', 'panel-7', 'panel-8', 'panel-9', 'panel-10'];
    this.getGroupAddr();
  }

  getGroupAddr() {
    let obj: ProcGetGroupAddr = new ProcGetGroupAddr();
    obj.pGroupId = this.groupNumber;
    this.procGetGroupAddrService
      .procGetGroupAddr(obj)
      .then((res: CignalinkDetailsModel[]) => {
        this.cignaLinkDetailsGroups = res;
        this.formatContactDetails(res);
      });
  }

  groupedContacts: any;

  formatContactDetails(cignalinkDetails: CignalinkDetailsModel[]) {
    let data = {};
    cignalinkDetails.forEach((cignalinkDetail: CignalinkDetailsModel, i) => {
      const group = cignalinkDetail.partnerCode;
      if (data[group]) {
        data[group].push(cignalinkDetail);
      } else {
        data[group] = [cignalinkDetail];
      }
    });
    this.groupedContacts = data;
    this.initForm();
  }

  populateDynamicForm() {
    const values = this.cignaLinkDetailsGroups;

    // set dynamic grid dropdown values
    this.cignaLinkDetailsConfig.forEach((field: FormField) => {
      field.options = new Array<Option>();

      if (field.name == CignaLinkGroupFields.PROVINCE_IND) {
        field.options.push({ key: "YES", value: "Y" });
        field.options.push({ key: "NO", value: "N" });
      } else if (field.name == CignaLinkGroupFields.RENEWAL_IND) {
        field.options.push({ key: "YES", value: "Y" });
        field.options.push({ key: "N/A", value: "" });
      }
    });

    values &&
      values.length > 0 &&
      values.forEach((value: CignalinkDetailsModel) => {
        let mockConfig = JSON.parse(
          JSON.stringify(this.cignaLinkDetailsConfig)
        );
        let formState: FormRow = new FormRow();

        mockConfig.forEach((field, index) => {
          if (field.name === CignaLinkGroupFields.PARTNER_NAME) {
            mockConfig[index].value = value.partnerCode;
          } else if (field.name === CignaLinkGroupFields.PARTICIPATION_IND) {
            mockConfig[index].disabled = false;
            mockConfig[index].value = value.cLink == "1" ? true : false;
          } else if (field.name === CignaLinkGroupFields.PROVINCE_IND) {
            if (value.countryCode == "CAN") {
              mockConfig[index].type = "select";
              mockConfig[index].value = "Y";
            }
            mockConfig[index].disabled = false;
          } else if (field.name === CignaLinkGroupFields.COUNTRY_NAME) {
            mockConfig[index].value = value.countryName;
          } else if (field.name === CignaLinkGroupFields.NOTE_TYPE) {
            mockConfig[index].value = value.noteType;
          } else if (field.name === CignaLinkGroupFields.EFFECTIVE_DATE) {
            mockConfig[index].value = value.effDate;
            mockConfig[index].disabled = false;
          } else if (field.name === CignaLinkGroupFields.TERM_DATE) {
            mockConfig[index].value = value.termDate;
            mockConfig[index].disabled = false;
          } else if (field.name === CignaLinkGroupFields.RENEWAL_DATE) {
            mockConfig[index].value = value.renewalDate;
            mockConfig[index].disabled = false;
          } else if (field.name === CignaLinkGroupFields.RENEWAL_IND) {
            if ("NEURON" == value.partnerCode && "AE1" == value.noteType) {
              field.disabled = value.cLink != "1" ? true : false;
              mockConfig[index].disabled = false;
              mockConfig[index].value = value.AutoRenewFlag == "Y" ? "Y" : "";
            }
          } else if (field.name === CignaLinkGroupFields.CONTACTS_ADDRESS) {
            if (value.addrCountryFlag != "N") {
              mockConfig[index].value = "Update";
            }
          } else if (field.name === CignaLinkGroupFields.CLONE_COUNTRY) {
            mockConfig[index].value = "Clone";
          }
        });

        formState.formFields = mockConfig;
        formState.id = {
          data: value,
        };
        formState.action = null;
        this.cignaLinkDetailsFormState.push(formState); // add record
      });
    // this.cignaLinkDetailsConfig.map(field => field.name == CignaLinkGroupFields.CHANGE_REASON ? field.required = false : '');  // make required to false for hidden fields

    this.cignaLinkDetailsConfig = JSON.parse(
      JSON.stringify(this.cignaLinkDetailsConfig)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    this.cignaLinkDetailsFormState = JSON.parse(
      JSON.stringify(this.cignaLinkDetailsFormState)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }

  formFieldValueChanged($event) {
    let field: FormField = $event.formField;
    const index: number = $event.index;
    let form: FormGroup = $event.field;
    let prevState: Array<DynamicConfigFormRow> = $event.prevState;
    console.log($event);
    if (field.name == CignaLinkGroupFields.CONTACTS_ADDRESS + index) {
      // On update click
      const cignalinkDetails: CignalinkDetailsModel = prevState[index].id.data;
      const ref = this.modalService.open(CignalinksContactsComponent, {
        size: <any>"xl",
        ...NGBModalOptions,
        windowClass: "dashboard-modal",
      });
      ref.componentInstance.groupNumber = this.groupNumber;
      ref.componentInstance.groupName = this.groupName;
      ref.componentInstance.entityType = this.entityType;
      ref.componentInstance.seqAddressId = cignalinkDetails.seqAddrId;
      ref.componentInstance.seqGroupId = cignalinkDetails.seqGroupId;
      ref.componentInstance.seqEntityId = cignalinkDetails.seqEntityId;
      ref.componentInstance.activeTab = 2;
    } else if (field.name == CignaLinkGroupFields.CLONE_COUNTRY + index) {
      console.log(form);
    }
  }

  targetGroupsDropdownValues = [];

  /**
   * get all groups by groupId of same parent
   */
  getAllGroupsByGroupId() {
    this.groupMasterService
      .findAllGroupsByGroupId(this.groupNumber)
      .subscribe((groups) => {
        this.targetGroupsDropdownValues = groups;
      });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.cignaLinkDetailsForm.invalid) {
      return;
    }
    let userName = sessionStorage.getItem("user");
    let cignaLinkMaintenanceModel: CignaLinkMaintenanceModel =
      new CignaLinkMaintenanceModel(this.groupNumber, this.groupName);

    this.cignaLinkDetailsForm.forEach((groups, index) => {
      groups.rows.forEach((record: FormGroup, recordIndex) => {
        const cignaLinkDataIndex = this.cignaLinkDetailsGroups.findIndex(
          (resp) =>
            resp.seqGroupId == record.value.seqGroupId &&
            resp.seqCodeId == record.value.seqCodeId &&
            resp.partnerCode == groups.group
        );
        if (cignaLinkDataIndex > -1) {
          cignaLinkMaintenanceModel.cignaLinkPartnerList.push(
            this.getFormData(
              record,
              this.cignaLinkDetailsGroups[cignaLinkDataIndex]
            )
          );
        }
      });
    });

    this.cignaLinkDetailsService
      .saveCignaLinkDetails(userName, cignaLinkMaintenanceModel)
      .subscribe((resp) => {
        this.toastService.showToast(
          "Records updated successfully",
          NgbToastType.Success
        );
      });
  }

  onUpdateLinkClick(event, index, data, rowIndex) {
    let cignalinkDetails: CignalinkDetailsModel = new CignalinkDetailsModel();

    this.groupedContacts[rowIndex][1].forEach(
      (record: CignalinkDetailsModel, contactIndex) => {
        if (contactIndex == index) {
          cignalinkDetails = record;
        }
      }
    );



    const ref = this.modalService.open(CignalinksContactsComponent, {
      size: <any>"xl",
      ...NGBModalOptions,
      windowClass: "dashboard-modal",
    });
    ref.componentInstance.groupNumber = this.groupNumber;
    ref.componentInstance.groupName = this.groupName;
    ref.componentInstance.entityType = this.entityType;
    ref.componentInstance.seqEntityId = cignalinkDetails.seqEntityId;
    ref.componentInstance.seqAddressId = cignalinkDetails.seqAddrId;
    ref.componentInstance.seqGroupId = cignalinkDetails.seqGroupId;
    ref.componentInstance.activeTab = 2;
  }

  selectedClonedCountryModel: CignalinkDetailsModel;

  openCloneCountryModal(event, index, data, rowIndex) {
    let cignalinkDetails: CignalinkDetailsModel = new CignalinkDetailsModel();

    this.groupedContacts[rowIndex][1].forEach(
      (record: CignalinkDetailsModel, contactIndex) => {
        if (contactIndex == index) {
          cignalinkDetails = record;
        }
      }
    );
    this.selectedClonedCountryModel = cignalinkDetails;

    this.cloneCountryModalRef = this.modalService.open(
      this.countryCloneTemplate,
      {
        size: <any>"xl",
        ...NGBModalOptions,
        windowClass: "dashboard-modal",
      }
    );
    if (!this.targetGroupsDropdownValues)
      this.showPopUp(`No sub groups to clone. `, "Error");
  }

  onCountryCloneLinkClick() {
    let cignaLinkCloneModel: CignaLinkCloneModel = new CignaLinkCloneModel();
    cignaLinkCloneModel.selectedSubgroupList = this.targetGroupsDropdownValues;
    cignaLinkCloneModel.sourceGroupId = this.groupNumber;
    cignaLinkCloneModel.sourceGroupName = this.groupName;
    cignaLinkCloneModel.countryCode =
      this.selectedClonedCountryModel.countryCode;
    cignaLinkCloneModel.cloneType = "COUNTRY";
    const userName = sessionStorage.getItem("user");
    /**
     *   --  target Group   --
     */
    cignaLinkCloneModel.possibleSubgroupList = [];
    cignaLinkCloneModel.possibleSubgroupList.push(this.cloneTargetGroup);

    /**
         *  validations on not cloneable
         Could not clone the paritication for Country Codes : ....string,
         Could not clone the paritication for Subgroup Ids : ...[],
         */
    this.cignaLinkDetailsService
      .procCloneCignaLinkDetails(cignaLinkCloneModel, userName)
      .subscribe((resp: any) => {
        if (!resp.clonable) {
          this.showPopUp(
            `Could not clone the paritication for Country Codes : ${resp.exceptionCountryCodes[0]}`,
            "Error"
          );
          return;
        }
      });
  }

  contactDetailsHistory = [];
  historyParsedData = "";

  viewHistory() {
    this.inProgress = true;
    this.cignaLinkDetailsService.viewHistory(this.groupNumber).subscribe(
      (resp) => {
        this.contactDetailsHistory = resp;
        this.historyParsedData = JSON.stringify(resp);
        this.createDataGrid(this.contactDetailsHistory);

        this.viewHistoryModalRef = this.modalService.open(
          this.cignLinkDetailsViewHistoryTemplate,
          {
            size: <any>"xl",
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
          }
        );
      },
      finalize(() => {
        this.inProgress = false;
      })
    );
  }

  cloneTargetGroup = "00001A001";
  cloneModalRef: NgbModalRef;
  cloneCountryModalRef: NgbModalRef;
  viewHistoryModalRef: NgbModalRef;

  openCloneCignaLinkDetailModal() {
    this.cloneModalRef = this.modalService.open(
      this.cignLinkDetailsCloneTemplate,
      {
        size: <any>"xl",
        ...NGBModalOptions,
        windowClass: "dashboard-modal",
      }
    );
  }

  cloneCignaLinkDetailsResponse = null;

  saveCignaLinkDetailsCloneChanges() {
    let cignaLinkCloneModel: CignaLinkCloneModel = new CignaLinkCloneModel();
    cignaLinkCloneModel.selectedSubgroupList = this.targetGroupsDropdownValues;
    cignaLinkCloneModel.sourceGroupId = this.groupNumber;
    cignaLinkCloneModel.sourceGroupName = this.groupName;
    cignaLinkCloneModel.selectedSubgroupList = [];
    /**
     *   --  target Group   --
     */
    cignaLinkCloneModel.possibleSubgroupList.push(this.cloneTargetGroup);
    const userName = sessionStorage.getItem("user");

    // -----------------------   API response Object
    //clonable: false
    // exceptionCountryCodes:  []
    // exceptionSubgroupIds: []
    // selectedSubgroupList: []
    // sourceGroupId:

    this.cignaLinkDetailsService
      .procCloneCignaLinkDetails(cignaLinkCloneModel, userName)
      .subscribe((resp: any) => {
        if (!resp.clonable) {
          this.showPopUp(
            `Could not clone the paritication for Country Codes : ${resp.exceptionCountryCodes[0]}`,
            "Error"
          );
          return;
        }
        this.toastService.showToast(
          "Cloned successfully",
          NgbToastType.Success
        );
        this.cloneCignaLinkDetailsResponse = resp;
      });
  }

  reset() {
    console.log("reset api");
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
      this.inProgress = false;
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
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
      (secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.secProgress = false;

          this.initializeComponentState();
        } else {
          this.showPopUp(
            "You are not Permitted to view pcp auto assigned rules",
            "Tooth History Permission"
          );
        }
      },
      (error) => {
        this.secProgress = false;
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
    this.secColDetailService
      .findByTableNameAndUserId("", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.inProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  createDataGrid(data: any): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
      rowSelection: "single",
      rowData: data,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Partner Code",
        field: "partnerCode",
        width: 100,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Country Name",
        field: "countryName",
        width: 180,
      },
      {
        headerName: "Note Type",
        field: "noteType",
        width: 130,
      },
      {
        headerName: "Effective Date",
        field: "effDate",
        width: 130,
      },
      {
        headerName: "Termination Date",
        field: "termDate",
        width: 130,
      },
      {
        headerName: "Renewal Date",
        field: "renewalDate",
        width: 130,
      },
      {
        headerName: "Benefit Package",
        field: "benefitPackageId",
        width: 180,
      },
      {
        headerName: "User Update Time",
        field: "benefitPackageId",
        width: 180,
      },
      {
        headerName: "User Updated",
        field: "updateUser",
        width: 180,
      },
      {
        headerName: "Address",
        field: "addrExistsFlag",
        width: 150,
        cellRenderer: "btnCellRenderer",
        cellRendererParams: (params) => {
          return {
            label: "View Address",
            showButton: params.value == "Y" ? true : false,
          };
        },
      },
      {
        headerName: "Contact",
        field: "contactExistsFlag",
        width: 150,
        cellRenderer: "btnCellRenderer",
        cellRendererParams: (params) => {
          return {
            label: "View Contacts",
            showButton: params.value == "Y" ? true : false,
          };
        },
      },
    ];
    this.dataGridGridOptions.frameworkComponents = {
      btnCellRenderer: ButtonCellComponent,
    };
    this.dataGridGridOptions.onGridReady = this.onGridReady;
  }

  onGridReady(event) {
    this.dataGridgridApi = event.api;
    //  this.dataGridgridApi.setRowData(this.historyParsedData);
  }
}
