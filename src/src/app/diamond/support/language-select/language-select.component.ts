/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecUser, SecWin } from '../../../api-models';
import { LanguageMasterService } from '../../../api-services/language-master.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { LanguageMaster } from '../../../api-models/language-master.model';
import { SecUserService } from '../../../api-services';

// Use the Component directive to define the LanguageComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'language-select',
    templateUrl: './language-select.component.html',
    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        SecWinService,
        SecurityService,
        LanguageMasterService,
    ]

})
export class LanguageSelectComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    languageForm: FormGroup;
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

    private dataLoadedMap = new Map<string, boolean>();
    private batchTableName = "AR_CASH_BATCH_CONTROL";
    private receiptTableName = "AR_CASH_RECEIPT";
    public batchSecColDetails = new Array<SecColDetail>();
    public receiptSecColDetails = new Array<SecColDetail>();
    public userTemplateId: string;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    @Output() languageSelected= new EventEmitter<any>();

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
        private secUserService: SecUserService,
        public activeModal: NgbActiveModal,
        private secColDetailService: SecColDetailService,
        private languageMasterService: LanguageMasterService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        // this.createForm();
        // this.displayMessage = {};
        // this.formValidation = new FormValidation(this.languageForm);
        // this.createDataGrid();
    }
    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    editLanguageMaster: boolean;
    languageMaster: LanguageMaster;
    languageMasters: LanguageMaster[];
    createLanguageMaster() {
        this.formValidation.validateForm();
        if (this.languageForm.valid) {
            let languageMaster = new LanguageMaster();
            languageMaster.languageCode = Form.getValue(this.languageForm, 'languageCodeTbsessionLan');
            languageMaster.description = Form.getValue(this.languageForm, 'description');
            this.languageMasterService.createLanguageMaster(languageMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully created.");
                this.editLanguageMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
    }

    updateLanguageMaster(languageCode: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.languageForm.valid) {
                let languageMaster = new LanguageMaster();
                languageMaster.languageCode = Form.getValue(this.languageForm, 'languageCodeTbsessionLan');
                languageMaster.description = Form.getValue(this.languageForm, 'description');
                this.languageMasterService.updateLanguageMaster(languageMaster, languageCode).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                    this.editLanguageMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
                });
            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    } saveLanguageMaster() {
        if (this.editLanguageMaster) {
            this.updateLanguageMaster(this.languageMaster.languageCode)
        } else {
            this.createLanguageMaster();
        }
    } deleteLanguageMaster(languageCode: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.languageMasterService.deleteLanguageMaster(languageCode).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    findLangCode(event: any) {
        setTimeout(() => {

            if (this.languageForm.value.languageCodeTbsessionLan && event.key === 'Tab') {
                this.getLanguageMaster(this.languageForm.value.languageCodeTbsessionLan);
            }
        }, 500);

    }
    getLanguageMaster(languageCode: string) {
        this.languageMasterService.getLanguageMaster(languageCode).subscribe(languageMaster => {
            this.languageMaster = languageMaster;
            this.languageForm.patchValue({
                'languageCodeTbsessionLan': this.languageMaster.languageCode,
                'description': this.languageMaster.description,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }
    getLanguageMasters() {
        this.languageMasterService.getLanguageMasters().subscribe(languageMasters => {
            this.languageMasters = languageMasters;
            console.log(this.languageMasters);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }


  

    setLanguageSetup(languageMaster: LanguageMaster) {
        this.languageForm.patchValue({
            'langCodeddl': languageMaster.languageId,
            'description': languageMaster.description,
        });
        return languageMaster;
    }

    onSubmit()
    {
        this.languageSelected.emit(this.languageForm.controls['langCodeddl'].value);
        this.activeModal.dismiss('Cross click');
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

    /**
       * Get Security Column Details
       */
    private getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            return;
        }
        this.dataLoadedMap.set('BATCHSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.batchTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('BATCHSECCOL', false);
            this.batchSecColDetails = resp;
            this.batchSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
        this.dataLoadedMap.set('RECEIPTSECCOL', true);
        this.secColDetailService.findByTableNameAndUserId(this.receiptTableName, secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.dataLoadedMap.set('RECEIPTSECCOL', false);
            this.receiptSecColDetails = resp;
            this.receiptSecColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    /**
        * Get Permissions
        * @param secUserId
        */
    private getSecWin(secUserId: string) {
        this.dataLoadedMap.set('SECWIN', false);
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.dataLoadedMap.set('SECWIN', true);
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Provider Master', 'Provider Master Permission')
            }
        }, error => {
            this.dataLoadedMap.set('SECWIN', true);
            this.showPopUp(error, 'Window Error')
        });
    }

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
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
        this.formValidation = new FormValidation(this.languageForm);
        this.getLanguageMasters();
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.languageForm = this.formBuilder.group({
            langCodeddl: ['', { updateOn: 'blur', validators: [] }],
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}