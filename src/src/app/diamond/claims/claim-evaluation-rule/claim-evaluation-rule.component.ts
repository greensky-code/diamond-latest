/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeterminantTablesService} from "../../../api-services/determinant-tables.service"
import {DeterminantRules, MemberMaster, MessageMasterDtl} from "../../../api-models/index"
import {DeterminantRulesService} from "../../../api-services/determinant-rules.service"
import {DeterminantValues} from "../../../api-models/index"
import {DeterminantValuesService} from "../../../api-services/determinant-values.service"
import {ClaimEvaluationRules} from "../../../api-models/index"
import {ClaimEvaluationRulesService} from "../../../api-services/claim-evaluation-rules.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {DeterminantTables} from "../../../api-models";
import {SecUser} from "../../../api-models";
import {ToastService} from "../../../shared/services/toast.service";
import {DddwDtlService, MessageMasterDtlService, SecUserService} from "../../../api-services";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {NgbToastType} from "ngb-toast";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {Menu, SearchModel} from "../../../shared/models/models";
import {ClaimEvaluationRuleLookup} from "../../../shared/lookup/claim-evaluation-rule-lookup";
import {
    CONSTANTS,
    getClaimDetailAuthProcRulesShortcutKeys,
    getClaimEvaluationRuleShortcutKeys
} from "../../../shared/services/shared.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {Router} from "@angular/router";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";

// Use the Component directive to define the ClaimEvaluationRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimevaluationrule',
    templateUrl: './claim-evaluation-rule.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DeterminantRulesService,
        DeterminantTablesService,
        DeterminantValuesService
    ]

})
export class ClaimEvaluationRuleComponent implements OnInit {
    claimEvaluationRuleForm: FormGroup;
    formValidation: FormValidation;

    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

    menu: Menu[] = [];

    @Input() winID?: string;
    @Input() showIcon: boolean = false;

    seqRuleId: any;

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    userTemplateId: string;
    public shortcuts: ShortcutInput[] = [];

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

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

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private router: Router,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private determinantTablesService: DeterminantTablesService,
        private determinantRulesService: DeterminantRulesService,
        private determinantValuesService: DeterminantValuesService,
        private claimEvaluationRulesService: ClaimEvaluationRulesService,
        private secUserService: SecUserService,
        private toastService: ToastService,
        private secColDetailService: SecColDetailService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,

    ) {
    }

    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Sequence",
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


    ngOnInit(): void {
        this.hasPermission();
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    private initializeComponentState(): void {
        this.menuInit();
        this.initializeDropDownValues();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimEvaluationRuleForm);
        this.createDataGrid();

        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
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
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
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
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Member Cob Verification Information',
                        'Member Cob Verification Information Permission'
                    );
                }
            }
        );
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimEvaluationRuleForm = this.formBuilder.group({
            claimType: ['Dental', {updateOn: 'blur', validators: []}],
            ruleOrderId: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}],
            activeRule: ['', {updateOn: 'blur', validators: []}],
            action: ['', {updateOn: 'blur', validators: []}],
            reasonCode: ['', {updateOn: 'blur', validators: []}],
            messageToOperator: ['', {updateOn: 'blur', validators: []}],
            sequence: ['', {updateOn: 'blur', validators: []}],
            determinantTable: ['', {updateOn: 'blur', validators: []}],
            determinantColumn: ['', {updateOn: 'blur', validators: []}],
            operator: ['', {updateOn: 'blur', validators: []}],
            fromValue: ['', {updateOn: 'blur', validators: []}],
            thruValue: ['', {updateOn: 'blur', validators: []}],
            timeframe: ['', {updateOn: 'blur', validators: []}],
            noPeriods: ['', {updateOn: 'blur', validators: []}],
            primary: ['', {updateOn: 'blur', validators: []}],
            provider: ['', {updateOn: 'blur', validators: []}],
            procedureCode: ['', {updateOn: 'blur', validators: []}],
            benefitsPackage: ['', {updateOn: 'blur', validators: []}],
            medicalDefinitions: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    loadGrids() {
        this.determinantRulesService
            .getDeterminantRulesBySeqIdKeyword(
                this.seqRuleId,
                "CERUL"
            )
            .subscribe(
                (determinantRules: DeterminantRules) => {
                    let data = determinantRules;

                    console.log(data);

                    this.claimEvaluationRuleForm.patchValue({description: data.description});
                    this.claimEvaluationRuleForm.patchValue({activeRule: data.activeFlag == 'Y'});
                    this.claimEvaluationRuleForm.patchValue({action: this.actionMap.get(data.actionCode)});
                    this.claimEvaluationRuleForm.patchValue({reasonCode: data.reasonCode});
                    this.claimEvaluationRuleForm.patchValue({messageToOperator: data.resultValue1});


                }
            );

        this.determinantTablesService
            .getDeterminantTablesBySeqRuleId(this.seqRuleId)
            .subscribe(
                (determinantTables: DeterminantTables[]) => {
                    let data = determinantTables;

                    console.log(data);

                    this.dataGridGridOptions.api.setRowData(data);
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }
            );

    }

    searchStatus: boolean = false;
    keyNames: string = "subscriber_id";
    keyValues: any;

    provider: string;
    procedureCode: string;
    benefitPackage: string;

    onSelectionChanged(event: any) {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.searchStatus = true;
            this.keyValues = selectedRows[0].seqSubsId;
        } else {
            this.keyValues = "";
            this.searchStatus = false;
        }

        this.claimEvaluationRuleForm.patchValue({sequence: selectedRows[0].determinantTablesPrimaryKey.searchSequence});
        this.claimEvaluationRuleForm.patchValue({determinantTable: selectedRows[0].determinantTable});
        this.claimEvaluationRuleForm.patchValue({determinantColumn: selectedRows[0].determinantColumn});

        this.determinantValuesService.getDeterminantValuesByRuleIdAndSearchSeq
        (selectedRows[0].determinantTablesPrimaryKey.seqRuleId, selectedRows[0].determinantTablesPrimaryKey.searchSequence)
            .subscribe(
                (determinantValues: DeterminantValues[]) => {
                    if (determinantValues != null) {
                        let data = determinantValues[0];
                        this.claimEvaluationRuleForm.patchValue({operator: this.operatorMap.get(data.operator)});
                        this.claimEvaluationRuleForm.patchValue({fromValue: data.valueFrom});
                        this.claimEvaluationRuleForm.patchValue({thruValue: data.valueThru});
                    } else {
                        this.claimEvaluationRuleForm.patchValue({operator: null});
                        this.claimEvaluationRuleForm.patchValue({fromValue: null});
                        this.claimEvaluationRuleForm.patchValue({thruValue: null});
                    }
                }
            );

        this.claimEvaluationRulesService.getClaimEvaluationRules(selectedRows[0].determinantTablesPrimaryKey.seqRuleId)
            .subscribe(
                (claimEvaluationRules: ClaimEvaluationRules) => {
                    if (claimEvaluationRules != null) {
                        let data = claimEvaluationRules;

                        this.claimEvaluationRuleForm.patchValue({timeframe: this.timeframeMap.get(data.timeframe)});
                        this.claimEvaluationRuleForm.patchValue({noPeriods: data.timeUnits});
                        this.claimEvaluationRuleForm.patchValue({primary: this.primaryMap.get(data.primaryMatch)});
                        this.claimEvaluationRuleForm.patchValue({provider: (data.provider == 'E' || data.provider == 'A')});
                        this.provider = data.provider;

                        this.claimEvaluationRuleForm.patchValue({procedureCode: (data.procedureCode == 'E' || data.provider == 'A')});
                        this.procedureCode = data.procedureCode;

                        this.claimEvaluationRuleForm.patchValue({benefitsPackage: (data.benefitPackage == 'E' || data.provider == 'A')});
                        this.benefitPackage = data.benefitPackage;

                        this.claimEvaluationRuleForm.patchValue({medicalDefinitions: this.medicalDefinitionMap.get(data.medicalDefinitions)});


                    }
                }
            );
    }

    private primaryMap = new Map<string, string>();
    private timeframeMap = new Map<string, string>();
    private operatorMap = new Map<string, string>();
    private actionMap = new Map<string, string>();
    private medicalDefinitionMap = new Map<string, string>();

    initializeDropDownValues() {
        this.primaryMap.set('A', 'Arch');
        this.primaryMap.set('N', 'None');
        this.primaryMap.set('Q', 'Quadrant');
        this.primaryMap.set('T', 'Tooth No.');

        this.timeframeMap.set('C', 'Contract Period');
        this.timeframeMap.set('D', 'Elapsed Days');
        this.timeframeMap.set('E', 'Elapsed Years');
        this.timeframeMap.set('L', 'Lifetime');
        this.timeframeMap.set('Y', 'Calendar Year');

        this.operatorMap.set('EQ', 'EQ - Equal');
        this.operatorMap.set('NOT', 'NOT - Not Equal');

        this.actionMap.set('D', 'D - Deny');
        this.actionMap.set('H', 'H - Hold');
        this.actionMap.set('W', 'W - Warn');

        this.medicalDefinitionMap.set('N', 'None');
        this.medicalDefinitionMap.set('A', 'All');
        this.medicalDefinitionMap.set('E', 'Exact');
        this.medicalDefinitionMap.set('S', 'Some');
    }

    onLookupFieldChange(event) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupPage();
        }
    }

    searchModel = new SearchModel(
        'claimevaluationruleses/lookup',
        ClaimEvaluationRuleLookup.CLAIM_EVALUATION_RULE_ALL,
        ClaimEvaluationRuleLookup.CLAIM_EVALUATION_RULE_DEFAULT,
        []);

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            // TODO got response in `resp` field
            // TODO need to update in form
            this.claimEvaluationRuleForm.patchValue({
                ruleOrderId: resp.RULE_ORDER
            });
            this.claimEvaluationRuleForm.patchValue({claimType: 'Dental'});

            this.seqRuleId = resp.SEQ_RULE_ID;

            this.loadGrids();
        });
    }

    menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Save"},
                    {name: "Close"},
                    {name: "-"},
                    {name: "Main Menu"},
                    {name: "Shortcut Menu"},
                    {isHorizontal: true},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit"},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", disabled: true},
                    {name: "Copy", disabled: true},
                    {name: "Paste", disabled: true},
                    {isHorizontal: true},
                    {name: "Next"},
                    {name: "Previous"},
                    {isHorizontal: true},
                    {name: "Lookup"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Rule Order Lookup"},
                    // { name: "Additional Provider Codes" },
                    // { name: "Additional Procedure Codes" },
                    // { name: "Additional Benefit Package Codes" },
                    // { name: "Additional Medical Definitions" }
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile"},
                    {name: "Layer"},
                    {name: "Cascade"},
                    {name: "Arrange Icons"},
                    {isHorizontal: true},
                    {name: "Show Timestamp"},
                    {name: "Audit Display"},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Member Medicare + Choice History"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window"},
                    {isHorizontal: true},
                    {name: "Glossary"},
                    {name: "Getting Started"},
                    {name: "How to use Help"},
                    {isHorizontal: true},
                    {name: "About Diamond Client/Server"},
                ],
            },
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "Special") {
            // handle File actions
            switch (event.action) {
                case "Rule Order Lookup": {
                    this.openLookupPage();
                    break;
                }
                // case "Additional Provider Codes": {
                //     break;
                // }
                // case "Additional Procedure Codes": {
                //     break;
                // }
                // case "Additional Benefit Package Codes": {
                //     break;
                // }
                // case "Additional Medical Definitions": {
                //     break;
                // }
                default: {
                    this.toastService.showToast(
                        "Action is in progress",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(
                            CONSTANTS.F_AUDIT,
                            this.winID
                        );
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: "lg",
                            });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
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

                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */

            this.helpScreen();
        }

        else {
            // handle Edit-Menu Actions
            this.toastService.showToast("Action is in progress", NgbToastType.Danger);
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimEvaluationRuleShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CERUL_Claim_Evaluation_Rules.htm'
    }
}
