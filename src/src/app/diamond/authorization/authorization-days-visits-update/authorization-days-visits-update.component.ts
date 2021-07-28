/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {AuthDaysVisExtension} from '../../../api-models/authorization/auth-days-vis-extension.model';
import {AuthMaster} from '../../../api-models/authorization/auth-master.model';
import {Form} from '../../../shared/helpers/form.helper';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {NgbToastType} from 'ngb-toast';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecurityService} from '../../../shared/services/security.service';
import {AuthDaysVisExtensionService} from '../../../api-services/authorization/auth-days-vis-extension.service';
import {AuthMasterService} from '../../../api-services/authorization/auth-master.service';
import {MessageMasterDtl, ReasonCodeMaster, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {MessageMasterDtlService, ReasonCodeMasterService, SecUserService, SystemCodesService} from '../../../api-services';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {AUTHORIZATION_DAYS_VISITS_UPDATE} from '../../../shared/app-constants';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {InstitutionalAuthNumberLookup} from '../../../shared/lookup/institutional-auth-number-lookup';
import {SearchService} from '../../../shared/services/search.service';
import {ReasonCodeMasterCustomLookup} from '../../../shared/lookup/reason-code-master-lookup';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {geAuthorizationDaysVisitShortcutKeys} from '../../../shared/services/shared.service';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_AUTH_CERT_TYPE} from '../../../shared/models/constants';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ToastService} from '../../../shared/services/toast.service';
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {MemberMasterService} from "../../../api-services/member-master.service";

@Component({

    selector: 'authorizationdaysvisitsupdate',
    templateUrl: './authorization-days-visits-update.component.html',
    styleUrls: ['./authorization-days-visits-update.component.css'],

})
export class AuthorizationDaysVisitsUpdateComponent implements OnInit, AfterViewInit {

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @Input() showIcon = false;


    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    showBillingInformation = false;
    showCashReceptDetails = false;

    authorizationDaysVisitsUpdateForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    public memberModuleId = AUTHORIZATION_DAYS_VISITS_UPDATE;
    certificationsTypes = [];

    editAuthDaysVisExtension: boolean;
    authDaysVisExtension: AuthDaysVisExtension;
    authDaysVisExtensions: AuthDaysVisExtension[];
    editAuthMaster: boolean;
    authMaster: AuthMaster;
    authMasters: AuthMaster[];
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    authNumberSearchMdel = new SearchModel(
        'instclaimheaders/lookup/authNumber',
        InstitutionalAuthNumberLookup.ALL,
        InstitutionalAuthNumberLookup.DEFAULT,
        [],
        true
    );

    ReasonCodeMasterSearchModal = new SearchModel(
        'reasoncodemasters/lookupAll',
        ReasonCodeMasterCustomLookup.REASONCODE_MASTER_ALL,
        ReasonCodeMasterCustomLookup.REASONCODE_MASTER_DEFAULT,
        []
    );

    showGrid001Form = false;

    // else {
    showGrid002Form = false;
    isValidAuthNumber = false;
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    private windowId = 'DVEXT';
    //
    private dataGrid001gridApi: any;
    // }
    private dataGrid001gridColumnApi: any;
    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;
    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    dataGrid002Data: any[];

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
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private authDaysVisExtensionService: AuthDaysVisExtensionService,
        private authMasterService: AuthMasterService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private messageService: MessageMasterDtlService,
        private systemCodesService: SystemCodesService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private memberEligHistoryService: MemberEligHistoryService,
        private memberMasterService: MemberMasterService,
        private MemberEligHistoryService: MemberEligHistoryService,
        private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.hasPermission();

        // this.createForm();
        // this.displayMessage = {};
        // this.formValidation = new FormValidation(this.authorizationDaysVisitsUpdateForm);
        // this.createDataGrid001();
        // this.createDataGrid002();
        // this.createDataGrid003();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...geAuthorizationDaysVisitShortcutKeys(this));
        this.cdr.detectChanges();
    }

    // else {
    //
    // }

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

    saveAuthDaysVisExtension() {
        if (this.editAuthDaysVisExtension) {
            this.updateAuthDaysVisExtension();
        } else {
            this.createAuthDaysVisExtension();
        }

    }

    deleteAuthDaysVisExtension(authNumber: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authDaysVisExtensionService.deleteAuthDaysVisExtension(authNumber).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getAuthDaysVisExtension(authNumber: number) {
        this.authDaysVisExtensionService.getAuthDaysVisExtension(authNumber).subscribe(authDaysVisExtension => {
            this.authDaysVisExtension = authDaysVisExtension;
            this.authorizationDaysVisitsUpdateForm.patchValue({
                'authNumber': this.authDaysVisExtension.authNumber,
            });
        });
    }

    getAuthDaysVisExtensions() {
        this.authDaysVisExtensionService.getAuthDaysVisExtensions().subscribe(authDaysVisExtensions => {
            this.authDaysVisExtensions = authDaysVisExtensions;
        });
    }

    // if (this.secWin.hasInsertPermission()) {
    createAuthMaster() {
        this.formValidation.validateForm();
        if (this.authorizationDaysVisitsUpdateForm.valid) {
            let authMaster = new AuthMaster();
            authMaster.authNumber = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authNumber');
            authMaster.requestedDate = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'reqDate');
            authMaster.authType = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authType');
            authMaster.authLevel = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'level');
            authMaster.planCode = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'pcpId');
            authMaster.tplCode = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'tplCode');
            authMaster.privacyApplied = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'privacyMayApply');
            authMaster.nsSubscriberId = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'nonSysSubscriberId');
            authMaster.certificationType = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'certificationType');
            authMaster.paperworkAttached = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'paperworkAttachment');
            authMaster.expirationDate = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authExipartionDate');
            this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editAuthMaster = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateAuthMaster(secondaryAuthNo: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authorizationDaysVisitsUpdateForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authNumber = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authNumber');
                authMaster.requestedDate = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'reqDate');
                authMaster.authType = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authType');
                authMaster.authLevel = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'level');
                authMaster.planCode = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'pcpId');
                authMaster.tplCode = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'tplCode');
                authMaster.privacyApplied = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'privacyMayApply');
                authMaster.nsSubscriberId = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'nonSysSubscriberId');
                authMaster.certificationType = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'certificationType');
                authMaster.paperworkAttached = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'paperworkAttachment');
                authMaster.expirationDate = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authExipartionDate');
                this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editAuthMaster = false;
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
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getAuthMaster(secondaryAuthNo: string) {
        this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe(authMaster => {
            this.authMaster = authMaster[0];
            this.authorizationDaysVisitsUpdateForm.patchValue({
                'authNumber': this.authMaster.authNumber,
                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                'authType': this.authMaster.authType,
                'level': this.authMaster.authLevel,
                'pcpId': this.authMaster.planCode,
                'tplCode': this.authMaster.tplCode,
                'privacyMayApply': this.authMaster.privacyApplied,
                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                'certificationType': this.authMaster.certificationType,
                'paperworkAttachment': this.authMaster.paperworkAttached,
                'authExipartionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.expirationDate),
            });
        });
    }

    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
            this.authMasters = authMasters;
        });
    }

    dataGrid001GridOptionsExportCsv() {
        var params = {};
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        var params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    dataGrid003GridOptionsExportCsv() {
        var params = {};
        this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    public createNewAuthDaysVisExtensionShortCutAction() {
        this.editAuthDaysVisExtension = false;
        if (!this.isValidAuthNumber) {
            this.showPopUp('9853: A current Authorization must be selected before a new record can be created',
                'Authorization Days Visits Update');
            return;
        }
        this.showGrid002Form = true;
        this.dataGrid002GridOptions.api.deselectAll();

        let data = [];
        for (let item in this.dataGrid002Data) {
            data.push(this.dataGrid002Data[item])
        }
        let item = {
            daysVisitsExtension : 0
        };
        data.push(item);
        this.dataGrid002GridOptions.api.setRowData(data);
        this.dataGrid002GridOptions.api.selectIndex(data.length - 1, false, false);

    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.showGrid001Form = true;
    }

    onRowSelectedGrid002(event) {
        if (!event.node.selected) {
            return;
        }
        this.showGrid002Form = true;
        // this.editAuthDaysVisExtension = true;
        this.loadDataGridForm002(event.data);
    }

    loadDataGridForm002(eventData: AuthDaysVisExtension) {
        this.showGrid002Form = true;
        this.authorizationDaysVisitsUpdateForm.patchValue({
            seqDaysVisExt: eventData.authDaysVisExtensionPrimaryKey?eventData.authDaysVisExtensionPrimaryKey.seqDaysVisExt:null,
            daysNorm: this.authMaster.normDaysVisits?this.authMaster.normDaysVisits:0,
            daysAuth: this.authMaster.authorizedDaysVis?this.authMaster.authorizedDaysVis:0,
            daysDenied: this.authMaster.deniedDaysVis?this.authMaster.deniedDaysVis:0,
            daysVisUpdate: eventData.daysVisitsExtension,
            updateReason: eventData.reasonCodeMaster ? eventData.reasonCodeMaster.reasonCode : null,
            updateDate: this.dateFormatPipe.defaultDisplayDateFormat(eventData.extensionDate),
            authExipartionDate: this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.expirationDate),
            authDischargeDate: this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.dischThruDate),
            comments: eventData.comments?eventData.comments:null
        });
        this.isFormDataModified()
    }

    // if (this.secWin.hasInsertPermission()) {
    createAuthDaysVisExtension() {
        this.formValidation.validateForm();
        if (this.authorizationDaysVisitsUpdateForm.valid) {
            let authDaysVisExtension = new AuthDaysVisExtension();
            const authMaster = new AuthMaster();
            console.log(this.authMaster.secondaryAuthNo);
            authDaysVisExtension.authNumber = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authNumber');
            authDaysVisExtension.secondaryAuthNo = this.authMaster.authMasterPrimaryKey.secondaryAuthNo;
            authDaysVisExtension.authDaysVisExtensionPrimaryKey = {
                authNumber: authDaysVisExtension.authNumber,
                secondaryAuthNo: authDaysVisExtension.secondaryAuthNo,
                seqDaysVisExt: null
            };
            authDaysVisExtension.daysVisitsExtension = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'daysVisUpdate');
            const updateReason = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'updateReason');
            if (null != updateReason && undefined != updateReason && '' != updateReason) {
                const reasonCodeMaster = new ReasonCodeMaster();
                reasonCodeMaster.reasonCode = updateReason;
                authDaysVisExtension.reasonCodeMaster = reasonCodeMaster;
            }
            authDaysVisExtension.comments = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'comments');
            authDaysVisExtension.extensionDate = Form.getDatePickerValue(this.authorizationDaysVisitsUpdateForm, 'updateDate');
            this.authDaysVisExtensionService.createAuthDaysVisExtension(authDaysVisExtension).subscribe(response => {

                this.authDaysVisExtensionService.findAllByAuthNumber(authDaysVisExtension.authNumber).subscribe((response2: any[]) => {
                    this.dataGrid002GridOptions.api.setRowData(response2);
                    if (response2.length > 0) {
                        this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                    }
                });

                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editAuthDaysVisExtension = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete.' +
                ' Please correct your entries and try again.');
        }
    }

    updateAuthDaysVisExtension() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationDaysVisitsUpdateForm.valid) {
            let authDaysVisExtension = new AuthDaysVisExtension();
            const authMaster = new AuthMaster();
            authDaysVisExtension.authNumber = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'authNumber');
            authDaysVisExtension.secondaryAuthNo = this.authMaster.authMasterPrimaryKey.secondaryAuthNo;;
            authDaysVisExtension.seqDaysVisExt = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'seqDaysVisExt');
            authDaysVisExtension.authDaysVisExtensionPrimaryKey = {
                authNumber: authDaysVisExtension.authNumber,
                secondaryAuthNo: authDaysVisExtension.secondaryAuthNo,
                seqDaysVisExt: null
            };
            authDaysVisExtension.daysVisitsExtension = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'daysVisUpdate');
            const updateReason = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'updateReason');
            if (null != updateReason && undefined != updateReason && '' != updateReason) {
                const reasonCodeMaster = new ReasonCodeMaster();
                reasonCodeMaster.reasonCode = updateReason;
                authDaysVisExtension.reasonCodeMaster = reasonCodeMaster;
            }
            authDaysVisExtension.comments = Form.getValue(this.authorizationDaysVisitsUpdateForm, 'comments');
            authDaysVisExtension.extensionDate = Form.getDatePickerValue(this.authorizationDaysVisitsUpdateForm, 'updateDate');
            this.authDaysVisExtensionService.updateAuthDaysVisExtension(authDaysVisExtension).subscribe(response => {
                this.authDaysVisExtensionService.findAllByAuthNumber(authDaysVisExtension.authNumber).subscribe((response2: any[]) => {
                    this.dataGrid002GridOptions.api.setRowData(response2);
                    if (response2.length > 0) {
                        this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                    }
                });
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editAuthDaysVisExtension = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
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
                width: 200
            },
            {
                headerName: "Member ID",
                field: "",
                width: 160,
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
                headerName: 'Days Vis Update',
                field: 'daysVisitsExtension',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Update Reason',
                field: 'reasonCodeMaster.reasonCode',
                width: 200
            },
            {
                headerName: 'Update Date',
                field: 'extensionDate',
                width: 200
            },
            {
                headerName: 'Auth Expiration Date',
                field: 'authMaster.expirationDate',
                width: 200
            },
            {
                headerName: 'Auth Discharge Date',
                field: 'authMaster.dischThruDate',
                width: 200
            },
            {
                headerName: 'Comments',
                field: 'comments',
                width: 200
            }
        ];
    }

    createDataGrid003(): void {
        this.dataGrid003GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid003GridOptions.editType = 'fullRow';
        this.dataGrid003GridOptions.columnDefs = [
            {
                headerName: 'Auth Master',
                field: 'authnumber',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Days Norm',
                field: '',
                width: 200
            },
            {
                headerName: 'Days Auth',
                field: 'secondaryauthno',
                width: 200
            },
            {
                headerName: 'Days Denied',
                field: 'updatedatetime',
                width: 200
            }
        ];
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the

    // resources are fully loaded before performing the initial setup processing.


    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationDaysVisitsUpdateForm = this.formBuilder.group({
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
            shortName: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            nonSysSubscriberId: ['', {updateOn: 'blur', validators: []}],
            certificationType: ['', {updateOn: 'blur', validators: []}],
            paperworkAttachment: ['', {updateOn: 'blur', validators: []}],
            batchId: ['', {updateOn: 'blur', validators: []}],

            seqDaysVisExt: ['', {updateOn: 'blur', validators: []}],
            daysNorm: ['', {updateOn: 'blur', validators: []}],
            daysAuth: ['', {updateOn: 'blur', validators: []}],
            daysDenied: ['', {updateOn: 'blur', validators: []}],
            daysVisUpdate: ['', {updateOn: 'blur', validators: []}],
            updateReason: ['', {updateOn: 'blur', validators: []}],
            updateDate: ['', {updateOn: 'blur', validators: []}],
            authExipartionDate: ['', {updateOn: 'blur', validators: []}],
            authDischargeDate: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

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
                this.showPopUp('You are not Permitted to view Authorization Days Visits Update',
                    'Authorization Days Visits Update Permission')
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
        this.secColDetailService.findByTableNameAndUserId('AUTH_DAYS_VIS_EXTENSION', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    formKeyDown(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupAuthNumberFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.editAuthDaysVisExtension = true;
            this.enterAuthNumber(event.target.value);
        }
    }

    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupAuthNumberFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (id === '') {
                this.emptyDataPopup()
            }
            else {
                this.enterAuthNumber(event.target.value);
            }
        }
    }

    openLookupAuthNumberFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.authNumberSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.enterAuthNumber(res.AUTH_NUMBER);
                // console.log(res);
                // this.authorizationDaysVisitsUpdateForm.patchValue({
                //     authNumber: res.AUTH_NUMBER,
                //     secondaryAuthNo: res.AUTH_SECONDARY_AUTH_NO,
                //     seqDaysVisExt: res.S
                // });
                // this.isValidAuthNumber = true;
                // this.loadGridData(res.AUTH_NUMBER);
            }
        });
    }

    LookupReason(event: any, reason: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            this.ReasonCodeMasterSearchModal.searchOption = [
                {
                    REASON_CODE_TYPE: 'EX',
                },
            ];
            ref.componentInstance.searchModel = this.ReasonCodeMasterSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.authorizationDaysVisitsUpdateForm.patchValue({
                        updateReason: res.reasonCode
                    });
                }
            });
        }
    }

    validateReason(event: any) {
        var ls_val = event.target.value;
        var reasonType;
        if (ls_val == 'H') {
            event.target.value = 'HD';
        } else if (ls_val == 'D') {
            event.target.value = 'NC';
        }
        if (ls_val == '') {
        }

        if (ls_val != null) {
            if (this.validateReasonCode(ls_val)) {
                return;
            } else {
                this.ShowError(27222, false);
                return;
            }
        }
    }

    validateReasonCode(value: any) {
        this.reasonCodeMasterService
            .getReasonCodeMaster(value)
            .subscribe((data) => {
                if (data) {
                    return true;
                } else {
                    return false;
                }
            });
        return false;
    }

    enterAuthNumber(value) {
        if (isNaN(Number(value))) {
            this.showPopUp('9817: Auth Number must be numeric',
                'Authorization');
            return;
        }


        let res = [{'AUTH_NUMBER': value}];
        let sm = JSON.parse(JSON.stringify(this.authNumberSearchMdel));
        sm.searchOption = res;
        this.authMasterService.getAuthMaster(value).subscribe(authProcMas => {
            if (authProcMas) {
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
                        this.memberEligHistoryService
                            .getMember_bavc(memberEligHistroyData.seqSubsId).subscribe(response => {
                            let memberBavcData = response[0];
                            this.authorizationDaysVisitsUpdateForm.patchValue({
                                'authNumber': value,
                                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                                'authType': this.authMaster.authType,
                                'level': this.authMaster.authLevel,
                                'pcpid': this.authMaster.requestedDate,
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
                                'groupId': memberEligHistroyData.groupId,
                                'shortName': memberBavcData.short_name,
                                'planCode': memberBavcData.plan_code,
                                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                                'certificationType': this.authMaster.certificationType === '3' ? 'Cancel' : this.authMaster.certificationType, // Drop Down
                                'paperworkAttachment': this.authMaster.paperworkAttached === 'N' ? 'None' : this.authMaster.paperworkAttached,   // Drop Down
                                'batchId': this.authMaster.batchId,
                            });
                            this.authMasters[0].memberEligHistory.groupId = memberEligHistroyData.groupId;
                            this.authorizationDaysVisitsUpdateForm.get('authNumber').disable();
                            this.dataGrid001GridOptions.api.setRowData(this.authMasters);
                            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                            this.loadGridData(value);
                            this.isValidAuthNumber = true;
                        })

                    })
                })
            } else {
                this.emptyDataPopup()
            }

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getCertificationsType() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_AUTH_CERT_TYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.certificationsTypes = systemCodes;
        });
    }

    loadGridData(authNumber: number) {
        this.authMasterService.findListByAuthNumber(authNumber).subscribe((value: any[]) => {
            this.authDaysVisExtensionService.findAllByAuthNumber(authNumber).subscribe((response: any[]) => {
                this.dataGrid002Data = response;
                this.dataGrid002GridOptions.api.setRowData(response);
                if (response && response.length > 0) {
                    this.dataGrid002GridOptions.api.selectNode(this.dataGrid002GridOptions.api.getRenderedNodes()[0]);
                }
            });
        });


    }

    ShowError(number: any, check: any, value = '1') {
        if (check) {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ':' + message[0].messageText.replace('1@', value),
                        'Authorization Days Visits Update'
                    );
                });
        } else {
            this.messageService
                .findByMessageId(number)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        number + ':' + message[0].messageText,
                        'Authorization Days Visits Update'
                    );
                });
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewAuthDaysVisExtensionShortCutAction();
                    break;
                }
                case 'Open': {
                    this.initializeComponentState();
                    break;
                }
                case 'Save': {
                    this.saveAuthDaysVisExtension();
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
        }
    }

    private initializeComponentState(): void {
        this.showGrid001Form = false;
        this.showGrid002Form = false;
        this.getCertificationsType();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationDaysVisitsUpdateForm);
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();

        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        }, 100);
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
                    {name: 'Next', disabled: true},
                    {name: 'Previous', disabled: true}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Auth Lookup'},
                    {name: 'Send To Case Management'},
                    {name: 'View Claims with Auth Number'},
                    {name: 'Other Authorization Information'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Auth Master'},
                    {name: 'Procedure'},
                    {name: 'Appeal'},
                    {name: 'Physician Advisor'},
                    {name: 'Second Opinion'}
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

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Auth Lookup': {
                this.openLookupAuthNumberFieldSearchModel();
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

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Days Visits Update')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveAuthDaysVisExtension()
                } else if (resp.name === 'No') {
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
        this.authorizationDaysVisitsUpdateForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    emptyDataPopup = () => {
        this.messageService.findByMessageId(9853).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage(
                'popUpMessageName',
                'Authorization Days Visits Update',
                "9853: " + message[0].messageText,
                'icon');
            let ref = this.modalService.open(PopUpMessageComponent, {
                backdrop: false,
            });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            })
        });
    }

}
