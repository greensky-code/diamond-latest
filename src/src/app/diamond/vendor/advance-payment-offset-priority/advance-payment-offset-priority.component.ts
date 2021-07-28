/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, datePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageMasterDtl, VendorAdvPayPriority } from '../../../api-models/index';
import { VendorAdvPayPriorityService } from '../../../api-services/vendor-adv-pay-priority.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { VendorMasterService } from '../../../api-services/vendor-master.service';
import { MessageMasterDtlService, SystemCodesService } from '../../../api-services';
import { Menu, SearchModel } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { ToastService } from '../../../shared/services/toast.service';
import { SystemCodes, VendorAddress, VendorMaster } from '../../../../../src/app/api-models';
import { VendorSearchboxComponent } from '../../../shared/components/vendor-searchbox/vendor-searchbox.component';
import { NgbToastType } from 'ngb-toast';
import { CONSTANTS, onVendorModuleTopicMenuClick, SharedService } from '../../../shared/services/shared.service';
import { DEFAULT_LANGUAGE, SYSTEM_CODE_ADV_PAY_TYPE } from '../../../shared/models/constants';
import { VendorMasterLookup } from '../../../shared/lookup/vendor-master-lookup';
import { VendorMasterComponent } from '../vendor-master/vendor-master.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';

// Use the Component directive to define the AdvancePaymentOffsetPriorityComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "advancepaymentoffsetpriority",
  templateUrl: "./advance-payment-offset-priority.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    VendorAdvPayPriorityService,
    FunctionalLevelSecurityService,
    MessageMasterDtlService,
  ],
})
export class AdvancePaymentOffsetPriorityComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  advancePaymentOffsetPriorityForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = datePickerModel;
  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;
  editVendorAdvPayPriority: boolean;
  vendorAdvPayPriority: VendorAdvPayPriority;
  vendorAdvPayPrioritys: VendorAdvPayPriority[];
  systemCodes: SystemCodes[];
  public menu: Menu[] = [];
  searchModel = new SearchModel(
    "vendormasters/lookup",
    VendorMasterLookup.VENDOR_MASTER_ALL,
    VendorMasterLookup.VENDOR_MASTER_DEFAULT,
    []
  );
  @Input() winID?: string;
  @Input() showIcon = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  vendorMaster: VendorMaster;
  searchStatus = false;
  keyNames: string = "adv_pay_type";
  keyValues: any;
  @Input() vendorID?: string;
    vendorId: any;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;

  showPopUp() {
    this.popUpMessage = new PopUpMessage(
      "poUpMessageName",
      "Pop-up message title",
      "Pop-up message",
      "icon"
    );
    this.popUpMessage.buttons = [
      new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
      new PopUpMessageButton("no", "No", "btn btn-primary"),
    ];
    this.child.showMesssage();
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === "yes") {
      console.log("button yes has been click!");
    }
    if (button.name === "no") {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  createVendorAdvPayPriority() {
    this.formValidation.validateForm();
    if (this.advancePaymentOffsetPriorityForm.valid) {
      let vendorAdvPayPriority = new VendorAdvPayPriority();
      vendorAdvPayPriority.priorityOrder = Form.getValue(
        this.advancePaymentOffsetPriorityForm,
        "priorityOrder"
      );
      vendorAdvPayPriority.advPayType = Form.getValue(
        this.advancePaymentOffsetPriorityForm,
        "advPayType"
      );
      vendorAdvPayPriority.seqVendId = this.vendorMaster.seqVendId;
      this.vendorAdvPayPriorityService
        .createVendorAdvPayPriority(vendorAdvPayPriority)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.editVendorAdvPayPriority = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close()
              }, 2000)
            }
            this.isFormDataChangeStatus = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateVendorAdvPayPriority(seqVendAdvPayPriority: number) {
    this.formValidation.validateForm();
    if (this.advancePaymentOffsetPriorityForm.valid) {
      let vendorAdvPayPriority = new VendorAdvPayPriority();
      vendorAdvPayPriority.priorityOrder = Form.getValue(
        this.advancePaymentOffsetPriorityForm,
        "priorityOrder"
      );
      vendorAdvPayPriority.advPayType = Form.getValue(
        this.advancePaymentOffsetPriorityForm,
        "advPayType"
      );
      vendorAdvPayPriority.seqVendId = this.vendorMaster.seqVendId;
      this.vendorAdvPayPriorityService
        .updateVendorAdvPayPriority(vendorAdvPayPriority, seqVendAdvPayPriority)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.editVendorAdvPayPriority = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close()
              }, 2000)
            }
            this.isFormDataChangeStatus = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  saveVendorAdvPayPriority() {
    if (this.editVendorAdvPayPriority) {
      this.updateVendorAdvPayPriority(
        this.vendorAdvPayPriority.seqVendAdvPayPriority
      );
    } else {
      this.createVendorAdvPayPriority();
    }
  }
  deleteVendorAdvPayPriority(seqVendAdvPayPriority: number) {
    this.vendorAdvPayPriorityService
      .deleteVendorAdvPayPriority(seqVendAdvPayPriority)
      .subscribe(
        (response) => {
          this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        }
      );
  }
  getVendorAdvPayPriority(seqVendAdvPayPriority: number) {
    this.vendorAdvPayPriorityService
      .getVendorAdvPayPriority(seqVendAdvPayPriority)
      .subscribe(
        (vendorAdvPayPriority) => {
          this.vendorAdvPayPriority = vendorAdvPayPriority;
          this.advancePaymentOffsetPriorityForm.patchValue({
            priorityOrder: this.vendorAdvPayPriority.priorityOrder,
            advPayType: this.vendorAdvPayPriority.advPayType,
            vendorId: this.vendorMaster.vendorId,
          });
        }
      );
  }
  getVendorAdvPayPrioritys() {
    this.vendorAdvPayPriorityService.getVendorAdvPayPrioritys().subscribe(
      (vendorAdvPayPrioritys) => {
        this.vendorAdvPayPrioritys = vendorAdvPayPrioritys;
      }
    );
  }

  getVendorAdvPayPrioritysByVendId(seqVendId: number) {
    this.vendorAdvPayPriorityService.findBySeqVendId(seqVendId).subscribe(
      (vendorAdvPayPrioritys) => {
        this.vendorAdvPayPrioritys = vendorAdvPayPrioritys;
        this.dataGridGridOptions.api.setRowData(vendorAdvPayPrioritys);
        if (
          this.vendorAdvPayPrioritys &&
          this.vendorAdvPayPrioritys.length > 0
        ) {
          this.dataGridGridOptions.api.selectIndex(0, false, false);
          this.gridSelectionChange();
        }
      }
    );
  }
  gridSelectionChange() {
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      const priorityOrder = selectedRows[0].priorityOrder;
      const advPayType = selectedRows[0].advPayType;
      this.vendorAdvPayPriority = selectedRows[0];
      this.advancePaymentOffsetPriorityForm.patchValue({
        priorityOrder: priorityOrder,
        advPayType: advPayType,
        vendorId: this.vendorMaster.vendorId,
      }, {emitEvent: false});
      setTimeout(() => {
        this.isFormDataModified()
      }, 2000)
      this.editVendorAdvPayPriority = true;
    }
  }

  dataGridGridOptionsExportCsv() {
    let params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "priorityOrder",
        field: "priorityOrder",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Adv Pay Type",
        field: "advPayType",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private router: Router,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    public activeModal: NgbActiveModal,
    private vendorMasterService: VendorMasterService,
    private messageService: MessageMasterDtlService,
    private modalService: NgbModal,
    private sharedService:SharedService,
    private toastService: ToastService,
    private systemCodesService: SystemCodesService,
    private vendorAdvPayPriorityService: VendorAdvPayPriorityService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(
      this.advancePaymentOffsetPriorityForm
    );
    this.createDataGrid();
    setTimeout(() => {
      this.getSystemCodes();
      this.dataGridGridOptions.api.setRowData([]);
    });
    if (this.vendorID) {
      this.advancePaymentOffsetPriorityForm.patchValue({
        vendorId: this.vendorID,
      });
            this.vendorId = this.vendorID;

     this.getVendorAdvPayByVendorId(this.vendorID);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.advancePaymentOffsetPriorityForm = this.formBuilder.group(
      {
        priorityOrder: ["", { updateOn: "blur", validators: [] }],
        advPayType: ["", { updateOn: "blur", validators: [] }],
        vendorId: ["", { updateOn: "blur", validators: [] }],
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
       this.openLookupFieldSearchModel();
    } else if (event.key === "Tab") {
      event.preventDefault();
      let vendorId = event.target.value;
      this.vendorId=vendorId;
      this.getVendorAdvPayByVendorId(vendorId);
    }
  }

  private getVendorAdvPayByVendorId(vendorId: any) {
    this.vendorMasterService.findVendorMasterByVendorId(vendorId).subscribe(
      (vendorMaster) => {
        if (vendorMaster.seqVendId) {
          this.vendorMaster = vendorMaster;
          this.getVendorAdvPayPrioritysByVendId(vendorMaster.seqVendId);
          this.searchStatus = true;
        } else {
          this.alertMessage = this.alertMessageService.error("28013");
          this.searchStatus = false;
        }
      }
    );
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open" },
          { name: "Save" },
          { name: "Close" },
          { name: "-" },
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
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Windows",
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
          { name: "2 Vendor Master" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window" },
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
          this.editVendorAdvPayPriority = false;
          this.advancePaymentOffsetPriorityForm.patchValue({
            vendorId: this.vendorMaster.vendorId,
          });
          break;
        }
        case "Open": {
          // statements;
          break;
        }
        case "Save": {
          if (this.validateInputForSave()) {
            this.saveVendorAdvPayPriority();
          }
          break;
        }
        case "Close": {
          this.advancePaymentOffsetPriorityForm.reset();
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
         "Adv. Pay Priority",
         this.activeModal,
         this.vendorId
       );
      this.handleTopicMenu(event.action);
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      switch (event.action) {
        case "View Credit Balance": {
          if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdNameExist(
              CONSTANTS.F_VW_CREDIT_BAL
            );
            if (status) {
              this.toastService.showToast(
                "This option is not implemented yet",
                NgbToastType.Danger
              );
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
              .findByMessageId(29029)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  "29029: " + message[0].messageText
                );
              });
          }

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
          // if (this.searchStatus) {
          //     let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.winID);
          //     if (!status) {
          //         this.alertMessage =
          //          this.alertMessageService.error('11073 (User does not have authorization to execute this function.)');
          //     }
          // } else {
          //     this.alertMessage = this.alertMessageService.error('30164: A row must be selected before using the menu option');
          // }

          break;
        }
      }
    }
  }

  /**
   * Handle Menu Actions for Topic
   * @param action: string
   */
  handleTopicMenu(action: any) {
    switch (action) {
      case "Master File": {
        const ref = this.modalService.open(VendorMasterComponent, {
          size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        break;
      }
      case "Addresses": {
        // const ref = this.modalService.open(, { size: <any>'xl' });
        // ref.componentInstance.showIcon = true;
        break;
      }
      case "Adv. Pay Priority": {
        // const ref = this.modalService.open(, { size: <any>'xl' });
        // ref.componentInstance.showIcon = true;
        break;
      }
      case "Adv. Pay Account": {
        // const ref = this.modalService.open(, { size: <any>'xl' });
        // ref.componentInstance.showIcon = true;
        break;
      }
      case "Vendor Credit": {
        // const ref = this.modalService.open(, { size: <any>'xl' });
        // ref.componentInstance.showIcon = true;
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

  /**
   * Handle Menu Actions for Special
   * @param action: string
   */
  private handleEditMenu(action: string) {
    switch (action) {
      case "Lookup": {
        this.openLookupFieldSearchModel();
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

  openLookupFieldSearchModel() {
    let vendorMaster = new VendorMaster();
    let ref = this.modalService.open(VendorSearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.vendorMaster = res;
        this.advancePaymentOffsetPriorityForm.patchValue({
          vendorId: this.vendorMaster.vendorId,
        });
        this.vendorId=res.vendorId;
        this.getVendorAdvPayByVendorId(this.vendorMaster.vendorId);
        // this.vendorStatus = true;
        // vendorMaster = res;
        // this.setVendorMasterValues(vendorMaster);
      }
    });
  }

  getSystemCodes() {
    this.systemCodesService
      .getSystemCodesByLangAndtype(SYSTEM_CODE_ADV_PAY_TYPE, DEFAULT_LANGUAGE)
      .subscribe(
        (systemCodes) => {
          this.systemCodes = systemCodes;
        }
      );
  }

  private validateInputForSave() {
    if (!this.advancePaymentOffsetPriorityForm.get("priorityOrder").value) {
      this.alertMessage = this.alertMessageService.error(
        "29032: priority_order is a required field. Enter the something other than blanks."
      );
      return false;
    }

    if (!this.advancePaymentOffsetPriorityForm.get("advPayType").value) {
      this.alertMessage = this.alertMessageService.error(
        "29032: adv_pay_type is a required field. Enter the something other than blanks."
      );
      return false;
    }

    return true;
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Advance Payment Offset Priority')
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
          if (this.validateInputForSave()) {
            this.saveVendorAdvPayPriority();
          }
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
    this.advancePaymentOffsetPriorityForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }
}
