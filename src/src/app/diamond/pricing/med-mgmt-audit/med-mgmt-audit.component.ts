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
import {  ProcedureCodeMasterArc } from "../../../api-models/index"
import {  ProcedureCodeMasterArcService } from "../../../api-services/procedure-code-master-arc.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { MessageMasterDtlService } from '../../../api-services/message-master-dtl.service';
import { DddwDtlService } from '../../../api-services/dddw-dtl.service';
import { ToastService } from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the MedMgmtAuditComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "medmgmtaudit",
  templateUrl: "./med-mgmt-audit.component.html",
  providers: [
    MessageMasterDtlService,
    DddwDtlService,
    ToastService,
    MessageMasterDtlService,
    ProcedureCodeMasterArcService,
  ],
})
export class MedMgmtAuditComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  medMgmtAuditForm: FormGroup;
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
  userTemplateId: string;
  secColDetails = new Array<SecColDetail>();
  @Input() procedureCode: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @Input() showIcon: boolean = false;

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

  editProcedureCodeMasterArc: boolean;
  procedureCodeMasterArc: ProcedureCodeMasterArc;
  procedureCodeMasterArcs: ProcedureCodeMasterArc[];
  createProcedureCodeMasterArc() {
    this.formValidation.validateForm();
    if (this.medMgmtAuditForm.valid) {
      let procedureCodeMasterArc = new ProcedureCodeMasterArc();
      this.procedureCodeMasterArcService
        .createProcedureCodeMasterArc(procedureCodeMasterArc)
        .subscribe(
          (response) => {
              this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.editProcedureCodeMasterArc = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateProcedureCodeMasterArc(seqProcChangeId: number) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.medMgmtAuditForm.valid) {
        let procedureCodeMasterArc = new ProcedureCodeMasterArc();
        this.procedureCodeMasterArcService
          .updateProcedureCodeMasterArc(procedureCodeMasterArc, seqProcChangeId)
          .subscribe(
            (response) => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
              this.editProcedureCodeMasterArc = false;
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
  saveProcedureCodeMasterArc() {
    if (this.editProcedureCodeMasterArc) {
      this.updateProcedureCodeMasterArc(
        this.procedureCodeMasterArc.seqProcChangeId
      );
    } else {
      this.createProcedureCodeMasterArc();
    }
  }
  deleteProcedureCodeMasterArc(seqProcChangeId: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.procedureCodeMasterArcService
        .deleteProcedureCodeMasterArc(seqProcChangeId)
        .subscribe(
          (response) => {
              this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
          }
        );
    }
  }
  getProcedureCodeMasterArc(seqProcChangeId: number) {
    this.procedureCodeMasterArcService
      .getProcedureCodeMasterArc(seqProcChangeId)
      .subscribe(
        (procedureCodeMasterArc) => {
          this.procedureCodeMasterArc = procedureCodeMasterArc;
          this.medMgmtAuditForm.patchValue({});
        }
      );
  }
  getProcedureCodeMasterArcs() {
    this.procedureCodeMasterArcService
      .findByProcedureCode(this.procedureCode)
      .subscribe(
        (procedureCodeMasterArcs) => {
            if(procedureCodeMasterArcs.length>=0){
          this.procedureCodeMasterArcs = procedureCodeMasterArcs;
          this.dataGridGridOptions.api.setRowData(this.procedureCodeMasterArcs);
            }
            else{
 this.showPopUp(
   "A Valid Procedure Code has not been selected. ",
   "Med Mgmt Audit "
 );
            }
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
        headerName: "Med Mgmt",
        field: "userDefined1",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Med Mgmt Eff Dt",
        field: "userDate1",
        width: 200,
      },
      {
        headerName: "Insert Date Time",
        field: "insertDatetime",
        width: 200,
      },
      {
        headerName: "Insert User",
        field: "insertUser",
        width: 200,
      },
      {
        headerName: "Change Date",
        field: "changeDateTime",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private toastService: ToastService,
    private secUserService: SecUserService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private activeModal:NgbActiveModal,
    private secColDetailService: SecColDetailService,
    private procedureCodeMasterArcService: ProcedureCodeMasterArcService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.medMgmtAuditForm);
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
    this.formValidation = new FormValidation(this.medMgmtAuditForm);
    this.createDataGrid();
    if (this.procedureCode) {
      setTimeout(() => {
        this.medMgmtAuditForm.patchValue({
          procedureCode: this.procedureCode,
        });
      }, 1000);
      this.getProcedureCodeMasterArcs();
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.medMgmtAuditForm = this.formBuilder.group(
      {
        procedureCode: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
