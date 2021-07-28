import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';

const COMPANY_LIST_HEADERS = [
  {headerName: 'Company Code', field: 'companyCode', width: 140, headerClass: 'font-weight-bold'},
  {headerName: 'Description', field: 'description', width: 140, headerClass: 'font-weight-bold'}
];

@Component({
  selector: 'app-tax-company-detail',
  templateUrl: './tax-company-detail.component.html',
  styleUrls: ['./tax-company-detail.component.css']
})
export class TaxCompanyDetailComponent implements OnInit {


  @Input() rowData: any[];
  @Input() taxId: any;
  @Input() defaultLoad: boolean = false;
  @Input() isPagination: boolean = false;
  dataGridGridOptions: GridOptions;
  isColumn: boolean = true;
  option: any = {};
  paginationPageSize = 0;
  columnDefs: any[] = [];
  column: string = '';
  externalFilterValue: Array<Object>;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initGridOptions();
  }

  ngAfterViewInit(): void {
    this.dataGridGridOptions.api.setRowData(this.rowData);

  }

  initGridOptions() {
    this.dataGridGridOptions = {
      paginationPageSize: 50,
      defaultColDef: {
        minWidth: 100,
        editable: false,
      },
      // set the top grid to single click editing
      singleClickEdit: false
    };
    this.dataGridGridOptions.editType = 'fullRow';
    this.dataGridGridOptions.columnDefs = COMPANY_LIST_HEADERS.map(x => Object.assign({}, x));
  }


}
