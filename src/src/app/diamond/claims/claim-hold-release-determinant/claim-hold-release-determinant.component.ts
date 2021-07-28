/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {DatePipe} from '@angular/common';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {DeterminantTables, DeterminantValues, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {
    DeterminantRulesService,
    DeterminantTablesService, DeterminantValuesService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu} from '../../../shared/models/models';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {CLAIM_HOLD_RELEASE_DETERMINANT} from '../../../shared/app-constants';
import {
    ClaimHoldReleaseDetermConfig,
    COBOrderOfLiabilityFieldNames,
    DEFAULT_LANGUAGE
} from '../../../shared/models/constants';
import {TablesAndColumnsComponent} from '../../../shared/components/tables-and-columns/tables-and-columns.component';
import {Form} from '../../../shared/helpers/form.helper';
import {AllTabColumns} from '../../../shared/models/all-tab-columns.model';
import {getClaimHoldReleaseDeterminantShortcutKeys} from '../../../shared/services/shared.service';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the ClaimHoldReleaseDeterminantComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimholdreleasedeterminant',
    templateUrl: './claim-hold-release-determinant.component.html',

})
export class ClaimHoldReleaseDeterminantComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimHoldReleaseDeterminantForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    private windowId: 'RHDET';
    determinantTableses: DeterminantTables[];
    determinantValueses: DeterminantValues[];
    determinantTable: DeterminantTables;
    showDynamicGrid: Boolean = true;
    determinantSequence: any;
    claimHoldReleaseDetermConfig = ClaimHoldReleaseDetermConfig;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    secondInputDataChanged: Boolean = false;
    memberModuleId = CLAIM_HOLD_RELEASE_DETERMINANT;
    determinantValuePrevState: Array<FormRow> = [];
    recordCount = 1;
    isSaveForm = false;
    editDetermTable: Boolean = true;
    allColumns: AllTabColumns[] = [];
    selectedColumns: AllTabColumns[] = [];
    claimTypes: any[] = [];
    public menu: Menu[] = [];
    shortcuts: ShortcutInput[] = [];
    allTables: any[] = [];
    seqRuleId: number;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    gridSelectionStatus: String = '001';
    isFieldsReadonly: Boolean = true;
    type: string;
    config: any;
    searchSeq: number;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Input() showIcon = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private messageService: MessageMasterDtlService,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private systemCodesService: SystemCodesService,
        private determinantRulesService: DeterminantRulesService,
        private determinantTablesService: DeterminantTablesService,
        private determinantValuesService: DeterminantValuesService,
        public activeModal: NgbActiveModal,
        private datePipe: DatePipe
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimHoldReleaseDeterminantShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimHoldReleaseDeterminantForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.menuInit();
        this.getClaimTypes();
        this.getHoldReleaseRule();
        this.setAllTableLookUp();
    }

    getClaimTypes() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.claimTypes = systemCodes;
        });
    }

    getHoldReleaseRule() {
        this.determinantRulesService.getDeterminantRules('RHRUL').subscribe(
            (result) => {
                if (result) {
                    this.dataGrid001GridOptions.api.setRowData(result);
                    if (result.length > 0) {
                        this.dataGrid001GridOptions.api.selectNode(this.dataGrid001GridOptions.api.getRenderedNodes()[0]);
                    }
                } else {
                    this.toastService.showToast('Determinant Rules Not Found', NgbToastType.Danger);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    createDetermTable() {
        this.formValidation.validateForm();
        if (this.claimHoldReleaseDeterminantForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.determinantTable = this.claimHoldReleaseDeterminantForm.get('determinantTable').value;
            determinantTables.determinantColumn = this.claimHoldReleaseDeterminantForm.get('determinant').value;
            determinantTables.determinantTablesPrimaryKey = {
                searchSequence: this.searchSeq,
                keyword: 'RHRUL',
                seqRuleId: this.seqRuleId,
            };
            determinantTables.keyword = 'RHRUL';
            determinantTables.seqRuleId = this.seqRuleId;
            let date = new Date();
            let today = this.datePipe.transform(date, 'dd-MM-yyyy');
            determinantTables.subsInd = 'Y';
            determinantTables.securityCode = '0';
            determinantTables.insertDatetime = today;
            determinantTables.insertUser = 'DORIS';
            determinantTables.insertProcess = 'RHDET';
            determinantTables.determinantDatatype = 'VARCHAR2';
            this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.getHoldReleaseRule();
                this.showDynamicGrid = true;
                this.isFieldsReadonly = true;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    onRowSelectedGrid001(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.seqRuleId = event.data.determinantRulesPrimaryKey.seqRuleId;
        this.claimHoldReleaseDeterminantForm.patchValue({
            claimType: event.data.fileType,
        });
        this.dataGrid002GridOptions.api.setRowData([]);
        this.determinantTablesService.getDeterminantTablesBySeqRuleId(this.seqRuleId)
            .subscribe(value => {
                if (value) {
                    this.searchSeq = value.length + 1
                    this.editDetermTable = true;
                    this.dataGrid002GridOptions.api.setRowData(value);
                    this.dataGrid002GridOptions.api.selectIndex(0, false, null);
                } else {
                    this.searchSeq = 1
                }
            });
        this.setAllTableLookUp();
    }

    onRowSelectedGrid002(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.determinantTable = event.data;
        this.loadDataGridForm(event.data);
        this.getDeterminantValuesesByRuleIdSeqId(this.determinantTable.determinantTablesPrimaryKey.seqRuleId, this.determinantTable.determinantTablesPrimaryKey.searchSequence);
    }

    loadDataGridForm(eventData: any) {
        this.claimHoldReleaseDeterminantForm.patchValue({
            determinantTable: eventData.determinantTable,
            determinant:  eventData.determinantColumn,
        });
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Claim Type',
                field: 'fileType',
                width: 400,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const claimType = this.claimTypes.find(m => m.systemCode === params.data.fileType);
                        return claimType ? claimType.systemCodeDesc2 : ''
                    }
                }
            },
            {
                headerName: 'Release Rule',
                field: 'ruleId',
                width: 300         },
            {
                headerName: 'Apply To Header only',
                field: 'actionCode',
                width: 300,
                cellRenderer: (params) => {
                    if (params.data.actionCode === 'Y') {
                        return  'YES'
                    } else {
                        return 'NO'
                    }
                }
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
                headerName: 'Determinant Table',
                field: 'determinantTable',
                width: 400,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Determinant',
                field: 'determinantColumn',
                width: 400
            }
        ];
    }

    changeActionStatus(action: string) {
        this.gridSelectionStatus = action;
    }

    addNewLine = (event: any) => {
        this.secondInputDataChanged = true;
        this.isFormDataChangeStatus = true;
    }

    rowClicked(event: any) {
        let determinantSequence = this.determinantValueses[event.index].determinantValuesPrimaryKey.determinantSequence;
        this.determinantSequence = determinantSequence;
    }

    onLookupFieldDeterminant(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel();
        } else if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: determinant_table is a required field. Enter something other than blanks.';
                this.emptyPopupMessage(message)
            }
        }
        this.type = 'table'
    }

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.tables = this.allTables;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.claimHoldReleaseDeterminantForm.patchValue({
                    determinantTable: res.tableName,
                    determinant:  res.columnName
                });
            }
        });
    }

    setAllTableLookUp() {
        this.allTables = [];
        let tableNames = [
            'GROUP_MASTER'
        ];
        if (Form.getValue(this.claimHoldReleaseDeterminantForm, 'claimType') == 'I') {
            tableNames.push('INST_CLAIM_HEADER');
            tableNames.push('INST_CLAIM_DETAIL');
        } else if (Form.getValue(this.claimHoldReleaseDeterminantForm, 'claimType') == 'P' || Form.getValue(this.claimHoldReleaseDeterminantForm, 'claimType') == '1') {
            tableNames.push('PROFSVC_CLAIM_HEADER');
            tableNames.push('PROFSVC_CLAIM_DETAIL');
        } else if (Form.getValue(this.claimHoldReleaseDeterminantForm, 'claimType') == 'D') {
            tableNames.push('DENTAL_CLAIM_HEADER');
            tableNames.push('DENTAL_CLAIM_DETAIL');
        }

        tableNames.forEach(table => {
            let tempCol = {
                owner: 'DORIS',
                tableName: table
            };
            this.allTables.push(tempCol)
        });

        this.claimHoldReleaseDetermConfig[1].data = this.allTables;
        this.claimHoldReleaseDetermConfig[2].data = this.allTables;
    }

    onChangeTableName(event: any) {
        let tableName = event.target.value;
        let table = this.allTables.filter(f => f.key === tableName);
        if (table && table.length > 0) {
        } else {
            this.claimHoldReleaseDeterminantForm.patchValue({
                determinantTable: null
            });
            this.messageService
                .findByMessageId(4047)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        '4047: ' + message[0].messageText,
                        'Claim Hold Release Determinants'
                    );
                });
        }
        this.type = 'table'
    }

    onChangeDeterminantColumn(event: any) {
        if (this.claimHoldReleaseDeterminantForm.get('determinantTable').value) {
            let table = this.allColumns.filter(f => f.columnName === event.target.value && f.tableName === this.claimHoldReleaseDeterminantForm.get('determinantTable').value);
            if (table && table.length > 0) {
            } else {
                this.claimHoldReleaseDeterminantForm.patchValue({
                    determinantColumn: null
                });
                this.messageService
                    .findByMessageId(4077)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            '4077: ' + message[0].messageText,
                            'Claim Hold Release Determinants'
                        );
                    });
            }
        }
        this.type = 'table'
    }

    populateDynamicForm(values: DeterminantValues[]) {
        this.recordCount = 1;
        if (values && values.length > 0) {
            values.forEach((val: DeterminantValues) => {
                let mockConfig = JSON.parse(JSON.stringify(this.claimHoldReleaseDetermConfig)); // make a copy of original config

                this.claimHoldReleaseDetermConfig.forEach((field, index) => {
                    if (field.name === COBOrderOfLiabilityFieldNames.OPERATOR) {
                        mockConfig[index].value = val.operator;
                        mockConfig[index].disabled = !val.operator;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.FROM_VALUE) {
                        mockConfig[index].value = val.valueFrom;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.THRU_VALUE) {
                        mockConfig[index].value = val.valueThru;
                    }
                });
                let formState: FormRow = new FormRow();
                formState.formFields = mockConfig;
                this.config = mockConfig;
                formState.formFields[1].value
                this.addMoreNewRecord(formState.formFields[1].value, 1);
                this.determinantValuePrevState.push(formState);
            });
            this.determinantValuePrevState = JSON.parse(JSON.stringify(this.determinantValuePrevState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        } else {

        }
    }

    addMoreNewRecord(secDeterminantTable: string, count: number) {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            if (secDeterminantTable !== selectedRows[0].determinantTable) {
                this.recordCount = this.recordCount + count;
            } else {
                this.recordCount = 1;
            }
        }
    }

    saveDynamicForm(event: any) {

        if (event && event.length > 0) {
            let fromValueStatus = false;
            let thruValueStatus = false;
            this.isSaveForm = false;
            let apiRecords = new Array<DeterminantValues>();
            const updatedRecords: FormRow[] = this.determinantValuePrevState.filter(record => record.action);

            if (updatedRecords.length > 0) {
                this.determinantValuePrevState.forEach((preStateRecord: FormRow, index) => {
                    if (preStateRecord.action) {
                        let updatedRecord = event[index];
                        const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                        let indexedValue: DeterminantValues = this.determinantValueses[index];
                        indexedValue.operator = pair[0].value;
                        indexedValue.valueThru = pair[2].value;
                        indexedValue.valueFrom = pair[1].value;
                        indexedValue.action = preStateRecord.action;
                        apiRecords.push(indexedValue);
                    }
                });
            }

            const newRecords = event.slice(this.determinantValuePrevState.length)
            newRecords.forEach(record => {
                const pair = Object.keys(record).map(k => ({ key: k, value: record[k] }));
                let val: DeterminantValues = this.populateDeterminantValueSelectField(pair, FORM_FIELD_ACTION_TYPES.ADD);
                apiRecords.push(val);
            });

            let totalApiRecordSize = apiRecords.length;
            let counter = 0;
            let thruValueCounter = 0;
            let fromValue: string;
            let thruValue: string;
            apiRecords.forEach(record => {
                if (record.valueFrom) {
                    if (record.valueThru) {
                        thruValueCounter = thruValueCounter + 1;
                        if ((Number(record.valueFrom) > Number(record.valueThru))) {
                            fromValue = record.valueFrom;
                            thruValue = record.valueThru;
                            fromValueStatus = true;
                            return false;
                        } else {
                            fromValueStatus = false;
                            counter = counter + 1;
                        }
                        thruValueStatus = false;
                    } else {
                        thruValueStatus = true;
                        return false;
                    }
                } else {
                    fromValueStatus = false;
                    counter = counter + 1;
                    thruValueCounter = thruValueCounter + 1;
                }
            });

            setTimeout(() => {
                if (thruValueCounter === totalApiRecordSize) {
                    if (totalApiRecordSize === counter) {
                        this.determinantValuesService.updateDeterminantValuesDynamicForms(apiRecords).subscribe(resp => {
                            this.toastService.showToast('Records updated Successfully', NgbToastType.Success)
                            this.getDeterminantValuesesByRuleIdSeqId(this.determinantTable.determinantTablesPrimaryKey.seqRuleId, this.determinantTable.determinantTablesPrimaryKey.searchSequence);
                        });
                    } else {
                        this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
                            this.popupAlert1(message[0].messageText.replace('@1', thruValue + '').replace('@2', fromValue), 'COB Hold/Deny Determinants');
                        });
                    }
                } else {
                    this.popupAlert1('Please enter thru value', 'COB Hold/Deny Determinants');
                }
            }, 1000);

        }
    }

    private populateDeterminantValueSelectField(event: any[], action: any) {
        let determinantValues = new DeterminantValues();
        determinantValues.determinantValuesPrimaryKey = {
            determinantSequence: 1,
            searchSequence: this.determinantTable.determinantTablesPrimaryKey.searchSequence,
            seqRuleId: this.determinantTable.determinantTablesPrimaryKey.seqRuleId,
            keyword: this.determinantTable.determinantTablesPrimaryKey.keyword
        };
        determinantValues.determinantValuesPrimaryKeyModel = determinantValues.determinantValuesPrimaryKey;

        determinantValues.valueThru = event[2].value;
        determinantValues.valueFrom = event[1].value;

        determinantValues.operator = event[0].value;
        determinantValues.determinantSequence = 1;
        determinantValues.keyword = this.determinantTable.determinantTablesPrimaryKey.keyword;
        determinantValues.searchSequence = this.determinantTable.determinantTablesPrimaryKey.searchSequence;
        determinantValues.seqRuleId = this.determinantTable.determinantTablesPrimaryKey.seqRuleId;
        determinantValues.securityCode = '0';
        determinantValues.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        determinantValues.insertUser = 'DORIS';
        determinantValues.insertProcess = 'RHDET';
        determinantValues.secDeterminantDatatype = 'VARCHAR2';
        determinantValues.action = action;

        return determinantValues;
    }

    getDeterminantValuesesByRuleIdSeqId(ruleId: any, seqId: any) {
        this.determinantValuesService.getDeterminantValuesByRuleIdAndSearchSeq(ruleId, seqId).subscribe(determinantValueses => {
            this.determinantValueses = determinantValueses;
            this.determinantValuePrevState = [];
            setTimeout(() => {
                this.populateDynamicForm(this.determinantValueses);
            }, 1000);
        });
    }

    saveClaimHoldReleaseDeterm() {
        this.createDetermTable();
    }

    newFormCreation() {
            this.dataGrid002GridOptions.api.deselectAll();
            this.claimHoldReleaseDeterminantForm.reset();
            this.showDynamicGrid = false;
            this.isFieldsReadonly = false;
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimHoldReleaseDeterminantForm = this.formBuilder.group({
            determinantTable: ['', {updateOn: 'blur', validators: []}],
            determinant: ['', {updateOn: 'blur', validators: []}],
            claimType: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        let userId = null;

        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;

        });
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('TOOTH_HISTORY', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.newFormCreation();
                    break;

                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                    this.saveClaimHoldReleaseDeterm();
                    break;
                }
                case 'Close': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Audit Display': {

                }
            }
        }  else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'Open'},
                    {name: 'Save'},
                    {name: 'Close'},
                    {name: '-'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste', disabled: true},
                    {isHorizontal: true},
                    {name: 'Lookup'},
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Hold Release Rule', disabled: true },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', disabled: true },
                ],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'},
                    {name: 'Layer'},
                    {name: 'Cascade'},
                    {name: 'Arrange Icons'},

                    {name: 'Show Timestamp'},
                    {name: 'Audit Display'},

                    {name: '1 Main Menu'},
                    {name: '2 Claim Hold Release Determinant'},
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'},
                ],
            },
        ];
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openTableAndColumnModel();
            }
        }
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    emptyPopupMessage = (message: any) => {
        let popUpMessage = new PopUpMessage(
            'popUpMessageName',
            'COB Hold/Deny Determinants',
            message,
            'icon');
        popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            console.log(resp)
        })
    };

    popupAlert1 = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'OK') {
                    ref.componentInstance.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/RHDET_Claim_Hold_Release_Determinants.htm'
    };

    dynamicFormEvent = () => {
        this.isFormDataChangeStatus = true;
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Bank Account')
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
                    this.createDetermTable();
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

}
