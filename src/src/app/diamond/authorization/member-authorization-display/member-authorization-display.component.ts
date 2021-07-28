/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthMaster, SecWin} from "../../../api-models/index"
import {AuthMasterService} from "../../../api-services/auth-master.service";
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecUser} from '../../../api-models/sec-user.model copy';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu, SearchModel} from '../../../shared/models/models';
import {MemberMasterLookup} from '../../../shared/lookup/member-master-lookup';
import {MemberUtilizationDisplayComponent} from '../../claims/member-utilization-display/member-utilization-display.component';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {MessageMasterDtlService} from "../../../api-services";

// Use the Component directive to define the MemberAuthorizationDisplayComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'memberauthorizationdisplay',
    templateUrl: './member-authorization-display.component.html',
    providers: [AuthMasterService]

})
export class MemberAuthorizationDisplayComponent implements OnInit {


    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    memberAuthorizationDisplayForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'AUDSP';
    public isSuperUser = false;
    public secProgress = true;
    loaderValue = false;
    userTemplateId: string = '';
    secColDetails = new Array<SecColDetail>();
    menu: Menu[] = [];
    memberUtilizationDisplayForm: FormGroup;
    formValidations: FormValidation;
    memberMaster: any;
    isChildModalOpen = false;
    showAuthInfo1: boolean = false;
    showAuthInfo2: boolean = false;
    showAuthInfo3: boolean = false;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private messageService: MessageMasterDtlService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private authMasterService: AuthMasterService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {

        // this.initializePermission();
        this.menuInit();
        this.createForm();
        this.createDataGrid();
        this.hasPermission();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberAuthorizationDisplayForm);
        this.loaderValue = true;
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

    searchModel = new SearchModel(
        "membermasters/lookup",
        MemberMasterLookup.MEMBER_MASTER_ALL,
        MemberMasterLookup.MEMBER_MASTER_DEFAULT,
        []
    );


    modalMemberUtilizationDisplay(event: any) {
        this.isChildModalOpen = true;
        const ref = this.modalService.open(MemberUtilizationDisplayComponent, {
            windowClass: 'input-class',
            size: 'md',
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.dateOfSvcLabl = 'From Request Date';
        ref.componentInstance.displayClaimTypeDDl = false;
        ref.componentInstance.memberUtilizationDisplayForm = this.memberUtilizationDisplayForm;
        ref.result.then((response: any) => {
            if (response.memberMaster) {
                let date;
                if (response.memberUtilizationDisplayForm.value.fromDateOfSvc)
                    date = response.memberUtilizationDisplayForm.value.fromDateOfSvc.singleDate.formatted;

                this.memberUtilizationDisplayForm = response.memberUtilizationDisplayForm;

                this.memberMaster = response.memberMaster;

                this.patchMemberForm(this.memberMaster);

                this.getAuthMastersBySeqMembId(response.memberMaster.seqMembId, date);

            }
        });
    }

    editAuthMaster: boolean;
    authMaster: any = {};
    authMasters: any = [];

    createAuthMaster() {
        this.formValidation.validateForm();
        if (this.memberAuthorizationDisplayForm.valid) {
            let authMaster = new AuthMaster();
            authMaster.memberGender = Form.getValue(this.memberAuthorizationDisplayForm, 'memeberNumber');
            authMaster.diagnosis1Text = Form.getValue(this.memberAuthorizationDisplayForm, 'dynamicText');
            authMaster.callerName = Form.getValue(this.memberAuthorizationDisplayForm, 'name');
            this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editAuthMaster = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateAuthMaster(secondaryAuthNo: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.memberAuthorizationDisplayForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.memberGender = Form.getValue(this.memberAuthorizationDisplayForm, 'memeberNumber');
                authMaster.diagnosis1Text = Form.getValue(this.memberAuthorizationDisplayForm, 'dynamicText');
                authMaster.callerName = Form.getValue(this.memberAuthorizationDisplayForm, 'name');
                this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editAuthMaster = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
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

    deleteAuthMaster(secondaryAuthNo: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authMasterService.deleteAuthMaster(secondaryAuthNo).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getAuthMaster(secondaryAuthNo: number) {
        this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe(authMaster => {
            this.authMaster = authMaster;
            this.memberAuthorizationDisplayForm.patchValue({
                'memeberNumber': this.authMaster.memberGender,
                'dynamicText': this.authMaster.diagnosis1Text,
                'name': this.authMaster.callerName,
            });
        });
    }

    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
            this.authMasters = authMasters;
        });
    }


    getAuthMastersBySeqMembId(seqMembId: number, date: string) {
        this.loaderValue = true;
        this.authMasterService.findBySeqMembIdAndDate(seqMembId, date).subscribe(authMasters => {
            // this.adjustProvidersData(authMasters);
            this.authMasters = authMasters;
            this.dataGridGridOptions.api.setRowData(this.authMasters ? this.authMasters : []);
            if (authMasters) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            } else {
                this.messageService.findByMessageId(9886).subscribe(res => {
                    this.showPopUp('9886: ' + res[0].messageText, 'Member Authorizations Display')
                });
                this.hideAll();
            }
            this.loaderValue = false;
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
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Authorization",
                field: "authNumber",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Secondary",
                field: "secauthNo",
                width: 200
            },
            {
                headerName: "Type",
                field: "authType",
                width: 200
            },
            {
                headerName: "TPL",
                field: "tplCode",
                width: 200
            },
            {
                headerName: "Req Date",
                field: "requestedDate",
                width: 200
            },
            {
                headerName: "Exp Date",
                field: "expirationDate",
                width: 200
            },
            {
                headerName: "Provider Code / Name",
                field: "provCode",
                width: 200,
                valueGetter: (data) => {
                    let provCode = data.data.provCode ? data.data.provCode : '';
                    let shortName = data.data.shortName ? data.data.shortName : '';
                    return provCode + ' / ' + shortName;
                }
            },
            {
                headerName: "Group ID",
                field: "groupId",
                width: 200
            },
            {
                headerName: "Plan Code",
                field: "planCode",
                width: 200
            },
            {
                headerName: "Ext",
                field: "daysVisitsExtension",
                width: 200
            }
        ];
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

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.loaderValue = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.loaderValue = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

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
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            }
        );
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberAuthorizationDisplayForm);
        setTimeout(() => {
            this.modalMemberUtilizationDisplay(null);
            this.loaderValue = false;
        }, 1000);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberAuthorizationDisplayForm = this.formBuilder.group({
            subscriberId: ['', {updateOn: 'blur', validators: []}],
            personNumber: ['', {updateOn: 'blur', validators: []}],
            name: ['', {updateOn: 'blur', validators: []}],
            dob: ['', {updateOn: 'blur', validators: []}],
            gender: ['', {updateOn: 'blur', validators: []}],
            provCode: ['', {updateOn: 'blur', validators: []}],
            provId: ['', {updateOn: 'blur', validators: []}],
            provName: ['', {updateOn: 'blur', validators: []}],
            outOfNet: ['', {updateOn: 'blur', validators: []}],
            pcpId: ['', {updateOn: 'blur', validators: []}],
            pcpName: ['', {updateOn: 'blur', validators: []}],


        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    patchMemberForm(memberMaster: any) {

        this.memberAuthorizationDisplayForm.patchValue({
            'subscriberId': memberMaster.subscriberId,
            'personNumber': memberMaster.personNumber,
            'name': memberMaster.firstName + '  ' + memberMaster.lastName,
            'dob': memberMaster.dateOfBirth,
            'gender': memberMaster.gender,


        });

    }

    onChangeAuthGrid() {
        this.loaderValue = false;

        this.hideAll();
        if (this.dataGridGridOptions.api.getSelectedRows().length == 1) {
            this.authMaster = {};
            this.authMaster = this.dataGridGridOptions.api.getSelectedRows()[0];

        }
    }

    hideAll() {
        this.showAuthInfo1 = false;
        this.showAuthInfo2 = false;
        this.showAuthInfo3 = false;
    }

    authInfo1() {
        if (this.authMasters) {
            this.showAuthInfo1 = true;
            this.showAuthInfo2 = false;
            this.showAuthInfo3 = false;
        }
    }

    authInfo2() {
        if (this.authMasters) {
            this.showAuthInfo1 = false;
            this.showAuthInfo2 = true;
            this.showAuthInfo3 = false;
        }
    }

    authInfo3() {
        if (this.authMasters) {
            this.showAuthInfo1 = false;
            this.showAuthInfo2 = false;
            this.showAuthInfo3 = true;
        }
    }

    onMenuItemClick(eve: any) {
        this.toastService.showToast(
            "Action is not valid",
            NgbToastType.Danger
        );
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New", shortcutKey: 'Ctrl+M', disabled: !this.isSuperUser},
                    { name: "Open", shortcutKey: 'Ctrl+O'},
                    { name: "Save", shortcutKey: 'Ctrl+S', disabled: !this.isSuperUser },
                    { name: "Close", shortcutKey: 'Ctrl+F4'},
                    { isHorizontal: true},
                    { name: "Main Menu...", shortcutKey: 'F2' },
                    { name: "Shortcut Menu...", shortcutKey: 'F3' },
                    { isHorizontal: true},
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", disabled: true, shortcutKey: 'Ctrl+Z' },
                    { isHorizontal: true },
                    { name: "Cut", disabled: true, shortcutKey: 'Ctrl+X' },
                    { name: "Copy", disabled: true, shortcutKey: 'Ctrl+C' },
                    { name: "Paste", disabled: true, shortcutKey: 'Ctrl+V' },
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8'},
                    { name: 'Previous', shortcutKey: 'F7'},
                    { isHorizontal: true},
                    { name: "Lookup", shortcutKey: 'F5', disabled: this.isSuperUser },
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'View Claims with Auth Number'}
                ]
            },
            {
                menuItem: "Notes",
                dropdownItems: [{ name: "Notes", shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Audit Display', shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 Member Authorization Display'},
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
                ],
            },
        ];
    }
}
