/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Menu, SearchModel} from '../../../shared/models/models';
import {Form} from '../../../shared/helpers/form.helper';
import {IncentiveRule} from '../../../api-models/incentive-rule.model';
import {IncentiveRuleService} from '../../../api-services/incentive-rule.service';
import {DatePipe} from '@angular/common';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {CONSTANTS, getProviderIncentiveRuleShortcutKeys} from '../../../shared/services/shared.service';
import {DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService, SecUserService, SystemCodesService} from '../../../api-services';
import {IncentiveRuleCopyComponent} from './incentive-rule-copy/incentive-rule-copy.component';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_QUALITY_PRGM, SYSTEM_CODE_TM} from '../../../shared/models/constants';
import {IncentiveQualityPgm} from '../../../api-models/incentive-quality-pgm.model';
import {IncentiveQualityPgmService} from '../../../api-services/incentive-quality-pgm.service';
import {GridOptions} from 'ag-grid-community';
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {PROV_ADDRESS_MODULE_ID} from '../../../shared/app-constants';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProviderIncentiveRuleLookup} from '../../../shared/lookup/provider-incentive-rule-lookup';
import {MemberMasterReasconLookup} from '../../../shared/lookup/member-master-reason-lookup';
import {LineOFBLookup} from '../../../shared/lookup/line-of-business-lookup';
import {SearchService} from '../../../shared/services/search.service';
import {ClmDtlAuthProcLnkHdrService} from '../../../api-services/clm-dtl-auth-proc-lnk-hdr.service';
import {InrulIpaLookup} from '../../../shared/lookup/inrul-ipa-lookup';
import {InrulPanelLookup} from '../../../shared/lookup/inrul-panel-lookup';
import {HelpComponent} from '../../member/help/help.component';
import {ProviderHelpComponent} from '../provider-help/provider-help.component';

// Use the Component directive to define the ProviderIncentiveProgramRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'providerincentiveprogramrule',
    templateUrl: './provider-incentive-program-rule.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        IncentiveRuleService,
        IncentiveQualityPgmService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
        ClmDtlAuthProcLnkHdrService
    ]

})
export class ProviderIncentiveProgramRuleComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerIncentiveProgramRuleForm: FormGroup;
    formValidation: FormValidation;
    public dataGrid001GridOptions: GridOptions;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;

    public showIncentiveProgramRuleFields: boolean;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    memberModuleId = PROV_ADDRESS_MODULE_ID;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    editIncentiveRule: boolean;
    providerIncentiveRule: IncentiveRule;
    amountsToValues: any[] = [];
    qualityPrograms: any[] = [];
    reasonCodes: any[] = [];
    incentiveQualityPgmRule: IncentiveQualityPgm[];
    public isRuleSelected = false;
    termReasonStatus: Boolean = false;
    windowId = 'INRUL';
    secProgress = true;
    isSuperUser = false;
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    isMinimumNumberStatus = true;
    checkedStatus: Boolean = false;
    LobSearchModal = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );

    ipaModal = new SearchModel(
        'ipamasters/lookup',
        InrulIpaLookup.ALL,
        InrulIpaLookup.DEFAULT,
        []
    );

    panelModal = new SearchModel(
        'panelmasters/lookup',
        InrulPanelLookup.ALL,
        InrulPanelLookup.DEFAULT,
        []
    );

    searchModel = new SearchModel(
        'incentiverules/lookup',
        ProviderIncentiveRuleLookup.PROVIDER_ADMINISTRATIVE_FEE_RULE_DEFAULT,
        ProviderIncentiveRuleLookup.PROVIDER_ADMINISTRATIVE_FEE_RULE_ALL,
        []
    );

    reasonModel = new SearchModel(
        'membermasters/reason/lookup',
        MemberMasterReasconLookup.REASON_ALL,
        MemberMasterReasconLookup.REASON_DEFAULT,
        [{ 'REASON_CODE_TYPE': 'TM' }]
    );

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private incentiveRuleService: IncentiveRuleService,
        private incentiveQualityPgmService: IncentiveQualityPgmService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private dddwDtlService: DddwDtlService,
        private systemCodesService: SystemCodesService,
        private clmDtlAuthProcLnkHdrService: ClmDtlAuthProcLnkHdrService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        public activeModal: NgbActiveModal
    ) {
    }
    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    /**
     * Init component state
     * @private
     */
    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerIncentiveProgramRuleForm);
        this.getApplyAmountsToValues();
        this.getQualityProgram();
        this.createDataGrid001();
        this.getReasonCodes();
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderIncentiveRuleShortcutKeys(this));
        this.cdr.detectChanges();
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
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view MEMBER Master', 'Member Master Permission')
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
        this.secColDetailService.findByTableNameAndUserId('INCENTIVE_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Incentive Program Rule')
            })
        } else {
            this.activeModal.close()
        }
    };

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Ok', 'btn btn-primary')];
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

    onChangeAccessProgram(event) {
        if (event.target.checked) {
           this.checkedStatus = false;
        } else {
            this.checkedStatus = true;
            this.providerIncentiveProgramRuleForm.patchValue({
                'minimumMembers': false,
                'totalEnrollWithinLimits': false,
                'lobEnrollWithLimits': false,
                'lobAcceptsNewMembers': false,
            });
        }
    }

    getReasonCodes() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType(SYSTEM_CODE_TM).subscribe(reasonCodes => {
            this.reasonCodes = reasonCodes;
        });
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.providerIncentiveRule = res;
            this.showIncentiveProgramRuleFields = true;
            this.editIncentiveRule = true;
            this.popUpMessage = null;
            this.providerIncentiveProgramRuleForm.patchValue({
                name: res.description,
            });
            this.getIncentiveProgramRule(res.seqIncentiveRule);
            this.getIncentiveQualityProgramRules(res.seqIncentiveRule);
        });
    }

    showEditConfirmation() {
        const buttons = [
            new PopUpMessageButton('Save', 'Save', 'btn btn-info'),
            new PopUpMessageButton('Okay', 'Ok', 'btn btn-primary')
        ];
        const popUpMessage = new PopUpMessage('editConfirmation', 'Warning!', 'Data has been modified.', 'icon', buttons, MessageType.WARNING);
        const ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe(result => {
            if (result && result.name) {
                if (result.name === 'Save') {
                    this.saveIncentiveProgramRule();
                } else {
                    this.showIncentiveProgramRuleFields = false;
                    this.providerIncentiveProgramRuleForm.reset();
                }
            }
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.providerIncentiveProgramRuleForm.reset();
                    this.providerIncentiveProgramRuleForm.get('id').enable();
                    this.isRuleSelected = this.providerIncentiveRule.accessProgramFlag === null;
                    this.showIncentiveProgramRuleFields = true;
                    this.editIncentiveRule = false;

                    this.dataGrid001GridOptions.api.setRowData([]);
                    break;

                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveIncentiveRule();
                    break;
                }
                case 'Close': {
                    if (this.providerIncentiveProgramRuleForm.dirty) {
                        this.showEditConfirmation();
                    } else {
                        this.showIncentiveProgramRuleFields = false;
                        this.providerIncentiveProgramRuleForm.reset();
                    }

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
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
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
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Incentive Rule Copy' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Title', shortcutKey: 'Shift + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Shift + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Shift + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {isHorizontal: true},
                    {name : '1 Main Menu'},
                    {name : '2 Provider Incentive Program Rule'}
                ]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
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
     * Handle Menu Actions for Special
     * @param action: string
     */
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
                this.openLookupFieldSearchModel();
            }
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Incentive Rule Copy': {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_RULE_CPY);
                if (status) {
                    const id = this.providerIncentiveProgramRuleForm.value.id;
                    if (id) {
                        let ref = this.modalService.open(IncentiveRuleCopyComponent, {
                            size: <any>'xl',
                        });
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance.confirmation.subscribe((result: any) => {
                            this.providerIncentiveProgramRuleForm.patchValue({
                                'id': result.idCopy,
                                'effectiveDate': result.effectiveDateCopy,
                                'lineOfBus': result.lineOfBusCopy,
                                'ipa': result.ipaCopy,
                                'panel': result.panelCopy,
                                'termReason': result.termReasonCopy,
                                'termDate': result.termDateCopy
                            });
                            this.isRuleSelected = false;
                            this.editIncentiveRule = false;
                        });
                    } else {
                        this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('7136: ' + message[0].messageText);
                        });
                    }
                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                    });

                }
                break;
            }
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

    onLookupFieldChange(event: any, id: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(21013).subscribe(res => {
                    this.showPopUp('21013: ' + res[0].messageText.replace('@1', 'ID'), 'Provider Incentive Program Rule')
                })
            } else {
                this.getIncentiveRuleByRuleId(id);
            }
        }
    }

    openReasonLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.reasonModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res && res.REASON_CODE) {
                this.providerIncentiveProgramRuleForm.get('termReason').setValue(res.REASON_CODE);
            }
        });
    }

    onReasonLookupFieldChange(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openReasonLookupFieldSearchModel();
        }
    }

    getIncentiveRuleByRuleId(ruleId: string) {
        let incentiveProgramRuleId = {
            'ruleId': ruleId,
        };
        this.incentiveRuleService.getIncentiveRuleByRuleId(incentiveProgramRuleId).subscribe(
            (incentiveRule) => {
                if (incentiveRule) {
                    this.providerIncentiveRule = incentiveRule;
                    this.getIncentiveProgramRule(this.providerIncentiveRule.seqIncentiveRule);
                    this.getIncentiveQualityProgramRules(this.providerIncentiveRule.seqIncentiveRule);
                    this.showIncentiveProgramRuleFields = true;
                    this.editIncentiveRule = true;
                    this.popUpMessage = null;
                    this.providerIncentiveProgramRuleForm.patchValue({
                        name: this.providerIncentiveRule.description,
                    });
                } else {
                    this.showIncentiveProgramRuleFields = false;
                    this.editIncentiveRule = false;
                    // tslint:disable-next-line:max-line-length
                    this.messageService.findByMessageId(27255).subscribe(res => {
                        let popMsg = new PopUpMessage(
                            'ruleNotExistPopup',
                            'Provider Incentive Program Rule',
                            '27255: ' + res[0].messageText.replace('@1', 'ID :' + ruleId).replace('@2', 'ID :' + ruleId),
                            'icon'
                        );
                        // tslint:disable-next-line:max-line-length
                        popMsg.buttons = [
                            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('no', 'No', 'btn btn-primary'),
                        ];
                        let ref = this.modalService.open(PopUpMessageComponent, {
                            size: 'lg',
                        });
                        ref.componentInstance.popupMessage = popMsg;
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                            this.popUpButtonClicked(event);
                        });
                    });

                }
            },
            (error) => {
                console.log('error');
                this.showIncentiveProgramRuleFields = false;
                this.editIncentiveRule = false;
            }
        );
    }

    popUpButtonClicked(button: any) {
        if (button.name === 'yes') {
            this.showIncentiveProgramRuleFields = true;
            this.providerIncentiveProgramRuleForm.patchValue({
                minimumNumber: 9999,
                effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date())
            })
        }
        if (button.name === 'no') {
            this.showIncentiveProgramRuleFields = false;
            console.log('button No has been click!');
        }
        this.popUpMessage = null;
    }

    saveIncentiveRule() {
        this.saveIncentiveProgramRule();
    }

    getApplyAmountsToValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.QUALITY_CAP_APPLY, CONSTANTS.DW_INRUL_QUALITY_PGR_DE).subscribe(
            (value) => {
                this.amountsToValues = value;
            }
        );
    }

    getQualityProgram() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_QUALITY_PRGM, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.qualityPrograms = systemCodes;
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    createIncentiveProgramRule() {
        this.formValidation.validateForm();
        if (this.providerIncentiveProgramRuleForm.valid) {
            let incentiveRule = new IncentiveRule();
            incentiveRule.ruleId = this.providerIncentiveProgramRuleForm.get('id').value;
            incentiveRule.description = this.providerIncentiveProgramRuleForm.get('description').value;
            incentiveRule.effectiveDate = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'effectiveDate');
            incentiveRule.lineOfBusiness = this.providerIncentiveProgramRuleForm.get('lineOfBus').value;
            incentiveRule.ipaId = this.providerIncentiveProgramRuleForm.get('ipa').value;
            incentiveRule.panelId = this.providerIncentiveProgramRuleForm.get('panel').value;
            incentiveRule.termReason = this.providerIncentiveProgramRuleForm.get('termReason').value;
            incentiveRule.termDate = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'termDate');
            incentiveRule.accessProgramFlag = this.providerIncentiveProgramRuleForm.get('accessProgram').value == true ? 'Y' : 'N';
            incentiveRule.accessMinMembersFlag = this.providerIncentiveProgramRuleForm.get('minimumMembers').value == true ? 'Y' : 'N';
            incentiveRule.accessTotEnrlInLimits = this.providerIncentiveProgramRuleForm.get('totalEnrollWithinLimits').value == true ? 'Y' : 'N';
            incentiveRule.accessLobEnrlInLimits = this.providerIncentiveProgramRuleForm.get('lobEnrollWithLimits').value == true ? 'Y' : 'N';
            incentiveRule.accessLobAcceptsNewMember = this.providerIncentiveProgramRuleForm.get('lobAcceptsNewMembers').value == true ? 'Y' : 'N';
            incentiveRule.accessIncentiveAmount = this.providerIncentiveProgramRuleForm.get('amt').value;
            incentiveRule.accessCapApply = this.providerIncentiveProgramRuleForm.get('applyAmtTo').value;
            incentiveRule.accessIncentivePercent = this.providerIncentiveProgramRuleForm.get('pct').value;
            incentiveRule.accessMinMembersNumber = this.providerIncentiveProgramRuleForm.get('minimumNumber').value;
            incentiveRule.userDate1 = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'userDate1');
            incentiveRule.userDate2 = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'userDate2');
            incentiveRule.userDefined1 = this.providerIncentiveProgramRuleForm.get('userDefined1').value;
            incentiveRule.userDefined2 = this.providerIncentiveProgramRuleForm.get('userDefined2').value;
            this.incentiveRuleService.createIncentiveRule(incentiveRule).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.getIncentiveRuleByRuleId(this.providerIncentiveProgramRuleForm.get('id').value);
                this.editIncentiveRule = true;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateIncentiveProgramRule(seqIncentiveRule: any) {
        this.formValidation.validateForm();
        if (this.providerIncentiveProgramRuleForm.valid) {
            let incentiveRule = new IncentiveRule();
            incentiveRule.ruleId = this.providerIncentiveProgramRuleForm.get('id').value;
            incentiveRule.description = this.providerIncentiveProgramRuleForm.get('description').value;
            incentiveRule.effectiveDate = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'effectiveDate');
            incentiveRule.lineOfBusiness = this.providerIncentiveProgramRuleForm.get('lineOfBus').value;
            incentiveRule.ipaId = this.providerIncentiveProgramRuleForm.get('ipa').value;
            incentiveRule.panelId = this.providerIncentiveProgramRuleForm.get('panel').value;
            incentiveRule.termReason = this.providerIncentiveProgramRuleForm.get('termReason').value;
            incentiveRule.termDate = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'termDate');
            incentiveRule.accessProgramFlag = this.providerIncentiveProgramRuleForm.get('accessProgram').value == true ? 'Y' : 'N';
            incentiveRule.accessMinMembersFlag = this.providerIncentiveProgramRuleForm.get('minimumMembers').value == true ? 'Y' : 'N';
            incentiveRule.accessTotEnrlInLimits = this.providerIncentiveProgramRuleForm.get('totalEnrollWithinLimits').value == true ? 'Y' : 'N';
            incentiveRule.accessLobEnrlInLimits = this.providerIncentiveProgramRuleForm.get('lobEnrollWithLimits').value == true ? 'Y' : 'N';
            incentiveRule.accessLobAcceptsNewMember = this.providerIncentiveProgramRuleForm.get('lobAcceptsNewMembers').value == true ? 'Y' : 'N';
            incentiveRule.accessIncentiveAmount = this.providerIncentiveProgramRuleForm.get('amt').value;
            incentiveRule.accessCapApply = this.providerIncentiveProgramRuleForm.get('applyAmtTo').value;
            incentiveRule.accessIncentivePercent = this.providerIncentiveProgramRuleForm.get('pct').value;
            incentiveRule.accessMinMembersNumber = this.providerIncentiveProgramRuleForm.get('minimumNumber').value;
            incentiveRule.userDate1 = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'userDate1');
            incentiveRule.userDate2 = Form.getDatePickerValue(this.providerIncentiveProgramRuleForm, 'userDate2');
            incentiveRule.userDefined1 = this.providerIncentiveProgramRuleForm.get('userDefined1').value;
            incentiveRule.userDefined2 = this.providerIncentiveProgramRuleForm.get('userDefined2').value;
            this.incentiveRuleService.updateIncentiveRule(incentiveRule, seqIncentiveRule).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editIncentiveRule = true;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveIncentiveProgramRule() {
        if (this.editIncentiveRule) {
            if (this.providerIncentiveProgramRuleForm.get('qualityProgram').value != null) {
                this.createIncentiveQualityProgramRule(this.providerIncentiveRule.seqIncentiveRule);
            }
            this.updateIncentiveProgramRule(this.providerIncentiveRule.seqIncentiveRule);
        } else {
            this.createIncentiveProgramRule();
        }
    }

    getIncentiveProgramRule(seqRuleIncentiveRule) {
        this.incentiveRuleService.getIncentiveRule(seqRuleIncentiveRule).subscribe(incentiveRuleNew => {
            this.providerIncentiveRule = incentiveRuleNew;
            this.providerIncentiveProgramRuleForm.patchValue({
                'id': this.providerIncentiveRule.ruleId,
                'description': this.providerIncentiveRule.description,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.providerIncentiveRule.effectiveDate) ? this.dateFormatPipe.defaultDisplayDateFormat(this.providerIncentiveRule.effectiveDate) : this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
                'lineOfBus': this.providerIncentiveRule.lineOfBusiness,
                'ipa': this.providerIncentiveRule.ipaId,
                'panel': this.providerIncentiveRule.panelId,
                'termReason': this.providerIncentiveRule.termReason,
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.providerIncentiveRule.termDate),
                'accessProgram': this.providerIncentiveRule.accessProgramFlag == 'Y',
                'minimumMembers': this.providerIncentiveRule.accessMinMembersFlag == 'Y',
                'totalEnrollWithinLimits': this.providerIncentiveRule.accessTotEnrlInLimits == 'Y',
                'lobEnrollWithLimits': this.providerIncentiveRule.accessLobEnrlInLimits == 'Y',
                'lobAcceptsNewMembers': this.providerIncentiveRule.accessLobAcceptsNewMember == 'Y',
                'amt': this.providerIncentiveRule.accessIncentiveAmount,
                'applyAmtTo': this.providerIncentiveRule.accessCapApply,
                'pct': this.providerIncentiveRule.accessIncentivePercent,
                'minimumNumber': this.providerIncentiveRule.accessMinMembersNumber,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.providerIncentiveRule.userDate1),
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.providerIncentiveRule.userDate2),
                'userDefined1': this.providerIncentiveRule.userDefined1,
                'userDefined2': this.providerIncentiveRule.userDefined2
            }, {emitEvent: false});
            setTimeout(() => {
                this.isFormControlModified();
            }, 2000)
        });
    }

    createIncentiveQualityProgramRule(seqIncentiveRuleId: number) {
        this.formValidation.validateForm();
        if (this.providerIncentiveProgramRuleForm.valid) {
            let incentiveQualityPgm = new IncentiveQualityPgm();
            incentiveQualityPgm.seqIncentiveRule = seqIncentiveRuleId;
            incentiveQualityPgm.qualityProgram = this.providerIncentiveProgramRuleForm.get('qualityProgram').value;
            incentiveQualityPgm.qualityIncentiveAmount = this.providerIncentiveProgramRuleForm.get('amount').value;
            incentiveQualityPgm.qualityCapApply = this.providerIncentiveProgramRuleForm.get('aplyAmtTo').value;
            incentiveQualityPgm.qualityIncentivePercent = this.providerIncentiveProgramRuleForm.get('percent').value;
            this.incentiveQualityPgmService.createIncentiveQualityPgm(incentiveQualityPgm).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editIncentiveRule = true;
                this.getIncentiveQualityProgramRules(seqIncentiveRuleId);
                this.providerIncentiveProgramRuleForm.patchValue({
                    qualityProgram: null,
                    amount: null,
                    aplyAmtTo: null,
                    percent: null
                });
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

    private getIncentiveQualityProgramRules(seqIncentiveRuleId: number) {
        this.incentiveQualityPgmService.findBySeqIncentiveRule(seqIncentiveRuleId).subscribe(
            (incentiveQualityPgm) => {
                this.incentiveQualityPgmRule = incentiveQualityPgm;
                this.dataGrid001GridOptions.api.setRowData(this.incentiveQualityPgmRule);
                this.isSummaryFunction();
            }
        );

    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Quality Program',
                field: 'qualityProgram',
                width: 200,
                checkboxSelection: true
            },
            {
                headerName: 'Amount',
                field: 'qualityIncentiveAmount',
                width: 200
            },
            {
                headerName: 'Apply Amount To',
                field: 'qualityCapApply',
                width: 200
            },
            {
                headerName: 'Percent',
                field: 'qualityIncentivePercent',
                width: 200
            }
        ];
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerIncentiveProgramRuleForm = this.formBuilder.group({
            id: ['', { updateOn: 'blur', validators: [Validators.required] }],
            name: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            lineOfBus: ['', { updateOn: 'blur', validators: [Validators.required] }],
            ipa: ['', { updateOn: 'blur', validators: [] }],
            panel: ['', { updateOn: 'blur', validators: [] }],
            effectiveDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            termReason: ['', { updateOn: 'blur', validators: [] }],
            accessProgram: ['', { updateOn: 'blur', validators: [] }],
            amt: ['', { updateOn: 'blur', validators: [] }],
            applyAmtTo: ['', { updateOn: 'blur', validators: [] }],
            pct: ['', { updateOn: 'blur', validators: [] }],
            minimumMembers: ['', { updateOn: 'blur', validators: [] }],
            minimumNumber: ['', { updateOn: 'blur', validators: [] }],
            totalEnrollWithinLimits: ['', { updateOn: 'blur', validators: [] }],
            lobEnrollWithLimits: ['', { updateOn: 'blur', validators: [] }],
            lobAcceptsNewMembers: ['', { updateOn: 'blur', validators: [] }],
            userDefined1: ['', { updateOn: 'blur', validators: [] }],
            userDate1: ['', { updateOn: 'blur', validators: [] }],
            userDefined2: ['', { updateOn: 'blur', validators: [] }],
            userDate2: ['', { updateOn: 'blur', validators: [] }],
            dynamicText001: ['', { updateOn: 'blur', validators: [] }],
            dynamicText002: ['', { updateOn: 'blur', validators: [] }],
            dynamicText003: ['', { updateOn: 'blur', validators: [] }],
            qualityProgram: ['', { updateOn: 'blur', validators: [] }],
            amount: ['', { updateOn: 'blur', validators: [] }],
            aplyAmtTo: ['', { updateOn: 'blur', validators: [] }],
            percent: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    lookupLOB(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.LobSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.providerIncentiveProgramRuleForm.get('lineOfBus').setValue(res.lineOfBusiness);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'lineOfBusiness': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.LobSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.providerIncentiveProgramRuleForm.get('lineOfBus').setValue(null);
                }
            });
        }
    }

    lookupIPA(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.ipaModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.providerIncentiveProgramRuleForm.get('ipa').setValue(res.ipaId);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'ipaId': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.ipaModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.providerIncentiveProgramRuleForm.get('ipa').setValue(null);
                }
            });
        }
    }

    lookupPanel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.panelModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.providerIncentiveProgramRuleForm.get('panel').setValue(res.panelId);
                }
            });
        } else if (event.key === 'Tab') {
            let res = [{'panelId': event.target.value}];
            let sm = JSON.parse(JSON.stringify(this.panelModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.providerIncentiveProgramRuleForm.get('panel').setValue(null);
                }
            });
        }
    }

    ShowError(number: any, check: any, value = '1') {
        if (check) {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ':' + message[0].messageText.replace('1@', value),
                        'Provider Incentive Program Rule'
                    );
                });
        } else {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ':' + message[0].messageText,
                        'Provider Incentive Program Rule'
                    );
                });
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
                    this.saveIncentiveRule()
                } else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isSummaryFunction = () => {
        this.isRuleSelected = this.providerIncentiveRule.accessProgramFlag != 'Y';
        this.providerIncentiveProgramRuleForm.get('id').disable();
        this.termReasonStatus = this.providerIncentiveRule.termDate !== undefined;
        this.isMinimumNumberStatus = this.providerIncentiveRule.accessMinMembersFlag !== 'Y';
    };

    isFormControlModified = () => {
        this.providerIncentiveProgramRuleForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        });
    };

    isTermReasonStatusChange = () => {
        this.termReasonStatus = true;
    };

    isShowMinimumNumber = (event) => {
        this.isMinimumNumberStatus = !event.target.checked;
    };

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'INRUL_Incentive_Rule.htm';
    }
}
