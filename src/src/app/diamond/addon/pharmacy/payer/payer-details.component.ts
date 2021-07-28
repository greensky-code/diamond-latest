import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormValidation} from '../../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../../view-model/security/sec-win-view-model';
import {CiebEntityCode, CiebGroupMaster, CiebPremiumMaster, GroupMaster, ProcUpdGrpTestStatus, SecUser, SecWin} from '../../../../api-models';
import {SecurityService} from '../../../../shared/services/security.service';
import {SecWinService} from '../../../../api-services/security/sec-win.service';
import {DateFormatPipe} from '../../../../shared/pipes/date-format.pipe';
import {AlertMessage, AlertMessageService} from '../../../../shared/components/alert-message';
import {CustomValidators} from '../../../../shared/validators/custom-validator';
import {Mask} from '../../../../shared/pipes/text-format.pipe';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopUpMessageComponent} from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {DatePickerConfig, DatePickerModel} from '../../../../shared/config';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../../shared/components/pop-up-message';
import {GroupMasterService, ProcUpdGrpTestStatusService, SecUserService} from '../../../../api-services';
import {SecColDetail} from '../../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../../api-services/security/sec-col-detail.service';
import {DynamicConfigFormRow, FORM_FIELD_ACTION_TYPES, FormField, FormRow, Option} from '../../../../shared/models/models';
import {
    FillingDetailFields,
    PharmacyPayerDetailsConfig,
    PharmacyPayerDetailsFields,
    PricingPartnerDetailFields
} from '../../addon.constants';
import {ProcFetchPartnerDetails} from '../../../../api-models/addon/proc-fetch-partner-details.input-model';
import {ProcFetchPartnerDetailsService} from '../../../../api-services/addon/proc-fetch-partner-details.stored-procedure.service';
import {CiebPremiumMasterService} from '../../../../api-services/addon/cieb-premium-master.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {ActivatedRoute} from '@angular/router';
import { NgbToastType } from 'ngb-toast';
import {CiebGroupMasterService} from '../../../../api-services/cieb-group-master.service';
import {ProcGetGroupTestStatusService} from '../../../../api-services/addon/proc-get-group-test-status.stored-procedure.service';
import {ProcGetGroupTestStatus} from '../../../../api-models/addon/proc-get-group-test-status.input-model';
import {CiebEntityCodeService} from '../../../../api-services/addon/cieb-entity-code.service';
import {DatePipe} from '@angular/common';
import { CiebWebCodeDecodeService } from '../../../../api-services/addon/cieb-web-code-decode.service';
import { Form } from '../../../../shared/helpers/form.helper';

@Component({
    selector: 'payer-details',
    templateUrl: './payer-details.html',
    styleUrls: ['./payer-details.component.scss'],
    providers: [DatePipe]
})
export class PayerDetailsComponent implements OnInit {
    subActiveTab = 2;

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    payerDetailsForm: FormGroup;
    argusDetailsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    public pharmacyPayerDetailsFormState = new Array<DynamicConfigFormRow>();
    premiumMasters = new Array<CiebPremiumMaster>();
    resetInlineGrid = false;
    saveInlineGrid = false;
    resetInlineGridA = false;
    ciebGroupMaster: CiebGroupMaster;
    ciebGroupMasterEdit = false;
    drugsList: any[] = [];
    public SubmitBtn = "Save Changes";
    public RestoreBtnText = "Reset All";
    public loading = false;
    pharmacyPayerDetailsConfig = PharmacyPayerDetailsConfig;
    entityCodes: Array<CiebEntityCode>;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    private windowId: string = 'AORXPAY';
    private userTemplateId: string;
    testStatusesList = [
        {
            key: 'alt + p',
            value: 'Pending'
        },
        {
            key: 'alt + c',
            value: 'Completed'
        },
        {
            key: 'alt + f',
            value: 'Failed'
        }
    ];
    @Input() groupNumber: string;
    @Input() groupName: string;
    @Input() seqGroupId:number;
    groupMaster: GroupMaster;
    payerArgusClientId:string;
    payerGroupId:string;
    testStatus:string;
    testStatuses:any[]=["Pending","Completed","Failed"]
    editableFields: boolean=false;

    

    

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private ProcUpdGrpTestStatusService:ProcUpdGrpTestStatusService,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        public ngbActiveModal: NgbActiveModal,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private procFetchPartnerDetailsService: ProcFetchPartnerDetailsService,
        private ciebPremiumMasterService: CiebPremiumMasterService,
        private toastService: ToastService,
        private route: ActivatedRoute,
        private ciebGroupMasterService: CiebGroupMasterService,
        private groupMasterService: GroupMasterService,
        private groupStatusesService: ProcGetGroupTestStatusService,
        private entityCodesService: CiebEntityCodeService,
        public ciebWebCodeDecodeService : CiebWebCodeDecodeService,

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

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        //this.initializePermission();
        this.hasPermission();
        
        
    }


    getGroupStatuses = () => {
        let groupStatus: ProcGetGroupTestStatus = new ProcGetGroupTestStatus();
        groupStatus.pSeqGroupId = this.seqGroupId;
        this.groupStatusesService.procGetGroupTestStatus(groupStatus).then(res => {
            console.log(res);
            this.payerDetailsForm.get("testStatus").setValue(res);
            if(!res){
                this.editableFields=true;
            }
        }).catch(err => {
              this.editableFields = true;
            
            console.log(err);
        })
    }

    getGroupDetails = (seqGroupId) => {
        this.ciebGroupMasterService.getCiebGroupMaster(seqGroupId).subscribe(group => {
            this.payerDetailsForm.get("groupNumber").setValue(group.hsdGroupId);
            this.payerDetailsForm.get("payerOrArgusClientId").setValue(group.payerArgusClientId);
            this.payerDetailsForm.get("payerGroupId").setValue(group.payerGroupId);
           // this.payerDetailsForm.get("payerStartDate").setValue(group.insertDatetime);
            this.groupMasterService.getGroupMasterByGroupId(group.hsdGroupId).subscribe(groupMaster => {
                this.payerDetailsForm.get("groupName").setValue(groupMaster.shortName);
                this.getPremiumMasterDetails(groupMaster.seqGroupId)
            })
            this.ciebGroupMaster = group;
        });
    }

    onFormValueChange($event) {
        this.ciebGroupMasterEdit = true;
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

        if (this.groupNumber) {
            this.groupMasterService.getGroupMasterByGroupId(this.groupNumber).subscribe((groupMaster: GroupMaster) => {
                this.groupMaster = groupMaster;
                this.seqGroupId = groupMaster.seqGroupId ;
            });
        }
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
                        'You are not Permitted to view Pricing Partner',
                        'Pricing Partner Permission'
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
            this.secProgress = false;
            return;
        }
        // ------------------------------ TODO need to change tableName------------------------------------------
        this.secColDetailService
            .findByTableNameAndUserId('PROFSVC_CLAIM_HEADER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secProgress = false;
            });
    }

    getgroupMaster() {
        this.ciebGroupMasterService.getCiebGroupMaster(this.seqGroupId).subscribe(response => {
           
            this.ciebGroupMaster = response;
            this.payerArgusClientId = response.payerArgusClientId;
            this.payerGroupId = response.payerGroupId;
        });
    }

    updateGroupMaster(ciebGroupMaster: CiebGroupMaster) {
       // ciebGroupMaster.insertDatetime=Form.getValue(this.payerDetailsForm, 'payerStartDate');
        this.ciebGroupMasterService.updateCiebGroupMaster(ciebGroupMaster, this.seqGroupId).subscribe(result => {
            this.toastService.showToast("Record updated succesfully.", NgbToastType.Success);          
        }, error => {
            this.toastService.showToast('An error occured while updating record.', NgbToastType.Danger);
        }
        );
    }

    onPayerArgusClientIdChange($event) {
        this.payerArgusClientId = $event;
        this.ciebGroupMaster.payerArgusClientId = $event;
        this.ciebGroupMasterEdit = true;
    }

    onPayerGroupIdChange(event: any) {
        this.payerGroupId = event.target.value;
        this.ciebGroupMaster.payerGroupId = event;
        this.ciebGroupMasterEdit = true;
    }

    onTestStatusChange(event: any) {
        this.testStatus=event.target.value;
    }

    onPayerStartDateChange($event) {
        
        this.ciebGroupMaster.insertDatetime = $event;
        this.ciebGroupMasterEdit = true;
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    loader: true;
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.payerDetailsForm = this.formBuilder.group({
            groupNumber: ["", {updateOn: 'blur', validators: []}],
            payerOrArgusClientId: ['', {updateOn: 'blur', validators: []}],
            payerGroupId: ['', {updateOn: 'blur', validators: []}],
            groupName: ["", {updateOn: 'blur', validators: []}],
            testStatus: ['', {updateOn: 'blur', validators: []}],
            rXPrimeClientId: ['', {updateOn: 'blur', validators: []}],
            payerStartDate: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
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
        this.getgroupMaster();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.payerDetailsForm);
        this.getDrugsList();
        this.getGroupDetails(this.seqGroupId);
        //this.getGroupStatuses();
    }

    getDrugsList() {
        this.ciebWebCodeDecodeService
            .getCiebWebCodesByCodeAndCodeTypes('DRUG_LIST','PAYER')
            .subscribe((data) => {
                this.drugsList = data;

            });
    }

    getPremiumMasterDetails(seqGroupId): void{
        this.ciebPremiumMasterService.getCiebPremiumMaster(seqGroupId)
            .subscribe((mastersList: CiebPremiumMaster[]) => {
                this.premiumMasters = mastersList;
                this.populateDynamicForm(mastersList);
            })
    }

    /**
     * form date to grid state
     */
    populateDynamicForm(values: CiebPremiumMaster[]): void {
        values && values.length > 0 && values.forEach((value: CiebPremiumMaster) => {
            let mockConfig = JSON.parse(JSON.stringify(this.pharmacyPayerDetailsConfig));    // make a copy of original config
            let formState: FormRow = new FormRow();
            mockConfig.forEach((field, index) => {
                if (field.name === PharmacyPayerDetailsFields.PBM_ID) {
                    mockConfig[index].value = value.payerPbmCode;
                    if(this.editableFields==true){
                      mockConfig[index].disabled = false;
                    }
                } else if (field.name === PharmacyPayerDetailsFields.PLAN) {
                    mockConfig[index].value = value.hsdPlancode;
                } else if (field.name === PharmacyPayerDetailsFields.DRUGS_LIST) {
                    field.options = new Array<Option>();
                    this.drugsList.forEach(entityCode => {
                        return field.options.push({
                            key: entityCode.decode2,
                            value: entityCode.decode1
                        })
                    })
                    mockConfig[index].value = value.drugList;

                    if (this.editableFields == true) {
                      mockConfig[index].disabled = false;
                    }
                } else if (field.name === PharmacyPayerDetailsFields.EFF_DATE) {
                    mockConfig[index].value = value.planEffectiveDate;
                } else if (field.name === PharmacyPayerDetailsFields.END_DATE) {
                    mockConfig[index].value = value.planEndDate;
                } else if (field.name === PharmacyPayerDetailsFields.RX_PRIME) {
                    mockConfig[index].value = value.rxprimePlancodeFlag;
                    field.options = new Array<Option>();
                    field.options.push(
                        {
                            key: "Yes", value: "T"
                        }
                    );
                    field.options.push(
                        {
                            key: "No", value: "F"
                        }
                    );
                }
            });

            formState.formFields = mockConfig;
            formState.id = {
                data: value
            };
            formState.action = null;
            this.pharmacyPayerDetailsFormState.push(formState);          // add record
        });
        this.loading = false;
        this.pharmacyPayerDetailsConfig = JSON.parse(JSON.stringify(this.pharmacyPayerDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.pharmacyPayerDetailsFormState = JSON.parse(JSON.stringify(this.pharmacyPayerDetailsFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    onRowAdded(event) {
        console.log(event);
        const  prevState: Array<DynamicConfigFormRow> = event.prevState;
        event.form.controls.fields.controls[event.index - 1].enable(); //enable fields of new Row
        prevState[prevState.length-1].showCancelButton = true;
    }

    setPopupMessage(message: string, messageType: MessageType = MessageType.ERROR, title = 'Error') {
        this.popUpMessage = {
            message: message,
            title: title,
            messageType: messageType,
            name: 'error',
            buttons: [],
            buttonHeaderClass: '',
            icon: 'info',
            displayCloseBtn: true
        };
    }

    formFieldValueChanged($event) {
        const field: FormGroup = $event.field;
        const formField: FormField = $event.formField;
        const index: number = $event.index;
        let prevState: Array<DynamicConfigFormRow> = this.pharmacyPayerDetailsFormState;
        if (formField && formField.name) {
            const defaultValue = field.controls[formField.name].value;
            if(formField.name === PharmacyPayerDetailsFields.RX_PRIME) {

            }
            if (!defaultValue) {
                return;
            }
            prevState[index].showCancelButton = true;
        }
    }

    updateCiebGroupMaster() {
        this.ciebGroupMaster.payerGroupId = this.payerDetailsForm.get("payerGroupId").value;
        this.ciebGroupMaster.payerArgusClientId = this.payerDetailsForm.get("payerOrArgusClientId").value;
        this.ciebGroupMasterService.updateCiebGroupMaster(this.ciebGroupMaster, this.seqGroupId).subscribe(result => {
            this.ciebGroupMasterEdit = false;
        })
    }

    saveForm(event) {
        if (!this.seqGroupId) {
            this.showPopUp('SeqGroupId is not found', 'Payer Details Error');
            return;
        }
        if(this.ciebGroupMasterEdit) {
            this.updateGroupMaster(this.ciebGroupMaster);
            
        }
        this.pharmacyPayerDetailsFormState = event.formState;
        let eventFields = event.fields;

        let apiValues = new Array<CiebPremiumMaster>();
        let arrIndexes = [] ;
        this.pharmacyPayerDetailsFormState.forEach((arrValue , index) => {
           if( arrValue.action === FORM_FIELD_ACTION_TYPES.UPDATE ){
                arrIndexes.push(index);
           }
        }) ;
        var procUpd = new ProcUpdGrpTestStatus();
        procUpd.pPayerGroupId = this.payerGroupId;
        procUpd.pTestStatus = this.testStatus;
        this.ProcUpdGrpTestStatusService.procUpdGrpTestStatus(
          procUpd
        ).then((data) => {
          console.log("saved");
        });
        let updatedRecords: FormRow[] = this.pharmacyPayerDetailsFormState.filter(record => record.action == FORM_FIELD_ACTION_TYPES.UPDATE);
        if (updatedRecords.length > 0) {
            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                let indexOfChange = arrIndexes[index] ;
                     let updatedRecord = eventFields[indexOfChange];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let ciebPremiumMaster: CiebPremiumMaster = preStateRecord.id ? preStateRecord.id.data : new CiebPremiumMaster();
                    let apiValue: CiebPremiumMaster = this.populateFormFields(ciebPremiumMaster, pair, preStateRecord.action);
                    if(apiValue.rxprimePlancodeFlag === 'Yes') {
                        apiValue.rxprimePlancodeFlag = 'T';
                    } else if(apiValue.rxprimePlancodeFlag === 'No'){
                        apiValue.rxprimePlancodeFlag = 'F';
                    }
                    apiValues.push(apiValue);
            });
            setTimeout(() => {
                
                this.ciebPremiumMasterService.updateCiebPremiumMasters(apiValues, this.seqGroupId).subscribe(result => {
                    this.toastService.showToast("Record updated succesfully.", NgbToastType.Success);
                }, error => {
                    this.toastService.showToast('An error occured while updating record.', NgbToastType.Danger);
                }
                );
            }, 1000);
        }
    }

    public resetAllClick() {
        this.loading = true;
        this.getPremiumMasterDetails(this.seqGroupId);
    }

    private populateFormFields(ciebPremiumMaster: CiebPremiumMaster, event: any, action: FORM_FIELD_ACTION_TYPES) {
        
        ciebPremiumMaster.rxprimePlancodeFlag = event[0].value;
        ciebPremiumMaster.action = action;
        return ciebPremiumMaster;
    }
}
