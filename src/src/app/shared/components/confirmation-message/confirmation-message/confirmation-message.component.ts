import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfirmationMessage } from '../index';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
})
export class ConfirmationMessageComponent implements OnInit {

  @Input() confirmationMessage: ConfirmationMessage;
  @ViewChild('confirmationMessageModal') confirmationMessageModal: any;
  @Output() buttonclickEvent = new EventEmitter<string>();
  infoIcon = faInfoCircle;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  triggerClick(button: any) {
    button.confirmationMessage = this.confirmationMessage;
    if (button.name === 'Ok') {
     this.activeModal.close();
    } else if (button.name === 'Save') {

    } else {
      this.buttonclickEvent.next(button);
      this.activeModal.close();
    }
  }

  showMesssage() {}
}


