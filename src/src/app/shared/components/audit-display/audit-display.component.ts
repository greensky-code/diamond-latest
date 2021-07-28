import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { DddwDtl, GroupMaster, MemberEligHistory, MemberMaster } from '../../../api-models';
import { AuditChangeDtl } from '../../../api-models/audit-change-dtl.model';
import { AuditHdr } from '../../../api-models/audit-hdr';
import { DddwDtlService, GroupMasterService } from '../../../api-services';
import { AuditChangeDtlService } from '../../../api-services/audit-change-dtl.service';
import { AuditHdrService } from '../../../api-services/audit-hdr.service';
import { DatePickerConfig, datePickerModel } from '../../config';
import { Menu, SearchModel } from '../../models/models';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Mask } from '../../pipes/text-format.pipe';
import { CONSTANTS } from '../../services/shared.service';
import { ToastService } from '../../services/toast.service';
import { CustomValidators } from '../../validators/custom-validator';
import { FormValidation } from '../../validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../alert-message';
import { PopUpMessage, PopUpMessageButton } from '../pop-up-message';
import { PopUpMessageComponent } from '../pop-up-message/pop-up-message/pop-up-message.component';

@Component({
    selector: 'app-audit-display',
    templateUrl: './audit-display.component.html',
    styleUrls: ['./audit-display.component.css']
})
export class AuditDisplayComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro

    @Input() winID?: string;
    @Input() win?: string;
    @Input() keyNames?: string;
    @Input() keyValues?: string;

    auditForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    datePickerConfig = DatePickerConfig;
    datePickerModel = datePickerModel;


    public popUpMessage: PopUpMessage;
    @Input() showIcon: boolean = false;
    menu: Menu[] = [];
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    auditHdrs: AuditHdr[] = [];
    auditChangeDtls:AuditChangeDtl[]=[];
    dddwDtls: DddwDtl[] = [];
    actionName:string="";

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
                headerName: "Audited Table",
                field: "auditedTableName",
                width: 230,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "User",
                field: "modifyingUserId",
                width: 150
            },
            {
                headerName: "Process",
                field: "modifyingProcessId",
                width: 150
            },
            {
                headerName: "Audit Date",
                field: "auditTms",
                width: 150
            },
            {
                headerName: "Action",
                field: "databaseAction",
                width: 150
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
                headerName: "Column Name",
                field: "auditChangeDtlPrimaryKey.auditedColumnName",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Previous Value",
                field: "previousValue",
                width: 150
            },
            {
                headerName: "Current Value",
                field: "currentValue",
                width: 150
            }
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private dddwDtlService: DddwDtlService,
        private currencyPipe: CurrencyPipe,
        private auditHdrService: AuditHdrService,
        private auditChangeDtlService:AuditChangeDtlService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.auditForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.getDatabasesAction();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
            this.setAuditValues();
        });
    }

    ngAfterViewInit(): void {
    }

    setAuditValues() {
        this.auditForm.patchValue({
            winID: this.winID,
            keyNames: this.keyNames,
            keyValues: this.keyValues,
            win: this.win
        });
        this.getAuditHdrs(this.keyValues, this.winID);
    }


    createForm() {
        this.auditForm = this.formBuilder.group({
            winID: ['', { updateOn: 'blur', validators: [] }],
            win: ['', { updateOn: 'blur', validators: [] }],
            keyNames: ['', { updateOn: 'blur', validators: [] }],
            keyValues: ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    getAuditHdrs(keyValues: string, keyword: string) {
        this.auditHdrs = [];
        
        this.auditHdrService.getAuditHdrsByAuditedRecordKeyAndKeyword(keyValues, keyword).subscribe(response => {
            this.auditHdrs = response;
            if (this.auditHdrs!==null) {
                for(let i=0;i<this.auditHdrs.length;i++){
                    this.getDatabaseActionByType(this.auditHdrs[i].databaseAction);
                    this.auditHdrs[i].databaseAction=this.actionName;
                }
                this.dataGrid001GridOptions.api.setRowData(this.auditHdrs);
            } else {
                this.dataGrid001GridOptions.api.setRowData([]);
            }
            setTimeout(() => {
                //this.dataGrid002GridOptions.api.setRowData([]);
               this.getAuditChangeDetail(this.auditHdrs[0].seqAuditId);
            });

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
        });

    }


    getAuditChangeDetail(auditId:any){
        this.auditChangeDtls = [];

        this.dataGrid002GridOptions.api.setRowData([]);
        this.auditChangeDtlService.findBySeqAuditId(auditId).subscribe(response => {
            this.auditChangeDtls = response;
            if (this.auditChangeDtls!==null) {
                this.dataGrid002GridOptions.api.setRowData(this.auditChangeDtls);
            } else {
                this.dataGrid002GridOptions.api.setRowData([]);
            }
        }, error => {
            //this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
        });

    }

    onSelectionChanged(){
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if (selectedRows.length > 0) {
            this.getAuditChangeDetail(selectedRows[0].seqAuditId);
        } else {
            this.dataGrid002GridOptions.api.setRowData([]);
        }
    }

    getDatabasesAction(){
        this.dddwDtls=[];
        this.dddwDtlService.findByColumnNameAndDwname('database_action','dw_audit_hdr').subscribe(dddwDtls => {
            this.dddwDtls = dddwDtls;
        });
    }

    getDatabaseActionByType(type:any){
        this.dddwDtls.forEach(dddwDtl => {
            if (dddwDtl.dddwDtlPrimaryKey.dataVal === type) {
                this.actionName=dddwDtl.dddwDtlPrimaryKey.displayVal;
            }
        });
    }
}
