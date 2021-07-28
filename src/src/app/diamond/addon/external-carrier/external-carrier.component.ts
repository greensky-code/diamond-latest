/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
import { GroupMaster, SecUser, SecWin } from '../../../api-models';
import { GroupMasterService, SecUserService } from '../../../api-services';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { PlanListAddon, PlanListAddonIn } from '../../../api-models/addon/get-plan-list-addon.model';
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES } from '../../../shared/models/models';
import { ExternalCarrierFields, ExternalCarrierFromConfig } from '../../../shared/models/constants';
import { ProcGetPlanListAddon } from '../../../api-services/addon/proc-plan-list-addon.service';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';

// Use the Component directive to define the ExternalCarrierComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
  selector: "externalcarrier",
  templateUrl: "./external-carrier.component.html",
  providers: [DatePipe],
})
export class ExternalCarrierComponent implements OnInit {
  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  private windowId: string = "CIEBECGM";
  public isSuperUser = false;
  public secProgress = true;
  saveForm: boolean;
  PlanListAddonIn: any;
  externalCarState= Array<DynamicConfigFormRow>();
  externalCarrierFromConfig = ExternalCarrierFromConfig;
  isAddNewRow: any;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  secColDetails = new Array<SecColDetail>();
  userTemplateId: any;
  config: any;
  @Input() showIcon: boolean = false;
  productTypes: any;
  externalCarrier: any;
  groupId: any;
  ProcData: PlanListAddon[];
  @Input() groupNumber: any;
  @Input() groupName: any;
  groupMaster: GroupMaster;
  isResetForm: boolean;
  showAddNewLine = false;

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
    private toastService: ToastService,
    private secColDetailService: SecColDetailService,
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private groupMasterService: GroupMasterService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private DatePipe: DatePipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private procPlanListAddonService: ProcGetPlanListAddon,
    private functionalLevelSecurityService: FunctionalLevelSecurityService
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
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
      });
  }

  private initializeComponentState(): void {

    this.getProductType();
    this.getExternalCarriersName();
    this.secProgress = false;
  }


  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  getExternalCarrier() {


    this.PlanListAddonIn = new PlanListAddonIn();
    this.PlanListAddonIn["pSeqGroupId"] = this.groupNumber;
    this.procPlanListAddonService
      .procPlanListAddon(this.PlanListAddonIn)
      .subscribe((data) => {
        this.ProcData = data;
        this.populateDynamicForm(data);
      });
  }

  populateDynamicForm(externalCarrier1: PlanListAddon[]) {
           const values = externalCarrier1;

    values.forEach((externalCarrier1: PlanListAddon) => {
      let mockConfig = JSON.parse(
        JSON.stringify(this.externalCarrierFromConfig)
      ); // make a copy of original config
      mockConfig.forEach((field, index) => {
        if (field.name === ExternalCarrierFields.PLAN) {
          mockConfig[index].value = externalCarrier1.planCode;
        } else if (field.name === ExternalCarrierFields.EFFECTIVE_DATE) {
          mockConfig[index].value = externalCarrier1.effDate;
        } else if (field.name === ExternalCarrierFields.END_DATE) {
          mockConfig[index].value = externalCarrier1.endDate;
        } else if (field.name === ExternalCarrierFields.CARRIER_GROUP_NO) {
          mockConfig[index].value = externalCarrier1.xCarrierGroupNum;
        } else if (field.name === ExternalCarrierFields.PRODUCT_TYPE) {
          mockConfig[index].value = externalCarrier1.productType;
        } else if (field.name === ExternalCarrierFields.CARRIER_NAME) {
          mockConfig[index].value = externalCarrier1.xCarrierName;
        } else if (field.name === "sharedBenefitO") {
          if (externalCarrier1.sharedBenefit != null) {
             var BenArray = externalCarrier1.sharedBenefit.split(",");
             var BenArraySelected: string[];
             var exits = 0;
             mockConfig[6].value = false;
                            mockConfig[6].hideSingleField = true;

            // mockConfig[7].value = false;

             if (externalCarrier1.xsharedBenefit) {
               BenArraySelected = externalCarrier1.xsharedBenefit.split(",");
               exits = 1;
             }
             if (BenArray.length > 0 && BenArray.includes("OOP")) {
                   mockConfig[6].hideSingleField = false;
               if (exits == 1 && BenArraySelected.includes("OOP")) {
                 mockConfig[6].value = true;

               }
               //    if (exits == 1 && BenArraySelected.includes("DEDUCTIBLE")) {
               //      mockConfig[7].value = true;
               //    }
               //mockConfig[7].value = myArray[1];
             } else {
            //    if (exits == 1 && BenArraySelected.includes("OPP")) {
            //      mockConfig[6].value = true;
            //    }
               mockConfig[6].hideSingleField = true;
             }
          }
          // mockConfig[index].value = externalCarrier1.sharedBenefit;
        } else if (field.name === "sharedBenefitD") {
          if (externalCarrier1.sharedBenefit != null) {
            var BenArray = externalCarrier1.sharedBenefit.split(",");
            var BenArraySelected:string[];
            var exits=0;
             //  mockConfig[6].value = false;
                mockConfig[7].value = false;

            if (externalCarrier1.xsharedBenefit){
               BenArraySelected = externalCarrier1.xsharedBenefit.split(",");
               exits=1;
            }
            if (BenArray.length > 0 && BenArray.includes("DEDUCTIBLE")) {
                mockConfig[7].hideSingleField = false;

              if (exits == 1 && BenArraySelected.includes("DEDUCTIBLE")) {
                mockConfig[7].value = true;
                mockConfig[7].hideSingleField = false;

              }
              //mockConfig[7].value = myArray[1];
            } else {
              mockConfig[7].hideSingleField = true;
            }
          }
          // mockConfig[index].value = externalCarrier1.sharedBenefit;
        } else if (field.name === ExternalCarrierFields.SHARRING_METHOD) {
          mockConfig[index].value = externalCarrier1.sharingMethod;
        }
      });
      let formState: FormRow = new FormRow();
      formState.formFields = mockConfig;
      formState.id = {
        data: externalCarrier1,
      };
      formState.action = null;

      this.config = mockConfig;
      this.externalCarState.push(formState); // add record
    });
    this.externalCarrierFromConfig = JSON.parse(
      JSON.stringify(this.externalCarrierFromConfig)
    );
      this.externalCarState = JSON.parse(JSON.stringify(this.externalCarState));
  }

  populateGroupPanel(event: any, action: FORM_FIELD_ACTION_TYPES,plan:any) {
  
    var sharingbe=[];
    if (!event[3].hideSingleField6) {
      if(event[3].value==true){
         sharingbe.push('OOP');
      }
    } 
    if (!event[4].hideSingleField7) {
      if (event[4].value == true) {
        sharingbe.push("DEDUCTIBLE");
      }
    }
    var notSharingBen;
    if (event[4].hideSingleField7 && event[3].hideSingleField6) {
      notSharingBen = false;
    } else {
      notSharingBen = true;
    }
    
    let externalCarrier = new PlanListAddon();
    externalCarrier.xCarrierGroupNum = event[0].value;
    externalCarrier.productType = event[1].value;
    externalCarrier.pextnCarrName = event[2].value;
    externalCarrier.xsharedBenefit = sharingbe.join();
    externalCarrier.sharingMethod = event[5].value;
    externalCarrier.notSharingBen=notSharingBen;
    externalCarrier.planCode = plan;
    externalCarrier.action = action;
    return externalCarrier;
  }

  transformDate(date: any) {
    var newDate =
      date.singleDate.date.month +
      "/" +
      date.singleDate.date.day +
      "/" +
      date.singleDate.date.year;
    var newDate_ = new Date(newDate);
    return this.DatePipe.transform(newDate_, "yyyy-MM-dd");
  }

  saveExternalCarrier(event: any) {
    if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
        const prevState = event.formState;
        this.externalCarState = prevState;
        event = event.fields;
        

         let arrIndexes:any = [];
         this.externalCarState.forEach((arrValue, index) => {
           if (arrValue.action === FORM_FIELD_ACTION_TYPES.UPDATE) {
             arrIndexes.push(index);
           }
         });

        let externalCarrier = new Array<PlanListAddon>();
        const updatedRecords: FormRow[] = this.externalCarState.filter(
          (record) =>
            record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
            record.action === FORM_FIELD_ACTION_TYPES.DELETE
        );
     
        if (updatedRecords.length > 0) {
          updatedRecords.forEach((preStateRecord: FormRow, index) => {
            if (preStateRecord.action && event.length > index) {
                let indexOfChange = arrIndexes[index];
                // if (preStateRecord.action) {
                let updatedRecord = event[indexOfChange];
              const pair = Object.keys(updatedRecord).map((k) => ({
                key: k,
                value: updatedRecord[k],
                hideSingleField6: preStateRecord.formFields[6].hideSingleField,
                hideSingleField7: preStateRecord.formFields[7].hideSingleField,
              }));
              let ciebPricingAccntCodeModel: PlanListAddon = preStateRecord.id
                ? preStateRecord.id.data
                : new PlanListAddon();
              let apiValue: PlanListAddon = this.populateGroupPanel(
                pair,
                preStateRecord.action,
                preStateRecord.formFields[0].value
              );
              externalCarrier.push(apiValue);
            }
          });
        }
        const newRecords: FormRow[] = this.externalCarState.filter(
          (record) => record.action == FORM_FIELD_ACTION_TYPES.ADD
        );

      
       
       
      var data;
      var sharingBe;
      var completed = false;
      for (var i = 0; i < externalCarrier.length; i++) {
        var val = "";
        for (var k = 0; k < this.externalCarrier.length; k++) {
          if (
            this.externalCarrier[k]["decode_2"] ==
            externalCarrier[0]["pextnCarrName"]
          ) {
            val = this.externalCarrier[k]["decode_1"];
          }
        }
        if (externalCarrier[0]["xCarrierGroupNum"] != "") {
          if (
            externalCarrier[0]["productType"] == "" ||
            !externalCarrier[0]["productType"]
          ) {
            this.showPopUp(
              `Product Type for plan ${externalCarrier[0]["planCode"]} cannot be empty`,
              "External Carrier"
            );
            return;
          } else if (
            externalCarrier[0]["pextnCarrName"] == "" ||
            !externalCarrier[0]["pextnCarrName"]
          ) {
            this.showPopUp(
              `External Carrier Name for plan ${this.ProcData[0].planCode} cannot be empty`,
              "External Carrier"
            );
            return;
          } else if (
            externalCarrier[0]["sharingMethod"] == "" ||
            (!externalCarrier[0]["sharingMethod"] )
          ) {
            this.showPopUp(
              `Sharing Method for plan ${this.ProcData[0].planCode} cannot be empty`,
              "External Carrier"
            );
            return;
          } else if (
            externalCarrier[0]["xsharedBenefit"] == "" ||
            !externalCarrier[0]["xsharedBenefit"]) 
              
         {
            this.showPopUp(
              `At least one Sharing Benefit should be selected for plan ${this.ProcData[0].planCode}`,
              "External Carrier"
            );
            return;
          }
        }
        completed = true;
        data = {
          pgroupId: this.groupNumber,
          pplanCode: externalCarrier[0]['planCode'],
          pplanEffDate: this.ProcData[0].effDate,
          pplanEndDate: this.ProcData[0].endDate,
          psharBenType: externalCarrier[0]["xsharedBenefit"],
          pproductType: externalCarrier[0]["productType"],
          pextnCarrName: externalCarrier[0]["pextnCarrName"],
          psharMethod: externalCarrier[0]["sharingMethod"],
          pextnCarrGroupId: externalCarrier[0]["xCarrierGroupNum"],
          pExtnCarrId: val,
        };

        if (completed) {
          this.procPlanListAddonService.addAndUpdate(data).subscribe((resp) => {
            this.toastService.showToast(
              "Record successfully Inserted/Updated",
              NgbToastType.Success
            );
          });
        }
      }
    }
  }

  reset() {
    this.isResetForm = true;
  }

  getProductType() {
    this.procPlanListAddonService.getProductType().subscribe((data) => {
      this.productTypes = data;
      var Options: any = [];
      Options.push({
        key: "Select",
        value: " ",
      });
      this.productTypes.forEach(function (index: any) {
        Options.push({
          key: index.decode_1.replace(/\s/g, ""),
          value: index.decode_1.replace(/\s/g, ""),
        });
      });
      this.externalCarrierFromConfig[4].options = Options;
    });
  }

  getExternalCarriersName() {
    this.procPlanListAddonService.getExternalCarrier().subscribe((data) => {
      this.externalCarrier = data;
      var Options: any = [];
      Options.push({
        key: "Select",
        value: " ",
      });
      this.externalCarrier.forEach(function (index: any) {
        Options.push({
          key: index.decode_2,
          value: index.decode_2,
        });
      });
      this.externalCarrierFromConfig[5].options = Options;
      this.getExternalCarrier();
    });
  }

  saveCarrier() {
    this.saveForm = true;
    setTimeout(() => {
      this.saveForm = false;
    }, 2000);
  }
  onChangeDynamic($event) {
        let field: FormField = $event.formField;
        const index: number = $event.index;
        let form: FormGroup = $event.field;
        let prevState: Array<DynamicConfigFormRow> = $event.prevState;

        if (field.name == ExternalCarrierFields.CARRIER_GROUP_NO + index) {
            if(field.value!=''){
                prevState[index].formFields[4].required=true;
                prevState[index].formFields[5].required = true;
                prevState[index].formFields[6].required = true;
                prevState[index].formFields[7].required = true;
                prevState[index].formFields[8].required = true;

     
            }
            
        }

  }
}
