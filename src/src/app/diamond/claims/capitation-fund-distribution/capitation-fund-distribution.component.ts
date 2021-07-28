/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from "../../../shared/services/security.service";
import {SecUserService} from "../../../api-services/security/sec-user.service";
import {DddwDtl, MessageMasterDtl, SecUser, SecWin} from "../../../api-models";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {DddwDtlService, MessageMasterDtlService} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {Menu} from "../../../shared/models/models";
import {FunctionalGroupShortCutComponent} from "../../main-menu/functional-group-shortcut/functional-group-shortcut.component";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import {ClaimsHelpComponent} from "../claims-help/claims-help.component";
import {ShortcutInput} from "ng-keyboard-shortcuts";
import {
    getCapitationFundDistributionShortcutKeys,
    getClaimDetailAuthProcLinkShortcutKeys
} from "../../../shared/services/shared.service";

// Use the Component directive to define the CapitationFundDistributionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'capitationfunddistribution',
    templateUrl: './capitation-fund-distribution.component.html',

})
export class CapitationFundDistributionComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    capitationFundDistributionForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'CFDST';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: any;
    actions: DddwDtl[] = [];
    editPmbSetup: boolean;
    secColDetails = new Array<SecColDetail>();
    closeStatus: Boolean = false;
    popupClose: Boolean = false;
    @Input() showIcon = false;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
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


    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Job ID",
                field: "",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Status",
                field: "",
                width: 200
            },
            {
                headerName: "Model ID",
                field: "",
                width: 200
            },
            {
                headerName: "Cap Month",
                field: "",
                width: 200
            },
            {
                headerName: "Comments",
                field: "",
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
        private dddwDtlService: DddwDtlService,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
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

    private initializeComponentState(): void {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.capitationFundDistributionForm);
        this.createDataGrid();
        this.dddwDtlService.findByColumnNameAndDwname('action', 'dw_gpbil_picklist').subscribe(dddwDtls => {
            this.actions = dddwDtls;
        });
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.capitationFundDistributionForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: []}],
            requestUser: ['', {updateOn: 'blur', validators: []}],
            requestDate: ['', {updateOn: 'blur', validators: []}],
            modelId: ['', {updateOn: 'blur', validators: []}],
            capMonth: ['', {updateOn: 'blur', validators: []}],
            allocation: ['', {updateOn: 'blur', validators: []}],
            fromDate: ['', {updateOn: 'blur', validators: []}],
            nextAction: ['', {updateOn: 'blur', validators: []}],
            status: ['', {updateOn: 'blur', validators: []}],
            requestType: ['', {updateOn: 'blur', validators: []}],
            comments: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            },
            (error) => {
                this.secProgress = false;
            });
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.capitationFundDistributionForm.dirty && this.popupClose) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
            })
        } else {
            this.activeModal.close()
        }
    };

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl + N'},
                    {name: 'New from Template'},
                    {name: 'Open', shortcutKey: 'Ctrl + O'},
                    {name: 'Save As Template', shortcutKey: 'Ctrl + A'},
                    {name: 'Run Job', shortcutKey: 'Ctrl + J'},
                    {name: 'Close', shortcutKey: 'Ctrl + F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt + F4'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl + Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl + X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl + C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl + V', disabled: true},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'},
                    {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}
                ],
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Summary Audit Report'},
                    {name: 'Detail Audit Report',},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Shift+Alt+T'},
                    {name: 'Layer', shortcutKey: 'Shift+Alt+L'},
                    {name: 'Cascade', shortcutKey: 'Shift+Alt+C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift+Alt+I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Processing Messages', shortcutKey: 'Shift+Alt+P'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Capitation Fund Distribution'}
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

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    break;
                }
                case 'Open': {
                    break;
                }
                case 'Save': {
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Delete': {
                    break;
                }
                case 'Exit': {
                    this.activeModal.dismiss('File -> Exit');
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
        } // handle Edit-Menu Actions
        else if (event.menu.menuItem === 'Topic') {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        } // handle Topic-Menu Actions
        else if (event.menu.menuItem === 'Special') {
        } // handle special-Menu Actions
        else if (event.menu.menuItem === 'Windows') {
        }
        else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */

            this.helpScreen();
        }

    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getCapitationFundDistributionShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const modalRef = this.modalService.open(ClaimsHelpComponent, { windowClass: 'myCustomModalClass' });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = '/CFDST_Capitation_Fund_Distribution_F1_MAP.htm'
    }
}
