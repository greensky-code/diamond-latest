/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import {GridOptions} from "ag-grid-community";

import {DatePipe} from "@angular/common";
import {KeyboardShortcutsComponent, ShortcutInput,} from "ng-keyboard-shortcuts";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomValidators} from "../../../../shared/validators/custom-validator";
import {Mask} from "../../../../shared/pipes/text-format.pipe";
import {DateFormatPipe} from "../../../../shared/pipes/date-format.pipe";
import {FormValidation} from "../../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from "../../../../shared/components/alert-message";
import {MessageType, PopUpMessage, PopUpMessageButton,} from '../../../../shared/components/pop-up-message';
import {DatePickerConfig, datePickerModel} from "../../../../shared/config";
import {PopUpMessageComponent} from "../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";

import {Menu, SearchModel,} from "../../../../shared/models/models";
import {SecurityLookup} from "../../../../shared/lookup/security-lookup";
import {SecColMaster} from "../../../../api-models/security/sec-col-master.model";
import {SecColMasterService} from "../../../../api-services/security/sec-col-master.service";
import {SecColDetailService} from "../../../../api-services/security/sec-col-detail.service";
import {SecColDetail} from "../../../../api-models/security/sec-col-detail.model";
import {DddwDtl, MessageMasterDtl} from '../../../../api-models';
import {DddwDtlService, MessageMasterDtlService} from "../../../../api-services";
import {ToastService} from "../../../../shared/services/toast.service";
import {AuthenticationService} from "../../../../api-services/authentication.service";
import {SearchboxComponent} from "../../../../shared/components/searchbox/searchbox.component";
import {CommonService} from "../../../../shared/services/common.service";
import {FunctionalLevelSecurityService} from "../../../../api-services/security/functional-level-security.service";
import {SecWinViewModel} from "../../../../view-model/security/sec-win-view-model";

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
    selector: "copyfieldlevelsecurity",
    templateUrl: "./copy-field-level-security.component.html",
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
export class CopyFieldLevelSecurityComponent implements OnInit, AfterViewInit {
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
    functionalArea: DddwDtl[] = [];
    securityInd: DddwDtl[] = [];
    columnDefs: any[] = [];
    public menu: Menu[] = [];
    newItem = true;
    isSaveForm = false;
    showFields = false;
    submitForm = new EventEmitter<any>();
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

    config: any;
    isResetForm = false;
    sfldlId: any;
    updateUser: string;
    searchStatus: boolean = false;
    keyNames: string = "sfldl_id";
    keyValues: any;
    screenCloseRequested: Boolean = false;
    isFormModifiedStatus: Boolean = false;

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

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
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
                field: "",
                width: 200,
                headerClass: 'clr-blue',
                valueGetter: (data) => {
                    for (let item of this.functionalArea) {
                        if (item.dddwDtlPrimaryKey.dataVal === data.data.functionalArea) {
                            return item.dddwDtlPrimaryKey.displayVal;
                        }
                    }
                }
            },
            {
                headerName: "Table Name",
                field: "secColDetailPrimaryKey.tableName",
                width: 200,
                headerClass: 'clr-blue'
            },
            {
                headerName: "Column Name",
                field: "secColDetailPrimaryKey.columnName",
                width: 200,
                headerClass: 'clr-blue'
            },
            {
                headerName: "Security",
                field: "",
                width: 200,
                headerClass: 'clr-blue',
                valueGetter: (data) => {
                    for (let item of this.securityInd) {
                        if (item.dddwDtlPrimaryKey.dataVal === data.data.securityInd) {
                            return item.dddwDtlPrimaryKey.displayVal;
                        }
                    }
                }
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
        private messageService: MessageMasterDtlService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.secColDetailService.getSecColDetailsCount().subscribe((resp) => {});

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.fieldLevelSecuritySetupForm);
        this.updateUser = this.authenticationService.getActiveUser();
        this.getFunctionalArea();
        this.getSecurityInd();
        this.createDataGrid();
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
        // this.secColDetailCopyFormConfig = null;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {

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

    onSelectionChanged(event: any) {

    }

    createErrorPopup(id: number) {
        this.messageService.findByMessageId(11083).subscribe(res => {
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
                    this.showFields = false;
                    this.messageService.findByMessageId(34004).subscribe(resp => {
                        this.showPopUp('34004: ' + resp[0].messageText, 'Field Level Security Setup')
                    })
                } else if (button.name === "no") {
                    this.showFields = false;
                }
            });
        });
    }

    getSecColDetail(sfldlId: any) {
        this.sfldlId = sfldlId;
        this.secColDetails = [];
        this.secColMasterService.getSecColMaster(sfldlId).subscribe(res => {
            if (res) {
                this.fieldLevelSecuritySetupForm.patchValue({
                    description: res.description
                });
                this.secColDetailService.findBySfldlId(sfldlId).subscribe((secColDetails) => {
                    this.secColDetails = secColDetails;
                    if (secColDetails) {
                        this.dataGridGridOptions.api.setRowData(secColDetails)
                    } else {
                        this.dataGridGridOptions.api.setRowData([]);
                    }
                });
            } else {
                this.messageService.findByMessageId(11083).subscribe(res => {
                    let popMsg = new PopUpMessage(
                        "Field Level Security Setup",
                        "Field Level Security Setup",
                        "11083: " + res[0].messageText,
                        "icon"
                    );
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
                            this.fieldLevelSecuritySetupForm.get('fieldLevelSecurityId').disable();
                            this.isFormDataModified();
                        } else if (button.name === "no") {
                            this.showFields = false;
                        }
                    });
                });
            }
        });
    }

    setSecColMasterValues(secColMaster: SecColMaster) {
        this.fieldLevelSecuritySetupForm.patchValue({
            fieldLevelSecurityId: secColMaster.sfldlId,
            description: secColMaster.description,
        });
        this.sfldlId = secColMaster.sfldlId;
    }

    isFormDataModified = () => {
        this.fieldLevelSecuritySetupForm.valueChanges.subscribe(() => {
            this.isFormModifiedStatus = true;
        });
    };

    modalClose = () => {
        this.activeModal.close();
    };

    selected = () => {
        this.screenCloseRequested = true;
        if (this.isFormModifiedStatus === true) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopupAlert(message[0].messageText, "Window Access");
                });
        } else {
            this.submitForm.emit(this.dataGridGridOptions.api.getSelectedRows());
            this.activeModal.close();
        }
    };
    selectAll = () => {
        this.dataGridGridOptions.api.selectAll();
    };

    deselectAll = () => {
        this.dataGridGridOptions.api.deselectAll();
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
                this.showFields = false;
                this.messageService.findByMessageId(34004).subscribe(resp => {
                    this.showPopUp('34004: ' + resp[0].messageText, 'Field Level Security Setup')
                })
            } else if (resp.name === "No") {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } // 3rd case: In case of cancel do nothing
        });
    };


    getFunctionalArea() {
        this.functionalArea = [];
        this.dddwDtlService.findByColumnNameAndDwname("functional_area", "dw_sfldl_dtl").subscribe((dddwDtls) => {
                this.functionalArea = dddwDtls;
            });
    }

    getSecurityInd() {
        this.securityInd = [];
        this.dddwDtlService.findByColumnNameAndDwname("security_ind", "dw_sfldl_dtl").subscribe((dddwDtls) => {
                this.securityInd = dddwDtls;
            });
    }
}
