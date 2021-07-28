/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
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
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel, NGBModalOptions } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { AlertMessage, AlertMessageService } from'../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { CiebBankAcctCodeService, CiebBankNameService, CiebBankTermReasonCodeService, CiebEftStatusCodeService, CiebPaymentCodeService, SecUserService } from '../../../api-services';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import {
    CiebBankAcctCode,
    CiebBankName,
    CiebBankTermReasonCode,
    CiebEftStatusCode,
    CiebPaymentCode,
    SecUser,
    SecWin
} from '../../../api-models';
import { NgbActiveModal, NgbModal, NgbNav } from "@ng-bootstrap/ng-bootstrap";
import { AddressBankSearchComponent } from './address-bank-search/address-bank-search.component';

// Use the Component directive to define the AoadbasBankIComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "app-address-bank",
  templateUrl: "./aoadbas--bank-i.component.html",
})
export class AddressBankComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  aoadbasBankIForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "ADDON";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  isInitialDataLoaded = true;
  private tabSet: NgbNav;
  Banks: CiebBankName[];
  payment: CiebPaymentCode[];
  terms: CiebBankAcctCode[];
  termsReason: CiebBankTermReasonCode[];
  eft: CiebEftStatusCode[];
  isDisplayStateField: boolean;
  AccountType: CiebBankAcctCode[];
  @ViewChild(NgbNav) set content(content: NgbNav) {
    this.tabSet = content;
  }
  @Input() seqMembId: number;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  userTemplateId: any;
  loader: boolean;
  ShowBankSearch: boolean;
  showBankInfo: boolean;
  @Input() activeTab = 1;
  Searched: boolean = false;
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

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private CiebBankNameService: CiebBankNameService,
    private secUserService: SecUserService,
    private CiebPaymentCodeService: CiebPaymentCodeService,
    private CiebBankTermReasonCodeService: CiebBankTermReasonCodeService,
    private secColDetailService: SecColDetailService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private CiebEftStatusCodeService: CiebEftStatusCodeService,
    private CiebBankAcctCodeService: CiebBankAcctCodeService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
     this.createForm();
     this.formValidation = new FormValidation(this.aoadbasBankIForm);
         this.getBankNames();
      this.getPaymentCode();
      this.getAccountype();
      this.getTermsReason();
      this.getEFTStatus();
          this.initializePermission();
          this.displayMessage = {};
  this.checkStatus();
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */
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
      this.getSecColDetails(user);
      this.userTemplateId = user.dfltTemplate;
      this.getSecWin(user.dfltTemplate);
    });
  }
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
  /**
   * Get Permissions
   * @param secUserId
   */
  getSecWin(secUserId: string) {
    this.secWinService
      .getSecWin(this.windowId, secUserId)
      .subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
          this.secProgress = false;
        } else {
          this.secProgress = false;

          this.showPopUp(
            "You are not Permitted to view MEMBER Master",
            "Member Master Permission"
          );
        }
      });
  }
  private initializePermission(): void {
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
    this.isInitialDataLoaded = true;
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.aoadbasBankIForm);
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.aoadbasBankIForm = this.formBuilder.group(
      {
        bankName: ["", { updateOn: "blur", validators: [] }],
        paymentType: ["", { updateOn: "blur", validators: [] }],
        bankAddress: ["", { updateOn: "blur", validators: [] }],
        routingCode: ["", { updateOn: "blur", validators: [] }],
        effDate: ["", { updateOn: "blur", validators: [] }],
        termDate: ["", { updateOn: "blur", validators: [] }],
        termReasons: ["", { updateOn: "blur", validators: [] }],
        ibanBankAccount: ["", { updateOn: "blur", validators: [] }],
        nameOnAccounts: ["", { updateOn: "blur", validators: [] }],
        bankAcctType: ["", { updateOn: "blur", validators: [] }],
        documentRefNumber: ["", { updateOn: "blur", validators: [] }],
        paymentAdvice: ["", { updateOn: "blur", validators: [] }],
        eftStatus: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  OnChange(id: any) {
    if (id == 1) {
      this.isInitialDataLoaded = false;
      this.loader = true;

        this.showBankInfo = true;
        this.ShowBankSearch = false;
        //this.loadDropDownValues();
      
    } else {
  
        this.ShowBankSearch = true;
        this.showBankInfo = false;
    
    }
  }

  getBankNames() {
    this.CiebBankNameService.getCiebBankNames().subscribe((data) => {
      this.Banks = data;
    });
  }

  getPaymentCode() {
    this.CiebPaymentCodeService.getCiebPaymentCodes().subscribe((data) => {
      this.payment = data;
    });
  }

  getAccountype() {
    this.CiebBankAcctCodeService.getCiebBankAcctCodes().subscribe((data) => {
      this.AccountType = data;
    });
  }
  getTermsReason() {
    this.CiebBankTermReasonCodeService.getCiebBankTermReasonCodes().subscribe(
      (data) => {
        this.termsReason = data;
      }
    );
  }
  getEFTStatus() {
    this.CiebEftStatusCodeService.getCiebEftStatusCodes().subscribe((data) => {
      this.eft = data;
    });
  }

  setFieldValue(fieldName: string, fieldValue: string | number) {
    this.aoadbasBankIForm.controls[fieldName].patchValue(fieldValue);

    this.isDisplayStateField = true;
  }
  fetchData() {
    this.aoadbasBankIForm.patchValue({
      bankName:"BANCO DE CHILE",
      paymentType: "CHK",
      bankAddress: "Ahumada 251 Santiago, 8320000 Chile",
      routingCode: "BANCODECHILLE",
      bankAcctType: "CHK",
      eftStatus: "ENT",
      paymentAdvice: "PRT"
    });
  }
  Save() {}
  resetForm() {}

  openBankSearch() {
    let ref = this.modalService.open(AddressBankSearchComponent, {
      size: <any>"xl",
      backdrop: "static",
      keyboard: false,
      ...NGBModalOptions,
    });
    ref.componentInstance.showIcon = true;
    if (ref.componentInstance.SelectBranch) {
      ref.componentInstance.SelectBranch.subscribe((data) => {
        this.Searched = true;
        this.checkStatus();
      });
    }
    
  }
  checkStatus(){
      if (this.Searched) {
    
        setTimeout(() => {
          this.fetchData();
        }, 1000);
      } else {
        this.openBankSearch();
      }
  }
}


