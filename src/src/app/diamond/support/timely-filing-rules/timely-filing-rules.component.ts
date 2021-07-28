/* Copyright (c) 2021 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
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
import { TimelyFilingRules } from "../../../api-models/timely-filing-rules.model"
import { TimelyFilingRulesService } from "../../../api-services/timely-filing-rules.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { ClmDtlAuthProcLnkRuleService } from '../../../api-services/clm-dtl-auth-proc-lnk-rule.service';
import { Menu, SearchModel } from '../../../shared/models/models';
import {
    CONSTANTS,
    getPlanMasterShortcutKeys,
    getTimelyFilingRulesShortcutKeys
} from '../../../shared/services/shared.service';
import { TimelyFilingRulesLookup } from '../../../shared/lookup/timely-filing-rules-lookup';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { DddwDtlService, MessageMasterDtlService, SystemCodesService } from '../../../api-services';
import { MessageMasterDtl, SystemCodes } from '../../../api-models';
import { TimelyFilingRulesSpecialComponent } from '../timely-filing-rules-special/timely-filing-rules-special.component';
import { SystemCodesLookup } from '../../../shared/lookup/system-codes-lookup';
import { SupportHelpComponent } from "../support-help/support-help.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';

// Use the Component directive to define the TimelyFilingRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'timelyfilingrules',
    templateUrl: './timely-filing-rules.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        TimelyFilingRulesService,
        ClmDtlAuthProcLnkRuleService,
    ],

})
export class TimelyFilingRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    timelyFilingRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'TFRUL';
    public isSuperUser = false;
    public secProgress = true;
    @Input() showIcon: boolean = false;
    public editTimelyFilingRules: boolean;
    public timelyFilingRules: TimelyFilingRules;
    public timelyFilingRuleses: TimelyFilingRules[];
    public claimType: string;
    public ruleOrder: number;
    public actionNo: number = 1;
    public menu: Menu[] = [];

    calcFromDateList: any;
    calcThruDateList: any;
    public shortcuts: ShortcutInput[] = [];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    actions: any[];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private messageService: MessageMasterDtlService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        public activeModal: NgbActiveModal,
        private clmDtlAuthProcLnkRuleService: ClmDtlAuthProcLnkRuleService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private timelyFilingRulesService: TimelyFilingRulesService,
        private router: Router,
        private toastService: ToastService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private menuSerrvice: MenuService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.timelyFilingRulesForm);
        this.createDataGrid();
        this.getCalcFromDate();
        this.getCalcThruDate();
        this.getActions();
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

    onCTLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.getClaimTypeLookUp();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                let popUpMessage = new PopUpMessage(
                    'popUpMessageName',
                    'Timely Filing Rules',
                    '6232: Claim Type is required',
                    'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => { })
            } else {
                let cType = event.target.value;
                this.getClaimTypeDesp(cType);
            }
            this.timelyFilingRulesForm.controls['effectiveDate'].disable();
            this.timelyFilingRulesForm.controls["claimType"].disable();
        }
    }

    getCalcFromDate() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'calc_from_date',
            'dw_tfrul_de'
        ).subscribe(
            (code) => {
                this.calcFromDateList = code;
            }
        );
    }

    getCalcThruDate() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'calc_thru_date',
            'dw_tfrul_de'
        ).subscribe(
            (code) => {
                this.calcThruDateList = code;
            }
        );
    }

    getClaimTypeDesp(cType: string) {
        this.timelyFilingRulesForm.get('claimType').disable();
        this.systemCodesService.findBySystemCodeTypeAndSystemCodeActiveAndLanguageId(CONSTANTS.CLAIMTYPE, 'Y', 0)
            .subscribe(resp => {

                for (var ct of resp as unknown as SystemCodes[]) {
                    if (ct.systemCodesPrimaryKey.systemCode == cType) {
                        this.timelyFilingRulesForm.patchValue({
                            'claimType': ct.systemCodesPrimaryKey.systemCode,
                            'claimTypeDescription': ct.systemCodeDesc2,
                        });
                        this.timelyFilingRulesForm.get('claimType').disable();
                        return;
                    }
                }
                this.timelyFilingRulesForm.reset();
                this.alertMessage = this.alertMessageService.error("Claim type is not present.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
            });
    }

    getClaimTypeLookUp() {
        let ref = this.modalService.open(SearchboxComponent);
        let claimTypeURL = `systemcodeses/find-by-systemCodeType/${CONSTANTS.CLAIMTYPE}/systemCodeActive/Y/languageId/0`;

        let srcModel = new SearchModel(claimTypeURL, SystemCodesLookup.SYSTEM_CODES_ALL, SystemCodesLookup.SYSTEM_CODES_DEFAULT, []
            , false, false, 'get');

        ref.componentInstance.searchModel = srcModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.timelyFilingRulesForm.patchValue({
                    'claimType': resp.systemCodesPrimaryKey.systemCode,
                    'claimTypeDescription': resp.systemCodeDesc2,
                });
                this.timelyFilingRulesForm.get('claimType').disable();
            }
            this.timelyFilingRulesForm.controls['effectiveDate'].disable();
            this.timelyFilingRulesForm.controls["claimType"].disable();
        });
    }

    onRuleOrderLookupFieldChange(event: any) {
        this.claimType = this.timelyFilingRulesForm.get("claimType").value;
        if (event.key === 'F5') {
            event.preventDefault();
            this.getRuleOrderLookUp();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                let popUpMessage = new PopUpMessage(
                    'popUpMessageName',
                    'Timely Filing Rules',
                    '29029: Value required for Rule Order',
                    'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => { })
            } else {
                let rOrder = event.target.value;
                this.getTimelyFilingRulesByRuleOrder(rOrder);
            }
        }
    }

    getRuleOrderLookUp() {
        let timelyFilingRules = new TimelyFilingRules();
        let ref = this.modalService.open(SearchboxComponent);
        let claimTypeURL = `timelyfilingruleses/claim-type/${this.claimType}`;
        let srcModel = new SearchModel(claimTypeURL, TimelyFilingRulesLookup.TIMELY_FILING_RULE_ALL, TimelyFilingRulesLookup.TIMELY_FILING_RULE_DEFAULT, []);

        ref.componentInstance.searchModel = srcModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                timelyFilingRules = resp;
                this.ruleOrder = timelyFilingRules.ruleOrder;
                this.getTimelyFilingRulesByRuleOrder(timelyFilingRules.ruleOrder);
            }
        });
    }

    getTimelyFilingRulesByRuleOrder(ruleOrder: number) {
        this.timelyFilingRulesForm.get('ruleOrder').disable();
        this.ruleOrder = ruleOrder;
        this.timelyFilingRulesService.getTimelyFilingRulesByRuleOrder(this.claimType, ruleOrder).subscribe(tFRuleses => {
            this.timelyFilingRuleses = tFRuleses;
            this.dataGridgridApi.setRowData(this.timelyFilingRuleses);
            this.dataGridgridApi.selectIndex(0, false, false);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    setTimelyFilingForm(timelyFilingRules: TimelyFilingRules) {
        this.timelyFilingRules = timelyFilingRules;
        this.timelyFilingRulesForm.patchValue({
            'claimType': this.timelyFilingRules.claimType,
            'ruleOrder': this.timelyFilingRules.ruleOrder,
            'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.timelyFilingRules.effectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.timelyFilingRules.termDate),
            'description': this.timelyFilingRules.description,
            'lineOfBusiness': this.timelyFilingRules.insertProcess,
            'companyCode': this.timelyFilingRules.companyCodeSelect,
            'providerParStatus': this.timelyFilingRules.provStatusSelect,
            'serviceDeliveryState': this.timelyFilingRules.serviceStateSelect,
            'authorizationLevel': this.timelyFilingRules.authLevelSelect,
            'revenueCode': this.timelyFilingRules.revenueCodeSelect,
            'calcFromDate': this.timelyFilingRules.calcFromDate,
            'calcThruDate': this.timelyFilingRules.calcThruDate,
            'filingLimitDays': this.timelyFilingRules.filingLimitDays,
            'ignoreProvLimitDays': this.timelyFilingRules.provLimDaysFlag,
            'action': this.timelyFilingRules.action === 'D' ? 'Deny' : this.timelyFilingRules.action,
            'applyActionToAllDetailLin': this.timelyFilingRules.applyActionToAllDtlLines,
            'reasonCode': this.timelyFilingRules.reasonCode,
            'messageToOperator': this.timelyFilingRules.messageToOperator,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
        this.timelyFilingRulesForm.get('effectiveDate').disable();
    }

    createTimelyFilingRules() {
        this.formValidation.validateForm();
        if (this.secWin.hasInsertPermission()) {
            if (this.timelyFilingRulesForm.valid) {
                let timelyFilingRules = new TimelyFilingRules();
                timelyFilingRules.claimType = Form.getValue(this.timelyFilingRulesForm, 'claimType');
                timelyFilingRules.description = Form.getValue(this.timelyFilingRulesForm, 'claimTypeDescription');
                timelyFilingRules.ruleOrder = Form.getValue(this.timelyFilingRulesForm, 'ruleOrder');
                timelyFilingRules.effectiveDate = Form.getValue(this.timelyFilingRulesForm, 'effectiveDate');
                timelyFilingRules.termDate = Form.getValue(this.timelyFilingRulesForm, 'termDate');
                timelyFilingRules.action = Form.getValue(this.timelyFilingRulesForm, 'description');
                timelyFilingRules.insertProcess = Form.getValue(this.timelyFilingRulesForm, 'lineOfBusiness');
                timelyFilingRules.companyCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'companyCode');
                timelyFilingRules.provStatusSelect = Form.getValue(this.timelyFilingRulesForm, 'providerParStatus');
                timelyFilingRules.serviceStateSelect = Form.getValue(this.timelyFilingRulesForm, 'serviceDeliveryState');
                timelyFilingRules.authLevelSelect = Form.getValue(this.timelyFilingRulesForm, 'authorizationLevel');
                timelyFilingRules.revenueCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'revenueCode');
                timelyFilingRules.calcFromDate = Form.getValue(this.timelyFilingRulesForm, 'calcFromDate');
                timelyFilingRules.calcThruDate = Form.getValue(this.timelyFilingRulesForm, 'calcThruDate');
                timelyFilingRules.filingLimitDays = Form.getValue(this.timelyFilingRulesForm, 'filingLimitDays');
                timelyFilingRules.provLimDaysFlag = Form.getValue(this.timelyFilingRulesForm, 'ignoreProvLimitDays');
                timelyFilingRules.applyActionToAllDtlLines = Form.getValue(this.timelyFilingRulesForm, 'applyActionToAllDetailLin');
                timelyFilingRules.reasonCode = Form.getValue(this.timelyFilingRulesForm, 'reasonCode');
                timelyFilingRules.messageToOperator = Form.getValue(this.timelyFilingRulesForm, 'messageToOperator');
                this.timelyFilingRulesService.createTimelyFilingRules(timelyFilingRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editTimelyFilingRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Action unauthorized");
            }

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateTimelyFilingRules(seqTfrulId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.timelyFilingRulesForm.valid) {
                let timelyFilingRules = new TimelyFilingRules();
                timelyFilingRules.claimType = Form.getValue(this.timelyFilingRulesForm, 'claimType');
                timelyFilingRules.description = Form.getValue(this.timelyFilingRulesForm, 'claimTypeDescription');
                timelyFilingRules.ruleOrder = Form.getValue(this.timelyFilingRulesForm, 'ruleOrder');
                timelyFilingRules.effectiveDate = Form.getValue(this.timelyFilingRulesForm, 'effectiveDate');
                timelyFilingRules.termDate = Form.getValue(this.timelyFilingRulesForm, 'termDate');
                timelyFilingRules.action = Form.getValue(this.timelyFilingRulesForm, 'description');
                timelyFilingRules.insertProcess = Form.getValue(this.timelyFilingRulesForm, 'lineOfBusiness');
                timelyFilingRules.companyCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'companyCode');
                timelyFilingRules.provStatusSelect = Form.getValue(this.timelyFilingRulesForm, 'providerParStatus');
                timelyFilingRules.serviceStateSelect = Form.getValue(this.timelyFilingRulesForm, 'serviceDeliveryState');
                timelyFilingRules.authLevelSelect = Form.getValue(this.timelyFilingRulesForm, 'authorizationLevel');
                timelyFilingRules.revenueCodeSelect = Form.getValue(this.timelyFilingRulesForm, 'revenueCode');
                timelyFilingRules.calcFromDate = Form.getValue(this.timelyFilingRulesForm, 'calcFromDate');
                timelyFilingRules.calcThruDate = Form.getValue(this.timelyFilingRulesForm, 'calcThruDate');
                timelyFilingRules.filingLimitDays = Form.getValue(this.timelyFilingRulesForm, 'filingLimitDays');
                timelyFilingRules.provLimDaysFlag = Form.getValue(this.timelyFilingRulesForm, 'ignoreProvLimitDays');
                timelyFilingRules.applyActionToAllDtlLines = Form.getValue(this.timelyFilingRulesForm, 'applyActionToAllDetailLin');
                timelyFilingRules.reasonCode = Form.getValue(this.timelyFilingRulesForm, 'reasonCode');
                timelyFilingRules.messageToOperator = Form.getValue(this.timelyFilingRulesForm, 'messageToOperator');
                this.timelyFilingRulesService.updateTimelyFilingRules(timelyFilingRules, seqTfrulId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editTimelyFilingRules = false;
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

    saveTimelyFilingRules() {
        if (this.editTimelyFilingRules) {
            this.updateTimelyFilingRules(this.timelyFilingRules.seqTfrulId)
        } else {
            this.createTimelyFilingRules();
        }
    }

    deleteTimelyFilingRules(seqTfrulId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.timelyFilingRulesService.deleteTimelyFilingRules(seqTfrulId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getTimelyFilingRules(seqTfrulId: number) {
        this.timelyFilingRulesService.getTimelyFilingRules(seqTfrulId).subscribe(timelyFilingRules => {
            this.setTimelyFilingForm(timelyFilingRules);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getTimelyFilingRuleses() {
        this.timelyFilingRulesService.getTimelyFilingRuleses().subscribe(timelyFilingRuleses => {
            this.timelyFilingRuleses = timelyFilingRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    onGridReady(eve: any) {
        this.dataGridgridApi = eve.api;
    }

    setActionStatus(actionNo: number) {
        this.actionNo = actionNo;
    }

    grid1SelectionChange() {
        let timelyFilingRules = new TimelyFilingRules();
        var selectedRows = this.dataGridgridApi.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            timelyFilingRules = selectedRows[0];
            this.setTimelyFilingForm(timelyFilingRules);
        } else {
            this.setTimelyFilingForm(timelyFilingRules);
        }
    }

    dataGridGridOptionsExportCsv() {
        var params = {
        };
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Rule Order",
                field: "ruleOrder",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
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

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
    /*hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
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
    }*/

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
                //Check Menus Privilege Start
                let menuResponse = new MenuResponse();
                menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                if (menuResponse.status) {
                    this.menu = [];
                    this.menu = [...menuResponse.menus];
                }
                //Check Menus Privilege End

            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.timelyFilingRulesForm);
        this.createDataGrid();
        this.menuInit();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New", shortcutKey: 'Ctrl+M' },
                    { name: "Open", shortcutKey: 'Ctrl+O' },
                    { name: "Delete", shortcutKey: 'Ctrl+D' },
                    { name: "Save", shortcutKey: 'Ctrl+S' },
                    { name: "Close", shortcutKey: 'Ctrl+F4' },
                    { name: "-" },
                    { name: "Main Menu...", shortcutKey: 'F2' },
                    { name: "Shortcut Menu...", shortcutKey: 'F3' },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", disabled: true, shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: "Cut", disabled: true, shortcutKey: 'Ctrl+X' },
                    { name: "Copy", disabled: true, shortcutKey: 'Ctrl+C' },
                    { name: "Paste", disabled: true, shortcutKey: 'Ctrl+V' },
                    { isHorizontal: true },
                    { name: "Lookup", shortcutKey: 'F5' },
                ],
            },
            {
                menuItem: "Topic"
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    { name: "Line Of Business Criteria" },
                    { name: "Company Code Criteria" },
                    { name: "Provider Status Criteria" },
                    { name: "Service State Criteria" },
                    { name: "Authorization Level Criteria" },
                    { name: "Place of Service Criteria" },
                    { name: "Bill Type Criteria" },
                    { name: "Revenue Code Criteria" },
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [
                    { name: "Notes", shortcutKey: 'Ctrl+M' },
                ],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Tile" },
                    { name: "Layer" },
                    { name: "Cascade" },
                    { name: "Arrange Icons" },
                    { isHorizontal: true },
                    { name: "Show Timestamp" },
                    { name: "Audit Display" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Vendor Master" },
                ],
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.resetAll();
                    break;
                }
                case "Open": {
                    this.resetAll();
                    break;
                }
                case "Save": {
                    //this.saveClmDtlAuthProcLnkHdr();
                    break;
                }
                case "Close": {
                    this.resetAll();
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
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
            }
        } else if (event.menu.menuItem === "Topic") {
        } else if (event.menu.menuItem === "Special") {
            this.openSpecialPopUp(event.action)
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    OpenPopUp(title: string, checkBoxTxt: string, columnName: string) {
        console.log(this.ruleOrder);
        if (!this.ruleOrder) {
            this.messageService
                .findByMessageId(5670)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "5670 : " + message[0].messageText.replace("@1", "Procedure Code"),
                        "Vendor"
                    );
                });
            return;
        } else {
            let ref = this.modalService.open(TimelyFilingRulesSpecialComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popUpTitle = title;
            ref.componentInstance.specialCriteria = checkBoxTxt;
            ref.componentInstance.columnName = columnName;
        }
    }

    openSpecialPopUp(action: string) {
        switch (action) {
            case "Line Of Business Criteria": {
                this.OpenPopUp("Line Of Business Criteria", "All Lines of Business", "Line Of Business Criteria");
                break;
            }
            case "Company Code Criteria": {
                this.OpenPopUp("Provider Status Criteria", "All Company Codes", "Company Code Criteria");
                break;
            }
            case "Provider Status Criteria": {
                this.OpenPopUp("Provider Status Criteria", "All Provider Statuses", "Provider Status Criteria");
                break;
            }
            case "Service State Criteria": {
                this.OpenPopUp("Service State Criteria", "All Service State", "Service State Criteria");

                break;
            }
            case "Authorization Level Criteria": {
                this.OpenPopUp("Authorization Level Criteria", "All Authorization Levels", "Authorization Level Criteria");

                break;
            }
            case "Place of Service Criteria": {
                this.OpenPopUp("Place of Service Criteria", "All Place of Service", "Place of Service Criteria");

                break;
            }
            case "Bill Type Criteria": {
                this.OpenPopUp("Bill Type Selection Criteria", "All Bill Types", "Bill Type Criteria");

                break;
            }
            case "Revenue Code Criteria": {
                this.OpenPopUp("Revenue Code Selection Criteria", "All Revenue Codes", "Revenue Code Criteria");

                break;
            }

        }
    }



    resetAll() {
        this.timelyFilingRulesForm.reset();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.timelyFilingRulesForm = this.formBuilder.group({
            claimType: ['', { updateOn: 'blur', validators: [] }],
            claimTypeDescription: ['', { updateOn: 'blur', validators: [] }],
            ruleOrder: ['', { updateOn: 'blur', validators: [] }],
            effectiveDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            lineOfBusiness: ['', { updateOn: 'blur', validators: [] }],
            companyCode: ['', { updateOn: 'blur', validators: [] }],
            providerParStatus: ['', { updateOn: 'blur', validators: [] }],
            serviceDeliveryState: ['', { updateOn: 'blur', validators: [] }],
            authorizationLevel: ['', { updateOn: 'blur', validators: [] }],
            revenueCode: ['', { updateOn: 'blur', validators: [] }],
            calcFromDate: ['', { updateOn: 'blur', validators: [] }],
            calcThruDate: ['', { updateOn: 'blur', validators: [] }],
            filingLimitDays: ['', { updateOn: 'blur', validators: [] }],
            ignoreProvLimitDays: ['', { updateOn: 'blur', validators: [] }],
            action: ['', { updateOn: 'blur', validators: [] }],
            applyActionToAllDetailLin: ['', { updateOn: 'blur', validators: [] }],
            reasonCode: ['', { updateOn: 'blur', validators: [] }],
            messageToOperator: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getTimelyFilingRulesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/TFRUL_Timely_Filing_Rules.htm';
    }

    getActions = () => {
        this.dddwDtlService
            .findByColumnNameAndDwnameAndLanguageId(
                "action",
                "dw_tfrul_de",
                0
            ).subscribe(res => {
                this.actions = res;
        })

    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Timely Filing Rules')
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
        this.timelyFilingRulesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
