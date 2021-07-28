/* Copyright (c) 2020 . All Rights Reserved. */

import { Component, EventEmitter, Input, OnInit, Output, SystemJsNgModuleLoader, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { DatePickerConfig } from '../../../shared/config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitPackageDetailService, BenefitPackageMasterService, MessageMasterDtlService } from '../../../api-services';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { BenefitPackageDetail, MessageMasterDtl } from '../../../api-models';
import { Form } from '../../../shared/helpers/form.helper';
import { Console } from 'console';
import { BenefitRuleStatus } from '../../../api-models/common/benefit-rule-status';
import { MessageType } from '../../../shared/components/count-down-pop-up-message';
import { SharedService } from '../../../shared/services/shared.service';

// Use the Component directive to define the CopyBenefitPackageComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'copybenefitpackage',
    templateUrl: './copy-benefit-package.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        BenefitPackageDetailService,
        BenefitPackageMasterService
    ]

})
export class CopyBenefitPackageComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    copyBenefitPackageForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    benefitPackageDetails: any[] = [];
    benefitPackages: any;
    @Input() showIcon: boolean = false;
    @Input() selectedBenefitPackage: any;
    @Input() allBenefitPackages: any;
    @Output() buttonclickEvent = new EventEmitter<string>();
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    benefitPackageDetailsTemp: BenefitPackageDetail[];
    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
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



    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
        };
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
                headerName: "Benefit Package ID",
                field: "benefitPackageId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Description",
                field: "shortDescription",
                width: 200
            }
        ];
    }
    createDataGrid002(): void {
        this.dataGrid002GridOptions =
        {
            paginationPageSize: 50,
            rowSelection: 'multiple'
        };
        this.dataGrid002GridOptions.editType = 'fullRow';
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Rule ID",
                field: "benefitRule.ruleId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Type",
                field: "benefitRule.ruleType",
                width: 200
            },
            {
                headerName: "Description",
                field: "benefitRule.shortDescription",
                width: 200
            },
            {
                headerName: "Proc Order",
                field: "processingOrder",
                width: 200
            },
            {
                headerName: "Proc Seq",
                field: "processingSequence",
                width: 200
            },
            {
                headerName: "Start Date",
                field: "startDate",
                width: 200
            },
            {
                headerName: "End Date",
                field: "endDate",
                width: 200
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        private toastr: ToastService,
        public benefitPackageDetailService: BenefitPackageDetailService,
        public benefitPackageMasterService: BenefitPackageMasterService,
        private messageService: MessageMasterDtlService,
        private sharedService: SharedService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.getBenefitPackageDetailTemp(this.selectedBenefitPackage.benefitPackageId);
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.copyBenefitPackageForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {

            if (this.allBenefitPackages) {
                this.benefitPackages = this.selectedBenefitPackage ?
                    this.allBenefitPackages.filter(bp => bp.benefitPackageId !== this.selectedBenefitPackage.benefitPackageId)
                    : this.allBenefitPackages;
                this.dataGrid001GridOptions.api.setRowData(this.benefitPackages);
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                this.Grid1SelectionChange();
            }
            this.dataGrid002GridOptions.api.setRowData([]);
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.copyBenefitPackageForm = this.formBuilder.group({
            textbox001: ['', { updateOn: 'blur', validators: [] }],
            textbox002: ['', { updateOn: 'blur', validators: [] }],
            textbox003: ['', { updateOn: 'blur', validators: [] }],
            selectThePackageAndRulesY: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    Grid1SelectionChange() {
        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            this.selectedBenefitPackage = selectedRows[0];
            this.getBenefitPackageMaster(btoa(selectedRows[0].benefitPackageId));
            this.getBenefitPackageDetail(btoa(selectedRows[0].benefitPackageId));
        } else {
        }
    }

    getBenefitPackageMaster(benefitPackageId: string) {
        this.benefitPackageMasterService.getBenefitPackageMaster(benefitPackageId).subscribe(benefitPackageMaster => {
            this.selectedBenefitPackage = benefitPackageMaster;
        });
    }

    getBenefitPackageDetail(benefitPackageId: string) {
        this.benefitPackageDetails = [];
        this.benefitPackageDetailService.findByBenefitPackageId(benefitPackageId).subscribe(benefitPackageDetail => {

            if (benefitPackageDetail) {
                benefitPackageDetail.forEach(benefitPackageDetail => {

                    if ((benefitPackageDetail.processingOrder + "").length > 2) {
                        let processingSequence = (benefitPackageDetail.processingOrder + '').substring(2);
                        benefitPackageDetail = benefitPackageDetail;
                        benefitPackageDetail.processingSequence = processingSequence;
                        benefitPackageDetail.processingOrder = (benefitPackageDetail.processingOrder + '').substring(0, 2);;
                    } else {
                        benefitPackageDetail = benefitPackageDetail;
                        benefitPackageDetail.processingSequence = 0 + (benefitPackageDetail.processingOrder + '').substring(0, 2);;
                        benefitPackageDetail.processingOrder = null;
                    }
                    this.benefitPackageDetails.push(benefitPackageDetail);
                });
            }
            this.dataGrid002GridOptions.api.setRowData(this.benefitPackageDetails);
            if (this.benefitPackageDetails && this.benefitPackageDetails.length > 0) {
                this.dataGrid002GridOptions.api.selectAll();
            }
        });
    }

    deselectAll() {
        this.dataGrid002GridOptions.api.deselectAll();
    }

    selectAll() {
        this.dataGrid002GridOptions.api.selectAll();
    }
    updatedRows: any[] = [];
    selectedRowsLength: number;
    counter: number = 0;
    submit() {
        const rows: any = this.dataGrid002GridOptions.api.getSelectedRows();
        if (rows != null && rows.length > 0) {
            this.selectedRowsLength = rows.length;
            for (let i = 0; i < rows.length; i++) {

                let benefitRuleStatus = new BenefitRuleStatus();

                if (Form.getValue(this.copyBenefitPackageForm, 'textbox001')) {
                    rows[i].rider = Form.getValue(this.copyBenefitPackageForm, 'textbox001');
                }
                if (Form.getDateValue(this.copyBenefitPackageForm, 'textbox002')) {
                    rows[i].startDate = Form.getDateValue(this.copyBenefitPackageForm, 'textbox002');
                }
                if (Form.getDateValue(this.copyBenefitPackageForm, 'textbox003')) {
                    rows[i].endDate = Form.getDateValue(this.copyBenefitPackageForm, 'textbox003');
                }

                benefitRuleStatus = this.checkBenefitRuleExist(rows[i].benefitRule.ruleId);
                if (benefitRuleStatus.status) {
                    this.showPopUpForDetails(rows[i], benefitRuleStatus.maxProcessingOrderId, i);
                    break;
                } else {
                    let procOrder=rows[i].processingOrder+""+rows[i].processingSequence;
                    rows[i].processingOrder = procOrder;
                    this.updatedRows.push(rows[i]);
                    this.counter = this.counter + 1;
                }
                if (rows.length === this.counter) {
                    let copyRows: any;
                    copyRows = this.updatedRows;
                    this.buttonclickEvent.next(copyRows);
                    this.activeModal.close();
                }
            }
        } else {
            this.toastr.showToast('Please select at least one benefit package detail record', NgbToastType.Danger);
        }
    }

    getBenefitPackageDetailTemp(benefitPackageId: string) {
        this.benefitPackageDetailsTemp = [];
        this.benefitPackageDetailService.findByBenefitPackageId(btoa(benefitPackageId)).subscribe(benefitPackageDetail => {
            this.benefitPackageDetailsTemp = benefitPackageDetail;
        }, (error: any) => {
        });
    }

    showPopUpForDetails(benefitPackageDetail: any, maxProcessingOrderId: number, indexValue: number) {
        let status: boolean = false;
        this.messageService.findByMessageId(21227).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('saveBeforeExit', 'Benefit Package', '21227: ' + message[0].messageText, 'icon');
            popUpMessage.buttons = [
                new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('No', 'No', 'btn btn-primary')
            ];
            popUpMessage.messageType = MessageType.WARNING;
            let ref = this.sharedService.showDialogBox(popUpMessage);
            ref.buttonclickEvent.subscribe((event: any) => {
                if (event.name == 'Yes') {
                    let updatedValue = maxProcessingOrderId + 3;
                    benefitPackageDetail.processingOrder = updatedValue;
                    benefitPackageDetail.processingSequence = (updatedValue + "").slice(-3);
                    this.updatedRows.push(benefitPackageDetail);
                    this.benefitPackageDetailsTemp.push(benefitPackageDetail);
                    this.counter = this.counter + 1;
                    if (this.selectedRowsLength != this.counter) {
                        this.callCopyBenefitRows(indexValue + 1);
                    }
                    if (this.selectedRowsLength === this.counter) {
                        let copyRows: any;
                        copyRows = this.updatedRows;
                        this.buttonclickEvent.next(copyRows);
                        this.activeModal.close();
                    }
                } else {
                    this.counter=this.counter+1;
                    this.showPopUpBenefitRule(benefitPackageDetail,indexValue);
                }
            });
        });
    }

    callCopyBenefitRows(indexValue: number) {
        const rows: any = this.dataGrid002GridOptions.api.getSelectedRows();
        if (rows != null && rows.length > 0) {
            this.selectedRowsLength = rows.length;
            for (let i = indexValue; i < rows.length; i++) {

                let benefitRuleStatus = new BenefitRuleStatus();

                if (Form.getValue(this.copyBenefitPackageForm, 'textbox001')) {
                    rows[i].rider = Form.getValue(this.copyBenefitPackageForm, 'textbox001');
                }
                if (Form.getDateValue(this.copyBenefitPackageForm, 'textbox002')) {
                    rows[i].startDate = Form.getDateValue(this.copyBenefitPackageForm, 'textbox002');
                }
                if (Form.getDateValue(this.copyBenefitPackageForm, 'textbox003')) {
                    rows[i].endDate = Form.getDateValue(this.copyBenefitPackageForm, 'textbox003');
                }

                benefitRuleStatus = this.checkBenefitRuleExist(rows[i].benefitRule.ruleId);
                if (benefitRuleStatus.status) {
                    this.showPopUpForDetails(rows[i], benefitRuleStatus.maxProcessingOrderId, i);
                    break;
                } else {
                    let procOrder=rows[i].processingOrder+""+rows[i].processingSequence;
                    rows[i].processingOrder = procOrder;
                    this.updatedRows.push(rows[i]);
                    this.counter = this.counter + 1;
                }

                if (this.selectedRowsLength === this.counter) {
                    let copyRows: any;
                    copyRows = this.updatedRows;
                    this.buttonclickEvent.next(copyRows);
                    this.activeModal.close();
                }
            }

        }
    }


    showPopUpBenefitRule(benefitPackageDetail: any,indexValue:number) {
        let processingSequence = benefitPackageDetail.processingSequence;
        this.messageService.findByMessageId(21020).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('saveBeforeExit', 'Copy Benefit Package', '21020: ' + message[0].messageText.replace("@1", benefitPackageDetail.benefitRule.ruleId).replace("@2", processingSequence), 'icon');
            popUpMessage.buttons = [
                new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('No', 'No', 'btn btn-primary')
            ];
            popUpMessage.messageType = MessageType.WARNING;
            let ref = this.sharedService.showDialogBox(popUpMessage);
            ref.buttonclickEvent.subscribe((event: any) => {
                if (event.name == 'Yes') {
                    if(this.selectedRowsLength===this.counter){
                        this.activeModal.close();
                     }else{
                        this.callCopyBenefitRows(indexValue + 1);
                    }                
               
                } else {
                    if(this.selectedRowsLength===this.counter){
                        this.activeModal.close();
                     }else{
                        let copyRows: any;
                        copyRows = this.updatedRows;
                        this.buttonclickEvent.next(copyRows);
                        this.activeModal.close();
                    }       
                }
            });
        });
    }

    checkBenefitRuleExist(ruleId: string) {
        let benefitRuleStatus = new BenefitRuleStatus();
        let status: Boolean = false;
        let heightProessingOrder: number[] = [];
        if (this.benefitPackageDetailsTemp) {
            this.benefitPackageDetailsTemp.forEach(benefitPackageDetail => {
                if (benefitPackageDetail.benefitRule.ruleId === ruleId) {
                    heightProessingOrder.push(benefitPackageDetail.processingOrder);
                    status = true;
                }
            });
            if (heightProessingOrder.length > 0) {
                const maxPrcessing = heightProessingOrder.reduce((a, b) => Math.max(a, b));
                benefitRuleStatus.status = status;
                benefitRuleStatus.maxProcessingOrderId = maxPrcessing;
            }
        }
        return benefitRuleStatus;
    }
}
