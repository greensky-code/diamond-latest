/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { DatePipe } from '@angular/common';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { FinalNonApSetupService } from '../../../api-services/final-non-ap-setup.service';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { FinalNonApSetup } from '../../../api-models/final-non-ap-setup.model';
import { Form } from '../../../shared/helpers/form.helper';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { DddwDtl, SecUser } from '../../../api-models';
import { DddwDtlService, MessageMasterDtlService, SecUserService } from '../../../api-services';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { Menu, SearchModel } from '../../../shared/models/models';
import { CompanyMasterLookup } from '../../../shared/lookup/company-master-lookup';
import { ChangeDetectorRef } from '@angular/core';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { getFinalApNoneSetupComponentShortcutKeys, getGlReferenceComponentShortcutKeys } from '../../../shared/services/shared.service';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import {ApHelpComponent} from "../ap-help/ap-help.component";

// Use the Component directive to define the FinalNonApSetupComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'finalnonapsetup',
    templateUrl: './final-non-ap-setup.component.html',

})
export class FinalNonApSetupComponent implements OnInit {

    finalNonApSetupForm: FormGroup;
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
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;

    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon: boolean = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    editFinalNonApSetup: boolean=true;
    finalNonApSetup: FinalNonApSetup;
    finalNonApSetups: FinalNonApSetup[];
    final2NonApSetups: FinalNonApSetup[] = [];
    requestTypesDdwDtls: DddwDtl[] = [];
    statusDdwDtls: DddwDtl[] = [];

    companyMasterSearchMdel = new SearchModel(
        'companymasters/lookup',
        CompanyMasterLookup.ALL,
        CompanyMasterLookup.DEFAULT,
        [],
        true
    );

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


    getRequestType() {
        this.dddwDtlService
            .findByColumnNameAndDwname("request_type", "dw_final_setup_pick")
            .subscribe(
                (dddwDtls) => {
                    this.requestTypesDdwDtls = dddwDtls;
                }
            );
    }


    getAllStatus() {
        this.dddwDtlService
            .findByColumnNameAndDwname("status", "dw_final_setup_pick")
            .subscribe(
                (dddwDtls) => {
                    this.statusDdwDtls = dddwDtls;
                }
            );
    }


    getRequestTypeByRequest(requestId: any): any {
        let requestType: string;
        this.requestTypesDdwDtls.forEach(requestTypeDdwDtl => {
            if (requestTypeDdwDtl.dddwDtlPrimaryKey.dataVal === requestId) {
                requestType = requestTypeDdwDtl.dddwDtlPrimaryKey.displayVal;
            }
        });
        return requestType;
    }

    getStatusByStatus(status: any) {
        let statusValue: string;
        this.statusDdwDtls.forEach(statusDdwDtl => {
            if (statusDdwDtl.dddwDtlPrimaryKey.dataVal === status) {
                statusValue = statusDdwDtl.dddwDtlPrimaryKey.displayVal;
            }
        });
        return statusValue;
    }



    createFinalNonApSetup() {
        this.formValidation.validateForm();
        if (this.finalNonApSetupForm.valid) {
            let finalNonApSetup = new FinalNonApSetup();
            finalNonApSetup.requestUser = Form.getValue(this.finalNonApSetupForm, 'reqUser');
            finalNonApSetup.requestDate = Form.getValue(this.finalNonApSetupForm, 'requestDate');
            finalNonApSetup.companyCode = Form.getValue(this.finalNonApSetupForm, 'companyCode');
            finalNonApSetup.fromReceivedDate = Form.getValue(this.finalNonApSetupForm, 'fromReceivedDate');
            finalNonApSetup.thruReceivedDate = Form.getValue(this.finalNonApSetupForm, 'thruReceivedDate');
            finalNonApSetup.status = Form.getValue(this.finalNonApSetupForm, 'claimStatus');
            finalNonApSetup.comments = Form.getValue(this.finalNonApSetupForm, 'comments');
            this.finalNonApSetupService.createFinalNonApSetup(finalNonApSetup).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editFinalNonApSetup = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
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
        private finalNonApSetupService: FinalNonApSetupService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private dddwDtlService: DddwDtlService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService,
        private router: Router,
        public activeModal: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.menuInit();
        //this.initializePermission();
        //this.getFinalNonApSetups();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.finalNonApSetupForm);
        this.createDataGrid();
        this.getRequestType();
        this.getAllStatus();
        setTimeout(() => {
            //this.dataGridGridOptions.api.setRowData([]);
            this.getFinalNonApSetups();
        });
    }


    updateFinalNonApSetup(jobId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.finalNonApSetupForm.valid) {
                let finalNonApSetup = new FinalNonApSetup();
                finalNonApSetup.requestUser = Form.getValue(this.finalNonApSetupForm, 'reqUser');
                finalNonApSetup.requestDate = Form.getValue(this.finalNonApSetupForm, 'requestDate');
                finalNonApSetup.companyCode = Form.getValue(this.finalNonApSetupForm, 'companyCode');
                finalNonApSetup.fromReceivedDate = Form.getValue(this.finalNonApSetupForm, 'fromReceivedDate');
                finalNonApSetup.thruReceivedDate = Form.getValue(this.finalNonApSetupForm, 'thruReceivedDate');
                finalNonApSetup.status = Form.getValue(this.finalNonApSetupForm, 'claimStatus');
                finalNonApSetup.comments = Form.getValue(this.finalNonApSetupForm, 'comments');
                this.finalNonApSetupService.updateFinalNonApSetup(finalNonApSetup, jobId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editFinalNonApSetup = true;
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


    saveFinalNonApSetup() {
        if (this.editFinalNonApSetup) {
            this.updateFinalNonApSetup(this.finalNonApSetup.jobId)
        } else {
            //this.createFinalNonApSetup();
        }
    }

    getFinalNonApSetup(jobId: string) {
        this.finalNonApSetupService.getFinalNonApSetup(jobId).subscribe(finalNonApSetup => {
            this.finalNonApSetup = finalNonApSetup;
            this.finalNonApSetupForm.patchValue({
                'reqUser': this.finalNonApSetup.requestUser,
                'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(this.finalNonApSetup.requestDate),
                'companyCode': this.finalNonApSetup.companyCode,
                'fromReceivedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.finalNonApSetup.fromReceivedDate),
                'thruReceivedDate': this.dateFormatPipe.defaultDisplayDateFormat(this.finalNonApSetup.thruReceivedDate),
                'claimStatus': this.finalNonApSetup.status,
                'comments': this.finalNonApSetup.comments,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getFinalNonApSetups() {
        this.finalNonApSetupService.getFinalNonApSetups().subscribe(finalNonApSetups => {
            this.finalNonApSetups = finalNonApSetups;
            this.finalNonApSetups.forEach(finalNonApSetup => {
                let requestType = this.getRequestTypeByRequest(finalNonApSetup.requestType);
                finalNonApSetup.requestType = requestType;
                finalNonApSetup.status = this.getStatusByStatus(finalNonApSetup.status);
                this.final2NonApSetups.push(finalNonApSetup);
            });
            this.dataGridGridOptions.api.setRowData(this.final2NonApSetups);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
            this.editFinalNonApSetup=true;
        }, error => {
            this.editFinalNonApSetup=false;
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }


    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {
        };
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
                field: "finalNonApSetupPrimaryKey.jobId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "From Entered Date",
                field: "fromEnteredDate",
                width: 200
            },
            {
                headerName: "Thru Entered Date",
                field: "thruEnteredDate",
                width: 200
            },
            {
                headerName: "Request Type",
                field: "requestType",
                width: 200
            },
            {
                headerName: "Status",
                field: "status",
                width: 200
            }
        ];
    }


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

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('PCPAA_RULES_DTL', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    /**
 * Get Permissions
 * @param secUserId
 */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;
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
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.finalNonApSetupForm);
        this.createDataGrid();
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.finalNonApSetupForm = this.formBuilder.group({
            jobId: ['', { updateOn: 'blur', validators: [] }],
            reqUser: ['', { updateOn: 'blur', validators: [] }],
            requestDate: ['', { updateOn: 'blur', validators: [] }],
            companyCode: ['', { updateOn: 'blur', validators: [] }],
            fromEnteredDate: ['', { updateOn: 'blur', validators: [] }],
            thruEnteredDate: ['', { updateOn: 'blur', validators: [] }],
            fromReceivedDate: ['', { updateOn: 'blur', validators: [] }],
            thruReceivedDate: ['', { updateOn: 'blur', validators: [] }],
            claimStatus: ['', { updateOn: 'blur', validators: [] }],
            claimType: ['', { updateOn: 'blur', validators: [] }],
            provider: ['', { updateOn: 'blur', validators: [] }],
            group: ['', { updateOn: 'blur', validators: [] }],
            action: ['', { updateOn: 'blur', validators: [] }],
            status: ['', { updateOn: 'blur', validators: [] }],
            radiobuttongroup4402: ['', { updateOn: 'blur', validators: [] }],
            comments: ['', { updateOn: 'blur', validators: [] }],
            requestType: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }



    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New"},
                    {name: "Open"},
                    {name: "Run Job"},
                    {name: "Close"},
                    {isHorizontal: true},
                    {name: "Main Menu..."},
                    {name: "Shortcut Menu..."},
                    {name: "Print", disabled: true},
                    {isHorizontal: true},
                    {name: "Exit"},
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    {name: "Undo", disabled: true},
                    {isHorizontal: true},
                    {name: "Cut", disabled: true},
                    {name: "Copy", disabled: true},
                    {name: "Paste", disabled: true},
                    {isHorizontal: true},
                    {name: "Next", disabled: true},
                    {name: "Previous", disabled: true},
                    {isHorizontal: true},
                    {name: "Lookup"},
                ],
            },
            {
                menuItem: "Special",
                dropdownItems: [
                    {name: "Include Claims By Claim Status"},
                    {name: "Include Claims By File Type"},
                    {name: "Include Claims By Provider"},
                    {name: "Include Claims By Group"}
                ],
            },
            {
                menuItem: "Notes",
                dropdownItems: [{name: "Notes", shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    {name: "Tile"},
                    {name: "Layer"},
                    {name: "Cascade"},
                    {name: "Arrange Icons"},
                    {isHorizontal: true},
                    {name: "Show Timestamp"},
                    {name: "Processing Messages"},
                    {isHorizontal: true},
                    {name: "1 Main Menu"},
                    {name: "2 Final Non-Ap Setup"},
                    {name: "3 Final Non-Ap Setup"}
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

    modalClose = () => {
        this.activeModal.close();
      };

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            // handle File actions
            switch (event.action) {
                case "New": {
                    this.createForm();
                    break;
                }
                case "Open": {
                    // statements;
                    break;
                }
                case "Save": {
                    break;
                }
                case "Close": {
                    this.resetForm();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
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
        } else if (event.menu.menuItem === "Topic") {
            // handle Topic-Menu Actions



        } else if (event.menu.menuItem === "Special") {
            // handle special-Menu Actions
            switch (event.action) {
                case "View Credit Balance": {

                    break;
                }

                case "Provider Relationships...": {


                    break;
                }
                case "Adv Pay Rules": {

                    break;
                }
            }
        } else if (event.menu.menuItem === "Windows") {
            switch (event.action) {
                case "1 Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "Audit Display": {

                    break;
                }
            }
        } else if (event.menu.menuItem === "Help") {
            this.helpScreen();
        }
    }


    gridSelectionChange() {
        let finalNonApSetup: FinalNonApSetup;
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            finalNonApSetup = selectedRows[0];
            this.setFormValues(finalNonApSetup);
            this.editFinalNonApSetup=true;
        } else {
            this.resetForm();
            this.editFinalNonApSetup=false;
        }
    }


    setFormValues(finalNonApSetup: FinalNonApSetup) {
        this.finalNonApSetupForm.patchValue({
            'jobId': finalNonApSetup.finalNonApSetupPrimaryKey.jobId,
            'reqUser': finalNonApSetup.requestUser,
            'requestDate': finalNonApSetup.requestDate,
            'companyCode': finalNonApSetup.companyCode,
            'fromEnteredDate': this.dateFormatPipe.defaultDisplayDateFormat(finalNonApSetup.fromEnteredDate),
            'thruEnteredDate': this.dateFormatPipe.defaultDisplayDateFormat(finalNonApSetup.thruEnteredDate),
            'fromReceivedDate': this.dateFormatPipe.defaultDisplayDateFormat(finalNonApSetup.fromReceivedDate),
            'thruReceivedDate': this.dateFormatPipe.defaultDisplayDateFormat(finalNonApSetup.thruReceivedDate),
            'status': finalNonApSetup.status,
            'action':'Post',
            'requestType': finalNonApSetup.requestType,
            'comments': finalNonApSetup.comments,
            'claimStatus':"All",
            'claimType':"All",
            'provider':"All",
            'group':"All"
        });
    }

    resetForm() {
        this.finalNonApSetupForm.patchValue({
            'jobId': '',
            'reqUser': '',
            'requestDate': '',
            'companyCode': '',
            'fromEnteredDate': '',
            'thruEnteredDate': '',
            'fromReceivedDate': '',
            'thruReceivedDate': '',
            'action':'Post',
            'status': 'New',
            'requestType': '',
            'comments': '',
        });
    }

    onLookupFieldChange(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupCompanyMasterFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();

        }
    }

    openLookupCompanyMasterFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.companyMasterSearchMdel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.finalNonApSetupForm.patchValue({
                    companyCode: res.companyCode
                });
            }
        });
    }


    createNewForm() {
        this.editFinalNonApSetup = false;
        this.resetForm();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getFinalApNoneSetupComponentShortcutKeys(this));
        this.cdr.detectChanges();
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(ApHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/FINAL_Finalize_Non_AP_Transactions.htm';
        viewModal.componentInstance.showIcon = true;
    }

}
