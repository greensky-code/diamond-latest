/* Copyright (c) 2021 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClmDtlAuthProcLnkRule, MessageMasterDtl, SecUser } from '../../../api-models';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SecurityService } from "../../../shared/services/security.service";
import { MessageMasterDtlService, SecUserService } from "../../../api-services";
import { SecWin } from '../../../api-models';
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { ClmDtlAuthProcLnkRuleService } from '../../../api-services';
import { Menu, SearchModel } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { getClaimDetailAuthProcRulesShortcutKeys } from '../../../shared/services/shared.service';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { ClaimDetailAuthProcRuleLookup } from '../../../shared/lookup/claim-detail-auth-proc-rule-lookup';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the ClaimDetailAuthProcRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'app-claim-detail-auth-proc-rule',
    templateUrl: './claim-detail-auth-proc-rule.component.html',

    providers: [
        ClmDtlAuthProcLnkRuleService
    ],
})
export class ClaimDetailAuthProcRuleComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimDetailAuthProcRuleForm: FormGroup;
    formValidation: FormValidation;
    showFiledValues: boolean = false;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;
    secColDetails: SecColDetail[] = [];
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    submtVsAuthProcCodeVal: any;
    authProcStatusVal: any;
    editClmDtlAuthProcLnkRule: boolean = true;
    clmDtlAuthProcLnkRule: ClmDtlAuthProcLnkRule;
    clmDtlAuthProcLnkRules: ClmDtlAuthProcLnkRule[];
    submtVsAuthProcCodes: any[] = [];
    authProcStatuses: any[] = [];
    popupClose: Boolean = false;
    closeStatus: Boolean = false;

    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private clmDtlAuthProcLnkRuleService: ClmDtlAuthProcLnkRuleService,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
    ) {

    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimDetailAuthProcRulesShortcutKeys(this));
        this.cdr.detectChanges();
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

    getSubmtVsAuthProcCodes() {
        this.clmDtlAuthProcLnkRuleService.getSubmtVsAuthProcCodes(0).subscribe(codes => {
            this.submtVsAuthProcCodes = codes;
        });
    }

    getAuthProcStatuses() {
        this.clmDtlAuthProcLnkRuleService.getAuthProcStatuses(0).subscribe(codes => {
            this.authProcStatuses = codes;
        });
    }

    createClmDtlAuthProcLnkRule() {
        this.formValidation.validateForm();
        if (this.claimDetailAuthProcRuleForm.valid) {
            let clmDtlAuthProcLnkRule = new ClmDtlAuthProcLnkRule();
            clmDtlAuthProcLnkRule.ruleId = Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId');
            clmDtlAuthProcLnkRule.description = Form.getValue(this.claimDetailAuthProcRuleForm, 'description');
            clmDtlAuthProcLnkRule.submtVsAuthProcCode = Form.getValue(this.claimDetailAuthProcRuleForm, 'submtVsAuthProcCode');
            clmDtlAuthProcLnkRule.priceOnAuthProcCode = Form.getValue(this.claimDetailAuthProcRuleForm, 'priceOnAuthProc');
            clmDtlAuthProcLnkRule.authProcCodeStatus = Form.getValue(this.claimDetailAuthProcRuleForm, 'authProcStatus');
            clmDtlAuthProcLnkRule.insertUser = this.securityService.getCurrentUserToken().sub ? this.securityService.getCurrentUserToken().sub : "Unauthorized";
            clmDtlAuthProcLnkRule.insertDatetime = new Date();
            clmDtlAuthProcLnkRule.insertProcess = 'CDAPR';
            this.clmDtlAuthProcLnkRuleService.getClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule.ruleId).subscribe(response => {
                if (response !== null) {
                    this.alertMessage = this.alertMessageService.info("Rule ID already exists.");
                } else {
                    /*     if (this.secWin.hasInsertPermission()) {*/
                    this.formValidation.validateForm();
                    if (this.claimDetailAuthProcRuleForm.valid) {
                        let clmDtlAuthProcLnkRule = new ClmDtlAuthProcLnkRule();
                        clmDtlAuthProcLnkRule.ruleId = Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId');
                        clmDtlAuthProcLnkRule.description = Form.getValue(this.claimDetailAuthProcRuleForm, 'description');
                        var priceOn;
                        if (
                          Form.getValue(
                            this.claimDetailAuthProcRuleForm,
                            "priceOnAuthProc"
                          ) == true
                        ) {
                          priceOn = "Y";
                        } else {
                          priceOn = "N";
                        }

                        clmDtlAuthProcLnkRule.submtVsAuthProcCode = Form.getValue(
                          this.claimDetailAuthProcRuleForm,
                          "submtVsAuthProcCode"
                        );
                        clmDtlAuthProcLnkRule.priceOnAuthProcCode = priceOn;
                        clmDtlAuthProcLnkRule.authProcCodeStatus = Form.getValue(this.claimDetailAuthProcRuleForm, 'authProcStatus');
                        clmDtlAuthProcLnkRule.insertUser = this.securityService.getCurrentUserToken().sub ? this.securityService.getCurrentUserToken().sub : "Unauthorized";
                        clmDtlAuthProcLnkRule.insertDatetime = new Date();
                        clmDtlAuthProcLnkRule.insertProcess = 'CDAPR';
                        this.clmDtlAuthProcLnkRuleService.getClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule.ruleId).subscribe(response => {
                            if (response !== null) {
                                this.alertMessage = this.alertMessageService.info("Rule ID already exists.");
                            } else {
                                this.clmDtlAuthProcLnkRuleService.createClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule).subscribe(response => {
                                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                                    this.editClmDtlAuthProcLnkRule = true;
                                    if (this.closeStatus === true) {
                                        setTimeout(() => {
                                            this.activeModal.close()
                                        }, 2000)
                                    }
                                    this.popupClose = false;
                                })
                            }
                        }, error => {
                            this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                        });
                    } else {
                        this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
                    }
                }
            })
        }
    }

    updateClmDtlAuthProcLnkRule(ruleId: string) {

        this.formValidation.validateForm();
        if (this.claimDetailAuthProcRuleForm.valid) {
            let clmDtlAuthProcLnkRule = new ClmDtlAuthProcLnkRule();
            clmDtlAuthProcLnkRule.ruleId = Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId');
            clmDtlAuthProcLnkRule.description = Form.getValue(this.claimDetailAuthProcRuleForm, 'description');
            var priceOn;
            if (
              Form.getValue(
                this.claimDetailAuthProcRuleForm,
                "priceOnAuthProc"
              ) == true
            ) {
              priceOn = "Y";
            } else {
              priceOn = "N";
            }

            clmDtlAuthProcLnkRule.submtVsAuthProcCode = Form.getValue(this.claimDetailAuthProcRuleForm, 'submtVsAuthProcCode');
            clmDtlAuthProcLnkRule.priceOnAuthProcCode = priceOn;
            clmDtlAuthProcLnkRule.authProcCodeStatus = Form.getValue(this.claimDetailAuthProcRuleForm, 'authProcStatus');
            clmDtlAuthProcLnkRule.updateUser = this.securityService.getCurrentUserToken().sub ? this.securityService.getCurrentUserToken().sub : "Unauthorized";
            clmDtlAuthProcLnkRule.updateDatetime = new Date();
            clmDtlAuthProcLnkRule.updateProcess = 'CDAPR';
            this.clmDtlAuthProcLnkRuleService.updateClmDtlAuthProcLnkRule(clmDtlAuthProcLnkRule, ruleId).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editClmDtlAuthProcLnkRule = false;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveClmDtlAuthProcLnkRule() {
        if (this.editClmDtlAuthProcLnkRule) {
            this.updateClmDtlAuthProcLnkRule(this.clmDtlAuthProcLnkRule.ruleId)
        } else {
            this.createClmDtlAuthProcLnkRule();
        }
    }

    deleteClmDtlAuthProcLnkRule(ruleId: string) {
        // if (!(this.secWin && this.secWin.hasDeletePermission())) {
        //     this.showPopUp('Not permitted to delete', 'Group Master Security');
        // } else {
        this.clmDtlAuthProcLnkRuleService.deleteClmDtlAuthProcLnkRule(ruleId).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            this.createForm();
        });
        // }
    }

    getClmDtlAuthProcLnkRule(ruleId: string) {
        this.clmDtlAuthProcLnkRuleService.getClmDtlAuthProcLnkRule(ruleId).subscribe(clmDtlAuthProcLnkRule => {
            this.clmDtlAuthProcLnkRule = clmDtlAuthProcLnkRule;
            this.showFiledValues = true;
            var priceOn;
            priceOn = this.clmDtlAuthProcLnkRule.priceOnAuthProcCode == 'Y';
              this.claimDetailAuthProcRuleForm.patchValue({
                ruleId: this.clmDtlAuthProcLnkRule.ruleId,
                description: this.clmDtlAuthProcLnkRule.description,
                submtVsAuthProcCode: this.clmDtlAuthProcLnkRule
                  .submtVsAuthProcCode,
                priceOnAuthProc: priceOn,
                authProcStatus: this.clmDtlAuthProcLnkRule.authProcCodeStatus,
              }, {emitEvent: false});
        });
        this.claimDetailAuthProcRuleForm.get('ruleId').disable();
        this.isFormValidateStatus();
    }

    getClmDtlAuthProcLnkRules() {
        this.clmDtlAuthProcLnkRuleService.getClmDtlAuthProcLnkRules().subscribe(clmDtlAuthProcLnkRules => {
            this.clmDtlAuthProcLnkRules = clmDtlAuthProcLnkRules;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDetailAuthProcRuleForm);
        this.initializeComponentState();
        this.menuInit();
        this.getClmDtlAuthProcLnkRules();
        this.getSubmtVsAuthProcCodes();
        this.getAuthProcStatuses();
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }

        let userId = null;

        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
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
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }
        //to check function level security
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimDetailAuthProcRuleForm);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDetailAuthProcRuleForm = this.formBuilder.group({
            ruleId: ['', { updateOn: 'blur', validators: [Validators.required] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            submtVsAuthProcCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
            priceOnAuthProc: ['', { updateOn: 'blur', validators: [] }],
            authProcStatus: ['', { updateOn: 'blur', validators: [Validators.required] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    searchModel = new SearchModel('claimdetailauthproclnkrule/lookup',
        ClaimDetailAuthProcRuleLookup.CLAIM_DETAIL_AUTH_PROC_RULE_DEFAULT,
        ClaimDetailAuthProcRuleLookup.CLAIM_DETAIL_AUTH_PROC_RULE_ALL,
        []);

    onLookupFieldChange(event: any, id: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.getClmDtlAuthProcLnkRule(id);
        }
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((resp: any) => {
            if (resp != null) {
                this.clmDtlAuthProcLnkRule = resp;
                this.getClmDtlAuthProcLnkRule(this.clmDtlAuthProcLnkRule.ruleId);
                this.editClmDtlAuthProcLnkRule = true;
                this.popUpMessage = null;
                this.claimDetailAuthProcRuleForm.patchValue({
                    name: resp.description,
                });
            }
        })
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
                    this.saveClmDtlAuthProcLnkRule();
                } else {
                    this.showFiledValues = false;
                    this.claimDetailAuthProcRuleForm.reset();
                }
            }
        });
    }

    createNewClmDtlAuthProcRule() {
        if (Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId') && Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId') !== '') {
            this.showFiledValues = true;
            this.editClmDtlAuthProcLnkRule = false;
            const ruleId: string = Form.getValue(this.claimDetailAuthProcRuleForm, 'ruleId');
            this.claimDetailAuthProcRuleForm.reset();
            this.claimDetailAuthProcRuleForm.controls['ruleId'].setValue(ruleId);
            this.claimDetailAuthProcRuleForm.controls['submtVsAuthProcCode'].setValue('E');
            this.claimDetailAuthProcRuleForm.controls['authProcStatus'].setValue('OP');
        } else {
            this.showPopUp(
                '8056: A Rule ID must be specified before a new record can be created.',
                'Claim Detail Auth Proc Rules'
            );
        }
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {             // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewClmDtlAuthProcRule();
                    break;
                }
                case 'Open': {
                    this.getClmDtlAuthProcLnkRule(this.clmDtlAuthProcLnkRule.ruleId);
                    break;
                }
                case 'Delete': {
                    this.deletePopupAlert();
                    break;
                }
                case "Save": {
                    this.saveClmDtlAuthProcLnkRule();
                    break;
                }
                case 'Close': {
                    if (this.claimDetailAuthProcRuleForm.dirty) {
                        this.showEditConfirmation();
                    } else {
                        this.showFiledValues = false;
                        this.claimDetailAuthProcRuleForm.reset();
                    }
                    break;
                }
                case 'Shortcut Menu...': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            switch (event.action) {
                case 'Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
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
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New' }, { name: 'Open' }, { name: 'Delete' }, { name: 'Save' }, { name: 'Close' },
                { isHorizontal: true }, { name: 'Main Menu...' }, { name: 'Shortcut Menu...' },
                { isHorizontal: true }, { name: 'Print', disabled: true },
                { isHorizontal: true }, { name: 'Exit' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true }, { isHorizontal: true }, { name: 'Cut', disabled: true },
                { name: 'Copy', disabled: true }, { name: 'Paste', disabled: true }, { isHorizontal: true },
                { name: 'Lookup' }]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' }, { name: 'Layer' }, { name: 'Cascade' }, { name: 'Arrange Icons' },
                    { name: '1 Main Menu' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    };

    onSbmtVsAuthOrProcChange(elem: any) {
        //this.claimDetailAuthProcRuleForm.controls['submtVsAuthProcCode'].setValue(elem.key);
    };

    onAuthProcStatusChange(elem: any) {
        //this.claimDetailAuthProcRuleForm.controls['authProcStatus'].setValue(elem.key);
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Claim Detail Auth Proc Link')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveClmDtlAuthProcLnkRule()
                }
                else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    deletePopupAlert = () => {
        let popUpMessage = new PopUpMessage(
            'Claim Detail Auth Proc Rules',
            'Claim Detail Auth Proc Rules',
            '29070: Press yes to delete this record',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'OK') {
                this.deleteClmDtlAuthProcLnkRule(this.clmDtlAuthProcLnkRule.ruleId);
            }
        });
    };

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CDAPR_Claims_Detail_Authorization_Procedure_Rules.htm'
    };

    isFormValidateStatus = () => {
        this.claimDetailAuthProcRuleForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
