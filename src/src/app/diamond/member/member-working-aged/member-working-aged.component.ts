/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe, Location } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { Menu, SearchModel } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { MemberWorkingAgedService } from '../../../api-services/member-working-aged.service';
import { MemberWorkingAged } from '../../../api-models/member-working-aged.model';
import { MemberMasterService } from '../../../api-services/member-master.service';
import { MemberMaster, MessageMasterDtl } from '../../../api-models';
import { MemberMasterLookup } from "../../../shared/lookup/member-master-lookup";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SearchboxComponent } from "../../../shared/components/searchbox/searchbox.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
    CONSTANTS,
    getMemberMedicareShortcutKeys,
    getMemberWorkingAgedShortcutKeys,
    SharedService
} from '../../../shared/services/shared.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { MessageMasterDtlService } from '../../../api-services';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";
import {HelpComponent} from "../help/help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";

// Use the Component directive to define the MemberWorkingAgedComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "memberworkingaged",
  templateUrl: "./member-working-aged.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    MemberWorkingAgedService,
    MemberMasterService,
  ],
})
export class MemberWorkingAgedComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  public memberWorkingAgedForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public menu: Menu[] = [];
  @Input() showIcon: boolean = false;
  public popUpMessage: PopUpMessage;
  public displayMessage: any;

  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;

  public dataGridGridOptions1: GridOptions;
  private dataGridgridApi1: any;
  sub: any;

  @Input() winID?: string;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;
  @Input() SubID?: string;
  @Input() selectedMember?: string;
  memberMaster: MemberMaster;
  memberMasterLength = 0;

  searchModel = new SearchModel(
    "membermasters/lookup",
    MemberMasterLookup.MEMBER_MASTER_ALL,
    MemberMasterLookup.MEMBER_MASTER_DEFAULT,
    []
  );

  searchStatus: boolean = false;
  keyNames: string = "subscriber_id";
  keyValues: any;
    public shortcuts: ShortcutInput[] = [];
  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private router: Router,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private toastService: ToastService,
    private memberWorkingAgedService: MemberWorkingAgedService,
    private memberMasterService: MemberMasterService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private location: Location,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService,
    private cdr: ChangeDetectorRef,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.memberWorkingAgedForm);
    this.createDataGrid();
    this.createDataGrid1();
    this.menuInit();
    this.sub = this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.memberWorkingAgedForm.patchValue({
          subscriberId: params["id"],
        });
        this.findByDiamondAndSubscriberId();
        this.location.replaceState("diamond/member/member-working-aged");
      }
      // In a real app: dispatch action to load the details here.
    });
    if (this.SubID) {
      this.memberWorkingAgedForm.patchValue({
        subscriberId: this.SubID,
      });
      this.findByDiamondAndSubscriberId();
    }
  }

  onChangeSubscriberId(event: any) {
    this.memberWorkingAgedForm.patchValue({ subscriberId: event.target.value });
    this.findByDiamondAndSubscriberId();
  }

  onChangeDiamondId(event: any) {
    this.memberWorkingAgedForm.patchValue({ diamondId: event.target.value });
    this.findByDiamondAndSubscriberId();
  }

  onRowSelected(event: any) {
    if (!event.node.selected) {
      this.searchStatus = false;
      this.keyValues = "";
      return;
    }

    var selectedRows = this.dataGridGridOptions1.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.searchStatus = true;
      this.keyValues = selectedRows[0].subscriberId;
    }
    this.dataGridGridOptions.api.showLoadingOverlay();
    this.loadWorkingAgedData(event.data.seqMembId);
  }

  public popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  public dataGridGridOptionsExportCsv() {
    const params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  public gridReadyEvent1(params: AgGridEvent) {
    this.dataGridgridApi1 = params.api;
    this.loadGrid1(params);
  }

  private loadGrid1(agGridEvent?: AgGridEvent) {
    if (agGridEvent) {
      this.findByDiamondAndSubscriberId();
    }
  }

  private findByDiamondAndSubscriberId() {
    let diamondId = this.memberWorkingAgedForm.get('diamondId').value ? this.memberWorkingAgedForm.get('diamondId').value: null ;
    let subscriberId = this.memberWorkingAgedForm.get('subscriberId').value;
    if (subscriberId || diamondId ) {
      this.memberMasterService
        .findByDiamondAndSubscriberId(
          diamondId,
          subscriberId
        )
        .subscribe(
          (memberMasters) => {
            if (memberMasters && memberMasters.length > 1) {
              this.memberMasterLength = memberMasters.length - 1;
            }
            this.memberMaster = this.selectedMember ? memberMasters[memberMasters.findIndex(key => key.personNumber == this.selectedMember)] : memberMasters[this.memberMasterLength];
            this.dataGridGridOptions1.api.setRowData(memberMasters);
            this.dataGridGridOptions1.api.selectIndex(this.selectedMember ? memberMasters.findIndex(key => key.seqMembId == this.selectedMember) : 0, false, false);
            let selectedRows = this.dataGridGridOptions1.api.getSelectedRows();
            if (selectedRows[0] !== undefined) {
              this.searchStatus = true;
              this.keyValues = selectedRows[0].subscriberId;
              this.dataGridGridOptions.api.showLoadingOverlay();
              this.loadWorkingAgedData(selectedRows[0].seqMembId);
            }
          }
        );
    } else {
      this.dataGridGridOptions1.api.setRowData([]);
    }
  }

  public gridReadyEvent(params: AgGridEvent) {
    this.dataGridgridApi = params.api;
    this.loadGrid(params);
  }

  private loadGrid(agGridEvent?: AgGridEvent) {
    this.dataGridgridApi.setRowData([]);
  }

  private loadWorkingAgedData(masterSeqMembId: any) {
    this.memberWorkingAgedService.findBySeqMembId(masterSeqMembId).subscribe(
      (workingAgeds: MemberWorkingAged[]) => {
        this.dataGridgridApi.setRowData(workingAgeds);
      }
    );
  }

  private showPopUp() {
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

  private popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === "yes") {
      console.log("button yes has been click!");
    }
    if (button.name === "no") {
      console.log("button No has been click!");
    }
  }

  private createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
      // onGridReady: () => {
      //   if(this.SubID) {
      //     this.dataGridGridOptions.api.showLoadingOverlay();
      //   }
      // }
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Survey Eff Dt",
        field: "surveyEffectiveDate",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Survey Term Dt",
        field: "surveyTermDate",
      },
      {
        headerName: "Date Sent",
        field: "dateSent",
      },
      {
        headerName: "Date Rec",
        field: "dateReceived",
      },
    ];
  }

  private createDataGrid1(): void {
    this.dataGridGridOptions1 = {
      paginationPageSize: 50,
      // onGridReady: () => {
      //   if(this.SubID) {
      //     this.dataGridGridOptions1.api.showLoadingOverlay();
      //   }
      // }
    };
    this.dataGridGridOptions1.editType = "fullRow";
    this.dataGridGridOptions1.columnDefs = [
      {
        headerName: "Person No",
        field: "personNumber",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        width: 150,
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
        width: 100,
      },
      {
        headerName: "Employee",
        field: "employeeNo",
        width: 140,
      },
    ];
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  private createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.memberWorkingAgedForm = this.formBuilder.group(
      {
        diamondId: ["", { updateOn: "blur", validators: [] }],
        subscriberId: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  /**
   * Handle Menu Actions
   * @param event: {action: string, menu: MenuItem}
   */
  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          //statements;
          break;
        }
        case "Open": {
          //statements;
          break;
        }
        case "Save": {
          //statements;
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
      // add method to handle Edit actions
    } else if (event.menu.menuItem === "Special") {
      // handle File actions
      switch (event.action) {
        case "Member Lookup": {
          this.openLookupPage();
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
    } else if (event.menu.menuItem === 'Topic') {
      this.sharedService.onMemberModuleTopicMenuClick(
          event.action,
          'Working Aged',
          this.activeModal,
          this.memberMaster ? this.memberWorkingAgedForm.get('subscriberId').value : '',
          this.selectedMember ? this.selectedMember : ''
      );
      // this.handleTopicMenu(event.action);
    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }

        case "Audit Display": {
          if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
              CONSTANTS.F_AUDIT,
              this.winID
            );
            if (status) {
              let ref = this.modalService.open(AuditDisplayComponent, {
                size: "lg",
              });
              ref.componentInstance.keyNames = this.keyNames;
              ref.componentInstance.keyValues = this.keyValues;
              ref.componentInstance.winID = this.winID;
              ref.componentInstance.showIcon = true;
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
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  "30164: " + message[0].messageText
                );
              });
          }

          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen();
    }

    else {
      // handle Edit-Menu Actions
      this.toastService.showToast("Action is in progress", NgbToastType.Danger);
    }
  }

  openLookupPage() {
    let ref = this.modalService.open(LookupComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      this.memberWorkingAgedForm.patchValue({
        subscriberId: resp.subscriberId,
        diamondId: resp.diamondId,
      });
      this.selectedMember = resp.personNumber;
      this.findByDiamondAndSubscriberId();
    });
  }

  menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open" },
          { name: "Delete" },
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
          { name: 'M+C Information' },
          { name: "Working Aged" },
          { name: "Billing Control" },
          { name: "Conditions" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [{ name: "Member Lookup" }],
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
          { name: "2 Member Working Aged" },
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

  onLookupFieldChange(event: any) {
    if (event.key === 'F5') {
      event.preventDefault();
      this.openLookupPage();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.memberWorkingAgedForm.patchValue({ subscriberId: event.target.value });
      this.findByDiamondAndSubscriberId();
    }
  }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getMemberWorkingAgedShortcutKeys(this));
        this.cdr.detectChanges();
    }

  helpScreen = () => {
      const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.currentWin = '/MEMWA_Working_Aged.htm';
  }
}
