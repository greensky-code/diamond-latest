/* Copyright (c) 2021 . All Rights Reserved. */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit, QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from "ag-grid-community";
import {Menu, SearchModel} from '../../../shared/models/models';

import {NumberValidators} from '../../../shared/validators/number.validator';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PcpaaSupportInfo} from "../../../api-models/support/pcpaa-support-info.model"
import {PcpaaSupportInfoService} from "../../../api-services/pcpaa-support-info.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {
    DddwDtlService,
    DddwHdrService,
    GroupMasterService,
    LineOfBusinessMasterService,
    MessageMasterDtlService,
    PlanMasterService, RiderMasterService,
    SecUserService
} from '../../../api-services';
import {GroupMaster, MemberEligHistory, MemberMaster, MessageMasterDtl, SecUser} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {LineOFBLookup} from '../../../shared/lookup/line-of-business-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {LineOfBusinessMaster} from '../../../api-models/line-of-business-master.model';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    CONSTANTS,
    getPcpaaSupportInfoDetailsShortcutKeys,
    getPcpAutoAssignRulesShortcutKeys
} from "../../../shared/services/shared.service";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {HelpComponent} from "../../member/help/help.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {NgbToastType} from "ngb-toast";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {ToastService} from "../../../shared/services/toast.service";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {PcpAutoAssignComponent} from "../pcp-auto-assign/pcp-auto-assign.component";
import {LineOfBusinessComponent} from "../line-of-business/line-of-business.component";
import {ClaimInterestCalcRulesComponent} from "../claim-interest-calc.-rules/claim-interest-calc.-rules.component";
import {ClaimDiscountCalcRulesComponent} from "../claim-discount-calc.-rules/claim-discount-calc.-rules.component";
import {PreExistingConditionRulesComponent} from "../pre-existing-condition-rules/pre-existing-condition-rules.component";

// Use the Component directive to define the PcpaaSupportInfoDetailsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pcpaa-support-info-details',
    templateUrl: './pcpaa-support-info-details.component.html',
    styleUrls: ['./pcpaa-support-info-details.component.scss'],
    providers: [
        PcpaaSupportInfoService,
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,

    ]


})
export class PcpaaSupportInfoDetailsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    pcpaaSupportInfoDetailsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: any = 'PCPSI';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    public currentLineOfBus: string;
    public dataGridGridOptions: GridOptions;
    pressedKey: any[] = [];
    lineOfBusiness: LineOfBusinessMaster;
    searchStatus = false;
    keyName = 'seq_pcpaa_info_id';
    keyValues: any;


    @Input() showIcon = false;
    @Input() lineOfBusinessId: string;
    @ViewChild('lineOfBusiness') lineOfBusinessElem: ElementRef;
    selectedSupportInfo: PcpaaSupportInfo;
    pcpaaSupportInfo: PcpaaSupportInfo;
    pcpaaSupportInfos: PcpaaSupportInfo[];


    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    inProgress = true;

    LobSearchModal = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        []
    );
    shortcuts: ShortcutInput[] = [];
    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private datePipe: DatePipe,
        private customValidators: CustomValidators,
        private secUserService: SecUserService,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private toastService: ToastService,
        private router: Router,
        private pcpaaSupportInfoService: PcpaaSupportInfoService) {
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
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
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

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.pcpaaSupportInfoDetailsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.createDataGrid003();
        this.createDataGrid004();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
            this.dataGrid003GridOptions.api.setRowData([]);
            this.dataGrid004GridOptions.api.setRowData([]);
        }, 1000);
        if (this.lineOfBusinessId) {
            this.findByLineOfBusiness(this.lineOfBusinessId);
        }
    }


    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

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

    editPcpaaSupportInfo: boolean;


    createPcpaaSupportInfo() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.pcpaaSupportInfoDetailsForm.valid) {
                let pcpaaSupportInfo = new PcpaaSupportInfo();
                this.pcpaaSupportInfoService.createPcpaaSupportInfo(pcpaaSupportInfo).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPcpaaSupportInfo = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {

        }
    }


    updatePcpaaSupportInfo(seqPcpaaInfoId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.pcpaaSupportInfoDetailsForm.valid) {
                let pcpaaSupportInfo = new PcpaaSupportInfo();
                this.pcpaaSupportInfoService.updatePcpaaSupportInfo(pcpaaSupportInfo, seqPcpaaInfoId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editPcpaaSupportInfo = false;
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

    savePcpaaSupportInfo() {
        if (this.editPcpaaSupportInfo) {
            this.updatePcpaaSupportInfo(this.pcpaaSupportInfo.seqPcpaaInfoId)
        } else {
            this.createPcpaaSupportInfo();
        }
    }

    deletePcpaaSupportInfo(seqPcpaaInfoId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pcpaaSupportInfoService.deletePcpaaSupportInfo(seqPcpaaInfoId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getPcpaaSupportInfo(seqPcpaaInfoId: number) {
        this.pcpaaSupportInfoService.getPcpaaSupportInfo(seqPcpaaInfoId).subscribe(pcpaaSupportInfo => {
            this.pcpaaSupportInfo = pcpaaSupportInfo;
            this.pcpaaSupportInfoDetailsForm.patchValue({});
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getPcpaaSupportInfos() {
        this.pcpaaSupportInfoService.getPcpaaSupportInfos().subscribe(pcpaaSupportInfos => {
            this.pcpaaSupportInfos = pcpaaSupportInfos;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    public dataGrid004GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {};
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

    private dataGrid004gridApi: any;
    private dataGrid004gridColumnApi: any;

    dataGrid004GridOptionsExportCsv() {
        var params = {};
        this.dataGrid004gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Specialty",
                field: "specialtyType",
                headerClass: 'text-primary',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Age From",
                headerClass: 'text-primary',
                field: "ageFrom",
                width: 200
            },
            {
                headerName: "Age Thru",
                headerClass: 'text-primary',
                field: "ageThru",
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
                headerName: "Specialty",
                field: "specialtyType",
                headerClass: 'text-primary',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Gender",
                headerClass: 'text-primary',
                field: "",
                width: 200,
                valueGetter: (data) => {
                    if (data.data.gender === 'F') {
                        return 'Female'
                    } else {
                        return 'Male'
                    }
                }
            },
            {
                headerName: "Age From",
                headerClass: 'text-primary',
                field: "ageFrom",
                width: 200
            },
            {
                headerName: "Age Thru",
                headerClass: 'text-primary',
                field: "ageThru",
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
                headerName: "Specialty",
                headerClass: 'text-primary',
                field: "specialtyType",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Exclude Gender",
                headerClass: 'text-primary',
                field: "",
                width: 200,
                valueGetter: (data) => {
                    if (data.data.gender === 'F') {
                        return 'Female'
                    } else {
                        return 'Male'
                    }
                }
            }
        ];
    }

    createDataGrid004(): void {
        this.dataGrid004GridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGrid004GridOptions.editType = 'fullRow';
        this.dataGrid004GridOptions.columnDefs = [
            {
                headerName: "Specialty",
                headerClass: 'text-primary',
                field: "specialtyType",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Exclude Age From",
                headerClass: 'text-primary',
                field: "ageFrom",
                width: 200
            },
            {
                headerName: "Exclude Age Thru",
                headerClass: 'text-primary',
                field: "ageThru",
                width: 200
            }
        ];
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New', shortcutKey: 'Ctrl + N'},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Save', shortcutKey: 'Ctrl + S'},
                    {name: 'Close', shortcutKey: 'Ctrl + A4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit', shortcutKey: 'Alt + A4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C'},
                    {name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V'},
                    {isHorizontal: true},
                    {name: 'Next'}, {name: 'Previous'}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'Line Of Business'}, {name: 'Auto Letter Setup'}, {name: 'PCP Support Info Details'},
                    {name: 'PCP Auto Assign'}, {name: 'Claims Interest/Penalty Calc Rules'}, {name: 'Claims Discount Calculation Rules'}
                    , {name: 'Pre-Existing Condition Rules'}]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {name: 'Audit Display', shortcutKey: 'Shift + Alt + A'},
                    {isHorizontal: true}, {name: '1 Main Menu'},
                    {name: '2 Benefit Processing Order'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {
                        name: 'This Window',
                        shortcutKey: 'F1'
                    }, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createForm();
                    break;
                }
                case 'Open': {
                    this.handleOpenMenu();
                    break;
                }
                case 'Save': {
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

                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions
            this.handleTopicMenu(event.action)
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions

        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    break;
                }
                case 'Show Timestamp': {
                    if (this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value) {
                        this.openShowTimestampComponent();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
                case 'Audit Display': {
                    this.openAuditDisplayComponent();
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen()
        }
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
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Pcpaa Support Info Details',
                        'Pcpaa Support Info Details Permission'
                    );
                }
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.inProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pcpaaSupportInfoDetailsForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: []}],
            dynamicText: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    lookupLOB(event, id: string) {
        if (event.key === 'F5') {
            event.preventDefault();
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = this.LobSearchModal;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.onRowSelected.subscribe((res: any) => {
                if (res != null) {
                    this.findByLineOfBusiness(res.lineOfBusiness);
                }
            });
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.findByLineOfBusiness(id);
        }
    }

    public findByLineOfBusiness(lineOfBus: string) {
        this.currentLineOfBus = lineOfBus;
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBus).subscribe((lineOfBusiness: LineOfBusinessMaster) => {
                this.lineOfBusiness = lineOfBusiness;
                this.searchStatus = true;
                setTimeout(() => {
                    this.lineOfBusiness.updateDatetimeDisplay = this.datePipe.transform(
                        new Date(lineOfBusiness.updateDatetime),
                        "yyyy-MM-dd HH:mm:ss"
                    );
                    try {
                        this.lineOfBusiness.insertDatetimeDisplay = this.datePipe.transform(
                            new Date(lineOfBusiness.insertDatetime),
                            "yyyy-MM-dd HH:mm:ss"
                        );
                    } catch (e) {
                        console.log(e);
                    }
                }, 500);
                this.pcpaaSupportInfoDetailsForm.patchValue({
                    'dynamicText': lineOfBusiness.description,
                    'lineOfBusiness': lineOfBusiness.lineOfBusiness
                })
            },
            (error: Error) => {
                console.log('error', error);
            });
        this.fetchingTable(lineOfBus)
    }

    handleSupportInfoDateTime(selectedRows) {
        if (selectedRows && selectedRows.length > 0) {
            this.selectedSupportInfo = selectedRows[0];
            this.keyValues = this.selectedSupportInfo.seqPcpaaInfoId;
            this.searchStatus = true;
            setTimeout(() => {
                this.selectedSupportInfo.updateDatetimeDisplay = this.datePipe.transform(
                    new Date(this.selectedSupportInfo.updateDatetime),
                    "yyyy-MM-dd HH:mm:ss"
                );
                try {
                    this.selectedSupportInfo.insertDatetimeDisplay = this.datePipe.transform(
                        new Date(this.selectedSupportInfo.insertDatetime),
                        "yyyy-MM-dd HH:mm:ss"
                    );
                } catch (e) {
                    console.log(e);
                }
            }, 500);
        }
    }

    onSelectionChanged1(event) {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
        this.handleSupportInfoDateTime(selectedRows);
    }

    onSelectionChanged2(event) {
        let selectedRows = this.dataGrid002GridOptions.api.getSelectedRows();
        this.handleSupportInfoDateTime(selectedRows);
    }

    onSelectionChanged3(event) {
        let selectedRows = this.dataGrid003GridOptions.api.getSelectedRows();
        this.handleSupportInfoDateTime(selectedRows);
    }

    onSelectionChanged4(event) {
        let selectedRows = this.dataGrid004GridOptions.api.getSelectedRows();
        this.handleSupportInfoDateTime(selectedRows);
    }

    getPcpaaSupportInfo001(pcpaaSupportInfos: PcpaaSupportInfo[]) {
        let pcpaaSuppInf: PcpaaSupportInfo[];
        pcpaaSuppInf = pcpaaSupportInfos.filter(data => data.criteriaType == 1)
        this.dataGrid001GridOptions.api.setRowData(pcpaaSuppInf);

    }

    getPcpaaSupportInfo002(pcpaaSupportInfos: PcpaaSupportInfo[]) {
        let pcpaaSuppInf: PcpaaSupportInfo[];
        pcpaaSuppInf = pcpaaSupportInfos.filter(data => data.criteriaType == 2)
        pcpaaSuppInf.filter(item => {
            return item.gender === 'F' ? 'Female' : 'Male'
        })
        this.dataGrid002GridOptions.api.setRowData(pcpaaSuppInf);

    }

    getPcpaaSupportInfo003(pcpaaSupportInfos: PcpaaSupportInfo[]) {
        let pcpaaSuppInf: PcpaaSupportInfo[];
        pcpaaSuppInf = pcpaaSupportInfos.filter(data => data.criteriaType == 3)
        this.dataGrid003GridOptions.api.setRowData(pcpaaSuppInf);

    }

    getPcpaaSupportInfo004(pcpaaSupportInfos: PcpaaSupportInfo[]) {
        let pcpaaSuppInf: PcpaaSupportInfo[];
        pcpaaSuppInf = pcpaaSupportInfos.filter(data => data.criteriaType == 4)
        this.dataGrid004GridOptions.api.setRowData(pcpaaSuppInf);

    }

    public onLookupFieldLineOfBusiness(event: any, id: string) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.findByLineOfBusiness(id);
        }
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getPcpaaSupportInfoDetailsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, {windowClass: 'myCustomModalClass'});
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/PCPSI_PCPAA_Support_Info_Details.htm';
    }

    openAuditDisplayComponent() {
        if (this.searchStatus && this.selectedSupportInfo) {
            let status = this.functionalLevelSecurityService.isFunctionIdExist(
                CONSTANTS.F_AUDIT,
                this.windowId
            );
            if (status) {
                let ref = this.modalService.open(AuditDisplayComponent, {
                    size: 'lg',
                });
                ref.componentInstance.keyNames = this.keyName;
                ref.componentInstance.keyValues = this.keyValues;
                ref.componentInstance.winID = this.windowId;
                ref.componentInstance.win = 'dw_pcpsi_pedind_de';
                ref.componentInstance.showIcon = true;
            } else {
                this.messageService
                    .findByMessageId(11073)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.toastService.showToast('11073: ' + message[0].messageText, NgbToastType.Danger);
                    });
            }
        } else {
            this.messageService
                .findByMessageId(30164)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.toastService.showToast('30164: ' + message[0].messageText, NgbToastType.Danger);
                });
        }
    }

    openContentsComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openSearchForHelpComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openThisWindowComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openGlossaryComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openGettingStartedComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openHowToUseHelpComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    openAboutDiamondComponent() {
        const ref = this.modalService.open(HelpComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
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
        ref.componentInstance.insertDateTime = this.selectedSupportInfo.insertDatetime;
        ref.componentInstance.insertDateTime = this.selectedSupportInfo.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.selectedSupportInfo.insertProcess;
        ref.componentInstance.insertUser = this.selectedSupportInfo.insertUser;
        ref.componentInstance.updateUser = this.selectedSupportInfo.updateUser;
        ref.componentInstance.updateDateTime = this.selectedSupportInfo.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.selectedSupportInfo.updateProcess;
    }

    handleOpenMenu() {
        this.pcpaaSupportInfoDetailsForm.reset();
        this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').enable();
        this.dataGrid001GridOptions.api.setRowData([]);
        this.dataGrid002GridOptions.api.setRowData([]);
        this.dataGrid003GridOptions.api.setRowData([]);
        this.dataGrid004GridOptions.api.setRowData([]);
        this.lineOfBusinessElem.nativeElement.focus();
    };

    fetchingTable(lob) {
        this.pcpaaSupportInfoService.findByLineOfBusiness(lob).subscribe((pcpaaSupportInfos: PcpaaSupportInfo[]) => {
            this.pcpaaSupportInfos = pcpaaSupportInfos;
            this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').disable();

            setTimeout(() => {
                this.getPcpaaSupportInfo001(pcpaaSupportInfos);
                this.getPcpaaSupportInfo002(pcpaaSupportInfos);
                this.getPcpaaSupportInfo003(pcpaaSupportInfos);
                this.getPcpaaSupportInfo004(pcpaaSupportInfos);
                this.dataGrid001GridOptions.api.getDisplayedRowAtIndex(0).setSelected(true);
            }, 1500);
        })
    }

    modalClose() {
        this.activeModal.close();
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
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
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
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Line Of Business'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Auto Letter Setup'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Support Info Details'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'PCP Auto Assign'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'i':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Claims Interest/Penalty Calc Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Claims Discount Calculation Rules'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Pre-Existing Condition Rules'
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

    handleTopicMenu(event) {
        switch (event) {
            case "Line Of Business" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(LineOfBusinessComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
            case "Auto Letter Setup" : {
                this.toastService.showToast('Action is not implemented', NgbToastType.Danger)
                break;
            }
            case "PCP Support Info Details" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(PcpaaSupportInfoDetailsComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
            case "PCP Auto Assign" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(PcpAutoAssignComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
            case "Claims Interest/Penalty Calc Rules" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(ClaimInterestCalcRulesComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
            case "Claims Discount Calculation Rules" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(ClaimDiscountCalcRulesComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
            case "Pre-Existing Condition Rules" : {
                this.activeModal.dismiss();
                const ref = this.modalService.open(PreExistingConditionRulesComponent, {
                    size: "lg"
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.lineOfBusinessId = this.pcpaaSupportInfoDetailsForm.get('lineOfBusiness').value;
                break;
            }
        }
    }
}
