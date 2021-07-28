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
import {  ProcedurePrice } from "../../api-models/index"
import {  ProcedurePriceService } from "../../api-services/procedure-price.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProcedurePriceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'procedureprice',
    templateUrl: './procedure-price.component.html',

})
export class ProcedurePriceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    procedurePriceForm: FormGroup;
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

editProcedurePrice: boolean;
    procedurePrice: ProcedurePrice;
    procedurePrices: ProcedurePrice[];
    if (this.secWin.hasInsertPermission()) {
        createProcedurePrice() {
            this.formValidation.validateForm();
            if(this.procedurePriceForm.valid) {
                let procedurePrice = new ProcedurePrice();
                procedurePrice.procedureCode = Form.getValue(this.procedurePriceForm, 'procedureCode');
                procedurePrice.termDate = Form.getValue(this.procedurePriceForm, 'termDate');
                procedurePrice.perDiemFlag = Form.getValue(this.procedurePriceForm, 'perDiemFlat');
                procedurePrice.allowedAmt = Form.getValue(this.procedurePriceForm, 'allowedAmt');
                procedurePrice.userDefined1 = Form.getValue(this.procedurePriceForm, 'userDefined1');
                procedurePrice.pctOfBilled = Form.getValue(this.procedurePriceForm, 'pctOfBilled');
                procedurePrice.userDefined2 = Form.getValue(this.procedurePriceForm, 'userDefine2');
                procedurePrice.withholdPct = Form.getValue(this.procedurePriceForm, 'withholdPct');
                procedurePrice.userDefined3 = Form.getValue(this.procedurePriceForm, 'userDefine3');
                procedurePrice.contractOverride = Form.getValue(this.procedurePriceForm, 'contractOverride');
                procedurePrice.userDefined4 = Form.getValue(this.procedurePriceForm, 'userDenine4');
                procedurePrice.procedureHold = Form.getValue(this.procedurePriceForm, 'procedureHold');
                procedurePrice.userDefined5 = Form.getValue(this.procedurePriceForm, 'userDefined5');
                procedurePrice.holdDate = Form.getValue(this.procedurePriceForm, 'holdDate');
                this.procedurePriceService.createProcedurePrice(procedurePrice).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProcedurePrice = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProcedurePrice(procedureCode : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.procedurePriceForm.valid) {
            let procedurePrice = new ProcedurePrice();
            procedurePrice.procedureCode = Form.getValue(this.procedurePriceForm, 'procedureCode');
            procedurePrice.termDate = Form.getValue(this.procedurePriceForm, 'termDate');
            procedurePrice.perDiemFlag = Form.getValue(this.procedurePriceForm, 'perDiemFlat');
            procedurePrice.allowedAmt = Form.getValue(this.procedurePriceForm, 'allowedAmt');
            procedurePrice.userDefined1 = Form.getValue(this.procedurePriceForm, 'userDefined1');
            procedurePrice.pctOfBilled = Form.getValue(this.procedurePriceForm, 'pctOfBilled');
            procedurePrice.userDefined2 = Form.getValue(this.procedurePriceForm, 'userDefine2');
            procedurePrice.withholdPct = Form.getValue(this.procedurePriceForm, 'withholdPct');
            procedurePrice.userDefined3 = Form.getValue(this.procedurePriceForm, 'userDefine3');
            procedurePrice.contractOverride = Form.getValue(this.procedurePriceForm, 'contractOverride');
            procedurePrice.userDefined4 = Form.getValue(this.procedurePriceForm, 'userDenine4');
            procedurePrice.procedureHold = Form.getValue(this.procedurePriceForm, 'procedureHold');
            procedurePrice.userDefined5 = Form.getValue(this.procedurePriceForm, 'userDefined5');
            procedurePrice.holdDate = Form.getValue(this.procedurePriceForm, 'holdDate');
            this.procedurePriceService.updateProcedurePrice(procedurePrice, procedureCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProcedurePrice = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProcedurePrice() {
        if(this.editProcedurePrice) {
            this.updateProcedurePrice(this.procedurePrice.procedureCode)
        } else {
            this.createProcedurePrice();
        }
    }    deleteProcedurePrice(procedureCode : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.procedurePriceService.deleteProcedurePrice(procedureCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProcedurePrice(procedureCode : string) {
        this.procedurePriceService.getProcedurePrice(procedureCode).subscribe(procedurePrice => {
            this.procedurePrice = procedurePrice;
            this.procedurePriceForm.patchValue({
                'procedureCode': this.procedurePrice.procedureCode,
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.procedurePrice.termDate),
                'perDiemFlat': this.procedurePrice.perDiemFlag,
                'allowedAmt': this.procedurePrice.allowedAmt,
                'userDefined1': this.procedurePrice.userDefined1,
                'pctOfBilled': this.procedurePrice.pctOfBilled,
                'userDefine2': this.procedurePrice.userDefined2,
                'withholdPct': this.procedurePrice.withholdPct,
                'userDefine3': this.procedurePrice.userDefined3,
                'contractOverride': this.procedurePrice.contractOverride,
                'userDenine4': this.procedurePrice.userDefined4,
                'procedureHold': this.procedurePrice.procedureHold,
                'userDefined5': this.procedurePrice.userDefined5,
                'holdDate': this.dateFormatPipe.defaultDisplayDateFormat(this.procedurePrice.holdDate),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProcedurePrices() {
        this.procedurePriceService.getProcedurePrices().subscribe(procedurePrices => {
        this.procedurePrices = procedurePrices;
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
             headerName: "Price Schedule",
             field: "priceschedule",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Pricing Region",
             field: "pricingregion",
             width: 200         },
         {
             headerName: "Geo",
             field: "",
             width: 200         },
         {
             headerName: "Zip",
             field: "",
             width: 200         },
         {
             headerName: "Region",
             field: "geozipregion",
             width: 200         },
         {
             headerName: "Modifier Code",
             field: "modifiercode",
             width: 200         },
         {
             headerName: "Effective Date",
             field: "effectivedate",
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
     private procedurePriceService: ProcedurePriceService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.procedurePriceForm);
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
        this.formValidation = new FormValidation(this.procedurePriceForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.procedurePriceForm = this.formBuilder.group({
            procedureCode: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            priceSchedule: ['', {updateOn: 'blur', validators: [] }],
            regionType: ['', {updateOn: 'blur', validators: [] }],
            region: ['', {updateOn: 'blur', validators: [] }],
            modifierCode: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            perDiemFlat: ['', {updateOn: 'blur', validators: [] }],
            allowedAmt: ['', {updateOn: 'blur', validators: [] }],
            userDefined1: ['', {updateOn: 'blur', validators: [] }],
            pctOfBilled: ['', {updateOn: 'blur', validators: [] }],
            userDefine2: ['', {updateOn: 'blur', validators: [] }],
            withholdPct: ['', {updateOn: 'blur', validators: [] }],
            userDefine3: ['', {updateOn: 'blur', validators: [] }],
            contractOverride: ['', {updateOn: 'blur', validators: [] }],
            userDenine4: ['', {updateOn: 'blur', validators: [] }],
            procedureHold: ['', {updateOn: 'blur', validators: [] }],
            userDefined5: ['', {updateOn: 'blur', validators: [] }],
            holdDate: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}