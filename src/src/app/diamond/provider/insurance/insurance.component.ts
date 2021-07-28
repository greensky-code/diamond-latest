/* Copyright (c) 2021 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
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
import {  ProvMaster, ProvCredential } from "../../../api-models/index"
import {  ProvCredentialService } from "../../../api-services/prov-credential.service"

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'

import { SecUser } from '../../../api-models';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { PROV_CREDENTIAL_MODULE_ID } from '../../../shared/app-constants';
import { UntilDestroy } from '@ngneat/until-destroy';

import { getProviderCredentialsInsuranceShortcutKeys } from '../../../shared/services/shared.service';

import { ProvMasterService } from '../../../api-services/prov-master.service';

import { MessageType } from '../../../shared/components/pop-up-message';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { HelpComponent } from '../../member/help/help.component';
import { NotesComponent } from '../../../shared/components/notes/notes.component';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { DeactivateComponent } from "../../../shared/services/deactivate-guard.service";

import { DateRangeValidator } from '../../../shared/validators/date-range.validator';

// Use the Component directive to define the InsuranceComponent as an Angular component
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

    selector: 'insurance',
    templateUrl: './insurance.component.html',
    providers: [
        DateFormatPipe,
        ProvMasterService
    ]
})
export class InsuranceComponent implements OnInit, AfterViewInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon?: boolean;
    @Input() winId?: string;
    @Input() insuranceForm?: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;

    secWin: SecWinViewModel;
    windowId = 'CREDL';
    tableName = "PROV_CREDENTIAL";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    secModuleId = PROV_CREDENTIAL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    shortName: any = "";
    @Input() providerId: string;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

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

    @Input() editProvCredential?: boolean;
    @Input() provCredential?: ProvCredential;
    @Input() provCredentials?: ProvCredential[];
    @Input() provMaster?: ProvMaster;

    createProvCredential() {
        this.formValidation.validateForm();
        if(this.insuranceForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.seqProvId = this.provMaster.seqProvId;
            provCredential.provCredentialPrimaryKey.seqProvId = this.provMaster.seqProvId;
            provCredential.license1 = this.provCredential.license1
            provCredential.state1 = this.provCredential.state1;
            provCredential.license2 = this.provCredential.license2;
            provCredential.state2 = this.provCredential.state2;
            provCredential.deaLicense = this.provCredential.deaLicense;
            provCredential.specialtyBoard1 = this.provCredential.specialtyBoard1;
            provCredential.specialtyBoard2 = this.provCredential.specialtyBoard2;
            provCredential.medicalSchool = this.provCredential.medicalSchool;
            provCredential.internship = this.provCredential.internship;
            provCredential.residency = this.provCredential.residency;
            provCredential.userDefined1 = this.provCredential.userDefined1;
            provCredential.userDefined2 = this.provCredential.userDefined2;
            provCredential.userDefined3 = this.provCredential.userDefined3;
            provCredential.userDefined4 = this.provCredential.userDefined4;
            provCredential.userDefined5 = this.provCredential.userDefined5;
            provCredential.userDefined6 = this.provCredential.userDefined6;
            provCredential.userDefined7 = this.provCredential.userDefined7;
            provCredential.userDefined8 = this.provCredential.userDefined8;
            provCredential.comments = this.provCredential.comments;
            provCredential.includeInDir = this.provCredential.includeInDir;
            provCredential.lastPrintDate = this.provCredential.lastPrintDate;
            provCredential.license1ExpireDt = this.provCredential.license1ExpireDt;
            provCredential.license2ExpireDt = this.provCredential.license2ExpireDt;
            provCredential.deaExpireDate = this.provCredential.deaExpireDate;
            provCredential.medSchoolDate = this.provCredential.medSchoolDate;
            provCredential.internshipDate = this.provCredential.internshipDate;
            provCredential.residencyDate = this.provCredential.residencyDate;
            provCredential.board1FromDate = this.provCredential.board1FromDate;
            provCredential.board1ToDate = this.provCredential.board1ToDate;
            provCredential.board2FromDate = this.provCredential.board2FromDate;
            provCredential.board2ToDate = this.provCredential.board2ToDate;
            provCredential.insuranceCarrier1 = Form.getValue(this.insuranceForm, 'carrier1');
            provCredential.insuranceCarrier2 = Form.getValue(this.insuranceForm, 'carrier2');
            provCredential.insurancePolicy1 = Form.getValue(this.insuranceForm, 'policy1');
            provCredential.insurancePolicy1 = Form.getValue(this.insuranceForm, 'policy2');
            provCredential.policyDescr1 = Form.getValue(this.insuranceForm, 'policyDescr1');
            provCredential.policyDescr2 = Form.getValue(this.insuranceForm, 'policyDescr2');
            provCredential.effectiveFrom1 = Form.getDatePickerValue(this.insuranceForm, 'from1');
            provCredential.effectiveFrom2 = Form.getDatePickerValue(this.insuranceForm, 'from2');
            provCredential.effectiveTo1 = Form.getDatePickerValue(this.insuranceForm, 'to1');
            provCredential.effectiveTo2 = Form.getDatePickerValue(this.insuranceForm, 'to2');
            provCredential.claimLimit1 = Form.getValue(this.insuranceForm, 'claimLimit1');
            provCredential.claimLimit2 = Form.getValue(this.insuranceForm, 'claimLimit2');
            provCredential.aggregLimit1 = Form.getValue(this.insuranceForm, 'aggregLimit1');
            provCredential.aggregateLimit2 = Form.getValue(this.insuranceForm, 'aggregLimit2');
            this.provCredential = provCredential;
            this.provCredentialService.createProvCredential(provCredential).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editProvCredential = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateProvCredential(seqProvId: number, seqProvCredential: number) {
        this.formValidation.validateForm();
        if(this.insuranceForm.valid) {
            let provCredential = new ProvCredential();
            provCredential.seqProvCredential = seqProvCredential;
            provCredential.seqProvId = seqProvId;
            provCredential.provCredentialPrimaryKey = this.provCredential.provCredentialPrimaryKey;
            provCredential.license1 = this.provCredential.license1
            provCredential.state1 = this.provCredential.state1;
            provCredential.license2 = this.provCredential.license2;
            provCredential.state2 = this.provCredential.state2;
            provCredential.deaLicense = this.provCredential.deaLicense;
            provCredential.specialtyBoard1 = this.provCredential.specialtyBoard1;
            provCredential.specialtyBoard2 = this.provCredential.specialtyBoard2;
            provCredential.medicalSchool = this.provCredential.medicalSchool;
            provCredential.internship = this.provCredential.internship;
            provCredential.residency = this.provCredential.residency;
            provCredential.userDefined1 = this.provCredential.userDefined1;
            provCredential.userDefined2 = this.provCredential.userDefined2;
            provCredential.userDefined3 = this.provCredential.userDefined3;
            provCredential.userDefined4 = this.provCredential.userDefined4;
            provCredential.userDefined5 = this.provCredential.userDefined5;
            provCredential.userDefined6 = this.provCredential.userDefined6;
            provCredential.userDefined7 = this.provCredential.userDefined7;
            provCredential.userDefined8 = this.provCredential.userDefined8;
            provCredential.comments = this.provCredential.comments;
            provCredential.includeInDir = this.provCredential.includeInDir;
            provCredential.lastPrintDate = this.provCredential.lastPrintDate;
            provCredential.license1ExpireDt = this.provCredential.license1ExpireDt;
            provCredential.license2ExpireDt = this.provCredential.license2ExpireDt;
            provCredential.deaExpireDate = this.provCredential.deaExpireDate;
            provCredential.medSchoolDate = this.provCredential.medSchoolDate;
            provCredential.internshipDate = this.provCredential.internshipDate;
            provCredential.residencyDate = this.provCredential.residencyDate;
            provCredential.board1FromDate = this.provCredential.board1FromDate;
            provCredential.board1ToDate = this.provCredential.board1ToDate;
            provCredential.board2FromDate = this.provCredential.board2FromDate;
            provCredential.board2ToDate = this.provCredential.board2ToDate;
            provCredential.insuranceCarrier1 = Form.getValue(this.insuranceForm, 'carrier1');
            provCredential.insuranceCarrier2 = Form.getValue(this.insuranceForm, 'carrier2');
            provCredential.insurancePolicy1 = Form.getValue(this.insuranceForm, 'policy1');
            provCredential.insurancePolicy2 = Form.getValue(this.insuranceForm, 'policy2');
            provCredential.policyDescr1 = Form.getValue(this.insuranceForm, 'policyDescr1');
            provCredential.policyDescr2 = Form.getValue(this.insuranceForm, 'policyDescr2');
            provCredential.effectiveFrom1 = Form.getDatePickerValue(this.insuranceForm, 'from1');
            provCredential.effectiveFrom2 = Form.getDatePickerValue(this.insuranceForm, 'from2');
            provCredential.effectiveTo1 = Form.getDatePickerValue(this.insuranceForm, 'to1');
            provCredential.effectiveTo2 = Form.getDatePickerValue(this.insuranceForm, 'to2');
            provCredential.claimLimit1 = Form.getValue(this.insuranceForm, 'claimLimit1');
            provCredential.claimLimit2 = Form.getValue(this.insuranceForm, 'claimLimit2');
            provCredential.aggregLimit1 = Form.getValue(this.insuranceForm, 'aggregLimit1');
            provCredential.aggregateLimit2 = Form.getValue(this.insuranceForm, 'aggregLimit2');
            this.provCredential = provCredential;
            this.provCredentialService.updateProvCredential(provCredential, seqProvId, seqProvCredential).subscribe(() => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveProvCredential() {
        let popUpMessage = new PopUpMessage(
            'Insurance',
            'Insurance',
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
                this.editProvCredential,
                this.secWin
            )
        ) {
            if (this.editProvCredential) {
                this.updateProvCredential(this.provCredential.provCredentialPrimaryKey.seqProvId, this.provCredential.provCredentialPrimaryKey.seqProvCredential);
            } else {
                if(this.provCredentials.length == 0){
                    this.createProvCredential();
                }else{
                    this.alertMessage = this.alertMessageService.error("Only 1 credential per provider can be added.");
                }
            }
        }
    }

    deleteProvCredential(seqProvCredential : number) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
                    this.toastService.showToast('Not permitted to delete', NgbToastType.Danger);
        } else {
            this.provCredentialService.deleteProvCredential(seqProvCredential).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
       }
    }

    getProvCredential(seqProvCredential : number) {
        this.provCredentialService.getProvCredential(seqProvCredential).subscribe(provCredential => {
            this.provCredential = provCredential;
            this.insuranceForm.patchValue({
                'carrier1': this.provCredential.insuranceCarrier1,
                'carrier2': this.provCredential.insuranceCarrier2,
                'policy1': this.provCredential.insurancePolicy1,
                'policy2': this.provCredential.insurancePolicy2,
                'policyDescr1': this.provCredential.policyDescr1,
                'policyDescr2': this.provCredential.policyDescr2,
                'from1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom1),
                'from2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom2),
                'to1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo1),
                'to2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo2),
                'claimLimit1': this.provCredential.claimLimit1,
                'claimLimit2': this.provCredential.claimLimit2,
                'aggregLimit1': this.provCredential.aggregLimit1,
                'aggregLimit2': this.provCredential.aggregateLimit2,
            });
        });
    }

    getProvCredentials() {
        this.provCredentialService.getProvCredentials().subscribe(provCredentials => {
        this.provCredentials = provCredentials;
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private securityService: SecurityService,

        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private router: Router,

        private provMasterService: ProvMasterService,
        private provCredentialService: ProvCredentialService

        ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.insuranceForm);

        if(this.provCredential){
            this.setProvCredentialForm(this.provCredential);
            this.editProvCredential = true;
        }else{
            this.editProvCredential = false;
            this.alertMessage = this.alertMessageService.error("No provider credentials found, you may add one.");
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderCredentialsInsuranceShortcutKeys(this));
        this.cdr.detectChanges();
    }

     /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
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
        this.formValidation = new FormValidation(this.insuranceForm);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.insuranceForm = this.formBuilder.group({
            carrier1: ['', {updateOn: 'blur', validators: [] }],
            carrier2: ['', {updateOn: 'blur', validators: [] }],
            policy1: ['', {updateOn: 'blur', validators: [] }],
            policy2: ['', {updateOn: 'blur', validators: [] }],
            from1: ['', {updateOn: 'blur', validators: [] }],
            from2: ['', {updateOn: 'blur', validators: [] }],
            to1: ['', {updateOn: 'blur', validators: [] }],
            to2: ['', {updateOn: 'blur', validators: [] }],
            claimLimit1: ['', {updateOn: 'blur', validators: [] }],
            claimLimit2: ['', {updateOn: 'blur', validators: [] }],
            aggregLimit1: ['', {updateOn: 'blur', validators: [] }],
            aggregLimit2: ['', {updateOn: 'blur', validators: [] }],
            policyDescr1: ['', {updateOn: 'blur', validators: [] }],
            policyDescr2: ['', {updateOn: 'blur', validators: [] }]
        }, { updateOn: 'blur',
           validators: [
               DateRangeValidator.validate(this.toastService, 'from1', 'to1', 'From 1', 'To 1'),
               DateRangeValidator.validate(this.toastService, 'from2', 'to2', 'From 2', 'To 2')
           ]
       });
    }

    setProvCredentialForm(provCredential: ProvCredential) {
        this.provCredential = provCredential;
        this.provCredential.provCredentialPrimaryKey.seqProvId = provCredential.provMaster ? provCredential.provMaster.seqProvId : provCredential.provCredentialPrimaryKey.seqProvId;
        this.shortName = this.provCredential.provMaster ? this.provCredential.provMaster.shortName : this.shortName;
        this.insuranceForm.patchValue({
            'providerId': this.provCredential.provMaster ? this.provCredential.provMaster.providerId : this.providerId,
            'provCredentialPrimaryKey': this.provCredential.provCredentialPrimaryKey,
            'license1': this.provCredential.license1,
            'state1': this.provCredential.state1,
            'license2': this.provCredential.license2,
            'state2': this.provCredential.state2,
            'dea': this.provCredential.deaLicense,
            'spcBoard1': this.provCredential.specialtyBoard1,
            'spcBoard2': this.provCredential.specialtyBoard2,
            'medSchool': this.provCredential.medicalSchool,
            'internship': this.provCredential.internship,
            'residency': this.provCredential.residency,
            'userdef1': this.provCredential.userDefined1,
            'userdef2': this.provCredential.userDefined2,
            'userdef3': this.provCredential.userDefined3,
            'userdef4': this.provCredential.userDefined4,
            'userdef5': this.provCredential.userDefined5,
            'userdef6': this.provCredential.userDefined6,
            'userdef7': this.provCredential.userDefined7,
            'userdef8': this.provCredential.userDefined8,
            'comments': this.provCredential.comments,
            'includeInDirectory': this.provCredential.includeInDir ? 1 : 0,
            'lastPrintDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.lastPrintDate),
            'expirationDate001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.license1ExpireDt),
            'expirationDate002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.license2ExpireDt),
            'expirationDate003': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.deaExpireDate),
            'date001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.medSchoolDate),
            'date002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.internshipDate),
            'date003': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.residencyDate),
            'from001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board1FromDate),
            'to001': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board1ToDate),
            'from002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board2FromDate),
            'to002': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.board2ToDate),
            'carrier1': this.provCredential.insuranceCarrier1,
            'carrier2': this.provCredential.insuranceCarrier2,
            'policy1': this.provCredential.insurancePolicy1,
            'policy2': this.provCredential.insurancePolicy2,
            'from1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom1),
            'from2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveFrom2),
            'to1': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo1),
            'to2': this.dateFormatPipe.defaultDisplayDateFormat(this.provCredential.effectiveTo2),
            'claimLimit1': this.provCredential.claimLimit1,
            'claimLimit2': this.provCredential.claimLimit2,
            'aggregLimit1': this.provCredential.aggregLimit1,
            'aggregLimit2': this.provCredential.aggregateLimit2,
            'policyDescr1': this.provCredential.policyDescr1,
            'policyDescr2': this.provCredential.policyDescr2,
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    backToScreen() {
        setTimeout(() => {
            this.activeModal.close({provCredential: this.provCredential});
        }, 2000);
    }
    
}
