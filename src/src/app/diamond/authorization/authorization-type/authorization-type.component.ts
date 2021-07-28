/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {AuthMaster, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {SecurityService} from '../../../shared/services/security.service';
import {AuthTypeMasterService} from '../../../api-services/authorization/auth-type-master.service';
import {AuthTypeDetailService} from '../../../api-services/authorization/auth-type-detail.service';
import {AuthMasterService, DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {AuthTypeMaster} from '../../../api-models/authorization/auth-type-master.model';
import {AuthTypeDetail} from '../../../api-models/authorization/auth-type-detail.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {Form} from '../../../shared/helpers/form.helper';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {AUTHORIZATION_TYPE} from '../../../shared/app-constants';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {geAuthorizationTypeShortcutKeys} from '../../../shared/services/shared.service';
import {TransactionTypeComponent} from './cell-renderers/transaction-type.component';
import {faLevelDownAlt} from '@fortawesome/free-solid-svg-icons';
import {ScreenRankComponent} from './cell-renderers/screen-rank.component';
import {Menu} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';

// Use the Component directive to define the AuthorizationTypeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'authorizationtype',
    templateUrl: './authorization-type.component.html',

})
export class AuthorizationTypeComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = false;

    authorizationTypeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editAuthTypeMaster: boolean;
    authTypeMaster: AuthTypeMaster;
    authTypeMasters: AuthTypeMaster[];
    editAuthTypeDetail: boolean;
    authTypeDetail: AuthTypeDetail;
    authTypeDetails: AuthTypeDetail[];
    editAuthMaster: boolean;
    authMaster: AuthMaster;
    authMasters: AuthMaster[];
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    public memberModuleId = AUTHORIZATION_TYPE;
    inProgress = true;
    showGrid001Form = false;
    public shortcuts: ShortcutInput[] = [];
    transactionTypes: any[] = [];
    faLevel = faLevelDownAlt;
    isFormEditable = false;
    showSubmitButton = true;
    unSavedDataAvailable = false;
    public menu: Menu[] = [];
    private windowId = 'AUTYP';
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    customTable = {
        authType: '',
        description: '',
        requestNextReviewDate : 'N',
        allowNonSystemSubscriberId: 'N',
        authExpUpdFlg: 'N',
        useQuantityMatch: 'N',
        seqAuthType: ''
    };
    bottomTableClickStatus: Boolean = false;
    dataGrid002GridOptionsValue: any[];
    customTableGrid002 = {
        screenRank: ''
    };
    isDuplicatedStatus: Boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private authTypeMasterService: AuthTypeMasterService,
        private authTypeDetailService: AuthTypeDetailService,
        private authMasterService: AuthMasterService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private secUserService: SecUserService) {
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...geAuthorizationTypeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.showGrid001Form = true;
        this.loadDataGridForm001(event.data);
    }

    loadDataGridForm001(eventData: AuthTypeMaster) {
        this.showGrid001Form = true;
        this.authTypeMaster = eventData;
        this.authorizationTypeForm.get('authType').disable();
        this.authorizationTypeForm.patchValue({
            authType: eventData.authType,
            description: eventData.description,
            memberReinstatedOverride: eventData.requestNextReviewDate && eventData.requestNextReviewDate == 'Y',
            familyAffiliationOverride: eventData.allowNonSystemSubscriberId && eventData.allowNonSystemSubscriberId == 'Y',
            autoUpdateAuthEndDate: eventData.authExpUpdFlg && eventData.authExpUpdFlg == 'Y',
            memberReinstatedEvaluate: eventData.useQuantityMatch && eventData.useQuantityMatch == 'Y'
        });

        this.authTypeDetailService.findBySeqAuthType(eventData.seqAuthType).subscribe(response => {
            this.dataGrid002GridOptions.api.setRowData(response);
            this.dataGrid002GridOptionsValue = response;
        });
        this.isFormDataModified();
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

    // authType:
    // description:
    // checkbox001:
    // checkbox002:
    // autoUpdateAuthEndDate:

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    // checkbox003:
    createAuthTypeMaster() {
        this.formValidation.validateForm();
        if (this.authorizationTypeForm.valid) {
            let authTypeMaster = new AuthTypeMaster();
            authTypeMaster.authType = Form.getValue(this.authorizationTypeForm, 'authType');
            authTypeMaster.description = Form.getValue(this.authorizationTypeForm, 'description');
            authTypeMaster.requestNextReviewDate = Form.getValue(this.authorizationTypeForm, 'memberReinstatedOverride') ? 'Y' : 'N';
            authTypeMaster.allowNonSystemSubscriberId = Form.getValue(this.authorizationTypeForm, 'familyAffiliationOverride') ? 'Y' : 'N';
            authTypeMaster.authExpUpdFlg = Form.getValue(this.authorizationTypeForm, 'autoUpdateAuthEndDate') ? 'Y' : 'N';
            authTypeMaster.useQuantityMatch = Form.getValue(this.authorizationTypeForm, 'memberReinstatedEvaluate') ? 'Y' : 'N';
            this.authTypeMasterService.createAuthTypeMaster(authTypeMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                setTimeout(() => {
                    this.alertMessage = this.alertMessageService.close()
                }, 3000);
                this.getAuthTypeMasters(authTypeMaster.authType);
                this.editAuthTypeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    updateAuthTypeMaster() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationTypeForm.valid) {
            let authTypeMaster = new AuthTypeMaster();
            authTypeMaster.seqAuthType = this.authTypeMaster.seqAuthType;
            authTypeMaster.authType = Form.getValue(this.authorizationTypeForm, 'authType');
            authTypeMaster.description = Form.getValue(this.authorizationTypeForm, 'description');
            authTypeMaster.requestNextReviewDate = Form.getValue(this.authorizationTypeForm, 'memberReinstatedOverride') ? 'Y' : 'N';
            authTypeMaster.allowNonSystemSubscriberId = Form.getValue(this.authorizationTypeForm, 'familyAffiliationOverride') ? 'Y' : 'N';
            authTypeMaster.authExpUpdFlg = Form.getValue(this.authorizationTypeForm, 'autoUpdateAuthEndDate') ? 'Y' : 'N';
            authTypeMaster.useQuantityMatch = Form.getValue(this.authorizationTypeForm, 'memberReinstatedEvaluate') ? 'Y' : 'N';
            this.authTypeMasterService.updateAuthTypeMaster(authTypeMaster, authTypeMaster.seqAuthType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.getAuthTypeMasters(authTypeMaster.authType);
                this.editAuthTypeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
        // } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        // }
    }

    saveAuthTypeMaster() {
        if (this.editAuthTypeMaster) {
            this.updateAuthTypeMaster()
        } else {
            this.createAuthTypeMaster();
        }
    }

    deleteAuthTypeMaster(seqAuthType: number) {
        // if (!(this.secWin && this.secWin.hasDeletePermission())) {
        //     this.showPopUp('Not permitted to delete', 'Group Master Security');
        // } else {
        if (undefined != this.authTypeMaster) {
            const popUpMessage = new PopUpMessage(
                'Authorization Type Delete',
                'Authorization Type Delete',
                '29070: Press Yes to delete this record',
                'info',
                [],
                MessageType.WARNING
            );
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.showIcon = true;

            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.authTypeMasterService.deleteAuthTypeMaster(seqAuthType).subscribe(response => {
                        this.getAuthTypeMasters();
                        this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
                    }, error => {
                        this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
                    });
                } else if (resp.name === 'No') {
                    this.activeModal.close();
                }
            });
        } else {
            return;
        }

        // }
    }

    getAuthTypeMaster(seqAuthType: number) {
        this.authTypeMasterService.getAuthTypeMaster(seqAuthType).subscribe(authTypeMaster => {
            this.authTypeMaster = authTypeMaster;
            this.authorizationTypeForm.patchValue({
                'authType': this.authTypeMaster.authType,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getAuthTypeMasters(authType?: string) {
        this.authTypeMasterService.getAuthTypeMasters().subscribe(authTypeMasters => {
            authTypeMasters.sort((a, b) => {
                return a.authType > b.authType ? 1 : -1
            });
            this.authTypeMasters = authTypeMasters;
            this.dataGrid001GridOptions.api.setRowData(authTypeMasters);
            if (authTypeMasters.length > 0) {
                if (authType) {
                    setTimeout(() => {
                        this.dataGrid001GridOptions.api.forEachNode((rowNode1, index) => {
                            if ( rowNode1.data.authType === authType) {
                                this.dataGrid001GridOptions.api.selectNode(rowNode1);
                            }
                        });
                    }, 200);
                } else {
                    this.dataGrid001GridOptions.api.selectNode(this.dataGrid001GridOptions.api.getRenderedNodes()[0]);
                }
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    createUpdateAuthTypeDetail() {
        this.formValidation.validateForm();
        const authTypeDetails: AuthTypeDetail[] = [];
        this.dataGrid002GridOptions.api.forEachNode(function (node) {
            if (node.data.authTypeDetailPrimaryKey.authScreen) {
                authTypeDetails.push(node.data);
            }
        });
        this.authTypeDetailService.createAuthTypeDetailBulk(authTypeDetails, this.authTypeMaster.seqAuthType).subscribe(response => {
            this.unSavedDataAvailable = false;
            this.alertMessage = this.alertMessageService.info('Record successfully created.');
            this.editAuthTypeDetail = false;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
        });
    }

    updateAuthTypeDetail(seqAuthType: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authorizationTypeForm.valid) {
                let authTypeDetail = new AuthTypeDetail();
                this.authTypeDetailService.updateAuthTypeDetail(authTypeDetail, seqAuthType).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editAuthTypeDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveAuthTypeDetail() {
        if (this.editAuthTypeDetail) {
            this.updateAuthTypeDetail(this.authTypeDetail.seqAuthType)
        } else {
            // this.createAuthTypeDetail();
        }
    }

    deleteAuthTypeDetail(seqAuthType: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authTypeDetailService.deleteAuthTypeDetail(seqAuthType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getAuthTypeDetail(seqAuthType: number) {
        this.authTypeDetailService.getAuthTypeDetail(seqAuthType).subscribe(authTypeDetail => {
            this.authTypeDetail = authTypeDetail;
            this.authorizationTypeForm.patchValue({});
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getAuthTypeDetails() {
        this.authTypeDetailService.getAuthTypeDetails().subscribe(authTypeDetails => {
            this.authTypeDetails = authTypeDetails;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    createAuthMaster() {
        this.formValidation.validateForm();
        if (this.authorizationTypeForm.valid) {
            let authMaster = new AuthMaster();
            authMaster.authType = Form.getValue(this.authorizationTypeForm, 'authType');
            authMaster.disposition = Form.getValue(this.authorizationTypeForm, 'description');
            authMaster.datesUserDefinedDate = Form.getValue(this.authorizationTypeForm, 'autoUpdateAuthEndDate');
            this.authMasterService.createAuthMaster(authMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editAuthMaster = false;
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
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    updateAuthMaster(secondaryAuthNo: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authorizationTypeForm.valid) {
                let authMaster = new AuthMaster();
                authMaster.authType = Form.getValue(this.authorizationTypeForm, 'authType');
                authMaster.disposition = Form.getValue(this.authorizationTypeForm, 'description');
                authMaster.datesUserDefinedDate = Form.getValue(this.authorizationTypeForm, 'autoUpdateAuthEndDate');
                this.authMasterService.updateAuthMaster(authMaster, secondaryAuthNo).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editAuthMaster = false;
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
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
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

    getAuthMaster(secondaryAuthNo: string) {
        this.authMasterService.getAuthMaster(secondaryAuthNo).subscribe((authMaster: any) => {
            this.authMaster = authMaster;
            this.authorizationTypeForm.patchValue({
                'authType': this.authMaster.authType,
                'description': this.authMaster.disposition,
                'autoUpdateAuthEndDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.datesUserDefinedDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getAuthMasters() {
        this.authMasterService.getAuthMasters().subscribe(authMasters => {
            this.authMasters = authMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Auth Type',
                field: 'authType',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200
            },
            {
                headerName: 'Req Next Review Date',
                field: 'requestNextReviewDate',
                width: 200
            },
            {
                headerName: 'Allow Non Sys Subs ID',
                field: 'allowNonSystemSubscriberId',
                width: 200
            },
            {
                headerName: 'Auto Update Auth End Date',
                field: 'authExpUpdFlg',
                width: 200
            },
            {
                headerName: 'Use Quantity Match',
                field: 'useQuantityMatch',
                width: 200
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions = {
            paginationPageSize: 50,
            context: {
                componentParent: this
            }
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: 'Rank',
                headerClass: 'text-primary',
                field: 'screenRank',
                width: 400,
                suppressFilter: true,
                editable: true,
                cellRendererFramework: ScreenRankComponent
            },
            {
                headerName: 'Screen',
                headerClass: 'text-primary',
                field: 'authTypeDetailPrimaryKey.authScreen',
                width: 400,
                flex: 1,
                suppressFilter: true,
                cellRendererFramework: TransactionTypeComponent
            }
        ];
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authorizationTypeForm = this.formBuilder.group({
            authType: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}],
            memberReinstatedOverride: ['', {updateOn: 'blur', validators: []}],
            familyAffiliationOverride: ['', {updateOn: 'blur', validators: []}],
            autoUpdateAuthEndDate: ['', {updateOn: 'blur', validators: []}],
            memberReinstatedEvaluate: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
                this.showPopUp('You are not Permitted to view Authorization Type',
                    'Authorization Type')
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

    getTransactionType() {
        this.dddwDtlService.findByColumnNameAndDwname('auth_screen', 'dw_autyp_detail_de').subscribe(
            (type) => {
                this.transactionTypes = type;
            }
        );
    }

    public onChangeTransactionType(rowIndex: number, newValue: string, oldValue: string) {
        let isDuplicate = false;
        this.dataGrid002GridOptions.api.forEachNode(function (node) {
            if (node.rowIndex != rowIndex && node.data.authTypeDetailPrimaryKey.authScreen == newValue) {
                isDuplicate = true;
                return;
            }
        });
        this.isDuplicatedStatus = isDuplicate;
        if (isDuplicate) {
            this.messageService.findByMessageId(9875).subscribe(res => {
                this.showErrorPopUp('duplicateTransactionType', 'Authorization type',
                    '9875: ' + res[0].messageText, 'icon');
            })

        }
        this.isFormDataModified()
    }

    public onChangeScreenType(rowIndex: number, newValue: string, oldValue: string) {
        let isDuplicate = false;
        this.dataGrid002GridOptions.api.forEachNode(function (node) {
            if (node.rowIndex != rowIndex && node.data.screenType == newValue) {
                isDuplicate = true;
                return;
            }
        });
        if (isDuplicate) {
            this.showErrorPopUp('duplicateScreenType', 'Authorization type',
                '7109: A record already exists with this key value, Enter a new value', 'icon');
        }
        this.isFormDataModified()
    }

    saveShortCutAction() {
        if (this.authTypeMaster) {
            this.updateAuthTypeMaster();
        } else {
            const authType = Form.getValue(this.authorizationTypeForm, 'authType');
            if ('' == authType || null == authType && undefined == authType) {
                this.showErrorPopUp('mtAuthorizationType', 'Authorization type',
                    '29032: auth_type is a required field. Enter something other than blanks.', 'icon');
                return;
            }
            this.createAuthTypeMaster();
        }
    }

    createNewShortCutAction() {
        this.authTypeMaster = undefined;
        this.authorizationTypeForm.get('authType').enable();
        this.authorizationTypeForm.patchValue({
            authType: '',
            description: '',
            memberReinstatedOverride: false,
            familyAffiliationOverride: false,
            autoUpdateAuthEndDate: false,
            memberReinstatedEvaluate: false
        });

        this.dataGrid001GridOptions.api.deselectAll();
        let data = [];
        let possible = "1234567890";
        const lengthOfCode = 5;

        let newColumn = {
            authType: '',
            description: '',
            requestNextReviewDate : 'N',
            allowNonSystemSubscriberId: 'N',
            authExpUpdFlg: 'N',
            useQuantityMatch: 'N',
            seqAuthType: this.makeRandom(lengthOfCode, possible)
        };
        for (let item of this.authTypeMasters) {
            data.push(item)
        }
        data.push(newColumn);
        this.dataGrid001GridOptions.api.setRowData(data);
        this.dataGrid002GridOptions.api.setRowData([]);

    }

    public authTypeValueChange(event, value) {
        let isDuplicate = false;
        this.dataGrid001GridOptions.api.forEachNode(function (node) {
            if (node.data.authType == value) {
                isDuplicate = true;
                return;
            }
        });
        if (isDuplicate) {
            this.showErrorPopUp('duplicateAuthorizationType', 'Authorization type',
                '9877: Authorization type ' + value + ' has already been used', 'icon');
        }

        let name = event.srcElement.id;
        let data = [];
        switch (name) {
            case 'authType':
                this.customTable.authType = event.target.value;
                break;
            case 'description':
                this.customTable.description = event.target.value;
                break;
            case 'memberReinstatedOverride':
                this.customTable.requestNextReviewDate = 'Y';
                break;
            case 'familyAffiliationOverride':
                this.customTable.allowNonSystemSubscriberId = 'Y';
                break;
            case 'autoUpdateAuthEndDate':
                this.customTable.authExpUpdFlg = 'Y';
                break;
            case 'memberReinstatedEvaluate':
                this.customTable.useQuantityMatch = 'Y';
                break;
            default:
                break;
        }
        for (let item of this.authTypeMasters) {
            data.push(item)
        }
        data.push(this.customTable);
        this.dataGrid001GridOptions.api.setRowData(data);
    }

    agGridKeyDown($event: KeyboardEvent) {
        console.log($event);
    }

    onSubmitAuthTypeDetails() {
        if (this.isDuplicatedStatus) {

        } else {
            this.createUpdateAuthTypeDetail();
        }
    }

    addNewRow(event) {
        // todo focus column
        if (this.unSavedDataAvailable) {
            const popUpMessage = new PopUpMessage(
                'Authorization Type',
                'Authorization Type',
                '29065: Data has been modified. Press Yes to save the changes',
                'info',
                [],
                MessageType.SUCCESS
            );
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.showIcon = true;

            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.createUpdateAuthTypeDetail();
                } else if (resp.name === 'No') {
                    this.activeModal.close();
                }
                return;
            });
            return;
        } else {
            this.unSavedDataAvailable = true;
            this.dataGrid002GridOptions.api.applyTransaction({
                add: [{
                    securityCode: '0',
                    screenRank: '',
                    authTypeDetailPrimaryKey: {
                        authScreen: null,
                        seqAuthType: this.authTypeMaster.seqAuthType
                    }
                }]
            });
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.newTableCreate();
                    break;
                }
                case 'Delete': {
                    this.deleteAuthTypeMaster(this.authTypeMaster.seqAuthType);
                    break;
                }
                case 'Save': {
                    this.saveShortCutAction();
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
        }
    }

    private showErrorPopUp(name: string, title: string, message: string, icon: string) {
        let popMsg = new PopUpMessage(name, title, message, icon, [new PopUpMessageButton('ok', 'OK',
            'btn btn-primary')], MessageType.ERROR);
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'md'});
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;

    }

    private initializeComponentState(): void {
        this.getTransactionType();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationTypeForm);
        this.menuInit();
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        }, 100);
        this.getAuthTypeMasters();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'Delete'},
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
                    {name: 'Next', disabled: true},
                    {name: 'Previous', disabled: true}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
                ],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
                    {isHorizontal: true}, {name: 'Show Timestamp'}, {isHorizontal: true},
                    {name: '1 Main Menu'}, {name: '2 Authorization Type'}
                ]
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

    tableValueChanged = (value) => {
        this.isFormDataModified();
    };

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Type')
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
                    this.saveShortCutAction()
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
        this.authorizationTypeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });
    }

    makeRandom(lengthOfCode: number, possible: string) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    newTableCreate = () => {
        if (!this.bottomTableClickStatus) {
            this.createNewShortCutAction();
        } else {
            this.createNewShortCutActionBottom()
        }
    };

    createNewShortCutActionBottom = () => {

        let data = [];
        this.dataGrid002GridOptionsValue.map(item => {
            data.push(item)
        });
        data.push(this.customTableGrid002);
        this.dataGrid002GridOptions.api.setRowData(data)
    };

    onGridReady = (parameter) => {
        this.bottomTableClickStatus = true;
    };

    valueGridReady = (event) => {

    }

}
