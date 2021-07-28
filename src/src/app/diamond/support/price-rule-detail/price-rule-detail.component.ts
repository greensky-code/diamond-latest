/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit, QueryList,
    Renderer2,
    ViewChild, ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {
    DddwDtlService,
    MessageMasterDtlService,
    PriceRuleDetailService,
    ReasonCodeMasterService,
    SecUserService
} from "../../../api-services";
import {
    MessageMasterDtl,
    PriceRuleDetail,
    PriceRuleMaster,
    ReasonCodeMaster,
    SecUser,
    SecWin
} from "../../../api-models";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {Menu, SearchModel} from "../../../shared/models/models";
import {PriceRuleLookup} from "../../../shared/lookup/price-rule-lookup";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {CONSTANTS, getPriceRuleDetailShortcutKeys} from "../../../shared/services/shared.service";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {PriceRuleMasterService} from "../../../api-services/price-rule-master.service";
import {ModifierCodeMaster} from "../../../api-models/modifier-code-master.model";
import {ModifierCodeMasterService} from "../../../api-services/modifier-code-master.service";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {RequiredValidator} from "../../../shared/validators/required.validator";
import {ReasonCodeMasterLookup} from "../../../shared/lookup/reason-code-master-lookup";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {Router} from "@angular/router";
import {SUPPORT_MODULE_ID} from "../../../shared/app-constants";
import {PriceRuleDetailSelectionComponent} from "../price-rule-detail-selection/price-rule-detail-selection.component";
import {PriceRuleComponent} from "../price-rule/price-rule.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {SupportHelpComponent} from "../support-help/support-help.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {DatePipe} from "@angular/common";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PriceRuleDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'priceruledetail',
    templateUrl: './price-rule-detail.component.html',

})
export class PriceRuleDetailComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    priceRuleDetailForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'PRULD';
    public isSuperUser = false;
    public secProgress = true;
    @Input() showIcon = true;
    @Input() priceRule;
    @ViewChild('priceRule') priceRuleElem: ElementRef;
    moduleId = SUPPORT_MODULE_ID;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    includeExclude: any;
    priceMethod: any;
    calculationMethod: any;
    holdReasons: import("../../../api-models/reason-code-master.model").ReasonCodeMaster[];
    priceRuleId: any;
    priceRuleDescription : any;
    allowedFactorOvr: any;
    pressedKey: any[] = [];

    reasonCodeMasterSearchModel =
        new SearchModel('reasoncodemasters/lookup', ReasonCodeMasterLookup.REASON_CODE_MASTER_ALL,
            ReasonCodeMasterLookup.REASON_CODE_MASTER_DEFAULT, [], false);

    priceRuleSearchModal = new SearchModel(
        "pricerulemasters/lookup",
        PriceRuleLookup.PRICE_RULE_ALL,
        PriceRuleLookup.PRICE_RULE_DEFAULT,
        []
    );
    allowedReason: any;
    customTable = {
        ruleLevel: '',
        searchSequence: '',
        calculationMethod: ''
    };
    createNewStatus: Boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private priceRuleDetailService: PriceRuleDetailService,
        private secColDetailService: SecColDetailService,
        private cdr: ChangeDetectorRef,
        private priceRuleMasterService: PriceRuleMasterService,
        private modifierCodeMasterService: ModifierCodeMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private ReasonCodeMasterService: ReasonCodeMasterService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private renderer: Renderer2,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.priceRuleDetailForm);
        this.createDataGrid();

        // Set Form Field Validations
        this.addRuleLevelValidation();
        this.getHoldReason();

        this.getPriceRuleDropdownValues();
        this.getModifierCodeDropdownValues();
        this.getReasonCodeDropdownValues();
        this.getCalcMethodDropdownValues();
        this.getUnitValueTypeDropdownValues();
        this.getCapInclExclDropdownValues();
        this.getMulModPriceMethodDropdownValues();

        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
            if (this.priceRule) {
                this.priceRuleDetailForm.patchValue({
                    priceRule002: this.priceRule,
                });
                this.findByPriceRule(this.priceRule);
            }
        }, 100);
    }

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    priceRuleMasters: PriceRuleMaster[] = [];
    modifierCodeMasters: ModifierCodeMaster[] = [];
    calcMethodValues = [];
    unitValueTypeValues = [];
    capInclExclValues = [];
    mulModPriceMethodValues = [];
    reasonCodeValues: ReasonCodeMaster[] = [];


    ngAfterViewInit(): void {
        this.shortcuts.push(...getPriceRuleDetailShortcutKeys(this));
        this.cdr.detectChanges();
    }

    ruleLevelValidationMessage = null;
    allowedFacOverValidationMessage = null;

    /**
     * Add Rule Level Form-Field Validation
     */
    addRuleLevelValidation() {
        this.priceRuleDetailForm.controls['ruleLevel'].valueChanges.subscribe(ruleLevel => {
            try {
                if (!ruleLevel) {
                    return;
                }
                if (Number(ruleLevel) < 1 || Number(ruleLevel) > 5) {
                    if (!this.ruleLevelValidationMessage) {
                        this.messageService.findByMessageId(27179).subscribe((message: MessageMasterDtl[]) => {
                            this.ruleLevelValidationMessage = message[0].messageText;
                            this.showPopUp(`27179: ${this.ruleLevelValidationMessage}`, 'Price Rule Detail ');
                        });
                    } else {
                        this.showPopUp(`27179: ${this.ruleLevelValidationMessage}`, 'Price Rule Detail ');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        })
    }

    /**
     * Allowed Factor Over Form-Field (allowedFactorOvr) Validation
     */
    addAllowedFactorOverValidation(fieldName: string) {
        try {
            const value = this.priceRuleDetailForm.controls[fieldName].value;
            if (!value) {
                return
            }
            if (Number(value) < 0 || Number(value) > 9.9999) {
                if (!this.allowedFacOverValidationMessage) {
                    this.messageService.findByMessageId(27180).subscribe((message: MessageMasterDtl[]) => {
                        this.allowedFacOverValidationMessage = message[0].messageText;
                        this.showPopUp(`27180: ${this.allowedFacOverValidationMessage}`, 'Price Rule Detail ');
                    });
                } else {
                    this.showPopUp(`27180: ${this.allowedFacOverValidationMessage}`, 'Price Rule Detail ');
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * addMultiModAReason Validation
     */
    addMultiModAReasonValidation() {
        try {
            const value = this.priceRuleDetailForm.controls['allowedReason002'].value;
            if (!value) {
                return
            }
            const res = value.substring(0, 2);
            if (value.length > 0 && res !== 'AL') {
                if (!this.mulModReasonValidationMessage) {
                    this.messageService.findByMessageId(27222).subscribe((message: MessageMasterDtl[]) => {
                        this.mulModReasonValidationMessage = message[0].messageText;
                        this.showPopUp(`27222: ${this.mulModReasonValidationMessage}`, 'Price Rule Detail ');
                    });
                } else {
                    this.showPopUp(`27222: ${this.mulModReasonValidationMessage}`, 'Price Rule Detail ');
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    mulModReasonValidationMessage = null;


    setFieldValue(fieldName: string, fieldValue: string) {
        this.priceRuleDetailForm.controls[fieldName].patchValue(fieldValue);
        this.priceRuleDetailValueChanged(fieldName, fieldValue)
    }

    /**
     * Get Price Rule Dropdown Values
     */
    getPriceRuleDropdownValues() {
        this.priceRuleMasterService.getPriceRuleMasters().subscribe((data: PriceRuleMaster[]) => {
            this.priceRuleMasters = data;
        })
    }

    /**
     * Get Modifier Dropdown Values
     */
    getModifierCodeDropdownValues() {
        this.modifierCodeMasterService.getModifierCodeMasters().subscribe((data: ModifierCodeMaster[]) => {
            this.modifierCodeMasters = data;
        },)
    }

    /**
     * Get Reason Code Dropdown Values
     */
    getReasonCodeDropdownValues() {
        this.ReasonCodeMasterService.getReasonCodeMasterByReasonType(
            "AL"
        ).subscribe((data) => {
            this.allowedReason = data;
            this.allowedReason.sort(function (a: any, b: any) {
                if (a.reasonCode < b.reasonCode) {
                    return -1;
                }
                if (a.reasonCode > b.reasonCode) {
                    return 1;
                }
                return 0;
            });
        })


    }

    /**
     * Get Calc Method dropdown Values
     * W_NAME = 'dw_pruld_de'  ) and          ( HSD_DDDW_HDR.COLUMN_NAME = 'calculation_method' ), and language id = 0
     */
    getCalcMethodDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId(CONSTANTS.CALCULATION_METHOD, CONSTANTS.DW_PRULD_DE, 0).subscribe((values) => {
            this.calcMethodValues = values;

        })


    }

    /**
     * Get Unit Value dropdown Values
     *( ( HSD_DDDW_HDR.DW_NAME = 'dw_pruld_de'  ) and ( HSD_DDDW_HDR.COLUMN_NAME = 'unit_value_type' )  and language id = 0
     */
    getUnitValueTypeDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId(CONSTANTS.UNIT_VALUE_TYPE, CONSTANTS.DW_PRULD_DE, 0).subscribe((values) => {
            this.unitValueTypeValues = values;

        });
    }

    /**
     * Get Cap Inc Excl dropdown Values
     *  ( ( HSD_DDDW_HDR.DW_NAME = ‘dw_pruld_de’  ) and          ( HSD_DDDW_HDR.COLUMN_NAME = ‘cap_outlier_incl_excl’ ) and language id = 0
     */
    getCapInclExclDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId(CONSTANTS.CAP_OUTLIER_INCL_EXCL, CONSTANTS.DW_PRULD_DE, 0).subscribe((values) => {
            this.capInclExclValues = values;

        });
    }

    /**
     * getMulModPriceMethod dropdown Values
     *     ( ( HSD_DDDW_HDR.DW_NAME = ‘dw_pruld_de’  ) and          ( HSD_DDDW_HDR.COLUMN_NAME = ‘mult_mod_price_method’ )and language id = 0
     */
    getMulModPriceMethodDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId(CONSTANTS.MULT_MOD_PRICE_METHOD, CONSTANTS.DW_PRULD_DE, 0).subscribe((values) => {
            this.mulModPriceMethodValues = values;

        });
    }


    /**
     * get all price rule details data
     */
    getPriceRuleDetailsData() {
        this.priceRuleDetailService.getPriceRuleDetails().subscribe(data => {
            this.priceRuleDetails = data;
        })
    }

    resetForm(flag = false) {
        if (flag) {
            this.priceRuleDetailForm.controls['modifierCode'].reset();
            this.priceRuleDetailForm.controls['ruleLevel'].reset();
            this.priceRuleDetailForm.controls['searchSequence'].reset();
            this.priceRuleDetailForm.controls['calculationMethod'].reset();
            this.priceRuleDetailForm.controls['allowedReason001'].reset();
            this.priceRuleDetailForm.controls['unitValueType'].reset();
            this.priceRuleDetailForm.controls['holdReason'].reset();
            this.priceRuleDetailForm.controls['addToBaseUnits'].reset();
            this.priceRuleDetailForm.controls['allowedFactorPrompt'].reset();
            this.priceRuleDetailForm.controls['multByPctAllowed'].reset();
            this.priceRuleDetailForm.controls['informationOnly'].reset();
            this.priceRuleDetailForm.controls['carveOut'].reset();
            this.priceRuleDetailForm.controls['allowedReason002'].reset();
            this.priceRuleDetailForm.controls['allowedFactorOvr002'].patchValue('100%');
            this.priceRuleDetailForm.controls['messageToOperator'].reset();
            this.priceRuleDetailForm.controls['userDefined1'].reset();
            this.priceRuleDetailForm.controls['userDefined2'].reset();
        } else {
            this.priceRuleDetailForm.enable();
            this.priceRuleDetailForm.reset();
            this.editPriceRuleDetail = false;
        }
    }

    onTabClick(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.findByPriceRule(event.target.value);
        } else if (event.key == 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    priceRuleDetails: PriceRuleDetail[] = [];
    priceRuleDetail: PriceRuleDetail = new PriceRuleDetail();
    editPriceRuleDetail = false;

    findByPriceRule(priceRule) {
        this.priceRuleDetailService.findByPriceRule(priceRule).subscribe((priceRuleDetails: PriceRuleDetail[]) => {
            if (priceRuleDetails && priceRuleDetails.length > 0) {
                this.priceRuleDetails = priceRuleDetails;
                this.editPriceRuleDetail = true;
                for (let item of priceRuleDetails) {
                    let calcMethodItem = this.calcMethodValues.filter((ele) => item.calculationMethod === ele.value);
                    if (calcMethodItem.length) {
                        item.calculationMethod = calcMethodItem[0].value
                    }
                }
                this.dataGridGridOptions.api.setRowData(priceRuleDetails);
                this.dataGridGridOptions.api.selectIndex(0, null, null);
                this.priceRuleDetail = priceRuleDetails[0];
                this.setFormData(this.priceRuleDetail);
            } else {
                this.createPriceRuleDetailPopup(this.priceRuleDetailForm.value.priceRule001);
            }
        })
    }


    createPriceRuleDetailPopup(id: number) {
       this.messageService.findByMessageId(5557).subscribe(res => {
           let popMsg = new PopUpMessage(
               'priceRule',
               'Price Rule Detail',
               '5557: ' + res[0].messageText,
               'icon'
           );
           // tslint:disable-next-line:max-line-length
           popMsg.buttons = [
               new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
           ];
           let ref = this.modalService.open(PopUpMessageComponent, {
               size: 'lg',
           });
           ref.componentInstance.popupMessage = popMsg;
           ref.componentInstance.showIcon = true;
           ref.componentInstance['buttonclickEvent'].subscribe((button: any) => {
               if (button.name === 'Ok') {
                   this.resetForm();
                   this.priceRuleDetailForm.controls['priceRule001'].patchValue(id);
               } else if (button.name === 'no') {

               }
           });
       })
    }


    popUpButtonClicked(button) {
        if (button.name === 'yes') {
            this.resetForm();
        } else if (button.name === 'no') {

        }
        this.popUpMessage = null;
    }

    /**
     * Create Price Rule
     */
    createPriceRuleDetail() {
        if (this.priceRuleDetailForm.valid) {
            const priceRuleDetail = this.getFormData(new PriceRuleDetail());

            priceRuleDetail.priceRuleDetailPrimaryKey = {
                priceRule: this.priceRuleDetailForm.value.priceRule001
            };

            this.priceRuleDetailService.createPriceRuleDetail(priceRuleDetail).subscribe(resp => {
                this.showPopUp('Record Created Successfully', 'Price Rule Detail');
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            })
        } else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }


    updatePriceRuleDetail() {
        if (this.priceRuleDetailForm.valid) {
            const priceRuleDetail: PriceRuleDetail = this.getFormData(this.priceRuleDetail);

            console.log(this.priceRuleDetailForm.value);
            console.log(priceRuleDetail);
            this.priceRuleDetailService.updatePriceRuleDetailByPrimaryKey(priceRuleDetail, priceRuleDetail.priceRuleDetailPrimaryKey.priceRule, priceRuleDetail.priceRuleDetailPrimaryKey.seqRuleDetail).subscribe(resp => {
                this.toastService.showToast('Record updated Successfully', NgbToastType.Success);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            })
        } else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.priceRuleSearchModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {

            if (res != null) {
                this.priceRuleDetailForm.patchValue({
                    'priceRule001': res.priceRule,
                    'priceRuleDescription': res.description,
                });
                this.findByPriceRule(res.priceRule);
            }
        })
    }

    openReasonCodeLookupFieldSearchModel(event) {
        if (event.key == 'F5') {
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.reasonCodeMasterSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {

                    this.priceRuleDetailForm.patchValue({
                        'allowedReason002': res.reasonCode,
                    });
                }
            });
        }

    }


    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();

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

    savePriceRule() {
        if (this.editPriceRuleDetail) {
            this.updatePriceRuleDetail();
            return;
        }
        this.createPriceRuleDetail();
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
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
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
            .findByTableNameAndUserId('PRICE_RULE_DETAIL_RULES', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    priceRuleDetailRowSelected($event) {
        this.resetForm();
        if (this.createNewStatus) {
            this.resetNewForm();
        }

        const selectedRows = this.dataGridGridOptions.api.getSelectedRows();

        if (selectedRows.length === 1) {
            this.searchStatus = true;
            this.editPriceRuleDetail = true;

            this.priceRuleDetail = selectedRows[0];
            this.keyValues = this.priceRuleDetail.priceRuleDetailPrimaryKey.priceRule + ' : ' + this.priceRuleDetail.priceRuleDetailPrimaryKey.seqRuleDetail;
            setTimeout(() => {
                try {
                    this.priceRuleDetail.updateDatetimeDisplay = this.datePipe.transform(
                        new Date(this.priceRuleDetail.updateDatetime),
                        "yyyy-MM-dd HH:mm:ss"
                    );
                    this.priceRuleDetail.insertDatetimeDisplay = this.datePipe.transform(
                        new Date(this.priceRuleDetail.insertDatetime),
                        "yyyy-MM-dd HH:mm:ss"
                    );
                } catch (e) {
                    console.log(e);
                }
            }, 500);
            this.dataGridGridOptions.api.selectIndex($event.rowIndex, null, null);

            this.setFormData(this.priceRuleDetail);
        } else {
            this.searchStatus = false;
        }
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50,
                defaultColDef: {
                    filter: true, sortable: true, floatingFilter: true
                }
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Modifier",
                field: "modifierCode",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Level",
                field: "ruleLevel",
                width: 200
            },
            {
                headerName: "Sequence",
                field: "searchSequence",
                width: 200
            },
            {
                headerName: "Calculation Method",
                field: "",
                width: 200,
                valueGetter: (data) => {
                    let calculationMethod = data.data.calculationMethod;
                    for (let item in this.calcMethodValues) {
                        if (this.calcMethodValues[item].value === calculationMethod) {
                            return this.calcMethodValues[item].key;
                        }
                    } if (calculationMethod === '2') {
                        return 'Free Schedule';
                    }
                }
            }
        ];
    }

    setFormData(priceRuleDetail: PriceRuleDetail) {
        if (!priceRuleDetail.priceRuleDetailPrimaryKey) {
            this.setFieldValue('calculationMethod', '');
            this.calculationMethod = null;
            return;
        }
        let priceRule = priceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
        let inExclude, priceMethod, calMethod;
        for (let item of  this.capInclExclValues) {
            if (item.value === priceRuleDetail.capOutlierInclExcl) {
                inExclude =  item.key
            }
        }

        for (let item of this.mulModPriceMethodValues) {
            if (item.value === priceRuleDetail.multModPriceMethod.toString()) {
                priceMethod = item.key;
            }
        }

        for (let item of this.calcMethodValues) {
            if (item.value === priceRuleDetail.calculationMethod.toString() || item.key === priceRuleDetail.calculationMethod) {
                calMethod = item.key;
            }
        }

        this.priceRuleMasterService.getPriceRuleMaster(priceRule).subscribe((res) => {
            this.priceRuleDetailForm.patchValue({
                priceRule001: priceRuleDetail.priceRuleDetailPrimaryKey.priceRule,
                priceRuleDescription: res.description,
                priceRule002: priceRuleDetail.priceRuleDetailPrimaryKey.priceRule,    // TODO need to confirm
                modifierCode: priceRuleDetail.modifierCode,
                ruleLevel: priceRuleDetail.ruleLevel,
                searchSequence: priceRuleDetail.searchSequence,
                calculationMethod: priceRuleDetail.calculationMethod,
                allowedReason001: priceRuleDetail.allowedReason,
                unitValueType: priceRuleDetail.unitValueType,
                holdReason: priceRuleDetail.holdReason,
                addToBaseUnits: priceRuleDetail.addToBaseUnits,
                allowedFactorPrompt: priceRuleDetail.allowedFactor,
                allowedFactorOvr001: priceRuleDetail.allowedFactOvr ? (priceRuleDetail.allowedFactOvr * 100).toString() + '.%' : '',
                multByPctAllowed: priceRuleDetail.multByPctAllowed,
                informationOnly: priceRuleDetail.resetToInfo,      //TODO need to check
                carveOut: priceRuleDetail.carveOut,
                includeexclude: priceRuleDetail.capOutlierInclExcl,
                priceMethod: priceRuleDetail.multModPriceMethod.toString(),  //TODO need to check
                allowedReason002: priceRuleDetail.multModAllowedReason,
                allowedFactorOvr002: priceRuleDetail.allowedFactOvr ? (priceRuleDetail.allowedFactOvr * 100).toString() + '.%' : '',
                messageToOperator: priceRuleDetail.messageToOperator,
                userDefined1: priceRuleDetail.userDefined1,
                userDefined2: priceRuleDetail.userDefined2
            }, {emitEvent: false});

            setTimeout(() => {
                this.includeExclude = inExclude;
                this.priceMethod = priceMethod;
                this.calculationMethod = calMethod;
            }, 100);
            this.priceRuleId = priceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
            this.priceRuleDescription = res.description;
            this.allowedFactorOvr = priceRuleDetail.allowedFactOvr ? (priceRuleDetail.allowedFactOvr * 100).toString() + '.%' : '';
        });

        this.disableDefaultFields();
    }

    getFormData(priceRuleDetail: PriceRuleDetail): PriceRuleDetail {


        priceRuleDetail.modifierCode = this.priceRuleDetailForm.getRawValue().modifierCode;
        priceRuleDetail.ruleLevel = this.priceRuleDetailForm.getRawValue().ruleLevel;

        priceRuleDetail.searchSequence = this.priceRuleDetailForm.getRawValue().searchSequence;
        priceRuleDetail.calculationMethod = this.priceRuleDetailForm.getRawValue().calculationMethod;
        priceRuleDetail.allowedReason = this.priceRuleDetailForm.getRawValue().allowedReason001;
        priceRuleDetail.unitValueType = this.priceRuleDetailForm.getRawValue().unitValueType;
        priceRuleDetail.holdReason = this.priceRuleDetailForm.getRawValue().holdReason;
        priceRuleDetail.addToBaseUnits = this.priceRuleDetailForm.getRawValue().addToBaseUnits;

        let aFactOver = this.priceRuleDetailForm.getRawValue().allowedFactorOvr001;
        aFactOver = (aFactOver && aFactOver.toString().indexOf('%') >= 0 ? (parseFloat(aFactOver.toString().replace('.%', ''))/100) : aFactOver);
        priceRuleDetail.allowedFactOvr = (aFactOver ? parseFloat(aFactOver.toString()) : null);
        priceRuleDetail.multByPctAllowed = this.priceRuleDetailForm.getRawValue().multByPctAllowed ? 'Y' : 'N';

        priceRuleDetail.resetToInfo = this.priceRuleDetailForm.getRawValue().informationOnly ? 'Y' : 'N';
        priceRuleDetail.carveOut = this.priceRuleDetailForm.getRawValue().carveOut ? 'Y' : 'N';
        priceRuleDetail.capOutlierInclExcl = this.priceRuleDetailForm.getRawValue().includeexclude;
        priceRuleDetail.multModPriceMethod = this.priceRuleDetailForm.getRawValue().priceMethod;

        priceRuleDetail.multModAllowedReason = this.priceRuleDetailForm.getRawValue().allowedReason002;
        priceRuleDetail.messageToOperator = this.priceRuleDetailForm.getRawValue().messageToOperator;
        priceRuleDetail.userDefined1 = this.priceRuleDetailForm.getRawValue().userDefined1;
        priceRuleDetail.userDefined2 = this.priceRuleDetailForm.getRawValue().userDefined2;
        priceRuleDetail.allowedFactor = this.priceRuleDetailForm.getRawValue().allowedFactorPrompt ? 'Y' : 'N';

        return priceRuleDetail;
    }

    disableDefaultFields() {
        this.priceRuleDetailForm.controls['priceRule001'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['priceRule002'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['ruleLevel'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['searchSequence'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['unitValueType'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['addToBaseUnits'].disable({emitEvent: false});
        this.priceRuleDetailForm.controls['allowedFactorOvr002'].disable({emitEvent: false});
        this.isFormDataModified();
    }

    enableDefaultFields() {
        this.priceRuleDetailForm.controls['priceRule001'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['priceRule002'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['ruleLevel'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['searchSequence'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['unitValueType'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['addToBaseUnits'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['allowedFactorOvr002'].enable({emitEvent: false});
        this.isFormDataChangeStatus = false;
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.priceRuleDetailForm = this.formBuilder.group({
            priceRule001: ['', {validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            priceRuleDescription: ['', {updateOn: 'blur', validators: []}],
            priceRule002: ['', {updateOn: 'blur', validators: [Validators.required]}],
            modifierCode: ['', {updateOn: 'blur', validators: []}],
            ruleLevel: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace, Validators.minLength(1), Validators.maxLength(5)]
            }],
            searchSequence: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            calculationMethod: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            allowedReason001: ['', {updateOn: 'blur', validators: []}],
            unitValueType: ['', {updateOn: 'blur', validators: []}],
            holdReason: ['', {updateOn: 'blur', validators: []}],
            addToBaseUnits: ['', {updateOn: 'blur', validators: []}],
            allowedFactorPrompt: ['', {updateOn: 'blur', validators: []}],
            allowedFactorOvr001: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            multByPctAllowed: ['', {updateOn: 'blur', validators: []}],
            informationOnly: ['', {updateOn: 'blur', validators: []}],
            carveOut: ['', {updateOn: 'blur', validators: []}],
            includeexclude: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            //       multipleModifierPricingInfo: ['', {updateOn: 'blur', validators: []}],
            priceMethod: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            allowedReason002: ['', {updateOn: 'blur', validators: []}],
            allowedFactorOvr002: ['', {updateOn: 'blur', validators: []}],
            //   otherInformation: ['', {updateOn: 'blur', validators: []}],
            userDefined1: ['', {updateOn: 'blur', validators: []}],
            userDefined2: ['', {updateOn: 'blur', validators: []}],
            messageToOperator: ['', {updateOn: 'blur', validators: []}],
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewFunction();
                    break;
                }
                case 'Open': {
                    this.handleOpenMenu();
                    break;
                }
                case 'Save': {
                    this.savePriceRule();
                    break;
                }
                case 'Close': {

                    this.activeModal.dismiss();
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
            //     this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.priceRuleDetailForm.get('priceRule002').value) {
                        this.openShowTimestampComponent();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
                case 'Audit Display': {
                    this.openAuditDisplayComponent();
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

    searchStatus;
    keyValues;
    keyNames = 'price_rule : seq_rule_detail';

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleTopicMenu(action: string) {
        switch (action) {
            case 'Price Rule Master': {
                this.openPriceRuleMasterComponent();
                break;
            }
            case 'Price Rule Detail Selection': {
                this.openPriceRuleDetailSelectionomponent();
                break;
            }
            case 'Whole Rule Claim Price Rule': {
                this.toastService.showToast('Action in progress', NgbToastType.Danger);

                break;
            }

            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }


    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Provider Master Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }

            case 'Contract Copy': {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);

                // const ref = this.modalService.open(, {
                //     size: <any>'xl',
                // });
                // ref.componentInstance.showIcon = true;
                break;
            }


            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }


    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl + N'},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Save', shortcutKey: 'Ctrl + S'},
                    {name: 'Close', shortcutKey: 'Ctrl + A4'},
                    { isHorizontal: true },
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    { isHorizontal: true },
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt + A4'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C'},
                    {name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V'},
                    {isHorizontal: true},
                    {name: 'Lookup'},
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Price Rule Master'},
                    {name: 'Price Rule Detail Selection'},
                    {name: 'Whole Rule Claim Price Rule'},

                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [],
                disabled: true
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
                    { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Tooth RUle'},
                    {name: '3 Member COB History'},
                    {name: '4 Member COB History'},
                    {name: '5 Member COB History'},
                    {name: '6 Price Rule Detail'},
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

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Price Rule Detail')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try{
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
                    this.savePriceRule()
                }
                else if(resp.name === 'No') {
                    this.router.navigateByUrl('/');
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

    isFormDataModified() {
        this.priceRuleDetailForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    getHoldReason() {
        this.ReasonCodeMasterService.getReasonCodeMasterByReasonType(
            "HD"
        ).subscribe((data) => {
            this.holdReasons = data;
            this.holdReasons.sort(function (a, b) {
                if (a.reasonCode < b.reasonCode) {
                    return -1;
                }
                if (a.reasonCode > b.reasonCode) {
                    return 1;
                }
                return 0;
            });
        });
    }

    createNewFunction = () => {
        this.createNewStatus = true;
        this.priceRuleDetailForm.controls['ruleLevel'].enable({emitEvent: false});
        this.priceRuleDetailForm.controls['searchSequence'].enable({emitEvent: false});
        let data = [];
        for (let item of this.priceRuleDetails) {
            data.push(item)
        }
        data.push([]);
        this.dataGridGridOptions.api.setRowData(data);
        this.dataGridGridOptions.api.selectIndex(data.length - 1, false, false);
    };

    resetNewForm() {
        this.priceRuleDetailForm.patchValue({
            priceRule002: this.priceRuleId,
            priceRule001: this.priceRuleId,
            priceRuleDescription: this.priceRuleDescription,
            allowedFactorOvr001: this.allowedFactorOvr,
            allowedFactorOvr002: this.allowedFactorOvr
        });
        this.priceRuleDetailForm.get('priceRule002').disable();
        this.priceRuleDetailForm.get('priceRuleDescription').disable();
        this.priceRuleDetailForm.get('priceRule001').disable();
        this.priceRuleDetailForm.get('unitValueType').disable();
        this.priceRuleDetailForm.get('addToBaseUnits').disable();
        this.priceRuleDetailForm.get('allowedFactorOvr002').disable();
        const element = this.renderer.selectRootElement('#modifierCode');
        setTimeout(() => element.focus(), 100);
    }

    priceRuleDetailValueChanged = (fieldName, fieldValue) => {
        let data = [];
        switch (fieldName) {
            case 'ruleLevel':
                this.customTable.ruleLevel = fieldValue;
                break;
            case 'searchSequence':
                this.customTable.searchSequence = fieldValue;
                break;
            case 'calculationMethod':
                this.customTable.calculationMethod = fieldValue;
                break;
            default:
                break;
        }
        for (let item of this.priceRuleDetails) {
            data.push(item)
        }
        data.push(this.customTable);
        this.dataGridGridOptions.api.setRowData(data);
        this.dataGridGridOptions.api.selectIndex(data.length - 1, false, false)
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PRULD_Price_Rule_Detail.htm';
    }

    openPriceRuleMasterComponent() {
        this.activeModal.dismiss();
        const ref = this.modalService.open(PriceRuleComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.PriceRule = this.priceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
    }

    openPriceRuleDetailSelectionomponent() {
        this.activeModal.dismiss();
        const ref = this.modalService.open(PriceRuleDetailSelectionComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.PriceRule = this.priceRuleDetail.priceRuleDetailPrimaryKey.priceRule;
    }

    openAuditDisplayComponent() {
        if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.windowId);
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.win = 'dw_pruld_de';
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                    this.toastService.showToast('11073: ' + message[0].messageText, NgbToastType.Danger);
                });
            }
        } else {
            this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast('30164: ' + message[0].messageText, NgbToastType.Danger);
            });
        }
    }

    openContentsComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openSearchForHelpComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openThisWindowComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openGlossaryComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openGettingStartedComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openHowToUseHelpComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openAboutDiamondComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openShowTimestampComponent() {
        const ref = this.modalService.open(TimestampComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.insertDateTime = this.priceRuleDetail.insertDatetime;
        ref.componentInstance.insertDateTime = this.priceRuleDetail.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.priceRuleDetail.insertProcess;
        ref.componentInstance.insertUser = this.priceRuleDetail.insertUser;
        ref.componentInstance.updateUser = this.priceRuleDetail.updateUser;
        ref.componentInstance.updateDateTime = this.priceRuleDetail.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.priceRuleDetail.updateProcess;
    }

    handleMenuActiveIndex(id) {
        document.getElementById(id).click();
    }

    preventDefault(event: KeyboardEvent) {
        event.preventDefault();
        this.pressedKey = [];
    }

    @HostListener('document:keyup', ['$event'])
    onKeyUpHandler(event: KeyboardEvent) {
        setTimeout(() => {
            let keys = this.pressedKey;
            let index = keys.indexOf(event.key.toLowerCase());
            if (index >= 0) {
                this.pressedKey.splice(index, 1);
            }
        }, 1000);
    }

    handleOpenMenu() {
        this.priceRuleDetailForm.reset();
        this.dataGridGridOptions.api.setRowData([]);
        this.enableDefaultFields();
        this.priceRuleElem.nativeElement.focus();
        this.isFormDataChangeStatus = false;
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
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Price Rule Master'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Price Rule Detail Selection'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Whole Claim Price Rule'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownSpecial") {

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
                    sessionStorage.clear();
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

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openSpecialMenu() {
        document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownSpecial'
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }
}
