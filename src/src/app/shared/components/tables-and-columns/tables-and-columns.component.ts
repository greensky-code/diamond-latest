/* Copyright (c) 2020 . All Rights Reserved. */
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {DatePipe} from '@angular/common';
import {AllTableService} from '../../services/all-table.service';
import {AllTable} from '../../models/all-table.model';
import {AllTabColumns} from '../../models/all-tab-columns.model';
import {AllTabColumnsService} from '../../services/all-tab-columns.service';
import {Mask} from '../../pipes/text-format.pipe';
import {CustomValidators} from '../../validators/custom-validator';
import {DateFormatPipe} from '../../pipes/date-format.pipe';
import {FormValidation} from '../../validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../alert-message';
import {DatePickerConfig} from '../../config';
import {PopUpMessage, PopUpMessageButton} from '../pop-up-message';

import {PopUpMessageComponent} from '../pop-up-message/pop-up-message/pop-up-message.component';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

// Use the Component directive to define the TablesAndColumnsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'tablesandcolumns',
    templateUrl: './tables-and-columns.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        AllTableService
    ]
})
export class TablesAndColumnsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Output() onRowSelected = new EventEmitter<any>();
    tablesAndColumnsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    editAllTable: boolean;
    allTable: AllTable;
    allTables: AllTable[];
    editAllTabColumns: boolean;
    allTabColumns: AllTabColumns;
    allTabColumnss: AllTabColumns[];
    @Input() showIcon = false;
    @Input() tables: any[];
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private allTableService: AllTableService, private allTabColumnsService: AllTabColumnsService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.tablesAndColumnsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.getAllTable('DORIS');
        }, 400);
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createAllTable() {
        this.formValidation.validateForm();
        if (this.tablesAndColumnsForm.valid) {
            let allTable = new AllTable();
            this.allTableService.createAllTable(allTable).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editAllTable = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateAllTable(owners: string) {
        this.formValidation.validateForm();
        if (this.tablesAndColumnsForm.valid) {
            let allTable = new AllTable();
            this.allTableService.updateAllTable(allTable, owners).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editAllTable = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveAllTable() {
        if (this.editAllTable) {
            this.updateAllTable(this.allTable.owners)
        } else {
            this.createAllTable();
        }
    }

    deleteAllTable(owners: string) {
        this.allTableService.deleteAllTable(owners).subscribe(response => {
            this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
        });
    }

    getAllTable(owners: string) {
        if (this.tables && this.tables.length > 0) {
            this.allTables = this.tables;
            this.dataGrid001GridOptions.api.setRowData(this.tables);
            this.tablesAndColumnsForm.patchValue({});
            if (this.tables && this.tables.length > 0) {
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            }
        } else {
            this.allTableService.getAllTable(owners).subscribe((allTable: any) => {
                this.allTables = allTable;
                this.dataGrid001GridOptions.api.setRowData(allTable);
                this.tablesAndColumnsForm.patchValue({});
            });
            setTimeout(() => {
                this.dataGrid002GridOptions.api.setRowData([]);
            }, 1000);
        }
    }

    getAllTables() {
        this.allTableService.getAllTables().subscribe(allTables => {
            this.allTables = allTables;
            this.dataGrid001GridOptions.api.setRowData(this.allTables);
        });
    }

    createAllTabColumns() {
        this.formValidation.validateForm();
        if (this.tablesAndColumnsForm.valid) {
            let allTabColumns = new AllTabColumns();
            this.allTabColumnsService.createAllTabColumns(allTabColumns).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editAllTabColumns = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateAllTabColumns(owners: string) {
        this.formValidation.validateForm();
        if (this.tablesAndColumnsForm.valid) {
            let allTabColumns = new AllTabColumns();
            this.allTabColumnsService.updateAllTabColumns(allTabColumns, owners).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editAllTabColumns = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveAllTabColumns() {
        if (this.editAllTabColumns) {
            this.updateAllTabColumns(this.allTabColumns.owners)
        } else {
            this.createAllTabColumns();
        }
    }

    deleteAllTabColumns(owners: string) {
        this.allTabColumnsService.deleteAllTabColumns(owners).subscribe(response => {
            this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
        });
    }

    getAllTabColumns(owners: string) {
        this.allTabColumnsService.getAllTabColumns(owners).subscribe((allTabColumns: any) => {
            this.allTabColumns = allTabColumns;
            this.dataGrid002GridOptions.api.setRowData(allTabColumns);
            this.tablesAndColumnsForm.patchValue({});
        });
    }

    getAllTabColumnss() {
        this.allTabColumnsService.getAllTabColumnss().subscribe(allTabColumnss => {
            this.allTabColumnss = allTabColumnss;
            this.dataGrid002GridOptions.api.setRowData(this.allTabColumnss);
        });
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
                paginationPageSize: 50
            };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Table Name',
                field: 'tableName',
                width: 480,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
                paginationPageSize: 50
            };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Column Name',
                field: 'columnName',
                width: 480,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.tablesAndColumnsForm = this.formBuilder.group({
            tableName: ['', [Validators.required]],
            columnName: ['', [Validators.required]]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    grid1SelectionChange() {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        this.dataGrid002GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.showLoadingOverlay();
        if (selectedRows[0] !== undefined) {
            this.tablesAndColumnsForm.patchValue({
                tableName: selectedRows[0].tableName
            });
            this.allTabColumnsService.getAllTabColumnsByOwnerAndTableName('DORIS', selectedRows[0].tableName)
                .subscribe((allTabColumns: any) => {
                this.allTabColumns = allTabColumns;
                this.dataGrid002GridOptions.api.setRowData(allTabColumns);
                if (allTabColumns && allTabColumns.length > 0) {
                    this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                }
            });
        } else {
            this.tablesAndColumnsForm.patchValue({
                tableName: null,
                columnName: null
            });
        }
    }

    grid2SelectionChange() {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.tablesAndColumnsForm.patchValue({
                columnName: selectedRows[0].columnName
            });
        } else {
            this.tablesAndColumnsForm.patchValue({
                columnName: null
            });
        }
    }

    submit() {
        this.onRowSelected.emit(this.tablesAndColumnsForm.value);
        this.activeModal.dismiss();
    }

    cancel() {
        this.onRowSelected.emit(null);
        this.activeModal.dismiss();
    }
}
