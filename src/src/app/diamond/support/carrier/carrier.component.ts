import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
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
import { CarrierMasterService } from "../../../api-services/carrier-master.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { CarrierMaster } from '../../../api-models/carrier-master.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { ToastService } from '../../../shared/services/toast.service';
import {
    ContactTitleMasterService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import { SecurityService } from '../../../shared/services/security.service';
import {ContactTitleMaster, Country, MessageMasterDtl, SecUser} from '../../../api-models';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { FormField, Menu } from '../../../shared/models/models';
import { MessageType } from '../../../shared/components/confirmation-message';
import { getAuthorizationProceduresComponentShortcutKeys, getCarrierComponentShortcutKeys } from '../../../shared/services/shared.service';
import { AuthProcedureSystemCode } from '../../../api-models/authorization/auth-proc-system-code.model';
import { CountryService } from '../../../api-services/country.service';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {
    ACCESS_TOKEN,
    AUTHENTICATED_USER,
    AuthenticationService,
    REFRESH_TOKEN
} from "../../../api-services/authentication.service";
import {SupportHelpComponent} from "../support-help/support-help.component";
import {SUPPORT_MODULE_ID} from "../../../shared/app-constants";


@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css'],
  providers: [CarrierMasterService]
})
export class CarrierComponent implements OnInit {

  carrierForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = 'CARCD';
  public isSuperUser = false;
  public secProgress = true;
  public menu: Menu[] = [];
  secColDetails: SecColDetail[] = [];
  showCarrierFields: boolean;
  public shortcuts: ShortcutInput[] = [];
  userTemplateId: string;
  memberModuleId = '';

  @Input() winID?: string;
  @Input() showIcon: boolean = false;
  @ViewChild('popUpMesssage') child: PopUpMessageComponent;
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
  @Output() numberValidation = new EventEmitter<boolean>();
  @Output() onChangeFields = new EventEmitter<any>();

  editCarrierMaster: boolean = false;
  carrierMaster: CarrierMaster;
  carrierMasters: CarrierMaster[] = [];
  public dataGridGridOptions: GridOptions;
  types: AuthProcedureSystemCode[] = [];
  alDistMeths: AuthProcedureSystemCode[] = [];
  countries: Country[] = [];
  titles: ContactTitleMaster[] = [];
    screenCloseRequest: Boolean = false;
    carrierCode: string;
    carrierIndex: number = 0;
    formDataChangeStatus: Boolean = false;
  constructor(private formBuilder: FormBuilder,
    private mask: Mask,
    private cdr: ChangeDetectorRef,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private securityService: SecurityService,
    private systemCodesService: SystemCodesService,
    private secUserService: SecUserService,
    private carrierMasterService: CarrierMasterService,
    private secColDetailService: SecColDetailService,
    private countryService: CountryService,
    private contactTitleMasterService: ContactTitleMasterService,
    private messageService: MessageMasterDtlService,
    private authenticationService: AuthenticationService,
    private toastService: ToastService) {

  }

  ngOnInit(): void {
      this.createForm();
      this.displayMessage = {};
      this.formValidation = new FormValidation(this.carrierForm);
      this.createDataGrid();
      this.initializePermission();
  }

  private initializePermission(): void {
      this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

      if (this.isSuperUser) {
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
  };

  ngAfterViewInit(): void {
    this.shortcuts.push(...getCarrierComponentShortcutKeys(this));
    this.cdr.detectChanges();
  }

  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.carrierForm = this.formBuilder.group({
      carrierCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
      shortName: ['', { updateOn: 'blur', validators: [Validators.required] }],
      fullName1: ['', { updateOn: 'blur', validators: [] }],
      county: ['', { updateOn: 'blur', validators: [] }],
      fullName2: ['', { updateOn: 'blur', validators: [] }],
      state: ['', { updateOn: 'blur', validators: [] }],
      address1: ['', { updateOn: 'blur', validators: [] }],
      zip: ['', { updateOn: 'blur', validators: [] }],
      address2: ['', { updateOn: 'blur', validators: [] }],
      country: ['', { updateOn: 'blur', validators: [] }],
      city: ['', { updateOn: 'blur', validators: [] }],
      type: ['', { updateOn: 'blur', validators: [Validators.required] }],
      name: ['', { updateOn: 'blur', validators: [] }],
      userDefined1: ['', { updateOn: 'blur', validators: [] }],
      title: ['', { updateOn: 'blur', validators: [] }],
      userDate1: ['', { updateOn: 'blur', validators: [] }],
      phone: ['', { updateOn: 'blur', validators: [] }],
      userDefined2: ['', { updateOn: 'blur', validators: [] }],
      fax: ['', { updateOn: 'blur', validators: [] }],
      ext: ['', { updateOn: 'blur', validators: [] }],
      userDate2: ['', { updateOn: 'blur', validators: [] }],
      emailId: ['', { updateOn: 'blur', validators: [] }],
      alDistMeth: ['', { updateOn: 'blur', validators: [] }]
    }, { updateOn: 'submit' });

    this.editCarrierMaster = false;
  }

  createNewForm() {
    this.editCarrierMaster = false;
    if (this.carrierForm.dirty) {
      this.showEditConfirmation();

    } else {
      this.carrierForm.reset();
      this.carrierForm.controls['carrierCode'].enable();
    }
    this.carrierForm.patchValue({
      title: 'Mr'
    });
  }

  createDataGrid(): void {
    this.dataGridGridOptions =
    {
      paginationPageSize: 50,
      rowSelection: 'single'
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Carrier Code",
        field: "carrierCode",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Short Name",
        field: "shortName",
        width: 200
      }
    ];

  }

  carrierOnSelectionChanged() {
    var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    document.querySelector('#selectedRows').innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }

  carrierOnReady(params: any) {
    this.dataGridGridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
    params.api.sizeColumnsToFit();
  }

  carrierOnRowClicked(data: any) {
    if (this.carrierForm.dirty) {
      this.showEditConfirmation();
    } else {
      this.carrierMaster = data;
      if (this.carrierMaster != null) {
        this.carrierForm.patchValue({
          'carrierCode': this.carrierMaster.carrierCode,
          'shortName': this.carrierMaster.shortName,
          'fullName1': this.carrierMaster.fullName1,
          'county': this.carrierMaster.county,
          'fullName2': this.carrierMaster.fullName2,
          'state': this.carrierMaster.state,
          'address1': this.carrierMaster.addressLine1,
          'zip': this.carrierMaster.zipCode,
          'address2': this.carrierMaster.addressLine2,
          'country': this.carrierMaster.country,
          'city': this.carrierMaster.city,
          'type': this.carrierMaster.carrierType,
          'name': this.carrierMaster.contactName,
          'userDefined1': this.carrierMaster.userDefined1,
          'title': this.carrierMaster.contactTitle,
          'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate1),
          'phone': this.carrierMaster.phoneNumber,
          'userDefined2': this.carrierMaster.userDefined2,
          'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate2),
          'ext': this.carrierMaster.extension,
          'fax': this.carrierMaster.faxNumber,
          'emailId': this.carrierMaster.emailId,
          'alDistMeth': this.carrierMaster.alDistMethod,
        }, {emitEvent: false});
        this.isFormDataChanged();
        this.carrierForm.get('carrierCode').disable();
      }
      this.editCarrierMaster = true;
    }
  }

  getCarreier() {
    this.carrierMasterService.getCarrierMasters().subscribe(carrMas => {
      this.carrierMasters.length = 0;
      this.carrierMasters = carrMas;
      setTimeout(() => {
          this.dataGridGridOptions.api.setRowData(this.carrierMasters);
          this.carrierIndex = this.carrierMasters.findIndex(index => index.carrierCode === this.carrierCode);
          this.dataGridGridOptions.api.selectIndex(this.carrierIndex, false, false);
          this.secProgress = false;
          this.carrierMaster = this.carrierMasters[0];
          this.carrierForm.patchValue({
              'carrierCode': this.carrierMaster.carrierCode,
              'shortName': this.carrierMaster.shortName,
              'fullName1': this.carrierMaster.fullName1,
              'county': this.carrierMaster.county,
              'fullName2': this.carrierMaster.fullName2,
              'state': this.carrierMaster.state,
              'address1': this.carrierMaster.addressLine1,
              'zip': this.carrierMaster.zipCode,
              'address2': this.carrierMaster.addressLine2,
              'country': this.carrierMaster.country,
              'city': this.carrierMaster.city,
              'type': this.carrierMaster.carrierType,
              'name': this.carrierMaster.contactName,
              'userDefined1': this.carrierMaster.userDefined1,
              'title': this.carrierMaster.contactTitle,
              'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate1),
              'phone': this.carrierMaster.phoneNumber,
              'userDefined2': this.carrierMaster.userDefined2,
              'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate2),
              'ext': this.carrierMaster.extension,
              'fax': this.carrierMaster.faxNumber,
              'emailId': this.carrierMaster.emailId,
              'alDistMeth': this.carrierMaster.alDistMethod,
          });
          this.editCarrierMaster = true;
      }, 500)

    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  };

  //#region Drop down

  getCountry() {
    this.countryService.getCountrys().subscribe(coun => {
      this.countries.length = 0;
      this.countries = coun;
    }, (error: any) => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  }

  getTitle() {
    this.contactTitleMasterService.getContactTitleMasters().subscribe(title => {
      this.titles.length = 0;
      this.titles = title;
    }, (error: any) => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  }

  getType() {
    this.systemCodesService.getSystemCodesByLangAndtype('CARRTYPE', '0').subscribe((type: any) => {
      this.types.length = 0;
      this.types = type;
    }, (error: any) => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  };

  getAlDistMeth() {
    this.systemCodesService.getSystemCodesByLangAndtype('ALDISTRMETHOD', '0').subscribe((alDist: any) => {
      this.alDistMeths.length = 0;
      this.alDistMeths = alDist;
    }, (error: any) => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  };

  //#endregion

  onFieldChange(field: string) {
    let value = this.carrierForm.controls[field].value;
    if (value != null) {

      if (value.length === 0 || value.length === 7 || value.length === 9 ||
        value.length === 10 || value.length === 12 || value.length === 15 || value.length === 20) {
        this.numberValidation.emit(true);
      }
      else {
        let popMsg = new PopUpMessage('Client/Server', 'Error', '30140: Phone/Fax Number must be 0, 7, 9, 10, 12, 15, 20', 'icon');
        popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
          if (event.name = "Ok") {
            this.numberValidation.emit(false);
          }
        });
      }
    }
  }

  saveCarrier() {
    if (this.editCarrierMaster) {
      this.updateCarrierMaster(this.carrierMaster.carrierCode)
    } else {
      this.createCarrierMaster();
    }
  }

  createCarrierMaster() {
    this.formValidation.validateForm();
    if (this.carrierForm.valid) {
      let carrierMaster = new CarrierMaster();
      carrierMaster.carrierCode = Form.getValue(this.carrierForm, 'carrierCode');
      carrierMaster.shortName = Form.getValue(this.carrierForm, 'shortName');
      carrierMaster.fullName1 = Form.getValue(this.carrierForm, 'fullName1');
      carrierMaster.county = Form.getValue(this.carrierForm, 'county');
      carrierMaster.fullName2 = Form.getValue(this.carrierForm, 'fullName2');
      carrierMaster.state = Form.getValue(this.carrierForm, 'state');
      carrierMaster.addressLine1 = Form.getValue(this.carrierForm, 'address1');
      carrierMaster.zipCode = Form.getValue(this.carrierForm, 'zip');
      carrierMaster.addressLine2 = Form.getValue(this.carrierForm, 'address2');
      carrierMaster.country = Form.getValue(this.carrierForm, 'country');
      carrierMaster.city = Form.getValue(this.carrierForm, 'city');
      carrierMaster.carrierType = Form.getValue(this.carrierForm, 'type');
      carrierMaster.contactName = Form.getValue(this.carrierForm, 'name');
      carrierMaster.userDefined1 = Form.getValue(this.carrierForm, 'userDefined1');
      carrierMaster.contactTitle = Form.getValue(this.carrierForm, 'title');
      carrierMaster.userDate1 = Form.getDatePickerValue(this.carrierForm, 'userDate1');
      carrierMaster.phoneNumber = Form.getValue(this.carrierForm, 'phone');
      carrierMaster.userDefined2 = Form.getValue(this.carrierForm, 'userDefined2');
      carrierMaster.userDate2 = Form.getDatePickerValue(this.carrierForm, 'userDate2');
      carrierMaster.extension = Form.getValue(this.carrierForm, 'ext');
      carrierMaster.faxNumber = Form.getValue(this.carrierForm, 'fax');
      carrierMaster.emailId = Form.getValue(this.carrierForm, 'emailId');
      carrierMaster.alDistMethod = Form.getValue(this.carrierForm, 'alDistMeth');
      this.carrierMasterService.createCarrierMaster(carrierMaster).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully created.");
        this.editCarrierMaster = false;
        this.carrierForm.reset();
        this.getCarreier();
          if (this.screenCloseRequest === true) {
              setTimeout(() => {
                  this.activeModal.close()
              }, 2000);
          }
          this.formDataChangeStatus = false;
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }

  updateCarrierMaster(carrierCode: string) {
    // if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.carrierForm.valid) {
      let carrierMaster = new CarrierMaster();
      carrierMaster.carrierCode = Form.getValue(this.carrierForm, 'carrierCode');
      carrierMaster.shortName = Form.getValue(this.carrierForm, 'shortName');
      carrierMaster.fullName1 = Form.getValue(this.carrierForm, 'fullName1');
      carrierMaster.county = Form.getValue(this.carrierForm, 'county');
      carrierMaster.fullName2 = Form.getValue(this.carrierForm, 'fullName2');
      carrierMaster.state = Form.getValue(this.carrierForm, 'state');
      carrierMaster.addressLine1 = Form.getValue(this.carrierForm, 'address1');
      carrierMaster.zipCode = Form.getValue(this.carrierForm, 'zip');
      carrierMaster.addressLine2 = Form.getValue(this.carrierForm, 'address2');
      carrierMaster.country = Form.getValue(this.carrierForm, 'country');
      carrierMaster.city = Form.getValue(this.carrierForm, 'city');
      carrierMaster.carrierType = Form.getValue(this.carrierForm, 'type');
      carrierMaster.contactName = Form.getValue(this.carrierForm, 'name');
      carrierMaster.userDefined1 = Form.getValue(this.carrierForm, 'userDefined1');
      carrierMaster.contactTitle = Form.getValue(this.carrierForm, 'title');
      carrierMaster.userDate1 = Form.getDatePickerValue(this.carrierForm, 'userDate1');
      carrierMaster.phoneNumber = Form.getValue(this.carrierForm, 'phone');
      carrierMaster.userDefined2 = Form.getValue(this.carrierForm, 'userDefined2');
      carrierMaster.userDate2 = Form.getDatePickerValue(this.carrierForm, 'userDate2');
      carrierMaster.extension = Form.getValue(this.carrierForm, 'ext');
      carrierMaster.faxNumber = Form.getValue(this.carrierForm, 'fax');
      carrierMaster.emailId = Form.getValue(this.carrierForm, 'emailId');
      carrierMaster.alDistMethod = Form.getValue(this.carrierForm, 'alDistMeth');
      this.carrierMasterService.updateCarrierMaster(carrierMaster, carrierCode).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully updated.");
        this.editCarrierMaster = false;
        this.carrierForm.reset();
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close()
          }, 2000);
        }
          this.formDataChangeStatus = false;
        this.getCarreier();
        this.carrierForm.controls['carrierCode'].enable();
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
      });
    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
    // }
  }

  deleteCarrierMaster(carrierCode: string) {
    // if (!(this.secWin && this.secWin.hasDeletePermission())) {
    //   this.showPopUp('Not permitted to delete', 'Group Master Security');
    // } else {
    this.carrierMasterService.deleteCarrierMaster(carrierCode).subscribe(response => {
      this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
      this.editCarrierMaster = false;
      this.carrierForm.reset();
      this.getCarreier();
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
    });
    // }
  }

  hasPermission() {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (this.isSuperUser) {
      this.initializeComponentState();
      this.secProgress = false;
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

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.secProgress = false;
      return;
    }
    this.secColDetailService
      .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

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
            }
        );
    }

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      console.log("button yes has been click!");
    }
    if (button.name == 'no') {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }

  showEditConfirmation() {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, 'Carrier')
      });
  }

    popupAlert = (message: string, title: string) => {
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
                this.saveCarrier()
            }
            else if(resp.name === 'No') {
                this.activeModal.close();
            }
        })
  };

  closeModal() {
      this.screenCloseRequest = true;
    if (this.carrierForm.dirty && this.formDataChangeStatus) {
      this.showEditConfirmation();
    } else {
      this.showCarrierFields = false;
      this.carrierForm.reset();
      this.activeModal.close();
    }
  }

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === 'File') {
      // handle File actions
      switch (event.action) {
        case 'New': {
          this.editCarrierMaster = false;
          if (this.carrierForm.dirty) {
            this.showEditConfirmation();

          } else {
            this.carrierForm.reset();
            this.carrierForm.controls['carrierCode'].enable();
          }
            this.carrierForm.patchValue({
                title: 'Mr'
            });
          break;
        }
        case 'Open': {
          // statements;
          break;
        }
        case 'Delete': {
          this.deleteCarrierMaster(this.carrierMaster.carrierCode);
          break;
        }
        case 'Save': {
          this.saveCarrier();
          break;
        }
        case 'Close': {
          if (this.carrierForm.dirty) {
            this.showEditConfirmation();
          } else {
            this.showCarrierFields = false;
            this.carrierForm.reset();
          }
          break;
        }
        case 'Shortcut Menu...': {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
          case 'Main Menu...': {
            this.activeModal.close();
            break;
          }
          case 'Exit': {
            this.browserExit();
            break;
          }
        default: {
          this.toastService.showToast(
            'Action is not valid',
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem === 'Edit') {
      // handle Edit-Menu Actions
      // this.handleEditMenu(event.action)
    } else if (event.menu.menuItem === 'Windows') {
      switch (event.action) {
          case 'Show Timestamp' :
            this.showTimeStamp();
              break;
          case '1 Main Menu':
            this.activeModal.close();
            break;
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen();
    }
  }

  private menuInit() {
    this.menu = [
      {
          menuItem: "File",
          dropdownItems: [
              {name: "New", shortcutKey: 'Ctrl+M', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
              {name: "Open", shortcutKey: 'Ctrl+O'},
              {name: "Delete", shortcutKey: 'Ctrl+D', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
              {name: "Save", shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
              {name: "Close", shortcutKey: 'Ctrl+F4'},
              {isHorizontal: true},
              {name: "Main Menu...", shortcutKey: 'F2'},
              {name: "Shortcut Menu...", shortcutKey: 'F3'},
              {isHorizontal: true},
              {name: "Print", disabled: true},
              {isHorizontal: true},
              {name: "Exit", shortcutKey: 'Alt+F4'},
          ],
      },
      {
          menuItem: "Edit",
          dropdownItems: [
              {name: "Undo", shortcutKey: 'Ctrl+Z', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
              {isHorizontal: true},
              {
                  name: "Cut", shortcutKey: 'Ctrl+X', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))
              },
              {name: "Copy", shortcutKey: 'Ctrl+C', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
              {name: "Paste", shortcutKey: 'Ctrl+V'},
              {isHorizontal: true},
              {name: "Next", shortcutKey: 'F8'},
              {name: "Previous", shortcutKey: 'F7'}
          ],
      },
      {
        menuItem: 'Notes',
        dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 Carrier" },
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

    getCarrierCode = (event) => {
      this.carrierCode = event.target.value;
    };

    isFormDataChanged = () => {
        this.carrierForm.valueChanges.subscribe(() => {
          this.formDataChangeStatus = true;
        })
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Carrier';
        ref.componentInstance.insertDateTime = this.carrierMaster['insertDatetimeDisplay'];
        ref.componentInstance.insertProcess = this.carrierMaster['insertProcess'];
        ref.componentInstance.insertUser = this.carrierMaster['insertUser'];
        ref.componentInstance.updateUser = this.carrierMaster['updateUser'];
        ref.componentInstance.updateDateTime = this.carrierMaster['updateDatetimeDisplay'];
        ref.componentInstance.updateProcess = this.carrierMaster['updateProcess'];
    };

    browserExit = () => {
        this.messageService.findByMessageId(29062).subscribe(res => {
            let popUpMessage = new PopUpMessage(
                'popUpMessageName',
                'DIAMOND @ Client/Server System',
                '29062: This will end your DIAMOND @ Client/Server System Session.' + res[0].messageText.split('.')[1],
                'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'OK', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    this.authenticationService.logout();
                    this.authenticationService.signOutNRedirect();

                } else if (resp.name === 'Cancel') {

                }
            })
        })
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/CARCD_Carriers.htm';
    };

    initializeComponentState = () => {
        this.menuInit();
        this.getCountry();
        this.getTitle();
        this.getType();
        this.getAlDistMeth();
        this.getCarreier();
        this.carrierForm.controls['carrierCode'].disable();
    }
}
