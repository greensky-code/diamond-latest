/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from '../../../api-services';
import {PCP_JOB_SET_UP} from '../../../shared/app-constants';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PcpaaJobRequest} from '../../../api-models/support/pcpaa-job-request.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PcpaaJobRequestService} from '../../../api-services/support/pcpaa-job-request.service';
import {Form} from '../../../shared/helpers/form.helper';
import {DatePipe} from '@angular/common';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Menu} from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';
import {
    CONSTANTS,
    getPcpAutoAssignShortcutKeys,
    getPCPJobSetupShortcutKeys
} from '../../../shared/services/shared.service';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {Router} from "@angular/router";

// Use the Component directive to define the PcpJobSetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pcpjobsetup',
    templateUrl: './pcp-job-setup.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        PcpaaJobRequestService
    ]

})
export class PcpJobSetupComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    pcpJobSetupForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    processes: any[] = [];
    statuses: any[] = [];
    memberModuleId = PCP_JOB_SET_UP;
    editPcpaaJobRequest: boolean;
    pcpaaJobRequest: PcpaaJobRequest;
    pcpaaJobRequests: PcpaaJobRequest[];
    public menu: Menu[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    shortcuts: ShortcutInput[] = [];
    lineOfBusinessStatus: Boolean = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    pressedKey: any[] = [];
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private pcpaaJobRequestService: PcpaaJobRequestService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
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
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
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
        this.secColDetailService.findByTableNameAndUserId('PCPAA_RULES_DTL', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpJobSetupForm);
        this.menuInit();
        this.createDataGrid();
        this.getInsertProcess();
        this.getStatuses();
        this.getPcpaaJobRequests();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
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
                    this.modalClose();
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
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions
           // this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case 'Show Timestamp': {
                    this.openShowTimestampComponent();
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
            menuItem: "File",
            dropdownItems: [
              { name: "New", shortcutKey: 'Ctrl + N' },
              { name: "Open", shortcutKey: 'Ctrl + O' },
              { name: "Save", shortcutKey: 'Ctrl + S' },
              { name: "Close", shortcutKey: 'Ctrl + A4' },
                { isHorizontal: true },
              { name: "Main Menu...", shortcutKey: 'F2' },
              { name: "Shortcut Menu...", shortcutKey: 'F3' },
              { name: "Print", disabled: true },
              { isHorizontal: true },
              { name: "Exit", shortcutKey: 'Alt + A4' },
            ],
          },
          {
            menuItem: "Edit",
            dropdownItems: [
              { name: "Undo", disabled: true, shortcutKey: 'Ctrl + Z' },
              { isHorizontal: true },
              { name: "Cut", disabled: true, shortcutKey: 'Ctrl + X' },
              { name: "Copy", disabled: true, shortcutKey: 'Ctrl + C' },
              { name: "Paste", disabled: true, shortcutKey: 'Ctrl + V' },
              { isHorizontal: true },
            ],
          },
          {
            menuItem: "Special",
            dropdownItems: [{ name: "Line of Business" }],
          },
          {
            menuItem: "Notes",
            dropdownItems: [{ name: "Notes", shortcutKey: "F4" }],
          },
          {
            menuItem: "Window",
            dropdownItems: [
              { name: "Show Timestamp", shortcutKey: 'Shift + Alt + S' },
              { name: "Processing Messages", shortcutKey: 'Shift + Alt + P' },
              { isHorizontal: true },
              { name: "1 Main Menu" },
              { name: "2 PCB Job Step" },
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

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Line of Business': {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
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

    popUpButtonHandler(button:any) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    onRowSelectedGrid(event:any) {
        if (!event.node.selected) {
            return;
        } else {
            this.patchPcpaaJobRequestValues(event.data);
        }
    }

    getInsertProcess() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.INSERT_BY_PROCESS, CONSTANTS.DW_PCBJB_DE)
            .subscribe(
                (process) => {
                    this.processes  = process;
                }
            );
    }

    getStatuses() {
        this.dddwDtlService.findPcpJobSetupStatus(CONSTANTS.STATUS, CONSTANTS.DW_PCPJB_PICK)
            .subscribe(
                (status) => {
                    this.statuses  = status;
                }
            );
    }

    createPcpaaJobRequest() {
            this.formValidation.validateForm();
            if (this.pcpJobSetupForm.valid) {
                let pcpaaJobRequest = new PcpaaJobRequest();
                pcpaaJobRequest.jobId = Form.getValue(this.pcpJobSetupForm, 'jobId');
                pcpaaJobRequest.requestUser = Form.getValue(this.pcpJobSetupForm, 'requestUser');
                pcpaaJobRequest.requestDate = Form.getValue(this.pcpJobSetupForm, 'requestDate');
                pcpaaJobRequest.insertProcess = Form.getValue(this.pcpJobSetupForm, 'lineOfBusiness');
                pcpaaJobRequest.insertDateFrom = Form.getValue(this.pcpJobSetupForm, 'insertDateFrom');
                pcpaaJobRequest.insertByProcess = Form.getValue(this.pcpJobSetupForm, 'insertProcess');
                pcpaaJobRequest.insertDateThru = Form.getValue(this.pcpJobSetupForm, 'insertDateThru');
                pcpaaJobRequest.status = Form.getValue(this.pcpJobSetupForm, 'status');
                pcpaaJobRequest.action = Form.getValue(this.pcpJobSetupForm, 'action');
                pcpaaJobRequest.requestType = Form.getValue(this.pcpJobSetupForm, 'requestType');
                pcpaaJobRequest.comments = Form.getValue(this.pcpJobSetupForm, 'comments');
                this.pcpaaJobRequestService.createPcpaaJobRequest(pcpaaJobRequest).subscribe(response => {
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                    this.editPcpaaJobRequest = false;
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
    }

    updatePcpaaJobRequest(seqPcpjbId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.pcpJobSetupForm.valid) {
            let pcpaaJobRequest = new PcpaaJobRequest();
            pcpaaJobRequest.jobId = Form.getValue(this.pcpJobSetupForm, 'jobId');
            pcpaaJobRequest.requestUser = Form.getValue(this.pcpJobSetupForm, 'requestUser');
            pcpaaJobRequest.requestDate = Form.getValue(this.pcpJobSetupForm, 'requestDate');
            pcpaaJobRequest.insertProcess = Form.getValue(this.pcpJobSetupForm, 'lineOfBusiness');
            pcpaaJobRequest.insertDateFrom = Form.getValue(this.pcpJobSetupForm, 'insertDateFrom');
            pcpaaJobRequest.insertByProcess = Form.getValue(this.pcpJobSetupForm, 'insertProcess');
            pcpaaJobRequest.insertDateThru = Form.getValue(this.pcpJobSetupForm, 'insertDateThru');
            pcpaaJobRequest.action = Form.getValue(this.pcpJobSetupForm, 'action');
            pcpaaJobRequest.requestType = Form.getValue(this.pcpJobSetupForm, 'requestType');
            pcpaaJobRequest.status = Form.getValue(this.pcpJobSetupForm, 'status');
            pcpaaJobRequest.comments = Form.getValue(this.pcpJobSetupForm, 'comments');
            this.pcpaaJobRequestService.updatePcpaaJobRequest(pcpaaJobRequest, seqPcpjbId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editPcpaaJobRequest = false;
            });
         } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    savePcpaaJobRequest() {
        if (this.editPcpaaJobRequest) {
            this.updatePcpaaJobRequest(this.pcpaaJobRequest.seqPcpjbId)
        } else {
            this.createPcpaaJobRequest();
        }
    }

    deletePcpaaJobRequest(seqPcpjbId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpaaJobRequestService.deletePcpaaJobRequest(seqPcpjbId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
       }
    }

    getPcpaaJobRequest(seqPcpjbId: number) {
        this.pcpaaJobRequestService.getPcpaaJobRequest(seqPcpjbId).subscribe(pcpaaJobRequest => {
            this.pcpaaJobRequest = pcpaaJobRequest;
            this.pcpJobSetupForm.patchValue({
                'jobId': this.pcpaaJobRequest.jobId,
                'requestUser': this.pcpaaJobRequest.requestUser,
                'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.requestDate),
                'lineOfBusiness': this.pcpaaJobRequest.insertProcess,
                'insertDateFrom': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.insertDateFrom),
                'insertProcess': this.pcpaaJobRequest.insertByProcess,
                'insertDateThru': this.dateFormatPipe.defaultDisplayDateFormat(this.pcpaaJobRequest.insertDateThru),
                'status': this.pcpaaJobRequest.status,
                'action': this.pcpaaJobRequest.action.toString(),
                'requestType': this.pcpaaJobRequest.requestType,
                'comments': this.pcpaaJobRequest.comments,
            });
        });
    }

    patchPcpaaJobRequestValues(pcpaaJobRequest: PcpaaJobRequest) {
        this.pcpaaJobRequest = pcpaaJobRequest;
        const insertProcess = this.processes.find(m => m.dddwDtlPrimaryKey.dataVal === pcpaaJobRequest.insertByProcess.toString());

        this.pcpJobSetupForm.patchValue({
            'jobId': this.pcpaaJobRequest.jobId,
            'requestUser': this.pcpaaJobRequest.requestUser,
            'requestDate': this.pcpaaJobRequest.requestDate,
            'lineOfBusiness': this.pcpaaJobRequest.lineOfBusiness,
            'insertDateFrom': this.pcpaaJobRequest.insertDateFrom,
            'insertProcess': insertProcess.dddwDtlPrimaryKey.displayVal,
            'insertDateThru': this.pcpaaJobRequest.insertDateThru,
            'action': this.pcpaaJobRequest.action.toString(),
            'requestType': this.pcpaaJobRequest.requestType,
            'status': pcpaaJobRequest.status,
            'comments': this.pcpaaJobRequest.comments,
        }, {emitEvent: false});
        setTimeout(() => {
            try {
                this.pcpaaJobRequest.updateDatetimeDisplay = this.datePipe.transform(
                    new Date(this.pcpaaJobRequest.updateDatetime),
                    "yyyy-MM-dd HH:mm:ss"
                );
                this.pcpaaJobRequest.insertDatetimeDisplay = this.datePipe.transform(
                    new Date(this.pcpaaJobRequest.insertDatetime),
                    "yyyy-MM-dd HH:mm:ss"
                );
            } catch (e) {
                console.log(e);
            }
            this.isFormDataModified();
        }, 500);
    }

    getPcpaaJobRequests() {
        this.pcpaaJobRequestService.getPcpaaJobRequests().subscribe(pcpaaJobRequests => {
            this.pcpaaJobRequests = pcpaaJobRequests;
            if (this.statuses.length && this.pcpaaJobRequests.length) {
                for (let i = 0; i < this.pcpaaJobRequests.length; i++) {
                    let element = this.statuses[this.statuses.findIndex((ele) => this.pcpaaJobRequests[i].status === parseInt(ele.value, 10) )];
                    if (element) {
                        this.pcpaaJobRequests[i].status = element.key
                    }
                }
            }
            this.dataGridGridOptions.api.setRowData(this.pcpaaJobRequests);
            if(this.pcpaaJobRequests.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.editPcpaaJobRequest = true;
            }
        });
    }

    createDataGrid(): void {
      this.dataGridGridOptions = {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: 'Job Id',
             field: 'jobId',
             width: 250,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Request User',
             field: 'requestUser',
             width: 250
         },
         {
             headerName: 'Request Date',
             field: 'requestDate',
             width: 250
         },
         {
             headerName: 'Status',
             field: 'status',
             width: 250
         }
      ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpJobSetupForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            requestDate: ['', {updateOn: 'blur', validators: [] }],
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            insertDateFrom: ['', {updateOn: 'blur', validators: [] }],
            insertProcess: ['', {updateOn: 'blur', validators: [] }],
            insertDateThru: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)]}],
            cancel: ['', {updateOn: 'blur', validators: [] }],
            status: ['', {updateOn: 'blur', validators: [] }],
            requestType: ['', {updateOn: 'blur',validators: [Validators.required, Validators.maxLength(1)]}],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPCPJobSetupShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PCPJB_PCP_Job_Setup.htm';
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'PCP Job Setup')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
        this.pcpJobSetupForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    openFunctionalGroupShortcut() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openShowTimestampComponent() {
        const ref = this.modalService.open(TimestampComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.insertDateTime = this.pcpaaJobRequest.insertDatetime;
        ref.componentInstance.insertDateTime = this.pcpaaJobRequest.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.pcpaaJobRequest.insertProcess;
        ref.componentInstance.insertUser = this.pcpaaJobRequest.insertUser;
        ref.componentInstance.updateUser = this.pcpaaJobRequest.updateUser;
        ref.componentInstance.updateDateTime = this.pcpaaJobRequest.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.pcpaaJobRequest.updateProcess;
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
                    sessionStorage.clear();
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    triggerMenus(value) {
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
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Delete'
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
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Line of Business'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownWindow") {
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

}
