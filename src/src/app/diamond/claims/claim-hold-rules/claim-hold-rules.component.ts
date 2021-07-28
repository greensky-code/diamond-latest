import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import { DddwDtl, MessageMasterDtl, ReasonCodeMaster, SecUser } from '../../../api-models';
import { ClaimHoldDeterValues } from '../../../api-models/claim-hold-deter-values';
import { ClaimHoldDeterValuesPrimaryKey } from '../../../api-models/claim-hold-deter-values-primary-key';
import { ClaimHoldDeterminants } from '../../../api-models/claim-hold-determinants';
import { ClaimHoldDeterminantsPrimaryKey } from '../../../api-models/claim-hold-determinants-primary-key';
import { ClaimHoldRules } from '../../../api-models/claim-hold-rules';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SystemCodes } from '../../../api-models/system-codes.model';
import {
    DddwDtlService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import { ClaimHoldDeterValuesService } from '../../../api-services/claim-hold-deter-values.service';
import { ClaimHoldDeterminantsService } from '../../../api-services/claim-hold-determinants.service';
import { ClaimHoldRulesService } from '../../../api-services/claim-hold-rules.service';
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { TablesAndColumnsComponent } from '../../../shared/components/tables-and-columns/tables-and-columns.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import {
    ClaimHoldRuleSelectionFields,
    ClaimHoldRuleSelectionFormConfig,
    DEFAULT_LANGUAGE,
    SYSTEM_CODE_CLAIM_TYPE
} from '../../../shared/models/constants';
import { FormRow, FORM_FIELD_ACTION_TYPES, Menu, OPERATIONS } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { getClaimHoldRulesShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { AuditService } from '../../../shared/services/audit.service';
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {DynamicFormComponent} from "../../../shared/components/dynamic-form/dynamic-form.component";
import {MenuResponse} from "../../../api-models/menu-response";
import {MenuService} from "../../../shared/services/menu.service";

@Component({
    selector: 'app-claim-hold-rules',
    templateUrl: './claim-hold-rules.component.html',
    styleUrls: ["./claim-hold-rules.component.css"],
    providers: [DatePipe]
})
export class ClaimHoldRulesComponent implements OnInit {

    claimHoldRulesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'CLHLD';
    public isSuperUser = false;
    public secProgress = true;
    claimHoldRules: ClaimHoldRules[] = [];
    claimHoldDeterminants: ClaimHoldDeterminants[] = [];
    systemCodes: SystemCodes[] = [];
    claimHoldDeterValues: ClaimHoldDeterValues[] = [];
    claimHoldDeterValueSelected: ClaimHoldDeterValues

    public shortcuts: ShortcutInput[] = [];
    reasonCodeMasters: ReasonCodeMaster[];
    closeStatus: Boolean = false;
    popupClose: Boolean = false;

    claimHoldRuleSelectState = new Array<FormRow>();
    isResetForm: boolean = false;
    seqClhldRule: number;
    @Input() showIcon: boolean = false;
    @Input() winID?: string;
    @Input() vid?: string;
    newAddedRowNo: number = 0;

    focusDivName:string ='';
    public menu: Menu[] = [];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('holdRuleDynamicForm') holdRuleDynamicFormEle: DynamicFormComponent;

    claimHoldRuleSelectionFormConfig = ClaimHoldRuleSelectionFormConfig;
    isSaveForm = false;
    tablesi = [{ owners: 'DORIS', tableName: 'INST_CLAIM_HEADER' }];
    tablesp = [{ owners: 'DORIS', tableName: 'PROFSVC_CLAIM_HEADER' }];
    tablesd = [{ owners: 'DORIS', tableName: 'DENTAL_CLAIM_HEADER' }];

    isReadOnly: Boolean = true;
    isReadOnlyForm2: boolean = true;
    dddwDtls: DddwDtl[] = [];
    description: string;
    actionNo: number = 1;
    createNewItem: Boolean = true;
    tableName: string;
    columnNoName: string;
    isFormModifiedStatus: Boolean = false;
    claimHoldDeterminant: ClaimHoldDeterminants;
    customClaimTable = {
        'claimType': '',
        'reasonCode': '',
        'holdRule': '',
        'description': ''
    };
    customClaim2Table = {
        'determinant': '',
        'operator': ''
    };

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

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private claimHoldDeterValuesService: ClaimHoldDeterValuesService,
        private claimHoldDeterminantsService: ClaimHoldDeterminantsService,
        private claimHoldRulesService: ClaimHoldRulesService,
        private systemCodesService: SystemCodesService,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private datePipe: DatePipe,
        private auditService:AuditService,
        private menuSerrvice: MenuService
    ) { }


    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    claimType: string;

    dataGrid001GridOptionsExportCsv() {
        var params = {
        };
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {};
        this.dataGrid002gridApi.exportDataAsCsv(params);
    }

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;


    dataGrid003GridOptionsExportCsv() {
        var params = {};
        this.dataGrid003gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Claim Type",
                field: "claimType",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Hold Rule",
                field: "holdRule",
                width: 200
            },
            {
                headerName: "Reason Code",
                field: "reasonCode",
                width: 200
            },
            {
                headerName: "Description",
                field: "description",
                width: 200
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
                headerName: "Determinant",
                field: "determinant",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Operator",
                field: "operator",
                width: 200
            }
        ];
    }


    createDataGrid003(): void {
        this.dataGrid003GridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGrid003GridOptions.editType = 'fullRow';
        this.dataGrid003GridOptions.columnDefs = [
            {
                headerName: "From Value",
                field: "detFromValue",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Thru Value",
                field: "detThruValue",
                width: 200
            }
        ];
    }


    ngOnInit(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.claimHoldRulesForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.initializePermission();
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Delete', shortcutKey: 'Ctrl+D'},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'}
                ]
            },
            {
                menuItem: "Notes",
                dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Tooth Rule'},
                    {name: '3 Member COB History'},
                    {name: '4 Member COB History'},
                    {name: '5 Claim Hold Rules'},
                ]
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
                    {name: 'About Diamond Client/Server'}
                ]
            },
        ];
    }


    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewItem = true;
                    this.createClaimRuleForm();
                    break;
                }
                case "Open": {
                    // statements;
                    break;
                }
                case "Save": {
                    this.saveClaimHoldRules();
                    break;
                }
                case "Delete": {
                    this.deletePopupAlert();
                    break;
                }
                case "Close": {
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
            }
        }  else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
        else
        this.handleSubMenu(event);
    }


        handleSubMenu(event:any)
    {
        switch(event.menu.menuItem){
            case 'Window':
                switch (event.action)
                    {
                        case'Show Timestamp':
                            this.showTimeStamp();
                            break;
                    }
                break;

        }
    }

    secColDetails = new Array<SecColDetail>();

    inProgress = true;
    userTemplateId: string;
    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            return;
        }
        this.initializeComponentState();

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
            .findByTableNameAndUserId('CLAIM_HOLD_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
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

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.claimHoldRulesForm = this.formBuilder.group({
            claimType: ['', { updateOn: 'blur', validators: [] }],
            reasonCode: ['', { updateOn: 'blur', validators: [] }],
            holdRule: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            determinant: ['', { updateOn: 'blur', validators: [] }],
            operator: ['', { updateOn: 'blur', validators: [] }],
            claimType1: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        this.secProgress = false;
        this.initializeComponentState();

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

    getClaimHoldRules() {
        this.claimHoldRulesService.findAllClaimHoldRules().subscribe(claimHoldRules => {
            this.claimHoldRules = [];
            for(let claimHoldRule of claimHoldRules) {
                let claimHoldRules = new ClaimHoldRules();
                claimHoldRules.seqClhldRule = claimHoldRule.SEQ_CLHLD_RULE;
                claimHoldRules.claimType = claimHoldRule.CLAIM_TYPE;
                claimHoldRules.holdRule = claimHoldRule.HOLD_RULE;
                claimHoldRules.reasonCode = claimHoldRule.REASON_CODE;
                claimHoldRules.description = claimHoldRule.DESCRIPTION;
                claimHoldRules.securityCode = claimHoldRule.SECURITY_CODE;
                claimHoldRules.insertDatetime = claimHoldRule.INSERT_DATETIME;
                claimHoldRules.insertUser = claimHoldRule.INSERT_USER;
                claimHoldRules.insertProcess = claimHoldRule.INSERT_PROCESS;
                claimHoldRules.updateDatetime = claimHoldRule.UPDATE_DATETIME;
                claimHoldRules.updateUser = claimHoldRule.UPDATE_USER;
                claimHoldRules.updateProcess = claimHoldRule.UPDATE_PROCESS;
                this.claimHoldRules.push(claimHoldRules);
            }
            this.dataGrid001GridOptions.api.setRowData(this.claimHoldRules);
            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            this.isReadOnly = true;
        });
    }
    claimHoldRule = new ClaimHoldRules();
    grid1SelectionChange() {

        var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        let selectedNodes = this.dataGrid001GridOptions.api.getSelectedNodes();
        if (selectedRows[0]) {
            this.claimHoldRule = selectedRows[0];
            let count = selectedNodes[0].childIndex;
            if (count == 0) {
                count = count + 1;
            }
            if (count !== this.newAddedRowNo) {
                this.isReadOnly = true;
            } else {
                this.isReadOnly = false;
            }
            this.setForm1Values(this.claimHoldRule);
        } else {
            this.dataGrid002GridOptions.api.setRowData([]);
            this.isReadOnly = false;
        }
    }

    setForm1Values(claimHoldRule: ClaimHoldRules) {
        this.claimHoldRulesForm.patchValue({
            claimType: this.getClaimType(claimHoldRule.claimType),
            reasonCode: claimHoldRule.reasonCode,
            holdRule: claimHoldRule.holdRule,
            description: claimHoldRule.description
        }, { emitEvent: false });
        this.seqClhldRule = claimHoldRule.seqClhldRule;
        this.getClaimHoldDeterminantBySeqClaimHoldId(claimHoldRule.seqClhldRule);
        this.popupClose = false;
    }

    setForm2Values(claimHoldDeterminants: ClaimHoldDeterminants) {
        this.claimHoldRulesForm.patchValue({
            determinant: claimHoldDeterminants.determinant,
            operator: claimHoldDeterminants.operator,
            seqClhldRule: claimHoldDeterminants.seqClhldRule
        }, { emitEvent: false });
        this.getClaimDeterminantValue(claimHoldDeterminants);
    }

    grid2SelectionChange() {
        let claimHoldDeterminants = new ClaimHoldDeterminants();
        this.claimHoldDeterminant = new ClaimHoldDeterminants();
        var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if (selectedRows[0]) {
            claimHoldDeterminants = selectedRows[0];
            this.setForm2Values(claimHoldDeterminants);
            this.claimHoldDeterminant = claimHoldDeterminants;
            this.isReadOnlyForm2 = true;
        } else {
            this.claimHoldDeterminant = new ClaimHoldDeterminants();
            this.isResetForm = true;
            this.isReadOnlyForm2 = false;
        }
    }


    getClaimType(claimType: any): string {
        let systemCodeDesc
        this.systemCodes.forEach(systemCodes => {
            if (systemCodes.systemCode === claimType) {
                systemCodeDesc = systemCodes.systemCodeDesc1;
            }
        });
        return systemCodeDesc;
    }

    getSystemCodes() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_CLAIM_TYPE, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.systemCodes = systemCodes;
        }, error => {
        });
    }

    getClaimHoldDeterminantBySeqClaimHoldId(seqClhldRule: any) {
        if (seqClhldRule) {
            this.claimHoldDeterminantsService.getSeqClhldRule(seqClhldRule).subscribe(claimHoldDeterminants => {
                this.claimHoldDeterminants = claimHoldDeterminants;
                this.dataGrid002GridOptions.api.setRowData(this.claimHoldDeterminants);
                this.dataGrid002GridOptions.api.selectIndex(0, false, false);
                this.isReadOnlyForm2 = true;
                if(claimHoldDeterminants){
                    this.isReadOnlyForm2 = true;
                }else{
                    this.isReadOnlyForm2 = false;
                    this.isResetForm = true;
                    this.resetForm2();
                }

            }, error => {
                this.dataGrid002GridOptions.api.setRowData([]);
                this.isReadOnlyForm2 = false;
                this.isResetForm = true;
                this.resetForm2();
            });
        }
    }


    getClaimDeterminantValue(claimHoldDeterminants: ClaimHoldDeterminants) {
        if (claimHoldDeterminants !== null) {
            this.isResetForm = true;
            this.isResetForm = false;
            this.claimHoldDeterValues = [];
            let determinantColumnNo = claimHoldDeterminants.claimHoldDeterminantsPrimaryKey ? claimHoldDeterminants.claimHoldDeterminantsPrimaryKey.determinantColumnNo : claimHoldDeterminants.determinant;
            let seqClhldRule = this.seqClhldRule;
            this.claimHoldDeterValuesService.getClaimHoldDeterValuesesByColumnNoAndSeqClhldRule(determinantColumnNo, seqClhldRule).subscribe(claimHoldDeterValues => {
                this.claimHoldDeterValues = claimHoldDeterValues;
                this.claimHoldRuleSelectState = [];
                setTimeout(() => {
                    this.setGrid3Values();
                }, 500);
            }, error => {
            })
        }
    }

    setGrid3Values() {
        if (this.claimHoldDeterValues !== null) {
            this.claimHoldDeterValues.forEach((record: ClaimHoldDeterValues) => {
                let mockConfig = JSON.parse(JSON.stringify(this.claimHoldRuleSelectionFormConfig));    // make a copy of original config
                this.claimHoldRuleSelectionFormConfig.forEach((field, index) => {
                    if (field.name === ClaimHoldRuleSelectionFields.FROM_VALUE) {
                        mockConfig[index].value = record.detFromValue
                    } else if (field.name === ClaimHoldRuleSelectionFields.THRU_VALUE) {
                        mockConfig[index].value = record.detThruValue;
                    }
                });

                let formState: FormRow = new FormRow();
                formState.formFields = mockConfig;
                formState.id = {
                    determinantColumnNo: record.claimHoldDeterValuesPrimaryKey.determinantColumnNo,
                    determinantValueNo: record.claimHoldDeterValuesPrimaryKey.determinantValueNo,
                    seqClhldRule: record.claimHoldDeterValuesPrimaryKey.seqClhldRule
                };
                this.claimHoldRuleSelectState.push(formState);
            });
            this.claimHoldRuleSelectState = JSON.parse(JSON.stringify(this.claimHoldRuleSelectState));
        }
    }




    ngAfterViewInit(): void {
        this.shortcuts.push(...getClaimHoldRulesShortcutKeys(this));
        this.cdr.detectChanges();
    }

    saveClaimHoldRules() {
        if (this.actionNo == 1) {
            if (this.isReadOnly) {
                this.updateClaimHoldRules();
            } else {
                this.createClaimHoldRule();
            }
        }
        if (this.actionNo == 2) {
            if (this.isReadOnlyForm2) {
                this.updateClaimHoldDeterminant();
            } else {
                this.createClaimHoldDeterminant();
            }
        }
    }

    createClaimHoldDeterminant() {
        let claimHoldDeterminant = new ClaimHoldDeterminants();
        let claimHoldRule = new ClaimHoldRules();
        let claimHoldDeterminantsPrimaryKey = new ClaimHoldDeterminantsPrimaryKey();
        this.formValidation.validateForm();
        if (this.claimHoldRulesForm.valid) {
            var selectedRowsGrid1 = this.dataGrid001GridOptions.api.getSelectedRows();
            claimHoldRule = selectedRowsGrid1[0];
            claimHoldDeterminantsPrimaryKey.seqClhldRule = claimHoldRule.seqClhldRule;

            claimHoldDeterminant.seqClhldRule = claimHoldRule.seqClhldRule;
            claimHoldDeterminant.determinantTable = this.tableName;

            claimHoldDeterminant.claimHoldDeterminantsPrimaryKey = claimHoldDeterminantsPrimaryKey;
            claimHoldDeterminant.determinant = Form.getValue(this.claimHoldRulesForm, 'determinant');
            claimHoldDeterminant.operator = Form.getValue(this.claimHoldRulesForm, 'operator');
            let insertUser = sessionStorage.getItem('user');
            let insertProcess = this.windowId;
            claimHoldDeterminant.insertUser = insertUser
            claimHoldDeterminant.insertProcess = insertProcess;
            claimHoldDeterminant.updateUser = insertUser;
            claimHoldDeterminant.updateProcess = insertProcess;
            this.claimHoldDeterminantsService.createClaimHoldDeterminants(claimHoldDeterminant).subscribe(claimHoldDeterminants => {
                this.toastService.showToast(
                    "Record successfully created",
                    NgbToastType.Success
                );
                this.getClaimHoldRules();
            });

        }
        else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    updateClaimHoldDeterminant() {
        let claimHoldDeterminant = new ClaimHoldDeterminants();
        this.formValidation.validateForm();
        if (this.claimHoldRulesForm.valid) {
            var selectedRowsGrid1 = this.dataGrid001GridOptions.api.getSelectedRows();
            var selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
            let seqClhldRule = selectedRows[0] ? selectedRowsGrid1[0].seqClhldRule : 1002;
            claimHoldDeterminant = selectedRows[0];
            claimHoldDeterminant.operator = Form.getValue(this.claimHoldRulesForm, 'operator');
            let insertUser = sessionStorage.getItem('user');
            let insertProcess = this.windowId;
            claimHoldDeterminant.updateUser = insertUser;
            claimHoldDeterminant.updateProcess = insertProcess;
            claimHoldDeterminant.insertDatetimeDisplay = null;
            claimHoldDeterminant.updateDatetimeDisplay = null;
            this.auditService.setAuditFields(claimHoldDeterminant, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);
            this.claimHoldDeterminantsService.updateClaimHoldDeterminants2(claimHoldDeterminant, seqClhldRule).subscribe(claimHoldDeterminants => {
                this.toastService.showToast(
                    "Record successfully updated",
                    NgbToastType.Success
                );
                this.getClaimHoldRules();
            });

        }
        else {
            this.toastService.showToast(
                "Some required information is missing or incomplete. Please correct your entries and try again.",
                NgbToastType.Danger
            );
        }
    }

    createClaimHoldRule() {
        let claimHoldRule = new ClaimHoldRules();
        this.formValidation.validateForm();
        if (this.claimHoldRulesForm.valid) {
            claimHoldRule.claimType = this.claimType;
            claimHoldRule.description = Form.getValue(this.claimHoldRulesForm, 'description');
            claimHoldRule.holdRule = Form.getValue(this.claimHoldRulesForm, 'holdRule');
            claimHoldRule.reasonCode = Form.getValue(this.claimHoldRulesForm, 'reasonCode');
            claimHoldRule.seqClhldRule = this.seqClhldRule;

            let insertUser = sessionStorage.getItem('user');
            let insertProcess = this.windowId;
            claimHoldRule.insertUser = insertUser
            claimHoldRule.insertProcess = insertProcess;
            claimHoldRule.updateUser = insertUser;
            claimHoldRule.updateProcess = insertProcess;
            this.auditService.setAuditFields(claimHoldRule, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);
            this.claimHoldRulesService.createClaimHoldRules(claimHoldRule).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.getClaimHoldRules();
                this.createNewItem = true;
                this.isReadOnly = true;
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.popupClose = false;
            });
        }
        else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateClaimHoldRules() {
        let claimHoldRule = new ClaimHoldRules();
        this.formValidation.validateForm();
        if (this.claimHoldRulesForm.valid) {
            var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
            if (selectedRows[0]) {
                claimHoldRule = selectedRows[0];
                claimHoldRule.description = Form.getValue(this.claimHoldRulesForm, 'description');
                this.auditService.setAuditFields(claimHoldRule, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);
                this.claimHoldRulesService.updateClaimHoldRules(claimHoldRule, claimHoldRule.seqClhldRule).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.getClaimHoldRules();
                    this.createNewItem = true;
                    this.isReadOnly = true;
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.popupClose = false;
                    }
                });
            }
        }
    }

    onFieldFocusOut = (event: any) => {
        if (event === true) {
            this.isFormModifiedStatus = true;
        }
    };

    saveClaimRuleSelect(event: any) {
        if (this.isFormModifiedStatus && event) {
            let claimHoldDeterValues = new Array<ClaimHoldDeterValues>();
            const updatedRecords: FormRow[] = this.claimHoldRuleSelectState.filter(record => record.action);
            if (updatedRecords.length > 0) {
                this.claimHoldRuleSelectState.forEach((preStateRecord: FormRow, index) => {
                    if (preStateRecord.action) {
                        let updatedRecord = event[index];
                        const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                        let claimHoldDeterValue: ClaimHoldDeterValues = this.populateClaimHoldDeterValues(pair, preStateRecord.action);
                        let claimHoldDeterValuesPrimaryKey = new ClaimHoldDeterValuesPrimaryKey();
                        claimHoldDeterValuesPrimaryKey.determinantColumnNo = preStateRecord.id.determinantColumnNo;
                        claimHoldDeterValuesPrimaryKey.determinantValueNo = preStateRecord.id.determinantValueNo;
                        claimHoldDeterValuesPrimaryKey.seqClhldRule = preStateRecord.id.seqClhldRule;
                        claimHoldDeterValue.claimHoldDeterValuesPrimaryKey = claimHoldDeterValuesPrimaryKey;
                        claimHoldDeterValue.action = preStateRecord.action;
                        let insertUser = sessionStorage.getItem('user');
                        let insertProcess = this.windowId;
                        claimHoldDeterValue.insertDatetime = null;
                        claimHoldDeterValue.updateDatetime = null;
                        claimHoldDeterValue.updateUser = insertUser;
                        claimHoldDeterValue.updateProcess = insertProcess;
                        claimHoldDeterValues.push(claimHoldDeterValue);
                    }
                });
            }
            const newRecords = event.slice(this.claimHoldRuleSelectState.length);
            newRecords.forEach((record: { [x: string]: any; }) => {
                const pair = Object.keys(record).map(k => ({ key: k, value: record[k] }));
                let claimHoldDeterValue: ClaimHoldDeterValues = this.populateClaimHoldDeterValues(pair, FORM_FIELD_ACTION_TYPES.ADD);
                let claimHoldDeterValuesPrimaryKey = new ClaimHoldDeterValuesPrimaryKey();

                claimHoldDeterValuesPrimaryKey.determinantColumnNo = this.claimHoldDeterminant.claimHoldDeterminantsPrimaryKey.determinantColumnNo;
                claimHoldDeterValuesPrimaryKey.seqClhldRule = this.claimHoldDeterminant.claimHoldDeterminantsPrimaryKey.seqClhldRule;
                claimHoldDeterValue.claimHoldDeterValuesPrimaryKey = claimHoldDeterValuesPrimaryKey;
                let insertUser = sessionStorage.getItem('user');
                let insertProcess = this.windowId;
                claimHoldDeterValue.action = FORM_FIELD_ACTION_TYPES.ADD;
                claimHoldDeterValue.insertDatetime = null;
                claimHoldDeterValue.insertUser = insertUser
                claimHoldDeterValue.insertProcess = insertProcess;
                claimHoldDeterValue.updateDatetime = null;
                claimHoldDeterValue.updateUser = insertUser;
                claimHoldDeterValue.updateProcess = insertProcess;
                claimHoldDeterValues.push(claimHoldDeterValue);
            });

            let totalApiRecordSize = claimHoldDeterValues.length;
            let counter = 0;
            let fromValue: string;
            let thruValue: string;
            claimHoldDeterValues.forEach(record => {
                if (record.detFromValue) {
                    if ((Number(record.detFromValue) > Number(record.detThruValue))) {
                        fromValue = record.detFromValue;
                        thruValue = record.detThruValue;
                        return false;
                    } else {
                        counter = counter + 1;
                    }

                } else {
                    counter = counter + 1;
                }
            });

            // Add / Update API Call
            if (totalApiRecordSize === counter) {
                if (claimHoldDeterValues !== null) {
                    if (claimHoldDeterValues.length > 0) {
                        this.isResetForm = true;
                        this.isResetForm = false;
                        this.claimHoldDeterValuesService.addUpdateClaimHoldDeterValues(claimHoldDeterValues).subscribe(resp => {
                            this.isSaveForm = false;
                            this.isFormModifiedStatus = false;
                            this.toastService.showToast('Claim Determinant Values updated Successfully', NgbToastType.Success)
                            this.claimHoldRuleSelectState = [];
                            this.getClaimDeterminantValue(this.claimHoldDeterminant);
                        });
                    }
                }
            } else {
                this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
                    this.popupAlert1(message[0].messageText.replace('@1', thruValue + "").replace('@2', fromValue), 'Claim Hold Rules');
                });
            }
        }
    }

    populateClaimHoldDeterValues(event: any, action: FORM_FIELD_ACTION_TYPES) {
        let claimHoldDeterValue = new ClaimHoldDeterValues();
        claimHoldDeterValue.detFromValue = event[0].value;
        claimHoldDeterValue.detThruValue = event[1].value;
        return claimHoldDeterValue
    }


    getReasonCodeMastersTermReason() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('HD').subscribe(reasonCodeMasters => {
            this.reasonCodeMasters = reasonCodeMasters.sort((a, b) => (a.reasonCode > b.reasonCode) ? 1 : -1);
        });
    }

    createClaimRuleForm() {
        if (this.actionNo === 1) {
            this.dataGrid001GridOptions.api.deselectAll();
            this.dataGrid002GridOptions.api.deselectAll();
            this.isReadOnly = false;
            this.isReadOnlyForm2=false;
            this.createNewItem = false;
            this.isResetForm = true;
            this.claimHoldRulesForm.reset();
            this.customClaimTable.reasonCode = '';
            this.customClaimTable.claimType = '';
            this.customClaimTable.holdRule = '';
            this.customClaimTable.description = '';
            this.claimHoldDeterminant = new ClaimHoldDeterminants();
        }
        if (this.actionNo === 2) {
            this.dataGrid002GridOptions.api.deselectAll();
            this.isReadOnlyForm2 = false;
            this.isResetForm = true;
            this.resetForm2();
        }
        if (this.actionNo === 3) {
            this.holdRuleDynamicFormEle.fileNewAddNewRow();
        }
    }

    deleteClaimHoldRule(){
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        if(selectedRows.length > 0){
            let seqClhldRule = selectedRows[0].seqClhldRule;
            if(seqClhldRule){
                this.claimHoldRulesService.deleteClaimHoldRules(seqClhldRule).subscribe(response => {
                if (response) {
                    this.toastService.showToast('Record Deleted Successfully', NgbToastType.Success);
                    this.getClaimHoldRules();
                }
                });
            }
        }
    }

    deleteClaimHoldDeterminants(){
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        if(selectedRows.length > 0) {
            let seqClhldRule = selectedRows[0].claimHoldDeterminantsPrimaryKey.seqClhldRule;
            let determinantColumnNo = selectedRows[0].claimHoldDeterminantsPrimaryKey.determinantColumnNo;
            if(seqClhldRule && determinantColumnNo){
                this.claimHoldDeterminantsService.deleteClaimHoldDeterminants(seqClhldRule, determinantColumnNo).subscribe(response => {
                    this.toastService.showToast('Record Deleted Successfully', NgbToastType.Success);
                    this.getClaimHoldDeterminantBySeqClaimHoldId(seqClhldRule);
                });
            }
        }
    }

    deleteClaimHoldDeterminantValue(){
        let determinantValueNo = this.claimHoldDeterValue.claimHoldDeterValuesPrimaryKey.determinantValueNo;
        let determinantColumnNo = this.claimHoldDeterValue.claimHoldDeterValuesPrimaryKey.determinantColumnNo;
        let seqClhldRule = this.claimHoldDeterValue.claimHoldDeterValuesPrimaryKey.seqClhldRule;
        this.claimHoldDeterValuesService.deleteClaimHoldDeterValues(determinantValueNo, determinantColumnNo,seqClhldRule).subscribe(response => {
            this.toastService.showToast('Record Deleted Successfully', NgbToastType.Success);
            this.getClaimDeterminantValue(this.claimHoldDeterminant);
        });
    }

    resetForm2() {
        this.claimHoldRulesForm.patchValue({
            determinant: '',
            operator: ''
        });
    }

    setActionStatus(actionNo: number) {
        this.actionNo = actionNo;
    }


    getOperatorDropDown() {
        this.dddwDtlService.findByColumnNameAndDwname('operator', 'dw_clhld_deter_de').subscribe(dddwDtls => {
            this.dddwDtls = dddwDtls;
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Claim Hold Rules')
            });
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                      this.saveClaimHoldRules();
                } else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                } else if (resp.text === 'No') {
                    for(let claimHoldRuleSelectState of this.claimHoldRuleSelectState) {
                        claimHoldRuleSelectState.action = FORM_FIELD_ACTION_TYPES.UPDATE;
                    }
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

    deletePopupAlert = () => {
        let popUpMessage = new PopUpMessage(
            'Claim Hold Rules',
            'Claim Hold Rules',
            '29070: Press OK to delete this record',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'OK') {
                if(this.actionNo == 1) {
                    this.deleteClaimHoldRule();
                } else if(this.actionNo == 2) {
                    this.deleteClaimHoldDeterminants();
                } else if(this.actionNo == 3) {
                    this.deleteClaimHoldDeterminantValue();
                }
            }
        });
    };

    name2ToTable = (event: any) => {
        let name = event.srcElement.id;
        let data = [];
        switch (name) {
            case 'claimType1':
                this.customClaimTable.claimType = event.target.value;
                this.claimType = event.target.value;
                break;
            case 'reasonCode':
                this.customClaimTable.reasonCode = event.target.value;
                break;
            case 'holdRule':
                this.customClaimTable.holdRule = event.target.value;
                break;
            case 'description':
                this.customClaimTable.description = event.target.value;
                break;
            default:
                break;
        }

        if (this.actionNo == 1) {
            if (!this.isReadOnly) {
                for (let item of this.claimHoldRules) {
                    data.push(item);
                }

                data.push(this.customClaimTable);
                this.dataGrid001GridOptions.api.setRowData(data);
                this.dataGrid001GridOptions.api.selectIndex(data.length - 1, false, false);
                this.newAddedRowNo = data.length - 1;
            }
        }
    };

    name3ToTable = (event: any) => {
        let name = event.srcElement.id;
        let value = event.target.value;
        switch (name) {
            case 'determinant':
                this.customClaim2Table.determinant = value;
                break;
            case 'operator':
                this.customClaim2Table.operator = value;
                break;
            default:
                break;
        }

        if (this.actionNo == 2) {
            if (!this.isReadOnlyForm2) {
                let data = [];
            }
        }
    }

    onLookupFieldDeterminant(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openTableAndColumnModel();
        }
    }

    openTableAndColumnModel() {
        let cType = this.claimHoldRulesForm.get('claimType').value;
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;

        if(cType==='Inst.'){
            ref.componentInstance.tables = this.tablesi;
        }

        if(cType==='Dental'){
            ref.componentInstance.tables = this.tablesd;
        }

        if(cType==='Prof.'){
            ref.componentInstance.tables = this.tablesp;
        }
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.claimHoldRulesForm.patchValue({
                    determinant: res.columnName
                });
                this.tableName = res.tableName;
                this.columnNoName = res.columnName;
            }
        });
    }

    claimHoldDeterValue: any;
    onRowClickEvent(event: any) {
       this.claimHoldDeterValue = this.claimHoldDeterValues[event.index];
    }

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Claim Hold Rules";
        console.log(this.claimHoldDeterminant)
        if(this.focusDivName==='grid1'){
            ref.componentInstance.insertDateTime = this.claimHoldRule.insertDatetime;
            ref.componentInstance.insertProcess = this.claimHoldRule.insertProcess;
            ref.componentInstance.insertUser = this.claimHoldRule.insertUser;
            ref.componentInstance.updateUser = this.claimHoldRule.updateUser;
            ref.componentInstance.updateDateTime = this.claimHoldRule.updateDatetime;
            ref.componentInstance.updateProcess = this.claimHoldRule.updateProcess;
       } else if(this.focusDivName==='grid2'){
        ref.componentInstance.insertDateTime = this.claimHoldDeterminant.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.claimHoldDeterminant.insertProcess;
        ref.componentInstance.insertUser = this.claimHoldDeterminant.insertUser;
        ref.componentInstance.updateUser = this.claimHoldDeterminant.updateUser;
        ref.componentInstance.updateDateTime = this.claimHoldDeterminant.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.claimHoldDeterminant.updateProcess;

       } else if(this.focusDivName==='grid3'){

        ref.componentInstance.insertDateTime = this.claimHoldDeterValue.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.claimHoldDeterValue.insertProcess;
        ref.componentInstance.insertUser = this.claimHoldDeterValue.insertUser;
        ref.componentInstance.updateUser = this.claimHoldDeterValue.updateUser;
        ref.componentInstance.updateDateTime = this.claimHoldDeterValue.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.claimHoldDeterValue.updateProcess;
        } else {
            this.toastService.showToast('Please select a grid to show time stamp', NgbToastType.Danger);
        }
    };

    popupAlert1 = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'OK') {
                    ref.componentInstance.close();
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    focus(name: any) {
        this.focusDivName = name;
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CLHLD_Claim_Hold_Rules_F1_MAP.htm'
    }

    initializeComponentState() {
        this.getSystemCodes();
        this.getReasonCodeMastersTermReason();
        this.getOperatorDropDown();
        setTimeout(() => {
            this.dataGrid002GridOptions.api.setRowData([]);
            this.getClaimHoldRules();
        });
        this.claimHoldRulesForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }

    disableMenu() {
        if (this.userTemplateId == "UT_VIEW") {
            this.menu[0]["dropdownItems"][0].disabled = true;
            this.menu[0]["dropdownItems"][3].disabled = true;
        }
    }

}
