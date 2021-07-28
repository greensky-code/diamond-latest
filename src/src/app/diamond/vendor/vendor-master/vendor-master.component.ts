import {ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {VendorMasterService} from '../../../api-services/vendor-master.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, datePickerModel} from '../../../shared/config';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {VendorMaster} from '../../../api-models/vendor-master';
import {Form} from '../../../shared/helpers/form.helper';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {VendorMasterLookup} from '../../../shared/lookup/vendor-master-lookup';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {AccountsPayableService, DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {DddwDtl, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {CONSTANTS, getVendorMasterShortcutKeys, SharedService} from '../../../shared/services/shared.service';
import {CommonService} from '../../../shared/services/common.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {VendorAdvancePaymentRulesComponent} from '../vendor-advance-payment-rules/vendor-advance-payment-rules.component';
import {VendorTinLookup} from '../../../shared/lookup/vendor-tin-lookup';
import {TradingPartnerMasterLookup} from '../../../shared/lookup/trading-partner-master';
import {ProviderRelationshipComponent} from '../../provider/provider-relationship/provider-relationship.component';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { ViewCreditBalanceComponent } from '../view-credit-balance/view-credit-Balance.component';
import { VendorAccountNoLookup } from '../../../shared/lookup/vendor-account-no-lookup';

@Component({
  selector: "app-vendor-master",
  templateUrl: "./vendor-master.component.html",
  styleUrls: ["./vendor-master.component.css"],
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    VendorMasterService,
    DddwDtlService,
    CommonService,
    FunctionalLevelSecurityService,
  ],
})
export class VendorMasterComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  vendorMasterForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = datePickerModel;
  public shortcuts: ShortcutInput[] = [];
  public menu: Menu[] = [];
  dddwDtls: DddwDtl[] = [];
  dddwDtls1: DddwDtl[] = [];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  @Input() showIcon = false;
  @Input() winID?: string;
  @Input() vid?: string;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @Input() vendorID?: string;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  vendorStatus = false;
  indicatorStatus = false;
  public showVendorMasterField: boolean = false;
  isReadOnly = false;
  isVendorID = false;
  searchStatus = false;
  keyNames = "seq_vend_id";
  keyValues: any;
  noParentAllowedMessage: MessageMasterDtl[];
  vendorId: any;
  seqVendId: any;
  holdPaymentFlagStatus = false;
  secWin: SecWinViewModel;
  userTemplateId: string;
  isSuperUser = false;
  secProgress = true;
  windowId = "VENDR";
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

  editVendorMaster = false;
  vendorMaster: VendorMaster;
  vendorMasters: VendorMaster[];
  accountNoModel = new SearchModel(
    "vendormasters/accountno/lookup",
    VendorAccountNoLookup.VENDOR_ACCOUNT_NO_ALL,
    VendorAccountNoLookup.VENDOR_ACCOUNT_NO_DEFAULT,
    []
  );
  createVendorMaster() {
    this.formValidation.validateForm();
    if (this.vendorMasterForm.valid) {
      let vendorMaster = new VendorMaster();
      vendorMaster.vendorId = Form.getValue(this.vendorMasterForm, "vendorId");
      vendorMaster.fullName = Form.getValue(this.vendorMasterForm, "fullName");

      vendorMaster.shortName = Form.getValue(
        this.vendorMasterForm,
        "shortName"
      );
      vendorMaster.vendorType = Form.getValue(
        this.vendorMasterForm,
        "vendorType"
      );
      vendorMaster.irsTaxId = Form.getValue(this.vendorMasterForm, "irsTaxId");
      vendorMaster.nationalProviderId = Form.getValue(
        this.vendorMasterForm,
        "nationalProviderId"
      );
      vendorMaster.tradingPartnerId = Form.getValue(
        this.vendorMasterForm,
        "tradingPartnerId"
      );
      vendorMaster.holdPaymentFlag = Form.getValue(
        this.vendorMasterForm,
        "holdPaymentFlag"
      );
      vendorMaster.paymentDelayDays = Form.getValue(
        this.vendorMasterForm,
        "paymentDelayDays"
      );
      vendorMaster.eftInd = Form.getValue(
        this.vendorMasterForm,
        "eftIndicator"
      );
      vendorMaster.vendBankAccountNumber = Form.getValue(
        this.vendorMasterForm,
        "bankAccountNo"
      );
      vendorMaster.vendBankAccountDescription = Form.getValue(
        this.vendorMasterForm,
        "bankAcctDesc"
      );
      vendorMaster.vendAbaRoutingNumber = Form.getValue(
        this.vendorMasterForm,
        "abaRoutingNo"
      );
      vendorMaster.vendAccountType = Form.getValue(
        this.vendorMasterForm,
        "accountType"
      );

      if (this.holdPaymentFlagStatus) {
        vendorMaster.holdPaymentFlag = "Y";
      } else {
        vendorMaster.holdPaymentFlag = "N";
      }

      if (this.isReadOnly) {
        vendorMaster.eftInd = "Y";
      } else {
        vendorMaster.eftInd = "N";
      }

      vendorMaster.userDate1 = Form.getDatePickerValue(
        this.vendorMasterForm,
        "userDate1"
      );
      vendorMaster.userDate2 = Form.getDatePickerValue(
        this.vendorMasterForm,
        "userDate2"
      );

      this.vendorMasterService.createVendorMaster(vendorMaster).subscribe(
        (response: any) => {
          this.toastService.showToast(
            "Record successfully created",
            NgbToastType.Success
          );
          this.editVendorMaster = false;
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }
          this.isFormDataChangeStatus = false;
        },
        (error: any) => {
          this.alertMessage = this.alertMessageService.error(
            "An Error occurred while creating new record. Please check your entry."
          );
        }
      );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          {
            name: "New",
            shortcutKey: "Ctrl+M",
            disabled: !(
              this.isSuperUser ||
              (this.secWin && this.secWin.hasUpdatePermission())
            ),
          },
          { name: "Open", shortcutKey: "Ctrl+O" },
          {
            name: "Save",
            shortcutKey: "Ctrl+S",
            disabled: !(
              this.isSuperUser ||
              (this.secWin && this.secWin.hasUpdatePermission())
            ),
          },
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
          { name: "Next", shortcutKey: "F8" },
          { name: "Previous", shortcutKey: "F7" },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Master File" },
          { name: "Addresses" },
          { name: "Adv. Pay Priority" },
          { name: "Adv. Pay Account" },
          { name: "Vendor Credit" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [
          { name: "Vendor Lookup" },
          { name: "Provider Relationships..." },
          { name: "Adv Pay Rules" },
          { name: "Acc Pay Vendor Display " },
          { name: "View Credit Balance" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4" }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
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
          this.createForm();
          this.showVendorMasterField = false;
                            this.vendorMasterForm.get("vendorId").enable();

          break;
        }
        case "Open": {
             this.createForm();
             this.showVendorMasterField = false;
             this.vendorMasterForm.get("vendorId").enable();

          // statements;
          break;
        }
        case "Save": {
          this.saveVendorMaster();
          break;
        }
        case "Close": {
          this.vendorMasterForm.reset();
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
      this.sharedService.onVendorModuleTopicMenuClick(
        event.action,
        "Vendor Master",
        this.activeModal,
        this.vendorId
      );
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      this.handleSpecialMenu(event.action);

      switch (event.action) {
        case "View Credit Balance": {
          let status =
            this.functionalLevelSecurityService.isFunctionIdNameExist(
              CONSTANTS.F_VW_CREDIT_BAL
            );
          if (status) {
            if (this.searchStatus) {
              this.toastService.showToast(
                "This option is not implemented yet",
                NgbToastType.Danger
              );
            } else {
              this.messageService
                .findByMessageId(29029)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.alertMessage = this.alertMessageService.error(
                    "29029: " + message[0].messageText
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

        case "Provider Relationships...": {
          let status =
            this.functionalLevelSecurityService.isFunctionIdNameExist(
              CONSTANTS.F_PROV_RELATION
            );
          if (status) {
            if (this.searchStatus) {
              let ref = this.modalService.open(ProviderRelationshipComponent);
              ref.componentInstance.vendorProviderId = this.seqVendId;
              ref.componentInstance.showIcon = true;
            } else {
              this.messageService
                .findByMessageId(28003)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.alertMessage = this.alertMessageService.error(
                    "28003: " + message[0].messageText
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
        case "Adv Pay Rules": {
          let ref = this.modalService.open(VendorAdvancePaymentRulesComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.onRowSelected.subscribe((response: any) => {});
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

          break;
        }
      }
    }
  }

  /**
   * Handle Menu Actions for Special
   * @param action: string
   */
  private handleEditMenu(action: string) {
    switch (action) {
      case "Lookup": {
        this.openLookupVendorIdFieldSearchModel();
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

  updateVendorMaster(seqVendId: number) {
    this.formValidation.validateForm();
    if (this.vendorMasterForm.valid) {
      let vendorMaster = new VendorMaster();
      vendorMaster.seqVendId = this.vendorMaster.seqVendId;
      vendorMaster.vendorId = Form.getValue(this.vendorMasterForm, "vendorId");
      vendorMaster.fullName = Form.getValue(this.vendorMasterForm, "fullName");
      vendorMaster.shortName = Form.getValue(
        this.vendorMasterForm,
        "shortName"
      );
      vendorMaster.vendorType = Form.getValue(
        this.vendorMasterForm,
        "vendorType"
      );
      vendorMaster.irsTaxId = Form.getValue(this.vendorMasterForm, "irsTaxId");
      vendorMaster.nationalProviderId = Form.getValue(
        this.vendorMasterForm,
        "nationalProviderId"
      );
      vendorMaster.tradingPartnerId = Form.getValue(
        this.vendorMasterForm,
        "tradingPartnerId"
      );
      vendorMaster.holdPaymentFlag = Form.getValue(
        this.vendorMasterForm,
        "holdPaymentFlag"
      );
      vendorMaster.paymentDelayDays = Form.getValue(
        this.vendorMasterForm,
        "paymentDelayDays"
      );
      // vendorMaster.eftInd = Form.getValue(
      //   this.vendorMasterForm,
      //   "eftIndicator"
      // );
      vendorMaster.vendBankAccountNumber = Form.getValue(
        this.vendorMasterForm,
        "bankAccountNo"
      );
      vendorMaster.vendBankAccountDescription = Form.getValue(
        this.vendorMasterForm,
        "bankAcctDesc"
      );
      vendorMaster.vendAbaRoutingNumber = Form.getValue(
        this.vendorMasterForm,
        "abaRoutingNo"
      );
      vendorMaster.vendAccountType = Form.getValue(
        this.vendorMasterForm,
        "accountType"
      );
      vendorMaster.userDate1 = Form.getDatePickerValue(
        this.vendorMasterForm,
        "userDate1"
      );
      vendorMaster.userDate2 = Form.getDatePickerValue(
        this.vendorMasterForm,
        "userDate2"
      );

      if (Form.getValue(this.vendorMasterForm, "eftIndicator") === true) {
        vendorMaster.eftInd = "Y";
      }

      this.vendorMasterService
        .updateVendorMaster(vendorMaster, seqVendId)
        .subscribe(
          (response: any) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.editVendorMaster = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close();
              }, 2000);
            }
            this.isFormDataChangeStatus = false;
          },
          (error: any) => {
            this.alertMessage = this.alertMessageService.error(
              "An Error occurred while updating record. Please check your entry."
            );
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveVendorMaster() {
    if (this.editVendorMaster) {
      this.updateVendorMaster(this.vendorMaster.seqVendId);
    } else {
      this.createVendorMaster();
    }
  }

  onChangeShortName(event: any, id: any) {
    if (event.key === "Tab") {
      if (!id) {
        this.messageService
          .findByMessageId(29032)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopUpMessage(
              "29032: " + message[0].messageText.replace("@1", "short_name"),
              "Vendor Master",
              "OK"
            );
          });
        const element = this.renderer.selectRootElement("#shortName");
        setTimeout(() => element.focus(), 50);
      }
    }
  }

  showPopUpMessage(message: string, title: string, button = "Cancel") {
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
      new PopUpMessageButton(button, button, "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  deleteVendorMaster(seqVendId: number) {
    this.vendorMasterService
      .deleteVendorMaster(seqVendId)
      .subscribe((response: any) => {
        this.toastService.showToast(
          "Record successfully deleted",
          NgbToastType.Success
        );
      });
  }

  getVendorMaster(seqVendId: number) {
    this.vendorMasterService
      .getVendorMaster(seqVendId)
      .subscribe((vendorMaster: VendorMaster) => {
        this.vendorMaster = vendorMaster;
        this.vendorMasterForm.patchValue({
          vendorId: this.vendorMaster.vendorId,
          fullName: this.vendorMaster.fullName,
          shortName: this.vendorMaster.shortName,
          vendorType: this.vendorMaster.vendorType,
          irsTaxId: this.vendorMaster.irsTaxId,
          nationalProviderId: this.vendorMaster.nationalProviderId,
          tradingPartnerId: this.vendorMaster.tradingPartnerId,
          holdPaymentFlag: this.vendorMaster.holdPaymentFlag,
          paymentDelayDays: this.vendorMaster.paymentDelayDays,
          eftIndicator: this.vendorMaster.eftInd,
          bankAccountNo: this.vendorMaster.vendBankAccountNumber,
          bankAcctDesc: this.vendorMaster.vendBankAccountDescription,
          abaRoutingNo: this.vendorMaster.vendAbaRoutingNumber,
          accountType: this.vendorMaster.vendAccountType,
        });
      });
  }

  getVendorMasters() {
    this.vendorMasterService
      .getVendorMasters()
      .subscribe((vendorMasters: VendorMaster[]) => {
        this.vendorMasters = vendorMasters;
      });
  }

  // Use constructor injection to inject an instance of a FormBuilder
  searchModel = new SearchModel(
    "vendormasters/lookup",
    VendorMasterLookup.VENDOR_MASTER_ALL,
    VendorMasterLookup.VENDOR_MASTER_DEFAULT,
    []
  );
  searchModelIRSTaxId = new SearchModel(
    "vendortins/lookup",
    VendorTinLookup.VENDOR_TIN_ALL,
    VendorTinLookup.VENDOR_TIN_DEFAULT,
    [],
    true
  );

  searchModelTradingPartnerId = new SearchModel(
    "tradingpartnermasters/lookup",
    TradingPartnerMasterLookup.TRADING_PARTNER_MASTER_ALL,
    TradingPartnerMasterLookup.TRADING_PARTNER_MASTER_DEFAULT,
    []
  );
  accountTypeState: boolean = false;
  constructor(
    private accountsPayableService: AccountsPayableService,

    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router,
    private renderer: Renderer2,
    private dddwDtlService: DddwDtlService,
    private commonService: CommonService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private vendorMasterService: VendorMasterService,
    private messageService: MessageMasterDtlService,
    private secWinService: SecWinService,
    private securityService: SecurityService,
    private secUserService: SecUserService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }
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
      this.userTemplateId = user.dfltTemplate;
      this.getSecWin(user.dfltTemplate);
    });
  }
  getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
      (secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
          this.secProgress = false;
        } else {
          this.showPopUp(
            "You are not Permitted to view VENDOR Master",
            "Vendor Master Permission"
          );
        }
      },
      (error) => {
        this.initializeComponentState();
      }
    );
  }
  initializeComponentState() {
    this.createForm();
    this.menuInit();
    this.getVendorType();
    this.getAccountType();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.vendorMasterForm);
    if (this.vendorID) {
      this.vendorMasterForm.patchValue({
        vendorId: this.vendorID,
      });
      this.vendorId = this.vendorID;
      this.getVendorMasterByVenddorId(this.vendorID);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.vendorMasterForm = this.formBuilder.group(
      {
        vendorId: ["", { updateOn: "blur", validators: [] }],
        fullName: ["", { updateOn: "blur", validators: [] }],
        shortName: ["", { updateOn: "blur", validators: [] }],
        vendorType: ["", { updateOn: "blur", validators: [] }],
        irsTaxId: ["", { updateOn: "blur", validators: [] }],
        nationalProviderId: ["", { updateOn: "blur", validators: [] }],
        tradingPartnerId: ["", { updateOn: "blur", validators: [] }],
        holdPaymentFlag: ["", { updateOn: "blur", validators: [] }],
        paymentDelayDays: ["", { updateOn: "blur", validators: [] }],
        eftIndicator: ["", { updateOn: "blur", validators: [] }],
        bankAccountNo: ["", { updateOn: "blur", validators: [] }],
        bankAcctDesc: ["", { updateOn: "blur", validators: [] }],
        abaRoutingNo: ["", { updateOn: "blur", validators: [] }],
        accountType: ["", { updateOn: "blur", validators: [] }],
        wcVndrNo: ["", { updateOn: "blur", validators: [] }],
        surcharge: ["", { updateOn: "blur", validators: [] }],
        userDate1: ["", { updateOn: "blur", validators: [] }],
        userDate2: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onLookupFieldChange(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupVendorIdFieldSearchModel();
    } else if (event.key === "Tab") {
      event.preventDefault();
      let vendorId = event.target.value;
      this.vendorId = event.target.value;
     this.vendorMasterForm.get("vendorId").disable();

     setTimeout(() => {
       this.nextFocus();
     }, 3000);
      this.getVendorMasterByVenddorId(vendorId);
    }
  }

  onLookupFieldChange2(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupFieldSearchModel2();
    }
  }

  onLookupFieldChangeTradingPartnerId(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupFieldSearchModelTradingPartnerID();
    } else if (event.key === "Tab") {
      event.preventDefault();
      let vendorId = event.target.value;
      this.getVendorMasterByVenddorId(vendorId);
    }
  }

  OpenNewVendorPopUp() {
    this.vendorStatus = false;
    this.editVendorMaster = false;

    this.messageService
      .findByMessageId(28012)
      .subscribe((message: MessageMasterDtl[]) => {
        let popUpMessage = new PopUpMessage(
          "notExist",
          "Vendor Master",
          "28012: " + message[0].messageText,
          "icon"
        );
        popUpMessage.buttons = [
          new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
          new PopUpMessageButton("no", "No", "btn btn-primary"),
        ];
        let ref = this.sharedService.showDialogBox(popUpMessage);
        ref.buttonclickEvent.subscribe((event: any) => {
          this.popUpButtonClicked(event);
        });
      });
    this.searchStatus = false;
  }

  nextFocus() {
    
    const element = this.renderer.selectRootElement("#fullName");
    setTimeout(() => element.focus(), 50);
  }

  getVendorMasterByVenddorId(vId: string) {
    vId = vId.trim().length == 0 ? "-" : vId;
    this.vendorMasterService
      .findVendorMasterByVendorId(vId)
      .subscribe((vendorMaster: VendorMaster) => {
        if (vendorMaster.vendorId != null) {
          this.vendorMaster = new VendorMaster();
          this.vendorMaster = vendorMaster;
          this.editVendorMaster = true;
          this.vendorStatus = true;
          this.setVendorMasterValues(vendorMaster);
          this.popUpMessage = null;
          this.searchStatus = true;
          this.showVendorMasterField = true;
        } else {
          vId = vId == "-" ? vendorMaster.seqVendId + "" : vId;
          this.vendorId = vId;
          this.vendorMasterForm.get("vendorId").setValue(vId);
          this.OpenNewVendorPopUp();
        }
      });
  }

  popUpButtonClicked(button: PopUpMessageButton) {
    if (button.name == "yes") {
      this.vendorStatus = true;
      this.showVendorMasterField = true;
      this.editVendorMaster = false;
      this.vendorMasterForm.patchValue({
        vendorId: Form.getValue(this.vendorMasterForm, "vendorId"),
        vendAccountType: "",
        vendorType: "M",
      });
      this.vendorMasterForm.get("vendorId").disable();
      this.accountTypeState = !this.accountTypeState;
      setTimeout(() => {
        this.nextFocus();
      }, 3000);
    } else {
      this.showVendorMasterField = false;
      this.vendorId = "";
      this.vendorMasterForm.get("vendorId").setValue("");
    }
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getVendorMasterShortcutKeys(this));
    this.cdr.detectChanges();
  }

  openLookupVendorIdFieldSearchModel() {
    console.log("test");
    let vendorMaster = new VendorMaster();
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.isPagination = true;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      if (resp != null) {
        this.vendorStatus = true;
        vendorMaster = resp;
        this.vendorId = resp.vendorId;
        this.setVendorMasterValues(vendorMaster);
        this.searchStatus = true;
        this.showVendorMasterField = true;
                setTimeout(() => {
                  this.vendorMasterForm.get("vendorId").disable();
                }, 1000);
        setTimeout(() => {
          this.nextFocus();
        }, 3000);
      }
    });
  }

  openLookupFieldSearchModel2() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModelIRSTaxId;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      if (resp != null) {
        this.vendorMasterForm.patchValue({
          irsTaxId: resp.irsTaxId,
        });
      }
    });
  }

  openLookupFieldSearchModelTradingPartnerID() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModelTradingPartnerId;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      if (resp != null) {
        this.vendorMasterForm.patchValue({
          tradingPartnerId: resp.tradingPartnerId,
        });
      }
    });
  }

  setVendorMasterValues(vendorMaster: VendorMaster) {
    this.seqVendId = vendorMaster.seqVendId;
    if (vendorMaster.eftInd == "Y") {
      this.changeStatus(true);
    }
    this.vendorMasterForm.patchValue({
      seqVendId: vendorMaster.seqVendId,
      vendorId: vendorMaster.vendorId,
      fullName: vendorMaster.fullName,
      shortName: vendorMaster.shortName,
      vendorType: vendorMaster.vendorType,
      irsTaxId: vendorMaster.irsTaxId,
      nationalProviderId: vendorMaster.nationalProviderId,
      tradingPartnerId: vendorMaster.tradingPartnerId,
      holdPaymentFlag: vendorMaster.holdPaymentFlag,
      paymentDelayDays: vendorMaster.paymentDelayDays,
      eftIndicator: vendorMaster.eftInd,
      bankAccountNo: vendorMaster.vendBankAccountNumber,
      bankAcctDesc: vendorMaster.vendBankAccountDescription,
      abaRoutingNo: vendorMaster.vendAbaRoutingNumber,
      accountType: vendorMaster.vendAccountType,
      userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
        vendorMaster.userDate1
      ),
      userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
        vendorMaster.userDate2
      ),
    }, {emitEvent: false});
    this.searchStatus = true;
    this.keyValues = vendorMaster.seqVendId;
    setTimeout(() => {
      this.isFormDataModified();
    }, 2000)
  }

  getVendorType() {
    this.dddwDtlService
      .findByColumnNameAndDwname("vendor_type", "dw_vendr_de")
      .subscribe((dddwDtls: DddwDtl[]) => {
        this.dddwDtls = dddwDtls;
      });
  }

  getAccountType() {
    this.dddwDtlService
      .findByColumnNameAndDwname("vend_account_type", "dw_vendr_de")
      .subscribe((dddwDtls: DddwDtl[]) => {
        this.dddwDtls1 = dddwDtls;
      });
  }

  changeStatus(status: any) {
    this.isReadOnly = status;
  }

  changeStatus2(status: any) {
    this.holdPaymentFlagStatus = status;
  }

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, "Vendor Master");
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
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === "Yes") {
          this.saveVendorMaster();
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
    this.vendorMasterForm.valueChanges.subscribe((res) => {
      this.isFormDataChangeStatus = true;
    });
  }
  private handleSpecialMenu(action: string) {
    switch (action) {
      case "Vendor Lookup": {
        this.openLookupVendorIdFieldSearchModel();
        break;
      }
      case "View Credit Balance": {
        this.CheckCreditBalanceAndOpenScreen();
        break;
      }
      case "Provider Relationships": {
        let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
          CONSTANTS.F_PROV_RELATION
        );
        if (status) {
          if (this.searchStatus) {
            this.toastService.showToast(
              "This option is not implemented yet",
              NgbToastType.Danger
            );
          } else {
            this.messageService
              .findByMessageId(28003)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  "28003: " + message[0].messageText
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
      case "Adv Pay Rules": {
        let ref = this.modalService.open(VendorAdvancePaymentRulesComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((response: any) => {});
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
  CheckCreditBalanceAndOpenScreen() {
    if (!this.seqVendId) {
      this.messageService
        .findByMessageId(29029)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "29029 : " + message[0].messageText.replace("@1", "Vendor Id"),
            "Vendor"
          );
        });
      return;
    }
    this.accountsPayableService
      .getCreditBalance(this.seqVendId)
      .subscribe((data) => {
        if (data.length > 0) {
          let ref = this.modalService.open(ViewCreditBalanceComponent);
          ref.componentInstance.searchModel = this.accountNoModel;
          ref.componentInstance.showIcon = true;
          ref.componentInstance.seq_vend_id = this.seqVendId;
        } else {
          this.messageService
            .findByMessageId(30033)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "30033 : " + message[0].messageText,
                "Vendor Credit"
              );
            });
        }
      });
  }
 
}
