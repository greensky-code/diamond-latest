/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridApi, GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {DddwDtlService, MessageMasterDtlService, PlanMasterService, SecUserService} from '../../../api-services';
import {SecurityService} from '../../../shared/services/security.service';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {DddwDtl, MessageMasterDtl, SecUser} from '../../../api-models';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {
    DatePickerConfig,
    DatePickerModel,
    gridNoRecordsFoundMessage,
    gridPaginationPageSize,
    NGBModalOptions
} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Menu, OPERATIONS} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {Form} from '../../../shared/helpers/form.helper';
import {PmbSetupService} from '../../../api-services/pmb-setup.service';
import {PmbSetup} from '../../../api-models/pmb-setup.model';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {DatePipe} from '@angular/common';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {pmbSetupScreenShortcutKeys} from '../../../shared/services/shared.service';
import {IMyDateModel} from 'angular-mydatepicker';
import {PMBTemplateIdComponent} from './pmb-templateid.component';
import {SubscriberUpdateComponent} from '../subscriber-update/subscriber-update.component';
import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {PremiumHelpComponent} from "../premium-help/premium-help.component";
import {AuthenticationService} from "../../../api-services/authentication.service";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {MenuService} from "../../../shared/services/menu.service";
import {AuditService} from "../../../shared/services/audit.service";

@Component({
    selector: 'premium-billingsetup',
    templateUrl: './premium-billing-setup.component.html',
    providers: [PlanMasterService, PmbSetupService, DddwDtlService, ToastService, DatePipe],
})
export class PremiumBillingSetupComponent implements OnInit {

    pmpSetupForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    secColDetails = new Array<SecColDetail>();
    private winID = 'GPBIL';
    @Input() showIcon = false;
    private userId: string;
    public isSuperUser = false;
    public secProgress = true;
    editPmbSetup: boolean;
    pmbSetupRecords: PmbSetup[];
    pmbSetup: PmbSetup;
    public pmbSetupGridOptions: GridOptions;
    public pmbSetupGridApi: GridApi;
    public menu: Menu[] = [];
    actions: DddwDtl[] = [];
    statusList: DddwDtl[] = [];
    billingTypes: DddwDtl[] = [];
    billJobTypes: DddwDtl[] = [];
    validateBillingCycleValue: Number = 0;
    public shortcuts: ShortcutInput[] = [];
    shortcutsInput: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    totalRowsCount = 0;
    runJobDisabled = true;

    windowId = 'GPBIL';
    userTemplateId: string;

    currentPage = 0;
    pageSize = gridPaginationPageSize;
    gridData: PmbSetup[] = [];

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private alertMessageService: AlertMessageService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private pmbSetupService: PmbSetupService,
        private dddwDtlService: DddwDtlService,
        private dateFormatPipe: DateFormatPipe,
        private datePipe: DatePipe,
        private authenticationService: AuthenticationService,
        private router: Router,
        private auditService: AuditService,
    ) {
    }

    ngOnInit(): void {
        this.hasPermission();
    }
    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
     }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
     }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
     }
    openWindowMenu() { 
        document.getElementById("fileDropdownWindows").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindows"
    }
    openShortcutKeys() { 
        let obj = {
            menu: {
                menuItem: 'File'
            },
            action: 'Shortcut Menu'
        }
        this.onMenuItemClick(obj)
    }

    triggerMenus(value) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'u':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'SUBSC'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'GPBIL'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == 'fileDropdownWindows') {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Windows'
                            },
                            action: 'Processing Messages'
                        }
                        this.onMenuItemClick(obj);
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
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        this.userId = this.securityService.getCurrentUserToken()? this.securityService.getCurrentUserToken().sub: undefined;
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            },
            (error) => {
                this.secProgress = false;
            });
    }

    /**
     * If user has permission to this page, then start OnInit
     */
    initializeComponentState() {
        this.menuInit();
        this.createForm();
        this.getTotalRowsCount();
        this.createPremiumBillingSetupGrid();
        this.populatePremiumBillingSetupGrid();
        this.dddwDtlService.findByColumnNameAndDwname('action', 'dw_gpbil_picklist').subscribe(dddwDtls => {
            dddwDtls.map(item => {
                if (item.dddwDtlPrimaryKey.displayVal === 'Calc') {
                return item.dddwDtlPrimaryKey.displayVal = 'Calculate'
            }
            })
            this.actions = dddwDtls;
        });
        this.dddwDtlService.findByColumnNameAndDwname('status', 'dw_gpbil_picklist').subscribe(dddwDtls => {
            this.statusList = dddwDtls;
        });
        this.dddwDtlService.findByColumnNameAndDwname('billing_type', 'dw_gpbil_setup').subscribe(dddwDtls => {
            this.billingTypes = dddwDtls;
        });
        this.dddwDtlService.findByColumnNameAndDwname('bill_job_type', 'dw_gpbil_setup').subscribe(dddwDtls => {
            this.billJobTypes = dddwDtls;
        });
        this.pmpSetupForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }


    ngAfterViewInit(): void {
        this.shortcuts.push(...pmbSetupScreenShortcutKeys(this));
        this.cdr.detectChanges();
    }


    getTotalRowsCount() {
        this.pmbSetupService.getPmbSetupsCount().subscribe(count => {
            this.totalRowsCount = count;
        })
    }

    deriveActionNameFromValue(params: any): string {
        let action = this.actions.find(item => item.dddwDtlPrimaryKey.dataVal === params.data.action);
        return action ? action.dddwDtlPrimaryKey.displayVal : '';
    }

    deriveStatusDescriptionFromValue(params: any): string {
        return this.fetchStatusDescriptionFromValue(params.data.status);
    }

    fetchStatusDescriptionFromValue(statusValue: string): string {
        let status = this.statusList.find(action => action.dddwDtlPrimaryKey.dataVal === statusValue);
        return status ? status.dddwDtlPrimaryKey.displayVal : '';
    }

    fetchBillingTypeDescriptionFromValue(billingTypeValue: string): string {
        let billingType = this.billingTypes.find(action => action.dddwDtlPrimaryKey.dataVal === billingTypeValue);
        return billingType ? billingType.dddwDtlPrimaryKey.displayVal : '';
    }

    formatGridDates(params: any): string {
        return this.datePipe.transform(params.value, 'MM/dd/yyyy');
    }

    setGridData(data) {
        if (!data) {
            return;
        }
        this.pmbSetupGridOptions.api.setRowData(data.filter(function (e) {
            let subscFlag = e.subscFlag ? e.subscFlag : 'N';
            return e.template == 'N' && subscFlag == 'N';
        }));
        this.pmbSetupGridOptions.api.selectIndex(0, false, null);
    }

    public onGridReady($event): void {
        this.pmbSetupGridOptions.api.showLoadingOverlay();
        this.pmbSetupGridOptions.api.selectIndex(0, false, false);
        // -------------------------------------------- Pagination
        const docsE: any = document.querySelectorAll('.customClass .ag-layout-normal .ag-paging-panel .ag-paging-page-summary-panel');
        const elements = docsE[0].getElementsByClassName('ag-paging-button');
        elements[3].addEventListener('click', this.nextPageCall, null)                          // page next button
    }


    nextPageCall = () => {
        this.nextPage();
    }
    prevPageCall = () => {
        this.prevPage();
    }

    nextPage() {
        const nextPage = Math.trunc((this.gridData.length) / this.pageSize);
        if (this.gridData.length === this.totalRowsCount || this.gridData.length > this.totalRowsCount) {
            this.showPopUp(gridNoRecordsFoundMessage, 'Premium Billing');
            return;
        }
        this.pmbSetupService.getPmbSetups(true, nextPage, this.pageSize).subscribe((pmbSetupRecords: PmbSetup[]) => {
            this.pmbSetupRecords = pmbSetupRecords;

            this.gridData = [...this.gridData, ...pmbSetupRecords];

            if (!this.gridData) {
                return;
            }
            this.setGridData(this.gridData);
            this.currentPage = nextPage;
            this.pmbSetupGridOptions.api.paginationGoToPage(this.currentPage);
        }, error => {
            this.showPopUp(error, 'Premium billing');
        });

    }

    showPopUp(message: string, title: string, button = 'Ok') {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton(button, button, 'btn btn-primary'),];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    prevPage() {
        this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 0;
        this.pmbSetupGridOptions.api.paginationGoToPage(this.currentPage);

    }

    createPremiumBillingSetupGrid(): void {
        this.pmbSetupGridOptions = {
            paginationPageSize: this.pageSize,
        };
        this.pmbSetupGridOptions.editType = 'fullRow';
        this.pmbSetupGridOptions.columnDefs = [
            {
                headerName: 'Job ID',
                field: 'jobId',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            }, {
                headerName: 'Request Date',
                field: 'requestDate',
                width: 150,
                valueFormatter: this.formatGridDates.bind(this)
            }, {
                headerName: 'Action',
                field: 'action',
                width: 150,
                valueGetter: this.deriveActionNameFromValue.bind(this)
            }, {
                headerName: 'Cycle',
                field: 'billingCycle',
                width: 150
            }, {
                headerName: 'Bill Thru Req. Dt.',
                field: 'billThruRequestDate',
                width: 150,
                valueFormatter: this.formatGridDates.bind(this)
            }, {
                headerName: 'Post Date',
                field: 'postDate',
                width: 150,
                valueFormatter: this.formatGridDates.bind(this)
            }, {
                headerName: 'Status',
                field: 'status',
                width: 150,
                valueGetter: this.deriveStatusDescriptionFromValue.bind(this)
            }];
        this.pmbSetupGridOptions.getRowNodeId = function (data) {
            return data.jobId;
        };
    }

    populatePremiumBillingSetupGrid(): void {
        this.pmbSetupService.getPmbSetups(true, this.currentPage, this.pageSize).subscribe((pmbSetupRecords: PmbSetup[]) => {
                if (pmbSetupRecords) {
                    this.pmbSetupRecords = pmbSetupRecords;
                    this.gridData = pmbSetupRecords;
                    this.setGridData(this.gridData);
                } else {
                    this.pmbSetupRecords = [];
                }
            },
            (error) => {
                this.toastService.showToast('Error while loading Premium Bill Setup grid.', NgbToastType.Danger);
            });
    }

    populatePmbSeupFormFields(event: any) {
        this.validateBillingCycleValue = -1;
        this.pmpSetupForm.reset();
        let selectdata = event.api.getSelectedRows()[0];
        if(selectdata.status !== 'C') {
            this.runJobDisabled = false;
            this.menuInit();
        } else {
            this.runJobDisabled = true;
            this.menuInit();
        }
        if (selectdata) {
            this.pmbSetup = selectdata;
            this.populateForm(this.pmbSetup);
            this.editPmbSetup = true;
        }
    }

    createForm() {
        this.pmpSetupForm = this.formBuilder.group({
            seqGpbilId: ['', {updateOn: 'blur', validators: []}],
            jobId: ['', {updateOn: 'blur', validators: []}],
            requestUser: ['', {updateOn: 'blur', validators: []}],
            date: ['', {updateOn: 'blur', validators: []}],
            billingCycle: ['', {updateOn: 'blur', validators: []}],
            billThruRequestDate: ['', {updateOn: 'blur', validators: []}],
            billingType: ['', {updateOn: 'blur', validators: []}],
            postMonth: ['', {updateOn: 'blur', validators: []}],
            billJobType: ['', {updateOn: 'blur', validators: []}],
            nextAction: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}],
            statusDescription: ['', {updateOn: 'blur', validators: []}],
            requestType: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
        });
        this.formValidation = new FormValidation(this.pmpSetupForm);
    }

    resetFormFieldsToCreateNewRecord() {
        this.editPmbSetup = false;
        this.validateBillingCycleValue = -1;
        this.enableFields();
        this.pmpSetupForm.reset();
        this.pmbSetup = new PmbSetup();
        this.pmbSetupService.getNextJobId().subscribe((id: string) => {
            this.pmbSetup.jobId = id;
            this.pmbSetup.requestUser = this.userId;
            this.pmbSetup.requestDate = new Date();
            this.pmbSetup.status = 'N';
            this.pmbSetup.requestType = 'I';
            this.pmbSetup.action = 'L';
            this.pmbSetup.postDate = new Date();
            this.populateForm(this.pmbSetup);
            this.pmbSetupGridOptions.api.applyTransaction({add: [this.pmbSetup]});
            let rowIndex;
            this.pmbSetupGridOptions.api.forEachNode(function (node) {
                node.setSelected(node.data.jobId === id);
                if (node.isSelected()) {
                    rowIndex = node.rowIndex;
                }
            });
            this.pmbSetupGridOptions.api.ensureIndexVisible(rowIndex);
        });
    }

    isRecordUpdate(): boolean {
        let seqGpbilId = Form.getValue(this.pmpSetupForm, 'seqGpbilId');
        return !!seqGpbilId;

    }

    savePmpSetupRecord() {
        if (this.validatePremiumBillSetUpData()) {
            if (this.isRecordUpdate()) {
                this.updatePmpRecord();
            } else {
                this.createPmpRecord();
            }
        }
    }

    saveErroredPmpSetupRecord() {
        this.updatePmpRecord();
    }

    saveAsTemplate() {
        if (this.isRecordUpdate()) {
            const ref = this.modalService.open(PMBTemplateIdComponent, {backdrop: 'static', size: 'sm', windowClass: 'pmbTemplteId'});
            ref.componentInstance.pmbSetupRecords = this.pmbSetupRecords;
            ref.componentInstance.jobId = this.pmbSetup.jobId;
            ref.componentInstance.seqGpbilId = this.pmbSetup.seqGpbilId;
            ref.componentInstance.comments = this.pmbSetup.comments;
        }
    }

    deletePmpSetupRecord() {
        let selectedData = this.pmbSetupGridOptions.api.getSelectedRows();
        if (selectedData && this.secWin.hasDeletePermission()) {
            let seqGpbilId = selectedData[0].seqGpbilId;
            this.pmbSetupService.deletePmbSetup(seqGpbilId).subscribe(
                () => {
                    this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                    this.pmbSetupGridOptions.api.applyTransaction({remove: selectedData});
                    let index = this.pmbSetupRecords.findIndex(d => d.seqGpbilId === seqGpbilId); // find index in your array
                    this.pmbSetupRecords.splice(index, 1); // remove element from array
                }
            );
        } else if (this.secWin.hasDeletePermission() === false) {
            this.alertMessage = this.alertMessageService.error('User is not permitted to delete a new Premium Bill Setup record');
        }
    }

    createPmpRecord() {
        this.formValidation.validateForm();
        if (this.pmpSetupForm.valid && this.secWin.hasInsertPermission()) {
            let pmbSetup = this.populateModel();
            this.auditService.setAuditFields(
                pmbSetup,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.ADD
            );
            this.pmbSetupService.createPmbSetup(pmbSetup).subscribe(
                (pmb) => {
                    this.alertMessage = this.alertMessageService.info('Premium Bill Setup Record successfully Created.');
                    this.pmbSetupRecords.push(pmb);
                    this.pmbSetupGridOptions.api.applyTransaction({update: [pmb]});
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.popupClose = false;
                },
                () => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while Creating new Premium Bill Setup record. Please check your entry.');
                }
            );
        } else if (this.pmpSetupForm.valid && this.secWin.hasInsertPermission() === false) {
            this.alertMessage = this.alertMessageService.error('User is not permitted to create a new Premium Bill Setup record');
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updatePmpRecord() {
        this.formValidation.validateForm();
        if (this.pmpSetupForm.valid) {
            let pmbSetup = this.populateModel();
            let seqGpbilId = Form.getValue(this.pmpSetupForm, 'seqGpbilId');
            this.auditService.setAuditFields(
                pmbSetup,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.UPDATE
            );
            this.pmbSetupService.updatePmbSetup(pmbSetup, seqGpbilId).subscribe(
                () => {
                    this.alertMessage = this.alertMessageService.info('Premium Bill Setup Record successfully Updated.');
                    this.populatePremiumBillingSetupGrid();
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.popupClose = false;
                },
                () => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while Updating new Premium Bill Setup record. Please check your entry.');
                }
            );
        } else if (this.pmpSetupForm.valid && this.secWin.hasUpdatePermission() === false) {
            this.alertMessage = this.alertMessageService.error('User is not permitted to create a update Premium Bill Setup record');
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    populateModel(): PmbSetup {
        let pmbSetup = new PmbSetup();
        pmbSetup.jobId = Form.getValue(this.pmpSetupForm, 'jobId');
        pmbSetup.requestUser = this.userId;
        pmbSetup.requestDate = new Date();
        pmbSetup.billingCycle = Form.getValue(this.pmpSetupForm, 'billingCycle');
        let billThruRequestDate = Form.getValue(this.pmpSetupForm, 'billThruRequestDate');
        if (billThruRequestDate) {
            pmbSetup.billThruRequestDate = billThruRequestDate.singleDate.jsDate;
            pmbSetup.postDate = billThruRequestDate.singleDate.jsDate;
        }
        pmbSetup.template = 'N';
        pmbSetup.billingType = Form.getValue(this.pmpSetupForm, 'billingType');
        pmbSetup.jobId = Form.getValue(this.pmpSetupForm, 'jobId');
        pmbSetup.billJobType = Form.getValue(this.pmpSetupForm, 'billJobType');
        pmbSetup.action = Form.getValue(this.pmpSetupForm, 'nextAction');
        pmbSetup.status = Form.getValue(this.pmpSetupForm, 'status');
        pmbSetup.requestType = Form.getValue(this.pmpSetupForm, 'requestType');
        pmbSetup.comments = Form.getValue(this.pmpSetupForm, 'comments');
        if(pmbSetup.status !== 'C') {
            this.runJobDisabled = false;
            this.menuInit();
        } else {
            this.runJobDisabled = true;
            this.menuInit();
        }
        return pmbSetup;
    }

    populateForm(pmbSetup: PmbSetup) {
        this.enableFields();
        let billThruRequestDate: IMyDateModel = {
            isRange: false,
            singleDate: {jsDate: new Date(pmbSetup.billThruRequestDate)},
            dateRange: null
        };

        this.pmpSetupForm.patchValue({
            seqGpbilId: pmbSetup.seqGpbilId,
            jobId: pmbSetup.jobId,
            requestUser: pmbSetup.requestUser,
            date: this.dateFormatPipe.defaultDisplayDateFormat(pmbSetup.requestDate),
            billingCycle: pmbSetup.billingCycle,
            billThruRequestDate: billThruRequestDate,
            billingType: pmbSetup.billingType,
            postMonth: this.dateFormatPipe.defaultDisplayDateFormat(pmbSetup.postDate),
            billJobType: pmbSetup.billJobType,
            nextAction: pmbSetup.action,
            statusDescription: this.fetchStatusDescriptionFromValue(pmbSetup.status),
            status: pmbSetup.status,
            requestType: pmbSetup.requestType,
            comments: pmbSetup.comments
        });
        if (pmbSetup.status === 'C' || pmbSetup.status == 'P' || pmbSetup.status == 'L') {
            this.disableFields();
        } else {
            this.enableFields();
        }
    }

    enableFields() {
        this.pmpSetupForm.get('billingType').enable();
        this.pmpSetupForm.get('billingCycle').enable();
        this.pmpSetupForm.get('billJobType').enable();
        this.pmpSetupForm.get('billThruRequestDate').enable();
        this.pmpSetupForm.get('postMonth').enable();
        this.pmpSetupForm.get('requestType').enable();
    }

    disableFields() {
        this.pmpSetupForm.get('billingType').disable();
        this.pmpSetupForm.get('billingCycle').disable();
        this.pmpSetupForm.get('billJobType').disable();
        this.pmpSetupForm.get('billThruRequestDate').disable();
        this.pmpSetupForm.get('postMonth').disable();
        this.pmpSetupForm.get('requestType').disable();
    }

    showErrorMessage(errorId: number, messageArgs: string[] = []) {
        this.messageService.findByMessageId(errorId).subscribe(msg => {
            let errorMessage = msg[0].messageText;
            var index;
            for (index = 1; index < messageArgs.length + 1; ++index) {
                errorMessage = errorMessage.replace('@' + index, messageArgs[index - 1]);
            }
            this.alertMessage = this.alertMessageService.error('\'' + errorId + '\':' + errorMessage);
        });
    }

    validatePremiumBillSetUpData() {
        let currentDate = new Date();
        let isNewRecord = !this.isRecordUpdate();
        let postMonth = Form.getValue(this.pmpSetupForm, 'postMonth');

        if (isNewRecord || postMonth !== this.datePipe.transform(this.pmbSetup.postDate, 'MM/yyyy')) {
            let currentDateMMYYYY = this.datePipe.transform(currentDate, 'MM/yyyy');
            let nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
            if (postMonth != currentDateMMYYYY && postMonth != this.datePipe.transform(nextMonthDate, 'MM/yyyy')) {
                this.alertMessage = this.alertMessageService.error('Post Date(' + postMonth + ') Month must be current month or the current month + 1');
                return false;
            }
        }
        let status = Form.getValue(this.pmpSetupForm, 'status');
        let nextAction = Form.getValue(this.pmpSetupForm, 'nextAction');
        let requestType = Form.getValue(this.pmpSetupForm, 'requestType');
        let billJobType = Form.getValue(this.pmpSetupForm, 'billJobType');
        let billingType = Form.getValue(this.pmpSetupForm, 'billingType');
        let billingCycle = Form.getValue(this.pmpSetupForm, 'billingCycle');
        let billThruRequestDate = Form.getValue(this.pmpSetupForm, 'billThruRequestDate');
        if (isNewRecord || nextAction !== this.pmbSetup.action) {
            if (status === 'N' && nextAction === 'P') {
                this.showErrorMessage(1020);
                return false;
            }
            if (status === 'T' && nextAction === 'L') {
                this.showErrorMessage(1021);
                return false;
            }
            if (status === 'T' && !postMonth) {
                this.showErrorMessage(1022);
                return false;
            }
            if (status === 'E' && nextAction !== 'C') {
                this.showErrorMessage(1023);
                return false;
            }
            if (status === 'E' && (this.pmbSetup.action === 'L' || this.pmbSetup.action === 'C') && nextAction !== 'C') {
                this.showErrorMessage(1270);
                return false;
            }
            if (status === 'E' && this.pmbSetup.action === 'P' && nextAction === 'L') {
                this.showErrorMessage(1271);
                return false;
            }
            if (status === 'L' && this.pmbSetup.action !== 'P' && nextAction !== 'C') {
                this.showErrorMessage(1271);
                return false;
            }
        }
        if (isNewRecord || billThruRequestDate.singleDate.jsDate.getTime() != new Date(this.pmbSetup.billThruRequestDate).getTime()) {
            let maxBillThruRequestDate = this.getMaxBillThruRequestDate(billingCycle, billingType);
            if (maxBillThruRequestDate) {
                if (billJobType === 'S' && billThruRequestDate.singleDate.jsDate.getTime() !== maxBillThruRequestDate.getTime()) {
                    var messageArgs = [this.datePipe.transform(maxBillThruRequestDate, 'MM/dd/yyyy'), billingCycle, this.fetchBillingTypeDescriptionFromValue(billingType)];
                    this.showErrorMessage(1265, messageArgs);
                    return false;
                }
            }
            if (isNewRecord || billingCycle != this.pmbSetup.billingCycle) {
                let calErrorJobsForSelectedBillCycle = this.pmbSetupRecords.filter(function (e) {
                    return e.billingCycle == billingCycle && (e.status === 'L' || e.status === 'E');
                });
                if (calErrorJobsForSelectedBillCycle && calErrorJobsForSelectedBillCycle.length > 0) {
                    this.showErrorMessage(1026);
                    return false;
                }
            }
            if (isNewRecord || billThruRequestDate.singleDate.jsDate.getTime() !== new Date(this.pmbSetup.billThruRequestDate).getTime()) {
                let maxBillThruRequestDate = this.getMaxBillThruRequestDate(billingCycle, billingType);
                if (maxBillThruRequestDate) {
                    if (billJobType === 'S' && billThruRequestDate.singleDate.jsDate.getTime() != maxBillThruRequestDate.getTime()) {
                        this.showErrorMessage(1265);
                        return false;
                    }
                    if (maxBillThruRequestDate && billJobType === 'R' && billThruRequestDate.singleDate.jsDate <= maxBillThruRequestDate) {
                        this.showErrorMessage(1266);
                        return false;
                    }
                    if (this.validateBillingCycleValue === 1) {
                        this.showErrorMessage(90043);
                        return false;
                    } else if (this.validateBillingCycleValue === 2) {
                        this.showErrorMessage(90044);
                        return false;
                    }
                }
            }
            if (isNewRecord || billJobType !== this.pmbSetup.billJobType) {
                if (billJobType === 'S') {
                    let regularBillJobTypeRecordsForSelectedBillCyleAndType = this.pmbSetupRecords.filter(function (e) {
                        return e.billJobType === 'R' && e.billingCycle === billingCycle && e.billingType === billingType
                    });
                    if (regularBillJobTypeRecordsForSelectedBillCyleAndType && regularBillJobTypeRecordsForSelectedBillCyleAndType.length > 0) {
                        this.showErrorMessage(1027);
                        return false;
                    }
                }
                if (this.unPostedOrNonCancelledJobExists(billingCycle, billingType)) {
                    this.showErrorMessage(1028);
                    return false;
                }
            }
            return true;
        }
    }

    validateBillingCycle($event) {
        let billJobType = Form.getValue(this.pmpSetupForm, 'billJobType');
        let billingType = Form.getValue(this.pmpSetupForm, 'billingType');
        let billingCycle = Form.getValue(this.pmpSetupForm, 'billingCycle');
        let billThruRequestDate = Form.getValue(this.pmpSetupForm, 'billThruRequestDate');
        if (billJobType && billingType && billingCycle && billThruRequestDate) {
            this.pmbSetupService.validateBillingCycle(billingCycle, billingType, billJobType,
                this.datePipe.transform(billThruRequestDate.singleDate.jsDate, 'yyyy-MM-dd')).subscribe((num: Number) => {
                this.validateBillingCycleValue = num;
            });
        }
        this.pmpSetupForm.get('postMonth').setValue(($event.singleDate.date.month < 10? '0' + $event.singleDate.date.month:
            $event.singleDate.date.month) + '/' + $event.singleDate.date.year);
    }

    getMaxBillThruRequestDate(billingCycle: string, billingType: string): Date {
        let recordsFilteredToExtractMaxBillThruReqDate = this.pmbSetupRecords.filter(function (e) {
            return e.billJobType === 'R' && e.billingCycle === billingCycle && e.billingType == billingType
                && (e.status === 'P' || e.status === 'L');
        });
        let maxBillThruRequestDate = new Date(Math.max.apply(null, recordsFilteredToExtractMaxBillThruReqDate.map(function (e) {
            return new Date(e.billThruRequestDate);
        })));
        return maxBillThruRequestDate;
    }

    unPostedOrNonCancelledJobExists(billingCycle: string, billingType: string): boolean {
        let recordsFilteredToExtractMaxBillThruReqDate = this.pmbSetupRecords.filter(function (e) {
            return e.billingCycle == billingCycle && e.billingType == billingType;
        });
        let maxRequestDate = new Date(Math.max.apply(null, recordsFilteredToExtractMaxBillThruReqDate.map(function (e) {
            return new Date(e.requestDate);
        })));
        if (maxRequestDate) {
            let unpostedUncalcelledJobs = this.pmbSetupRecords.filter(function (e) {
                let requestDate = new Date(e.requestDate);
                return e.billingCycle === billingCycle && e.billingType == billingType && requestDate.getTime() == maxRequestDate.getTime()
                    && e.status != 'P' && e.status !== 'C';
            });
            return unpostedUncalcelledJobs && unpostedUncalcelledJobs.length > 0 ? true : false;
        }
        return false;
    }

    exportPremiumBillingSetupGridRecords() {
        this.pmbSetupGridApi.exportDataAsCsv({});
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: "New", shortcutKey: "Ctrl+M",},
                    {name: 'New from Template'},
                    { name: "Open", shortcutKey: "Ctrl+O" },
                    {name: "Save As Template", shortcutKey: "Ctrl+S",},
                    { name: "Close", shortcutKey: "Ctrl+F4" },
                    { isHorizontal: true },
                    { name: "Main Menu...", shortcutKey: "F2" },
                    { name: "Shortcut Menu...", shortcutKey: "F3" },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: "Alt+F4" },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                    { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                    { name: "Paste", shortcutKey: "Ctrl+V" },
                    { isHorizontal: true },
                    { name: "Next", shortcutKey: "F8" },
                    { name: "Previous", shortcutKey: "F7" },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'GPBIL', disabled: true},
                    {name: 'SUBSC'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift+Alt+P'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Premium Billing Setup'}
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetFormFieldsToCreateNewRecord();
                    break;
                }
                case 'Open': {
                    break;
                }
                case 'Save As Template': {
                    this.savePmpSetupRecord();
                    break;
                }
                case 'Close': {
                    this.closeScreen();
                    break;
                }
                case 'Delete': {
                    this.deletePmpSetupRecord();
                    break;
                }
                case 'Run Job': {
                    if(Form.getValue(this.pmpSetupForm, 'nextAction') !== 'C' && this.pmbSetup.status === 'E') {
                        this.popupErrorAlert("1017: Action can only be Cancel for a job with Error status.", 'Premium Billing Setup')
                    } else if(Form.getValue(this.pmpSetupForm, 'nextAction') === 'C' && this.pmbSetup.status === 'E') {
                        this.saveErroredPmpSetupRecord();
                    } else {
                        this.savePmpSetupRecord();
                    }
                    break;
                }
                case 'Exit': {
                   this.exitScreen();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
        } // handle Edit-Menu Actions
        else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
        } // handle Topic-Menu Actions
        else if (event.menu.menuItem === 'Special') {
        } // handle special-Menu Actions
        else if (event.menu.menuItem === 'Windows') {
            this.handleWindowsMenu(event.action);
        } else if (event.menu.menuItem === 'Help') {
            this.handleHelpMenu(event.action);
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case 'SUBSC': {
                const ref = this.modalService.open(SubscriberUpdateComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                this.activeModal.close();
                break;
            }
            case 'GPBIL': {
                const ref = this.modalService.open(PremiumBillingSetupComponent, {
                    size : <any>'xl'
                });
                ref.componentInstance.showIcon = true;
                this.activeModal.close();
                break;
            }
        }
    }

    private handleWindowsMenu(action: string) {
        switch (action) {
            case 'Show Timestamp': {
                if (this.pmpSetupForm.get('jobId').value) {
                    this.showTimestamp();
                } else {
                    this.messageService.findByMessageId(21127).subscribe(res => {
                        this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                    })
                }
                break;
            } case 'Processing Messages': {
                this.toastService.showToast('Action was not implemented', NgbToastType.Danger)
            }
        }
    }

    private handleHelpMenu(action: string) {
        switch (action) {
            case 'Contents': {
                this.handleHelpScreen();
                break;
            }
            case 'Search for Help on...': {
                this.handleHelpScreen();
                break;
            }
            case 'This Window': {
                this.handleHelpScreen();
                break;
            }
            case 'Glossary': {
                this.handleHelpScreen();
                break;
            }
            case 'Getting Started': {
                this.handleHelpScreen();
                break;
            }
            case 'How to use Help': {
                this.handleHelpScreen();
                break;
            }
            case 'About Diamond Client/Server': {
                this.handleHelpScreen();
                break;
            }
        }
    }

    getNextJobGroupId(): string {
        let nextJobId: string;
        this.pmbSetupService.getNextJobId().toPromise()
            .then((id: string) => {
                nextJobId = id;
            }, (error) => {
                console.log(error);
            });
        return nextJobId;
    }


    modalClose = () => {
        this.closeStatus = true;
        if (this.pmpSetupForm.dirty && this.popupClose) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Premium Billing Setup')
            })
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
                    this.savePmpSetupRecord()
                } else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    popupErrorAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'OK') {
                    //this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    handleHelpScreen = () => {
        const modalRef = this.modalService.open(PremiumHelpComponent, {
            windowClass: "myCustomModalClass",
            ...NGBModalOptions,
        });
        modalRef.componentInstance.currentWin = "GPBIL_Premium_Billing.htm";
    };

    closeScreen = () => {
        this.activeModal.close()
    }

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
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    this.authenticationService.logout();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    showTimestamp = () => {
        const ref = this.modalService.open(TimestampComponent, {
            size: <any>'xl',
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.title = "Premium Billing Setup";

        ref.componentInstance.insertDateTime = this.pmbSetup.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.pmbSetup.insertProcess;
        ref.componentInstance.insertUser = this.pmbSetup.insertUser;
        ref.componentInstance.updateUser = this.pmbSetup.updateUser;
        ref.componentInstance.updateDateTime = this.pmbSetup.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.pmbSetup.updateProcess;
    }

}
