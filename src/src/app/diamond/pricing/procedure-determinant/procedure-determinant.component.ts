/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, EventEmitter, Input, OnInit,  Output,  ViewChild } from '@angular/core';
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
import {  MessageMasterDtl, ProcedureDeterminant } from "../../../api-models/index"
import {  ProcedureDeterminantService } from "../../../api-services/procedure-determinant.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { DddwDtlService } from '../../../api-services/dddw-dtl.service';
import { ToastService } from '../../../shared/services/toast.service';
import { MessageMasterDtlService } from '../../../api-services/message-master-dtl.service';
import { ProcedureDeterminantFieldsNames, ProcedureDeterminantFormConfig } from '../../../shared/models/constants';
import { FormRow, FORM_FIELD_ACTION_TYPES } from '../../../shared/models/models';
import { NgbToastType } from 'ngb-toast';

// Use the Component directive to define the ProcedureDeterminantComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "proceduredeterminant",
  templateUrl: "./procedure-determinant.component.html",
  providers: [
    MessageMasterDtlService,
    DddwDtlService,
    ToastService,
    ProcedureDeterminantService,
    MessageMasterDtlService,
  ],
})
export class ProcedureDeterminantComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  procedureDeterminantForm: FormGroup;
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
  procedureFormConfig = ProcedureDeterminantFormConfig;
  procedureDetState: Array<FormRow> = [];
  isAddNewRow: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  userTemplateId: string;
  config: any;
  @Input() procedureCode: any;
  saveForm: any;
  @Input() showIcon: boolean = false;
  operators: any;
  isSaveForm = false;
  DetermLineNo: number;
    FromValueError: boolean;
    ThruValueError: boolean;

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

  editProcedureDeterminant: boolean;
  procedureDeterminant: ProcedureDeterminant;
  procedureDeterminants: ProcedureDeterminant[];

  createProcedureDeterminant() {
    this.formValidation.validateForm();
    if (this.procedureDeterminantForm.valid) {
      let procedureDeterminant = new ProcedureDeterminant();
      procedureDeterminant.procedureCode = Form.getValue(
        this.procedureDeterminantForm,
        "procedureCode"
      );
      this.procedureDeterminantService
        .createProcedureDeterminant(procedureDeterminant)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.editProcedureDeterminant = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateProcedureDeterminant(procedureCode: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.procedureDeterminantForm.valid) {
        let procedureDeterminant = new ProcedureDeterminant();
        procedureDeterminant.procedureCode = Form.getValue(
          this.procedureDeterminantForm,
          "procedureCode"
        );
        this.procedureDeterminantService
          .updateProcedureDeterminant(procedureDeterminant, procedureCode)
          .subscribe(
            (response) => {
              this.toastService.showToast('Record successfully updated', NgbToastType.Success);
              this.editProcedureDeterminant = false;
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
  saveProcedureDeterminant() {
    if (this.editProcedureDeterminant) {
      this.updateProcedureDeterminant(this.procedureDeterminant.procedureCode);
    } else {
      this.createProcedureDeterminant();
    }
  }
  deleteProcedureDeterminant(procedureCode: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.procedureDeterminantService
        .deleteProcedureDeterminant(procedureCode)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
          }
        );
    }
  }

  getOperator() {
    this.DddwDtlService.findByColumnNameAndDwname(
      "operator",
      "dw_proc_deter"
    ).subscribe((data) => {
      this.operators = data;
      var Options: any = [];
      this.operators.forEach(function (index: any) {
        Options.push({
          key: index.dddwDtlPrimaryKey.displayVal,
          value: index.dddwDtlPrimaryKey.dataVal,
        });
      });
      this.procedureFormConfig[0].options = Options;
    });
  }
  getProcedureDeterminant(procedureCode: string) {
    this.procedureDeterminantService
      .findByProcedureCode(procedureCode)
      .subscribe(
        (procedureDeterminant) => {
          this.procedureDeterminants = procedureDeterminant;
          this.makeDetermLineNo();
          this.populateDynamicForm(this.procedureDeterminants);
          this.getOperator();
        }
      );
  }
  makeDetermLineNo() {
    var length = this.procedureDeterminants.length;
    console.log(
      this.procedureDeterminants[length - 1].procedureDeterminantPrimaryKey
        .determLineNo
    );

    this.DetermLineNo =
      this.procedureDeterminants[length - 1].procedureDeterminantPrimaryKey
        .determLineNo + 1;
    console.log(this.DetermLineNo);
  }
  getProcedureDeterminants() {
    this.procedureDeterminantService.getProcedureDeterminants().subscribe(
      (procedureDeterminants) => {
        this.procedureDeterminants = procedureDeterminants;
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
        headerName: "Operator",
        field: "operator",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "From Value",
        field: "fromvalue",
        width: 200,
      },
      {
        headerName: "Thru Value",
        field: "thruvalue",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private DddwDtlService: DddwDtlService,
    private formBuilder: FormBuilder,
    private messageService:MessageMasterDtlService,
    private activeModal: NgbActiveModal,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private secColDetailService: SecColDetailService,
    private toastService: ToastService,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private procedureDeterminantService: ProcedureDeterminantService
  ) {}
  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.procedureDeterminantForm);
    this.createDataGrid();
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */

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
      }
    );
  }
  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.procedureDeterminantForm);
    this.createDataGrid();
    if (this.procedureCode) {
      setTimeout(() => {
        this.procedureDeterminantForm.patchValue({
          procedureCode: this.procedureCode,
        });
      }, 1000);
      this.getProcedureDeterminant(this.procedureCode);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.procedureDeterminantForm = this.formBuilder.group(
      {
        procedureCode: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  populateDynamicForm(procedureDeterminant: ProcedureDeterminant[]) {
    procedureDeterminant.forEach(
      (procedureDeterminant: ProcedureDeterminant) => {
        let mockConfig = JSON.parse(JSON.stringify(this.procedureFormConfig)); // make a copy of original config
        this.procedureFormConfig.forEach((field, index) => {
          if (field.name === ProcedureDeterminantFieldsNames.OPERATOR) {
            mockConfig[index].value = procedureDeterminant.operator;
          } else if (
            field.name === ProcedureDeterminantFieldsNames.FROM_VALUE
          ) {
            mockConfig[index].value = procedureDeterminant.fromValue;
          } else if (
            field.name === ProcedureDeterminantFieldsNames.THRU_VALUE
          ) {
            mockConfig[index].value = procedureDeterminant.thruValue;
          }
        });
        let formState: FormRow = new FormRow();
        formState.formFields = mockConfig;
        this.config = mockConfig;

        this.procedureDetState.push(formState); // add record
      }
    );
    this.procedureDetState = JSON.parse(JSON.stringify(this.procedureDetState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }
  populateProcedureDet(event: any, action: FORM_FIELD_ACTION_TYPES) {
    let procedureDeterminant = new ProcedureDeterminant();
    procedureDeterminant.procedureDeterminantPrimaryKey = {
      procedureCode: this.procedureCode,
      determLineNo: this.DetermLineNo,
    };
    procedureDeterminant.operator = event[0].value;
    procedureDeterminant.fromValue = event[1].value;
    procedureDeterminant.thruValue = event[2].value;
    procedureDeterminant.action = action;

    return procedureDeterminant;
  }

  addNewRow() {
    this.isAddNewRow = true;
  }
  OnSubmit() {
    if (this.CheckBeforeSave()){ this.isSaveForm = true;}
  }

  saveProDet(event: any) {
    if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
      let procedureDeterminants = new Array<ProcedureDeterminant>();
      const updatedRecords: FormRow[] = this.procedureDetState.filter(
        (record) => record.action
      );
      if (updatedRecords.length > 0) {
        this.procedureDetState.forEach((preStateRecord: FormRow, index) => {
          console.log(preStateRecord);
          if (preStateRecord.action) {
            let updatedRecord = event[index];
            const pair = Object.keys(updatedRecord).map((k) => ({
              key: k,
              value: updatedRecord[k],
            }));
            let groupPanel: ProcedureDeterminant = this.populateProcedureDet(
              pair,
              preStateRecord.action
            );
            groupPanel.procedureDeterminantPrimaryKey = {
              procedureCode: this.procedureCode,
              determLineNo: this.procedureDeterminants[index]
                .procedureDeterminantPrimaryKey.determLineNo,
            };

            procedureDeterminants.push(groupPanel);
          }
        });
      }
      const newRecords = event.slice(this.procedureDetState.length);
      newRecords.forEach((record) => {
        const pair = Object.keys(record).map((k) => ({
          key: k,
          value: record[k],
        }));
        procedureDeterminants.push(
          this.populateProcedureDet(pair, FORM_FIELD_ACTION_TYPES.ADD)
        );
      });

      // ('============================= api records with action update/add ================================');
      //  groupPanels     => variable contains all the updated records and new record to add updated by form-inline grid
      this.procedureDeterminantService
        .addUpdateProcedureCode(procedureDeterminants)
        .subscribe(
          (resp) => {
            this.toastService.showToast(
              "Group Panels updated Successfully",
              NgbToastType.Success
            );
          }
        );
    }
    this.isSaveForm = false;
  }

  onChangeDate(event: any) {
    console.log(event);
    let record = event.data;
    var dataIndex = event.index;
    const pair = Object.keys(record).map((k) => ({
      key: k,
      value: record[k],
    }));

    //thru value

    if (
      pair[2].value != this.procedureDetState[dataIndex]["formFields"][2].value
    ) {
      var ls_thru_value = pair[2].value;
      var ls_from_value = pair[1].value;

      if (ls_thru_value == "" || ls_thru_value == null) {
      } else if (Number(ls_thru_value) != NaN && Number(ls_from_value) != NaN) {
        if (!isNaN(Number(ls_thru_value)) && !isNaN(Number(ls_from_value))) {
        } else {
          this.ThruValueError = true;
          this.ShowError(22027, false);
          return;
        }
      } else {
        this.ThruValueError = true;
        this.ShowError(22027, false);
        return;
      }
      if (ls_thru_value.length >= 10) {
        this.FromValueError = true;
        this.showLenghtError(ls_from_value);
        return;
      }
      this.ThruValueError = false;
    }
    //for from val
    if (
      pair[1].value != this.procedureDetState[dataIndex]["formFields"][1].value
    ) {
      var ls_thru_value = pair[2].value;
      var ls_from_value = pair[1].value;
      alert(Number(ls_from_value));
      if (ls_thru_value == "" || ls_thru_value == null) {
      } else if (
        !isNaN(Number(ls_thru_value)) &&
        !isNaN(Number(ls_from_value))
      ) {
        if (Number(ls_from_value) <= Number(ls_thru_value)) {
        } else {
          this.FromValueError = true;
          this.ShowError(11057, false);
          return;
        }
      }
      if (ls_from_value.length >= 10) {
        this.FromValueError = true;
        this.showLenghtError(ls_from_value);
        return;
      }
      this.FromValueError = false;
    }
  }

   CheckBeforeSave(){
       if(this.FromValueError){
          this.ShowError(11057, false);
          return false;
       }
       if (this.ThruValueError) {
          this.ShowError(22027, false);
          return false;
       }
       return true;
   }

    showLenghtError(value:any){
          this.showPopUp(
            "Item"+ value + "does not pass the validation part",
            "Data Window Error"
          );
    }
    ShowError(number: any, check: any, value = "1") {
    if (check) {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText.replace("1@", value),
            "Procedure Code"
          );
        });
    } else {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText,
            "Procedure Code"
          );
        });
    }
  }
}
