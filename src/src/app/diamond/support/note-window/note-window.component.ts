/* Copyright (c) 2020 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    MessageMasterDtl,
    NavWin,
    NoteType,
    NoteWin,
    NoteWinLink,
    SecUser,
    SecWin,
    SecWinDescr
} from "../../../api-models"
import {NoteWinLinkService} from "../../../api-services/notes/note-win-link.service"
import {NoteWinService} from "../../../api-services/notes/note-win.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {UntilDestroy} from '@ngneat/until-destroy';
import {CONSTANTS, getNoteWindowShortcutKeys} from '../../../shared/services/shared.service';
import {
    NOTE_WIN_Fields,
    NOTE_WIN_LINK_Fields,
    NoteWinFormConfig,
    NoteWinLinkFormConfig
} from "../../../shared/models/constants";
import {DynamicConfigFormRow, FormField, FormRow, Menu, Option} from "../../../shared/models/models";
import {NgbToastType} from "ngb-toast";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {AuditDisplayComponent} from "../../../shared/components/audit-display/audit-display.component";
import {ToastService} from "../../../shared/services/toast.service";
import {Router} from "@angular/router";
import {
    DddwDtlService,
    MessageMasterDtlService,
    NavWinService,
    SecUserService,
    SecWinDescrService
} from "../../../api-services";
import {FunctionalLevelSecurityService} from "../../../api-services/security/functional-level-security.service";
import {NoteTypeService} from "../../../api-services/notes/note-type.service";
import {SupportHelpComponent} from "../support-help/support-help.component";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {MenuResponse} from "../../../api-models/menu-response";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {MenuService} from "../../../shared/services/menu.service";

// Use the Component directive to define the NoteWindowComponent as an Angular component
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

    selector: 'notewindow',
    templateUrl: './note-window.component.html',

})
export class NoteWindowComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon: boolean;
    @Input() winId: string;
    noteWindowForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    windowID = 'NOTEW';
    secWin: SecWinViewModel;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;


    editNoteWinLink: boolean;
    noteWinLink: NoteWinLink;
    noteWinLinks: NoteWinLink[];
    editNoteWin: boolean;
    noteWin: NoteWin;
    noteWins: NoteWin[];
    isSuperUser = false;

    resetInlineGrid2 = false;
    grid2Config = NoteWinFormConfig;
    grid4Config = NoteWinLinkFormConfig;

    public dataGrid001GridOptions: GridOptions;

    public dataGrid003GridOptions: GridOptions;
    public dataGrid004GridOptions: GridOptions;
    keyNames: any;
    keyValues: any;
    searchStatus: any;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    noteTypes = new Array<NoteType>();
    noteTypesByWins: any;
    isSaveForm: any = false;
    inProgress = true;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    windowId = 'NOTEW';
    secProgress = true;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private noteWinLinkService: NoteWinLinkService,
        private noteWinService: NoteWinService,
        private cdr: ChangeDetectorRef,
        public activeModal: NgbActiveModal,
        private modalService: NgbModal,
        private toastService: ToastService,
        private router: Router,
        private messageService: MessageMasterDtlService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private dddwDtlService: DddwDtlService,
        private noteTypeService: NoteTypeService,
        private secWinDescrService: SecWinDescrService,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private secWinService: SecWinService,
        private menuSerrvice: MenuService,
        private navWinService: NavWinService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.noteWindowForm);
        this.createDataGrid001();
        this.createDataGrid003();
        this.createDataGrid004();
        this.hasPermission();

    }

    linkWindowContextValues: any[] = [];
    secWinDescrs = new Array<SecWinDescr>();
    winIds: any[] = [];



    getContextDropdownValues() {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.LINK_CONTEXT, CONSTANTS.DW_NOTEW_LINK_DE).subscribe((values) => {
            this.linkWindowContextValues = values;
        });
    }

    /**
     *get winId dropdowns
     */
    getSecWinDescrsWith_NotesCNameNotNull() {
        this.secWinDescrService.getSecWinDescrsWith_NotesCNameNotNull().subscribe((values: SecWinDescr[]) => {
            values.sort((a, b) => {
                return a.secWinDescrPrimaryKey.winId > b.secWinDescrPrimaryKey.winId ? 1 : -1
            });
            this.secWinDescrs = values;
            this.secWinDescrs.forEach(secwinDesc => {
                if (secwinDesc.secWinDescrPrimaryKey.winId && secwinDesc.secWinDescrPrimaryKey.winId.trim().length === 5) {
                    this.winIds.push({
                        key: secwinDesc.secWinDescrPrimaryKey.winId + " - " + secwinDesc.sdescr,
                        value: secwinDesc.secWinDescrPrimaryKey.winId
                    })
                }
            });
        });
    }


    showPopUp(message: string, title: string) {
        if (!message) return;

        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary'),];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    getNoteWins(isReset = false) {
        this.noteWinService.getNoteWins().subscribe((noteWins: NoteWin[]) => {
            noteWins.sort((a, b) => {
                return a.noteWinPrimaryKey.winId > b.noteWinPrimaryKey.winId ? 1 : -1
            });
            noteWins.sort((a, b) => {
                if (a.noteWinPrimaryKey.winId === b.noteWinPrimaryKey.winId) {
                    return a.noteWinPrimaryKey.noteType > b.noteWinPrimaryKey.noteType ? 1 : -1;
                }
            });

            this.noteWins = noteWins;
            let data = [];
            let uniq = {};
            for (let item of noteWins) {
                data.push(item.noteWinPrimaryKey);
            }

            this.noteTypesByWins = data.filter(obj => !uniq[obj.winId] && (uniq[obj.winId] = true));
            if (noteWins && noteWins.length > 0) {
                this.dataGrid001GridOptions.api.setRowData(noteWins);
                this.dataGrid001GridOptions.api.selectIndex(0, false, false);
                this.noteWin = noteWins[0];
                if (isReset) this.resetGrid2Form();
            }
        });
    }

    getNoteTypes() {
        this.noteTypeService.getNoteTypes().subscribe((values: NoteType[]) => {
            this.noteTypes = values;
        })
    }

    /**
     * On Grid1 Row selecte
     * @param event.data: NoteWin
     */


     onGrid1Ready(event:any) {
        this.dataGrid001GridOptions.api.addEventListener('filterChanged', (event:any) => {
            this.isRow1Select = true;
            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
            let selectedRow = this.dataGrid001GridOptions.api.getSelectedRows();
            if(selectedRow.length > 0) {
                this.noteWin = selectedRow[0];
                // this.resetGrid2Form();
            }
        });
    }

    isRow1Select: boolean = true;
    grid1RowSelected(event:any) {
        this.isRow1Select = true;
        this.resetGrid2Form();
        this.editNoteWin = false;
        this.noteWin = event.data;
        this.dataGrid001GridOptions.api.selectIndex(event.rowIndex, false, false);
        if(this.noteWin) {
            this.dataGrid003GridOptions.api.setRowData([]);
            this.dataGrid003GridOptions.api.showLoadingOverlay();
            this.getNoteWinLinkByWinIdAndNoteType(this.noteWin.noteWinPrimaryKey.winId, this.noteWin.noteWinPrimaryKey.noteType);
        }
    }

    onGrid1SelectionChange(event:any) {
        if(this.isRow1Select) {
            this.isRow1Select = false;
            return;
        }
        let data: any = null;
        let rowIndex: any = 0;
        let selectedRows : any[] = this.dataGrid001GridOptions.api.getSelectedRows();
        let selectedNodes =  this.dataGrid001GridOptions.api.getSelectedNodes();
        if(selectedRows.length > 0) {
            data = selectedRows[0];
        } else {
            return;
        }
        if(selectedNodes.length > 0) {
            rowIndex = selectedNodes[0].rowIndex;
        }
        this.resetGrid2Form();
        this.editNoteWin = false;
        this.noteWin = data;
        this.dataGrid001GridOptions.api.selectIndex(rowIndex, false, false);
        if(this.noteWin) {
            this.dataGrid003GridOptions.api.setRowData([]);
            this.dataGrid003GridOptions.api.showLoadingOverlay();
            this.getNoteWinLinkByWinIdAndNoteType(this.noteWin.noteWinPrimaryKey.winId, this.noteWin.noteWinPrimaryKey.noteType);
        }
    }

    /**
     * On Grid1 Row selecte
     * @param event.data: NoteWin
     */


    grid3RowSelected(event:any) {
        this.isRow3Select = true;
        this.editNoteWinLink = true;
        this.noteWinLink = event.data;
        this.resetGrid4Form();
        this.dataGrid003GridOptions.api.selectIndex(event.rowIndex, false, false);
    }

    isRow3Select: boolean = true;
    onGrid3SelectionChange(event:any) {
        if(this.isRow3Select) {
            this.isRow3Select = false;
            return;
        }
        let data: any = null;
        let rowIndex: any = 0;
        let selectedRows : any[] = this.dataGrid003GridOptions.api.getSelectedRows();
        let selectedNodes =  this.dataGrid003GridOptions.api.getSelectedNodes();
        if(selectedRows.length > 0) {
            data = selectedRows[0];
        }
        if(selectedNodes.length > 0) {
            rowIndex = selectedNodes[0].rowIndex;
        }
        this.editNoteWinLink = true;
        this.noteWinLink = data;
        this.resetGrid4Form();
        this.dataGrid003GridOptions.api.selectIndex(rowIndex, false, false);
    }

    onGrid2Ready(event:any) {
        this.dataGrid003GridOptions.api.addEventListener('filterChanged', (event:any) => {
            this.isRow3Select = true;
            this.dataGrid003GridOptions.api.selectIndex(0, false, false);
            let selectedRow = this.dataGrid003GridOptions.api.getSelectedRows();
            if(selectedRow.length > 0) {
                this.noteWinLink = selectedRow[0];
                this.resetGrid4Form();
            }
        });
    }

    resetGrid2Form(isNewRowAdded = false) {
        this.editNoteWin = false;
        this.resetInlineGrid2 = true;
        this.resetInlineGrid2 = JSON.parse(JSON.stringify(this.resetInlineGrid2));
        if(isNewRowAdded) this.dataGrid001GridOptions.api.deselectAll();
        this.grid2FormState = [];
        setTimeout(() => {
            this.resetInlineGrid2 = false;
            this.populateGrid2FormValues(isNewRowAdded);
            this.dataGrid003GridOptions.api.setRowData([]);
            this.resetInlineGrid4 = true;
            this.editNoteWinLink = false;
            this.grid4FormState = [];
        }, 200);
    }

    resetInlineGrid4 = false;

    resetGrid4Form(isNewRowAdded = false) {
        this.editNoteWinLink = false;
        this.resetInlineGrid4 = true;
        this.resetInlineGrid4 = JSON.parse(JSON.stringify(this.resetInlineGrid4));
        this.grid4FormState = [];
        setTimeout(() => {
            this.resetInlineGrid4 = false;
            this.populateGrid4FormValues(isNewRowAdded);
        }, 100);

    }

    getConfigCopy(config:any): FormField[] {
        return JSON.parse(JSON.stringify(config));
    }

    grid2FormState = new Array<DynamicConfigFormRow>();
    grid4FormState = new Array<DynamicConfigFormRow>();

    populateGrid2FormValues(isNew = false) {
        if (!this.noteWin) {
            return;
        }

        let mockConfig = this.getConfigCopy(this.grid2Config);    // make a copy of original config

        mockConfig.forEach((field, index) => {
            if (mockConfig[index].name === NOTE_WIN_Fields.WIN_ID) {
                if (!isNew) {
                    mockConfig[index].value = this.noteWin.noteWinPrimaryKey.winId;
                    mockConfig[index].type = 'text';
                    mockConfig[index].disabled = true;
                } else {
                    mockConfig[index].type = 'select';
                    mockConfig[index].disabled = false;
                    mockConfig[index].options = this.winIds;
                }

            } else if (mockConfig[index].name === NOTE_WIN_Fields.NOTE_TYPE) {
                if (!isNew) {
                    mockConfig[index].value = this.noteWin.noteWinPrimaryKey.noteType;
                    mockConfig[index].type = 'text';
                    mockConfig[index].disabled = true;
                } else {
                    let options = new Array<Option>();
                    this.noteTypes.sort(function(a, b){
                        if(a.noteType < b.noteType) { return -1; }
                        if(a.noteType > b.noteType) { return 1; }
                        return 0;
                    })
                    this.noteTypes.forEach(noteType => {
                        options.push({
                            key: noteType.noteType +' - '+ noteType.description,
                            value: noteType.noteType
                        })
                    });

                    mockConfig[index].type = 'select';
                    mockConfig[index].disabled = false;
                    mockConfig[index].options = options;
                }
            }
        });

        let formState: DynamicConfigFormRow = new DynamicConfigFormRow();
        formState.formFields = mockConfig;
        formState.action = null;
        formState.id = {
            noteWin: this.noteWin
        };

        this.grid2FormState = [];
        this.grid2FormState.push(formState);          // add record

        this.grid2FormState = JSON.parse(JSON.stringify(this.grid2FormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    /**
     * Add grid 4 values
     * @param isNew
     */
    populateGrid4FormValues(isNew = false) {
        if (!this.noteWinLink) {
            return;
        }

        let mockConfig = this.getConfigCopy(this.grid4Config);    // make a copy of original config
        mockConfig.forEach((field, index) => {
            if (mockConfig[index].name === NOTE_WIN_LINK_Fields.LINK_WINDOW) {
                if (!isNew) {
                    mockConfig[index].value = this.noteWinLink.noteWinLinkPrimaryKey.linkWinId;
                    mockConfig[index].type = 'text';
                    mockConfig[index].disabled = true;
                } else {
                    mockConfig[index].type = 'select';
                    mockConfig[index].disabled = false;
                    mockConfig[index].options = this.winIds;
                }

            } else if (mockConfig[index].name === NOTE_WIN_LINK_Fields.LINK_CONTEXT) {

                let options = new Array<Option>();

                this.linkWindowContextValues.forEach(value => {
                    options.push({
                        key: value.dddwDtlPrimaryKey.displayVal,
                        value: value.dddwDtlPrimaryKey.dataVal
                    });
                });
                if (!isNew) {
                    mockConfig[index].value = this.noteWinLink.linkContext;
                }
                mockConfig[index].type = 'select';
                mockConfig[index].disabled = false;
                mockConfig[index].options = options;
            }
        });

        let formState: DynamicConfigFormRow = new DynamicConfigFormRow();
        formState.formFields = mockConfig;
        formState.action = null;
        formState.id = {
            noteWin: this.noteWinLink
        };

        this.grid4FormState.push(formState);          // add record

        this.grid4FormState = JSON.parse(JSON.stringify(this.grid4FormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.isFormDataModified()
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

    createNoteWinLink(noteWinLink:any) {
        this.formValidation.validateForm();
        if (this.noteWindowForm.valid) {
            this.noteWinLinkService.createNoteWinLink(noteWinLink).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editNoteWinLink = true;
                this.getNoteWinLinkByWinIdAndNoteType(this.noteWin.noteWinPrimaryKey.winId, this.noteWin.noteWinPrimaryKey.noteType);
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateNoteWinLink(noteWinLink: NoteWinLink) {
        noteWinLink.languageId=0;
        this.formValidation.validateForm();

        if (this.noteWindowForm.valid) {
            this.noteWinLinkService.updateNoteWinLink(noteWinLink, noteWinLink.noteWinLinkPrimaryKey.linkWinId, noteWinLink.noteWinLinkPrimaryKey.noteType, noteWinLink.noteWinLinkPrimaryKey.winId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editNoteWinLink = true;
                this.isSaveForm = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveNoteWinLink(noteWinLink: NoteWinLink) {
        if (this.editNoteWinLink) {
            if (this.isSuperUser) {
                this.updateNoteWinLink(noteWinLink)
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.updateNoteWinLink(noteWinLink)
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Note Window')
                    });
                }
            }
        } else {
            if (this.isSuperUser) {
                this.createNoteWinLink(noteWinLink);
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.createNoteWinLink(noteWinLink);
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Note Window')
                    });
                }
            }
        }
    }

    deleteNoteWinLink(winId: string) {
        this.noteWinLinkService.deleteNoteWinLink(winId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getNoteWinLinkByWinIdAndNoteType(winId: string, noteType: string) {
        this.noteWinLinkService.getNoteWinLinkByWinIdAndNoteType(winId, noteType).subscribe(respone => {
            this.noteWinLinks = respone;
            if (this.noteWinLinks && this.noteWinLinks.length > 0) {
                this.isRow3Select = true;
                this.editNoteWinLink = true;
                this.dataGrid003GridOptions.api.setRowData(this.noteWinLinks);
                this.dataGrid003GridOptions.api.selectIndex(0, false, false);
                this.noteWinLink = this.noteWinLinks[0];
                this.resetGrid4Form();
            } else {
                this.dataGrid003GridOptions.api.setRowData([]);
                this.resetInlineGrid4 = true;
                this.editNoteWinLink = false;
                this.noteWinLink = new NoteWinLink();
                this.noteWinLink.noteWinLinkPrimaryKey =  { linkWinId: null,noteType: noteType,winId: winId };
                this.noteWinLink.languageId = 0;
                this.grid4FormState = [];
            }
        });
    }

    getNoteWinLinks() {
        this.noteWinLinkService.getNoteWinLinks().subscribe((noteWinLinks: any[]) => {
            this.noteWinLinks = noteWinLinks;

            if (noteWinLinks && noteWinLinks.length > 0) {
                let filteredData = [];
                for (let item of noteWinLinks) {
                    if (item.noteWinLinkPrimaryKey.winId === this.noteWin.noteWinPrimaryKey.winId && item.noteWinLinkPrimaryKey.noteType === this.noteWin.noteWinPrimaryKey.noteType) {
                        filteredData.push(item)
                    }
                }
                this.dataGrid003GridOptions.api.setRowData(filteredData);
                this.dataGrid003GridOptions.api.selectIndex(0, false, false);
                this.noteWinLink = noteWinLinks[0];
                this.resetGrid4Form();
            }
        });
    }

    createNoteWin(noteWin: NoteWin) {
        this.formValidation.validateForm();
        if (this.noteWindowForm.valid) {
            noteWin.languageId = 0;
            this.noteWinService.createNoteWin(noteWin).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editNoteWin = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
                this.dataGrid001GridOptions.api.showLoadingOverlay();
                this.getNoteWins();
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateNoteWin(winId: string) {
        this.formValidation.validateForm();
        if (this.noteWindowForm.valid) {
            let noteWin = new NoteWin();
            this.noteWinService.updateNoteWin(noteWin, winId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editNoteWin = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    saveNoteWin() {
        if (this.editNoteWin) {
            this.updateNoteWin(this.noteWin.noteWinPrimaryKey.winId)
        } else {
            this.createNoteWin(this.noteWin);
        }
    }

    deleteNoteWin(winId: string) {
        this.noteWinService.deleteNoteWin(winId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getNoteWin(winId: string) {
        this.noteWinService.getNoteWin(winId).subscribe(noteWin => {
            this.noteWin = noteWin;
            this.noteWindowForm.patchValue({});
        });
    }


    /**
     * Link Win Id to Note Type
     * @param event
     */
    saveGrid2NoteWin(event:any) {
        this.grid2FormState = event.formState;
        event = event.fields;

        let noteWin: NoteWin = new NoteWin();
        if (this.grid2FormState.length > 0) {

            this.grid2FormState.forEach((preStateRecord: FormRow, index) => {
                let updatedRecord = event[index];
                const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                noteWin.noteWinPrimaryKey = {
                    winId: pair[0].value,
                    noteType: pair[1].value
                }
            });
        }
        // ----------------------------- api values -----------------------------------------
        this.noteWin = noteWin;
        const index = this.noteWins.findIndex(value => value.noteWinPrimaryKey.winId == noteWin.noteWinPrimaryKey.winId
            && value.noteWinPrimaryKey.noteType == noteWin.noteWinPrimaryKey.noteType);
        if (index > 0) {
            if (!this.grid2ValueAlreadyExistMessage) {
                this.messageService.findByMessageId(27109).subscribe((message: MessageMasterDtl[]) => {
                    this.grid2ValueAlreadyExistMessage = message[0].messageText;
                    this.showPopUp(`27109: ${this.grid2ValueAlreadyExistMessage}`, 'Note Window ');
                });
            } else {
                this.showPopUp(`27109: ${this.grid2ValueAlreadyExistMessage}`, 'Note Window ');
            }

            return;
        }

        this.createNoteWin(noteWin);

    }

    grid2ValueAlreadyExistMessage:any = null;

    /**
     * Link Win Id to Note Type
     * @param event
     */
    saveGrid4NoteWinLink(event:any) {
        this.grid4FormState = event.formState;
        event = event.fields;


        let noteWinLink: NoteWinLink = Object.assign(new NoteWinLink(), this.noteWinLink);
        if (this.grid4FormState.length > 0) {
            this.grid4FormState.forEach((preStateRecord: FormRow, index) => {
                let updatedRecord = event[index];
                const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                noteWinLink.linkContext = pair[1].value;
                noteWinLink.languageId = 0;
                noteWinLink.noteWinLinkPrimaryKey = {
                    linkWinId: pair[0].value,
                    noteType: this.noteWinLink.noteWinLinkPrimaryKey.noteType,
                    winId: this.noteWinLink.noteWinLinkPrimaryKey.winId
                }
            });
        }
        this.noteWinLink.linkContext = noteWinLink.linkContext;
        this.noteWinLink.noteWinLinkPrimaryKey.linkWinId = noteWinLink.noteWinLinkPrimaryKey.linkWinId;


        // Auto Comment Message.StringParm = "These two windows cannot be linked together.  Please delete this link record.  "

        this.navWinService.getNavWin(this.noteWinLink.noteWinLinkPrimaryKey.winId).subscribe((navWin: NavWin) => {

            this.navWinService.getNavWin(this.noteWinLink.noteWinLinkPrimaryKey.linkWinId).subscribe((navWinLink: NavWin) => {

                // ------------------------------------------------------- 1st Validation on link window------------------

                if ((navWin.notesMembContext == 'Y' && navWinLink.notesMembContext == 'Y') && (navWin.notesGroupContext == 'Y' && navWinLink.notesGroupContext == 'Y')
                    && (navWin.notesProvContext == 'Y' && navWinLink.notesProvContext == 'Y')) {

                    if (!this.grid4DeleteLinkRecordMessage) {
                        this.messageService.findByMessageId(27111).subscribe((message: MessageMasterDtl[]) => {
                            this.grid4DeleteLinkRecordMessage = message[0].messageText;
                            this.showPopUp(`27111: ${this.grid4DeleteLinkRecordMessage}`, 'Note Window ');
                        });
                        return;
                    } else {
                        this.showPopUp(`27111: ${this.grid4DeleteLinkRecordMessage}`, 'Note Window ');
                        return;
                    }
                }

                // ------------------------------------------------------- 2nd Validation on link context------------------

                if (noteWinLink.linkContext == 'M') {
                    if (navWin.notesMembContext == 'Y' && navWinLink.notesMembContext == 'Y') {
                        // ----------------Display Error -----------------
                        if (!this.grid4LinkContextMessage27112) {
                            this.messageService.findByMessageId(27112).subscribe((message: MessageMasterDtl[]) => {
                                this.grid4LinkContextMessage27112 = message[0].messageText;
                                this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                            });
                        } else {
                            this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                        }
                        // ----------------Display Error  end -----------------
                        return;

                    }
                } else if (noteWinLink.linkContext == 'G') {
                    if (navWin.notesGroupContext == 'Y' && navWinLink.notesGroupContext == 'Y') {
                        // ----------------Display Error -----------------
                        if (!this.grid4LinkContextMessage27112) {
                            this.messageService.findByMessageId(27112).subscribe((message: MessageMasterDtl[]) => {
                                this.grid4LinkContextMessage27112 = message[0].messageText;
                                this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                            });
                        } else {
                            this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                        }
                        // ----------------Display Error  end -----------------
                        return;

                    }
                } else if (noteWinLink.linkContext == 'P') {
                    if (navWin.notesProvContext == 'Y' && navWinLink.notesProvContext == 'Y') {
                        // ----------------Display Error -----------------
                        if (!this.grid4LinkContextMessage27112) {
                            this.messageService.findByMessageId(27112).subscribe((message: MessageMasterDtl[]) => {
                                this.grid4LinkContextMessage27112 = message[0].messageText;
                                this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                            });
                        } else {
                            this.showPopUp(`27112: ${this.grid4LinkContextMessage27112}`, 'Note Window ');
                        }
                        // ----------------Display Error  end -----------------
                        return;

                    }
                }

                /**
                 * After validations success create/update new win link
                 */
                this.saveNoteWinLink(noteWinLink);

            });

        });


    }

    grid4ValueAlreadyExistMessage:any = null;
    grid4DeleteLinkRecordMessage:any = null;
    grid4LinkContextMessage27112:any = null;

    onGrid2NewRowAdded(event:any) {
        this.resetGrid2Form(true);
    }

    onGrid4NewRowAdded(event:any) {
        this.resetGrid4Form(true);
    }


    createDataGrid001(): void {
        this.dataGrid001GridOptions =
            {
                paginationPageSize: 50,
                defaultColDef: {
                    filter: true, sortable: true, floatingFilter: true
                }
            };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: "Window",
                field: "noteWinPrimaryKey.winId",
                width: 400,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Note Type",
                field: "noteWinPrimaryKey.noteType",
                width: 400
            }
        ];
    }

    createDataGrid003(): void {
        this.dataGrid003GridOptions =
            {
                paginationPageSize: 50,
                defaultColDef: {
                    filter: true, sortable: true, floatingFilter: true
                }
            };
        this.dataGrid003GridOptions.editType = 'fullRow';
        this.dataGrid003GridOptions.columnDefs = [
            {
                headerName: "From Window",
                field: 'noteWinLinkPrimaryKey.winId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Note Type",
                field: 'noteWinLinkPrimaryKey.noteType',
                width: 200
            },
            {
                headerName: "Link To Window",
                field: 'noteWinLinkPrimaryKey.linkWinId',
                width: 200
            },
            {
                headerName: "(M)ember, (P)rovider, (G)roup or (V)endor",
                field: 'linkContext',
                width: 300
            }
        ];
    }

    createDataGrid004(): void {
        this.dataGrid004GridOptions =
            {
                paginationPageSize: 50
            };
            this.dataGrid004GridOptions.editType = 'fullRow';
            this.dataGrid004GridOptions.columnDefs = [
            {
                headerName: "Link Window",
                field: 'noteWinLinkPrimaryKey.linkWinId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Link context",
                field: "linkcontext",
                width: 200
            }
        ];
    }




    ngAfterViewInit(): void {
        this.shortcuts.push(...getNoteWindowShortcutKeys(this));
        this.cdr.detectChanges();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.noteWindowForm = this.formBuilder.group({}, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    public menu: Menu[] = [];

    private menuInit() {
        this.menu = [
            {
                menuItem: "File",
                dropdownItems: [
                    {name: "New", shortcutKey: "Ctrl+M"},
                    { name: "Open", shortcutKey: "Ctrl+O" },
                    { name: "Save", shortcutKey: "Ctrl+S"},
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
                    { name: "Paste", shortcutKey: "Ctrl+V" }
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Zip Code" },
                    { name: '3 Note Window'}
                ],
            },
            {
                menuItem: "Help",
                dropdownItems: [
                    { name: "Contents" },
                    { name: "Search for Help on..." },
                    { name: "This Window", shortcutKey: "F1" },
                    { isHorizontal: true },
                    { name: "Glossary" },
                    { name: "Getting Started" },
                    { name: "How to use Help" },
                    { isHorizontal: true },
                    { name: "About Diamond Client/Server" },
                ],
            },
        ];
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event:any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewRecord()
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.isSaveForm = true;
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
                case 'Audit Display': {
                    //  TODO implement Audit Display
                    if (this.searchStatus) {
                        let status = this.functionalLevelSecurityService.isFunctionIdExist(CONSTANTS.F_AUDIT, this.windowID);
                        if (status) {
                            let ref = this.modalService.open(AuditDisplayComponent, {size: 'lg'});
                            ref.componentInstance.keyNames = this.keyNames;
                            ref.componentInstance.keyValues = this.keyValues;
                            ref.componentInstance.winID = this.windowID;
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error('11073: ' + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(30164).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error('30164: ' + message[0].messageText);
                        });
                    }

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

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Note Window')
            })
        } else {
            this.activeModal.close();
        }
    }

    popupAlert = (message: string, title: string) => {
        try{
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
                    this.isSaveForm = true;
                }
                else if(resp.name === 'No') {
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
        this.noteWindowForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    onChangeFields(event : any) {
        this.isFormDataChangeStatus = true;
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/NOTEW_Note_Window.htm';
    };

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
            this.userTemplateId = user.dfltTemplate
            this.getSecWin(user.dfltTemplate);
        });
    };

    initializeComponentState() {
        this.menuInit();
        this.getNoteWins(true);
        this.getNoteTypes();
        this.getNoteWinLinks();
        this.getSecWinDescrsWith_NotesCNameNotNull();
        this.getContextDropdownValues();
    };

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('BENEFIT_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    };

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);

                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
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
                    this.secProgress = false;
                    this.showPopUp(
                        'You are not Permitted to view Note Window',
                        'Note Window Permission'
                    );
                }
            }
        );
    };

    disableMenu() {
        if (this.userTemplateId == "UT_VIEW") {
            this.menu[0]["dropdownItems"][0].disabled = true;
            this.menu[0]["dropdownItems"][2].disabled = true;
        }
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

    createNewRecord() {
        if (this.isSuperUser) {
            this.resetGrid2Form(true);
        } else {
            if (this.secWin.hasUpdatePermission()) {
                this.resetGrid2Form(true);
            } else {
                this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Note Window')
                });
            }
        }

    }
}
