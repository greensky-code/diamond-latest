/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GridOptions } from "ag-grid-community";

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { CovProvGroupMaster } from '../../../api-models/provider/cov-prov-group-master.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CovProvGroupMasterService } from '../../../api-services/provider/cov-prov-group-master.service';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { Menu } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../../diamond/main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import {MessageMasterDtl, SecUser} from '../../../api-models';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { getProvCVPVCShortcutKeys } from '../../../shared/services/shared.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { RequiredValidator } from '../../../shared/validators/required.validator';
import {HelpComponent} from "../../member/help/help.component";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

// Use the Component directive to define the CoveringProviderGroupCodesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({ checkProperties: true })
@Component({

    selector: 'coveringprovidergroupcodes',
    templateUrl: './covering-provider-group-codes.component.html',

})
export class CoveringProviderGroupCodesComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;

    coveringProviderGroupCodesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    secColDetails: SecColDetail[] = [];
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    editCovProvGroupMaster = true;
    covProvGroupMaster: CovProvGroupMaster;
    covProvGroupMasters: CovProvGroupMaster[];


    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private covProvGroupMasterService: CovProvGroupMasterService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private toastService: ToastService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private cdr: ChangeDetectorRef) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {

        this.hasPermission()
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProvCVPVCShortcutKeys(this));
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

    popUpButtonHandler(button) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }


    createCovProvGroupMaster() {
        this.formValidation.validateForm();
        if (this.coveringProviderGroupCodesForm.valid) {
            let covProvGroupMaster = this.getFormData(new CovProvGroupMaster());
            this.covProvGroupMasterService.createCovProvGroupMaster(covProvGroupMaster).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.popupClose = false;
                this.covProvGroupMasters.push(covProvGroupMaster);
                this.dataGridGridOptions.api.setRowData(this.covProvGroupMasters);
                this.dataGridGridOptions.api.selectIndex(0, null, null);
                this.editCovProvGroupMaster = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    changeState = () => {
        this.popupClose = true;
    };

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Covering Provider Group Codes')
            })
        } else {
            this.activeModal.close()
        }
    };

    popupAlert = (message: string, title: string) => {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {
            if (resp.name === 'Yes') {
                this.saveCovProvGroupMaster();
            } else if (resp.name === 'No') {

                this.activeModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    };

    updateCovProvGroupMaster(seqCovProvGrp: number) {

        if (this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) {

            this.formValidation.validateForm();
            if (this.coveringProviderGroupCodesForm.valid) {
                let covProvGroupMaster = this.getFormData(this.covProvGroupMaster);
                this.covProvGroupMasterService.updateCovProvGroupMaster(covProvGroupMaster, seqCovProvGrp).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                    this.popupClose = false;
                    this.editCovProvGroupMaster = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('Not permitted to delete', 'Group Master Security');

        }


    }

    getFormData(covProvGroupMaster: CovProvGroupMaster): CovProvGroupMaster {
        this.coveringProviderGroupCodesForm.enable();
        covProvGroupMaster.covProvGrpId = this.coveringProviderGroupCodesForm.value.groupId;
        covProvGroupMaster.shortDescription = this.coveringProviderGroupCodesForm.value.description;
        this.coveringProviderGroupCodesForm.controls['groupId'].disable();
        return covProvGroupMaster;
    }

    saveCovProvGroupMaster() {
        if (this.editCovProvGroupMaster) {
            this.updateCovProvGroupMaster(this.covProvGroupMaster.seqCovProvGrp)
        } else {
            this.createCovProvGroupMaster();
        }
    }


    deleteCovProvGroupMaster(seqCovProvGrp: number) {

        if (this.isSuperUser || (this.secWin && this.secWin.hasDeletePermission())) {
            this.covProvGroupMasterService.deleteCovProvGroupMaster(seqCovProvGrp).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                const deletedFieldIndex: number = this.covProvGroupMasters.findIndex(r => r.seqCovProvGrp === seqCovProvGrp);
                this.covProvGroupMasters.splice(deletedFieldIndex, 1);
                this.dataGridGridOptions.api.setRowData(this.covProvGroupMasters);
                this.dataGridGridOptions.api.selectIndex(0, null, null);


            });
        } else {
            this.showPopUp('Not permitted to delete', 'Group Master Security');

        }
    }

    getCovProvGroupMaster(seqCovProvGrp: number) {
        this.covProvGroupMasterService.getCovProvGroupMaster(seqCovProvGrp).subscribe(covProvGroupMaster => {
            this.covProvGroupMaster = covProvGroupMaster;
            this.coveringProviderGroupCodesForm.patchValue({});
        });
    }

    getCovProvGroupMasters() {
        this.covProvGroupMasterService.getCovProvGroupMasters().subscribe(covProvGroupMasters => {
            this.covProvGroupMasters = covProvGroupMasters;
            this.dataGridGridOptions.api.setRowData(covProvGroupMasters);
            if (this.covProvGroupMasters.length > 0) {
                this.setFormData(this.covProvGroupMasters[0]);
                this.covProvGroupMaster = this.covProvGroupMasters[0];
                this.dataGridGridOptions.api.selectIndex(0, null, null);
            }

        });
    }

    onRowSelected(event) {
        this.covProvGroupMaster = event.data;
        this.dataGridGridOptions.api.selectIndex(event.rowIndex, null, null);
        this.setFormData(this.covProvGroupMaster);
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
                headerName: "Cov Prov Group ID",
                field: "covProvGrpId",
                width: 200,
            },
            {
                headerName: "Description",
                field: "shortDescription",
                width: 200
            }
        ];
    }

    windowId = 'CVPVC';
    secWin: SecWinViewModel;
    isSuperUser = false;
    secProgress = true;

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

    userTemplateId;

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


    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.coveringProviderGroupCodesForm);
        this.createDataGrid();
        this.menuInit();

        this.getCovProvGroupMasters();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    cwereateForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.coveringProviderGroupCodesForm = this.formBuilder.group({}, { updateOn: 'submit' });
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.coveringProviderGroupCodesForm = this.formBuilder.group({
            description: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            groupId: [{ value: '', disabled: true }, {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace, Validators.maxLength(10)]
            }],
        });

    }

    setFormData(object: CovProvGroupMaster) {
        this.coveringProviderGroupCodesForm.patchValue({
            'groupId': object.covProvGrpId,
            'description': object.shortDescription,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormValidateStatus()
        }, 2000)
    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl + m' },
                    { name: 'Open' },
                    { name: 'Save', shortcutKey: 'Ctrl + s' },
                    { name: 'Delete' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu... ', shortcutKey: 'f3' },
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
                ],
            },

            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Title', shortcutKey:'Shift + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Shift + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Shift + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift + Alt + S'},
                    {isHorizontal: true},
                    {name :'1 Main Menu'},
                    {name : '2 Covering Provider Group Codes'}
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
                    {name: 'How to use help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    resetForm() {
        this.coveringProviderGroupCodesForm.reset();
        this.coveringProviderGroupCodesForm.enable();
        this.editCovProvGroupMaster = false;
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
                case 'Save': {
                    this.saveCovProvGroupMaster();
                    break;
                }
                case 'Close': {

                    this.activeModal.dismiss();
                    break;
                }
                case 'Delete': {

                    this.deleteCovProvGroupMaster(this.covProvGroupMaster.seqCovProvGrp);

                    break;
                }
                case 'Shortcut Menu': {
                    this.showShortcuts();
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

        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }

    }

    showShortcuts() {
        const ref = this.modalService.open(FunctionalGroupShortCutComponent);
        ref.componentInstance.showIcon = true;
    }

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'CVPVC_Covering_Provider_Group_ID.htm';
    }

    isFormValidateStatus = () => {
        this.coveringProviderGroupCodesForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
