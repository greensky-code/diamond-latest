/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {SecWinService} from '../../../api-services/security/sec-win.service';
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {SecurityService} from "../../../shared/services/security.service";
import {ProcGetPricingAccntCodes} from "../../../api-models/addon/proc-get-pricing-accnt-codes.input-model";
import {SecUser, SecWin} from "../../../api-models";
import {SecUserService} from "../../../api-services";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {
    DynamicConfigFormRow,
    FORM_FIELD_ACTION_TYPES,
    FormField,
    FormRow,
    OPERATIONS,
    Option
} from "../../../shared/models/models";
import {AddonPhoneConfig, AddonPhoneFields, ContactFields} from "../addon.constants";
import {Form} from '../../../shared/helpers/form.helper';
import {ToastService} from "../../../shared/services/toast.service";
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {CiebPhoneCodeService} from "../../../api-services/addon/cieb-phone-code.service";
import {CiebPhoneService} from "../../../api-services/addon/cieb-phone.service";
import {CiebPhoneCode} from "../../../api-models/addon/cieb-phone-code.model";
import {CiebPhone} from "../../../api-models/addon/cieb-phone.model";
import {forkJoin} from "rxjs";
import {NgbToastType} from "ngb-toast";
import {AuditService} from "../../../shared/services/audit.service";


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
    selector: "adon-phone",
    templateUrl: "./addon-phone.component.html",
})
export class AddonPhoneComponent implements OnInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() seqEntityId: number;


    public alertMessage: AlertMessage;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = "";
    public isSuperUser = false;
    public secProgress = true;

    userTemplateId = null;
    secColDetails = new Array<SecColDetail>();

    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    @ViewChild("popUpMesssage", {static: true}) child: PopUpMessageComponent;


    procGetPricingAccntCodes: ProcGetPricingAccntCodes;
    procGetPricingAccntCode: ProcGetPricingAccntCodes[];


    // --------------------------------------------  grid
    ciebPhoneCodes: CiebPhoneCode[] = [];
    ciebPhones: CiebPhone[] = [];
    addonsPhoneConfig = AddonPhoneConfig;
    addonPhoneFormState = new Array<DynamicConfigFormRow>();

    resetInlineGrid = false;


    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public ngbActiveModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private ciebPhoneCodeService: CiebPhoneCodeService,
        private ciebPhoneService: CiebPhoneService,
        private auditService: AuditService
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    ngAfterViewInit(): void {

        this.cdr.detectChanges();
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

    phoneTypeDropdownOptions = new Array<Option>()

    private initializeComponentState(): void {

        forkJoin([this.ciebPhoneCodeService.getCiebPhoneCodes(),
            this.ciebPhoneService.getCiebPhoneBySeqEntityId(this.seqEntityId)]).subscribe((resp: any) => {
            this.ciebPhoneCodes = resp[0];
            this.ciebPhoneCodes.forEach((phoneCode: CiebPhoneCode, index) => {
                this.phoneTypeDropdownOptions.push({key: phoneCode.phoneDesc, value: phoneCode.phoneCode});
            });
            this.addonsPhoneConfig.map(field => field.name === AddonPhoneFields.PHONE_TYPE ? field.options = this.phoneTypeDropdownOptions : '');
            this.ciebPhones = resp[1];
            this.populateDynamicForm();
        });

    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService
            .getSecWin(this.windowId, secUserId)
            .subscribe((secWin: SecWin) => {
                this.secWin = new SecWinViewModel(secWin);
                if (this.secWin.hasSelectPermission()) {
                    this.initializeComponentState();
                    this.secProgress = false;
                } else {
                    this.secProgress = false;
                    this.showPopUp("You are not Permitted to view page", "Phone"
                    );
                }
            });
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
            .findByTableNameAndUserId("PROFSVC_CLAIM_HEADER", secUser.userId)
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
        let popUpMessage = new PopUpMessage("poUpMessageName", title, message, "icon");
        popUpMessage.buttons = [new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    /**
     * form date to grid state
     */
    populateDynamicForm() {
        const values = this.ciebPhones;

        if (!values || values.length < 1) {
            return;
        }
        values.forEach((value: CiebPhone) => {
            let mockConfig = JSON.parse(
                JSON.stringify(this.addonsPhoneConfig)
            ); // make a copy of original config
            let formState: FormRow = new FormRow();

            mockConfig.forEach((field, index) => {
                if (field.name === AddonPhoneFields.EFFECTIVE_DATE) {
                    mockConfig[index].value = value.effDate;
                } else if (field.name === AddonPhoneFields.TERM_DATE) {
                    mockConfig[index].value = value.termDate;
                } else if (field.name === AddonPhoneFields.PHONE_OR_Fax_NO) {
                    mockConfig[index].value = value.phoneNum;
                } else if (field.name === AddonPhoneFields.EXTENSION) {
                    mockConfig[index].value = value.phoneExt;
                } else if (field.name === AddonPhoneFields.PHONE_TYPE) {
                    mockConfig[index].value = value.phoneCode;
                    mockConfig[index].options = this.phoneTypeDropdownOptions;
                }
            });

            formState.formFields = mockConfig;
            formState.id = {
                phoneData: value,
            };
            formState.action = null;
            this.addonPhoneFormState.push(formState); // add record
        });

        this.addonsPhoneConfig = JSON.parse(
            JSON.stringify(this.addonsPhoneConfig)
        ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.addonPhoneFormState = JSON.parse(
            JSON.stringify(this.addonPhoneFormState)
        ); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
    }

    saveFormByShortcut() {
        document.getElementById("addonContactFormDynamicGrid").click();
    }

    public saveForm($event) {
        this.addonPhoneFormState = $event.formState;
        let event = $event.fields;
        let apiValues = new Array<CiebPhone>();


        this.addonPhoneFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
                let ciebPhone = new CiebPhone();
                let newRecord = event[index];
                const pair = Object.keys(event[index]).map((k) => ({key: k, value: newRecord[k],}));
                let apiValue: CiebPhone = this.populateFormFields(ciebPhone, pair, FORM_FIELD_ACTION_TYPES.ADD);
                this.auditService.setAuditFields(apiValue, sessionStorage.getItem('user'), 'ADDON', OPERATIONS.ADD)
                apiValues.push(apiValue);
                /**
                 * add record
                 */

            } else if (record.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
                /**
                 * update record
                 */
                let ciebPhone = new CiebPhone();
                ciebPhone = record.id.phoneData;

                let newRecord = event[index];
                const pair = Object.keys(event[index]).map((k) => ({key: k, value: newRecord[k],}));
                let apiValue: CiebPhone = this.populateFormFields(ciebPhone, pair, FORM_FIELD_ACTION_TYPES.UPDATE);
                this.auditService.setAuditFields(ciebPhone, sessionStorage.getItem('user'), 'ADDON', OPERATIONS.UPDATE)
                apiValues.push(apiValue);

            }
        });

        apiValues.forEach((value: any) => {
            if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
                value.seqEntityId = this.seqEntityId;
                //   add insert api
                this.ciebPhoneService.createCiebPhone(value).subscribe(resp => {
                    this.toastService.showToast('Record Created successfully', NgbToastType.Success);
                });
            } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {

                this.ciebPhoneService.updateCiebPhone(value, value.seqPhoneId).subscribe(resp => {
                    this.toastService.showToast('Record updated successfully', NgbToastType.Success);
                });
            }
        });
    }


    /**
     * populate fields to models
     * @param event
     * @param action
     */
    populateFormFields(ciebPhone: CiebPhone, event: any, action: FORM_FIELD_ACTION_TYPES): CiebPhone {
        ciebPhone.phoneCode = event[0].value;
        ciebPhone.phoneNum = event[1].value;
        ciebPhone.phoneExt = event[2].value;


        if (event[3].value) {       // ------- if effDate not null
            ciebPhone.effDate = Form.getDatePicker(event[3].value.singleDate.date);
        }
        if (event[4].value) {       // -------  if term date is not null
            ciebPhone.termDate = Form.getDatePicker(event[4].value.termDate.singleDate.date);
        }
        ciebPhone.action = action;
        return ciebPhone;
    }


    /**
     * Handle Pricing partner form details validations
     */
    formFieldValueChanged($event) {
        let field: FormField = $event.formField;
        const index: number = $event.index;
        let form: FormGroup = $event.field;
        let prevState: Array<DynamicConfigFormRow> = $event.prevState;

        if (field.name === ContactFields.TERM_DATE + index) {
            /// -------------------------validate term date
            const termDate = $event.dateEvent;

            let d = termDate?.singleDate?.date;
            if (d) {
                let dateStr1 = d.year + "-" + this.addPrefixZero(d.month) + "-" + this.addPrefixZero(d.day);
                let dateStr2 = Form.getDatePickerValue(form, field.compareField + "" + index);
                if (dateStr1 && dateStr2) {
                    let date1 = new Date(dateStr1);
                    let date2 = new Date(dateStr2);
                    setTimeout(() => {
                        if (date1 < date2) {
                            form.controls[field.name].setValue(null);
                            this.showPopUp("Term date should be greater than effective date", "Phone");
                        }
                    }, 200);
                }
            }
        }
    }

    public addPrefixZero(value) {
        return value < 10 ? "0" + value : value;
    }
}
