/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from 'ag-grid-community';
import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {AuthCode, AuthMaster, AuthPhysAdvisor, MessageMasterDtl, ProvMaster, SecUser, SecWin} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {
    AuthCodeService,
    AuthMasterService,
    AuthPhysAdvisorService,
    MessageMasterDtlService
} from '../../../api-services';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {Menu, SearchModel} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {getPhysicianAdvisoryShortcutKeys} from '../../../shared/services/shared.service';
import {InstitutionalAuthNumberLookup} from '../../../shared/lookup/institutional-auth-number-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProviderMasterLookup} from '../../../shared/lookup/provider-master-lookup';
import {AuthCodesLookup} from '../../../shared/lookup/auth-code-lookup';
import {MemberMasterService} from "../../../api-services/member-master.service";
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";

// Use the Component directive to define the AuthorizationPhysicianAdvisorComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationphysicianadvisor',
    templateUrl: './authorization-physician-advisor.component.html',
    providers: [
        AuthMasterService,
        AuthPhysAdvisorService,
        AuthCodeService
    ]

})
export class AuthorizationPhysicianAdvisorComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authorizationPhysicianAdvisorForm: FormGroup;
    physicianAdvisorForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'PHYAD';
    public isSuperUser = false;
    public secProgress = true;
    editAuthMaster: boolean;
    authMaster: AuthMaster;
    authMasters: AuthMaster[];
    editAuthPhysAdvisor: boolean;
    authPhysAdvisor: AuthPhysAdvisor;
    authPhysAdvisors: AuthPhysAdvisor[];
    recommendationCode: AuthCode[];
    advisorDecision: AuthCode[];
    advisorService: AuthCode[];
    seqProvId: number;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;
    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;
    public menu: Menu[] = [];
    private dataLoadedMap = new Map<string, boolean>();
    public shortcuts: ShortcutInput[] = [];
    authNumberSearchMdel = new SearchModel(
        'instclaimheaders/lookup/authNumber',
        InstitutionalAuthNumberLookup.ALL,
        InstitutionalAuthNumberLookup.DEFAULT,
        [],
        true
    );

    physAdvisorSearchModel = new SearchModel(
        'provmasters/lookup2',
        ProviderMasterLookup.PROVIDER_MASTER_ALL2,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT2,
        [],
        true
    );
    nurseRecommendSearchModel = new SearchModel(
        'authcodes/lookup/RC',
        AuthCodesLookup.AUTH_CODE_ALL,
        AuthCodesLookup.AUTH_CODE_DEFAULT,
        [],
        true
    );
    advisorDecisionSearchModel = new SearchModel(
        'authcodes/lookup/DC',
        AuthCodesLookup.AUTH_CODE_ALL,
        AuthCodesLookup.AUTH_CODE_DEFAULT,
        [],
        true
    );
    advisorServiceSearchModel = new SearchModel(
        'authcodes/lookup/ST',
        AuthCodesLookup.AUTH_CODE_ALL,
        AuthCodesLookup.AUTH_CODE_DEFAULT,
        [],
        true
    );
    @Input() showIcon: boolean = false;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    showAuthPhysAdvisorField = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

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


    createAuthMaster() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.authorizationPhysicianAdvisorForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authNumber = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authNumber');
                authMaster.requestedDate = Form.getValue(this.authorizationPhysicianAdvisorForm, 'reqDate');
                authMaster.authType = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authType');
                authMaster.authLevel = Form.getValue(this.authorizationPhysicianAdvisorForm, 'leverl');
                authMaster.tplCode = Form.getValue(this.authorizationPhysicianAdvisorForm, 'tplCode');
                authMaster.privacyApplied = Form.getValue(this.authorizationPhysicianAdvisorForm, 'privacyMaApply');
                authMaster.memberAge = Form.getValue(this.authorizationPhysicianAdvisorForm, 'memberId');
                authMaster.seqGroupId = Form.getValue(this.authorizationPhysicianAdvisorForm, 'groupId');
                authMaster.planCode = Form.getValue(this.authorizationPhysicianAdvisorForm, 'planCode');
                authMaster.nsSubscriberId = Form.getValue(this.authorizationPhysicianAdvisorForm, 'nonSysSubscriberId');
                authMaster.certificationType = Form.getValue(this.authorizationPhysicianAdvisorForm, 'certificationType');
                authMaster.paperworkAttached = Form.getValue(this.authorizationPhysicianAdvisorForm, 'paperworkAttachment');
                this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editAuthMaster = false;
                });

            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {

        }
    }


    updateAuthMaster(secondaryAuthNo: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authorizationPhysicianAdvisorForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authNumber = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authNumber');
                authMaster.requestedDate = Form.getValue(this.authorizationPhysicianAdvisorForm, 'reqDate');
                authMaster.authType = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authType');
                authMaster.authLevel = Form.getValue(this.authorizationPhysicianAdvisorForm, 'leverl');
                authMaster.tplCode = Form.getValue(this.authorizationPhysicianAdvisorForm, 'tplCode');
                authMaster.privacyApplied = Form.getValue(this.authorizationPhysicianAdvisorForm, 'privacyMaApply');
                authMaster.memberAge = Form.getValue(this.authorizationPhysicianAdvisorForm, 'memberId');
                authMaster.seqGroupId = Form.getValue(this.authorizationPhysicianAdvisorForm, 'groupId');
                authMaster.planCode = Form.getValue(this.authorizationPhysicianAdvisorForm, 'planCode');
                authMaster.nsSubscriberId = Form.getValue(this.authorizationPhysicianAdvisorForm, 'nonSysSubscriberId');
                authMaster.certificationType = Form.getValue(this.authorizationPhysicianAdvisorForm, 'certificationType');
                authMaster.paperworkAttached = Form.getValue(this.authorizationPhysicianAdvisorForm, 'paperworkAttachment');
                this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editAuthMaster = false;
                });
            } else {
                this.alertMessage =
                    this.alertMessageService.error(
                        'Some required information is missing or incomplete. Please correct your entries and try again.');
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
        if (!this.showAuthPhysAdvisorField) {
            this.createDataGrid001();
            this.createDataGrid002();
        }

        this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe(authMaster => {
            if (authMaster) {
                this.authorizationPhysicianAdvisorForm.get('authNumber').disable();
                this.authMaster = authMaster[0];
                for (let item of authMaster) {
                    item.activeDaysVisit = item.activeDaysVisit ? 'Yes' : 'No';
                }
                this.authMasters = authMaster;
                this.showAuthPhysAdvisorField = true;
                this.authMaster = this.authMasters[0];
                this.memberMasterService.findBySubscriberId(this.authMaster.memberEligHistory.subscriberId).subscribe(res => {
                    let memberMasterData = res[0];
                    this.MemberEligHistoryService.getSelectMemberGrid(memberMasterData.seqSubsId).subscribe(resp => {
                        let memberEligHistroyData = resp[0];
                        this.MemberEligHistoryService
                            .getMember_bavc(memberEligHistroyData.seqSubsId).subscribe(response => {
                            let memberBavcData = response[0];
                            this.authorizationPhysicianAdvisorForm.patchValue({
                                'authNumber': secondaryAuthNo,
                                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                                'authType': this.authMaster.authType,
                                'leverl': this.authMaster.authLevel,
                                'pcpid': this.authMaster.requestedDate,
                                // 'diamondId': this.authMaster.memberMaster.diamondId,
                                'tplCode': this.authMaster.tplCode == "NA" ? "Not Applicable" : this.authMaster.tplCode, //drp down
                                'lob': this.authMaster.memberEligHistory.lineOfBusiness,
                                'privacyMayApply': this.authMaster.privacyApplied,
                                'memberId': this.authMaster.memberEligHistory.subscriberId,
                                'personNo': this.authMaster.memberEligHistory.personNumber,
                                'lastName': memberMasterData.lastName,
                                'firstName': memberMasterData.firstName,
                                'age': this.authMaster.memberAge,
                                'sex': this.authMaster.memberGender,
                                'groupId': memberEligHistroyData.groupId,
                                'groupId1': memberBavcData.short_name,
                                'planCode': memberBavcData.plan_code,
                                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                                'certificationType': this.authMaster.certificationType === '3' ? 'Cancel' : this.authMaster.certificationType, // Drop Down
                                'paperworkAttachment': this.authMaster.paperworkAttached === 'N' ? 'None' : this.authMaster.paperworkAttached,   // Drop Down
                                'batchId': this.authMaster.batchId,
                            });
                            this.authMasters[0].memberEligHistory.groupId = memberEligHistroyData.groupId;
                            this.dataGrid001GridOptions.api.setRowData(this.authMasters);
                            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                        })
                    })
                })
            }
            else {
                this.showAuthPhysAdvisorField = false;
                this.emptyDataPopup()
            }
        });
    }

    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
            this.authMasters = authMasters;
        });
    }

    createAuthPhysAdvisor() {
        // if (this.secWin.hasInsertPermission()) {
        this.formValidation.validateForm();
        if (this.authorizationPhysicianAdvisorForm.valid) {
            let selectedRow = this.dataGrid001GridOptions.api.getSelectedRows();
            let authPhysAdvisor = new AuthPhysAdvisor();
            authPhysAdvisor.authNumber = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authNumber');
            authPhysAdvisor.secondaryAuthNo = selectedRow[0].authMasterPrimaryKey.secondaryAuthNo;
            authPhysAdvisor.recommendationCode = Form.getValue(this.physicianAdvisorForm, 'nurseRecom');
            authPhysAdvisor.advisorDecision = Form.getValue(this.physicianAdvisorForm, 'advisorDecision');
            authPhysAdvisor.advisorService = Form.getValue(this.physicianAdvisorForm, 'advisorService');
            authPhysAdvisor.seqProvId = this.seqProvId;
                        authPhysAdvisor.comments =
                          this.physicianAdvisorForm.get("comments").value;
            authPhysAdvisor.contactDate = Form.getDatePickerValue(this.physicianAdvisorForm, 'contactDate');
            authPhysAdvisor.decisionDate = Form.getDatePickerValue(this.physicianAdvisorForm, 'decisionDate');
            this.authPhysAdvisorService.createAuthPhysAdvisor(authPhysAdvisor).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editAuthPhysAdvisor = false;
            });
            if (this.screenCloseRequest === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000);
                this.isFormDataChangeStatus = false;
            }
        } else {
            this.alertMessage =
                this.alertMessageService.error(
                    'Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {

        // }
    }


    updateAuthPhysAdvisor() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationPhysicianAdvisorForm.valid) {
            let authPhysAdvisor = new AuthPhysAdvisor();
            authPhysAdvisor.authNumber = Form.getValue(this.authorizationPhysicianAdvisorForm, 'authNumber');
            authPhysAdvisor.recommendationCode = Form.getValue(this.physicianAdvisorForm, 'nurseRecom');
            authPhysAdvisor.advisorDecision = Form.getValue(this.physicianAdvisorForm, 'advisorDecision');
            authPhysAdvisor.advisorService = Form.getValue(this.physicianAdvisorForm, 'advisorService');
            authPhysAdvisor.seqProvId = this.seqProvId;
            authPhysAdvisor.comments =this.physicianAdvisorForm.get('comments').value;
                         
            authPhysAdvisor.contactDate = Form.getDatePickerValue(this.physicianAdvisorForm, 'contactDate');
            authPhysAdvisor.decisionDate = Form.getDatePickerValue(this.physicianAdvisorForm, 'decisionDate');
            let selectedRow = this.dataGrid002GridOptions.api.getSelectedRows();
            let authNumber = selectedRow[0].authPhysAdvisorPrimaryKey.authNumber;
            let secondaryAuthNo = selectedRow[0].authPhysAdvisorPrimaryKey.secondaryAuthNo;
            let seqAuthAdv = selectedRow[0].authPhysAdvisorPrimaryKey.seqAuthAdv;
            this.authPhysAdvisorService.updateAuthPhysAdvisor(
                authPhysAdvisor, seqAuthAdv, secondaryAuthNo, authNumber).subscribe(response => {
                this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                this.editAuthPhysAdvisor = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            });
        } else {
            this.alertMessage =
                this.alertMessageService.error(
                    'Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        // } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
    }

    saveAuthPhysAdvisor() {
        if (this.editAuthPhysAdvisor) {
            this.updateAuthPhysAdvisor()
        } else {
            this.createAuthPhysAdvisor();
        }
    }

    deleteAuthPhysAdvisor(authNumber: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authPhysAdvisorService.deleteAuthPhysAdvisor(authNumber).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getAuthPhysAdvisor(authNumber: number) {
        this.authPhysAdvisorService.getAuthPhysAdvisor(authNumber).subscribe(authPhysAdvisor => {
            this.authPhysAdvisor = authPhysAdvisor[0];
            this.dataGrid002GridOptions.api.setRowData(authPhysAdvisor);
            this.dataGrid002GridOptions.api.selectIndex(0, false, false);
            this.grid2SelectionChange();
        });
    }

    getAuthPhysAdvisors() {
        this.authPhysAdvisorService.getAuthPhysAdvisors().subscribe(authPhysAdvisors => {
            this.authPhysAdvisors = authPhysAdvisors;
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


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
            {
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
                headerName: "Secondary",
                field: "authMasterPrimaryKey.secondaryAuthNo",
                width: 130
            },
            {
                headerName: "Req. Date",
                field: "requestedDate",
                width: 140
            },
            {
                headerName: "Type",
                field: "authType",
                width: 120
            },
            {
                headerName: "Ext",
                field: "activeDaysVisit",
                width: 100
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
        this.dataGrid002GridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Phys Advisor',
                field: 'provMasterViewModel.providerId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Name',
                field: 'provMasterViewModel.shortName',
                width: 200
            },
            {
                headerName: 'Nurse Rcmd',
                field: 'recommendationCode',
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
                headerName: 'Advisor Decision',
                field: 'advisorDecision',
                width: 200
            },
        ];
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
        private secUserService: SecUserService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private authMasterService: AuthMasterService,
        private authCodeService: AuthCodeService,
        private memberMasterService: MemberMasterService,
        private MemberEligHistoryService: MemberEligHistoryService,
        private authPhysAdvisorService: AuthPhysAdvisorService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();


        // this.createForm();
        // this.displayMessage = {};
        // this.formValidation = new FormValidation(this.authorizationPhysicianAdvisorForm);
        // this.createDataGrid001();
        // this.createDataGrid002();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPhysicianAdvisoryShortcutKeys(this));
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
            // this.getSecColDetails(user);
            // this.userTemplateId = user.dfltTemplate;
            // this.getSecWin(user.dfltTemplate);
        });
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'))
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            // this.dataLoadedMap.set('WINPERMISSION', true);
            return;
        }

        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.dataLoadedMap.set('WINPERMISSION', false);
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                // this.dataLoadedMap.set('WINPERMISSION', true);
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        }, error => {
            this.initializeComponentState();
            // this.dataLoadedMap.set('WINPERMISSION', true);
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationPhysicianAdvisorForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            if (this.dataGrid001GridOptions.api) {
                this.dataGrid001GridOptions.api.setRowData([]);
            }

            if (this.dataGrid002GridOptions.api) {
                this.dataGrid002GridOptions.api.setRowData([]);
            }


         //   this.getAdvisorServices();   // TODO 'need to fix API end point'
        //    this.getAdvisorDecisions();   // TODO  'need to fix API end point'
        //    this.getRecommondationCodes(); // TODO   'need to fix API end point'

            this.dataLoadedMap.set('WINPERMISSION', true);
        });
    }

    getAdvisorServices() {
        this.authCodeService.lookupAuthCode('ST').subscribe(advisorService => {
            this.advisorService = advisorService;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getAdvisorDecisions() {
        this.authCodeService.lookupAuthCode('DC').subscribe(advisorDecision => {
            this.advisorDecision = advisorDecision;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getRecommondationCodes() {
        this.authCodeService.lookupAuthCode('RC').subscribe(recommendationCode => {
            this.recommendationCode = recommendationCode;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationPhysicianAdvisorForm = this.formBuilder.group({
            authNumber: ['', {updateOn: 'blur', validators: []}],
            reqDate: ['', {updateOn: 'blur', validators: []}],
            authType: ['', {updateOn: 'blur', validators: []}],
            leverl: ['', {updateOn: 'blur', validators: []}],
            diamondId: ['', {updateOn: 'blur', validators: []}],
            tplCode: ['', {updateOn: 'blur', validators: []}],
            lob: ['', {updateOn: 'blur', validators: []}],
            privacyMaApply: ['', {updateOn: 'blur', validators: []}],
            memberId: ['', {updateOn: 'blur', validators: []}],
            textbox: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            age: ['', {updateOn: 'blur', validators: []}],
            sex: ['', {updateOn: 'blur', validators: []}],
            groupId: ['', {updateOn: 'blur', validators: []}],
            personNo: ['', {updateOn: 'blur', validators: []}],
            lastName: ['', {updateOn: 'blur', validators: []}],
            firstName: ['', {updateOn: 'blur', validators: []}],
            dynamicText003: ['', {updateOn: 'blur', validators: []}],
            groupShortName: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            nonSysSubscriberId: ['', {updateOn: 'blur', validators: []}],
            certificationType: ['', {updateOn: 'blur', validators: []}],
            paperworkAttachment: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});

        this.physicianAdvisorForm = this.formBuilder.group({
            physAdvisor: ['', {updateOn: 'blur', validators: []}],
            physAdvisorDescription: ['', {updateOn: 'blur', validators: []}],
            type: ['', {updateOn: 'blur', validators: []}],
            nurseRecom: ['', {updateOn: 'blur', validators: []}],
            contactDate: ['', {updateOn: 'blur', validators: []}],
            decisionDate: ['', {updateOn: 'blur', validators: []}],
            specialtyType: ['', {updateOn: 'blur', validators: []}],
            advisorDecision: ['', {updateOn: 'blur', validators: []}],
            advisorService: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}],
        });
    }


    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New'}, {name: 'Open'}, {name: 'Save'}, {name: 'Close'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true}, {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true}, {name: 'Paste', disabled: true}, {isHorizontal: true},
                    {name: 'Lookup'}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'Aradj Post'}, {name: 'Aradj Report By Customer'}
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
                    {isHorizontal: true}, {name: 'Show Timestamp'}, {name: 'Processing Messages'}, {isHorizontal: true},
                    {name: '1 Main Menu'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.handleNewMenuClick();
                    break;
                }
                case 'Open': {
                    //   this.openNew();
                    break;
                }
                case 'Save': {
                    this.saveAuthPhysAdvisor();
                    break;
                }
                case 'Close': {
                    //   if (this.arCashReceiptsForm.dirty) {
                    //     // this.showEditConfirmation();
                    //   } else {
                    //     this.arCashReceiptsForm.reset();
                    //     if (this.dataGridGridOptions.api) {
                    //       this.dataGridGridOptions.api.setRowData([])
                    //     }
                    //   }
                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            // this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            // add method
        }
    }

    handleEditMenu(action: any) {
        switch (action) {
            case 'Undo': {
                //statements;
                break;
            }
            case 'Cut': {
                //statements;
                break;
            }
            case 'Lookup': {
                this.openLookupAuthNumberFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }

    }

    public handleNewMenuClick() {
        this.physicianAdvisorForm.reset();
        this.editAuthPhysAdvisor = false;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    openLookupFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupAuthNumberFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            const authNumber = event.target.value;
            if (authNumber === '') {
                this.emptyDataPopup();
            } else {
                this.getAuthMaster(authNumber);
            }
        }
    }

    openLookupAuthNumberFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.authNumberSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                // console.log(res.AUTH_NUMBER);
                this.authorizationPhysicianAdvisorForm.patchValue({
                    authNumber: res.AUTH_NUMBER
                });
                this.getAuthMaster(res.AUTH_NUMBER);
            }
        });
    }

    openLookupPhysAdvisorFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();

            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.physAdvisorSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                this.seqProvId = res.SEQ_PROV_ID;
                if (res != null) {
                    this.physicianAdvisorForm.patchValue({
                        'physAdvisor': res.PROVIDER_ID,
                        'physAdvisorDescription': res.SHORT_NAME
                    });
                }
            });
        } else if (event.key === 'Tab') {
            event.preventDefault();
            // const authNumber = this.authorizationPhysicianAdvisorForm.value.authNumber;
            // if (authNumber) {
            //     this.getAuthMaster(authNumber);
            // }

        }

    }

    openLookupNurseRecommendFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.nurseRecommendSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.physicianAdvisorForm.patchValue({
                        'nurseRecom': res.AUTH_CODE,
                    });
                }
            });
        } else if (event.key === 'Tab') {
            // event.preventDefault();
            const authNumber = this.authorizationPhysicianAdvisorForm.value.authNumber;
            if (authNumber) {
                this.getAuthMaster(authNumber);
            }

        }

    }

    openLookupAdvisorDecisionFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.advisorDecisionSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.physicianAdvisorForm.patchValue({
                        'advisorDecision': res.AUTH_CODE,
                    });
                }
            });
        } else if (event.key === 'Tab') {
            event.preventDefault();
            // const authNumber = this.authorizationPhysicianAdvisorForm.value.authNumber;
            // if (authNumber) {
            //     this.getAuthMaster(authNumber);
            // }

        }

    }

    openLookupAdvisorServiceFieldSearchModel(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.advisorServiceSearchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.physicianAdvisorForm.patchValue({
                        'advisorService': res.AUTH_CODE,
                    });
                }
            });
        } else if (event.key === 'Tab') {
            event.preventDefault();
            // const authNumber = this.authorizationPhysicianAdvisorForm.value.authNumber;
            // if (authNumber) {
            //     this.getAuthMaster(authNumber);
            // }

        }

    }

    public get isDataLoaded(): boolean {
        // @ts-ignore
        for (let [key, value] of this.dataLoadedMap) {
            if (!value) {
                return value;
            }
        }
        return true;
    }

    grid1SelectionChange() {
        let selectedRow = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRow[0]) {
            this.authMaster = selectedRow[0];
            this.getAuthPhysAdvisor(selectedRow[0].authMasterPrimaryKey.authNumber);
        }
    }

    grid2SelectionChange() {
        let selectedRow = this.dataGrid002GridOptions.api.getSelectedRows();
        this.authPhysAdvisor = selectedRow[0];
        this.editAuthPhysAdvisor = true;
        if (selectedRow[0]) {
            this.seqProvId=selectedRow[0].seqProvId;
            this.physicianAdvisorForm.reset();
            this.physicianAdvisorForm.patchValue({
                'physAdvisor': selectedRow[0].provMasterViewModel?selectedRow[0].provMasterViewModel.providerId:null,
                'nurseRecom': selectedRow[0].recommendationCode,
                'physAdvisorDescription': selectedRow[0].provMasterViewModel?selectedRow[0].provMasterViewModel.shortName:null,
                'type': selectedRow[0].provMasterViewModel?selectedRow[0].provMasterViewModel.providerType:null,
                'contactDate': this.dateFormatPipe.defaultDisplayDateFormat(selectedRow[0].contactDate),
                'decisionDate': this.dateFormatPipe.defaultDisplayDateFormat(selectedRow[0].decisionDate),
                'advisorDecision': selectedRow[0].advisorDecision,
                'advisorService': selectedRow[0].advisorService,
                'specialtyType': selectedRow[0].provMasterViewModel?(selectedRow[0].provMasterViewModel.shortName.charAt(0) === 'D' ? 'DEN': 'GP'):null,
                'comments': selectedRow[0].comments,
            }, {emitEvent: false})
            this.isFormDataModified()
        }
    }

    onNurseRecomfocusOut(event: any) {
        event.preventDefault();
        let filterData = [];
        if (this.recommendationCode && this.recommendationCode.length > 0 && event.target.value !== '') {
            filterData = this.advisorService.filter(data => data.authCode === event.target.value);
        } else if (event.target.value !== '' && (!this.recommendationCode || this.recommendationCode.length === 0 || filterData.length === 0)) {
            this.messageService.findByMessageId(9989).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast('9989: ' + message[0].messageText.replace('@1', event.target.value), NgbToastType.Danger);
            });
        }
    }

    onAdvisorServicefocusOut(event:any) {
        event.preventDefault();
        let filterData = [];
        if (this.advisorService && this.advisorService.length > 0 && event.target.value !== '') {
            filterData = this.advisorService.filter(data => data.authCode === event.target.value);
        } else if (event.target.value !== '' && (!this.advisorService || this.advisorService.length === 0 || filterData.length === 0)) {
            this.messageService.findByMessageId(9989).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast('9989: ' + message[0].messageText.replace('@1', event.target.value), NgbToastType.Danger);
            });
        }
    }

    onAdvisorDecisionfocusOut(event: any) {
        event.preventDefault();
        let filterData = [];
        if (this.advisorDecision && this.advisorDecision.length > 0 && event.target.value !== '') {
            filterData = this.advisorDecision.filter(data => data.authCode === event.target.value);
        } else if (event.target.value !== '' && (!this.advisorDecision || this.advisorDecision.length === 0 || filterData.length === 0)) {
            this.messageService.findByMessageId(9989).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast('9989: ' + message[0].messageText.replace('@1', event.target.value), NgbToastType.Danger);
            });
        }
    }

    closeModal() {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Physician Advisor')
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
                    this.saveAuthPhysAdvisor()
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
        this.authorizationPhysicianAdvisorForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });
        this.physicianAdvisorForm.valueChanges.subscribe(() => {
            this.isFormDataChangeStatus = true;
        })
    }

    emptyDataPopup = () => {
        this.messageService.findByMessageId(9853).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage(
                'popUpMessageName',
                'Authorization Physician Adviser',
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
