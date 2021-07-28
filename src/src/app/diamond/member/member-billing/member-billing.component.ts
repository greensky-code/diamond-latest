/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, datePickerModel, NGBModalOptions} from '../../../shared/config';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { MemberMasterService } from '../../../api-services/member-master.service';
import {
  DddwDtl,
  GroupMaster,
  MemberEligHistory,
  MemberMaster,
  MessageMasterDtl,
  SecUser
} from '../../../api-models';
import { MemberOtherCoverageService } from '../../../api-services/member-other-coverage.service';
import { MemberOtherCoverage } from '../../../api-models/member-other-coverage';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service';
import {
  DddwDtlService,
  GroupMasterService,
  MessageMasterDtlService,
  SecUserService
} from '../../../api-services';
import { Menu, SearchModel } from "../../../shared/models/models";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { MemberMasterLookup } from "../../../shared/lookup/member-master-lookup";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { CONSTANTS, getBenefitPackgaeShortcutKeys, getMemberBillingShortcutKeys, SharedService } from '../../../shared/services/shared.service';
import { Form } from '../../../shared/helpers/form.helper';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import { MEMBER_BILLING_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import { MemberAddressComponent } from '../member-address/member-address.component';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {HelpComponent} from "../help/help.component";

// Use the Component directive to define the MemberBillingComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "memberbilling",
  templateUrl: "./member-billing.component.html",
})
export class MemberBillingComponent implements OnInit, AfterViewInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  memberBillingForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  datePickerConfig = DatePickerConfig;
  datePickerModel = datePickerModel;
  private memberMasters: MemberMaster[] = [];
  private memberMaster: MemberMaster;
  private groupMaster: GroupMaster;
  private memberOtherCoverage: MemberOtherCoverage[] = [];
  sub: any;
  @Input() SubID?: string;
  @Input() selectedMember?: string;
  memberMasterLength = 0;

  memberEligHistories: MemberEligHistory[] = [];
  memberEligHistory: MemberEligHistory;
  groupId: any;
  public popUpMessage: PopUpMessage;
  @Input() showIcon: boolean = false;
  menu: Menu[] = [];

  @Input() winID?: string;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;

  shortcuts: ShortcutInput[] = [];
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;

  searchModel = new SearchModel(
    "membermasters/lookup",
    MemberMasterLookup.MEMBER_MASTER_ALL,
    MemberMasterLookup.MEMBER_MASTER_DEFAULT,
    []
  );

  searchStatus: boolean = false;
  keyNames: string = "subscriber_id";
  keyValues: any;
  selectedRow : any;

  secWin: SecWinViewModel;
  windowId = 'MEMBB';
  userTemplateId: string;
  memberModuleId = MEMBER_BILLING_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  isScreenCloseRequest: boolean = false;
  formDataChangeStatus: boolean = false;
  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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

  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;
  dddwDtls: DddwDtl[] = [];
  dataGrid001GridOptionsExportCsv() {
    var params = {};
    this.dataGrid001gridApi.exportDataAsCsv(params);
  }

  private dataGrid002gridApi: any;
  private dataGrid002gridColumnApi: any;

  dataGrid002GridOptionsExportCsv() {
    var params = {};
    this.dataGrid002gridApi.exportDataAsCsv(params);
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50,
      // onGridReady: () => {
      //   if(this.SubID) {
      //     this.dataGrid001GridOptions.api.showLoadingOverlay();
      //   }
      // }
    };
    this.dataGrid001GridOptions.editType = "fullRow";
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Person No",
        field: "personNumber",
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Last",
        field: "lastName",
        width: 150,
      },
      {
        headerName: "First",
        field: "firstName",
        width: 150,
      },
      {
        headerName: "DOB",
        field: "dateOfBirth",
        width: 150,
      },
      {
        headerName: "Gender",
        field: "gender",
        width: 150,
      },
      {
        headerName: "Employee Number",
        field: "employeeNo",
        width: 150,
      },
      {
        headerName: "Citizenship",
        field: "country",
        width: 150,
      },
    ];
  }
  createDataGrid002(): void {
    this.dataGrid002GridOptions = {
      paginationPageSize: 50,
      // onGridReady: () => {
      //   if(this.SubID) {
      //     this.dataGrid002GridOptions.api.showLoadingOverlay();
      //   }
      // }
    };
    this.dataGrid002GridOptions.editType = "fullRow";
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: "Eff Date",
        field: "effectiveDate",
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Term Date",
        field: "termDate",
        width: 150,
      },
      {
        headerName: "ESts",
        field: "eligStatus",
        width: 150,
      },
      {
        headerName: "Group ID",
        field: "groupId",
        width: 150,
      },
      {
        headerName: "Plan Code",
        field: "planCode",
        width: 150,
      },
      {
        headerName: "Riders",
        field: "riderCode1",
        width: 150,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private sharedService:SharedService,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private memberMasterService: MemberMasterService,
    private memberOtherCoverageService: MemberOtherCoverageService,
    private toastService: ToastService,
    private memberEligHistoryService: MemberEligHistoryService,
    private groupMasterService: GroupMasterService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private location: Location,
    public activeModal: NgbActiveModal,
    private dddwDtlService: DddwDtlService,
    private currencyPipe: CurrencyPipe,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService
  ) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  initializeComponentState () {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.groupMaster = new GroupMaster();
    this.formValidation = new FormValidation(this.memberBillingForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.getGroupTypes();
    setTimeout(() => {
      //this.getMemberMasters();
      this.dataGrid001GridOptions.api.setRowData([]);
      this.dataGrid002GridOptions.api.setRowData([]);
      //this.getMemberOtherCoverages();
    });
    this.sub = this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.memberBillingForm.patchValue({
          subscriberId: params["id"],
        });
        this.getMemberMastersBySubscribeId(params["id"], null);
        this.location.replaceState("diamond/member/billing");
      }
      // In a real app: dispatch action to load the details here.
    });
    if (this.SubID) {
      this.memberBillingForm.patchValue({
        subscriberId: this.SubID,
      });
      this.getMemberMastersBySubscribeId(this.SubID, this.selectedMember);
    }
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
      this.userTemplateId = user.dfltTemplate
      this.getSecWin(user.dfltTemplate);
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
                'You are not Permitted to view MEMBER Billing',
                'MEMBER Billing Permission'
            );
          }
        }
    );
  }

  /**
   * Get Security Column Details
   */
  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('MEMBER_ELIG_HISTORY', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getMemberBillingShortcutKeys(this));
    this.cdr.detectChanges();
  }

  menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "Open" },
          { name: "Save" },
          { name: "Close" },
          { name: "-" },
          { name: "Main Menu" },
          { name: "Shortcut Menu" },
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
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Master File" },
          { name: "Eligibility History" },
          { name: "Coordination of Benefits" },
          { name: "Alias/Responsible Party/Privacy" },
          { name: "Member Address" },
          { name: "M+ C Information" },
          { name: "Working Aged" },
          { name: "Billing Control" },
          { name: "Conditions" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [
          { name: "Member Lookup" },
          { name: "Letter Request" },
          { name: "Edit Billed Through Date..." },
          { name: "Edit Paid Through Date..." },
          { name: "D/C Information" },
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
          { name: "2 Member Billing" },
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
  onMenuItemClick(event: any) {

    if (event.menu.menuItem === "Special") {
      // handle File actions
      switch (event.action) {
        case "Member Lookup": {
          this.openLookupFieldSearchModel();
          break;
        }
        case 'Edit Billed Through Date...': {
          let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_MEMBER_BL_THRU);
          if (status) {
            if (this.searchStatus) {
              this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
              );
            } else {
              this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
              });
            }
          }
          else {
            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
              this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
            });
          }
          break;
        }


        case 'Edit Paid Through Date...': {

          let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_MEMBER_PD_THRU);
          if (status) {
            if (this.searchStatus) {
              this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
              );
            } else {
              this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
              });
            }

          }
          else {
            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
              this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
            });
          }
          break;
        }

        case 'D/C Information': {
          let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DC_INFO);
          if (status) {
            if (this.searchStatus) {
              this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
              );
            } else {
              this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
              });
            }

          }
          else {
            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
              this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
            });
          }
          break;
        }


        default: {
          this.toastService.showToast(
            "Action is in progress",
            NgbToastType.Danger
          );
          break;
        }
      }
    }

    else if (event.menu.menuItem === "Topic") {
      this.sharedService.onMemberModuleTopicMenuClick(
        event.action,
        "Billing Control",
        this.activeModal,
        this.memberMaster ? this.memberBillingForm.get('subscriberId').value : '',
        this.selectedMember ? this.selectedMember : ''
      );
    }

    else if (event.menu.menuItem === "File") {
      switch (event.action) {
        case "Save": {
          this.submitForm();
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

          let status = this.functionalLevelSecurityService.isFunctionIdExist(
            CONSTANTS.F_AUDIT,
            this.winID
          );
          if (status) {
            if (this.searchStatus) {
              let ref = this.modalService.open(AuditDisplayComponent, {
                size: "lg",
              });
              ref.componentInstance.keyNames = this.keyNames;
              ref.componentInstance.keyValues = this.keyValues;
              ref.componentInstance.winID = this.winID;
              ref.componentInstance.showIcon = true;
            } else {
              this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.alertMessage = this.alertMessageService.error(
                    "30164: " + message[0].messageText
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
      }
    } else if (event.menu.menuItem === "Help") {
        this.handleHelpMenu();
    } else {
      // handle Edit-Menu Actions
      this.toastService.showToast("Action is in progress", NgbToastType.Danger);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.memberBillingForm = this.formBuilder.group(
      {
        diamondId: ["", { updateOn: "blur", validators: [] }],
        subscriberId: ["", { updateOn: "blur", validators: [] }],
        billingBegin: ["", { updateOn: "blur", validators: [] }],
        billedThrough: ["", { updateOn: "blur", validators: [] }],
        useEft: ["", { updateOn: "blur", validators: [] }],
        paidThrough: ["", { updateOn: "blur", validators: [] }],
        ovrCode: ["", { updateOn: "blur", validators: [Validators.required] }],
        ovrAmount: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        ovrStep: ["", { updateOn: "blur", validators: [Validators.required] }],
      },
      { updateOn: "submit" }
    );
  }

  submitForm() {
    if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
      this.formValidation.validateForm();
      if (this.memberBillingForm.valid) {
        let actualValue = this.mask.removeDollar(
            this.memberBillingForm.get("ovrAmount").value
        );
        this.memberEligHistory.billedThruDate = Form.getDatePickerValue(
            this.memberBillingForm,
            "billedThrough"
        );
        this.memberEligHistory.paidThruDate = Form.getDatePickerValue(
            this.memberBillingForm,
            "paidThrough"
        );
        this.memberEligHistory.premOverrideAmt = parseInt(
            actualValue.replace(",", "")
        );
        this.memberEligHistory.premOverrideCode = this.memberBillingForm.get(
            "ovrCode"
        ).value;
        this.memberEligHistory.premOverrideStep = this.memberBillingForm.get(
            "ovrStep"
        ).value;

        this.memberEligHistoryService
        .updateMemberEligHistory(
            this.memberEligHistory,
            this.memberEligHistory.memberEligHistoryPrimaryKey.seqEligHist,
            this.memberEligHistory.memberEligHistoryPrimaryKey.seqMembId
        )
        .subscribe(
            (response) => {
              this.toastService.showToast(
                  "Record successfully updated.",
                  NgbToastType.Success
              );
              this.formDataChangeStatus = false;
              if (this.isScreenCloseRequest === true) {
                setTimeout(() => {
                  this.activeModal.close()
                }, 2000)
              }
            }
        );
      } else {
        this.toastService.showToast(
            "Required information is missing or incomplete. Please correct your entries and try again.",
            NgbToastType.Danger
        );
      }
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getMemberMasters() {
    this.memberMasterService.getMemberMasters().subscribe(
      (memberMasters) => {
        this.memberMasters = memberMasters;
        this.dataGrid001GridOptions.api.setRowData(this.memberMasters);
        if (this.memberMasters.length > 0) {
          this.dataGrid001GridOptions.api.forEachNode((node) =>
            node.rowIndex ? 0 : node.setSelected(true)
          );
        }
      }
    );
  }

  getMemberOtherCoverages() {
    this.memberOtherCoverageService.getMemberOtherCoverages().subscribe(
      (memberOtherCoverage) => {
        this.memberOtherCoverage = memberOtherCoverage;
        this.dataGrid002GridOptions.api.setRowData(this.memberOtherCoverage);
      }
    );
  }

  onChangeSubscriberId(event: any) {
    this.memberBillingForm.patchValue({ subscriberId: event.target.value });
    this.getMemberMastersBySubscribeId(event.target.value, null);
  }

  loadGrids() {
    this.memberMasterService
      .findByDiamondAndSubscriberId(
        this.memberBillingForm.get("diamondId").value,
        this.memberBillingForm.get("subscriberId").value
      )
      .subscribe(
        (memberMasters: MemberMaster[]) => {
          let data = memberMasters;
          this.dataGrid001GridOptions.api.setRowData(data);
          let seqId = this.memberBillingForm.get("subscriberId").value;
          if (seqId !== "") {
            this.getMemberEligibleHistoryByMemberMasterId(seqId);
            //this.dataGrid001GridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
            //this.dataGrid001GridOptions.api.selectAll();
          }
        }
      );
  }

  getMemberOtherCoveragebyMemberMasterId(seqMembId: any) {
    this.memberOtherCoverageService
      .getMemberOtherCoveragesBySubId(seqMembId)
      .subscribe(
        (memberOtherCoverage) => {
          this.memberOtherCoverage = memberOtherCoverage;
          this.dataGrid002GridOptions.api.setRowData(this.memberOtherCoverage);
        }
      );
  }

  onSelectionChanged(event: any) {
    let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    //this.getMemberEligibleHistoryByMemberMasterId(selectedRows[0].subscriberId);
    this.dataGrid002GridOptions.api.showLoadingOverlay();
    if (selectedRows.length > 0) {
      this.searchStatus = true;
      this.keyValues = selectedRows[0].subscriberId;
      this.selectedRow = selectedRows[0];
      this.getMemberEligibleHistoryBySubscriberIdAndPersonNo(
        selectedRows[0].subscriberId,
        selectedRows[0].personNumber
      );
    } else {
      this.searchStatus = false;
      this.keyValues = "";
      this.selectedRow = "";
      this.getMemberEligibleHistoryBySubscriberIdAndPersonNo(null, null);
    }
  }

  getMemberEligibleHistoryByMemberMasterId(subscriberId: any) {
    this.memberEligHistoryService
      .getMemberEligHistory(subscriberId, null)
      .subscribe(
        (memberEligHistories) => {
          if(memberEligHistories.length > 0) {
            this.memberEligHistory = memberEligHistories[0];
            if (this.memberEligHistory !== null) {
              if (this.memberEligHistory.seqGroupId !== null) {
                setTimeout(() => {
                  this.groupId = this.getGroupMaster(
                    this.memberEligHistory.seqGroupId
                  );
                });
              } else {
                this.memberEligHistories.push(this.memberEligHistory);
                this.dataGrid002GridOptions.api.setRowData(
                  this.memberEligHistories
                );
              }
            } else {
              this.memberEligHistories = [];
              this.dataGrid002GridOptions.api.setRowData([]);
            }
          }
        },
        (error) => {
          this.dataGrid002GridOptions.api.setRowData([]);
        }
      );
  }

  getMemberEligibleHistoryBySubscriberIdAndPersonNo(subscriberId: any, personNo: any) {
    this.memberEligHistoryService
      .getMemberEligHistory(subscriberId, personNo)
      .subscribe(
        (memberEligHistories) => {
          if(memberEligHistories && memberEligHistories.length >0 ) {
            this.memberEligHistory = new MemberEligHistory();
            this.memberEligHistory = memberEligHistories[0];
            if (this.memberEligHistory !== null) {
              if (this.memberEligHistory.seqGroupId !== null) {
                setTimeout(() => {
                  this.groupId = this.getGroupMaster(
                    this.memberEligHistory.seqGroupId
                  );
                });
              } else {
                this.memberEligHistories.push(this.memberEligHistory);
                this.dataGrid002GridOptions.api.setRowData(
                  this.memberEligHistories
                );
              }
              this.setFormValues(this.memberEligHistory);
            } else {
              this.memberEligHistories = [];
              this.dataGrid002GridOptions.api.setRowData([]);
              this.setFormValues(this.memberEligHistory);
            }
          }
        },
        (error) => {
          this.dataGrid002GridOptions.api.setRowData([]);
        }
      );

  }

  getGroupMaster(seqGroupId: any) {
    this.groupMasterService.getGroupMaster(seqGroupId).subscribe(
      (groupMaster) => {
        this.groupMaster = groupMaster;
        this.memberEligHistories = [];
        this.dataGrid002GridOptions.api.setRowData([]);
        this.memberEligHistory.groupId = this.groupMaster.groupId;
        this.memberEligHistories.push(this.memberEligHistory);
        this.dataGrid002GridOptions.api.setRowData(this.memberEligHistories);
        this.dataGrid002GridOptions.api.selectAll();
      },
      (error) => {
        this.memberEligHistories = [];
        this.dataGrid002GridOptions.api.setRowData([]);
        this.memberEligHistories.push(this.memberEligHistory);
        this.dataGrid002GridOptions.api.setRowData(this.memberEligHistories);
      }
    );
  }

  onLookupFieldChange(event: any) {
    if (event.key === "F5") {
      event.preventDefault();
      this.openLookupFieldSearchModel();
    }
  }

  /**
   * Generic Search Model
   */
  openLookupFieldSearchModel() {
    let ref = this.modalService.open(LookupComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      this.memberBillingForm.patchValue({
        subscriberId: res.subscriberId,
      });
      this.selectedMember = res.personNumber;
      if (res !== undefined) {
        this.getMemberMastersBySubscribeId(res.subscriberId, res.personNumber);
        this.getMemberEligibleHistoryBySubscriberIdAndPersonNo(
          res.subscriberId,
          res.personNumber
        );
      } else {
        this.getMemberMastersBySubscribeId(null, null);
        this.getMemberEligibleHistoryBySubscriberIdAndPersonNo(null, null);
      }
    });
  }

  getMemberMastersBySubscribeId(subscriberId: any, personNumber: any) {
    this.memberMasterService
      .findByDiamondAndSubscriberId(null, subscriberId)
      .subscribe(
        (memberMasters) => {
          if (memberMasters && memberMasters.length > 1) {
            this.memberMasterLength = memberMasters.length - 1;
          }
          this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex(key => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
          this.dataGrid001GridOptions.api.setRowData(memberMasters);
          if (this.memberMasters != null) {
            this.dataGrid001GridOptions.api.selectIndex(this.selectedMember ? memberMasters.findIndex(key => key.seqMembId == this.selectedMember) : 0, false, false);
          } else {
            this.getMemberMasters();
          }
        }
      );
  }

  getGroupTypes() {
    this.dddwDtlService
      .findByColumnNameAndDwname("cprem_override_code", "dw_membb_de")
      .subscribe(
        (dddwDtls) => {
          this.dddwDtls = dddwDtls;
        }
      );
  }

  setFormValues(memberEligHistory: MemberEligHistory) {
    let amountConverted = this.currencyPipe.transform(
      memberEligHistory.premOverrideAmt
    );

    this.memberBillingForm.patchValue({
      billedThrough: this.dateFormatPipe.defaultDisplayDateFormat(
        memberEligHistory.billedThruDate
      ),
      // 'useEft':memberEligHistory.useEftFlg,
      paidThrough: this.dateFormatPipe.defaultDisplayDateFormat(
        memberEligHistory.paidThruDate
      ),
      ovrCode: memberEligHistory.premOverrideCode,
      ovrAmount: amountConverted,
      ovrStep: memberEligHistory.premOverrideStep,
    }, {emitEvent: false});
    this.isFormValidateStatus();
  }

  onSelectionGrid2Changed(event: any) {
    let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
    if (selectedRows.length == 0) {
      this.setFormValues(new MemberEligHistory());
    }
  }

  setCurrency(event: any) {
    let amount = event.target.value;
    this.memberBillingForm.patchValue({
      ovrAmount: this.currencyPipe.transform(amount),
    });
  }

  validateValue(event: any) {
    let ovrstepValue = event.target.value;
    if (ovrstepValue > 5) {
      this.memberBillingForm.patchValue({
        ovrStep: "",
      });
      this.toastService.showToast(
        "Enter member's rate stop code between 1-5 to be overidden",
        NgbToastType.Danger
      );
    }
  }

    handleHelpMenu() {
        const modalRef = this.modalService.open(HelpComponent, {
            windowClass: "myCustomModalClass",
            ...NGBModalOptions,
        });
        modalRef.componentInstance.currentWin = "MEMBB_Member_Billing_Information.htm";
    };

  modalClose = () => {
    this.isScreenCloseRequest = true;
    if (this.formDataChangeStatus === true) {
      this.messageService
          .findByMessageId(29065)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopupAlert(message[0].messageText, 'Member Billing');
          });
    } else {
      this.activeModal.close();
    }
  };

  showPopupAlert(message: any, title: any) {
    let popUpMessage = new PopUpMessage(
        "popUpMessageName",
        title,
        message,
        "icon"
    );
    popUpMessage.buttons.push(
        new PopUpMessageButton("Yes", "Yes", "")
    );
    popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
    popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;

    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === "Yes") {
        this.submitForm()
      } else if (resp.name === "No") {
        this.activeModal.close();
      } else if (resp.name === "Cancel") {

      }
    });
  };

  isFormValidateStatus = () => {
    this.memberBillingForm.valueChanges.subscribe(() => {
      this.formDataChangeStatus = true;
    })
  };

}
