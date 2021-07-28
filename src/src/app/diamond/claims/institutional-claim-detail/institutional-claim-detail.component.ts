/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';

import {UntilDestroy} from '@ngneat/until-destroy';
import {Menu} from '../../../shared/models/models';
import {MessageType} from '../../../shared/components/pop-up-message';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {HelpComponent} from '../../member/help/help.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';

import {
    DddwDtlService,
    MessageMasterDtlService,
    ProcedureCodeMasterService,
    SecUserService,
    SequenceService
} from '../../../api-services';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {MemberMaster, SecUser} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {INST_CLAIM_DETAIL_MODULE_ID} from '../../../shared/app-constants';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {InstClaimDetail} from '../../../api-models/claims/inst-claim-detail.model';
import {InstClaimDetailService} from '../../../api-services/claims/inst-claim-detail.service'
import {InstClaimHeader} from "../../../api-models/inst-claim-header.model";
import {InstClaimHeaderService} from "../../../api-services/inst-claim-header.service";
import {getInstClaimDetailComponentShortcutKeys} from "../../../shared/services/shared.service";
import {IMySingleDateModel} from "angular-mydatepicker";
import {LookupService} from "../../../shared/services/lookup.service";
import {ProfsvcClaimModsValue} from "../../../api-models/claims/ProfsvcClaimModsValue";
import {ProfsvcClaimDetailService} from "../../../api-services/claims/profsvc-claim-detail.service";
import {DatePipe} from "@angular/common";

// Use the Component directive to define the InstitutionalClaimDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({ checkProperties: true })
@Component({

    selector: 'institutional-claim-detail',
    templateUrl: './institutional-claim-detail.component.html',
    providers: [
        InstClaimHeaderService,
        InstClaimDetailService,
        ProcedureCodeMasterService,
        ProfsvcClaimDetailService
    ]
})
export class InstitutionalClaimDetailComponent implements OnInit, AfterViewInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() claimNumber?: number;
    @Input() showIcon: boolean;
    @Input() winId: string;
    instClaimDetailForm: FormGroup;
    memberUtilizationDisplayForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secWin: SecWinViewModel;
    windowId = INST_CLAIM_DETAIL_MODULE_ID;
    tableName = "INST_CLAIM_DETAIL";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = INST_CLAIM_DETAIL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();

    menu: Menu[] = [];

    shortName: any = "";
    claimStatusData: any[];
    procStatusData : any[];
    typeOfSvcData: any[];

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;
    mod1Status: boolean = false;
    mod2Status: boolean = false;
    mod3Status: boolean = false;
    openProcedureCodeLookup() {
        this.lookupService.openProcedureCodeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    procedureCode: response.procedureCode
                });
            }
        });
    }

    openProcedureCodeAltLookup() {
        this.lookupService.openProcedureCodeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    alternateProcedureCode: response.procedureCode
                });
            }
        });
    }

    openCompanyCodeLookup() {
        this.lookupService.openCompanyCodeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    companyCode: response.companyCode
                });
            }
        });
    }

    openGeneralLedgerReferenceLookup() {
        this.lookupService.openGeneralLedgerReferenceModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    glReference: response.generalLedgerReferencePrimaryKey.glRefCode
                });
            }
        });
    }

    openOcPaidReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    ocPaidRsn: response.reasonCode
                });
            }
        }, 'OC');
    }

    openAllowedReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    allowedRsn: response.reasonCode
                });
            }
        }, 'AL');
    }

    openNotCovReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    notCoveredRsn: response.reasonCode
                });
            }
        }, 'NC');
    }

    openCopayReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    copayRsn: response.reasonCode
                });
            }
        }, 'CP');
    }

    openCoInsReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    coinsuranceRsn: response.reasonCode
                });
            }
        }, 'CP');
    }

    openDeductReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    deductRsn: response.reasonCode
                });
            }
        }, 'DD');
    }

    openAdjustReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.instClaimDetailForm.patchValue({
                    adjustRsn: response.reasonCode
                });
            }
        }, 'AD');
    }

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

    editInstClaimDetail: boolean;
    instClaimDetail: InstClaimDetail;
    instClaimDetails: InstClaimDetail[];
    editInstClaimHeader: boolean;
    instClaimHeader: InstClaimHeader;
    instClaimHeaders: InstClaimHeader[];
    memberMaster: MemberMaster;
    selectedRowId: string;
    seqClaimId: any;
    lineNumber: any;
    subLineCode: any;

    createInstClaimDetail() {
        this.formValidation.validateForm();
        if (this.instClaimDetailForm.valid) {
            this.instClaimDetail = this.getInstClaimDetailFromForm();
            this.instClaimDetailService.createInstClaimDetail(this.instClaimDetail).subscribe((response: InstClaimDetail) => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editInstClaimDetail = false;
                this.instClaimDetail.instClaimDetailPrimaryKey.lineNumber = response.instClaimDetailPrimaryKey.lineNumber;
                this.instClaimDetail.instClaimDetailPrimaryKey.subLineCode = response.instClaimDetailPrimaryKey.subLineCode;
                this.selectedRowId = this.instClaimDetails.length.toString();
                this.instClaimDetails.push(this.instClaimDetail);
                this.dataGridGridOptions.api.setRowData(this.instClaimDetails);
                this.dataGridGridOptions.api.paginationGoToLastPage();
                this.dataGridGridOptions.api.selectIndex(this.selectedRowId, false, false);
                this.dataGridGridOptions.api.ensureIndexVisible(this.selectedRowId, 'bottom');
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getInstClaimDetailFromForm(){
        let instClaimDetail = new InstClaimDetail();
        instClaimDetail.detailSvcDate = Form.getDatePickerValue(this.instClaimDetailForm, 'detailServiceDate');
        instClaimDetail.procedureCode = Form.getValue(this.instClaimDetailForm, 'procedureCode');
        instClaimDetail.quantity = Form.getValue(this.instClaimDetailForm, 'quantity');
        instClaimDetail.accommodationRate = Form.getValue(this.instClaimDetailForm, 'accommodationRate');
        instClaimDetail.detailThruDate = Form.getDatePickerValue(this.instClaimDetailForm, 'detailThruDate');
        instClaimDetail.alternateProcCode = Form.getValue(this.instClaimDetailForm, 'alternateProcedureCode');
        instClaimDetail.diagnosisPointer = Form.getValue(this.instClaimDetailForm, 'dxPtr');
        instClaimDetail.billedAmt = Form.getValue(this.instClaimDetailForm, 'billedAmount');
        instClaimDetail.procedureModifier = Form.getValue(this.instClaimDetailForm, 'procedureMod1');
        instClaimDetail.procedureModifier2 = Form.getValue(this.instClaimDetailForm, 'procedureMod2');
        instClaimDetail.procedureModifier3 = Form.getValue(this.instClaimDetailForm, 'procedureMod3');
        instClaimDetail.procedureModifier4 = Form.getValue(this.instClaimDetailForm, 'procedureMod4');
        instClaimDetail.ocAllowedAmt = Form.getValue(this.instClaimDetailForm, 'ocAllowed');
        instClaimDetail.claimStatus = Form.getValue(this.instClaimDetailForm, 'claimStatus');
        instClaimDetail.otherCarrierAmt = Form.getValue(this.instClaimDetailForm, 'ocPaid');
        instClaimDetail.otherCarrierRsn = Form.getValue(this.instClaimDetailForm, 'ocPaidRsn');
        instClaimDetail.processingStatus = Form.getValue(this.instClaimDetailForm, 'processStatus');
        instClaimDetail.allowedAmt = Form.getValue(this.instClaimDetailForm, 'allowed');
        instClaimDetail.allowedReason = Form.getValue(this.instClaimDetailForm, 'allowedRsn');
        instClaimDetail.companyCode = Form.getValue(this.instClaimDetailForm, 'companyCode');
        instClaimDetail.notCoveredAmt = Form.getValue(this.instClaimDetailForm, 'totalNotCov');
        instClaimDetail.notCoveredReason = Form.getValue(this.instClaimDetailForm, 'notCoveredRsn');
        instClaimDetail.glRefCode = Form.getValue(this.instClaimDetailForm, 'glReference');
        instClaimDetail.copayment1Amt = Form.getValue(this.instClaimDetailForm, 'totalCopay');
        instClaimDetail.copay1Reason = Form.getValue(this.instClaimDetailForm, 'copayRsn');
        instClaimDetail.medDefCode = Form.getValue(this.instClaimDetailForm, 'medicalDefCode');
        instClaimDetail.copayment2Amt = Form.getValue(this.instClaimDetailForm, 'totalCoins');
        instClaimDetail.copay2Reason = Form.getValue(this.instClaimDetailForm, 'coinsuranceRsn');
        instClaimDetail.adjudicationMethod = Form.getValue(this.instClaimDetailForm, 'adjudMethod');
        instClaimDetail.deductibleAmt = Form.getValue(this.instClaimDetailForm, 'totalDeduct');
        instClaimDetail.deductibleReason = Form.getValue(this.instClaimDetailForm, 'deductRsn');
        instClaimDetail.postDate = Form.getDateValue(this.instClaimDetailForm, 'postDate');
        instClaimDetail.withholdAmt = Form.getValue(this.instClaimDetailForm, 'witholdAmt');
        instClaimDetail.adjustmentReason = Form.getValue(this.instClaimDetailForm, 'adjustRsn');
        instClaimDetail.auditStatus = Form.getValue(this.instClaimDetailForm, 'auditStatus');
        instClaimDetail.cobPatLiabCvrgAmt = Form.getValue(this.instClaimDetailForm, 'cobPatliab');
        instClaimDetail.withholdSurplus = Form.getValue(this.instClaimDetailForm, 'withholdSurplus');
        instClaimDetail.paidNetAmt = Form.getValue(this.instClaimDetailForm, 'paidNetAmt');
        instClaimDetail.netAmt = Form.getValue(this.instClaimDetailForm, 'netAmount');
        instClaimDetail.adminFeeExists = Form.getValue(this.instClaimDetailForm, 'adminFee');
        instClaimDetail.ocAllowedAmt = Form.getValue(this.instClaimDetailForm, 'ocPdSurplus');
        instClaimDetail.holdReason1 = Form.getValue(this.instClaimDetailForm, 'holds');
        instClaimDetail.seqProvId = this.instClaimDetail.seqProvId;
        instClaimDetail.seqMembId = this.instClaimDetail.seqMembId;
        instClaimDetail.instClaimDetailPrimaryKey.seqClaimId = this.instClaimHeader.seqClaimId;
        return instClaimDetail;
    }

    updateInstClaimDetail(subLineCode: string, lineNumber: number, seqClaimId : number) {
        this.formValidation.validateForm();
        if(this.instClaimDetailForm.valid) {
            let instClaimDetail = this.getInstClaimDetailFromForm();
            this.instClaimDetail = instClaimDetail;
            this.instClaimDetailService.updateInstClaimDetail(instClaimDetail, subLineCode, lineNumber, seqClaimId).subscribe(response => {
                this.dataGridGridOptions.api.getRowNode(this.selectedRowId).setData(this.instClaimDetail);
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editInstClaimDetail = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveInstClaimDetail() {
        if(this.editInstClaimDetail) {
            this.updateInstClaimDetail(this.instClaimDetail['instClaimDetailPrimaryKey'].subLineCode,
                this.instClaimDetail['instClaimDetailPrimaryKey'].lineNumber,
                this.instClaimDetail['instClaimDetailPrimaryKey'].seqClaimId)
        } else {
            this.createInstClaimDetail();
        }
    }

    getInstClaimDetail(seqClaimId : number) {
        this.instClaimDetailService.getInstClaimDetail(seqClaimId).subscribe(instClaimDetail => {
            this.setInstClaimDetailToForm(instClaimDetail);
        });
    }

    setInstClaimDetailToForm(instClaimDetail : any) {
        this.procedureCodeMasterService.getProcedureCodeMaster(instClaimDetail.procedureCode).subscribe( res => {
            this.seqClaimId = instClaimDetail.instClaimDetailPrimaryKey.seqClaimId;
            this.lineNumber = instClaimDetail.instClaimDetailPrimaryKey.lineNumber;
            this.subLineCode = instClaimDetail.instClaimDetailPrimaryKey.subLineCode;
            this.instClaimDetail = instClaimDetail;
            this.instClaimDetailForm.patchValue({
                'detailServiceDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimDetail.detailSvcDate),
                'procedureCode': this.instClaimDetail.procedureCode,
                'quantity': this.instClaimDetail.quantity,
                'shortDec': res.shortDescription,
                'accommodationRate': this.instClaimDetail.accommodationRate,
                'detailThruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimDetail.detailThruDate),
                'alternateProcedureCode': this.instClaimDetail.alternateProcCode,
                'dxPtr': this.instClaimDetail.diagnosisPointer,
                'billedAmount': this.instClaimDetail.billedAmt,
                'procedureMod1': this.instClaimDetail.procedureModifier,
                'procedureMod2': this.instClaimDetail.procedureModifier2,
                'procedureMod3': this.instClaimDetail.procedureModifier3,
                'procedureMod4': this.instClaimDetail.procedureModifier4,
                'ocAllowed': this.instClaimDetail.ocAllowedAmt,
                'claimStatus': this.instClaimDetail.claimStatus,
                'ocPaid': this.instClaimDetail.otherCarrierAmt,
                'ocPaidRsn': this.instClaimDetail.otherCarrierRsn,
                'processStatus': this.instClaimDetail.processingStatus,
                'allowed': this.instClaimDetail.allowedAmt,
                'allowedRsn': this.instClaimDetail.allowedReason,
                'companyCode': this.instClaimDetail.companyCode,
                'totalNotCov': this.instClaimDetail.notCoveredAmt,
                'notCoveredRsn': this.instClaimDetail.notCoveredReason,
                'glReference': this.instClaimDetail.glRefCode,
                'totalCopay': this.instClaimDetail.copayment1Amt,
                'copayRsn': this.instClaimDetail.copay1Reason,
                'medicalDefCode': this.instClaimDetail.medDefCode,
                'totalCoins': this.instClaimDetail.copayment2Amt,
                'coinsuranceRsn': this.instClaimDetail.copay2Reason,
                'adjudMethod': this.instClaimDetail.adjudicationMethod,
                'totalDeduct': this.instClaimDetail.deductibleAmt,
                'deductRsn': this.instClaimDetail.deductibleReason,
                'postDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimDetail.postDate),
                'witholdAmt': this.instClaimDetail.withholdAmt,
                'adjustRsn': this.instClaimDetail.adjustmentReason,
                'auditStatus': this.instClaimDetail.auditStatus,
                'cobPatliab': this.instClaimDetail.cobPatLiabCvrgAmt,
                'withholdSurplus': this.instClaimDetail.withholdSurplus,
                'paidNetAmt': this.instClaimDetail.paidNetAmt,
                'netAmount': this.instClaimDetail.netAmt,
                //'message': this.instClaimDetail.messsage,
                'adminFee': this.instClaimDetail.adminFeeExists,
                'ocPdSurplus': this.instClaimDetail.ocAllowedAmt,
                'holds': this.instClaimDetail.holdReason1
            });
        });
    }

    setInstClaimHeaderToForm(instClaimHeader : any) {
        this.instClaimHeader = instClaimHeader;
        this.instClaimDetailForm.patchValue({
            'claimNumber': this.instClaimHeader.claimNumber,
            'entered': this.instClaimHeader.insertDatetime,
            'providerId': this.instClaimHeader.seqProvId,
            'provName': this.instClaimHeader.provMaster ? this.instClaimHeader.provMaster.shortName : '',
            'specialty': this.instClaimHeader.providerSpec,
            'pcpId': this.instClaimHeader.pcpIpaId,
            'primaryDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.primarySvcDate),
            'serviceReason': this.instClaimHeader.serviceReason1,
            'dateOfService': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.primarySvcDate),
            'billedAmount': this.instClaimHeader.totalBilledAmt,
        });
    }

    getInstClaimDetails() {
        this.instClaimDetailService.getInstClaimDetails().subscribe(instClaimDetails => {
            this.instClaimDetails = instClaimDetails;
        });
    }

    createInstClaimHeader() {
        this.formValidation.validateForm();
        if(this.instClaimDetailForm.valid) {
            let instClaimHeader = new InstClaimHeader();
            this.instClaimHeaderService.createInstClaimHeader(instClaimHeader).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editInstClaimHeader = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateInstClaimHeader(seqClaimId : number) {
        this.formValidation.validateForm();
        if(this.instClaimDetailForm.valid) {
            let instClaimHeader = new InstClaimHeader();
            this.instClaimHeaderService.updateInstClaimHeader(this.instClaimHeader, seqClaimId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editInstClaimHeader = false;
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveInstClaimHeader() {
        let popUpMessage = new PopUpMessage(
            'Institutional Claims',
            'Institutional Claims',
            '6128: Data has been modified, press yes to save changes',
            'info',
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                this.saveChanges();
            } else if (resp.name === 'No') {
                this.router.navigateByUrl('/');
            } // 3rd case: In case of cancel do nothing
        });
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (
            this.securityService.checkInsertUpdatePermissions(
                this.editInstClaimDetail,
                this.secWin
            )
        ) {
            if (this.editInstClaimDetail) {
                this.updateInstClaimDetail(this.instClaimDetail.instClaimDetailPrimaryKey.subLineCode, this.instClaimDetail.instClaimDetailPrimaryKey.lineNumber, this.instClaimDetail.instClaimDetailPrimaryKey.seqClaimId);
            } else {
                this.createInstClaimDetail();
            }
        }
    }

    deleteInstClaimHeader(seqClaimId: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.instClaimHeaderService.deleteInstClaimHeader(seqClaimId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
       }
    }

    getInstClaimHeader(seqClaimId : number) {
        this.instClaimHeaderService.getInstClaimHeader(seqClaimId).subscribe(instClaimHeader => {
            this.instClaimHeader = instClaimHeader;
            this.instClaimDetailForm.patchValue({
            });
        });
    }

    getInstClaimHeaders() {
        this.instClaimHeaderService.getInstClaimHeaders().subscribe(instClaimHeaders => {
            this.instClaimHeaders = instClaimHeaders;
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    modsValue = new Array<ProfsvcClaimModsValue>();
    createDataGrid(): void {
      this.dataGridGridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: "Line",
             field: "instClaimDetailPrimaryKey.lineNumber",
             width: 100,
             sort: 'asc'
         },
         {
             headerName: "AdmDate",
             field: "detailSvcDate",
             width: 125,
             valueFormatter: Form.getDateGridDisplay
         },
         {
             headerName: "Proc",
             field: "procedureCode",
             width: 125
         },
         {
             headerName: "Qty",
             field: "quantity",
             width: 100
         },
         {
             headerName: "Billed Amt",
             field: "billedAmt",
             width: 125
         },
          {
              headerName: "Allowed Amt",
              field: "allowedAmt",
              width: 150
          },
          {
              headerName: "Net Amt",
              field: "netAmt",
              width: 125
          },
          {
              headerName: "Clm Sts",
              field: "claimStatus",
              width: 150
          },
          {
              headerName: "Prc Sts",
              field: "processingStatus",
              width: 100
          }
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
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private memberMasterService: MemberMasterService,
        private instClaimHeaderService: InstClaimHeaderService,
        private instClaimDetailService: InstClaimDetailService,
        private sequenceService: SequenceService,
        private messageService: MessageMasterDtlService,
        private procedureCodeMasterService: ProcedureCodeMasterService,
        private dddwDtlService: DddwDtlService,
        private profsvcClaimDetailService: ProfsvcClaimDetailService,
        private datePipe: DatePipe,
        private lookupService: LookupService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.instClaimDetailForm);
        this.createDataGrid();
        this.claimStatus();
        this.procStatus();
        this.typeOfSvc();
        this.getModsValue();

        if(this.claimNumber){
            this.instClaimDetailForm.patchValue({'claimNumber': this.claimNumber});
            this.instClaimHeaderService.findByClaimNumber(this.claimNumber).subscribe(instClaimHeader => {
                this.instClaimHeader = instClaimHeader;
                this.instClaimDetailService.findBySeqClaimId(this.instClaimHeader.seqClaimId).subscribe(instClaimDetails => {
                    this.instClaimDetails = instClaimDetails;
                    if(this.instClaimDetails && this.instClaimDetails.length > 0){
                        this.dataGridGridOptions.api.setRowData(this.instClaimDetails);
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                        this.onInstClaimDetailSelected({data: this.instClaimDetails[0]});
                    }
                });
            });
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getInstClaimDetailComponentShortcutKeys(this));
        this.cdr.detectChanges();
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.secProgress = false;
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.secProgress = false;
        });
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
            .findByTableNameAndUserId(this.tableName, secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.instClaimDetailForm);
        this.createDataGrid();
        this.menuInit();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.instClaimDetailForm = this.formBuilder.group({
            claimNumber : ['', {updateOn: 'blur', validators: [] }],
            detailServiceDate : ['', {updateOn: 'blur', validators: [] }],
            procedureCode : ['', {updateOn: 'blur', validators: [] }],
            quantity : ['', {updateOn: 'blur', validators: [] }],
            accommodationRate : ['', {updateOn: 'blur', validators: [] }],
            shortDec: ['', {updateOn: 'blur', validators: []}],
            detailThruDate : ['', {updateOn: 'blur', validators: [] }],
            alternateProcedureCode : ['', {updateOn: 'blur', validators: [] }],
            dxPtr : ['', {updateOn: 'blur', validators: [] }],
            billedAmount : ['', {updateOn: 'blur', validators: [] }],
            procedureMod1 : ['', {updateOn: 'blur', validators: [] }],
            procedureMod2 : ['', {updateOn: 'blur', validators: [] }],
            procedureMod3 : ['', {updateOn: 'blur', validators: [] }],
            procedureMod4 : ['', {updateOn: 'blur', validators: [] }],
            ocAllowed : ['', {updateOn: 'blur', validators: [] }],
            addBackAmount : ['', {updateOn: 'blur', validators: [] }],
            claimStatus : ['', {updateOn: 'blur', validators: [] }],
            ocPaid : ['', {updateOn: 'blur', validators: [] }],
            ocPaidRsn : ['', {updateOn: 'blur', validators: [] }],
            processStatus : ['', {updateOn: 'blur', validators: [] }],
            allowed : ['', {updateOn: 'blur', validators: [] }],
            allowedRsn : ['', {updateOn: 'blur', validators: [] }],
            companyCode : ['', {updateOn: 'blur', validators: [] }],
            totalNotCov : ['', {updateOn: 'blur', validators: [] }],
            notCoveredRsn : ['', {updateOn: 'blur', validators: [] }],
            glReference : ['', {updateOn: 'blur', validators: [] }],
            totalCopay : ['', {updateOn: 'blur', validators: [] }],
            copayRsn : ['', {updateOn: 'blur', validators: [] }],
            medicalDefCode : ['', {updateOn: 'blur', validators: [] }],
            totalCoins : ['', {updateOn: 'blur', validators: [] }],
            coinsuranceRsn : ['', {updateOn: 'blur', validators: [] }],
            adjudMethod : ['', {updateOn: 'blur', validators: [] }],
            totalDeduct : ['', {updateOn: 'blur', validators: [] }],
            deductRsn : ['', {updateOn: 'blur', validators: [] }],
            postDate : ['', {updateOn: 'blur', validators: [] }],
            witholdAmt : ['', {updateOn: 'blur', validators: [] }],
            adjustRsn : ['', {updateOn: 'blur', validators: [] }],
            auditStatus : ['', {updateOn: 'blur', validators: [] }],
            cobPatliab : ['', {updateOn: 'blur', validators: [] }],
            withholdSurplus : ['', {updateOn: 'blur', validators: [] }],
            paidNetAmt : ['', {updateOn: 'blur', validators: [] }],
            netAmount : ['', {updateOn: 'blur', validators: [] }],
            message : ['', {updateOn: 'blur', validators: [] }],
            adminFee : ['', {updateOn: 'blur', validators: [] }],
            ocPdSurplus : ['', {updateOn: 'blur', validators: [] }],
            holds : ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Delete', shortcutKey: 'Ctrl+D' },
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' }
                    ]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}
                ]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Header File'},
                    {name: 'Detail File'},
                    {name: 'Patient Liabilities'},
                    {name: 'UB92'},
                    {name: 'UB92 Other Carriers'},
                    {name: 'Hold Reasons'},
                    {name: 'APC Details'},
                    {name: 'Home Healthcare Service'}
                ]
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Claim Lookup'},
                    {
                        name: 'Pricing and Adjudication',
                        dropdownItems: [
                            {name: 'Price Detail Line'},
                            {name: 'Price Claim'},
                            {name: 'Adjudicate Detail Line'},
                            {name: 'Adjudicate Claim'},
                            {name: 'Price and Adjudicate Detail Line'},
                            {name: 'Price and Adjudicate Claim'}
                        ]
                    },
                    {name: 'Allowed Factor'},
                    {name: 'Payment Detail'},
                    {name: 'Hidden Fields'},
                    {name: 'Original Procedure'},
                    {name: 'Adjust Line'},
                    {name: 'Reverse Line'},
                    {name: 'Whole Claim Pricing', shortcutKey: 'Ctrl+F8'},
                    {name: 'DRG', shortcutKey: 'Ctrl+Q'},
                    {name: 'View DRG Pricer Fields'},
                    {name: 'Edit Vendor Info.'},
                    {name: 'View Cap Fund Info'},
                    {name: 'Override Cap Fund Dates'},
                    {name: 'View IPA Info'},
                    {name: 'Attach EOB/RA Remarks'},
                    {name: 'Print Flag Info'},
                    {name: 'View Claims with Auth Number'},
                    {name: 'NDC Codes'},
                    {name: 'APC Processing', shortcutKey: 'Ctrl+G'},
                    {name: 'Claim Interest/Penalty/Discount Info'},
                    {name: 'Reset Claim Indicator', shortcutKey: 'Ctrl+R'},
                    {name: 'Adjust Interest/Penalty/Discount Amount', disabled: true},
                    {name: 'Submitted Claim Detail Information'},
                    {name: 'Administrative Fee Info', shortcutKey: 'Ctrl+F', disabled: true},
                    {name: 'View Claim Totals'}
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4' }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                   { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Processing Messages', shortcutKey: 'Shift+Alt+P' },
                    { name: 'Hold Reason Display', shortcutKey: 'Shift+Alt+H'},
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 GL Assignment' },
                    { name: '3 Process EDI'},
                    { name : '4 Institutional Claims'},
                    { name: '5 Institutional Claims'}
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

    resetAll(editInstClaimDetail: boolean = true, defaultData: any = {}) {
        this.alertMessage = this.alertMessageService.close();
        this.instClaimDetailForm.reset(defaultData);
        this.editInstClaimDetail = editInstClaimDetail;
        this.shortName = '';
        let data = [];
        for (let item of this.instClaimDetails) {
            data.push(item);
        }
        data.push({
            instClaimDetailPrimaryKey: {
                lineNumber: this.instClaimDetails.length + 1,
                seqClaimId: this.instClaimDetailForm.get('claimNumber').value
            },
            detailSvcDate: '2020-01-01',
            detailThurDate: '2020-01-01',
            quantity: 1,
            billedAmt: 0,
            allowedAmt: 0,
            netAmt: 0
        });
        this.dataGridGridOptions.api.setRowData(data);
        this.dataGridGridOptions.api.selectIndex(this.instClaimDetails.length, false, false);
        this.instClaimDetailForm.patchValue({
            detailServiceDate: this.dateFormatPipe.defaultDisplayDateFormat('2020-01-01'),
            quantity: 1.0,
            detailThruDate: this.dateFormatPipe.defaultDisplayDateFormat('2020-01-01'),
            dxPtr: 1,
            message: 'X'
        })
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetAll(false, {'claimNumber': this.claimNumber});
                    break;
                }
                case 'Open': {
                    this.resetAll(false);
                    break;
                }
                case 'Delete': {
                    this.deletePopup();
                    break;
                }
                case 'Save': {
                    this.saveInstClaimHeader();
                    break;
                }
                case 'Close': {
                    this.resetAll(false);
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
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {             // handle special-Menu Actions
            /**
             * Open help modal
             */
            this.handleHelpMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Notes') {
            this.handleNotesMenu(event.action);
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {

            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case "Notes": {
                this.popUpNotesMenuClicked(action);
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    /**
     * Help Menu actions
     * @param action
     */
    handleHelpMenu(action: string) {
        const modalRef = this.modalService.open(HelpComponent, { windowClass: "myCustomModalClass" });

        switch (action) {
            case "This Window": {
                modalRef.componentInstance.currentWin = 'PROVIDER_Provider_Credential.htm';
                break;
            }
            default: {
                break;
            }
        }
    }

    popUpNotesMenuClicked(button: any) {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
    }

    onInstClaimDetailSelected(event: any) {
        if(event.data){
            this.setInstClaimDetailToForm(event.data);
            this.selectedRowId = event.rowIndex;
            this.editInstClaimDetail = true;
        }else{
            this.alertMessage = this.alertMessageService.error("No claim detail available.");
        }
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    validateDate(event) {
        if (event.singleDate) {
            let eventDate = this.getDate(event.singleDate);
            let today = new Date();
            if (this.instClaimDetailForm.value.detailServiceDate) {
                let formDate = this.getDate(this.instClaimDetailForm.value.detailServiceDate.singleDate);
                if (formDate > eventDate) {
                    this.messageService.findByMessageId(7169).subscribe((message) => {
                        this.showPopUp(
                            "7169 : " + message[0].messageText,
                            "Intitutional Claims"
                        );
                        this.instClaimDetailForm.patchValue({
                            detailServiceDate: null
                        });
                    })
                }
            } else {
                if (eventDate > today) {
                    this.messageService.findByMessageId(7170).subscribe((message) => {
                        this.showPopUp(
                            "7170 : " + message[0].messageText,
                            "Intitutional Claims"
                        );
                        this.instClaimDetailForm.patchValue({
                            admDate: null
                        });
                    })
                }
            }
        }
    }

    validateDetailServiceDate(event) {
        if (event.singleDate) {
            let today = new Date();
            let detailServiceDate = this.getDate(event.singleDate);
            if (detailServiceDate > today) {
                this.messageService.findByMessageId(7170).subscribe((message) => {
                    this.showPopUp(
                        "7170 : " + message[0].messageText,
                        "Institutional Claims"
                    );
                    this.instClaimDetailForm.patchValue({
                        detailServiceDate: null
                    });
                })
            }
        }
    }

    validateDetailThruDate(event) {
        if (event.singleDate) {
            let detailThruDate = this.getDate(event.singleDate);
            let pastDate = new Date(1900, 1, 1);
            let detailServiceDate = this.getDate(this.instClaimDetailForm.value.detailServiceDate.singleDate);
            if (detailThruDate > pastDate && detailServiceDate > detailThruDate) {
                this.messageService.findByMessageId(7172).subscribe((message) => {
                    this.showPopUp(
                        "7172 : " + message[0].messageText,
                        "Intitutional Claims"
                    );
                    this.instClaimDetailForm.patchValue({
                        detailThruDate: null
                    });
                })
            }
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    claimStatus = () => {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('claim_status', 'dw_psclm_detail_de', 0).subscribe(res => {
            this.claimStatusData = res;
        })
    };

    procStatus = () => {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('processing_status', 'dw_psclm_detail_de', 0).subscribe(res => {
            this.procStatusData = res
        });
    };

    typeOfSvc = () => {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('type_of_service', 'dw_psclm_detail_de', 0).subscribe(res => {
            this.typeOfSvcData = res;
        });
    };

    getModsValue() {
        this.profsvcClaimDetailService.getProfsvcModsValue().subscribe((profsvcClaimModValue: ProfsvcClaimModsValue[]) => {
            if (profsvcClaimModValue && profsvcClaimModValue.length > 0) {
                this.modsValue = profsvcClaimModValue;
            }
        });
    }

    mod1DropDownChanged = () => {
        this.mod1Status = true;
    };

    mod2DropDownChanged = () => {
        if (this.mod1Status === true) {
            this.mod2Status = true;
        }
    };

    mod3DropDownChanged = () => {
        if (this.mod1Status === true && this.mod2Status === true) {
            this.mod3Status = true;
        }
    };

    deletePopup = () => {
        let popUpMessage = new PopUpMessage(
            'Claim Detail Auth Proc Rules',
            'Claim Detail Auth Proc Rules',
            '29070: Press yes to delete this record',
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
                if (this.instClaimDetailForm.get('claimNumber').value) {
                    this.instClaimDetailService.deleteInstClaimDetail(this.subLineCode, this.lineNumber ,this.seqClaimId).subscribe(response => {
                        for (let i = 0; i < this.instClaimDetails.length; i++) {
                            if (this.instClaimDetails[i].instClaimDetailPrimaryKey.seqClaimId == this.seqClaimId &&
                                this.instClaimDetails[i].instClaimDetailPrimaryKey.lineNumber === this.lineNumber &&
                                this.instClaimDetails[i].instClaimDetailPrimaryKey.subLineCode === this.subLineCode
                            ) {
                                this.instClaimDetails.splice(i, 1);
                                break;
                            }
                        }
                        this.dataGridgridApi.api.setRowData(this.instClaimDetails);
                        if (this.instClaimDetails && this.instClaimDetails.length > 0) {
                            this.dataGridgridApi.api.selectIndex(0, false, false);
                        }
                        this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                    });
                } else {

                }
            }
        }, (error: any) => {
            this.showErrorPopUp(error, 'Institutional Claims')
        });
    };

    showErrorPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }
}
