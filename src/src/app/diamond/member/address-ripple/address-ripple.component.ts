/* Copyright (c) 2020 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { Country, MemberAddress, MemberMaster } from '../../../api-models'
import { CountryService } from '../../../api-services/country.service'
import { MemberMasterService } from '../../../api-services/member-master.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { Router } from '@angular/router';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { getAddressRippleShortcutKeys } from '../../../shared/services/shared.service';
import { MemberAddressService } from '../../../api-services/member-address.service';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter} from '@angular/core';

// Use the Component directive to define the AddressRippleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'addressripple',
    templateUrl: './address-ripple.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        CountryService,
        MemberMasterService,
        MemberAddressService
    ]
})
export class AddressRippleComponent implements OnInit {

    @Output() emitResponse = new EventEmitter<any>();
    @Input() memberAddress?:MemberAddress;
    @Input() seqMemId?:any;
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    addressRippleForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    editCountry: boolean;
    country: Country;
    countrys: Country[];
    editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;


    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private router: Router,
        private countryService: CountryService,
        private memberMasterService: MemberMasterService,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private memberAddressService:MemberAddressService,
        private activeModal:NgbActiveModal
        ) { }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.getCountrys();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addressRippleForm);
        this.loadAddressRipple();
    }
    ngAfterViewInit(): void {
        this.shortcuts.push(...getAddressRippleShortcutKeys(this));
        this.cdr.detectChanges();
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
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

    createCountry() {
        this.formValidation.validateForm();
        if (this.addressRippleForm.valid) {
            let country = new Country();
            this.countryService.createCountry(country).subscribe(response => {
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.editCountry = false;
            });

        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    updateCountry(countryCode: string) {
        this.formValidation.validateForm();
        if (this.addressRippleForm.valid) {
            let country = new Country();
            this.countryService.updateCountry(country, countryCode).subscribe(response => {
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success)
                this.editCountry = false;
            });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)

        }
    }

    saveCountry() {
        if (this.editCountry) {
            this.updateCountry(this.country.countryCode)
        } else {
            this.createCountry();
        }
    }

    deleteCountry(countryCode: string) {
        this.countryService.deleteCountry(countryCode).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getCountry(countryCode: string) {
        this.countryService.getCountry(countryCode).subscribe(country => {
            this.country = country;
            this.addressRippleForm.patchValue({});
        });
    }

    getCountrys() {
        this.countryService.getCountrys().subscribe(countrys => {
            console.log(countrys);
            this.countrys = countrys;
        });
    }

    createMemberMaster() {
        this.formValidation.validateForm();
        if (this.addressRippleForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.addressLine1 = this.addressRippleForm.get('addr1').value;
            memberMaster.addressLine2 = this.addressRippleForm.get('addr2').value;
            memberMaster.city = this.addressRippleForm.get('city').value;
            memberMaster.state = this.addressRippleForm.get('state').value;
            memberMaster.zipCode = this.addressRippleForm.get('zipCode').value;
            memberMaster.country = this.addressRippleForm.get('country').value;
            memberMaster.homePhoneNumber = this.addressRippleForm.get('homePh').value;
            console.log(memberMaster);
             this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                 this.toastService.showToast('Record successfully created', NgbToastType.Success);
                 this.editMemberMaster = false;
                });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    updateMemberMaster(seqMembId: number) {
        this.formValidation.validateForm();
        if (this.addressRippleForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.addressLine1 = this.addressRippleForm.get('addr1').value;
            memberMaster.addressLine2 = this.addressRippleForm.get('addr2').value;
            memberMaster.city = this.addressRippleForm.get('city').value;
            memberMaster.state = this.addressRippleForm.get('state').value;
            memberMaster.zipCode = this.addressRippleForm.get('zipCode').value;
            memberMaster.homePhoneNumber = this.addressRippleForm.get('homePh').value;
            memberMaster.country = this.addressRippleForm.get('country').value;
            this.memberMasterService.updateMemberMasterV2(memberMaster, seqMembId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editMemberMaster = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveMemberMaster() {
        if (this.editMemberMaster) {
            this.updateMemberMaster(this.memberMaster.seqMembId)
        } else {
            this.createMemberMaster();
        }
    }

    deleteMemberMaster(seqMembId: number) {
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.addressRippleForm.patchValue({
                'addr1': this.memberMaster.addressLine1,
                'addr2': this.memberMaster.addressLine2,
                'city': this.memberMaster.city,
                'state': this.memberMaster.state,
                'zipCode': this.memberMaster.zipCode,
                'homePh': this.memberMaster.homePhoneNumber,
                'country': this.memberMaster.country
            });
        });
    }

    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
            this.memberMasters = memberMasters;
        });
    }



    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.addressRippleForm = this.formBuilder.group({
            addr1: ['', { updateOn: 'blur', validators: [] }],
            addr2: ['', { updateOn: 'blur', validators: [] }],
            city: ['', { updateOn: 'blur', validators: [] }],
            state: ['', { updateOn: 'blur', validators: [] }],
            zipCode: ['', { updateOn: 'blur', validators: [] }],
            homePh: ['', { updateOn: 'blur', validators: [] }],
            country: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    goToPageList() {
        this.close();
        this.router.navigate(['/page-list']);
    }


    loadAddressRipple(){
        this.addressRippleForm.patchValue({
            'addr1': this.memberAddress.addressLine1,
            'addr2': this.memberAddress.addressLine2,
            'city': this.memberAddress.city,
            'state': this.memberAddress.state,
            'zipCode': this.memberAddress.zipCode,
            'homePh': this.memberAddress.homePhoneNumber,
            'country': this.memberAddress.country
        });
    }


    updateMemberAddress() {
        this.formValidation.validateForm();
        if (this.addressRippleForm.valid) {
            let memberAddress = this.getUpdateFormData();
            this.memberAddressService.updateMemberAddress(memberAddress, this.seqMemId, this.memberAddress.memberAddressPrimaryKey.addressType).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
               this.editMemberMaster = false;
               this.emitResponse.emit(response);
               this.close();  
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    

    getUpdateFormData(): MemberAddress {
        let memberAddress = new MemberAddress();
        memberAddress.seqMembId = this.seqMemId;
        memberAddress.addressType = Form.getValue(this.addressRippleForm, 'addrType');
        memberAddress.lastName = Form.getValue(this.addressRippleForm, 'lastName');
        memberAddress.firstName = Form.getValue(this.addressRippleForm, 'firstName');
        memberAddress.addressLine1 = Form.getValue(this.addressRippleForm, 'addr1');
        memberAddress.addressLine2 = Form.getValue(this.addressRippleForm, 'addr2');
        memberAddress.city = Form.getValue(this.addressRippleForm, 'city');
        memberAddress.state = Form.getValue(this.addressRippleForm, 'state');
        memberAddress.country = Form.getValue(this.addressRippleForm, 'country');
        memberAddress.zipCode = Form.getValue(this.addressRippleForm, 'zipCode');
        memberAddress.email = Form.getValue(this.addressRippleForm, 'email');
        memberAddress.homePhoneNumber = Form.getValue(this.addressRippleForm, 'homePh');
        memberAddress.mobilePhone = Form.getValue(this.addressRippleForm, 'mobilePh');
        memberAddress.busPhoneNumber = Form.getValue(this.addressRippleForm, 'busPh');
        memberAddress.fax = Form.getValue(this.addressRippleForm, 'faxNum');
        memberAddress.beneficiaryRelCode = Form.getValue(this.addressRippleForm, 'benRefCode');
        memberAddress.beneficiaryGender = Form.getValue(this.addressRippleForm, 'benGender');
        memberAddress.beneficiaryDob = Form.getValue(this.addressRippleForm, 'benDob');
        memberAddress.memAddrUserDefined1 = Form.getValue(this.addressRippleForm, 'userDefine1');
        memberAddress.memAddrUserDefined2 = Form.getValue(this.addressRippleForm, 'userDefine2');
        memberAddress.memAddrUserDate1 = Form.getValue(this.addressRippleForm, 'userDate1');
        memberAddress.memAddrUserDate2 = Form.getValue(this.addressRippleForm, 'userDate2');
        return memberAddress;
    }

    close(){
        this.activeModal.dismiss();
    }

}
