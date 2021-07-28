import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit, QueryList,
    Renderer2,
    ViewChild, ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import {
    CONSTANTS,
    getBenefitRuleShortcutKeys,
    SharedService
} from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { BenefitRuleService } from '../../../api-services/benefit-rule.service';
import { Menu, OPERATIONS, SearchModel } from '../../../shared/models/models';
import { BenefitRule } from '../../../api-models/benefit-rule.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitRuleSelectionComponent } from '../benefit-rule-selection/benefit-rule-selection.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { BenefitRuleLookup } from '../../../shared/lookup/benefit-rule-lookup';
import { DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService, SecUserService } from '../../../api-services';
import { BenefitRuleSelect } from '../../../api-models/benefit-rule-select.model';
import { NGBModalOptions } from '../../../shared/config';
import { RequiredValidator } from '../../../shared/validators/required.validator';
import { MessageMasterDtl, ReasonCodeMaster, SecUser } from '../../../api-models';
import { Router } from '@angular/router';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { BENEFIT_RULE_MODULE_ID } from '../../../shared/app-constants';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { BenefitsHelpComponent } from '../benefits-help/benefits-help.component';
import { BenefitRuleSelectionService } from '../../../api-services/benefit-rule-selection.service';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { isNumeric } from "rxjs/util/isNumeric";
import { MenuService } from '../../../shared/services/menu.service';
import { MenuResponse } from '../../../api-models/menu-response';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { AuditService } from '../../../shared/services/audit.service';
import {includes} from "ag-grid-community/dist/lib/utils/array";
import {of} from "rxjs";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the BenefitRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'app-benefit-rule',
    templateUrl: './benefit-rule.component.html',
    styleUrls: ['./benefit-rule.component.scss'],
    //providers: [Mask]
})
export class BenefitRuleComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    benefitRuleForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    rowSelected: boolean = false;
    benefitRules: BenefitRule[] = [];
    public menu: Menu[] = [];
    popUpMessage: PopUpMessage;
    dataGridGridOptions: GridOptions;
    benefitRuleSelect: BenefitRuleSelect[] = null;

    timeFrames: any[] = [];
    carryOvers: any[] = [];
    memberFamilies: any[] = [];
    renewals: any[] = [];
    froms: any[] = [];
    claimTypes: any[] = [];
    limitTypes: any[] = [];
    dataGridgridApi: any;
    dataGridgridColumnApi: any;
    medDefReference: any = null;

    editBenefitRule = true;
    benefitRule: BenefitRule;

    ruleTypes: any = null;

    selectedRuleType = '00';
    screenCloseRequest: Boolean = false;
    valueChanged: Boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @Input() showIcon: boolean = false;
    shortcuts: ShortcutInput[] = [];
    searchModel = new SearchModel('benefitrules/lookup', BenefitRuleLookup.BENEFIT_RULE_ALL, BenefitRuleLookup.BENEFIT_RULE_DEFAULT, []);
    @Input() winID?: string;
    @ViewChild('shortDesc') shortDesc: ElementRef;
    @ViewChild('ruleId') private ruleIdElem: ElementRef;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    shortcutsInput: ShortcutInput[] = [];
    reasonCodeValues = new Array<ReasonCodeMaster>();
    filteredReasonCode = new Array<ReasonCodeMaster>();
    filteredReasonCodeValue = new Array<ReasonCodeMaster>();
    isBenefitRuleSelection = false;
    benefitRuleSelections: any = [];

    // Use constructor injection to inject an instance of a FormBuilder
    searchStatus: boolean = false;
    keyNames: string = "rule_id";
    keyValues: any;
    selectedReasonCode: any = null;

    secWin: SecWinViewModel;
    windowId = 'BRULE';
    userTemplateId: string;
    memberModuleId = BENEFIT_RULE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    insertDateTime: any;
    insertUser: any;
    insertProcess: any;
    updateDateTime: any;
    updateUser: any;
    updateProcess: any;
    reasonCodeFetched = false;

    @ViewChild('ruleIdField') ruleIdField: any;
    @ViewChild('typeField') typeField: any;
    updateMedDefPopup: BenefitRuleSelect[];
    mandatoryStatus: Boolean = false;
    actionDiv: any;
    multiplyByQuantityDisplayStatus: boolean = true;
    twoDigitalMaskStatus: boolean = true;

    menuOpened = ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;

    constructor(
        private auditService:AuditService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private toastr: ToastService,
        private toast: ToastService,
        public activeModal: NgbActiveModal,
        private benefitRuleService: BenefitRuleService,
        private alertMessageService: AlertMessageService,
        private modalService: NgbModal,
        private dddwDtlService: DddwDtlService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private benefitRuleSelectionService: BenefitRuleSelectionService,
        private secUserService: SecUserService,
        private sharedService: SharedService,
        private renderer: Renderer2,
        private menuSerrvice: MenuService,
    ) {
 

    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState() {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.benefitRuleForm);
        this.createDataGrid();
        this.menuInit();

        this.getRuleTypes();
        this.getReasonCodeValues();
        this.getTimeFrames();
        this.getCarryOvers();
        this.getMemberFamilies();
        this.getRenewals();
        this.getFroms();
        this.getClaimTypes();
        this.getLimitTypes();

        const interval = setInterval(() => {
            if (this.reasonCodeFetched) {
                this.populateBenefitRule();
                clearInterval(interval);
                this.secProgress = false;
            }
        }, 1000);
    }
    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {

        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

        if (this.isSuperUser) {
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

                    //Check Menus Privilege Start 
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End 

                } else {
                    this.secProgress = false;
                    this.showPopUp(
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            }
        );
    }
    disableMenu() {
        if (this.userTemplateId == "UT_VIEW") {
            this.menu[0]["dropdownItems"][0].disabled = true;
            this.menu[0]["dropdownItems"][2].disabled = true;
            this.menu[0]["dropdownItems"][3].disabled = true;
        }
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('BENEFIT_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    getReasonCodeValues() {
        this.reasonCodeMasterService.getReasonCodeMasters().subscribe(resp => {
            resp.sort((a, b) => (a.reasonCode > b.reasonCode) ? 1 : ((b.reasonCode > a.reasonCode) ? -1 : 0));
            this.reasonCodeValues = resp;
            this.reasonCodeFetched = true;
            this.setReasonCodeDefaultValue();
        })
    }


    setReasonCodeDefaultValue() {
        let defaultValue = this.reasonCodeValues.length > 0 ? this.reasonCodeValues.find(value => value.reasonCode === 'CP001') : null;
        this.selectedReasonCode = defaultValue.reasonCode;
        this.benefitRuleForm.patchValue({ 'reasonCode': null }, { emitEvent: false });
        this.benefitRuleForm.patchValue({ 'holdReasonCode': null }, { emitEvent: false });
        if ((this.filteredReasonCode.length > 0)) {
            this.filteredReasonCodeValue = this.filteredReasonCode;
        } else {
            this.filteredReasonCodeValue = this.reasonCodeValues;
            this.filterReasonCodes(this.benefitRule && this.benefitRule.ruleType? this.benefitRule.ruleType: '00');
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getBenefitRuleShortcutKeys(this));


        this.cdr.detectChanges();
    }

    public popUpButtonHandler(button: any) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    openLookupPage() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            this.populateBenefitRuleData(resp);
        })
    }


    getRuleTypes() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.RULE_TYPE, CONSTANTS.DW_BRULE_DE).subscribe(resp => {
            this.ruleTypes = resp;
            let defaultType = this.ruleTypes.length > 0 ? this.ruleTypes.find((type: any) => type.dddwDtlPrimaryKey.dataVal == '00') : null;

            this.benefitRuleForm.patchValue({ 'ruleType': defaultType.dddwDtlPrimaryKey.dataVal }, { emitEvent: false });
            this.valueChanged = false;
        });
    }

    populateBenefitRule() {
        this.benefitRuleService.getBenefitRules().subscribe(benefitRules => {
            this.benefitRules = benefitRules;
            this.dataGridGridOptions.api.setRowData(benefitRules);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
            this.searchStatus = true;
            this.keyValues = this.benefitRules[0].ruleId;

        }, error => {
            this.searchStatus = false;
            this.keyValues = "";
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

    onRuleIdFieldChange(event: any) {
        if (event.key === 'Tab') {
            // event.preventDefault();
            this.getBenefitRuleById(event.target.value);
        }
    }

    getBenefitRuleById(ruleId: any) {
        // const currentRuleId = this.benefitRuleForm.value.ruleId ? this.benefitRuleForm.value.ruleId : this.benefitRule.ruleId;
        if (!this.editBenefitRule) {
            if (!ruleId || ruleId.length === 0) {
                this.messageService.findByMessageId(27013).subscribe((message: MessageMasterDtl[]) => {
                    this.showErrorMessage('27013: ' + message[0].messageText, 'Benefit Rule');
                    this.ruleIdField.nativeElement.focus();
                    return;
                });
            }
            this.benefitRuleService.getBenefitRule(ruleId).subscribe((resp: BenefitRule) => {
                if (resp) {
                    this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                        this.showErrorMessage('7109: ' + message[0].messageText, 'Benefit Rule');
                        this.ruleIdField.nativeElement.focus();
                    });
                }
                // this.benefitRule = resp;
                // this.populateBenefitRuleData(resp);
            }, error => this.typeField.nativeElement.focus());
        }
    }

    onRowSelected(event: any) {
        if (!event.node.selected) {
            this.searchStatus = false;
            return;
        }
        this.rowSelected = true;
        this.updateMedDefPopup = [];
        this.benefitRule = event.data;
        this.benefitRuleForm.controls['ruleId'].disable();
        this.benefitRuleForm.controls['ruleType'].disable();
        this.benefitRuleForm.controls['medDefFilter'].disable();
        this.benefitRuleForm.controls['otherMedDefinitions'].disable();
        this.benefitRuleForm.controls['countTowardMax'].disable();
        this.populateBenefitRuleData(event.data)
        this.benefitRuleSelections = [];

        //this.getBenefitRuleSelectionByRuleIdAndColumnNameAndColumnOccurence(this.benefitRuleForm.getRawValue().ruleId, 'med_def_filter', 1);
    }

    getBenefitRuleSelectionByRuleIdAndColumnNameAndColumnOccurence(ruleId: any, columnName: any, columnOccurrence: any) {
        this.benefitRuleSelectionService.getBenefitRuleSelectionByRuleIdAndColumnNameAndColumnOccurence(ruleId,
            columnName, columnOccurrence).subscribe((res: any) => {
                this.benefitRuleSelections = res;
                this.isBenefitRuleSelection = (res && res.length > 0);
            });
    }

    populateBenefitRuleData(benefitRuleData: BenefitRule) {
        this.selectedRuleType = benefitRuleData.ruleType;
        this.keyValues = benefitRuleData.ruleId;
        let rowIndex;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            node.setSelected(node.data.ruleId === benefitRuleData.ruleId);
            if (node.isSelected()) {
                rowIndex = node.rowIndex;
            }
        });
        this.dataGridGridOptions.api.ensureIndexVisible(rowIndex);

        if (this.reasonCodeValues) {
            this.filterReasonCodes(benefitRuleData.ruleType);
        }

        this.benefitRuleSelectionService.getMedDefStatuses(benefitRuleData.ruleId).subscribe(medDefStatus => {
            this.benefitRuleForm.patchValue({
                medDefFilter: medDefStatus.med_def_filter,
                otherMedDefinitions: medDefStatus.other_med_def_code,
                countTowardMax: medDefStatus.reason_code,
            });
        });
        let reasonCodeData = this.filteredReasonCode.filter(item => {
            return item.reasonCode === benefitRuleData.attributeChar13 ? benefitRuleData.attributeChar13 : '';
        });
        this.benefitRuleForm.patchValue({
            ruleId: benefitRuleData.ruleId,
            ruleType: benefitRuleData.ruleType,
            narrative: benefitRuleData.narrative,
            shortDescription: benefitRuleData.shortDescription,
            holdReasonCode: benefitRuleData.attributeChar13,
            message: benefitRuleData.attributeChar10,
            limitType: benefitRuleData.attributeChar5,
            amount: benefitRuleData.attributeNum1,
            reasonCode: reasonCodeData.length > 0 ? reasonCodeData[0].reasonCode : '',
            timeFrame: benefitRuleData.attributeChar14,
            timeFrameNoYearsDays: benefitRuleData.attributeNum6,
            carryOverNoYearsDays: benefitRuleData.attributeNum7,
            claimType: benefitRuleData.attributeChar2,
            carryOver: benefitRuleData.attributeChar1,
            memberOrFamily: benefitRuleData.attributeChar4,
            renewal: benefitRuleData.attributeChar9,
            renewalDate: benefitRuleData.attributeNum8,
            renewalFrom: benefitRuleData.attributeChar7,
            maxOutOfPocketAmount: benefitRuleData.attributeNum1,
            //   perAdmitDeductible: benefitRuleData.,      //TODO need to check mapping for [perAdmitDeductible], .... and [allGroup checkbox], --- [childrenCountIndividual]
            individualDeductible: benefitRuleData.attributeNum1,
            familyDeductible: benefitRuleData.attributeNum2,
            //  perProvider: benefitRuleData.,          // TODO need to check for mapping
            // multiplyByQuantity: benefitRuleData.,  //    TODO need to check for mapping, and logic behind quantity
            copayAmount: benefitRuleData.attributeNum1,
            quantityGreaterOrEq: benefitRuleData.attributeNum2,
            quantitylessAndEq: benefitRuleData.attributeNum3,
            maximumCopay: benefitRuleData.attributeNum4,
            coinsurePercnt: benefitRuleData.attributeNum1 ? benefitRuleData.attributeNum1 : "0.",
            maxCoins: benefitRuleData.attributeNum2 ? benefitRuleData.attributeNum2 : ".00",
            allGroup: (benefitRuleData.attributeChar3 === 'Y') ? benefitRuleData.attributeChar3 : null,
            childrenCountIndividual: (benefitRuleData.attributeChar6 === 'Y') ? benefitRuleData.attributeChar6 : null,
            perAdmitDeductible: (benefitRuleData.attributeChar5 === 'Y') ? benefitRuleData.attributeChar5 : null,
            perProvider: (benefitRuleData.attributeChar11 === 'Y') ? benefitRuleData.attributeChar11 : null,
            multiplyByQuantity: (benefitRuleData.multiplyByQty === 'Y') ? benefitRuleData.multiplyByQty : null,
        }, { emitEvent: false });
        this.selectedReasonCode = benefitRuleData.attributeChar13;

        this.handleValidation(benefitRuleData.ruleType);
        this.insertDateTime = benefitRuleData.insertDatetime;
        this.insertUser = benefitRuleData.insertUser;
        this.insertProcess = benefitRuleData.insertProcess;
        this.updateDateTime = benefitRuleData.updateDatetime;
        this.updateUser = benefitRuleData.updateUser;
        this.updateProcess = benefitRuleData.updateProcess;
        this.valueChanged = false;
        setTimeout(() => {
            this.isFormDataModified();
        }, 2000)
    }

    public dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {

        }
        if (button.name === 'no') {

        }
    }

    private createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.accentedSort = true
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Rule ID',
                field: 'ruleId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                sort: 'asc',
                sortingOrder: ['asc', 'desc']
            },
            {
                headerName: 'Type',
                field: 'ruleType',
                width: 100
            },
            {
                headerName: 'Short Description',
                field: 'shortDescription',
                width: 200
            }
        ];
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.benefitRuleForm = this.formBuilder.group({
            ruleId: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(10), RequiredValidator.cannotContainSpace])] }],
            ruleType: ['', { validators: [Validators.compose([Validators.required])] }],
            shortDescription: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(20), RequiredValidator.cannotContainSpace])] }],
            medDefFilter: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(60), RequiredValidator.cannotContainSpace])] }],
            narrative: ['', { validators: [Validators.compose([Validators.maxLength(240)])] }],
            holdReasonCode: ['', { validators: [Validators.compose([Validators.maxLength(10)])] }],                            // attr-char 13
            message: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],
            limitType: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(50), RequiredValidator.cannotContainSpace])] }],                                  // attr char 5
            amount: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],               // attr - num1
            reasonCode: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(10), RequiredValidator.cannotContainSpace])] }],                                  // attr-char 13
            timeFrame: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(25), RequiredValidator.cannotContainSpace])] }],                                  // attr-char 14
            timeFrameNoYearsDays: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],       // attr-num 6
            carryOverNoYearsDays: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],   // attr num 7
            claimType: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(10), RequiredValidator.cannotContainSpace])] }],                                     // attr-char 2
            carryOver: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(10), RequiredValidator.cannotContainSpace])] }],                                  // attr-char 1
            allGroup: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],
            memberOrFamily: ['', { validators: [Validators.required, Validators.compose([Validators.maxLength(25)]), RequiredValidator.cannotContainSpace] }],                             //   attr-char 4
            isAllGroups: ['', { validators: [] }],
            renewal: ['', { validators: [Validators.compose([Validators.maxLength(25)])] }],                                     // attr-char_9
            renewalDate: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // attr-num_8
            renewalFrom: ['', { validators: [Validators.compose([Validators.maxLength(10)])] }],                                   // attr-char_7
            maxOutOfPocketAmount: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // attr-num_1
            perAdmitDeductible: ['', {}],     // unknown checkbox
            individualDeductible: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // attr-num_1
            familyDeductible: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // attr-num_2

            otherMedDefinitions: ['', { validators: [Validators.compose([Validators.maxLength(60)])] }],     // unknown
            childrenCountIndividual: ['', {}],     // unknown checkbox mapping
            perProvider: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // unknown checkbox mapping for selected type = 20
            multiplyByQuantity: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // unknown checkbox mapping for selected type = 20
            countTowardMax: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // unknown checkbox mapping for selected type = 20

            // for rule type 00
            copayAmount: ['', { validators: [ Validators.compose([Validators.maxLength(50)])] }],     // attr num-1
            quantityGreaterOrEq: ['', { validators: [Validators.pattern('^[0-9]*$'), Validators.compose([Validators.maxLength(50)])] }],     // attr-num-2
            quantitylessAndEq: ['', { validators: [Validators.pattern('^[0-9]*$'), Validators.compose([Validators.maxLength(50)])] }],     // attr num-3
            maximumCopay: ['', { validators: [Validators.compose([Validators.maxLength(50)])] }],     // attr-num-4

            // for rule type = 10
            coinsurePercnt: ['', { validators: [Validators.pattern('^[0-9.]*$'), Validators.compose([Validators.maxLength(4)])] }],     // attr-num-1
            maxCoins: ['', { validators: [Validators.pattern('^[0-9.]*$'), Validators.compose([Validators.maxLength(50)])] }],     // attr-num-2


        });
    }

    onChangeTimeFrame(event: any) {
        if (event.target.value === 'L') {
            let controls = this.benefitRuleForm.get('timeFrameNoYearsDays');
            controls.setValidators([]);
            controls.updateValueAndValidity();
            this.benefitRuleForm.get('timeFrameNoYearsDays').setValue(1);
        } else {
            let controls = this.benefitRuleForm.get('timeFrameNoYearsDays');
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        }
    }

    onChangeCarryOver(event: any) {
        if (event.target.value === 'N') {
            let controls = this.benefitRuleForm.get('carryOverNoYearsDays');
            controls.setValidators([]);
            controls.updateValueAndValidity();
            this.benefitRuleForm.get('carryOverNoYearsDays').setValue(0);
        } else {
            let controls = this.benefitRuleForm.get('carryOverNoYearsDays');
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        }
    }

    resolved(captchaResponse: string) {

    }


    updateBenefitRule() {
        this.formValidation.validateForm();
        if (this.benefitRuleForm.valid) {
            this.benefitRuleForm.controls['ruleId'].enable();
            this.benefitRuleForm.controls['ruleType'].enable();
            this.benefitRuleForm.controls['medDefFilter'].enable();
            let benefitRule = this.getBenefitRuleFormData();

            this.benefitRuleForm.controls['ruleId'].disable();
            this.benefitRuleForm.controls['ruleType'].disable();
            this.benefitRuleForm.controls['medDefFilter'].disable();
             this.auditService.setAuditFields(
               benefitRule,
               sessionStorage.getItem("user"),
               this.windowId,
               OPERATIONS.UPDATE
             );
            this.benefitRuleService.updateBenefitRule(benefitRule, benefitRule.ruleId).subscribe(response => {
                if (this.benefitRuleSelections.length > 0) {
                    this.benefitRuleSelectionService
                        .updateBenefitSelectRecords(this.benefitRuleSelections)
                        .subscribe((resp) => {
                            this.toastr.showToast(
                                "Med def entry updates Successfully",
                                NgbToastType.Success
                            );
                        
                        });
                }
                if (this.benefitRuleSelect) {
                    this.benefitRuleSelectionService.updateBenefitSelectRecords(this.benefitRuleSelect).subscribe((resp) => {
                        this.benefitRuleSelect = null;
                        this.toastr.showToast('Benfit Rule Record successfully updated.', NgbToastType.Success);
                    });
                } else {
                    this.toastr.showToast('Benfit Rule Record successfully updated.', NgbToastType.Success);
                }
                this.valueChanged = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                else{
                     setTimeout(() => {
                this.populateBenefitRule();
                 });
                }
            });
        } else {
            this.toastr.showToast('Form is Invalid', NgbToastType.Danger)
        }
    }

    getBenefitRuleFormData(): BenefitRule {
        let benefitRule = new BenefitRule();
        this.benefitRuleForm.controls['medDefFilter'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['otherMedDefinitions'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['countTowardMax'].enable();

        benefitRule.ruleId = this.benefitRuleForm.getRawValue().ruleId ? this.benefitRuleForm.getRawValue().ruleId.toUpperCase() : this.benefitRuleForm.getRawValue().ruleId;
        benefitRule.ruleType = this.benefitRuleForm.getRawValue().ruleType;
        benefitRule.shortDescription = this.benefitRuleForm.getRawValue().shortDescription ? this.benefitRuleForm.getRawValue().shortDescription.toUpperCase() : this.benefitRuleForm.getRawValue().shortDescription;
        benefitRule.narrative = this.benefitRuleForm.getRawValue().narrative;
        benefitRule.medDefFilter = this.benefitRuleForm.getRawValue().medDefFilter;
        benefitRule.attributeChar13 = this.selectedReasonCode; // this.benefitRuleForm.value.reasonCode;

        benefitRule.attributeChar14 = this.benefitRuleForm.getRawValue().timeFrame;
        benefitRule.attributeChar1 = this.benefitRuleForm.getRawValue().carryOver;
        benefitRule.attributeChar2 = this.benefitRuleForm.getRawValue().claimType;
        benefitRule.attributeChar4 = this.benefitRuleForm.getRawValue().memberOrFamily;
        benefitRule.attributeNum7 = this.benefitRuleForm.getRawValue().carryOverNoYearsDays;
        benefitRule.attributeNum6 = this.benefitRuleForm.getRawValue().timeFrameNoYearsDays;
        benefitRule.attributeChar3 = (this.benefitRuleForm.getRawValue().allGroup === 'Y' ? this.benefitRuleForm.getRawValue().allGroup : 'N');
        benefitRule.attributeChar6 = (this.benefitRuleForm.getRawValue().childrenCountIndividual === 'Y' ? this.benefitRuleForm.getRawValue().childrenCountIndividual : 'N');
        benefitRule.attributeChar5 = (this.benefitRuleForm.getRawValue().perAdmitDeductible === 'Y' ? this.benefitRuleForm.getRawValue().perAdmitDeductible : 'N');
        benefitRule.attributeChar11 = (this.benefitRuleForm.getRawValue().perProvider === 'Y' ? this.benefitRuleForm.getRawValue().perProvider : 'N');
        benefitRule.multiplyByQty = (this.benefitRuleForm.getRawValue().multiplyByQuantity === 'Y' ? this.benefitRuleForm.getRawValue().multiplyByQuantity : 'N');
        benefitRule.attributeChar13 = this.selectedReasonCode // this.benefitRuleForm.value.holdReasonCode;

        benefitRule.attributeChar10 = this.benefitRuleForm.getRawValue().message;
        benefitRule.attributeChar5 = this.benefitRuleForm.getRawValue().limitType;
        benefitRule.attributeNum1 = this.benefitRuleForm.getRawValue().amount;
        benefitRule.attributeChar3 = this.benefitRuleForm.getRawValue().allGroup === true ? 'Y' : 'N';
        benefitRule.attributeChar11 = this.benefitRuleForm.getRawValue().perProvider === true ? 'Y': 'N';
        if (
          this.selectedRuleType === "80" ||
          (this.selectedRuleType === "20" &&
            this.benefitRuleForm.get('amount').value!=null)
        ) {
          benefitRule.attributeNum1 = parseFloat(
            this.benefitRuleForm
              .getRawValue()
              .amount.toString()
              .replace(/\$|,/g, "")
          );
        }

        benefitRule.attributeChar9 = this.benefitRuleForm.getRawValue().renewal;
        benefitRule.attributeNum8 = this.benefitRuleForm.getRawValue().renewalDate;
        benefitRule.attributeChar7 = this.benefitRuleForm.getRawValue().renewalFrom;
        if (
          this.selectedRuleType === "40" &&
          this.benefitRuleForm.get('maxOutOfPocketAmount').value
        !=null) {
          benefitRule.attributeNum1 = parseFloat(this.benefitRuleForm
              .getRawValue()
              .maxOutOfPocketAmount.replace(/\$|,/g, "")
          );
        }
        if (this.selectedRuleType === '30') {
            const individualDeductible = this.benefitRuleForm.getRawValue().individualDeductible;

            if (individualDeductible) {
                benefitRule.attributeNum1 = parseFloat(individualDeductible.toString().replace(/\$|,/g, ''));
            }
            const familyDeductible =  this.benefitRuleForm.getRawValue().familyDeductible;
            if (familyDeductible) {
                benefitRule.attributeNum2 = parseFloat(familyDeductible.toString().replace(/\$|,/g, ""));
            }
        }

        if (
          this.selectedRuleType === "00" &&
          this.benefitRuleForm.get('copayAmount').value
        !=null) {
          benefitRule.attributeNum1 = parseFloat(
            this.benefitRuleForm.getRawValue().copayAmount.replace(/\$|,/g, "")
          );
          benefitRule.attributeNum2 =
            this.benefitRuleForm.getRawValue().quantityGreaterOrEq;
        }
        benefitRule.attributeNum3 = this.benefitRuleForm.getRawValue().quantitylessAndEq;
        if (
          this.benefitRuleForm.get("maximumCopay").value != null &&
          this.selectedRuleType === "00"
        ) {
          benefitRule.attributeNum4 = parseFloat(
            this.benefitRuleForm.getRawValue().maximumCopay.replace(/\$|,/g, "")
          );
        }
        if (this.selectedRuleType === '10') {
            benefitRule.attributeNum1 = this.benefitRuleForm.getRawValue().coinsurePercnt;
            benefitRule.attributeNum2 = this.benefitRuleForm.getRawValue().maxCoins;
            if (!benefitRule.attributeNum1) {
                benefitRule.attributeNum1 = 0;
                this.benefitRuleForm.get('coinsurePercnt').setValue('0.');
            }
            if (!benefitRule.attributeNum2) {
                benefitRule.attributeNum2 = .00;
                this.benefitRuleForm.get('maxCoins').setValue(".00");
            }
        }


        // TODO allGroup         ----------- check mapping for allGroup in benefitRule

        this.benefitRuleForm.controls['medDefFilter'].disable({ emitEvent: false });
        this.benefitRuleForm.controls['otherMedDefinitions'].disable({ emitEvent: false });
        this.benefitRuleForm.controls['countTowardMax'].disable();

        return benefitRule;
    }

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent);
        ref.componentInstance.showIcon = true;
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Delete', shortcutKey: 'Ctrl+D', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Save', shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true }, { name: 'Exit', shortcutKey: 'Alt+F4' }
                ]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true },
                    { name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true },
                    { name: 'Paste', shortcutKey: 'Ctrl+V', disabled: true },
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' },
                    { isHorizontal: true },
                    { name: 'Lookup', shortcutKey: 'F5' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'Med Def' }, { name: 'Count Toward Max' }, { name: 'Other Med Defs' }]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Audit Display', shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 User Defined Attribute' },
                    { name: '3 User Defined Attributes' },
                    { name: '4 Benefit Rule' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window', shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            switch (event.action) {
                case 'New': {
                    this.resetForm();
                    break;
                }
                case 'Open': {
                    break;
                }
                case 'Save': {
                    this.saveBenefitRule();
                    break;
                }
                case 'Delete': {
                    this.deletePopupAlert();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Shortcut Menu': {
                    this.openFunctionalGroupShortcut();
                    break;
                }
                case 'Main Menu': {
                    this.modalClose();
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
                    break;
                }
                case 'Print Setup': {
                    window.print();
                    break;
                }
                default: {
                    this.toastr.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            switch (event.action) {
                case 'Undo': {
                    //statements;
                    break;
                }
                case 'Cut': {
                    //statements;
                    break;
                }
                case 'Next': {
                    this.next();
                    break;
                }
                case 'Previous': {
                    this.previous();
                    break;
                }
                case 'Lookup': {
                    this.openLookupPage();
                    break;
                }
                default: {
                    this.toastr.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        }
        else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            const currentRuleId = this.benefitRuleForm.getRawValue().ruleId ?
                this.benefitRuleForm.getRawValue().ruleId : this.benefitRule.ruleId;
            if (!currentRuleId) {
                this.showPopUp('Rule ID is required', 'Benefit Rule');
                return;
            }
            this.handleSpecialMenu(event.action, currentRuleId);
        } else if (event.menu.menuItem === 'Window') {             // handle Windows Actions
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Audit Display': {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.winID);
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, { size: 'lg' });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.showErrorMessage("11073: " + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.showErrorMessage("30164: " + message[0].messageText);
                        });
                    }

                    break;
                }
                case 'Show Timestamp':
                    if (this.benefitRuleForm.get('ruleId').value) {
                        this.showTimeStamp()
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }


    /**
     * Handle Menu Actions for Special
     * @param action: string
     * @param currentRuleId
     */
    handleSpecialMenu(action: string, currentRuleId: any) {
        if (currentRuleId) {
            switch (action) {
                case 'Med Def': {
                    this.medDefReference = this.modalService.open(BenefitRuleSelectionComponent, NGBModalOptions);
                    this.medDefReference.componentInstance.columnName = 'Med Def Filter';
                    this.medDefReference.componentInstance.benefitRuleType = this.benefitRule.ruleType;
                    this.medDefReference.componentInstance.benefitRuleId = currentRuleId;
                    this.medDefReference.componentInstance.showIcon = true;
                    this.medDefReference.componentInstance.isEditState = this.editBenefitRule;
                    this.medDefReference.componentInstance.newAddedData = this.updateMedDefPopup;
                    this.medDefReference.componentInstance.secWin=this.secWin;
                    let benefitRuleSelect: BenefitRuleSelect[] = [];
                    this.medDefReference.componentInstance.onBenefitRule.subscribe((benefitRuleSelect: BenefitRuleSelect[]) => {

                        if (benefitRuleSelect[0]) {
                            this.getRecordsCountByColumnNameAndRuleId(benefitRuleSelect[0], "Med Def");
                            benefitRuleSelect = benefitRuleSelect;
                        } else {
                            this.benefitRuleForm.controls['medDefFilter'].enable();
                            this.benefitRuleForm.controls['medDefFilter'].setValue('All');
                            this.benefitRuleForm.controls['medDefFilter'].disable();
                            benefitRuleSelect = [];
                        }
                    });
                    this.medDefReference.result.then((response: any) => {
                        if (response == "OK") {
                            this.benefitRuleSelect = benefitRuleSelect;
                            this.isBenefitRuleSelection = true;
                        }
                    });
                    break;
                }
                case "Count Toward Max": {
                    let ref = this.modalService.open(BenefitRuleSelectionComponent, NGBModalOptions);
                    ref.componentInstance.columnName = 'Count Toward Max'
                    ref.componentInstance.benefitRuleId = currentRuleId
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.isEditState = this.editBenefitRule;
                    ref.componentInstance.secWin=this.secWin;
                    let benefitRuleSelect: BenefitRuleSelect[] = [];
                    ref.componentInstance.onBenefitRule.subscribe((benefitRuleSelect: BenefitRuleSelect[]) => {
                        if (benefitRuleSelect[0]) {
                            this.getRecordsCountByColumnNameAndRuleId(benefitRuleSelect[0], "Count Toward Max");
                            benefitRuleSelect = benefitRuleSelect;
                        } else {
                            this.benefitRuleForm.controls['countTowardMax'].enable();
                            this.benefitRuleForm.controls['countTowardMax'].setValue('All');
                            this.benefitRuleForm.controls['countTowardMax'].disable();
                            benefitRuleSelect = [];
                        }
                    });
                    this.medDefReference.result.then((response: any) => {
                        if (response == "OK") {
                            this.benefitRuleSelect = benefitRuleSelect;
                            this.isBenefitRuleSelection = true;
                        }
                    });
                    break;
                }
                case "Other Med Defs": {
                    let ref = this.modalService.open(BenefitRuleSelectionComponent, NGBModalOptions);
                    ref.componentInstance.columnName = 'Other Med Defs'
                    ref.componentInstance.benefitRuleId = currentRuleId;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.isEditState = this.editBenefitRule;
                    ref.componentInstance.secWin=this.secWin;
                    let benefitRuleSelect: BenefitRuleSelect[] = [];
                    ref.componentInstance.onBenefitRule.subscribe((benefitRuleSelect: BenefitRuleSelect) => {
                        if (benefitRuleSelect) {
                            this.getRecordsCountByColumnNameAndRuleId(benefitRuleSelect[0], "Other Med Defs");
                            benefitRuleSelect = benefitRuleSelect;
                        } else {
                            this.benefitRuleForm.controls['otherMedDefinitions'].enable();
                            this.benefitRuleForm.controls['otherMedDefinitions'].setValue('All');
                            this.benefitRuleForm.controls['otherMedDefinitions'].disable();
                            benefitRuleSelect = null;
                        }
                    });
                    this.medDefReference.result.then((response: any) => {
                        if (response == "OK") {
                            this.benefitRuleSelect = benefitRuleSelect;
                            this.isBenefitRuleSelection = true;
                        }
                    });
                    break;
                }
                default: {
                    this.toastr.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.showPopUp('Rule ID is required', 'Benefit Rule');
            return;
        }
    }

    getRecordsCountByColumnNameAndRuleId(benefitRuleSelect: BenefitRuleSelect, columnName: string) {
        this.benefitRuleSelectionService.getBenefitRuleSelectionByRuleIdAndColumnNameAndColumnOccurence(benefitRuleSelect.benefitRuleSelectPrimaryKey.ruleId, benefitRuleSelect.columnName, benefitRuleSelect.columnOccurrence).subscribe((benefitRuleSelect: BenefitRuleSelect[]) => {
            switch (columnName) {
                case 'Med Def':
                    {
                        if (benefitRuleSelect) {
                            this.benefitRuleForm.controls['medDefFilter'].enable();
                            this.benefitRuleForm.controls['medDefFilter'].setValue('Some');
                            this.benefitRuleForm.controls['medDefFilter'].disable();
                        } else {
                            this.benefitRuleForm.controls['medDefFilter'].enable();
                            this.benefitRuleForm.controls['medDefFilter'].setValue('All');
                            this.benefitRuleForm.controls['medDefFilter'].disable();
                        }
                        break;
                    }
                case 'Count Toward Max': {
                    if (benefitRuleSelect) {
                        this.benefitRuleForm.controls['countTowardMax'].enable();
                        this.benefitRuleForm.controls['countTowardMax'].setValue('Some');
                        this.benefitRuleForm.controls['countTowardMax'].disable();
                    } else {
                        this.benefitRuleForm.controls['countTowardMax'].enable();
                        this.benefitRuleForm.controls['countTowardMax'].setValue('All');
                        this.benefitRuleForm.controls['countTowardMax'].disable();
                    }
                    break;
                }
                case 'Other Med Defs': {
                    if (benefitRuleSelect) {
                        this.benefitRuleForm.controls['otherMedDefinitions'].enable();
                        this.benefitRuleForm.controls['otherMedDefinitions'].setValue('Some');
                        this.benefitRuleForm.controls['otherMedDefinitions'].disable();
                    } else {
                        this.benefitRuleForm.controls['otherMedDefinitions'].enable();
                        this.benefitRuleForm.controls['otherMedDefinitions'].setValue('All');
                        this.benefitRuleForm.controls['otherMedDefinitions'].disable();
                    }
                }

            }

        });
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

    onRuleTypeValueChange(event: any) {
        const type = event.target.value;
        this.handleRuleTypeChanges(type);
        this.handleValidation(type)
        this.filterReasonCodes(type);
        this.setReasonCodeDefaultValue();
    }

    private filterReasonCodes(type: any) {
        let reasonCodeType = 'CP';
        switch (type) {
            case '00': reasonCodeType = 'CP'; break;
            case '10': reasonCodeType = 'CP'; break;
            case '20': reasonCodeType = 'NC'; break;
            case '30': reasonCodeType = 'DD'; break;
            case '40': reasonCodeType = 'NC'; break;
            case '50': reasonCodeType = 'HD'; break;
            case '60': reasonCodeType = 'NC'; break;
            case '70': reasonCodeType = 'CP'; break;
            case '80': reasonCodeType = 'FC'; break;
            default: reasonCodeType = 'CP'; break;
        }
        this.filteredReasonCode = this.reasonCodeValues.filter(data => data.reasonCodeType === reasonCodeType);
        this.filteredReasonCodeValue = [...this.filteredReasonCode];
    }

    handleSingleFieldValidation(field: any, required: any) {
        if (required) {
            let controls = this.benefitRuleForm.get(field);
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        } else {
            let controls = this.benefitRuleForm.get(field);
            controls.setValidators([]);
            controls.updateValueAndValidity();
        }
    }

    handleValidation(type: any) {
        if (type === '00') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        } else if (type === '10') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        } else if (type === '20') {
            this.handleSingleFieldValidation('limitType', true);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        } else if (type === '30') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        } else if (type === '40') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        } else if (type === '50') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', false);
            this.handleSingleFieldValidation('claimType', false);
            this.handleSingleFieldValidation('carryOver', false);
            this.handleSingleFieldValidation('memberOrFamily', false);
        } else if (type === '60') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', false);
            this.handleSingleFieldValidation('claimType', false);
            this.handleSingleFieldValidation('carryOver', false);
            this.handleSingleFieldValidation('memberOrFamily', false);
        } else if (type === '70') {
            this.handleSingleFieldValidation('limitType', false);
            this.handleSingleFieldValidation('reasonCode', false);
            this.handleSingleFieldValidation('timeFrame', false);
            this.handleSingleFieldValidation('claimType', false);
            this.handleSingleFieldValidation('carryOver', false);
            this.handleSingleFieldValidation('memberOrFamily', false);
        } else if (type === '80') {
            this.handleSingleFieldValidation('limitType', true);
            this.handleSingleFieldValidation('reasonCode', true);
            this.handleSingleFieldValidation('timeFrame', true);
            this.handleSingleFieldValidation('claimType', true);
            this.handleSingleFieldValidation('carryOver', true);
            this.handleSingleFieldValidation('memberOrFamily', true);
        }
    }
    handleRuleTypeChanges(ruleType: string) {
        this.selectedRuleType = ruleType;
        this.benefitRule = this.getBenefitRuleFormData();
        if (ruleType == '30') {
            this.setDefaultValueOfRuleType30(this.benefitRule);
        } else if (ruleType == '80' || ruleType == '40') {
            this.setDefaultValueOfRuleType40And80(this.benefitRule);
        } else {
            this.setDefaultValueOfRuleType(this.benefitRule);
        }
    }


    resetForm() {
        if (this.isSuperUser) {
            this.createNewBenefitRule();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.createNewBenefitRule();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    createNewBenefitRule() {
        this.editBenefitRule = false;
        this.benefitRuleForm.controls['ruleId'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['ruleType'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['medDefFilter'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['otherMedDefinitions'].enable({ emitEvent: false });
        this.benefitRuleForm.controls['countTowardMax'].enable({ emitEvent: false });
        this.benefitRuleForm.reset();
        this.isBenefitRuleSelection = false;
        this.benefitRuleSelections = [];

        let defaultType = this.ruleTypes.length > 0 ? this.ruleTypes.find((type: any) => type.dddwDtlPrimaryKey.dataVal == '00') : null;
        this.handleValidation(defaultType);
        this.setDefaultValueOfRuleType(new BenefitRule());
        this.filterReasonCodes(defaultType.dddwDtlPrimaryKey.dataVal);
        this.benefitRuleForm.patchValue({
            'ruleType': defaultType.dddwDtlPrimaryKey.dataVal,
            'medDefFilter': 'All',
            'otherMedDefinitions': 'All',
            'countTowardMax': 'All',
        }, { emitEvent: false });
        this.handleRuleTypeChanges(defaultType.dddwDtlPrimaryKey.dataVal);
        this.setReasonCodeDefaultValue();
        this.benefitRule = this.getBenefitRuleFormData();
        this.benefitRuleForm.controls['medDefFilter'].disable({ emitEvent: false });
        this.benefitRuleForm.controls['otherMedDefinitions'].disable({ emitEvent: false });
        this.benefitRuleForm.controls['countTowardMax'].disable()
        this.valueChanged = false;
    }


    createBenefitRule() {
        this.formValidation.validateForm();
        const benefitRule = this.getBenefitRuleFormData();
        this.auditService.setAuditFields(
          benefitRule,
          sessionStorage.getItem("user"),
          this.windowId,
          OPERATIONS.ADD
        );
        if (this.benefitRuleForm.valid) {
            if (this.isBenefitRuleSelection === false) {
                this.messageService.findByMessageId(70169).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage(
                        'popUpMessageName',
                        'Benefit Rule',
                        '70169: ' + message[0].messageText,
                        'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                });
            } else {
                this.benefitRuleService.createBenefitRule(benefitRule).subscribe(response => {
                    this.benefitRules.push(benefitRule);
                    //this.dataGridGridOptions.api.setRowData(this.benefitRules);
                    this.toastr.showToast(
                        "Benefit Rule Record Created Successfully",
                        NgbToastType.Success
                    );
                    if (!this.editBenefitRule) {
                        if (this.benefitRuleSelections.length > 0) {
                            this.benefitRuleSelectionService
                                .updateBenefitSelectRecords(
                                    this.benefitRuleSelections
                                )
                                .subscribe((resp) => {
                                    this.toastr.showToast(
                                        "Med def entry created Successfully",
                                        NgbToastType.Success
                                    );

                                });
                        }

                    }
  
                    this.editBenefitRule = true;
                    this.valueChanged = false;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                    else{
                          setTimeout(() => {
                            this.populateBenefitRule();
                          });
                    }
                });
            }
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    onChangeRuleId(ruleId: any) {
        if (ruleId && this.benefitRules && this.benefitRules.length > 0) {
            let br = this.benefitRules.filter(f => f.ruleId === ruleId);
            if (br && br.length > 0) {
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage(
                        'popUpMessageName',
                        'Benefit Rule',
                        '7109: ' + message[0].messageText,
                        'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Okay', 'Okay', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        this.benefitRuleForm.patchValue({
                            ruleId: null
                        });
                        setTimeout(() => {
                            this.ruleIdField.nativeElement.focus();
                        }, 100);
                    });
                });
            }
        }
    }

    saveBenefitRule() {
        this.addBenefitRule();
    }

    addBenefitRule() {
        if (this.editBenefitRule) {
            if (!this.isSuperUser) {
                if (this.secWin.hasUpdatePermission()) {
                    this.updateBenefitRule()
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
                    });
                }
            } else {
                this.updateBenefitRule()
            }

        } else {
            if (!this.isSuperUser) {
                if (this.secWin.hasInsertPermission()) {
                    this.createBenefitRule();
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                    });
                }
            } else {
                this.createBenefitRule();
            }
        }
    }

    deleteBenefitRule() {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        const ruleId = this.benefitRuleForm.value.ruleId ? this.benefitRuleForm.value.ruleId : this.keyValues;
        if (ruleId) {
            this.benefitRuleService.deleteBenefitRule(ruleId).subscribe(response => {
                for (let i = 0; i < this.benefitRules.length; i++) {
                    if (this.benefitRules[i].ruleId == ruleId) {
                        this.benefitRules.splice(i, 1);
                        break;
                    }
                }
                this.dataGridGridOptions.api.setRowData(this.benefitRules);
                if (this.benefitRules && this.benefitRules.length > 0) {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                    this.keyValues = this.benefitRules[0].ruleId;
                } else {
                    this.keyValues = "";
                    this.dataGridGridOptions.api.setRowData([]);
                }

                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    /**
     * Benefit rule default values for Rule Type = 80, and 40
     */
    setDefaultValueOfRuleType40And80(benefitRule: BenefitRule) {

        benefitRule.attributeNum6 = 0;
        benefitRule.attributeNum7 = 0;

        benefitRule.attributeNum8 = 0;
        benefitRule.attributeChar1 = "N";
        benefitRule.attributeChar3 = "N";
        benefitRule.attributeChar5 = null;
        benefitRule.attributeChar6 = "Y";
        benefitRule.attributeChar8 = "N";
        benefitRule.attributeChar11 = "N";
        this.benefitRuleForm.controls['multiplyByQuantity'].setValue(false);         // TODO map correctly
        if (this.isBenefitRuleSelection) {
            this.populateBenefitRuleData(benefitRule);
        }
    }

    /**
     * Benefit rule default values for Rule Type = 70, 60, and 50, 20, 10, 00
     */
    setDefaultValueOfRuleType(benefitRule: BenefitRule) {

        benefitRule.attributeNum6 = 0;
        benefitRule.attributeNum7 = 0;

        benefitRule.attributeNum8 = 0;
        benefitRule.attributeChar1 = "N";
        benefitRule.attributeChar2 = "";
        benefitRule.attributeChar3 = "N";
        benefitRule.attributeChar4 = "";
        benefitRule.attributeChar5 = "N";
        benefitRule.attributeChar6 = "Y";
        benefitRule.attributeChar8 = "N";
        benefitRule.attributeChar11 = "N";
        benefitRule.attributeChar13 = "";
        benefitRule.attributeChar14 = "";
        this.benefitRuleForm.controls['multiplyByQuantity'].setValue(false);         // TODO map correctly
        if (this.isBenefitRuleSelection) {
            this.populateBenefitRuleData(benefitRule);
        }
    }

    /**
     * Benefit rule default values for Rule Type = 30
     */
    setDefaultValueOfRuleType30(benefitRule: BenefitRule) {

        benefitRule.attributeNum6 = 0;
        benefitRule.attributeNum7 = 0;

        benefitRule.attributeNum8 = 0;
        benefitRule.attributeChar1 = "N";
        benefitRule.attributeChar3 = "N";
        benefitRule.attributeChar5 = "N"
        this.benefitRuleForm.controls['multiplyByQuantity'].setValue(false);         // TODO map correctly
        if (this.isBenefitRuleSelection) {
            this.populateBenefitRuleData(benefitRule);
        }
    }


    getTimeFrames() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_14', 'dw_brule_de_code_80', 0).subscribe((res: any) => {
            this.timeFrames = res;
        });
    }

    getCarryOvers() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_1', 'dw_brule_de_code_80', 0).subscribe((res: any) => {
            this.carryOvers = res;
        });
    }

    getMemberFamilies() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_4', 'dw_brule_de_code_80', 0).subscribe((res: any) => {
            this.memberFamilies = res;
        });
    }

    getRenewals() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_9', 'dw_brule_de_code_30', 0).subscribe((res: any) => {
            this.renewals = res;
        });
    }

    getFroms() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_7', 'dw_brule_de_code_30', 0).subscribe((res: any) => {
            this.froms = res;
        });
    }

    getClaimTypes() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_2', 'dw_brule_de_code_80', 0).subscribe((res: any) => {
            this.claimTypes = res;
        });
    }

    getLimitTypes() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('attribute_char_5', 'dw_brule_de_code_20', 0).subscribe((res: any) => {
            this.limitTypes = res;
        });
    }

    onChangeQuant(event: any) {
        let value1 = this.benefitRuleForm.get('quantityGreaterOrEq').value;
        let value2 = this.benefitRuleForm.get('quantitylessAndEq').value;
        if (value1 && value2 && parseInt(value1) > parseInt(value2)) {
            this.messageService.findByMessageId(21064).subscribe((message: MessageMasterDtl[]) => {
                this.showErrorMessage('21064: ' + message[0].messageText);
            });
            this.benefitRuleForm.get('quantitylessAndEq').setValue(null);
        }
    }

    showErrorMessage(message: any, title?: any) {
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title ? title : 'Error',
            message,
            'danger'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.valueChanged == true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Benefit Rule')
            })
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveBenefitRule()
                }
                else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    this.activeModal.close();
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    next = () => {
        let currentSelectedIndex = this.benefitRules.findIndex((benefitRule: BenefitRule) =>
            benefitRule.ruleId === this.benefitRule.ruleId
        );
        if ((currentSelectedIndex + 1) < this.benefitRules.length) {
            this.benefitRule = this.benefitRules[currentSelectedIndex + 1];
        }
        this.changeTable();
    };

    previous = () => {
        let currentSelectedIndex = this.benefitRules.findIndex((benefitRule: BenefitRule) =>
            benefitRule.ruleId === this.benefitRule.ruleId
        );
        if ((currentSelectedIndex) > 0) {
            this.benefitRule = this.benefitRules[currentSelectedIndex - 1];
        }
        this.changeTable();
    };

    changeTable = () => {
        this.rowSelected = true;
        this.benefitRuleForm.controls['ruleId'].disable();
        this.benefitRuleForm.controls['ruleType'].disable();
        this.benefitRuleForm.controls['medDefFilter'].disable();
        this.benefitRuleForm.controls['otherMedDefinitions'].disable();
        this.benefitRuleForm.controls['countTowardMax'].disable();
        this.populateBenefitRuleData(this.benefitRule)
    };

    isFormDataModified = () => {
        this.benefitRuleForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
        });
    };

    selectRenewal = (event: any) => {
        if (event.target.value) {
            this.mandatoryStatus = true;
        }
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: "myCustomModalClass" });
        viewModal.componentInstance.defaultFile = 'BRULE_Benefit_Rules.htm'
    };

    deletePopupAlert = () => {
        if (this.isSuperUser) {
            this.deleteBtRule();
        } else {
            if (this.secWin.hasDeletePermission()) {
                this.deleteBtRule();
            } else {
                this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    };

    deleteBtRule() {
        let popUpMessage = new PopUpMessage(
            'Benefit Rule',
            'Benefit Rule',
            '29070: Press OK to delete this record',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'OK') {
                this.deleteBenefitRule();
            }
        });
    }

    onKeydownCoinsurePercnt(event: any) {
        if (event.key === 'Tab' && event.target.value && isNumeric(event.target.value) && Number(event.target.value) > 1) {
            this.messageService.findByMessageId(27176).subscribe((message: MessageMasterDtl[]) => {
                this.sharedService.showPopUp("Coinsure Percnt", "27176: " + message[0].messageText, "Benefit Rule", "OK");
                const element = this.renderer.selectRootElement(`#${event.target.id}`);
                element.focus();
            });
            return;
        }
    }

    form1PopupAlert = (message: string, title: string) => {
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

      private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Beneift Rule";
        ref.componentInstance.insertDateTime = this.benefitRule.insertDatetime
          ? this.benefitRule.insertDatetime
          : "";
        ref.componentInstance.insertDateTime =
          this.benefitRule.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.benefitRule.insertProcess;
        ref.componentInstance.insertUser = this.benefitRule.insertUser;
        ref.componentInstance.updateUser = this.benefitRule.updateUser;
        ref.componentInstance.updateDateTime =
          this.benefitRule.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.benefitRule.updateProcess;
  };

    divselection(id){
     this.actionDiv=id;
    };

    limitTypeEvent  = (event) => {
        let limitTypeVal = event.target.value;
        this.multiplyByQuantityDisplayStatus = limitTypeVal === 'W';
        this.twoDigitalMaskStatus = !(limitTypeVal === 'D' || limitTypeVal === 'Q' || limitTypeVal === 'W' || limitTypeVal === 'A');
    };

    reasonCodeKeyEvent = (event) => {
        let reasonCode = event.target.value.toLowerCase();
        if (reasonCode === '') {
            this.filteredReasonCodeValue = this.filteredReasonCode
        } else {
            this.filteredReasonCodeValue = this.filteredReasonCode.filter(it => {
                return it.reasonCode.toLowerCase().includes(reasonCode)
            })
        }
    }

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }

    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    };

    openWindowsMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    };

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    triggerMenus(value: any) {
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
            } else if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Med Def'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Count Toward Max'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Other Med Defs'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == "fileDropdownWindow") {
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
    }

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
}
