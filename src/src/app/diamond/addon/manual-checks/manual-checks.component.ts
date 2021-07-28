/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {CompanyMasterService, DddwDtlService, SecUserService, VendorAddressService} from "../../../api-services";
import {UntilDestroy} from "@ngneat/until-destroy";
import {CheckPrintSetupService} from "../../../api-services/addon/check-print-setup.service";
import {CompanyMaster, SecUser, SecWin, VendorAddress} from "../../../api-models";
import {CheckPrintSetup} from "../../../api-models/addon/check-print-setup.model";
import {ManualCheckSummaryWorkService} from "../../../api-services/addon/manual-check-summary-work.service";
import {
    CONSTANTS,
    getFinalApNoneSetupComponentShortcutKeys,
    getManualChecksShortcutKeys
} from "../../../shared/services/shared.service";
import {Menu} from "../../../shared/models/models";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";
import {ApHelpComponent} from "../../ap/ap-help/ap-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";

// Use the Component directive to define the ManualChecksComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({checkProperties: true})
@Component({

    selector: 'manualchecks',
    templateUrl: './manual-checks.component.html',

})
export class ManualChecksComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    manualChecksForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'MCHEK';
    public isSuperUser = false;
    public secProgress = true;

    userTemplateId: string;
    memberModuleId = MEM_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    companyMasters: CompanyMaster[] = [];
    public shortcuts: ShortcutInput[] = [];
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
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private checkPrintSetupService: CheckPrintSetupService,
        private manualCheckSummaryWorkService: ManualCheckSummaryWorkService,
        private vendorAddressService: VendorAddressService,
        private companyMasterService: CompanyMasterService,
        private dddwDtlService: DddwDtlService,
        private activeModal: NgbActiveModal,
        private toastService: ToastService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();

    }

    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.manualChecksForm);

        this.createDataGrid();
        this.secProgress = false;

        this.getCheckPrintSetups();

        this.getClaimTypeDropdownValues();
        this.getStatusDropdownValues();
        this.getPayableTypeDropdownValues();


    }


    claimTypeDropdownvalues = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = “dw_mchek_med_setup_de”  ) and          ( HSD_DDDW_HDR.COLUMN_NAME = ‘compute_claim_type’ )
     */
    getClaimTypeDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('compute_claim_type', 'dw_mchek_med_setup_de').subscribe((values) => {
            this.claimTypeDropdownvalues = values;

        });
    }

    statusDropdownValues = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = “dw_mchek_med_setup_de”  ) and          ( HSD_DDDW_HDR.COLUMN_NAME = ‘apstatus’ ) and
     */
    getStatusDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('apstatus', 'dw_mchek_med_setup_de').subscribe((values) => {
            this.statusDropdownValues = values;

        });
    }

    payableTypeDropdownValues = [];

    /**
     ( (  HSD_DDDW_HDR.DW_NAME = 'dw_mchek_med_setup_de'  ) and
     ( HSD_DDDW_HDR.COLUMN_NAME = 'payable_type' ) and
     */
    getPayableTypeDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname('payable_type', 'dw_mchek_med_setup_de').subscribe((values) => {
            this.payableTypeDropdownValues = values;

        });
    }


    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {

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
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
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
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
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

    editCheckPrintSetup: boolean;
    checkPrintSetup: CheckPrintSetup;
    checkPrintSetups: CheckPrintSetup[];

    createCheckPrintSetup() {
        this.formValidation.validateForm();
        if (this.manualChecksForm.valid) {
            let checkPrintSetup = this.getFormData(new CheckPrintSetup());

            this.checkPrintSetupService.createCheckPrintSetup(checkPrintSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editCheckPrintSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateCheckPrintSetup(seqCkprtId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.manualChecksForm.valid) {
                let checkPrintSetup = this.getFormData(new CheckPrintSetup());

                this.checkPrintSetupService.updateCheckPrintSetup(checkPrintSetup, seqCkprtId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editCheckPrintSetup = false;
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

    getFormData(checkPrintSetup: CheckPrintSetup) {
        checkPrintSetup.payableType = Form.getValue(this.manualChecksForm, 'payableType');
        checkPrintSetup.companyCode = Form.getValue(this.manualChecksForm, 'companyCode');
        checkPrintSetup.bankAccountCode = Form.getValue(this.manualChecksForm, 'bankAcct');
        checkPrintSetup.requestUser = Form.getValue(this.manualChecksForm, 'reqUser');
        checkPrintSetup.checkNumber = Form.getValue(this.manualChecksForm, 'startCheckNo');
        checkPrintSetup.seqVendId = Form.getValue(this.manualChecksForm, 'vendorId');
        checkPrintSetup.seqVendAddress = Form.getValue(this.manualChecksForm, 'vendorAddress');
        checkPrintSetup.seqClaimId = Form.getValue(this.manualChecksForm, 'claimType');
        checkPrintSetup.seqProvId = Form.getValue(this.manualChecksForm, 'providerId');
        checkPrintSetup.seqMembId = Form.getValue(this.manualChecksForm, 'memberId');
        checkPrintSetup.fromPostDate = Form.getValue(this.manualChecksForm, 'fromPostDate');
        checkPrintSetup.thruPostDate = Form.getValue(this.manualChecksForm, 'thruPostDate');
        checkPrintSetup.fromDueDate = Form.getValue(this.manualChecksForm, 'fromDueDate');
        checkPrintSetup.thruDueDate = Form.getValue(this.manualChecksForm, 'thruDueDate');


        checkPrintSetup.action = Form.getValue(this.manualChecksForm, 'action');
        checkPrintSetup.seqCapPoolId = Form.getValue(this.manualChecksForm, 'pool');
        checkPrintSetup.capEntityCode = Form.getValue(this.manualChecksForm, 'entity');
        checkPrintSetup.capModelId = Form.getValue(this.manualChecksForm, 'model');
        checkPrintSetup.postMonth = Form.getValue(this.manualChecksForm, 'capMonth');

        return checkPrintSetup;
    }

    saveCheckPrintSetup() {
        if (this.editCheckPrintSetup) {
            this.updateCheckPrintSetup(this.checkPrintSetup.seqCkprtId)
        } else {
            this.createCheckPrintSetup();
        }
    }

    deleteCheckPrintSetup(seqCkprtId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.checkPrintSetupService.deleteCheckPrintSetup(seqCkprtId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getCheckPrintSetup(seqCkprtId: number) {
        this.checkPrintSetupService.getCheckPrintSetup(seqCkprtId).subscribe(checkPrintSetup => {
            this.checkPrintSetup = checkPrintSetup;
            this.setFormData();
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    onFormSelectionChange($event) {
        this.manualChecksForm.disable();

        const selectedRows = this.dataGridGridOptions.api.getSelectedRows();

        if (selectedRows.length === 1) {
            this.editCheckPrintSetup = true;
            this.checkPrintSetup = selectedRows[0];
            this.dataGridGridOptions.api.selectIndex($event.rowIndex, null, null);


            this.setFormData();

        }
    }

    setFormData() {

        this.manualChecksForm.patchValue({
            'jobId': this.checkPrintSetup.jobId,
            'pass': '', // this.checkPrintSetup. TODO need to set value
            'payableType': this.checkPrintSetup.payableType && this.payableTypeDropdownValues ?
                this.payableTypeDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.checkPrintSetup.payableType).dddwDtlPrimaryKey.displayVal :
                this.checkPrintSetup.payableType,

            'companyCode': this.checkPrintSetup.companyCode,
            'bankAcct': this.checkPrintSetup.bankAccountCode,
            'reqUser': this.checkPrintSetup.requestUser,

            'runDate': this.checkPrintSetup.requestDate,

            'startCheckNo': this.checkPrintSetup.checkNumber,
            'vendorId': this.checkPrintSetup.seqVendId,
            'vendorAddress': this.checkPrintSetup.seqVendAddress,
            'claimType': this.checkPrintSetup.seqClaimId && this.claimTypeDropdownvalues ?
                this.claimTypeDropdownvalues.find(value => value.dddwDtlPrimaryKey.dataVal == this.checkPrintSetup.seqClaimId).dddwDtlPrimaryKey.displayVal :
                this.checkPrintSetup.seqClaimId,


            'claimNo': this.checkPrintSetup.seqClaimId,
            'providerId': this.checkPrintSetup.seqProvId,
            'memberId': this.checkPrintSetup.seqMembId,
            'fromPostDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.fromPostDate),
            'thruPostDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.thruPostDate),
            'fromDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.fromDueDate),
            'thruDueDate': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.thruDueDate),
            'post': this.dateFormatPipe.defaultDisplayDateFormat(this.checkPrintSetup.postMonth),
// ---------------------------- A/P selection Criteria section
            'status': this.checkPrintSetup.status && this.statusDropdownValues ?
                (this.statusDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.checkPrintSetup.status) ?
                    this.statusDropdownValues.find(value => value.dddwDtlPrimaryKey.dataVal == this.checkPrintSetup.status).dddwDtlPrimaryKey.displayVal : this.checkPrintSetup.status) :
                this.checkPrintSetup.status,

            // action, --------------  run options
            'requestType': this.checkPrintSetup.requestType,

            // --------- capitation grid values
            'action': this.checkPrintSetup.action,
            'pool': this.checkPrintSetup.seqCapPoolId,
            'entity': this.checkPrintSetup.capEntityCode,
            'model': this.checkPrintSetup.capModelId,
            'capMonth': this.checkPrintSetup.postMonth,

        });

        if (this.checkPrintSetup.seqVendAddress) {
            this.setSeqVendAddress(this.checkPrintSetup.seqVendAddress);
        }
    }

    setSeqVendAddress(seqVendAddress) {
        this.vendorAddressService.getVendorAddress(seqVendAddress).subscribe((address: VendorAddress) => {
            this.manualChecksForm.setValue({vendorAddress: address.addressLine1})
        });
    }

    getCheckPrintSetups() {
        this.checkPrintSetupService.getCheckPrintSetups().subscribe(checkPrintSetups => {
            this.checkPrintSetups = checkPrintSetups;
            if (this.checkPrintSetups.length > 0) {
                this.dataGridGridOptions.api.setRowData(this.checkPrintSetups);
                this.checkPrintSetup = checkPrintSetups[0];
                this.dataGridGridOptions.api.selectIndex(0, 0, 0);
                this.setFormData();
                this.manualChecksForm.disable();
            }

        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Job Id",
                field: 'jobId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Pass",
                field: 'numAlignChecksPrinted', //todo need to confirm
                width: 200
            },
            {
                headerName: "Company",
                field: 'companyCode',
                width: 200
            },
            {
                headerName: "Request User",
                field: 'requestUser',
                width: 200
            },
            {
                headerName: "Run Date",
                field: "requestDate",
                width: 200
            },
            {
                headerName: "Status",
                field: "status",
                width: 200
            }
        ];
    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.manualChecksForm = this.formBuilder.group({
            payableType: ['', {updateOn: 'blur', validators: []}],
            jobId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            pass: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: [Validators.required]}],
            bankAcct: ['', {updateOn: 'blur', validators: []}],
            reqUser: ['', {updateOn: 'blur', validators: []}],
            runDate: ['', {updateOn: 'blur', validators: []}],
            startCheckNo: ['', {updateOn: 'blur', validators: []}],
            vendorId: ['', {updateOn: 'blur', validators: []}],
            vendorAddress: ['', {updateOn: 'blur', validators: []}],
            claimType: ['', {updateOn: 'blur', validators: []}],
            claimNo: ['', {updateOn: 'blur', validators: []}],
            providerId: ['', {updateOn: 'blur', validators: []}],
            memberId: ['', {updateOn: 'blur', validators: []}],
            fromPostDate: ['', {updateOn: 'blur', validators: []}],
            thruPostDate: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}],
            fromDueDate: ['', {updateOn: 'blur', validators: []}],
            thruDueDate: ['', {updateOn: 'blur', validators: []}],
            action: ['', {updateOn: 'blur', validators: []}],
            cancel: ['', {updateOn: 'blur', validators: []}],
            post: ['', {updateOn: 'blur', validators: []}],
            pool: ['', {updateOn: 'blur', validators: []}],
            entity: ['', {updateOn: 'blur', validators: []}],
            model: ['', {updateOn: 'blur', validators: []}],
            capMonth: ['', {updateOn: 'blur', validators: []}],
            requestType: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    resetForm() {
        this.manualChecksForm.reset();
        this.manualChecksForm.enable();
        this.checkPrintSetup = new CheckPrintSetup();
    }

    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New'},
                    {name: 'Open'},
                    {name: 'Run Job'},
                    {name: 'Close'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {name: 'Exit'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste', disabled: true},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Print Job Log', shortcutKey: 'Ctrl + P'},

                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'},
                    {name: 'Layer'},
                    {name: 'Cascade'},
                    {name: 'Arrange Icons'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp'},
                    {name: 'Audit Display'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Member Master'},
                ],
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
                    {name: 'About Diamond Client/Server'},
                ],
            },
        ];
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetForm();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }

                case 'Close': {

                    this.activeModal.dismiss();
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
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }


            }
        } else if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getManualChecksShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/MCHEK_Manual_Checks.htm';
        viewModal.componentInstance.showIcon = true;
    }
}
