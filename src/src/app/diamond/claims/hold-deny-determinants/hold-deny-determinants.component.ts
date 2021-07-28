/* Copyright (c) 2021 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeterminantRules, DeterminantTables, DeterminantValues, MessageMasterDtl, SecUser, } from '../../../api-models'
import {
    DddwDtlService,
    DeterminantRulesService,
    DeterminantTablesService,
    DeterminantValuesService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    SecUserService,
    SystemCodesService
} from '../../../api-services'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { ToastService } from '../../../shared/services/toast.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, FormField, OPERATIONS} from '../../../shared/models/models';
import { NgbToastType } from 'ngb-toast';
import { AllTabColumnsService } from '../../../shared/services/all-tab-columns.service';
import { AllTabColumns } from '../../../shared/models/all-tab-columns.model';
import { TablesAndColumnsComponent } from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import { DatePipe } from "@angular/common";
import { COBOrderLiabilityFormConfig, COBOrderOfLiabilityFieldNames } from "../../../shared/models/constants";
import { getCOBHoldDenyShortcutKeys } from '../../../shared/services/shared.service';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { DeterminantRulesPrimaryKey } from '../../../api-models/determinant-rules-primary-key';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";


// Use the Component directive to define the HoldDenyDeterminantsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'holddenydeterminants',
    templateUrl: './hold-deny-determinants.component.html',
    providers: [DatePipe]
})
export class HoldDenyDeterminantsComponent implements OnInit, AfterViewInit {

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    holdDenyDeterminantsForm: FormGroup;
    holdDenyDeterminantTableForm: FormGroup;
    formValidation: FormValidation;
    tableFormValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'COBHD';
    public isSuperUser = false;
    public secProgress = true;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];
    determinantValueses: DeterminantValues[];
    editDeterminantRules: Boolean = true;
    determinantTable: DeterminantTables;
    gridSelectionStatus: String = '001';
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];
    determinantRule: any;
    determinantRuleHeader: any;
    userTemplateId: string;
    inProgress = true;
    secColDetails = new Array<SecColDetail>();
    private dataGrid001gridApi: any;
    private dataGrid002gridApi: any;
    private dataGrid003gridApi: any;
    public menu: Menu[] = [];
    authorizationReasons: any[] = [];
    reasonCodes = [];
    determinantActions: any[] = [];
    actionCodesMap = new Map();
    claimTypes: any[] = [];
    allTables: any[] = [];
    allColumns: AllTabColumns[] = [];
    selectedColumns: AllTabColumns[] = [];
    type: string;
    cobOrderLiabilityFormConfig = COBOrderLiabilityFormConfig;
    config: any;
    determinantValuePrevState: Array<FormRow> = [];
    isSaveForm = false;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('sequence') sequenceEle: any;
    errorOrderSame: boolean;
    customTable = {
        'fileType1': '',
        'actionCode': '',
        'ruleOrder': '',
        'reasonCode': '',
        'description': ''
    };
    screenCloseRequest: boolean = false;
    inputDataChanged: boolean = false;
    selectedActionCode: any;
    secondInputDataChanged: Boolean = false;
    newAddedRowNo: number = 0;
    seqRuleId: any;
    keyword: any;
    searchSequence: any;
    determinantSequence: any;
    recordCount: number = 1;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    inputGrid1Change: boolean = false;
    inputGrid1ValueChange: boolean = false;
    inputGrid2Change: boolean = false;
    inputGrid2ValueChange: boolean = false;
    grid1Status:boolean=false;
    grid2Status:boolean=false;
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        public datepipe: DatePipe,
        private messageService: MessageMasterDtlService,
        private determinantTablesService: DeterminantTablesService,
        private determinantRulesService: DeterminantRulesService,
        private determinantValuesService: DeterminantValuesService,
        private dddwDtlService: DddwDtlService,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        public activeModal: NgbActiveModal,
        public AllTabColumnsService: AllTabColumnsService,
        private SystemCodesService: SystemCodesService,
        private datePipe: DatePipe,
        private auditService:AuditService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.holdDenyDeterminantsForm);
        this.tableFormValidation = new FormValidation(this.holdDenyDeterminantTableForm);
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCOBHoldDenyShortcutKeys(this));
        this.cdr.detectChanges();
    }

    initializeComponentState() {
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        this.getDeterminantReasons();
        this.getDeterminantActions();
        this.getDeterminantRuleses();
        this.setAllTableLookUp();
        this.getAllColumnsLookUp();
        this.getClaimTypes();
        this.holdDenyDeterminantsForm.valueChanges.subscribe(() => {
            this.popupClose = true;
            this.inputGrid1Change = true;
        });
        this.holdDenyDeterminantTableForm.valueChanges.subscribe(() => {
            this.inputGrid2Change = true;
        });
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
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

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    indexValue: number;
    selectedGrid1Index:number;
    onRowClicked(data: any) {
        if ((!this.inputGrid2Change) || (!this.inputGrid2ValueChange)) {
            if (!this.inputGrid1ValueChange) {
                this.determinantRules = new DeterminantRules();
                let determinantRules = new DeterminantRules();
                let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
                this.determinantRule = selectedRows[0];
                this.determinantRuleHeader = selectedRows[0];
                let selectedNodes = this.dataGrid001GridOptions.api.getSelectedNodes();
                if (selectedRows[0] !== undefined) {
                    this.type = 'table';
                    determinantRules = selectedRows[0];
                    let count = selectedNodes[0].childIndex;
                    this.indexValue = count;
                    if (count == 0) {
                        count = count + 1;
                    }
                    if (count !== this.newAddedRowNo) {
                        this.editDeterminantRules = true;
                    } else {
                        this.editDeterminantRules = false;
                    }
                    this.setForm1Values(determinantRules);
                } else {
                    this.type = 'rule';
                    this.determinantRule = null;
                    this.determinantTable = null;
                    this.holdDenyDeterminantsForm.patchValue({
                        'claimType': 'I',
                        'actionCode': null,
                        'orderNo': null,
                        'reasonCode': null,
                        'description': null
                    });
                    this.holdDenyDeterminantsForm.controls['claimType'].enable();
                    this.holdDenyDeterminantsForm.controls['actionCode'].enable();
                    this.holdDenyDeterminantsForm.controls['orderNo'].enable();
                    this.holdDenyDeterminantsForm.controls['reasonCode'].enable();
                    this.resetFormGrid2();
                    this.indexValue = null;
                }
                this.setAllTableLookUp()
                this.inputGrid1ValueChange = false;
                this.grid1Status=false;
            } else {
                let selectedNodes = this.dataGrid001GridOptions.api.getSelectedNodes();
                let count = selectedNodes[0].childIndex;
                if (selectedNodes[0] != undefined) {
                    if (this.indexValue !== count) {
                        this.gridSelectionStatus = '001';
                        this.selectedGrid1Index=count;
                        this.popupAction();
                        this.grid1Status=false;
                    }
                }
            }
        } else {
            let selectedNodes = this.dataGrid001GridOptions.api.getSelectedNodes();
            let count = selectedNodes[0].childIndex;
            if (this.indexValue !== count) {
                this.dataGrid001GridOptions.api.selectIndex(this.indexValue, null, null);
                this.gridSelectionStatus = '002';
                this.grid1Status=true;
                this.selectedGrid1Index=count;
                this.popupAction();
            }
        }
    }

    setForm1Values(determinantRules: DeterminantRules) {
        this.holdDenyDeterminantsForm.patchValue({
            'claimType': determinantRules.fileType,
            'actionCode': this.getDetermiantActionByid(determinantRules.actionCode),
            'orderNo': determinantRules.ruleOrder,
            'reasonCode': determinantRules.reasonCode,
            'description': determinantRules.description
        });
        if (determinantRules.determinantRulesPrimaryKey !== undefined) {
            this.seqRuleId = determinantRules.determinantRulesPrimaryKey.seqRuleId;
            this.keyword = determinantRules.determinantRulesPrimaryKey.keyword;
            this.getDeterminantTablesesByRuleId(determinantRules.determinantRulesPrimaryKey.seqRuleId);
        }
        this.popupClose = false;
    }


    getDetermiantActionByid(actionCode: any): string {
        let keyvalue;
        if (this.determinantActions !== null) {
            this.determinantActions.forEach(determinantAction => {
                if (determinantAction.value === actionCode) {
                    keyvalue = determinantAction.key;
                }
            });
        }
        return keyvalue;
    }

    indexValueGrid2: number;
    selectedGrid2Index:number;
    onRowClickedGrid002(data: any) {
        if ((!this.inputGrid1Change) || (!this.inputGrid1ValueChange)) {
            if (!this.inputGrid2ValueChange) {
                let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
                let selectedNodes = this.dataGrid002GridOptions.api.getSelectedNodes();
                this.determinantTable = null;
                this.type = 'table';
                if (selectedRows[0] !== undefined) {
                    this.determinantTable = selectedRows[0];
                    this.searchSequence = selectedRows[0].determinantTablesPrimaryKey.searchSequence;
                    let count = selectedNodes[0].childIndex;
                    this.indexValueGrid2 = count;

                    this.editDeterminantTables = true;
                    if (this.determinantTable != null) {
                        this.holdDenyDeterminantTableForm.patchValue({
                            'sequence': this.determinantTable.determinantTablesPrimaryKey.searchSequence,
                            'determinant': this.determinantTable['determinantTable'],
                            'determinantColumn': this.determinantTable['determinantColumn'],
                        });
                        this.onTableSelect(this.determinantTable['determinantTable']);
                        this.getDeterminantValuesesByRuleIdSeqId(this.determinantTable.determinantTablesPrimaryKey.seqRuleId, this.determinantTable.determinantTablesPrimaryKey.searchSequence);
                    }
                    this.inputGrid1ValueChange = false;
                } else {
                    this.indexValueGrid2 = null;
                    this.resetFormGrid2();
                }
            } else {
                let selectedNodes = this.dataGrid002GridOptions.api.getSelectedNodes();
                if (selectedNodes[0] != undefined) {
                    let count = selectedNodes[0].childIndex;
                    if (this.indexValueGrid2 !== count) {
                        this.selectedGrid2Index=count;
                        this.popupAction();
                    }
                }
            }
            this.grid2Status=false;
        } else {
            let selectedNodes = this.dataGrid002GridOptions.api.getSelectedNodes();
            let count = selectedNodes[0].childIndex;
            if (this.indexValueGrid2 !== count) {
                this.dataGrid002GridOptions.api.selectIndex(this.indexValueGrid2, null, null);
                this.gridSelectionStatus = '001';
                this.grid2Status=true;
                this.selectedGrid2Index=count;
                this.popupAction();
            }
        }
    }

    resetFormGrid2() {
        this.editDeterminantTables = false;
        this.determinantValuePrevState = [];
        this.determinantTable = null;
        this.editDeterminantTables = false;
        this.type = 'table';
        this.holdDenyDeterminantTableForm.patchValue({
            'sequence': null,
            'determinant': null,
            'determinantColumn': null
        });
    }

    saveDeterminantTables() {
        if (this.editDeterminantTables) {
        } else {
            this.createDeterminantTables();
        }
    }


    deleteDeterminantTables(keyword: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantTablesService.deleteDeterminantTables(keyword).subscribe(response => {
                this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
            });
        }
    }

    getDeterminantTables(keyword: string) {
        this.determinantTablesService.getDeterminantTables(keyword).subscribe(determinantTables => {
            this.determinantTables = determinantTables;
            this.holdDenyDeterminantsForm.patchValue({});
        });
    }

    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
            this.determinantTableses = determinantTableses;
        });
    }

    getDeterminantTablesesByRuleId(ruleId: any) {
        this.determinantTablesService.getDeterminantTablesBySeqRuleId(ruleId).subscribe(determinantTableses => {
            this.determinantTableses = determinantTableses;
            this.resetFormGrid2();
            this.dataGrid002GridOptions.api.setRowData(this.determinantTableses);
            if (this.determinantTableses && this.determinantTableses.length > 0) {
                this.dataGrid002GridOptions.api.selectIndex(0, null, null);
            }
        });
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

    createDeterminantTables() {
        this.tableFormValidation.validateForm();
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0 && this.holdDenyDeterminantTableForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.determinantTablesPrimaryKey = {
                searchSequence: Form.getValue(
                    this.holdDenyDeterminantTableForm,
                    "sequence"
                ),
                keyword: "COBHD",
                seqRuleId: this.seqRuleId,
            };
            determinantTables.determinantColumn = Form.getValue(
                this.holdDenyDeterminantTableForm,
                "determinantColumn"
            );
            determinantTables.determinantTable = Form.getValue(
                this.holdDenyDeterminantTableForm,
                "determinant"
            );
            determinantTables.keyword = "COBHD";
            determinantTables.searchSequence = Form.getValue(
                this.holdDenyDeterminantTableForm,
                "sequence"
            );

            determinantTables.seqRuleId = this.seqRuleId;
            let date = new Date();
            let today = this.datepipe.transform(date, "dd-MM-yyyy");
            determinantTables.subsInd = "Y";
            determinantTables.securityCode = "0";
            determinantTables.insertDatetime = today;
            determinantTables.insertUser = "DORIS";
            determinantTables.insertProcess = "COBOR";
            determinantTables.determinantDatatype = "VARCHAR2";
            this.auditService.setAuditFields(determinantTables, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);
            this.determinantTablesService
                .createDeterminantTables(determinantTables)
                .subscribe((response) => {
                    this.determinantTable = response;
                    this.toastService.showToast(
                        "Record successfully created.",
                        NgbToastType.Success
                    );
                    this.editDeterminantTables = true;
                    this.inputDataChanged = false;
                    this.secondInputDataChanged = false;
                    this.getDeterminantTablesesByRuleId(this.seqRuleId);
                    this.inputGrid2ValueChange = false;
                    this.inputGrid1Change = false;
                });

        } else {
            // tslint:disable-next-line:max-line-length
        }
    }


    updateDeterminantTables(keyword: string) {
        this.tableFormValidation.validateForm();
        if (this.holdDenyDeterminantTableForm.valid) {
            this.determinantTable.determinantTablesPrimaryKey = {
                searchSequence: Form.getValue(this.holdDenyDeterminantTableForm, 'sequence'),
                keyword: 'COBHD',
                seqRuleId: this.determinantRule.determinantRulesPrimaryKey.seqRuleId
            };
            this.determinantTable.determinantColumn = Form.getValue(this.holdDenyDeterminantTableForm, 'determinantColumn');
            this.determinantTable.determinantTable = Form.getValue(this.holdDenyDeterminantTableForm, 'determinant');
            this.determinantTable.keyword = 'COBHD';
            this.determinantTable.searchSequence = Form.getValue(this.holdDenyDeterminantTableForm, 'sequence');
            this.determinantTable.seqRuleId = this.determinantRule.determinantRulesPrimaryKey.seqRuleId;
            this.determinantTablesService.updateDeterminantTablesByPk(this.determinantTable, this.determinantTable.determinantTablesPrimaryKey.searchSequence,
                this.determinantTable.determinantTablesPrimaryKey.seqRuleId, this.determinantTable.determinantTablesPrimaryKey.keyword).subscribe(response => {
                    this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                    this.editDeterminantTables = true;
                });
        } else {
            // tslint:disable-next-line:max-line-length
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveDeterminantRules() {
        if (this.gridSelectionStatus === '001') {
            if (this.editDeterminantRules) {
                this.updateDeterminantRules()
            } else {
                this.createDeterminantRules();
            }
        }
        if (this.gridSelectionStatus === '002') {
            if (this.editDeterminantTables) {
            } else {
                this.createDeterminantTables();
            }
        }
    }

    updateDeterminantRules() {
        let determinantRulesPrimaryKey = new DeterminantRulesPrimaryKey();
        let determinantRules = new DeterminantRules();
        this.formValidation.validateForm();
        if (this.holdDenyDeterminantsForm.valid) {
            var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
            if (selectedRows[0] !== undefined) {
                determinantRules = selectedRows[0];
                determinantRules.description = Form.getValue(
                    this.holdDenyDeterminantsForm,
                    "description"
                );
                determinantRulesPrimaryKey.keyword = determinantRules.determinantRulesPrimaryKey.keyword;
                determinantRulesPrimaryKey.seqRuleId = determinantRules.determinantRulesPrimaryKey.seqRuleId;
                determinantRules.determinantRulesPrimaryKey = determinantRulesPrimaryKey;
                this.auditService.setAuditFields(determinantRules, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);
                this.determinantRulesService
                    .updateDeterminantRules(
                        determinantRules,
                        determinantRules.determinantRulesPrimaryKey.seqRuleId,
                        "COBHD"
                    )
                    .subscribe((response) => {
                        this.toastService.showToast(
                            "Record successfully updated.",
                            NgbToastType.Success
                        );
                        this.inputGrid1ValueChange = false;
                        this.editDeterminantRules = true;
                        if (this.closeStatus === true) {
                            this.activeModal.close();
                        } else {
                            setTimeout(() => {
                                this.getDeterminantRuleses();
                            }, 500);
                        }
                        this.popupClose = false;


                    });
            }
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }

    }

    createDeterminantRules() {
        if (this.errorOrderSame) {
            this.messageService
                .findByMessageId(70913)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "70913: " + message[0].messageText,
                        "COB Hold/Deny Determinants"
                    );
                });
            return;
        }

        this.formValidation.validateForm();
        if (this.holdDenyDeterminantsForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.actionCode = Form.getValue(this.holdDenyDeterminantsForm, 'actionCode');
            determinantRules.fileType = Form.getValue(this.holdDenyDeterminantsForm, 'claimType');
            determinantRules.ruleOrder = Form.getValue(this.holdDenyDeterminantsForm, 'orderNo');
            determinantRules.reasonCode = Form.getValue(this.holdDenyDeterminantsForm, 'reasonCode');
            determinantRules.description = Form.getValue(this.holdDenyDeterminantsForm, 'description');
            determinantRules.ruleId = '0';
            determinantRules.securityCode = '0';

            let updatedDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
            let insertUser = sessionStorage.getItem('user');
            let insertProcess = this.windowId;
            determinantRules.insertDatetime = updatedDate;
            determinantRules.insertUser = insertUser
            determinantRules.insertProcess = insertProcess;
            determinantRules.updateDatetime = updatedDate;
            determinantRules.updateUser = insertUser;
            determinantRules.updateProcess = insertProcess;
            determinantRules.determinantRulesPrimaryKey={
                seqRuleId:0,
                keyword:'COBHD'
            };
            this.auditService.setAuditFields(determinantRules, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);
            this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                this.determinantRule = response;
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.getDeterminantRuleses();
                this.editDeterminantRules = true;
                this.inputGrid1ValueChange = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRules('COBHD').subscribe((determinantRuleses: any) => {
            this.determinantRuleses = determinantRuleses;
            this.determinantRuleses.sort((a, b) => {
                return b.actionCode > a.actionCode ? 1 : -1
            });
            this.determinantRuleses.sort((a, b) => {
                return b.ruleOrder - a.ruleOrder
            });
            this.determinantRuleses.sort((a, b) => {
                return a.fileType > b.fileType ? 1 : -1
            });
            if (this.determinantRuleses.length > 0) {

                for (var i = 0; i < this.determinantRuleses.length; i++) {
                    for (var j = 0; j < this.claimTypes.length; j++) {
                        if (determinantRuleses[i].fileType == this.claimTypes[j].systemCode) {
                            determinantRuleses[i].fileType1 = this.claimTypes[j].systemCodeDesc1;
                        }
                        if (determinantRuleses[i].fileType == 1) {
                            determinantRuleses[i].fileType1 = 1;
                        }
                    }
                }

            }
            this.dataGrid001GridOptions.api.setRowData(this.determinantRuleses);
            setTimeout(() => {
                if (this.determinantRuleses && this.determinantRuleses.length > 0) {
                    this.dataGrid001GridOptions.api.selectIndex(0, null, null);
                    this.newAddedRowNo = this.determinantRuleses.length - 1;
                }
            }, 200);
        });

    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.holdDenyDeterminantsForm = this.formBuilder.group({
            claimType: ['', { validators: [Validators.required] }],
            actionCode: ['', { validators: [Validators.required] }],
            orderNo: ['', { validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(4)] }],
            reasonCode: ['', { validators: [Validators.required] }],
            description: ['', { validators: [Validators.maxLength(60)] }]
        });

        this.holdDenyDeterminantTableForm = this.formBuilder.group({
            sequence: ['', { validators: [Validators.required, Validators.pattern("^[0-9]*$")] }],
            determinant: ['', { validators: [Validators.required] }],
            determinantColumn: ['', { validators: [Validators.required] }]
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
                field: 'fileType1',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Order No',
                field: 'ruleOrder',
                width: 100
            },
            {
                headerName: 'Action',
                field: 'actionCode',
                width: 150,
                valueGetter: this.getActionCode.bind(this)
            },
            {
                headerName: 'Reason Code',
                field: 'reasonCode',
                width: 150
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 400,
                resizable: true
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
                headerName: 'Sequence',
                field: 'determinantTablesPrimaryKey.searchSequence',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Determinant Table',
                field: 'determinantTable',
                width: 200
            },
            {
                headerName: 'Determinant Column',
                field: 'determinantColumn',
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
                headerName: 'Operator',
                field: 'operator',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                editable: true,

            },
            {
                headerName: 'Sec Determinant Table',
                field: 'secDeterminantTable',
                width: 200
            },
            {
                headerName: 'Sec Determinant Column',
                field: 'secDeterminantColumn',
                width: 200
            },
            {
                headerName: 'From Value',
                field: 'valueFrom',
                width: 200
            },
            {
                headerName: 'Thru Value',
                field: 'valueThru',
                width: 200
            }
        ];
    }

    gridSelection(status: any) {
        //this.gridSelectionStatus = status;
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
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view COB Order Liability',
                        'COB Order Liability Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('DETERMINANT_RULES', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    dataGrid001GridOptionsExportCsv() {
        let params = ['allColumns'];
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



    newFormCretion() {
        if (this.gridSelectionStatus === '001') {
            if ((!this.inputGrid1Change) || (!this.inputGrid1ValueChange)) {
                this.dataGrid001GridOptions.api.deselectAll();
                this.editDeterminantRules = false;
                this.holdDenyDeterminantsForm.reset();
            } else {
                this.modificiationPopupAlert();
            }

        }
        if (this.gridSelectionStatus === '002') {
            if ((!this.inputGrid1Change) || (!this.inputGrid1ValueChange)) {
                this.editDeterminantTables = false;
                this.determinantValuePrevState = [];
                this.dataGrid002GridOptions.api.deselectAll();
                this.resetFormGrid2();
            } else {
                this.modificiationPopupAlert();
            }
        }

    }


    deleteForm() {
        if (this.gridSelectionStatus === '001') {
            this.deleteForm1();
        }
        if (this.gridSelectionStatus === '002') {
            this.deleteForm2();
        }
        if (this.gridSelectionStatus === '003') {
            this.deleteForm3();
        }
    }

    deleteForm1() {
        this.messageService
            .findByMessageId(29070)
            .subscribe((message: MessageMasterDtl[]) => {
                this.deleteFormPopupAlert("29070: " + message[0].messageText, "COB Hold/Deny Determinants");
            });
    }

    deleteForm2() {
        this.messageService
            .findByMessageId(29070)
            .subscribe((message: MessageMasterDtl[]) => {
                this.deleteFormPopupAlert("29070: " + message[0].messageText, "COB Hold/Deny Determinants");
            });
    }

    deleteForm3() {
        this.messageService
            .findByMessageId(29070)
            .subscribe((message: MessageMasterDtl[]) => {
                this.deleteFormPopupAlert("29070: " + message[0].messageText, "COB Hold/Deny Determinants");
            });
    }

    deleteFormPopupAlert = (message: string, title: string) => {
        try {
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'OK') {
                    if (this.gridSelectionStatus === '001') {
                        this.determinantRulesService.deleteDeterminantRulesBySeqRuleIdAndKeyword(this.seqRuleId, this.keyword).subscribe(response => {
                            this.determinantRule = response;
                            this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
                            this.getDeterminantRuleses();
                        });
                    } else if (this.gridSelectionStatus === '002') {
                        this.determinantTablesService.deleteDeterminantTable(this.searchSequence, this.seqRuleId, this.keyword).subscribe(response => {
                            this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
                            this.getDeterminantTablesesByRuleId(this.seqRuleId);
                        });
                    } else {
                        if (this.gridSelectionStatus === '003') {
                            let determinantSequence = this.determinantValueses[0].determinantValuesPrimaryKey.determinantSequence;
                            this.determinantValuesService.deleteDeterminantValue(this.determinantSequence, this.searchSequence, this.seqRuleId, this.keyword).subscribe(response => {
                                this.toastService.showToast('Record successfully deleted.', NgbToastType.Success);
                                this.getDeterminantValuesesByRuleIdSeqId(this.seqRuleId, this.searchSequence);
                            });
                        }
                    }

                }
                else if (resp.name === 'Cancel') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            switch (event.action) {
                case 'New': {
                    this.type = 'rule';
                    this.newFormCretion();
                    break;

                }
                case 'Delete': {
                    this.deleteForm();
                    break;
                }
                case 'Save': {
                    this.saveDeterminantRules();
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu': {
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {

        } else if (event.menu.menuItem === 'Windows') {
            this.showTimeStamp();
        }

        else if (event.menu.menuItem == 'Help') {
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
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Delete', shortcutKey: 'Ctrl+D',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Copy', shortcutKey: 'Ctrl+C',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
                    { name: "Audit Display", shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 COB Hold/Deny Determinants" },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window', shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' },
                ],
            },
        ];
    }

    getDeterminantReasons() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('DN').subscribe(res => {
            this.authorizationReasons.push(...res);
        });
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('HD').subscribe(res => {
            this.authorizationReasons.push(...res);
        });
        setTimeout(() => {
            this.authorizationReasons.sort((a, b) => {
                return a.reasonCode > b.reasonCode ? 1 : -1
            });
        }, 2000);

    }

    getDeterminantActions() {
        this.dddwDtlService.getDeterminantRuleActions().subscribe(codes => {
            codes.forEach(code => {
                this.actionCodesMap.set(code.value, code.key);
            });
            this.determinantActions = codes;
        }, error => {
            this.toastService.showToast('An Error occurred while retrieving records.', NgbToastType.Danger);
        });
    }

    setAllTableLookUp() {
        this.allTables = [];
        let tableNames = [
            "MEMBER_MASTER",
            "MEMBER_OTHER_COVERAGE",
            "PREMIUM_MASTER"
        ];
        if (Form.getValue(this.holdDenyDeterminantsForm, 'claimType') == 'I') {
            tableNames.push('INST_CLAIM_HEADER');
        } else if (Form.getValue(this.holdDenyDeterminantsForm, 'claimType') == 'P' || Form.getValue(this.holdDenyDeterminantsForm, 'claimType') == '1') {
            tableNames.push('PROFSVC_CLAIM_HEADER');

        } else if (Form.getValue(this.holdDenyDeterminantsForm, 'claimType') == 'D') {
            tableNames.push('DENTAL_CLAIM_HEADER');
            tableNames.push('DENTAL_CLAIM_DETAIL');
        }

        tableNames.forEach(table => {
            let tempCol = {
                owner: "DORIS",
                tableName: table
            };
            this.allTables.push(tempCol)
        });

        this.cobOrderLiabilityFormConfig[1].data = this.allTables;
        this.cobOrderLiabilityFormConfig[2].data = this.allTables;
    }

    getActionCode(params: any) {
        return this.actionCodesMap.get(params.data.actionCode);
    }

    getAllColumnsLookUp() {
        this.AllTabColumnsService.getAllTabColumnLookUp("DORIS").subscribe(tableColumnLookUp => {

            this.allColumns = tableColumnLookUp.map((e) => {
                return {
                    owner: "DORIS",
                    columnName: e.value,
                    tableName: e.key
                }
            });
        })
    }

    onTableSelect(x: any) {
        this.selectedColumns = this.allColumns.filter(
            function (e) {
                return e.tableName == x;
            }
        );
    }

    getClaimTypes() {
        this.SystemCodesService.getSystemCodesByLangAndtype("CLAIMTYPE", "0").subscribe(systemCodes => {
            this.claimTypes = systemCodes;
        })
    }

    onChangeActionCode(event: any) {
        if (event.target.value !== this.selectedActionCode) {
            this.holdDenyDeterminantsForm.get('reasonCode').reset()
        }
        this.inputGrid1ValueChange = true;
        this.selectedActionCode = event.target.value;
    }

    getReasonCodes(type: any) {
        this.reasonCodes = this.authorizationReasons.filter(f => f.reasonCodeType === type);
        this.cdr.detectChanges();
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
        this.gridSelectionStatus = '002';
    }

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.tables = this.allTables;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.holdDenyDeterminantTableForm.patchValue({
                    determinantColumn: res.columnName,
                    determinant: res.tableName
                });
            }
        });
    }

    onChangeDeterminant(event: any) {
        let tableName = event.target.value;
        let table = this.allTables.filter(f => f.key === tableName);
        if (table && table.length > 0) {
        } else {
            this.holdDenyDeterminantTableForm.patchValue({
                determinant: null
            });
            this.messageService
                .findByMessageId(4047)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "4047: " + message[0].messageText,
                        "COB Hold/Deny Determinants"
                    );
                });
        }
        this.type = 'table'
    }

    onChangeDeterminantColumn(event: any) {
        if (this.holdDenyDeterminantTableForm.get('determinant').value) {
            let table = this.allColumns.filter(f => f.columnName === event.target.value && f.tableName === this.holdDenyDeterminantTableForm.get('determinant').value);
            if (table && table.length > 0) {
            } else {
                this.holdDenyDeterminantTableForm.patchValue({
                    determinantColumn: null
                });
                this.messageService
                    .findByMessageId(4077)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "4077: " + message[0].messageText,
                            "COB Hold/Deny Determinants"
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
                let mockConfig = JSON.parse(JSON.stringify(this.cobOrderLiabilityFormConfig)); // make a copy of original config

                this.cobOrderLiabilityFormConfig.forEach((field, index) => {
                    if (field.name === COBOrderOfLiabilityFieldNames.OPERATOR) {
                        mockConfig[index].value = val.operator;
                        mockConfig[index].disabled = !val.operator;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.SEC_DETERMINANT_TABLE) {
                        mockConfig[index].value = val.secDeterminantTable;
                        mockConfig[index].data = this.allTables;
                        mockConfig[index].disabled = !val.secDeterminantTable;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.SEC_DETERMINANT_COL) {
                        mockConfig[index].value = val.secDeterminantColumn;
                        mockConfig[index].data = this.allTables;
                        mockConfig[index].disabled = !val.secDeterminantColumn;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.FROM_VALUE) {
                        mockConfig[index].value = val.valueFrom;
                    } else if (field.name === COBOrderOfLiabilityFieldNames.THRU_VALUE) {
                        mockConfig[index].value = val.valueThru;
                        mockConfig[index].disabled = !val.valueThru;
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
                    fromValueStatus = false;
                    counter = counter + 1;
                }
            });

            setTimeout(() => {
                if (totalApiRecordSize === counter) {
                    this.determinantValuesService.updateDeterminantValuesDynamicForms(apiRecords).subscribe(resp => {
                        this.toastService.showToast('Records updated Successfully', NgbToastType.Success)
                        this.getDeterminantValuesesByRuleIdSeqId(this.determinantTable.determinantTablesPrimaryKey.seqRuleId, this.determinantTable.determinantTablesPrimaryKey.searchSequence);
                    });
                } else {
                    this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
                        this.popupAlert1(message[0].messageText.replace('@1', thruValue + "").replace('@2', fromValue), 'COB Hold/Deny Determinants');
                    });
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
        let date = new Date();
        determinantValues.insertDatetime = this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        determinantValues.insertUser = 'DORIS';
        determinantValues.insertProcess = 'COBOR';
        determinantValues.secDeterminantDatatype = 'VARCHAR2';
        determinantValues.action = action;

        return determinantValues;
    }

    onChangeOrder(event: any) {
        this.inputGrid1ValueChange = true;
        if (event.key == 'Tab') {
            var claimtype = this.holdDenyDeterminantsForm.get('claimType').value;
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: order_no is a required field. Enter something other than blanks';
                this.emptyPopupMessage(message)
            }
            for (var i = 0; i < this.determinantRuleses.length; i++) {
                if (this.determinantRuleses[i]["fileType"] == claimtype) {
                    if (this.determinantRuleses[i]["ruleOrder"] == event.target.value) {
                        this.messageService
                            .findByMessageId(70913)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.showPopUp(
                                    "70913: " + message[0].messageText,
                                    "COB Hold/Deny Determinants"
                                );
                            });
                        event.preventDefault();
                        this.errorOrderSame = true;
                        break;
                    } else {
                        this.errorOrderSame = false;
                    }
                } else {
                    this.errorOrderSame = false;
                }
            }
        }
    }

    onChangeSequence(value: any) {
        if (value) {
            let rec = this.determinantTableses.filter(f => f.determinantTablesPrimaryKey.searchSequence == value);
            if (rec && rec.length > 0) {
                this.messageService.findByMessageId(70882).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "70882: " + message[0].messageText.replace('@1', this.determinantRule['fileType']).replace('@2', this.determinantRule['ruleOrder']),
                        "COB Hold/Deny Determinants"
                    );
                    this.holdDenyDeterminantTableForm.patchValue({
                        sequence: null
                    });
                    this.sequenceEle.nativeElement.focus();
                });
            }
        }
        this.type = 'table'
    }

    newValueChanged = (event: any) => {
        let name = event.srcElement.id;
        let data = [];
        switch (name) {
            case 'claimType':
                this.customTable.fileType1 = event.target.value === 'D' ? 'Dental' : (event.target.value === 'I' ? 'Inst.' : 'Prof.');
                break;
            case 'actionCode':
                this.customTable.actionCode = event.target.value;
                break;
            case 'orderNo':
                this.customTable.ruleOrder = event.target.value;
                break;
            case 'reasonCode':
                this.customTable.reasonCode = event.target.value;
                break;
            case 'description':
                this.customTable.description = event.target.value;
                break;
        }
    };

    modalClose = () => {
        this.closeStatus = true;
        this.screenCloseRequest = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'COB Hold/Deny Determinants')
            });
        }
        else {
            this.activeModal.close()
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
                    if (this.gridSelectionStatus === '001') {
                        if (this.editDeterminantRules) {
                            this.updateDeterminantRules();
                        } else {
                            this.createDeterminantRules();
                        }
                    }

                    if (this.gridSelectionStatus === '002') {
                        this.createDeterminantTables();
                    }

                }
                else if (resp.name === 'No') {
                    this.activeModal.close()
                    if (this.gridSelectionStatus === '001') {
                        this.inputGrid1ValueChange = false;
                        if(this.selectedGrid1Index!=null){
                            this.dataGrid001GridOptions.api.selectIndex(this.selectedGrid1Index, null, null);
                        }
                        if(this.grid2Status){
                            this.dataGrid002GridOptions.api.selectIndex(this.selectedGrid2Index, null, null);
                        }
                    }

                    if (this.gridSelectionStatus === '002') {
                        this.inputGrid2ValueChange = false;
                        if(this.selectedGrid2Index!=null){
                            this.dataGrid002GridOptions.api.selectIndex(this.selectedGrid2Index, null, null);
                        }

                        if(this.grid1Status){
                            this.dataGrid001GridOptions.api.selectIndex(this.selectedGrid1Index, null, null);
                        }
                    }

                }
            })
        }
        catch (e) {
            console.log(e);
        }
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
        }
        catch (e) {
            console.log(e);
        }
    };


    save = () => {
        if (this.type === 'table') {
            this.editDeterminantRules = true;
            if (this.inputDataChanged) {
                this.saveDeterminantRules()
            }
            this.saveDeterminantTables();
        } else if (this.type === 'rule') {
            this.saveDeterminantRules();
        } else {
            this.saveDeterminantRules();
        }
    };

    changedReasonCode = () => {
        this.reasonCodes = this.authorizationReasons.filter(f => f.reasonCodeType === this.selectedActionCode);
    };

    onLookupActionCodeChange = (event: any) => {
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: action_code is a required field. Enter something other than blanks';
                this.emptyPopupMessage(message)
            } else {

            }
        }
    };

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

    onChangeReasonCode = (event: any) => {
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: reason_code is a required field. Enter something other than blanks';
                this.emptyPopupMessage(message)
            }
        }
    };

    modificiationPopupAlert() {
        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
            this.popupAlert(message[0].messageText, 'COB Hold/Deny Determinants')
        });
    }

    isFromDataChanged = () => {
        this.holdDenyDeterminantTableForm.valueChanges.subscribe(res => {
            this.secondInputDataChanged = true;
        })
    };

    onKeydownSequence = (event: any) => {
        this.inputGrid2ValueChange = true;
        this.gridSelectionStatus = '002';
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: search_sequence is a required field. Enter something other than blanks.';
                this.emptyPopupMessage(message)
            }
        }
    };

    addNewLine = (event: any) => {
        this.secondInputDataChanged = true;
    }


    changeActionStatus(action: string) {
        this.gridSelectionStatus = action;
    }

    popupAction() {
        if (this.gridSelectionStatus === '001') {
            if ((this.inputGrid1Change) && (this.inputGrid1ValueChange)) {
                if (this.indexValue != null) {
                    this.dataGrid001GridOptions.api.selectIndex(this.indexValue, null, null);
                } else {
                    let selectedNodes = this.dataGrid001GridOptions.api.getSelectedNodes();
                    if (selectedNodes[0] !== undefined) {
                        selectedNodes[0].setSelected(false);
                        this.indexValue = null;
                    }
                }
                this.modificiationPopupAlert();
            }
        } else {
            if ((this.inputGrid2Change) && (this.inputGrid2ValueChange)) {
                if (this.indexValueGrid2 != null) {
                    this.dataGrid002GridOptions.api.selectIndex(this.indexValueGrid2, null, null);
                } else {
                    let selectedNodes = this.dataGrid002GridOptions.api.getSelectedNodes();
                    if (selectedNodes[0] !== undefined) {
                        selectedNodes[0].setSelected(false);
                        this.indexValueGrid2 = null;
                    }
                }
                this.modificiationPopupAlert();
            }
        }
    }
    rowClicked(event: any) {
        let determinantSequence = this.determinantValueses[event.index].determinantValuesPrimaryKey.determinantSequence;
        this.determinantSequence = determinantSequence;
    }

    modifyValue() {
        this.inputGrid1ValueChange = true;
        this.gridSelectionStatus = '001';
    }

    onFieldChange(data: any) {
        let mockConfig = JSON.parse(JSON.stringify(this.cobOrderLiabilityFormConfig));
        if (data.event.key === "Tab") {
            let field: FormField = data.formField;
            const index: number = data.i;
            let form: FormGroup = data.field;
            let fieldName = field.name + index;
            let thruName = "thruValue" + index;
            if (fieldName == COBOrderOfLiabilityFieldNames.FROM_VALUE + index) {
                data.field.controls[thruName].enable();
            }
        }

    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/COBHD_COB_Hold_Deny_Determinants.htm'
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "COB Hold/Deny Determinants";
        ref.componentInstance.insertDateTime = this.determinantRule.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.determinantRule.insertProcess;
        ref.componentInstance.insertUser = this.determinantRule.insertUser;
        ref.componentInstance.updateUser = this.determinantRule.updateUser;
        ref.componentInstance.updateDateTime = this.determinantRule.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.determinantRule.updateProcess;
    };
}
