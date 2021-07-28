/* Copyright (c) 2021 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecUser, SecWin, SecWinDescr, SystemCodeToken} from '../../../api-models';
import {
  MessageMasterDtlService,
  SecUserService,
  SecWinDescrService,
  SystemCodeTokenService
} from '../../../api-services';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getWindowAccessShortcutKeys} from '../../../shared/services/shared.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {
  DynamicConfigFormRow,
  FORM_FIELD_ACTION_TYPES,
  FormField,
  FormRow,
  Menu,
  Option,
  SearchModel
} from '../../../shared/models/models';
import {WindowAccessLookup} from '../../../shared/lookup/window-access-lookup';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-renderer/checkbox-cell.component';
import {FunctionAccessComponent} from '../function-access/function-access.component';
import {UsersComponent} from '../users/users.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {CopyWindowsAccessComponent} from "../copy-windows-access/copy-windows-access.component";
import {WindoeAccessFields, WindowAccessConfig} from '../../addon/addon.constants';
import {SecurityHelpComponent} from "../security-help/security-help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {Router} from "@angular/router";

// Use the Component directive to define the WindowsAccessComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "windowsaccess",
  templateUrl: "./windows-access.component.html",
})
export class WindowsAccessComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() userId?: string;
  windowsAccessForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public isSuperUser = false;
  public secProgress = true;
  public dataGridGridOptions: GridOptions;
  public shortcuts: ShortcutInput[] = [];
  public menu: Menu[] = [];
  pSel: string;
  pIns: string;
  pUpd: string;
  pDel: string;
  editSecUser: boolean = true;
  secUser: SecUser;
  secUsers: SecUser[] = [];
  editSecWin: boolean = true;
  secWin: SecWinViewModel;
  secWins: SecWin[] = [];
  secWinRows: SecWin[] = [];
  systemCodeToken: SystemCodeToken;
  valueChangeRequest: boolean = false;

  private changedRow: any;
  private prevRow: SecWin = new SecWin();

  // ------------------- Speciality grid
  WindowAccessConfig = WindowAccessConfig;
  WindowAccessConfigFormState = new Array<DynamicConfigFormRow>();
  showAddNewLine = true;

  resetInlineGrid = false;
  saveInlineGrid = false;

  @Input() winID?: string;
  @Input() showIcon: boolean = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  menuOpened = "";
  @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
  searchModel = new SearchModel(
    "secusers/lookup",
    WindowAccessLookup.WINDOW_ACCESS_DEFAULT,
    WindowAccessLookup.WINDOW_ACCESS_ALL,
    []
  );

  private windowId: string = "SWIND";
  public windowIds: SecWinDescr[];
  private dataGridgridApi: any;
  private userTemplateId: string;
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  isFormModifiedStatus: Boolean = false;
  screenCloseRequested: Boolean = false;
  newSecWinRows: any;
  oldCount: number;
  oldsecWinRows: any;
  isLoadGrid: boolean;
  loader: boolean;
  issaveForm: boolean;
  oldState: DynamicConfigFormRow[];
  dynamicIndex: number = 0;
  isResetForm: boolean;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private systemCodeTokenService: SystemCodeTokenService,
    private secWinDescrService: SecWinDescrService,
    private messageService: MessageMasterDtlService,
    private renderer: Renderer2,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.shortcuts.push(...getWindowAccessShortcutKeys(this));
    this.cdr.detectChanges();
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

  createSecUser() {
    /*if (this.secWin.hasInsertPermission()) {*/
    this.formValidation.validateForm();
    if (this.windowsAccessForm.valid) {
      let secUser = new SecUser();
      secUser.userId = Form.getValue(this.windowsAccessForm, "userId");
      secUser.fname = Form.getValue(this.windowsAccessForm, "name");
      secUser.userType = Form.getValue(this.windowsAccessForm, "userType");
      secUser.dfltTemplate = Form.getValue(
        this.windowsAccessForm,
        "department"
      );
      secUser.usrLocation = Form.getValue(this.windowsAccessForm, "location");
      this.secUserService.createSecUser(secUser).subscribe((response) => {
        this.toastService.showToast(
          "Record successfully created",
          NgbToastType.Success
        );
        this.editSecUser = false;
      });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateSecUser(userId: string) {
    /*if (this.secWin && this.secWin.hasUpdatePermission()) {*/
    this.formValidation.validateForm();
    if (this.windowsAccessForm.valid) {
      let secUser = new SecUser();
      secUser.userId = Form.getValue(this.windowsAccessForm, "userId");
      secUser.fname = Form.getValue(this.windowsAccessForm, "name");
      secUser.userType = Form.getValue(this.windowsAccessForm, "userType");
      secUser.dfltTemplate = Form.getValue(
        this.windowsAccessForm,
        "department"
      );
      secUser.usrLocation = Form.getValue(this.windowsAccessForm, "location");
      this.secUserService
        .updateSecUser(secUser, userId)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully updated",
            NgbToastType.Success
          );
          this.editSecUser = false;
        });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
    /*        } else {
                    this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
                }*/
  }

  saveSecUser() {
    if (this.editSecUser) {
      this.updateSecUser(this.secUser.userId);
    } else {
      this.createSecUser();
    }
  }

  deleteSecUser(userId: string) {
    /*        if (!(this.secWin && this.secWin.hasDeletePermission())) {
                    this.showPopUp('Not permitted to delete', 'Group Master Security');
                } else {*/
    this.secUserService.deleteSecUser(userId).subscribe((response) => {
      this.toastService.showToast(
        "Record successfully deleted",
        NgbToastType.Success
      );
    });
    /*       }*/
  }

  getSecUser(userId: string) {
    this.secUserService.getSecUser(userId).subscribe((secUser) => {
      if (secUser) {
        this.windowsAccessForm.get("userId").disable();
        this.secUser = secUser;
        if (this.secUser.lname && this.secUser.fname) {
          this.windowsAccessForm.patchValue({
            name: this.secUser.fname + " " + this.secUser.lname,
          });
        } else if (this.secUser.lname) {
          this.windowsAccessForm.patchValue({
            name: this.secUser.lname,
          });
        } else if (this.secUser.fname) {
          this.windowsAccessForm.patchValue({
            name: this.secUser.fname,
          });
        }
        this.windowsAccessForm.patchValue({
          userId: this.secUser.userId,
          department: this.secUser.curUsrDept,
          location: this.secUser.usrLocation,
        });
        this.setUserType(secUser.userType);
        this.userId = userId;
        this.getSecWinsByUserId(secUser.userId);
      } else {
        this.messageService.findByMessageId(11090).subscribe((res) => {
          this.showPopUp("11090: " + res[0].messageText, "Window Access");
        });
      }
    });
  }

  setUserType(userType: any) {
    this.systemCodeToken = new SystemCodeToken();
    this.systemCodeTokenService
      .getSystemCToken(userType)
      .subscribe((systemCodeToken) => {
        this.systemCodeToken = systemCodeToken;
        this.windowsAccessForm.patchValue(
          {
            userType: this.systemCodeToken.systemCodeDesc1,
          },
          { emitEvent: false }
        );
      });
  }

  getSecUsers() {
    this.secUserService.getSecUsers().subscribe((secUsers) => {
      this.secUsers = secUsers;
    });
  }

  createSecWin() {
    /*       if (this.secWin.hasInsertPermission()) {*/
    this.formValidation.validateForm();
    if (this.windowsAccessForm.valid) {
      let secWin;
      secWin = {
        insertUser: "",
        insertDatetime: "",
        insertProcess: "",
        pdel: "",
        psel: "",
        pupd: "",
        pins: "",
        maxOpen: 0,
        languageId: 0,
        secWinPrimaryKey: {
          userId: "",
          winId: "",
        },
        updateDatetime: "",
        updateProcess: "",
        updateUser: "",
      };
      secWin.insertDatetime = new Date().toISOString().split("T")[0];
      secWin.insertUser = this.securityService.getCurrentUserToken().sub;
      secWin.insertProcess = this.windowId;
      secWin.psel = this.changedRow.psel;
      secWin.pdel = this.changedRow.pdel;
      secWin.pins = this.changedRow.pins;
      secWin.pupd = this.changedRow.pupd;
      secWin.languageId = this.changedRow.languageId
        ? this.changedRow.languageId
        : 0;
      secWin.maxOpen = this.changedRow.maxOpen ? this.changedRow.maxOpen : 1;
      secWin.secWinPrimaryKey.userId =
        this.windowsAccessForm.get("userId").value;
      secWin.secWinPrimaryKey.winId = "MEMBR";
      secWin.updateDatetime = new Date().toISOString().split("T")[0];
      secWin.updateUser = this.securityService.getCurrentUserToken().sub;
      secWin.updateProcess = this.windowId;
      this.secWinService.createSecWin(secWin).subscribe((response) => {
        this.toastService.showToast(
          "Record successfully created",
          NgbToastType.Success
        );
        this.editSecWin = true;
        this.valueChangeRequest = false;
        if (this.screenCloseRequested === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
          this.isFormModifiedStatus = true;
        }
      });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  updateRecord(prevRow, count) {}
  updateSecWin(data: any) {
    this.formValidation.validateForm();
    if (this.windowsAccessForm.valid) {
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        this.prevRow = data[i];
        this.prevRow.languageId =
          this.prevRow.languageId == null ? 0 : this.prevRow.languageId;
        this.secWinService
          .updateSecWin(
            this.prevRow,
            this.prevRow.secWinPrimaryKey["winId"],
            this.prevRow.secWinPrimaryKey["userId"]
          )
          .subscribe((response) => {
            count += 1;
          });

        if (count == this.secWinRows.length) {
          this.toastService.showToast(
            "Record successfully updated",
            NgbToastType.Success
          );

          if (this.screenCloseRequested === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
            this.isFormModifiedStatus = true;
          }
        }
      }
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveSecWin() {
    this.issaveForm = true;
    setTimeout(() => {
      this.issaveForm = false;
    }, 1000);
    // if (this.editSecWin) {
    //   if (this.secWinRows) {
    //     this.updateSecWin(this.dataGridGridOptions.api.getSelectedRows());
    //   } else {
    //     this.alertMessage = this.alertMessageService.error("No Record To Save");
    //   }
    // } else {
    //   this.createSecWin();
    // }
  }

  deleteSecWin(winId: string) {
    this.secWinService.deleteSecWin(winId).subscribe((response) => {
      this.toastService.showToast(
        "Record successfully deleted",
        NgbToastType.Success
      );
    });
  }

  getSecWin(userId: string, winId: string) {
    this.secWinService.getSecWin(userId, winId).subscribe((secWin) => {
      this.secWin = new SecWinViewModel(secWin);
      this.windowsAccessForm.patchValue({
        userId: this.secWin.userId,
      });
    });
  }

  getSecWins() {
    this.secWinService.getSecWins().subscribe((secWins) => {
      this.secWins = secWins;
    });
  }

  getSecWinsByUserId(userId: string) {
    this.secWinService.findBySecWinUserId(userId).subscribe((secWins) => {
      this.secWinRows = secWins;
      this.oldCount = this.secWinRows?.length;
      this.populateDynamicForm();
    });
  }

  getWindowIds(): void {
    this.secWinDescrService.getGroupsShortKeys().subscribe((elems) => {
      const keys = [];
      this.windowIds = elems;
      if (this.userId) {
        this.getSecUser(this.userId);
      }
    });
  }

  dataGridGridOptionsExportCsv() {
    let params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  createDataGrid(keys: string[]): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.singleClickEdit = true;
    this.dataGridGridOptions.editType = "column";
    this.dataGridGridOptions.rowSelection = "single";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Win ID",
        field: "secWinPrimaryKey.winId",
        width: 200,
        headerClass: "clr-blue",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: keys,
        },
      },
      {
        headerName: "P Sel",
        field: "psel",
        width: 100,
        cellRendererFramework: CheckboxCellComponent,
      },
      {
        headerName: "P Ins",
        field: "pins",
        width: 100,
        cellRendererFramework: CheckboxCellComponent,
      },
      {
        headerName: "P Upd",
        field: "pupd",
        width: 100,
        cellRendererFramework: CheckboxCellComponent,
      },
      {
        headerName: "P Del",
        field: "pdel",
        width: 100,
        cellRendererFramework: CheckboxCellComponent,
      },
      {
        headerName: "Max Open",
        field: "maxOpen",
        width: 200,
        editable: true,
      },
    ];
  }

  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.windowsAccessForm);
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
      .findByTableNameAndUserId("SEC_WIN", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secProgress = false;
      });
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */
  hasPermission() {
    if (this.isSuperUser) {
      this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
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
      this.getSecWin(userId, user.dfltTemplate);
    });
  }

  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.windowsAccessForm = this.formBuilder.group(
      {
        userId: ["", { updateOn: "blur", validators: [] }],
        name: ["", { updateOn: "blur", validators: [] }],
        userType: ["", { updateOn: "blur", validators: [] }],
        department: ["", { updateOn: "blur", validators: [] }],
        location: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  openLookupFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      this.secUser = res;
      this.getSecUser(this.secUser.userId);
      this.editSecUser = true;
      this.popUpMessage = null;
      this.windowsAccessForm.patchValue({
        name: res.description,
      });
    });
  }

  createNewRow(): void {
    let row = [{}];
    this.dataGridGridOptions.api.updateRowData({
      add: row,
      addIndex: this.secWinRows.length + 1,
    });
    this.valueChangeRequest = true;
  }

  onMenuItemClick(event) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewDataScreen();
          break;
        }
        case "Open": {
          this.openScreen();
          break;
        }
        case "Save": {
          this.save();
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
        case "Shortcut Menu...": {
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
      switch (event.action) {
        case "Lookup": {
          this.openLookupFieldSearchModel();
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
    } else if (event.menu.menuItem === "Topic") {
      this.handleTopicMenu(event.action);
    } else if (event.menu.menuItem === "Window") {
      switch (event.action) {
        case "Show Timestamp":
          if (this.windowsAccessForm.get("userId").value) {
            this.showTimeStamp();
          } else {
            this.messageService.findByMessageId(21127).subscribe((res) => {
              this.showPopUp(
                "21127: " +
                  res[0].messageText.replace("@1", "Record Timestamp"),
                "Record Timestamp"
              );
            });
          }
          break;
        case "Audit Display": {
          this.toastService.showToast('Action is not implemented', NgbToastType.Danger);
          break;
        }
        default:
          break;
      }
    } else if (event.menu.menuItem === "Special") {
      switch (event.action) {
        case "Copy Window Access":
          this.copyWindowAccessScreen();
          break;
        default:
          break;
      }
    } else if (event.menu.menuItem === "Help") {
      this.helpScreen();
    } else {
      this.toastService.showToast("Action is not valid", NgbToastType.Danger);
    }
  }

  private handleTopicMenu(action: string) {
    switch (action) {
      case "Users": {
        const ref = this.modalService.open(UsersComponent, { size: <any>"xl" });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.userId = this.userId;
        this.activeModal.close()
        break;
      }
      case "Function Access": {
        const ref = this.modalService.open(FunctionAccessComponent, {
          size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.userId = this.userId;
        this.activeModal.close()
        break;
      }
      case "Window Access": {
        const ref = this.modalService.open(WindowsAccessComponent, {
          size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.userId = this.userId;
        this.activeModal.close()
        break;
      }
    }
  }

  private initializePermission(): void {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (this.isSuperUser) {
      this.secProgress = false;
      this.initializeComponentState();
      return;
    }

    const parsedToken = this.securityService.getCurrentUserToken();
    let userId = null;
    if (parsedToken) {
      userId = parsedToken.sub;
    }

    this.secWinService
      .getSecWin(this.windowId, userId)
      .subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);

        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
        } else {
          this.showPopUp(
            "You are not Permitted to view Group Master",
            "Window Error"
          );
        }
      });
  }

  private initializeComponentState(): void {
    this.getWindowIds();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.windowsAccessForm);
    if (this.userId) {
      this.getSecUser(this.userId)
    }
  }

  /**
   * Initialize menu
   */
  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: "Ctrl+M" },
          { name: "Open", shortcutKey: "Ctrl+O" },
          { name: "Save", shortcutKey: "Ctrl+S" },
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
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Users" },
          { name: "Window Access" },
          { name: "Function Access" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "Copy Window Access", shortcutKey: "Ctrl+Y" }],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
      },
      {
        menuItem: "Window",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
          { name: "Audit Display", shortcutKey: "Shift+Alt+A" },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Window Access" },
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

  onRowValueChange($event: any) {
    this.changedRow = $event.data;
  }

  onRowSelection($event: any) {
    this.prevRow = Object.assign(
      this.prevRow,
      this.dataGridGridOptions.api.getSelectedRows()[0]
    );
    this.changedRow = this.dataGridGridOptions.api.getSelectedRows()[0];
  }

  isFormDataModified = () => {
    this.windowsAccessForm.valueChanges.subscribe(() => {
      this.isFormModifiedStatus = true;
    });
  };

  modalClose = () => {
    this.screenCloseRequested = true;
    if (this.isFormModifiedStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopupAlert(message[0].messageText, "Window Access");
        });
    } else {
      this.activeModal.close();
    }
  };

  showPopupAlert = (message: string, title: string) => {
    let popUpMessage = new PopUpMessage(
      title,
      title,
      message,
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
    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === "Yes") {
        this.saveSecWin();
      } else if (resp.name === "No") {
        if (this.screenCloseRequested === true) {
          this.activeModal.close();
        }
      } // 3rd case: In case of cancel do nothing
    });
  };

  onKeyDownLookup = (event) => {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupFieldSearchModel();
    }
    if (event.target.value && event.key === "Tab") {
      event.preventDefault();
      this.getSecUser(event.target.value);
    } else if (event.key === "Tab") {
      event.preventDefault();
      this.userIdEmptyPopup();
    }
  };

  userIdEmptyPopup = () => {
    this.messageService
      .findByMessageId(11090)
      .subscribe((message: MessageMasterDtl[]) => {
        let popUpMessage = new PopUpMessage(
          "popUpMessageName",
          "Windows Access",
          "11090: " + message[0].messageText,
          "icon"
        );
        popUpMessage.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe(() => {});
      });
  };

  private showTimeStamp = () => {
    let ref = this.modalService.open(TimestampComponent);
    ref.componentInstance.title = "Window Access";

    ref.componentInstance.insertDateTime =
      this.secWinRows[this.dynamicIndex].insertDatetimeDisplay;
    ref.componentInstance.insertProcess =
      this.secWinRows[this.dynamicIndex].insertProcess;
    ref.componentInstance.insertUser =
      this.secWinRows[this.dynamicIndex].insertUser;
    ref.componentInstance.updateUser =
      this.secWinRows[this.dynamicIndex].updateUser;
    ref.componentInstance.updateDateTime =
      this.secWinRows[this.dynamicIndex].updateDatetimeDisplay;
    ref.componentInstance.updateProcess =
      this.secWinRows[this.dynamicIndex].updateProcess;
  };
  resetDynamicGrid() {
    this.resetInlineGrid = true;
    setTimeout(() => {
      this.resetInlineGrid = false;
    }, 500);
  }
  openCopyWindow = () => {
    let ref = this.modalService.open(CopyWindowsAccessComponent, {
      size: <any>"xl",
      backdrop: "static",
      keyboard: false,
      ...NGBModalOptions,
    });
    ref.componentInstance.showIcon = true;
    if (ref.componentInstance.submitForm) {
      ref.componentInstance.submitForm.subscribe((window: any) => {
        console.log(window);
        if (this.secWinRows) {
          //this.oldsecWinRows = this.secWinRow;
          this.newSecWinRows = window;
          this.resetDynamicGrid();
          this.secWinRows = this.secWinRows.concat(window);
          setTimeout(() => {
                      this.populateDynamicForm();
          }, 700);
          //this.dataGridGridOptions.api.setRowData(this.secWinRows);
        } else {
          //this.dataGridGridOptions.api.setRowData(window);
        }
        //this.groupUserFields = groupMaster;
        //this.groupMaster = groupMaster;
      });
    }
  };

  private popUpButtonClicked(button: PopUpMessageButton) {
    if (button.name == "yes") {
      this.createSecWin();
    }
    if (button.name == "no") {
    }
  }

  createNewDataScreen = () => {
    let userId = this.windowsAccessForm.get("userId").value;
    if (userId === "") {
      this.messageService.findByMessageId(11015).subscribe((res) => {
        this.showPopUp("11015: " + res[0].messageText, "Window Access");
      });
      this.renderer.selectRootElement("#userId").focus();
    } else {
      if (this.valueChangeRequest === true) {
        this.messageService.findByMessageId(29065).subscribe((res) => {
          if (!res) {
            return;
          }
          let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            "Window Access",
            "29065: " + res[0].messageText,
            "icon"
          );
          popUpMessage.buttons = [
            new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("no", "No", "btn btn-primary"),
            new PopUpMessageButton("cancel", "Cancel", "btn btn-primary"),
          ];
          let ref = this.modalService.open(PopUpMessageComponent);
          ref.componentInstance.popupMessage = popUpMessage;
          ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event);
          });
        });
      } else {
        this.createNewRow();
        this.editSecWin = false;
      }
    }
  };

  /**
   * form date to grid state
   */
  populateDynamicForm() {
    this.WindowAccessConfigFormState = [];
    const values = this.secWinRows;
    // set dynamic grid dropdown values
    this.WindowAccessConfig.forEach((field: FormField) => {
      field.options = new Array<Option>();
      if (field.name == WindoeAccessFields.WIN_ID) {
        this.windowIds.forEach((value) => {
          field.options.push({
            key: value["win_ID"] + " -- " + value["sdescr"],
            value: value["win_ID"],
          });
        });
      }
    });
    if (!values || values.length == 0) {
      this.WindowAccessConfigFormState = JSON.parse(
        JSON.stringify(this.WindowAccessConfigFormState)
      );
      this.isLoadGrid = true;
      this.loader = false;
      return;
    } else {
      values.forEach((value: SecWin) => {
        let mockConfig = JSON.parse(JSON.stringify(this.WindowAccessConfig)); // make a copy of original config
        let formState: FormRow = new FormRow();
        mockConfig.forEach((field: any, index: any) => {
          field.hideField = false;
          if (field.name === WindoeAccessFields.WIN_ID) {
            mockConfig[index].value = value.secWinPrimaryKey.winId;
          } else if (field.name === WindoeAccessFields.P_SEL) {
            if (value.psel == "N") {
              mockConfig[index].value = false;
            } else {
              mockConfig[index].value = true;
            }
          } else if (field.name === WindoeAccessFields.P_INS) {
            if (value.pins == "N") {
              mockConfig[index].value = false;
            } else {
              mockConfig[index].value = true;
            }
          } else if (field.name === WindoeAccessFields.P_UPD) {
            if (value.pupd == "N") {
              mockConfig[index].value = false;
            } else {
              mockConfig[index].value = true;
            }
          } else if (field.name === WindoeAccessFields.P_DEL) {
            if (value.pdel == "N") {
              mockConfig[index].value = false;
            } else {
              mockConfig[index].value = true;
            }
          } else if (field.name === WindoeAccessFields.MAX_OPEN) {
            mockConfig[index].value = value.maxOpen;
          }
        });
        formState.formFields = mockConfig;
        formState.id = {
          data: value,
        };
        formState.action = null;
        this.WindowAccessConfigFormState.push(formState); // add record
      });

      this.WindowAccessConfig = JSON.parse(
        JSON.stringify(this.WindowAccessConfig)
      ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
      this.WindowAccessConfigFormState = JSON.parse(
        JSON.stringify(this.WindowAccessConfigFormState)
      ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
      this.oldState = this.WindowAccessConfigFormState;
      this.isLoadGrid = true;
      this.loader = false;
    }
  }

  saveForm(event: any) {
    const prevState = event.formState;
    this.WindowAccessConfigFormState = prevState;
    event = event.fields;
    let apiValues = new Array<SecWin>();
    if (this.newSecWinRows) {
      for (
        var i = this.secWinRows.length - this.newSecWinRows.length;
        i < this.secWinRows.length;
        i++
      ) {
        this.WindowAccessConfigFormState[i].action =
          FORM_FIELD_ACTION_TYPES.ADD;
      }
    }
    const updatedRecords: FormRow[] = this.WindowAccessConfigFormState.filter(
      (record: any, index) => {
        record.index = index;
        return (
          record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
          record.action === FORM_FIELD_ACTION_TYPES.DELETE
        );
      }
    );

    if (updatedRecords.length > 0) {
      updatedRecords.forEach((preStateRecord: FormRow, index) => {
        if (preStateRecord.action) {
          let updatedRecord = event[preStateRecord.index];
          const pair = Object.keys(updatedRecord).map((k) => ({
            key: k,
            value: updatedRecord[k],
          }));
          let ciebPricingAccntCodeModel: SecWin = preStateRecord.id
            ? preStateRecord.id.data
            : new SecWin();
          let apiValue: SecWin = this.populateFormFields(
            ciebPricingAccntCodeModel,
            pair,
            preStateRecord.index,
            preStateRecord.action
          );

          apiValues.push(apiValue);
        }
      });
    }
    const newRecords: FormRow[] = this.WindowAccessConfigFormState.filter(
      (record) => record.action == FORM_FIELD_ACTION_TYPES.ADD
    );
    this.WindowAccessConfigFormState.forEach((record, index) => {
      if (record.action == FORM_FIELD_ACTION_TYPES.ADD || !record.id) {
        let SecWinModel = new SecWin();
        let newRecord = event[index];
        const pair = Object.keys(event[index]).map((k) => ({
          key: k,
          value: newRecord[k],
        }));
        let apiValue: SecWin = this.populateFormFields(
          SecWinModel,
          pair,
          record.index,
          FORM_FIELD_ACTION_TYPES.ADD
        );
        apiValues.push(apiValue);
      }
    });
    let SecWinModels: SecWin[] = [];
    apiValues.forEach((value, index) => {
      var desc = this.windowIds.filter(
        (data) => data["win_ID"] == value.secWinPrimaryKey.winId
      )[0];
      // ----------------- Save form-----------------------------------------------------
      let secWin = new SecWin();
      secWin.insertUser = this.securityService.getCurrentUserToken().sub;
      secWin.insertProcess = this.windowId;
      secWin.psel = value.psel;
      secWin.pdel = value.pdel;
      secWin.pins = value.pins;
      secWin.pupd = value.pupd;
      secWin.languageId = 0;
      secWin.secWinDescr = new SecWinDescr();
      secWin.secWinDescr.winId = value.secWinPrimaryKey.winId;
      secWin.secWinDescr["secWinDescrPrimaryKey"] = {};
      secWin.secWinDescr["secWinDescrPrimaryKey"]["languageId"] = 0;
      secWin.secWinDescr["secWinDescrPrimaryKey"]["winId"] =
        value.secWinPrimaryKey.winId;
      secWin.maxOpen = value.maxOpen ? value.maxOpen : 1;
      secWin.windowId = value.secWinPrimaryKey.winId;
      if (value.action != "add") {
        secWin.secWinPrimaryKey = {
          winId: this.oldState[value.index].formFields[0].value,
          userId: this.windowsAccessForm.get("userId").value,
        };
      } else {
        secWin.secWinPrimaryKey = {
          winId: value.secWinPrimaryKey.winId,
          userId: this.windowsAccessForm.get("userId").value,
        };
      }
      secWin.updateUser = this.securityService.getCurrentUserToken().sub;
      secWin.updateProcess = this.windowId;
      secWin.action = value.action;
      secWin.insertUser = sessionStorage.getItem("user");
      SecWinModels.push(secWin);
    });

    if (SecWinModels && SecWinModels.length > 0) {
      this.secWinService.updateUserSec(SecWinModels).subscribe((resp) => {
        this.toastService.showToast(
          "Record successfully updated",
          NgbToastType.Success
        );
        if (this.screenCloseRequested === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
          this.isFormModifiedStatus = true;
        }
        return;
      });
    }
  }

  /**
   * populate fields to models
   * @param secWinModel
   * @param event
   * @param index
   * @param action
   */
  populateFormFields(
    secWinModel: SecWin,
    event: any,
    index: any,
    action: FORM_FIELD_ACTION_TYPES
  ): SecWin {
    secWinModel.index = index;
    secWinModel.secWinPrimaryKey = {winId:"", userId:""};
    secWinModel.secWinPrimaryKey = {
      winId: event[0].value,
      userId: this.windowsAccessForm.get("userId").value,
    };
    if (event[1].value == true) {
      secWinModel.psel = "Y";
    } else {
      secWinModel.psel = "N";
    }
    if (event[2].value == true) {
      secWinModel.pins = "Y";
    } else {
      secWinModel.pins = "N";
    }
    if (event[3].value == true) {
      secWinModel.pupd = "Y";
    } else {
      secWinModel.pupd = "N";
    }
    if (event[5].value == true) {
      secWinModel.pdel = "Y";
    } else {
      secWinModel.pdel = "N";
    }
    secWinModel.action = action;

    secWinModel.maxOpen = event[5].value;
    return secWinModel;
  }

  helpScreen() {
    const modalRef = this.modalService.open(SecurityHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    modalRef.componentInstance.showIcon = true;
    modalRef.componentInstance.defaultFile = "SWIND_Window_Security.htm";
  }

  openScreen() {
    if (this.isFormModifiedStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          try {
            if (!message) {
              return;
            }
            let popUpMessage = new PopUpMessage(
              "popUpMessageName",
              "Window Access",
              message[0].messageText,
              "icon"
            );
            popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
            popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
            popUpMessage.buttons.push(
              new PopUpMessageButton("Cancel", "Cancel", "")
            );
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
              if (resp.name === "Yes") {
                this.issaveForm = true;
                setTimeout(() => {
                  this.issaveForm = false;
                }, 1000);
                setTimeout(() => {
                  this.openNewScreen();
                }, 1000);
              } else if (resp.name === "No") {
                this.openNewScreen();
              }
            });
          } catch (e) {}
        });
    } else {
      this.openNewScreen();
    }
  }

  openNewScreen() {
    this.windowsAccessForm.reset();
    this.windowsAccessForm.get("userId").enable();
    this.resetInlineGrid = true;
  }

  onRowClickEvent(event) {
    this.dynamicIndex = event.index;
  }

  save() {
    this.issaveForm = true;
    setTimeout(() => {
      this.issaveForm = false;
    }, 1000);
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
  openSpecialMenu() {
    document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownSpecial"
  }
  openWindowMenu() {
    document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownWindow"
  }

  openTopicMenu() {
    document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownTopic"
  }

  openHelpMenu() {
    document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownHelp"
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
      } else  if (this.menuOpened == "fileDropdownTopic") {
        switch (value) {
          case 'u':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Users'
            }
            this.onMenuItemClick(obj)
            break;
          case 'a':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Window Access'
            }
            this.onMenuItemClick(obj)
            break;
          case 'n':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Function Access'
            }
            this.onMenuItemClick(obj)
            break;
          default:
            break;
        }
      } else  if (this.menuOpened == "fileDropdownSpecial") {
        switch (value) {
          case 'f':
            obj = {
              menu: {
                menuItem: 'Special'
              },
              action: 'Copy Window Access'
            }
            this.onMenuItemClick(obj)
            break;
          default:
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

  copyWindowAccessScreen() {
    let userId = this.windowsAccessForm.get("userId").value;
    if (userId === "") {
      this.messageService.findByMessageId(11019).subscribe((res) => {
        this.showPopUp("11019: " + res[0].messageText, "Window Access");
      });
    } else {
      this.openCopyWindow();
    }
  }
}
