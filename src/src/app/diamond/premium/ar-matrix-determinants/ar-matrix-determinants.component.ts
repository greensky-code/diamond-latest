/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { constructor } from 'typescript';
import {GroupContactPerson, MessageMasterDtl, SecUser} from '../../../api-models';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { MatrixDetermXService } from '../../../api-services/premium/matrix-determ-x.service';
import { MatrixDetermHeaderService } from '../../../api-services/premium/matrix-determ-header.service';
import { MatrixDetermY } from '../../../api-models/premium/matrix-determ-y.model'
import { MatrixDetermX } from '../../../api-models/premium/matrix-determ-x.model'
import { MatrixDetermHeader } from '../../../api-models/premium/matrix-determ-header.model'
import { MatrixDetermYService } from '../../../api-services/premium/matrix-determ-y.service';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { PremiumMatrixHeadersLookup } from '../../../shared/lookup/premium-matrix-headers-lookup';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel} from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {MessageMasterDtlService} from "../../../api-services";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {
    ContactPersonFieldNames, MatrixDeterminantXFields,
    MatrixDeterminantXFromConfig, MatrixDeterminantYFields,
    MatrixDeterminantYFromConfig
} from "../../../shared/models/constants";
import {DatePipe} from "@angular/common";
import {DynamicFormComponent} from "../../../shared/components/dynamic-form/dynamic-form.component";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {
    getArMatrixDeterminantShortcutKeys,
    getGroupMasterSearchShortcut,
    getGroupMasterShortcutKeys
} from "../../../shared/services/shared.service";
import {PremiumHelpComponent} from "../premium-help/premium-help.component";

@Component({

    selector: 'armatrixdeterminants',
    templateUrl: './ar-matrix-determinants.component.html',
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        MatrixDetermYService,
        MatrixDetermXService,
        MatrixDetermYService,
        MatrixDetermHeaderService
    ]

})
export class ArMatrixDeterminantsComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    arMatrixDeterminantsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'MATRX';
    public isSuperUser = false;
    public secProgress = true;
    isLoaded = false;
    determinantId: any;
    editedDynamicForm: any;
    isChangeRecord: boolean = false;

    editMatrixDetermHeader: boolean;
    matrixDetermHeader: MatrixDetermHeader;
    matrixDetermHeaders: MatrixDetermHeader[]; editMatrixDetermX: boolean;
    matrixDetermX: MatrixDetermX;
    matrixDetermXes: MatrixDetermX[]; editMatrixDetermY: boolean;
    matrixDetermY: MatrixDetermY;
    matrixDetermYs: MatrixDetermY[];
    private dataLoadedMap = new Map<string, boolean>();
    public userTemplateId: string;
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    private deleteDisabled: boolean = true;
    isMatrixDisabled = false;
    showMatrixFields = false;
    menu: Menu[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    matrixDeterminantXFromConfig = MatrixDeterminantXFromConfig;
    matrixDeterminantYFromConfig = MatrixDeterminantYFromConfig;
    searchModel = new SearchModel(
        'matrixdetermheaders/lookup',
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_DETERMINANT,
        PremiumMatrixHeadersLookup.PREMIUM_MATRIX_DETERMINANT,
        []
    );

    selectedDynamicFormRow: any;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('matrixDeterminant') matrixDeterminantEle: ElementRef;
    @ViewChild('matrixDetermY') matrixDetermYDynamicFormComponent: DynamicFormComponent;
    @ViewChild('matrixDetermX') matrixDetermXDynamicFormComponent: DynamicFormComponent;
    openScreenStatus: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private secColDetailService: SecColDetailService,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private datePipe: DatePipe,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        public activeModal: NgbActiveModal,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private matrixDetermHeaderService: MatrixDetermHeaderService,
        private matrixDetermXService: MatrixDetermXService,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService,
        private matrixDetermYService: MatrixDetermYService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arMatrixDeterminantsForm);
        this.createDataGrid001();
        this.createDataGrid002();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getArMatrixDeterminantShortcutKeys(this));

        this.cdr.detectChanges();
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

    createMatrixDetermHeader() {
        this.formValidation.validateForm();
        if (this.arMatrixDeterminantsForm.valid) {
            let matrixDetermHeader = new MatrixDetermHeader();
            matrixDetermHeader.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            matrixDetermHeader.matrixDescription = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDescription');
            this.matrixDetermHeaderService.createMatrixDetermHeader(matrixDetermHeader).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editMatrixDetermHeader = false;
                if (this.openScreenStatus === true) {
                    this.resetForm();
                }
                if (this.screenCloseRequest === true) {
                    this.activeModal.close()
                }
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateMatrixDetermHeader(matrixDeterminant: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.arMatrixDeterminantsForm.valid) {
                let matrixDetermHeader = new MatrixDetermHeader();
                matrixDetermHeader.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                matrixDetermHeader.matrixDescription = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDescription');
                this.matrixDetermHeaderService.updateMatrixDetermHeader(matrixDetermHeader, matrixDeterminant).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editMatrixDetermHeader = false;
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close()
                    }
                    if (this.openScreenStatus === true) {
                        this.resetForm();
                    }
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }
    saveMatrixDetermHeader() {
        if (this.editMatrixDetermHeader) {
            this.updateMatrixDetermHeader(this.matrixDetermHeader.matrixDeterminant)
        } else {
            this.createMatrixDetermHeader();
        }
    } deleteMatrixDetermHeader(matrixDeterminant: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermHeaderService.deleteMatrixDetermHeader(matrixDeterminant).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getMatrixDetermHeader(matrixDeterminant: string) {
        this.matrixDetermHeaderService.getMatrixDetermHeader(matrixDeterminant).subscribe(matrixDetermHeader => {
            this.matrixDetermHeader = matrixDetermHeader;
            this.showMatrixFields = true
            this.determinantId = matrixDeterminant;
            this.arMatrixDeterminantsForm.get('matrixDeterminant').disable();
            this.arMatrixDeterminantsForm.patchValue({
                // 'matrixDeterminant': this.matrixDetermHeader.matrixDeterminant,
                'matrixDescription': this.matrixDetermHeader.matrixDescription,
            }, {emitEvent: false});
            setTimeout(() => {
                this.isFormDataModified()
            }, 2000)
            this.deleteDisabled = true;
            this.menuInit();
        });
    }

    getMatrixDetermHeaders() {
        this.matrixDetermHeaderService.getMatrixDetermHeaders().subscribe(matrixDetermHeaders => {
            this.matrixDetermHeaders = matrixDetermHeaders;
        });
    }

    onLookupFieldMatrixDeterminant(event:any) {
        let determinantId = event.target.value;
        if (determinantId && event.key === 'Tab') {
            event.preventDefault();
            this.getMatrixDetermHeader(determinantId);
            this.getMatrixDetermX(determinantId);
            this.getMatrixDetermY(determinantId);
        } else if(event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if((!determinantId || determinantId === '') && event.key === 'Tab') {
            event.preventDefault();
            this.messageService.findByMessageId(1041).subscribe((message: MessageMasterDtl[]) => {
                let popMsg = new PopUpMessage('A/R Matrix Open', 'A/R Matrix Determinants', "1041: " + message[0].messageText, 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance["buttonclickEvent"].subscribe((event0: any) => {
                });
            });
        }

    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.arMatrixDeterminantsForm.patchValue({
                matrixDeterminant: res.matrixDeterminant
            });
            this.getMatrixDetermHeader(res.matrixDeterminant);
            this.getMatrixDetermX(res.matrixDeterminant);
            this.getMatrixDetermY(res.matrixDeterminant);
            this.isMatrixDisabled = true;
            this.popUpMessage = null;
        });
    }

    createMatrixDetermX() {
        this.formValidation.validateForm();
        if (this.arMatrixDeterminantsForm.valid) {
            let matrixDetermX = new MatrixDetermX();
            matrixDetermX.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            this.matrixDetermXService.createMatrixDetermX(matrixDetermX).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editMatrixDetermX = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateMatrixDetermX(matrixDeterminant: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.arMatrixDeterminantsForm.valid) {
                let matrixDetermX = new MatrixDetermX();
                matrixDetermX.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                this.matrixDetermXService.updateMatrixDetermX(matrixDetermX, matrixDeterminant).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editMatrixDetermX = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    } saveMatrixDetermX() {
        if (this.editMatrixDetermX) {
            this.updateMatrixDetermX(this.matrixDetermX.matrixDeterminant)
        } else {
            this.createMatrixDetermX();
        }
    } deleteMatrixDetermX(matrixDeterminant: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermXService.deleteMatrixDetermX(matrixDeterminant).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    } getMatrixDetermX(matrixDeterminant: string) {
        this.matrixDetermXService.getMatrixDetermX(matrixDeterminant).subscribe(matrixDetermX => {
            // this.matrixDetermX = matrixDetermX;
            // this.arMatrixDeterminantsForm.patchValue({
            //     'matrixDeterminant': this.matrixDetermX.matrixDeterminant,
            // });
            let matrixDetemXVal: any = matrixDetermX;
            matrixDetemXVal.forEach(element => {
                element['matrixSeq'] = element ? element['matrixDetermXPrimaryKey'] ? element['matrixDetermXPrimaryKey']['matrixSeq'] : '' : '';
            });
            this.matrixDetermXes = matrixDetemXVal;
            // this.dataGrid001GridOptions.api.setRowData(matrixDetemXVal);
            this.populateMatrixDetermX(matrixDetemXVal);
        });
    } getMatrixDetermXes() {
        this.matrixDetermXService.getMatrixDetermXes().subscribe(matrixDetermXes => {
            this.matrixDetermXes = matrixDetermXes;
        });
    }
    createMatrixDetermY() {
        this.formValidation.validateForm();
        if (this.arMatrixDeterminantsForm.valid) {
            let matrixDetermY = new MatrixDetermY();
            matrixDetermY.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            this.matrixDetermYService.createMatrixDetermY(matrixDetermY).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editMatrixDetermY = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateMatrixDetermY(matrixDeterminant: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.arMatrixDeterminantsForm.valid) {
                let matrixDetermY = new MatrixDetermY();
                matrixDetermY.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                this.matrixDetermYService.updateMatrixDetermY(matrixDetermY, matrixDeterminant).subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editMatrixDetermY = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    } saveMatrixDetermY() {
        if (this.editMatrixDetermY) {
            this.updateMatrixDetermY(this.matrixDetermY.matrixDeterminant)
        } else {
            this.createMatrixDetermY();
        }
    } deleteMatrixDetermY(matrixDeterminant: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermYService.deleteMatrixDetermY(matrixDeterminant).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    } getMatrixDetermY(matrixDeterminant: string) {
        this.matrixDetermYService.getMatrixDetermY(matrixDeterminant).subscribe(matrixDetermY => {
            // this.matrixDetermY = matrixDetermY;
            // this.arMatrixDeterminantsForm.patchValue({
            //     'matrixDeterminant': this.matrixDetermY.matrixDeterminant,
            // });
            let matrixDetemYVal: any = matrixDetermY;
            matrixDetemYVal.forEach(element => {
                element['matrixSeq'] = element ? element['matrixDetermYPrimaryKey'] ? element['matrixDetermYPrimaryKey']['matrixSeq'] : '' : '';
            });
            this.matrixDetermYs = matrixDetemYVal;
            // this.dataGrid002GridOptions.api.setRowData(matrixDetemYVal);
            this.populateMatrixDetermY(matrixDetemYVal);
        });
    } getMatrixDetermYs() {
        this.matrixDetermYService.getMatrixDetermYs().subscribe(matrixDetermYs => {
            this.matrixDetermYs = matrixDetermYs;
        });
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
        this.dataGrid001GridOptions.editType = 'cell';
        this.dataGrid001GridOptions.singleClickEdit = true;
        this.dataGrid001GridOptions.editType = 'cell';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "X Matrix",
                headerClass: 'required-field-label',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                valueGetter: (data) => {
                    let num = data.data.matrixSeq;
                    return (num < 10) ? '0' + num.toString() : num.toString()
                }
            },
            {
                headerName: "Description",
                field: "xaxisDescription",
                headerClass: 'required-field-label',
                width: 150,
                editable: true
            },
            {
                headerName: "Age From",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let num = data.data.ageFrom;
                    return num ? num.toFixed(1) : '.0'
                },
                editable: true
            },
            {
                headerName: "Age Thru",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let num = data.data.ageThru;
                    return num ? num.toFixed(1) : '.0'
                },
                editable: true
            },
            {
                headerName: "Gender",
                field: "gender",
                width: 120,
                editable: true,
                cellEditor: "select"
            },
            {
                headerName: "Salary From",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let salary = data.data.salaryFrom;
                    return salary ? '$ ' + salary.toFixed(2) : ''
                },
                editable: true
            },
            {
                headerName: "Salary Thru",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let salaryThru = data.data.salaryThru;
                    return salaryThru ? salaryThru.toLocaleString('en-US', {minimumFractionDigits: 2}) : ''
                },
                editable: true
            },
            {
                headerName: "Medicare Status",
                field: "medicareStatus",
                width: 175,
                editable: true
            },
            {
                headerName: "Rate Type",
                field: "rateType",
                width: 150,
                editable: true
            }
        ];
    }

    createDataGrid002(): void {
        this.dataGrid002GridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGrid002GridOptions.editType = 'cell';
        this.dataGrid002GridOptions.singleClickEdit = true;
        this.dataGrid002GridOptions.columnDefs = [
            {
                headerName: "Y Matrix",
                field: "",
                headerClass: 'required-field-label',
                width: 150,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                valueGetter: (data) => {
                    let num = data.data.matrixSeq;
                    return (num < 10) ? '0' + num.toString() : num.toString()
                }
            },
            {
                headerName: "Description",
                field: "",
                headerClass: 'required-field-label',
                width: 200,
                valueGetter: (data) => {
                    return data.data.yaxisDescription
                },
                editable: true
            },
            {
                headerName: "Family Size From",
                field: "familySizeFrom",
                width: 200,
                editable: true
            },
            {
                headerName: "Family Size Thru",
                field: "familySizeThru",
                width: 200,
                editable: true
            },
            {
                headerName: "Age From",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let ageFrom = data.data.ageFrom;
                    return ageFrom ? ageFrom.toFixed(1) : '.0'
                },
                editable: true
            },
            {
                headerName: "Age Thru",
                field: "",
                width: 150,
                valueGetter: (data) => {
                    let ageThru = data.data.ageThru;
                    return ageThru ? (ageThru + 0.9).toFixed(1) : '.0'
                },
                editable: true
            },
            {
                headerName: "Gender",
                field: "gender",
                width: 120,
                editable: true,
                cellEditor: "select"
            },
            {
                headerName: "Spouse Flag",
                field: "spouseFlag",
                width: 150,
                editable: true
            }
        ];
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
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
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

    /**
     * Get Permissions
     * @param secUserId
     */
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
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
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
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
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arMatrixDeterminantsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        this.menuInit();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arMatrixDeterminantsForm = this.formBuilder.group({
            matrixDeterminant: ['', { updateOn: 'blur', validators: [] }],
            matrixDescription: ['', { updateOn: 'blur', validators: [] }],
            dynamicText001: ['', { updateOn: 'blur', validators: [] }],
            dynamicText002: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
        this.isLoaded = true;
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Delete', shortcutKey: 'Ctrl+D', disabled: this.deleteDisabled},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C'},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8', disabled: true},
                    {name: 'Previous', shortcutKey: 'F7', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Claims Interest Calc. Rules'},
                    {name: '3 Field Level Security Setup'},
                    {name: '4 Bill Types-Institutional Claims'},
                    {name: '5 Process EDI'},
                    {name: '6 Window Description'},
                    {name: '7 A/R Matrix Determinants'},
                ]
            }, {
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
            }
        ];
    };

    resetForm() {
        this.arMatrixDeterminantsForm.reset();
        this.showMatrixFields = false;
        this.isChangeRecord = false;
        this.matrixDetermXesState = [];
        this.matrixDetermYsState = [];
        this.matrixDeterminantEle.nativeElement.focus();
        setTimeout(() => {
            this.arMatrixDeterminantsForm.get('matrixDeterminant').enable();
        }, 400);
        this.isMatrixDisabled = false;
    }

    handleNewMenu() {
        if (this.editedDynamicForm) {
            if (this.editedDynamicForm === 'x') {
                this.matrixDetermXDynamicFormComponent.fileNewAddNewRow();
            } else if (this.editedDynamicForm === 'y') {
                this.matrixDetermYDynamicFormComponent.fileNewAddNewRow();
            } else {
                this.resetForm();
            }
        } else {
            this.resetForm();
        }
    }

    handleSaveMenu() {
        if (this.editedDynamicForm) {
            /*if (this.editedDynamicForm === 'x') {*/
                this.matrixDetermXDynamicFormComponent.onSubmit();
            /*} else if (this.editedDynamicForm === 'y') {*/
                this.matrixDetermYDynamicFormComponent.onSubmit();
            /*}*/
        }
    }

    handleDeleteMenu() {
        /*if (this.editedDynamicForm) {
            if (this.editedDynamicForm === 'x') {
                this.matrixDetermXDynamicFormComponent.removeRecord(this.selectedDynamicFormRow);
                this.matrixDetermXDynamicFormComponent.onSubmit();
            } else if (this.editedDynamicForm === 'y') {
                this.matrixDetermYDynamicFormComponent.removeRecord(this.selectedDynamicFormRow);
                this.matrixDetermYDynamicFormComponent.onSubmit();
            }
        }*/
        this.messageService.findByMessageId(29070).subscribe((message: MessageMasterDtl[]) => {
            let popMsg = new PopUpMessage('A/R Matrix Delete', 'A/R Matrix Determinants', "29070: " + message[0].messageText, 'icon');
            popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary'),
                new PopUpMessageButton('cancel', 'Cancel', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance["buttonclickEvent"].subscribe((event0: any) => {
                if(event0.name === 'ok') {
                    this.messageService.findByMessageId(1032).subscribe((message: MessageMasterDtl[]) => {
                        let popMsg = new PopUpMessage('A/R Matrix Delete Error', 'A/R Matrix Determinants', "1032: " + message[0].messageText, 'icon');
                        popMsg.buttons = [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')];
                        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                        ref.componentInstance.popupMessage = popMsg;
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance["buttonclickEvent"].subscribe((event0: any) => {

                        });
                    });
                }
            });
        });
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            switch (event.action) {
                case 'New': {
                    this.handleNewMenu();
                    break;
                }
                case 'Open': {
                    this.openNew();
                    break;
                }
                case 'Save': {
                    this.handleSaveMenu();
                    break;
                }
                case 'Delete':
                    this.handleDeleteMenu();
                    break;
                default:
                    this.toastService.showToast('This screen is only view', NgbToastType.Danger);
                    break;
            }

        }
        else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case 'Show Timestamp':
                    if (this.arMatrixDeterminantsForm.get('matrixDeterminant').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                default : {
                    this.toastService.showToast('This screen is only view', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Help') {
            this.helpScreen()
        } else {
            this.toastService.showToast('This screen is only view', NgbToastType.Danger);
        }
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "A/R Matrix Determinant";

        ref.componentInstance.insertDateTime = this.matrixDetermHeader.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.matrixDetermHeader.insertProcess;
        ref.componentInstance.insertUser = this.matrixDetermHeader.insertUser;
        ref.componentInstance.updateUser = this.matrixDetermHeader.updateUser;
        ref.componentInstance.updateDateTime = this.matrixDetermHeader.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.matrixDetermHeader.updateProcess;
    };

    onGridItemChange($event: any) {
        this.deleteDisabled = false;
        this.menuInit();
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        this.isChangeRecord = false;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'A/R Matrix Determinants')
            })
        } else {
            this.activeModal.close();
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
                    this.handleSaveMenu()
                } else if (resp.name === 'No') {
                    if (!this.isChangeRecord) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {

        }
    };

    isFormDataModified() {
        this.arMatrixDeterminantsForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    matrixDetermXesState: Array<FormRow> = [];
    matrixDetermYsState: Array<FormRow> = [];
    isXResetForm = false;
    isYResetForm = false;

    populateMatrixDetermX(matrixDetemXVal: MatrixDetermX[]) {
        if (!matrixDetemXVal || matrixDetemXVal.length < 1) {
            return;
        }

        matrixDetemXVal.forEach((groupContact: MatrixDetermX) => {
            let mockConfig = JSON.parse(JSON.stringify(this.matrixDeterminantXFromConfig)); // make a copy of original config
            this.matrixDeterminantXFromConfig.forEach((field, index) => {
                if (field.name === MatrixDeterminantXFields.matrixSeq) {
                    mockConfig[index].value = (groupContact.matrixSeq < 10) ? '0' + groupContact.matrixSeq.toString() : groupContact.matrixSeq.toString();
                } else if (field.name === MatrixDeterminantXFields.xaxisDescription) {
                    mockConfig[index].value = groupContact.xaxisDescription;
                } else if (field.name === MatrixDeterminantXFields.ageFrom) {
                    let num = groupContact.ageFrom;
                    mockConfig[index].value = num ? num.toFixed(1) : '.0';
                } else if (field.name === MatrixDeterminantXFields.ageThru) {
                    let num = groupContact.ageThru;
                    mockConfig[index].value = num ? num.toFixed(1) : '.0';
                } else if (field.name === MatrixDeterminantXFields.gender) {
                    mockConfig[index].value = groupContact.gender;
                } else if (field.name === MatrixDeterminantXFields.salaryFrom) {
                    let salary = groupContact.salaryFrom;
                    mockConfig[index].value =  salary ? '$ ' + salary.toFixed(2) : '';
                } else if (field.name === MatrixDeterminantXFields.salaryThru) {
                    let salary = groupContact.salaryThru;
                    mockConfig[index].value =  salary ? '$ ' + salary.toFixed(2) : '';
                } else if (field.name === MatrixDeterminantXFields.medicareStatus) {
                    mockConfig[index].value = groupContact.medicareStatus;
                } else if (field.name === MatrixDeterminantXFields.rateType) {
                    mockConfig[index].value = groupContact.rateType;
                } else {
                    mockConfig[index].value = ''
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.matrixDetermXesState.push(formState); // add record
        });
        this.matrixDetermXesState = JSON.parse(JSON.stringify(this.matrixDetermXesState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }


    populateMatrixDetermY(matrixDetemYVal: MatrixDetermY[]) {
        if (!matrixDetemYVal || matrixDetemYVal.length < 1) {
            return;
        }

        matrixDetemYVal.forEach((groupContact: MatrixDetermY) => {
            let mockConfig = JSON.parse(JSON.stringify(this.matrixDeterminantYFromConfig)); // make a copy of original config
            this.matrixDeterminantYFromConfig.forEach((field, index) => {
                if (field.name === MatrixDeterminantYFields.matrixSeq) {
                    mockConfig[index].value = (groupContact.matrixSeq < 10) ? '0' + groupContact.matrixSeq.toString() : groupContact.matrixSeq.toString();
                } else if (field.name === MatrixDeterminantYFields.yaxisDescription) {
                    mockConfig[index].value = groupContact.yaxisDescription;
                } else if (field.name === MatrixDeterminantYFields.familySizeFrom) {
                    mockConfig[index].value = groupContact.familySizeFrom;
                } else if (field.name === MatrixDeterminantYFields.familySizeThru) {
                    mockConfig[index].value = groupContact.familySizeThru;
                } else if (field.name === MatrixDeterminantYFields.ageFrom) {
                    let num = groupContact.ageFrom;
                    mockConfig[index].value = num ? num.toFixed(1) : '.0';
                } else if (field.name === MatrixDeterminantYFields.ageThru) {
                    let num = groupContact.ageThru;
                    mockConfig[index].value = num ? num.toFixed(1) : '.0';
                } else if (field.name === MatrixDeterminantYFields.gender) {
                    mockConfig[index].value = groupContact.gender;
                } else if (field.name === MatrixDeterminantYFields.spouseFlag) {
                    mockConfig[index].value = (groupContact.spouseFlag && groupContact.spouseFlag === 'y') ? true : false;
                } else {
                    mockConfig[index].value = ''
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.matrixDetermYsState.push(formState); // add record
        });
        this.matrixDetermYsState = JSON.parse(JSON.stringify(this.matrixDetermYsState)); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }

    populateMatrixDeterminantXField(index, event: any, action: FORM_FIELD_ACTION_TYPES) {
        let matrixDetermx = null;

        if (index >= 0) {
            matrixDetermx = this.matrixDetermXes[index];
            matrixDetermx.updateDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermx.updateUser = sessionStorage.getItem("user");
            matrixDetermx.updateProcess = this.windowId;
        } else {
            matrixDetermx = new MatrixDetermX();
            matrixDetermx.updateDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermx.updateUser = sessionStorage.getItem("user");
            matrixDetermx.updateProcess = this.windowId;
            matrixDetermx.insertDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermx.insertUser = sessionStorage.getItem("user");
            matrixDetermx.insertProcess = this.windowId;
        }

        matrixDetermx.matrixDetermXPrimaryKeyModel = {
            matrixSeq: +event[this.getXIndex('matrixSeq')].value,
            matrixDeterminant: this.determinantId
        };
        matrixDetermx.ageFrom = event[this.getXIndex('ageFrom')].value;
        matrixDetermx.ageThru = event[this.getXIndex('ageThru')].value;
        matrixDetermx.xaxisDescription = event[this.getXIndex('xaxisDescription')].value;
        matrixDetermx.gender = event[this.getXIndex('gender')].value;
        matrixDetermx.salaryFrom = (event[this.getXIndex('salaryFrom')].value) ?
            event[this.getXIndex('salaryFrom')].value.replace('$', '').replace(' ', '') : null;
        matrixDetermx.salaryThru = (event[this.getXIndex('salaryThru')].value) ?
            event[this.getXIndex('salaryThru')].value.replace('$', '').replace(' ', '') : null;
        matrixDetermx.medicareStatus = event[this.getXIndex('medicareStatus')].value;
        matrixDetermx.rateType = event[this.getXIndex('rateType')].value;
        matrixDetermx.action = action;
        return matrixDetermx;
    }

    getXIndex(fieldId: string): number {
        return this.matrixDeterminantXFromConfig.findIndex((x) => x.name === fieldId);
    }

    getYIndex(fieldId: string): number {
        return this.matrixDeterminantYFromConfig.findIndex((x) => x.name === fieldId);
    }

    populateMatrixDeterminantYField(index, event: any, action: FORM_FIELD_ACTION_TYPES) {
        let matrixDetermy = null;

        if (index >= 0) {
            matrixDetermy = this.matrixDetermYs[index];
            matrixDetermy.updateDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermy.updateUser = sessionStorage.getItem("user");
            matrixDetermy.updateProcess = this.windowId;
        } else {
            matrixDetermy = new MatrixDetermX();
            matrixDetermy.updateDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermy.updateUser = sessionStorage.getItem("user");
            matrixDetermy.updateProcess = this.windowId;
            matrixDetermy.insertDatetimeDisplay = this.datePipe.transform(
                new Date(),
                "yyyy-MM-dd HH:mm:ss"
            );
            matrixDetermy.insertUser = sessionStorage.getItem("user");
            matrixDetermy.insertProcess = this.windowId;
        }

        matrixDetermy.matrixDetermYPrimaryKeyModel = {
            matrixSeq: +event[this.getYIndex('matrixSeq')].value,
            matrixDeterminant: this.determinantId
        };
        matrixDetermy.ageFrom = event[this.getYIndex('ageFrom')].value;
        matrixDetermy.ageThru = event[this.getYIndex('ageThru')].value;
        matrixDetermy.yaxisDescription = event[this.getYIndex('yaxisDescription')].value;
        matrixDetermy.gender = event[this.getYIndex('gender')].value;
        matrixDetermy.familySizeFrom = event[this.getYIndex('familySizeFrom')].value;
        matrixDetermy.familySizeThru = event[this.getYIndex('familySizeThru')].value;
        matrixDetermy.spouseFlag = (event[this.getYIndex('spouseFlag')].value && event[this.getYIndex('spouseFlag')].value === true)
            ? 'Y' : 'N';
        matrixDetermy.action = action;
        return matrixDetermy;
    }

    saveMatrixDeterminantX(event) {
        let groupContacts = [];
        const updatedRecords: FormRow[] = this.matrixDetermXesState.filter(
            (record) => record.action
        );
        if (updatedRecords.length > 0) {
            this.matrixDetermXesState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map((k) => ({
                        key: k,
                        value: updatedRecord[k],
                    }));
                    let groupContact = this.populateMatrixDeterminantXField(
                        index,
                        pair,
                        preStateRecord.action
                    );
                    groupContacts.push(groupContact);
                }
            });
        }

        const newRecords = event.slice(this.matrixDetermXesState.length);
        newRecords.forEach((record: any) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            let groupContact = this.populateMatrixDeterminantXField(
                -1,
                pair,
                FORM_FIELD_ACTION_TYPES.ADD
            );
            groupContacts.push(groupContact);
        });
        // ('============================= api records with action update/add ================================');
        // groupContacts     => variable contains all the updated records and new record to add updated by form-inline grid


        this.matrixDetermXService
            .addUpdateMatrixDetermX(groupContacts)
            .subscribe((resp) => {
                this.matrixDetermXesState = [];
                this.isChangeRecord = false;
                this.toastService.showToast(
                    "Record successfully updated.",
                    NgbToastType.Success
                );
                this.matrixDetermXesState = [];
                this.getMatrixDetermX(this.determinantId);
                this.isFormDataChangeStatus = false;
            });
    }

    setMatrixDeterminantXFormDataModified(event, showPopup) {
        this.editedDynamicForm = 'x';
        if (!showPopup) {
            this.isChangeRecord = true;
        }
        this.deleteDisabled = false;
        this.menuInit();
        if (this.isChangeRecord && showPopup) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'A/R Matrix Determinants')
            })
        }
    }

    onKeyUpMatrixDeterminantXChangeFields(event) {
        this.selectedDynamicFormRow = event.index;
        this.editedDynamicForm = 'x';
    }

    saveMatrixDeterminantY(event) {
        let groupContacts = [];
        const updatedRecords: FormRow[] = this.matrixDetermYsState.filter(
            (record) => record.action
        );
        if (updatedRecords.length > 0) {
            this.matrixDetermYsState.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map((k) => ({
                        index,
                        key: k,
                        value: updatedRecord[k],
                    }));
                    let groupContact = this.populateMatrixDeterminantYField(
                        index,
                        pair,
                        preStateRecord.action
                    );
                    groupContacts.push(groupContact);
                }
            });
        }

        const newRecords = event.slice(this.matrixDetermYsState.length);
        newRecords.forEach((record: any) => {
            const pair = Object.keys(record).map((k) => ({
                key: k,
                value: record[k],
            }));
            let groupContact = this.populateMatrixDeterminantYField(
                -1,
                pair,
                FORM_FIELD_ACTION_TYPES.ADD
            );
            groupContacts.push(groupContact);
        });
        // ('============================= api records with action update/add ================================');
        // groupContacts     => variable contains all the updated records and new record to add updated by form-inline grid


        this.matrixDetermYService
            .addUpdateMatrixDetermY(groupContacts)
            .subscribe((resp) => {
                this.matrixDetermYsState = [];
                this.toastService.showToast(
                    "Record successfully updated.",
                    NgbToastType.Success
                );
                this.matrixDetermYsState = [];
                this.getMatrixDetermY(this.determinantId);
                this.isFormDataChangeStatus = false;
            });
    }

    setMatrixDeterminantYFormDataModified(event, showPopup) {
        this.deleteDisabled = false;
        if (!showPopup) {
            this.isChangeRecord = true;
        }
        this.menuInit();
        this.editedDynamicForm = 'y';
        if (this.isChangeRecord && showPopup) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'A/R Matrix Determinants')
            })
        }
    }

    onKeyUpMatrixDeterminantYChangeFields(event: any) {
        this.selectedDynamicFormRow = event.index;
        this.editedDynamicForm = 'y';
    };

    helpScreen() {
        const modalRef = this.modalService.open(PremiumHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.currentWin = "MATRX_Matrix_Determinant.htm";
        modalRef.componentInstance.showIcon = true;
    };

    openNew() {
        this.openScreenStatus = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                let popUpMessage = new PopUpMessage('popUpMessageName', 'A/R Matrix Determinants', message[0].messageText, 'icon');
                popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                let ref = this.modalService.open(PopUpMessageComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.popupMessage = popUpMessage;
                ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                    if (resp.name === 'Yes') {
                        this.handleSaveMenu()
                    } else if (resp.name === 'No') {
                        this.resetForm()
                    }
                })
            })
        }
        else {
            this.resetForm()
        }
    }
}
