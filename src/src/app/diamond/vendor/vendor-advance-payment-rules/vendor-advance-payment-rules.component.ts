/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { DatePipe } from '@angular/common';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { VendorAdvPayRulesService } from '../../../api-services/vendor-adv-pay-rules.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { DatePickerConfig } from '../../../shared/config';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { VendorAdvPayRules } from '../../../api-models/vendor-adv-pay-rules.model';
import {
    CONSTANTS,
    getMemberMasterShortcutKeys,
    getVendorAdvPayRulesShortcutKeys
} from '../../../shared/services/shared.service';
import {NgbToastType} from 'ngb-toast';
import {DddwDtlService, DddwHdrService} from '../../../api-services';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {Form} from '../../../shared/helpers/form.helper';


// Use the Component directive to define the VendorAdvancePaymentRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "vendoradvancepaymentrules",
  templateUrl: "./vendor-advance-payment-rules.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    VendorAdvPayRulesService,
    DddwHdrService,
    DddwDtlService,
  ],
})
export class VendorAdvancePaymentRulesComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    vendorAdvancePaymentRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public showVendorAdvancePayment = false;
    private advPayDescription: any;
    private advPayType: any;
    public shortcuts: ShortcutInput[] = [];
    editVendorAdvPayRules: boolean;
    vendorAdvPayRules: VendorAdvPayRules;
    vendorAdvPayRuleses: VendorAdvPayRules[];
    @Input() vendorID?: string;

    offSets: any[] = [];
    payOptions: any[] = [];
    payTypes: any[] = [];

    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private vendorAdvPayRulesService: VendorAdvPayRulesService,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private cdr: ChangeDetectorRef) {
    }

  ngOnInit(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(
      this.vendorAdvancePaymentRulesForm
    );
    this.getOffsetBy();
    this.zeroPayOption();
    this.accPayOption();
    
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getVendorAdvPayRulesShortcutKeys(this));
    this.cdr.detectChanges();
  }

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

  onAdvancePayTypeChange(event, value) {
    if (event.key === "F5") {
      event.preventDefault();
      //   this.openLookupFieldSearchModel();
    } else if (event.key === "Tab") {
      event.preventDefault();
      this.advPayType = value;
      this.getAdvancePayType(value);
    }
  }

  getOffsetBy() {
    this.dddwDtlService
      .findByColumnNameAndDwname(CONSTANTS.OFF_SET_BY, CONSTANTS.DW_VADPR_DE)
      .subscribe(
        (codes) => {
          this.offSets = codes;
        }
      );
  }

  zeroPayOption() {
    this.dddwDtlService
      .findByColumnNameAndDwname(
        CONSTANTS.ZERO_PAY_OPTION,
        CONSTANTS.DW_VADPR_DE
      )
      .subscribe(
        (codes) => {
          this.payOptions = codes;
        }
      );
  }

  accPayOption() {
    this.dddwDtlService
      .findByColumnNameAndDwname(CONSTANTS.ACC_PAY_TYPE, CONSTANTS.DW_VADPR_DE)
      .subscribe(
        (codes) => {
          this.payTypes = codes;
        }
      );
  }

  getAdvancePayType(value) {
    this.vendorAdvPayRulesService.getAdvPayDescription(value).subscribe(
      (advPayDescription) => {
        // tslint:disable-next-line:triple-equals
        if (
          advPayDescription.body != null ||
          advPayDescription.body != undefined
        ) {
          this.advPayDescription = advPayDescription;
          this.vendorAdvPayRulesService.getVendorAdvPayRules(value).subscribe(
            (vendorAdvPayRules) => {
              if (vendorAdvPayRules) {
                this.getVendorAdvPayRules(vendorAdvPayRules);
                this.showVendorAdvancePayment = true;
                this.editVendorAdvPayRules = true;
              } else {
                // tslint:disable-next-line:max-line-length
                let popMsg = new PopUpMessage(
                  "vendorNotExistPopup",
                  "Vendor Advance Pay Rule",
                  "Entered Advance Pay Type: " +
                    value +
                    " does not exists. Press yes to create a Advance Pay Type: " +
                    value,
                  "icon"
                );
                // tslint:disable-next-line:max-line-length
                popMsg.buttons = [
                  new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
                  new PopUpMessageButton("no", "No", "btn btn-primary"),
                ];
                let ref = this.modalService.open(PopUpMessageComponent, {
                  size: "lg",
                });
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe(
                  (event: any) => {
                    this.popUpButtonClicked(event, advPayDescription, value);
                  }
                );
              }
            }
          );
        } else {
          let popUpMessage = new PopUpMessage(
            "Vendor Advance Payment Rules",
            "Vendor Advance Payment Rules",
            "29056: Advance Pay type: " + value + " does not exist",
            "info",
            [],
            MessageType.ERROR
          );
          popUpMessage.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
          let ref = this.modalService.open(PopUpMessageComponent);
          ref.componentInstance.popupMessage = popUpMessage;
          ref.componentInstance.showIcon = true;
          ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === "Ok") {
              this.modalService.dismissAll();
            }
          });
        }
      }
    );
  }

  popUpButtonClicked(button, description, advPayType) {
    if (button.name === "yes") {
      this.vendorAdvancePaymentRulesForm.patchValue({
        advPayType: advPayType,
        description: description.body.description,
      });
      this.showVendorAdvancePayment = true;
    }
    if (button.name === "no") {
      this.showVendorAdvancePayment = false;
      console.log("button No has been click!");
    }
    this.popUpMessage = null;
  }

  createVendorAdvPayRules() {
    this.formValidation.validateForm();
    if (this.vendorAdvancePaymentRulesForm.valid) {
      let vendorAdvPayRules = new VendorAdvPayRules();

      vendorAdvPayRules.advPayType = this.vendorAdvancePaymentRulesForm.get(
        "advancePayType"
      ).value;
      vendorAdvPayRules.zeroPayOption = this.vendorAdvancePaymentRulesForm.get(
        "zeroPayOption"
      ).value;
      if (this.vendorAdvancePaymentRulesForm.get("replenish").value) {
        vendorAdvPayRules.replenish = "Y";
      } else {
        vendorAdvPayRules.replenish = "N";
      }
      // vendorAdvPayRules.replenish = this.vendorAdvancePaymentRulesForm.get('replenish').value;
      vendorAdvPayRules.offsetBy = this.vendorAdvancePaymentRulesForm.get(
        "offsetBy"
      ).value;
      vendorAdvPayRules.accPayType = this.vendorAdvancePaymentRulesForm.get(
        "accPayType"
      ).value;
      vendorAdvPayRules.userDefined1 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine1"
      ).value;
      vendorAdvPayRules.userDate1 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate1"
      );
      vendorAdvPayRules.userDefined2 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine2"
      ).value;
      vendorAdvPayRules.userDate2 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate2"
      );
      vendorAdvPayRules.userDefined3 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine3"
      ).value;
      vendorAdvPayRules.userDate3 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate3"
      );
      vendorAdvPayRules.userDefined4 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine4"
      ).value;
      vendorAdvPayRules.userDate4 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate4"
      );
      this.vendorAdvPayRulesService
        .createVendorAdvPayRules(vendorAdvPayRules)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.editVendorAdvPayRules = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateVendorAdvPayRules(advPayType: string) {
    this.formValidation.validateForm();
    if (this.vendorAdvancePaymentRulesForm.valid) {
      let vendorAdvPayRules = new VendorAdvPayRules();
      vendorAdvPayRules.advPayType = this.vendorAdvancePaymentRulesForm.get(
        "advancePayType"
      ).value;
      vendorAdvPayRules.zeroPayOption = this.vendorAdvancePaymentRulesForm.get(
        "zeroPayOption"
      ).value;
      if (this.vendorAdvancePaymentRulesForm.get("replenish").value) {
        vendorAdvPayRules.replenish = "Y";
      } else {
        vendorAdvPayRules.replenish = "N";
      }
      // vendorAdvPayRules.replenish = this.vendorAdvancePaymentRulesForm.get('replenish').value;
      vendorAdvPayRules.offsetBy = this.vendorAdvancePaymentRulesForm.get(
        "offsetBy"
      ).value;
      vendorAdvPayRules.accPayType = this.vendorAdvancePaymentRulesForm.get(
        "accPayType"
      ).value;
      vendorAdvPayRules.userDefined1 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine1"
      ).value;
      vendorAdvPayRules.userDate1 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate1"
      );
      vendorAdvPayRules.userDefined2 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine2"
      ).value;
      vendorAdvPayRules.userDate2 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate2"
      );
      vendorAdvPayRules.userDefined3 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine3"
      ).value;
      vendorAdvPayRules.userDate3 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate3"
      );
      vendorAdvPayRules.userDefined4 = this.vendorAdvancePaymentRulesForm.get(
        "userDefine4"
      ).value;
      vendorAdvPayRules.userDate4 = Form.getDatePickerValue(
        this.vendorAdvancePaymentRulesForm,
        "userDate4"
      );
      this.vendorAdvPayRulesService
        .updateVendorAdvPayRules(vendorAdvPayRules, advPayType)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.editVendorAdvPayRules = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveRule() {
    let popUpMessage = new PopUpMessage(
      "Vendor Advance Pay Rules",
      "Vendor Advance Pay Rules",
      "6128: Data has beed modified, press yes to save changes",
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
    ref.componentInstance.buttonclickEvent.subscribe((resp) => {
      if (resp.name === "Yes") {
        // save only if user presses Yes from Model
        this.saveVendorAdvPayRules();
      } else if (resp.name === "No") {
        this.router.navigateByUrl("/");
      } // 3rd case: In case of cancel do nothing
    });
  }

  saveVendorAdvPayRules() {
    if (this.editVendorAdvPayRules) {
      this.updateVendorAdvPayRules(this.advPayType);
    } else {
      this.createVendorAdvPayRules();
    }
  }

  deleteVendorAdvPayRules(advPayType: string) {
    this.vendorAdvPayRulesService.deleteVendorAdvPayRules(advPayType).subscribe(
      (response) => {
        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
      }
    );
  }

  getVendorAdvPayRules(vendorAdvPayRules: VendorAdvPayRules) {
    // this.vendorAdvPayRulesService.getVendorAdvPayRules(advPayType).subscribe(vendorAdvPayRules => {
    this.vendorAdvPayRules = vendorAdvPayRules;
    this.vendorAdvancePaymentRulesForm.patchValue({
      advancePayType: this.vendorAdvPayRules.advPayType,
      description: this.advPayDescription.body.description,
      replenish: this.vendorAdvPayRules.replenish,
      offsetBy: this.vendorAdvPayRules.offsetBy,
      zeroPayOption: this.vendorAdvPayRules.zeroPayOption,
      accPayType: this.vendorAdvPayRules.accPayType,
      userDefine1: this.vendorAdvPayRules.userDefined1,
      userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
        this.vendorAdvPayRules.userDate1
      ),
      userDefine2: this.vendorAdvPayRules.userDefined2,
      userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
        this.vendorAdvPayRules.userDate2
      ),
      userDefine3: this.vendorAdvPayRules.userDefined3,
      userDate3: this.dateFormatPipe.defaultDisplayDateFormat(
        this.vendorAdvPayRules.userDate3
      ),
      userDefine4: this.vendorAdvPayRules.userDefined4,
      userDate4: this.dateFormatPipe.defaultDisplayDateFormat(
        this.vendorAdvPayRules.userDate4
      ),
    });
    // }, error => {
    //     this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    // });
  }
  getVendorAdvPayRuleses() {
    this.vendorAdvPayRulesService.getVendorAdvPayRuleses().subscribe(
      (vendorAdvPayRuleses) => {
        this.vendorAdvPayRuleses = vendorAdvPayRuleses;
      }
    );
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.vendorAdvancePaymentRulesForm = this.formBuilder.group(
      {
        advancePayType: ["", { updateOn: "blur", validators: [] }],
        description: ["", { updateOn: "blur", validators: [] }],
        replenish: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        offsetBy: ["", { updateOn: "blur", validators: [Validators.required] }],
        zeroPayOption: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        accPayType: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        userDefine1: ["", { updateOn: "blur", validators: [] }],
        userDate1: ["", { updateOn: "blur", validators: [] }],
        userDefine2: ["", { updateOn: "blur", validators: [] }],
        userDate2: ["", { updateOn: "blur", validators: [] }],
        userDefine3: ["", { updateOn: "blur", validators: [] }],
        userDate3: ["", { updateOn: "blur", validators: [] }],
        userDefine4: ["", { updateOn: "blur", validators: [] }],
        userDate4: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
