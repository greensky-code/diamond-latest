/* Copyright (c) 2020 . All Rights Reserved. */

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
import {  ProvTypeMaster } from "../../api-models/index"
import {  ProvTypeMasterService } from "../../api-services/prov-type-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from "../../../../../src/src/app/view-model/security/sec-win-view-model";

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

    selector: 'providertype',
    templateUrl: './provider-type.component.html',

})
export class ProviderTypeComponent implements OnInit  {

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

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(){
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes','Yes', 'btn btn-primary'), new PopUpMessageButton('no','No', 'btn btn-primary')];
        this.child.showMesssage()
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

editProvTypeMaster: boolean;
    provTypeMaster: ProvTypeMaster;
    provTypeMasters: ProvTypeMaster[];
    if (this.secWin.hasInsertPermission()) {
        createProvTypeMaster() {
            this.formValidation.validateForm();
            if(this.providerTypeForm.valid) {
                let provTypeMaster = new ProvTypeMaster();
                provTypeMaster.typeOrSpecCode = Form.getValue(this.providerTypeForm, 'typeOrSpecCode');
                provTypeMaster.typeOrSpecialty = Form.getValue(this.providerTypeForm, 'typeOrSpecialty');
                provTypeMaster.shortDescription = Form.getValue(this.providerTypeForm, 'shortDescription');
                provTypeMaster.description = Form.getValue(this.providerTypeForm, 'description');
                provTypeMaster.autoAuditSpecCod = Form.getValue(this.providerTypeForm, 'autoAudit');
                this.provTypeMasterService.createProvTypeMaster(provTypeMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvTypeMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvTypeMaster(typeOrSpecCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerTypeForm.valid) {
            let provTypeMaster = new ProvTypeMaster();
            provTypeMaster.typeOrSpecCode = Form.getValue(this.providerTypeForm, 'typeOrSpecCode');
            provTypeMaster.typeOrSpecialty = Form.getValue(this.providerTypeForm, 'typeOrSpecialty');
            provTypeMaster.shortDescription = Form.getValue(this.providerTypeForm, 'shortDescription');
            provTypeMaster.description = Form.getValue(this.providerTypeForm, 'description');
            provTypeMaster.autoAuditSpecCod = Form.getValue(this.providerTypeForm, 'autoAudit');
            this.provTypeMasterService.updateProvTypeMaster(provTypeMaster, typeOrSpecCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvTypeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }    saveProvTypeMaster() {
        if(this.editProvTypeMaster) {
            this.updateProvTypeMaster(this.provTypeMaster.typeOrSpecCode)
        } else {
            this.createProvTypeMaster();
        }
    }    deleteProvTypeMaster(typeOrSpecCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provTypeMasterService.deleteProvTypeMaster(typeOrSpecCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvTypeMaster(typeOrSpecCode : string) {
        this.provTypeMasterService.getProvTypeMaster(typeOrSpecCode).subscribe(provTypeMaster => {
            this.provTypeMaster = provTypeMaster;
            this.providerTypeForm.patchValue({
                'typeOrSpecCode': this.provTypeMaster.typeOrSpecCode,
                'typeOrSpecialty': this.provTypeMaster.typeOrSpecialty,
                'shortDescription': this.provTypeMaster.shortDescription,
                'description': this.provTypeMaster.description,
                'autoAudit': this.provTypeMaster.autoAuditSpecCod,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvTypeMasters() {
        this.provTypeMasterService.getProvTypeMasters().subscribe(provTypeMasters => {
        this.provTypeMasters = provTypeMasters;
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
             headerName: "Type or Spec Code",
             field: "typeorspeccode",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Type or Specialty",
             field: "typeorspecialty",
             width: 200         },
         {
             headerName: "Description",
             field: "description",
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
     private provTypeMasterService: ProvTypeMasterService) {
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
    }

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
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
        }, error => {
            this.displaySaveError(error);
        });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerTypeForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerTypeForm = this.formBuilder.group({
            typeOrSpecCode: ['', {updateOn: 'blur', validators: [] }],
            typeOrSpecialty: ['', {updateOn: 'blur', validators: [] }],
            shortDescription: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            autoAudit: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
