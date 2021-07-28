import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PopUpMessage} from '../pop-up.message.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {PopUpIconType} from "../../../config";

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css'],
})
export class PopUpMessageComponent implements OnInit {

  @Input() popupMessage: PopUpMessage;
  @Input() iconType: PopUpIconType = PopUpIconType.INFO;
  @ViewChild('popUpMessageModal') popUpMessageModal: any;
  @Output() buttonclickEvent = new EventEmitter<any>();
  infoIcon = faInfoCircle;
  faWindowClose= faWindowClose;

  iconTypes = PopUpIconType;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  triggerClick(button: any) {
    button.popupMessage = this.popupMessage;
    if (button.name === 'Ok' && button.cssClassName === 'req') {
      this.buttonclickEvent.next(button);
      this.activeModal.close();
    } else if (button.name === 'Ok') {
      this.buttonclickEvent.next(button);
     this.activeModal.close();
    } else {
      this.buttonclickEvent.next(button);
      this.activeModal.close();
    }
  }

  showMesssage() {}
}


