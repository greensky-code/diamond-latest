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
import {MessageMasterDtl, ProfsvcClaimHeader} from '../../../api-models/index'
import {ProfsvcClaimHeaderService} from '../../../api-services/claims/profsvc-claim-header.service'
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

import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {MemberMaster, SecUser} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {CLAIMS_DISPLAY_MODULE_ID} from '../../../shared/app-constants';

import {getClaimDisplayComponentShortcutKeys} from '../../../shared/services/shared.service';

import {MemberUtilizationDisplayComponent} from '../member-utilization-display/member-utilization-display.component';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {ProfsvcClaimDetail} from '../../../api-models/claims/profsvc-claim-detail.model';
import {ProfsvcClaimDetailService} from '../../../api-services/claims/profsvc-claim-detail.service';
import {DentalClaimHeaderService} from "../../../api-services/claims/dental-claim-header.service";
import {InstClaimHeaderService} from "../../../api-services/inst-claim-header.service";
import { DatePipe } from '@angular/common';
import { DentalClaimHeader } from '../../../api-models/claims/dental-claim-header.model';
import { InstClaimHeader } from '../../../api-models/inst-claim-header.model';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the ClaimDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({checkProperties: true})
@Component({

    selector: 'claimdisplay',
    templateUrl: './claim-display.component.html',
    providers: [
        ProfsvcClaimHeaderService,
        MessageMasterDtlService,
        DatePipe
    ]
})
export class ClaimDisplayComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    claimDisplayForm: FormGroup;
    memberUtilizationDisplayForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secWin: SecWinViewModel;
    windowId = CLAIMS_DISPLAY_MODULE_ID;
    tableName = "PROFSVC_CLAIM_HEADER";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = CLAIMS_DISPLAY_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    rowSelection = 'single';

    menu: Menu[] = [];

    shortName: any = "";
    @Input() providerId: string;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;
    currentIndex: number = 1;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    editProfsvcClaimDetail: boolean;
    profsvcClaimDetail: ProfsvcClaimDetail;
    profsvcClaimDetails: ProfsvcClaimDetail[];
    editProfsvcClaimHeader: boolean;
    profsvcClaimHeader: ProfsvcClaimHeader;
    profsvcClaimHeaders: ProfsvcClaimHeader[];
    dentalsvcClaimHeader: DentalClaimHeader;
    dentalsvcClaimHeaders: DentalClaimHeader[];
    instsvcClaimHeader: InstClaimHeader;
    instsvcClaimHeaders: InstClaimHeader[];
    memberMaster: MemberMaster;

    createProfsvcClaimDetail() {
        this.formValidation.validateForm();
        if (this.claimDisplayForm.valid) {
            const profsvcClaimDetail = this.getFormData(new ProfsvcClaimDetail());
            this.profsvcClaimDetailService.createProfsvcClaimDetail(profsvcClaimDetail).subscribe(() => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProfsvcClaimDetail = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getFormData(profsvcClaimDetail: any): ProfsvcClaimDetail {
        profsvcClaimDetail.profsvcClaimDetailPrimaryKey = {
            lineNumber: Form.getValue(this.claimDisplayForm, 'memberNumber'),
            subLineCode: Form.getValue(this.claimDisplayForm, 'planCode')
        }
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

        profsvcClaimDetail.medDefCode = Form.getValue(this.claimDisplayForm, 'dxCode2');
        profsvcClaimDetail.ocAllowedAmt = Form.getValue(this.claimDisplayForm, 'ocAllowed');
        profsvcClaimDetail.quantity = Form.getValue(this.claimDisplayForm, 'quantity');
        profsvcClaimDetail.procedureCode = Form.getValue(this.claimDisplayForm, 'procedureCode');
        profsvcClaimDetail.altProcedureCode = Form.getValue(this.claimDisplayForm, 'altProcedureCode');
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
        return profsvcClaimDetail;
    }


    updateProfsvcClaimDetail() {
        this.formValidation.validateForm();
        if (this.claimDisplayForm.valid) {
            const profsvcClaimDetail = this.getFormData(new ProfsvcClaimDetail());

            this.profsvcClaimDetailService.updateProfsvcClaimDetail(profsvcClaimDetail,
                profsvcClaimDetail.profsvcClaimDetailPrimaryKey.subLineCode, profsvcClaimDetail.profsvcClaimDetailPrimaryKey.lineNumber, profsvcClaimDetail.profsvcClaimDetailPrimaryKey.seqClaimId).subscribe(() => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editProfsvcClaimDetail = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveProfsvcClaimDetail() {
        if (this.editProfsvcClaimDetail) {
            this.updateProfsvcClaimDetail()
        } else {
            this.createProfsvcClaimDetail();
        }
    }

    deleteProfsvcClaimDetail(subLineCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimDetailService.deleteProfsvcClaimDetail(subLineCode).subscribe(() => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProfsvcClaimDetail(subLineCode: string) {
        this.profsvcClaimDetailService.getProfsvcClaimDetail(subLineCode).subscribe((profsvcClaimDetail: any) => {
            this.setProfsvcClaimDetailToForm(profsvcClaimDetail);
        });
    }

    setProfsvcClaimDetailToForm(profsvcClaimDetail: any) {
        this.profsvcClaimDetail = profsvcClaimDetail;
        let proc2 = profsvcClaimDetail['HCPCS_MODIFIER_2'] ? profsvcClaimDetail['HCPCS_MODIFIER_2']:'';
        let proc3 = profsvcClaimDetail['HCPCS_MODIFIER_3'] ? profsvcClaimDetail['HCPCS_MODIFIER_3']:'';
        let proc4 = profsvcClaimDetail['HCPCS_MODIFIER_4'] ? profsvcClaimDetail['HCPCS_MODIFIER_4']:'';
        this.claimDisplayForm.patchValue({
            'ocAllowed': profsvcClaimDetail['OC_ALLOWED_AMT'] ? '$'+profsvcClaimDetail['OC_ALLOWED_AMT']+'.00':'$.00',
            'quantity': profsvcClaimDetail['QUANTITY'],
            'procedureCode': profsvcClaimDetail['PROCEDURE_CODE'],
            'altProcedureCode': profsvcClaimDetail['ALTERNATE_PROC_CODE'],
            'ocPaid': profsvcClaimDetail['OTHER_CARRIER_AMT']  ? '$'+profsvcClaimDetail['OTHER_CARRIER_AMT']+'.00':'$.00',
            'ocPaidRsn': profsvcClaimDetail['OTHER_CARRIER_RSN'],
            'procModifiers': proc2 + ' ' + proc3 + ' ' + proc4,
            'dateOfService': profsvcClaimDetail['PRIMARY_SVC_DATE'] ? this.datePipe.transform(profsvcClaimDetail['PRIMARY_SVC_DATE'], 'MM/dd/yyyy'):'',
            'allowed': profsvcClaimDetail['ALLOWED_AMT'] ? '$'+parseFloat(profsvcClaimDetail['ALLOWED_AMT']).toFixed(2):'$.00',
            'allowedRsn': profsvcClaimDetail['ALLOWED_REASON'],
            'billedAmount': profsvcClaimDetail['BILLED_AMT'] ? '$'+parseFloat(profsvcClaimDetail['BILLED_AMT']).toFixed(2):'$.00',
            'totalNotCov': profsvcClaimDetail['NOT_COVERED_AMT'] ? '$'+profsvcClaimDetail['NOT_COVERED_AMT']+'.00':'$.00',
            'notCoveredRsn': profsvcClaimDetail['NOT_COVERED_REASON'],
            'claimStatus': profsvcClaimDetail['CLAIM_STATUS'],
            'totalCopay': profsvcClaimDetail['COPAYMENT_1_AMT']  ? '$'+profsvcClaimDetail['COPAYMENT_1_AMT']+'.00':'$.00',
            'copayRsn': profsvcClaimDetail['COPAY_1_REASON'],
            'processStatus': profsvcClaimDetail['PROCESSING_STATUS'],
            'totalCoins': profsvcClaimDetail['COPAYMENT_2_AMT'] ? '$'+profsvcClaimDetail['COPAYMENT_2_AMT']+'.00':'$.00',
            'coinsuranceRsn': profsvcClaimDetail['INT_PEN_DSC_RSN'],
            'companyCode': profsvcClaimDetail['COMPANY_CODE'],
            'totalDeduct': profsvcClaimDetail['DEDUCTIBLE_AMT'] ? '$'+profsvcClaimDetail['DEDUCTIBLE_AMT']+'.00':'$.00',
            'deductRsn': profsvcClaimDetail['DEDUCTIBLE_REASON'],
            'glReference': profsvcClaimDetail['GL_REF_CODE'],
            'witholdAmt': profsvcClaimDetail['WITHHOLD_AMT'] ? '$'+profsvcClaimDetail['WITHHOLD_AMT']+'.00':'$.00',
            'adjustRsn': profsvcClaimDetail['ADJUSTMENT_REASON'],
            'cobPatliab': profsvcClaimDetail['COB_PAT_LIAB_CVRG_AMT'] ? '$'+profsvcClaimDetail['COB_PAT_LIAB_CVRG_AMT']+'.00':'$.00',
            'message': profsvcClaimDetail['SERVICE_REASON_1'] ? 'X':' ',
            'medicalDefCode': profsvcClaimDetail['MED_DEF_CODE'],
            'postDate': profsvcClaimDetail['POST_DATE']?this.datePipe.transform(profsvcClaimDetail['POST_DATE'], 'MM/dd/yyyy'):'',
            'netAmount': profsvcClaimDetail['NET_AMT'] ? '$'+parseFloat(profsvcClaimDetail['NET_AMT']).toFixed(2):'$.00',
            'holds': profsvcClaimDetail['INT_DSCNT_ADJ_REASON'] ? 'X':' ',
            'checkDate': profsvcClaimDetail['CHECK_DATE'] ? this.datePipe.transform(profsvcClaimDetail['CHECK_DATE'], 'MM/dd/yyyy'):'',
            'adjudMethod': profsvcClaimDetail['ADJUDICATION_METHOD'],
            'transactionId': profsvcClaimDetail['SEQ_AP_TRANS'],
            'printFlatStatus': profsvcClaimDetail['PRINT_FLAG_CHANGE_IND']==='A'?'Auto':profsvcClaimDetail['PRINT_FLAG_CHANGE_IND'],
            'printFlat': profsvcClaimDetail['PRINT_FLAG'] ? '0 - No EOB and No RA': profsvcClaimDetail['PRINT_FLAG'],
            'paidNetAmt': profsvcClaimDetail['PAID_NET_AMT'],
            'dcn': profsvcClaimDetail['DCN'],
            'adminFee': profsvcClaimDetail['ADMIN_FEE_EXISTS']
        });
    }

    setProfsvcClaimHeaderToForm(profsvcClaimHeader: any) {
        this.profsvcClaimHeader = profsvcClaimHeader;
        this.claimDisplayForm.patchValue({
            'claimNumber': profsvcClaimHeader['CLAIM_NUMBER'],
            'receivedd' : profsvcClaimHeader['DATE_RECEIVED']?this.datePipe.transform(profsvcClaimHeader['DATE_RECEIVED'], 'MM/dd/yyyy'):'',
            'entered': profsvcClaimHeader['INSERT_DATETIME']?this.datePipe.transform(profsvcClaimHeader['INSERT_DATETIME'], 'MM/dd/yyyy'):'',
            'providerId': profsvcClaimHeader['PROVIDER_ID_B'],
            'par': profsvcClaimHeader['PROVIDER_PAR_STAT'],
            'provName': profsvcClaimHeader['LAST_NAME_2'],
            'specialty': profsvcClaimHeader['PROVIDER_SPEC'],
            'pcpId': profsvcClaimHeader['SEQ_PCP_ID'],
            'city': profsvcClaimHeader['USER_DEFINED_1'],
            'primaryDate': profsvcClaimHeader['PRIMARY_SVC_DATE']?this.datePipe.transform(profsvcClaimHeader['PRIMARY_SVC_DATE'], 'MM/dd/yyyy'):'',
            'serviceReason': profsvcClaimHeader['SERVICE_REASON_1'],
            'pcpName': profsvcClaimHeader['PCP_SPEC'],
            'placeOfServ': profsvcClaimHeader['PLACE_OF_SERVICE_1'],
            'dxCode1': profsvcClaimHeader['DIAGNOSIS_1'],
            'authorization': profsvcClaimHeader['AUTH_NUMBER'],
            'paySub': profsvcClaimHeader['PAY_SUBSCRIBER'],
            'payDep': profsvcClaimHeader['PAY_DEPENDENT'],
            'planCode': profsvcClaimHeader['PLAN_CODE'],
            'dxCode2': profsvcClaimHeader['DIAGNOSIS_2']
        });
    }

    getProfsvcClaimDetails() {
        this.profsvcClaimDetailService.getProfsvcClaimDetails().subscribe((profsvcClaimDetails: any) => {
            this.profsvcClaimDetails = profsvcClaimDetails;
        });
    }

    createProfsvcClaimHeader() {
        this.formValidation.validateForm();
        if (this.claimDisplayForm.valid) {
            let profsvcClaimHeader = new ProfsvcClaimHeader();
            this.profsvcClaimHeaderService.createProfsvcClaimHeader(profsvcClaimHeader).subscribe(() => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProfsvcClaimHeader = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateProfsvcClaimHeader(seqClaimId: number) {
        this.formValidation.validateForm();
        if (this.claimDisplayForm.valid) {
            let profsvcClaimHeader = new ProfsvcClaimHeader();
            this.profsvcClaimHeaderService.updateProfsvcClaimHeader(this.profsvcClaimHeader, seqClaimId).subscribe(() => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editProfsvcClaimHeader = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveProfsvcClaimHeader() {
        let popUpMessage = new PopUpMessage(
            'Claims Display',
            'Claims Display',
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
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
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
                this.editProfsvcClaimHeader,
                this.secWin
            )
        ) {
            if (this.editProfsvcClaimHeader) {
                this.updateProfsvcClaimHeader(this.profsvcClaimHeader.seqClaimId);
            } else {
                if (this.profsvcClaimHeaders.length == 0) {
                    this.createProfsvcClaimHeader();
                } else {
                    this.alertMessage = this.alertMessageService.error("Only 1 credential per provider can be added.");
                }
            }
        }
    }

    deleteProfsvcClaimHeader(seqClaimId: number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimHeaderService.deleteProfsvcClaimHeader(seqClaimId).subscribe((response: any) => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProfsvcClaimHeader(seqClaimId: number) {
        this.profsvcClaimHeaderService.getProfsvcClaimHeader(seqClaimId).subscribe((profsvcClaimHeader: ProfsvcClaimHeader) => {
            this.profsvcClaimHeader = profsvcClaimHeader;
            this.claimDisplayForm.patchValue({});
        });
    }

    getProfsvcClaimHeaders() {
        this.profsvcClaimHeaderService.getProfsvcClaimHeaders().subscribe((profsvcClaimHeaders: ProfsvcClaimHeader[]) => {
            this.profsvcClaimHeaders = profsvcClaimHeaders;
        });
    }

    getsvcClaimHeadersByMemberUtilizationFormData(memberUtilizationDisplayFormData: any) {
        this.dataGridGridOptions.api.showLoadingOverlay();
        if (memberUtilizationDisplayFormData.claimType.dataVal === 'D') {
            if (memberUtilizationDisplayFormData.fromDateOfSvc) {
                let date = memberUtilizationDisplayFormData.fromDateOfSvc;
                let convertDate = this.convertDate(date);
                this.dentalClaimHeaderService.findByIdAndDate(this.memberMaster.seqMembId, convertDate).subscribe((dentalsvcClaimHeaders: DentalClaimHeader[]) => {
                    if (dentalsvcClaimHeaders) {
                        this.dentalsvcClaimHeaders = dentalsvcClaimHeaders.filter((dentalsvcClaimHeader: DentalClaimHeader) => {
                            return (dentalsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                && dentalsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                            )
                        });
                        this.dataGridGridOptions.api.setRowData(dentalsvcClaimHeaders);
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                        this.onGridSelectionChange(dentalsvcClaimHeaders[0]);
                    } else {
                        this.dataGridGridOptions.api.setRowData([]);
                        this.messageService.findByMessageId(7120).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp("7120: "+ message[0].messageText,"Claim Display");
                        });
                    }

                })
            } else {
                this.dentalClaimHeaderService.findById(this.memberMaster.seqMembId).subscribe((dentalsvcClaimHeaders: DentalClaimHeader[]) => {
                    if (dentalsvcClaimHeaders) {
                        this.dentalsvcClaimHeaders = dentalsvcClaimHeaders.filter(dentalsvcClaimHeader => {
                            return (dentalsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                && dentalsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                            )
                        });
                        this.dataGridGridOptions.api.setRowData(dentalsvcClaimHeaders);
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                        this.onGridSelectionChange(dentalsvcClaimHeaders[0]);
                    } else {
                        this.messageService.findByMessageId(7120).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp("7120: "+ message[0].messageText,"Claim Display");
                        });
                        this.dataGridGridOptions.api.setRowData([]);
                    }
                })
            }
        } else if(memberUtilizationDisplayFormData.claimType.dataVal === 'I') {
            if (memberUtilizationDisplayFormData.fromDateOfSvc) {
                let date = memberUtilizationDisplayFormData.fromDateOfSvc;
                let convertDate = this.convertDate(date);
                this.instClaimHeaderService.findByIdAndDate(this.memberMaster.seqMembId, convertDate).subscribe((instsvcClaimHeaders: InstClaimHeader[]) => {
                    if (instsvcClaimHeaders) {
                        this.instsvcClaimHeaders = instsvcClaimHeaders.filter(instsvcClaimHeader => {
                            return (instsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                && instsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                            )
                        });
                        this.dataGridGridOptions.api.setRowData(instsvcClaimHeaders);
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                        this.onGridSelectionChange(instsvcClaimHeaders[0]);
                    } else {
                        this.dataGridGridOptions.api.setRowData([]);
                        this.messageService.findByMessageId(7114).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp("7114: "+ message[0].messageText,"Claim Display");
                        });
                    }

                })
            } else {
                this.instClaimHeaderService.findById(this.memberMaster.seqMembId).subscribe((instsvcClaimHeaders: InstClaimHeader[]) => {
                    if (instsvcClaimHeaders) {
                        this.instsvcClaimHeaders = instsvcClaimHeaders.filter(instsvcClaimHeader => {
                            return (instsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                && instsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                            )
                        });
                        this.dataGridGridOptions.api.setRowData(instsvcClaimHeaders);
                        this.dataGridGridOptions.api.selectIndex(0, false, false);
                        this.onGridSelectionChange(instsvcClaimHeaders[0]);
                    } else {
                        this.dataGridGridOptions.api.setRowData([]);
                        this.messageService.findByMessageId(7114).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp("7114: "+ message[0].messageText,"Claim Display");
                        });
                    }
                })
            }
        } else {
                if (memberUtilizationDisplayFormData.fromDateOfSvc) {
                    let date = memberUtilizationDisplayFormData.fromDateOfSvc;
                    let convertDate = this.convertDate(date);
                    this.profsvcClaimHeaderService.findByIdAndDate(this.memberMaster.seqMembId, convertDate).subscribe((profsvcClaimHeaders: ProfsvcClaimHeader[]) => {
                        if (profsvcClaimHeaders) {
                            this.profsvcClaimHeaders = profsvcClaimHeaders.filter(profsvcClaimHeader => {
                                return (profsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                    && profsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                                )
                            });
                            this.dataGridGridOptions.api.setRowData(profsvcClaimHeaders);
                            this.dataGridGridOptions.api.selectIndex(0, false, false);
                            this.onGridSelectionChange(profsvcClaimHeaders[0]);
                        } else {
                            this.dataGridGridOptions.api.setRowData([]);
                            this.messageService.findByMessageId(7110).subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp("7110: "+ message[0].messageText,"Claim Display");
                            });
                        }

                    })
                } else {
                    this.profsvcClaimHeaderService.findById(this.memberMaster.seqMembId).subscribe((profsvcClaimHeaders: ProfsvcClaimHeader[]) => {
                        if (profsvcClaimHeaders) {
                            this.profsvcClaimHeaders = profsvcClaimHeaders.filter(profsvcClaimHeader => {
                                return (profsvcClaimHeader['SUBSCRIBER_ID'] === memberUtilizationDisplayFormData.subscriberId
                                    && profsvcClaimHeader['PERSON_NUMBER'] === memberUtilizationDisplayFormData.personNumber
                                )
                            });
                            this.dataGridGridOptions.api.setRowData(profsvcClaimHeaders);
                            this.dataGridGridOptions.api.selectIndex(0, false, false);
                            this.onGridSelectionChange(profsvcClaimHeaders[0]);
                        } else {
                            this.dataGridGridOptions.api.setRowData([]);
                            this.messageService.findByMessageId(7110).subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp("7110: "+ message[0].messageText,"Claim Display");
                            });
                        }
                    })
                }
            }
    }

    convertDate = (data: any) => {
        let p = data.split(/\D/g);
        return [p[2],p[1],p[0] ].join("-");
    };

    dataGridGridOptionsExportCsv() {
        var params = {};
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
                checkboxSelection: true,
                valueGetter: (data) => {
                    return data.data['PRIMARY_SVC_DATE'] ? this.datePipe.transform(data.data['PRIMARY_SVC_DATE'], 'MM/dd/yyyy'): "";
                }
            },
            {
                headerName: "Claim Number",
                field: "CLAIM_NUMBER",
                width: 200
            },
            {
                headerName: 'Line',
                field: 'LINE_NUMBER',
                width: 200
            },
            {
                headerName: "Provider",
                field: "LAST_NAME_2",
                width: 200
            },
            {
                headerName: "Procedure",
                field: "PROCEDURE_CODE",
                width: 200
            },
            {
                headerName: 'Description',
                field: 'SHORT_DESCRIPTION',
                width: 200
            },
            {
                headerName: "Billed Amount",
                field: "",
                width: 200,
                valueGetter: (data) => {
                    return data.data['BILLED_AMT'] ? '$' + parseFloat(data.data['BILLED_AMT']).toFixed(2) : ''
                }
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
        private profsvcClaimDetailService: ProfsvcClaimDetailService,
        private profsvcClaimHeaderService: ProfsvcClaimHeaderService,
        private dentalClaimHeaderService: DentalClaimHeaderService,
        private instClaimHeaderService: InstClaimHeaderService,
        private messageService: MessageMasterDtlService,
        private datePipe: DatePipe) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDisplayForm);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimDisplayComponentShortcutKeys(this));
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
        }, (error: any) => {
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
        this.createDataGrid();
        this.menuInit();
        this.modalMemberUtilizationDisplay()
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDisplayForm = this.formBuilder.group({
            memberNumber: ['', {updateOn: 'blur', validators: []}],
            personNumber: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            firstName: ['', {updateOn: 'blur', validators: []}],
            lastName: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            claimTypeDisplayed: ['', {updateOn: 'blur', validators: []}],
            dob: ['', {updateOn: 'blur', validators: []}],
            gender: ['', {updateOn: 'blur', validators: []}],
            claimNumber: ['', {updateOn: 'blur', validators: []}],
            receivedd: ['', {updateOn: 'blur', validators: []}],
            entered: ['', {updateOn: 'blur', validators: []}],
            providerId: ['', {updateOn: 'blur', validators: []}],
            par: ['', {updateOn: 'blur', validators: []}],
            provName: ['', {updateOn: 'blur', validators: []}],
            specialty: ['', {updateOn: 'blur', validators: []}],
            pcpId: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            primaryDate: ['', {updateOn: 'blur', validators: []}],
            serviceReason: ['', {updateOn: 'blur', validators: []}],
            pcpName: ['', {updateOn: 'blur', validators: []}],
            placeOfServ: ['', {updateOn: 'blur', validators: []}],
            dxCode1: ['', {updateOn: 'blur', validators: []}],
            authorization: ['', {updateOn: 'blur', validators: []}],
            paySub: ['', {updateOn: 'blur', validators: []}],
            payDep: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            dxCode2: ['', {updateOn: 'blur', validators: []}],
            ocAllowed: ['', {updateOn: 'blur', validators: []}],
            quantity: ['', {updateOn: 'blur', validators: []}],
            procedureCode: ['', {updateOn: 'blur', validators: []}],
            altProcedureCode: ['', {updateOn: 'blur', validators: []}],
            ocPaid: ['', {updateOn: 'blur', validators: []}],
            ocPaidRsn: ['', {updateOn: 'blur', validators: []}],
            dateOfService: ['', {updateOn: 'blur', validators: []}],
            allowed: ['', {updateOn: 'blur', validators: []}],
            allowedRsn: ['', {updateOn: 'blur', validators: []}],
            billedAmount: ['', {updateOn: 'blur', validators: []}],
            totalNotCov: ['', {updateOn: 'blur', validators: []}],
            notCoveredRsn: ['', {updateOn: 'blur', validators: []}],
            claimStatus: ['', {updateOn: 'blur', validators: []}],
            totalCopay: ['', {updateOn: 'blur', validators: []}],
            copayRsn: ['', {updateOn: 'blur', validators: []}],
            processStatus: ['', {updateOn: 'blur', validators: []}],
            totalCoins: ['', {updateOn: 'blur', validators: []}],
            coinsuranceRsn: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            totalDeduct: ['', {updateOn: 'blur', validators: []}],
            deductRsn: ['', {updateOn: 'blur', validators: []}],
            glReference: ['', {updateOn: 'blur', validators: []}],
            witholdAmt: ['', {updateOn: 'blur', validators: []}],
            adjustRsn: ['', {updateOn: 'blur', validators: []}],
            medicalDefCode: ['', {updateOn: 'blur', validators: []}],
            cobPatliab: ['', {updateOn: 'blur', validators: []}],
            message: ['', {updateOn: 'blur', validators: []}],
            postDate: ['', {updateOn: 'blur', validators: []}],
            netAmount: ['', {updateOn: 'blur', validators: []}],
            holds: ['', {updateOn: 'blur', validators: []}],
            checkDate: ['', {updateOn: 'blur', validators: []}],
            adjudMethod: ['', {updateOn: 'blur', validators: []}],
            transactionId: ['', {updateOn: 'blur', validators: []}],
            printFlatStatus: ['', {updateOn: 'blur', validators: []}],
            printFlat: ['', {updateOn: 'blur', validators: []}],
            paidNetAmt: ['', {updateOn: 'blur', validators: []}],
            dcn: ['', {updateOn: 'blur', validators: []}],
            adminFee: ['', {updateOn: 'blur', validators: []}],
            procModifiers: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    private getDataIfNotEmpty(data: any) {
        return data ? data : '';
    }

    private setMemberMasterToForm(memberMaster: any) {
        this.memberMaster = memberMaster;
        this.claimDisplayForm.patchValue({
            memberNumber: memberMaster.subscriberId,
            personNumber: memberMaster.subsPersonNumber,
            firstName: this.getDataIfNotEmpty(memberMaster.firstName),
            lastName:  this.getDataIfNotEmpty(memberMaster.lastName),
            dob: this.datePipe.transform(memberMaster.dateOfBirth, 'MM/dd/yyyy'),
            gender: memberMaster.gender
        });
    }

    private setMemberUtilizationDisplayFormDataToForm(memberUtilizationDisplayFormData: any) {
        this.claimDisplayForm.patchValue({
            claimTypeDisplayed: memberUtilizationDisplayFormData.claimType.displayVal
        });
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V',  disabled: true}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Patient Liabilities', shortcutKey: 'Alt+P', disabled: true},
                    {name: 'Other Claim Info'},
                    {name: 'UB92'},
                    {name: 'UB92 Other Carriers'},
                    {name: 'View IPA Info'},
                    {name: 'View Cap Fund Info'},
                    {name: 'View Claim Totals'},
                    {name: 'View Claims with Auth Number'},
                    {name: 'NDC Codes'},
                    {name: 'View Claim Interest/Penalty/Discount Info'},
                    {name: 'View Dental Information'},
                    {name: 'Claim Audit Details', shortcutKey: 'Ctrl+P'},
                    {name: 'View Administrative Fee Info', disabled: true}
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Claim Display'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    resetAll(editProfsvcClaimHeader: boolean = true) {
        this.alertMessage = this.alertMessageService.close();
        this.claimDisplayForm.reset();
        this.editProfsvcClaimHeader = editProfsvcClaimHeader;
        this.shortName = '';
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.secWin.hasInsertPermission()) {
                        this.createProfsvcClaimHeader();
                    } else {
                        this.toastService.showToast('Not permitted to insert', NgbToastType.Danger);
                    }
                    break;
                }
                case 'Open': {
                    this.resetAll(false);
                    break;
                }
                case 'Save': {
                    this.saveProfsvcClaimHeader();
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
        }  else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
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
        const modalRef = this.modalService.open(HelpComponent, {windowClass: "myCustomModalClass"});

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

    modalMemberUtilizationDisplay() {
        this.isChildModalOpen = true;
        const ref = this.modalService.open(MemberUtilizationDisplayComponent, {
            windowClass: 'input-class',
            size: 'md',
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.memberUtilizationDisplayForm = this.memberUtilizationDisplayForm;
        ref.result.then((response: any) => {
            if (response) {
                this.dataGridGridOptions.api.setRowData([]);
                this.claimDisplayForm.reset();
                this.memberUtilizationDisplayForm = response.memberUtilizationDisplayForm;
                this.setMemberUtilizationDisplayFormDataToForm(response.memberUtilizationDisplayFormData);
                this.setMemberMasterToForm(response.memberMaster);
                this.getsvcClaimHeadersByMemberUtilizationFormData(response.memberUtilizationDisplayFormData);
            }
        });
    }

    onGridSelectionChange(event: any) {
        let selectedRow = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRow.length > 0) {
            let checkedClaimHeader = selectedRow[0];
            this.onClaimHeaderSelected(checkedClaimHeader);
        }
    }

    onSelectionChange(event: any) {
        let selectedData = this.dataGridGridOptions.api.getSelectedRows();
        this.onClaimHeaderSelected(selectedData[0]);
    }

    onClaimHeaderSelected(event: any) {
        if (event) {
            this.setProfsvcClaimHeaderToForm(event);
            this.setProfsvcClaimDetailToForm(event);
            this.getClaimDetailReasons(event.CLAIM_NUMBER, event.LINE_NUMBER, event.SUB_LINE_CODE);
        } else {
            this.alertMessage = this.alertMessageService.close();
            this.alertMessage = this.alertMessageService.error("No claim detail available.");
        }
    }

    getClaimDetailReasons(seqClaimId: number, lineNumber: number, lineCode: number){
        this.profsvcClaimHeaderService.findPatientLiability(seqClaimId, lineNumber, lineCode).subscribe((response: any) => {
            let ls_copay_rsn:string = "";
            let ls_coins_rsn: string = "";
            let ls_notcov_rsn: string = "";
            let ls_deduct_rsn: string = "";
            let rsns: any[] = response;
            if(rsns) {
                for (let rsn of rsns) {
                    switch (rsn.RULE_TYPE) {
                        case "00":
                            ls_copay_rsn = rsn.LIABILITY_REASON;
                            break;
                        case "10":
                            ls_coins_rsn = rsn.LIABILITY_REASON;
                            break;
                        case ("20" || "60"):
                            ls_notcov_rsn = rsn.LIABILITY_REASON;
                            break;
                        case "30":
                            ls_deduct_rsn = rsn.LIABILITY_REASON;
                            break;
                    }
                }
                this.claimDisplayForm.get('copayRsn').setValue(ls_copay_rsn);
                this.claimDisplayForm.get('coinsuranceRsn').setValue(ls_coins_rsn);
                this.claimDisplayForm.get('deductRsn').setValue(ls_deduct_rsn);
                this.claimDisplayForm.get('notCoveredRsn').setValue(ls_notcov_rsn);
            }
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CLDSP_Claims_Display.htm'
    }

}
