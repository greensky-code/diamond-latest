/* Copyright (c) 2021 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContactTitleMaster, MessageMasterDtl, SecUser, SecWin, SubmitterProfileMaster} from '../../../api-models/index'
import {SubmitterProfileMasterService} from '../../../api-services/submitter-profile-master.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {
    ContactTitleMasterService,
    MessageMasterDtlService,
    SecUserService,
    SystemCodesService
} from '../../../api-services';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';

import {SubmitterMasterLookup} from '../../../shared/submitter-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {ZipCodesService} from '../../../api-services/zip-codes.service';
import {ZipCodes} from '../../../api-models/zip-codes';
import {getSUBMTShortcutKeys} from '../../../shared/services/shared.service';
import {DEFAULT_LANGUAGE, SYSTEM_CODE_MELIGLOC} from '../../../shared/models/constants';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";

// Use the Component directive to define the SubmitterMasterComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'submittermaster',
    templateUrl: './submitter-master.component.html',
    providers: [SubmitterProfileMasterService]

})
export class SubmitterMasterComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.shortcuts.push(...getSUBMTShortcutKeys(this));
        this.cdr.detectChanges();
    }

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    submitterMasterForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'SUBMT';
    public isSuperUser = false;
    public secProgress = true;
    secColDetails: SecColDetail[] = [];
    countries: any[] = [];
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    userTemplateId: string;
    modemModels = [{
        'name': 'None',
        'value': 'None'
    },{
        'name': '1200',
        'value': '1200'
    },{
        'name': '2400',
        'value': '2400'
    },{
        'name': '4800',
        'value': '4800'
    },{
        'name': '9600',
        'value': '9600'
    },{
        'name': '14400',
        'value': '14400'
    },{
        'name': '28800',
        'value': '28800'
    }]
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @Input() showIcon = true;
    showFullForm = false;
    submitterIdReadonly = false;
    titles: ContactTitleMaster[] = [];
    ifFormHasChanges = false;
    private zipCode: ZipCodes;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;


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
            this.submitterIdReadonly = true;
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getCountries() {
        this.systemCodesService.getSystemCodesByLangAndtype(SYSTEM_CODE_MELIGLOC, DEFAULT_LANGUAGE).subscribe(systemCodes => {
            this.countries = systemCodes;
            this.countries.sort((a: any, b: any) => {
                if ((a["systemCodeDesc2"] || '').toLowerCase() < (b["systemCodeDesc2"] || '').toLowerCase()) {
                    return -1;
                } else if ((a["systemCodeDesc2"] || '').toLowerCase() > (b["systemCodeDesc2"] || '').toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    editSubmitterProfileMaster: boolean;
    submitterProfileMaster: SubmitterProfileMaster;
    submitterProfileMasters: SubmitterProfileMaster[];

    createSubmitterProfileMaster() {
        this.formValidation.validateForm();
        if (this.submitterMasterForm.valid) {

            this.secProgress = true;
            let submitterProfileMaster = new SubmitterProfileMaster();
            submitterProfileMaster.submitterId = Form.getValue(this.submitterMasterForm, 'submitterId');
            submitterProfileMaster.submitterName = Form.getValue(this.submitterMasterForm, 'submitterName');
            submitterProfileMaster.addressLine1 = Form.getValue(this.submitterMasterForm, 'addressLine1');
            submitterProfileMaster.addressLine2 = Form.getValue(this.submitterMasterForm, 'addressLine2');
            submitterProfileMaster.city = Form.getValue(this.submitterMasterForm, 'city');
            submitterProfileMaster.zipCode = Form.getValue(this.submitterMasterForm, 'zipCode');
            submitterProfileMaster.state = Form.getValue(this.submitterMasterForm, 'state');
            submitterProfileMaster.country = Form.getValue(this.submitterMasterForm, 'country');
            submitterProfileMaster.phoneNumber = Form.getValue(this.submitterMasterForm, 'phoneNumber');
            submitterProfileMaster.faxNumber = Form.getValue(this.submitterMasterForm, 'faxNumber');
            submitterProfileMaster.contactName = Form.getValue(this.submitterMasterForm, 'contactName');
            submitterProfileMaster.contactTitle = Form.getValue(this.submitterMasterForm, 'contactTitle');
            submitterProfileMaster.userDefined1 = Form.getValue(this.submitterMasterForm, 'userDefined1');
            submitterProfileMaster.userDefined2 = Form.getValue(this.submitterMasterForm, 'userDefined2');
            submitterProfileMaster.userDefined3 = Form.getValue(this.submitterMasterForm, 'userDefined3');
            submitterProfileMaster.userDefined4 = Form.getValue(this.submitterMasterForm, 'userDefined4');
            submitterProfileMaster.userDefined5 = Form.getValue(this.submitterMasterForm, 'userDefined5');
            submitterProfileMaster.userDefined6 = Form.getValue(this.submitterMasterForm, 'userDefined6');
            submitterProfileMaster.userDefined7 = Form.getValue(this.submitterMasterForm, 'userDefined7');
            submitterProfileMaster.externalReference = Form.getValue(this.submitterMasterForm, 'externalReference');
            submitterProfileMaster.modemModel = Form.getValue(this.submitterMasterForm, 'modemModel');
            submitterProfileMaster.modemSpeed = Form.getValue(this.submitterMasterForm, 'modemSpeed');
            submitterProfileMaster.modemMake = Form.getValue(this.submitterMasterForm, 'modemMake');
            submitterProfileMaster.computerDialupNo = Form.getValue(this.submitterMasterForm, 'computerDailupNo');

            this.auditService.setAuditFields(submitterProfileMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.submitterProfileMasterService.createSubmitterProfileMaster(submitterProfileMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editSubmitterProfileMaster = false;
                this.ifFormHasChanges = false;
                this.secProgress = false;
                this.submitterProfileMaster = response;
                if (this.screenCloseRequest) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateSubmitterProfileMaster(submitterId: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.submitterMasterForm.valid) {
            this.secProgress = true;
            let submitterProfileMaster = this.submitterProfileMaster;
            submitterProfileMaster.submitterId = submitterId;
            submitterProfileMaster.submitterName = Form.getValue(this.submitterMasterForm, 'submitterName');
            submitterProfileMaster.addressLine1 = Form.getValue(this.submitterMasterForm, 'addressLine1');
            submitterProfileMaster.addressLine2 = Form.getValue(this.submitterMasterForm, 'addressLine2');
            submitterProfileMaster.city = Form.getValue(this.submitterMasterForm, 'city');
            submitterProfileMaster.zipCode = Form.getValue(this.submitterMasterForm, 'zipCode');
            submitterProfileMaster.state = Form.getValue(this.submitterMasterForm, 'state');
            submitterProfileMaster.country = Form.getValue(this.submitterMasterForm, 'country');
            submitterProfileMaster.phoneNumber = Form.getValue(this.submitterMasterForm, 'phoneNumber');
            submitterProfileMaster.faxNumber = Form.getValue(this.submitterMasterForm, 'faxNumber');
            submitterProfileMaster.contactName = Form.getValue(this.submitterMasterForm, 'contactName');
            submitterProfileMaster.contactTitle = Form.getValue(this.submitterMasterForm, 'title');
            submitterProfileMaster.userDefined1 = Form.getValue(this.submitterMasterForm, 'userDefined1');
            submitterProfileMaster.userDefined2 = Form.getValue(this.submitterMasterForm, 'userDefined2');
            submitterProfileMaster.userDefined3 = Form.getValue(this.submitterMasterForm, 'userDefined3');
            submitterProfileMaster.userDefined4 = Form.getValue(this.submitterMasterForm, 'userDefined4');
            submitterProfileMaster.userDefined5 = Form.getValue(this.submitterMasterForm, 'userDefined5');
            submitterProfileMaster.userDefined6 = Form.getValue(this.submitterMasterForm, 'userDefined6');
            submitterProfileMaster.userDefined7 = Form.getValue(this.submitterMasterForm, 'userDefined7');
            submitterProfileMaster.externalReference = Form.getValue(this.submitterMasterForm, 'externalReference');
            submitterProfileMaster.modemModel = Form.getValue(this.submitterMasterForm, 'modemModel');
            submitterProfileMaster.modemSpeed = Form.getValue(this.submitterMasterForm, 'modemSpeed');
            submitterProfileMaster.modemMake = Form.getValue(this.submitterMasterForm, 'modemMake');
            submitterProfileMaster.computerDialupNo = Form.getValue(this.submitterMasterForm, 'computerDailupNo');
            submitterProfileMaster.contactTitle = this.submitterMasterForm.controls['title'].value;

            this.auditService.setAuditFields(submitterProfileMaster, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.submitterProfileMasterService.updateSubmitterProfileMaster(submitterProfileMaster, submitterId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editSubmitterProfileMaster = false;
                this.ifFormHasChanges = false;
                this.secProgress = false;
                this.getSubmitterProfileMaster(submitterProfileMaster.submitterId);
                if (this.screenCloseRequest) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
        //   } else {
        //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        //   }
    }

    saveSubmitterProfileMaster() {
        if (this.editSubmitterProfileMaster) {
            this.updateSubmitterProfileMaster(this.submitterMasterForm.controls['submitterId'].value)
        } else {
            this.createSubmitterProfileMaster();
        }
    }

    deleteSubmitterProfileMaster(tradingPartnerId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.submitterProfileMasterService.deleteSubmitterProfileMaster(tradingPartnerId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getSubmitterProfileMaster(submitterId: string) {
        this.secProgress = true;
        this.submitterProfileMasterService.getSubmitterProfileMaster(submitterId).subscribe(submitterProfileMaster => {

            if (submitterProfileMaster) {

                this.setFormData(submitterProfileMaster, true);


                this.secProgress = false;
            } else {
                this.messageService
                    .findByMessageId(18020)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.showPopUp(
                            '18020: ' +
                            message[0].messageText,
                            'Submitter Master'
                        );
                    });
            }

        }, error => {
            this.messageService
                .findByMessageId(18020)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        ': ' +
                        message[0].messageText,
                        'Submitter Master'
                    );
                });
            let popMsg = new PopUpMessage(
                'groupNotExistPopup',
                'Submitter Master',
                '18020: Entered Submitter ID does not exists. Press yes to create a new  Submitter ID.',
                'icon'
            );
            popMsg.buttons = [
                new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'),
                new PopUpMessageButton('no', 'No', 'btn btn-primary'),
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {
                size: 'lg',
            });
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.showIcon = true;
            ref.componentInstance['buttonclickEvent'].subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
            //  this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    popUpButtonClicked(event) {

        let submitterProfileMaster: SubmitterProfileMaster = new SubmitterProfileMaster();
        submitterProfileMaster.submitterId = this.submitterMasterForm.controls['submitterId'].value;
        this.setFormData(submitterProfileMaster, false);
    }

    setFormData(submitterProfileMaster: SubmitterProfileMaster, edit: boolean) {
        this.submitterProfileMaster = submitterProfileMaster;
        this.showFullForm = true;
        this.submitterIdReadonly = true;
        this.editSubmitterProfileMaster = edit;
        this.submitterMasterForm.patchValue({
            'submitterId': submitterProfileMaster.submitterId,
            'submitterName': submitterProfileMaster.submitterName,
            'addressLine1': submitterProfileMaster.addressLine1,
            'addressLine2': submitterProfileMaster.addressLine2,
            'city': submitterProfileMaster.city,
            'zipCode': submitterProfileMaster.zipCode,
            'state': submitterProfileMaster.state,
            'country': submitterProfileMaster.country,
            'contactName': submitterProfileMaster.contactName,
            'phoneNumber': submitterProfileMaster.phoneNumber,
            'faxNumber': submitterProfileMaster.faxNumber,
            'title': submitterProfileMaster.contactTitle,
            'userDefined1': submitterProfileMaster.userDefined1,
            'userDefined2': submitterProfileMaster.userDefined2,
            'userDefined3': submitterProfileMaster.userDefined3,
            'userDefined4': submitterProfileMaster.userDefined4,
            'userDefined5': submitterProfileMaster.userDefined5,
            'userDefined6': submitterProfileMaster.userDefined6,
            'userDefined7': submitterProfileMaster.userDefined7,
            'externalReference': submitterProfileMaster.externalReference,
            'modemModel': submitterProfileMaster.modemModel,
            'modemSpeed': submitterProfileMaster.modemSpeed,
            'modemMake': submitterProfileMaster.modemMake,
            'computerDailupNo': submitterProfileMaster.computerDialupNo,
        }, {emitEvent: false});
        this.isFormDataModified()
    }

    getSubmitterProfileMasters() {
        this.submitterProfileMasterService.getSubmitterProfileMasters().subscribe(SubmitterProfileMasters => {
            this.submitterProfileMasters = SubmitterProfileMasters;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
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
        private submitterProfileMasterService: SubmitterProfileMasterService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private messageService: MessageMasterDtlService,
        private activeModal: NgbActiveModal,
        private router: Router,
        private contactTitleMasterService: ContactTitleMasterService,
        private zipCodesService: ZipCodesService,
        private cdr: ChangeDetectorRef,
        private systemCodesService: SystemCodesService,
        private auditService: AuditService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.submitterMasterForm);
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
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
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
            (secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Member Master Permission'
                    );
                }
            },
            (error) => {
                this.showPopUp(error, 'Window Error');
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_CLAIM_LINK_RULE', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    private initializePermission(): void {
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
        this.menuInit();
        this.getContactTitles();
        this.getCountries();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.submitterMasterForm = this.formBuilder.group({
            submitterId: ['', {updateOn: 'blur', validators: []}],
            // tradingPartnerType: ['', {updateOn: 'blur', validators: [] }],
            submitterName: ['', {updateOn: 'blur', validators: []}],
            addressLine1: ['', {updateOn: 'blur', validators: []}],
            addressLine2: ['', {updateOn: 'blur', validators: []}],
            city: ['', {updateOn: 'blur', validators: []}],
            zipCode: ['', {updateOn: 'blur', validators: []}],
            state: ['', {updateOn: 'blur', validators: []}],
            country: ['', {updateOn: 'blur', validators: []}],
            contactName: ['', {updateOn: 'blur', validators: []}],
            phoneNumber: ['', {updateOn: 'blur', validators: [Validators.maxLength(10)]}],
            title: ['', {updateOn: 'blur', validators: []}],
            faxNumber: ['', {updateOn: 'blur', validators: [Validators.maxLength(10)]}],
            computerDailupNo: ['', {updateOn: 'blur', validators: []}],
            modemMake: ['', {updateOn: 'blur', validators: []}],
            modemSpeed: ['', {updateOn: 'blur', validators: []}],
            modemModel: ['', {updateOn: 'blur', validators: []}],
            externalReference: ['', {updateOn: 'blur', validators: []}],
            userDefined1: ['', {updateOn: 'blur', validators: []}],
            userDefined2: ['', {updateOn: 'blur', validators: []}],
            userDefined3: ['', {updateOn: 'blur', validators: []}],
            userDefined4: ['', {updateOn: 'blur', validators: []}],
            userDefined5: ['', {updateOn: 'blur', validators: []}],
            userDefined6: ['', {updateOn: 'blur', validators: []}],
            userDefined7: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});

        this.submitterMasterForm.valueChanges.subscribe(change => {
            if (change) {
                this.ifFormHasChanges = true;
            }
        })
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    onKeyDown(event) {

        switch (event.target.id) {
            case 'submitterId':
                switch (event.key) {
                    case 'F5':
                        event.preventDefault();
                        this.openF5Lookup();
                        break;
                    case 'Tab':
                        event.preventDefault();
                        this.getSubmitterProfileMaster(event.target.value);
                        break;
                }
                break;


        }
    }

    onTabZipLookup(value: string) {
        if (value) {
            this.secProgress = true;

            this.zipCodesService.getZipCode(value).subscribe((data) => {
                this.secProgress = false;
                if (data) {

                    this.secProgress = true;
                    this.messageService
                        .findByMessageId(5524)
                        .subscribe((message: MessageMasterDtl[]) => {
                            this.secProgress = false;
                            this.showPopUp(
                                '27078: ' +
                                message[0].messageText,
                                'Zip Code'
                            );
                        });
                }

            }, error => {
                this.messageService
                    .findByMessageId(5524)
                    .subscribe((message: MessageMasterDtl[]) => {
                        this.secProgress = false;
                        this.showPopUp(
                            '27078: ' +
                            message[0].messageText,
                            'Zip Code'
                        );
                    });
            });
        } else {
            this.secProgress = true;
            this.messageService
                .findByMessageId(5524)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.secProgress = false;
                    this.showPopUp(
                        '27078: ' +
                        message[0].messageText,
                        'Zip Code'
                    );
                });
        }
    }


    findDetailByZipCode(event: any) {
        this.zipCode = new ZipCodes();
        let zipCode = event.target.value;
        this.zipCodesService.getZipCode(zipCode).subscribe(resp => {
            if (resp !== null) {
                this.zipCode = resp;
                this.setCityAndStateProvByZipCode(this.zipCode);
            }
        });
    }

    setCityAndStateProvByZipCode(zipCode: ZipCodes) {
        this.submitterMasterForm.patchValue({
            'city': zipCode.city,
            'state': zipCode.state,
            'zipCode': zipCode.zip,
        });
    }

    submitterSearchModel = new SearchModel(
        'submitterprofilemasters/lookup',
        SubmitterMasterLookup.SUBMITTER_MASTER_ALL,
        SubmitterMasterLookup.SUBMITTER_MASTER_DEFAULT,
        []
    );


    openF5Lookup() {

        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.submitterSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.defaultLoad = false;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.setFormData(res, true);
            }
        });
    }


    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z'},
                    {isHorizontal: true},
                    {name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X'},
                    {name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C'},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Master File'},
                    {name: 'Details File'},
                ],
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Submitter Lookup'},
                ],
            },
            {
                menuItem: 'Notes',
                dropdownItems: [{name: 'Notes', shortcutKey: 'F4', disabled: true}],
            },
            {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Note Type'},
                    {name: '3 Group Master'},
                    {name: '4 Notes'},
                    {name: '5 Member Master'},
                    {name: '6 Price Rule'},
                    {name: '7 Plan'},
                    {name: '8 Windows Access'},
                    {name: '9 Submitter Master'}
                ],
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ],
            },
        ];
    }

    onMenuItemClick(eve) {
        if (eve.menu.menuItem === 'File') {
            // handle File actions
            switch (eve.action) {
                case 'New': {
                    this.resetAll();
                    break;
                }
                case 'Open': {
                    this.resetAll();
                    break;
                }
                case 'Save': {

                    this.saveSubmitterProfileMaster();

                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Shortcut Menu': {
                    const ref = this.modalService.open(
                        FunctionalGroupShortCutComponent
                    );
                    ref.componentInstance.showIcon = true;
                    break;
                }

                default: {
                    break;
                }
            }
        } else if (eve.menu.menuItem === 'Edit') {
            if (eve.action == 'Lookup') {
                this.openF5Lookup();
            }

        } else if (eve.menu.menuItem === 'Topic') {
            // handle Topic-Menu Actions
            //   this.sharedService.onProcedureCodeMenuClick(
            //     eve.action,
            //     "Procedure Price",
            //     this.activeModal,
            //     this.procedurePrice['procedurePricePrimaryKey'].procedureCode
            //   );
        } else if (eve.menu.menuItem === 'Special') {
            switch (eve.action) {
                case 'Submitter Lookup': {
                    this.openF5Lookup();
                    break;
                }
            }
        } else if (eve.menu.menuItem === 'Windows') {
            switch (eve.action) {
                case 'Show Timestamp': {
                    this.showTimeStamp();
                    break
                }
                default:
                    break;
            } {

            }
        }
    }

    resetAll() {

        if (this.ifFormHasChanges) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Submitter Master')
            })
        } else {
            this.submitterMasterForm.reset();
            this.submitterIdReadonly = false;
            this.showFullForm = false;
        }
    }

    getContactTitles() {
        this.contactTitleMasterService
            .getContactTitleMasters()
            .subscribe((res: any) => {
                this.titles = res;
            });
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Submitter Master')
            })
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {
                    this.saveSubmitterProfileMaster()
                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.submitterMasterForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    private showTimeStamp = () => {
        if (this.submitterMasterForm.get('submitterId').value === '') {
            this.messageService.findByMessageId(21127).subscribe(res => {
                this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
        } else {
            let ref = this.modalService.open(TimestampComponent);
            ref.componentInstance.title = "Submitter Master";
            ref.componentInstance.insertDateTime = this.submitterProfileMaster.insertDatetimeDisplay;
            ref.componentInstance.insertProcess = this.submitterProfileMaster.insertProcess;
            ref.componentInstance.insertUser = this.submitterProfileMaster.insertUser;
            ref.componentInstance.updateUser = this.submitterProfileMaster.updateUser;
            ref.componentInstance.updateDateTime = this.submitterProfileMaster.updateDatetimeDisplay;
            ref.componentInstance.updateProcess = this.submitterProfileMaster.updateProcess;
        }
    };
}
