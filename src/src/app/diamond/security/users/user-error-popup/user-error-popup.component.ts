import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-error-popup',
  templateUrl: './user-error-popup.component.html',
  styleUrls: ['./user-error-popup.component.css']
})
export class UserErrorPopupComponent implements OnInit {

  @Output() onModalClose = new EventEmitter<any>();
  constructor(public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  hideModal() {
    setTimeout(() => {
      this.activeModal.dismiss();
      this.cdr.detectChanges();
      this.onModalClose.emit(true);
    }, 25);
  }
}
