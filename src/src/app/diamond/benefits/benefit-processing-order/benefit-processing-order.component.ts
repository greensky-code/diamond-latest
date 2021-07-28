import {DatePipe} from '@angular/common';
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from 'ag-grid-community';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {
  MessageType,
  PopUpMessage,
  PopUpMessageButton
} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {
  BenefProcessOrderMasterService,
  BenefProcessOrderDetailService,
  SecUserService, MessageMasterDtlService
} from '../../../api-services';
import {BenefProcessOrderMaster, BenefProcessOrderDetail, SecUser, MessageMasterDtl} from '../../../api-models';
import {elementAt} from 'rxjs-compat/operator/elementAt';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Menu} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {BenefitType} from './cell-renderers/benefit-type';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {getBenefitProcessingOrderShortcutKeys} from '../../../shared/services/shared.service';
import {Form} from '../../../shared/helpers/form.helper';
import {ProcessingOrder} from './cell-renderers/processing-order';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {BENEFIT_PROCESSING_ORDER_MODULE_ID} from '../../../shared/app-constants';
import {BenefitsHelpComponent} from "../benefits-help/benefits-help.component";

// Use the Component directive to define the BenefitProcessingOrderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: 'app-benefit-processing-order',
  templateUrl: './benefit-processing-order.component.html',
  styleUrls: ['./benefit-processing-order.component.scss'],
  providers: [DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    BenefProcessOrderMasterService,
    BenefProcessOrderDetailService
  ]
})
export class BenefitProcessingOrderComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  public benefitProcessingOrderForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public popUpMessage: PopUpMessage;
  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  public selectedDiv = 'MASTER';
  public shortcuts: ShortcutInput[] = [];

  editBenefProcessOrderMaster: boolean;
  private benefProcessOrderMaster: BenefProcessOrderMaster;
  private benefProcessOrderMasters: BenefProcessOrderMaster[];
  private isDataModified = false;
  private benefProcessOrderDetail: BenefProcessOrderDetail = new BenefProcessOrderDetail();
  private benefProcessOrderDetails: BenefProcessOrderDetail[];
  @Input() showIcon = false;
  @ViewChild('popUpMesssage') child: PopUpMessageComponent;

  public menu: Menu[] = [];

  secWin: SecWinViewModel;
  windowId = 'BORDR';
  userTemplateId: string;
  memberModuleId = BENEFIT_PROCESSING_ORDER_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
      private formBuilder: FormBuilder,
      private mask: Mask,
      private toastr: ToastService,
      private customValidators: CustomValidators,
      private alertMessageService: AlertMessageService,
      private dateFormatPipe: DateFormatPipe,
      public activeModal: NgbActiveModal,
      private toastService: ToastService,
      private router: Router, private cdr: ChangeDetectorRef,
      private modalService: NgbModal,
      private benefProcessOrderMasterService: BenefProcessOrderMasterService,
      private benefProcessOrderDetailService: BenefProcessOrderDetailService,
      private securityService: SecurityService,
      private secWinService: SecWinService,
      private secColDetailService: SecColDetailService,
      private messageService: MessageMasterDtlService,
      private secUserService: SecUserService) {
    this.benefProcessOrderMaster = new BenefProcessOrderMaster();
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  initializeComponentState() {
    this.createForm();
    this.menuInit();
    this.formValidation = new FormValidation(this.benefitProcessingOrderForm);
    this.createDataGrid001();
    this.createDataGrid002();
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
   * Get Security Column Details
   */
  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('BENEF_PROCESS_ORDER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                'You are not Permitted to view Benefit Processing Orderr',
                'Benefit Processing Order Permission'
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
    popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getBenefitProcessingOrderShortcutKeys(this));
    this.cdr.detectChanges();
  }

  public popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }

  public onClickDiv(selectedDiv: string) {
    this.selectedDiv = selectedDiv;
  }

  private showErrorPopUp(name: string, title: string, message: string, icon: string) {
    let popMsg = new PopUpMessage(name, title, message, icon, [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')], MessageType.ERROR);
    let ref = this.modalService.open(PopUpMessageComponent, {size: 'md'});
    ref.componentInstance.popupMessage = popMsg;
    ref.componentInstance.showIcon = true;

  }

  private showWarningPopUp(name: string, title: string, message: string, icon: string) {
    let popMsg = new PopUpMessage(name, title, message, icon, [], MessageType.WARNING);
    popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent, {size: 'md'});
    ref.componentInstance.popupMessage = popMsg;
    ref.componentInstance.showIcon = true;
    ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
      this.popupMessageHandler(event);
    });
  }

  private popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      this.saveBenefProcessOrderMaster();
    }
    if (button.name == 'no') {
      let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
      this.benefProcessOrderMaster = selectedRows[0];
      this.getBenefProcessOrderDetail(this.benefProcessOrderMaster.seqProcessingOrderId);
      this.patchBenefitProcessPricer(this.benefProcessOrderMaster);
      this.isDataModified = false;
    }
  }

  private menuInit() {
    this.menu = [
      {
        menuItem: 'File',
        dropdownItems: [{name: 'New'}, {name: 'Open'}, {name: 'Save'}, {name: 'Close'},
          {name: '-'}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
          {name: 'Print', disabled: true},
          {isHorizontal: true}, {name: 'Exit'}]
      },
      {
        menuItem: 'Edit',
        dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true},
          {name: 'Cut', disabled: true}, {name: 'Copy', disabled: true},
          {name: 'Paste', disabled: true}, {isHorizontal: true}, {name: 'Next'}, {name: 'Previous'}]
      },
      {
        menuItem: 'Notes',
        dropdownItems: [
          {name: 'Notes', shortcutKey: 'F4', disabled: true}
        ]
      }, {
        menuItem: 'Windows',
        dropdownItems: [
          {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
          {isHorizontal: true}, {name: 'Show Timestamp'}, {isHorizontal: true}, {name: '1 Main Menu'},
          {name: '2 Benefit Processing Order'}
        ]
      }, {
        menuItem: 'Help',
        dropdownItems: [
          {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
          {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
          {name: 'About Diamond Client/Server'}
        ]
      }
    ];
  }

  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === 'File') {             // handle File actions
      switch (event.action) {
        case 'New': {
          this.createForm();
          break;
        }
        case 'Open': {
          // statements;
          break;
        }
        case 'Save': {
          this.saveBenefProcessOrderMaster();
          break;
        }
        case 'Close': {
          this.benefitProcessingOrderForm.reset();
          break;
        }
        case 'Shortcut Menu': {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        default: {
          this.toastService.showToast('Action is not valid', NgbToastType.Danger);
          break;
        }
      }
    } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
      // add method to handle Edit actions
    } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions

    } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions

    } else if (event.menu.menuItem === 'Windows') {
      switch (event.action) {
        case '1 Main Menu': {
          this.router.navigate(['diamond/functional-groups']);
          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen()
    }
  }

  private createDataGrid001(): void {
    this.dataGrid001GridOptions = {
      paginationPageSize: 50
    };
    this.dataGrid001GridOptions.editType = 'fullRow';
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: 'Processing Order ID',
        field: 'processingOrderId',
        flex: 1
      },
      {
        headerName: 'Description',
        field: 'description',
        flex: 1
      },
      {
        headerName: 'Default',
        field: 'defaultOrder',
        flex: 1,
        valueFormatter: params => {
          if (params.value == 'N') {
            return 'No';
          }
          return 'Yes';
        }
      }
    ];
    this.dataGrid001GridOptions.rowSelection = 'single';
    this.getBenefProcessOrderMasters();
  }

  private createDataGrid002(): void {
    this.dataGrid002GridOptions = {
      context: {
        componentParent: this
      },
      paginationPageSize: 50
    };
    this.dataGrid002GridOptions.editType = 'fullRow';
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: 'Benefit Type',
        field: 'benefitType',
        flex: 1,
        headerClass: 'clr-blue',
        cellRendererFramework: BenefitType,
        cellRendererParams: {
          parentComponent: this
        }
      },
      {
        headerName: 'Processing Order',
        field: 'processingOrder',
        flex: 1,
        headerClass: 'clr-blue',
        cellRendererFramework: ProcessingOrder
      }
    ];

  }

  public onSelectionChanged(event: any) {
    if (this.isDataModified) {
      this.showWarningPopUp('saveChanges', 'Benefit Processing Order', '29065: Data has been modified. Press Yes to save the changes.', 'icon');
      return;
    }
    let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    this.benefProcessOrderMaster = selectedRows[0];
    this.getBenefProcessOrderDetail(this.benefProcessOrderMaster.seqProcessingOrderId);
    this.patchBenefitProcessPricer(this.benefProcessOrderMaster);
    this.isDataModified = false;
  }

  private patchBenefitProcessPricer(benefProcessOrder: BenefProcessOrderMaster): void {
    this.editBenefProcessOrderMaster = true;
    this.benefProcessOrderMaster = benefProcessOrder;
    this.benefitProcessingOrderForm.patchValue({
      'processingOrder': this.benefProcessOrderMaster.processingOrderId,
      'description': this.benefProcessOrderMaster.description,
      'default': this.benefProcessOrderMaster.defaultOrder != 'N'
    }, {emitEvent: false});
    this.isFormDataModified();
  }

  public addNewData() {
    if (this.selectedDiv == 'MASTER') {
      this.createForm();
    } else {
      this.insertNewData();
    }
  }

  public onChangeBenefitType(rowIndex: number, newValue: string, oldValue: string) {
    this.isDataModified = newValue != oldValue;
    let isDuplicate = false;
    this.dataGrid002GridOptions.api.forEachNode(function (node) {
      if (node.rowIndex != rowIndex && node.data.benefitType == newValue) {
        isDuplicate = true;
        return;
      }
    });
    if (isDuplicate) {
      this.showErrorPopUp('duplicateBenefitType', 'Benefit Processing Order', '21040: Duplicate Benefit Type', 'icon');
    }
  }

  public onChangeProcessingOrder(rowIndex: number, newValue: string, oldValue: string) {
    this.isDataModified = newValue != oldValue;
  }

  private isValidBenefitTypes(saveData: Array<BenefProcessOrderDetail>): boolean {
    let tempData: Array<String> = [];
    for (let val of saveData) {
      if (tempData.indexOf(val.benefitType) !== -1) {
        return false;
      }
      tempData.push(val.benefitType);
    }
    return true;
  }

  private createForm() {
    this.editBenefProcessOrderMaster = false;
    this.benefProcessOrderMaster = null;
    this.benefitProcessingOrderForm = this.formBuilder.group({
      processingOrder: [null, {validators: [Validators.required]}],
      description: [null, {validators: []}],
      default: [false, {validators: []}]
    });
    if (this.dataGrid002GridOptions) {
      this.dataGrid002GridOptions.api.setRowData([]);
    }
  }

  private insertNewData() {
    if (this.dataGrid002GridOptions.api.getDisplayedRowCount() >= 9) {
      return;
    }
    const newItems = [JSON.parse(JSON.stringify(this.benefProcessOrderDetail))];
    this.dataGrid002GridOptions.api.applyTransaction({
      add: newItems,
      addIndex: -1,
    });
    this.isDataModified = true;
  }

  public saveBenefProcessOrderMaster() {
    if (this.securityService.checkInsertUpdatePermissions(this.editBenefProcessOrderMaster, this.secWin)) {
      if (this.editBenefProcessOrderMaster) {
        this.updateBenefProcessOrderMaster(this.benefProcessOrderMaster.seqProcessingOrderId)
      } else {
        this.createBenefProcessOrderMaster();
      }
    }
  }

  private createBenefProcessOrderMaster() {
    this.formValidation.validateForm();
    if (this.benefitProcessingOrderForm.valid) {
      let benefProcessOrderMaster = new BenefProcessOrderMaster();
      benefProcessOrderMaster.processingOrderId = Form.getValue(this.benefitProcessingOrderForm, 'processingOrder');
      benefProcessOrderMaster.description = Form.getValue(this.benefitProcessingOrderForm, 'description');
      benefProcessOrderMaster.defaultOrder = Form.getValue(this.benefitProcessingOrderForm, 'default') ? 'Y' : 'N';
      this.benefProcessOrderMasterService.createBenefProcessOrderMaster(benefProcessOrderMaster).subscribe((response: BenefProcessOrderMaster) => {
          this.toastr.showToast('Record successfully created', NgbToastType.Success);
        this.benefProcessOrderMaster = response;
        this.editBenefProcessOrderMaster = true;
        if (this.saveBenefProcessOrderDetail(response.seqProcessingOrderId)) {
          this.getBenefProcessOrderMasters();
        }
      });

    } else {
      this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
    }
  }

  private updateBenefProcessOrderMaster(seqProcessingOrderId: number) {
    this.formValidation.validateForm();
    if (this.benefitProcessingOrderForm.valid) {
      let benefProcessOrderMaster = new BenefProcessOrderMaster();
      benefProcessOrderMaster.seqProcessingOrderId = seqProcessingOrderId;
      benefProcessOrderMaster.processingOrderId = Form.getValue(this.benefitProcessingOrderForm, 'processingOrder');
      benefProcessOrderMaster.description = Form.getValue(this.benefitProcessingOrderForm, 'description');
      benefProcessOrderMaster.defaultOrder = Form.getValue(this.benefitProcessingOrderForm, 'default') ? 'Y' : 'N';
      this.benefProcessOrderMasterService.updateBenefProcessOrderMaster(benefProcessOrderMaster, seqProcessingOrderId).subscribe(response => {
        this.toastr.showToast('Record successfully updated', NgbToastType.Success);
        if (this.saveBenefProcessOrderDetail(seqProcessingOrderId)) {
          this.getBenefProcessOrderMasters();
        }
      });
    } else {
      this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
    }
  }

  private getBenefProcessOrderMasters() {
    this.isDataModified = false;
    this.benefProcessOrderMasterService.getBenefProcessOrderMasters().subscribe(benefProcessOrderMasters => {
      this.benefProcessOrderMasters = benefProcessOrderMasters;
      this.dataGrid001GridOptions.api.setRowData(this.benefProcessOrderMasters);
      if (this.benefProcessOrderMaster) {
        const index: number = this.benefProcessOrderMasters.findIndex(x => x.seqProcessingOrderId == this.benefProcessOrderMaster.seqProcessingOrderId);
        this.dataGrid001GridOptions.api.selectIndex(index, false, false);
      } else {
        this.dataGrid001GridOptions.api.selectIndex(0, false, false);
      }
    });
  }

  private getBenefProcessOrderDetail(seqProcessingOrderId: number) {
    this.benefProcessOrderDetail.seqProcessingOrderId = seqProcessingOrderId;
    this.benefProcessOrderDetail.benefitType = null;
    this.benefProcessOrderDetailService.getBenefProcessOrderDetail(seqProcessingOrderId).subscribe(benefProcessOrderDetails => {
      benefProcessOrderDetails ? benefProcessOrderDetails.sort((a, b) => a.processingOrder - b.processingOrder) : 0;
      this.benefProcessOrderDetails = benefProcessOrderDetails;

      this.dataGrid002GridOptions.api.setRowData(this.benefProcessOrderDetails);

    });
  }

  private saveBenefProcessOrderDetail(seqProcessingOrderId: number): boolean {
    if (this.securityService.checkInsertUpdatePermissions(this.editBenefProcessOrderMaster, this.secWin)) {

      let saveData: Array<BenefProcessOrderDetail> = [];
      this.dataGrid002GridOptions.api.forEachNode(function (node) {
        let rowData: BenefProcessOrderDetail = node.data;
        if (rowData.benefitType == null || rowData.benefitType == undefined) {
          this.showErrorPopUp('requiredBenefitType', 'Benefit Processing Order', '29032: Benefit type is a required field. Enter something other than blanks.', 'icon');
          return;
        }
        if (rowData.processingOrder == null || rowData.processingOrder == undefined) {
          this.showErrorPopUp('requiredProccessingOrder', 'Benefit Processing Order', '29034: Value required for processing order', 'icon');
          return;
        }
        rowData.benefProcessOrderDetailPrimaryKey = {
          benefitType: rowData.benefitType,
          seqProcessingOrderId: seqProcessingOrderId
        };
        saveData.push(rowData);
      });
      if (saveData.length == 0) {
        return;
      }
      if (this.isValidBenefitTypes(saveData)) {
        this.benefProcessOrderDetailService.updateBenefitProcessOrderDetailList(saveData, seqProcessingOrderId).subscribe(response => {
          this.toastr.showToast('Record successfully updated', NgbToastType.Success);
        });
        return true;
      }
      this.showErrorPopUp('duplicateBenefitType', 'Benefit Processing Order', '21040: Duplicate Benefit Type', 'icon');
      return false;
    }
  }

  deleteBenefProcessOrderDetail(seqProcessingOrderId: number) {
    if (!(this.secWin.hasDeletePermission())) {
      return;
    }
    this.benefProcessOrderDetailService.deleteBenefProcessOrderDetail(seqProcessingOrderId).subscribe(response => {
      this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
    });
  }


  getBenefProcessOrderDetails() {
    this.benefProcessOrderDetailService.getBenefProcessOrderDetails().subscribe(benefProcessOrderDetails => {
      this.benefProcessOrderDetails = benefProcessOrderDetails;
    });
  }

  deleteBenefProcessOrderMaster(seqProcessingOrderId: number) {
    if (!(this.secWin.hasDeletePermission())) {
      return;
    }
    this.benefProcessOrderMasterService.deleteBenefProcessOrderMaster(seqProcessingOrderId).subscribe(response => {
      this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
    });
  }

  getBenefProcessOrderMaster(seqProcessingOrderId: number) {
    this.benefProcessOrderMasterService.getBenefProcessOrderMaster(seqProcessingOrderId).subscribe(benefProcessOrderMaster => {
      this.benefProcessOrderMaster = benefProcessOrderMaster;
      this.benefitProcessingOrderForm.patchValue({
        'processingOrder': this.benefProcessOrderMaster.processingOrderId,
      });
    });
  }

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  helpScreen = () => {
      const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.defaultFile = '/BORDR_Benefit_Processing_Order.htm';
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Benefit Processing Order')
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
          this.saveBenefProcessOrderMaster();
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
    this.benefitProcessingOrderForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }

}
