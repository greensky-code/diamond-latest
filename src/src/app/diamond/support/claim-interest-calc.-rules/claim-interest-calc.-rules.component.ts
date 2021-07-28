/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Constants, GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DddwDtl, DeterminantValues, MessageMasterDtl, SecWin, SystemCodes} from "../../../api-models/index"
import { DeterminantValuesService } from "../../../api-services/determinant-values.service"
import { DeterminantTables } from "../../../api-models/index"
import { DeterminantTablesService } from "../../../api-services/determinant-tables.service"
import { DeterminantRules } from "../../../api-models/index"
import { DeterminantRulesService } from "../../../api-services/determinant-rules.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import {Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import { LineOFBLookup } from '../../../shared/lookup/line-of-business-lookup';
import {
    DddwDtlService,
    LineOfBusinessMasterService,
    MessageMasterDtlService,
    SystemCodesService
} from '../../../api-services';
import { LineOfBusinessMaster } from '../../../api-models/line-of-business-master.model';
import { NgbToastType } from 'ngb-toast';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { ToastService } from '../../../shared/services/toast.service';
import {COBOrderLiabilityFormConfig, SYSTEM_CODE_CLAIM_TYPE} from '../../../shared/models/constants';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    CONSTANTS,
    getClaimInterestCalcRuleShortcutKeys,
    getClaimSDiscountCalcRulesShortcutKeys
} from '../../../shared/services/shared.service';
import {AuditService} from "../../../shared/services/audit.service";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {AllTabColumns} from "../../../shared/models/all-tab-columns.model";
import {TablesAndColumnsComponent} from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import {Timestamp} from "rxjs/internal-compatibility";

// Use the Component directive to define the ClaimInterestCalcRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claim-interest-calc.-rules',
    templateUrl: './claim-interest-calc.-rules.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DeterminantRulesService,
        DeterminantTablesService,
        DeterminantValuesService,
    ],

})
export class ClaimInterestCalcRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimInterestCalcRulesForm: FormGroup;
    claimInterestCalcTableForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'LBCIC';
    public isSuperUser = false;
    public secProgress = true;
    public editDeterminantValues: boolean = false;
    public determinantValues: DeterminantValues;
    public determinantValueses: DeterminantValues[]; editDeterminantTables: boolean = false;
    public determinantTables: DeterminantTables;
    public determinantTableses: DeterminantTables[]; editDeterminantRules: boolean;
    public determinantRules: DeterminantRules;
    public determinantRuleses: DeterminantRules[];
    public currentLineOfBus: string;
    public actionNo: number = 1;
    public menu: Menu[] = [];
    @Input() showIcon: boolean = false;
    @Input() lineOfBusinessId: string;
    seqRuleId: number;
    keyword: string;
    screenCloseRequest: Boolean = false;
    menuOpened = ''
    keyValues: number;
    searchStatus = false;
    keyNames: string = "claimInterestCalcRules";
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    LobSearchModal = new SearchModel(
        "linesofbusinessmaster/LOB/lookup",
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );
    public shortcuts: ShortcutInput[] = [];
    tableFormValidation: FormValidation;
    determinantRule: any;
    @ViewChild('searchSeq') sequenceEle: any;
    @ViewChild('determinantTable') determinantTableElf: any;
    type: string;
    allTables: any[] = [];
    allColumns: AllTabColumns[] = [];
    cobOrderLiabilityFormConfig = COBOrderLiabilityFormConfig;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private mask: Mask,
        private formBuilder: FormBuilder,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private router: Router,
        private toastService: ToastService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private systemCodesService: SystemCodesService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private determinantValuesService: DeterminantValuesService,
        private determinantTablesService: DeterminantTablesService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private determinantRulesService: DeterminantRulesService,
        private auditService: AuditService,
        private messageService: MessageMasterDtlService,
        private renderer: Renderer2,
        ) {
    }

    onLOBLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.getLOBLookUp();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            let lob = event.target.value;
            this.findByLineOfBusiness(lob);
        }
    }

    getLOBLookUp() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.LobSearchModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.findByLineOfBusiness(res.lineOfBusiness);
            }
        });
    }

    public findByLineOfBusiness(lineOfBus: string) {
        this.currentLineOfBus = lineOfBus;
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBus).subscribe((lineOfBusiness: LineOfBusinessMaster) => {
            this.claimInterestCalcRulesForm.patchValue({
                'dynamicText': lineOfBusiness.description,
                'lineOfBusiness': lineOfBusiness.lineOfBusiness
            });
            this.claimInterestCalcRulesForm.get('lineOfBusiness').disable();
            this.getDeterminantRulesListByRuleIdAndKeyword(lineOfBusiness.lineOfBusiness, this.windowId)
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

    createDeterminantValues() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantValues, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantValues = new DeterminantRules();
                determinantValues.fileType = Form.getValue(this.claimInterestCalcRulesForm, 'claim');
                determinantValues.ruleOrder = Number(Form.getValue(this.claimInterestCalcRulesForm, 'ruleOrder'));
                determinantValues.effectiveDate = Form.getDatePickerValue(this.claimInterestCalcRulesForm, 'effectiveDate');
                determinantValues.termDate = Form.getDatePickerValue(this.claimInterestCalcRulesForm, 'termDate');
                determinantValues.description = Form.getValue(this.claimInterestCalcRulesForm, 'description');
                determinantValues.resultValue7 = Form.getValue(this.claimInterestCalcRulesForm, 'calcMethod');
                determinantValues.actionCode = (Number(Form.getValue(this.claimInterestCalcRulesForm, 'interest').split('%')[0])/100).toString();
                determinantValues.activeFlag = Form.getValue(this.claimInterestCalcRulesForm, 'actionFlag');
                determinantValues.resultNumber3 = Number(Form.getValue(this.claimInterestCalcRulesForm, 'penalty').split('%')[0]);
                determinantValues.resultValue7 = Form.getValue(this.claimInterestCalcRulesForm, 'interestFormula');
                determinantValues.resultValue5 = Form.getValue(this.claimInterestCalcRulesForm, 'minPayableIntrline').split('$')[1];
                determinantValues.resultValue2 = Form.getValue(this.claimInterestCalcRulesForm, 'graceDays001');
                determinantValues.resultValue6 = Form.getValue(this.claimInterestCalcRulesForm, 'minPayableIntrclaimTb').split('$')[1];
                determinantValues.resultValue3 = Form.getValue(this.claimInterestCalcRulesForm, 'mailingDays');
                determinantValues.resultValue1 = Form.getValue(this.claimInterestCalcRulesForm, 'graceDays002');
                determinantValues.resultValue4 = Form.getValue(this.claimInterestCalcRulesForm, 'exclUncleanClaimLine001')? 'Y': 'N';
                determinantValues.ruleId = this.claimInterestCalcRulesForm.get('lineOfBusiness').value;
                determinantValues.securityCode = '0';
                determinantValues.determinantRulesPrimaryKey={
                    seqRuleId:0,
                    keyword: this.windowId
                };
                this.auditService.setAuditFields(determinantValues, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
                this.determinantRulesService.createDeterminantRules(determinantValues).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.getDeterminantRulesListByRuleIdAndKeyword(this.currentLineOfBus, this.windowId)
                    this.editDeterminantValues = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000)
                    }
                    this.editDeterminantValues = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        }
    }

    updateDeterminantValues() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantValues, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantValues = new DeterminantRules();
                determinantValues.fileType = Form.getValue(this.claimInterestCalcRulesForm, 'claim');
                determinantValues.ruleOrder = Number(Form.getValue(this.claimInterestCalcRulesForm, 'ruleOrder'));
                determinantValues.effectiveDate = Form.getDatePickerValue(this.claimInterestCalcRulesForm, 'effectiveDate');
                determinantValues.termDate = Form.getDatePickerValue(this.claimInterestCalcRulesForm, 'termDate');
                determinantValues.description = Form.getValue(this.claimInterestCalcRulesForm, 'description');
                determinantValues.resultValue7 = Form.getValue(this.claimInterestCalcRulesForm, 'calcMethod');
                determinantValues.actionCode = (Number(Form.getValue(this.claimInterestCalcRulesForm, 'interest').split('%')[0])/100).toString();
                determinantValues.activeFlag = Form.getValue(this.claimInterestCalcRulesForm, 'actionFlag');
                determinantValues.resultNumber3 = Number(Form.getValue(this.claimInterestCalcRulesForm, 'penalty').split('%')[0]);
                determinantValues.resultValue7 = Form.getValue(this.claimInterestCalcRulesForm, 'interestFormula');
                determinantValues.resultValue5 = Form.getValue(this.claimInterestCalcRulesForm, 'minPayableIntrline').split('$')[1];
                determinantValues.resultValue2 = Form.getValue(this.claimInterestCalcRulesForm, 'graceDays001');
                determinantValues.resultValue6 = Form.getValue(this.claimInterestCalcRulesForm, 'minPayableIntrclaimTb').split('$')[1];
                determinantValues.resultValue3 = Form.getValue(this.claimInterestCalcRulesForm, 'mailingDays');
                determinantValues.resultValue1 = Form.getValue(this.claimInterestCalcRulesForm, 'graceDays002');
                determinantValues.resultValue4 = Form.getValue(this.claimInterestCalcRulesForm, 'exclUncleanClaimLine001')? 'Y': 'N';
                determinantValues.ruleId = this.claimInterestCalcRulesForm.get('lineOfBusiness').value;
                determinantValues.securityCode = '0';
                determinantValues.determinantRulesPrimaryKey={
                    seqRuleId:0,
                    keyword: this.windowId
                };
                determinantValues.seqRuleId = this.seqRuleId;
                determinantValues.keyword = this.keyword;
                determinantValues.insertUser = this.determinantRules.insertUser;
                determinantValues.insertProcess = this.determinantRules.insertProcess;
                this.auditService.setAuditFields(determinantValues, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
                this.determinantRulesService.updateDeterminantRules(determinantValues, this.seqRuleId, this.keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.getDeterminantRulesListByRuleIdAndKeyword(this.currentLineOfBus, this.windowId)
                    this.editDeterminantValues = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000)
                    }
                    this.editDeterminantValues = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveDeterminantValues() {
        if (this.actionNo === 1) {
            if (this.editDeterminantRules === true) {
                this.updateDeterminantValues()
            } else {
                this.createDeterminantValues();
            }
        } else if (this.actionNo === 2) {
            this.saveDeterminantTables();
        }

    }

    deleteDeterminantValues(keyword: string) {
        if ( !this.isSuperUser && !( this.secWin && this.secWin.hasDeletePermission())) {
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
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantValues.insertProcess,
                'interest': this.determinantValues.insertUser,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    setActionStatus(actionNo: number) {
        this.actionNo = actionNo;
    }

    getDeterminantRulesListByRuleIdAndKeyword(ruleId: string, keyword: string) {
        this.determinantRulesService.getDeterminantRulesListByRuleIdAndKeyword(ruleId, keyword).subscribe(drs => {
            drs.sort((a, b) => {
                if (a.ruleOrder < b.ruleOrder) {return -1}
                else if (a.ruleOrder > b.ruleOrder) {return 1}
            })
            this.determinantRuleses = drs;
            this.dataGrid001gridApi.setRowData(this.determinantRuleses);
            this.dataGrid001gridApi.selectIndex(0, false, false);
        });
    }

    getDeterminantTablesesBySeqRuleId(seqRuleId: number) {
        this.editDeterminantRules = true;
        this.determinantTablesService.getDeterminantTablesBySeqRuleId(seqRuleId).subscribe(determinantTableses => {
            if (determinantTableses && determinantTableses.length > 0) {
                determinantTableses.sort((a, b) => {
                    if (a.determinantTablesPrimaryKey.searchSequence < b.determinantTablesPrimaryKey.searchSequence) {return -1}
                    else if (a.determinantTablesPrimaryKey.searchSequence > b.determinantTablesPrimaryKey.searchSequence) {return 1}
                })
                this.determinantTableses = determinantTableses;
                this.dataGrid002gridApi.setRowData(this.determinantTableses);
                this.dataGrid002gridApi.selectIndex(0, false, false);
            } else {
                this.determinantTableses = [];
                this.dataGrid002gridApi.setRowData([]);
                this.editDeterminantRules = false;
                this.dataGrid003gridApi.setRowData([]);
            }
        });
    }

    getDeterminantValuesByRuleId(seqRuleId: number, searchSequence: number) {
        this.determinantValuesService.getDeterminantValuesByRuleIdAndSearchSeq(seqRuleId, searchSequence).subscribe(determinantValueses => {
            this.determinantValueses = determinantValueses;
            this.dataGrid003gridApi.setRowData(this.determinantValueses);
            this.dataGrid003gridApi.selectIndex(0, false, false)
        });
        this.editDeterminantValues = false;
    }

    getDeterminantValueses() {
        this.determinantValuesService.getDeterminantValueses().subscribe(determinantValueses => {
            this.determinantValueses = determinantValueses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    createDeterminantTables() {
        this.formValidation.validateForm();
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantTables, this.secWin)) {
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantTables = new DeterminantTables();
                determinantTables.determinantTablesPrimaryKey = {
                    searchSequence: Form.getValue(
                        this.claimInterestCalcTableForm,
                        "searchSeq"
                    ),
                    keyword: "LBCIC",
                    seqRuleId: this.seqRuleId,
                };
                determinantTables.determinantColumn = Form.getValue(
                    this.claimInterestCalcTableForm,
                    "determinantColumn"
                );
                determinantTables.determinantTable = Form.getValue(
                    this.claimInterestCalcTableForm,
                    "determinantTable"
                );
                determinantTables.keyword = "LBCIC";
                determinantTables.searchSequence = Form.getValue(
                    this.claimInterestCalcTableForm,
                    "searchSeq"
                );

                determinantTables.seqRuleId = this.seqRuleId;
                determinantTables.insertUser = this.determinantRules.insertUser;
                determinantTables.insertProcess = this.determinantRules.insertProcess;
                determinantTables.updateUser = this.determinantRules.updateUser;
                determinantTables.updateProcess = this.determinantRules.updateProcess;
                determinantTables.subsInd = "Y";
                determinantTables.securityCode = "0";
                determinantTables.determinantDatatype = "VARCHAR2";
                this.auditService.setAuditFields(determinantTables, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);
                this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDeterminantTables = false;
                    this.editDeterminantValues = false;
                    this.getDeterminantTablesesBySeqRuleId(this.determinantRules.determinantRulesPrimaryKey.seqRuleId);
                    setTimeout(() => {
                        if (this.screenCloseRequest === true) {
                            this.activeModal.close()
                        }
                    }, 2000)
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {

        }
    }

    updateDeterminantTables(keyword: string) {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantTables, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantTables = new DeterminantTables();
                determinantTables.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantTables.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
                this.determinantTablesService.updateDeterminantTables(determinantTables, keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editDeterminantTables = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveDeterminantTables() {
        if (this.editDeterminantTables) {
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
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantTables.insertProcess,
                'interest': this.determinantTables.insertUser,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
            this.determinantTableses = determinantTableses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    createDeterminantRules() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantRules, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantRules = new DeterminantRules();
                determinantRules.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantRules.reasonCode = Form.getValue(this.claimInterestCalcRulesForm, 'reason');
                determinantRules.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
                this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editDeterminantRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {

        }
    }

    updateDeterminantRules(keyword: string) {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantRules, this.secWin)) {
            this.formValidation.validateForm();
            if (this.claimInterestCalcRulesForm.valid) {
                let determinantRules = new DeterminantRules();
                determinantRules.insertProcess = Form.getValue(this.claimInterestCalcRulesForm, 'lineOfBusiness');
                determinantRules.reasonCode = Form.getValue(this.claimInterestCalcRulesForm, 'reason');
                determinantRules.insertUser = Form.getValue(this.claimInterestCalcRulesForm, 'interest');
                /*this.determinantRulesService.updateDeterminantRules(determinantRules, keyword).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editDeterminantRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });*/
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
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
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.determinantRulesService.deleteDeterminantRules(keyword).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getDeterminantRules(keyword: string) {
        this.determinantRulesService.getDeterminantRules(keyword).subscribe(determinantRules => {
            this.determinantRuleses = determinantRules;
            this.claimInterestCalcRulesForm.patchValue({
                'lineOfBusiness': this.determinantRuleses[0].insertProcess,
                'reason': this.determinantRuleses[0].reasonCode,
                'interest': this.determinantRuleses[0].insertUser,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRuleses().subscribe(determinantRuleses => {
            this.determinantRuleses = determinantRuleses;
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    dataGrid003GridOptionsExportCsv() {
        var params = {
        };
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

    onGrid001Ready(eve: any) {
        this.dataGrid001gridApi = eve.api;
    }

    grid001SelectionChange() {
        let determinantRules = new DeterminantRules();
        var selectedRows = this.dataGrid001gridApi.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            determinantRules = selectedRows[0];
            this.setClaimInterestCalcRulesForm(determinantRules);
        } else {
            this.setClaimInterestCalcRulesForm(determinantRules);
        }
    }

    grid002SelectionChange() {
        let determinantTables = new DeterminantTables();
        var selectedRows = this.dataGrid002gridApi.getSelectedRows();
        this.setDeterminantTableForm(selectedRows[0]);
    }

    onGrid002Ready(eve: any) {
        this.dataGrid002gridApi = eve.api;
    }

    onGrid003Ready(eve: any) {
        this.dataGrid003gridApi = eve.api;
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
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                headerClass: 'clr-blue'
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

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.

    public claimTypeList: SystemCodes[];
    public calcMethodList: DddwDtl[];
    public interestFormulaList: DddwDtl[];
    getSystemCodes(codeType: string) {
        return this.systemCodesService.findBySystemCodeTypeAndSystemCodeActiveAndLanguageId(codeType, 'Y', 0)
    }

    getDddwHdr(cName: string, dwName: string) {
        return this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId(cName, dwName, 0)
    }

    ngOnInit(): void {
        this.initializePermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimInterestCalcRulesForm);
        this.tableFormValidation = new FormValidation(this.claimInterestCalcRulesForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.getSystemCodes(SYSTEM_CODE_CLAIM_TYPE).subscribe(
            resp => { this.claimTypeList = resp as unknown as SystemCodes[] });
        this.getDddwHdr('result_value_7', 'dw_lbcic_rules_de').subscribe(
            resp => { this.calcMethodList = resp as unknown as DddwDtl[] });
        this.getDddwHdr('result_value_1', 'dw_lbcic_rules_de').subscribe(
                resp => { this.interestFormulaList = resp as unknown as DddwDtl[] });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                ]
            },
            {
                menuItem: "Topic",
                dropdownItems: [
                    { name: "Line Of Business" },
                    { name: "Auto Letter Setup" },
                    { name: "PCP Support Info Details" },
                    { name: "PCP Auto Assign" },
                    { name: "Claim Discount Calculation Rules" },
                    { name: "Pre-Existing Conditions Rules" },
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [
                    { name: "Notes", shortcutKey: 'F4', disabled: true },
                ],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Claims Interest Calc. Rules'}
                ]
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window", shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" },
                ],
            },
        ];
    }

    public createNew() {
        if (this.actionNo === 1) {
            const line = this.claimInterestCalcRulesForm.get('lineOfBusiness').value;
            const dynamicText = this.claimInterestCalcRulesForm.value.dynamicText;
            this.resetAll();
            this.claimInterestCalcRulesForm.get('lineOfBusiness').disable();
            let data = [];
            for (let item of this.determinantRuleses) {
                data.push(item)
            }
            data.push([])
            this.dataGrid001gridApi.setRowData(data);
            this.dataGrid001gridApi.selectIndex(data.length - 1, false, false);
            this.claimInterestCalcRulesForm.patchValue({
                dynamicText: dynamicText,
                lineOfBusiness: line,
                claim: 'P',
                calcMethod: 'IN',
                interest: '0',
                textbox003: '0',
                penalty: '0',
                textbox001: '0',
                interestFormula: 'D',
                minPayableIntrline: '0',
                minPayableIntrclaimTb: '0',
                mailingDays: '0',
                exclUncleanClaimLine001: false,
                graceDays001: '0',
                searchSeq: '',
                determinantTable: '',
                determinantColumn: '',
                graceDays002: '0',
            });
            this.dataGrid002gridApi.setRowData([]);
            this.dataGrid003gridApi.setRowData([]);
            this.disabledField();
            this.enabledField1();
            this.editDeterminantRules = false;
        } else {
            let data = [];
            if (this.determinantTableses) {
                for (let item of this.determinantTableses) {
                    data.push(item);
                }
                data.push([])
            } else {
                data.push([])
            }
            this.dataGrid002gridApi.setRowData(data);
            this.dataGrid002gridApi.selectIndex(data.length - 1, false, false);
            this.claimInterestCalcTableForm.patchValue({
                searchSeq: '',
                determinantTable: '',
                determinantColumn: ''
            })
            this.enabledField1();
            this.editDeterminantRules = true
            this.dataGrid003gridApi.setRowData([])
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                   this.createNew();
                    break;
                }
                case "Open": {
                    this.openScreen();
                    break;
                }
                case "Save": {
                    this.saveDeterminantValues();
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
                    this.toastService.showToast(
                        "Action is not valid",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            //this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Window") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case 'Audit Display': {
                    this.auditDisplay();
                    break;
                }
                case 'Show Timestamp': {
                    if (this.claimInterestCalcRulesForm.get('lineOfBusiness').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break
                }
                default:
                    break;
            }
        } else if (event.menu.menuItem === "Topic") {
            this.toastService.showToast(
                "Action is not valid",
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
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

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (value == 'f3') {
                obj = {
                    menu: {
                        menuItem: 'Shortcut Key'
                    },
                    action: 'Shortcut Menu'
                }
                this.onMenuItemClick(obj)
            }
            if (this.menuOpened == 'fileDropdownFile') {
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
                    default:
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
            }
            if (this.menuOpened == 'fileDropdownWindow') {
                switch (value) {
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Audit Display'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            }
            if (this.menuOpened == 'fileDropdownHelp') {
                this.helpScreen()
            }
        }
    }

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

    resetAll() {
        this.claimInterestCalcRulesForm.reset();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }

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
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimInterestCalcRulesForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.setAllTableLookUp();
        if (this.lineOfBusinessId) {
            this.findByLineOfBusiness(this.lineOfBusinessId)
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimInterestCalcRulesForm = this.formBuilder.group({
            lineOfBusiness: ['', { updateOn: 'blur', validators: [] }],
            dynamicText: ['', { updateOn: 'blur', validators: [] }],
            claim: ['', { updateOn: 'blur', validators: [] }],
            ruleOrder: ['', { updateOn: 'blur', validators: [] }],
            effectiveDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            calcMethod: ['', { updateOn: 'blur', validators: [] }],
            pct: ['', { updateOn: 'blur', validators: [] }],
            reason: ['', { updateOn: 'blur', validators: [] }],
            interest: ['', { updateOn: 'blur', validators: [] }],
            textbox001: ['', { updateOn: 'blur', validators: [] }],
            textbox002: ['', { updateOn: 'blur', validators: [] }],
            penalty: ['', { updateOn: 'blur', validators: [] }],
            textbox003: ['', { updateOn: 'blur', validators: [] }],
            textbox004: ['', { updateOn: 'blur', validators: [] }],
            interestFormula: ['', { updateOn: 'blur', validators: [] }],
            minPayableIntrline: ['', { updateOn: 'blur', validators: [] }],
            graceDays001: ['', { updateOn: 'blur', validators: [] }],
            graceDays002: ['', { updateOn: 'blur', validators: [] }],
            minPayableIntrclaimTb: ['', { updateOn: 'blur', validators: [] }],
            mailingDays: ['', { updateOn: 'blur', validators: [] }],
            exclUncleanClaimLine001: ['', { updateOn: 'blur', validators: [] }],
            exclUncleanClaimLine002: ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });
        this.claimInterestCalcTableForm = this.formBuilder.group({
            searchSeq: ['', { updateOn: 'blur', validators: [] }],
            determinantTable: ['', { updateOn: 'blur', validators: [] }],
            determinantColumn: ['', { updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'})
    }

    setDeterminantTableForm(determinantTables: DeterminantTables) {
        this.determinantTables = determinantTables;
        if (this.determinantTableses && this.determinantTableses.length > 0) {
            this.claimInterestCalcTableForm.patchValue({
                'searchSeq': this.determinantTables.determinantTablesPrimaryKey.searchSequence,
                'determinantTable': this.determinantTables.determinantTable,
                'determinantColumn': this.determinantTables.determinantColumn,
            }, {emitEvent: false});
            this.disabledField1()
            this.getDeterminantValuesByRuleId(determinantTables.determinantTablesPrimaryKey.seqRuleId, determinantTables.determinantTablesPrimaryKey.searchSequence)
        }
        this.formValueChangeStatus()
    }



    setClaimInterestCalcRulesForm(determinantRules: DeterminantRules) {
        this.seqRuleId = determinantRules.determinantRulesPrimaryKey.seqRuleId;
        this.keyword = determinantRules.determinantRulesPrimaryKey.keyword;
        this.determinantRules = determinantRules;
        let ft = 'CLAIM TYPE';
        let cm = 'CALC METHOD';
        let intrF = 'Monthly';
        for (var ct of this.claimTypeList) {
            if (ct.systemCodesPrimaryKey.systemCode == this.determinantRules.fileType) {
                ft = ct.systemCodeDesc2;
            }
        }
        for (var c of this.calcMethodList) {
            if (c.value == this.determinantRules.resultValue7) {
                cm = c.key;
            }
        }
        for (var c of this.interestFormulaList) {
            if (c.value == this.determinantRules.resultValue1) {
                intrF = c.key;
            }
        }
        var  intrVal = parseFloat(this.determinantRules.actionCode)*100;
        var  intr =this.parseFloat2Decimals(intrVal+"",2);

        this.claimInterestCalcRulesForm.patchValue({
            'reason': this.determinantRules.reasonCode,
            'interest':  intr + '%',
            'claim': this.determinantRules.fileType,
            'ruleOrder': this.determinantRules.ruleOrder,
            'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.effectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.determinantRules.termDate),
            'description': this.determinantRules.description,
            'calcMethod': this.determinantRules.resultValue7,
            'interestFormula': this.determinantRules.resultValue1,
            'graceDays001': this.determinantRules.resultValue2,
            'graceDays002': this.determinantRules.resultNumber2,
            'mailingDays': this.determinantRules.resultValue3,
            'exclUncleanClaimLine001': this.determinantRules.resultValue4 == 'Y',
            'minPayableIntrline': (this.determinantRules.resultValue5 && this.determinantRules.resultValue5.length > 4) ? '$ 0.00':'$' + this.determinantRules.resultValue5 + '.00',
            'minPayableIntrclaimTb':  (this.determinantRules.resultValue6 && this.determinantRules.resultValue6.length > 4) ? '$0.00' : '$' + this.determinantRules.resultValue6 + '.00',
            'exclUncleanClaimLine002': this.determinantRules.resultValue10 == 'Y',
            'penalty': this.determinantRules.resultNumber3 + '%',
        });
        this.disabledField();
        this.setAllTableLookUp();
        this.getDeterminantTablesesBySeqRuleId(this.determinantRules.determinantRulesPrimaryKey.seqRuleId);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    parseFloat2Decimals(value: string,decimalPlaces: number) {
        return parseFloat(parseFloat(value).toFixed(decimalPlaces));
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimInterestCalcRuleShortcutKeys(this));
        this.cdr.detectChanges();
    }


    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/LBCIC_Line_of_Business_Claims_Interest_Calculations.htm';
    };

    public showTimeStamp = () => {
        if (this.claimInterestCalcRulesForm.get('lineOfBusiness').value === '') {
            this.messageService.findByMessageId(21127).subscribe(res => {
                this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
        } else {
            let ref = this.modalService.open(TimestampComponent);
            ref.componentInstance.title = "Claim Interest Calc. Rules";
            ref.componentInstance.insertDateTime = this.determinantRules.insertDatetimeDisplay;
            ref.componentInstance.insertProcess = this.determinantRules.insertProcess;
            ref.componentInstance.insertUser = this.determinantRules.insertUser;
            ref.componentInstance.updateUser = this.determinantRules.updateUser;
            ref.componentInstance.updateDateTime = this.determinantRules.updateDatetimeDisplay;
            ref.componentInstance.updateProcess = this.determinantRules.updateProcess;
        }
    };

    formValueChangeStatus = () => {
        this.claimInterestCalcRulesForm.valueChanges.subscribe(() => {
            this.editDeterminantValues = true;
        })
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.editDeterminantValues === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Claim Interest Calc. Rules')
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
                    this.saveDeterminantValues();
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
        if (this.editDeterminantValues === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Group Detail', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveDeterminantRules();
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
    };

    openNewScreen() {
        this.claimInterestCalcRulesForm.reset();
        this.claimInterestCalcTableForm.reset();
        this.claimInterestCalcRulesForm.get('lineOfBusiness').enable();
        this.dataGrid001gridApi.setRowData([]);
        this.dataGrid002gridApi.setRowData([]);
        this.dataGrid003gridApi.setRowData([]);
        this.editDeterminantValues = false;
        this.editDeterminantRules = false;
    };

    disabledField() {
        this.claimInterestCalcRulesForm.get('textbox004').disable();
        this.claimInterestCalcRulesForm.get('penalty').disable();
        this.claimInterestCalcRulesForm.get('textbox001').disable();
        this.claimInterestCalcRulesForm.get('textbox002').disable();
        if (this.determinantRules.resultNumber2 !== undefined) {
            this.claimInterestCalcRulesForm.get('graceDays002').disable();
        } else {

        }
    };

    disabledField1() {
        this.claimInterestCalcTableForm.get('searchSeq').disable();
        this.claimInterestCalcTableForm.get('determinantTable').disable();
        this.claimInterestCalcTableForm.get('determinantColumn').disable();
    };

    enabledField1() {
        this.claimInterestCalcTableForm.get('searchSeq').enable();
        this.claimInterestCalcTableForm.get('determinantTable').enable();
        this.claimInterestCalcTableForm.get('determinantColumn').enable();
    };

    onKeydownSequence = (event: any) => {
        if (event.key === 'Tab') {
            event.preventDefault()
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: search_sequence is a required field. Enter something other than blanks.';
                this.emptyPopupMessage(message)
            } else {
                this.onChangeSequence(event)
            }
        }
    };

    emptyPopupMessage = (message: any) => {
        let popUpMessage = new PopUpMessage(
            'popUpMessageName',
            'Claim Interest Calc Rules',
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

    onChangeSequence(value: any) {
        if (value) {
            if (this.determinantTableses) {
                let rec = this.determinantTableses.filter(f => f.determinantTablesPrimaryKey.searchSequence == value);
                if (rec && rec.length > 0) {
                    this.messageService.findByMessageId(70882).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "70882: " + message[0].messageText.replace('@1', this.claimInterestCalcRulesForm.get('claim').value).replace('@2', this.claimInterestCalcRulesForm.get('ruleOrder').value),
                            "Claim Interest Calc Rules"
                        );
                        this.claimInterestCalcRulesForm.patchValue({
                            searchSeq: null
                        });
                        this.renderer.selectRootElement("#searchSeq").focus()
                    });
                } else {
                    this.renderer.selectRootElement("#determinantTable").focus()
                }
            } else {
                this.renderer.selectRootElement("#determinantTable").focus()
            }
        }
        this.type = 'table'
    };

    onLookupFieldDeterminant(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel()
        } else if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                let message = '29032: determinant_table is a required field. Enter something other than blanks.';
                this.emptyPopupMessage(message)
            }
        }
        this.type = 'table'
    };

    onChangeDeterminant(event: any) {
        let tableName = event.target.value;
        let table = this.allTables.filter(f => f.key === tableName);
        if (table && table.length > 0) {
        } else {
            this.claimInterestCalcRulesForm.patchValue({
                determinantTable: null
            });
            this.messageService
                .findByMessageId(4047)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "4047: " + message[0].messageText,
                        "Claim Interest Calc Rules"
                    );
                });
        }
        this.type = 'table'
    };

    onChangeDeterminantColumn(event: any) {
        if (this.claimInterestCalcRulesForm.get('determinantTable').value) {
            let table = this.allColumns.filter(f => f.columnName === event.target.value && f.tableName === this.claimInterestCalcRulesForm.get('determinantTable').value);
            if (table && table.length > 0) {
            } else {
                this.claimInterestCalcRulesForm.patchValue({
                    determinantColumn: null
                });
                this.messageService
                    .findByMessageId(4077)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            "4077: " + message[0].messageText,
                            "Claim Interest Calc Rules"
                        );
                    });
            }
        }
        this.type = 'table'
    };

    openTableAndColumnModel() {
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.tables = this.allTables;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.claimInterestCalcTableForm.patchValue({
                    determinantColumn: res.columnName,
                    determinantTable: res.tableName
                });
            }
        });
    };

    setAllTableLookUp() {
        this.claimInterestCalcRulesForm.patchValue({
            claim: 'P'
        })
        this.allTables = [];
        let tableNames = [
            "GROUP_MASTER",
            "PROV_ADDRESS",
            "PROV_CONTRACT",
            "PROV_MASTER"
        ];
        if (Form.getValue(this.claimInterestCalcRulesForm, 'claim') == 'I') {
            tableNames.push('INST_CLAIM_HEADER');
        } else if (Form.getValue(this.claimInterestCalcRulesForm, 'claim') == 'P' || Form.getValue(this.claimInterestCalcRulesForm, 'claim') == '1') {
            tableNames.push('PROFSVC_CLAIM_HEADER');

        } else if (Form.getValue(this.claimInterestCalcRulesForm, 'claim') == 'D') {
            tableNames.push('DENTAL_CLAIM_HEADER');
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
}
