/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridApi, GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreExistRules } from "../../../api-models/pre-exist-rules.model"
import { PreExistRulesService } from "../../../api-services/pre-exist-rules.service"
import { PreExistRuleDtl } from "../../../api-models/pre-exist-rule-dtl.model"
import { PreExistRuleDtlService } from "../../../api-services/pre-exist-rule-dtl.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { Menu, SearchModel } from '../../../shared/models/models';
import { PreExistingConditionRulesLookup } from '../../../shared/lookup/pre-existing-condition-rules-lookup';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    getPlanMasterShortcutKeys,
    getPreExistingConditionRulesShortcutKeys
} from "../../../shared/services/shared.service";
import {MessageMasterDtl, SecUser} from "../../../api-models";
import {MessageMasterDtlService, SecUserService} from "../../../api-services";


// Use the Component directive to define the PreExistingConditionRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "pre-existing-condition-rules",
  templateUrl: "./pre-existing-condition-rules.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    PreExistRulesService,
    PreExistRuleDtlService,
  ],
})
export class PreExistingConditionRulesComponent
  implements OnInit, AfterViewInit
{
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  public preExistingConditionRulesForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "PXRUL";
  public isSuperUser = false;
  public secProgress = true;
  public editPreExistRules: boolean;
  public preExistRules: PreExistRules;
  public preExistRuleses: PreExistRules[];
  public editPreExistRuleDtl: boolean;
  public preExistRuleDtl: PreExistRuleDtl;
  public preExistRuleDtls: PreExistRuleDtl[];
  public PecId: string;
  public pecRuleStatus: boolean = true;
  public searchStatus: boolean = false;
  public actionNo: number = 1;
  public gridApi: GridApi;
  @ViewChild("agGrid", { static: true }) agGrid: GridOptions;
  @Input() showIcon: boolean = false;
  @Input() lineOfBusinessId: string;
  public menu: Menu[] = [];
  private dataLoadedMap = new Map<string, boolean>();
  userTemplateId: string;
  // Use constructor injection to inject an instance of a FormBuilder
  public searchModel = new SearchModel(
    "preexistruleses/lookup",
    PreExistingConditionRulesLookup.PRE_EXISTING_CONDITION_RULES_ALL,
    PreExistingConditionRulesLookup.PRE_EXISTING_CONDITION_RULES_DEFAULT,
    []
  );
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  public shortcuts: ShortcutInput[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private toastr: ToastService,
    private toastService: ToastService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private preExistRulesService: PreExistRulesService,
    private cdr: ChangeDetectorRef,
    private preExistRuleDtlService: PreExistRuleDtlService,
    private secUserService: SecUserService,
    private messageService: MessageMasterDtlService,
  ) {}
  ngAfterViewInit(): void {
    this.shortcuts.push(...getPreExistingConditionRulesShortcutKeys(this));
    this.cdr.detectChanges();
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
          this.dataLoadedMap.set("WINPERMISSION", false);
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(
        this.preExistingConditionRulesForm
    );
    this.initializePermission();
   
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          {name: "New", shortcutKey: "Ctrl+M",},
          { name: "Open", shortcutKey: "Ctrl+O" },
          {name: "Save", shortcutKey: "Ctrl+S",},
          { name: "Close", shortcutKey: "Ctrl+F4" },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: "F2" },
          { name: "Shortcut Menu...", shortcutKey: "F3" },
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit", shortcutKey: "Alt+F4" },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
          { isHorizontal: true },
          { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
          { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
          { name: "Paste", shortcutKey: "Ctrl+V" },
          { name: "Next", shortcutKey: "F8" },
          { name: "Previous", shortcutKey: "F7" },
        ],
      },
      {
        menuItem: "Note",
        dropdownItems: [{ name: "Notes F4", disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
          {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Note Type" },
          {name: '3 Group Master'},
          {name: '4 Notes'},
          {name: '5 Member Master'},
          {name: '6 Price Rule'},
          {name: '7 Plan'},
          {name: '8 Window Access'},
          {name: '9 Pre-Existing Condition Rules'}
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
          this.createForm();
          break;
        }
        case "Open": {
          // statements;
          break;
        }
        case "Save": {
          //this.saveVendorMaster();
          break;
        }
        case "Close": {
          this.preExistingConditionRulesForm.reset();
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        default: {
          break;
        }
      }
    } else if (event.menu.menuItem === "Edit") {
      // handle Edit-Menu Actions
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      switch (event.action) {
        case "Copy": {
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

  onLookupFieldChange(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupPECSearchModel();
    } else if (event.key === "Tab") {
      event.preventDefault();
      let pecID = event.target.value;
      this.PecId = event.target.value;
      this.getPreExistRulesByPECId(pecID);
    }
  }

  openLookupPECSearchModel() {
    let preExistRules = new PreExistRules();
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      if (resp != null) {
        this.pecRuleStatus = true;
        preExistRules = resp;
        this.PecId = resp.pecRuleId;
        this.setPECValues(preExistRules);
        this.getPreExistRulesByPECId(this.PecId);
        this.searchStatus = true;
      }
    });
  }

  setPECValues(preExistRules: PreExistRules) {
    this.preExistingConditionRulesForm.patchValue({
      pecRuleId: preExistRules.pecRuleId,
      effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(preExistRules.effectiveDate),
      termDate: this.dateFormatPipe.defaultDisplayDateFormat(preExistRules.termDate),
      termReason: preExistRules.termReason,
      description: preExistRules.description,
    }, {emitEvent: false});
    setTimeout(() => {
      this.isFormDataModified()
    }, 2000)
    this.preExistingConditionRulesForm.get("pecRuleId").disable();
    this.searchStatus = true;
    this.actionNo = 1;
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  createPreExistRules() {
    this.formValidation.validateForm();
    if (this.preExistingConditionRulesForm.valid) {
      if (this.secWin && this.secWin.hasInsertPermission()) {
        let preExistRules = new PreExistRules();
        preExistRules.pecRuleId = Form.getValue(
          this.preExistingConditionRulesForm,
          "pecRuleId"
        );
        preExistRules.effectiveDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "effectiveDate"
        );
        preExistRules.termDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "termDate"
        );
        preExistRules.termReason = Form.getValue(
          this.preExistingConditionRulesForm,
          "termReason"
        );
        preExistRules.description = Form.getValue(
          this.preExistingConditionRulesForm,
          "description"
        );
        this.preExistRulesService
          .createPreExistRules(preExistRules)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully created",
              NgbToastType.Success
            );
            this.editPreExistRules = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Not Authroized to perform the action"
        );
      }
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updatePreExistRules(seqPecId: number) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.preExistingConditionRulesForm.valid) {
        let preExistRules = new PreExistRules();
        preExistRules.pecRuleId = Form.getValue(
          this.preExistingConditionRulesForm,
          "pecRuleId"
        );
        preExistRules.effectiveDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "effectiveDate"
        );
        preExistRules.termDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "termDate"
        );
        preExistRules.termReason = Form.getValue(
          this.preExistingConditionRulesForm,
          "termReason"
        );
        preExistRules.description = Form.getValue(
          this.preExistingConditionRulesForm,
          "description"
        );
        this.preExistRulesService
          .updatePreExistRules(preExistRules, seqPecId)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.editPreExistRules = false;
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

  savePreExistRules() {
    if (this.editPreExistRules) {
      this.updatePreExistRules(this.preExistRules.seqPecId);
    } else {
      this.createPreExistRules();
    }
  }

  deletePreExistRules(seqPecId: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.preExistRulesService
        .deletePreExistRules(seqPecId)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getPreExistRulesDtlBySeqPECId(seqPecId: number) {
    this.preExistRuleDtlService
      .findBySeqPecId(seqPecId)
      .subscribe((preExistRuleDtls) => {
        this.preExistRuleDtls = preExistRuleDtls;
        this.dataGrid002gridApi.setRowData(this.preExistRuleDtls);
        this.dataGrid002gridApi.selectIndex(0, false, false);
      });
  }

  getPreExistRulesByPECId(pecId: string) {
    this.preExistRulesService
      .getPreExistRulesByPECId(pecId)
      .subscribe((preExistRuleses) => {
        this.pecRuleStatus = true;
        this.preExistRuleses = preExistRuleses;
        //this.setPECValues(preExistRules);
        this.dataGrid001gridApi.setRowData(this.preExistRuleses);
        this.dataGrid001gridApi.selectIndex(0, false, false);
      });
  }

  grid1SelectionChange() {
    let preExistRule = new PreExistRules();
    var selectedRows = this.dataGrid001gridApi.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      preExistRule = selectedRows[0];
      this.setPECValues(preExistRule);
    } else {
      this.setPECValues(preExistRule);
    }
    this.getPreExistRulesDtlBySeqPECId(preExistRule.seqPecId);
  }

  setActionStatus(actionNo: number) {
    this.actionNo = actionNo;
  }

  getPreExistRules(seqPecId: number) {
    this.preExistRulesService
      .getPreExistRules(seqPecId)
      .subscribe((preExistRules) => {
        this.pecRuleStatus = true;
        this.preExistRules = preExistRules;
        this.setPECValues(preExistRules);
      });
  }

  getPreExistRuleses() {
    this.preExistRulesService.getPreExistRuleses().subscribe(
      (preExistRuleses) => {
        this.preExistRuleses = preExistRuleses;
        //this.isReadOnly = true;
        //this.grid1SelectionChange();
      },
      (error) => {
        this.dataGrid001gridApi.setRowData([]);
      }
    );
  }

  createPreExistRuleDtl() {
    this.formValidation.validateForm();
    if (this.preExistingConditionRulesForm.valid) {
      if (this.secWin && this.secWin.hasInsertPermission()) {
        let preExistRuleDtl = new PreExistRuleDtl();
        preExistRuleDtl.effectiveDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "effectiveDate"
        );
        preExistRuleDtl.termDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "termDate"
        );
        this.preExistRuleDtlService
          .createPreExistRuleDtl(preExistRuleDtl)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully created",
              NgbToastType.Success
            );
            this.editPreExistRuleDtl = false;
          });
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Not Authroized to perform the action"
        );
      }
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updatePreExistRuleDtl(seqPecDtlId: number) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.preExistingConditionRulesForm.valid) {
        let preExistRuleDtl = new PreExistRuleDtl();
        preExistRuleDtl.effectiveDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "effectiveDate"
        );
        preExistRuleDtl.termDate = Form.getValue(
          this.preExistingConditionRulesForm,
          "termDate"
        );
        this.preExistRuleDtlService
          .updatePreExistRuleDtl(preExistRuleDtl, seqPecDtlId)
          .subscribe((response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.editPreExistRuleDtl = false;
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

  savePreExistRuleDtl() {
    if (this.editPreExistRuleDtl) {
      this.updatePreExistRuleDtl(this.preExistRuleDtl.seqPecDtlId);
    } else {
      this.createPreExistRuleDtl();
    }
  }

  deletePreExistRuleDtl(seqPecDtlId: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.preExistRuleDtlService
        .deletePreExistRuleDtl(seqPecDtlId)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getPreExistRuleDtl(seqPecDtlId: number) {
    this.preExistRuleDtlService
      .getPreExistRuleDtl(seqPecDtlId)
      .subscribe((preExistRuleDtl) => {
        this.preExistRuleDtl = preExistRuleDtl;
        this.preExistingConditionRulesForm.patchValue({
          effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
            this.preExistRuleDtl.effectiveDate
          ),
          termDate: this.dateFormatPipe.defaultDisplayDateFormat(
            this.preExistRuleDtl.termDate
          ),
        });
      });
  }

  getPreExistRuleDtls() {
    this.preExistRuleDtlService
      .getPreExistRuleDtls()
      .subscribe((preExistRuleDtls) => {
        this.preExistRuleDtls = preExistRuleDtls;
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

  onGridReady(eve: any) {
    this.dataGrid001gridApi = eve.api;
  }

  onGrid2Ready(eve: any) {
    this.dataGrid002gridApi = eve.api;
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid001GridOptions.editType = "fullRow";
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Effective Date",
        field: "effectiveDate",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Term Date",
        field: "termDate",
        width: 200,
      },
      {
        headerName: "Description",
        field: "description",
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
        headerName: "Diagnosis Type",
        headerClass: "text-primary",
        field: "diagnosisType",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "From Value",
        field: "fromValue",
        headerClass: "text-primary",
        width: 200,
      },
      {
        headerName: "Thru Value",
        field: "thruValue",
        width: 200,
      },
      {
        headerName: "Effective Date",
        field: "effectiveFate",
        width: 200,
      },
      {
        headerName: "Term Date",
        field: "termDate",
        width: 200,
      },
    ];
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */
  /*hasPermission() {
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
    }*/

  private initializePermission(): void {
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
      this.userTemplateId = user.dfltTemplate;
      this.getSecWin(user.dfltTemplate);
    });
  }

  private initializeComponentState(): void {
    this.createDataGrid001();
    this.createDataGrid002();
     this.menuInit();
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

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.preExistingConditionRulesForm = this.formBuilder.group(
      {
        pecRuleId: ["", { updateOn: "blur", validators: [] }],
        effectiveDate: ["", { updateOn: "blur", validators: [] }],
        termDate: ["", { updateOn: "blur", validators: [] }],
        termReason: ["", { updateOn: "blur", validators: [] }],
        description: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(SupportHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    viewModal.componentInstance.showIcon = true;
    viewModal.componentInstance.defaultFile =
      "/PXRUL,_Pre-Existing_Condition_Rule.htm";
  };

  getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
        (secWin: SecWin) => {
          this.secWin = new SecWinViewModel(secWin);
          if (this.secWin.hasSelectPermission()) {
            this.initializeComponentState();
            this.secProgress = false;
          } else {
            this.showPopUp(
                "You are not Permitted to view Pre-Existing Condition Rules",
                "Pre-Existing Condition Rules"
            );
          }
        },
        (error) => {
          this.initializeComponentState();
        }
    );
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Pre-Existing Condition Rules')
      })
    } else {
      this.activeModal.close();
    }
  };

  popupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === 'Yes') {

        } else if (resp.name === 'No') {
          if (this.screenCloseRequest === true) {
            this.activeModal.close();
          }
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  isFormDataModified() {
    this.preExistingConditionRulesForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }
}
