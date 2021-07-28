import { Component, OnInit, Input, ViewChild , Output, EventEmitter} from '@angular/core';
import { PopUpMessage, PopUpMessageButton } from "../../pop-up-message/index";

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css'],
})
export class PopUpMessageComponent implements OnInit {

  @Input() popupMessage: PopUpMessage;
  @ViewChild('popUpMessageModal') popUpMessageModal: any;
  @Output() buttonclickEvent = new EventEmitter<string>();
  constructor() { }
  ngOnInit() {
    
  }

  
  triggerClick(button:any) {
    button.popupMessage = this.popupMessage;
    this.buttonclickEvent.next(button);
  }


showMesssage() {
  document.getElementById("modalformbtn").click();
}


  closeMessage() {
      console.log("close message");
  }

}


