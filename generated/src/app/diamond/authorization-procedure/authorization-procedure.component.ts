/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../shared/validators/number.validator';
import { CustomValidators } from '../../shared/validators/custom-validator';
import { Mask } from '../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../shared/config';
import { Form } from '../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  AuthMaster } from "../../api-models/index"
import {  AuthMasterService } from "../../api-services/auth-master.service"
import {  AuthProcedure } from "../../api-models/index"
import {  AuthProcedureService } from "../../api-services/auth-procedure.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the AuthorizationProcedureComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationprocedure',
    templateUrl: './authorization-procedure.component.html',

})
export class AuthorizationProcedureComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationProcedureForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes'){
            console.log("button yes has been click!");
        }
        if(button.name == 'no'){
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

editAuthMaster: boolean;
    authMaster: AuthMaster;
    authMasters: AuthMaster[];editAuthProcedure: boolean;
    authProcedure: AuthProcedure;
    authProcedures: AuthProcedure[];
    if (this.secWin.hasInsertPermission()) {
        createAuthMaster() {
            this.formValidation.validateForm();
            if(this.authorizationProcedureForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authNumber = Form.getValue(this.authorizationProcedureForm, 'authNumber');
                authMaster.requestedDate = Form.getValue(this.authorizationProcedureForm, 'reqDate');
                authMaster.authType = Form.getValue(this.authorizationProcedureForm, 'authType');
                authMaster.authLevel = Form.getValue(this.authorizationProcedureForm, 'leverl');
                authMaster.tplCode = Form.getValue(this.authorizationProcedureForm, 'tplCode');
                authMaster.privacyApplied = Form.getValue(this.authorizationProcedureForm, 'privacyMaApply');
                authMaster.memberAge = Form.getValue(this.authorizationProcedureForm, 'memberId');
                authMaster.seqGroupId = Form.getValue(this.authorizationProcedureForm, 'groupId');
                authMaster.planCode = Form.getValue(this.authorizationProcedureForm, 'planCode');
                authMaster.nsSubscriberId = Form.getValue(this.authorizationProcedureForm, 'nonSysSubscriberId');
                authMaster.certificationType = Form.getValue(this.authorizationProcedureForm, 'certificationType');
                authMaster.paperworkAttached = Form.getValue(this.authorizationProcedureForm, 'paperworkAttachment001');
                authMaster.holdDate = Form.getValue(this.authorizationProcedureForm, 'fromDate');
                authMaster.dischThruDate = Form.getValue(this.authorizationProcedureForm, 'thruDate');
                authMaster.overallStatus = Form.getValue(this.authorizationProcedureForm, 'oralCav');
                authMaster.procedure1Date = Form.getValue(this.authorizationProcedureForm, 'procedureCode');
                authMaster.medDefCode = Form.getValue(this.authorizationProcedureForm, 'medDefCode');
                authMaster.reviewType = Form.getValue(this.authorizationProcedureForm, 'reqQty');
                authMaster.reqDaysVisits = Form.getValue(this.authorizationProcedureForm, 'reqAmt');
                authMaster.updateProcess = Form.getValue(this.authorizationProcedureForm, 'purchasePrice');
                authMaster.authorizedCost = Form.getValue(this.authorizationProcedureForm, 'authQty');
                authMaster.authScreenMod = Form.getValue(this.authorizationProcedureForm, 'authAmt');
                authMaster.activeProcedure = Form.getValue(this.authorizationProcedureForm, 'costProcedure');
                authMaster.estimatedCost = Form.getValue(this.authorizationProcedureForm, 'extCost');
                authMaster.serviceReason = Form.getValue(this.authorizationProcedureForm, 'priceRegion');
                authMaster.statusDate = Form.getValue(this.authorizationProcedureForm, 'status');
                authMaster.closedDate = Form.getValue(this.authorizationProcedureForm, 'date');
                authMaster.closedReason = Form.getValue(this.authorizationProcedureForm, 'statusReason');
                authMaster.lateNotification = Form.getValue(this.authorizationProcedureForm, 'denialNotifnCbnotificatio');
                authMaster.billType = Form.getValue(this.authorizationProcedureForm, 'provType');
                this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAuthMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAuthMaster(secondaryAuthNo : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.authorizationProcedureForm.valid) {
            let authMaster = new AuthMaster();
            authMaster.authNumber = Form.getValue(this.authorizationProcedureForm, 'authNumber');
            authMaster.requestedDate = Form.getValue(this.authorizationProcedureForm, 'reqDate');
            authMaster.authType = Form.getValue(this.authorizationProcedureForm, 'authType');
            authMaster.authLevel = Form.getValue(this.authorizationProcedureForm, 'leverl');
            authMaster.tplCode = Form.getValue(this.authorizationProcedureForm, 'tplCode');
            authMaster.privacyApplied = Form.getValue(this.authorizationProcedureForm, 'privacyMaApply');
            authMaster.memberAge = Form.getValue(this.authorizationProcedureForm, 'memberId');
            authMaster.seqGroupId = Form.getValue(this.authorizationProcedureForm, 'groupId');
            authMaster.planCode = Form.getValue(this.authorizationProcedureForm, 'planCode');
            authMaster.nsSubscriberId = Form.getValue(this.authorizationProcedureForm, 'nonSysSubscriberId');
            authMaster.certificationType = Form.getValue(this.authorizationProcedureForm, 'certificationType');
            authMaster.paperworkAttached = Form.getValue(this.authorizationProcedureForm, 'paperworkAttachment001');
            authMaster.holdDate = Form.getValue(this.authorizationProcedureForm, 'fromDate');
            authMaster.dischThruDate = Form.getValue(this.authorizationProcedureForm, 'thruDate');
            authMaster.overallStatus = Form.getValue(this.authorizationProcedureForm, 'oralCav');
            authMaster.procedure1Date = Form.getValue(this.authorizationProcedureForm, 'procedureCode');
            authMaster.medDefCode = Form.getValue(this.authorizationProcedureForm, 'medDefCode');
            authMaster.reviewType = Form.getValue(this.authorizationProcedureForm, 'reqQty');
            authMaster.reqDaysVisits = Form.getValue(this.authorizationProcedureForm, 'reqAmt');
            authMaster.updateProcess = Form.getValue(this.authorizationProcedureForm, 'purchasePrice');
            authMaster.authorizedCost = Form.getValue(this.authorizationProcedureForm, 'authQty');
            authMaster.authScreenMod = Form.getValue(this.authorizationProcedureForm, 'authAmt');
            authMaster.activeProcedure = Form.getValue(this.authorizationProcedureForm, 'costProcedure');
            authMaster.estimatedCost = Form.getValue(this.authorizationProcedureForm, 'extCost');
            authMaster.serviceReason = Form.getValue(this.authorizationProcedureForm, 'priceRegion');
            authMaster.statusDate = Form.getValue(this.authorizationProcedureForm, 'status');
            authMaster.closedDate = Form.getValue(this.authorizationProcedureForm, 'date');
            authMaster.closedReason = Form.getValue(this.authorizationProcedureForm, 'statusReason');
            authMaster.lateNotification = Form.getValue(this.authorizationProcedureForm, 'denialNotifnCbnotificatio');
            authMaster.billType = Form.getValue(this.authorizationProcedureForm, 'provType');
            this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAuthMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveAuthMaster() {
        if(this.editAuthMaster) {
            this.updateAuthMaster(this.authMaster.secondaryAuthNo)
        } else {
            this.createAuthMaster();
        }
    }    deleteAuthMaster(secondaryAuthNo : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authMasterService.deleteAuthMaster(secondaryAuthNo).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAuthMaster(secondaryAuthNo : string) {
        this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe(authMaster => {
            this.authMaster = authMaster;
            this.authorizationProcedureForm.patchValue({
                'authNumber': this.authMaster.authNumber,
                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                'authType': this.authMaster.authType,
                'leverl': this.authMaster.authLevel,
                'tplCode': this.authMaster.tplCode,
                'privacyMaApply': this.authMaster.privacyApplied,
                'memberId': this.authMaster.memberAge,
                'groupId': this.authMaster.seqGroupId,
                'planCode': this.authMaster.planCode,
                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                'certificationType': this.authMaster.certificationType,
                'paperworkAttachment001': this.authMaster.paperworkAttached,
                'fromDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.holdDate),
                'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.dischThruDate),
                'oralCav': this.authMaster.overallStatus,
                'procedureCode': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.procedure1Date),
                'medDefCode': this.authMaster.medDefCode,
                'reqQty': this.authMaster.reviewType,
                'reqAmt': this.authMaster.reqDaysVisits,
                'purchasePrice': this.authMaster.updateProcess,
                'authQty': this.authMaster.authorizedCost,
                'authAmt': this.authMaster.authScreenMod,
                'costProcedure': this.authMaster.activeProcedure,
                'extCost': this.authMaster.estimatedCost,
                'priceRegion': this.authMaster.serviceReason,
                'status': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.statusDate),
                'date': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.closedDate),
                'statusReason': this.authMaster.closedReason,
                'denialNotifnCbnotificatio': this.authMaster.lateNotification,
                'provType': this.authMaster.billType,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
        this.authMasters = authMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createAuthProcedure() {
            this.formValidation.validateForm();
            if(this.authorizationProcedureForm.valid) {
                let authProcedure = new AuthProcedure();
                authProcedure.authNumber = Form.getValue(this.authorizationProcedureForm, 'authNumber');
                authProcedure.paperworkAttached = Form.getValue(this.authorizationProcedureForm, 'paperworkAttachment001');
                authProcedure.medDefCode = Form.getValue(this.authorizationProcedureForm, 'medDefCode');
                authProcedure.updateProcess = Form.getValue(this.authorizationProcedureForm, 'purchasePrice');
                authProcedure.authorizedCost = Form.getValue(this.authorizationProcedureForm, 'authQty');
                authProcedure.statusDate = Form.getValue(this.authorizationProcedureForm, 'status');
                this.authProcedureService.createAuthProcedure(authProcedure).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editAuthProcedure = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateAuthProcedure(seqAuthDetail : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.authorizationProcedureForm.valid) {
            let authProcedure = new AuthProcedure();
            authProcedure.authNumber = Form.getValue(this.authorizationProcedureForm, 'authNumber');
            authProcedure.paperworkAttached = Form.getValue(this.authorizationProcedureForm, 'paperworkAttachment001');
            authProcedure.medDefCode = Form.getValue(this.authorizationProcedureForm, 'medDefCode');
            authProcedure.updateProcess = Form.getValue(this.authorizationProcedureForm, 'purchasePrice');
            authProcedure.authorizedCost = Form.getValue(this.authorizationProcedureForm, 'authQty');
            authProcedure.statusDate = Form.getValue(this.authorizationProcedureForm, 'status');
            this.authProcedureService.updateAuthProcedure(authProcedure, seqAuthDetail).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editAuthProcedure = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveAuthProcedure() {
        if(this.editAuthProcedure) {
            this.updateAuthProcedure(this.authProcedure.seqAuthDetail)
        } else {
            this.createAuthProcedure();
        }
    }    deleteAuthProcedure(seqAuthDetail : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authProcedureService.deleteAuthProcedure(seqAuthDetail).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getAuthProcedure(seqAuthDetail : number) {
        this.authProcedureService.getAuthProcedure(seqAuthDetail).subscribe(authProcedure => {
            this.authProcedure = authProcedure;
            this.authorizationProcedureForm.patchValue({
                'authNumber': this.authProcedure.authNumber,
                'paperworkAttachment001': this.authProcedure.paperworkAttached,
                'medDefCode': this.authProcedure.medDefCode,
                'purchasePrice': this.authProcedure.updateProcess,
                'authQty': this.authProcedure.authorizedCost,
                'status': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.statusDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getAuthProcedures() {
        this.authProcedureService.getAuthProcedures().subscribe(authProcedures => {
        this.authProcedures = authProcedures;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Authorization",
             field: "authorizedcost",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Secondary",
             field: "secondaryauthno",
             width: 200         },
         {
             headerName: "Type",
             field: "authtype",
             width: 200         },
         {
             headerName: "TPL",
             field: "tplcode",
             width: 200         },
         {
             headerName: "Req Date",
             field: "requesteddate",
             width: 200         },
         {
             headerName: "Exp Date",
             field: "expirationdate",
             width: 200         },
         {
             headerName: "Provider Code / Name",
             field: "providertrackingno",
             width: 200         },
         {
             headerName: "Group ID",
             field: "seqgroupid",
             width: 200         },
         {
             headerName: "Plan Code",
             field: "plancode",
             width: 200         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "From Date",
             field: "fromdate",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Thru Date",
             field: "thrudate",
             width: 200         },
         {
             headerName: "Cost Proc Cd",
             field: "costprocedurecd",
             width: 200         },
         {
             headerName: "Auth Qty",
             field: "authorizedqty",
             width: 200         },
         {
             headerName: "Auth Amt",
             field: "actualamt",
             width: 200         },
         {
             headerName: "Ext Code",
             field: "securitycode",
             width: 200         },
         {
             headerName: "Status",
             field: "status",
             width: 200         },
         {
             headerName: "Paperwork",
             field: "paperworkattached",
             width: 200         }
      ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
     private authMasterService: AuthMasterService, private authProcedureService: AuthProcedureService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationProcedureForm);
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let useId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
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
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationProcedureForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationProcedureForm = this.formBuilder.group({
            authNumber: ['', {updateOn: 'blur', validators: [] }],
            reqDate: ['', {updateOn: 'blur', validators: [] }],
            authType: ['', {updateOn: 'blur', validators: [] }],
            leverl: ['', {updateOn: 'blur', validators: [] }],
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            tplCode: ['', {updateOn: 'blur', validators: [] }],
            lob: ['', {updateOn: 'blur', validators: [] }],
            privacyMaApply: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            age: ['', {updateOn: 'blur', validators: [] }],
            sex: ['', {updateOn: 'blur', validators: [] }],
            groupId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText003: ['', {updateOn: 'blur', validators: [] }],
            planCode: ['', {updateOn: 'blur', validators: [] }],
            nonSysSubscriberId: ['', {updateOn: 'blur', validators: [] }],
            certificationType: ['', {updateOn: 'blur', validators: [] }],
            paperworkAttachment001: ['', {updateOn: 'blur', validators: [] }],
            fromDate: ['', {updateOn: 'blur', validators: [] }],
            thruDate: ['', {updateOn: 'blur', validators: [] }],
            t: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            dynamicText004: ['', {updateOn: 'blur', validators: [] }],
            dynamicText005: ['', {updateOn: 'blur', validators: [] }],
            dynamicText006: ['', {updateOn: 'blur', validators: [] }],
            arch: ['', {updateOn: 'blur', validators: [] }],
            quad: ['', {updateOn: 'blur', validators: [] }],
            oralCav: ['', {updateOn: 'blur', validators: [] }],
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            ndc: ['', {updateOn: 'blur', validators: [] }],
            medDefCode: ['', {updateOn: 'blur', validators: [] }],
            reqQty: ['', {updateOn: 'blur', validators: [] }],
            reqAmt: ['', {updateOn: 'blur', validators: [] }],
            purchasePrice: ['', {updateOn: 'blur', validators: [] }],
            authQty: ['', {updateOn: 'blur', validators: [] }],
            authAmt: ['', {updateOn: 'blur', validators: [] }],
            costProcedure: ['', {updateOn: 'blur', validators: [] }],
            extCost: ['', {updateOn: 'blur', validators: [] }],
            priceSchedule: ['', {updateOn: 'blur', validators: [] }],
            priceRegion: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            date: ['', {updateOn: 'blur', validators: [] }],
            statusReason: ['', {updateOn: 'blur', validators: [] }],
            paperworkAttachment002: ['', {updateOn: 'blur', validators: [] }],
            denialNotifnCbnotificatio: ['', {updateOn: 'blur', validators: [] }],
            provType: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}