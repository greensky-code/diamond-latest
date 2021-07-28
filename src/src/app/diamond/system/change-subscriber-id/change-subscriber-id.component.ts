/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Form} from '../../../shared/helpers/form.helper';
import {GridOptions} from 'ag-grid-community';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SubscIdChangeJobSetup} from '../../../api-models/system/subsc-id-change-job-setup.model';
import {SubscIdChangeJobSetupService} from '../../../api-services/system/subsc-id-change-job-setup.service';
import {CHANGE_SUBSCRIBER_ID} from '../../../shared/app-constants';
import {Menu} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';


@Component({

    selector: 'changesubscriberid',
    templateUrl: './change-subscriber-id.component.html',
    styleUrls: ['change-subscriber-id.component.css']

})
export class ChangeSubscriberIdComponent implements OnInit {


    changeSubscriberIdForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editSubscIdChangeJobSetup: boolean;
    subscIdChangeJobSetup: SubscIdChangeJobSetup;
    public memberModuleId = CHANGE_SUBSCRIBER_ID;
    @Input() showIcon = false;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    subscIdChangeJobSetups: SubscIdChangeJobSetup[];
    public dataGridGridOptions: GridOptions;
    statusList = [];
    public menu: Menu[] = [];
    private windowId = '';
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    constructor(private formBuilder: FormBuilder,
                private mask: Mask,
                private customValidators: CustomValidators,
                private alertMessageService: AlertMessageService,
                private dateFormatPipe: DateFormatPipe,
                private modalService: NgbModal,
                private securityService: SecurityService,
                private dddwDtlService: DddwDtlService,
                private secColDetailService: SecColDetailService,
                private secWinService: SecWinService,
                private toastService: ToastService,
                public activeModal: NgbActiveModal,
                private secUserService: SecUserService,
                private messageService: MessageMasterDtlService,
                private subscIdChangeJobSetupService: SubscIdChangeJobSetupService) {
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState(): void {
        this.getStatusListList();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.changeSubscriberIdForm);
        this.menuInit();
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.loadDataGridForm001(event.data);
    }

    loadDataGridForm001(subscIdChangeJobSetup: SubscIdChangeJobSetup) {
        this.subscIdChangeJobSetup = subscIdChangeJobSetup;
        const status = this.statusList
            .find(value => value.dddwDtlPrimaryKey.dataVal == subscIdChangeJobSetup.status);
        this.changeSubscriberIdForm.patchValue({
            'jobId': this.subscIdChangeJobSetup.jobId,
            'requestUser': this.subscIdChangeJobSetup.requestUser,
            'requestDate': this.subscIdChangeJobSetup.requestDate,
            'action': this.subscIdChangeJobSetup.action,
            'cbCan': this.subscIdChangeJobSetup.action,
            'status': status ? status.dddwDtlPrimaryKey.displayVal : subscIdChangeJobSetup.status,
            'requestTypeCbImmedi': this.subscIdChangeJobSetup.requestType,
            'cbDefer': this.subscIdChangeJobSetup.requestType,
            'comments': this.subscIdChangeJobSetup.subsChangeJobComments,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
        this.changeSubscriberIdForm.get('requestUser').disable();
        this.changeSubscriberIdForm.get('requestDate').disable();
        this.changeSubscriberIdForm.get('status').disable();

    }

    createSubscIdChangeJobSetup() {
        this.formValidation.validateForm();
        if (this.changeSubscriberIdForm.valid) {
            let subscIdChangeJobSetup = new SubscIdChangeJobSetup();
            subscIdChangeJobSetup.jobId = Form.getValue(this.changeSubscriberIdForm, 'jobId');
            subscIdChangeJobSetup.requestUser = Form.getValue(this.changeSubscriberIdForm, 'requestUser');
            subscIdChangeJobSetup.requestDate = Form.getValue(this.changeSubscriberIdForm, 'requestDate');
            subscIdChangeJobSetup.action = Form.getValue(this.changeSubscriberIdForm, 'action');
            subscIdChangeJobSetup.status = Form.getValue(this.changeSubscriberIdForm, 'status');
            subscIdChangeJobSetup.requestType = Form.getValue(this.changeSubscriberIdForm, 'requestTypeCbImmedi');
            this.subscIdChangeJobSetupService.createSubscIdChangeJobSetup(subscIdChangeJobSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editSubscIdChangeJobSetup = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    updateSubscIdChangeJobSetup(seqSubidId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.changeSubscriberIdForm.valid) {
                let subscIdChangeJobSetup = new SubscIdChangeJobSetup();
                subscIdChangeJobSetup.jobId = Form.getValue(this.changeSubscriberIdForm, 'jobId');
                subscIdChangeJobSetup.requestUser = Form.getValue(this.changeSubscriberIdForm, 'requestUser');
                subscIdChangeJobSetup.requestDate = Form.getValue(this.changeSubscriberIdForm, 'requestDate');
                subscIdChangeJobSetup.action = Form.getValue(this.changeSubscriberIdForm, 'action');
                subscIdChangeJobSetup.status = Form.getValue(this.changeSubscriberIdForm, 'status');
                subscIdChangeJobSetup.requestType = Form.getValue(this.changeSubscriberIdForm, 'requestTypeCbImmedi');
                this.subscIdChangeJobSetupService.updateSubscIdChangeJobSetup(subscIdChangeJobSetup, seqSubidId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editSubscIdChangeJobSetup = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveSubscIdChangeJobSetup() {
        if (this.editSubscIdChangeJobSetup) {
            this.updateSubscIdChangeJobSetup(this.subscIdChangeJobSetup.seqSubidId)
        } else {
            this.createSubscIdChangeJobSetup();
        }
    }

    deleteSubscIdChangeJobSetup(seqSubidId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.subscIdChangeJobSetupService.deleteSubscIdChangeJobSetup(seqSubidId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            });
        }
    }

    getSubscIdChangeJobSetup(seqSubidId: number) {
        this.subscIdChangeJobSetupService.getSubscIdChangeJobSetup(seqSubidId).subscribe(subscIdChangeJobSetup => {
            this.subscIdChangeJobSetup = subscIdChangeJobSetup;
            this.changeSubscriberIdForm.patchValue({
                'jobId': this.subscIdChangeJobSetup.jobId,
                'requestUser': this.subscIdChangeJobSetup.requestUser,
                'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(this.subscIdChangeJobSetup.requestDate),
                'action': this.subscIdChangeJobSetup.action,
                'status': this.subscIdChangeJobSetup.status,
                'requestTypeCbImmedi': this.subscIdChangeJobSetup.requestType,
            });
        });
    }

    getSubscIdChangeJobSetups(subsId?: string) {
        this.subscIdChangeJobSetupService.getSubscIdChangeJobSetups().subscribe(subscIdChangeJobSetups => {
            this.dataGridGridOptions.api.setRowData(subscIdChangeJobSetups);
            this.subscIdChangeJobSetups = subscIdChangeJobSetups;
            if (subscIdChangeJobSetups.length > 0) {
                this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
            }
        });
    }

    dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            context: {
                componentParent: this
            }
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Job ID',
                field: 'jobId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Request User',
                field: 'requestUser',
                width: 200
            },
            {
                headerName: 'Request Date',
                field: 'requestDate',
                width: 200
            },
            {
                headerName: 'Status',
                field: 'status',
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const statusString = params.context.componentParent.statusList
                            .find(value => value.dddwDtlPrimaryKey.dataVal == params.data.status);
                        return statusString ? statusString.dddwDtlPrimaryKey.displayVal : params.data.status;
                    }
                },
                width: 200
            }
        ];
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.changeSubscriberIdForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: []}],
            requestUser: ['', {updateOn: 'blur', validators: []}],
            requestDate: ['', {updateOn: 'blur', validators: []}],
            action: ['', {updateOn: 'blur', validators: []}],
            cbCan: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}],
            requestTypeCbImmedi: ['', {updateOn: 'blur', validators: []}],
            cbDefer: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
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
                this.showPopUp('You are not Permitted to view Authorization Days Visits Update',
                    'Authorization Days Visits Update Permission')
            }
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
        this.secColDetailService.findByTableNameAndUserId('DIAGNOSIS_CODE_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.inProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
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
                        'Action is not Implemented',
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
        } else {
            this.toastService.showToast(
                'Action is not Implemented',
                NgbToastType.Danger
            );
        }
    }

    private getStatusListList() {
        this.dddwDtlService.findByColumnNameAndDwname(
            'status',
            'dw_aljob_de'
        ).subscribe((data) => {
            this.statusList = data;
            this.createDataGrid();
            this.getSubscIdChangeJobSetups();
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'Delete', disabled: true},
                    {name: 'Save'},
                    {name: 'Run Job'},
                    {name: 'Close'},
                    {isHorizontal: true},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {name: 'Exit'}
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
                    {isHorizontal: true},
                    {name: 'Next'},
                    {name: 'Previous'},
                    {isHorizontal: true},
                    {name: 'Lookup', disabled: false}
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
                    {name: 'Tile'},
                    {name: 'Layer'},
                    {name: 'Cascade'},
                    {name: 'Arrange Icons'},
                    {name: 'Processing Messages'},
                    {name: 'Refresh Job Status'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Change Subscriber ID'}
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

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Change Subscriber Id')
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
                        'Action is not Implemented',
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
        this.changeSubscriberIdForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

}
