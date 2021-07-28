/* Copyright (c) 2021 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  BankAccount, MessageMasterDtl, SecUser, SecWin, TaxReportingEntity, Country } from "../../../api-models/index"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { CompanyMasterService, MessageMasterDtlService, TaxReportingEntityService, TradingPartnerMasterService } from '../../../api-services';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { Menu, OPERATIONS } from '../../../shared/models/models';
import {isNumeric} from 'rxjs/util/isNumeric';
import { CONSTANTS, getTaxShortcutKeys } from '../../../shared/services/shared.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { CountryService } from '../../../api-services/country.service';
import {ApHelpComponent} from "../ap-help/ap-help.component";
import { TaxCompanyDetailComponent } from '../../../shared/components/tax-company-detail/tax-company-detail.component';
import { AuditService } from '../../../shared/services/audit.service';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the TaxReportingEntityComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "taxreportingentity",
  templateUrl: "./tax-reporting-entity.component.html",
  providers: [TaxReportingEntityService],
})
export class TaxReportingEntityComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  taxReportingEntityForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "TRENT";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  public menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];
  @Input() showIcon: boolean = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  userTemplateId: any;
  TaxSelected: any;
  searchStatus: boolean;
  keyValues: string;
  editBankMaster: boolean;
  countrys: Country[];
  winID: any;
  keyNames: any;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  edittaxReportingEntity: boolean;
  taxReportingEntity: TaxReportingEntity;
  taxReportingEntitys: TaxReportingEntity[];
  taxId:any
  @ViewChild('irsTaxId') private irsTaxId: ElementRef;
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
  ngAfterViewInit(): void {
    this.shortcuts.push(...getTaxShortcutKeys(this));
    this.cdr.detectChanges();
  }

  createtaxReportingEntity() {
    this.formValidation.validateForm();
    if (this.taxReportingEntityForm.valid) {
      let taxReportingEntity = new TaxReportingEntity();
      taxReportingEntity.taxRepEntity = Form.getValue(
        this.taxReportingEntityForm,
        "irsTaxId"
      );
      taxReportingEntity.payerPhone = Form.getValue(
        this.taxReportingEntityForm,
        "phone001"
      );
      taxReportingEntity.payerName1 = Form.getValue(
        this.taxReportingEntityForm,
        "nameLine1"
      );
      taxReportingEntity.payerName2 = Form.getValue(
        this.taxReportingEntityForm,
        "nameLine2"
      );
      taxReportingEntity.payerAddress = Form.getValue(
        this.taxReportingEntityForm,
        "address001"
      );
      taxReportingEntity.payerState = Form.getValue(
        this.taxReportingEntityForm,
        "state001"
      );
      taxReportingEntity.payerCity = Form.getValue(
        this.taxReportingEntityForm,
        "city001"
      );
      taxReportingEntity.payerZipCode = Form.getValue(
        this.taxReportingEntityForm,
        "zipCode001"
      );
      taxReportingEntity.payerCountry = Form.getValue(
        this.taxReportingEntityForm,
        "country001"
      );
      taxReportingEntity.transControlCode = Form.getValue(
        this.taxReportingEntityForm,
        "controlCode"
      );
      taxReportingEntity.transName = Form.getValue(
        this.taxReportingEntityForm,
        "name"
      );
      taxReportingEntity.description = Form.getValue(
        this.taxReportingEntityForm,
        "description"
      );
      taxReportingEntity.transAddress = Form.getValue(
        this.taxReportingEntityForm,
        "address002"
      );
      taxReportingEntity.transState = Form.getValue(
        this.taxReportingEntityForm,
        "state002"
      );
      taxReportingEntity.transCity = Form.getValue(
        this.taxReportingEntityForm,
        "city002"
      );
      taxReportingEntity.transZipCode = Form.getValue(
        this.taxReportingEntityForm,
        "zipCode002"
      );
      taxReportingEntity.transCountry = Form.getValue(
        this.taxReportingEntityForm,
        "country002"
      );
    
        this.auditService.setAuditFields(
          taxReportingEntity,
          sessionStorage.getItem("user"),
          this.windowId,
          OPERATIONS.ADD
        );
      this.taxReportingEntityService
        .createTaxReportingEntity(taxReportingEntity)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          } else {
            setTimeout(() => {
              this.gettaxReportingEntitys();
            });
          }
          this.isFormDataChangeStatus = false;
          this.editBankMaster = false;
        });
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updatetaxReportingEntity(subscriberId: string) {
    this.formValidation.validateForm();
    if (this.taxReportingEntityForm.valid) {
      let taxReportingEntity = new TaxReportingEntity();
      taxReportingEntity.taxRepEntity = Form.getValue(
        this.taxReportingEntityForm,
        "irsTaxId"
      );
      taxReportingEntity.description = Form.getValue(
        this.taxReportingEntityForm,
        "description"
      );
      taxReportingEntity.payerPhone = Form.getValue(
        this.taxReportingEntityForm,
        "phone001"
      );
      taxReportingEntity.payerName1 = Form.getValue(
        this.taxReportingEntityForm,
        "nameLine1"
      );
      taxReportingEntity.payerName2 = Form.getValue(
        this.taxReportingEntityForm,
        "nameLine2"
      );
      taxReportingEntity.payerAddress = Form.getValue(
        this.taxReportingEntityForm,
        "address001"
      );
      taxReportingEntity.payerState = Form.getValue(
        this.taxReportingEntityForm,
        "state001"
      );
      taxReportingEntity.payerCity = Form.getValue(
        this.taxReportingEntityForm,
        "city001"
      );
      taxReportingEntity.payerZipCode = Form.getValue(
        this.taxReportingEntityForm,
        "zipCode001"
      );
      taxReportingEntity.payerCountry = Form.getValue(
        this.taxReportingEntityForm,
        "country001"
      );
      taxReportingEntity.transControlCode = Form.getValue(
        this.taxReportingEntityForm,
        "controlCode"
      );
      taxReportingEntity.transName = Form.getValue(
        this.taxReportingEntityForm,
        "name"
      );
      taxReportingEntity.transAddress = Form.getValue(
        this.taxReportingEntityForm,
        "address002"
      );
      taxReportingEntity.transState = Form.getValue(
        this.taxReportingEntityForm,
        "state002"
      );
      taxReportingEntity.transCity = Form.getValue(
        this.taxReportingEntityForm,
        "city002"
      );
      taxReportingEntity.transZipCode = Form.getValue(
        this.taxReportingEntityForm,
        "zipCode002"
      );
      taxReportingEntity.transCountry = Form.getValue(
        this.taxReportingEntityForm,
        "country002"
      );
           this.auditService.setAuditFields(
             taxReportingEntity,
             sessionStorage.getItem("user"),
             this.windowId,
             OPERATIONS.UPDATE
           );
  
      this.taxReportingEntityService
        .updateTaxReportingEntity(taxReportingEntity, subscriberId)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully updated.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          } else {
            setTimeout(() => {
              this.gettaxReportingEntitys();
            });
          }
          this.isFormDataChangeStatus = false;
        });
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. " +
          "Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  savetaxReportingEntity() {
    let irsTaxId: string = Form.getValue(
      this.taxReportingEntityForm,
      "irsTaxId"
    );
    if (this.validateIrsTaxId(irsTaxId)) {
      if (this.edittaxReportingEntity) {
        this.updatetaxReportingEntity(this.TaxSelected.taxRepEntity);
      } else {
        this.createtaxReportingEntity();
      }
    }
  }

  onChangeTaxId(event: any) {
    if (event.key === "Tab") {
      if (this.irsTaxId.nativeElement.value.length != 9) {
        this.showPopUp(
          "6222: " + "The IRS Tax ID entered must be 9 digits long.",
          "Tax Reporting Entity"
        );
      }
      let newTaxId = event.target.value;
      this.isDuplicateTaxId(newTaxId);
    }
  }

  isDuplicateTaxId = (newTaxId: any) => {
    let isDuplicate = false;
    for (let taxReportingEntity of this.taxReportingEntitys) {
      if (taxReportingEntity.taxRepEntity == newTaxId) {
        isDuplicate = true;
        break;
      }
    }
    if (isDuplicate) {
      this.messageService
        .findByMessageId(7109)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "7109: " + message[0].messageText,
            "Tax Reporting Entry"
          );
          this.irsTaxId.nativeElement.focus();
        });
      return false;
    }
    return true;
  };

  gettaxReportingEntitys() {
    this.taxReportingEntityService.getTaxReportingEntitys().subscribe(
      (taxReportingEntitys: any) => {
        this.taxReportingEntitys = taxReportingEntitys;
        this.taxReportingEntitys.sort((a, b) =>
          a.taxRepEntity.localeCompare(b.taxRepEntity)
        );
        this.dataGridGridOptions.api.setRowData(this.taxReportingEntitys);
        this.dataGridGridOptions.api.selectIndex(0, false, false);
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
    if (selectedRows[0]) {
      this.TaxSelected = selectedRows[0];
      //getting index of row
      this.searchStatus = true;
      this.keyValues = "";
      this.edittaxReportingEntity = true;
      this.taxReportingEntityForm.get("irsTaxId").disable({ emitEvent: false });
      this.populateForm(selectedRows[0]);
    } else {
      this.keyValues = "";
      this.searchStatus = false;
    }
  }

  populateForm(data: TaxReportingEntity) {
    //this.enableOrDisable(data);
    this.taxReportingEntityForm.patchValue(
      {
        irsTaxId: data.taxRepEntity,
        description: data.description,
        nameLine1: data.payerName1,
        nameLine2: data.payerName2,
        address001: data.payerAddress,
        state001: data.payerState,
        city001: data.payerCity,
        zipCode001: data.payerZipCode,
        phone001: data.payerPhone,
        country001: data.payerCountry,
        controlCode: data.transControlCode,
        name: data.payerName2,
        address002: data.transAddress,
        state002: data.transState,
        city002: data.transCity,
        zipCode002: data.transZipCode,
        country002: data.transCountry,
      },
      { emitEvent: false }
    );
    this.isFormDataModified();
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
        headerName: "IRS Tax ID",
        field: "taxRepEntity",
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
        headerName: "Control Code",
        field: "transControlCode",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private auditService: AuditService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private secColDetailService: SecColDetailService,
    private formBuilder: FormBuilder,
    private messageService: MessageMasterDtlService,
    private mask: Mask,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activeModal: NgbActiveModal,
    private secUserService: SecUserService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private taxReportingEntityService: TaxReportingEntityService,
    private countryService: CountryService,
    private companyMasterService: CompanyMasterService,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.getCountrys();
    this.createDataGrid();
  }

  initializePermission(): void {
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

    this.displayMessage = {};
    this.formValidation = new FormValidation(this.taxReportingEntityForm);
    this.createDataGrid();
    this.gettaxReportingEntitys();
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.taxReportingEntityForm = this.formBuilder.group(
      {
        irsTaxId: [
          "",
          {
            updateOn: "blur",
            validators: [
              Validators.compose([
                Validators.required,
                Validators.maxLength(9),
                Validators.minLength(9),
              ]),
            ],
          },
        ],
        description: ["", { updateOn: "blur", validators: [] }],
        nameLine1: ["", { updateOn: "blur", validators: [] }],
        nameLine2: ["", { updateOn: "blur", validators: [] }],
        address001: ["", { updateOn: "blur", validators: [] }],
        state001: ["", { updateOn: "blur", validators: [] }],
        city001: ["", { updateOn: "blur", validators: [] }],
        zipCode001: [
          "",
          {
            updateOn: "blur",
            validators: [this.ZipValidator(), Validators.pattern("^[0-9]*$")],
          },
        ],
        phone001: [
          "",
          {
            updateOn: "blur",
            validators: [this.PhoneValidator(), Validators.pattern("^[0-9]*$")],
          },
        ],
        country001: ["", { updateOn: "blur", validators: [] }],
        controlCode: ["", { updateOn: "blur", validators: [] }],
        name: ["", { updateOn: "blur", validators: [] }],
        address002: ["", { updateOn: "blur", validators: [] }],
        state002: ["", { updateOn: "blur", validators: [] }],
        city002: ["", { updateOn: "blur", validators: [] }],
        zipCode002: [
          "",
          {
            updateOn: "blur",
            validators: [this.ZipValidator(), Validators.pattern("^[0-9]*$")],
          },
        ],
        country002: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  private menuInit() {
    this.menu = [
      {

        menuItem: 'File',
        dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl+M'},
          { name: 'Open', shortcutKey: 'Ctrl+O'},
          { name: 'Delete', shortcutKey: 'Ctrl+D' },
          { name: 'Save', shortcutKey: 'Ctrl+S'},
          { name: 'Close', shortcutKey: 'Ctrl+F4' },
          { isHorizontal: true },
          { name: 'Main Menu...', shortcutKey: 'F2' },
          { name: 'Shortcut Menu...', shortcutKey: 'F3' },
          { isHorizontal: true },
          { name: 'Print', disabled: true },
          { isHorizontal: true },
          { name: 'Exit', shortcutKey: 'Alt+F4' }]
      },
      {
        menuItem: 'Edit',
        dropdownItems: [
          { name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' },
          { isHorizontal: true },
          { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
          { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
          { name: 'Paste', shortcutKey: 'Ctrl+V' },
          { isHorizontal: true },
          { name: 'Next', shortcutKey: 'F8' },
          { name: 'Previous', shortcutKey: 'F7' }
        ]
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "List Companies" }],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
      },
      {
        menuItem: 'Window',
        dropdownItems: [
          { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
          {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
          { isHorizontal: true },
          { name: '1 Main Menu' },
          { name: '2 Member Eligibility History' },
          { name: '3 Member COB History' },
          { name: '4 Customer Maintenance' },
          { name: '5 Member Address' },
          { name: '6 Bank Account' },
          { name: '7 Tax Reporting Entity' }
        ]
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
          this.createTax();
          break;
        }
        case "Open": {
          this.dataGridGridOptions.api.selectIndex(0, false, false);
          break;
        }
        case "Delete": {
          this.deleteTaxReportingEntity();
          break;
        }
        case "Save": {
          this.savetaxReportingEntity();
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
      // this.handleEditMenu(event.action);
    } else if (event.menu.menuItem === "Special") {
      if (event.action === "List Companies") {
        this.showCompaniesList();
      }
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
                    "Vendor Credit"
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                  "30164: " + message[0].messageText,
                  "Vendor Credit"
                );
              });
          }

          break;
        }
        case "Show Timestamp": {
          this.showTimeStamp();
          break;
        }
      }
    } else if (event.menu.menuItem === "Help") {
      this.helpScreen();
    }
  }

  showCompaniesList() {
    this.companyMasterService
      .findByIrsTaxId(this.TaxSelected.taxRepEntity)
      .subscribe((res) => {
        console.log(res);
        if (res == null || res.length < 1 || res === undefined) {
          let popUpMessage = new PopUpMessage(
            "",
            "",
            "6297: There are no companies with the selected Tax ID",
            "info",
            [],
            MessageType.WARNING
          );
          popUpMessage.buttons.push(new PopUpMessageButton("OK", "OK", ""));
          let ref = this.modalService.open(PopUpMessageComponent);
          ref.componentInstance.popupMessage = popUpMessage;
          ref.componentInstance.showIcon = true;
        } else {
          let ref = this.modalService.open(TaxCompanyDetailComponent);
          ref.componentInstance.rowData = res;
          ref.componentInstance.taxId = this.TaxSelected.taxRepEntity;
          ref.componentInstance.showIcon = true;
        }
      });
  }

  deleteTaxReportingEntity() {
    let popUpMessage = new PopUpMessage(
      "",
      "",
      "29070: Press yes to delete this record",
      "info",
      [],
      MessageType.WARNING
    );
    popUpMessage.buttons.push(new PopUpMessageButton("OK", "OK", ""));
    popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'OK') {
          console.log(this.TaxSelected);
          this.taxReportingEntityService.deleteTaxReportingEntity(this.TaxSelected.taxRepEntity).subscribe(res=>{
            this.toastService.showToast('Record deleted Successfully', NgbToastType.Success)
          })
        }
    });
  }

  resetAll() {
    this.dataGridGridOptions.api.deselectAll();
    this.taxReportingEntityForm.reset();
    this.edittaxReportingEntity = false;
  }
  createTax() {
    this.taxReportingEntityForm.get("irsTaxId").enable();
    this.resetAll();
  }

  getCountrys() {
    this.countryService.getCountrys().subscribe((countrys) => {
      this.countrys = countrys;
    });
  }

  PhoneValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == null) {
        return null;
      }
      if (
        control.value.toString().length == 7 ||
        control.value.toString().length == 10 ||
        control.value.toString().length == 0
      ) {
        return null;
      }
      return { phoneValidator: true };
    };
  }
  ZipValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == null) {
        return null;
      }
      if (
        control.value.toString().length == 0 ||
        control.value.toString().length == 5 ||
        control.value.toString().length == 9
      ) {
        return null;
      }
      return { ZipValidator: true };
    };
  }

  FaxNumValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == null) {
        return null;
      }
      if (
        control.value.toString().length == 0 ||
        control.value.toString().length == 7 ||
        control.value.toString().length == 10
      ) {
        return null;
      }
      return { FaxValidator: true };
    };
  }

  validateIrsTaxId = (irsTaxId: string) => {
    if (!isNumeric(irsTaxId)) {
      this.messageService
        .findByMessageId(28016)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "28016: " + message[0].messageText,
            "Tax Reporting Entry"
          );
        });
      this.irsTaxId.nativeElement.focus();
      return false;
    } else if (irsTaxId && irsTaxId.length < 9) {
      this.messageService
        .findByMessageId(6222)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "6222: " + message[0].messageText,
            "Tax Reporting Entry"
          );
        });
      this.irsTaxId.nativeElement.focus();
      return false;
    } else if (!this.edittaxReportingEntity) {
      return this.isDuplicateTaxId(irsTaxId);
    }
    return true;
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, "Tax Reporting Entity");
        });
    } else {
      this.activeModal.close();
    }
  };

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
          this.savetaxReportingEntity();
        } else if (resp.name === "No") {
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
    this.taxReportingEntityForm.valueChanges.subscribe((res) => {
      this.isFormDataChangeStatus = true;
    });
  }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/TRENT_Taxable_Entity.htm';
        viewModal.componentInstance.showIcon = true;
    };

  private showTimeStamp = () => {
    let ref = this.modalService.open(TimestampComponent);
    ref.componentInstance.title = "Tax Reporting Entity";
    ref.componentInstance.insertDateTime = this.TaxSelected.insertDatetime
      ? this.TaxSelected.insertDatetimeDisplay
      : "";
    ref.componentInstance.insertProcess = this.TaxSelected.insertProcess;
    ref.componentInstance.insertUser = this.TaxSelected.insertUser;
    ref.componentInstance.updateUser = this.TaxSelected.updateUser;
    ref.componentInstance.updateDateTime =
        this.TaxSelected.updateDatetimeDisplay;
    ref.componentInstance.updateProcess = this.TaxSelected.updateProcess;
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
    document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
    this.menuOpened = 'fileDropdownSpecial'
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
      }  else  if (this.menuOpened == "fileDropdownSpecial") {
        switch (value) {
          case 'l':
            obj = {
              menu: {
                menuItem: 'Special'
              },
              action: 'List Companies'
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
}
