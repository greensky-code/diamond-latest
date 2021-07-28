/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfsvcClaimHeader, SecUser, SecWin} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {PROFSVC_CLAIM_HEADER_MODULE_ID} from '../../../shared/app-constants';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {Menu} from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';

import {MessageMasterDtlService, ProfsvcClaimHeaderService, SecUserService} from '../../../api-services';
import {UntilDestroy} from "@ngneat/until-destroy";
import {getProfessionalServicesClaimDetailComponentShortcutKeys} from "../../../shared/services/shared.service";
import {DatePipe} from "@angular/common";
import {NgbToastType} from "ngb-toast";


// Use the Component directive to define the ProfessionalServicesClaimsOtherComponent as an Angular component
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

    selector: 'professional-services-claims-other',
    templateUrl: './professional-services-claims-other.component.html',
    providers: [DatePipe]
})
export class ProfessionalServicesClaimsOtherComponent implements OnInit, AfterViewInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() claimNumber?: string;
    @Input() showIcon: boolean;
    @Input() winId: string;
    profsvcClaimHeaderForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secWin: SecWinViewModel;
    windowId = PROFSVC_CLAIM_HEADER_MODULE_ID;
    tableName = "PROFSVC_CLAIM_HEADER";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = PROFSVC_CLAIM_HEADER_MODULE_ID;
    secColDetails = new Array<SecColDetail>();

    menu: Menu[] = [];

    shortName: any = "";

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;

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

    editProfsvcClaimHeader: boolean;
    @Input() profsvcClaimHeader: ProfsvcClaimHeader;
    profsvcClaimHeaders: ProfsvcClaimHeader[];

    createProfsvcClaimHeader() {
        this.formValidation.validateForm();
        if (this.profsvcClaimHeaderForm.valid) {
            let profsvcClaimHeader = this.getFormValue(new ProfsvcClaimHeader());
            this.profsvcClaimHeaderService.createProfsvcClaimHeader(profsvcClaimHeader).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editProfsvcClaimHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getFormValue(profsvcClaimHeader: ProfsvcClaimHeader) {
        profsvcClaimHeader.claimNumber = Form.getValue(this.profsvcClaimHeaderForm, 'claimNumber');
        profsvcClaimHeader.emplRelatedInd = Form.getValue(this.profsvcClaimHeaderForm, 'employment');
        profsvcClaimHeader.accidentInd = Form.getValue(this.profsvcClaimHeaderForm, 'otherAccident');
        profsvcClaimHeader.autoAccidentIn = Form.getValue(this.profsvcClaimHeaderForm, 'autoAccident');
        profsvcClaimHeader.autoAccidentState = Form.getValue(this.profsvcClaimHeaderForm, 'state');
        profsvcClaimHeader.diagnosis5 = Form.getValue(this.profsvcClaimHeaderForm, 'dx5');
        profsvcClaimHeader.diagnosis6 = Form.getValue(this.profsvcClaimHeaderForm, 'dx6');
        profsvcClaimHeader.diagnosis7 = Form.getValue(this.profsvcClaimHeaderForm, 'dx7');
        profsvcClaimHeader.diagnosis8 = Form.getValue(this.profsvcClaimHeaderForm, 'dx8');
        profsvcClaimHeader.patControlNo = Form.getValue(this.profsvcClaimHeaderForm, 'accountNumber');
        profsvcClaimHeader.assignOfBenefits = Form.getValue(this.profsvcClaimHeaderForm, 'assignBenefits');
        profsvcClaimHeader.otherInsuranceInd = Form.getValue(this.profsvcClaimHeaderForm, 'otherCoverage');
        profsvcClaimHeader.releaseMedRecsInd = Form.getValue(this.profsvcClaimHeaderForm, 'releaseMedRecs');
        profsvcClaimHeader.signRendProv = Form.getValue(this.profsvcClaimHeaderForm, 'providerSignatureOnFile');
        profsvcClaimHeader.relInfoSign = Form.getValue(this.profsvcClaimHeaderForm, 'patientSigned');
        profsvcClaimHeader.provAssignInd = Form.getValue(this.profsvcClaimHeaderForm, 'physicianAcceptsAssignment');
        profsvcClaimHeader.accidentSymptomDate = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'onsetDate');
        profsvcClaimHeader.sameSimilarSymptomDate = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'similarSymptomDate');
        profsvcClaimHeader.admissionDate1 = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'hospitalAdmitDate');
        profsvcClaimHeader.onsetTime = Form.getValue(this.profsvcClaimHeaderForm, 'onsetTime');
        profsvcClaimHeader.unableToWorkBeginDate = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'unableToWorkBeginDate');
        profsvcClaimHeader.dischargeDate1 = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'hospitalDischargeDate');
        profsvcClaimHeader.memberDateOfDeath = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'dateOfDeath');
        profsvcClaimHeader.unableToWorkThruDate = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'unableToWorkEndDate');
        profsvcClaimHeader.footCareLastVisitDate = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'lastFootCareVisit');
        profsvcClaimHeader.outsideLabInd = Form.getValue(this.profsvcClaimHeaderForm, 'outsideLab');
        profsvcClaimHeader.eligStatus = Form.getValue(this.profsvcClaimHeaderForm, 'pregnancyIndicator');
        profsvcClaimHeader.medicaidResubmitCode = Form.getValue(this.profsvcClaimHeaderForm, 'medicaidResubmitCode');
        profsvcClaimHeader.outsideLabCharges = Form.getValue(this.profsvcClaimHeaderForm, 'outsideLabChargs');
        profsvcClaimHeader.originalReferenceNumber = Form.getValue(this.profsvcClaimHeaderForm, 'originalReferenceNumber');
        profsvcClaimHeader.labNumber = Form.getValue(this.profsvcClaimHeaderForm, 'labId');
        profsvcClaimHeader.reservedLocalUseHdr = Form.getValue(this.profsvcClaimHeaderForm, 'reservedForLocalUse');
        profsvcClaimHeader.memberWeightPounds = Form.getValue(this.profsvcClaimHeaderForm, 'patientWeightslbs');
        profsvcClaimHeader.mammographyCertNo = Form.getValue(this.profsvcClaimHeaderForm, 'mammographyCertNumber');
        profsvcClaimHeader.spinalManipXrayAvailibility = Form.getValue(this.profsvcClaimHeaderForm, 'xRayAvail');
        profsvcClaimHeader.spinalManipInitTreatment = Form.getDatePickerValue(this.profsvcClaimHeaderForm, 'initialTreatmentDate');
        profsvcClaimHeader.spinalManipConditionCode = Form.getValue(this.profsvcClaimHeaderForm, 'conditionCode');
        profsvcClaimHeader.epsdtConditionInd1 = Form.getValue(this.profsvcClaimHeaderForm, 'conditionDesc1');
        profsvcClaimHeader.epsdtConditionInd2 = Form.getValue(this.profsvcClaimHeaderForm, 'conditionDesc2');
        profsvcClaimHeader.epsdtReferral = Form.getValue(this.profsvcClaimHeaderForm, 'conditionsApplies');
        profsvcClaimHeader.epsdtConditionInd1 = Form.getValue(this.profsvcClaimHeaderForm, 'conditionsCodes1');
        profsvcClaimHeader.epsdtConditionInd2 = Form.getValue(this.profsvcClaimHeaderForm, 'conditionsCodes2');
        profsvcClaimHeader.epsdtConditionInd3 = Form.getValue(this.profsvcClaimHeaderForm, 'conditionsCodes3');
        profsvcClaimHeader = this.makeExtraDataToNull(profsvcClaimHeader);
        profsvcClaimHeader.updateDatetime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        try {
            profsvcClaimHeader.insertDatetime = this.datePipe.transform(new Date(profsvcClaimHeader.insertDatetime), 'yyyy-MM-dd HH:mm:ss');
        } catch (e) {
            console.log(e);
        }
        profsvcClaimHeader.updateUser = sessionStorage.getItem('user');
        profsvcClaimHeader.updateProcess = this.windowId;
        return profsvcClaimHeader;
    }

    updateProfsvcClaimHeader(seqClaimId : number) {
        this.formValidation.validateForm();
        let profsvcClaimHeader = this.getFormValue(this.profsvcClaimHeader);
        this.profsvcClaimHeaderService.updateProfsvcClaimHeader(profsvcClaimHeader, seqClaimId).subscribe(response => {
            this.toastService.showToast('Saved Successfully', NgbToastType.Success);
            this.editProfsvcClaimHeader = false;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
        });
    }

    saveProfsvcClaimHeader() {
        if(this.editProfsvcClaimHeader) {
            this.updateProfsvcClaimHeader(this.profsvcClaimHeader.seqClaimId)
        } else {
            this.createProfsvcClaimHeader();
        }
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (this.securityService.checkInsertUpdatePermissions(this.editProfsvcClaimHeader, this.secWin)) {
            this.updateProfsvcClaimHeader(this.profsvcClaimHeader.seqClaimId)
        }
    }


    deleteProfsvcClaimHeader(seqClaimId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.profsvcClaimHeaderService.deleteProfsvcClaimHeader(seqClaimId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }

    getProfsvcClaimHeader(claimNumber : string) {
        this.profsvcClaimHeaderService.findByClaimNumber(claimNumber).subscribe(profsvcClaimHeader => {
            this.profsvcClaimHeader = profsvcClaimHeader;
            this.editProfsvcClaimHeader = true;
            this.profsvcClaimHeaderForm.patchValue({
                'claimNumber': this.profsvcClaimHeader.claimNumber,
                'employment': this.profsvcClaimHeader.emplRelatedInd,
                'otherAccident': this.profsvcClaimHeader.accidentInd,
                'autoAccident': this.profsvcClaimHeader.autoAccidentIn,
                'state': this.profsvcClaimHeader.autoAccidentState,
                'dx5': this.profsvcClaimHeader.diagnosis5,
                'dx6': this.profsvcClaimHeader.diagnosis6,
                'dx7': this.profsvcClaimHeader.diagnosis7,
                'dx8': this.profsvcClaimHeader.diagnosis8,
                'accountNumber': this.profsvcClaimHeader.patControlNo,
                'assignBenefits': this.profsvcClaimHeader.assignOfBenefits,
                'otherCoverage': this.profsvcClaimHeader.otherInsuranceInd,
                'releaseMedRecs': this.profsvcClaimHeader.releaseMedRecsInd,
                'providerSignatureOnFile': this.profsvcClaimHeader.signRendProv,
                'patientSigned': this.profsvcClaimHeader.relInfoSign,
                'physicianAcceptsAssignment': this.profsvcClaimHeader.provAssignInd,
                'onsetDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.accidentSymptomDate),
                'similarSymptomDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.sameSimilarSymptomDate),
                'hospitalAdmitDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.admissionDate1),
                'onsetTime': this.profsvcClaimHeader.onsetTime,
                'unableToWorkBeginDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.unableToWorkBeginDate),
                'hospitalDischargeDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.dischargeDate1),
                'dateOfDeath': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.memberDateOfDeath),
                'unableToWorkEndDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.unableToWorkThruDate),
                'lastFootCareVisit': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.footCareLastVisitDate),
                'outsideLab': this.profsvcClaimHeader.outsideLabInd,
                'pregnancyIndicator': this.profsvcClaimHeader.eligStatus,
                'medicaidResubmitCode': this.profsvcClaimHeader.medicaidResubmitCode,
                'outsideLabChargs': this.profsvcClaimHeader.outsideLabCharges,
                'originalReferenceNumber': this.profsvcClaimHeader.originalReferenceNumber,
                'labId': this.profsvcClaimHeader.labNumber,
                'reservedForLocalUse': this.profsvcClaimHeader.reservedLocalUseHdr,
                'patientWeightslbs': this.profsvcClaimHeader.memberWeightPounds,
                'mammographyCertNumber': this.profsvcClaimHeader.mammographyCertNo,
                'xRayAvail': this.profsvcClaimHeader.spinalManipXrayAvailibility,
                'initialTreatmentDate': Form.getDateInputDisplay(this.dateFormatPipe, this.profsvcClaimHeader.spinalManipInitTreatment),
                'conditionCode': this.profsvcClaimHeader.spinalManipConditionCode,
                'conditionDesc1': this.profsvcClaimHeader.epsdtConditionInd1,
                'conditionDesc2': this.profsvcClaimHeader.epsdtConditionInd2,
                'conditionsApplies': this.profsvcClaimHeader.epsdtReferral,
                'conditionsCodes1': this.profsvcClaimHeader.epsdtConditionInd1,
                'conditionsCodes2': this.profsvcClaimHeader.epsdtConditionInd2,
                'conditionsCodes3': this.profsvcClaimHeader.epsdtConditionInd3,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    makeExtraDataToNull(prof: ProfsvcClaimHeader) {

        prof.diagnosisCodeMasterDiagnosis1 = null;
        prof.diagnosisCodeMasterDiagnosis2 = null;
        prof.diagnosisCodeMasterDiagnosis3 = null;
        prof.diagnosisCodeMasterDiagnosis4 = null;
        prof.authMaster = null;

        prof.groupMaster = null;

        prof.lineOfBusinessMaster = null;

        prof.memberMaster = null;

        prof.planMaster = null;

        prof.profsvcClaimHdrRemark = null;
        prof.profsvcClaimLenrxes = null;
        prof.profsvcClaimDetails = null;

        prof.provAddressSeqProvAddress = null;
        prof.vendorMaster = null;

        prof.provContract = null;
        prof.provMaster = null;
        prof.provMasterSeqProvId = null;
        return prof;

    }

    getProfsvcClaimHeaders() {
        this.profsvcClaimHeaderService.getProfsvcClaimHeaders().subscribe(profsvcClaimHeaders => {
        this.profsvcClaimHeaders = profsvcClaimHeaders;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private messageService: MessageMasterDtlService,
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
        private profsvcClaimHeaderService: ProfsvcClaimHeaderService,
        private datePipe: DatePipe) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

        if(this.claimNumber){
            this.profsvcClaimHeaderForm.patchValue({'claimNumber': this.claimNumber});
            this.getProfsvcClaimHeader(this.claimNumber);
        }
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

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProfessionalServicesClaimDetailComponentShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
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
        this.formValidation = new FormValidation(this.profsvcClaimHeaderForm);
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

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.profsvcClaimHeaderForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            employment: ['', {updateOn: 'blur', validators: [] }],
            otherAccident: ['', {updateOn: 'blur', validators: [] }],
            autoAccident: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            dx5: ['', {updateOn: 'blur', validators: [] }],
            dx6: ['', {updateOn: 'blur', validators: [] }],
            dx7: ['', {updateOn: 'blur', validators: [] }],
            dx8: ['', {updateOn: 'blur', validators: [] }],
            accountNumber: ['', {updateOn: 'blur', validators: [] }],
            assignBenefits: ['', {updateOn: 'blur', validators: [] }],
            otherCoverage: ['', {updateOn: 'blur', validators: [] }],
            releaseMedRecs: ['', {updateOn: 'blur', validators: [] }],
            providerSignatureOnFile: ['', {updateOn: 'blur', validators: [] }],
            patientSigned: ['', {updateOn: 'blur', validators: [] }],
            physicianAcceptsAssignment: ['', {updateOn: 'blur', validators: [] }],
            onsetDate: ['', {updateOn: 'blur', validators: [] }],
            similarSymptomDate: ['', {updateOn: 'blur', validators: [] }],
            hospitalAdmitDate: ['', {updateOn: 'blur', validators: [] }],
            onsetTime: ['', {updateOn: 'blur', validators: [] }],
            unableToWorkBeginDate: ['', {updateOn: 'blur', validators: [] }],
            hospitalDischargeDate: ['', {updateOn: 'blur', validators: [] }],
            dateOfDeath: ['', {updateOn: 'blur', validators: [] }],
            unableToWorkEndDate: ['', {updateOn: 'blur', validators: [] }],
            lastFootCareVisit: ['', {updateOn: 'blur', validators: [] }],
            outsideLab: ['', {updateOn: 'blur', validators: [] }],
            pregnancyIndicator: ['', {updateOn: 'blur', validators: [] }],
            medicaidResubmitCode: ['', {updateOn: 'blur', validators: [] }],
            outsideLabChargs: ['', {updateOn: 'blur', validators: [] }],
            originalReferenceNumber: ['', {updateOn: 'blur', validators: [] }],
            labId: ['', {updateOn: 'blur', validators: [] }],
            reservedForLocalUse: ['', {updateOn: 'blur', validators: [] }],
            patientWeightslbs: ['', {updateOn: 'blur', validators: [] }],
            mammographyCertNumber: ['', {updateOn: 'blur', validators: [] }],
            initialTreatmentDate: ['', {updateOn: 'blur', validators: [] }],
            xRayAvail: ['', {updateOn: 'blur', validators: [] }],
            conditionCode: ['', {updateOn: 'blur', validators: [] }],
            conditionDesc1: ['', {updateOn: 'blur', validators: [] }],
            conditionDesc2: ['', {updateOn: 'blur', validators: [] }],
            conditionsApplies: ['', {updateOn: 'blur', validators: [] }],
            conditionsCodes1: ['', {updateOn: 'blur', validators: [] }],
            conditionsCodes2: ['', {updateOn: 'blur', validators: [] }],
            conditionsCodes3: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
