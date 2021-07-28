/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GridOptions } from 'ag-grid-community';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'

import { MessageMasterDtl, PlaceOfSvcMaster, SecUser } from '../../../api-models'
import { PlaceOfSvcMasterService } from '../../../api-services/place-of-svc-master.service'
import { Menu } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { getServiceOfPlaceForNewShortcutKeys, getServiceOfPlaceShortcutKeys } from '../../../shared/services/shared.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { MessageMasterDtlService, SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { PLACE_OF_SERVICE_MODULE_ID } from '../../../shared/app-constants';
import { BenefitsHelpComponent } from "../../benefits/benefits-help/benefits-help.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';
// Use the Component directive to define the PlaceOfServiceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'placeofservice',
    templateUrl: './place-of-service.component.html',
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        PlaceOfSvcMasterService

    ],
})
export class PlaceOfServiceComponent implements OnInit, AfterViewInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    placeOfServiceForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    dataGridGridOptions: GridOptions;
    dataGridgridApi: any;
    dataGridgridColumnApi: any;
    public menu: Menu[] = [];
    // update to true when Get records
    isFilter = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    editPlaceOfSvcMaster: boolean;
    placeOfSvcMaster: PlaceOfSvcMaster;
    placesOfSvcMaster: PlaceOfSvcMaster[] = [];
    placeOfSvcCode: any;
    @Input() showIcon = false;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;


    isReadOnly = true;

    secWin: SecWinViewModel;
    windowId = 'PLSVC';
    userTemplateId: string;
    memberModuleId = PLACE_OF_SERVICE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Place of Svc Code',
                field: 'placeOfSvcCode', sort: 'asc',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,

            },
            {
                headerName: 'Description',
                field: 'description',
                width: 120
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
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private placeOfSvcMasterService: PlaceOfSvcMasterService,
        private toastService: ToastService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private modalService: NgbModal,
        private menuSerrvice: MenuService,
        private messageService: MessageMasterDtlService
    ) { }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }
    GridSelectionChange() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.placeOfSvcCode = selectedRows[0].placeOfSvcCode
        this.getPlaceOfSvcMaster(this.placeOfSvcCode);
        this.isReadOnly = true;
    }
    getPlaceOfSvcMaster(placeOfSvcCode: string) {
        this.placeOfSvcMasterService.getPlaceOfSvcMaster(placeOfSvcCode).subscribe(placeOfSvcMaster => {
            this.placeOfSvcMaster = placeOfSvcMaster;
            this.placeOfServiceForm.patchValue({
                'placeOfSvcCode': this.placeOfSvcMaster.placeOfSvcCode,
                'description': this.placeOfSvcMaster.description,
            }, {emitEvent: false});
            this.isFormDataModified();
        });
    }
    getPlacesOfSvcMaster() {
        this.placeOfSvcMasterService.getPlacesOfSvcMaster().subscribe(placesOfSvcMaster => {
            this.placesOfSvcMaster = [];
            this.dataGridGridOptions.api.setRowData([]);
            this.placesOfSvcMaster = placesOfSvcMaster;
            this.dataGridGridOptions.api.setRowData(this.placesOfSvcMaster);
            if (placesOfSvcMaster.length > 0) {
                this.dataGridGridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
            }
        });
    }
    updatePlaceOfSvcMaster(placeOfSvcCode: string) {
        this.formValidation.validateForm();
        if (this.placeOfServiceForm.valid) {
            let placeOfSvcMaster = new PlaceOfSvcMaster();
            placeOfSvcMaster.placeOfSvcCode = this.placeOfServiceForm.get('placeOfSvcCode').value;
            placeOfSvcMaster.description = this.placeOfServiceForm.get('description').value;
            this.placeOfSvcMasterService.updatePlaceOfSvcMaster(placeOfSvcMaster, placeOfSvcCode).subscribe(response => {
                this.getPlacesOfSvcMaster();
                this.toastService.showToast('Data Successfully Updated', NgbToastType.Success);
                this.editPlaceOfSvcMaster = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false
            });
        } else {
            this.toastService.showToast('Some required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Success);
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.placeOfServiceForm = this.formBuilder.group({
            placeOfSvcCode: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [Validators.required] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    //statements;
                    this.createServiceOfPlace();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    //this.updatePlaceOfSvcMaster(this.placeOfSvcCode);
                    this.saveOfServiceOfPlace();
                    break;
                }

                case 'Delete': {
                    this.deletePlaceOfService();
                    break;
                }

                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
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
                menuItem: 'File',
                dropdownItems: [{ name: 'New' }, { name: 'Open',disabled:true }, { name: 'Delete' }, { name: 'Save' }, { name: 'Close' }, { name: 'Main Menu' }, { name: 'Shortcut Menu' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo' }, { name: 'Cut' }, { name: 'Copy' }, { name: 'Paste' }, { name: 'Next' }, { name: 'Previous' }, { name: 'Lookup' }]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{ name: 'Notes', shortcutKey: 'F4', disabled: true }]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Title', shortcutKey: 'Shift+Alt+T' },
                    { name: 'Layer', shortcutKey: 'Shift+Alt+L' },
                    { name: 'Cascade', shortcutKey: 'Shift+Alt+C' },
                    { name: 'Arrange Icons', shortcutKey: 'Shift+Alt+I' },
                    { isHorizontal: true },
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 Place Of Service' }
                ]
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
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getServiceOfPlaceShortcutKeys(this));
        this.shortcuts.push(...getServiceOfPlaceForNewShortcutKeys(this));
        this.cdr.detectChanges();
    }

    createServiceOfPlace() {
        if (this.isSuperUser) {
            this.isReadOnly = false;
            this.createForm();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.isReadOnly = false;
                this.createForm();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }

    }


    saveOfServiceOfPlace() {
        this.formValidation.validateForm();
        if (this.placeOfServiceForm.valid) {
            let placeOfSvcMaster = new PlaceOfSvcMaster();
            placeOfSvcMaster.placeOfSvcCode = this.placeOfServiceForm.get('placeOfSvcCode').value;
            placeOfSvcMaster.description = this.placeOfServiceForm.get('description').value;

            if (this.isReadOnly == false) {

                if (this.isSuperUser) {
                    this.placeOfSvcMasterService.createPlaceOfSvcMaster(placeOfSvcMaster).subscribe(response => {
                        this.toastService.showToast('Data inserted Successfully', NgbToastType.Success);
                        if (this.screenCloseRequest === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.isFormDataChangeStatus = false
                        this.getPlacesOfSvcMaster();
                    });
                } else {
                    if (this.secWin.hasInsertPermission()) {
                        this.placeOfSvcMasterService.createPlaceOfSvcMaster(placeOfSvcMaster).subscribe(response => {
                            this.toastService.showToast('Data inserted Successfully', NgbToastType.Success);
                            this.getPlacesOfSvcMaster();
                            if (this.screenCloseRequest === true) {
                                setTimeout(() => {
                                    this.activeModal.close()
                                }, 2000)
                            }
                            this.isFormDataChangeStatus = false
                        });
                    } else {
                        this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                            this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                        });
                    }
                }

            } else {
                if (this.isSuperUser) {
                    this.updatePlaceOfSvcMaster(this.placeOfSvcCode);
                } else {
                    if (this.secWin.hasUpdatePermission()) {
                        this.updatePlaceOfSvcMaster(this.placeOfSvcCode);
                    } else {
                        this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                            this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
                        });
                    }
                }
            }

        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }



    initializeComponentState() {
        this.createForm();
        this.createDataGrid();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.placeOfServiceForm);
        this.menuInit();
        this.getPlacesOfSvcMaster();
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
            this.userTemplateId = user.dfltTemplate
            this.getSecWin(user.dfltTemplate);
        });
    }


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
                        'You are not Permitted to view Place Of Service',
                        'Place Of Service Permission'
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
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('PLACE_OF_SVC_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    helpScreen = () => {
        const viewModal = this.modalService.open(BenefitsHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.defaultFile = '/PLSVC_Place_of_Service_Codes.htm';
    }

    deleteServiceOfPlace() {
        if (this.isSuperUser) {
            this.deletePlaceOfService();
        } else {
            if (this.secWin.hasDeletePermission()) {
                this.deletePlaceOfService();
            } else {
                this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
                    this.form1PopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
                });
            }
        }
    }

    deletePlaceOfService() {
        let popUpMessage = new PopUpMessage(
            'Place Of Service',
            'Place Of Service',
            '29070: Press OK to delete this record',
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
                this.deletePLSV();
            }
        }, (error: any) => {
            this.showErrorPopUp(error, 'Place Of Service')
        });
    }

    deletePLSV() {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            let placeOfSvcCode = selectedRows[0].placeOfSvcCode;
            this.placeOfSvcMasterService.deletePlaceOfSvcMaster(placeOfSvcCode).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
                this.getPlacesOfSvcMaster();
            });
        }
    }

    showErrorPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    form1PopupAlert = (message: string, title: string) => {
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

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Place of Service')
            })
        } else {
            this.activeModal.close();
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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveOfServiceOfPlace();
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
        this.placeOfServiceForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
