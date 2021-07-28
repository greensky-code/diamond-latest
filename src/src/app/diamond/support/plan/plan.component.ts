/* Copyright (c) 2021 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageMasterDtl, PlanMaster, SecWin } from "../../../api-models/index"
import { PlanMasterService } from "../../../api-services/plan-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { MessageMasterDtlService } from '../../../api-services/message-master-dtl.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Menu } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { getPlanMasterShortcutKeys } from '../../../shared/services/shared.service';
import { NgbToastType } from "ngb-toast";
import { Form } from '../../../shared/helpers/form.helper';
import { SupportHelpComponent } from "../support-help/support-help.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PlanComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "plan",
  templateUrl: "./plan.component.html",
  providers: [MessageMasterDtlService, PlanMasterService],
})
export class PlanComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  planForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "PLANC";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  userTemplateId: string;
  @Input() showIcon: boolean = false;
  public menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];
  pressedKey: any[] = [];

  planCodeRecord: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  searchStatus: boolean;
  planCode: any;
  errorPlanCode: boolean;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  menuOpened= ""
  @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
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

  editPlanMaster: boolean;
  planMaster: PlanMaster;
  planMasters: PlanMaster[];
  createPlanMaster() {
    this.formValidation.validateForm();
    if (this.planForm.valid) {
      let planMaster = new PlanMaster();
      planMaster.planCode = Form.getValue(this.planForm, "planCode");
      planMaster.description = Form.getValue(this.planForm, "description");
      planMaster.autoAuditPlanId = Form.getValue(this.planForm, "autoAudit");
      this.planMasterService
        .createPlanMaster(planMaster)
        .subscribe((response) => {
          this.toastService.showToast(
            'Record successfully created.',
            NgbToastType.Success
          );
          this.editPlanMaster = false;
          this.getPlanMasters();
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }

          setTimeout(() => {
            this.isFormDataChangeStatus = false;
          }, 2000);
        });
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  updatePlanMaster(planCode: string) {
    this.formValidation.validateForm();
    if (this.planForm.valid) {
      let planMaster = new PlanMaster();
      planMaster.planCode = Form.getValue(this.planForm, "planCode");
      planMaster.description = Form.getValue(this.planForm, "description");
      planMaster.autoAuditPlanId = Form.getValue(this.planForm, "autoAudit");
      this.planMasterService
        .updatePlanMaster(planMaster, planCode)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully updated.",
            NgbToastType.Success
          );
          this.getPlanMasters();
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }
          setTimeout(() => {
            this.isFormDataChangeStatus = false;
          }, 2000);
          this.editPlanMaster = false;
        });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  savePlanMaster() {
    if (this.editPlanMaster) {
      if (this.isSuperUser) {
        this.updatePlanMaster(this.planCode);
      } else {
        if (this.secWin.hasUpdatePermission()) {
          this.updatePlanMaster(this.planCode);
        } else {
          this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
            this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Plan')
          });
        }
      }
    } else {
      if (this.isSuperUser) {
        this.createPlanMaster();
      } else {
        if (this.secWin.hasInsertPermission()) {
          this.createPlanMaster();
        } else {
          this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
            this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Plan')
          });
        }
      }
    }
  }
  popUpButtonClicked(button: any) {
    if (button.name === "ok") {
      this.deletePlanCodeNow(this.planCode);
      this.dataGridGridOptions.api.setRowData([]);
    }
    if (button.name === "cancel") {
      console.log("button No has been click!");
    }
    this.popUpMessage = null;
  }
  deletePlanMaster(planCode: string) {
    let popMsg = new PopUpMessage(
      "groupNotExistPopup",
      "Plan Master",
      "29070: Press ok to delete this record",
      "icon"
    );
    popMsg.buttons = [
      new PopUpMessageButton("ok", "Ok", "btn btn-primary"),
      new PopUpMessageButton("cancel", "Cancel", "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
    ref.componentInstance.popupMessage = popMsg;
    ref.componentInstance.showIcon = true;
    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
      this.popUpButtonClicked(event);
    });
  }
  deletePlanCodeNow(planCode: string) {
    this.planMasterService.deletePlanMaster(planCode).subscribe((response) => {
      this.toastService.showToast(
        "Record successfully deleted.",
        NgbToastType.Success
      );
      this.getPlanMasters();
      this.dataGridGridOptions.api.selectIndex(0, false, false);
    });
  }
  getPlanMaster(planCode: string) {
    this.planMasterService.getPlanMaster(planCode).subscribe((planMaster) => {
      this.planMaster = planMaster;
      this.planForm.patchValue({
        planCode: this.planMaster.planCode,
        description: this.planMaster.description,
        autoAudit: this.planMaster.autoAuditPlanId,
      });
    });
  }
  getPlanMasters() {
    this.planMasterService.getPlanMasters().subscribe((planMasters) => {
      this.planMasters = planMasters;
      this.dataGridGridOptions.api.setRowData(this.planMasters);
      this.dataGridGridOptions.api.selectIndex(0, false, false);
    });
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
        headerName: "Plan Code",
        field: "planCode",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Description",
        field: "description",
        width: 200,
      },
      {
        headerName: "Auto Audit",
        field: "autoauditplanid",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageMasterDtlService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private securityService: SecurityService,
    private planMasterService: PlanMasterService,
    private menuSerrvice: MenuService
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();
  }

  private initializePermission(): void {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    this.secProgress = false;
    this.initializeComponentState();

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
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.planForm);
    this.createDataGrid();
    this.getPlanMasters();
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
      .findByTableNameAndUserId("PLAN_MASTER", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
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
          // this.initializeComponentState();

          //Check Menus Privilege Start
          let menuResponse = new MenuResponse();
          menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
          if (menuResponse.status) {
            this.menu = [];
            this.menu = [...menuResponse.menus];
          }
          //Check Menus Privilege End

        } else {
          this.showPopUp(
            "You are not Permitted to view Plan",
            "Plan Permission"
          );
        }
      });
  }
  disableMenu() {
    if (this.userTemplateId == "UT_VIEW") {
      this.menu[0]["dropdownItems"][0].disabled = true;
      this.menu[0]["dropdownItems"][3].disabled = true;
    }
  }
  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.planForm = this.formBuilder.group(
      {
        planCode: ["", { updateOn: "blur", validators: [Validators.required] }],
        description: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        autoAudit: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getPlanMasterShortcutKeys(this));
    this.cdr.detectChanges();
  }

  OnChangeGrid() {
    var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows.length === 1) {
      this.searchStatus = true;
      this.editPlanMaster = true;
      this.planCodeRecord = selectedRows[0];
      setTimeout(() => {
        try {
          this.planCodeRecord.updateDatetimeDisplay = this.datePipe.transform(
              new Date(this.planCodeRecord.updateDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
          this.planCodeRecord.insertDatetimeDisplay = this.datePipe.transform(
              new Date(this.planCodeRecord.insertDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
        } catch (e) {
          console.log(e);
        }
      }, 500);
      this.planCode = selectedRows[0].planCode;
      this.menu[0]["dropdownItems"][2].disabled = false;
      this.planForm.patchValue({
        planCode: selectedRows[0].planCode,
        description: selectedRows[0].description,
        autoAudit: selectedRows[0].autoAuditPlanId,
      });
      this.planForm.get("planCode").disable();
      this.isFormDataModified();
    } else {
      this.searchStatus = false;
    }
  }
  createNewPlan() {
    if (this.isSuperUser) {
      this.createPlan();
    } else {
      if (this.secWin.hasInsertPermission()) {
        this.createPlan();
      } else {
        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
          this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Plan')
        });
      }
    }
  }


  deletePlan() {
    if (this.isSuperUser) {
      this.deletePlanMaster(this.planCode);
    } else {
      if (this.secWin.hasDeletePermission()) {
        this.deletePlanMaster(this.planCode);
      } else {
        this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
          this.formPopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Plan')
        });
      }
    }
  }

  createPlan() {
    this.editPlanMaster = false;
    this.dataGridGridOptions.api.deselectAll();
    this.menu[0]["dropdownItems"][2].disabled = true;

    this.resetAll();
    this.planForm.get("planCode").enable();
  }


  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: 'Ctrl + N' },
          { name: "Open", disabled: true, shortcutKey: 'Ctrl + O' },
          { name: "Delete", shortcutKey: 'Ctrl + D' },
          { name: "Save", shortcutKey: 'Ctrl + S' },
          { name: "Close", shortcutKey: 'Ctrl + A4' },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: 'F2' },
          { name: "Shortcut Menu...", shortcutKey: 'F3' },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit", shortcutKey: 'Alt + A4' },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", disabled: true, shortcutKey: 'Ctrl + Z' },
          { isHorizontal: true },
          { name: "Cut", disabled: true, shortcutKey: 'Ctrl + X' },
          { name: "Copy", disabled: true, shortcutKey: 'Ctrl + C' },
          { name: "Paste", disabled: true, shortcutKey: 'Ctrl + V' },
          { isHorizontal: true },
          { name: "Lookup" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [
          { name: "Notes", disabled: true, shortcutKey: 'F4' }
        ],
      },
      {
        menuItem: "Window",
        dropdownItems: [
          { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
          { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Vendor Master" },
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
          this.createNewPlan();
          break;
        }
        case "Open": {
          this.resetAll();
          break;
        }
        case "Delete": {
          this.deletePlanMaster(this.planCode);
          break;
        }
        case "Save": {
          this.savePlanMaster();
          break;
        }
        case "Close": {
          this.modalClose();
          break;
        }
        case "Exit": {
          this.exitScreen();
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
    } else if (event.menu.menuItem === "Window") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Show Timestamp": {
          this.openShowTimestampComponent();
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

  resetAll() {
    this.dataGridGridOptions.api.deselectAll();
    this.planForm.reset();
  }
  /**
   * Handle Menu Actions for edit
   * @param action: string
   */
  private handleEditMenu(action: string) {
    switch (action) {
      case "Lookup": {
        // this.openLookupFieldSearchModel();
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

  ShowError(number: any, check: any, value = "1") {
    if (check) {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText.replace("1@", value),
            "Plan"
          );
        });
    } else {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(number + ":" + message[0].messageText, "Plan");
        });
    }
  }

  onChangePlanCode(event) {
    this.planMasterService
      .getPlanMaster(event.target.value)
      .subscribe((data) => {
        if (data) {
          this.errorPlanCode = true;
          event.preventDefault();
          this.ShowError(7109, false);
        } else {
          this.errorPlanCode = false;
        }
      }, (error) => {
        this.errorPlanCode = false;
      });
  }

  checkErrorBeforeSave() {
    if (this.errorPlanCode) {
      this.ShowError(7109, false);
      return false;
    } else {
      return true;
    }
  }

  modalClose() {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, 'Plan');
        });
    } else {
      this.activeModal.close();
    }
  }

  popupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage(
        "popUpMessageName",
        title,
        message,
        "icon"
      );
      popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
      popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
      popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === "Yes") {
          this.savePlanMaster();
        } else if (resp.name === "No") {
          this.router.navigateByUrl("/");
          if (this.screenCloseRequest === true) {
            this.activeModal.close();
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  isFormDataModified() {
    this.planForm.valueChanges.subscribe((res) => {
      this.isFormDataChangeStatus = true;
    });
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(SupportHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    viewModal.componentInstance.showIcon = true;
    viewModal.componentInstance.defaultFile = "/PLANC_Plan_Codes.htm";
  };

  formPopupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'Ok') {
          this.activeModal.close();
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  openShowTimestampComponent() {
    const ref = this.modalService.open(TimestampComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.insertDateTime = this.planCodeRecord.insertDatetime;
    ref.componentInstance.insertDateTime = this.planCodeRecord.insertDatetimeDisplay;
    ref.componentInstance.insertProcess = this.planCodeRecord.insertProcess;
    ref.componentInstance.insertUser = this.planCodeRecord.insertUser;
    ref.componentInstance.updateUser = this.planCodeRecord.updateUser;
    ref.componentInstance.updateDateTime = this.planCodeRecord.updateDatetimeDisplay;
    ref.componentInstance.updateProcess = this.planCodeRecord.updateProcess;
  }

  exitScreen = () => {
    this.messageService.findByMessageId(29062).subscribe(res => {
      let popMsg = new PopUpMessage(
          'poUpMessageName',
          'DIAMOND @ Client/Server System',
          res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
          'icon');
      popMsg.buttons = [
        new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
        new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
      ];
      let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popMsg;
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'Yes') {
          localStorage.removeItem('oldPassword');
          sessionStorage.removeItem("selectedGroup");
          sessionStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
            this.activeModal.close()
          }, 500);
        } else if (resp.name === 'No') {

        }
      });
    })
  };

  openFileMenu() {
    document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownFile"
  }
  openHelpMenu() {
    document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownHelp"
  }
  openWindowMenu() {
    document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownWindow"
  }

  triggerMenus(value) {
    let obj = {}
    if (this.menuBarComponent.first.menuOpen) {
      if (this.menuOpened == "fileDropdownFile") {
        switch (value) {
          case 'm':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'New'
            }
            this.onMenuItemClick(obj)
            break;
          case 'o':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Open'
            }
            this.onMenuItemClick(obj)
            break;
          case 'd':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Delete'
            }
            this.onMenuItemClick(obj)
            break;
          case 's':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Save'
            }
            this.onMenuItemClick(obj)
            break;
          case 'c':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Close'
            }
            this.onMenuItemClick(obj)
            break;
          case 'e':
            obj = {
              menu: {
                menuItem: 'File'
              },
              action: 'Exit'
            }
            this.onMenuItemClick(obj)
            break;
        }
      } else  if (this.menuOpened == "fileDropdownWindow") {
        switch (value) {
          case 's':
            obj = {
              menu: {
                menuItem: 'Window'
              },
              action: 'Show Timestamp'
            }
            this.onMenuItemClick(obj)
            break;
          case 'a':
            obj = {
              menu: {
                menuItem: 'Window'
              },
              action: 'Audit Display'
            }
            this.onMenuItemClick(obj)
            break;
          default:
            break;
        }
      } else if (this.menuOpened == 'fileDropdownHelp') {
        switch (value) {
          case 'c':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Contents'
            }
            this.onMenuItemClick(obj);
            break;
          case 's':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Search for Help on...'
            }
            this.onMenuItemClick(obj);
            break;
          case 't':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'This Window'
            }
            this.onMenuItemClick(obj);
            break;
          case 'g':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Glossary'
            }
            this.onMenuItemClick(obj);
            break;
          case 'd':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'Getting Started'
            }
            this.onMenuItemClick(obj);
            break;
          case 'h':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'How to use Help'
            }
            this.onMenuItemClick(obj);
            break;
          case 'a':
            obj = {
              menu: {
                menuItem: 'Help'
              },
              action: 'About Diamond Client/Server'
            }
            this.onMenuItemClick(obj);
            break;
        }
      }
    }
  };
}
