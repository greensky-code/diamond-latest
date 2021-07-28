/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {MessageMasterDtl, MessageMasterHdr, SecUser, SecWin} from '../../../api-models';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {MessageMasterDtlService, MessageMasterHdrService, SecUserService} from '../../../api-services';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {MessageMaintenanceLookup} from '../../../shared/lookup/message-maintenance-lookup';
import {Menu, SearchModel} from '../../../shared/models/models';
import {MESSAGE_MAINTENANCE} from '../../../shared/app-constants';
import {NgbToastType} from 'ngb-toast';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ToastService} from '../../../shared/services/toast.service';

// Use the Component directive to define the MessageMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'messagemaintenance',
    templateUrl: './message-maintenance.component.html',

})
export class MessageMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    messageMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    editMessageMasterHdr: boolean;
    messageMasterHdr: MessageMasterHdr;
    messageMasterHdrs: MessageMasterHdr[];
    messageMasterDetail: MessageMasterDtl;
    messageMasterDetails: MessageMasterDtl[];
    secColDetails = new Array<SecColDetail>();
    disableMessageId = false;
    inProgress = true;
    isDataFetched = false;
    memberModuleId = MESSAGE_MAINTENANCE;
    public menu: Menu[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    public dataGridGridOptions: GridOptions;
    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = 'AR_CASH_BATCH_CONTROL';
    private receiptTableName = 'AR_CASH_RECEIPT';
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    gridShowStatus: Boolean = false;
    searchModel = new SearchModel(
        'messagemasterhdrs/lookup',
        MessageMaintenanceLookup.LOOKUP_DEFAULT,
        MessageMaintenanceLookup.LOOKUP_DEFAULT,
        []
    );

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private secUserService: SecUserService,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        private messageMasterDtlService: MessageMasterDtlService,
        private messageMasterHdrService: MessageMasterHdrService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.messageMaintenanceForm);
        this.createDataGrid();
        this.menuInit();
    }

    ngOnInit(): void {
        this.initializePermission();
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

    onSelectionChange($event) {
        this.setMessageMasterHdr($event.data);
    }

    setMessageMasterHdr(messageMasterHdr: MessageMasterHdr) {
        this.messageMaintenanceForm.patchValue({
            'lb': messageMasterHdr.messageId,
            'uncleanIndicator': messageMasterHdr.uncleanFlag
        });
        return messageMasterHdr;
    }

    createMessageMasterHdr() {
        this.formValidation.validateForm();
        if (this.messageMaintenanceForm.valid) {
            let messageMasterHdr = new MessageMasterHdr();
            messageMasterHdr.messageId = Form.getValue(this.messageMaintenanceForm, 'messageId');
            messageMasterHdr.uncleanFlag = Form.getValue(this.messageMaintenanceForm, 'uncleanIndicator');
            this.messageMasterHdrService.createMessageMasterHdr(messageMasterHdr).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editMessageMasterHdr = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateMessageMasterHdr(messageId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.messageMaintenanceForm.valid) {
                let messageMasterHdr = new MessageMasterHdr();
                messageMasterHdr.messageId = Form.getValue(this.messageMaintenanceForm, 'messageId');
                messageMasterHdr.uncleanFlag = Form.getValue(this.messageMaintenanceForm, 'uncleanIndicator');
                this.messageMasterHdrService.updateMessageMasterHdr(messageMasterHdr, messageId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editMessageMasterHdr = false;
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

    saveMessageMasterHdr() {
        if (this.editMessageMasterHdr) {
            this.updateMessageMasterHdr(this.messageMasterHdr.messageId)
        } else {
            this.createMessageMasterHdr();
        }
    }

    deleteMessageMasterHdr(messageId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.messageMasterHdrService.deleteMessageMasterHdr(messageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    onRowSelectedGrid(event) {
        if (!event.node.selected) {
            return;
        }
    }

    getMessageMasterHdr(messageId: number) {
        this.messageMasterHdrService.getMessageMasterHdr(messageId).subscribe(messageMasterHdr => {
            this.messageMasterHdr = messageMasterHdr;
            this.isDataFetched = true;
            this.messageMaintenanceForm.patchValue({
                'messageId': this.messageMasterHdr.messageId,
                'uncleanIndicator': this.messageMasterHdr.uncleanFlag === 'Y' ? true : false,
                'messageId2': this.messageMasterHdr.messageId,
                'messageLevel': this.messageMasterHdr.messageLevel,
                'replacementText': this.messageMasterHdr.replacementText,
                'displayMessage': this.messageMasterHdr.displayMessage === 'Y' ? true : false,
                'retainMessage': this.messageMasterHdr.retainMessage === 'Y' ? true : false,

            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getMessageMasterHdrById() {
        this.messageMasterHdrService.getMessageMasterHdrs().subscribe(messageMasterHdrs => {
            this.messageMasterHdrs = messageMasterHdrs;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getMessageMasterDetailByMessageId(id) {
        this.messageMasterDtlService.findByMessageId(id).subscribe(messageMasterdtl => {
            this.messageMasterDetails = messageMasterdtl;
            this.getMessageMasterHdr(id)
            this.disableMessageId = true;
            this.dataGridGridOptions.api.setRowData(this.messageMasterDetails);
            this.dataGridGridOptions.api.getDisplayedRowAtIndex(0).setSelected(true);
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    getAllMessageMasterDetails() {
        this.messageMasterDtlService.getMessageMasterDtls().subscribe(messageMasterdtls => {
            this.messageMasterDetails = messageMasterdtls;
            this.disableMessageId = true;
            this.dataGridGridOptions.api.setRowData(this.messageMasterDetails);
            this.dataGridGridOptions.api.getDisplayedRowAtIndex(0).setSelected(true);
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    onChangeMessageId(event: any, id: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (id && event.key === 'Tab') {
            event.preventDefault();
            this.getMessageMasterDetailByMessageId(id);
            this.gridShowStatus = true;
        } else if (event.key === 'Tab') {
            this.getAllMessageMasterDetails();
            this.gridShowStatus = true;
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.isDataFetched = true;
            this.messageMaintenanceForm.patchValue({
                'messageId': res.messageId,
                'uncleanIndicator': res.uncleanFlag === 'Y' ? true : false,
                'messageId2': res.messageId,
                'messageLevel': res.messageLevel,
                'replacementText': res.replacementText,
                'displayMessage': res.displayMessage === 'Y' ? true : false,
                'retainMessage': res.retainMessage === 'Y' ? true : false,
            });
            this.gridShowStatus = true;
            this.getMessageMasterDetailByMessageId(res.messageId);
            this.popUpMessage = null;
            this.disableMessageId = true;
        });
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Message ID',
                field: 'messageMasterDtlPrimaryKey.messageId',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Text',
                field: 'messageText',
                width: 800
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
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Message Maintenance', 'Window Error')
            }
        });
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.messageMaintenanceForm = this.formBuilder.group({
            messageId: ['', {updateOn: 'blur', validators: []}],
            uncleanIndicator: ['', {updateOn: 'blur', validators: []}],
            messageId2: ['', {updateOn: 'blur', validators: []}],
            messageLevel: ['', {updateOn: 'blur', validators: []}],
            replacementText: ['', {updateOn: 'blur', validators: []}],
            displayMessage: ['', {updateOn: 'blur', validators: []}],
            retainMessage: ['', {updateOn: 'blur', validators: []}],
            lb: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'Open': {
                    this.messageMaintenanceForm.reset();
                    this.disableMessageId = false;
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
            this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
        } else if (event.menu.menuItem === 'Notes') {
            // handle special-Menu Actions
        } else if (event.menu.menuItem === 'Window') {
            // handle special-Menu Actions
        }
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'Open'},
                    {name: 'Save'},
                    {name: 'Close'},
                    {name: '-'},
                    {name: 'Main Menu...'},
                    {name: 'Shortcut Menu...'},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'},
                ],
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true},
                    {name: 'Paste', disabled: true},
                    {isHorizontal: true},
                    {name: 'Lookup'},
                ],
            },
            {
                menuItem: 'Topic' , disabled: true,
                dropdownItems: [
                ],
            },
            {
                menuItem: 'Special' ,
                dropdownItems: [
                    {name: 'Language', disabled: true},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Ctrl + Alt + T'},
                    {name: 'Layer', shortcutKey: 'Ctrl + Alt + L'},
                    {name: 'Cascade', shortcutKey: 'Ctrl + Alt + C'},
                    {name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S'},
                    {name: 'Audit Display', shortcutKey: 'Ctrl + Alt + A'}, {isHorizontal: true},
                    {name: '1 Main Menu'}]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window'},
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



    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                    this.openLookupFieldSearchModel();
                }
                break;
            default: {
                this.toastService.showToast(
                    'This option is not implemented yet',
                    NgbToastType.Danger
                );
                break;
            }
        }
    }

}
