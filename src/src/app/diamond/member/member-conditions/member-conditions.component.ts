/* Copyright (c) 2020 . All Rights Reserved. */

import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe, Location } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { MemberMasterService } from '../../../api-services/member-master.service';
import {MemberMaster, MessageMasterDtl, SecUser} from '../../../api-models';
import {NgbToastType} from 'ngb-toast';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Menu, SearchModel} from '../../../shared/models/models';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {ToastService} from '../../../shared/services/toast.service';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { MemberConditionsService, MessageMasterDtlService } from '../../../api-services';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { CONSTANTS, SharedService } from '../../../shared/services/shared.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecUserService} from '../../../api-services';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {MEM_MODULE_ID} from '../../../shared/app-constants';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";

// Use the Component directive to define the MemberConditionsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: 'memberconditions',
  templateUrl: './member-conditions.component.html',
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    MemberMasterService,
    MemberConditionsService
  ],
})
export class MemberConditionsComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  memberConditionsForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  private displayMessage: any;
  public popUpMessage: PopUpMessage;
  private memberMasters: MemberMaster[] = [];
  @Input() showIcon = false;
  @Input() winID?: string;
  menu: Menu[] = [];
  @ViewChild('popUpMesssage') child: PopUpMessageComponent;
  @Input() SubID?: string;
  @Input() selectedMember?: string;
  memberMaster: MemberMaster;
  memberMasterLength = 0;
  secWin: SecWinViewModel;
  windowId = 'MCOND';
  userTemplateId: string;
  memberModuleId = MEM_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  public dataGridGridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;

  searchModel = new SearchModel(
    'membermasters/lookup',
    MemberMasterLookup.MEMBER_MASTER_ALL,
    MemberMasterLookup.MEMBER_MASTER_DEFAULT,
    []
  );
  sub: any;

  searchStatus = false;
  keyNames = 'subscriber_id';
  keyValues: any;

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
    if (button.name === 'yes') {
      console.log('button yes has been click!');
    }
    if (button.name === 'no') {
      console.log('button No has been click!');
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === 'poUpMessageName') {
      this.popupMessageHandler(button);
    }
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: 'Person No',
        field: 'personNumber',
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: 'Last',
        field: 'lastName',
        width: 150,
      },
      {
        headerName: 'First',
        field: 'firstName',
        width: 150,
      },
      {
        headerName: 'DOB',
        field: 'dateOfBirth',
        width: 150,
      },
      {
        headerName: 'Gender',
        field: 'gender',
        width: 150,
      },
      {
        headerName: 'Employee Number',
        field: 'employeeNo',
        width: 200,
      },
      {
        headerName: 'Citizenship',
        field: 'country',
        width: 200,
      },
    ];
  }

  // Grid 002 Started

  createData002Grid(): void {
    this.dataGrid002GridOptions = {
      paginationPageSize: 50,
    };
    this.dataGrid002GridOptions.editType = 'fullRow';
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: 'Eff Date',
        field: '',
        width: 150,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: 'Term Date',
        field: '',
        width: 150,
      },
      {
        headerName: 'Diag Type',
        field: '',
        width: 150,
      },
      {
        headerName: 'From Value',
        field: '',
        width: 150,
      },
      {
        headerName: 'Thru Value',
        field: '',
        width: 150,
      },
      {
        headerName: 'Condition Type',
        field: '',
        width: 200,
      },
      {
        headerName: 'Action',
        field: '',
        width: 200,
      },
      {
        headerName: 'Reason',
        field: '',
        width: 200,
      },
    ];
  }

  //Grid 002 End

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private memberMasterService: MemberMasterService,
    private toastService: ToastService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService,
    private sharedService: SharedService,
    private memberConditionsService: MemberConditionsService
  ) {}

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
    this.formValidation = new FormValidation(this.memberConditionsForm);
    this.createDataGrid();
    this.createData002Grid();
    setTimeout(() => {
      // this.populateGrid001MemberMaster();
      this.dataGridGridOptions.api.setRowData([]);
      this.dataGrid002GridOptions.api.setRowData([]);
    });
    this.sub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.memberConditionsForm.patchValue({
          subscriberId: params['id'],
        });
        this.loadGrids();
        this.location.replaceState('diamond/member/condition');
      }
      // In a real app: dispatch action to load the details here.
    });
    if (this.SubID) {
      this.memberConditionsForm.patchValue({
        subscriberId: this.SubID,
      });
      this.loadGrids();
    }
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */
  hasPermission() {

    this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

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
                'You are not Permitted to view Member Conditions',
                'Member Conditions Permission'
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
    this.secColDetailService.findByTableNameAndUserId('MEMBER_CONDITIONS', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

  }

  menuInit() {
    this.menu = [
      {
        menuItem: 'File',
        dropdownItems: [
          { name: 'New' },
          { name: 'Open' },
          { name: 'Save' },
          { name: 'Close' },
          { name: '-' },
          { name: 'Main Menu' },
          { name: 'Shortcut Menu' },
          { isHorizontal: true },
          { name: 'Print', disabled: true },
          { isHorizontal: true },
          { name: 'Exit' },
        ],
      },
      {
        menuItem: 'Edit',
        dropdownItems: [
          { name: 'Undo', disabled: true },
          { isHorizontal: true },
          { name: 'Cut', disabled: true },
          { name: 'Copy', disabled: true },
          { name: 'Paste', disabled: true },
          { isHorizontal: true },
          { name: 'Next' },
          { name: 'Previous' },
          { isHorizontal: true },
          { name: 'Lookup' },
        ],
      },
      {
        menuItem: 'Topic',
        dropdownItems: [
          { name: 'Master File' },
          { name: 'Eligibility History' },
          { name: 'Coordination of Benefits' },
          { name: 'Alias/Responsible Party/Privacy' },
          { name: 'Member Address' },
          { name: 'M+C Information' },
          { name: 'Working Aged' },
          { name: 'Billing Control' },
          { name: 'Conditions' },
        ],
      },
      {
        menuItem: 'Special',
        dropdownItems: [{ name: 'Member Lookup' }],
      },
      {
        menuItem: 'Notes',
        dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: 'Windows',
        dropdownItems: [
          { name: 'Tile' },
          { name: 'Layer' },
          { name: 'Cascade' },
          { name: 'Arrange Icons' },
          { isHorizontal: true },
          { name: 'Show Timestamp' },
          { name: 'Audit Display' },
          { isHorizontal: true },
          { name: '1 Main Menu' },
          { name: '2 Member Conditions' },
        ],
      },
      {
        menuItem: 'Help',
        dropdownItems: [
          { name: 'Contents' },
          { name: 'Search for Help on...' },
          { name: 'This Window', shortcutKey: 'F1' },
          { isHorizontal: true },
          { name: 'Glossary' },
          { name: 'Getting Started' },
          { name: 'How to use Help' },
          { isHorizontal: true },
          { name: 'About Diamond Client/Server' },
        ],
      },
    ];
  }
  onMenuItemClick(event: any) {
    if (event.menu.menuItem === 'Special') {
      // handle File actions
      switch (event.action) {
        case 'Member Lookup': {
          this.openLookupPage();
          break;
        }
        default: {
          this.toastService.showToast(
            'Action is in progress',
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem === 'Windows') {
      switch (event.action) {
        case '1 Main Menu': {
          this.router.navigate(['diamond/functional-groups']);
          break;
        }
        case 'Audit Display': {
          if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
              CONSTANTS.F_AUDIT,
              this.winID
            );
            if (status) {
              let ref = this.modalService.open(AuditDisplayComponent, {
                size: 'lg',
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
                    '11073: ' + message[0].messageText
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.alertMessage = this.alertMessageService.error(
                  '30164: ' + message[0].messageText
                );
              });
          }
          break;
        }
      }
    } else if (event.menu.menuItem === 'Topic') {
      // handle Topic-Menu Actions
      this.sharedService.onMemberModuleTopicMenuClick(
          event.action,
          'Conditions',
          this.activeModal,
          this.memberMaster ? this.memberConditionsForm.get('subscriberId').value : '',
          this.selectedMember ? this.selectedMember : ''
        );
      // this.handleTopicMenu(event.action);
    } else {
      // handle Edit-Menu Actions
      this.toastService.showToast('Action is in progress', NgbToastType.Danger);
    }
  }
  openLookupPage() {
    let ref = this.modalService.open(LookupComponent);
    ref.componentInstance.showIcon = true;
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.onRowSelected.subscribe((resp: any) => {
      this.memberConditionsForm.patchValue({
        subscriberId: resp.subscriberId,
        diamondId: resp.diamondId,
      });
      this.selectedMember = resp.personNumber;
      this.loadGrids();
    });
  }

  loadGrids() {
    let diamondId = this.memberConditionsForm.get('diamondId').value ? this.memberConditionsForm.get('diamondId').value : null;
    let subscriberId = this.memberConditionsForm.get('subscriberId').value;
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
          this.dataGridGridOptions.api.setRowData(memberMasters);
          this.dataGridGridOptions.api.selectIndex(this.selectedMember ? memberMasters.findIndex(key => key.seqMembId == this.selectedMember) : 0, false, false);
        }
      );
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.memberConditionsForm = this.formBuilder.group(
      {
        diamondId: ['', { updateOn: 'blur', validators: [] }],
        subscriberId: ['', { updateOn: 'blur', validators: [] }],
        effectiveDate: ['', { updateOn: 'blur', validators: [] }],
        diagnosisType: ['', { updateOn: 'blur', validators: [] }],
        conditionType: ['', { updateOn: 'blur', validators: [] }],
        termDate: ['', { updateOn: 'blur', validators: [] }],
        fromValue: ['', { updateOn: 'blur', validators: [] }],
        claimAction: ['', { updateOn: 'blur', validators: [] }],
        termReason: ['', { updateOn: 'blur', validators: [] }],
        thruValue: ['', { updateOn: 'blur', validators: [] }],
        reason: ['', { updateOn: 'blur', validators: [] }],
        userDefined1: ['', { updateOn: 'blur', validators: [] }],
        userDefined2: ['', { updateOn: 'blur', validators: [] }],
        userDate2: ['', { updateOn: 'blur', validators: [] }],
        userDefined3: ['', { updateOn: 'blur', validators: [] }],
        userDate3: ['', { updateOn: 'blur', validators: [] }],
        userDefined4: ['', { updateOn: 'blur', validators: [] }],
        userDate4 : ['', { updateOn: 'blur', validators: [] }],
      },
      { updateOn: 'submit' }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onLookupFieldChange(event: any) {
    if (event.key === 'F5') {
      event.preventDefault();
      this.openLookupPage();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.memberConditionsForm.patchValue({
        'subscriberId': event.target.value
      });
      this.loadGrids();
    }
  }

  grid1SelectionChange() {
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.searchStatus = true;
      this.keyValues = selectedRows[0].seqSubsId;
      this.getMemberConditions();
    } else {
      this.searchStatus = false;
      this.keyValues = '';
    }
  }

  grid2SelectionChange() {
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.keyValues = selectedRows[0].seqMembId;
      let memberConditions = selectedRows[0];
      this.memberConditionsForm.patchValue({
        'effectiveDate': memberConditions.effectiveDate,
        'fromValue': memberConditions.fromValue,
        'diagnosisType': memberConditions.diagnosisType,
        'conditionType': memberConditions.conditionType ,
        'claimAction': memberConditions.claimAction,
        'termDate': memberConditions.termDate,
        'thruValue': memberConditions.thruValue,
        'claimReason': memberConditions.claimReason,
        'termReason': memberConditions.termReason,
        'userDefined1': memberConditions.userDefined1,
        'userDefined2': memberConditions.userDefined2,
        'userDefined3': memberConditions.userDefined3,
        'userDefined4': memberConditions.userDefined4,
        'userDate1': memberConditions.userDate1,
        'userDate2': memberConditions.userDate2,
        'userDate3': memberConditions.userDate3,
        'userDate4': memberConditions.userDate4
      });

    }
  }

  private getMemberConditions() {
    this.memberConditionsService.getMemberConditions(this.keyValues).subscribe(
      memberConditions => {
        this.dataGrid002GridOptions.api.setRowData(memberConditions);
        this.dataGrid002GridOptions.api.selectIndex(0, false, false);
      }
    );
  }
}
