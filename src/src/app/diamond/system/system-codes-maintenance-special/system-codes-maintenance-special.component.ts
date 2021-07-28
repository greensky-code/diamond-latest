import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastType } from 'ngb-toast';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { ToastService } from '../../../shared/services/toast.service';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { LanguageMaster } from '../../../api-models/language-master.model';

@Component({
  selector: 'app-system-codes-maintenance-special',
  templateUrl: './system-codes-maintenance-special.component.html',
  styleUrls: ['./system-codes-maintenance-special.component.css'],
  providers: [
    LanguageMasterService,
  ],
})
export class SystemCodesMaintenanceSpecialComponent implements OnInit {

  @Input() showIcon: boolean = false;
  @Input() popUpTitle: string = "Language Selection";
  public popUpMessage: PopUpMessage;
  public displayMessage: any;
  public alertMessage: AlertMessage;
  public languages: LanguageMaster[];

  constructor(
    private toastService: ToastService,
    private alertMessageService: AlertMessageService,
    public activeModal: NgbActiveModal,
    private languageMasterService: LanguageMasterService,
  ) { }

  ngOnInit(): void {
      this.loadAllLanguages();
  }

  loadAllLanguages() {
    this.languageMasterService.getLanguageMasters().subscribe(languageMasters => {
      this.languages = languageMasters;
      console.log(this.languages);
    });
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
