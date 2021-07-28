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
import {  NoteMaster } from "../../api-models/index"
import {  NoteMasterService } from "../../api-services/note-master.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'

// Use the Component directive to define the NotesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'notes',
    templateUrl: './notes.component.html',
    providers: [        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        NoteMasterService
]

})
export class NotesComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    notesForm: FormGroup;
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

editNoteMaster: boolean;
    noteMaster: NoteMaster;
    noteMasters: NoteMaster[];
    createNoteMaster() {
        this.formValidation.validateForm();
        if(this.notesForm.valid) {
            let noteMaster = new NoteMaster();
            noteMaster.noteType = Form.getValue(this.this.notesForm, 'allTypes');
            noteMaster.priority = Form.getValue(this.this.notesForm, 'priority001');
            noteMaster.noteDate = Form.getValue(this.this.notesForm, 'notesDates');
            noteMaster.seqGroupId = Form.getValue(this.this.notesForm, 'group');
            noteMaster.followupDate = Form.getValue(this.this.notesForm, 'followUpDate');
            noteMaster.seqProvId = Form.getValue(this.this.notesForm, 'provider');
            noteMaster.updateUser = Form.getValue(this.this.notesForm, 'date');
            noteMaster.followupCode = Form.getValue(this.this.notesForm, 'followupDate');
            noteMaster.expirationDate = Form.getValue(this.this.notesForm, 'expireDate');
            noteMaster.userDate1 = Form.getValue(this.this.notesForm, 'userDef1');
            noteMaster.userDate2 = Form.getValue(this.this.notesForm, 'userDate1');
            noteMaster.userDefined2 = Form.getValue(this.this.notesForm, 'userDef2');
            noteMaster.userDate3 = Form.getValue(this.this.notesForm, 'userDate2');
            noteMaster.userDefined3 = Form.getValue(this.this.notesForm, 'userDef3');
            noteMaster.userDate4 = Form.getValue(this.this.notesForm, 'userDate3');
            noteMaster.userDefined4 = Form.getValue(this.this.notesForm, 'userDef4');
            noteMaster.userDate5 = Form.getValue(this.this.notesForm, 'userDate4');
            noteMaster.userDefined5 = Form.getValue(this.this.notesForm, 'userDef5');
            noteMaster.userDefined1 = Form.getValue(this.this.notesForm, 'userDate5');
            this.noteMasterService.createNoteMaster(noteMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editNoteMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }


    updateNoteMaster(seqNoteId : number) {
        this.formValidation.validateForm();
        if(this.notesForm.valid) {
            let noteMaster = new NoteMaster();
            noteMaster.noteType = Form.getValue(this.this.notesForm, 'allTypes');
            noteMaster.priority = Form.getValue(this.this.notesForm, 'priority001');
            noteMaster.noteDate = Form.getValue(this.this.notesForm, 'notesDates');
            noteMaster.seqGroupId = Form.getValue(this.this.notesForm, 'group');
            noteMaster.followupDate = Form.getValue(this.this.notesForm, 'followUpDate');
            noteMaster.seqProvId = Form.getValue(this.this.notesForm, 'provider');
            noteMaster.updateUser = Form.getValue(this.this.notesForm, 'date');
            noteMaster.followupCode = Form.getValue(this.this.notesForm, 'followupDate');
            noteMaster.expirationDate = Form.getValue(this.this.notesForm, 'expireDate');
            noteMaster.userDate1 = Form.getValue(this.this.notesForm, 'userDef1');
            noteMaster.userDate2 = Form.getValue(this.this.notesForm, 'userDate1');
            noteMaster.userDefined2 = Form.getValue(this.this.notesForm, 'userDef2');
            noteMaster.userDate3 = Form.getValue(this.this.notesForm, 'userDate2');
            noteMaster.userDefined3 = Form.getValue(this.this.notesForm, 'userDef3');
            noteMaster.userDate4 = Form.getValue(this.this.notesForm, 'userDate3');
            noteMaster.userDefined4 = Form.getValue(this.this.notesForm, 'userDef4');
            noteMaster.userDate5 = Form.getValue(this.this.notesForm, 'userDate4');
            noteMaster.userDefined5 = Form.getValue(this.this.notesForm, 'userDef5');
            noteMaster.userDefined1 = Form.getValue(this.this.notesForm, 'userDate5');
            this.noteMasterService.updateNoteMaster(noteMaster, seqNoteId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editNoteMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
    }    saveNoteMaster() {
        if(this.editNoteMaster) {
            this.updateNoteMaster(this.noteMaster.seqNoteId)
        } else {
            this.createNoteMaster();
        }
    }    deleteNoteMaster(seqNoteId : number) {
        this.noteMasterService.deleteNoteMaster(seqNoteId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
        });
    }    getNoteMaster(seqNoteId : number) {
        this.noteMasterService.getNoteMaster(seqNoteId).subscribe(noteMaster => {
            this.noteMaster = noteMaster;
            this.notesForm.patchValue({
                'allTypes': this.noteMaster.noteType,
                'priority001': this.noteMaster.priority,
                'notesDates': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.noteDate),
                'group': this.noteMaster.seqGroupId,
                'followUpDate': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.followupDate),
                'provider': this.noteMaster.seqProvId,
                'date': this.noteMaster.updateUser,
                'followupDate': this.noteMaster.followupCode,
                'expireDate': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.expirationDate),
                'userDef1': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate1),
                'userDate1': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate2),
                'userDef2': this.noteMaster.userDefined2,
                'userDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate3),
                'userDef3': this.noteMaster.userDefined3,
                'userDate3': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate4),
                'userDef4': this.noteMaster.userDefined4,
                'userDate4': this.dateFormatPipe.defaultDisplayDateFormat(this.noteMaster.userDate5),
                'userDef5': this.noteMaster.userDefined5,
                'userDate5': this.noteMaster.userDefined1,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getNoteMasters() {
        this.noteMasterService.getNoteMasters().subscribe(noteMasters => {
        this.noteMasters = noteMasters;
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
     private noteMasterService: NoteMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.notesForm);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.notesForm = this.formBuilder.group({
            allTypes: ['', {updateOn: 'blur', validators: [] }],
            type001: ['', {updateOn: 'blur', validators: [] }],
            priority001: ['', {updateOn: 'blur', validators: [] }],
            notesDates: ['', {updateOn: 'blur', validators: [] }],
            none: ['', {updateOn: 'blur', validators: [] }],
            group: ['', {updateOn: 'blur', validators: [] }],
            followUpDate: ['', {updateOn: 'blur', validators: [] }],
            member: ['', {updateOn: 'blur', validators: [] }],
            provider: ['', {updateOn: 'blur', validators: [] }],
            type002: ['', {updateOn: 'blur', validators: [] }],
            priority002: ['', {updateOn: 'blur', validators: [] }],
            date: ['', {updateOn: 'blur', validators: [] }],
            followupDate: ['', {updateOn: 'blur', validators: [] }],
            followupCode: ['', {updateOn: 'blur', validators: [] }],
            textArea: ['', {updateOn: 'blur', validators: [] }],
            expireDate: ['', {updateOn: 'blur', validators: [] }],
            userDef1: ['', {updateOn: 'blur', validators: [] }],
            userDate1: ['', {updateOn: 'blur', validators: [] }],
            userDef2: ['', {updateOn: 'blur', validators: [] }],
            userDate2: ['', {updateOn: 'blur', validators: [] }],
            userDef3: ['', {updateOn: 'blur', validators: [] }],
            userDate3: ['', {updateOn: 'blur', validators: [] }],
            userDef4: ['', {updateOn: 'blur', validators: [] }],
            userDate4: ['', {updateOn: 'blur', validators: [] }],
            userDef5: ['', {updateOn: 'blur', validators: [] }],
            userDate5: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}