/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {ClaimsDuplicateRule} from '../../../api-models/support/claims-duplicate-rule.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu} from '../../../shared/models/models';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {ClaimsDuplicateRuleService} from '../../../api-services/support/claims-duplicate-rule.service';
import {Form} from '../../../shared/helpers/form.helper';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService} from '../../../api-services';
import {AWAVE_MODULE_ID} from '../../../shared/app-constants';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    getClaimDuplicateCheckRulesShortcutKeys,
    getDiagnosisCodeShortcutKeys
} from "../../../shared/services/shared.service";
import {MenuResponse} from "../../../api-models/menu-response";
import {MenuService} from "../../../shared/services/menu.service";

// Use the Component directive to define the ClaimDuplicateCheckRulesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'claimduplicatecheckrules',
    templateUrl: './claim-duplicate-check-rules.component.html',
    styleUrls: ['./claim-duplicate-check-rules.component.scss'],
    providers: [ClaimsDuplicateRuleService, DddwDtlService, ReasonCodeMasterService]
})
export class ClaimDuplicateCheckRulesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimDuplicateCheckRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    editClaimsDuplicateRule: boolean = false;
    claimsDuplicateRule: ClaimsDuplicateRule;
    claimsDuplicateRules: ClaimsDuplicateRule[];
    secColDetails = new Array<SecColDetail>();
    moduleId = AWAVE_MODULE_ID;
    isProgress = true;
    menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    private windowId = 'DUPRL';
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    userTemplateId: any;
    action1Options: any[];
    action2Options: any[];
    action3Options: any[];
    isLoadAction1 = false;
    isLoadAction2 = false;
    isLoadAction3 = false;
    reasonCode1Options: any[];
    reasonCode2Options: any[];
    reasonCode3Options: any[];
    claimTypes: any[];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    public shortcuts: ShortcutInput[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

// Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private toastr: ToastService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private customValidators: CustomValidators,
        private dddwDtlService: DddwDtlService,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private messageService: MessageMasterDtlService,
        private cdr: ChangeDetectorRef,
        private menuSerrvice: MenuService,
        private claimsDuplicateRuleService: ClaimsDuplicateRuleService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
// rather than in the constructor for this class in order to ensure that the

// resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.secProgress = false;
        this.formValidation = new FormValidation(this.claimDuplicateCheckRulesForm);
        this.initializePermission();
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
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createClaimsDuplicateRule() {
        //    hasInsertPermission()
        this.formValidation.validateForm();
        if (this.claimDuplicateCheckRulesForm.valid) {
            let claimsDuplicateRule = new ClaimsDuplicateRule();
            claimsDuplicateRule.claimsDuplicateRulePrimaryKey = {
                claimType: Form.getValue(this.claimDuplicateCheckRulesForm, 'claimType'),
                claimDupRule: Form.getValue(this.claimDuplicateCheckRulesForm, 'dupRule')
            };
            claimsDuplicateRule.claimsDuplicateRulePrimaryKeyModel = claimsDuplicateRule.claimsDuplicateRulePrimaryKey;
            claimsDuplicateRule.description = Form.getValue(this.claimDuplicateCheckRulesForm, 'desc');
            claimsDuplicateRule.primDtUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos001') ? 'Y' : 'N';
            claimsDuplicateRule.primDtUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos002') ? 'Y' : 'N';
            claimsDuplicateRule.primDtUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos003') ? 'Y' : 'N';
            claimsDuplicateRule.primDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos001');
            claimsDuplicateRule.primDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos002');
            claimsDuplicateRule.primDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos003');
            claimsDuplicateRule.primDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos001');
            claimsDuplicateRule.primDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos002');
            claimsDuplicateRule.primDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos003');
            claimsDuplicateRule.sameSrvProv1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider001') ? 'Y' : 'N';
            claimsDuplicateRule.sameSrvProv2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider002') ? 'Y' : 'N';
            claimsDuplicateRule.sameSrvProv3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider003') ? 'Y' : 'N';
            claimsDuplicateRule.sameTotBill1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled001') ? 'Y' : 'N';
            claimsDuplicateRule.sameTotBill2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled002') ? 'Y' : 'N';
            claimsDuplicateRule.sameTotBill3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled003') ? 'Y' : 'N';
            claimsDuplicateRule.samePlcServ1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService001') ? 'Y' : 'N';
            claimsDuplicateRule.samePlcServ2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService002') ? 'Y' : 'N';
            claimsDuplicateRule.samePlcServ3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService003') ? 'Y' : 'N';
            claimsDuplicateRule.specDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos004');
            claimsDuplicateRule.specDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos005');
            claimsDuplicateRule.specDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos006');
            claimsDuplicateRule.specDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos004');
            claimsDuplicateRule.specDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos005');
            claimsDuplicateRule.specDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos006');
            claimsDuplicateRule.specDateUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos001') ? 'Y' : 'N';
            claimsDuplicateRule.specDateUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos002') ? 'Y' : 'N';
            claimsDuplicateRule.specDateUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos003') ? 'Y' : 'N';
            claimsDuplicateRule.sameBillAmt1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount001') ? 'Y' : 'N';
            claimsDuplicateRule.sameBillAmt2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount002') ? 'Y' : 'N';
            claimsDuplicateRule.sameBillAmt3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount003') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode001') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode002') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode003') ? 'Y' : 'N';
            claimsDuplicateRule.sameMedDef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef001') ? 'Y' : 'N';
            claimsDuplicateRule.sameMedDef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef002') ? 'Y' : 'N';
            claimsDuplicateRule.sameMedDef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef003') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcMod1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier001') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcMod2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier002') ? 'Y' : 'N';
            claimsDuplicateRule.sameProcMod3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier003') ? 'Y' : 'N';
            claimsDuplicateRule.action1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action002');
            claimsDuplicateRule.action2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action003');
            claimsDuplicateRule.action3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action004');
            claimsDuplicateRule.reasonCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode001');
            claimsDuplicateRule.reasonCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode002');
            claimsDuplicateRule.reasonCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode003');
            console.log(claimsDuplicateRule);
            this.claimsDuplicateRuleService.createClaimsDuplicateRule(claimsDuplicateRule).subscribe(response => {
                this.toastr.showToast('Record successfully created.', NgbToastType.Success);
                this.editClaimsDuplicateRule = true;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
                this.getClaimsDuplicateRules(true);
            });

        } else {
            this.toastr.showToast('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.', NgbToastType.Danger);
        }
        // } else { }
    }

    updateClaimsDuplicateRule(claimDupRule: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            console.log(this.claimDuplicateCheckRulesForm);
            console.log(this.claimDuplicateCheckRulesForm.errors);
            if (this.claimDuplicateCheckRulesForm.valid) {
                let claimsDuplicateRule = new ClaimsDuplicateRule();
                claimsDuplicateRule.claimsDuplicateRulePrimaryKey = {
                    claimType: Form.getValue(this.claimDuplicateCheckRulesForm, 'claimType'),
                    claimDupRule: Form.getValue(this.claimDuplicateCheckRulesForm, 'dupRule')
                };
                claimsDuplicateRule.claimsDuplicateRulePrimaryKeyModel = claimsDuplicateRule.claimsDuplicateRulePrimaryKey;
                claimsDuplicateRule.description = Form.getValue(this.claimDuplicateCheckRulesForm, 'desc');
                claimsDuplicateRule.primDtUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos001') ? 'Y' : 'N';
                claimsDuplicateRule.primDtUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos002') ? 'Y' : 'N';
                claimsDuplicateRule.primDtUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'primaryDos003') ? 'Y' : 'N';
                claimsDuplicateRule.primDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos001');
                claimsDuplicateRule.primDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos002');
                claimsDuplicateRule.primDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos003');
                claimsDuplicateRule.primDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos001');
                claimsDuplicateRule.primDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos002');
                claimsDuplicateRule.primDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos003');
                claimsDuplicateRule.sameSrvProv1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider001') ? 'Y' : 'N';
                claimsDuplicateRule.sameSrvProv2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider002') ? 'Y' : 'N';
                claimsDuplicateRule.sameSrvProv3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'provider003') ? 'Y' : 'N';
                claimsDuplicateRule.sameTotBill1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled001') ? 'Y' : 'N';
                claimsDuplicateRule.sameTotBill2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled002') ? 'Y' : 'N';
                claimsDuplicateRule.sameTotBill3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'totalBilled003') ? 'Y' : 'N';
                claimsDuplicateRule.samePlcServ1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService001') ? 'Y' : 'N';
                claimsDuplicateRule.samePlcServ2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService002') ? 'Y' : 'N';
                claimsDuplicateRule.samePlcServ3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'placeOfService003') ? 'Y' : 'N';
                claimsDuplicateRule.specDtDaysBef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos004');
                claimsDuplicateRule.specDtDaysBef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos005');
                claimsDuplicateRule.specDtDaysBef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysBeforeDos006');
                claimsDuplicateRule.specDtDaysAft1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos004');
                claimsDuplicateRule.specDtDaysAft2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos005');
                claimsDuplicateRule.specDtDaysAft3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'daysAfterDos006');
                claimsDuplicateRule.specDateUsed1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos001') ? 'Y' : 'N';
                claimsDuplicateRule.specDateUsed2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos002') ? 'Y' : 'N';
                claimsDuplicateRule.specDateUsed3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'detailDos003') ? 'Y' : 'N';
                claimsDuplicateRule.sameBillAmt1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount001') ? 'Y' : 'N';
                claimsDuplicateRule.sameBillAmt2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount002') ? 'Y' : 'N';
                claimsDuplicateRule.sameBillAmt3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'billedAmount003') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode001') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode002') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procedureCode003') ? 'Y' : 'N';
                claimsDuplicateRule.sameMedDef1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef001') ? 'Y' : 'N';
                claimsDuplicateRule.sameMedDef2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef002') ? 'Y' : 'N';
                claimsDuplicateRule.sameMedDef3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'medDef003') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcMod1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier001') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcMod2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier002') ? 'Y' : 'N';
                claimsDuplicateRule.sameProcMod3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'procModifier003') ? 'Y' : 'N';
                claimsDuplicateRule.action1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action002');
                claimsDuplicateRule.action2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action003');
                claimsDuplicateRule.action3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'action004');
                claimsDuplicateRule.reasonCode1 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode001');
                claimsDuplicateRule.reasonCode2 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode002');
                claimsDuplicateRule.reasonCode3 = Form.getValue(this.claimDuplicateCheckRulesForm, 'reasonCode003');
                console.log(claimsDuplicateRule);
                this.claimsDuplicateRuleService.updateClaimsDuplicateRule(claimsDuplicateRule, claimsDuplicateRule.claimsDuplicateRulePrimaryKey.claimType,
                        claimsDuplicateRule.claimsDuplicateRulePrimaryKey.claimDupRule).subscribe(response => {
                    this.toastr.showToast('Record successfully updated.', NgbToastType.Success);
                    this.editClaimsDuplicateRule = true;
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                    this.isFormDataChangeStatus = false;
                });
            } else {
                this.toastr.showToast('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.', NgbToastType.Danger);
            }
        /*} else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }*/
    }

    saveClaimsDuplicateRule() {
        if (this.editClaimsDuplicateRule) {
            this.updateClaimsDuplicateRule(this.claimsDuplicateRule.claimDupRule)
        } else {
            this.createClaimsDuplicateRule();
        }
    }

    deleteClaimsDuplicateRule(claimDupRule: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.claimsDuplicateRuleService.deleteClaimsDuplicateRule(claimDupRule).subscribe(response => {
                this.toastr.showToast('Record successfully deleted.', NgbToastType.Success);
            });
        }
    }

    getClaimsDuplicateRule(claimDupRule: string) {
        this.claimsDuplicateRuleService.getClaimsDuplicateRule(claimDupRule).subscribe(claimsDuplicateRule => {
            this.claimsDuplicateRule = claimsDuplicateRule;
            this.setDataToForm();
        });
    }

    setDataToForm() {
        this.claimDuplicateCheckRulesForm.patchValue({
            'desc': this.claimsDuplicateRule.description,
            'claimType': this.claimsDuplicateRule.claimsDuplicateRulePrimaryKey.claimType,
            'dupRule': this.claimsDuplicateRule.claimsDuplicateRulePrimaryKey.claimDupRule,
            'primaryDos001': (this.claimsDuplicateRule.primDtUsed1 && this.claimsDuplicateRule.primDtUsed1 === 'Y'),
            'primaryDos002': (this.claimsDuplicateRule.primDtUsed2 && this.claimsDuplicateRule.primDtUsed2 === 'Y'),
            'primaryDos003': (this.claimsDuplicateRule.primDtUsed3 && this.claimsDuplicateRule.primDtUsed3 === 'Y'),
            'daysBeforeDos001': this.claimsDuplicateRule.primDtDaysBef1,
            'daysBeforeDos002': this.claimsDuplicateRule.primDtDaysBef2,
            'daysBeforeDos003': this.claimsDuplicateRule.primDtDaysBef3,
            'daysAfterDos001': this.claimsDuplicateRule.primDtDaysAft1,
            'daysAfterDos002': this.claimsDuplicateRule.primDtDaysAft2,
            'daysAfterDos003': this.claimsDuplicateRule.primDtDaysAft3,
            'provider001': (this.claimsDuplicateRule.sameSrvProv1 && this.claimsDuplicateRule.sameSrvProv1 === 'Y'),
            'provider002': (this.claimsDuplicateRule.sameSrvProv2 && this.claimsDuplicateRule.sameSrvProv2 === 'Y'),
            'provider003': (this.claimsDuplicateRule.sameSrvProv3 && this.claimsDuplicateRule.sameSrvProv3 === 'Y'),
            'totalBilled001': (this.claimsDuplicateRule.sameTotBill1 && this.claimsDuplicateRule.sameTotBill1 === 'Y'),
            'totalBilled002': (this.claimsDuplicateRule.sameTotBill2 && this.claimsDuplicateRule.sameTotBill2 === 'Y'),
            'totalBilled003': (this.claimsDuplicateRule.sameTotBill3 && this.claimsDuplicateRule.sameTotBill3 === 'Y'),
            'placeOfService001': (this.claimsDuplicateRule.samePlcServ1 && this.claimsDuplicateRule.samePlcServ1 === 'Y'),
            'placeOfService002': (this.claimsDuplicateRule.samePlcServ2 && this.claimsDuplicateRule.samePlcServ2 === 'Y'),
            'placeOfService003': (this.claimsDuplicateRule.samePlcServ3 && this.claimsDuplicateRule.samePlcServ3 === 'Y'),
            'detailDos001': (this.claimsDuplicateRule.specDateUsed1 && this.claimsDuplicateRule.specDateUsed1 === 'Y'),
            'detailDos002': (this.claimsDuplicateRule.specDateUsed2 && this.claimsDuplicateRule.specDateUsed2 === 'Y'),
            'detailDos003': (this.claimsDuplicateRule.specDateUsed3 && this.claimsDuplicateRule.specDateUsed3 === 'Y'),
            'daysBeforeDos004': this.claimsDuplicateRule.specDtDaysBef1,
            'daysBeforeDos005': this.claimsDuplicateRule.specDtDaysBef2,
            'daysBeforeDos006': this.claimsDuplicateRule.specDtDaysBef3,
            'daysAfterDos004': this.claimsDuplicateRule.specDtDaysAft1,
            'daysAfterDos005': this.claimsDuplicateRule.specDtDaysAft2,
            'daysAfterDos006': this.claimsDuplicateRule.specDtDaysAft3,
            'billedAmount001': (this.claimsDuplicateRule.sameBillAmt1 && this.claimsDuplicateRule.sameBillAmt1 === 'Y'),
            'billedAmount002': (this.claimsDuplicateRule.sameBillAmt2 && this.claimsDuplicateRule.sameBillAmt2 === 'Y'),
            'billedAmount003': (this.claimsDuplicateRule.sameBillAmt3 && this.claimsDuplicateRule.sameBillAmt3 === 'Y'),
            'procedureCode001': (this.claimsDuplicateRule.sameProcCode1 && this.claimsDuplicateRule.sameProcCode1 === 'Y'),
            'procedureCode002': (this.claimsDuplicateRule.sameProcCode2 && this.claimsDuplicateRule.sameProcCode2 === 'Y'),
            'procedureCode003': (this.claimsDuplicateRule.sameProcCode3 && this.claimsDuplicateRule.sameProcCode3 === 'Y'),
            'medDef001': (this.claimsDuplicateRule.sameMedDef1 && this.claimsDuplicateRule.sameMedDef1 === 'Y'),
            'medDef002': (this.claimsDuplicateRule.sameMedDef2 && this.claimsDuplicateRule.sameMedDef2 === 'Y'),
            'medDef003': (this.claimsDuplicateRule.sameMedDef3 && this.claimsDuplicateRule.sameMedDef3 === 'Y'),
            'procModifier001': (this.claimsDuplicateRule.sameProcMod1 && this.claimsDuplicateRule.sameProcMod1 === 'Y'),
            'procModifier002': (this.claimsDuplicateRule.sameProcMod2 && this.claimsDuplicateRule.sameProcMod2 === 'Y'),
            'procModifier003': (this.claimsDuplicateRule.sameProcMod3 && this.claimsDuplicateRule.sameProcMod3 === 'Y'),
            'action002': this.claimsDuplicateRule.action1,
            'action003': this.claimsDuplicateRule.action2,
            'action004': this.claimsDuplicateRule.action3,
            'reasonCode001': this.claimsDuplicateRule.reasonCode1,
            'reasonCode002': this.claimsDuplicateRule.reasonCode2,
            'reasonCode003': this.claimsDuplicateRule.reasonCode3,
        });
        if (this.claimsDuplicateRule.action1) {
            this.getReasonCodes1ByAction1(this.claimsDuplicateRule.action1);
        }
        if (this.claimsDuplicateRule.action2) {
            this.getReasonCodes2ByAction2(this.claimsDuplicateRule.action2);
        }
        if (this.claimsDuplicateRule.action3) {
            this.getReasonCodes3ByAction3(this.claimsDuplicateRule.action3);
        }
        if (this.claimsDuplicateRule.primDtUsed1 && this.claimsDuplicateRule.primDtUsed1 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos001', 'daysAfterDos001');
        }
        if (this.claimsDuplicateRule.primDtUsed2 && this.claimsDuplicateRule.primDtUsed2 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos002', 'daysAfterDos002');
        }
        if (this.claimsDuplicateRule.primDtUsed3 && this.claimsDuplicateRule.primDtUsed3 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos003', 'daysAfterDos003');
        }
        if (this.claimsDuplicateRule.specDateUsed1 && this.claimsDuplicateRule.specDateUsed1 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos004', 'daysAfterDos004');
        }
        if (this.claimsDuplicateRule.specDateUsed2 && this.claimsDuplicateRule.specDateUsed2 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos005', 'daysAfterDos005');
        }
        if (this.claimsDuplicateRule.specDateUsed3 && this.claimsDuplicateRule.specDateUsed3 === 'Y') {
            this.changePrimaryDosAndDetailDos(true, 'daysBeforeDos006', 'daysAfterDos006');
        }
        this.editClaimsDuplicateRule = true;
        this.isFormDataModified();
    }

    getClaimsDuplicateRules(isNew?: boolean) {
        this.claimsDuplicateRuleService.getClaimsDuplicateRules().subscribe(claimsDuplicateRules => {
            this.claimsDuplicateRules = (claimsDuplicateRules && claimsDuplicateRules.length > 0 ? claimsDuplicateRules : []);
            this.dataGridGridOptions.api.setRowData(this.claimsDuplicateRules);
            if (this.claimsDuplicateRules && this.claimsDuplicateRules.length > 0) {
                if (isNew) {
                    this.dataGridGridOptions.api.selectIndex(this.claimsDuplicateRules.length - 1, false, false);
                } else {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }
            }
        });
    }

    dataGridGridOptionsExportCsv() {
        let params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Dup Rule',
                field: 'claimsDuplicateRulePrimaryKey.claimDupRule',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Claim Type',
                field: 'claimsDuplicateRulePrimaryKey.claimType',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 350
            }
        ];
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
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('CLAIMS_DUPLICATE_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
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
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                } else {
                    this.showPopUp(
                        'You are not Permitted to view Plan',
                        'Claim Duplicate Check Rules Permission'
                    );
                }
            }
        );
    }

// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimDuplicateCheckRulesForm = this.formBuilder.group({
            dupRule: ['', {validators: [Validators.required]}],
            claimType: ['', {validators: [Validators.required]}],
            desc: ['', {validators: [Validators.required, Validators.maxLength(60)]}],
            primaryDos001: ['', {validators: []}],
            primaryDos002: ['', {validators: []}],
            primaryDos003: ['', {validators: []}],
            daysBeforeDos001: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysBeforeDos002: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysBeforeDos003: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos001: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos002: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos003: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            provider001: ['', {validators: []}],
            provider002: ['', {validators: []}],
            provider003: ['', {validators: []}],
            totalBilled001: ['', {validators: []}],
            totalBilled002: ['', {validators: []}],
            totalBilled003: ['', {validators: []}],
            placeOfService001: ['', {validators: []}],
            placeOfService002: ['', {validators: []}],
            placeOfService003: ['', {validators: []}],
            detailDos001: ['', {validators: []}],
            detailDos002: ['', {validators: []}],
            detailDos003: ['', {validators: []}],
            daysBeforeDos004: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysBeforeDos005: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysBeforeDos006: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos004: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos005: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            daysAfterDos006: ['0', {validators: [Validators.pattern('^[0-9]*$')]}],
            billedAmount001: ['', {validators: []}],
            billedAmount002: ['', {validators: []}],
            billedAmount003: ['', {validators: []}],
            procedureCode001: ['', {validators: []}],
            procedureCode002: ['', {validators: []}],
            procedureCode003: ['', {validators: []}],
            medDef001: ['', {validators: []}],
            medDef002: ['', {validators: []}],
            medDef003: ['', {validators: []}],
            procModifier001: ['', {validators: []}],
            procModifier002: ['', {validators: []}],
            procModifier003: ['', {validators: []}],
            action002: ['', {validators: []}],
            action003: ['', {validators: []}],
            action004: ['', {validators: []}],
            reasonCode001: ['', {validators: []}],
            reasonCode002: ['', {validators: []}],
            reasonCode003: ['', {validators: []}]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        this.secProgress = false;
        this.initializeComponentState();

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
        this.createDataGrid();
        this.menuInit();
        this.getAllAction1Options();
        this.getAllAction2Options();
        this.getAllAction3Options();
        this.getClaimTypes();
        this.getClaimsDuplicateRules();
    }

    private getAllAction1Options() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('action_1', 'dw_duprl_de', 0).subscribe((res: any) => {
            this.action1Options = (res && res.length > 0 ? res : []);
        });
    }

    private getAllAction2Options() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('action_2', 'dw_duprl_de', 0).subscribe((res: any) => {
            this.action2Options = (res && res.length > 0 ? res : []);
        });
    }

    private getAllAction3Options() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('action_3', 'dw_duprl_de', 0).subscribe((res: any) => {
            this.action3Options = (res && res.length > 0 ? res : []);
        });
    }

    private getClaimTypes() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('claim_type', 'dw_duprl_de', 0).subscribe((res: any) => {
            this.claimTypes = (res && res.length > 0 ? res : []);
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl + N'},
                    { name: 'Open', shortcutKey: 'Ctrl + O'},
                    { name: 'Delete', shortcutKey: 'Ctrl + D'},
                    { name: 'Save', shortcutKey: 'Ctrl + S'},
                    { name: 'Close', shortcutKey: 'Ctrl + F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt + F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', shortcutKey: 'Ctrl + Z', disabled: true }, { isHorizontal: true },
                    { name: 'Cut', shortcutKey: 'Ctrl + X', disabled: true },
                    { name: 'Copy', shortcutKey: 'Ctrl + C', disabled: true },
                    { name: 'Paste', shortcutKey: 'Ctrl + V', disabled: true }, { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' }, { name: 'Previous', shortcutKey: 'F7' }]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [{ name: 'Tile', shortcutKey: 'Ctrl + Alt + T' }, { name: 'Layer', shortcutKey: 'Ctrl + Alt + L' },
                    { name: 'Cascade', shortcutKey: 'Ctrl + Alt + C' }, { name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I' },
                    { isHorizontal: true }, { name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S' },
                    { name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A' }, { isHorizontal: true }, { name: '1 Main Menu' },
                    { name: '2 Claim Duplicate Check Rules' }]
            },
            {
                menuItem: 'Help',
                dropdownItems: [{ name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }]
            }
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewRecord();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    this.save();
                    break;
                }
                case 'Delete': {
                    this.delete();
                    break;
                }
                default: {
                    this.toastr.showToast('Action is not valid', NgbToastType.Danger);
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
            this.toastr.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    onChangeAction1(event) {
        let val = event.target.value;
        this.claimDuplicateCheckRulesForm.get('reasonCode001').setValue(null);
        this.getReasonCodes1ByAction1(val);
    }
    getReasonCodes1ByAction1(val) {
        let type = null;
        if (val === 'D') { type = 'DN';
        } else if (val === 'H') { type = 'HD'
        } else if (val === 'W') { type = 'WN';
        }
        if (type) {
            this.reasonCodeMasterService.getReasonCodeMasterByReasonType(type).subscribe(reasonCodes => {
                this.reasonCode1Options = (reasonCodes && reasonCodes.length > 0) ? reasonCodes : [];
                this.isLoadAction1 = true;
            })
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode001');
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        } else {
            this.reasonCode1Options = [];
            this.isLoadAction1 = false;
            this.claimDuplicateCheckRulesForm.get('reasonCode001').setValue(null);
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode001');
            controls.setValidators([]);
            controls.updateValueAndValidity();
        }
    }

    onChangeAction2(event) {
        let val = event.target.value;
        this.claimDuplicateCheckRulesForm.get('reasonCode002').setValue(null);
        this.getReasonCodes2ByAction2(val);
    }
    getReasonCodes2ByAction2(val) {
        let type = null;
        if (val === 'D') { type = 'DN';
        } else if (val === 'H') { type = 'HD'
        } else if (val === 'W') { type = 'WN';
        }
        if (type) {
            this.reasonCodeMasterService.getReasonCodeMasterByReasonType(type).subscribe(reasonCodes => {
                this.reasonCode2Options = (reasonCodes && reasonCodes.length > 0) ? reasonCodes : [];
                this.isLoadAction2 = true;
            })
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode002');
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        } else {
            this.reasonCode2Options = [];
            this.isLoadAction2 = false;
            this.claimDuplicateCheckRulesForm.get('reasonCode002').setValue(null);
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode002');
            controls.setValidators([]);
            controls.updateValueAndValidity();
        }
    }

    onChangeAction3(event) {
        let val = event.target.value;
        this.claimDuplicateCheckRulesForm.get('reasonCode003').setValue(null);
        this.getReasonCodes3ByAction3(val);
    }

    getReasonCodes3ByAction3(val) {
        let type = null;
        if (val === 'D') { type = 'DN';
        } else if (val === 'H') { type = 'HD'
        } else if (val === 'W') { type = 'WN';
        }
        if (type) {
            this.reasonCodeMasterService.getReasonCodeMasterByReasonType(type).subscribe(reasonCodes => {
                this.reasonCode3Options = (reasonCodes && reasonCodes.length > 0) ? reasonCodes : [];
                this.isLoadAction3 = true;
            })
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode003');
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        } else {
            this.reasonCode3Options = [];
            this.isLoadAction3 = false;
            let controls = this.claimDuplicateCheckRulesForm.get('reasonCode003');
            controls.setValidators([]);
            controls.updateValueAndValidity();
        }
    }

    onChangCheckbox(event, field) {
        this.claimDuplicateCheckRulesForm.get(field).setValue(event.currentTarget.checked);
        switch (field) {
            case 'primaryDos001':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos001', 'daysAfterDos001');
                break;
            case 'primaryDos002':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos002', 'daysAfterDos002');
                break;
            case 'primaryDos003':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos003', 'daysAfterDos003');
                break;
            case 'detailDos001':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos004', 'daysAfterDos004');
                break;
            case 'detailDos002':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos005', 'daysAfterDos005');
                break;
            case 'detailDos003':
                this.changePrimaryDosAndDetailDos(event.currentTarget.checked, 'daysBeforeDos006', 'daysAfterDos006');
                break;
            case 'action001':
                this.changeAction(event.currentTarget.checked, 'reasonCode001');
                break;
            case 'action002':
                this.changeAction(event.currentTarget.checked, 'reasonCode002');
                break;
            case 'action003':
                this.changeAction(event.currentTarget.checked, 'reasonCode003');
                break;
            default:
                break;
        }
    }

    changeAction(val, field1) {
        if (val) {
            let controls = this.claimDuplicateCheckRulesForm.get(field1);
            controls.setValidators([Validators.required]);
            controls.updateValueAndValidity();
        } else {
            this.claimDuplicateCheckRulesForm.get(field1).setValue(null);
            let controls = this.claimDuplicateCheckRulesForm.get(field1);
            controls.setValidators([]);
            controls.updateValueAndValidity();
        }
    }

    changePrimaryDosAndDetailDos(val, field1, field2) {
        if (val) {
            let controls = this.claimDuplicateCheckRulesForm.get(field1);
            controls.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
            controls.updateValueAndValidity();
            let controls1 = this.claimDuplicateCheckRulesForm.get(field2);
            controls1.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
            controls1.updateValueAndValidity();
        } else {
            this.claimDuplicateCheckRulesForm.get(field1).setValue(0);
            let controls = this.claimDuplicateCheckRulesForm.get(field1);
            controls.setValidators([]);
            controls.updateValueAndValidity();
            this.claimDuplicateCheckRulesForm.get(field2).setValue(0);
            let controls1 = this.claimDuplicateCheckRulesForm.get(field2);
            controls1.setValidators([]);
            controls1.updateValueAndValidity();
        }
    }

    Grid1SelectionChange() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.claimsDuplicateRule = selectedRows[0];
            this.reasonCode1Options = [];
            this.reasonCode2Options = [];
            this.reasonCode3Options = [];
            this.setDataToForm();
        } else {
            this.claimsDuplicateRule = null;
            this.resetData();
        }
    }

    resetData() {
        this.claimDuplicateCheckRulesForm.reset();
        this.claimDuplicateCheckRulesForm.patchValue({
            daysBeforeDos001: '0',
            daysBeforeDos002: '0',
            daysBeforeDos003: '0',
            daysAfterDos001: '0',
            daysAfterDos002: '0',
            daysAfterDos003: '0',
            daysBeforeDos004: '0',
            daysBeforeDos005: '0',
            daysBeforeDos006: '0',
            daysAfterDos004: '0',
            daysAfterDos005: '0',
            daysAfterDos006: '0'
        });
        this.editClaimsDuplicateRule  = false;
        this.isLoadAction1 = false;
        this.isLoadAction2 = false;
        this.isLoadAction3 = false;
        this.reasonCode1Options = [];
        this.reasonCode2Options = [];
        this.reasonCode3Options = [];
        this.removeValidators('reasonCode001');
        this.removeValidators('reasonCode002');
        this.removeValidators('reasonCode003');
        this.removeValidators('daysBeforeDos001');
        this.removeValidators('daysAfterDos001');
        this.removeValidators('daysBeforeDos002');
        this.removeValidators('daysAfterDos002');
        this.removeValidators('daysBeforeDos003');
        this.removeValidators('daysAfterDos003');
        this.removeValidators('daysBeforeDos004');
        this.removeValidators('daysAfterDos004');
        this.removeValidators('daysBeforeDos005');
        this.removeValidators('daysAfterDos005');
        this.removeValidators('daysBeforeDos006');
        this.removeValidators('daysAfterDos006');
    }

    removeValidators(field1) {
        let controls = this.claimDuplicateCheckRulesForm.get(field1);
        controls.setValidators([]);
        controls.updateValueAndValidity();
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Company')
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
                    this.saveClaimsDuplicateRule()
                }
                else if(resp.name === 'No') {
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
        this.claimDuplicateCheckRulesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimDuplicateCheckRulesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/DUPRL_Claims_Duplicate_Checking_Rules.htm';
    }

    createNewRecord = () => {
        if (this.isSuperUser) {
            this.dataGridGridOptions.api.deselectAll();
            this.resetData();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.dataGridGridOptions.api.deselectAll();
                this.resetData();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Claim Duplicate Check Rules')
                });
            }
        }
    }

    save = () => {
        if (this.isSuperUser) {
            this.saveClaimsDuplicateRule();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.saveClaimsDuplicateRule();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Claim Duplicate Check Rules')
                });
            }
        }
    };

    delete = () => {
        if (this.isSuperUser) {

        } else {
            if (this.secWin.hasInsertPermission()) {

            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Claim Duplicate Check Rules')
                });
            }
        }
    }
}
