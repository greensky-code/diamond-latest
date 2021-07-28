/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser, SecWin} from '../../../api-models';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecUserService} from '../../../api-services';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel, gridNoRecordsFoundMessage, gridPaginationPageSize} from '../../../shared/config';
import {GeneralLedgerAssign} from '../../../api-models/support/general-ledger-assign.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {GeneralLedgerAssignService} from '../../../api-services/support/general-ledger-assign.service';
import {Form} from '../../../shared/helpers/form.helper';
import {GL_ASSIGNMENT} from '../../../shared/app-constants';
import {Menu} from '../../../shared/models/models';
import {DatePipe} from '@angular/common';
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {PmbSetup} from '../../../api-models/pmb-setup.model';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {getConversionFactorTypeComponent, getGlAssignmentShortcutKeys} from "../../../shared/services/shared.service";

// Use the Component directive to define the GlAssignmentComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'glassignment',
    templateUrl: './gl-assignment.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        UserDefinedValidateCodeService,
        FunctionalLevelSecurityService,
        GeneralLedgerAssignService
    ]
})
export class GlAssignmentComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    glAssignmentForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'GLASS';
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    editGeneralLedgerAssign: boolean;
    generalLedgerAssign: GeneralLedgerAssign;
    generalLedgerAssigns: GeneralLedgerAssign[];
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    memberModuleId = GL_ASSIGNMENT;
    public menu: Menu[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    // ========================= pagination init ===========================
    currentPage = 0;
    pageSize = gridPaginationPageSize;
    gridData: GeneralLedgerAssign[] = [];
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
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private generalLedgerAssignService: GeneralLedgerAssignService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.glAssignmentForm);
        this.hasPermission();
    }

    private initializeComponentState(): void {
        this.createDataGrid();
        this.getTotalRowsCount();
        this.getGeneralLedgerAssigns();
        this.menuInit()
    }

    totalRowsCount = 0;

    getTotalRowsCount() {
        this.generalLedgerAssignService.getGeneralLedgerAssignsCount().subscribe(count => {
            this.totalRowsCount = count;
        });
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
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    // if (this.secWin.hasInsertPermission()) {
    createGeneralLedgerAssign() {
        this.formValidation.validateForm();
        if (this.glAssignmentForm.valid) {
            let generalLedgerAssign = new GeneralLedgerAssign();
            generalLedgerAssign.securityCode = Form.getValue(this.glAssignmentForm, 'companyCode');
            generalLedgerAssign.description = Form.getValue(this.glAssignmentForm, 'description');
            this.generalLedgerAssignService.createGeneralLedgerAssign(generalLedgerAssign).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editGeneralLedgerAssign = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateGeneralLedgerAssign(seqGlAssign: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.glAssignmentForm.valid) {
                let generalLedgerAssign = new GeneralLedgerAssign();
                generalLedgerAssign.securityCode = Form.getValue(this.glAssignmentForm, 'companyCode');
                generalLedgerAssign.description = Form.getValue(this.glAssignmentForm, 'description');
                this.generalLedgerAssignService.updateGeneralLedgerAssign(generalLedgerAssign, seqGlAssign).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editGeneralLedgerAssign = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveGeneralLedgerAssign() {
        if (this.editGeneralLedgerAssign) {
            this.updateGeneralLedgerAssign(this.generalLedgerAssign.seqGlAssign)
        } else {
            this.createGeneralLedgerAssign();
        }
    }

    deleteGeneralLedgerAssign(seqGlAssign: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.generalLedgerAssignService.deleteGeneralLedgerAssign(seqGlAssign).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getGeneralLedgerAssign(data: GeneralLedgerAssign) {
        this.generalLedgerAssign = data;
        this.glAssignmentForm.patchValue({
            'companyCode': this.generalLedgerAssign.companyCode,
            'description': this.generalLedgerAssign.description,
            'planCode': this.generalLedgerAssign.glassKey1,
            'medDefCode': this.generalLedgerAssign.glassKey2,
            'glRefCode': this.generalLedgerAssign.glRefCode
        });
    }

    getGeneralLedgerAssigns() {
        this.generalLedgerAssignService.getGeneralLedgerAssigns(true, 0, this.pageSize).subscribe(generalLedgerAssigns => {
            this.gridData = generalLedgerAssigns;
            this.dataGridGridOptions.api.setRowData(generalLedgerAssigns);
            if (generalLedgerAssigns.length > 0) {
                this.dataGridGridOptions.api.selectNode(this.dataGridGridOptions.api.getRenderedNodes()[0]);
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    public onGridReady($event): void {
        this.dataGridGridOptions.api.showLoadingOverlay();
        // -------------------------------------------- Pagination
        const docsE: any = document.querySelectorAll('.customClass .ag-layout-normal .ag-paging-panel .ag-paging-page-summary-panel');
        const elements = docsE[0].getElementsByClassName('ag-paging-button');
        elements[3].addEventListener('click', this.nextPageCall, null)                          // page next button
    }


    nextPageCall = () => {
        this.nextPage();
    }

    nextPage() {
        const nextPage = Math.trunc((this.gridData.length) / this.pageSize);
        if (this.gridData.length === this.totalRowsCount || this.gridData.length > this.totalRowsCount) {
            this.showPopUp(gridNoRecordsFoundMessage, 'Gl Assignment');
            return;
        }
        this.generalLedgerAssignService.getGeneralLedgerAssigns(true, nextPage, this.pageSize).subscribe((pmbSetupRecords: GeneralLedgerAssign[]) => {

            this.gridData = [...this.gridData, ...pmbSetupRecords];
            if (!this.gridData) {
                return;
            }
            this.dataGridGridOptions.api.setRowData(this.gridData);

            this.currentPage = nextPage;
            this.dataGridGridOptions.api.paginationGoToPage(this.currentPage);
        }, error => {
            this.showPopUp(error, 'Gl Assignment');
        });

    }


    onRowSelectedGrid(event) {
        if (!event.node.selected) {
            return;
        }
        this.getGeneralLedgerAssign(event.data);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Comp Code',
                field: 'companyCode',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'GL Ref Code',
                field: 'glRefCode',
                width: 200
            },
            {
                headerName: 'Plan Code',
                field: 'glassKey1',
                width: 200
            },
            {
                headerName: 'Med Def Code',
                field: 'glassKey2',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 400
            }
        ];
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

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

    /**
     * Get Security Column Details
     */
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Close': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
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
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Window') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", shortcutKey: "Ctrl+M", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())),},
                    {name: "Open", shortcutKey: "Ctrl+O" },
                    {name: "Save", shortcutKey: "Ctrl+S", disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())),},
                    { name: "Close", shortcutKey: "Ctrl+F4" },
                    { isHorizontal: true },
                    { name: "Main Menu...", shortcutKey: "F2" },
                    { name: "Shortcut Menu...", shortcutKey: "F3" },
                    { isHorizontal: true },
                    { name: "Print", disabled: true },
                    { isHorizontal: true },
                    { name: "Exit", shortcutKey: "Alt+F4" },
                ],
            },
            {
                menuItem: "Edit",
                dropdownItems: [
                    { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                    { isHorizontal: true },
                    { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                    { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                    { name: "Paste", shortcutKey: "Ctrl+V" },
                    { name: "Next", shortcutKey: "F8" },
                    { name: "Previous", shortcutKey: "F7" },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 GL Assignment'}]
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

    private handleTopicMenu(action: string) {
        switch (action) {
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.glAssignmentForm = this.formBuilder.group({
            planCode: ['', {updateOn: 'blur', validators: []}],
            medDefCode: ['', {updateOn: 'blur', validators: []}],
            companyCode: ['', {updateOn: 'blur', validators: []}],
            glRefCode: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getGlAssignmentShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/GLASS_General_Ledger_Assignment.htm';
    }
}
