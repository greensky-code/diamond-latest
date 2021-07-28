/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../shared/validators/number.validator';
import { CustomValidators } from '../../shared/validators/custom-validator';
import { Mask } from '../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../shared/config';
import { Form } from '../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  UserDefinedText } from "../../api-models/index"
import {  UserDefinedTextService } from "../../api-services/user-defined-text.service"
import {  UserDefinedValdtCodes } from "../../api-models/index"
import {  UserDefinedValdtCodesService } from "../../api-services/user-defined-valdt-codes.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the UserDefinedFieldsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'userdefinedfields',
    templateUrl: './user-defined-fields.component.html',

})
export class UserDefinedFieldsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    userDefinedFieldsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

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

editUserDefinedText: boolean;
    userDefinedText: UserDefinedText;
    userDefinedTexts: UserDefinedText[];editUserDefinedValdtCodes: boolean;
    userDefinedValdtCodes: UserDefinedValdtCodes;
    userDefinedValdtCodeses: UserDefinedValdtCodes[];
    if (this.secWin.hasInsertPermission()) {
        createUserDefinedText() {
            this.formValidation.validateForm();
            if(this.userDefinedFieldsForm.valid) {
                let userDefinedText = new UserDefinedText();
                userDefinedText.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
                userDefinedText.userDefineText = Form.getValue(this.userDefinedFieldsForm, 'userDefinedText');
                userDefinedText.userDefineRequired = Form.getValue(this.userDefinedFieldsForm, 'userDefinedRequired');
                userDefinedText.userDefineValidateFlag = Form.getValue(this.userDefinedFieldsForm, 'userDefinedValidate');
                this.userDefinedTextService.createUserDefinedText(userDefinedText).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editUserDefinedText = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateUserDefinedText(languageId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.userDefinedFieldsForm.valid) {
            let userDefinedText = new UserDefinedText();
            userDefinedText.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            userDefinedText.userDefineText = Form.getValue(this.userDefinedFieldsForm, 'userDefinedText');
            userDefinedText.userDefineRequired = Form.getValue(this.userDefinedFieldsForm, 'userDefinedRequired');
            userDefinedText.userDefineValidateFlag = Form.getValue(this.userDefinedFieldsForm, 'userDefinedValidate');
            this.userDefinedTextService.updateUserDefinedText(userDefinedText, languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editUserDefinedText = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveUserDefinedText() {
        if(this.editUserDefinedText) {
            this.updateUserDefinedText(this.userDefinedText.languageId)
        } else {
            this.createUserDefinedText();
        }
    }    deleteUserDefinedText(languageId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.userDefinedTextService.deleteUserDefinedText(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getUserDefinedText(languageId : number) {
        this.userDefinedTextService.getUserDefinedText(languageId).subscribe(userDefinedText => {
            this.userDefinedText = userDefinedText;
            this.userDefinedFieldsForm.patchValue({
                'languageId': this.userDefinedText.languageId,
                'userDefinedText': this.userDefinedText.userDefineText,
                'userDefinedRequired': this.userDefinedText.userDefineRequired,
                'userDefinedValidate': this.userDefinedText.userDefineValidateFlag,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getUserDefinedTexts() {
        this.userDefinedTextService.getUserDefinedTexts().subscribe(userDefinedTexts => {
        this.userDefinedTexts = userDefinedTexts;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createUserDefinedValdtCodes() {
            this.formValidation.validateForm();
            if(this.userDefinedFieldsForm.valid) {
                let userDefinedValdtCodes = new UserDefinedValdtCodes();
                userDefinedValdtCodes.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
                this.userDefinedValdtCodesService.createUserDefinedValdtCodes(userDefinedValdtCodes).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editUserDefinedValdtCodes = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateUserDefinedValdtCodes(languageId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.userDefinedFieldsForm.valid) {
            let userDefinedValdtCodes = new UserDefinedValdtCodes();
            userDefinedValdtCodes.languageId = Form.getValue(this.userDefinedFieldsForm, 'languageId');
            this.userDefinedValdtCodesService.updateUserDefinedValdtCodes(userDefinedValdtCodes, languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editUserDefinedValdtCodes = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveUserDefinedValdtCodes() {
        if(this.editUserDefinedValdtCodes) {
            this.updateUserDefinedValdtCodes(this.userDefinedValdtCodes.languageId)
        } else {
            this.createUserDefinedValdtCodes();
        }
    }    deleteUserDefinedValdtCodes(languageId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.userDefinedValdtCodesService.deleteUserDefinedValdtCodes(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getUserDefinedValdtCodes(languageId : number) {
        this.userDefinedValdtCodesService.getUserDefinedValdtCodes(languageId).subscribe(userDefinedValdtCodes => {
            this.userDefinedValdtCodes = userDefinedValdtCodes;
            this.userDefinedFieldsForm.patchValue({
                'languageId': this.userDefinedValdtCodes.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getUserDefinedValdtCodeses() {
        this.userDefinedValdtCodesService.getUserDefinedValdtCodeses().subscribe(userDefinedValdtCodeses => {
        this.userDefinedValdtCodeses = userDefinedValdtCodeses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Win ID",
             field: "winid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Determinant ID",
             field: "datawindowid",
             width: 200         },
         {
             headerName: "User Defined Text Name",
             field: "userdefinetextname",
             width: 200         },
         {
             headerName: "User Defined Text",
             field: "userdefinetext",
             width: 200         },
         {
             headerName: "User Def Req",
             field: "userdefinerequired",
             width: 200         },
         {
             headerName: "User Def Vld",
             field: "userdefinevalidateflag",
             width: 200         },
         {
             headerName: "Max Len",
             field: "maxlen",
             width: 200         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "User Valid Code",
             field: "uservalidcode",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Short Descripton",
             field: "",
             width: 200         },
         {
             headerName: "Long Description",
             field: "",
             width: 200         }
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
     private userDefinedTextService: UserDefinedTextService, private userDefinedValdtCodesService: UserDefinedValdtCodesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.userDefinedFieldsForm);
         this.createDataGrid001();
         this.createDataGrid002();
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

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let useId = null;
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

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.userDefinedFieldsForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.userDefinedFieldsForm = this.formBuilder.group({
            languageId: ['', {updateOn: 'blur', validators: [] }],
            userDefinedText: ['', {updateOn: 'blur', validators: [] }],
            userDefinedRequired: ['', {updateOn: 'blur', validators: [] }],
            userDefinedValidate: ['', {updateOn: 'blur', validators: [] }],
            thruValidCode: ['', {updateOn: 'blur', validators: [] }],
            shortDescription: ['', {updateOn: 'blur', validators: [] }],
            longDescription: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}