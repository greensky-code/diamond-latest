/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageMasterDtl, ModifierCodeMaster, SecUser, SecWin } from '../../../api-models/index'
import { ModifierCodeMasterService } from '../../../api-services/modifier-code-master.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { MessageMasterDtlService, SecUserService } from '../../../api-services';
import { Menu, SearchModel } from '../../../shared/models/models';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { ChangeDetectorRef } from '@angular/core';
import { getAuthorizationProceduresComponentShortcutKeys, getModifierComponentShortcutKeys } from '../../../shared/services/shared.service';
import { ModifierIdLookup } from '../../../shared/lookup/modifier-modifierId-lookup';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { SupportHelpComponent } from "../support-help/support-help.component";
import { MenuResponse } from '../../../api-models/menu-response';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
    selector: 'modifier',
    templateUrl: './modifier.component.html',
})

export class ModifierComponent implements OnInit {

    modifierForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'MODIF';
    public isSuperUser = false;
    public secProgress = true;
    secColDetails: SecColDetail[] = [];
    userTemplateId: string;
    closeStatus: Boolean = false;
    editModifierCodeMaster = true;
    modifierCodeMaster: ModifierCodeMaster;
    modifierCodeMasters: ModifierCodeMaster[];
    showModifierMasterFields: boolean;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    memberModuleId = 'MODIF';
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('descriptionEl') mouseFocus: any;

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private cdr: ChangeDetectorRef,
        private customValidators: CustomValidators,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private activeModal: NgbActiveModal,
        private modifierCodeMasterService: ModifierCodeMasterService,
        private alertMessageService: AlertMessageService,
        private securityService: SecurityService,
        private secColDetailService: SecColDetailService,
        private renderer: Renderer2,
        private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        private toastService: ToastService,
        private menuService: MenuService
    ) {
    }

    ngOnInit(): void {
        this.initializePermission();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getModifierComponentShortcutKeys(this));
        this.cdr.detectChanges();
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
        this.secProgress = false;
        if(this.isSuperUser){
            this.secProgress = false;
            this.initializeComponentState();
            return 
        }
       
        // to check function level security
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

    initializeComponentState() {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.modifierForm);
    }

    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.modifierForm = this.formBuilder.group({
            modifierId: ['', { updateOn: 'blur', validators: [Validators.maxLength(2)] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            description1: ['', { updateOn: 'blur', validators: [] }],
            anesthesia: ['', { updateOn: 'blur', validators: [] }],
            informationalOnly: ['', { updateOn: 'blur', validators: [] }],
            userDefined1: ['', { updateOn: 'blur', validators: [] }],
            userDefined2: ['', { updateOn: 'blur', validators: [] }],
            userDefined3: ['', { updateOn: 'blur', validators: [] }],
            userDefined4: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    createNewForm() {
        if (this.isSuperUser) {
            this.createNForm();
        } else {
            if (this.secWin.hasInsertPermission()) {
                this.createNForm();
            } else {
                this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Modifier')
                });
            }
        }
    }

    createNForm() {
        if (this.modifierForm.dirty) {
            this.showEditConfirmation();
        } else {
            this.showModifierMasterFields = false
            this.editModifierCodeMaster = false;
            this.modifierForm.get('modifierId').enable();
            this.modifierForm.reset();
        }
    }


    getModifierCodeMaster(modifierCode: string) {
        this.modifierCodeMasterService.getModifierCodeMaster(modifierCode).subscribe(modifCode => {
            this.modifierCodeMaster = modifCode;
            this.modifierForm.patchValue({
                'modifierId': this.modifierCodeMaster.modifierCode,
                'description1': this.modifierCodeMaster.description,
                'description': this.modifierCodeMaster.description,
                'anesthesia': (this.modifierCodeMaster.anesthesiaInd == 'Y'),
                'informationalOnly': (this.modifierCodeMaster.informationalFlag == 'Y'),
                'userDefined1': this.modifierCodeMaster.userDefined1,
                'userDefined2': this.modifierCodeMaster.userDefined2,
                'userDefined3': this.modifierCodeMaster.userDefined3,
                'userDefined4': this.modifierCodeMaster.userDefined4,
            });
            this.modifierForm.get('modifierId').disable();
            this.showModifierMasterFields = true;
            this.editModifierCodeMaster = true;
            this.nextFocus();
        }, error => {
            this.showEditConfirmationForModifierId();
        });
    }

    nextFocus() {
        setTimeout(() => {
            this.mouseFocus.nativeElement.focus();
        }, 2000);
    }

    searchModifierIdModel = new SearchModel('modifiercodemasters/lookup',
        ModifierIdLookup.MODIFIER_MODIFIERID_DEFAULT,
        ModifierIdLookup.MODIFIER_MODIFIERID_ALL,
        []);

    openLookupModifierIdModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModifierIdModel;
        ref.componentInstance.showIcon = true;

        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.getModifierCodeMaster(res.modifierCode);
            this.editModifierCodeMaster = true;
            this.popUpMessage = null;
        })
    };

    onKeyDownModifierId(event) {
        let id = event.target.value;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupModifierIdModel();
        } else if (id && event.key === 'Tab') {
            event.preventDefault();
            this.getModifierCodeMaster(event.target.value.toUpperCase());
        } else if (event.key === 'Tab') {
            this.showNotFoundPopup();
        }
    }
    showNotFoundPopup() {
        this.messageService.findByMessageId(27235).subscribe((message: MessageMasterDtl[]) => {
            this.showPopUp('27235: ' + message[0].messageText, 'Modifier');
        });
    }

    saveModifierCodeMaster() {
        if (this.editModifierCodeMaster) {
            if (this.isSuperUser) {
                this.updateModifierCodeMaster(this.modifierCodeMaster.modifierCode)
            } else {
                if (this.secWin.hasUpdatePermission()) {
                    this.updateModifierCodeMaster(this.modifierCodeMaster.modifierCode)
                } else {
                    this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Modifier')
                    });
                }
            }

        } else {
            if (this.isSuperUser) {
                this.createModifierCodeMaster();
            } else {
                if (this.secWin.hasInsertPermission()) {
                    this.createModifierCodeMaster();
                } else {
                    this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
                        this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Modifier')
                    });
                }
            }

        }
    }



    createModifierCodeMaster() {
        this.formValidation.validateForm();
        if (this.modifierForm.valid) {
            let modifierCodeMaster = new ModifierCodeMaster();
            modifierCodeMaster.modifierCode = Form.getValue(this.modifierForm, 'modifierId');
            modifierCodeMaster.description = Form.getValue(this.modifierForm, 'description');
            modifierCodeMaster.anesthesiaInd = Form.getValue(this.modifierForm, 'anesthesia') == true ? 'Y' : 'N';
            modifierCodeMaster.informationalFlag = Form.getValue(this.modifierForm, 'informationalOnly') == true ? 'Y' : 'N';
            modifierCodeMaster.userDefined1 = Form.getValue(this.modifierForm, 'userDefined1');
            modifierCodeMaster.userDefined2 = Form.getValue(this.modifierForm, 'userDefined2');
            modifierCodeMaster.userDefined3 = Form.getValue(this.modifierForm, 'userDefined3');
            modifierCodeMaster.userDefined4 = Form.getValue(this.modifierForm, 'userDefined4');
            this.modifierCodeMasterService.createModifierCodeMaster(modifierCodeMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editModifierCodeMaster = false;
                this.modifierForm.reset();
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateModifierCodeMaster(modifierCode: string) {
        this.formValidation.validateForm();
        if (this.modifierForm.valid) {
            let modifierCodeMaster = new ModifierCodeMaster();
            modifierCodeMaster.modifierCode = Form.getValue(this.modifierForm, 'modifierId');
            modifierCodeMaster.description = Form.getValue(this.modifierForm, 'description');
            modifierCodeMaster.anesthesiaInd = Form.getValue(this.modifierForm, 'anesthesia') == true ? 'Y' : 'N';
            modifierCodeMaster.informationalFlag = Form.getValue(this.modifierForm, 'informationalOnly') == true ? 'Y' : 'N';
            modifierCodeMaster.userDefined1 = Form.getValue(this.modifierForm, 'userDefined1');
            modifierCodeMaster.userDefined2 = Form.getValue(this.modifierForm, 'userDefined2');
            modifierCodeMaster.userDefined3 = Form.getValue(this.modifierForm, 'userDefined3');
            modifierCodeMaster.userDefined4 = Form.getValue(this.modifierForm, 'userDefined4');
            this.modifierCodeMasterService.updateModifierCodeMaster(modifierCodeMaster, modifierCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.modifierForm.markAsPristine();
                if (this.closeStatus === true) {
                    setTimeout(() => {
                        this.activeModal.close();
                    }, 2000);
                }
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    deleteModifierCodeMaster(modifierCode: string) {
        if(this.isSuperUser){
            this.deleteModifier(modifierCode);
        }else{
            if(this.secWin.hasDeletePermission()){
                this.deleteModifier(modifierCode);
            }else{
                this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
                    this.formPopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Modifier')
                });
            }
        }


    }

    deleteModifier(modifierCode: string) {
        this.modifierCodeMasterService.deleteModifierCodeMaster(modifierCode).subscribe(response => {
            this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
        });
    }

    

    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;
                    this.initializeComponentState();
                    //Check Menus Privilege Start
                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuService.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }
                    //Check Menus Privilege End

                } else {
                    this.secProgress = false;
                    this.showPopUp(
                        'You are not Permitted to view Modifier',
                        'Modifier Permission'
                    );
                }
            },
            (error) => {
                this.initializeComponentState();
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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

    showEditConfirmation() {
        this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
            this.popupAlert(message[0].messageText, 'Modifier')
        });
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
                    this.saveModifierCodeMaster();
                } else if (resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                    this.showModifierMasterFields = false;
                    this.editModifierCodeMaster = false;
                    this.modifierForm.get('modifierId').enable();
                    this.modifierForm.reset();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    showEditConfirmationForModifierId() {
        const buttons = [
            new PopUpMessageButton('Yes', 'Yes', 'btn btn-info'),
            new PopUpMessageButton('No', 'No', 'btn btn-primary')
        ];
        this.messageService.findByMessageId(27233).subscribe((message: MessageMasterDtl[]) => {
            const popUpMessage = new PopUpMessage('editConfirmation', 'Modifier',
                '27233: ' + message[0].messageText, 'icon', buttons, MessageType.WARNING);
            const ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((result: { name: string; }) => {
                if (result && result.name) {
                    if (result.name === 'Yes') {
                        this.showModifierMasterFields = true;
                        this.editModifierCodeMaster = false;
                        this.modifierCodeMaster.modifierCode = Form.getValue(this.modifierForm, 'modifierId');
                        this.modifierForm.reset();
                        this.modifierForm.controls['modifierId'].setValue(this.modifierCodeMaster.modifierCode);
                    }
                }
            });
        });
    }

    closeModal() {
        this.closeStatus = true;
        if (this.modifierForm.dirty) {
            this.showEditConfirmation();
        } else {
            this.showModifierMasterFields = false;
            this.modifierForm.reset();
            this.activeModal.close();
        }
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createNewForm();
                    break;

                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Delete': {
                    this.deleteModifierCodeMaster(this.modifierCodeMaster.modifierCode);
                    break;
                }
                case 'Save': {
                    this.saveModifierCodeMaster();
                    break;
                }
                case 'Close': {
                    if (this.modifierForm.dirty) {
                        this.showEditConfirmation();
                    } else {
                        this.showModifierMasterFields = false;
                        this.modifierForm.reset();
                    }

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
        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case 'Show Timestamp': {
                    this.showTimeStamp()
                }
            }
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
                dropdownItems: [
                    { name: 'New', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) },
                    { name: 'Open' },
                    { name: 'Delete', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasDeletePermission())) },
                    { name: 'Save', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasUpdatePermission())) },
                    { name: 'Close' },
                    { isHorizontal: true },
                    { name: 'Main Menu...' },
                    { name: 'Shortcut Menu...' },
                    { isHorizontal: true },
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
                    { name: 'Next' },
                    { name: 'Previous' },
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
                    { name: '2 Modifier' },
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

    showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = 'Modifier';
        ref.componentInstance.insertDateTime = this.modifierCodeMaster.insertDatetime;
        ref.componentInstance.insertProcess = this.modifierCodeMaster.insertProcess;
        ref.componentInstance.insertUser = this.modifierCodeMaster.insertUser;
        ref.componentInstance.updateUser = this.modifierCodeMaster.updateUser;
        ref.componentInstance.updateDateTime = this.modifierCodeMaster.updateDatetime;
        ref.componentInstance.updateProcess = this.modifierCodeMaster.updateProcess;
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/MODIF_Modifiers.htm';
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
