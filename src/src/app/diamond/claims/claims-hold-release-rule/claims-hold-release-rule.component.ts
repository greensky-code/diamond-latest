/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeterminantRules, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, DeterminantRulesService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {Menu} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {CapFundHdrService} from '../../../api-services/common/cap-fund-hdr.service';
import {AuthAppeal} from '../../../api-models/authorization/auth-appeal.model';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_DNCLMSURFACE} from '../../../shared/models/constants';
import {
    CONSTANTS,
    getCapitationFundModelShortcutKeys,
    getClaimHoldReleaseRuleShortcutKeys,
    getCOBHoldDenyShortcutKeys
} from '../../../shared/services/shared.service';
import {CapFundDtlService} from '../../../api-services/common/cap-fund-dtl.service';
import {IncentiveRule} from '../../../api-models/incentive-rule.model';
import {CapFundHdr} from '../../../api-models/common/cap-fund-hdr.model';
import {CapFundDtl} from '../../../api-models/common/cap-fund-dtl.model';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {CAPITATION_FUND_MODEL_MODULE_ID} from '../../../shared/app-constants';
import {DatePipe} from '@angular/common';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";

// Use the Component directive to define the ClaimsHoldReleaseRuleComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimsholdreleaserule',
    templateUrl: './claims-hold-release-rule.component.html',
    providers: [DatePipe]

})
export class ClaimsHoldReleaseRuleComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    claimsHoldReleaseRuleForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'RHRUL';
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    public menu: Menu[] = [];
    memberModuleId = CAPITATION_FUND_MODEL_MODULE_ID;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    seqRuleId: number;
    claimTypes: any[] = [];
    editReleaseRule: Boolean;
    private cdr: ChangeDetectorRef;
    shortcuts: ShortcutInput[] = [];
    isReadonly: Boolean = true;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private router: Router,
        private route: ActivatedRoute,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        private datePipe: DatePipe,
        private determinantRulesService: DeterminantRulesService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimHoldReleaseRuleShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimsHoldReleaseRuleForm);
        this.createDataGrid();
        this.getHoldReleaseRule();
        this.getClaimTypes();
        this.menuInit();
    }

    getClaimTypes() {
        this.systemCodesService.getSystemCodesByLangAndtype('CLAIMTYPE', DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.claimTypes = systemCodes;
        });
    }

    getHoldReleaseRule() {
        this.determinantRulesService.getDeterminantRules('RHRUL').subscribe(
            (result) => {
                if (result) {
                    this.dataGridGridOptions.api.setRowData(result);
                    if (result.length > 0) {
                        this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
                    }
                } else {
                    this.toastService.showToast('Determinant Rules Not Found', NgbToastType.Danger);
                }
            },
            (error) => {
                console.log('error');
            }
        );
    }

    onRowSelectedGrid(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.seqRuleId = event.data.determinantRulesPrimaryKey.seqRuleId;
        this.editReleaseRule = true;
        this.loadDataGridForm(event.data);
    }

    loadDataGridForm(eventData: DeterminantRules) {
        this.editReleaseRule = true;
        this.claimsHoldReleaseRuleForm.patchValue({
            claimType: eventData.fileType,
            releaseRule: eventData.ruleId,
            applyToHeaderOnly: eventData.actionCode === 'Y',
            description: eventData.description
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidationStatus();
        }, 2000)
    }


    createDataGrid(): void {
      this.dataGridGridOptions = {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: 'Claim Type',
             field: 'fileType',
             width: 400,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true,
             cellRenderer: (params) => {
                 if (params.data !== undefined) {
                     const claimType = this.claimTypes.find(m => m.systemCode === params.data.fileType);
                     return claimType ? claimType.systemCodeDesc2 : ''
                 }
             }
         },
         {
             headerName: 'Release Rule',
             field: 'ruleId',
             width: 300         },
         {
             headerName: 'Apply To Header only',
             field: 'actionCode',
             width: 300,
             cellRenderer: (params) => {
                 if (params.data.actionCode === 'Y') {
                     return  'YES'
                 } else {
                     return 'NO'
                 }
             }
         }
      ];
    }

    createClaimHoldReleaseRule() {
        this.formValidation.validateForm();
        if (this.claimsHoldReleaseRuleForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.determinantRulesPrimaryKey = {
                keyword: 'RHRUL',
                seqRuleId: null
            };
            determinantRules.fileType = this.claimsHoldReleaseRuleForm.get('claimType').value;
            determinantRules.ruleId = this.claimsHoldReleaseRuleForm.get('releaseRule').value;
            determinantRules.actionCode = this.claimsHoldReleaseRuleForm.get('applyToHeaderOnly').value == true ? 'Y' : 'N';
            determinantRules.description = this.claimsHoldReleaseRuleForm.get('description').value;

            determinantRules.ruleOrder = 10;
            determinantRules.securityCode = '0';
            determinantRules.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
            determinantRules.insertUser = sessionStorage.getItem('user');
            determinantRules.insertProcess = this.windowId;
            this.determinantRulesService.createDeterminantRules(determinantRules).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editReleaseRule = true;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.getHoldReleaseRule();
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateClaimHoldReleaseRule(seqRuleId: number) {
        this.formValidation.validateForm();
        let myDate = new Date();
        if (this.claimsHoldReleaseRuleForm.valid) {
            let determinantRules = new DeterminantRules();
            determinantRules.determinantRulesPrimaryKey = {
                keyword: 'RHRUL',
                seqRuleId: this.seqRuleId
            };
            determinantRules.fileType = this.claimsHoldReleaseRuleForm.get('claimType').value;
            determinantRules.ruleId = this.claimsHoldReleaseRuleForm.get('releaseRule').value;
            determinantRules.actionCode = this.claimsHoldReleaseRuleForm.get('applyToHeaderOnly').value === true ? 'Y' : 'N';
            determinantRules.description = this.claimsHoldReleaseRuleForm.get('description').value;

            determinantRules.ruleOrder = 10;
            determinantRules.securityCode = '0';
            determinantRules.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
            determinantRules.insertUser = sessionStorage.getItem('user');
            determinantRules.insertProcess = this.windowId;

            this.determinantRulesService.updateDeterminantRules(determinantRules, this.seqRuleId, 'RHRUL' ).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.getHoldReleaseRule();
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveClaimHoldReleaseRule() {
            if (this.editReleaseRule) {
                this.updateClaimHoldReleaseRule(this.seqRuleId);
            } else {
                this.createClaimHoldReleaseRule();
            }
    }

    newFormCreation() {
        this.dataGridGridOptions.api.deselectAll();
        this.editReleaseRule = false;
        this.claimsHoldReleaseRuleForm.reset();
        this.isReadonly = false;
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimsHoldReleaseRuleForm = this.formBuilder.group({
            claimType: ['', {updateOn: 'blur', validators: [Validators.required] }],
            releaseRule: ['', {updateOn: 'blur', validators: [Validators.required] }],
            applyToHeaderOnly: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                  this.newFormCreation();
                  this.isReadonly = false;
                  this.editReleaseRule = false;
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
                    this.saveClaimHoldReleaseRule();
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
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Audit Display': {

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
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Hold Release Rule Determinant', disabled: true },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', disabled: true },
                ],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'},
                    {name: 'Layer'},
                    {name: 'Cascade'},
                    {name: 'Arrange Icons'},

                    {name: 'Show Timestamp'},
                    {name: 'Audit Display'},

                    {name: '1 Main Menu'},
                    {name: '2 Group Master'},
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
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('CAPITATION_FUND_MODEL', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Capitation Fund Model')
            });
        } else {
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
                        if (this.editReleaseRule) {
                            this.updateClaimHoldReleaseRule(this.seqRuleId);
                        } else {
                            this.createClaimHoldReleaseRule();
                        }
                } else if (resp.name === 'No') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/RHRUL_Claim_Hold_Release_Rule.htm'
    };

    isFormValidationStatus = () => {
        this.claimsHoldReleaseRuleForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
