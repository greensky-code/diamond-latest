/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    DeterminantRules,
    DeterminantTables,
    DeterminantValues,
    MessageMasterDtl,
    ReasonCodeMaster
} from "../../../api-models/index";
import { DeterminantRulesService } from "../../../api-services/determinant-rules.service";
import { DeterminantValuesService } from "../../../api-services/determinant-values.service";
import { DeterminantTablesService } from "../../../api-services/determinant-tables.service";
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecWin } from "../../../api-models/security/sec-win.model";
import { SecurityService } from "../../../shared/services/security.service";
import { Menu, SearchModel } from "../../../shared/models/models";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import { NgbToastType } from "ngb-toast";
import { ToastService } from "../../../shared/services/toast.service";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { CONSTANTS, getProviderAdminFeeRuleShortcutKeys } from '../../../shared/services/shared.service';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { MessageMasterDtlService, ReasonCodeMasterService } from '../../../api-services';
import { DeterminantRulesViewmodel } from '../../../api-models/determinant-rules.viewmodel';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { ProviderAdministrativeFeeRuleLookup } from "../../../shared/lookup/provider-administrative-fee-rule-lookup";
import { RequiredValidator } from '../../../shared/validators/required.validator';
import { RuleCopyComponent } from '../../../diamond/provider/rule-copy/rule-copy.component';
import {SupportHelpComponent} from "../../support/support-help/support-help.component";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

// Use the Component directive to define the ProviderAdminitrativeFeeRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "provideradminitrativefeerule",
  templateUrl: "./provider-adminitrative-fee-rule.component.html",
  styleUrls: ["./provider-administrative-fee-rule.component.scss"],
})
export class ProviderAdminitrativeFeeRuleComponent
  implements OnInit, AfterViewInit
{
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() showIcon = true;
  providerAdminitrativeFeeRuleForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  public menu: Menu[] = [];
  popupClose: Boolean = false;
  closeStatus: Boolean = false;
  termDateStatus: Boolean = true;
  searchModel = new SearchModel(
    "determinantruleses/lookup",
    ProviderAdministrativeFeeRuleLookup.ALL,
    ProviderAdministrativeFeeRuleLookup.DEFAULT,
    []
  );
  private dataLoadedMap = new Map<string, boolean>();

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  private windowId = "ADRUL";

  shortcuts: ShortcutInput[] = [];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  reasonCodes = new Array<ReasonCodeMaster>();

  // Use constructor injection to inject an instance of a FormBuilder
  private isSuperUser: boolean;
  searchStatus: boolean = false;
  secProgress = true;
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private router: Router,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private securityService: SecurityService,
    private determinantRulesService: DeterminantRulesService,
    private determinantValuesService: DeterminantValuesService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private determinantTablesService: DeterminantTablesService,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    private reasonCodeMasterService: ReasonCodeMasterService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.dataLoadedMap.set("WINPERMISSION", false);

    this.initializePermission();
  }

  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(
      this.providerAdminitrativeFeeRuleForm
    );
    this.createDataGrid001();
    this.createDataGrid002();
    this.menuInit();
    this.getTermReasons();
            this.dataLoadedMap.set("WINPERMISSION", true);

  }
  public get isDataLoaded(): boolean {
    // @ts-ignore
    for (let [key, value] of this.dataLoadedMap) {
      if (!value) {
        return value;
      }
    }
    return true;
  }
  /**
   * Handle Menu Actions for Special
   * @param action: string
   */
  private handleEditMenu(action: string) {
    switch (action) {
      case "Lookup": {
        this.openLookupFieldSearchModel();
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

  closeModal = () => {
    this.closeStatus = true;
    if (this.popupClose === true) {
      this.popupAlert();
    } else {
      this.activeModal.close();
    }
  };

  popupAlert = () => {
    let popUpMessage = new PopUpMessage(
      "Provider Administrative Fee Rule",
      "Provider Administrative Fee Rule",
      "6128: Data has been modified, press yes to save changes",
      "info",
      [],
      MessageType.SUCCESS
    );
    popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
    popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
    popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.buttonclickEvent.subscribe((resp) => {
      if (resp.name === "Yes") {
        this.saveDeterminantRules();
      } else if (resp.name === "No") {
        this.activeModal.close();
      } // 3rd case: In case of cancel do nothing
    });
  };

  resetForm() {
    this.providerAdminitrativeFeeRuleForm.reset();
    this.editDeterminantRules = false;
  }

  onLookupFieldChange(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      let vendorId = event.target.value;
      this.getDeterminantRulesById(vendorId.toUpperCase(), this.windowId);
    }
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getProviderAdminFeeRuleShortcutKeys(this));
    this.cdr.detectChanges();
  }

  getTermReasons() {
    this.reasonCodeMasterService
      .getReasonCodeMasterByReasonType("TM")
      .subscribe((resp: ReasonCodeMaster[]) => {
        this.reasonCodes = resp;
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
      new PopUpMessageButton("Cancel", "Cancel", "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  /**
   * patch data from rule copy modal
   * @param event
   */
  onRuleCopyEmit(event) {
    this.determinantRules.ruleId = event.ruleId;
    this.determinantRules.effectiveDate = event.effectiveDate;
    this.determinantRules.termDate = event.termDate;
    this.determinantRules.termReason = event.termReason;
    this.populateForm();
    this.editDeterminantRules = false;
  }

  ruleIdPopup(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage(
      "poUpMessageName",
      title,
      message,
      "icon"
    );
    popUpMessage.buttons.push(
      ...[new PopUpMessageButton("Yes", "Yes", "btn btn-primary")]
    );
    popUpMessage.buttons.push(
      ...[new PopUpMessageButton("Ok", "Cancel", "btn btn-primary")]
    );
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.buttonclickEvent.subscribe((button) => {
      if (button.name == "Yes") {
        this.resetForm();
      }
    });
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

  editDeterminantRules = false;
  determinantRules: DeterminantRules;
  determinantRulesViewmodel: DeterminantRulesViewmodel;
  determinantRuleses: DeterminantRules[];
  editDeterminantValues: boolean;
  determinantValues: DeterminantValues;
  determinantValueses: DeterminantValues[];
  editDeterminantTables: boolean;
  determinantTables: DeterminantTables;
  determinantTableses: DeterminantTables[];

  createDeterminantRules() {
    if (
      (this.secWin && this.secWin.hasInsertPermission()) ||
      this.isSuperUser
    ) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        let determinantRules = this.getDeterminantRuleData(
          new DeterminantRules()
        );
        determinantRules =
          this.setDeterminantRulesDefaultValues(determinantRules);

        this.determinantRulesService
          .createDeterminantRules(determinantRules)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully created",
              NgbToastType.Success
            );
            this.editDeterminantRules = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
    }
  }

  setDeterminantRulesDefaultValues(determinantRules: any) {
    determinantRules.determinantRulesPrimaryKey = {
      keyword: "ADRUL",
    };
    determinantRules.insertProcess = "ADRUL";
    determinantRules.insertUser =
      this.securityService.getCurrentUserToken().sub;
    determinantRules.actionCode = "N";
    determinantRules.securityCode = "0";
    determinantRules.ruleOrder = 10;

    try {
      const dateObj = new Date();
      const month = dateObj.getMonth();
      const day = String(dateObj.getDate());
      const year = dateObj.getFullYear();
      determinantRules.insertDatetime = day + "-" + month + "-" + year;
    } catch (e) {}
    return determinantRules;
  }

  getDeterminantRuleData(determinantRules: any): DeterminantRules {
    determinantRules.ruleId = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "ruleId"
    );
    determinantRules.description = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "description"
    );
    determinantRules.effectiveDate = Form.getDatePickerValue(
      this.providerAdminitrativeFeeRuleForm,
      "effDate"
    );
    determinantRules.termDate = Form.getDatePickerValue(
      this.providerAdminitrativeFeeRuleForm,
      "termDate"
    );

    determinantRules.termReason = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "termRsn"
    );
    determinantRules.reasonCode = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "reasonCode"
    );
    determinantRules.userDefined1 = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "userDefined1"
    );
    determinantRules.userDate1 = Form.getDatePickerValue(
      this.providerAdminitrativeFeeRuleForm,
      "userDate1"
    );
    determinantRules.userDate2 = Form.getDatePickerValue(
      this.providerAdminitrativeFeeRuleForm,
      "userDate2"
    );

    determinantRules.userDefined2 = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "userDefined2"
    );
    determinantRules.fileType = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "claimType"
    );
    determinantRules.insertUser = Form.getValue(
      this.providerAdminitrativeFeeRuleForm,
      "searchSeq"
    );

    return determinantRules;
  }

  updateDeterminantRules(keyword = "ADRUL") {
    if (
      (this.secWin && this.secWin.hasUpdatePermission()) ||
      this.isSuperUser
    ) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        const determinantRules = this.getDeterminantRuleData(
          this.determinantRules
        );
        this.determinantRulesService
          .updateDeterminantRules(
            determinantRules,
            determinantRules.determinantRulesPrimaryKey.seqRuleId,
            keyword
          )
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            if (this.closeStatus === true) {
              setTimeout(() => {
                this.activeModal.close();
              }, 2000);
            }
            this.popupClose = false;
            this.editDeterminantRules = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    }
  }

  saveDeterminantRules() {
    if (this.editDeterminantRules) {
      this.updateDeterminantRules();
    } else {
      this.isRuleIdAlreadyExist(
        this.providerAdminitrativeFeeRuleForm.value.ruleId
      );
    }
  }

  /**
   * check if ruleId already Exist
   * @param ruleId
   * @param keyword
   */
  isRuleIdAlreadyExist(ruleId: string, keyword = "ADRUL") {
    this.determinantRulesService
      .getDeterminantRulesByRuleId(ruleId, keyword)
      .subscribe(
        (determinantRules) => {
          if (determinantRules) {
            this.showRuleIdExistMessage();
            return;
          }
          this.createDeterminantRules();
        },
        (error) => {
          this.createDeterminantRules();
        }
      );
  }

  ruleIdMesssage: string = null;

  showRuleIdExistMessage() {
    if (this.ruleIdMesssage) {
      this.showPopUp("27239: " + this.ruleIdMesssage, "Window Error");
      return;
    }
    this.messageService
      .findByMessageId(27239)
      .subscribe((message: MessageMasterDtl[]) => {
        this.ruleIdMesssage = message[0].messageText;
        this.showPopUp("27239: " + this.ruleIdMesssage, "Window Error");
      });
  }

  deleteDeterminantRules(keyword: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    } else {
      this.determinantRulesService
        .deleteDeterminantRules(keyword)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getDeterminantRulesById(ruleId: string, keyword: string) {
    this.determinantRulesService
      .getDeterminantRulesByRuleId(ruleId, keyword)
      .subscribe(
        (determinantRules) => {
          this.editDeterminantRules = true;
          if (!determinantRules) {
            this.ruleIdPopup(
              "Rule id does not exist, Press Yes to create New",
              "Provider Administrative Fee Rule"
            );
          }
          this.determinantRules = determinantRules;

          this.populateForm();
          this.getDeterminantTablesesBySeqRuleId(
            this.determinantRules.determinantRulesPrimaryKey.seqRuleId
          );
          this.searchStatus = true;
        },
        (error) => {
          this.searchStatus = false;
        }
      );
  }

  populateForm() {
    this.providerAdminitrativeFeeRuleForm.get("ruleId").disable();
    this.providerAdminitrativeFeeRuleForm.patchValue(
      {
        ruleId: this.determinantRules.ruleId,
        descrition: this.determinantRules.description,
        description: this.determinantRules.description,
        effDate: this.dateFormatPipe.defaultDisplayDateFormat(
          this.determinantRules.effectiveDate
        ),
        termDate: this.dateFormatPipe.defaultDisplayDateFormat(
          this.determinantRules.termDate
        ),
        termRsn: this.determinantRules.termReason,
        reasonCode: this.determinantRules.reasonCode,
        userDefined1: this.determinantRules.userDefined1,
        userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
          this.determinantRules.userDate1
        ),
        userDefined2: this.determinantRules.userDefined2,
        userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
          this.determinantRules.userDate2
        ),
        claimType: this.determinantRules.fileType,
        searchSeq: this.determinantRules.insertUser,
        amount: this.determinantRules.resultNumber1,
      },
      { emitEvent: false }
    );
    if (this.determinantRules.termDate) {
      this.termDateStatus = false;
    }
  }

  getDeterminantRuleses() {
    this.determinantRulesService
      .getDeterminantRuleses()
      .subscribe((determinantRuleses) => {
        this.determinantRuleses = determinantRuleses;
      });
  }

  createDeterminantValues() {
    if (this.secWin.hasInsertPermission()) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        let determinantValues = new DeterminantValues();
        determinantValues.operator = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "percent"
        );
        determinantValues.insertUser = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "searchSeq"
        );
        determinantValues.secDeterminantTable = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "determinantTable"
        );
        determinantValues.secDeterminantColumn = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "determinantColumn"
        );
        this.determinantValuesService
          .createDeterminantValues(determinantValues)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully created",
              NgbToastType.Success
            );
            this.editDeterminantValues = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
    }
  }

  updateDeterminantValues(keyword: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        let determinantValues = new DeterminantValues();
        determinantValues.operator = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "percent"
        );
        determinantValues.insertUser = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "searchSeq"
        );
        determinantValues.secDeterminantTable = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "determinantTable"
        );
        determinantValues.secDeterminantColumn = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "determinantColumn"
        );
        this.determinantValuesService
          .updateDeterminantValues(determinantValues, keyword)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.editDeterminantValues = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    }
  }

  saveDeterminantValues() {
    if (this.editDeterminantValues) {
      this.updateDeterminantValues(this.determinantValues.keyword);
    } else {
      this.createDeterminantValues();
    }
  }

  deleteDeterminantValues(keyword: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    } else {
      this.determinantValuesService
        .deleteDeterminantValues(keyword)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getDeterminantValues(keyword: string) {
    this.determinantValuesService
      .getDeterminantValues(keyword)
      .subscribe((determinantValues) => {
        this.determinantValues = determinantValues;
        this.providerAdminitrativeFeeRuleForm.patchValue({
          percent: this.determinantValues.operator,
          searchSeq: this.determinantValues.insertUser,
          determinantTable: this.determinantValues.secDeterminantTable,
          determinantColumn: this.determinantValues.secDeterminantColumn,
        });
      });
  }

  getDeterminantValueses() {
    this.determinantValuesService
      .getDeterminantValueses()
      .subscribe((determinantValueses) => {
        this.determinantValueses = determinantValueses;
      });
  }

  createDeterminantTables() {
    if (this.secWin.hasInsertPermission()) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        let determinantTables = new DeterminantTables();
        determinantTables.insertUser = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "searchSeq"
        );
        this.determinantTablesService
          .createDeterminantTables(determinantTables)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully created",
              NgbToastType.Success
            );
            this.editDeterminantTables = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
    }
  }

  updateDeterminantTables(keyword: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.providerAdminitrativeFeeRuleForm.valid) {
        let determinantTables = new DeterminantTables();
        determinantTables.insertUser = Form.getValue(
          this.providerAdminitrativeFeeRuleForm,
          "searchSeq"
        );
        this.determinantTablesService
          .updateDeterminantTables(determinantTables, keyword)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.editDeterminantTables = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    }
  }

  saveDeterminantTables() {
    if (this.editDeterminantTables) {
      this.updateDeterminantTables(this.determinantTables.keyword);
    } else {
      this.createDeterminantTables();
    }
  }

  deleteDeterminantTables(keyword: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    } else {
      this.determinantTablesService
        .deleteDeterminantTables(keyword)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getDeterminantTables(keyword: string) {
    this.determinantTablesService
      .getDeterminantTables(keyword)
      .subscribe((determinantTables) => {
        this.determinantTables = determinantTables;
        this.providerAdminitrativeFeeRuleForm.patchValue({
          searchSeq: this.determinantTables.insertUser,
        });
      });
  }

  getDeterminantTablesesBySeqRuleId(seqRuleId: number) {
    this.determinantTablesService
      .getDeterminantTablesBySeqRuleId(seqRuleId)
      .subscribe((determinantTableses) => {
        this.determinantTableses = determinantTableses;
        this.dataGrid001GridOptions.api.setRowData(this.determinantTableses);
        this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        this.grid1SelectionChange();
      });
  }

  getDeterminantTableses() {
    this.determinantTablesService
      .getDeterminantTableses()
      .subscribe((determinantTableses) => {
        this.determinantTableses = determinantTableses;
      });
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
        headerName: "Search Seq",
        field: "determinantTablesPrimaryKey.searchSequence",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Determinant Table",
        field: "determinantTable",
        width: 200,
      },
      {
        headerName: "Determinant Column",
        field: "determinantColumn",
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
        headerName: "Operator",
        field: "operator",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Form Value",
        field: "valueFrom",
        width: 200,
      },
      {
        headerName: "Thru Value",
        field: "valueThru",
        width: 200,
      },
    ];
  }

  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    let userId;
    if (parsedToken) {
      userId = parsedToken.sub;
    }
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

    if (this.isSuperUser) {
      this.initializeComponentState();
    } else {
      this.secWinService.getSecWin(this.windowId, userId).subscribe(
        (secWin: SecWin) => {
          this.secWin = new SecWinViewModel(secWin);
          if (this.secWin.hasSelectPermission()) {
            this.secProgress = false;
            this.initializeComponentState();
          } else {
            this.showPopUp(
              "You are not permitted to Provider Administrative Fee Rule ",
              "Provider Administrative Fee Rule"
            );
          }
        },
        (error) => {
          this.secProgress = false;
          this.showPopUp(
            "You are not permitted to Provider Administrative Fee Rule ",
            "Provider Administrative Fee Rule"
          );
        }
      );
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
          { name: "Main Menu..." },
          { name: "Shortcut Menu..." },
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
          { name: "Lookup" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "Rule Copy" }],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
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
          { name: "2 Provider Admistrative Fee Rule" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window", shortcutKey: "F1" },
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

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.resetForm();
          break;
        }

        case "Close": {
          this.providerAdminitrativeFeeRuleForm.reset();
          break;
        }
        case "Save": {
          this.saveDeterminantRules();
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
      this.handleEditMenu(event.action);
    } else if (event.menu.menuItem === "Topic") {
      // handle Topic-Menu Actions
      // this.handleTopicMenu(event.action);
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      switch (event.action) {
        case "Rule Copy": {
          let status =
            this.functionalLevelSecurityService.isFunctionIdNameExist(
              CONSTANTS.F_RULE_CPY
            );
          if (status) {
            if (this.searchStatus) {
              // --------------------------------------------------------------------------
              const determinantRuleData = this.getDeterminantRuleData(
                new DeterminantRules()
              );
              if (determinantRuleData.ruleId) {
                let ref = this.modalService.open(RuleCopyComponent);
                ref.componentInstance.onRuleCopyEmit.subscribe((value) => {
                  this.onRuleCopyEmit(value);
                });
              } else {
                this.showPopUp("No Rule ID entered", "Error");
              }

              // --------------------------------------------------------------------------
            } else {
              this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.alertMessage = this.alertMessageService.error(
                    "30164: " + message[0].messageText
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(11073)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  "11073: " + message[0].messageText
                );
              });
          }
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
              this.windowId
            );
            if (!status) {
              this.alertMessage = this.alertMessageService.error(
                "11073 (User does not have authorization to execute this function.)"
              );
            }
          } else {
            this.alertMessage = this.alertMessageService.error(
              "30164: A row must be selected before using the menu option"
            );
          }

          break;
        }
      }
    } else if (event.menu.menuItem == "Help") {
      /**
       * Open help modal
       */
      this.helpScreen();
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.providerAdminitrativeFeeRuleForm = this.formBuilder.group(
      {
        ruleId: [
          "",
          {
            updateOn: "blur",
            validators: [
              Validators.required,
              RequiredValidator.cannotContainSpace,
            ],
          },
        ],
        descrition: ["", { updateOn: "blur", validators: [] }],
        description: ["", { updateOn: "blur", validators: [] }],
        effDate: ["", { updateOn: "blur", validators: [] }],
        termDate: ["", { updateOn: "blur", validators: [] }],
        termRsn: ["", { updateOn: "blur", validators: [] }],
        amount: ["", { updateOn: "blur", validators: [] }],
        percent: ["", { updateOn: "blur", validators: [] }],
        applyPctTo: ["", { updateOn: "blur", validators: [] }],
        reasonCode: [
          "",
          {
            updateOn: "blur",
            validators: [
              Validators.required,
              RequiredValidator.cannotContainSpace,
            ],
          },
        ],
        userDefined1: ["", { updateOn: "blur", validators: [] }],
        userDate1: ["", { updateOn: "blur", validators: [] }],
        userDefined2: ["", { updateOn: "blur", validators: [] }],
        userDate2: ["", { updateOn: "blur", validators: [] }],
        claimType: ["", { updateOn: "blur", validators: [] }],
        requireCleanClaim: ["", { updateOn: "blur", validators: [] }],
        requireCapLine: ["", { updateOn: "blur", validators: [] }],
        searchSeq: ["", { updateOn: "blur", validators: [] }],
        determinantTable: ["", { updateOn: "blur", validators: [] }],
        determinantColumn: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  private displaySaveError(error: any) {}

  setFieldValue(fieldName: string, fieldValue: string) {
    this.providerAdminitrativeFeeRuleForm.controls[fieldName].patchValue(
      fieldValue
    );
  }

  openLookupFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.determinantRules = res;
        this.providerAdminitrativeFeeRuleForm.patchValue({
          ruleId: res.RULE_ID,
        });

        this.getDeterminantRulesById(res.RULE_ID.toUpperCase(), this.windowId);
      }
    });
  }

  public grid1SelectionChange() {
    let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    if (selectedRows[0]) {
      const searchSequence =
        selectedRows[0].determinantTablesPrimaryKey.searchSequence;
      const determinantTable = selectedRows[0].determinantTable;
      const determinantColumn = selectedRows[0].determinantColumn;
      this.getDeterminantValuesByRuleId(
        this.determinantRules.determinantRulesPrimaryKey.seqRuleId,
        searchSequence
      );
      this.providerAdminitrativeFeeRuleForm.patchValue(
        {
          searchSeq: searchSequence,
          determinantTable: determinantTable,
          determinantColumn: determinantColumn,
        },
        { emitEvent: false }
      );
      this.isFormDataChanged();
    }
  }

  getDeterminantValuesByRuleId(seqRuleId: number, searchSequence: number) {
    this.determinantValuesService
      .getDeterminantValuesByRuleIdAndSearchSeq(seqRuleId, searchSequence)
      .subscribe((determinantValueses) => {
        this.determinantValueses = determinantValueses;
        this.dataGrid002GridOptions.api.setRowData(this.determinantValueses);
      });
  }

  isFormDataChanged = () => {
    this.providerAdminitrativeFeeRuleForm.valueChanges.subscribe(() => {
      this.popupClose = true;
    });
  };

  isTermDateChange = () => {
    this.termDateStatus = false;
  };

  helpScreen = () => {
    const viewModal = this.modalService.open(ProviderHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    viewModal.componentInstance.showIcon = true;
    viewModal.componentInstance.defaultFile =
      "/ADRUL_Provider_Administrative_Fee_Rule.htm";
  };
}
