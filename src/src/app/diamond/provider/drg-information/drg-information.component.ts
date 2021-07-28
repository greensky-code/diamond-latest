/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';

import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {ProvContractPriceService} from "../../../api-services/prov-contract-price.service";
import {DrgGrouperPricerService, DrgPricerRevisionService} from "../../../api-services";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";

// Use the Component directive to define the DrgInformationComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'drginformation',
    templateUrl: './drg-information.component.html',
    styleUrls: ['./drg-information.component.scss'],
    providers: [ProvContractPriceService, DrgGrouperPricerService, DrgPricerRevisionService]

})
export class DrgInformationComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    drgInformationForm: FormGroup;
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
    public drgPricerIdDropdown: any;
    public pricerVersionDropdown:any;
    public revisionLevelDropdown:any;
    public contractPrice: any;
    public drgFormData: any;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    @Input() params: {};

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

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private toastr: ToastService,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private securityService: SecurityService,
    private secUserService: SecUserService,
    private provContractService: ProvContractPriceService,
    private  drgGrouperPricerService: DrgGrouperPricerService,
    private  drgPricerRevisionService: DrgPricerRevisionService

    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.drgInformationForm);
       // console.log("My Params"+JSON.stringify(this.params['claimType']));
        this.getContractPrice();
        this.getDrgGrouperPricerDropDown();
        this.getPricerVersionDropDown();
        this.getRevisionLevelDropDown();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    /*hasPermission() {
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
    }*/

    getContractPrice() {
        this.provContractService.getProvContractPriceDrg(this.params).subscribe(
            data => {
                // console.log(data);
                this.contractPrice = data;
                this.drgInformationForm.patchValue({
                    drgPricerId: data.drgPricerId,
                    pricerVersion: data.pricerVersion,
                    revisionLevel: data.revisionLevel,
                    pricerFacilityNumber: data.pricerFacilityNumber,
                    drgOutlierMultiplier: data.drgOutlierMult,
                    drgOutlierOfBilled: data.drgOutlierPctBilled,
                    drgBaseMultiplier: data.drgBaseMult,
                    case2IfAllowed: data.case2Pct,
                    pricerPaysource: data.pricerPaysource,
                    case3OfAllowed: data.case3Pct
                });
                console.log(this.drgInformationForm.value);
                console.log(this.drgInformationForm.get('drgPricerId').value);
                console.log(this.drgInformationForm.get('drgPricerId').value == null);
            }, error => console.log(error));
    }

    getDrgGrouperPricerDropDown(){

        this.drgGrouperPricerService.getDrgGrouperPricerDropDown().subscribe(
            data => {
                // console.log(data);
                this.drgPricerIdDropdown = data;
            }, error => console.log(error));
    }

    getPricerVersionDropDown(){
        this.drgPricerRevisionService.getPricerVersionDropDown().subscribe(
            data => {
                //     console.log(data);
                this.pricerVersionDropdown = data;
            }, error => console.log(error));
    }

    getRevisionLevelDropDown(){
        this.drgPricerRevisionService.getRevisionLevelDropDown().subscribe(
            data => {
                // console.log(data);
                this.revisionLevelDropdown = data;
            }, error => console.log(error));

    }

    private initializePermission() : void {
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
        this.formValidation = new FormValidation(this.drgInformationForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.drgInformationForm = this.formBuilder.group({
            drgPricerId: ['', {updateOn: 'blur', validators: [] }],
            pricerFacilityNumber: ['', {updateOn: 'blur', validators: [] }],
            pricerVersion: ['', {updateOn: 'blur', validators: [Validators.required] }],
            drgOutlierMultiplier: ['', {updateOn: 'blur', validators: [Validators.pattern("^[0-9]*$")] }],
            revisionLevel: ['', {updateOn: 'blur', validators: [Validators.required] }],
            drgOutlierOfBilled: ['', {updateOn: 'blur', validators: [Validators.required, Validators.pattern("^[0-9]*$")] }],
            drgBaseMultiplier: ['', {updateOn: 'blur', validators: [Validators.pattern("^[0-9]*$")] }],
            case2IfAllowed: ['', {updateOn: 'blur', validators: [Validators.pattern("^[0-9]*$")] }],
            pricerPaysource: ['', {updateOn: 'blur', validators: [] }],
            case3OfAllowed: ['', {updateOn: 'blur', validators: [Validators.pattern("^[0-9]*$")] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    submit() {
        this.drgFormData = this.drgInformationForm.value;
        // console.log(this.drgInformationForm);
        this.contractPrice.drgPricerId = this.drgInformationForm.value.drgPricerId;
        this.contractPrice.pricerFacilityNumber = this.drgInformationForm.value.pricerFacilityNumber;
        this.contractPrice.pricerVersion = this.drgInformationForm.value.pricerVersion;
        this.contractPrice.drgOutlierMult = this.drgInformationForm.value.drgOutlierMultiplier;
        this.contractPrice.revisionLevel = this.drgInformationForm.value.revisionLevel;
        this.contractPrice.drgOutlierPctBilled = this.drgInformationForm.value.drgOutlierOfBilled;
        this.contractPrice.drgBaseMult = this.drgInformationForm.value.drgBaseMultiplier;
        this.contractPrice.case2Pct = this.drgInformationForm.value.case2IfAllowed;
        this.contractPrice.pricerPaysource = this.drgInformationForm.value.pricerPaysource;
        this.contractPrice.case3Pct = this.drgInformationForm.value.case3OfAllowed;

        this.provContractService.updateProvContractPriceDrgInformation(this.contractPrice, this.params).subscribe(data =>{
            this.toastr.showToast('Sucessfully Updated DRG Information', NgbToastType.Success);
        });
    }

    cancel() {
        this.activeModal.dismiss();
    }

    changeDrgPricerIdDropdown(event) {
        this.drgInformationForm.patchValue({
            drgPricerId: event.target.value
        });
    }

    changePricerVersionDropdown(event) {
        this.drgInformationForm.patchValue({
            pricerVersion: event.target.value
        });
    }

    changeRevisionLevelDropdown(event) {
        this.drgInformationForm.patchValue({
            revisionLevel: event.target.value
        });
    }
}
