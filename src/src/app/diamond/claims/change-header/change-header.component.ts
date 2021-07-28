import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { SecUser, SecWin } from '../../../api-models';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  @Input() showIcon: boolean;
  @Input() winId: string;
  changeHeaderForm: FormGroup;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  secWin: SecWinViewModel;
  userTemplateId: string;
  isSuperUser = false;
  secProgress = true;
  secColDetails = new Array<SecColDetail>();
  formValidation: FormValidation;
  isChildModalOpen: boolean;
  shortcuts: ShortcutInput[] = [];
  inProgress: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private securityService: SecurityService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private toastService: ToastService,
    private modalService: NgbModal,
    private router: Router,
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
  ) { }

  ngOnInit(): void {
    this.hasPermission();
  }

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
    this.secWinService.getSecWin(this.winId, secUserId).subscribe((secWin: SecWin) => {
      this.secWin = new SecWinViewModel(secWin);
      if (this.secWin.hasSelectPermission()) {
        this.secProgress = false;

        this.initializeComponentState();
      } else {
        this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
      }
    }, error => {
      this.secProgress = false;
    });
  }

  /**
   * Get Security Column Details
   */
  getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
      this.inProgress = false;
      return;
    }
    this.secColDetailService.findByTableNameAndUserId('', secUser.userId).subscribe((resp: SecColDetail[]) => {
      this.secColDetails = resp;
      this.inProgress = false;
      this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });
  }


  private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.changeHeaderForm);
  }

  createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.changeHeaderForm = this.formBuilder.group({
      zip: ['', { updateOn: 'blur', validators: [] }],
      vendor: ['', { updateOn: 'blur', validators: [] }],
      addr: ['', { updateOn: 'blur', validators: [] }],
      provider: ['', { updateOn: 'blur', validators: [] }],
      memberId: ['', { updateOn: 'blur', validators: [] }],
      thruDate: ['', { updateOn: 'blur', validators: [] }],
      svcDate: ['', { updateOn: 'blur', validators: [] }],
      address: ['', { updateOn: 'blur', validators: [] }],
    }, { updateOn: 'submit' });
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === 'yes') {
      console.log('button yes has been click!');
    }
    if (button.name === 'no') {
      console.log('button No has been click!');
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
}
