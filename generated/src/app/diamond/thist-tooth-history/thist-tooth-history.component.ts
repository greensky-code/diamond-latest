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
import {  ToothHistory } from "../../api-models/index"
import {  ToothHistoryService } from "../../api-services/tooth-history.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ThistToothHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'thisttoothhistory',
    templateUrl: './thist-tooth-history.component.html',

})
export class ThistToothHistoryComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    thistToothHistoryForm: FormGroup;
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

editToothHistory: boolean;
    toothHistory: ToothHistory;
    toothHistorys: ToothHistory[];
    if (this.secWin.hasInsertPermission()) {
        createToothHistory() {
            this.formValidation.validateForm();
            if(this.thistToothHistoryForm.valid) {
                let toothHistory = new ToothHistory();
                toothHistory.dateOfService = Form.getValue(this.thistToothHistoryForm, 'dateOfServices');
                toothHistory.toothNumber = Form.getValue(this.thistToothHistoryForm, 'toothNumber');
                toothHistory.procedureCode = Form.getValue(this.thistToothHistoryForm, 'procedure');
                toothHistory.seqProvId = Form.getValue(this.thistToothHistoryForm, 'provider');
                toothHistory.benefitPackageId = Form.getValue(this.thistToothHistoryForm, 'benefitPackage');
                toothHistory.quadrant = Form.getValue(this.thistToothHistoryForm, 'quadrant');
                toothHistory.oralCavity = Form.getValue(this.thistToothHistoryForm, 'oralCavity');
                toothHistory.toothStatus = Form.getValue(this.thistToothHistoryForm, 'toothStatus');
                toothHistory.userDefined1 = Form.getValue(this.thistToothHistoryForm, 'userDefined1');
                toothHistory.userDate1 = Form.getValue(this.thistToothHistoryForm, 'userDate1');
                toothHistory.userDefined2 = Form.getValue(this.thistToothHistoryForm, 'userDefined2');
                toothHistory.userDate2 = Form.getValue(this.thistToothHistoryForm, 'userDate2');
                this.toothHistoryService.createToothHistory(toothHistory).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editToothHistory = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateToothHistory(seqToothHistoryId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.thistToothHistoryForm.valid) {
            let toothHistory = new ToothHistory();
            toothHistory.dateOfService = Form.getValue(this.thistToothHistoryForm, 'dateOfServices');
            toothHistory.toothNumber = Form.getValue(this.thistToothHistoryForm, 'toothNumber');
            toothHistory.procedureCode = Form.getValue(this.thistToothHistoryForm, 'procedure');
            toothHistory.seqProvId = Form.getValue(this.thistToothHistoryForm, 'provider');
            toothHistory.benefitPackageId = Form.getValue(this.thistToothHistoryForm, 'benefitPackage');
            toothHistory.quadrant = Form.getValue(this.thistToothHistoryForm, 'quadrant');
            toothHistory.oralCavity = Form.getValue(this.thistToothHistoryForm, 'oralCavity');
            toothHistory.toothStatus = Form.getValue(this.thistToothHistoryForm, 'toothStatus');
            toothHistory.userDefined1 = Form.getValue(this.thistToothHistoryForm, 'userDefined1');
            toothHistory.userDate1 = Form.getValue(this.thistToothHistoryForm, 'userDate1');
            toothHistory.userDefined2 = Form.getValue(this.thistToothHistoryForm, 'userDefined2');
            toothHistory.userDate2 = Form.getValue(this.thistToothHistoryForm, 'userDate2');
            this.toothHistoryService.updateToothHistory(toothHistory, seqToothHistoryId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editToothHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveToothHistory() {
        if(this.editToothHistory) {
            this.updateToothHistory(this.toothHistory.seqToothHistoryId)
        } else {
            this.createToothHistory();
        }
    }    deleteToothHistory(seqToothHistoryId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.toothHistoryService.deleteToothHistory(seqToothHistoryId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getToothHistory(seqToothHistoryId : number) {
        this.toothHistoryService.getToothHistory(seqToothHistoryId).subscribe(toothHistory => {
            this.toothHistory = toothHistory;
            this.thistToothHistoryForm.patchValue({
                'dateOfServices': this.dateFormatPipe.defaultDisplayDateFormat(this.toothHistory.dateOfService),
                'toothNumber': this.toothHistory.toothNumber,
                'procedure': this.toothHistory.procedureCode,
                'provider': this.toothHistory.seqProvId,
                'benefitPackage': this.toothHistory.benefitPackageId,
                'quadrant': this.toothHistory.quadrant,
                'oralCavity': this.toothHistory.oralCavity,
                'toothStatus': this.toothHistory.toothStatus,
                'userDefined1': this.toothHistory.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.toothHistory.userDate1),
                'userDefined2': this.toothHistory.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.toothHistory.userDate2),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getToothHistorys() {
        this.toothHistoryService.getToothHistorys().subscribe(toothHistorys => {
        this.toothHistorys = toothHistorys;
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
             headerName: "T#",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "S1",
             field: "",
             width: 200         },
         {
             headerName: "S2",
             field: "",
             width: 200         },
         {
             headerName: "S3",
             field: "",
             width: 200         },
         {
             headerName: "S4",
             field: "",
             width: 200         },
         {
             headerName: "S5",
             field: "",
             width: 200         },
         {
             headerName: "Arch",
             field: "arch",
             width: 200         },
         {
             headerName: "Quad",
             field: "quadrant",
             width: 200         },
         {
             headerName: "O Cav",
             field: "oralcavity",
             width: 200         },
         {
             headerName: "DOS",
             field: "",
             width: 200         },
         {
             headerName: "Proc",
             field: "",
             width: 200         },
         {
             headerName: "Clm Num",
             field: "",
             width: 200         },
         {
             headerName: "Line No/Sub Line",
             field: "linenumber",
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
     private toothHistoryService: ToothHistoryService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.thistToothHistoryForm);
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
        this.formValidation = new FormValidation(this.thistToothHistoryForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.thistToothHistoryForm = this.formBuilder.group({
            dateOfServices: ['', {updateOn: 'blur', validators: [] }],
            toothNumber: ['', {updateOn: 'blur', validators: [] }],
            procedure: ['', {updateOn: 'blur', validators: [] }],
            s1: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            s2: ['', {updateOn: 'blur', validators: [] }],
            arch: ['', {updateOn: 'blur', validators: [] }],
            benefitPackage: ['', {updateOn: 'blur', validators: [] }],
            s3: ['', {updateOn: 'blur', validators: [] }],
            quadrant: ['', {updateOn: 'blur', validators: [] }],
            s4: ['', {updateOn: 'blur', validators: [] }],
            oralCavity: ['', {updateOn: 'blur', validators: [] }],
            s5: ['', {updateOn: 'blur', validators: [] }],
            toothStatus: ['', {updateOn: 'blur', validators: [] }],
            userDefined1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDefined2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}