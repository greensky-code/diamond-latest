/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridApi, GridOptions, _ } from "ag-grid-community";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { SecWin } from '../../../api-models';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { MessageMasterDtlService } from '../../../api-services';
import { SecWinDescrService } from "../../../api-services/sec-win-descr.service";
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage } from '../../../shared/components/alert-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { NGBModalOptions } from '../../../shared/config';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { SharedService } from '../../../shared/services/shared.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { ScreenMapping } from '../../../view-model/screen-mapping';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';

// Use the Component directive to define the FunctionalGroupShortCutComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "functional-group-shortcut",
  templateUrl: "./functional-group-shortcut.component.html",
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    SecWinDescrService,
  ],
})
export class FunctionalGroupShortCutComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  changePasswordForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public popUpMessage: PopUpMessage;
  public rowSelection: any;

  public dataGridGridOptions: GridOptions;

  @Input() showIcon: boolean = false;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  @ViewChild("popUpMessageModal") popUpMessageModal: any;
  public defaultColDef: any;
  lastInput = "";
  @ViewChild("agGrid", { read: ElementRef }) agGrid: ElementRef;

  openModal() {
    document.getElementById("modalformbtn").click();
  }

  closeModal(action: string = "Close") {
    if (action == "OK") {
      this.onPageRenderer();
    } else {
      this.activeModal.close();
    }
  }

  async onPageRenderer() {
    let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
    if (selectedRows.length > 0) {
      this.modalService.dismissAll();
      const component = ScreenMapping.getScreenMapping(selectedRows[0].win_ID);
      let usrAuthorizedToViewScreen = component
        ? await this.usrAuthorizedToViewScreen(selectedRows[0].win_ID)
        : false;

      if (component && usrAuthorizedToViewScreen) {

        if (selectedRows[0].win_ID === "MCOND") {
          this.popUpMessage = new PopUpMessage(
            "poUpMessageName",
            "Screen not available",
            "This screen is out of scope",
            "icon"
          );
          this.popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
          ];
          const ref = this.modalService.open(PopUpMessageComponent, {
            size: "lg",
          });
          ref.componentInstance.popupMessage = this.popUpMessage;
          ref.componentInstance.showIcon = true;
        } else {
          const ref = this.modalService.open(component, {
            size: <any>"xl",
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
          });
          ref.componentInstance.winID = selectedRows[0].win_ID;
          ref.componentInstance.showIcon = true;
        }
      } else if (component && usrAuthorizedToViewScreen == false) {
        this.messageService.findByMessageId(29055).subscribe((res) => {
          this.popUpMessage = new PopUpMessage(
            "poUpMessageName",
            "DIAMOND@ Client/Server System",
            "29055: " +
              res[0].messageText
                .replace("@1", sessionStorage.getItem("user"))
                .replace("@2", selectedRows[0].win_ID),
            "icon"
          );
          this.popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
          ];
          const ref = this.modalService.open(PopUpMessageComponent, {
            size: "lg",
          });
          ref.componentInstance.popupMessage = this.popUpMessage;
          ref.componentInstance.showIcon = true;
        });
      } else {
        this.popUpMessage = new PopUpMessage(
          "poUpMessageName",
          "Screen not available",
          "The screen you are looking for is not yet avaialble.",
          "icon"
        );
        this.popUpMessage.buttons = [
          new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = this.popUpMessage;
        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
          this.popupMessageHandler(event);
        });
      }
      this.sharedService.shortcutModalState = false;
      this.activeModal.close();
    }
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button && button.name && button.name === "yes") {
      console.log("button yes has been click!");
    }
    if (button && button.name && button.name === "no") {
      console.log("button No has been click!");
    }
  }

  onGridReady(event: any) {
    this.populateSecWinDescrsGrid();
    this.dataGridGridOptions.api.addEventListener("filterChanged", (e: any) => {
      this.dataGridGridOptions.api.selectIndex(0, false, false);
    });
  }

  createDataGrid(): void {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
    };
    this.dataGridGridOptions.editType = "fullRow";

    this.dataGridGridOptions.columnDefs = [
      {
        headerName: "Win Id",
        field: "win_ID",
        width: 150,
        filterParams: {
          defaultOption: 'startsWith',
        }
      },
      {
        headerName: "Description",
        field: "sdescr",
        width: 300,
      },
    ];

    this.rowSelection = "single";
    this.defaultColDef = {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  }

  onCellClicked(event: any) {
    this.onPageRenderer();
  }

  onSelectWindow(event: any) {
    if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      setTimeout(() => {
        this.onPageRenderer();
      }, 1000);
    }
  }

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private secWinDescrService: SecWinDescrService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private messageService: MessageMasterDtlService,
    private securityService: SecurityService,
    private secWinService: SecWinService,
    private secUserService: SecUserService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.createForm();
    this.formValidation = new FormValidation(this.changePasswordForm);
    this.createDataGrid();
  }

  populateSecWinDescrsGrid() {
    this.secWinDescrService.getGroupsShortKeys().subscribe((resp) => {
      this.dataGridGridOptions.api.setRowData(resp);
      this.dataGridGridOptions.api.selectIndex(0, false, false);
      this.agGrid.nativeElement.querySelectorAll(".ag-text-field-input")[0].focus();
      this.agGrid.nativeElement.querySelectorAll(".ag-text-field-input")[0].style.textTransform = "uppercase";
    });
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.changePasswordForm = this.formBuilder.group(
      {
        userId: ["", { updateOn: "blur", validators: [] }],
        oldPassword: ["", { updateOn: "blur", validators: [] }],
        newPassword: ["", { updateOn: "blur", validators: [] }],
        confirmPassword: ["", { updateOn: "blur", validators: [] }],
      },
      { updateOn: "submit" }
    );
  }
  private async usrAuthorizedToViewScreen(winID: string): Promise<boolean> {
    const isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (isSuperUser) {
      return isSuperUser;
    }
    const parsedToken = this.securityService.getCurrentUserToken();
    let userId;
    if (parsedToken) {
      userId = parsedToken.sub;
    }
    let usrAuthorizedToViewScreen = true;

    await this.secUserService
      .getSecUser(userId)
      .toPromise()
      .then(async (user: SecUser) => {
        await this.secWinService
          .getSecWin(winID, user.dfltTemplate)
          .toPromise()
          .then(
            (secWin: SecWin) => {
              let secWinViewModel: SecWinViewModel = new SecWinViewModel(
                secWin
              );
              usrAuthorizedToViewScreen = secWinViewModel.hasSelectPermission();
            },
            (error) => {
              usrAuthorizedToViewScreen = false;
            }
          );
      });
    return usrAuthorizedToViewScreen;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
