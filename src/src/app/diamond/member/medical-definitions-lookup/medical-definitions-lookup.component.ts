/* Copyright (c) 2020 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { MedDefnCodeService, MessageMasterDtlService, SecUserService } from '../../../api-services';
import { MedDefnCode, MedDefnRulesDeterminant, MessageMasterDtl, SecUser } from '../../../api-models';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { Menu } from '../../../shared/models/models';
import { MedDefnCodes } from '../../../api-models/testing/fake-med-defn-code.model';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { getMedDefLookupShortcutKeys } from '../../../shared/services/shared.service';
import { SecurityService } from "../../../shared/services/security.service";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { MEDICAL_DEF_LOOKUP_MODULE_ID, MEM_MODULE_ID } from "../../../shared/app-constants";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecWin } from "../../../api-models/security/sec-win.model";
import { TimestampComponent } from "../../../shared/components/timestamp/timestamp.component";
import { Router } from "@angular/router";
import { BenefitsHelpComponent } from "../../benefits/benefits-help/benefits-help.component";
import { MessageType } from '../../../shared/components/count-down-pop-up-message';
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';

// Use the Component directive to define the MedicalDefinitionsLookupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "medicaldefinitionslookup",
  templateUrl: "./medical-definitions-lookup.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    MedDefnCodeService,
  ],
})
export class MedicalDefinitionsLookupComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  medicalDefinitionsLookupForm: FormGroup;
  formValidation: FormValidation;
  alertMessage: AlertMessage;
  displayMessage: any;
  popUpMessage: PopUpMessage;
  dataGridGridOptions: GridOptions;
  dataGridgridApi: any;
  dataGridgridColumnApi: any;
  editMedDefnCode: boolean;
  medDefnCode: MedDefnCode;
  medDefnCodes: MedDefnCode[];
  @Input() showIcon: boolean = false;
  // update to true when Get records
  isFilter: boolean = false;
  @ViewChild("popUpMesssage") child: PopUpMessageComponent;
  menu: Menu[] = [];
  editMedDef: any;
  shortcuts: ShortcutInput[] = [];
  desc: any;

  secWin: SecWinViewModel;
  windowId = "MEDLU";
  userTemplateId: string;
  moduleId = MEDICAL_DEF_LOOKUP_MODULE_ID;
  secColDetails = new Array<SecColDetail>();
  inProgress = true;
  isSuperUser = false;
  secProgress = true;
  screenCloseRequest: Boolean = false;
  valueChanged: Boolean = false;

  insertDateTime: any;
  insertUser: any;
  insertProcess: any;
  updateDateTime: any;
  updateUser: any;
  updateProcess: any;
  isAlredaySaved = false;

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

  deleteMedDefLookup() {
    if (this.isSuperUser) {
      this.deleteMEDLUPopup();
    } else {
      if (this.secWin.hasDeletePermission()) {
        this.deleteMEDLUPopup();
      } else {
        this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
          this.form1PopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
        });
      }
    }
  }

  dataGridGridOptionsExportCsv() {
    const params = {};
    this.dataGridgridApi.exportDataAsCsv(params);
  }

  saveMedicalDefinition() {
    this.medicalDefinitionsLookupForm.markAllAsTouched();
    if (this.editMedDef) {
      if (this.isSuperUser) {
        this.updateMedDefLookUp();
      } else {
        if (this.secWin.hasUpdatePermission()) {
          this.updateMedDefLookUp();
        } else {
          this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
            this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
          });
        }
      }

    } else {
      if (!this.isAlredaySaved) {
        if (this.isSuperUser) {
          this.createMedDefLookUp();
        } else {
          if (this.secWin.hasInsertPermission()) {
            this.createMedDefLookUp();
          } else {
            this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
              this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
            });
          }
        }



      } else {
        this.activeModal.close();
      }
    }

  }

  createMedDefLookUp() {
    this.formValidation.validateForm();
    if (this.medicalDefinitionsLookupForm.valid) {
      let medDef = new MedDefnCode();
      medDef.medDefCode =
        this.medicalDefinitionsLookupForm.get("medDefCode").value;
      medDef.description =
        this.medicalDefinitionsLookupForm.get("description").value;
      this.medDefnCodeService.createMedDefnCode(medDef).subscribe((meddef) => {
        this.toastService.showToast(
          "Record successfully created.",
          NgbToastType.Success
        );
        this.editMedDef = false;
        this.isAlredaySaved = true;
        this.getMedDefnCodes();
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
          this.valueChanged = false;
        }
      });
    }
  }

  onDescKeyup(event: any) {
    this.desc = event.target.value;
  }

  updateMedDefLookUp() {
    this.formValidation.validateForm();
    this.medicalDefinitionsLookupForm.markAllAsTouched();
    if (this.medicalDefinitionsLookupForm.valid) {
      this.cdr.detectChanges();
      this.medicalDefinitionsLookupForm.value;
      let medDef = new MedDefnCode();
      medDef.medDefCode =
        this.medicalDefinitionsLookupForm.get("medDefCode").value;

      medDef.description = this.desc;
      this.medDefnCodeService
        .updateMedDefnCode(medDef, medDef.medDefCode)
        .subscribe(
          (meddef) => {
            this.toastService.showToast(
              "Record successfully updated.",
              NgbToastType.Success
            );
            this.editMedDef = true;
            this.getMedDefnCodes();
            if (this.screenCloseRequest === true) {
              setTimeout(() => {
                this.activeModal.close();
              }, 2000);
              this.valueChanged = false;
            }
          },
          (error) => {
            this.editMedDef = true;
          }
        );
    }
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";
    this.dataGridGridOptions.rowSelection = "single";
    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Med Def Code",
        field: "medDefCode",
        sort: "asc",
        type: "numberColumn",
        // width: 180,
        flex: 1,
        // headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true
      },
      {
        headerName: "Description",
        field: "description",
        // width: 150
        flex: 1,
      },
    ];
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private medDefnCodeService: MedDefnCodeService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secColDetailService: SecColDetailService,
    private messageService: MessageMasterDtlService,
    private router: Router,
    private secUserService: SecUserService,
    private menuSerrvice: MenuService
  ) {
    this.medDefnCode = new MedDefnCode();
  }

  initializeComponentState() {
    this.createForm();
    this.menuInit();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.medicalDefinitionsLookupForm);
    this.createDataGrid();
    this.getMedDefnCodes();
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
    this.secWinService
      .getSecWin(this.windowId, secUserId)
      .subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
          this.initializeComponentState();
          //Check Menus Privilege Start
          let menuResponse = new MenuResponse();
          menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
          if (menuResponse.status) {
            this.menu = [];
            this.menu = [...menuResponse.menus];
          }
          //Check Menus Privilege End
          this.secProgress = false;
        } else {
          this.secProgress = false;

          this.showPopUp(
            "You are not Permitted to view Medical Definition Lookup",
            "Medical Definition Lookup Permission"
          );
        }
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
    this.secColDetailService
      .findByTableNameAndUserId("MED_DEFN_CODE", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.inProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.hasPermission();
  }

  ngAfterViewInit(): void {
    this.shortcuts.push(...getMedDefLookupShortcutKeys(this));
    this.cdr.detectChanges();
    this.medicalDefinitionsLookupForm.valueChanges.subscribe(() => {
      this.valueChanged = true;
    });
  }

  onSelectionChanged(event: any) {
    this.editMedDef = true;
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    var meddef = selectedRows[0];
    this.medicalDefinitionsLookupForm.controls["medDefCode"].disable({
      emitEvent: false,
    });
    this.medicalDefinitionsLookupForm.patchValue(
      {
        medDefCode: meddef.medDefCode,
        description: meddef.description,
      },
      { emitEvent: false }
    );

    this.insertDateTime = meddef.insertDatetime;
    this.insertUser = meddef.insertUser;
    this.insertProcess = meddef.insertProcess;
    this.updateDateTime = meddef.updateDatetime;
    this.updateUser = meddef.updateUser;
    this.updateProcess = meddef.updateProcess;
  }

  createMedDefLookup() {
    if (this.isSuperUser) {
      this.createMedDefLkp();
    } else {
      if (this.secWin.hasInsertPermission()) {
        this.createMedDefLkp();
      } else {
        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
          this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
        });
      }
    }
  }

  createMedDefLkp() {
    this.editMedDef = false;
    this.medicalDefinitionsLookupForm.reset("", {
      onlySelf: true,
      emitEvent: false,
    });
    this.dataGridGridOptions.api.deselectAll();
    setTimeout(() => {
      this.medicalDefinitionsLookupForm.controls["medDefCode"].enable();
      this.editMedDef = false;
    }, 1000);
  }

  getMedDefnCodes() {
    this.medDefnCodeService.getMedDefnCodes().subscribe((medDefnCodes) => {
      this.medDefnCodes = medDefnCodes;
      setTimeout(() => {
        this.dataGridGridOptions.api.setRowData(this.medDefnCodes);
        this.dataGridGridOptions.api.selectIndex(0, false, false);
      });
    });
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.medicalDefinitionsLookupForm = this.formBuilder.group(
      {
        medDefCode: [
          "",
          { updateOn: "blur", validators: [Validators.required] },
        ],
        description: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open", disabled: true },
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
  onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      // handle File actions
      switch (event.action) {
        case "New": {
          this.createMedDefLookup();
          break;
        }
        case "Open": {
          //this.resetAllState();
          break;
        }
        case "Save": {
          this.saveMedicalDefinition();
          break;
        }

        case "Delete": {
          this.deleteMEDLUPopup();
          break;
        }

        case "Close": {
          //this.resetAllState();
          break;
        }
        case "Shortcut Menu": {
          this.modalService.open(FunctionalGroupShortCutComponent);
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
    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
        case "Show Timestamp":
          this.showTimeStamp();
          break;
      }
      {
      }
    } else if (event.menu.menuItem == "Help") {
      /**
       * Open help modal
       */
      this.helpScreen();
    } else {
      // handle Edit-Menu Actions
      this.toastService.showToast("Action is in progress", NgbToastType.Danger);
    }
  }

  showTimeStamp = () => {
    let ref = this.modalService.open(TimestampComponent);
    ref.componentInstance.title = "Medical Definitions";
    ref.componentInstance.insertDateTime = this.insertDateTime;
    ref.componentInstance.insertProcess = this.insertProcess;
    ref.componentInstance.insertUser = this.insertUser;
    ref.componentInstance.updateUser = this.updateUser;
    ref.componentInstance.updateDateTime = this.updateDateTime;
    ref.componentInstance.updateProcess = this.updateProcess;
  };
  disableMenu() {
    if (this.userTemplateId == "UT_VIEW") {
      this.menu[0]["dropdownItems"][0].disabled = true;
      this.menu[0]["dropdownItems"][2].disabled = true;
      this.menu[0]["dropdownItems"][1].disabled = true;
      this.menu[0]["dropdownItems"][3].disabled = true;

    }
  }
  modalClose = () => {
    this.screenCloseRequest = true;
    if (this.valueChanged === true) {
      this.messageService
        .findByMessageId(29065)
        .subscribe((message: MessageMasterDtl[]) => {
          this.popupAlert(message[0].messageText, "Medical Definitions Lookup");
        });
    } else {
      this.activeModal.close();
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
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === "Yes") {
          this.saveMedicalDefinition();
        } else if (resp.name === "No") {
          this.router.navigateByUrl("/");
          this.activeModal.close();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  helpScreen = () => {
    const viewModal = this.modalService.open(BenefitsHelpComponent, {
      windowClass: "myCustomModalClass",
    });
    viewModal.componentInstance.defaultFile =
      "/MEDLU_Medical_Definition_Lookup.htm";
  };


  deleteMEDLUPopup() {
    let popUpMessage = new PopUpMessage(
      'Medical Definitions Lookup',
      'Medical Definitions Lookup',
      '29070: Press OK to delete this record',
      'info',
      [],
      MessageType.WARNING
    );
    popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === 'OK') {
        this.delete();
      }
    }, (error: any) => {
      this.showErrorPopUp(error, 'Medical Definitions Lookup')
    });
  }


  delete() {
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows[0] !== undefined) {
      this.medDefnCodeService.deleteMedDefnCode(selectedRows[0].medDefCode).subscribe((medDefnCodes) => {
        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        this.getMedDefnCodes();
      });
    }
  }

  showErrorPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  form1PopupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
        if (resp.name === 'Ok') {
          this.activeModal.close();
        }
      })
    } catch (e) {
      console.log(e);
    }
  };
}
