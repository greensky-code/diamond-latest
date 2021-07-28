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
import {  ProfsvcClaimDetail } from "../../api-models/index"
import {  ProfsvcClaimDetailService } from "../../api-services/profsvc-claim-detail.service"
import {  ProfsvcClaimHeader } from "../../api-models/index"
import {  ProfsvcClaimHeaderService } from "../../api-services/profsvc-claim-header.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ClaimDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimdisplay',
    templateUrl: './claim-display.component.html',

})
export class ClaimDisplayComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimDisplayForm: FormGroup;
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

editProfsvcClaimDetail: boolean;
    profsvcClaimDetail: ProfsvcClaimDetail;
    profsvcClaimDetails: ProfsvcClaimDetail[];editProfsvcClaimHeader: boolean;
    profsvcClaimHeader: ProfsvcClaimHeader;
    profsvcClaimHeaders: ProfsvcClaimHeader[];
    if (this.secWin.hasInsertPermission()) {
        createProfsvcClaimDetail() {
            this.formValidation.validateForm();
            if(this.claimDisplayForm.valid) {
                let profsvcClaimDetail = new ProfsvcClaimDetail();
                profsvcClaimDetail.lineNumber = Form.getValue(this.claimDisplayForm, 'memberNumber');
                profsvcClaimDetail.netAmt = Form.getValue(this.claimDisplayForm, 'name');
                profsvcClaimDetail.notCoveredAmt = Form.getValue(this.claimDisplayForm, 'entered');
                profsvcClaimDetail.seqProvId = Form.getValue(this.claimDisplayForm, 'providerId');
                profsvcClaimDetail.postDate = Form.getValue(this.claimDisplayForm, 'provName');
                profsvcClaimDetail.penaltyAmt = Form.getValue(this.claimDisplayForm, 'specialty');
                profsvcClaimDetail.raId = Form.getValue(this.claimDisplayForm, 'pcpId');
                profsvcClaimDetail.primaryPaidAmount = Form.getValue(this.claimDisplayForm, 'primaryDate');
                profsvcClaimDetail.deductibleReason = Form.getValue(this.claimDisplayForm, 'serviceReason');
                profsvcClaimDetail.placeOfService = Form.getValue(this.claimDisplayForm, 'placeOfServ');
                profsvcClaimDetail.diagCodePointer1 = Form.getValue(this.claimDisplayForm, 'dxCode1');
                profsvcClaimDetail.authPrice = Form.getValue(this.claimDisplayForm, 'authorization');
                profsvcClaimDetail.companyCode = Form.getValue(this.claimDisplayForm, 'payDep');
                profsvcClaimDetail.subLineCode = Form.getValue(this.claimDisplayForm, 'planCode');
                profsvcClaimDetail.medDefCode = Form.getValue(this.claimDisplayForm, 'dxCode');
                profsvcClaimDetail.ocAllowedAmt = Form.getValue(this.claimDisplayForm, 'ocAllowed');
                profsvcClaimDetail.quantity = Form.getValue(this.claimDisplayForm, 'quantity');
                profsvcClaimDetail.procedureCode = Form.getValue(this.claimDisplayForm, 'procedureCode');
                profsvcClaimDetail.eobId = Form.getValue(this.claimDisplayForm, 'ocPaid');
                profsvcClaimDetail.otherCarrierRsn = Form.getValue(this.claimDisplayForm, 'ocPaidRsn');
                profsvcClaimDetail.typeOfService = Form.getValue(this.claimDisplayForm, 'dateOfService');
                profsvcClaimDetail.allowedAmt = Form.getValue(this.claimDisplayForm, 'allowed');
                profsvcClaimDetail.allowedReason = Form.getValue(this.claimDisplayForm, 'allowedRsn');
                profsvcClaimDetail.billedAmt = Form.getValue(this.claimDisplayForm, 'billedAmount');
                profsvcClaimDetail.totalUnits = Form.getValue(this.claimDisplayForm, 'totalNotCov');
                profsvcClaimDetail.notCoveredReason = Form.getValue(this.claimDisplayForm, 'notCoveredRsn');
                profsvcClaimDetail.auditStatus = Form.getValue(this.claimDisplayForm, 'claimStatus');
                profsvcClaimDetail.copay1Reason = Form.getValue(this.claimDisplayForm, 'copayRsn');
                profsvcClaimDetail.processingStatus = Form.getValue(this.claimDisplayForm, 'processStatus');
                profsvcClaimDetail.anesTotalTime = Form.getValue(this.claimDisplayForm, 'totalCoins');
                profsvcClaimDetail.intPenDscRsn = Form.getValue(this.claimDisplayForm, 'coinsuranceRsn');
                profsvcClaimDetail.securityCode = Form.getValue(this.claimDisplayForm, 'companyCode');
                profsvcClaimDetail.deductibleAmt = Form.getValue(this.claimDisplayForm, 'deductRsn');
                profsvcClaimDetail.glRefCode = Form.getValue(this.claimDisplayForm, 'glReference');
                profsvcClaimDetail.withholdAmt = Form.getValue(this.claimDisplayForm, 'witholdAmt');
                profsvcClaimDetail.adjustmentReason = Form.getValue(this.claimDisplayForm, 'adjustRsn');
                profsvcClaimDetail.dmeProcedureCode = Form.getValue(this.claimDisplayForm, 'medicalDefCode');
                profsvcClaimDetail.cobPatLiabCvrgAmt = Form.getValue(this.claimDisplayForm, 'cobPatliab');
                profsvcClaimDetail.svcToDate = Form.getValue(this.claimDisplayForm, 'postDate');
                profsvcClaimDetail.bmaAmount = Form.getValue(this.claimDisplayForm, 'netAmount');
                profsvcClaimDetail.holdReason1 = Form.getValue(this.claimDisplayForm, 'holds');
                profsvcClaimDetail.checkDate = Form.getValue(this.claimDisplayForm, 'checkDate');
                profsvcClaimDetail.adjudicationMethod = Form.getValue(this.claimDisplayForm, 'adjudMethod');
                profsvcClaimDetail.printFlag = Form.getValue(this.claimDisplayForm, 'printFlatStatus');
                profsvcClaimDetail.paidNetAmt = Form.getValue(this.claimDisplayForm, 'printFlat');
                profsvcClaimDetail.interestAmt = Form.getValue(this.claimDisplayForm, 'paidNetAmt');
                profsvcClaimDetail.adminFeeExists = Form.getValue(this.claimDisplayForm, 'adminFee');
                this.profsvcClaimDetailService.createProfsvcClaimDetail(profsvcClaimDetail).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProfsvcClaimDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProfsvcClaimDetail(subLineCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimDisplayForm.valid) {
            let profsvcClaimDetail = new ProfsvcClaimDetail();
            profsvcClaimDetail.lineNumber = Form.getValue(this.claimDisplayForm, 'memberNumber');
            profsvcClaimDetail.netAmt = Form.getValue(this.claimDisplayForm, 'name');
            profsvcClaimDetail.notCoveredAmt = Form.getValue(this.claimDisplayForm, 'entered');
            profsvcClaimDetail.seqProvId = Form.getValue(this.claimDisplayForm, 'providerId');
            profsvcClaimDetail.postDate = Form.getValue(this.claimDisplayForm, 'provName');
            profsvcClaimDetail.penaltyAmt = Form.getValue(this.claimDisplayForm, 'specialty');
            profsvcClaimDetail.raId = Form.getValue(this.claimDisplayForm, 'pcpId');
            profsvcClaimDetail.primaryPaidAmount = Form.getValue(this.claimDisplayForm, 'primaryDate');
            profsvcClaimDetail.deductibleReason = Form.getValue(this.claimDisplayForm, 'serviceReason');
            profsvcClaimDetail.placeOfService = Form.getValue(this.claimDisplayForm, 'placeOfServ');
            profsvcClaimDetail.diagCodePointer1 = Form.getValue(this.claimDisplayForm, 'dxCode1');
            profsvcClaimDetail.authPrice = Form.getValue(this.claimDisplayForm, 'authorization');
            profsvcClaimDetail.companyCode = Form.getValue(this.claimDisplayForm, 'payDep');
            profsvcClaimDetail.subLineCode = Form.getValue(this.claimDisplayForm, 'planCode');
            profsvcClaimDetail.medDefCode = Form.getValue(this.claimDisplayForm, 'dxCode');
            profsvcClaimDetail.ocAllowedAmt = Form.getValue(this.claimDisplayForm, 'ocAllowed');
            profsvcClaimDetail.quantity = Form.getValue(this.claimDisplayForm, 'quantity');
            profsvcClaimDetail.procedureCode = Form.getValue(this.claimDisplayForm, 'procedureCode');
            profsvcClaimDetail.eobId = Form.getValue(this.claimDisplayForm, 'ocPaid');
            profsvcClaimDetail.otherCarrierRsn = Form.getValue(this.claimDisplayForm, 'ocPaidRsn');
            profsvcClaimDetail.typeOfService = Form.getValue(this.claimDisplayForm, 'dateOfService');
            profsvcClaimDetail.allowedAmt = Form.getValue(this.claimDisplayForm, 'allowed');
            profsvcClaimDetail.allowedReason = Form.getValue(this.claimDisplayForm, 'allowedRsn');
            profsvcClaimDetail.billedAmt = Form.getValue(this.claimDisplayForm, 'billedAmount');
            profsvcClaimDetail.totalUnits = Form.getValue(this.claimDisplayForm, 'totalNotCov');
            profsvcClaimDetail.notCoveredReason = Form.getValue(this.claimDisplayForm, 'notCoveredRsn');
            profsvcClaimDetail.auditStatus = Form.getValue(this.claimDisplayForm, 'claimStatus');
            profsvcClaimDetail.copay1Reason = Form.getValue(this.claimDisplayForm, 'copayRsn');
            profsvcClaimDetail.processingStatus = Form.getValue(this.claimDisplayForm, 'processStatus');
            profsvcClaimDetail.anesTotalTime = Form.getValue(this.claimDisplayForm, 'totalCoins');
            profsvcClaimDetail.intPenDscRsn = Form.getValue(this.claimDisplayForm, 'coinsuranceRsn');
            profsvcClaimDetail.securityCode = Form.getValue(this.claimDisplayForm, 'companyCode');
            profsvcClaimDetail.deductibleAmt = Form.getValue(this.claimDisplayForm, 'deductRsn');
            profsvcClaimDetail.glRefCode = Form.getValue(this.claimDisplayForm, 'glReference');
            profsvcClaimDetail.withholdAmt = Form.getValue(this.claimDisplayForm, 'witholdAmt');
            profsvcClaimDetail.adjustmentReason = Form.getValue(this.claimDisplayForm, 'adjustRsn');
            profsvcClaimDetail.dmeProcedureCode = Form.getValue(this.claimDisplayForm, 'medicalDefCode');
            profsvcClaimDetail.cobPatLiabCvrgAmt = Form.getValue(this.claimDisplayForm, 'cobPatliab');
            profsvcClaimDetail.svcToDate = Form.getValue(this.claimDisplayForm, 'postDate');
            profsvcClaimDetail.bmaAmount = Form.getValue(this.claimDisplayForm, 'netAmount');
            profsvcClaimDetail.holdReason1 = Form.getValue(this.claimDisplayForm, 'holds');
            profsvcClaimDetail.checkDate = Form.getValue(this.claimDisplayForm, 'checkDate');
            profsvcClaimDetail.adjudicationMethod = Form.getValue(this.claimDisplayForm, 'adjudMethod');
            profsvcClaimDetail.printFlag = Form.getValue(this.claimDisplayForm, 'printFlatStatus');
            profsvcClaimDetail.paidNetAmt = Form.getValue(this.claimDisplayForm, 'printFlat');
            profsvcClaimDetail.interestAmt = Form.getValue(this.claimDisplayForm, 'paidNetAmt');
            profsvcClaimDetail.adminFeeExists = Form.getValue(this.claimDisplayForm, 'adminFee');
            this.profsvcClaimDetailService.updateProfsvcClaimDetail(profsvcClaimDetail, subLineCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProfsvcClaimDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProfsvcClaimDetail() {
        if(this.editProfsvcClaimDetail) {
            this.updateProfsvcClaimDetail(this.profsvcClaimDetail.subLineCode)
        } else {
            this.createProfsvcClaimDetail();
        }
    }    deleteProfsvcClaimDetail(subLineCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimDetailService.deleteProfsvcClaimDetail(subLineCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProfsvcClaimDetail(subLineCode : string) {
        this.profsvcClaimDetailService.getProfsvcClaimDetail(subLineCode).subscribe(profsvcClaimDetail => {
            this.profsvcClaimDetail = profsvcClaimDetail;
            this.claimDisplayForm.patchValue({
                'memberNumber': this.profsvcClaimDetail.lineNumber,
                'name': this.profsvcClaimDetail.netAmt,
                'entered': this.profsvcClaimDetail.notCoveredAmt,
                'providerId': this.profsvcClaimDetail.seqProvId,
                'provName': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimDetail.postDate),
                'specialty': this.profsvcClaimDetail.penaltyAmt,
                'pcpId': this.profsvcClaimDetail.raId,
                'primaryDate': this.profsvcClaimDetail.primaryPaidAmount,
                'serviceReason': this.profsvcClaimDetail.deductibleReason,
                'placeOfServ': this.profsvcClaimDetail.placeOfService,
                'dxCode1': this.profsvcClaimDetail.diagCodePointer1,
                'authorization': this.profsvcClaimDetail.authPrice,
                'payDep': this.profsvcClaimDetail.companyCode,
                'planCode': this.profsvcClaimDetail.subLineCode,
                'dxCode': this.profsvcClaimDetail.medDefCode,
                'ocAllowed': this.profsvcClaimDetail.ocAllowedAmt,
                'quantity': this.profsvcClaimDetail.quantity,
                'procedureCode': this.profsvcClaimDetail.procedureCode,
                'ocPaid': this.profsvcClaimDetail.eobId,
                'ocPaidRsn': this.profsvcClaimDetail.otherCarrierRsn,
                'dateOfService': this.profsvcClaimDetail.typeOfService,
                'allowed': this.profsvcClaimDetail.allowedAmt,
                'allowedRsn': this.profsvcClaimDetail.allowedReason,
                'billedAmount': this.profsvcClaimDetail.billedAmt,
                'totalNotCov': this.profsvcClaimDetail.totalUnits,
                'notCoveredRsn': this.profsvcClaimDetail.notCoveredReason,
                'claimStatus': this.profsvcClaimDetail.auditStatus,
                'copayRsn': this.profsvcClaimDetail.copay1Reason,
                'processStatus': this.profsvcClaimDetail.processingStatus,
                'totalCoins': this.profsvcClaimDetail.anesTotalTime,
                'coinsuranceRsn': this.profsvcClaimDetail.intPenDscRsn,
                'companyCode': this.profsvcClaimDetail.securityCode,
                'deductRsn': this.profsvcClaimDetail.deductibleAmt,
                'glReference': this.profsvcClaimDetail.glRefCode,
                'witholdAmt': this.profsvcClaimDetail.withholdAmt,
                'adjustRsn': this.profsvcClaimDetail.adjustmentReason,
                'medicalDefCode': this.profsvcClaimDetail.dmeProcedureCode,
                'cobPatliab': this.profsvcClaimDetail.cobPatLiabCvrgAmt,
                'postDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimDetail.svcToDate),
                'netAmount': this.profsvcClaimDetail.bmaAmount,
                'holds': this.profsvcClaimDetail.holdReason1,
                'checkDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimDetail.checkDate),
                'adjudMethod': this.profsvcClaimDetail.adjudicationMethod,
                'printFlatStatus': this.profsvcClaimDetail.printFlag,
                'printFlat': this.profsvcClaimDetail.paidNetAmt,
                'paidNetAmt': this.profsvcClaimDetail.interestAmt,
                'adminFee': this.profsvcClaimDetail.adminFeeExists,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProfsvcClaimDetails() {
        this.profsvcClaimDetailService.getProfsvcClaimDetails().subscribe(profsvcClaimDetails => {
        this.profsvcClaimDetails = profsvcClaimDetails;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createProfsvcClaimHeader() {
            this.formValidation.validateForm();
            if(this.claimDisplayForm.valid) {
                let profsvcClaimHeader = new ProfsvcClaimHeader();
                profsvcClaimHeader.seqProvId = Form.getValue(this.claimDisplayForm, 'providerId');
                profsvcClaimHeader.auditStatus = Form.getValue(this.claimDisplayForm, 'claimStatus');
                profsvcClaimHeader.securityCode = Form.getValue(this.claimDisplayForm, 'companyCode');
                this.profsvcClaimHeaderService.createProfsvcClaimHeader(profsvcClaimHeader).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProfsvcClaimHeader = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProfsvcClaimHeader(seqClaimId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.claimDisplayForm.valid) {
            let profsvcClaimHeader = new ProfsvcClaimHeader();
            profsvcClaimHeader.seqProvId = Form.getValue(this.claimDisplayForm, 'providerId');
            profsvcClaimHeader.auditStatus = Form.getValue(this.claimDisplayForm, 'claimStatus');
            profsvcClaimHeader.securityCode = Form.getValue(this.claimDisplayForm, 'companyCode');
            this.profsvcClaimHeaderService.updateProfsvcClaimHeader(profsvcClaimHeader, seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProfsvcClaimHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProfsvcClaimHeader() {
        if(this.editProfsvcClaimHeader) {
            this.updateProfsvcClaimHeader(this.profsvcClaimHeader.seqClaimId)
        } else {
            this.createProfsvcClaimHeader();
        }
    }    deleteProfsvcClaimHeader(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimHeaderService.deleteProfsvcClaimHeader(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProfsvcClaimHeader(seqClaimId : number) {
        this.profsvcClaimHeaderService.getProfsvcClaimHeader(seqClaimId).subscribe(profsvcClaimHeader => {
            this.profsvcClaimHeader = profsvcClaimHeader;
            this.claimDisplayForm.patchValue({
                'providerId': this.profsvcClaimHeader.seqProvId,
                'claimStatus': this.profsvcClaimHeader.auditStatus,
                'companyCode': this.profsvcClaimHeader.securityCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProfsvcClaimHeaders() {
        this.profsvcClaimHeaderService.getProfsvcClaimHeaders().subscribe(profsvcClaimHeaders => {
        this.profsvcClaimHeaders = profsvcClaimHeaders;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {
    };
      this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
      this.dataGridGridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: "DOS",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Claim Number",
             field: "claimstatus",
             width: 200         },
         {
             headerName: "Line Provider",
             field: "seqprovid",
             width: 200         },
         {
             headerName: "Procedure Description",
             field: "",
             width: 200         },
         {
             headerName: "Biled Amount",
             field: "patientpaidamount",
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
     private profsvcClaimDetailService: ProfsvcClaimDetailService, private profsvcClaimHeaderService: ProfsvcClaimHeaderService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDisplayForm);
         this.createDataGrid();
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
        this.formValidation = new FormValidation(this.claimDisplayForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDisplayForm = this.formBuilder.group({
            memberNumber: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            claimTypeDisplayed: ['', {updateOn: 'blur', validators: [] }],
            dob: ['', {updateOn: 'blur', validators: [] }],
            gender: ['', {updateOn: 'blur', validators: [] }],
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            receivedd: ['', {updateOn: 'blur', validators: [] }],
            entered: ['', {updateOn: 'blur', validators: [] }],
            providerId: ['', {updateOn: 'blur', validators: [] }],
            par: ['', {updateOn: 'blur', validators: [] }],
            provName: ['', {updateOn: 'blur', validators: [] }],
            specialty: ['', {updateOn: 'blur', validators: [] }],
            pcpId: ['', {updateOn: 'blur', validators: [] }],
            primaryDate: ['', {updateOn: 'blur', validators: [] }],
            serviceReason: ['', {updateOn: 'blur', validators: [] }],
            pcpName: ['', {updateOn: 'blur', validators: [] }],
            placeOfServ: ['', {updateOn: 'blur', validators: [] }],
            dxCode1: ['', {updateOn: 'blur', validators: [] }],
            authorization: ['', {updateOn: 'blur', validators: [] }],
            paySub: ['', {updateOn: 'blur', validators: [] }],
            payDep: ['', {updateOn: 'blur', validators: [] }],
            planCode: ['', {updateOn: 'blur', validators: [] }],
            dxCode: ['', {updateOn: 'blur', validators: [] }],
            ocAllowed: ['', {updateOn: 'blur', validators: [] }],
            quantity: ['', {updateOn: 'blur', validators: [] }],
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            ocPaid: ['', {updateOn: 'blur', validators: [] }],
            ocPaidRsn: ['', {updateOn: 'blur', validators: [] }],
            dateOfService: ['', {updateOn: 'blur', validators: [] }],
            allowed: ['', {updateOn: 'blur', validators: [] }],
            allowedRsn: ['', {updateOn: 'blur', validators: [] }],
            billedAmount: ['', {updateOn: 'blur', validators: [] }],
            totalNotCov: ['', {updateOn: 'blur', validators: [] }],
            notCoveredRsn: ['', {updateOn: 'blur', validators: [] }],
            claimStatus: ['', {updateOn: 'blur', validators: [] }],
            totalCopay: ['', {updateOn: 'blur', validators: [] }],
            copayRsn: ['', {updateOn: 'blur', validators: [] }],
            processStatus: ['', {updateOn: 'blur', validators: [] }],
            totalCoins: ['', {updateOn: 'blur', validators: [] }],
            coinsuranceRsn: ['', {updateOn: 'blur', validators: [] }],
            companyCode: ['', {updateOn: 'blur', validators: [] }],
            totalDeduct: ['', {updateOn: 'blur', validators: [] }],
            deductRsn: ['', {updateOn: 'blur', validators: [] }],
            glReference: ['', {updateOn: 'blur', validators: [] }],
            witholdAmt: ['', {updateOn: 'blur', validators: [] }],
            adjustRsn: ['', {updateOn: 'blur', validators: [] }],
            medicalDefCode: ['', {updateOn: 'blur', validators: [] }],
            cobPatliab: ['', {updateOn: 'blur', validators: [] }],
            message: ['', {updateOn: 'blur', validators: [] }],
            postDate: ['', {updateOn: 'blur', validators: [] }],
            netAmount: ['', {updateOn: 'blur', validators: [] }],
            holds: ['', {updateOn: 'blur', validators: [] }],
            checkDate: ['', {updateOn: 'blur', validators: [] }],
            adjudMethod: ['', {updateOn: 'blur', validators: [] }],
            printFlatStatus: ['', {updateOn: 'blur', validators: [] }],
            printFlat: ['', {updateOn: 'blur', validators: [] }],
            paidNetAmt: ['', {updateOn: 'blur', validators: [] }],
            adminFee: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}