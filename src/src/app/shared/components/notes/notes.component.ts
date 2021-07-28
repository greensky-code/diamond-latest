/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe, formatDate } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GridOptions, Optional } from "ag-grid-community";
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from "ngb-toast";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { MessageMasterDtl, NavWin, NoteMaster, NoteType, SecUser, SecWin } from "../../../api-models/index";
import { MenuResponse } from "../../../api-models/menu-response";
import { MessageMasterDtlService, NavWinService } from '../../../api-services';
import { NoteMasterService } from "../../../api-services/notes/note-master.service";
import { NoteTypeService } from '../../../api-services/notes/note-type.service';
import { SecUserService } from "../../../api-services/security/sec-user.service";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { FunctionalGroupShortCutComponent } from "../../../diamond/main-menu/functional-group-shortcut/functional-group-shortcut.component";
import { AlertMessage } from '../../../shared/components/alert-message/index';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { DatePickerConfig, datePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { getNoteMasterShortcutKeys } from '../../../shared/services/shared.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { SystemCodesLookup } from "../../lookup/system-codes-lookup";
import { Menu, SearchModel } from "../../models/models";
import { MenuService } from "../../services/menu.service";
import { SecurityService } from "../../services/security.service";
import { ToastService } from "../../services/toast.service";
import { SearchboxComponent } from "../searchbox/searchbox.component";


// Use the Component directive to define the NotesComponent as an Angular component
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
    selector: 'notes',
    templateUrl: './notes.component.html',
    providers: [
        DatePipe
    ]
})
export class NotesComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    @Input() showHighPriorityNotesOnly: boolean = false;
    notesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    noteType: NoteType;
    noteTypes: NoteType[];
    isList: boolean = true;
    selectedType01: any = null;
    selectedType02: any = null;
    popupClose: Boolean = false;

    public menu: Menu[] = [];

    public dataGridGridOptions: GridOptions;
    insertUser: string = "";
    updateUser: string = "";
    editNoteMaster: boolean = true;
    enableAllTypes: boolean = true;
    noteMaster: NoteMaster;
    noteMasters: NoteMaster[] = [];
    navWin: NavWin;
    notesProvContext: boolean = false;
    notesGroupContext: boolean = false;
    notesMembContext: boolean = false;
    isChildModalOpen: boolean;

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('closeBtn', { static: true }) closeBtn: ElementRef;

    searchModel = new SearchModel(
        'systemcodeses/find-by-systemCodeType/NOTEPRIORITY/systemCodeActive/Y/languageId/0',
        SystemCodesLookup.SYSTEM_CODES_ALL,
        SystemCodesLookup.SYSTEM_CODES_DEFAULT,
        [],
        false,
        false,
        'get'
    );

    @Input() sourceId: any = null;
    displayForm: boolean = false;
    defaultColDef: any;

    public isSuperUser = false;
    userTemplateId: string;
    public secWin: SecWinViewModel;
    public secProgress = true;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private dateFormatPipe: DateFormatPipe,
        private noteMasterService: NoteMasterService,
        private navWinService: NavWinService,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private toastService: ToastService,
        private noteTypeService: NoteTypeService,
        private messageService: MessageMasterDtlService,
        private cdr: ChangeDetectorRef,
        private secUserService: SecUserService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private menuSerrvice: MenuService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.createDataGrid();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.notesForm);
        this.getNoteMasterBySourceAndWinId();
        this.getNoteTypes();
        this.getNavWin();
        this.hasPermission();
        this.notesForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        });

    }
   
     /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        let userId = null;
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    focusCloseBtn() {
        this.closeBtn.nativeElement.focus();
    }
      /**
     * Get Permissions
     * @param secUserId
     */
       getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.winId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;
                //Check Menus Privilege Start
                let menuResponse = new MenuResponse();
                menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                if (menuResponse.status) {
                    this.menu = [];
                    this.menu = [...menuResponse.menus];
                }
                //Check Menus Privilege End
            } else {
                this.showPermissionPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission');
            }
        }, error => {
            this.secProgress = false;
        });
    }

    
    showPermissionPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50,
            };
                  
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Type",
                field: "noteType",
                width: 100,
                flex: 1,
                headerCheckboxSelection: true,
                checkboxSelection: true
            },
            {
                headerName: "Priority",
                field: "priority",
                width: 100,
                flex: 1
            },
            {
                headerName: "Date",
                field: "noteDate",
                width: 100,
                flex: 1
            },
            {
                headerName: "Line",
                field: "userDefined1",
                width: 50,
                flex: 1
            },
            {
                headerName: "Text",
                field: "noteText",
                width: 400,
                flex: 2
            },
            {
                headerName: "Followup Date",
                field: "followupDate",
                width: 100,
                flex: 1
            }
        ];
        this.defaultColDef = { resizable: true };
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getNoteMasterShortcutKeys(this));
        this.cdr.detectChanges();
    }

    showPopUp(message: string, title: string, button = 'Cancel') {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title,
            message,
            'icon'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton(button, button, 'btn btn-primary'),
        ];
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

    popUpButtonHandler(button: any ) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getNoteTypes() {
        this.noteTypeService.getNoteTypes().subscribe((resp: NoteType[]) => {
            this.noteTypes = resp;
            this.noteTypes.sort((a,b) => (a.noteType > b.noteType) ? 1 : ((b.noteType > a.noteType) ? -1 : 0))
        })
    }

    createNoteMaster() {
        this.formValidation.validateForm();
        if (this.notesForm.valid) {
            let noteMaster = this.getNoteMasterData();
            noteMaster.seqSourceId = this.sourceId;
            noteMaster.noteWinId = this.winId;
            this.noteMasterService.createNoteMaster(noteMaster).subscribe(response => {
                this.noteMaster = response;
                this.popupClose = false;
                this.editNoteMaster = false;
                this.isList = true;
                this.displayForm = false;
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.getNoteMasterBySourceAndWinId();
            });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }


    updateNoteMaster(seqNoteId: number) {
        this.formValidation.validateForm();
        if (this.notesForm.valid) {
            let noteMaster = this.getNoteMasterData();
            noteMaster.seqSourceId = this.sourceId;
            noteMaster.noteWinId = this.winId;
            this.noteMasterService.updateNoteMaster(noteMaster, seqNoteId).subscribe(response => {
                this.popupClose = false;
                this.editNoteMaster = false;
                this.isList = true;
                this.displayForm = false;
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.getNoteMasterBySourceAndWinId();
            });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    getNoteMasterData() {
        let noteMaster = new NoteMaster();
        let noteType = new NoteType();
        noteMaster.noteType =  this.notesForm.getRawValue().notetype;
        noteMaster.priority = this.notesForm.getRawValue().priority;
        noteMaster.noteDate = Form.getDatePickerValue(this.notesForm, 'date');
        noteMaster.noteText = Form.getValue(this.notesForm, 'textArea');
        noteMaster.seqGroupId = Form.getValue(this.notesForm, 'group');
        noteMaster.followupDate = Form.getDatePickerValue(this.notesForm, 'followUpDate');
        noteMaster.seqProvId = Form.getValue(this.notesForm, 'provider');
        noteMaster.followupCode = Form.getValue(this.notesForm, 'followupCode');
        noteMaster.expirationDate = Form.getDatePickerValue(this.notesForm, 'expireDate');
        noteMaster.userDefined1 = Form.getValue(this.notesForm, 'userDefined1');
        noteMaster.userDefined2 = Form.getValue(this.notesForm, 'userDefined2');
        noteMaster.userDefined3 = Form.getValue(this.notesForm, 'userDefined3');
        noteMaster.userDefined4 = Form.getValue(this.notesForm, 'userDefined4');
        noteMaster.userDefined5 = Form.getValue(this.notesForm, 'userDefined5');
        noteMaster.userDate1 = Form.getDatePickerValue(this.notesForm, 'userDate1') ? Form.getDatePickerValue(this.notesForm, 'userDate1') : null;
        noteMaster.userDate2 = Form.getDatePickerValue(this.notesForm, 'userDate2') ? Form.getDatePickerValue(this.notesForm, 'userDate2') : null;
        noteMaster.userDate3 = Form.getDatePickerValue(this.notesForm, 'userDate3') ? Form.getDatePickerValue(this.notesForm, 'userDate3') : null;
        noteMaster.userDate4 = Form.getDatePickerValue(this.notesForm, 'userDate4') ? Form.getDatePickerValue(this.notesForm, 'userDate4') : null;
        noteMaster.userDate5 = Form.getDatePickerValue(this.notesForm, 'userDate5') ? Form.getDatePickerValue(this.notesForm, 'userDate5') : null;
        let updatedDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
        let insertUser = sessionStorage.getItem('user');
        let insertProcess = 'NOTES';
        noteMaster.securityCode = '0';
        noteMaster.insertDatetime = updatedDate;
        noteMaster.insertUser = insertUser
        noteMaster.insertProcess = insertProcess;
        noteMaster.updateDatetime = updatedDate;
        noteMaster.updateUser = insertUser;
        noteMaster.updateProcess = insertProcess;
        noteMaster.consolidateType = this.winId;
        noteMaster.noteTypeViewModel = noteType;
        return noteMaster;
    }

    saveNoteMaster() {
        if (this.editNoteMaster) {
            this.updateNoteMaster(this.noteMaster.seqNoteId)
        } else {
            this.createNoteMaster();
        }
    }

    
    createNewNote() {
        // this.onSelectNoteMaster();
        this.isList = false;
        this.noteMaster = null;
        this.editNoteMaster = false;
        this.displayForm = false;
        this.notesForm.patchValue({
            notetype: '',
            priority: '0',
            date: this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
            followUpDate: '',
            followupCode: '',
        },{emitEvent: false});
    }

    deleteNoteMaster(seqNoteId: number) {
        this.noteMasterService.deleteNoteMaster(seqNoteId).subscribe(response => {
            this.toastService.showToast("Record successfully deleted.", NgbToastType.Success);
        });
    }

    getNoteMaster(seqNoteId: number) {
        this.noteMasterService.getNoteMaster(seqNoteId).subscribe(noteMaster => {
            this.noteMaster = noteMaster;
        });
    }

    getNoteMasters() {
        this.noteMasterService.getNoteMasters().subscribe(noteMasters => {
            this.noteMasters = noteMasters;
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.notesForm = this.formBuilder.group({
            consolidateNotesBy: ['', { updateOn: 'blur', validators: [] }],
            notesDates: ['', { updateOn: 'blur', validators: [] }],
            none: ['', { updateOn: 'blur', validators: [] }],
            group: ['', { updateOn: 'blur', validators: [] }],
            followUpDate: ['', { updateOn: 'blur', validators: [] }],
            member: ['', { updateOn: 'blur', validators: [] }],
            provider: ['', { updateOn: 'blur', validators: [] }],
            notetype: ['', { updateOn: 'blur', validators: [Validators.required] }],
            priority: ['', { updateOn: 'blur', validators: [Validators.required] }],
            date: ['', { updateOn: 'blur', validators: [Validators.required] }],
            followupCode: ['', { updateOn: 'blur', validators: [] }],
            textArea: ['', { updateOn: 'blur', validators: [] }],
            expireDate: ['', { updateOn: 'blur', validators: [] }],
            userDefined1Label: [''],
            userDefined2Label: [''],
            userDefined3Label: [''],
            userDefined4Label: [''],
            userDefined5Label: [''],
            userDefined1Show: [''],
            userDefined2Show: [''],
            userDefined3Show: [''],
            userDefined4Show: [''],
            userDefined5Show: [''],
            userDefined1: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined2: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined3: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined4: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDefined5: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate1Label: [''],
            userDate2Label: [''],
            userDate3Label: [''],
            userDate4Label: [''],
            userDate5Label: [''],
            userDate1Show: [''],
            userDate2Show: [''],
            userDate3Show: [''],
            userDate4Show: [''],
            userDate5Show: [''],
            userDate1: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate2: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate3: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate4: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
            userDate5: ['', { updateOn: 'blur', validators: [Validators.maxLength(10)] }],
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onClickType(event: any) {
        if(event.target.value) {
            this.displayForm = false;
            this.enableAllTypes = false;
            this.isList = true;
            this.selectedType01 = event.target.value;
            setTimeout(() => {
                this.loadNoteType(event.target.value);
            }, 100);
        }
    }

    loadNoteType = async (noteType: any) => {
        let data = [];
        let filternoteMasters: any[] = this.noteMasters;
        for (let item of filternoteMasters) {
            if(item.noteTypeViewModel.noteType === noteType) {
                
                await data.push(item);
                this.dataGridGridOptions.api.setRowData(data);
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.noteType = item.noteTypeViewModel.noteType;
                this.populateNoteMaster();                    
            }
        }
        if(data.length == 0) {
            this.dataGridGridOptions.api.setRowData([]);
            this.displayForm = false;
            this.resetNoteForm();
        }
    }

    onClickSortByPriority(event: any) {
        this.noteMasters.sort((a, b) => {
            return (a.priority < b.priority ? 1 : (a.priority > b.priority ? -1 : 0));
        });
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData(this.noteMasters);
            if (this.noteMasters && this.noteMasters.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            }
        }, 100);
    }

    onClickSortByNotesDate(event: any) {
        this.noteMasters.sort((a, b) => {
            return (a.noteDate < b.noteDate ? 1 : (a.noteDate > b.noteDate ? -1 : 0));
        });
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData(this.noteMasters);
            if (this.noteMasters && this.noteMasters.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            }
        }, 100);
    }

    onClickSortByFollowUpDate(event: any) {
        this.noteMasters.sort((a, b) => {
            return (a.followupDate < b.followupDate ? 1 : (a.followupDate > b.followupDate ? -1 : 0));
        });
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData(this.noteMasters);
            if (this.noteMasters && this.noteMasters.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
            }
        }, 100);
    }
    selectedCheckbox = 0;
    onClickConsolidateNotesBy(event: any) {
        if(event.target.value == "GROUP") {
            if(!this.notesGroupContext) {
                this.messageService.findByMessageId(27025).subscribe((message: MessageMasterDtl[]) => {
                    this.selectedCheckbox = 0;
                    this.consolidateNotesPopupAlert('27025: ' + message[0].messageText, 'Notes');
                });
            } else {
                this.selectedCheckbox = 1;
            }
        } else if(event.target.value == "MEMBR") {
            this.selectedCheckbox = 1;
            if(!this.notesMembContext) {
                this.messageService.findByMessageId(27032).subscribe((message: MessageMasterDtl[]) => {
                    this.selectedCheckbox = 0;
                    this.consolidateNotesPopupAlert('27032: ' + message[0].messageText, 'Notes');
                });
            } else {
                this.selectedCheckbox = 2;
            }
        } else if(event.target.value == "PROVP") {
            if(!this.notesProvContext) {
                this.messageService.findByMessageId(27035).subscribe((message: MessageMasterDtl[]) => {
                    this.selectedCheckbox = 0;
                    this.consolidateNotesPopupAlert('27035: ' + message[0].messageText, 'Notes');
                });
            } else {
                this.selectedCheckbox = 3;
            }
        } else {
            this.selectedCheckbox = 0;
        }
    }

    consolidateNotesPopupAlert = (message: string, title: string) => {
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

    onChangeNoteType(event: any) {
        this.displayForm = false;
        this.enableAllTypes = true;
        this.selectedType01 = null;
        this.getNoteMasterBySourceAndWinId();
    }

    onNoteSelected(event: any) {
        this.editNoteMaster = true;
        if(event && event.data){
            this.noteMaster = event.data;
            if(event.data.noteTypeViewModel){
                this.getNoteType(event.data.noteTypeViewModel.noteType);
            }
        }
    }

    onGridSelectionChange(event:any) {              
        let selectedRows : any[] = this.dataGridGridOptions.api.getSelectedRows();
        if(selectedRows.length > 0) {
            this.noteMaster = selectedRows[0];
            if( selectedRows[0].noteTypeViewModel){
                this.getNoteType(selectedRows[0].noteTypeViewModel.noteType);
            }
        }        
    }

    getNoteType(noteType: string) {
        this.noteTypeService.getNoteType(noteType).subscribe(noteType => {
            this.noteType = noteType;
            this.populateNoteMaster();
        });
    }
   
    populateNoteMaster() {
        this.resetNoteForm();
        if(this.noteMaster) {
            this.insertUser =  (this.noteMaster && this.noteMaster.insertUser) ? this.noteMaster.insertUser : '';
            this.updateUser =  (this.noteMaster && this.noteMaster.updateUser) ? this.noteMaster.updateUser : '';
            this.notesForm.patchValue({
                'consolidateNotesBy':'none',
                'notetype': (this.noteMaster && this.noteMaster.noteType) ? this.noteMaster.noteType : '',
                'priority': (this.noteMaster && this.noteMaster.priority) ? this.noteMaster.priority : '',
                'date': (this.noteMaster && this.noteMaster.noteDate) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.noteDate) : null,
                'followUpDate': (this.noteMaster && this.noteMaster.followupDate) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.followupDate) : null,
                'followupCode': (this.noteMaster && this.noteMaster.followupCode) ? this.noteMaster.followupCode : '',
                'textArea': (this.noteMaster && this.noteMaster.noteText) ? this.noteMaster.noteText : '',
                'group': (this.noteMaster && this.noteMaster.seqGroupId) ? this.noteMaster.seqGroupId : '',
                'provider': (this.noteMaster && this.noteMaster.seqProvId) ? this.noteMaster.seqProvId : '',
                'expireDate': (this.noteMaster && this.noteMaster.expirationDate) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.expirationDate) : null,
                'userDefined1Label': this.noteType.userDefined1St,
                'userDefined2Label': this.noteType.userDefined2St,
                'userDefined3Label': this.noteType.userDefined3St,
                'userDefined4Label': this.noteType.userDefined4St,
                'userDefined5Label': this.noteType.userDefined5St,
                'userDefined1Show': this.noteType.userDefined1St ? true:false,
                'userDefined2Show': this.noteType.userDefined2St ? true:false,
                'userDefined3Show': this.noteType.userDefined3St ? true:false,
                'userDefined4Show': this.noteType.userDefined4St ? true:false,
                'userDefined5Show': this.noteType.userDefined5St ? true:false,
                'userDefined1': (this.noteMaster && this.noteMaster.userDefined1) ? this.noteMaster.userDefined1: "",
                'userDefined2': (this.noteMaster && this.noteMaster.userDefined2) ? this.noteMaster.userDefined2: "",
                'userDefined3': (this.noteMaster && this.noteMaster.userDefined3) ? this.noteMaster.userDefined3: "",
                'userDefined4': (this.noteMaster && this.noteMaster.userDefined4) ? this.noteMaster.userDefined4: "",
                'userDefined5': (this.noteMaster && this.noteMaster.userDefined5) ? this.noteMaster.userDefined5: "",
                'userDate1Label': this.noteType.userDate1St,
                'userDate2Label': this.noteType.userDate2St,
                'userDate3Label': this.noteType.userDate3St,
                'userDate4Label': this.noteType.userDate4St,
                'userDate5Label': this.noteType.userDate5St,
                'userDate1Show': this.noteType.userDate1St ? true:false,
                'userDate2Show': this.noteType.userDate2St ? true:false,
                'userDate3Show': this.noteType.userDate3St ? true:false,
                'userDate4Show': this.noteType.userDate4St ? true:false,
                'userDate5Show': this.noteType.userDate5St ? true:false,
                'userDate1': (this.noteMaster && this.noteMaster.userDate1) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate1) : "",
                'userDate2': (this.noteMaster && this.noteMaster.userDate2) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate2) : "",
                'userDate3': (this.noteMaster && this.noteMaster.userDate3) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate3) : "",
                'userDate4': (this.noteMaster && this.noteMaster.userDate4) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate4) : "",
                'userDate5': (this.noteMaster && this.noteMaster.userDate5) ? this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate5) : "",
            },{emitEvent: false});
        } else {
            this.notesForm.patchValue({
                'consolidateNotesBy':this.winId,
                'notetype': this.noteType  ? this.noteType.noteType : '',
                'priority': this.noteType  ? this.noteType.priority : '',
                'date': this.dateFormatPipe.defaultDisplayDateFormat(new Date()),
                'followUpDate': '',
                'followupCode': '',
                'textArea': '',
                'group': '',
                'provider': '',
                'expireDate': null,
                'userDefined1Label': this.noteType.userDefined1St,
                'userDefined2Label': this.noteType.userDefined2St,
                'userDefined3Label': this.noteType.userDefined3St,
                'userDefined4Label': this.noteType.userDefined4St,
                'userDefined5Label': this.noteType.userDefined5St,
                'userDefined1Show': this.noteType.userDefined1St ? true:false,
                'userDefined2Show': this.noteType.userDefined2St ? true:false,
                'userDefined3Show': this.noteType.userDefined3St ? true:false,
                'userDefined4Show': this.noteType.userDefined4St ? true:false,
                'userDefined5Show': this.noteType.userDefined5St ? true:false,
                'userDefined1': "",
                'userDefined2': "",
                'userDefined3': "",
                'userDefined4': "",
                'userDefined5': "",
                'userDate1Label': this.noteType.userDate1St,
                'userDate2Label': this.noteType.userDate2St,
                'userDate3Label': this.noteType.userDate3St,
                'userDate4Label': this.noteType.userDate4St,
                'userDate5Label': this.noteType.userDate5St,
                'userDate1Show': this.noteType.userDate1St ? true:false,
                'userDate2Show': this.noteType.userDate2St ? true:false,
                'userDate3Show': this.noteType.userDate3St ? true:false,
                'userDate4Show': this.noteType.userDate4St ? true:false,
                'userDate5Show': this.noteType.userDate5St ? true:false,
                'userDate1': "",
                'userDate2': "",
                'userDate3': "",
                'userDate4': "",
                'userDate5': "",
            },{emitEvent: false});
        }
        
        if(this.noteType.userDefined1Req == "Y") {
            this.notesForm.controls["userDefined1"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDefined1"].setValidators([]);
        }
        if(this.noteType.userDefined2Req == "Y") {
            this.notesForm.controls["userDefined2"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDefined2"].setValidators([]);
        }
        if(this.noteType.userDefined3Req == "Y") {
            this.notesForm.controls["userDefined3"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDefined3"].setValidators([]);
        }
        if(this.noteType.userDefined4Req == "Y") {
            this.notesForm.controls["userDefined4"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDefined4"].setValidators([]);
        }
        if(this.noteType.userDefined5Req == "Y") {
            this.notesForm.controls["userDefined5"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDefined5"].setValidators([]);
        }
        if(this.noteType.userDate1Req == "Y") {
            this.notesForm.controls["userDate1"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDate1"].setValidators([]);
        }
        if(this.noteType.userDate2Req == "Y") {
            this.notesForm.controls["userDate2"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDate2"].setValidators([]);
        }
        if(this.noteType.userDate3Req == "Y") {
            this.notesForm.controls["userDate3"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDate3"].setValidators([]);
        }
        if(this.noteType.userDate4Req == "Y") {
            this.notesForm.controls["userDate4"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDate4"].setValidators([]);
        }
        if(this.noteType.userDate5Req == "Y") {
            this.notesForm.controls["userDate5"].setValidators(Validators.required);
        } else {
            this.notesForm.controls["userDate5"].setValidators([]);
        }
    }

    noteMasterSortByOrder: string = "";
    getNoteMasterBySourceAndWinId() {
        if(this.showHighPriorityNotesOnly) {
            this.noteMasterService.findHighPriorityNotesBySourceId(this.sourceId).subscribe(noteMasters => {
                for(let noteMaster of noteMasters) {
                    if(noteMaster.noteWinId == this.winId) {
                        this.noteMasters.push(noteMaster);     
                    }
                }
                this.dataGridGridOptions.api.setRowData(this.noteMasters);
                if (this.noteMasters && this.noteMasters.length > 0) {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }
			});
        } else {
            this.noteMasterService.findBySourceAndWinId(this.sourceId, this.winId).subscribe(noteMasters => {
                this.noteMasters = (noteMasters && noteMasters.length > 0) ? noteMasters : [];
                this.dataGridGridOptions.api.setRowData(this.noteMasters);
                if (this.noteMasters && this.noteMasters.length > 0) {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }
            });
        }
    }
  
    getNavWin() {
        this.navWinService.getNavWin(this.winId).subscribe((navWin: NavWin) => { 
            this.navWin = navWin;
            if(this.navWin) {
                this.notesProvContext = this.navWin.notesProvContext == "Y" ? true: false;
                this.notesGroupContext = this.navWin.notesGroupContext == "Y" ? true: false;
                this.notesMembContext = this.navWin.notesMembContext == "Y" ? true: false;
            }
        });
    }

    onListNoteMaster() {
        this.isList = true;
        this.displayForm = false;
        this.createDataGrid();
        this.editNoteMaster = false;
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData(this.noteMasters);
            if (this.noteMasters && this.noteMasters.length > 0) {
                this.dataGridGridOptions.api.selectIndex(0, false, false);
                this.populateNoteMaster();
            }
        }, 100);
    }

    onSelectNoteMaster() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.isList = false;
        if (selectedRows && selectedRows.length > 0) {
            this.displayForm = true;
            this.noteMaster = selectedRows[0];
            this.selectedType02 = this.noteMaster.noteType;
            this.noteType = this.noteMaster.noteTypeViewModel;
            this.editNoteMaster = true;
            this.populateNoteMaster();
        } else {
            this.noteMaster = null;
            this.displayForm = false;
            this.resetNoteForm();
        }

    }

    hostKeyEventChange(event: any) {  
        let S = 83;
        let O = 79;
        let M = 77;
        if ((event.key === S || event.keyCode === S) && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            this.saveNoteMaster();
        }
        if ((event.key === O || event.keyCode === O) && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            this.openNotesScreen();
        }
        if ((event.key === M || event.keyCode === M) && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            this.createNewNote();
        }
    }
    
    resetNoteForm() {
        this.notesForm.controls['consolidateNotesBy'].setValue('',{emitEvent: false});
        this.notesForm.controls['notesDates'].setValue('',{emitEvent: false});
        this.notesForm.controls['none'].setValue('',{emitEvent: false});
        this.notesForm.controls['group'].setValue('',{emitEvent: false});
        this.notesForm.controls['followUpDate'].setValue('',{emitEvent: false});
        this.notesForm.controls['member'].setValue('',{emitEvent: false});
        this.notesForm.controls['provider'].setValue('',{emitEvent: false});
        
        this.notesForm.controls['notetype'].setValue('',{emitEvent: false});
        this.notesForm.controls['priority'].setValue('',{emitEvent: false});
        this.notesForm.controls['date'].setValue('',{emitEvent: false});
        this.notesForm.controls['followupCode'].setValue('',{emitEvent: false});
        this.notesForm.controls['textArea'].setValue('',{emitEvent: false});
        this.notesForm.controls['expireDate'].setValue('',{emitEvent: false});

        this.notesForm.controls['userDefined1Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined2Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined3Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined4Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined5Label'].setValue('',{emitEvent: false});

        this.notesForm.controls['userDefined1Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined2Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined3Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined4Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined5Show'].setValue('',{emitEvent: false});

        this.notesForm.controls['userDefined1'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined2'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined3'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined4'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDefined5'].setValue('',{emitEvent: false});
        
        this.notesForm.controls['userDate1Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate2Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate3Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate4Label'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate5Label'].setValue('',{emitEvent: false});

        this.notesForm.controls['userDate1'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate2'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate3'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate4'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate5'].setValue('',{emitEvent: false});
        
        this.notesForm.controls['userDate1Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate2Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate3Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate4Show'].setValue('',{emitEvent: false});
        this.notesForm.controls['userDate5Show'].setValue('',{emitEvent: false});

        this.notesForm.controls["userDefined1"].setValidators([]);
        this.notesForm.controls["userDefined2"].setValidators([]);
        this.notesForm.controls["userDefined3"].setValidators([]);
        this.notesForm.controls["userDefined4"].setValidators([]);
        this.notesForm.controls["userDefined5"].setValidators([]);
        this.notesForm.controls["userDate1"].setValidators([]);
        this.notesForm.controls["userDate2"].setValidators([]);
        this.notesForm.controls["userDate3"].setValidators([]);
        this.notesForm.controls["userDate4"].setValidators([]);
        this.notesForm.controls["userDate5"].setValidators([]);
    }

    modalClose = () => {
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Notes')
            });
        }
        else {
            this.activeModal.close()
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveNoteMaster();
                }
                else if(resp.name === 'No') {
                    this.activeModal.close();
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'Save', shortcutKey: 'Ctrl+S' },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true },
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt+F4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    { name: 'Copy', shortcutKey: 'F7' },
                    { name: 'Paste', shortcutKey: 'F5' },
                    { name: 'Next', shortcutKey: 'F8' }
                ],
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Tile' , shortcutKey: 'Shift+Alt+T' }, { name: 'Layer', shortcutKey : 'Shift+Alt+L' }, { name: 'Cascade' , shortcutKey : 'Shift+Alt+C'}, { name: 'Arrange Icons', shortcutKey : 'Shift+Alt+I' },
                    { isHorizontal: true }, { name: 'Show Timestamp' , shortcutKey : 'Shift+Alt+S'}, { isHorizontal: true }, { name: '1 Main Menu' }, { name: '2 Member Master    High Priority Notes Exist' },
                    { name: '3 Notes' }
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
    clickedOpen: boolean = true;
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewNote();
                    break;
                }
                case 'Save': {
                    this.saveNoteMaster();
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
        }
    }

    onChangeType(event: any) {
        if(event.target.value) {
            this.selectedType02 = event.target.value;
            this.displayForm = true;
            for(let noteType of this.noteTypes) {
                if(noteType.noteType == event.target.value) {
                    this.noteType = noteType;
                    this.populateNoteMaster();
                    break;
                }
            }
        }
    }

    onChangePriority(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } 
        if (!event.target.value && event.key === 'Tab') {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp('27013: ' + message[0].messageText.replace('@1', 'priority'), 'Notes', 'OK');
                this.notesForm.controls['priority'].reset();
                event.target.focus();
            });
        }
    }

    openNotesScreen = () => {
        if(!this.isList){
            this.displayForm = true;
            this.onListNoteMaster();
        } else {
            this.displayForm = false;
            this.dataGridGridOptions.api.selectIndex(0, false, false)
            this.focusCloseBtn();
        }
    }

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
            this.notesForm.patchValue({
                'priority': response.systemCodesPrimaryKey.systemCode
            });
            this.popUpMessage = null;
        });
    }

    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        this.hostKeyEventChange(event);
    }

}

@Directive({
    selector: 'label[controlName]',
  })
  export class LabelControl {
    @Input() controlName: string;
  
    constructor(@Optional() private parent: ControlContainer) {}
  
    @HostBinding('textContent')
    get controlValue() {
      return this.parent ? this.parent.control.get(this.controlName).value : '';
    }
  }
