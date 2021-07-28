import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormValidation} from '../../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../../view-model/security/sec-win-view-model';
import {CiebPremiumMaster, PremiumMaster, SecUser, SecWin} from '../../../../api-models';
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
import {PopUpMessage, PopUpMessageButton} from '../../../../shared/components/pop-up-message';
import {GroupMasterService, SecUserService} from '../../../../api-services';
import {SecColDetail} from '../../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../../api-services/security/sec-col-detail.service';
import {
    DynamicConfigFormRow,
    FORM_FIELD_ACTION_TYPES,
    FormField,
    FormRow,
    Option
} from '../../../../shared/models/models';
import {
    PharmacyESIDetailsConfig, PharmacyESIDetailsFields, PharmacyPayerDetailsFields,
    PricingPartnerDetailFields
} from '../../addon.constants';
import {ProcFetchPartnerDetailsService} from '../../../../api-services/addon/proc-fetch-partner-details.stored-procedure.service';
import {CiebPremiumMasterService} from '../../../../api-services/addon/cieb-premium-master.service';
import {ActivatedRoute} from '@angular/router';
import {CiebGroupMasterService} from '../../../../api-services/cieb-group-master.service';
import {ProcGetGroupTestStatusService} from '../../../../api-services/addon/proc-get-group-test-status.stored-procedure.service';

@Component({
    selector: 'esi-details',
    templateUrl: './esi-details.html',
    styleUrls: ['./esi-details.component.scss']
})
export class ESIDetailsComponent implements OnInit {
    subActiveTab = 3;

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    esiDetailsForm: FormGroup;
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
    public pharmacyESIDetailsFormState = new Array<DynamicConfigFormRow>();
    resetInlineGrid = false;
    saveInlineGrid = false;
    resetInlineGridA = false;
    saveInlineGridA = false;
    pharmacyESIDetailsConfig = PharmacyESIDetailsConfig;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    private windowId: string = 'AORXESI';
    private userTemplateId: string;
    @Input() groupNumber: string;
    @Input() groupName: string;
    @Input() seqGroupId: number;

    // Use constructor injection to inject an instance of a FormBuilder
    premiumMasters = new Array<CiebPremiumMaster>();

    constructor(
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
        private route: ActivatedRoute,
        private ciebGroupMasterService: CiebGroupMasterService,
        private groupMasterService: GroupMasterService,
        private groupStatusesService: ProcGetGroupTestStatusService,
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
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.esiDetailsForm);
        this.getGroupDetails(this.seqGroupId);
    }

    getGroupDetails = (seqGroupId) => {
        this.ciebGroupMasterService.getCiebGroupMaster(seqGroupId).subscribe(group => {
            this.esiDetailsForm.get("groupNumber").setValue(group.hsdGroupId);
            this.groupMasterService.getGroupMasterByGroupId(group.hsdGroupId).subscribe(groupMaster => {
                this.esiDetailsForm.get("groupName").setValue(groupMaster.shortName);
                this.getPremiumMasterDetails(groupMaster.seqGroupId);
            })
        });
    }

    getPremiumMasterDetails(seqGroupId): void {
        this.ciebPremiumMasterService.getCiebPremiumMaster(seqGroupId)
            .subscribe((mastersList: CiebPremiumMaster[]) => {
                this.premiumMasters = mastersList;
                this.populateDynamicForm(mastersList);
            })
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

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.esiDetailsForm = this.formBuilder.group({
            groupNumber: ['', {updateOn: 'blur', validators: []}],
            groupName: ['', {updateOn: 'blur', validators: []}],
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
        this.formValidation = new FormValidation(this.esiDetailsForm);
    }

    readQueryParams = () => {
        this.route.queryParams.subscribe(params => {
            if (!params['seqGroupId']) {
                this.seqGroupId = 73; // TODO: remove hardcode values after testing
                //this.showPopUp('seqGroupId is a required parameter', 'ESI Details Error')
            } else {
                this.seqGroupId = params['seqGroupId'];
            }
        })
    }
    SubmitBtn = "Save Changes";
    RestoreBtnText = "Reset All";

    /**
     * form date to grid state
     */
    populateDynamicForm(values: CiebPremiumMaster[]): void {

        // -------------- set dropdownValues
        let options = new Array<Option>();
        options.push({key: "Yes", value: "T"});
        options.push({key: "No", value: "F"});
        this.pharmacyESIDetailsConfig.map(field=> field.name == PharmacyESIDetailsFields.RX_PRIME? field.options = options: '');

        values && values.length > 0 && values.forEach((value: CiebPremiumMaster) => {
            let mockConfig = JSON.parse(JSON.stringify(this.pharmacyESIDetailsConfig));    // make a copy of original config
            let formState: FormRow = new FormRow();
            mockConfig.forEach((field, index) => {
                if (field.name === PharmacyESIDetailsFields.RX_PLAN_ID) {
                    mockConfig[index].value = value.rxprimeAcctNum;
                } else if (field.name === PharmacyESIDetailsFields.PLAN) {
                    mockConfig[index].value = value.hsdPlancode;
                } else if (field.name === PharmacyESIDetailsFields.EFF_DATE) {
                    mockConfig[index].value = value.planEffectiveDate;
                } else if (field.name === PharmacyESIDetailsFields.END_DATE) {
                    mockConfig[index].value = value.planEndDate;
                } else if (field.name === PharmacyESIDetailsFields.RX_PRIME) {
                    mockConfig[index].value = value.rxprimePlancodeFlag;
                }
            });

            formState.formFields = mockConfig;
            formState.id = {
                data: value
            };
            formState.action = null;
            this.pharmacyESIDetailsFormState.push(formState);          // add record
        });
        this.pharmacyESIDetailsConfig = JSON.parse(JSON.stringify(this.pharmacyESIDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.pharmacyESIDetailsFormState = JSON.parse(JSON.stringify(this.pharmacyESIDetailsFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        
    }

    onRowAdded(event) {
        const changeOnDate = PricingPartnerDetailFields.CHANGED_ON_DATE + (event.index - 1);
        event.form.controls.fields.controls[event.index - 1].enable(); //enable fields of new Row
        event.form.controls.fields.controls[event.index - 1].controls[changeOnDate].disable(); //disable a field
    }

    saveForm(event) {
        if (!this.seqGroupId) {
            this.showPopUp('SeqGroupId is not found', 'ESI Details Error');
            return;
        }
        this.pharmacyESIDetailsFormState = event.formState;
        event = event.fields;

        let apiValues = new Array<CiebPremiumMaster>();
        const updatedRecords: FormRow[] = this.pharmacyESIDetailsFormState.filter(record => record.action == FORM_FIELD_ACTION_TYPES.UPDATE);

        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let ciebPremiumMaster: CiebPremiumMaster = preStateRecord.id ? preStateRecord.id.data : new CiebPremiumMaster();
                    let apiValue: CiebPremiumMaster = this.populateFormFields(ciebPremiumMaster, pair, preStateRecord.action);
                    apiValues.push(apiValue);
                }
            });
            this.ciebPremiumMasterService.updateCiebPremiumMasters(apiValues, this.seqGroupId).subscribe(result => {
                this.alertMessage = this.alertMessageService.success('Updated Successfully');
            });
        }
    }

    private populateFormFields(ciebPremiumMaster: CiebPremiumMaster, event: any, action: FORM_FIELD_ACTION_TYPES) {
        ciebPremiumMaster.rxprimeAcctNum = event[0].value;
        ciebPremiumMaster.rxprimePlancodeFlag = event[1].value;
        ciebPremiumMaster.action = action;
        return ciebPremiumMaster;
    }

    public resetAllClick() {
        this.getPremiumMasterDetails(this.seqGroupId);
    }
}
