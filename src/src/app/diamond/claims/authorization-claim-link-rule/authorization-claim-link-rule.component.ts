/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthClaimLinkRule, MessageMasterDtl, SecUser} from '../../../api-models/index'
import {  AuthClaimLinkRuleService } from '../../../api-services/auth-claim-link-rule.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../../app/api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from "../../../shared/services/security.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {
    DddwDtlService, MessageMasterDtlService,
    ReasonCodeMasterService,
    SecUserService
} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {Menu} from "../../../shared/models/models";
import {AuthTypeMasterService} from "../../../api-services/index";
import {LineOfBusinessMasterService} from "../../../api-services/index";
import {getAuthorizationClaimLinkRuleComponentShortcutKeys} from "../../../shared/services/shared.service";
import {SupportHelpComponent} from "../../support/support-help/support-help.component";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the AuthorizationClaimLinkRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationclaimlinkrule',
    templateUrl: './authorization-claim-link-rule.component.html',
    providers: [
        AuthClaimLinkRuleService,
        AlertMessageService,
        LineOfBusinessMasterService,
        AuthTypeMasterService
    ]
})
export class AuthorizationClaimLinkRuleComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationClaimLinkRuleForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'ARULE';
    public isSuperUser = false;
    public secProgress = true;
    secColDetails: SecColDetail[] = [];
    lineOfBusinesses: any[] = [];
    seqAuthTypes: any[] = [];
    authorizationActions: any[] = [];
    authorizationReasons: any[] = [];
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    memberModuleId = '';
    userTemplateId: string;
    screenCloseRequested: Boolean = false;
    valueChanged: Boolean = false;
    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    lineOfBusiness: string;
    authType : any;

    ngOnInit(): void {
        this.initializePermission();
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationClaimLinkRuleForm);
        this.createDataGrid();
        this.getAuthClaimLinkRules();
        this.getLineOfBusinesses();
        this.getSeqAuthTypes();
        this.getAuthorizationActions();
        this.getAuthorizationReasons();
        this.authorizationClaimLinkRuleForm.controls['lineOfBusiness'].disable();
        this.authorizationClaimLinkRuleForm.controls['seqAuthType'].disable();
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

    /**
     * Generic Search Model
     */

    showEditConfirmation(message: string, title: string) {
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
                this.updateAuthClaimLinkRule(this.authClaimLinkRule.authClaimLinkRulePrimaryKey.seqAuthType,
                    this.authClaimLinkRule.authClaimLinkRulePrimaryKey.lineOfBusiness);
            }
            else if(resp.name === 'No') {
                this.showAuthClaimLinkRuleFields = false;
                this.authorizationClaimLinkRuleForm.reset();
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            }
        });
    }

    closeModal(){
        this.screenCloseRequested = true;
        if(this.authorizationClaimLinkRuleForm.dirty || this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.showEditConfirmation(message[0].messageText, 'Authorization Claim Link Rule')
            });
        } else {
            this.showAuthClaimLinkRuleFields = false;
            this.authorizationClaimLinkRuleForm.reset();
            this.activeModal.close();
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.showAuthClaimLinkRuleFields = true;
                    this.editAuthClaimLinkRule = false;
                    this.authorizationClaimLinkRuleForm.reset();
                    this.dataGridGridOptions.api.deselectAll();
                    this.authorizationClaimLinkRuleForm.controls['lineOfBusiness'].enable();
                    this.authorizationClaimLinkRuleForm.controls['seqAuthType'].enable();
                    this.authorizationClaimLinkRuleForm.controls['authClosedReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authCostExceededReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authDateReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authDeniedReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authExpiredReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authGroupPlanReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authHeldReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authNewReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authQuantityExceededReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authSecOpReqReason'].disable();

                    break;

                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Delete': {
                    this.deleteAuthClaimLinkRule(this.authClaimLinkRule.authClaimLinkRulePrimaryKey.seqAuthType,
                        this.authClaimLinkRule.authClaimLinkRulePrimaryKey.lineOfBusiness);
                    break;
                }
                case 'Save': {
                    this.saveAuthClaimLinkRule();
                    break;
                }
                case 'Close': {
                    if(this.authorizationClaimLinkRuleForm.dirty || this.valueChanged == true) {
                        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                            this.showEditConfirmation(message[0].messageText, 'Authorization Claim Link Rule')
                        });
                    } else {
                        this.showAuthClaimLinkRuleFields = false;
                        this.authorizationClaimLinkRuleForm.reset();
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
            // this.handleEditMenu(event.action)
        } else if (event.menu.menuItem == 'Help') {
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
                    { name: 'Delete' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { isHorizontal: true },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { isHorizontal: true },
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
                    { name: 'Next' },
                    { name: 'Previous' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
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
                    { name: "2 Authorization Claim Link Rule" },
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

    editAuthClaimLinkRule: boolean = true;
    showAuthClaimLinkRuleFields: boolean;
    authClaimLinkRule: AuthClaimLinkRule;
    authClaimLinkRules: AuthClaimLinkRule[];

    createAuthClaimLinkRule() {
        // if (this.secWin.hasInsertPermission()) {
        this.formValidation.validateForm();
        if (this.authorizationClaimLinkRuleForm.valid) {
            let authClaimLinkRule = new AuthClaimLinkRule();
            authClaimLinkRule.lineOfBusiness = Form.getValue(this.authorizationClaimLinkRuleForm, 'lineOfBusiness');
            authClaimLinkRule.seqAuthType = Form.getValue(this.authorizationClaimLinkRuleForm, 'seqAuthType');
            authClaimLinkRule.authClosedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authClosedReason');
            authClaimLinkRule.authClosedStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authClosedStatus');
            authClaimLinkRule.authCostExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authCostExceededReason');
            authClaimLinkRule.authCostExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authCostExceededStatus');
            authClaimLinkRule.authDateReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDateReason');
            authClaimLinkRule.authDateStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDateStatus');
            authClaimLinkRule.authDeniedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDeniedReason');
            authClaimLinkRule.authDeniedStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDeniedStatus');
            authClaimLinkRule.authExpiredReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authExpiredReason');
            authClaimLinkRule.authExpiredStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authExpiredStatus');
            authClaimLinkRule.authGroupPlanReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authGroupPlanReason');
            authClaimLinkRule.authGroupPlanStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authGroupPlanStatus');
            authClaimLinkRule.authHeldReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authHeldReason');
            authClaimLinkRule.authHeldStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authHeldStatus');
            authClaimLinkRule.authNewReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authNewReason');
            authClaimLinkRule.authNewStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authNewStatus');
            authClaimLinkRule.authQuantityExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authQuantityExceededReason');
            authClaimLinkRule.authQuantityExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authQuantityExceededStatus');
            authClaimLinkRule.authSecOpReqReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authSecOpReqReason');
            authClaimLinkRule.authSecOpReqStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authSecOpReqStatus');
            this.authClaimLinkRuleService.getAuthClaimLinkRuleExist(authClaimLinkRule.lineOfBusiness, authClaimLinkRule.seqAuthType).subscribe(response => {
                if (response != null) {
                    this.alertMessage = this.alertMessageService.error(`${authClaimLinkRule.lineOfBusiness} and ${authClaimLinkRule.seqAuthType} combination is already exist.`);
                } else {
                    this.authClaimLinkRuleService.createAuthClaimLinkRule(authClaimLinkRule).subscribe(response => {
                        this.toastr.showToast('Record successfully created', NgbToastType.Success);
                        this.editAuthClaimLinkRule = false;
                        this.getAuthClaimLinkRules();
                    });
                }
            }, error => {
                this.authClaimLinkRuleService.createAuthClaimLinkRule(authClaimLinkRule).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editAuthClaimLinkRule = false;
                    this.getAuthClaimLinkRules();
                });
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {
        //
        // }
    }

    updateAuthClaimLinkRule(seqAuthType: number, lineOfBusiness : string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationClaimLinkRuleForm.valid) {
            let authClaimLinkRule = new AuthClaimLinkRule();
            authClaimLinkRule.lineOfBusiness = Form.getValue(this.authorizationClaimLinkRuleForm, 'lineOfBusiness');
            authClaimLinkRule.seqAuthType = Form.getValue(this.authorizationClaimLinkRuleForm, 'seqAuthType');
            authClaimLinkRule.authClosedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authClosedReason');
            authClaimLinkRule.authClosedStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authClosedStatus');
            authClaimLinkRule.authCostExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authCostExceededReason');
            authClaimLinkRule.authCostExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authCostExceededStatus');
            authClaimLinkRule.authDateReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDateReason');
            authClaimLinkRule.authDateStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDateStatus');
            authClaimLinkRule.authDeniedReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDeniedReason');
            authClaimLinkRule.authDeniedStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authDeniedStatus');
            authClaimLinkRule.authExpiredReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authExpiredReason');
            authClaimLinkRule.authExpiredStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authExpiredStatus');
            authClaimLinkRule.authGroupPlanReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authGroupPlanReason');
            authClaimLinkRule.authGroupPlanStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authGroupPlanStatus');
            authClaimLinkRule.authHeldReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authHeldReason');
            authClaimLinkRule.authHeldStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authHeldStatus');
            authClaimLinkRule.authNewReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authNewReason');
            authClaimLinkRule.authNewStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authNewStatus');
            authClaimLinkRule.authQuantityExceededReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authQuantityExceededReason');
            authClaimLinkRule.authQuantityExceededStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authQuantityExceededStatus');
            authClaimLinkRule.authSecOpReqReason = Form.getValue(this.authorizationClaimLinkRuleForm, 'authSecOpReqReason');
            authClaimLinkRule.authSecOpReqStatus = Form.getValue(this.authorizationClaimLinkRuleForm, 'authSecOpReqStatus');
            this.authClaimLinkRuleService.updateAuthClaimLinkRule(authClaimLinkRule, seqAuthType, lineOfBusiness).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editAuthClaimLinkRule = true;
                if (this.screenCloseRequested === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }

            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {
        //   this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
    }

    newFormCretion() {
        this.editAuthClaimLinkRule = false;
        this.authorizationClaimLinkRuleForm.enable();
        this.createForm();
    }

    saveAuthClaimLinkRule() {
        if (this.editAuthClaimLinkRule) {
            this.updateAuthClaimLinkRule(this.authClaimLinkRule.authClaimLinkRulePrimaryKey.seqAuthType,
                this.authClaimLinkRule.authClaimLinkRulePrimaryKey.lineOfBusiness)
        } else {
            this.createAuthClaimLinkRule();
        }
    }

    deleteAuthClaimLinkRule(seqAuthType: number, lineOfBusiness : string) {
        // if (!(this.secWin && this.secWin.hasDeletePermission())) {
        //     this.showPopUp('Not permitted to delete', 'Group Master Security');
        // } else {
        this.authClaimLinkRuleService.deleteAuthClaimLinkRule(seqAuthType, lineOfBusiness).subscribe(response => {
            this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            this.getAuthClaimLinkRules();
        }, error => {
            this.authClaimLinkRuleService.deleteAuthClaimLinkRule(seqAuthType, lineOfBusiness).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
                this.editAuthClaimLinkRule = false;
                this.getAuthClaimLinkRules();
            });
        });
        // }
    }

    // fieldDisableActions(field, currentField) {
    //     if (currentField.target.value == ' ') {
    //         this.authorizationClaimLinkRuleForm.get(field).disabled;
    //     } else {
    //         this.authorizationClaimLinkRuleForm.get(field).enabled;
    //     }
    // }

    getAuthClaimLinkRule(lineOfBusiness : string) {
        this.authClaimLinkRuleService.getAuthClaimLinkRule(lineOfBusiness).subscribe(authClaimLinkRule => {
            this.authClaimLinkRule = authClaimLinkRule;
            this.authorizationClaimLinkRuleForm.patchValue({
                'lineOfBusiness': this.authClaimLinkRule.lineOfBusiness,
                'seqAuthTypeCode': this.authClaimLinkRule.seqAuthTypeCode,
                'seqAuthType': this.authClaimLinkRule.seqAuthType,
                'authClosedReason': this.authClaimLinkRule.authClosedReason,
                'authClosedStatus': this.authClaimLinkRule.authClosedStatus,
                'authCostExceededReason': this.authClaimLinkRule.authCostExceededReason,
                'authCostExceededStatus': this.authClaimLinkRule.authCostExceededStatus,
                'authDateReason': this.authClaimLinkRule.authDateReason,
                'authDateStatus': this.authClaimLinkRule.authDateStatus,
                'authDeniedReason': this.authClaimLinkRule.authDeniedReason,
                'authDeniedStatus': this.authClaimLinkRule.authDateStatus,
                'authExpiredReason': this.authClaimLinkRule.authExpiredReason,
                'authExpiredStatus': this.authClaimLinkRule.authExpiredStatus,
                'authGroupPlanReason': this.authClaimLinkRule.authGroupPlanReason,
                'authGroupPlanStatus': this.authClaimLinkRule.authGroupPlanStatus,
                'authHeldReason': this.authClaimLinkRule.authHeldReason,
                'authHeldStatus': this.authClaimLinkRule.authHeldStatus,
                'authNewReason': this.authClaimLinkRule.authNewReason,
                'authNewStatus': this.authClaimLinkRule.authNewStatus,
                'authQuantityExceededReason': this.authClaimLinkRule.authQuantityExceededReason,
                'authQuantityExceededStatus': this.authClaimLinkRule.authQuantityExceededStatus,
                'authSecOpReqReason': this.authClaimLinkRule.authSecOpReqReason,
                'authSecOpReqStatus': this.authClaimLinkRule.authSecOpReqStatus,
            });
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        let params = {
        };
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    getAuthClaimLinkRules() {
        this.authClaimLinkRuleService.getAuthClaimLinkRules().subscribe(authClaimLinkRules => {
            this.authClaimLinkRules = authClaimLinkRules;
            this.dataGridGridOptions.api.setRowData( this.authClaimLinkRules);
        });
    }

    onRowClicked(data:any) {
        this.authClaimLinkRule = data;
        if (this.authClaimLinkRule != null){
            this.authorizationClaimLinkRuleForm.patchValue({
                'lineOfBusiness': this.authClaimLinkRule.authClaimLinkRulePrimaryKey.lineOfBusiness,
                'dynamicText': this.authClaimLinkRule.lineOfBusiness,
                'seqAuthTypeCode': this.authClaimLinkRule.seqAuthTypeCode,
                'seqAuthType': this.authClaimLinkRule.authClaimLinkRulePrimaryKey.seqAuthType,
                'authClosedReason': this.authClaimLinkRule.authClosedReason,
                'authClosedStatus': this.authClaimLinkRule.authClosedStatus,
                'authCostExceededReason': this.authClaimLinkRule.authCostExceededReason,
                'authCostExceededStatus': this.authClaimLinkRule.authCostExceededStatus,
                'authDateReason': this.authClaimLinkRule.authDateReason,
                'authDateStatus': this.authClaimLinkRule.authDateStatus,
                'authDeniedReason': this.authClaimLinkRule.authDeniedReason,
                'authDeniedStatus': this.authClaimLinkRule.authDateStatus,
                'authExpiredReason': this.authClaimLinkRule.authExpiredReason,
                'authExpiredStatus': this.authClaimLinkRule.authExpiredStatus,
                'authGroupPlanReason': this.authClaimLinkRule.authGroupPlanReason,
                'authGroupPlanStatus': this.authClaimLinkRule.authGroupPlanStatus,
                'authHeldReason': this.authClaimLinkRule.authHeldReason,
                'authHeldStatus': this.authClaimLinkRule.authHeldStatus,
                'authNewReason': this.authClaimLinkRule.authNewReason,
                'authNewStatus': this.authClaimLinkRule.authNewStatus,
                'authQuantityExceededReason': this.authClaimLinkRule.authQuantityExceededReason,
                'authQuantityExceededStatus': this.authClaimLinkRule.authQuantityExceededStatus,
                'authSecOpReqReason': this.authClaimLinkRule.authSecOpReqReason,
                'authSecOpReqStatus': this.authClaimLinkRule.authSecOpReqStatus,
            });
            this.authorizationClaimLinkRuleForm.controls['lineOfBusiness'].disable();
            this.authorizationClaimLinkRuleForm.controls['seqAuthType'].disable();
            this.changeAction(this.authClaimLinkRule.authExpiredStatus,"authExpiredStatus",false);
            this.changeAction(this.authClaimLinkRule.authDateStatus,"authDateStatus",false);
            this.changeAction(this.authClaimLinkRule.authClosedStatus,"authClosedStatus",false);
            this.changeAction(this.authClaimLinkRule.authNewStatus,"authNewStatus",false);
            this.changeAction(this.authClaimLinkRule.authHeldStatus,"authHeldStatus",false);
            this.changeAction(this.authClaimLinkRule.authDeniedStatus,"authDeniedStatus",false);
            this.changeAction(this.authClaimLinkRule.authQuantityExceededStatus,"authQuantityExceededStatus",false);
            this.changeAction(this.authClaimLinkRule.authCostExceededStatus,"authCostExceededStatus",false);
            this.changeAction(this.authClaimLinkRule.authSecOpReqStatus,"authSecOpReqStatus",false);
            this.changeAction(this.authClaimLinkRule.authGroupPlanStatus,"authGroupPlanStatus",false);
            this.changeSeqAuthType(this.authClaimLinkRule.authClaimLinkRulePrimaryKey.seqAuthType.toString());
            this.editAuthClaimLinkRule = true;
            this.isFormDataChangedStatus()
        }
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Line of Business',
                field: 'authClaimLinkRulePrimaryKey.lineOfBusiness&lineOfBusiness',
                minWidth: 400,
                maxWidth: 500,
                valueGetter: function lineOfBusinessGetter(params:any) {
                    return params.data.authClaimLinkRulePrimaryKey.lineOfBusiness + "   " + params.data.lineOfBusiness;
                },
                //  headerCheckboxSelection: true,
                //  headerCheckboxSelectionFilteredOnly: true,
                //  checkboxSelection: true
            },
            {
                headerName: 'Auth Type',
                field: 'seqAuthTypeCode&seqAuthType',
                valueGetter: function lineOfBusinessGetter(params:any) {
                    return params.data.seqAuthTypeCode + " " + params.data.seqAuthType;
                },
                width: 500
            }
        ]
    }

    onSelectionChanged() {
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        document.querySelector('#selectedRows').innerHTML =
            selectedRows.length === 1 ? selectedRows[0].athlete : '';
    }

    onReady(params:any) {
        this.dataGridGridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
        params.api.sizeColumnsToFit();
        this.onRowClicked(this.dataGridGridOptions.api.getSelectedRows()[0]);
    }

    getLineOfBusinesses() {
        this.lineOfBusinessMasterService.getDropdownData().subscribe(codes => {
            this.lineOfBusinesses = codes;
        });
    }
    getSeqAuthTypes() {
        this.authTypeMasterService.getDropdownData().subscribe(codes => {
            this.seqAuthTypes = codes;
        });
    }
    getAuthorizationActions() {
        this.dddwDtlService.findByColumnNameAndDwname('auth_expired_status', 'dw_arule_de').subscribe(codes => {
            this.authorizationActions = codes;
        });
    }
    getAuthorizationReasons() {
        this.reasonCodeMasterService.getDropdownData().subscribe(codes => {
            this.authorizationReasons = codes;
        });
    }

    changeLineOfBusiness(value:string){
        this.lineOfBusiness = value;
        this.authorizationClaimLinkRuleForm.controls['dynamicText'].setValue(this.lineOfBusinesses.filter(c=>c.key == value)[0].value);
    }

    changeSeqAuthType(value:string){
        this.authType = value;
        this.authorizationClaimLinkRuleForm.controls['description'].setValue(this.seqAuthTypes.filter(c => c.key == value)[0].description);
        this.authClaimLinkRuleService.getAuthClaimLinkRuleExist(this.lineOfBusiness, this.authType).subscribe(response => {
            if (response != null) {
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage(
                        'popUpMessageName',
                        'Authorization Claim Link Rule',
                         '7109: ' + message[0].messageText,
                        'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                        if (resp.name === 'Ok') {
                            this.authorizationClaimLinkRuleForm.get('seqAuthType').reset();
                            this.authorizationClaimLinkRuleForm.patchValue({
                                'seqAuthType' : ''
                            })
                        }

                    })
                });
            } else {

            }
        }, error => {

        });
    }

    changeAction(value:string,controlName:string,action:boolean) {
        if (value == " ") {
            switch (controlName) {
                case 'authExpiredStatus':
                    this.authorizationClaimLinkRuleForm.controls['authExpiredReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authExpiredReason'].setValue(null);
                    break;

                case 'authDateStatus':
                    this.authorizationClaimLinkRuleForm.controls['authDateReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authDateReason'].setValue(null);
                    break;

                case 'authClosedStatus':
                    this.authorizationClaimLinkRuleForm.controls['authClosedReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authClosedReason'].setValue(null);
                    break;

                case 'authNewStatus':
                    this.authorizationClaimLinkRuleForm.controls['authNewReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authNewReason'].setValue(null);
                    break;

                case 'authHeldStatus':
                    this.authorizationClaimLinkRuleForm.controls['authHeldReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authHeldReason'].setValue(null);
                    break;

                case 'authDeniedStatus':
                    this.authorizationClaimLinkRuleForm.controls['authDeniedReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authDeniedReason'].setValue(null);
                    break;

                case 'authQuantityExceededStatus':
                    this.authorizationClaimLinkRuleForm.controls['authQuantityExceededReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authQuantityExceededReason'].setValue(null);
                    break;

                case 'authCostExceededStatus':
                    this.authorizationClaimLinkRuleForm.controls['authCostExceededReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authCostExceededReason'].setValue(null);
                    break;

                case 'authSecOpReqStatus':
                    this.authorizationClaimLinkRuleForm.controls['authSecOpReqReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authSecOpReqReason'].setValue(null);
                    break;

                case 'authGroupPlanStatus':
                    this.authorizationClaimLinkRuleForm.controls['authGroupPlanReason'].disable();
                    this.authorizationClaimLinkRuleForm.controls['authGroupPlanReason'].setValue(null);
                    break;

                default:
                    break;
            }
        }else{
            switch (controlName) {
                case 'authExpiredStatus':
                    this.authorizationClaimLinkRuleForm.controls['authExpiredReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authExpiredReason'].setValue(null);
                    }
                    break;

                case 'authDateStatus':
                    this.authorizationClaimLinkRuleForm.controls['authDateReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authDateReason'].setValue(null);
                    }
                    break;

                case 'authClosedStatus':
                    this.authorizationClaimLinkRuleForm.controls['authClosedReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authClosedReason'].setValue(null);
                    }
                    break;

                case 'authNewStatus':
                    this.authorizationClaimLinkRuleForm.controls['authNewReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authNewReason'].setValue(null);
                    }
                    break;

                case 'authHeldStatus':
                    this.authorizationClaimLinkRuleForm.controls['authHeldReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authHeldReason'].setValue(null);
                    }
                    break;

                case 'authDeniedStatus':
                    this.authorizationClaimLinkRuleForm.controls['authDeniedReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authDeniedReason'].setValue(null);
                    }
                    break;

                case 'authQuantityExceededStatus':
                    this.authorizationClaimLinkRuleForm.controls['authQuantityExceededReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authQuantityExceededReason'].setValue(null);
                    }
                    break;

                case 'authCostExceededStatus':
                    this.authorizationClaimLinkRuleForm.controls['authCostExceededReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authCostExceededReason'].setValue(null);
                    }
                    break;

                case 'authSecOpReqStatus':
                    this.authorizationClaimLinkRuleForm.controls['authSecOpReqReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authSecOpReqReason'].setValue(null);
                    }
                    break;

                case 'authGroupPlanStatus':
                    this.authorizationClaimLinkRuleForm.controls['authGroupPlanReason'].enable();
                    if (action) {
                        this.authorizationClaimLinkRuleForm.controls['authGroupPlanReason'].setValue(null);
                    }
                    break;

                default:
                    break;
            }
        }

    }

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
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private authClaimLinkRuleService: AuthClaimLinkRuleService,
        private dddwDtlService: DddwDtlService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private authTypeMasterService: AuthTypeMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.


    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthorizationClaimLinkRuleComponentShortcutKeys(this));
        this.cdr.detectChanges();
    }

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
            this.userTemplateId = user.dfltTemplate;
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
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
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

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationClaimLinkRuleForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [Validators.required] }],
            dynamicText: ['', {updateOn: 'blur'}],
            seqAuthType: ['', {updateOn: 'blur', validators: [Validators.required] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            authClosedReason: ['', {updateOn: 'blur', validators: [] }],
            authClosedStatus: ['', {updateOn: 'blur', validators: [] }],
            authCostExceededReason: ['', {updateOn: 'blur', validators: [] }],
            authCostExceededStatus: ['', {updateOn: 'blur', validators: [] }],
            authDateReason: ['', {updateOn: 'blur', validators: [] }],
            authDateStatus: ['', {updateOn: 'blur', validators: [] }],
            authDeniedReason:['', {updateOn: 'blur', validators: [] }],
            authDeniedStatus: ['', {updateOn: 'blur', validators: [] }],
            authExpiredReason: ['', {updateOn: 'blur', validators: [] }],
            authExpiredStatus: ['', {updateOn: 'blur', validators: [] }],
            authGroupPlanReason: ['', {updateOn: 'blur', validators: [] }],
            authGroupPlanStatus: ['', {updateOn: 'blur', validators: [] }],
            authHeldReason: ['', {updateOn: 'blur', validators: [] }],
            authHeldStatus: ['', {updateOn: 'blur', validators: [] }],
            authNewReason: ['', {updateOn: 'blur', validators: [] }],
            authNewStatus: ['', {updateOn: 'blur', validators: [] }],
            authQuantityExceededReason: ['', {updateOn: 'blur', validators: [] }],
            authQuantityExceededStatus: ['', {updateOn: 'blur', validators: [] }],
            authSecOpReqReason: ['', {updateOn: 'blur', validators: [] }],
            authSecOpReqStatus: ['', {updateOn: 'blur', validators: [] }],
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    isFormDataChangedStatus = () => {
        this.authorizationClaimLinkRuleForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
        })
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '';
        viewModal.componentInstance.showIcon = true;
    }
}
