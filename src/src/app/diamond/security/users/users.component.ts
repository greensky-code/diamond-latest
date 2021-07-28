/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from "ag-grid-community";
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecUser } from "../../../api-models/sec-user.model"
import { SecUserService2 } from "../../../api-services/sec-user.service2"
import { SecUserClmLmtDetail } from "../../../api-models/sec-user-clm-lmt-detail.model"
import { SecUserClmLmtDetailService } from "../../../api-services/sec-user-clm-lmt-detail.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { FORM_FIELD_ACTION_TYPES, FormRow, Menu, OPERATIONS, SearchModel } from '../../../shared/models/models';
import { UsersLookup } from "../../../shared/lookup/users-lookup";
import { SecurityLookup } from '../../../shared/lookup/security-lookup';

import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import {
    DddwDtlService,
    DddwHdrService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    SystemCodesService,
    UserUsersService,
} from '../../../api-services';
import { CONSTANTS, getUsersShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { MessageMasterDtl, SystemCodes } from '../../../api-models';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { LanguageMaster } from '../../../api-models/language-master.model';
import { SecUser2 } from '../../../api-models/sec-user-2.model';
import { ChangePasswordService } from '../../../api-services/change-password.service';
import { IMyDateModel, IMySingleDateModel } from 'angular-mydatepicker';
import { AddDatabaseUserComponent } from '../add-database-user/add-database-user.component';

import { FunctionalLevelSecurityService } from "../../../api-services/security/functional-level-security.service";
import { UpdateUserPasswordComponent } from '../update-user-password/update-user-password.component';
import { ResetDatabasePasswordComponent } from '../reset-database-password/reset-database-password.component';
import { ClaimType } from './cell-renderers/claim-type';
import { WindowsAccessComponent } from '../windows-access/windows-access.component';
import { FunctionAccessComponent } from '../function-access/function-access.component';
import { SecColMaster } from '../../../api-models/security/sec-col-master.model';
import { SecColMasterService } from '../../../api-services/security/sec-col-master.service';
import { TimestampComponent } from "../../../shared/components/timestamp/timestamp.component";
import { AuditService } from "../../../shared/services/audit.service";
import { UserErrorPopupComponent } from './user-error-popup/user-error-popup.component';
import { UserFiltersFieldNames, UserFormConfig } from '../../../shared/models/constants';
import { SecUserClmLmtDetailPrimaryKeyModel } from '../../../api-models/security/sec-user-clm-lmt-detail-primary-key-model';
import { MenuBarComponent } from "../../../shared/components/menu-bar/menu-bar.component";
import { SecurityHelpComponent } from "../security-help/security-help.component";
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { ElementRef } from '@angular/core';


// Use the Component directive to define the UsersComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [
        SecUserClmLmtDetailService,
        AlertMessageService,
        DddwHdrService,
        DddwDtlService,
        LanguageMasterService,
        ReasonCodeMasterService,
        ChangePasswordService,
        MessageMasterDtlService,
        FunctionalLevelSecurityService,
        UserUsersService,
        AuditService
    ]

})
export class UsersComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() userId?: string;
    userTypes: any[] = [];
    claimTypes: any[] = [];
    holdReleases: any[] = [];
    reasonCodes: any[] = [];
    determinants: any[] = [];
    languageId: any[] = [];
    languageId1 = 0;
    systemCodes: SystemCodes[];
    public languageMasters: LanguageMaster[] = [];
    usersForm: FormGroup;
    formValidation: FormValidation;
    searchCustomerModal = new SearchModel('secusers/lookup',
        UsersLookup.USERS_ALL,
        UsersLookup.USERS_DEFAULT,

        [], true
    );
    searchSecModel = new SearchModel('seccolmasters/lookup', SecurityLookup.SECURITY_ALL, SecurityLookup.SECURITY_DEFAULT, []);

    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'SUSER';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;
    @Input() showIcon: boolean = false;
    menu: Menu[] = [];
    shortcuts: ShortcutInput[] = [];
    shortcutsInput: ShortcutInput[] = [];

    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    public faSearch = faSearch;
    private currentUserId: string;
    editTemplateId: boolean;
    public languageCode: any;
    //flags
    public templateFlgStatus = false;
    public superUserStatus = false;
    public queueSupervisorStatus = false;
    public usePassProfileStatus = true;
    editSecUser: boolean;
    public showData: boolean = false;
    private all: string = 'ALL';
    selectedDiv: any = null;

    secUser: SecUser2;
    secUsers: SecUser[];
    editSecUserClmLmtDetail: boolean;
    secUserClmLmtDetail: SecUserClmLmtDetail;
    secUserClmLmtDetails: SecUserClmLmtDetail[];
    secColMaster: SecColMaster;
    secColMasters: SecColMaster[];
    securityFields: string[] = [];
    screenCloseRequested: Boolean = false;
    isFormModifiedStatus: Boolean = false;
    accountStatus: string;
    agGridTableClickable: Boolean = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    gridSelectionStatus: boolean = true;
    detectChangesStatus: boolean = false;

    recordCount: number = 1;
    userFormConfig = UserFormConfig;
    userPrevState: Array<FormRow> = [];
    secUserClmLmtDetailsData: SecUserClmLmtDetail[] = [];
    menuOpened = "";
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    dynamicModificationStatus: boolean = false;
    @ViewChild(DynamicFormComponent, { static: false }) dynamicFormComponent: DynamicFormComponent;

    mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    @ViewChild('telephone') private telephone: ElementRef;
    @ViewChild('fax') private fax: ElementRef;

    constructor(
        private languageMasterService: LanguageMasterService,
        private messageService: MessageMasterDtlService,
        private systemCodesService: SystemCodesService,
        private reasonCodeMasterSerivce: ReasonCodeMasterService,
        private toastService: ToastService,
        private dddwHdrService: DddwHdrService,
        private dddwDtlService: DddwDtlService,
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private secColMasterService: SecColMasterService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private secUserService: SecUserService2,
        private secUserClmLmtDetailService: SecUserClmLmtDetailService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private auditService: AuditService,
        private router: Router,
        private userUsersService: UserUsersService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createDataGrid();
    }

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

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.getLanguageId();
        this.getUserTypes();
        this.getClaimTypes();
        this.getHoldReleases();
        this.getReasonCodes();
        this.getDeterminants();
        this.languageCode = 'AMERI';
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.usersForm);
        this.getSecColMasters();
        this.checkFieldLevelSecurityIdValidation();
        if (this.userId) {
            this.findByUserId(this.userId);
        }


        this.usersForm.get('termRsn').disable();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getUsersShortcutKeys(this));

        this.shortcutsInput.push(...getUsersShortcutKeys(this));
        this.cdr.detectChanges();


    }

    showPopUp(message: string, title: string, button: string = "Ok") {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton(button, button, 'btn btn-primary')];
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


    setFormData(secUser: any) {
        this.usersForm.patchValue({
            'description': secUser.description,
            'lastName': secUser.lname,
            'firstName': secUser.fname,
            'mi': secUser.mi,
            'ext': secUser.ext,
            'fax': secUser.fax,
            'location': secUser.usrLocation,
            'telephone': secUser.tel,
            'userDefined2': secUser.userDefined2,
            'userType': secUser.userType,
            'language': secUser.languageId,
            'rowLevelSecurity': secUser.usrSecurityLevel,
            'noteTypeSecurity': secUser.noteSecurityLevel,
            'team': secUser.userDefined1,
            'department': secUser.curUsrDept,
            'termRsn': secUser.termReason,
            //flags
            'template': this.templateFlgStatus,
            'superUser': this.superUserStatus,
            'queueSupervisor': this.queueSupervisorStatus,
            'usePasswordProfile': this.usePassProfileStatus,
        });
    }

    createSecUser() {
        this.formValidation.validateForm();
        if (this.usersForm.valid) {
            let secUser = new SecUser2();
            secUser.userId = Form.getValue(this.usersForm, 'userId').toUpperCase();
            secUser.templateFlg = Form.getValue(this.usersForm, 'template') === true ? 'Y' : 'N';
            secUser.dfltTemplate = Form.getValue(this.usersForm, 'templateId');
            secUser.description = Form.getValue(this.usersForm, 'description');
            secUser.lname = Form.getValue(this.usersForm, 'lastName');
            secUser.fname = Form.getValue(this.usersForm, 'firstName');
            secUser.mi = Form.getValue(this.usersForm, 'mi');
            secUser.tel = Form.getValue(this.usersForm, 'telephone');
            secUser.ext = Form.getValue(this.usersForm, 'ext');
            secUser.fax = Form.getValue(this.usersForm, 'fax');
            secUser.curUsrDept = Form.getValue(this.usersForm, 'department');
            secUser.usrLocation = Form.getValue(this.usersForm, 'location');
            secUser.userDefined1 = Form.getValue(this.usersForm, 'team');
            secUser.userDate1 = Form.getDatePickerValue(this.usersForm, 'userDate1');
            secUser.userDefined2 = Form.getValue(this.usersForm, 'userDefined2');
            secUser.userDate2 = Form.getDatePickerValue(this.usersForm, 'userDate2');
            secUser.effDate = Form.getDatePickerValue(this.usersForm, 'effDate');
            secUser.termDate = Form.getDatePickerValue(this.usersForm, 'termDate');
            secUser.termReason = Form.getValue(this.usersForm, 'termRsn');
            secUser.suPriv = this.superUserStatus ? 'Y' : 'N';
            secUser.userType = Form.getValue(this.usersForm, 'userType');
            secUser.sfldlId = Form.getValue(this.usersForm, 'fieldLevelSecurityId');
            secUser.qsupervisorPriv = this.queueSupervisorStatus ? 'Y' : 'N';
            secUser.languageId = this.languageId1;
            secUser.usePwdProfInd = Form.getValue(this.usersForm, 'usePasswordProfile') ? 'Y' : 'N';
            secUser.usrSecurityLevel = Form.getValue(this.usersForm, 'rowLevelSecurity');
            secUser.noteSecurityLevel = Form.getValue(this.usersForm, 'noteTypeSecurity');
            this.auditService.setAuditFields(
                secUser,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.ADD
            );
            secUser.tel = (secUser.tel && secUser.tel.length > 0) ? secUser.tel.replace("(",'').replace(")",'').replace(" ",'').replace("-",'').replace("_",'') : '';
            secUser.fax = (secUser.fax && secUser.fax.length > 0) ? secUser.tel.replace("(",'').replace(")",'').replace(" ",'').replace("-",'').replace("_",'') : '';
            this.secUserService.createSecUser2(secUser).subscribe(response => {
                this.toastService.showToast("Record successfully created.", NgbToastType.Success);
                this.editSecUser = true;
                this.detectChangesStatus = false;
                this.usersForm.get('userId').disable();
                if (this.screenCloseRequested === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormModifiedStatus = false;
                this.getSecUser(secUser.userId);
            }, error => {
                this.toastService.showToast((error.message ? error.message : 'An Error occurred while creating the record. Please check your entry.'), NgbToastType.Danger);
            });

        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }


    updateSecUser(userId: string) {

        this.formValidation.validateForm();
        if (this.usersForm.valid) {
            let secUser = new SecUser2;

            secUser.description = Form.getValue(this.usersForm, 'description');
            secUser.dfltTemplate = Form.getValue(this.usersForm, 'templateId');
            secUser.userId = Form.getValue(this.usersForm, 'userId').toUpperCase();
            secUser.ext = Form.getValue(this.usersForm, 'ext');
            secUser.fax = Form.getValue(this.usersForm, 'fax');
            secUser.usrLocation = Form.getValue(this.usersForm, 'location');
            secUser.tel = Form.getValue(this.usersForm, 'telephone');
            secUser.userDate1 = Form.getDatePickerValue(this.usersForm, 'userDate1');
            secUser.userDefined2 = Form.getValue(this.usersForm, 'userDefined2');
            secUser.userDate2 = Form.getDatePickerValue(this.usersForm, 'userDate2');
            secUser.effDate = Form.getDatePickerValue(this.usersForm, 'effDate');
            secUser.termDate = Form.getDatePickerValue(this.usersForm, 'termDate');
            secUser.sfldlId = Form.getValue(this.usersForm, 'fieldLevelSecurityId');
            secUser.languageId = this.languageId1;
            secUser.usrSecurityLevel = Form.getValue(this.usersForm, 'rowLevelSecurity');
            secUser.userType = Form.getValue(this.usersForm, 'userType');
            secUser.noteSecurityLevel = Form.getValue(this.usersForm, 'noteTypeSecurity');
            secUser.curUsrDept = Form.getValue(this.usersForm, 'department');
            secUser.userDefined1 = Form.getValue(this.usersForm, 'team');
            secUser.lname = Form.getValue(this.usersForm, 'lastName');
            secUser.fname = Form.getValue(this.usersForm, 'firstName');
            secUser.mi = Form.getValue(this.usersForm, 'mi');
            secUser.termReason = Form.getValue(this.usersForm, 'termRsn');


            if (this.templateFlgStatus) {
                secUser.templateFlg = 'Y';
            } else {
                secUser.templateFlg = 'N';
            }
            if (this.superUserStatus) {
                secUser.suPriv = 'Y';
            } else {
                secUser.suPriv = 'N';
            }
            if (this.queueSupervisorStatus) {
                secUser.qsupervisorPriv = 'Y';
            } else {
                secUser.qsupervisorPriv = 'N';
            }
            if (this.usePassProfileStatus) {
                secUser.usePwdProfInd = 'Y';
            } else {
                secUser.usePwdProfInd = 'N';
            }
            this.auditService.setInsertFields(
                secUser,
                this.secUser,
                OPERATIONS.UPDATE
            )

            this.auditService.setAuditFields(
                secUser,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.UPDATE
            );

            this.secUserService.updateSecUser2(secUser, userId).subscribe(response => {
                this.toastService.showToast("Record successfully updated.", NgbToastType.Success);
                this.editSecUser = true;
                this.detectChangesStatus = false;
                this.getSecUser(secUser.userId);
                if (this.screenCloseRequested === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormModifiedStatus = false;

            }, error => {
                this.toastService.showToast((error.message ? error.message : 'An Error occurred while updating the record. Please check your entry.'), NgbToastType.Danger);
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }


    }

    saveSecUser() {
        if (this.editSecUser) {
            this.updateSecUser(this.secUser.userId)
        } else {
            this.createSecUser();
        }
        this.detectChangesStatus = false;
    }

    deleteSecUser(userId: string) {
        if (userId) {
            this.secUserService.deleteSecUser(userId).subscribe(response => {
                this.toastService.showToast("Record successfully deleted.", NgbToastType.Success);
                this.resetFormAndGrid();
            }, error => {
                this.toastService.showToast("An Error occurred while deleting record.", NgbToastType.Danger);
            });
        } else {
            this.emptyUserPopup();
        }

    }

    getSecUser(userId: string) {
        this.secUserService.getSecUser2(userId).subscribe(secUser => {
            this.secUser = secUser;
            this.handleIncomingCheckboxes(secUser);
            this.handleAffiliations(secUser);
            if (this.secUser.lname && this.secUser.fname) {
                this.usersForm.patchValue({
                    dynamicText: this.secUser.fname + ' ' + this.secUser.lname,
                });
            }
            else if (this.secUser.lname) {
                this.usersForm.patchValue({
                    dynamicText: this.secUser.lname,
                });
            }
            else if (this.secUser.fname) {
                this.usersForm.patchValue({
                    dynamicText: this.secUser.fname,
                });
            }

            this.usersForm.patchValue({
                'description': this.secUser.description,
                'templateId': this.secUser.dfltTemplate,
                'userId': this.secUser.userId,
                'lastName': this.secUser.lname,
                'firstName': this.secUser.fname,
                'mi': this.secUser.mi,
                'ext': this.secUser.ext,
                'fax': this.secUser.fax,
                'location': this.secUser.usrLocation,
                'telephone': this.secUser.tel,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.secUser.userDate1),
                'userDefined2': this.secUser.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.secUser.userDate2),
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.secUser.effDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.secUser.termDate),
                'userType': this.secUser.userType,
                'language': this.secUser.languageId,
                'fieldLevelSecurityId': this.secUser.sfldlId,
                'rowLevelSecurity': this.secUser.usrSecurityLevel,
                'noteTypeSecurity': this.secUser.noteSecurityLevel,
                'team': this.secUser.userDefined1,
                'department': this.secUser.curUsrDept,
                'termRsn': this.secUser.termReason,
                'accountStatus': this.secUser.accountStatus === 'OPEN' ? 'Unlocked' : 'Locked',
                'template': this.templateFlgStatus,
                'superUser': this.superUserStatus,
                'queueSupervisor': this.queueSupervisorStatus,
                'usePasswordProfile': this.usePassProfileStatus,
                "groupAffiliation": 'ALL',
                "providerAffiliation": 'ALL',
                "ipaAffiliation": 'ALL',
                "panelAffiliation": 'ALL',
                "vendorAffiliation": 'ALL',
                "lobAffiliation": 'ALL',
            }, { emitEvent: false });
            this.usersForm.get('fieldLevelSecurityId').disable();
            this.usersForm.get('rowLevelSecurity').disable();
            this.isFormDataModified();
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getSecUsers() {
        this.secUserService.getSecUsers().subscribe(secUsers => {
            this.secUsers = secUsers;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    getLanguageId() {
        this.dddwDtlService
            .findByColumnNameAndDwname("language_id", "dw_suser_de")
            .subscribe(
                (codes) => {
                    this.languageId = codes;
                },
                (error) => {
                    this.toastService.showToast(
                        'An Error occurred while retrieving records.',
                        NgbToastType.Danger
                    );
                }
            );
    }

    getUserTypes() {
        this.systemCodesService
            .getSystemCodesByLangAndtype("SECUSERTYPE", "0")
            .subscribe((data) => {
                this.userTypes = data;
            });
    }

    getClaimTypes() {
        this.systemCodesService
            .getSystemCodesByLangAndtype("CLAIMTYPE", "0")
            .subscribe((data) => {
                this.claimTypes = data;
                this.getClaimTypeKeyValues();
            });
    }


    getHoldReleases() {
        this.systemCodesService
            .getSystemCodesByLangAndtype("SECHOLDREL", "0")
            .subscribe((data) => {
                this.holdReleases = data;
                this.getholdReasonCodeKeyValue();
            });
    }

    getReasonCodes() {
        this.reasonCodeMasterSerivce
            .getReasonCodeMasterByReasonType("SC")
            .subscribe((data) => {
                this.reasonCodes = data;
                this.getReasonCodeKeyValue();
            });
    }

    getDeterminants() {
        this.systemCodesService
            .getSystemCodesByLangAndtype("SECDETERMINANT", "0")
            .subscribe((data) => {
                this.determinants = data;
                this.getDeterminantKeyValue();
            });
    }

    createSecUserClmLmtDetail() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.usersForm.valid) {
                let secUserClmLmtDetail = new SecUserClmLmtDetail();
                secUserClmLmtDetail.userId = Form.getValue(this.usersForm, 'userId');
                this.secUserClmLmtDetailService.createSecUserClmLmtDetail(secUserClmLmtDetail).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSecUserClmLmtDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
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


    updateSecUserClmLmtDetail(holdRelClass: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.usersForm.valid) {
                let secUserClmLmtDetail = new SecUserClmLmtDetail();
                secUserClmLmtDetail.userId = Form.getValue(this.usersForm, 'userId');
                this.secUserClmLmtDetailService.updateSecUserClmLmtDetail(secUserClmLmtDetail, holdRelClass).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editSecUserClmLmtDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveSecUserClmLmtDetail() {
        if (this.editSecUserClmLmtDetail) {
            this.updateSecUserClmLmtDetail(this.secUserClmLmtDetail.holdRelClass)
        } else {
            this.createSecUserClmLmtDetail();
        }
    }

    deleteSecUserClmLmtDetail(holdRelClass: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.secUserClmLmtDetailService.deleteSecUserClmLmtDetail(holdRelClass).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getSecUserClmLmtDetail(holdRelClass: string) {
        this.secUserClmLmtDetailService.getSecUserClmLmtDetail(holdRelClass).subscribe(secUserClmLmtDetail => {
            this.secUserClmLmtDetail = secUserClmLmtDetail;
            this.usersForm.patchValue({
                'userId': this.secUserClmLmtDetail.userId,
            });


        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getSecUserClmLmtDetails() {
        this.secUserClmLmtDetailService.getSecUserClmLmtDetails().subscribe(secUserClmLmtDetails => {
            this.secUserClmLmtDetails = secUserClmLmtDetails;
            this.dataGridGridOptions.api.setRowData(this.secUserClmLmtDetails);

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
        {
            context: {
                componentParent: this
            },

            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Claim Type",
                field: "claimType",
                headerClass: 'clr-blue',
                flex: 1,
                width: 200,
                cellRendererFramework: ClaimType,
                cellRendererParams: {
                    parentComponent: this
                },

            },
            {
                headerName: "Hold/Release",
                field: "holdRelClass",
                headerClass: 'clr-blue',
                width: 200
            },
            {
                headerName: "Cliam Limit",
                field: "claimLimit",
                headerClass: 'clr-blue',
                width: 200
            },
            {
                headerName: "Determinant",
                field: "determinant",
                headerClass: 'clr-blue',
                width: 200
            },
            {
                headerName: "Reason Code",
                field: "reasonCode",
                headerClass: 'clr-blue',
                width: 200
            }
        ];
    }

    private isDataModified = false;

    public onChangeClaimType(rowIndex: number, newValue: string, oldValue: string) {
        this.isDataModified = newValue != oldValue;
        let isDuplicate = false;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            if (node.rowIndex != rowIndex && node.data.claimType == newValue) {
                isDuplicate = true;
                return;
            }
        });

    }

    public onClickDiv(selectedDiv: string) {
        this.agGridTableClickable = true;
        this.selectedDiv = selectedDiv;
        this.gridSelectionStatus = false;
    }

    selectDiv() {
        this.gridSelectionStatus = false;
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.usersForm = this.formBuilder.group({
            userId: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(8)] }],
            dynamicText: ['', { updateOn: 'blur', validators: [] }],
            template: ['', { updateOn: 'blur', validators: [Validators.maxLength(8)] }],
            templateId: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            lastName: ['', { updateOn: 'blur', validators: [Validators.maxLength(22)] }],
            firstName: ['', { updateOn: 'blur', validators: [Validators.maxLength(22)] }],
            mi: ['', { updateOn: 'blur', validators: [Validators.maxLength(1)] }],
            telephone: ['', { updateOn: 'blur', validators: [] }],
            ext: ['', { updateOn: 'blur', validators: [Validators.maxLength(4)] }],
            fax: ['', {updateOn: 'blur',validators: []}],
            department: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            location: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            team: ['', { updateOn: 'blur', validators: [] }],
            userDate1: ['', { updateOn: 'blur', validators: [] }],
            userDefined2: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            userDate2: ['', { updateOn: 'blur', validators: [] }],
            effDate: ['', { updateOn: 'blur', validators: [] }],
            termDate: ['', { updateOn: 'blur', validators: [] }],
            termRsn: ['', { updateOn: 'blur', validators: [Validators.maxLength(5)] }],
            superUser: ['', { updateOn: 'blur', validators: [] }],
            userType: ['', { updateOn: 'blur', validators: [Validators.required] }],
            fieldLevelSecurityId: ['', { updateOn: 'blur', validators: [] }],
            queueSupervisor: ['', { updateOn: 'blur', validators: [] }],
            language: ['', { updateOn: 'blur', validators: [Validators.required] }],
            groupAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            providerAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            ipaAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            usePasswordProfile: ['', { updateOn: 'blur', validators: [] }],
            panelAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            vendorAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            lobAffiliation: ['ALL', { updateOn: 'blur', validators: [] }],
            accountStatus: ['', { updateOn: 'blur', validators: [] }],
            rowLevelSecurity: ['', { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)] }],
            noteTypeSecurity: ['', { updateOn: 'blur', validators: [Validators.required] }],
        }, { updateOn: 'submit' });
    }


    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S' },
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' }]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                    { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                    { name: 'Paste', shortcutKey: 'Ctrl+V' },
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: 'Users' },
                    { name: 'Window Access' },
                    { name: 'Function Access' }
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Delete Super User' },
                    { name: 'Delete User', },
                    { name: 'Group Affiliation' },
                    { name: 'Panel Affiliation' },
                    { name: 'Provider Affiliation' },
                    { name: 'Vendor Affiliation' },
                    { name: 'IPA  Affiliation' },
                    { name: 'LOB Affiliation' },
                    { name: 'Add Database User' },
                    { name: 'Update User Password' },
                    { name: 'Update Role Password' },
                    { name: 'Reset Database Password' },
                    { name: 'Unlock User Account' },

                ]
            }, {
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
                    { name: '2 Users' },
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
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }


    existBySecId(levelSecId: any, inputValue: any) {

        if (!(this.securityFields.indexOf(levelSecId) > -1)) {
            this.showPopUp('11084: ' + 'Field Level Security ID ' + levelSecId + ' does not exist. Use F5 to lookup available data.', 'Users', "OK");
            this.usersForm.controls[inputValue].reset();
            let inputText: string = '#' + inputValue;
            const element = this.renderer.selectRootElement(inputText);
            element.focus();
        }
    }

    checkFieldLevelSecurityIdValidation() {
        this.usersForm.controls['fieldLevelSecurityId'].valueChanges.subscribe((levelSecId: string) => {
            if (levelSecId) {
                this.existBySecId(levelSecId, 'fieldLevelSecurityId')
            }
        });
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.detectChangesStatus) {
                        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopupAlert(message[0].messageText, 'Users')
                        });
                    } else if (this.dynamicModificationStatus) {
                        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopupAlert(message[0].messageText, 'Users')
                        });
                    }
                    else {
                        this.createNewFunction();
                    }
                    break;
                }
                case 'Open': {
                    this.createNewFunction();
                    break;
                }
                case 'Save': {
                    this.saveSecUser();

                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case "Exit": {
                    this.exitScreen();
                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }
                default: {

                    break;
                }
            }
        }
        else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        }
        else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
        }
        else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case 'Show Timestamp':
                    if (this.usersForm.get('userId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                case "Audit Display": {
                    this.toastService.showToast('Action is not implemented', NgbToastType.Danger);
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen();
        }
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTemplateLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            let id = event.target.value;
            if (id === '') {
                let element = this.renderer.selectRootElement('#description').focus();
            } else {
                this.templateIdConfirmTab(id);
            }
        }
    }

    onLookupFieldChange2(event: any) {
        this.detectChangesStatus = true;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel2('fieldLevelSecurityId');

        }

    }

    openLookupFieldSearchModel(field: any) {

        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchCustomerModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.usersForm.patchValue({
                userId: res.userId
            });
            this.findByUserId(res.userId);
        });
    }

    getSecColMasters() {
        this.secColMasterService.getSecColMasters().subscribe(secColMasters => {
            this.secColMasters = secColMasters;
            for (let i = 0; i < this.secColMasters.length; i++) {
                this.securityFields[i] = this.secColMasters[i].sfldlId;
            }

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving security level IDs.");
        });
    }


    openLookupFieldSearchModel2(field: any) {
        let secColMaster = new SecColMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchSecModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {

                secColMaster = res;
                this.usersForm.patchValue({
                    fieldLevelSecurityId: res.sfldlId
                });

            } else {

            }
        })
    }

    public findByUserId(userId: string) {
        this.currentUserId = userId.toUpperCase();
        this.secUserService.getSecUser2(this.currentUserId).subscribe((secUser: SecUser2) => {
            if (secUser) {
                this.userUsersService.getUserUsers(this.currentUserId).subscribe(resp => {
                    this.accountStatus = resp ? resp.accountStatus : null;
                });
                this.showData = true;
                this.usersForm.get('userId').disable({ emitEvent: false });
                this.showData = true;
                this.getSecUser(this.currentUserId);
                this.editSecUser = true;
                this.getGridData(this.currentUserId);
                this.secUser = secUser;
                this.isFormModifiedStatus = false;
                this.userId = userId;
            } else {
                this.messageService.findByMessageId(11089).subscribe(res => {
                    this.messageService.findByMessageId(11089).subscribe(res => {
                        let popMsg = new PopUpMessage('groupNotExistPopup',
                            'Users Security',
                            '11089: ' + res[0].messageText,
                            'icon');
                        popMsg.buttons = [
                            new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                            new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                        ref.componentInstance.popupMessage = popMsg;
                        ref.componentInstance.showIcon = true;
                        this.editSecUser = false;
                        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                            this.popUpButtonClicked(event);
                        });
                    });
                })
            }
        })
    }

    getGridData(userId: string) {
        this.secUserClmLmtDetailService.findByUserId(userId).subscribe((secUserClmLmtDetails: SecUserClmLmtDetail[]) => {
            this.secUserClmLmtDetailsData = [];
            this.secUserClmLmtDetailsData = secUserClmLmtDetails;
            if (secUserClmLmtDetails && secUserClmLmtDetails.length > 0) {
                secUserClmLmtDetails.forEach((secUserClmLmtDetail: any) => {
                    let mockConfig = JSON.parse(JSON.stringify(this.userFormConfig));
                    this.userFormConfig.forEach((field, index) => {
                        if (field.name === UserFiltersFieldNames.CLAIM_TYPE) {
                            mockConfig[index].value = secUserClmLmtDetail.secUserClmLmtDetailPrimaryKey.claimType;
                        } else if (field.name === UserFiltersFieldNames.HOLD_RELEASE) {
                            mockConfig[index].value = secUserClmLmtDetail.secUserClmLmtDetailPrimaryKey.holdRelClass;
                        } else if (field.name === UserFiltersFieldNames.CLAIM_LIMIT) {
                            mockConfig[index].value = secUserClmLmtDetail.claimLimit;
                        } else if (field.name === UserFiltersFieldNames.DETERMINANT) {
                            mockConfig[index].value = secUserClmLmtDetail.determinant;
                        } else if (field.name === UserFiltersFieldNames.REASON_CODE) {
                            mockConfig[index].value = secUserClmLmtDetail.reasonCode;
                        }
                    });
                    let formState: FormRow = new FormRow();
                    formState.formFields = mockConfig;
                    this.userPrevState.push(formState);
                });
                this.userPrevState = JSON.parse(JSON.stringify(this.userPrevState));
            }
        }, (error: Error) => {
            console.log(error);
        });
    }


    private popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            this.createNewSecUser();
            this.showData = true;
        }
        if (button.name == 'no') {
            this.usersForm.get('userId').enable();
        }
    }

    public onLookupFieldUserId(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel('userId');
        } else if (event.key === 'Tab') {
            event.preventDefault();
            let id = event.target.value;
            if (id === '') {
                this.messageService.findByMessageId(11089).subscribe((message: MessageMasterDtl[]) => {
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Users', "11089: " + message[0].messageText.replace('@1', this.currentUserId), 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.emptyIdPatch()
                        } else if (resp.name === 'No') {

                        }
                    });
                });
            } else {
                this.findByUserId(id);
            }
        }
    }

    public onChangeFieldTemplate(event: any) {
        this.detectChangesStatus = true;
        if (event.target.checked) {
            this.templateFlgStatus = true;
            this.usersForm.get('templateId').disable();
            this.usersForm.patchValue({ templateId: null })
        } else {
            this.templateFlgStatus = false;
            if (this.superUserStatus == false)
                this.usersForm.get('templateId').enable();
        }
    }

    public onChangeFieldSuperUser(event: any) {
        this.detectChangesStatus = true;
        if (event.target.checked) {
            this.superUserStatus = true;
            this.usersForm.get('templateId').disable();
            this.usersForm.get('fieldLevelSecurityId').disable();
            this.usersForm.get('rowLevelSecurity').disable();
            this.usersForm.patchValue({ rowLevelSecurity: 0 })
            this.usersForm.patchValue({ templateId: null })
        }

        else {
            this.superUserStatus = false;
            if (this.templateFlgStatus == false)
                this.usersForm.get('templateId').enable();
            this.usersForm.get('fieldLevelSecurityId').enable();
            this.usersForm.get('rowLevelSecurity').enable();
        }
    }

    public onChangeFieldQueueSupervisor(event: any) {
        this.detectChangesStatus = true;
        this.queueSupervisorStatus = !!event.target.checked;
    }

    public onChangeFieldUsePasswordProfile(event: any) {
        this.detectChangesStatus = true;
        this.usePassProfileStatus = !!event.target.checked;
    }

    private handleIncomingCheckboxes(secUser: SecUser2) {
        if (secUser.templateFlg == "Y") {
            this.templateFlgStatus = true;

            this.usersForm.get('templateId').disable();
        }
        else {
            this.templateFlgStatus = false;
            if (secUser.suPriv == "N")
                this.usersForm.get('templateId').enable();
        }

        if (secUser.suPriv == "Y") {
            this.superUserStatus = true;
            this.usersForm.get('templateId').disable();
            this.usersForm.get('fieldLevelSecurityId').disable();
            this.usersForm.get('rowLevelSecurity').disable();

        }
        else {
            this.superUserStatus = false
            if (secUser.templateFlg == "N")
                this.usersForm.get('templateId').enable();
            this.usersForm.get('fieldLevelSecurityId').enable();
            this.usersForm.get('rowLevelSecurity').enable();
        }

        this.queueSupervisorStatus = secUser.qsupervisorPriv == "Y";

        this.usePassProfileStatus = secUser.usePwdProfInd == "Y";

    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Window Access": {
                const ref = this.modalService.open(WindowsAccessComponent, { size: <any>'xl', });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.currentUserId;
                this.activeModal.close();
                break;
            }
            case "Function Access": {
                const ref = this.modalService.open(FunctionAccessComponent, { size: <any>'xl', });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.currentUserId;
                this.activeModal.close();
                break;
            }
            case "Users": {
                const ref = this.modalService.open(UsersComponent, { size: <any>'xl', });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.userId = this.currentUserId;
                this.activeModal.close();
                break;
            }
        }

    }


    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Delete User': {
                this.deleteSecUser(this.usersForm.get('userId').value);
                break;

            }
            case 'Delete Super User': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Group Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Panel Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Provider Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Vendor Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'IPA Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'LOB Affiliation': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Update Role Password': {
                if (this.usersForm.get('userId').value) {
                    this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
            case 'Reset Database Password': {
                let uId = this.usersForm.get("userId").value;
                if (uId && uId !== "") {
                    let ref = this.modalService.open(
                        ResetDatabasePasswordComponent
                    );
                    ref.componentInstance.userId = this.usersForm.get(
                        "userId"
                    ).value;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.use_pwd_prof_ind = this.secUser.usePwdProfInd;
                } else {
                    this.emptyUserPopup()
                }
                break;

            }
            case 'Unlock User Account': {
                this.currentUserId = Form.getValue(this.usersForm, 'userId');
                if (this.showData === false) {
                    this.messageService.findByMessageId(11019).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp('11019: ' + message[0].messageText.replace('@1', this.currentUserId), 'Users');
                    });
                    return;
                }
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_UNLCK_USR_ACCT);
                if (status) {
                    if (this.secUser.accountStatus && this.secUser.accountStatus.toUpperCase() === 'LOCKED') {
                        this.messageService.findByMessageId(11093).subscribe((message: MessageMasterDtl[]) => {
                            let popUpMessage = new PopUpMessage('popUpMessageName', 'Users', '11093: ' + message[0].messageText.replace('@1', this.currentUserId), 'icon');
                            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                            let ref = this.modalService.open(PopUpMessageComponent);
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.popupMessage = popUpMessage;
                            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                                if (resp.name === 'Yes') {
                                    this.userUsersService.unlockSecUser(this.currentUserId).subscribe((user: any) => {
                                        this.messageService.findByMessageId(11094).subscribe((successMessage: MessageMasterDtl[]) => {
                                            this.showPopUp('11094: ' + successMessage[0].messageText.replace('@1', this.currentUserId), 'Users');
                                        });
                                    });
                                } else if (resp.name === 'No') {
                                    this.activeModal.close();
                                }
                            });
                        });
                    } else {
                        this.messageService.findByMessageId(11095).subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp('11095: ' + message[0].messageText.replace('@1', this.currentUserId), 'Users');
                        });
                    }

                } else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp('11073: ' + message[0].messageText.replace('@1', this.currentUserId), 'Users');
                    });
                }
                break;

            }

            case 'Add Database User': {
                let uId = this.usersForm.get('userId').value;
                if (uId && uId !== '') {
                    let ref = this.modalService.open(AddDatabaseUserComponent);
                    ref.componentInstance.userId = this.usersForm.get('userId').value;
                    ref.componentInstance.usePassProfileStatus = this.usePassProfileStatus;
                    ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {

                    });
                } else {
                    this.emptyUserPopup()
                }
                break;
            }

            case 'Update User Password': {
                let uId = this.usersForm.get('userId').value;
                console.log(uId);
                if (uId && uId !== '') {
                    let ref = this.modalService.open(UpdateUserPasswordComponent);
                    ref.componentInstance.userId = this.usersForm.get('userId').value;
                    ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {

                    });
                } else {
                    this.emptyUserPopup()
                }
                break;
            }
        }

    }

    public resetFormAndGrid() {
        this.showData = false;
        this.resetCheckboxes();
        this.usersForm.get('userId').enable();
        this.usersForm.reset();
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    public onChangeFieldTermDate(event: IMyDateModel) {
        if (this.usersForm.value.effDate) {
            let Tdate = this.getDate(event.singleDate);
            let Edate = this.getDate(this.usersForm.value.effDate.singleDate);
            if (Tdate < Edate) {
                this.messageService.findByMessageId(8131).subscribe((message) => {
                    this.showPopUp(
                        "8131 : " + message[0].messageText,
                        "Users"
                    );
                    this.usersForm.patchValue({
                        termDate: null
                    });
                })
            } else {
                this.usersForm.get('termRsn').enable();
            }
        } else {
            this.usersForm.get('termRsn').enable();
        }
    }

    public onChangeFieldEffDate(event: IMyDateModel) {
        if (this.usersForm.value.termDate) {
            let Edate = this.getDate(event.singleDate);
            let Tdate = this.getDate(this.usersForm.value.termDate.singleDate);
            if (Tdate < Edate) {
                this.messageService.findByMessageId(8131).subscribe((message) => {
                    this.showPopUp(
                        "8131 : " + message[0].messageText,
                        "Users"
                    );
                    this.usersForm.patchValue({
                        effDate: null
                    });
                })
            }
        }

    }

    resetCheckboxes() {
        this.templateFlgStatus = false;
        this.superUserStatus = false;
        this.queueSupervisorStatus = false;
        this.usePassProfileStatus = true;
    }

    handleAffiliations(user: SecUser2) {
        if (user.grpAffil === null)
            this.usersForm.patchValue({ groupAffiliation: "ALL" })
        if (user.ipaAffil === null)
            this.usersForm.patchValue({ ipaAffiliation: "ALL" })
        if (user.provAffil === null)
            this.usersForm.patchValue({ providerAffiliation: "ALL" })
    }

    newRecordDefaults() {
        let secUser = new SecUser2;
        secUser.userType = 'O';
        secUser.languageId = 0;
        secUser.noteSecurityLevel = '0';
        secUser.usrSecurityLevel = '0';
        this.setFormData(secUser)
    }


    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    isFormDataModified = () => {
        this.usersForm.valueChanges.subscribe(() => {
            this.isFormModifiedStatus = true;
        })
    };

    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.isFormModifiedStatus === true && this.detectChangesStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.showPopupAlert(message[0].messageText, 'Users')
            });
        } else {
            this.activeModal.close();
        }
    };

    showPopupAlert = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.SUCCESS);
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                if (this.detectChangesStatus) {
                    this.saveSecUser();
                    if (this.dynamicModificationStatus) {
                        setTimeout(() => {
                            this.dynamicFormComponent.onSubmit();
                        }, 500);
                    }
                } else {
                    if (this.dynamicModificationStatus) {
                        setTimeout(() => {
                            this.dynamicFormComponent.onSubmit();
                        });
                    }
                }

            } else if (resp.name === 'No') {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } // 3rd case: In case of cancel do nothing
        });
    };

    emptyIdPatch = () => {
        this.showData = true;
        this.usersForm.get('userId').disable();
        this.usersForm.get('fieldLevelSecurityId').enable();
        this.usersForm.get('rowLevelSecurity').enable();
        this.usersForm.patchValue({
            'userId': '',
            'dynamicText': '',
            'description': '',
            'templateId': '',
            'lastName': '',
            'firstName': '',
            'mi': '',
            'ext': '',
            'fax': '',
            'location': '',
            'telephone': '',
            'userDate1': '',
            'userDefined2': '',
            'userDate2': '',
            'effDate': '',
            'termDate': '',
            'userType': 'O',
            'language': 0,
            'fieldLevelSecurityId': '',
            'rowLevelSecurity': '0',
            'noteTypeSecurity': '0',
            'team': '',
            'department': '',
            'termRsn': '',
            'accountStatus': 'Unlocked',
            'template': '',
            'superUser': '',
            'queueSupervisor': '',
            'usePasswordProfile': 'Y',
        }, { emitEvent: false });
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Users";

        ref.componentInstance.insertDateTime = this.secUser.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.secUser.insertProcess;
        ref.componentInstance.insertUser = this.secUser.insertUser;
        ref.componentInstance.updateUser = this.secUser.updateUser;
        ref.componentInstance.updateDateTime = this.secUser.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.secUser.updateProcess;
    };

    createNewFunction = () => {
        if (this.gridSelectionStatus) {
            if (this.agGridTableClickable === true && this.usersForm.get('userId').value === '') {
                this.messageService.findByMessageId(11032).subscribe(res => {
                    let message = '11032: ' + res[0].messageText;
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage(
                        'poUpMessageName',
                        'Users',
                        message,
                        'icon');
                    popUpMessage.buttons = [
                        new PopUpMessageButton('yes', 'Ok', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                        if (event.name == 'yes') {
                            const element = this.renderer.selectRootElement('#userId');
                            setTimeout(() => {
                                element.focus();
                            }, 1000)
                        }
                    });
                })
            } else {
                this.resetFormAndGrid();
            }
        } else {
            if (!this.detectChangesStatus) {
                let templateId = Form.getValue(this.usersForm, 'templateId');
                if (templateId === "UT_SUPER") {
                    this.messageService.findByMessageId(11033).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('11033: ' + message[0].messageText, 'Users')
                    });
                } else {
                    if (this.superUserStatus) {
                        this.messageService.findByMessageId(11033).subscribe((message: MessageMasterDtl[]) => {
                            this.formPopupAlert('11033: ' + message[0].messageText, 'Users')
                        });
                    }
                }
            } else {
                this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopupAlert1(message[0].messageText, 'Users');
                });
            }
        }
    };
    
    createNewSecUser = () => {
        this.usersForm.get('userId').disable();
        this.usersForm.get('fieldLevelSecurityId').enable();
        this.usersForm.get('rowLevelSecurity').enable();
        this.usersForm.patchValue({
            userType: "O",
            language: 0,
            usePasswordProfile: true,
            accountStatus: 'Unlocked',
            rowLevelSecurity: 0,
            noteTypeSecurity: 0,
            groupAffiliation: 'ALL',
            providerAffiliation: 'ALL',
            ipaAffiliation: 'ALL',
            panelAffiliation: 'ALL',
            vendorAffiliation: 'ALL',
            lobAffiliation: 'ALL',
        });
    };

    openTemplateLookupFieldSearchModel = () => {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchCustomerModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.usersForm.patchValue({
                templateId: res.userId
            });
            this.templateIdConfirm(res.userId)
        });
    };

    templateIdConfirm = (userId: any) => {
        if (userId.includes('UT_')) {

        } else {
            this.messageService.findByMessageId(11037).subscribe(res => {
                this.showPopUp('11037: ' + res[0].messageText, 'Users')
            })
        }
    };

    templateIdConfirmTab = (userId: any) => {
        this.secUserService.getSecUser2(userId).subscribe((secUser: SecUser2) => {
            if (secUser && secUser.userId.includes('UT_')) {
                let element = this.renderer.selectRootElement('#description').focus();
            } else {
                this.messageService.findByMessageId(11037).subscribe(res => {
                    this.showPopUp('11037: ' + res[0].messageText, 'Users')
                })
            }
        })
    };

    onLookupFieldChangeBlur = (event: any) => {
        if (event.target.value !== '') {
            let element = this.renderer.selectRootElement('#templateId').focus();
            this.templateIdConfirmTab(event.target.value);

        }
        this.detectChangesStatus = true;
    };
    
    showErrorPop(fc: FormControl, id: string) {
        if(fc.value.length > 0) {
            let text: string = fc.value.replace("(",'').replace(")",'').replace(" ",'').replace("-",'').replace("_",'');
            if (fc.invalid || text.length !=  10) {
                this.messageService.findByMessageId(30143).subscribe(res => {
                    this.showPopUp('30143: ' + res[0].messageText, 'Users');
                    if(id=="fax") {
                        fc.setValue("");
                        this.fax.nativeElement.focus();
                    } else if(id=="telephone") { 
                        fc.setValue("");
                        this.telephone.nativeElement.focus();
                    }
                });
            }
        }
    }

    changeStatus(status: boolean) {
        this.gridSelectionStatus = status;
    }


    formPopupAlert = (message: string, title: string) => {
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

    showPopupAlert1 = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.SUCCESS);
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                this.saveSecUser();
            } else if (resp.name === 'No') {
                let templateId = Form.getValue(this.usersForm, 'templateId');
                if (templateId === "UT_SUPER") {
                    this.messageService.findByMessageId(11033).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('11033: ' + message[0].messageText, 'Users')
                    });
                } else {
                    if (this.superUserStatus) {
                        this.messageService.findByMessageId(11033).subscribe((message: MessageMasterDtl[]) => {
                            this.formPopupAlert('11033: ' + message[0].messageText, 'Users')
                        });
                    }
                }
                ref.close();
            } // 3rd case: In case of cancel do nothing
        });
    };

    detectChanges() {
        this.detectChangesStatus = true;
    }

    saveDynamicForm(event: any) {
        let requestData: any[] = [];
        const updatedRecords: FormRow[] = (this.userPrevState && this.userPrevState.length > 0) ?
            this.userPrevState : this.userPrevState; //.filter(record => record.action);
        if (updatedRecords.length > 0) {
            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                let updatedRecord = event[index];
                const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                if (preStateRecord.action) {
                    let data = this.populateClaimTypeField(pair, preStateRecord.action);
                    let status = this.isClaimTypeExist(data.secUserClmLmtDetailPrimaryKeyModel, index);
                    if (!status) {
                        let status = this.isSecPrimaryKeyExist(data.secUserClmLmtDetailPrimaryKeyModel, index);
                        if (status) {
                            let existingSecUserClmLmtDetailPrimaryKeyObj = new SecUserClmLmtDetailPrimaryKeyModel();
                            existingSecUserClmLmtDetailPrimaryKeyObj.holdRelClass = this.secUserClmLmtDetailsData[index].secUserClmLmtDetailPrimaryKey.holdRelClass
                            existingSecUserClmLmtDetailPrimaryKeyObj.claimType = this.secUserClmLmtDetailsData[index].secUserClmLmtDetailPrimaryKey.claimType;;
                            existingSecUserClmLmtDetailPrimaryKeyObj.userId = this.secUserClmLmtDetailsData[index].secUserClmLmtDetailPrimaryKey.userId;
                            data.existingSecUserClmLmtDetailPrimaryKey = existingSecUserClmLmtDetailPrimaryKeyObj;
                            requestData.push(data);
                        } else {
                            requestData.push(data);
                        }

                    } else {
                        this.messageService.findByMessageId(11034).subscribe(res => {
                            this.showPopUp('11034: ' + res[0].messageText, 'Users')
                        });
                    }
                }
            });
        }

        const newRecords = event.slice(this.userPrevState.length);
        newRecords.forEach((record: any) => {
            const pair = Object.keys(record).map(k => ({ key: k, value: record[k] }));
            let data = this.populateClaimTypeField(pair, FORM_FIELD_ACTION_TYPES.ADD);
            let status = this.isClaimTypeExistAdd(data.secUserClmLmtDetailPrimaryKeyModel);
            if (!status) {
                requestData.push(data);
            } else {
                this.messageService.findByMessageId(11034).subscribe(res => {
                    this.showPopUp('11034: ' + res[0].messageText, 'Users')
                });
            }
        });

        if (requestData.length > 0) {
            this.secUserClmLmtDetailService.updateSecUserClmLmtDetails(requestData).subscribe(res => {
                this.toastService.showToast('Claim type updated Successfully', NgbToastType.Success)
                this.detectChangesStatus = false;
                this.dynamicModificationStatus = false;
                this.userPrevState = [];
                setTimeout(() => {
                    this.getGridData(this.currentUserId);
                }, 1000);
            }, error => {
                this.toastService.showToast(error, NgbToastType.Danger)
            });
        }

    }

    getSecUserByIndex(updatedValueIndex: number) {
        this.secUserClmLmtDetailsData.forEach((obj, index) => {
            if (obj.secUserClmLmtDetailPrimaryKey) {
                if (index === updatedValueIndex) {
                    let secUserClmLmtDetail = new SecUserClmLmtDetail();
                    secUserClmLmtDetail = obj;
                    return secUserClmLmtDetail;
                }
            }
        });
    }

    isSecPrimaryKeyExist(secUserClmLmtDetailPrimaryKeyModel: SecUserClmLmtDetailPrimaryKeyModel, updatedValueIndex: number) {
        let status: boolean = false;
        if (this.secUserClmLmtDetailsData.length > 0) { }
        this.secUserClmLmtDetailsData.forEach((obj, index) => {
            if (obj.secUserClmLmtDetailPrimaryKey) {
                if (index === updatedValueIndex) {
                    if ((obj.secUserClmLmtDetailPrimaryKey.claimType !== secUserClmLmtDetailPrimaryKeyModel.claimType)
                        || (obj.secUserClmLmtDetailPrimaryKey.holdRelClass !== secUserClmLmtDetailPrimaryKeyModel.holdRelClass)
                        || (obj.secUserClmLmtDetailPrimaryKey.userId !== secUserClmLmtDetailPrimaryKeyModel.userId)
                    ) {
                        status = true;
                        return status;
                    }
                }
            }
        });
        return status;
    }

    isClaimTypeExist(secUserClmLmtDetailPrimaryKeyModel: SecUserClmLmtDetailPrimaryKeyModel, updatedValueIndex: number) {
        let status: boolean = false;
        this.secUserClmLmtDetailsData.forEach((obj, index) => {
            if (obj.secUserClmLmtDetailPrimaryKey) {
                if (index !== updatedValueIndex) {
                    if ((obj.secUserClmLmtDetailPrimaryKey.claimType === secUserClmLmtDetailPrimaryKeyModel.claimType)
                        && (obj.secUserClmLmtDetailPrimaryKey.holdRelClass === secUserClmLmtDetailPrimaryKeyModel.holdRelClass)
                        && (obj.secUserClmLmtDetailPrimaryKey.userId === secUserClmLmtDetailPrimaryKeyModel.userId)
                    ) {
                        status = true;
                        return status;
                    }
                }
            }
        });
        return status;
    }

    isClaimTypeExistAdd(secUserClmLmtDetailPrimaryKeyModel: SecUserClmLmtDetailPrimaryKeyModel) {
        let status: boolean = false;
        if (this.secUserClmLmtDetailsData) {
            this.secUserClmLmtDetailsData.forEach((obj, index) => {
                if (obj.secUserClmLmtDetailPrimaryKey) {

                    if ((obj.secUserClmLmtDetailPrimaryKey.claimType === secUserClmLmtDetailPrimaryKeyModel.claimType)
                        && (obj.secUserClmLmtDetailPrimaryKey.holdRelClass === secUserClmLmtDetailPrimaryKeyModel.holdRelClass)
                        && (obj.secUserClmLmtDetailPrimaryKey.userId === secUserClmLmtDetailPrimaryKeyModel.userId)
                    ) {
                        status = true;
                        return status;
                    }
                }
            });
        }
        return status;
    }

    populateClaimTypeField(pair: any, action: any) {
        let secUserClmLmtDetail = new SecUserClmLmtDetail();
        let secUserClmLmtDetailPrimaryKeyModel = new SecUserClmLmtDetailPrimaryKeyModel();
        secUserClmLmtDetailPrimaryKeyModel.claimType = pair[0].value;
        secUserClmLmtDetailPrimaryKeyModel.holdRelClass = pair[1].value
        secUserClmLmtDetailPrimaryKeyModel.userId = this.userId;

        secUserClmLmtDetail.claimLimit = pair[2].value;
        secUserClmLmtDetail.determinant = pair[3].value;
        secUserClmLmtDetail.reasonCode = pair[4].value;
        secUserClmLmtDetail.action = action;
        secUserClmLmtDetail.insertUser = sessionStorage.getItem('user'),
            secUserClmLmtDetail.insertProcess = this.windowId;
        secUserClmLmtDetail.updateProcess = this.windowId;
        secUserClmLmtDetail.updateUser = sessionStorage.getItem('user');
        secUserClmLmtDetail.secUserClmLmtDetailPrimaryKeyModel = secUserClmLmtDetailPrimaryKeyModel;
        return secUserClmLmtDetail;
    }


    onFieldChange(event: any) {
        this.dynamicModificationStatus = true;
    }


    getClaimTypeKeyValues() {
        let data: any[] = [];
        this.claimTypes.forEach((claimType: any) => {
            let claimvalue = claimType.systemCode + "  " + claimType.systemCodeDesc1 + "  " + claimType.systemCodeDesc2;
            let obj = {
                key: claimvalue,
                value: claimType.systemCode
            }
            data.push(obj);
        });
        setTimeout(() => {
            this.userFormConfig[0].options = data;
            let blank = { key: "", value: "" }
            this.userFormConfig[0].options.push(blank);
        });
    }

    getholdReasonCodeKeyValue() {
        let data: any[] = [];
        this.holdReleases.forEach((holdRelease: any) => {
            let holdReleaseValue = holdRelease.systemCode + "  " + holdRelease.systemCodeDesc1 + "  " + holdRelease.systemCodeDesc2;
            let obj = {
                key: holdReleaseValue,
                value: holdRelease.systemCode
            }
            data.push(obj);
        });
        setTimeout(() => {
            this.userFormConfig[1].options = data;
            let blank = { key: "", value: "" }
            this.userFormConfig[1].options.push(blank);
        });
    }

    getDeterminantKeyValue() {
        let data: any[] = [];
        this.determinants.forEach((determinant: any) => {
            let determinantValue = determinant.systemCode + "  " + determinant.systemCodeDesc1 + "  " + determinant.systemCodeDesc2;
            let obj = {
                key: determinantValue,
                value: determinant.systemCode
            }
            data.push(obj);
        });
        setTimeout(() => {
            this.userFormConfig[3].options = data;
            let blank = { key: "", value: "" }
            this.userFormConfig[3].options.push(blank);
        });

    }

    getReasonCodeKeyValue() {
        let data: any[] = [];
        this.reasonCodes.forEach((reasonCode: any) => {
            let reasonCodeValue = reasonCode.reasonCode + "  " + reasonCode.description;
            let obj = {
                key: reasonCodeValue,
                value: reasonCode.reasonCode
            }
            data.push(obj);
        });

        setTimeout(() => {
            this.userFormConfig[4].options = data;
            let blank = { key: "", value: "" }
            this.userFormConfig[4].options.push(blank);
        });
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
            let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', { skipLocationChange: true });
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

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
            } else if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Users'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Window Access'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'n':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Function Access'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Delete Super User'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Delete User'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Group Affiliation'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Panel Affiliation'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Provider Affiliation'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'v':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Vendor Affiliation'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'LOB Affiliation'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Add Database User'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'w':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Update User Password'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'r':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Update Role Password'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Reset Database Password'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'n':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Unlock User Account'
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

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    helpScreen() {
        const modalRef = this.modalService.open(SecurityHelpComponent, {
            windowClass: "myCustomModalClass",
        });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = "SUSER_Users.htm";
    }

    emptyUserPopup() {
        this.messageService.findByMessageId(11019).subscribe(res => {
            this.showPopUp('11019: ' + res[0].messageText, 'Users')
        })
    }
}
