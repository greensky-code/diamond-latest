/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from "ag-grid-community";
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
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUserService, ReasonCodeMasterService, SequenceService} from '../../../api-services';
import {HoldReasonsService} from '../../../api-services';
import {SecWin, ReasonCodeMaster} from '../../../api-models';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {Menu} from '../../../shared/models/models';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';

// Use the Component directive to define the InstitutionalClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'claimsholdreasons',
    templateUrl: './claims-hold-reasons.component.html',
    providers: [HoldReasonsService]

})
export class ClaimHoldReasonsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    institutionalClaimsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;
    generatedSequence: number;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    userTemplateId: string;

    claimHoldReasons: any;
    reasonCodeMasters: ReasonCodeMaster[];

    @Input() claimNumber: any;
    @Input() showIcon = true;
    @Input() winID = 'INCLM';

    @Output() holdReasonMenuClick = new EventEmitter<any>();

    public menu: Menu[] = [];

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


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl + N'},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Delete', shortcutKey: 'Ctrl + D'},
                    {name: 'Save', shortcutKey: 'Ctrl + S'},
                    {name: 'Close', shortcutKey: 'Ctrl + F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt + F4'}
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl + Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl + X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl + C'},
                    {name: 'Paste', disabled: true, shortcutKey: 'Ctrl + V'},
                    {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Header File'},
                    {name: 'Detail File'},
                    {name: 'Patient Liabilities', disabled: true},
                    {name: 'UB92'},
                    {name: 'UB92 Other Carriers'},
                    {name: 'Hold Reasons'},
                    {name: 'APC Details'},
                    {name: 'Home Healthcare Service'}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Claim Lookup'},
                    {name: 'Submitted Authorization'},
                    {name: 'Pay Subscriber'},
                    {name: 'Pay Dependent'},
                    {name: 'Change Default Batch'},
                    {name: 'DRG', shortcutKey: 'Ctrl + Q'},
                    {name: 'View DRG Pricer Fields...'},
                    {name: 'Edit Vendor Info'},
                    {
                        name: 'Authorization Waive/Match',
                        dropdownItems: [
                            {name: 'Manual Waive'},
                            {name: 'Undo Waive'},
                            {name: 'Re-Apply Waive'},
                            {name: 'Re-Apply Match'},
                            {name: 'Re-Apply Match/Waive'}
                        ]
                    },
                    {name: 'COB Information'},
                    {name: 'View IPA Info'},
                    {name: 'Re-apply Claim Holds'},
                    {name: 'Attach EOB/RA Remarks'},
                    {name: 'Change Header', disabled: true},
                    {name: 'View COB History'},
                    {name: 'View Claims with Auth Number'},
                    {
                        name: 'Submitted Claim Information',
                        dropdownItems: [
                            {name: 'Claim Header/UB92 Information'},
                            {name: 'Provider/Vendor Information'}
                        ]
                    },
                    {name: 'Remove System Generated Lines'},
                    {name: 'Reevaluate APC Status'},
                    {name: 'View Claim Totals'}
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4'}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift + Alt + P'},
                    {name: 'Hold Reason Display', shortcutKey: 'Shift + Alt + H'},
                    {name: 'Audit Display', shortcutKey: 'Shift + Alt + A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Institutional Claims'},
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


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Line",
                field: "lineNumber",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Sub History",
                field: "history",
                width: 200
            },
            {
                headerName: "RSN Code",
                field: "reasonCode",
                width: 200
            },
            {
                headerName: "Description",
                field: "",
                width: 200,
                valueGetter : (data) => {
                    for (let item of this.reasonCodeMasters) {
                        if (item.reasonCode === data.data.reasonCode) {
                            return item.description
                        }
                    }
                }
            },
            {
                headerName: "Date/Time",
                field: "insertDatetime",
                width: 200
            },
            {
                headerName: "User ID",
                field: "insertUser",
                width: 200
            },
            {
                headerName: 'Source ID',
                field: "sourceId",
                width: 200
            },
            {
                headerName: "Hold Rsn Seq",
                field: "holdReasonSequence",
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
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private holdReasonsService: HoldReasonsService,
        private toastService: ToastService,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private sequenceService: SequenceService,
        private activeModal: NgbActiveModal,
    ) {
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

    private initializePermission(): void {
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
        this.getReasonCodeMastersTermReason();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.institutionalClaimsForm);
        this.createDataGrid();
        this.institutionalClaimsForm.patchValue({'claimNumber': this.claimNumber});

    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.institutionalClaimsForm = this.formBuilder.group({
            claimNumber: ['', {updateOn: 'blur', validators: []}],
            totalHoldsForClaimLine: ['', {updateOn: 'blur', validators: []}],
            lineNumber: ['', {updateOn: 'blur', validators: []}],
            subLine: ['', {updateOn: 'blur', validators: []}],
            history: ['', {updateOn: 'blur', validators: []}],
            uncleanIndicator: ['', {updateOn: 'blur', validators: []}],
            holdReasonCodeTb: ['', {updateOn: 'blur', validators: []}],
            description: ['']
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
                        'You are not Permitted to view COB Order Liability',
                        'COB Order Liability Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
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
        this.secColDetailService.findByTableNameAndUserId('DETERMINANT_RULES', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    getClaimHoldReasons() {
        this.holdReasonsService.getHoldReasonsByClaimId(this.claimNumber).subscribe(res => {
            this.claimHoldReasons = res;
            this.dataGridGridOptions.api.setRowData(this.claimHoldReasons);
            this.dataGridGridOptions.api.selectIndex(0, false, false);

        })
    }

    getReasonCodeMastersTermReason() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('HD').subscribe(reasonCodes => {
            this.reasonCodeMasters = reasonCodes.sort((a, b) => (a.reasonCode > b.reasonCode) ? 1 : -1);
            this.getClaimHoldReasons();
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.generateSeq();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    this.saveclaimHoldReason();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.holdReasonMenuClick.emit(event);
            this.closeModal();
        }
    }

    onRowSelectedGrid(event: any) {
        if (this.dataGridGridOptions.api.getSelectedRows().length > 0) {
            let selectedRows = this.dataGridGridOptions.api.getSelectedRows()[0];
            let description = '';
            for (let item of this.reasonCodeMasters) {
                if (item.reasonCode === selectedRows.reasonCode) {
                    description = item.description
                }
            }
            this.institutionalClaimsForm.patchValue({
                'lineNumber': selectedRows.lineNumber,
                'subLine': selectedRows.subLine,
                'history': selectedRows.history === 'H',
                'uncleanIndicator': selectedRows.uncleanIndicator,
                'holdReasonCodeTb': selectedRows.reasonCode,
                'description': description
            });
            this.institutionalClaimsForm.get('lineNumber').disable();
            this.institutionalClaimsForm.get('subLine').disable();
        }

    }

    isNewRecord: boolean = false;

    addNewReason() {
        if (this.institutionalClaimsForm.value.claimNumber) {
            let defaultDatas: any[] = [];
            let defaultData: any = {};
            defaultData.sourceId = 'MANUAL';
            defaultData.holdReasonSequence = this.generatedSequence;
            defaultData.lineNumber = this.dataGridGridOptions.api.getDisplayedRowCount() + 1;
            defaultDatas.push(defaultData);
            this.isNewRecord = true;
            this.dataGridGridOptions.api.applyTransaction({'add': defaultDatas});
            this.dataGridGridOptions.api.selectIndex(this.dataGridGridOptions.api.getDisplayedRowCount() - 1, false, false);
        }
    }

    private resetForm(defaultData: any = {}) {
        this.addNewReason();
        this.institutionalClaimsForm.reset(defaultData);

    }


    saveclaimHoldReason() {
        let formData: any = {};
        formData.lineNumber = this.dataGridGridOptions.api.getDisplayedRowCount();  //this.institutionalClaimsForm.value.lineNumber;
        formData.subLine = this.institutionalClaimsForm.value.subLine;
        formData.history = this.institutionalClaimsForm.value.history === true ? 'H' : '';
        formData.uncleanIndicator = this.institutionalClaimsForm.value.uncleanIndicator;
        formData.reasonCode = this.institutionalClaimsForm.value.holdReasonCodeTb;
        formData.sourceId = 'MANUAL';
        formData.seqClaimId = this.claimNumber;
        formData.holdReasonSequence = this.generatedSequence;

        this.holdReasonsService.createHoldReason(formData).subscribe(data => {
            this.toastService.showToast('Record successfully saved', NgbToastType.Success);
        });

    }


    setFieldValue(fieldName: string, fieldValue: string | number, description: any) {
        this.institutionalClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
        this.institutionalClaimsForm.patchValue({
            description: description
        })
    }

    generateSeq() {
        this.holdReasonsService.getNextSequence().subscribe(nextSequence => {
            this.generatedSequence = nextSequence;
            this.resetForm(this.claimNumber);
        });
    }


    closeModal() {
        this.activeModal.close()
    }
}
