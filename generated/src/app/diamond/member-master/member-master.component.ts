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
import {  GroupMaster } from "../../api-models/index"
import {  GroupMasterService } from "../../api-services/group-master.service"
import {  MemberMaster } from "../../api-models/index"
import {  MemberMasterService } from "../../api-services/member-master.service"
import {  MemberEligHistory } from "../../api-models/index"
import {  MemberEligHistoryService } from "../../api-services/member-elig-history.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the MemberMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'membermaster',
    templateUrl: './member-master.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        GroupMasterService
        MemberMasterService
        MemberEligHistoryService
]

})
export class MemberMasterComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    memberMasterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;

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

editGroupMaster: boolean;
    groupMaster: GroupMaster;
    groupMasters: GroupMaster[];editMemberMaster: boolean;
    memberMaster: MemberMaster;
    memberMasters: MemberMaster[];editMemberEligHistory: boolean;
    memberEligHistory: MemberEligHistory;
    memberEligHistorys: MemberEligHistory[];
    createGroupMaster() {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.state = Form.getValue(this.this.memberMasterForm, 'salutation');
            groupMaster.addressLine1 = Form.getValue(this.this.memberMasterForm, 'addrType');
            groupMaster.levelCode = Form.getValue(this.this.memberMasterForm, 'relCode');
            groupMaster.seqGroupId = Form.getValue(this.this.memberMasterForm, 'groupId');
            groupMaster.holdReason = Form.getValue(this.this.memberMasterForm, 'reason');
            this.groupMasterService.createGroupMaster(groupMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateGroupMaster(seqGroupId : number) {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let groupMaster = new GroupMaster();
            groupMaster.state = Form.getValue(this.this.memberMasterForm, 'salutation');
            groupMaster.addressLine1 = Form.getValue(this.this.memberMasterForm, 'addrType');
            groupMaster.levelCode = Form.getValue(this.this.memberMasterForm, 'relCode');
            groupMaster.seqGroupId = Form.getValue(this.this.memberMasterForm, 'groupId');
            groupMaster.holdReason = Form.getValue(this.this.memberMasterForm, 'reason');
            this.groupMasterService.updateGroupMaster(groupMaster, seqGroupId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveGroupMaster() {
        if(this.editGroupMaster) {
            this.updateGroupMaster(this.groupMaster.seqGroupId)
        } else {
            this.createGroupMaster();
        }
    }    deleteGroupMaster(seqGroupId : number) {
        this.groupMasterService.deleteGroupMaster(seqGroupId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getGroupMaster(seqGroupId : number) {
        this.groupMasterService.getGroupMaster(seqGroupId).subscribe(groupMaster => {
            this.groupMaster = groupMaster;
            this.memberMasterForm.patchValue({
                'salutation': this.groupMaster.state,
                'addrType': this.groupMaster.addressLine1,
                'relCode': this.groupMaster.levelCode,
                'groupId': this.groupMaster.seqGroupId,
                'reason': this.groupMaster.holdReason,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getGroupMasters() {
        this.groupMasterService.getGroupMasters().subscribe(groupMasters => {
        this.groupMasters = groupMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    createMemberMaster() {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.diamondId = Form.getValue(this.this.memberMasterForm, 'diamondId');
            memberMaster.subscriberId = Form.getValue(this.this.memberMasterForm, 'subscriberId');
            memberMaster.personNumber = Form.getValue(this.this.memberMasterForm, 'personNo');
            memberMaster.subsUpdate = Form.getValue(this.this.memberMasterForm, 'subsPersonNo');
            memberMaster.mcIndicator = Form.getValue(this.this.memberMasterForm, 'cobInd');
            memberMaster.dualCoverageFlag = Form.getValue(this.this.memberMasterForm, 'dualCov');
            memberMaster.caseManagementSwitch = Form.getValue(this.this.memberMasterForm, 'caseMgmt');
            memberMaster.lastName = Form.getValue(this.this.memberMasterForm, 'lastNm');
            memberMaster.firstName = Form.getValue(this.this.memberMasterForm, 'first');
            memberMaster.respState = Form.getValue(this.this.memberMasterForm, 'empStat');
            memberMaster.state = Form.getValue(this.this.memberMasterForm, 'salutation');
            memberMaster.gender = Form.getValue(this.this.memberMasterForm, 'gender');
            memberMaster.maritalStatus = Form.getValue(this.this.memberMasterForm, 'maritalSts');
            memberMaster.addressLine1 = Form.getValue(this.this.memberMasterForm, 'addrType');
            memberMaster.medicareNo = Form.getValue(this.this.memberMasterForm, 'medicare');
            memberMaster.medicaidNo = Form.getValue(this.this.memberMasterForm, 'medicaid');
            memberMaster.socialSecNo = Form.getValue(this.this.memberMasterForm, 'socSec');
            memberMaster.employeeNo = Form.getValue(this.this.memberMasterForm, 'empNo');
            memberMaster.medicalRecNo = Form.getValue(this.this.memberMasterForm, 'medRec');
            memberMaster.seqAltMembId = Form.getValue(this.this.memberMasterForm, 'altMembId');
            memberMaster.holdReason = Form.getValue(this.this.memberMasterForm, 'reason');
            this.memberMasterService.createMemberMaster(memberMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberMaster(seqMembId : number) {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let memberMaster = new MemberMaster();
            memberMaster.diamondId = Form.getValue(this.this.memberMasterForm, 'diamondId');
            memberMaster.subscriberId = Form.getValue(this.this.memberMasterForm, 'subscriberId');
            memberMaster.personNumber = Form.getValue(this.this.memberMasterForm, 'personNo');
            memberMaster.subsUpdate = Form.getValue(this.this.memberMasterForm, 'subsPersonNo');
            memberMaster.mcIndicator = Form.getValue(this.this.memberMasterForm, 'cobInd');
            memberMaster.dualCoverageFlag = Form.getValue(this.this.memberMasterForm, 'dualCov');
            memberMaster.caseManagementSwitch = Form.getValue(this.this.memberMasterForm, 'caseMgmt');
            memberMaster.lastName = Form.getValue(this.this.memberMasterForm, 'lastNm');
            memberMaster.firstName = Form.getValue(this.this.memberMasterForm, 'first');
            memberMaster.respState = Form.getValue(this.this.memberMasterForm, 'empStat');
            memberMaster.state = Form.getValue(this.this.memberMasterForm, 'salutation');
            memberMaster.gender = Form.getValue(this.this.memberMasterForm, 'gender');
            memberMaster.maritalStatus = Form.getValue(this.this.memberMasterForm, 'maritalSts');
            memberMaster.addressLine1 = Form.getValue(this.this.memberMasterForm, 'addrType');
            memberMaster.medicareNo = Form.getValue(this.this.memberMasterForm, 'medicare');
            memberMaster.medicaidNo = Form.getValue(this.this.memberMasterForm, 'medicaid');
            memberMaster.socialSecNo = Form.getValue(this.this.memberMasterForm, 'socSec');
            memberMaster.employeeNo = Form.getValue(this.this.memberMasterForm, 'empNo');
            memberMaster.medicalRecNo = Form.getValue(this.this.memberMasterForm, 'medRec');
            memberMaster.seqAltMembId = Form.getValue(this.this.memberMasterForm, 'altMembId');
            memberMaster.holdReason = Form.getValue(this.this.memberMasterForm, 'reason');
            this.memberMasterService.updateMemberMaster(memberMaster, seqMembId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberMaster() {
        if(this.editMemberMaster) {
            this.updateMemberMaster(this.memberMaster.seqMembId)
        } else {
            this.createMemberMaster();
        }
    }    deleteMemberMaster(seqMembId : number) {
        this.memberMasterService.deleteMemberMaster(seqMembId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberMaster(seqMembId : number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(memberMaster => {
            this.memberMaster = memberMaster;
            this.memberMasterForm.patchValue({
                'diamondId': this.memberMaster.diamondId,
                'subscriberId': this.memberMaster.subscriberId,
                'personNo': this.memberMaster.personNumber,
                'subsPersonNo': this.memberMaster.subsUpdate,
                'cobInd': this.memberMaster.mcIndicator,
                'dualCov': this.memberMaster.dualCoverageFlag,
                'caseMgmt': this.memberMaster.caseManagementSwitch,
                'lastNm': this.memberMaster.lastName,
                'first': this.memberMaster.firstName,
                'empStat': this.memberMaster.respState,
                'salutation': this.memberMaster.state,
                'gender': this.memberMaster.gender,
                'maritalSts': this.memberMaster.maritalStatus,
                'addrType': this.memberMaster.addressLine1,
                'medicare': this.memberMaster.medicareNo,
                'medicaid': this.memberMaster.medicaidNo,
                'socSec': this.memberMaster.socialSecNo,
                'empNo': this.memberMaster.employeeNo,
                'medRec': this.memberMaster.medicalRecNo,
                'altMembId': this.memberMaster.seqAltMembId,
                'reason': this.memberMaster.holdReason,
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
    createMemberEligHistory() {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.subscriberId = Form.getValue(this.this.memberMasterForm, 'subscriberId');
            memberEligHistory.personNumber = Form.getValue(this.this.memberMasterForm, 'personNo');
            memberEligHistory.mcUserDefined1 = Form.getValue(this.this.memberMasterForm, 'mcInd');
            memberEligHistory.effectiveDate = Form.getValue(this.this.memberMasterForm, 'effDate');
            memberEligHistory.termDate = Form.getValue(this.this.memberMasterForm, 'termDate');
            memberEligHistory.termReason = Form.getValue(this.this.memberMasterForm, 'termRsn');
            memberEligHistory.dateOfDeath = Form.getValue(this.this.memberMasterForm, 'dateOfDeath');
            memberEligHistory.seqEligHist = Form.getValue(this.this.memberMasterForm, 'eligSts');
            memberEligHistory.seqGroupId = Form.getValue(this.this.memberMasterForm, 'groupId');
            memberEligHistory.planCode = Form.getValue(this.this.memberMasterForm, 'planCode');
            memberEligHistory.panelId = Form.getValue(this.this.memberMasterForm, 'panelId');
            memberEligHistory.pcpChangeReason = Form.getValue(this.this.memberMasterForm, 'pcpChngRsn');
            memberEligHistory.seqProv2Id = Form.getValue(this.this.memberMasterForm, 'prov2');
            memberEligHistory.hireDate = Form.getValue(this.this.memberMasterForm, 'hireDate');
            memberEligHistory.salary = Form.getValue(this.this.memberMasterForm, 'salary');
            memberEligHistory.benefitStartDate = Form.getValue(this.this.memberMasterForm, 'benStartDate');
            memberEligHistory.otherStatusFlag = Form.getValue(this.this.memberMasterForm, 'otherSts');
            memberEligHistory.pecEndDate = Form.getValue(this.this.memberMasterForm, 'pecWaived');
            memberEligHistory.mcUserDate1 = Form.getValue(this.this.memberMasterForm, 'pecEndDate');
            memberEligHistory.privacyOn = Form.getValue(this.this.memberMasterForm, 'privacyOn');
            this.memberEligHistoryService.createMemberEligHistory(memberEligHistory).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateMemberEligHistory(seqEligHist : number) {
        this.formValidation.validateForm();
        if(this.memberMasterForm.valid) {
            let memberEligHistory = new MemberEligHistory();
            memberEligHistory.subscriberId = Form.getValue(this.this.memberMasterForm, 'subscriberId');
            memberEligHistory.personNumber = Form.getValue(this.this.memberMasterForm, 'personNo');
            memberEligHistory.mcUserDefined1 = Form.getValue(this.this.memberMasterForm, 'mcInd');
            memberEligHistory.effectiveDate = Form.getValue(this.this.memberMasterForm, 'effDate');
            memberEligHistory.termDate = Form.getValue(this.this.memberMasterForm, 'termDate');
            memberEligHistory.termReason = Form.getValue(this.this.memberMasterForm, 'termRsn');
            memberEligHistory.dateOfDeath = Form.getValue(this.this.memberMasterForm, 'dateOfDeath');
            memberEligHistory.seqEligHist = Form.getValue(this.this.memberMasterForm, 'eligSts');
            memberEligHistory.seqGroupId = Form.getValue(this.this.memberMasterForm, 'groupId');
            memberEligHistory.planCode = Form.getValue(this.this.memberMasterForm, 'planCode');
            memberEligHistory.panelId = Form.getValue(this.this.memberMasterForm, 'panelId');
            memberEligHistory.pcpChangeReason = Form.getValue(this.this.memberMasterForm, 'pcpChngRsn');
            memberEligHistory.seqProv2Id = Form.getValue(this.this.memberMasterForm, 'prov2');
            memberEligHistory.hireDate = Form.getValue(this.this.memberMasterForm, 'hireDate');
            memberEligHistory.salary = Form.getValue(this.this.memberMasterForm, 'salary');
            memberEligHistory.benefitStartDate = Form.getValue(this.this.memberMasterForm, 'benStartDate');
            memberEligHistory.otherStatusFlag = Form.getValue(this.this.memberMasterForm, 'otherSts');
            memberEligHistory.pecEndDate = Form.getValue(this.this.memberMasterForm, 'pecWaived');
            memberEligHistory.mcUserDate1 = Form.getValue(this.this.memberMasterForm, 'pecEndDate');
            memberEligHistory.privacyOn = Form.getValue(this.this.memberMasterForm, 'privacyOn');
            this.memberEligHistoryService.updateMemberEligHistory(memberEligHistory, seqEligHist).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMemberEligHistory = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveMemberEligHistory() {
        if(this.editMemberEligHistory) {
            this.updateMemberEligHistory(this.memberEligHistory.seqEligHist)
        } else {
            this.createMemberEligHistory();
        }
    }    deleteMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.deleteMemberEligHistory(seqEligHist).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getMemberEligHistory(seqEligHist : number) {
        this.memberEligHistoryService.getMemberEligHistory(seqEligHist).subscribe(memberEligHistory => {
            this.memberEligHistory = memberEligHistory;
            this.memberMasterForm.patchValue({
                'subscriberId': this.memberEligHistory.subscriberId,
                'personNo': this.memberEligHistory.personNumber,
                'mcInd': this.memberEligHistory.mcUserDefined1,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.termDate),
                'termRsn': this.memberEligHistory.termReason,
                'dateOfDeath': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.dateOfDeath),
                'eligSts': this.memberEligHistory.seqEligHist,
                'groupId': this.memberEligHistory.seqGroupId,
                'planCode': this.memberEligHistory.planCode,
                'panelId': this.memberEligHistory.panelId,
                'pcpChngRsn': this.memberEligHistory.pcpChangeReason,
                'prov2': this.memberEligHistory.seqProv2Id,
                'hireDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.hireDate),
                'salary': this.memberEligHistory.salary,
                'benStartDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.benefitStartDate),
                'otherSts': this.memberEligHistory.otherStatusFlag,
                'pecWaived': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.pecEndDate),
                'pecEndDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEligHistory.mcUserDate1),
                'privacyOn': this.memberEligHistory.privacyOn,
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



    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
     private groupMasterService: GroupMasterService, private memberMasterService: MemberMasterService, private memberEligHistoryService: MemberEligHistoryService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.memberMasterForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.memberMasterForm = this.formBuilder.group({
            diamondId: ['', {updateOn: 'blur', validators: [] }],
            subscriberId: ['', {updateOn: 'blur', validators: [] }],
            personNo: ['', {updateOn: 'blur', validators: [] }],
            subsPersonNo: ['', {updateOn: 'blur', validators: [] }],
            cobInd: ['', {updateOn: 'blur', validators: [] }],
            dualCov: ['', {updateOn: 'blur', validators: [] }],
            caseMgmt: ['', {updateOn: 'blur', validators: [] }],
            mcInd: ['', {updateOn: 'blur', validators: [] }],
            lastNm: ['', {updateOn: 'blur', validators: [] }],
            first: ['', {updateOn: 'blur', validators: [] }],
            mi: ['', {updateOn: 'blur', validators: [] }],
            empStat: ['', {updateOn: 'blur', validators: [] }],
            salutation: ['', {updateOn: 'blur', validators: [] }],
            dob: ['', {updateOn: 'blur', validators: [] }],
            gender: ['', {updateOn: 'blur', validators: [] }],
            maritalSts: ['', {updateOn: 'blur', validators: [] }],
            addrType: ['', {updateOn: 'blur', validators: [] }],
            lang: ['', {updateOn: 'blur', validators: [] }],
            occupat: ['', {updateOn: 'blur', validators: [] }],
            citizenship: ['', {updateOn: 'blur', validators: [] }],
            medicare: ['', {updateOn: 'blur', validators: [] }],
            medicaid: ['', {updateOn: 'blur', validators: [] }],
            socSec: ['', {updateOn: 'blur', validators: [] }],
            empNo: ['', {updateOn: 'blur', validators: [] }],
            medRec: ['', {updateOn: 'blur', validators: [] }],
            altMembId: ['', {updateOn: 'blur', validators: [] }],
            textbox001: ['', {updateOn: 'blur', validators: [] }],
            effDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            termRsn: ['', {updateOn: 'blur', validators: [] }],
            dateOfDeath: ['', {updateOn: 'blur', validators: [] }],
            eligSts: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            relCode: ['', {updateOn: 'blur', validators: [] }],
            riders: ['', {updateOn: 'blur', validators: [] }],
            textbox002: ['', {updateOn: 'blur', validators: [] }],
            textbox003: ['', {updateOn: 'blur', validators: [] }],
            textbox004: ['', {updateOn: 'blur', validators: [] }],
            textbox005: ['', {updateOn: 'blur', validators: [] }],
            textbox006: ['', {updateOn: 'blur', validators: [] }],
            textbox007: ['', {updateOn: 'blur', validators: [] }],
            textbox008: ['', {updateOn: 'blur', validators: [] }],
            textbox009: ['', {updateOn: 'blur', validators: [] }],
            textbox010: ['', {updateOn: 'blur', validators: [] }],
            groupId: ['', {updateOn: 'blur', validators: [] }],
            planCode: ['', {updateOn: 'blur', validators: [] }],
            lob: ['', {updateOn: 'blur', validators: [] }],
            textbox011: ['', {updateOn: 'blur', validators: [] }],
            textbox012: ['', {updateOn: 'blur', validators: [] }],
            textbox013: ['', {updateOn: 'blur', validators: [] }],
            textbox014: ['', {updateOn: 'blur', validators: [] }],
            textbox015: ['', {updateOn: 'blur', validators: [] }],
            textbox016: ['', {updateOn: 'blur', validators: [] }],
            textbox017: ['', {updateOn: 'blur', validators: [] }],
            textbox018: ['', {updateOn: 'blur', validators: [] }],
            textbox019: ['', {updateOn: 'blur', validators: [] }],
            textbox020: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }],
            panelId: ['', {updateOn: 'blur', validators: [] }],
            ipa: ['', {updateOn: 'blur', validators: [] }],
            pcpId: ['', {updateOn: 'blur', validators: [] }],
            pcpChngRsn: ['', {updateOn: 'blur', validators: [] }],
            prov2: ['', {updateOn: 'blur', validators: [] }],
            rpt1: ['', {updateOn: 'blur', validators: [] }],
            emirateArch: ['', {updateOn: 'blur', validators: [] }],
            dept: ['', {updateOn: 'blur', validators: [] }],
            location: ['', {updateOn: 'blur', validators: [] }],
            hireDate: ['', {updateOn: 'blur', validators: [] }],
            salary: ['', {updateOn: 'blur', validators: [] }],
            mCareSts: ['', {updateOn: 'blur', validators: [] }],
            benStartDate: ['', {updateOn: 'blur', validators: [] }],
            otherSts: ['', {updateOn: 'blur', validators: [] }],
            pecWaived: ['', {updateOn: 'blur', validators: [] }],
            pecEndDate: ['', {updateOn: 'blur', validators: [] }],
            reason: ['', {updateOn: 'blur', validators: [] }],
            csInd: ['', {updateOn: 'blur', validators: [] }],
            rateType: ['', {updateOn: 'blur', validators: [] }],
            rpt2: ['', {updateOn: 'blur', validators: [] }],
            rpt3: ['', {updateOn: 'blur', validators: [] }],
            privacyOn: ['', {updateOn: 'blur', validators: [] }],
            residenceProv: ['', {updateOn: 'blur', validators: [] }],
            workProv: ['', {updateOn: 'blur', validators: [] }],
            payrollProv: ['', {updateOn: 'blur', validators: [] }],
            taxExempt: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}