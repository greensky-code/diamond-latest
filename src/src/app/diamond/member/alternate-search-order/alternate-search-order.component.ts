/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { MedDefnAltSearchService } from '../../../api-services/med-defn-alt-search.service';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { MedDefnAltSearch } from '../../../api-models/med-defn-alt-search.model';
import { Menu } from '../../../shared/models/models';
import {MedDefnRulesService, SecUserService, SystemCodesService} from '../../../api-services';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {ALTERNATE_SEARCH_ORDER_MODULE_ID} from '../../../shared/app-constants';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecUser} from "../../../api-models";
import {BenefitsHelpComponent} from "../../benefits/benefits-help/benefits-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {
    getAlternateSearchOrderShortcutKeys,
    getBenefitWeightAccumulatorShortcutKeys
} from "../../../shared/services/shared.service";

// Use the Component directive to define the AlternateSearchOrderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: 'alternaetesearchorder',
  templateUrl: './alternate-search-order.component.html',
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    MedDefnAltSearchService,
    MedDefnRulesService,
    SystemCodesService
  ]
})
export class AlternateSearchOrderComponent implements OnInit {

  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() public showIcon: boolean = false;
  public alternaeteSearchOrderForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  private displayMessage: any;
  public popUpMessage: PopUpMessage;
  public dataGridGridOptions: GridOptions;
  public isFilter: boolean = false;  // update to true when Get records
  public isDisabled: boolean = false;
  public menu: Menu[] = [];
  public ClaimType: any;

  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;
  @ViewChild('popUpMesssage') child: PopUpMessageComponent;
  secWin: SecWinViewModel;
  windowId = 'MEDOR';
  userTemplateId: string;
  memberModuleId = ALTERNATE_SEARCH_ORDER_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
    alternateSearchOrders: MedDefnAltSearch[];
    shortcuts: ShortcutInput[] = [];
  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private toastService: ToastService,
    private SystemCodesService: SystemCodesService,
    private medDefRuleService: MedDefnRulesService,
    private medDefnAltSearchService: MedDefnAltSearchService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private secUserService: SecUserService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal) { }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  initializeComponentState() {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.alternaeteSearchOrderForm);
    this.createDataGrid();
    this.getClaimType('CLAIMTYPE', '0');
    this.populateAlternateSearchOrder();
  }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAlternateSearchOrderShortcutKeys(this));
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
                'You are not Permitted to view Alternate Search Order',
                'Alternate Search Order Permission'
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
    this.secColDetailService.findByTableNameAndUserId('MED_DEFN_ALT_SEARCH', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

  }

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  private popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === 'yes') {
      console.log('button yes has been click!');
    }
    if (button.name === 'no') {
      console.log('button No has been click!');
    }
  }

  public popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }

  private createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: 'Priority',
        field: 'medDefnAltSearchPrimaryKey.criteriaSrchPriority',
        width: 100,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: 'Alt Srch Value',
        field: 'medDefnAltSearchPrimaryKey.altSrchCritValue',
        width: 180
      },
      {
        headerName: 'Srch Order',
        field: 'medDefnAltSearchPrimaryKey.criteriaSrchOrder',
        width: 120
      },
      {
        headerName: 'Claim',
        field: 'medDefnAltSearchPrimaryKey.claimType',
        width: 100
      },
      {
        headerName: 'Order',
        field: 'medDefnAltSearchPrimaryKey.medDefOrder',
        width: 100
      },
      {
        headerName: 'Code',
        field: 'medDefCode',
        width: 100
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 120
      }
    ];
  }

  private getClaimType(codeType: string, langId: string) {
    this.SystemCodesService.getSystemCodesByLangAndtype(codeType, langId).subscribe(ClaimType => {
      this.ClaimType = ClaimType;
    });
  }

  private populateAlternateSearchOrder() {
    this.medDefnAltSearchService.getMedDefnAltSearches().subscribe((searches: MedDefnAltSearch[]) => {
      this.alternateSearchOrders = searches;
      this.dataGridGridOptions.api.setRowData(searches);
      this.dataGridGridOptions.api.selectIndex(0, false, false);
    });
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: 'File',
        dropdownItems: [{ name: 'New' }, { name: 'Open' }, { name: 'Delete' }, { name: 'Save' }, { name: 'Close' },
        { isHorizontal: true }, { name: 'Main Menu' }, { name: 'Shortcut Menu' },
        { isHorizontal: true }, { name: 'Print', disabled: true }, { isHorizontal: true }, { name: 'Exit' }]
      },
      {
        menuItem: 'Edit',
        dropdownItems: [{ name: 'Undo', disabled: true }, { isHorizontal: true }, { name: 'Cut', disabled: true },
        { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true },
        { name: 'Next' }, { name: 'Previous' }, { isHorizontal: true }, { name: 'Lookup' }]
      },
      {
        menuItem: 'Notes',
        dropdownItems: [
          { name: 'Notes', shortcutKey: 'F4', disabled: true }
        ]
      }, {
        menuItem: 'Windows',
        dropdownItems: [
          { name: 'Tile' }, { name: 'Layer' }, { name: 'Cascade' }, { name: 'Arrange Icons' },
          { isHorizontal: true }, { name: 'Show Timestamp' }, { name: 'Audit Display' }, { isHorizontal: true }, { name: '1 Main Menu' },
          { name: '2 Alternate Search Columns' }, { name: '3 Alternate Search Order' }
        ]
      }, {
        menuItem: 'Help',
        dropdownItems: [
          { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window' }, { isHorizontal: true },
          { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
          { name: 'About Diamond Client/Server' }
        ]
      }
    ];
  }

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === 'File') {
      switch (event.action) {
        case 'New': {
          this.isDisabled = false;
          this.dataGridGridOptions.api.deselectAll();
          this.alternaeteSearchOrderForm.reset();
          let data = [];
          for (let item of this.alternateSearchOrders) {
            data.push(item);
          }
          data.push([]);
          this.dataGridGridOptions.api.setRowData(data);
          this.dataGridGridOptions.api.selectIndex(data.length - 1, false, false);
          this.alternaeteSearchOrderForm.enable();
          break;
        }
        case 'Save': {
          if (!this.isDisabled) {
            this.saveSearchOrder();
          }
          break;
        }
        default: {
          this.toastService.showToast('Action is in progress', NgbToastType.Danger);
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
      this.toastService.showToast('Action is in progress', NgbToastType.Danger);
    }
  }

  public changeMedDefOrder(event: any) {
    console.log(event.target.value);
    this.medDefRuleService.findByMedDefOrder(event.target.value).subscribe((searches: any) => {
      console.log(searches);
      if (searches != null && searches.length > 0) {

        this.alternaeteSearchOrderForm.patchValue({
          medDefCode: searches[0].medDefnRulesPrimaryKey.medDefCode,
          description: searches[0].description
        });
      } else {
        this.toastService.showToast('4026: The Med Def Order entered does not exists in the Med Def Rules Table', NgbToastType.Danger)
      }
    });
  }

  private createRequestBody() {
    return {
      medDefnAltSearchPrimaryKeyModel: {
        medDefOrder: this.alternaeteSearchOrderForm.get('medDefOrder').value,
        criteriaSrchOrder: this.alternaeteSearchOrderForm.get('criteriaSrchOrder').value,
        altSrchCritValue: this.alternaeteSearchOrderForm.get('altSrchCritValue').value,
        criteriaSrchPriority: this.alternaeteSearchOrderForm.get('criteriaSrchPriority').value,
        claimType: this.alternaeteSearchOrderForm.get('claimType').value
      },
      medDefCode: this.alternaeteSearchOrderForm.get('medDefCode').value,
      description: this.alternaeteSearchOrderForm.get('description').value
    };
  }

  private saveSearchOrder() {
    if (this.securityService.checkInsertUpdatePermissions(false, this.secWin)) {
      this.formValidation.validateForm();
      if (this.alternaeteSearchOrderForm.valid) {
        const body = this.createRequestBody();
        this.medDefnAltSearchService.createMedDefnAltSearch(body).subscribe((result) => {
          this.toastService.showToast('Record successfully created.', NgbToastType.Success);
          this.populateAlternateSearchOrder();
          this.alternaeteSearchOrderForm.reset();
        })
      }
    }
  }

  public orderGridChange() {
    const selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    this.isDisabled = true;
    this.alternaeteSearchOrderForm.patchValue({
      criteriaSrchPriority: selectedRows[0].medDefnAltSearchPrimaryKey.criteriaSrchPriority,
      altSrchCritValue: selectedRows[0].medDefnAltSearchPrimaryKey.altSrchCritValue,
      criteriaSrchOrder: selectedRows[0].medDefnAltSearchPrimaryKey.criteriaSrchOrder,
      medDefOrder: selectedRows[0].medDefnAltSearchPrimaryKey.medDefOrder,
      claimType: selectedRows[0].medDefnAltSearchPrimaryKey.claimType,
      medDefCode: selectedRows[0].medDefCode,
      description: selectedRows[0].description
    });
    this.disableFields();
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  private createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.alternaeteSearchOrderForm = this.formBuilder.group({
      criteriaSrchPriority: ['', { validators: [Validators.required] }],
      altSrchCritValue: ['', { validators: [Validators.required] }],
      criteriaSrchOrder: ['', { validators: [Validators.required] }],
      medDefOrder: ['', { validators: [Validators.required] }],
      claimType: ['', { validators: [Validators.required] }],
      medDefCode: ['', { validators: [] }],
      description: ['', { validators: [] }]
    }, { updateOn: 'submit' });
  }

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

    disableFields = () => {
        this.alternaeteSearchOrderForm.get('criteriaSrchPriority').disable();
        this.alternaeteSearchOrderForm.get('altSrchCritValue').disable();
        this.alternaeteSearchOrderForm.get('criteriaSrchOrder').disable();
        this.alternaeteSearchOrderForm.get('medDefOrder').disable();
        this.alternaeteSearchOrderForm.get('claimType').disable();
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/MEDOR_Alternate_Search_Order.htm';
    }
}
