import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drg-pricer-fields-view',
  templateUrl: './drg-pricer-fields-view.component.html',
  styleUrls: ['./drg-pricer-fields-view.component.css']
})
export class DrgPricerFieldsViewComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
  ) { }


  showIcon:boolean=true;
  ngOnInit(): void {
  }


  modalClose()
  {
    this.activeModal.close();
    
  }
}
