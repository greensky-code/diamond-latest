import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CiebStreetAddressService } from '../../../api-services';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistoryDetailsComponent } from '../../../diamond/addon/cigna-link-details/history-details/history-details.component';

@Component({
  selector: 'button-cell',
  template: `<button type="button" *ngIf="showButton" class="btn btn-primary btn-sm"  (click)="onClick(eventType)"> {{btnLabel}} </button>`,
})
export class ButtonCellComponent implements ICellRendererAngularComp  {
  refresh(params: any): boolean {
   return false;
  }

  btnLabel:string
  showButton:boolean=false;
  eventType:string='address';

  
  agInit(params: ICellRendererParams): void {
   this.params=params;
   console.log(params);
   this.btnLabel = params['label'];
   this.showButton= params['showButton'];
   if(this.btnLabel=='View Address')
      this.eventType ='address'
    else
      this.eventType='contact';
  }



  public params: ICellRendererParams;

    constructor( private modalService: NgbModal,) { }


    /**
     *     String seqEntityId;
     String effDate;
     String endDate;
     */
    public onClick(event) {

     if(event=='address'){
        
          const gridData ={'event':'address', 'data':{'seqEntityId':this.params.data.seqEntityId,'effDate':this.params.data.effDate, 'termDate': this.params.data.termDate}};
          let ref = this.modalService.open(HistoryDetailsComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.gridData = gridData;
        
      }
      else 
      {
         
          const gridData ={'event':'contact', 'data':{'seqEntityId':this.params.data.seqEntityId,'effDate':this.params.data.effDate, 'termDate': this.params.data.termDate}};
          let ref = this.modalService.open(HistoryDetailsComponent, {size: 'lg'});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.gridData = gridData;
    
      }
    }
}
