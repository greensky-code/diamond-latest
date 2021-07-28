import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CiebAddressEmail } from '../../../../api-models/addon/cieb-address-email.model';
import { AddressEmailFields, AddressEmailFormConfig } from '../../../../shared/models/constants';
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES, Menu, Option } from '../../../../shared/models/models';

import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../../shared/validators/custom-validator';
import {
  CiebAddressEmailCodeService,
} from '../../../../api-services/addon/cieb-address-email.service';
import {
  SecUserService
} from '../../../../api-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecWinService } from '../../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../../shared/components/alert-message';
import { SecurityService } from '../../../../shared/services/security.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { SecUser, SecWin } from '../../../../api-models';
import { SecColDetail } from '../../../../api-models/security/sec-col-detail.model';
import { PopUpMessage, PopUpMessageButton, MessageType } from '../../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { Form } from '../../../../shared/helpers/form.helper';
import { FormValidation } from '../../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../../view-model/security/sec-win-view-model';
import { CiebEmailCode } from '../../../../api-models/addon/cieb-email-code.model';
import { DatePickerConfig, DatePickerModel } from '../../../../shared/config';
import { SecColDetailService } from '../../../../api-services/security/sec-col-detail.service';

@Component({
  selector: 'app-address-email',
  templateUrl: './address-email.component.html',
  styleUrls: ['./address-email.component.css'],
  providers: [
    DatePipe,
    Mask,
    CustomValidators,
    DateFormatPipe,
    CiebAddressEmailCodeService,
  ]
})
export class AddressEmailComponent implements OnInit {
  private windowId: string = 'AOADEML';
  public secWin: SecWinViewModel;
  ciebAddressEmail: CiebAddressEmail;
  ciebAddressEmails: CiebAddressEmail[];
  emailCodeOptions = new Array<Option>();
  //seqMemId=1759972;

  @Input() seqMembId: number;

  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public isSuperUser = false;
  public secProgress = true;
  private inProgress: boolean;
  private secColDetails: SecColDetail[];
  addressEmailFormConfig = AddressEmailFormConfig;
  addressEmailFormState = new Array<DynamicConfigFormRow>();
    resetAllButton: string = 'Reset All';
    saveChangeButton: string = 'Save Changes';
  resetAddressEmailGrid() {
    this.addressEmailFormState = new Array<DynamicConfigFormRow>();
    this.addressEmailFormConfig = AddressEmailFormConfig;
    this.addressEmailFormConfig.map((field) => {
      if (field.name == AddressEmailFields.EMAIL_TYPE) {
        field.options = this.emailCodeOptions;
      }
    });

  }


  constructor(
    private ciebAddressEmailCodeService: CiebAddressEmailCodeService,
    private secUserService: SecUserService,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private toastr: ToastService,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private router: Router,
    private secColDetailService: SecColDetailService,
    private datePipe: DatePipe,
  ) { }

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


  createCiebStreetAddress() {
  }


  updateCiebAddressEmail(ciebAddressEmail: CiebAddressEmail, seqEmailAddId: number) {
    this.ciebAddressEmailCodeService.updateCiebAddressEmailCode(ciebAddressEmail, seqEmailAddId).subscribe(response => {
      this.toastr.showToast('Record successfully Updated.', NgbToastType.Success);
    });
  }

  saveCiebAddressEmail(ciebAddressEmail: CiebAddressEmail) {
    this.ciebAddressEmailCodeService.createCiebAddressEmailCode(ciebAddressEmail).subscribe(response => {
      this.toastr.showToast('Record successfully Created.', NgbToastType.Success);
    });
  }

  deleteCiebAddressEmail(seqEmailAddId: number) {
    if (!(this.secWin && this.secWin.hasDeletePermission())) {
      this.showPopUp('Not permitted to delete', 'Group Master Security');
    } else {
      this.ciebAddressEmailCodeService.deleteCiebAddressEmailCode(seqEmailAddId).subscribe(response => {
        this.toastr.showToast('Record successfully deleted.', NgbToastType.Success);
      });
    }
  }

  getCiebAddressEmail(seqEmailAdd: number) {
    this.ciebAddressEmailCodeService.getCiebAddressEmailCode(seqEmailAdd).subscribe(ciebAddressEmail => {
      this.ciebAddressEmail = ciebAddressEmail;
    });
  }

  getCiebAddressEmails() {
    this.ciebAddressEmailCodeService.getCiebAddressEmailCodes().subscribe(ciebAddressEmails => {
      this.ciebAddressEmails = ciebAddressEmails;
      this.populateAddressEmailDynamicForm()
    });
  }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
  // rather than in the constructor for this class in order to ensure that the
  // resources are fully loaded before performing the initial setup processing.
  ngOnInit(): void {
    this.initializePermission();
    this.getEmailCodes();
    this.createForm();
    this.displayMessage = {};
    //this.formValidation = new FormValidation(this.addressPrimaryMailingForm);
  }

  private getEmailCodes() {
    this.ciebAddressEmailCodeService.getCiebEmailCodes().subscribe(codes => {
      codes.forEach((f: any) => {
        if (f.value === 'Primary') {
          f.value = 'Primary E-mail';
        } else if (f.value === 'Other') {
          f.value = 'Other E-mail';
        } else {
          f.value = 'CORPORATE E-mail';
        }
        this.emailCodeOptions.push({ key: f.value, value: f.key })
      });
      this.getCiebAddressEmails();
    });
  }

  setPopupMessage(message: string, messageType: MessageType = MessageType.ERROR, title = 'Error') {
    this.popUpMessage = {
        message: message,
        title: title,
        messageType: messageType,
        name: 'error',
        buttons: [],
        buttonHeaderClass: '',
        icon: 'info',
        displayCloseBtn: true
    };
}

  onAddressEmailNewRowAdded(event: any) {
    const prevState: Array<DynamicConfigFormRow> = event.prevState;
    event.form.controls.fields.controls[event.index - 1].enable(); //enable fields of new Row
    prevState[prevState.length - 1].showCancelButton = true;
    prevState[prevState.length - 1].showSaveButton = true;
    this.addressEmailFormConfig.map((field) => {
      if (field.name == AddressEmailFields.EMAIL_TYPE) {
        field.options = this.emailCodeOptions;
      }
    });
  }

  populateAddressEmailDynamicForm() {

    const values = this.ciebAddressEmails;
    this.resetAddressEmailGrid()
    if (!values || values.length < 1) {
      return;
    }
    values.forEach((value: CiebAddressEmail) => {
      let mockConfig = this.getConfigCopy(this.addressEmailFormConfig);    // make a copy of original config
      this.addressEmailFormConfig.forEach((field, index) => {
        if (field.name === AddressEmailFields.EMAIL_TYPE) {
          mockConfig[index].value = value.emailCode;
        } else if (field.name === AddressEmailFields.EMAIL_ADDR) {
          mockConfig[index].value = value.emailAddress;
        } else if (field.name === AddressEmailFields.EFF_DATE) {
          mockConfig[index].value = value.effDate;
        } else if (field.name === AddressEmailFields.TERM_DATE) {
          mockConfig[index].value = value.termDate;
        } else if (field.name === AddressEmailFields.SEQ_EMAIL_ADD) {
          mockConfig[index].value = value.seqEmailAdd;
        } else if (field.name === AddressEmailFields.SEQ_ENTITY_ID) {
          mockConfig[index].value = value.seqEntityId;
        }
      });

      let formState: FormRow = new FormRow();
      formState.formFields = mockConfig;
      formState.action = null;
      formState.id = {
        medDefDetail: value,
      };
      this.addressEmailFormState.push(formState);          // add record
    });
    this.addressEmailFormConfig = this.getConfigCopy(this.addressEmailFormConfig);
    this.addressEmailFormState = JSON.parse(JSON.stringify(this.addressEmailFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
  }

  /**
     * Handle Pricing partner form details validations
     */
  formFieldValueChanged(event: any) {
    let field: FormField = event.formField;
    const index: number = event.index;
    let form: FormGroup = event.field;
    let value = form.value['emailType' + index.toString()];
    if (value === 'PRM') {
      this.showPopUp('Note: Adding a new active primary record will terminate any existing active primary records.', 'Message from webpage');
    }

    if (field.name === AddressEmailFields.EFF_DATE + index) {  /// -------------------------validate eff date
      if (this.isValidDate(field.value)) {
        this.setPopupMessage('Incorrect Effective Date format');
        return;
      }
      this.setPopupMessage(null);
    } else if (field.name === AddressEmailFields.TERM_DATE + index) {  /// -------------------------validate eff date
      if (this.isValidDate(field.value)) {
        this.setPopupMessage('Incorrect Term Date format');
        return;
      }
      this.setPopupMessage(null);
    }
  }


  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.valueOf())
  }

  isEmail(search:string):boolean
    {
        var  serchfind:boolean;
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        serchfind = regexp.test(search);
        return serchfind
  }

  removeRecord(index: number) {
    console.log(index)
  }

  saveAddressEmailForm(event: any) {
    const prevState = event.formState;
    this.addressEmailFormState = prevState
    event = event.fields;

    let apiValues = new Array<CiebAddressEmail>();
    this.addressEmailFormState.forEach((record, index) => {
      let dt = event[index];
      if (record.action != null) {
        if (record.action && record.action == FORM_FIELD_ACTION_TYPES.ADD) {
          let ciebAddressEmail = new CiebAddressEmail();
          const pair = Object.keys(event[index]).map(k => ({ key: k, value: dt[k] }));
          let apiValue: CiebAddressEmail = this.populateFormFields(ciebAddressEmail, pair, FORM_FIELD_ACTION_TYPES.ADD);
          apiValues.push(apiValue);
        } else if (record.action && (record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
          record.action == FORM_FIELD_ACTION_TYPES.DELETE)) {
          const pair = Object.keys(dt).map(k => ({ key: k, value: dt[k] }));
          let ciebAddressEmail: CiebAddressEmail = dt.id ? dt.id.data : new CiebAddressEmail();
          let apiValue: CiebAddressEmail = this.populateFormFields(ciebAddressEmail, pair, record.action);
          apiValues.push(apiValue);
        }
      }
    });

    let i=0;
    apiValues.forEach(value => {
      prevState[prevState.length - 1-i].showCancelButton = false;
      prevState[prevState.length - 1-i].showSaveButton = false;
      i=i+1;
      if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
        value.seqMemId = this.seqMembId;
        this.saveCiebAddressEmail(value)

      } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
        value.updateDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm');
        this.updateCiebAddressEmail(value, value.seqEmailAdd)
      }
    });
  }

  populateFormFields(ciebAddressEmail: CiebAddressEmail, event: any, action: FORM_FIELD_ACTION_TYPES): CiebAddressEmail {
    ciebAddressEmail.effDate = event[2].value;
    if (event[4].value) {
      ciebAddressEmail.seqEmailAdd = event[4].value
    }

    if (event[5].value) {
      ciebAddressEmail.seqEntityId = event[5].value
    }

    ciebAddressEmail.emailAddress = event[1].value;
    ciebAddressEmail.emailCode = event[0].value;

    // ----------------------- Dates conversion to format
    let termDate = (event[3].value.singleDate) ? event[4].value.singleDate.date : null;
    if (termDate) {
      ciebAddressEmail.termDate = termDate.year + '-' + this.addPrefixZero(termDate.month) + '-' + this.addPrefixZero(termDate.day);
    }

    let effectiveDate = (event[2].value.singleDate) ? event[2].value.singleDate.date : null;

    if (effectiveDate) {
      ciebAddressEmail.effDate = effectiveDate.year + '-' + this.addPrefixZero(effectiveDate.month) + '-' + this.addPrefixZero(effectiveDate.day);
    }

    ciebAddressEmail.action = action;

    return ciebAddressEmail;
  }

  getConfigCopy(config: any): FormField[] {
    return JSON.parse(JSON.stringify(config));
  }

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('CIEB_EMAIL_ADDRESS', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

  }

  public addPrefixZero(value: any) {
    return (value < 10) ? ('0' + value) : value;
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
          this.secProgress = false;

        } else {
          this.secProgress = false;

          this.showPopUp(
            'You are not Permitted to view Address Email',
            'Address Email Permission'
          );
        }
      }
    );
  }

  /**
   * get all user permission for page
   * if permissions to select exist then initialize page
   */
  hasPermission() {
    this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
    if (this.isSuperUser) {
      this.secProgress = false;
      return;
    }

    let userId = null;

    const parsedToken = this.securityService.getCurrentUserToken();
    if (parsedToken) {
      userId = parsedToken.sub;
    }
    this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
      this.getSecColDetails(user);
      this.getSecWin(user.dfltTemplate);
    });
  }

  createForm() {

  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  // Use a FormBuilder to create a FormGroup to define the Form Model for the view

  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    let userId: string;
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
    //this.formValidation = new FormValidation(this.addressPrimaryMailingForm);
  }
}
