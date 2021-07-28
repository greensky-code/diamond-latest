/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, RiderMaster, SecUser, SecWin} from '../../../api-models';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtlService, RiderMasterService, SecUserService, SecWinDescrService} from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { Menu, SearchModel } from '../../../shared/models/models';
import { Form } from '../../../shared/helpers/form.helper';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {getMemberAddressShortcutKeys, getRiderShortcutKey} from '../../../shared/services/shared.service';
import {SupportHelpComponent} from '../support-help/support-help.component';

// Use the Component directive to define the RiderComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'rider',
    templateUrl: './rider.component.html',
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        RiderMasterService,
    ]

})
export class RiderComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    riderForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    // private windowId: string = 'RIDER';
    private windowId = 'RIDER';
    public isSuperUser = false;
    public secProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = 'AR_CASH_BATCH_CONTROL';
    private receiptTableName = 'AR_CASH_RECEIPT';
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    public editRiderMaster = true;
    public menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    riderCodeStatus: Boolean = true;
    shortcuts: ShortcutInput[] = [];
    riderMasters: RiderMaster[];
    riderIndex = 0;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private riderMasterService: RiderMasterService,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private messageService: MessageMasterDtlService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.createDataGrid();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.riderForm);
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getRiderShortcutKey(this));
        this.cdr.detectChanges();
    }

    private initializeComponentState(): void {
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.riderForm);
        this.getRiderMasters();
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

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    { name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    { name: 'Open', shortcutKey: 'Ctrl+O' },
                    { name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    { name: 'Close', shortcutKey: 'Ctrl+F4' },
                    { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' },
                    { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true},
                    { name: 'Print', disabled: true },
                    { isHorizontal: true },
                    { name: 'Exit', shortcutKey: 'Alt +F4' },
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true },
                ],
            },
            {
                menuItem: "Windows",
                dropdownItems: [
                    { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                    { isHorizontal: true },
                    { name: "1 Main Menu" },
                    { name: "2 Rider" },
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

    onSelectionChange(event) {
        if (!event.node.selected) {
            return;
        }
        this.riderIndex = this.riderMasters.findIndex(index => index === event.data);
        this.setRiderSetup(event.data);
    }

    setRiderSetup(riderMaster: RiderMaster) {
        this.riderForm.patchValue({
            'riderCode': riderMaster.riderCode,
            'description': riderMaster.description,
        });
        this.isFormDataModified();
    }

    getRiderMaster(riderCode: any) {
        this.riderMasterService.getRiderMaster(riderCode).subscribe(riderMaters => {
            this.editRiderMaster = true;
            this.riderForm.patchValue({
                riderCode: riderMaters.riderCode,
                description: riderMaters.description
            });
        }, error => {
            this.toastService.showToast('An Error occurred while retrieving records.', NgbToastType.Danger);
        });
    }

    createRiderMaster() {
        this.formValidation.validateForm();
        if (this.riderForm.valid) {
            this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
            if (this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) {
                let riderMaster = new RiderMaster();
                riderMaster.riderCode = this.riderForm.get('riderCode').value;
                riderMaster.description = this.riderForm.get('description').value;
                this.riderMasterService.createRiderMaster(riderMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editRiderMaster = true;
                    this.getRiderMasters();
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                    setTimeout(() => {
                        this.alertMessage.show = false;
                    }, 3000);
                    this.isFormDataChangeStatus = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Not Authorized to perform the Action.');
            }
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateRiderMaster(riderCode: string) {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        if (this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) {
            this.formValidation.validateForm();
            if (this.riderForm.valid) {
                let riderMaster = new RiderMaster();
                riderMaster.riderCode = this.riderForm.get('riderCode').value;
                riderMaster.description = this.riderForm.get('description').value;
                this.riderMasterService.updateRiderMaster(riderMaster, riderCode).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    setTimeout(() => {
                        this.alertMessage.show = false;
                    }, 3000);
                    this.getRiderMasters();
                    if (this.screenCloseRequest === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                    this.isFormDataChangeStatus = false;
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

    saveRiderMaster() {
        if (this.editRiderMaster) {
            this.updateRiderMaster(this.riderForm.value.riderCode)
        } else {
            this.createRiderMaster();
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.editRiderMaster = false;
                    this.createForm();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Save': {
                    this.saveRiderMaster();
                    break;
                }
                case 'Close': {
                    this.riderForm.reset();
                    break;
                }
                case 'Shortcut Menu': {
                    // const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    // ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {
            // handle Edit-Menu Actions

        } else if (event.menu.menuItem === 'Special') {
            // handle special-Menu Actions
            switch (event.action) {
                case 'Copy': {
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

    getRiderMasters() {
        this.riderMasterService.getRiderMasters().subscribe(riderMaters => {
            this.riderMasters = riderMaters;
            this.dataGridGridOptions.api.setRowData(riderMaters);
            this.dataGridGridOptions.api.selectIndex(this.riderIndex, null, null);
            this.setRiderSetup(riderMaters[this.riderIndex])
        }, error => {
            this.toastService.showToast('An Error occurred while retrieving records.', NgbToastType.Danger);
        });
    }

    findRider(event: any) {
        if (event.key === 'Tab') {
            if (event.target.value === '') {
                event.preventDefault();
                this.emptyDataPopup()
            }
        }
        if (this.riderForm.value.riderCode && event.key === 'Tab') {
            this.getRiderMaster(this.riderForm.value.riderCode);
        }

    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Rider Code',
                field: 'riderCode',
                width: 200,
                //  headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                // checkboxSelection: true
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
       * Get Security Column Details
       */
    private getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            return;
        }
        this.dataLoadedMap.set('BATCHSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.batchTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('BATCHSECCOL', false);
            this.batchSecColDetails = resp;
            this.batchSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.dataLoadedMap.set('RECEIPTSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.receiptTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('RECEIPTSECCOL', false);
            this.receiptSecColDetails = resp;
            this.receiptSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    private initializePermission(): void {

        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    createNewForm() {
        this.riderCodeStatus = false;
        this.editRiderMaster = false;
        this.riderForm.reset();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.riderForm = this.formBuilder.group({
            riderCode: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    /**
        * Get Permissions
        * @param secUserId
        */
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
            this.showPopUp(error, 'Window Error')
        });
    }

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Rider')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveRiderMaster()
                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.riderForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    emptyDataPopup = () => {
        let popUpMessage = new PopUpMessage(
            'popUpMessageName',
            'Rider',
            '29032 : rider_code is a required field. Enter something other than blanks',
            'icon');
        popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((resp) => {})
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/RIDER_Rider_Codes.htm';
    }
}
