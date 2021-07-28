/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {DatePickerConfig, DatePickerModel, NGBModalOptions} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecWin} from '../../../api-models'
import {ProcessEdiSetup} from '../../../api-models/process-edi-setup.model'
import {ProcessEdiSetupService} from '../../../api-services/process-edi-setup.service'
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {DddwDtlService, MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {Menu, OPERATIONS} from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {SubmitterProfileMasterService} from '../../../api-services/submitter-profile-master.service';
import {IMyDateModel, IMySingleDateModel} from 'angular-mydatepicker';
import {ProcessEdiJobStatisticsComponent} from '../job-statistics/job-statistics.component';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";
import { PrediControlService } from '../../../api-services/predi-control.service';
import { PrediControl } from '../../../api-models/predi-control.model';
import { DatePipe } from '@angular/common';


// Use the Component directive to define the ProcessEditComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'process-edi',
    templateUrl: './process-edi.component.html',
    styleUrls: ['./process-edi.component.scss'],
    providers: [SubmitterProfileMasterService,
        SecUserService]
})
export class ProcessEdiComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    processEdiForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public visibleComponent = {
        duplicateCheck: true,
        positiveFile: false,
        pricing: true,
        memberSearch: false,
        adjudication: true,
        lensPresProc: true
    };
    public reEditDisabled = false;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    inProgress = true;
    userTemplateId: string;
    @Input() showIcon = false;
    public menu: Menu[] = [];
    fileTypes: any[] = [];
    statuses: any[] = [];
    submitterProfileMasters: any[] = [];
    userId: string;
    newSeqPrediId: number;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    newJobIdFlag: boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    editProcessEdiSetup: boolean = true;
    processEdiSetup: ProcessEdiSetup;
    processEdiSetups: ProcessEdiSetup[];
    public dataGridGridOptions: GridOptions;
    public isNewRecord: boolean
    private windowId: string = 'PREDI';
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    public isDeferredDisabled:string = null;

    // Actions mappings for data grid
    private actions: any[];
    specialMenuStatus: string = '001'

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private datePipe: DatePipe,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        public activeModal: NgbActiveModal,
        private submitterProfileMasterService: SubmitterProfileMasterService,
        private secUserService: SecUserService,
        private processEdiSetupService: ProcessEdiSetupService,
        private prediControlService: PrediControlService,
        private auditService: AuditService,
    ) {
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

    onChangeFileType(value: any) {
        if (value === 'D') {
            this.visibleComponent = {
                duplicateCheck: true,
                positiveFile: false,
                pricing: true,
                memberSearch: false,
                adjudication: true,
                lensPresProc: false
            };
            this.reEditDisabled = false;
            this.specialMenuStatus = '001'
        } else if (value === 'E') {
            this.visibleComponent = {
                duplicateCheck: false,
                positiveFile: true,
                pricing: false,
                memberSearch: true,
                adjudication: false,
                lensPresProc: false
            };
            this.reEditDisabled = false;
            this.specialMenuStatus = '002'
        } else if (value === 'I') {
            this.visibleComponent = {
                duplicateCheck: true,
                positiveFile: false,
                pricing: true,
                memberSearch: false,
                adjudication: true,
                lensPresProc: false
            };
            this.reEditDisabled = true;
        } else if (value === 'P') {
            this.visibleComponent = {
                duplicateCheck: true,
                positiveFile: false,
                pricing: true,
                memberSearch: false,
                adjudication: true,
                lensPresProc: true
            };
            this.reEditDisabled = true;
            this.specialMenuStatus = '003'
        }
        this.menuInit();
        this.fileType = value;
        this.onSetConversionProgram();
    }

    fileType: string = null;
    runOptionString: string = null;
    
    onRunOptionChange(event: any) {
        let id = event.target.id;
        if(event.target.checked) {
            this.processEdiForm.patchValue({[id] :true});
        } else {
            this.processEdiForm.patchValue({[id] : false});
        }
        this.onSetConversionProgram();
    }

    onSetConversionProgram() {
        let runOption1 : string = 'N';
        let runOption2 : string = 'N';
        let runOption3 : string = 'N';
        let runOption4 : string = 'N';
        let runOption5 : string = 'N';
        let runOption6 : string = 'N';
        if(this.fileType == 'E') {
            runOption1 = Form.getValue(this.processEdiForm, 'positiveFile') ? 'Y' : 'N';
            runOption3 = Form.getValue(this.processEdiForm, 'memberSearch') ? 'Y' : 'N';
            runOption4 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
            this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
        } else {
            if(this.fileType == 'D') {
                runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
            } else if(this.fileType == 'I') {
                runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
            } else if(this.fileType == 'P') {
                runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                runOption6 = Form.getValue(this.processEdiForm, 'lensPresProc') ? 'Y' : 'N';
                this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
            }
        }
        let isFileNameSetFlag: boolean = false;
        if(this.fileType == "E") {
            for(let prediControl of this.prediControls) {
                if(prediControl.fileType == this.fileType) {
                    isFileNameSetFlag = true;
                    let fileTypeWithPath: string = "";
                    if(prediControl.controlFilePath) {
                        fileTypeWithPath = fileTypeWithPath + prediControl.controlFilePath;
                    }
                    if(prediControl.controlFileName) {
                        fileTypeWithPath = fileTypeWithPath + prediControl.controlFileName;
                    }
                    this.processEdiForm.patchValue({ conversionProgram002: fileTypeWithPath });
                    break;
                }
            }
        } else {
            for(let prediControl of this.prediControls) {
                if(prediControl.fileType == this.fileType && prediControl.runOptionString == this.runOptionString) {
                    isFileNameSetFlag = true;
                    let fileTypeWithPath: string = "";
                    if(prediControl.controlFilePath) {
                        fileTypeWithPath = fileTypeWithPath + prediControl.controlFilePath;
                    }
                    if(prediControl.controlFileName) {
                        fileTypeWithPath = fileTypeWithPath + prediControl.controlFileName;
                    }
                    this.processEdiForm.patchValue({ conversionProgram002: fileTypeWithPath });
                    break;
                }
             }
        }
        if(!isFileNameSetFlag) {
            this.processEdiForm.patchValue({ conversionProgram002: null });
        }
    }

    setFormData(processEdiSetup: any) {
        this.processEdiForm.get('receivedDate').enable();
        this.processEdiForm.patchValue({
            'jobId': this.processEdiSetup.jobId,
            'requestUser': this.processEdiSetup.requestUser,
            'transactionSetId': this.processEdiSetup.transactionSetId,
            'receivedDate': this.dateFormatPipe.defaultDisplayDateFormat(new Date(this.processEdiSetup.rcvdDateTime)),
            'submitterId': this.processEdiSetup.submitterId,
            'fileType': this.processEdiSetup.fileType,
            'inputFile': this.processEdiSetup.inputFileName,
            'editRb': this.processEdiSetup.editUserId,
            'action': this.processEdiSetup.action,
            'effDate': this.dateFormatPipe.defaultDisplayDateFormat(this.processEdiSetup.defaultEffectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.processEdiSetup.defaultTermDate),
            'status': this.statuses.find((sts) => sts.dddwDtlPrimaryKey.dataVal === this.processEdiSetup.action) ?.dddwDtlPrimaryKey.displayVal,
            'duplicateCheck': this.processEdiSetup.runOption1 === 'Y',
            'positiveFile': this.processEdiSetup.runOption1 === 'Y',
            'pricing': this.processEdiSetup.runOption3 === 'Y',
            'memberSearch': this.processEdiSetup.runOption3 === 'Y',
            'personNoSearch': this.processEdiSetup.runOption5 === 'Y',
            'redoConversion': this.processEdiSetup.redoConversion === 'Y',
            'adjudication': this.processEdiSetup.runOption4 === 'Y',
            'lensPresProc': this.processEdiSetup.runOption6 === 'Y',
            'requestType': this.processEdiSetup.requestType,
            'requestDate': this.processEdiSetup.requestDate,
            'comments': this.processEdiSetup.comments,
            'conversionProgram002': this.processEdiSetup.conversionProgram,

            'editDateTime': this.processEdiSetup.editDateTime,
            'postDateTime': this.processEdiSetup.postDateTime,

            'rcvdUserId': this.processEdiSetup.rcvdUserId,
            'editUserId': this.processEdiSetup.editUserId,
            'postUserId': this.processEdiSetup.postUserId,

            'editStatus': this.processEdiSetup.editStatus,
            'postStatus': this.processEdiSetup.postStatus,

        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
        this.onChangeFileType(this.processEdiSetup.fileType);
        this.processEdiForm.get('receivedDate').disable();
        this.processEdiForm.get('jobId').disable();
        this.processEdiForm.get('transactionSetId').disable();
        this.processEdiForm.get('inputFile').disable();
        this.processEdiForm.get('submitterId').disable();
        this.processEdiForm.get('fileType').disable();
        this.setFormFieldEnableDisable(this.processEdiForm.get('status').value);
    }

    setFormDataForNewRecord(processEdiSetup: any) {
        this.enableFields();
        this.processEdiForm.patchValue({
            'jobId': this.processEdiSetup.jobId,
            'requestUser': this.processEdiSetup.requestUser,
            'transactionSetId': this.processEdiSetup.transactionSetId,
            'submitterId': this.processEdiSetup.submitterId,
            'fileType': this.processEdiSetup.fileType,
            'inputFile': this.processEdiSetup.inputFileName,
            'editRb': this.processEdiSetup.editUserId,
            'action': this.processEdiSetup.action,
            'status': this.statuses.find((sts) =>
                sts.dddwDtlPrimaryKey.dataVal === this.processEdiSetup.action) ?.dddwDtlPrimaryKey.displayVal,
            'duplicateCheck': this.processEdiSetup.runOption1 === 'Y',
            'positiveFile': this.processEdiSetup.runOption1 === 'Y',
            'pricing': this.processEdiSetup.runOption3 === 'Y',
            'memberSearch': this.processEdiSetup.runOption3 === 'Y',
            'personNoSearch': this.processEdiSetup.runOption5 === 'Y',
            'redoConversion': this.processEdiSetup.redoConversion === 'Y',
            'adjudication': this.processEdiSetup.runOption4 === 'Y',
            'lensPresProc': this.processEdiSetup.runOption6 === 'Y',
            'requestType': this.processEdiSetup.requestType,
            'requestDate': this.processEdiSetup.requestDate,
            'comments': this.processEdiSetup.comments,
            'conversionProgram002': this.processEdiSetup.conversionProgram,
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
        this.onChangeFileType(this.processEdiSetup.fileType);
        this.setFormFieldEnableDisable(this.processEdiForm.get('status').value);
    }

    createProcessEdiSetup() {
        this.formValidation.validateForm();
        if (this.processEdiForm.valid) {
            let processEdiSetup = new ProcessEdiSetup();
            processEdiSetup.seqPrediId = this.newSeqPrediId;
            processEdiSetup.requestUser = this.userId;
            processEdiSetup.rcvdUserId = this.userId;
            processEdiSetup.securityCode = '0';
            processEdiSetup.inProcess = 'N';
            processEdiSetup.requestDate = new Date();
            processEdiSetup.jobId = Form.getValue(this.processEdiForm, 'jobId');
            processEdiSetup.transactionSetId = Form.getValue(this.processEdiForm, 'transactionSetId');
            processEdiSetup.rcvdDateTime = Form.getDateValue(this.processEdiForm, 'receivedDate');
            processEdiSetup.submitterId = Form.getValue(this.processEdiForm, 'submitterId');
            processEdiSetup.fileType = Form.getValue(this.processEdiForm, 'fileType');
            processEdiSetup.inputFileName = Form.getValue(this.processEdiForm, 'inputFile');
            processEdiSetup.editUserId = Form.getValue(this.processEdiForm, 'editRb');
            processEdiSetup.action = Form.getValue(this.processEdiForm, 'action');
            processEdiSetup.status = Form.getValue(this.processEdiForm, 'action');
            processEdiSetup.defaultEffectiveDate = Form.getDatePickerValue(this.processEdiForm, 'effDate');
            processEdiSetup.defaultTermDate = Form.getDatePickerValue(this.processEdiForm, 'termDate');
            let runOption1 : string = 'N';
            let runOption2 : string = 'N';
            let runOption3 : string = 'N';
            let runOption4 : string = 'N';
            let runOption5 : string = 'N';
            let runOption6 : string = 'N';
            if(this.fileType == 'E') {
                runOption1 = Form.getValue(this.processEdiForm, 'positiveFile') ? 'Y' : 'N';
                runOption3 = Form.getValue(this.processEdiForm, 'memberSearch') ? 'Y' : 'N';
                runOption4 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
            } else {
                if(this.fileType == 'D') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                } else if(this.fileType == 'I') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                } else if(this.fileType == 'P') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    runOption6 = Form.getValue(this.processEdiForm, 'lensPresProc') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                }
            }
            processEdiSetup.runOption1 = runOption1;
            processEdiSetup.runOption2 = runOption2;
            processEdiSetup.runOption3 = runOption3;
            processEdiSetup.runOption4 = runOption4;
            processEdiSetup.runOption5 = runOption5;
            processEdiSetup.runOption6 = runOption6;
            processEdiSetup.redoConversion = Form.getValue(this.processEdiForm, 'redoConversion')? 'Y': 'N';
            processEdiSetup.editDateTime = Form.getValue(this.processEdiForm, 'editDateTime');
            processEdiSetup.requestType = Form.getValue(this.processEdiForm, 'requestType');
            processEdiSetup.comments = Form.getValue(this.processEdiForm, 'comments');
            processEdiSetup.conversionProgram = Form.getValue(this.processEdiForm, 'conversionProgram002');
            processEdiSetup.template = "N";
            this.auditService.setAuditFields(
                processEdiSetup,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.ADD
            );
            this.processEdiSetupService.createProcessEdiSetup(processEdiSetup).subscribe(JobResult => {
                if(JobResult && JobResult == "16000") {
                    this.messageService.findByMessageId(16000).subscribe((message: MessageMasterDtl[]) => {
                        this.processResultPopupAlert("16000 : "+ message[0].messageText, 'Process EDI');
                        this.editProcessEdiSetup = true;
                        this.newJobIdFlag = false;
                        this.isFormDataChangeStatus = false;
                        this.getProcessEdiSetups();
                        if (this.screenCloseRequest) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000);
                        }
                    });
                } else if(JobResult && JobResult == "16001") {
                    this.messageService.findByMessageId(16001).subscribe((message: MessageMasterDtl[]) => {
                        this.processResultPopupAlert("16001 : "+ message[0].messageText, 'Process EDI')
                    });
                    this.editProcessEdiSetup = true;
                    this.newJobIdFlag = false;
                    this.isFormDataChangeStatus = false;
                    this.getProcessEdiSetups();
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }    
                } else {
                    this.toastService.showToast("Record successfully created.", NgbToastType.Success);
                    this.editProcessEdiSetup = true;
                    this.newJobIdFlag = false;
                    this.isFormDataChangeStatus = false;
                    this.getProcessEdiSetups();
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                }
            }, error => {
                this.toastService.showToast((error.message ? error.message : 'An Error occurred while creating the record. Please check your entry.'), NgbToastType.Danger);
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    updateProcessEdiSetup(seqPrediId: number) {
        this.formValidation.validateForm();
        if (this.processEdiForm.valid) {
            let processEdiSetup = new ProcessEdiSetup();
            processEdiSetup.seqPrediId = this.processEdiSetup.seqPrediId;
            processEdiSetup.jobId = Form.getValue(this.processEdiForm, 'jobId');
            processEdiSetup.requestUser = Form.getValue(this.processEdiForm, 'requestUser');
            processEdiSetup.requestDate = new Date();
            processEdiSetup.transactionSetId = Form.getValue(this.processEdiForm, 'transactionSetId');
            processEdiSetup.rcvdDateTime = Form.getDateValue(this.processEdiForm, 'receivedDate');
            processEdiSetup.submitterId = Form.getValue(this.processEdiForm, 'submitterId');
            processEdiSetup.fileType = Form.getValue(this.processEdiForm, 'fileType');
            processEdiSetup.inputFileName = Form.getValue(this.processEdiForm, 'inputFile');
            processEdiSetup.editUserId = Form.getValue(this.processEdiForm, 'editRb');
            processEdiSetup.action = Form.getValue(this.processEdiForm, 'action');
            processEdiSetup.status = Form.getValue(this.processEdiForm, 'action');

            processEdiSetup.editDateTime = Form.getValue(this.processEdiForm, 'editDateTime');
            processEdiSetup.postDateTime = Form.getValue(this.processEdiForm, 'postDateTime');

            processEdiSetup.rcvdUserId = Form.getValue(this.processEdiForm, 'rcvdUserId');
            processEdiSetup.editUserId = Form.getValue(this.processEdiForm, 'editUserId');
            processEdiSetup.postUserId = Form.getValue(this.processEdiForm, 'postUserId');

            processEdiSetup.editStatus = Form.getValue(this.processEdiForm, 'editStatus');
            processEdiSetup.postStatus = Form.getValue(this.processEdiForm, 'postStatus');

            let runOption1 : string = 'N';
            let runOption2 : string = 'N';
            let runOption3 : string = 'N';
            let runOption4 : string = 'N';
            let runOption5 : string = 'N';
            let runOption6 : string = 'N';
            if(this.fileType == 'E') {
                runOption1 = Form.getValue(this.processEdiForm, 'positiveFile') ? 'Y' : 'N';
                runOption3 = Form.getValue(this.processEdiForm, 'memberSearch') ? 'Y' : 'N';
                runOption4 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
            } else {
                if(this.fileType == 'D') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                } else if(this.fileType == 'I') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                } else if(this.fileType == 'P') {
                    runOption1 = Form.getValue(this.processEdiForm, 'duplicateCheck') ? 'Y' : 'N';
                    runOption3 = Form.getValue(this.processEdiForm, 'pricing') ? 'Y' : 'N';
                    runOption4 = Form.getValue(this.processEdiForm, 'adjudication') ? 'Y' : 'N';
                    runOption5 = Form.getValue(this.processEdiForm, 'personNoSearch') ? 'Y' : 'N';
                    runOption6 = Form.getValue(this.processEdiForm, 'lensPresProc') ? 'Y' : 'N';
                    this.runOptionString = runOption1+runOption2+runOption3+runOption4+runOption5+runOption6;
                }
            }
            processEdiSetup.runOption1 = runOption1;
            processEdiSetup.runOption2 = runOption2;
            processEdiSetup.runOption3 = runOption3;
            processEdiSetup.runOption4 = runOption4;
            processEdiSetup.runOption5 = runOption5;
            processEdiSetup.runOption6 = runOption6;
            processEdiSetup.redoConversion = Form.getValue(this.processEdiForm, 'redoConversion')? 'Y': 'N';
            processEdiSetup.editDateTime = Form.getValue(this.processEdiForm, 'editdatetime');
            processEdiSetup.requestType = Form.getValue(this.processEdiForm, 'requestType');
            processEdiSetup.defaultEffectiveDate = Form.getDatePickerValue(this.processEdiForm, 'effDate');
            processEdiSetup.defaultTermDate = Form.getDatePickerValue(this.processEdiForm, 'termDate');
            processEdiSetup.comments = Form.getValue(this.processEdiForm, 'comments');
            processEdiSetup.conversionProgram = Form.getValue(this.processEdiForm, 'conversionProgram002');
            processEdiSetup.template = "N";
            processEdiSetup.insertProcess = this.processEdiSetup.insertProcess;
            processEdiSetup.insertUser = this.processEdiSetup.insertUser;
            this.auditService.setAuditFields(
                processEdiSetup,
                sessionStorage.getItem("user"),
                this.windowId,
                OPERATIONS.UPDATE
            );
            this.processEdiSetupService.updateProcessEdiSetup(processEdiSetup, seqPrediId).subscribe(JobResult => {
                if(JobResult && JobResult == "16000") {
                    this.messageService.findByMessageId(16000).subscribe((message: MessageMasterDtl[]) => {
                        this.processResultPopupAlert("16000 : "+ message[0].messageText, 'Process EDI');
                        this.editProcessEdiSetup = true;
                        this.isFormDataChangeStatus = false;
                        this.getProcessEdiSetups();
                        if (this.screenCloseRequest) {
                            setTimeout(() => {
                                this.activeModal.close()
                            }, 2000);
                        }
                    });
                } else if(JobResult && JobResult == "16001") {
                    this.messageService.findByMessageId(16001).subscribe((message: MessageMasterDtl[]) => {
                        this.processResultPopupAlert("16001 : "+ message[0].messageText, 'Process EDI')
                    });
                    this.editProcessEdiSetup = true;
                    this.isFormDataChangeStatus = false;
                    this.getProcessEdiSetups();
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }    
                } else {
                    this.toastService.showToast("Record successfully updated.", NgbToastType.Success);
                    this.editProcessEdiSetup = true;
                    this.isFormDataChangeStatus = false;
                    this.getProcessEdiSetups();
                    if (this.screenCloseRequest) {
                        setTimeout(() => {
                            this.activeModal.close()
                        }, 2000);
                    }
                }
            }, error => {
                this.toastService.showToast((error.message ? error.message : 'An Error occurred while updating the record. Please check your entry.'), NgbToastType.Danger);
            });
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger);
        }
    }

    saveProcessEdiSetup() {
        if (this.editProcessEdiSetup) {
            this.updateProcessEdiSetup(this.processEdiSetup.seqPrediId)
        } else {
            this.createProcessEdiSetup();
        }
    }

    enableFields() {
        this.processEdiForm.get('jobId').enable({onlySelf: true, emitEvent: false});
        this.processEdiForm.get('transactionSetId').enable({onlySelf: true, emitEvent: false});
        this.processEdiForm.get('submitterId').enable({onlySelf: true, emitEvent: false});
        this.processEdiForm.get('fileType').enable({onlySelf: true, emitEvent: false});
        this.processEdiForm.get('inputFile').enable({onlySelf: true, emitEvent: false});
        this.processEdiForm.get('receivedDate').enable({onlySelf: true, emitEvent: false});
    }

    deleteProcessEdiSetup(seqPrediId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.processEdiSetupService.deleteProcessEdiSetup(seqPrediId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
        }
    }

    getFileTypeDisplayValue(fileType: string): string {
        const displayValues = this.fileTypes.filter(value => value.dddwDtlPrimaryKey.dataVal === fileType);
        if(displayValues.length > 0) {
            return displayValues[0].dddwDtlPrimaryKey.displayVal;
        }
        return fileType;
    }

    getDisplayValueFileType(displayValue: string): string {
        const displayValues = this.fileTypes.filter(value => value.dddwDtlPrimaryKey.displayVal === displayValue);
        if(displayValues.length > 0) {
            return displayValues[0].dddwDtlPrimaryKey.dataVal;
        }
        return displayValue;
    }

    getActionDisplayValue(key: string): string {
        const displayValues = this.actions.filter(action => action.dddwDtlPrimaryKey.dataVal === key);
        if(displayValues.length > 0) {
            return displayValues[0].dddwDtlPrimaryKey.displayVal;
        }
        return key;
    }

    getDisplayValueActionKey(displayVal: string): string {
        const actions = this.actions.filter(action => action.dddwDtlPrimaryKey.displayVal === displayVal);
        if(actions.length > 0) {
            return actions[0].dddwDtlPrimaryKey.dataVal;
        }
        return displayVal;
    }

    getStatusDisplayValue(status: string): string {
        const statusObj = this.statuses.filter(elem => elem.dddwDtlPrimaryKey.dataVal === status);
        if(statusObj.length > 0) {
            return statusObj[0].dddwDtlPrimaryKey.displayVal;
        }
        return status;
    }

    getDisplayValueStatusKey(displayVal: string): string {
        const statusObj = this.statuses.filter(elem => elem.dddwDtlPrimaryKey.displayVal === displayVal);
        if(statusObj.length > 0) {
            return statusObj[0].dddwDtlPrimaryKey.dataVal;
        }
        return displayVal;
    }

    getProcessEdiSetups() {
        this.processEdiSetupService.findAllProcessEdiSetups().subscribe(processEdiSetups => {
            if(processEdiSetups && processEdiSetups.length > 0) {
                this.processEdiSetups = processEdiSetups;
                this.dataGridGridOptions.api.setRowData(this.processEdiSetups);
                if (this.processEdiSetups.length > 0) {
                    this.processEdiSetup = this.processEdiSetups[0];
                    this.dataGridGridOptions.api.selectIndex(0, null, null);
                }
            } else {
                this.dataGridGridOptions.api.setRowData([]);
            }
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    onRowSelected(event: any) {
        this.dataGridGridOptions.api.selectIndex(event.rowIndex, null, null);     //to select row when clicking anywhere on the row
    }

    onGridSelectionChange() {
        this.processEdiSetup = this.dataGridGridOptions.api.getSelectedRows()[0];   //if selected row is null then processEdiSetup will be null
        this.processEdiSetup.fileType = this.getDisplayValueFileType(this.processEdiSetup.fileType);
        this.processEdiSetup.action = this.getDisplayValueActionKey(this.processEdiSetup.action);
        this.processEdiSetup.status = this.getDisplayValueStatusKey(this.processEdiSetup.status);
        if (this.newJobIdFlag) {
            this.setFormDataForNewRecord(this.processEdiSetup);
        } else {
            this.setFormData(this.processEdiSetup);
        }
    }

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the

    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50,
                rowSelection: 'single'
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "JOB ID",
                field: "jobId",
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Trans Set ID",
                field: "transactionSetId",
                width: 200
            },
            {
                headerName: "Rcvd Date",
                field: "rcvdDateTime",
                width: 200,
                valueFormatter: this.dateFormatter
            },
            {
                headerName: "Subm ID",
                field: "submitterId",
                width: 200
            },
            {
                headerName: "Type",
                field: "fileType",
                width: 200,
                valueGetter : this.findFileType.bind(this)
            },
            {
                headerName: "Action",
                field: "action",
                width: 200,
                valueGetter : this.findAction.bind(this)
            },
            {
                headerName: "Status",
                field: "status",
                width: 200,
                valueGetter : this.findStatus.bind(this)
            }
        ];
    }

    findFileType(params: any): string {
        const fileType = this.fileTypes.find(value => value.dddwDtlPrimaryKey.dataVal === params.data.fileType);
        return fileType ? fileType.dddwDtlPrimaryKey.displayVal : '';
    }
   
    findAction(params: any): string {
        let action = this.actions.find(value => value.dddwDtlPrimaryKey.dataVal === params.data.action);
        return action ? action.dddwDtlPrimaryKey.displayVal : '';
    }

    findStatus(params: any): string {
        let status = this.statuses.find(value => value.dddwDtlPrimaryKey.dataVal === params.data.status);
        return status ? status.dddwDtlPrimaryKey.displayVal : '';
    }

    dateFormatter(dateObj: any) {
        return moment(dateObj.value).format('YYYY-MM-DD').toString();
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    getCurrentUserId() {
        const parsedToken = this.securityService.getCurrentUserToken();
        if (parsedToken) {
            let userId = null;
            userId = parsedToken.sub;
            this.userId = userId;
        }
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
            this.userId = userId;
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
                        'You are not Permitted to view Pcpaa Support Info Details',
                        'Pcpaa Support Info Details Permission'
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
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.processEdiForm = this.formBuilder.group({
            jobId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            requestUser: ['', {updateOn: 'blur', validators: []}],
            transactionSetId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            receivedDate: ['', {updateOn: 'blur', validators: [Validators.required]}],
            submitterId: ['', {updateOn: 'blur', validators: [Validators.required]}],
            fileType: ['', {updateOn: 'blur', validators: [Validators.required]}],
            inputFile: ['', {updateOn: 'blur', validators: [Validators.required]}],
            ionReceiveRb: ['', {updateOn: 'blur', validators: []}],
            tRb001: ['', {updateOn: 'blur', validators: []}],
            editRb: ['', {updateOn: 'blur', validators: []}],
            tRb002: ['', {updateOn: 'blur', validators: []}],
            celRb: ['', {updateOn: 'blur', validators: []}],
            action: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)]}],
            status: ['', {updateOn: 'blur', validators: []}],
            positiveFile: ['', {updateOn: 'blur', validators: []}],
            duplicateCheck: ['', {updateOn: 'blur', validators: []}],
            pricing: ['', {updateOn: 'blur', validators: []}],
            memberSearch: ['', {updateOn: 'blur', validators: []}],
            personNoSearch: ['', {updateOn: 'blur', validators: []}],
            redoConversion: ['', {updateOn: 'blur', validators: []}],
            adjudication: ['', {updateOn: 'blur', validators: []}],
            lensPresProc: ['', {updateOn: 'blur', validators: []}],
            effDate: ['', {updateOn: 'blur', validators: []}],
            termDate: ['', {updateOn: 'blur', validators: []}],
            editdatetime: ['', {updateOn: 'blur', validators: []}],
            erredRb: ['', {updateOn: 'blur', validators: []}],
            requestType: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)]}],
            comments: ['', {updateOn: 'blur', validators: []}],
            conversionProgram002: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.addNewRecord();
                    break;
                }
                case 'Open': {
                    // statements;
                    break;
                }
                case 'Run Job': {
                    this.saveProcessEdiSetup();
                    break;
                }
                case 'Close': {
                    break;
                }
                case 'Shortcut Menu': {
                    break;
                }
                default: {
                    this.toastService.showToast("Action is not valid", NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions

        } else if (event.menu.menuItem === 'Special') {
            this.handleSpecialMenu(event.action);          // handle special-Menu Actions

        } else if (event.menu.menuItem === 'Windows') {
            switch (event.action) {
                case '1 Main Menu': {
                    break;
                }
                case 'Show Timestamp' : {
                    if (this.processEdiForm.get('jobId').value === '') {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    } else {
                        this.showTimestamp()
                    }
                }
            }
        }
    }

    generateNewSeqPrediId(seqPrediId: string): string {
        let newSeqPrediId = String(parseInt(seqPrediId)).padStart(9, '0');
        return newSeqPrediId;
    }
    
    prediControls: PrediControl[] = [];
    addNewRecord() {
        if(this.newJobIdFlag) {
            this.messageService.findByMessageId(90069).subscribe((message: MessageMasterDtl[]) => {
                this.showPopupAlertWithOkButton("90069: " + message[0].messageText, "Process EDI");
            });
            return;
        }
        forkJoin({
			seqJobId: this.processEdiSetupService.getNextJobId(),
			seqPrediId: this.processEdiSetupService.getNextPrediId(),
          }).subscribe(({ seqJobId, seqPrediId }) => {
                let processEdiSetup = new ProcessEdiSetup;
                let today = new Date();
                //initialize default fields for new record
                processEdiSetup.requestUser = this.userId;
                processEdiSetup.action = "V";
                processEdiSetup.requestType = "I";
                processEdiSetup.status = "New";
                processEdiSetup.rcvdDateTime = today;
                processEdiSetup.requestDate = today;
                processEdiSetup.jobId = seqJobId;
                this.newJobIdFlag = true;
                processEdiSetup.transactionSetId = this.generateNewSeqPrediId(seqPrediId);
                this.newSeqPrediId = parseInt(seqPrediId);
                this.editProcessEdiSetup = false;
                const newItems = [JSON.parse(JSON.stringify(processEdiSetup))];
                this.dataGridGridOptions.api.applyTransaction({add: newItems, addIndex: -1});
                this.dataGridGridOptions.api.selectIndex(this.dataGridGridOptions.api.getDisplayedRowCount() - 1, false, false);
                this.enableFields();
                this.isFormDataChangeStatus = true;
			},(error) => {
				console.log(error);
			}
		);

      
    }

    validateDateReceivedDate(event: any) {
        let today = new Date();
        if (event.singleDate) {
            let dateReceived = this.getDate(event.singleDate);
            if (dateReceived > today) {
                this.messageService.findByMessageId(70475).subscribe((message) => {
                    this.showPopUp(
                        "70475 : " + message[0].messageText,
                        "Process EDI"
                    );
                    this.processEdiForm.patchValue({
                        receivedDate: null
                    });
                })
            }
        }
    }

    public onChangeFieldTermDate(event: IMyDateModel) {
        if (this.processEdiForm.value.effDate) {
            let Tdate = this.getDate(event.singleDate);
            let Edate = this.getDate(this.processEdiForm.value.effDate.singleDate);
            if (Tdate < Edate) {
                this.messageService.findByMessageId(8131).subscribe((message) => {
                    this.showPopUp(
                        "8131 : " + message[0].messageText,
                        "Process EDI"
                    );
                    this.processEdiForm.patchValue({
                        termDate: null
                    });
                })
            }
        }
    }

    public onChangeFieldEffDate(event: IMyDateModel) {
        if (this.processEdiForm.value.termDate) {
            let Edate = this.getDate(event.singleDate);
            let Tdate = this.getDate(this.processEdiForm.value.termDate.singleDate);
            if (Tdate < Edate) {
                this.messageService.findByMessageId(8131).subscribe((message) => {
                    this.showPopUp(
                        "8131 : " + message[0].messageText,
                        "Users"
                    );
                    this.processEdiForm.patchValue({
                        effDate: null
                    });
                })
            }
        }
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Process EDI')
            })
        } else {
            this.activeModal.close();
        }
    };

    processResultPopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'OK', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
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
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    this.saveProcessEdiSetup()
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

    showPopupAlertWithOkButton = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.ERROR);
        popUpMessage.buttons.push(new PopUpMessageButton('OK', 'OK', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;

    };

    isFormDataModified() {
        this.processEdiForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.processEdiForm);
        this.createDataGrid();
        this.getCurrentUserId()
        forkJoin({
            fileTypes : this.dddwDtlService.findByColumnNameAndDwname("file_type", "dw_predi_setup_pick"),
            statuses : this.dddwDtlService.findByColumnNameAndDwname("status", "dw_predi_setup_pick"),
            actions : this.dddwDtlService.findByColumnNameAndDwname("action", "dw_predi_setup_pick"),
            submitterProfileMasters : this.submitterProfileMasterService.getSubmitterProfileMasters(),
            prediControls: this.prediControlService.findAllProcessEdiSetups()
		}).subscribe(
			({ fileTypes, statuses, actions, submitterProfileMasters, prediControls }) => {
				this.fileTypes = fileTypes;
                this.statuses =  statuses;
                this.actions = actions;
                this.submitterProfileMasters = submitterProfileMasters;
                this.prediControls = prediControls;
				this.getProcessEdiSetups();
			},(error) => {
				console.log(error);
			}
		);
    }

    private menuInit() {
        if (this.specialMenuStatus === '001') {
            this.menu = [
                {
                    menuItem: 'File',
                    dropdownItems: [
                        {name: "New", shortcutKey: "Ctrl+N",},
                        { name: "Open", shortcutKey: "Ctrl+O" },
                        {name: "Run Job", shortcutKey: "Ctrl+J",},
                        { name: "Close", shortcutKey: "Ctrl+F4" },
                        { isHorizontal: true },
                        { name: "Main Menu...", shortcutKey: "F2" },
                        { name: "Shortcut Menu...", shortcutKey: "F3" },
                        { isHorizontal: true },
                        { name: "Print", disabled: true },
                        { isHorizontal: true },
                        { name: "Exit", shortcutKey: "Alt+F4" },
                    ],
                },
                {
                    menuItem: "Edit",
                    dropdownItems: [
                        { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                        { isHorizontal: true },
                        { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                        { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                        { name: "Paste", shortcutKey: "Ctrl+V" },
                        { isHorizontal: true },
                        { name: "Next", shortcutKey: "F8" },
                        { name: "Previous", shortcutKey: "F7" },
                    ],
                },
                {
                    menuItem: 'Special',
                    dropdownItems: [
                        {name: 'Member Missing Salary Report'},
                        {name: 'Job Statistics'},
                    ]
                },
                {
                    menuItem: 'Notes',
                    dropdownItems: [
                        {name: 'Notes', shortcutKey: 'F4', disabled: true}
                    ]
                },
                {
                    menuItem: "Windows",
                    dropdownItems: [
                        { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                        { isHorizontal: true },
                        { name: "1 Main Menu" },
                        { name: "2 Process EDI" },
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
                    ]
                }
            ];
        } else if (this.specialMenuStatus === '002') {
            this.menu = [
                {
                    menuItem: 'File',
                    dropdownItems: [
                        {name: "New", shortcutKey: "Ctrl+N",},
                        { name: "Open", shortcutKey: "Ctrl+O" },
                        {name: "Run Job", shortcutKey: "Ctrl+J",},
                        { name: "Close", shortcutKey: "Ctrl+F4" },
                        { isHorizontal: true },
                        { name: "Main Menu...", shortcutKey: "F2" },
                        { name: "Shortcut Menu...", shortcutKey: "F3" },
                        { isHorizontal: true },
                        { name: "Print", disabled: true },
                        { name: "Printer Setup..." },
                        { isHorizontal: true },
                        { name: "Exit", shortcutKey: "Alt+F4" },
                    ],
                },
                {
                    menuItem: "Edit",
                    dropdownItems: [
                        { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                        { isHorizontal: true },
                        { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                        { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                        { name: "Paste", shortcutKey: "Ctrl+V" },
                        { isHorizontal: true },
                        { name: "Next", shortcutKey: "F8" },
                        { name: "Previous", shortcutKey: "F7" },
                    ],
                },
                {
                    menuItem: 'Special',
                    dropdownItems: [
                        {name: 'Member Job Log Report'},
                        {name: 'Member Critical Error Report'},
                        {name: 'Member Non-Critical Error Report'},
                        {name: 'Added Members Report'},
                        {name: 'Terminated Members Report'},
                        {name: 'Reinstated Members Report With Term'},
                        {name: 'Reinstated Members Report'},
                        {name: 'Detail Member Change Report'},
                        {name: 'Member Missing Salary Report'},
                        {name: 'Member Summary Control Report'},
                        {name: 'Job Statistics'},
                    ]
                },
                {
                    menuItem: 'Notes',
                    dropdownItems: [
                        {name: 'Notes', shortcutKey: 'F4', disabled: true}
                    ]
                },
                {
                    menuItem: "Windows",
                    dropdownItems: [
                        { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                        { isHorizontal: true },
                        { name: "1 Main Menu" },
                        { name: "2 Process EDI" },
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
                    ]
                }
            ];
        } else if (this.specialMenuStatus === '003') {
            this.menu = [
                {
                    menuItem: 'File',
                    dropdownItems: [
                        {name: "New", shortcutKey: "Ctrl+N",},
                        { name: "Open", shortcutKey: "Ctrl+O" },
                        {name: "Run Job", shortcutKey: "Ctrl+J",},
                        { name: "Close", shortcutKey: "Ctrl+F4" },
                        { isHorizontal: true },
                        { name: "Main Menu...", shortcutKey: "F2" },
                        { name: "Shortcut Menu...", shortcutKey: "F3" },
                        { isHorizontal: true },
                        { name: "Print", disabled: true },
                        { name: "Printer Setup..." },
                        { isHorizontal: true },
                        { name: "Exit", shortcutKey: "Alt+F4" },
                    ],
                },
                {
                    menuItem: "Edit",
                    dropdownItems: [
                        { name: "Undo", shortcutKey: "Ctrl+Z", disabled: true },
                        { isHorizontal: true },
                        { name: "Cut", shortcutKey: "Ctrl+X", disabled: true },
                        { name: "Copy", shortcutKey: "Ctrl+C", disabled: true },
                        { name: "Paste", shortcutKey: "Ctrl+V" },
                        { isHorizontal: true },
                        { name: "Next", shortcutKey: "F8" },
                        { name: "Previous", shortcutKey: "F7" },
                    ],
                },
                {
                    menuItem: 'Special',
                    dropdownItems: [
                        {name: 'Member Missing Salary Report'},
                        {name: 'Claims Job Log'},
                        {
                            name: 'Claims Critical Error Report',
                            dropdownItems: [
                                {name: 'Grouped By Error'},
                                {name: 'Grouped By Claim'}
                            ]
                        },
                        {
                            name: 'Claims Non-Critical Error Report',
                            dropdownItems: [
                                {name: 'Grouped By Error'},
                                {name: 'Grouped By Claim'}
                            ]
                        },
                        {name: 'Claims Detail Report'},
                        {name: 'Claims Auth Link Report'},
                        {name: 'Job Statistics'},
                    ]
                },
                {
                    menuItem: 'Notes',
                    dropdownItems: [
                        {name: 'Notes', shortcutKey: 'F4', disabled: true}
                    ]
                },
                {
                    menuItem: "Windows",
                    dropdownItems: [
                        { name: "Show Timestamp", shortcutKey: "Shift+Alt+S" },
                        { isHorizontal: true },
                        { name: "1 Main Menu" },
                        { name: "2 Process EDI" },
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
                    ]
                }
            ];
        }
    }

    private handleSpecialMenu(action: string) {
        switch (action) {
            case 'Member Missing Salary Report': {
                this.toastService.showToast('functionality haven\'t implemented yet.', NgbToastType.Danger);
                break;
            }
            case 'Job Statistics': {
                if (this.processEdiSetup) {
                    const ref = this.modalService.open(
                        ProcessEdiJobStatisticsComponent,
                        {
                            size: <any>"xl",
                            ...NGBModalOptions,
                            windowClass: "dashboard-modal",
                        }
                    );
                    ref.componentInstance.processEdi = this.processEdiSetup;
                }
                break;
            }
        }
    }

    private setFormFieldEnableDisable(status: any) {
        switch (status) {
            case 'Cancelled': {
                this.processEdiForm.get('duplicateCheck').disable();
                this.processEdiForm.get('positiveFile').disable();
                this.processEdiForm.get('pricing').disable();
                this.processEdiForm.get('memberSearch').disable();
                this.processEdiForm.get('personNoSearch').disable();
                this.processEdiForm.get('redoConversion').disable();
                this.processEdiForm.get('adjudication').disable();
                this.processEdiForm.get('lensPresProc').disable();
                this.processEdiForm.get('effDate').disable();
                this.processEdiForm.get('termDate').disable();
                this.isDeferredDisabled = 'disabled';
                this.processEdiForm.get('comments').disable();
                this.processEdiForm.get('conversionProgram002').disable();
                break;
            }
            default: {
                this.processEdiForm.get('duplicateCheck').enable();
                this.processEdiForm.get('positiveFile').enable();
                this.processEdiForm.get('pricing').enable();
                this.processEdiForm.get('memberSearch').enable();
                this.processEdiForm.get('personNoSearch').enable();
                this.processEdiForm.get('redoConversion').enable();
                this.processEdiForm.get('adjudication').enable();
                this.processEdiForm.get('lensPresProc').enable();
                this.processEdiForm.get('effDate').enable();
                this.processEdiForm.get('termDate').enable();
                this.isDeferredDisabled = null;
                this.processEdiForm.get('comments').enable();
                this.processEdiForm.get('conversionProgram002').enable();
                break;
            }
        }
        const textHolder = document.getElementById("status");
        if (status == 'IN PROCESS') {
            textHolder.style.color = "#dc3545";
        } else {
            textHolder.style.color = "#007bff";
        }
    };

    showTimestamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Process EDI";
        ref.componentInstance.insertDateTime = this.processEdiSetup.insertDatetimeDisplay?this.processEdiSetup.insertDatetimeDisplay: this.processEdiSetup.insertDatetime;
        ref.componentInstance.insertProcess = this.processEdiSetup.insertProcess;
        ref.componentInstance.insertUser = this.processEdiSetup.insertUser;
        ref.componentInstance.updateUser = this.processEdiSetup.updateUser;
        ref.componentInstance.updateDateTime = this.processEdiSetup.updateDatetimeDisplay?this.processEdiSetup.updateDatetimeDisplay:this.processEdiSetup.updateDatetime;
        ref.componentInstance.updateProcess = this.processEdiSetup.updateProcess;
    }
}
