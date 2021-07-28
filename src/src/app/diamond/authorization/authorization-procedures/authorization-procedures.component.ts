import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecUser} from '../../../api-models/index'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../../app/api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from "../../../shared/services/security.service";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {DddwDtlService, MessageMasterDtlService, SecUserService, SystemCodesService} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {Menu, SearchModel} from "../../../shared/models/models";
import {getAuthorizationProceduresComponentShortcutKeys} from "../../../shared/services/shared.service";
import {AuthProcedureService} from '../../../api-services/authorization/auth-procedure.service';
import {AuthProcedure} from '../../../api-models/authorization/auth-procedure.model'
import {AuthMaster} from '../../../api-models/authorization/auth-master.model';
import {AuthMasterService} from '../../../api-services/authorization/auth-master.service';
import {AuthProceduresMedDefCodeLookup} from '../../../shared/lookup/auth-proc-med-def-code-lookup';
import {AuthProceduresMasterLookup} from '../../../shared/lookup/auth-proc-auth-master-lookup';
import {AuthProceduresNdcLookup} from '../../../shared/lookup/auth-proc-ndc-lookup';
import {AuthProceduresPriceScheduleLookup} from '../../../shared/lookup/auth-proc-price-schedule-lookup';
import {AuthProceduresProcedureCodeLookup} from '../../../shared/lookup/auth-proc-procedure-code-lookup';
import {AuthProcedureSystemCode} from '../../../api-models/authorization/auth-proc-system-code.model';
import {AuthProceduresPriceRegionLookup} from '../../../shared/lookup/auth-proc-price-region-lookup';
import {AuthProceduresStatusReasonLookup} from '../../../shared/lookup/auth-proc-status-reason-lookup';
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {MemberMasterService} from "../../../api-services/member-master.service";

@Component({
    selector: 'app-authorization-procedures',
    templateUrl: './authorization-procedures.component.html',
    styleUrls: ['./authorization-procedures.component.css'],
    providers: [
        AlertMessageService,
        DatePipe,
        DateFormatPipe
    ]
})
export class AuthorizationProceduresComponent implements OnInit {

    authorizationProcedureForm: FormGroup;
    authorizationProcedureDetailForm: FormGroup;
    formValidation: FormValidation;
    formValidationDetail: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public secWin: SecWinViewModel;
    private windowId: string = 'PRCDR';
    public isSuperUser = false;
    public secProgress = true;
    memberModuleId = '';
    showFiledValues: boolean = false;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    userTemplateId: string;
    secColDetails: SecColDetail[] = [];

    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    public authGridGridOptions: GridOptions;
    public authDetailGridGridOptions: GridOptions;

    showAuthProcFields: boolean;
    authMaster: AuthMaster;
    authMasters: AuthMaster[] = [];
    editAuthProcedure: boolean = false;
    authProcedure: AuthProcedure;
    authProcedures: AuthProcedure[] = [];
    ts: AuthProcedureSystemCode[] = [];
    surfs: AuthProcedureSystemCode[] = [];
    archs: AuthProcedureSystemCode[] = [];
    quads: AuthProcedureSystemCode[] = [];
    oralCavs: AuthProcedureSystemCode[] = [];
    paperWorks: any[] = [];
    statuss: any[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    constructor(private formBuilder: FormBuilder,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private authMasterService: AuthMasterService,
        private authProcedureService: AuthProcedureService,
        private dddwDtlService: DddwDtlService,
        private systemCodesService: SystemCodesService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private memberEligHistoryService: MemberEligHistoryService,
        private memberMasterService: MemberMasterService,
        private MemberEligHistoryService: MemberEligHistoryService,
        private toastService: ToastService) {

    }

    ngOnInit(): void {
        this.initializePermission();
        this.menuInit();
        this.createAuthForm();
        this.createAuthDetailForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authorizationProcedureForm);
        this.formValidationDetail = new FormValidation(this.authorizationProcedureDetailForm);
        this.createAuthDataGrid();
        this.createAuthDetailDataGrid();
        this.getT();
        this.getSurf();
        this.getArch();
        this.getQuad();
        this.getOralCav();
        this.getPaperWork();
        this.getStatus();
        setTimeout(() => {
            this.authDetailGridGridOptions.api.setRowData([]);
            this.authGridGridOptions.api.setRowData([]);
        }, 100);

    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthorizationProceduresComponentShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }
        //to check function level security
    };

    createAuthForm() {
        this.authorizationProcedureForm = this.formBuilder.group({
            authNumber: ['', { updateOn: 'blur', validators: [] }],
            secondaryAuthNo: ['', { updateOn: 'blur', validators: [] }],
            // Auth
            reqDate: ['', { updateOn: 'blur', validators: [] }],
            authType: ['', { updateOn: 'blur', validators: [] }],
            authLevel: ['', { updateOn: 'blur', validators: [] }],
            pcpId: ['', { updateOn: 'blur', validators: [] }],
            diamondId: ['', { updateOn: 'blur', validators: [] }],
            tplCode: ['', { updateOn: 'blur', validators: [] }],
            lob: ['', { updateOn: 'blur', validators: [] }],
            privacyMayApply: ['', { updateOn: 'blur', validators: [] }],
            memberId: ['', { updateOn: 'blur', validators: [] }],
            memberId1: ['', { updateOn: 'blur', validators: [] }],
            memberId2: ['', { updateOn: 'blur', validators: [] }],
            memberId3: ['', { updateOn: 'blur', validators: [] }],
            age: ['', { updateOn: 'blur', validators: [] }],
            sex: ['', { updateOn: 'blur', validators: [] }],
            groupId: ['', { updateOn: 'blur', validators: [] }],
            groupId1: ['', { updateOn: 'blur', validators: [] }],
            planCode: ['', { updateOn: 'blur', validators: [] }],
            nonSysSubscriberId: ['', { updateOn: 'blur', validators: [] }],
            certificationType: ['', { updateOn: 'blur', validators: [] }],
            paperworkAttached: ['', { updateOn: 'blur', validators: [] }],
            batchId: ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });
    };

    createAuthDetailForm() {
        this.authorizationProcedureDetailForm = this.formBuilder.group({
            // Auth Detail
            fromDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
            thruDate: ['', { updateOn: 'blur', validators: [] }],
            t: ['', { updateOn: 'blur', validators: [] }],
            surf: ['', { updateOn: 'blur', validators: [] }],
            surf1: ['', { updateOn: 'blur', validators: [] }],
            surf2: ['', { updateOn: 'blur', validators: [] }],
            surf3: ['', { updateOn: 'blur', validators: [] }],
            surf4: ['', { updateOn: 'blur', validators: [] }],
            arch: ['', { updateOn: 'blur', validators: [] }],
            quad: ['', { updateOn: 'blur', validators: [] }],
            oralCav: ['', { updateOn: 'blur', validators: [] }],
            procedureCode: ['', { updateOn: 'blur', validators: [] }],
            ndc: ['', { updateOn: 'blur', validators: [] }],
            medDefCode: ['', { updateOn: 'blur', validators: [] }],
            reqQty: ['', { updateOn: 'blur', validators: [] }],
            reqAmt: ['', { updateOn: 'blur', validators: [] }],
            purchasePrice: ['', { updateOn: 'blur', validators: [] }],
            authQty: ['', { updateOn: 'blur', validators: [] }],
            actualQty: ['', { updateOn: 'blur', validators: [] }],
            authAmt: ['', { updateOn: 'blur', validators: [] }],
            actualAmount: ['', { updateOn: 'blur', validators: [] }],
            costProcedure: ['', { updateOn: 'blur', validators: [] }],
            estCost: ['', { updateOn: 'blur', validators: [] }],
            priceSchedule: ['', { updateOn: 'blur', validators: [] }],
            priceRegion: ['', { updateOn: 'blur', validators: [] }],
            status: ['', { updateOn: 'blur', validators: [] }],
            date: ['', { updateOn: 'blur', validators: [] }],
            statusReason: ['', { updateOn: 'blur', validators: [] }],
            paperworkAttached1: ['', { updateOn: 'blur', validators: [] }],
            denialNotifn: ['', { updateOn: 'blur', validators: [] }],
            notificationDate: ['', { updateOn: 'blur', validators: [] }],
            provType: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });

        this.authorizationProcedureDetailForm.controls['surf1'].disable();
        this.authorizationProcedureDetailForm.controls['surf2'].disable();
        this.authorizationProcedureDetailForm.controls['surf3'].disable();
        this.authorizationProcedureDetailForm.controls['surf4'].disable();
        this.authorizationProcedureDetailForm.controls['statusReason'].disable();
    };

    createNew() {
        this.createAuthDetailForm();
        this.authDetailGridGridOptions.api.deselectAll();
        this.showAuthProcFields = true;
        this.editAuthProcedure = false;
        this.authorizationProcedureDetailForm.reset();
        this.authorizationProcedureDetailForm.controls['surf1'].disable();
        this.authorizationProcedureDetailForm.controls['surf2'].disable();
        this.authorizationProcedureDetailForm.controls['surf3'].disable();
        this.authorizationProcedureDetailForm.controls['surf4'].disable();
        this.authorizationProcedureDetailForm.controls['authQty'].setValue(1);
        this.authorizationProcedureDetailForm.controls['actualQty'].setValue(0);
        this.authorizationProcedureDetailForm.controls['authAmt'].setValue(0);
        this.authorizationProcedureDetailForm.controls['actualAmount'].setValue(0);
        this.authorizationProcedureDetailForm.controls['estCost'].setValue(0);
        this.authorizationProcedureDetailForm.controls['status'].setValue("OP");
        this.authorizationProcedureDetailForm.controls['paperworkAttached1'].setValue("N");
        this.authorizationProcedureDetailForm.controls['denialNotifn'].setValue("N");
    }

    //#region Auth Grid----------

    createAuthDataGrid(): void {
        this.authGridGridOptions =
        {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.authGridGridOptions.editType = 'fullRow';
        this.authGridGridOptions.columnDefs = [
            {
                headerName: "Auth Number",
                field: "authMasterPrimaryKey.authNumber",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Secondary",
                field: "authMasterPrimaryKey.secondaryAuthNo",
                width: 130
            },
            {
                headerName: "Req. Date",
                field: "requestedDate",
                width: 140
            },
            {
                headerName: "Type",
                field: "authType",
                width: 120
            },
            {
                headerName: "Ext",
                field: "activeDaysVisit",
                width: 100
            },
            {
                headerName: "Member ID",
                field: "",
                width: 160,
                valueGetter :(data)=>{
                    if(data.data.memberEligHistory.subscriberId)
                    {
                        return data.data.memberEligHistory.subscriberId + '   ' + data.data.memberEligHistory.personNumber;
                    }

                }
            },
            {
                headerName: "Diamond ID",
                field: "diamondId",
                width: 130
            },
            {
                headerName: "Group ID",
                field: "memberEligHistory.groupId",
                width: 130
            },
            {
                headerName: "Plan Code",
                field: "memberEligHistory.planCode",
                width: 130
            }
        ];
    };

    authOnSelectionChanged() {
        var selectedRows = this.authGridGridOptions.api.getSelectedRows();
        document.querySelector('#selectedRows').innerHTML =
            selectedRows.length === 1 ? selectedRows[0].athlete : '';
    }

    authOnReady() {
        this.authGridGridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
        //   params.api.sizeColumnsToFit();
    }

    //#endregion

    //#region Auth Detail Grid---------

    createAuthDetailDataGrid(): void {
        this.authDetailGridGridOptions =
        {
            paginationPageSize: 50,
            rowSelection: 'single'
        };
        this.authDetailGridGridOptions.editType = 'fullRow';
        this.authDetailGridGridOptions.columnDefs = [
            {
                headerName: "From Date",
                field: "fromDate",
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Thru Date",
                field: "thruDate",
                width: 135
            },
            {
                headerName: "Cost Proc Cd",
                field: "costProcedureCd",
                width: 135
            },
            {
                headerName: "Auth Qty",
                field: "authorizedQty",
                width: 135
            },
            {
                headerName: "Auth Amt",
                field: "allowedAmt",
                width: 135
            },
            {
                headerName: "Est Cost",
                field: "authorizedCost",
                width: 135
            },
            {
                headerName: "Status",
                field: "status",
                width: 135
            },
            {
                headerName: "Paperwork",
                field: "",
                width: 140,
                valueGetter: (data) => {
                    return data.data.paperworkAttached === 'N' ? 'No' : 'Yes';
                }
            }
        ];
    };

    authDetailOnSelectionChanged() {
        var selectedRows = this.authDetailGridGridOptions.api.getSelectedRows();
        document.querySelector('#selectedRows').innerHTML =
            selectedRows.length === 1 ? selectedRows[0].athlete : '';
    }

    authDetailOnReady(params: any) {
        this.authDetailGridGridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
        //   params.api.sizeColumnsToFit();
        this.authDetailOnRowClicked(this.authDetailGridGridOptions.api.getSelectedRows()[0]);
    }

    authDetailOnRowClicked(data: any) {
        var selectedRows = this.authDetailGridGridOptions.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            data = selectedRows[0];
            if (this.authorizationProcedureDetailForm.dirty) {
                this.showEditConfirmation();
            } else {
                this.showAuthProcFields = false;
                this.authProcedure = data;
                if (this.authProcedure != null) {

                    this.authorizationProcedureDetailForm.patchValue({
                        'fromDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.fromDate),
                        'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.thruDate),
                        't': this.authProcedure.toothNumber,
                        'surf': this.authProcedure.surface1,
                        'surf1': this.authProcedure.surface2,
                        'surf2': this.authProcedure.surface3,
                        'surf3': this.authProcedure.surface4,
                        'surf4': this.authProcedure.surface5,
                        'arch': this.authProcedure.arch,
                        'quad': this.authProcedure.quadrant,
                        'oralCav': this.authProcedure.oralCavity,
                        'procedureCode': this.authProcedure.authProcedures,
                        'ndc': this.authProcedure.ndcCode,
                        'medDefCode': this.authProcedure.medDefCode,
                        'reqQty': this.authProcedure.requestedQty,
                        'reqAmt': this.authProcedure.requestedAmount,
                        'purchasePrice': this.authProcedure.purchasePrice,
                        'authQty': this.authProcedure.authorizedQty,
                        'actualQty': this.authProcedure.actualQty,
                        'authAmt': this.authProcedure.allowedAmt,
                        'actualAmount': this.authProcedure.actualAmt,
                        'costProcedure': this.authProcedure.costProcedureCd,
                        'estCost': this.authProcedure.authorizedCost,
                        'priceSchedule': this.authProcedure.priceSchedule,
                        'priceRegion': this.authProcedure.priceRegion,
                        'status': this.authProcedure.status,
                        'date': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.statusDate),
                        'statusReason': this.authProcedure.statusReason,
                        'paperworkAttached': this.authProcedure.paperworkAttached,
                        'denialNotifn': this.authProcedure.denialNotification,
                        'notificationDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.notificationDate),
                        // 'provType': this.authProcedure.batchId,
                    });
                }
                this.editAuthProcedure = true;
            }
        }
    }

    //#endregion


    //#region Lookup

    searchAuthNoModel = new SearchModel('authmasters/lookup',
        AuthProceduresMasterLookup.AUTH_PROCEDURES_RULE_DEFAULT,
        AuthProceduresMasterLookup.AUTH_PROCEDURES_RULE_ALL,
        []);

    onF5KeyAuthNumber(event) {
        let value =event.target.value;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupAuthNoSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (value === '') {
                this.messageService.findByMessageId(9853).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp("9853: " + message[0].messageText, 'Authorization Procedures')
                });
            }
            else {
                this.getAuthProcedureRule(value);
            }
        }
    }

    openLookupAuthNoSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchAuthNoModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authMaster = res;
            this.getAuthProcedureRule(this.authMaster.authMasterPrimaryKey.authNumber);
            this.authorizationProcedureForm.patchValue({
                'authNumber' : res.authMasterPrimaryKey.authNumber
            });
            this.authorizationProcedureForm.get('authNumber').disable();
            this.editAuthProcedure = true;
            this.popUpMessage = null;
        })
    };

    onTabKeyAuthNumber(value: any) {

    }
    searchMedDefCodeModel = new SearchModel('meddefncodes/lookup',
        AuthProceduresMedDefCodeLookup.AUTH_PROCEDURES_MEDDEFCODE_DEFAULT,
        AuthProceduresMedDefCodeLookup.AUTH_PROCEDURES_MEDDEFCODE_ALL,
        []);

    onF5KeyMedDefCode() {
        this.openLookupMedDefCodeSearchModel();
    }

    openLookupMedDefCodeSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchMedDefCodeModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'medDefCode': res.medDefCode
            });
            this.popUpMessage = null;
        })
    }

    searchProcedureCodeModel = new SearchModel('procedurecodemasters/lookup',
        AuthProceduresProcedureCodeLookup.AUTH_PROCEDURES_PROCCODE_DEFAULT,
        AuthProceduresProcedureCodeLookup.AUTH_PROCEDURES_PROCCODE_ALL,
        []);

    onF5KeyProcedureCode() {
        this.openLookupProcedureCodeSearchModel();
    }

    openLookupProcedureCodeSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchProcedureCodeModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'procedureCode': res.procedureCode
            });
            this.popUpMessage = null;
        })
    }

    searchNdcModel = new SearchModel('ndccodemasters/lookup',
        AuthProceduresNdcLookup.AUTH_PROCEDURES_NDC_DEFAULT,
        AuthProceduresNdcLookup.AUTH_PROCEDURES_NDC_ALL,
        []);

    onF5KeyNdc() {
        this.openLookupNdcSearchModel();
    }

    openLookupNdcSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchNdcModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'ndc': res.ndc
            });
            this.popUpMessage = null;
        })
    }

    onF5KeyCostProcedure() {
        this.openLookupCostProcedureSearchModel();
    }

    openLookupCostProcedureSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchProcedureCodeModel; //use ProcedureCodeModel for CostProcedure
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'costProcedure': res.procedureCode
            });
            this.popUpMessage = null;
        })
    }

    searchPriceScheduleModel = new SearchModel('priceschedulemasters/lookup',
        AuthProceduresPriceScheduleLookup.AUTH_PROCEDURES_PRICESCHDULE_DEFAULT,
        AuthProceduresPriceScheduleLookup.AUTH_PROCEDURES_PRICESCHDULE_ALL,
        []);

    onF5KeyPriceSchedule() {
        this.openLookupPriceScheduleSearchModel();
    }

    openLookupPriceScheduleSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchPriceScheduleModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'priceSchedule': res.priceSchedule
            });
            this.popUpMessage = null;
        })
    }

    searchPriceRegionModel = new SearchModel('regionmasters/lookup',
        AuthProceduresPriceRegionLookup.AUTH_PROCEDURES_PRICEREGION_DEFAULT,
        AuthProceduresPriceRegionLookup.AUTH_PROCEDURES_PRICEREGION_ALL,
        []);

    onF5KeyPriceRegion() {
        this.openLookupPriceRegionSearchModel();
    }

    openLookupPriceRegionSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchPriceRegionModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'priceRegion': res.regionMasterPrimaryKey.regionType
            });
            this.popUpMessage = null;
        })
    }

    searchStatusReasonModel = new SearchModel('reasoncodemasters/status-reason/lookup',
        AuthProceduresStatusReasonLookup.AUTH_PROCEDURES_STATUSREASON_DEFAULT,
        AuthProceduresStatusReasonLookup.AUTH_PROCEDURES_STATUSREASON_ALL,
        []);

    onF5KeyStatusReason() {
        this.openLookupStatusReasonSearchModel();
    }

    openLookupStatusReasonSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchStatusReasonModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.authorizationProcedureDetailForm.patchValue({
                'statusReason': res.reasonCode
            });
            this.popUpMessage = null;
        })
    }

    //#endregion


    //#region DropDown



    getT() {
        this.systemCodesService.getSystemCodesByLangAndtype('DNCLMTOOTH', '0').subscribe((sysCode: any) => {
            this.ts.length = 0;
            this.ts = sysCode;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getSurf() {
        this.systemCodesService.getSystemCodesByLangAndtype('DNCLMSURFACE', '0').subscribe((sysCode: any) => {
            this.surfs.length = 0;
            this.surfs = sysCode;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getArch() {
        this.systemCodesService.getSystemCodesByLangAndtype('DNCLMARCH', '0').subscribe((sysCode: any) => {
            this.archs.length = 0;
            this.archs = sysCode;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getQuad() {
        this.systemCodesService.getSystemCodesByLangAndtype('DNCLMQUADRANT', '0').subscribe((sysCode: any) => {
            this.quads.length = 0;
            this.quads = sysCode;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getOralCav() {
        this.systemCodesService.getSystemCodesByLangAndtype('DNCLMORALCAV', '0').subscribe((sysCode: any) => {
            this.oralCavs.length = 0;
            this.oralCavs = sysCode;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getPaperWork() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('paperwork_attached', 'dw_auths_procedure_de', 0).subscribe((papWork: any) => {
            this.paperWorks.length = 0;
            this.paperWorks = papWork;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getStatus() {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('status', 'dw_auths_procedure_de', 0).subscribe((sta: any) => {
            this.statuss.length = 0;
            this.statuss = sta;
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    //#endregion



    getAuthProcedureRule(authNumber: number) {
        this.authorizationProcedureForm.get('authNumber').disable();
        this.authMasterService.getAuthMaster(authNumber).subscribe(authProcMas => {
            this.authMasters.length = 0;
            for (let item of authProcMas) {
                item.activeDaysVisit = item.activeDaysVisit ? 'Yes' : 'No';
            }
            this.authMasters = authProcMas;

            this.showFiledValues = true;
            this.authMaster = this.authMasters[0];
            if (this.authMaster.memberEligHistory.subscriberId) {
                this.memberMasterService.findBySubscriberId(this.authMaster.memberEligHistory.subscriberId).subscribe(res => {
                    let memberMasterData = res[0];
                    this.MemberEligHistoryService.getSelectMemberGrid(memberMasterData.seqSubsId).subscribe(resp => {
                        let memberEligHistroyData = resp[0];
                        this.memberEligHistoryService
                            .getMember_bavc(memberEligHistroyData.seqSubsId).subscribe(response => {
                            let memberBavcData = response[0];
                            this.authorizationProcedureForm.patchValue({
                                'authNumber': authNumber,
                                'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                                'authType': this.authMaster.authType,
                                'authLevel': this.authMaster.authLevel,
                                'pcpid': this.authMaster.requestedDate,
                                // 'diamondId': this.authMaster.memberMaster.diamondId,
                                'tplCode': this.authMaster.tplCode == "NA" ? "Not Applicable" : this.authMaster.tplCode, //drp down
                                'lob': this.authMaster.memberEligHistory.lineOfBusiness,
                                'privacyMayApply': this.authMaster.privacyApplied,
                                'memberId': this.authMaster.memberEligHistory.subscriberId,
                                'memberId1': this.authMaster.memberEligHistory.personNumber,
                                'memberId2': memberMasterData.lastName,
                                'memberId3': memberMasterData.firstName,
                                'age': this.authMaster.memberAge,
                                'sex': this.authMaster.memberGender,
                                'groupId': memberEligHistroyData.groupId,
                                'groupId1': memberBavcData.short_name,
                                'planCode': memberBavcData.plan_code,
                                'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                                'certificationType': this.authMaster.certificationType === '3' ? 'Cancel' : this.authMaster.certificationType, // Drop Down
                                'paperworkAttached': this.authMaster.paperworkAttached === 'N' ? 'None' : this.authMaster.paperworkAttached,   // Drop Down
                                'batchId': this.authMaster.batchId,
                            });
                            this.authMasters[0].memberEligHistory.groupId = memberEligHistroyData.groupId;
                            this.authGridGridOptions.api.setRowData(this.authMasters);
                            this.authGridGridOptions.api.selectIndex(0, false, false);
                            this.getAuthProcedureRuleDetails();
                        })

                    })
                })
            } else {
                this.authorizationProcedureForm.patchValue({
                    'authNumber': authNumber,
                    'reqDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authMaster.requestedDate),
                    'authType': this.authMaster.authType,
                    'authLevel': this.authMaster.authLevel,
                    'pcpid': this.authMaster.requestedDate,
                    // 'diamondId': this.authMaster.memberMaster.diamondId,
                    'tplCode': this.authMaster.tplCode == "NA" ? "Not Applicable" : this.authMaster.tplCode, //drp down
                    'lob': this.authMaster.memberEligHistory.lineOfBusiness,
                    'privacyMayApply': this.authMaster.privacyApplied,
                    'memberId': this.authMaster.memberEligHistory.subscriberId,
                    'memberId1': this.authMaster.memberEligHistory.personNumber,
                    'age': this.authMaster.memberAge,
                    'sex': this.authMaster.memberGender,
                    'nonSysSubscriberId': this.authMaster.nsSubscriberId,
                    'certificationType': this.authMaster.certificationType === '3' ? 'Cancel' : this.authMaster.certificationType, // Drop Down
                    'paperworkAttached': this.authMaster.paperworkAttached === 'N' ? 'None' : this.authMaster.paperworkAttached,   // Drop Down
                    'batchId': this.authMaster.batchId,
                });
                this.authGridGridOptions.api.setRowData(this.authMasters);
                this.authGridGridOptions.api.selectIndex(0, false, false);
                this.getAuthProcedureRuleDetails();
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    };

    getAuthProcedureRuleDetails() {
        this.authProcedureService.getAuthProcedure(this.authMaster.authMasterPrimaryKey.authNumber).subscribe(authProcDet => {
            if (this.authProcedures) {
                this.authProcedures.length = 0;
            }
            this.authProcedures = authProcDet;
            this.authDetailGridGridOptions.api.setRowData(this.authProcedures);

            this.showFiledValues = true;
            if (this.authProcedures && this.authProcedures.length > 0) {
                this.authProcedure = this.authProcedures[0];

                this.authorizationProcedureDetailForm.patchValue({
                    'fromDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.fromDate),
                    'thruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.thruDate),
                    't': this.authProcedure.toothNumber,
                    'surf': this.authProcedure.surface1,
                    'surf1': this.authProcedure.surface2,
                    'surf2': this.authProcedure.surface3,
                    'surf3': this.authProcedure.surface4,
                    'surf4': this.authProcedure.surface5,
                    'arch': this.authProcedure.arch,
                    'quad': this.authProcedure.quadrant,
                    'oralCav': this.authProcedure.oralCavity,
                    'procedureCode': this.authProcedure.authProcedures,
                    'ndc': this.authProcedure.ndcCode,
                    'medDefCode': this.authProcedure.medDefCode,
                    'reqQty': this.authProcedure.requestedQty,
                    'reqAmt': this.authProcedure.requestedAmount,
                    'purchasePrice': this.authProcedure.purchasePrice,
                    'authQty': this.authProcedure.authorizedQty,
                    'actualQty': this.authProcedure.actualQty,
                    'authAmt': this.authProcedure.allowedAmt,
                    'actualAmount': this.authProcedure.actualAmt,
                    'costProcedure': this.authProcedure.costProcedureCd,
                    'estCost': this.authProcedure.authorizedCost,
                    'priceSchedule': this.authProcedure.priceSchedule,
                    'priceRegion': this.authProcedure.priceRegion,
                    'status': this.authProcedure.status,
                    'date': this.dateFormatPipe.defaultDisplayDateFormat(this.authProcedure.statusDate),
                    'statusReason': this.authProcedure.statusReason,
                    'paperworkAttached1': this.authProcedure.paperworkAttached,
                    'denialNotifn': this.authProcedure.denialNotification,
                    'notificationDate': this.authProcedure.notificationDate,
                    // 'provType': this.authProcedure.batchId,
                });
                this.changeStatus(this.authProcedure.status);
                this.changeSurf(this.authProcedure.surface1, "surf");
                this.changeSurf(this.authProcedure.surface2, "surf1");
                this.changeSurf(this.authProcedure.surface3, "surf2");
                this.changeSurf(this.authProcedure.surface4, "surf3");
            }
            this.isFormDataModified();
        }, (error: any) => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });

    }

    changeSurf(value: string, controlName: string) {
        if (value == " ") {
            switch (controlName) {
                case 'surf':
                    this.authorizationProcedureDetailForm.controls['surf1'].disable();
                    break;

                case 'surf1':
                    this.authorizationProcedureDetailForm.controls['surf2'].disable();
                    break;

                case 'surf2':
                    this.authorizationProcedureDetailForm.controls['surf3'].disable();
                    break;

                case 'surf3':
                    this.authorizationProcedureDetailForm.controls['surf4'].disable();
                    break;

                default:
                    break;
            }
        } else {
            switch (controlName) {
                case 'surf':
                    this.authorizationProcedureDetailForm.controls['surf1'].enable();
                    break;

                case 'surf1':
                    this.authorizationProcedureDetailForm.controls['surf2'].enable();
                    break;

                case 'surf2':
                    this.authorizationProcedureDetailForm.controls['surf3'].enable();
                    break;

                case 'surf3':
                    this.authorizationProcedureDetailForm.controls['surf4'].enable();
                    break;

                default:
                    break;
            }
        }
    }

    changeStatus(value: string) {
        if (value == "OP") {
            this.authorizationProcedureDetailForm.controls['statusReason'].disable();
        } else {
            this.authorizationProcedureDetailForm.controls['statusReason'].enable();
        }
    }

    onKeyDenialNotifn(value: any) {
        console.log(value);
        if (value == "Y" || value == "N" || value == "y" || value == "n") {
            if (value == "y") {
                this.authorizationProcedureDetailForm.controls['denialNotifn'].setValue("Y");
            }
            if (value == "n") {
                this.authorizationProcedureDetailForm.controls['denialNotifn'].setValue("N");
            }
        } else if (value != "Shift") {
            this.authorizationProcedureDetailForm.controls.denialNotifn.reset();
        }
    }

    saveAuthProcedure() {
        if (this.editAuthProcedure) {
            this.updateAuthProcedure()
        } else {
            this.createAuthProcedure();
        }
    }

    createAuthProcedure() {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationProcedureDetailForm.valid) {
            this.authProcedure = new AuthProcedure();
            this.authProcedure.authProcedurePrimaryKey = { seqAuthDetail: null, secondaryAuthNo: this.authMaster.authMasterPrimaryKey.secondaryAuthNo, authNumber: this.authMaster.authMasterPrimaryKey.authNumber };
            this.authProcedure.fromDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'fromDate');
            this.authProcedure.thruDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'thruDate');
            this.authProcedure.toothNumber = Form.getValue(this.authorizationProcedureDetailForm, 't');
            this.authProcedure.surface1 = Form.getValue(this.authorizationProcedureDetailForm, 'surf');
            this.authProcedure.surface2 = Form.getValue(this.authorizationProcedureDetailForm, 'surf1');
            this.authProcedure.surface3 = Form.getValue(this.authorizationProcedureDetailForm, 'surf2');
            this.authProcedure.surface4 = Form.getValue(this.authorizationProcedureDetailForm, 'surf3');
            this.authProcedure.surface5 = Form.getValue(this.authorizationProcedureDetailForm, 'surf4');
            this.authProcedure.arch = Form.getValue(this.authorizationProcedureDetailForm, 'arch');
            this.authProcedure.quadrant = Form.getValue(this.authorizationProcedureDetailForm, 'quad');
            this.authProcedure.oralCavity = Form.getValue(this.authorizationProcedureDetailForm, 'oralCav');
            this.authProcedure.authProcedures = Form.getValue(this.authorizationProcedureDetailForm, 'procedureCode');
            this.authProcedure.ndcCode = Form.getValue(this.authorizationProcedureDetailForm, 'ndc');
            this.authProcedure.medDefCode = Form.getValue(this.authorizationProcedureDetailForm, 'medDefCode');
            this.authProcedure.requestedQty = Form.getValue(this.authorizationProcedureDetailForm, 'reqQty');
            this.authProcedure.requestedAmount = Form.getValue(this.authorizationProcedureDetailForm, 'reqAmt');
            this.authProcedure.purchasePrice = Form.getValue(this.authorizationProcedureDetailForm, 'purchasePrice');
            this.authProcedure.authorizedQty = Form.getValue(this.authorizationProcedureDetailForm, 'authQty');
            this.authProcedure.allowedAmt = Form.getValue(this.authorizationProcedureDetailForm, 'authAmt');
            this.authProcedure.costProcedureCd = Form.getValue(this.authorizationProcedureDetailForm, 'costProcedure');
            this.authProcedure.authorizedCost = Form.getValue(this.authorizationProcedureDetailForm, 'estCost');
            this.authProcedure.priceSchedule = Form.getValue(this.authorizationProcedureDetailForm, 'priceSchedule');
            this.authProcedure.priceRegion = Form.getValue(this.authorizationProcedureDetailForm, 'priceRegion');
            this.authProcedure.status = Form.getValue(this.authorizationProcedureDetailForm, 'status');
            this.authProcedure.statusDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'statusDate');
            this.authProcedure.statusReason = Form.getValue(this.authorizationProcedureDetailForm, 'statusReason');
            this.authProcedure.paperworkAttached = Form.getValue(this.authorizationProcedureDetailForm, 'paperworkAttached1');
            this.authProcedure.denialNotification = Form.getValue(this.authorizationProcedureDetailForm, 'denialNotifn');

            this.authProcedureService.createAuthProcedure(this.authProcedure).subscribe(response => {
                this.toastService.showToast("Record successfully created.", NgbToastType.Success);
                this.editAuthProcedure = false;
                this.authorizationProcedureDetailForm.reset();
                this.getAuthProcedureRuleDetails();
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            }, error => {
                this.toastService.showToast("An Error occurred while creating new record. Please check your entry.", NgbToastType.Danger);
            });

        } else {
            this.toastService.showToast("Some required information is missing or incomplete. Please correct your entries and try again.", NgbToastType.Danger);
        }
        // }
    }

    updateAuthProcedure() {
        debugger;
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.authorizationProcedureDetailForm.valid) {
            this.authProcedure.fromDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'fromDate');
            this.authProcedure.thruDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'thruDate');
            this.authProcedure.toothNumber = Form.getValue(this.authorizationProcedureDetailForm, 't');
            this.authProcedure.surface1 = Form.getValue(this.authorizationProcedureDetailForm, 'surf');
            this.authProcedure.surface2 = Form.getValue(this.authorizationProcedureDetailForm, 'surf1');
            this.authProcedure.surface3 = Form.getValue(this.authorizationProcedureDetailForm, 'surf2');
            this.authProcedure.surface4 = Form.getValue(this.authorizationProcedureDetailForm, 'surf3');
            this.authProcedure.surface5 = Form.getValue(this.authorizationProcedureDetailForm, 'surf4');
            this.authProcedure.arch = Form.getValue(this.authorizationProcedureDetailForm, 'arch');
            this.authProcedure.quadrant = Form.getValue(this.authorizationProcedureDetailForm, 'quad');
            this.authProcedure.oralCavity = Form.getValue(this.authorizationProcedureDetailForm, 'oralCav');
            this.authProcedure.authProcedures = Form.getValue(this.authorizationProcedureDetailForm, 'procedureCode');
            this.authProcedure.ndcCode = Form.getValue(this.authorizationProcedureDetailForm, 'ndc');
            this.authProcedure.medDefCode = Form.getValue(this.authorizationProcedureDetailForm, 'medDefCode');
            this.authProcedure.requestedQty = Form.getValue(this.authorizationProcedureDetailForm, 'reqQty');
            this.authProcedure.requestedAmount = Form.getValue(this.authorizationProcedureDetailForm, 'reqAmt');
            this.authProcedure.authorizedQty = Form.getValue(this.authorizationProcedureDetailForm, 'authQty');
            this.authProcedure.allowedAmt = Form.getValue(this.authorizationProcedureDetailForm, 'authAmt');
            this.authProcedure.costProcedureCd = Form.getValue(this.authorizationProcedureDetailForm, 'costProcedure');
            this.authProcedure.priceSchedule = Form.getValue(this.authorizationProcedureDetailForm, 'priceSchedule');
            this.authProcedure.priceRegion = Form.getValue(this.authorizationProcedureDetailForm, 'priceRegion');
            this.authProcedure.status = Form.getValue(this.authorizationProcedureDetailForm, 'status');
            this.authProcedure.statusDate = Form.getDatePickerValue(this.authorizationProcedureDetailForm, 'statusDate');
            this.authProcedure.statusReason = Form.getValue(this.authorizationProcedureDetailForm, 'statusReason');
            this.authProcedure.denialNotification = Form.getValue(this.authorizationProcedureDetailForm, 'denialNotifn');

            this.authProcedureService.updateAuthProcedure(this.authProcedure, this.authProcedure.authProcedurePrimaryKey.seqAuthDetail, this.authMaster.authMasterPrimaryKey.secondaryAuthNo, this.authMaster.authMasterPrimaryKey.authNumber).subscribe(response => {
                this.toastService.showToast("Record successfully updated.", NgbToastType.Success);
                this.editAuthProcedure = false;
                this.authorizationProcedureDetailForm.reset();
                this.getAuthProcedureRuleDetails();
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.isFormDataChangeStatus = false;
                }
            }, error => {
                this.toastService.showToast("An Error occurred while updating record. Please check your entry.", NgbToastType.Danger);
            });
        } else {
            this.toastService.showToast("Some required information is missing or incomplete. Please correct your entries and try again.", NgbToastType.Danger);
        }
        //   } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        //   }
    }


    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
        if (this.isSuperUser) {
            this.secProgress = false;
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

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
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

    showEditConfirmation() {
        const buttons = [
            new PopUpMessageButton('Save', 'Save', 'btn btn-info'),
            new PopUpMessageButton('Okay', 'Ok', 'btn btn-primary')
        ];
        const popUpMessage = new PopUpMessage('editConfirmation', 'Warning!', 'Data has been modified.', 'icon', buttons, MessageType.WARNING);
        const ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((result: { name: string; }) => {
            if (result && result.name) {
                if (result.name === 'Save') {
                    this.updateAuthProcedure();
                } else {
                    this.showAuthProcFields = false;
                    this.authorizationProcedureDetailForm.reset();
                }
            }
        });
    }

    closeModal() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Authorization Procedure')
            })
        } else {
            this.activeModal.close();
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    if (this.authorizationProcedureDetailForm.dirty) {
                        this.showEditConfirmation();

                    } else {
                        this.createNew();
                    }
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Delete': {
                    break;
                }
                case 'Save': {
                    this.saveAuthProcedure();
                    break;
                }
                case 'Close': {
                    if (this.authorizationProcedureDetailForm.dirty) {
                        this.showEditConfirmation();
                    } else {
                        this.showAuthProcFields = false;
                        this.authorizationProcedureDetailForm.reset();
                    }
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
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Open' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Undo', disabled: true },
                    { isHorizontal: true },
                    { name: 'Cut', disabled: true },
                    { name: 'Copy', disabled: true },
                    { name: 'Paste', disabled: true },
                    { isHorizontal: true },
                    { name: 'Next' },
                    { name: 'Previous' },
                    { isHorizontal: true },
                    { name: 'Lookup' },
                    { name: 'Next Topic' },
                    { name: 'Previous Topic' },
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    { name: '* Auth Master' },
                    { name: '* Days Visits Update' },
                    { name: 'Appeal' },
                    { name: 'Physician Advisor' },
                    { name: 'Second Opinion' },
                    { name: 'Paperwork Information' },
                    { name: 'Trace Information' }
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    { name: 'Auth Lookup' },
                    { name: 'Send To Case Management' },
                    { name: 'View Claims with Auth Number' }
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' },
                ],
            },
        ];
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
                    this.saveAuthProcedure()
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
        this.authorizationProcedureForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
