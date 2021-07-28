/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {ToastService} from '../../../shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {BankAccountService, DddwDtlService, SecUserService} from '../../../api-services';
import {SearchModel} from '../../../shared/models/models';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {CONSTANTS} from '../../../shared/services/shared.service';
import {BankAccountLookup} from '../../../shared/lookup/bank-account-lookup';
import {VendorMasterLookup} from '../../../shared/lookup/vendor-master-lookup';
import {Form} from '../../../shared/helpers/form.helper';


@Component({
    selector: 'checkregisterfilter',
    templateUrl: './check-register-filter-data.component.html',
    styleUrls: ['./check-register-filter-data.component.scss']
})

export class CheckRegisterFilterComponent implements OnInit {


    checkRegisterFilterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    checkTypes: any[] = [];
    statuses: any[] = [];
    customer: any;
    userTemplateId: string;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Output() filterData = new EventEmitter<any>();
    bankAccountSearchModel = new SearchModel(
        'bankaccounts/lookup',
        BankAccountLookup.BANK_ACCOUNT_ALL,
        BankAccountLookup.BANK_ACCOUNT_DEFAULT,
        []
    );
    vendorSearchModel = new SearchModel(
        'vendormasters/lookup',
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );
    private windowId = '';

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
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private bankAccountService: BankAccountService,
        private secUserService: SecUserService,
        private dddwDtlService: DddwDtlService,
        public activeModal: NgbActiveModal
    ) {
    }


    ngOnInit(): void {
        this.hasPermission();
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
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
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
            // this.getSecColDetails(user);
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
                this.secProgress = false;
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view', 'Member Utilization Display')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    getCheckType() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.TYPE, CONSTANTS.DW_CHECK_RESPONSE)
            .subscribe(
                (types) => {
                    this.checkTypes = types;
                }
            );
    }

    getStatus() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.STATUS, CONSTANTS.DW_CHECK_RESPONSE)
            .subscribe(
                (statuses) => {
                    this.statuses = statuses;
                }
            );
    }

    onBankAccountLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openBankAccountLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getBankAccount(id);
        }
    }

    getBankAccount(code: string) {
        this.bankAccountService.getBankAccount(code).subscribe(
            (bankAccount) => {
                if (bankAccount) {
                    this.checkRegisterFilterForm.patchValue({
                        'bankAccount': bankAccount.bankAccountCode,
                        'bankName': bankAccount.description
                    });
                } else {
                    this.showPopUp('6188: Invalid Bank Account Code entered',
                        'Check Register Filter Data');
                    this.checkRegisterFilterForm.patchValue({
                        'bankAccount': null,
                        'bankName': null
                    });
                }
            },
            (error) => {
                this.showPopUp('6188: Invalid Bank Account Code entered',
                    'Check Register Filter Data');
                this.checkRegisterFilterForm.patchValue({
                    'bankAccount': null,
                    'bankName': null
                });
            }
        );
    }

    onVendorLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openVendorLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
        }
    }

    /**
     * Generic Search Model
     */
    openBankAccountLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.bankAccountSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.checkRegisterFilterForm.patchValue({
                'bankAccount': res.bankAccountCode,
                'bankName': res.description
            });
            this.popUpMessage = null;
        });
    }

    /**
     * Generic Search Model
     */
    openVendorLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.checkRegisterFilterForm.patchValue({
                'vendor': res.vendorId,
            });
            this.popUpMessage = null;
        });
    }

    onSubmitForm() {
        this.formValidation.validateForm();
        if (this.checkRegisterFilterForm.valid) {
            let data: any = null;
            data = {
                remittanceId: this.checkRegisterFilterForm.get('remittanceId').value,
                bankAccount: this.checkRegisterFilterForm.get('bankAccount').value,
                bankName: this.checkRegisterFilterForm.get('bankName').value,
                checkType: this.checkRegisterFilterForm.get('checkType').value,
                from: this.checkRegisterFilterForm.get('from').value,
                thru: this.checkRegisterFilterForm.get('thru').value,
                vendor: this.checkRegisterFilterForm.get('vendor').value,
                paymentDate: Form.getDatePickerValue(this.checkRegisterFilterForm, 'paymentDate'),
                status: this.checkRegisterFilterForm.get('status').value,
            };
            this.filterData.emit(data);
            this.activeModal.close();
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    backToScreen() {
        this.activeModal.close();
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.checkRegisterFilterForm = this.formBuilder.group({
            remittanceId: ['', {updateOn: 'blur', validators: []}],
            bankAccount: ['', {updateOn: 'blur', validators: [Validators.required]}],
            bankName: ['', {updateOn: 'blur', validators: []}],
            checkType: ['', {updateOn: 'blur', validators: []}],
            from: ['', {updateOn: 'blur', validators: []}],
            thru: ['', {updateOn: 'blur', validators: []}],
            vendor: ['', {updateOn: 'blur', validators: []}],
            paymentDate: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.checkRegisterFilterForm);
        this.getCheckType();
        this.getStatus();
    }
}
