import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import {
    CompanyMaster,
    DddwDtl,
    GeneralLedgerReference,
    MessageMasterDtl,
    SecUser,
    SystemCodes
} from '../../../api-models';
import { ArCashBatchControl } from '../../../api-models/ar-cash-batch-control.model';
import { ArCashReceipt } from '../../../api-models/ar-cash-receipt.model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import {
    DddwDtlService,
    SecUserService,
    CompanyMasterService,
    GeneralLedgerReferenceService,
    SystemCodesService, MessageMasterDtlService
} from '../../../api-services';
import { ArCashBatchControlService } from '../../../api-services/ar-cash-batch-control.service';
import { ArCashReceiptService } from '../../../api-services/ar-cash-receipt.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { CONSTANTS, getArCashReceiptsShortcutKeys } from "../../../shared/services/shared.service";
import { DEFAULT_LANGUAGE, SYSTEM_CODE_TRANS_TYPE } from '../../../shared/models/constants';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { Menu, SearchModel } from '../../../shared/models/models';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { AR_CASH_RECRIPT_MODULE_ID } from '../../../shared/app-constants';
import { ArCashReceiptLookup } from '../../../shared/lookup/ar-cash-receipt-lookup';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { ArAdjustmentsGlMonthComponent } from '../ar-adjustments-gl-month/ar-adjustments-gl-month.component';
import { ReportService } from '../../../core';
import { CustomerSelectLookup } from '../../../shared/lookup/customer-select-lookup';
import { PmbArCustomerMasterService } from "../../../api-services/pmb-ar-customer-master.service";


@Component({
    selector: 'app-ar-cash-receipts',
    templateUrl: './ar-cash-receipts.component.html',
    styleUrls: ['./ar-cash-receipts.component.scss'],
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        ArCashReceiptService,
        ArCashBatchControlService,
        DddwDtlService,
        CompanyMasterService,
        GeneralLedgerReferenceService,
        SystemCodesService,
        ReportService,
        PmbArCustomerMasterService
    ]
})
export class ArCashReceiptsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public arCashReceiptsForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public secWin: SecWinViewModel;
    public userTemplateId: string;
    public secModuleId = AR_CASH_RECRIPT_MODULE_ID;
    public isSuperUser = false;
    public dataGridGridOptions: GridOptions;
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public editArCashReceipt: boolean;
    public editArCashBatchControl: boolean;
    public customerTypes: DddwDtl[] = [];
    public statementStatuses: DddwDtl[] = [];
    public batchStatuses: DddwDtl[] = [];
    public companyCodes: CompanyMaster[] = [];
    public glRefCodes: GeneralLedgerReference[] = [];
    public transactionTypes: SystemCodes[] = [];
    public showBatchFields: boolean = false;
    public showReceiptFields: boolean = false;
    public selectedDiv: string = 'BATCH';
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    popupClose: Boolean = false;
    closeStatus: Boolean = false;

    private windowId: string = 'ARCSH';
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    private arCashReceipt: ArCashReceipt;
    private arCashReceipts: ArCashReceipt[];
    private arCashBatchControl: ArCashBatchControl;
    private arCashBatchControls: ArCashBatchControl[];
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    private dataLoadedMap = new Map<string, boolean>();
    private newArCashBatch: boolean = false;
    private disableForm = true;
    errorPopupTitle = 'A/R Cash Receipts'
    private searchModel = new SearchModel(
        'arcashbatchcontrols/lookup',
        ArCashReceiptLookup.AR_CASH_BATCH_DEFAULT,
        ArCashReceiptLookup.AR_CASH_BATCH_ALL,
        [],
        true
    );
    @Input() public showIcon: boolean = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('customerType') customerTypeElf: any;
    @ViewChild('receiptDiv') receiptDivEle: ElementRef;
    @ViewChild('companyCodeRef') companyCodeRef: ElementRef;
    @ViewChild('glRefCodeRef') glRefCodeRef: ElementRef;
    batchStatusShow: boolean = false;
    isBatchStatusClose: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private arCashReceiptService: ArCashReceiptService,
        private arCashBatchControlService: ArCashBatchControlService,
        private dddwDtlService: DddwDtlService,
        private companyMasterService: CompanyMasterService,
        private generalLedgerReferenceService: GeneralLedgerReferenceService,
        private SystemCodesService: SystemCodesService,
        private messageService: MessageMasterDtlService,
        private reportService: ReportService,
        private renderer: Renderer2,
        private pmbArCustomerMasterService: PmbArCustomerMasterService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arCashReceiptsForm);
        this.hasPermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getArCashReceiptsShortcutKeys(this));
        this.cdr.detectChanges();
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

    public onLookupFieldBatchId(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(1085).subscribe(res => {
                    let popMsg = new PopUpMessage('groupNotExistPopup',
                        'A/R Cash Receipts',
                        '1085: ' + res[0].messageText,
                        'icon');
                    popMsg.buttons = [
                        new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                        new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                        if (event.name == 'yes') {
                            this.createNewBatchs()
                        }
                        if (event.name == 'no') {
                            this.renderer.selectRootElement('#batchId').focus();
                        }
                    });
                })
            } else {
                this.getArCashBatchControl(event.target.value);
            }
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    private openLookupFieldSearchModel() {
        let popMsg = new PopUpMessage('ARCashBatchNotExistPopup', 'A/R Cash Batch Control', null, 'icon');
        popMsg.buttons = [
            new PopUpMessageButton('open', 'Display Open A/R Batches Only', 'btn btn-primary'),
            new PopUpMessageButton('all', 'Display All A/R Batches', 'btn btn-primary'),
            new PopUpMessageButton('cancle', 'Cancel', 'btn btn-secondary')
        ];
        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance['buttonclickEvent'].subscribe((button: PopUpMessageButton) => {
            if (button.name === 'open') {
                this.searchModel.url = 'arcashbatchcontrols/open/lookup';
                this.showLookup();
            } else if (button.name === 'all') {
                this.searchModel.url = 'arcashbatchcontrols/lookup';
                this.showLookup();
            }
        });
    }

    private showLookup() {

        this.getBatchStatuses();
        this.getCustomerTypes();
        this.getStatementStatuses();
        this.getCompanyCodes();
        this.getGlRefCodes();
        this.getTransactionTypes();
        let searchRef = this.modalService.open(SearchboxComponent);
        searchRef.componentInstance.searchModel = this.searchModel;
        searchRef.componentInstance.showIcon = true;
        searchRef.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.getArCashBatchControl(res.seqCashBatchId);
            }
        });
    }

    userLookupOpen(event: any) {
        if (event.key == 'F5') {
            event.preventDefault();
            this.userLookup();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(29032).subscribe(resp => {
                    this.showPopUp('29032: ' + resp[0].messageText.replace('@1', 'customer_id'), this.errorPopupTitle)
                })
            } else {
                if (this.arCashReceiptsForm.get('customerType').value === '') {
                    this.messageService.findByMessageId(29032).subscribe(res => {
                        if (!res) {
                            return;
                        }
                        let popUpMessage = new PopUpMessage(
                            'popUpMessageName',
                            this.errorPopupTitle,
                            '29032: ' + res[0].messageText.replace('@1', 'customer_type'),
                            'icon');
                        popUpMessage.buttons.push(new PopUpMessageButton('yes', 'Ok', ''));
                        let ref = this.modalService.open(PopUpMessageComponent);
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance.popupMessage = popUpMessage;
                        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                            if (resp.name === 'yes') {
                                setTimeout(() => {
                                    this.renderer.selectRootElement('#customerType').focus();
                                }, 500)
                            }
                        });
                    })
                } else {
                    this.getPmbArCustomerMaster(event.target.value, this.arCashReceiptsForm.get('customerType').value);
                }

            }
        }
    }

    private userLookup() {
        let userSearchRef = this.modalService.open(SearchboxComponent);
        userSearchRef.componentInstance.groupType = Form.getValue(this.arCashReceiptsForm, 'customerType');

        let userSearchModel = new SearchModel(
            'pmbarcustomermasters/lookup',
            CustomerSelectLookup.CUSTOMER_SELECT_DEFAULT,
            CustomerSelectLookup.CUSTOMER_SELECT_ALL,
            [{ "CUSTOMER_TYPE": Form.getValue(this.arCashReceiptsForm, 'customerType') }],
            true
        );

        userSearchRef.componentInstance.searchModel = userSearchModel;


        userSearchRef.componentInstance.showIcon = true;
        userSearchRef.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.arCashReceiptsForm.patchValue({
                    'customerId': res.pmbArCustomerMasterPrimaryKey.customerId
                })

            }
        });
    }

    private showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    public onClickDiv(selectedDiv: string) {
        this.selectedDiv = selectedDiv;
        if (selectedDiv == 'BATCH') {
            this.arCashReceiptsForm.controls['batchId'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['batchStatus'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['customerType'].setValidators([]);
            this.arCashReceiptsForm.controls['customerId'].setValidators([]);
            this.arCashReceiptsForm.controls['transactionDate'].setValidators([]);
            this.arCashReceiptsForm.controls['transactionNo'].setValidators([]);
            this.arCashReceiptsForm.controls['receiveDate'].setValidators([]);
            this.arCashReceiptsForm.controls['transactionType'].setValidators([]);
            this.arCashReceiptsForm.controls['companyCode'].setValidators([]);
            this.arCashReceiptsForm.controls['glRefCode'].setValidators([]);
        } else {
            this.arCashReceiptsForm.controls['batchId'].setValidators([]);
            this.arCashReceiptsForm.controls['batchStatus'].setValidators([]);
            this.arCashReceiptsForm.controls['customerType'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['customerId'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['transactionDate'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['transactionNo'].setValidators([Validators.compose([Validators.required, Validators.maxLength(35)])]);
            this.arCashReceiptsForm.controls['receiveDate'].setValidators([Validators.required]);
            this.arCashReceiptsForm.controls['transactionType'].setValidators([Validators.compose([Validators.required, Validators.maxLength(2)])]);
            this.arCashReceiptsForm.controls['companyCode'].setValidators([Validators.compose([Validators.required, Validators.maxLength(5)])]);
            this.arCashReceiptsForm.controls['glRefCode'].setValidators([Validators.compose([Validators.required, Validators.maxLength(3)])]);
        }
        this.arCashReceiptsForm.controls['batchId'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['batchStatus'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['customerType'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['customerId'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['transactionDate'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['transactionNo'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['receiveDate'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['transactionType'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['companyCode'].updateValueAndValidity({ emitEvent: false });
        this.arCashReceiptsForm.controls['glRefCode'].updateValueAndValidity({ emitEvent: false });
    }

    private popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    public popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    public addNewData(batchStatus?: string) {
        if (this.secWin && !this.secWin.hasInsertPermission()) {
            return;
        }
        if (this.selectedDiv == 'BATCH') {
            this.arCashReceiptsForm.reset();
            this.dataGridGridOptions.api ? this.dataGridGridOptions.api.setRowData([]) : 0;
            this.editArCashBatchControl = false;
            this.arCashBatchControlService.getNewBatchId().subscribe((response: number) => {
                this.arCashBatchControl = new ArCashBatchControl()
                this.arCashBatchControl.seqCashBatchId = response;


                this.arCashBatchControl.batchStatus = batchStatus ? batchStatus : 'N';
                this.patchArCashBatchControl();
                this.showBatchFields = true;
                this.newArCashBatch = true;
            }, error => {
                this.showBatchFields = false;
                this.arCashReceiptsForm.get('batchId').enable();
            });
        } else {
            this.insertNewData();
        }
    }

    private insertNewData() {
        let unsavedData = false;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            let rowData: ArCashReceipt = node.data;
            if (rowData.seqCashReceipt == null || rowData.seqCashReceipt == undefined) {
                unsavedData = true;
                return;
            }
        });

        this.getBatchStatuses();
        this.getCustomerTypes();
        this.getStatementStatuses();
        this.getCompanyCodes();
        this.getGlRefCodes();
        this.getTransactionTypes();
        if (unsavedData) {
            let popMsg = new PopUpMessage('UnSavedReciept', 'A/R Cash Receipt', '29065: Data has been modified. Press yes to save the changes.', 'icon');
            popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary'), new PopUpMessageButton('cancle', 'Cancel', 'btn btn-secondary')];
            let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((button: PopUpMessageButton) => {
                if (button.name === 'yes') {
                    this.saveArCashReceipt();
                    return;
                } else if (button.name === 'cancel') {
                    return;
                }
                this.clearReceiptValues();
                return;
            });
        }
        let newItem = new ArCashReceipt();
        newItem.seqCashBatchId = this.arCashBatchControl.seqCashBatchId;
        this.dataGridGridOptions.api.applyTransaction({
            add: [newItem],
            addIndex: -1,
        });
        const length = this.dataGridGridOptions.api.getDisplayedRowCount();
        this.dataGridGridOptions.api.forEachNode((node: any) => {
            node.rowIndex == length - 1 ? node.setSelected(true) : 0;
        });
        this.clearReceiptValues();
    }

    private clearReceiptValues() {
        this.arCashReceiptsForm.patchValue({
            'customerType': null,
            'customerId': null,
            'transactionDate': null,
            'transactionNo': null,
            'receiveDate': null,
            'amount': null,
            'transactionType': null,
            'companyCode': null,
            'glRefCode': null,
            'description': null,
            'statementStatus': null,
            'invoiceNo': null,
            'postDate': null,
        }, { emitEvent: false });
    }

    public saveData() {
        if (this.selectedDiv == 'BATCH') {
            this.saveArCashBatchControl();
        } else {
            if (this.arCashBatchControl) {
                this.saveArCashReceipt();
            } else {
                this.createArCashBatchControl(true);
            }
        }
    }

    public openNew() {
        if (this.popupClose) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'A/R Cash Receipts')
            })
        } else {
            this.arCashReceiptsForm.reset();
            this.arCashReceiptsForm.get('batchId').enable();
            this.showBatchFields = false;
            this.showReceiptFields = false;
            if (this.dataGridGridOptions.api) {
                this.dataGridGridOptions.api.setRowData([])
            }
        }
    }

    private saveArCashReceipt() {
        if (this.arCashReceipt && this.arCashReceipt.seqCashReceipt) {
            this.updateArCashReceipt(this.arCashReceipt.seqCashReceipt)
        } else {
            if (this.newArCashBatch) {
                this.saveArCashBatchControl();
            } else {
                this.createArCashReceipt();
            }
        }
    }

    private createArCashReceipt() {
        if (this.secWin && !this.secWin.hasInsertPermission()) {
            return;
        }
        this.formValidation.validateForm();
        if (this.arCashReceiptsForm.valid && this.arCashReceiptsForm.get('customerId').value) {
            let arCashReceipt = new ArCashReceipt();
            arCashReceipt.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
            arCashReceipt.customerType = Form.getValue(this.arCashReceiptsForm, 'customerType');
            arCashReceipt.customerId = Form.getValue(this.arCashReceiptsForm, 'customerId');
            arCashReceipt.transDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'transactionDate');
            arCashReceipt.transNo = Form.getValue(this.arCashReceiptsForm, 'transactionNo');
            arCashReceipt.transAmt = Form.getValue(this.arCashReceiptsForm, 'amount');
            arCashReceipt.transReceiptDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'receiveDate');
            arCashReceipt.transactionType = Form.getValue(this.arCashReceiptsForm, 'transactionType');
            arCashReceipt.companyCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
            arCashReceipt.glRefCode = Form.getValue(this.arCashReceiptsForm, 'glRefCode');
            arCashReceipt.description = Form.getValue(this.arCashReceiptsForm, 'description');
            arCashReceipt.invoiceNo = Form.getValue(this.arCashReceiptsForm, 'invoiceNo');
            arCashReceipt.postDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'postDate');
            arCashReceipt.statementStatus = Form.getValue(this.arCashReceiptsForm, 'statementStatus');

            this.arCashReceiptService.createArCashReceipt(arCashReceipt).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.getArCashReceiptsBySeqCashBatchId();
                this.popupClose = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {

        }
    }

    private updateArCashReceipt(seqCashReceipt: number) {
        if (this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) {
            this.formValidation.validateForm();
            if (this.arCashReceiptsForm.valid) {
                let arCashReceipt = new ArCashReceipt();
                arCashReceipt.seqCashReceipt = this.arCashReceipt.seqCashReceipt;
                arCashReceipt.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
                arCashReceipt.customerType = Form.getValue(this.arCashReceiptsForm, 'customerType');
                arCashReceipt.customerId = Form.getValue(this.arCashReceiptsForm, 'customerId');
                arCashReceipt.transDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'transactionDate');
                arCashReceipt.transNo = Form.getValue(this.arCashReceiptsForm, 'transactionNo');
                arCashReceipt.transAmt = Form.getValue(this.arCashReceiptsForm, 'amount');
                arCashReceipt.transReceiptDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'receiveDate');
                arCashReceipt.transactionType = Form.getValue(this.arCashReceiptsForm, 'transactionType');
                arCashReceipt.companyCode = Form.getValue(this.arCashReceiptsForm, 'companyCode');
                arCashReceipt.glRefCode = Form.getValue(this.arCashReceiptsForm, 'glRefCode');
                arCashReceipt.description = Form.getValue(this.arCashReceiptsForm, 'description');
                arCashReceipt.invoiceNo = Form.getValue(this.arCashReceiptsForm, 'invoiceNo');
                arCashReceipt.postDate = Form.getDatePickerValue(this.arCashReceiptsForm, 'postDate');
                this.arCashReceiptService.updateArCashReceipt(arCashReceipt, seqCashReceipt).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.getArCashReceiptsBySeqCashBatchId();
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000)
                    }
                    this.popupClose = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update AR Cash Receipt ', 'AR Cash Receipts Permissions');
        }
    }

    private getArCashReceiptsBySeqCashBatchId() {
        this.arCashReceiptService.findBySeqCashBatchId(this.arCashReceiptsForm.get('batchId').value).subscribe(arCashReceipts => {
            this.arCashReceipts = arCashReceipts;
            this.dataGridGridOptions.api.setRowData(this.arCashReceipts);
            if (arCashReceipts && arCashReceipts.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.patchArCashReceipt(this.arCashReceipts[0]);
            }
        });
    }

    private patchArCashReceipt(arCashReceipt: ArCashReceipt) {
        this.arCashReceipt = arCashReceipt;
        this.arCashReceiptsForm.patchValue({
            'customerType': this.arCashReceipt.customerType ? Number(this.arCashReceipt.customerType) : "",
            'customerId': this.arCashReceipt.customerId,
            'transactionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.transDate),
            'transactionNo': this.arCashReceipt.transNo,
            'receiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.transReceiptDate),
            'amount': this.arCashReceipt.transAmt,
            'transactionType': this.arCashReceipt.transactionType,
            'companyCode': this.arCashReceipt.companyCode,
            'glRefCode': this.arCashReceipt.glRefCode,
            'description': this.arCashReceipt.description,
            'statementStatus': this.arCashReceipt.statementStatus,
            'invoiceNo': this.arCashReceipt.invoiceNo,
            'postDate': this.arCashReceipt.postDate ? this.dateFormatPipe.defaultDisplayDateFormat(this.arCashReceipt.postDate) : null
        }, { emitEvent: false });
        if (this.editArCashReceipt) {

        } else {
            setTimeout(() => {
                this.isFormDataChangedStatus();
            }, 2000)
        }
    }

    private saveArCashBatchControl() {
        if (this.editArCashBatchControl && this.arCashReceiptsForm.get('batchId').value) {
            this.updateArCashBatchControl(this.arCashBatchControl.seqCashBatchId)
        } else {
            this.createArCashBatchControl();
        }
    }

    private createArCashBatchControl(isCalledReceipt = false) {
        if (this.secWin && !this.secWin.hasInsertPermission()) {
            return;
        }
        this.formValidation.validateForm();
        let arCashBatchControl = new ArCashBatchControl();
        if (this.arCashReceiptsForm.get('itemCount').value === '') {
            this.messageService.findByMessageId(29032).subscribe(res => {
                this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'item_count'), 'A/R Cash Receipts')
            })
        } else {
            arCashBatchControl.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
            arCashBatchControl.itemCount = Form.getValue(this.arCashReceiptsForm, 'itemCount');
            arCashBatchControl.batchTotal = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
            arCashBatchControl.batchStatus = Form.getValue(this.arCashReceiptsForm, 'batchStatus');
            this.arCashBatchControlService.createArCashBatchControl(arCashBatchControl).subscribe(response => {

                this.arCashBatchControl = response;
                if (!isCalledReceipt) {
                    this.toastService.showToast('Record successfully created', NgbToastType.Success);
                }
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
                this.selectedDiv = 'RECEIPT'
                if (isCalledReceipt) {
                    this.saveArCashReceipt();
                }
            }, error => {

            });
        }
    }

    private updateArCashBatchControl(seqCashBatchId: number) {
        if (this.secWin && !this.secWin.hasUpdatePermission()) {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
            return;
        }
        this.formValidation.validateForm();
        if (!this.arCashReceiptsForm.valid) {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            return;
        }
        let arCashBatchControl = new ArCashBatchControl();
        arCashBatchControl.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
        arCashBatchControl.itemCount = Form.getValue(this.arCashReceiptsForm, 'itemCount');
        arCashBatchControl.batchTotal = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
        arCashBatchControl.batchStatus = Form.getValue(this.arCashReceiptsForm, 'batchStatus');
        this.arCashBatchControlService.updateArCashBatchControl(arCashBatchControl, seqCashBatchId).subscribe(response => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000)
            }
            this.selectedDiv = 'RECEIPT';
            this.popupClose = false;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
        });
    }

    private getArCashBatchControl(seqCashBatchId: number) {
        this.arCashBatchControlService.getArCashBatchControl(seqCashBatchId).subscribe(arCashBatchControl => {
            if (arCashBatchControl) {
                this.arCashBatchControl = arCashBatchControl;
                this.showBatchFields = true;
                this.editArCashBatchControl = true;
                this.newArCashBatch = false;
                this.patchArCashBatchControl();
                this.arCashBatchControl.seqCashBatchId = seqCashBatchId;
                this.getArCashReceiptsBySeqCashBatchId();
            } else {
                let popMsg = new PopUpMessage('ARCashBatchNotExistPopup', 'A/R Cash Receipt', '1085: Entered Batch Id does not exists. Press yes to create a new Batch.', 'icon');
                popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance['buttonclickEvent'].subscribe((button: PopUpMessageButton) => {
                    if (button.name === 'yes') {
                        this.createNewBatchs()
                    }
                });
            }
        });
        let arCashBatchControl = new ArCashBatchControl();
        arCashBatchControl.seqCashBatchId = Form.getValue(this.arCashReceiptsForm, 'batchId');
        arCashBatchControl.itemCount = Form.getValue(this.arCashReceiptsForm, 'itemCount');
        arCashBatchControl.batchTotal = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
        arCashBatchControl.batchStatus = Form.getValue(this.arCashReceiptsForm, 'batchStatus');
    }


    private patchArCashBatchControl() {
        this.arCashReceiptsForm.patchValue({
            'batchId': this.arCashBatchControl.seqCashBatchId,
            'itemCount': this.arCashBatchControl.itemCount,
            'batchTotal': this.arCashBatchControl.batchTotal,
            'batchStatus': this.arCashBatchControl.batchStatus
        }, { emitEvent: false });

        if (this.arCashReceiptsForm.get('batchStatus').value === 'C') {
            this.isBatchStatusClose = true;
            this.arCashReceiptsForm.disable()
        } else {
            this.isBatchStatusClose = false;
            this.arCashReceiptsForm.get('batchStatus').disable();
        }
        if (this.editArCashBatchControl) {

        } else {
            setTimeout(() => {
                this.isFormDataChangedStatus();
            }, 2000)
        }
        if (this.arCashBatchControl.batchStatus == 'C' || this.arCashBatchControl.batchStatus == 'P') {
            // this.arCashReceiptsForm.disable();
            this.disableForm = true;
        } else {
            this.arCashReceiptsForm.enable();
            this.arCashReceiptsForm.get('batchId').disable();
            this.arCashReceiptsForm.get('batchStatus').disable();
        }
    }

    private createDataGrid(): void {
        this.dataGridGridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Customer Type",
                field: "customerType",
                flex: 1,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                valueFormatter: (params) => {
                    const obj: DddwDtl = this.customerTypes.find(ct => ct.dddwDtlPrimaryKey.dataVal == params.value);
                    return obj ? obj.dddwDtlPrimaryKey.dataVal + "-" + obj.dddwDtlPrimaryKey.displayVal : params.value;
                }
            },
            {
                headerName: "Customer ID",
                field: "customerId",
                flex: 1
            },
            {
                headerName: "Transaction Number",
                field: "transNo",
                flex: 1
            },
            {
                headerName: "Transaction Amt",
                field: "transAmt",
                flex: 1,
            },
            {
                headerName: "TransactionType",
                field: "transactionType",
                flex: 1,
                valueFormatter: (params) => {
                    const obj: any = this.transactionTypes.find(tt => tt.systemCode == params.value);
                    return obj ? obj.systemCodeDesc1 : params.value;
                }
            },
            {
                headerName: "Company Code",
                field: "companyCode",
                flex: 1
            },
            {
                headerName: "GL Ref Code",
                field: "glRefCode",
                flex: 1
            }
        ];
    }

    public onSelectRow($event: any) {
        const arCashReceipts: ArCashReceipt[] = $event.api.getSelectedRows();
        if (arCashReceipts && arCashReceipts.length > 0) {
            this.showReceiptFields = true;
            this.patchArCashReceipt(arCashReceipts[0]);
        }
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    private hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        const userId = parsedToken ? parsedToken.sub : null;
        this.dataLoadedMap.set('WINPERMISSION', false);
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.dataLoadedMap.set('WINPERMISSION', true);
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
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
            if (this.secWin && this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
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

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        const userId = parsedToken ? parsedToken.sub : null;
        this.dataLoadedMap.set('WINPERMISSION', false);
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin && this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
                this.dataLoadedMap.set('WINPERMISSION', true);
            } else {
                this.showPopUp('You are not Permitted to view A/R Cash Recipts', 'Window Error')
            }
        });
    }

    private initializeComponentState(): void {
        this.menuInit();
        this.createDataGrid();
        this.getBatchStatuses();
        this.getCustomerTypes();
        this.getStatementStatuses();
        this.getCompanyCodes();
        this.getGlRefCodes();
        this.getTransactionTypes();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arCashReceiptsForm = this.formBuilder.group({
            batchId: ['', { validators: [Validators.required] }],
            itemCount: ['', { validators: [] }],
            batchTotal: ['', { validators: [] }],
            batchStatus: ['', { validators: [Validators.required] }],
            customerType: ['', { validators: [Validators.required] }],
            customerId: ['', { validators: [Validators.required] }],
            transactionDate: ['', { validators: [Validators.required] }],
            transactionNo: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(35)])] }],
            receiveDate: ['', { validators: [Validators.required] }],
            amount: ['', { validators: [] }],
            transactionType: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(2)])] }],
            companyCode: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(5)])] }],
            glRefCode: ['', { validators: [Validators.compose([Validators.required, Validators.maxLength(3)])] }],
            description: ['', { validators: [Validators.maxLength(60)] }],
            statementStatus: ['', { validators: [Validators.maxLength(1)] }],
            invoiceNo: ['', { validators: [] }],
            postDate: ['', { validators: [] }]
        });
        this.arCashReceiptsForm.get('statementStatus').disable();
    }

    private getBatchStatuses() {
        this.dataLoadedMap.set('BATCH', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.BATCH_STATUS, CONSTANTS.DW_ARCSH_BATCH_CONTROL).subscribe(batchStatuses => {
            this.dataLoadedMap.set('BATCH', true);
            this.batchStatuses = batchStatuses;
        }, error => {
            this.dataLoadedMap.set('BATCH', true);
        });
    }

    private getCustomerTypes() {
        this.dataLoadedMap.set('CUSTTYPE', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.CUSTOMER_TYPE, CONSTANTS.DW_ARCSH_DE).subscribe(resp => {
            this.dataLoadedMap.set('CUSTTYPE', true);
            this.customerTypes = resp;
        }, error => {
            this.dataLoadedMap.set('CUSTTYPE', true);
        });
    }

    private getCompanyCodes(): void {
        this.dataLoadedMap.set('COMPANY', false);
        this.companyMasterService.getCompanyMasters().subscribe(companyCodes => {
            companyCodes.sort((a, b) => {
                if (a.companyCode < b.companyCode) { return -1; }
                else if (a.companyCode > b.companyCode) { return 1; }
                else { return 0 }
            });
            this.dataLoadedMap.set('COMPANY', true);
            this.companyCodes = companyCodes ? companyCodes : [];
        }, error => {
            this.dataLoadedMap.set('COMPANY', true);
        });
    }

    private getGlRefCodes(): void {
        this.dataLoadedMap.set('GLREF', false);
        this.generalLedgerReferenceService.getGeneralLedgerReferences().subscribe(glRefCodes => {
            glRefCodes.sort((a, b) => {
                if (a.generalLedgerReferencePrimaryKey.glRefCode < b.generalLedgerReferencePrimaryKey.glRefCode) { return -1; }
                else if (a.generalLedgerReferencePrimaryKey.glRefCode > b.generalLedgerReferencePrimaryKey.glRefCode) { return 1; }
                else { return 0 }
            });
            this.dataLoadedMap.set('GLREF', true);
            this.glRefCodes = glRefCodes ? glRefCodes : [];
        }, error => {
            this.dataLoadedMap.set('GLREF', true);
        });
    }

    private getTransactionTypes(): void {
        this.dataLoadedMap.set('TRANSACTION', false);
        this.SystemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_TRANS_TYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.transactionTypes = systemCodes;
            this.dataLoadedMap.set('TRANSACTION', true);
        }, error => {
            this.dataLoadedMap.set('TRANSACTION', true);
        });
    }

    private getStatementStatuses() {
        this.dataLoadedMap.set('STATEMENT', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.STATEMENT_STATUS, CONSTANTS.DW_ARCSH_DE).subscribe(resp => {
            this.dataLoadedMap.set('STATEMENT', true);
            this.statementStatuses = resp;
        }, error => {
            this.dataLoadedMap.set('STATEMENT', true);
        });
    }

    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.openNewScreen();
                    break;
                }
                case 'Open': {
                    this.openNew();
                    break;
                }
                case 'Save': {
                    this.saveData();
                    break;
                }
                case 'Close': {
                    this.modalClose();
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
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            // add method
        }
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
                    ref.componentInstance.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }

    private handleSpecialMenu(action: string) {
        if (!this.arCashBatchControl) {
            this.showPopUp(
                '1063: No batch row is on the screen',
                'A/R Cash Receipts'
            );
            return;
        }
        switch (action) {
            case 'Cash Post': {
                if (this.arCashBatchControl.batchStatus == 'O') {
                    return;
                }
                if (this.arCashBatchControl.batchStatus == 'N' || this.arCashBatchControl.batchStatus == 'P') {
                    this.showPopUp(
                        '1059: Batch Status must be Closed before a batch can be posted',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                let ref = this.modalService.open(ArAdjustmentsGlMonthComponent, { size: 'lg' });
                ref.componentInstance.title = "A/R Cash Receipts GL Month/Paid Through ...";
                ref.componentInstance['buttonclickEvent'].subscribe((button: boolean) => {
                    if (button) {
                        this.arCashBatchControlService.cashPost(this.arCashBatchControl.seqCashBatchId).subscribe(() => {
                            this.getArCashBatchControl(this.arCashBatchControl.seqCashBatchId);
                            ref.close();
                        });
                    } else {
                        ref.close();
                    }
                });
                break;
            }
            case 'Batch Close': {
                if (this.arCashBatchControl.batchStatus == 'N' || this.arCashBatchControl.batchStatus == 'P') {
                    this.showPopUp(
                        '1061: Batch Status must be Open before a batch can be closed',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                if (this.arCashBatchControl.batchStatus == 'C') {
                    this.showPopUp(
                        '1072: Cannot save an Account Receivable batch that has been closed',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                const itemCount: number = Form.getValue(this.arCashReceiptsForm, 'itemCount');
                const receiptCount: number = this.arCashReceipts.length;
                if (itemCount != receiptCount) {
                    this.showPopUp(
                        '1269: Item Count does not match the number of cash receipts entered.' +
                        'Item Count = ' + itemCount + '. Number of Cash Receipts = ' + receiptCount,
                        'A/R Cash Receipts'
                    );
                    return;
                }
                const batchTotal: number = Form.getValue(this.arCashReceiptsForm, 'batchTotal');
                const totalChecks: number = this.arCashReceipts.reduce((sum, item: ArCashReceipt) => sum + item.transAmt, 0);
                if (batchTotal != totalChecks) {
                    this.showPopUp(
                        '1062: Batch Total does not match total of all Checks in the batch.' +
                        'Batch Total = ' + batchTotal + '. Total of All Checks = ' + totalChecks,
                        'A/R Cash Receipts'
                    );
                    return;
                }
                this.arCashReceiptsForm.patchValue({
                    'batchStatus': 'C'
                }, { emitEvent: false });
                this.saveArCashBatchControl();
                break;
            }
            case 'Print Cash Batch Posting By Customer': {
                if (this.arCashBatchControl.batchStatus == 'N' || this.arCashBatchControl.batchStatus == 'O'
                    || this.arCashBatchControl.batchStatus == 'C') {
                    this.showPopUp(
                        '1065: This AR Batch must be posted before this report can be printed',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                this.reportService.printCashBatchPostingByCustomer(this.arCashReceipts);
                break;
            }
            case 'Print Cash Posting Summary': {
                if (this.arCashBatchControl.batchStatus == 'N' || this.arCashBatchControl.batchStatus == 'O'
                    || this.arCashBatchControl.batchStatus == 'C') {
                    this.showPopUp(
                        '1065: This AR Batch must be posted before this report can be printed',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                this.reportService.printCashPostingSummary(this.arCashReceipts);
                break;
            }
            case 'Print Cash Report By Customer': {
                if (this.arCashBatchControl.batchStatus == 'N' || this.arCashBatchControl.batchStatus == 'O'
                    || this.arCashBatchControl.batchStatus == 'C') {
                    this.showPopUp(
                        '1065: This AR Batch must be posted before this report can be printed',
                        'A/R Cash Receipts'
                    );
                    return;
                }
                this.reportService.printCashReportByCustomer(this.arCashReceipts);
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }

    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
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
                    { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true },
                    { name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true },
                    { name: 'Paste', shortcutKey: 'Ctrl+V', disabled: true },
                    { isHorizontal: true },
                    { name: 'Lookup', shortcutKey: 'F5' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Cash Post' },
                    { name: 'Batch Close' },
                    { name: 'Print Cash Batch Posting By Customer' },
                    { name: 'Print Cash Posting Summary' },
                    { name: 'Print Cash Report By Customer' }
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Processing Messages', shortcutKey: 'Shift+Alt+P' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 A/R Cash Receipts' }
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

    private resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose == true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'A/R Cash Receipts')
            })
        }
        else {
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
                    this.saveArCashReceipt()
                }
                else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    createNewReceipts = () => {
        this.arCashReceipt = null;
        this.dataGridGridOptions.api.deselectAll();
        this.arCashReceiptsForm.patchValue({
            statementStatus: '0',
            receiveDate: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
            customerType: null,
            customerId: null,
            transactionDate: null,
            transactionNo: null,
            amount: null,
            transactionType: null,
            companyCode: null,
            glRefCode: null,
            description: null
        });
        this.showReceiptFields = true;
        setTimeout(() => {
            this.customerTypeElf.nativeElement.focus();
            this.receiptDivEle.nativeElement.scrollIntoView();
        }, 500)
    };

    transactionDateChange = (event) => {
        let currentDate = new Date();
        let selected = event.singleDate.jsDate;
        if (selected) {
            let days = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
                Date.UTC(selected.getFullYear(), selected.getMonth(), selected.getDate())
            )) / 86400 / 1000;
            if (days <= 120) {
                setTimeout(() => {
                    this.renderer.selectRootElement('#transactionNo').focus();
                }, 500)
            } else {
                this.messageService.findByMessageId(1073).subscribe(res => {
                    if (!res) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage(
                        'popUpMessageName',
                        'A/R Cash Receipts',
                        '1073: ' + res[0].messageText,
                        'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('yes', 'Ok', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                        if (resp.name === 'yes') {
                            setTimeout(() => {
                                this.renderer.selectRootElement('#transactionNo').focus();
                            }, 500)
                        }
                    })
                })
            }
        } else {
            this.messageService.findByMessageId(29029).subscribe(res => {
                this.showPopUp('29029: ' + res[0].messageText.replace('@1', 'trans_date'), this.errorPopupTitle);
                setTimeout(() => {
                    this.renderer.selectRootElement('#transactionDate').focus();
                }, 500)
            })
        }

    };

    getPmbArCustomerMaster(customerId: string, customerType: string) {
        this.pmbArCustomerMasterService
            .getPmbArCustomerMaster(customerId, customerType).subscribe((pmbArCustomerMaster) => {
                if (pmbArCustomerMaster) {
                    this.arCashReceiptsForm.patchValue({
                        customerId: customerId,
                    });
                    setTimeout(() => {
                        this.renderer.selectRootElement('#transactionDate').focus();
                    }, 500)
                } else {
                    this.messageService
                        .findByMessageId(1054)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                '1054: ' + message[0].messageText,
                                this.errorPopupTitle
                            );
                        });
                }
            },
                (error) => {
                    this.messageService
                        .findByMessageId(1054)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.showPopUp(
                                '1054: ' + message[0].messageText,
                                this.errorPopupTitle
                            );
                        });
                }
            );
    }

    createNewBatchs = () => {
        this.arCashBatchControlService.getNewBatchId().subscribe((response: number) => {
            this.arCashReceiptsForm.patchValue({
                batchId: response,
                batchStatus: 'O',
            });
            this.showBatchFields = true;
            this.arCashBatchControl = null;
            this.arCashReceiptsForm.get('batchId').disable();
            this.batchStatusShow = true;
            this.getArCashReceiptsBySeqCashBatchId();
            setTimeout(() => {
                this.renderer.selectRootElement('#itemCount').focus();
            }, 500);
        })
    };

    isFormDataChangedStatus = () => {
        this.arCashReceiptsForm.valueChanges.subscribe(() => {
            this.popupClose = true;
            this.editArCashBatchControl = true;
        })
    };

    openNewScreen = () => {
        if (!this.isBatchStatusClose) {
            if (this.selectedDiv === 'BATCH') {
                this.createNewBatchs();
            } else {
                this.createNewReceipts();
            }
        } else {
            this.messageService.findByMessageId(1067).subscribe((message: MessageMasterDtl[]) => {
                this.formPopupAlert('1067: ' + message[0].messageText, 'A/R Cash Receipts')
            });
        }
    };

    itemCountValue = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(29032).subscribe(res => {
                    this.showPopUp('29032: ' + res[0].messageText.replace('@1', 'item_count'), 'A/R Cash Receipts')
                })
            } else {
                if (isNaN(parseInt(event.target.value))) {
                    this.showPopUp("item " + event.target.value + " does not pass the validation test.", 'A/R Cash Receipts')
                } else {
                    setTimeout(() => {
                        this.renderer.selectRootElement('#batchTotal').focus()
                    }, 500)
                }
            }
        }
    };

    batchTotalValue(event) {
        this.arCashReceiptsForm.patchValue({
            batchTotal: event.target.value
        });
        this.cdr.detectChanges();
    }

    receiptKeyEvents(event: any, replaceName: string, nextName: string) {
        if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value === '') {
                this.messageService.findByMessageId(29032).subscribe(res => {
                    this.showPopUp('29032: ' + res[0].messageText.replace('@1', replaceName), this.errorPopupTitle)
                })
            } else {
                if (nextName === 'companyCode') {
                    this.companyCodeRef.nativeElement.focus()
                } else if (nextName === 'glRefCode') {
                    this.glRefCodeRef.nativeElement.focus()
                } else {
                    setTimeout(() => {
                        this.renderer.selectRootElement('#' + nextName).focus()
                    }, 500)
                }
            }
        }
    }
}
