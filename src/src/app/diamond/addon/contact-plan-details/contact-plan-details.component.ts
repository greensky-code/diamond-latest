/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from "ag-grid-community";
import { NgbActiveModal, NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';

import { SecWinService } from '../../../api-services/security/sec-win.service';
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { AlertMessage, AlertMessageService } from "../../../shared/components/alert-message";
import { MessageType, PopUpMessage, PopUpMessageButton } from "../../../shared/components/pop-up-message";
import { DatePickerConfig, DatePickerModel } from "../../../shared/config";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { DynamicConfigGridComponent } from "../../../shared/components/dynamic-config-grid/dynamic-config-grid.component";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { DateFormatPipe } from "../../../shared/pipes/date-format.pipe";
import { SecurityService } from "../../../shared/services/security.service";
import { ProcGetPricingAccntCodes } from "../../../api-models/addon/proc-get-pricing-accnt-codes.input-model";
import { ProcGetPricingAccntCodesViewModel } from "../../../api-models/addon/proc-get-pricing-accnt-codes.view-model";
import { ProcGetPricingAccntCodesService } from "../../../api-services/addon/proc-get-pricing-accnt-codes.stored-procedure.service";
import { SecUser, SecWin } from "../../../api-models";
import { SecUserService } from "../../../api-services";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { DynamicConfigFormRow, FORM_FIELD_ACTION_TYPES, FormField, FormRow, Option } from "../../../shared/models/models";
import { ProvContractSpecialty } from "../../../api-models/prov-contract-specialty.model";
import { ContactPlanDetailsConfig, ContactFields, ContactPlanDetailsFields, PricingPartnerDetailsConfig } from "../addon.constants";
import { NgbToastType } from "ngb-toast";
import { CiebContactService } from '../../../api-services/addon/cieb-contact.service';
import { Form } from '../../../shared/helpers/form.helper';
import { CiebContactPlanDetailsModel } from '../../../api-models/addon/cieb-contacts-plan-details.model';
import { CiebContactPlanDetailsService } from '../../../api-services/addon/cieb-contact-plan-details.service';
import { CiebAddonMeConfigService } from '../../../api-services/addon/cieb-addon-me-config.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CiebContactTaxDetailsService } from '../../../api-services/addon/cieb-contact-tax-details.service';
import { ProcGetGroupTaxInput } from '../../../api-models/addon/proc-get-group-tax.input-mode';
import { ProcGetGroupPlanInput } from '../../../api-models/addon/proc-get-group-plan.input-model';
import { CiebContactSaveTaxDetailsService } from '../../../api-services/addon/cieb-contact-tax-details-save.service';
import { CiebContactTaxDetailsModel } from '../../../api-models/addon/cieb-contacts-tax-details.model';
import { CiebContactPlanDetailsSaveService } from '../../../api-services/addon/cieb-contact-plan-details-save.service';
import { CiebContactInsertTaxDetailsService } from '../../../api-services/addon/cieb-contact-tax-details-insert.service';
import { Router } from '@angular/router';

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

    selector: 'contact-plan-details',
    templateUrl: './contact-plan-details.component.html',

})
export class ContactPlanDetailsComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() groupNumber: string = '8001';  // default value for testing.. TODO need to remove test values
    @Input() groupName: string = 'DORIS';
    @Input() entityType: string;
    @Input() seqAddressId: any;

    @Input() seqGroupId: number;
    activeTab = 1;
    haadProductCounts: any = [];
    haadContractPolicyHolderTypes: any = [];
    dhaProductCodes: any = [];
    clientDubaiWorkLocationCodes: any = [];
    photoIdCardIndicators: any = [{
        'CODE_1': 'Y',
        'CODE_DESC': 'Yes'
    }, {
        'CODE_1': 'N',
        'CODE_DESC': 'No'
    }];
    networkTierClassifications: any = [];
    globalPlanInQBOKs: any = [{
        'CODE_1': 'Y',
        'CODE_DESC': 'Yes'
    }, {
        'CODE_1': 'N',
        'CODE_DESC': 'No'
    }];
    globalPlanInUAEs: any = [{
        'CODE_1': 'Y',
        'CODE_DESC': 'Yes'
    }, {
        'CODE_1': 'N',
        'CODE_DESC': 'No'
    }];


    pricingPartnerDetailForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'CIEBAADR';
    public isSuperUser = false;
    public secProgress = true;

    userTemplateId: any = null;
    planDetailForm: FormGroup;
    secColDetails = new Array<SecColDetail>();
    
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('dynamicConfig', { static: true }) dynamicConfigGridComponent: DynamicConfigGridComponent;

    private tabSet: NgbNav;

    @ViewChild(NgbNav) set content(content: NgbNav) {
        this.tabSet = content;
    };

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private toastService: ToastService,
        private secWinService: SecWinService,
        private ciebAddonMeConfigService: CiebAddonMeConfigService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        private ciebContactTaxDetailsService: CiebContactTaxDetailsService,
        private ciebContactSaveTaxDetailsService: CiebContactSaveTaxDetailsService,
        private ciebContactInsertTaxDetailsService: CiebContactInsertTaxDetailsService,
        private procGetPricingAccntCodesService: ProcGetPricingAccntCodesService,
        private ciebContactPlanDetailsService: CiebContactPlanDetailsService,
        private ciebContactPlanDetailsSaveService: CiebContactPlanDetailsSaveService,
        public ngbActiveModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.getFormDropDowns();
        if (!this.groupNumber) {
            this.groupNumber = '00008A001'
        } else if (this.groupNumber && this.groupNumber === '') {
            this.groupNumber = '00008A001'
        }
    }

    ngAfterViewInit() {
        this.tabSet.select(this.activeTab);
    }

    activeTabChange(activeTabNumber: number) {
        if(activeTabNumber == 2) {
            this.ciebPricingAccntCodes = [];
            this.pricingPartnerDetailsFormState = [];
            let procGetGroupTaxInput = new ProcGetGroupTaxInput();
            procGetGroupTaxInput.pGroupId = this.groupNumber;
            procGetGroupTaxInput.pCountryCode = 'IND';
            this.ciebContactTaxDetailsService.getCiebPricingAccntCodes(procGetGroupTaxInput).subscribe((data: CiebContactTaxDetailsModel[]) => {
                this.ciebPricingAccntCodes = data;
                this.populateDynamicForm();
            });
        }
    }

    getFormDropDowns() {
        this.ciebAddonMeConfigService.findOptionsByCodeType("HAADPOLICYHOLDER").subscribe((data: Object[]) => {
            this.haadContractPolicyHolderTypes = data
        });
        this.ciebAddonMeConfigService.findOptionsByCodeType("LOC_CODE").subscribe((data: Object[]) => {
            this.clientDubaiWorkLocationCodes = data
        });
        this.ciebAddonMeConfigService.findOptionsByCodeType("NETCLASS").subscribe((data: Object[]) => {
            this.networkTierClassifications = data
        });
        this.ciebAddonMeConfigService.findOptionsByCodeType("HAAD_PRODUCT_CODE").subscribe((data: Object[]) => {
            this.haadProductCounts = data
        });
        this.ciebAddonMeConfigService.findOptionsByCodeType("DHA_PRODUCT_CODE").subscribe((data: Object[]) => {
            this.dhaProductCodes = data
        });
    }

    resetForm() {
        this.planDetailForm.reset();
    }

    closeForm() {
        if (this.planDetailForm.dirty) {
            this.showFormCloseConfirmation();
        } else {
            this.router.navigateByUrl('/');
            this.ngbActiveModal.close();
        }
    }

    showFormCloseConfirmation() {
        let popUpMessage = new PopUpMessage(
            'Address Primary Mailing',
            'Address Primary Mailing',
            '6128: Data has been modified, press yes to save changes',
            'info',
            [],
            MessageType.SUCCESS
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                // save only if user presses Yes from Model
                this.savePlanDetails();
                this.ngbActiveModal.close();
            } else if (resp.name === 'No') {
                this.router.navigateByUrl('/');
                this.ngbActiveModal.close();
            } // 3rd case: In case of cancel do nothing
        });
    }
    savePlanDetails() {
        if (this.planDetailForm.value.pnetworkEffectiveDate.singleDate) {
            const pnetworkEffectiveDate = this.planDetailForm.value.pnetworkEffectiveDate;
            const pnetworkTermDate = this.planDetailForm.value.pnetworkTermDate;

            const pqbokEffDate = this.planDetailForm.value.pqbokEffDate;
            const pqbokTermDate = this.planDetailForm.value.pqbokTermDate;

            const puaeEffDate = this.planDetailForm.value.puaeEffDate;
            const puaeTermDate = this.planDetailForm.value.puaeTermDate;

            this.planDetailForm.value.pnetworkEffectiveDate = Form.getDatePicker(this.planDetailForm.value.pnetworkEffectiveDate.singleDate.date);
            this.planDetailForm.value.pnetworkTermDate = Form.getDatePicker(this.planDetailForm.value.pnetworkTermDate.singleDate.date);

            this.planDetailForm.value.pqbokEffDate = Form.getDatePicker(this.planDetailForm.value.pqbokEffDate.singleDate.date);
            this.planDetailForm.value.pqbokTermDate = Form.getDatePicker(this.planDetailForm.value.pqbokTermDate.singleDate.date);
            this.planDetailForm.value.puaeEffDate = Form.getDatePicker(this.planDetailForm.value.puaeEffDate.singleDate.date);
            this.planDetailForm.value.puaeTermDate = Form.getDatePicker(this.planDetailForm.value.puaeTermDate.singleDate.date);

            this.planDetailForm.value.pgroupId = this.groupNumber;
            this.planDetailForm.value.pnoteType = 'N';
            this.planDetailForm.value.ppartner = 'N';

            const d1 = Date.parse(this.planDetailForm.value.pnetworkEffectiveDate);
            const d2 = Date.parse(this.planDetailForm.value.pnetworkTermDate);

            const d3 = Date.parse(this.planDetailForm.value.pqbokEffDate);
            const d4 = Date.parse(this.planDetailForm.value.pqbokTermDate);

            const d5 = Date.parse(this.planDetailForm.value.puaeEffDate);
            const d6 = Date.parse(this.planDetailForm.value.puaeTermDate);
            if (d1 > d2 || d3 > d4 || d5 > d6) {
                this.toastService.showToast("Term Date cannot be less than effective date.", NgbToastType.Danger);
                this.planDetailForm.value.pnetworkEffectiveDate =  pnetworkEffectiveDate;
                this.planDetailForm.value.pnetworkTermDate =  pnetworkTermDate;
                
                this.planDetailForm.value.pqbokEffDate =  pqbokEffDate;
                this.planDetailForm.value.pqbokTermDate =  pqbokTermDate;
                
                this.planDetailForm.value.puaeEffDate =  puaeEffDate;
                this.planDetailForm.value.puaeTermDate =  puaeTermDate;
    
            } else {
                this.ciebContactPlanDetailsSaveService.createCiebPricingAccntCode(this.planDetailForm.value).subscribe((resp) => {
                    this.toastService.showToast('Plan Details record updated', NgbToastType.Success);

                });
                this.planDetailForm.value.pnetworkEffectiveDate =  pnetworkEffectiveDate;
                this.planDetailForm.value.pnetworkTermDate =  pnetworkTermDate;
                
                this.planDetailForm.value.pqbokEffDate =  pqbokEffDate;
                this.planDetailForm.value.pqbokTermDate =  pqbokTermDate;
                
                this.planDetailForm.value.puaeEffDate =  puaeEffDate;
                this.planDetailForm.value.puaeTermDate =  puaeTermDate;

            }
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
            if (!this.groupNumber) {
                this.groupNumber = '00008A001'
            } else if (this.groupNumber && this.groupNumber === '') {
                this.groupNumber = '00008A001'
            }
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


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createFormTaxDetail() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.planDetailForm = this.formBuilder.group({
            phaadPrdCd: ['', { validators: [Validators.required] }],
            phaadPolicyHolderType: ['', { validators: [Validators.required] }],
            pdhaPrdCd: ['', { validators: [Validators.required] }],
            potherUaePrdCd: ['', { validators: [Validators.required] }],
            pdubaiEntityId: ['', { validators: [Validators.required] }],
            pclientDubaiWorkLocCode: ['', { validators: [Validators.required] }],
            pphotoIndicator: ['', { validators: [Validators.required] }],
            pnetworkTierClassification: ['', { validators: [Validators.required] }],
            pnetworkEffectiveDate: ['', { validators: [Validators.required] }],
            pqbokEffDate: ['', { validators: [Validators.required] }],
            pqbokTermDate: ['', { validators: [Validators.required] }],
            puaeEffDate: ['', { validators: [Validators.required] }],
            puaeTermDate: ['', { validators: [Validators.required] }],
            pnetworkTermDate: ['', { validators: [Validators.required] }],
            pqbokGblPlanInd: ['', { validators: [Validators.required] }],
            puaeGblPlanInd: ['', { validators: [Validators.required] }],
        }, { updateOn: 'submit' });
    }

    private initializeComponentState(): void {
        this.createForm();
        this.createFormTaxDetail();
        this.displayMessage = {};
        // this.createDataGrid();
        this.getProcGetPricingAccntCodes();
        // let procGetGroupTaxInput = new ProcGetGroupTaxInput();
        // procGetGroupTaxInput.pGroupId = this.groupNumber;
        // procGetGroupTaxInput.pCountryCode = 'IND';
        // this.ciebContactTaxDetailsService.getCiebPricingAccntCodes(procGetGroupTaxInput).subscribe((data: CiebContactTaxDetailsModel[]) => {
        //     this.ciebPricingAccntCodes = data;
        //     this.populateDynamicForm();
        // });
        this.formValidation = new FormValidation(this.pricingPartnerDetailForm);
        let procGetGroupPlanInput = new ProcGetGroupPlanInput();
        procGetGroupPlanInput.pgroupId = this.groupNumber;
        procGetGroupPlanInput.pnoteType = 'N';
        procGetGroupPlanInput.ppartner = 'N';
        this.ciebContactPlanDetailsService.getCiebPricingAccntCodes(procGetGroupPlanInput).subscribe((data: CiebContactPlanDetailsModel[]) => {
            if(data.length > 0) {
                this.planDetailForm.patchValue({
                    pclientDubaiWorkLocCode: data[0]['oclientDubaiWorkLocCode'],
                    pdhaPrdCd: data[0]['odhaPrdCd'],
                    pdubaiEntityId: data[0]['odubaiEntityId'],
                    phaadPolicyHolderType: data[0]['ohaadPolicyHolderType'],
                    phaadPrdCd: data[0]['ohaadPrdCd'],
                    pnetworkEffectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['onetworkEffectiveDate']),
                    pnetworkTermDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['onetworkTermDate']),
                    pnetworkTierClassification: data[0]['onetworkTierClassification'],
                    potherUaePrdCd: data[0]['ootherUaePrdCd'],
                    pphotoIndicator: data[0]['ophotoIndicator'],
                    pqbokEffDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['oqbokEffDate']),
                    pqbokGblPlanInd: data[0]['oqbokGblPlanInd'],
                    pqbokTermDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['oqbokTermDate']),
                    puaeEffDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['ouaeEffDate']),
                    puaeGblPlanInd: data[0]['ouaeGblPlanInd'],
                    puaeTermDate: this.dateFormatPipe.defaultDisplayDateFormat(data[0]['ouaeTermDate'])
                });
            }
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

    procGetPricingAccntCodes: ProcGetPricingAccntCodes;
    procGetPricingAccntCode: ProcGetPricingAccntCodes[];
    ProcGetPricingAccntCodesViewModels: ProcGetPricingAccntCodesViewModel[];


    getProcGetPricingAccntCodes() {
        let procGetPricingAccntCodes = new ProcGetPricingAccntCodes();
        procGetPricingAccntCodes.pgroupId = this.groupNumber // this.pricingPartnerDetailForm.get('pgroupId').value; TODO to be fixed after testing
        this.procGetPricingAccntCodesService.procGetPricingAccntCodes(procGetPricingAccntCodes.pgroupId).subscribe(procGetPricingAccntCode => {
            this.ProcGetPricingAccntCodesViewModels = procGetPricingAccntCode;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;


    createDataGrid(): void {
        this.dataGridGridOptions =
        {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "VAT Registration Number",
                field: "",
                width: 300,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "VAT Registration Name",
                field: "",
                width: 300
            },
            {
                headerName: "Effective Date",
                field: "",
                width: 300
            },
            {
                headerName: "Term Date",
                field: "pgroupid",
                width: 300
            },
        ];
    }

    // -------------------------------------------- Speciality grid
    ciebPricingAccntCodes: CiebContactTaxDetailsModel[] = [];
    pricingPartnerDetailsConfig = ContactPlanDetailsConfig;
    pricingPartnerDetailsFormState = new Array<DynamicConfigFormRow>();
    
    resetInlineGrid = false;
    isAllowAddNewRow: boolean = true;
    /**
     * form date to grid state
     */
    populateDynamicForm() {
        const values = this.ciebPricingAccntCodes;

        if (!values || values.length < 1) {
            return;
        }
        values.forEach((value: CiebContactTaxDetailsModel) => {
            let mockConfig = JSON.parse(JSON.stringify(this.pricingPartnerDetailsConfig));    // make a copy of original config
            let formState: FormRow = new FormRow();

            mockConfig.forEach((field: any, index: any) => {
                if (field.name === ContactPlanDetailsFields.EFFECTIVE_DATE) {
                    mockConfig[index].value = value.effectiveDate;
                } else if (field.name === ContactPlanDetailsFields.TERM_DATE) {
                    mockConfig[index].value = value.termDate;
                    if(!value.termDate) {
                        this.isAllowAddNewRow = false;
                        // mockConfig[index].required = true;
                    }
                }  else if (field.name === ContactPlanDetailsFields.VAT_REGISTRATION_NUMBER) {
                    mockConfig[index].value = value.vatRegistrationNumber;
                } else if (field.name === ContactPlanDetailsFields.VAT_REGISTRATION_NAME) {
                    mockConfig[index].value = value.vatRegistrationName;
                }
            });


            formState.formFields = mockConfig;
            formState.id = {
                provContractSpecialty: value
            };
            formState.action = null;
            this.pricingPartnerDetailsFormState.push(formState);          // add record
        });

        this.pricingPartnerDetailsConfig = JSON.parse(JSON.stringify(this.pricingPartnerDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.pricingPartnerDetailsFormState = JSON.parse(JSON.stringify(this.pricingPartnerDetailsFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }
    
    saveForm(event: any) {
        this.pricingPartnerDetailsFormState = event.formState;
        event = event.fields;
        let apiValues = new Array<CiebContactPlanDetailsModel>();
        const updatedRecords: FormRow[] = this.pricingPartnerDetailsFormState.filter(
            (record: any, index) => {
              record.index = index;
              return (
                record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
                record.action === FORM_FIELD_ACTION_TYPES.DELETE
              );
            }
          );
        if (updatedRecords.length > 0) {
            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {
                    let updatedRecord = event[preStateRecord.index];
                    const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                    let ciebContactPlanDetailsModel: CiebContactPlanDetailsModel = preStateRecord.id;
                    ciebContactPlanDetailsModel.pSeqAddlInfoId = preStateRecord.id.provContractSpecialty.seqAddlInfoId;
                    ciebContactPlanDetailsModel.action = preStateRecord.action;
                    let apiValue: CiebContactPlanDetailsModel = this.populateFormFields(ciebContactPlanDetailsModel, pair, preStateRecord.action);
                    apiValues.push(apiValue);
                }
            });
        }

        this.pricingPartnerDetailsFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
                let ciebContactPlanDetailsModel = new CiebContactPlanDetailsModel();
                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({ key: k, value: newRecord[k] }));
                let apiValue: CiebContactPlanDetailsModel = this.populateFormFields(ciebContactPlanDetailsModel, pair, FORM_FIELD_ACTION_TYPES.ADD);
                apiValues.push(apiValue);
            }
        });
        let ciebContactPlanDetailsInsModels: CiebContactPlanDetailsModel[] = [];
        let ciebContactPlanDetailsUptModels: CiebContactPlanDetailsModel[] = [];
        let flag: boolean = true;
        apiValues.forEach(value => {
            let ciebContactPlanDetailsModel = new CiebContactPlanDetailsModel();
            ciebContactPlanDetailsModel.pGroupId = this.groupNumber;
            ciebContactPlanDetailsModel.pCountryCode = 'IND';
            ciebContactPlanDetailsModel.pRegionCode = 'GUJ';
            ciebContactPlanDetailsModel.pType = 'T';
            ciebContactPlanDetailsModel.pRegistrationNo = value.pRegistrationNo;
            ciebContactPlanDetailsModel.pRegistrationName = value.pRegistrationName;
            // ciebContactPlanDetailsModel.pEffectiveDate = value.pEffectiveDate;
            // ciebContactPlanDetailsModel.pTermDate = value.pTermDate;
            if(value.pEffectiveDate) {
                let pEffectiveDate = new Date(value.pEffectiveDate);
                pEffectiveDate.setDate(pEffectiveDate.getDate());
                ciebContactPlanDetailsModel.pEffectiveDate = pEffectiveDate;
            }
            if(value.pTermDate) {
                let pTermDate = new Date(value.pTermDate);
                pTermDate.setDate(pTermDate.getDate());
                ciebContactPlanDetailsModel.pTermDate = pTermDate;
            }
            if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
                const d1 = value.pEffectiveDate;
                const d2 = value.pTermDate;
                if(!d1) {
                    this.toastService.showToast("Effective Date cannot be Blank", NgbToastType.Danger);
                    flag = false;
                    return;
                } else if (d1 && d2 && d1.getTime() > d2.getTime()) {
                    this.toastService.showToast("Term Date cannot be less than effective date.", NgbToastType.Danger);
                    flag = false;
                    return;
                } else {
                    ciebContactPlanDetailsInsModels.push(ciebContactPlanDetailsModel);
                }
            } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
                ciebContactPlanDetailsModel.pSeqAddlInfoId = value.pSeqAddlInfoId;
                const d1 = value.pEffectiveDate;
                const d2 = value.pTermDate;
                if(!d1) {
                    this.toastService.showToast("Effective Date cannot be Blank", NgbToastType.Danger);
                    flag = false;
                    return;
                } else if (d1 && d2 && d1.getTime() > d2.getTime()) {
                    this.toastService.showToast("Term Date cannot be less than effective date.", NgbToastType.Danger);
                    flag = false;
                    return;
                } else {
                    ciebContactPlanDetailsUptModels.push(ciebContactPlanDetailsModel);
                }
            }

        });
        if(flag) {
            if(ciebContactPlanDetailsInsModels.length > 0) {
                this.ciebContactInsertTaxDetailsService.createCiebPricingAccntCode(ciebContactPlanDetailsInsModels).subscribe((resp: any) => {
                    if (resp && resp.length > 0) {
                        if (resp[0] === "Please select effective date and term date which don't override existing data.") {
                            this.toastService.showToast(resp[0], NgbToastType.Danger);
                        } else {
                            this.updateCallflag = true;
                            this.onSuccessMessageDisplay();
                        }
                    }
                });
            } else {
                this.updateCallflag = true;
            }
            if(ciebContactPlanDetailsUptModels.length > 0) {
                this.ciebContactSaveTaxDetailsService.createCiebPricingAccntCode(ciebContactPlanDetailsUptModels).subscribe((resp) => {
                    this.insertCallflag = true;
                    this.onSuccessMessageDisplay();
                });
            } else {
                this.insertCallflag = true;
            }
        }
    }
    updateCallflag: boolean = false;
    insertCallflag: boolean = false;
    
    onSuccessMessageDisplay() {
        if(this.updateCallflag && this.insertCallflag) {
            this.toastService.showToast('Tax Details record updated Successfully', NgbToastType.Success);
            this.updateCallflag = false;
            this.insertCallflag = false;
            this.activeTabChange(2);
        }
    }

    /**
     * populate fields to models
     * @param event
     * @param action
     */
    populateFormFields(ciebContactPlanDetailsModel: CiebContactPlanDetailsModel, event: any, action: FORM_FIELD_ACTION_TYPES): CiebContactPlanDetailsModel {
        ciebContactPlanDetailsModel.pRegistrationNo = event[0].value;
        ciebContactPlanDetailsModel.pRegistrationName = event[1].value;
        ciebContactPlanDetailsModel.pEffectiveDate = event[2].value ? this.getDatePickValue(event[2].value): null;
        ciebContactPlanDetailsModel.pTermDate = event[3].value ? this.getDatePickValue(event[3].value): null;
        ciebContactPlanDetailsModel.action = action;
        return ciebContactPlanDetailsModel;
    }
    resetInlineGrid = false;
    onNewRowAdded(event: any) {
        if(!this.isAllowAddNewRow) {
            this.toastService.showToast('New VAT Registraion Number can be added only after terming the current record', NgbToastType.Danger);
        }
    }

    formFieldValueChanged(event: any) {
        let field: FormField = event.formField;
        const index: number = event.index;
        let form: FormGroup = event.field;
        let prevState: Array<DynamicConfigFormRow> = event.prevState;

        if (field.name === ContactPlanDetailsFields.TERM_DATE + index) {
            const termDate = event.dateEvent;
            if(termDate) {
                this.isAllowAddNewRow = true;
            }
        }
    }

    getDatePickValue(field: any): Date {
        const date = field.singleDate ? field.singleDate.date : null;
        if (date) {
            let newDate: string = `${date.year}/${date.month}/${date.day}`;
            let dateformat = new Date(newDate);
            dateformat.setDate(dateformat.getDate()+1);
            return dateformat;
        } else {
            return null;
        }
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.pricingPartnerDetailForm = this.formBuilder.group({
            dynamicText001: ['', { updateOn: 'blur', validators: [] }],
            dynamicText002: ['', { updateOn: 'blur', validators: [] }]
        }, { updateOn: 'submit' });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

}
