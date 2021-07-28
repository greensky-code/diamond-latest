/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';

import {UntilDestroy} from '@ngneat/until-destroy';
import {Menu, SearchModel} from '../../../shared/models/models';
import {MessageType} from '../../../shared/components/pop-up-message';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {HelpComponent} from '../../member/help/help.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';

import {DddwDtlService, MessageMasterDtlService, ProcedureCodeMasterService, ProfsvcClaimHeaderService, SecUserService} from '../../../api-services';
import {SecWin, MessageMasterDtl} from '../../../api-models';
import {MemberMaster, ProfsvcClaimHeader, SecUser} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {INST_CLAIM_DETAIL_MODULE_ID} from '../../../shared/app-constants';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {ProfsvcClaimDetail} from "../../../api-models/claims/profsvc-claim-detail.model";
import {ProfsvcClaimDetailService} from "../../../api-services/claims/profsvc-claim-detail.service";
import {RequiredValidator} from "../../../shared/validators/required.validator";
import {LookupService} from "../../../shared/services/lookup.service";
import {
    getProfessionalClaimServicesShortcutKeys, getProfessionalServicesDetailComponentShortcutKeys,
    getProfSvcClaimDetailComponentShortcutKeys
} from "../../../shared/services/shared.service";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import { ProfsvcClaimModsValue } from '../../../api-models/claims/ProfsvcClaimModsValue';
import {ProfessionalServicesClaimsOtherComponent} from '../professional-services-claims-other/professional-services-claims-other.component';
import {ReasonComponent} from '../../support/reason/reason.component';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProfessionalClaimServicesLookup} from '../../../shared/lookup/professional-claim-services-lookup';
import { GeneralLedgerAssignService } from '../../../api-services/support/general-ledger-assign.service';
import { AddonClaimsControllerComponent } from '../../addon/addon-claims-controller/addon-claims-controller.component';
import {ChooseClaimPaymentMethodComponent} from "../../addon/choose-claim-payment-method/choose-claim-payment-method.component";
import {ProfessionalServicesClaimsComponent} from "../professional-services-claims/professional-services-claims.component";

// Use the Component directive to define the InstitutionalClaimDetailComponent as an Angular component
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

    selector: 'professional-services-claims-detail',
    templateUrl: './professional-services-claims-detail.component.html',
    providers: [CurrencyPipe, DecimalPipe, ProcedureCodeMasterService ]
})
export class ProfessionalServicesClaimsDetailComponent implements OnInit, AfterViewInit, AfterViewChecked {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() claimNumber?: string;
    @Input() showIcon: boolean;
    @Input() winId: string;
    @Input() memberMaster: MemberMaster;
    profSvcClaimDetailForm: FormGroup;
    memberUtilizationDisplayForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secWin: SecWinViewModel;
    windowId = INST_CLAIM_DETAIL_MODULE_ID;
    tableName = "PROFSVC_CLAIM_DETAIL";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = INST_CLAIM_DETAIL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    modsValue = new Array<ProfsvcClaimModsValue>();
    menu: Menu[] = [];
    shortName: any = "";
    isFieldDisabled = true;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('procCode') public procCode: ElementRef;
    @ViewChild('dxPtrField') public dxPtrField: ElementRef;
    isChildModalOpen: boolean;

    searchModel = new SearchModel(
        'instclaimheaders/lookup',
        ProfessionalClaimServicesLookup.PROFESSIONAL_CLAIM_SERVICES_ALL,
        ProfessionalClaimServicesLookup.PROFESSIONAL_CLAIM_SERVICES_DEFAULT,
        [],
        false
    );

    openClaimLookup() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
        });
    }

    openProcedureCodeLookup() {
        this.lookupService.openProcedureCodeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    procedureCode: response.procedureCode
                });
            }
        });
    }

    openProcedureCodeAltLookup() {
        this.lookupService.openProcedureCodeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    alternateProcedureCode: response.procedureCode
                });
            }
        });
    }

    openCompanyCodeLookup() {
        this.lookupService.openCompanyCodeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    companyCode: response.companyCode
                });
            }
        });
    }

    openGeneralLedgerReferenceLookup() {
        this.lookupService.openGeneralLedgerReferenceModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    glReference: response.generalLedgerReferencePrimaryKey.glRefCode
                });
            }
        });
    }

    openOcPaidReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    ocPaidRsn: response.reasonCode
                });
            }
        }, 'OC');
    }

    openAllowedReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    allowedRsn: response.reasonCode
                });
            }
        }, 'AL');
    }

    openNotCovReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    notCoveredRsn: response.reasonCode
                });
            }
        }, 'NC');
    }

    openCopayReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    copayRsn: response.reasonCode
                });
            }
        }, 'CP');
    }

    openCoInsReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    coinsuranceRsn: response.reasonCode
                });
            }
        }, 'CP');
    }

    openDeductReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    deductRsn: response.reasonCode
                });
            }
        }, 'DD');
    }

    openAdjustReasonLookup() {
        this.lookupService.openReasonByTypeModal((response: any) => {
            if (response) {
                this.profSvcClaimDetailForm.patchValue({
                    adjustRsn: response.reasonCode
                });
            }
        }, 'AD');
    }

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    claimStatusData: any[];
    procStatusData : any[];
    typeOfSvcData: any[];
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private decimalPipe: DecimalPipe,
        private currencyPipe: CurrencyPipe,
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
        private dddwDtlService: DddwDtlService,
        private toastr: ToastService,
        private lookupService: LookupService,
        private generalLedgerAssignService: GeneralLedgerAssignService,
        private procedureCodeMasterService: ProcedureCodeMasterService,
        private messageService: MessageMasterDtlService) {
    }
    ngAfterViewChecked(): void {
        this.cdr.detectChanges();
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.shortcuts.push(...getProfessionalServicesDetailComponentShortcutKeys(this));
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.profSvcClaimDetailForm);
        this.createDataGrid();
        this.menuInit();
        this.claimStatus();
        this.procStatus();
        this.typeOfSvc()
        if (this.claimNumber) {
            this.profSvcClaimDetailForm.patchValue({'claimNumber': this.claimNumber});
            this.profSvcClaimDetailForm.controls["claimNumber"].disable({
                emitEvent: false,
              });
            this.getProfSvcClaimHeader();
        }
    }


    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        this.getModsValue();
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
     * open f11 screen
     */
    public getChooseClaimPaymentMethodScreen = () => {
        if (this.profsvcClaimHeader) {
            const ref = this.modalService.open(
                ChooseClaimPaymentMethodComponent, {
                    size: <any>'xl', ...NGBModalOptions,
                    windowClass: 'dashboard-modal',
                });
            ref.componentInstance.instClaimHeader = this.profsvcClaimHeader;
            ref.componentInstance.onFormSubmit.subscribe(resp => {
                if (resp.paymentMethod === 'P') {
                    this.profsvcClaimHeader.payDependent = resp.paymentMethod;
                    return;
                }
                this.profsvcClaimHeader.paySubscriber = resp.paymentMethod;
            });
        }
    }

    getModsValue() {
        this.profsvcClaimDetailService.getProfsvcModsValue().subscribe((profsvcClaimModValue: ProfsvcClaimModsValue[]) => {
            if (profsvcClaimModValue && profsvcClaimModValue.length > 0) {
               this.modsValue = profsvcClaimModValue;
            }
        });
    }


    ngAfterViewInit(): void {
        this.shortcuts.push(...getProfSvcClaimDetailComponentShortcutKeys(this));
    }

    getClaimTab() {
        this.getProfSvcClaimDetail();
    }

    getProfSvcClaimDetail() {
        this.profsvcClaimDetailService.findProfsvcClaimDetailBySeqClaimId(this.profsvcClaimHeader.seqClaimId).subscribe((profsvcClaimDetails: ProfsvcClaimDetail[]) => {
            this.profsvcClaimDetails = profsvcClaimDetails;
            if (this.profsvcClaimDetails && this.profsvcClaimDetails.length > 0) {
                this.editProfSvcClaimDetail = true;
                this.dataGridGridOptions.api.setRowData(this.profsvcClaimDetails);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.profSvcClaimDetail = profsvcClaimDetails[0];
                this.setFormData();
            } else {
                
                this.addNewClaimDetails(false);
                 
            }
        });
    }

    getProfSvcClaimHeader() {
        this.profsvcClaimHeaderService.findByClaimNumber(this.claimNumber).subscribe((profsvcClaimHeader: ProfsvcClaimHeader) => {
            this.profsvcClaimHeader = profsvcClaimHeader;

            this.getProfSvcClaimDetail();
            this.setProfSvcHeaderToForm();
        });
    }


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


    editProfSvcClaimDetail = false;
    profSvcClaimDetail: ProfsvcClaimDetail;
    profsvcClaimDetails: ProfsvcClaimDetail[];
    profsvcClaimHeader: ProfsvcClaimHeader;
    profsvcClaimHeaders: ProfsvcClaimHeader[];

    createProfSvcClaimDetail() {
        this.formValidation.validateForm();
        if (this.profSvcClaimDetailForm.valid) {
            const profsvcClaimDetail = this.getFormData(new ProfsvcClaimDetail());
            this.profsvcClaimDetailService.createProfsvcClaimDetail(profsvcClaimDetail).subscribe(response => {
                this.profsvcClaimDetails.push(profsvcClaimDetail);
                this.dataGridGridOptions.api.setRowData(this.profsvcClaimDetails);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProfSvcClaimDetail = true;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getFormData(profsvcClaimDetail: ProfsvcClaimDetail): ProfsvcClaimDetail {

        profsvcClaimDetail.detailSvcDate = Form.getDatePickerValue(this.profSvcClaimDetailForm, 'detailServiceDate');
        profsvcClaimDetail.procedureCode = Form.getValue(this.profSvcClaimDetailForm, 'procedureCode');
        profsvcClaimDetail.quantity = Form.getValue(this.profSvcClaimDetailForm, 'quantity');
        profsvcClaimDetail.placeOfService = Form.getValue(this.profSvcClaimDetailForm, 'plcOfService');
        profsvcClaimDetail.dateLatestVisit = Form.getDatePickerValue(this.profSvcClaimDetailForm, 'detailThruDate');

        profsvcClaimDetail.diagCodePointer1 = Form.getValue(this.profSvcClaimDetailForm, 'dxPtr');
        profsvcClaimDetail.diagCodePointer2 = Form.getValue(this.profSvcClaimDetailForm, 'dxPtr2');
        profsvcClaimDetail.diagCodePointer3 = Form.getValue(this.profSvcClaimDetailForm, 'dxPtr3');
        profsvcClaimDetail.diagCodePointer4 = Form.getValue(this.profSvcClaimDetailForm, 'dxPtr4');
        profsvcClaimDetail.billedAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'billedAmount');
        profsvcClaimDetail.hcpcsModifier1 = Form.getValue(this.profSvcClaimDetailForm, 'procedureMod1');
        profsvcClaimDetail.hcpcsModifier2 = Form.getValue(this.profSvcClaimDetailForm, 'procedureMod2');
        profsvcClaimDetail.hcpcsModifier3 = Form.getValue(this.profSvcClaimDetailForm, 'procedureMod3');
        profsvcClaimDetail.hcpcsModifier4 = Form.getValue(this.profSvcClaimDetailForm, 'procedureMod4');
        profsvcClaimDetail.ocAllowedAmt = Form.getValue(this.profSvcClaimDetailForm, 'ocAllowed');
        profsvcClaimDetail.typeOfService = Form.getValue(this.profSvcClaimDetailForm, 'typeOfSvc');
        profsvcClaimDetail.claimStatus = Form.getValue(this.profSvcClaimDetailForm, 'claimStatus');
        profsvcClaimDetail.otherCarrierAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'ocPaid');
        profsvcClaimDetail.otherCarrierRsn = Form.getValue(this.profSvcClaimDetailForm, 'ocPaidRsn');
        profsvcClaimDetail.processingStatus = Form.getValue(this.profSvcClaimDetailForm, 'processStatus');
        profsvcClaimDetail.allowedAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'allowed');
        profsvcClaimDetail.allowedReason = Form.getValue(this.profSvcClaimDetailForm, 'allowedRsn');
        profsvcClaimDetail.companyCode = Form.getValue(this.profSvcClaimDetailForm, 'companyCode');
        profsvcClaimDetail.notCoveredAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'totalNotCov');
        profsvcClaimDetail.notCoveredReason = Form.getValue(this.profSvcClaimDetailForm, 'notCoveredRsn');
        profsvcClaimDetail.glRefCode = Form.getValue(this.profSvcClaimDetailForm, 'glReference');
        profsvcClaimDetail.copayment1Amt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'totalCopay');
        profsvcClaimDetail.copay1Reason = Form.getValue(this.profSvcClaimDetailForm, 'copayRsn');
        profsvcClaimDetail.medDefCode = Form.getValue(this.profSvcClaimDetailForm, 'medicalDefCode');
        profsvcClaimDetail.copayment2Amt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'totalCoins');
        profsvcClaimDetail.copay2Reason = Form.getValue(this.profSvcClaimDetailForm, 'coinsuranceRsn');
        profsvcClaimDetail.adjudicationMethod = Form.getValue(this.profSvcClaimDetailForm, 'adjudMethod');
        profsvcClaimDetail.deductibleAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'totalDeduct');
        profsvcClaimDetail.deductibleReason = Form.getValue(this.profSvcClaimDetailForm, 'deductRsn');
        profsvcClaimDetail.postDate = Form.getDatePickerValue(this.profSvcClaimDetailForm, 'postDate');
        profsvcClaimDetail.withholdAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'witholdAmt');
        profsvcClaimDetail.adjustmentReason = Form.getValue(this.profSvcClaimDetailForm, 'adjustRsn');
        profsvcClaimDetail.auditStatus = Form.getValue(this.profSvcClaimDetailForm, 'auditStatus');
        profsvcClaimDetail.cobPatLiabCvrgAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'cobPatliab');
        profsvcClaimDetail.withholdSurplus = Form.getDecimalValue(this.profSvcClaimDetailForm, 'withholdSurplus');
        profsvcClaimDetail.paidNetAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'paidNetAmt');
        profsvcClaimDetail.netAmt = Form.getDecimalValue(this.profSvcClaimDetailForm, 'netAmount');

        profsvcClaimDetail.adminFeeExists = Form.getValue(this.profSvcClaimDetailForm, 'adminFee') ? 'Y' : 'N';
        profsvcClaimDetail.ocAllowedAmt = Form.getValue(this.profSvcClaimDetailForm, 'ocPdSurplus');
        //   profsvcClaimDetail.holdReason1 = Form.getValue(this.profSvcClaimDetailForm, 'holds');
        profsvcClaimDetail.seqProvId = this.profsvcClaimHeader.seqProvId;
        profsvcClaimDetail.seqMembId = this.profsvcClaimHeader.seqMembId;
        profsvcClaimDetail.profsvcClaimDetailPrimaryKey.seqClaimId = this.profsvcClaimHeader.seqClaimId;
        return profsvcClaimDetail;
    }

    updateProfSvcClaimDetail() {
        this.formValidation.validateForm();
        if (this.profSvcClaimDetailForm.valid) {
            const profsvcClaimDetail = this.getFormData(this.profSvcClaimDetail);
            this.profsvcClaimDetailService.updateProfsvcClaimDetail(profsvcClaimDetail,
                profsvcClaimDetail.profsvcClaimDetailPrimaryKey.subLineCode, profsvcClaimDetail.profsvcClaimDetailPrimaryKey.lineNumber,
                profsvcClaimDetail.profsvcClaimDetailPrimaryKey.seqClaimId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editProfSvcClaimDetail = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveProfSvcClaimDetail() {
        if (this.editProfSvcClaimDetail) {
            this.updateProfSvcClaimDetail()
        } else {
            this.createProfSvcClaimDetail();
        }
    }


    setFormData() {
        console.log('pointer'+ this.profSvcClaimDetail.diagCodePointer1);
        this.profSvcClaimDetailForm.patchValue({
            'detailServiceDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profSvcClaimDetail.detailSvcDate),
            'procedureCode': this.profSvcClaimDetail.procedureCode,
            'quantity': Form.getNumber1DecimalGridDisplay(this.profSvcClaimDetail.quantity),
            'detailThruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profSvcClaimDetail.dateLatestVisit),
            'dxPtr': this.profSvcClaimDetail.diagCodePointer1?this.profSvcClaimDetail.diagCodePointer1:'1',
            'billedAmount': this.profSvcClaimDetail.billedAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe,this.getDecimalValue(this.profSvcClaimDetail.billedAmt.toString())),
            'procedureMod1': this.profSvcClaimDetail.hcpcsModifier1,
            'procedureMod2': this.profSvcClaimDetail.hcpcsModifier2,
            'procedureMod3': this.profSvcClaimDetail.hcpcsModifier3,
            'procedureMod4': this.profSvcClaimDetail.hcpcsModifier4,
            'ocAllowed': this.profSvcClaimDetail.ocAllowedAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.ocAllowedAmt.toString())),
            'typeOfSvc': this.profSvcClaimDetail.typeOfService,
            'claimStatus': this.profSvcClaimDetail.claimStatus,
            'ocPaid': this.profSvcClaimDetail.otherCarrierAmt=== undefined? '' : Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.otherCarrierAmt.toString())), 
            'ocPaidRsn': this.profSvcClaimDetail.otherCarrierRsn,
            'processStatus': this.profSvcClaimDetail.processingStatus,
            'allowed': this.profSvcClaimDetail.allowedAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.allowedAmt.toString())),
            'allowedRsn': this.profSvcClaimDetail.allowedReason,
            'companyCode': this.profSvcClaimDetail.companyCode,
            'totalNotCov': this.profSvcClaimDetail.notCoveredAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.notCoveredAmt.toString())),
            'notCoveredRsn': this.profSvcClaimDetail.notCoveredReason,
            'glReference': this.profSvcClaimDetail.glRefCode,
            'totalCopay': this.profSvcClaimDetail.copayment1Amt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.copayment1Amt.toString())),
            'copayRsn': this.profSvcClaimDetail.copay1Reason,
            'medicalDefCode': this.profSvcClaimDetail.medDefCode,
            'totalCoins': this.profSvcClaimDetail.copayment2Amt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.copayment2Amt.toString())),
            'coinsuranceRsn': this.profSvcClaimDetail.copay2Reason,
            'adjudMethod': this.profSvcClaimDetail.adjudicationMethod,
            'totalDeduct': this.profSvcClaimDetail.deductibleAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.deductibleAmt.toString())),
            'deductRsn': this.profSvcClaimDetail.deductibleReason,
            'postDate':  Form.getDateInputDisplay(this.dateFormatPipe,  this.profSvcClaimDetail.postDate), 
            'witholdAmt': this.profSvcClaimDetail.withholdAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.withholdAmt.toString())),
            'adjustRsn': this.profSvcClaimDetail.adjustmentReason,
            'auditStatus': this.profSvcClaimDetail.auditStatus,
            'cobPatliab': this.profSvcClaimDetail.cobPatLiabCvrgAmt=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.cobPatLiabCvrgAmt.toString())),
            'withholdSurplus': this.profSvcClaimDetail.withholdSurplus=== undefined? '' :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.withholdSurplus.toString())),
            'paidNetAmt':this.profSvcClaimDetail.paidNetAmt=== undefined? Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue('')) :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.paidNetAmt.toString())),
            'netAmount': this.profSvcClaimDetail.netAmt=== undefined? Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue('')) :Form.getCurrencyInputDisplay(this.currencyPipe, this.getDecimalValue(this.profSvcClaimDetail.netAmt.toString())),
            'dxPtr2': this.profSvcClaimDetail.diagCodePointer2,
            'dxPtr3': this.profSvcClaimDetail.diagCodePointer3,
            'dxPtr4': this.profSvcClaimDetail.diagCodePointer4,
            'adminFee': this.profSvcClaimDetail.adminFeeExists ? true : false,
            'ocPdSurplus': this.profSvcClaimDetail.ocAllowedAmt,
            'holds': this.profSvcClaimDetail.holdReason1 ? true : false,
        });
        this.profSvcClaimDetailForm.controls['ocAllowed'].disable();
        console.log(this.profSvcClaimDetailForm.get('billedAmount').value);
    }
    getDecimalValue(otherCarrierAmt: string): any {
        if(otherCarrierAmt.indexOf('.')>-1) {
        } else  {
            if(otherCarrierAmt=='' || otherCarrierAmt.length==0)
            otherCarrierAmt='0';
            otherCarrierAmt = otherCarrierAmt + '.00';
        }
        return otherCarrierAmt;
    }

    setProfSvcHeaderToForm() {
        this.profSvcClaimDetailForm.patchValue({
            'claimNumber': this.profsvcClaimHeader.claimNumber,
            'entered': this.profsvcClaimHeader.insertDatetime,
            'providerId': this.profsvcClaimHeader.seqProvId,
            'provName': this.profsvcClaimHeader.provMaster ? this.profsvcClaimHeader.provMaster.shortName : '',
            'specialty': this.profsvcClaimHeader.providerSpec,
            'pcpId': this.profsvcClaimHeader.pcpIpaId,
            'primaryDate': this.dateFormatPipe.defaultDisplayDateFormat(this.profsvcClaimHeader.primarySvcDate),
            'serviceReason': this.profsvcClaimHeader.serviceReason1,
            'dateOfService': this.profsvcClaimHeader.primarySvcDate,
            'billedAmount': this.profsvcClaimHeader.totalBilledAmt,
			'plcOfService': this.profsvcClaimHeader.placeOfService1,
            'detailThruDate': this.profsvcClaimHeader.claimThruDate,
        });
    }

    getProfSvcClaimHeaderData(profsvcClaimHeader: ProfsvcClaimHeader): ProfsvcClaimHeader {
        profsvcClaimHeader.claimNumber = this.profSvcClaimDetailForm.value.claimNumber;
        profsvcClaimHeader.seqProvId = this.profSvcClaimDetailForm.value.providerId;
        profsvcClaimHeader.providerSpec = this.profSvcClaimDetailForm.value.specialty;
        profsvcClaimHeader.pcpIpaId = this.profSvcClaimDetailForm.value.pcpId;
        profsvcClaimHeader.primarySvcDate = this.profSvcClaimDetailForm.value.primaryDate;
        profsvcClaimHeader.serviceReason1 = this.profSvcClaimDetailForm.value.serviceReason;
        profsvcClaimHeader.totalBilledAmt = this.profSvcClaimDetailForm.value.billedAmount;
        profsvcClaimHeader.claimThruDate = this.profSvcClaimDetailForm.value.dateOfService;
        return profsvcClaimHeader;
    }


    updateProfSvcClaimHeader() {
        this.formValidation.validateForm();
        if (this.profSvcClaimDetailForm.valid) {
            const profsvcClaimHeader = this.getProfSvcClaimHeaderData(this.profsvcClaimHeader);
            this.profsvcClaimHeaderService.updateProfsvcClaimHeader(profsvcClaimHeader, profsvcClaimHeader.seqClaimId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editProfSvcClaimDetail = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveProfSvcClaimHeader() {
        let popUpMessage = new PopUpMessage(
            'Professional Services Claims Detail',
            'Professional Services Claims Detail',
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
        ref.componentInstance.buttonclickEvent.subscribe((response: any) => {
            if (response.name === 'Yes') {
                // save only if user presses Yes from Model
                this.saveChanges();
            } else if (response.name === 'No') {
                this.router.navigateByUrl('/');
            } // 3rd case: In case of cancel do nothing
        });
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (this.securityService.checkInsertUpdatePermissions(this.editProfSvcClaimDetail, this.secWin)) {
            // TODO: update to save properly with profSvcClaimDetail and not profSvcClaimHeader
            this.updateProfSvcClaimHeader();
        }
    }


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;

    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Line",
                field: "profsvcClaimDetailPrimaryKey.lineNumber",
                width: 100
            },
            {
                headerName: "Svc Date",
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
                headerName: "Mod Qty",
                field: "quantity",
                width: 150,
                valueFormatter: Form.getNumber1DecimalGridDisplay
            },
            {
                headerName: "Billed Amt",
                field: "billedAmt",
                width: 125,
                valueFormatter: Form.getCurrencyGridDisplay
            },
            {
                headerName: "Allowed Amt",
                field: "allowedAmt",
                width: 140,
                valueFormatter: Form.getCurrencyGridDisplay
            },
            {
                headerName: "Net Amt",
                field: "netAmt",
                width: 125,
                valueFormatter: Form.getCurrencyGridDisplay
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
            },
            {
                headerName: "Adt Sts",
                field: "auditStatus",
                width: 100
            },
        ];
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
            .subscribe((response: SecColDetail[]) => {
                this.secColDetails = response;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(response)); // make copy of array for changes detection in directive
            });
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.profSvcClaimDetailForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: []}],
            detailServiceDate: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            procedureCode: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            quantity: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            plcOfService: ['', {updateOn: 'blur', validators: []}],
            detailThruDate: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            dxPtr: ['', {updateOn: 'blur', validators: []}],
            dxPtr2: ['', {updateOn: 'blur', validators: []}],
            dxPtr3: ['', {updateOn: 'blur', validators: []}],
            dxPtr4: ['', {updateOn: 'blur', validators: []}],
            billedAmount: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            procedureMod1: ['', {updateOn: 'blur', validators: []}],
            procedureMod2: ['', {updateOn: 'blur', validators: []}],
            procedureMod3: ['', {updateOn: 'blur', validators: []}],
            procedureMod4: ['', {updateOn: 'blur', validators: []}],
            typeOfSvc: ['', {updateOn: 'blur', validators: []}],
            ocAllowed: ['', {updateOn: 'blur', validators: []}],
            addBackAmount: ['', {updateOn: 'blur', validators: []}],
            claimStatus: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            ocPaid: ['', {updateOn: 'blur', validators: []}],
            ocPaidRsn: ['', {updateOn: 'blur', validators: []}],
            processStatus: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            allowed: ['', {updateOn: 'blur', validators: []}],
            allowedRsn: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            totalNotCov: ['', {updateOn: 'blur', validators: []}],
            notCoveredRsn: ['', {updateOn: 'blur', validators: []}],
            glReference: ['', {
                updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            totalCopay: ['', {updateOn: 'blur', validators: []}],
            copayRsn: ['', {updateOn: 'blur', validators: []}],
            medicalDefCode: ['', {updateOn: 'blur', validators: []}],
            totalCoins: ['', {updateOn: 'blur', validators: []}],
            coinsuranceRsn: ['', {updateOn: 'blur', validators: []}],
            adjudMethod: ['', {updateOn: 'blur', validators: []}],
            totalDeduct: ['', {updateOn: 'blur', validators: []}],
            deductRsn: ['', {updateOn: 'blur', validators: []}],
            postDate: ['', {updateOn: 'blur', validators: []}],
            witholdAmt: ['', {updateOn: 'blur', validators: []}],
            adjustRsn: ['', {updateOn: 'blur', validators: []}],
            auditStatus: ['', {updateOn: 'blur', validators: []}],
            cobPatliab: ['', {updateOn: 'blur', validators: []}],
            withholdSurplus: ['', {updateOn: 'blur', validators: []}],
            paidNetAmt: ['', {updateOn: 'blur', validators: []}],
            netAmount: ['', {updateOn: 'blur', validators: []}],
            message: ['', {updateOn: 'blur', validators: []}],
            adminFee: ['', {updateOn: 'blur', validators: []}],
            ocPdSurplus: ['', {updateOn: 'blur', validators: []}],
            holds: ['', {updateOn: 'blur', validators: []}]
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
                    {name: "New", shortcutKey: 'Ctrl+M'},
                    {name: "Open", shortcutKey: 'Ctrl+O'},
                    {name: 'Delete', shortcutKey: 'Ctrl+D'},
                    {name: "Save", shortcutKey: 'Ctrl+S'},
                    {name: "Close", shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: "Main Menu...", shortcutKey: 'F2'},
                    {name: "Shortcut Menu...", shortcutKey: "F3"},
                    {isHorizontal: true},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit", shortcutKey: 'Alt+F4'},
                ],
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    {name: "Undo", shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", shortcutKey: 'Ctrl+x', disabled: true},
                    {name: "Copy", shortcutKey: 'Ctrl+C', disabled: true},
                    {name: "Paste", shortcutKey: 'Ctrl+V'},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'},
                    {name: "Lookup", shortcutKey: 'F5'},
                ],
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    {name: "Header File"},
                    {name: "Detail File"},
                    {name: "Patient Liabilities", disabled: true},
                    {name: "Other Claim Info"},
                    {name: "Hold Reasons"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Claim Lookup"},
                    {
                        name: "Pricing and Adjudication",
                        dropdownItems: [
                            {name: 'Price Detail Line'},
                            {name: 'Price Claim'},
                            {name: 'Adjudicate Detail Line'},
                            {name: 'Adjudicate Claim'},
                            {name: 'Price and Adjudicate Detail Line'},
                            {name: 'Price and Adjudicate Claim'}
                        ]
                    },
                    {name: "Allowed Factor"},
                    {name: "Payment Detail"},
                    {name: "Hidden Fields"},
                    {name: "Anesthesia Time"},
                    {name: "Original Procedure"},
                    {name: "Adjust Line"},
                    {name: 'Reverse Line'},
                    {name: "View IPA Info."},
                    {name: "Covering Provider Info"},
                    {name: "Claim Detail Indicators"},
                    {name: "Claim Audit"},
                    {name: "View IPA Info"},
                    {name: "Attach EOB/RA Remarks"},
                    {name: 'Print Flag Info'},
                    {name: 'View Claims with Auth Number'},
                    {name: 'NDC Codes'},
                    {name : 'Claim Interest/Penalty/Discount Info'},
                    {name: 'Reset Claim Indicator', shortcutKey: 'Ctrl+R'},
                    {name: 'Adjust Interest/Penalty/Discount Amount', disabled: true},
                    {name: 'Submitted Claim Detail Information'},
                    {name: 'Claim Audit Details', shortcutKey: 'Ctrl+P'},
                    {name: 'Measurement Information', shortcutKey: 'Ctrl+E'},
                    {name: 'Spinal Manipulation Information', shortcutKey: 'Ctrl+M'},
                    {name: 'Administrative Fee Info', shortcutKey: 'Ctrl+F'},
                    {name: 'View Claim Totals'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift+Alt+P'},
                    {name: 'Hold Reason Display', shortcutKey: 'Shift+Alt+H'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Professional Services Claims'}
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

    resetAll(editState: boolean = true, defaultData: any = {}) {
        this.alertMessage = this.alertMessageService.close();
        this.profSvcClaimDetailForm.reset(defaultData); 
    }
    addNewClaimDetails(editState: boolean = true, defaultData: any = {}) { 
        this.resetAll(false);  
        this.editProfSvcClaimDetail = false;
        this.profSvcClaimDetailForm.patchValue({
        'detailServiceDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.primarySvcDate),
        'quantity': Form.getNumber1DecimalInputDisplay(this.decimalPipe, 1),
        'detailThruDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.primarySvcDate),
        'plcOfService': this.profsvcClaimHeader.placeOfService1,
        'dxPtr': '1',
        });
        this.profSvcClaimDetail = this.getFormData(new ProfsvcClaimDetail());
        this.profSvcClaimDetail.profsvcClaimDetailPrimaryKey.lineNumber = this.profsvcClaimDetails?this.profsvcClaimDetails.length+1:1;
        if(this.profsvcClaimDetails==null || this.profsvcClaimDetails.length==0)
        {
            this.profsvcClaimDetails = [this.profSvcClaimDetail];
        } 
        else       
         this.profsvcClaimDetails.push(this.profSvcClaimDetail); 
        this.dataGridGridOptions.api.setRowData(this.profsvcClaimDetails); 
        this.dataGridGridOptions.api.selectIndex(this.profsvcClaimDetails.length-1, false, false);
        this.setFormData();
    }
    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.isSuperUser || this.secWin.hasInsertPermission()) {
                        this.addNewClaimDetails(false);  
                    } else {
                        this.toastService.showToast('Not permitted to insert', NgbToastType.Danger);
                    }
                    break;
                }
                case 'Open': {
                    this.resetAll(false);
                    break;
                }
                case 'Delete': {
                    this.deleteScreenOption();
                    break;
                }
                case 'Save': {
                    this.saveProfSvcClaimDetail();
                    break;
                }
                case 'Close': {
                    this.resetAll(false);
                    this.activeModal.close();
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
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
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

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Header File": {
                this.openProfSvcClaimHeader();
                break;
            }
            case "Detail File": {
                break;
            }
            case "Patient Liabilities": {
                this.toastService.showToast(
                    "Screen is in progress",
                    NgbToastType.Danger
                );

                break;
            }
            case "Other Claim Info": {
                this.isChildModalOpen = true;
                const ref = this.modalService.open(
                    ProfessionalServicesClaimsOtherComponent,
                    {
                        windowClass: "input-class",
                        size: "lg",
                        beforeDismiss: () => {
                            this.isChildModalOpen = false;
                            return true;
                        },
                    }
                );
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.claimNumber = this.profsvcClaimHeader.claimNumber;
                break;
            }
            case "Hold Reasons": {
                let ref = this.modalService.open(ReasonComponent, { size: "lg" });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                break;
            }
            default: {
                this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                break;
            }
        }
    }


    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {
            case "Claim Lookup": {
                this.openClaimLookup();
                break;
            }
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

    onRowSelected(event: any) {
        if (event.data) {
            this.profSvcClaimDetail = event.data;
            this.setFormData();
        } else {
            this.alertMessage = this.alertMessageService.error("No claim detail available.");
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

    focusIn(event: any, id : string) {
        console.log(event);
        let val = (this.profSvcClaimDetailForm.get(id).value);
        val = this.currencyPipe.transform(val);

        this.profSvcClaimDetailForm.get(id).setValue(val, {emitEvent: false});
    }

    blurOut(event: any, id: string) {
        console.log(event);
        let val = (this.profSvcClaimDetailForm.get(id).value);

        val = this.currencyPipe.transform(val);

        this.profSvcClaimDetailForm.get(id).setValue(val, {emitEvent: false});
    }

    deleteScreenOption = () => {
        let popUpMessage = new PopUpMessage(
            'Benefit Rule',
            'Benefit Rule',
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
                this.deleteProfessionalServiceClaimsDetails();
            }
        });
    };

    deleteProfessionalServiceClaimsDetails() {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        const seqClaimId = this.profSvcClaimDetail.profsvcClaimDetailPrimaryKey.seqClaimId;
        const lineNum = this.profSvcClaimDetail.profsvcClaimDetailPrimaryKey.lineNumber;
        if(seqClaimId) {
            this.profsvcClaimHeaderService.deleteProfsvcClaimHeader(seqClaimId).subscribe(response => {
                for(let i=0;i<this.profsvcClaimDetails.length;i++) {
                    if(this.profsvcClaimDetails[i].profsvcClaimDetailPrimaryKey.seqClaimId == seqClaimId &&
                        this.profsvcClaimDetails[i].profsvcClaimDetailPrimaryKey.lineNumber === lineNum
                    ) {
                        this.profsvcClaimDetails.splice(i,1);
                        break;
                    }
                }
                this.dataGridGridOptions.api.setRowData(this.profsvcClaimDetails);
                if (this.profsvcClaimDetails && this.profsvcClaimDetails.length > 0) {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                } else {
                    this.dataGridGridOptions.api.setRowData([]);
                }

                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    detailServiceTabKey(event: any) {
        this.procCode.nativeElement.focus();
    }

    public getProcedureCodeMaster(procedureCode: string) {
        this.procedureCodeMasterService.getProcedureCodeMaster(procedureCode)
            .subscribe((procCodeMaster) => {
                let toAge = 999.9;
                let fromAge = 0;
                let dob = new Date(this.memberMaster.dateOfBirth);
                let month = dob.getMonth();
                let day = dob.getDay();
                let year = dob.getFullYear();
                if (procCodeMaster.fromAge) {
                    fromAge = procCodeMaster.fromAge
                }
                if (procCodeMaster.toAge) {
                    toAge = procCodeMaster.toAge;
                }

                //
                let toYear = year + toAge;
                let fromYear = year + fromAge;
                let fromDate = new Date(fromYear + '-' + month + '-' + day);
                let toDate = new Date(toYear + '-' + month + '-' + day);
                let svcDate = new Date(Form.getDatePickerValue(this.profSvcClaimDetailForm, 'detailServiceDate'));
                if (svcDate < fromDate || svcDate >= toDate) {
                    this.messageService.findByMessageId(70349).subscribe((messages) => {
                        this.showPopUp(
                            '70349 : ' + messages[0].messageText,
                            'Professional Services Claims'
                        );
                    });
                }
            }, (error) => {
                this.messageService.findByMessageId(70349).subscribe((messages) => {
                    this.showPopUp(
                        '70349 : ' + messages[0].messageText,
                        'Professional Services Claims'
                    );
                });

                this.messageService.findByMessageId(7662).subscribe((messages) => {
                    this.showPopUp(
                        '7662 : ' + messages[0].messageText,
                        'Professional Services Claims'
                    );
                });
            });
    }

    getNonNullGeneralLedgerAssign() {
        this.generalLedgerAssignService.getNonNullGeneralLedgerAssign().
            subscribe((generalLedgerAssign) => {
                if (generalLedgerAssign && generalLedgerAssign.companyCode && generalLedgerAssign.glRefCode) {
                    return;
                }
                this.messageService.findByMessageId(70045).subscribe((messages) => {
                    this.showPopUp(
                        '70045 : ' + messages[0].messageText,
                        'Professional Services Claims'
                    );
                });
            }, error => {
                this.messageService.findByMessageId(70045).subscribe((messages) => {
                    this.showPopUp(
                        '70045 : ' + messages[0].messageText,
                        'Professional Services Claims'
                    );
                });
            });
    }

    openClaimsCurrencyConversionAddon()
    {
        if (this.profsvcClaimHeader) {
            const ref = this.modalService.open(AddonClaimsControllerComponent, { 
                size: <any>'xl',
                ...NGBModalOptions, windowClass: 'dashboard-modal'
            });
            ref.componentInstance.profsvcClaimHeader = this.profsvcClaimHeader;
            ref.componentInstance.subscriberId = this.profsvcClaimHeader.memberMaster.subscriberId;
            ref.componentInstance.seqMembId = this.profsvcClaimHeader.memberMaster.seqMembId;
            ref.componentInstance.seqSubsId = this.profsvcClaimHeader.memberMaster.seqSubsId;
            ref.componentInstance.personNumber = this.profsvcClaimHeader.memberMaster.personNumber;
            ref.componentInstance.memberName = this.profsvcClaimHeader.memberMaster.firstName + " " + this.profsvcClaimHeader.memberMaster.lastName;
        } else {
            this.messageService.findByMessageId(13062).subscribe((message: MessageMasterDtl[]) => {
                console.log("message", message);
                this.showPopUp('Select a claims first', 'Professional Services Claims');
            });
        }
    }

    openProfSvcClaimHeader() {
        this.isChildModalOpen = true;
        const ref = this.modalService.open(ProfessionalServicesClaimsComponent, {
            windowClass: "input-class",
            size: "xl",
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.claimNumber = this.profsvcClaimHeader.claimNumber;
        ref.componentInstance.memberMaster = this.memberMaster;
        this.activeModal.close();
    }
}
