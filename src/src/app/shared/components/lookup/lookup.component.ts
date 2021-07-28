import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchModel} from '../../models/models';
import {GridOptions} from 'ag-grid-community';
import {ToastService} from '../../services/toast.service';
import {SearchService} from '../../services/search.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PopUpMessage, PopUpMessageButton} from "../pop-up-message";
import {PopUpMessageComponent} from "../pop-up-message/pop-up-message/pop-up-message.component";

class LookupData {
    hasMoreElements: boolean
    // results: [];
    memberMasterviewModels: [];
    pageSize: number
}

@Component({
    selector: 'dmnd-lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit, AfterViewInit {
    @Input() searchModel: SearchModel;
    @Input() showIcon: boolean = false;
    @Input() defaultLoad: boolean = false;
    @Input() defaultSearch: any;
    @Input() groupType: string;
    @Input() typeSearch: any;
    @Input() isCustomSearch: boolean = false;
    @Input() isPagination: boolean = false;
    @Output() onRowSelected = new EventEmitter<any>();
    @Output() onLookupData = new EventEmitter<any>();

    private lookupData = new LookupData();

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
                public activeModal: NgbActiveModal,
                private modalService: NgbModal,) {
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
                reqObj[this.searchModel.defaultColumnDefs[this.defaultSearch[i].index].field] = this.defaultSearch[i].value;
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
            this.searchService.getPaginationSearchResults(this.searchModel).subscribe((resp: LookupData) => {
                this.rowData = resp.memberMasterviewModels;
                this.paginationPageSize = resp.pageSize;
                this.lookupData = resp;
                this.rowSelected = null;
                this.searchModel.searchOption = [];
                this.dataGridGridOptions.api.setRowData(this.rowData);
            });
        } else {
            this.dataGridGridOptions.api.showLoadingOverlay();
            this.searchService.getPaginationSearchResults(this.searchModel, true, true, 0, 'ASC').subscribe((resp: LookupData) => {
                this.rowData = resp.memberMasterviewModels;
                this.paginationPageSize = resp.pageSize;
                this.lookupData = resp;
                this.rowSelected = null;
                this.dataGridGridOptions.api.setRowData(this.rowData);
            });

            if (this.termReason === false) {
                this.searchModel.searchOption = rowData;
                this.searchService.getPaginationSearchResults(this.searchModel, true, true, 0, 'ASC').subscribe((resp: LookupData) => {
                    let data = [], item: any;
                    this.rowData = resp.memberMasterviewModels;
                    this.paginationPageSize = resp.pageSize;
                    this.lookupData = resp;
                    for (item of resp.memberMasterviewModels) {
                        if (item.REASON_CODE.includes('TM')) {
                            if (item.REASON_CODE[0] === 'T') {
                                data.push(item)
                            }
                        }
                    }
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


    public onGridReady($event): void {
        const docsE: any = document.querySelectorAll(".customClass .ag-layout-normal .ag-paging-panel .ag-paging-page-summary-panel");
        const elements = docsE[0].getElementsByClassName("ag-paging-button");
        elements[2].addEventListener('click', this.nextPageCall, null)                          // page next button
    }

    nextPageCall = () => {
        this.nextPage();
    }

    prevPageCall = () => {
        this.prevPage();
    }


    selectionChanged() {
        const selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.rowSelected = selectedRows[0];
    }

    nextPage() {
        if (this.lookupData.hasMoreElements) {
            const nextPage = (this.lookupData.memberMasterviewModels.length) / this.lookupData.pageSize;
            this.currentPage = (this.dataGridGridOptions.api.paginationGetCurrentPage());
            if (nextPage > this.currentPage + 1 && nextPage !== this.currentPage) {        // -- if page data already exist
                this.dataGridGridOptions.api.paginationGoToPage(this.currentPage);
                return;
            }
            this.searchModel.userId = sessionStorage.getItem('user');
            this.searchService.getPaginationSearchResults
            (this.searchModel, true, true, nextPage, 'ASC').subscribe((resp: LookupData) => {
                this.lookupData = resp;

                this.rowData = [...this.rowData, ...resp.memberMasterviewModels];
                this.lookupData.memberMasterviewModels = this.rowData;  // new data

                this.rowSelected = null;
                if (!this.rowData) {
                    return;
                }
                this.dataGridGridOptions.api.setRowData(this.rowData);
                this.currentPage = nextPage;
                this.dataGridGridOptions.api.paginationGoToPage(this.currentPage);
            }, error => {
                this.showPopUp(error, 'Lookup');
            });
        } else if (!this.lookupData.pageSize) {
            this.lookupData.hasMoreElements = true;
            this.getDefaultPage1Data();
        }
    }

    private getDefaultPage1Data(): void {
        this.dataGridGridOptions.api.showLoadingOverlay();
        this.searchModel.userId = sessionStorage.getItem('user');
        this.searchService.getPaginationSearchResults(this.searchModel, true, true, 0, 'ASC').subscribe((resp: LookupData) => {
            resp.memberMasterviewModels.sort((a, b) => {
                if (a['subscriberId']) {
                    return a['subscriberId'] > b['subscriberId'] ? 1 : -1;
                }
            });
            this.rowData = resp.memberMasterviewModels;
            this.paginationPageSize = resp.pageSize;
            this.lookupData = resp;
            this.rowSelected = null;
            this.dataGridGridOptions.api.setRowData(this.rowData);
        });
    }

    prevPage() {
        if (this.lookupData.hasMoreElements) {
            this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 0;
            this.dataGridGridOptions.api.paginationGoToPage(this.currentPage);
        }
    }

    currentPage = 0;

    showPopUp(message: string, title: string, button = 'Ok') {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton(button, button, 'btn btn-primary'),];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

}
