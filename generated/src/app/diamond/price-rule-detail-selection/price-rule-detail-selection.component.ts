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
import {  PriceRuleDetail } from "../../api-models/index"
import {  PriceRuleDetailService } from "../../api-services/price-rule-detail.service"
import {  PriceRuleDetailRules } from "../../api-models/index"
import {  PriceRuleDetailRulesService } from "../../api-services/price-rule-detail-rules.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the PriceRuleDetailSelectionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'priceruledetailselection',
    templateUrl: './price-rule-detail-selection.component.html',

})
export class PriceRuleDetailSelectionComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    priceRuleDetailSelectionForm: FormGroup;
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

editPriceRuleDetail: boolean;
    priceRuleDetail: PriceRuleDetail;
    priceRuleDetails: PriceRuleDetail[];editPriceRuleDetailRules: boolean;
    priceRuleDetailRules: PriceRuleDetailRules;
    priceRuleDetailRuleses: PriceRuleDetailRules[];
    if (this.secWin.hasInsertPermission()) {
        createPriceRuleDetail() {
            this.formValidation.validateForm();
            if(this.priceRuleDetailSelectionForm.valid) {
                let priceRuleDetail = new PriceRuleDetail();
                priceRuleDetail.priceRule = Form.getValue(this.priceRuleDetailSelectionForm, 'priceRule');
                this.priceRuleDetailService.createPriceRuleDetail(priceRuleDetail).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPriceRuleDetail = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePriceRuleDetail(priceRule : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.priceRuleDetailSelectionForm.valid) {
            let priceRuleDetail = new PriceRuleDetail();
            priceRuleDetail.priceRule = Form.getValue(this.priceRuleDetailSelectionForm, 'priceRule');
            this.priceRuleDetailService.updatePriceRuleDetail(priceRuleDetail, priceRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPriceRuleDetail = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePriceRuleDetail() {
        if(this.editPriceRuleDetail) {
            this.updatePriceRuleDetail(this.priceRuleDetail.priceRule)
        } else {
            this.createPriceRuleDetail();
        }
    }    deletePriceRuleDetail(priceRule : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.priceRuleDetailService.deletePriceRuleDetail(priceRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPriceRuleDetail(priceRule : string) {
        this.priceRuleDetailService.getPriceRuleDetail(priceRule).subscribe(priceRuleDetail => {
            this.priceRuleDetail = priceRuleDetail;
            this.priceRuleDetailSelectionForm.patchValue({
                'priceRule': this.priceRuleDetail.priceRule,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPriceRuleDetails() {
        this.priceRuleDetailService.getPriceRuleDetails().subscribe(priceRuleDetails => {
        this.priceRuleDetails = priceRuleDetails;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createPriceRuleDetailRules() {
            this.formValidation.validateForm();
            if(this.priceRuleDetailSelectionForm.valid) {
                let priceRuleDetailRules = new PriceRuleDetailRules();
                priceRuleDetailRules.priceRule = Form.getValue(this.priceRuleDetailSelectionForm, 'priceRule');
                priceRuleDetailRules.ruleOrder = Form.getValue(this.priceRuleDetailSelectionForm, 'ruleOrder');
                priceRuleDetailRules.operator = Form.getValue(this.priceRuleDetailSelectionForm, 'operation');
                this.priceRuleDetailRulesService.createPriceRuleDetailRules(priceRuleDetailRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editPriceRuleDetailRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updatePriceRuleDetailRules(priceRule : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.priceRuleDetailSelectionForm.valid) {
            let priceRuleDetailRules = new PriceRuleDetailRules();
            priceRuleDetailRules.priceRule = Form.getValue(this.priceRuleDetailSelectionForm, 'priceRule');
            priceRuleDetailRules.ruleOrder = Form.getValue(this.priceRuleDetailSelectionForm, 'ruleOrder');
            priceRuleDetailRules.operator = Form.getValue(this.priceRuleDetailSelectionForm, 'operation');
            this.priceRuleDetailRulesService.updatePriceRuleDetailRules(priceRuleDetailRules, priceRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editPriceRuleDetailRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    savePriceRuleDetailRules() {
        if(this.editPriceRuleDetailRules) {
            this.updatePriceRuleDetailRules(this.priceRuleDetailRules.priceRule)
        } else {
            this.createPriceRuleDetailRules();
        }
    }    deletePriceRuleDetailRules(priceRule : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.priceRuleDetailRulesService.deletePriceRuleDetailRules(priceRule).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getPriceRuleDetailRules(priceRule : string) {
        this.priceRuleDetailRulesService.getPriceRuleDetailRules(priceRule).subscribe(priceRuleDetailRules => {
            this.priceRuleDetailRules = priceRuleDetailRules;
            this.priceRuleDetailSelectionForm.patchValue({
                'priceRule': this.priceRuleDetailRules.priceRule,
                'ruleOrder': this.priceRuleDetailRules.ruleOrder,
                'operation': this.priceRuleDetailRules.operator,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getPriceRuleDetailRuleses() {
        this.priceRuleDetailRulesService.getPriceRuleDetailRuleses().subscribe(priceRuleDetailRuleses => {
        this.priceRuleDetailRuleses = priceRuleDetailRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    public dataGrid003GridOptions: GridOptions;
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


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Modifier",
             field: "modifiercode",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Level",
             field: "rulelevel",
             width: 200         },
         {
             headerName: "Sequence",
             field: "searchsequence",
             width: 200         },
         {
             headerName: "Calculation Method",
             field: "calculationmethod",
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
             headerName: "Rule ORder",
             field: "ruleorder",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         }
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
             headerName: "Proc Code From",
             field: "proccode2",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Proc Code Thru",
             field: "proccode1",
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
     private priceRuleDetailService: PriceRuleDetailService, private priceRuleDetailRulesService: PriceRuleDetailRulesService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.priceRuleDetailSelectionForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
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
        this.formValidation = new FormValidation(this.priceRuleDetailSelectionForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.priceRuleDetailSelectionForm = this.formBuilder.group({
            priceRule: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            ruleOrder: ['', {updateOn: 'blur', validators: [] }],
            operation: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}