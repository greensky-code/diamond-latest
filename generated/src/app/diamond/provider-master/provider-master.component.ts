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
import {  ProvMaster } from "../../api-models/index"
import {  ProvMasterService } from "../../api-services/prov-master.service"
import {  ProvSpecialty } from "../../api-models/index"
import {  ProvSpecialtyService } from "../../api-services/prov-specialty.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ProviderMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'providermaster',
    templateUrl: './provider-master.component.html',

})
export class ProviderMasterComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    providerMasterForm: FormGroup;
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

editProvMaster: boolean;
    provMaster: ProvMaster;
    provMasters: ProvMaster[];editProvSpecialty: boolean;
    provSpecialty: ProvSpecialty;
    provSpecialtys: ProvSpecialty[];
    if (this.secWin.hasInsertPermission()) {
        createProvMaster() {
            this.formValidation.validateForm();
            if(this.providerMasterForm.valid) {
                let provMaster = new ProvMaster();
                provMaster.providerId = Form.getValue(this.providerMasterForm, 'providerId');
                provMaster.salutation = Form.getValue(this.providerMasterForm, 'institutional');
                provMaster.lastName = Form.getValue(this.providerMasterForm, 'lastNm');
                provMaster.firstName = Form.getValue(this.providerMasterForm, 'firstNm');
                provMaster.shortName = Form.getValue(this.providerMasterForm, 'shortName');
                provMaster.license = Form.getValue(this.providerMasterForm, 'license');
                provMaster.seqProvXrefId = Form.getValue(this.providerMasterForm, 'xrefId');
                provMaster.userId1 = Form.getValue(this.providerMasterForm, 'userId1');
                provMaster.nationalProviderId = Form.getValue(this.providerMasterForm, 'nationalProviderId');
                provMaster.userId2 = Form.getValue(this.providerMasterForm, 'userId2');
                provMaster.userId3 = Form.getValue(this.providerMasterForm, 'userId3');
                provMaster.nonSpecificProv = Form.getValue(this.providerMasterForm, 'nonSpecificProv');
                provMaster.dateOfBirth = Form.getValue(this.providerMasterForm, 'dateOfBirth');
                provMaster.language1 = Form.getValue(this.providerMasterForm, 'language1');
                provMaster.ipaId = Form.getValue(this.providerMasterForm, 'defaultIpaId');
                provMaster.authClass = Form.getValue(this.providerMasterForm, 'authClass');
                provMaster.language2 = Form.getValue(this.providerMasterForm, 'language2');
                provMaster.language3 = Form.getValue(this.providerMasterForm, 'language3');
                provMaster.maxEnrollLmt = Form.getValue(this.providerMasterForm, 'maxEnrollLmt');
                provMaster.accessProgramEligible = Form.getValue(this.providerMasterForm, 'accessProgramEligable');
                provMaster.userDefinedDate = Form.getValue(this.providerMasterForm, 'userDefDate');
                provMaster.updateUser = Form.getValue(this.providerMasterForm, 'pymtCur');
                provMaster.userDefinedDate2 = Form.getValue(this.providerMasterForm, 'userDefDate2');
                provMaster.userDefined11 = Form.getValue(this.providerMasterForm, 'userDefined11');
                provMaster.userDefined12 = Form.getValue(this.providerMasterForm, 'userDefined12');
                provMaster.seqProvId = Form.getValue(this.providerMasterForm, 'cihsProvId');
                provMaster.providerType = Form.getValue(this.providerMasterForm, 'iproviderId');
                provMaster.userDefinedDate3 = Form.getValue(this.providerMasterForm, 'userDefDate3');
                this.provMasterService.createProvMaster(provMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvMaster(seqProvId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerMasterForm.valid) {
            let provMaster = new ProvMaster();
            provMaster.providerId = Form.getValue(this.providerMasterForm, 'providerId');
            provMaster.salutation = Form.getValue(this.providerMasterForm, 'institutional');
            provMaster.lastName = Form.getValue(this.providerMasterForm, 'lastNm');
            provMaster.firstName = Form.getValue(this.providerMasterForm, 'firstNm');
            provMaster.shortName = Form.getValue(this.providerMasterForm, 'shortName');
            provMaster.license = Form.getValue(this.providerMasterForm, 'license');
            provMaster.seqProvXrefId = Form.getValue(this.providerMasterForm, 'xrefId');
            provMaster.userId1 = Form.getValue(this.providerMasterForm, 'userId1');
            provMaster.nationalProviderId = Form.getValue(this.providerMasterForm, 'nationalProviderId');
            provMaster.userId2 = Form.getValue(this.providerMasterForm, 'userId2');
            provMaster.userId3 = Form.getValue(this.providerMasterForm, 'userId3');
            provMaster.nonSpecificProv = Form.getValue(this.providerMasterForm, 'nonSpecificProv');
            provMaster.dateOfBirth = Form.getValue(this.providerMasterForm, 'dateOfBirth');
            provMaster.language1 = Form.getValue(this.providerMasterForm, 'language1');
            provMaster.ipaId = Form.getValue(this.providerMasterForm, 'defaultIpaId');
            provMaster.authClass = Form.getValue(this.providerMasterForm, 'authClass');
            provMaster.language2 = Form.getValue(this.providerMasterForm, 'language2');
            provMaster.language3 = Form.getValue(this.providerMasterForm, 'language3');
            provMaster.maxEnrollLmt = Form.getValue(this.providerMasterForm, 'maxEnrollLmt');
            provMaster.accessProgramEligible = Form.getValue(this.providerMasterForm, 'accessProgramEligable');
            provMaster.userDefinedDate = Form.getValue(this.providerMasterForm, 'userDefDate');
            provMaster.updateUser = Form.getValue(this.providerMasterForm, 'pymtCur');
            provMaster.userDefinedDate2 = Form.getValue(this.providerMasterForm, 'userDefDate2');
            provMaster.userDefined11 = Form.getValue(this.providerMasterForm, 'userDefined11');
            provMaster.userDefined12 = Form.getValue(this.providerMasterForm, 'userDefined12');
            provMaster.seqProvId = Form.getValue(this.providerMasterForm, 'cihsProvId');
            provMaster.providerType = Form.getValue(this.providerMasterForm, 'iproviderId');
            provMaster.userDefinedDate3 = Form.getValue(this.providerMasterForm, 'userDefDate3');
            this.provMasterService.updateProvMaster(provMaster, seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvMaster() {
        if(this.editProvMaster) {
            this.updateProvMaster(this.provMaster.seqProvId)
        } else {
            this.createProvMaster();
        }
    }    deleteProvMaster(seqProvId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provMasterService.deleteProvMaster(seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvMaster(seqProvId : number) {
        this.provMasterService.getProvMaster(seqProvId).subscribe(provMaster => {
            this.provMaster = provMaster;
            this.providerMasterForm.patchValue({
                'providerId': this.provMaster.providerId,
                'institutional': this.provMaster.salutation,
                'lastNm': this.provMaster.lastName,
                'firstNm': this.provMaster.firstName,
                'shortName': this.provMaster.shortName,
                'license': this.provMaster.license,
                'xrefId': this.provMaster.seqProvXrefId,
                'userId1': this.provMaster.userId1,
                'nationalProviderId': this.provMaster.nationalProviderId,
                'userId2': this.provMaster.userId2,
                'userId3': this.provMaster.userId3,
                'nonSpecificProv': this.provMaster.nonSpecificProv,
                'dateOfBirth': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.dateOfBirth),
                'language1': this.provMaster.language1,
                'defaultIpaId': this.provMaster.ipaId,
                'authClass': this.provMaster.authClass,
                'language2': this.provMaster.language2,
                'language3': this.provMaster.language3,
                'maxEnrollLmt': this.provMaster.maxEnrollLmt,
                'accessProgramEligable': this.provMaster.accessProgramEligible,
                'userDefDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate),
                'pymtCur': this.provMaster.updateUser,
                'userDefDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate2),
                'userDefined11': this.provMaster.userDefined11,
                'userDefined12': this.provMaster.userDefined12,
                'cihsProvId': this.provMaster.seqProvId,
                'iproviderId': this.provMaster.providerType,
                'userDefDate3': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate3),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvMasters() {
        this.provMasterService.getProvMasters().subscribe(provMasters => {
        this.provMasters = provMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createProvSpecialty() {
            this.formValidation.validateForm();
            if(this.providerMasterForm.valid) {
                let provSpecialty = new ProvSpecialty();
                provSpecialty.updateUser = Form.getValue(this.providerMasterForm, 'pymtCur');
                provSpecialty.seqProvId = Form.getValue(this.providerMasterForm, 'cihsProvId');
                this.provSpecialtyService.createProvSpecialty(provSpecialty).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editProvSpecialty = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }

    }


    updateProvSpecialty(seqProvId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.providerMasterForm.valid) {
            let provSpecialty = new ProvSpecialty();
            provSpecialty.updateUser = Form.getValue(this.providerMasterForm, 'pymtCur');
            provSpecialty.seqProvId = Form.getValue(this.providerMasterForm, 'cihsProvId');
            this.provSpecialtyService.updateProvSpecialty(provSpecialty, seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editProvSpecialty = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveProvSpecialty() {
        if(this.editProvSpecialty) {
            this.updateProvSpecialty(this.provSpecialty.seqProvId)
        } else {
            this.createProvSpecialty();
        }
    }    deleteProvSpecialty(seqProvId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provSpecialtyService.deleteProvSpecialty(seqProvId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getProvSpecialty(seqProvId : number) {
        this.provSpecialtyService.getProvSpecialty(seqProvId).subscribe(provSpecialty => {
            this.provSpecialty = provSpecialty;
            this.providerMasterForm.patchValue({
                'pymtCur': this.provSpecialty.updateUser,
                'cihsProvId': this.provSpecialty.seqProvId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getProvSpecialtys() {
        this.provSpecialtyService.getProvSpecialtys().subscribe(provSpecialtys => {
        this.provSpecialtys = provSpecialtys;
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
             headerName: "Directory Incl",
             field: "directoryinclude",
             width: 200         },
         {
             headerName: "Board Status",
             field: "boardstatus",
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
     private provMasterService: ProvMasterService, private provSpecialtyService: ProvSpecialtyService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerMasterForm);
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
        this.formValidation = new FormValidation(this.providerMasterForm);
         this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerMasterForm = this.formBuilder.group({
            providerId: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            institutional: ['', {updateOn: 'blur', validators: [] }],
            lastNm: ['', {updateOn: 'blur', validators: [] }],
            firstNm: ['', {updateOn: 'blur', validators: [] }],
            mi: ['', {updateOn: 'blur', validators: [] }],
            shortName: ['', {updateOn: 'blur', validators: [] }],
            type: ['', {updateOn: 'blur', validators: [] }],
            salutation: ['', {updateOn: 'blur', validators: [] }],
            license: ['', {updateOn: 'blur', validators: [] }],
            xrefId: ['', {updateOn: 'blur', validators: [] }],
            userId1: ['', {updateOn: 'blur', validators: [] }],
            nationalProviderId: ['', {updateOn: 'blur', validators: [] }],
            userId2: ['', {updateOn: 'blur', validators: [] }],
            userId3: ['', {updateOn: 'blur', validators: [] }],
            nonSpecificProv: ['', {updateOn: 'blur', validators: [] }],
            dateOfBirth: ['', {updateOn: 'blur', validators: [] }],
            language1: ['', {updateOn: 'blur', validators: [] }],
            defaultIpaId: ['', {updateOn: 'blur', validators: [] }],
            authClass: ['', {updateOn: 'blur', validators: [] }],
            language2: ['', {updateOn: 'blur', validators: [] }],
            defaultVendorIdTbDefault: ['', {updateOn: 'blur', validators: [] }],
            language3: ['', {updateOn: 'blur', validators: [] }],
            maxEnrollLmt: ['', {updateOn: 'blur', validators: [] }],
            accessProgramEligable: ['', {updateOn: 'blur', validators: [] }],
            userDefDate: ['', {updateOn: 'blur', validators: [] }],
            pymtCur: ['', {updateOn: 'blur', validators: [] }],
            userDefDate2: ['', {updateOn: 'blur', validators: [] }],
            wcVindrNo: ['', {updateOn: 'blur', validators: [] }],
            pimsId: ['', {updateOn: 'blur', validators: [] }],
            thirdParty: ['', {updateOn: 'blur', validators: [] }],
            rushEob: ['', {updateOn: 'blur', validators: [] }],
            discAgreement: ['', {updateOn: 'blur', validators: [] }],
            userDefined11: ['', {updateOn: 'blur', validators: [] }],
            contracted: ['', {updateOn: 'blur', validators: [] }],
            highVolClaim: ['', {updateOn: 'blur', validators: [] }],
            userDefined12: ['', {updateOn: 'blur', validators: [] }],
            cihsProvId: ['', {updateOn: 'blur', validators: [] }],
            iproviderId: ['', {updateOn: 'blur', validators: [] }],
            userDefDate3: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}