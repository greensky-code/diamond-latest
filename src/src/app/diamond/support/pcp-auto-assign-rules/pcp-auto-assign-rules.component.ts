/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit, QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {Form} from '../../../shared/helpers/form.helper';

import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupContactPerson, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';

import {PcpaaRulesHdrService} from '../../../api-services/support/pcpaa-rules-hdr.service';
import {PcpaaRulesDtlService} from '../../../api-services/support/pcpaa-rules-dtl.service';
import {DatePipe} from '@angular/common';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {FormRow, Menu, SearchModel} from '../../../shared/models/models';
import {PcpaaRulesHdr} from '../../../api-models/support/pcpaa-rules-hdr.model';
import {PcpaaRulesDtl} from '../../../api-models/support/pcpaa-rules-dtl.model';
import {PCP_AUTO_ASSIGN_RULES} from '../../../shared/app-constants';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {PcpAutoAssignRuleLookup} from '../../../shared/lookup/pcp-auto-assign-rule-lookup';
import {GridOptions} from 'ag-grid-community';

import {
    ContactPersonFieldNames,
    ContactPersonFormConfig,
    DEFAULT_LANGUAGE, ScreenAttributeFields, ScreenAttributeFormConfig,
    SYSTEM_CODE_PCPAARULETYPE,
    SYSTEM_CODE_PCPRLATTRBDESCR
} from '../../../shared/models/constants';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {PcpaaAttrbMasterService} from "../../../api-services/support/pcpaa-attrb-master.service";
import {
    CONSTANTS,
    getPanelShortcutKeys,
    getPcpAutoAssignRulesShortcutKeys,
    getPcpAutoAssignShortcutKeys
} from '../../../shared/services/shared.service';
import {AuditDisplayComponent} from '../../../shared/components/audit-display/audit-display.component';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the PcpAutoAssignRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pcpautoassignrules',
    templateUrl: './pcp-auto-assign-rules.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        PcpaaRulesHdrService,
        PcpaaRulesDtlService,
        PcpaaAttrbMasterService
    ]

})
export class PcpAutoAssignRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    pcpAutoAssignRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public dataGridGridOptions: GridOptions;
    public secWin: SecWinViewModel;
    private windowId: 'PCPRL';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public isFieldDisabled = false;
    public showFormField: boolean;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = PCP_AUTO_ASSIGN_RULES;
    editPcpaaRulesHdr: boolean;
    pcpaaRulesHdr: PcpaaRulesHdr;
    pcpaaRulesHdrs: PcpaaRulesHdr[];
    editPcpaaRulesDtl: boolean;
    pcpaaRulesDtl: PcpaaRulesDtl;
    pcpaaRulesDtls: PcpaaRulesDtl[];
    ruleTypes: any[] = [];
    attributes: any[] = [];
    dynamicFormAttributes = [];
    dynamicFormScreens = [];
    dynamicFormAttributeList = [];
    dynamicFormScreenList = [];
    attribute: any[] = [];
    searchStatus = false;
    keyNames = 'rule_id';
    keyValues: any;
    @Input() winID?: string;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @ViewChild('ruleIds') ruleIdElem: ElementRef;
    @Input() showIcon = false;
    screenAttributeFormConfig = ScreenAttributeFormConfig;
    isResetForm = false;
    screenAttributeState: Array<FormRow> = [];
    shortcuts: ShortcutInput[] = [];
    pressedKey: any[] = [];
    searchModel = new SearchModel(
        'pcpaaruleshdrs/lookup',
        PcpAutoAssignRuleLookup.PCP_AUTO_ASSIGN_RULE_ALL,
        PcpAutoAssignRuleLookup.PCP_AUTO_ASSIGN_RULE_DEFAULT,
        []
    );
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private datePipe: DatePipe,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private systemCodesService: SystemCodesService,
        private pcpaaRulesHdrService: PcpaaRulesHdrService,
        private pcpaaRulesDtlService: PcpaaRulesDtlService,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private pcpaaAttrbMasterService: PcpaaAttrbMasterService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createDataGrid();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpAutoAssignRulesForm);
        this.getRuleType();
        this.getAttributes();
        this.menuInit();
        this.getDynamicFormScreens();
        this.getDynamicFormAttributes();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        }, 100);
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
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('PCPAA_RULES_DTL', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;

                }
                case 'Open': {
                    this.handleOpenMenu();
                    break;
                }
                case 'Save': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Exit': {
                    this.exitScreen();
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
           // this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    if (this.pcpAutoAssignRulesForm.get('ruleId').value) {
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
        }  else if (event.menu.menuItem == 'Help') {
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
                    { name: 'New', shortcutKey: 'Ctrl + N' },
                    { name: 'Open', shortcutKey: 'Ctrl + O' },
                    { name: 'Save', shortcutKey: 'Ctrl + S' },
                    { name: 'Close', shortcutKey: 'Ctrl + A4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt + A4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z' },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X' },
                    { name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C' },
                    { name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V' },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S' },
                    { name: 'Audit Display', shortcutKey: 'Shift + Alt + A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 PCP Auto Assign Rules' },
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

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
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

    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getPcpaaRulesHdr(id);
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            const ruleType = this.ruleTypes.find(m => m.systemCode.toString() === res.ruleType.toString());          // will give you object of dropdown value
            this.pcpAutoAssignRulesForm.patchValue({
                'ruleId': res.ruleId,
                'ruleType': ruleType.systemCodeDesc2,
                'ruleDescr': res.ruleDescr,
                'ruleId2': res.ruleId,
                'ruleDesc2': res.ruleDescr
            });
            this.getPcpaaRulesDtlByRuleId(res.ruleId);
            this.isFieldDisabled = true;
            this.popUpMessage = null;
        });
    }

    getRuleType() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_PCPAARULETYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.ruleTypes = systemCodes;
        });
    }

    getAttributes() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_PCPRLATTRBDESCR, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.attributes = systemCodes;
        });
    }

    createPcpaaRulesHdr() {
        this.formValidation.validateForm();
        if (this.pcpAutoAssignRulesForm.valid) {
            let pcpaaRulesHdr = new PcpaaRulesHdr();
            pcpaaRulesHdr.ruleId = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleId');
            pcpaaRulesHdr.ruleType = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleType');
            pcpaaRulesHdr.ruleDescr = Form.getValue(this.pcpAutoAssignRulesForm, 'fuleDesc');
            this.pcpaaRulesHdrService.createPcpaaRulesHdr(pcpaaRulesHdr).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editPcpaaRulesHdr = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updatePcpaaRulesHdr(ruleId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.pcpAutoAssignRulesForm.valid) {
                let pcpaaRulesHdr = new PcpaaRulesHdr();
                pcpaaRulesHdr.ruleId = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleId');
                pcpaaRulesHdr.ruleType = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleType');
                pcpaaRulesHdr.ruleDescr = Form.getValue(this.pcpAutoAssignRulesForm, 'fuleDesc');
                this.pcpaaRulesHdrService.updatePcpaaRulesHdr(pcpaaRulesHdr, ruleId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editPcpaaRulesHdr = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    savePcpaaRulesHdr() {
        if (this.editPcpaaRulesHdr) {
            this.updatePcpaaRulesHdr(this.pcpaaRulesHdr.ruleId)
        } else {
            this.createPcpaaRulesHdr();
        }
    }

    deletePcpaaRulesHdr(ruleId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpaaRulesHdrService.deletePcpaaRulesHdr(ruleId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getPcpaaRulesHdr(ruleId: string) {
        this.pcpaaRulesHdrService.getPcpaaRulesHdr(ruleId).subscribe(pcpaaRulesHdr => {
            if (pcpaaRulesHdr) {
                this.showFormField = true;
                this.pcpaaRulesHdr = pcpaaRulesHdr;
                this.keyValues = this.pcpaaRulesHdr.ruleId;
                this.searchStatus = true;
                setTimeout(() => {
                    try {
                        this.pcpaaRulesHdr.updateDatetimeDisplay = this.datePipe.transform(
                            new Date(this.pcpaaRulesHdr.updateDatetime),
                            "yyyy-MM-dd HH:mm:ss"
                        );
                        this.pcpaaRulesHdr.insertDatetimeDisplay = this.datePipe.transform(
                            new Date(this.pcpaaRulesHdr.insertDatetime),
                            "yyyy-MM-dd HH:mm:ss"
                        );
                    } catch (e) {
                        console.log(e);
                    }
                }, 500);
                const ruleType = this.ruleTypes.find(m => m.systemCode.toString() === this.pcpaaRulesHdr.ruleType.toString());
                this.pcpAutoAssignRulesForm.patchValue({
                    'ruleId': this.pcpaaRulesHdr.ruleId,
                    'ruleType': ruleType.systemCodeDesc2,
                    'ruleDescr': this.pcpaaRulesHdr.ruleDescr,
                    'ruleId2': this.pcpaaRulesHdr.ruleId,
                    'ruleDesc2': this.pcpaaRulesHdr.ruleDescr
                });
                this.filterDynamicFormAttributes();
                this.filterDynamicFormScreens();
                setTimeout(() => {
                    this.getPcpaaRulesDtlByRuleId(ruleId);
                }, 500);
            } else {
                this.showFormField = false;
                // tslint:disable-next-line:max-line-length
                let popUpMessage = new PopUpMessage(
                    'ruleNotExistPopup',
                    'PCP Auto Assigned Rules',
                    'Entered rule Id does not exists.',
                    'icon'
                );
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    if (resp.name === 'Ok') {
                        this.activeModal.close();
                    }
                });
            }
        });
    }

    getPcpaaRulesHdrs() {
        this.pcpaaRulesHdrService.getPcpaaRulesHdrs().subscribe(pcpaaRulesHdrs => {
            this.pcpaaRulesHdrs = pcpaaRulesHdrs;
        });
    }

    createPcpaaRulesDtl() {
        this.formValidation.validateForm();
        if (this.pcpAutoAssignRulesForm.valid) {
            let pcpaaRulesDtl = new PcpaaRulesDtl();
            pcpaaRulesDtl.ruleId = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleId');
            this.pcpaaRulesDtlService.createPcpaaRulesDtl(pcpaaRulesDtl).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editPcpaaRulesDtl = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updatePcpaaRulesDtl(seqAttrbId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.pcpAutoAssignRulesForm.valid) {
                let pcpaaRulesDtl = new PcpaaRulesDtl();
                pcpaaRulesDtl.ruleId = Form.getValue(this.pcpAutoAssignRulesForm, 'ruleId');
                this.pcpaaRulesDtlService.updatePcpaaRulesDtl(pcpaaRulesDtl, seqAttrbId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editPcpaaRulesDtl = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    savePcpaaRulesDtl() {
        if (this.editPcpaaRulesDtl) {
            this.updatePcpaaRulesDtl(this.pcpaaRulesDtl.seqAttrbId)
        } else {
            this.createPcpaaRulesDtl();
        }
    }

    deletePcpaaRulesDtl(seqAttrbId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpaaRulesDtlService.deletePcpaaRulesDtl(seqAttrbId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getPcpaaRulesDtl(seqAttrbId: string) {
        this.pcpaaRulesDtlService.getPcpaaRulesDtl(seqAttrbId).subscribe(pcpaaRulesDtl => {
            this.pcpaaRulesDtl = pcpaaRulesDtl;
            this.pcpAutoAssignRulesForm.patchValue({
                'ruleId': this.pcpaaRulesDtl.ruleId,
            });
        });
    }

    getPcpaaRulesDtls() {
        this.pcpaaRulesDtlService.getPcpaaRulesDtls().subscribe(pcpaaRulesDtls => {
            this.pcpaaRulesDtls = pcpaaRulesDtls;
        });
    }

    getPcpaaRulesDtlByRuleId(ruleId: string) {
        this.pcpaaRulesDtlService.findByRuleIdInMap(ruleId).subscribe((rules: PcpaaRulesDtl[]) => {
                this.pcpaaRulesDtls = rules;
                this.dataGridGridOptions.api.setRowData(rules);
                /*this.populateDynamicForm(rules);*/
                this.showFormField = true;

        });
    }

    populateDynamicForm(groupContacts: PcpaaRulesDtl[]) {
        if (!groupContacts || groupContacts.length < 1) {
            return;
        }

        groupContacts.forEach((groupContact: PcpaaRulesDtl) => {
            let mockConfig = JSON.parse(JSON.stringify(this.screenAttributeFormConfig));    // make a copy of original config
            this.screenAttributeFormConfig.forEach((field, index) => {
                if (field.name === ScreenAttributeFields.SCREEN) {
                    mockConfig[index].value = groupContact.pcpaaAttrbMaster.winId;
                    mockConfig[index].options = this.dynamicFormScreens;
                    field.options = this.dynamicFormScreens;
                } else if (field.name === ScreenAttributeFields.ATTRIBUTE) {
                    mockConfig[index].options = this.dynamicFormAttributes;
                    field.options = this.dynamicFormAttributes;
                    mockConfig[index].value = groupContact.pcpaaAttrbMaster.attrbId;
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.screenAttributeState.push(formState);          // add record
        })
        this.screenAttributeState = JSON.parse(JSON.stringify(this.screenAttributeState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        console.log(this.screenAttributeState);
    }

    createDataGrid(): void {

        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
                  // will give you object of dropdown value

        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
        {
                headerName: 'Screen',
                field: 'winId',
                width: 225,
                headerCheckboxSelectionFilteredOnly: true,
            headerClass: 'clr-blue'
            },
            {
                headerName: 'Attribute',
                field: 'attrbId',
                width: 250,
                headerClass: 'clr-blue'
            },
            {
                headerName: 'Urban To Miles',
                field: 'urbanToMiles',
                width: 225
            },
            {
                headerName: 'Rural To Miles',
                field: 'ruralToMiles',
                width: 200
            },
            {
                headerName: 'Operator',
                field: 'operator',
                width: 200
            },
            {
                headerName: 'Value',
                field: 'value',
                width: 200
            }
        ];
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpAutoAssignRulesForm = this.formBuilder.group({
            ruleId: ['', {updateOn: 'blur', validators: []}],
            ruleType: ['', {updateOn: 'blur', validators: []}],
            ruleDescr: ['', {updateOn: 'blur', validators: []}],
            ruleId2: ['', {updateOn: 'blur', validators: []}],
            ruleDesc2: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    saveScreenAttribute(event) {

    }

    getDynamicFormAttributes() {
        this.pcpaaRulesHdrService.getScreenAttributes().subscribe((res) => {
            this.dynamicFormAttributeList = (res && res.length > 0) ? res : [];
        });
    }

    filterDynamicFormAttributes() {
        this.dynamicFormAttributes = [];
        console.log(this.pcpAutoAssignRulesForm.value.ruleType);
        if (this.dynamicFormAttributeList && this.dynamicFormAttributeList.length > 0) {
            for ( let i = 0 ; i < this.dynamicFormAttributeList.length; i++) {
                if (this.dynamicFormAttributeList[i].ruleType === this.pcpAutoAssignRulesForm.value.ruleType) {
                    this.dynamicFormAttributes.push(this.dynamicFormAttributeList[i]);
                }
            }
        }
        console.log(this.dynamicFormAttributes);
    }

    getDynamicFormScreens() {
        this.pcpaaAttrbMasterService.getPcpaaAttrbMasters().subscribe((res) => {
            this.dynamicFormScreenList = (res && res.length > 0) ? res : [];
        });
    }

    filterDynamicFormScreens() {
        this.dynamicFormScreens = [];
        if (this.dynamicFormScreenList && this.dynamicFormScreenList.length > 0) {
            for ( let i = 0 ; i < this.dynamicFormScreenList.length; i++) {
                if (this.dynamicFormScreenList[i].ruleType === this.pcpAutoAssignRulesForm.value.ruleType) {
                    this.dynamicFormScreens.push({ key: this.dynamicFormScreenList[i].winId, value: this.dynamicFormScreenList[i].winId });
                }
            }
        }
        console.log(this.dynamicFormScreens);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPcpAutoAssignRulesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PCPRL_PCP_Auto_Assign_Rules.htm';
    }

    openAuditDisplayComponent() {
        if (this.searchStatus) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.winID
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: 'lg',
                });
                ref.componentInstance.keyNames = this.keyNames;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.winID;
                ref.componentInstance.win = 'dw_pcprl_hdr_de';
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(11073)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.toastService.showToast('11073: ' + message[0].messageText, NgbToastType.Danger);
                    });
            }
        } else {
            this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.toastService.showToast('30164: ' + message[0].messageText, NgbToastType.Danger);
                });
        }
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
        ref.componentInstance.insertDateTime = this.pcpaaRulesHdr.insertDatetime;
        ref.componentInstance.insertDateTime = this.pcpaaRulesHdr.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.pcpaaRulesHdr.insertProcess;
        ref.componentInstance.insertUser = this.pcpaaRulesHdr.insertUser;
        ref.componentInstance.updateUser = this.pcpaaRulesHdr.updateUser;
        ref.componentInstance.updateDateTime = this.pcpaaRulesHdr.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.pcpaaRulesHdr.updateProcess;
    }


    handleOpenMenu() {
        this.pcpAutoAssignRulesForm.reset();
        this.showFormField = false;
        this.isFieldDisabled = false;
        this.dataGridGridOptions.api.setRowData([]);
        this.ruleIdElem.nativeElement.focus();
    }

    modalClose() {
        this.activeModal.close();
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
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
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
}
