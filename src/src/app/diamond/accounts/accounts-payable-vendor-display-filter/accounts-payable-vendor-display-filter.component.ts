import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {SearchModel} from "../../../shared/models/models";
import {CustomerSelectLookup} from "../../../shared/lookup/customer-select-lookup";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SecurityService} from "../../../shared/services/security.service";
import {ToastService} from "../../../shared/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {DddwDtlService, DddwHdrService, SecUserService} from "../../../api-services";
import {SecUser, SecWin} from "../../../api-models";
import {CONSTANTS} from "../../../shared/services/shared.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {VendorMasterLookup} from "../../../shared/lookup/vendor-master-lookup";

@Component({
  selector: 'app-accounts-payable-vendor-display-filter',
  templateUrl: './accounts-payable-vendor-display-filter.component.html',
  styleUrls: ['./accounts-payable-vendor-display-filter.component.css']
})
export class AccountsPayableVendorDisplayFilterComponent implements OnInit {

  // The form model used by the view per Angular Reactive Forms
  // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
  accountsPayableVendorFilterForm: FormGroup;
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
  @Output() filterData = new EventEmitter<any>();

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
      private secUserService: SecUserService,
      private dddwDtlService: DddwDtlService,
      public activeModal: NgbActiveModal,
      private dddwHdrService: DddwHdrService,

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
    this.formValidation = new FormValidation(this.accountsPayableVendorFilterForm);
    this.populateDDW()
    // this.getCustomerType();
    // this.checkCustomerType();
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
    // this.accountsPayableVendorFilterForm.controls['customerType'].valueChanges.subscribe((customerType: string) => {
    //   if (customerType) {
    //     this.customer = customerType;
    //   }
    // });
  }


  onLookupFieldChange(event, id) {
    if (event.key === 'F5') {
      event.preventDefault();
      this.openLookupFieldSearchModel();
    } else if (event.key === 'Tab') {
      event.preventDefault();
    }
  }

  searchModel = new SearchModel('vendormasters/lookup',
      VendorMasterLookup.VENDOR_MASTER_ALL,
      VendorMasterLookup.VENDOR_MASTER_DEFAULT,
      []);


  /**
   * Generic Search Model
   */
  openLookupFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {

      console.log(res);

      this.vendorAddresses = res.vendorAddresses

      this.accountsPayableVendorFilterForm.patchValue({
        'vendorId': res.vendorId
      });
      this.popUpMessage = null;
    });
  }

  onSubmitForm(screenName: string) {
    this.formValidation.validateForm();
    if (this.accountsPayableVendorFilterForm.valid) {
      let data: any = null;
      data = {
        vendorId: this.accountsPayableVendorFilterForm.get('vendorId').value,
        vendorAddress: this.accountsPayableVendorFilterForm.get('vendorAddress').value,
        diamondId: this.accountsPayableVendorFilterForm.get('diamondId').value,
        claimType: this.accountsPayableVendorFilterForm.get('claimType').value,
        processingStatus: this.accountsPayableVendorFilterForm.get('processingStatus').value,
        providerId: this.accountsPayableVendorFilterForm.get('providerId').value,
        selectForPayment: this.accountsPayableVendorFilterForm.get('selectForPayment').value,
        screenID: screenName,
      };
      this.filterData.emit(data);
      this.activeModal.close();
    } else {
      this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
    }
  }

  backToScreen() {
    this.activeModal.close();
  }

  createForm() {
    this.accountsPayableVendorFilterForm = this.formBuilder.group({
      vendorId: ['', {updateOn: 'blur', validators: [Validators.required]}],
      enteredDate: ['', {updateOn: 'blur', validators: []}],
      vendorAddress: ['', {updateOn: 'blur', validators: []}],
      diamondId: ['', {updateOn: 'blur', validators: []}],
      claimType: ['', {updateOn: 'blur', validators: [Validators.required]}],
      subscriberId: ['', {updateOn: 'blur', validators: []}],
      processingStatus: ['', {updateOn: 'blur', validators: []}],
      providerId: ['', {updateOn: 'blur', validators: []}],
      selectForPayment: ['', {updateOn: 'blur', validators: []}],
      fromDOS: ['', {updateOn: 'blur', validators: []}],
      checkNumber: ['', {updateOn: 'blur', validators: []}],
      thruDOS: ['', {updateOn: 'blur', validators: []}],
      checkDate: ['', {updateOn: 'blur', validators: []}]
    }, {updateOn: 'submit'});
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public fileTypes: any[];
  public processingStatus: any[];
  public selectForPayment: any[];
  public vendorAddresses: any[];


  populateDDW() {
    this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
    ('claim_file_type', 'dw_apvds_open', 0).subscribe((res: any) => {
      this.fileTypes = res;
    });

    this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
    ('processing_status', 'dw_apvds_open', 0).subscribe((res: any) => {
      this.processingStatus = res;
    });

    this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId
    ('select_for_pymt' , 'dw_apvds_open', 0).subscribe((res: any) => {
      this.selectForPayment = res;
    });

  }

  resetForm() {
    this.accountsPayableVendorFilterForm.reset();
  }
}
