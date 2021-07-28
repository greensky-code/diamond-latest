/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {Form} from '../../../shared/helpers/form.helper';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {AuthMaster, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {AuthMasterService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {AUTHORIZATION_APPEALS} from '../../../shared/app-constants';
import {Menu} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {AuthAppealService} from '../../../api-services/authorization/auth-appeal.service';
import {AuthAppeal} from '../../../api-models/authorization/auth-appeal.model';
import {SearchService} from '../../../shared/services/search.service';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_AUTH_CERT_TYPE} from '../../../shared/models/constants';
import {getAuthorizationAppealsShortcutKeys} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NotesComponent} from '../../../shared/components/notes/notes.component';
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {MemberMasterService} from "../../../api-services/member-master.service";
import {LookupService} from "../../../shared/services/lookup.service";

// Use the Component directive to define the AuthorizationAppealsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationappeals',
    templateUrl: './authorization-appeals.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        AuthMasterService,
        AuthAppealService
    ]

})
export class AuthorizationAppealsComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationAppealsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'APPEL';
    public isSuperUser = false;
    public secProgress = true;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    memberModuleId = AUTHORIZATION_APPEALS;
    certificationsTypes = [];
    showGrid001Form = false;
    showGrid002Form = false;
    isValidAuthNumber = false;
    editAuthMaster: boolean;
    seqProvId: number;
    authMaster: AuthMaster;
    authMasters: AuthMaster[];
    public menu: Menu[] = [];
    editAuthAppeal: boolean;
    authAppeal: AuthAppeal;
    authAppeals: AuthAppeal[];
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    authorizationAppealsData = [];
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Input() showIcon = false;

    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;

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
        private toastService: ToastService,
        private systemCodesService: SystemCodesService,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private searchService: SearchService,
        private messageService: MessageMasterDtlService,
        private memberEligHistoryService: MemberEligHistoryService,
        private memberMasterService: MemberMasterService,
        private MemberEligHistoryService: MemberEligHistoryService,
        private authMasterService: AuthMasterService,
        private authAppealService: AuthAppealService,
        private lookupService: LookupService) {
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
        this.formValidation = new FormValidation(this.authorizationAppealsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getCertificationsType();
        this.menuInit();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        }, 100);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthorizationAppealsShortcutKeys(this));
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
                this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;

            this.showPopUp(error, 'Window Error')

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
        this.secColDetailService.findByTableNameAndUserId('AUTH_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
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
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
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
                    {name: 'Lookup', disabled: false},
                    {name: 'Next Topic', disabled: true},
                    {name: 'Previous Topic', disabled: true}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Auth Lookup'},
                    {name: 'Send To Case Management'},
                    {name: 'View Claims with Auth Number'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Auth Master'},
                    {name: 'Days Visit Update'},
                    {name: 'Procedure'},
                    {name: 'Physician Advisor'},
                    {name: 'Second Opinion'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
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
        ];
    }

    private handleTopicMenu(action: string) {
        this.toastService.showToast(
            'This option is not implemented yet',
            NgbToastType.Danger
        );
    }

    private handleNotesMenu(action: string) {
        switch (action) {
            case 'Notes': {
                let ref = this.modalService.open(NotesComponent, NGBModalOptions);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.winId = this.windowId;
                break;
            }
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Auth Lookup': {
                this.openAuthNumberModal();
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewAuthAppealsShortCutAction();
                    break;
                }
                case 'Open': {
                    this.initializeComponentState();
                    break;
                }
                case 'Save': {
                    this.saveAuthAppeal();
                    break;
                }
                case 'Close': {
                    this.activeModal.close();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'Printer Setup': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic Actions
            this.toastService.showToast(
                'Action is not valid',
                NgbToastType.Danger
            );
        } else if (event.menu.menuItem === 'Notes') {
            // handle notes-Menu Actions
            this.handleNotesMenu(event.action);
        }
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
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getCertificationsType() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_AUTH_CERT_TYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.certificationsTypes = systemCodes;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    openPhysicianAdvisorModal() {
        this.lookupService.openPhysicianAdvisorModal((response: any) => {
            if (response) {
                this.seqProvId = response.SEQ_PROV_ID;
                if (response != null) {
                    this.authorizationAppealsForm.patchValue({
                        'advisor': response.PROVIDER_ID,
                        'dynamicText004': response.SHORT_NAME,
                        'type': response.PROVIDER_TYPE,
                        'primarySpec': response.SPECIALTY_TYPE
                    });
                }
                this.popUpMessage = null;
            }
        });
    }

    openAuthNumberModal() {
        this.lookupService.openAuthNumberModal((response: any) => {
            if (response) {
                this.authorizationAppealsForm.patchValue({
                    authNumber: response.AUTH_NUMBER,
                });
                this.loadGridData(response.AUTH_NUMBER);
                this.popUpMessage = null;
            }
        });
    }

    openAuthCodeModal() {
        this.lookupService.openAuthCodeByTypeModal((response: any) => {
            if (response) {
                this.authorizationAppealsForm.patchValue({
                    appDeterm: response.AUTH_CODE,
                });
                this.popUpMessage = null;
            }
        }, 'AP');
    }

    openAuthNumberTab(event: any) {
        this.enterAuthNumber(event.target.value);
    }

    onRowSelectedGrid001(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.showGrid001Form = true;
        this.loadDataGridForm001(event.data);
    }

    loadDataGridForm001(eventData: AuthMaster) {
        this.showGrid001Form = true;
        this.authMaster = eventData;
    }

    onRowSelectedGrid002(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.showGrid002Form = true;
        this.editAuthAppeal = true;
        this.authAppeal = event.data;
        this.loadDataGridForm002(event.data);
    }

    loadDataGridForm002(eventData: AuthAppeal) {
        this.authAppeal = eventData;
        this.showGrid002Form = true;
        this.authorizationAppealsForm.patchValue({
            appealNumber: eventData.appealNumber,
            appellant: eventData.appellant,
            contactDate: this.dateFormatPipe.defaultDisplayDateFormat(eventData.contactDate),
            decisionDate: this.dateFormatPipe.defaultDisplayDateFormat(eventData.decisionDate),
            notifiDate: this.dateFormatPipe.defaultDisplayDateFormat(eventData.notificationDate),
            appDeterm: eventData.advisorDecision,
            comments: eventData.comments
        }, {emitEvent: false});
        this.isFormDataModified()
        if (eventData.provMaster != null) {
            this.authorizationAppealsForm.patchValue({
                advisor: eventData.provMaster.providerId,
                dynamicText004: eventData.provMaster.shortName,
                type: eventData.provMaster.providerType,
                primarySpec: eventData.provMaster.specialtyType
            });
        }
    }

    loadGridData(authNumber: number) {
        this.authMasterService.findListByAuthNumber(authNumber).subscribe((value: any[]) => {
            this.dataGrid001GridOptions.api.setRowData(value);
            if (value.length > 0) {
                this.dataGrid001GridOptions.api.selectNode(this.dataGrid001GridOptions.api.getRenderedNodes()[0]);
            }
            this.authAppealService.getAuthAppeal(authNumber).subscribe((response: any[]) => {
                this.dataGrid002GridOptions.api.setRowData(response);
                if (response && response.length > 0) {
                    this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                }
            });
        });
    }

    createAuthMaster() {
        this.formValidation.validateForm();
        if (this.authorizationAppealsForm.valid) {
            let authMaster = new AuthMaster();
            authMaster.authNumber = Form.getValue(this.authorizationAppealsForm, 'authNumber');
            authMaster.requestedDate = Form.getValue(this.authorizationAppealsForm, 'reqDate');
            authMaster.authType = Form.getValue(this.authorizationAppealsForm, 'authType');
            authMaster.authLevel = Form.getValue(this.authorizationAppealsForm, 'leverl');
            authMaster.tplCode = Form.getValue(this.authorizationAppealsForm, 'tplCode');
            authMaster.privacyApplied = Form.getValue(this.authorizationAppealsForm, 'privacyMaApply');
            authMaster.memberAge = Form.getValue(this.authorizationAppealsForm, 'memberId');
            authMaster.seqGroupId = Form.getValue(this.authorizationAppealsForm, 'groupId');
            authMaster.planCode = Form.getValue(this.authorizationAppealsForm, 'planCode');
            authMaster.nsSubscriberId = Form.getValue(this.authorizationAppealsForm, 'nonSysSubscriberId');
            authMaster.certificationType = Form.getValue(this.authorizationAppealsForm, 'certificationType');
            authMaster.paperworkAttached = Form.getValue(this.authorizationAppealsForm, 'paperworkAttachment');
            this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editAuthMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateAuthMaster(secondaryAuthNo: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authorizationAppealsForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authNumber = Form.getValue(this.authorizationAppealsForm, 'authNumber');
                authMaster.requestedDate = Form.getValue(this.authorizationAppealsForm, 'reqDate');
                authMaster.authType = Form.getValue(this.authorizationAppealsForm, 'authType');
                authMaster.authLevel = Form.getValue(this.authorizationAppealsForm, 'leverl');
                authMaster.tplCode = Form.getValue(this.authorizationAppealsForm, 'tplCode');
                authMaster.privacyApplied = Form.getValue(this.authorizationAppealsForm, 'privacyMaApply');
                authMaster.memberAge = Form.getValue(this.authorizationAppealsForm, 'memberId');
                authMaster.seqGroupId = Form.getValue(this.authorizationAppealsForm, 'groupId');
                authMaster.planCode = Form.getValue(this.authorizationAppealsForm, 'planCode');
                authMaster.nsSubscriberId = Form.getValue(this.authorizationAppealsForm, 'nonSysSubscriberId');
                authMaster.certificationType = Form.getValue(this.authorizationAppealsForm, 'certificationType');
                authMaster.paperworkAttached = Form.getValue(this.authorizationAppealsForm, 'paperworkAttachment');
                this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editAuthMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveAuthMaster() {
        if (this.editAuthMaster) {
            this.updateAuthMaster(this.authMaster.secondaryAuthNo)
        } else {
            this.createAuthMaster();
        }
    }

    deleteAuthMaster(secondaryAuthNo: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authMasterService.deleteAuthMaster(secondaryAuthNo).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getAuthMaster(authNo: string) {
        this.authMasterService.getAuthMaster(authNo).subscribe(authMaster => {
            this.authMasters = authMaster;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    setAuthmasterForm() {
        this.authorizationAppealsForm.patchValue({
            'authNumber': this.authMaster.authNumber,
            'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
            'authType': this.authMaster.authType,
            'leverl': this.authMaster.authLevel,
            'tplCode': this.authMaster.tplCode,
            'privacyMaApply': this.authMaster.privacyApplied,
            'memberId': this.authMaster.memberAge,
            'groupId': this.authMaster.seqGroupId,
            'planCode': this.authMaster.planCode,
            'nonSysSubscriberId': this.authMaster.nsSubscriberId,
            'certificationType': this.authMaster.certificationType,
            'paperworkAttachment': this.authMaster.paperworkAttached,
        });
    }

    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
            this.authMasters = authMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    saveAuthAppeal() {
        if (this.securityService.checkInsertUpdatePermissions(this.editAuthAppeal, this.secWin)) {
            this.updateAuthAppeal();
        } else {
            this.createAuthAppeal();
        }
    }

    createAuthAppeal() {
        this.formValidation.validateForm();
        if (this.authorizationAppealsForm.valid) {
            let authAppeal = new AuthAppeal();
            authAppeal.authAppealPrimaryKey = {
                authNumber: Form.getValue(this.authorizationAppealsForm, 'authNumber'),
                secondaryAuthNo: Form.getValue(this.authorizationAppealsForm, 'secondaryAuthNo'),
                seqAuthAppeal: null
            };
            authAppeal.appealNumber = Form.getValue(this.authorizationAppealsForm, 'appealNumber');
            authAppeal.appellant = Form.getValue(this.authorizationAppealsForm, 'appellant');
            authAppeal.seqProvId = this.authAppeal.seqProvId;
            authAppeal.contactDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'contactDate');
            authAppeal.decisionDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'decisionDate');
            authAppeal.notificationDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'notifiDate');
            authAppeal.advisorDecision = Form.getValue(this.authorizationAppealsForm, 'appDeterm');
            authAppeal.comments = Form.getValue(this.authorizationAppealsForm, 'comments');
            this.authAppealService.createAuthAppeal(authAppeal).subscribe(res => {
                this.authAppealService.getAuthAppeal(authAppeal.authAppealPrimaryKey.authNumber).subscribe((response: any[]) => {
                    this.dataGrid002GridOptions.api.setRowData(response);
                    if (response.length > 0) {
                        this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                    }
                });
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editAuthAppeal = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateAuthAppeal() {
        console.log(this.authAppeal)
        this.formValidation.validateForm();
        if (this.authorizationAppealsForm.valid) {
            let authAppeal = new AuthAppeal();
            authAppeal.authAppealPrimaryKey = {
                authNumber: Form.getValue(this.authorizationAppealsForm, 'authNumber'),
                secondaryAuthNo: Form.getValue(this.authorizationAppealsForm, 'secondaryAuthNo'),
                seqAuthAppeal: this.authAppeal.authAppealPrimaryKey.seqAuthAppeal
            };
            authAppeal.appealNumber = Form.getValue(this.authorizationAppealsForm, 'appealNumber');
            authAppeal.appellant = Form.getValue(this.authorizationAppealsForm, 'appellant');
            authAppeal.seqProvId = this.authAppeal.seqProvId;
            authAppeal.contactDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'contactDate');
            authAppeal.decisionDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'decisionDate');
            authAppeal.notificationDate = Form.getDatePickerValue(this.authorizationAppealsForm, 'notifiDate');
            authAppeal.advisorDecision = Form.getValue(this.authorizationAppealsForm, 'appDeterm');
            authAppeal.comments = Form.getValue(this.authorizationAppealsForm, 'comments');
            this.authAppealService.updateAuthAppeal(authAppeal, this.authAppeal.authNumber, this.authAppeal.authAppealPrimaryKey.seqAuthAppeal, this.authAppeal.secondaryAuthNo).subscribe(response => {
                this.authAppealService.getAuthAppeal(authAppeal.authAppealPrimaryKey.authNumber).subscribe((response: any[]) => {
                    this.dataGrid002GridOptions.api.setRowData(response);
                    if (response.length > 0) {
                        this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                    }
                });
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editAuthAppeal = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    deleteAuthAppeal(authNumber: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authAppealService.deleteAuthAppeal(authNumber).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getAuthAppeal(authNumber: number) {
        this.authAppealService.getAuthAppeal(authNumber).subscribe(authAppeal => {
            this.authAppeal = authAppeal[0];
            this.authorizationAppealsForm.patchValue({
                'authNumber': this.authAppeal.authNumber,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getAuthAppeals() {
        this.authAppealService.getAuthAppeals().subscribe(authAppeals => {
            this.authAppeals = authAppeals;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    enterAuthNumber(value: any) {
        if (isNaN(Number(value))) {
            this.showPopUp('9817: Auth Number must be numeric',
                'Authorization');
            return;
        }
        let res = [{'AUTH_NUMBER': value}];
        let sm = JSON.parse(JSON.stringify(this.lookupService.getAuthNumberSearchModel()));
        sm.searchOption = res;
        this.searchService.getSearchResults(sm).subscribe(resp => {
            if (resp == null) {
                this.authorizationAppealsForm.patchValue({
                    authNumber: null,
                    // authLevel: null
                });
                this.showPopUp('9853: A current Authorization must be selected before a new record can be created',
                    'Authorization Days Visits Update');
            } else {
                this.authorizationAppealsForm.patchValue({
                    authNumber: resp[0].AUTH_NUMBER,
                    secondaryAuthNo: resp[0].AUTH_SECONDARY_AUTH_NO
                    // authLevel: resp[0].AUTH_LEVEL
                });
                this.isValidAuthNumber = true;
                this.loadGridData(resp[0].AUTH_NUMBER);
                this.authorizationAppealsForm.get('authNumber').disable();
                this.authMasterService.getAuthMaster(value).subscribe(authProcMas => {
                    for (let item of authProcMas) {
                        item.activeDaysVisit = item.activeDaysVisit ? 'Yes' : 'No';
                    }
                    this.authMasters = authProcMas;

                    this.showGrid001Form = true;
                    this.authMaster = this.authMasters[0];
                    this.memberMasterService.findBySubscriberId(this.authMaster.memberEligHistory.subscriberId).subscribe(res => {
                        let memberMasterData = res[0];
                        this.MemberEligHistoryService.getSelectMemberGrid(memberMasterData.seqSubsId).subscribe(resp => {
                            let memberEligHistroyData = resp[0];
                            if (memberEligHistroyData) {
                                this.memberEligHistoryService
                                    .getMember_bavc(memberEligHistroyData.seqSubsId).subscribe(response => {
                                    let memberBavcData = response[0];
                                    this.authorizationAppealsForm.patchValue({
                                        'groupId': memberEligHistroyData.groupId,
                                        'dynamicText003': memberBavcData.short_name,
                                        'planCode': memberBavcData.plan_code
                                    });
                                    this.authMasters[0].memberEligHistory.groupId = memberEligHistroyData.groupId;
                                    this.dataGrid001GridOptions.api.setRowData(this.authMasters);
                                    this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                                })
                            }
                            this.authorizationAppealsForm.patchValue({
                                'authNumber': value,
                                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                                'authType': this.authMaster.authType,
                                'level': this.authMaster.authLevel,
                                'pcpId': this.authMaster.requestedDate,
                                // 'diamondId': this.authMaster.memberMaster.diamondId,
                                'tplCode': this.authMaster.tplCode == "NA" ? "Not Applicable" : this.authMaster.tplCode, //drp down
                                'lob': this.authMaster.memberEligHistory.lineOfBusiness,
                                'privacyMayApply': this.authMaster.privacyApplied,
                                'memberId': this.authMaster.memberEligHistory.subscriberId,
                                'textbox': this.authMaster.memberEligHistory.personNumber,
                                'dynamicText001': memberMasterData.lastName,
                                'dynamicText002': memberMasterData.firstName,
                                'age': this.authMaster.memberAge,
                                'sex': this.authMaster.memberGender,
                                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                                'certificationType': this.authMaster.certificationType === '3' ? 'Cancel' : this.authMaster.certificationType, // Drop Down
                                'paperworkAttachment': this.authMaster.paperworkAttached === 'N' ? 'None' : this.authMaster.paperworkAttached,   // Drop Down
                                'batchId': this.authMaster.batchId,
                            }, {emitEvent: false});
                        })
                    });

                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
                });
            }
        }, error => {
            this.showPopUp('9853: A current Authorization must be selected before a new record can be created',
                'Authorization Days Visits Update');
            this.authorizationAppealsForm.patchValue({
                authNumber: null,
                // authLevel: null
            });
        });
    }

    public createNewAuthAppealsShortCutAction() {
        this.editAuthAppeal = false;
        if (!this.isValidAuthNumber) {
            this.showPopUp('9853: A current Authorization must be selected before a new record can be created',
                'Authorization Days Visits Update');
            return;
        }
        this.dataGrid002GridOptions.api.deselectAll();
        this.authorizationAppealsForm.patchValue({
            appealNumber: null,
            appellant: null,
            advisor: null,
            dynamicText004: null,
            type: null,
            primarySpec: null,
            contactDate: null,
            decisionDate: null,
            notifiDate: null,
            appDeterm: null,
            comments: ''
        });
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Auth Number',
                field: 'authMasterPrimaryKey.authNumber',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Secondary',
                field: 'authMasterPrimaryKey.secondaryAuthNo',
                width: 200
            },
            {
                headerName: 'Req. Date',
                field: 'requestedDate',
                width: 200
            },
            {
                headerName: 'Type',
                field: 'authType',
                width: 200
            },
            {
                headerName: 'Ext',
                field: 'activeDaysVisit',
                width: 200,
            },
            {
                headerName: 'Member ID',
                field: '',
                width: 200,
                valueGetter :(data)=>{
                    if(data.data.memberEligHistory.subscriberId)
                    {
                        return data.data.memberEligHistory.subscriberId + '   ' + data.data.memberEligHistory.personNumber;
                    }

                }
            },
            {
                headerName: "Diamond ID",
                field: "diamondId",
                width: 130
            },
            {
                headerName: "Group ID",
                field: "memberEligHistory.groupId",
                width: 130
            },
            {
                headerName: "Plan Code",
                field: "memberEligHistory.planCode",
                width: 130
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Appeal Number',
                field: 'appealNumber',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Physician Advisor',
                field: 'provMaster.providerId',
                width: 200
            },
            {
                headerName: 'Contact Date',
                field: 'contactDate',
                width: 200
            },
            {
                headerName: 'Decision Date',
                field: 'decisionDate',
                width: 200
            },
            {
                headerName: 'Appellant',
                field: 'appellant',
                width: 200
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationAppealsForm = this.formBuilder.group({
            authNumber: ['', {updateOn: 'blur', validators: []}],
            secondaryAuthNo: ['', {updateOn: 'blur', validators: []}],
            reqDate: ['', {updateOn: 'blur', validators: []}],
            authType: ['', {updateOn: 'blur', validators: []}],
            level: ['', {updateOn: 'blur', validators: []}],
            pcpId: ['', {updateOn: 'blur', validators: []}],
            diamondId: ['', {updateOn: 'blur', validators: []}],
            tplCode: ['', {updateOn: 'blur', validators: []}],
            lob: ['', {updateOn: 'blur', validators: []}],
            privacyMayApply: ['', {updateOn: 'blur', validators: []}],
            memberId: ['', {updateOn: 'blur', validators: []}],
            textbox: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            age: ['', {updateOn: 'blur', validators: []}],
            sex: ['', {updateOn: 'blur', validators: []}],
            groupId: ['', {updateOn: 'blur', validators: []}],
            dynamicText003: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            nonSysSubscriberId: ['', {updateOn: 'blur', validators: []}],
            certificationType: ['', {updateOn: 'blur', validators: []}],
            paperworkAttachment: ['', {updateOn: 'blur', validators: []}],
            batchId: ['', {updateOn: 'blur', validators: []}],

            appealNumber: ['', {updateOn: 'blur', validators: []}],
            appellant: ['', {updateOn: 'blur', validators: []}],
            advisor: ['', {updateOn: 'blur', validators: []}],
            dynamicText004: ['', {updateOn: 'blur', validators: []}],
            type: ['', {updateOn: 'blur', validators: []}],
            primarySpec: ['', {updateOn: 'blur', validators: []}],
            contactDate: ['', {updateOn: 'blur', validators: []}],
            decisionDate: ['', {updateOn: 'blur', validators: []}],
            notifiDate: ['', {updateOn: 'blur', validators: []}],
            appDeterm: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]

        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Appeals')
            })
        } else {
            this.activeModal.close();
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
            ref.componentInstance.buttonclickEvent.subscribe((response: any) => {
                if (response.name === 'Yes') {
                    this.saveAuthAppeal()
                } else if (response.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.authorizationAppealsForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    authOnRowClicked(event: any) {
        const selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();

        if (selectedRows.length === 1) {
            this.editAuthMaster = true;
            this.authMaster = selectedRows[0];
            this.dataGrid001GridOptions.api.selectIndex(event.rowIndex, null, null);

        } else {
        }
    }

    authOnReady() {
        this.dataGrid001GridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
    }

}
