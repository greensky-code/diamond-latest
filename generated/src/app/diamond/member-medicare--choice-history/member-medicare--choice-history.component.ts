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
import {  MemberMaster } from "../../api-models/index"
import {  MemberMasterService } from "../../api-services/member-master.service"
import {  MemberEligHistory } from "../../api-models/index"
import {  MemberEligHistoryService } from "../../api-services/member-elig-history.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the MemberMedicareChoiceHistoryComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'membermedicarechoicehistory',
    templateUrl: './member-medicare--choice-history.component.html',

})
export class MemberMedicareChoiceHistoryComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    memberMedicareChoiceHistoryForm: FormGroup;
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

editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];
    if (this.secWin.hasInsertPermission()) {
        createMemberMaster() {
            this.formValidation.validateForm();
            if(this.memberMedicareChoiceHistoryForm.valid) {
                let memberMaster = new MemberMaster();
                memberMaster.subscriberId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'subscriberId');
                memberMaster.userDefined1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef1');
                memberMaster.userDefined2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef2');
                this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editMemberMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateMemberMaster(seqMembId : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.memberMedicareChoiceHistoryForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.subscriberId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'subscriberId');
            memberMaster.userDefined1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef1');
            memberMaster.userDefined2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef2');
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }    saveMemberMaster() {
        if(this.editMemberMaster) {
            this.updateMemberMaster(this.memberMaster.seqMembId)
        } else {
            this.createMemberMaster();
        }
    }    deleteMemberMaster(seqMembId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getMemberMaster(seqMembId : number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.memberMedicareChoiceHistoryForm.patchValue({
                'subscriberId': this.memberMaster.subscriberId,
                'userDef1': this.memberMaster.userDefined1,
                'userDef2': this.memberMaster.userDefined2,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberMasters() {
        this.memberMasterService.getMemberMasters().subscribe(memberMasters => {
        this.memberMasters = memberMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createMemberEligHistory() {
            this.formValidation.validateForm();
            if(this.memberMedicareChoiceHistoryForm.valid) {
                let memberEligHistory = new MemberEligHistory();
                memberEligHistory.ipaId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'diamondId');
                memberEligHistory.subscriberId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'subscriberId');
                memberEligHistory.medicarePartAEffectDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'medicarePartAEffDt');
                memberEligHistory.termDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'termDt');
                memberEligHistory.facState = Form.getValue(this.memberMedicareChoiceHistoryForm, 'cmsStateCd');
                memberEligHistory.facCounty = Form.getValue(this.memberMedicareChoiceHistoryForm, 'cmsCountyCd');
                memberEligHistory.geocode = Form.getValue(this.memberMedicareChoiceHistoryForm, 'geoCode');
                memberEligHistory.pbp = Form.getValue(this.memberMedicareChoiceHistoryForm, 'pbp');
                memberEligHistory.pbpAcknowledgeIndicator = Form.getValue(this.memberMedicareChoiceHistoryForm, 'pbpAcknowlInd');
                memberEligHistory.seqProvId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'providerId');
                memberEligHistory.facName = Form.getValue(this.memberMedicareChoiceHistoryForm, 'facilityName');
                memberEligHistory.facAdmissionDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'admissionDate');
                memberEligHistory.facDischargeDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'dischargeDate');
                memberEligHistory.facCity = Form.getValue(this.memberMedicareChoiceHistoryForm, 'city');
                memberEligHistory.facCountry = Form.getValue(this.memberMedicareChoiceHistoryForm, 'country');
                memberEligHistory.facZipCode = Form.getValue(this.memberMedicareChoiceHistoryForm, 'zipCode');
                memberEligHistory.facPhoneNumber = Form.getValue(this.memberMedicareChoiceHistoryForm, 'phoneNumber');
                memberEligHistory.facMmCertification = Form.getValue(this.memberMedicareChoiceHistoryForm, 'medicaidmedicareCertificatio');
                memberEligHistory.userDefined1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef1');
                memberEligHistory.mcUserDate1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDate1');
                memberEligHistory.userDefined2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef2');
                memberEligHistory.mcUserDate2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDate2');
                this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editMemberEligHistory = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateMemberEligHistory(seqEligHist : number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.memberMedicareChoiceHistoryForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.ipaId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'diamondId');
            memberEligHistory.subscriberId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'subscriberId');
            memberEligHistory.medicarePartAEffectDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'medicarePartAEffDt');
            memberEligHistory.termDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'termDt');
            memberEligHistory.facState = Form.getValue(this.memberMedicareChoiceHistoryForm, 'cmsStateCd');
            memberEligHistory.facCounty = Form.getValue(this.memberMedicareChoiceHistoryForm, 'cmsCountyCd');
            memberEligHistory.geocode = Form.getValue(this.memberMedicareChoiceHistoryForm, 'geoCode');
            memberEligHistory.pbp = Form.getValue(this.memberMedicareChoiceHistoryForm, 'pbp');
            memberEligHistory.pbpAcknowledgeIndicator = Form.getValue(this.memberMedicareChoiceHistoryForm, 'pbpAcknowlInd');
            memberEligHistory.seqProvId = Form.getValue(this.memberMedicareChoiceHistoryForm, 'providerId');
            memberEligHistory.facName = Form.getValue(this.memberMedicareChoiceHistoryForm, 'facilityName');
            memberEligHistory.facAdmissionDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'admissionDate');
            memberEligHistory.facDischargeDate = Form.getValue(this.memberMedicareChoiceHistoryForm, 'dischargeDate');
            memberEligHistory.facCity = Form.getValue(this.memberMedicareChoiceHistoryForm, 'city');
            memberEligHistory.facCountry = Form.getValue(this.memberMedicareChoiceHistoryForm, 'country');
            memberEligHistory.facZipCode = Form.getValue(this.memberMedicareChoiceHistoryForm, 'zipCode');
            memberEligHistory.facPhoneNumber = Form.getValue(this.memberMedicareChoiceHistoryForm, 'phoneNumber');
            memberEligHistory.facMmCertification = Form.getValue(this.memberMedicareChoiceHistoryForm, 'medicaidmedicareCertificatio');
            memberEligHistory.userDefined1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef1');
            memberEligHistory.mcUserDate1 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDate1');
            memberEligHistory.userDefined2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDef2');
            memberEligHistory.mcUserDate2 = Form.getValue(this.memberMedicareChoiceHistoryForm, 'userDate2');
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHist).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }    saveMemberEligHistory() {
        if(this.editMemberEligHistory) {
            this.updateMemberEligHistory(this.memberEligHistory.seqEligHist)
        } else {
            this.createMemberEligHistory();
        }
    }    deleteMemberEligHistory(seqEligHist : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.memberEligHistoryService.deleteMemberEligHistory(seqEligHist).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.getMemberEligHistory(seqEligHist).subscribe(memberEligHistory => {
            this.memberEligHistory = memberEligHistory;
            this.memberMedicareChoiceHistoryForm.patchValue({
                'diamondId': this.memberEligHistory.ipaId,
                'subscriberId': this.memberEligHistory.subscriberId,
                'medicarePartAEffDt': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.medicarePartAEffectDate),
                'termDt': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
                'cmsStateCd': this.memberEligHistory.facState,
                'cmsCountyCd': this.memberEligHistory.facCounty,
                'geoCode': this.memberEligHistory.geocode,
                'pbp': this.memberEligHistory.pbp,
                'pbpAcknowlInd': this.memberEligHistory.pbpAcknowledgeIndicator,
                'providerId': this.memberEligHistory.seqProvId,
                'facilityName': this.memberEligHistory.facName,
                'admissionDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.facAdmissionDate),
                'dischargeDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.facDischargeDate),
                'city': this.memberEligHistory.facCity,
                'country': this.memberEligHistory.facCountry,
                'zipCode': this.memberEligHistory.facZipCode,
                'phoneNumber': this.memberEligHistory.facPhoneNumber,
                'medicaidmedicareCertificatio': this.memberEligHistory.facMmCertification,
                'userDef1': this.memberEligHistory.userDefined1,
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcUserDate1),
                'userDef2': this.memberEligHistory.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcUserDate2),
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMemberEligHistorys() {
        this.memberEligHistoryService.getMemberEligHistorys().subscribe(memberEligHistorys => {
        this.memberEligHistorys = memberEligHistorys;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
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


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "Person No",
             field: "personnumber",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Last",
             field: "lastname",
             width: 200         },
         {
             headerName: "First",
             field: "firstname",
             width: 200         },
         {
             headerName: "DOB",
             field: "",
             width: 200         },
         {
             headerName: "Gender",
             field: "gender",
             width: 200         },
         {
             headerName: "Employee Number",
             field: "employeeno",
             width: 200         },
         {
             headerName: "Citizenship",
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
             headerName: "Eff Date",
             field: "effectivedate",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Term Date",
             field: "termdate",
             width: 200         },
         {
             headerName: "State",
             field: "facstate",
             width: 200         },
         {
             headerName: "Country",
             field: "faccountry",
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
     private memberMasterService: MemberMasterService, private memberEligHistoryService: MemberEligHistoryService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberMedicareChoiceHistoryForm);
         this.createDataGrid001();
         this.createDataGrid002();
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
        this.formValidation = new FormValidation(this.memberMedicareChoiceHistoryForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberMedicareChoiceHistoryForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            subscriberId: ['', {updateOn: 'blur', validators: [] }],
            medicaid: ['', {updateOn: 'blur', validators: [] }],
            diabled: ['', {updateOn: 'blur', validators: [] }],
            hospice: ['', {updateOn: 'blur', validators: [] }],
            esrd: ['', {updateOn: 'blur', validators: [] }],
            workingAged: ['', {updateOn: 'blur', validators: [] }],
            welfare: ['', {updateOn: 'blur', validators: [] }],
            medicarePartAEffDt: ['', {updateOn: 'blur', validators: [] }],
            textbox: ['', {updateOn: 'blur', validators: [] }],
            termDt: ['', {updateOn: 'blur', validators: [] }],
            cmsStateCd: ['', {updateOn: 'blur', validators: [] }],
            cmsCountyCd: ['', {updateOn: 'blur', validators: [] }],
            geoCode: ['', {updateOn: 'blur', validators: [] }],
            pbp: ['', {updateOn: 'blur', validators: [] }],
            pbpAcknowlInd: ['', {updateOn: 'blur', validators: [] }],
            providerId: ['', {updateOn: 'blur', validators: [] }],
            facilityName: ['', {updateOn: 'blur', validators: [] }],
            admissionDate: ['', {updateOn: 'blur', validators: [] }],
            addr1: ['', {updateOn: 'blur', validators: [] }],
            dischargeDate: ['', {updateOn: 'blur', validators: [] }],
            addr2: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            country: ['', {updateOn: 'blur', validators: [] }],
            state: ['', {updateOn: 'blur', validators: [] }],
            zipCode: ['', {updateOn: 'blur', validators: [] }],
            phoneNumber: ['', {updateOn: 'blur', validators: [] }],
            medicaidmedicareCertificatio: ['', {updateOn: 'blur', validators: [] }],
            userDef1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDef2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
