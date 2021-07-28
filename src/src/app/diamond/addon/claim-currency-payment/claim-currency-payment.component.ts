/* Copyright (c) 2021 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { CiebCountryCode, CiebCurrencyCode, ProfsvcClaimHeader } from '../../../api-models';
import { AddressOutgoingPaymentViewBean } from '../../../api-models/addon/address-outgoing-payment-view-bean.model';
import { CiebOutgoingClaimDetail } from '../../../api-models/addon/cieb-outgoing-claim-detail.model';
import { CiebTransPaymentCode } from '../../../api-models/addon/cieb-transpayment-code.model';
import { CurrencyClaimHeader } from '../../../api-models/addon/currency-claim-header.model';
import { CurrencyLocalPaymentViewBean } from '../../../api-models/addon/currency-local-payment-view-bean.model';
import { CurrencyPaymentTransaction } from '../../../api-models/addon/currency-payment-transaction.model';
import { CiebCountryCodeService, CiebCurrencyCodeService } from '../../../api-services';
import { CiebOutgoingClaimDetailService } from '../../../api-services/addon/cieb-outgoing-claim-detail.service';
import { CiebTransPaymentService } from '../../../api-services/addon/cieb-transpayment-code.service';
import { ClaimCurrencyPaymentService } from '../../../api-services/addon/claim-currency-payment.service';
import { AlertMessage } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';

// Use the Component directive to define the ClaimCurrencyPaymentComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claim-currency-payment',
    templateUrl: './claim-currency-payment.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
]

})
export class ClaimCurrencyPaymentComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro


    @Input() subscriberId: number;
    @Input() seqMembId: number;
    @Input() seqSubsId: number;
    @Input() mamberName: string;
    @Input() personNumber: number;
    @Input() profsvcClaimHeader: ProfsvcClaimHeader;

    claimCurrencyPaymentForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    currencies: CiebCurrencyCode[]=[];
    otherCountries: CiebCountryCode[]=[];
    countries: CiebCountryCode[]=[];
    ciebCountryCode: CiebCountryCode[] = [];
    transPayments: CiebTransPaymentCode[] = [];
    addressOutgoingPaymentViewBean: AddressOutgoingPaymentViewBean;
    currencyClaimHeader: CurrencyClaimHeader;
    currencyLocalPaymentViewBean: CurrencyLocalPaymentViewBean;
    ciebOutgoingClaimDetails: CiebOutgoingClaimDetail[] = [];
    currencyPaymentTransactions : CurrencyPaymentTransaction[] = [];
    viewHistoryShow: boolean = false;
    viewHistoryBtnText: string = "Show"
    
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private ciebCurrencyCodeService: CiebCurrencyCodeService,
    private ciebCountryCodeService: CiebCountryCodeService,
    private ciebTransPaymentService: CiebTransPaymentService,
    private claimCurrencyPaymentService: ClaimCurrencyPaymentService,
    private ciebOutgoingClaimDetailService: CiebOutgoingClaimDetailService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        console.log("subscriberId",this.subscriberId);
        console.log("seqMembId",this.seqMembId);
        console.log("seqSubsId",this.seqSubsId);
        console.log("mamberName",this.mamberName);
        console.log("personNumber",this.personNumber);
        console.log("profsvcClaimHeader",this.profsvcClaimHeader);
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimCurrencyPaymentForm);

        this.getCurrencyPayableList();
        this.getEuroCountryList();
        this.getCiebTransPaymentCodeList();
        this.getCiebCountryCodeList();
        this.getClaimHeader();
        this.getOutgoingAddress();
        this.findClaimDetailLines();
        if(this.claimCurrencyPaymentForm) {
            this.setFormData();
        }
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

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimCurrencyPaymentForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: [] }],
            imageNumber: ['', {updateOn: 'blur', validators: [] }],
            homeCurrency: ['', {updateOn: 'blur', validators: [] }],
            homePaymentAmount: ['', {updateOn: 'blur', validators: [] }],
            averageLocalClaimRate: ['', {updateOn: 'blur', validators: [] }],
            localCurrency1: ['', {updateOn: 'blur', validators: [] }],
            usd1: ['', {updateOn: 'blur', validators: [] }],
            localCurrency2: ['', {updateOn: 'blur', validators: [] }],
            usd2: ['', {updateOn: 'blur', validators: [] }],
            transactionType: ['', {updateOn: 'blur', validators: [] }],
            localCurrency3: ['', {updateOn: 'blur', validators: [] }],
            usd3: ['', {updateOn: 'blur', validators: [] }],
            euroHclearingHouseCountry: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    setFormData() {
        this.claimCurrencyPaymentForm.patchValue({
            claimNumber: this.profsvcClaimHeader.seqClaimId,
            imageNumber: this.profsvcClaimHeader.userDefined2,
            homeCurrency: "U.S. Dollar - (USD)",
            homePaymentAmount: '',
            averageLocalClaimRate: '',
            localCurrency1: '',
            usd1: '',
            localCurrency2: '',
            usd2: '',
            transactionType: '',
            localCurrency3: '',
            usd3: '',
            euroHclearingHouseCountry: ''
        });
    }
   
    getCurrencyPayableList() {
        this.ciebCurrencyCodeService.getCurrencyPayableList().subscribe((data: CiebCurrencyCode[]) => {
            this.currencies = data
        });
    }

    getCiebCountryCodeList() {
        this.ciebCountryCodeService.getCiebCountryCodeList().subscribe((data: CiebCountryCode[]) => {
            this.countries = data
        });
    }

    getEuroCountryList() {
        this.ciebCountryCodeService.getEuroCountryList().subscribe((data: CiebCountryCode[]) => {
            this.otherCountries = data
        });
    }

    getCiebTransPaymentCodeList() {
        this.ciebTransPaymentService.getCiebTransPaymentCodeList().subscribe((data: CiebTransPaymentCode[]) => {
            this.transPayments = data
        });
    }

    getOutgoingAddress() {
        this.claimCurrencyPaymentService.getOutgoingAddress(this.profsvcClaimHeader.seqClaimId).subscribe((data: AddressOutgoingPaymentViewBean) => {
            this.addressOutgoingPaymentViewBean = data
            console.log("this.addressOutgoingPaymentViewBean",this.addressOutgoingPaymentViewBean);
        });
    }

    getClaimHeader() {
        this.claimCurrencyPaymentService.getClaimHeader(this.profsvcClaimHeader.seqClaimId).subscribe((data: CurrencyClaimHeader) => {
            this.currencyClaimHeader = data
            console.log("this.currencyClaimHeader",this.currencyClaimHeader);
           
            // console.log("this.currencyClaimHeader",this.currencyClaimHeader.totalNetAmt);
        });
    }
 
    findClaimDetailLines() {
        this.claimCurrencyPaymentService.findClaimDetailLines(this.profsvcClaimHeader.seqClaimId).subscribe((data: CurrencyLocalPaymentViewBean) => {
            this.currencyLocalPaymentViewBean = data
            this.claimCurrencyPaymentForm.patchValue({
                homePaymentAmount: this.currencyLocalPaymentViewBean.totalNetAmt ? this.currencyLocalPaymentViewBean.totalNetAmt : "",
                averageLocalClaimRate: this.currencyLocalPaymentViewBean.averageLocalClaimRate? this.currencyLocalPaymentViewBean.averageLocalClaimRate: ""
            });
            console.log("this.currencyLocalPaymentViewBean",this.currencyLocalPaymentViewBean);
        });
    }

    findAllBySeqClaimIDStatusCode() {
        this.ciebOutgoingClaimDetailService.findAllBySeqClaimIDStatusCode(this.profsvcClaimHeader.seqClaimId).subscribe((data: CurrencyPaymentTransaction[]) => {
            this.currencyPaymentTransactions = data
            console.log("this.currencyPaymentTransactions",this.currencyPaymentTransactions);
        });
    }
    
    viewHistory(event : any) {
        this.viewHistoryShow = !this.viewHistoryShow;
        if(this.viewHistoryShow) {
            this.viewHistoryBtnText = "Hide";
        } else {
            this.viewHistoryBtnText = "Show";
        }

        this.findAllBySeqClaimIDStatusCode();
    }

    onSubmit(event: any) {

    }

    onCancel(event: any) {
        let popUpMessage = new PopUpMessage(
            'Alert',
            'Addon Claim Currency Payment',
            'The webpage you are viewing is trying to close the window. Do you want to close the window ?',
            'icon');
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                this.activeModal.close();
            } 
        })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}