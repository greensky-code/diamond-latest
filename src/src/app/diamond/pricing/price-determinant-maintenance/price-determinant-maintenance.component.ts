/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, OnInit, ViewChild, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions, } from 'ag-grid-community';
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {Menu, SearchModel} from '../../../shared/models/models';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, PriceDeterminant} from '../../../api-models/index'
import {PriceDeterminantService} from '../../../api-services/price-determinant.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {DrgWeight} from '../../../api-models/index';
import {DrgWeightService} from '../../../api-services/drg-weight.service';
import {DrgMasterService, MessageMasterDtlService} from '../../../api-services';
import {DddwDtlService} from '../../../api-services';
import {
    CONSTANTS,
    getDrgWeightMaintenanceShortcutKeys,
    getPriceDeterminantMaintenanceShortcutKeys
} from '../../../shared/services/shared.service'
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProcedureDeterminantMaintenanceLookup} from '../../../shared/lookup/price-derterminant-maintenance-lookup';
import {PricingHelpComponent} from "../pricing-help/pricing-help.component";


// Use the Component directive to define the PriceDeterminantMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pricedeterminantmaintenance',
    templateUrl: './price-determinant-maintenance.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DrgWeightService,
        DrgMasterService,
        PriceDeterminantService
    ]

})
export class PriceDeterminantMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    priceDeterminantMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    editPriceDeterminant: boolean;
    priceDeterminant: PriceDeterminant;
    priceDeterminants: PriceDeterminant[];
    menu: Menu[] = [];
    showForm = false;
    drgWeightsMaintenanceForm: FormGroup;
    editDrgGrouperPricer: boolean;
    revisionDescription: string;
    pricerDescription: string;
    editDrgWeight: boolean;
    drgWeight: DrgWeight;
    drgWeights: DrgWeight[];
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    operatorsForCell = [];
    columnNamesForCell = [];
    shortDescription = '';
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public shortcuts: ShortcutInput[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    searchModel = new SearchModel(
        'pricedeterminants/lookup',
        ProcedureDeterminantMaintenanceLookup.PROCEDURE_DETERMINANT_ALL,
        ProcedureDeterminantMaintenanceLookup.PROCEDURE_DETERMINANT_DEFAULT,
        []
    );

    showPopUp() {
        let popMsg = new PopUpMessage('groupNotExistPopup', 'Price Determinant Maintenance', '5545: Enetered Price Rule Maintenance does not exist. Press yes to create a new Price Rule Determinant.', 'icon');
        popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
            this.popUpButtonClicked(event);
        });
    }

    private popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            this.onAddRow();
        }
        if (button.name == 'no') {
        }
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createPriceDeterminant() {
        this.formValidation.validateForm();
        if (this.priceDeterminantMaintenanceForm.valid) {
            let priceDeterminant = new PriceDeterminant();
            this.priceDeterminantService.createPriceDeterminant(priceDeterminant).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editPriceDeterminant = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    private getOperatorsDropdowns(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.OPERATOR, CONSTANTS.DW_PDTER_DE).subscribe(operators => {

            operators.forEach((a) => {
                this.operatorsForCell.push(a['dddwDtlPrimaryKey']['displayVal']);
            });

        }, error => {
            // this.toastService.showToast('An Error occurred while retrieving records.', NgbToastType.Danger);
        });
    }

    private getColumnNameDropdowns(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.COLUMN_NAME, CONSTANTS.DW_PDTER_DE).subscribe(columnNames => {

            columnNames.forEach((a) => {
                this.columnNamesForCell.push(a['dddwDtlPrimaryKey']['displayVal']);
            });


        }, error => {
            // this.toastService.showToast('An Error occurred while retrieving records.', NgbToastType.Danger);
        });
    }

    updatePriceDeterminant(_priceDeterminant: string, para2: any) {
        this.formValidation.validateForm();
        if (this.priceDeterminantMaintenanceForm.valid) {
            let priceDeterminant = {} as PriceDeterminant;
            priceDeterminant.columnName = para2.columnName;
            priceDeterminant.operator = para2.operator;
            priceDeterminant.fromValue = para2.fromValue;
            priceDeterminant.thruValue = para2.thruValue;
            priceDeterminant.deterFromDate = para2.deterFromDate;
            priceDeterminant.deterThruDate = para2.deterThruDate;

            console.log(priceDeterminant);
            console.log(_priceDeterminant);

            this.priceDeterminantService.updatePriceDeterminant(priceDeterminant, _priceDeterminant, para2.priceDeterminantPrimaryKey.seqPriceDeterm).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editPriceDeterminant = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    savePriceDeterminant() {
        if (this.editPriceDeterminant) {
            // this.updatePriceDeterminant(this.priceDeterminant.priceDeterminant)
        } else {
            this.createPriceDeterminant();
        }
    }

    deletePriceDeterminant(priceDeterminant: string) {
        this.priceDeterminantService.deletePriceDeterminant(priceDeterminant).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getPriceDeterminant(priceDeterminant: string) {
        this.priceDeterminantService.getPriceDeterminant(priceDeterminant).subscribe(priceDeterminants => {
            this.priceDeterminants = priceDeterminants;
            console.log(priceDeterminant);
            if (this.priceDeterminants && this.priceDeterminants.length > 0) {
                this.dataGridGridOptions.api.setRowData(this.priceDeterminants);
            } else {
                this.dataGridGridOptions.api.setRowData([]);
                this.showPopUp();
            }
        });
    }

    getPriceDeterminants() {
        this.priceDeterminantService.getPriceDeterminants().subscribe(priceDeterminants => {
            this.priceDeterminants = priceDeterminants;
            console.log(this.priceDeterminants);
            this.dataGridGridOptions.api.setRowData(this.priceDeterminants);
        });
    }

    dataGridGridOptionsExportCsv() {
        let params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.rowSelection = 'single';
        this.dataGridGridOptions.columnDefs = [{
            headerName: 'Column name',
            field: 'columnName',
            width: 200,
            editable: true,
            cellRenderer: 'nameCellRenderer',
            cellEditor: 'agSelectCellEditor',

            cellEditorParams: {
                values: this.columnNamesForCell
            },
            //  headerCheckboxSelection: true,
            //  headerCheckboxSelectionFilteredOnly: true,
            //   checkboxSelection: true
        },
            {
                headerName: 'Operator',
                field: 'operator',
                width: 200,
                editable: true,
                cellRenderer: 'operatorCellRenderer',
                cellEditor: 'agSelectCellEditor',

                cellEditorParams: {
                    values: this.operatorsForCell
                },
            },
            {
                headerName: 'From Value',
                field: 'fromValue',
                width: 200,
                editable: true
            },
            {
                headerName: 'Thru Value',
                field: 'thruValue',
                width: 200,
                editable: true
            },
            {
                headerName: 'From Date',
                field: 'deterFromDate',
                width: 200,
                editable: true
            },
            {
                headerName: 'Thru Date',
                field: 'deterThruDate',
                width: 200,
                editable: true
            },
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastService: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal, private cdr: ChangeDetectorRef,
        private dateFormatPipe: DateFormatPipe,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        private priceDeterminantService: PriceDeterminantService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.priceDeterminantMaintenanceForm);
        this.createDataGrid();
        this.getColumnNameDropdowns();
        this.getOperatorsDropdowns();
        setTimeout(() =>
                this.dataGridGridOptions.api.setRowData([])
            , 1000);
    }

    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New'}, {name: 'Open'}, {name: 'Save'}, {name: 'Close'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true}, {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true}, {name: 'Paste', disabled: true}, {isHorizontal: true},
                    {name: 'Lookup'}, {name: 'Sort by Sequence', disabled: true}, {
                        name: 'Sort by Panel ID',
                        disabled: true
                    }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'DRG Codes'}, {name: 'DRG Weights'}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'DRG Code Lookup'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
                    {isHorizontal: true}, {name: 'Show Timestamp'}, {name: 'Audit Display'},
                    {isHorizontal: true}, {name: '1 Main Menu'},
                    {name: '2 Group Master'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    columnDefs = [{
        headerName: 'Column name',
        field: 'columnName',
        width: 200,
        editable: true
    },
        {
            headerName: 'Operator',
            field: 'operator',
            width: 200,
            editable: true
        },
        {
            headerName: 'From Value',
            field: 'fromValue',
            width: 200,
            editable: true
        },
        {
            headerName: 'Thru Value',
            field: 'thruValue',
            width: 200,
            editable: true
        },
        {
            headerName: 'From Date',
            field: 'deterFromDate',
            width: 200,
            editable: true
        },
        {
            headerName: 'Thru Date',
            field: 'deterThruDate',
            width: 200,
            editable: true
        },
    ];

    rowData = [
        {field: 'deterthrudate', },
        {field: 'deterfromdate', },
        {make: '', model: '', price: ''}
    ];
// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.priceDeterminantMaintenanceForm = this.formBuilder.group({
            priceRuleDeterminant: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    grid1SelectionChange1() {

        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.priceDeterminant = selectedRows[0];
        this.editPriceDeterminant = true;
        this.priceDeterminantMaintenanceForm.patchValue({
            'columnName': selectedRows[0].columnName,
            'operator': selectedRows[0].operator,
            'fromValue': selectedRows[0].fromValue,
            'thruValue': selectedRows[0].thruValue,
            'deterFromDate': selectedRows[0].deterFromDate,
            'deterThruDate': selectedRows[0].deterThruDate
        });
        this.updatePriceDeterminant(selectedRows[0].priceDeterminantPrimaryKey.priceDeterminant, selectedRows[0]);

    }

    onMenuItemClick(eve) {
        if (eve.menu.menuItem === 'File') {             // handle File actions
            switch (eve.action) {
                case 'New': {
                    this.showForm = true;
                    break;
                }
                case 'Open': {
                    // this.getDrgMaster(this.drgCodeMaintenanceForm.value.drgCode);
                    break;
                }
                case 'Save': {
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu': {
                    break;
                }
                default: {
                    // this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (eve.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
           this.helpScreen();
        }
    }

    onAddRow() {
        this.dataGridGridOptions.api.setRowData([
            {}
        ]);
    }

    onLookupFieldChange(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getPriceDeterminant(event.target.value);
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getPriceDeterminant(res.priceDeterminantPrimaryKey.priceDeterminant);
            this.priceDeterminantMaintenanceForm.patchValue({
                'priceRuleDeterminant': res.priceDeterminantPrimaryKey.priceDeterminant,
            });
        });
    }

    grid1SelectionChange() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.drgWeight = selectedRows[0];
        this.editDrgWeight = true;
        this.showForm = true;
        this.drgWeightsMaintenanceForm.patchValue({
            'drgPricerId': this.drgWeight.drgGrouperPricer.drgGrouperPricerId,
            'version': this.drgWeight.drgGrouperPricer.version,
            'revisionLevel': this.drgWeight.drgWeightPrimaryKey.revisionLevel,
            'drgWeight': this.drgWeight.drgWeight,
            'userDefined': this.drgWeight.userDefined1,
        });
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPriceDeterminantMaintenanceShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(PricingHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'PDTER_Field_Definitions.htm'
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Price Determinant Maintenance')
            })
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {

                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.priceDeterminantMaintenanceForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

}
