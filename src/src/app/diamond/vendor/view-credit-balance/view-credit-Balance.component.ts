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
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AccountsPayable,
  AccountsPayableCustom,
  DddwDtl,
} from "../../../api-models/index";
 import {  AccountsPayableService } from "../../../api-services/accounts-payable.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { DddwDtlService } from '../../../api-services';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the ViewCreditValanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "viewcreditBalance",
  templateUrl: "./view-credit-Balance.component.html",
  providers: [DddwDtlService],
})
export class ViewCreditBalanceComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  viewCreditValanceForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "";
  private fileType: DddwDtl[] = [];
  isSuperUser = false;
  secProgress = true;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @Input() seq_vend_id: any;

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

  editAccountsPayable: boolean;
  accountsPayable: AccountsPayable;
  accountsPayables: AccountsPayable[];
  accountsPayablesCustom: AccountsPayableCustom[];

  createAccountsPayable() {
    if (this.secWin.hasInsertPermission()) {
      this.formValidation.validateForm();
      if (this.viewCreditValanceForm.valid) {
        let accountsPayable = new AccountsPayable();
        this.accountsPayableService
          .createAccountsPayable(accountsPayable)
          .subscribe(
            (response) => {
              this.toastService.showToast('Record successfully created', NgbToastType.Success);
              this.editAccountsPayable = false;
            }
          );
      } else {
        this.alertMessage = this.alertMessageService.error(
          "Some required information is missing or incomplete. Please correct your entries and try again."
        );
      }
    } else {
    }
  }

  updateAccountsPayable(seqApTrans: number) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.viewCreditValanceForm.valid) {
        let accountsPayable = new AccountsPayable();
        this.accountsPayableService
          .updateAccountsPayable(accountsPayable, seqApTrans)
          .subscribe(
            (response) => {
              this.toastService.showToast('Record successfully updated', NgbToastType.Success);
              this.editAccountsPayable = false;
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
  saveAccountsPayable() {
    if (this.editAccountsPayable) {
      this.updateAccountsPayable(this.accountsPayable.seqApTrans);
    } else {
      this.createAccountsPayable();
    }
  }
  deleteAccountsPayable(seqApTrans: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.accountsPayableService.deleteAccountsPayable(seqApTrans).subscribe(
        (response) => {
          this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        }
      );
    }
  }
  getAccountsPayable(seqApTrans: number) {
    this.accountsPayableService.getAccountsPayable(seqApTrans).subscribe(
      (accountsPayable) => {
        this.accountsPayable = accountsPayable;
        this.viewCreditValanceForm.patchValue({});
      }
    );
  }
  getAccountsPayables() {
    this.accountsPayableService.getAccountsPayables().subscribe(
      (accountsPayables) => {
        this.accountsPayables = accountsPayables;
      }
    );
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
        headerName: "Trans ID",
        field: "seqcltrnid",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "File Type",
        field: "filetype",
        width: 200,
      },
      {
        headerName: "Net Amt",
        field: "netamt",
        width: 200,
      },
      {
        headerName: "Paid Net Amt",
        field: "paidnetamt",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private toastService: ToastService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private accountsPayableService: AccountsPayableService,
    private dddwDtlService: DddwDtlService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.viewCreditValanceForm);
    this.createDataGrid();
  }

  private initializePermission(): void {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (this.isSuperUser) {
      this.secProgress = false;
      this.initializeComponentState();
      return;
    }
    //If not super user then check function level security 


    // const parsedToken = this.securityService.getCurrentUserToken();
    // const userId = parsedToken ? parsedToken.sub : null;
    // this.secWinService
    //   .getSecWin(this.windowId, userId)
    //   .subscribe((secWin: SecWin) => {
    //     this.secWin = new SecWinViewModel(secWin);

    //     if (this.secWin.hasSelectPermission()) {
    //       this.initializeComponentState();
    //     } else {
    //       this.showPopUp(
    //         "You are not Permitted to View Credit Balance",
    //         "Window Error"
    //       );
    //     }
    //   });
  }

  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.viewCreditValanceForm);
    this.createDataGrid();
    if (this.seq_vend_id) {
      this.getCreditBalance(this.seq_vend_id);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.viewCreditValanceForm = this.formBuilder.group(
      {},
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getCreditBalance(seq_vend_id: any) {
    this.accountsPayableService.getCreditBalance(seq_vend_id).subscribe(
      (data) => {
        if (data.length > 0) {
          this.accountsPayablesCustom = data;
          if (this.accountsPayablesCustom.length > 0) {
            for (let i = 0; i < this.accountsPayablesCustom.length; i++) {
              this.copyFiletype(this.accountsPayablesCustom[i].fileType, i);
            }
          }
        }
      }
    );
  }
  getFileType() {
    this.dddwDtlService
      .findByColumnNameAndDwname("file_type", "dw_vendr_credit_balance")
      .subscribe((data) => {
        this.fileType = data;
      });
  }
  copyFiletype(type: any, k: any) {
    if (this.fileType.length > 0) {
      for (let i = 0; i < this.fileType.length; i++) {
        if (type === this.fileType[i].dddwDtlPrimaryKey.dataVal) {
          this.accountsPayablesCustom[k].fileType = this.fileType[
            i
          ].dddwDtlPrimaryKey.displayVal;
        }
      }
    }
  }
}
