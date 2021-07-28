/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgGridEvent, GridOptions } from "ag-grid-community";
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { NgbToastType } from "ngb-toast";
import { DrgGrouperPricer } from "../../../api-models/drg-grouper-pricer.model";
import { DrgGrouperPricerService } from "../../../api-services/drg-grouper-pricer.service";
import { AlertMessage, AlertMessageService } from "../../../shared/components/alert-message";
import { PopUpMessage, PopUpMessageButton } from "../../../shared/components/pop-up-message";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DatePickerConfig, datePickerModel } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import { Menu } from "../../../shared/models/models";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { getDrgGrouperpricerMaintenanceShortcutKeys } from "../../../shared/services/shared.service";
import { ToastService } from "../../../shared/services/toast.service";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {PricingHelpComponent} from "../pricing-help/pricing-help.component";
import {MessageMasterDtl} from "../../../api-models";
import {MessageMasterDtlService} from "../../../api-services";


// Use the Component directive to define the DrgGrouperpricerMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

  selector: 'drg-grouper-pricer-maintenance',
  templateUrl: './drg-grouper-pricer-maintenance.component.html',
  styleUrls: ['./drg-grouper-pricer-maintenance.component.scss'],
  providers: [DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    DrgGrouperPricerService
  ]

})
export class DrgGrouperpricerMaintenanceComponent implements OnInit {

  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  public drgGrouperpricerMaintenanceForm: FormGroup;
  public formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public popUpMessage: PopUpMessage;
  public dataGridGridOptions: GridOptions;
  public shortcuts: ShortcutInput[] = [];
  public menu: Menu[] = [];

  private dataGridgridApi: any;
  private dataGridgridColumnApi: any;
  private displayMessage: any;
  private datePickerConfig = DatePickerConfig;
  private datePickerModel = datePickerModel;
  private editDrgGrouperPricer: boolean;
  private newRowAdded: boolean = false;
  private drgGrouperPricer: DrgGrouperPricer;
  private drgGrouperPricers: DrgGrouperPricer[];
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;

  @Input() showIcon: boolean = false;
  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mask: Mask, private cdr: ChangeDetectorRef,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private modalService: NgbModal,
    private dateFormatPipe: DateFormatPipe,
    private toastService: ToastService,
    private messageService: MessageMasterDtlService,
    private drgGrouperPricerService: DrgGrouperPricerService) {
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.drgGrouperpricerMaintenanceForm);
    this.createDataGrid();
    this.getDrgGrouperPricers();
  }


  ngAfterViewInit(): void {
    this.shortcuts.push(...getDrgGrouperpricerMaintenanceShortcutKeys(this));
    this.cdr.detectChanges();
  }

  private showPopUp() {
    this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
    this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
    this.child.showMesssage()
  }

  private popupMessageHandler(button: PopUpMessageButton): boolean {
    if (button.name == 'yes') {
      console.log("button yes has been click!");
      return true;
    }
    console.log("button No has been click!");
    return false
  }

  public popUpButtonHandler(button: PopUpMessageButton) {
    if (!this.popupMessageHandler(button)) return;

    if (button.popupMessage.name == 'saveChangedData') {
      this.saveDrgGrouperPricer();
      this.insertNewData();
    }
  }

  public gridReadyEvent(params: AgGridEvent) {
    this.dataGridgridApi = params.api;
    this.loadGrid(params);
  }

  public onSelectRow($event: any) {
    if (this.dataGridgridApi.getSelectedNodes() && this.dataGridgridApi.getSelectedNodes().lenght > 0) {
      this.patchDrgGrouperPricer(this.dataGridgridApi.getSelectedNodes()[0].data);
    }
  }

  /**
    * Handle Menu Actions
    * @param event: {action: string, menu: MenuItem}
    */
  public onMenuItemClick(event: any): void {
    if (event.menu.menuItem === 'File') {             // handle File actions
      switch (event.action) {
        case 'New': {
          this.addNewDrgGrouperPricer();
          break;
        }
        case 'Open': {
          break;
        }
        case 'Save': {
          this.saveDrgGrouperPricer();
          break;
        }
        case 'Close': {
          this.drgGrouperpricerMaintenanceForm.reset();
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
    } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions

    } else if (event.menu.menuItem === 'Topic') {             // handle special-Menu Actions
    } else if (event.menu.menuItem === 'Windows') {
      // add method
    } else if (event.menu.menuItem === 'Help') {             // handle File actions
        this.helpScreen();
    }
  }

  private loadGrid(agGridEvent?: AgGridEvent) {
    this.dataGridgridApi.setRowData([]);
  }

  private createDrgGrouperPricer() {
    this.formValidation.validateForm();
    if (this.drgGrouperpricerMaintenanceForm.valid) {
      let drgGrouperPricer = new DrgGrouperPricer();
      drgGrouperPricer.drgGrouperPricerId = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'grouperpricerId');
      drgGrouperPricer.version = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'version');
      drgGrouperPricer.grouperPricerCode = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'code');
      drgGrouperPricer.description = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'description');
      this.drgGrouperPricerService.createDrgGrouperPricer(drgGrouperPricer).subscribe(response => {
        this.toastService.showToast('Record successfully created', NgbToastType.Success);
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close()
          }, 2000)
        }
        this.isFormDataChangeStatus = false
        this.clearSelection();
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }

  private updateDrgGrouperPricer(drgGrouperPricerId: string) {
    this.formValidation.validateForm();
    if (this.drgGrouperpricerMaintenanceForm.valid) {
      let drgGrouperPricer = new DrgGrouperPricer();
      drgGrouperPricer.drgGrouperPricerId = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'grouperpricerId');
      drgGrouperPricer.version = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'version');
      drgGrouperPricer.grouperPricerCode = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'code');
      drgGrouperPricer.description = Form.getValue(this.drgGrouperpricerMaintenanceForm, 'description');
      this.drgGrouperPricerService.updateDrgGrouperPricer(drgGrouperPricer, drgGrouperPricerId).subscribe(response => {
        this.toastService.showToast('Record successfully updated', NgbToastType.Success);
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close()
          }, 2000)
        }
        this.isFormDataChangeStatus = false
      });
    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }

  public addNewDrgGrouperPricer() {
    if (this.newRowAdded) {
      return;
    }
    if (this.editDrgGrouperPricer) {
      let popMsg = new PopUpMessage('saveChangedData', 'GrouperPricer', '29065: Data has been modified. Press yes to save the changes.', 'icon');
      popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
      let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
      ref.componentInstance.popupMessage = popMsg;
      ref.componentInstance.showIcon = true;
      ref.componentInstance["buttonclickEvent"].subscribe((event: PopUpMessageButton) => {
        this.popUpButtonHandler(event);
      });
    } else {
      this.insertNewData();
    }
  }

  private insertNewData() {
    this.clearSelection();
    this.newRowAdded = true;
    const newItems = [this.drgGrouperPricer];
    this.dataGridgridApi.applyTransaction({
      add: newItems,
      addIndex: -1,
    });
    const length = this.dataGridgridApi.getDisplayedRowCount();
    this.dataGridgridApi.forEachNode((node) => {
      node.rowIndex == length - 1 ? node.setSelected(true) : 0;
    });
  }

  public saveDrgGrouperPricer() {
    if (this.editDrgGrouperPricer) {
      this.updateDrgGrouperPricer(this.drgGrouperPricer.drgGrouperPricerId)
    } else {
      this.createDrgGrouperPricer();
    }
  }

  private deleteDrgGrouperPricer(drgGrouperPricerId: string) {
    this.drgGrouperPricerService.deleteDrgGrouperPricer(drgGrouperPricerId).subscribe(response => {
      this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
    });
  }

  private getDrgGrouperPricer(drgGrouperPricerId: string) {
    this.drgGrouperPricerService.getDrgGrouperPricer(drgGrouperPricerId).subscribe(drgGrouperPricer => {
      this.patchDrgGrouperPricer(drgGrouperPricer);
    });
  }

  private getDrgGrouperPricers() {
    this.drgGrouperPricerService.getDrgGrouperPricers().subscribe(drgGrouperPricers => {
      this.drgGrouperPricers = drgGrouperPricers;
      if (drgGrouperPricers && drgGrouperPricers.length > 0) {
        this.dataGridGridOptions.api.setRowData(this.drgGrouperPricers);
        this.dataGridgridApi.forEachNode((node) => node.rowIndex ? 0 : node.setSelected(true));
        this.patchDrgGrouperPricer(this.drgGrouperPricers[0])
      } else {
        this.editDrgGrouperPricer = false;
        this.dataGridGridOptions.api.setRowData([]);
        this.clearSelection();
      }
    });
  }

  private patchDrgGrouperPricer(drgGrouperPricers: DrgGrouperPricer): void {
    this.editDrgGrouperPricer = true;
    this.drgGrouperPricer = drgGrouperPricers;
    this.drgGrouperpricerMaintenanceForm.patchValue({
      'grouperpricerId': this.drgGrouperPricer.drgGrouperPricerId,
      'version': this.drgGrouperPricer.version,
      'code': this.drgGrouperPricer.grouperPricerCode,
      'description': this.drgGrouperPricer.description
    }, {emitEvent: false});
    setTimeout(() => {
      this.isFormDataModified()
    }, 2000)
    this.drgGrouperpricerMaintenanceForm.get('grouperpricerId').disable();
    this.drgGrouperpricerMaintenanceForm.get('version').disable();
    this.drgGrouperpricerMaintenanceForm.get('code').disable();
  }

  private clearSelection() {
    this.newRowAdded = false;
    this.editDrgGrouperPricer = false;
    this.drgGrouperpricerMaintenanceForm.reset();
    this.drgGrouperpricerMaintenanceForm.get('grouperpricerId').enable();
    this.drgGrouperpricerMaintenanceForm.get('version').enable();
    this.drgGrouperpricerMaintenanceForm.get('code').enable();
    this.dataGridgridApi.getDisplayedRowCount() >0 ? this.dataGridgridApi.forEachNode((node) => node.setSelected(false)): 0;
    this.drgGrouperPricer = new DrgGrouperPricer();
  }

  private createDataGrid(): void {
    this.dataGridGridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Grouper/Pricer ID",
        field: "drgGrouperPricerId",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Version",
        field: "version",
        width: 200
      },
      {
        headerName: "Code",
        field: "grouperPricerCode",
        width: 200
      },
      {
        headerName: "Description",
        field: "description",
        width: 200
      }
    ];
  }


  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  private createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.drgGrouperpricerMaintenanceForm = this.formBuilder.group({
      grouperpricerId: ['', { updateOn: 'blur', validators: [] }],
      version: ['', { updateOn: 'blur', validators: [] }],
      code: ['', { updateOn: 'blur', validators: [] }],
      description: ['', { updateOn: 'blur', validators: [] }]
    });
  }

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  /**
     * Initialize menu
     */
  private menuInit(): void {
    this.menu = [
      {
        menuItem: 'File',
        dropdownItems: [{ name: 'New' }, { name: 'Open' }, { name: 'Delete' }, { name: 'Save' }, { name: 'Close' },
        { isHorizontal: true }, { name: 'Main Menu...' }, { name: 'Shortcut Menu...' },
        { isHorizontal: true }, { name: 'Print', disabled: true },
        { isHorizontal: true }, { name: 'Exit' }]
      },
      {
        menuItem: 'Edit',
        dropdownItems: [{ name: 'Undo', disabled: true }, { isHorizontal: true }, { name: 'Cut', disabled: true },
        { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true },
        { name: 'Next' }, { name: 'Previous', disabled: true }, { isHorizontal: true }, { name: 'Lookup' }
        ]
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
          { isHorizontal: true }, { name: 'Show Timestamp' }, { name: 'Audit Display' }, { isHorizontal: true }, { name: '1 Main Menu' }
        ]
      }, {
        menuItem: 'Help',
        dropdownItems: [
          { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
          { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
          { name: 'About Diamond Client/Server' }
        ]
      }
    ];
  }

  helpScreen = () => {
      const viewModal = this.modalService.open(PricingHelpComponent, { windowClass: "myCustomModalClass" });
      viewModal.componentInstance.defaultFile = 'DRGGP_Field_Definitions_REF.htm'
  }

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Drg Grouper/Pricer Maintenance')
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
          this.saveDrgGrouperPricer();
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
    this.drgGrouperpricerMaintenanceForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }

}
