/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig } from '../../../shared/config';

import {  DeterminantRulesService } from "../../../api-services/determinant-rules.service"
import {  DeterminantTablesService } from "../../../api-services/determinant-tables.service"
import {  DeterminantValuesService } from "../../../api-services/determinant-values.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import {DeterminantRules} from '../../../api-models/determinant-rules';
import {DeterminantTables} from '../../../api-models/determinant-tables.model';
import {DeterminantValues} from '../../../api-models/determinant-values.model';
import {CONSTANTS, getCobOrderLiabilityShortcutKeys} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbToastType} from 'ngb-toast';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {ToastService} from '../../../shared/services/toast.service';
import {COBOrderLiabilityFormConfig} from "../../../shared/models/constants";
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TablesAndColumnsComponent} from '../../../shared/components/tables-and-columns/tables-and-columns.component';
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {MessageMasterDtl, SecUser} from "../../../api-models";
import {SecWin} from "../../../api-models/security/sec-win.model";
import { Menu } from '../../../shared/models/models';
import {BenefitsHelpComponent} from "../../benefits/benefits-help/benefits-help.component";
import {HelpComponent} from "../../member/help/help.component";

// Use the Component directive to define the CobOrderLiabilityComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'coborderliability',
    templateUrl: './cob-order-liability.component.html',
    styleUrls: ['./cob-order-liability.component.scss'],
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DeterminantRulesService,
        DeterminantTablesService,
        DeterminantValuesService
]
})
export class CobOrderLiabilityComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    cobOrderLiabilityForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public shortcuts: ShortcutInput[] = [];
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    private rowData001: any;
    private rowData002: any;
    date: any;
    editDeterminantRule: boolean = false;
    editDeterminantTableValue: boolean = false;
    disabledInput: boolean = false;
    determinantRules: DeterminantRules;
    determinantRuleses: DeterminantRules[];
    editDeterminantTables: boolean;
    determinantTables: DeterminantTables;
    determinantTableses: DeterminantTables[];
    editDeterminantValues: boolean;
    determinantValues: DeterminantValues;
    determinantValueses: DeterminantValues[];
    operators: any[] = [];
    cobOrderLiabilityFormConfig = COBOrderLiabilityFormConfig;
    @Input() showIcon: boolean = false;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    secWin: SecWinViewModel;
    windowId = 'MEMBR';
    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    public menu: Menu[] = [];
    formDataModifiedStatus: boolean = false;
    isScreenCloseRequest: boolean = false;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor (
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private determinantRulesService: DeterminantRulesService,
        private determinantTablesService: DeterminantTablesService,
        private determinantValuesService: DeterminantValuesService,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private dddwDtlService: DddwDtlService,
        public datepipe: DatePipe,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCobOrderLiabilityShortcutKeys(this));
        this.cdr.detectChanges();
    }

    initializeComponentState (){
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.cobOrderLiabilityForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.getDeterminantTableses();
        this.getDeterminantRuleses();
        this.getOperators()
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Delete' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true },
                    { name: 'Copy', disabled: true },
                    { name: 'Paste', disabled: true },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' },
                    { name: 'Layer' },
                    { name: 'Cascade' },
                    { name: 'Arrange Icons' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp' },
                    { name: 'Audit Display' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 COB Order of Liability' },
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

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewForm();
                    break;
                }
                case 'Delete': {
                    // statements;
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveDynamicForm(null);
                    break;
                }
                case 'Close': {
                    this.activeModal.dismiss();
                    break;
                }
                case 'Shortcut Menu': {
                    // statements;
                    break;
                }
                default: {
                    // statements;
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    break;
                }
                case '2 COB Order of Liability': {
                    break;
                }

            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    closeModal() {
         this.isScreenCloseRequest = true;
         if (this.formDataModifiedStatus === true) {
             this.messageService
                 .findByMessageId(29065)
                 .subscribe((message: MessageMasterDtl[]) => {
                     this.showPopupAlert(message[0].messageText, 'COB Order of Liability');
                 });
         } else {
             this.activeModal.close();
         }
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {

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
            this.userTemplateId = user.dfltTemplate
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

    saveDynamicForm($event){
        console.log($event);
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

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if(button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

    getOperators() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.OPERATOR, CONSTANTS.DW_COBHD_DETER_VALUES_DE).subscribe(status => {
            this.operators = status;
        });
    }

    openTableAndColumnModel() {
       this.modalService.open(TablesAndColumnsComponent);
        // ref.componentInstance.onRowSelected.subscribe((res: any) => {
        //     this.cobOrderLiabilityForm.patchValue({});
        // })
    }

    onFieldChange(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel();
        }
    }

    createNewForm() {
        this.createForm();
    }

    createDeterminantRules() {
        this.date = new Date();
        let today = this.datepipe.transform(this.date, 'dd-MM-yyyy');
        this.formValidation.validateForm();
        if (this.cobOrderLiabilityForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.determinantRulesPrimaryKey = {seqRuleId: null, keyword: 'COBOR'};
            determinantRules.ruleOrder = this.cobOrderLiabilityForm.get('ruleOrder').value;
            determinantRules.ruleId = this.cobOrderLiabilityForm.get('ruleId').value;
            determinantRules.description = this.cobOrderLiabilityForm.get('description').value;
            determinantRules.actionCode = this.cobOrderLiabilityForm.get('actionCode').value;
            determinantRules.securityCode = '0';
            determinantRules.insertDatetime = today;
            determinantRules.insertUser = 'DORIS';
            determinantRules.insertProcess = 'COBOR';
            this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDeterminantRule = false;
                this.getDeterminantRuleses();
                this.createForm();
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    updateDeterminantRules() {
        this.date = new Date();
        let today = this.datepipe.transform(this.date, 'dd-MM-yyyy');
        this.formValidation.validateForm();
        if (this.cobOrderLiabilityForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.determinantRulesPrimaryKey = {seqRuleId: null, keyword: this.rowData001.keyword};
            determinantRules.ruleOrder = this.cobOrderLiabilityForm.get('ruleOrder').value;
            determinantRules.ruleId = this.cobOrderLiabilityForm.get('ruleId').value;
            determinantRules.description = this.cobOrderLiabilityForm.get('description').value;
            determinantRules.actionCode = this.cobOrderLiabilityForm.get('actionCode').value;
            determinantRules.securityCode = '0';
            determinantRules.insertDatetime = today;
            determinantRules.insertUser = 'DORIS';
            determinantRules.insertProcess = 'COBOR';

            this.determinantRulesService.updateDeterminantRules(determinantRules, this.rowData001.determinantRulesPrimaryKey.seqRuleId, this.rowData001.determinantRulesPrimaryKey.keyword).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editDeterminantRule = false;
                this.getDeterminantRuleses();
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveDeterminantRules() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantRule, this.secWin)) {
            if (this.editDeterminantRule) {
                this.updateDeterminantRules()
            } else {
                this.createDeterminantRules();
            }
        }
    }

    deleteDeterminantRules(keyword : string) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.determinantRulesService.deleteDeterminantRules(keyword).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getDeterminantRules(keyword : string) {
        this.determinantRulesService.getDeterminantRules(keyword).subscribe(determinantRules => {
            this.determinantRuleses = determinantRules;
            this.cobOrderLiabilityForm.patchValue({
            });
        });
    }

    getDeterminantRuleses() {
        this.determinantRulesService.getDeterminantRuleses().subscribe(determinantRuleses => {
        this.determinantRuleses = determinantRuleses;
        this.dataGrid001GridOptions.api.setRowData(this.determinantRuleses);
        this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        });
    }

    createDeterminantTables() {
        this.formValidation.validateForm();
        this.date = new Date();
        let today = this.datepipe.transform(this.date, 'dd-MM-yyyy');
        if (this.cobOrderLiabilityForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.determinantTablesPrimaryKey = { searchSequence: this.cobOrderLiabilityForm.get('searchSeq').value, seqRuleId: this.rowData001.determinantRulesPrimaryKey.seqRuleId, keyword: this.rowData001.determinantRulesPrimaryKey.keyword };
            determinantTables.determinantTable = this.cobOrderLiabilityForm.get('determinantTable').value;
            determinantTables.determinantColumn = this.cobOrderLiabilityForm.get('determinantColumn').value;
            if (this.cobOrderLiabilityForm.get('subsFlag').value) {
                determinantTables.subsInd = 'Y'
            } else {
                determinantTables.subsInd = 'N'
            }
            determinantTables.securityCode = '0';
            determinantTables.insertDatetime = today;
            determinantTables.insertUser = 'DORIS';
            determinantTables.insertProcess = 'COBOR';
            determinantTables.determinantDatatype = 'VARCHAR2';

            this.determinantTablesService.createDeterminantTables(determinantTables).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDeterminantTables = false;
                this.getDeterminantTableses();
                this.createForm();
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateDeterminantTables(keyword: string) {
        this.formValidation.validateForm();
        this.date = new Date();
        let today = this.datepipe.transform(this.date, 'dd-MM-yyyy');
        if(this.cobOrderLiabilityForm.valid) {
            let determinantTables = new DeterminantTables();
            determinantTables.searchSequence = this.cobOrderLiabilityForm.get('searchSeq').value;
            determinantTables.determinantTable = this.cobOrderLiabilityForm.get('determinantTable').value;
            determinantTables.determinantColumn = this.cobOrderLiabilityForm.get('determinantColumn').value;
            if (this.cobOrderLiabilityForm.get('subsFlag').value) {
                determinantTables.subsInd = 'Y'
            } else {
                determinantTables.subsInd = 'N'
            }
            determinantTables.securityCode = '0';
            determinantTables.insertDatetime = today;
            determinantTables.insertUser = 'DORIS';
            determinantTables.insertProcess = 'COBOR';
            this.determinantTablesService.updateDeterminantTables(determinantTables, keyword).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editDeterminantTables = false;
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveDeterminantTables() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantTables, this.secWin)) {
            if (this.editDeterminantTables) {
                this.updateDeterminantTables(this.determinantTables.keyword)
            } else {
                this.createDeterminantTables();
            }
        }
    }

    deleteDeterminantTables(keyword : string) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.determinantTablesService.deleteDeterminantTables(keyword).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getDeterminantTables(keyword : string) {
        this.determinantTablesService.getDeterminantTables(keyword).subscribe(determinantTables => {
            this.determinantTables = determinantTables;
            this.cobOrderLiabilityForm.patchValue({
            });
        });
    }

    getDeterminantTableses() {
        this.determinantTablesService.getDeterminantTableses().subscribe(determinantTableses => {
        this.determinantTableses = determinantTableses;
            this.dataGrid002GridOptions.api.setRowData(this.determinantTableses);
            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        });
    }

    createDeterminantValues() {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantValues = new DeterminantValues();
            this.determinantValuesService.createDeterminantValues(determinantValues).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDeterminantValues = false;
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    updateDeterminantValues(keyword : string) {
        this.formValidation.validateForm();
        if(this.cobOrderLiabilityForm.valid) {
            let determinantValues = new DeterminantValues();
            this.determinantValuesService.updateDeterminantValues(determinantValues, keyword).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDeterminantValues = false;
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveDeterminantValues() {
        if (this.securityService.checkInsertUpdatePermissions(this.editDeterminantValues, this.secWin)) {
            if (this.editDeterminantValues) {
                this.updateDeterminantValues(this.determinantValues.keyword)
            } else {
                this.createDeterminantValues();
            }
        }
    }

    deleteDeterminantValues(keyword : string) {
        this.determinantValuesService.deleteDeterminantValues(keyword).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getDeterminantValues(keyword : string) {
        this.determinantValuesService.getDeterminantValues(keyword).subscribe(determinantValues => {
            this.determinantValues = determinantValues;
            this.cobOrderLiabilityForm.patchValue({
            });
        });
    }

    getDeterminantValueses() {
        this.determinantValuesService.getDeterminantValueses().subscribe(determinantValueses => {
        this.determinantValueses = determinantValueses;
        });
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        // tslint:disable-next-line:no-unused-expression
        this.editDeterminantRule = true;
        this.disabledInput = true;
        this.rowData001 = event.data;
        this.getDeterminantRule(this.rowData001)
    }

    onRowSelectedGrid002(event) {
        if (!event.node.selected) {
            return;
        }
        this.rowData002 = event.data;
        this.editDeterminantTables = true;
        this.getDeterminantTableValue(this.rowData002)
    }

    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Rule Order",
             field: "ruleOrder",
             width: 270,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Rule ID",
             field: "ruleId",
             width: 270         },
         {
             headerName: "Description",
             field: "description",
             width: 270         },
         {
             headerName: "Action Code",
             field: "actionCode",
             width: 270         }
      ];
    }

    createDataGrid002(): void {
      this.dataGrid002GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "Search Seq",
             field: "searchSequence",
             width: 270,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Determinant Table",
             field: "determinantTable",
             width: 270         },
         {
             headerName: "Determinant Column",
             field: "determinantColumn",
             width: 270         },
         {
             headerName: "Subs Flag",
             field: "subsInd",
             width: 270         }
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
             checkboxSelection: true
         },
         {
             headerName: "See Determinant Table",
             field: "secdeterminanttable",
             width: 200         },
         {
             headerName: "See Determinant Column",
             field: "secdeterminantcolumn",
             width: 200         },
         {
             headerName: "From Value",
             field: "",
             width: 200         },
         {
             headerName: "Thru Value",
             field: "",
             width: 200         }
      ];
    }

    private getDeterminantRule(determinantRules: DeterminantRules) {
        this.disabledInput = true;
        this.cobOrderLiabilityForm.patchValue({
            'ruleOrder': determinantRules.ruleOrder,
            'ruleId': determinantRules.ruleId,
            'description': determinantRules.description,
            'actionCode': determinantRules.actionCode,
        }, {emitEvent: false});
        this.isFormModifiedStatus();
    }

    private getDeterminantTableValue(determinantTable: DeterminantTables) {
        this.cobOrderLiabilityForm.patchValue({
            'searchSeq': determinantTable.searchSequence,
            'determinantTable': determinantTable.determinantTable,
            'determinantColumn': determinantTable.determinantColumn,
            'subsFlag': determinantTable.subsInd,
        }, {emitEvent: false});
        this.isFormModifiedStatus();
    }

    private getDeterminantValue(determinantValues: DeterminantValues) {
        this.cobOrderLiabilityForm.patchValue({
            'operator': determinantValues.searchSequence,
            'secDeterminantTable': determinantValues.secDeterminantTable,
            'secDeterminantColumn': determinantValues.secDeterminantColumn,
            'fromValue': determinantValues.valueFrom,
            'thruValue': determinantValues.valueThru
        });
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.cobOrderLiabilityForm = this.formBuilder.group({
            ruleOrder: ['', { disabled: true ,updateOn: 'blur', validators: [] }],
            ruleId: ['', {updateOn: 'blur', disabled: true, validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            actionCode: ['', {updateOn: 'blur', validators: [] }],
            searchSeq: ['', {updateOn: 'blur', validators: [] }],
            determinantTable: ['', {updateOn: 'blur', validators: [] }],
            determinantColumn: ['', {updateOn: 'blur', validators: [] }],
            subsFlag: ['', {updateOn: 'blur', validators: [] }],
            operator: ['', {updateOn: 'blur', validators: [] }],
            secDeterminantTable: ['', {updateOn: 'blur', validators: [] }],
            secDeterminantColumn: ['', {updateOn: 'blur', validators: [] }],
            fromValue: ['', {updateOn: 'blur', validators: [] }],
            thruValue: ['', {updateOn: 'blur', validators: [] }]

        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/COBOR_COB_Order_of_Liability.htm';
    }

    isFormModifiedStatus = () => {
        this.cobOrderLiabilityForm.valueChanges.subscribe(() => {
            this.formDataModifiedStatus = true;
        })
    };

    showPopupAlert(message: any, title: any) {
        let popUpMessage = new PopUpMessage(
            "popUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons.push(
            new PopUpMessageButton("Yes", "Yes", "", this.inProgress)
        );
        popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "Yes") {
                this.saveDynamicForm(null);
            } else if (resp.name === "No") {
                this.activeModal.close();
            } else if (resp.name === "Cancel") {

            }
        });
    }
}
