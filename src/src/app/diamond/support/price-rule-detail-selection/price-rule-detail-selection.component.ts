/* Copyright (c) 2021 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit, QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";
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
import { DatePickerConfig, DatePickerModel } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import {
  AllowIn,
  KeyboardShortcutsComponent,
  ShortcutEventOutput,
  ShortcutInput,
} from "ng-keyboard-shortcuts";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageMasterDtl, PriceRuleDetail, SecUser, SecWin } from "../../../api-models/index";
import { PriceRuleDetailService } from "../../../api-services/price-rule-detail.service";
import { PriceRuleDetailRules } from "../../../api-models/index";
import { PriceRuleDetailRulesService } from "../../../api-services/price-rule-detail-rules.service";
import {
  AlertMessage,
  AlertMessageService,
} from "../../../shared/components/alert-message/index";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecurityService } from "../../../shared/services/security.service";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { DddwDtlService, MessageMasterDtlService, SecUserService } from "../../../api-services";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { Menu, SearchModel } from "../../../shared/models/models";
import { PriceRuleLookup } from "../../../shared/lookup/price-rule-lookup";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { PriceRuleMasterService } from "../../../api-services/price-rule-master.service";
import { ToastService } from "../../../shared/services/toast.service";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {CONSTANTS, getPriceRuleSelectionShortcutKeys, SharedService} from "../../../shared/services/shared.service";
import {NgbToastType} from 'ngb-toast';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {PriceRuleDetailComponent} from "../price-rule-detail/price-rule-detail.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {PriceRuleComponent} from "../price-rule/price-rule.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PriceRuleDetailSelectionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "priceruledetailselection",
  templateUrl: "./price-rule-detail-selection.component.html",
  providers: [
    PriceRuleDetailRulesService,
    PriceRuleDetailService,
    DddwDtlService,
    PriceRuleMasterService,

    MessageMasterDtlService,
  ],
})
export class PriceRuleDetailSelectionComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  priceRuleDetailSelectionForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "PRULS";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  selectedPriceRuleDetail: PriceRuleDetail;
  selectedPriceRuleDetailRules: PriceRuleDetailRules;
  @Input() showIcon: boolean = false;
  menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];
  priceRuleSearchModal = new SearchModel(
    "pricerulemasters/lookup",
    PriceRuleLookup.PRICE_RULE_ALL,
    PriceRuleLookup.PRICE_RULE_DEFAULT,
    []
  );
  menuOpened= ""
  @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild('priceRule') priceRuleElem: ElementRef;
  userTemplateId: any;
  calMethod: any;
  searchStatus: boolean;
  operator: any;
  priceRule: any;
  seqRuleDetail: any;
  closeStatus: boolean;
  nextSeq: number = 0;
  pressedKey: any[] = [];
  @Input() PriceRule: any;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    ruleOrderData: PriceRuleDetail[];

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
    this.shortcuts.push(...getPriceRuleSelectionShortcutKeys(this));
    this.cdr.detectChanges();
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  editPriceRuleDetail: boolean;
  priceRuleDetail: PriceRuleDetail;
  priceRuleDetails: PriceRuleDetail[];
  editPriceRuleDetailRules: boolean;
  priceRuleDetailRules: PriceRuleDetailRules;
  priceRuleDetailRuleses: PriceRuleDetailRules[];
  createPriceRuleDetail() {
    this.formValidation.validateForm();
    if (this.priceRuleDetailSelectionForm.valid) {
      let priceRuleDetail = new PriceRuleDetail();
      priceRuleDetail.priceRule = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "priceRule"
      );
      this.priceRuleDetailService
        .createPriceRuleDetail(priceRuleDetail)
        .subscribe(
          (response) => {
            this.toastr.showToast('Record successfully created', NgbToastType.Success);
            this.editPriceRuleDetail = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updatePriceRuleDetail(priceRule: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.priceRuleDetailSelectionForm.valid) {
        let priceRuleDetail = new PriceRuleDetail();
        priceRuleDetail.priceRule = Form.getValue(
          this.priceRuleDetailSelectionForm,
          "priceRule"
        );
        this.priceRuleDetailService
          .updatePriceRuleDetail(priceRuleDetail, priceRule)
          .subscribe(
            (response) => {
              this.toastr.showToast('Record successfully updated', NgbToastType.Success);
              this.editPriceRuleDetail = false;
            }
          );
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
  savePriceRuleDetail() {
    if (this.editPriceRuleDetail) {
      this.updatePriceRuleDetail(this.priceRuleDetail.priceRule);
    } else {
      this.createPriceRuleDetail();
    }
  }
  deletePriceRuleDetail(priceRule: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.priceRuleDetailService.deletePriceRuleDetail(priceRule).subscribe(
        (response) => {
          this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        }
      );
    }
  }

  getPriceRuleDetails() {
    this.priceRuleDetailService.getPriceRuleDetails().subscribe(
      (priceRuleDetails) => {
        this.priceRuleDetails = priceRuleDetails;
      }
    );
  }
  createPriceRuleDetailRules() {
    this.formValidation.validateForm();
    if (this.priceRuleDetailSelectionForm.valid) {
      let priceRuleDetailRules = new PriceRuleDetailRules();
      priceRuleDetailRules.priceRule = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "priceRule"
      );
      priceRuleDetailRules.ruleOrder = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "ruleOrder"
      );
      priceRuleDetailRules.operator = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "operation"
      );
      priceRuleDetailRules.procCode1 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from1"
      );
      priceRuleDetailRules.procCode2 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru1"
      );
      priceRuleDetailRules.procCode3 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from2"
      );
      priceRuleDetailRules.procCode4 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru2"
      );
      priceRuleDetailRules.procCode5 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from3"
      );
      priceRuleDetailRules.procCode6 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru3"
      );
      priceRuleDetailRules.procCode7 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from4"
      );
      priceRuleDetailRules.procCode8 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru4"
      );

      priceRuleDetailRules.procCode9 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from5"
      );
      priceRuleDetailRules.procCode10 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru5"
      );
      priceRuleDetailRules.priceRuleDetailRulesPrimaryKey = {
        seqRuleDetail: this.seqRuleDetail,
        ruleOrder: this.nextSeq,
        priceRule: this.priceRule,
      };
       priceRuleDetailRules.priceRuleDetail={
           priceRuleDetailPrimaryKey: {
         seqRuleDetail: this.seqRuleDetail,
         priceRule: this.priceRule,
       }};

      this.priceRuleDetailRulesService
        .createPriceRuleDetailRules(priceRuleDetailRules)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully created.",
              NgbToastType.Success
            );
              if (this.screenCloseRequest === true) {
                  setTimeout(() => {
                      this.activeModal.close();
                  }, 2000);
              }
              this.isFormDataChangeStatus = false;
          },
          (error) => {
            this.toastService.showToast(
              "An Error occurred while creating record. Please check your entry.",
              NgbToastType.Danger
            );
            this.toastr.showToast('Record successfully created', NgbToastType.Success);
            this.editPriceRuleDetailRules = false;
          }
        );
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  updatePriceRuleDetailRules(priceRule: string) {
    this.formValidation.validateForm();
    if (this.priceRuleDetailSelectionForm.valid) {
      let priceRuleDetailRules = new PriceRuleDetailRules();
      priceRuleDetailRules.priceRule = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "priceRule"
      );
      priceRuleDetailRules.ruleOrder = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "ruleOrder"
      );
      priceRuleDetailRules.operator = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "operation"
      );
      priceRuleDetailRules.procCode1 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from1"
      );
      priceRuleDetailRules.procCode2 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru1"
      );
      priceRuleDetailRules.procCode3 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from2"
      );
      priceRuleDetailRules.procCode4 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru2"
      );
      priceRuleDetailRules.procCode5 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from3"
      );
      priceRuleDetailRules.procCode6 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru3"
      );
      priceRuleDetailRules.procCode7 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from4"
      );
      priceRuleDetailRules.procCode8 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru4"
      );

      priceRuleDetailRules.procCode9 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "from5"
      );
      priceRuleDetailRules.procCode10 = Form.getValue(
        this.priceRuleDetailSelectionForm,
        "thru5"
      );
      this.priceRuleDetailRulesService
        .updatePriceRuleDetailRules(
          priceRuleDetailRules,
          priceRule,
          Form.getValue(this.priceRuleDetailSelectionForm, "ruleOrder"),
          this.seqRuleDetail
        )
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully updated.",
              NgbToastType.Success
            );
              if (this.screenCloseRequest === true) {
                  setTimeout(() => {
                      this.activeModal.close();
                  }, 2000);
              }
              this.isFormDataChangeStatus = false;
          },
          (error) => {
            this.toastService.showToast(
              "An Error occurred while updating record. Please check your entry.",
              NgbToastType.Danger
            );
          }
        )}
     else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }
  savePriceRuleDetailRules() {
    if (this.editPriceRuleDetailRules) {
      this.updatePriceRuleDetailRules(this.priceRule);
    } else {
      this.createPriceRuleDetailRules();
    }
  }
  deletePriceRuleDetailRule() {
    console.log(this.selectedPriceRuleDetailRules);
    if (this.selectedPriceRuleDetailRules) {
      this.deletePriceRuleDetailRules(this.selectedPriceRuleDetailRules.priceRuleDetailRulesPrimaryKey.ruleOrder,
          this.selectedPriceRuleDetailRules.priceRuleDetailRulesPrimaryKey.seqRuleDetail,
          this.selectedPriceRuleDetailRules.priceRuleDetailRulesPrimaryKey.priceRule);
    }
  }
  deletePriceRuleDetailRules(ruleOrder: any, seqRuleDetail: any, priceRule: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.priceRuleDetailRulesService
        .deletePriceRuleDetailRulesByDetails(ruleOrder, seqRuleDetail, priceRule)
        .subscribe(
          (response) => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            this.populateSecondGrid(
                this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.seqRuleDetail,
                this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.priceRule
            );

          }
        );
    }
  }
  getPriceRuleDetailRules(priceRule: string) {
    this.priceRuleDetailRulesService
      .getPriceRuleDetailRules(priceRule)
      .subscribe(
        (priceRuleDetailRules) => {
          this.priceRuleDetailRules = priceRuleDetailRules;
          this.priceRuleDetailSelectionForm.patchValue({
            priceRule: this.priceRuleDetailRules.priceRule,
            ruleOrder: this.priceRuleDetailRules.ruleOrder,
            operation: this.priceRuleDetailRules.operator,
          });
        }
      );
  }
  getPriceRuleDetailRuleses() {
    this.priceRuleDetailRulesService.getPriceRuleDetailRuleses().subscribe(
      (priceRuleDetailRuleses) => {
        this.priceRuleDetailRuleses = priceRuleDetailRuleses;
      }
    );
  }

  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  public dataGrid003GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;
    customTable = {
        priceRuleDetailRulesPrimaryKey : {
          ruleOrder: 0
        },
        operator: ''
    };

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

  private dataGrid003gridApi: any;
  private dataGrid003gridColumnApi: any;

  dataGrid003GridOptionsExportCsv() {
    var params = {};
    this.dataGrid003gridApi.exportDataAsCsv(params);
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid001GridOptions.editType = "fullRow";
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Modifier",
        field: "modifierCode",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Level",
        field: "ruleLevel",
        width: 200,
      },
      {
        headerName: "Sequence",
        field: "searchSequence",
        width: 200,
      },
      {
        headerName: "Calculation Method",
        field: "calculationMethod",
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
        headerName: "Rule Order",
        field: "priceRuleDetailRulesPrimaryKey.ruleOrder",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
    ];
  }
  createDataGrid003(): void {
    this.dataGrid003GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid003GridOptions.editType = "fullRow";
    this.dataGrid003GridOptions.columnDefs = [
      {
        headerName: "Proc Code From",
        field: "proccode2",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Proc Code Thru",
        field: "proccode1",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private datePipe: DatePipe,
    private cdr:ChangeDetectorRef,
    private sharedService: SharedService,
    private toastService: ToastService,
    private router: Router,
    private toastr: ToastService,
    private PriceRuleMasterService:PriceRuleMasterService,
    private messageService: MessageMasterDtlService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private DddwDtlService: DddwDtlService,
    private secColDetailService: SecColDetailService,
    public activeModal: NgbActiveModal,
    private secUserService: SecUserService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private priceRuleDetailService: PriceRuleDetailService,
    private priceRuleDetailRulesService: PriceRuleDetailRulesService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.priceRuleDetailSelectionForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();
    this.getCalMethod();
    this.getOperator();
    setTimeout(() => {
      this.dataGrid001GridOptions.api.setRowData([]);
      this.dataGrid002GridOptions.api.setRowData([]);
    }, 1000);
  }
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
      this.getSecColDetails(user);
      this.userTemplateId = user.dfltTemplate;
      this.getSecWin(user.dfltTemplate);
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
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
      (secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
        } else {
          this.showPopUp(
            "You are not Permitted to view Plan",
            "Plan Permission"
          );
        }
      }
    );
  }
  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.priceRuleDetailSelectionForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();
    this.menuInit();
        if (this.PriceRule) {
          setTimeout(() => {
            this.priceRuleDetailSelectionForm.patchValue({
              priceRule: this.PriceRule,
            });
            this.GetAllFormData(this.PriceRule);
          }, 1000);
        }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.priceRuleDetailSelectionForm = this.formBuilder.group(
      {
        priceRule: ["", { updateOn: "blur", validators: [] }],
        dynamicText: ["", { updateOn: "blur", validators: [] }],
        from1: ["", { updateOn: "blur", validators: [] }],
        thru1: ["", { updateOn: "blur", validators: [] }],
        from2: ["", { updateOn: "blur", validators: [] }],
        thru2: ["", { updateOn: "blur", validators: [] }],

        from3: ["", { updateOn: "blur", validators: [] }],
        thru3: ["", { updateOn: "blur", validators: [] }],

        from4: ["", { updateOn: "blur", validators: [] }],
        thru4: ["", { updateOn: "blur", validators: [] }],

        from5: ["", { updateOn: "blur", validators: [] }],
        thru5: ["", { updateOn: "blur", validators: [] }],

        ruleOrder: ["", { updateOn: "blur", validators: [] }],
        operation: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  GetAllFormData(value: any) {
    this.PriceRuleMasterService.getPriceRuleMaster(value).subscribe(
      (data) => {
        if (data != null) {
          this.priceRuleDetailSelectionForm.patchValue({
            dynamicText: data.description,
          });
          this.priceRuleDetailSelectionForm.get('priceRule').disable();
          this.priceRuleDetailService.findByPriceRule(value).subscribe(
            (data: any) => {
              if (data != null) {
                this.priceRuleDetails = data;
                data.map(item => {
                    item.calculationMethod = item.calculationMethod === '2' ? 'Free Schedule' : item.calculationMethod
                });
                this.priceRule = value;
                this.editPriceRuleDetail = true;
                this.priceRuleDetails.sort(function (a, b) {
                  if (a.priceRule < b.priceRule) {
                    return -1;
                  }
                  if (a.priceRule > b.priceRule) {
                    return 1;
                  }
                  return 0;
                });
                for (var i = 0; i < this.priceRuleDetails.length; i++) {
                  this.populateCalMethod(
                    this.priceRuleDetails[i].calculationMethod,
                    i
                  );
                }
                this.dataGrid001GridOptions.api.setRowData(
                  this.priceRuleDetails
                );
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
              } else {
                this.ShowError(27052, false);
              }
            },
            (error) => {}
          );
        } else {
          this.ShowError(5557, false);
        }
      },
      (error) => {
        this.ShowError(5557, false);
      }
    );
  }
  onPriceRuleLookup(event) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.priceRuleSearchModal;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = false;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          this.priceRuleDetailSelectionForm
            .get("priceRule")
            .setValue(res.priceRule);
          this.GetAllFormData(res.priceRule);
          //this.GetAllFormData(res.priceRule);
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }
  }
  populateCalMethod(ruleType: any, k: any) {
    if (this.calMethod.length > 0) {
      for (let i = 0; i < this.calMethod.length; i++) {
        if (ruleType === this.calMethod[i].value) {
          this.priceRuleDetails[k].calculationMethod = this.calMethod[i].key;
        }
      }
    }
      this.isFormDataModified()
  }
  onChangePriceRule(event: any) {
    this.halfFormReset();
    this.GetAllFormData(event.target.value);
  }

  getCalMethod() {
    this.DddwDtlService.findByColumnNameAndDwnameAndLanguageId(
      "calculation_method",
      "dw_pruld_de",
      0
    ).subscribe((data) => {
      this.calMethod = data;
    });
  }

  populateSecondGrid(seqDetailRule: any, priceRule: any) {
    this.priceRuleDetailRulesService
      .findByPriceRuleAndSeq(seqDetailRule, priceRule)
      .subscribe((data: any) => {
        this.ruleOrderData = data;
        this.dataGrid002GridOptions.api.setRowData(data);
        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
        this.editPriceRuleDetailRules = true;
        this.priceRuleDetailSelectionForm.get("ruleOrder").disable();
        this.getNextSeq(data);
      });
  }
  onSecondGridChange() {
    var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
    if (selectedRows.length === 1) {
      this.selectedPriceRuleDetailRules = selectedRows[0];
      this.searchStatus = true;
      this.editPriceRuleDetail = true;
      this.priceRuleDetailSelectionForm.patchValue({
        ruleOrder: selectedRows[0].priceRuleDetailRulesPrimaryKey.ruleOrder,
        operation: selectedRows[0].operator,
        from1: selectedRows[0].procCode1,
        thru1: selectedRows[0].procCode2,
        from2: selectedRows[0].procCode3,
        thru2: selectedRows[0].procCode4,
        from3: selectedRows[0].procCode5,
        thru3: selectedRows[0].procCode6,
        from4: selectedRows[0].procCode7,
        thru4: selectedRows[0].procCode8,
        from5: selectedRows[0].procCode9,
        thru5: selectedRows[0].procCode10,
      }, {emitEvent: false});

        this.isFormDataModified();
      // this.authorizationCodeForm.get("authCode").disable();
    } else {
      this.searchStatus = false;
    }
  }

  OnChangeGrid() {
    var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    if (selectedRows.length === 1) {
      this.searchStatus = true;
      this.selectedPriceRuleDetail = selectedRows[0];
      setTimeout(() => {
        try {
          this.selectedPriceRuleDetail.updateDatetimeDisplay = this.datePipe.transform(
              new Date(this.selectedPriceRuleDetail.updateDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
          this.selectedPriceRuleDetail.insertDatetimeDisplay = this.datePipe.transform(
              new Date(this.selectedPriceRuleDetail.insertDatetime),
              "yyyy-MM-dd HH:mm:ss"
          );
        } catch (e) {
          console.log(e);
        }
      }, 500);
      this.PriceRule = selectedRows[0].priceRule;
      this.seqRuleDetail =
        selectedRows[0].priceRuleDetailPrimaryKey.seqRuleDetail;
      this.populateSecondGrid(
        selectedRows[0].priceRuleDetailPrimaryKey.seqRuleDetail,
        selectedRows[0].priceRuleDetailPrimaryKey.priceRule
      );

      // this.authorizationCodeForm.get("authCode").disable();
    } else {
      this.searchStatus = false;
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
  halfFormReset() {
      let data = [];
      this.customTable.priceRuleDetailRulesPrimaryKey.ruleOrder = this.nextSeq;
      this.customTable.operator = 'EQ';
      for (let item in this.ruleOrderData) {
          data.push(this.ruleOrderData[item]);
      }
      data.push(this.customTable);
      this.dataGrid002GridOptions.api.setRowData(data);
      this.dataGrid002GridOptions.api.selectIndex(data.length - 1, null, null);
    this.priceRuleDetailSelectionForm.get('ruleOrder').enable();
    this.priceRuleDetailSelectionForm.get("from1").reset();
    this.priceRuleDetailSelectionForm.get("from2").reset();
    this.priceRuleDetailSelectionForm.get("from3").reset();
    this.priceRuleDetailSelectionForm.get("from4").reset();
    this.priceRuleDetailSelectionForm.get("from5").reset();
    this.priceRuleDetailSelectionForm.get("thru1").reset();
    this.priceRuleDetailSelectionForm.get("thru2").reset();
    this.priceRuleDetailSelectionForm.get("thru3").reset();
    this.priceRuleDetailSelectionForm.get("thru4").reset();
    this.priceRuleDetailSelectionForm.get("thru5").reset();
  }

  createNewPriceRuleDet() {
    this.dataGrid002GridOptions.api.deselectAll();
    this.editPriceRuleDetailRules = false;
    this.halfFormReset();
    if (this.nextSeq != 0) {
      this.priceRuleDetailSelectionForm.get("ruleOrder").setValue(this.nextSeq);
    } else {
      this.nextSeq = 10;
      this.priceRuleDetailSelectionForm.get("ruleOrder").setValue(10);
    }
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: 'Ctrl + N' },
          { name: "Open", shortcutKey: 'Ctrl + O' },
          { name: "Delete", shortcutKey: 'Ctrl + D' },
          { name: "Save", shortcutKey: 'Ctrl + S' },
          { name: "Close", shortcutKey: 'Ctrl + A4' },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: 'F2' },
          { name: "Shortcut Menu...", shortcutKey: 'F3' },
          { isHorizontal: true },
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
        menuItem: "Topic",
        dropdownItems: [
          { name: "Price Rule Master" },
          { name: "Price Rule Detail" },
          { name: "Whole Claim Price Rule" },
        ],
      },
      {
        menuItem: "Special",
        disabled: true,
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Window",
        dropdownItems: [
          { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
          { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Tooth Rule" },
          { name: "3 Member COB History" },
          { name: "4 Member COB History" },
          { name: "5 Member COB History" },
          { name: "6 Price Rule Detail Selection" },
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

  /**
   * Handle Menu Actions
   * @param event: {action: string, menu: MenuItem}
   */
  public onMenuItemClick(event) {
    if (event.menu.menuItem === "File") {
      switch (event.action) {
        case "New": {
          this.createNewPriceRuleDet();
          break;
        }
        case "Open": {
          this.handleOpenMenu();
          break;
        }
        case "Save": {
          this.savePriceRuleDetailRules();
          break;
        }
        case "Delete": {
          this.deletePriceRuleDetailRule();
          break;
        }
        case "Close": {
          this.modalClose()
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
    } else if (event.menu.menuItem === "Topic") {
      switch (event.action) {
        case "Price Rule Master": {
          this.openPriceRuleMasterComponent()
          break;
        }
        case "Price Rule Detail": {
          this.openPriceRuleDetailComponent()
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
    } else if (event.menu.menuItem === "Window") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Show Timestamp": {
          if (this.priceRuleDetailSelectionForm.get('priceRule').value) {
            this.openShowTimestampComponent();
          } else {
            this.messageService.findByMessageId(21127).subscribe(res => {
              this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
          }

          break;
        }
        case "Audit Display": {
            this.openAuditDisplayComponent();
          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen();
    }
  }
  resetAll() {
    this.priceRuleDetailSelectionForm.reset();
    this.dataGrid001GridOptions.api.setRowData([]);
    this.dataGrid002GridOptions.api.setRowData([]);

  }

  getOperator() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "operator",
      "dw_prulr_de"
    ).subscribe((data) => {
      this.operator = data;
    });
  }

  getNextSeq(data: any) {
    var li_next_order = 0;
    for (var i = 0; i < data.length; i++) {
      var li_cur_order = data[i].priceRuleDetailRulesPrimaryKey.ruleOrder;
      if (li_cur_order > li_next_order && li_cur_order < 999) {
        li_next_order = li_cur_order;
      }
    }
    li_next_order += 10 - (li_next_order % 10);
    if (li_next_order > 9999) {
      li_next_order = -1;
    }
    this.nextSeq = li_next_order;

  }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Price Rule Detail Selection')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try{
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
                    this.savePriceRuleDetailRules()
                }
                else if(resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.priceRuleDetailSelectionForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PRULS_Price_Rule_Details.htm';
    }

  openPriceRuleMasterComponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.PriceRule = this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
  }

  openPriceRuleDetailComponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleDetailComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.priceRule = this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
  }

  openPriceRuleDetailSelectionomponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleDetailSelectionComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.PriceRule = this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
  }

  openAuditDisplayComponent() {
    if (this.searchStatus) {
      let status = this.functionalLevelSecurityService.isFunctionIdExist(
          CONSTANTS.F_AUDIT,
          this.windowId
      );
      if (status) {
        let ref = this.modalService.open(AuditDisplayComponent, {
          size: "lg",
        });
        ref.componentInstance.keyNames = "price_rule : seq_rule_detail";
        ref.componentInstance.keyValues = this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.priceRule + ' : ' + this.selectedPriceRuleDetail.priceRuleDetailPrimaryKey.seqRuleDetail;
        ref.componentInstance.winID = this.windowId;
        ref.componentInstance.win = 'dw_pruld_de_pick';
        ref.componentInstance.showIcon = true;
      } else {
        this.messageService
            .findByMessageId(11073)
            .subscribe((message: MessageMasterDtl[]) => {
              this.alertMessage = this.alertMessageService.error(
                  "11073: " + message[0].messageText
              );
            });
      }
    } else {
      this.messageService
          .findByMessageId(30164)
          .subscribe((message: MessageMasterDtl[]) => {
            this.alertMessage = this.alertMessageService.error(
                "30164: " + message[0].messageText
            );
          });
    }
  }

  openFunctionalGroupShortcut() {
    const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openShowTimestampComponent() {
    const ref = this.modalService.open(TimestampComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.insertDateTime = this.selectedPriceRuleDetail.insertDatetime;
    ref.componentInstance.insertDateTime = this.selectedPriceRuleDetail.insertDatetimeDisplay;
    ref.componentInstance.insertProcess = this.selectedPriceRuleDetail.insertProcess;
    ref.componentInstance.insertUser = this.selectedPriceRuleDetail.insertUser;
    ref.componentInstance.updateUser = this.selectedPriceRuleDetail.updateUser;
    ref.componentInstance.updateDateTime = this.selectedPriceRuleDetail.updateDatetimeDisplay;
    ref.componentInstance.updateProcess = this.selectedPriceRuleDetail.updateProcess;
  }

  handleOpenMenu() {
      this.resetAll();
    this.priceRuleDetailSelectionForm.get('priceRule').enable();
      this.priceRuleElem.nativeElement.focus();
      this.isFormDataChangeStatus = false;
  }

  setFieldValue(e, field) {
      this.priceRuleDetailSelectionForm.get(field).setValue(e.target.value);
      console.log(this.priceRuleDetailSelectionForm.value);
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
          case 'm':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Price Rule Master'
            }
            this.onMenuItemClick(obj)
            break;
          case 'd':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Price Rule Detail'
            }
            this.onMenuItemClick(obj)
            break;
          case 'c':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Whole Claim Price Rule'
            }
            this.onMenuItemClick(obj)
            break;
          default:
            break;
        }
      } else  if (this.menuOpened == "fileDropdownSpecial") {

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
  openTopicMenu() {
    document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
    this.menuOpened = "fileDropdownTopic"
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
}
