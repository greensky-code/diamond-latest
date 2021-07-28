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
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, PriceRuleMaster, SecWin} from "../../../api-models/index"
import {PriceRuleMasterService} from "../../../api-services/price-rule-master.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecUser} from '../../../api-models/sec-user.model copy';
import {MessageMasterDtlService} from '../../../api-services/message-master-dtl.service';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {CONSTANTS, getPriceRuleShortcutKeys, SharedService} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {DddwDtlService} from '../../../api-services/dddw-dtl.service';
import {ModifierCodeMasterService} from '../../../api-services/modifier-code-master.service';
import {PriceRuleLookup} from '../../../shared/lookup/price-rule-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ModifierCodeMaster} from '../../../api-models/modifier-code-master.model';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {MenuResponse} from '../../../api-models/menu-response';
import {MenuService} from '../../../shared/services/menu.service';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {PriceRuleDetailSelectionComponent} from "../price-rule-detail-selection/price-rule-detail-selection.component";
import {PriceRuleDetailComponent} from "../price-rule-detail/price-rule-detail.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PriceRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "pricerule",
  templateUrl: "./price-rule.component.html",
  providers: [
    PriceRuleMasterService,
    MessageMasterDtlService,
    FunctionalLevelSecurityService,
    DddwDtlService,
    ModifierCodeMasterService,
  ],
})
export class PriceRuleComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  priceRuleForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "PRULE";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  @Input() showIcon: boolean = false;
  public shortcuts: ShortcutInput[] = [];
  menu: Menu[] = [];
  pressedKey: any[] = [];
  priceRuleSearchModal = new SearchModel(
    "pricerulemasters/lookup",
    PriceRuleLookup.PRICE_RULE_ALL,
    PriceRuleLookup.PRICE_RULE_DEFAULT,
    []
  );
  @Input() PriceRule: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild('priceRule') priceRuleElem: ElementRef;
  userTemplateId: any;
  showPriceRuleFields: boolean;
  searchStatus: any;
  keyValues: any;
  keyNames: any = 'price_rule';
  procedurePrice: any;
  modifier: ModifierCodeMaster[];
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  menuOpened= ""
  @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
  popUpButtonClicked(button: any) {
    if (button.name === "yes") {
      this.showPriceRuleFields= true;
      //this.isUserGroupFieldOpen = true;
      this.createNewPriceRule();
    }
    if (button.name === "no") {
      this.showPriceRuleFields = false;
      console.log("button No has been click!");
    }
    this.popUpMessage = null;
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
  onChangePriceRule(event: any) {
    // this.halfFormReset();
    // this.GetAllFormData(event.target.value);
  }
  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  editPriceRuleMaster: boolean;
  priceRuleMaster: PriceRuleMaster;
  priceRuleMasters: PriceRuleMaster[];
  createPriceRuleMaster() {
    this.formValidation.validateForm();
    if (this.priceRuleForm.valid) {
      let priceRuleMaster = new PriceRuleMaster();
      priceRuleMaster.priceRule = Form.getValue(
        this.priceRuleForm,
        "priceRule"
      );
      priceRuleMaster.description = Form.getValue(
        this.priceRuleForm,
        "textbox001"
      );
      priceRuleMaster.description = Form.getValue(
        this.priceRuleForm,
        "textbox001"
      );
      priceRuleMaster.useExtDrgPricer = this.TrueFalseToYAndN(
        Form.getValue(this.priceRuleForm, "useExternalDrgPricer")
      );

      priceRuleMaster.customTableLogic = this.TrueFalseToYAndN(
        Form.getValue(this.priceRuleForm, "customPricerRules")
      );

      priceRuleMaster.procedurePriceOption = Form.getValue(
        this.priceRuleForm,
        "procedurePriceSearchOption"
      );
      priceRuleMaster.modifierCode = Form.getValue(
        this.priceRuleForm,
        "wildcardModifier"
      );
      priceRuleMaster.fromMin1 = Form.getValue(
        this.priceRuleForm,
        "textbox002"
      );
      priceRuleMaster.thruMin1 = Form.getValue(
        this.priceRuleForm,
        "textbox003"
      );
      priceRuleMaster.currAnesMinUnit = Form.getValue(
        this.priceRuleForm,
        "textbox004"
      );
      priceRuleMaster.priorAnesMinUnit = Form.getValue(
        this.priceRuleForm,
        "textbox005"
      );
      priceRuleMaster.fromMin2 = Form.getValue(
        this.priceRuleForm,
        "textbox006"
      );
      priceRuleMaster.thruMin2 = Form.getValue(
        this.priceRuleForm,
        "textbox007"
      );
      priceRuleMaster.currAnesMinUnit2 = Form.getValue(
        this.priceRuleForm,
        "textbox008"
      );
      priceRuleMaster.currAnesMinUnit2 = Form.getValue(
        this.priceRuleForm,
        "textbox009"
      );
      priceRuleMaster.fromMin3 = Form.getValue(
        this.priceRuleForm,
        "textbox010"
      );
      priceRuleMaster.thruMin3 = Form.getValue(
        this.priceRuleForm,
        "textbox011"
      );
      priceRuleMaster.currAnesMinUnit3 = Form.getValue(
        this.priceRuleForm,
        "textbox012"
      );
      priceRuleMaster.currAnesMinUnit3 = Form.getValue(
        this.priceRuleForm,
        "textbox013"
      );
      priceRuleMaster.fromMin4 = Form.getValue(
        this.priceRuleForm,
        "textbox014"
      );
      priceRuleMaster.thruMin4 = Form.getValue(
        this.priceRuleForm,
        "textbox015"
      );
      priceRuleMaster.currAnesMinUnit4 = Form.getValue(
        this.priceRuleForm,
        "textbox016"
      );
      priceRuleMaster.currAnesMinUnit4 = Form.getValue(
        this.priceRuleForm,
        "textbox017"
      );

      priceRuleMaster.minimumMinForUnit = Form.getValue(
        this.priceRuleForm,
        "minimumMinForAUnit"
      );
      priceRuleMaster.currConvEffDate = Form.getValue(
        this.priceRuleForm,
        "currConvEffecDate"
      );
      this.priceRuleMasterService
        .createPriceRuleMaster(priceRuleMaster)
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
          }
        );
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }
  TrueFalseToYAndN(data: any) {
    if (data == true) {
      return "Y";
    } else {
      return "N";
    }
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getPriceRuleShortcutKeys(this));
    this.cdr.detectChanges();
  }

  updatePriceRuleMaster(priceRule: string) {
    this.formValidation.validateForm();
    if (this.priceRuleForm.valid) {
      let priceRuleMaster = new PriceRuleMaster();
      priceRuleMaster.priceRule = Form.getValue(
        this.priceRuleForm,
        "priceRule"
      );
      priceRuleMaster.description = Form.getValue(
        this.priceRuleForm,
        "textbox001"
      );

      priceRuleMaster.useExtDrgPricer = this.TrueFalseToYAndN(
        Form.getValue(this.priceRuleForm, "useExternalDrgPricer")
      );

      priceRuleMaster.customTableLogic = this.TrueFalseToYAndN(
        Form.getValue(this.priceRuleForm, "customPricerRules")
      );

      priceRuleMaster.procedurePriceOption = Form.getValue(
        this.priceRuleForm,
        "procedurePriceSearchOption"
      );
      priceRuleMaster.modifierCode = Form.getValue(
        this.priceRuleForm,
        "wildcardModifier"
      );
      priceRuleMaster.fromMin1 = Form.getValue(
        this.priceRuleForm,
        "textbox002"
      );
      priceRuleMaster.thruMin1 = Form.getValue(
        this.priceRuleForm,
        "textbox003"
      );
      priceRuleMaster.currAnesMinUnit = Form.getValue(
        this.priceRuleForm,
        "textbox004"
      );
      priceRuleMaster.priorAnesMinUnit = Form.getValue(
        this.priceRuleForm,
        "textbox005"
      );
      priceRuleMaster.fromMin2 = Form.getValue(
        this.priceRuleForm,
        "textbox006"
      );
      priceRuleMaster.thruMin2 = Form.getValue(
        this.priceRuleForm,
        "textbox007"
      );
      priceRuleMaster.currAnesMinUnit2 = Form.getValue(
        this.priceRuleForm,
        "textbox008"
      );
      priceRuleMaster.currAnesMinUnit2 = Form.getValue(
        this.priceRuleForm,
        "textbox009"
      );
      priceRuleMaster.fromMin3 = Form.getValue(
        this.priceRuleForm,
        "textbox010"
      );
      priceRuleMaster.thruMin3 = Form.getValue(
        this.priceRuleForm,
        "textbox011"
      );
      priceRuleMaster.currAnesMinUnit3 = Form.getValue(
        this.priceRuleForm,
        "textbox012"
      );
      priceRuleMaster.currAnesMinUnit3 = Form.getValue(
        this.priceRuleForm,
        "textbox013"
      );
      priceRuleMaster.fromMin4 = Form.getValue(
        this.priceRuleForm,
        "textbox014"
      );
      priceRuleMaster.thruMin4 = Form.getValue(
        this.priceRuleForm,
        "textbox015"
      );
      priceRuleMaster.currAnesMinUnit4 = Form.getValue(
        this.priceRuleForm,
        "textbox016"
      );
      priceRuleMaster.priorAnesMinUnit4 = Form.getValue(
        this.priceRuleForm,
        "textbox017"
      );
      priceRuleMaster.minimumMinForUnit = Form.getValue(
        this.priceRuleForm,
        "minimumMinForAUnit"
      );
      priceRuleMaster.currConvEffDate = Form.getDatePickerValue(
        this.priceRuleForm,
        "currConvEffecDate"
      );

      this.priceRuleMasterService
        .updatePriceRuleMaster(priceRuleMaster, priceRule)
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
          }
        );
    } else {
      this.toastService.showToast(
        "Some required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }
  savePriceRuleMaster() {
    if (this.editPriceRuleMaster) {
      if (this.isSuperUser) {
        this.updatePriceRuleMaster(this.priceRuleMaster.priceRule);
      } else {
        if (this.secWin.hasUpdatePermission()) {
          this.updatePriceRuleMaster(this.priceRuleMaster.priceRule);
        } else {
          this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
            this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
          });
        }
      }
    } else {
      if (this.isSuperUser) {
        this.createPriceRuleMaster();
      } else {
        if (this.secWin.hasInsertPermission()) {
          this.createPriceRuleMaster();
        } else {
          this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
            this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
          });
        }
      }
    }
  }


  deletePriceRuleMaster(priceRule: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.priceRuleMasterService.deletePriceRuleMaster(priceRule).subscribe(
        (response) => {
          this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        }
      );
    }
  }
  getPriceRuleMaster(priceRule: string) {
    this.priceRuleMasterService.getPriceRuleMaster(priceRule).subscribe(
      (priceRuleMaster) => {
        this.priceRuleMaster = priceRuleMaster;
        this.priceRuleForm.patchValue({
          useExternalDrgPricer: this.priceRuleMaster.useExtDrgPricer,
          customPricerRules: this.priceRuleMaster.priceRule,
          procedurePriceSearchOption: this.priceRuleMaster.procedurePriceOption,
          wildcardModifier: this.priceRuleMaster.modifierCode,
          minimumMinForAUnit: this.priceRuleMaster.minimumMinForUnit,
          currConvEffecDate: this.dateFormatPipe.defaultDisplayDateFormat(
            this.priceRuleMaster.currConvEffDate
          ),
        });
      }
    );
  }
  getPriceRuleMasters() {
    this.priceRuleMasterService.getPriceRuleMasters().subscribe(
      (priceRuleMasters) => {
        this.priceRuleMasters = priceRuleMasters;
      }
    );
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private sharedService: SharedService,
    private DddwDtlService: DddwDtlService,
    private datePipe: DatePipe,
    private ModifierCodeMasterService: ModifierCodeMasterService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageService: MessageMasterDtlService,
    public activeModal: NgbActiveModal,
    private router: Router,
    private toastService: ToastService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService,

    private modalService: NgbModal,
    private securityService: SecurityService,
    private priceRuleMasterService: PriceRuleMasterService,
    private menuSerrvice: MenuService
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.priceRuleForm);
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
      }
    );
  }
  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.menuInit();
    this.getProcPrice();
    this.getModifier();
    this.formValidation = new FormValidation(this.priceRuleForm);
    console.log(this.PriceRule);
    if (this.PriceRule) {
      setTimeout(() => {
        this.priceRuleForm.patchValue({
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
    this.priceRuleForm = this.formBuilder.group(
      {
        desc: ["", { updateOn: "blur", validators: [] }],
        priceRule: ["", { updateOn: "blur", validators: [] }],
        textbox001: ["", { updateOn: "blur", validators: [] }],
        useExternalDrgPricer: ["", { updateOn: "blur", validators: [] }],
        customPricerRules: ["", { updateOn: "blur", validators: [] }],
        procedurePriceSearchOption: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        wildcardModifier: ["", { updateOn: "blur", validators: [] }],
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
        textbox013: ["", { updateOn: "blur", validators: [] }],
        textbox014: ["", { updateOn: "blur", validators: [] }],
        textbox015: ["", { updateOn: "blur", validators: [] }],
        textbox016: ["", { updateOn: "blur", validators: [] }],
        textbox017: ["", { updateOn: "blur", validators: [] }],
        minimumMinForAUnit: ["", { updateOn: "blur", validators: [] }],
        currConvEffecDate: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  GetAllFormData(value: any) {
    this.priceRuleMasterService.getPriceRuleMaster(value).subscribe(
      (data) => {
        if (data) {
          // this.datesCheck();
          this.priceRuleMaster = data;
          this.priceRuleForm.get('priceRule').disable();
          this.searchStatus = true;
          setTimeout(() => {
            try {
              this.priceRuleMaster.updateDatetimeDisplay = this.datePipe.transform(
                  new Date(this.priceRuleMaster.updateDatetime),
                  "yyyy-MM-dd HH:mm:ss"
              );
              this.priceRuleMaster.insertDatetimeDisplay = this.datePipe.transform(
                  new Date(this.priceRuleMaster.insertDatetime),
                  "yyyy-MM-dd HH:mm:ss"
              );
            } catch (e) {
              console.log(e);
            }
          }, 500);
          this.showPriceRuleFields = true;
          this.editPriceRuleMaster = true;
          var useExternalDrgPricer = false;
          var customPricerRules = false;

          if (data.useExtDrgPricer == "Y") {
            useExternalDrgPricer = true;
          }
          if (data.customTableLogic == "Y") {
            customPricerRules = true;
          }
          this.priceRuleForm.patchValue({
            desc: data.description,
            textbox001: data.description,
            useExternalDrgPricer: useExternalDrgPricer,
            customPricerRules: customPricerRules,
            procedurePriceSearchOption: data.procedurePriceOption,
            textbox002: data.fromMin1,
            textbox003: data.thruMin1,
            wildcardModifier: data.modifierCode,
            textbox004: data.currAnesMinUnit,
            textbox005: data.priorAnesMinUnit,
            textbox006: data.fromMin2,
            textbox007: data.thruMin2,
            textbox008: data.currAnesMinUnit2,
            textbox009: data.priorAnesMinUnit2,
            textbox010: data.fromMin3,
            textbox011: data.thruMin3,
            textbox012: data.currAnesMinUnit3,
            textbox013: data.priorAnesMinUnit3,
            textbox014: data.fromMin4,
            textbox015: data.thruMin4,
            textbox016: data.currAnesMinUnit4,
            textbox017: data.currAnesMinUnit4,
            minimumMinForAUnit: data.minimumMinForUnit,
            currConvEffecDate: this.dateFormatPipe.defaultDisplayDateFormat(
              data.currConvEffDate
            ),
          });
        }
        setTimeout(() => {
          this.onProcedureChange(data.procedurePriceOption);
        }, 1000);
      },
      (error) => {
        let popMsg = new PopUpMessage(
          "price rule",
          "Price Rule",
          "27234: Price Rule does not exists. Press yes to create a new price rule.",
          "icon"
        );
        popMsg.buttons = [
          new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
          new PopUpMessageButton("no", "No", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, {
          size: "lg",
        });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
          this.popUpButtonClicked(event);
        });
      }
    );
  }
  createNewPriceRule() {
    if (this.isSuperUser) {
      this.showPriceRuleFields = false;
      this.editPriceRuleMaster = false;
      this.priceRuleForm.reset();
      this.isFormDataChangeStatus = false;
      this.priceRuleForm.get('priceRule').enable()
    } else {
      if (this.secWin.hasInsertPermission()) {
        this.showPriceRuleFields = false;
        this.isFormDataChangeStatus = false
        this.editPriceRuleMaster = false;
        this.priceRuleForm.reset()
        this.priceRuleForm.get('priceRule').enable()
      } else {
        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
          this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
        });
      }
    }
  }

  resetAll() {
    this.priceRuleForm.reset();
    this.showPriceRuleFields = false;
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New", shortcutKey: 'Ctrl + N' },
          { name: "Open", shortcutKey: 'Ctrl + O' },
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
        menuItem: "Topic",
        dropdownItems: [
          { name: "Price Rule Master" },
          { name: "Price Rule Detail" },
          { name: "Price Rule Detail Selection" },
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
          { name: "6 Price Rule" },
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
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewPriceRule();
          break;
        }
        case "Open": {
          this.handleOpenMenu();
          break;
        }
        case "Save": {
          this.savePriceRuleMaster();
          break;
        }
        case "Close": {
          this.activeModal.dismiss();
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
        case "Price Rule Detail Selection": {
          this.openPriceRuleDetailSelectionomponent()
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
        case "Audit Display": {
          this.openAuditDisplayComponent();
          break;
        }
        case "Show Timestamp": {
          if (this.priceRuleForm.get('priceRule').value === '') {
            this.messageService.findByMessageId(21127).subscribe(res => {
              this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
          } else {
            this.openShowTimestampComponent();
          }

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

  getProcPrice() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "procedure_price_option",
      "dw_prule_de"
    ).subscribe((data) => {
      this.procedurePrice = data;
    });
  }

  getModifier() {
    this.ModifierCodeMasterService.getModifierCodeMasters().subscribe(
      (data) => {
        this.modifier = data;
      }
    );
  }
  onChangeProcedure(event: any) {
    this.onProcedureChange(event.target.value);
  }

  onProcedureChange(event: any) {
    if (event != "N" && event != 'Y') {
      document.getElementById("wildcardModifier").removeAttribute("disabled");
    } else {
      document
        .getElementById("wildcardModifier")
        .setAttribute("disabled", "disabled");
    }
    this.isFormDataModified();
  }

  onPriceRuleLookup(event) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.priceRuleSearchModal;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          this.priceRuleForm.get("priceRule").setValue(res.priceRule);
          this.GetAllFormData(res.priceRule);
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }else if (event.key === 'Tab') {
      if (event.target.value !== '') {
          this.GetAllFormData(event.target.value)
      } else {
          this.messageService.findByMessageId(27072).subscribe(res => {
              this.showPopUp('27072: ' + res[0].messageText, 'Price Rule')
          })
      }
  }
  }

  modalClose() {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Price Rule')
      })
    } else {
      this.activeModal.close();
    }
  }

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
          this.savePriceRuleMaster()
        }
        else if (resp.name === 'No') {
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
    this.priceRuleForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
    viewModal.componentInstance.showIcon = true;
    viewModal.componentInstance.defaultFile = '/PRULE_Price_Rules.htm';
  }

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

  openPriceRuleMasterComponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.PriceRule = this.priceRuleMaster.priceRule;
  }

  openPriceRuleDetailComponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleDetailComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.priceRule = this.priceRuleMaster.priceRule;
  }

  openPriceRuleDetailSelectionomponent() {
    this.activeModal.dismiss();
    const ref = this.modalService.open(PriceRuleDetailSelectionComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
    ref.componentInstance.PriceRule = this.priceRuleMaster.priceRule;
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
        ref.componentInstance.keyNames = this.keyNames;
        ref.componentInstance.keyValues = this.priceRuleMaster.priceRule;
        ref.componentInstance.winID = this.windowId;
        ref.componentInstance.win = 'dw_prule_de';
        ref.componentInstance.showIcon = true;
      } else {
        this.messageService
            .findByMessageId(11073)
            .subscribe((message: MessageMasterDtl[]) => {
              this.toastService.showToast("11073: " + message[0].messageText, NgbToastType.Danger);
            });
      }
    } else {
      this.messageService
          .findByMessageId(30164)
          .subscribe((message: MessageMasterDtl[]) => {
            this.toastService.showToast("30164: " + message[0].messageText, NgbToastType.Danger);
          });
    }
  }

  openContentsComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openSearchForHelpComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openThisWindowComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openGlossaryComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openGettingStartedComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openHowToUseHelpComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
  }

  openAboutDiamondComponent() {
    const ref = this.modalService.open(HelpComponent, {
      size: "lg"
    });
    ref.componentInstance.showIcon = true;
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
    ref.componentInstance.insertDateTime = this.priceRuleMaster.insertDatetime;
    ref.componentInstance.insertDateTime = this.priceRuleMaster.insertDatetimeDisplay;
    ref.componentInstance.insertProcess = this.priceRuleMaster.insertProcess;
    ref.componentInstance.insertUser = this.priceRuleMaster.insertUser;
    ref.componentInstance.updateUser = this.priceRuleMaster.updateUser;
    ref.componentInstance.updateDateTime = this.priceRuleMaster.updateDatetimeDisplay;
    ref.componentInstance.updateProcess = this.priceRuleMaster.updateProcess;
  }

  handleMenuActiveIndex(id) {
    document.getElementById(id).click();
  }

  preventDefault(event: KeyboardEvent) {
    event.preventDefault();
    this.pressedKey = [];
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUpHandler(event: KeyboardEvent) {
    setTimeout(() => {
      let keys = this.pressedKey;
      let index = keys.indexOf(event.key.toLowerCase());
      if (index >= 0) {
        this.pressedKey.splice(index, 1);
      }
    }, 1000);
  }

  handleOpenMenu() {
    this.resetAll();
    this.priceRuleElem.nativeElement.focus();
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
          case 's':
            obj = {
              menu: {
                menuItem: 'Topic'
              },
              action: 'Price Rule Detail Selection'
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
