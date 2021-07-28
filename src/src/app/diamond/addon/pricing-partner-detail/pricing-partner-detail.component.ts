/* Copyright (c) 2021 . All Rights Reserved. */

import { DatePipe } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDateModel, IMySingleDateModel } from "angular-mydatepicker";
import { NgbToastType } from "ngb-toast";
import { forkJoin } from 'rxjs';
import { SecUser, SecWin } from "../../../api-models";
import { CiebPricingAccntCodeModel } from "../../../api-models/addon/cieb-pricing-accnt-code.model";
import { CiebWebCodeDecode } from "../../../api-models/addon/cieb-web-code-decode.model";
import { ProcGetPricingAccntCodes } from "../../../api-models/addon/proc-get-pricing-accnt-codes.input-model";
import { ProcSavePricingAccntCode } from "../../../api-models/addon/proc-save-pricing-accnt-code.input-model";
import { ProcSavePricingAccntCodeViewModel } from "../../../api-models/addon/proc-save-pricing-accnt-code.view-model";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecUserService } from "../../../api-services";
import { CiebPricingAccntCodesService } from "../../../api-services/addon/cieb-pricing-accnt-codes.service";
import { CiebWebCodeDecodeService } from "../../../api-services/addon/cieb-web-code-decode.service";
import { ProcSavePricingAccntCodeService } from "../../../api-services/addon/sp/proc-save-pricing-accnt-code.stored-procedure.service";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage } from "../../../shared/components/alert-message";
import { MessageType, PopUpMessage, PopUpMessageButton } from "../../../shared/components/pop-up-message";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DatePickerConfig, DatePickerModel, PopUpIconType } from "../../../shared/config";
import { Form } from "../../../shared/helpers/form.helper";
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES, Option } from "../../../shared/models/models";
import { SecurityService } from "../../../shared/services/security.service";
import { ToastService } from "../../../shared/services/toast.service";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { PricingPartnerDetailFields, PricingPartnerDetailsConfig } from "../addon.constants";


// Use the Component directive to define the PricingPartnerDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'pricing-partner-detail',
    templateUrl: './pricing-partner-detail.component.html',
    providers: [DatePipe]

})
export class PricingPartnerDetailComponent implements OnInit, OnDestroy {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() groupNumber: string;
    @Input() groupName: string;
    @Input() seqGroupId: number;


    pricingPartnerDetailForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'CIEBRXGM';
    public isSuperUser = false;
    public secProgress = true;
    showAddNewLine = true;
    loader: boolean = true;

    userTemplateId: any = null;
    secColDetails = new Array<SecColDetail>();
    isLoadGrid: boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    administrativeDetailForm: FormGroup;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private ciebPricingAccntCodesService: CiebPricingAccntCodesService,
        private datePipe: DatePipe,
        public ngbActiveModal: NgbActiveModal,
        private ciebWebCodeDecodeService: CiebWebCodeDecodeService,
        private procSavePricingAccntCodeService: ProcSavePricingAccntCodeService,
        private toastService: ToastService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        this.createForm();
        this.formValidation = new FormValidation(this.administrativeDetailForm);
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


    private initializeComponentState(): void {
       
        forkJoin({
			changeReasonDropdownValues: this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypes(
				"REASN",
				"MRC2"
			),
			pricingAccountCodes: this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypeAndDecode3(
				"ACCTCODE",
				"MRC2",
                "Y"
			),
		}).subscribe(
			({ changeReasonDropdownValues, pricingAccountCodes }) => {
                this.resetInlineGrid = false;
                this.showAddNewLine = true;
				this.changeReasonDropdownValues = changeReasonDropdownValues;
				this.pricingAccountCodes = pricingAccountCodes;
                this.ciebPricingAccntCodesService.findCiebPricingAccntCodesBySeqGroupId(this.seqGroupId).subscribe((data: CiebPricingAccntCodeModel[]) => {
                    this.ciebPricingAccntCodes = data;
                    this.populateDynamicForm();
                });
			});
    }

    createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.administrativeDetailForm = this.formBuilder.group(
			{
				groupNumber: ["", { updateOn: "blur", validators: [] }],
				groupName: ["", { updateOn: "blur", validators: [] }]
			},
			{ updateOn: "submit" }
		);
	}


    pricingAccountCodes: CiebWebCodeDecode[] = [];
    changeReasonDropdownValues: CiebWebCodeDecode[] = [];

    findCiebPricingAccntCodesBySeqGroupId(seqGroupId: number) {
        this.ciebPricingAccntCodesService.findCiebPricingAccntCodesBySeqGroupId(seqGroupId).subscribe((data: CiebPricingAccntCodeModel[]) => {
            this.ciebPricingAccntCodes = data;
            this.populateDynamicForm();
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
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }


    showPopUp(message: string, title: string, messageType: MessageType = MessageType.ERROR) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon', [], messageType);
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

    procGetPricingAccntCodes: ProcGetPricingAccntCodes;
    procGetPricingAccntCode: ProcGetPricingAccntCodes[];
    // ProcGetPricingAccntCodesViewModels: ProcGetPricingAccntCodesViewModel[];

    // -------------------------------------------- Speciality grid
    ciebPricingAccntCodes: CiebPricingAccntCodeModel[] = [];
    pricingPartnerDetailsConfig = PricingPartnerDetailsConfig;
    pricingPartnerDetailsFormState = new Array<DynamicConfigFormRow>();

    resetInlineGrid = false;
    saveInlineGrid = false;

    /**
     * form date to grid state
     */
    populateDynamicForm() {
        this.pricingPartnerDetailsFormState = [];
        const values = this.ciebPricingAccntCodes;
        // set dynamic grid dropdown values
        this.pricingPartnerDetailsConfig.forEach((field: FormField) => {
            field.options = new Array<Option>();

            if (field.name == PricingPartnerDetailFields.PRICING_ACCOUNT_CODE) {
                this.pricingAccountCodes.forEach(value => {
                    field.options.push({key: value.decode1, value: value.decode1});
                });

            } else if (field.name == PricingPartnerDetailFields.CHANGE_REASON) {
                this.changeReasonDropdownValues.forEach(value => {
                    field.options.push({key: value.decode2, value: value.decode1});
                });
            }
        });
        if (!values || values.length == 0) {
            this.pricingPartnerDetailsFormState = JSON.parse(JSON.stringify(this.pricingPartnerDetailsFormState)); 
			this.isLoadGrid = true;
            this.loader = false;
            return;
		} else {
            values.forEach((value: CiebPricingAccntCodeModel) => {
                let mockConfig = JSON.parse(JSON.stringify(this.pricingPartnerDetailsConfig));    // make a copy of original config
                let formState: FormRow = new FormRow();
                mockConfig.forEach((field: any, index: any) => {
                    field.hideField = false;
                    if (field.name === PricingPartnerDetailFields.EFFECTIVE_DATE) {
                        mockConfig[index].disabled = true;
                        mockConfig[index].value = value.effectiveDate;
                    } else if (field.name === PricingPartnerDetailFields.TERM_DATE) {
                        mockConfig[index].disabled = true;
                        mockConfig[index].value = value.termDate;
                    } else if (field.name === PricingPartnerDetailFields.PRICING_ACCOUNT_CODE) {
                        mockConfig[index].type = 'text';
                        mockConfig[index].disabled = true;
                        mockConfig[index].value = value.pricingAccntCode;
                    } else if (field.name === PricingPartnerDetailFields.CHANGE_REASON) {
                        mockConfig[index].disabled = true;
                        for (var i = 0; i < this.changeReasonDropdownValues.length; i++) {
							if (this.changeReasonDropdownValues[i].decode1 == value.changeReasonCode) {
								mockConfig[index].value = this.changeReasonDropdownValues[i].decode2;
							}
						}
                        mockConfig[index].value = value.changeReasonCode;
                    } else if (field.name === PricingPartnerDetailFields.CHANGE_RECORD_INDICATOR) {
                        field.type = 'text';
                        mockConfig[index].disabled = true;
                        mockConfig[index].value = value.changeRecInd;
                    } else if (field.name === PricingPartnerDetailFields.ACTION) {
                        let currentDate = new Date().setHours(0,0,0,0);
                        (!value.termDate || (value.termDate && new Date(value.termDate).getTime() >= new Date(currentDate).getTime()) && value.changeRecInd == 'N') ? mockConfig[index].value = 'Edit' : mockConfig[index].value = '';
                    } else if (field.name === PricingPartnerDetailFields.CHANGED_ON_DATE) {
                        if(value.updateDatetime && value.changeRecInd == 'Y') {
                            mockConfig[index].value = this.datePipe.transform(value.updateDatetime, 'dd/MM/yyyy');
                        }
                    }
                });
                formState.formFields = mockConfig;
                formState.id = {
                    data: value
                };
                formState.action = null;
                this.pricingPartnerDetailsFormState.push(formState);          // add record
            });
            this.pricingPartnerDetailsConfig.map(field => field.name == PricingPartnerDetailFields.CHANGE_REASON ? field.required = false : '');  // make required to false for hidden fields
            this.pricingPartnerDetailsConfig = JSON.parse(JSON.stringify(this.pricingPartnerDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
            this.pricingPartnerDetailsFormState = JSON.parse(JSON.stringify(this.pricingPartnerDetailsFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
            this.isLoadGrid = true;
            this.loader = false;
        }
    }

    onRowAdded(event: any) {
        const prevState: Array<DynamicConfigFormRow> = event.prevState;
        const changeOnDate = PricingPartnerDetailFields.CHANGED_ON_DATE + (event.index - 1);
        event.form.controls.fields.controls[event.index - 1].enable(); //enable fields of new Row
        event.form.controls.fields.controls[event.index - 1].controls[changeOnDate].disable(); //disable a field
        prevState[prevState.length - 1].showCancelButton = true;
        prevState[prevState.length - 1].showSaveButton = true;
        this.showAddNewLine = false;
    }

    // param :  prevState: Array<DynamicConfigFormRow>
    onRestoreForm(formState: Array<DynamicConfigFormRow>) {
        if (!formState || !(formState.length > 0)) {
            return;
        }
        // remove all records
        formState.forEach(record => {
            const data: CiebPricingAccntCodeModel = record.id.data;
            this.ciebPricingAccntCodesService.deleteCiebPricingAccntCode(data.seqPricingAccntId).subscribe(resp => {
                // removed all records...
            });
        });

    }

    /**
     * Handle Pricing partner form details validations
     */
    formFieldValueChanged($event: any) {
        let field: FormField = $event.formField;
        const index: number = $event.index;
        let form: FormGroup = $event.field;
        let prevState: Array<DynamicConfigFormRow> = $event.prevState;

        if (field.name == PricingPartnerDetailFields.ACTION + index) {
            if (field.value == 'Edit') {
                prevState[index].showCancelButton = true;
                prevState[index].showSaveButton = true;
                prevState[index].formFields.map(record => record.name === (PricingPartnerDetailFields.PRICING_ACCOUNT_CODE + index) ? record.type = 'radioButton' : null);
                prevState[index].formFields.map(field => {
                    if(field.name === ( PricingPartnerDetailFields.EFFECTIVE_DATE + index)) {
                        field.disabled = false;
                    }
                    if(field.name === ( PricingPartnerDetailFields.TERM_DATE + index)) {
                        field.disabled = false;
                    }
                    if(field.name === ( PricingPartnerDetailFields.PRICING_ACCOUNT_CODE + index)) {
                        field.disabled = false;
                    }
                    if(field.name === ( PricingPartnerDetailFields.CHANGE_REASON + index)) {
                        field.disabled = false;
                    }
                });
                form.enable();
            } 
        } else if (field.name === PricingPartnerDetailFields.EFFECTIVE_DATE + index) {  /// -------------------------validate eff date
        } else if (field.name === PricingPartnerDetailFields.TERM_DATE + index) { /// -------------------------validate term date
        }
    }

    onCancelClick(event: any) {
        let field: FormField = event.formField;
        const index: number = event.index;
        let form: FormGroup = event.field;
        let prevState: Array<DynamicConfigFormRow> = event.prevState;
        prevState[index].showCancelButton = false;
        prevState[index].showSaveButton = false;
        this.showAddNewLine = true;
        prevState[index].formFields.map(field => {
            if(field.name === ( PricingPartnerDetailFields.ACTION + index)) {
                field.value = "Edit";
            }
            if(field.name === ( PricingPartnerDetailFields.EFFECTIVE_DATE + index)) {
                field.disabled = true;
            }
            if(field.name === ( PricingPartnerDetailFields.TERM_DATE + index)) {
                field.disabled = true;
            }
            if(field.name === ( PricingPartnerDetailFields.PRICING_ACCOUNT_CODE + index)) {
                field.type = 'text';
                field.disabled = true;
            }
            if(field.name === ( PricingPartnerDetailFields.CHANGE_REASON + index)) {
                field.disabled = true;
            }
        });
      
    }

    onActionFieldChange(field: FormField, form: FormGroup, index: number) {
        if (field.value == 'Edit') {
            form.enable();
            field.value = ''; // 'Save'  Save action removed.. now using row bottom save btn
        } else if (field.value == 'Save') {
            this.saveInlineGrid = true;
            setTimeout(() => {
                field.value = 'Edit'
                this.saveInlineGrid = false;
                form.disable();
            }, 1000);

        }
    }

    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    validateSvcDate(event: IMyDateModel, thruDate: any) {

        if (event.singleDate && thruDate) {
            let thruDefault = this.getDate(thruDate.singleDate);
            let svcDate = this.getDate(event.singleDate);

            // =====================================        =============================
            if (this.isValidDate(thruDefault) && this.isValidDate(svcDate)) {
                const isValid = thruDefault.getTime() > svcDate.getTime();
                if (!isValid) {
                    this.openDateValidationPopupError(true);
                }
            }
        }
    }


    infoIcon = faInfoCircle;
    faWindowClose = faWindowClose;

    iconTypes = PopUpIconType;

    validateTermDate(event: IMyDateModel, svcDate: any) {
        if (event && svcDate) {
            let termDate = this.getDate(event.singleDate);
            let effectiveDate = this.getDate(svcDate.singleDate);
            if (this.isValidDate(termDate) && this.isValidDate(effectiveDate)) {
                // term date always greater than effective date
                if (!(termDate.getTime() > effectiveDate.getTime())) {
                    this.popUpMessage = {
                        message: 'Termination date cannot be less than effective date',
                        title: 'Error',
                        messageType: MessageType.ERROR,
                        name: 'error',
                        buttons: [],
                        buttonHeaderClass: '',
                        icon: 'info',
                        displayCloseBtn: true
                    };
                    return;
                }
                // term date should always be last date of month
                const lastMonthsDay = new Date(event.singleDate.date.year, event.singleDate.date.month, 0).getDate();
                if (!(lastMonthsDay === event.singleDate.date.day)) {
                    this.setPopupMessage('7777: Dates are overlapping');
                    return;
                }
                this.setPopupMessage(null);
            }
        }
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


    openDateValidationPopupError(isTermDate = true) {
        let popMsg = new PopUpMessage('Pricing Partner Details', 'Pricing Partner Details',
            '7777: Dates are overlapping', 'info', [], MessageType.ERROR);

        popMsg.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
    }

    isSaveResultFlag: boolean = false;
    isUpdateResultFlag: boolean = false;

    saveForm(event: any) {
        const prevState = event.formState;
        this.pricingPartnerDetailsFormState = prevState
        event = event.fields;
        let apiValues = new Array<CiebPricingAccntCodeModel>();

        const updatedRecords: FormRow[] = this.pricingPartnerDetailsFormState.filter(
            (record: any, index) => {
                record.index = index;
                return (
                record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
                record.action === FORM_FIELD_ACTION_TYPES.DELETE
                );
            });
        
        let isEffectiveDateReqFlag: boolean = false;
        let isPricingAccountCodeFlag: boolean = false;            
        let isEffAndTermDateFlag: boolean = false;            
        let isChangeRsnFlag: boolean = false;
        
        if (updatedRecords.length > 0) {
            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[preStateRecord.index];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                    let ciebPricingAccntCodeModel: CiebPricingAccntCodeModel = preStateRecord.id ? preStateRecord.id.data : new CiebPricingAccntCodeModel();
                    let apiValue: CiebPricingAccntCodeModel = this.populateFormFields(ciebPricingAccntCodeModel, pair, preStateRecord.action);
                    if(apiValue.effectiveDate && apiValue.termDate) {
						let effectiveDate: Date = new Date(apiValue.effectiveDate);
						let termDate:Date = new Date(apiValue.termDate);
						if(effectiveDate.getTime() > termDate.getTime()) {
							isEffAndTermDateFlag = true;
						} 
					} 
                    if (!apiValue.effectiveDate) {
                        isEffectiveDateReqFlag = true;
                    } 
                    if (!apiValue.pricingAccntCode) {
                        isPricingAccountCodeFlag = true;
                    } 
                    if (apiValue.termDate && !apiValue.changeReasonCode) {
                        isChangeRsnFlag = true;
                    }
                    apiValues.push(apiValue);
                }
            });
        }
        const newRecords: FormRow[] = this.pricingPartnerDetailsFormState.filter(record => record.action == FORM_FIELD_ACTION_TYPES.ADD);
        this.pricingPartnerDetailsFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD  || !record.id) {
                let ciebPricingAccntCodeModel = new CiebPricingAccntCodeModel();
                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({key: k, value: newRecord[k]}));
                let apiValue: CiebPricingAccntCodeModel = this.populateFormFields(ciebPricingAccntCodeModel, pair, FORM_FIELD_ACTION_TYPES.ADD);
                if(apiValue.effectiveDate && apiValue.termDate) {
                    let effectiveDate: Date = new Date(apiValue.effectiveDate);
                    let termDate:Date = new Date(apiValue.termDate);
                    if(effectiveDate.getTime() > termDate.getTime()) {
                        isEffAndTermDateFlag = true;
                    } 
                }  
                if (!apiValue.effectiveDate) {
                    isEffectiveDateReqFlag = true;
                } 
                if (!apiValue.pricingAccntCode) {
                    isPricingAccountCodeFlag = true;
                } 
                apiValues.push(apiValue);
            }
        });
        if(isEffectiveDateReqFlag){
			this.toastService.showToast("Effective Date cannot be blank", NgbToastType.Danger);
			return;
		} 
        if(isPricingAccountCodeFlag){
			this.toastService.showToast("Pricing Account Code must be selected", NgbToastType.Danger);
			return;
		} 
        if(isEffAndTermDateFlag){
			this.toastService.showToast("Termination Date cannot be less than the Effective Date", NgbToastType.Danger);
			return;
		} else if(isChangeRsnFlag){
			this.toastService.showToast("A Change Reason is required when a Termination Date is present", NgbToastType.Danger);
			return;
		}
        
        let ciebPricingAccntCodeModels: CiebPricingAccntCodeModel[] = [];
        let procSavePricingAccntCodes: ProcSavePricingAccntCode[] = [];
        apiValues.forEach(value => {
            // ----------------- Save form-----------------------------------------------------
            if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
                // todo need to check do we need save timestamp
                let ciebPricingAccntCodeModel = new CiebPricingAccntCodeModel();
                ciebPricingAccntCodeModel.procEffectiveDate = value.procEffectiveDate;
                ciebPricingAccntCodeModel.procTermDate = value.procTermDate;
                ciebPricingAccntCodeModel.seqPricingAccntId = value.seqPricingAccntId;
                ciebPricingAccntCodeModel.seqGroupId = this.seqGroupId;
                ciebPricingAccntCodeModel.tradingPartner = value.tradingPartner;
                ciebPricingAccntCodeModel.pricingAccntCode = value.pricingAccntCode;
                ciebPricingAccntCodeModel.effectiveDate = value.effectiveDate;
                ciebPricingAccntCodeModel.termDate = value.termDate;
                ciebPricingAccntCodeModel.changeRecInd = "N";
                ciebPricingAccntCodeModel.changeReasonCode = "";

                ciebPricingAccntCodeModel.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
                ciebPricingAccntCodeModel.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
                ciebPricingAccntCodeModel.insertUser = sessionStorage.getItem('user');
                ciebPricingAccntCodeModel.insertProcess = "ADDON";
                ciebPricingAccntCodeModel.tradingPartner = 'PS';
                ciebPricingAccntCodeModels.push(ciebPricingAccntCodeModel);
            } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
                let procSavePricingAccntCode = new ProcSavePricingAccntCode();
                procSavePricingAccntCode.pLanId = value.insertUser;
                procSavePricingAccntCode.pNewEffDate = value.procEffectiveDate;
                procSavePricingAccntCode.pNewTermDate = value.procTermDate;
                procSavePricingAccntCode.pOldChangeReasonCode = value.changeReasonCode;
                procSavePricingAccntCode.pOldSeqPricingAccntId = value.seqPricingAccntId;
                procSavePricingAccntCode.pSeqGroupId = this.seqGroupId;
                procSavePricingAccntCode.pTradingPartner = value.tradingPartner;
                procSavePricingAccntCode.pPricingAccntCode = value.pricingAccntCode;
                

                procSavePricingAccntCodes.push(procSavePricingAccntCode);
            }
        });
        
        if(ciebPricingAccntCodeModels && ciebPricingAccntCodeModels.length > 0) {
            this.savePricingPartner(ciebPricingAccntCodeModels[0]);
        } else {
            this.isSaveResultFlag = true;
        }
        if(procSavePricingAccntCodes && procSavePricingAccntCodes.length > 0) {
            this.updatePricingPartner(procSavePricingAccntCodes[0]);
        } else {
            this.isUpdateResultFlag = true;
        }
       
    }
    
    savePricingPartner(ciebPricingAccntCodeModel: CiebPricingAccntCodeModel) {
        if (!ciebPricingAccntCodeModel.effectiveDate){
            this.toastService.showToast("Effective date cannot be blank", NgbToastType.Danger);
            return;
        } else {
            this.ciebPricingAccntCodesService.createCiebPricingAccntCode(ciebPricingAccntCodeModel).subscribe((resp) => {
                this.isSaveResultFlag = true;
                this.onCreateAndUpdateResuilt(resp);
            });
        }
    }

    updatePricingPartner(procSavePricingAccntCode: ProcSavePricingAccntCode) {
        this.procSavePricingAccntCodeService.procSavePricingAccntCode(procSavePricingAccntCode).subscribe((resp: ProcSavePricingAccntCodeViewModel[]) => {
            this.isUpdateResultFlag = true;
            this.onCreateAndUpdateResuilt(resp);
        });
    }
    
    onCreateAndUpdateResuilt(resp: any) {
        if(this.isSaveResultFlag && this.isUpdateResultFlag) {
            if (resp[0] && resp[0].pmsg == 'SUCCESS') {
                this.toastService.showToast(resp[0].pmsg, NgbToastType.Success);
            } else if(resp[0] && resp[0].pmsg){
                this.toastService.showToast(resp[0].pmsg, NgbToastType.Danger);
                return;
            } 
            this.isSaveResultFlag = false;
            this.isUpdateResultFlag = false;
            this.resetInlineGrid = true;
            this.initializeComponentState();   
        }
    }
    
    createCiebPricingAccntCode(data: CiebPricingAccntCodeModel) {
        this.ciebPricingAccntCodesService.createCiebPricingAccntCode(data).subscribe((resp) => {
            this.showAddNewLine = true;
        });
    }

    onFormSaved() {
        this.pricingPartnerDetailsFormState.forEach((record: DynamicConfigFormRow, index: number) => {
            if (record.formFields[index].name == PricingPartnerDetailFields.TERM_DATE && record.formFields[index].value) {
                record.formFields.map(formField => formField.name === PricingPartnerDetailFields.CHANGE_REASON ? formField.type = 'select' : '');
            }
        })
    }

    /**
     * populate fields to models
     * @param event
     * @param action
     */
     populateFormFields(ciebPricingAccntCodeModel: CiebPricingAccntCodeModel, event: any, action: FORM_FIELD_ACTION_TYPES): CiebPricingAccntCodeModel {
        // ----------------------- Dates conversion to format
        let effectiveDate = (event[0].value.singleDate) ? event[0].value.singleDate.date : null;
        if (effectiveDate) {
            ciebPricingAccntCodeModel.effectiveDate = effectiveDate.year + '-' + this.addPrefixZero(effectiveDate.month) + '-' + this.addPrefixZero(effectiveDate.day);
            ciebPricingAccntCodeModel.procEffectiveDate = this.addPrefixZero(effectiveDate.month) + '/' + this.addPrefixZero(effectiveDate.day) + '/' + effectiveDate.year;
        }

        let termDate = (event[1].value.singleDate) ? event[1].value.singleDate.date : null;
        if (termDate) {
            ciebPricingAccntCodeModel.termDate = termDate.year + '-' + this.addPrefixZero(termDate.month) + '-' + this.addPrefixZero(termDate.day);
            ciebPricingAccntCodeModel.procTermDate = this.addPrefixZero(termDate.month) + '/' + this.addPrefixZero(termDate.day) + '/' + termDate.year;
        }

        ciebPricingAccntCodeModel.pricingAccntCode = event[2].value;

        if (event[3]) {
            ciebPricingAccntCodeModel.changeReasonCode = event[3].value ? event[3].value : null;
        }

        if (event[4]) {
            ciebPricingAccntCodeModel.changeRecInd = event[4].value ? event[4].value : 'N';
        }
        
        ciebPricingAccntCodeModel.action = action;

        return ciebPricingAccntCodeModel;

    }

    public addPrefixZero(value: any) {
        return (value < 10) ? ('0' + value) : value;
    }


    ngOnDestroy() {
        this.resetInlineGrid = true;
    }
}
