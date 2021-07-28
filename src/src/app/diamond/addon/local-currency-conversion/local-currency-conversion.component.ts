/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";


import {DynamicConfigFormRow} from '../../../shared/models/models';
import {CiebIncomingClaimDetailService} from '../../../api-services/addon/cieb-incoming-claim-detail.service';
import {CiebIncomingClaimDetail} from '../../../api-models/addon/cieb-incoming-claim-detail.model';
import {ToastService} from '../../../shared/services/toast.service';
import {CiebCurrencyCodeService} from '../../../api-services/addon/cieb-currency-code.service';
import {CiebCurrencyCode, SecUser, SecWin} from '../../../api-models';
import {InstClaimHeaderService} from '../../../api-services/inst-claim-header.service';
import {InstClaimHeader} from '../../../api-models/inst-claim-header.model';
import {SecUserService} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";

// Use the Component directive to define the LocalCurrencyConversionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'localcurrencyconversion',
    styleUrls: ['./local-currency-conversion.component.scss'],
    templateUrl: './local-currency-conversion.component.html',
})

export class LocalCurrencyConversionComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    public localCurrencyConversionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    invoiceForm: FormGroup;
    @Input() seqClaimId: number = 0;
    incomingClaimDetails: CiebIncomingClaimDetail [] = []
    exchangeRate: number = 0;
    exchangeRateValidDate: Date;
    currencyCodeList: CiebCurrencyCode [];
    instClaimHeader: InstClaimHeader;
    claimNumber: number;
    imageNumber: number;
    incrdCntry: string;
    seqGroupId: any;
    member: string;
    public dataGrid001GridOptions: GridOptions;
    claimCurrency: string = "";
    @Input() showIcon: boolean = false;
    ciebIncomingClaimDetail: CiebIncomingClaimDetail;
    localCurrencyConversionConfigFormState = new Array<DynamicConfigFormRow>();
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    private windowId: string = '';
    private toastService: ToastService;
    private datePipe: DatePipe;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: any = null;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private ciebIncomingClaimDetailService: CiebIncomingClaimDetailService,
        private ciebCurrencyCodeService: CiebCurrencyCodeService,
        private instClaimHeaderService: InstClaimHeaderService,
        public activeModal: NgbActiveModal,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
    ) {
    }

    get invoicesarr() {
        return this.invoiceForm.get('invoices') as FormArray
    }

    get invoiceTotal() {
        let val = [];
        let sumOfInvoices;
        if (this.invoicesarr.controls.length > 0) {
            this.invoicesarr.controls.forEach((invoice) => {
                val.push(invoice.value.amount);
            })
            const add = (a, b) => a + b;
            sumOfInvoices = val.reduce(add);
        }
        return sumOfInvoices;
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

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createInvoiceForm();
        this.createForm();
        this.getCurrencyCodes();
        this.getInstClaimHeaderByClaimNumber(this.seqClaimId);
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.localCurrencyConversionForm);
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
    }

    getCurrencyCodes() {
        this.ciebCurrencyCodeService.getCiebCurrencyCodes().subscribe((res) => {
            if (res) {
                res.sort(function (a, b) {
                    if (a.currencyCodeDesc < b.currencyCodeDesc) {
                        return -1;
                    }
                    if (a.currencyCodeDesc > b.currencyCodeDesc) {
                        return 1;
                    }
                    return 0;
                });
                this.currencyCodeList = res;
            }
        });
    }

    fetchData() {
        this.ciebIncomingClaimDetailService.getCiebIncomingClaimDetailBySeqId(this.seqClaimId).subscribe((res) => {
            this.incomingClaimDetails = res;
            this.incomingClaimDetails.forEach((detail => {
                detail.action = null;
            }))
            this.dataGrid001GridOptions.api.setRowData(this.incomingClaimDetails);
        })
    }

    createInvoiceForm() {
        this.invoiceForm = this.formBuilder.group({
            invoices: this.formBuilder.array([])
        });
    }

    addInovice() {
        const invoiceSingleForm = this.formBuilder.group({
            select: ['', {updateOn: 'blur', validators: []}],
            amount: ['', {updateOn: 'blur', validators: []}],
            validation: ['', {updateOn: 'blur', validators: []}]
        })
        this.invoicesarr.push(invoiceSingleForm);
    }

    selectInvoice(event) {
    }

    deleteInvoice() {
        this.invoicesarr.controls.forEach((invoice, index) => {
            let removeArr = [];
            if (invoice.value.select) {
                removeArr.push(index);
            }
            removeArr.forEach(item => {
                this.invoicesarr.removeAt(item);
            })
        })
    }

    saveInvoiceForm() {
        this.invoiceForm.disable();
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.localCurrencyConversionForm = this.formBuilder.group({
            dynamicText001: ['', {updateOn: 'blur', validators: []}],
            dynamicText002: ['', {updateOn: 'blur', validators: []}],
            dynamicText003: ['', {updateOn: 'blur', validators: []}],
            dynamicText004: ['', {updateOn: 'blur', validators: []}],
            claimNumber: ['', {updateOn: 'blur', validators: []}],
            incurredCountry: ['', {updateOn: 'blur', validators: []}],
            currencyCode: ['', {updateOn: 'blur', validators: []}],
            currencyCodeDesc: ['', {updateOn: 'blur', validators: []}],
            textbox: ['', {updateOn: 'blur', validators: []}],
            skipTheInvoiceAmountValida: ['', {updateOn: 'blur', validators: []}],
            dynamicText005: ['', {updateOn: 'blur', validators: []}],
            dynamicText006: ['', {updateOn: 'blur', validators: []}],
            validation: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
    }

    onRowAdded(event) {
        event.form.controls.fields.controls[event.index - 1].enable();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    formFieldValueChanged(event) {
    }

    onRowSelectedGrid001(event: any) {
        if (!event.node.selected) {
            return;
        }
        this.loadDataGridForm001(event.data);
    }

    authOnRowClicked(event: any) {
        const selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();

        if (selectedRows.length === 1) {
            // this.authMaster = selectedRows[0];
            this.dataGrid001GridOptions.api.selectIndex(event.rowIndex, null, null);
        } else {
        }
    }

    authOnReady() {
        this.dataGrid001GridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
    }

    loadDataGridForm001(eventData) {
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions = {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Select",
                field: 'select',
                checkboxSelection: true
            },
            {
                headerName: "Line",
                field: "ciebIncomingClaimDetailPrimaryKey.incomingLineNumber",
            },
            {
                headerName: "*Svc Date",
                field: 'serviceDate',
                editable: true,
            },
            {
                headerName: "*Proc",
                field: 'billedProcedure',
                editable: true,
            },
            {
                headerName: "*Qty",
                field: 'billedQty',
                maxWidth: 110,
                editable: true,
            },
            {
                headerName: "*Local Billed",
                field: 'incurredBilledAmt',
                editable: true,
            },
            {
                headerName: "Threshold",
                field: 'threshold',
                maxWidth: 120,
                editable: true,
            },
            {
                headerName: "Currency",
                field: 'incurredCurrencyCode',
                maxWidth: 120,
                editable: true,
            },
            {
                headerName: "Exchange Rate",
                field: 'incurredEuroExchRate',
                maxWidth: 120,
                editable: true,
            },
            {
                headerName: "U.S. Billed",
                field: 'billedAmt',
                maxWidth: 120,
                editable: true,
            },
        ];
    }

    addClaimDetail() {
        if (this.incomingClaimDetails) {
            const lineValueMax = Math.max.apply(Math, this.incomingClaimDetails.map(function (o) {
                return o.ciebIncomingClaimDetailPrimaryKey.incomingLineNumber;
            }))
            const newLineValue = lineValueMax + 1;
            let dataArr: CiebIncomingClaimDetail = {
                billedAmt: 0,
                billedProcedure: "",
                billedQty: 0,
                ciebIncomingClaimDetailPrimaryKey: {
                    incomingLineNumber: newLineValue,
                    incomingSubLineCode: "N",
                    seqClaimid: this.seqClaimId
                },
                incurredBilledAmt: 0,
                incurredCurrencyCode: this.claimCurrency,
                incurredEuroBilledAmt: 0,
                incurredEuroExchRate: 0,
                incurredExchRate: 0,
                insertDatetime: "",
                insertProcess: "",
                insertUser: "",
                serviceDate: "",
                updateDatetime: "",
                updateProcess: "",
                updateUser: "",
                action: "new",
            };

            this.incomingClaimDetails.push(dataArr);
            this.dataGrid001GridOptions.api.setRowData(this.incomingClaimDetails);
        } else {
            let data = [];
            let customTable = {
                'select' : '',
                'ciebIncomingClaimDetailPrimaryKey.incomingLineNumber' : '',
                'serviceDate' : '',
                'billedProcedure': '',
                'billedQty' : '',
                'incurredBilledAmt' : '',
                'threshold': '',
                'incurredCurrencyCode': '',
                'incurredEuroExchRate': '',
                'billedAmt': ''
            };
            data.push(customTable)
            this.dataGrid001GridOptions.api.setRowData(data);
            this.dataGrid001GridOptions.api.selectIndex(data.length - 1, false, false)
        }

    }

    onCellEditingStopped(e) {
        if (this.incomingClaimDetails[e.rowIndex].action == null) {
            this.incomingClaimDetails[e.rowIndex].action = 'update';
        } else if (this.incomingClaimDetails[e.rowIndex].action == 'new') {
            this.incomingClaimDetails[e.rowIndex].action = 'add';
        }
    }

    saveClaimDetail() {
        let records: CiebIncomingClaimDetail[] = [];
        records = this.incomingClaimDetails.filter(record =>
            record.action != null
        )
        this.ciebIncomingClaimDetailService.updateByAction(records).subscribe((res) => {
            this.fetchData();
        })
    }

    editCurrency() {
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            'Message from webpage',
            'You are trying to edit the currency of the claim. Save the F12 again in order for the updated currency to reflect. Make the following updates if necessary Incurred country, Re-adjudicate new charges, Re-invoke F9. Hit OK to Continue or Cancel.', 'icon');
        popUpMessage.buttons = [
            new PopUpMessageButton('Ok', 'OK', 'btn btn-primary'),
            new PopUpMessageButton('no', 'Cancel', 'btn btn-primary')
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    deleteClaimDetail() {
        this.dataGrid001GridOptions.api.removeItems(this.dataGrid001GridOptions.api.getSelectedNodes());
        this.dataGrid001GridOptions.api.getSelectedNodes().forEach((detail) => {
            this.incomingClaimDetails[detail.rowIndex].action = 'delete';
        })
        this.saveClaimDetail();
    }

    modalClose = () => {
        this.activeModal.close();
    }

    changeRelatedDropdown(event: any) {
        this.localCurrencyConversionForm.patchValue({
            'currencyCode': event.target.value,
            'currencyCodeDesc': event.target.value
        }, {emitEvent: false});
    }

    private getInstClaimHeaderByClaimNumber(value: any) {
        this.instClaimHeaderService.findByClaimNumber(value).subscribe((res) => {
            if (res) {
                this.instClaimHeader = res;
                this.imageNumber = res.userDefined2;
                this.incrdCntry = res.userDefined1;
                this.seqGroupId = res.seqGroupId;
                this.localCurrencyConversionForm.patchValue({
                    'currencyCode': 'USD',
                    'currencyCodeDesc': 'USD'
                }, {emitEvent: false});
            }
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

        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin) => {
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
        this.createDataGrid001();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.localCurrencyConversionForm);
        if (this.seqClaimId) {
            this.ciebIncomingClaimDetailService.getCiebIncomingClaimDetailBySeqId(this.seqClaimId).subscribe((res) => {
                this.incomingClaimDetails = res;
                if (res) {
                    this.incomingClaimDetails.forEach((detail => {
                        detail.action = null;
                    }))
                    this.dataGrid001GridOptions.api.setRowData(this.incomingClaimDetails);
                } else {
                    this.dataGrid001GridOptions.api.setRowData([]);
                }
            })
        }
        setTimeout(() => {
            this.addInovice()
        }, 3000)
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("PROFSVC_CLAIM_HEADER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    };

    getSecWin(secUserId: string) {
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        "You are not Permitted to view Professional Claim Details",
                        "Detail File Permission"
                    );
                }
            });
    }
}