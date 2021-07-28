import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchModel} from '../../models/models';
import {GridOptions} from 'ag-grid-community';
import {ToastService} from '../../services/toast.service';
import {SearchService} from '../../services/search.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'searchbox',
    templateUrl: './searchbox.component.html',
    styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit, AfterViewInit {
    @Input() searchModel: SearchModel;
    @Input() showIcon: boolean = false;
    @Input() defaultLoad: boolean = false;
    @Input() defaultSearch: any;
    @Input() groupType: string;
    @Input() typeSearch: any;
    @Input() isCustomSearch: boolean = false;
    @Input() isPagination: boolean = false;
    @Output() onRowSelected = new EventEmitter<any>();
    @Output() lookupData = new EventEmitter<any>();
    dataGridGridOptions: GridOptions;
    rowSelection = 'single';
    isSearch: boolean = false;
    isColumn: boolean = true;
    rowSelected: any = null;
    columnSelected: any = null;
    searchValue: string = '';
    option: any = {};
    paginationPageSize = 0;

    rowData: any;
    columnDefs: any[] = [];
    column: string = '';
    termReason: Boolean = true;
    externalFilterValue: Array<Object>;
    dropdownSettings = {};
    selectedItems = [];

    constructor(private searchService: SearchService,
                private toastService: ToastService,
                private cdr: ChangeDetectorRef,
                public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initGridOptions();
        this.externalFilterValue = this.searchModel.searchOption;
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
        if (this.defaultSearch) {
            let reqObj = {};
            for (let i = 0; i < this.defaultSearch.length; i++) {
                reqObj[this.searchModel.defaultColumnDefs[this.defaultSearch[i].index].field] = this.defaultSearch[i].value;
            }
            this.isSearch = false;
            this.isColumn = true;
            this.column = '';
            this.toggleEditing(true);
            this.dataGridGridOptions.api.setRowData([reqObj]);
            setTimeout(() => {
                this.searchData();
            }, 100);

        } else if (this.typeSearch) {
            this.isSearch = false;
            this.isColumn = true;
            this.column = '';
            this.toggleEditing(true);
            this.dataGridGridOptions.api.setRowData([this.typeSearch]);
            setTimeout(() => {
                this.searchData();
            }, 100);
        } else if (this.defaultLoad) {
            this.searchData();
        } else {
            this.resetData();
        }
        this.dataGridGridOptions.api.hideOverlay();
    }

    initGridOptions() {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            defaultColDef: {
                minWidth: 100,
            },
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = this.searchModel.defaultColumnDefs.map(x => Object.assign({}, x));
    }



    resetData() {
        this.isSearch = false;
        this.isColumn = true;
        this.column = '';
        this.selectedItems = [];
        this.toggleEditing(true);
        this.dataGridGridOptions.api.setRowData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
        this.searchModel.searchOption = this.isCustomSearch ? [] : this.externalFilterValue;
    }

    submitSearchOnEnterKey() {
        if (!this.isSearch) {
            this.dataGridGridOptions.api.clearFocusedCell();
            this.searchData();
        } else if (this.rowSelected) {
            this.submit();
        }
    }

    openRecordOnDoubleClicked() {
        if (this.isSearch) {
            const selectedRows = this.dataGridGridOptions.api.getSelectedRows();
            if (selectedRows) {
                setTimeout(() => this.submit(), 50);
            }
        }
    }

    searchData() {
        let rowData: any = [];
        this.isSearch = true;
        if (this.defaultSearch) {
            let reqObj = {};
            for (let i = 0; i < this.defaultSearch.length; i++) {
                reqObj[
                    this.searchModel.defaultColumnDefs[
                        this.defaultSearch[i].index
                        ].field
                    ] = this.defaultSearch[i].value;
            }
            this.isColumn = false;
            this.column = "";
            this.dataGridGridOptions.api.setRowData([reqObj]);
        }
        this.rowSelected = null;
        this.externalFilterValue.forEach(value => {
            rowData.push(value);
        });
        this.dataGridGridOptions.api.forEachNode(node => {
            if (JSON.stringify(node.data) !== '{}') {
                rowData.push(node.data)
            }
        });
        this.searchModel.userId = sessionStorage.getItem('user');
        if (rowData.length > 0) {
            this.searchModel.searchOption = rowData;
            this.dataGridGridOptions.api.showLoadingOverlay();
            this.searchService.getSearchResults(this.searchModel).subscribe((resp: any) => {
                this.rowData = resp;
                this.rowSelected = null;
                this.searchModel.searchOption = [];
                this.dataGridGridOptions.api.setRowData(this.rowData);
            });
        } else {
            this.dataGridGridOptions.api.showLoadingOverlay();
            this.searchService.getSearchResults(this.searchModel).subscribe((resp: any) => {
                this.rowData = resp;
                this.rowSelected = null;
                this.dataGridGridOptions.api.setRowData(this.rowData);
            });

            if (this.termReason === false) {
                this.searchModel.searchOption = rowData;
                this.searchService.getSearchResults(this.searchModel).subscribe((resp: any) => {
                    let data = [];
                    for (let item of resp) {
                        if (item.REASON_CODE.includes('TM')) {
                            if (item.REASON_CODE[0] === 'T') {
                                data.push(item)
                            }
                        }
                    }
                    this.rowData = data;
                    this.rowSelected = null;
                    this.dataGridGridOptions.api.setRowData(this.rowData);
                });
            }
        }
        this.toggleEditing(false);
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
        this.searchModel.searchOption = this.isCustomSearch ? [] : this.externalFilterValue;
        this.onRowSelected.emit(this.rowSelected);
        this.hideModal();
    }

    hideModal() {
        setTimeout(() => {
            this.activeModal.dismiss();
            this.cdr.detectChanges();
        }, 25);
    }

    isMatchAllChecked(event: any) {
        this.searchModel.isMatch = event.target.checked;
    }

    isMatchAllContractsChecked(event: any) {
        this.searchModel.isContracts = event.target.checked;
    }

    changeColumn() {
        this.columnSelected = this.column;
        this.isColumn = (this.column && this.column.trim().length > 0);
    }

    customizeGrid() {
        let fields = [];
        if (this.selectedItems && this.selectedItems.length > 0) {
            for (let i = 0; i < this.selectedItems.length; i++) {
                fields.push(this.selectedItems[i].field);
            }
            this.columnDefs = this.searchModel.columnDefs.filter(function (item) {
                return fields.indexOf(item.field) >= 0;
            });
            this.dataGridGridOptions.api.setColumnDefs(this.columnDefs);
            this.resetData();
        }
    }

    onCellValueChanged(event: any) {
        if (this.isCustomSearch && event.column && event.data) {
            let colId: string = event.column.colId;
            let value: string = event.data[event.column.colId];
            this.searchModel.searchOption.push({[colId]: value});
        }
    }

    toggleEditing(status) {
        let newColDefs = [];
        this.columnDefs.forEach(function (colDef, index) {
            newColDefs.push({...colDef, editable: status});
        });
        this.columnDefs = newColDefs;
        this.dataGridGridOptions.singleClickEdit = status;
        setTimeout(() => this.dataGridGridOptions.api.setColumnDefs(newColDefs), 50);
        this.dataGridGridOptions.api?.refreshHeader();
    }
}
