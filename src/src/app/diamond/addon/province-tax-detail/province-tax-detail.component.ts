/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, DefaultValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecurityService } from '../../../shared/services/security.service';
import { GroupMasterService, SecUserService } from '../../../api-services';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { GroupMaster, SecUser, SecWin } from '../../../api-models';
import {ProvinceTaxDetailFields, ProvinceTaxDetailsConfig} from "../addon.constants";
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES, Option } from '../../../shared/models/models';
import { CiebWebCodeDecodeService } from '../../../api-services/addon/cieb-web-code-decode.service';
import { CiebProvinceTaxService } from '../../../api-services/addon/cieb-province-tax.service';
import { CiebProvinceTaxModel } from '../../../api-models/addon/cieb-province-tax.model';
import { GetProvinceDetails } from '../../../api-models/addon/get-province-details.input-model';
import { GetProvinceDetailsService } from '../../../api-services/addon/get-province-details.stored-procedure.service';
import { GetProvinceDetailsViewModel } from '../../../api-models/addon/get-province-details.view-model';
import { ToastService } from '../../../shared/services/toast.service';
import { NgbToastType } from 'ngb-toast';
import { CiebProvinceTaxSchModel } from '../../../api-models/addon/cieb-province-tax-sch.model';
import { IMyDateModel, IMySingleDateModel } from 'angular-mydatepicker';



// Use the Component directive to define the ProviceTaxDetailComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'province-tax-detail',
    templateUrl: './province-tax-detail.component.html',
    providers: [DatePipe]


})
export class ProvinceTaxDetailComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro


    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'CIEBTEGM';
    public isSuperUser = false;
    public secProgress = true;
    @Input() showIcon = true;
    userTemplateId = null;
    resetInlineGrid = false;
    SubmitBtn = "Save Changes";
    saveInlineGrid = false;
    @Input() groupNumber: string;
    @Input() groupName: string;
    reasonCodes: any[] = [];
    taxRegions: any[] =[];
    taxTypes: any[] =[];
    ciebProvinceTaxes:CiebProvinceTaxModel[];
    GetProvinceDetails: GetProvinceDetails;

    groupMaster: GroupMaster;
 



    secColDetails = new Array<SecColDetail>();


    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes'){
            console.log("button yes has been click!");
        }
        if(button.name == 'no'){
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

    
    reset(){
        this.resetInlineGrid=true;
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
    private secUserService: SecUserService,
    private secColDetailService: SecColDetailService,
    public ngbActiveModal: NgbActiveModal,
    private groupMasterService: GroupMasterService,
    public ciebWebCodeDecodeService : CiebWebCodeDecodeService,
    public ciebProvinceTaxService : CiebProvinceTaxService,
    public getProvinceDetailsService: GetProvinceDetailsService,
    private datePipe: DatePipe,
    private toastService: ToastService,

    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        if (this.groupNumber === undefined) {
            this.groupNumber = '00008A001';
        }

        if (this.groupName === undefined) {
            this.groupName = 'DORIS';
        }
        this.hasPermission();
         
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
 

    private initializeComponentState(): void {
        this.getReasonCodes();
        this.getProvTaxes();
        this.getTaxTypes();
        this.displayMessage = {};
        if (this.groupNumber) {
            this.groupMasterService.getGroupMasterByGroupId(this.groupNumber).subscribe((groupMaster: GroupMaster) => {
                this.groupMaster = groupMaster;
                this.ciebProvinceTaxService.getCiebProvinceTaxes(this.groupMaster.seqGroupId).subscribe((data: CiebProvinceTaxModel[])=>{
                    this.ciebProvinceTaxes=data;     
                    this.populateDynamicForm();
                } )
              
            })
        }

    }
    getProvTaxes(){
        this.ciebProvinceTaxService.getCiebProvinceTaxeSches().subscribe((data: CiebProvinceTaxSchModel[])=>{ 
            this.taxRegions=Array.from(new Set(data.map(x => x.taxRegion)));;
        } ) ;

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
            .findByTableNameAndUserId('PROFSVC_CLAIM_HEADER', secUser.userId)
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
                    this.secProgress = false;

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Province Tax Detail',
                        'Province Tax Detail Permission'
                    );
                }
            }
        );
    }



    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    provinceTaxDetailsConfig = ProvinceTaxDetailsConfig;
    provinceTaxDetailsFormState = new Array<DynamicConfigFormRow>();
    populateDynamicForm() {
       const values = this.ciebProvinceTaxes;


        // set dynamic grid dropdown values
        this.provinceTaxDetailsConfig.forEach((field: FormField) => {
             field.options = new Array<Option>();

            if (field.name == ProvinceTaxDetailFields.APPLY_RETRO) {
                field.options.push({
                    key: 'YES',
                    value: 'Y'
                }, {
                    key: 'NO',
                    value: 'N'
                }, );
            } else if (field.name == ProvinceTaxDetailFields.CHANGE_REASON) {
                this.reasonCodes && this.reasonCodes.length > 0 ? this.reasonCodes.forEach(value => {
                    field.options.push({
                        key: value.decode2,
                        value: value.decode1
                    })
                }) : '';
            } else if (field.name == ProvinceTaxDetailFields.TAX_REGION) {
                field.options.push({
                    key: 'AB',
                    value: 'AB'
                }, {
                    key: 'BC',
                    value: 'BC'
                },{
                    key: 'MB',                       //Static dropdown values for testing, must be changed to dynamique dropdowns
                    value: 'MB'
                }, {
                    key: 'NB',
                    value: 'NB'
                },{
                    key: 'NL',
                    value: 'NL'
                }, {
                    key: 'NS',
                    value: 'NS'
                },{
                    key: 'NT',
                    value: 'NT'
                }, {
                    key: 'NU',
                    value: 'NU'
                },{
                    key: 'ON',
                    value: 'ON'
                }, {
                    key: 'PE',
                    value: 'PE'
                },{
                    key: 'OC',
                    value: 'OC'
                }, {
                    key: 'SK',
                    value: 'SK'
                },{
                    key: 'YT',
                    value: 'YT'
                }, {
                    key: 'ARE',
                    value: 'ARE'
                }, {
                    key: 'BHR',
                    value: 'BHR'
                },{
                    key: 'SAU',
                    value: 'SAU'
                }, 
                
                 );
            }else if (field.name == ProvinceTaxDetailFields.TAX_TYPE) {
                this.taxTypes && this.taxTypes.length > 0 ? this.taxTypes.forEach(value => {
                    field.options.push({
                        key: value.decode2,
                        value: value.decode2
                    })
                }) : '';
            }else if (field.name == ProvinceTaxDetailFields.EXEMPT_PRODUCT) {
                field.options.push({
                    key: 'MED',
                    value: 'MED'
                }, {
                    key: 'DEN',
                    value: 'DEN'
                },{
                    key: 'VIS',
                    value: 'MB'
                }, {
                    key: 'EVAC',
                    value: 'EVAC'
                },{
                    key: 'LIFE',
                    value: 'LIFE'
                },{
                    key: 'LTD',
                    value: 'LTC'
                }, {
                    key: 'ADO',
                    value: 'ADO'
                },{
                    key: 'RST',
                    value: 'RST'
                }, {
                    key: 'EAP1',
                    value: 'EAP1'
                },{
                    key: 'EAP2',
                    value: 'EAP2'
                }, {
                    key: 'EAP3',
                    value: 'EAP3'
                },{
                    key: 'LIFESUP',
                    value: 'LIFESUP'
                }, {
                    key: 'LIFEDEP',
                    value: 'LIFEDEP'
                },
                
                 );
            }

        });

        if (!values || values.length < 1) {
            return;
        }
        values.forEach((value: CiebProvinceTaxModel) => {
            let mockConfig = JSON.parse(JSON.stringify(this.provinceTaxDetailsConfig));    // make a copy of original config
            let formState: FormRow = new FormRow();
            
            mockConfig.forEach((field, index) => {
                if (field.name === ProvinceTaxDetailFields.TAX_REGION) {                  
                    mockConfig[index].value = value.taxRegion;
                } else if (field.name === ProvinceTaxDetailFields.TAX_TYPE) {
                    mockConfig[index].value = value.taxType;
                } else if (field.name === ProvinceTaxDetailFields.EXEMPT_PRODUCT) {
                        mockConfig[index].value = value.exemptProduct;          
                } else if (field.name === ProvinceTaxDetailFields.EFFECTIVE_DATE) {
                    mockConfig[index].value = value.effectiveDate;
                } else if (field.name === ProvinceTaxDetailFields.TERM_DATE) {
                    mockConfig[index].value = value.termDate;
                } else if (field.name === ProvinceTaxDetailFields.EXEMPT_PRODUCT) {
                    mockConfig[index].value = value.exemptProduct;
                } else if (field.name === ProvinceTaxDetailFields.CHANGE_REASON) {

                    // mockConfig[index].value = value.termReasonCode;

                    field.type = 'select';
                    const changeReasonIndex = this.reasonCodes.findIndex(item => item.decode1 == value.termReasonCode);
                    changeReasonIndex > -1 ? mockConfig[index].value = this.reasonCodes[changeReasonIndex].decode2 : mockConfig[index].value = value.termReasonCode;
                }
                  else if (field.name === ProvinceTaxDetailFields.APPLY_RETRO) {
                    mockConfig[index].value = value.applyRetro;
                }
               
            });


            formState.formFields = mockConfig;
            formState.id = {
                data: value
            };
            formState.action = null;
            this.provinceTaxDetailsFormState.push(formState);          // add record
        });

        this.provinceTaxDetailsConfig = JSON.parse(JSON.stringify(this.provinceTaxDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.provinceTaxDetailsFormState = JSON.parse(JSON.stringify(this.provinceTaxDetailsFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }
    getReasonCodes() {
        this.ciebWebCodeDecodeService
            .getCiebWebCodesByCodeAndCodeTypes('CHGREASN','GRPFL')
            .subscribe((data) => {
                this.reasonCodes = data;

            });
    }

    getTaxTypes() {
        this.ciebWebCodeDecodeService
            .getCiebWebCodesByCodeAndCodeTypes('CANTAXORDR','CANTX')
            .subscribe((data) => {
                this.taxTypes = data;
            });
    }

    getTaxRegions() {
        this.ciebProvinceTaxService
            .getCiebProvinceTaxeSches()
            .subscribe((data) => {
                this.taxRegions = data;

            });
    }

    onRowAdded(event) {       
        event.form.controls.fields.controls[event.index - 1].enable();        // prevState[prevState.length - 1].showCancelButton = true;    // prevState[prevState.length - 1].showSaveButton = true;
    }

    

    formFieldValueChanged($event) {

        let field: FormField = $event.formField;
        const index: number = $event.index;
        let form: FormGroup = $event.field;

         if (field.name === ProvinceTaxDetailFields.EFFECTIVE_DATE + index) {  /// -------------------------validate eff date
            
            // pass Term-Field Value , and Effective Date field value
            const effDate = $event.dateEvent;
            if (!(effDate.singleDate.date.day === 1)) {
                let popMsg = new PopUpMessage('Client/Server', 'Error', 'Effective Date must be first date of the month', 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;                return;
            }
          
        } else if (field.name === ProvinceTaxDetailFields.TERM_DATE + index) { /// -------------------------validate term date
            
            const termDate = $event.dateEvent;
            this.validateTermDate(termDate, form.controls[ProvinceTaxDetailFields.EFFECTIVE_DATE + index].value);

       } 

    }

    validateTermDate(event: IMyDateModel, svcDate) {

        if (event && svcDate) {
            let termDate = this.getDate(event.singleDate);
            let effectiveDate = this.getDate(svcDate.singleDate);
            if (this.isValidDate(termDate) && this.isValidDate(effectiveDate)) {
                // term date always greater than effective date
                if (!(termDate.getTime() > effectiveDate.getTime())) {
                    let popMsg = new PopUpMessage('Client/Server', 'Error', 'Termination date cannot be less than effective date', 'icon');
                    popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true; 
                    return false;
                }
                // term date should always be last date of month
                const lastMonthsDay = new Date(event.singleDate.date.year, event.singleDate.date.month, 0).getDate();
                if (!(lastMonthsDay === event.singleDate.date.day)) {
                    let popMsg = new PopUpMessage('Client/Server', 'Error', 'Termination Date either same as Effective Date or last day of the month.', 'icon');
                popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true; 
                    return false;
                }
                else {
                
                    return true
                }
                
            }
        }

    }

    setPopupMessage(message: string, messageType: MessageType = MessageType.ERROR, title = 'Error') {
        this.popUpMessage = {
            message: message,
            title: title,
            messageType: messageType,
            name: '',
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

    isValidDate(date: Date): boolean {

        return date instanceof Date && !isNaN(date.valueOf())

    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }

    getMonthLastDay(y, m): number {

        return new Date(y, m + 1, 0).getDate();

    }

    saveForm(event) {
        if (!this.groupMaster.seqGroupId) {
            this.showPopUp('SeqGroupId is not found', 'Province Tax Details');
            return;
        }

        this.provinceTaxDetailsFormState = event.formState;
        event = event.fields;
        let prevState: Array<DynamicConfigFormRow> = event.prevState;


        let apiValues = new Array<CiebProvinceTaxModel>();

        const updatedRecords: FormRow[] = this.provinceTaxDetailsFormState.filter((record: any, index) => {
            record.index = index;
            return record.action == FORM_FIELD_ACTION_TYPES.UPDATE || record.action === FORM_FIELD_ACTION_TYPES.DELETE;
        });

        if (updatedRecords.length > 0) {

            updatedRecords.forEach((filingDetailRecord: FormRow, index) => {
                let updatedRecord = event[filingDetailRecord.index];
                if (filingDetailRecord.action && filingDetailRecord.id) {
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));

                    let ciebProvinceTax: CiebProvinceTaxModel = filingDetailRecord.id.data;

                    const apiValue: CiebProvinceTaxModel = this.populateFormFields(ciebProvinceTax, pair, filingDetailRecord.action);
                    apiValues.push(apiValue);
                }
            });

        }

        this.provinceTaxDetailsFormState.forEach((record, index) => {
            if (record.action == FORM_FIELD_ACTION_TYPES.ADD || !record.id) {
                let ciebProvinceTax = new CiebProvinceTaxModel();

                let newRecord = event[index];
                const pair = Object.keys(event[index]).map(k => ({key: k, value: newRecord[k]}));
                const apiValue: CiebProvinceTaxModel = this.populateFormFields(ciebProvinceTax, pair, FORM_FIELD_ACTION_TYPES.ADD);
                apiValues.push(apiValue);
            }
        });


        apiValues.forEach(value => {

            if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
                value.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
                value.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
                value.seqGroupId = this.groupMaster.seqGroupId;
                value.insertUser = sessionStorage.getItem('user');
                value.insertProcess = this.windowId;
                
        
       
                this.ciebProvinceTaxService.createCiebProvinceTax(value).subscribe((resp) => {
                    this.toastService.showToast('Record created Successfully', NgbToastType.Success);

                    // Change grid options to update after creation...
                    this.provinceTaxDetailsFormState[value.stateIndex].action = FORM_FIELD_ACTION_TYPES.UPDATE;
                });
            } else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
                
                value.updateDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm');
                try {
                    value.insertDatetime = this.datePipe.transform(new Date(value.insertDatetime), 'dd-MM-yyyy HH:mm');
                } catch (e) {
                    console.log(e);
                }

                this.ciebProvinceTaxService.updateCiebProvinceTax(value, value.seqTaxDetailId).subscribe((resp) => {
                    this.toastService.showToast('Record updated Successfully', NgbToastType.Success);                
                                  });
            }

        })
    }

    populateFormFields(ciebProvinceTax: CiebProvinceTaxModel, event: any, action: FORM_FIELD_ACTION_TYPES): CiebProvinceTaxModel {

        const effectiveDate = (event[3].value.singleDate) ? event[3].value.singleDate.date : null;
        if (!(effectiveDate.day === 1)) {
            this.setPopupMessage('Effective Date Shuold be First Date Of Month',MessageType.ERROR,'');
        return;}
            else{

            ciebProvinceTax.effectiveDate = effectiveDate.year + '-' + this.addPrefixZero(effectiveDate.month) + '-' + this.addPrefixZero(effectiveDate.day);
        }
        
        const termDate = (event[4].value.singleDate) ? event[4].value.singleDate.date : null;
        const tDate=this.getDate(event[4].value.singleDate)
        const eDate=this.getDate(event[3].value.singleDate)
        if (tDate && eDate){
            const lastMonthsDay = new Date(event[4].value.singleDate.date.year, event[4].value.singleDate.date.month, 0).getDate();
         if (!(tDate.getTime() > eDate.getTime())) {
            this.setPopupMessage('Termination date cannot be less than effective date',MessageType.ERROR,'')
            return;
         }else if (!(lastMonthsDay === termDate.day)){
            this.setPopupMessage('Termination Date either same as Effective Date or last day of the month.',MessageType.ERROR,'')
            return;
         }
        else {
            ciebProvinceTax.termDate = termDate.year + '-' + this.addPrefixZero(termDate.month) + '-' + this.addPrefixZero(termDate.day);

        }
    }
    else if (termDate){
        ciebProvinceTax.termDate = termDate.year + '-' + this.addPrefixZero(termDate.month) + '-' + this.addPrefixZero(termDate.day);

    }

        ciebProvinceTax.taxRegion = event[0].value;
        ciebProvinceTax.taxType = event[1].value;
        ciebProvinceTax.exemptProduct = event[2].value;
        
        ciebProvinceTax.termReasonCode = event[5].value;
        if (termDate && !(event[5].value)){
            this.setPopupMessage('Change Reason Is Required When Entering Termination Date',MessageType.ERROR,'')
            return; 
        }
        ciebProvinceTax.applyRetro = event[6].value;
        ciebProvinceTax.action = action;
        this.setPopupMessage(null,null,'');

        return ciebProvinceTax;

    }

    newSeqTaxScheduleId:any;

    makeRandom(lengthOfCode: number, possible: string) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this.newSeqTaxScheduleId=parseInt(text);
        return "0" + text;
    }

    public addPrefixZero(value) {
        return (value < 10) ? ('0' + value) : value;
    }



    
}
