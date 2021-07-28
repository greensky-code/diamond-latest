import { ChangeDetectorRef } from '@angular/core';
import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import {DddwDtl, MessageMasterDtl, ProvMaster, SecUser, SecWin} from '../../../api-models';
import { AuthSecondOpinionPrimaryKey } from '../../../api-models/auth-second-opinion-primary-key';
import { AuthMaster } from '../../../api-models/authorization/auth-master.model';
import { AuthSecondOpinion } from '../../../api-models/security/auth-second-opinion.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import {AuthMasterService, DddwDtlService, MessageMasterDtlService, ProvMasterService} from '../../../api-services';
import { AuthSecondOpinionService } from '../../../api-services/auth-second-opinion.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AuthCodesLookup } from '../../../shared/lookup/auth-code-lookup';
import { AuthMasterLookup } from '../../../shared/lookup/auth-master-lookup';
import { InstitutionalAuthNumberLookup } from '../../../shared/lookup/institutional-auth-number-lookup';
import { ProviderMasterLookup } from '../../../shared/lookup/provider-master-lookup';
import { Menu, SearchModel } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { getAuthorizationSecondOpinionShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {MemberMasterService} from "../../../api-services/member-master.service";
import {ReasonCodeMasterCustomLookup} from '../../../shared/lookup/reason-code-master-lookup';
import {SearchService} from "../../../shared/services/search.service";

@Component({
  selector: 'app-authorization-second-opinion',
  templateUrl: './authorization-second-opinion.component.html',
  styleUrls: ['./authorization-second-opinion.component.css']
})
export class AuthorizationSecondOpinionComponent implements OnInit {

  authorizationSecondOpinionForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = '';
  public isSuperUser = false;
  public secProgress = true;

  dddwDtls: DddwDtl[] = [];
  public menu: Menu[] = [];

  editAuthMaster: boolean;
  authMaster: AuthMaster;
  authMasters: AuthMaster[];
  editAuthSecondOpinion: boolean = true;
  authSecondOpinion: AuthSecondOpinion;
  authSecondOpinions: AuthSecondOpinion[];

  seqProvId: any;
  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

  public shortcuts: ShortcutInput[] = [];
  certificationsTypes: any[] = [];
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
  @Input() showIcon: boolean = false;



  lookupAction: number = 1;

  authNumber: any;
  inProgress = true;
  userTemplateId: string;
  secColDetails = new Array<SecColDetail>();
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    authSecondOptionData: any;

  authNumberSearchMdel = new SearchModel(
    'instclaimheaders/lookup/authNumber',
    InstitutionalAuthNumberLookup.ALL,
    InstitutionalAuthNumberLookup.DEFAULT,
    [],
    true
  );

  private searchModel = new SearchModel(
    'provmasters/lookup2',
    ProviderMasterLookup.PROVIDER_MASTER_ALL2,
    ProviderMasterLookup.PROVIDER_MASTER_DEFAULT2,
    [],
    true
  );

  advisorDecisionSearchModel = new SearchModel(
    'authcodes/lookup/DC',
    AuthCodesLookup.AUTH_CODE_ALL,
    AuthCodesLookup.AUTH_CODE_DEFAULT,
    [],
    true
  );

  ReasonCodeMasterSearchModal = new SearchModel(
    'reasoncodemasters/lookupAll',
    ReasonCodeMasterCustomLookup.REASONCODE_MASTER_ALL,
    ReasonCodeMasterCustomLookup.REASONCODE_MASTER_DEFAULT,
    []
  );

  secondOpinionSearchModel = new SearchModel(
    'authcodes/lookup/RC',
    AuthCodesLookup.AUTH_CODE_ALL,
    AuthCodesLookup.AUTH_CODE_DEFAULT,
    [],
    true
  );

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  firstName: string;
  lastName: string;
    shortName1: string;
    @ViewChild('secondOpinionDateEl') mouseFocus: any;
    @ViewChild('statusElf') statusFocus: any;
    consultantStatus: Boolean = false;
    reasonStatus: Boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private authMasterService: AuthMasterService,
    private authSecondOpinionService: AuthSecondOpinionService,
    private secUserService: SecUserService,
    private cdr: ChangeDetectorRef,
    private dddwDtlService: DddwDtlService,
    private toastService: ToastService,
    private router: Router,
    private secColDetailService: SecColDetailService,
    public activeModal: NgbActiveModal,
    private messageService: MessageMasterDtlService,
    private memberEligHistoryService: MemberEligHistoryService,
    private memberMasterService: MemberMasterService,
    private MemberEligHistoryService: MemberEligHistoryService,
    private provMasterService: ProvMasterService,
  ) { }

  ngOnInit(): void {
    this.hasPermission();
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
          { name: "Next", disabled: true },
          { name: "Previous", disabled: true },
          { isHorizontal: true },
          { name: "Lookup" },
          { name: "Next Topic", disabled: true },
          { name: "Previous Topic", disabled: true }
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Auth Master", disabled: true },
          { name: "Days Vists Update", disabled: true },
          { name: "Procedure", disabled: true },
          { name: "Appeal", disabled: true },
          { name: "Physician Advisor", disabled: true },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [
          { name: "AUth Lookup", disabled: true },
          { name: "Send To Case Management", disabled: true },
          { name: "View Claims with Auth Number ", disabled: true }
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
          { name: "2 Authorization Second Opinion" },
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
          this.createNewAuthSecondOpinion();
          break;
        }
        case "Open": {
          // statements;
          break;
        }
        case "Save": {
          this.saveAuthSecondOpinion();
          break;
        }
        case "Close": {
          this.createNewAuthSecondOpinion();
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

    } else if (event.menu.menuItem === "Topic") {
      // handle Topic-Menu Actions


    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
      switch (event.action) {
        case "View Credit Balance": {

          break;
        }

        case "Provider Relationships...": {

          break;
        }
        case "Adv Pay Rules": {

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


          break;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getAuthorizationSecondOpinionShortcutKeys(this));
    this.cdr.detectChanges();
  }


  createAuthMaster() {
    this.formValidation.validateForm();
    if (this.authorizationSecondOpinionForm.valid) {
      let authMaster = new AuthMaster();
      authMaster.authNumber = Form.getValue(this.authorizationSecondOpinionForm, 'authNumber');
      authMaster.requestedDate = Form.getValue(this.authorizationSecondOpinionForm, 'reqDate');
      authMaster.authType = Form.getValue(this.authorizationSecondOpinionForm, 'authType');
      authMaster.authLevel = Form.getValue(this.authorizationSecondOpinionForm, 'leverl');
      authMaster.tplCode = Form.getValue(this.authorizationSecondOpinionForm, 'tplCode');
      authMaster.privacyApplied = Form.getValue(this.authorizationSecondOpinionForm, 'privacyMaApply');
      authMaster.memberAge = Form.getValue(this.authorizationSecondOpinionForm, 'memberId');
      authMaster.seqGroupId = Form.getValue(this.authorizationSecondOpinionForm, 'groupId');
      authMaster.planCode = Form.getValue(this.authorizationSecondOpinionForm, 'planCode');
      authMaster.nsSubscriberId = Form.getValue(this.authorizationSecondOpinionForm, 'nonSysSubscriberId');
      authMaster.certificationType = Form.getValue(this.authorizationSecondOpinionForm, 'certificationType');
      authMaster.paperworkAttached = Form.getValue(this.authorizationSecondOpinionForm, 'paperworkAttachment');
      this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully created.");
        this.editAuthMaster = false;
        this.isFormDataChangeStatus = false;
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close()
          }, 2000);
          this.isFormDataChangeStatus = false;
        }
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }

  popupClose: Boolean = false;
  closeStatus: Boolean = false;


  updateAuthMaster(secondaryAuthNo: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.authorizationSecondOpinionForm.valid) {
        let authMaster = new AuthMaster();
        authMaster.authNumber = Form.getValue(this.authorizationSecondOpinionForm, 'authNumber');
        authMaster.requestedDate = Form.getValue(this.authorizationSecondOpinionForm, 'reqDate');
        authMaster.authType = Form.getValue(this.authorizationSecondOpinionForm, 'authType');
        authMaster.authLevel = Form.getValue(this.authorizationSecondOpinionForm, 'leverl');
        authMaster.tplCode = Form.getValue(this.authorizationSecondOpinionForm, 'tplCode');
        authMaster.privacyApplied = Form.getValue(this.authorizationSecondOpinionForm, 'privacyMaApply');
        authMaster.memberAge = Form.getValue(this.authorizationSecondOpinionForm, 'memberId');
        authMaster.seqGroupId = Form.getValue(this.authorizationSecondOpinionForm, 'groupId');
        authMaster.planCode = Form.getValue(this.authorizationSecondOpinionForm, 'planCode');
        authMaster.nsSubscriberId = Form.getValue(this.authorizationSecondOpinionForm, 'nonSysSubscriberId');
        authMaster.certificationType = Form.getValue(this.authorizationSecondOpinionForm, 'certificationType');
        authMaster.paperworkAttached = Form.getValue(this.authorizationSecondOpinionForm, 'paperworkAttachment');
        this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
          this.isFormDataChangeStatus = false;
          this.editAuthMaster = false;
          this.alertMessage = this.alertMessageService.info("Record successfully updated.");
        }, error => {
          this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
        });
      } else {
        this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
      }
    } else {
      this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
    }
  }


  deleteAuthMaster(secondaryAuthNo: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp('Not permitted to delete', 'Group Master Security');
    } else {
      this.authMasterService.deleteAuthMaster(secondaryAuthNo).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
      });
    }
  }

  getAuthMaster(secondaryAuthNo: string) {
    this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe(authMaster => {
      //this.authMaster = authMaster;
      this.authorizationSecondOpinionForm.patchValue({
        'authNumber': this.authMaster.authNumber,
        'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
        'authType': this.authMaster.authType,
        'leverl': this.authMaster.authLevel,
        'tplCode': this.authMaster.tplCode,
        'privacyMaApply': this.authMaster.privacyApplied,
        'memberId': this.authMaster.memberAge,
        'groupId': this.authMaster.seqGroupId,
        'planCode': this.authMaster.planCode,
        'nonSysSubscriberId': this.authMaster.nsSubscriberId,
        'certificationType': this.authMaster.certificationType,
        'paperworkAttachment': this.authMaster.paperworkAttached,
      });
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  }


  getAuthMasters() {
    this.authMasterService.getAuthMasters().subscribe(authMasters => {
      this.authMasters = authMasters;
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
    });
  }


  createAuthSecondOpinion() {
    this.formValidation.validateForm();
    if (this.authorizationSecondOpinionForm.valid) {
      let authSecondOpinion = new AuthSecondOpinion();
      authSecondOpinion.authNumber = this.authNumber.authMasterPrimaryKey.authNumber;
      authSecondOpinion.secondaryAuthNo = this.authNumber.authMasterPrimaryKey.secondaryAuthNo;
      authSecondOpinion.seqProvId = this.seqProvId;
      authSecondOpinion.secondOpinion = Form.getValue(this.authorizationSecondOpinionForm, 'secondOpinion');
      authSecondOpinion.secondOpinionDate = Form.getDatePickerValue(this.authorizationSecondOpinionForm, 'secondOpinionDate');;
      authSecondOpinion.decision = Form.getValue(this.authorizationSecondOpinionForm, 'decision');
      authSecondOpinion.comments = Form.getValue(this.authorizationSecondOpinionForm, 'comments');
      authSecondOpinion.status = Form.getValue(this.authorizationSecondOpinionForm, 'status');
      this.authSecondOpinionService.createAuthSecondOpinion(authSecondOpinion).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully created.");
        let authNumber=Form.getValue(this.authorizationSecondOpinionForm, 'authNumber');
        this.getGrid2Data(authNumber);
        this.screenCloseRequest = false;
        this.isFormDataChangeStatus = false;
        this.editAuthSecondOpinion = false;
          if (this.screenCloseRequest === true) {
              setTimeout(() => {
                  this.activeModal.close()
              }, 2000);
              this.isFormDataChangeStatus = false;
          }
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }


  updateAuthSecondOpinion(authNumber: number) {
    // if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.authorizationSecondOpinionForm.valid) {
      let authSecondOpinion = new AuthSecondOpinion();
      authSecondOpinion.authNumber = Form.getValue(this.authorizationSecondOpinionForm, 'authNumber');
      console.log(this.authSecondOpinion);
      let authSecondOpinionPrimaryKey = new AuthSecondOpinionPrimaryKey();
      authSecondOpinionPrimaryKey.authNumber = this.authSecondOpinion.authSecondOpinionPrimaryKey.authNumber;
      authSecondOpinionPrimaryKey.secondaryAuthNo = this.authSecondOpinion.authSecondOpinionPrimaryKey.secondaryAuthNo;
      authSecondOpinionPrimaryKey.seqSecondOp = this.authSecondOpinion.authSecondOpinionPrimaryKey.seqSecondOp;
      authSecondOpinion.authSecondOpinionPrimaryKey = authSecondOpinionPrimaryKey;

      authSecondOpinion.seqProvId = this.seqProvId;
      authSecondOpinion.secondOpinion = Form.getValue(this.authorizationSecondOpinionForm, 'secondOpinion');
      authSecondOpinion.secondOpinionDate = Form.getDatePickerValue(this.authorizationSecondOpinionForm, 'secondOpinionDate');;
      authSecondOpinion.decision = Form.getValue(this.authorizationSecondOpinionForm, 'decision');
      authSecondOpinion.comments = Form.getValue(this.authorizationSecondOpinionForm, 'comments');
      authSecondOpinion.status = Form.getValue(this.authorizationSecondOpinionForm, 'status');
      authSecondOpinion.statusReason = Form.getValue(this.authorizationSecondOpinionForm, 'reason');
      this.authSecondOpinionService.updateAuthorizationSecondOpinion(authSecondOpinion, authNumber).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully updated.");
        let authNumber=Form.getValue(this.authorizationSecondOpinionForm, 'authNumber');
        this.getGrid2Data(authNumber);
        this.screenCloseRequest = false;
        this.isFormDataChangeStatus = false;
        this.editAuthSecondOpinion = false;
          if (this.screenCloseRequest === true) {
              setTimeout(() => {
                  this.activeModal.close()
              }, 2000);
              this.isFormDataChangeStatus = false;
          }
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
      });
    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
    // } else {
    //   this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
    // }
  }


  createNewAuthSecondOpinion() {
    this.authorizationSecondOpinionForm.patchValue({
      providerId: '',
      shortName: '',
      providerType: '',
      secondOpinionDate: '',
      decision: '',
      secondOpinion: '',
      status: '',
      comments: '',
        specialtyType: ''
    });
    this.authorizationSecondOpinionForm.get('specialType').reset();
    this.dataGrid002GridOptions.api.deselectAll();
    this.editAuthSecondOpinion = false;
  }

  saveAuthSecondOpinion() {
    if (this.editAuthSecondOpinion) {
      this.updateAuthSecondOpinion(this.authSecondOpinion.authNumber)
    } else {
      this.createAuthSecondOpinion();
    }
  }

  deleteAuthSecondOpinion(authNumber: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp('Not permitted to delete', 'Group Master Security');
    } else {
      this.authSecondOpinionService.deleteAuthSecondOpinion(authNumber).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
      });
    }
  }


  getAuthSecondOpinion(authNumber: number) {
    this.authSecondOpinionService.getAuthSecondOpinion(authNumber).subscribe(authSecondOpinion => {
      this.authSecondOpinion = authSecondOpinion;
      this.authorizationSecondOpinionForm.patchValue({
        'authNumber': this.authSecondOpinion.authNumber,
      });
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  }


  getAuthSecondOpinions() {
    this.authSecondOpinionService.getAuthSecondOpinions().subscribe(authSecondOpinions => {
      this.authSecondOpinions = authSecondOpinions;
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
    });
  }

  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;

  dataGrid001GridOptionsExportCsv() {
    var params = {
    };
    this.dataGrid001gridApi.exportDataAsCsv(params);
  }

  private dataGrid002gridApi: any;
  private dataGrid002gridColumnApi: any;

  dataGrid002GridOptionsExportCsv() {
    var params = {
    };
    this.dataGrid002gridApi.exportDataAsCsv(params);
  }

  createDataGrid001(): void {
    this.dataGrid001GridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGrid001GridOptions.editType = 'fullRow';
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Auth Number",
        field: "authMasterPrimaryKey.authNumber",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Secondary",
        field: "authMasterPrimaryKey.secondaryAuthNo",
        width: 200
      },
      {
        headerName: "Req Date",
        field: "requestedDate",
        width: 200
      },
      {
        headerName: "Type",
        field: "authType",
        width: 200
      },
      {
        headerName: 'Ext',
        field: 'activeDaysVisit',
        width: 200,
        cellRenderer: (params) => {
          if (params.data !== undefined) {
            const activeDaysVisit = params.data.activeDaysVisit;
            return activeDaysVisit && activeDaysVisit == 'Y' ? 'Yes' : 'No'
          }
        }
      },
      {
        headerName: 'Member ID',
        field: 'memberEligHistory.subscriberId',
        width: 200
      },
      {
        headerName: '',
        field: 'memberEligHistory.personNumber',
        width: 200
      },
      {
        headerName: 'DIAMOND ID',
        field: 'memberMaster.diamondId',
        width: 200
      },

      {
        headerName: 'Group ID',
        field: 'memberEligHistory.groupId',
        width: 200
      },
      {
        headerName: 'Plan Code',
        field: 'memberEligHistory.planCode',
        width: 200
      }
    ];
  }


  createDataGrid002(): void {
    this.dataGrid002GridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGrid002GridOptions.editType = 'fullRow';
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: "Consultant",
        field: "provMaster.providerId",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Name",
        field: "provMaster.shortName",
        width: 200
      },
      {
        headerName: "Date",
        field: "secondOpinionDate",
        width: 200
      },
      {
        headerName: "Second Opinion",
        field: "secondOpinion",
        width: 200
      },
      {
        headerName: "Pat Decision",
        field: "decision",
        width: 200
      },
      {
        headerName: "Status",
        field: "status",
        width: 200
      }
    ];
  }

  onRowSelectedGrid001(event: any) {
    if (!event.node.selected) {
      return;
    }
    this.getGrid1Data(event.data);
  }


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
                      'You are not Permitted to view Benefit Ruler',
                      'Benefit Rule Permission'
                  );
              }
          },
          (error) => {
              this.showPopUp(error, 'Window Error');
          }
      );
  }

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
        this.inProgress = false;
        return;
    }
    this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.inProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

}

  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    let useId = null;
    if (parsedToken) {
      useId = parsedToken.sub;
    }
    this.secWinService.getSecWin(this.windowId, useId).subscribe((secWin: SecWin) => {
      this.secWin = new SecWinViewModel(secWin);

      if (this.secWin.hasSelectPermission()) {
        this.initializeComponentState();
      } else {
        this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
      }
    });
  }

  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.authorizationSecondOpinionForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.getAllStatus();
    this.menuInit();
  }


  createForm() {
    this.authorizationSecondOpinionForm = this.formBuilder.group({
      authNumber: ['', { updateOn: 'blur', validators: [] }],
      reqDate: ['', { updateOn: 'blur', validators: [] }],
      authType: ['', { updateOn: 'blur', validators: [] }],
      level: ['', { updateOn: 'blur', validators: [] }],
      diamondId: ['', { updateOn: 'blur', validators: [] }],
      tplCode: ['', { updateOn: 'blur', validators: [] }],
      lob: ['', { updateOn: 'blur', validators: [] }],
      privacyMaApply: ['', { updateOn: 'blur', validators: [] }],
      memberId: ['', { updateOn: 'blur', validators: [] }],
      textbox: ['', { updateOn: 'blur', validators: [] }],
        lastName: ['', { updateOn: 'blur', validators: [] }],
        firstName: ['', { updateOn: 'blur', validators: [] }],
      age: ['', { updateOn: 'blur', validators: [] }],
      sex: ['', { updateOn: 'blur', validators: [] }],
      groupId: ['', { updateOn: 'blur', validators: [] }],
        shortName1: ['', { updateOn: 'blur', validators: [] }],
      planCode: ['', { updateOn: 'blur', validators: [] }],
      nonSysSubscriberId: ['', { updateOn: 'blur', validators: [] }],
      certificationType: ['', { updateOn: 'blur', validators: [] }],
      paperworkAttachment: ['', { updateOn: 'blur', validators: [] }],
      providerId: ['', { updateOn: 'blur', validators: [] }],
      shortName: ['', { updateOn: 'blur', validators: [] }],
      providerType: ['', { updateOn: 'blur', validators: [] }],
      secondOpinionDate: ['', { updateOn: 'blur', validators: [] }],
      specialtyType: ['', { updateOn: 'blur', validators: [] }],
      decision: ['', { updateOn: 'blur', validators: [] }],
        reason: ['', { updateOn : 'blur', validators: []}],
      secondOpinion: ['', { updateOn: 'blur', validators: [] }],
      status: ['', { updateOn: 'blur', validators: [] }],
      comments: ['', { updateOn: 'blur', validators: [] }]
    }, { updateOn: 'submit' });
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      console.log("button yes has been click!");
    }
    if (button.name == 'no') {
      console.log("button No has been click!");
    }
  }


  onLookupFieldChange(event: any) {
    if (event.key === 'F5') {
      event.preventDefault();

      if (this.lookupAction === 1) {
        this.openLookupVendorIdFieldSearchModel();
      }

      if (this.lookupAction === 2) {
        this.openLookupProviderMasterSearchModel();
      }

      if (this.lookupAction === 3) {
        this.openLookupSecondOpinionSearchModel();
      }

      if (this.lookupAction === 4) {
        this.openLookupDecisionSearchModel();
      }

    } else if (event.key === 'Tab') {
        if (event.target.value === '') {

        } else if(event.target.value && this.lookupAction !== 2) {
            event.preventDefault();
            this.getGrid1Data(event.target.value);
        }
        if (event.target.value && this.lookupAction === 2) {
            this.setProviderId(event.target.value);
        }
    }
  }

  openLookupVendorIdFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.authNumberSearchMdel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res) {
        this.getGrid1Data(res.AUTH_NUMBER);
        this.authorizationSecondOpinionForm.patchValue({
          authNumber: res.AUTH_NUMBER
        });
      }
    });
  }


  openLookupProviderMasterSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.authorizationSecondOpinionForm.patchValue({
          providerId: res.PROVIDER_ID,
          shortName: res.SHORT_NAME,
          providerType: res.PROVIDER_TYPE,
          specialtyType: res.SPECIALTY_TYPE
        });
        this.seqProvId = res.SEQ_PROV_ID;
      }
    });
  }

  openLookupDecisionSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.advisorDecisionSearchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.authorizationSecondOpinionForm.patchValue({
          decision: res.AUTH_CODE
        });
      }
    });
  }

  openLookupSecondOpinionSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.secondOpinionSearchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.lookupData.subscribe((resp: any) => {
      this.authSecondOptionData = resp;
    });
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.authorizationSecondOpinionForm.patchValue({
          secondOpinion: res.AUTH_CODE
        });
      }
    });
  }

  grid1SelectionChange() {
    let authMaster = new AuthMaster();
    var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      authMaster = selectedRows[0];
      this.setAuthMasterValues(authMaster);
    } else {
      this.setAuthMasterValues(authMaster);
    }
  }


  getGrid1Data(authNumber: any) {
      this.authMasterService.getAuthMaster(authNumber).subscribe((authProcMas: any[]) => {
          if (authProcMas) {
              for (let item of authProcMas) {
                  item.activeDaysVisit = item.activeDaysVisit ? 'Yes' : 'No';
              }
              this.authMasters = authProcMas;

              this.authMaster = this.authMasters[0];
              this.memberMasterService.findBySubscriberId(this.authMaster.memberEligHistory.subscriberId).subscribe(res => {
                if(res && res.length>0){
                  let memberMasterData = res[0];
                  this.MemberEligHistoryService.getSelectMemberGrid(memberMasterData.seqSubsId).subscribe(resp => {
                    if(resp && resp.length>0){ 
                    let memberEligHistroyData = resp[0];
                      this.memberEligHistoryService
                          .getMember_bavc(memberEligHistroyData.seqSubsId).subscribe(response => {
                          let memberBavcData = response[0];
                          this.lastName = memberMasterData['lastName'];
                          this.firstName = memberMasterData['firstName'];
                          this.shortName1 = memberBavcData['short_name'];
                          this.authMasters[0].memberEligHistory.groupId = memberEligHistroyData.groupId;
                          this.dataGrid001GridOptions.api.setRowData(this.authMasters);
                          this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                      })
                    }
                  })
                }
              })

          } else {
              if (this.lookupAction == 1) {
                  this.emptyDataPopup();
              }
          }
      }, error => {
          this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
      })

  }

  setAuthMasterValues(authMaster: AuthMaster) {
    this.authNumber = new AuthMaster();
    const certificationType = this.certificationsTypes.find(value => value.systemCode == authMaster.certificationType);
    this.authorizationSecondOpinionForm.patchValue({
      reqDate: authMaster.requestedDate,
      authType: authMaster.authType,
      level: authMaster.authLevel,
      pcpId: null,
      diamondId: authMaster.memberMaster?.diamondId,
      tplCode: authMaster.tplCode == 'NA' ? 'Not Applicable' : authMaster.tplCode,
      lob: authMaster.memberEligHistory?.lineOfBusiness,
      privacyMaApply: authMaster.privacyApplied,
      memberId: authMaster.memberEligHistory?.subscriberId,
      textbox: authMaster.memberEligHistory?.personNumber,
        lastName: authMaster.memberMaster?.lastName || this.lastName,
        firstName: authMaster.memberMaster?.firstName || this.firstName,
      age: authMaster.memberAge,
      sex: authMaster.memberGender,
      groupId: authMaster.memberEligHistory?.groupId,
        shortName1: authMaster.groupMaster?.shortName || this.shortName1,
      planCode: authMaster.memberEligHistory?.planCode,
      nonSysSubscriberId: authMaster.nsSubscriberId,
      certificationType: certificationType ? certificationType.systemCodeDesc1 : authMaster.certificationType,
      paperworkAttachment: authMaster.paperworkAttached == 'N' ? 'None' : authMaster.paperworkAttached,
      batchId: authMaster.batchId
    });
    this.authorizationSecondOpinionForm.get('authNumber').disable();
    this.authNumber = authMaster;
    this.getGrid2Data(authMaster.authMasterPrimaryKey?.authNumber);
  }


  getGrid2Data(authNumber: any) {
    this.authSecondOpinions = [];
    this.dataGrid002GridOptions.api.setRowData([]);
    this.authSecondOpinionService.getAuthSecondOpinionByAuthNumber(authNumber).subscribe((authSecondOpinions: any[]) => {
      this.authSecondOpinions = authSecondOpinions;
      this.dataGrid002GridOptions.api.setRowData(this.authSecondOpinions);
      this.dataGrid002GridOptions.api.selectIndex(0, false, false);
    }, error => {
      this.dataGrid002GridOptions.api.setRowData([]);
    });
  }


  grid2SelectionChange() {
    let authSecondOpinion = new AuthSecondOpinion();
    var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      authSecondOpinion = selectedRows[0];
      this.resetAuthSecondOpinion();
      this.setAuthSecondOpinionValues(authSecondOpinion);
      this.editAuthSecondOpinion = true;
      this.authSecondOpinion = authSecondOpinion;
    } else {
      this.setAuthSecondOpinionValues(authSecondOpinion);
      this.editAuthSecondOpinion = false;
      this.authSecondOpinion = authSecondOpinion;
      this.resetAuthSecondOpinion();
    }
  }


  setAuthSecondOpinionValues(authSecondOpinion: AuthSecondOpinion) {
    this.seqProvId = authSecondOpinion.provMaster?.seqProvId;
    this.authorizationSecondOpinionForm.patchValue({
      providerId: authSecondOpinion.provMaster?.providerId,
      shortName: authSecondOpinion.provMaster?.shortName,
      providerType: authSecondOpinion.provMaster?.providerType,
      specialtyType: authSecondOpinion.provMaster?.shortName.charAt(0) === 'D' ? 'DEN': 'GP',
      secondOpinionDate: this.dateFormatPipe.defaultDisplayDateFormat(authSecondOpinion.secondOpinionDate),
      decision: authSecondOpinion.decision,
      secondOpinion: authSecondOpinion.secondOpinion,
      status: authSecondOpinion.status,
      reason: authSecondOpinion.statusReason,
      comments: authSecondOpinion.comments
    }, {emitEvent: false});
    this.isFormDataModified()
  }


  resetAuthSecondOpinion() {
    this.authorizationSecondOpinionForm.patchValue({
      providerId: '',
      shortName: '',
      providerType: '',
      secondOpinionDate: '',
      decision: '',
      secondOpinion: '',
      status: '',
      comments: ''
    });
  }


  getAllStatus() {
    this.dddwDtlService
      .findByColumnNameAndDwname("status", "dw_auths_second_opinion_de")
      .subscribe(
        (dddwDtls) => {
          this.dddwDtls = dddwDtls;
        },
        (error) => {
        }
      );
  }

  setLookupAction(actionNo: number) {
    this.lookupAction = actionNo;
  }

    modalClose() {
        if  (this.isFormDataChangeStatus === true) {
          this.screenCloseRequest = true;
          this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Second Opinion')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try {
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
                    this.saveAuthSecondOpinion()
                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.authorizationSecondOpinionForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });
    }

    emptyDataPopup = () => {
        this.messageService.findByMessageId(9853).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage(
                'popUpMessageName',
                'Authorization Second Opinion',
                "9853: " + message[0].messageText,
                'icon');
            let ref = this.modalService.open(PopUpMessageComponent, {
                backdrop: false,
            });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            })
        });
    };

    private setProviderId(id: string){
        this.authorizationSecondOpinionForm.patchValue({
            'providerId': id.toUpperCase()
        });
        this.findByProviderId(id.toUpperCase());
    }

    private findByProviderId(providerId: string) {
        this.provMasterService.findByProviderId(providerId).subscribe((provMaster: ProvMaster) => {
            if (provMaster) {
              this.authorizationSecondOpinionForm.patchValue({
                  'shortName': provMaster.shortName,
                  'providerType': provMaster.providerType,
                  'specialtyType': provMaster?.shortName.charAt(0) === 'D' ? 'DEN': 'GP',
              });
              this.consultantStatus = true;
            } else {
              this.messageService.findByMessageId(9001).subscribe(resp => {
                  let popMsg = new PopUpMessage(
                      'ProvNotExistPopup',
                      'Authorization Second Opinion',
                      '9001 :' + resp[0].messageText.replace('@1', providerId),
                      'icon');
                  popMsg.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
                  let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                  ref.componentInstance.popupMessage = popMsg;
                  ref.componentInstance.showIcon = true;
                  ref.componentInstance['buttonclickEvent'].subscribe((button: PopUpMessageButton) => {
                      if (button.name === 'Ok') {

                      } else {
                      }
                  });
              });
            }
        }, (error: Error) => {
            console.log('error', error);
        });
    }

    onChangeLookupStatus = (event) => {
      if (event.key === 'Tab') {
          if (event.target.value === '') {
            this.messageService.findByMessageId(29032).subscribe(res => {
                this.statusFocus.nativeElement.focus();
                let popMsg = new PopUpMessage(
                    'ProvNotExistPopup',
                    'Authorization Second Opinion',
                    '29032 :' + res[0].messageText.replace('@1', 'status'),
                    'icon');
                popMsg.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;

            })
          }
      }
    };

    selectStatus = (event) => {
      this.reasonStatus = !(event.target.value === 'DN' || event.target.value === 'HD');
    }

    LookupReason(event: any, reason: any, action) {
      if (event.key === "F5") {
        event.preventDefault();
        let ref = this.modalService.open(SearchboxComponent);
        
          this.ReasonCodeMasterSearchModal.searchOption = [
            {
              REASON_CODE_TYPE: this.authorizationSecondOpinionForm.get(action).value,
            },
         ];
      
        ref.componentInstance.searchModel = this.ReasonCodeMasterSearchModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
          if (res != null) {
            console.log(res);
            this.authorizationSecondOpinionForm.get(reason).setValue(res.reasonCode);
            //  this.claimAuthProcLinkForm.get("authType").setValue(res.authType);
            //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
          }
        });
      }
    }
}
