import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CiebStreetAddressService } from '../../../../api-services';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit, AfterViewInit {
  
  public dataGridGridOptions: GridOptions;
  private dataGridgridApi:any;
  title:any='';
  columnsDef=[];

  @Input() gridData:any;
  @Input() showIcon: boolean;
  private addressColumns =[
    {
        headerName: 'Address ID',
        field: 'seqAddrId',
        width: 100,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
    },
    {
        headerName: 'Effective Date',
        field: 'effDate',
        width: 130
    },
    {
        headerName: 'Termination Date',
        field: 'termDate',
        width: 130
    },
    {
      headerName: 'care of',
      field: 'careof',
      width: 130
  },
    
];

private contactColumns =[
  {
      headerName: 'Contact ID',
      field: 'seqContactId',
      width: 100,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
  },
  {
      headerName: 'Effective Date',
      field: 'effDate',
      width: 180
  },
  {
      headerName: 'Termination Date',
      field: 'termDate',
      width: 130
  },
  {
      headerName: 'User Update Time',
      field: 'updateDateTime',
      width: 130
  },
  {
      headerName: 'User Updated',
      field: 'updateUser',
      width: 130
  },
  {
      headerName: 'Contact Details',
      field: 'emailAddress',
      width: 130
  }
];
  constructor(public activeModal: NgbActiveModal,private ciebStreetAddressService:CiebStreetAddressService, private datePipe:DatePipe) { }


  ngOnInit(): void {
   this.columnsDef = this.contactColumns;
   this.createDataGrid([]); 
  }

  ngAfterViewInit(): void {
    if(this.gridData)
    {
      this.title = this.gridData.event.toUpperCase();
      if(this.gridData.event=='address'){
        this.ciebStreetAddressService.getCiebAddressHistory(this.gridData.data.seqEntityId, this.datePipe.transform(this.gridData.data.effDate, 'dd-MM-yy'), this.datePipe.transform(this.gridData.data.termDate, 'dd-MM-yy') ).subscribe(data=>{

          this.columnsDef = this.addressColumns;
          this.dataGridgridApi.api.setRowData(data);
          
        });
      }
      else 
      {
        this.ciebStreetAddressService.getCiebContactHistory(this.gridData.data.seqEntityId, this.datePipe.transform(this.gridData.data.effDate, 'yyyy-MM-dd HH:mm:ss'), this.datePipe.transform(this.gridData.data.termDate, 'yyyy-MM-dd HH:mm:ss') ).subscribe(data=>{

         this.columnsDef = this.contactColumns;
          this.dataGridgridApi.api.setRowData(data);
        
        });
      }
    }
  
  }
  


  createDataGrid(data:any, gridType:string ='address'): void {
    this.dataGridGridOptions = {
        paginationPageSize: 50,
        rowSelection: 'single',
        rowData: data,

    };
    this.dataGridGridOptions.editType = 'fullRow';
   this.dataGridGridOptions.columnDefs = this.columnsDef;

}

onGridReady(event){
   this.dataGridgridApi = event;

}

closeModal(){
  this.activeModal.dismiss();
}

}
