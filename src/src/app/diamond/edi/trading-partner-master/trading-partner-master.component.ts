/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
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
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  Country, MessageMasterDtl, TradingPartnerMaster } from '../../../api-models/index'
import {  TradingPartnerMasterService } from '../../../api-services/trading-partner-master.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWin } from '../../../api-models';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { DddwDtlService, MessageMasterDtlService, SecUserService } from '../../../api-services';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { Menu, SearchModel } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { CONSTANTS } from '../../../shared/services/shared.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { ToastService } from '../../../shared/services/toast.service';
import { CountryService } from '../../../api-services/country.service';
import { TradingPartnerMasterLookup } from '../../../shared/lookup/trading-partner-master';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';

// Use the Component directive to define the TradingPartnerMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: 'tradingpartnermaster',
  templateUrl: './trading-partner-master.component.html',
  providers: [
    MessageMasterDtlService,
    DddwDtlService,
    TradingPartnerMasterService,
  ],
})
export class TradingPartnerMasterComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  tradingPartnerMasterForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId = '';
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  public menu: Menu[] = [];
  public shortcuts: ShortcutInput[] = [];
  @Input() showIcon = false;

  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
  userTemplateId: any;
  showFields: boolean;
  trading: any;
  searchStatus: any;
  keyNames: any;
  keyValues: any;
  countrys: Country[];
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
  TradingIDSearchModel = new SearchModel(
    'tradingpartnermasters/lookup',
    TradingPartnerMasterLookup.TRADING_PARTNER_MASTER_ALL,
    TradingPartnerMasterLookup.TRADING_PARTNER_MASTER_DEFAULT,
    []
  );

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage(
      'poUpMessageName',
      title,
      message,
      'icon'
    );
    popUpMessage.buttons = [
      new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      console.log('button yes has been click!');
    }
    if (button.name == 'no') {
      console.log('button No has been click!');
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button);
    }
  }

  editTradingPartnerMaster: boolean;
  tradingPartnerMaster: TradingPartnerMaster;
  tradingPartnerMasters: TradingPartnerMaster[];
  createTradingPartnerMaster() {
    this.formValidation.validateForm();
    if (this.tradingPartnerMasterForm.valid) {
      let tradingPartnerMaster = new TradingPartnerMaster();
      tradingPartnerMaster.tradingPartnerId = Form.getValue(
        this.tradingPartnerMasterForm,
        'tradingMasterId'
      );
      tradingPartnerMaster.tradingPartnerType = Form.getValue(
        this.tradingPartnerMasterForm,
        'tradingPartnerType'
      );
      tradingPartnerMaster.comments = Form.getValue(
          this.tradingPartnerMasterForm,
          'textArea'
      );
      tradingPartnerMaster.tradingPartnerName = Form.getValue(
        this.tradingPartnerMasterForm,
        'tradePartnerName'
      );
      tradingPartnerMaster.addressLine1 = Form.getValue(
        this.tradingPartnerMasterForm,
        'addressLine1'
      );
      tradingPartnerMaster.addressLine2 = Form.getValue(
        this.tradingPartnerMasterForm,
        'addressLine2'
      );
      tradingPartnerMaster.city = Form.getValue(
        this.tradingPartnerMasterForm,
        'city'
      );
      tradingPartnerMaster.state = Form.getValue(
        this.tradingPartnerMasterForm,
        'state'
      );
      tradingPartnerMaster.zipCode = Form.getValue(
        this.tradingPartnerMasterForm,
        'zipCode'
      );
      tradingPartnerMaster.country = Form.getValue(
        this.tradingPartnerMasterForm,
        'country'
      );
      tradingPartnerMaster.contactName = Form.getValue(
        this.tradingPartnerMasterForm,
        'contactName'
      );
      tradingPartnerMaster.phoneNumber = Form.getValue(
        this.tradingPartnerMasterForm,
        'phoneNumber'
      );
      tradingPartnerMaster.faxNumber = Form.getValue(
        this.tradingPartnerMasterForm,
        'faxNumber'
      );
      tradingPartnerMaster.email = Form.getValue(
        this.tradingPartnerMasterForm,
        'emailAddress'
      );
      tradingPartnerMaster.ediAccessNumber = Form.getValue(
        this.tradingPartnerMasterForm,
        'ediAccessNumber'
      );
      tradingPartnerMaster.userDefined1 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined1'
      );
      tradingPartnerMaster.userDefined5 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined5'
      );
      tradingPartnerMaster.userDefined2 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined2'
      );
      tradingPartnerMaster.userDefined6 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined6'
      );
      tradingPartnerMaster.userDefined3 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined3'
      );
      tradingPartnerMaster.userDefined7 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined7'
      );
      tradingPartnerMaster.userDefined4 = Form.getValue(
        this.tradingPartnerMasterForm,
        'userDefined4'
      );
      this.tradingPartnerMasterService
        .createTradingPartnerMaster(tradingPartnerMaster)
        .subscribe(
          (response) => {
            this.alertMessage = this.alertMessageService.info(
              'Record successfully created.'
            );
            this.editTradingPartnerMaster = false;
          },
          (error) => {
            this.alertMessage = this.alertMessageService.error(
              'An Error occurred while creating new record. Please check your entry.'
            );
          }
        );
    } else {
      this.alertMessage = this.alertMessageService.error(
        'Some required information is missing or incomplete. Please correct your entries and try again.'
      );
    }
  }

  updateTradingPartnerMaster(tradingPartnerId: string) {
    if (this.secWin && this.secWin.hasUpdatePermission()) {
      this.formValidation.validateForm();
      if (this.tradingPartnerMasterForm.valid) {
        let tradingPartnerMaster = new TradingPartnerMaster();
        tradingPartnerMaster.tradingPartnerId = Form.getValue(
          this.tradingPartnerMasterForm,
          'tradingMasterId'
        );
        tradingPartnerMaster.tradingPartnerType = Form.getValue(
          this.tradingPartnerMasterForm,
          'tradingPartnerType'
        );
        tradingPartnerMaster.comments = Form.getValue(
            this.tradingPartnerMasterForm,
            'textArea'
        );
        tradingPartnerMaster.tradingPartnerName = Form.getValue(
          this.tradingPartnerMasterForm,
          'tradePartnerName'
        );
        tradingPartnerMaster.addressLine1 = Form.getValue(
          this.tradingPartnerMasterForm,
          'addressLine1'
        );
        tradingPartnerMaster.addressLine2 = Form.getValue(
          this.tradingPartnerMasterForm,
          'addressLine2'
        );
        tradingPartnerMaster.city = Form.getValue(
          this.tradingPartnerMasterForm,
          'city'
        );
        tradingPartnerMaster.state = Form.getValue(
          this.tradingPartnerMasterForm,
          'state'
        );
        tradingPartnerMaster.zipCode = Form.getValue(
          this.tradingPartnerMasterForm,
          'zipCode'
        );
        tradingPartnerMaster.country = Form.getValue(
          this.tradingPartnerMasterForm,
          'country'
        );
        tradingPartnerMaster.contactName = Form.getValue(
          this.tradingPartnerMasterForm,
          'contactName'
        );
        tradingPartnerMaster.phoneNumber = Form.getValue(
          this.tradingPartnerMasterForm,
          'phoneNumber'
        );
        tradingPartnerMaster.faxNumber = Form.getValue(
          this.tradingPartnerMasterForm,
          'faxNumber'
        );
        tradingPartnerMaster.email = Form.getValue(
          this.tradingPartnerMasterForm,
          'emailAddress'
        );
        tradingPartnerMaster.ediAccessNumber = Form.getValue(
          this.tradingPartnerMasterForm,
          'ediAccessNumber'
        );
        tradingPartnerMaster.userDefined1 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined1'
        );
        tradingPartnerMaster.userDefined5 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined5'
        );
        tradingPartnerMaster.userDefined2 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined2'
        );
        tradingPartnerMaster.userDefined6 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined6'
        );
        tradingPartnerMaster.userDefined3 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined3'
        );
        tradingPartnerMaster.userDefined7 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined7'
        );
        tradingPartnerMaster.userDefined4 = Form.getValue(
          this.tradingPartnerMasterForm,
          'userDefined4'
        );
        this.tradingPartnerMasterService
          .updateTradingPartnerMaster(tradingPartnerMaster, tradingPartnerId)
          .subscribe(
            (response) => {
              this.alertMessage = this.alertMessageService.info(
                'Record successfully updated.'
              );
              this.editTradingPartnerMaster = false;
            },
            (error) => {
              this.alertMessage = this.alertMessageService.error(
                'An Error occurred while updating record. Please check your entry.'
              );
            }
          );
      } else {
        this.alertMessage = this.alertMessageService.error(
          'Some required information is missing or incomplete. Please correct your entries and try again.'
        );
      }
    } else {
      this.showPopUp(
        'You are not permitted to update Group Master ',
        'Group Master Permissions'
      );
    }
  }
  saveTradingPartnerMaster() {
    if (this.editTradingPartnerMaster) {
      this.updateTradingPartnerMaster(
        this.tradingPartnerMaster.tradingPartnerId
      );
    } else {
      this.createTradingPartnerMaster();
    }
  }
  deleteTradingPartnerMaster(tradingPartnerId: string) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp('Not permitted to delete', 'Group Master Security');
    } else {
      this.tradingPartnerMasterService
        .deleteTradingPartnerMaster(tradingPartnerId)
        .subscribe(
          (response) => {
            this.alertMessage = this.alertMessageService.info(
              'Record successfully deleted.'
            );
          },
          (error) => {
            this.alertMessage = this.alertMessageService.error(
              'An Error occurred while deleting record.'
            );
          }
        );
    }
  }
  popUpButtonClicked(button: any) {
    if (button.name === 'ok') {
      //this.isUserGroupFieldOpen = true;
      //  this.createNew();
    }
    if (button.name === 'no') {
      this.showFields = false;
    }
    this.popUpMessage = null;
  }
  getTradingPartnerMaster(tradingPartnerId: string) {
    this.tradingPartnerMasterService
      .getTradingPartnerMaster(tradingPartnerId)
      .subscribe(
        (tradingPartnerMaster) => {
          this.showFields = true;
          this.tradingPartnerMaster = tradingPartnerMaster;
          this.tradingPartnerMasterForm.patchValue({
            tradingMasterId: this.tradingPartnerMaster.tradingPartnerId,
            tradingPartnerType: this.tradingPartnerMaster.tradingPartnerType,
            tradePartnerName: this.tradingPartnerMaster.tradingPartnerName,
            addressLine1: this.tradingPartnerMaster.addressLine1,
            addressLine2: this.tradingPartnerMaster.addressLine2,
            city: this.tradingPartnerMaster.city,
            state: this.tradingPartnerMaster.state,
            zipCode: this.tradingPartnerMaster.zipCode,
            textArea: this.tradingPartnerMaster.comments,
            country: this.tradingPartnerMaster.country,
            contactName: this.tradingPartnerMaster.contactName,
            phoneNumber: this.tradingPartnerMaster.phoneNumber,
            faxNumber: this.tradingPartnerMaster.faxNumber,
            emailAddress: this.tradingPartnerMaster.email,
            ediAccessNumber: this.tradingPartnerMaster.ediAccessNumber,
            userDefined1: this.tradingPartnerMaster.userDefined1,
            userDefined5: this.tradingPartnerMaster.userDefined5,
            userDefined2: this.tradingPartnerMaster.userDefined2,
            userDefined6: this.tradingPartnerMaster.userDefined6,
            userDefined3: this.tradingPartnerMaster.userDefined3,
            userDefined7: this.tradingPartnerMaster.userDefined7,
            userDefined4: this.tradingPartnerMaster.userDefined4,
          }, {emitEvent: false});
          setTimeout(() => {
            this.isFormValidateStatus();
          }, 1000)
        },
        (error) => {
          let popMsg = new PopUpMessage(
            'groupNotExistPopup',
            'Trading Partner Master',
            '18455: Entered Trading Partner Id does not exists.',
            'icon'
          );
          popMsg.buttons = [
            new PopUpMessageButton('ok', 'ok', 'btn btn-primary'),
          ];
          let ref = this.modalService.open(PopUpMessageComponent, {
            size: 'lg',
          });
          ref.componentInstance.popupMessage = popMsg;
          ref.componentInstance.showIcon = true;
          ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.popUpButtonClicked(event);
          });
        }
      );
  }
  getTradingPartnerMasters() {
    this.tradingPartnerMasterService.getTradingPartnerMasters().subscribe(
      (tradingPartnerMasters) => {
        this.tradingPartnerMasters = tradingPartnerMasters;
      },
      (error) => {
        this.alertMessage = this.alertMessageService.error(
          'An Error occurred while retrieving records.'
        );
      }
    );
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private DddwDtlService: DddwDtlService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private secUserService: SecUserService,
    private functionalLevelSecurityService: FunctionalLevelSecurityService,
    private secColDetailService: SecColDetailService,
    private messageService: MessageMasterDtlService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private countryService: CountryService,
    private securityService: SecurityService,
    private tradingPartnerMasterService: TradingPartnerMasterService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

  }

  initializePermission(): void {
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
            'You are not Permitted to view Procedure Code Screen',
            'Procedure Code Permission'
          );
        }
      },
      (error) => {
        this.showPopUp(error, 'Window Error');
      }
    );
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
      .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  private initializeComponentState(): void {
     this.createForm();
     this.menuInit();
     this.getTrading();
     this.createForm();
     this.getCountrys();
     this.displayMessage = {};
     this.formValidation = new FormValidation(this.tradingPartnerMasterForm);
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.tradingPartnerMasterForm = this.formBuilder.group(
      {
        tradingMasterId: ['', { updateOn: 'blur', validators: [] }],
        tradingPartnerType: ['', { updateOn: 'blur', validators: [] }],
        tradePartnerName: ['', { updateOn: 'blur', validators: [] }],
        addressLine1: ['', { updateOn: 'blur', validators: [] }],
        addressLine2: ['', { updateOn: 'blur', validators: [] }],
        city: ['', { updateOn: 'blur', validators: [] }],
        state: ['', { updateOn: 'blur', validators: [] }],
        zipCode: ['', { updateOn: 'blur', validators: [] }],
        country: ['', { updateOn: 'blur', validators: [] }],
        contactName: ['', { updateOn: 'blur', validators: [] }],
        phoneNumber: ['', { updateOn: 'blur', validators: [] }],
        faxNumber: ['', { updateOn: 'blur', validators: [] }],
        emailAddress: ['', { updateOn: 'blur', validators: [] }],
        ediAccessNumber: ['', { updateOn: 'blur', validators: [] }],
        textArea: ['', { updateOn: 'blur', validators: [] }],
        userDefined1: ['', { updateOn: 'blur', validators: [] }],
        userDefined5: ['', { updateOn: 'blur', validators: [] }],
        userDefined2: ['', { updateOn: 'blur', validators: [] }],
        userDefined6: ['', { updateOn: 'blur', validators: [] }],
        userDefined3: ['', { updateOn: 'blur', validators: [] }],
        userDefined7: ['', { updateOn: 'blur', validators: [] }],
        userDefined4: ['', { updateOn: 'blur', validators: [] }],
      },
      { updateOn: 'submit' }
    );
  }
  resetAll() {
    this.tradingPartnerMasterForm.reset();
    this.showFields = false;
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  OnTradingMasterId(event: any) {
    this.getTradingPartnerMaster(event.target.value);
  }
  getTrading() {
    this.DddwDtlService.findByColumnNameAndDwname(
      'trading_partner_type',
      'dw_tradph_de'
    ).subscribe((data) => {
      this.trading = data;
    });
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: 'File',
        dropdownItems: [
          { name: 'New' },
          { name: 'Open' },
          { name: 'Save' },
          { name: 'Close' },
          { name: 'Main Menu...' },
          { name: 'Shortcut Menu...' },
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
          { name: 'Lookup' },
        ],
      },
      {
        menuItem: 'Topic',
        dropdownItems: [{ name: 'Master File' }, { name: 'Detail File' }],
      },
      {
        menuItem: 'Special',
        dropdownItems: [
          { name: 'Trading Partner Lookup' },
          { name: 'Source Trading Partner' },
        ],
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
          { name: '2 Vendor Master' },
        ],
      },
      {
        menuItem: 'Help',
        dropdownItems: [
          { name: 'Contents' },
          { name: 'Search for Help on...' },
          { name: 'This Window' },
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
  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === 'File') {
      // handle File actions
      switch (event.action) {
        case 'New': {
          //this.createTax();
          break;
        }
        case 'Open': {
          this.resetAll();
          break;
        }
        case 'Save': {
          //   this.savetaxReportingEntity();
          break;
        }
        case 'Close': {
          this.resetAll();
          break;
        }
        case 'Shortcut Menu': {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
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
    } else if (event.menu.menuItem === 'Topic') {
      this.showPopUp(
        'Selection not available from a View Only screen',
        'Trading Partner Master'
      );
    } else if (event.menu.menuItem === 'Special') {
       this.showPopUp(
        'Selection not available from a View Only screen',
        'Trading Partner Master'
      );
    } else if (event.menu.menuItem === 'Edit') {
      // handle Edit-Menu Actions
      // this.handleEditMenu(event.action);
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
              this.windowId
            );
            if (status) {
              let ref = this.modalService.open(AuditDisplayComponent, {
                size: 'lg',
              });
              ref.componentInstance.keyNames = this.keyNames;
              ref.componentInstance.keyValues = this.keyValues;
              ref.componentInstance.winID = this.windowId;
              ref.componentInstance.showIcon = true;
            } else {
              this.messageService
                .findByMessageId(11073)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.showPopUp(
                    '11073: ' + message[0].messageText,
                    'Trading Partner'
                  );
                });
            }
          } else {
            this.messageService
              .findByMessageId(30164)
              .subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                  '30164: ' + message[0].messageText,
                  'Trading Partner'
                );
              });
          }

          break;
        }
      }
    }
  }

  getCountrys() {
    this.countryService.getCountrys().subscribe((countrys) => {
      this.countrys = countrys;
    });
  }

  onTradingIdKeyDown(event) {
    if (event.key === 'F5') {
      event.preventDefault();
      let ref = this.modalService.open(SearchboxComponent);
      ref.componentInstance.searchModel = this.TradingIDSearchModel;
      ref.componentInstance.showIcon = true;
      ref.componentInstance.defaultLoad = true;
      ref.componentInstance.onRowSelected.subscribe((res: any) => {
        if (res != null) {
          this.tradingPartnerMasterForm
            .get('tradingMasterId')
            .setValue(res.tradingMasterId);
          this.getTradingPartnerMaster(res.tradingPartnerId);
          //  this.vendorCreditForm.get("vendorId002").setValue(res.vendorId);
        }
      });
    }
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Trading Partner Master')
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

  isFormValidateStatus = () => {
    this.tradingPartnerMasterForm.valueChanges.subscribe(() => {
      this.isFormDataChangeStatus = true;
    })
  }
}
