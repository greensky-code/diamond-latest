/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef ,Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {GridOptions} from 'ag-grid-community';
import {DatePipe} from '@angular/common';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {AuthProcedureRangeValue} from '../../../api-models/authorization/auth-procedure-range-value.model';
import {AuthProcedureRange} from '../../../api-models/authorization/auth-procedure-range.model';
import {Form} from '../../../shared/helpers/form.helper';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {SecurityService} from '../../../shared/services/security.service';
import {AuthProcedureRangeService} from '../../../api-services/authorization/auth-procedure-range.service';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {MessageMasterDtl, SecWin} from '../../../api-models';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {AWAVE_MODULE_ID} from '../../../shared/app-constants';
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, SearchModel} from '../../../shared/models/models';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {AuthProcedureRangeValueService} from '../../../api-services/authorization/auth-procedure-range-value.service';
import {AuthProcedureRangeLookup} from '../../../shared/lookup/auth_procedure_range_lookup';
import {TablesAndColumnsComponent} from "../../../shared/components/tables-and-columns/tables-and-columns.component";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {
    AUTH_PROCEDURE_RANGE_VALUE_FIELDS,
    AUTH_WAIVE_DETER_VALUE_FIELDS,
    AuthProcedureRangeValueFormConfig,
    AuthWaiveDeterValueFormConfig
} from "../../../shared/models/constants";
import {AuthWaiveDeterValues} from "../../../api-models/auth-waive-deter-values.model";
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";
import { getAuthorizationProcedureRangesComponentShortcutKeys } from "../../../shared/services/shared.service";


// Use the Component directive to define the AuthProcedureRangesComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
    selector: 'authprocedureranges',
    templateUrl: './auth-procedure-ranges.component.html',
    providers: [AuthProcedureRangeValueService, AuthProcedureRangeService]
})
export class AuthProcedureRangesComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    authProcedureRangesForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    moduleId = AWAVE_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    userTemplateId: string;
    public menu: Menu[] = [];
    editAuthProcedureRangeValue: boolean;
    authProcedureRangeValue: AuthProcedureRangeValue;
    authProcedureRangeValues: AuthProcedureRangeValue[];
    editAuthProcedureRange: boolean;
    authProcedureRange: AuthProcedureRange;
    authProcedureRanges: AuthProcedureRange[];
    public dataGridGridOptions: GridOptions;

    private windowId = '';
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    isRecordExists = false;

    public shortcuts: ShortcutInput[] = [];


    authProcedureRangesDataState = new Array<FormRow>();
    authProcedureRangesConfig = AuthProcedureRangeValueFormConfig;
    isSaveForm = false;

    authProcRangeIdSearchModal = new SearchModel(
        'authprocedureranges/lookup',
        AuthProcedureRangeLookup.AUTHPROCEDURE_RANGE_ALL,
        AuthProcedureRangeLookup.AUTHPROCEDURE_RANGE_DEFAULT,
        []
    );
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;

    @Input() showIcon = true;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;


    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private cdr: ChangeDetectorRef,

        private mask: Mask,
        public activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private toastr: ToastService,
        private messageService: MessageMasterDtlService,
        private securityService: SecurityService,
        private authProcedureRangeValueService: AuthProcedureRangeValueService,
        private authProcedureRangeService: AuthProcedureRangeService,
        private secUserService: SecUserService,
        private authprocedureRange: AuthProcedureRangeService,
        private secColDetailService: SecColDetailService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        /*this.initializePermission();*/

        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.authProcedureRangesForm);
         this.createDataGrid();
         this.secProgress = false;
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getAuthorizationProcedureRangesComponentShortcutKeys(this));
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
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    createAuthProcedureRangeValue() {
        if (this.secWin.hasInsertPermission()) {

            this.formValidation.validateForm();
            if (this.authProcedureRangesForm.valid) {
                let authProcedureRangeValue = new AuthProcedureRangeValue();
                authProcedureRangeValue.authProcRangeId = Form.getValue(this.authProcedureRangesForm, 'authProcRangeId');
                this.authProcedureRangeValueService.createAuthProcedureRangeValue(authProcedureRangeValue).subscribe(response => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editAuthProcedureRangeValue = false;
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {

        }
    }


    updateAuthProcedureRangeValue(authProcRangeId: string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authProcedureRangesForm.valid) {
                let authProcedureRangeValue = new AuthProcedureRangeValue();
                authProcedureRangeValue.authProcRangeId = Form.getValue(this.authProcedureRangesForm, 'authProcRangeId');
                this.authProcedureRangeValueService.updateAuthProcedureRangeValue(authProcedureRangeValue, authProcRangeId).
                subscribe(response => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editAuthProcedureRangeValue = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        } else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }
    }

    saveAuthProcedureRangeValue() {
        if (this.editAuthProcedureRangeValue) {
            this.updateAuthProcedureRangeValue(this.authProcedureRangeValue.authProcRangeId)
        } else {
            this.createAuthProcedureRangeValue();
        }
    }

    deleteAuthProcedureRangeValue(authProcRangeId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authProcedureRangeValueService.deleteAuthProcedureRangeValue(authProcRangeId).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    getAuthProcedureRangeValue(authProcRangeId: string) {
        this.authProcedureRangeValueService.getAuthProcedureRangeValue(authProcRangeId).subscribe(authProcedureRangeValue => {
            this.authProcedureRangeValue = authProcedureRangeValue;
            this.authProcedureRangesForm.patchValue({
                'authProcRangeId': this.authProcedureRangeValue.authProcRangeId,
            });
        });
    }

    getAuthProcedureRangeValues() {
        this.authProcedureRangeValueService.getAuthProcedureRangeValues().subscribe(authProcedureRangeValues => {
            this.authProcedureRangeValues = authProcedureRangeValues;
        });
    }

    createAuthProcedureRange() {
        // if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.authProcedureRangesForm.valid) {
                let authProcedureRange = new AuthProcedureRange();
                authProcedureRange.authProcRangeId = Form.getValue(this.authProcedureRangesForm, 'authProcRangeId').toUpperCase();
                authProcedureRange.description = Form.getValue(this.authProcedureRangesForm, 'description');
                this.authProcedureRangeService.createAuthProcedureRange(authProcedureRange).subscribe(response => {
                    this.toastr.showToast('Record successfully created.', NgbToastType.Success);
                    this.editAuthProcedureRange = true;
                    this.authProcedureRange = response;
                });

            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        /*} else {

        }*/
    }


    updateAuthProcedureRange(authProcRangeId: string) {
        // if (this.secWin && this.secWin.hasUpdatePermission()) {
            this.formValidation.validateForm();
            if (this.authProcedureRangesForm.valid) {
                let authProcedureRange = new AuthProcedureRange();
                authProcedureRange.authProcRangeId = Form.getValue(this.authProcedureRangesForm, 'authProcRangeId');
                authProcedureRange.description = Form.getValue(this.authProcedureRangesForm, 'description');
                this.authProcedureRangeService.updateAuthProcedureRange(authProcedureRange, authProcRangeId).subscribe(response => {
                    this.toastr.showToast('Record successfully updated.', NgbToastType.Success);
                    this.editAuthProcedureRange = false;
                });
            } else {
                this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. ' +
                    'Please correct your entries and try again.');
            }
        /*} else {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
        }*/
    }

    saveAuthProcedureRange() {
        if (this.editAuthProcedureRange) {
            this.updateAuthProcedureRange(this.authProcedureRange.authProcRangeId)
        } else {
            this.createAuthProcedureRange();
        }
    }

    deleteAuthProcedureRange(authProcRangeId: string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.authProcedureRangeService.deleteAuthProcedureRange(authProcRangeId).subscribe(response => {
                this.toastr.showToast('Record successfully deleted.', NgbToastType.Success);
            });
        }
    }

    getAuthProcedureRange(authProcRangeId: string) {
        this.authProcedureRangeService.getAuthProcedureRange(authProcRangeId).subscribe(authProcedureRange => {
            this.authProcedureRange = authProcedureRange;
            this.authProcedureRangesForm.patchValue({
                'authProcRangeId': this.authProcedureRange.authProcRangeId,
                'description': this.authProcedureRange.description,
            });
        });
    }

    getAuthProcedureRanges() {
        this.authProcedureRangeService.getAuthProcedureRanges().subscribe(authProcedureRanges => {
            this.authProcedureRanges = authProcedureRanges;
        });
    }


    dataGridGridOptionsExportCsv() {
        let params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
        this.dataGridGridOptions = {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'From Range',
                field: 'fromrange',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Thru Range',
                field: 'thrurange',
                width: 200
            }
        ];
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
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('AUTH_WAIVE_RULES', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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
                } else {
                    this.showPopUp(
                        'You are not Permitted to view MEMBER Master',
                        'Vendor Credit Permission'
                    );
                }
            }
        );
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.authProcedureRangesForm = this.formBuilder.group({
            authProcRangeId: ['', {validators: [Validators.required, Validators.maxLength(5)]}],
            description: ['', {validators: [Validators.maxLength(60)]}]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

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
        this.formValidation = new FormValidation(this.authProcedureRangesForm);
        this.createDataGrid();
    }

    onLookupFieldAuthProcRangeId(event) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openAuthProvRangeIdLookupModel();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            if (event.target.value) {
                this.getAuthProcedureRule(event.target.value);
            }  else {
                this.messageService.findByMessageId(71920).subscribe(res => {
                    this.showPopUp('71920: ' + res[0].messageText, 'Auth Procedure Ranges')
                })
            }
        }
    }

    shortcutEventCtrlM(){

        this.isRecordExists = false;
        this.authProcedureRange = null;
        this.authProcedureRangeValue = null;
        this.authProcedureRangeValues = [];
        this.authProcedureRangesDataState = [];
        this.authProcedureRangesForm.reset();

    }

    private getAuthProcedureRule(value: any) {
        this.authprocedureRange.getAuthProcedureRange(value).subscribe(resp => {
            this.authProcedureRangesForm.patchValue({
                authProcRangeId: resp.authProcRangeId,
                description: resp.description
            })
        });
        this.authProcedureRangeValueService.findByAuthProcRangeId(value.toUpperCase()).subscribe((res: any) => {
            if (res) {
                this.isRecordExists = true;
                this.authProcedureRange = res;
                this.populateDynamicForm(res);
            } else {
                this.messageService
                    .findByMessageId(71915)
                    .subscribe((message: MessageMasterDtl[]) => {
                        let popMsg = new PopUpMessage('authProcedureRangeIdNotExistPopup', 'Auth Procedure Ranges', "71915: " + message[0].messageText, 'icon');
                        popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                        let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                        ref.componentInstance.popupMessage = popMsg;
                        ref.componentInstance.showIcon = true;
                        ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                            if (event.name === 'yes') {
                                this.isRecordExists = true;
                            }
                        });
                    });
            }
        }, error => {

        })
    }

    openAuthProvRangeIdLookupModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.authProcRangeIdSearchModal;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                this.authProcedureRange = res;
                this.isRecordExists = true;
                this.authProcedureRangesForm.patchValue({
                    authProcRangeId: res.authProcRangeId,
                    description: res.description
                });
                this.getAllAuthProvRanges(res.authProcRangeId);
            }
        });
    }

    saveAuthProcedureRangesDetail(event) {

    }

    onChangeAuthProcRangeId(event) {
        this.formValidation.validateForm();
        if (this.authProcedureRangesForm.valid) {
            let authProvRangeId = event.target.value;
            this.getAllAuthProvRanges(authProvRangeId);
        }
    }

    private getAllAuthProvRanges(authProvRangeId: any) {
        this.authProcedureRangeValueService.findByAuthProcRangeId(authProvRangeId.toUpperCase()).subscribe((res: AuthProcedureRangeValue[]) => {
            this.authProcedureRangesDataState = [];
            this.authProcedureRangeValues = res;
            if (res && res.length > 0) {
                this.populateDynamicForm(res);
            }
        });
    }

    private populateDynamicForm(res: AuthProcedureRangeValue[]) {
        res.forEach((record: AuthProcedureRangeValue) => {
            let mockConfig = JSON.parse(JSON.stringify(this.authProcedureRangesConfig));    // make a copy of original config
            this.authProcedureRangesConfig.forEach((field, index) => {
                if (field.name === AUTH_PROCEDURE_RANGE_VALUE_FIELDS.FROM_RANGE) {
                    mockConfig[index].value = record.authProcedureRangeValuePrimaryKey.fromRange;
                } else if (field.name === AUTH_PROCEDURE_RANGE_VALUE_FIELDS.THRU_RANGE) {
                    mockConfig[index].value = record.thruRange;
                }
            });

            let formState: FormRow = new FormRow();
            formState.formFields = mockConfig;
            this.authProcedureRangesDataState.push(formState);          // add record
        });
        this.authProcedureRangesDataState = JSON.parse(JSON.stringify(this.authProcedureRangesDataState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.isFormDataModified()
    }

    saveAuthProcedureRangesDetails(event) {
        if (event && event.length > 0) {
            let isValid = this.isValidAuthProcedureRanges(event);
            if (isValid) {
                this.isSaveForm = false;

                let apiRecords = new Array<AuthProcedureRangeValue>();
                const updatedRecords: FormRow[] = this.authProcedureRangesDataState.filter(record => record.action);

                console.log(updatedRecords);
                if (updatedRecords.length > 0) {

                    this.authProcedureRangesDataState.forEach((preStateRecord: FormRow, index) => {
                        if (preStateRecord.action) {
                            let updatedRecord = event[index];
                            const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                            let indexedValue: AuthProcedureRangeValue = this.authProcedureRangeValues[index];

                            indexedValue.authProcedureRangeValuePrimaryKey.fromRange = pair[0].value;
                            indexedValue.authProcedureRangeValuePrimaryKeyModel = indexedValue.authProcedureRangeValuePrimaryKey;
                            indexedValue.thruRange = pair[1].value;
                            indexedValue.action = preStateRecord.action;
                            apiRecords.push(indexedValue);
                        }
                    });
                }

                const newRecords = event.slice(this.authProcedureRangesDataState.length)

                newRecords.forEach(record => {
                    const pair = Object.keys(record).map(k => ({key: k, value: record[k]}));
                    let val: AuthProcedureRangeValue = this.populateAuthProcedureRangeValueSelectField(pair, FORM_FIELD_ACTION_TYPES.ADD);
                    apiRecords.push(val);
                });

                console.log(apiRecords);
                this.authProcedureRangeValueService.updateAuthProcedureRangeValueForm(apiRecords).subscribe(resp => {
                    this.toastr.showToast('Records updated Successfully', NgbToastType.Success)
                });
            }
        }
    }

    private populateAuthProcedureRangeValueSelectField(event: any[], action: any) {
        let authWaiveDeterValue =  new AuthProcedureRangeValue();
        authWaiveDeterValue.authProcedureRangeValuePrimaryKey = {
            authProcRangeId: this.authProcedureRangesForm.value.authProcRangeId,
            fromRange: event[0].value
        };
        authWaiveDeterValue.authProcedureRangeValuePrimaryKeyModel = {
            authProcRangeId: this.authProcedureRangesForm.value.authProcRangeId,
            fromRange: event[0].value
        };
        authWaiveDeterValue.thruRange = event[1].value;
        authWaiveDeterValue.action = action;
        return authWaiveDeterValue;
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl + N' }, { name: 'Open', shortcutKey: 'Ctrl + O' },
                    { name: 'Delete', shortcutKey: 'Ctrl + D' }, { name: 'Save', shortcutKey: 'Ctrl + S' },
                    { name: 'Close', shortcutKey: 'Ctrl + F4' }, { isHorizontal: true },
                    { name: 'Main Menu...', shortcutKey: 'F2' }, { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                    { isHorizontal: true }, { name: 'Print', disabled: true }, { isHorizontal: true }, { name: 'Exit', shortcutKey: 'Alt + F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', shortcutKey: 'Ctrl + Z' }, { isHorizontal: true },
                    { name: 'Cut', shortcutKey: 'Ctrl + X', disabled: true },
                    { name: 'Copy', shortcutKey: 'Ctrl + C', disabled: true },
                    { name: 'Paste', shortcutKey: 'Ctrl + V', disabled: true }, { isHorizontal: true },
                    { name: 'Lookup', shortcutKey: 'F5' }]
            },
            {
                menuItem: 'Window',
                dropdownItems: [{ name: 'Tile', shortcutKey: 'Ctrl + Alt + T' }, { name: 'Layer', shortcutKey: 'Ctrl + Alt + L' },
                    { name: 'Cascade', shortcutKey: 'Ctrl + Alt + C' }, { name: 'Arrange Icons', shortcutKey: 'Ctrl + Alt + I' },
                    { isHorizontal: true }, { name: 'Show Timestamp', shortcutKey: 'Ctrl + Alt + S' },
                    { isHorizontal: true }, { name: '1 Main Menu' },
                    { name: '2 Auth Procedure Ranges' }]
            },
            {
                menuItem: 'Help',
                dropdownItems: [{ name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' },
                    { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }]
            }
        ];
    }

    onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.isRecordExists = false;
                    this.authProcedureRange = null;
                    this.authProcedureRangeValue = null;
                    this.authProcedureRangeValues = [];
                    this.authProcedureRangesDataState = [];
                    this.authProcedureRangesForm.reset();
                    break;
                }
                case 'Open': {
                    //statements;
                    break;
                }
                case 'Save': {
                    this.save();
                    break;
                }
                default: {
                    this.toastr.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else {
            this.toastr.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    save = () => {
        if (this.authProcedureRange == null || this.authProcedureRange === undefined) {
            this.saveAuthProcedureRange()
        } else if (this.authProcedureRange) {
            this.updateAuthProcedureRange(this.authProcedureRangesForm.value.authProcRangeId);
        }
    };

    private isValidAuthProcedureRanges(event: any) {
        let isValid = true;
        if (event && event.length > 0) {
            for (let i = 0; i < event.length; i++) {
                let updatedRecord = event[i];
                const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));
                let val1 = pair[0].value;
                let val2 = pair[1].value;
                if (val1 && val1.length > 0 && val2 && val2.length > 0) {
                    let val1OnlyDigit = /^\d+$/.test(val1);
                    let val2OnlyDigit = /^\d+$/.test(val2);
                    if (val1OnlyDigit && val2OnlyDigit) {
                        if (parseInt(val1) > parseInt(val2)) {
                            this.messageService
                                .findByMessageId(71922)
                                .subscribe((message: MessageMasterDtl[]) => {
                                    let popUpMessage = new PopUpMessage(
                                        'poUpMessageName',
                                        'Auth Procedure Ranges',
                                        '71922: '+message[0].messageText,
                                        'icon'
                                    );
                                    popUpMessage.buttons = [
                                        new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
                                    ];
                                    let ref = this.modalService.open(PopUpMessageComponent);
                                    ref.componentInstance.popupMessage = popUpMessage;
                                });
                            isValid = false;
                        }
                    }
                }
            }
        } else {
            isValid = false;
        }
        return isValid;
    }

    valueChanged = () => {
        this.isFormDataModified()
    };

    modalClose() {
        this.screenCloseRequest = true;
        if  (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Auth Procedure Rages')
            })
        } else {
            this.activeModal.close();
        }
    }

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
                    this.save()
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
        this.authProcedureRangesForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        });
    }
}
