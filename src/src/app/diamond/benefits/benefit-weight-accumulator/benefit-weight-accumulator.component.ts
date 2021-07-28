import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { BenefitAccumWeightService } from '../../../api-services/benefit-accum-weight.service';
import { BenefitAccumWeightDetailService } from '../../../api-services/benefit-accum-weight-detail.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { BenefitAccumWeight } from '../../../api-models/benefit-accum-weight.model';
import { BenefitAccumWeightDetail } from '../../../api-models/benefit-accum-weight-detail.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { CONSTANTS, getBenefitWeightAccumulatorShortcutKeys } from '../../../shared/services/shared.service';
import { FormRow, FORM_FIELD_ACTION_TYPES, Menu, SearchModel } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { MessageMasterDtlService } from '../../../api-services';
import { MessageMasterDtl } from '../../../api-models/message-master-dtl.model';
import { BenefitWeightAccumDetailConfig, BenefitWeightAccumDetailFields } from '../../../shared/models/constants';
import {SecUserService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {BENEFIT_WEIGH_ACCUMULATOR_MODULE_ID} from '../../../shared/app-constants';
import {SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { BenefitWeightAccumulatorLookup } from '../../../shared/lookup/benefit-weight-accumulator-lookup';
import {BenefitsHelpComponent} from "../benefits-help/benefits-help.component";
@Component({
  selector: "app-benefit-weight-accumulator",
  templateUrl: "./benefit-weight-accumulator.component.html",
  styleUrls: ["./benefit-weight-accumulator.component.scss"],
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    BenefitAccumWeightService,
    BenefitAccumWeightDetailService,
    FunctionalLevelSecurityService,
  ],
})
export class BenefitWeightAccumulatorComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  public benefitWeightAccumulatorForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public popUpMessage: PopUpMessage;
  public showData: boolean = false;
  public shortcuts: ShortcutInput[] = [];
  public menu: Menu[] = [];
  public faSearch = faSearch;
  public benefitWeightAccumDetailConfig = BenefitWeightAccumDetailConfig;
  public benefitAccumDetailData: Array<FormRow> = [];
  public isResetForm: boolean = false;

  private displayMessage: any;
  @Input() showIcon: boolean = false;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;
  editBenefitWeight: boolean;
  private currentAccumId: string = null;
  private searchStatus: boolean = false;
  private keyNames: string = "accumulator_id";
  private keyValues: any;
  @Input() winID?: string;

  secWin: SecWinViewModel;
  windowId = "BENWT";
  userTemplateId: string;
  memmoduleid = BENEFIT_WEIGH_ACCUMULATOR_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  BenefitWeightAccumSearchModal = new SearchModel(
    "benefitaccumweights/lookup",
    BenefitWeightAccumulatorLookup.BENEFIT_WEIGHT_ACCUMULATOR_ALL,
    BenefitWeightAccumulatorLookup.BENEFIT_WEIGHT_ACCUMULATOR_DEFAULT,
    []
  );
  private dataLoadedMap = new Map<string, boolean>();
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  statusTrack = 1;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private benefitAccumWeightService: BenefitAccumWeightService,
    private benefitAccumWeightDetailService: BenefitAccumWeightDetailService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private router: Router,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private messageService: MessageMasterDtlService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.dataLoadedMap.set("WINPERMISSION", false);
    this.hasPermission();
  }

  initializeComponentState() {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.benefitWeightAccumulatorForm);
             this.dataLoadedMap.set("WINPERMISSION", true);

  }

   public get isDataLoaded(): boolean {
    // @ts-ignore
    for (let [key, value] of this.dataLoadedMap) {
      if (!value) {
        return value;
      }
    }
    return true;
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
            "You are not Permitted to view Benefit Weight Accumulator",
            "Benefit Weight Accumulator "
          );
        }
      },
      (error: Error) => {
            this.dataLoadedMap.set("WINPERMISSION", false);

         this.secProgress = false;
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
    this.secColDetailService
      .findByTableNameAndUserId("BENEFIT_ACCUM_WEIGHT", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.inProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getBenefitWeightAccumulatorShortcutKeys(this));
    this.cdr.detectChanges();
  }

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.resetFormAndGrid();
          break;
        }
        case "Open": {
          // statements;
          break;
        }
        case "Save": {
          this.saveBenefitWeightAccum();
          break;
        }
        case "Close": {
          this.benefitWeightAccumulatorForm.reset();
          break;
        }
        case "Main Menu...": {
          this.router.navigate(["diamond/functional-groups"]);
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
      // add method to handle Edit actions
    } else if (event.menu.menuItem === "Topic") {
      // handle Topic-Menu Actions
    } else if (event.menu.menuItem === "Special") {
      // handle special-Menu Actions
    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
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
    } else if (event.menu.menuItem == "Help") {
      /**
       * Open help modal
       */
      this.helpScreen();
    }
  }

  public onLookupFieldAcumId(event: any, id: string) {
    if (event.key === "F5") {
      event.preventDefault();
      this.getBenefitWeightAccLookUp();
    } else if (event.key === "Tab") {
      event.preventDefault();
      this.findByAccumulatorId(id);
    }
  }
  getBenefitWeightAccLookUp() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.BenefitWeightAccumSearchModal;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.findByAccumulatorId(res.accumulatorId);
      }
    });
  }

  public findByAccumulatorId(accumulatorId: string) {
    this.currentAccumId = accumulatorId;
    this.benefitAccumDetailData = [];
    this.benefitAccumWeightService
      .getBenefitAccumWeight(accumulatorId)
      .subscribe(
        (benefitAccumWeight: BenefitAccumWeight) => {
          this.showData = true;
          this.benefitWeightAccumulatorForm.get("accumulatorId").disable();
          this.benefitWeightAccumulatorForm.patchValue({
            accumulatorId: benefitAccumWeight.accumulatorId,
            description: benefitAccumWeight.description,
          }, {emitEvent: false});
          setTimeout(() => {
            this.isFormValidateStatus();
          }, 1000)
          this.searchStatus = true;
          this.keyValues = benefitAccumWeight.accumulatorId;
          this.editBenefitWeight = true;
          // this.dataGridgridApi.setRowData(benefitAccumWeight.benefitAccumWeightDetails);
          this.populateDynamicForm(
            accumulatorId,
            benefitAccumWeight.benefitAccumWeightDetails
          );
        },
        (error: Error) => {
          this.searchStatus = false;
          this.keyValues = "";
          console.log("error", error);
          // this.showPopUp('groupNotExistPopup', 'Benefit Weight Accumulator', '13167: Entered Accoumulator Id does not exists. Press yes to create a new Benefit Weight Accumulator.', 'icon');
          let popMsg = new PopUpMessage(
            "groupNotExistPopup",
            "Benefit Weight Accumulator",
            "13167: Entered Accoumulator Id does not exists. Press yes to create a new Benefit Weight Accumulator.",
            "icon"
          );
          popMsg.buttons = [
            new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("no", "No", "btn btn-primary"),
          ];
          let ref = this.modalService.open(PopUpMessageComponent, {
            size: "lg",
          });
          ref.componentInstance.popupMessage = popMsg;
          ref.componentInstance.showIcon = true;
          ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
            this.popUpButtonClicked(event);
          });
        }
      );
  }

  private populateDynamicForm(
    accumulatorId: string,
    benefitAccumWeightDetails: BenefitAccumWeightDetail[]
  ) {
    if (!benefitAccumWeightDetails || benefitAccumWeightDetails.length < 1) {
      return;
    }
    benefitAccumWeightDetails.forEach(
      (benefitAccumWeightDetail: BenefitAccumWeightDetail) => {
        let mockConfig = JSON.parse(
          JSON.stringify(this.benefitWeightAccumDetailConfig)
        ); // make a copy of original config
        this.benefitWeightAccumDetailConfig.forEach((field, index) => {
          switch (field.name) {
            case BenefitWeightAccumDetailFields.FROM_VALUE: {
              mockConfig[index].value = benefitAccumWeightDetail.fromValue;
              break;
            }
            case BenefitWeightAccumDetailFields.THRU_VALUE: {
              mockConfig[index].value = benefitAccumWeightDetail.thruValue;
              break;
            }
            case BenefitWeightAccumDetailFields.PRIMARY_GROUP: {
              mockConfig[index].value = benefitAccumWeightDetail.primaryGroup;
              break;
            }
            case BenefitWeightAccumDetailFields.SECONDARY_GROUP: {
              mockConfig[index].value = benefitAccumWeightDetail.secondaryGroup;
              break;
            }
            case BenefitWeightAccumDetailFields.WEIGHT_ACCUM: {
              mockConfig[index].value = benefitAccumWeightDetail.weightedAccum;
              break;
            }
            case BenefitWeightAccumDetailFields.EFFECTIVE_DATE: {
              mockConfig[index].value = benefitAccumWeightDetail.effectiveDate;
              break;
            }
            case BenefitWeightAccumDetailFields.THRU_DATE: {
              mockConfig[index].value = benefitAccumWeightDetail.thruDate;
              break;
            }
          }
        });
        let formState: FormRow = new FormRow();
        formState.formFields = mockConfig;
        formState.id = {
          accumulatorId: accumulatorId,
          seqAccumId:
            benefitAccumWeightDetail.benefitAccumWeightDetailPrimaryKey
              .seqAccumId,
        };
        this.benefitAccumDetailData.push(formState); // add record
      }
    );
    this.benefitAccumDetailData = JSON.parse(
      JSON.stringify(this.benefitAccumDetailData)
    ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }

  public popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == "groupNotExistPopup") {
      this.popupMessageHandler(button);
      this.popUpMessage = null;
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
      new PopUpMessageButton("Cancel", "Cancel", "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  private popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == "yes") {
      console.log("button yes has been click!");
    }
    if (button.name == "no") {
      console.log("button No has been click!");
    }
  }

  private popUpButtonClicked(button: PopUpMessageButton) {
    if (button.name == "yes") {
      this.createBenefitWeightAccum();
    }
    if (button.name == "no") {
      this.benefitWeightAccumulatorForm.get("accumulatorId").enable();
      this.showData = false;
    }
  }

  public saveBenefitWeightAccum() {
    if (
      this.securityService.checkInsertUpdatePermissions(
        this.editBenefitWeight,
        this.secWin
      )
    ) {
      if (this.editBenefitWeight) {
        this.updateBenefitWeightAccum(this.currentAccumId);
      } else {
        this.createBenefitWeightAccum();
      }
    }
  }

  private createBenefitWeightAccum() {
    this.formValidation.validateForm();
    if (this.benefitWeightAccumulatorForm.valid) {
      let benefitAccumWeight: BenefitAccumWeight = new BenefitAccumWeight();
      benefitAccumWeight.accumulatorId = Form.getValue(
        this.benefitWeightAccumulatorForm,
        "accumulatorId"
      );
      benefitAccumWeight.description = Form.getValue(
        this.benefitWeightAccumulatorForm,
        "description"
      );
      this.benefitAccumWeightService
        .createBenefitAccumWeight(benefitAccumWeight)
        .subscribe((response: BenefitAccumWeight) => {
          this.findByAccumulatorId(this.currentAccumId);
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }
          this.isFormDataChangeStatus = false;
        });
    } else {
      this.toastService.showToast(
        "Required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  private updateBenefitWeightAccum(accumulatorId: string) {
    this.formValidation.validateForm();
    if (this.benefitWeightAccumulatorForm.valid) {
      let benefitAccumWeight: BenefitAccumWeight = new BenefitAccumWeight();
      benefitAccumWeight.accumulatorId = Form.getValue(
        this.benefitWeightAccumulatorForm,
        "accumulatorId"
      );
      benefitAccumWeight.description = Form.getValue(
        this.benefitWeightAccumulatorForm,
        "description"
      );
      this.benefitAccumWeightService
        .updateBenefitAccumWeight(benefitAccumWeight, accumulatorId)
        .subscribe((response: BenefitAccumWeight) => {
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }
          this.isFormDataChangeStatus = false;
        });
    } else {
      this.toastService.showToast(
        "Required information is missing or incomplete. Please correct your entries and try again.",
        NgbToastType.Danger
      );
    }
  }

  public saveBenefitWeightDetail(fomrValues: any[]) {
    if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
      let benefitAccumDetails = new Array<BenefitAccumWeightDetail>();
      const updatedRecords: FormRow[] = this.benefitAccumDetailData.filter(
        (record) => record.action
      );

      if (updatedRecords.length > 0) {
        this.benefitAccumDetailData.forEach(
          (preStateRecord: FormRow, index) => {
            if (preStateRecord.action) {
              let updatedRecord = fomrValues[index];
              const pair = Object.keys(updatedRecord).map((k) => ({
                key: k,
                value: updatedRecord[k],
              }));
              let BenefitAccumDetail: BenefitAccumWeightDetail =
                this.mapFieldToBenefitAccumDetail(pair, preStateRecord.action);
              BenefitAccumDetail.benefitAccumWeightDetailPrimaryKey = {
                accumulatorId: preStateRecord.id.accumulatorId,
                seqAccumId: preStateRecord.id.seqAccumId,
              };
              benefitAccumDetails.push(BenefitAccumDetail);
            }
          }
        );
      }
      const newRecords = fomrValues.slice(this.benefitAccumDetailData.length);

      newRecords.forEach((record) => {
        const pair = Object.keys(record).map((k) => ({
          key: k,
          value: record[k],
        }));
        let benefitAccumDetail: BenefitAccumWeightDetail =
          this.mapFieldToBenefitAccumDetail(pair, FORM_FIELD_ACTION_TYPES.ADD);
        benefitAccumDetail.benefitAccumWeightDetailPrimaryKey = {
          accumulatorId: this.currentAccumId,
        };
        benefitAccumDetails.push(benefitAccumDetail);
      });

      this.benefitAccumWeightDetailService
        .updateBenefitAccumDetailRows(benefitAccumDetails)
        .subscribe((response: BenefitAccumWeight) => {
          this.findByAccumulatorId(this.currentAccumId);
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
        });
    }
  }

  private mapFieldToBenefitAccumDetail(
    keyValues: any,
    action: FORM_FIELD_ACTION_TYPES
  ) {
    let benefitAccumDetail = new BenefitAccumWeightDetail();
    benefitAccumDetail.fromValue = keyValues[0].value;
    benefitAccumDetail.thruValue = keyValues[1].value;
    benefitAccumDetail.primaryGroup = keyValues[2].value;
    benefitAccumDetail.secondaryGroup = keyValues[3].value;
    benefitAccumDetail.weightedAccum = keyValues[4].value;
    benefitAccumDetail.effectiveDate = this.getDatePickValue(
      keyValues[5].value
    );
    benefitAccumDetail.thruDate = this.getDatePickValue(keyValues[6].value);
    benefitAccumDetail.action = action;

    return benefitAccumDetail;
  }

  private getDatePickValue(field: any) {
    const date = field.singleDate ? field.singleDate.date : null;
    if (date) {
      return (
        date.year +
        "-" +
        this.addPrefixZero(date.month) +
        "-" +
        this.addPrefixZero(date.day)
      );
    } else {
      return "";
    }
  }
  private addPrefixZero(value: number) {
    return value < 10 ? "0" + value : value;
  }
  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  private createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.benefitWeightAccumulatorForm = this.formBuilder.group({
      accumulatorId: [null, { validators: [Validators.required] }],
      description: [null, { validators: [] }],
    });
  }

  public resetFormAndGrid() {
    this.showData = false;
    this.benefitWeightAccumulatorForm.get("accumulatorId").enable();
    this.editBenefitWeight = false;
    this.currentAccumId = null;
    this.benefitWeightAccumulatorForm.reset();
    this.benefitAccumDetailData = [];
  }

  private menuInit() {
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
          { name: "Lookup" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
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
          { isHorizontal: true },
          { name: "Show Timestamp" },
          { name: "Audit Display" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window", shortcutKey: "F1" },
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

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  helpScreen = () => {
    const viewModal = this.modalService.open(BenefitsHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    viewModal.componentInstance.defaultFile =
      "/BENWT,_Benefit_Weight_Accumulator.htm";
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Benefit Weight Accumulator')
      })
    } else {
      this.activeModal.close();
    }
  };

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
          this.saveBenefitWeightAccum();
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

  dynamicEvent = () => {
    if (this.statusTrack === 1) {
      ++this.statusTrack
    } else {
      this.isFormDataChangeStatus = true;
    }
  };

  isFormValidateStatus = () => {
    this.benefitWeightAccumulatorForm.valueChanges.subscribe(() => {
      this.isFormDataChangeStatus = true;
    })
  }
}
