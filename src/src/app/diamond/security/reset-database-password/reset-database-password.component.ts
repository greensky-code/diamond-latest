/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
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
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { MessageMasterDtl, SecUser, SecWin } from '../../../api-models';
import { MessageMasterDtlService, SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { Menu } from '../../../shared/models/models';
import { ChangePasswordService } from '../../../api-services/change-password.service';
import { NgbToastType } from 'ngb-toast';

// Use the Component directive to define the ResetDatabasePasswordComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "resetdatabasepassword",
  templateUrl: "./reset-database-password.component.html",
  providers: [MessageMasterDtlService,ChangePasswordService],
})
export class ResetDatabasePasswordComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  resetDatabasePasswordForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "";
  public isSuperUser = false;
  public secProgress = true;
  secColDetails = new Array<SecColDetail>();
  menu: Menu[] = [];
  @Input() showIcon: boolean = false;
  @Input() userId: any;
  @Input() use_pwd_prof_ind:any;

  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  userTemplateId: any;

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

  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private messageService: MessageMasterDtlService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private toastService: ToastService,
    private changePasswordService:ChangePasswordService,

    private securityService: SecurityService
  ) {}

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();

  }

  initializePermission(): void {
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
            "You are not Permitted to view Procedure Code Screen",
            "Procedure Code Permission"
          );
        }
      },
      (error) => {
        this.showPopUp(error, "Window Error");
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
      .findByTableNameAndUserId("MEMBER_MASTER", secUser.userId)
      .subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.secProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }
  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    if (this.userId) {
      setTimeout(() => {
        this.resetDatabasePasswordForm.patchValue({
          userId: this.userId,
        });
      }, 200);
    }
    this.formValidation = new FormValidation(this.resetDatabasePasswordForm);
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.resetDatabasePasswordForm = this.formBuilder.group(
      {
        userId: ["", { updateOn: "blur", validators: [] }],
        resetTemporaryDatabasePassw: [
          "temp01",
          {
            updateOn: "blur",
            validators: [
              this.ValidatorPasswordStart(),
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_$#]+$"),
              Validators.minLength(6),
              Validators.maxLength(30),
            ],
          },
        ],
      },
      { updateOn: "submit" }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  modalClose = () => {
    this.activeModal.close();
  };

  validatePassword = (password) => {
    if(password.length == 0) {
      this.showValidationError(29029, '@1', 'Reset Temporary Database Password');
      return false;
    } else if(password.length < 6 || password.length > 30) {
      this.showValidationError(11105);
      return false;
    } else if(!(/^[a-zA-Z0-9_$#]+$/.test(password))) {
      this.showValidationError(11107);
      return false;
    }
    return true;
  }

  showValidationError = (code: number, replaceKey?: string, replaceValue?: string) => {
    this.messageService
        .findByMessageId(code)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
              [code, replaceKey? message[0].messageText.replace(replaceKey, replaceValue): message[0].messageText].join(": "),
              "Reset Database Password"
          );
        });
  }

  onSubmit() {
    var password = this.resetDatabasePasswordForm.get(
      "resetTemporaryDatabasePassw"
    ).value;
    if(this.validatePassword(password)) {
      var userId = this.resetDatabasePasswordForm.get("userId").value;
      this.formValidation.validateForm();
      if (this.resetDatabasePasswordForm.valid) {
        var pi_s_user_id = userId;
        var pi_s_request = "R"; //R for reset request
        if(this.use_pwd_prof_ind=='Y'){
          this.changePasswordService
              .updatePassword(userId, "DEFAULT")
              .subscribe(
                  (response) => {
                    console.log(response);
                    // this.showPopUp('User Update Password', 'Password Successfully Updated')
                    if (response.success) {
                      this.activeModal.close();
                      this.changePasswordService
                          .updatePassword(userId, "DIAM_PROFILE")
                          .subscribe(
                              (response) => {
                                console.log(response);
                                // this.showPopUp('User Update Password', 'Password Successfully Updated')
                                if (response.success) {
                                  this.activeModal.close();
                                  this.messageService.findByMessageId(11092).subscribe(res => {
                                    this.toastService.showToast(
                                        res[0].messageText.replace('@1', userId),
                                        NgbToastType.Success
                                    );
                                  })

                                } else {
                                  this.showPopUp(
                                      response.message,
                                      "Update User Password"
                                  );
                                }
                              }
                          );
                    } else {
                      this.showPopUp(response.message, "Update User Password");
                    }
                  },
              );

        }
      }
    }
  }

  ShowError(number: any, check: any, value = "1") {
    if (check) {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText.replace("1@", value),
            "Reset Database Password"
          );
        });
    } else {
      this.messageService
        .findByMessageId(number)
        .subscribe((message: MessageMasterDtl[]) => {
          this.showPopUp(
            number + ":" + message[0].messageText,
            "Reset Database Password"
          );
        });
    }
  }

  ValidatorPasswordStart() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == null) {
        return null;
      }
      var regex = "^[A-Za-z]";
      var res = control.value.match(regex);
      if (res) {
        return null;
      }
      return { phoneStartValidator: true };
    };
  }
}
