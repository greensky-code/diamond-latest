/* Copyright (c) 2021 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
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
import { MessageMasterDtl, VendorCredit, VendorCreditCustom } from "../../../api-models/index";
import { VendorCreditService } from "../../../api-services/vendor-credit.service";
import {
  AlertMessage,
  AlertMessageService,
} from "../../../shared/components/alert-message/index";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecurityService } from "../../../shared/services/security.service";
import { SecUserService } from "../../../api-services/security/sec-user.service";
import { SecUser } from "../../../api-models/security/sec-user.model";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecWin } from "../../../api-models/security/sec-win.model";
import { DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService } from "../../../api-services";
import { SearchModel } from "../../../shared/models/models";
import { MemberMasterReasconLookup } from "../../../shared/lookup/member-master-reason-lookup";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the VendorCreditStatusComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "vendorcreditstatus",
  templateUrl: "./vendor-credit-status.component.html",
  providers: [
    VendorCreditService,
    SecColDetailService,
    SecUserService,
    DatePipe,
    DddwDtlService,
    ReasonCodeMasterService,
    MessageMasterDtlService,
  ],
})
export class VendorCreditStatusComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  vendorCreditStatusForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  userTemplateId: string;
  @Input() showIcon: boolean = false;
  submitForm = new EventEmitter<any>();
  public shortcuts: ShortcutInput[] = [];

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @Input() selectedAddress: any;
  accountType: any;
  newDate: any;
  newUser: any;
  reasonModel = new SearchModel(
    "membermasters/reason/lookup",
    MemberMasterReasconLookup.REASON_ALL,
    MemberMasterReasconLookup.REASON_DEFAULT,
    [{ REASON_CODE_TYPE: "DN" }]
  );
  blueClass: boolean;
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

  editVendorCredit: boolean;
  vendorCredit: VendorCredit;
  vendorCredits: VendorCredit[];
  @Input() vendorCreditCustom: VendorCreditCustom;

  createVendorCredit() {
    //if (this.secWin.hasInsertPermission()) {
    this.formValidation.validateForm();
    if (this.vendorCreditStatusForm.valid) {
      let vendorCredit = new VendorCredit();
      vendorCredit.seqVendId = Form.getValue(
        this.vendorCreditStatusForm,
        "vendorId"
      );
      vendorCredit.seqVendAddress = Form.getValue(
        this.vendorCreditStatusForm,
        "vendorAddress"
      );
      vendorCredit.seqVendAdvPayAcc = Form.getValue(
        this.vendorCreditStatusForm,
        "advPayAccount"
      );
      vendorCredit.denyReason = Form.getValue(
        this.vendorCreditStatusForm,
        "denyReason"
      );
      vendorCredit.updateUser = Form.getValue(
        this.vendorCreditStatusForm,
        "date"
      );
      vendorCredit.userDefined1 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDefined1"
      );
      vendorCredit.userDefined2 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDefined2"
      );
      vendorCredit.userDate1 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDate1"
      );
      vendorCredit.userDate2 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDate2"
      );
      this.vendorCreditService.createVendorCredit(vendorCredit).subscribe(
        (response) => {
          this.toastr.showToast('Record successfully created', NgbToastType.Success);
          this.editVendorCredit = false;
        }
      );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
    //  } else {
    //}
  }

  updateVendorCredit() {
    // if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.vendorCreditStatusForm.valid) {
      let vendorCredit = new VendorCredit();
      vendorCredit.seqVendId = Form.getValue(
        this.vendorCreditStatusForm,
        "vendorId"
      );
      vendorCredit.seqVendAddress = Form.getValue(
        this.vendorCreditStatusForm,
        "vendorAddress"
      );
      vendorCredit.seqVendAdvPayAcc = Form.getValue(
        this.vendorCreditStatusForm,
        "advPayAccount"
      );
      vendorCredit.denyReason = Form.getValue(
        this.vendorCreditStatusForm,
        "denyReason"
      );
      if (this.newDate == null) {
        vendorCredit.approveDate = Form.getDatePickerValue(
          this.vendorCreditStatusForm,
          "dateCurrent"
        );
      } else {
        vendorCredit.approveDate = this.newDate;
      }

      if (this.newUser == null) {
        vendorCredit.approveUser = Form.getValue(
          this.vendorCreditStatusForm,
          "byCurrent"
        );
      } else {
        vendorCredit.approveUser = this.newUser;
      }
      vendorCredit.approveUserDefined1 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDefined1"
      );
      vendorCredit.approveUserDefined2 = Form.getValue(
        this.vendorCreditStatusForm,
        "userDefined2"
      );
      vendorCredit.approveUserDate1 = Form.getDatePickerValue(
        this.vendorCreditStatusForm,
        "userDate1"
      );
      vendorCredit.approveUserDate2 = Form.getDatePickerValue(
        this.vendorCreditStatusForm,
        "userDate2"
      );
      return vendorCredit;
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
    //} else {
    //   this.showPopUp(
    //     "You are not permitted to update Group Master ",
    //     "Group Master Permissions"
    //   );
    //  }
  }
  saveVendorCredit() {
    if (this.editVendorCredit) {
      //this.updateVendorCredit(this.vendorCredit.seqVendCredit);
    } else {
      this.createVendorCredit();
    }
  }
  deleteVendorCredit(seqVendCredit: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.vendorCreditService.deleteVendorCredit(seqVendCredit).subscribe(
        (response) => {
          this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
        }
      );
    }
  }
  getVendorCredit(seqVendCredit: number) {
    this.vendorCreditService.getVendorCredit(seqVendCredit).subscribe(
      (vendorCredit) => {
        this.vendorCredit = vendorCredit;
        this.vendorCreditStatusForm.patchValue({
          vendorId: this.vendorCredit.seqVendId,
          vendorAddress: this.vendorCredit.seqVendAddress,
          advPayAccount: this.vendorCredit.seqVendAdvPayAcc,
          denyReason: this.vendorCredit.denyReason,
          date: this.vendorCredit.updateUser,
          userDefined1: this.vendorCredit.userDefined1,
          userDefined2: this.vendorCredit.userDefined2,
          userDate1: this.dateFormatPipe.defaultDisplayDateFormat(
            this.vendorCredit.userDate1
          ),
          userDate2: this.dateFormatPipe.defaultDisplayDateFormat(
            this.vendorCredit.userDate2
          ),
        });
      }
    );
  }
  getVendorCredits() {
    this.vendorCreditService.getVendorCredits().subscribe(
      (vendorCredits) => {
        this.vendorCredits = vendorCredits;
      }
    );
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private toastr: ToastService,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private securityService: SecurityService,
    private DddwDtlService: DddwDtlService,
    private vendorCreditService: VendorCreditService,
    private datePipe: DatePipe,
    private messageService: MessageMasterDtlService,
    private ReasonCodeMasterService: ReasonCodeMasterService,
    private MessageMasterDtlService: MessageMasterDtlService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.vendorCreditStatusForm);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
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
      .findByTableNameAndUserId("VENDOR_CREDIT", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }
  getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
      (secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
        } else {
          this.showPopUp(
            "You are not Permitted to view Vendor Credit Status",
            "Vendor Credit Permission"
          );
        }
      }
    );
  }

  private initializePermission(): void {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (this.isSuperUser) {
      this.secProgress = false;
      this.initializeComponentState();
      return;
    }
    //to check function level security
  }

  private initializeComponentState(): void {
    this.createForm();
    this.getAccountType();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.vendorCreditStatusForm);
    this.populateForm(this.vendorCreditCustom);
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.vendorCreditStatusForm = this.formBuilder.group(
      {
        vendorId: ["", { updateOn: "blur", validators: [] }],
        vendorAddress: ["", { updateOn: "blur", validators: [] }],
        advPayAccount: ["", { updateOn: "blur", validators: [] }],
        seqNo: ["", { updateOn: "blur", validators: [] }],
        idPrintCode: ["", { updateOn: "blur", validators: [] }],
        denyReason: ["", { updateOn: "blur", validators: [] }],
        by: ["", { updateOn: "blur", validators: [] }],
        date: ["", { updateOn: "blur", validators: [] }],
        byCurrent: ["", { updateOn: "blur", validators: [] }],
        dateCurrent: ["", { updateOn: "blur", validators: [] }],
        userDefined1: ["", { updateOn: "blur", validators: [] }],
        userDefined2: ["", { updateOn: "blur", validators: [] }],
        userDate1: ["", { updateOn: "blur", validators: [] }],
        userDate2: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  populateForm(vendorCreditCustom: VendorCreditCustom) {
    if (vendorCreditCustom) {
      setTimeout(() => {
        this.vendorCreditStatusForm.patchValue({
          vendorId: vendorCreditCustom.vendorId,
          vendorAddress: this.selectedAddress,
          advPayAccount: vendorCreditCustom.seqVendAdvPayAcc,
          seqNo: vendorCreditCustom.seqVendCredit,
          idPrintCode: vendorCreditCustom.creditStatus,
          denyReason: vendorCreditCustom.denyReason,
          byCurrent: vendorCreditCustom.approveUser,
          dateCurrent: vendorCreditCustom.approveDate,
          userDefined1: vendorCreditCustom.userDefined1,
          userDefined2: vendorCreditCustom.userDefined2,
          userDate1: vendorCreditCustom.userDate1,
          userDate2: vendorCreditCustom.userDate2,
        });
        this.enableDisable(vendorCreditCustom.creditStatus);
      }, 900);
    }
  }
  getAccountType() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "approve_status",
      "dw_vadpy_approval_de"
    ).subscribe((data) => {
      this.accountType = data;
    });
  }
  onFormSubmit() {
    let vendorCredit = this.updateVendorCredit();
    if (vendorCredit) {
      this.submitForm.emit(vendorCredit);
      this.activeModal.close();
    }
  }
  onChangeAccountStatus(event: any) {
    this.enableDisable(event.target.value);
    var isSuper = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (isSuper) {
      this.newUser = "UT_SUPER";
    }
      this.newDate = this.datePipe.transform(new Date(), "M/d/yyyy");
      this.vendorCreditStatusForm.patchValue({
        by: this.newUser,
        date: this.newDate,
      });
  }
  onChangeDenyReason(value: any) {
    this.ReasonCodeMasterService.getReasonCodeMaster(
      value
    ).subscribe((data) => {
      if (data) {
      } else {
        this.messageService
          .findByMessageId(27222)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp(
              "27222 : " + message[0].messageText,
              "Vendor Credit Status"
            );
          });
      }
    },
      (error) => {
       this.messageService
           .findByMessageId(27222)
           .subscribe((message: MessageMasterDtl[]) => {
             this.showPopUp(
               "27222 : " + message[0].messageText.replace('1@',value),
               "Vendor Credit Status"
             );
           });
    });
  }

  enableDisable(event: any) {
    if (event == "N") {
      this.vendorCreditStatusForm.get("denyReason").enable();
      this.blueClass = true;
      this.vendorCreditStatusForm.controls["denyReason"].setValidators([
        Validators.required,
      ]);
    } else if (event == "Y") {
      this.vendorCreditStatusForm.get("idPrintCode").disable();
      this.vendorCreditStatusForm.get("denyReason").disable();
      this.vendorCreditStatusForm.controls["denyReason"].clearValidators();
      this.blueClass = false;
    }
  }

  onDenyReasonKeyDown(event) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      this.reasonModel.isMatchAllContracts = false;
      ref.componentInstance.searchModel = this.reasonModel;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res && res.REASON_CODE) {
          this.vendorCreditStatusForm
            .get("denyReason")
            .setValue(res.REASON_CODE);
        }
      });
    }
    if(event.key== "Tab" ){
      this.onChangeDenyReason(event.target.value);
    }
  }
}
