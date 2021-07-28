/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, datePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DrgMasterService } from '../../../api-services/drg-master.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import {DrgMaster, MessageMasterDtl, SecUser} from '../../../api-models';
import { Menu } from '../../../shared/models/models';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../shared/services/security.service";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {MEM_MODULE_ID, PRICING_DRG_CODE_MODULE_ID} from "../../../shared/app-constants";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecWin} from "../../../api-models/security/sec-win.model";
import {PricingHelpComponent} from "../pricing-help/pricing-help.component";
import {
    getConversionFactorShortcutKeys,
    getDrgCodeMaintenanceShortcutKeys
} from "../../../shared/services/shared.service";

// Use the Component directive to define the DrgCodeMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'drgcodemaintenance',
    templateUrl: './drg-code-maintenance.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DrgMasterService
    ]

})
export class DrgCodeMaintenanceComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    drgCodeMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = datePickerModel;
    editDrgMaster: boolean;
    drgMaster: DrgMaster;
    drgMasters: DrgMaster[];
    menu: Menu[] = [];
    @Input() showIcon = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    secWin: SecWinViewModel;
    windowId = 'DRGCD';
    userTemplateId: string;
    memberModuleId = PRICING_DRG_CODE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    public shortcuts: ShortcutInput[] = [];
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

    onLookupFieldChange(event) {
        event.preventDefault();
        const drgCode = Form.getValue(this.drgCodeMaintenanceForm, 'drgCode');
        this.getDrgMaster(event.target.value);
    }

    createDrgMaster() {
        this.formValidation.validateForm();
        if (this.drgCodeMaintenanceForm.valid) {
            let drgMaster = new DrgMaster();
            drgMaster.drgCode = Form.getValue(this.drgCodeMaintenanceForm, 'drgCode');
            drgMaster.shortDescription = Form.getValue(this.drgCodeMaintenanceForm, 'shortDescription');
            drgMaster.description = Form.getValue(this.drgCodeMaintenanceForm, 'description');
            this.drgMasterService.createDrgMaster(drgMaster).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editDrgMaster = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    updateDrgMaster(drgCode: string) {
        this.formValidation.validateForm();
        if (this.drgCodeMaintenanceForm.valid) {
            let drgMaster = new DrgMaster();
            drgMaster.drgCode = Form.getValue(this.drgCodeMaintenanceForm, 'drgCode');
            drgMaster.shortDescription = Form.getValue(this.drgCodeMaintenanceForm, 'shortDescription');
            drgMaster.description = Form.getValue(this.drgCodeMaintenanceForm, 'description');
            this.drgMasterService.updateDrgMaster(drgMaster, drgCode).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editDrgMaster = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000)
                }
                this.isFormDataChangeStatus = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    saveDrgMaster() {
      if (this.securityService.checkInsertUpdatePermissions(this.editDrgMaster, this.secWin)) {

          if (this.editDrgMaster) {
              this.updateDrgMaster(this.drgMaster.drgCode)
          } else {
              this.createDrgMaster();
          }
      }
    }

    deleteDrgMaster(drgCode: string) {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        this.drgMasterService.deleteDrgMaster(drgCode).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getDrgMaster(drgCode: string) {
        this.drgMasterService.getDrgMaster(drgCode).subscribe(drgMaster => {
            this.editDrgMaster = true;
            this.drgMaster = drgMaster;
            this.drgCodeMaintenanceForm.patchValue({
                'drgCode': this.drgMaster.drgCode,
                'shortDescription': this.drgMaster.shortDescription,
                'description': this.drgMaster.description,
            });
        }, error => {
            let popMsg = new PopUpMessage('groupNotExistPopup', 'Group',
                '33005: Entered DRG Code does not exist. Press Yes to create a new DRG Code.', 'icon');
            popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
             new PopUpMessageButton('no', 'No', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
        });
    }

    popUpButtonClicked(button) {
        if (button.name === 'yes') {
            this.editDrgMaster = false;
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
        this.popUpMessage = null;
    }

    getDrgMasters() {
        this.drgMasterService.getDrgMasters().subscribe(drgMasters => {
            this.drgMasters = drgMasters;
        });
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
        private drgMasterService: DrgMasterService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private cdr: ChangeDetectorRef,
        private secUserService: SecUserService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    initializeComponentState () {
        this.menuInit();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.drgCodeMaintenanceForm);
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

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Drg Code Maintenance',
                        'Drg Code Maintenance Permission'
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
        this.secColDetailService.findByTableNameAndUserId('DRG_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.drgCodeMaintenanceForm = this.formBuilder.group({
            drgCode: ['', { updateOn: 'blur', validators: [] }],
            shortDescription: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New'}, {name: 'Open'}, {name: 'Save'}, {name: 'Close'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {

                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true}, {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true}, {name: 'Paste', disabled: true}, {isHorizontal: true},
                    {name: 'Lookup'}, {name: 'Sort by Sequence', disabled: true}, {
                        name: 'Sort by Panel ID',
                        disabled: true
                    }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'Master File'}, {name: 'Detail'}, {name: 'Contracts'},
                    {name: 'Panel'}, {name: 'Billing Control'}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{name: 'Group Lookup'}, {name: 'D/C Information'}, {name: 'Group User Fields'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
                    {isHorizontal: true}, {name: 'Show Timestamp'}, {name: 'Audit Display'}, {isHorizontal: true}, {name: '1 Main Menu'},
                    {name: '2 Group Master'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.editDrgMaster = false;
                    this.drgCodeMaintenanceForm.reset();
                    break;
                }
                case 'Open': {
                    this.getDrgMaster(this.drgCodeMaintenanceForm.value.drgCode);
                    break;
                }
                case 'Save': {
                    this.saveDrgMaster();
                    break;
                }
                case 'Close': {
                    this.drgCodeMaintenanceForm.reset();
                    break;
                }
                case 'Shortcut Menu': {
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Help') {             // handle File actions
            this.helpScreen();
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getDrgCodeMaintenanceShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(PricingHelpComponent, { windowClass: "myCustomModalClass" });
        viewModal.componentInstance.defaultFile = 'DRGCD_DRG_Codes.htm'
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'DRG Code Maintenance')
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
                    this.saveDrgMaster();
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
        this.drgCodeMaintenanceForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
