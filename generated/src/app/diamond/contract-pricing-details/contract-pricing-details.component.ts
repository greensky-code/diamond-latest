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
import {  ProvContractPrice } from "../../api-models/index"
import {  ProvContractPriceService } from "../../api-services/prov-contract-price.service"
import {  ProvContractPriceSched } from "../../api-models/index"
import {  ProvContractPriceSchedService } from "../../api-services/prov-contract-price-sched.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ContractPricingDetailsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'contractpricingdetails',
    templateUrl: './contract-pricing-details.component.html',

})
export class ContractPricingDetailsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    contractPricingDetailsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';

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

editProvContractPrice: boolean;
    provContractPrice: ProvContractPrice;
    provContractPrices: ProvContractPrice[];editProvContractPriceSched: boolean;
    provContractPriceSched: ProvContractPriceSched;
    provContractPriceScheds: ProvContractPriceSched[];
    if (this.secWin.hasInsertPermission()) {
        createProvContractPrice() {
            this.formValidation.validateForm();
            if(this.contractPricingDetailsForm.valid) {
                let provContractPrice = new ProvContractPrice();
                provContractPrice.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
                provContractPrice.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
                provContractPrice.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
                provContractPrice.determinantTable = Form.getValue(this.contractPricingDetailsForm, 'detTable');
                provContractPrice.determinant = Form.getValue(this.contractPricingDetailsForm, 'determinant002');
                provContractPrice.operator = Form.getValue(this.contractPricingDetailsForm, 'operator');
                provContractPrice.contractType = Form.getValue(this.contractPricingDetailsForm, 'contractType');
                provContractPrice.pricingRegion = Form.getValue(this.contractPricingDetailsForm, 'pricingRegion');
                provContractPrice.pctAllowed = Form.getValue(this.contractPricingDetailsForm, 'pctAllowed');
                provContractPrice.priceRule1 = Form.getValue(this.contractPricingDetailsForm, 'priceRule');
                provContractPrice.serviceRegion = Form.getValue(this.contractPricingDetailsForm, 'serviceRegion');
                provContractPrice.pctOfBilled = Form.getValue(this.contractPricingDetailsForm, 'pctOfBilled');
                provContractPrice.geographicRegion = Form.getValue(this.contractPricingDetailsForm, 'geoRegio');
                provContractPrice.pctWithhold = Form.getValue(this.contractPricingDetailsForm, 'pctWithhold');
                provContractPrice.targetRevCodeEditFlag = Form.getValue(this.contractPricingDetailsForm, 'targetRevCodeEdit');
                provContractPrice.targetRevAction = Form.getValue(this.contractPricingDetailsForm, 'action');
                provContractPrice.targetRevReason = Form.getValue(this.contractPricingDetailsForm, 'reason');
                this.provContractPriceService.createProvContractPrice(provContractPrice).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvContractPrice = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProvContractPrice(claimType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.contractPricingDetailsForm.valid) {
            let provContractPrice = new ProvContractPrice();
            provContractPrice.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
            provContractPrice.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
            provContractPrice.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
            provContractPrice.determinantTable = Form.getValue(this.contractPricingDetailsForm, 'detTable');
            provContractPrice.determinant = Form.getValue(this.contractPricingDetailsForm, 'determinant002');
            provContractPrice.operator = Form.getValue(this.contractPricingDetailsForm, 'operator');
            provContractPrice.contractType = Form.getValue(this.contractPricingDetailsForm, 'contractType');
            provContractPrice.pricingRegion = Form.getValue(this.contractPricingDetailsForm, 'pricingRegion');
            provContractPrice.pctAllowed = Form.getValue(this.contractPricingDetailsForm, 'pctAllowed');
            provContractPrice.priceRule1 = Form.getValue(this.contractPricingDetailsForm, 'priceRule');
            provContractPrice.serviceRegion = Form.getValue(this.contractPricingDetailsForm, 'serviceRegion');
            provContractPrice.pctOfBilled = Form.getValue(this.contractPricingDetailsForm, 'pctOfBilled');
            provContractPrice.geographicRegion = Form.getValue(this.contractPricingDetailsForm, 'geoRegio');
            provContractPrice.pctWithhold = Form.getValue(this.contractPricingDetailsForm, 'pctWithhold');
            provContractPrice.targetRevCodeEditFlag = Form.getValue(this.contractPricingDetailsForm, 'targetRevCodeEdit');
            provContractPrice.targetRevAction = Form.getValue(this.contractPricingDetailsForm, 'action');
            provContractPrice.targetRevReason = Form.getValue(this.contractPricingDetailsForm, 'reason');
            this.provContractPriceService.updateProvContractPrice(provContractPrice, claimType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvContractPrice = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvContractPrice() {
        if(this.editProvContractPrice) {
            this.updateProvContractPrice(this.provContractPrice.claimType)
        } else {
            this.createProvContractPrice();
        }
    }    deleteProvContractPrice(claimType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractPriceService.deleteProvContractPrice(claimType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvContractPrice(claimType : string) {
        this.provContractPriceService.getProvContractPrice(claimType).subscribe(provContractPrice => {
            this.provContractPrice = provContractPrice;
            this.contractPricingDetailsForm.patchValue({
                'claimType': this.provContractPrice.claimType,
                'order': this.provContractPrice.detSrchOrder,
                'searchSequence': this.provContractPrice.detSrchSequence,
                'detTable': this.provContractPrice.determinantTable,
                'determinant002': this.provContractPrice.determinant,
                'operator': this.provContractPrice.operator,
                'contractType': this.provContractPrice.contractType,
                'pricingRegion': this.provContractPrice.pricingRegion,
                'pctAllowed': this.provContractPrice.pctAllowed,
                'priceRule': this.provContractPrice.priceRule1,
                'serviceRegion': this.provContractPrice.serviceRegion,
                'pctOfBilled': this.provContractPrice.pctOfBilled,
                'geoRegio': this.provContractPrice.geographicRegion,
                'pctWithhold': this.provContractPrice.pctWithhold,
                'targetRevCodeEdit': this.provContractPrice.targetRevCodeEditFlag,
                'action': this.provContractPrice.targetRevAction,
                'reason': this.provContractPrice.targetRevReason,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvContractPrices() {
        this.provContractPriceService.getProvContractPrices().subscribe(provContractPrices => {
        this.provContractPrices = provContractPrices;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createProvContractPriceSched() {
            this.formValidation.validateForm();
            if(this.contractPricingDetailsForm.valid) {
                let provContractPriceSched = new ProvContractPriceSched();
                provContractPriceSched.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
                provContractPriceSched.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
                provContractPriceSched.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
                this.provContractPriceSchedService.createProvContractPriceSched(provContractPriceSched).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvContractPriceSched = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateProvContractPriceSched(claimType : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.contractPricingDetailsForm.valid) {
            let provContractPriceSched = new ProvContractPriceSched();
            provContractPriceSched.claimType = Form.getValue(this.contractPricingDetailsForm, 'claimType');
            provContractPriceSched.detSrchOrder = Form.getValue(this.contractPricingDetailsForm, 'order');
            provContractPriceSched.detSrchSequence = Form.getValue(this.contractPricingDetailsForm, 'searchSequence');
            this.provContractPriceSchedService.updateProvContractPriceSched(provContractPriceSched, claimType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvContractPriceSched = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvContractPriceSched() {
        if(this.editProvContractPriceSched) {
            this.updateProvContractPriceSched(this.provContractPriceSched.claimType)
        } else {
            this.createProvContractPriceSched();
        }
    }    deleteProvContractPriceSched(claimType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractPriceSchedService.deleteProvContractPriceSched(claimType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvContractPriceSched(claimType : string) {
        this.provContractPriceSchedService.getProvContractPriceSched(claimType).subscribe(provContractPriceSched => {
            this.provContractPriceSched = provContractPriceSched;
            this.contractPricingDetailsForm.patchValue({
                'claimType': this.provContractPriceSched.claimType,
                'order': this.provContractPriceSched.detSrchOrder,
                'searchSequence': this.provContractPriceSched.detSrchSequence,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvContractPriceScheds() {
        this.provContractPriceSchedService.getProvContractPriceScheds().subscribe(provContractPriceScheds => {
        this.provContractPriceScheds = provContractPriceScheds;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
    public dataGrid004GridOptions: GridOptions;
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

    private dataGrid003gridApi: any;
    private dataGrid003gridColumnApi: any;

    dataGrid003GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid003gridApi.exportDataAsCsv(params);
    }

    private dataGrid004gridApi: any;
    private dataGrid004gridColumnApi: any;

    dataGrid004GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid004gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Provider",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Name",
             field: "",
             width: 200         },
         {
             headerName: "LOB",
             field: "",
             width: 200         },
         {
             headerName: "IPA Eff Dt.",
             field: "",
             width: 200         },
         {
             headerName: "Vendor",
             field: "",
             width: 200         },
         {
             headerName: "Address",
             field: "",
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
             headerName: "Claim Type",
             field: "claimtype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Order",
             field: "detsrchorder",
             width: 200         },
         {
             headerName: "Sequence",
             field: "detsrchsequence",
             width: 200         },
         {
             headerName: "Det. Table",
             field: "determinanttable",
             width: 200         },
         {
             headerName: "Determinant",
             field: "determinant",
             width: 200         },
         {
             headerName: "Operator",
             field: "operator",
             width: 200         }
      ];
    }
    createDataGrid003(): void {
      this.dataGrid003GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid003GridOptions.editType = 'fullRow';
      this.dataGrid003GridOptions.columnDefs = [
         {
             headerName: "From",
             field: "",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Trough",
             field: "",
             width: 200         }
      ];
    }
    createDataGrid004(): void {
      this.dataGrid004GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid004GridOptions.editType = 'fullRow';
      this.dataGrid004GridOptions.columnDefs = [
         {
             headerName: "Order",
             field: "schedorder",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Price sched",
             field: "priceschedule",
             width: 200         },
         {
             headerName: "Price Sched Pct Allowed",
             field: "schedpctallowed",
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
     private provContractPriceService: ProvContractPriceService, private provContractPriceSchedService: ProvContractPriceSchedService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.contractPricingDetailsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
         this.createDataGrid004();
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
        this.formValidation = new FormValidation(this.contractPricingDetailsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
         this.createDataGrid004();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.contractPricingDetailsForm = this.formBuilder.group({
            claimType: ['', {updateOn: 'blur', validators: [] }],
            order: ['', {updateOn: 'blur', validators: [] }],
            searchSequence: ['', {updateOn: 'blur', validators: [] }],
            detTable: ['', {updateOn: 'blur', validators: [] }],
            determinant002: ['', {updateOn: 'blur', validators: [] }],
            operator: ['', {updateOn: 'blur', validators: [] }],
            contractType: ['', {updateOn: 'blur', validators: [] }],
            pricingRegion: ['', {updateOn: 'blur', validators: [] }],
            pctAllowed: ['', {updateOn: 'blur', validators: [] }],
            priceRule: ['', {updateOn: 'blur', validators: [] }],
            serviceRegion: ['', {updateOn: 'blur', validators: [] }],
            pctOfBilled: ['', {updateOn: 'blur', validators: [] }],
            geoRegio: ['', {updateOn: 'blur', validators: [] }],
            pctWithhold: ['', {updateOn: 'blur', validators: [] }],
            targetRevCodeEdit: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [] }],
            reason: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}