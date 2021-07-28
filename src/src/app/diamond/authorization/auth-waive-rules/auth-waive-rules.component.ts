/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from 'ag-grid-community';
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
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {BenefitPackageMaster, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu} from '../../../shared/models/models';
import {AWAVE_MODULE_ID, MEM_MODULE_ID} from '../../../shared/app-constants';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {NgbToastType} from "ngb-toast";
import {AuthWaiveRulesService} from "../../../api-services/auth-waive-rules.service";
import {AuthWaiveDeterValuesService} from "../../../api-services/auth-waive-deter-values.service";
import {AuthWaiveDeterminantsService} from "../../../api-services/auth-waive-determinants.service";
import {TablesAndColumnsComponent} from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import {
    AUTH_WAIVE_DETER_VALUE_FIELDS,
    AuthWaiveDeterValueFormConfig,
    BenefitRuleSelectionFields,
    BenefitRuleSelectionFormConfig
} from "../../../shared/models/constants";
import {BenefitRuleSelect} from "../../../api-models/benefit-rule-select.model";
import {AuthWaiveDeterValues} from "../../../api-models/auth-waive-deter-values.model";
import {AuthWaiveRules} from "../../../api-models/auth-waive-rules.model";
import {AuthWaiveDeterminants} from "../../../api-models/auth-waive-determinants.model";
import {IMySingleDateModel} from "angular-mydatepicker";
import {AllTabColumnsService} from "../../../shared/services/all-tab-columns.service";
import {getAuthCodeShortcutKeys, getAuthWaiveRules} from "../../../shared/services/shared.service";
import {MenuResponse} from "../../../api-models/menu-response";
import {MenuService} from "../../../shared/services/menu.service";

// Use the Component directive to define the AuthWaiveRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'authwaiverules',
    templateUrl: './auth-waive-rules.component.html',
    providers: [AuthWaiveRulesService, AuthWaiveDeterValuesService, AuthWaiveDeterminantsService, SystemCodesService,
        DddwDtlService, AllTabColumnsService]
})
export class AuthWaiveRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    @Input() showIcon = true;

    @Input() claimType: string;
    authWaiveRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    moduleId = AWAVE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;

    editAuthWaiveRule: boolean = false;
    editAuthWaiveDeterminant: boolean = false;
    authWaiveRule: AuthWaiveRules;
    authWaiveRules: AuthWaiveRules[];
    authWaiveDeterminants: any[];
    authWaiveDeterminant: any;
    authWaiveDeterValues: any[];
    private windowId = 'AWAVE';
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;
    private dataGrid002gridApi: any;
    gridSelectionStatus = true;

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    private dataGrid002gridColumnApi: any;
    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    claimTypes: any[];
    operators: any[];
    isProgress = true;

    columns: any[];
    tables = [{owners: 'DORIS', tableName: 'INST_CLAIM_HEADER'}];
    authWaiveDeterValueSelectState = new Array<FormRow>();
    authWaiveDeterValueSelectionFormConfig = AuthWaiveDeterValueFormConfig;
    isSaveForm = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    num = 1;
    isValidationCheckFirstTime = true;
    formValueValidationMsg = null;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private messageService: MessageMasterDtlService,
        private secUserService: SecUserService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private toastService: ToastService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private secColDetailService: SecColDetailService,
        private authWaiveRulesService: AuthWaiveRulesService,
        private authWaiveDeterValuesService: AuthWaiveDeterValuesService,
        private authWaiveDeterminantsService: AuthWaiveDeterminantsService,
        private allTabColumnsService: AllTabColumnsService,
        private cdr: ChangeDetectorRef,
        private menuSerrvice: MenuService
    ) {
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authWaiveRulesForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthWaiveRules(this));
        this.cdr.detectChanges();
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Yes', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                this.formValueValidationMsg = null;
            }
        })
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

    dataGrid001GridOptionsExportCsv() {
        let params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        let params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    dataGrid003GridOptionsExportCsv() {
        let params = {};
        this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Claim Type',
                field: 'claimType',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Order',
                field: 'awaveOrder',
                width: 200
            },
            {
                headerName: 'From Date',
                field: 'awRuleFromDate',
                width: 200
            },
            {
                headerName: 'Thru Date',
                field: 'awRuleThruDate',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200
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
                headerName: 'Search Sequence',
                field: 'authWaiveDeterminantsPrimaryKey.searchSequence',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Determinant',
                field: 'determinant',
                width: 200
            },
            {
                headerName: 'Operator',
                field: 'operator',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200
            }
        ];
    }

    createDataGrid003(): void {
        this.dataGrid003GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid003GridOptions.editType = 'fullRow';
        this.dataGrid003GridOptions.columnDefs = [
            {
                headerName: 'Det Value From',
                field: '',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Det Value Thru',
                field: '',
                width: 200
            }
        ];
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
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
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_WAIVE_RULES', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();

                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }

                } else {
                    this.showPopUp(
                        'You are not Permitted to view Auth Waive Rules',
                        'Auth Waive Rules Permission'
                    );
                }
            }
        );
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authWaiveRulesForm = this.formBuilder.group({
            seqAwRule: [''],
            claimType: ['', Validators.required],
            fromDate: ['', Validators.required],
            order: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(9999)]],
            thruDate: ['', {validators: []}],
            description001: ['', {validators: []}],
            searchSequence: ['', {validators: []}],
            determinant: ['', {validators: []}],
            determinantTable: ['INST_CLAIM_HEADER'],
            operator: ['', {validators: []}],
            description002: ['', {validators: []}],
            determinantSequence: ['']
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }

    private initializeComponentState(): void {
        this.isProgress = false;
        this.secProgress = false;
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.getClaimType();
        this.getOperators();
        this.getAuthWaiveRules();
        this.getAllColumns();
    }

    getAllColumns() {
        this.allTabColumnsService.getAllTabColumnsByOwnerAndTableName(this.tables[0].owners, this.tables[0].tableName)
            .subscribe((allTabColumns: any) => {
                this.columns = allTabColumns;
            });
    }

    onChangeDeterminant(event) {
        let det = event.target.value;
        let exists = (this.columns && this.columns.length > 0) ? this.columns.find(f => f.columnName === det) ? true : false : false;
        if (!exists) {
            this.messageService.findByMessageId(4077).subscribe((message) => {
                this.showPopUp(
                    "4077 : " + message[0].messageText,
                    "Auth Waive Rules"
                );
                this.authWaiveRulesForm.patchValue({
                    determinant: null
                },{emitEvent : false});
            });
        }
    }

    getAuthWaiveRules() {
        this.authWaiveRulesService.getAuthWaiveRuleses().subscribe((res) => {
            this.authWaiveRules = res;
            this.authWaiveRules.sort((a,b) => a.claimType.localeCompare(b.claimType));
            if (res) {
                this.dataGrid001GridOptions.api.setRowData(res);
                if (res && res.length > 0) {
                    if (this.claimType) {
                        const index = this.authWaiveRules.findIndex(res => res.claimType == this.claimType);
                        this.dataGrid001GridOptions.api.selectIndex(index, false, false);
                        return;
                    }
                    this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                }
            } else {
                this.dataGrid001GridOptions.api.setRowData([]);
            }
        })
    }

    Grid1SelectionChange() {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.editAuthWaiveRule = true;
            this.authWaiveRule = selectedRows[0];
            this.authWaiveRulesForm.patchValue({
                'claimType': this.authWaiveRule.claimType,
                'fromDate': this.authWaiveRule.awRuleFromDate ? this.dateFormatPipe.defaultDisplayDateFormat(this.authWaiveRule.awRuleFromDate) : '',
                'order': this.authWaiveRule.awaveOrder,
                'thruDate': this.authWaiveRule.awRuleThruDate ? this.dateFormatPipe.defaultDisplayDateFormat(this.authWaiveRule.awRuleThruDate) : '',
                'description001': this.authWaiveRule.description,
                'seqAwRule': this.authWaiveRule.seqAwRule
            },{emitEvent : false});
            this.getAuthWaiveDeterminants();
        } else {
            this.editAuthWaiveRule = false;
            this.authWaiveRulesForm.reset();
            this.authWaiveRulesForm.controls['searchSequence'].setValidators([]);
            this.authWaiveRulesForm.controls['determinant'].setValidators([]);
            this.authWaiveRulesForm.controls['operator'].setValidators([]);
            this.authWaiveRulesForm.controls['searchSequence'].setErrors(null);
            this.authWaiveRulesForm.controls['determinant'].setErrors(null);
            this.authWaiveRulesForm.controls['operator'].setErrors(null);
            this.authWaiveRule = null;
            this.authWaiveDeterminant = null;
            this.authWaiveDeterminants = null;
            this.authWaiveDeterValueSelectState = [];
        }
    }

    getAuthWaiveDeterminants() {
        if (this.authWaiveRule && this.authWaiveRule.seqAwRule) {
            this.authWaiveDeterminantsService.findBySeqAwRule(this.authWaiveRule.seqAwRule).subscribe((res) => {
                res = (res ? res : []);
                this.authWaiveDeterminants = res;
                this.authWaiveDeterminants.sort((a,b) =>  (a.authWaiveDeterminantsPrimaryKey.searchSequence > b.authWaiveDeterminantsPrimaryKey.searchSequence) ? 1 :
                    ((b.authWaiveDeterminantsPrimaryKey.searchSequence > a.authWaiveDeterminantsPrimaryKey.searchSequence) ? -1 : 0));
                this.authWaiveDeterminant = null;
                if (res && res.length > 0) {
                    this.dataGrid002GridOptions.api.setRowData(res);
                    this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                } else {
                    this.resetSecondForm();
                    this.dataGrid002GridOptions.api.setRowData([]);
                    this.authWaiveDeterValueSelectState = [];
                }
            });
            this.authWaiveRulesForm.controls['searchSequence'].setValidators([Validators.required]);
            this.authWaiveRulesForm.controls['determinant'].setValidators([Validators.required]);
            this.authWaiveRulesForm.controls['operator'].setValidators([Validators.required]);
        } else {
            this.authWaiveDeterValueSelectState = [];
            this.resetSecondForm();
            this.authWaiveRulesForm.controls['searchSequence'].setValidators([]);
            this.authWaiveRulesForm.controls['determinant'].setValidators([]);
            this.authWaiveRulesForm.controls['operator'].setValidators([]);
            this.authWaiveRulesForm.controls['searchSequence'].setErrors(null);
            this.authWaiveRulesForm.controls['determinant'].setErrors(null);
            this.authWaiveRulesForm.controls['operator'].setErrors(null);
        }
    }

    Grid2SelectionChange() {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        this.authWaiveDeterValueSelectState = [];
        if (selectedRows[0] !== undefined) {
            this.editAuthWaiveDeterminant = true;
            this.authWaiveDeterminant = selectedRows[0];
            this.authWaiveRulesForm.patchValue({
                'searchSequence': this.authWaiveDeterminant.authWaiveDeterminantsPrimaryKey.searchSequence,
                'determinant': this.authWaiveDeterminant.determinant,
                'operator': this.authWaiveDeterminant.operator,
                'description002': this.authWaiveDeterminant.description
            },{emitEvent : false});
            this.getAuthWaiveDeterValues();
            this.isFormDataModified()
        } else {
            this.editAuthWaiveDeterminant = false;
            this.authWaiveDeterminant = null;
            this.resetSecondForm();
        }
    }

    gridSelection(status: boolean) {
        this.gridSelectionStatus = status;
    }

    resetSecondForm() {
        let searchSequence = '1';
        if (this.authWaiveDeterminants && this.authWaiveDeterminants.length > 0) {
            searchSequence = (this.authWaiveDeterminants[this.authWaiveDeterminants.length - 1].authWaiveDeterminantsPrimaryKey.searchSequence + 1) + '';
        }
        this.authWaiveRulesForm.patchValue({
            'searchSequence': searchSequence,
            'determinant': null,
            'determinantTable': 'INST_CLAIM_HEADER',
            'operator': null,
            'description002': null
        },{emitEvent : false});
    }

    getAuthWaiveDeterValues() {
        this.authWaiveDeterValuesService.getAuthWaiveDeterValuesBySearchSequenceAndSeqAwRule(this.authWaiveDeterminant.authWaiveDeterminantsPrimaryKey.searchSequence,
            this.authWaiveRule.seqAwRule).subscribe((res) => {
            res = (res && res.length > 0) ? res : [];
            this.authWaiveDeterValues = res;
            this.populateDynamicForm(res);
        });
    }

    private getClaimType() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', '0').subscribe(ClaimType => {
            this.claimTypes = ClaimType;
        });
    }

    getOperators() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('operator', 'dw_awave_deter_de', 0).subscribe((res: any) => {
            this.operators = res;
        });
    }

    onLookupFieldDeterminant(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel();
        }
    }

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        if (this.authWaiveRulesForm.get("claimType").value == "I") {
            this.tables = [{ owners: "DORIS", tableName: "INST_CLAIM_HEADER" }];
        }
        if (this.authWaiveRulesForm.get("claimType").value == "D") {
            this.tables = [
                { owners: "DORIS", tableName: "DENTAL_CLAIM_HEADER" },
            ];
        }
        if (this.authWaiveRulesForm.get("claimType").value == "P") {
            this.tables = [
                { owners: "DORIS", tableName: "PROFSVC_CLAIM_HEADER" },
            ];
        }
        ref.componentInstance.tables = this.tables;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.authWaiveRulesForm.patchValue({
                    determinantTable: res.tableName,
                    determinant: res.columnName
                },{emitEvent : false});
            }
        });
    }

    populateDynamicForm(AuthWaiveDeterValue: AuthWaiveDeterValues[]) {

        AuthWaiveDeterValue.forEach((record: AuthWaiveDeterValues) => {
            let mockConfig = JSON.parse(JSON.stringify(this.authWaiveDeterValueSelectionFormConfig));    // make a copy of original config
            this.authWaiveDeterValueSelectionFormConfig.forEach((field, index) => {
                if (field.name === AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_FROM) {
                    mockConfig[index].value = record.detFromValue;
                } else if (field.name === AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_TO) {
                    mockConfig[index].value = record.detThruValue;
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.authWaiveDeterValueSelectState.push(formState);          // add record
        })
        this.authWaiveDeterValueSelectState = JSON.parse(JSON.stringify(this.authWaiveDeterValueSelectState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    saveAuthWaiveDeterValues(event) {
        this.isSaveForm = false;

        let apiRecords = new Array<AuthWaiveDeterValues>();
        const updatedRecords: FormRow[] = this.authWaiveDeterValueSelectState.filter(record => record.action);
        if (updatedRecords.length > 0) {
            this.authWaiveDeterValueSelectState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let indexedValue: AuthWaiveDeterValues = this.authWaiveDeterValues[index];

                    indexedValue.detFromValue = pair[0].value;
                    indexedValue.detThruValue = pair[1].value;
                    indexedValue.action = preStateRecord.action;
                    apiRecords.push(indexedValue);
                }
            });
        }

        const newRecords = event.slice(this.authWaiveDeterValueSelectState.length)

        let seq = (this.authWaiveDeterValues && this.authWaiveDeterValues.length > 0) ? this.authWaiveDeterValues[this.authWaiveDeterValues.length - 1].authWaiveDeterValuesPrimaryKey.determinantSequence : 0;
        let cnt = 1;
        newRecords.forEach(record => {
            const pair = Object.keys(record).map(k => ({key: k, value: record[k]}));
            let val: AuthWaiveDeterValues = this.populateAuthWaiveDeterValuesSelectField(pair, FORM_FIELD_ACTION_TYPES.ADD);
            val.authWaiveDeterValuesPrimaryKeyModel.determinantSequence = (val.authWaiveDeterValuesPrimaryKeyModel.determinantSequence) ? val.authWaiveDeterValuesPrimaryKeyModel.determinantSequence : (seq + cnt);
            apiRecords.push(val);
            ++cnt;
        });
        this.authWaiveDeterValuesService.updateAuthWaiveDeterValuesForm(apiRecords).subscribe(resp => {
            this.toastService.showToast('Records updated Successfully', NgbToastType.Success)
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New', shortcutKey: 'Ctrl + N'}, {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Delete', shortcutKey: 'Ctrl + D'}, {name: 'Save', shortcutKey: 'Ctrl + S'},
                    {name: 'Close', shortcutKey: 'Ctrl + F4'}, {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'}, {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true}, {name: 'Print', disabled: true}, {isHorizontal: true}, {name: 'Exit', shortcutKey: 'Alt + F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', shortcutKey: 'Ctrl + Z', disabled: true}, {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl + X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl + C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl + V', disabled: true}, {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'}, {name: 'Previous', shortcutKey: 'F7'}, {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [{name: 'Tile', shortcutKey: 'Ctrl + Alt + T'}, {
                    name: 'Layer',
                    shortcutKey: 'Ctrl + Alt + L'
                },
                    {name: 'Cascade', shortcutKey: 'Ctrl + Alt + C'}, {
                        name: 'Arrange Icons',
                        shortcutKey: 'Ctrl + Alt + I'
                    },
                    {isHorizontal: true}, {name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S'},
                    {name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A'}, {isHorizontal: true}, {name: '1 Main Menu'},
                    {name: '2 Auth Waive Rules'}]
            },
            {
                menuItem: 'Help',
                dropdownItems: [{name: 'Contents'}, {name: 'Search for Help on...'}, {
                    name: 'This Window',
                    shortcutKey: 'F1'
                },
                    {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}]
            }
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewAuthWaiveRules();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    this.saveRecord();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    saveAuthWaiveRule() {
        if (!this.authWaiveRule) {
            this.saveAuthWaiveRules();
        } else if (this.authWaiveRule) {
            this.saveAuthWaiveDeterminants();
        }
    }

    public saveAuthWaiveRules() {
        if (this.editAuthWaiveRule) {
            this.updateAuthWaiveRules();
        } else {
            this.createAuthWaiveRules();
        }
    }

    private updateAuthWaiveRules() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authWaiveRulesForm.valid) {
            this.authWaiveRule.claimType = Form.getValue(this.authWaiveRulesForm, 'claimType');
            this.authWaiveRule.awaveOrder = Form.getValue(this.authWaiveRulesForm, 'order');
            this.authWaiveRule.awRuleFromDate = Form.getDatePickerValue(this.authWaiveRulesForm, 'fromDate');
            this.authWaiveRule.awRuleThruDate = (this.authWaiveRulesForm.value.thruDate ? Form.getDatePickerValue(this.authWaiveRulesForm,
                'thruDate') : null);
            this.authWaiveRule.description = Form.getValue(this.authWaiveRulesForm, 'description001');
            this.authWaiveRulesService.updateAuthWaiveRules(this.authWaiveRule, this.authWaiveRule.seqAwRule).subscribe((res) => {
                this.toastService.showToast('Record updated successfully.', NgbToastType.Success)
            });
            if (this.screenCloseRequest === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000);
                this.isFormDataChangeStatus = false;
            }
        } else {
            this.toastService.showToast('Required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
        this.isFormDataChangeStatus = false;
        // }
    }

    private createAuthWaiveRules() {
        // if (this.secWin && this.secWin.hasInsertPermission()) {
        this.formValidation.validateForm();
        let authWaiveRule = new AuthWaiveRules();
        authWaiveRule.claimType = Form.getValue(this.authWaiveRulesForm, 'claimType');
        authWaiveRule.awaveOrder = Form.getValue(this.authWaiveRulesForm, 'order');
        authWaiveRule.awRuleFromDate = Form.getDatePickerValue(this.authWaiveRulesForm, 'fromDate');
        authWaiveRule.awRuleThruDate = (this.authWaiveRulesForm.value.thruDate ? Form.getDatePickerValue(this.authWaiveRulesForm,
            'thruDate') : null);
        authWaiveRule.description = Form.getValue(this.authWaiveRulesForm, 'description001');
        this.authWaiveRulesService.createAuthWaiveRules(authWaiveRule).subscribe((res) => {
            this.toastService.showToast('Record created successfully.', NgbToastType.Success);
            this.getAuthWaiveRules();
        });
        if (this.screenCloseRequest === true) {
            setTimeout(() => {
                this.activeModal.close()
            }, 2000);
            this.isFormDataChangeStatus = false;
        }
        this.isFormDataChangeStatus = false;
        // }
    }

    private saveAuthWaiveDeterminants() {
        if (this.editAuthWaiveDeterminant) {
            this.updateAuthWaiveRules();
            this.updateAuthWaiveDeterminants();
        } else {
            this.createAuthWaiveDeterminants();
            setTimeout(() => {
                this.getAuthWaiveDeterminants();
            }, 2000);
        }
    }

    private updateAuthWaiveDeterminants() {
        if (this.authWaiveRulesForm.valid) {
            this.authWaiveDeterminant.operator = Form.getValue(this.authWaiveRulesForm, 'operator');
            this.authWaiveDeterminant.description = Form.getValue(this.authWaiveRulesForm, 'description002');
            this.authWaiveDeterminantsService.updateAuthWaiveDeterminants(this.authWaiveDeterminant, this.authWaiveDeterminant.authWaiveDeterminantsPrimaryKey.searchSequence,
                this.authWaiveRule.seqAwRule).subscribe((res) => {
                this.isFormDataChangeStatus = false;
                this.toastService.showToast('Record updated successfully.', NgbToastType.Success)
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
        this.isFormDataChangeStatus = false;
    }

    private createAuthWaiveDeterminants() {
        if (this.authWaiveRulesForm.valid) {
            let authWaiveDeterminant = new AuthWaiveDeterminants();
            authWaiveDeterminant.authWaiveDeterminantsPrimaryKeyModel = {
                searchSequence: Form.getValue(this.authWaiveRulesForm, 'searchSequence'),
                seqAwRule: this.authWaiveRule.seqAwRule
            };
            authWaiveDeterminant.operator = Form.getValue(this.authWaiveRulesForm, 'operator');
            authWaiveDeterminant.description = Form.getValue(this.authWaiveRulesForm, 'description002');
            authWaiveDeterminant.determinant = Form.getValue(this.authWaiveRulesForm, 'determinant');
            authWaiveDeterminant.determinantTable = Form.getValue(this.authWaiveRulesForm, 'determinantTable');
            this.authWaiveDeterminantsService.createAuthWaiveDeterminants(authWaiveDeterminant).subscribe((res) => {
                this.isFormDataChangeStatus = false;
                this.toastService.showToast('Record created successfully.', NgbToastType.Success);
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
        this.isFormDataChangeStatus = false;
    }

    private populateAuthWaiveDeterValuesSelectField(event: any[], action: any) {
        let authWaiveDeterValue = new AuthWaiveDeterValues();
        authWaiveDeterValue.authWaiveDeterValuesPrimaryKeyModel = {
            seqAwRule: this.authWaiveRule.seqAwRule,
            searchSequence: Form.getValue(this.authWaiveRulesForm, 'searchSequence'),
            determinantSequence: Form.getValue(this.authWaiveRulesForm, 'determinantSequence')
        };
        authWaiveDeterValue.detFromValue = event[0].value;
        authWaiveDeterValue.detThruValue = event[1].value;
        authWaiveDeterValue.action = action;
        return authWaiveDeterValue;
    }

    validateFromDate(event) {
        if (event.singleDate) {
            let fromDate = this.getDate(event.singleDate);
            let today = new Date();
            if (this.authWaiveRulesForm.value.thruDate) {
                let thruDate = this.getDate(this.authWaiveRulesForm.value.thruDate.singleDate);
                if (thruDate < fromDate) {
                    this.messageService.findByMessageId(70493).subscribe((message) => {
                        this.showPopUp(
                            "70493 : " + message[0].messageText,
                            "Auth Waive Rules"
                        );
                        this.authWaiveRulesForm.patchValue({
                            thruDate: null
                        },{emitEvent : false});
                    })
                }
            }
        }
    }

    validateThruDate(event) {
        if (event.singleDate) {
            let thruDate = this.getDate(event.singleDate);
            let today = new Date();
            if (this.authWaiveRulesForm.value.fromDate) {
                let fromDate = this.getDate(this.authWaiveRulesForm.value.fromDate.singleDate);
                if (fromDate > thruDate) {
                    this.messageService.findByMessageId(70493).subscribe((message) => {
                        this.showPopUp(
                            "70493 : " + message[0].messageText,
                            "Auth Waive Rules"
                        );
                        this.authWaiveRulesForm.patchValue({
                            thruDate: null
                        },{emitEvent : false});
                    })
                }
            }
        }
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Auth Waive Rules')
            })
        } else {
            this.activeModal.close();
        }
    }

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
                    this.saveAuthWaiveRules()
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
        this.authWaiveRulesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });

    }

    createNewAuthWaiveRules = () => {
        if (this.isSuperUser) {
            this.createNewRecord();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.createNewRecord();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Auth Waive Rules')
                });
            }
        }
    };

    onFieldChange = (event) => {
        try {
            const fromValue = event.data[AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_FROM + event.index];
            const thruValue = event.data[AUTH_WAIVE_DETER_VALUE_FIELDS.DET_VALUE_TO + event.index];
            if (!thruValue) {
                this.isValidationCheckFirstTime = false;
                return;
            }
            const isInvalid = Number(fromValue) > Number(thruValue);
            if (!this.isValidationCheckFirstTime)
                this.displayFromThruValidationMessage(isInvalid, fromValue, thruValue);
        } catch (e) {
            this.showPopUp('Field Value is not Valid', 'Auth Waive Rules')
        }
    };

    displayFromThruValidationMessage(isInValid: boolean, fromValue: any, thruValue: any) {
        if (isInValid) {
            if (this.formValueValidationMsg) {
                this.showPopUp("4060: " + this.formValueValidationMsg, 'Auth Waive Rules');
                return
            }
            this.num = 1;
            if (this.num === 1) {
                this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
                    this.formValueValidationMsg = message[0].messageText.replace('@1', thruValue).replace('@2', fromValue);
                    this.showPopUp("4060: " + this.formValueValidationMsg, 'Auth Waive Rules');
                    this.isValidationCheckFirstTime = false;
                    --this.num;
                });
            }
        }
    };

    disableMenu() {
        if (this.userTemplateId == "UT_VIEW") {
            this.menu[0]["dropdownItems"][0].disabled = true;
            this.menu[0]["dropdownItems"][2].disabled = true;
            this.menu[0]["dropdownItems"][3].disabled = true;
        }
    }

    saveRecord() {
        if (!this.authWaiveRule) {
            if (this.isSuperUser) {
                this.saveAuthWaiveRules();
            } else {
                if (this.secWin.hasUpdatePermission()) {
                    this.saveAuthWaiveRules();
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Auth Waive Rules')
                    });
                }
            }
        } else if (this.authWaiveRule) {
            if (this.isSuperUser) {
                this.saveAuthWaiveDeterminants();
            } else {
                if (this.secWin.hasUpdatePermission()) {
                    this.saveAuthWaiveDeterminants();
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Auth Waive Rules')
                    });
                }
            }

        }
    };

    formPopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    createNewRecord() {
        if (this.gridSelectionStatus) {
            this.authWaiveRule = null;
            this.authWaiveDeterminant = null;
            this.editAuthWaiveRule = false;
            this.authWaiveDeterminants = [];
            this.dataGrid001GridOptions.api.deselectAll();
            this.authWaiveRulesForm.reset();
        } else {
            this.editAuthWaiveDeterminant = false;
            this.authWaiveDeterminant = null;
            this.dataGrid002GridOptions.api.deselectAll();
            this.resetSecondForm();
        }
    }
}
