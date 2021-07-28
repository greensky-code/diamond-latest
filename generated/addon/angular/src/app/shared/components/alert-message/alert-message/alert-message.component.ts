import { Component, OnInit, Input } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../../../components/alert-message/index";


@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
  providers: [AlertMessageService]
})
export class AlertMessageComponent implements OnInit {

  @Input() alertMessage: AlertMessage;

  constructor(private alertMessageService: AlertMessageService) { }

  ngOnInit() {

  }

  closeMessage() {
      this.alertMessage = this.alertMessageService.close();
      console.log("close message");
  }

}


