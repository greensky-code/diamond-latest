/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { GridOptions } from 'ag-grid-community';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {AuthMaster, MemberEligHistory, MessageMasterDtl, ProvMaster, SecUser, SecWin, SystemCodes} from '../../../api-models';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthMasterService } from '../../../api-services/auth-master.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { Menu, SearchModel } from "../../../shared/models/models";
import { MemberMasterLookup } from '../../../shared/lookup/member-master-lookup';
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { ToastService } from "../../../shared/services/toast.service";
import { NgbToastType } from "ngb-toast";
import { SystemCodesService } from '../../../api-services/system-codes.service';
import { AuthMasterLookup } from '../../../shared/lookup/auth-master-lookup';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import { AuthTypeLookup } from '../../../shared/lookup/auth-type-lookup';
import { KeyboardShortcutsComponent,  ShortcutInput } from 'ng-keyboard-shortcuts';
import {CONSTANTS, geAuthorizationDaysVisitShortcutKeys, getAuthorizationMaster} from '../../../shared/services/shared.service';
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service';
import { MemberMasterService } from '../../../api-services/member-master.service';
import {SearchService} from "../../../shared/services/search.service";
import {DatePipe} from '@angular/common';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {Router} from '@angular/router';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';


// Use the Component directive to define the AuthorizationMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "authorizationmaster",
  templateUrl: "./authorization-master.component.html",
})
export class AuthorizationMasterComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() showIcon = true;
  @Input() authNumber: number;
  authorizationMasterForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId = "AUTHS";
  public isSuperUser = false;
  public secProgress = true;
  editAuthMaster: boolean;
  authMaster: AuthMaster;
  authProviders: ProvMaster[] = [];
  authMasters: AuthMaster[] = [];
  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;
  private dataGrid002gridApi: any;
  private dataGrid002gridColumnApi: any;
  userTemplateId: string;
  secColDetails: SecColDetail[] = [];
  public menu: Menu[] = [];
  showAuthFields: boolean;
  public authTypes: any[] = [];
  public authLevels: any[] = [];
  tplCodes: SystemCodes[] = [];
  certTypes: SystemCodes[] = [];
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  keyValues: any;
  keyNames: any;
  public showAuthNumberFields: Boolean = false;
  public shortcuts: ShortcutInput[] = [];
  private keyboard: KeyboardShortcutsComponent;
  @ViewChild("next") next: any;
  memberId: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
    @ViewChild("dropdown", {static: false}) dropdown:ElementRef;
    @ViewChild('tplCode', {static: false}) tplCodeRef: ElementRef;
  authMember = new SearchModel(
    "authmasters/lookup",
    AuthMasterLookup.AUTH_MASTER_DEFAULT,
    AuthMasterLookup.AUTH_MASTER_ALL,
    []
  );

  searchMemberModel = new SearchModel(
    "membermasters/lookup",
    MemberMasterLookup.MEMBER_MASTER_ALL,
    MemberMasterLookup.MEMBER_MASTER_DEFAULT,
    []
  );

  AuthTypeSearchModal = new SearchModel(
    "authtypemasters/AuthType/lookup",
    AuthTypeLookup.Auth_Type_ALL,
    AuthTypeLookup.Auth_Type_DEFAULT,
    []
  );
  seqGroupId: number;
    AuthTypeStatus: Boolean = false;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private memberServiceMaster: MemberMasterService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private secUserService: SecUserService,
    private securityService: SecurityService,
    private authMasterService: AuthMasterService,
    private toastService: ToastService,
    private secColDetailService: SecColDetailService,
    private systemCodesService: SystemCodesService,
    private messageService: MessageMasterDtlService,
    public activeModal: NgbActiveModal,
    public datePipe: DatePipe,
    private memberService: MemberEligHistoryService,
    private cdr: ChangeDetectorRef,
    private searchService: SearchService,
    private router: Router,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private memberMasterService: MemberMasterService,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getAuthorizationMaster(this));
    this.cdr.detectChanges();
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
   disableMenu(){
         if (this.userTemplateId == "UT_VIEW") {
           this.menu[0]["dropdownItems"][0].disabled = true;
           this.menu[0]["dropdownItems"][2].disabled = true;
         }
    }
  private initializeComponentState(): void {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.authorizationMasterForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.getAuthTypes();
    this.getAuthLevels();
    this.getTplcode();
    this.getCertTypes();

    if (this.authNumber) {
      this.getAuthMaster(this.authNumber);
    }
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

  createAuthMaster() {
    // if (this.secWin.hasInsertPermission()) {
    this.formValidation.validateForm();
    if (this.authorizationMasterForm.valid) {
      let authMaster = this.getFormData(new AuthMaster());
      this.authMasterService.createAuthMaster(authMaster).subscribe(
        (response) => {
          this.alertMessage = this.alertMessageService.info(
            "Record successfully created."
          );
          this.editAuthMaster = false;
          this.getAuthMaster(authMaster.authMasterPrimaryKey.authNumber);
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
            this.isFormDataChangeStatus = false;
          }
        },
        (error) => {
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

  updateAuthMaster(secondaryAuthNo: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.authorizationMasterForm.valid) {
        let authMaster = this.getFormData(new AuthMaster());

        this.authMasterService
          .updateAuthMaster(authMaster, secondaryAuthNo)
          .subscribe(
            (response) => {
              this.alertMessage = this.alertMessageService.info(
                "Record successfully updated."
              );
              this.editAuthMaster = false;
              if (this.screenCloseRequest === true) {
                setTimeout(() => {
                  this.activeModal.close();
                }, 2000);
                this.isFormDataChangeStatus = false;
              }
            },
            (error) => {
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
    } else {
      this.showPopUp(
        "You are not permitted to update Group Master ",
        "Group Master Permissions"
      );
    }
  }

  getFormData(authMaster: AuthMaster) {
    authMaster.authMasterPrimaryKey = {
      authNumber: Form.getValue(this.authorizationMasterForm, "authNumber"),
    };
    authMaster.requestedDate = Form.getDatePickerValue(
      this.authorizationMasterForm,
      "reqDate"
    );
    authMaster.authType = Form.getValue(
      this.authorizationMasterForm,
      "authType"
    );
    authMaster.authLevel = Form.getValue(
      this.authorizationMasterForm,
      "leverl"
    );
    authMaster.tplCode = Form.getValue(this.authorizationMasterForm, "tplCode");
    authMaster.privacyApplied = Form.getValue(
      this.authorizationMasterForm,
      "privacyMaApply"
    );
    authMaster.memberAge = Form.getValue(this.authorizationMasterForm, "age");
    authMaster.seqGroupId = this.seqGroupId;
    authMaster.groupId = Form.getValue(this.authorizationMasterForm, "groupId");
    authMaster.planCode = Form.getValue(
      this.authorizationMasterForm,
      "planCode"
    );
    authMaster.nsSubscriberId = Form.getValue(
      this.authorizationMasterForm,
      "nonSysSubscriberId"
    );
    authMaster.certificationType = Form.getValue(
      this.authorizationMasterForm,
      "certificationType"
    );
    authMaster.paperworkAttached =
      Form.getValue(this.authorizationMasterForm, "paperworkAttachment") ==
      "None"
        ? "N"
        : "Y";
    authMaster.intakeDateTime = Form.getDatePickerValue(
      this.authorizationMasterForm,
      "intakeDateTime"
    );
    authMaster.callerName = Form.getValue(
      this.authorizationMasterForm,
      "callerName"
    );
    authMaster.callerPhoneNumber = Form.getValue(
      this.authorizationMasterForm,
      "callerPhoneNo"
    );
    authMaster.patientAcctNo = Form.getValue(
      this.authorizationMasterForm,
      "patientAcctNo"
    );
    authMaster.medicalRecNo = Form.getValue(
      this.authorizationMasterForm,
      "medicalRecNo"
    );
    authMaster.diagnosisNarrative = Form.getValue(
      this.authorizationMasterForm,
      "dxNarrative"
    );
    authMaster.surgicalProcedureNarrative = Form.getValue(
      this.authorizationMasterForm,
      "spNarrative"
    );
    authMaster.relatedCauseCode = Form.getValue(
      this.authorizationMasterForm,
      "caCase"
    );
    authMaster.datesUserDefined2 = Form.getValue(
      this.authorizationMasterForm,
      "userDefined2"
    );
    authMaster.datesUserDefinedDate = Form.getValue(
      this.authorizationMasterForm,
      "userDefinedDate"
    );
    authMaster.seqMembId = this.seqGroupId;
    return authMaster;
  }

  saveAuthMaster() {
    if (this.editAuthMaster) {
      this.updateAuthMaster(
        this.authMaster.authMasterPrimaryKey.secondaryAuthNo
      );
    } else {
      this.createAuthMaster();
    }
  }

  deleteAuthMaster(secondaryAuthNo: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.authMasterService.deleteAuthMaster(secondaryAuthNo).subscribe(
        (response) => {
          this.alertMessage = this.alertMessageService.info(
            "Record successfully deleted."
          );
        },
        (error) => {
          this.alertMessage = this.alertMessageService.error(
            "An Error occurred while deleting record."
          );
        }
      );
    }
  }

  onTabKeyAuthType(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupAuthTypeModel();
    } else if (event.key == "Tab") {
        event.preventDefault();
        const value = event.target.value;
        if (value === '') {
          this.messageService.findByMessageId(29032).subscribe(res => {
            this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'auth_type'), 'Authorization Master');
         })
        } else {
            let res = [{'authType': value}];
            let sm = JSON.parse(JSON.stringify(this.AuthTypeSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
              if (resp === null) {
                this.messageService.findByMessageId(9984).subscribe(response => {
                  this.showPopUp('9984: ' + response[0].messageText, 'Authorization Master')
                })
              } else {
                this.AuthTypeStatus = true;
                  this.dropdown.nativeElement.focus();
                  this.authorizationMasterForm.patchValue({
                      authLevel: this.authLevels[1].systemCode
                  })
              }
            })
        }
    }
  }

  openLookupAuthTypeModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.AuthTypeSearchModal;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.sortable = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.authorizationMasterForm.get("authType").setValue(res.authType);
        this.AuthTypeStatus = true;
      }
    });
  }

  onTabKeyAuthNumber(event: any) {
    if (event.key == "F5") {
      event.preventDefault();
      this.openLookupAuthNumberModel();
      this.showAuthNumberFields = true;
    } else if (event.key == "Tab") {
      event.preventDefault();

      let value = event.target.value;
      if (value == null || value == "" || !value) {
        this.newAuthPopUp();
        this.showAuthNumberFields = true;
      } else {
        this.getAuthMaster(value);
      }
    }
  }

  resetForm() {
    this.authMasters = new Array<AuthMaster>();
    this.authMaster = new AuthMaster();
    this.authorizationMasterForm.reset();
    this.authorizationMasterForm.get('authNumber').enable();
    this.dataGrid001GridOptions.api.setRowData([]);
  }

  getAuthMaster(secondaryAuthNo: number) {
    this.resetForm();
    this.authMasterService
      .getAuthMaster(secondaryAuthNo)
      .subscribe((authMasters: AuthMaster[]) => {
        this.authMasters = authMasters;
        if (authMasters) {
          this.dataGrid001GridOptions.api.setRowData(this.authMasters);
          this.dataGrid001GridOptions.api.selectIndex(0, null, null);

          this.editAuthMaster = true;
          this.authMaster = this.authMasters[0];
          this.setFormData();
          this.showAuthNumberFields = true;
          this.getAuthProviders(secondaryAuthNo);
        } else {
          this.authorizationMasterForm.patchValue({
            authNumber: this.lpad(secondaryAuthNo, 9),
          });
          this.newAuthPopUp();
          this.showAuthNumberFields = true;
        }
      });
  }

  private lpad(num: any, size: number) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  private newAuthPopUp() {
    this.searchStatus = false;
    let popMsg = new PopUpMessage(
      "groupNotExistPopup",
      "Authorization Master",
      "9849: Entered Authorization Number does not exist. Press Yes to create a new Auth.",
      "icon"
    );
    popMsg.buttons = [
      new PopUpMessageButton("Yes", "Yes", "btn btn-primary"),
      new PopUpMessageButton("No", "No", "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
    ref.componentInstance.popupMessage = popMsg;
    ref.componentInstance.showIcon = true;
    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
      this.popUpButtonClicked(event);
    });
  }

  private popUpButtonClicked(button: PopUpMessageButton) {
    if (button.name == "Yes") {
      const element = this.renderer.selectRootElement("#reqDate");
      setTimeout(() => element.focus(), 0);
      let intakeDateTime = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss")

      console.log(this.authorizationMasterForm.get("authNumber").value);
      if (this.authorizationMasterForm.get("authNumber").value == "") {
        this.authMasterService.getNextVal().subscribe((data) => {
          this.authorizationMasterForm.patchValue({
            authNumber: this.lpad(data, 9),
            intakeDateTime: this.dateFormatPipe.defaultDisplayDateFormat(intakeDateTime),
          });
          this.populateAuth();
        });
      } else {
        this.populateAuth();
      }
      this.authorizationMasterForm.get("authNumber").disable();
    }
    if (button.name == "No") {
      this.authorizationMasterForm.get("authNumber").enable();
    }
  }

  populateAuth() {
    //this.createAuthMaster();
    this.authorizationMasterForm.patchValue({
      authLevel: "X",
      tplCode: "NA",
      privacyMaApply: "N",
      paperworkAttachment: "None",
    });
    var data = new AuthMaster();
    data.authMasterPrimaryKey = {
      authNumber: parseInt(
        this.authorizationMasterForm.get("authNumber").value
      ),
    };
    data.expirationDate = "No";
    this.dataGrid001GridOptions.api.setRowData([data]);
  }

  setFormData() {
    this.authorizationMasterForm.patchValue({
      authNumber: this.authMaster.authMasterPrimaryKey.authNumber,
      reqDate: this.dateFormatPipe.defaultDisplayDateFormat(
        this.authMaster.requestedDate
      ),
      authType: this.authMaster.authType,
      authLevel: this.authMaster.authLevel,
      tplCode: this.authMaster.tplCode,
      privacyMaApply: this.authMaster.privacyApplied,
      age: this.authMaster.memberAge,
      groupId: this.authMaster.seqGroupId,
      planCode: this.authMaster.planCode,
      nonSysSubscriberId: this.authMaster.nsSubscriberId,
      certificationType: this.authMaster.certificationType,
      paperworkAttachment:
        this.authMaster.paperworkAttached == "N" ? "None" : "Yes",
      intakeDateTime: this.dateFormatPipe.defaultDisplayDateFormat(
        this.authMaster.intakeDateTime
      ),
      callerName: this.authMaster.callerName,
      callerPhoneNo: this.authMaster.callerPhoneNumber,
      patientAcctNo: this.authMaster.patientAcctNo,
      medicalRecNo: this.authMaster.medicalRecNo,
      dxNarrative: this.authMaster.diagnosisNarrative,
      spNarrative: this.authMaster.surgicalProcedureNarrative,
      caCase: this.authMaster.relatedCauseCode,
      userDefined2: this.authMaster.datesUserDefined2,
      userDefinedDate: this.dateFormatPipe.defaultDisplayDateFormat(
        this.authMaster.datesUserDefinedDate
      ),
    }, {emitEvent: false});
    this.memberService
      .getMemberEligHistoryCurrentBySeqMembId(
        this.authMaster.memberEligHistory.memberEligHistoryPrimaryKey.seqMembId
      )
      .subscribe((data) => {
        this.authorizationMasterForm.patchValue({
          memberId: data.subscriberId,
        });
      });

    setTimeout(() => {
      this.isFormDataModified();
    }, 2000)
  }

  getAuthProviders(secondaryAuthNo: number) {
    this.authMasterService
      .findAuthProvidersByAuthNumber(secondaryAuthNo)
      .subscribe(
        (authProviders: any) => {
          this.authProviders = authProviders;
          for (var val of this.authProviders) {
            if (val.outOfNetStatus == "N") {
              val.outOfNetStatus = "NA";
            }

            if (
              val.participationFlag == null ||
              val.participationFlag == "N" ||
              val.participationFlag.trim().length == 0
            ) {
              val.participationFlag = "N";
            } else {
              val.participationFlag = "P";
            }
          }
          this.dataGrid002GridOptions.api.setRowData(this.authProviders);
        },
        (error: any) => {
          this.alertMessage = this.alertMessageService.error(
            "An Error occurred while retrieving record."
          );
        }
      );
  }

  getAuthMasters() {
    this.authMasterService.getAuthMasters().subscribe(
      (authMasters) => {
        this.authMasters = authMasters;
      },
      (error) => {
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving records."
        );
      }
    );
  }

  dataGrid001GridOptionsExportCsv() {
    let params = {};
    this.dataGrid001gridApi.exportDataAsCsv(params);
  }

  dataGrid002GridOptionsExportCsv() {
    let params = {};
    this.dataGrid002gridApi.exportDataAsCsv(params);
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid001GridOptions.editType = "fullRow";
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Auth Number",
        field: "authMasterPrimaryKey.authNumber",
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Secondary",
        field: "authMasterPrimaryKey.secondaryAuthNo",
        width: 150,
      },
      {
        headerName: "Req Date",
        field: "requestedDate",
        width: 150,
      },
      {
        headerName: "Type",
        field: "authType",
        width: 150,
      },
      {
        headerName: "Ext",
        field: "expirationDate",
        width: 150,
      },
      {
        headerName: "Member ID",
        field: "memberEligHistory.subscriberId",
        width: 150,
      },
      {
        headerName: "DIAMOND ID",
        field: "memberEligHistory.personNumber",
        width: 150,
      },
      {
        headerName: "Group ID",
        field: "memberEligHistory.seqGroupId",
        width: 150,
      },
      {
        headerName: "Plan Code",
        field: "memberEligHistory.planCode",
        width: 150,
      },
    ];
  }

  createDataGrid002(): void {
    this.dataGrid002GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid002GridOptions.editType = "fullRow";
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: "Prov Code",
        field: "provCode",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Provider ID",
        field: "providerMasterAProviderId",
        width: 200,
      },
      {
        headerName: "Specialty",
        field: "specialtyType",
        width: 200,
      },
      {
        headerName: "Vendor ID",
        field: "vendorId",
        width: 200,
      },
      {
        headerName: "Zip Code",
        field: "vendorShortName",
        width: 200,
      },
      {
        headerName: "InSvc Area Par",
        field: "participationFlag",
        width: 200,
      },
      {
        headerName: "Out Net Status",
        field: "outOfNetStatus",
        width: 200,
      },
      {
        headerName: "Prev. Provider ID",
        field: "prevSeq_provId",
        width: 200,
      },
      {
        headerName: "Cov Prov Grp ID",
        field: "covProvGrpId",
        width: 200,
      },
    ];
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
          this.disableMenu();
          this.secProgress = false;
        } else {
          this.secProgress = false;

          this.showPopUp(
            "You are not Permitted to view Authorization Master",
            "Authorization Master Permission"
          );
        }
      },
      (error) => {
        this.showPopUp(error, "Window Error");
      }
    );
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.authorizationMasterForm = this.formBuilder.group(
      {
        authNumber: ["", { updateOn: "blur", validators: [] }],
        reqDate: ["", { updateOn: "blur", validators: [] }],
        authType: ["", { updateOn: "blur", validators: [] }],
        leverl: ["", { updateOn: "blur", validators: [] }],
        diamondId: ["", { updateOn: "blur", validators: [] }],
        tplCode: ["", { updateOn: "blur", validators: [] }],
        lob: ["", { updateOn: "blur", validators: [] }],
        privacyMaApply: ["", { updateOn: "blur", validators: [] }],
        memberId: ["", { updateOn: "blur", validators: [] }],
        textbox: ["", { updateOn: "blur", validators: [] }],
        dynamicText001: ["", { updateOn: "blur", validators: [] }],
        dynamicText002: ["", { updateOn: "blur", validators: [] }],
        age: ["", { updateOn: "blur", validators: [] }],
        sex: ["", { updateOn: "blur", validators: [] }],
        groupId: ["", { updateOn: "blur", validators: [] }],
        dynamicText003: ["", { updateOn: "blur", validators: [] }],
        planCode: ["", { updateOn: "blur", validators: [] }],
        nonSysSubscriberId: ["", { updateOn: "blur", validators: [] }],
        certificationType: ["", { updateOn: "blur", validators: [] }],
        paperworkAttachment: ["", { updateOn: "blur", validators: [] }],
        intakeDateTime: ["", { updateOn: "blur", validators: [] }],
        callerName: ["", { updateOn: "blur", validators: [] }],
        callerPhoneNo: ["", { updateOn: "blur", validators: [] }],
        patientAcctNo: ["", { updateOn: "blur", validators: [] }],
        medicalRecNo: ["", { updateOn: "blur", validators: [] }],
        dxNarrative: ["", { updateOn: "blur", validators: [] }],
        spNarrative: ["", { updateOn: "blur", validators: [] }],
        caCase: ["", { updateOn: "blur", validators: [] }],
        userDefined2: ["", { updateOn: "blur", validators: [] }],
        authLevel: ["", { updateOn: "blur", validators: [] }],
        userDefinedDate: ["", { updateOn: "blur", validators: [] }],
          pcpID: ['', {updateOn: 'blur', validators: []}],
          batchID: ['', {updateOn: 'blur', validators: []}]
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.secProgress = false;
      return;
    }
    this.secColDetailService
      .findByTableNameAndUserId("AUTH_CLAIM_LINK_RULE", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  searchStatus = false;

  authOnRowClicked(event: any) {
    const selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();

    if (selectedRows.length === 1) {
      this.editAuthMaster = true;
      this.searchStatus = true;
      this.authMaster = selectedRows[0];
      this.dataGrid001GridOptions.api.selectIndex(event.rowIndex, null, null);
    } else {
      this.searchStatus = false;
    }
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
          { isHorizontal: true },
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
          { name: "Next" },
          { name: "Previous" },
          { isHorizontal: true },
          { name: "Lookup" },
          { name: "Next Topic" },
          { name: "Previous Topic" },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Days Visits Update" },
          { name: "Procedure" },
          { name: "Appeal" },
          { name: "Physician Advisor" },
          { name: "Second Opinion" },
          { name: "Paperwork Information" },
          { name: "Trace Information" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [
          { name: "Auth Lookup" },
          { name: "Display Member Info" },
          { name: "Letter Request" },
          { name: "View JPA Info" },
          { name: "View Claims with Auth Number" },
          { name: "Other Authorization Information" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
      },
      {
        menuItem: 'Windows',
        dropdownItems: [
          {name: 'Tile'},
          {name: 'Layer'},
          {name: 'Cascade'},
          {name: 'Arrange Icons'},
          {isHorizontal: true},
          {name: 'Show Timestamp'},
          {name: 'Audit Display'},
          {isHorizontal: true},
          {name: '1 Main Menu'},
          {name: '2 Member Master'},
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
          this.resetForm();
          break;
        }
        case "Save": {
          this.createAuthMaster();
          break;
        }
        case "Open":{
                    this.resetForm();
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
      // this.handleEditMenu(event.action)
    } else if (event.menu.menuItem === 'Windows') {
      switch (event.action) {

        case '1 Main Menu': {
          this.router.navigate(['diamond/functional-groups']);
          break;
        }
        case 'Audit Display': {
          if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.windowId);
            if (status) {
              let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
              ref.componentInstance.keyNames = this.keyNames;
              ref.componentInstance.keyValues = this.keyValues;
              ref.componentInstance.winID = this.windowId;
              ref.componentInstance.showIcon = true;
            } else {
              this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
              });
            }
          } else {
            this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
              this.alertMessage = this.alertMessageService.error('30164: ' + message[0].messageText);
            });
          }

          break;
        }

      }
    }
  }

  private menuAfterAuthSelect() {
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
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { name: "Printer Setup..." },
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
          { name: "Next" },
          { name: "Previous" },
          { isHorizontal: true },
          { name: "Lookup" },
          { name: "Next Topic" },
          { name: "Previous Topic" },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name : "* Intake Data"},
          { name : "* Dates"},
          { name : "Diagnosis Codes"},
          { name : "Surgical Procedures"},
          { name : "* Review Data"},
          { name : "Service Data"},
          { name : "* Status"},
          { name : "* Days Visits"},
          { name : "Discharge"},
          { name : "* Auth Provider"},
          { name: "Days Visits Update" },
          { name: "Procedure" },
          { name: "Appeal" },
          { name: "Physician Advisor" },
          { name: "* Second Opinion" },
          { name: "Paperwork Information" },
          { name: "Trace Information" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems:  [
          { name: "Auth Lookup" },
          { name: "Secondary Authorization" },
          { name: "Add Auth Provider" },
          { name: "Change Auth Provider" },
          { name: "Delete Auth Provider" },
          { name: "Change Auth Type" },
          { name: "Display Member Info" },
          { name: "Letter Request" },
          { name: "Member Refresh" },
          { name: "View JPA Info" },
          { name: "View Claims with Auth Number" },
          { name: "Other Authorization Information" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
            {name: "Tile"},
            {name: "Layer"},
            {name: "Cascade"},
            {name: "Arrange Icons"},
            {isHorizontal: true},
            {name: "Show Timestamp"},
            {name: "Audit Display"},
            {isHorizontal: true},
            {name: "1 Main Menu"},
            {name: "2 Vendor Master"},
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


  onTabKeyAuthMember(event: any) {
    if (event.key == "F5") {
      event.preventDefault();
      this.openMemberLookupModel();
    } else if (event.target.value && event.key === 'Tab') {
        event.preventDefault();
        this.memberId = event.target.value;
        this.memberMasterService.findBySubscriberId(this.memberId).subscribe(res => {
          if (res) {
              const element = this.renderer.selectRootElement('#textbox');
              setTimeout(() => element.focus(), 50);
          } else {
            this.messageService.findByMessageId(6240).subscribe(resp => {
              this.showPopUp('6240: ' + resp[0].messageText, 'Authorization Master')
            })
          }
        })
    } else if (event.key === 'Tab') {
        event.preventDefault();
        this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp('29032: ' + message[0].messageText.replace('@1', 'subscriber_id'), 'Authorization Master')
        });
    }
  }

  openLookupAuthNumberModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.authMember;
    ref.componentInstance.showIcon = true;

    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res) {
        const value = res.authMasterPrimaryKey.authNumber;
        this.authorizationMasterForm.patchValue({ authNumber: value });
        this.getAuthMaster(value);
        this.getAuthProviders(value);
        this.authorizationMasterForm.controls['authNumber'].disable();
        this.menuAfterAuthSelect();
      }

      this.popUpMessage = null;
    });
  }

  openMemberLookupModel() {
    let ref = this.modalService.open(LookupComponent);
    ref.componentInstance.searchModel = this.searchMemberModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      this.authorizationMasterForm.patchValue({
        memberId: res.subscriberId,
        textbox: res.personNumber,
        dynamicText001: res.lastName,
        dynamicText002: res.firstName,
        sex: res.gender,
      });
      this.seqGroupId = res.seqMembId;
      this.memberService.GetAuthorization(res.seqMembId).subscribe((data) => {
        this.authorizationMasterForm.patchValue({
          groupId: data[0].groupId,
          dynamicText003: data[0].shortName,
          planCode: data[0].planCode,
        });
      });
      this.popUpMessage = null;
    });
  }

  getAuthTypes() {
    this.authMasterService.getAuthTypes().subscribe((res: any) => {
      this.authTypes = res;
    });
  }

  getAuthLevels() {
    this.authMasterService.getAuthLevels().subscribe((res: any) => {
      this.authLevels = res;
    });
  }

  getTplcode() {
    this.systemCodesService.getTplCodes().subscribe(
      (tplCodes: SystemCodes[]) => {
        this.tplCodes = tplCodes;
      },
      (error: any) => {
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving record."
        );
      }
    );
  }

  getCertTypes() {
    this.systemCodesService.getCertTypes().subscribe(
      (certTypes: SystemCodes[]) => {
        this.certTypes = certTypes;
      },
      (error: any) => {
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving record."
        );
      }
    );
  }

  modalClose() {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, "Authorization Master");
        });
    } else {
      this.activeModal.close();
    }
  }

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
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === "Yes") {
          this.saveAuthMaster();
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
    this.authorizationMasterForm.valueChanges.subscribe((res) => {
      this.isFormDataChangeStatus = true;
    });
  }

  onTabKeyAuthMemberPersonNum = (event) => {
    if (event.key === 'F5') {
      event.preventDefault();
        this.openMemberLookupModel();
    } else if (event.target.value && event.key === 'Tab') {
        event.preventDefault();
        this.memberMasterService.findBySubscriberId(this.memberId).subscribe(res => {
            if (res) {
                if (res[0].personNumber === event.target.value) {
                    this.authorizationMasterForm.patchValue({
                        memberId: res[0].subscriberId,
                        textbox: res[0].personNumber,
                        dynamicText001: res[0].lastName,
                        dynamicText002: res[0].firstName,
                        sex: res[0].gender,
                    });
                    this.seqGroupId = res[0].seqMembId;
                    this.memberService.GetAuthorization(res[0].seqMembId).subscribe((data) => {
                        this.authorizationMasterForm.patchValue({
                            groupId: data[0].groupId,
                            dynamicText003: data[0].shortName,
                            planCode: data[0].planCode,
                        });
                    });
                    this.tplCodeRef.nativeElement.focus();
                } else {
                  this.messageService.findByMessageId(9824).subscribe(resp => {
                    this.showPopUp('9824: ' + resp[0].messageText, 'Authorization Master')
                  })
                }
            } else {
                this.messageService.findByMessageId(9824).subscribe(resp => {
                    this.showPopUp('9824: ' + resp[0].messageText.replace('@1', 'subscriber_id'), 'Authorization Master')
                })
            }
        })
    } else if (event.key === 'Tab') {
        event.preventDefault();
        this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp('29032: ' + message[0].messageText.replace('@1', 'subscriber_id'), 'Authorization Master')
        });
    }
  };

    getMemberId = (event) => {
    this.memberId = event.target.value;
    }
}
