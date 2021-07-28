/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {DatePipe} from '@angular/common';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {TOOTH_RULE_MODULE_ID} from '../../../shared/app-constants';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu, SearchModel} from '../../../shared/models/models';
import {SecurityService} from '../../../shared/services/security.service';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecUserService, SystemCodesService} from '../../../api-services';
import {SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {ToothRuleService} from '../../../api-services/tooth-rule.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {ToothRule} from '../../../api-models/tooth-rule.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Form} from '../../../shared/helpers/form.helper';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {ToothRuleLookup} from '../../../shared/lookup/tooth-rule-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {
    DEFAULT_LANGUAGE,
    SYSTEM_CODE_DNCLMARCH, SYSTEM_CODE_DNCLMORALCAV,
    SYSTEM_CODE_DNCLMQUADRANT,
    SYSTEM_CODE_DNCLMSURFACE, SYSTEM_CODE_DNCLMTOOTH
} from '../../../shared/models/constants';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {getToothHistoryShortcutKeys, getToothRuleShortcutKeys} from "../../../shared/services/shared.service";

// Use the Component directive to define the ToothRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'toothrule',
    templateUrl: './tooth-rule.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        ToothRuleService
    ]
})
export class ToothRuleComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    toothRuleForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: 'TRULE';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public showToothRuleFields: boolean;
    public isToothRuleIdDisabled = false;
    editToothRule: boolean;
    toothRule: ToothRule;
    toothRules: ToothRule[];
    memberModuleId = TOOTH_RULE_MODULE_ID;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    surfaces: any[] = [];
    arches: any[] = [];
    quadrants: any[] = [];
    oralCavities: any[] = [];
    toothStatuses: any[] = [];
    toothNumbers: any[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    searchModel = new SearchModel(
        'toothrules/lookup',
        ToothRuleLookup.TOOTH_RULE_ALL,
        ToothRuleLookup.TOOTH_RULE_DEFAULT,
        []
    );
    shortcuts: ShortcutInput[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
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
        private toothRuleService: ToothRuleService,
        private systemCodesService: SystemCodesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.toothRuleForm);
        this.menuInit();
        this.getToothNumbers();
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
                this.showPopUp('You are not Permitted to view Tooth Rule', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('TOOTH_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
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
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
        } else if (event.menu.menuItem == 'Help') {
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
                    {name: 'New'},
                    {name: 'Open'},
                    {name: 'Save'},
                    {name: 'Close'},
                    {name: '-'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste', disabled: true},
                    {isHorizontal: true},
                    {name: 'Lookup'},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Tooth Rule Lookup'},
                    {name: 'Surfaces'},
                    {name: 'Arch'},
                    {name: 'Quadrant'},
                    {name: 'Oral Cavity'},
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'},
                ],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Shift+Alt+T'},
                    {name: 'Layer', shortcutKey: 'Shift+Alt+L'},
                    {name: 'Cascade', shortcutKey: 'Shift+Alt+C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift+Alt+I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'}
                ]
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
                    { isHorizontal: true},
                    { name: '1 Main Menu'},
                    { name: '2 Tooth Rule'}
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

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Tooth Rule Lookup': {
                 this.openLookupFieldSearchModel();
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
             this.getToothRuleByRuleId(id);
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getToothRule(res.seqToothRuleId);
            this.isToothRuleIdDisabled = true;
            this.showToothRuleFields = true;
            this.popUpMessage = null;
        });
    }

    getToothRuleByRuleId(ruleId: string) {
        let toothRuleId = {
            'toothRuleId': ruleId,
        };
        this.toothRuleService.getToothRuleByRuleNumber(toothRuleId).subscribe(
            (toothRule) => {
                if (toothRule) {
                    this.getToothRule(toothRule.seqToothRuleId);
                    this.isToothRuleIdDisabled = true;
                    this.showToothRuleFields = true;
                    this.popUpMessage = null;
                } else {
                    this.showToothRuleFields = false;
                    // tslint:disable-next-line:max-line-length
                    let popUpMessage = new PopUpMessage(
                        'ruleNotExistPopup',
                        'Tooth Rule',
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
            },
            (error) => {
                console.log('error');
                this.showToothRuleFields = false;

            }
        );
    }


    getSurface() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMSURFACE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.surfaces = systemCodes;
        });
    }

    getArches() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMARCH, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.arches = systemCodes;
        });
    }

    getQuadrants() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMQUADRANT, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.quadrants = systemCodes;
        });
    }

    getOralClavities() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMORALCAV, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.oralCavities = systemCodes;
        });
    }

    getToothNumbers() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_DNCLMTOOTH, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.toothNumbers = systemCodes;
        });
    }

    createToothRule() {
        this.formValidation.validateForm();
        if (this.toothRuleForm.valid) {
            let toothRule = new ToothRule();
            toothRule.toothRuleId = Form.getValue(this.toothRuleForm, 'toothRuleId');
            toothRule.toothNumber = Form.getValue(this.toothRuleForm, 'toothNumber');
            toothRule.procedureCode = Form.getValue(this.toothRuleForm, 'procedureCode');
            toothRule.description = Form.getValue(this.toothRuleForm, 'description');
            toothRule.effDate = Form.getValue(this.toothRuleForm, 'effDate');
            toothRule.termDate = Form.getValue(this.toothRuleForm, 'termDate');
            toothRule.termReason = Form.getValue(this.toothRuleForm, 'termReason');
            toothRule.fromAge = Form.getValue(this.toothRuleForm, 'fromAge');
            toothRule.toAge = Form.getValue(this.toothRuleForm, 'toAge');
            toothRule.allSurfaceInd = Form.getValue(this.toothRuleForm, 'surface');
            toothRule.allOralInd = Form.getValue(this.toothRuleForm, 'oralCavity');
            toothRule.userDefined1 = Form.getValue(this.toothRuleForm, 'userDefined1');
            toothRule.userDate1 = Form.getValue(this.toothRuleForm, 'userDate1');
            toothRule.userDefined2 = Form.getValue(this.toothRuleForm, 'userDefined2');
            toothRule.userDate2 = Form.getValue(this.toothRuleForm, 'userDate2');
            this.toothRuleService.createToothRule(toothRule).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editToothRule = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateToothRule(seqToothRuleId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.toothRuleForm.valid) {
                let toothRule = new ToothRule();
                toothRule.toothRuleId = Form.getValue(this.toothRuleForm, 'toothRuleId');
                toothRule.toothNumber = Form.getValue(this.toothRuleForm, 'toothNumber');
                toothRule.procedureCode = Form.getValue(this.toothRuleForm, 'procedureCode');
                toothRule.description = Form.getValue(this.toothRuleForm, 'description');
                toothRule.effDate = Form.getValue(this.toothRuleForm, 'effDate');
                toothRule.termDate = Form.getValue(this.toothRuleForm, 'termDate');
                toothRule.termReason = Form.getValue(this.toothRuleForm, 'termReason');
                toothRule.fromAge = Form.getValue(this.toothRuleForm, 'fromAge');
                toothRule.toAge = Form.getValue(this.toothRuleForm, 'toAge');
                toothRule.allSurfaceInd = Form.getValue(this.toothRuleForm, 'surface');
                toothRule.allOralInd = Form.getValue(this.toothRuleForm, 'oralCavity');
                toothRule.userDefined1 = Form.getValue(this.toothRuleForm, 'userDefined1');
                toothRule.userDate1 = Form.getValue(this.toothRuleForm, 'userDate1');
                toothRule.userDefined2 = Form.getValue(this.toothRuleForm, 'userDefined2');
                toothRule.userDate2 = Form.getValue(this.toothRuleForm, 'userDate2');
                this.toothRuleService.updateToothRule(toothRule, seqToothRuleId).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editToothRule = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveToothRule() {
        if (this.editToothRule) {
            this.updateToothRule(this.toothRule.seqToothRuleId)
        } else {
            this.createToothRule();
        }
    }

    deleteToothRule(seqToothRuleId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.toothRuleService.deleteToothRule(seqToothRuleId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getToothRule(seqToothRuleId: number) {
        this.toothRuleService.getToothRule(seqToothRuleId).subscribe(toothRule => {
            this.toothRule = toothRule;
            this.toothRuleForm.patchValue({
                'toothRuleId': this.toothRule.toothRuleId,
                'toothNumber': this.toothRule.toothNumber,
                'procedureCode': this.toothRule.procedureCode,
                'description': this.toothRule.description,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.toothRule.effDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.toothRule.termDate),
                'termReason': this.toothRule.termReason,
                'fromAge': this.toothRule.fromAge,
                'toAge': this.toothRule.toAge,
                'surface': this.toothRule.allSurfaceInd === 'S' ? 'Some' : 'None',
                'arch': this.toothRule.allArchInd === 'S' ? 'Some' : 'None',
                'quadrant': this.toothRule.allQuadInd === 'A' ? 'All' : 'None',
                'oralCavity': this.toothRule.allOralInd === 'S' ? 'Some' : 'None',
                'userDefined1': this.toothRule.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.toothRule.userDate1),
                'userDefined2': this.toothRule.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.toothRule.userDate2)
            });
        });
    }

    getToothRules() {
        this.toothRuleService.getToothRules().subscribe(toothRules => {
            this.toothRules = toothRules;
        });
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.toothRuleForm = this.formBuilder.group({
            toothRuleId: ['', {updateOn: 'blur', validators: []}],
            toothNumber: ['', {updateOn: 'blur', validators: []}],
            procedureCode: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}],
            effDate: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            termReason: ['', {updateOn: 'blur', validators: []}],
            fromAge: ['', {updateOn: 'blur', validators: []}],
            toAge: ['', {updateOn: 'blur', validators: []}],
            surface: ['', {updateOn: 'blur', validators: []}],
            arch: ['', {updateOn: 'blur', validators: []}],
            quadrant: ['', {updateOn: 'blur', validators: []}],
            oralCavity: ['', {updateOn: 'blur', validators: []}],
            userDefined1: ['', {updateOn: 'blur', validators: []}],
            userDate1: ['', {updateOn: 'blur', validators: []}],
            userDefined2: ['', {updateOn: 'blur', validators: []}],
            userDate2: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getToothRuleShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/TRULE_Tooth_Rules.htm'
    }

}
