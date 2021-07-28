/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser} from '../../../api-models/sec-user.model copy';
import {ClaimSubmittedDataHdr, SecWin} from '../../../api-models';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {ClaimSubmittedDataHdrService} from '../../../api-services';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';

// Use the Component directive to define the SubmittedClaimHeaderub92InformationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'ub92information',
    templateUrl: './ub92-information.component.html',

})
export class SubmittedClaimHeaderub92InformationComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    submittedClaimHeaderub92InformationForm: FormGroup;
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
    private claimSubmittedDataHdr:ClaimSubmittedDataHdr;
    @Input() seqClaimId:number;
    @Input() showIcon:boolean = true;

    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();

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
    private secUserService: SecUserService,
    private secColDetailService:SecColDetailService,
    private claimSubmittedDataHdrService:ClaimSubmittedDataHdrService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,

    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER COB History',
                        'MEMBER COB History Permission'
                    );
                }
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
        this.secColDetailService.findByTableNameAndUserId('MEMBER_OTHER_COVERAGE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

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
        this.formValidation = new FormValidation(this.submittedClaimHeaderub92InformationForm);
        this.getSubmittedClaimHeader();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.submittedClaimHeaderub92InformationForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            memberId: ['', {updateOn: 'blur', validators: [] }],
            personNo: ['', {updateOn: 'blur', validators: [] }],
            lastName: ['', {updateOn: 'blur', validators: [] }],
            firstName: ['', {updateOn: 'blur', validators: [] }],
            middleName: ['', {updateOn: 'blur', validators: [] }],
            gender: ['', {updateOn: 'blur', validators: [] }],
            dateOfBirth: ['', {updateOn: 'blur', validators: [] }],
            otherIdNo: ['', {updateOn: 'blur', validators: [] }],
            billType: ['', {updateOn: 'blur', validators: [] }],
            admitHour: ['', {updateOn: 'blur', validators: [] }],
            admitDx: ['', {updateOn: 'blur', validators: [] }],
            patientStatus: ['', {updateOn: 'blur', validators: [] }],
            admitType: ['', {updateOn: 'blur', validators: [] }],
            eCode: ['', {updateOn: 'blur', validators: [] }],
            plcOfService: ['', {updateOn: 'blur', validators: [] }],
            admitSource: ['', {updateOn: 'blur', validators: [] }],
            drg: ['', {updateOn: 'blur', validators: [] }],
            dischgHoure: ['', {updateOn: 'blur', validators: [] }],
            oc1: ['', {updateOn: 'blur', validators: [] }],
            oc3: ['', {updateOn: 'blur', validators: [] }],
            oc5: ['', {updateOn: 'blur', validators: [] }],
            oc7: ['', {updateOn: 'blur', validators: [] }],
            ocSpan1: ['', {updateOn: 'blur', validators: [] }],
            oc2: ['', {updateOn: 'blur', validators: [] }],
            oc4: ['', {updateOn: 'blur', validators: [] }],
            oc6: ['', {updateOn: 'blur', validators: [] }],
            oc8: ['', {updateOn: 'blur', validators: [] }],
            ocSpan2: ['', {updateOn: 'blur', validators: [] }],
            dx1: ['', {updateOn: 'blur', validators: [] }],
            dx5: ['', {updateOn: 'blur', validators: [] }],
            procCode1: ['', {updateOn: 'blur', validators: [] }],
            dx2: ['', {updateOn: 'blur', validators: [] }],
            dx6: ['', {updateOn: 'blur', validators: [] }],
            procCode2: ['', {updateOn: 'blur', validators: [] }],
            dx3: ['', {updateOn: 'blur', validators: [] }],
            dx7: ['', {updateOn: 'blur', validators: [] }],
            procCode3: ['', {updateOn: 'blur', validators: [] }],
            dx4: ['', {updateOn: 'blur', validators: [] }],
            dx8: ['', {updateOn: 'blur', validators: [] }],
            procCode4: ['', {updateOn: 'blur', validators: [] }],
            dx9: ['', {updateOn: 'blur', validators: [] }],
            procCode5: ['', {updateOn: 'blur', validators: [] }],
            procCode6: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    

    getSubmittedClaimHeader()
    {
        this.claimSubmittedDataHdrService.getClaimSubmittedDataHdr(this.seqClaimId).subscribe(data =>{
            this.claimSubmittedDataHdr = data;
            this.setFormData(this.claimSubmittedDataHdr);
        })
    }

    setFormData(data:any)
    {

        this.submittedClaimHeaderub92InformationForm.patchValue({
            'diamondId': data.memDiamondId,
            'memberId':data.memSubscriberId,
            'personNo': data.memPersonNumber,
            'lastName': data.memLastName,
            'firstName': data.memFirstName ,
            'middleName': data.memMiddleName ,
            'gender': data.memGender ,
            'dateOfBirth': data.memDateOfBirth ,
            'otherIdNo': data.memOtherId ,
            'billType': data.billType ,
            'admitHour': data.admitHour ,
            'admitDx': data.admitDiagnosis ,
            'patientStatus': data.patientStatus ,
            'admitType': data.admitType ,
            'eCode': data.ecode ,
            'plcOfService': data.placeOfService ,
            'admitSource': data.admitSource ,
            'drg': data.drgCode ,
            'dischgHour': data.dischargeHour ,
            'oc1': data.occurrence1 ,
            'oc3': data.occurrence3 ,
            'oc5': data.occurrence5 ,
            'oc7': data.occurrence7 ,
            'ocSpan1': data.occurrenceSpanCode1 ,
            'oc2': data.occurrence2 ,
            'oc4': data.occurrence4 ,
            'oc6': data.occurrence6 ,
            'oc8': data.occurrence8 ,
            'ocSpan2': data.occurrenceSpanCode2,
            'dx1': data.diagnosis1 ,
            'dx5': data.diagnosis5 ,
            'procCode1': data.procedureCode1 ,
            'dx2': data.diagnosis2 ,
            'dx6': data.diagnosis6 ,
            'procCode2': data.procedureCode2 ,
            'dx3': data.diagnosis3 ,
            'dx7': data.diagnosis7 ,
            'procCode3': data.procedureCode3 ,
            'dx4': data.diagnosis4 ,
            'dx8': data.diagnosis8 ,
            'procCode4': data.procedureCode4 ,
            'dx9': data.diagnosis9 ,
            'procCode5': data.procedureCode5 ,
            'procCode6': data.procedureCode6 ,
        });
    }

    onSave(){
        let operation='update';
        if(!this.claimSubmittedDataHdr){
            this.claimSubmittedDataHdr = new ClaimSubmittedDataHdr();
            operation='save';
        }
        this.claimSubmittedDataHdr.seqClaimId = this.seqClaimId;
        this.claimSubmittedDataHdr.memDiamondId = this.submittedClaimHeaderub92InformationForm.value.diamondId;
        this.claimSubmittedDataHdr.memSubscriberId = this.submittedClaimHeaderub92InformationForm.value.memberId;
        this.claimSubmittedDataHdr.memPersonNumber =this.submittedClaimHeaderub92InformationForm.value.personNo;
        this.claimSubmittedDataHdr.placeOfService =this.submittedClaimHeaderub92InformationForm.value.plcOfService;
        this.claimSubmittedDataHdr.patientStatus =this.submittedClaimHeaderub92InformationForm.value.patientStatus;
        this.claimSubmittedDataHdr.memOtherId =this.submittedClaimHeaderub92InformationForm.value.otherIdNo;
        this.claimSubmittedDataHdr.admitDiagnosis= this.submittedClaimHeaderub92InformationForm.value.admitDx;
        this.claimSubmittedDataHdr.admitHour= this.submittedClaimHeaderub92InformationForm.value.admitHour; 
        this.claimSubmittedDataHdr.admitSource= this.submittedClaimHeaderub92InformationForm.value.admitSource; 
        this.claimSubmittedDataHdr.admitType =this.submittedClaimHeaderub92InformationForm.value.admitType; 
        this.claimSubmittedDataHdr.billType = this.submittedClaimHeaderub92InformationForm.value.billType; 
        this.claimSubmittedDataHdr.diagnosis1= this.submittedClaimHeaderub92InformationForm.value.dx1; 
        this.claimSubmittedDataHdr.diagnosis2 =this.submittedClaimHeaderub92InformationForm.value.dx2; 
        this.claimSubmittedDataHdr.diagnosis3 = this.submittedClaimHeaderub92InformationForm.value.dx3; 
        this.claimSubmittedDataHdr.diagnosis4 = this.submittedClaimHeaderub92InformationForm.value.dx4; 
        this.claimSubmittedDataHdr.diagnosis5 = this.submittedClaimHeaderub92InformationForm.value.dx5; 
        this.claimSubmittedDataHdr.diagnosis6 = this.submittedClaimHeaderub92InformationForm.value.dx6; 
        this.claimSubmittedDataHdr.diagnosis7 = this.submittedClaimHeaderub92InformationForm.value.dx7; 
        this.claimSubmittedDataHdr.diagnosis8 = this.submittedClaimHeaderub92InformationForm.value.dx8; 
        this.claimSubmittedDataHdr.diagnosis9 = this.submittedClaimHeaderub92InformationForm.value.dx9; 
        this.claimSubmittedDataHdr.dischargeHour = this.submittedClaimHeaderub92InformationForm.value.dischgHour; 
        this.claimSubmittedDataHdr.drgCode = this.submittedClaimHeaderub92InformationForm.value.drg; 
        this.claimSubmittedDataHdr.eCode = this.submittedClaimHeaderub92InformationForm.value.eCode; 
        this.claimSubmittedDataHdr.memFirstName = this.submittedClaimHeaderub92InformationForm.value.firstName; 
        this.claimSubmittedDataHdr.memLastName = this.submittedClaimHeaderub92InformationForm.value.lastName; 
        this.claimSubmittedDataHdr.memMiddleName =this.submittedClaimHeaderub92InformationForm.value.middleName; 
        this.claimSubmittedDataHdr.memGender = this.submittedClaimHeaderub92InformationForm.value.gender; 
        this.claimSubmittedDataHdr.memDateOfBirth = this.submittedClaimHeaderub92InformationForm.value.dateOfBirth; 
        this.claimSubmittedDataHdr.occurrence1 = this.submittedClaimHeaderub92InformationForm.value.oc1; 
        this.claimSubmittedDataHdr.occurrence2 = this.submittedClaimHeaderub92InformationForm.value.oc2; 
        this.claimSubmittedDataHdr.occurrence3 = this.submittedClaimHeaderub92InformationForm.value.oc3; 
        this.claimSubmittedDataHdr.occurrence4 = this.submittedClaimHeaderub92InformationForm.value.oc4; 
        this.claimSubmittedDataHdr.occurrence5 = this.submittedClaimHeaderub92InformationForm.value.oc5; 
        this.claimSubmittedDataHdr.occurrence6 = this.submittedClaimHeaderub92InformationForm.value.oc6; 
        this.claimSubmittedDataHdr.occurrence7 = this.submittedClaimHeaderub92InformationForm.value.oc7; 
        this.claimSubmittedDataHdr.occurrence8 = this.submittedClaimHeaderub92InformationForm.value.oc8; 

        this.claimSubmittedDataHdr.procedureCode1 = this.submittedClaimHeaderub92InformationForm.value.procCode1; 
        this.claimSubmittedDataHdr.procedureCode2 = this.submittedClaimHeaderub92InformationForm.value.procCode2; 
        this.claimSubmittedDataHdr.procedureCode3 = this.submittedClaimHeaderub92InformationForm.value.procCode3; 
        this.claimSubmittedDataHdr.procedureCode4 = this.submittedClaimHeaderub92InformationForm.value.procCode4; 
        this.claimSubmittedDataHdr.procedureCode5 = this.submittedClaimHeaderub92InformationForm.value.procCode5; 
        this.claimSubmittedDataHdr.procedureCode6 = this.submittedClaimHeaderub92InformationForm.value.procCode6; 

        this.claimSubmittedDataHdr.occurrenceSpanCode1 = this.submittedClaimHeaderub92InformationForm.value.ocSpan1; 
        this.claimSubmittedDataHdr.occurrenceSpanCode2 = this.submittedClaimHeaderub92InformationForm.value.ocSpan2;
         
        if(operation==='save'){
            this.claimSubmittedDataHdrService.createClaimSubmittedDataHdr(this.claimSubmittedDataHdr).subscribe(resp =>{

                this.alertMessage = this.alertMessageService.success('Record saved succesfully.');
            },
            error=>{
                this.toastService.showToast('An Error occurred while saving record. ' +
                'Please check your entry.', NgbToastType.Danger);
            })
        }
      else{
        this.claimSubmittedDataHdrService.updateClaimSubmittedDataHdr(this.claimSubmittedDataHdr, this.seqClaimId).subscribe(resp =>{

            this.alertMessage = this.alertMessageService.success('Record saved succesfully.');
        },
        error=>{
            this.toastService.showToast('An Error occurred while updating record. ' +
            'Please check your entry.', NgbToastType.Danger);
        })
    }
    }

    modalClose()
    {
        this.activeModal.close()
    }

}
