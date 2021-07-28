/* Copyright (c) 2020 . All Rights Reserved. */

import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ViewChildren,
    ElementRef,
    ViewChild,
    Input,
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    FormArray,
    Validators,
    FormControlName,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from "../../../shared/validators/number.validator";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { DatePipe } from "@angular/common";
import {
    PopUpMessage,
    PopUpMessageButton,
} from "../../../shared/components/pop-up-message/pop-up.message.model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";

import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitPackageDetailService, BenefitRuleMaintService, DddwDtlService } from '../../../api-services';
import { BenefitPackageDetail, GroupContactPerson } from '../../../api-models';
import {
    ContactPersonFieldNames,
    DefineBenefitValueFiltersFieldNames,
    DefineBenefitValueFiltersFormConfig
} from '../../../shared/models/constants';
import { FORM_FIELD_ACTION_TYPES, FormRow } from '../../../shared/models/models';
import { BenefitRuleMaint } from "../../../../../src/app/api-models";
import { BenefitRuleService } from "../../../api-services/benefit-rule.service";
import { BenefitRule } from "../../../api-models/benefit-rule.model";
import { NgbToastType } from "ngb-toast";
import { ToastService } from "../../../shared/services/toast.service";

// Use the Component directive to define the DefineBenefitValueFiltersComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'definebenefitvaluefilters',
    templateUrl: './define-benefit-value-filters.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        DddwDtlService,
        BenefitRuleService,
        BenefitRuleMaintService,
        BenefitPackageDetailService
    ]

})
export class DefineBenefitValueFiltersComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    defineBenefitValueFiltersForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public filterTypes: any[] = [];
    public operators: any[] = [];
    public saveForm: boolean = false;
    public isResetForm: boolean = false;
    benefitRuleMaintsRecords: any = [] = [];
    public defineBenefitValueState: Array<FormRow> = [];
    public copyDefineBenefitValueState: Array<FormRow> = [];
    @ViewChild('popUpMesssage') child: PopUpMessageComponent;
    @Input() showIcon: boolean = false
    @Input() benefitPackageId: any;
    @Input() benefitPackageDetail: any;
    @Input() ruleId: any;
    disabledAll: any;
    isEditable = true;
    defineBenefitValueFilterConfig = DefineBenefitValueFiltersFormConfig;
    windowId:string="BENEF";
    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
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





    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private dddwDtlService: DddwDtlService,
        private benefitRuleService: BenefitRuleService,
        private benefitRuleMaintService: BenefitRuleMaintService,
        private BenefitPackageDetailService: BenefitPackageDetailService
    ) {

    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.defineBenefitValueFiltersForm);

        if (this.ruleId == null) {
            this.ruleId = this.benefitPackageDetail.benefitRule.ruleId;
        }
        else {
            this.disabledAll = true;
            this.isEditable = false;
        }

        this.benefitRuleMaintService.getBenefitRulesMaints_values(this.ruleId, (this.benefitPackageId), this.benefitPackageDetail.benefitPackageDetailPrimaryKey.seqBenPackage).subscribe((res) => {
            this.benefitRuleMaintsRecords = res;

            this.getBenefitPackageFilterType();
        })
    }

    handlePrevData() {
        let states = [];
        if (this.ruleId && this.benefitRuleMaintsRecords &&
            this.benefitRuleMaintsRecords.length > 0) {
            /*for (let i = 0; i < this.benefitPackageDetail.benefitRule.benefitRuleMaints.length; i++) {
                const main = this.benefitPackageDetail.benefitRule.benefitRuleMaints[i];
                records.push({type: main.benefitRuleMaintPrimaryKey.typex, operator: main.benefitRuleMaintPrimaryKey.operator,
                    fromValue: main.benefitRuleMaintPrimaryKey.fromValue, thruValue: main.benefitRuleMaintPrimaryKey.thruValue});
            }*/
            this.benefitRuleMaintsRecords.forEach((benefitRuleMaint: any) => {
                let mockConfig = JSON.parse(JSON.stringify(this.defineBenefitValueFilterConfig));    // make a copy of original config
                this.defineBenefitValueFilterConfig.forEach((field, index) => {
                    if (field.name === DefineBenefitValueFiltersFieldNames.FILTER_TYPE) {
                        mockConfig[index].options = this.filterTypes;
                        mockConfig[index].value = benefitRuleMaint.type;
                    } else if (field.name === DefineBenefitValueFiltersFieldNames.OPERATOR) {
                        mockConfig[index].options = this.operators;
                        mockConfig[index].value = benefitRuleMaint.operator;
                    } else if (field.name === DefineBenefitValueFiltersFieldNames.FROM_VALUE) {
                        mockConfig[index].value = benefitRuleMaint.fromValue;
                    } else if (field.name === DefineBenefitValueFiltersFieldNames.THRU_VALUE) {
                        mockConfig[index].value = benefitRuleMaint.thruValue;
                    }
                    this.disableField(mockConfig, index);


                });

                let formState: FormRow = new FormRow();
                formState.formFields = mockConfig;
                this.defineBenefitValueState.push(formState);          // add record
            })
        }
        this.defineBenefitValueState = JSON.parse(JSON.stringify(this.defineBenefitValueState));

        // this.defineBenefitValueState.push(formState);
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.defineBenefitValueFiltersForm = this.formBuilder.group({
            // benefitRuleTa: ['TAX10_0001 ', {updateOn: 'blur', validators: [] }],
            // surchargeTa: ['', {updateOn: 'blur', validators: [] }],
            dropdownList: ['', { updateOn: 'blur', validators: [Validators.required] }],
            textbox001: ['', { updateOn: 'blur', validators: [Validators.required] }],
            textbox002: ['', { updateOn: 'blur', validators: [Validators.required] }],
            textbox003: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    disableField(mockConfig: any, index: any) {
        if (this.disabledAll) {
            mockConfig[index].disabled = true;
        }
    }

    getBenefitPackageFilterType() {
        this.dddwDtlService.getBenefitPackageFilterType().subscribe(res => {
            this.filterTypes = res;
            this.defineBenefitValueFilterConfig[0].options = res;
            this.getBenefitPackageOperator();
        })
    }

    getBenefitPackageOperator() {
        this.dddwDtlService.getBenefitPackageOperator().subscribe(res => {
            this.operators = res;
            this.defineBenefitValueFilterConfig[1].options = res;
            this.handlePrevData();
        })
    }

    saveDefineBenefitValueFilter(event: any) {
        let requestData: any[] = [];
        const updatedRecords: FormRow[] = (this.copyDefineBenefitValueState && this.copyDefineBenefitValueState.length > 0) ?
            this.copyDefineBenefitValueState : this.defineBenefitValueState; //.filter(record => record.action);
        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                let updatedRecord = event[index];
                const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                if (preStateRecord.action) {
                    let data = this.populateBenefitRuleMaintField(pair, preStateRecord.action, this.benefitRuleMaintsRecords[index]);
                    let status = this.checkExistingPrimaryKey(data, index);
                    if(!status){
                        let existingBenefitRuleMaintPrimaryKeyModel = {
                            type:this.benefitRuleMaintsRecords[index].type,
                            operator:this.benefitRuleMaintsRecords[index].operator,
                            fromValue:this.benefitRuleMaintsRecords[index].fromValue,
                            benefitPackageId:this.benefitRuleMaintsRecords[index].benefitPackageId,
                            benefitRule:this.benefitRuleMaintsRecords[index].benefitRule,
                            seqBenPackage:this.benefitRuleMaintsRecords[index].seqBenPackage
                        }
                        data.existingBenefitRuleMaintPrimaryKeyModel=existingBenefitRuleMaintPrimaryKeyModel;
                        requestData.push(data);
                    }else{
                        requestData.push(data);
                    }
                    
                }
            });
        }

        const newRecords = event.slice(this.copyDefineBenefitValueState.length)

        newRecords.forEach((record: any) => {
            const pair = Object.keys(record).map(k => ({ key: k, value: record[k] }));
            let data = this.populateBenefitRuleMaintField(pair, FORM_FIELD_ACTION_TYPES.ADD, null);

            requestData.push(data)
        });
        if (requestData.length > 0) {
            this.benefitRuleMaintService.updateBenefitRuleMaints(requestData).subscribe(res => {
                this.toastService.showToast('Benefit value filter updated Successfully', NgbToastType.Success)
                this.activeModal.close();
            }, error => {
                this.toastService.showToast(error, NgbToastType.Danger)
            });
        } else {
            this.activeModal.close();
        }
    }

    checkExistingPrimaryKey(data: any, indexValue: number) {
        let status: boolean = false;
        this.benefitRuleMaintsRecords.forEach((obj: any, index: number) => {
            if (indexValue === index) {
                if ((data.benefitRuleMaintPrimaryKeyModel.benefitPackageId === obj.benefitPackageId)
                    && (data.benefitRuleMaintPrimaryKeyModel.seqBenPackage === obj.seqBenPackage)
                    && (data.benefitRuleMaintPrimaryKeyModel.benefitRule === obj.benefitRule)
                    && (data.benefitRuleMaintPrimaryKeyModel.type === obj.type)
                    && (data.benefitRuleMaintPrimaryKeyModel.operator === obj.operator)
                    && (data.benefitRuleMaintPrimaryKeyModel.fromValue === obj.fromValue)
                ) {
                    status = true;
                    return status;
                }
            }
        });
        return status;
    }

    submitBenefit() {
        if (!this.disabledAll) {
            this.copyDefineBenefitValueState = JSON.parse(JSON.stringify(this.defineBenefitValueState));
            this.defineBenefitValueState = [];
            this.saveForm = true;
        }
        else {
            this.activeModal.close();
        }
    }
    
    populateBenefitRuleMaintField(pair: any, action: FORM_FIELD_ACTION_TYPES, prev: any) {

        let ruleMaint = {
            benefitRuleMaintPrimaryKeyModel: {
                type: pair[0].value,
                operator: pair[1].value,
                fromValue: pair[2].value,
                benefitPackageId: (prev != null) ? prev.benefitPackageId : this.benefitPackageId,
                benefitRule: this.benefitPackageDetail.benefitRule.ruleId,
                seqBenPackage: (prev != null) ? prev.seqBenPackage : this.benefitPackageDetail.benefitPackageDetailPrimaryKey.seqBenPackage
            },
            thruValue: pair[3].value,
            action: action,
            insertUser:sessionStorage.getItem('user'),
            insertProcess:this.windowId,
            updateProcess:this.windowId,
            updateUser:sessionStorage.getItem('user'),
            existingBenefitRuleMaintPrimaryKeyModel:{}
        };
        return ruleMaint;
    }

}
