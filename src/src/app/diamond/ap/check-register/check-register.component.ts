/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CHECK_REGISTER} from '../../../shared/app-constants';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Menu} from '../../../shared/models/models';
import {Form} from '../../../shared/helpers/form.helper';
import {DddwDtlService, MessageMasterDtlService, ReasonCodeMasterService, SecUserService} from '../../../api-services';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {CheckRegister, CheckRegisterSearchModel} from '../../../api-models/addon/check-register.model';
import {CheckRegisterService} from '../../../api-services/addon/check-register.service';
import {CheckRegisterFilterComponent} from '../check-register-filter-data/check-register-filter-data.component';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {geAuthorizationDaysVisitShortcutKeys, getCheckRegisterShortcutKeys} from '../../../shared/services/shared.service';
import {StopvoidComponent} from "../../../shared/components/stop-void/stopvoid.component";
import {ApHelpComponent} from "../ap-help/ap-help.component";


@Component({
    selector: 'checkregister',
    templateUrl: './check-register.component.html'
})
export class CheckRegisterComponent implements OnInit, AfterViewInit {

    checkRegisterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = CHECK_REGISTER;
    userTemplateId: string;
    public menu: Menu[] = [];
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    editCheckRegister: boolean;
    checkRegister: CheckRegister;
    checkRegisters: CheckRegister[];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    showGridForm = false;
    reasons: any[] = [];
    checkRegisterStatus1: any[] = [];
    checkRegisterStatus2: any[] = [];
    actions: any[] = [];
    checkTypes: any[] = [];
    statuses: any[] = [];
    public shortcuts: ShortcutInput[] = [];
    private windowId = 'CHECK';
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    stopVoidStatus: Boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        public activeModal: NgbActiveModal,
        private secUserService: SecUserService,
        private dddwDtlService: DddwDtlService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private checkRegisterService: CheckRegisterService) {
    }


    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCheckRegisterShortcutKeys(this));
        this.cdr.detectChanges();
    }


    initializeComponentState(): void {
        this.loadDropDownData();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.checkRegisterForm);
        this.createDataGrid();
        this.menuInit();
        this.openModalCheckRegisterFilterData();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        }, 100);
    }


    openModalCheckRegisterFilterData() {
        const ref = this.modalService.open(CheckRegisterFilterComponent, {
            windowClass: 'input-class-check',
            backdrop: 'static',
            keyboard: false,
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.filterData.subscribe((event: any) => {
            this.dataGridGridOptions.api.setRowData([]);
            const checkRegisterSearchModel = new CheckRegisterSearchModel();
            checkRegisterSearchModel.bankAccountCode = event.bankAccount;
            checkRegisterSearchModel.checkType = event.checkType;
            checkRegisterSearchModel.from = event.from;
            checkRegisterSearchModel.thru = event.thru;
            checkRegisterSearchModel.paymentDate = event.paymentDate;
            checkRegisterSearchModel.remittanceId = event.remittanceId;
            checkRegisterSearchModel.checkStatus = event.status;
            checkRegisterSearchModel.vendorId = event.vendor;
            this.getCheckRegisters(checkRegisterSearchModel);
        });
    }

    getCheckRegisters(checkRegisterSearchModel: CheckRegisterSearchModel) {
        this.dataGridGridOptions.api.showLoadingOverlay();
        this.checkRegisterService.searchCheckRegisters(checkRegisterSearchModel).subscribe(checkRegisters => {
            this.checkRegisters = checkRegisters;
            if (checkRegisters) {
                this.dataGridGridOptions.api.setRowData(checkRegisters);
                this.stopVoidStatus = true;
                if (checkRegisters.length > 0) {
                    this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
                }
            } else {
                this.searchedRecordsNotAvailableAction();
            }

        }, error => {
            this.dataGridGridOptions.api.hideOverlay();
            this.searchedRecordsNotAvailableAction();
        });
    }

    searchedRecordsNotAvailableAction() {
        let popUpMessage = new PopUpMessage(
            'Check Register',
            'Check Register',
            '6403: Record or records did not match filter condition, Press Yes to Continue',
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
                this.openModalCheckRegisterFilterData();
            } else if (resp.name === 'No') {
                this.activeModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.showGridForm = true;
        this.loadDataGridForm(event.data);
    }

    loadDataGridForm(checkRegister: CheckRegister) {
        const vendorAddresses = checkRegister.vendorMaster.vendorAddresses;
        const status = this.statuses.find(value => value.dddwDtlPrimaryKey.dataVal == checkRegister.checkStatus);

        this.checkRegisterForm.patchValue({
            'bankAccount': checkRegister.bankAccount.bankAccountCode,
            'dynamicText001': checkRegister.bankAccount.description,
            'checkeftType': checkRegister.checkRegisterPrimaryKey.checkNumber == '0' ? 'EFT' : 'Check',
            'checkeftNo': checkRegister.checkRegisterPrimaryKey.checkNumber,
            'checkeftDate': checkRegister.checkDate,
            'acount': this.currencyFormatter(checkRegister.checkAmt, '$'),
            'catgry': checkRegister.category,
            'jobId': checkRegister.checkPrintSetup.jobId,
            'vendorId': checkRegister.vendorMaster.vendorId,
            'dynamicText002': checkRegister.vendorMaster.shortName,
            'vendorAddr': vendorAddresses.length > 0 ? vendorAddresses[0].addressLine1 : null,
            'checkStatus': status ? status.dddwDtlPrimaryKey.displayVal : checkRegister.checkStatus,
            'statusDt': checkRegister.statChngDate,
            'reason': checkRegister.statChngRsnCode,
            'lastAction': null, // todo
            'crossReference': checkRegister.crossReference,
            'lastActionDt': null, // todo
            'comments': checkRegister.comments,
            'bulkPaymentInd': checkRegister.bulkPayInd,
            'remittanceId': checkRegister.remittanceId,
            'bulkAmt': checkRegister.bulkAmt,
        });
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
                headerName: 'Bank Account',
                field: 'bankAccount.bankAccountCode',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Check/EFT No',
                field: 'checkRegisterPrimaryKey.checkNumber',
                width: 200
            },
            {
                headerName: 'Amount',
                field: 'checkAmt',
                valueFormatter: params => this.currencyFormatter(params.data.checkAmt, '$'),
                width: 200
            },
            {
                headerName: 'Check/EFT Date',
                field: 'checkDate',
                width: 200
            },
            {
                headerName: 'Status',
                field: 'checkStatus',
                cellRenderer: (params) => {
                    if (params.data !== undefined) {
                        const checkStatus = params.data.checkStatus;
                        const status = params.context.componentParent.statuses
                            .find(value => value.dddwDtlPrimaryKey.dataVal == checkStatus);
                        return status ? status.dddwDtlPrimaryKey.displayVal : checkStatus;
                    }
                },
                width: 200
            },
            {
                headerName: 'Bulk Payment Ind',
                field: 'bulkPayInd',
                width: 200
            },
            {
                headerName: 'Remittance ID',
                field: 'remittanceId',
                width: 200
            },
            {
                headerName: 'Bulk Amt',
                field: 'bulkAmt',
                valueFormatter: params => this.currencyFormatter(params.data.bulkAmt, '$'),
                width: 200
            }
        ];
    }

    currencyFormatter(currency, sign) {
        if (currency != null) {
            const sansDec = currency.toFixed(2);
            const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return sign + `${formatted}`;
        }
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.checkRegisterForm = this.formBuilder.group({
            bankAccount: ['', {updateOn: 'blur', validators: []}],
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            checkeftType: ['', {updateOn: 'blur', validators: []}],
            checkeftNo: ['', {updateOn: 'blur', validators: []}],
            checkeftDate: ['', {updateOn: 'blur', validators: []}],
            acount: ['', {updateOn: 'blur', validators: []}],
            catgry: ['', {updateOn: 'blur', validators: []}],
            jobId: ['', {updateOn: 'blur', validators: []}],
            remittanceId: ['', {updateOn: 'blur', validators: []}],
            vendorId: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            bulkAmt: ['', {updateOn: 'blur', validators: []}],
            vendorAddr: ['', {updateOn: 'blur', validators: []}],
            checkStatus: ['', {updateOn: 'blur', validators: []}],
            statusDt: ['', {updateOn: 'blur', validators: []}],
            reason: ['', {updateOn: 'blur', validators: []}],
            lastAction: ['', {updateOn: 'blur', validators: []}],
            crossReference: ['', {updateOn: 'blur', validators: []}],
            bulkPaymentInd: ['', {updateOn: 'blur', validators: []}],
            lastActionDt: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }


    createCheckRegister() {
        this.formValidation.validateForm();
        if (this.checkRegisterForm.valid) {
            let checkRegister = new CheckRegister();
            checkRegister.checkStatus = Form.getValue(this.checkRegisterForm, 'checkeftType');
            checkRegister.comments = Form.getValue(this.checkRegisterForm, 'acount');
            checkRegister.category = Form.getValue(this.checkRegisterForm, 'catgry');
            checkRegister.seqVendId = Form.getValue(this.checkRegisterForm, 'vendorId');
            checkRegister.seqVendAddress = Form.getValue(this.checkRegisterForm, 'vendorAddr');
            checkRegister.checkAmt = Form.getValue(this.checkRegisterForm, 'checkStatus');
            checkRegister.statChngDate = Form.getValue(this.checkRegisterForm, 'statusDt');
            checkRegister.crossReference = Form.getValue(this.checkRegisterForm, 'crossReference');
            this.checkRegisterService.createCheckRegister(checkRegister).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editCheckRegister = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                'Please correct your entries and try again.');
        }
    }

    updateCheckRegister(eftTransNumber: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.checkRegisterForm.valid) {
                let checkRegister = new CheckRegister();
                checkRegister.checkStatus = Form.getValue(this.checkRegisterForm, 'checkeftType');
                checkRegister.comments = Form.getValue(this.checkRegisterForm, 'acount');
                checkRegister.category = Form.getValue(this.checkRegisterForm, 'catgry');
                checkRegister.seqVendId = Form.getValue(this.checkRegisterForm, 'vendorId');
                checkRegister.seqVendAddress = Form.getValue(this.checkRegisterForm, 'vendorAddr');
                checkRegister.checkAmt = Form.getValue(this.checkRegisterForm, 'checkStatus');
                checkRegister.statChngDate = Form.getValue(this.checkRegisterForm, 'statusDt');
                checkRegister.crossReference = Form.getValue(this.checkRegisterForm, 'crossReference');
                this.checkRegisterService.updateCheckRegister(checkRegister, eftTransNumber).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editCheckRegister = false;
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

    saveCheckRegister() {
        if (this.editCheckRegister) {
            this.updateCheckRegister(this.checkRegister.eftTransNumber)
        } else {
            this.createCheckRegister();
        }
    }

    deleteCheckRegister(eftTransNumber: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.checkRegisterService.deleteCheckRegister(eftTransNumber).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getCheckRegister(eftTransNumber: string) {
        this.checkRegisterService.getCheckRegister(eftTransNumber).subscribe(checkRegister => {
            this.checkRegister = checkRegister;
            this.checkRegisterForm.patchValue({
                'bankAccount': this.checkRegister.checkStatus,
                'checkeftType': this.checkRegister.checkStatus,
                'acount': this.checkRegister.comments,
                'catgry': this.checkRegister.category,
                'vendorId': this.checkRegister.seqVendId,
                'vendorAddr': this.checkRegister.seqVendAddress,
                'checkStatus': this.checkRegister.checkAmt,
                'statusDt': this.dateFormatPipe.defaultDisplayDateFormat(this.checkRegister.statChngDate),
                'crossReference': this.checkRegister.crossReference,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
        this.secColDetailService.findByTableNameAndUserId('', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    loadDropDownData() {
        this.getStatuses();
        this.getActions();
        this.getReasons();
        this.getCheckEftTypes();
        this.getCheckRegisterStatus1();
        this.getCheckRegisterStatus2();

    }

    getActions() {
        this.dddwDtlService.findByColumnNameAndDwname('action', 'dw_check_stop_void')
            .subscribe(
                (results) => {
                    this.actions = results;
                }
            );
    }

    getReasons() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('CK')
            .subscribe(
                (results) => {
                    this.reasons = results;
                }
            );
    }

    getCheckEftTypes() {
        this.dddwDtlService.findByColumnNameAndDwname('type', 'dw_check_response')
            .subscribe(
                (results) => {
                    this.checkTypes = results;
                }
            );
    }

    getStatuses() {
        this.dddwDtlService.findByColumnNameAndDwname('status', 'dw_check_response')
            .subscribe(
                (results) => {
                    this.statuses = results;
                }
            );
    }

    getCheckRegisterStatus1() {
        this.dddwDtlService.findByColumnNameAndDwname('check_register_check_status', 'dw_check_picklist')
            .subscribe(
                (results) => {
                    this.checkRegisterStatus1 = results;
                }
            );
    }

    getCheckRegisterStatus2() {
        this.dddwDtlService.findByColumnNameAndDwname('check_register_check_status', 'dw_check_de')
            .subscribe(
                (results) => {
                    this.checkRegisterStatus2 = results;
                }
            );
    }


    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'Open': {
                    this.openModalCheckRegisterFilterData();
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
                default: {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            this.handleTopicMenu(event.menu.menuItem);
        } else if (event.menu.menuItem === 'Special') {
            switch (event.action) {
                case 'Stop/Void':
                    this.showStopVoidOption();
                    break;
                default:
                    this.toastService.showToast(
                        'This option is not implemented yet',
                        NgbToastType.Danger
                    );
                    break;
            }
        } else if (event.menu.menuItem === 'Notes') {
            this.handleTopicMenu(event.menu.menuItem);
        } else if (event.menu.menuItem === 'Window') {
            this.handleTopicMenu(event.menu.menuItem);
        }  else if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }
    }

    openShortCutAction() {
        this.openModalCheckRegisterFilterData();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', disabled: true},
                    {name: 'Open'},
                    {name: 'Save', disabled: true},
                    {name: 'Close'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
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
                    {isHorizontal: true}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Clear', disabled: true},
                    {name: 'Stop/Void', disabled: false}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Ctrl + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Ctrl + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Ctrl + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S'},
                    {name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A'}, {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Check Register'}]
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

    private handleTopicMenu(action: string) {
        if (action === 'Special') {
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
    }

    showStopVoidOption = () => {
        if (this.stopVoidStatus) {
            let ref = this.modalService.open(StopvoidComponent);
            ref.componentInstance.title = 'Stop/Void';
            ref.componentInstance.nowDate = new Date().toISOString().split('T')[0];
            ref.componentInstance.checkNum = this.checkRegisterForm.get('checkeftNo').value;
        } else {
            this.messageService.findByMessageId(7136).subscribe(res => {
                let popUpMessage = new PopUpMessage(
                    'popUpMessageName',
                    'Check Register',
                    '7136: ' + res[0].messageText.replace('@1', 'Stop/Void'),
                    'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
            })
        }
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/CHECK_Check_Register.htm';
        viewModal.componentInstance.showIcon = true;
    }
}
