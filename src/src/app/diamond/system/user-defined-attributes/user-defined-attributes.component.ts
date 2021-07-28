/* Copyright (c) 2021 . All Rights Reserved. */

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from "ag-grid-community";
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { Country, MessageMasterDtl, SecUser, SecWin, UserDefinedAttributes } from "../../../api-models/index";
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { MessageMasterDtlService } from "../../../api-services";
import { CountryService } from '../../../api-services/country.service';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecUserService } from '../../../api-services/security/sec-user.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { UserDefinedAttributesService } from "../../../api-services/user-defined-attributes.service";
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { Menu } from '../../../shared/models/models';
import { SecurityService } from '../../../shared/services/security.service';
import { getUDATTShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { LanguageSelectComponent } from '../../support/language-select/language-select.component';
// Use the Component directive to define the UserDefinedAttributesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'userdefinedattributes',
    templateUrl: './user-defined-attributes.component.html',
    styleUrls: ['./user-defined-attributes.component.scss'],
    providers:[UserDefinedAttributesService, LanguageMasterService ]

})
export class UserDefinedAttributesComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit(): void {
        this.shortcuts.push(...getUDATTShortcutKeys(this));
        this.cdr.detectChanges();
    }

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    userDefinedAttributesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'UDATT';
    public isSuperUser = false;
    private userTemplateId:string;
    secColDetails = new Array<SecColDetail>();
    countriesList:Country[];
    rowSelectedIndex: number;

    ifShowCountryFields:boolean=false;
    ifShowPanel3:boolean =false;
    showFieldLabel:boolean= false;
    showValidLength:boolean = false;
    menu:Menu[];
    ifFormHasChanges:boolean=false;
    @Input() showIcon:boolean = true;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    editUserDefinedAttributes: boolean;
    userDefinedAttributes: UserDefinedAttributes;
    userDefinedAttributeses: UserDefinedAttributes[];

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes'){
            console.log("button yes has been click!");
        }
        if(button.name == 'no'){
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

    createUserDefinedAttributes() {
        this.formValidation.validateForm();
        if(this.userDefinedAttributesForm.valid) {
            let columnCategory = Form.getValue(this.userDefinedAttributesForm, 'columnCategory');
            if(columnCategory) {
                columnCategory = columnCategory.substr(0, 1);
            }
            let userDefinedAttributes = new UserDefinedAttributes();
            userDefinedAttributes.activated = Form.getValue(this.userDefinedAttributesForm, 'activated');
            userDefinedAttributes.winId = Form.getValue(this.userDefinedAttributesForm, 'winId');
            userDefinedAttributes.datawindowId = Form.getValue(this.userDefinedAttributesForm, 'dataWindowId');
            userDefinedAttributes.columnName = Form.getValue(this.userDefinedAttributesForm, 'columnName');
            userDefinedAttributes.columnCategory = columnCategory;
            userDefinedAttributes.userDefinedRequired = Form.getValue(this.userDefinedAttributesForm, 'required');
            userDefinedAttributes.userDefinedValidLengths = Form.getValue(this.userDefinedAttributesForm, 'validLength');
            userDefinedAttributes.userDefinedDisplayMask = Form.getValue(this.userDefinedAttributesForm, 'displayMask');
            userDefinedAttributes.languageId = Form.getValue(this.userDefinedAttributesForm, 'langaugeId');
            userDefinedAttributes.userDefinedFieldLabel =Form.getValue(this.userDefinedAttributesForm, 'userDefinedFieldLabel');
            userDefinedAttributes.userDefinedEnableCountry =Form.getValue(this.userDefinedAttributesForm, 'userDefinedEnableCountry');
            userDefinedAttributes.userDefinedDefaultCountry =Form.getValue(this.userDefinedAttributesForm, 'userDefinedDefaultCountry');                
            this.userDefinedAttributesService.createUserDefinedAttributes(userDefinedAttributes).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editUserDefinedAttributes = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }


    updateUserDefinedAttributes() {
       // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.userDefinedAttributesForm.valid) {
            let columnCategory = Form.getValue(this.userDefinedAttributesForm, 'columnCategory');
            if(columnCategory) {
                columnCategory = columnCategory.substr(0, 1);
            }
            let userDefinedAttributes = new UserDefinedAttributes();
            userDefinedAttributes.activated = Form.getValue(this.userDefinedAttributesForm, 'activated');
             userDefinedAttributes.winId = Form.getValue(this.userDefinedAttributesForm, 'winId');
            userDefinedAttributes.datawindowId = Form.getValue(this.userDefinedAttributesForm, 'dataWindowId');
            userDefinedAttributes.columnName = Form.getValue(this.userDefinedAttributesForm, 'columnName');
            userDefinedAttributes.columnCategory = columnCategory;
            userDefinedAttributes.userDefinedRequired = Form.getValue(this.userDefinedAttributesForm, 'required');
            userDefinedAttributes.userDefinedValidLengths = Form.getValue(this.userDefinedAttributesForm, 'validLength');
            userDefinedAttributes.userDefinedDisplayMask = Form.getValue(this.userDefinedAttributesForm, 'displayMask');
            userDefinedAttributes.languageId = Form.getValue(this.userDefinedAttributesForm, 'langaugeId');
            userDefinedAttributes.userDefinedFieldLabel =(Form.getValue(this.userDefinedAttributesForm, 'userDefinedFieldLabel') ? Form.getValue(this.userDefinedAttributesForm, 'userDefinedFieldLabel') : null) ;
            userDefinedAttributes.userDefinedEnableCountry =Form.getValue(this.userDefinedAttributesForm, 'userDefinedEnableCountry');
            userDefinedAttributes.userDefinedDefaultCountry =(Form.getValue(this.userDefinedAttributesForm, 'userDefinedDefaultCountry') ? Form.getValue(this.userDefinedAttributesForm, 'userDefinedDefaultCountry') : null);
            
            this.userDefinedAttributesService.updateUserDefinedAttributes(userDefinedAttributes, userDefinedAttributes.columnName, userDefinedAttributes.datawindowId, userDefinedAttributes.winId ).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editUserDefinedAttributes = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }

    saveUserDefinedAttributes() {
        if(this.editUserDefinedAttributes) {
            this.updateUserDefinedAttributes()
        } else {
            this.createUserDefinedAttributes();
        }
    }

    deleteUserDefinedAttributes(columnName : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.userDefinedAttributesService.deleteUserDefinedAttributes(columnName).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }
    getUserDefinedAttributes(columnName : string) {
        this.userDefinedAttributesService.getUserDefinedAttributes(columnName).subscribe(userDefinedAttributes => {
            this.userDefinedAttributes = userDefinedAttributes;
            this.userDefinedAttributesForm.patchValue({
                'activated': this.userDefinedAttributes.activated,
                'winId': this.userDefinedAttributes.winId,
                'dataWindowId': this.userDefinedAttributes.datawindowId,
                'columnName': this.userDefinedAttributes.columnName,
                'columnCategory': this.userDefinedAttributes.columnCategory,
                'required': this.userDefinedAttributes.userDefinedRequired,
                'validLength': this.userDefinedAttributes.userDefinedValidLengths,
                'displayMask': this.userDefinedAttributes.userDefinedDisplayMask,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    getUserDefinedAttributeses() {
        this.userDefinedAttributesService.getUserDefinedAttributeses().subscribe(userDefinedAttributeses => {
            userDefinedAttributeses.sort((a, b) => {
                return a['userDefinedAttributesPrimaryKey']['winId'] > b['userDefinedAttributesPrimaryKey']['winId'] ? 1 : -1
            });
        this.userDefinedAttributeses = userDefinedAttributeses;
        this.dataGridGridOptions.api.setRowData(this.userDefinedAttributeses);
        this.dataGridGridOptions.api.selectIndex(0,false, false);
        this.rowSelectedIndex = 0;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    dataGridGridOptionsExportCsv() {
        var params = {
    };
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
             headerName: "Activated",
             field: "activated",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
            headerName: "Win ID",
            field: "userDefinedAttributesPrimaryKey.winId",
            width: 200
        },
        {
            headerName: "Data Window ID",
            field: "userDefinedAttributesPrimaryKey.datawindowId",
            width: 200
        },
        {
            headerName: "Column Name",
            field: "userDefinedAttributesPrimaryKey.columnName",
            width: 200
        },
        {
            headerName: "Column Category",
            field: "columnCategory",
            width: 200
        },
        {
            headerName: "Field Label",
            field: "userDefinedFieldLabel",
            width: 200
        },
        {
            headerName: "Display Mask",
            field: "userDefinedDisplayMask",
            width: 200
        },
        {
            headerName: "Valid Lengths",
            field: "userDefinedValidLengths",
            width: 200
        },
        {
            headerName: "Required",
            field: "userDefinedRequired",
            width: 200,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true
        },
        {
            headerName: "Enable Country",
            field: "userDefinedEnableCountry",
            width: 200,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true
        },
        {
            headerName: "Default Country",
            field: "userDefinedDefaultCountry",
            width: 200
        }
    ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private alertMessageService: AlertMessageService,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private userDefinedAttributesService: UserDefinedAttributesService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private countryService: CountryService,
        private toastService:ToastService,
        private languageMasterService: LanguageMasterService,
        public activeModal: NgbActiveModal,
        public cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
     ) {    }

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

    private initializePermission(): void {
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
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
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
                } else {
                    this.showPopUp(
                        'You are not Permitted to view MEMBER COB History',
                        'MEMBER COB History Permission'
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
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_OTHER_COVERAGE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });

    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.userDefinedAttributesForm);
         this.createDataGrid();
         this.getUserDefinedAttributeses();
         this.getCountryDDl();
         this.getLanguages();
         this.menuInit();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.userDefinedAttributesForm = this.formBuilder.group({
            activated: ['', {updateOn: 'blur', validators: [] }],
            winId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            dataWindowId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            columnName: ['', {updateOn: 'blur', validators: [Validators.required]}],
            columnCategory: ['',{updateOn: 'blur', validators: [Validators.required]}],
            required: ['', {updateOn: 'blur', validators: [] }],
            langaugeId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            languageDescription: ['', {updateOn: 'blur', validators: [] }],
            validLength: ['', {updateOn: 'blur', validators: [] }],
            displayMask: ['', {updateOn: 'blur', validators: [] }],
            userDefinedFieldLabel:['', {updateOn: 'blur', validators: [] }],
            userDefinedEnableCountry:['', {updateOn: 'blur', validators: [] }],
            userDefinedDefaultCountry:['', {updateOn: 'blur', validators: [] }],
        }, {updateOn: 'submit'});

        this.userDefinedAttributesForm.valueChanges.subscribe(formValues  => {

           this.ifFormHasChanges = true;
          })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onRowSelectedGrid(event: any)
    {
        if (!event.node.selected) {
            return;
        }
        this.rowSelectedIndex = event.rowIndex;
        if(this.dataGridGridOptions.api.getSelectedRows().length>0){            
            this.setFormData(event.data);
        }
    }

    changeStatus(event: any, fieldName: any) {
        this.dataGridGridOptions.api.setRowData([]);
        let checkedValue = event.target.checked == true ? 'Y' : 'N';
        if (fieldName == 'activate'){
            this.userDefinedAttributeses[this.rowSelectedIndex].activated = checkedValue;
        } else if(fieldName == 'required') {
            this.userDefinedAttributeses[this.rowSelectedIndex].userDefinedRequired = checkedValue;
        } else {
            this.userDefinedAttributeses[this.rowSelectedIndex].userDefinedEnableCountry = checkedValue;
        }
        this.dataGridGridOptions.api.setRowData(this.userDefinedAttributeses);
        this.dataGridGridOptions.api.selectIndex(this.rowSelectedIndex,false, false);
        this.dataGridGridOptions.api.ensureIndexVisible(this.rowSelectedIndex);
    }

    setFormData(userDefinedAttributes:UserDefinedAttributes){
        this.editUserDefinedAttributes = true;
        let columnCategory = ''
        if (userDefinedAttributes.columnCategory == 'P') {
            columnCategory = userDefinedAttributes.columnCategory + ' - Phone Number'
        }
        if (userDefinedAttributes.columnCategory == 'C') {
            columnCategory = userDefinedAttributes.columnCategory + ' - Country'
        }
        if (userDefinedAttributes.columnCategory == 'S') {
            columnCategory = userDefinedAttributes.columnCategory + ' - State'
        }
        if (userDefinedAttributes.columnCategory == 'Z') {
            columnCategory = userDefinedAttributes.columnCategory + ' - Zip Code'
        }
        this.userDefinedAttributesForm.patchValue({
            'activated': userDefinedAttributes.activated === 'Y',
            'winId': userDefinedAttributes['userDefinedAttributesPrimaryKey'].winId,
            'dataWindowId': userDefinedAttributes['userDefinedAttributesPrimaryKey'].datawindowId,
            'columnName': userDefinedAttributes['userDefinedAttributesPrimaryKey'].columnName,
            'columnCategory': columnCategory,
            'required': userDefinedAttributes.userDefinedRequired === 'Y',
            'validLength': userDefinedAttributes.userDefinedValidLengths ? userDefinedAttributes.userDefinedValidLengths : 87,
            'displayMask': userDefinedAttributes.userDefinedDisplayMask ? userDefinedAttributes.userDefinedDisplayMask : 'HUKG',
            'userDefinedFieldLabel': userDefinedAttributes.userDefinedFieldLabel,
            'userDefinedEnableCountry': userDefinedAttributes.userDefinedEnableCountry === 'Y',

        },{ emitEvent: false } );

        if(userDefinedAttributes.languageId){
            let language= this.languages.filter((lang: any) => lang.languageId ==userDefinedAttributes.languageId);
            this.userDefinedAttributesForm.controls['langaugeId'].setValue(language.langaugeId,{ emitEvent: false });
            this.userDefinedAttributesForm.controls['languageDescription'].setValue(language.description,{ emitEvent: false });
        }
        else{
            this.userDefinedAttributesForm.controls['langaugeId'].setValue(0,{ emitEvent: false });
            this.userDefinedAttributesForm.controls['languageDescription'].setValue('American',{ emitEvent: false });
        }
        this.userDefinedAttributesForm.controls['userDefinedDefaultCountry'].setValue(userDefinedAttributes.userDefinedDefaultCountry,{ emitEvent: false });

        if(userDefinedAttributes.columnCategory=='P' || userDefinedAttributes.columnCategory=='S'|| userDefinedAttributes.columnCategory=='Z'){

            this.ifShowPanel3 =true;
            this.ifShowCountryFields = false;

            this.showFieldLabel=true;
            this.showValidLength=true;

            if(userDefinedAttributes.columnCategory=='P')
            {

                this.showFieldLabel=false;
            }
            else if(userDefinedAttributes.columnCategory=='S')
            {

                this.showValidLength=false;
            }
        }
        else if(userDefinedAttributes.columnCategory=='C')
        {
            this.ifShowCountryFields =true;
            this.ifShowPanel3 =false;

        }
        this.isFormDataModified()
    }


    getCountryDDl()
    {
        this.countryService.getCountrys().subscribe(res =>{
            this.countriesList = res.sort((a, b) => (a.country > b.country) ? 1 : -1);
        });
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {
            // handle File actions
            switch (event.action) {
                case 'New': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Open': {
                    this.toastService.showToast(
                        'Action is not valid',
                        NgbToastType.Danger
                    );
                    break;
                }
                case 'Save': {
                   this.saveUserDefinedAttributes();
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
            // this.handleEditMenu(event.action)
        } else if (event.menu.menuItem === 'Special') {
          switch(event.action)
          {
              case 'Language':
                this.OpenLanguageMenu();
                break;
          }
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
                    {name: 'New'},
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
                    {isHorizontal: true}
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Language' },
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
                    {name: '1 Main Menu'},
                    {name: '2 GL Assignment'}]
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


    OpenLanguageMenu() {

            let ref = this.modalService.open(LanguageSelectComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.languageSelected.subscribe((selectedLang: any) => {

                let language= this.languages.filter((lang: any) => lang.languageId ==selectedLang);
                this.userDefinedAttributesForm.controls['langaugeId'].setValue(language.langaugeId,{ emitEvent: false });
                this.userDefinedAttributesForm.controls['languageDescription'].setValue(language.description,{ emitEvent: false });
            })

    }

    languages:any;
    getLanguages =()=>{

        this.languageMasterService.getLanguageMasters().subscribe(languages =>{
            this.languages = languages;
        })
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'User Defined Attributes')
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveUserDefinedAttributes()
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
        this.userDefinedAttributesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
