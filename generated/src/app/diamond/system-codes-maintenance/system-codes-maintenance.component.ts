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
import {  SystemCodeToken } from "../../api-models/index"
import {  SystemCodeTokenService } from "../../api-services/system-code-token.service"
import {  SystemCodes } from "../../api-models/index"
import {  SystemCodesService } from "../../api-services/system-codes.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the SystemCodesMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'systemcodesmaintenance',
    templateUrl: './system-codes-maintenance.component.html',

})
export class SystemCodesMaintenanceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    systemCodesMaintenanceForm: FormGroup;
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

editSystemCodeToken: boolean;
    systemCodeToken: SystemCodeToken;
    systemCodeTokens: SystemCodeToken[];editSystemCodes: boolean;
    systemCodes: SystemCodes;
    systemCodeses: SystemCodes[];
    if (this.secWin.hasInsertPermission()) {
        createSystemCodeToken() {
            this.formValidation.validateForm();
            if(this.systemCodesMaintenanceForm.valid) {
                let systemCodeToken = new SystemCodeToken();
                systemCodeToken.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodeToken.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                systemCodeToken.languageId = Form.getValue(this.systemCodesMaintenanceForm, 'language');
                this.systemCodeTokenService.createSystemCodeToken(systemCodeToken).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSystemCodeToken = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateSystemCodeToken(languageId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.systemCodesMaintenanceForm.valid) {
            let systemCodeToken = new SystemCodeToken();
            systemCodeToken.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
            systemCodeToken.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
            systemCodeToken.languageId = Form.getValue(this.systemCodesMaintenanceForm, 'language');
            this.systemCodeTokenService.updateSystemCodeToken(systemCodeToken, languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editSystemCodeToken = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveSystemCodeToken() {
        if(this.editSystemCodeToken) {
            this.updateSystemCodeToken(this.systemCodeToken.languageId)
        } else {
            this.createSystemCodeToken();
        }
    }    deleteSystemCodeToken(languageId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemCodeTokenService.deleteSystemCodeToken(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getSystemCodeToken(languageId : number) {
        this.systemCodeTokenService.getSystemCodeToken(languageId).subscribe(systemCodeToken => {
            this.systemCodeToken = systemCodeToken;
            this.systemCodesMaintenanceForm.patchValue({
                'systemCodeType': this.systemCodeToken.systemCodeType,
                'systemCode': this.systemCodeToken.systemCode,
                'language': this.systemCodeToken.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getSystemCodeTokens() {
        this.systemCodeTokenService.getSystemCodeTokens().subscribe(systemCodeTokens => {
        this.systemCodeTokens = systemCodeTokens;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createSystemCodes() {
            this.formValidation.validateForm();
            if(this.systemCodesMaintenanceForm.valid) {
                let systemCodes = new SystemCodes();
                systemCodes.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
                systemCodes.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
                this.systemCodesService.createSystemCodes(systemCodes).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSystemCodes = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateSystemCodes(systemCodeType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.systemCodesMaintenanceForm.valid) {
            let systemCodes = new SystemCodes();
            systemCodes.systemCodeType = Form.getValue(this.systemCodesMaintenanceForm, 'systemCodeType');
            systemCodes.systemCode = Form.getValue(this.systemCodesMaintenanceForm, 'systemCode');
            this.systemCodesService.updateSystemCodes(systemCodes, systemCodeType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editSystemCodes = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveSystemCodes() {
        if(this.editSystemCodes) {
            this.updateSystemCodes(this.systemCodes.systemCodeType)
        } else {
            this.createSystemCodes();
        }
    }    deleteSystemCodes(systemCodeType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemCodesService.deleteSystemCodes(systemCodeType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getSystemCodes(systemCodeType : string) {
        this.systemCodesService.getSystemCodes(systemCodeType).subscribe(systemCodes => {
            this.systemCodes = systemCodes;
            this.systemCodesMaintenanceForm.patchValue({
                'systemCodeType': this.systemCodes.systemCodeType,
                'systemCode': this.systemCodes.systemCode,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getSystemCodeses() {
        this.systemCodesService.getSystemCodeses().subscribe(systemCodeses => {
        this.systemCodeses = systemCodeses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

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
             headerName: "Sys Code Type",
             field: "systemcodetype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Sys Code",
             field: "systemcode",
             width: 200         },
         {
             headerName: "Short Description",
             field: "",
             width: 200         },
         {
             headerName: "Long Description",
             field: "",
             width: 200         },
         {
             headerName: "Modify",
             field: "",
             width: 200         },
         {
             headerName: "Activated",
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
     private systemCodeTokenService: SystemCodeTokenService, private systemCodesService: SystemCodesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.systemCodesMaintenanceForm);
         this.createDataGrid();
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
        this.formValidation = new FormValidation(this.systemCodesMaintenanceForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.systemCodesMaintenanceForm = this.formBuilder.group({
            systemCodeType: ['', {updateOn: 'blur', validators: [] }],
            systemCode: ['', {updateOn: 'blur', validators: [] }],
            activated: ['', {updateOn: 'blur', validators: [] }],
            language: ['', {updateOn: 'blur', validators: [] }],
            shortDescription: ['', {updateOn: 'blur', validators: [] }],
            longDescription: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}