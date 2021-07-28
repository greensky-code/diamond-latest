/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
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
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecUser, SecWin, SystemCodeToken} from '../../../api-models';
import {MessageMasterDtlService, SecUserService, SecWinDescrService, SystemCodeTokenService} from '../../../api-services';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getCopyWindowAccessShortcutKeys, getWindowAccessShortcutKeys} from '../../../shared/services/shared.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {WindowAccessLookup} from '../../../shared/lookup/window-access-lookup';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-renderer/checkbox-cell.component';
import { FunctionAccessComponent } from '../function-access/function-access.component';
import { UsersComponent } from '../users/users.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";

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
  selector: "copywindowsaccess",
  templateUrl: "./copy-windows-access.component.html",
})
export class CopyWindowsAccessComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() userId?: string;
  copyWindowsAccessForm: FormGroup;
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
  submitForm = new EventEmitter<any>();

  private changedRow: any;
  private prevRow: SecWin = new SecWin();

  @Input() winID?: string;
  @Input() showIcon: boolean = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  searchModel = new SearchModel(
    "secusers/lookup",
    WindowAccessLookup.WINDOW_ACCESS_DEFAULT,
    WindowAccessLookup.WINDOW_ACCESS_ALL,
    []
  );
  private windowId: string = "SWIND";
  public windowIds: string[];
  private dataGridgridApi: any;
  private userTemplateId: string;
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  isFormModifiedStatus: Boolean = false;
  screenCloseRequested: Boolean = false;
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
    private messageService: MessageMasterDtlService
  ) {}

  ngAfterViewInit(): void {
    this.shortcuts.push(...getCopyWindowAccessShortcutKeys(this));
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
    /*        if (this.secWin.hasInsertPermission()) {*/
    this.formValidation.validateForm();
    if (this.copyWindowsAccessForm.valid) {
      let secUser = new SecUser();
      secUser.userId = Form.getValue(this.copyWindowsAccessForm, "userId");
      secUser.fname = Form.getValue(this.copyWindowsAccessForm, "name");
      secUser.userType = Form.getValue(this.copyWindowsAccessForm, "userType");
      secUser.dfltTemplate = Form.getValue(
        this.copyWindowsAccessForm,
        "department"
      );
      secUser.usrLocation = Form.getValue(
        this.copyWindowsAccessForm,
        "location"
      );
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
    /*   if (this.secWin && this.secWin.hasUpdatePermission()) {*/
    this.formValidation.validateForm();
    if (this.copyWindowsAccessForm.valid) {
      let secUser = new SecUser();
      secUser.userId = Form.getValue(this.copyWindowsAccessForm, "userId");
      secUser.fname = Form.getValue(this.copyWindowsAccessForm, "name");
      secUser.userType = Form.getValue(this.copyWindowsAccessForm, "userType");
      secUser.dfltTemplate = Form.getValue(
        this.copyWindowsAccessForm,
        "department"
      );
      secUser.usrLocation = Form.getValue(
        this.copyWindowsAccessForm,
        "location"
      );
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
    this.copyWindowsAccessForm.get("userId").disable();
    this.secUserService.getSecUser(userId).subscribe((secUser) => {
      this.secUser = secUser;
      if (this.secUser.lname && this.secUser.fname) {
        this.copyWindowsAccessForm.patchValue({
          name: this.secUser.fname + " " + this.secUser.lname,
        });
      } else if (this.secUser.lname) {
        this.copyWindowsAccessForm.patchValue({
          name: this.secUser.lname,
        });
      } else if (this.secUser.fname) {
        this.copyWindowsAccessForm.patchValue({
          name: this.secUser.fname,
        });
      }
      this.copyWindowsAccessForm.patchValue({
        userId: this.secUser.userId,
        department: this.secUser.curUsrDept,
        location: this.secUser.usrLocation,
      });
      this.setUserType(secUser.userType);
      this.userId = userId;
      this.getSecWinsByUserId(secUser.userId);
    });
  }

  setUserType(userType: any) {
    this.systemCodeToken = new SystemCodeToken();
    this.systemCodeTokenService
      .getSystemCToken(userType)
      .subscribe((systemCodeToken) => {
        this.systemCodeToken = systemCodeToken;
        this.copyWindowsAccessForm.patchValue(
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
    if (this.copyWindowsAccessForm.valid) {
      let secWin = new SecWin();
      secWin.userId = Form.getValue(this.copyWindowsAccessForm, "userId");
      secWin.insertDatetime = new Date();
      secWin.insertUser = this.securityService.getCurrentUserToken().sub;
      secWin.psel = this.changedRow.psel;
      secWin.pdel = this.changedRow.pdel;
      secWin.pins = this.changedRow.pins;
      secWin.pupd = this.changedRow.pupd;
      secWin.secWinPrimaryKey.userId = secWin.userId;
      secWin.secWinPrimaryKey.winId = this.changedRow.winId;
      this.secWinService.createSecWin(secWin).subscribe((response) => {
        this.toastService.showToast(
          "Record successfully created",
          NgbToastType.Success
        );
        this.editSecWin = true;
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
    /*        } else {

                }*/
  }

  updateSecWin(winId: string, userId: string) {
    this.formValidation.validateForm();
    if (this.copyWindowsAccessForm.valid) {
      this.changedRow.languageId =
        this.prevRow.languageId == null ? 0 : this.prevRow.languageId;
      this.secWinService
        .updateSecWin(this.changedRow, winId, userId)
        .subscribe((response) => {
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
        });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveSecWin() {
    if (this.editSecWin) {
      this.updateSecWin(
        this.prevRow.secWinPrimaryKey.winId,
        this.prevRow.secWinPrimaryKey.userId
      );
    } else {
      this.createSecWin();
    }
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
      this.copyWindowsAccessForm.patchValue({
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
      this.dataGridGridOptions.api.setRowData(secWins);
      this.dataGridGridOptions.api.selectIndex(0, false, false);
    });
  }

  getWindowIds(): void {
    this.secWinDescrService.getGroupsShortKeys().subscribe((elems) => {
      const keys = [];
      elems.forEach((elem) => {
        keys.push(elem.win_ID);
      });
      this.windowIds = keys;
      this.createDataGrid(keys);
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
    this.dataGridGridOptions.rowSelection = "multiple";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "User ID",
        field: "",
        width: 200,
        headerClass: "clr-blue",
        valueGetter: (data) => {
          return this.copyWindowsAccessForm.get("userId").value;
        },
      },
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
    this.formValidation = new FormValidation(this.copyWindowsAccessForm);
    this.getWindowIds();
    if (this.userId) {
      this.getSecUser(this.userId);
    }
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
    this.copyWindowsAccessForm = this.formBuilder.group(
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
      this.copyWindowsAccessForm.patchValue({
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
  }

  onMenuItemClick(event) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewRow();
          this.editSecWin = false;
          break;
        }
        case "Open": {
          if (this.copyWindowsAccessForm.value.typeOrSpecCode) {
            this.getSecUser(this.copyWindowsAccessForm.value.userId);
          }
          break;
        }
        case "Save": {
          this.saveSecWin();
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
          this.showTimeStamp();
          break;
        default:
          break;
      }
    } else if (event.menu.menuItem === "Special") {
      switch (event.action) {
        case "Copy Window Access":
          this.openCopyWindow();
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
        break;
      }
      case "Function Access": {
        const ref = this.modalService.open(FunctionAccessComponent, {
          size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.userId = this.userId;
        break;
      }
      case "Window Access": {
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
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.copyWindowsAccessForm);
  }

  /**
   * Initialize menu
   */
  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open" },
          { name: "Save" },
          { name: "Close" },
          { isHorizontal: true },
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
          { name: "Tile" },
          { name: "Layer" },
          { name: "Cascade" },
          { name: "Arrange Icons" },
          { isHorizontal: true },
          { name: "Show Timestamp" },
          { name: "Audit Display" },
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
    this.copyWindowsAccessForm.valueChanges.subscribe(() => {
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

  selected = () => {
    this.screenCloseRequested = true;
    if (this.isFormModifiedStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopupAlert(message[0].messageText, "Window Access");
        });
    } else {
     this.submitForm.emit(this.dataGridGridOptions.api.getSelectedRows());
     this.activeModal.close();
    }
  };
  selectAll = () => {
   this.dataGridGridOptions.api.selectAll();
  };

  deselectAll = () => {
    this.dataGridGridOptions.api.deselectAll();
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

    ref.componentInstance.insertDateTime = this.secUser.insertDatetime;
    ref.componentInstance.insertProcess = this.secUser.insertProcess;
    ref.componentInstance.insertUser = this.secUser.insertUser;
    ref.componentInstance.updateUser = this.secUser.updateUser;
    ref.componentInstance.updateDateTime = this.secUser.updateDatetime;
    ref.componentInstance.updateProcess = this.secUser.updateProcess;
  };

  openCopyWindow = () => {};

  helpScreen = () => {};
}
