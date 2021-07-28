/* Copyright (c) 2020 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import {GridOptions} from "ag-grid-community";

import {DatePipe} from "@angular/common";
import {KeyboardShortcutsComponent, ShortcutInput,} from "ng-keyboard-shortcuts";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage} from "../../../shared/components/alert-message/alert.message.model";
import {MessageType, PopUpMessage, PopUpMessageButton,} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, datePickerModel} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {AlertMessageService} from "../../../shared/components/alert-message";
import {CONSTANTS, getFieldLevelSecurityShortcutKeys, SharedService,} from '../../../shared/services/shared.service';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, OPERATIONS, SearchModel,} from "../../../shared/models/models";
import {SecurityLookup} from "../../../shared/lookup/security-lookup";
import {SecColMaster} from "../../../api-models/security/sec-col-master.model";
import {SecColMasterService} from "../../../api-services/security/sec-col-master.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {DddwDtl, MessageMasterDtl} from "../../../api-models";
import {DddwDtlService, MessageMasterDtlService} from "../../../api-services";
import {SecColDetailFormConfig, SecColDetailFormFieldNames,} from "../../../shared/models/constants";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {SecColDetailPrimaryKey} from "../../../api-models/sec-col-detail-primary-key";
import {AuthenticationService} from "../../../api-services/authentication.service";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {CommonService} from "../../../shared/services/common.service";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {Form} from "../../../shared/helpers/form.helper";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {CopyFieldLevelSecurityComponent} from "./copy-field-level-security/copy-field-level-security.component";
import {AuditService} from "../../../shared/services/audit.service";
import {SecurityHelpComponent} from "../security-help/security-help.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

// Use the Component directive to define the FieldLevelSecuritySetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: "fieldlevelsecuritysetup",
    templateUrl: "./field-level-security-setup.component.html",
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecColMasterService,
        SecColDetailService,
        CommonService,
    ],
})
export class FieldLevelSecuritySetupComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    fieldLevelSecuritySetupForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    public shortcuts: ShortcutInput[] = [];
    public secColDetails: SecColDetail[] = [];
    dddwDtls: DddwDtl[] = [];
    dddwDtls1: DddwDtl[] = [];
    columnDefs: any[] = [];
    public menu: Menu[] = [];
    newItem = true;
    isSaveForm = false;
    showFields = false;
    isAddNewRow = false;
    windowId = 'SFLDL';
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon: boolean = false;
    @Input() winID?: string;
    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;

    searchModel = new SearchModel(
        "seccolmasters/lookup",
        SecurityLookup.SECURITY_ALL,
        SecurityLookup.SECURITY_DEFAULT,
        []
    );

    secColDetailFormConfig = SecColDetailFormConfig;
    secColDetailState: Array<FormRow> = [];
    config: any;
    isResetForm = false;
    sfldlId: any;
    updateUser: string;
    searchStatus: boolean = false;
    keyNames: string = "sfldl_id";
    keyValues: any;
    screenCloseRequested: Boolean = false;
    isFormModifiedStatus: Boolean = false;
    funcArea: any;
    securitySetup: SecColDetail;
    secColDetailChanged: any;
    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == "yes") {
            console.log("button yes has been click!");
        }
        if (button.name == "no") {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }
    saveAll(){
         this.isSaveForm = true;
         setTimeout(() => {
           this.isSaveForm = false;
         }, 2000);
    }
    menuOpened = "";
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.newScreen();
                    break;
                }
                case "Open": {
                    this.openScreen();
                    break;
                }
                case "Delete": {
                    this.toastService.showToast('Action is not implemented', NgbToastType.Danger);
                    break;
                }
                case "Save": {
                   this.saveAll();
                    break;
                }
                case "Close": {
                    this.closeModal()
                    break;
                }
                case "Shortcut Menu": {
                    //const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    //ref.componentInstance.showIcon = true;
                    break;
                }
                case 'Exit' : {
                    this.exitScreen();
                    break;
                }
                default: {
                    this.toastService.showToast(
                        "Action is not valid",
                        NgbToastType.Danger
                    );
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {
            // handle Edit-Menu Actions
            //this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === "Topic") {
            // handle Topic-Menu Actions
        } else if (event.menu.menuItem === "Special") {
            switch (event.action) {
                case 'Copy Field Level Security ID':
                    this.copyFieldLevelSecurityId();
                    break;
                default:
                    break;
            }
        } else if (event.menu.menuItem === "Window") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(
                            CONSTANTS.F_AUDIT,
                            this.winID
                        );
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {
                                size: "lg",
                            });
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.winID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService
                                .findByMessageId(11073)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    this.alertMessage = this.alertMessageService.error(
                                        "11073: " + message[0].messageText
                                    );
                                });
                        }
                    } else {
                        this.messageService
                            .findByMessageId(30164)
                            .subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error(
                                    "30164: " + message[0].messageText
                                );
                            });
                    }

                    break;
                }
                case 'Show Timestamp':
                    if (this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Delete', shortcutKey: 'Ctrl+D'},
                    { name: 'Save', shortcutKey: 'Ctrl+S'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}
                ]
            },
            {
                menuItem: "Topic",
                dropdownItems: [],
            },
            {
                menuItem: "Special",
                dropdownItems: [{name: "Copy Field Level Security ID", shortcutKey: 'Ctrl+F'}],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: "F4", disabled: true}],
            },
            {
                menuItem: "Window",
                dropdownItems: [
                    {name: "Show Timestamp", shortcutKey: 'Shift+Alt+S'},
                    {name: "Audit Display", shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Field Level Security Setup"},
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    {name: "Contents"},
                    {name: "Search for Help on..."},
                    {name: "This Window", shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: "Glossary"},
                    {name: "Getting Started"},
                    {name: "How to use Help"},
                    {isHorizontal: true},
                    {name: "About Diamond Client/Server"},
                ],
            },
        ];
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            defaultColDef: {
                minWidth: 100,
                editable: true,
            },
        };
        this.dataGridGridOptions.editType = "fullTable";

        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Functional Area",
                field: "secColDetail.functionalArea",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
            },
            {
                headerName: "Table Name",
                field: "secColDetailPrimaryKey.tableName",
                width: 200,
            },
            {
                headerName: "Column Name",
                field: "secColDetailPrimaryKey.columnName",
                width: 200,
            },
            {
                headerName: "Security",
                field: "secColDetail.securityInd",
                width: 200,
            },
        ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public datepipe: DatePipe,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secColMasterService: SecColMasterService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private dddwDtlService: DddwDtlService,
        private secColDetailService: SecColDetailService,
        private authenticationService: AuthenticationService,
        private toastService: ToastService,
        private router: Router,
        public activeModal: NgbActiveModal,
        private commonService: CommonService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private sharedService: SharedService,
        private auditService: AuditService,

    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.secColDetailService.getSecColDetailsCount().subscribe((resp) => {
        });

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.fieldLevelSecuritySetupForm);
        this.updateUser = this.authenticationService.getActiveUser();
        //this.createDataGrid();
        this.getFunctionalArea();
        this.getSecurityInd();
        this.menuInit();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.fieldLevelSecuritySetupForm = this.formBuilder.group(
            {
                fieldLevelSecurityId: ["", {updateOn: "blur", validators: []}],
                description: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
        this.secColDetails = [];
        this.newItem = true;
        // this.secColDetailFormConfig = null;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getFieldLevelSecurityShortcutKeys(this));
        this.cdr.detectChanges();
        //this.columnDefs = this.searchModel.defaultColumnDefs.map(x => Object.assign({}, x));
        //this.resetData();
    }

    saveFieldLevelSecurity() {
        this.saveSecColDetail(10);
    }

    openLookupFieldSearchModel() {
        let secColMaster = new SecColMaster();
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        this.newItem = false;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                secColMaster = res;
                this.showFields = true;
            
                this.getSecColDetail(secColMaster.sfldlId);
                this.setSecColMasterValues(secColMaster);
                this.searchStatus = true;
                this.keyValues = secColMaster.sfldlId;
            } else {
                this.keyValues = "";
                this.searchStatus = false;
            }
        });
    }

    editSecColDetail: boolean;
    editSecColMaster: boolean;
    secColMaster: SecColMaster;
    secColMasters: SecColMaster[];
    public secWin: SecWinViewModel;

    createSecColDetail() {
        this.formValidation.validateForm();
        if (this.fieldLevelSecuritySetupForm.valid) {
            let secColDetail = new SecColDetail();
            secColDetail.securityCode = Form.getValue(
                this.fieldLevelSecuritySetupForm,
                "fieldLevelSecurityId"
            );
            secColDetail.sfldlId = Form.getValue(
                this.fieldLevelSecuritySetupForm,
                "sfldlId"
            );
            secColDetail.tableName = Form.getValue(
                this.fieldLevelSecuritySetupForm,
                "description"
            );
            // secColDetail.columnName = preStateRecord.id.columnName;
            // secColDetail.secColDetailPrimaryKey = secColDetailPrimaryKey;
            // secColDetail.action = preStateRecord.action;
            secColDetail.updateUser = this.updateUser;
            let date = new Date();
            let today = this.datepipe.transform(date, "dd-MM-yyyy");
            secColDetail.insertDatetime = today;
            secColDetail.updateDatetime = today;
            secColDetail.insertUser = this.updateUser;
            this.secColDetailService.createSecColDetail(secColDetail).subscribe(
                (response) => {
                    this.alertMessage = this.alertMessageService.info(
                        "Record successfully created."
                    );
                    this.editSecColDetail = false;
                },
                (error) => {
                    this.alertMessage = this.alertMessageService.error(
                        "An Error occurred while creating new record. Please check your entry."
                    );
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateSecColDetail(columnName: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.fieldLevelSecuritySetupForm.valid) {
                let secColDetail = new SecColDetail();
                secColDetail.securityCode = Form.getValue(
                    this.fieldLevelSecuritySetupForm,
                    "fieldLevelSecurityId"
                );
                secColDetail.sfldlId = Form.getValue(
                    this.fieldLevelSecuritySetupForm,
                    "sfldlId"
                );
                secColDetail.tableName = Form.getValue(
                    this.fieldLevelSecuritySetupForm,
                    "description"
                );
                this.secColDetailService
                    .updateSecColDetail(secColDetail, columnName)
                    .subscribe(
                        (response) => {
                            this.alertMessage = this.alertMessageService.info(
                                "Record successfully updated."
                            );
                            this.editSecColDetail = false;
                        },
                        (error) => {
                            this.alertMessage = this.alertMessageService.error(
                                "An Error occurred while updating record. Please check your entry."
                            );
                        }
                    );
            } else {
                this.alertMessage = this.alertMessageService.error(
                    "Some required information is missing or incomplete. Please correct your entries and try again."
                );
            }
        } else {
            this.showPopUp(
                "You are not permitted to update Group Master ",
                "Group Master Permissions"
            );
        }
    }

    // saveSecColDetail() {
    //     if (this.editSecColDetail) {
    //         this.updateSecColDetail(this.secColDetail.columnName)
    //     } else {
    //         this.createSecColDetail();
    //     }
    // }
    deleteSecColDetail(columnName: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp("Not permitted to delete", "Group Master Security");
        } else {
            this.secColDetailService.deleteSecColDetail(columnName).subscribe(
                (response) => {
                    this.alertMessage = this.alertMessageService.info(
                        "Record successfully deleted."
                    );
                },
                (error) => {
                    this.alertMessage = this.alertMessageService.error(
                        "An Error occurred while deleting record."
                    );
                }
            );
        }
    }

    onChangeSecurityId(event: any) {
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === "Tab") {
            event.preventDefault();
            this.sfldlId = event.target.value;
            if (this.sfldlId === '') {
                this.createErrorPopup(this.sfldlId);
            } else {
                this.getSecColDetail(this.sfldlId);
            }
        }
    }

    createErrorPopup(id: number) {
        this.messageService.findByMessageId(11083).subscribe((res) => {
          let popMsg = new PopUpMessage(
            "Field Level Security Setup",
            "Field Level Security Setup",
            "11083: " + res[0].messageText,
            "icon"
          );
          // tslint:disable-next-line:max-line-length
          popMsg.buttons = [
            new PopUpMessageButton("yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("no", "No", "btn btn-primary"),
          ];
          let ref = this.modalService.open(PopUpMessageComponent, {
            size: "lg",
          });
          ref.componentInstance.popupMessage = popMsg;
          ref.componentInstance.showIcon = true;
          ref.componentInstance["buttonclickEvent"].subscribe((button: any) => {
            if (button.name === "yes") {
              this.showFields = true;
              this.fieldLevelSecuritySetupForm
                .get("fieldLevelSecurityId")
                .disable();
                 this.newItem = true;
              this.isFormDataModified();
            } else if (button.name === "no") {
              this.showFields = false;
            }
          });
        });
    }

    getSecColDetail(sfldlId: any) {
        this.sfldlId = sfldlId;
        this.secColDetails = [];
        this.secColMasterService.getSecColMaster(sfldlId).subscribe((res) => {
          if (res) {
            this.fieldLevelSecuritySetupForm.patchValue({
              description: res.description,
            });
            this.showFields = true;
             this.newItem = false;
               this.fieldLevelSecuritySetupForm
                 .get("fieldLevelSecurityId")
                 .disable();
            this.secColDetailService
              .findBySfldlId(sfldlId)
              .subscribe((secColDetails) => {
                if (secColDetails) {
                  this.secColDetails = secColDetails;
                  if (this.secColDetails) {
                    this.populateDynamicForm(this.secColDetails);
                    this.showFields = true;
                   
                  }
                } else {
                  
                }
              });
          } else {
            this.createErrorPopup(sfldlId);
          }
        },
          (error) => {
                        this.createErrorPopup(sfldlId);

          });
    }

    allTables: any[] = [];

    populateDynamicForm(secColDetails: SecColDetail[]) {
        this.securitySetup = secColDetails[secColDetails.length - 1];
        secColDetails.forEach((secColDetail: SecColDetail) => {
            let mockConfig = JSON.parse(JSON.stringify(this.secColDetailFormConfig)); // make a copy of original config
            this.secColDetailFormConfig.forEach((field, index) => {
                if (field.name === SecColDetailFormFieldNames.FUNCTIONAL_AREA) {
                    mockConfig[index].value = secColDetail.functionalArea;
                } else if (field.name === SecColDetailFormFieldNames.TABLE_NAME) {
                    mockConfig[index].value =
                        secColDetail.secColDetailPrimaryKey.tableName;
                    mockConfig[index].data = this.allTables;
                } else if (field.name === SecColDetailFormFieldNames.COLUMN_NAME) {
                    mockConfig[index].value =
                        secColDetail.secColDetailPrimaryKey.columnName;
                    mockConfig[index].data = this.allTables;
                } else if (field.name === SecColDetailFormFieldNames.SECURITY_IND) {
                    mockConfig[index].value = secColDetail.securityInd;
                }
            });
            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            formState.id = {
                sfldlId: secColDetail.secColDetailPrimaryKey.sfldlId,
                columnName: secColDetail.secColDetailPrimaryKey.columnName,
                tableName: secColDetail.secColDetailPrimaryKey.tableName,
                functionalArea: secColDetail.functionalArea,
            };
            this.secColDetailState.push(formState); // add record
        });
        this.secColDetailState = JSON.parse(JSON.stringify(this.secColDetailState));
    }

    initGridOptions() {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
            defaultColDef: {
                minWidth: 100,
                editable: true,
            },
            singleClickEdit: true,
        };
        this.dataGridGridOptions.editType = "fullRow";
        this.dataGridGridOptions.columnDefs = this.searchModel.defaultColumnDefs.map(
            (x) => Object.assign({}, x)
        );
    }

    setSecColMasterValues(secColMaster: SecColMaster) {
        this.fieldLevelSecuritySetupForm.patchValue({
            fieldLevelSecurityId: secColMaster.sfldlId,
            description: secColMaster.description,
        });
        this.sfldlId = secColMaster.sfldlId;
    }

    getFunctionalArea() {
        this.dddwDtls = [];
        this.dddwDtlService
            .findByColumnNameAndDwname("functional_area", "dw_sfldl_dtl")
            .subscribe((dddwDtls) => {
                this.dddwDtls = dddwDtls;
                var Options: any = [];
                this.dddwDtls.forEach(function (index: any) {
                    Options.push({
                        key: index.dddwDtlPrimaryKey.displayVal,
                        value: index.dddwDtlPrimaryKey.dataVal,
                    });
                });
                this.secColDetailFormConfig[0].options = Options;
            });
    }

    getSecurityInd() {
        this.dddwDtls1 = [];
        this.dddwDtlService
            .findByColumnNameAndDwname("security_ind", "dw_sfldl_dtl")
            .subscribe((dddwDtls) => {
                this.dddwDtls1 = dddwDtls;
                var Options: any = [];
                this.dddwDtls1.forEach(function (index: any) {
                    Options.push({
                        key: index.dddwDtlPrimaryKey.displayVal,
                        value: index.dddwDtlPrimaryKey.dataVal,
                    });
                });
                this.secColDetailFormConfig[3].options = Options;
            });
    }

    resetData() {
        this.dataGridGridOptions.defaultColDef.editable = true;
        this.dataGridGridOptions.singleClickEdit = true;
        this.dataGridGridOptions.api.setRowData([
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]);
    }

    saveSecColDetail(event:any) {
        let secColDetails = new Array<SecColDetail>();
        const updatedRecords: FormRow[] = this.secColDetailState.filter(
            (record) => record.action
        );
        if (event === 10) {
            event = this.secColDetails;
        }
        
        if (updatedRecords.length > 0) {
            this.secColDetailState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map((k) => ({
                        key: k,
                        value: updatedRecord[k],
                    }));
                    let secColDetail: SecColDetail = this.populateSecColDetail(
                        pair,
                        preStateRecord.action
                    );
                    let date = new Date();
                    let today = this.datepipe.transform(date, "yyyy-MM-dd HH:mm:ss");
                    let secColDetailPrimaryKey = new SecColDetailPrimaryKey();
                    secColDetailPrimaryKey.sfldlId = this.sfldlId;
                    secColDetailPrimaryKey.tableName = preStateRecord.id.tableName;
                    secColDetailPrimaryKey.columnName = preStateRecord.id.columnName;
                    secColDetail.secColDetailPrimaryKey = secColDetailPrimaryKey;
                    secColDetail.action = preStateRecord.action;
                    secColDetail.updateDatetime = null;
                    secColDetail.updateUser = this.updateUser;
                    secColDetail.updateProcess = this.windowId
                    secColDetail.functionalArea = preStateRecord.id.functionalArea;
                    this.auditService.setAuditFields(secColDetail, sessionStorage.getItem('user'),this.windowId, OPERATIONS.UPDATE);

                    secColDetails.push(secColDetail);
                    this.isResetForm = false;
                }
            });
        }
        if (this.secColDetails === null) {
            this.secColDetails = [];
        }
        const newRecords = event.slice(this.secColDetailState.length);
        newRecords.forEach((record: { [x: string]: any }) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            
            let secCol : SecColDetail = this.populateSecColDetail(pair, FORM_FIELD_ACTION_TYPES.ADD);
            this.auditService.setAuditFields(secCol, sessionStorage.getItem('user'),this.windowId, OPERATIONS.ADD);
            secColDetails.push(
                this.populateSecColDetail(pair, FORM_FIELD_ACTION_TYPES.ADD)
            );
        });


        if (this.newItem) {
            let date = new Date();
            let today = this.datepipe.transform(date, "yyyy-MM-dd HH:mm:ss");
            let secColMaster = new SecColMaster();
            secColMaster.description = this.fieldLevelSecuritySetupForm.value.description;
            secColMaster.sfldlId = this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').value;
          
            secColMaster.insertUser = this.updateUser;
            secColMaster.insertProcess = this.windowId;
            secColMaster.updateUser = this.updateUser;
            secColMaster.updateProcess = this.windowId;
            this.secColMasterService
                .createSecColMaster(secColMaster)
                .subscribe((resp) => {
                    this.secColDetailService
                        .addUpdateSecColDetail(secColDetails)
                        .subscribe((resp) => {
                            this.toastService.showToast(
                                "Security column details  updated Successfully",
                                NgbToastType.Success
                            );
                            this.newItem = false;
                            this.isFormModifiedStatus = false;
                        });
                });
        } else {
            let secColMaster = new SecColMaster();
            secColMaster.description =
              this.fieldLevelSecuritySetupForm.value.description;
            secColMaster.sfldlId = this.fieldLevelSecuritySetupForm.get(
              "fieldLevelSecurityId"
            ).value;
            secColMaster.insertUser = this.updateUser;
            secColMaster.insertProcess = this.windowId;
            secColMaster.updateUser = this.updateUser;
            secColMaster.updateProcess = this.windowId;
            this.secColMasterService
              .updateSecColMaster(
                secColMaster,
               this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').value
              )
              .subscribe((data) => {
                this.toastService.showToast(
                  "Security column Master  updated Successfully",
                  NgbToastType.Success
                );
              });
            if(secColDetails.length>0){
            this.secColDetailService
                .addUpdateSecColDetail(secColDetails)
                .subscribe((resp) => {
                    this.toastService.showToast(
                        "Security column details  updated Successfully",
                        NgbToastType.Success
                    );
                    this.isFormModifiedStatus = false;
                });
            }
        }
    }

    closeModal() {
        this.screenCloseRequested = true;
        if  (this.isFormModifiedStatus === true && this.fieldLevelSecuritySetupForm.dirty) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('saveBeforeExit', 'Field Level Security', '29065: ' + message[0].messageText, 'icon');
                popUpMessage.buttons = [
                    new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
                    new PopUpMessageButton('No', 'No', 'btn btn-primary'),
                    new PopUpMessageButton('Cancel', 'Cancel', '')
                ];
                popUpMessage.messageType = MessageType.SUCCESS;
                let ref = this.sharedService.showDialogBox(popUpMessage);
                ref.buttonclickEvent.subscribe((event: any) => {
                    if (event.name === 'Yes') {
                        this.saveFieldLevelSecurity();
                    } else if (event.name === 'No') {
                        this.router.navigateByUrl('/');
                        if (this.screenCloseRequested === true) {
                            this.activeModal.close();
                        }
                    }
                });
            })
        } else {
            this.activeModal.close();
        }
    }

    populateSecColDetail(event: any, action: FORM_FIELD_ACTION_TYPES) {
        let date = new Date();
        let today = this.datepipe.transform(date, "yyyy-MM-dd HH:mm:ss");
        let secColDetail = new SecColDetail();
        secColDetail.functionalArea = event[0].value;
        secColDetail.tableName = event[1].value;
        secColDetail.columnName = event[2].value;
        secColDetail.securityInd = event[3].value;
        let secColDetailPrimaryKey = new SecColDetailPrimaryKey();
        secColDetailPrimaryKey.sfldlId = this.sfldlId;
        secColDetailPrimaryKey.tableName = event[1].value;
        secColDetailPrimaryKey.columnName = event[2].value;
        secColDetail.secColDetailPrimaryKey = secColDetailPrimaryKey;
        secColDetail.updateUser = this.updateUser;
        secColDetail.insertDatetime = today;
        secColDetail.insertProcess = this.sfldlId;
        secColDetail.updateDatetime = today;
        secColDetail.insertUser = this.updateUser;
        secColDetail.sfldlId = this.sfldlId;
        secColDetail.action=action;
        return secColDetail;
    }

    isFormDataModified = () => {
        this.fieldLevelSecuritySetupForm.valueChanges.subscribe(() => {
            this.isFormModifiedStatus = true;
        });
    };

    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.isFormModifiedStatus === true) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopupAlert(
                        message[0].messageText,
                        "Field Level Security Setup"
                    );
                });
        } else {
            this.activeModal.close();
        }
    };

    showPopupAlert = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(
            title,
            title,
            message,
            "info",
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "Yes") {
               this.saveFieldLevelSecurity()
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } else if (resp.name === "No") {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } else {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            }
            // 3rd case: In case of cancel do nothing
        });
    };

    dynamicformChange(event: any) {
        let record = event.data;
        var dataIndex = event.index;
        const pair = Object.keys(record).map((k) => ({
            key: k,
            value: record[k],
        }));
        this.funcArea = pair[0].value;
        this.setAllTableLookUp(this.funcArea);
      //  this.isSaveForm = true;
        this.isFormModifiedStatus = true;
    }

    setAllTableLookUp(funcArea: any) {
        this.allTables = [];
        let tableNames = [];
        if (funcArea == "1") {
            //authorization
            tableNames.push("INST_CLAIM_HEADER");
            tableNames.push("AUTH_MASTER");
            tableNames.push("AUTH_PROVIDER");
            tableNames.push("lAUTH_APPEAL");
            tableNames.push("AUTH_PROCEDURE");
            tableNames.push("AUTH_DAYS_VIS_EXTENSION");
            tableNames.push("AUTH_PHYS_ADVISOR");
            tableNames.push("AUTH_SECOND_OPINION");
        } else if (funcArea == "2") {
            //Audit Trail
            tableNames.push("AUDIT_HDR");
            tableNames.push("AUDIT_CHANGE_DTL");
            tableNames.push("AUDIT_DELETE_DTL");
        } else if (
            funcArea == "3" // Claims
        ) {
            tableNames.push("DENTAL_CLAIM_HEADER");
            tableNames.push("DENTAL_CLAIM_DETAIL");
            tableNames.push("INST_CLAIM_HEADER");
            tableNames.push("INST_CLAIM_DETAIL");
            tableNames.push("PROFSVC_CLAIM_HEADER");
            tableNames.push("PROFSVC_CLAIM_DETAIL");
            tableNames.push("HOLD_REASON");
            tableNames.push("CLAIM_OTHER_CARRIER");
            tableNames.push("PROCEDURE_CODE_MASTER");
            tableNames.push(" DIAGNOSIS_CODE_MASTER");
        } else if (funcArea == "4") {
            // Customer Service
        } else if (funcArea == "5") {
            // Members
            tableNames.push("MEMBER_ELIG_HISTORY");
            tableNames.push("MEMBER_MASTER");
            tableNames.push("MEMBER_OTHER_COVERAGE");
            tableNames.push("MEMBER_CONTACT");
            tableNames.push("GROUP_MASTER");
            tableNames.push("GROUP_CONTRACT");
            tableNames.push("GROUP_PERCENT_OF_SAVINGS");
            tableNames.push("PREMIUM_MASTER");
            tableNames.push("GROUP_CONTACT_PERSON");
            tableNames.push("MEMBER_CONDITIONS");
            tableNames.push("MEMBER_ADDRESS");
            tableNames.push("MEMBER_WORKING_AGED");
            tableNames.push("PRE_EXIST_RULES");
            tableNames.push("PRE_EXIST_RULE_DTL");
            tableNames.push("LOB_PRE_EXIST_RULES");
            tableNames.push("LOB_PRE_EXIST_RULE_DTL");
        } else if (funcArea == "6") {
            // Premiums
            tableNames.push("AR_ADJUSTMENT");
            tableNames.push("AR_CASH_RECEIPT");
            tableNames.push("PMB_AR_CUST_BILL_HISTORY");
            tableNames.push("PMB_AR_CUSTOMER_MASTER");
            tableNames.push("AR_CASH_BATCH_CONTROL");
        } else if (funcArea == "7") {
            // Providers
            tableNames.push("PROV_CREDENTIAL");
            tableNames.push("PROV_ADDRESS");
            tableNames.push("PROV_CONTRACT");
            tableNames.push("PROV_MASTER");
            tableNames.push("PROCEDURE_PRICE");
            tableNames.push("TAX_REPORTING_ENTITY");
            tableNames.push("PROV_ADDRESS_CONTACT");
            tableNames.push("PROV_SPECIALTY");
            tableNames.push("PROV_CONTRACT_VENDOR");
            tableNames.push("COV_PROV_GROUP_MASTER");
            tableNames.push("PROV_CONTRACT_SPECIALTY");
            tableNames.push("SITE_CODE_MASTER");
            tableNames.push("SITE_ADDRESS");
            tableNames.push("SITE_ADDRESS_CONTACT");
        } else if (funcArea == "8") {
            tableNames.push("VENDOR_ADDRESS");
            tableNames.push("VENDOR_MASTER");
            tableNames.push("VENDOR_TIN");
            tableNames.push("INCENTIVE_RULE");
            tableNames.push("INCENTIVE_QUALITY_PROGRAM");
        }

        tableNames.forEach((table) => {
            let tempCol = {
                owner: "DORIS",
                tableName: table,
            };
            this.allTables.push(tempCol);
        });

        this.secColDetailFormConfig[1].data = this.allTables;
    }

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Field Level Security Setup";

        ref.componentInstance.insertDateTime = this.securitySetup.insertDatetime;
        ref.componentInstance.insertProcess = this.securitySetup.insertProcess;
        ref.componentInstance.insertUser = this.securitySetup.insertUser;
        ref.componentInstance.updateUser = this.securitySetup.updateUser;
        ref.componentInstance.updateDateTime = this.securitySetup.updateDatetime;
        ref.componentInstance.updateProcess = this.securitySetup.updateProcess;
    };

    onRowClickEvent(event: any) {
        this.secColDetailChanged = this.secColDetails[event.index];
    }

    openCopyFieldLevelSecurityScreen = () => {
        this.modalService.open(CopyFieldLevelSecurityComponent);
    };

    openNewScreen = () => {
        this.secColDetailFormConfig = SecColDetailFormConfig;
        this.secColDetailState= [];
        this.fieldLevelSecuritySetupForm.reset();
        this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').enable();
        this.showFields = false;
        this.isResetForm = true;
    };

    setFormDataModified = () => {
        this.isFormModifiedStatus = true;
    };

    setDeleteData = () => {
        this.messageService.findByMessageId(29070).subscribe(res => {
            let popUpMessage = new PopUpMessage(
                'Field Level Security Setup',
                'Field Level Security Setup',
                '29070: '+
                res[0].messageText,
                "info",
                [],
                MessageType.SUCCESS
            );
            popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Ok", ""));
            popUpMessage.buttons.push(new PopUpMessageButton("No", "Cancel", ""));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === "Yes") {
                   this.saveFieldLevelSecurity()
                } else if (resp.name === "No") {

                }
            })
        })
    }

    openScreen = () => {
        if (this.isFormModifiedStatus === true) {
            this.messageService.findByMessageId(29065).subscribe(res => {
                let popUpMessage = new PopUpMessage(
                    'Field Level Security Setup',
                    'Field Level Security Setup',
                    res[0].messageText,
                    "info",
                    [],
                    MessageType.SUCCESS
                );
                popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
                popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
                popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                    if (resp.name === "Yes") {
                        this.saveFieldLevelSecurity()
                        setTimeout(() => {
                            this.openNewScreen()
                        }, 1000)
                    } else if (resp.name === "No") {
                        this.openNewScreen()
                    } else {

                    }
                });
            })
        } else {
            this.openNewScreen()
        }
    }

    newScreen = () => {
        if (this.isFormModifiedStatus === true) {
            this.messageService.findByMessageId(29065).subscribe(res => {
                let popUpMessage = new PopUpMessage(
                    'Field Level Security Setup',
                    'Field Level Security Setup',
                    res[0].messageText,
                    "info",
                    [],
                    MessageType.SUCCESS
                );
                popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
                popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
                popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.showIcon = true;
                ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                    if (resp.name === "Yes") {
                        this.saveFieldLevelSecurity()
                        setTimeout(() => {
                            this.isAddNewRow = true
                        }, 1000)
                    } else if (resp.name === "No") {
                        this.isAddNewRow = true
                    } else {

                    }
                });
            })
        } else {
            this.isAddNewRow = true
        }
    };

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
                    case 'd': {
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Delete'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    }
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
                    case 'f':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Copy Field Level Security ID'
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

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    helpScreen() {
        const modalRef = this.modalService.open(SecurityHelpComponent, {
            windowClass: "myCustomModalClass",
        });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = "SFLDL_Field_Level_Security.htm";
    }

    copyFieldLevelSecurityId() {
        if (this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').value === '') {
            this.messageService.findByMessageId(7136).subscribe(res => {
                this.showPopUp(
                    '7136: ' + res[0].messageText.replace('@1', 'Copy Field Level Security ID'),
                    'Field Level Security Setup')
            })
        } else {
            this.openCopyFieldLevelSecurityScreen()
        }
    }
}
