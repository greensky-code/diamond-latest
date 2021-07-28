/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import {
    DeterminantValues,
    DeterminantTables,
    DeterminantRules,
    SecUser,
    SecWin,
    SystemCodes,
    MessageMasterDtl
} from '../../../api-models';
import {
    DeterminantValuesService,
    DeterminantTablesService,
    DeterminantRulesService,
    SecUserService,
    LineOfBusinessMasterService,
    SystemCodesService, MessageMasterDtlService, DddwDtlService
} from '../../../api-services';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { ClaimDiscountCalcRulesLookup } from '../../../shared/lookup/claim-discount-calc-rules-lookup';
import { FormField, FormRow, FORM_FIELD_ACTION_TYPES, Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {LineOFBLookup} from "../../../shared/lookup/line-of-business-lookup";
import {LineOfBusinessMaster} from "../../../api-models/line-of-business-master.model";
import {SupportHelpComponent} from "../support-help/support-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {CONSTANTS, getClaimSDiscountCalcRulesShortcutKeys, getLanguageShortcutKeys} from '../../../shared/services/shared.service';
import {MessageType} from "../../../shared/components/confirmation-message";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {TablesAndColumnsComponent} from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import {AllTabColumns} from "../../../shared/models/all-tab-columns.model";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {AuditService} from "../../../shared/services/audit.service";
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {ClaimDiscountCalcRulesFieldNames, ClaimDiscountCalcRulesFormConfig} from '../../../shared/models/constants';
import { DatePipe } from '@angular/common';
import {GroupMasterComponent} from "../../member/group-master/group-master.component";
import {GroupPanelComponent} from "../../member/group-panel/group-panel.component";
// Use the Component directive to define the ClaimDiscountCalcRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimdiscountcalc.rules',
    templateUrl: './claim-discount-calc.-rules.component.html',

})
export class ClaimDiscountCalcRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimDiscountCalcRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    menu: Menu[] = [];
    operators: any[];
    public editEntry: boolean;
    public secProgress = true;
    editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];
    createDeterminantTablesFlag: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];
    editDeterminantRules: boolean;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];
    private windowId: string = 'LBCDC';

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    public currentLineOfBus: string;
    searchModel = new SearchModel(
        "linesofbusinessmaster/LOB/lookup",
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );
    keyword: any;
    seqRuleId: any;
    public shortcuts: ShortcutInput[] = [];
    claimTypes: SystemCodes[];
    allTables: any[] = [];
    allColumns: AllTabColumns[] = [];
    determinantTableShowStatus: Boolean = false;
    gridSelectionStatus: Boolean = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    menuOpened = ''
    keyValues: number;
    searchStatus = false;
    keyNames: string = "claimDiscountCalcRules";
    currentGrid: any = '';
    claimDiscountCalcRulesFormConfig = ClaimDiscountCalcRulesFormConfig;
    isSaveForm = false;
    determinantValuePrevState = new Array<FormRow>();
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    isResetForm = false;
    recordCount = 1;
    secondInputDataChanged = false;
    determinantSequence: any;
    @Input() lineOfBusinessId: string;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private alertMessageService: AlertMessageService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private secWinService: SecWinService,
        private dddwDtlService: DddwDtlService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private determinantValuesService: DeterminantValuesService,
        private determinantTablesService: DeterminantTablesService,
        private cdr: ChangeDetectorRef,
        private determinantRulesService: DeterminantRulesService,
        private auditService: AuditService,
        private toastr: ToastService,
        private dateFormatPipe: DateFormatPipe,
        private systemCodesService: SystemCodesService,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        public datepipe: DatePipe,
        private toastService: ToastService,
        ) {
    }


    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
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
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    public showTimeStamp() {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Claim Discount Calc. Rules";
        ref.componentInstance.insertDateTime = this.determinantRules.insertDatetimeDisplay
            ? this.determinantRules.insertDatetimeDisplay : "";

        ref.componentInstance.insertProcess = this.determinantRules.insertProcess;
        ref.componentInstance.insertUser = this.determinantRules.insertUser;
        ref.componentInstance.updateUser = this.determinantRules.updateUser;
        ref.componentInstance.updateDateTime = this.determinantRules.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.determinantRules.updateProcess;

    };


    createDeterminantValues() {
        this.formValidation.validateForm();
        if (this.claimDiscountCalcRulesForm.valid) {
            let determinantValues = new DeterminantValues();
            this.determinantTables.determinantTablesPrimaryKey
            let possible = "1234567890";
            const lengthOfCode = 6;
            let id = this.makeRandom(lengthOfCode, possible);
            // this.seqRuleIdCreate = parseInt(id);
            let determinantValuesPrimaryKey = {
                searchSequence: this.determinantTables.determinantTablesPrimaryKey.searchSequence,
                keyword: this.determinantTables.determinantTablesPrimaryKey.keyword,
                seqRuleId: this.determinantTables.determinantTablesPrimaryKey.seqRuleId,
                determinantSequence: parseInt(id)
            }
            determinantValues.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
            determinantValues.operator = Form.getValue(this.claimDiscountCalcRulesForm, 'operator');
            determinantValues.valueFrom = Form.getValue(this.claimDiscountCalcRulesForm, 'fromValue');
            determinantValues.valueThru = Form.getValue(this.claimDiscountCalcRulesForm, 'thruValue');
            determinantValues.insertUser = this.determinantRules.insertUser;
            determinantValues.updateUser = this.determinantRules.updateUser;
            determinantValues.fileType = Form.getValue(this.claimDiscountCalcRulesForm, 'claim');
            determinantValues.securityCode = '0';
            determinantValues.determinantValuesPrimaryKey = determinantValuesPrimaryKey;
            determinantValues.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
            determinantValues.secDeterminantTable = Form.getValue(this.claimDiscountCalcRulesForm, 'determinantTable');

            if (determinantValues.valueFrom > determinantValues.valueThru) {
                this.alertMessage = this.alertMessageService.error("From Value should be smaller than Thru Value.");
            }
            this.determinantValuesService.createDeterminantValues(determinantValues).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDeterminantValues = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    onSelection001Change($event) {
        this.setSelection002($event.data);
    }

    onSelection002Change($event) {
        this.setSelection001($event.data);
    }

    onSelection003Change($event) {
        this.setSelection003($event.data);
    }

    setSelection001(determinantTables: DeterminantTables) {

        let filteredData = this.determinantValueses.filter(
            data => data.determinantValuesPrimaryKey.searchSequence === determinantTables.determinantTablesPrimaryKey.searchSequence);
        this.dataGrid003GridOptions.api.setRowData(filteredData);

        this.claimDiscountCalcRulesForm.patchValue({
            'searchSeq': determinantTables.determinantTablesPrimaryKey.searchSequence,
            'determinantTable': determinantTables.determinantTable,
            'determinantColumn': determinantTables.determinantColumn
        });
        return determinantTables;
    }

    setSelection002(determinantRules: DeterminantRules) {
        let ratePercent = determinantRules.actionCode ? determinantRules.actionCode.includes('%') ? determinantRules.actionCode.slice(0,-1) :  determinantRules.actionCode : '';
        this.claimDiscountCalcRulesForm.patchValue({
            'ruleOrder': determinantRules.ruleOrder,
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(determinantRules.termDate),
            'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(determinantRules.effectiveDate),
            'claim': determinantRules.fileType,
            'description': determinantRules.description,
            'termReason': determinantRules.termReason,
            'rateOrder': `${ratePercent}%`,
            'reason': determinantRules.reasonCode,
            'discountDays': determinantRules.resultValue1,
            'dynamicText002': `${ratePercent}% of payable benefits due to`

        }, { emitEvent: false });
        setTimeout(() => {
            this.isFormDataModified();
        }, 2000)
        this.seqRuleId = determinantRules.determinantRulesPrimaryKey.seqRuleId;
        this.keyword = determinantRules.determinantRulesPrimaryKey.keyword
        this.getDeterminantTablesesBySeqRuleId(determinantRules.determinantRulesPrimaryKey.seqRuleId);
        this.setAllTableLookUp();
        return determinantRules;
    }

    getDeterminantTablesesBySeqRuleId(seqRuleId: number) {
        this.determinantTablesService.getDeterminantTablesBySeqRuleId(seqRuleId).subscribe(determinantTableses => {
            this.determinantTableses = determinantTableses;
            this.dataGrid002GridOptions.api.setRowData(this.determinantTableses);
            this.dataGrid002GridOptions.api.selectIndex(0, false, false);
        });
    }

    grid002SelectionChange() {
        let determinantTables = new DeterminantTables();
        var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            determinantTables = selectedRows[0];
            this.determinantTableShowStatus = true;
            // this.createDeterminantTables = true;
            this.setDeterminantTableForm(determinantTables);
        } else {
            this.determinantTableShowStatus = false;
            // this.createDeterminantTables = false;
            this.setDeterminantTableForm(determinantTables);
        }
        this.getDeterminantValuesByRuleId(determinantTables.determinantTablesPrimaryKey.seqRuleId,
            determinantTables.determinantTablesPrimaryKey.searchSequence);
    }

    setDeterminantTableForm(determinantTables: DeterminantTables) {
        this.determinantTables = determinantTables;
        this.claimDiscountCalcRulesForm.patchValue({
            'searchSeq': this.determinantTables.determinantTablesPrimaryKey.searchSequence,
            'determinantTable': this.determinantTables.determinantTable,
            'determinantColumn': this.determinantTables.determinantColumn,
        });
        this.claimDiscountCalcRulesForm.get('searchSeq').disable();
        this.claimDiscountCalcRulesForm.get('determinantTable').disable();
        this.claimDiscountCalcRulesForm.get('determinantColumn').disable();
    }

    getDeterminantValuesByRuleId(seqRuleId: number, searchSequence: number) {
        this.determinantValuesService.getDeterminantValuesByRuleIdAndSearchSeq(seqRuleId, searchSequence).subscribe(determinantValueses => {
            this.determinantValueses = determinantValueses;
            this.determinantValuePrevState = [];
            this.populateDynamicForm(determinantValueses);
        });
    }

    private populateDynamicForm(res: DeterminantValues[]) {
        this.resetDynamicGrid();
        setTimeout(() => {
            res.forEach((record: DeterminantValues) => {
                let mockConfig = JSON.parse(JSON.stringify(this.claimDiscountCalcRulesFormConfig));    // make a copy of original config
                this.claimDiscountCalcRulesFormConfig.forEach((field, index) => {
                    if (field.name === ClaimDiscountCalcRulesFieldNames.OPERATOR) {
                        mockConfig[index].value = record.operator;
                    } else if (field.name === ClaimDiscountCalcRulesFieldNames.SEC_DETERMINANT_TABLE) {
                        mockConfig[index].value = record.secDeterminantTable;
                    } else if (field.name === ClaimDiscountCalcRulesFieldNames.SEC_DETERMINANT_COL) {
                        mockConfig[index].value = record.secDeterminantColumn;
                    } else if (field.name === ClaimDiscountCalcRulesFieldNames.FROM_VALUE) {
                        mockConfig[index].value = record.valueFrom;
                    } else if (field.name === ClaimDiscountCalcRulesFieldNames.THRU_VALUE) {
                        mockConfig[index].value = record.valueThru;
                    }
                });
                let formState: FormRow = new FormRow();
                formState.formFields = mockConfig;
                this.determinantValuePrevState.push(formState);          // add record
            });
            this.claimDiscountCalcRulesFormConfig = JSON.parse(JSON.stringify(this.claimDiscountCalcRulesFormConfig));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
            this.determinantValuePrevState = JSON.parse(JSON.stringify(this.determinantValuePrevState));
            this.isFormDataModified()
        }, 1000);
    }

    setSelection003(determinantValues: DeterminantValues) {

        this.claimDiscountCalcRulesForm.patchValue({});
        return determinantValues;
    }


    updateDeterminantValues(keyword: string) {
        if (!this.determinantValues) {
            return;
        }
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimDiscountCalcRulesForm.valid) {
                this.determinantValues.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
                this.determinantRules.determinantRulesPrimaryKey = {
                    keyword: this.determinantRules.keyword,
                    seqRuleId: this.determinantRules.seqRuleId
                }
                this.auditService.setAuditFields(this.determinantValues, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);

                this.determinantValuesService.updateDeterminantValues(this.determinantValues, keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editDeterminantValues = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.isFormDataChangeStatus = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update  ', ' Permissions');
        }
    }

    saveDeterminantValues() {
        if (this.editDeterminantValues) {
            this.updateDeterminantValues(this.determinantValues.keyword)
        } else {
            this.createDeterminantValues();
        }
    }

    deleteDeterminantValues(keyword: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantValuesService.deleteDeterminantValues(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getDeterminantValues(keyword: string) {
        this.determinantValuesService.getDeterminantValues(keyword).subscribe(determinantValues => {
            this.determinantValues = determinantValues;
            this.claimDiscountCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantValues.insertProcess,
                'fromValue': this.determinantValues.valueFrom,
                'thruValue': this.determinantValues.valueThru
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getDeterminantValueses() {
        this.determinantValuesService.getDeterminantValueses().subscribe(determinantValueses => {
            this.determinantValueses = determinantValueses;
            this.dataGrid003GridOptions.api.setRowData(this.determinantValueses);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    createDeterminantTables() {
        this.formValidation.validateForm();
        if (this.claimDiscountCalcRulesForm.valid) {
            let determinantTables = new DeterminantTables();
            let determinantTablesPrimaryKey = {
                searchSequence: Form.getValue(this.claimDiscountCalcRulesForm, 'searchSeq'),
                keyword: this.windowId,
                seqRuleId: this.determinantRules.determinantRulesPrimaryKey.seqRuleId
            }
            determinantTables.determinantTablesPrimaryKey = determinantTablesPrimaryKey;
            determinantTables.determinantTable = Form.getValue(this.claimDiscountCalcRulesForm, 'determinantTable');
            determinantTables.determinantColumn = Form.getValue(this.claimDiscountCalcRulesForm, 'determinantColumn');
            determinantTables.determinantDatatype = 'VARCHAR2';
            determinantTables.securityCode = '0';
            determinantTables.subsInd = 'N'
            determinantTables.insertProcess = this.windowId;
            determinantTables.insertUser = sessionStorage.getItem('user');
            determinantTables.updateUser = sessionStorage.getItem('user');
            determinantTables.updateProcess = this.windowId;
            this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.createDeterminantTablesFlag = false;
                this.determinantTables.determinantTablesPrimaryKey.keyword = response.determinantTablesPrimaryKey.keyword;
                this.determinantTables.determinantTablesPrimaryKey.searchSequence = response.determinantTablesPrimaryKey.searchSequence;
                this.determinantTables.determinantTablesPrimaryKey.seqRuleId = response.determinantTablesPrimaryKey.seqRuleId;

                this.getDeterminantRulesListByRuleIdAndKeyword(Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness'), this.windowId);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateDeterminantTables(keyword: string) {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimDiscountCalcRulesForm.valid) {
                if (!this.determinantTables) {
                    return
                }
                this.determinantTables.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
                this.auditService.setAuditFields(this.determinantTables, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
                this.determinantTablesService.updateDeterminantTables(this.determinantTables, this.determinantTables.determinantTablesPrimaryKey.keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    // this.editDeterminantTables = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.isFormDataChangeStatus = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update  ', ' Permissions');
        }
    }

    saveDeterminantTables() {
        if (!this.createDeterminantTablesFlag) {
            this.updateDeterminantTables(this.determinantTables.keyword)
        } else {
            this.createDeterminantTables();
        }
    }

    deleteDeterminantTables(keyword: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantTablesService.deleteDeterminantTables(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getDeterminantTables(keyword: string) {
        this.determinantTablesService.getDeterminantTables(keyword).subscribe(determinantTables => {
            this.determinantTables = determinantTables;
            this.determinantTables.determinantTablesPrimaryKey.keyword = this.determinantTables.determinantTablesPrimaryKey.keyword;
            this.determinantTables.determinantTablesPrimaryKey.searchSequence = this.determinantTables.determinantTablesPrimaryKey.searchSequence;
            this.determinantTables.determinantTablesPrimaryKey.seqRuleId = this.determinantTables.determinantTablesPrimaryKey.seqRuleId;

            this.claimDiscountCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantTables.insertProcess,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
            this.determinantTableses = determinantTableses;
            this.dataGrid002GridOptions.api.setRowData(this.determinantTableses);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    makeRandom(lengthOfCode: number, possible: string) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    createDeterminantRules() {
        this.formValidation.validateForm();
        if (this.claimDiscountCalcRulesForm.valid) {
            let determinantRules = new DeterminantRules();
            let possible = "1234567890";
            const lengthOfCode = 6;
            let id = this.makeRandom(lengthOfCode, possible);
            // this.seqRuleIdCreate = parseInt(id);
            let determinantRulesPrimaryKey = {
                searchSequence: Form.getValue(this.claimDiscountCalcRulesForm, 'searchSeq'),
                keyword: this.windowId,
                seqRuleId: parseInt(id)
            }
            // this.determinantRules.determinantRulesPrimaryKey.seqRuleId = determinantRulesPrimaryKey.seqRuleId;
            determinantRules.insertUser = this.determinantRules.insertUser;
            determinantRules.updateUser = this.determinantRules.updateUser;
            determinantRules.termDate = Form.getDatePickerValue(this.claimDiscountCalcRulesForm, 'termDate');
            determinantRules.effectiveDate = Form.getDatePickerValue(this.claimDiscountCalcRulesForm, 'effectiveDate');
            determinantRules.fileType = Form.getValue(this.claimDiscountCalcRulesForm, 'claim');
            determinantRules.description = Form.getValue(this.claimDiscountCalcRulesForm, 'description');
            determinantRules.termReason = Form.getValue(this.claimDiscountCalcRulesForm, 'termReason');
            determinantRules.actionCode = Form.getValue(this.claimDiscountCalcRulesForm, 'rateOrder');
            determinantRules.reasonCode = Form.getValue(this.claimDiscountCalcRulesForm, 'reason');
            determinantRules.resultValue1 = Form.getValue(this.claimDiscountCalcRulesForm, 'discountDays');
            determinantRules.securityCode = '0';
            determinantRules.determinantRulesPrimaryKey = determinantRulesPrimaryKey;
            determinantRules.ruleId = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
            determinantRules.ruleOrder = Form.getValue(this.claimDiscountCalcRulesForm, 'ruleOrder');
            determinantRules.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
            determinantRules.actionCode = Form.getValue(this.claimDiscountCalcRulesForm, 'rateOrder');
            determinantRules.reasonCode = Form.getValue(this.claimDiscountCalcRulesForm, 'reason');
            this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editDeterminantRules = false;
                this.determinantRules.determinantRulesPrimaryKey.seqRuleId = response.determinantRulesPrimaryKey.seqRuleId;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateDeterminantRules(keyword?: string) {
        if (this.securityService.checkInsertUpdatePermissions(true, this.secWin)) {
            this.formValidation.validateForm();

            if (this.claimDiscountCalcRulesForm.valid) {

                this.determinantRules.insertProcess = Form.getValue(this.claimDiscountCalcRulesForm, 'lineOfBusiness');
                this.determinantRules.actionCode = Form.getValue(this.claimDiscountCalcRulesForm, 'rateOrder');
                this.determinantRules.reasonCode = Form.getValue(this.claimDiscountCalcRulesForm, 'reason');
                this.auditService.setAuditFields(this.determinantRules, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);

                this.determinantRules['description'] = Form.getValue(this.claimDiscountCalcRulesForm, 'description');
                this.determinantRules['ruleOrder'] = Form.getValue(this.claimDiscountCalcRulesForm, 'ruleOrder');
                this.determinantRules['discountDays'] = Form.getValue(this.claimDiscountCalcRulesForm, 'discountDays');
                this.determinantRules.termDate = Form.getDatePickerValue(this.claimDiscountCalcRulesForm, 'termDate');
                this.determinantRules.effectiveDate = Form.getDatePickerValue(this.claimDiscountCalcRulesForm, 'effectiveDate');
                this.determinantRules.fileType = Form.getValue(this.claimDiscountCalcRulesForm, 'claim');
                this.determinantRules.description = Form.getValue(this.claimDiscountCalcRulesForm, 'description');
                this.determinantRules.termReason = Form.getValue(this.claimDiscountCalcRulesForm, 'termReason');
                this.determinantRules.actionCode = Form.getValue(this.claimDiscountCalcRulesForm, 'rateOrder');
                this.determinantRules.reasonCode = Form.getValue(this.claimDiscountCalcRulesForm, 'reason');
                this.determinantRules.resultValue1 = Form.getValue(this.claimDiscountCalcRulesForm, 'discountDays');

                this.determinantRulesService.updateDeterminantRules(this.determinantRules, this.determinantRules.determinantRulesPrimaryKey.seqRuleId, this.determinantRules.determinantRulesPrimaryKey.keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editDeterminantRules = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.isFormDataChangeStatus = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update ', 'Permissions');
        }
    }

    saveDeterminantRules() {
        if (this.editDeterminantRules) {
            this.updateDeterminantRules(this.determinantRules.keyword)
        } else {
            this.createDeterminantRules();
        }
    }

    deleteDeterminantRules(keyword: string) {
        if (!((this.isSuperUser) || (this.secWin && this.secWin.hasDeletePermission()))) {
            this.showPopUp('Not permitted to delete', 'Claim Discount Calc Rules');
        } else {
            if (
                this.secWin &&
                !this.secWin.hasDeletePermission() &&
                !this.isSuperUser
            ) {
                return;
            }
            if (this.keyword) {
                this.determinantRulesService
                    .deleteDeterminantRulesBySeqRuleIdAndKeyword(this.seqRuleId, this.keyword)
                    .subscribe(() => {
                        for (let i = 0; i < this.determinantRuleses.length; i++) {
                            if (this.determinantRuleses[i].determinantRulesPrimaryKey.seqRuleId == this.seqRuleId) {
                                this.determinantRuleses.splice(i, 1);
                                break;
                            }
                        }
                        this.dataGrid001GridOptions.api.setRowData(this.determinantRuleses);
                        if (this.determinantRuleses && this.determinantRuleses.length > 0) {
                            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                            this.seqRuleId = this.determinantRuleses[0].determinantRulesPrimaryKey.seqRuleId;
                        } else {
                            this.seqRuleId = "";
                            this.dataGrid001GridOptions.api.setRowData([]);
                        }

                        this.toastr.showToast(
                            "Record successfully deleted",
                            NgbToastType.Success
                        );
                    }, (error) => {
                        this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
                    });
            }
        }
    }

    getDeterminantRules(keyword: string) {
        this.determinantRulesService.getDeterminantRules(keyword).subscribe(determinantRules => {
            this.determinantRuleses = determinantRules;
            console.log(this.determinantRules)
            // this.determinantRules.determinantRulesPrimaryKey.seqRuleId = determinantRules.determinantRulesPrimaryKey.seqRuleId;

            this.claimDiscountCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantRuleses[0].insertProcess,
                'rateOrder': this.determinantRuleses[0].actionCode,
                'reason': this.determinantRuleses[0].reasonCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRuleses().subscribe(determinantRuleses => {
            this.determinantRuleses = determinantRuleses;
            this.dataGrid001GridOptions.api.setRowData(this.determinantRuleses);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public createNew() {
        if (this.gridSelectionStatus) {
            if (this.currentGrid && this.currentGrid === 'grid1') {
                this.claimDiscountCalcRulesForm.patchValue({
                    'searchSeq': null,
                    'determinantTable': null,
                    'determinantColumn': null
                });
            }
            this.claimDiscountCalcRulesForm.patchValue({
                'operator': null,
                'fromValue': null,
                'thruValue': null
            });
        } else {
            this.claimDiscountCalcRulesForm.get('lineOfBusiness').enable();
            const line = this.claimDiscountCalcRulesForm.value.lineOfBusiness;
            const dynamicText001 = this.claimDiscountCalcRulesForm.value.dynamicText001;
            this.claimDiscountCalcRulesForm.reset();
            this.claimDiscountCalcRulesForm.patchValue({
                'dynamicText001': dynamicText001,
                'lineOfBusiness': line,
                'claim': 'P'
            });
            this.claimDiscountCalcRulesForm.get('lineOfBusiness').disable();
        }
        this.claimDiscountCalcRulesForm.get('searchSeq').enable();
        this.claimDiscountCalcRulesForm.get('determinantTable').enable();
        this.claimDiscountCalcRulesForm.get('determinantColumn').enable();
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.editEntry = false;
                    if (this.currentGrid) {
                        this.gridSelection(true);
                        this.createDeterminantTablesFlag = true;
                    }
                    this.createNew();
                    break;
                }
                case "Open": {
                    this.openScreen()
                    break;
                }
                case 'Delete': {
                    this.deleteRecordAlert();
                    break;
                }
                case "Save": {
                    if (this.gridSelectionStatus && this.createDeterminantTablesFlag) {
                        if (this.currentGrid === 'grid1') {
                            this.createDeterminantTables();
                             // TODO Manual Finishing: removed for storing determinant values .
                            // setTimeout(() => {
                            //     this.createDeterminantValues();
                            // }, 3000);
                        }
                        // TODO Manual Finishing: removed for storing determinant values .
                        //  else {
                        //     this.createDeterminantValues();
                        // }
                    } else {
                        this.saveEntry();
                    }
                    break;
                }
                case "Close": {
                    this.modalClose();
                    break;
                }
                case "Exit": {
                    this.exitScreen();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            switch (event.action) {
                case 'Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
            }

        } else if (event.menu.menuItem === "Topic") {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action)
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Show Timestamp":
                    if (this.claimDiscountCalcRulesForm.get('lineOfBusiness').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;

                case 'Audit Display': {
                    this.auditDisplay();
                    break;
                }

            }

        }
        else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }


    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl+M' },
                { name: 'Open', shortcutKey: 'Ctrl+O' },
                { name: 'Delete', shortcutKey: 'Ctrl+D' },
                { name: 'Save', shortcutKey: 'Ctrl+S' },
                { name: 'Close', shortcutKey: 'Ctrl+F4' },
                { isHorizontal: true }, { name: 'Main Menu...', shortcutKey: 'F2' },
                { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                { isHorizontal: true }, { name: 'Print', disabled: true }, { isHorizontal: true }, { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' }, { isHorizontal: true },
                { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                { name: 'Paste', disabled: true, shortcutKey: 'Ctrl+V' },
                { isHorizontal: true },
                { name: 'Lookup', shortcutKey: 'F5' },]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: "Line Of Business" },
                    { name: "Auto Letter Setup" },
                    { name: "PCP Support Info Details" },
                    { name: "PCP Auto Assign" },
                    { name: "Claim Discount Calculation Rules" },
                    { name: "Pre-Existing Conditions Rules" },
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4' }
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                   { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' }, {
                        name: 'Audit Display',
                        shortcutKey: 'Shift+Alt+A'
                    }, { isHorizontal: true }, { name: '1 Main Menu' }, { name: '2 Group Detail' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, {
                        name: 'This Window',
                        shortcutKey: 'F1'
                    }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }


    updateEntry(entryCode: string) {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) {
            this.formValidation.validateForm();
            if (this.claimDiscountCalcRulesForm.valid) {
                this.updateDeterminantRules(entryCode);
                this.updateDeterminantTables(entryCode);
                this.updateDeterminantValues(entryCode);
                this.editEntry = false;
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveEntry() {
        if (this.editEntry) {
            this.updateDeterminantRules(this.claimDiscountCalcRulesForm.value.lineOfBusiness);
            // this.updateDeterminantTables(this.claimDiscountCalcRulesForm.value.lineOfBusiness);
            this.updateDeterminantValues(this.claimDiscountCalcRulesForm.value.lineOfBusiness);
        } else {
            this.createDeterminantRules();
            setTimeout(() => {
                this.createDeterminantTables();
                // TODO Manual Finishing: removed for storing determinant values .
                // setTimeout(() => {
                //     this.createDeterminantValues();
                // }, 3000);
            }, 3000);
        }
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    dataGrid003GridOptionsExportCsv() {
        var params = {};
        this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Claim Type",
                field: "fileType",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Rule Order",
                field: "ruleOrder",
                width: 200
            },
            {
                headerName: "Effective Date",
                field: "effectiveDate",
                width: 200
            },
            {
                headerName: "Term Date",
                field: "termDate",
                width: 200
            },
            {
                headerName: "Description",
                field: "description",
                width: 200
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Search Seq",
                field: "determinantTablesPrimaryKey.searchSequence",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Determinant Table",
                field: "determinantTable",
                width: 200
            },
            {
                headerName: "Determinant Column",
                field: "determinantColumn",
                width: 200
            }
        ];
    }

    findClaimDisc(event: any) {
        if (event.target.value && event.key === 'Tab') {
            event.preventDefault();
            this.findByLineOfBusiness(event.target.value);
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }

    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.findByLineOfBusiness(res.lineOfBusiness);
        });
    }

    public findByLineOfBusiness(lineOfBus: string) {
        this.currentLineOfBus = lineOfBus;
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBus).subscribe((lineOfBusiness: LineOfBusinessMaster) => {
            this.claimDiscountCalcRulesForm.patchValue({
                'dynamicText001': lineOfBusiness.description,
                'lineOfBusiness': lineOfBusiness.lineOfBusiness
            });
            this.claimDiscountCalcRulesForm.get('lineOfBusiness').disable();
            this.getDeterminantRulesListByRuleIdAndKeyword(lineOfBusiness.lineOfBusiness, this.windowId)
        });
    }
    grid001SelectionChange() {
        const selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.determinantRules = selectedRows[0];
            this.determinantRules.determinantRulesPrimaryKey.seqRuleId = this.determinantRules.determinantRulesPrimaryKey.seqRuleId;

            this.setSelection002(this.determinantRules);
        } else {
            this.setSelection002(this.determinantRules);
        }
    }

    rowClickedEvent(val) {
        console.log(val);
        this.currentGrid = val;
    }

    getDeterminantRulesListByRuleIdAndKeyword(ruleId: string, keyword: string) {
        this.determinantRulesService.getDeterminantRulesListByRuleIdAndKeyword(ruleId, keyword).subscribe(drs => {
            this.determinantRuleses = drs;
            this.editEntry = true;
            this.dataGrid001GridOptions.api.setRowData(this.determinantRuleses);

            this.dataGrid001GridOptions.api.selectIndex(0, false, false)
        });
    }

    createDataGrid003(): void {
        this.dataGrid003GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid003GridOptions.editType = 'fullRow';
        this.dataGrid003GridOptions.columnDefs = [
            {
                headerName: "Operator",
                field: "operator",
                width: 200,
                headerClass: 'text-primary'
                // headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                // checkboxSelection: true
            },
            {
                headerName: "Sec Determinant Table",
                field: "secDeterminantTable",
                width: 200
            },
            {
                headerName: "Sec Determinant Column",
                field: "secDeterminantColumn",
                width: 200
            },
            {
                headerName: "From Value",
                field: "valueFrom",
                width: 200
            },
            {
                headerName: "Thru Value",
                field: "valueThru",
                width: 200
            }
        ];
    }


    /**
     * Get Security Column Details
     */
    private getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            return;
        }
        this.dataLoadedMap.set('BATCHSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.batchTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('BATCHSECCOL', false);
            this.batchSecColDetails = resp;
            this.batchSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.dataLoadedMap.set('RECEIPTSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.receiptTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('RECEIPTSECCOL', false);
            this.receiptSecColDetails = resp;
            this.receiptSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
            this.showPopUp(error, 'Window Error')
        });
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
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

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDiscountCalcRulesForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.menuInit();
        this.getClaimType();
        this.setAllTableLookUp();
        if (this.lineOfBusinessId) {
            this.findByLineOfBusiness(this.lineOfBusinessId)
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        this.getOperators();
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDiscountCalcRulesForm = this.formBuilder.group({
            lineOfBusiness: ['', { updateOn: 'blur', validators: [] }],
            dynamicText001: ['', { updateOn: 'blur', validators: [] }],
            claim: ['', { updateOn: 'blur', validators: [] }],
            ruleOrder: ['', { updateOn: 'blur', validators: [] }],
            effectiveDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            discountDays: ['', { updateOn: 'blur', validators: [] }],
            rateOrder: ['', { updateOn: 'blur', validators: [] }],
            reason: ['', { updateOn: 'blur', validators: [] }],
            dynamicText002: ['', { updateOn: 'blur', validators: [] }],
            searchSeq: ['', { updateOn: 'blur', validators: [] }],
            determinantTable: ['', { updateOn: 'blur', validators: [] }],
            determinantColumn: ['', { updateOn: 'blur', validators: [] }],
            operator: ['', { updateOn: 'blur', validators: [] }],
            fromValue: ['', { updateOn: 'blur', validators: [] }],
            thruValue: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    getOperators() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('coperator', 'dw_provcpr_de', 0).subscribe((res: any) => {
            this.operators = res;
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimSDiscountCalcRulesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    openFileMenu() {
        document.getElementById('fileDropdownFile').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openWindowMenu() {
        document.getElementById('fileDropdownWindow').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownWindow'
    }
    openHelpMenu() {
        document.getElementById('fileDropdownHelp').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownHelp'
    }

    triggerMenus(value) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownFile") {
                switch (value) {
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'New'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Open'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Delete'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Save'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Close'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Exit'
                        }
                        this.onMenuItemClick(obj)
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Line Of Business'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Auto Letter Details'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Support Info Details'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Auto Assign'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Claim Discount Calculation Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Pre-Existing Conditions Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownWindow") {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Audit Display'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == 'fileDropdownHelp') {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Contents'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Search for Help on...'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'This Window'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Glossary'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Getting Started'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'h':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'How to use Help'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'About Diamond Client/Server'
                        }
                        this.onMenuItemClick(obj);
                        break;
                }
            }
        }
    };

    auditDisplay = () => {
        if (this.searchStatus && this.keyValues) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.windowId
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: "lg",
                });
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(11073)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error(
                            "11073: " + message[0].messageText
                        );
                    });
            }
        } else {
            this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.alertMessage = this.alertMessageService.error(
                        "30164: " + message[0].messageText
                    );
                });
        }

    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/LBCDC_Line_of_Business_Claims_Discount_Calculations.htm';
    };

    deleteRecordAlert = () => {
        let popUpMessage = new PopUpMessage(
            "Claims Discount Calc. Rules",
            "Claims Discount Calc. Rules",
            "29070: Press Ok to delete this record",
            "info",
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton("OK", "OK", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "OK") {
                this.deleteDeterminantRules(this.keyword);
            } else {

            }
        });

    }

    private getClaimType() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', '0').subscribe(ClaimType => {
            this.claimTypes = ClaimType;
        });
    };

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
    };

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.tables = this.allTables;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.claimDiscountCalcRulesForm.patchValue({
                    determinantColumn: res.columnName,
                    determinantTable: res.tableName
                });
            }
        });
    };

    emptyPopupMessage = (message: any) => {
        let popUpMessage = new PopUpMessage(
            'popUpMessageName',
            'Claim Discount Calc Rules',
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

    onChangeDeterminant(event: any) {
        let tableName = event.target.value;
        let table = this.allTables.filter(f => f.key === tableName);
        if (table && table.length > 0) {
        } else {
            this.claimDiscountCalcRulesForm.patchValue({
                determinantTable: null
            });
            this.messageService
                .findByMessageId(4047)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "4047: " + message[0].messageText,
                        "Claim Discount Calc. Rules"
                    );
                });
        }
    };

    onChangeDeterminantColumn(event: any) {
        if (this.claimDiscountCalcRulesForm.get('determinantTable').value) {
            let table = this.allColumns.filter(f => f.columnName === event.target.value && f.tableName === this.claimDiscountCalcRulesForm.get('determinantTable').value);
            if (table && table.length > 0) {
            } else {
                this.claimDiscountCalcRulesForm.patchValue({
                    determinantColumn: null
                });
                this.messageService
                    .findByMessageId(4077)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "4077: " + message[0].messageText,
                            "Claim Discount Calc. Rules"
                        );
                    });
            }
        }
    };

    setAllTableLookUp() {
        this.allTables = [];
        let tableNames = [
            "GROUP_MASTER",
            "PROV_ADDRESS",
            "PROV_CONTRACT",
            "PROV_MASTER"
        ];
        if (Form.getValue(this.claimDiscountCalcRulesForm, 'claim') == 'I') {
            tableNames.push('INST_CLAIM_HEADER');
        } else if (Form.getValue(this.claimDiscountCalcRulesForm, 'claim') == 'P') {
            tableNames.push('PROFSVC_CLAIM_HEADER');

        } else if (Form.getValue(this.claimDiscountCalcRulesForm, 'claim') == 'D') {
            tableNames.push('DENTAL_CLAIM_HEADER');
        }

        tableNames.forEach(table => {
            let tempCol = {
                owner: "DORIS",
                tableName: table
            };
            this.allTables.push(tempCol)
        });
        this.allTables.sort((a, b) => {
            if (a.tableName > b.tableName) return 1;
            else if (a.tableName < b.tableName) return -1;
            else return 0;
        })
    };

    claimTypeChange = (event) => {
        this.claimDiscountCalcRulesForm.patchValue({
            'claim': event.target.value
        });
        this.setAllTableLookUp();
    }

    gridSelection(status: boolean) {
        this.gridSelectionStatus = status;
    };


    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Claims Discount Calc. Rules')
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
                    if (this.gridSelectionStatus) {
                        this.saveDeterminantTables();
                    } else {
                        this.saveEntry();
                    }
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
        this.claimDiscountCalcRulesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    };

    exitScreen = () => {
        this.messageService.findByMessageId(29062).subscribe(res => {
            let popMsg = new PopUpMessage(
                'poUpMessageName',
                'DIAMOND @ Client/Server System',
                res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
                'icon');
            popMsg.buttons = [
                new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
                new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openScreen() {
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Claim Discount Calc Rules', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveDeterminantTables();
                            setTimeout(() => {
                                this.openNewScreen();
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.openNewScreen();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.openNewScreen();
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
                        indexedValue.valueThru = pair[4].value;
                        indexedValue.valueFrom = pair[3].value;
                        indexedValue.action = preStateRecord.action;
                        indexedValue.insertDatetime = this.datepipe.transform(indexedValue.insertDatetimeDisplay, 'dd-MM-yyyy HH:mm:ss');
                        indexedValue.updateDatetime = this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
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
                            this.alertMessage = this.alertMessageService.info('Records updated Successfully');
                            this.getDeterminantTablesesBySeqRuleId(this.determinantRules.determinantRulesPrimaryKey.seqRuleId);
                        });
                    } else {
                        this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
                            this.popupAlert(message[0].messageText.replace('@1', thruValue + '').replace('@2', fromValue), 'Claim discount Calculation Rule Determinants');
                        });
                    }
                } else {
                    this.popupAlert('Please enter thru value', 'Claim discount Calculation Rule Determinants');
                }
            }, 1000);

        }
    }

    valueChanged = () => {
        this.isFormDataModified()
    };

    resetDynamicGrid() {
        this.isResetForm = true;
        setTimeout(() => {
            this.isResetForm = false;
        }, 300)
    }

    addNewLine = (event: any) => {
        this.secondInputDataChanged = true;
    }

    onFieldChange(data: any) {
        let mockConfig = JSON.parse(JSON.stringify(this.claimDiscountCalcRulesFormConfig));
        if (data.event.key === 'Tab') {
            let field: FormField = data.formField;
            const index: number = data.i;
            let form: FormGroup = data.field;
            let fieldName = field.name + index;
            let thruName = 'thruValue' + index;
            let secDeterminantColumn = 'secDeterminantColumn' + index;
            if (fieldName == ClaimDiscountCalcRulesFieldNames.FROM_VALUE + index) {
                data.field.controls[thruName].enable();
            }

            if (fieldName == ClaimDiscountCalcRulesFieldNames.SEC_DETERMINANT_TABLE + index) {
                data.field.controls[secDeterminantColumn].enable();
            }
        }

    }

    rowClicked(event: any) {
        let determinantSequence = this.determinantValueses[event.index].determinantValuesPrimaryKey.determinantSequence;
        this.determinantSequence = determinantSequence;
    }

    private populateDeterminantValueSelectField(event: any[], action: any) {
        let determinantValues = new DeterminantValues();
        determinantValues.determinantValuesPrimaryKey = {
            determinantSequence: 1,
            searchSequence: this.determinantTables.determinantTablesPrimaryKey.searchSequence ,
            seqRuleId: this.determinantTables.determinantTablesPrimaryKey.seqRuleId,
            keyword: this.determinantTables.determinantTablesPrimaryKey.keyword
        };
        determinantValues.determinantValuesPrimaryKeyModel = determinantValues.determinantValuesPrimaryKey;

        determinantValues.valueThru = event[2].value;
        determinantValues.valueFrom = event[1].value;

        determinantValues.operator = event[0].value;
        determinantValues.determinantSequence = 1;
        determinantValues.keyword = this.determinantTables.determinantTablesPrimaryKey.keyword;
        determinantValues.searchSequence = this.determinantTables.determinantTablesPrimaryKey.searchSequence;
        determinantValues.seqRuleId = this.determinantTables.determinantTablesPrimaryKey.seqRuleId;
        determinantValues.securityCode = '0';
        let date = new Date();
        determinantValues.insertDatetime = this.datepipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        determinantValues.insertUser = 'DORIS';
        determinantValues.insertProcess = 'LBCDC';
        determinantValues.secDeterminantDatatype = 'VARCHAR2';
        determinantValues.action = action;

        return determinantValues;
    }

    openNewScreen() {
        this.claimDiscountCalcRulesForm.reset();
        this.claimDiscountCalcRulesForm.get('lineOfBusiness').enable();
        this.dataGrid001GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.setRowData([]);
        this.isResetForm = true;
    };

    handleSpecialMenu(action: string) {
        this.toastService.showToast('Action is not valid', NgbToastType.Danger);
    }
}
