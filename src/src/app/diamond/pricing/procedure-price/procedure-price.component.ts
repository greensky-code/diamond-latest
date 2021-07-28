import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from 'ag-grid-community';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProcedurePrice} from '../../../api-models/procedure-price.model';
import {ProcedurePriceService} from '../../../api-services/procedure-price.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {
    SecUserService,
    ProcedureCodeMasterService,
    MessageMasterDtlService,
    DddwDtlService,
    RegionMasterService,
    DddwHdrService,
    ReasonCodeMasterService
} from '../../../api-services';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu, SearchModel} from '../../../shared/models/models';
import {MessageMasterDtl} from '../../../api-models';
import {CONSTANTS, getProcedurePriceShortcutKeys, SharedService} from '../../../shared/services/shared.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProcedureCodeMasterLookup} from '../../../shared/lookup/procedure-code-master-lookup';
import {PriceScheduleMasterService} from '../../../api-services/price-schedule-master.service';
import {ModifierCodeMasterService} from '../../../api-services/modifier-code-master.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {MedMgmtAuditComponent} from '../med-mgmt-audit/med-mgmt-audit.component';
import {RegionMasterLookup} from '../../../shared/lookup/region-master-lookup';
import {IMySingleDateModel, IMyDateModel} from 'angular-mydatepicker';
import {PricingHelpComponent} from "../pricing-help/pricing-help.component";

// Use the Component directive to define the ProcedurePriceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "procedureprice",
  templateUrl: "./procedure-price.component.html",
  styleUrls: ["./procedure-price.component.scss"],
  providers: [
    ProcedurePriceService,
    MessageMasterDtlService,
    ProcedureCodeMasterService,
    PriceScheduleMasterService,
    RegionMasterService,
    ModifierCodeMasterService,
    ReasonCodeMasterService,
  ],
})
export class ProcedurePriceComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  currentProcedureCode: string;
  currentSeqProcPrice: number;
  procedurePriceForm: FormGroup;
  formValidation: FormValidation;
  isHoldDateDisabled: Boolean = true;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId = "PROCP";
  public isSuperUser = false;
  public secProgress = true;
  @Input() showIcon = false;
  @Input() procedureCode?: string;
  loaderValue = true;
  userTemplateId = "";
  secColDetails = new Array<SecColDetail>();
  menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];

  showProgress = true;

  priceSchedules: any;
  regionTypes: any;
  modifierCodes: any;
  holdReasons: any;
  regionDescription = "";
  PerDiems: any;
  ContractOverides: any;
  procedureHolds: any;
  showCompleteForm = false;
  initLoad: boolean = true;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild("pricingRegion") pricingRegionElement: ElementRef;
  @ViewChild(KeyboardShortcutsComponent)
  private keyboard: KeyboardShortcutsComponent;
  screenCloseRequest: Boolean = false;
  valueChanged: Boolean = false;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private cdr: ChangeDetectorRef,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private procedurePriceService: ProcedurePriceService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private procedureCodeMasterService: ProcedureCodeMasterService,
    private messageService: MessageMasterDtlService,
    private dddwDtlService: DddwDtlService,
    private toastService: ToastService,
    private priceScheduleMasterService: PriceScheduleMasterService,
    private regionMasterService: RegionMasterService,
    private dddwHdrService: DddwHdrService,
    private modifierCodeMasterService: ModifierCodeMasterService,
    private reasonCodeMasterService: ReasonCodeMasterService,
    private sharedService: SharedService,
    private router: Router
  ) {}

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

  editProcedurePrice: boolean;
  procedurePrice: ProcedurePrice;
  procedurePrices: ProcedurePrice[];

  createProcedurePrice() {
    this.showCompleteForm = true;

    this.formValidation.validateForm();
    if (this.procedurePriceForm.valid) {
      let procedurePrice: any = {};

      procedurePrice.procedurePricePrimaryKey = {
        procedureCode: this.currentProcedureCode,
        seqProcPrice: null,
      };
      procedurePrice.seqProcPrice = Form.getValue(
        this.procedurePriceForm,
        "seqProcPrice"
      );
      procedurePrice.pricingRegion = Form.getValue(
        this.procedurePriceForm,
        "pricingRegion"
      );
      procedurePrice.geoZipRegion = Form.getValue(
        this.procedurePriceForm,
        "geoZipRegion"
      );
      procedurePrice.priceSchedule = Form.getValue(
        this.procedurePriceForm,
        "priceSchedule"
      );
      procedurePrice.effectiveDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "effectiveDate"
      );
      procedurePrice.modifierCode = Form.getValue(
        this.procedurePriceForm,
        "modifierCode"
      );
      procedurePrice.termDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "termDate"
      );
      procedurePrice.allowedAmt = Form.getValue(
        this.procedurePriceForm,
        "allowedAmt"
      );
      procedurePrice.pctOfBilled = Form.getValue(
        this.procedurePriceForm,
        "pctOfBilled"
      );
      procedurePrice.withholdPct = Form.getValue(
        this.procedurePriceForm,
        "withholdPct"
      );
      procedurePrice.contractOverride = Form.getValue(
        this.procedurePriceForm,
        "contractOverride"
      );
      procedurePrice.holdDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "holdDate"
      );
      procedurePrice.procedureHold = Form.getValue(
        this.procedurePriceForm,
        "procedureHold"
      );
      procedurePrice.userDefined1 = Form.getValue(
        this.procedurePriceForm,
        "userDefined1"
      );
      procedurePrice.userDefined2 = Form.getValue(
        this.procedurePriceForm,
        "userDefine2"
      );
      procedurePrice.userDefined3 = Form.getValue(
        this.procedurePriceForm,
        "userDefine3"
      );
      procedurePrice.userDefined4 = Form.getValue(
        this.procedurePriceForm,
        "userDenine4"
      );
      procedurePrice.userDefined5 = Form.getValue(
        this.procedurePriceForm,
        "userDefined5"
      );
      this.showProgress = true;
      this.procedurePriceService.createProcedurePrice(procedurePrice).subscribe(
        (response) => {
          this.toastService.showToast(
            "Record successfully created",
            NgbToastType.Success
          );
          this.showProgress = false;
          this.editProcedurePrice = false;
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close();
            }, 2000);
          }
          this.valueChanged = false;
          this.getProcedurePrice(
            procedurePrice.procedurePricePrimaryKey.procedureCode
          );
        },
        (error) => {
          this.editProcedurePrice = false;
          this.showProgress = false;
        }
      );
    } else {
      this.editProcedurePrice = false;
      this.showProgress = false;
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  setFormData() {
    this.procedurePriceForm.patchValue(
      {
        priceSchedule: this.procedurePrice.priceSchedule,
        pricingRegion: this.procedurePrice.pricingRegion,
        effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
          this.procedurePrice.effectiveDate
        ),
        modifierCode: this.procedurePrice.modifierCode,
        termDate: this.dateFormatPipe.defaultDisplayDateFormat(
          this.procedurePrice.termDate
        ),
        perDiemFlat: this.procedurePrice.perDiemFlag,
        allowedAmt: this.procedurePrice.allowedAmt,
        pctOfBilled: this.procedurePrice.pctOfBilled,
        withholdPct: this.procedurePrice.withholdPct,
        geoZipRegion: this.procedurePrice.geoZipRegion,
        contractOverride: this.procedurePrice.contractOverride,
        procedureHold: this.procedurePrice.procedureHold,
        holdDate: this.dateFormatPipe.defaultDisplayDateFormat(
          this.procedurePrice.holdDate
        ),
        userDefined1: this.procedurePrice.userDefined1,
        userDefine2: this.procedurePrice.userDefined2,
        userDefine3: this.procedurePrice.userDefined3,
        userDenine4: this.procedurePrice.userDefined4,
        userDefined5: this.procedurePrice.userDefined5,
      },
      { emitEvent: false }
    );
    setTimeout(() => {
        this.isFormValidateStatus()
    }, 2000)
    this.procedurePriceForm.get("procedureCode").disable();
    if (this.procedurePrice.pricingRegion) {
      this.getPricingRegionDescription(this.procedurePrice.pricingRegion);
    } else if (this.procedurePrice.geoZipRegion) {
      this.getPricingRegionDescription(this.procedurePrice.geoZipRegion);
    }
  }

  getPricingRegionDescription(regionCode: any) {
    this.showProgress = true;
    this.regionMasterService.getRegionMasterWithCode(regionCode).subscribe(
      (data) => {
        this.showProgress = false;
        if (data && data.length > 0) {
          data.forEach((d: any) => {
            if (
              this.procedurePrice.pricingRegion &&
              d.regionMasterPrimaryKey.regionType == "P"
            ) {
              this.procedurePriceForm.patchValue(
                { regionType: d.regionMasterPrimaryKey.regionType },
                { emitEvent: false }
              );
              this.regionDescription = d.description;
              this.procedurePriceForm.patchValue({
                regionDescription: d.description,
              });
              this.priceRegion = true;
              this.geoRegion = false;
            } else if (
              this.procedurePrice.geoZipRegion &&
              d.regionMasterPrimaryKey.regionType == "Z"
            ) {
              this.procedurePriceForm.patchValue(
                { regionType: d.regionMasterPrimaryKey.regionType },
                { emitEvent: false }
              );
              this.regionDescription = d.description;
              this.procedurePriceForm.patchValue({
                regionDescription: d.description,
              });
              this.geoRegion = true;
              this.priceRegion = false;
            }
          });
        } else {
          this.showProgress = false;
          this.messageService
            .findByMessageId(9986)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "9986: " + message[0].messageText.replace("@1", regionCode),
                "Procedure Price"
              );
            });
        }
      },
      (error) => {
        this.messageService
          .findByMessageId(9986)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp(
              "9986: " + message[0].messageText.replace("@1", regionCode),
              "Procedure Price"
            );
          });
        this.showProgress = false;
      }
    );
    this.initLoad = false;
  }

  onTabRegions(regionCode: any) {
    this.showProgress = true;
    this.regionMasterService.getRegionMasterWithCode(regionCode).subscribe(
      (data) => {
        this.showProgress = false;
        if (data && data.length > 0) {
          data.forEach((d: any) => {
            if (this.procedurePriceForm.value.regionType == "P") {
              this.procedurePriceForm.patchValue({
                regionType: d.regionMasterPrimaryKey.regionType,
              });
              this.regionDescription = d.description;
              this.priceRegion = true;
              this.geoRegion = false;
              return true;
            } else if (this.procedurePriceForm.value.regionType == "Z") {
              this.procedurePriceForm.patchValue({
                regionType: d.regionMasterPrimaryKey.regionType,
              });
              this.regionDescription = d.description;
              this.geoRegion = true;
              this.priceRegion = false;
              return true;
            }
          });
        } else {
          this.showProgress = false;
          this.messageService
            .findByMessageId(9986)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "9986: " + message[0].messageText.replace("@1", regionCode),
                "Procedure Price"
              );
            });
          this.pricingRegionElement.nativeElement.focus();
        }
      },
      (error) => {
        this.messageService
          .findByMessageId(9986)
          .subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp(
              "9986: " + message[0].messageText.replace("@1", regionCode),
              "Procedure Price"
            );
          });
        this.showProgress = false;
        this.pricingRegionElement.nativeElement.focus();
      }
    );
  }

  onValueChange(event: any) {
    this.showProgress = true;
    if (event.target.value.length == 3) {
      this.regionMasterService
        .getRegionMasterWithCode(event.target.value)
        .subscribe(
          (data) => {
            this.showProgress = false;
            if (data && data.length > 0) {
              data.forEach((d: any) => {
                if (
                  event.target.id == "pricingRegion" &&
                  this.regionTypeValue == "P"
                ) {
                  this.procedurePriceForm.patchValue({
                    regionType: d.regionMasterPrimaryKey.regionType,
                  });
                  this.regionDescription = d.description;
                  this.priceRegion = true;
                  this.geoRegion = false;
                } else if (
                  event.target.id == "geoZipRegion" &&
                  this.regionTypeValue == "G"
                ) {
                  this.procedurePriceForm.patchValue({
                    regionType: d.regionMasterPrimaryKey.regionType,
                  });
                  this.regionDescription = d.description;
                  this.geoRegion = true;
                  this.priceRegion = false;
                }
              });
            } else {
              this.showProgress = false;
              this.messageService
                .findByMessageId(9986)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.showPopUp(
                    "9986: " +
                      message[0].messageText.replace("@1", event.target.id),
                    "Procedure Price"
                  );
                });
            }
          },
          (error) => {
            this.messageService
              .findByMessageId(9986)
              .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                  "9986: " +
                    message[0].messageText.replace("@1", event.target.id),
                  "Procedure Price"
                );
              });
            this.showProgress = false;
          }
        );
    }
  }

  updateProcedurePrice(procedureCode: string, seqProcPrice: number) {
    this.formValidation.validateForm();
    if (this.procedurePriceForm.valid) {
      let procedurePrice = new ProcedurePrice();

      procedurePrice.pricingRegion = Form.getValue(
        this.procedurePriceForm,
        "pricingRegion"
      );
      procedurePrice.geoZipRegion = Form.getValue(
        this.procedurePriceForm,
        "geoZipRegion"
      );
      procedurePrice.priceSchedule = Form.getValue(
        this.procedurePriceForm,
        "priceSchedule"
      );
      procedurePrice.effectiveDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "effectiveDate"
      );
      procedurePrice.modifierCode = Form.getValue(
        this.procedurePriceForm,
        "modifierCode"
      );
      procedurePrice.termDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "termDate"
      );
      procedurePrice.perDiemFlag = Form.getValue(
        this.procedurePriceForm,
        "perDiemFlat"
      );
      procedurePrice.allowedAmt = Form.getValue(
        this.procedurePriceForm,
        "allowedAmt"
      );
      procedurePrice.pctOfBilled = Form.getValue(
        this.procedurePriceForm,
        "pctOfBilled"
      );
      procedurePrice.withholdPct = Form.getValue(
        this.procedurePriceForm,
        "withholdPct"
      );
      procedurePrice.contractOverride = Form.getValue(
        this.procedurePriceForm,
        "contractOverride"
      );
      procedurePrice.modifierCode = Form.getValue(
        this.procedurePriceForm,
        "modifierCode"
      );
      procedurePrice.priceSchedule = Form.getValue(
        this.procedurePriceForm,
        "priceSchedule"
      );
      procedurePrice.holdDate = Form.getDatePickerValue(
        this.procedurePriceForm,
        "holdDate"
      );
      procedurePrice.procedureHold = Form.getValue(
        this.procedurePriceForm,
        "procedureHold"
      );
      procedurePrice.userDefined1 = Form.getValue(
        this.procedurePriceForm,
        "userDefined1"
      );
      procedurePrice.userDefined2 = Form.getValue(
        this.procedurePriceForm,
        "userDefine2"
      );
      procedurePrice.userDefined3 = Form.getValue(
        this.procedurePriceForm,
        "userDefine3"
      );
      procedurePrice.userDefined4 = Form.getValue(
        this.procedurePriceForm,
        "userDenine4"
      );
      procedurePrice.userDefined5 = Form.getValue(
        this.procedurePriceForm,
        "userDefined5"
      );
      this.showProgress = true;
      this.procedurePriceService
        .updateProcedurePrice(procedurePrice, procedureCode, seqProcPrice)
        .subscribe(
          (response) => {
            this.toastService.showToast(
              "Record successfully updated",
              NgbToastType.Success
            );
            this.showProgress = false;
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close();
              }, 2000);
            }
            this.valueChanged = false;
            this.getProcedurePrice(procedureCode);
          },
          (error) => {
            this.showProgress = false;
          }
        );
    } else {
      this.showProgress = false;
      this.alertMessage = this.alertMessageService.error(
        "Some required information is missing or incomplete. Please correct your entries and try again."
      );
    }
  }

  saveProcedurePrice() {
    if (this.editProcedurePrice) {
      this.updateProcedurePrice(
        this.procedurePrice["procedurePricePrimaryKey"].procedureCode,
        this.procedurePrice["procedurePricePrimaryKey"].seqProcPrice
      );
    } else {
      this.createProcedurePrice();
    }
  }

  deleteProcedurePrice(procedureCode: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp("Not permitted to delete", "Group Master Security");
    } else {
      this.procedurePriceService
        .deleteProcedurePrice(procedureCode)
        .subscribe((response) => {
          this.toastService.showToast(
            "Record successfully deleted",
            NgbToastType.Success
          );
        });
    }
  }

  getProcedurePrice(procedureCode: string) {
    this.procedurePriceService.findByProcedureCode(procedureCode).subscribe(
      (procedurePrices) => {
        this.procedurePrices = procedurePrices;
        this.currentProcedureCode = procedureCode;
        this.dataGridGridOptions.api.setRowData(this.procedurePrices);
        this.dataGridGridOptions.api.selectIndex(0, false, false);
        this.editProcedurePrice = true;
      },
      (error) => {
        console.error(error);
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving record."
        );
      }
    );
  }

  getProcedurePrices() {
    this.procedurePriceService.getProcedurePrices().subscribe(
      (procedurePrices) => {
        this.procedurePrices = procedurePrices;
      },
      (error) => {
        this.alertMessage = this.alertMessageService.error(
          "An Error occurred while retrieving records."
        );
      }
    );
  }

  public dataGridGridOptions: GridOptions;
  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;

  dataGridGridOptionsExportCsv() {
    let params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Price Schedule",
        field: "priceSchedule",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Pricing Region",
        field: "pricingRegion",
        width: 200,
      },
      {
        headerName: "Geo",
        field: "",
        width: 200,
      },
      {
        headerName: "Zip",
        field: "",
        width: 200,
      },
      {
        headerName: "Region",
        field: "geoZipRegion",
        width: 200,
      },
      {
        headerName: "Modifier Code",
        field: "modifierCode",
        width: 200,
      },
      {
        headerName: "Effective Date",
        field: "effectiveDate",
        width: 200,
      },
    ];
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.procedurePriceForm);
    this.createDataGrid();
    this.showProgress = false;
    this.procedurePriceForm.valueChanges.subscribe(() => {
      if (!this.initLoad) {
        this.valueChanged = true;
      }
    });
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

  ngAfterViewInit(): void {
    this.shortcuts.push(...getProcedurePriceShortcutKeys(this));
    this.cdr.detectChanges();
  }

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.loaderValue = false;
      return;
    }
    this.secColDetailService
      .findByTableNameAndUserId("MEMBER_MASTER", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.loaderValue = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  /**
   * Get Permissions
   * @param secUserId
   */
  getSecWin(secUserId: string) {
    this.secWinService
      .getSecWin(this.windowId, secUserId)
      .subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
          this.secProgress = false;
          this.initializePermission();
        } else {
          this.secProgress = false;

          this.showPopUp(
            "You are not Permitted to view Benefit Ruler",
            "Benefit Rule Permission"
          );
        }
      });
  }

  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    let userId = null;
    if (parsedToken) {
      userId = parsedToken.sub;
    }
    this.secWinService
      .getSecWin(this.windowId, userId)
      .subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);

        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
        } else {
          this.showPopUp(
            "You are not Permitted to view Group Master",
            "Window Error"
          );
        }
      });
  }

  private initializeComponentState(): void {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.procedurePriceForm);
    this.GetPriceScheduleDropDownData();
    this.GetTypesDropDownData();
    this.GetModifierDropDownData();
    this.GetHoldReason();
    this.GetPerDiemDropDownData();
    this.GetContractOverRideDownData();
    this.GetProcedureHoldDopDownData();
    if (this.procedureCode) {
      this.procedurePriceForm.patchValue({
        procedureCode: this.procedureCode,
      });
      this.GetAllFormData(this.procedureCode);
    }
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.procedurePriceForm = this.formBuilder.group(
      {
        procedureCode: ["", { updateOn: "blur", validators: [] }],
        dynamicText: ["", { updateOn: "blur", validators: [] }],
        priceSchedule: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        regionType: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        geoZipRegion: ["", { updateOn: "blur", validators: [] }],
        regionDescription: [""],
        pricingRegion: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        effectiveDate: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        modifierCode: ["", { updateOn: "blur", validators: [] }],
        termDate: ["", { updateOn: "blur", validators: [] }],
        perDiemFlat: ["", { updateOn: "blur", validators: [] }],
        allowedAmt: ["", { updateOn: "blur", validators: [] }],
        userDefined1: ["", { updateOn: "blur", validators: [] }],
        pctOfBilled: ["", { updateOn: "blur", validators: [] }],
        userDefine2: ["", { updateOn: "blur", validators: [] }],
        withholdPct: ["", { updateOn: "blur", validators: [] }],
        userDefine3: ["", { updateOn: "blur", validators: [] }],
        contractOverride: ["", { updateOn: "blur", validators: [] }],
        userDenine4: ["", { updateOn: "blur", validators: [] }],
        procedureHold: ["", { updateOn: "blur", validators: [] }],
        userDefined5: ["", { updateOn: "blur", validators: [] }],
        holdDate: [{ value: "" }, { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  closeModal() {
    this.screenCloseRequest = true;
    if (this.valueChanged === true && this.procedurePriceForm.dirty) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          let popUpMessage = new PopUpMessage(
            "saveBeforeExit",
            "Procedure Price",
            "29065: " + message[0].messageText,
            "icon"
          );
          popUpMessage.buttons = [
            new PopUpMessageButton("Yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("No", "No", "btn btn-primary"),
            new PopUpMessageButton("Cancel", "Cancel", ""),
          ];
          popUpMessage.messageType = MessageType.SUCCESS;
          let ref = this.sharedService.showDialogBox(popUpMessage);
          ref.buttonclickEvent.subscribe((event: any) => {
            if (event.name === "Yes") {
              this.saveProcedurePrice();
            } else if (event.name === "No") {
              this.router.navigateByUrl("/");
              if (this.screenCloseRequest === true) {
                this.activeModal.close();
              }
            }
          });
        });
    } else {
      this.activeModal.close();
    }
  }

  menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          {
            name: "New",
            shortcutKey: "Ctrl+M",
            disabled: !(
              this.isSuperUser ||
              (this.secWin && this.secWin.hasInsertPermission())
            ),
          },
          { name: "Open", shortcutKey: "Ctrl+O" },
          {
            name: "Delete",
            shortcutKey: "Ctrl+D",
            disabled: !(
              this.isSuperUser ||
              (this.secWin && this.secWin.hasInsertPermission())
            ),
          },
          {
            name: "Save",
            shortcutKey: "Ctrl+S",
            disabled: !(
              this.isSuperUser ||
              (this.secWin && this.secWin.hasInsertPermission())
            ),
          },
          { name: "Close", shortcutKey: "Ctrl+F4" },
          { isHorizontal: true },
          { name: "Main Menu...", shortcutKey: "F2" },
          { name: "Shortcut Menu...", shortcutKey: "F3" },
          { isHorizontal: true },
          { name: "Print", disabled: true },
          { name: "Exit", shortcutKey: "Alt+F4" },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
          { isHorizontal: true },
          { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
          { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
          { name: "Paste", shortcutKey: "Ctrl+P", disabled: true },
          { isHorizontal: true },
          { name: "Lookup", shortcutKey: "F5" },
        ],
      },
      {
        menuItem: "Topic",
        dropdownItems: [
          { name: "Master File" },
          { name: "Price File" },
          { name: "Unit Values" },
        ],
      },
      {
        menuItem: "Special",
        dropdownItems: [
          { name: "Procedure Lookup" },

          { name: "Med Mgmt Audit" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
          { name: "Audit Display", shortcutKey: "Shift+Alt+A" },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Procedure Price" },
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

  resetAll() {
    this.procedurePriceForm.reset();
    this.editProcedurePrice = false;
    this.showCompleteForm = false;
  }

  addNewRecord() {
    this.editProcedurePrice = false;
    let procedurePrices: ProcedurePrice[] = [];
    let procedurePrice: any = new ProcedurePrice();
    procedurePrices.push(procedurePrice);
    this.dataGridGridOptions.api.applyTransaction({ add: procedurePrices });
    this.dataGridGridOptions.api.selectIndex(
      this.dataGridGridOptions.api.getDisplayedRowCount() - 1,
      false,
      false
    );
  }

  onMenuItemClick(eve: any) {
    if (eve.menu.menuItem === "File") {
      // handle File actions
      switch (eve.action) {
        case "New": {
          this.addNewRecord();
          this.isHoldDateDisabled = true;
          break;
        }
        case "Open": {
          this.resetAll();
          this.isHoldDateDisabled = true;
          break;
        }
        case "Save": {
          this.saveProcedurePrice();

          break;
        }
        case "Close": {
          break;
        }
        case "Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }

        default: {
          break;
        }
      }
    } else if (eve.menu.menuItem === "Edit") {
      if (eve.action == "Lookup") {
        this.openF5Lookup();
      }
    } else if (eve.menu.menuItem === "Topic") {
      // handle Topic-Menu Actions
      this.sharedService.onProcedureCodeMenuClick(
        eve.action,
        "Procedure Price",
        this.activeModal,
        this.procedurePrice["procedurePricePrimaryKey"].procedureCode
      );
    } else if (eve.menu.menuItem === "Special") {
      // handle special-Menu Actions
      this.handleSpecialMenu(eve.action);
    } else if (eve.menu.menuItem === "Windows") {
      switch (eve.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Audit Display": {
        }
      }
    } else if (eve.menu.menuItem == "Help") {
      /**
       * Open help modal
       */
      this.helpScreen();
    }
  }

  private handleSpecialMenu(action: string) {
    switch (action) {
      case "Procedure Lookup": {
        this.openF5Lookup();
        break;
      }
      case "Med Mgmt Audit": {
        this.openMedMgmt();
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

  openMedMgmt() {
    if (
      !this.procedurePrice ||
      !this.procedurePrice["procedurePricePrimaryKey"] ||
      !this.procedurePrice["procedurePricePrimaryKey"].procedureCode
    ) {
      this.showPopUp(
        " A Valid Procedure Code has not been selected. ",
        " Med Mgmt Audit"
      );
      return;
    } else {
      let ref = this.modalService.open(MedMgmtAuditComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.procedureCode =
        this.procedurePrice["procedurePricePrimaryKey"].procedureCode;
    }
  }

  procedureCodeSearchModel = new SearchModel(
    "procedurecodemasters/lookup",
    ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_ALL,
    ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_DEFAULT,
    []
  );

  onChangeProcedureHold(event: any) {
    this.isHoldDateDisabled = false;
  }

  onKeyDown(event: any) {
    switch (event.target.id) {
      case "procedureCode":
        switch (event.key) {
          case "F5":
            event.preventDefault();
            this.openF5Lookup();
            break;
          case "Tab":
            event.preventDefault();
            this.GetAllFormData(event.target.value);
            break;
        }
        break;
      case "pricingRegion":
        switch (event.key) {
          case "F5": {
            event.preventDefault();
            this.openRegionF5Lookup();
            break;
          }
          case "Tab": {
            this.onTabRegions(event.target.value);
            break;
          }
        }
        break;
      case "geoZipRegion":
        switch (event.key) {
          case "F5": {
            event.preventDefault();
            this.openRegionF5Lookup();
            break;
          }
          case "Tab": {
            event.preventDefault();
            this.onTabRegions(event.target.value);
            break;
          }
        }
        break;
    }
  }

  openF5Lookup() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.procedureCodeSearchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = false;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        this.GetAllFormData(res.procedureCode);
      }
    });
  }

  priceRegion = false;
  geoRegion = false;

  openRegionF5Lookup() {
    let ref = this.modalService.open(SearchboxComponent);
    let regionCodeSearchModel = new SearchModel(
      "regionmasters/lookup/" + this.procedurePriceForm.get("regionType").value,
      RegionMasterLookup.REGION_MASTER_ALL,
      RegionMasterLookup.REGION_MASTER_DEFAULT,
      []
    );
    ref.componentInstance.searchModel = regionCodeSearchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.defaultLoad = false;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res != null) {
        if (res.regionMasterPrimaryKey.regionType == "P") {
          this.procedurePriceForm.patchValue({
            regionType: res.regionMasterPrimaryKey.regionType,
          });
          this.procedurePriceForm.patchValue({
            pricingRegion: res.regionMasterPrimaryKey.regionCode,
          });
          this.regionDescription = res.description;
          this.priceRegion = true;
          this.geoRegion = false;
        } else if (res.regionMasterPrimaryKey.regionType == "Z") {
          this.procedurePriceForm.patchValue({
            regionType: res.regionMasterPrimaryKey.regionType,
          });
          this.procedurePriceForm.patchValue({
            geoZipRegion: res.regionMasterPrimaryKey.regionCode,
          });
          this.regionDescription = res.description;
          this.geoRegion = true;
          this.priceRegion = false;
        }
      }
    });
  }

  GetAllFormData(proc: any) {
    this.procedurePriceForm
      .get("procedureCode")
      .setValue(proc, { emitEvent: false });
    //check if procedure code is empty
    if (proc) {
      this.showProgress = true;
      this.procedureCodeMasterService.getProcedureCodeMaster(proc).subscribe(
        (data) => {
          this.showProgress = false;
          if (data) {
            this.showCompleteForm = true;
            this.procedurePriceForm
              .get("dynamicText")
              .setValue(data.shortDescription, { emitEvent: false });
            this.procedurePriceForm
              .get("procedureCode")
              .setValue(data.procedureCode, { emitEvent: false });
            this.currentProcedureCode = data.procedureCode;
            this.getProcedurePrice(data.procedureCode);
          } else {
            this.messageService
              .findByMessageId(5552)
              .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                  "5552: " + message[0].messageText.replace("@1", proc),
                  "Procedure Price"
                );
              });
          }
        },
        (error) => {
          this.showProgress = false;
          this.messageService
            .findByMessageId(5552)
            .subscribe((message: MessageMasterDtl[]) => {
              this.showPopUp(
                "5552: " + message[0].messageText.replace("@1", proc),
                "Procedure Price"
              );
              this.loaderValue = false;
            });
          this.loaderValue = false;
        }
      );
    } else {
      this.messageService
        .findByMessageId(5555)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            "5555: " + message[0].messageText.replace("@1", proc),
            "Procedure Price"
          );
        });
    }
  }

  getTypeOrSpecialityDropDownData() {
    this.dddwDtlService
      .findByColumnNameAndDwname(
        CONSTANTS.PROVIDER_TYPE_SPECIALTY,
        CONSTANTS.DW_PTYPE
      )
      .subscribe(
        (values) => {
          const defaultValue =
            values.length > 0
              ? values.find(
                  (value: any) => value.dddwDtlPrimaryKey.dataVal === "S"
                )
              : null;
        },
        (error) => {
          this.toastService.showToast(
            "An Error occurred while retrieving records.",
            NgbToastType.Danger
          );
        }
      );
  }

  GetPriceScheduleDropDownData() {
    this.priceScheduleMasterService
      .getPriceScheduleMasters()
      .subscribe((data) => {
        this.priceSchedules = data;
      });
  }

  GetTypesDropDownData() {
    this.dddwDtlService
      .findByColumnNameAndDwname("region_type", "dw_regin_de")
      .subscribe((data) => {
        this.regionTypes = data;
        this.regions = data;
      });
  }

  GetPerDiemDropDownData() {
    this.dddwDtlService
      .findByColumnNameAndDwname("per_diem_flag", "dw_procp_de")
      .subscribe((data) => {
        this.PerDiems = data;
      });
  }

  GetContractOverRideDownData() {
    this.dddwDtlService
      .findByColumnNameAndDwname("contract_override", "dw_procp_de")
      .subscribe((data) => {
        this.ContractOverides = data;
      });
  }

  GetProcedureHoldDopDownData() {
    this.reasonCodeMasterService.getReasonCodeMasters().subscribe((data) => {
      this.procedureHolds = data;
    });
  }

  GetModifierDropDownData() {
    this.modifierCodeMasterService
      .getModifierCodeMasters()
      .subscribe((data) => {
        this.modifierCodes = data;
      });
  }

  GetHoldReason() {
    this.reasonCodeMasterService
      .getReasonCodeMasterByReasonType("HD")
      .subscribe((data) => {
        this.holdReasons = data;
        this.holdReasons.sort(function (a: any, b: any) {
          if (a.reasonCode < b.reasonCode) {
            return -1;
          }
          if (a.reasonCode > b.reasonCode) {
            return 1;
          }
          return 0;
        });
      });
  }

  onGridSelectionChange() {
    let procedurePrice = new ProcedurePrice();

    if (this.dataGridGridOptions.api.getSelectedRows().length == 1) {
      this.procedurePrice = this.dataGridGridOptions.api.getSelectedRows()[0];
      if (this.procedurePrice.priceSchedule != null) {
        this.currentSeqProcPrice =
          this.procedurePrice.procedurePricePrimaryKey.seqProcPrice;
      } else {
      }
      this.setFormData();
    }
  }

  regionTypeValue: any;
  regions: any;
  showHolddateField = false;

  onProcHoldSelected(fieldValue: string) {
    this.procedurePriceForm.controls["procedureHold"].patchValue(fieldValue);
  }

  onregionTypeSelected(fieldValue: string) {
    this.procedurePriceForm.controls["regionType"].patchValue(fieldValue);
    this.regionTypeValue = fieldValue;
    this.procedurePrice.pricingRegion = null;
    this.procedurePrice.geoZipRegion = null;
    this.regionDescription = "";

    if (fieldValue == "Z") {
      this.procedurePriceForm
        .get("geoZipRegion")
        .setValidators(Validators.required);
      this.priceRegion = false;
      this.geoRegion = true;
      this.regionMasterService
        .getRegionMaster(this.regionTypeValue)
        .subscribe((data) => {
          if (data) {
            this.regions = data;
          } else {
            this.regions = null;
          }
        });
    } else if (fieldValue == "P") {
      this.procedurePriceForm
        .get("pricingRegion")
        .setValidators(Validators.required);
      this.priceRegion = true;
      this.geoRegion = false;
      this.regionMasterService
        .getRegionMaster(this.regionTypeValue)
        .subscribe((data) => {
          if (data) {
            this.regions = data;
          } else {
            this.regions = null;
          }
        });
    } else {
      this.priceRegion = false;
      this.geoRegion = false;
      this.regions = null;
    }
  }

  getDate(jsDate: IMySingleDateModel): Date {
    return Form.getDate(jsDate);
  }

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  validateEffectiveDate(event: IMyDateModel) {
    if (!event) {
      return;
    }
    let dateEffecDefault = this.getDate(event.singleDate);

    if (this.isValidDate(dateEffecDefault)) {
      this.ifEffDateAlreadyExist(event.singleDate.formatted);
    } else {
      this.showPopUp("Error:  Effective date isn't valid", "Procedure Price");
    }
  }

  openDateValidationPopupError(errorCode: any, value: any) {
    this.messageService
      .findByMessageId(errorCode)
      .subscribe((message: MessageMasterDtl[]) => {
        this.showPopUp(
          errorCode + ": " + message[0].messageText.replace("@1", value),
          "Procedure Price"
        );
      });
  }

  ifEffDateAlreadyExist(effDate: any): boolean {
    //Check if Procedure Price for this effective date already exists
    this.procedurePrices.forEach((pp) => {
      if (
        this.procedurePrice["procedurePricePrimaryKey"].seqProcPrice !=
        pp["procedurePricePrimaryKey"].seqProcPrice
      ) {
        if (pp.effectiveDate == effDate) {
          this.procedurePriceForm.get("effectiveDate").setValue("");
          this.openDateValidationPopupError("5563", effDate);
          return;
        }
      }
    });
    this.procedurePriceForm.patchValue({ effectiveDate: effDate });
    return;
  }

  validatetermDate(event: IMyDateModel) {
    if (!event) {
      return;
    }
    // term date mustbe greater than  effective date

    const effD = this.procedurePriceForm.value.effectiveDate;
    if (event.singleDate && effD) {
      let dateEffecDefault = this.getDate(effD.singleDate);
      let termDate = this.getDate(event.singleDate);

      // =====================================        =============================
      if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
        let isEffectiveDateBeforeTerminationdate =
          dateEffecDefault.getTime() < termDate.getTime();
        if (!isEffectiveDateBeforeTerminationdate) {
          this.procedurePriceForm.get("termDate").setValue("");
          this.openDateValidationPopupError("5564", termDate);
        } else {
          this.procedurePriceForm.patchValue({ termDate: termDate });
        }
      } else if (!this.isValidDate(termDate)) {
        this.showPopUp(
          "Error:  Please enter valid term date",
          "Procedure Price"
        );
      }
    } else {
      this.showPopUp(
        "Error:  Either term date or effective date isn't valid",
        "Procedure Price"
      );
    }
  }

  validateholdDate(event: IMyDateModel) {
    if (!event) {
      return;
    }
    // term date mustbe greater than  effective date

    const effD = this.procedurePriceForm.value.effectiveDate;
    if (event.singleDate && effD) {
      let dateEffecDefault = this.getDate(effD.singleDate);
      let holdDate = this.getDate(event.singleDate);

      // =====================================        =============================
      if (this.isValidDate(dateEffecDefault) && this.isValidDate(holdDate)) {
        let isEffectiveDateBeforeTerminationdate =
          dateEffecDefault.getTime() < holdDate.getTime();
        if (!isEffectiveDateBeforeTerminationdate) {
          this.procedurePriceForm.get("holdDate").setValue(null);
          this.openDateValidationPopupError("5566", holdDate);
        } else {
          this.procedurePriceForm.patchValue({ holdDate: holdDate });
        }
      } else if (!this.isValidDate(holdDate)) {
        this.showPopUp(
          "Error:  Please enter valid hold date",
          "Procedure Price"
        );
      }
    } else {
      this.showPopUp(
        "Error:  Either hold date or effective date isn't valid",
        "Procedure Price"
      );
    }
  }

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.valueChanged === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, "Procedure Price");
        });
    }
  };

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
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === "Yes") {
          this.saveProcedurePrice();
        } else if (resp.name === "No") {
          this.router.navigateByUrl("/");
          if (this.screenCloseRequest === true) {
            this.activeModal.close();
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  setFieldValue(fieldName: string, fieldValue: string | number) {
    this.procedurePriceForm.controls[fieldName].patchValue(fieldValue);
  }

  helpScreen = () => {
    const modalRef = this.modalService.open(PricingHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    modalRef.componentInstance.showIcon = true;
    modalRef.componentInstance.defaultFile = "PROCP_Procedure_Price.htm";
  };

    isFormValidateStatus = () => {
        this.procedurePriceForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
        })
    }
}
