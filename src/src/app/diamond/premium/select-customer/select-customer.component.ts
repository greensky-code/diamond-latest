/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
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
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SearchModel} from '../../../shared/models/models';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {CONSTANTS} from '../../../shared/services/shared.service';
import {NgbToastType} from 'ngb-toast';
import {DatePipe} from '@angular/common';
import {CountryService} from '../../../api-services/country.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {CustomerSelectLookup} from '../../../shared/lookup/customer-select-lookup';
import { PmbArCustomerMasterService } from '../../../api-services/pmb-ar-customer-master.service';

// Use the Component directive to define the SelectCustomerComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'memberutilizationdisplay',
    templateUrl: './select-customer.component.html',
    styleUrls: ['./select-customer.component.css'],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DddwDtlService,
        CountryService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
        PmbArCustomerMasterService
    ]
})

export class SelectCustomerComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    customerSelectForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    customerTypes: any[] = [];
    customer: any;
    userTemplateId: string;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Output() customerData = new EventEmitter<any>();

    searchModel = new SearchModel(
        'pmbarcustomermasters/lookup',
        CustomerSelectLookup.CUSTOMER_SELECT_ALL,
        CustomerSelectLookup.CUSTOMER_SELECT_DEFAULT,
        []
    );

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
            private messageService: MessageMasterDtlService,

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
        private secUserService: SecUserService,
        private dddwDtlService: DddwDtlService,
        public activeModal: NgbActiveModal,
        private pmbArCustomerMasterService: PmbArCustomerMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.customerSelectForm);
        this.getCustomerType();
        this.checkCustomerType();
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

    getCustomerType() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.CUSTOMER_TYPE, CONSTANTS.DW_BLHST_RESPONSE)
            .subscribe(
                (customer) => {
                    this.customerTypes = customer;
                }
            );
    }

    checkCustomerType() {
        this.customerSelectForm.controls['customerType'].valueChanges.subscribe((customerType: string) => {
            if (customerType) {
                this.customer = customerType;
            }
        });
    }


    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            // event.preventDefault();
            this.getPmbArCustomerMaster(id, this.customerSelectForm.get('customerType').value);
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.customerSelectForm.patchValue({
                'shortname': res.shortName,
                'customerId': res.pmbArCustomerMasterPrimaryKey.customerId
            });
            this.popUpMessage = null;
        });
    }

    onSubmitForm() {
        this.formValidation.validateForm();
        if (this.customerSelectForm.valid) {
            let data: any = null;
            data = {
                customerType: this.customerSelectForm.get('customerType').value,
                customerTypeName: this.customerTypes.find(value =>
                    value.dddwDtlPrimaryKey.dataVal == this.customerSelectForm.get('customerType').value).dddwDtlPrimaryKey.displayVal,
                customerId: this.customerSelectForm.get('customerId').value,
                bilFrom: this.customerSelectForm.get('bilFrom').value,
                shortname: this.customerSelectForm.get('shortname').value,
                billThrough: this.customerSelectForm.get('billThrough').value
            };
            this.customerData.emit(data);
            this.activeModal.close();
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    backToScreen() {
        this.activeModal.close();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.customerSelectForm = this.formBuilder.group({
            customerType: ['', {updateOn: 'blur', validators: [Validators.required]}],
            customerId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            bilFrom: ['', {updateOn: 'blur', validators: []}],
            shortname: ['', {updateOn: 'blur', validators: []}],
            billThrough: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getPmbArCustomerMaster(customerId: string, customerType: string) {
        this.pmbArCustomerMasterService
          .getPmbArCustomerMaster(customerId, customerType)
          .subscribe(
            (pmbArCustomerMaster) => {
                if (pmbArCustomerMaster){
                  this.customerSelectForm.patchValue({
                    customerId: customerId,
                    shortname: pmbArCustomerMaster.shortName,
                  });
                }else{
                     this.messageService
                       .findByMessageId(1090)
                       .subscribe((message: MessageMasterDtl[]) => {
                         this.showPopUp(
                           message[0].messageText,
                           "Select Customer"
                         );
                       });
                }
            },
            (error) => {
              this.messageService
                .findByMessageId(1090)
                .subscribe((message: MessageMasterDtl[]) => {
                  this.showPopUp(message[0].messageText, "Select Customer");
                });
            }
          );
          }
               
    
}
