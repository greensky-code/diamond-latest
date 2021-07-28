import { ChangeDetectorRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import { MessageMasterDtl, SecUser, SecWin } from '../../../api-models';
import { GeneralLedgerReference } from '../../../api-models/general-ledger-reference.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { CompanyMasterService, MessageMasterDtlService, SecUserService } from '../../../api-services';
import { GeneralLedgerReferenceService } from '../../../api-services/general-ledger-reference.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { CompanyMasterLookup } from '../../../shared/lookup/company-master-lookup';
import { GlReferenceLookup } from '../../../shared/lookup/gl-reference-lookup';
import { Menu, SearchModel } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { getGlReferenceComponentShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { TimestampComponent } from "../../../shared/components/timestamp/timestamp.component";
import {SupportHelpComponent} from "../support-help/support-help.component";

@Component({
  selector: 'app-gl-reference',
  templateUrl: './gl-reference.component.html',
  styleUrls: ['./gl-reference.component.css']
})
export class GlReferenceComponent implements OnInit {

  glReferenceForm: FormGroup;
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
  lookupAction: number = 1;

  editGeneralLedgerReference: boolean = false;
  generalLedgerReference: GeneralLedgerReference;
  generalLedgerReferences: GeneralLedgerReference[];
  inProgress = true;
  userTemplateId: string;
  secColDetails = new Array<SecColDetail>();


  public shortcuts: ShortcutInput[] = [];
  @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
  @Input() showIcon: boolean = false;

  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;


  countryMasterSearchMdel = new SearchModel(
    'companymasters/lookup',
    CompanyMasterLookup.ALL,
    CompanyMasterLookup.DEFAULT,
    [],
    true
  );

  glReferenceSearchMdel = new SearchModel(
    'generalledgerreferences/lookup',
    GlReferenceLookup.ALL,
    GlReferenceLookup.DEFAULT,
    [],
    true
  );

  glReferenceCode: any;
  companyCode: any;
  glReferenceCodeStatus: boolean = false;
  companyCodeStatus: boolean = false;
  status: boolean = false;

  public menu: Menu[] = [];
  isReadOnly: boolean = false;
  isReadOnlyRef: boolean = false;
  screenCloseRequest: Boolean = false;
  isFormDataChangeStatus: Boolean = false;
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
      console.log("button yes has been click!");
    }
    if (button.name == 'no') {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }
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
    private generalLedgerReferenceService: GeneralLedgerReferenceService,
    private secColDetailService: SecColDetailService,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef,
    private messageService: MessageMasterDtlService,
    private companyMasterService: CompanyMasterService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hasPermission();
  }

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

  private initializeComponentState(): void {
    this.menuInit();
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.glReferenceForm);
  }


  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.glReferenceForm = this.formBuilder.group({
      companyCode: ['', { updateOn: 'blur', validators: [] }],
      glReferenceCode: ['', { updateOn: 'blur', validators: [] }],
      description: ['', { updateOn: 'blur', validators: [] }],
      debitGlNumber1: ['', { updateOn: 'blur', validators: [] }],
      intDebitGlNumber: ['', { updateOn: 'blur', validators: [] }],
      creditGlNumber1: ['', { updateOn: 'blur', validators: [] }],
      intCreditGlNumber: ['', { updateOn: 'blur', validators: [] }],
      debitGlNumber2: ['', { updateOn: 'blur', validators: [] }],
      dscntDebitGlNumber: ['', { updateOn: 'blur', validators: [] }],
      creditGlNumber2: ['', { updateOn: 'blur', validators: [] }],
      dscntCreditGlNumber: ['', { updateOn: 'blur', validators: [] }],
      prepaidExpAc: ['', { updateOn: 'blur', validators: [] }],
      penaltyExpenseAcc: ['', { updateOn: 'blur', validators: [] }],
      advPayPayableAcc: ['', { updateOn: 'blur', validators: [] }],
      writeOffAcc: ['', { updateOn: 'blur', validators: [] }],
      penaltyPayableAcc: ['', { updateOn: 'blur', validators: [] }],
      admFeeExpenseAcc: ['', { updateOn: 'blur', validators: [] }],
      incentiveExpenseAcc: ['', { updateOn: 'blur', validators: [] }],
      admFeePayableAcc: ['', { updateOn: 'blur', validators: [] }],
      incentivePayableAcc: ['', { updateOn: 'blur', validators: [] }],
      userDefined1: ['', { updateOn: 'blur', validators: [] }],
      userDefined2: ['', { updateOn: 'blur', validators: [] }],
      userDate1: ['', { updateOn: 'blur', validators: [] }],
      userDate2: ['', { updateOn: 'blur', validators: [] }]
    }, { updateOn: 'submit' });
    this.status = false;
    this.glReferenceCodeStatus = false;
    this.companyCodeStatus = false;
    this.isReadOnly = false;
    this.isReadOnlyRef = false;

  }

  private menuInit() {
    this.menu = [
      {
        menuItem: "File",
        dropdownItems: [
          { name: "New" },
          { name: "Open" },
          { name: "Delete" },
          { name: "Save" },
          { name: "Close" },
          { name: "-" },
          { name: "Main Menu..." },
          { name: "Shortcut Menu..." },
          { name: "Print", disabled: true },
          { isHorizontal: true },
          { name: "Exit" },
        ],
      },
      {
        menuItem: "Edit",
        dropdownItems: [
          { name: "Undo", disabled: true },
          { isHorizontal: true },
          { name: "Cut", disabled: true },
          { name: "Copy", disabled: true },
          { name: "Paste", disabled: true },
          { isHorizontal: true },
          { name: "Lookup" },
        ],
      },
      {
        menuItem: "Notes",
        dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
      },
      {
        menuItem: "Windows",
        dropdownItems: [
          { name: "Tile" },
          { name: "Layer" },
          { name: "Cascade" },
          { name: "Arrange Icons" },
          { isHorizontal: true },
          { name: "Show Timestamp" },
          { name: "Audit Display" },
          { isHorizontal: true },
          { name: "1 Main Menu" },
          { name: "2 G/L Reference" },
        ],
      },
      {
        menuItem: "Help",
        dropdownItems: [
          { name: "Contents" },
          { name: "Search for Help on..." },
          { name: "This Window", shortcutKey: 'F1' },
          { isHorizontal: true },
          { name: "Glossary" },
          { name: "Getting Started" },
          { name: "How to use Help" },
          { isHorizontal: true },
          { name: "About Diamond Client/Server" },
        ],
      },
    ];
  }


  public onMenuItemClick(event: any) {
    if (event.menu.menuItem === "File") {
      switch (event.action) {
        case "New": {
          this.createForm();
          this.isReadOnly = false;
          this.isReadOnlyRef = false;
          this.glReferenceCodeStatus = false;
          this.companyCodeStatus = false;
          break;
        }
        case "Open": {
          break;
        }
        case "Save": {
          this.saveGeneralLedgerReference();
          break;
        }
        case "Close": {
          break;
        }
        case "Shortcut Menu": {
          const ref = this.modalService.open(FunctionalGroupShortCutComponent);
          ref.componentInstance.showIcon = true;
          break;
        }
        default: {
          this.toastService.showToast(
            "Action is not valid",
            NgbToastType.Danger
          );
          break;
        }
      }
    } else if (event.menu.menuItem === "Edit") {
      // handle Edit-Menu Actions

    } else if (event.menu.menuItem === "Windows") {
      switch (event.action) {
        case "1 Main Menu": {
          this.router.navigate(["diamond/functional-groups"]);
          break;
        }
        case "Show Timestamp":
          this.showTimeStamp();
          break;
        case "Audit Display": {
          break;
        }
      }
    } else if (event.menu.menuItem == 'Help') {
        /**
         * Open help modal
         */
       this.helpScreen();
    }
  }



  createGeneralLedgerReference() {
    this.formValidation.validateForm();
    if (this.glReferenceForm.valid) {
      let generalLedgerReference = new GeneralLedgerReference();
      generalLedgerReference.generalLedgerReferencePrimaryKey.companyCode = Form.getValue(this.glReferenceForm, 'companyCode');
      generalLedgerReference.generalLedgerReferencePrimaryKey.glRefCode = Form.getValue(this.glReferenceForm, 'glReferenceCode');
      generalLedgerReference.description = Form.getValue(this.glReferenceForm, 'description');
      generalLedgerReference.debitGlNumber1 = Form.getValue(this.glReferenceForm, 'debitGlNumber1');
      generalLedgerReference.intDebitGlNumber = Form.getValue(this.glReferenceForm, 'intDebitGlNumber');
      generalLedgerReference.creditGlNumber1 = Form.getValue(this.glReferenceForm, 'creditGlNumber1');
      generalLedgerReference.intCreditGlNumber = Form.getValue(this.glReferenceForm, 'intCreditGlNumber');
      generalLedgerReference.debitGlNumber2 = Form.getValue(this.glReferenceForm, 'debitGlNumber2');
      generalLedgerReference.dscntCreditGlNumber = Form.getValue(this.glReferenceForm, 'dscntCreditGlNumber');
      generalLedgerReference.dscntDebitGlNumber = Form.getValue(this.glReferenceForm, 'dscntDebitGlNumber');
      generalLedgerReference.creditGlNumber2 = Form.getValue(this.glReferenceForm, 'creditGlNumber2');
      generalLedgerReference.advPayPrepaidExpenseAcc = Form.getValue(this.glReferenceForm, 'prepaidExpAc');
      generalLedgerReference.incentiveExpenseAcc = Form.getValue(this.glReferenceForm, 'incentiveExpenseAcc');
      generalLedgerReference.incentivePayableAcc = Form.getValue(this.glReferenceForm, 'incentivePayableAcc');
      generalLedgerReference.penaltyExpenseAcc = Form.getValue(this.glReferenceForm, 'penaltyExpenseAcc');
      generalLedgerReference.advPayPayableAcc = Form.getValue(this.glReferenceForm, 'advPayPayableAcc');
      generalLedgerReference.writeOffAcc = Form.getValue(this.glReferenceForm, 'writeOffAcc');
      generalLedgerReference.penaltyPayableAcc = Form.getValue(this.glReferenceForm, 'penaltyPayableAcc');
      generalLedgerReference.admFeeExpenseAcc = Form.getValue(this.glReferenceForm, 'admFeeExpenseAcc');
      generalLedgerReference.admFeePayableAcc = Form.getValue(this.glReferenceForm, 'admFeePayableAcc');
      generalLedgerReference.userDefined1 = Form.getValue(this.glReferenceForm, 'userDefined1');
      generalLedgerReference.userDefined2 = Form.getValue(this.glReferenceForm, 'userDefined2');
      generalLedgerReference.userDate1 = Form.getDatePickerValue(this.glReferenceForm, 'userDate1');
      generalLedgerReference.userDate2 = Form.getDatePickerValue(this.glReferenceForm, 'userDate2');
      this.generalLedgerReferenceService.createGeneralLedgerReference(generalLedgerReference).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully created.");
        this.editGeneralLedgerReference = false;
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
        }
        this.isFormDataChangeStatus = false;
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
      });

    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
  }



  updateGeneralLedgerReference(companyCode: string) {
    //if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.glReferenceForm.valid) {
      let generalLedgerReference = new GeneralLedgerReference();
      generalLedgerReference.companyCode = Form.getValue(this.glReferenceForm, 'companyCode');
      generalLedgerReference.glRefCode = Form.getValue(this.glReferenceForm, 'glReferenceCode');
      generalLedgerReference.description = Form.getValue(this.glReferenceForm, 'description');
      generalLedgerReference.debitGlNumber1 = Form.getValue(this.glReferenceForm, 'debitGlNumber1');
      generalLedgerReference.intDebitGlNumber = Form.getValue(this.glReferenceForm, 'intDebitGlNumber');
      generalLedgerReference.creditGlNumber1 = Form.getValue(this.glReferenceForm, 'creditGlNumber1');
      generalLedgerReference.intCreditGlNumber = Form.getValue(this.glReferenceForm, 'intCreditGlNumber');
      generalLedgerReference.debitGlNumber2 = Form.getValue(this.glReferenceForm, 'debitGlNumber2');
      generalLedgerReference.dscntCreditGlNumber = Form.getValue(this.glReferenceForm, 'dscntCreditGlNumber');
      generalLedgerReference.dscntDebitGlNumber = Form.getValue(this.glReferenceForm, 'dscntDebitGlNumber');
      generalLedgerReference.creditGlNumber2 = Form.getValue(this.glReferenceForm, 'creditGlNumber2');
      generalLedgerReference.advPayPrepaidExpenseAcc = Form.getValue(this.glReferenceForm, 'prepaidExpAc');
      generalLedgerReference.incentiveExpenseAcc = Form.getValue(this.glReferenceForm, 'incentiveExpenseAcc');
      generalLedgerReference.incentivePayableAcc = Form.getValue(this.glReferenceForm, 'incentivePayableAcc');
      generalLedgerReference.penaltyExpenseAcc = Form.getValue(this.glReferenceForm, 'penaltyExpenseAcc');
      generalLedgerReference.advPayPayableAcc = Form.getValue(this.glReferenceForm, 'advPayPayableAcc');
      generalLedgerReference.writeOffAcc = Form.getValue(this.glReferenceForm, 'writeOffAcc');
      generalLedgerReference.penaltyPayableAcc = Form.getValue(this.glReferenceForm, 'penaltyPayableAcc');
      generalLedgerReference.admFeeExpenseAcc = Form.getValue(this.glReferenceForm, 'admFeeExpenseAcc');
      generalLedgerReference.admFeePayableAcc = Form.getValue(this.glReferenceForm, 'admFeePayableAcc');
      generalLedgerReference.userDefined1 = Form.getValue(this.glReferenceForm, 'userDefined1');
      generalLedgerReference.userDefined2 = Form.getValue(this.glReferenceForm, 'userDefined2');
      generalLedgerReference.userDate1 = Form.getDatePickerValue(this.glReferenceForm, 'userDate1');
      generalLedgerReference.userDate2 = Form.getDatePickerValue(this.glReferenceForm, 'userDate2');
      this.generalLedgerReferenceService.updateGLReference(generalLedgerReference, companyCode).subscribe(response => {
        this.alertMessage = this.alertMessageService.info("Record successfully updated.");
        this.editGeneralLedgerReference = true;
        if (this.screenCloseRequest === true) {
          setTimeout(() => {
            this.activeModal.close();
          }, 2000);
        }
        this.isFormDataChangeStatus = false;
      }, error => {
        this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
      });
    } else {
      this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
    }
    // } else {
    //   this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
    // }
  }

  createNewGLReference() {
    let popUpMessage = new PopUpMessage('G/L Reference', 'G/L Reference',
      '6485: Entered GLREF record does not exist. Press Yes to create a new Record.', 'info', [], MessageType.ERROR);
    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
      if (resp.name === "Yes") {// save only if user presses Yes from Model
        let generalLedgerReference = new GeneralLedgerReference();
        generalLedgerReference.generalLedgerReferencePrimaryKey.companyCode = this.companyCode;
        generalLedgerReference.generalLedgerReferencePrimaryKey.glRefCode = this.glReferenceCode;
        this.setGeneralLedgerReferenceValues(generalLedgerReference);
        this.editGeneralLedgerReference = false;
        this.status = true;
        ref.close('form closed');

        //this.activeModal.close();
        //ref.close('form closed');
      } else if (resp.name === "No") {
        this.activeModal.close();
      } else if (resp.name === "Cancel") {
        ref.close('form closed');
      } // 3rd case: In case of cancel do nothing
    });
  }


  onLookupFieldChange(event: any) {
    if (event.key === 'F5') {
      event.preventDefault();
      switch (this.lookupAction) {
        case 1:
          this.openLookupCompanyMasterFieldSearchModel();
          break;
        case 2:
          this.openLookupGeneralLedgerFieldSearchModel();
          break;
      }
    } else if (event.key === 'Tab') {
      event.preventDefault();
      switch (this.lookupAction) {
        case 1:
          this.checkCompanyCodeExist(event);
          break;
        case 2:
          this.checkGlReferenceCodeExist(event);
          break;
      }

    }
  }

  changeCompanyCodeToUpperCase(event: any) {
    let companycode = event.target.value;
    this.companyCode = companycode.toUpperCase();
  }

  changeGlRefCodeToUpperCase(event: any) {
    let glReferenceCode = event.target.value;
    this.glReferenceForm.patchValue({
      glReferenceCode: glReferenceCode.toUpperCase()
    });
  }

  checkGlReferenceCodeExist(event: any) {
    this.glReferenceCode = event.target.value;
    this.generalLedgerReferenceService.findByGlRefCodeAndCompanyCode(this.glReferenceCode, this.companyCode).subscribe(generalLedgerReference => {
      if (generalLedgerReference.generalLedgerReferencePrimaryKey.glRefCode) {
        this.editGeneralLedgerReference = true;
        this.glReferenceCodeStatus = true;
        let generalLedgerReferenceObj = new GeneralLedgerReference();
        generalLedgerReferenceObj = generalLedgerReference;
        this.setGeneralLedgerReferenceValues(generalLedgerReferenceObj);
        this.status = true;
        this.isReadOnlyRef = true;
      } else {
        this.createNewGLReference();
        this.editGeneralLedgerReference = false;
        this.glReferenceCodeStatus = false;
        this.isReadOnlyRef = false;
      }
    }, error => {

    });
  }

  @ViewChild("glReferenceCode") glReferenceCodeElement: ElementRef;

  checkCompanyCodeExist(event: any) {
    let companyCode = event.target.value;
    this.companyMasterService.getCompanyMaster(companyCode).subscribe(
      (response) => {
          if (response) {
              this.companyCodeStatus = true;
              this.companyCode = companyCode;
              this.isReadOnly = true;
              this.glReferenceCodeElement.nativeElement.focus()
          } else {
              this.messageService.findByMessageId(6484).subscribe(res => {
                  this.showPopUp('6484: ' + res[0].messageText.replace('@1', companyCode), 'G/L Reference')
              });
              this.glReferenceForm.patchValue({
                  companyCode: ''
              });
              this.isReadOnly = false;
              this.companyCode = null;
              this.companyCodeStatus = false;
          }

      },
      (error) => {
      }
    );
  }


  openLookupCompanyMasterFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.countryMasterSearchMdel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      this.companyCode = res.companyCode;
      if (res) {
        this.glReferenceForm.patchValue({
          companyCode: this.companyCode
        });
        this.companyCodeStatus = true;
        this.isReadOnly = true;
        this.getGLReferenceDetail();
      }
    });
  }


  openLookupGeneralLedgerFieldSearchModel() {

    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.glReferenceSearchMdel;
    if (this.companyCode !== undefined) {
      ref.componentInstance.searchModel.searchOption = [{ 'generalLedgerReferencePrimaryKey.companyCode': this.companyCode }]
      ref.componentInstance.searchModel.isMatch = true;
    }
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
      if (res) {
        this.glReferenceCode = res.generalLedgerReferencePrimaryKey.glRefCode;
        this.companyCode = res.generalLedgerReferencePrimaryKey.companyCode;
        this.glReferenceForm.patchValue({
          glReferenceCode: this.glReferenceCode,
          companyCode: this.companyCode
        });
        this.isReadOnlyRef = true;
        this.glReferenceCodeStatus = true;
        this.getGLReferenceDetail();
      }
    });
  }


  getGLReferenceDetail() {
    if ((this.glReferenceCodeStatus === true) && (this.companyCodeStatus === true)) {
      this.generalLedgerReferenceService.findByGlRefCodeAndCompanyCode(this.glReferenceCode, this.companyCode).subscribe(generalLedgerReference => {
        this.editGeneralLedgerReference = true;
        let generalLedgerReferenceObj = new GeneralLedgerReference();
        generalLedgerReferenceObj = generalLedgerReference;
        this.status = true;
        this.setGeneralLedgerReferenceValues(generalLedgerReferenceObj);
      }, error => {
        this.status = false;
        this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        this.editGeneralLedgerReference = false;
      });
    }
  }

  setGeneralLedgerReferenceValues(generalLedgerReference: GeneralLedgerReference) {
    this.generalLedgerReference = generalLedgerReference;
    this.glReferenceForm.patchValue({
      'companyCode': generalLedgerReference.generalLedgerReferencePrimaryKey.companyCode,
      'glReferenceCode': generalLedgerReference.generalLedgerReferencePrimaryKey.glRefCode,
      'description': generalLedgerReference.description,
      'debitGlNumber1': generalLedgerReference.debitGlNumber1,
      'intDebitGlNumber': generalLedgerReference.intDebitGlNumber,
      'creditGlNumber1': generalLedgerReference.creditGlNumber1,
      'intCreditGlNumber': generalLedgerReference.intCreditGlNumber,
      'debitGlNumber2': generalLedgerReference.debitGlNumber2,
      'dscntCreditGlNumber': generalLedgerReference.dscntCreditGlNumber,
      'dscntDebitGlNumber': generalLedgerReference.dscntDebitGlNumber,
      'creditGlNumber2': generalLedgerReference.creditGlNumber2,
      'prepaidExpAc': generalLedgerReference.advPayPrepaidExpenseAcc,
      'incentiveExpenseAcc': generalLedgerReference.incentiveExpenseAcc,
      'incentivePayableAcc': generalLedgerReference.incentivePayableAcc,
      'penaltyExpenseAcc': generalLedgerReference.penaltyExpenseAcc,
      'advPayPayableAcc': generalLedgerReference.advPayPayableAcc,
      'writeOffAcc': generalLedgerReference.writeOffAcc,
      'penaltyPayableAcc': generalLedgerReference.penaltyPayableAcc,
      'admFeeExpenseAcc': generalLedgerReference.admFeeExpenseAcc,
      'admFeePayableAcc': generalLedgerReference.admFeePayableAcc,
      'userDefined1': generalLedgerReference.userDefined1,
      'userDefined2': generalLedgerReference.userDefined2,
      'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(generalLedgerReference.userDate1),
      'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(generalLedgerReference.userDate2),
    });
    this.isFormDataModified()
  }

  saveGeneralLedgerReference() {
    if (this.editGeneralLedgerReference) {
      this.updateGeneralLedgerReference(this.companyCode)
    } else {
      this.createGeneralLedgerReference();
    }
  }



  getGeneralLedgerReference(companyCode: string) {
    this.generalLedgerReferenceService.getGeneralLedgerReference(companyCode).subscribe(generalLedgerReference => {
      //this.generalLedgerReference = generalLedgerReference;
      this.glReferenceForm.patchValue({
        'companyCode': this.generalLedgerReference.companyCode,
        'glReferenceCode': this.generalLedgerReference.glRefCode,
        'creditAccount001': this.generalLedgerReference.creditGlNumber1,
        'creditAccount002': this.generalLedgerReference.creditGlNumber2,
        'expenseAccount001': this.generalLedgerReference.admFeeExpenseAcc,
        'payableAccount001': this.generalLedgerReference.admFeePayableAcc,
        'prepaidExpAc': this.generalLedgerReference.advPayPrepaidExpenseAcc,
        'expenseAccount002': this.generalLedgerReference.penaltyExpenseAcc,
        'payableAccount002': this.generalLedgerReference.advPayPayableAcc,
        'payableAccount003': this.generalLedgerReference.penaltyPayableAcc,
        'expenseAccount003': this.generalLedgerReference.incentiveExpenseAcc,
        'payableAccount004': this.generalLedgerReference.incentivePayableAcc,
        'userDefined1': this.generalLedgerReference.userDefined1,
        'userDefined2': this.generalLedgerReference.userDefined2,
        'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.generalLedgerReference.userDate1),
        'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.generalLedgerReference.userDate2),
      });
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    });
  }

  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });

  }

  getGeneralLedgerReferences() {
    this.generalLedgerReferenceService.getGeneralLedgerReferences().subscribe(generalLedgerReferences => {
      this.generalLedgerReferences = generalLedgerReferences;
    }, error => {
      this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
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
            'You are not Permitted to view Benefit Ruler',
            'Benefit Rule Permission'
          );
        }
      },
      (error) => {
        this.showPopUp(error, 'Window Error');
      }
    );
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }


  ngAfterViewInit(): void {
    this.shortcuts.push(...getGlReferenceComponentShortcutKeys(this));
    this.cdr.detectChanges();
  }

  setLookupAction(actionNo: number) {
    this.lookupAction = actionNo;
  }

  modalClose() {
    this.screenCloseRequest = true;
    if (this.isFormDataChangeStatus === true) {
      this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
        this.popupAlert(message[0].messageText, 'Company')
      })
    } else {
      this.activeModal.close();
    }
  }

  popupAlert = (message: string, title: string) => {
    try {
      if (!message) {
        return;
      }
      let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
      popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
      popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.showIcon = true;
      ref.componentInstance.popupMessage = popUpMessage;
      ref.componentInstance.buttonclickEvent.subscribe((resp) => {
        if (resp.name === 'Yes') {
          this.saveGeneralLedgerReference()
        }
        else if (resp.name === 'No') {
          this.router.navigateByUrl('/');
          if (this.screenCloseRequest === true) {
            this.activeModal.close();
          }
        }
      })
    }
    catch (e) {
      console.log(e);
    }
  };

  isFormDataModified() {
    this.glReferenceForm.valueChanges.subscribe(res => {
      this.isFormDataChangeStatus = true;
    })
  }

  private showTimeStamp = () => {
    let ref = this.modalService.open(TimestampComponent);
    ref.componentInstance.title = 'G/L Reference';
    ref.componentInstance.insertDateTime = this.generalLedgerReference['insertDatetime'];
    ref.componentInstance.insertProcess = this.generalLedgerReference['insertProcess'];
    ref.componentInstance.insertUser = this.generalLedgerReference['insertUser'];
    ref.componentInstance.updateUser = this.generalLedgerReference['updateUser'];
    ref.componentInstance.updateDateTime = this.generalLedgerReference['updateDatetime'];
    ref.componentInstance.updateProcess = this.generalLedgerReference['updateProcess'];
  };

  helpScreen = () => {
      const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
      viewModal.componentInstance.showIcon = true;
      viewModal.componentInstance.defaultFile = '/GLREF_General_Ledger_Reference_Codes.htm';
  }
}
