/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, Input} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from "../../../shared/validators/number.validator";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { DatePipe } from "@angular/common";
import {
  PopUpMessage,
  PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DatePickerConfig, datePickerModel } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import {
  AllowIn,
  KeyboardShortcutsComponent,
  ShortcutEventOutput,
  ShortcutInput,
} from "ng-keyboard-shortcuts";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {GroupPanel, MessageMasterDtl, SecUser} from "../../../api-models/index";
import { GroupPanelService } from "../../../api-services/group-panel.service";
import {
  AlertMessage,
  AlertMessageService,
} from "../../../shared/components/alert-message/index";
import {
  FormRow,
  FORM_FIELD_ACTION_TYPES,
  Menu,
  SearchModel,
} from "../../../shared/models/models";
import {
  ContactPersonFormConfig,
  GroupPanelFieldNames,
  GroupPanelFormConfig,
} from "../../../shared/models/constants";
import { ToastService } from "../../../shared/services/toast.service";
import { NgbToastType } from "ngb-toast";
import {GroupMasterService, MessageMasterDtlService, PanelMasterService, SecUserService} from "../../../api-services";
import { PlanMasterService } from "../../../api-services/plan-master.service";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import { getGroupPanelShortcutKeys } from "../../../shared/services/shared.service";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { GroupMasterLookup } from "../../../shared/lookup/group-master-lookup";
import { DynamicFormComponent } from "../../../shared/components/dynamic-form/dynamic-form.component";
import {GroupMasterComponent} from '../group-master/group-master.component';
import {GroupBillingComponent} from '../group-billing/group-billing.component';
import {GroupDetailComponent} from '../group-detail/group-detail.component';
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {GROUP_PANNEL_MODULE_ID, MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {HelpComponent} from "../help/help.component";
import {GroupContractComponent} from '../group-contract/group-contract.component';
// Use the Component directive to define the GroupPanelComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "grouppanel",
  templateUrl: "./group-panel.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    GroupPanelService,
    GroupMasterService,
    PanelMasterService,
    PlanMasterService,
  ],
})
export class GroupPanelComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  groupPanelForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = datePickerModel;
  groupPanelState: Array<FormRow> = [];
  groupPanelFormConfig = GroupPanelFormConfig;
  seqGroupId: any;
  isAddNewRow:any;
  config: any;
  saveForm:any;
  menu: Menu[] = [];
  shortcuts: ShortcutInput[] = [];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  searchModel = new SearchModel(
    "groupmasters/lookup",
    GroupMasterLookup.GROUP_MASTER_ALL,
    GroupMasterLookup.GROUP_MASTER_DEFAULT,
    []
  );
  @Input() groupId: any;
  @Input() showIcon: boolean = false;
  ShortName: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild('dynamicFormComponent') dynamicFormComponentEle: DynamicFormComponent;
  panelOptions: any;

  secWin: SecWinViewModel;
  windowId = 'GRUPP';
  userTemplateId: string;
  memberModuleId = GROUP_PANNEL_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  formValueChangeStatus: boolean = false;
  isScreenCloseRequest: boolean = false;

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getGroupPanelShortcutKeys(this));
    this.cdr.detectChanges();
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

  editGroupPanel: boolean;
  groupPanel: GroupPanel;
  groupPanels: GroupPanel[];
  createGroupPanel() {
    this.formValidation.validateForm();
    if (this.groupPanelForm.valid) {
      let groupPanel = new GroupPanel();
      this.groupPanelService.createGroupPanel(groupPanel).subscribe(
        (response) => {
          this.toastService.showToast('Record successfully created', NgbToastType.Success);
          this.editGroupPanel = false;
        }
      );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  createNewPanel() {
    this.isAddNewRow = true;
    setTimeout(() => {
      this.isAddNewRow = false;
    }, 200);
  }

  updateGroupPanel(seqGroupPanel: number) {
    this.formValidation.validateForm();
    if (this.groupPanelForm.valid) {
      let groupPanel = new GroupPanel();
      this.groupPanelService
        .updateGroupPanel(groupPanel, seqGroupPanel)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.editGroupPanel = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  saveGroupPanel(event: any) {
    if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
      let groupPanels = new Array<GroupPanel>();
      const updatedRecords: FormRow[] = this.groupPanelState.filter(
          (record) => record.action
      );

      if (updatedRecords.length > 0) {
        this.groupPanelState.forEach((preStateRecord: FormRow, index) => {
          console.log(preStateRecord);
          if (preStateRecord.action) {
            let updatedRecord = event[index];
            const pair = Object.keys(updatedRecord).map((k) => ({
              key: k,
              value: updatedRecord[k],
            }));
            let groupPanel: GroupPanel = this.populateGroupPanel(
                pair,
                preStateRecord.action
            );
            groupPanel.groupPanelPrimaryKey.seqGroupPanel = preStateRecord.id.id;
            groupPanel.groupPanelPrimaryKey.seqGroupId = this.seqGroupId;
            groupPanels.push(groupPanel);
          }
        });
      }
      const newRecords = event.slice(this.groupPanelState.length);
      newRecords.forEach((record: any) => {
        const pair = Object.keys(record).map((k) => ({
          key: k,
          value: record[k],
        }));
        groupPanels.push(
            this.populateGroupPanel(pair, FORM_FIELD_ACTION_TYPES.ADD)
        );
      });

      // ('============================= api records with action update/add ================================');
      //  groupPanels     => variable contains all the updated records and new record to add updated by form-inline grid
      this.groupPanelService.addUpdateGroupPanel(groupPanels).subscribe(
          (resp) => {
            this.toastService.showToast(
                "Group Panels updated Successfully",
                NgbToastType.Success
            );
            if (this.isScreenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close()
              }, 2000)
            }
            this.formValueChangeStatus = false;
          }
      );
    }
  }

  deleteGroupPanel(seqGroupPanel: number) {
    if (!(this.secWin.hasDeletePermission())) {
      return;
    }
    this.groupPanelService.deleteGroupPanel(seqGroupPanel).subscribe(
      (response) => {
        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
      }
    );
  }
  getGroupPanel(seqGroupPanel: number) {
    this.groupPanelService.getGroupPanel(seqGroupPanel).subscribe(
      (groupPanel) => {
        this.groupPanel = groupPanel;
        this.groupPanelForm.patchValue({});
      }
    );
  }
  onChangeGroupId(event: any) {
    this.groupPanelForm.patchValue({ groupId: event.target.value });
    if (event.target.value) {
      this.getGroupPanelByGroupId(event.target.value);
    }
  }
  getGroupPanels() {
    this.groupPanelService.getGroupPanels().subscribe(
      (groupPanels) => {
        this.groupPanels = groupPanels;
      }
    );
  }
  getGroupPanelByGroupId(groupId: number) {
    this.groupMasterService.getGroupMasterByGroupId(groupId).subscribe(
      (groupMaster) => {
        if (groupMaster) {
          this.seqGroupId = groupMaster.seqGroupId;
          this.ShortName = groupMaster.shortName;
          this.getGroupPanelsById(this.seqGroupId);
          this.groupPanelForm.get('groupId').disable();
        } else {
          this.toastService.showToast(
            "Group Id Not Exists",
            NgbToastType.Danger
          );
        }
      },
      (error) => {
        // this.toastService.showToast("Group Id Not Exists", NgbToastType.Danger);
      }
    );
  }

  getGroupPanelsById(id: any) {
    this.groupPanelService.findBySeqGroupId(id).subscribe(
      (groupPanels) => {
        this.groupPanels = groupPanels;
        this.populateDynamicForm(groupPanels);
      }
    );
  }

  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;

  dataGridGridOptionsExportCsv() {
    var params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Panel ID",
        field: "panelid",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Plan Code",
        field: "plancode",
        width: 200,
      },
      {
        headerName: "Eff Date",
        field: "effectivedate",
        width: 200,
      },
      {
        headerName: "Term Date",
        field: "termdate",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private DatePipe: DatePipe,
    public activeModal: NgbActiveModal,
    private groupPanelService: GroupPanelService,
    private toastService: ToastService,
    private groupMasterService: GroupMasterService,
    private planMasterService: PlanMasterService,
    private PanelMasterService: PanelMasterService,
    private router: Router,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService,
    private messageService: MessageMasterDtlService,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }
  initializeComponentState () {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.groupPanelForm);
    this.createDataGrid();
    this.getPanelId();
    this.getPlanId()
    if (this.groupId) {
      this.groupPanelForm.patchValue({
        groupId: this.groupId
      });
      this.getGroupPanelByGroupId(this.groupId);
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
                'You are not Permitted to view Group Panel',
                'Group Panel Permission'
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
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
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
    this.groupPanelForm = this.formBuilder.group(
      {
        groupId: ["", { updateOn: "blur", validators: [] }],
        dynamicText: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }
  getPanelId() {
    this.PanelMasterService.getPanelMasters().subscribe((data) => {
      this.panelOptions = data;
      var Options: any = [];
      this.panelOptions.forEach(function (index: any) {
        Options.push({
          key: index.panelId + " " + index.description,
          value: index.panelId,
        });
      });
      this.groupPanelFormConfig[0].options = Options;
    });
  }

  getPlanId() {
    this.planMasterService.getPlanMasters().subscribe((data) => {
      var Options: any = [];
      data.forEach(function (index: any) {
        Options.push({
          key: index.planCode + " " + index.description,
          value: index.planCode,
        });
      });
      this.groupPanelFormConfig[1].options = Options;
    });
  }
  populateDynamicForm(groupPanel: GroupPanel[]) {
    groupPanel && groupPanel.forEach((groupPanel: GroupPanel) => {
      let mockConfig = JSON.parse(JSON.stringify(this.groupPanelFormConfig)); // make a copy of original config
      this.groupPanelFormConfig.forEach((field, index) => {
        if (field.name === GroupPanelFieldNames.PANEL_ID) {
          mockConfig[index].value = groupPanel.panelId;
        } else if (field.name === GroupPanelFieldNames.PLAN_CODE) {
          mockConfig[index].value = groupPanel.planCode;
        } else if (field.name === GroupPanelFieldNames.EFF_DATE) {
          mockConfig[index].value = groupPanel.effectiveDate;
        } else if (field.name === GroupPanelFieldNames.TERM_DATE) {
          mockConfig[index].value = groupPanel.termDate;
        }
      });
      let formState: FormRow = new FormRow();
      formState.formFields = mockConfig;
      formState.id = {
        seqGroupId: groupPanel.groupPanelPrimaryKey.seqGroupId,
        id: groupPanel.groupPanelPrimaryKey.seqGroupPanel,
      };
      this.config = mockConfig;

      this.groupPanelState.push(formState); // add record
    });
    this.groupPanelState = JSON.parse(JSON.stringify(this.groupPanelState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }
  populateGroupPanel(event: any, action: FORM_FIELD_ACTION_TYPES) {
    let groupPanel = new GroupPanel();

    groupPanel.groupMaster = {
      seqGroupId: this.seqGroupId,
    };
    groupPanel.groupPanel = {
      panelId: event[0].value,
    };
    groupPanel.groupPanelPrimaryKey = {
      seqGroupId: this.seqGroupId,
    };
    groupPanel.panelId = event[0].value;
    groupPanel.planCode = event[1].value;
    groupPanel.effectiveDate = (event[2] && event[2].value) ? this.transformDate(event[2].value) : null;
    groupPanel.termDate = (event[3] && event[3].value) ? this.transformDate(event[3].value) : null;
    groupPanel.action = action;

    return groupPanel;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  transformDate(date: any) {
    var newDate =
      date.singleDate.date.month +
      "/" +
      date.singleDate.date.day +
      "/" +
      date.singleDate.date.year;
    var newDate_ = new Date(newDate);
    return this.DatePipe.transform(newDate_, "yyyy-MM-dd");
  }
  resetAllState() {
    this.groupPanelForm.reset();
    this.groupPanelState = JSON.parse(JSON.stringify(this.groupPanelState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }

  menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          {name: "New", shortcutKey: "Ctrl+M"},
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
          { isHorizontal: true },
          { name: "Sort by sequence", disabled: true },
          { name: "Sort by Panel ID", disabled: true },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Master File" },
          { name: "Detail" },
          { name: "Contracts" },
          { name: "Panel" },
          { name: "Billing Control" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "Group Lookup" }],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4'}],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Group Panel" },
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

  handleSaveFileMenu() {
    this.dynamicFormComponentEle.onSubmit();
  }
  onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewPanel();
          break;
        }
        case "Open": {
          // this.resetAllState();
          break;
        }
        case "Save": {
          this.handleSaveFileMenu();
          break;
        }
        case "Close": {
          // this.resetAllState();
          break;
        }
        case "Shortcut Menu": {
          this.modalService.open(FunctionalGroupShortCutComponent);
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
    } else if (event.menu.menuItem === "Special") {
      // handle File actions
      switch (event.action) {
        case "Group Lookup": {
          this.openLookupPage();
          break;
        }
        default: {
          this.toastService.showToast(
            "Action is in progress",
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
      }
    } else if (event.menu.menuItem === "Topic") {
      this.handleTopicMenu(event.action);
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen();
    }

    else {
      // handle Edit-Menu Actions
      this.toastService.showToast("Action is in progress", NgbToastType.Danger);
    }
  }

  handleTopicMenu(action: string) {
    switch (action) {
      case "Master File": {
        let ref = this.modalService.open(GroupMasterComponent);
        ref.componentInstance.showIcon = true;
        this.activeModal.close();
        break;
      }
      case "Detail": {
        let ref = this.modalService.open(GroupDetailComponent);
        ref.componentInstance.showIcon = true;
        this.activeModal.close();
        break;
      }
      case "Contracts": {
        let ref = this.modalService.open(GroupContractComponent);
        ref.componentInstance.showIcon = true;
        this.activeModal.close();
        break;
      }
      case "Panel": {
        let ref = this.modalService.open(GroupPanelComponent);
        ref.componentInstance.showIcon = true;
        this.activeModal.close();
        break;
      }
      case "Billing Control": {
        let ref = this.modalService.open(GroupBillingComponent);
        ref.componentInstance.showIcon = true;
        this.activeModal.close();
        break;
      }
      default: {
        this.toastService.showToast("Action is not valid", NgbToastType.Danger);
        break;
      }
    }
  }

  openLookupPage() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      //   this.groupMaster = resp;
      //   this.showGroupField = true;
      //  // this.populateContactPersonGrid();
      //   this.convertResultToGroupMaster(this.groupMaster);
    });
  }

  helpScreen = () => {
      const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.currentWin = '/GRUPP_Group_Panel.htm';
  }

  onLookupEvent = (event: any) => {
    if (event.key === 'F5') {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.searchModel;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.onRowSelected.subscribe((data: any) => {
        this.groupPanelForm.patchValue({
          groupId: data.groupId
        });
        this.getGroupPanelByGroupId(data.groupId);
      });
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (event.target.value === '') {
        this.messageService.findByMessageId(13106).subscribe(res => {
          this.showPopUp('13106: ' + res[0].messageText, 'Group')
        })
      } else {
        this.getGroupPanelByGroupId(event.target.value);
      }
    }
  };

  modalClose = () => {
    this.isScreenCloseRequest = true;
    if (this.formValueChangeStatus === true) {
      this.messageService
          .findByMessageId(29065)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopupAlert(message[0].messageText, 'Group Panel');
          });
    } else {
      this.activeModal.close();
    }
  };

  isFormValidateStatus() {
    this.groupPanelForm.valueChanges.subscribe(() => {
      this.formValueChangeStatus = true;
    })
  };

  dynamicFormValueChange = () => {
    this.isFormValidateStatus()
  };

  showPopupAlert(message: any, title: any) {
    let popUpMessage = new PopUpMessage(
        "popUpMessageName",
        title,
        message,
        "icon"
    );
    popUpMessage.buttons.push(
        new PopUpMessageButton("Yes", "Yes", "", this.inProgress)
    );
    popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
    popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;

    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === "Yes") {
        this.handleSaveFileMenu();
      } else if (resp.name === "No") {
        this.activeModal.close();
      } else if (resp.name === "Cancel") {

      }
    });
  }
}
