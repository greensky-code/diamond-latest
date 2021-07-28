/* Copyright (c) 2020 . All Rights Reserved. */

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GridOptions } from 'ag-grid-community';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { ProvTypeMasterService } from '../../../api-services/prov-type-master.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ProvTypeMaster, SecUser, DddwDtl, MessageMasterDtl} from '../../../api-models';
import { Form } from '../../../shared/helpers/form.helper';
import { SecurityService } from '../../../shared/services/security.service';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { Menu } from '../../../shared/models/models';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../../../shared/services/toast.service';
import { MessageMasterDtlService, SecUserService, DddwDtlService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { getProviderTypeShortcutKeys, CONSTANTS } from '../../../shared/services/shared.service';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

// Use the Component directive to define the ProviderTypeComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'app-provider-type',
    templateUrl: './provider-type.component.html',
    providers: [
        ProvTypeMasterService
    ],
})
export class ProviderTypeComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerTypeForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public shortcuts: ShortcutInput[] = [];
    public specialityType: DddwDtl[];
    public windowId: string = 'PTYPE';
    public menu: Menu[] = [];
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    secColDetails = new Array<SecColDetail>();
    private dataLoadedMap = new Map<string, boolean>();
    typeOrSpecialityDropDownvalues: DddwDtl[];
    public specialityTypeVal: any = '';
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    public isSuperUser = false;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private provTypeMasterService: ProvTypeMasterService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private securityService: SecurityService,
        private toastService: ToastService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private toastr: ToastService,
        private dddwDtlService: DddwDtlService,) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerTypeForm);
        this.createDataGrid();
        this.getProvTypeMasters();
        // this.getSpecialityType();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderTypeShortcutKeys(this));
        this.cdr.detectChanges();
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    public popUpButtonHandler(button: any) {
        console.log(button);
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        } else if (button.popupMessage.name === 'editConfirmation') {
            console.log(button);
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

    showEditConfirmation() {
        const buttons = [
            new PopUpMessageButton('Save', 'Save', 'btn btn-info'),
            new PopUpMessageButton('Okay', 'Ok', 'btn btn-primary')
        ];
        const popUpMessage = new PopUpMessage('editConfirmation', 'Warning!', 'Data has been modified.', 'icon', buttons, MessageType.WARNING);
        const ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe(result => {
            if (result && result.name) {
                if (result.name === 'Save') {
                    this.saveProvTypeMaster();
                } else {
                    this.providerTypeForm.reset();
                }
            }
        });
    }

    public get isDataLoaded(): boolean {
        // @ts-ignore
        for (let [key, value] of this.dataLoadedMap) {
            if (!value) {
                return value;
            }
        }
        return true;
    }


    editProvTypeMaster: boolean = true;
    provTypeMaster: ProvTypeMaster;
    provTypeMasters: ProvTypeMaster[];
    keyValue: any;
    createProvTypeMaster() {
        if (this.secWin.hasInsertPermission()) {

            this.formValidation.validateForm();
            if (this.providerTypeForm.valid) {
                let provTypeMaster = new ProvTypeMaster();
                provTypeMaster.typeOrSpecCode = Form.getValue(this.providerTypeForm, 'typeOrSpecCode');

                let exists = Object.keys(this.provTypeMasters).some(function (k) {
                    return provTypeMaster[k] === provTypeMaster.typeOrSpecCode;
                });
                if (exists) {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                } else {
                    provTypeMaster.typeOrSpecialty = Form.getValue(this.providerTypeForm, 'typeOrSpecialty');
                    provTypeMaster.shortDescription = Form.getValue(this.providerTypeForm, 'shortDescription');
                    provTypeMaster.description = Form.getValue(this.providerTypeForm, 'description');
                    provTypeMaster.autoAuditSpecCod = Form.getValue(this.providerTypeForm, 'autoAudit');
                    this.provTypeMasterService.createProvTypeMaster(provTypeMaster).subscribe(response => {
                        this.toastService.showToast('Record successfully created', NgbToastType.Success);
                        this.editProvTypeMaster = true;
                        if (this.closeStatus === true) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000)
                        }
                        this.popupClose = false;
                    }, error => {
                        this.alertMessage = this.alertMessageService.error("A record already exists with key value. Enter a new value.");
                    });
                }

            } else {
                if (this.validateInputForSave()) {
                    this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
                }
            }
        } else {
            // TODO add showPoPup ......... user not have insert permission
        }
        this.editProvTypeMaster = true;
    }

    updateProvTypeMaster(typeOrSpecCode: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.providerTypeForm.valid) {
                let provTypeMaster = new ProvTypeMaster();
                provTypeMaster.typeOrSpecCode = Form.getValue(this.providerTypeForm, 'typeOrSpecCode');
                provTypeMaster.typeOrSpecialty = Form.getValue(this.providerTypeForm, 'typeOrSpecialty');
                provTypeMaster.shortDescription = Form.getValue(this.providerTypeForm, 'shortDescription');
                provTypeMaster.description = Form.getValue(this.providerTypeForm, 'description');
                provTypeMaster.autoAuditSpecCod = Form.getValue(this.providerTypeForm, 'autoAudit');
                this.provTypeMasterService.updateProvTypeMaster(provTypeMaster, typeOrSpecCode).subscribe(response => {
                    this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                    this.editProvTypeMaster = true;
                    if (this.closeStatus === true) {
                        setTimeout(() => {
                            this.activeModal.close();
                        }, 2000);
                    }
                    this.popupClose = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                if (this.validateInputForSave()) {
                    this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
                }
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveProvTypeMaster() {
        if (this.editProvTypeMaster) {
            this.updateProvTypeMaster(this.provTypeMaster.typeOrSpecCode)
        } else {
            this.createProvTypeMaster();
        }
    }

    deleteProvTypeMaster(typeOrSpecCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provTypeMasterService.deleteProvTypeMaster(typeOrSpecCode).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getProvTypeMaster(typeOrSpecCode: string) {
        this.provTypeMasterService.getProvTypeMaster(typeOrSpecCode).subscribe(provTypeMaster => {
            this.provTypeMaster = provTypeMaster;
            this.providerTypeForm.patchValue({
                'typeOrSpecCode': this.provTypeMaster.typeOrSpecCode,
                'typeOrSpecialty': this.provTypeMaster.typeOrSpecialty,
                'shortDescription': this.provTypeMaster.shortDescription,
                'description': this.provTypeMaster.description,
                'autoAudit': this.provTypeMaster.autoAuditSpecCod,
            });
            if (this.provTypeMaster.typeOrSpecialty == 'T')
                this.specialityTypeVal = "Type";
            else if (this.provTypeMaster.typeOrSpecialty == 'S')
                this.specialityTypeVal = "Specialty";
        });
    }

    getProvTypeMasters() {
        this.dataLoadedMap.set('PTYPES', false);
        this.provTypeMasterService.getProvTypeMasters().subscribe(provTypeMasters => {
            this.provTypeMasters = provTypeMasters;
            this.dataLoadedMap.set('PTYPES', true);
            if (this.provTypeMasters && this.provTypeMasters.length > 0) {
                setTimeout(() => {
                    this.dataGridGridOptions.api.setRowData(this.provTypeMasters);
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                }, 2000);
            }
        }, error => {
            this.dataLoadedMap.set('PTYPES', true);
        });
    }

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
                headerName: "Type or Spec Code",
                field: "typeOrSpecCode",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Type or Specialty",
                field: "typeOrSpecialty",
                width: 200,
                valueGetter: function (params) {
                    if (params.data.typeOrSpecialty == 'T')
                        return 'Type';
                    else if (params.data.typeOrSpecialty == 'S')
                        return 'Specialty'

                }
            },
            {
                headerName: "Description",
                field: "shortDescription",
                width: 200
            }
        ];
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        const userId = parsedToken ? parsedToken.sub : null;

        this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
            this.secWinService.getSecWin(this.windowId, user.dfltTemplate).subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                } else {
                    this.toastService.showToast('You are not Permitted to view', NgbToastType.Danger);
                }
            }, error => {
                console.log(error);
            });
        });

        this.secColDetailService.findByTableNameAndUserId("VENDOR_TIN", userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive

        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.createDataGrid();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerTypeForm);
        this.menuInit();
        this.getTypeOrSpecialityDropDownData();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerTypeForm = this.formBuilder.group({
            typeOrSpecCode: ['', { updateOn: 'blur', validators: [Validators.required] }],
            typeOrSpecialty: ['', { updateOn: 'blur', validators: [Validators.required] }],
            shortDescription: ['', { updateOn: 'blur', validators: [] }],
            description: ['', { updateOn: 'blur', validators: [] }],
            autoAudit: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onSelectionChange($event) {
        const selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            this.provTypeMaster = selectedRows[0];
            this.dataGridGridOptions.api.selectIndex($event.rowIndex, null, null);
            this.providerTypeForm.patchValue({
                'typeOrSpecCode': this.provTypeMaster.typeOrSpecCode,
                'typeOrSpecialty': this.provTypeMaster.typeOrSpecialty,
                'shortDescription': this.provTypeMaster.shortDescription,
                'description': this.provTypeMaster.description,
                'autoAudit': this.provTypeMaster.autoAuditSpecCod,
            }, {emitEvent: false});
            setTimeout(() => {
                this.isFormValidateStatus()
            }, 2000)
            this.keyValue = this.provTypeMaster.typeOrSpecCode;
            if (this.provTypeMaster.typeOrSpecialty == 'T')
                this.specialityTypeVal = "Type";
            else if (this.provTypeMaster.typeOrSpecialty == 'S')
                this.specialityTypeVal = "Specialty";
        }
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Delete', shortcutKey: 'Ctrl+D', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'}
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4', disabled: true }
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Provider Type'}
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
        if (event.menu.menuItem === "File") {             // handle File actions
            switch (event.action) {
                case "New": {
                    this.providerTypeForm.reset();
                    this.editProvTypeMaster = false;

                    break;
                }
                case 'Open': {
                    if (this.providerTypeForm.value.typeOrSpecCode) {
                        this.getProvTypeMaster(this.providerTypeForm.value.typeOrSpecCode.toUpperCase());
                    }
                    break;
                }
                case 'Delete': {
                    this.deleteOneRow();
                    break;
                }
                case "Save": {
                    if (this.validateInputForSave()) {
                        this.saveProvTypeMaster();
                    }
                    break;
                }
                case 'Shortcut Menu...': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }

        else {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    private validateInputForSave() {
        if (!this.providerTypeForm.get("typeOrSpecCode").value) {
            this.alertMessage = this.alertMessageService.error(
                "29032: type_or_spec_code is a required field. Enter the something other than blanks."
            );
            return false;
        }

        if (!this.providerTypeForm.get("typeOrSpecialty").value) {
            this.alertMessage = this.alertMessageService.error(
                "29032: type_or_specialty is a required field. Enter the something other than blanks."
            );
            return false;
        }

        return true;
    }

    getTypeOrSpecialityDropDownData() {

        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PROVIDER_TYPE_SPECIALTY, CONSTANTS.DW_PTYPE).subscribe((values) => {
            this.specialityType = values;
            const defaultValue = values.length > 0 ? values.find(value => value.dddwDtlPrimaryKey.dataVal === 'S') : null;
            this.providerTypeForm.patchValue({ 'typeOrSpecialty': defaultValue.dddwDtlPrimaryKey.dataVal });
        });
    }

    setFieldValue(fieldName: string, fieldValue: string) {
        this.providerTypeForm.controls[fieldName].patchValue(fieldValue);
        if (fieldValue == 'T')
            this.specialityTypeVal = "Type";
        else if (fieldValue == 'S')
            this.specialityTypeVal = "Specialty";
    }

    modalClose = () => {
        this.closeStatus = true;
        if  (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Type')
            })
        } else {
            this.activeModal.close();
        }
    };

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
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveProvTypeMaster()
                }
                else if(resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'PTYPE_Provider_Types_and_Specialties.htm';
    }

    deleteOneRow = () => {
        if  (this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) {
            this.deletePopupAlert()
        }
    };

    deletePopupAlert = () => {
        let popUpMessage = new PopUpMessage(
            'Benefit Rule',
            'Benefit Rule',
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
                this.deleteProviderTypeRow();
            }
        });
    };

    deleteProviderTypeRow() {
        if (this.secWin && !this.secWin.hasDeletePermission() && !this.isSuperUser) {
            return;
        }
        const typeCode = this.providerTypeForm.value.typeOrSpecCode ? this.providerTypeForm.value.typeOrSpecCode : this.keyValue;
        if (typeCode) {
            this.provTypeMasterService.deleteProvTypeMaster(typeCode).subscribe(response => {
                for (let i = 0; i < this.provTypeMasters.length; i++) {
                    if (this.provTypeMasters[i].typeOrSpecCode == typeCode) {
                        this.provTypeMasters.splice(i, 1);
                        break;
                    }
                }
                this.dataGridGridOptions.api.setRowData(this.provTypeMasters);
                if (this.provTypeMasters && this.provTypeMasters.length > 0) {
                    this.dataGridGridOptions.api.selectIndex(0, false, false);
                    this.keyValue = this.provTypeMasters[0].typeOrSpecCode;
                } else {
                    this.keyValue = "";
                    this.dataGridGridOptions.api.setRowData([]);
                }

                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
                this.popupClose = false;
            });
        }
    };

    isFormValidateStatus = () => {
        this.providerTypeForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
