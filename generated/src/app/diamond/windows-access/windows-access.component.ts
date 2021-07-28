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
import {  SecUser } from "../../api-models/index"
import {  SecUserService } from "../../api-services/sec-user.service"
import {  SecWin } from "../../api-models/index"
import {  SecWinService } from "../../api-services/sec-win.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the WindowsAccessComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'windowsaccess',
    templateUrl: './windows-access.component.html',

})
export class WindowsAccessComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    windowsAccessForm: FormGroup;
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

editSecUser: boolean;
    secUser: SecUser;
    secUsers: SecUser[];editSecWin: boolean;
    secWin: SecWin;
    secWins: SecWin[];
    if (this.secWin.hasInsertPermission()) {
        createSecUser() {
            this.formValidation.validateForm();
            if(this.windowsAccessForm.valid) {
                let secUser = new SecUser();
                secUser.userId = Form.getValue(this.windowsAccessForm, 'userId');
                secUser.fname = Form.getValue(this.windowsAccessForm, 'name');
                secUser.userType = Form.getValue(this.windowsAccessForm, 'userType');
                secUser.dfltTemplate = Form.getValue(this.windowsAccessForm, 'department');
                secUser.usrLocation = Form.getValue(this.windowsAccessForm, 'location');
                this.secUserService.createSecUser(secUser).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSecUser = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateSecUser(userId : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.windowsAccessForm.valid) {
            let secUser = new SecUser();
            secUser.userId = Form.getValue(this.windowsAccessForm, 'userId');
            secUser.fname = Form.getValue(this.windowsAccessForm, 'name');
            secUser.userType = Form.getValue(this.windowsAccessForm, 'userType');
            secUser.dfltTemplate = Form.getValue(this.windowsAccessForm, 'department');
            secUser.usrLocation = Form.getValue(this.windowsAccessForm, 'location');
            this.secUserService.updateSecUser(secUser, userId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editSecUser = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveSecUser() {
        if(this.editSecUser) {
            this.updateSecUser(this.secUser.userId)
        } else {
            this.createSecUser();
        }
    }    deleteSecUser(userId : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.secUserService.deleteSecUser(userId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getSecUser(userId : string) {
        this.secUserService.getSecUser(userId).subscribe(secUser => {
            this.secUser = secUser;
            this.windowsAccessForm.patchValue({
                'userId': this.secUser.userId,
                'name': this.secUser.fname,
                'userType': this.secUser.userType,
                'department': this.secUser.dfltTemplate,
                'location': this.secUser.usrLocation,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getSecUsers() {
        this.secUserService.getSecUsers().subscribe(secUsers => {
        this.secUsers = secUsers;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createSecWin() {
            this.formValidation.validateForm();
            if(this.windowsAccessForm.valid) {
                let secWin = new SecWin();
                secWin.userId = Form.getValue(this.windowsAccessForm, 'userId');
                this.secWinService.createSecWin(secWin).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSecWin = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateSecWin(winId : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.windowsAccessForm.valid) {
            let secWin = new SecWin();
            secWin.userId = Form.getValue(this.windowsAccessForm, 'userId');
            this.secWinService.updateSecWin(secWin, winId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editSecWin = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveSecWin() {
        if(this.editSecWin) {
            this.updateSecWin(this.secWin.winId)
        } else {
            this.createSecWin();
        }
    }    deleteSecWin(winId : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.secWinService.deleteSecWin(winId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getSecWin(winId : string) {
        this.secWinService.getSecWin(winId).subscribe(secWin => {
            this.secWin = secWin;
            this.windowsAccessForm.patchValue({
                'userId': this.secWin.userId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getSecWins() {
        this.secWinService.getSecWins().subscribe(secWins => {
        this.secWins = secWins;
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
             headerName: "Win ID",
             field: "winid",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "P Sel",
             field: "psel",
             width: 200         },
         {
             headerName: "P Ins",
             field: "pins",
             width: 200         },
         {
             headerName: "P Upd",
             field: "pupd",
             width: 200         },
         {
             headerName: "P Del",
             field: "pdel",
             width: 200         },
         {
             headerName: "Max Open",
             field: "maxopen",
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
     private secUserService: SecUserService, private secWinService: SecWinService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.windowsAccessForm);
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
        this.formValidation = new FormValidation(this.windowsAccessForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.windowsAccessForm = this.formBuilder.group({
            userId: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            userType: ['', {updateOn: 'blur', validators: [] }],
            department: ['', {updateOn: 'blur', validators: [] }],
            location: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}