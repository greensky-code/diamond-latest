/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component, Inject,
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
} from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DatePickerConfig, DatePickerModel } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import {
  AllowIn,
  KeyboardShortcutsComponent,
  ShortcutEventOutput,
  ShortcutInput,
} from "ng-keyboard-shortcuts";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {
  ClmDtlAuthProcLnkHdr,
  MessageMasterDtl,
  ProcSpCheckCDAPL,
  ReasonCodeMaster,
  SystemCodes,
} from '../../../api-models';
import { ClmDtlAuthProcLnkHdrService } from "../../../api-services/clm-dtl-auth-proc-lnk-hdr.service";
import { ClmDtlAuthProcLnkDtl } from '../../../api-models';
import { ClmDtlAuthProcLnkDtlService } from "../../../api-services/clm-dtl-auth-proc-lnk-dtl.service";
import {
  AlertMessage,
  AlertMessageService,
} from '../../../shared/components/alert-message';
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecWin } from '../../../api-models';
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecurityService } from "../../../shared/services/security.service";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecUserService } from "../../../api-services/security/sec-user.service";
import { SecUser } from "../../../api-models/security/sec-user.model";
import {
  AuthProcedureRangeService,
  ClmDtlAuthProcLnkRuleService,
  DddwDtlService,
  MessageMasterDtlService,
  ReasonCodeMasterService,
  SystemCodesService,
} from "../../../api-services";
import {
  FormField,
  FormRow,
  FORM_FIELD_ACTION_TYPES,
  Menu,
  SearchModel,
} from "../../../shared/models/models";
import { ClaimDetAuthLookup } from "../../../shared/lookup/claim-det-auth-link-lookup";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { LineOFBLookup } from "../../../shared/lookup/line-of-business-lookup";
import { AuthTypeLookup } from "../../../shared/lookup/auth-type-lookup";
import { ToastService } from "../../../shared/services/toast.service";
import { NgbToastType } from "ngb-toast";
import {
  ClaimAuthProcLinkConfig,
  ClaimAuthProcLinkNames,
} from "../../../shared/models/constants";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import { ReasonCodeMasterCustomLookup, ReasonCodeMasterLookup } from "../../../shared/lookup/reason-code-master-lookup";
import { AuthProcedureRangeLookup } from "../../../shared/lookup/auth_procedure_range_lookup";
import {
  getClaimDetailAuthProcLinkShortcutKeys,
  getClaimDetailAuthProcRulesShortcutKeys,
} from "../../../shared/services/shared.service";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the ClaimAuthProcLinkComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "claimauthproclink",
  templateUrl: "./claim-auth-proc-link.component.html",
  providers: [
    ClmDtlAuthProcLnkDtlService,
    ClmDtlAuthProcLnkHdrService,
    SystemCodesService,
    DddwDtlService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    AuthProcedureRangeService,
    ClmDtlAuthProcLnkRuleService,
    DatePipe,
  ],
})
export class ClaimAuthProcLinkComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  claimAuthProcLinkForm: FormGroup;
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
  claimSearchModal = new SearchModel(
    "clmdtlauthproclnkhdrs/lookup",
    ClaimDetAuthLookup.CLAIM_DET_AUTH_ALL,
    ClaimDetAuthLookup.CLAIM_DET_AUTH_DEFAULT,
    []
  );

    modalRef: NgbModalRef;

  @Input() showIcon: boolean = false;

  public shortcuts: ShortcutInput[] = [];

  claimAuthProcDtlState: Array<FormRow> = [];
    screenCloseRequest: Boolean = false;
    valueChanged: Boolean = false;
  LobSearchModal = new SearchModel(
    "linesofbusinessmaster/LOB/lookup",
    LineOFBLookup.LINE_OF_B_ALL,
    LineOFBLookup.LINE_OF_B_DEFAULT,
    []
  );

  AuthTypeSearchModal = new SearchModel(
    "authtypemasters/AuthType/lookup",
    AuthTypeLookup.Auth_Type_ALL,
    AuthTypeLookup.Auth_Type_DEFAULT,
    []
  );

  ReasonCodeMasterSearchModal = new SearchModel(
    "reasoncodemasters/lookupAll",
    ReasonCodeMasterCustomLookup.REASONCODE_MASTER_ALL,
    ReasonCodeMasterCustomLookup.REASONCODE_MASTER_DEFAULT,
    []
  );

  authProcRangeIdSearchModal = new SearchModel(
    "authprocedureranges/lookup",
    AuthProcedureRangeLookup.AUTHPROCEDURE_RANGE_ALL,
    AuthProcedureRangeLookup.AUTHPROCEDURE_RANGE_DEFAULT,
    []
  );

  public menu: Menu[] = [];

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  errorLob: boolean;
  errorAuthType: boolean;
  AuthType: any;
  Lob: any;
  AuthPrice: SystemCodes[];
  action: SystemCodes[];
  reasonCodes: ReasonCodeMaster[];
  AuthProc;
  claimAuthProcDtlConfig = ClaimAuthProcLinkConfig;
  config: any;
  isAddNewRow: boolean;
  saveForm: boolean;
  effectiveDate: any;
  seqCdaplHdr: number;
  errorReasonCode: boolean;
  errorRangeId: boolean;
  errorRuleId: boolean;
  showEffecitvedate: boolean;
  errorShowTermDate: boolean;
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

  editClmDtlAuthProcLnkHdr: boolean;
  clmDtlAuthProcLnkHdr: ClmDtlAuthProcLnkHdr;
  clmDtlAuthProcLnkHdrs: ClmDtlAuthProcLnkHdr[];
  editClmDtlAuthProcLnkDtl: boolean;
  clmDtlAuthProcLnkDtl: ClmDtlAuthProcLnkDtl;
  clmDtlAuthProcLnkDtls: ClmDtlAuthProcLnkDtl[];
  createClmDtlAuthProcLnkHdr() {
    this.formValidation.validateForm();
    if (this.claimAuthProcLinkForm.valid) {
      let clmDtlAuthProcLnkHdr = new ClmDtlAuthProcLnkHdr();
      clmDtlAuthProcLnkHdr.lineOfBusiness = this.Lob;
      clmDtlAuthProcLnkHdr.authType = this.AuthType;
      clmDtlAuthProcLnkHdr.seqCdaplHdr = 0;
      clmDtlAuthProcLnkHdr.authType = Form.getValue(
        this.claimAuthProcLinkForm,
        "authType"
      );
      clmDtlAuthProcLnkHdr.effectiveDate = this.datePipe.transform(
        Form.getDatePickerValue(this.claimAuthProcLinkForm, "effectiveDate"),
        "yyyy-MM-dd"
      );
      clmDtlAuthProcLnkHdr.termDate = this.datePipe.transform(Form.getDatePickerValue(
        this.claimAuthProcLinkForm,
        "termDate"),
        "yyyy-MM-dd"
      );
      clmDtlAuthProcLnkHdr.description = Form.getValue(
        this.claimAuthProcLinkForm,
        "description"
      );
      clmDtlAuthProcLnkHdr.tieBrkOnPrice = Form.getValue(
        this.claimAuthProcLinkForm,
        "tieBreakerOnAuthPrice"
      );
      clmDtlAuthProcLnkHdr.tieBrkOnProc = Form.getValue(
        this.claimAuthProcLinkForm,
        "tieBreakerOnAuthProc"
      );
      var mtchOnDtlForInp;
      if (
        Form.getValue(
          this.claimAuthProcLinkForm,
          "matchOnDetailsForInpatient"
        ) == true
      ) {
        mtchOnDtlForInp = "Y";
      } else {
        mtchOnDtlForInp = "N";
      }
      clmDtlAuthProcLnkHdr.mtchOnDtlForInp = mtchOnDtlForInp;
      clmDtlAuthProcLnkHdr.exceedAmtReason = Form.getValue(
        this.claimAuthProcLinkForm,
        "actionTbReason"
      );
      this.clmDtlAuthProcLnkHdrService
        .createClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully created.",
              NgbToastType.Success
            );
            this.editClmDtlAuthProcLnkHdr = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close()
              }, 2000);
            }
            this.valueChanged = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateClmDtlAuthProcLnkHdr(seqCdaplHdr: number) {
    //  if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.claimAuthProcLinkForm.valid) {
      let clmDtlAuthProcLnkHdr = new ClmDtlAuthProcLnkHdr();
      clmDtlAuthProcLnkHdr.seqCdaplHdr = this.seqCdaplHdr;
      clmDtlAuthProcLnkHdr.lineOfBusiness = this.Lob;
      clmDtlAuthProcLnkHdr.authType = this.AuthType;
      clmDtlAuthProcLnkHdr.authType = Form.getValue(
        this.claimAuthProcLinkForm,
        "authType"
      );
      clmDtlAuthProcLnkHdr.effectiveDate = Form.getDatePickerValue(
        this.claimAuthProcLinkForm,
        "effectiveDate"
      );
      clmDtlAuthProcLnkHdr.termDate = Form.getDatePickerValue(
        this.claimAuthProcLinkForm,
        "termDate"
      );
      clmDtlAuthProcLnkHdr.description = Form.getValue(
        this.claimAuthProcLinkForm,
        "description"
      );
      clmDtlAuthProcLnkHdr.tieBrkOnPrice = Form.getValue(
        this.claimAuthProcLinkForm,
        "tieBreakerOnAuthPrice"
      );
          clmDtlAuthProcLnkHdr.tieBrkOnProc = Form.getValue(
            this.claimAuthProcLinkForm,
            "tieBreakerOnAuthProc"
          );
       clmDtlAuthProcLnkHdr.exceedDaysAction = Form.getValue(
         this.claimAuthProcLinkForm,
         "action001"
       );
      clmDtlAuthProcLnkHdr.exceedDaysReason = Form.getValue(
        this.claimAuthProcLinkForm,
        "reason001"
      );

       clmDtlAuthProcLnkHdr.exceedAmtAction = Form.getValue(
         this.claimAuthProcLinkForm,
         "actionTbReason"
       );
       clmDtlAuthProcLnkHdr.exceedAmtReason = Form.getValue(
         this.claimAuthProcLinkForm,
         "reason0022"
       );
         clmDtlAuthProcLnkHdr.modifierUsedAction = Form.getValue(
           this.claimAuthProcLinkForm,
           "action002"
         );
         clmDtlAuthProcLnkHdr.modifierUsedReason = Form.getValue(
           this.claimAuthProcLinkForm,
           "reason002"
         );

         clmDtlAuthProcLnkHdr.mtchOnDtlForInp = Form.getValue(
           this.claimAuthProcLinkForm,
           "matchOnDetailsForInpatient"
         );

      var mtchOnDtlForInp;
      if (
        Form.getValue(
          this.claimAuthProcLinkForm,
          "matchOnDetailsForInpatient"
        ) == true
      ) {
        mtchOnDtlForInp = "Y";
      } else {
        mtchOnDtlForInp = "N";
      }
      clmDtlAuthProcLnkHdr.mtchOnDtlForInp = mtchOnDtlForInp;

      this.clmDtlAuthProcLnkHdrService
        .updateClmDtlAuthProcLnkHdr(clmDtlAuthProcLnkHdr, seqCdaplHdr)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully updated.",
              NgbToastType.Success
            );
            this.editClmDtlAuthProcLnkHdr = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close()
              }, 2000)
            }
            this.valueChanged = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }
  saveClmDtlAuthProcLnkHdr() {
    if (this.editClmDtlAuthProcLnkHdr) {
      this.updateClmDtlAuthProcLnkHdr(this.seqCdaplHdr);
    } else {
      this.createClmDtlAuthProcLnkHdr();
    }
  }
  deleteClmDtlAuthProcLnkHdr(seqCdaplHdr: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.clmDtlAuthProcLnkHdrService
        .deleteClmDtlAuthProcLnkHdr(seqCdaplHdr)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
          }
        );
    }
  }
  getClmDtlAuthProcLnkHdr(seqCdaplHdr: number) {
    this.clmDtlAuthProcLnkHdrService
      .getClmDtlAuthProcLnkHdr(seqCdaplHdr)
      .subscribe(
        (clmDtlAuthProcLnkHdr) => {
          var mtchOnDtlForInp;
          this.clmDtlAuthProcLnkHdr = clmDtlAuthProcLnkHdr;
          if (this.clmDtlAuthProcLnkHdr.mtchOnDtlForInp == "N") {
            mtchOnDtlForInp = false;
          } else {
            mtchOnDtlForInp = true;
          }
          this.claimAuthProcLinkForm.patchValue({
            authType: this.clmDtlAuthProcLnkHdr.authType,
            effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
              this.clmDtlAuthProcLnkHdr.effectiveDate
            ),
            termDate: this.dateFormatPipe.defaultDisplayDateFormat(
              this.clmDtlAuthProcLnkHdr.termDate
            ),
            description: this.clmDtlAuthProcLnkHdr.description,
            tieBreakerOnAuthPrice: this.clmDtlAuthProcLnkHdr.tieBrkOnPrice,
            tieBreakerOnAuthProc: this.clmDtlAuthProcLnkHdr.tieBrkOnProc,
            matchOnDetailsForInpatient: mtchOnDtlForInp,
            actionTbReason: this.clmDtlAuthProcLnkHdr.exceedAmtReason,
          });
        }
      );
  }
  getClmDtlAuthProcLnkHdrs() {
    this.clmDtlAuthProcLnkHdrService.getClmDtlAuthProcLnkHdrs().subscribe(
      (clmDtlAuthProcLnkHdrs) => {
        this.clmDtlAuthProcLnkHdrs = clmDtlAuthProcLnkHdrs;
      }
    );
  }
  createClmDtlAuthProcLnkDtl() {
    this.formValidation.validateForm();
    if (this.claimAuthProcLinkForm.valid) {
      let clmDtlAuthProcLnkDtl = new ClmDtlAuthProcLnkDtl();
      clmDtlAuthProcLnkDtl.effectiveDate = Form.getValue(
        this.claimAuthProcLinkForm,
        "effectiveDate"
      );
      clmDtlAuthProcLnkDtl.termDate = Form.getValue(
        this.claimAuthProcLinkForm,
        "termDate"
      );
      this.clmDtlAuthProcLnkDtlService
        .createClmDtlAuthProcLnkDtl(clmDtlAuthProcLnkDtl)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.editClmDtlAuthProcLnkDtl = false;
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  updateClmDtlAuthProcLnkDtl(seqCdaplDtl: number) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.claimAuthProcLinkForm.valid) {
        let clmDtlAuthProcLnkDtl = new ClmDtlAuthProcLnkDtl();
        clmDtlAuthProcLnkDtl.effectiveDate = Form.getValue(
          this.claimAuthProcLinkForm,
          "effectiveDate"
        );
        clmDtlAuthProcLnkDtl.termDate = Form.getValue(
          this.claimAuthProcLinkForm,
          "termDate"
        );
        this.clmDtlAuthProcLnkDtlService
          .updateClmDtlAuthProcLnkDtl(clmDtlAuthProcLnkDtl, seqCdaplDtl)
          .subscribe(
            (response) => {
              this.toastService.showToast('Record successfully updated', NgbToastType.Success);
              this.editClmDtlAuthProcLnkDtl = false;
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
  saveClmDtlAuthProcLnkDtl() {
    if (this.editClmDtlAuthProcLnkDtl) {
      this.updateClmDtlAuthProcLnkDtl(this.clmDtlAuthProcLnkDtl.seqCdaplDtl);
    } else {
      this.createClmDtlAuthProcLnkDtl();
    }
  }
  deleteClmDtlAuthProcLnkDtl(seqCdaplDtl: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.clmDtlAuthProcLnkDtlService
        .deleteClmDtlAuthProcLnkDtl(seqCdaplDtl)
        .subscribe(
          (response) => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
          }
        );
    }
  }
  getClmDtlAuthProcLnkDtl(seqCdaplHdr: number) {
    this.clmDtlAuthProcLnkDtlService.findbyseqcdaplhdr(seqCdaplHdr).subscribe(
      (clmDtlAuthProcLnkDtl) => {
        this.clmDtlAuthProcLnkDtls = clmDtlAuthProcLnkDtl;
        this.populateDynamicForm(this.clmDtlAuthProcLnkDtls);
        this.getActionsForDynamic();
      }
    );
  }
  getClmDtlAuthProcLnkDtls() {
    this.clmDtlAuthProcLnkDtlService.getClmDtlAuthProcLnkDtls().subscribe(
      (clmDtlAuthProcLnkDtls) => {
        this.clmDtlAuthProcLnkDtls = clmDtlAuthProcLnkDtls;
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
        headerName: "Process Order",
        field: "processingorder",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Range ID",
        field: "authprocrangeid",
        width: 200,
      },
      {
        headerName: "Incld all Rng rows",
        field: "includeallranges",
        width: 200,
      },
      {
        headerName: "Rule ID",
        field: "ruleid",
        width: 200,
      },
      {
        headerName: "Pay Action",
        field: "payaction",
        width: 200,
      },
      {
        headerName: "Allowed Reason",
        field: "allowedreason",
        width: 200,
      },
      {
        headerName: "Hld/Dny Reason",
        field: "hlddenyreason",
        width: 200,
      },
      {
        headerName: "Effective Date",
        field: "effectivedate",
        width: 200,
      },
      {
        headerName: "Term Date",
        field: "termdate",
        width: 200,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private authprocedureRange: AuthProcedureRangeService,
    private mask: Mask,
    private datePipe: DatePipe,
    private ClmDtlAuthProcLnkRuleService: ClmDtlAuthProcLnkRuleService,
    private reasonCodeMasterService: ReasonCodeMasterService,
    private DatePipe: DatePipe,
    private router: Router,
    private messageService: MessageMasterDtlService,
    private systemCodesService: SystemCodesService,
    private dddwDtlService: DddwDtlService,
    private toastService: ToastService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private clmDtlAuthProcLnkHdrService: ClmDtlAuthProcLnkHdrService,
    private clmDtlAuthProcLnkDtlService: ClmDtlAuthProcLnkDtlService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.claimAuthProcLinkForm);
    this.createDataGrid();
    // this.activeModal.keydownEvents().subscribe()
      this.claimAuthProcLinkForm.valueChanges.subscribe(() => {
        this.valueChanged = true;
      })
  }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Claim Detail Auth Proc Link')
            })
        }
        else {
            this.activeModal.close()
        }
    };

    ngAfterViewInit(): void {
    this.shortcuts.push(...getClaimDetailAuthProcLinkShortcutKeys(this));
    this.cdr.detectChanges();
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

  initializeComponentState(): void {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.claimAuthProcLinkForm);
    this.createDataGrid();
    this.getAction();
    // this.getReason();
    this.getTieBrakerOnAuthPrice();
    this.getTieBrakerOnAuthProc();
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
  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.claimAuthProcLinkForm = this.formBuilder.group(
      {
        lob: ["", { updateOn: "blur", validators: [] }],
        authType: ["", { updateOn: "blur", validators: [] }],
        effectiveDate: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        termDate: ["", { updateOn: "blur", validators: [] }],
        description: ["", { updateOn: "blur", validators: [] }],
        tieBreakerOnAuthPrice: ["", { updateOn: "blur", validators: [] }],
        tieBreakerOnAuthProc: ["", { updateOn: "blur", validators: [] }],
        matchOnDetailsForInpatient: ["", { updateOn: "blur", validators: [] }],
        action001: ["", { updateOn: "blur", validators: [] }],
        reason001: ["", { updateOn: "blur", validators: [] }],
        actionTbReason: ["", { updateOn: "blur", validators: [] }],
        reason0022: ["", { updateOn: "blur", validators: [] }],
        action002: ["", { updateOn: "blur", validators: [] }],
        reason002: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  onChangeLob(event: any) {
    this.clmDtlAuthProcLnkHdrService
      .checkLob(event.target.value)
      .subscribe((data) => {
        if (data.length > 0) {
          this.Lob = event.target.value;
          this.errorLob = false;
        } else {
          this.ShowError(27147, false);
          this.errorLob = true;
        }
      });
  }
  onChangeAuthType(event: any) {
    this.clmDtlAuthProcLnkHdrService
      .checkAuthType(event.target.value)
      .subscribe((data) => {
        if (data.length > 0) {
          this.errorAuthType = false;
          this.AuthType = event.target.value;
          if (!this.errorLob) {
            if (this.Lob) {
              this.OpenLookUpOnChange();
            } else {
              this.errorLob = true;
              this.ShowError(13071, false); //when lob is empty
            }
          } else {
            if (this.Lob) {
              this.OpenLookUpOnChange();
            } else {
              this.errorLob = true;
              this.ShowError(13071, false); //when lob is empty
            }
          }
        } else {
          this.ShowError(71917, false);
          this.errorAuthType = true;
        }
      });
  }

  getByLineOfBusinessAndAuthType(
    lineOfBusiness: any,
    authType: any,
    effectiveDate: any
  ) {
    // var lineOfBusiness = this.claimAuthProcLinkForm.get("lob").value;
    //var authType = this.claimAuthProcLinkForm.get("authType").value;
    //var effectiveDate = this.claimAuthProcLinkForm.get("effectiveDate").value;
    this.Lob = lineOfBusiness;
    this.AuthType = authType;
    this.effectiveDate = effectiveDate;
    setTimeout(() => {
      this.clmDtlAuthProcLnkHdrService
        .getByLineOfBusinessAndAuthType(lineOfBusiness, authType)
        .subscribe((data) => {
          this.clmDtlAuthProcLnkHdrs = data;
          this.clmDtlAuthProcLnkHdrs.filter(
            (data) => data.effectiveDate == effectiveDate
          );
          if (this.clmDtlAuthProcLnkHdrs.length > 0) {
            var clmDtlAuthProcLnkHdrs = this.clmDtlAuthProcLnkHdrs[0];
            this.seqCdaplHdr = clmDtlAuthProcLnkHdrs.seqCdaplHdr;
            var mtchOnDtlForInp;
            if (clmDtlAuthProcLnkHdrs.mtchOnDtlForInp == "Y") {
              mtchOnDtlForInp = true;
            } else {
              mtchOnDtlForInp = false;
            }
            this.claimAuthProcLinkForm.patchValue({
              termDate: this.dateFormatPipe.defaultDisplayDateFormat(
                clmDtlAuthProcLnkHdrs.termDate
              ),
              effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
                clmDtlAuthProcLnkHdrs.effectiveDate
              ),
              description: clmDtlAuthProcLnkHdrs.description,
              tieBreakerOnAuthPrice: clmDtlAuthProcLnkHdrs.tieBrkOnPrice,
              tieBreakerOnAuthProc: clmDtlAuthProcLnkHdrs.tieBrkOnProc,
              matchOnDetailsForInpatient: mtchOnDtlForInp,
              action001: clmDtlAuthProcLnkHdrs.exceedDaysAction,
              reason001: clmDtlAuthProcLnkHdrs.exceedDaysReason,
              actionTbReason: clmDtlAuthProcLnkHdrs.exceedAmtAction,
              reason0022: clmDtlAuthProcLnkHdrs.exceedAmtReason,
              action002: clmDtlAuthProcLnkHdrs.modifierUsedAction,
              reason002: clmDtlAuthProcLnkHdrs.modifierUsedReason,
            });
            this.editClmDtlAuthProcLnkHdr = true;
            this.getClmDtlAuthProcLnkDtl(clmDtlAuthProcLnkHdrs.seqCdaplHdr);
          }
        });
    }, 1000);
    this.onEffectiveDateChange();
  }

  ShowError(number: any, check: any, value = "1") {
    if (check) {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText.replace("@1", value),
            "Claim Auth Proc Link"
          );
        });
    } else {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText,
            "Claim Auth Proc Link"
          );
        });
    }
  }
  onClaimAuthProc(event) {
    // if (event.key === "F5") {
    event.preventDefault();
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.claimSearchModal;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.claimAuthProcLinkForm.get("lob").setValue(res.lineOfBusiness);
        this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
        this.getByLineOfBusinessAndAuthType(
          res.lineOfBusiness,
          res.authType,
          res.effectiveDate
        );
      }
    });
    // }
  }

  OpenLookUpOnChange() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.claimSearchModal;
    this.claimSearchModal.searchOption = [
      {
        LINE_OF_BUSINESS: this.Lob,
        AUTH_TYPE: this.AuthType,
      },
    ];
    ref.componentInstance.searchModel = this.claimSearchModal;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.claimAuthProcLinkForm.get("lob").setValue(res.lineOfBusiness);
        this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
        this.getByLineOfBusinessAndAuthType(
          res.lineOfBusiness,
          res.authType,
          res.effectiveDate
        );

        //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
      }
    });
  }

  ShowRecords() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.claimSearchModal;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.claimAuthProcLinkForm.get("lob").setValue(res.lineOfBusiness);
        this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
        this.getByLineOfBusinessAndAuthType(
          res.lineOfBusiness,
          res.authType,
          res.effectiveDate
        );
        //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
      }
    });
  }

  LookupLOB(event) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.LobSearchModal;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          this.Lob = res.lineOfBusiness;
          this.claimAuthProcLinkForm.get("lob").setValue(res.lineOfBusiness);
          //  this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }
  }
  LookupReason(event: any, reason: any,action) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      alert(this.claimAuthProcLinkForm.get(action).value);
      if (this.claimAuthProcLinkForm.get(action).value == "H") {
        this.ReasonCodeMasterSearchModal.searchOption = [
          {
            REASON_CODE_TYPE: "HD",
          },
        ];
      } else if (this.claimAuthProcLinkForm.get(action).value == "D") {
        this.ReasonCodeMasterSearchModal.searchOption = [
          {
            REASON_CODE_TYPE: "NC",
          },
        ];
      }
      ref.componentInstance.searchModel = this.ReasonCodeMasterSearchModal;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          console.log(res);
          this.claimAuthProcLinkForm.get(reason).setValue(res.reasonCode);
          //  this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }
  }

  LookupAuthType(event) {
    if (event.key === "F5") {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.AuthTypeSearchModal;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          // this.Lob = res.authType;
          this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
          if (this.Lob) {
            this.OpenLookUpOnChange();
          } else {
            this.ShowError(13071, false);
          }
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }
  }
  //DROPDOWNS

  getTieBrakerOnAuthPrice() {
    this.systemCodesService
      .getSystemCodesByLangAndtype("TIEBRKONPRIC", "0")
      .subscribe(
        (systemCodes) => {
          this.AuthPrice = systemCodes;
        }
      );
  }

  getTieBrakerOnAuthProc() {
    this.systemCodesService
      .getSystemCodesByLangAndtype("TIEBRKONPROC", "0")
      .subscribe(
        (systemCodes) => {
          this.AuthProc = systemCodes;
        }
      );
  }

  getAction() {
    this.systemCodesService
      .getSystemCodesByLangAndtype("CDAPLHDRACTN", "0")
      .subscribe(
        (systemCodes) => {
          this.action = systemCodes;
        }
      );
  }

  getPayAction() {
    this.systemCodesService
      .getSystemCodesByLangAndtype("CDAPLPAYACTN", "0")
      .subscribe(
        (systemCodes) => {
          this.action = systemCodes;
        }
      );
  }

  getReason() {
    this.reasonCodeMasterService.getReasonCodeMasters().subscribe(
      (reasonCodes) => {
        this.reasonCodes = reasonCodes;
      }
    );
  }

  populateDynamicForm(claimAuthProcDtl: ClmDtlAuthProcLnkDtl[]) {
    claimAuthProcDtl.forEach((claimAuthProcDtl: ClmDtlAuthProcLnkDtl) => {
      let mockConfig = JSON.parse(JSON.stringify(this.claimAuthProcDtlConfig)); // make a copy of original config
      this.claimAuthProcDtlConfig.forEach((field, index) => {
        if (field.name === ClaimAuthProcLinkNames.PROCESS_ORDER) {
          mockConfig[index].value = claimAuthProcDtl.processingOrder;
          console.log(claimAuthProcDtl.processingOrder);
          if (claimAuthProcDtl.processingOrder == 9999) {
            mockConfig[index].disabled = true;
          }
        } else if (field.name === ClaimAuthProcLinkNames.RANGE_ID) {
          mockConfig[index].value = claimAuthProcDtl.authProcRangeId;
          if (claimAuthProcDtl.processingOrder == 9999) {
            mockConfig[index].disabled = true;
          }
          mockConfig[index].searchModel = this.authProcRangeIdSearchModal;
        } else if (field.name === ClaimAuthProcLinkNames.INC_ALL_RNG_ROWS) {
          var includeAllRanges;
          if (claimAuthProcDtl.includeAllRanges == "Y") {
            includeAllRanges = true;
          } else {
            includeAllRanges = false;
          }
          mockConfig[index].value = includeAllRanges;
          if (claimAuthProcDtl.processingOrder == 9999) {
            mockConfig[index].disabled = true;
          }
        } else if (field.name === ClaimAuthProcLinkNames.RULE_ID) {
          mockConfig[index].value = claimAuthProcDtl.ruleId;
          if (claimAuthProcDtl.processingOrder == 9999) {
            mockConfig[index].disabled = true;
          }
        } else if (field.name === ClaimAuthProcLinkNames.PAY_ACTION) {
          mockConfig[index].value = claimAuthProcDtl.payAction;
        } else if (field.name === ClaimAuthProcLinkNames.ALLOWED_REASON) {
          mockConfig[index].value = claimAuthProcDtl.allowedReason;
          this.ReasonCodeMasterSearchModal.searchOption = [
            {
              REASON_CODE_TYPE: "AL",
            },
          ];
          mockConfig[index].searchModel = this.ReasonCodeMasterSearchModal;
        } else if (field.name === ClaimAuthProcLinkNames.HOLD_DNY_REASON) {
          mockConfig[index].value = claimAuthProcDtl.hldDenyReason;
          if (
            claimAuthProcDtl.payAction == 4 ||
            claimAuthProcDtl.payAction == 5 ||
            claimAuthProcDtl.payAction == 6 ||
            claimAuthProcDtl.payAction == 9 ||
            claimAuthProcDtl.payAction == 8
          ) {
            mockConfig[index].disabled = false;
          } else {
            mockConfig[index].disabled = true;
          }
              this.ReasonCodeMasterSearchModal.searchOption = [
                {
                  REASON_CODE_TYPE: "HD",
                },
              ];
              mockConfig[index].searchModel = this.ReasonCodeMasterSearchModal;
        } else if (field.name === ClaimAuthProcLinkNames.EFFECTIVE_DATE) {
          mockConfig[index].value = claimAuthProcDtl.effectiveDate;
        } else if (field.name === ClaimAuthProcLinkNames.TERM_DATE) {
          mockConfig[index].value = claimAuthProcDtl.termDate;
        }
      });
      let formState: FormRow = new FormRow();
      formState.formFields = mockConfig;
      // formState.id = {
      //   seqGroupId: groupPanel.groupPanelPrimaryKey.seqGroupId,
      //   id: groupPanel.groupPanelPrimaryKey.seqGroupPanel,
      // };
      this.config = mockConfig;
      console.log(this.config);

      this.claimAuthProcDtlState.push(formState); // add record
    });
    this.claimAuthProcDtlState = JSON.parse(
      JSON.stringify(this.claimAuthProcDtlState)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }
  populateProcessingRules(event: any, action: FORM_FIELD_ACTION_TYPES) {
    let claimAuthProcDtl = new ClmDtlAuthProcLnkDtl();

    claimAuthProcDtl.processingOrder = event[0].value;
    claimAuthProcDtl.authProcRangeId = event[1].value;
    if (event[2].value) {
      claimAuthProcDtl.includeAllRanges = "Y";
    } else {
      claimAuthProcDtl.includeAllRanges = "N";
    }
    claimAuthProcDtl.ruleId = event[3].value;
    claimAuthProcDtl.payAction = event[4].value;
    claimAuthProcDtl.allowedReason = event[5].value;
    claimAuthProcDtl.hldDenyReason = event[6].value;
    if (event[7].value) {
      claimAuthProcDtl.effectiveDate = this.transformDate(event[7].value);
    }
    if (event[8].value) {
      claimAuthProcDtl.termDate = this.transformDate(event[8].value);
    }
    claimAuthProcDtl.seqCdaplHdr = this.seqCdaplHdr;
    claimAuthProcDtl.seqCdaplDtl = 0;

    claimAuthProcDtl.action = action;
    return claimAuthProcDtl;
  }
  transformDate(date: any) {
    var newDate =
      date.singleDate.date.month +
      "/" +
      date.singleDate.date.day +
      "/" +
      date.singleDate.date.year;
    var newDate_ = new Date(newDate);
    return this.DatePipe.transform(newDate_, "yyyy-MM-dd");
  }

  saveClaimAuthProc(event: any) {
    // if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
    let claimAuths = new Array<ClmDtlAuthProcLnkDtl>();
    const updatedRecords: FormRow[] = this.claimAuthProcDtlState.filter(
      (record) => record.action
    );
    if (updatedRecords.length > 0) {
      this.claimAuthProcDtlState.forEach((preStateRecord: FormRow, index) => {
        console.log(preStateRecord);
        if (preStateRecord.action) {
          let updatedRecord = event[index];
          const pair = Object.keys(updatedRecord).map((k) => ({
            key: k,
            value: updatedRecord[k],
          }));
          let claimAuth: ClmDtlAuthProcLnkDtl = this.populateProcessingRules(
            pair,
            preStateRecord.action
          );
          claimAuth.seqCdaplDtl = this.clmDtlAuthProcLnkDtls[index].seqCdaplDtl;

          //   preStateRecord.id.id;
          // groupPanel.groupPanelPrimaryKey.seqGroupId = this.seqGroupId;
          claimAuths.push(claimAuth);
        }
      });
    }
    const newRecords = event.slice(this.claimAuthProcDtlState.length);
    newRecords.forEach((record) => {
      const pair = Object.keys(record).map((k) => ({
        key: k,
        value: record[k],
      }));
      claimAuths.push(
        this.populateProcessingRules(pair, FORM_FIELD_ACTION_TYPES.ADD)
      );
    });
    // ('============================= api records with action update/add ================================');
    //  groupPanels     => variable contains all the updated records and new record to add updated by form-inline grid
    this.clmDtlAuthProcLnkDtlService.updateClaimsRecord(claimAuths).subscribe(
      (resp) => {
        this.toastService.showToast(
          "Processing Rules updated Successfully",
          NgbToastType.Success
        );
      }
    );
    //}
  }



  //Validations

  createNewRecord() {
    this.editClmDtlAuthProcLnkHdr = false;
    this.resetSomeFields();
  }
  resetSomeFields() {
    this.claimAuthProcLinkForm.get("termDate").reset();
    this.claimAuthProcLinkForm.get("effectiveDate").reset();
    this.claimAuthProcLinkForm.get("description").reset();
    this.claimAuthProcLinkForm.get("tieBreakerOnAuthPrice").reset();
    this.claimAuthProcLinkForm.get("tieBreakerOnAuthPrice").reset();
    this.claimAuthProcLinkForm.get("matchOnDetailsForInpatient").reset();
    this.claimAuthProcLinkForm.get("action001").reset();
    this.claimAuthProcLinkForm.get("reason001").reset();
    this.claimAuthProcLinkForm.get("actionTbReason").reset();
    this.claimAuthProcLinkForm.get("reason0022").reset();
    this.claimAuthProcLinkForm.get("action002").reset();
    this.claimAuthProcLinkForm.get("reason002").reset();
  }
  saveScreen() {}

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

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewRecord();
          break;
        }
        case "Open": {
          this.resetAll();
          break;
        }
        case "Save": {
          this.saveClmDtlAuthProcLnkHdr();
          break;
        }
        case "Close": {
          this.resetAll();
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
    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
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
    this.claimAuthProcLinkForm.reset();
  }

  /**
   * Handle Menu Actions for edit
   * @param action: string
   */
  private handleEditMenu(action: string) {
    switch (action) {
      case "Lookup": {
        // this.openLookupFieldSearchModel();
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

  //for Dynmic form

  getActionsForDynamic() {
    this.systemCodesService
      .getSystemCodesByLangAndtype("CDAPLPAYACTN", "0")
      .subscribe(
        (systemCodes) => {
          var Options: any = [];
          systemCodes.forEach(function (index: any) {
            Options.push({
              key: index.systemCodeDesc2,
              value: index.systemCode,
            });
          });
          this.claimAuthProcDtlConfig[4].options = Options;
        }
      );
  }

  //Validations
  onEffectiveDateChange() {
    this.claimAuthProcLinkForm
      .get("effectiveDate")
      .valueChanges.subscribe((value) => {
        //Run procedure Here
        const effD = this.claimAuthProcLinkForm.value.effectiveDate;
        let dateEffecDefault = null;
        if (effD && effD.singleDate) {
          const newDate =
            effD.singleDate.date.month +
            "/" +
            effD.singleDate.date.day +
            "/" +
            effD.singleDate.date.year;
          dateEffecDefault = new Date(newDate);
        }
        if (dateEffecDefault != null && dateEffecDefault) {
          this.CallProcedure(this.Lob, this.AuthType, dateEffecDefault, null);
        }
      });
  }

  validateTermDate() {
    this.claimAuthProcLinkForm
      .get("effectiveDate")
      .valueChanges.subscribe((value) => {
        const effDate = new Date(value.singleDate.jsDate);
        //Run procedure Here
      });
  }

  validateReason(event: any) {
    var ls_val = event.target.value;

    if (ls_val != null && ls_val != ' ' && ls_val != '') {
      if (this.validateReasonCode(ls_val)) {
        this.errorReasonCode = false;
        return;
      } else {
        this.errorReasonCode = true;
        alert("s");
        this.ShowError(27222, true, ls_val);
        return;
      }
    }
  }

  validateReasonCode(value: any) {
    this.reasonCodeMasterService
      .getReasonCodeMaster(value)
      .subscribe((data) => {
        if (data) {
          return true;
        } else {
          return false;
        }
      });
    return false;
  }

  dynamicformChange(event: any) {
    let record = event.data;
    var dataIndex = event.index;
    const pair = Object.keys(record).map((k) => ({
      key: k,
      value: record[k],
    }));
    console.log(pair.length);
    //For PAy Action
    var RangeId;
    var ProcessingOrder;
    var RuleId;
    var PayAction;
    var HlddnyReason;
    var allowedReason;
    var GeffectiveDate;
    var GTermDate;
    if (
      this.claimAuthProcDtlState.length <= pair.length &&
      this.claimAuthProcDtlState[dataIndex]["formFields"][0].value == 9999
    ) {
      PayAction = pair[0].value;
              allowedReason = pair[1].value;
      if (this.claimAuthProcDtlState[dataIndex]["formFields"][6].disabled) {
        GeffectiveDate = pair[2].value;
        GTermDate = pair[3].value;
      } else {
        HlddnyReason = pair[2].value;
        GeffectiveDate = pair[3].value;
        GTermDate = pair[4].value;
      }
    } else {
      ProcessingOrder = pair[0].value;
      RangeId = pair[1].value;
      RuleId = pair[3].value;
      PayAction = pair[4].value;
              allowedReason = pair[5].value;

      if (
        this.claimAuthProcDtlState.length <= pair.length &&
        this.claimAuthProcDtlState[dataIndex]["formFields"][6].disabled
      ) {
        GeffectiveDate = pair[6].value;
        GTermDate = pair[7].value;
      } else {
        HlddnyReason = pair[6].value;
        GeffectiveDate = pair[7].value;
        GTermDate = pair[8].value;
      }
    }
    //processing ORder

    var index;
    if (ProcessingOrder) {
      const field: FormGroup = event.field;
      const formField: FormField = event.field;

      if (!ProcessingOrder) {
        return;
      }
      if (formField.name == ClaimAuthProcLinkNames.PROCESS_ORDER) {
        // check dir value and default address are valid
        if (
          ProcessingOrder == "9999"
        ) {
             document
               .getElementById("processOrder" + event.index)
               .setAttribute("disabled", "disabled");
               document
                 .getElementById("ruleId" + event.index)
                 .setAttribute("disabled", "disabled");
                 document
                   .getElementById("rangeId" + event.index)
                   .setAttribute("disabled", "disabled");
                   document
                     .getElementById("IncAllRingRows" + event.index)
                     .setAttribute("disabled", "disabled");
          //this.claimAuthProcDtlConfig[6].disabled = false;
        } else {
            document
              .getElementById("processOrder" + event.index)
              .removeAttribute("disabled");
               document
                 .getElementById("rangeId" + event.index)
                 .removeAttribute("disabled");
               document
                 .getElementById("IncAllRingRows" + event.index)
                 .removeAttribute("disabled");
               document
                 .getElementById("ruleId" + event.index)
                 .removeAttribute("disabled");
        }
      }
    }
    //PayAction
    var index;
    if (PayAction) {
      const field: FormGroup = event.field;
      const formField: FormField = event.field;

      if (!PayAction) {
        return;
      }
      if (formField.name == ClaimAuthProcLinkNames.PAY_ACTION) {
        // check dir value and default address are valid
        if (
          PayAction == "4" ||
          PayAction == "5" ||
          PayAction == "6" ||
          PayAction == "9" ||
          PayAction == "8"
        ) {
          document
            .getElementById("oldDnyReason" + event.index)
            .removeAttribute("disabled");

          //this.claimAuthProcDtlConfig[6].disabled = false;
        } else {
          document
            .getElementById("oldDnyReason" + event.index)
            .setAttribute("disabled", "disabled");
        }
      }
    }

    //For Range Date
    var index;
    if (
      RangeId &&
      RangeId != this.claimAuthProcDtlState[dataIndex]["formFields"][1].value
    ) {
      this.authprocedureRange
        .getAuthProcedureRange(RangeId)
        .subscribe((data) => {
          if (data) {
            this.errorRangeId = false;
          } else {
            this.ShowError(18500, false);
            this.errorRangeId = true;
          }
        });
    }
    //Rule ID
    if (
      RuleId &&
      RuleId != this.claimAuthProcDtlState[dataIndex]["formFields"][3].value
    ) {
      this.ClmDtlAuthProcLnkRuleService.getClmDtlAuthProcLnkRule(
        RuleId
      ).subscribe((data) => {
        if (data) {
          this.errorRuleId = false;
        } else {
          this.ShowError(18501, false);
          this.errorRuleId = true;
        }
      });
    }

    //pay_action
    if (PayAction) {
      var ln_pay_action = PayAction;
      if (ln_pay_action > 3 && ln_pay_action < 7) {
        //make allowed reason required
        this.claimAuthProcDtlState[dataIndex]["formFields"][6].required = true;
      } else if (ln_pay_action > 6 && ln_pay_action < 10) {
        //make allowed reason required
        this.claimAuthProcDtlState[dataIndex]["formFields"][6].required = true;
      } else {
        this.claimAuthProcDtlState[dataIndex]["formFields"][6].required = false;
        //make allowed reason not required
      }
    }
    console.log(this.claimAuthProcDtlState);

    //HLD reason
    if (
      HlddnyReason  ) {
      var ls_val = HlddnyReason;
      var reasonType;
      if (ls_val == "H") {
        event.target.value = "HD";
      } else if (ls_val == "D") {
        event.target.value = "NC";
      }
      if (ls_val == "") {
      }

      if (ls_val != null) {
        if (this.validateReasonCode(ls_val)) {
          this.errorReasonCode = false;
          return;
        } else {
          this.errorReasonCode = true;
          this.ShowError(27222, false);
          return;
        }
      }
    }

    //alowed reason
     if (
       allowedReason
     ) {
       var ls_val =  allowedReason;

       if (ls_val == "") {
       }
       if (ls_val != null) {
         if (this.validateReasonCode(ls_val)) {
           this.errorReasonCode = false;
           return;
         } else {
           this.errorReasonCode = true;
           this.ShowError(27222, false);
           return;
         }
       }
     }

    //effective Date

    if (GeffectiveDate && GeffectiveDate) {
      var effectiveDate;

      if (GeffectiveDate.singleDate.formatted) {
        effectiveDate = GeffectiveDate.singleDate.formatted;
        effectiveDate = this.datePipe.transform(
          new Date(effectiveDate),
          "yyyy-MM-dd"
        );
      } else {
        const effd = GeffectiveDate;
        const newDate =
          effd.singleDate.date.month +
          "/" +
          effd.singleDate.date.day +
          "/" +
          effd.singleDate.date.year;
        effectiveDate = this.datePipe.transform(
          new Date(newDate),
          "yyyy-MM-dd"
        );
      }
      var ldtt_term_date;
      if (effectiveDate != null) {
        if (GTermDate) {
          ldtt_term_date = GTermDate.singleDate.formatted;
          if (ldtt_term_date) {
            ldtt_term_date = this.datePipe.transform(
              new Date(GTermDate.singleDate.formatted),
              "yyyy-MM-dd"
            );
          }
        } else {
          ldtt_term_date = effectiveDate;

        }
         if (ldtt_term_date < effectiveDate) {
           this.ShowError(5564, false);
           this.showEffecitvedate = true;
         } else {
           this.showEffecitvedate = false;
         }
      }
    }

    //Term Date

    if (GTermDate) {
      var termDate;
      if (GTermDate.singleDate.formatted) {
        termDate = GTermDate.singleDate.formatted;
        termDate = this.datePipe.transform(new Date(termDate), "yyyy-MM-dd");
      } else {
        const effd = GeffectiveDate;
        const newDate =
          effd.singleDate.date.month +
          "/" +
          effd.singleDate.date.day +
          "/" +
          effd.singleDate.date.year;
        termDate = this.datePipe.transform(new Date(newDate), "yyyy-MM-dd");
      }
      var ldtt_term_date;
      if (termDate != null) {
        if (GeffectiveDate) {
          effectiveDate = GeffectiveDate.singleDate.formatted;
          if (effectiveDate) {
            effectiveDate = this.datePipe.transform(
              new Date(GeffectiveDate.singleDate.formatted),
              "yyyy-MM-dd"
            );
          }
        } else {
          effectiveDate = termDate;

        }
        if (termDate < effectiveDate) {
          this.ShowError(5564, false);
          this.errorShowTermDate = true;
        } else {
          this.errorShowTermDate = false;
        }
      }
    }
  }

  //Procedure Call
  CallProcedure(lob: any, authType: any, effetiveDate: any, termDate: any) {
    let data = new ProcSpCheckCDAPL();
    data.sbusKeyName = null;
    data.sbusKeyValue = null;
    data.slob = lob;
    data.sauthType = authType;
    data.deffectiveDate = this.DatePipe.transform(effetiveDate, "yyyy-MM-dd");
    if (termDate != null) {
      data.dtermDate = termDate;
    } else {
      data.dtermDate = null;
    }
    this.clmDtlAuthProcLnkDtlService.callProcedure(data).subscribe((data) => {
      console.log(data);
    });
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
                    this.saveClmDtlAuthProcLnkHdr()
                }
                else if(resp.name === 'No') {
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

  helpScreen = () => {
      const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
      modalRef.componentInstance.showIcon = true;
      modalRef.componentInstance.defaultFile = '/CDAPL_Claims_Detail_Authorization_Procedure_Link_1.htm'
  }
}
