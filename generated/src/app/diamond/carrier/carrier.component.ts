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
import {  CarrierMaster } from "../../api-models/index"
import {  CarrierMasterService } from "../../api-services/carrier-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the CarrierComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'carrier',
    templateUrl: './carrier.component.html',

})
export class CarrierComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    carrierForm: FormGroup;
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

editCarrierMaster: boolean;
    carrierMaster: CarrierMaster;
    carrierMasters: CarrierMaster[];
    if (this.secWin.hasInsertPermission()) {
        createCarrierMaster() {
            this.formValidation.validateForm();
            if(this.carrierForm.valid) {
                let carrierMaster = new CarrierMaster();
                carrierMaster.shortName = Form.getValue(this.carrierForm, 'shortName');
                carrierMaster.fullName1 = Form.getValue(this.carrierForm, 'fullName1');
                carrierMaster.country = Form.getValue(this.carrierForm, 'country001');
                carrierMaster.fullName2 = Form.getValue(this.carrierForm, 'fullName2');
                carrierMaster.state = Form.getValue(this.carrierForm, 'state');
                carrierMaster.addressLine1 = Form.getValue(this.carrierForm, 'address1001');
                carrierMaster.zipCode = Form.getValue(this.carrierForm, 'zip');
                carrierMaster.addressLine2 = Form.getValue(this.carrierForm, 'address1002');
                carrierMaster.county = Form.getValue(this.carrierForm, 'country002');
                carrierMaster.city = Form.getValue(this.carrierForm, 'city');
                carrierMaster.userDefined1 = Form.getValue(this.carrierForm, 'userDefined1001');
                carrierMaster.contactTitle = Form.getValue(this.carrierForm, 'title');
                carrierMaster.userDate1 = Form.getValue(this.carrierForm, 'userDate1001');
                carrierMaster.phoneNumber = Form.getValue(this.carrierForm, 'phone');
                carrierMaster.userDefined2 = Form.getValue(this.carrierForm, 'userDefined1002');
                carrierMaster.userDate2 = Form.getValue(this.carrierForm, 'userDate1002');
                carrierMaster.emailId = Form.getValue(this.carrierForm, 'emailId');
                carrierMaster.alDistMethod = Form.getValue(this.carrierForm, 'alDistMeth');
                this.carrierMasterService.createCarrierMaster(carrierMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editCarrierMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateCarrierMaster(carrierCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.carrierForm.valid) {
            let carrierMaster = new CarrierMaster();
            carrierMaster.shortName = Form.getValue(this.carrierForm, 'shortName');
            carrierMaster.fullName1 = Form.getValue(this.carrierForm, 'fullName1');
            carrierMaster.country = Form.getValue(this.carrierForm, 'country001');
            carrierMaster.fullName2 = Form.getValue(this.carrierForm, 'fullName2');
            carrierMaster.state = Form.getValue(this.carrierForm, 'state');
            carrierMaster.addressLine1 = Form.getValue(this.carrierForm, 'address1001');
            carrierMaster.zipCode = Form.getValue(this.carrierForm, 'zip');
            carrierMaster.addressLine2 = Form.getValue(this.carrierForm, 'address1002');
            carrierMaster.county = Form.getValue(this.carrierForm, 'country002');
            carrierMaster.city = Form.getValue(this.carrierForm, 'city');
            carrierMaster.userDefined1 = Form.getValue(this.carrierForm, 'userDefined1001');
            carrierMaster.contactTitle = Form.getValue(this.carrierForm, 'title');
            carrierMaster.userDate1 = Form.getValue(this.carrierForm, 'userDate1001');
            carrierMaster.phoneNumber = Form.getValue(this.carrierForm, 'phone');
            carrierMaster.userDefined2 = Form.getValue(this.carrierForm, 'userDefined1002');
            carrierMaster.userDate2 = Form.getValue(this.carrierForm, 'userDate1002');
            carrierMaster.emailId = Form.getValue(this.carrierForm, 'emailId');
            carrierMaster.alDistMethod = Form.getValue(this.carrierForm, 'alDistMeth');
            this.carrierMasterService.updateCarrierMaster(carrierMaster, carrierCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editCarrierMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveCarrierMaster() {
        if(this.editCarrierMaster) {
            this.updateCarrierMaster(this.carrierMaster.carrierCode)
        } else {
            this.createCarrierMaster();
        }
    }    deleteCarrierMaster(carrierCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.carrierMasterService.deleteCarrierMaster(carrierCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getCarrierMaster(carrierCode : string) {
        this.carrierMasterService.getCarrierMaster(carrierCode).subscribe(carrierMaster => {
            this.carrierMaster = carrierMaster;
            this.carrierForm.patchValue({
                'shortName': this.carrierMaster.shortName,
                'fullName1': this.carrierMaster.fullName1,
                'country001': this.carrierMaster.country,
                'fullName2': this.carrierMaster.fullName2,
                'state': this.carrierMaster.state,
                'address1001': this.carrierMaster.addressLine1,
                'zip': this.carrierMaster.zipCode,
                'address1002': this.carrierMaster.addressLine2,
                'country002': this.carrierMaster.county,
                'city': this.carrierMaster.city,
                'userDefined1001': this.carrierMaster.userDefined1,
                'title': this.carrierMaster.contactTitle,
                'userDate1001': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate1),
                'phone': this.carrierMaster.phoneNumber,
                'userDefined1002': this.carrierMaster.userDefined2,
                'userDate1002': this.dateFormatPipe.defaultDisplayDateFormat(this.carrierMaster.userDate2),
                'emailId': this.carrierMaster.emailId,
                'alDistMeth': this.carrierMaster.alDistMethod,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getCarrierMasters() {
        this.carrierMasterService.getCarrierMasters().subscribe(carrierMasters => {
        this.carrierMasters = carrierMasters;
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
             headerName: "Carrier Code",
             field: "carriercode",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "ShortName",
             field: "shortname",
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
     private carrierMasterService: CarrierMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.carrierForm);
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
        this.formValidation = new FormValidation(this.carrierForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.carrierForm = this.formBuilder.group({
            carrierCode: ['', {updateOn: 'blur', validators: [] }],
            shortName: ['', {updateOn: 'blur', validators: [] }],
            fullName1: ['', {updateOn: 'blur', validators: [] }],
            country001: ['', {updateOn: 'blur', validators: [] }],
            fullName2: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            address1001: ['', {updateOn: 'blur', validators: [] }],
            zip: ['', {updateOn: 'blur', validators: [] }],
            address1002: ['', {updateOn: 'blur', validators: [] }],
            country002: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            type: ['', {updateOn: 'blur', validators: [] }],
            name: ['', {updateOn: 'blur', validators: [] }],
            userDefined1001: ['', {updateOn: 'blur', validators: [] }],
            title: ['', {updateOn: 'blur', validators: [] }],
            userDate1001: ['', {updateOn: 'blur', validators: [] }],
            phone: ['', {updateOn: 'blur', validators: [] }],
            userDefined1002: ['', {updateOn: 'blur', validators: [] }],
            fax: ['', {updateOn: 'blur', validators: [] }],
            userDate1002: ['', {updateOn: 'blur', validators: [] }],
            emailId: ['', {updateOn: 'blur', validators: [] }],
            alDistMeth: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}