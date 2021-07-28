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
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {ClaimSubmittedDataHdr, SecUser, SecWin} from '../../../api-models';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ClaimSubmittedDataHdrService} from '../../../api-services';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';

// Use the Component directive to define the SubmittedClaimProviderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'submittedclaimprovider',
    templateUrl: './submitted-claim-provider.component.html',

})
export class SubmittedClaimProviderComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    submittedClaimProviderForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
   // private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    private claimSubmittedDataHdr:ClaimSubmittedDataHdr;

    @Input() showIcon:boolean=false;
    @Input() seqClaimId:number;
    @Input() windowId:string ='';

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
    private secUserService:SecUserService,
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
        this.formValidation = new FormValidation(this.submittedClaimProviderForm);
        this.getSubmittedClaimHeader();

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.submittedClaimProviderForm = this.formBuilder.group({
            providerId001: ['', {updateOn: 'blur', validators: [] }],
            fedTaxId001: ['', {updateOn: 'blur', validators: [] }],
            natlProvId001: ['', {updateOn: 'blur', validators: [] }],
            lastName001: ['', {updateOn: 'blur', validators: [] }],
            firstName001: ['', {updateOn: 'blur', validators: [] }],
            providerId002: ['', {updateOn: 'blur', validators: [] }],
            fedTaxId002: ['', {updateOn: 'blur', validators: [] }],
            natlProvId002: ['', {updateOn: 'blur', validators: [] }],
            lastName002: ['', {updateOn: 'blur', validators: [] }],
            firstName002: ['', {updateOn: 'blur', validators: [] }],
            providerId003: ['', {updateOn: 'blur', validators: [] }],
            fedtaxId: ['', {updateOn: 'blur', validators: [] }],
            natlProvId003: ['', {updateOn: 'blur', validators: [] }],
            lastName003: ['', {updateOn: 'blur', validators: [] }],
            firstName003: ['', {updateOn: 'blur', validators: [] }],
            address1001: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            zipCode001: ['', {updateOn: 'blur', validators: [] }],
            vendorId: ['', {updateOn: 'blur', validators: [] }],
            fedTaxId003: ['', {updateOn: 'blur', validators: [] }],
            natlvendId: ['', {updateOn: 'blur', validators: [] }],
            lastName004: ['', {updateOn: 'blur', validators: [] }],
            firstName004: ['', {updateOn: 'blur', validators: [] }],
            address1002: ['', {updateOn: 'blur', validators: [] }],
            zipCode002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getSubmittedClaimHeader()
    {
        this.claimSubmittedDataHdrService.getClaimSubmittedDataHdr(this.seqClaimId).subscribe(data =>{
            this.claimSubmittedDataHdr = data;
            this.setFormData(data);
        })
    }
    setFormData(data:ClaimSubmittedDataHdr)
    {

        this.submittedClaimProviderForm.patchValue({
            'diamondId': data.memDiamondId,
            'memberId':data.memSubscriberId,
            'personNo': data.memPersonNumber,
            'providerId001': data.provId ,
            'fedTaxId001': data.provTaxId ,
            'natlProvId001': data.provNationalId ,
            'lastName001': data.provLastName ,
            'firstName001': data.provFirstName ,
            'providerId002': data.prov2Id ,
            'fedTaxId002': data.prov2TaxId ,
            'natlProvId002': data.prov2NationalId ,
            'lastName002': data.prov2LastName ,
            'firstName002': data.prov2FirstName ,
            'providerId003': data.prov3Id ,
            'fedtaxId': data.prov3TaxId ,
            'natlProvId003': data.prov3NationalId ,
            'lastName003': data.prov3LastName ,
            'firstName003': data.prov3FirstName ,
            'address1001': data.provAddressLine1 ,
            'city': data.provCity ,
            'state': data.provState ,
            'zipCode001': data.provZipCode ,
            'vendorId': data.vendId ,
            'fedTaxId003': data.vendTaxId ,
            'natlvendId': data.vendNationalId ,
            'lastName004': data.vendLastName ,
            'firstName004': data.vendFirstName ,
            'address1002': data.vendAddressLine1 ,
            'zipCode002': data.vendZipCode,

        });

    }

    onSave(){
        let operation = 'update';
        if(!this.claimSubmittedDataHdr){
            this.claimSubmittedDataHdr = new ClaimSubmittedDataHdr();
            operation = 'save';
        }

        this.claimSubmittedDataHdr.seqClaimId =  this.seqClaimId;
        this.claimSubmittedDataHdr.provId = this.submittedClaimProviderForm.value.providerId001;
        this.claimSubmittedDataHdr.provTaxId = this.submittedClaimProviderForm.value.fedTaxId001;
        this.claimSubmittedDataHdr.provNationalId = this.submittedClaimProviderForm.value.natlProvId001;
        this.claimSubmittedDataHdr.provLastName = this.submittedClaimProviderForm.value.lastName001;
        this.claimSubmittedDataHdr.provFirstName = this.submittedClaimProviderForm.value.firstName001;
        this.claimSubmittedDataHdr.provAddressLine1 = this.submittedClaimProviderForm.value.address1001;

        this.claimSubmittedDataHdr.prov2Id = this.submittedClaimProviderForm.value.providerId002;
        this.claimSubmittedDataHdr.prov2TaxId = this.submittedClaimProviderForm.value.fedTaxId002;
        this.claimSubmittedDataHdr.prov2NationalId = this.submittedClaimProviderForm.value.natlProvId002;
        this.claimSubmittedDataHdr.prov2LastName = this.submittedClaimProviderForm.value.lastName002;
        this.claimSubmittedDataHdr.prov2FirstName = this.submittedClaimProviderForm.value.firstName002;

        this.claimSubmittedDataHdr.prov3Id = this.submittedClaimProviderForm.value.providerId003;
        this.claimSubmittedDataHdr.prov3TaxId = this.submittedClaimProviderForm.value.prov3TaxId;
        this.claimSubmittedDataHdr.prov3NationalId = this.submittedClaimProviderForm.value.prov3NationalId;
        this.claimSubmittedDataHdr.prov3LastName = this.submittedClaimProviderForm.value.prov3LastName;
        this.claimSubmittedDataHdr.prov3FirstName = this.submittedClaimProviderForm.value.prov3FirstName;

        this.claimSubmittedDataHdr.vendId = this.submittedClaimProviderForm.value.vendorId;
        this.claimSubmittedDataHdr.vendTaxId = this.submittedClaimProviderForm.value.fedTaxId003;
        this.claimSubmittedDataHdr.vendNationalId = this.submittedClaimProviderForm.value.natlvendId;
        this.claimSubmittedDataHdr.vendLastName = this.submittedClaimProviderForm.value.lastName003;
        this.claimSubmittedDataHdr.vendFirstName = this.submittedClaimProviderForm.value.firstName003;
        this.claimSubmittedDataHdr.vendAddressLine1 = this.submittedClaimProviderForm.value.address1002;

        if(operation==='update'){
            this.claimSubmittedDataHdrService.updateClaimSubmittedDataHdr(this.claimSubmittedDataHdr, this.seqClaimId).subscribe(resp=>{
                this.toastService.showToast('Record saved succesfully.', NgbToastType.Success);
            setTimeout(() => {
                this.activeModal.close();
            }, 2000)
        },
        error =>{
            this.toastService.showToast('An Error occurred while updating record. Please check your entry.', NgbToastType.Danger);
        })
    }
    else
    {
        this.claimSubmittedDataHdrService.createClaimSubmittedDataHdr(this.claimSubmittedDataHdr).subscribe(resp=>{
            this.toastService.showToast('Record saved succesfully.', NgbToastType.Success);
    },
    error =>{
        this.toastService.showToast('An Error occurred while updating record, Please check your entry.', NgbToastType.Danger);
    })
}


    }

    modalClose()
    {
        this.activeModal.close();
    }

}
