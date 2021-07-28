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
import {  ProvContract } from "../../api-models/index"
import {  ProvContractService } from "../../api-services/prov-contract.service"
import {  ProvContractSpecialty } from "../../api-models/index"
import {  ProvContractSpecialtyService } from "../../api-services/prov-contract-specialty.service"
import {  ProvContractTaxonomy } from "../../api-models/index"
import {  ProvContractTaxonomyService } from "../../api-services/prov-contract-taxonomy.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProviderContractsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'providercontracts',
    templateUrl: './provider-contracts.component.html',

})
export class ProviderContractsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerContractsForm: FormGroup;
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

editProvContract: boolean;
    provContract: ProvContract;
    provContracts: ProvContract[];editProvContractSpecialty: boolean;
    provContractSpecialty: ProvContractSpecialty;
    provContractSpecialtys: ProvContractSpecialty[];editProvContractTaxonomy: boolean;
    provContractTaxonomy: ProvContractTaxonomy;
    provContractTaxonomys: ProvContractTaxonomy[];
    if (this.secWin.hasInsertPermission()) {
        createProvContract() {
            this.formValidation.validateForm();
            if(this.providerContractsForm.valid) {
                let provContract = new ProvContract();
                provContract.drgPricerId = Form.getValue(this.providerContractsForm, 'providerId');
                provContract.contractType = Form.getValue(this.providerContractsForm, 'defContrType');
                provContract.lineOfBusiness = Form.getValue(this.providerContractsForm, 'lineBus');
                provContract.panelId = Form.getValue(this.providerContractsForm, 'panel');
                provContract.ipaId = Form.getValue(this.providerContractsForm, 'ipa');
                provContract.taxId = Form.getValue(this.providerContractsForm, 'fedTaxId');
                provContract.capFundModelId = Form.getValue(this.providerContractsForm, 'capFundModel');
                provContract.capFundSubModelId = Form.getValue(this.providerContractsForm, 'capFundSubModel');
                provContract.effectiveDate = Form.getValue(this.providerContractsForm, 'effDate');
                provContract.termDate = Form.getValue(this.providerContractsForm, 'termDate');
                provContract.termReason = Form.getValue(this.providerContractsForm, 'termRsn');
                provContract.filingLimitDays = Form.getValue(this.providerContractsForm, 'filingLimitDays');
                provContract.pcpFlag = Form.getValue(this.providerContractsForm, 'pcpFlag');
                provContract.acceptNewPatients = Form.getValue(this.providerContractsForm, 'acceptsNewPat');
                provContract.printRemitAdvice = Form.getValue(this.providerContractsForm, 'printRa');
                provContract.acceptMedicareAssignFlag = Form.getValue(this.providerContractsForm, 'mcareAssign');
                provContract.participationFlag = Form.getValue(this.providerContractsForm, 'parFlag');
                provContract.userDefined1 = Form.getValue(this.providerContractsForm, 'userDef1');
                provContract.userDefined2 = Form.getValue(this.providerContractsForm, 'userDef2');
                provContract.seqVendId = Form.getValue(this.providerContractsForm, 'capVendId');
                provContract.seqVendAddress = Form.getValue(this.providerContractsForm, 'capVendAddr');
                provContract.seqCovProvGrp = Form.getValue(this.providerContractsForm, 'covGroup');
                provContract.pctAllowed = Form.getValue(this.providerContractsForm, 'comCobAllowed');
                provContract.comCobAlwdAmtRsn = Form.getValue(this.providerContractsForm, 'comCobRsn');
                provContract.excludeIncentive = Form.getValue(this.providerContractsForm, 'exclusiveIncentive');
                provContract.excludeAdminFee = Form.getValue(this.providerContractsForm, 'excludeAdminFee');
                this.provContractService.createProvContract(provContract).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvContract = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvContract(seqProvContract : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerContractsForm.valid) {
            let provContract = new ProvContract();
            provContract.drgPricerId = Form.getValue(this.providerContractsForm, 'providerId');
            provContract.contractType = Form.getValue(this.providerContractsForm, 'defContrType');
            provContract.lineOfBusiness = Form.getValue(this.providerContractsForm, 'lineBus');
            provContract.panelId = Form.getValue(this.providerContractsForm, 'panel');
            provContract.ipaId = Form.getValue(this.providerContractsForm, 'ipa');
            provContract.taxId = Form.getValue(this.providerContractsForm, 'fedTaxId');
            provContract.capFundModelId = Form.getValue(this.providerContractsForm, 'capFundModel');
            provContract.capFundSubModelId = Form.getValue(this.providerContractsForm, 'capFundSubModel');
            provContract.effectiveDate = Form.getValue(this.providerContractsForm, 'effDate');
            provContract.termDate = Form.getValue(this.providerContractsForm, 'termDate');
            provContract.termReason = Form.getValue(this.providerContractsForm, 'termRsn');
            provContract.filingLimitDays = Form.getValue(this.providerContractsForm, 'filingLimitDays');
            provContract.pcpFlag = Form.getValue(this.providerContractsForm, 'pcpFlag');
            provContract.acceptNewPatients = Form.getValue(this.providerContractsForm, 'acceptsNewPat');
            provContract.printRemitAdvice = Form.getValue(this.providerContractsForm, 'printRa');
            provContract.acceptMedicareAssignFlag = Form.getValue(this.providerContractsForm, 'mcareAssign');
            provContract.participationFlag = Form.getValue(this.providerContractsForm, 'parFlag');
            provContract.userDefined1 = Form.getValue(this.providerContractsForm, 'userDef1');
            provContract.userDefined2 = Form.getValue(this.providerContractsForm, 'userDef2');
            provContract.seqVendId = Form.getValue(this.providerContractsForm, 'capVendId');
            provContract.seqVendAddress = Form.getValue(this.providerContractsForm, 'capVendAddr');
            provContract.seqCovProvGrp = Form.getValue(this.providerContractsForm, 'covGroup');
            provContract.pctAllowed = Form.getValue(this.providerContractsForm, 'comCobAllowed');
            provContract.comCobAlwdAmtRsn = Form.getValue(this.providerContractsForm, 'comCobRsn');
            provContract.excludeIncentive = Form.getValue(this.providerContractsForm, 'exclusiveIncentive');
            provContract.excludeAdminFee = Form.getValue(this.providerContractsForm, 'excludeAdminFee');
            this.provContractService.updateProvContract(provContract, seqProvContract).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvContract = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvContract() {
        if(this.editProvContract) {
            this.updateProvContract(this.provContract.seqProvContract)
        } else {
            this.createProvContract();
        }
    }    deleteProvContract(seqProvContract : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractService.deleteProvContract(seqProvContract).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvContract(seqProvContract : number) {
        this.provContractService.getProvContract(seqProvContract).subscribe(provContract => {
            this.provContract = provContract;
            this.providerContractsForm.patchValue({
                'providerId': this.provContract.drgPricerId,
                'defContrType': this.provContract.contractType,
                'lineBus': this.provContract.lineOfBusiness,
                'panel': this.provContract.panelId,
                'ipa': this.provContract.ipaId,
                'fedTaxId': this.provContract.taxId,
                'capFundModel': this.provContract.capFundModelId,
                'capFundSubModel': this.provContract.capFundSubModelId,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provContract.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provContract.termDate),
                'termRsn': this.provContract.termReason,
                'filingLimitDays': this.provContract.filingLimitDays,
                'pcpFlag': this.provContract.pcpFlag,
                'acceptsNewPat': this.provContract.acceptNewPatients,
                'printRa': this.provContract.printRemitAdvice,
                'mcareAssign': this.provContract.acceptMedicareAssignFlag,
                'parFlag': this.provContract.participationFlag,
                'userDef1': this.provContract.userDefined1,
                'userDef2': this.provContract.userDefined2,
                'capVendId': this.provContract.seqVendId,
                'capVendAddr': this.provContract.seqVendAddress,
                'covGroup': this.provContract.seqCovProvGrp,
                'comCobAllowed': this.provContract.pctAllowed,
                'comCobRsn': this.provContract.comCobAlwdAmtRsn,
                'exclusiveIncentive': this.provContract.excludeIncentive,
                'excludeAdminFee': this.provContract.excludeAdminFee,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvContracts() {
        this.provContractService.getProvContracts().subscribe(provContracts => {
        this.provContracts = provContracts;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createProvContractSpecialty() {
            this.formValidation.validateForm();
            if(this.providerContractsForm.valid) {
                let provContractSpecialty = new ProvContractSpecialty();
                this.provContractSpecialtyService.createProvContractSpecialty(provContractSpecialty).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvContractSpecialty = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvContractSpecialty(seqProvId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerContractsForm.valid) {
            let provContractSpecialty = new ProvContractSpecialty();
            this.provContractSpecialtyService.updateProvContractSpecialty(provContractSpecialty, seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvContractSpecialty = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvContractSpecialty() {
        if(this.editProvContractSpecialty) {
            this.updateProvContractSpecialty(this.provContractSpecialty.seqProvId)
        } else {
            this.createProvContractSpecialty();
        }
    }    deleteProvContractSpecialty(seqProvId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractSpecialtyService.deleteProvContractSpecialty(seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvContractSpecialty(seqProvId : number) {
        this.provContractSpecialtyService.getProvContractSpecialty(seqProvId).subscribe(provContractSpecialty => {
            this.provContractSpecialty = provContractSpecialty;
            this.providerContractsForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvContractSpecialtys() {
        this.provContractSpecialtyService.getProvContractSpecialtys().subscribe(provContractSpecialtys => {
        this.provContractSpecialtys = provContractSpecialtys;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createProvContractTaxonomy() {
            this.formValidation.validateForm();
            if(this.providerContractsForm.valid) {
                let provContractTaxonomy = new ProvContractTaxonomy();
                this.provContractTaxonomyService.createProvContractTaxonomy(provContractTaxonomy).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvContractTaxonomy = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvContractTaxonomy(seqProvId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerContractsForm.valid) {
            let provContractTaxonomy = new ProvContractTaxonomy();
            this.provContractTaxonomyService.updateProvContractTaxonomy(provContractTaxonomy, seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvContractTaxonomy = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvContractTaxonomy() {
        if(this.editProvContractTaxonomy) {
            this.updateProvContractTaxonomy(this.provContractTaxonomy.seqProvId)
        } else {
            this.createProvContractTaxonomy();
        }
    }    deleteProvContractTaxonomy(seqProvId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provContractTaxonomyService.deleteProvContractTaxonomy(seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvContractTaxonomy(seqProvId : number) {
        this.provContractTaxonomyService.getProvContractTaxonomy(seqProvId).subscribe(provContractTaxonomy => {
            this.provContractTaxonomy = provContractTaxonomy;
            this.providerContractsForm.patchValue({
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvContractTaxonomys() {
        this.provContractTaxonomyService.getProvContractTaxonomys().subscribe(provContractTaxonomys => {
        this.provContractTaxonomys = provContractTaxonomys;
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
             headerName: "Def Contr Type",
             field: "contracttype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Line Bus",
             field: "lineofbusiness",
             width: 200         },
         {
             headerName: "Panel",
             field: "panelid",
             width: 200         },
         {
             headerName: "IPA",
             field: "ipaid",
             width: 200         },
         {
             headerName: "Eff Date",
             field: "effectivedate",
             width: 200         },
         {
             headerName: "Term Date",
             field: "termdate",
             width: 200         },
         {
             headerName: "Term Rsn",
             field: "termreason",
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
             headerName: "Specialty Type",
             field: "specialtytype",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Primary",
             field: "primaryspecialty",
             width: 200         },
         {
             headerName: "Baord Status Dir Inc",
             field: "boardstatus",
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
             headerName: "Taxonomy Code",
             field: "taxonomycode",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Type / Description",
             field: "",
             width: 200         },
         {
             headerName: "Primary",
             field: "primary",
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
     private provContractService: ProvContractService, private provContractSpecialtyService: ProvContractSpecialtyService, private provContractTaxonomyService: ProvContractTaxonomyService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerContractsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
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
        this.formValidation = new FormValidation(this.providerContractsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.createDataGrid003();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerContractsForm = this.formBuilder.group({
            providerId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            defContrType: ['', {updateOn: 'blur', validators: [] }],
            lineBus: ['', {updateOn: 'blur', validators: [] }],
            panel: ['', {updateOn: 'blur', validators: [] }],
            ipa: ['', {updateOn: 'blur', validators: [] }],
            fedTaxId: ['', {updateOn: 'blur', validators: [] }],
            capFundModel: ['', {updateOn: 'blur', validators: [] }],
            capFundSubModel: ['', {updateOn: 'blur', validators: [] }],
            effDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            termRsn: ['', {updateOn: 'blur', validators: [] }],
            filingLimitDays: ['', {updateOn: 'blur', validators: [] }],
            pcpFlag: ['', {updateOn: 'blur', validators: [] }],
            acceptsNewPat: ['', {updateOn: 'blur', validators: [] }],
            printRa: ['', {updateOn: 'blur', validators: [] }],
            mcareAssign: ['', {updateOn: 'blur', validators: [] }],
            parFlag: ['', {updateOn: 'blur', validators: [] }],
            userDef1: ['', {updateOn: 'blur', validators: [] }],
            userDef2: ['', {updateOn: 'blur', validators: [] }],
            capVendId: ['', {updateOn: 'blur', validators: [] }],
            capVendAddr: ['', {updateOn: 'blur', validators: [] }],
            covGroup: ['', {updateOn: 'blur', validators: [] }],
            comCobAllowed: ['', {updateOn: 'blur', validators: [] }],
            comCobRsn: ['', {updateOn: 'blur', validators: [] }],
            exclusiveIncentive: ['', {updateOn: 'blur', validators: [] }],
            excludeAdminFee: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }],
            textbox004: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}