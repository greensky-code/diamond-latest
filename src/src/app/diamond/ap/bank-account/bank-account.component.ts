/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
import {
  MessageType,
  PopUpMessage,
  PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { BankAccountService, DddwDtlService, MessageMasterDtlService } from '../../../api-services';
import { BankAccount, MessageMasterDtl } from '../../../api-models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import {Menu, OPERATIONS} from '../../../shared/models/models';
import { CONSTANTS, getBankAccountShortcuts } from '../../../shared/services/shared.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { HttpErrorResponse } from '@angular/common/http';
import {ApHelpComponent} from "../ap-help/ap-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';
import {AuditService} from "../../../shared/services/audit.service";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the BankAccountComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "bankaccount",
  templateUrl: "./bank-account.component.html",
  providers: [BankAccountService, DddwDtlService, MessageMasterDtlService],
})
export class BankAccountComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  bankAccountForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "BANKA";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  bankAccounts: BankAccount[] = [];
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  userTemplateId: string;
  searchStatus: boolean;
  keyValues: string;
  editBankMaster: boolean;
  BankSelected: any;
  closeStatus: boolean;
  popupClose: boolean;
  public menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];
  accountType: any;
  @Input() showIcon: boolean = false;
  keyNames: any;
  winID: any;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  errorBankCode: boolean;
  bankAccountCode: any;
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
  ngAfterViewInit(): void {
    this.shortcuts.push(...getBankAccountShortcuts(this));
    this.cdr.detectChanges();
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "poUpMessageName") {
      this.popupMessageHandler(button);
    }
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
        headerName: "Bank Account Code",
        field: "bankAccountCode",
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
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private DddwDtlService: DddwDtlService,
    private formBuilder: FormBuilder,
    private messageService: MessageMasterDtlService,
    private mask: Mask,
    private cdr: ChangeDetectorRef,
    private activeModal: NgbActiveModal,
    private router: Router,
    private toastService: ToastService,
    private secColDetailService: SecColDetailService,
    private BankAccountService: BankAccountService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private secUserService: SecUserService,
    private securityService: SecurityService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private toastr: ToastService,
    private menuSerrvice: MenuService,
    private auditService: AuditService,
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.bankAccountForm);
    this.createDataGrid();
  }

  initializePermission(): void {
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
          //Check Menus Privilege Start
          let menuResponse = new MenuResponse();
          menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
          if (menuResponse.status) {
            this.menu = [];
            this.menu = [...menuResponse.menus];
          }
          //Check Menus Privilege End
        } else {
          this.secProgress = false;

          this.showPopUp(
            "You are not Permitted to view Procedure Code Screen",
            "Procedure Code Permission"
          );
        }
      },
      (error) => {
        this.showPopUp(error, "Window Error");
      }
    );
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
  private initializeComponentState(): void {
    this.createForm();
    this.menuInit();
    this.getAccountType();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.bankAccountForm);
    this.createDataGrid();

    setTimeout(() => {
      this.getAllBankAccounts();
    });
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.bankAccountForm = this.formBuilder.group(
      {
        bankAccountCode: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        description: ["", { updateOn: "blur", validators: [] }],
        glCashAcct: ["", { updateOn: "blur", validators: [] }],
        bankAccountNo: ["", { updateOn: "blur", validators: [] }],
        bankAccountDesc: ["", { updateOn: "blur", validators: [] }],
        abaRouting: ["", { updateOn: "blur", validators: [] }],
        accountType: ["", { updateOn: "blur", validators: [] }],
        textbox001: ["", { updateOn: "blur", validators: [] }],
        textbox002: ["", { updateOn: "blur", validators: [] }],
        textbox003: ["", { updateOn: "blur", validators: [] }],
        textbox004: ["", { updateOn: "blur", validators: [] }],
        textbox005: ["", { updateOn: "blur", validators: [] }],
        textbox006: ["", { updateOn: "blur", validators: [] }],
        textbox007: ["", { updateOn: "blur", validators: [] }],
        textbox008: ["", { updateOn: "blur", validators: [] }],
        textbox009: ["", { updateOn: "blur", validators: [] }],
        textbox010: ["", { updateOn: "blur", validators: [] }],
        textbox011: ["", { updateOn: "blur", validators: [] }],
        textbox012: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getAllBankAccounts() {
    this.bankAccounts = [];
    this.BankAccountService.getBankAccounts().subscribe(
      (data) => {
        this.bankAccounts = data;
        if (this.bankAccounts.length > 0) {
          this.dataGridGridOptions.api.setRowData(data);
          this.dataGridGridOptions.api.selectIndex(0, false, false);
        } else {
          this.dataGridGridOptions.api.setRowData([]);
        }
      },
      (error) => {
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving records."
        );
      }
    );
  }

  onChangeGrid() {
    var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.BankSelected = selectedRows[0];
      //getting index of row
      this.searchStatus = true;
      this.keyValues = "";
      this.editBankMaster = true;
      this.bankAccountForm.get("bankAccountCode").disable();
      this.populateForm(selectedRows[0]);
    } else {
      this.keyValues = "";
      this.searchStatus = false;
    }
  }

  populateForm(data: BankAccount) {
    this.bankAccountCode = data.bankAccountCode;
    this.bankAccountForm.patchValue({
      bankAccountCode: data.bankAccountCode,
      description: data.description,
      glCashAcct: data.glCashAccount,
      bankAccountNo: data.bankAccountNum,
      bankAccountDesc: data.bankAccountDesc,
      abaRouting: data.abaRoutingNum,
      accountType: data.accountType,
      textbox001: data.mediCheckTemplate,
      textbox002: data.capCheckTemplate,
      textbox003: data.commissionCheckTemplate,
      textbox004: data.mediRaTemplate,
      textbox005: data.capRaTemplate,
      textbox006: data.commissionRaTemplate,
      textbox007: data.mediEobTemplate,
      textbox008: data.userDefined1,
      textbox009: data.mediEopTemplate,
      textbox010: data.userDefined2,
    });
    this.isFormDataModified()
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: 'Ctrl+M' },
          { name: "Open", shortcutKey: 'Ctrl+O' },
          { name: 'Delete', shortcutKey: 'Ctrl+D' },
          { name: "Save", shortcutKey: 'Ctrl+S' },
          { name: "Close", shortcutKey: 'Ctrl+F4' },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: 'F2' },
          { name: "Shortcut Menu...", shortcutKey: "F3" },
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit", shortcutKey: 'Alt+F4' },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", disabled: true, shortcutKey: 'Ctrl+Z' },
          { isHorizontal: true },
          { name: "Cut", disabled: true, shortcutKey: 'Ctrl+X' },
          { name: "Copy", disabled: true, shortcutKey: 'Ctrl+C' },
          { name: "Paste", shortcutKey: 'Ctrl+V' },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
          menuItem: 'Window',
          dropdownItems: [
              { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
              { name: 'Audit Display', shortcutKey: 'Shift+Alt+A' },
              { isHorizontal: true },
              { name: '1 Main Menu' },
              { name: '2 Benefit Accumulator Base Values' },
              { name: '3 Bank Account'}
          ]
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

  updateBankAccount(bankCode: string) {
    this.formValidation.validateForm();
    if (this.bankAccountForm.valid) {
      let bankAccount = new BankAccount();
      bankAccount.bankAccountCode = this.BankSelected.bankAccountCode;
      bankAccount.description = Form.getValue(
        this.bankAccountForm,
        "description"
      );
      bankAccount.glCashAccount = Form.getValue(
        this.bankAccountForm,
        "glCashAcct"
      );
      bankAccount.bankAccountNum = Form.getValue(
        this.bankAccountForm,
        "bankAccountNo"
      );
      bankAccount.bankAccountDesc = Form.getValue(
        this.bankAccountForm,
        "bankAccountDesc"
      );
      bankAccount.abaRoutingNum = Form.getValue(
        this.bankAccountForm,
        "abaRouting"
      );
      bankAccount.accountType = Form.getValue(
        this.bankAccountForm,
        "accountType"
      );
      bankAccount.mediCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox001"
      );
      bankAccount.capCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox002"
      );
      bankAccount.commissionCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox003"
      );
      bankAccount.mediRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox004"
      );
      bankAccount.capRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox005"
      );
      bankAccount.commissionRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox006"
      );
      bankAccount.mediEobTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox007"
      );
      bankAccount.userDefined1 = Form.getValue(
        this.bankAccountForm,
        "textbox008"
      );
      bankAccount.mediEopTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox009"
      );
      bankAccount.userDefined2 = Form.getValue(
        this.bankAccountForm,
        "textbox010"
      );
      bankAccount.insertProcess = this.BankSelected.insertProcess;
      bankAccount.insertUser = this.BankSelected.insertUser;

      this.auditService.setAuditFields(
          bankAccount,
          sessionStorage.getItem("user"),
          this.windowId,
          OPERATIONS.UPDATE
      );

      this.BankAccountService.updateBankAccount(
        bankAccount,
        bankCode
      ).subscribe(
        (response) => {
          this.getAllBankAccounts();
          this.toastService.showToast(
            "Record successfully updated.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000)
          }
          this.isFormDataChangeStatus = false;
        },
        (error) => {
          this.toastService.showToast(
            "An Error occurred while creating new record. Please check your entry.",
            NgbToastType.Danger
          );
        }
      );
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. " +
        "Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  createBankAccount() {

    if (this.errorBankCode) {
      this.messageService
        .findByMessageId(7109)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "7109: " + message[0].messageText,
            "Bank Account "
          );
        });
      return;
    }
    let bAcc = Form.getValue(this.bankAccountForm, "bankAccountCode");
    this.BankAccountService.getBankAccount(bAcc).subscribe((data) => {
      if (data) {
        this.messageService
          .findByMessageId(7109)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp(
              "7109: " + message[0].messageText,
              "Bank Account "
            );
          });
        return;
      }
    });
    this.formValidation.validateForm();
    if (this.bankAccountForm.valid) {
      let bankAccount = new BankAccount();
      bankAccount.bankAccountCode = Form.getValue(
        this.bankAccountForm,
        "bankAccountCode"
      );
      bankAccount.description = Form.getValue(
        this.bankAccountForm,
        "description"
      );
      bankAccount.glCashAccount = Form.getValue(
        this.bankAccountForm,
        "glCashAcct"
      );
      bankAccount.bankAccountNum = Form.getValue(
        this.bankAccountForm,
        "bankAccountNo"
      );
      bankAccount.bankAccountDesc = Form.getValue(
        this.bankAccountForm,
        "bankAccountDesc"
      );
      bankAccount.abaRoutingNum = Form.getValue(
        this.bankAccountForm,
        "abaRouting"
      );
      bankAccount.accountType = Form.getValue(
        this.bankAccountForm,
        "accountType"
      );
      bankAccount.mediCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox001"
      );
      bankAccount.capCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox002"
      );
      bankAccount.commissionCheckTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox003"
      );
      bankAccount.mediRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox004"
      );
      bankAccount.capRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox005"
      );
      bankAccount.commissionRaTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox006"
      );
      bankAccount.mediEobTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox007"
      );
      bankAccount.userDefined1 = Form.getValue(
        this.bankAccountForm,
        "textbox008"
      );
      bankAccount.mediEopTemplate = Form.getValue(
        this.bankAccountForm,
        "textbox009"
      );
      bankAccount.userDefined2 = Form.getValue(
        this.bankAccountForm,
        "textbox010"
      );
      this.auditService.setAuditFields(
          bankAccount,
          sessionStorage.getItem("user"),
          this.windowId,
          OPERATIONS.ADD
      );

      this.BankAccountService.createBankAccount(bankAccount).subscribe(
        (response) => {
          this.getAllBankAccounts();
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000)
          }
          this.isFormDataChangeStatus = false;
          this.editBankMaster = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  saveBankMaster() {
    if (this.editBankMaster) {
      if (this.isSuperUser) {
        this.updateBankAccount(this.BankSelected.bankAccountCode);
      } else {
        if (this.secWin.hasUpdatePermission()) {
          this.updateBankAccount(this.BankSelected.bankAccountCode);
        } else {
          this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
            this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Bank Account')
          });
        }
      }
    } else {
      if (this.isSuperUser) {
        this.createBankAccount();
      } else {
        if (this.secWin.hasInsertPermission()) {
          this.createBankAccount();
        }else{
          this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
            this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Bank Account')
        });
        }
      }
    }
  }
  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewBank();
          break;
        }
        case "Open": {
          this.dataGridGridOptions.api.selectIndex(0, false, false);
          break;
        }
        case 'Delete': {
          this.deleteRequestAlert();
          break;
        }
        case "Save": {
          this.saveBankMaster();
          break;
        }
        case "Close": {
          this.modalClose();
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        case 'Exit': {
          this.exitScreen();
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
      // this.handleEditMenu(event.action);
    } else if (event.menu.menuItem === "Window") {
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
                  this.showPopUp(
                    "11073: " + message[0].messageText,
                    "Bank Account "
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                  "30164: " + message[0].messageText,
                  "Bank Account "
                );
              });
          }

          break;
        }
          case 'Show Timestamp':
              if (this.bankAccountForm.get('bankAccountCode').value) {
                  this.showTimeStamp();
              } else {
                  this.messageService.findByMessageId(21127).subscribe(res => {
                      this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                  })
              }
              break;
          default : {
              break;
          }
      }
    } else if (event.menu.menuItem === "Help") {
      this.helpScreen();
    }
  }
  resetAll() {
    this.bankAccountForm.reset();
    this.editBankMaster = false;
  }
  createNewBank() {
    if (this.isSuperUser) {
      this.dataGridGridOptions.api.deselectAll();
      this.bankAccountForm.get("bankAccountCode").enable();
      this.resetAll();
    } else {
      if (this.secWin.hasInsertPermission()) {
        this.dataGridGridOptions.api.deselectAll();
        this.bankAccountForm.get("bankAccountCode").enable();
        this.resetAll();
      } else {
        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
          this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Bank Account')
        });
      }
    }
  }
  getAccountType() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "account_type",
      "dw_banka_de "
    ).subscribe((data) => {
      this.accountType = data;
    });
  }

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Bank Account')
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
          this.saveBankMaster()
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

  popupAlertBankAccountCode = () => {
    try {
      let message = '29032: bank_account_code is a required field. Enter something other than blanks'
      let popUpMessage = new PopUpMessage('popUpMessageName', 'Bank Account', message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe(() => {
      })
    } catch (e) {
      console.log(e);
    }
  };

  isFormDataModified() {
    this.bankAccountForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }
  onChangeBankAccount(event: any) {
    if (event.key == 'Tab') {
      var bAcc = event.target.value;
      if (!bAcc) {
        this.popupAlertBankAccountCode();
        return
      }
      for (var i = 0; i < this.bankAccounts.length; i++) {
        console.log(this.bankAccounts[i]["bankAccountCode"]);
        if (this.bankAccounts[i]["bankAccountCode"] == bAcc) {
          this.messageService
            .findByMessageId(7109)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "7109: " + message[0].messageText,
                "Bank Account "
              );
            });
          event.preventDefault();
          this.errorBankCode = true;
          return;
        }
        else {
          this.errorBankCode = false;
          // return true;
        }
      }

    }
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
    viewModal.componentInstance.defaultFile = '/BANKA_Bank_Accounts.htm';
    viewModal.componentInstance.showIcon = true;
  };

  deleteRequestAlert = () => {
    if (this.isSuperUser) {
      this.delete();
    } else {
      if (this.secWin.hasDeletePermission()) {
        this.delete();
      } else {
        this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
          this.form1PopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Bank Account')
        });
      }
    }
  };

  delete() {
    let popUpMessage = new PopUpMessage(
      'Bank Account',
      'Bank Account',
      '29070: Press OK to delete this record',
      'info',
      [],
      MessageType.WARNING
    );
    popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === 'OK') {
        this.deleteBankAccountRow();
      }
    });
  }

  deleteBankAccountRow() {
    if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
      return;
    }
    const bankCode = this.bankAccountForm.value.bankAccountCode ? this.bankAccountForm.value.bankAccountCode : this.bankAccountCode;
    if (bankCode) {
      this.BankAccountService.deleteBankAccount(bankCode).subscribe(() => {
        for (let i = 0; i < this.bankAccounts.length; i++) {
          if (this.bankAccounts[i].bankAccountCode == bankCode) {
            this.bankAccounts.splice(i, 1);
            break;
          }
        }
        this.dataGridGridOptions.api.setRowData(this.bankAccounts);
        if (this.bankAccounts && this.bankAccounts.length > 0) {
          this.dataGridGridOptions.api.selectIndex(0, false, false);
          this.bankAccountCode = this.bankAccounts[0].bankAccountCode;
        } else {
          this.bankAccountCode = "";
          this.dataGridGridOptions.api.setRowData([]);
        }

        this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        this.getAllBankAccounts();
      });
    }
  }

  form1PopupAlert = (message: string, title: string) => {
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


    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Bank Account";

        ref.componentInstance.insertDateTime = this.BankSelected.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.BankSelected.insertProcess;
        ref.componentInstance.insertUser = this.BankSelected.insertUser;
        ref.componentInstance.updateUser = this.BankSelected.updateUser;
        ref.componentInstance.updateDateTime = this.BankSelected.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.BankSelected.updateProcess;
    };

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
          localStorage.clear()
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
