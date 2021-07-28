/* Copyright (c) 2021 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { MessageMasterDtl, SecUser, SecWin } from '../../../api-models';
import { CheckClearVoidSetup } from '../../../api-models/ap/check-clear-void-setup.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { DddwDtlService, MessageMasterDtlService, SecUserService } from '../../../api-services';
import { CheckClearVoidSetupService } from '../../../api-services/ap/check-clear-void-setup.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { ClearVoidStopUpdateLookup } from '../../../shared/lookup/clear-void-stop-update-lookup';
import { Menu, SearchModel } from '../../../shared/models/models';
import { SecurityService } from '../../../shared/services/security.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {AUTHENTICATED_USER, AuthenticationService, ACCESS_TOKEN, REFRESH_TOKEN} from '../../../api-services/authentication.service';
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {ApHelpComponent} from "../ap-help/ap-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {clearVoidStopUpdateShortcutKeys, getCheckPrintSetupShortcutKeys} from "../../../shared/services/shared.service";

// Use the Component directive to define the ClearVoidStopUpdateComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'clearvoidstopupdate',
    templateUrl: './clear-void-stop-update.component.html',
    providers: [DatePipe]
})

export class ClearVoidStopUpdateComponent implements OnInit {

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    clearVoidStopUpdateForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public editEntry: boolean;
    public isSuperUser = false;
    public secProgress = true;

    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    public menu: Menu[] = [];
    public statusTypes: any[];

    editCheckClearVoidSetup: boolean;
    checkClearVoidSetup: CheckClearVoidSetup;
    checkClearVoidSetups: CheckClearVoidSetup[];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    rowSelection = 'single';

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;

    searchModel = new SearchModel(
        'checkclearvoidsetups/lookup',
        ClearVoidStopUpdateLookup.LOOKUP_DEFAULT,
        ClearVoidStopUpdateLookup.LOOKUP_DEFAULT,
        []
    );
    public shortcuts: ShortcutInput[] = [];

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private alertMessageService: AlertMessageService,
        private secWinService: SecWinService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private checkClearVoidSetupService: CheckClearVoidSetupService,
        private authenticationService: AuthenticationService,
        private dateFormatPipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private dddwDtlService: DddwDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.getStatus();
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.clearVoidStopUpdateForm);
        this.createDataGrid();
    }

    getStatus() {
        this.dddwDtlService.findActionStatusTypes('dw_cvsup_picklist', 'status', 0).subscribe((res: any) => {
            this.statusTypes = res;
        });
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

    createCheckClearVoidSetup() {
        this.formValidation.validateForm();
        if (this.clearVoidStopUpdateForm.valid) {
            let checkClearVoidSetup = new CheckClearVoidSetup();
            checkClearVoidSetup.comments = Form.getValue(this.clearVoidStopUpdateForm, 'comments');
            checkClearVoidSetup.jobId = Form.getValue(this.clearVoidStopUpdateForm, 'jobId');
            checkClearVoidSetup.requestUser = Form.getValue(this.clearVoidStopUpdateForm, 'reqUser');
            checkClearVoidSetup.requestDate = Form.getDatePickerValue(this.clearVoidStopUpdateForm, 'runDate');
            checkClearVoidSetup.action = 'R';
            checkClearVoidSetup.status = this.statusTypes.find(statusType => statusType.value == Form.getValue(this.clearVoidStopUpdateForm, 'status')).key;
            checkClearVoidSetup.daemonRequest = Form.getValue(this.clearVoidStopUpdateForm, 'daemonrequest');
            checkClearVoidSetup.seqCvsupId = 41;
            this.checkClearVoidSetupService.createCheckClearVoidSetup(checkClearVoidSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editCheckClearVoidSetup = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
                setTimeout(() => {
                    this.alertMessage.show = false;
                }, 2000);
                this.getCheckClearVoidSetups();
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: "New", shortcutKey: 'Ctrl + N'},
                    { name: "Run Job", shortcutKey: 'Ctrl + J'},
                    { name: "Close", shortcutKey: 'Ctrl + F4' },
                    { isHorizontal: true},
                    { name: "Main Menu...", shortcutKey: 'F2' },
                    { name: "Shortcut Menu...", shortcutKey: 'F3'},
                    { isHorizontal: true},
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit" },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', shortcutKey: 'Ctrl + Z', disabled: true},
                    { isHorizontal: true},
                    { name : 'Cut', shortcutKey: 'Ctrl + X', disabled: true},
                    { name : 'Copy', shortcutKey: 'Ctrl + C', disabled: true},
                    { name : 'Paste', shortcutKey: 'Ctrl + V'},
                    { isHorizontal: true},
                    { name: 'Next', shortcutKey: 'F8'},
                    { name : 'Previous', shortcutKey: 'F7'},
                    { isHorizontal: true }
                ]
            },
            {
                menuItem: "Notes",
                dropdownItems: [
                    { name: "Notes", shortcutKey: 'F4', disabled: true },
                ],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Tile", shortcutKey: 'Shift + Alt + T' },
                    { name: "Layer", shortcutKey: 'Shift + Alt + L' },
                    { name: "Cascade", shortcutKey: 'Shift + Alt + C' },
                    { name: "Arrange Icons", shortcutKey: 'Shift + Alt + I' },
                    { isHorizontal: true },
                    { name: "Show Timestamp", shortcutKey: 'Shift + Alt + S' },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Clear, Void, Stop Update" },
                    { name : '3 Clear, Void, Stop Update'}
                ],
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createForm(false);
                    break;
                }
                case "Run Job": {
                    this.saveEntry();
                    break;
                }
                case "Close": {
                    this.clearVoidStopUpdateForm.reset();
                    break;
                }
                case "Shortcut Menu": {
                    // const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    // ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions

        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            switch (event.action) {
                case "Copy": {
                    break;
                }
            }
        }  else if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }
    }

    updateEntry(entryCode: string) {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) {
            this.formValidation.validateForm();
            if (this.clearVoidStopUpdateForm.valid) {
                this.updateCheckClearVoidSetup(entryCode);
                this.editEntry = false;
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveEntry() {
        if (this.editEntry) {
            this.updateCheckClearVoidSetup(this.clearVoidStopUpdateForm.value.lineOfBusiness);
        } else {
            this.createCheckClearVoidSetup();
        }
    }

    updateCheckClearVoidSetup(jobId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.clearVoidStopUpdateForm.valid) {
                let checkClearVoidSetup = new CheckClearVoidSetup();

                checkClearVoidSetup.comments = Form.getValue(this.clearVoidStopUpdateForm, 'comments');
                checkClearVoidSetup.jobId = Form.getValue(this.clearVoidStopUpdateForm, 'jobId');
                checkClearVoidSetup.requestUser = Form.getValue(this.clearVoidStopUpdateForm, 'reqUser');
                checkClearVoidSetup.requestDate = Form.getDatePickerValue(this.clearVoidStopUpdateForm, 'runDate');
                checkClearVoidSetup.action = 'R';
                checkClearVoidSetup.status = Form.getValue(this.clearVoidStopUpdateForm, 'status');
                checkClearVoidSetup.daemonRequest = Form.getValue(this.clearVoidStopUpdateForm, 'daemonrequest');
                this.checkClearVoidSetupService.updateCheckClearVoidSetup(checkClearVoidSetup, jobId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editCheckClearVoidSetup = false;
                    this.getCheckClearVoidSetups();
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.isFormDataChangeStatus = false;
                    }
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

    saveCheckClearVoidSetup() {
        if (this.editCheckClearVoidSetup) {
            this.updateCheckClearVoidSetup(this.checkClearVoidSetup.jobId)
        } else {
            this.createCheckClearVoidSetup();
        }
    }

    deleteCheckClearVoidSetup(jobId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.checkClearVoidSetupService.deleteCheckClearVoidSetup(jobId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getCheckClearVoidSetup(jobId: string) {
        this.checkClearVoidSetupService.getCheckClearVoidSetup(jobId).subscribe(checkClearVoidSetup => {
            this.checkClearVoidSetup = checkClearVoidSetup;
            this.clearVoidStopUpdateForm.patchValue({
                jobId: checkClearVoidSetup.jobId,
                reqUser: checkClearVoidSetup.requestUser,
                runDate: checkClearVoidSetup.requestDate ? this.datePipe.transform(checkClearVoidSetup.requestDate, 'MM/dd/yyyy') : null,
                action: checkClearVoidSetup.action,
                status: this.statusTypes.find(statusType => statusType.key == checkClearVoidSetup.status).value,
                daemonrequest: checkClearVoidSetup.daemonRequest,
                'comments': this.checkClearVoidSetup.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getCheckClearVoidSetups() {
        this.checkClearVoidSetupService.findAllCheckClearVoidSetup().subscribe(checkClearVoidSetupsResp => {
            this.checkClearVoidSetups = [];
            for(let checkClearVoidSetupResp of checkClearVoidSetupsResp) {
                let checkClearVoidSetup = new CheckClearVoidSetup();
                checkClearVoidSetup.jobId = checkClearVoidSetupResp.JOB_ID;
                checkClearVoidSetup.seqCvsupId = checkClearVoidSetupResp.SEQ_CVSUP_ID;
                checkClearVoidSetup.requestUser = checkClearVoidSetupResp.REQUEST_USER;
                checkClearVoidSetup.requestDate = checkClearVoidSetupResp.REQUEST_DATE;
                checkClearVoidSetup.action = checkClearVoidSetupResp.ACTION;
                checkClearVoidSetup.daemonRequest = checkClearVoidSetupResp.DAEMON_REQUEST;
                checkClearVoidSetup.status = checkClearVoidSetupResp.STATUS;
                checkClearVoidSetup.comments = checkClearVoidSetupResp.COMMENTS;
                checkClearVoidSetup.securityCode = checkClearVoidSetupResp.SECURITY_CODE;
                checkClearVoidSetup.insertDatetime = checkClearVoidSetupResp.INSERT_DATETIME;
                checkClearVoidSetup.insertUser = checkClearVoidSetupResp.INSERT_USER;
                checkClearVoidSetup.insertProcess = checkClearVoidSetupResp.INSERT_PROCESS;
                checkClearVoidSetup.updateDatetime = checkClearVoidSetupResp.UPDATE_DATETIME;
                checkClearVoidSetup.updateUser = checkClearVoidSetupResp.UPDATE_USER;
                checkClearVoidSetup.updateProcess = checkClearVoidSetupResp.UPDATE_PROCESS;
                this.checkClearVoidSetups.push(checkClearVoidSetup);
            }
            this.dataGridGridOptions.api.setRowData(this.checkClearVoidSetups);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    dataGridGridOptionsExportCsv() {
        var params = {
        };
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
                headerName: "Job Id",
                field: "jobId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Req User",
                field: "requestUser",
                width: 200
            },
            {
                headerName: "Run Date",
                field: "requestDate",
                width: 200,
                valueGetter : this.setRunDateOnFormat.bind(this)
            },
            {
                headerName: "Status",
                field: "status",
                width: 200,
                valueGetter : this.findStatusAction.bind(this)
            }
        ];
    }

    setRunDateOnFormat(params: any): string {
        return  params.data.requestDate ? this.datePipe.transform(params.data.requestDate, 'MM/dd/yyyy') : null;
    }

    findStatusAction(params: any): string {
        let action = this.statusTypes.find(statusType => statusType.key == params.data.status);
        return action ? action.value : '';
    }

    onGridSelectionChange(event: any) {
        let selectedRow = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRow.length > 0) {
            let checkClearVoidSetup = selectedRow[0];
            this.setClearVoidStopUpdate(checkClearVoidSetup);
        }
    }

    onSelectionChange(event: any) {
        this.setClearVoidStopUpdate(event.data);
    }

    setClearVoidStopUpdate(checkClearVoidSetup: CheckClearVoidSetup) {
        this.clearVoidStopUpdateForm.patchValue({
            jobId: checkClearVoidSetup.jobId,
            reqUser: checkClearVoidSetup.requestUser,
            runDate: checkClearVoidSetup.requestDate ? this.dateFormatPipe.defaultDisplayDateFormat(checkClearVoidSetup.requestDate):null,
            action: checkClearVoidSetup.action,
            status: this.statusTypes.find(statusType => statusType.key == checkClearVoidSetup.status).value,
            daemonrequest: checkClearVoidSetup.daemonRequest,
            comments: checkClearVoidSetup.comments
        });
        this.isFormDataModified();
        return checkClearVoidSetup;
    }

    findJob(event: any) {
        setTimeout(() => {

            if (this.clearVoidStopUpdateForm.value.jobId && event.key === 'Tab') {
                this.getCheckClearVoidSetup(this.clearVoidStopUpdateForm.value.jobId);
            } else if (event.key === 'F5') {
                event.preventDefault();
                this.openLookupFieldSearchModel();
            }
        }, 500);

    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.clearVoidStopUpdateForm.patchValue({
                jobId: res.jobId
            });
            this.getCheckClearVoidSetup(res.jobId);
            this.popUpMessage = null;
        });
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

    /**
       * Get Security Column Details
       */
    private getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            return;
        }
        this.dataLoadedMap.set('BATCHSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.batchTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('BATCHSECCOL', false);
            this.batchSecColDetails = resp;
            this.batchSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.dataLoadedMap.set('RECEIPTSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.receiptTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('RECEIPTSECCOL', false);
            this.receiptSecColDetails = resp;
            this.receiptSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    /**
        * Get Permissions
        * @param secUserId
        */
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
            this.showPopUp(error, 'Window Error')
        });
    }
    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
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

    private initializeComponentState(): void {
        this.createForm();
        this.getCheckClearVoidSetups();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.clearVoidStopUpdateForm);
        this.createDataGrid();
    }

    createForm(init: boolean = true) {
        if(init) {
            this.clearVoidStopUpdateForm = this.formBuilder.group({
                jobId: ['', { updateOn: 'blur', validators: [] }],
                reqUser: ['', { updateOn: 'blur', validators: [] }],
                runDate: ['', { updateOn: 'blur', validators: [] }],
                action: ['', { updateOn: 'blur', validators: [] }],
                status: ['', { updateOn: 'blur', validators: [] }],
                daemonrequest: ['', { updateOn: 'blur', validators: [] }],
                comments: ['', { updateOn: 'blur', validators: [] }]
            }, { updateOn: 'submit' });
        } else {
            let authUser : string = this.authenticationService.getActiveUser();
            this.checkClearVoidSetupService.getNextJobId().subscribe(nextJobId => {
                this.dataGridGridOptions.api.deselectAll();
                this.clearVoidStopUpdateForm.reset();
                this.clearVoidStopUpdateForm = this.formBuilder.group({
                    jobId: [nextJobId, { updateOn: 'blur', validators: [] }],
                    reqUser: [authUser, { updateOn: 'blur', validators: [] }],
                    runDate: [this.dateFormatPipe.defaultDisplayDateFormat(new Date()), { updateOn: 'blur', validators: [] }],
                    action: ['R', { updateOn: 'blur', validators: [] }],
                    status: ['New', { updateOn: 'blur', validators: [] }],
                    daemonrequest: ['I', { updateOn: 'blur', validators: [] }],
                    comments: ['', { updateOn: 'blur', validators: [] }]
                }, { updateOn: 'submit' });
            });
        }

    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Clear Void Stop Update')
            })
        } else {
            this.activeModal.close();
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveCheckClearVoidSetup()
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
        this.clearVoidStopUpdateForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...clearVoidStopUpdateShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/CVSUP_Clear_Void_Stop_Check_EFT_Update.htm';
        viewModal.componentInstance.showIcon = true;
    }

}
