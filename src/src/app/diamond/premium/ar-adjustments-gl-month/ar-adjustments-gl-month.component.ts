/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SecurityService } from '../../../shared/services/security.service';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecUser } from '../../../api-models';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { DatePipe } from '@angular/common';
import { ArAdjustmentService } from '../../../api-services';
import { ReportService } from '../../../core';
import { DatePickerConfig } from '../../../shared/config';
import { NumberFormatPipe } from '../../../shared/pipes/number.format.pipe';

// Use the Component directive to define the ArAdjustmentsGlMonthComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

  selector: 'aradjustmentsglmonth',
  templateUrl: './ar-adjustments-gl-month.component.html',
  styleUrls: ['./ar-adjustments-gl-month.component.scss'],
  providers: [
    Mask,
    CustomValidators,
    DateFormatPipe,
    SecWinService,
    SecurityService,
    DatePipe,
    NumberFormatPipe
  ]
})
export class ArAdjustmentsGlMonthComponent implements OnInit {

  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  @Input() public title: string;
  public arAdjustmentsGlMonthForm: FormGroup;
  public formValidation: FormValidation;
  public secWin: SecWinViewModel;
  public isSuperUser = false;
  public secProgress = true;
  public secColDetails = new Array<SecColDetail>();
  public userTemplateId: string;
  public datePickerConfig = DatePickerConfig;
  public datePickerConfig1 = DatePickerConfig;

  @Output() public buttonclickEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private windowId: string = '';
  private tableName = '';
  // Use constructor injection to inject an instance of a FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    private datePipe: DatePipe,
    public activeModal: NgbActiveModal,
    private arAdjustmentService: ArAdjustmentService,
    private reportService: ReportService,
    private numberFormatPipe: NumberFormatPipe
  ) {
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    // this.initializePermission();
    this.createForm();
    this.formValidation = new FormValidation(this.arAdjustmentsGlMonthForm);
    this.datePickerConfig.dateFormat = 'mm/yyyy';
    // this.datePickerConfig1.dateFormat = 'mm/dd/yyyy';
  }

  private showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
    popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  public triggerClick(isSubmit: boolean) {
    this.buttonclickEvent.next(isSubmit);
    if (isSubmit) {
      let customerIds: string[] = [];
      let reportData: any[] = [];
      this.arAdjustmentService.getAradjReportData().subscribe(data => {
        data.forEach((element: {
          customerId: string;
          amount: number;
          amountStr: string;
          date: string | { singleDate: { date: { year: number; month: number; day: number; }; }; };
        }) => {
          if (customerIds.indexOf(element.customerId) === -1) {
            customerIds.push(element.customerId);
          }
          // element.date = this.dateFormatPipe.defaultDisplayDateFormat(element.date);
          element.amountStr = this.numberFormatPipe.transform(element.amount);
        });
        reportData = data;
        this.reportService.arAdjustmentPostingReportByCustomerReport(customerIds, reportData);
      });
    }
    this.activeModal.close();
  }
  // Use a FormBuilder to create a FormGroup to define the Form Model for the view
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  private createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.arAdjustmentsGlMonthForm = this.formBuilder.group({
      glMonth: [this.dateFormatPipe.defaultDisplayDateFormat(this.datePipe.transform(new Date(), 'yyyy-MM-dd')), { validators: [] }],
      paidThruDate: ['', { validators: [] }]
    });
  }

  /**
  * get all user permission for page
  * if permissions to select exist then initialize page
  */
  private hasPermission() {
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

  private getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      return;
    }
    this.secColDetailService.findByTableNameAndUserId(this.tableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });
  }

  private getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
      this.secWin = new SecWinViewModel(secWin);
      if (this.secWin.hasSelectPermission()) {
        this.initializeComponentState();
      } else {
        this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
      }
    });
  }

  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    const userId = parsedToken ? parsedToken.sub : null;

    this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
      this.secWin = new SecWinViewModel(secWin);

      if (this.secWin.hasSelectPermission()) {
        this.initializeComponentState();
      } else {
        this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
      }
    });
  }

  private initializeComponentState(): void {
    this.createForm();
    this.formValidation = new FormValidation(this.arAdjustmentsGlMonthForm);
  }

  private resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

}
