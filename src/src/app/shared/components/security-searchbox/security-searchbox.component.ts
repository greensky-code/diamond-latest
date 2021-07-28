import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { NgbToastType } from 'ngb-toast';
import { SearchModel } from '../../models/models';
import { SearchService } from '../../services/search.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-security-searchbox',
  templateUrl: './security-searchbox.component.html',
  styleUrls: ['./security-searchbox.component.scss']
})
export class SecuritySearchboxComponent implements OnInit, AfterViewInit {

  @Input() searchModel: SearchModel;
  @Input() showIcon: boolean = false;
  @Output() onRowSelected = new EventEmitter<any>();
  dataGridGridOptions: GridOptions;
  rowSelection = 'single';
  isSearch: boolean = false;
  isColumn: boolean = false;
  rowSelected: any = null;
  columnSelected: any = null;
  rowData:any;
  rowsData:any[]=[];
  columnDefs: any[] = [];
  column: string = '';
    dropdownSettings = {};
    selectedItems = [];

  constructor(private searchService: SearchService,
              private toastService: ToastService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      this.initGridOptions();
      this.dropdownSettings = {
          singleSelection: false,
          idField: 'field',
          textField: 'headerName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 0,
          allowSearchFilter: true
      };
  }

  ngAfterViewInit(): void {
      this.columnDefs = this.searchModel.defaultColumnDefs.map(x => Object.assign({}, x));
      this.resetData();
  }

  initGridOptions() {
      this.dataGridGridOptions = {
          paginationPageSize: 50,
          defaultColDef: {
              minWidth: 100,
              editable: true,
          },
          // set the top grid to single click editing
          singleClickEdit: true
      };
      this.dataGridGridOptions.editType = 'fullRow';

      console.log(this.searchModel);
      this.dataGridGridOptions.columnDefs = this.searchModel.defaultColumnDefs.map(x => Object.assign({}, x));
  }

  setSearchResults() {
      /*if (this.searchModel && this.searchModel.url) {
          this.searchService.getSearchResults(this.searchModel).subscribe(resp => {
              this.rowData = resp;
              this.dataGridGridOptions.api.setRowData(this.rowData);
              this.isSearch = true;
          });
      }*/
  }

  resetData() {
      this.isSearch = false;
      this.isColumn = false;
      this.column = '';
      this.selectedItems = [];
      this.dataGridGridOptions.defaultColDef.editable = true;
      this.dataGridGridOptions.singleClickEdit = true ;
      this.dataGridGridOptions.api.setRowData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  }

  searchData() {
      this.rowsData = [];
      this.isSearch = true;
      this.dataGridGridOptions.defaultColDef.editable = false;
      this.dataGridGridOptions.singleClickEdit = false;
      this.dataGridGridOptions.api.stopEditing(false);
      this.dataGridGridOptions.api.forEachNode(node => {
          if (JSON.stringify(node.data) !== '{}') {
              this.rowsData.push(node.data)
          }
      });
      if (this.rowsData.length > 0) {
          this.searchModel.searchOption = this.rowsData;
          this.searchService.getSearchResults(this.searchModel).subscribe(resp => {
              this.rowData = resp;
              this.rowSelected = null;
              this.dataGridGridOptions.api.setRowData(this.rowData);
          });
      } else {
          // this.toastService.showToast('Please write search value in any fields', NgbToastType.Danger);
          this.searchService.getSearchResults(this.searchModel).subscribe(resp => {
              this.rowData = resp;
              this.rowSelected = null;
              this.dataGridGridOptions.api.setRowData(this.rowData);
          });
      }
  }

  defaultGrid() {
      this.columnDefs = this.searchModel.columnDefs.map(x => Object.assign({}, x));
      this.dataGridGridOptions.api.setColumnDefs(this.columnDefs);
      this.resetData();
  }

  selectionChanged() {
      const selectedRows = this.dataGridGridOptions.api.getSelectedRows();
      this.rowSelected = selectedRows[0];
  }

  submit() {
      this.onRowSelected.emit(this.rowSelected);
      this.activeModal.close();
  }

  hideModal() {
      this.activeModal.close({});
  }

  isMatchAllChecked(event:any) {
      this.searchModel.isMatch = event.target.checked;
  }

  changeColumn() {
      console.log(this.column);
      this.columnSelected = this.column;
      this.isColumn = (this.column && this.column.trim().length > 0);
  }

  customizeGrid() {
      /*let curr = this;
      let col = this.searchModel.columnDefs.filter(function(item) {
          return item.field === curr.columnSelected;
      })[0];
      let existingCol = this.columnDefs.filter(function(item) {
          return item.field === curr.columnSelected;
      })[0];

      if (existingCol) {
          this.toastService.showToast('Already added in grid', NgbToastType.Danger)
          return;
      }

      // this.columnDefs = this.searchModel.defaultColumnDefs.map(x => Object.assign({}, x));
      this.columnDefs.push(col);
      this.dataGridGridOptions.api.setColumnDefs(this.columnDefs);
      this.resetData();*/
      let fields = [];
      if (this.selectedItems && this.selectedItems.length > 0) {
          for (let i = 0; i < this.selectedItems.length; i++) {
              fields.push(this.selectedItems[i].field);
          }
          let col = this.searchModel.columnDefs.filter(function (item) {
              return fields.indexOf(item.field) >= 0;
          });
          this.columnDefs = col;
          this.dataGridGridOptions.api.setColumnDefs(this.columnDefs);
          this.resetData();
      }
  }
}
