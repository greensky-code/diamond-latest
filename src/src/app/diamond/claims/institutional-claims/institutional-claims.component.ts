/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {InstClaimHeader} from '../../../api-models/inst-claim-header.model';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {InstClaimHeaderService} from '../../../api-services/inst-claim-header.service';
import {Form} from '../../../shared/helpers/form.helper';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {INSTITUTIONAL_CLAIM_MODULE_ID} from '../../../shared/app-constants';
import {
    DddwDtlService,
    GroupMasterService,
    MessageMasterDtlService,
    ProvMasterService, ReasonCodeMasterService,
    SecUserService,
    SequenceService,
    SystemCodesService,
    VendorAddressService
} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {ClaimsBatchInitiationComponent} from '../claims-batch-initiation/claims-batch-initiation.component';
import {ClaimBatchInit, Menu, SearchModel} from '../../../shared/models/models';
import {InstClaimHeaderClaimNumberLookup} from '../../../shared/lookup/inst-claim-header-claim-number-lookup';
import {CountryService} from '../../../api-services/country.service';
import {VendorMaster} from '../../../api-models/vendor-master';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {VendorMasterLookup} from '../../../shared/lookup/vendor-master-lookup';
import {VendorMasterService} from '../../../api-services/vendor-master.service';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {CONSTANTS, getInstitutionalClaimShortcutKeys} from '../../../shared/services/shared.service';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {ProvAddressService} from '../../../api-services/prov-address.service';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_PARSTATUS} from '../../../shared/models/constants';
import {ProviderMasterLookup} from '../../../shared/lookup/provider-master-lookup';
import {ProvContractSpecialtyService} from '../../../api-services/prov-contract-specialty.service';
import {DiagnosisMasterLookup} from '../../../shared/lookup/diagnosis-master-lookup';
import {DiagnosisCodeMasterService} from '../../../api-services/diagnosis-code-master.service';
import {InstitutionalAuthNumberLookup} from '../../../shared/lookup/institutional-auth-number-lookup';
import {SearchService} from '../../../shared/services/search.service';
import {InstitutionalBillTypeLookup} from '../../../shared/lookup/institutional-bill-type-lookup';
import {InstitutionalPlaceOfServiceLookup} from '../../../shared/lookup/institutional-place-of-service-lookup';
import {InstitutionalServRsnLookup} from '../../../shared/lookup/institutional-serv-rsn-lookup';
import {IMySingleDateModel} from 'angular-mydatepicker';
import {MemberEligHistoryService} from '../../../api-services/member-elig-history.service';
import {GridOptions} from 'ag-grid-community';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {VendorMasterComponent} from '../../vendor/vendor-master/vendor-master.component';
import {AuthorizationMasterComponent} from '../../authorization/authorization-master/authorization-master.component';
import {AuthWaiveRulesComponent} from '../../authorization/auth-waive-rules/auth-waive-rules.component';
import {MemberCobVerificationInformationComponent} from '../../member/member-cob-verification-information/member-cob-verification-information.component';
import {ClaimHoldRulesComponent} from '../claim-hold-rules/claim-hold-rules.component';
import {MemberCobHistoryComponent} from '../../member/member-cob-history/member-cob-history.component';
import {ClaimDetailAuthProcRuleComponent} from '../claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component';
import {ClaimDisplayComponent} from '../claim-display/claim-display.component';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {ClaimEvaluationRuleComponent} from '../claim-evaluation-rule/claim-evaluation-rule.component';
import {ReasonComponent} from '../../support/reason/reason.component';
import {LookupComponent} from '../../../shared/components/lookup/lookup.component';
import {SpCallGrouperOnlService} from '../../../api-services/sp-call-grouper-onl.service';
import {SpCallGrouperOnlModel} from '../../../api-models/sp-call-grouper-onl.model';
import {DrgPricerFieldsViewComponent} from './drg-pricer-fields/drg-pricer-fields-view.component';
import {AuthWaiveSP} from '../../../api-models/auth-wave-sp.model';
import {AuthWaiveSPService} from '../../../api-services/auth-wave-sp.service';
import {InstClaimDetailService} from '../../../api-services/claims/inst-claim-detail.service';
import {InstitutionalClaimDetailComponent} from '../institutional-claim-detail/institutional-claim-detail.component';
import {SubmittedClaimProviderComponent} from '../submitted-claim-provider/submitted-claim-provider.component';
import {SubmittedClaimHeaderub92InformationComponent} from '../submitted-claim-header/ub92-information.component';
import { ClaimHoldReasonsComponent } from '../claims-hold-reasons/claims-hold-reasons.component';
import {ClaimsHelpComponent} from '../claims-help/claims-help.component';
import {AddonControllerComponent} from '../../addon/addon-controller/addon-controller.component';
import {ChooseClaimPaymentMethodComponent} from '../../addon/choose-claim-payment-method/choose-claim-payment-method.component';
import {ProfsvcClaimModsValue} from '../../../api-models/claims/ProfsvcClaimModsValue';
import { NotesComponent } from '../../../shared/components/notes/notes.component';
// Use the Component directive to define the InstitutionalClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'institutionalclaims',
    templateUrl: './institutional-claims.component.html',
    styleUrls: ['./institutional-claims.component.scss'],
    providers: [InstClaimHeaderService, CountryService, VendorMasterService, MemberMasterService, DddwDtlService,
        ProvAddressService, SystemCodesService, ProvMasterService, ProvContractSpecialtyService, DiagnosisCodeMasterService,
        SearchService, MemberEligHistoryService, GroupMasterService, SequenceService, SpCallGrouperOnlService, AuthWaiveSPService, InstClaimHeaderService, ]
})
export class InstitutionalClaimsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimNumber: string;
    institutionalClaimsForm: FormGroup;
    icModalForm: FormGroup;
    formValidation: FormValidation;
    icFormValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editInstClaimHeader = false;
    isShow = false;
    instClaimHeader: InstClaimHeader;
    instClaimHeaders: InstClaimHeader[];
    memberMasters: any[] = [];
    patientStatuses: any[] = [];
    addresses: any[] = [];
    vendorAddresses: any[] = [];
    medicalReleases: any[] = [];
    parStats: any[] = [];
    firstModalShow = true;
    notesModal = false;
    public menu: Menu[] = [];
    public seqSourceId: number = -1;
    memberMaster: any;
    memEligHistory: any;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    isClaimNumberGenerated: Boolean = false;
    vendorAddress: number;
    windowId = 'INCLM';
    userTemplateId: string;
    memberModuleId = INSTITUTIONAL_CLAIM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    shortcuts: ShortcutInput[] = [];
    isChildModalOpen: boolean;
    countries: any[] = [];
    @Input() showIcon = false;
    holdReasonTrue: Boolean = false;
    createNewDataStatus: Boolean = false;
    public dataGridGridOptions: GridOptions;
    @ViewChild('agGrid') agGrid: any;
    @ViewChild('paySubscriberTemplate') private paySubscriberTemplate: ElementRef;
    @ViewChild('releaseRec') releaseRecElf: ElementRef;
    @ViewChild('vendorAddElf') private vendorAddElf: ElementRef;
    @ViewChild('incrdFieldElf') incrdFieldElf: ElementRef;
    @ViewChild('eobIndElf') eobIndElf: ElementRef;
    @ViewChild('paperEobReqElf') paperEobReqElf: ElementRef;
    @ViewChild('provSignOnFileElf') provSignOnFileElf: ElementRef;
    @ViewChild('par') par: ElementRef;
    claimBatchInitData = new ClaimBatchInit();
    vendorValueStatus = false;
    paySubModalRef: NgbModalRef;
    payDependentModalRef: NgbModalRef;
    dischDateStatus = false;
    adminDateStatus = false;
    personNumberStatus = false;
    addrStatus = false;
    holdReasonTrue1 = true;
    statusClick = 1;
    vendorSearchModel = new SearchModel(
        'vendormasters/lookup',
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []);

    memberSearchModel = new SearchModel(
        'membermasters/lookup',
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );

    admProvSearchModel = new SearchModel(
        'provmasters/lookup2',
        ProviderMasterLookup.PROVIDER_MASTER_ALL,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT,
        [],
        true
    );

    diagnosisSearchModel = new SearchModel(
        'diagnosiscodemasters/lookup',
        DiagnosisMasterLookup.ALL,
        DiagnosisMasterLookup.DEFAULT,
        [],
        true
    );

    authNumberSearchMdel = new SearchModel(
        'instclaimheaders/lookup/authNumber',
        InstitutionalAuthNumberLookup.ALL,
        InstitutionalAuthNumberLookup.DEFAULT,
        [],
        true
    );

    claimNumberSearchMdel = new SearchModel(
        'instclaimheaders/lookup/claimNumber',
        InstClaimHeaderClaimNumberLookup.ALL,
        InstClaimHeaderClaimNumberLookup.DEFAULT,
        [],
        true
    );

    billTypeSearchMdel = new SearchModel(
        'billtypemasters/lookup',
        InstitutionalBillTypeLookup.ALL,
        InstitutionalBillTypeLookup.DEFAULT,
        [],
        true
    );

    posSearchMdel = new SearchModel(
        'placesofsvcmaster/lookup',
        InstitutionalPlaceOfServiceLookup.ALL,
        InstitutionalPlaceOfServiceLookup.DEFAULT,
        [],
        true
    );

    servRsnSearchMdel = new SearchModel(
        'reasoncodemasters/lookup/servRsn',
        InstitutionalServRsnLookup.ALL,
        InstitutionalServRsnLookup.DEFAULT,
        [],
        true
    );

    createDataGrid(): void {
        this.dataGridGridOptions = { paginationPageSize: 50 };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.rowData = [];
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Line',
                field: 'line',
                width: 100,
            },
            {
                headerName: 'Sub History',
                field: 'subHistory',
                width: 140         },
            {
                headerName: 'Rsn Code',
                field: 'rsnCode',
                width: 140         },
            {
                headerName: 'Description',
                field: 'description',
                width: 400         },
            {
                headerName: 'Date/Time',
                field: 'dateTime',
                width: 200         },
            {
                headerName: 'User ID',
                field: 'userId',
                width: 140
            },
            {
                headerName: 'Source Id',
                field: 'sourceId',
                width: 240
            },
            {
                headerName: 'Hold Rsn Seq',
                field: 'holdRsnSeq',
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private messageService: MessageMasterDtlService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private toastService: ToastService,
        private countryService: CountryService,
        private securityService: SecurityService,
        private dddwDtlService: DddwDtlService,
        private searchService: SearchService,
        private provMasterService: ProvMasterService,
        private systemCodesService: SystemCodesService,
        private provAddressService: ProvAddressService,
        private vendorAddressService: VendorAddressService,
        private vendorMasterService: VendorMasterService,
        private memberMasterService: MemberMasterService,
        private instClaimHeaderService: InstClaimHeaderService,
        private memberEligHistoryService: MemberEligHistoryService,
        private groupMasterService: GroupMasterService,
        private provContractSpecialtyService: ProvContractSpecialtyService,
        private diagnosisCodeMasterService: DiagnosisCodeMasterService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private sequenceService: SequenceService,
        private spCallGrouperOnlService: SpCallGrouperOnlService,
        private SPauthWaiveService: AuthWaiveSPService,
        private renderer: Renderer2,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private instClaimDetailService: InstClaimDetailService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getInstitutionalClaimShortcutKeys(this));
        this.cdr.detectChanges();
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
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createInstClaimHeader() {
        this.formValidation.validateForm();
        if (this.institutionalClaimsForm.valid) {
            const instClaimHeader = this.getFormData();
            this.instClaimHeaderService.createInstClaimHeader(instClaimHeader).subscribe(response => {
                /*this.alertMessage = this.alertMessageService.info('Record successfully created.');*/
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.editInstClaimHeader = true;
                this.isClaimNumberGenerated = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000)
                }
                this.popupClose = false;
                this.paySubModalRef.dismiss();
            }, error => {
                /*this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. ' +
                    'Please check your entry.');*/
                this.toastService.showToast('An Error occurred while creating new record. ' +
                    'Please check your entry.', NgbToastType.Danger);
            });

        } else {
            /*this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');*/
            this.toastService.showToast('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    getFormData() {
        let instClaimHeader = new InstClaimHeader();
        instClaimHeader.claimNumber = Form.getValue(this.institutionalClaimsForm, 'claimNumber');
        instClaimHeader.admissionDate = Form.getDatePickerValue(this.institutionalClaimsForm, 'firstAdmitted');
        instClaimHeader.primarySvcDate = Form.getDatePickerValue(this.institutionalClaimsForm, 'admDate');
        instClaimHeader.claimThruDate = Form.getDatePickerValue(this.institutionalClaimsForm, 'dischDate');
        instClaimHeader.dateReceived = Form.getDatePickerValue(this.institutionalClaimsForm, 'dateRecv');
        instClaimHeader.authNumber = Form.getValue(this.institutionalClaimsForm, 'authNo');
        instClaimHeader.billType = Form.getValue(this.institutionalClaimsForm, 'billType');
        instClaimHeader.conditionCode1 = Form.getValue(this.institutionalClaimsForm, 'continuation');
        instClaimHeader.conditionCode1 = (instClaimHeader.conditionCode1) ? 'Y' : 'N';
        instClaimHeader.patientControlNo = Form.getValue(this.institutionalClaimsForm, 'patCtrl');
        instClaimHeader.medicalRecordNo = Form.getValue(this.institutionalClaimsForm, 'medRec');
        instClaimHeader.patientStatus = Form.getValue(this.institutionalClaimsForm, 'patStatus');
        instClaimHeader.seqMcondId = Form.getValue(this.institutionalClaimsForm, 'diamondId');
        instClaimHeader.memberId = Form.getValue(this.institutionalClaimsForm, 'memberId');
        instClaimHeader.personNumber = Form.getValue(this.institutionalClaimsForm, 'personNumber');
        instClaimHeader.seqProvAddress = Form.getValue(this.institutionalClaimsForm, 'addr001');
        instClaimHeader.providerPostalCode = Form.getValue(this.institutionalClaimsForm, 'zip');
        instClaimHeader.seqVendAddress = Form.getValue(this.institutionalClaimsForm, 'addr002');
        instClaimHeader.seqAdmProvId = Form.getValue(this.institutionalClaimsForm, 'admProv');
        instClaimHeader.admProvType = Form.getValue(this.institutionalClaimsForm, 'admProvType');
        instClaimHeader.admProvSpec = Form.getValue(this.institutionalClaimsForm, 'admProvSpec');
        instClaimHeader.admProvIpaId = Form.getValue(this.institutionalClaimsForm, 'admProvIpaId');
        instClaimHeader.seqAttProvId = Form.getValue(this.institutionalClaimsForm, 'attProv');
        instClaimHeader.attProvType = Form.getValue(this.institutionalClaimsForm, 'attProvType');
        instClaimHeader.attProvSpec = Form.getValue(this.institutionalClaimsForm, 'attProvSpec');
        instClaimHeader.attProvIpaId = Form.getValue(this.institutionalClaimsForm, 'atProvIpaId');
        instClaimHeader.providerId = Form.getValue(this.institutionalClaimsForm, 'institution');
        instClaimHeader.vendorId = Form.getValue(this.institutionalClaimsForm, 'vendor');
        instClaimHeader.paySubscriber = Form.getValue(this.institutionalClaimsForm, 'payStub');
        instClaimHeader.medicalRelease = Form.getValue(this.institutionalClaimsForm, 'releaseRec');
        instClaimHeader.assignmentOfBenefits = Form.getValue(this.institutionalClaimsForm, 'assignBfts');
        instClaimHeader.assignmentOfBenefits = (instClaimHeader.assignmentOfBenefits) ? 'Y' : 'N';
        instClaimHeader.payDependent = Form.getValue(this.institutionalClaimsForm, 'payDep');
        instClaimHeader.providerParStat = Form.getValue(this.institutionalClaimsForm, 'par');
        instClaimHeader.placeOfService1 = Form.getValue(this.institutionalClaimsForm, 'plcOfSvc');
        instClaimHeader.drgCode = Form.getValue(this.institutionalClaimsForm, 'drg');
        instClaimHeader.serviceReason1 = Form.getValue(this.institutionalClaimsForm, 'servRsn');
        instClaimHeader.totalBilledAmt = Form.getValue(this.institutionalClaimsForm, 'totalBilled');
        instClaimHeader.explanationAttached = Form.getValue(this.institutionalClaimsForm, 'eobInd');
        instClaimHeader.explanationAttached = (instClaimHeader.explanationAttached) ? instClaimHeader.explanationAttached : 'N';
        instClaimHeader.securityCode = Form.getValue(this.institutionalClaimsForm, 'sec');
        instClaimHeader.batchNumber = Form.getValue(this.institutionalClaimsForm, 'batchNumber');
        instClaimHeader.paperEob = Form.getValue(this.institutionalClaimsForm, 'paperEobReq');
        instClaimHeader.paperEob = (instClaimHeader.paperEob) ? instClaimHeader.paperEob : 'N';
        instClaimHeader.privacyApplies = Form.getValue(this.institutionalClaimsForm, 'privacyApplies');
        instClaimHeader.privacyApplies = (instClaimHeader.privacyApplies) ? 'Y' : 'N';
        instClaimHeader.invalidDataInd = Form.getValue(this.institutionalClaimsForm, 'invalidData');
        instClaimHeader.invalidDataInd = (instClaimHeader.invalidDataInd) ? 'Y' : 'N';
        instClaimHeader.provSignOnFile = Form.getValue(this.institutionalClaimsForm, 'provSignOnFile');
        instClaimHeader.provSignOnFile = (instClaimHeader.provSignOnFile) ? 'Y' : 'N';
        instClaimHeader.userDefined1 = Form.getValue(this.institutionalClaimsForm, 'incrdCntry');
        instClaimHeader.userDefined2 = Form.getValue(this.institutionalClaimsForm, 'imageNo');
        instClaimHeader.diagnosis1 = Form.getValue(this.institutionalClaimsForm, 'dx1');
        instClaimHeader.diagnosis2 = Form.getValue(this.institutionalClaimsForm, 'dx2');
        instClaimHeader.diagnosis3 = Form.getValue(this.institutionalClaimsForm, 'dx3');
        instClaimHeader.diagnosis4 = Form.getValue(this.institutionalClaimsForm, 'dx4');
        instClaimHeader.drgCode = Form.getValue(this.institutionalClaimsForm, 'drg');
        instClaimHeader.seqMembId = Form.getValue(this.institutionalClaimsForm, 'seqMembId');
        instClaimHeader.seqProvId = Form.getValue(this.institutionalClaimsForm, 'seqProvId');
        instClaimHeader.seqGroupId = Form.getValue(this.institutionalClaimsForm, 'seqGroupId');
        instClaimHeader.inServiceArea = Form.getValue(this.institutionalClaimsForm, 'inServiceArea');
        instClaimHeader.inServiceArea = (instClaimHeader.inServiceArea) ? 'Y' : 'N';
        instClaimHeader.memberAge = Form.getValue(this.institutionalClaimsForm, 'memberAge');
        instClaimHeader.memberGender = Form.getValue(this.institutionalClaimsForm, 'memberGender');
        instClaimHeader.planCode = Form.getValue(this.institutionalClaimsForm, 'planCode');
        instClaimHeader.lineOfBusiness = Form.getValue(this.institutionalClaimsForm, 'lineOfBusiness');
        instClaimHeader.providerType = Form.getValue(this.institutionalClaimsForm, 'providerType');
        instClaimHeader.providerSpec = Form.getValue(this.institutionalClaimsForm, 'providerSpec');
        return instClaimHeader;
    }


    updateInstClaimHeader(seqClaimId: number) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.institutionalClaimsForm.valid) {

            const instClaimHeader = this.getFormData();
            this.instClaimHeaderService.updateInstClaimHeader(instClaimHeader, seqClaimId).subscribe((response: any) => {
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.editInstClaimHeader = true;
                this.isClaimNumberGenerated = false;
                this.instClaimHeader = response;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000)
                }
                this.popupClose = false;
                this.paySubModalRef.dismiss();
            }, error => {
                /*this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. ' +
                    'Please check your entry.');*/
                this.toastService.showToast('An Error occurred while updating record. ' +
                    'Please check your entry.', NgbToastType.Danger);
            });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    saveInstClaimHeader() {
        if (this.editInstClaimHeader) {
            this.updateInstClaimHeader(this.instClaimHeader.seqClaimId)
        } else {
            this.createInstClaimHeader();
        }
    }

    deleteInstClaimHeader(seqClaimId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.instClaimHeaderService.deleteInstClaimHeader(seqClaimId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    patchInstClaimHeader(instClaimHeader: InstClaimHeader) {
        this.holdReasonTrue = true;
        this.editInstClaimHeader = true;
        this.vendorAddress = instClaimHeader.seqVendAddress;
        this.institutionalClaimsForm.patchValue({
            'claimNumber': this.instClaimHeader.claimNumber,
            'admDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.primarySvcDate),
            'dischDate': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.claimThruDate),
            'authNo': this.instClaimHeader.authNumber,
            'billType': this.instClaimHeader.billType,
            'continuation': (this.instClaimHeader.conditionCode1 != 'N') ? this.instClaimHeader.conditionCode1 : '',
            'patCtrl': this.instClaimHeader.patientControlNo,
            'medRec': this.instClaimHeader.medicalRecordNo,
            'firstAdmitted': this.dateFormatPipe.defaultDisplayDateFormat(this.instClaimHeader.admissionDate),
            'incrdCntry': this.instClaimHeader.userDefined1,
            'patStatus': this.instClaimHeader.patientStatus,
            'diamondId': this.instClaimHeader.seqMcondId,
            'memberId': (this.instClaimHeader.memberMaster) ? this.instClaimHeader.memberMaster.subscriberId : '',
            'personNumber': (this.instClaimHeader.memberMaster) ? this.instClaimHeader.memberMaster.personNumber : '',
            'admProv': this.instClaimHeader.seqAdmProvId,
            'attProv': this.instClaimHeader.seqAttProvId,
            'institution': this.instClaimHeader.providerId,
            'payStub': this.instClaimHeader.paySubscriber,
            'releaseRec': this.instClaimHeader.medicalRelease,
            'assignBfts': (this.instClaimHeader.assignmentOfBenefits != 'N') ? this.instClaimHeader.assignmentOfBenefits : '',
            'payDep': this.instClaimHeader.payDependent,
            'par': this.instClaimHeader.providerParStat,
            'plcOfSvc': this.instClaimHeader.placeOfService1,
            'drg': this.instClaimHeader.drgCode,
            'servRsn': this.instClaimHeader.serviceReason1,
            'imageNo': this.instClaimHeader.userDefined2,
            'totalBilled': this.instClaimHeader.totalBilledAmt,
            'eobInd': this.instClaimHeader.explanationAttached,
            'sec': this.instClaimHeader.securityCode,
            'dateRecv': this.claimBatchInitData.dateReceived ? this.claimBatchInitData.dateReceived :
                this.dateFormatPipe.defaultDisplayDateFormat(instClaimHeader.dateReceived),
            'batchNumber': this.claimBatchInitData.batchNumber ? this.claimBatchInitData.batchNumber : instClaimHeader.batchNumber,
            'paperEobReq': this.instClaimHeader.paperEob,
            'privacyApplies': this.instClaimHeader.privacyApplies,
            'invalidData': (this.instClaimHeader.invalidDataInd != 'N') ? this.instClaimHeader.invalidDataInd : '',
            'provSignOnFile': this.instClaimHeader.provSignOnFile,
            'memberAge': this.instClaimHeader.memberAge,
            'memberGender': this.instClaimHeader.memberGender,
            'planCode': this.instClaimHeader.planCode,
            'providerType': this.instClaimHeader.providerType,
            'providerSpec': this.instClaimHeader.providerSpec,
            'lineOfBusiness': this.instClaimHeader.lineOfBusiness,
            'vendor': (this.instClaimHeader.vendorMaster) ? this.instClaimHeader.vendorMaster.vendorId : '',
            'addr002': this.instClaimHeader.seqVendAddress,
            'addr001': this.instClaimHeader.seqProvAddress,
            'zip': this.instClaimHeader.providerPostalCode,
            'dx1': this.instClaimHeader.diagnosis1,
            'dx2': this.instClaimHeader.diagnosis2,
            'dx3': this.instClaimHeader.diagnosis3,
            'dx4': this.instClaimHeader.diagnosis4,
            'seqProvId': this.instClaimHeader.seqProvId,
            'seqMembId': this.instClaimHeader.seqMembId,
            'seqVendId': this.instClaimHeader.seqVendId,
            'seqVendAddress': this.instClaimHeader.seqVendAddress,
            'seqGroupId': this.instClaimHeader.seqGroupId,
            'vendorName': (this.instClaimHeader.vendorMaster) ? this.instClaimHeader.vendorMaster.shortName : '',
            'groupId': (this.instClaimHeader.groupMaster) ? this.instClaimHeader.groupMaster.groupId : '',
            'groupName': (this.instClaimHeader.groupMaster) ? this.instClaimHeader.groupMaster.shortName : '',
            'groupState': (this.instClaimHeader.groupMaster) ? this.instClaimHeader.groupMaster.state : ''
        }, {emitEvent: false});
        setTimeout(() => {
            this.formValueChangeStatus();
        }, 2000)
        if (this.instClaimHeader.seqProvId) {
            this.getAddresses();
        }
        if (this.instClaimHeader.seqVendId) {
            this.getVendorAddresses();
        }
        if (this.instClaimHeader.memberId) {
            this.getMemberMasterBySubscriberId();
            /*this.onChangPersonNumber(null);*/
        }
        if (this.instClaimHeader.seqAdmProvId) {
            this.findByProviderId(this.instClaimHeader.seqAdmProvId.toString().toUpperCase(), 'admProv');
        }
        if (this.instClaimHeader.seqAttProvId) {
            this.findByProviderId(this.instClaimHeader.seqAttProvId.toString().toUpperCase(), 'attProv');
        }
        if (this.instClaimHeader.providerId) {
            this.findByProviderId(this.instClaimHeader.providerId.toString().toUpperCase(), 'institution');
        }
        if (this.instClaimHeader.diagnosis1) {
            this.findByDiagnosisCode(this.instClaimHeader.diagnosis1, 'dx1');
        }
        if (this.instClaimHeader.diagnosis2) {
            this.findByDiagnosisCode(this.instClaimHeader.diagnosis2, 'dx2');
        }
        if (this.instClaimHeader.diagnosis3) {
            this.findByDiagnosisCode(this.instClaimHeader.diagnosis3, 'dx3');
        }
        if (this.instClaimHeader.diagnosis4) {
            this.findByDiagnosisCode(this.instClaimHeader.diagnosis4, 'dx4');
        }
        if (this.instClaimHeader.authNumber) {
            this.changeAuthNumber(this.instClaimHeader.authNumber);
        }
        this.institutionalClaimsForm.get('claimNumber').disable();
        this.adminDateStatus = true;
        this.dischDateStatus = true;
        this.institutionalClaimsForm.get('memberId').disable();
        this.personNumberStatus = true;
        this.institutionalClaimsForm.get('institution').disable();
        this.institutionalClaimsForm.get('zip').disable();
        this.institutionalClaimsForm.get('vendor').disable();
        this.addrStatus = true;

    }

    getInstClaimHeader(seqClaimId: number) {
        this.instClaimHeaderService.getInstClaimHeader(seqClaimId).subscribe(instClaimHeader => {
            this.instClaimHeader = instClaimHeader;
            this.patchInstClaimHeader(this.instClaimHeader);
        }, error => {
            this.messageService
                .findByMessageId(7217)
                .subscribe((message: MessageMasterDtl[]) => {
                    let popMsg = new PopUpMessage('GroupId', 'Institutional Claims', '7217: ' + message[0].messageText, 'icon');
                    popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                        if (event.name === 'yes') {
                            this.instClaimHeader = new InstClaimHeader();
                        }
                    });
                });
        });
    }

    getInstClaimHeaders() {
        this.instClaimHeaderService.getInstClaimHeaders().subscribe(instClaimHeaders => {
            this.instClaimHeaders = instClaimHeaders;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
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
                        'You are not Permitted to view COB Order Liability',
                        'COB Order Liability Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('DETERMINANT_RULES', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }


    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.institutionalClaimsForm);
        this.icFormValidation = new FormValidation(this.icModalForm);
        this.getCountries();
        this.getPatientStatuses();
        this.getMedicalReleases();
        this.getParStats();
        this.createDataGrid();
        /**
         * Open Claims Batch Popup
         */
        let ref = this.modalService.open(ClaimsBatchInitiationComponent, {size: 'lg'});
        ref.componentInstance.buttonclickEvent.subscribe((data: any) => {
            this.claimBatchInitData.batchNumber = data.batchNumber;
            this.claimBatchInitData.dateReceived = data.dateReceived;
        });
    }

    showModal() {
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
        };

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {

        this.icModalForm = this.formBuilder.group({
            batchNumber: [''],
            dateReceived: ['']
        });
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.institutionalClaimsForm = this.formBuilder.group({
            claimNumber: ['', {validators: [Validators.required, Validators.maxLength(16)]}],
            admDate: ['', {validators: [Validators.required]}],
            dischDate: ['', {validators: [Validators.required]}],
            authNo: ['', {validators: []}],
            textbox001: ['', {validators: [Validators.maxLength(3)]}],
            billType: ['', {validators: [Validators.maxLength(3)]}],
            continuation: ['', {validators: []}],
            patCtrl: ['', {validators: [Validators.maxLength(38)]}],
            medRec: ['', {validators: []}],
            firstAdmitted: ['', {validators: []}],
            patStatus: ['', {validators: [Validators.maxLength(2)]}],
            diamondId: ['', {validators: []}],
            memberId: ['', {validators: [Validators.required]}],
            personNumber: ['', {validators: []}],
            guCat: ['', {validators: []}],
            guCatEffDate: [''],
            admProv: ['', {validators: []}],
            admProvShortName: ['', {validators: []}],
            admProvType: ['', {validators: []}],
            admProvSpec: ['', {validators: []}],
            admProvIpaId: ['', {validators: []}],
            attProv: ['', {validators: []}],
            attProvShortName: ['', {validators: []}],
            attProvType: ['', {validators: []}],
            attProvSpec: ['', {validators: []}],
            attProvIpaId: ['', {validators: []}],
            institution: ['', {validators: [Validators.required]}],
            providerId: ['', {validators: []}],
            providerShortName: ['', {validators: []}],
            providerType: ['', {validators: []}],
            providerSpec: ['', {validators: []}],
            providerIpaId: ['', {validators: []}],
            addr001: ['', {validators: []}],
            zip: ['', {validators: [Validators.maxLength(15)]}],
            payStub: ['N', {validators: []}],
            releaseRec: ['Y', {validators: []}],
            par: ['', {validators: []}],
            assignBfts: ['', {validators: []}],
            payDep: ['N', {validators: []}],
            vendor: ['', {validators: [Validators.required]}],
            addr002: ['', {validators: [Validators.required]}],
            plcOfSvc: ['', {validators: [Validators.required, Validators.maxLength(5)]}],
            dx1: ['', {validators: [Validators.maxLength(30)]}],
            dx1ShortDesc: ['', {validators: []}],
            drg: ['', {validators: []}],
            incrdCntry: ['', {validators: [Validators.required]}],
            servRsn: ['', {validators: [Validators.maxLength(5)]}],
            dx2: ['', {validators: [Validators.maxLength(30)]}],
            dx2ShortDesc: ['', {validators: []}],
            imageNo: ['', {validators: [Validators.required, Validators.maxLength(15)]}],
            totalBilled: ['', {validators: []}],
            dx3: ['', {validators: [Validators.maxLength(30)]}],
            dx3ShortDesc: ['', {validators: []}],
            eobInd: ['', {validators: []}],
            sec: ['', {validators: [Validators.maxLength(1)]}],
            dateRecv: ['', {validators: [Validators.required]}],
            dx4: ['', {validators: [Validators.maxLength(30)]}],
            dx4ShortDesc: ['', {validators: []}],
            batchNumber: ['', {validators: [Validators.maxLength(9)]}],
            paperEobReq: ['', {validators: [Validators.maxLength(1)]}],
            privacyApplies: ['', {validators: []}],
            invalidData: ['', {validators: []}],
            provSignOnFile: ['', {validators: []}],
            memberGender: [''],
            pcpIpaId: [''],
            panelId: [''],
            planCode: [''],
            groupName: [''],
            groupState: [''],
            seqGroupId: [''],
            groupId: [''],
            lineOfBusiness: [''],
            memberAge: [''],
            seqMembId: [''],
            seqProvId: [''],
            seqVendId: [''],
            inServiceArea: [''],
            authLevel: [''],
            vendorName: [''],
            lineNumber: ['000'],
            subLine: [''],
            history: [''],
            indicator: [''],
            holdReasonCode: ['']
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getCountries() {
        this.systemCodesService
            .findBySystemCodeTypeAndSystemCodeActiveAndLanguageIdState(
                'MELIGLOC',
                'Y',
                0
            ).subscribe(countries => {
                countries.sort((a: any, b: any) => {
                    if (a['systemCodeDesc1'] < b['systemCodeDesc1'] ) {return -1; }
                    if (a['systemCodeDesc1'] > b['systemCodeDesc1'] ) { return 1; }
                });
                let data: any[] = [];
                countries.map((item: any) => {
                    if (item.systemCodesPrimaryKey.systemCode === 'blank') {
                        return;
                    } else {
                        data.push(item)
                    }
                });
                this.countries = data;
        });
    }

    onLookupVendorFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupVendorIdFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            let vendorId = event.target.value;
            if (vendorId === '') {
                this.messageService.findByMessageId(29032).subscribe(res => {
                    this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'vendor_id'), 'Institutional Claims')
                })
            } else {
                this.getVendorMasterByVenddorId(vendorId);
            }
        }
    }

    openLookupVendorIdFieldSearchModel() {
        let vendorMaster = new VendorMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.institutionalClaimsForm.patchValue({
                    vendor: resp.vendorId,
                    seqVendId: resp.seqVendId
                });
                this.vendorValueStatus = true;
                this.getVendorAddresses();
            }
        });
    }

    getVendorMasterByVenddorId(vId: string) {
        this.vendorMasterService.findVendorMasterByVendorId(vId).subscribe(
            (vendorMaster) => {
                if (vendorMaster.seqVendId != null) {
                    this.institutionalClaimsForm.patchValue({
                        vendor: vendorMaster.vendorId,
                        vendorName: vendorMaster.shortName,
                        seqVendId: vendorMaster.seqVendId
                    });
                    setTimeout(() => {
                        this.vendorAddElf.nativeElement.focus();
                    }, 1000);
                    this.vendorValueStatus = true;
                    this.cdr.detectChanges();
                    this.getVendorAddresses();
                } else {
                    this.messageService.findByMessageId(11011).subscribe((messages) => {
                        this.showPopUp(
                            '11011 : ' + messages[0].messageText,
                            'Institutional Claims'
                        );
                    });
                    this.institutionalClaimsForm.patchValue({
                        vendor: null
                    });
                    setTimeout(() => {
                        this.renderer.selectRootElement('#vendor').focus()
                    }, 1000);
                }

            });
    }

    onChangPersonNumber(event: any) {
        this.memberMasterService.findBySubscriberIdAndPersonNumber(this.institutionalClaimsForm.value.memberId,
            this.institutionalClaimsForm.value.personNumber).subscribe((res) => {
            if (res && res.length > 0) {
                this.memberMaster = res[0];
                if (this.memberMaster.dateOfBirth) {
                    let today = this.getDate(this.institutionalClaimsForm.value.admDate.singleDate); //new Date();
                    let dob = new Date(this.memberMaster.dateOfBirth);
                    let diff = Math.abs(today.getTime() - dob.getTime());
                    let years = ((diff / (1000 * 3600 * 24)) / 365).toFixed(1); //Math.round((diff / (1000 * 3600 * 24))/365);
                    this.institutionalClaimsForm.patchValue({
                        memberAge: years
                    });
                    // Math.ceil(years)
                } else {
                    this.messageService.findByMessageId(70048).subscribe((messages) => {
                        this.showPopUp(
                            '70048 : ' + messages[0].messageText,
                            'Institutional Claims'
                        );
                    })
                }
                this.institutionalClaimsForm.patchValue({
                    memberGender: this.memberMaster.gender,
                    guCat: this.memberMaster.userDefined11,
                    guCatEffDate: this.memberMaster.userDefined9,
                    seqMembId: this.memberMaster.seqMembId
                });
            } else {
                this.memberMaster = null;
                this.institutionalClaimsForm.patchValue({
                    memberGender: null,
                    guCat: null,
                    guCatEffDate: null,
                    memberAge: null,
                    seqMembId: null
                });
            }
        });

        this.memberEligHistoryService.getMemberEligHistory(this.institutionalClaimsForm.value.memberId,
            this.institutionalClaimsForm.value.personNumber).subscribe((res) => {
            if (res && res.length > 0) {
                this.memEligHistory = res[0];
                this.institutionalClaimsForm.patchValue({
                    lineOfBusiness: this.memEligHistory.lineOfBusiness,
                    pcpIpaId: this.memEligHistory.ipaId,
                    panelId: this.memEligHistory.panelId,
                    planCode: this.memEligHistory.planCode
                });
                this.groupMasterService.getGroupMaster(this.memEligHistory.seqGroupId).subscribe((group) => {
                    if (group) {
                        this.institutionalClaimsForm.patchValue({
                            groupId: group.groupId,
                            seqGroupId: group.seqGroupId,
                            groupName: group.shortName,
                            groupState: group.state
                        });
                    } else {
                        this.institutionalClaimsForm.patchValue({
                            groupId: null,
                            seqGroupId: null,
                            groupName: null,
                            groupState: null
                        });
                    }
                })
            } else {
                this.institutionalClaimsForm.patchValue({
                    lineOfBusiness: null,
                    pcpIpaId: null,
                    panelId: null,
                    planCode: null
                });
            }
        });
    }

    onLookupMemberFieldChange(event: any) {
        this.institutionalClaimsForm.patchValue({
            memberId: event.target.value
        });
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupMemberFieldSearchModel();
        } else if (event.key === 'Tab') {
            this.institutionalClaimsForm.patchValue({
                memberId: event.target.value
            });
            this.getMemberMasterBySubscriberId();
        }
    }

    private openLookupMemberFieldSearchModel() {
        let ref = this.modalService.open(LookupComponent);
        ref.componentInstance.searchModel = this.memberSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.institutionalClaimsForm.patchValue({
                memberId: res.subscriberId,
                personNumber: res.personNumber
            });
            this.getMemberMasterBySubscriberId();
            this.onChangPersonNumber(null);
        });
    }

    private getMemberMasterBySubscriberId() {
        if (this.institutionalClaimsForm.value.memberId) {
            this.memberMasterService.findBySubscriberId(this.institutionalClaimsForm.value.memberId).subscribe(
                (memberMasters) => {
                    this.memberMasters = memberMasters;
                    if (this.memberMasters && this.memberMasters.length > 0) {
                        this.institutionalClaimsForm.patchValue({
                            personNumber: this.memberMasters[0].personNumber
                        });
                        setTimeout(() => {
                            this.onChangPersonNumber(null);
                        }, 200);
                    }
                }
            );
        }
    }

    onAdmProvFieldChange(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                setTimeout(() => {
                    this.renderer.selectRootElement('#attProv').focus()
                }, 500)
            } else {
                this.findByProviderId(event.target.value.toUpperCase(), 'admProv');
                this.institutionalClaimsForm.patchValue({
                    'admProv': event.target.value.toUpperCase()
                });
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel('admProv');
        }
    }

    onAttProvFieldChange(event: any) {
        if (event.key === 'Tab') {
           event.preventDefault();
           if (event.target.value === '') {
               setTimeout(() => {
                   this.renderer.selectRootElement('#vendor').focus()
               }, 500)
           } else {
               this.findByProviderId(event.target.value.toUpperCase(), 'attProv');
               this.institutionalClaimsForm.patchValue({
                   'attProv': event.target.value.toUpperCase()
               });
           }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel('attProv');
        }
    }

    onLookupDxFieldChange(event: any, col: string) {
        if (event.key === 'Tab') {
            this.findByDiagnosisCode(event.target.value, col);
            this.institutionalClaimsForm.patchValue({
                col: event.target.value
            });
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupDxFieldSearchModel(col);
        }
    }

    changeClaimNumber(event: any) {
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                this.showNewRecordMessage();
            } else {
                this.claimNumber = event.target.value;
                let res = [{'CLAIM_NUMBER': this.claimNumber}];
                let sm = JSON.parse(JSON.stringify(this.claimNumberSearchMdel));
                sm.searchOption = res;
                this.searchService.getSearchResults(sm).subscribe(resp => {
                    if (resp == null) {
                        this.showNewRecordMessage();
                    } else {
                        this.isShow = true;
                        this.getInstClaimHeaderByClaimNumber(this.claimNumber);
                    }
                }, error => {
                    this.showNewRecordMessage();
                });
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupClaimNumberFieldSearchModel();
        }
    }

    showNewRecordMessage() {
        this.messageService.findByMessageId(7217).subscribe((message) => {
            let popMsg = new PopUpMessage('InstitutionalClaimsError', 'Institutional Claims', '7217: ' + message[0].messageText, 'icon');
            popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                if (event.name === 'yes') {
                    this.isShow = true;
                    this.holdReasonTrue = true;
                    this.sequenceService.getNextSequence('SEQ_CLAIM_ID').subscribe(nextSequence => {
                        this.resetForm({ claimNumber: nextSequence });
                        this.institutionalClaimsForm.patchValue({
                            releaseRec: 'Y',
                            payStub: 'N',
                            payDep: 'N',
                            eobInd: 'N',
                            sec: 0,
                            paperEobReq: 'N',
                            provSignOnFile: 'N',
                            privacyApplies: 'N',
                            assignBfts: 'Y'
                        })
                    });
                }
            });
        });
    }

    openLookupClaimNumberFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.claimNumberSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.isShow = true;
                this.claimNumber = res.CLAIM_NUMBER;
                this.institutionalClaimsForm.patchValue({
                    claimNumber: this.claimNumber
                });
                this.getInstClaimHeaderByClaimNumber(this.claimNumber);
            }
        });
    }

    onLookupServRsnFieldChange(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                setTimeout(() => {
                    this.renderer.selectRootElement('#totalBilled').focus()
                }, 500)
            } else {
                let res = [{'reasonCode': event.target.value}];
                let sm = JSON.parse(JSON.stringify(this.servRsnSearchMdel));
                sm.searchOption = res;
                this.searchService.getSearchResults(sm).subscribe(resp => {
                    if (resp == null) {
                        this.messageService.findByMessageId(27222).subscribe(result => {
                            this.showPopUp('27222: ' + result[0].messageText.replace('@1', event.target.value), 'Institutional Claims')
                        });
                    } else {
                        setTimeout(() => {
                            this.renderer.selectRootElement('#totalBilled').focus()
                        }, 500)
                    }
                }, error => {
                    this.messageService.findByMessageId(27222).subscribe(result => {
                        this.showPopUp('27222: ' + result[0].messageText.replace('@1', event.target.value), 'Institutional Claims')
                    });
                });
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupServRsnFieldSearchModel();
        }
    }

    openLookupServRsnFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.servRsnSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.institutionalClaimsForm.patchValue({
                    servRsn: res.reasonCode
                })
            }
        });
    }

    onLookupPOSFieldChange(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.key === '') {
                this.messageService.findByMessageId(29032).subscribe(res => {
                    this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'place_of_service_1'), 'Institutional Claims')
                })
            } else {
                let res = [{'placeOfSvcCode': event.target.value}];
                let sm = JSON.parse(JSON.stringify(this.posSearchMdel));
                sm.searchOption = res;
                this.searchService.getSearchResults(sm).subscribe(resp => {
                    if (resp) {
                        setTimeout(() => {
                            this.renderer.selectRootElement('#servRsn').focus()
                        }, 500);
                    } else {
                        this.messageService.findByMessageId(9987).subscribe(res => {
                            this.showPopUp('9987: ' + res[0].messageText, 'Institutional Claims')
                        })
                    }
                }, error => {
                    this.institutionalClaimsForm.patchValue({
                        plcOfSvc: null
                    });
                });
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupPOSFieldSearchModel();
        }
    }

    openLookupPOSFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.posSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.institutionalClaimsForm.patchValue({
                    plcOfSvc: res.placeOfSvcCode
                })
            }
        });
    }

    onLookupBillTypeFieldChange(event: any) {
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                this.messageService.findByMessageId(27013).subscribe(res => {
                    this.showPopUp('27013: ' + res[0].messageText.replace('@1', 'bill_type'), 'Institutional Claims');
                });
                setTimeout(() => {
                    this.renderer.selectRootElement('#billType').focus()
                }, 500)
            } else {
                let res = [{'billType': event.target.value}];
                let sm = JSON.parse(JSON.stringify(this.billTypeSearchMdel));
                sm.searchOption = res;
                this.searchService.getSearchResults(sm).subscribe(resp => {
                    if (resp && resp.length > 0) {
                        this.institutionalClaimsForm.patchValue({
                            billType: resp[0].billType,
                            plcOfSvc: resp[0].placeOfSvcMaster.placeOfSvcCode
                        });
                        this.validateContinuationCheckbox();
                    } else {
                        this.institutionalClaimsForm.patchValue({
                            billType: null
                        });
                    }
                }, error => {
                    this.institutionalClaimsForm.patchValue({
                        billType: null
                    });
                });
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupBillTypeFieldSearchModel();
        }
    }

    openLookupBillTypeFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.billTypeSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.institutionalClaimsForm.patchValue({
                    billType: res.billType
                });
                this.validateContinuationCheckbox();
            }
        });
    }

    validateContinuationCheckbox() {
        let billType = this.institutionalClaimsForm.value.billType;
        if (billType && (billType.endsWith('2') || billType.endsWith('3') || billType.endsWith('4'))) {
            this.institutionalClaimsForm.patchValue({
                continuation: true
            });
        }
    }

    onLookupAuthNumberFieldChange(event: any) {
        if (event.key === 'Tab') {
            this.changeAuthNumber(event.target.value);
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupAuthNumberFieldSearchModel();
        }
    }

    changeAuthNumber(value: any) {
        let res = [{'AUTH_NUMBER': value}];
        let sm = JSON.parse(JSON.stringify(this.authNumberSearchMdel));
        sm.searchOption = res;
        this.searchService.getSearchResults(sm).subscribe(resp => {
            if (resp == null) {
                this.institutionalClaimsForm.patchValue({
                    authNo: null,
                    textbox001: null,
                    authLevel: null
                });
            } else {
                this.institutionalClaimsForm.patchValue({
                    authNo: resp[0].AUTH_NUMBER,
                    textbox001: resp[0].AUTH_SECONDARY_AUTH_NO,
                    authLevel: resp[0].AUTH_LEVEL
                })
            }
        }, error => {
            this.institutionalClaimsForm.patchValue({
                authNo: null,
                textbox001: null,
                authLevel: null
            });
        });
    }

    openLookupAuthNumberFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.authNumberSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.institutionalClaimsForm.patchValue({
                    authNo: res.AUTH_NUMBER,
                    textbox001: res.AUTH_SECONDARY_AUTH_NO,
                    authLevel: res.AUTH_LEVEL
                })
            }
        });
    }

    findByDiagnosisCode(value: any, col: any) {
        this.diagnosisCodeMasterService.getDiagnosisCodeMaster(value).subscribe((res) => {
            let descCol = col + 'ShortDesc';
            this.institutionalClaimsForm.get(col).setValue(res.diagnosisCode);
            this.institutionalClaimsForm.get(descCol).setValue(res.shortDescription);
        }, error => {
            let descCol = col + 'ShortDesc';
            this.institutionalClaimsForm.get(col).setValue(null);
            this.institutionalClaimsForm.get(descCol).setValue(null);
        })
    }

    openLookupDxFieldSearchModel(col: any) {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.diagnosisSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                let descCol = col + 'ShortDesc';
                this.institutionalClaimsForm.get(col).setValue(res.diagnosisCode);
                this.institutionalClaimsForm.get(descCol).setValue(res.shortDescription);
            }
        });
    }

    onInstitutionalFieldChange(event: any) {
        if (event.key === 'Tab') {
            this.findByProviderId(event.target.value.toUpperCase(), 'institution');
            this.institutionalClaimsForm.patchValue({
                'institution': event.target.value.toUpperCase()
            });
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel('institution');
        }
    }

    private findByProviderId(providerId: string, col: string) {
        this.provMasterService.findByProviderId(providerId).subscribe((res: any) => {
            if (res) {
                if (col === 'admProv') {
                    this.institutionalClaimsForm.patchValue({
                        admProv: res.providerId,
                        seqAdmProvId: res.providerId,
                        admProvShortName: res.shortName,
                        admProvType: res.providerType,
                        admProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        admProvIpaId: res.ipaId
                    });
                    setTimeout(() => {
                        this.renderer.selectRootElement('#attProv').focus()
                    }, 500)
                } else if (col === 'attProv') {
                    this.institutionalClaimsForm.patchValue({
                        attProv: res.providerId,
                        seqAttProvId: res.providerId,
                        attProvShortName: res.shortName,
                        attProvType: res.providerType,
                        attProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        attProvIpaId: res.ipaId
                    });
                    setTimeout(() => {
                        this.renderer.selectRootElement('#vendor').focus()
                    }, 500)
                } else if (col === 'institution') {
                    this.institutionalClaimsForm.patchValue({
                        seqProvId: res.seqProvId,
                        institution: res.providerId,
                        providerId: res.providerId,
                        providerShortName: res.shortName,
                        providerType: res.providerType,
                        providerSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        providerIpaId: res.ipaId
                    });
                    this.getAddresses();
                    var SvcDate : string = Form.getDatePickerValue( this.institutionalClaimsForm, "admDate" );
                    this.setParDropdownValue(this.institutionalClaimsForm.value.seqMembId,this.institutionalClaimsForm.value.seqGroupId,SvcDate,this.institutionalClaimsForm.value.incrdCntry,this.institutionalClaimsForm.controls["seqProvId"].value,this.institutionalClaimsForm.controls["claimNumber"].value);
                }
                this.provContractSpecialtyService.findBySeqProvId(res.seqProvId).subscribe((res1: any) => {
                    if (res1) {
                        if (col === 'admProv') {
                            this.institutionalClaimsForm.patchValue({
                                admProvSpec: (res1 && res1[0].provContractSpecialtyPrimaryKey) ? res1[0].provContractSpecialtyPrimaryKey.specialtyType : null
                            });
                        } else if (col === 'attProv') {
                            this.institutionalClaimsForm.patchValue({
                                attProvSpec: (res1 && res1[0].provContractSpecialtyPrimaryKey) ? res1[0].provContractSpecialtyPrimaryKey.specialtyType : null
                            });
                        } else if (col === 'institution') {
                            this.institutionalClaimsForm.patchValue({
                                providerSpec: (res1 && res1[0].provContractSpecialtyPrimaryKey) ? res1[0].provContractSpecialtyPrimaryKey.specialtyType : null
                            });
                        }
                    }
                });
            } else {
                this.messageService.findByMessageId(7193).subscribe(res => {
                    this.showPopUp('7193: ' + res[0].messageText, 'DIAMOND@ Client/Server System');
                    setTimeout(() => {
                        if (col === 'admProv') {
                            this.institutionalClaimsForm.patchValue({
                                admProv: ''
                            })
                        } else if (col === 'attProv') {
                            this.institutionalClaimsForm.patchValue({
                                attProv: ''
                            })
                        }

                    })
                })
            }
        }, (error: Error) => {
            this.institutionalClaimsForm.patchValue({
                col: null
            })
        });
    }

    private openLookupFieldSearchModel(col: string, defaultLoad= false, admProvSearchModel: SearchModel = this.admProvSearchModel) {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = admProvSearchModel;
        ref.componentInstance.defaultLoad = defaultLoad;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                if (col === 'admProv') {
                    this.institutionalClaimsForm.patchValue({
                        admProv: res.PROVIDER_ID,
                        seqAdmProvId: res.PROVIDER_ID,
                        admProvShortName: res.SHORT_NAME,
                        admProvType: res.PROVIDER_TYPE,
                        admProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        admProvIpaId: res.IPA_ID
                    });
                } else if (col === 'attProv') {
                    this.institutionalClaimsForm.patchValue({
                        attProv: res.PROVIDER_ID,
                        seqAttProvId: res.PROVIDER_ID,
                        attProvShortName: res.SHORT_NAME,
                        attProvType: res.PROVIDER_TYPE,
                        attProvSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        attProvIpaId: res.IPA_ID
                    });
                } else if (col === 'institution') {
                    this.institutionalClaimsForm.patchValue({
                        seqProvId: res.SEQ_PROV_ID,
                        institution: res.PROVIDER_ID,
                        providerId: res.PROVIDER_ID,
                        providerShortName: res.SHORT_NAME,
                        providerType: res.PROVIDER_TYPE,
                        providerSpec: res.PROVIDER_CONTRACT_SPECIALTY_TYPE,
                        providerIpaId: res.IPA_ID
                    });
                    this.getAddresses();
                    var SvcDate : string = Form.getDatePickerValue( this.institutionalClaimsForm, "admDate" );
                    this.setParDropdownValue(this.institutionalClaimsForm.value.seqMembId,this.institutionalClaimsForm.value.seqGroupId,SvcDate,this.institutionalClaimsForm.value.incrdCntry,this.institutionalClaimsForm.controls["seqProvId"].value,this.institutionalClaimsForm.controls["claimNumber"].value);
                }
            }
        });
    }

    private getPatientStatuses() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PATIENT_STATUS, CONSTANTS.DW_INCLM_HEADER).subscribe(res => {
            this.patientStatuses = res;
        });
    }

    private getAddresses() {
        if (this.institutionalClaimsForm.value.seqProvId) {
            this.provAddressService.findBySeqProvId(this.institutionalClaimsForm.value.seqProvId).subscribe((res: any) => {
                this.addresses = res;
                if (this.addresses.length > 0) {
                    this.institutionalClaimsForm.patchValue({
                        addr001: this.vendorAddress,
                        zip: this.addresses[0].zipCode,
                    });
                }
            }, error => {
                this.addresses = [];
            });
        }
    }

    private getVendorAddresses() {
        if (this.institutionalClaimsForm.value.seqVendId) {
            this.vendorAddressService.findBySeqVendId(this.institutionalClaimsForm.value.seqVendId).subscribe((res: any) => {
                this.vendorAddresses = res;
                let filtered = res.filter((va: any) => va.seqVendAddress == this.vendorAddress);
                if (this.vendorAddresses.length > 0) {
                    this.institutionalClaimsForm.patchValue({
                        addr002: this.vendorAddress,
                    });
                }
            }, (error: any) => {
                this.vendorAddresses = [];
            })
        }
    }

    private getMedicalReleases() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.MEDICAL_RELEASE, CONSTANTS.DW_INCLM_HEADER).subscribe(res => {
            this.medicalReleases = res;
        });
    }

    private getParStats() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_PARSTATUS, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.parStats = systemCodes;
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl + N',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Delete', shortcutKey: 'Ctrl + D',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Save', shortcutKey: 'Ctrl + S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl + F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt + F4'}
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C'},
                    {name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V'},
                    {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Header File'},
                    {name: 'Detail File'},
                    {name: 'Patient Liabilities', disabled: true},
                    {name: 'UB92'},
                    {name: 'UB92 Other Carriers'},
                    {name: 'Hold Reasons'},
                    {name: 'APC Details'},
                    {name: 'Home Healthcare Service'}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Claim Lookup'},
                    {name: 'Submitted Authorization'},
                    {name: 'Pay Subscriber'},
                    {name: 'Pay Dependent'},
                    {name: 'Change Default Batch'},
                    {name: 'DRG', shortcutKey: 'Ctrl + Q'},
                    {name: 'View DRG Pricer Fields...'},
                    {name: 'Edit Vendor Info'},
                    {
                        name: 'Authorization Waive/Match',
                        dropdownItems: [
                            {name: 'Manual Waive'},
                            {name: 'Undo Waive'},
                            {name: 'Re-Apply Waive'},
                            {name: 'Re-Apply Match'},
                            {name: 'Re-Apply Match/Waive'}
                        ]
                    },
                    {name: 'COB Information'},
                    {name: 'View IPA Info'},
                    {name: 'Re-apply Claim Holds'},
                    {name: 'Attach EOB/RA Remarks'},
                    {name: 'Change Header', disabled: true},
                    {name: 'View COB History'},
                    {name: 'View Claims with Auth Number'},
                    {
                        name: 'Submitted Claim Information',
                        dropdownItems: [
                            {name: 'Claim Header/UB92 Information'},
                            {name: 'Provider/Vendor Information'}
                        ]
                    },
                    {name: 'Remove System Generated Lines'},
                    {name: 'Reevaluate APC Status'},
                    {name: 'View Claim Totals'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift + Alt + P'},
                    {name: 'Hold Reason Display', shortcutKey: 'Shift + Alt + H'},
                    {name: 'Audit Display', shortcutKey: 'Shift + Alt + A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Institutional Claims'},
                ],
            },
            {
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
                    {name: 'About Diamond Client/Server'},
                ],
            },
        ];
    }

    onAddressChange(event: any) {
        let addressId = event.target.value;
        let address = this.addresses.filter(a => a.seqProvAddress === parseInt(addressId))[0];
        this.institutionalClaimsForm.patchValue({
            zip: address.zipCode,
            addr001: address.seqProvAddress
                });
    }

    onVendorAddressChange(event: any) {
        let addressId = event.target.value;
        let address = this.vendorAddresses.filter(a => a.seqVendAddress === parseInt(addressId))[0];
        this.institutionalClaimsForm.patchValue({
            addr002: address.seqVendAddress
        });
    }

    validateAdmDate(event: any) {
        if (event.singleDate) {
            let admDate = this.getDate(event.singleDate);
            let today = new Date();
            if (this.institutionalClaimsForm.value.dischDate) {
                let distchDate = this.getDate(this.institutionalClaimsForm.value.dischDate.singleDate);
                if (distchDate > admDate) {
                    this.messageService.findByMessageId(70308).subscribe((message) => {
                        this.showPopUp(
                          '70308 : ' + message[0].messageText,
                          'Intitutional Claims'
                        );
                        this.institutionalClaimsForm.patchValue({
                            dischDate: null
                        });
                    })
                }
            } else {
                if (admDate > today) {
                    this.messageService.findByMessageId(7195).subscribe((message) => {
                        this.showPopUp(
                          '7195 : ' + message[0].messageText,
                          'Intitutional Claims'
                        );
                        this.institutionalClaimsForm.patchValue({
                            admDate: null
                        });
                    })
                }
            }
        }
    }

    validateDischDate(event: any) {
        let today = new Date();
        if (event.singleDate) {
            let dischDate = this.getDate(event.singleDate);
            if (this.institutionalClaimsForm.value.admDate) {
                let admDate = this.getDate(this.institutionalClaimsForm.value.admDate.singleDate);

                if (dischDate.getTime() < admDate.getTime()) {
                  this.messageService
                    .findByMessageId(70308)
                    .subscribe((message) => {
                      this.showPopUp(
                        '70308 : ' + message[0].messageText,
                        'Institutional Claims'
                      );
                      this.institutionalClaimsForm.patchValue({
                        dischDate: null,
                      });
                    });
                } else {
                    if (dischDate.getTime() > today.getTime()) {
                        this.messageService.findByMessageId(90066).subscribe((message) => {
                            this.showPopUp(
                                '90066 : ' + message[0].messageText,
                                'Institutional Claims'
                            );
                            this.institutionalClaimsForm.patchValue({
                                dischDate: null
                            });
                            setTimeout(() => {
                                this.renderer.selectRootElement('#dischDate').focus()
                            }, 500);
                        })
                    }
                }
             }
        }
    }

    validateFirstAdmittedDate(event: any) {
        if (event.singleDate) {
            let firstAdmitted = this.getDate(event.singleDate);
            if (this.institutionalClaimsForm.value.admDate) {
                let admDate = this.getDate(this.institutionalClaimsForm.value.admDate.singleDate);
                if (firstAdmitted > admDate) {
                    this.messageService.findByMessageId(7189).subscribe((message) => {
                        this.showPopUp(
                            '7189 : ' + message[0].messageText,
                            'Institutional Claims'
                        );
                        this.institutionalClaimsForm.patchValue({
                            dischDate: null
                        });
                    })
                }
            }
        }
    }

    validateDateReceivedDate(event: any) {
        let today = new Date();
        console.log(event)
        if (event.singleDate) {
            let dateReceived = this.getDate(event.singleDate);

            if (dateReceived > today) {
                this.messageService.findByMessageId(70475).subscribe((message) => {
                    this.showPopUp(
                        '70475 : ' + message[0].messageText,
                        'Institutional Claims'
                    );
                    this.institutionalClaimsForm.patchValue({
                        dischDate: null
                    });
                })
            } else {
                setTimeout(() => {
                    this.renderer.selectRootElement('#sec').focus()
                }, 500)
            }
        }
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetForm();
                    this.createNewDataStatus = true;
                    break;
                }
            case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    //statements;
                    this.saveClaim();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Topic') {
            switch (event.action) {
                case 'Detail File':
                    const ref = this.modalService.open(InstitutionalClaimDetailComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.claimNumber = this.claimNumber;
                    break;
                case 'Hold Reasons':
                    this.navigateHoldReason();
                    break;
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Special') {
            this.handleSpecialMenu(event);
        }
        else if (event.menu.menuItem == 'Notes') {
            this.openNoteShortCut()
        }
        else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        } else {
            this.handleSubMenu(event);
        }
    }

    private resetForm(defaultData: any = {}) {
        this.institutionalClaimsForm.reset(defaultData);
        this.isClaimNumberGenerated = !!(defaultData && defaultData.claimNumber);
        this.editInstClaimHeader = false;
        this.isShow = false;
    }

    private saveClaim() {
        this.saveInstClaimHeader();
    }

    private getInstClaimHeaderByClaimNumber(value: any) {
        this.instClaimHeaderService.findByClaimNumber(value).subscribe((res) => {
            if (res) {
                this.seqSourceId = res.claimNumber;
                this.instClaimHeader = res;
                this.patchInstClaimHeader(this.instClaimHeader);
            }
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Institutional Claims')
            })
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveClaim()
                } else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    navigateHoldReason = () => {
       let ref = this.modalService.open(ClaimHoldReasonsComponent, {size: 'lg'});
       ref.componentInstance.showIcon = true;
       ref.componentInstance.winID = this.windowId;
       ref.componentInstance.claimNumber = this.institutionalClaimsForm.get('claimNumber').value;
       ref.componentInstance.holdReasonMenuClick.subscribe((event: any) => {
           this.onMenuItemClick(event);
       });
    };

    public onLookupFieldHoldCode(event: any) {
        if  (event.key === 'Tab') {
            event.preventDefault();
        } else if (event.key === 'F5') {
            event.preventDefault();
        }
    }

    public createNewClaims = () => {
        this.createNewDataStatus = true;
        let data = [];
        let item = {line: '000'};
        data.push(item);
        this.dataGridGridOptions.api.setRowData(data)
    };

    public getChooseClaimPaymentMethodScreen = () => {
        if (this.instClaimHeader) {
            const ref = this.modalService.open(
                ChooseClaimPaymentMethodComponent,
                {
                    size: <any>'xl',
                    ...NGBModalOptions,
                    windowClass: 'dashboard-modal',
                }
            );
            ref.componentInstance.instClaimHeader = this.instClaimHeader;
        }
    }

    private handleSpecialMenu(event: any) {

        switch (event.action) {
            case 'Claim Lookup': {
                this.openLookupClaimNumberFieldSearchModel();
                break;
            }
            case 'Submitted Authorization': {
                const authNo = this.institutionalClaimsForm.value.authNo;
                if (authNo) {
                    let ref = this.modalService.open(AuthorizationMasterComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.authNumber = authNo;
                } else {
                    this.showPopUp('Auth Number does not exist', 'Institutional Services Claims')
                }

                break;
            }
            case 'Pay Subscriber': {
                this.paySubModalRef = this.modalService.open(this.paySubscriberTemplate, {windowClass: 'paySubscriberModel'});

                break;
            }
            case 'Pay Dependent': {

                this.payDependentModalRef = this.modalService.open(this.payDependentModalRef, {windowClass: 'paySubscriberModel'});
                break;
            }
            case 'Change Default Batch': {
                let ref = this.modalService.open(ClaimsBatchInitiationComponent, {size: 'lg'});
                this.claimBatchInitData = {
                    batchNumber: this.institutionalClaimsForm.value.batchNumber ? this.institutionalClaimsForm.value.batchNumber : '' ,
                    dateReceived: this.institutionalClaimsForm.value.dateReceived ?  this.institutionalClaimsForm.value.dateReceived : ''
                };
                ref.componentInstance.claimBatchInitData = this.claimBatchInitData;
                ref.componentInstance.buttonclickEvent.subscribe((data: any) => {
                    this.claimBatchInitData.batchNumber = data.batchNumber;
                    this.claimBatchInitData.dateReceived = data.dateReceived;
                    this.institutionalClaimsForm.setValue({
                        'dateReceived': this.claimBatchInitData.dateReceived,
                        'batchNumber': this.claimBatchInitData.batchNumber
                    });
                });

                break;
            }
            case 'DRG':
            {
                this.callDRGSProc();
                break;
            }
            case 'View DRG Pricer Fields...':
            {
                let ref = this.modalService.open(DrgPricerFieldsViewComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                break;
            }
            case 'Edit Vendor Info': {

                let ref = this.modalService.open(VendorMasterComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;

                this.institutionalClaimsForm.controls['vendor'].enable({emitEvent: false});
                ref.componentInstance.vid = this.institutionalClaimsForm.value.vendor;
                if (!this.editInstClaimHeader) {
                    this.institutionalClaimsForm.controls['vendor'].disable({emitEvent: false});
                }
                ref.componentInstance.winID = this.windowId;
                break;
            }
            case 'Other Amounts Info': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
            case 'Authorization Waive/Match': {
                let ref = this.modalService.open(AuthWaiveRulesComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.claimtype = 'P';
                break;
            }
            case 'COB Information': {
                let ref = this.modalService.open(MemberCobVerificationInformationComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.seqMembId = this.institutionalClaimsForm.value.memberId;

                break;
            }
            case 'Attach EOB/RA Remarks': {

                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
            case 'Change Header': {

                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                break;
            }
            case 'View IPA Info': {

                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                break;
            }
            case 'Re-apply Claim Holds': {
                if (this.institutionalClaimsForm.value.vendor) {
                    let ref = this.modalService.open(ClaimHoldRulesComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.vid = this.institutionalClaimsForm.value.vendor;
                } else {
                    this.showPopUp('Vendor Id not exists', 'Institutional Services Claims')
                }
                break;
            }
            case 'View COB History': {
                this.institutionalClaimsForm.controls['memberId'].enable({emitEvent: false});
                const memberId = this.institutionalClaimsForm.value.memberId;

                if (!this.editInstClaimHeader) {
                    this.institutionalClaimsForm.controls['memberId'].disable({emitEvent: false});
                }

                if (memberId) {
                    let ref = this.modalService.open(MemberCobHistoryComponent, {size: 'lg'});
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                    ref.componentInstance.SubID = memberId;
                } else {
                    this.showPopUp('Member Id not exists', 'Institutional Services Claims')
                }
                break;
            }
            case 'View Claims with Auth Number': {
                let ref = this.modalService.open(ClaimDetailAuthProcRuleComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'Submitted Claim Information': {
                let ref = this.modalService.open(ClaimDisplayComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'Reset Audit Status': {
                let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;

                break;
            }
            case 'View Claim Totals': {
                let ref = this.modalService.open(ClaimEvaluationRuleComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
                break;
            }

            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }

    handleSubMenu(event: any) {
    switch (event.menu.name) {
        case 'Authorization Waive/Match':
        {
            let  authNo: any = '';
            switch (event.action) {
                case 'Manual Waive':
                    authNo = this.institutionalClaimsForm.value.authNo;
                        if (authNo) {
                            this.setAuthWave('M');
                        } else {
                            this.showPopUp('Auth Number does not exist', 'Institutional Services Claims')
                        }
                    break;
                case 'Undo Waive':
                         authNo = this.institutionalClaimsForm.value.authNo;
                        if (authNo) {
                            this.setAuthWave('X');
                        } else {
                            this.showPopUp('Auth Number does not exist', 'Institutional Services Claims')
                        }
                    break;
                case 'Re-Apply Waive':
                     authNo = this.institutionalClaimsForm.value.authNo;
                    if (authNo) {
                        this.setAuthWave('M');
                    } else {
                        this.showPopUp('Auth Number does not exist', 'Institutional Services Claims')
                    }
                    break;
                case 'Re-Apply Match/Waive':
                       authNo = this.institutionalClaimsForm.value.authNo;
                        if (authNo) {
                            this.setAuthWave('M');
                        } else {
                            this.showPopUp('Auth Number does not exist', 'Institutional Services Claims')
                        }
                    break;
               default:
                    this.showPopUp('Action is not valid', 'Institutional Services Claims');
                    break;
            }
        }
        case 'Submitted Claim Information':
        {
            let ref;
            switch (event.action) {

                case 'Provider/Vendor Information':
                    ref = this.modalService.open(SubmittedClaimProviderComponent, {size: 'lg'});
                    ref.componentInstance.seqClaimId = this.institutionalClaimsForm.value.claimNumber;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.winID = this.windowId;
                break;
                case 'Claim Header/UB92 Information':
                ref = this.modalService.open(SubmittedClaimHeaderub92InformationComponent, {size: 'lg'});
                ref.componentInstance.seqClaimId = this.institutionalClaimsForm.value.claimNumber;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winID = this.windowId;
            break;
                default:
                this.showPopUp('Action is not valid', 'Institutional Services Claims');
                break;
            }

        }
    }
    }


    openNoteShortCut() {
        if (this.institutionalClaimsForm.get('claimNumber').value === '') {
            this.messageService.findByMessageId(29005).subscribe(res => {
                this.showPopUp('29005: '+ res[0].messageText, 'Institutional Claims')
            })
        } else {
            this.popUpNotesMenuClicked();
        }
    };

    popUpNotesMenuClicked() {
        let ref = this.modalService.open(NotesComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    };

    callDRGSProc() {

        let spCallmodel: SpCallGrouperOnlModel =  new SpCallGrouperOnlModel();

        spCallmodel.piSClaimNumber = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piDPrimarySvcDate = Form.getDatePickerValue(this.institutionalClaimsForm, 'admDate');
        spCallmodel.piDClaimThruDate = Form.getDatePickerValue(this.institutionalClaimsForm, 'dischDate');
        spCallmodel.piNAuthNumber = this.institutionalClaimsForm.value.authNo;
        spCallmodel.piNSeqMembId = this.institutionalClaimsForm.value.memberId;
        spCallmodel.piNMemberAge = this.institutionalClaimsForm.value.memberAge;
        spCallmodel.piSMemberGender = this.institutionalClaimsForm.value.memberGender;
        spCallmodel.piNSeqPcpId = this.institutionalClaimsForm.value.seqAttProvId;
        spCallmodel.piSPcpType = this.institutionalClaimsForm.value.attProvType;
        spCallmodel.piSPcpSpec = this.institutionalClaimsForm.value.attProvSpec;
        spCallmodel.piSPcpIpaId = this.institutionalClaimsForm.value.attProvIpaId;

        spCallmodel.piNSeqGroupId = this.institutionalClaimsForm.value.seqGroupId;
        spCallmodel.piSPlanCode = this.institutionalClaimsForm.value.planCode;
        spCallmodel.piSLineOfBusiness = this.instClaimHeader.lineOfBusiness;
        spCallmodel.piSPanelId = this.institutionalClaimsForm.value.panelId;
        spCallmodel.piDEligibleThruDate = this.instClaimHeader.eligibleThruDate;
        spCallmodel.piSEligStatus = this.instClaimHeader.eligStatus;
        // Srprovider
        spCallmodel.piNSeqProvId = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piNSeqProvAddress = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piSProviderParStat = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piSProviderType = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piSProviderSpec = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piSProviderIpaId = this.institutionalClaimsForm.value.claimNumber;
        spCallmodel.piSProviderPcpFlag = this.institutionalClaimsForm.value.claimNumber;

        //Adm provider
        spCallmodel.piNSeqAdmProvId = this.institutionalClaimsForm.value.admProv;
        spCallmodel.piSAdmProvType = this.institutionalClaimsForm.value.admProvType;
        spCallmodel.piSAdmProvSpec = this.institutionalClaimsForm.value.admProvSpec;
        spCallmodel.piSAdmProvParStat = this.institutionalClaimsForm.value.admProvParStat;
        spCallmodel.piSAdmProvIpaId = this.institutionalClaimsForm.value.admProvIpaId;
        // attending prov
        spCallmodel.piNSeqAttProvId = this.institutionalClaimsForm.value.attProv;
        spCallmodel.piSAttProvType = this.institutionalClaimsForm.value.attProvType;
        spCallmodel.piSAttProvSpec = this.institutionalClaimsForm.value.attProvSpec;
        spCallmodel.piSAttProvParStat = this.institutionalClaimsForm.value.attProvParStat;
        spCallmodel.piSAttProvIpaId = this.institutionalClaimsForm.value.atProvIpaId;

        spCallmodel.piNSeqVendId = this.institutionalClaimsForm.value.seqVendId;
        spCallmodel.piNSeqVendAddress = this.institutionalClaimsForm.value.addr002;
        spCallmodel.piNTotalBilledAmt = this.institutionalClaimsForm.value.totalBilledAmt;
        spCallmodel.piSPlaceOfService1 = this.institutionalClaimsForm.value.plcOfSvc;
        spCallmodel.piSPlaceOfService2 = this.institutionalClaimsForm.value.plcOfSvc;
        spCallmodel.piSPlaceOfService3 = this.institutionalClaimsForm.value.plcOfSvc;
        spCallmodel.piSServiceReason1 = this.institutionalClaimsForm.value.servRsn;
        spCallmodel.piSDiagnosis1 = this.institutionalClaimsForm.value.dx1;
        spCallmodel.piSDiagnosis2 = this.institutionalClaimsForm.value.dx2;
        spCallmodel.piSDiagnosis3 = this.institutionalClaimsForm.value.dx3;
        spCallmodel.piSDiagnosis4 = this.institutionalClaimsForm.value.dx4;
        spCallmodel.piDDateReceived = Form.getDatePickerValue(this.institutionalClaimsForm, 'dateRecv');
        spCallmodel.piSBatchNumber = this.institutionalClaimsForm.value.batchNumber;
        spCallmodel.piSPatientControlNo = this.institutionalClaimsForm.value.patCtrl;
        spCallmodel.piSBillType = this.institutionalClaimsForm.value.billType;
        spCallmodel.piSDrgCode = this.institutionalClaimsForm.value.drg;
        spCallmodel.piSPatientStatus = this.institutionalClaimsForm.value.patStatus;
        spCallmodel.piNBirthWeight = this.instClaimHeader.birthWeight;
        spCallmodel.piNAdmitHour = this.instClaimHeader.admitHour;
        spCallmodel.piSAdmitType = this.instClaimHeader.admitType;
        spCallmodel.piSAdmitSource = this.instClaimHeader.admitSource
        spCallmodel.piNAgeInDaysAdmit = this.instClaimHeader.ageInDaysAdmit;
        spCallmodel.piNAgeInDaysDisch = this.instClaimHeader.ageInDaysDisch;
        spCallmodel.piSMedicalRecordNo = this.instClaimHeader.medicalRecordNo;
        spCallmodel.piSAdmittingDiagnosis = this.instClaimHeader.admittingDiagnosis
        spCallmodel.piSIcd9Code = this.instClaimHeader.icd9Code;
        spCallmodel.piSHcpcsRate = this.instClaimHeader.hcpcsRate;
        spCallmodel.piSOccurrence1 = this.instClaimHeader.occurrence1;
        spCallmodel.piDOccurrence1Date = this.instClaimHeader.occurrence1Date;
        spCallmodel.piSOccurrence2 = this.instClaimHeader.occurrence2;
        spCallmodel.piDOccurrence2Date = this.instClaimHeader.occurrence2Date;
        spCallmodel.piSOccurrence3 = this.instClaimHeader.occurrence3;
        spCallmodel.piDOccurrence3Date = this.instClaimHeader.occurrence3Date;
        spCallmodel.piSOccurrence4 = this.instClaimHeader.occurrence4;
        spCallmodel.piDOccurrence4Date = this.instClaimHeader.occurrence4Date;
        spCallmodel.piSOccurrence5 = this.instClaimHeader.occurrence5;
        spCallmodel.piDOccurrence5Date = this.instClaimHeader.occurrence5Date;
        spCallmodel.piSOccurSpanCode = this.instClaimHeader.occurSpanCode;
        spCallmodel.piDOccurSpanFrom = this.instClaimHeader.occur2SpanFrom;
        spCallmodel.piDOccurSpanThru = this.instClaimHeader.occur2SpanThru;
        spCallmodel.piSConditionCode1 = this.instClaimHeader.conditionCode1;
        spCallmodel.piSConditionCode2 = this.instClaimHeader.conditionCode2;
        spCallmodel.piSConditionCode3 = this.instClaimHeader.conditionCode3;
        spCallmodel.piSConditionCode4 = this.instClaimHeader.conditionCode4;
        spCallmodel.piSConditionCode5 = this.instClaimHeader.conditionCode5;
        spCallmodel.piSConditionCode6 = this.instClaimHeader.conditionCode6;
        spCallmodel.piSConditionCode7 = this.instClaimHeader.conditionCode7;
        spCallmodel.piSValue1Code = this.instClaimHeader.value1Code;
        spCallmodel.piNValue1Amt = this.instClaimHeader.value1Amt;
        spCallmodel.piSValue2Code = this.instClaimHeader.value2Code;
        spCallmodel.piNValue2Amt = this.instClaimHeader.value2Amt;
        spCallmodel.piSValue3Code = this.instClaimHeader.value3Code;
        spCallmodel.piNValue3Amt = this.instClaimHeader.value3Amt;
        spCallmodel.piSProcCodingMethod = this.instClaimHeader.procCodingMethod;
        spCallmodel.piSProcedure1Code = this.instClaimHeader.procedure1Code;
        spCallmodel.piDProcedure1Date = this.instClaimHeader.procedure1Date;
        spCallmodel.piSProcedure2Code = this.instClaimHeader.procedure2Code;
        spCallmodel.piDProcedure2Date = this.instClaimHeader.procedure2Date
        spCallmodel.piSProcedure3Code = this.instClaimHeader.procedure3Code;
        spCallmodel.piDProcedure3Date = this.instClaimHeader.procedure3Date
        spCallmodel.piSProcedure4Code = this.instClaimHeader.procedure4Code;
        spCallmodel.piDProcedure4Date = this.instClaimHeader.procedure4Date;
        spCallmodel.piSProcedure5Code = this.instClaimHeader.procedure5Code;
        spCallmodel.piDProcedure5Date = this.instClaimHeader.procedure5Date;
        spCallmodel.piSProcedure6Code = this.instClaimHeader.procedure6Code;
        spCallmodel.piDProcedure6Date = this.instClaimHeader.procedure6Date;
        spCallmodel.piNSeqOtherProvId = this.instClaimHeader.seqOtherProvId;
        spCallmodel.piSValueLine1 = this.instClaimHeader.valueLine1;
        spCallmodel.piSValueLine2 = this.instClaimHeader.valueLine2;
        spCallmodel.piSStateUnlabeled1 = this.instClaimHeader.stateUnlabeled1;
        spCallmodel.piSStateUnlabeled2 = this.instClaimHeader.stateUnlabeled2;
        spCallmodel.piSStateUnlabeled3 = this.instClaimHeader.stateUnlabeled3;
        spCallmodel.piSStateUnlabeled4 = this.instClaimHeader.stateUnlabeled4;
        spCallmodel.piSNatlUnlabeled1 = this.instClaimHeader.natlUnlabeled1;
        spCallmodel.piSNatlUnlabeled2 = this.instClaimHeader.natlUnlabeled2;
        spCallmodel.piSNatlUnlabeled3 = this.instClaimHeader.natlUnlabeled3;
        spCallmodel.piSNatlUnlabeled4 = this.instClaimHeader.natlUnlabeled4;
        spCallmodel.piSSecurityCode = this.instClaimHeader.securityCode
        spCallmodel.piDInsertDatetime = this.instClaimHeader.insertDatetime;
        spCallmodel.piSInsertUser = this.instClaimHeader.insertUser
        spCallmodel.piNSeqProvContract = this.instClaimHeader.seqProvContract;
        spCallmodel.piSPaySubscriber = this.instClaimHeader.paySubscriber;
        spCallmodel.piNSubmittedAuthNumber = this.instClaimHeader.submittedAuthNumber;
        spCallmodel.piSSubmittedSecondaryAuth = this.instClaimHeader.submittedSecondaryAuth;
        spCallmodel.piSCoveredDays = this.instClaimHeader.coveredDays;
        spCallmodel.piSCoinsuranceDays = this.instClaimHeader.coinsuranceDays;
        spCallmodel.piSLifetimeReserveDays = this.instClaimHeader.lifetimeReserveDays;
        spCallmodel.piDAdmissionDate = this.instClaimHeader.admissionDate;
        spCallmodel.piSDischargeHour = this.instClaimHeader.dischargeHour;
        spCallmodel.piSAssignmentOfBenefits = this.instClaimHeader.assignmentOfBenefits;
        spCallmodel.piSRemarks = this.instClaimHeader.remarks;
        spCallmodel.piNPricerBaseReimbAmt = this.instClaimHeader.pricerBaseReimbAmt;
        spCallmodel.piNPricerOutlierPayments = this.instClaimHeader.pricerOutlierPayments;
        spCallmodel.piNPrcAltLvlCarePayments = this.instClaimHeader.pricerAltLevelCarePayments;
        spCallmodel.piNPricerTotalReimbAmt = this.instClaimHeader.pricerTotalReimbAmt;
        spCallmodel.piNPricerOutlierType = this.instClaimHeader.pricerOutlierType;
        spCallmodel.piNPricerAverageLos = this.instClaimHeader.pricerAverageLos;
        spCallmodel.piSNoncoveredDays = this.instClaimHeader.noncoveredDays;
        spCallmodel.piSMedicalRelease = this.instClaimHeader.medicalRelease;
        spCallmodel.piSOccurrence6 = this.instClaimHeader.occurrence6;
        spCallmodel.piDOccurrence6Date = this.instClaimHeader.occurrence6Date;
        spCallmodel.piSOccurrence7 = this.instClaimHeader.occurrence7;
        spCallmodel.piDOccurrence7Date = this.instClaimHeader.occurrence7Date;
        spCallmodel.piSOccurrence8 = this.instClaimHeader.occurrence8;
        spCallmodel.piDOccurrence8Date = this.instClaimHeader.occurrence8Date;
        spCallmodel.piSOccur2SpanCode = this.instClaimHeader.occur2SpanCode;
        spCallmodel.piDOccur2SpanFrom = this.instClaimHeader.occur2SpanFrom;
        spCallmodel.piDOccur2SpanThru = this.instClaimHeader.occur2SpanThru;
        spCallmodel.piSValue4Code = this.instClaimHeader.value4Code;
        spCallmodel.piNValue4Amt = this.instClaimHeader.value4Amt;
        spCallmodel.piSValue5Code = this.instClaimHeader.value5Code;
        spCallmodel.piNValue5Amt = this.instClaimHeader.value5Amt;
        spCallmodel.piSValue6Code = this.instClaimHeader.value6Code;
        spCallmodel.piNValue6Amt = this.instClaimHeader.value6Amt;
        spCallmodel.piSValue7Code = this.instClaimHeader.value7Code;
        spCallmodel.piNValue7Amt = this.instClaimHeader.value7Amt;
        spCallmodel.piSValue8Code = this.instClaimHeader.value8Code;
        spCallmodel.piNValue8Amt = this.instClaimHeader.value8Amt;
        spCallmodel.piSValue9Code = this.instClaimHeader.value9Code;
        spCallmodel.piNValue9Amt = this.instClaimHeader.value9Amt;
        spCallmodel.piSValue10Code = this.instClaimHeader.value10Code;
        spCallmodel.piNValue10Amt = this.instClaimHeader.value10Amt;
        spCallmodel.piSValue11Code = this.instClaimHeader.value11Code;
        spCallmodel.piNValue11Amt = this.instClaimHeader.value11Amt;
        spCallmodel.piSValue12Code = this.instClaimHeader.value12Code;
        spCallmodel.piNValue12Amt = this.instClaimHeader.value12Amt;
        spCallmodel.piSStateUnlabeled5 = this.instClaimHeader.stateUnlabeled5;
        spCallmodel.piSStateUnlabeled6 = this.instClaimHeader.stateUnlabeled6
        spCallmodel.piSStateUnlabeled7 = this.instClaimHeader.stateUnlabeled7;
        spCallmodel.piSStateUnlabeled8 = this.instClaimHeader.stateUnlabeled8;
        spCallmodel.piSOcCarrierCode = this.instClaimHeader.ocCarrierCode;
        spCallmodel.piSCobAlwdAmtRule = this.instClaimHeader.cobAlwdAmtRule;
        spCallmodel.piSCobAlwdAmtRsn = this.instClaimHeader.cobAlwdAmtRsn;
        spCallmodel.piSAuthLevel = this.instClaimHeader.authLevel;
        spCallmodel.piSAuthWaiveMethod = this.instClaimHeader.authWaiveMethod;
        spCallmodel.piSProviderPanel = this.instClaimHeader.providerPanel;
        spCallmodel.piSProviderIpa = this.instClaimHeader.providerIpa;
        spCallmodel.piSAuthClass = this.instClaimHeader.authClass;
        spCallmodel.piSAttProvPcp = this.instClaimHeader.attProvPcp;
        spCallmodel.piNAuthMatchOrder = this.instClaimHeader.authMatchOrder;
        spCallmodel.piNSeqDfltVendId = this.instClaimHeader.seqDfltVendId;
        spCallmodel.piNSeqDfltVendAddress = this.instClaimHeader.seqDfltVendAddress;
        spCallmodel.piNSeqPaySubVendId = this.instClaimHeader.seqPaySubVendId
        spCallmodel.piNSeqPaySubVendAddrId = this.instClaimHeader.seqPaySubVendAddrId;
        spCallmodel.piSAcptMcareAssignFlag = this.instClaimHeader.acceptMedicareAssignFlag;
        spCallmodel.piSExplanationAttached = this.instClaimHeader.explanationAttached;
        spCallmodel.piSInServiceArea = this.instClaimHeader.inServiceArea;
        spCallmodel.piSProviderPostalCode = this.instClaimHeader.providerPostalCode;
        spCallmodel.piSHeaderChanged = this.instClaimHeader.headerChanged;
        spCallmodel.piSPrimaryOcExists = this.instClaimHeader.primaryOcExists;
        spCallmodel.piDActualAdmissionDate = this.instClaimHeader.actualAdmissionDate;
        spCallmodel.piSPayDependent = this.instClaimHeader.payDependent;
        spCallmodel.piSAuditStatus = this.instClaimHeader.auditStatus;
        spCallmodel.piSInvalidDataInd = this.instClaimHeader.invalidDataInd;
        spCallmodel.piSPrivacyApplies = this.instClaimHeader.privacyApplies;
        spCallmodel.piNSeqMcondId = this.instClaimHeader.seqMcondId;
        //
        spCallmodel.piSHomeHlthCtFormNum1 = this.instClaimHeader.homeHealthCertifFormNum1;
        spCallmodel.piSHomeHlthCtFormNum2 = this.instClaimHeader.homeHealthCertifFormNum2;
        spCallmodel.piDHomehsFromDate = this.instClaimHeader.homehsFromDate;
        spCallmodel.piDHmhsCtDatePrdStrt = this.instClaimHeader.homehsCertifDatePeriodStrt;
        spCallmodel.piDHmhsCtDatePrdEnd = this.instClaimHeader.homehsCertifDatePeriodEnd;
        spCallmodel.piDHmhsPrincipalDxDate = this.instClaimHeader.homehsPrincipalDxDate;
        spCallmodel.piSHmhsSnfInd = this.instClaimHeader.homehsSnfInd;
        spCallmodel.piSHmhsMedicareCovInd = this.instClaimHeader.homehsMedicareCovInd;
        spCallmodel.piSHmhsMedicareCertifType = this.instClaimHeader.homehsMedicareCertifType;
        spCallmodel.piDHmhsSurgeryPerfDate = this.instClaimHeader.homehsSurgeryPerfDate;
        spCallmodel.piSHmhsSrgProcCodeQulId = this.instClaimHeader.homehsSurgProcCodeQualId;
        spCallmodel.piSHmhsSurgeryProcCode = this.instClaimHeader.homehsSurgeryProcCode;
        spCallmodel.piDHmhsPhyscOrderDate = this.instClaimHeader.homehsPhyscOrderDate;
        spCallmodel.piDHmhsPhyscLastVisitDt = this.instClaimHeader.homehsPhyscLastVisitDate;
        spCallmodel.piDHmhsPhyscLastContDt = this.instClaimHeader.homehsPhyscLastContactDate;
        spCallmodel.piDHmhsInpatAdmisDatePer = this.instClaimHeader.homehsInpatAdmisDatePer;
        spCallmodel.piDHmhsInpatDiscDatePer = this.instClaimHeader.homehsInpatDischgDatePer;
        spCallmodel.piSHmhsPatDiscFacCode = this.instClaimHeader.homehsPatientDischgFacCode;
        spCallmodel.piDHmhsSecondaryDxDate1 = this.instClaimHeader.homehsSecondaryDxDate1;
        spCallmodel.piDHmhsSecondaryDxDate2 = this.instClaimHeader.homehsSecondaryDxDate2;
        spCallmodel.piDHmhsSecondaryDxDate3 = this.instClaimHeader.homehsSecondaryDxDate3;
        spCallmodel.piDHmhsSecondaryDxDate4 = this.instClaimHeader.homehsSecondaryDxDate4;
        spCallmodel.piSHmhsFunctionalResCode = this.instClaimHeader.homehsFunctionalResponsCode
        spCallmodel.piSHmhsFunctionalCode1 = this.instClaimHeader.homehsFunctionalCode1;
        spCallmodel.piSHmhsFunctionalCode2 = this.instClaimHeader.homehsFunctionalCode2;
        spCallmodel.piSHmhsFunctionalCode3 = this.instClaimHeader.homehsFunctionalCode3;
        spCallmodel.piSHmhsFunctionalCode4 = this.instClaimHeader.homehsFunctionalCode4;
        spCallmodel.piSHmhsFunctionalCode5 = this.instClaimHeader.homehsFunctionalCode5;
        spCallmodel.piSHmhsActivPermRespCode = this.instClaimHeader.homehsActivPermRespCode;
        spCallmodel.piSHmhsActivPermitCode1 = this.instClaimHeader.homehsActivityPermitCode1;
        spCallmodel.piSHmhsActivPermitCode2 = this.instClaimHeader.homehsActivityPermitCode2;
        spCallmodel.piSHmhsActivPermitCode3 = this.instClaimHeader.homehsActivityPermitCode3;
        spCallmodel.piSHmhsActivPermitCode4 = this.instClaimHeader.homehsActivityPermitCode4;
        spCallmodel.piSHmhsActivPermitCode5 = this.instClaimHeader.homehsActivityPermitCode5;


        this.spCallGrouperOnlService.spCallGrouperOnl(spCallmodel).subscribe(resp => {

            if (resp && resp.length > 0) {
                this.instClaimHeader.mdcCode = resp.poSMdc;
                this.instClaimHeader.drgCode = resp.poSDrg;
                if (resp.poSGrouperRc == '0') {
                    this.getInstClaimHeaderByClaimNumber(this.institutionalClaimsForm.value.claimNumber);
                } else {
                    this.toastService.showToast('Procedure was not executed succesfully. ', NgbToastType.Danger);
                }
            }
        });

    }

    setAuthWave(waveMethod: string) {

        this.instClaimDetailService.findBySeqClaimId(this.instClaimHeader.seqClaimId).subscribe(instClaimDetails => {
            let ClaimDetails: any = instClaimDetails;
            if (instClaimDetails && instClaimDetails.filter(f => f.processingStatus != 'F' && f.adjudDate != null).length > 0) {
                this.messageService.findByMessageId(7505).subscribe((message) => {
                    this.showPopUp(
                      '7505 : ' + message[0].messageText,
                      'Intitutional Claims'
                    );
                });
            } else {
                let authwave: AuthWaiveSP = new AuthWaiveSP();
                authwave.piNClaimId = this.instClaimHeader.claimNumber;
                authwave.piNAuthNumber = this.instClaimHeader.authNumber;
                authwave.piSSecondaryAuth = this.instClaimHeader.secondaryAuth;
                authwave.piSLineOfBusiness = this.instClaimHeader.lineOfBusiness;
                authwave.piSAuthWaiveMethod = waveMethod;
                this.SPauthWaiveService.spSetAlvlClaimHdrBrkr(authwave).subscribe(resp => {

                    console.log(resp);
                })
            }
        });
    }

    onTabLastField(event: any) {
        if (event.key === 'Tab') {
            let ref = this.modalService.open(InstitutionalClaimDetailComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.winId = this.windowId;
            ref.componentInstance.claimNumber = this.institutionalClaimsForm.value.claimNumber;
        }

    }

    onVendorAddrTab(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (this.institutionalClaimsForm.controls.seqVendId.value) {
                   let searchmodel: SearchModel = this.admProvSearchModel;
                   searchmodel.searchOption = [{'SEQ_VEND_ID': this.institutionalClaimsForm.controls.seqVendId.value}]
                   this.openLookupFieldSearchModel('institution', true, searchmodel);
                } else {
                    this.openLookupFieldSearchModel('institution');
            }
        }
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/INCLM_Institutional_Claims.htm'
    };

    vendorAddShowPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('yes', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            if (event.name === 'yes') {
                const element = this.renderer.selectRootElement('#zip');
                setTimeout(() => element.focus(), 50);
            }
        });
    }

    onVendorBlurEvent() {
        this.messageService.findByMessageId(34004).subscribe(res => {
            this.vendorAddShowPopUp('34004: ' + res[0].messageText.replace('@1', '35107'), 'VendorFirst Providers')
        })
    }

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.institutionalClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
        this.incrdFieldElf.nativeElement.focus();
    }

    zipCodeValidation = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                setTimeout(() => {
                    this.releaseRecElf.nativeElement.focus();
                }, 500)
            } else {
                if (isNaN(parseInt(event.target.value))) {
                    this.messageService.findByMessageId(30138).subscribe(res => {
                        this.showPopUp('30138: ' + res[0].messageText, 'DIAMOND@ Client/Server System');
                        this.institutionalClaimsForm.patchValue({
                            zip: ''
                        })
                    })
                } else {
                    setTimeout(() => {
                        this.releaseRecElf.nativeElement.focus();
                    }, 500)
                }
            }
        }
    };

    releaseRecKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#assignBfts').focus();
            }, 500);
        }
    };

    assignBftKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#institution').focus();
            }, 500);
        }
    };

    addressKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.par.nativeElement.focus();
            }, 500);
        }
    };

    parKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#plcOfSvc').focus()
            }, 500);
        }
    };

    incrdCntryKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#imageNo').focus();
            }, 500)
        }
    };

    imageNoKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(29032).subscribe(res => {
                    this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'user_defined_2'), 'Institutional Claims');
                })
            } else {
                setTimeout(() => {
                    this.renderer.selectRootElement('#dateRecv').focus();
                }, 500);
            }
        }
    };

    formValueChangeStatus = () => {
        this.institutionalClaimsForm.valueChanges.subscribe(() => {
            if (this.statusClick === 1) {
                ++this.statusClick
            } else {
                this.popupClose = true;
            }
        });
    };

    totalBilledKeyEvent = (event: any) => {
       if (event.key === 'Tab') {
           event.preventDefault();
           setTimeout(() => {
               this.renderer.selectRootElement('#dx1').focus()
           }, 500)
       }
    };

    drgKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.eobIndElf.nativeElement.focus();
            }, 500)
        }
    };

    eobIndKeyValue = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#invalidData').focus()
            }, 500)
        }
    };

    invalidDataKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.paperEobReqElf.nativeElement.focus()
            }, 500)
        }
    };

    paperEobReqKeyDown = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.provSignOnFileElf.nativeElement.focus()
            }, 500)
        }
    };

    provSignFileKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#userDef1').focus()
            }, 500)
        }
    };

    secKeyEvent = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setTimeout(() => {
                this.renderer.selectRootElement('#batchNumber').focus();
            }, 500)
        }
    };

    valueManualInputDate = (event: any) => {
        if (event) {
            this.messageService.findByMessageId(29031).subscribe(res => {
                this.showPopUp('29031: ' + res[0].messageText.replace('@1', 'M/d/yyyy'), 'Institutional Claims');
            })
        }
    }

    private setParDropdownValue(seqMembId: number,seqGroupId: number,dateOfSvc: string,userDefined1: string,seqProvId: number,seqClaimId: number): void {
        if (!seqMembId || !seqProvId) {
            return;
        } 
        this.provContractSpecialtyService
            .getProviderParStatus(seqMembId,seqGroupId,dateOfSvc,userDefined1,seqProvId,seqClaimId)
            .subscribe(par => {
                this.institutionalClaimsForm.controls["par"].patchValue(
                    par
                ) 
                
            });
        }
}
