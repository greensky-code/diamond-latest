/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageMasterDtl, NoteType, SecWin } from '../../../api-models/index'
import { NoteTypeService } from '../../../api-services/notes/note-type.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { UntilDestroy } from '@ngneat/until-destroy';
import { getNoteTypeShortcutKeys } from '../../../shared/services/shared.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { NOTE_TYPE_MODULE_ID } from '../../app-constants';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../services/security.service';
import { ToastService } from '../../services/toast.service';
import { MessageMasterDtlService, SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { Menu, SearchModel } from '../../models/models';
import { SystemCodesLookup } from '../../lookup/system-codes-lookup';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { SearchboxComponent } from '../searchbox/searchbox.component';
import { NgbToastType } from 'ngb-toast';
import { FunctionalGroupShortCutComponent } from '../../../diamond/main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { SupportHelpComponent } from "../../../diamond/support/support-help/support-help.component";
import { SecUser } from '../../../api-models/security/sec-user.model';
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../services/menu.service';

// Use the Component directive to define the NoteTypeComponent as an Angular component
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

    selector: 'notetype',
    templateUrl: './note-type.component.html',

})
export class NoteTypeComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    noteTypeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;


    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    searchModel = new SearchModel(
        'systemcodeses/find-by-systemCodeType/NOTEPRIORITY/systemCodeActive/Y/languageId/0',
        SystemCodesLookup.SYSTEM_CODES_ALL,
        SystemCodesLookup.SYSTEM_CODES_DEFAULT,
        [],
        false,
        false,
        'get'
    );

    secWin: SecWinViewModel;
    windowId = NOTE_TYPE_MODULE_ID;
    tableName = "NOTE_TYPE";
    userTemplateId: string;
    isSuperUser = false;
    secProgress = true;
    isCheckboxSelected = false;
    secModuleId = NOTE_TYPE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    menu: Menu[] = [];

    editNoteType: boolean;
    noteType: NoteType;
    noteTypes: NoteType[];
    selectedRowId: string;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isChildModalOpen: boolean;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    isReadOnly: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private messageService: MessageMasterDtlService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private securityService: SecurityService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private noteTypeService: NoteTypeService,
        private menuSerrvice: MenuService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
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
            //this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }


    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.noteTypeForm);
        this.createDataGrid();
        this.getNoteTypes();
    }

    /**
 * Get Permissions
 * @param secUserId
 */
    getSecWin(secUserId: string) {
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {

                    //Check Menus Privilege Start
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End

                } else {
                    this.showPopUp1("You are not Permitted to view Note Type", "Note Type");
                }
            });
    }

    showPopUp1(message: string, title: string) {
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

    ngAfterViewInit(): void {
        this.shortcuts.push(...getNoteTypeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    onNoteTypeSelected(event: any) {
        if (event && event.data) {
            this.noteType = event.data;
            this.editNoteType = true;
            this.selectedRowId = event.rowIndex;
            this.isCheckboxSelected = false;
            this.populateNoteType();
        } else {
            this.isReadOnly = false;
        }
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: any) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createNoteType() {
        this.formValidation.validateForm();
        if (this.noteTypeForm.valid) {
            let noteType = this.getNoteTypeFromForm();
            this.noteType = noteType;
            this.noteTypeService.createNoteType(noteType).subscribe(response => {
                this.isFormDataChangeStatus = false;
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editNoteType = false;
                this.selectedRowId = this.noteTypes.length.toString();
                this.noteTypes.push(this.noteType);
                this.dataGridGridOptions.api.setRowData(this.noteTypes);
                this.dataGridGridOptions.api.paginationGoToLastPage();
                this.dataGridGridOptions.api.selectIndex(this.selectedRowId, false, false);
                this.dataGridGridOptions.api.ensureIndexVisible(this.selectedRowId, 'bottom');
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getNoteTypeFromForm() {
        let noteType = new NoteType();
        if (this.noteType) {
            noteType = this.noteType;
        }

        noteType.noteType = Form.getValue(this.noteTypeForm, 'noteType');
        noteType.priority = Form.getValue(this.noteTypeForm, 'priority');
        noteType.description = Form.getValue(this.noteTypeForm, 'description');
        noteType.userDefined1St = Form.getValue(this.noteTypeForm, 'userDefined1');
        noteType.userDefined2St = Form.getValue(this.noteTypeForm, 'userDefined2');
        noteType.userDefined3St = Form.getValue(this.noteTypeForm, 'userDefined3');
        noteType.userDefined4St = Form.getValue(this.noteTypeForm, 'userDefined4');
        noteType.userDefined5St = Form.getValue(this.noteTypeForm, 'userDefined5');
        noteType.userDefined1Req = Form.getValue(this.noteTypeForm, 'userDefined1Req') ? 'Y' : 'N';
        noteType.userDefined2Req = Form.getValue(this.noteTypeForm, 'userDefined2Req') ? 'Y' : 'N';
        noteType.userDefined3Req = Form.getValue(this.noteTypeForm, 'userDefined3Req') ? 'Y' : 'N';
        noteType.userDefined4Req = Form.getValue(this.noteTypeForm, 'userDefined4Req') ? 'Y' : 'N';
        noteType.userDefined5Req = Form.getValue(this.noteTypeForm, 'userDefined5Req') ? 'Y' : 'N';
        noteType.userDate1St = Form.getValue(this.noteTypeForm, 'userDate1');
        noteType.userDate2St = Form.getValue(this.noteTypeForm, 'userDate2');
        noteType.userDate3St = Form.getValue(this.noteTypeForm, 'userDate3');
        noteType.userDate4St = Form.getValue(this.noteTypeForm, 'userDate4');
        noteType.userDate5St = Form.getValue(this.noteTypeForm, 'userDate5');
        noteType.userDate1Req = Form.getValue(this.noteTypeForm, 'userDate1Req') ? 'Y' : 'N';
        noteType.userDate2Req = Form.getValue(this.noteTypeForm, 'userDate2Req') ? 'Y' : 'N';
        noteType.userDate3Req = Form.getValue(this.noteTypeForm, 'userDate3Req') ? 'Y' : 'N';
        noteType.userDate4Req = Form.getValue(this.noteTypeForm, 'userDate4Req') ? 'Y' : 'N';
        noteType.userDate5Req = Form.getValue(this.noteTypeForm, 'userDate5Req') ? 'Y' : 'N';
        return noteType;
    }

    updateNoteType() {
        this.formValidation.validateForm();
        if (this.noteTypeForm.valid && (this.isCheckboxSelected === false || (this.noteType.noteSecurityCode &&
            this.isCheckboxSelected === true))) {
            let noteType = this.getNoteTypeFromForm();
            this.noteType = noteType;
            this.noteTypeService.updateNoteType(noteType, noteType.noteType).subscribe(response => {
                this.isFormDataChangeStatus = false;
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.dataGridGridOptions.api.getRowNode(this.selectedRowId).setData(this.noteType);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            });
        } else if (this.isCheckboxSelected === true && !this.noteType.noteSecurityCode) {
            this.messageService.findByMessageId(29034).subscribe((message: MessageMasterDtl[]) => {
                this.toastService.showToast("29034: " + message[0].messageText.replace('@1', 'note_security_code'), NgbToastType.Danger);
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    /**
     * User can only add/update if user has todo permissions
     */
    saveChanges() {
        if (this.editNoteType) {
            if (this.isSuperUser) {
                this.updateNoteType();
            } else {
                if (this.secWin.hasUpdatePermission()) {
                    this.updateNoteType();
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
                    });
                }
            }
        } else {
            if (this.isSuperUser) {
                this.createNoteType();
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.createNoteType();
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                    });
                }
            }
        }
    }


    deleteNoteType() {
        if (this.isSuperUser) {
            this.deletePopup();
        } else {
            if (this.secWin.hasDeletePermission()) {
                this.deletePopup();
            } else {
                this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    deletePopup() {
        let popUpMessage = new PopUpMessage(
            'Note Type',
            'Note Type',
            '29070: Press yes to delete this record',
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
                this.deleteRecord();
            } else {
                ref.close();
            }
        }, (error: any) => {
            console.log(error);
        });

    }

    deleteRecord() {
        this.noteTypeService.deleteNoteType(this.noteType.noteType).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            this.getNoteTypes();
        });
    }

    getNoteType(noteType: string) {
        this.noteTypeService.getNoteType(noteType).subscribe(noteType => {
            this.noteType = noteType;
            this.populateNoteType();
        });
    }

    populateNoteType() {
        this.noteTypeForm.patchValue({
            'noteType': this.noteType.noteType,
            'priority': this.noteType.priority,
            'description': this.noteType.description,
            'userDefined1': this.noteType.userDefined1St,
            'userDefined2': this.noteType.userDefined2St,
            'userDefined3': this.noteType.userDefined3St,
            'userDefined4': this.noteType.userDefined4St,
            'userDefined5': this.noteType.userDefined5St,
            'userDefined1Req': this.noteType.userDefined1Req == 'Y',
            'userDefined2Req': this.noteType.userDefined2Req == 'Y',
            'userDefined3Req': this.noteType.userDefined3Req == 'Y',
            'userDefined4Req': this.noteType.userDefined4Req == 'Y',
            'userDefined5Req': this.noteType.userDefined5Req == 'Y',
            'userDate1': this.noteType.userDate1St,
            'userDate2': this.noteType.userDate2St,
            'userDate3': this.noteType.userDate3St,
            'userDate4': this.noteType.userDate4St,
            'userDate5': this.noteType.userDate5St,
            'userDate1Req': this.noteType.userDate1Req == 'Y',
            'userDate2Req': this.noteType.userDate2Req == 'Y',
            'userDate3Req': this.noteType.userDate3Req == 'Y',
            'userDate4Req': this.noteType.userDate4Req == 'Y',
            'userDate5Req': this.noteType.userDate5Req == 'Y',
        });
        //this.noteTypeForm.get('noteType').disable();
        this.isReadOnly = true;
        setTimeout(() => {
            this.isFormDataModified();
        }, 2000)
    }

    getNoteTypes() {
        this.noteTypes = [];
        this.noteTypeService.getNoteTypes().subscribe(noteTypes => {
            this.noteTypes = noteTypes;
            this.dataGridGridOptions.api.setRowData(this.noteTypes);
            this.dataGridGridOptions.api.selectIndex(0, false, false)
        });
    }

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = { paginationPageSize: 50 };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Note Type",
                field: "noteType",
                width: 180,
            },
            {
                headerName: "Priority",
                field: "priority",
                width: 180
            },
            {
                headerName: "Description",
                field: "description",
                width: 550
            },
            {
                headerName: "Note Security Code",
                field: "noteSecurityCode",
                width: 200
            }
        ];
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        this.isChildModalOpen = true;
        let ref = this.modalService.open(SearchboxComponent, {
            size: <any>'m',
            beforeDismiss: () => {
                this.isChildModalOpen = false;
                return true;
            },
        });
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((response: any) => {
            this.noteTypeForm.patchValue({
                'priority': response.systemCodesPrimaryKey.systemCode
            });
            this.popUpMessage = null;
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {

           // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.noteType = null;
        this.noteTypeForm = this.formBuilder.group({
            noteType: ['', { updateOn: 'blur', validators: [Validators.maxLength(3)] }],
            priority: ['', { updateOn: 'blur', validators: [Validators.max(2)] }],
            description: ['', { updateOn: 'blur', validators: [Validators.maxLength(30)] }],
            userDefined1: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined2: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined3: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined4: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined5: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined1Req: ['', { updateOn: 'blur', validators: [] }],
            userDefined2Req: ['', { updateOn: 'blur', validators: [] }],
            userDefined3Req: ['', { updateOn: 'blur', validators: [] }],
            userDefined4Req: ['', { updateOn: 'blur', validators: [] }],
            userDefined5Req: ['', { updateOn: 'blur', validators: [] }],
            userDate1: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate2: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate3: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate4: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate5: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate1Req: ['', { updateOn: 'blur', validators: [] }],
            userDate2Req: ['', { updateOn: 'blur', validators: [] }],
            userDate3Req: ['', { updateOn: 'blur', validators: [] }],
            userDate4Req: ['', { updateOn: 'blur', validators: [] }],
            userDate5Req: ['', { updateOn: 'blur', validators: [] }],
        }, {
            updateOn: 'submit'
        });
        this.isReadOnly = false;
    }

    createNewForm() {
        if (this.isSuperUser) {
            this.createForm();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.createForm();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New' },
                    { name: 'Delete' },
                    { name: 'Save' },
                    { name: 'Close' },
                    { name: '-' },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
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
                    { name: 'Lookup' },
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    { name: 'Tile' },
                    { name: 'Layer' },
                    { name: 'Cascade' },
                    { name: 'Arrange Icons' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp' },
                    { name: 'Audit Display' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' },
                    { name: 'Search for Help on...' },
                    { name: 'This Window', shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: 'Glossary' },
                    { name: 'Getting Started' },
                    { name: 'How to use Help' },
                    { isHorizontal: true },
                    { name: 'About Diamond Client/Server' },
                ],
            },
        ];
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.editNoteType = false;
                    this.createForm();
                    break;
                }
                case 'Delete': {
                    this.deleteNoteType();
                    break;
                }
                case 'Save': {
                    this.saveChanges();
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
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {

                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
        }
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose() {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Note Type')
            })
        } else {
            this.activeModal.close();
        }
    }

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
                    this.saveChanges()
                }
                else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.noteTypeForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/NOTET_Note_Types.htm';
    }

    checkboxFieldChange(event: any, field: any) {
        this.isCheckboxSelected = true;
    }

    formPopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };
}
