/* Copyright (c) 2020 . All Rights Reserved. */

import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {
    MessageType,
    PopUpMessage,
    PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';

import {GroupContract, GroupMaster, MessageMasterDtl, SecUser, SecWin} from '../../../api-models';
import {GroupContractService} from '../../../api-services/group-contract.service';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig, datePickerModel, NGBModalOptions} from '../../../shared/config';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CONSTANTS, getGroupContractShortcutKeys} from '../../../shared/services/shared.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {UntilDestroy} from "@ngneat/until-destroy";

import {
    GroupMasterService,
    MessageMasterDtlService,
    ReasonCodeMasterService,
    SecUserService
} from '../../../api-services';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {Menu, OPERATIONS, SearchModel} from '../../../shared/models/models';
import {Form} from '../../../shared/helpers/form.helper';
import {GroupMasterLookup} from "../../../shared/lookup/group-master-lookup";
import {SearchboxComponent} from "../../../shared/components/searchbox/searchbox.component";
import {Router} from "@angular/router";
import {UserDefinedValidateCodeService} from '../../../api-services/user-defined-validate-code.service';
import {GroupMasterComponent} from "../group-master/group-master.component";
import {GroupDetailComponent} from "../group-detail/group-detail.component";
import {GroupBillingComponent} from '../group-billing/group-billing.component';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {IMyDateModel, IMySingleDateModel} from 'angular-mydatepicker';
import {NgxSpinnerService} from "ngx-spinner";
import {HelpComponent} from "../help/help.component";
import {GroupPanelComponent} from '../group-panel/group-panel.component';
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {GROUP_DETAIL_MODULE_ID} from "../../../shared/app-constants";
import {SecurityService} from "../../../shared/services/security.service";
import {SecWinService} from "../../../api-services/security/sec-win.service";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {MenuBarComponent} from '../../../shared/components/menu-bar/menu-bar.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";
import {DatePipe} from '@angular/common';
import {DynamicUserDefinedFieldsComponent} from '../../../shared/components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import {NotesComponent} from '../../../shared/components/notes/notes.component';


// Use the Component directive to define the GroupContractComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'groupcontract',
    templateUrl: './group-contract.component.html',
    styleUrls: ['./group-contract.component.scss'],
})
export class GroupContractComponent implements OnInit, AfterViewInit, AfterViewChecked {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    groupContractForm: FormGroup;
    groupIdForm: FormGroup;
    formValidation: FormValidation;
    alertMessage: AlertMessage;
    displayMessage: any;
    popUpMessage: PopUpMessage;
    datePickerConfig = DatePickerConfig;
    datePickerModel = datePickerModel;
    editGroupContract: boolean;
    groupMasterExists = false;
    groupContract: GroupContract;
    groupContracts: GroupContract[];
    dataGridGridOptions: GridOptions;
    dataGridgridApi: any;
    showContractForm: boolean;
    dataGridgridColumnApi: any;
    reasonCodes: any[];
    @Input() showIcon: boolean = false;
    @Input() groupId: any;
    public seqSourceId: number = -1;
    seqGroupId: any;
    seqGroupContract: any;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    menu: Menu[] = [];
    idEntered: any;
    ShortName: any = "";
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    @ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;
    @ViewChild(DynamicUserDefinedFieldsComponent, { static: false }) userDefinedFields: DynamicUserDefinedFieldsComponent;
    @ViewChild('fieldForm') form: any;
    Aegis: any;
    screenCloseRequested: Boolean = false;
    valueChanged: Boolean = false;
    popupClose: Boolean = false;
    closeStatus: Boolean = false;
    searchModel = new SearchModel('groupmasters/lookup', GroupMasterLookup.GROUP_MASTER_ALL, GroupMasterLookup.GROUP_MASTER_DEFAULT, []);
    currentGroupId: number;

    secWin: SecWinViewModel;
    windowId = 'GRUPC';
    userTemplateId: string;
    memberModuleId = GROUP_DETAIL_MODULE_ID;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    isSuperUser = false;
    secProgress = true;
    menuOpened = "";
    groupMaster: GroupMaster[];
    masterGroup: GroupMaster;
    @Input() winID?: string;
    @Input() dataWindowId?: string;
    status: boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private router: Router,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private groupContractService: GroupContractService,
        public activeModal: NgbActiveModal,
        private cdr: ChangeDetectorRef,
        private groupMasterService: GroupMasterService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private reasonCodeMasterService: ReasonCodeMasterService,
        private UserDefinedValidateCodeService: UserDefinedValidateCodeService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private spinner: NgxSpinnerService,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
        private auditService: AuditService,
        private datePipe: DatePipe,

    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    triggerGroupDetail() {
        if (this.menuBarComponent.first.menuOpen) {
            this.handleTopicMenu('Detail')
        }
    }

    triggerMasterFile() {
        if (this.menuBarComponent.first.menuOpen) {
            this.handleTopicMenu('Master File')
        }
    }

    openFileMenu() {
        document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownFile"
    }
    openSpecialMenu() {
        document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownSpecial"
    }
    openWindowMenu() {
        document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownWindow"
    }

    openTopicMenu() {
        document.getElementById("fileDropdownTopic").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownTopic"
    }

    openHelpMenu() {
        document.getElementById("fileDropdownHelp").dispatchEvent(new MouseEvent('click'));
        this.menuOpened = "fileDropdownHelp"
    }

    openNotesScreen(){
        let  obj = {
              menu: {
                  menuItem: 'Notes'
              },
              action: 'Notes'
          }
          this.onMenuItemClick(obj)
      }

    initializeComponentState() {
        this.showContractForm = false;
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.groupContractForm);
        //this.populateGroupContractsGrid();
        this.createDataGrid();
        setTimeout(() => {
            this.dataGridGridOptions.api.setRowData([]);
        });
        this.getAegisRole();
        this.getReasonCodeMasters();
        if (this.groupId) {
            this.groupIdForm.patchValue({
                groupId: this.groupId
            });
            this.groupContractForm.patchValue({ seqGroupId: this.groupId });
            this.getGroupMasterByGroupId(this.groupId);
        }
        this.groupContractForm.valueChanges.subscribe(() => {
            this.valueChanged = true;
        });
    }

    hasPermission() {

        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        this.winID = CONSTANTS.GRUPC_WINDID;
        this.dataWindowId = CONSTANTS.GRUPC_DATA_WINDOWID;
        this.status = true;
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
            this.userTemplateId = user.dfltTemplate
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
                        'Group Contract Permission',
                        'You are not Permitted to view Group Detail'
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
        this.secColDetailService.findByTableNameAndUserId('GROUP_CONTRACT', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.inProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    createNewContract() {
        if (!this.editGroupContract) {
            let popMsg = new PopUpMessage('GroupId', 'Error', '13024:A Group Id must be Entered to create a new record', 'icon');
            popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
            let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                this.popUpButtonClicked(event);
            });
        }
        else {
            this.showContractForm = true;
            this.editGroupContract = false;
            this.groupContractForm.controls['termReason'].disable();
            this.groupContractForm.reset('', { onlySelf: true, emitEvent: false });
            this.userDefinedFields.reset();
            this.gotoForm();
            this.dataGridGridOptions.api.deselectAll();
            this.editGroupContract=false;
        }
        
    }

    getReasonCodeMasters() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('TM').subscribe(reasonCodes => {
            this.reasonCodes = reasonCodes;
        })
    }

    gotoForm() {
        let el = this.form.nativeElement;
        console.log(this.form.nativeElement);
        el.scrollIntoView();
    }

    onChangeGroupId(event: any) {
        this.groupContractForm.patchValue({ seqGroupId: event.target.value });
        this.getGroupMasterByGroupId(event.target.value);
    }

    getEffectiveDate(): Date {
        const effD = this.groupContractForm.value.effectivityDate;
        return this.getDate(effD.singleDate);
    }

    getDate(jsDate: IMySingleDateModel): Date {
        return Form.getDate(jsDate);
    }
    getTerminationdate(): Date {
        const effD = this.groupContractForm.value.termDate;
        return this.getDate(effD.singleDate);
    }
    isValidDate(date: Date): boolean {
        return date instanceof Date && !isNaN(date.valueOf())
    }
    termNull: null;

    validateTermDate(event: IMyDateModel) {
        const effD = this.groupContractForm.value.effectivityDate;
        if (event.singleDate && effD) {
            let dateEffecDefault = this.getDate(effD.singleDate);
            let termDate = this.getDate(event.singleDate);

            // =====================================        =============================
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.groupContractForm.controls['termReason'].enable();
                } else {

                    this.openDateValidationPopupError(true);
                    this.groupContractForm.controls['termReason'].disable();

                }
            } else if (!this.isValidDate(termDate)) {
                this.groupContractForm.controls['termReason'].disable();
                this.groupContractForm.controls['termReason'].setValue(null);
            }
        } else {
            this.groupContractForm.controls['termReason'].disable();
            this.groupContractForm.controls['termReason'].setValue(null);
        }
    }


    validateEffectiveDate(event: IMyDateModel) {
        const termD = this.groupContractForm.value.termDate;
        if (event && termD) {
            let dateEffecDefault = this.getDate(event.singleDate);
            let termDate = this.getDate(termD.singleDate);
            if (this.isValidDate(dateEffecDefault) && this.isValidDate(termDate)) {
                let isEffectiveDateBeforeTerminationdate = dateEffecDefault.getTime() < termDate.getTime();
                if (isEffectiveDateBeforeTerminationdate) {
                    this.groupContractForm.controls['termReason'].enable();
                } else {
                    this.openDateValidationPopupError(false);
                    this.groupContractForm.controls['termReason'].disable();
                }
            }
        }
    }

    openDateValidationPopupError(isTermDateValidation: boolean) {
        let popMsg

        if (isTermDateValidation) {
            popMsg = new PopUpMessage('Group Contract', 'Group Contract',
                '13027: Termination Date must be greater than Effective Date', 'info', [], MessageType.ERROR);
        } else {
            popMsg = new PopUpMessage('Group Contract', 'Group Contract',
                '13026:Effective Date must be less than Term Date', 'info', [], MessageType.ERROR);
        }
        popMsg.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.popupMessage = popMsg;
    }


    popUpButtonClicked(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button Yes has been click!');
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getGroupContractShortcutKeys(this));
    }

    ngAfterViewChecked(): void {
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
            this.popupMessageHandler(button);
        }
    }

    createGroupContract() {
        this.formValidation.validateForm();
        if (this.groupContractForm.valid && this.userDefinedFields.userDefinedFieldForm.valid) {
            let groupContract = new GroupContract();
            groupContract.groupContractPrimaryKey = {};
            groupContract.groupContractPrimaryKey['seqGroupId'] = this.seqGroupId;
            groupContract.groupContractPrimaryKey['seqGroupContract'] = 22;
            groupContract.seqGroupId = this.seqGroupId;
            this.seqSourceId = this.seqGroupId;
            groupContract.effectiveDate = Form.getDatePickerValue(this.groupContractForm, 'effectivityDate');
            groupContract.termDate = Form.getDatePickerValue(this.groupContractForm, 'termDate');
            groupContract.termReason = this.groupContractForm.get('termReason').value;
            groupContract.openEnrollStart = Form.getDatePickerValue(this.groupContractForm, 'openEnrollStart');
            groupContract.openEnrollEnd = Form.getDatePickerValue(this.groupContractForm, 'openEnrollEnd');
            groupContract.numberOfEmployees = this.groupContractForm.get('noOfEmployees').value;
            groupContract.waitingPeriod = this.groupContractForm.get('waitingPeriod').value;
            groupContract.contractType = this.groupContractForm.get('contractType').value;
            
            groupContract.studentAgeFrom = this.userDefinedFields.userDefinedFieldForm.get('studentAgeFrom').value;
            groupContract.studentAgeTo = this.userDefinedFields.userDefinedFieldForm.get('studentAgeTo').value; 
            groupContract.salespersonName = this.userDefinedFields.userDefinedFieldForm.get('salespersonName').value;
            groupContract.brokerName = this.userDefinedFields.userDefinedFieldForm.get('brokerName').value;
        
          
            groupContract.insertUser =  sessionStorage.getItem('user');
            groupContract.userDate1 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate1');
            groupContract.userDate2 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate2');
            groupContract.userDate3 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate3');
            groupContract.userDate4 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate4');
            groupContract.userDate5 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate5');
            groupContract.userDate6 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate6');
            groupContract.userDate7 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate7');
            groupContract.userDate8 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate8');
            groupContract.userDate9 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate9');
            groupContract.userDate10 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate10');

            groupContract.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
            groupContract.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;
            groupContract.userDefined3 = this.userDefinedFields.userDefinedFieldForm.get('userDefined3').value;
            groupContract.userDefined4 = this.userDefinedFields.userDefinedFieldForm.get('userDefined4').value;
            groupContract.userDefined5 = this.userDefinedFields.userDefinedFieldForm.get('userDefined5').value;
            groupContract.userDefined6 = this.userDefinedFields.userDefinedFieldForm.get('userDefined6').value;
            groupContract.userDefined7 = this.userDefinedFields.userDefinedFieldForm.get('userDefined7').value;
            groupContract.userDefined8 = this.userDefinedFields.userDefinedFieldForm.get('userDefined8').value;
            groupContract.userDefined9 = this.userDefinedFields.userDefinedFieldForm.get('userDefined9').value;
            groupContract.userDefined10 = this.userDefinedFields.userDefinedFieldForm.get('userDefined10').value;


            this.auditService.setAuditFields(groupContract, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
            this.groupContractService.createGroupContract(groupContract).subscribe(response => {
                if (!this.groupContract) {
                    let Tdate = Form.getDateValue(this.groupContractForm, 'effectivityDate');
                    Tdate.setDate(Tdate.getDate() - 1);
                    this.masterGroup.billedThroughDate = this.datePipe.transform(Tdate, 'yyyy-MM-dd');
                    this.groupMasterService.updateGroupMaster(this.masterGroup, this.seqGroupId).subscribe(res => {
                    })
                }
                this.toastService.showToast('Record successfully created.', NgbToastType.Success);
                this.getGroupMasterByGroupId(this.currentGroupId);
                this.editGroupContract = false;
                if (this.screenCloseRequested === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.valueChanged = false;
                }
            });
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000);
                this.popupClose = false;
            }

        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }


    updateGroupContract(seqGroupId: number, seqGroupContract: number) {

        this.formValidation.validateForm();
        if (this.groupContractForm.valid && this.userDefinedFields.userDefinedFieldForm.valid) {
            this.spinner.show();
            let groupContract = new GroupContract();
            groupContract.seqGroupId = this.groupContractForm.get('groupId').value;
            groupContract.effectiveDate = Form.getDatePickerValue(this.groupContractForm, 'effectivityDate');
            groupContract.termDate = Form.getDatePickerValue(this.groupContractForm, 'termDate');
            groupContract.termReason = this.groupContractForm.get('termReason').value;
            groupContract.openEnrollStart = Form.getDatePickerValue(this.groupContractForm, 'openEnrollStart');
            groupContract.openEnrollEnd = Form.getDatePickerValue(this.groupContractForm, 'openEnrollEnd');
            groupContract.numberOfEmployees = this.groupContractForm.get('noOfEmployees').value;
            groupContract.waitingPeriod = this.groupContractForm.get('waitingPeriod').value;
            groupContract.contractType = this.groupContractForm.get('contractType').value;
            
            groupContract.studentAgeFrom = this.userDefinedFields.userDefinedFieldForm.get('studentAgeFrom').value;
            groupContract.studentAgeTo = this.userDefinedFields.userDefinedFieldForm.get('studentAgeTo').value; 
            groupContract.salespersonName = this.userDefinedFields.userDefinedFieldForm.get('salespersonName').value;
            groupContract.brokerName = this.userDefinedFields.userDefinedFieldForm.get('brokerName').value;
            groupContract.insertUser =  sessionStorage.getItem('user');

            groupContract.userDate1 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate1');
            groupContract.userDate2 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate2');
            groupContract.userDate3 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate3');
            groupContract.userDate4 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate4');
            groupContract.userDate5 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate5');
            groupContract.userDate6 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate6');
            groupContract.userDate7 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate7');
            groupContract.userDate8 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate8');
            groupContract.userDate9 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate9');
            groupContract.userDate10 = Form.getDateValue(this.userDefinedFields.userDefinedFieldForm, 'userDate10');

            groupContract.userDefined1 = this.userDefinedFields.userDefinedFieldForm.get('userDefined1').value;
            groupContract.userDefined2 = this.userDefinedFields.userDefinedFieldForm.get('userDefined2').value;
            groupContract.userDefined3 = this.userDefinedFields.userDefinedFieldForm.get('userDefined3').value;
            groupContract.userDefined4 = this.userDefinedFields.userDefinedFieldForm.get('userDefined4').value;
            groupContract.userDefined5 = this.userDefinedFields.userDefinedFieldForm.get('userDefined5').value;
            groupContract.userDefined6 = this.userDefinedFields.userDefinedFieldForm.get('userDefined6').value;
            groupContract.userDefined7 = this.userDefinedFields.userDefinedFieldForm.get('userDefined7').value;
            groupContract.userDefined8 = this.userDefinedFields.userDefinedFieldForm.get('userDefined8').value;
            groupContract.userDefined9 = this.userDefinedFields.userDefinedFieldForm.get('userDefined9').value;
            groupContract.userDefined10 = this.userDefinedFields.userDefinedFieldForm.get('userDefined10').value;

            this.auditService.setAuditFields(groupContract, sessionStorage.getItem('user'), this.windowId, OPERATIONS.UPDATE);
            this.groupContractService.updateGroupContract(groupContract, seqGroupId, seqGroupContract).subscribe(response => {
                this.toastService.showToast('Record successfully updated.', NgbToastType.Success);
                this.getGroupMasterByGroupId(this.currentGroupId);
                this.editGroupContract = false;
                if (this.screenCloseRequested === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                    this.valueChanged = false;
                }
            });
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close()
                }, 2000);
                this.popupClose = false;
                this.spinner.hide()
            }
        } else {
            this.toastService.showToast('Required information is missing or incomplete. Please correct your entries and try again.', NgbToastType.Danger)
        }
    }

    saveGroupContract() {
        if (this.editGroupContract) {
            this.updateGroupContract(this.seqGroupId, this.seqGroupContract);
        } else {
            this.createGroupContract();
        }
        this.userDefinedFields.submit();
    }

    deleteGroupContract(seqGroupId: number) {
        this.groupContractService.deleteGroupContract(seqGroupId).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    GridOneSelection() {
        this.editGroupContract = true;
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows[0] !== undefined) {
            //this.groupContractForm.reset();
            this.showContractForm = true;
            this.editGroupContract=true;
            this.LoadFormWithInputs(selectedRows[0]);
        } else {
            this.groupContractForm.reset();
            this.userDefinedFields.userDefinedFieldForm.reset();
            this.editGroupContract=false;
        }
    }

    getAegisRole() {
        this.UserDefinedValidateCodeService.getUserDefinedValidateCode("group_contract", "user_defined_5").subscribe(data => {
            this.Aegis = data;
        });
    }

    LoadFormWithInputs(groupContract: any) {
        this.groupContract = groupContract;
        this.seqGroupContract = this.groupContract.groupContractPrimaryKey.seqGroupContract;
        this.groupContractForm.patchValue({
            'groupId': this.groupContract.seqGroupId,
            'effectivityDate': this.dateFormatPipe.defaultDisplayDateFormat(this.groupContract.effectiveDate),
            'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.groupContract.termDate),
            'termReason': this.groupContract.termReason,
            'openEnrollStart': this.dateFormatPipe.defaultDisplayDateFormat(this.groupContract.openEnrollStart),
            'openEnrollEnd': this.dateFormatPipe.defaultDisplayDateFormat(this.groupContract.openEnrollEnd),
            'noOfEmployees': this.groupContract.numberOfEmployees,
            'waitingPeriod': this.groupContract.waitingPeriod,
            'contractType': this.groupContract.contractType,
        });
        if (this.status) {
            setTimeout(() => {
                this.userDefinedFields.updateUserDefinedValues(groupContract);
                this.status = false;
            }, 7000);
        } else {
            this.userDefinedFields.updateUserDefinedValues(groupContract);
        }

        if (this.groupContract.termDate) {
            this.groupContractForm.controls['termReason'].enable();
        } else {
            this.groupContractForm.controls['termReason'].disable();
        }
        this.valueChanged = false;
    }

    getGroupMasterByGroupId(groupId: number) {
        this.groupMasterService.getGroupMasterByGroupId(groupId).subscribe((groupMaster: any) => {
            this.groupMaster = groupMaster;
            this.seqGroupId = groupMaster.seqGroupId;
            this.seqSourceId = this.seqGroupId;
            this.ShortName = groupMaster.shortName;
            this.groupMasterExists = true;
            this.editGroupContract = true;
            this.populateGroupContractsGrid(this.seqGroupId);
            this.valueChanged = false;
            this.currentGroupId = groupId;
            this.masterGroup = groupMaster;
            this.groupIdForm.get('groupId').disable();
        }, error => {
            this.valueChanged = false;
            this.groupMasterExists = false;
            this.editGroupContract = false;
            // this.toastService.showToast('Group Id Not Exists', NgbToastType.Danger)

        });
    }

    populateGroupContractsGrid(seqGroupId: number) {
        let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        let selectedIndex = 0;
        if (selectedRows && selectedRows.length > 0) {
            let seqGroupIdVal = selectedRows[0].groupContractPrimaryKey.seqGroupContract;
            selectedIndex = this.groupContracts.findIndex(g => g.groupContractPrimaryKey.seqGroupContract === seqGroupIdVal);
        }
        this.groupContractService.findBySeqGroupId(seqGroupId).subscribe(groupContracts => {
            this.groupContracts = groupContracts;
            if (!this.groupContracts) {
                this.idEntered = true;
            } else {
                this.dataGridGridOptions.api.setRowData(groupContracts);
                this.dataGridGridOptions.api.selectIndex(selectedIndex, false, false);
                this.valueChanged = false;
            }
        }, error => {
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

    dataGridGridOptionsExportCsv() {
        const params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createDataGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: 'Eff Date',
                field: 'effectiveDate',
                // width: 120,
                flex: 1,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Term Date',
                field: 'termDate',
                flex: 1,
                // width: 130
            },
            {
                headerName: 'Reason',
                field: 'termReason',
                flex: 1,
                // width: 120
            },
            {
                headerName: 'OE Start',
                field: 'openEnrollStart',
                // width: 120
                flex: 1,
            },
            {
                headerName: 'OE End',
                field: 'openEnrollEnd',
                // width: 120
                flex: 1,
            }
        ];
    }


    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.groupIdForm = this.formBuilder.group({
            groupId: ['', { validators: [] }],
        });
        this.groupContractForm = this.formBuilder.group({
            groupId: ['', { validators: [] }],
            dynamicText: ['', { validators: [] }],
            effectivityDate: ['', { validators: [Validators.required] }],
            termDate: ['', { validators: [] }],
            termReason: [{ value: '', disabled: true }, {
                disable: true,
                validators: [Validators.required]
            }],
            openEnrollStart: ['', { validators: [] }],
            openEnrollEnd: ['', { validators: [] }],
            noOfEmployees: ['', { validators: [] }],
            waitingPeriod: ['', { validators: [] }],
            contractType: ['', { validators: [] }],
            studentManager: ['', { validators: [] }],
            studentAgeTo: ['', { validators: [] }],
            salesRep: ['', { validators: [] }],
            broker: ['', { validators: [] }],
            contractId: ['', { validators: [] }],
            underwriter: ['', { validators: [] }],
            
            userDate1: ['', { validators: [] }],
            userDate2: ['', { validators: [] }],
            userDate3: ['', { validators: [] }],
            userDate4: ['', { validators: [] }],
            userDate5: ['', { validators: [] }],
            userDate6: ['', { validators: [] }],
            userDate7: ['', { validators: [] }],
            userDate8: ['', { validators: [] }],
            userDate9: ['', { validators: [] }],
            userDate10: ['', { validators: [] }],

            userDefined1: ['', { validators: [] }],
            userDefined2: ['', { validators: [] }],
            userDefined3: ['', { validators: [] }],
            userDefined4: ['', { validators: [] }],
            userDefined5: ['', { validators: [] }],
            userDefined6: ['', { validators: [] }],
            userDefined7: ['', { validators: [] }],
            userDefined8: ['', { validators: [] }],
            userDefined9: ['', { validators: [] }],
            userDefined10: ['', { validators: [] }]
        });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    resetAllState() {
        this.showContractForm = false;
        this.groupIdForm.reset();
        this.dataGridGridOptions.api.setRowData([]);
        this.groupContractForm.reset();
        this.groupContract = null;
        this.groupContractForm.controls['termReason'].disable();
        this.ShortName = false;
        this.groupIdForm.get('groupId').enable();
    }


    /**
     * Initialize menu
     */
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{ name: 'New', shortcutKey: 'Ctrl+M', disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission())) },
                { name: 'Open', shortcutKey: 'Ctrl+O' },
                { name: 'Save', shortcutKey: 'Ctrl+S', disabled: !(this.isSuperUser || (this.secWin && (this.secWin.hasInsertPermission() || (this.editGroupContract && this.secWin.hasUpdatePermission())))) },
                { name: 'Close', shortcutKey: 'Ctrl+F4' },
                { isHorizontal: true }, { name: 'Main Menu...', shortcutKey: 'F2' },
                { name: 'Shortcut Menu...', shortcutKey: 'F3' },
                { isHorizontal: true }, { name: 'Print', disabled: true }, { isHorizontal: true }, { name: 'Exit', shortcutKey: 'Alt+F4' }]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [{ name: 'Undo', disabled: true, shortcutKey: 'Ctrl+Z' }, { isHorizontal: true },
                { name: 'Cut', disabled: true, shortcutKey: 'Ctrl+X' },
                { name: 'Copy', disabled: true, shortcutKey: 'Ctrl+C' },
                { name: 'Paste', disabled: true, shortcutKey: 'Ctrl+V' }, { isHorizontal: true },
                { name: 'Next', shortcutKey: 'F8' }, { name: 'Previous', shortcutKey: 'F7' }, { isHorizontal: true },
                { name: 'Lookup', shortcutKey: 'F5' }, { name: 'Sort by Sequence', disabled: true }, {
                    name: 'Sort by Panel ID',
                    disabled: true
                }]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{ name: 'Master File' }, { name: 'Detail' }, { name: 'Contracts' }, { name: 'Panel' },
                { name: 'Billing Control' }]
            },
            {
                menuItem: 'Special',
                dropdownItems: [{ name: 'Group Lookup' }, { name: 'D/C Information' }]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    { name: 'Notes', shortcutKey: 'F4' }
                ]
            }, {
                menuItem: 'Window',
                dropdownItems: [
                    { name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S' },
                    { name: 'Audit Display', shortcutKey: 'Shift+Alt+A' },
                    { isHorizontal: true },
                    { name: '1 Main Menu' },
                    { name: '2 Group Billing' },
                    { name: '3 Notes' },
                    { name: '4 Group Contract' }
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    { name: 'Contents' }, { name: 'Search for Help on...' }, { name: 'This Window', shortcutKey: 'F1' }, { isHorizontal: true },
                    { name: 'Glossary' }, { name: 'Getting Started' }, { name: 'How to use Help' }, { isHorizontal: true },
                    { name: 'About Diamond Client/Server' }
                ]
            }
        ];
    }

    /**
     * Handle Menu Actions
     * @param event: {action: string, menu: MenuItem}
     */
    onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {             // handle File actions
            switch (event.action) {
                case "New": {
                    this.createNewContract();
                    break;
                }
                case "Open": {
                    this.openScreen();
                    break;
                }
                case "Save": {
                    this.saveGroupContract();
                    break;
                }
                case "Close": {
                    this.modalClose();
                    break;
                }
                case "Shortcut Menu": {
                    const ref = this.modalService.open(FunctionalGroupShortCutComponent);
                    ref.componentInstance.showIcon = true;
                    break;
                }
                case 'exit': {
                    this.exitScreen();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === "Edit") {             // handle Edit-Menu Actions
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        } else if (event.menu.menuItem === "Topic") {             // handle Topic-Menu Actions
            this.handleTopicMenu(event.action);
        } else if (event.menu.menuItem === "Special") {             // handle special-Menu Actions
            this.handleSpecialMenu(event.action);
        }  else if (event.menu.menuItem === 'Notes') {
            switch (event.action) {
                case 'Notes': {
                    if (this.seqSourceId == -1) {
                        this.messageService.findByMessageId(29005).subscribe(res => {
                            this.showPopUp('29005: '+ res[0].messageText, 'DIAMOND@ Client/Server System')
                        })
                    } else {
                        this.popUpNotesMenuClicked();
                    }
                    
                }
            }
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case '1 Main Menu': {
                    this.router.navigate(['diamond/functional-groups']);
                    break;
                }
                case 'Show Timestamp': {
                    this.openTimeStamp();
                    break;
                }
                case 'Audit Display': {
                    if (this.groupIdForm.get('groupId').value) {
                        this.toastService.showToast('Action was not implemented', NgbToastType.Danger)
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }

        else {
            this.toastService.showToast('Action is not valid', NgbToastType.Danger);
        }
    }

    popUpNotesMenuClicked() {
        let ref = this.modalService.open(NotesComponent, NGBModalOptions);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }

    /**
     * Generic Search Model
     */
    openSearchModel() {
        this.searchModel.url = 'url'; //  provide url
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            // TODO got response in `resp` field
            // TODO need to update in form
        })

    }

    onLookupFieldChange(event: any) {
        this.groupMasterExists = false;
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    /**
     * Generic Search Model
     */
    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            this.groupIdForm.patchValue({
                groupId: res.groupId
            });
            this.getGroupMasterByGroupId(res.groupId);
        })
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleSpecialMenu(action: string) {
        switch (action) {
            case "Group Lookup": {
                this.openSearchModel();
                break;
            }
            case "D/C Information": {
                let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_DC_INFO);
                if (status) {
                    this.toastService.showToast(
                        'This option is not implemented yet',
                        NgbToastType.Danger
                    );
                }
                else {
                    this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                        this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                    });
                }
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }
    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    handleTopicMenu(action: string) {
        switch (action) {
            case "Master File": {
                let ref = this.modalService.open(GroupMasterComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupIdForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Detail": {
                let ref = this.modalService.open(GroupDetailComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupIdForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Contracts": {
                let ref = this.modalService.open(GroupContractComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupIdForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Billing Control": {
                let ref = this.modalService.open(GroupBillingComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupIdForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            case "Panel": {
                let ref = this.modalService.open(GroupPanelComponent);
                ref.componentInstance.showIcon = true;
                ref.componentInstance.groupId = this.groupIdForm.get('groupId').value;
                this.activeModal.close();
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    onTermDataChange(event: any) {
        const value = this.groupContractForm.get('effectivityDate').value;
        const fromdate = (event.singleDate) ? new Date(event.singleDate.jsDate) : new Date(event);
        const thruDate = new Date(value.singleDate.jsDate);
        if (value && fromdate && thruDate < fromdate) {
            this.groupContractForm.get('termData').setValue(null);
        }
    }

    modalClose = () => {
        this.screenCloseRequested = true;
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Group Contract')
            })
        } else {
            this.activeModal.close()
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
                    this.saveGroupContract()
                }
                else if (resp.name === 'No') {
                    this.router.navigateByUrl('/');
                    if (this.screenCloseRequested === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/GRUPC_Group_Contracts.htm';
    };

    showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Group Contract";

        ref.componentInstance.insertDateTime = this.groupContract['insertDatetimeDisplay'];
        ref.componentInstance.insertProcess = this.groupContract['insertProcess'];
        ref.componentInstance.insertUser = this.groupContract['insertUser'];
        ref.componentInstance.updateUser = this.groupContract['updateUser'];
        ref.componentInstance.updateDateTime = this.groupContract['updateDatetimeDisplay'];
        ref.componentInstance.updateProcess = this.groupContract['updateProcess'];
    };

    triggerMenus(value: any) {
        let obj = {}
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownFile") {
                switch (value) {
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'New'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'o':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Open'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Save'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Close'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'e':
                        obj = {
                            menu: {
                                menuItem: 'File'
                            },
                            action: 'Exit'
                        }
                        this.onMenuItemClick(obj)
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownTopic") {
                switch (value) {
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Detail'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Contracts'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'm':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Master File'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'p':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Panel'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Topic'
                            },
                            action: 'Billing Control'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownSpecial") {
                switch (value) {
                    case 'l':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'Group Lookup'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'i':
                        obj = {
                            menu: {
                                menuItem: 'Special'
                            },
                            action: 'D/C Information'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else  if (this.menuOpened == "fileDropdownWindow") {
                switch (value) {
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Show Timestamp'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Window'
                            },
                            action: 'Audit Display'
                        }
                        this.onMenuItemClick(obj)
                        break;
                    default:
                        break;
                }
            } else if (this.menuOpened == 'fileDropdownHelp') {
                switch (value) {
                    case 'c':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Contents'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 's':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Search for Help on...'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 't':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'This Window'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'g':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Glossary'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'd':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'Getting Started'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'h':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'How to use Help'
                        }
                        this.onMenuItemClick(obj);
                        break;
                    case 'a':
                        obj = {
                            menu: {
                                menuItem: 'Help'
                            },
                            action: 'About Diamond Client/Server'
                        }
                        this.onMenuItemClick(obj);
                        break;
                }
            }
        }
    };

    exitScreen = () => {
        this.messageService.findByMessageId(29062).subscribe(res => {
            let popMsg = new PopUpMessage(
                'poUpMessageName',
                'DIAMOND @ Client/Server System',
                res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
                'icon');
            popMsg.buttons = [
                new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
                new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popMsg;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Yes') {
                    localStorage.removeItem('oldPassword');
                    sessionStorage.removeItem("selectedGroup");
                    localStorage.clear();
                    setTimeout(() => {
                        this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
                        this.activeModal.close()
                    }, 500);
                } else if (resp.name === 'No') {

                }
            });
        })
    };

    triggerBillingCtrlLookup() {
        if (this.menuBarComponent.first.menuOpen) {
            if (this.menuOpened == "fileDropdownTopic") {
                this.handleTopicMenu('Billing Control')
            }
            if (this.menuOpened == "fileDropdownSpecial") {
                this.openSearchModel()
            }
        }
     }

    triggerPanel() {
        if (this.menuBarComponent.first.menuOpen) {
            this.handleTopicMenu('Panel')
        }
    };

    openTimeStamp() {
        if (this.groupIdForm.get('groupId').value) {
            this.showTimeStamp();
        } else {
            this.messageService.findByMessageId(21127).subscribe(res => {
                this.showPopUp(  '21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
            })
        }
    };

    switchKey = (event: any) => {
        console.log(event)
    };

    openScreen = () => {
        if (this.valueChanged === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Group Contract', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.saveGroupContract();
                            setTimeout(() => {
                                this.resetAllState()
                            }, 2000)
                        }

                        else if (resp.name === 'No') {
                            this.resetAllState()
                        }
                    })
                }
                catch (e) {
                    console.log(e);
                }
            })

        } else {
            this.resetAllState()
        }
    }
}
