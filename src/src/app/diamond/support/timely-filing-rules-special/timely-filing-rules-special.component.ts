import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastType } from 'ngb-toast';
import { AlertMessageService } from '../../../shared/components/alert-message';
import { AlertMessage } from '../../../shared/components/alert-message/alert.message.model';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { TimelyFilingSpecialFormConfig } from '../../../shared/models/constants';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-timely-filing-rules-special',
  templateUrl: './timely-filing-rules-special.component.html',
  styleUrls: ['./timely-filing-rules-special.component.css']
})
export class TimelyFilingRulesSpecialComponent implements OnInit {

  public timelyFilingRulesSpecialForm: FormGroup;
  @Input() showIcon: boolean = false;
  @Input() popUpTitle: string = "Demo Title";
  public popUpMessage: PopUpMessage;
  timelySpecialFormConfig = TimelyFilingSpecialFormConfig;
  public displayMessage: any;
  @Input() specialCriteria: string = "Demo Criteria";
  @Input() columnName: string = "Demo ColumnName";
  public alertMessage: AlertMessage;

  constructor(
    private toastService: ToastService,
    private alertMessageService: AlertMessageService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
  }

popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
        this.popupMessageHandler(button)
    }
}

popupMessageHandler(button: PopUpMessageButton) {
  if (button.name == 'yes') {
      console.log("button yes has been click!");
  }
  if (button.name == 'no') {
      console.log("button No has been click!");
  }
}

  OnSubmit() {
    this.toastService.showToast(
      "Action not implementated",
      NgbToastType.Danger
    );
    this.activeModal.dismiss('Cross click')
  }

}
