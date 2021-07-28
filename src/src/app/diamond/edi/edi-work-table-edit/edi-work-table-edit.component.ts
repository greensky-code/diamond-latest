/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemberEdiEligWorkService, MessageMasterDtlService, SecUserService} from '../../../api-services'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {MemberEdiEligWork} from '../../../api-models';
import {Menu, SearchModel} from '../../../shared/models/models';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {EdiWorkTableEditLookup} from '../../../shared/lookup/edi-work-table-edit-lookup';
import {getEdiWorkTableEditshortcuts} from '../../../shared/services/shared.service';
import {ProcessEdiSetup} from '../../../api-models/process-edi-setup.model';

// Use the Component directive to define the EdiWorkTableEditComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.


@Component({

    selector: 'ediworktableedit',
    templateUrl: './edi-work-table-edit.component.html',

})
export class EdiWorkTableEditComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    ediWorkTableEditForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'EDIED';
    public isSuperUser = false;
    public secProgress = true;
    public shortcuts: ShortcutInput[] = [];
    private userTemplateId: string;
    public menu: Menu[] = [];
    public showForm1: boolean = false;
    public showForm2: boolean = false;
    public showTable: boolean = false;
    public showForm: boolean = false;
    public selectecProcessEdiSetup: ProcessEdiSetup;

    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    private secColDetails: SecColDetail[];
    private inProgress: boolean = true;
    private closeStatus: boolean = true;
    private popupClose: Boolean = false;
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
        private memberEdiEligWorkService: MemberEdiEligWorkService,
        private secColDetailService: SecColDetailService,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
    ) {}

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        //this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.ediWorkTableEditForm);
        this.createDataGrid();
        this.menuInit();
        //this.getMemberEdiEligWorks();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getEdiWorkTableEditshortcuts(this));
        this.cdr.detectChanges();
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
            console.log('button yes has been click!');
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

    editMemberEdiEligWork: boolean = true;
    memberEdiEligWork: MemberEdiEligWork;
    memberEdiEligWorks: MemberEdiEligWork[] = [];

    createMemberEdiEligWork() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.ediWorkTableEditForm.valid) {
                let memberEdiEligWork = new MemberEdiEligWork();
                memberEdiEligWork.groupId = Form.getValue(this.ediWorkTableEditForm, 'jobId');
                memberEdiEligWork.rateType = Form.getValue(this.ediWorkTableEditForm, 'fileType');
                memberEdiEligWork.diamondId = Form.getValue(this.ediWorkTableEditForm, 'daimondId');
                memberEdiEligWork.subscriberId = Form.getValue(this.ediWorkTableEditForm, 'subId');
                memberEdiEligWork.personNumber = Form.getValue(this.ediWorkTableEditForm, 'persNo');
                memberEdiEligWork.lastName = Form.getValue(this.ediWorkTableEditForm, 'lastNm001');
                memberEdiEligWork.firstName = Form.getValue(this.ediWorkTableEditForm, 'firstName');
                memberEdiEligWork.contactTitle = Form.getValue(this.ediWorkTableEditForm, 'contact');
                memberEdiEligWork.gender = Form.getValue(this.ediWorkTableEditForm, 'gender');
                memberEdiEligWork.maritalStatus = Form.getValue(this.ediWorkTableEditForm, 'maritalStatus');
                memberEdiEligWork.addressLine1 = Form.getValue(this.ediWorkTableEditForm, 'addr1');
                memberEdiEligWork.languageCode = Form.getValue(this.ediWorkTableEditForm, 'language');
                memberEdiEligWork.addressLine2 = Form.getValue(this.ediWorkTableEditForm, 'addr2');
                memberEdiEligWork.busPhoneNumber = Form.getValue(this.ediWorkTableEditForm, 'busPh');
                memberEdiEligWork.respState = Form.getValue(this.ediWorkTableEditForm, 'empStat');
                memberEdiEligWork.city = Form.getValue(this.ediWorkTableEditForm, 'city001');
                memberEdiEligWork.userDate1 = Form.getValue(this.ediWorkTableEditForm, 'userDef1');
                memberEdiEligWork.userDate2 = Form.getValue(this.ediWorkTableEditForm, 'userDef2');
                memberEdiEligWork.state = Form.getValue(this.ediWorkTableEditForm, 'state001');
                memberEdiEligWork.zipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode001');
                memberEdiEligWork.country = Form.getValue(this.ediWorkTableEditForm, 'country001');
                memberEdiEligWork.medicareNo = Form.getValue(this.ediWorkTableEditForm, 'medicare');
                memberEdiEligWork.medicaidNo = Form.getValue(this.ediWorkTableEditForm, 'medicaid');
                memberEdiEligWork.socialSecNo = Form.getValue(this.ediWorkTableEditForm, 'socialSec');
                memberEdiEligWork.employeeNo = Form.getValue(this.ediWorkTableEditForm, 'empNo');
                memberEdiEligWork.medicalRecNo = Form.getValue(this.ediWorkTableEditForm, 'medrec');
                memberEdiEligWork.seqMembId = Form.getValue(this.ediWorkTableEditForm, 'membId');
                memberEdiEligWork.depVerifStatus = Form.getValue(this.ediWorkTableEditForm, 'depVerStat');
                memberEdiEligWork.akaFirstName = Form.getValue(this.ediWorkTableEditForm, 'firstNm');
                memberEdiEligWork.akaLastName = Form.getValue(this.ediWorkTableEditForm, 'lastNm002');
                memberEdiEligWork.akaCity = Form.getValue(this.ediWorkTableEditForm, 'city002');
                memberEdiEligWork.akaState = Form.getValue(this.ediWorkTableEditForm, 'state002');
                memberEdiEligWork.akaZipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode002');
                memberEdiEligWork.akaCountry = Form.getValue(this.ediWorkTableEditForm, 'country002');
                memberEdiEligWork.respFirstName = Form.getValue(this.ediWorkTableEditForm, 'respFirstNm');
                memberEdiEligWork.respLastName = Form.getValue(this.ediWorkTableEditForm, 'respLastNm');
                memberEdiEligWork.respAddressLine1 = Form.getValue(this.ediWorkTableEditForm, 'respAddr1');
                memberEdiEligWork.respCity = Form.getValue(this.ediWorkTableEditForm, 'respPh');
                memberEdiEligWork.respAddressLine2 = Form.getValue(this.ediWorkTableEditForm, 'respAddr2');
                memberEdiEligWork.respCountry = Form.getValue(this.ediWorkTableEditForm, 'respCity');
                memberEdiEligWork.userDate3 = Form.getValue(this.ediWorkTableEditForm, 'state003');
                memberEdiEligWork.respZipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode003');
                memberEdiEligWork.effectiveDate = Form.getValue(this.ediWorkTableEditForm, 'effDate');
                memberEdiEligWork.termDate = Form.getValue(this.ediWorkTableEditForm, 'termDate');
                memberEdiEligWork.termReason = Form.getValue(this.ediWorkTableEditForm, 'termRsn');
                memberEdiEligWork.eligStatus = Form.getValue(this.ediWorkTableEditForm, 'eligStatus');
                memberEdiEligWork.reasonCode = Form.getValue(this.ediWorkTableEditForm, 'relCode');
                memberEdiEligWork.userDefined1 = Form.getValue(this.ediWorkTableEditForm, 'userDef1');
                memberEdiEligWork.ipaId = Form.getValue(this.ediWorkTableEditForm, 'groupId');
                memberEdiEligWork.planCode = Form.getValue(this.ediWorkTableEditForm, 'planCode');
                memberEdiEligWork.pecWaived = Form.getValue(this.ediWorkTableEditForm, 'pcpId');
                memberEdiEligWork.provider2Id = Form.getValue(this.ediWorkTableEditForm, 'prov2Tb');
                memberEdiEligWork.userDate4 = Form.getValue(this.ediWorkTableEditForm, 'stDate');
                memberEdiEligWork.panelId = Form.getValue(this.ediWorkTableEditForm, 'panelId');
                memberEdiEligWork.medicareStatusFlg = Form.getValue(this.ediWorkTableEditForm, 'mcareSt');
                memberEdiEligWork.otherStatusFlag = Form.getValue(this.ediWorkTableEditForm, 'otherSt');
                memberEdiEligWork.hireDate = Form.getValue(this.ediWorkTableEditForm, 'hireDate');
                memberEdiEligWork.premOverrideAmt = Form.getValue(this.ediWorkTableEditForm, 'ovrMt');
                memberEdiEligWork.premOverrideCode = Form.getValue(this.ediWorkTableEditForm, 'ovrCode');
                memberEdiEligWork.premOverrideStep = Form.getValue(this.ediWorkTableEditForm, 'ovrStep');
                memberEdiEligWork.verfiedThruDate = Form.getValue(this.ediWorkTableEditForm, 'verThruDate');
                memberEdiEligWork.holdDate = Form.getValue(this.ediWorkTableEditForm, 'holdDate');
                memberEdiEligWork.holdReason = Form.getValue(this.ediWorkTableEditForm, 'holdReason');
                memberEdiEligWork.subscLocation = Form.getValue(this.ediWorkTableEditForm, 'location');
                memberEdiEligWork.pecEndDate = Form.getValue(this.ediWorkTableEditForm, 'pecEndDate');
                memberEdiEligWork.salary = Form.getValue(this.ediWorkTableEditForm, 'reasonTbSalary');
                memberEdiEligWork.userDate20 = Form.getValue(this.ediWorkTableEditForm, 'userDef2001');
                memberEdiEligWork.userDefined20 = Form.getValue(this.ediWorkTableEditForm, 'userDef2002');
                memberEdiEligWork.userDefined3 = Form.getValue(this.ediWorkTableEditForm, 'userDef3');
                this.memberEdiEligWorkService.createMemberEdiEligWork(memberEdiEligWork).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editMemberEdiEligWork = false;
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.isFormDataChangeStatus = false;
                    }
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {

        }
    }


    updateMemberEdiEligWork(subscriberId: string) {
        if (this.ediWorkTableEditForm.valid) {
            if (this.secWin && this.secWin.hasUpdatePermission()) {
                this.formValidation.validateForm();

                let memberEdiEligWork = new MemberEdiEligWork();
                memberEdiEligWork.groupId = Form.getValue(this.ediWorkTableEditForm, 'jobId');
                memberEdiEligWork.rateType = Form.getValue(this.ediWorkTableEditForm, 'fileType');
                memberEdiEligWork.diamondId = Form.getValue(this.ediWorkTableEditForm, 'daimondId');
                memberEdiEligWork.subscriberId = Form.getValue(this.ediWorkTableEditForm, 'subId');
                memberEdiEligWork.personNumber = Form.getValue(this.ediWorkTableEditForm, 'persNo');
                memberEdiEligWork.lastName = Form.getValue(this.ediWorkTableEditForm, 'lastNm001');
                memberEdiEligWork.firstName = Form.getValue(this.ediWorkTableEditForm, 'firstName');
                memberEdiEligWork.contactTitle = Form.getValue(this.ediWorkTableEditForm, 'contact');
                memberEdiEligWork.gender = Form.getValue(this.ediWorkTableEditForm, 'gender');
                memberEdiEligWork.maritalStatus = Form.getValue(this.ediWorkTableEditForm, 'maritalStatus');
                memberEdiEligWork.addressLine1 = Form.getValue(this.ediWorkTableEditForm, 'addr1');
                memberEdiEligWork.languageCode = Form.getValue(this.ediWorkTableEditForm, 'language');
                memberEdiEligWork.addressLine2 = Form.getValue(this.ediWorkTableEditForm, 'addr2');
                memberEdiEligWork.busPhoneNumber = Form.getValue(this.ediWorkTableEditForm, 'busPh');
                memberEdiEligWork.respState = Form.getValue(this.ediWorkTableEditForm, 'empStat');
                memberEdiEligWork.city = Form.getValue(this.ediWorkTableEditForm, 'city001');
                memberEdiEligWork.userDate1 = Form.getValue(this.ediWorkTableEditForm, 'userDef1');
                memberEdiEligWork.userDate2 = Form.getValue(this.ediWorkTableEditForm, 'userDef2');
                memberEdiEligWork.state = Form.getValue(this.ediWorkTableEditForm, 'state001');
                memberEdiEligWork.zipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode001');
                memberEdiEligWork.country = Form.getValue(this.ediWorkTableEditForm, 'country001');
                memberEdiEligWork.medicareNo = Form.getValue(this.ediWorkTableEditForm, 'medicare');
                memberEdiEligWork.medicaidNo = Form.getValue(this.ediWorkTableEditForm, 'medicaid');
                memberEdiEligWork.socialSecNo = Form.getValue(this.ediWorkTableEditForm, 'socialSec');
                memberEdiEligWork.employeeNo = Form.getValue(this.ediWorkTableEditForm, 'empNo');
                memberEdiEligWork.medicalRecNo = Form.getValue(this.ediWorkTableEditForm, 'medrec');
                memberEdiEligWork.seqMembId = Form.getValue(this.ediWorkTableEditForm, 'membId');
                memberEdiEligWork.depVerifStatus = Form.getValue(this.ediWorkTableEditForm, 'depVerStat');
                memberEdiEligWork.akaFirstName = Form.getValue(this.ediWorkTableEditForm, 'firstNm');
                memberEdiEligWork.akaLastName = Form.getValue(this.ediWorkTableEditForm, 'lastNm002');
                memberEdiEligWork.akaCity = Form.getValue(this.ediWorkTableEditForm, 'city002');
                memberEdiEligWork.akaState = Form.getValue(this.ediWorkTableEditForm, 'state002');
                memberEdiEligWork.akaZipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode002');
                memberEdiEligWork.akaCountry = Form.getValue(this.ediWorkTableEditForm, 'country002');
                memberEdiEligWork.respFirstName = Form.getValue(this.ediWorkTableEditForm, 'respFirstNm');
                memberEdiEligWork.respLastName = Form.getValue(this.ediWorkTableEditForm, 'respLastNm');
                memberEdiEligWork.respAddressLine1 = Form.getValue(this.ediWorkTableEditForm, 'respAddr1');
                memberEdiEligWork.respCity = Form.getValue(this.ediWorkTableEditForm, 'respPh');
                memberEdiEligWork.respAddressLine2 = Form.getValue(this.ediWorkTableEditForm, 'respAddr2');
                memberEdiEligWork.respCountry = Form.getValue(this.ediWorkTableEditForm, 'respCity');
                memberEdiEligWork.userDate3 = Form.getValue(this.ediWorkTableEditForm, 'state003');
                memberEdiEligWork.respZipCode = Form.getValue(this.ediWorkTableEditForm, 'zipCode003');
                memberEdiEligWork.effectiveDate = Form.getValue(this.ediWorkTableEditForm, 'effDate');
                memberEdiEligWork.termDate = Form.getValue(this.ediWorkTableEditForm, 'termDate');
                memberEdiEligWork.termReason = Form.getValue(this.ediWorkTableEditForm, 'termRsn');
                memberEdiEligWork.eligStatus = Form.getValue(this.ediWorkTableEditForm, 'eligStatus');
                memberEdiEligWork.reasonCode = Form.getValue(this.ediWorkTableEditForm, 'relCode');
                memberEdiEligWork.userDefined1 = Form.getValue(this.ediWorkTableEditForm, 'userDef1');
                memberEdiEligWork.ipaId = Form.getValue(this.ediWorkTableEditForm, 'groupId');
                memberEdiEligWork.planCode = Form.getValue(this.ediWorkTableEditForm, 'planCode');
                memberEdiEligWork.pecWaived = Form.getValue(this.ediWorkTableEditForm, 'pcpId');
                memberEdiEligWork.provider2Id = Form.getValue(this.ediWorkTableEditForm, 'prov2Tb');
                memberEdiEligWork.userDate4 = Form.getValue(this.ediWorkTableEditForm, 'stDate');
                memberEdiEligWork.panelId = Form.getValue(this.ediWorkTableEditForm, 'panelId');
                memberEdiEligWork.medicareStatusFlg = Form.getValue(this.ediWorkTableEditForm, 'mcareSt');
                memberEdiEligWork.otherStatusFlag = Form.getValue(this.ediWorkTableEditForm, 'otherSt');
                memberEdiEligWork.hireDate = Form.getValue(this.ediWorkTableEditForm, 'hireDate');
                memberEdiEligWork.premOverrideAmt = Form.getValue(this.ediWorkTableEditForm, 'ovrMt');
                memberEdiEligWork.premOverrideCode = Form.getValue(this.ediWorkTableEditForm, 'ovrCode');
                memberEdiEligWork.premOverrideStep = Form.getValue(this.ediWorkTableEditForm, 'ovrStep');
                memberEdiEligWork.verfiedThruDate = Form.getValue(this.ediWorkTableEditForm, 'verThruDate');
                memberEdiEligWork.holdDate = Form.getValue(this.ediWorkTableEditForm, 'holdDate');
                memberEdiEligWork.holdReason = Form.getValue(this.ediWorkTableEditForm, 'holdReason');
                memberEdiEligWork.subscLocation = Form.getValue(this.ediWorkTableEditForm, 'location');
                memberEdiEligWork.pecEndDate = Form.getValue(this.ediWorkTableEditForm, 'pecEndDate');
                memberEdiEligWork.salary = Form.getValue(this.ediWorkTableEditForm, 'reasonTbSalary');
                memberEdiEligWork.userDate20 = Form.getValue(this.ediWorkTableEditForm, 'userDef2001');
                memberEdiEligWork.userDefined20 = Form.getValue(this.ediWorkTableEditForm, 'userDef2002');
                memberEdiEligWork.userDefined3 = Form.getValue(this.ediWorkTableEditForm, 'userDef3');
                this.memberEdiEligWorkService.updateMemberEdiEligWork(memberEdiEligWork, subscriberId).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                    this.editMemberEdiEligWork = false;
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                        this.isFormDataChangeStatus = false;
                    }
                }, error => {
                    this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }


    saveMemberEdiEligWork() {
        if (this.editMemberEdiEligWork) {
            this.updateMemberEdiEligWork(this.memberEdiEligWork.subscriberId)
        } else {
            this.createMemberEdiEligWork();
        }
    }

    deleteMemberEdiEligWork(subscriberId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.memberEdiEligWorkService.deleteMemberEdiEligWork(subscriberId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
        }
    }

    getMemberEdiEligWork(subscriberId: string, personNumber : string) {
        this.memberEdiEligWorkService.getMemberEdiEligWork(subscriberId, personNumber).subscribe(memberEdiEligWork => {
            console.log(memberEdiEligWork);
            this.memberEdiEligWork = memberEdiEligWork;
            this.ediWorkTableEditForm.patchValue({
                'jobId': this.memberEdiEligWork.groupId,
                'fileType': this.memberEdiEligWork.rateType,
                'daimondId': this.memberEdiEligWork.diamondId,
                'subId': this.memberEdiEligWork.subscriberId,
                'persNo': this.memberEdiEligWork.personNumber,
                'lastNm001': this.memberEdiEligWork.lastName,
                'firstName': this.memberEdiEligWork.firstName,
                'contact': this.memberEdiEligWork.contactTitle,
                'gender': this.memberEdiEligWork.gender,
                'maritalStatus': this.memberEdiEligWork.maritalStatus,
                'addr1': this.memberEdiEligWork.addressLine1,
                'language': this.memberEdiEligWork.languageCode,
                'addr2': this.memberEdiEligWork.addressLine2,
                'busPh': this.memberEdiEligWork.busPhoneNumber,
                'empStat': this.memberEdiEligWork.respState,
                'city001': this.memberEdiEligWork.city,
                'userDef1': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.userDate1),
                'userDef2': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.userDate2),
                'state001': this.memberEdiEligWork.state,
                'zipCode001': this.memberEdiEligWork.zipCode,
                'country001': this.memberEdiEligWork.country,
                'medicare': this.memberEdiEligWork.medicareNo,
                'medicaid': this.memberEdiEligWork.medicaidNo,
                'socialSec': this.memberEdiEligWork.socialSecNo,
                'empNo': this.memberEdiEligWork.employeeNo,
                'medrec': this.memberEdiEligWork.medicalRecNo,
                'membId': this.memberEdiEligWork.seqMembId,
                'depVerStat': this.memberEdiEligWork.depVerifStatus,
                'firstNm': this.memberEdiEligWork.akaFirstName,
                'lastNm002': this.memberEdiEligWork.akaLastName,
                'city002': this.memberEdiEligWork.akaCity,
                'state002': this.memberEdiEligWork.akaState,
                'zipCode002': this.memberEdiEligWork.akaZipCode,
                'country002': this.memberEdiEligWork.akaCountry,
                'respFirstNm': this.memberEdiEligWork.respFirstName,
                'respLastNm': this.memberEdiEligWork.respLastName,
                'respAddr1': this.memberEdiEligWork.respAddressLine1,
                'respPh': this.memberEdiEligWork.respCity,
                'respAddr2': this.memberEdiEligWork.respAddressLine2,
                'respCity': this.memberEdiEligWork.respCountry,
                'state003': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.userDate3),
                'zipCode003': this.memberEdiEligWork.respZipCode,
                'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.effectiveDate),
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.termDate),
                'termRsn': this.memberEdiEligWork.termReason,
                'eligStatus': this.memberEdiEligWork.eligStatus,
                'relCode': this.memberEdiEligWork.reasonCode,
                'groupId': this.memberEdiEligWork.ipaId,
                'planCode': this.memberEdiEligWork.planCode,
                'pcpId': this.memberEdiEligWork.pecWaived,
                'prov2Tb': this.memberEdiEligWork.provider2Id,
                'stDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.userDate4),
                'panelId': this.memberEdiEligWork.panelId,
                'mcareSt': this.memberEdiEligWork.medicareStatusFlg,
                'otherSt': this.memberEdiEligWork.otherStatusFlag,
                'hireDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.hireDate),
                'ovrMt': this.memberEdiEligWork.premOverrideAmt,
                'ovrCode': this.memberEdiEligWork.premOverrideCode,
                'ovrStep': this.memberEdiEligWork.premOverrideStep,
                'verThruDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.verfiedThruDate),
                'holdDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.holdDate),
                'holdReason': this.memberEdiEligWork.holdReason,
                'location': this.memberEdiEligWork.subscLocation,
                'pecEndDate': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.pecEndDate),
                'reasonTbSalary': this.memberEdiEligWork.salary,
                'userDef2001': this.dateFormatPipe.defaultDisplayDateFormat(this.memberEdiEligWork.userDate20),
                'userDef2002': this.memberEdiEligWork.userDefined20,
                'userDef3': this.memberEdiEligWork.userDefined3,
            });
            this.isFormDataModified();
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    getMemberEdiEligWorks() {
        this.memberEdiEligWorkService.getMemberEdiEligWorks().subscribe(memberEdiEligWorks => {
            this.memberEdiEligWorks = memberEdiEligWorks;
            console.log(this.memberEdiEligWorks);
            if(this.memberEdiEligWorks == null) {
                this.alertMessage = this.alertMessageService.error('18033: No records found for this Job ID.');
                this.dataGridGridOptions.api.setRowData([]);
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {};
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
                headerName: 'Claim No',
                field: 'medicaidno',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'SVC Date',
                field: 'userdate1',
                width: 200
            },
            {
                headerName: 'Thru Date',
                field: 'paidthrudate',
                width: 200
            },
            {
                headerName: 'Auth No',
                field: '',
                width: 200
            },
            {
                headerName: 'Subscriber ID',
                field: 'subscriberid',
                width: 200
            },
            {
                headerName: 'Member First Name',
                field: 'respfirstname',
                width: 200
            },
            {
                headerName: 'Member Last Name',
                field: 'resplastname',
                width: 200
            }
        ]
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
                    this.initializeComponentState();
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Alternate Search Order',
                        'Alternate Search Order Permission'
                    );
                }
            }
        );
    }


    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.inProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
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
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.ediWorkTableEditForm);
        this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.ediWorkTableEditForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: []}],
            fileType: ['', {updateOn: 'blur', validators: []}],
            daimondId: ['', {updateOn: 'blur', validators: []}],
            subId: ['', {updateOn: 'blur', validators: []}],
            persNo: ['', {updateOn: 'blur', validators: []}],
            lastNm001: ['', {updateOn: 'blur', validators: []}],
            firstName: ['', {updateOn: 'blur', validators: []}],
            mi: ['', {updateOn: 'blur', validators: []}],
            contact: ['', {updateOn: 'blur', validators: []}],
            dob: ['', {updateOn: 'blur', validators: []}],
            gender: ['', {updateOn: 'blur', validators: []}],
            maritalStatus: ['', {updateOn: 'blur', validators: []}],
            addr1: ['', {updateOn: 'blur', validators: []}],
            ph: ['', {updateOn: 'blur', validators: []}],
            language: ['', {updateOn: 'blur', validators: []}],
            addr2: ['', {updateOn: 'blur', validators: []}],
            busPh: ['', {updateOn: 'blur', validators: []}],
            empStat: ['', {updateOn: 'blur', validators: []}],
            city001: ['', {updateOn: 'blur', validators: []}],
            userDef1: ['', {updateOn: 'blur', validators: []}],
            userDef2: ['', {updateOn: 'blur', validators: []}],
            state001: ['', {updateOn: 'blur', validators: []}],
            zipCode001: ['', {updateOn: 'blur', validators: []}],
            country001: ['', {updateOn: 'blur', validators: []}],
            medicare: ['', {updateOn: 'blur', validators: []}],
            medicaid: ['', {updateOn: 'blur', validators: []}],
            socialSec: ['', {updateOn: 'blur', validators: []}],
            empNo: ['', {updateOn: 'blur', validators: []}],
            medrec: ['', {updateOn: 'blur', validators: []}],
            membId: ['', {updateOn: 'blur', validators: []}],
            depVerStat: ['', {updateOn: 'blur', validators: []}],
            firstNm: ['', {updateOn: 'blur', validators: []}],
            lastNm002: ['', {updateOn: 'blur', validators: []}],
            phone: ['', {updateOn: 'blur', validators: []}],
            city002: ['', {updateOn: 'blur', validators: []}],
            state002: ['', {updateOn: 'blur', validators: []}],
            zipCode002: ['', {updateOn: 'blur', validators: []}],
            country002: ['', {updateOn: 'blur', validators: []}],
            respFirstNm: ['', {updateOn: 'blur', validators: []}],
            respLastNm: ['', {updateOn: 'blur', validators: []}],
            respAddr1: ['', {updateOn: 'blur', validators: []}],
            respPh: ['', {updateOn: 'blur', validators: []}],
            respAddr2: ['', {updateOn: 'blur', validators: []}],
            respCity: ['', {updateOn: 'blur', validators: []}],
            state003: ['', {updateOn: 'blur', validators: []}],
            zipCode003: ['', {updateOn: 'blur', validators: []}],
            country003: ['', {updateOn: 'blur', validators: []}],
            effDate: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            termRsn: ['', {updateOn: 'blur', validators: []}],
            eligStatus: ['', {updateOn: 'blur', validators: []}],
            relCode: ['', {updateOn: 'blur', validators: []}],
            groupId: ['', {updateOn: 'blur', validators: []}],
            planCode: ['', {updateOn: 'blur', validators: []}],
            ridersTbTbTbTbTbTb: ['', {updateOn: 'blur', validators: []}],
            lob: ['', {updateOn: 'blur', validators: []}],
            tbTbTbTbTbTbTbT: ['', {updateOn: 'blur', validators: []}],
            pcpId: ['', {updateOn: 'blur', validators: []}],
            prov2Tb: ['', {updateOn: 'blur', validators: []}],
            stDate: ['', {updateOn: 'blur', validators: []}],
            panelId: ['', {updateOn: 'blur', validators: []}],
            mcareSt: ['', {updateOn: 'blur', validators: []}],
            otherSt: ['', {updateOn: 'blur', validators: []}],
            hireDate: ['', {updateOn: 'blur', validators: []}],
            ipaId: ['', {updateOn: 'blur', validators: []}],
            ovrMt: ['', {updateOn: 'blur', validators: []}],
            ovrCode: ['', {updateOn: 'blur', validators: []}],
            ovrStep: ['', {updateOn: 'blur', validators: []}],
            department: ['', {updateOn: 'blur', validators: []}],
            verThruDate: ['', {updateOn: 'blur', validators: []}],
            holdDate: ['', {updateOn: 'blur', validators: []}],
            holdReason: ['', {updateOn: 'blur', validators: []}],
            location: ['', {updateOn: 'blur', validators: []}],
            pecEndDate: ['', {updateOn: 'blur', validators: []}],
            reasonTbSalary: ['', {updateOn: 'blur', validators: []}],
            rateType: ['', {updateOn: 'blur', validators: []}],
            userDef2001: ['', {updateOn: 'blur', validators: []}],
            userDef2002: ['', {updateOn: 'blur', validators: []}],
            userDef3: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Copy', shortcutKey: 'Ctrl+C',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    { isHorizontal: true },
                    { name: 'Next', shortcutKey: 'F8' },
                    { name: 'Previous', shortcutKey: 'F7' },
                ],
            },
            {
               menuItem: 'Topic',
               dropdownItems: []
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Job Lookup', shortcutKey: 'F5'},
                    {name: 'Goto Claim'}
                ]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: '1 Main Menu'},
                    {name: '2 EDI Work Table Edit'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window', shortcutKey: 'F1'}, {isHorizontal: true},
                    {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'Open': {
                    break;
                }
                case 'Save': {
                    this.saveMemberEdiEligWork();
                    break;
                }
                case 'Close': {
                    this.modalClose();
                    break;
                }
                case 'Shortcut Menu...': {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if(event.menu.menuItem === 'Special') {
            switch (event.action) {
                case 'Job Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
                case 'Goto Claim':
                    if(!this.memberEdiEligWork) {
                        this.toastService.showToast('18031: A job must be selected before using this feature.', NgbToastType.Warning);
                    }
                    break;
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    searchModel = new SearchModel('memberedieligworks/lookup',
        EdiWorkTableEditLookup.EDI_WORK_TABLE_EDIT_DEFAULT,
        EdiWorkTableEditLookup.EDI_WORK_TABLE_EDIT_ALL,
        []);

    onLookupFieldChange(event, id) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
        }

    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.selectecProcessEdiSetup = res;
            this.ediWorkTableEditForm.controls['fileType'].setValue(this.selectecProcessEdiSetup.fileType);
            this.showTable = true;
            this.getMemberEdiEligWorks();
        })
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'EDI Work Table Edit')
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
                    this.saveMemberEdiEligWork()
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
        this.ediWorkTableEditForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
