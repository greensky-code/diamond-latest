/* Copyright (c) 2020 . All Rights Reserved. */

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { DatePipe } from "@angular/common";
import {
  PopUpMessage,
  PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";

import {
  AlertMessage,
  AlertMessageService,
} from "../../../shared/components/alert-message";
import { AlternateSearchService } from "../../../api-services/alternate-search.service";
import { AlternateSearchModel } from "../../../api-models/alternate-search-model";
import { NgbToastType } from "ngb-toast";
import { ToastService } from "../../../shared/services/toast.service";
import { Menu } from "../../../shared/models/models";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FunctionalGroupShortCutComponent } from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { getAlternateSearchColumns } from "../../../shared/services/shared.service";
import { MedDefnAltSearchService } from "../../../api-services/med-defn-alt-search.service";
import {BenefitsHelpComponent} from "../../benefits/benefits-help/benefits-help.component";
import {MessageMasterDtl} from "../../../api-models";
import {MessageMasterDtlService} from "../../../api-services";

// Use the Component directive to define the AlternateSearchColumnsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "alternatesearchcolumns",
  templateUrl: "./alternate-search-columns.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    AlternateSearchService,
    MedDefnAltSearchService
  ],
})
export class AlternateSearchColumnsComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  alternateSearchColumnsForm: FormGroup;
  formValidation: FormValidation;
  alertMessage: AlertMessage;
  displayMessage: any;
  popUpMessage: PopUpMessage;
  dataGridGridOptions: GridOptions;
  dataGridgridApi: any;
  dataGridgridColumnApi: any;
  // update to true when Get records
  isFilter: boolean = false;
  menu: Menu[] = [];
  @Input() showIcon: boolean = false;
  alternateSearchModel: AlternateSearchModel[];
  editASC: boolean;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;
  shortcuts: ShortcutInput[] = [];
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;

  showPopUp() {
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

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === "yes") {
      console.log("button yes has been click!");
    }
    if (button.name === "no") {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  dataGridGridOptionsExportCsv() {
    const params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Search Priority",
        field: "criteriaSrchPriority",
        width: 180,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Alternate Search Criteria",
        field: "altSrchCriteria",
        width: 300,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private alternateSearchService: AlternateSearchService,
    private dateFormatPipe: DateFormatPipe,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private messageService: MessageMasterDtlService,
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.alternateSearchColumnsForm);
    this.createDataGrid();
    setTimeout(() => {
      this.populateAlternateSearchGrid();
    });
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(...getAlternateSearchColumns(this));
    this.cdr.detectChanges();
  }
  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.alternateSearchColumnsForm = this.formBuilder.group(
      {
        searchPriority: ["", { updateOn: "blur", validators: [Validators.required,Validators.min(1),Validators.max(1)] }],
        alternateS: ["", { updateOn: "blur", validators: [Validators.required] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  createNewAlternateSC() {
    this.editASC = false;
    this.alternateSearchColumnsForm.reset("", {
      onlySelf: true,
      emitEvent: false,
    });
    this.dataGridGridOptions.api.deselectAll();
    setTimeout(() => {
      this.alternateSearchColumnsForm.controls["searchPriority"].enable();
      this.editASC = false;
    }, 1000);
  }
  populateAlternateSearchGrid() {
    this.alternateSearchService.getAlternateSearchColumns().subscribe(
      (alternateSearchModel) => {
        this.alternateSearchModel = alternateSearchModel;
        this.dataGridGridOptions.api.setRowData(this.alternateSearchModel);
        this.dataGridGridOptions.api.selectIndex(0, false, false);
      }
    );
  }
  onSelectionChanged(event: any) {
    this.editASC = true;
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0]) {
      var asc = selectedRows[0];
      console.log(asc);
      this.alternateSearchColumnsForm.controls["searchPriority"].disable();
      this.alternateSearchColumnsForm.patchValue({
        searchPriority: asc.criteriaSrchPriority,
        alternateS: asc.altSrchCriteria,
      }, {emitEvent: false});
      this.isFormDataModified();
    }
  }
  updateASC() {
    this.formValidation.validateForm();
    if (this.alternateSearchColumnsForm.valid) {
      let asc = new AlternateSearchModel();
      asc.criteriaSrchPriority = this.alternateSearchColumnsForm.get(
        "searchPriority"
      ).value;
      asc.altSrchCriteria = this.alternateSearchColumnsForm.get(
        "alternateS"
      ).value;
      this.alternateSearchService.updateAlternateSearchColumns(asc).subscribe(
        (alternateSearchModel) => {
          this.toastService.showToast(
            "Record successfully updated.",
            NgbToastType.Success
          );
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close()
            }, 2000)
          }
          this.isFormDataChangeStatus = false;
        }
      );
    }
  }
  saveASC() {
    if (this.editASC) {
      this.updateASC();
    } else {
      this.createNewAsc();
    }
  }
  createNewAsc() {
    this.alternateSearchColumnsForm.markAsTouched();
    this.formValidation.validateForm();
    if (this.alternateSearchColumnsForm.valid) {
      let asc = new AlternateSearchModel();
      asc.criteriaSrchPriority = this.alternateSearchColumnsForm.get(
        "searchPriority"
      ).value;
      asc.altSrchCriteria = this.alternateSearchColumnsForm.get(
        "alternateS"
      ).value;
      this.alternateSearchService.createAlternateSearchColumns(asc).subscribe(
        (response) => {
          this.toastService.showToast(
            "Record successfully created.",
            NgbToastType.Success
          );
          this.editASC = false;
          if (this.screenCloseRequest === true) {
            setTimeout(() => {
              this.activeModal.close()
            }, 2000)
          }
          this.isFormDataChangeStatus = false;
        }
      );
    }
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
          { isHorizontal: true },
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
          { name: "2 Alternate Search Columns" },
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
  onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createNewAlternateSC();
          break;
        }
        case "Open": {
          // this.resetAllState();
          break;
        }
        case "Save": {
          this.saveASC();
          break;
        }
        case "Close": {
          // this.resetAllState();
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
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
        this.helpScreen()
    }

    else {
      // handle Edit-Menu Actions
      this.toastService.showToast("Action is in progress", NgbToastType.Danger);
    }
  }

  helpScreen = () => {
      const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.defaultFile = '/MEDCO_Alternate_Search_Columns.htm';
  };

  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Alternative Search Columns')
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
          this.saveASC();
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
    this.alternateSearchColumnsForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }
}
