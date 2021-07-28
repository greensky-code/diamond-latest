/* Copyright (c) 2020 . All Rights Reserved. */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig} from "../../../shared/config";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {IdCardSetup} from "../../../api-models/id-card-setup.model";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {IdCardSetupService} from "../../../api-services/id-card-setup/id-card-setup.service";
import {CONSTANTS, getIDCardPrintShorcutKeys, SharedService} from "../../../shared/services/shared.service";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {RequiredValidator} from "../../../shared/validators/required.validator";
import {Form} from "../../../shared/helpers/form.helper";
import {Menu} from "../../../shared/models/models";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IdCardPrintSelectionComponent} from "../id-card-print-selection/id-card-print-selection.component";
import {GridOptions} from "ag-grid-community";
import {DddwDtlService, MessageMasterDtlService} from "../../../api-services";
import {HelpComponent} from "../help/help.component";
import {MessageMasterDtl} from "../../../api-models";
import {Router} from "@angular/router";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";


// Use the Component directive to define the IdCardPrintComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'idcardprint',
    templateUrl: './id-card-print.component.html',
})
export class IdCardPrintComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    idCardPrintForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public shortcuts: ShortcutInput[] = [];
    menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    @Input() showIcon: boolean = false;


    editIdCardSetup: boolean;
    idCardSetup: IdCardSetup;
    idCardSetups: IdCardSetup[];
    isFormEditMode: boolean;

    rowSelection;
    orderTypeDropdown;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    isScreenCloseRequest: boolean = false;
    formValueChangeStatus: boolean = false;

    menuOpened= ""
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    dateDisabled: boolean = false;
    effDateDisabled: boolean = false;
    thruDateDisabled: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private idCardSetupService: IdCardSetupService,
        private sharedService: SharedService,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
        private router: Router,
        private dddwDtlService: DddwDtlService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.idCardPrintForm);
        this.createContactPersonGrid();
        this.getIdCardSetups();
        this.getOrderTypeDropdowns();
    }


    ngAfterViewInit() {
        this.shortcuts.push(...getIDCardPrintShorcutKeys(this));
        this.cdr.detectChanges();
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M' },
                    { name: 'New from Template'},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save As Template', shortcutKey: 'Ctrl+A'},
                    { name: 'Run Job', shortcutKey: 'Ctrl+J'},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
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
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'}
                ]
            },
            {
                menuItem: 'Topic',
                dropdownItems: []
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Filter Cards by Group', disabled: true},
                    {name: 'Filter Cards by IPA', disabled: true},
                    {name: 'Filter Cards by  Line of Business', disabled: true},
                    {name: 'Filter Cards by Plan', disabled: true},
                    {name: 'Filter Cards by Panel', disabled: true}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift+Alt+P'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 ID Card Print'}
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
    }

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.resetIDPrint();
                    break;
                }
                case 'Open': {
                    this.openScreen();
                    break;
                }
                case 'Save As Template': {
                    this.saveForm();
                    break;
                }
                case 'Close': {
                    this.closeModal();
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'exit': {
                    this.exitScreen();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        } else if (event.menu.menuItem === 'Notes') {
            this.openNoteShortCut()
        } else if (event.menu.menuItem === 'Window') {
            this.handleWindowMenu(event.action);
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
           this.helpScreen();
        }
    }

    resetIDPrint() {
        this.idCardPrintForm.reset();
        this.idCardSetup = new IdCardSetup();
        this.isFormEditMode = false;

        let defaultOrderType = this.orderTypeDropdown.length > 0 ? this.orderTypeDropdown.find(level => level.dddwDtlPrimaryKey.displayVal === 'All') : null;
        this.idCardPrintForm.patchValue({
            'orderType': defaultOrderType ? defaultOrderType.dddwDtlPrimaryKey.dataVal : null  // set default value of level
        });
    }

    private getOrderTypeDropdowns(): void {
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.ORDER_TYPE, CONSTANTS.DW_IDPRT_SETUP_DE).subscribe(orderTypes => {
            this.orderTypeDropdown = orderTypes ? orderTypes : [];
            let defaultOrderType = this.orderTypeDropdown.length > 0 ? this.orderTypeDropdown.find(level => level.dddwDtlPrimaryKey.displayVal === 'All') : null;
            this.idCardPrintForm.patchValue({'orderType': defaultOrderType.dddwDtlPrimaryKey.dataVal});

        });
    }

    saveForm() {
        let popMsg = new PopUpMessage('ID Cards Printing', 'ID Cards Printing', 'ID Card print is a background process, not online', '', [], null, true, 'justify-content-center');
        popMsg.buttons = [new PopUpMessageButton('Print Alignment', 'Print Alignment', 'btn btn-primary'),
            new PopUpMessageButton('Print All ID Cards', 'Print All ID Cards', 'btn btn-primary'),
            new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;
        ref.componentInstance["buttonclickEvent"].subscribe((button: any) => {

            if (button.name === 'Cancel') {
                this.activeModal.close();
            } else {
                this.idCardSetup = this.getFormData();
                if (this.isFormEditMode) {
                    this.updateIdCardSetup(this.idCardSetup.idCardSetupPrimaryKey.seqIdprtId, this.idCardSetup);
                } else {
                    this.createIdCardSetup(this.idCardSetup);
                }
                this.updateGridState();
            }
        });
    }

    updateGridState() {
        if (this.isFormEditMode) {
            this.idCardSetups.forEach((card, index) => {
                if (card.idCardSetupPrimaryKey.seqIdprtId === this.idCardSetup.idCardSetupPrimaryKey.seqIdprtId) {
                    this.idCardSetups[index] = this.idCardSetup;
                }
            })
        } else {
            this.idCardSetups.push(this.idCardSetup);
        }

        this.dataGridGridOptions.api.setRowData(this.idCardSetups);
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {
            case 'Filter Cards by Group': {
                let ref = this.modalService.open(IdCardPrintSelectionComponent);
                ref.componentInstance.selectionType = 'Group';
                ref.componentInstance.showIcon = true;
                break;
            }
            case "Filter Cards by Line of Business": {
                let ref = this.modalService.open(IdCardPrintSelectionComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.selectionType = 'Line of Business';
                break;
            }
            case 'Filter Cards by IPA': {
                let ref = this.modalService.open(IdCardPrintSelectionComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.selectionType = 'IPA ID';
                break;
            }
            case "Filter Cards by Plan": {
                let ref = this.modalService.open(IdCardPrintSelectionComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.selectionType = 'Plan';
                break;
            }
            case "Filter Cards by Panel": {
                let ref = this.modalService.open(IdCardPrintSelectionComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.selectionType = 'Panel';
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
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


    createIdCardSetup(idCardSetup: IdCardSetup) {
        this.formValidation.validateForm();
        if (this.idCardPrintForm.valid) {
            this.idCardSetupService.createIdCardSetup(idCardSetup).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editIdCardSetup = false;
                if (this.isScreenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.formValueChangeStatus = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    updateIdCardSetup(seqIdprtId: number, idCardSetup: IdCardSetup) {
        this.formValidation.validateForm();
        if (this.idCardPrintForm.valid) {
            this.idCardSetupService.updateIdCardSetup(idCardSetup, seqIdprtId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editIdCardSetup = false;
                if (this.isScreenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.formValueChangeStatus = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    getFormData(): IdCardSetup {
        let idCardSetup = new IdCardSetup();

        idCardSetup.idCardSetupPrimaryKey = {jobId: ''};
        idCardSetup.idCardSetupPrimaryKey.jobId = this.idCardPrintForm.value.jobId;
        idCardSetup.requestUser = this.idCardPrintForm.value.requestUser;
        idCardSetup.requestType = this.idCardPrintForm.value.requestType;
        idCardSetup.requestDate = Form.getDatePickerValue(this.idCardPrintForm, 'requestDate');
        idCardSetup.idCardTemplate = Form.getDatePickerValue(this.idCardPrintForm, 'idCardTemplate');
        idCardSetup.orderType = this.idCardPrintForm.value.orderType;
        idCardSetup.seqNarrativeId = this.idCardPrintForm.value.narrative;
        idCardSetup.effectiveDateFrom = Form.getDatePickerValue(this.idCardPrintForm, 'effectiveDateFrom');
        idCardSetup.effectiveDateThru = Form.getDatePickerValue(this.idCardPrintForm, 'effectiveDateThrough');
        idCardSetup.status = this.idCardPrintForm.value.statusLbpos;
        idCardSetup.reprintRequest = this.idCardPrintForm.value.reprintRequest ? 'T' : 'F';
        idCardSetup.action = this.idCardPrintForm.value.action;
        idCardSetup.comments = this.idCardPrintForm.value.comments;

        return idCardSetup;
    }


    deleteIdCardSetup(seqIdprtId: number) {
        this.idCardSetupService.deleteIdCardSetup(seqIdprtId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    setIdCardSetup(idCardSetup: IdCardSetup) {
        this.idCardSetup = idCardSetup;
        this.idCardPrintForm.patchValue({
            'jobId': idCardSetup.idCardSetupPrimaryKey.jobId,
            'requestUser': idCardSetup.requestUser,
            'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(idCardSetup.requestDate),
            'idCardTemplate': idCardSetup.idCardTemplate,
            'oderType': idCardSetup.orderType,
            'requestType': idCardSetup.requestType,
            'narrative': idCardSetup.seqNarrativeId,
            'effectiveDateFrom': this.dateFormatPipe.defaultDisplayDateFormat(idCardSetup.effectiveDateFrom),
            'effectiveDateThrough': this.dateFormatPipe.defaultDisplayDateFormat(idCardSetup.effectiveDateThru),
            'group': 'All',
            'ipa': 'All',
            'lob': 'All',
            'plan': 'All',
            'panel': 'All',
            'statusLbpos': idCardSetup.status,
            'reprintRequest': idCardSetup.reprintRequest === "T",
            'action': idCardSetup.action,
            'comments': idCardSetup.comments
        }, {emitEvent: false});
        this.formDisabled();
        setTimeout(() => {
            this.isFormValidateStatus();
        }, 2000)
    }

    getIdCardSetups() {
        this.idCardSetupService.getIdCardSetups().subscribe(idCardSetups => {
            this.idCardSetups = idCardSetups;
            this.dataGridGridOptions.api.setRowData(idCardSetups);
            this.dataGridGridOptions.api.selectIndex(0, false, false)
        });
    }

    onSelectionChange($event) {

    }


// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.idCardPrintForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [Validators.required, RequiredValidator.cannotContainSpace]}],
            requestUser: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            requestDate: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            idCardTemplate: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace]
            }],
            orderType: ['', {
                updateOn: 'blur',
                validators: [Validators.required, RequiredValidator.cannotContainSpace, Validators.maxLength(1)]
            }],
            requestType: ['', {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(1)]
            }],
            narrative: ['', {updateOn: 'blur', validators: []}],
            effectiveDateFrom: ['', {updateOn: 'blur', validators: []}],
            effectiveDateThrough: ['', {updateOn: 'blur', validators: []}],
            group: ['', {updateOn: 'blur', validators: []}],
            ipa: ['', {updateOn: 'blur', validators: []}],
            lob: ['', {updateOn: 'blur', validators: []}],
            plan: ['', {updateOn: 'blur', validators: []}],
            panel: ['', {updateOn: 'blur', validators: []}],
            action: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)]}],
            status: ['', {updateOn: 'blur', validators: []}],
            radiobuttongroup2440: ['', {updateOn: 'blur', validators: []}],
            statusLbpos: ['', {updateOn: 'blur', validators: []}],
            deffered: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}],
            reprintRequest: ['', {updateOn: 'blur', validators: [Validators.maxLength(1)]}]
        }, {updateOn: 'submit'});
    }


    createContactPersonGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50,
            };

        this.dataGridGridOptions.columnDefs = [

            {
                headerName: 'Job Id',
                field: 'idCardSetupPrimaryKey.jobId',
                width: 150
            },
            {
                headerName: 'Action',
                field: 'action',
                width: 150
            },
            {
                headerName: 'Request Type',
                field: 'requestType',
                width: 150
            },
            {
                headerName: 'Status',
                field: 'status',
                width: 150,
                headerClass: 'clr-blue'
            }
        ];

        this.rowSelection = 'single';

    }


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/IDPRT_ID_Card_Print.htm';
        viewModal.componentInstance.showIcon = true;
    }

    closeModal = () => {
        this.isScreenCloseRequest = true;
        if (this.formValueChangeStatus === true) {
            this.messageService
                .findByMessageId(29065)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopupAlert(message[0].messageText, 'Group Panel');
                });
        } else {
            this.activeModal.close();
        }
    };

    showPopupAlert(message: any, title: any) {
        let popUpMessage = new PopUpMessage(
            "popUpMessageName",
            title,
            message,
            "icon"
        );
        popUpMessage.buttons.push(
            new PopUpMessageButton("Yes", "Yes", "")
        );
        popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
        popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === "Yes") {
                this.saveForm();
            } else if (resp.name === "No") {
                this.activeModal.close();
            } else if (resp.name === "Cancel") {

            }
        });
    };

    isFormValidateStatus = () => {
        this.idCardPrintForm.valueChanges.subscribe(() => {
            this.formValueChangeStatus = true;
        })
    };

    GridOneSelection = () => {
        this.isFormEditMode = true;
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.setIdCardSetup(selectedRows[0])
    }

    openScreen() {
        if (this.formValueChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'ID Card Print', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveForm();
                            setTimeout(() => {
                                this.resetScreen();
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.resetScreen();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.resetScreen();
        }
    };

    resetScreen() {
        this.getIdCardSetups();
    };

    exitScreen = () => {
        this.messageService.findByMessageId(29062).subscribe(res => {
            let popMsg = new PopUpMessage(
                'poUpMessageName',
                'DIAMOND @ Client/Server System',
                res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
                'icon');
            popMsg.buttons = [
                new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
                new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    openNoteShortCut() {
        this.toastService.showToast('Action was not implemented', NgbToastType.Danger)
    };

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }
    openSpecialMenu() {
        document.getElementById('fileDropdownSpecial').dispatchEvent(new MouseEvent('click'));
        this.menuOpened = 'fileDropdownSpecial'
    }
    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    triggerMenus(value) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownFile") {
                switch (value) {
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'New'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Open'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Save As Template'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'j':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Run Job'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Close'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Exit'
                        }
                        this.onMenuItemClick(obj)
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownTopic") {
                this.onMenuItemClick(obj)
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Filter Cards by Group'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'i':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Filter Cards by IPA'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Filter Cards by Line of Business'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Filter Cards by Plan'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'n':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Filter Cards by Panel'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownWindow") {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Processing Messages'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == 'fileDropdownHelp') {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Contents'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Search for Help on...'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'This Window'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Glossary'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Getting Started'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'h':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'How to use Help'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'About Diamond Client/Server'
                        }
                        this.onMenuItemClick(obj);
                        break;
                }
            }
        }
    };

    handleTopicMenu(event){
        this.toastService.showToast('Action was not implemented', NgbToastType.Danger)
    };

    handleWindowMenu(event) {
        switch (event) {
            case 'Show Timestamp': {
                if (this.idCardPrintForm.get('jobId').value) {
                    this.showTimestamp();
                } else {
                    this.messageService.findByMessageId(21127).subscribe(res => {
                        this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                    })
                }
                break;
            }
            case 'Processing Messages': {
                this.toastService.showToast('Action was not implemented', NgbToastType.Danger);
                break;
            }
        }
    };

    showTimestamp() {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "ID Card Print";
        ref.componentInstance.insertDateTime = this.idCardSetup['insertDatetimeDisplay'];
        ref.componentInstance.insertProcess = this.idCardSetup['insertProcess'];
        ref.componentInstance.insertUser = this.idCardSetup['insertUser'];
        ref.componentInstance.updateUser = this.idCardSetup['updateUser'];
        ref.componentInstance.updateDateTime = this.idCardSetup['updateDatetimeDisplay'];
        ref.componentInstance.updateProcess = this.idCardSetup['updateProcess'];
    };

    formDisabled() {
        this.idCardPrintForm.get('jobId').disable();
        this.idCardPrintForm.get('requestUser').disable();
        this.dateDisabled = true;
        this.idCardPrintForm.get('orderType').disable();
        this.idCardPrintForm.get('narrative').disable();
        this.effDateDisabled = true;
        this.thruDateDisabled = true;
        this.idCardPrintForm.get('group').disable();
        this.idCardPrintForm.get('ipa').disable();
        this.idCardPrintForm.get('lob').disable();
        this.idCardPrintForm.get('plan').disable();
        this.idCardPrintForm.get('panel').disable();
    }
}
